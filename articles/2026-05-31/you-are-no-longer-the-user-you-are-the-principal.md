---
title: "You are no longer the user. You are the principal."
source: "https://uxdesign.cc/you-are-no-longer-the-user-you-are-the-principal-3a6222e0780a"
publishedDate: "2026-05-28"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

## Google just promoted you. The architecture below has already shipped.

[

![Adrian Levy](https://miro.medium.com/v2/resize:fill:64:64/1*t_lkQAu6x_5Zft81dWrOIw.png)



](https://medium.com/@arqadrianlevy?source=post_page---byline--3a6222e0780a---------------------------------------)

14 min read

6 days ago

Press enter or click to view image in full size

![Architectural cross-section of a darkened apartment at night. A laptop sits on a desk, lit by a single warm lamp. Amber light-traces flow from a calendar, an email icon, and a bank icon into the device — agent activity continuing while the user is away. Cool gray drafting lines define the room; a faint cyan network mesh reaches into the frame from the right.](https://miro.medium.com/v2/resize:fit:1000/1*6CAHfE7qh1NFKzjXKjU4YQ.png)

Visual 1 — Delegated Presence. Generated with Gemini.

Halfway through the [Google I/O 2026 keynote](https://blog.google/innovation-and-ai/sundar-pichai-io-2026/), I closed the lid of my laptop. I waited. The instinct to open it again did not arrive.

That had not happened to me in thirty years.

I rewound the stream. [Sundar Pichai](https://www.youtube.com/watch?v=duHhImuaZGU) had just said six words that should not have been comfortable to hear: _“So you don’t need to keep your laptop open.”_ He was describing [Gemini Spark](https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/), Google’s new personal AI agent — a program that runs on a dedicated virtual machine inside Google Cloud, twenty-four hours a day, regardless of whether you are at the screen.

The sentence was not about laptops. The sentence was about whether the device — the thing I have opened every morning since 1996, the thing my hands know how to find in the dark — is still where the work happens.

I watched the rest of the keynote with a different kind of attention. Spark scanning credit card statements while a user sleeps. Information Agents pulling from the open web 24/7 without a query. [Antigravity 2.0](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/) orchestrating ninety-three sub-agents in parallel. [Android Halo](https://9to5google.com/2026/05/19/android-halo/) — a single luminous dot in the corner of the phone — that exists for one purpose: to inform me that _something is happening on my behalf, somewhere else, right now_.

Across the demos, almost none required the person at home to be at the screen. The work was being done. The screens stayed dark.

The profession spent thirty-five years asking _how good the interface is_. Then five years asking _how good the assistant is_. Both questions assume something so fundamental that no one has had to name it: that the person the system is designed for is _present at the system_.

The reading most outlets ran with after the keynote was that I/O 2026 was “the year AI finally learned to do things.” That is the short review, and it is wrong by one register. What Google shipped this week is not better doing. It is the first complete consumer-scale stack built around the premise that **the human is not the operator**.

The human is the _principal_. The agent is the operator. The architecture is the substrate they meet on.

Those three terms are not synonyms for user, AI, and app. A user _operates_. A principal _authorizes_. A user is _present_. A principal is _represented_. A user fails when the interface confuses them. A principal fails when the agent acts in ways the principal would not have authorized — even if the agent technically did what it was told.

The vocabulary of user-experience design — affordance, learnability, mental model, navigation — was built to serve users. None of it serves principals. There is no discipline yet for the design of delegated authority. Google just made that gap visible at the scale of a billion-user product. I have been calling this shift, across my work, [_Architecture 7_](https://a.co/d/00qkAvLz): the moment when interaction stops being driven by what the user _does_ and starts being driven by what the user _intends_, while an autonomous layer translates one into the other, and adapts.

## Four people arriving at the same place from four different directions

What makes Google’s announcement worth reading architecturally is not that they saw something nobody else saw. It is that the most careful observers of AI and design — none of them at Google, none of them speaking to each other — were already there.

> [_John Maeda_](https://johnmaeda.medium.com/design-in-tech-report-2026-from-ux-to-ax-f9d83164f4d2)_, VP of Engineering and AI Platform at Microsoft, has published the Design in Tech Report every year for eleven years. In March 2026 — two months before Google’s keynote — he called the shift from UX to AX (Agentic Experience) the most profound moment he has seen in that entire period. His framing of what changes for designers:_ “As AI acts on human intent directly, designers will be designing for agents rather than users. The shift is from the gulf of execution to the gulf of evaluation.”
> 
> [_Ethan Mollick_](https://www.oneusefulthing.org/p/a-guide-to-which-ai-to-use-in-the)_, at Wharton, put the same observation more bluntly in February:_ “An AI that does things is fundamentally more useful than an AI that says things.”
> 
> [_Microsoft’s Work Trend Index 2026_](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization) _— twenty thousand knowledge workers across ten countries, fielded between February and April — measured the shift in numbers: active agents in the Microsoft 365 ecosystem_ grew _fifteen times year over year. Eighteen times in large enterprises._
> 
> _And_ [_Victor Yocco_](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)_, a ServiceNow UX researcher writing in Smashing Magazine, distilled the design problem into one sentence:_ “Autonomy is an output of a technical system. Trustworthiness is an output of a design process.”

Four people. Four institutions. Four different angles — academic, design-trend tracking, organizational research, hands-on practice. They had not spoken to each other. They arrived at the same description.

Pichai did not announce the agentic era. He shipped its first complete consumer stack.

Press enter or click to view image in full size

![Sectional diagram divided into two horizontal zones. Upper zone, labeled PRINCIPAL, contains a single silhouetted human figure observing. Lower zone, labeled AGENT, contains swirling amber light-traces around small geometric shapes — the agent at work. A thin line labeled DELEGATION separates them. Below both, a cyan network grid labeled SUBSTRATE.](https://miro.medium.com/v2/resize:fit:700/1*ro1TPRchYIQYC9FiV5LpGA.png)

Visual 2 — Principal vs Agent.Generated with Gemini.

## Six layers, one shift

Six announcements matter architecturally. Each one targets a different layer — your device, the developer’s tools, the open web, the operating system, search, and the model itself. Read together, they say the same thing six times from six directions.

Press enter or click to view image in full size

![Six-floor architectural cross-section. From top to bottom: DEVICE / Spark with a laptop and a human figure; DEV TOOLS / Antigravity with parallel agent nodes; OPEN WEB / WebMCP with a handshake mesh; OS / Halo with a phone showing a single amber dot; SEARCH / Info Agents with a radial node; MODEL / Omni with deep machinery. Vertical amber light-traces flow upward through all six layers. The axis on the right marks USER-FACING above and SUBSTRATE below.](https://miro.medium.com/v2/resize:fit:700/1*h9QPaw0yEEGWEHe96fKulg.png)

Visual 3 — The Six-Layer Stack. Generated with Gemini.

### 1\. Gemini Spark — when your presence becomes optional

Imagine waking up tomorrow to find a forgotten subscription already flagged for cancellation, an article a friend sent already summarized to three bullets, a reservation confirmed because your meeting partner suggested a time and the slot was free. Your laptop was closed. The work happened anyway.

That is Gemini Spark. It lives on a dedicated virtual machine inside Google Cloud, assigned to you, running continuously. Pichai’s framing was direct: _“It’s 24/7, so you don’t need to keep your laptop open.”_

For thirty years, computing was an activity. You sat down, opened something, did something, closed it. Now the device is one of several windows into a process happening elsewhere, all the time, whether you are looking or not. The interface is no longer where the work occurs. It is where you find out the work occurred. This is the era of _delegated presence_.

### 2\. Antigravity 2.0 — when the developer becomes a director

A developer used to write code line by line — open the editor, type, run, fix, type. The unit of work was the line.

Now picture the same developer giving a one-sentence brief — _“build a prototype, deploy it to staging, run the tests, tell me if anything broke”_ — and watching ninety-three small agents spawn in parallel, each handling a sub-task. Twelve hours later: prototype live, tests run, summary waiting. Cost: under a thousand dollars.

That is Antigravity 2.0. The developer’s job is no longer to write the code. It is to specify the intent, watch the cohort work, and verify the result. The unit of skill changes from _what you can type_ to _what you can specify, supervise, and accept_. This is what Maeda meant by designers becoming “orchestrators of experiences rather than crafters of interfaces.” The cohort is the new unit. No UX discipline exists for cohorts yet — nobody has built it.

### 3\. WebMCP — when the web learns to speak to machines

In 2010, every website had to learn a new language: the iPhone reached critical mass and the web had to be re-rendered for a glass rectangle in a pocket. We called it _responsive design_. It transformed an entire profession.

The web just received a similar assignment. But the new reader is not human.

[WebMCP](https://developer.chrome.com/blog/chrome-at-io26) the open web standard co-authored by Google and Microsoft that introduces the first native agent protocol, will rewrite the web’s timeline much like Netscape 1.0 or Chrome 1.0 did. Its core mechanism is radical: it allows websites to declare, in a purely machine-readable form, exactly what they can be asked to do. A travel site publishes: _“I can search flights given dates and a budget.”_ A bank publishes: _“I can return a transaction history filtered by date.”_ Agents read these declarations and _call_ the website directly — without ever loading the visual page or rendering a pixel of design.

If responsive design was the moment websites learned to talk to phones, WebMCP is the moment they learn to talk to agents. The visual layer — the part our profession spent thirty years perfecting — is, for this audience, optional. The previous four transformations of the web all assumed a human at the rendering end. WebMCP is the first that does not.

### 4\. Android Halo — when the phone has to show you what you are not doing

A notification means _“something happened, look.”_ An app icon means _“tap me to do something.”_ For fifteen years these two grammars defined the phone. Both assumed you were the one acting.

What does the phone show when _something else_ acts on your behalf?

## Get Adrian Levy’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

Google’s answer is Android Halo: a glowing dot — perhaps eighteen pixels — in the upper-left corner of the status bar that morphs into the Gemini sparkle when an agent acts on your behalf, somewhere else, right now. No tap target. No demand for attention. It is the raw primitive of an architecture of omission.

That third clause is the design problem of the next decade. The old UI grammar cannot host it. Halo is the first attempt at a new primitive — one designed for a principal who is _represented_, not a user who is present.

Notice what is missing. No log of agent actions. No timeline. No revocation gesture. No interruption affordance. Halo is what I would call an _Architecture of Omission_ — a UI element whose meaning is defined by everything it deliberately does not show. The omissions are the design. Halo is also the _gulf of evaluation_ Maeda named, compressed into a circle of light: when the system acts faster and more often than the human can verify, the surface that proves the work was done correctly has to be invented. A glowing dot is a first answer. It is not a sufficient one.

The paradox cuts both ways. If the principal sees every action, the dashboard becomes the new full-time job and the delegation collapses — the agent stops being useful the moment it requires the same attention the principal was trying to escape. If the principal sees nothing, the agent becomes a black box and delegation curdles into alienation: things get done in your name that you neither chose nor would have chosen. The design problem is not to choose between full transparency and full omission. It is to design the gradient. What is omitted by default has to be _retrievable on demand, legible on inspection, and revocable on suspicion_. The discipline of the next five years is calibrating that gradient — deciding what stays in the dot, what surfaces on tap, and what should never have been omitted in the first place.

Press enter or click to view image in full size

![Horizontal timeline marking seven moments in 586 years of information architecture. From left: printing press 1440, card catalog 1876, Turing machine 1936, GUI window 1984, web globe 1989, smartphone 2007. The seventh node, 2026, is rendered as a radiant amber burst — a single point branching into a constellation of agents, devices and figures. A gentle amber arc traces the curve of history connecting all seven.](https://miro.medium.com/v2/resize:fit:1000/1*BnQNc-31oxM-V6I1uhmq4A.png)

Visual 4 — Architecture of Omission. Generated with Gemini.

### 5\. Information Agents in Search — when the question disappears

For twenty-seven years, Google Search worked the same way. You had a question. You typed it. You got ten blue links. The transaction depended on three assumptions: you knew what you were looking for, the answer existed, and you would recognize it.

Information Agents throw out all three. The agent watches for you, continuously, in the background. It surfaces what you did not know existed. It recognizes relevance on your behalf.

Hold this image: you spent the morning writing about a topic. You did not search for anything. Two hours later a notification appears — _here are three sources published this morning that contradict your central claim, and a researcher you should probably cite_. You did not ask. The agent inferred.

Pair this with Search’s new _generative UI_ — each query producing a singular, custom interface — and the artifact called _“the search results page”_ dissolves. There is no longer a stable page. There is only what the agent produces, for you, this time. _Findability_ — the problem Dewey opened in 1876 — is no longer the question. What the agent decides to bring you, unbidden, is.

Read this from the principal’s seat and the design problem inverts. The user used to decide what to query. The principal now has to decide what kinds of things they _want the agent to bring them, unbidden, in their name_. That is no longer interaction design. It is the design of an authority to interrupt — granted in advance, revisable the moment the principal notices the agent is bringing the wrong things, or the wrong shape of things, or surfacing on behalf of someone whose interests are not theirs.

### 6\. Gemini Omni — when the model stops describing and starts predicting

A text model predicts what _people would say next_. It writes essays, drafts emails. A sophisticated autocomplete trained on the written record of humanity.

A _world model_ is a different category. It does not predict text. It predicts _the world_. If you throw a ball, what trajectory does it follow? If a customer hesitates on a checkout page, what tends to come after the hesitation?

Gemini Omni is Google’s first commercial world model. Its capability is not that it speaks well. It is that it has internalized, approximately, _how things behave_.

For the agent acting on your behalf, this changes the substrate. As long as AI was a text predictor, the agent was bounded by what humans had written down. With a world model, the agent acts on a _synthesized model of reality itself_. The question Google did not address: whose model of the world is the agent using when it acts in your name?

That question is the new design surface. The designer of this era specifies which behaviors of the world the model is permitted to assume on the principal’s behalf, which inferences it is forbidden to make, and where its predictions stop counting as guidance and start counting as decisions. The flowchart is no longer the artifact. The artifact is the _contract between the principal’s intent and the model’s permitted picture of reality_. No design discipline has been built for this yet.

Six layers, one message: **the user is no longer at the center of the system. The principal is at one end. The substrate is the new field of design.**

## This has happened six times before

The rupture is not surprising. It is on schedule.

Press enter or click to view image in full size

![Seven Transformations. Horizontal timeline marking seven moments in 586 years of information architecture. From left: printing press 1440, card catalog 1876, Turing machine 1936, GUI window 1984, web globe 1989, smartphone 2007. The seventh node, 2026, is rendered as a radiant amber burst — a single point branching into a constellation of agents, devices and figures. A gentle amber arc traces the curve of history connecting all seven.](https://miro.medium.com/v2/resize:fit:700/1*0VZK9-Ial0mI5oyTj0k9QA.png)

VISUAL 5 — Seven Transformations. Generated with Gemini.

In 1440, Gutenberg’s press took knowledge out of the cloister. In 1876, Dewey turned the library into a navigable schema. In 1936, Turing described a machine that could simulate any other machine. In 1984, the graphical interface put computation in the hands of people who had never typed a command. In 1989, the World Wide Web made every document an address. In 2007, the smartphone collapsed all of it into a glass rectangle in a pocket.

Each transformation rewrote _who_ the system was designed for. Each one rendered the previous question obsolete. And the recent precedents — Perplexity Comet, Cursor, NotebookLM, Cowork — are already on the market, treated as products rather than read as the leading edge of an architectural shift. I/O 2026 is the moment the shift goes from product to stack. From experiment to substrate.

## What the new architecture costs

A framework that does not declare its own breakdown is propaganda. Four seams of Architecture 7 — most of them visible in Google’s keynote by their absence. Naming the problem is the first step toward designing around it.

**The _Legibility Problem_.** When the agent succeeds it feels like magic; when it fails there is no surface to inspect. Halo gives you a dot, not a verification surface — Maeda’s _gulf of evaluation_ compressed into eighteen pixels.

**The _Autonomy Paradox_.** The more reliable the agent becomes, the less equipped the principal is to detect failure. Microsoft’s _Work Trend Index 2026_ names the number: even after fifteen-times growth in adoption, 86% of users still treat AI output as a starting point — manually closing the verification gap autonomy was supposed to eliminate.

**The _Serendipity Cost_.** Information Agents optimize for objectives the principal has already expressed. They cannot optimize for the wandering that surfaces objectives you would not have known to express. The shelf you used to wander along on the way to the book you came for — gone.

**The _Intention Gap_.** A confused user notices confusion. An over-confident agent does not. Yocco names the entire 2026 design problem in one line: _“Autonomy is an output of a technical system. Trustworthiness is an output of a design process.”_ Google shipped the autonomy. The _here is what I inferred — is this what you meant?_ was not on stage.

## The strongest objection

The most useful critique of agentic AI right now is not coming from skeptics. It is coming from practitioners who think the description is overconfident. Jared Spool — founder of [Center Centre / UIE](https://centercentre.com/), four decades watching design fashions arrive and leave — puts it this way: _“The world romanticizes AI as an all-powerful, game-changing technology when, in reality, it barely works.”_

He is not wrong. Spark demos flawlessly. Antigravity runs ninety-three sub-agents for a thousand dollars. But anyone who has shipped agentic features knows the other side: the recap that summarized the wrong meeting, the agent that booked the restaurant for the wrong night, the sub-agent looping silently on a bug while burning through the token budget. Demos are clean. Production is dirtier. That gap sharpens — does not diminish — the design problem. If the agent is unreliable 9% of the time, the discipline of the next five years lives in that 9%: how failure becomes visible, how the principal recovers control, how trust is rebuilt after a misfire. Microsoft’s _Work Trend Index_ names the two essential skills of the agentic era — _quality control of AI outputs_ and _critical thinking_. Both belong to the principal, not the user. Both are completely undesigned for in any product Google shipped this week.

## What has not been designed yet

If you are designing products in 2026, your job is not to make better assistants. It is to design the conditions under which a principal can intelligibly delegate authority to an agent operating in their absence.

That is a different set of questions than the ones the discipline has been asking.

What does _consent_ look like when the action will happen six hours from now, against information the principal does not yet have? What does _visibility_ look like when the work happens in a virtual machine you cannot see? What does _revocability_ look like when an agent has already acted? What does _literacy_ look like when the system the user interacts with is itself a population of agents, not a single tool?

None of these have been answered. Most have not been seriously asked.

Twenty-five years ago, working as an architect, I asked whether musical data could become navigable space — whether information abstract enough to need a structure could be turned into something a person could walk through. The question has not changed. What changed is that the person is no longer the one walking. An agent is.

Press enter or click to view image in full size

![Two-level sectional drawing in watercolor-and-line style. Lower level, labeled USER, shows two translucent dashed figures bent over an architectural drafting table — the user as a historical operating role. Upper level, labeled PRINCIPAL, shows a single solid standing figure, observing, not operating. Amber light-traces rise between the two levels. Beneath both, a cyan network grid labeled SUBSTRATE.](https://miro.medium.com/v2/resize:fit:700/1*AOAY2JP-xfDHSF2zwq7JTw.png)

Visual 6 — Two Roles. Generated with Gemini.

The user was always a particular historical configuration of a human and a system. The configuration changed. There is a different role waiting on the other side. It is called _the principal_. No discipline has been designed for it yet.

The question is not whether Google’s agents work. They do — well enough to reach nine hundred million Gemini app users this summer. The question is whether you will spend the next decade designing menus, prompts, and onboarding for someone who already handed in their keys. Or whether you will start designing for the room they walked into next — the one where the work happens in their name, and the only thing they leave behind is a glowing dot.