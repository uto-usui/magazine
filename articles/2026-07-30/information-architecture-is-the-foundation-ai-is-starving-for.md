---
title: "Information architecture is the foundation AI is starving for"
source: "https://uxdesign.cc/information-architecture-is-the-foundation-artificial-intelligence-is-starving-for-1d91fb5bf59f"
publishedDate: "2026-07-29"
category: "design"
feedName: "Sidebar"
author: "@uxdesigncc"
---

Information architecture is the orderly wing. Most content stores are the heap at the edge of the frame. AI assisted.

## Every AI problem you chase — hallucinations, wrong answers, poor retrieval — traces back to the IA projects you never funded. Now’s the time to fund them.

[

![Patrick Neeman](https://miro.medium.com/v2/resize:fill:64:64/1*U32tjPkRoauSxUDHLAZZGQ.png)



](https://medium.com/@usabilitycounts?source=post_page---byline--1d91fb5bf59f---------------------------------------)

12 min read

3 days ago

\--

For twenty years, information architecture was the discipline nobody funded. The job titles disappeared—I was one back in the day—and now it’s an art (and science) that needs to return. Teams didn’t align. Companies started showing their underwear.

Doing it well is less about structure than about getting an organization to agree on one way to name and arrange things. Every team brings its own vocabulary, so aligning them is slow, political, and thankless, and it loses every quarter to whatever ships a feature. The work stayed invisible, and so did its failures.

**Then AI arrived, and the invisible foundation showed up on the balance sheet.**

The same gaps that once cost you a confused visitor now cost you a hallucination, a wrong answer, or an agent that confidently retrieves garbage and acts on it. In a 2025 survey, [data quality and availability top the list of AI adoption barriers](https://www.aidataanalytics.network/data-science-ai/news-trends/data-quality-availability-top-list-of-ai-adoption-barriers), outranking every other obstacle.

The failures didn’t get worse; they got visible, repeatable, and expensive.

> Simply said, poor information architecture can now be measured in token costs. A lot of them.

You can buy a better model, tune a sharper prompt, and stack another evaluation layer, and you will still serve wrong answers, because the model retrieves from a pile nobody agreed how to organize.

**You need to fix the foundation before you pay for it a second time.**

Press enter or click to view image in full size

Retrieval doesn’t find the right document. Without structure, it finds the loudest one.

## Retrieval Is Only as Good as What It Starts With

Most teams treat retrieval as a solved problem. Point the model at your content, let it pull the relevant passages, generate an answer.

The technique has a name — retrieval-augmented generation, or RAG — and a foundational paper, [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401), and the mechanism is exactly what it sounds like: the model grounds its answer in documents it fetches at query time instead of relying only on what it memorized in training, limiting the retrieval set.

That mechanism inherits every flaw in the pile it fetches from.

If your content store is a flat heap of unstructured, unlabeled, contradictory documents, retrieval doesn’t work. It finds the loudest match — the one that shares the most surface words with the query, regardless of whether it is current, authoritative, or true.

> _It finds the loudest match — the one that shares the most surface words with the query, regardless of whether it is current, authoritative, or true._

Information architecture is what makes “the right one” a thing that exists in the first place. Organization schemes, labeling, and navigation aren’t decoration on top of content; they are the difference between a store where the correct answer is findable and a store where it sits buried next to four contradictory drafts of itself. The model can’t reach past the structure you gave it. If you never gave it one, it reaches for whatever is nearest.

This is the foundational claim, and everything else stacks on it. A retrieval system is a findability system. You have been building — or neglecting — findability systems for years.

Press enter or click to view image in full size

A price, a policy, a deprecated note, and a quote read alike. Typing is what tells them apart.

## Structure Is How a Model Knows What Something Is

A price, a policy, a deprecated note, and a customer quote can read as similar strings of text and mean opposite things. A person skims the surrounding page and knows which is which. A model, handed the same four snippets with no scaffolding, sees four passages of plausible language and no reason to rank one above another.

Metadata, taxonomy, and content typing are what let a system tell authoritative from anecdotal, current from expired, official from speculative.

This is the work Lou Rosenfeld,

and spent careers formalizing in [Information Architecture: For the Web and Beyond](https://www.amazon.com/Information-Architecture-Beyond-Louis-Rosenfeld/dp/1491911689) — organization, labeling, and the semantic structures that let people, and now machines, understand what a piece of content is before acting on it.

Press enter or click to view image in full size

The bookshelf with the book, only in AI.

The industry has a newer name for that same scaffolding — the [semantic layer](https://en.wikipedia.org/wiki/Semantic_layer), the governed set of definitions, types, and relationships that sits between raw content and the systems reading it.

> Call it a taxonomy, an ontology or a semantic layer, the job is identical — telling a machine what a thing is and how it relates to other things.

Two mechanisms do most of that work. Controlled vocabularies — a fixed, agreed set of terms for the same thing — hold the language steady, so that “cancelled,” “canceled,” “terminated,” and “closed” don’t fracture one concept into four the system treats as unrelated.

They prevent the slow drift that creeps in when every team names things its own way, and they give the model a strict, consistent language to match against instead of a moving target. Structured metadata does the rest: it is the scaffolding the system leans on, the tags and fields that mark what is current, what is canonical, and how one thing relates to another, so retrieval has something to reason over besides raw text.

That vocabulary earns its keep on the input side, too. You can normalize the instruction before it reaches retrieval — mapping a user’s “refund,” “money back,” and “reimbursement” onto the one preferred term the content is filed under — so the query and the store speak the same controlled language instead of guessing at each other. Structure the content, then bring the question to it.

Strip that scaffolding away and the model can’t separate signal from noise, because nothing ever told it which was which.

This escalates the first claim. Reason one was about finding the right document. This is about the system understanding what the document even is — and understanding is not something you can prompt your way into after the fact. It has to be in the structure.

Press enter or click to view image in full size

A person corrects an ambiguous label once. A model reproduces it for everyone who asks.

## Ambiguity Doesn’t Get Resolved — It Gets Amplified.

People are forgiving of messy structure. Faced with a vague label or a half-right category, a person uses judgment to fill the gap, works around it, and moves on. That tolerance hid the cost of bad information architecture for two decades. It also let teams believe the mess was fine, because a human was always there to absorb it.

Models remove the human from that loop. They don’t fill gaps with judgment; they pattern-match over the mess and reproduce it at scale, confidently.

> _They don’t fill gaps with judgment; they pattern-match over the mess and reproduce it at scale, confidently._

A vague label a person would have quietly corrected becomes a systematic wrong answer served to thousands who have no idea the source was ambiguous. The [World Quality Report 2025](https://www.prnewswire.com/news-releases/world-quality-report-2025-ai-adoption-surges-in-quality-engineering-but-enterprise-level-scaling-remains-elusive-302614772.html) found hallucination and reliability concerns among the top barriers enterprises named, with only 15 percent reporting generative AI deployed at enterprise scale.

This is the turn in the argument.

## Get Patrick Neeman’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

Bad information architecture used to cost you one confused user at a time, a cost so diffuse nobody bothered to name it.

Now it costs you an automated, repeated, confident failure — the same wrong answer, generated fresh for every person who asks.

The mess didn’t change. The blast radius did.

Press enter or click to view image in full size

Answering wrong is embarrassing. Acting wrong moves money.

## Agents Need Structure to Act, Not Just to Answer

Retrieval is the easy case. Answering a question wrong is embarrassing; taking an action wrong is a liability. The moment an agent stops retrieving and starts doing — routing a ticket, updating a record, approving a request, calling another system — it needs more than the right passage. It needs to know relationships, hierarchies, and boundaries: what belongs to what, what depends on what, what it is allowed to touch and what it is not.

That is information architecture functioning as an operating model, not a filing system — which is what the semantic layer is meant to be for agents: the governed encoding of what belongs to what, what depends on what, and what an agent is allowed to touch.

Agents need more context than humans and the semantic layer provides that.

A taxonomy that once organized help articles now governs which actions are valid against which objects. I made this case at length in an earlier piece on the semantic layer as agent infrastructure — the structures we built to make content findable are the same structures agents need to act safely.

> _A wrong answer erodes trust. A wrong action moves money, changes records, and triggers systems downstream that assume it was correct._

An agent with no model of these relationships doesn’t refuse to act. It acts anyway, on the flat and ambiguous picture it was handed, with the same confidence it brings to everything. A wrong answer erodes trust. A wrong action moves money, changes records, and triggers systems downstream that assume it was correct.

This already has a price tag, even before an agent acts. In [Moffatt v. Air Canada](https://canlii.ca/t/k2spq), the airline’s support chatbot told a grieving customer he could claim a bereavement fare retroactively — the opposite of what Air Canada’s own bereavement policy page said. The chatbot even linked to the page that contradicted it. When the customer relied on the answer and was refused, a British Columbia tribunal held the airline liable and ordered it to pay, rejecting the claim that the chatbot was a separate entity responsible for its own words.

Two pages of one site said opposite things, and nothing reconciled them. That was a chatbot that only answered. Give an agent like it the power to act, and the same unreconciled structure starts moving money on its own.

This raises the stakes one more level. Reason three was about wrong answers at scale. This is about wrong actions at scale — and actions don’t ship with a disclaimer that the underlying structure was a guess.

Press enter or click to view image in full size

The discipline didn’t change. The line item it sits on did.

## This Is How Information Architecture Finally Gets Funded

Every reason so far converts a formerly invisible cost into a now-visible outcome. Findability becomes retrieval accuracy. Typing becomes hallucination rate. Structure becomes agent reliability and time to deploy. The discipline didn’t change. The balance sheet did.

That reframe changes who is willing to pay for it. Information architecture never won budget when its return was “fewer confused users,” a number nobody could put on a slide.

It wins budget when its return is “the AI initiative already on the roadmap doesn’t fail.”

Enterprises spent $37 billion on generative AI in 2025, up from 11.5 billion the year before, per Menlo Ventures’ [State of Generative AI in the Enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/) — and much of that spend rides on retrieval and grounding that only work if the underlying content is organized.

The gain is measurable, not hand-waved: Anthropic’s [Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) work found that adding the context that situates each chunk before indexing it cut failed retrievals by up to 49 percent — a reliability number produced by fixing content, not by swapping models.

That is the semantic layer earning a budget line: structure priced as retrieval accuracy rather than as tidy content.

> _Fund the foundation, or keep paying for it downstream in failed retrievals, eroded trust, and pilots that never reach production._

So stop framing information architecture as hygiene and start framing it as the precondition it has become. It is no longer a librarian’s luxury or a cleanup task that slips every quarter. Fund the foundation, or keep paying for it downstream in failed retrievals, eroded trust, and pilots that never reach production.

The librarian’s work didn’t get more important because the librarians argued better. It got more important because it started showing up in the numbers executives already watch.

None of this means the model never matters. Sometimes it really is the weak link — the reasoning is too shallow for the task, or the instruction is vague enough that no content could save it, and a better model or a sharper prompt is the right fix. That case is real. It is just rarer than the spend implies, and you cannot tell the two apart by staring at the output: a wrong answer from a weak model and a wrong answer from a capable model reading a disorganized store look identical on the screen. The only way to know which one you have is to trace what the system retrieved — which is why the audit comes before the purchase, not after.

## Where to Start Before You Buy Another Model

The fix isn’t a purchase; it’s an audit and a sequence. Before you approve the next model, tool, or evaluation layer, do the unglamorous work the last decade let you skip.

Here is the whole method in miniature. Take one wrong answer your assistant produced this month and pull the passages it retrieved to build it. You will usually find a plausible-looking source that was outdated, duplicated, or mislabeled, and nothing in the store told the model so.

It has already played out in public: when Google’s AI Overviews recommended putting glue on pizza — a tip a model lifted from an old forum joke because nothing marked the joke as anything but a keyword match — that was this exact audit, failed at planetary scale, as Forbes traced in [Google’s AI Recommends Glue on Pizza](https://www.forbes.com/sites/jackkelly/2024/05/31/google-ai-glue-to-pizza-viral-blunders/).

Fix that one source, and you have fixed every future answer that would have leaned on it.

-   **Audit what your AI retrieves from, not just how it answers.** Trace a wrong answer back to its source. Nine times out of ten the model did its job and the content store handed it garbage.
-   **Type your content before you index it.** Tag what is current, authoritative, and canonical — and what is deprecated, draft, or anecdotal — so retrieval can tell them apart instead of averaging them together.
-   **Fix labels and taxonomy before you fix prompts.** A prompt patch papers over one query; a corrected taxonomy fixes every query that touches it. Structure scales, and prompt tweaks don’t.
-   **Give agents an explicit model of relationships and permissions.** Before an agent acts, it has to know what belongs to what and what it is allowed to touch. Write that down as structure, not as hope.
-   **Put an information architecture cost on an AI outcome.** Translate “cleaner content” into “higher retrieval accuracy” or “lower hallucination rate” so the work competes for budget on the terms executives already track.

## The Foundation Was Always Load-Bearing

For twenty years, the case for information architecture was aesthetic and moral: do it because findability is good, because users deserve clarity, because sloppy structure is unprofessional. Those arguments were true, and they lost, every quarter, to whatever shipped a feature. The discipline stayed underfunded because its failures were invisible and its wins were unprovable.

That argument is over. Not because anyone won it, but because the ground moved. AI turned every structural shortcut into a measurable failure — a hallucination you can count, a wrong answer you can reproduce, an agent you can watch act on bad information.

The invisible foundation now has a profit-and-loss line, and it is bleeding.

> You don’t have an AI problem. You have an information architecture problem wearing an AI costume.

The good news buried in that sentence is that you already know how to fix it. The organization schemes, the labeling, the metadata, the content types — the whole toolkit has been sitting in the discipline the entire time, waiting for a reason anyone would fund it.

Audit what your AI retrieves from before you buy another model. The foundation was always load-bearing and now everyone can see the load.