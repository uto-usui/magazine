---
title: "How we stopped outsourcing decision-making to AI"
source: "https://uxcontent.com/how-we-stopped-outsourcing-decision-making-to-ai/"
publishedDate: "2026-08-12"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Eva Ratcliffe"
---

“Amplify your output.”

“Save 10 hours a week.”

“Dramatically accelerate AI-native product development.”

The messaging across the tech industry was clear: Move faster, build AI-native, experiment boldly.

That was the air we were breathing. And when you’re surrounded by that messaging, it shapes the story you tell yourself about what good work looks like. Fast is good, more output is good, if you’re not moving fast, you’re falling behind.

Sarah Mohs and I run the content system at Intuit, and as content people, we’re used to having to adapt quickly and shove our way to the table, ready to showcase our value. And we wanted to believe these narratives about AI tools. So we moved fast.

### The storm rolls in

We’ve seen a significant shift in what our jobs entail over the past year. Before, our focus was on building standards for content designers. They could then use their training and skillset to apply those standards across our products. Now, we need our standards to [show up in](https://uxcontent.com/claude-skills-for-content-design-inside-intuits-ai-build/) AI contexts without content designers in the room.

PMs, engineers, and product designers are suddenly responsible for writing customer-facing content, and we needed to find a way to reach them. Given that vibe coding tools had become part of everyone’s work flows, building a plugin of content skills for AI tools felt like the answer.

So we started building. We experimented, tested, iterated, and before long had 10 skills to work with. It felt like momentum.

Then it started to feel like something else.

We were making decisions we couldn’t explain. When Sarah or I asked each other “Why did we structure it this way?” the answer was usually some version of “Claude told us to.” We were tracking changes we didn’t fully understand, following suggestions we hadn’t pressure-tested, and moving in a direction neither of us had actually chosen.

For me, it felt like being thrown into the ocean during a storm and being told that swimming is easy, actually, if you just ask AI how to swim. Except AI was telling me to learn to dive before learning how to swim, and I was already underwater.

And everyone around me was swimming confidently, or at least looked like they were. And the coaches were yelling at me to swim faster, from a boat that they were not, in fact, swimming on.

It was chaos.

And underneath the chaos was a quieter, more uncomfortable feeling: we didn’t trust ourselves anymore.

### The moment we stopped swimming

At some point, I asked Sarah about a line in one of the skills that didn’t make sense to me. She paused. She didn’t know what it meant either, or why it was there.

For Sarah, that moment hit differently than just finding a bug. Throughout her career, she’d built confidence by never making a recommendation she couldn’t fully defend. If she wasn’t sure about something, she’d research until she was.

But Claude is confident about everything, and that confidence is alluring. Somewhere along the way, its certainty had substituted for ours. Looking at that unexplainable line of a markdown file, she realized: if we were in a design review right now, we couldn’t confidently defend this work.

That was the jolt we needed to do our own detective work.

What happened next was only possible because of what we had that Claude didn’t: each other. Sarah reminded me to stop, read the files, trust what you know. In her own confidence crisis around whether our architecture was the “right” approach, I reminded her that the first version doesn’t need to be perfect, it just needs to work, and we can continue to improve it over time.

If we had only talked to Claude instead of talking to each other, neither of us would have made the same decisions that ultimately led to a better tool.

### Reading the water

So we returned to the work we were good at. We opened the markdown files and read them. We did an architecture audit, comparing text across skills, looking at what was actually in each description, each workflow section, each output spec.

But here’s what made that possible: we already knew what we were looking for. Before we’d written a single skill, Sarah and I had done research with designers and PMs to understand how they were actually using AI tools. What we found was that content wasn’t on their radar.

They were prompting for structure, layout, interactions. Content was an afterthought, sometimes not a thought at all, to no fault to people with backgrounds in visual and interaction design.

That finding shaped the rest of our work. If designers weren’t thinking “I need content help,” a skill that waited to be asked for content help would never fire. So the architecture had to do something different: a top-level hub skill that could catch the moment a designer was working on anything customer-facing, and route to the right specialized content skill from there.

The trigger language couldn’t say “content review” because designers weren’t saying “content review.” It had to speak the language they spoke.

That’s the kind of decision Claude couldn’t have made for us. It required knowing our audience, and trusting our ability to solve for them.

So when we sat down and read the files, we could see immediately what wasn’t working. The instructions didn’t hold together. There were redundancies. There were places where the language didn’t serve the people who’d be using it. We knew what needed to happen next, and we knew why.

It felt like the moment when you’ve been treading water, moving closer and closer into shore, and suddenly your foot brushes the sand. Not dramatic. Just: oh. Ground. There it is.

### Feet on the ground

We still used our AI tools. We still moved fast. But now we were steering.

The tools didn’t get worse when we started thinking for ourselves. If anything, we used them better, because we knew what we were asking for and why. We’ve always been good at understanding the problem, knowing what “good” writing looks like, and building strong information structures. We’d just temporarily handed these areas of expertise off, because the environment we were in made that feel like the smart move.

Which, it wasn’t…but the correction wasn’t dramatic because Sarah and I already knew how to organize, structure, and evaluate information. We were just doing it in a new place.

And when we finally hit the hardest part of the project, where we needed to package our skills as a plugin, it wasn’t Claude that got us unstuck. It was humans. Developer colleagues who answered our Slack messages, talked us through the parts that weren’t in any documentation, and stayed in it with us until it worked.

Claude Code helped translate some of the technical language, but it couldn’t do what those people did: read the situation, understand what we were missing, and meet us where we were.

I’ve found in working with AI right now, it’s too easy to stay busy without staying in control. Speed feels like progress. Output feels like output. Isolation feels like being a self-solver. But if you can’t explain the decisions inside what you’re producing, you’re not leading the work. You’re following it.

The moment we took the work back, and started inviting other humans in again, we started moving faster. Our feet were now firmly on the ground and we were ready to swim on because we were using the full power of our human brains again.

_\*Article generated by humans, not AI\*_

_\*Special thanks to Sarah Mohs, Patricia Swesey, and Julia Falkowski for their contributions to this article._