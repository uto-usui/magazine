---
title: "Every fork looks like adoption"
source: "https://blog.murphytrueman.com/every-fork-looks-like-adoption/"
publishedDate: "2026-08-25"
category: "design"
feedName: "Sidebar"
author: "@murphytrueman"
---

[GitClear published a report this year](https://www.gitclear.com/the_ai_code_quality_maintainability_gap?ref=blog.murphytrueman.com) that got me thinking about how we measure design system adoption. Across four year and 623 million code changes, they found reuse falling and duplication climbing across the codebases they analysed. Calls to functions in other files are down 35% since 2023, refactoring is down 70%, and duplicated blocks of code are up 81%.

Most of those numbers come from general codebases, where nobody promised reuse in the first place. Inside a design system, the trend _should_ run the other way. Reuse is the whole point, and most teams track adoption to prove its happening. I've been asking whether adoption still measures what we think it does.

Most adoption dashboards are trying to answer a pretty simple question: is this component being used? Import counts, coverage percentages, a weekly graph that trends up. All of that is still useful. What they can't tell you is whether the component is being reused, or just copied for the parts someone likes. Both can look like adoption.

Here's what I mean: A team pulls `Card` from the design system and needs it to work slightly differently for what they're building. They wrap it in a local component called `ProductCard`, add three props, and tweak the padding. From then on, `ProductCard` is what they reach for wherever `Card` would have gone.

The wrapper technically imports `Card`, so the dashboard marks that as adoption. What the codebase has is a local abstraction sitting between the product and the design system. Maybe that's healthy composition. Maybe it's the beginning of a fork. But the import count can't tell you which.

This used to happen at human speed. A team would build a wrapper on Tuesday, another team would build a slightly different one on Thursday, and the drift accumulated slowly enough that some of it got caught. Someone would eventually ask why there were three different versions of the same component, or a design system team would notice that everyone was overriding the same property.

When AI writes the code, the cost of getting there drops considerably. Ask an assistant to build "something like our `Card`, but for pricing plans" and it has several reasonable ways to satisfy the request. It can import `Card` and wrap it. It can compose it with other components. Or it can reproduce the structure in a new component and change what it needs. If it pulls in the same design tokens, the result can still look completely at home in the product.

Those variants don't necessarily show up as a decline in adoption. Some of them can look like healthy adoption.

I've seen teams end up with multiple local variants of the same design system component without the adoption graph wavering. The original component is still being imported, so the numbers still look healthy. The wrapper runs, the test pass. A reviewer looking at the change sees clean code that uses the design system's tokens and follows the visual language, so they merge it. And the graph goes up.

The design system is being used. But is it being reused? That's the distinction I think we're missing.

I wrote about the Figma-side version of this in [The hidden cost of design system entropy](https://blog.murphytrueman.com/design-system-entropy/). Nobody has to make a deliberate decision to fork anymore. The distance between "this is composition" has become much smaller, and the drift can move faster than the metrics we use to watch it.

So if I were setting up a new adoption, I wouldn't throw away import counts or coverage. I'd keep them. They're still useful. I'd just stop treating them as proof of reause.

## Prop shape variation

The first is how a component's props are being used across the codebase.

I'm less interested in how many prop combinations exist than ether the shape of usage is changing. If a component that once had three or four recognisable patterns gradually develops a long tail of one-off configurations, I'd want to know why.

It doesn't automatically mean the component is badly designed. Some components have complex APIs, and product requirements aren't going to line up neatly with the abstraction every time. But a growing collection of unusual prop combinations gives you somewhere to look. It can be a sign that teams are working around the API rather than using it comfortably.

That's a much more interesting indicator than knowing that `Card` adoption went from 72% to 78%.

## Wrapper count

The second is the number of local components wrapping design system components.

Again, a wrapper isn't inherently bad. Composition is one of the reasons component systems work at all. A product team should be able to take a primitive and build something specific to its context without needing the design system team to own every piece of UI.

The useful question is what happens next. Does the wrapper stay a thin piece of product-specific composition, or does it start accumulating its own props, styles, variants, and behaviour? Does everyone using it now have to learn `ProductCard` instead of `Card`? Does the product team start fixing bugs in the wrapper rather than contributing the capability back to the system?

At some point, the wrapper crosses from composition into a parallel API. That's the transition I want the dashboard to show me.

## Structural similarity

The third, and the one I care about the most, is structural similarity: code that looks like a component in the design system, but doesn't import from it.

Static analysis has been able to catch duplication for years without tools like [jscpd](https://github.com/kucherenko/jscpd?ref=blog.murphytrueman.com), which scans source code for duplicated blocks without running it. For design systems, that becomes a specific question: whether a new component looks suspiciously like something the system already provides.

A Button that doesn't import `Button`. A local `Card` whose structure is remarkably close to the system's `Card`. A new `Modal` that has independently recreated the same states, spacing and interaction model.

None of those are automatically wrong. Sometimes the product has a different requirement. Sometimes the existing component is too restrictive. Sometimes the design system doesn't have the right abstraction yet.

Those are the cases I'd want to surface, beacuse an import-based adoption metric will never see them.

## The review problem

The metric can't see the fork. The review process increasingly can't catch it either.

Writing a new UI component was expensive enough that someone would often ask whether there was already one that worked. The cost of making the wrong things was high enough to create a little bit of friction before it happened.

Now the code can exist before anyone has that conversation.

Thre reviewer is looking at a finished pull request. The component works. The tests pass. The implementation uses the right tokens. Nothing looks obviously wrong. Answering "do we already have something for this?" can mean twenty minutes of searching the codebase, reading documentation, and checking whether the existing component can do the job.

Most reviewers aren't going to do that for every component. So the answer is to make the system better at catching it before the reviewer.

An automated check that says, "This component is structurally similar to `design-system/Card`", would be more useful to me than another dashboard showing that `Card` adoption has increased by 4%. It doesn't even have to block the merge — it might just make the conversation happen. And that's enough.

The goal is to make the invisible ones visible. Some wrappers and local components are exactly the right solution. The goal is knowing which.

Design system teams have spent years getting better at measuring whether people use the system. That's still worth measuring. But usage was never the same thing as reuse.

AI has made forks easier to ship than to catch. Forking has always looked like adoption. It just used to be expensive enough that someone actually noticed.

* * *

Thanks for reading! If you enjoyed this article, subscribing is the best way to keep up with new posts. And if it was useful, passing it on to someone who'd find it relevant is always appreciated.

You can find me on [LinkedIn](https://linkedin.com/in/murphytrueman?ref=blog.murphytrueman.com), [X](https://x.com/murphytrueman?ref=blog.murphytrueman.com), and [Bluesky](https://bsky.app/profile/murphytrueman.com?ref=blog.murphytrueman.com).

* * *