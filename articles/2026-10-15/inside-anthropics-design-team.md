---
title: "Inside Anthropic’s design team"
source: "https://designerfund.com/blog/ai-design-anthropic"
publishedDate: "2026-10-14"
category: "design"
feedName: "Sidebar"
---

For decades, the software industry operated under an implicit rule: engineering bandwidth was the ultimate bottleneck. There were always far more ideas than people to build them, and bringing any single vision to life was slow, expensive, and tedious.

Over the past few years, AI has started to flip that equation. Anthropic offers a vivid preview of what happens when execution becomes dramatically easier. As of May 2026, [over 80%](https://www.anthropic.com/institute/recursive-self-improvement) of the code merged at the company was authored by Claude.

With AI shrinking dev cycles from weeks to hours, teams can sometimes build a working prototype before they’ve even agreed it’s a good idea. That shifts more of the burden toward design. Instead of spending as much time figuring out _how_ to build, Anthropic’s product design team is increasingly focused on deciding [what’s worth making](https://www.linkedin.com/pulse/whats-worth-making-joel-lewenstein-xcgqc/).

When code is cheap and working software can be generated almost instantly, the central challenge of product development shifts from “how do we build this?” to “should we build it at all?”

We spoke with Joel Lewenstein, who leads product design at Anthropic, alongside members of his team including designers Nate Parrott, Meaghan Choi, and Kyle Turman, and UX researcher Matt Gallivan, to understand how they’re adapting to these changes.

![](https://i.ytimg.com/vi_webp/5E8n3CItlHM/sddefault.webp)

What you’ll learn:

-   What happens when engineering gets faster than design
    
-   How Anthropic designers are moving closer to production
    
-   Why building your own tools has become part of the job
    
-   How AI is changing collaboration, critique, and the skills designers need
    

[_Watch on YouTube_](https://stateofaidesign.com/cases/anthropic) _•_ [_View the full case study_](http://stateofaidesign.com/cases/anthropic)

### The gap between design and eng velocity

A feature that once took weeks of engineering hours can now be shipped within days, sometimes hours.

This is the crux of what’s happening in product development, and part of what’s putting new pressure on design teams. With each model advancement, the gap grows between how quickly engineering can execute and how long it takes teams to choose a direction and align around it.

Joel calls this **timescale compression**. Engineers are moving roughly 10x faster than before; in comparison, design has sped up by just 3-5x.

![A rough estimate of how much engineering and design have accelerated with AI. Illustrative, not measured productivity data.](https://framerusercontent.com/images/LdjX6umTCUnbiGuoklqqVG9C3cg.png?width=1456&height=679)

This imbalance creates an organizational friction point: justifying a week of design exploration becomes difficult when engineering can build the entire feature in 48 hours. “Time is a socially interesting and challenging dimension right now,” says Joel.

Bridging that gap requires rethinking how designers spend their time, how they work with code, and where AI can take over routine work so humans can focus on judgment.

### Work directly in the medium you ship in

Every designer at Anthropic pushes a pull request during their first week.

Some spend most of their time in code, while others use it strictly for prototyping or final polish. Joel is agnostic about specific workflows, so long as designers stay close enough to influence the final product.

> “Code is basically one more tool in the tool belt to affect user experience in the way we want. There are just no excuses for not being deeply involved in the final delivery process. Code has always been the clay for software.”

Designing directly in that clay forces immediate honesty. A static design file can gloss over an awkward transition, but a working prototype can’t. If clicking an element requires a new state, that state has to exist. As Joel puts it: “You can’t bullshit in a prototype.”

To stay closer to production, some designers have automated the technical steps that used to interrupt their flow. Meaghan Choi, who leads design for Claude Code and Cowork, has built reusable skills for the things she finds herself doing over and over:

-   _/fresh_ syncs her with the latest code and starts a clean branch, so she can begin making changes without doing the setup manually.
    
-   _/preview_ starts the front end locally so she can immediately see and test what she’s changing.
    

When she runs into a Git or deployment step she doesn’t understand, she asks Claude to solve it. If the same problem comes up again, she turns the fix into a reusable skill.

Earlier this year, Meaghan showed a more ambitious example at a Dive Club event in New York (watch her full demo [here](https://www.youtube.com/watch?v=hKeDfupbA4U)). Her _/prototype_ skill takes a feature idea and generates interactive HTML previews. She typically prompts for five variations, asks Claude to recommend the strongest option with rationale, and then makes her own call.

![Meaghan demoed some of her Claude Code workflows live at Dive Club’s NYC event a few months ago.](https://framerusercontent.com/images/4YdJvZ77dAO7wnrgAUbekdXeQ.png?width=1456&height=958)

But it goes beyond prototyping. “The real superpower of coding comes when you’re not just prototyping in a playground, but when you’re actually pushing to production,” Meaghan says. “Because that’s the end product your audience is going to see.”

The sense of agency that creates is part of why design feels so fun to her right now:

### Build around your own bottlenecks

Anthropic’s security and privacy requirements limit some of the third-party software employees can use. **One result is a strong build-it-yourself culture.**

Designers spin up small apps, deploy them internally, and share them with each other, creating a lush garden of tools. Some become part of the team’s daily workflow; others solve a narrow problem for one person and don’t need to go any further. As Joel puts it, “we just make the tools ourselves.”

Kyle Turman, the company’s first full-time product designer, estimates that Anthropic employees have built at least 30 custom IDEs for themselves. It usually looks something like this: “Hey, I made this cool tool. You can use it or you can fork it, or you can steal some of the code and make your own version of this.”

What’s especially exciting is that this ability to build bespoke software is vastly expanding what non-technical team members can do.

When Joel asked for a more consistent way to understand how users felt across Anthropic’s products, UX researcher Matt Gallivan used Claude to build a weekly survey system and dashboard. It took him about a week to get it up and running; he estimates this would once have taken two or three researchers a couple of months.

How Matt describes the changes in his role:

> “Ever since the beginning of 2026, I’ve been part user researcher, part product designer, part PM, part engineer. I’m doing things as a non-technical person that I have absolutely no business doing, but doing stuff that is adding real value. It’s making my work more effective. It’s helping move the team forward.”

![The weekly product quality dashboard Matt built with Claude in a week’s span](https://framerusercontent.com/images/dSL7kCGagMeu5FBPR8Rp7UMiyk.png?width=1456&height=852)

These internal tools often evolve into core initiatives, much like Claude Code, which notably began as Boris Cherny’s [side project](https://x.com/bcherny/status/2004887829252317325) in 2024.

In fall 2025, Nate Parrott was the sole product designer alongside two engineers working on Claude Code’s VS Code experience. As Claude sped up the engineers’ work, Nate started experimenting with how it could help him explore design ideas faster too. He decided to feed Anthropic’s complete design system (fonts, colors, components, content guidelines, and UI patterns) into an HTML generation environment.

Instead of manually drafting three options in Figma, now he could generate a dozen interactive variations side-by-side and keep branching from what worked.

After colleagues began adopting it for meeting presentations, Anthropic assigned a dedicated team to develop it into a full product for visual explorations and prototyping. It eventually became [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs). Nate tells more of the story in [this interview](https://www.dive.club/deep-dives/nate-parrott-2).

![Examples of prototypes and visual explorations made with Claude Design.](https://framerusercontent.com/images/Y5oPp5Ulo9qLEhtrqJx8gLalMac.png?width=1456&height=818)

### A new operating rhythm for working together

The trap of everyone moving so fast with AI is that you can easily disappear into a solo loop. Everyone’s spending more time prompting and in the terminal, and less time in live back-and-forth with teammates.

To keep teams aligned, Anthropic has reworked some of its collaborative rituals:

-   **Smaller, more frequent crits:** The team shifted from meeting twice weekly in larger groups to meeting up to four times a week in smaller pods. “The idea that you’d meet once a week and work would remain stable and unchanging is laughable given our pace,” says Joel.
    
-   **Demos over memos:** Rather than writing lengthy spec documents, designers bring working code prototypes to spark debate. On Kyle’s team, standups expanded from 30 to 90 minutes to thoroughly debate requirements and architecture before spending afternoons implementing them with Claude.
    
-   **Preserving context:** Because code history lacks the visual lineage of canvas-based design tools, one designer built _go/krit_ to log project states, manage critique sessions, and surface recurring UX themes across teams.
    

There’s a clear inversion at play: AI makes independent execution almost frictionless, but that speed can open up more time for high-bandwidth collaboration. For Kyle, having more space to talk through problems with teammates is one of the most rewarding aspects of working this way.

At the same time, more meetings aren’t always the answer. Some parts of design still require uninterrupted solo time, and trying to optimize every minute of the creative process misses the point. AI can pull up past user research or generate dozens of initial layouts in seconds, but Joel argues there is a core part of human creativity that simply resists acceleration.

“There is just some ineffable piece where I need a day to go for a walk, let my brain relax, and sleep to let the neurons connect,” says Joel. “We still need to protect that time.”

![](https://framerusercontent.com/images/vy3IgEOKeSjZxjGHO21xf8l8.png?width=1456&height=819)

### What Anthropic looks for in design talent

What makes a strong designer at Anthropic is changing along with the work. Technical fluency matters, but Joel doesn’t expect every designer to spend all day writing production code. What helps is a baseline comfort with developer workflows like GitHub, branches, and pull requests, so code doesn’t become a barrier.

Beyond that, he looks for a few things:

1.  **A willingness to keep changing how you work.** “Almost every couple months you have to rethink your process,” Joel says. He calls it a kind of _molting_: trying new tools, letting go of workflows that no longer make sense, and rebuilding your process as the models evolve.
    
2.  **A point of view on where software is going.** The team wants designers who have thought seriously about how interfaces and interaction models might change over the next few months, rather than waiting for fully scoped briefs.
    
3.  **A maker mentality.** Sometimes the job is setting a bigger product direction; other times it’s dropping into the details and building the next version. The strongest designers are comfortable moving between the two.
    

### What is worth making?

Joel often returns to [The Squiggle](https://thedesignsquiggle.com/about), Damien Newman’s illustration of the design process moving from mess and uncertainty toward a single point of focus. AI can make the left side of the Squiggle move much faster: more ideas, more prototypes, and more directions explored. But it doesn’t remove the need to converge. If anything, having so many possibilities makes reaching that final point of focus even harder.

As Joel puts it: “We can make all the software in the world, and yet my phone holds only 16 apps and my day only has 18 waking hours. The question isn’t just, _can we make it?_ It’s _is this worth making at all?_”

![Joel has long loved The Squiggle as a depiction of design’s messy journey from uncertainty to focus. With software timelines compressing, he says, “things have never felt more squiggly.”](https://framerusercontent.com/images/KeRGxSiVV475PWWOSWaAgHc4sRw.png?width=958&height=539)