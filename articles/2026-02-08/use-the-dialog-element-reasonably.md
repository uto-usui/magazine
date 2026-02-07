---
title: "Use the dialog element (reasonably)"
source: "https://scottohara.me/blog/2023/01/26/use-the-dialog-element.html"
publishedDate: "2023-01-26"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

Today, the HTML specification landed a [very important change to the dialog element](https://github.com/whatwg/html/commit/a9f103c9f7bd09ef712990194638c75db1f50e3c). One that resolves a multi-year discussion on how the `dialog` element should handle initial focus.

As mentioned in the linked PR, the specific changes here are to:

1.  Make the `dialog` focusing steps look at sequentially focusable elements instead of any focusable element.
2.  Make the `dialog` element itself get focus if it has the `autofocus` attribute set.
3.  Make the `dialog` element itself get focus as a fallback instead of focus being reset to the `body` element.

As this has just landed, it will take a bit more time for any of these changes (in the cases where they were not already implemented) to appear in browsers. But this is a good day for the `dialog` element.

As mentioned in the PR, **there are still additional topics that need to be discussed and worked on**. But, that’s also true for many HTML features. HTML is not perfect. That’s not a dig. Nothing’s perfect. And that’s why HTML, and other specifications, are constantly being worked on.

Instead of waiting for perfect, I _personally_ think it’s time to move away from using custom dialogs, and to use the `dialog` element instead.

## Use it

_IMO_, the `dialog` element has reached the tipping point of _generally_ being the better option for web developers who need to implement dialogs in their web pages. The number of accessibility requirements a developer needs to be aware of, and the level of effort to implement custom ARIA dialogs is now largely taken care of by browsers.

Will you still have use cases that would require a `role=dialog` over a `dialog` element? Yes.

Does your website or web application have its own requirements (user base, need to support legacy browsers, limited time/resources) that would make it unreasonable to migrate to using the `dialog` element? Sure!

But, if those - or other unmentioned reasons - don’t apply. Then it seems you’re a prime candidate to use the `dialog` element, with a minimal amount of JavaScript to implement. Versus adding an additional dependency (even if that [dependency is pretty darn great](https://github.com/KittyGiraudel/a11y-dialog)), or deciding that someone else’s code doesn’t smell like you, so, let’s reinvent the wheel, again!

## Don’t abuse it

Now, let’s not get [reckless with dialogs](https://modalzmodalzmodalz.com/). This isn’t really advice that’s unique to the `dialog` element itself. People have a long history of taking elements/components that were intended for specific use cases, and then stressing them to their limit to fit _their_ use case. Sometimes this makes sense, but other times (e.g., when your modal dialog consists of various headings, landmarks, and long-form content) it’s maybe best to sit back, take a deep breath, and think to yourself:

> Self. Hey. It's me, you know... you. I'm wondering. Maybe, just _maybe_ we **don't** need to shove a web page into another web page by use of a smaller window atop the first web page.
> 
> ...
> 
> I mean, we are already using an SPA. So ostensibly, even the argument that we need to use a modal dialog to save state, rather than going to a new web page, is a garbage lie we tell ourselves to maintain the way we've always done things, rather than accept the reality that we're absolutely willing to change course on other design and technical decisions due to a change in the wind from an opinionated topic within our community...
> 
> ...
> 
> Oh F it, of course we need to keep shoving web pages into web pages! LOLOLOL! I LOVE MY DECISIONS!

Well, that conversation didn’t go the way I had hoped… Anyway, yeh. Just because it’s easier to make dialogs now, than it has ever been, just please check yourself.

## Report issues / bugs!

To round this out, I’ll again make mention that there are still aspects of `dialog` which need work, or may even need to be implemented at all. For instance, non-modal (or modeless) dialogs? There’s some big question marks on how exactly that type of dialog should behave.

But, the best way to find out where there are still issues (functional, accessibility specific, feature requests, etc.) is to give the element a proper “go”.

So give the `dialog` a try. Be purposeful and reasonable with its use, keeping in mind any additional requirements that may limit or necessitate further testing and research (user, a11y, other) on your end.

Now if you’ll excuse me. I want to take a break from talking about dialogs for awhile (or at least, until its relevant to do so again) :)