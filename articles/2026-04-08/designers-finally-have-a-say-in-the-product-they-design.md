---
title: "Designers finally have a say in the product they design"
source: "https://uxdesign.cc/designers-finally-have-a-say-in-the-product-they-design-396c999e1227"
publishedDate: "2026-04-07"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

## AI didn’t teach designers to code. It gave them back the decisions that were always theirs.

[

![Daniel Mitev](https://miro.medium.com/v2/resize:fill:32:32/1*eOqwgFsbHFMbzYpwxTdHuQ.jpeg)



](https://medium.com/@danielmitev?source=post_page---byline--396c999e1227---------------------------------------)

7 min read

Mar 31, 2026

Press enter or click to view image in full size

![Hand pressing an “Enter” key above a terminal window with code, symbolizing direct designer control over implementation and interaction with code.](https://miro.medium.com/v2/resize:fit:1000/1*FHU_M4kv9dnvnf7dJOdE_A.png)

I’ve been thinking about a particular kind of frustration that most designers I know have felt at least once or probably more. You finish a component. You’ve thought through every state, every transition, the exact weight of the animation as it resolves. It goes into development. It comes back. And something is off. Not broken, just slightly dulled. The easing curve is close, but not right. The hover state lost a frame somewhere. The spacing got rounded to the nearest token.

You leave a comment. You annotate the Figma file more carefully next time. You try to communicate feel through static documentation, which is a bit like trying to describe a song by writing down the sheet music and hoping someone hears what you heard.

Most designers have learned to absorb this. It becomes part of the rhythm: design, handoff, approximate, iterate. A tax paid on every component, every sprint, for the entire lifecycle of the product. Small enough to ignore on any given Tuesday. Large enough, in aggregate, to explain why so many products feel like they were made with care for the screenshot but not for the experience.

What’s changed — and why it matters more than the “designers should code” conversation ever did — is that the structural reason for this tax is dissolving.

Press enter or click to view image in full size

![A hand lifting a serving dome to reveal a keyboard on a plate, illustrating the tension between technical execution and presentation or expectations.](https://miro.medium.com/v2/resize:fit:700/1*Tn42ppQU-pNUV8t5-1q_iw.png)

## The wrong conversation

The industry has been asking whether designers should code for over a decade. It was always the wrong question, or at least the wrong framing. It implied the barrier was technical: that designers lacked something fundamental, something that required years of study to acquire. Learn TypeScript. Understand the DOM. Earn your way across the divide.

That wasn’t the barrier.

When I read [Anna Lefour’s account](https://uxdesign.cc/the-design-engineer-symptom-what-a-rising-job-title-reveals-850d5e4fd9cc) of what happened at Tracksuit, designer

going straight to Claude Code, skipping Figma altogether, but what strikes me isn’t the technical feat. It’s how ordinary it seems to have become. There was no big leap or turning point. It was just the quicker route.

And at Alan, the [“Everyone Can Build” initiative](https://alan.com/en/blog/discover-alan/a/everyone-can-build) tells a similar story at a larger scale. Over two quarters, designers, PMs, and ops teams shipped 283 pull requests directly to the codebase, each paired with an engineering reference responsible for the final merge. It started with something small: a button colour that was taking weeks to ship, not because it was complex, but because the person who spotted the problem couldn’t fix it themselves.

**The gate was open. It just took the right structure to make walking through it feel normal.**

What those tools didn’t provide was coding knowledge. What they removed was the organizational justification for keeping designers out in the first place.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*b5K1XFs2qRZNYCZeRuZvSQ.png)

## Something always gets lost at handoff

The developer implementing your component isn’t ignoring the detail you put in. They’re solving a different problem — architecture, logic, performance, the parts of the stack that sit far from the surface. The easing curve isn’t their primary concern. It isn’t even in their top ten concerns on most sprints. So it gets approximated. Not maliciously. Just deprioritized, the way everything is deprioritized when there’s more work than time.

This has always been the structural problem with the handoff model: it asks someone with different priorities to faithfully render intent they didn’t generate. The result is a product that functions but doesn’t quite feel considered — because the consideration was separated from the medium.

What’s worth sitting with is how invisible this cost is. It doesn’t appear in a bug report. Users don’t file tickets saying the animation lacks conviction. The product ships, it works, and somewhere in the gap between what was designed and what was built lives a version of the product that nobody gets to experience.

## Get Daniel Mitev’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

Designers have always known this. The question was never awareness. It was access.

Press enter or click to view image in full size

![Broken fortune cookie on an orange background with a message reading “Design what users feel,” symbolizing insight about user experience and product perception.](https://miro.medium.com/v2/resize:fit:700/1*B5zRk5JCGxIaT4vGof-3rA.png)

## Authorship, not access

There’s a version of this argument that’s just about efficiency: fewer revision cycles, less annotation overhead, faster iteration. That version is true, but it undersells what’s actually at stake.

A micro-interaction that resolves with the right timing carries information. It tells the user the system registered their action, that something is responding. When that timing gets approximated in translation, the product loses a small piece of its reliability. Users don’t articulate this. They just develop a vague sense that the product is slightly less trustworthy than it could be. Multiply that across a design system, across a year of releases, and you have the cumulative drift that separates products that feel crafted from products that merely function.

What AI tooling gives back is authorship over the surface layer — the part users actually touch. A designer can now open the codebase, adjust how an element behaves, change how a transition feels, and verify the output against their own intent in real time. The easing curve gets set by the person who decided what it should feel like. The hover state gets defined by the person who thought through why it matters. That work no longer requires an interpreter.

And for the frontend engineer, that shift frees up something real. The decisions that were taking up sprint capacity — what the focus ring looks like, how a tooltip animates in, whether a disabled state reads clearly — those now have a natural owner. Engineers can direct their attention toward the architectural decisions that actually need their expertise: performance, system integrity, the judgment calls that determine whether a codebase is still maintainable two years from now.

Press enter or click to view image in full size

![Street crossing scene overlaid with AI-style labels identifying roles and percentages, visualizing how systems classify people and reduce complexity into data.](https://miro.medium.com/v2/resize:fit:700/1*TIZnApDvpW9QpfgWc2Zdyg.png)

## The role that’s shifting

It would be easier to skip this section… The version of this story where everyone benefits, where designers get new tools and engineers get to focus on harder problems, is mostly accurate. But it skips over something that deserves to be named directly.

The front-end developer whose primary function was translating design intent into code is in a materially different position than they were two years ago. Not because that work lacks value, but because the translation layer is compressing. AI handles enough of it, consistently enough, that the economics of the role are changing. That’s true even if it’s uncomfortable to say.

What doesn’t compress is the judgment that makes a codebase maintainable over time. Assessing a contribution against the architecture’s long-term integrity, knowing the system’s failure modes, enforcing standards that only make sense once you’ve watched a design system break in production — that work requires experience and standing that AI assists with at the margins, at best.

The role that emerges looks less like a bridge between disciplines and more like a system quality function. Someone whose job is ensuring the integrity of everything that flows into the codebase, regardless of source. That role has real leverage. It’s just different from what it replaced, and it’s worth being honest about that difference rather than pretending the transition is purely additive.

Press enter or click to view image in full size

![Top-down view of a meeting table with people labeled as designers and engineers, highlighting role distribution and decision ownership in product development.](https://miro.medium.com/v2/resize:fit:700/1*BFRa61wP9JGdlqPxQnMGHg.png)

## What this actually requires

None of this is available to teams by default. The conditions that make it work are specific, and most organizations haven’t created them yet.

A design system that lives only in Figma isn’t structured for this. The teams where designers are contributing real, mergeable code — Tracksuit, Alan, others moving in the same direction — have invested in design systems as structured, machine-readable context. Token documentation, component APIs, clear naming conventions, behavioral specifications. When that structure exists, AI can generate output that respects the system rather than approximating it. When it doesn’t, AI tooling just produces inconsistency faster.

The organizational condition matters as much as the technical one. The designers contributing most effectively in this model are working with engineering, inside the same quality standards, with engineers who own system integrity reviewing what gets merged. That relationship makes the designer's contribution real and sustainable.

The “designers should code” framing set up a binary that was always more about territory than skill: learn the full stack or stay in your lane. What’s actually opening up is narrower and more practical than that. A designer with strong design system knowledge, working in a structured environment with AI assistance and engineering review, can take ownership of the implementation of their own work. The discipline doesn’t disappear. The interpreter does.

For designers who’ve spent years watching their craft get approximated on the other side of a handoff, that’s a meaningful change. The gate was never locked. We just needed tools that made it obvious.

If you’re exploring how design, AI, and real product execution come together, we’ll get along well.

I share perspectives on UX strategy, design systems, agentic workflows, and how to turn ideas into build-ready products. If that’s relevant to what you’re working on, feel free to reach out or continue the conversation.

🔗 LinkedIn: [https://www.linkedin.com/in/daniel-mitev](https://www.linkedin.com/in/daniel-mitev)  
🌐 Website: [https://www.danielmitev.com](https://www.danielmitev.com/)