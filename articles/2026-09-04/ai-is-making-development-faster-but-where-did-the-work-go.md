---
title: "AI is making development faster. But where did the work go?"
source: "https://medium.com/design-bootcamp/ai-is-making-product-development-faster-57a86bc3ffa0"
publishedDate: "2026-09-04"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

Featured

[

![Candace Wilson](https://miro.medium.com/v2/resize:fill:32:32/1*-N6n_dVrsM0Ciz7msT5Pfg.jpeg)



](https://medium.com/@candaceyw?source=post_page---byline--57a86bc3ffa0---------------------------------------)

11 min read

3 days ago

When AI makes one part of product development faster, what happens to the rest of the system?

**AI has made some parts of my work undeniably faster.**

In research-heavy design work, I can take transcripts from discovery meetings, user testing, and stakeholder conversations and use AI to help sort through what was said, pull out recurring themes, and organize the information into something useful. I can take that same material and use it to build the foundation of a presentation or recommendation without starting from a blank page every time. A research synthesis or presentation that might have taken several days can sometimes come together in a day or less.

I still have to read the output, question it, decide what matters, and make sure the story it tells is supported by the research. That responsibility has not gone away. What has changed is how much time I spend digging through transcripts, organizing notes, and formatting slides before I can get to the part where I am actually making sense of what I learned.

That time gives me room to stay with the problem longer. I can explore another direction instead of settling on the first reasonable answer, look for gaps in what I learned, or make room for another round of user testing that might otherwise get cut when a deadline gets tight. For me, that is a meaningful productivity gain because the time saved on administrative work can go back into thinking, iteration, and making better recommendations.

I have also seen a more complicated version of AI-assisted speed through the way my design team has been experimenting with coded prototypes. For us, those prototypes are meant to do more than show how an experience should look and behave. We have been exploring whether development can reuse parts of the prototype code as a starting point for production instead of rebuilding the design from scratch.

That approach came from a problem we were trying to solve. Traditional design handoffs can create small differences between what was designed and what eventually gets built, whether that means spacing shifts, responsive behavior works differently than intended, or interaction details get simplified along the way. Any one of those changes may seem small, but together they can add up to design debt. Part of the appeal of coded prototypes was the chance to reduce that game of telephone. If more of the original design intent could travel with the artifact, development would not have to reconstruct as many of those decisions later.

That depends on how we chose to use coded prototypes. Other teams may use AI-generated prototypes only for exploration or validation and have no expectation that the code itself will move into production.

The complication for us came when we tried to make that handoff work in practice. That experience has made me think less about whether AI makes a particular team faster and more about what happens to the work across the entire system.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:1000/1*561_doVxPVcQp92Sc0jhhA.png)

When AI makes one part of product development faster, what happens to the rest of the system?

## AI has made some parts of my work undeniably faster.

We already know AI can make certain kinds of work faster. What I find more useful now is understanding what kind of speed we are creating and what happened to the effort that used to sit around that work. Sometimes the work disappears. Sometimes it shrinks, changes shape, moves to someone else, or simply shows up later.

Sometimes the gain is straightforward because AI removes part of the work altogether. In research synthesis, for example, I still have to interpret what I’m seeing and decide what matters, but I spend far less time manually sorting transcripts, grouping notes, and organizing the raw material. The task is faster because some of that administrative effort has actually been reduced.

Other gains are harder to account for because the work has not disappeared. We started seeing this in our own prototype-to-production workflow. Designers created coded prototypes that development was expected to reuse, but the team didn’t always have the technical depth to consistently evaluate the underlying structure. Some problems were easy to miss when the primary focus was still on how the experience looked and behaved. Issues with component structure, code organization, or responsive behavior could travel much farther downstream than they should have.

By the time development picked up the prototype, something that looked almost finished on the surface could still be difficult to use as a starting point. We had pages that had grown into thousands of lines of code, unclear component boundaries, and sometimes implementations that didn’t match the design intent. A responsive experience, for example, could end up built more like separate adaptive layouts. In trying to reduce the visual handoff gap, we had sometimes created a different problem: an architectural handoff gap. Development then had to interpret, separate, refactor, or rebuild that work before it fit the production environment. Design had moved faster, but some of that effort had simply moved downstream.

AI is also changing the shape of the work itself. Instead of manually creating every piece, we spend more time directing the tool, checking what it produced, correcting what it misunderstood, and deciding whether the result is reliable enough to move forward. The creation may take less time, but review and judgment become a larger part of the job.

[A 2026 longitudinal study by Annie Vella and Kelly Blincoe(opens in a new tab)](https://arxiv.org/abs/2605.23135) found a similar shift among professional software engineers. Participants reported spending less time on many development tasks, especially writing code, while more work shifted toward directing, evaluating, and correcting AI output. The researchers describe this as “supervisory engineering work.” I’ve been calling it babysitting. Their study is based on self-reported changes in professional practice rather than direct time measurement, but it gives useful language to a pattern that is easy to miss when we only count how quickly something was created.

Then work gets pushed far enough down the road that its cost starts to grow. A shortcut in a small prototype may be easy to clean up. Build several more features on top of the same structure, and that cleanup becomes harder because other parts of the product now depend on it. What initially saved time can eventually require refactoring across several components, additional testing, or rethinking work you’ve already built.

## **That is where speed starts getting expensive.**

That is why I keep coming back to the same question.

**What happened to the work?**

A local speedup can mean several very different outcomes, and they aren’t equally valuable once you account for the rest of the system.

![](https://miro.medium.com/v2/resize:fit:1944/1*mi_ZHC43MOxZLyC6Q3DTHA.png)

disappears, shrinks, changes shape, →moves to someone else, shows up later

## Local speed depends on the system around it

What made this more interesting to me was realizing that the same pattern shows up outside of my own team.

[DORA’s 2025 research on AI-assisted software development](https://dora.dev/research/2025/dora-report/) found that AI tends to amplify the system around it. Strong workflows can make that speed more valuable, while weak ones can turn it into more downstream friction. The same research found higher AI adoption was associated with improved software delivery throughput while also increasing delivery instability. They interpret this as teams adapting to speed faster than the systems around them can adapt to safely support it.

That distinction matters to me: local productivity and system productivity are not the same thing. A designer can move faster, a developer can generate code faster, and a product team can get a working concept in front of stakeholders sooner. Those gains are useful, but they do not tell us whether the full path from idea to production got shorter, whether more rework appeared later, or how much time shifted into verification. The surrounding process determines whether more output becomes reliable progress.

## What does “good enough” actually mean?

A recent conversation with a colleague pushed this question further for me. The idea was that development should be willing to accept messier code if the UI looks right, move it forward, and fix problems reactively when they surface.

## Get Candace Wilson’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

I understand where that instinct comes from. If AI makes iteration and cleanup cheap enough, there is a reasonable argument that teams should stop polishing every artifact as if it needs to survive forever. For early exploration, that can make sense. A prototype used only to test an idea doesn’t need the same rigor as one whose code is expected to carry into production. The standard should match what we intend to do with the artifact.

Where I struggle is when that thinking becomes the default standard.

A click-through review can tell us whether a flow works on the surface. It can catch a broken button, an obvious layout issue, or a state that doesn’t behave as expected. It cannot reliably catch the problems underneath that experience, including poor component structure, duplicated logic, data issues, access-control mistakes, regressions introduced elsewhere in the codebase, or a foundation that becomes harder to change as more work is built on top of it.

We are already seeing some of those costs show up. Code that was quick to generate became harder for both developers and AI tools to work with later. The larger and messier the code became, the more context the tool had to process every time we asked it to make a change. What had been quick to generate became slower and more expensive to untangle.

Our response has not been to stop building with AI. We have started refactoring earlier, adding Markdown guidance and clearer guardrails, and getting more deliberate about component structure and responsive behavior. The experiment is still evolving, but the environment around the AI can determine whether that speed holds up downstream.

This is where I think “good enough” needs a more useful definition.

**Prototype code does not need to be production-ready, but it should be production-useful.**

For the kind of handoff I am talking about, that means the code should be structured well enough that development can extract from it without first untangling the entire thing. Component boundaries should be clear. Reusable pieces should actually be reusable. Responsive behavior should match the design intent. The prototype does not need to mirror the production codebase exactly, but it should be close enough that the handoff preserves some of the speed we gained by building in code in the first place.

The amount of rigor should also depend on what the prototype is expected to influence downstream. I am comfortable with looser code in an exploratory screen that may be thrown away next week. I am less comfortable with that same looseness when the structure, behavior, or components are intended to carry into production, especially when future work will be built on top of them.

[DORA’s 2025 research](https://dora.dev/research/2025/dora-report/) speaks directly to this tension. The report considers the idea that faster AI-assisted delivery might make instability more acceptable because teams can simply fix problems faster. Their findings did not support that assumption. Instability still had meaningful negative effects on product performance and burnout, even when throughput improved.

That matters because moving fast by accepting lower rigor is not free.

![](https://miro.medium.com/v2/resize:fit:1462/1*m-XCQekFkFzmAftlM-ikuA.png)

Sometimes it is a reasonable trade. Sometimes it is just borrowing from future velocity.

The important part is knowing which one you are doing.

## What are we actually measuring?

Once teams start talking about AI productivity, the conversation can get shallow pretty quickly. Someone says a team is moving twice as fast or producing three times as much, and the number becomes the story.

Before I repeat a claim like that, I want to know what made it possible. Did the team remove effort, change the process, loosen a standard, or shift part of the job to someone else?

[METR’s 2026 update on developer productivity research](https://metr.org/blog/2026-02-24-uplift-update/) shows how slippery that measurement can become once the workflow itself changes. Their earlier study found experienced open-source developers were slower with early-2025 AI tools, but their newer research became harder to interpret as developers changed which tasks they would do without AI and sometimes worked on something else while an agent ran. METR now believes developers are likely getting more benefit from newer tools, but says its current experiment cannot reliably measure how large that benefit is. The useful part for me is the reminder that “faster” gets harder to measure when the work changes around the tool.

Those questions matter because “faster” can describe a very small slice of the process. A designer may produce a prototype in half the time. A developer may generate code much faster. A product manager may turn research into a draft requirements document in an afternoon instead of several days. Each of those can be a real improvement, but I care more about how long it took to move from the original idea to something useful in a customer’s hands. If that total time did not shrink, or if quality dropped enough to create more rework later, the local speedup needs more context.

For leaders, that means getting more specific about what the number represents. Which part of the workflow got faster? Did the total time from idea to production shrink? Did quality hold? Did the next team receive something easier to work with? Those questions tell us much more than a multiplier on one person’s output.

There is also a more basic question that I think gets missed:

![](https://miro.medium.com/v2/resize:fit:1364/1*WlE-T0eV0MSLT3SV6qzaZg.png)

What gave the team the room to be faster?

The answer might be that AI removed a large amount of manual effort. It might also be that the team changed its process, worked around a bottleneck, or accepted a different tradeoff. Those are different stories, and they should lead to different decisions.

To understand whether AI is improving product development, we need to measure more than the speed of the person using the tool. We need to look at what happens before their work begins, what happens after they hand it off, and whether the entire system is getting better at turning ideas into reliable products.

## The goal is not to slow AI down

I do not want to go back to manually sorting every transcript, rebuilding every presentation from scratch, or limiting coded prototypes because the workflow around them is still imperfect. The gains are real, and the speed and flexibility these tools can create are too valuable to ignore.

The work now is making sure the rest of the system can keep up. If AI helps one part of product development move faster, handoffs may need to evolve, standards may need to become clearer, and teams may need better ways to review, verify, and reuse what AI produces.

The mistake would be treating faster creation as the finish line. A prototype built in a day, code generated in minutes, or research synthesized in an afternoon can all be meaningful gains. What matters is whether that speed helps the team reach a better decision sooner, makes the next stage easier, and gets something useful to customers without costing time in rework.

When someone says AI made a team faster, I want to know what became faster, what happened to the rest of the work, and whether customers received value sooner.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*5A0ktzkitVahxDb5M8MC_Q.png)

AI is already changing how quickly work can happen. The leadership challenge now is making sure that speed becomes progress, not just more output.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*uu0MUX9UelZniYxx2ZijWA.png)