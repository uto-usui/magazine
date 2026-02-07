---
title: "Always provide customer value"
source: "https://tkdodo.eu/blog/always-provide-customer-value"
publishedDate: "2022-01-29"
category: "frontend"
feedName: "TkDodo"
---

![Always provide customer value](https://tkdodo.eu/blog/static/df0839a6b2bc59ad673fefc6d945262b/bbe0c/value.jpg "Always provide customer value")

-   [#1: Don't mix refactorings with hotfixes](https://tkdodo.eu/blog/road-to-refactoring)
-   **#2: Always provide customer value**
-   [#3: Use urgency](https://tkdodo.eu/blog/use-urgency)
-   [#4: Refactor impactfully](https://tkdodo.eu/blog/refactor-impactfully)

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Last time, I told you when _not_ to start a refactoring and kind of left you hanging when it comes to the question: When is the right time? Let's try to answer that now!

To do that, we must first divide our potential refactorings into groups:

## The small ones[](#the-small-ones)

A small refactoring is one that you are comfortable doing at all times. It's those little things that get suggested in a code review right before you actually wanted to ship it, and oftentimes, it's something that can even be automatically done by your IDE.

Renaming a variable. Extracting a function. Inlining an abstraction.

As engineers, it is a) our job and b) in our own best interest to produce great quality code. Whenever the circumstances allow it (see also [#1: Don't mix refactorings with hotfixes](https://tkdodo.eu/blog/road-to-refactoring)), we should take the liberty to improve maintainability without asking for permission - no matter if we are fixing a bug or adding a feature.

It's like writing tests. Or making sure that our app is accessible.

It is something that I would expect anyone on my team to be passionate about. We care about our codebase, and we want to make it better with everything that we are doing.

Incrementally. One tiny refactoring at a time.

Of course, you'll have more confidence if the part you are touching is sufficiently covered with types and tests. If it is not, I would suggest that's where you start:

-   Add types.
-   Add tests.
-   Then refactor.

In that order. If you only make it to one or to two, that's alright. There is always a next time.

## The bigger ones[](#the-bigger-ones)

Yes, not all refactorings are that small. Sometimes, you stumble upon an architecture that is flawed and needs to be changed. Or you see an outdated pattern that you have left behind long ago (or so you thought), and you really don't want to add more code to the mess before cleaning it up.

How far you go with ad-hoc refactorings is up to you and your team, and needs a bit of experience and "feeling" for the codebase. I have started refactorings that I thought were small, only to go from one rabbit hole to the next to reverting everything after two days. It sucks, but you learn from it. 😄

Once you decide that a refactoring is larger than something that you can just do on the fly, you have to somehow plan it into your sprint (or whatever way of working your team has adopted). My advice for these situations would be:

Always provide customer value

Pure refactoring issues, apart from the small ones, are rarely a good idea. It just doesn't sell very well:

> I'm gonna work on this refactoring, it's about 20 story points, and it's gonna take a good amount of time. In the best case scenario, everything will still work exactly the same as before, while in the worst case, I'll introduce a bunch of regressions with it.

— A dev selling a refactoring

That doesn't sound too good for a product manager. Why would this be more important than the new feature the customer really wants?

Yes, it's an investment into the future of the product, it makes it more maintainable, and you'll likely have higher velocity later on while also producing fewer bugs. But "bugs we would have in production without this refactoring" is a very hard metric to measure. So likely, if you come up with a proposal like that, it will be squashed for not providing enough _direct value_.

### The right package[](#the-right-package)

For larger refactorings, it is important to wrap them in the right package:

> Yes, we can add this new feature the customer wants, but it's a technical requirement that we also re-architect this page because it will be too hard otherwise.

— selling a "refactoring feature"

That is something most people can get behind. It might take a bit longer to ship the actual feature, but it's a good compromise where both "sides" get their win.

As an example, we had a quite complex filter component that we used in some parts of the application. When a new feature for this component was due, we decided to port it to react-query while doing so. This delivered the needed _direct value_ (the feature for the customer), while also providing _implied value_ (less code, better maintainability).

## The huge ones[](#the-huge-ones)

These don't come up that often, and are likely rewrites of a big part of the application. Maybe you want to replace redux-saga with react-query? Maybe it's time to move to [remix](https://remix.run/)? Our migration from [flow to typescript](https://tkdodo.eu/blog/flow-to-type-script-migration-journey) some time ago would also qualify.

How on earth can you get everyone on board for such an endeavor? This will be the topic of [part 3](https://tkdodo.eu/blog/use-urgency) - so stay tuned! 📻

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)