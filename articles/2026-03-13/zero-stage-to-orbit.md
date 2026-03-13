---
title: "Zero Stage to Orbit"
source: "https://uxmag.com/articles/zero-stage-to-orbit"
publishedDate: "2026-03-12"
category: "ux-research"
feedName: "UX Magazine"
author: " Erika Flowers "
---

Digital design and development is just a baby.

Well, it was a baby. We’re toddlers now, but compared to most other sciences and engineering, we’re just barely exiting the cradle. We sent people to the moon with less processing power than your average car’s key fob.

![](https://uxmag.com/wp-content/uploads/2026/03/image-5-1024x873.png)

_Conceptual illustration of an astronaut offering a car key on the Moon. Image by [Erika Flowers](https://www.linkedin.com/in/helloeflowers/)_

Almost all human advancement was done in the pre-digital era. Centuries. Millennia. Eons. [Most of the people responsible for modern computing workflows are](https://eflowers.substack.com/p/the-any-key-concepts-you-skipped) _[still alive.](https://eflowers.substack.com/p/the-any-key-concepts-you-skipped)_

However, like most babies, we’re afraid to leave the cradle. But like all babies, eventually, we have to leave the cradle. And I think we are ready.

We’re going to be okay, and we’re going to outgrow this cradle together.

## Two people you’ve never heard of, but know very well

In 1903, a deaf Russian schoolteacher named [Konstantin Tsiolkovsky](https://en.wikipedia.org/wiki/Konstantin_Tsiolkovsky) published a paper proving that a single rocket could never carry enough fuel to reach orbit. The fuel itself was too heavy. You needed fuel to carry fuel, and fuel to carry that fuel, and the math was merciless. His solution: staging. Burn a section, drop the dead weight, burn the next. It was inelegant. It worked. It became the only way to reach space for the next 120 years.

In 1996, a Hungarian-American linguist named [Béla Bánáthy](https://en.wikipedia.org/wiki/B%C3%A9la_H._B%C3%A1n%C3%A1thy) published a model for how social systems change. Two phases: diverge to explore the problem widely, converge to focus on action. It was a tool for thinking about how complex human systems evolve. Nine years later, the British [Design Council](https://en.wikipedia.org/wiki/Design_Council) adapted his model into the [Double Diamond](https://en.wikipedia.org/wiki/Double_Diamond_\(design_process_model\)). Discover, Define, Develop, Deliver. It gave designers a shared language for how work actually moves from problem to solution. It was clear. It was useful. It became the way things are done.

![](https://uxmag.com/wp-content/uploads/2026/03/image-6-1024x1017.png)

_Illustration by [John Nychka](https://www.linkedin.com/in/john-nychka-5a89a95/)_

Both solved what felt like an impossible problem. Both delivered their payload. And both became so foundational that questioning them felt like questioning gravity itself.

**Wait.** We’ve seen this before; turn the Double Diamond on its side… no way:

![](https://uxmag.com/wp-content/uploads/2026/03/image-7-1024x751.png)

_Comparison of the [Double Diamond](https://en.wikipedia.org/wiki/Double_Diamond_\(design_process_model\)) design process with a Saturn V launch profile. Composite graphic by [Erika Flowers](https://www.linkedin.com/in/helloeflowers/)_

**Hold the fort!** Is… is design thinking just multi-stage rocketry? Oh heavens, what have we done?

![](https://uxmag.com/wp-content/uploads/2026/03/image.png)

## The tyranny of the rocket equation

The rocket industry faces a legendary, seemingly impossible problem. It is called single-stage-to-orbit (SSTO), and it has been the holy grail of spaceflight for decades — the dream: a vehicle that launches from the ground and reaches orbit in one continuous burn. No boosters. No jettisoned fuel tanks. No staging sequences — one machine, ground to orbit, clean and elegant.

It is effectively impossible (especially with useful payload and reusability) with chemical rockets.

![](https://uxmag.com/wp-content/uploads/2026/03/image-8-1024x591.png)

_As shown in the red line, the relationship between the **speed** you need and the **amount of fuel** required is not a simple straight line — it is an **exponential curve**. Graph by [Erika Flowers](https://www.linkedin.com/in/helloeflowers/)_

The reason is beautiful in its cruelty. To reach orbit from Earth’s gravity well, you need fuel. But fuel has mass. And mass requires _more_ fuel to lift. Which adds more mass? Which requires more fuel? The Tsiolkovsky rocket equation is a tyrant: every kilogram of payload demands exponentially more propellant, and most of that propellant exists only to carry other propellant — fuel to carry fuel to carry fuel.

So the entire industry built itself around the workaround: multi-stage rockets. You burn a stage, drop the dead weight, burn the next stage, drop that. [Saturn V](https://en.wikipedia.org/wiki/Saturn_V) had three stages. [Falcon 9](https://en.wikipedia.org/wiki/Falcon_9) recovers its first. The whole architecture of spaceflight (the launch pads, the recovery ships, the mission control protocols, the thousands of engineers managing staging sequences) exists because we cannot escape the overhead of launching from the bottom of a gravity well.

This is not about rockets.

This is about the design-to-development pipeline. And the mapping is precise:

![](https://uxmag.com/wp-content/uploads/2026/03/image-1-1024x468.png)

_Rocket engineering versus product design and development phases. Diagram by [Erika Flowers](https://www.linkedin.com/in/helloeflowers/)_

Each stage in the traditional pipeline is designed to compensate for the limitations of the previous one. Research to inform design. Design to spec for developers. Specs to survive handoff. QA to catch what handoff broke. Retros to discuss why QA caught so much. Process to manage process.

Fuel to carry fuel. The modern development pipeline is not a solution. It is a multi-stage rocket. And most of the energy is going to overhead.

## The launch pad economy

[Stafford Beer](https://en.wikipedia.org/wiki/Stafford_Beer) mapped this architecture in 1972, though he was describing organizational cybernetics rather than rockets. His [viable system model](https://en.wikipedia.org/wiki/Viable_system_model) showed how complex organizations manage themselves: layers of policy, intelligence, control, and coordination stacked above the operational units that do the actual work. Each layer communicates through artifacts. Each handoff introduces signal loss. The distance between intent and execution is maximum by design.

![](https://uxmag.com/wp-content/uploads/2026/03/image-9-707x1024.png)

_Illustration by [Mark Lambertz](https://intelligente-organisationen.de/mark-lambertz)_

![](https://uxmag.com/wp-content/uploads/2026/03/image-2.png)

Beer was not criticizing this. He was _describing_ it. The model works. It has worked for decades, and an enormous economy has grown around it, making it work more smoothly.

Think about what exists because we launch from the ground. Project managers are the staging sequence coordinators, managing transitions among research, design, development, and QA. Without the stages, the coordination role transforms (it does not disappear, but the _overhead coordination_ portion evaporates). Design systems became fuel standardization: not the craft of creating coherent visual language (that remains essential) but the bureaucratic layer of maintaining Figma libraries as translation documents between designers and developers. Sprint ceremonies are mission control. Handoff documentation is payload fairing, the protective shell that keeps the intent from burning up during the transition between stages.

Take a walk with me through the design translation graveyard, era by era:

### The Handoff Era:

-   Zeplin (the original “inspect mode” bridge between Figma and dev).
-   Abstract (version control for Sketch files, because designers needed Git but could not use Git).
-   InVision (prototype links emailed to stakeholders who never clicked them).
-   Red Line specs (before Zeplin automated it, people literally drew red lines on screenshots with pixel measurements).
-   Avocode (you don’t even remember this one).

### The Sapec Document Era:

-   Axure RP (200-page interactive specs nobody read past page 12).
-   Balsamiq (wireframes as a deliverable, not a thinking tool).
-   OmniGraffle (the Mac-only flowchart tool that felt like a religion).

### The Coordination Overhead Era:

-   Basecamp (the original “where did the decision live?”).
-   Confluence (where documentation went to die).
-   JIRA (the story points industrial complex).
-   Rally (I can’t think of a clever thing to say).
-   Microsoft Visio (every flowchart that ever lied about how a system actually worked).
-   Requisite Pro (IBM requirements management, pure overhead in a box).

### The Prototype-as-Proof Era:

-   Flash/Macromedia Director (interactive prototypes that were harder to build than the actual product).
-   Dreamweaver (the original “design in the browser” lie).
-   Frontpage (we do not speak of this).
-   GoLive (go away).

Not to mention the _**primary**_ tool genealogy of Corel, Photoshop, Fireworks, Sketch, Framer, Affinity, Figma…

![](https://uxmag.com/wp-content/uploads/2026/03/image-10-1024x797.png)

_Image by [Erika Flowers](https://www.linkedin.com/in/helloeflowers/)_

None of these is bad. All of them are _overhead_. And here is the thing: an entire economy is built on maintaining this overhead. Design system consultancies — Handoff workflow vendors. Agile coaching practices. Process improvement certifications. Conference circuits dedicated to making the multi-stage rocket more aerodynamic.

The launch pad industry does not want you to launch from orbit. Because the launch pad industry does not exist in orbit.

## The single-stage myth

Before orbit was available, there was an earlier attempt to escape the gravity well. The industry called them “design technologists” or “full-stack designers.” The SSTO dream, translated to human form: one person who could do research, design, front-end development, sometimes back-end, testing, and deployment. All stages in one body. No handoffs. The unicorn.

And like SSTO with chemical rockets, **it was a physics problem.**

No single human being could span all of those disciplines at production quality. The fuel was too heavy. You could design _and_ code, but your designs lacked the depth of a specialist, and your code lacked the rigor of a dedicated engineer. You could research _and_ prototype, but neither at the level a focused team would deliver. The cognitive load of maintaining fluency across that many domains was the fuel-to-carry-fuel problem in human form.

![](https://uxmag.com/wp-content/uploads/2026/03/image-11-1024x919.png)

_No human can do it all, but this thing can. Image by [Erika Flowers](https://www.linkedin.com/in/helloeflowers/)_

So people tried it. They burned out. They produced stretched-thin work across too many fronts. And the industry responded with a verdict that sounded like wisdom: _“See? You need specialists.”_ Which was really: _“See? You need stages.”_ Which was really: _“See? You need us.”_

Let’s do a roll call of everyone needed to manage the process of processes:

### The translation roles:

-   UX Designer (vs. UI Designer vs. Visual Designer vs. Interaction Designer vs. Product Designer).
-   Design Technologist (the SSTO unicorn who burned out).
-   Frontend Developer (the person who translates the mockup).
-   UI Engineer (when “frontend developer” was not specific enough).
-   Design Engineer (the latest attempt at SSTO, same physics).
-   Creative Technologist.

### The coordination roles:

-   Product Manager (the human API between business, design, and engineering).
-   Project Manager (the human API between the team and the timeline).
-   Program Manager (the human API between projects).
-   Scrum Master (professional ceremony facilitator).
-   Agile Coach (coaching people to do ceremonies better).
-   Delivery Manager (what).
-   Release Manager (what).
-   Technical Program Manager (this is probably the one that survives).

### The handoff roles:

-   Business Analyst (translates business needs into requirements documents).
-   Systems Analyst (translates requirements into technical specs).
-   Solutions Architect (translates technical specs into system design).
-   QA Engineer (catches what the handoffs broke).
-   QA Analyst (writes test cases from specs that have already drifted from intent).
-   UAT Coordinator (manages the meeting where stakeholders see what they asked for and realize it is not what they meant).

### The design system bureaucracy:

-   Design System Lead.
-   Design System Engineer.
-   Design Ops Manager.
-   DesignOps (the entire discipline).
-   Design Tokens Specialist (yes, this is real).
-   Component Library Maintainer.
-   Figma Librarian (we all know one).

### The process management layer:

-   Sprint Facilitator.
-   Retrospective Facilitator.
-   Kanban Flow Manager.
-   Value Stream Mapping Consultant.
-   Lean UX Coach.
-   DevOps Engineer (when the deployment pipeline needed its own specialist).
-   Platform Engineer (when DevOps needed its own specialist).
-   SRE (when Platform Engineering needed its own specialist).

**But the diagnosis was wrong**, not about the symptom (the burnout, the mediocrity across disciplines) but about the cause. The design technologist did not fail because no one person can possess all the skills. The design technologist failed because no one can hold all the skills while still fighting gravity. They were still launching from the ground, still hauling the translation overhead, just with one person doing all the hauling instead of a team.

The problem was never the number of stages. It was the gravity well.

## You were never supposed to launch from here

This is where the rocketry lens reveals something the standard “AI changes the pipeline” framing misses.

I have written about [Zero-Vector Design](https://zerovector.design/) before: the elimination of intermediary translation tools between intent and artifact. The website demo. The diamond is breathing differently. All of that holds. But the rocketry metaphor reframes it. This is not a _procedural_ issue. It is a _structural_ one.

The gravity well is the translation layer itself. Not any particular tool or handoff or ceremony, but the fundamental architecture of separating “the person with the intent” from “the artifact the customer touches.” Every process improvement, every better handoff template, every tighter sprint cadence is optimizing the rocket. Building a more efficient multi-stage vehicle to escape the same gravity.

Zero Vector does not build a better rocket. It eliminates the launch.

![](https://uxmag.com/wp-content/uploads/2026/03/image-3.png)

When the person with the vision operates directly through AI agents (researching, designing, building, testing, shipping in a continuous loop), the stages collapse. Not because the disciplines become irrelevant. Research still matters. Architecture still matters. Testing _absolutely_ still matters. But the handoffs between roles, the translation artifacts, the distance between what you meant and what gets built: that collapses to zero.

-   **Multi-stage:** The research team writes a report. The designer interprets the report into wireframes. The developer interprets the wireframes into code. The QA finds the gaps between wireframes and code. Everyone meets to discuss the gaps. Another sprint begins.
-   **From orbit:** You research it. You design it. You build it. You test it. You ship it. Same mind. Same session. Zero translation.

You are not in the gravity well looking up. You are in orbit, and from orbit the question is genuinely puzzling: **why would you descend to the bottom of a gravity well just to launch back up again?**

I am brought back to one of my favorite books, [Arthur C. Clarke](https://en.wikipedia.org/wiki/Arthur_C._Clarke)’s _“[The Fountains of Paradise](https://en.wikipedia.org/wiki/The_Fountains_of_Paradise),”_ where the moment humans learn to build the space elevator, the constraints of the gravity well go away, and we gain access to the universe.

## Rational actors defending their gravity well

The resistance to this framing is not intellectual. It is economic. And I need to be precise here, because this is the section where the argument risks sounding like it attacks people. It does not.

Look at who benefits from the multi-stage rocket. Not the practitioners (they are exhausted by it). Not the customers (they receive intent degraded by four handoffs). The beneficiaries are the _infrastructure providers_. The companies are selling launch pad equipment.

Design system consultancies that charge six figures to build and maintain component libraries, which are, at their core, translation documents between design and engineering. Handoff workflow tools that monetize the gap between Figma and production code. Agile coaching firms that sell process optimization for the staging sequences. Sprint planning software. QA automation suites built specifically to catch translation errors introduced by staging. Conference circuits dedicated entirely to making ceremonies more efficient, handoffs cleaner, and burndown charts more precise.

The institutionalization of all of us is so complete that we don’t remember, recall, or imagine a time or future where this isn’t necessary. Like every [Kafkaesque](https://en.wikipedia.org/wiki/Franz_Kafka#%22Kafkaesque%22) nightmare, it feels normal because it is all we know.

I want to be careful. The people in these roles are skilled, thoughtful, and operating rationally within the system as it exists. A launch pad engineer is not a villain for building launch pads when every rocket on Earth needs one to fly. These professions emerged to solve real problems, and they solved them well.

But when orbit becomes available, the launch pad engineer faces a structural question. Some of that expertise translates directly: you still need quality thinking, architectural judgment, someone who knows what “good” looks like, and will not ship until they see it. Some of it does not. The coordination overhead, the handoff management, the translation layer itself: that portion evaporates. And the people who built their professional identity around managing overhead will, naturally, defend the overhead. Not because they are bad actors. Because they are rational actors in a system that rewarded overhead management for decades.

The system _was_ rational. The gravity well _was_ real. The overhead _was_ necessary.

**Until it was not.**

![](https://uxmag.com/wp-content/uploads/2026/03/image-4.png)

Every “process improvement” in the traditional pipeline is building a more efficient multi-stage rocket. Better handoffs. Cleaner specs. Tighter sprint ceremonies. And none of its questions whether we should still be launching from the ground.

## Field notes from orbit

Theory is comfortable. Let me tell you what it actually looks like.

I built Fictioneer, an AI-powered story development platform, with a crew of AI agents. Not a metaphorical crew. An actual operating team: a strategist, a frontend engineer, a backend specialist, a researcher, a marketing lead, a content czar. Each agent holds domain expertise, follows established patterns, and works through structured workflows. I am the operator. They are the crew.

![](https://uxmag.com/wp-content/uploads/2026/03/image-14-1024x683.png)

_Image by [Chris Boyer](https://unsplash.com/@csgboyer)_

There is no design-to-development handoff because there is no gap between design and development. Intent moves through the agents into the artifact. Research flows into architecture, flows into code, flows into testing, flows into deployment. One session. Zero distance. No translation artifacts.

This isn’t a utopia, and the space elevator and orbital launches have their own entire set of dangers, challenges, and costs. It isn’t a panacea; it is just the next step in the evolution. A new set of problems to solve, which I think is better than looping around the same set of old problems over and over.

And I need to be honest about what orbit costs, because I do not want to sell paradise. I have written about this at length: the loneliness of building at forge temperature, the offers of collaboration that evaporate when the heat arrives. That is real, and orbit does not fix it.

There is no team standup where someone catches the flaw in your data model. No design review where a colleague pushes back on your navigation architecture. The quality gates you would normally distribute across five people, you hold alone (with agent support, but still). That is not nothing. (And honestly, some days it is a lot.)

But here is what changes. In the multi-stage rocket, most of your energy goes to hauling fuel. Coordinating handoffs. Managing translations. Writing specs that survive the gap between what you meant and what someone else builds. In orbit, _all_ of your energy goes to the work itself. The research. The design. The architecture. The craft. The stuff that actually reaches the person on the other end.

That is not a small difference. That is a different physics.

## Why are you launching from the ground?

The rocket equation is a tyrant, and the entire spaceflight industry organized itself around submission to that tyranny. Launch pads. Staging sequences. Recovery ships. Mission control. All of it was built to manage a constraint that was, for decades, immovable.

But the constraint moved.

And now the question is not how to build a better multi-stage rocket. Not how to optimize the handoffs, improve the sprint cadence, or produce cleaner translation documents between design and development. Those are all answers to a question that stopped mattering.

**The question is: why are you still launching from the ground when orbit is available?**

I am not being rhetorical. I am genuinely asking. If the translation layer is the gravity well, and AI agents collapse the distance between intent and execution to zero, and the skills that actually matter (research, design thinking, architectural judgment, taste, craft) are _more_ critical in orbit than they ever were on the ground, then what is the argument for building another multi-stage rocket?

![](https://uxmag.com/wp-content/uploads/2026/03/image-16-1017x1024.png)

_Photograph by [Miguel J. Rodriguez Carrillo/AFP](https://www.instagram.com/miguelrodriguezlens/?hl=en)_

And look, I was at [NASA](https://en.wikipedia.org/wiki/NASA) when the [Artemis II](https://en.wikipedia.org/wiki/Artemis_II) missions were being planned, and I had contact with those teams in my role as an IT Specialist/Digital Service Expert. The SLS is reusing the approach developed in the 60’s and 70’s. Many criticize it. I am finishing this article on **Feb 21st, 2026**, launch date is slated for **March 6th, 2026**. I want to see Artemis succeed as much as anyone else in the agency.

**But most of us aren’t actually launching rockets** (_at least, I’m not anymore_)**,** we’re shipping SAAS, we’re shipping mobile apps, we’re shipping consumer-grade digital products. So why do we cling to the multi-stage methods of the past?

Comfort, maybe. Familiarity. The reasonable fear that orbit is just another SSTO dream that will flame out on the way to space. The sunk cost of a career organized around staging sequences. Those are fair concerns.

The fuel ratio is still the same. The overhead is still overhead. The translation tax still compounds with every handoff. And the tools that make orbit possible are not theoretical anymore. They exist. They work.

The gravity well was real. The infrastructure was necessary. The industry that grew around it was rational and built by smart people solving genuine problems.

And, I am also uncertain here, also mid-journey, also discovering orbit’s real constraints in real time. My career, work, and livelihood are just as much at risk as everyone else’s. But that doesn’t discount the facts about the transition to new capabilities.

And now that orbit is available, the launch pad is optional.

The gravity well is just a cradle. And no one stays in the cradle forever.

_Want to go deeper? Hear [Erika Flowers](https://www.linkedin.com/in/helloeflowers/) take this further in conversation on the [Invisible Machines](https://www.youtube.com/watch?v=TJeplJ6hcAs&t=26s) podcast_

_The article originally appeared on [Substack](https://eflowers.substack.com/p/zero-stage-to-orbit).  
Featured image courtesy: [George Pisarevsky](https://unsplash.com/@impermanent)._