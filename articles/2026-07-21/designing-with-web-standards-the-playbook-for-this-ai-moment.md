---
title: "Designing with web standards: The playbook for this AI moment"
source: "https://uxdesign.cc/designing-with-web-standards-the-playbook-for-this-ai-moment-92394884dc0d"
publishedDate: "2026-07-20"
category: "design"
feedName: "Sidebar"
---

## Jeffrey Zeldman helped end the browser wars by making the case for standards. We are starting that journey again and we should follow his example.

[

![Patrick Neeman](https://miro.medium.com/v2/resize:fill:64:64/1*U32tjPkRoauSxUDHLAZZGQ.png)



](https://medium.com/@usabilitycounts?source=post_page---byline--92394884dc0d---------------------------------------)

15 min read

6 days ago

\--

Every team building with artificial intelligence right now believes it is working on a blank frontier. New interface, new rules, no map.

That belief is wrong, and it is expensive.

The cost is not hypothetical, and it shows up as rework, as users who never trust the tool, and products that age quickly. It feels a lot like 1997, when the web was the wild west almost literally. The images in this post reflect that.

explained the blink tag in way that is better than I could.

A handful of browsers each went their own way. [Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator), [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer), [Opera](https://en.wikipedia.org/wiki/Opera_\(web_browser\)), and the fading remains of [Mosaic](https://en.wikipedia.org/wiki/NCSA_Mosaic) rendered the same page differently, each with its own proprietary tags, thinking they had invented sliced bread:

-   Netscape, specifically [Lou Montulli](https://en.wikipedia.org/wiki/Lou_Montulli), gave you a blink tag, but he claims it was implemented by someone else.
-   Microsoft answered with a scrolling marquee. No one wanted to take credit.

Both quite [honestly sucked](https://thehistoryoftheweb.com/blink-marquis-tag/), but it was early times so I won’t blame Lou or

(That might be the wrong one but who’s looking?).

A site built for one broke in the next, so designers rebuilt the same thing three times and called it a living.

Press enter or click to view image in full size

Zeldman.com — Mid 90’s. Those were wonderfully fun times and that is lovely use of yellow and purple.

Then a small group decided the chaos was a choice and not a fact of nature, and they made the case for standards.

was the lead pirate.

In the theme of [Fight Club](https://en.wikipedia.org/wiki/Fight_Club), we have to keep saying his name to honor his contribution to the field. His name is Jeffrey Zeldman.

> Zeldman did not invent the specifications, he did something harder: He convinced an entire industry that shared conventions were worth fighting for, and he won. Zeldman changed the world with a stance, not a specification and we should thank him for it.

We are living through that moment again, this time for the interfaces we wrap around models, the skills we scaffold on top of them and representations they mean.

The browsers have new names: ChatGPT, Claude, Gemini, and Copilot each handle the same task their own way, with their own conventions for parsing content, showing reasoning, citing a source, and asking permission before they act.

There are no shared standards to make them consistent, so the patterns are unsettled, the vendors are playing jazz, and the window to shape the conventions is open.

**We’re in a revolution, as**

**so correctly** [**points out**](https://uxdesign.cc/the-revolution-was-the-easy-part-c753340e3e22)**. It will not stay open long, so it is worth studying what Zeldman did, and asking what we can borrow. We really have to get this right.**

Press enter or click to view image in full size

The idea that outlived its technology: pull structure, presentation, and behavior into separate layers.

## What Happened Before: Zeldman and the Fight for Web Standards

### A Magazine and a Coalition

Start with who he is, because a surprising number of designers working today have never had to learn the name. The gap is wider than one name.

Most designers now arrive in the field with no working knowledge of how its standards were won— who fought for them, against what, and why it mattered. I ask designers and get a lot of blank stares.

That gap runs right up through the people teaching design, many of whom cannot pass on a history they were never handed themselves. A profession that forgets how it climbed out of its last mess is well positioned to climb back in.

So here is the history worth recovering.

[Jeffrey Zeldman](https://www.zeldman.com/) is, in the phrase Business Week gave him, the [King of Web Standards](https://zeldman.com/2007/08/07/businessweek-king-of-webstandards/). He has been publishing at his own site since the mid-1990s. In 1998 he founded [A List Apart](https://alistapart.com/), the magazine for people who make websites, which became the place where the craft argued with itself and got better.

That same year he co-founded the [Web Standards Project](https://www.webstandards.org/), a grassroots coalition of designers and developers with an unglamorous goal: get the browser makers to support the same technologies the same way.

Note who he organized: the designers and developers who built the web, one page at a time. Other than [my disagreements with him](https://www.usabilitycounts.com/2011/10/18/how-to-get-started-in-user-experience-seven-tips/) using really small type.

His other efforts:

-   [A List Apart](https://alistapart.com/) gave them a place to argue and learn, the Web Standards Project gave them a banner
-   [An Event Apart](https://aneventapart.com/), which he co-founded in 2005, gave them a room to stand in together
-   [A Book Apart](https://abookapart.com/index.html) grew knowledge of the field by selling book.

This was grassroots in the literal sense. The pressure came up from the people closest to the markup — the ones paying the daily tax of the chaos — rather than down from above.

### The Browser Wars

That goal sounds small until you remember what it was up against. Browser makers treated the web as territory to capture, not a commons to tend.

Microsoft and Netscape shipped incompatible features by design, because lock-in was the strategy. Zeldman and his collaborators spent years making the case, in public and in private, that this served no one over the long run — not users, not designers, not even the browser makers.

Browser makers treated the web as territory to capture, not a commons to tend, and it showed up in the [quality of their products](https://www.kegel.com/jbug.html).

### The Argument That Outlasted the Tools

His 2003 book, [Designing with Web Standards](https://www.amazon.com/Designing-Web-Standards-Jeffrey-Zeldman/dp/0321616952), was the argument in its most durable form and the first half was not aimed at developers at all.

It was aimed at the people who sign the checks: here is why separating structure from presentation from behavior makes your site cheaper to build, faster to load, easier to maintain, and reachable by more people.

The book is credited with moving the industry off tag soup and Flash and toward semantic markup and accessibility, and it ended up as a textbook in dozens of college programs.

Here is the part I keep coming back to. Zeldman’s real achievement was never a specification, it was a shared belief that the web should work the same way for everyone, held widely enough that building any other way started to feel embarrassing.

**Standards won because enough people decided they should.**

Press enter or click to view image in full size

Design systems are the standards movement’s direct descendant — shared parts, recombined.

## Why It Matters: What the Standards Movement Won

So what did the standards movement win, and how did it win it? Three things worth stealing.

### A semantic separation as a standard

The core move was to pull structure, presentation, and behavior into distinct layers so each could change without breaking the others. That one idea outlived every specific technology it was built on.

It is why a design system works at all.

When

introduced [atomic design](https://bradfrost.com/blog/post/atomic-web-design/), he was extending the same instinct: stop shipping pages, start composing interfaces from small, shared, recombinable parts. Design systems are the standards movement’s direct descendant, and they are the closest thing we have to a working model for AI interface conventions.

Hold onto that frame, because it names the work: this is a design systems problem. Documenting a pattern once and reusing it everywhere did not begin with atomic design, or even with the phrase “design system.”

built one of the first public pattern libraries at Yahoo in the mid-2000s and traced the whole lineage, from forward, in [A History of Patterns in User Experience Design](https://erinkmalone.medium.com/a-history-of-patterns-in-user-experience-design-f21f7eaabb83). The industry already knows how to stop reinventing the same button.

AI is that problem at a larger scale, and the answer is the same shape: a shared, documented, governed system instead of a fresh pile of one-offs per product.

### A business case before the moral one

Zeldman did not lead with accessibility as a virtue, though he believed in it.

He led with cost and reach, which was exactly the right leave: standards-based sites cost less to build, load faster, and reach more people. Accessibility came bundled with the economics, which is how it got adopted. Do it right, and [you don’t get sued](https://adasoutheast.org/legal/court/national-federation-of-the-blind-v-target-corporation-2/).

> _If you want a convention to spread, make it cheap, not just the righteous. VHS won over Betamax for exactly that reason._

That is the lever, and it is the one most AI teams are ignoring while they chase novelty. Simplicity wins, full stop.

### A coalition, not a command

No one had the authority to mandate standards. The Web Standards Project had no power except persuasion, a body of shared work, and the patience to keep making the case until the browser makers found it easier to comply than resist.

> The standards did not come down from a committee; they came up from practitioners who agreed with each other, in public, until agreement became the default.

Put those wins next to the vocabulary the standards era produced, and you get a checklist. Every concept below was hard-won for the web, and each one now has an AI-shaped gap where the next convention belongs.

-   **Separation of concerns.** Structure, presentation, and behavior became distinct layers. Keep a model’s reasoning, its output, and its actions inspectable and separate, rather than fused into one opaque block of text.
-   **Accessibility.** The web committed to working for the people the median design forgot. Extend that to AI — legible to assistive technology, honest about what the model cannot do, and usable when someone opts out of the automation.
-   **Semantic markup.** Tags gave content meaning a machine could read. AI output needs the same: a claim, a citation, a guess, and an action should each be labeled and legible, not flattened into identical prose.
-   **Progressive enhancement.** Pages worked without the fancy parts, then improved where support existed. AI features should degrade to a dependable path when the model is wrong, slow, or unsure, instead of collapsing.
-   **Responsive design.** Layouts adapted to context instead of assuming one screen, the case made in [Responsive Web Design](https://alistapart.com/article/responsive-web-design/). Generative interfaces can adapt to task and person the same way, as long as the adaptation stays predictable. Most of this foundation was built off Zelman’s work.
-   **Interoperability.** The whole point was that a page worked the same across browsers. The equivalent now is shared interaction patterns across assistants, so moving between tools does not mean relearning the rules every time.

Press enter or click to view image in full size

Every vendor has invented its own gestures — the proprietary web, rebuilt for AI.

## Why We Need It Now: The AI Interface Moment Is 1999 Again

Now look at where we are. Artificial intelligence has adoption numbers the standards movement could only dream of.

## Get Patrick Neeman’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

ChatGPT alone [reached eight hundred million weekly users in 2025](https://techcrunch.com/2025/10/06/sam-altman-says-chatgpt-has-hit-800m-weekly-active-users/), and inside companies the pattern holds: in OpenAI’s own [state of enterprise AI report](https://openai.com/index/the-state-of-enterprise-ai-2025-report/), three in four workers said the tools improved the speed or quality of their output. The demand is not in question. The interface is.

Jakob Nielsen has called this [the first new user interface paradigm in sixty years](https://www.nngroup.com/articles/ai-paradigm/) — a shift from telling the computer how to do a thing to telling it what you want and letting it decide how.

> Nielsen is right, and that is exactly the problem. A new paradigm means some conventions are settled but not all.

How should a model show its reasoning? How should it cite a source, signal how confident it is, or hand a task back to a person when it is out of its depth? Every product answers differently, and most answer badly.

That inconsistency carries a cost people are only starting to name. When every model formats its reasoning, its sources, and its confidence differently, you cannot line two answers up side by side — which is exactly what evaluation needs. Comparing answers across systems has become hard, and that is quietly degrading the evaluations teams rely on to know whether any of this is working. You end up grading the packaging instead of the answer.

> _This is 1999 wearing new clothes._

Back then a site worked in one browser and broke in the next. Today a workflow works in one assistant and falls apart in another, because every vendor has invented its own gestures, its own affordances, its own quiet rules about what the machine will and will not do.

We are pouring the same proprietary concrete, only faster and with more money behind it.

And the interface is only the visible half. Beneath it sits the scaffolding of skills — the reusable units of capability a model draws on, and the conventions for describing, discovering, and composing them.

Every platform defines a skill its own way and wires up its tools on its own terms. One piece is further along than the rest: the [Model Context Protocol became a cross-vendor standard](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/) for connecting models to tools in barely a year.

That is the tell.

The shape of the capability layer is being set right now, and most of it is still up for grabs.

The web had a single surface to tame: the page in a browser. AI is spreading across many at once — chat, voice, autonomous agents, assistants embedded in every application, and interfaces that assemble themselves on the fly.

Every new surface is another place for conventions to fork, and another set of rules for people to relearn. This is the part the excitement obscures: new surfaces need standards more than ever, because the cost of getting them wrong now compounds across all of them.

Mobile is where this gets concrete. It is the surface most people live on, and the one where agents grow real teeth — booking, buying, and messaging across apps on your behalf, sometimes on standing permission. The AI inside mobile apps and the agents acting across them both need shared rules for consent, confidence, and handoff, or the most personal device becomes the most inconsistent one.

The lock-in logic is identical too. When your patterns are yours alone, switching costs go up and users get stranded. What looked like a moat in 1999 became a liability the moment standards made the rest of the web interoperable. That reckoning is coming for AI interfaces. The only question is whether designers shape it or inherit it.

Press enter or click to view image in full size

The same story, twenty years apart — a tangle of incompatible interfaces slowly resolving into shared convention.

## What It Should Look Like: Building Shared Standards for AI Interfaces

None of this happens by waiting. Here is where the work is.

### **Name the patterns before the vendors lock them in.**

The web got semantic markup because designers agreed on what a heading, a list, and a link meant before the tools decided for them.

Do the same for AI interfaces now: agree on what “show your work,” “cite your source,” and “I am not sure” should look and behave like, as reusable components rather than one-off features.

The same discipline belongs a layer down, in how a skill is described, discovered, and combined, so capabilities compose instead of colliding. If you keep a component library, this is where shared AI patterns belong.

My own [ux-components.com](https://ux-components.com/) is one attempt at that; build your own and build it in the open.

### **Make traceability and confidence first-class parts of the interface.**

The most dangerous thing an AI interface can do is present a guess with the same visual authority as a fact. Standards-era design stripped false neutrality out of markup by making structure explicit.

The equivalent move today is to make sourcing, traceability, and calibrated confidence visible by default, so a person can see where an answer came from and how far to trust it. Treat that as a convention, not a competitive differentiator.

> _The most dangerous thing an AI interface can do is present a guess with the same visual authority as a fact._

### **Build the coalition, not the mandate.**

You do not have the authority to set an industry standard, and neither did the Web Standards Project. What you have is your own work, done in public, and the willingness to keep making the case.

-   Publish your patterns.
-   Argue for them at conferences and in writing.
-   Adopt other people’s good conventions instead of reinventing them for credit.

Start this week: take one convention you have already settled — how your product signals confidence, say — write it down, and publish it where another team can find and copy it.

Standards spread when agreeing becomes easier than diverging, especially when cost is involved.

### The New Markup Is Markdown

There is a quieter version of this already taking shape in the projects agents work in — [Markdown as a baseline](https://www.taskade.com/blog/markdown-history), which also has a long history [back to 2004](https://en.wikipedia.org/wiki/Markdown) as invented by [John Gruber](https://daringfireball.net/) and the late [Aaron Swartz](https://en.wikipedia.org/wiki/Aaron_Swartz). It is cheap and good, thus has become a standard.

Agents increasingly take their instructions from plain text files that sit beside the work — AGENTS.md for how an agent should behave in a project, SKILL.md for what a capability can do, README.md for the context around both.

> This is the new semantic layer. It is markup again, written in Markdown and read by a model instead of a browser.

That layer inherits two disciplines the web spent twenty years learning, and it is being built as if neither exists. The first is accessibility, and right now it is missing from what informs the agent.

A model generating an interface has no accessibility standard in front of it, so it ships whatever it ships. Those requirements — contrast, focus order, alternative text, keyboard paths — belong in the file that guides the agent, feeding it up front rather than getting bolted on after the interface is generated. The second is content strategy. Voice, terminology, reading level, and the shape of what a model produces are decisions, and right now they are made by default, one prompt at a time, with no shared model to anchor them.

So write the files down, and standardize what goes in them.

A design.md that carries your design system’s patterns, tokens, and rules into every agent that touches the product. An accessibility.md that states the non-negotiables in language a model can follow. A content.md that fixes voice, terminology, and the content model.

The set is not fixed — a research.md for what you know about users, a brand.md for identity, whatever your practice depends on.

Name them, share them, and treat them the way the web learned to treat structure, presentation, and accessibility: as a contract, not a preference.

### The W3C Already Built the Machinery and We should Use it

Here is the part that should make this feel less daunting. You are not starting from nothing.

The [World Wide Web Consortium](https://www.w3.org/) — the W3C — has run an open, consensus-based standards process since 1994. It produced the specifications that Zeldman’s coalition spent years pushing browser makers to honor.

The division of labor back then is worth remembering. The W3C wrote the standards, and the Web Standards Project made adoption non-optional. One body defined the shared language; a movement made it stick.

That machinery did not disappear. It still runs the accessibility, privacy, and security work that any responsible AI interface will need, and it has already turned toward this moment. In 2025 the W3C launched a [Web and AI Interest Group](https://www.w3.org/blog/2025/ai-at-tpac-2025/) to work through how AI technologies intersect with the web, and community groups there are drafting early protocols for how agents identify themselves and cooperate.

You are not waiting for this to begin. It has begun. A partial map of the standards taking shape right now:

-   [**Model Context Protocol**](https://modelcontextprotocol.io/) — a shared way for a model to reach tools, data, and context, already adopted across rival platforms and now stewarded by a neutral foundation.
-   [**A2UI**](https://a2ui.org/introduction/what-is-a2ui/) — a declarative protocol for agents to describe interfaces that render natively across web, mobile, and desktop, keeping what the interface is separate from how each client draws it.
-   [**Agent2Agent**](https://a2a-protocol.org/latest/) — an open protocol for agents to discover one another and collaborate across frameworks and vendors, launched by Google and handed to the Linux Foundation.
-   [**The W3C AI Agent Protocol Community Group**](https://www.w3.org/community/agentprotocol/) — a grassroots group drafting open rules for a trustworthy web of agents.
-   [**Agent identity work**](https://www.w3.org/community/agent-identity/) — cross-body efforts, at the W3C and beyond, to verify who an agent is and what it is allowed to do before it acts.

None of these is finished, and that is the opening. The conventions are still soft enough to shape, which is exactly where Zeldman’s coalition made its difference.

So leverage the past instead of relighting the fire. Extend the accessibility standards that already exist rather than inventing parallel ones, and bring your patterns to the groups already forming instead of publishing them into a silo. The lesson of the browser wars is not only that standards win. It is that the institutions to make them are already here, and the work is joining them, not founding a rival.

## Conclusion

The standards moment is not a prediction. It is a choice, and it is being made right now, mostly by default.

Every AI product that ships a novel interface without asking whether it should be novel is casting a vote for chaos — for a world where each assistant works its own way, users relearn the rules with every tool, and the people who get stranded are the ones with the least patience for our cleverness. That world is not inevitable. It only feels that way because no one with a title is going to stop it.

Zeldman’s lesson is that no one ever does. Standards did not arrive because an authority demanded them. They arrived because a stubborn coalition of practitioners decided the web should work the same way for everyone, and then made that true one argument at a time.

We are the practitioners now. The models are astonishing and the interfaces around them are a mess, which is exactly the condition Zeldman walked into and refused to accept.

So look back, take what worked, and get to work. The window is open, the same one Zeldman climbed through. It closes the moment we agree the chaos is normal.