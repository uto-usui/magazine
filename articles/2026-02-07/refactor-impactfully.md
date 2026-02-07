---
title: "Refactor impactfully"
source: "https://tkdodo.eu/blog/refactor-impactfully"
publishedDate: "2022-11-13"
category: "frontend"
feedName: "TkDodo"
---

![Refactor impactfully](https://tkdodo.eu/blog/static/2a74a5552e65fe6b5ec6e1bc8a8d4f4d/bbe0c/impact.jpg "Refactor impactfully")

-   [#1: Don't mix refactorings with hotfixes](https://tkdodo.eu/blog/road-to-refactoring)
-   [#2: Always provide customer value](https://tkdodo.eu/blog/always-provide-customer-value)
-   [#3: Use urgency](https://tkdodo.eu/blog/use-urgency)
-   **#4: Refactor impactfully**

-   [日本語](https://makotot.dev/posts/refactor-impactfully-translation-ja)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Apart from [the small refactorings](https://tkdodo.eu/blog/always-provide-customer-value#the-small-ones) that you, as a responsible developer, should be doing with every feature request without asking for permission, a larger refactoring always costs in some way. Even if you [package them well](https://tkdodo.eu/blog/always-provide-customer-value#the-right-package), someone will likely question if it's really necessary to do, or if we couldn't use the time and resources better.

That's why it's so important to choose the _right_ things to refactor. In most apps, there's tons of code that could be changed. As someone who likes a tidy tech stack and clean code, I could do nothing but refactor 24/7. From the technical side, it _feels good_ to have things tidied up.

## The restaurant kitchen[](#the-restaurant-kitchen)

I love this comparison, so this feels like a good time to make it:

Our company is like a restaurant that wants to serve dishes to customers. We developers work in the kitchen to make sure the meals can be cooked. Shipping features is like cooking a meal. Every time we do it, the kitchen gets a bit more dirty. So in order to keep cooking, we have to clean the kitchen from time to time. If we don't do this at all, we won't have any clean pans or knives left to keep cooking.

That cleaning is refactoring, or paying back the _tech debt_ we have amassed while trying to ship things.

However, a tidy kitchen is useless if there are no customers in the restaurant. So we cannot have cleaning be the only thing we do all day - we have to balance it.

As we can't refactor everything, my tip is:

Choose the most impactful things for refactoring

To stay with the kitchen example: Should we replace the broken dishwasher or get new plates because they are shinier? I hope it's clear that the dishwasher has a much bigger impact.

## Practical example[](#practical-example)

As I looked through our codebase, I saw that we are using [axios](https://github.com/axios/axios) for data fetching. Why are we doing that if all browsers we support now have a built-in [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)?

Small wrappers around fetch with a similar api to axios, like [ky](https://github.com/sindresorhus/ky) are like three times smaller. And we wouldn't be using XMLHttp requests anymore...

I was excited about this, such a nice opportunity to make things more modern.

### Why we didn't do it[](#why-we-didnt-do-it)

Frankly speaking, because it didn't matter. At all. The size improvements are irrelevant - we're talking 3kb vs 9kb. One is not "faster" or "more maintainable" than the other. We don't really have a problem with axios.

The refactoring would be quite _cosmetic_. Something developers would _like_ to do, but there's no _need_ to do it. We had at least ten other things to touch that would have more impact on both user experience and maintainability.

### It's a trap[](#its-a-trap)

It would also be kind of risky. Our api layer is used on every page, so the refactoring would need massive amount of testing. That's kind of the worst of both worlds: Barely any impact and a rather large risk of introducing regressions.

Try not to fall into that trap when choosing what to refactor. Be mindful about if the things you're about to change really make an impact on either your users or your fellow developers.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)