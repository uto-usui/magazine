---
title: "What we’re no longer seeing: AI and the invisible newcomer in open source"
source: "https://blog.stdlib.io/ai-and-the-invisible-newcomer-in-open-source/"
publishedDate: "2026-06-17"
category: "design"
feedName: "Sidebar"
---

Last winter, our team went through I-Corps training as part of the NSF's POSE—Pathways to Enable Open-Source Ecosystems—program. I-Corps is the National Science Foundation's customer-discovery training, and POSE adapts it for open-source projects. For us, that meant seven weeks and more than a hundred interviews with stakeholders in and around our ecosystem. (The "us" here is [stdlib](https://stdlib.io/?ref=blog.stdlib.io), an open-source standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing.)

These ecosystem-discovery interviews had one hard and fast rule: _you don't pitch._ No explaining what stdlib does, no defending decisions, no selling.

You ask, and you listen.

So that's what we did. The curriculum taught us how open-source ecosystems are supposed to be sustained—the frameworks, the canvases, the interview discipline. The interviews taught us something nobody had put on the syllabus. Talking with maintainers, contributors, and users, the same theme kept surfacing: AI was changing how people found projects, got help, and contributed. And we weren't just hearing it in the interviews. At conferences and in hallway conversations, in blog posts and LinkedIn threads, peers who do developer relations and community work for a living were describing the same shift from their own angles.

We went to learn about our ecosystem. While we were looking, the ecosystem was changing around us.

This post is about what we were seeing. It's also about what we weren't.

For a long time, open-source communities have depended on a specific kind of visible friction. People got stuck and they showed up—on Stack Overflow, in GitHub issues, on mailing lists, in forum threads. That first act of asking for help in public was itself a form of participation. It was the way you found the edge of someone else's community, and the way they found you.

There's an old model from Charles Vogl's _The Art of Community_—the idea that any community has concentric rings around it. People start as visitors. They find their footing. They ask, in one way or another, _what am I doing here?_ The journey from the outer ring inward—visitor to member to elder—isn't automatic. It requires visible pathways. It requires people willing to guide. And, crucially, it requires that the path be known to others.

That model isn't unique to Vogl, or to open source. The figure below comes from [a study](https://eric.ed.gov/?id=ED360387&ref=blog.stdlib.io) of a community most readers have no skin in: recreational scuba divers in the early 1990s. Edouard Lagache, building on **legitimate peripheral participation** (a term coined by Jean Lave and Étienne Wenger), mapped the same geometry—old-timers at the center, casual sightseers at the outermost ring, a labeled trajectory pulling inward. People become members of a community by doing low-risk things at its edges—things that exist _because_ there's a structure around them that makes them visible. Early 90s scuba diving is just an example, but the same dynamic and shape exists in open source, in sports, in fandoms, in any community you can name. The details differ, but the geometry is the same.

![Concentric-rings diagram of legitimate peripheral participation in the scuba-diving community, adapted from Lagache (1993), Figure 5](https://blog.stdlib.io/content/images/2026/06/lagache1993_figure5.svg)

What made it work in open source, structurally speaking, was friction—visible friction. Someone got stuck, showed up, and both sides could see each other. That first public question was a form of initiation, and it was also legitimate peripheral participation in action: a low-risk, visible way of taking part from the edge. That dynamic is woven through decades of open-source community-building practice—it's underneath [Ten simple rules for helping newcomers become contributors to open projects](https://doi.org/10.1371/journal.pcbi.1007296?ref=blog.stdlib.io), among others. The public question made the newcomer visible, and it created the opportunity for someone already inside to respond.

It also made the community visible to the newcomer. _Oh—there's a there here. There are people. There's a way in._

For a while, the shift we kept hearing about was a vibe more than a finding—something you could feel in the conversations before you could point to it on a chart. But it kept turning out to be tangible. At FOSDEM this year, David Allen, who leads developer relations at Grafana, [showed everyone his numbers](https://fosdem.org/2026/schedule/event/KXPSTQ-the_ai_shockwave_in_open_source_communities_how_ai_is_reshaping_the_foundations_/?ref=blog.stdlib.io), describing a moment some maintainers haven't had yet but many will.

He'd gotten comfortable expecting community growth of 8 to 18 percent a quarter, almost automatically—_I could fall asleep,_ he said, _and the community would grow._ Then one quarter the number dropped 27 percent. They checked the data, ran it again, and it wasn't a measurement error: the number of people entering the community had collapsed, even though overall user growth was still going up. The mechanism wasn't mysterious, either. Organic traffic to community spaces was down roughly 30 percent, traceable to question-and-answer behavior moving to LLMs.

And it's not a one-project story. [A 2024 study](https://doi.org/10.1093/pnasnexus/pgae400?ref=blog.stdlib.io) in _PNAS Nexus_ found a clean way to isolate the effect: compare Stack Overflow activity in English (where ChatGPT was available) with Russian- and Chinese-language counterparts (where it wasn't), and with mathematics forums (where LLMs are weaker). Within six months of ChatGPT's release, English-language activity had dropped 25 percent relative to those controls—and the authors call that a lower bound. The decline wasn't limited to beginners or to duplicate questions. Experienced and inexperienced users alike posted less.

And that was 2024. You don't need a natural experiment to know what's happened since: LLM-assisted development has gone from novelty to default, and more of the questions that used to be asked in public are answered in private.

Allen and his co-presenter, Amanda Wagner, offered a framing I keep coming back to: AI isn't the cause of this. It's an accelerant, exposing foundations that were already fragile.

Here's where the argument I want to make sharpens.

The surface loss is signal. Questions that used to surface as GitHub issues or forum threads are now answered privately. That's real, and it's measurable, and it's not nothing. But it understates what's actually happening.

When AI handles the initial friction, the newcomer gets unblocked. They get functional value. They make progress; they solve the problem. But they get it without connection—without anyone seeing them, without a moment of initiation. This isn't inherently bad. It's just different. However, the friction that we've always addressed as a "bug"—the thing we wanted to smooth out—was also doing work we didn't understand until it was gone.

Think about what deepens anyone's engagement with a community—what turns getting an answer into the start of a journey: they choose it, they're making progress in it, and they feel some connection to the people in it. AI delivers choice and progress with remarkable efficiency, but it doesn't replicate connection.

And here's the part that doesn't get said enough:

**The blindness goes both ways.**

The newcomer doesn't know they're at the edge of your community. They're using your software through an AI intermediary, and they may not think of themselves as being in relationship with a project at all—only with a tool. They don't know you exist as a community. They only know you exist as a dependency. They have no idea that they're already part of your ecosystem.

And you don't know they're there.

Vogl's inner-rings model depends on visibility in both directions. People can only be invited inward if they can be seen. They can only begin the journey if they know there's a path. When the first interaction with a project happens through an AI layer, neither condition is reliably met.

This is a different problem than the old problem of lurkers. Lurkers were quiet, but they were _present._ They were in your spaces. They could see you, even when you couldn't see them. The observer who finds your library through an AI assistant may never visit your spaces at all.

To be clear: not everyone wants to move inward, and that's fine. Vogl [writes about this directly](https://www.charlesvogl.com/articles/people-mature-inside-communities?ref=blog.stdlib.io)—most members of any community stay in the outer rings, and a healthy community makes room for them. Users don't owe a project anything. But open-source ecosystems aren't sustained by everyone; they're sustained by the few who do make the journey inward. And that's the real cost of the outer rings going invisible. It's not that every unseen user is a lost contributor. It's that we no longer know who's out there—which means we no longer know whom to invite.

What's actually being lost, then, is not support traffic or page views or the other surface metrics. It's the early moments of maturation—the activities that mark a new member, signal arrival, and begin the process of belonging. The public question used to be one of those moments, almost without anyone meaning it that way. It made someone visible, opened a door, created the conditions for response.

And we kept hearing versions of this from people working entirely different corners of the problem. Abigail Cabunoc Mayes, [talking about mentorship at FOSDEM](https://fosdem.org/2026/schedule/event/AJGB73-the_synthetic_senior_rethinking_free_software_mentorship_in_the_ai_era/?ref=blog.stdlib.io), put it plainly: "the volume of contributions is going up, but the signal-to-noise ratio is really going down." A community can look alive by the surface metrics—commits, PRs, downloads—while the substrate of belonging is hollowing out underneath.

The months since haven't quieted any of this. Maintainers are sharing their experiences—Daniel Stenberg has been chronicling [what the AI era looks like from inside curl](https://daniel.haxx.se/blog/2026/05/26/the-pressure/?ref=blog.stdlib.io), and Franck Nijhof recently described [Home Assistant's version of it](https://frenck.dev/open-source-was-not-ready-for-ai-speed-contributions/?ref=blog.stdlib.io): contributions arriving faster than anyone can review them, because "contributors are being amplified, but maintainers are still the verification bottleneck." Projects across the ecosystem are rethinking their contribution policies in response. The particulars differ; the shape is the same.

And here's the uncomfortable realization underneath all of it: _we were relying on a friction we didn't even know we needed_. The playbook for building and sustaining open-source communities—accumulated over decades by a lot of people who took the question seriously—assumed newcomers would keep becoming visible on their own. Nobody wrote that assumption down, because nobody had to. Now that it's failing, the playbook has to change.

## This is a design problem, not a crisis

The instinct, when something erodes, is to mourn it or try to restore it. The more useful response is to ask: what has to be built intentionally that used to happen as a byproduct?

Everything we were learning—from the program on one track, from our interviews and our peers on the other—kept converging on the same few answers.

The communities that come through this in shape will be the ones oriented around _relationships and narrative_—not tooling, not clever onboarding flows, not any one platform. The technology stack underneath a community is replaceable. What isn't replaceable is whether the people in it are in real relationship with each other and with the project, and whether the project has a story about itself that someone can find their way into. That sounds soft. It is the hard part.

A piece of that is what Allen and Wagner call _proof of effort._ When the cost of producing surface-level engagement falls—an issue that reads as plausible, a PR that compiles, a comment that sounds informed—the signal that someone is actually here, actually paying attention, actually committed, has to come from somewhere else. Getting prospective contributors to demonstrate investment becomes more important, not less. Not as a gatekeeping move. As a way of making real participation visible again. Communities that ask people to _do something on the project's terms_—show up to a call, take a small responsibility, write the doc nobody wants to write—are not being precious. They are reconstructing the legibility the old friction used to provide.

The other shift—one we heard named, in almost the same words, by different people in different rooms—is from _extractive_ to _contributive_: communities oriented around what someone can give to the project, not just what they can get from it. That's not a new idea either. What's new is that the default has flipped. If you don't say anything, the default relationship a person now has with your project is consumption with an AI in the middle. The contributive frame has to be made explicit because the extractive one is no longer being challenged by the structure of how people find you.

The structural argument follows directly from this. If the passive onramps are narrowing—and the evidence is now plural enough that this is no longer a hunch—then the active ones have to be designed. If the outer ring of the community is becoming invisible, you have to go looking for the people in it; they will not show up on your dashboard. If initiation no longer happens by accident, the project has to create the conditions for it on purpose. None of this is a return to a previous state. It's a different posture toward maintenance: looking, naming, inviting, and following up are now first-order work, not extracurricular.

Which lands the section, and the post, in one specific place.

Invitation. Invitation has to come from someone already inside the community—someone with standing, someone whose attention means something—saying out loud to a particular person: _we see you, and there's a place for you here._ That isn't new advice. The communities-of-practice literature has been making this argument, in one form or another, for thirty years. What's new is that it used to be advice. Now it's structural. The friction that used to put newcomers in front of us is thinner. The work of putting them in front of us, on purpose, is the work.

## What you might not be seeing—and what's next

So: what signals are you still relying on that may no longer be reaching you? What onramps did you assume would always be there? Whose first contact with your project this year went through a layer you can't see into—and what would it take to find out?

In subsequent posts, I want to talk about the tools I-Corps handed us for actually looking at these questions honestly. A canvas, a map, a journey—they aren't the answer, but they can help you take a realistic look at your ecosystem and figure out where the gaps are.

## Sources

-   Allen, D., & Wagner, A. V. (2026). _The AI Shockwave in Open Source Communities: How AI Is Reshaping the Foundations of Open Source Communities._ FOSDEM 2026, Brussels. [https://fosdem.org/2026/schedule/event/KXPSTQ-the\_ai\_shockwave\_in\_open\_source\_communities\_how\_ai\_is\_reshaping\_the\_foundations\_/](https://fosdem.org/2026/schedule/event/KXPSTQ-the_ai_shockwave_in_open_source_communities_how_ai_is_reshaping_the_foundations_/?ref=blog.stdlib.io)
-   Cabunoc Mayes, A. (2026). _The Synthetic Senior: Rethinking Free Software Mentorship in the AI Era._ FOSDEM 2026, Brussels. [https://fosdem.org/2026/schedule/event/AJGB73-the\_synthetic\_senior\_rethinking\_free\_software\_mentorship\_in\_the\_ai\_era/](https://fosdem.org/2026/schedule/event/AJGB73-the_synthetic_senior_rethinking_free_software_mentorship_in_the_ai_era/?ref=blog.stdlib.io)
-   del Rio-Chanona, R. M., Laurentsyeva, N., & Wachs, J. (2024). Large language models reduce public knowledge sharing on online Q&A platforms. _PNAS Nexus_, 3(9): pgae400. [https://doi.org/10.1093/pnasnexus/pgae400](https://doi.org/10.1093/pnasnexus/pgae400?ref=blog.stdlib.io)
-   Lagache, E. (1993). _"Diving" into Communities of Practice: Examining Learning as Legitimate Peripheral Participation in an Everyday Setting._ Paper presented at the American Educational Research Association annual meeting, Atlanta, GA. ERIC ED 360 387. [https://eric.ed.gov/?id=ED360387](https://eric.ed.gov/?id=ED360387&ref=blog.stdlib.io)
-   Lave, J., & Wenger, E. (1991). _Situated Learning: Legitimate Peripheral Participation._ Cambridge University Press.
-   Sholler, D., Steinmacher, I., Ford, D., Averick, M., Hoye, M., & Wilson, G. (2019). Ten simple rules for helping newcomers become contributors to open projects. _PLOS Computational Biology_, 15(9): e1007296. [https://doi.org/10.1371/journal.pcbi.1007296](https://doi.org/10.1371/journal.pcbi.1007296?ref=blog.stdlib.io)
-   Vogl, C. H. (2025). _The Art of Community: 7 Principles for Belonging_ (2nd ed.). Berrett-Koehler.

* * *

_Mara Averick is a developer advocate at_ [_Quansight_](https://quansight.com/?ref=blog.stdlib.io) _and contributor experience lead for_ [_stdlib_](https://github.com/stdlib-js/stdlib?ref=blog.stdlib.io)_._

* * *

[stdlib](https://github.com/stdlib-js/stdlib?ref=blog.stdlib.io) is an open source software project dedicated to providing a comprehensive suite of robust, high-performance libraries to accelerate your project's development and give you peace of mind knowing that you're depending on expertly crafted, high-quality software.

If you've enjoyed this post, give us a star 🌟 on [GitHub](https://github.com/stdlib-js/stdlib?ref=blog.stdlib.io) and consider [supporting](https://opencollective.com/stdlib?ref=blog.stdlib.io) the project. Your contributions and continued support help ensure the project's long-term success and are greatly appreciated!