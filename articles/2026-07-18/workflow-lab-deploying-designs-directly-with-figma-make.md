---
title: "Workflow lab: Deploying designs directly with Figma Make"
source: "https://www.figma.com/blog/workflow-lab-deploying-designs-directly-with-figma-make/"
publishedDate: "2026-07-16"
category: "design"
feedName: "Figma Blog"
---

###### Workflow fact sheet:

**Figma products:** Figma Design, Figma Make

**Tools:** The Figma agent, GitHub integration, Make with production code, annotations

**Team:** Designer, engineer, and product manager

**Question to solve:** What if the small fixes that make a website inclusive didn't have to wait in the backlog?

_Welcome to Workflow Lab, where we present a [sample workflow](https://www.figma.com/blog/workflow-lab-expanding-the-canvas-with-figma-mcp/)_

_using Figma products and tools._

Traditionally, the path from “I noticed a minor thing” to “it shipped” runs through a ticket. The designer writes it up, it lands in the backlog, and it gets buried under everything the engineering team has already committed to. For small, high-craft fixes, that queue is where good intentions go to die. The work is too granular to prioritize and too important to drop, so it lingers.

There’s a second cost, too. When the designer hands off a written description, the nuance gets lost. “Make the spacing a little tighter” or “the screen reader announces this wrong” turns into a back-and-forth of screenshots and clarifications, and the engineer becomes a translator of decisions the designer could have made directly. But what if there’s another way to tackle this workflow?

## [The problem](#the-problem)

Take the Museum of Speculative Futures (MOSF), a fictional museum exploring how culture imagines what comes next, as our example. They’re improving the accessibility aspects of their website alongside a complete architecture rewrite. With various competing priorities, resourcing this project is a big challenge. The designer wants to address the accessibility gaps, while the engineer needs to stay head-down on the equally important rewrite. To meet both goals, the PM suggests a different path: Keep the heavy lifting with the engineers, while the designer takes ownership of the low-lift, craft-level changes end to end using [**Figma Make with their production code**](https://www.figma.com/blog/figma-make-now-on-your-local-code/)

. The last 20% is exactly what separates a website that technically works from one that is truly accessible, so the team aligns on this game plan. Follow along as a designer flips this script and takes their work from the canvas, through review, and into a merged pull request—all without filing a single ticket.

![Figma file showing a mobile website redesign with screens for the full user journey, covered in comments and review notes connected by dotted lines.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVElEQVR4nHWTa08aQRSG+SEKxb1wBxUV2Au7K7srBasFFJCbgFBSpNKWqrFqm/7yp9nV2pimH55MJjnnnXfOzBs4O/+IW3mPse+gGSUU3aKgmf+g6CZa0UL10P7WqMV9dNPGOTzlbHZHwK3USKW3iMUT7OUV9KKBrmlomoqqa+QKBfJKDt3IYVoqlmVimgaGUfRrC4pKMpkilcliV08JmKW3iKKEJEuUq2W6vTb9Tot+t8X5eMhZv0ur16TZfke7U2N8MWI0HjIeDxgOB9QbDdLpNKIUQbcOCFh2BVGSicVjtHtNll8uWcynLK/m3P144Puvn1zf39LttWg0jhlPL1h8umS1+sxsNqXeqJPZzCDJ0WdBp4ogSsQTCYbTKavbGwb9LpPJiNvHe24eH1gsr3Bdh62tTfSiznRywcP9HSeNOtmdbURRRJL/OHSqiKJMLJFgMJ1xuVxh2zZHtSMWX5ectpu+SDKZ5E0oRCQSod1ucXP9jfKBgyAIBNfXkV5dWZSJxmN0RkMm8zm5fJ6S6/BhMcd2bARhg1AoRDAYJBwOk8/lOHBdstvb/n79laDnUJKJxqI0ux0G4xHZ3R3yikKj1URRVb/JE/PwhL295ywcfjrolaBpV/wZeq98eHzESbP5PGSJdCaNLEcIhYJ+0/9YW1vzTWmmS8AuHxOLJ5EjUXTTpOQ4pNIZBFFGlKP+d5Ak+Qn5afUMbAjiC+ENwdewnEMC9fYYRS+RzankVYO8arJb0NlTLAqGi1L00uMlwvKT5CVjr6Czs6e+kN1V/Lpa65zfHV18rGKqZkgAAAAASUVORK5CYII=)![Figma file showing a mobile website redesign with screens for the full user journey, covered in comments and review notes connected by dotted lines.](https://cdn.sanity.io/images/599r6htc/regionalized/109e9f7c7d82c472f812ee14861b883dd4b1665a-3840x2160.png?rect=2,0,3837,2160&w=1080&h=608&q=75&fit=max&auto=format)

The MOSF website opened on the Figma canvas, with several small usability issues marked: an unclear navigation label, a low-contrast date picker, and a hard-to-spot call to action.

## [Gathering feedback on the canvas](#gathering-feedback-on-the-canvas)

###### Zoom out

Synthetic personas don't replace real user research, but they surface obvious friction early—creating space for in-person sessions to go deeper.

Before touching anything, the designer wants to pressure-test the current experience. They use **[the agent](https://www.figma.com/blog/agent-custom-tools-context-skills/)**

in Figma Design to generate a set of synthetic personas—a first-time visitor planning a trip, a returning member, someone navigating with a screen reader—and have each one navigate the site to gather feedback.

The feedback comes back specific and mostly small: a confusing label on the exhibition page, a call-to-action that's easy to miss, a date picker that's hard to parse at a glance, and a search that dead-ends on a blank screen when a collection turns up no results. None of these is a big change, but together they're details that make the website easier to use.

The designer addresses the feedback, then brings the design changes back to the team for a gut check. Together, the designer, engineer, and PM walk through each one: a clearer label on the visit page, a more visible call-to-action, and a more user-friendly date picker. They agree these serve the shared goal—a site everyone can navigate and enjoy, however they experience the web.

## [Working with code directly to skip the backlog](#working-with-code-directly-to-skip-the-backlog)

###### Zoom out

The handoff inverts. Instead of the designer describing changes for an engineer to build, the designer builds them and the engineer reviews—the reverse of the usual direction, with the engineer's judgment landing at review rather than implementation.

The agreed-upon changes are small and well understood, so rather than write a ticket and wait, the designer asks the engineer for access to the codebase—not to take over the rewrite, but to handle these specific fixes directly.

The engineer grants access, and the designer connects the project’s [**GitHub repository**](https://www.figma.com/blog/figma-make-now-on-your-local-code/)

to Make. With the production codebase now live inside Figma, the designer creates a new branch off the current site and starts with what looks like the simplest fix on the list: the date picker on the exhibition page, which the Figma agent’s personas found hard to parse.

In a static mock, this is a five-minute change. But working against the code, Make surfaces something the canvas can’t: the date picker isn’t a one-off. It’s a shared component—the same one used on the events calendar and inside the membership sign-up flow. What looked like a single tweak is actually a change that needs to happen in three places at once.

###### Zoom out

A ticket would have said “fix the date picker on the exhibition page”—one screen, one fix. But the date picker is one shared component rendering in three places, and the code knows it even when the ticket doesn't.

A ticket-based workflow might have fixed the date picker on the exhibition page alone, leaving the events calendar and the membership flow on the old version—an inconsistency nobody would notice until much later, if at all. Because the designer is in the code, the shared dependency is visible now, and the fix can be made once, in the right place.

Once completed, the designer works down the rest of the list: the clearer label, the more visible call-to-action, the friendlier empty states. Each is minor on its own, but together they're what turns a site that merely works into one that feels considered—the last 20% that usually never makes it out of the backlog.

## [Reviewing with the whole team](#reviewing-with-the-whole-team)

###### Zoom out

The date picker's screen reader experience gets decided in the same review as how it looks onscreen, shaping accessibility alongside design, not after it.

With the changes in place, the designer sends the work to the team for a final review. This is where the accessibility goal gets specific. The visible fixes are in. Now the team **annotates** how each one should work for assistive tech, right where it lives. That includes: the aria-label the shared date picker should announce so it's not just legible but readable aloud, a screen reader label that matches what's on screen, a focus order that reaches the call to action instead of skipping past it, and an empty state with a message a screen reader can announce so a search with no results isn't a silent answer.

The PM confirms it all still ladders up to the accessibility goal, the engineer weighs in on what to handle in code, and the designer folds in the final tweaks.

## [Pushing the PR](#pushing-the-pr)

Once the last annotations are addressed, the designer pushes a pull request to the codebase straight from Make. The engineer reviews the code (now with the updated design intent, the team’s comments, and the accessibility annotations all attached to the same change), approves it, and merges the branch. The fixes that would have spent a quarter in the backlog, shipped in a day.

###### Zoom out

The PR becomes a record of how the change happened, not just what changed.

This way of working is a simple change with a long payoff. A ticket closes and disappears, and the decisions that lived inside it evaporate with it. The merged change keeps them: the comments, the accessibility annotations, the reasoning for making the date picker shared. When someone revisits the date picker in six months, the path that led to this point is right there in the team’s shared history.

![GitHub pull request page showing a merged accessibility update with changes to improve the date picker, navigation labels, and screen reader support.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBUlEQVR4nHWRyXLTQBRFvY+JbGvq1tSaW7LkyENsqDhFskhgA9kH/v87DtVtSEEBi7t5Up+6w+zTy3e2pwe6zRE93tKuDzTrPc2wp+531P2Wqt9SdhOlnsibjVXVbam7HZXeUbYT4+6Ozy/fmN2en4lVSyAVqhiomi15PZCWmkg1BHGJJ3PcMGUVJCy8CMeVLP3Y3lxzcyUyrbg9PzG7OT7giYzrVUia9dTtAVWNJLlGZA1+XOPKklWQ4XixhV27wv7vuALHDblaeHgiZTo+MJtOj3hS8W4VEsYFqhpQ9Uha9ESqQyqNzDRhUuHJAk8oa2AZxDiexPEE82VgGYb1BpwvfFZBTFI05PWatNDEqrkob4hUTRiX+FLhCxPfRBfWqXn7T6DpxYCqbkPZrFFV94eSvLEp3NB0aeIKq/nyv8DIAtthix7MihvKdqBo1lZZqRFpaftamLi/gH87zN+ASdGixx3duKNdT1R6pGgG8rq/OEwKgsisntiKFp5kvvitw5vTI65QXDme/WiAxqGFdaN1aGBZ0SKSAl9mBJEikBmuMNElV46PKzIMa3Y4PyOzhoUf40fKDtJt9uhhR6lHsso4a4myGpGUVmYkM5ZIzfLKdm8YhjV7+vLKsL+nXh9oNyeG/Znp+NFq3N/TTx/QmyPteFE/vWfc39l7+/Nu3hrG09dXfgDFZzMgBflCbAAAAABJRU5ErkJggg==)![GitHub pull request page showing a merged accessibility update with changes to improve the date picker, navigation labels, and screen reader support.](https://cdn.sanity.io/images/599r6htc/regionalized/628c4e0be22c0b09849c1f76966f85e7136641a3-3840x2160.png?rect=2,0,3837,2160&w=1080&h=608&q=75&fit=max&auto=format)

The merged pull request retains its full history, including all review comments and accessibility annotations.

## [Path to production: A different kind of handoff](#path-to-production-a-different-kind-of-handoff)

The traditional handoff model treats the designer and the engineer as two stations on an assembly line. That works well for large, well-defined features. But finer finishes, accessibility improvements, and polish that defines the full product experience, call for a different kind of handoff, one where the designer works directly in code.

This way of working doesn’t ask the designer to become an engineer, or the engineer to become a designer. It lets each apply judgment [where it matters most](https://www.figma.com/blog/what-the-design-to-code-loop-unlocks/)

: the engineers stayed on the architecture revamp, the designer owned the refinements end to end, and the PM kept the whole project pointed at the goal. The branch carried everyone’s contribution—visible design, written feedback, and the labels a screen reader will read aloud—from the canvas to a merged PR.

With this workflow, the last 20% didn’t get cut. It got shipped.

Learn more about pushing your Make projects directly to GitHub in our [help center](https://help.figma.com/hc/en-us/articles/35463818346647-Push-from-Figma-Make-to-GitHub) or watch our latest Config talks on [designing in code](https://www.youtube.com/watch?v=Q3BkuQRBg-w) and working with the [Figma design agent](https://www.youtube.com/watch?v=0HqSSIPZkbI&list=PLfe_xoh6xHLk&index=4).