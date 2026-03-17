---
title: "New habits for tech writers in the age of LLMs"
source: "https://passo.uno/new-habits-tech-writers-ai-age/"
publishedDate: "2026-03-13"
category: "design"
feedName: "Sidebar"
---

At the end of [The writing was always the cheap part](https://passo.uno/real-cost-of-documentation/), I alluded to the fact that tech writers need to pick up new habits and skills, but didn’t dig into what that entails. These days, any LLM can put together plausible docs with some context and a simple prompt. So what is it that a tech writer should be learning now? Despite the fact that the AI landscape is ever shifting under our feet, I should be able to give you some actionable directions. Buckle up.

## You can automate it all now. Try automating yourself out of the picture

Automation can be a huge time saver. You know those release notes that you need to put together every two weeks? Or those tables that require small updates every now and then? You can automate those thanks to your newly acquired LLM powers. Knowing a bit of Python or PowerShell helps, as well as understanding the principles of automation, but even if you don’t, LLMs can help you write all sorts of automation scripts and pipelines.

There are two approaches to this: You can either ask an LLM to assist you in creating classic shell or Python scripts, or CI pipeline YAML, or you can create [agentic workflows](https://github.github.com/gh-aw/), which are quite new and consist of running an LLM in the CI pipelines within a sandbox. Each has its own purpose and scope. To give you an idea, here are some of the things I’ve automated in the last six months at my job:

-   An [updatecli](https://www.updatecli.io/) script that updates version variables automatically.
-   A Python script that updates documentation tables upon a new release.
-   A Python script that retrieves a Google Sheet and publishes it as a CSV file.
-   A GitHub agentic workflow that solves PR issues in automatic PRs.
-   Another GH agentic workflow that analyzes code PRs to check for docs needs.

Agentic workflows in particular are quite interesting in that they only require a Markdown description of the intended flow, which is then compiled to a classic, if a bit unreadable, GitHub action. This substantially lowers the time required to create CI automation: what would have taken a dedicated developer before can now be done by you, or at least prototyped to verify the validity of your idea.

The “automating yourself out of the picture” is not an ironic statement: you need that sort of mindset in order to come up with truly useful and impactful automation, and to discover what parts of your processes are out of AI limits. Of course the automation won’t kick you out. It might outlast you if done well, but that’s not the point. The point is that the less time you dedicate to chores thanks to automation, the more time you have at your disposal for work that’s truly meaningful.

## Start fixing or expanding your docs tools and the software you document

I’m not a .NET developer. I am not, in fact, a software developer at all: if anything, I’m a [devling](https://passo.uno/tech-writer-learn-to-code/), a trusty coding associate. Nevertheless, that hasn’t prevented me from becoming one of the contributors to the docs tooling at my job, which is a well-architected C# codebase made by expert software engineers. How? A mix of guts, hubris, deep knowledge of the tools, and a somewhat balanced LLM usage.

You can do the same, if your org allows for that. I know writers that are often creating, expanding, and improving their own documentation tools thanks to AI-powered IDEs. This is becoming increasingly common at all levels of tech companies and you should not be an exception. Tell your impostor syndrome to back off: chances are that you know the innards of the tools you use quite well already. Start like this:

1.  Explore the codebase with the help of an AI in [watercooler mode](https://passo.uno/four-modes-ai-augmented-tech-writing/).
2.  Learn how to test the changes locally. Learn how to think as a developer.
3.  Pick a small bug or improvement that directly impacts your work.
4.  Use plan mode with an approved AI-powered tool to prototype a fix.
5.  Validate the approach. Reach out to engineers to verify if it’s solid.
6.  Have the LLM develop it.

By developing things yourself, you’re not only freeing developers from backlog items, you’re also improving your self-confidence as a _devling_ and rolling out valuable changes. More importantly, you stop being at the mercy of someone else’s backlog. Your tooling problems become _your_ problems to solve, on your own timeline.

## Learn how LLMs and associated tooling work (and not just the theory of it)

In his latest post, [10 principles of the cyborg technical writer](https://idratherbewriting.com/blog/10-principles-of-cyborg-technical-writer), Tom Johnson suggests understanding model behavior, that is, how models actually behave and emulate human thinking rather than delving into the depths of how transformers work or what neural networks are (which are excellent things to know, but are far removed from the pragmatic aspects). You should create the [dramatis personae](https://en.wikipedia.org/wiki/Dramatis_personae) of this play.

The quality of your LLM sessions is a function of the following: the model you’ve chosen and its version, the agent or editor, the built-in context, the context you insert, and your own prompts (if you’re running a local model, add your hardware to the mix). Knowing this, you should make it a habit to try different models and different tools, to “learn the knobs and dials”, as Tom says, and to get a first-hand feel of how the output changes.

If it feels exhausting, it’s because it is. All of a sudden we must learn to interact with a host of artificial entities that can behave erratically. It’s not great, and there’s no standardization in sight, at least until we have a half dozen key players launching new models every month. My advice is to stick to two combinations of model and tooling for work and personal use. And then, [as Dachary Carey says](https://dacharycarey.com/2026/02/23/upskilling-in-ai-age/), share your learnings.

## Start writing and using skills, for they’re the new foundations of your work

The current fad is to create Claude Skills, Copilot instructions, Cursor rules, and so on, so that developers and users can use your products through LLMs in a way that’s easier than just feeding raw documentation as context. In a way, this is quite similar to packaging docs as if they were Nintendo cartridges or floppy disks with some cool cheat codes for a game: docs-as-data. You plug docs in, the agent learns kung-fu.

![](https://passo.uno/uploads/image-2.png)

Seeing developers coming up with agentic helpers fed by docs whose provenance, quality, and maintenance is unknown, eager to just use context as some sort of agentic boilerplate, makes me upset. As a tech writer you should own the instructions, as you should own the words in a REST API or the prompts in an MCP server. All that is docs. It doesn’t matter that it’s going to be consumed by AI. It’s still docs. It’ll always be docs.

Start creating skills to automate and enhance your own work. We call them “skills” today, but they could be “agentic docs” tomorrow. For all I know, they will still exist under some form or another, their frontmatter the only thing that will change over time. A Claude Skill can be the foundation, for example, of an agentic workflow. The good thing about docs is that they are never vendor locked.

Before setting yourself to the task, read the incredible series of skills analysis and explorations that Dachary Carey has written in her blog, from [Agent Skill Analysis](https://dacharycarey.com/2026/02/13/agent-skill-analysis/) to [her case study](https://dacharycarey.com/2026/02/27/case-study-upgrade-stripe-skill/) of a Stripe agent skill. Then have a look at the [Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf). Make it a habit to distill skills as you go from agentic sessions that you wish were repeatable. Test them out. Use [evals](https://developers.openai.com/blog/eval-skills/).

## Learn how to use MCP and subagents to augment your agentic workflows

There’s interesting technology growing at the periphery of large language models. One is [Model Context Protocol](https://passo.uno/mcp-server-docs-tooling/), which is like providing self-explanatory utensils to your LLM so that it can interact with APIs, servers, and tools easily. A public MCP server for your docs, for example, allows skills and agentic workflows to tap into your documentation easily without forcing them to scrape HTML pages. Bonus points if your docs are [agent friendly](https://dacharycarey.com/2026/02/18/agent-friendly-docs/), using LLMS.txt and Markdown for LLMs.

Another interesting technique is spawning and orchestrating [subagents](https://code.claude.com/docs/en/sub-agents), which are copies of an agent that perform dedicated tasks without polluting the main context window or memory of an agent. Think of it as delegation: you define the tasks, set the boundaries, and let each subagent handle a piece of the work, then collect the results. If you’ve ever wished you could clone yourself during a release cycle, this is the closest thing to it. Define subagents for specialized chores and spawn them without qualms.

Finally, [computer use](https://www.anthropic.com/news/developing-computer-use), or running LLMs and tools into sandboxed environments, is on the rise. You might have heard about [OpenClaw](https://openclaw.ai/): I’m running it at home, inside a small Linux computer that sits under my desk, with a dedicated mobile phone line and isolated from the rest of my network. It has become a reliable artificial assistant, capable of transcribing text, checking my agenda for conflicts, or sending me scheduled briefings. Tinkering with these setups at home is how you build the instinct to know what’s possible ([be mindful of IT security though](https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/)).

## Focus on strategy, templates, taxonomy, IA, and context curation

Once you have freed yourself from the repetitive work that used to eat your time at the margins, the question that remains is what you do with that time. I suggest that you spend it on information architecture, content strategy, taxonomy, templates, and the semantic infrastructure that holds documentation together. It’s what you couldn’t do before you gave the backlog to machines. It’s the expensive part I was talking about [in my previous post](https://passo.uno/real-cost-of-documentation/), which requires _friction, tension, and truth_.

Everything I’ve described so far lives or dies on the quality of the context you feed your models. As I wrote in [AI must RTFM](https://passo.uno/from-tech-writers-to-ai-context-curators/), the quality of the output is a function of the quality of the input. Tom Johnson makes this point well in [his latest post](https://idratherbewriting.com/blog/10-principles-of-cyborg-technical-writer): file diffs are a better source of truth than engineer notes, PRDs will hallucinate unreleased features if you feed them whole, and design docs full of rejected alternatives will confuse a model into picking the wrong one. Context is the new content, and curation is the skill that makes it useful.

Stop treating the LLM like a search box and start treating it like a colleague who needs a good briefing. Select what goes in, discard what would confuse humans, and structure it so the model can reason over it rather than pattern-match against noise. We’ve spent most of our careers deciding what to include, what to cut, and how to arrange what’s left so that the users’ brains click. The reader just happens to be a machine now. Read [_AI is accidentally making documentation more accessible_](https://gerireid.com/blog/ai-is-accidently-making-documentation-accessible/) by Geri Reid to get a sense of how a11y directly benefits our work with LLMs.

## Give yourself permission to be a beginner, again

The era of waiting for engineering to fix our tools or hand us context is over. We have the capability to build our own solutions, orchestrate our own agents, and define how our products are understood by humans and LLMs alike. It takes guts, a bit of hubris, and a lot of trial and error. But the alternative is letting someone else dictate the future of our work.

Let me close by quoting Dachary again from [Upskilling in the AI age](https://dacharycarey.com/2026/02/23/upskilling-in-ai-age/):

> _You don’t have to be an expert in these tools. Nobody is. They’re all new tools! You just need to learn about how to learn about the tools. Find what works best for you and look for more of that. Share what you’re doing because I guarantee someone else needs to hear it right now. Share what you don’t like because maybe someone else doesn’t like that, too, and can help you work around it or recommend an alternative. And share what you like because there’s a lot to like about these tools._

You heard it. Roll up your sleeves and get movin’.