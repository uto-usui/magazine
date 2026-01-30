---
title: "A Framework for Evaluating Browser Support"
source: "https://www.joshwcomeau.com/css/browser-support/"
publishedDate: "2024-11-26"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

According to caniuse, container queries are supported for [almost 93% of users(opens in new tab)](https://caniuse.com/css-container-queries) (as of November 2024). That sounds pretty good! My mom would have been thrilled if I came home with 93% on my report card. **But is it actually sufficient when we’re talking about browser support levels?**

Like so much in software development, the answer is _it depends._ In this blog post, I’m going to share the framework I use when deciding whether it’s appropriate to use a new CSS feature. We’ll look at the 3 individual factors I consider, and at the end, we’ll assemble them into a formula you can use to help you decide whether it’s OK to use a feature or not.

We’re focusing on CSS in this blog post, but the same framework can be used to evalute whether a modern JavaScript or HTML feature can be used.

## [Link to this heading](#one-the-fallback-experience-1)1\. The fallback experience

Have you heard of `text-wrap: pretty`?

It’s one of my favourite lil’ CSS features. It tweaks the line-wrapping algorithm so that it produces nicer-looking paragraphs. It avoids things like this:

![A paragraph with 4 lines of text. The final “line” is a single emoji, looking stranded.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcustom-css-reset%2Fpretty-wrap-before.png&w=1080&q=75)

I often end my sentences with an emoji, and the default line-wrapping algorithm will sometimes lead to it being stranded awkwardly on its own line. This is known as an “orphan” in typography.

The `text-wrap: pretty` declaration switches to a more sophisticated line-wrapping algorithm which avoids orphans, and generally makes paragraphs feel more symmetrical and balanced:

![The same paragraph, except now the final line includes a regular word with the emoji. Feels much more balanced visually.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcustom-css-reset%2Fpretty-wrap-after.png&w=1080&q=75)

As I write this in November 2024, `text-wrap: pretty` [doesn’t have very good browser support(opens in new tab)](https://caniuse.com/mdn-css_properties_text-wrap_pretty), about 72%. Probably too low to use in production, right?

**Well, let’s consider what happens when someone visits from an unsupported browser.** The `text-wrap: pretty` declaration has no effect. Those users don’t get the _benefit_ of this nice little enhancement, but there also isn’t any _downside._

In my mind, this is a perfect example of a . It’s a bonus, a nice little extra for folks using modern browsers. For features like this, I don’t really care _what_ the browser support is; even something low like 20% would be fine.

Other features fail a bit less gracefully. For example, I’ve become a fan of `overflow: clip`. It’s like `overflow: hidden`, but it doesn’t create a scroll container.

This means that we can finally clip things in one axis but allow them to overflow in the other axis:

overflow-x:

![A 3D representation of Josh, rendered in a playful clay style](https://www.joshwcomeau.com/images/josh/josh-happy-light.png)

This clipping behaviour is how most of us _expect_ `overflow-x: hidden` to work. It’s great that we finally have a straightforward way to do this. But is it safe to use in production?

[According to caniuse(opens in new tab)](https://caniuse.com/mdn-css_properties_overflow_clip), the `clip` value is supported for ~93% of users. If someone visits using an older browser, the property won’t have any effect, which means the content will overflow normally (like the `visible` option shows).

If we’re using `overflow-x: clip` for purely cosmetic purposes, this might be an acceptable trade-off. ~7% of users will have a slightly jankier experience, but we’re not really interfering with their ability to access and use our website/webapp.

**We do have to be careful though.** In other scenarios, this property can cause bigger problems for folks in unsupported browsers:

Clipping:

![A 3D representation of Josh, rendered in a playful clay style](https://www.joshwcomeau.com/images/josh/josh-happy-light.png)

Hello, World!

This paragraph is right after the clipped container, and if `overflow: clip` is not supported, the clipped image will sit in front of this text, making it much more difficult to read.

In this situation, we’re using `overflow-y: clip` to hide the overflow, but when this property isn’t supported, the overflow winds up blocking the text in the subsequent paragraph!

**This is the first factor in our framework.** When deciding whether or not a CSS feature can be used, we should consider what the fallback experience is like.

Some properties, like `text-wrap: pretty`, are purely progressive enhancements and can be used regardless of browser support. But it gets more complicated with properties like `overflow: clip`; we need to evaluate these properties on a case-by-case basis to determine whether the fallback experience is acceptable or not. Other features, like subgrid, will very likely cause layout issues in unsupported browsers.

### [Link to this heading](#providing-custom-fallback-styles-2)Providing custom fallback styles

If the default fallback experience is unacceptable, we can often improve this fallback experience by providing alternative CSS.

The simplest way to do this is to provide multiple values for the same property. For example:

```
.thing {
  overflow: hidden;
  overflow: clip;
}
```

In CSS, declarations are evaluated from top to bottom, with later values overwriting earlier ones. In a supported browser, `overflow: hidden` will be overwritten by `overflow: clip`.

In _unsupported_ browsers, however, `overflow: clip` will not be recognized as a valid value, and will be ignored. As a result, `overflow: hidden` will be applied instead.

In other situations, we might want to apply an _alternative set of styles_ when a feature is unsupported. We can use the [@supports at-rule(opens in new tab)](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) for this:

```
.parent {
  display: grid;
  gap: 1rem;
}

@supports not (gap: 1rem) {
  /*
    Any CSS in here will be applied only if the “gap”
    property is unsupported.
  */
  .child {
    margin-inline: 0.5rem;
  }
}
```

I’ve had mixed results using `@supports` in practice; it doesn’t always work the way I expect, since sometimes a feature is recognized by the browser but not _fully_ supported. That said, it can still be a very handy tool!

And remember: the goal isn’t to produce exactly the same UI for all users. The goal is to provide a _reasonable fallback experience._

## [Link to this heading](#two-the-browser-breakdown-3)2\. The browser breakdown

Have you ever wondered where caniuse gets its data from? How, exactly, does it know that 92.77% of people are using browsers which support container queries?

caniuse gets its data from _statcounter_, a web analytics tool which is used on ~1.5 million websites. Whenever a person visits one of these 1.5 million websites, data about their browser is sent to statcounter, which is aggregated and [released publicly(opens in new tab)](https://gs.statcounter.com/browser-market-share).

Because these 1.5 million websites are spread across all sorts of industries in hundreds of different languages, we wind up with a pretty good worldwide sample of internet usage. But _your product’s audience_ might look very different!

For example: this table shows the difference between statcounter’s global sample and the traffic that visits this blog:

Browser

Global

joshwcomeau.comBlog

Delta

Chrome

66.7%

74.5%

7.8%

Safari

18.1%

12.2%

5.9%

Edge

5.3%

5.0%

0.3%

Firefox

2.7%

6.8%

4.1%

Opera

2.2%

0.9%

1.3%

IE

0.13%

0.0%

0.13%

Other

4.87%

0.6%

4.27%

There are some interesting differences between these two data sets!

Globally, Firefox has been on the decline for a while, falling to 2.7%. Readers like you, however, are 2.5x more likely to use Firefox than the worldwide average! Solid Firefox support is therefore especially important for me.

And while Internet Explorer (IE) has fallen to low levels of usage globally, it’s even _less_ popular amongst my audience; in the 3-month sample I looked at, only 1 visitor used Internet Explorer, which works out to be 0.0000018% of my traffic!

But when I worked at Khan Academy, the numbers told a different story. Khan Academy, if you’re not familiar, is an education platform that mainly covers elementary/high-school topics. It’s frequently visited by students using computers in their school’s computer lab, machines that tend to be older and less-frequently-updated than personal computers. As a result, Internet Explorer was a surprisingly big percentage of overall traffic.

So, this is an important thing to consider in our framework. The global values supplied by caniuse may or may not represent the people who use our websites and web applications, and it’s worth figuring out which browsers are over-represented or under-represented.

## [Link to this heading](#three-the-potential-harm-4)3\. The potential harm

So let’s suppose there’s a CSS feature you really want to use. Your best estimate is that 99% of your product’s audience uses a supported browser, but the fallback experience is totally broken. You’re wondering if you should spend time trying to fix it.

**Is it OK to break the user experience for 1% of users?** I think it depends on what service your website/webapp offers.

For example, let’s suppose that you work on a yacht rental service. Wealthy clients can use your app to rent luxury boats for weekend getaways.

I don’t believe there’s a moral imperative to provide this service, and so I think it’s fine to say “we are intentionally deciding not to support X browser”. This becomes a purely financial calculation, and you can weigh the lost revenue from 1% of users against the increased cost of supporting legacy browsers.

On the other end of the spectrum, let’s suppose you work for _ClicSanté,_ a tool developed by the Quebec government to allow people to book vaccines, blood tests, and other medical appointments. For something like this, it’s _super important_ that as many people as possible can access the service. We don’t want people to skip getting a vaccine because our webapp didn’t work for them!

This is the final consideration in my formula: if the fallback experience for legacy browsers is unusable, what is the harm caused by this lack of support? What are the real-world consequences if people can’t access your service?

## [Link to this heading](#the-formula-5)The formula

Alright, so I’ve gone over the things I consider when evaluating browser support. Let’s put these factors to the test with a real-world example: _is it OK to start using container queries on this blog?_

According to caniuse, container queries are at ~93% browser support, but this is based on its worldwide sample. I dug into my analytics software, and based on some rough calculations, I think this number is closer to 97% for this blog’s audience.This is a very rough estimate; the privacy-focused analytics tool I use, Fathom, doesn’t break down browser support by version number, so I calculated this by extrapolating from less-common browsers like Opera and UC Browser.

Is 97% sufficient? Well, let’s think about the other factors.

**First, what is the fallback experience?** This will depend on what specifically we’re looking to do with container queries. As an example, let’s use the [newsletter issue page](https://www.joshwcomeau.com/email/2024-07-13-deadmau5/), where I use container queries quite a bit.

To test the fallback experience, I deleted all of the CSS within container queries. This is the result:

### Default UI

![Screenshot of a layout that displays an email. In the left-hand column there’s some metadata about the email (sender name, address) and a little banner advertising my newsletter](https://www.joshwcomeau.com/images/browser-support/cq-working.jpg)

### Fallback UI

![Screenshot of the same layout, except now the email metadata overflows, obscuring the end of the sender’s email address. Also, the banner advertising the newsletter now has an oversized illustration, forcing the text to be really narrow, only fitting 1-3 words per line.](https://www.joshwcomeau.com/images/browser-support/cq-fallback.jpg)

Click the “Toggle” button to switch between the default UI (with container queries fully supported) and the fallback UI (with all of the CSS within container queries deleted, simulating an unsupported browser).

The fallback experience is definitely worse. The sender email is overflowing its container, obscuring the end of the domain. And my 3D mascot is taking up _way_ too much space, making the text feel super cramped (I’m using container queries to hide the mascot when the container is too small, to prevent this exact issue).

In my opinion, though, these issues aren’t _showstoppers._ I don’t think they affect the user’s ability to read the newsletter issue, which is the primary purpose of this page. So I think this fallback experience is adequate.

**But this is just one particular case.** I’ve started using container queries in _lots_ of places on my blog. Do I need to check the fallback experience of each one? After all, container queries often change layout properties, which could lead to some _very_ broken UI.

Well, to answer this question, let’s consider the final factor in my formula: **what is the potential harm caused by a broken experience?**

My blog provides tutorials for web developers. The information is useful (at least, I hope it is 😅), but I don’t think anybody would say that it’s an essential service.

So, to summarize:

1.  My audience skews more-modern than the global sample, with approximately 97% using supported devices.
    
2.  The fallback experiences _seem_ adequate (most of the time, at least).
    
3.  The service I provide is inessential, and there isn’t much potential for harm.
    

Given all of that, I’m comfortable making the call that I can use container queries on this blog. 👍

**But if I was working on a different product, I’d very likely come up with a different answer.** I am definitely _not_ saying that container queries should always get the green light!

## [Link to this heading](#the-worlds-unavoidable-nuance-6)The world’s unavoidable nuance

As engineers, we tend to appreciate simple pass/fail tests. Ideally, we’d have some number we could use as a benchmark: “if browser support is above 97%, use Feature X, otherwise, use Feature Y”.

But the real world is messier than this! I’ve done my best to distill my typical thought process into a repeatable framework, but honestly, it’s always going to be a bit murky, the sort of thing that requires real consideration to figure out.

Hopefully, though, the ideas in this blog post give you some confidence when it comes to making these decisions!

**Speaking of confidence:** did you know I have an interactive CSS course that helps you build a mental model for the entire CSS language? 😄

[![CSS for JavaScript Developers](https://www.joshwcomeau.com/images/the-importance-of-learning-css/css-for-js-banner.png)](https://css-for-js.dev/)

[CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/) is designed for people who are sick of feeling like they just don’t have a solid grasp on CSS. I felt like this for _years;_ I knew the basics, but I would frequently run into funky situations where the CSS snippets I had used over and over would inexplicably do something totally different. I was constantly getting tripped up by unexpected behaviour.

I spent years deepening my understanding of CSS, and it has been an absolute gamechanger. Things that used to seem inconsistent and arbitrary to me now make perfect sense. It turns out that CSS is actually a pretty great language when you get the hang of it!

You can learn more here:

-   [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/)
    

### Last updated on

December 3rd, 2025