---
title: "Progressive enhancement as a benefit of CSS Nesting"
source: "https://kilianvalkhof.com/2026/css-html/progressive-enhancement-as-a-benefit-of-css-nesting/"
publishedDate: "2026-03-06"
category: "frontend"
feedName: "Kilian Valkhof"
author: "Kilian Valkhof"
---

## Progressive enhancement as a benefit of CSS Nesting

Something I knew is that in browser that support CSS nesting you can nest `@media` queries _inside_ of other CSS declarations. What I only fully grasped a few days ago is _how well this works_ for progressive enhancement.

I’ve happily used (and [wrote](https://kilianvalkhof.com/2021/css-html/css-nesting-specificity-and-you/) [about](https://kilianvalkhof.com/2023/css-html/the-gotchas-of-css-nesting/)) CSS and `@media` nesting for about six years now. Primarily through PostCSS, where it gets compiled away, and directly for the styling in Polypane where I know the exact browser engine. I have also had to implement my own parser for it in early 2023, when I implemented support for it in [Polypane’s Elements panel](https://polypane.app/blog/polypane-13-css-nesting-extension-support-in-beta-search-by-selector-and-chromium-110/#elements-panel-css-nesting-and-toggling-classes) (one of the first browsers that supported it).

So I’m far from a stranger to the workings of native CSS Nesting.

### Progressive enhancement in context [#](#progressive-enhancement-in-context)

Progressive enhancement is a way of setting up your code such that you provide a well-supported basis that works across all the browsers you target, and then you _add_ functionality when support is better.

In the context of accessibility, we often say that you should build the accessible variant as the default (for example, no animations) and only when the user indicates they _don’t_ need the accessible variant (for example, no-preference for reduced motion) then you **add** features on top of that accessible default (by adding animations).

This makes the accessible version the one that gets used when anything goes wrong, and if everything goes right and people want a little extra, they can get that without hampering the experience for others.

### The issues that brings [#](#the-issues-that-brings)

Unfortunately in ‘traditional’ CSS this often ends up with having styles of an element living in two different places (one inside and one outside a media query).

```
.my-element {
  width: min(1000px, -1rem + 100vw);
  max-height: calc(-2rem + 100svh);
  /* ...and a bunch more */
  scale: 0.5;
  opacity: 0;
}

/* potentially lots of other CSS until 
   you get to the "accessibility block" */

@media (prefers-reduced-motion: no-preference) {
  .my-element {
    transition: 0.5s ease-in-out all;
    /* maybe some additional styling to make this work well */
  }
}
```

That causes quite a few potential complications, especially for the long-term maintenance of code:

-   Accidentally editing the wrong ruleset
-   Not updating both when needed
-   Forgetting to remove one of the rulesets when a component gets removed
-   Selector ordering issues causing the wrong styles to apply

Because there is nothing that keeps track of the inherent link between the two rulesets, it’s one of those “great in theory, slightly more complicated in practice” situations.

### Progressive enhancement with CSS Nesting [#](#progressive-enhancement-with-css-nesting)

A couple of days ago I nested an `@media` query, something I must’ve done hundreds of times over the course of all those years. But in this case, here’s what I did:

```
.my-element {
  width: min(1000px, -1rem + 100vw);
  max-height: calc(-2rem + 100svh);
  /* ...and a bunch more */
  scale: 0.5;
  opacity: 0;
  
  @media (prefers-reduced-motion: no-preference) {
    transition: 0.5s ease-in-out all;
  }
  
  &:open {
    opacity: 1;
    scale: 1;
  }
}
```

Nothing out of the ordinary, but when looking at the ruleset I realized that this is now a fully self-contained, progressively enhanced CSS style!

The transition only gets applied for users with no-preference for motion. The logic for the progressive enhancement is co-located with the rest of the styles, and should I ever remove this component, I won’t need to hunt down a second place where I use the same selector.

### Obvious? [#](#obvious)

After writing it down it seemed really obvious, but that wasn’t the case for me _before_ I had written it, and neither was it to [folks on Bluesky](https://bsky.app/profile/kilianvalkhof.com/post/3mgajemyv6k2f), who seemed to enjoy my short post on it. So I figured it was worth a quick article on my blog as well.

If it was obvious to you and you had been doing it for a long time: that’s great! If this made you go “huh, yeah” then I hope it makes your progressive enhancements a little bit easier going forward.