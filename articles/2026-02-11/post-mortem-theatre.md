---
title: "Post-mortem theatre"
source: "https://fffej.substack.com/p/post-mortem-theatre"
publishedDate: "2026-02-10"
category: "design"
feedName: "Sidebar"
---

I’ve been reviewing a bunch of post-mortems recently (a post-mortem on post-mortems if you will).

All the post-mortems have the right base - they’ve clearly got psychological safety and blame-free discussion. That’s awesome! But some failed to hit the mark, despite having a clear timeline and some causal factors. It’s typically the actions that are weak, such as:

-   “proactively communicate design decisions with other teams”
    
-   “identify problems earlier in planning”
    
-   “write tests”
    

These aren’t actions; they are aspirations.

Why are these aspirations? The engineers who wrote the buggy code weren’t trying to write buggy code. They were responding rationally to the system as it existed (with time pressures, available information, review processes in place and the tooling they had available and so on).

If you don’t change the system, you’re just asking people to be better at resisting it. And that simply doesn’t work. [POSIWID](https://en.wikipedia.org/wiki/The_purpose_of_a_system_is_what_it_does)!

Post-mortems that end with “we’ll try harder” or “we’ll be more careful” have fundamentally misunderstood the problem. A post-mortem isn’t about identifying a people failure; it’s about dealing with a system that made the failure likely.

[

![](https://substackcdn.com/image/fetch/$s_!gCaG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbee559ba-8534-453d-b2fc-6eef0ec5272c_1024x1024.jpeg)

](https://substackcdn.com/image/fetch/$s_!gCaG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbee559ba-8534-453d-b2fc-6eef0ec5272c_1024x1024.jpeg)

Gemini - Post mortem theatre

Every post-mortem action should pass this test:

If someone ignores the action, what mechanism prevents the bug from recurring?

If the answer is “nothing”, then it’s not an action, it’s just a tick-box on a postmortem review that’ll achieve nothing.

To give some examples:

-   “Ensure all code is tested before merge” - This is an aspirational commitment. Nothing in the system has changed, other than a vague promise. The systemic alternative might be to introduce a coverage [ratchet](https://qntm.org/ratchet).
    
-   “All code must be reviewed by X” - Use a `CODEOWNERS` file in GitHub instead to make this explicit.
    
-   “Identify problems earlier in planning” - What was the real problem here? No-one has a perfect crystal ball! But maybe if more folks were involved you might see certain types of issue earlier? In that case, may be introducing a lightweight ADR process would help!
    

The most effective post-mortem actions tend to fall into a few categories.

-   **Automated guards** - CI gates, linters, coverage ratchets, CODEOWNERS, pre-commit hooks. Baking it into the process changes the system in a way that can’t be skipped!
    
-   **Process gates** - Checklists that introduce [friction](https://fffej.substack.com/p/understanding-and-managing-friction) for certain change types. These require some discipline to maintain, but they create visible checkpoints.
    
-   **Environmental changes** - For example, test environments that mirror production, tooling that makes the right thing easier than the wrong thing or even a Slackbot that shares information at the right time! These shape behaviour by changing the path of least resistance.
    
-   **Structural changes** - Team topology changes, ownership boundaries, API contracts. These are higher effort but address deeper systemic issues.
    

More generally, you can follow the [Leverage Ladder](https://fffej.substack.com/p/the-leverage-ladder) to find an appropriate level to intervene in the system.

The important thing is what’s not on this list - there’s nothing that relies on people remembering to do something, try harder or being more careful!

So, what’d you do if you’ve got a post-mortem process that’s not working? Well, you change the system! The simplest possible change I can think of is to make “concreteness” happen, so I’ll suggest post-mortem actions should be forced through a template like this:

-   **Action**: \[Specific change to the system\]
    
-   **Owner**: \[Named person responsible for implementation\]
    
-   **Due date**: \[When this will be done\]
    
-   **Enforcement mechanism**: \[What prevents regression\]
    
-   **How we’ll know it worked**: \[Observable outcome\]
    

“Be more careful” can’t get through this template, as you have to specify what actually changes, who’s going to change it, and how you’ll know it’s working.

Post-mortems are supposed to be learning, but learning that doesn’t change behaviour isn’t really learning, it’s just awareness!

The systems in organizations produce the problems (the tools, process, incentives, constraints etc), not people. If you end your post-mortem and the result is try-harder then the system that produced the bug is still in place, and it will produce another one.

No posts