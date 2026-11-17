---
title: "Staggering Scroll-Driven Animations with animation-range-start"
source: "https://css-tricks.com/staggering-scroll-driven-animations-with-animation-range-start/"
publishedDate: "2026-11-16"
category: "css"
feedName: "css-tricks"
author: "Lee Meyer"
---

The other day on the CSS-Tricks Slack channel, [Danny Schwartz](https://css-tricks.com/author/danielschwarz/) shared an [interesting recent Master.dev article by Ashutosh Biswas](https://frontendmasters.com/blog/scrubbable-staggered-animation-with-css-function/) on how to [stagger](https://css-tricks.com/different-approaches-for-creating-a-staggered-animation/) CSS [scrolling animations](https://css-tricks.com/slide-through-unlimited-dimensions-with-css-scroll-timelines/) using a clever combo of several emergent CSS features and [a lot of math,](https://master.dev/blog/scrubbable-staggered-animation-with-css-function/#a-brief-intro-to-the-stagger-formula) which Ashutosh admits is “a huge formula and can look intimidating.”

I’ll agree with Ashutosh there.

## A heartbreaking work of staggering genius

When Danny Slacked the link for the Frontend Masters article, he described it as “CSS on drugs.” Speaking of drugs, I am on heavy prescription painkillers while recovering from a serious injury, so that might not help my current comprehension skills. Nevertheless, after reading Ashutosh’s article a few times, here’s a meme showing how I’d feel using such an elaborate algorithm for something as mundane as staggering the animations of some characters as they scroll into view.

![Man facing back towards camera looking at a chalkboard full of complex math equations. Meme reads Almost ready to stagger scroll animations.](https://css-tricks.com/wp-content/uploads/2026/06/scroll-animation-meme.jpg)

Don’t get me wrong. I know the complexity is because Ashutosh is going for a generic solution in which we can connect a “progress value to an animation, scroll progress, or any other input to drive the staggering.”

In fact, I can dream up a scenario in which this might be what we want: Imagine a CSS karaoke machine that displays [a ball bouncing on text that incrementally highlights, based on the user’s progress through the vocals](https://youtu.be/6Zqx7kOAHas?si=uSFB4Tv2ue_nj7fC) measured via [speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). Running that kind of animation “not as a collection of independently timed objects, but as a single predictable, holistic effect driven by one progress value” might be exactly what the doctor ordered. This would be true because the staggered animations could be interrelated, and the overall animation would be driven by a custom input that’s not built into the browser.

But unlike this hypothetical scenario, replacing the passage of time with scroll progress to control animations is already built into modern CSS. I contend that we’d need a better reason to roll our own implementation than the examples Ashutosh gives.

Ashutosh showcases a scroll-driven use case as “one of those ideal scenarios where the stagger formula shines.” But a red flag that we’re in danger of reinventing something we can get for free is that the spec for scroll-driven animations is cognizant that if we opt to base an animation on scroll progress rather than on time, then, as Ashutosh says, “the animation we are going to achieve is different from traditional ones because we don’t include time in our considerations.” This is no surprise to the creators of scroll timeline, and [the MDN docs make Ashutosh’s point in different words when introducing scroll timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations).

The docs also point out that `animation-delay` is [only meaningful when we are using the default time-based document timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines?utm_source=chatgpt.com#regular_css_animations_default_document_timeline). Therefore, `animation-delay` does not affect scroll-driven animations. But this is why CSS introduced [`animation-range-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range-start), which allows us to delay a scroll-driven animation relative to scroll progress and not time.

So, as esoteric and trippy as the math-heavy approach appears, that could be because we are doing something that should be simple in an unusual way.

Let’s see if I’m right by rewriting Ashutosh’s demo to remove reliance on [custom CSS functions](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Custom_functions_and_mixins/Using_custom_functions) and use `animation-range-start` instead.

## Rewriting a rewrite

Ashutosh’s rework of Frontend Masters’ animated tally of donations in the site footer is a nifty, subtle use of [scrollytelling](https://css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries/) that makes the user feel invested in revealing that number.

**Sidenote**: The only qualm I have about this use of scroll-driven animations for the donation tally is that it might be _too_ subtle — if the user scrolls too quickly, the animated entrance of each digit might occur too quickly to notice. Therefore, the donation tally could be a good case study for comparing the merits of [scroll-driven versus scroll-triggered](https://css-tricks.com/scroll-driven-scroll-triggered-scroll-states-and-view-transitions/#scroll-triggered-animations) animations as design options. However, that story will have to wait for another day, as the focus of this article is only to show that the staggered scrolling CSS animations can be greatly simplified.

In the video below, my eight-year-old narrates, as a reminder that simplicity is key to the web we’re choosing to leave to the next generation. He compares the complex math in the original demo source code with my `animation-range-start` fork. He shows the two versions working side by side, demonstrating that sometimes the only thing we lose by judiciously deleting complex code is a headache.

And for those using a Chromium-based browser, my fork of the Pen is below. You can peruse the CSS to see how it does away with the grand unified theory of staggered scrolling animations, and instead deals only with the problem at hand. Since I preserved the original functionality, you’ll need to scroll gradually to appreciate the staggered animations.

## A simplistic staggering formula for math phobics

I once tackled a [related problem with a mathematical formula](https://css-tricks.com/spiral-scrollytelling-in-css-with-sibling-index/#spiral-and-fade-the-elements-using-sibling-index-and-sibling-count) in a previous article, which touched on how we can use [`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) to “increment [`animation-range-start`](https://css-tricks.com/almanac/properties/a/animation-range/) to stagger the delay before characters fade in as the user scrolls.”

The truth is, if we refuse to fall into the coding trap of possibly [abstracting the wrong thing](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction), we can use one line of CSS to replace a formula that took 1.3k words in the Frontend Masters article for me to still not fully grasp:

```
animation-range-start: contain calc(10% + 2.5% * sibling-index());
```

The 2.5% increment for each sibling is because there are eight characters to stagger, and I wanted to choreograph the animations such that they are delayed in evenly-spaced increments till the last character makes its animated entrance when it reaches 30% of the containment range (10% + 20%).

## Avoiding reinventing easing functions

It was inadvertently apt to describe the original post as “CSS on drugs.” Once you reinvent one built-in CSS feature, you can’t stop there. You find yourself having to recreate more stuff that CSS should be able to do by itself. Sure enough, even after we get through the custom formulas that make scroll timelines do what they already do, Ashutosh announces, “Unfortunately, we can’t use easing keywords or `cubic-bezier()` or `linear()` functions here. We are left on our own to create easing functions.”

We shouldn’t have to because, despite the word “timing” in the name of the [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timing-function) property, MDN is clear that “`animation-timing-function` has the same effect when creating [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) as it does for regular time-based animations.” I know from experience that scroll-driven animations work with `animation-timing-function` because I used scroll-driven animations with [`steps()`](https://css-tricks.com/almanac/functions/s/steps/) to animate a sprite climbing a ladder in my [CSS scrollytelling game](https://css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries/).

The problem in the land of CSS on drugs is that after merging all the staggered animations into one, the easing applies to the entire master timeline rather than to each element. It’s not a flaw in CSS, but a logical consequence of the “holistic effect driven by one progress value.” Be careful what you wish for.

## In defense of reinventing the wheel

To be fair, over the years I have seen impressive results from developers reinventing things the browsers already do, usually because the reinvention gives us control we couldn’t obtain otherwise.

**Project**

**Browser capability being reinvented**

**What we gained**

**What it cost**

[React](https://react.dev/)

DOM updates and UI reconciliation

Declarative UI, component model, state-driven rendering, cross-platform renderer architecture

Extra abstraction layer, bundle size, virtual DOM overhead, harder debugging of actual DOM

[Pretext](https://pretextjs.dev/)

Browser text measurement and line breaking

Text layout without touching DOM, predictable measurements, virtualized lists, server-side possibilities, high performance for bulk calculations

Must keep up with browser typography behavior, extra maintenance burden, duplicate layout engine logic

[CSSTree](https://github.com/csstree/csstree)

Browser CSS parsing

Programmatic analysis, transformations, linting, optimization, AST access

Maintaining compatibility with evolving CSS specs, parser complexity

I mention this to show that reinventing something like scroll timelines isn’t an inherently bad idea if we know why we’re doing it. After all, scroll timelines are only a reinvention of what developers were doing for decades prior in JavaScript. Having said that, I believe my rewrite of the staggered scroll-driven tally demo shows that the original approach was overkill for that example. Do let me know in the comments if you see any advantage to the custom CSS functions version over using `animation-range-start`.

## Wrapping up

And yet the thought that stuck with me about the Frontend Masters post is that it opens the door to linking the progress of a CSS animation to any arbitrary input value that could be used in a conceptually similar way to scroll timelines.

This really appeals to me, because even when I first started writing about scroll timelines in 2024, I [mentioned](https://css-tricks.com/slide-through-unlimited-dimensions-with-css-scroll-timelines/#user-controlled-animations-beyond-scrollbars) that “I would love to see other input controls that can manipulate animation timelines. Imagine text fields progressing animations as you fill them out.” Or how about an animation driven by how closely the new password you are typing matches a password scheme?

**Sidenote**: Adam Argyle’s [Prop For That](https://nerdy.dev/prop-for-that) library, which [Geoff recently wrote up](https://css-tricks.com/prop-for-that/), makes it more convenient than ever to [expose validation information about a field via CSS custom properties.](https://prop-for-that.netlify.app/docsite/demos/field/)

I can add my hypothetical karaoke machine scenario to the wishlist of custom progress inputs for controlling animations. How about an animation driven by the user’s progress through a quiz or a shopping cart?

Custom [animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) would open the door to all sorts of engaging user experiences—but the code Ashutosh has shared may be the closest we are likely to get to driving CSS animations using values other than time or scroll progress.

Let me know in the comments if you can think of other types of progress inputs that could drive CSS animations to create immersive, interactive experiences.

## Author Interview

CSS-Tricks editor Geoff Graham sits down with author Lee Meyer to demo Google’s Prompt API and weigh it (good and bad) place in front-end development.