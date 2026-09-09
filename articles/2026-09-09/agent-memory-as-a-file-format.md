---
title: "Agent memory as a file format"
source: "https://calpaterson.com/memoryfields.html"
publishedDate: "2026-09-08"
category: "design"
feedName: "Sidebar"
---

August 2026

Memoryfields - a vastly simpler way to do agent memory

  ![an image of Neo from the Matrix learning
Kung Fu](https://calpaterson.com/images/photo/kungfu.jpeg)

\[Floppy disk insertion noise\] WOW - I know the corporate VLAN configuration

Many model benchmarks [start from a blank context window](https://simonwillison.net/tags/pelican-riding-a-bicycle/). The tabula rasa of AI. To some extent, this makes sense, to keep the benchmarks fair.

But real agents should never start from a blank context window. They should start with as much relevant information available to the agent as possible. Your AI agents should start with **memories**.

## Why existing agent memory systems don't seem to work

The trouble is, a lot of agent memory systems are actually pretty rubbish. I think there are roughly three popular kinds of memory system at the moment, each of them not working in their own way.

The first are ones that deliberately tie you into a specific harness - usually written by the lab that rents you that harness. Said lab desperately wants to transition out of the (highly competitive) "API business" and into the (much more lucrative) "platform business". This form of system usually works by mining information out of your conversation history, with the result that most of their memories are all about you, even though information about the world is generally much more useful.

Another kind is ludicrously complicated. I know of one prominent system that needs pgvector, a Neo4j graph database and an LLM of its own just to decide what's worth remembering. This complexity is not only difficult to administer, but, for reasons I will explain: these Big Systems confuse the models too. They also fail to scale with the model frontier as it moves forward.

The final kind is the "High Modernist" variety, which imagine an idealised, rationalist form of memory. Inevitably, this involves a graph, and sometimes logical propositions as well. This kind systematically strips information from its context and leaves it isolated and senseless to the agent (and you). How useful, after all, is a simple list of "distilled facts"?

What they have in common is that they treat memory as a process. But memory - especially to a model - is much better represented as data.

## Memory should be a data format, not a multi-stage pipeline

[Brooks](https://martinfowler.com/bliki/MythicalManMonth.html) said:

> Show me your flowcharts and conceal your tables, and I shall continue to be mystified. Show me your tables, and I won’t usually need your flowcharts; they’ll be obvious.

So, here is the "memoryfield" portable memory file format:

`my-memories.memoryfield.zip ├── carbon-fibre-woks.md ├── finnish-bureaucracy-tips.md ├── [... many more md files...] ├── wec-2026-season-notes.md └── nomic-embed-text-v1.5.sqlite3`

A memoryfield is:

1.  Markdown "pages", with
2.  (optional) YAML frontmatter and
3.  (optional) SQLite vector index for semantic search

Agents work best with files. Allow me to explain.

## Design decision 1: use prose, not chunks or "facts"

The main reason why RAG pipelines can be very complicated is that they are trying to make a mass of existing, human-authored documents legible to an AI agent. Often these documents are very hard for the agent to read directly, eg: because they are big PDFs.

But agent memories are not complicated legacy documents. A memory, at the time it is being formed, is occurring directly to an AI agent which is fully able to write prose. That prose does not need to be chunked, enriched, double-summarised or otherwise mechanically processed: just have the agent write the memory directly in its favourite format (which is Markdown).

A memoryfield page looks like this:

`--- title: Carbon Fibre Woks created: '2026-03-01T09:00:00Z' updated: '2026-08-22T14:30:00Z' uuid: 6aa615f0-486f-48a7-a210-ba4f5ff18c8b summary: Thermal properties of carbon fibre cookware ---  Carbon fibre woks conduct heat evenly, but...`

The one limitation, admittedly, is that the page has to be short enough to fit into a vector embedding: so there is a soft limit of about 8kb (~2000 tokens).

But this is a highly beneficial restriction in practice: 8,000 characters is about 1,300 words, or the length of a medium-length magazine article. That is, in fact, a restriction it would make sense to impose anyway. To add more detail, add more pages - agents do not struggle to do this.

## Design decision 2: semantic jump, not graph walking

A key piece of prior art was [Karpathy wikis](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Karpathy wikis are oriented around hyperlinked Markdown files: modelled on those used by Roam or Obsidian. The idea was that the agent would walk the "knowledge graph" to find relevant pages.

But in practice, having an AI agent traverse a knowledge graph is slow and unreliable - as well as being confusing for the agent.

  ![a screenshot of an Obsidian
knowledge graph](https://calpaterson.com/images/screenshots/obsidian-graph.png)

A beautiful knowledge graph - it's a real shame that your AI agent absolutely hates it

Traversal is slow because the model needs to frequently stop to make serial tool calls to read successive pages.

The rough algorithm for an agent to walk a knowledge graph:

1.  Read wiki front page \[tool call\]
    -   find relevant links
2.  Read linked page(s) \[tool call\]
    -   find relevant links
3.  Decide if enough relevant information has been found
    -   If not, go to #2

If the relevant information is N steps deep in the knowledge graph, N+1 tool calls are required to retrieve it. This is slow, as your billion (trillion?) dollar LLM model has to pause for each tool call, each of which takes maybe 2-3 seconds. It also heavily penalises deeply nested knowledge graphs, which frankly cuts across the whole point of them.

Knowledge graphs are also unreliable. Because the AI can only tell if the material is relevant by looking at the link text, or maybe page title, if that is externalised somehow. That puts great pressure on the agent to do 1990s-SEO-style page metadata hacking to ensure that the link text/title/caption of each page is snappy and accurate. Doing so punishes digression, the ambient noting of side details and the kind of implicit lore that is both common and highly useful in larger text corpuses.

In practice, relevant information is often missed in Karpathy wikis because it is not titled or captioned in a way which looks appealing enough to the searching agent.

And knowledge graphs are also confusing to the agent because they often have to pore over a lot of irrelevant information as they walk around the graph. Inadvertently reading irrelevant information (the frontpage is often the main offender) puts a bunch of noise into the model's context window, which lowers the quality of their output and makes them look fixated on weird stuff.

This is all solved by using semantic search to just jump directly to **all** the relevant pages (based on their actual content, not their page metadata) and having the agent read all relevant pages, at once, _in parallel_ - which the vast majority of them will do now. So in a memoryfield, at most 2 tool calls are required (#1 to search, #2 to read in parallel). Relevant stuff actually gets found and irrelevant input tokens are minimised.

## Design decision 3: More model, less mechanism

One of the issues posed by "high mechanism" memory systems - the kind that include a lot of specially crafted APIs or databases - is that to use them, agents must navigate an interface maze to achieve their goal. If the interface is large, then you're loading a lot of `openapi.json` into the context. If the interface is small, then it is limiting. Even if the balance is right, often the API is still wrong: recall the times when you had to use an API written by someone else who hadn't foreseen your needs. Did you enjoy that experience?

Memoryfields then, being a "low mechanism" system (just a file format), gives agents much greater latitude to invent their own access patterns. While some [(hopefully) helpful tooling](https://github.com/calpaterson/memoryfield-tool/) is provided, agents are fully free to use whatever access patterns they like. For example using `perl` to do find-and-replaces across the whole corpus, or putting inline CSV files inside memories that they then query with SQLite (both real examples I have personally seen).

Being "low mechanism" also means that memoryfields scale with the model frontier. As models get better, agents think of more stuff to do. One of the recentish breakthroughs is that the models are accidentally very good at bash. They are good at Markdown too. And SQLite. One of the reasons that I think memoryfields work well inside real agents is that agents fundamentally can "get" what is going on from their training data (which is all you have until you can read your memories) in a way that as a disembodied LLM call within a "memory pipeline" they cannot.

As models get better, they automatically start to write memories a bit more cleverly. The memory systems of the "bag-on-the-side" rarely do this. There are only so many ways to more imaginatively use a fixed set of API endpoints. Memoryfields will scale with the model frontier.

## Design decision 4: Open format, interchangeable, transport invariant

As your collection of memories builds, they start to become precious. Your built up treasure of learned lessons and hard-won established facts. You don't want to be locked in to a specific harness, model or agent.

I've written an [RFC-style spec for the file format](https://github.com/calpaterson/memoryfield-spec/blob/main/SPEC.md) - mainly to remove ambiguities and avoid tying it to a specific embedding function.

If you want, you can surely vibe code whatever tooling you need from the spec alone. But I also provide a [skill](https://github.com/calpaterson/memoryfield-skill) and an [agent-optimised command line tool](https://github.com/calpaterson/memoryfield-tool) to go with it.

The canonical "archival" format of a memoryfield is as a zipfile. That's to make data exchange as easy as possible. But I've deliberately left the spec open to being served from local files, Amazon S3, on GitHub or over HTTP. In fact, anything that has files works. I personally use a mixture of these transports: Syncthing for personal memoryfields, S3 for those I share with others.

## Getting started

You could have your agent pull down [SPEC.md](https://github.com/calpaterson/memoryfield-spec/blob/main/SPEC.md) and vibe an implementation, but probably the simplest way to get started is to use my tooling:

`# Requires: ollama, uv and npx (comes with npm) # # 1. Pull the embedding model: ollama pull nomic-embed-text # 2. Install the CLI tool: uv tool install git+https://github.com/calpaterson/memoryfield-tool # 3. Install the skill: npx skills add calpaterson/memoryfield-skill -g -y`

Your agent should help you get up and running from here.

If you want a demo memoryfield to try out, try [`soapstones.memoryfield.zip`](https://blobs.calpaterson.com/soapstones.memoryfield.zip). Soapstones was an earlier project of mine on agent memories and this curated export contains a lot of high-value-to-weight memories on how agents can get access to data (like how to search Reddit as an agent, how to use Jina Reader, how to use the MediaWiki API to read wikis effectively).

## "Isn't this just some RAG" - and other common objections

> Isn't this just some RAG?

"RAG", as it stands, is now interpreted incredibly broadly - as soon as any agent retrieves data, 'RAG has happened'. In that sense: yes, this is some RAG.

But: almost all agents retrieve data. For example by searching the web. And most of the techniques that are usually associated with a "RAG system" are not present here. There is no chunking, there is no re-ranking, there is no hybrid search.

The other side of it of course is that it's the agents that write the memories. RAG systems are often about reads, but memoryfields are for writing too.

> Isn't `nomic-embed-text-v1.5` over 2 years old? Aren't there newer and better models?

Embedding models are neither as large as frontier models, nor as fast moving. [`nomic-embed-text-v1.5`](https://ollama.com/library/nomic-embed-text) remains a good balance between small and powerful. It is small enough (270MB) and fast enough to run on non-GPU hardware, and is a widely popular and frequently recommended default embedding model.

The spec, though, allows for some other embedding to be used.

> How can I judge what is a good memory to store? How can I avoid filling my memory with crap?

This is a common fear with memory systems but doesn't really apply to memoryfields. Irrelevant material is simply never surfaced by the semantic search. Irrelevant memories take up space, yes, and perhaps you want to periodically have a clean out, but they don't hamper an agent in any way.

For best results: insert liberally into the memoryfield. The one tip I would give, though: memories work best when they include citations, ideally in the form of URLs. That helps future passes over memories to strengthen them and helps agents fact check outdated or otherwise suspect material.

> What about security? What about ["Disregard that!"?](https://calpaterson.com/disregard.html)

**You must not share your context window, including via memories, with parties you don't trust.**

One of the reasons the spec includes a static zipfile format is to allow you to manually review and pin (via `sha256sum`) memoryfields you get from others.

There remains [no way to have an agent distinguish "good prompt" from "evil prompt"](https://calpaterson.com/disregard.html).

## Data first

Now that the flowchart is obvious I might as well state it explicitly:

1.  Write a memory as Markdown
2.  Embed it and save the vector to SQLite
3.  Search semantically to find memories again

Memoryfields are unusual as a memory system in that they specify a data structure and not a process. There's no extraction pipeline, no background processing services, no pluggable - well, anything. There is a vector index, but it's a deletable cache, not the system.

Memory is data! The less fixed machinery we put between the agent and that data, the better the agent can be.

* * *

## Contact/etc

* * *

## Notes

If you have time, please take a look at the [spec](https://github.com/calpaterson/memoryfield-spec/blob/main/SPEC.md). Any (human) review of that is highly valued.

My install procedure includes, by my count, four different package managers (Ollama, uv, NPM, Vercel Skills). It does feel like there must be a better way. Answers on a postcard to the usual address.