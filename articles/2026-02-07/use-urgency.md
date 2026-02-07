---
title: "Use Urgency"
source: "https://tkdodo.eu/blog/use-urgency"
publishedDate: "2022-03-25"
category: "frontend"
feedName: "TkDodo"
---

![Urgency](https://tkdodo.eu/blog/static/1e2b437ba714c59eff64a2053819ccd7/bbe0c/urgency.jpg "Urgency")

-   [#1: Don't mix refactorings with hotfixes](https://tkdodo.eu/blog/road-to-refactoring)
-   [#2: Always provide customer value](https://tkdodo.eu/blog/always-provide-customer-value)
-   **#3: Use Urgency**
-   [#4: Refactor impactfully](https://tkdodo.eu/blog/refactor-impactfully)

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Huge refactorings are not an easy project to successfully complete. It's the ones that touch upon the base architecture of your product. They likely take a long time, and don't provide any _immediate_ customer value - the value is mostly _indirect_.

What makes them so hard is often not the technical difficulties. Yes, we need to figure out how to replace / update / rewrite certain things. But let's be honest - that's what engineers are good at, and we've likely already thought about this for quite some time before we even bring it up.

In larger organizations, this is mostly a _people_ problem. Since there is no immediate value, why should we do it? Could we not just add feature X to the product instead? Customers would love to have that...

Someone has to give you the green light to go ahead with an operation like that, so you have to get everyone on board with the problem. A surprisingly effective way to do that is via urgency.

## Leverage Urgency[](#leverage-urgency)

With high urgency comes high priority

I once worked on a project that had some page loading performance problems. We knew what the problem was, but it was very hard to fix with the current architecture. We got into the situation because we added new features left and right, and some of them didn't play nicely together. It worked well for most cases, but when it didn't work, it was really bad (=slow).

When this was reported by customers for the first time, we had an all-hands-on-deck situation. Luckily, we could quickly work around the problem for the time being. After the dust has settled, we proposed a big architectural refactoring to eliminate the problem altogether, and everyone agreed to get started ASAP.

The key is that we knew about the problematic part before the incident, and that we knew that it could theoretically get bad. But proposing a big investment into rewriting that area made no sense to anyone outside the core engineering team, because it was working "well enough". Without something urgent, it just wasn't enough of a priority. We really needed that one incident to outline the severity of the problem and align everyone on the fact that we need to invest into fixing this.

### A small window[](#a-small-window)

It doesn't always have to be a customer facing incident that highlights the severity. Maybe you're using a deprecated library or API that is about to be removed. Or you're planning on adding new features, and it absolutely cannot be done with the current tech stack. Something "security related" also usually sells very well.

Whatever driver you may find - make sure to use the moment wisely to communicate what needs to be done. Once the urgency is gone, you might have missed your window of opportunity to tackle something big.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)