---
title: "Road to Refactoring"
source: "https://tkdodo.eu/blog/road-to-refactoring"
publishedDate: "2022-01-22"
category: "frontend"
feedName: "TkDodo"
---

![Road to Refactoring](https://tkdodo.eu/blog/static/3429bb9776fc3aa9e591491cf6718c7b/bbe0c/road.jpg "Road to Refactoring")

-   **#1: Don't mix refactorings with hotfixes**
-   [#2: Always provide customer value](https://tkdodo.eu/blog/always-provide-customer-value)
-   [#3: Use urgency](https://tkdodo.eu/blog/use-urgency)
-   [#4: Refactor impactfully](https://tkdodo.eu/blog/refactor-impactfully)

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Over the years, I've come to work on many medium to large scale code bases. Most of these have organically grown over time, some of them being full of [Lava Layers](https://mikehadlow.blogspot.com/2014/12/the-lava-layer-anti-pattern.html). Doing a [refactoring](https://en.wikipedia.org/wiki/Code_refactoring) in those code bases is often not trivial. Incidental complexity is high, test coverage is low. There are more features than you can count.

Also, where do you start? There are so many things you'd like to tackle and do differently, but everything you touch has the potential to introduce regressions.

In this series, I'm trying to list some of the things that I've done to make refactorings a success rather than a disaster. This is by no means an exhaustive lists, and is heavily biased by my personal experience. Further, it likely doesn't apply to your side-project or early start-up, so as usual, your mileage may vary. That being said, here we go with the first tip: 🚀

## Don't mix refactorings with hotfixes[](#dont-mix-refactorings-with-hotfixes)

You get a bug report, highest prio, customer is escalating, account management is permanently asking: "what is the ETA on this, what can I tell the customer?"

You look at the code and analyze the issue. Maybe it's in an area of the code base that hasn't been touched for a while, or maybe you've not looked at it in a longer time.

Likely, you won't like what you see. Software patterns, especially in the frontend world, can evolve rapidly. Even if you start with something new, chances are you would do it differently in a couple of months.

Maybe you see a React Class Component that fetches in _componentDidMount_. Wtf, we've moved to [react-query](https://react-query.tanstack.com/) half a year ago, what is this? Or maybe there are some global styles or deprecated components being used. Oh, and this dependency could _really_ need an update...

[Scout's principle](https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html) - time to clean up this mess...

Don't. Just don't.

There's a time and a place for everything, but this is not the time for a refactoring. You don't want to prolong the actual fix. As an engineer, you are a problem solver, and your only goal here should be to fix the actual problem. Also, you might introduce another regression, and code reviews will take longer if you add unrelated changes.

### Quality[](#quality)

That doesn't mean we should compromise on quality. Even in those situations, we still:

-   Create a branch (no direct merging to _main_)
-   Write proper [commit messages](https://tkdodo.eu/blog/avoiding-legacy-systems#commit-messages)
-   Get the required amount of reviews
-   Run the CI pipeline

And make sure that all other quality gates that we have set up still pass. We surely want a fix as fast as possible, but not at all costs.

### A failing test case[](#a-failing-test-case)

This is the flow I usually take when getting a bug report:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

This is the best flow:  
🐞 find a bug  
🕵️‍♂️ investigate it  
⇆ reproduce it  
🧪 write a failing test for it  
💻 fix it  
🟢 see the green test  
🚀 ship it

\-

Nov 22, 2021



](https://x.com/TkDodo/status/1462821229841338381)

Writing a failing test case _before_ you start fixing the issue is something I can really recommend, as it will ensure that:

-   the bug is consistently reproducible.
-   the issue stays fixed in the future, for example, when you actually refactor that code.

This presumes that you have a somewhat easy way to add a test case for the bug. If you're in the unfortunate situation that you'd have to introduce a testing framework first to actually write a test - go back to the beginning of this article. 😉

## The right time[](#the-right-time)

So when is the right time to refactor the horrible thing we've found? I'll try to answer this in [part 2](https://tkdodo.eu/blog/always-provide-customer-value) - so stay tuned 📻

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)