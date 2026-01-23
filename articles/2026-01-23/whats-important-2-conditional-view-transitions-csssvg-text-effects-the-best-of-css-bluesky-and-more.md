---
title: "What’s !important #2: Conditional View Transitions, CSS/SVG Text Effects, the Best of CSS Bluesky, and More"
source: "https://css-tricks.com/whats-important-2/"
publishedDate: "2025-12-31"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

2026 is almost upon us. I know we’re all itching to see the clock strike midnight (cue The Final Countdown by Europe), but not without recapping the best CSS-related things that happened over the last two weeks!

### Conditional view transitions

[Chris Coyier](https://css-tricks.com/author/chriscoyier/) showed us [how to trigger different view transitions based on the URL](https://frontendmasters.com/blog/different-page-transitions-for-different-circumstances/) (or any conditional JavaScript logic, really). However, Bramus mentioned in the comments that [navigation matching is coming to CSS](https://frontendmasters.com/blog/different-page-transitions-for-different-circumstances/#comment-50499), so we might not need to rely on JavaScript for that part for very long. I’m keeping my fingers crossed for 2026!

### Annotating design system components for accessibility

Geri Reid carefully explained [how to annotate design system components for accessibility](https://zeroheight.com/blog/how-to-annotate-design-system-components-for-accessibility/), giving solid HTML-based examples. I especially love the part about defining elements, ARIA, markup, keyboard navigation, zoom, and user preferences as accessibility tokens.

![A pagination component with annotations explaining the semantic HTML markup and ARIA labels.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/wi-2-1-1024x381.png?resize=1024%2C381&ssl=1)

Source: [zeroheight](https://zeroheight.com/blog/how-to-annotate-design-system-components-for-accessibility/).

### Firefox to become a “modern AI browser” to the delight of absolutely no one

Firefox has been a bit of a rollercoaster lately. It started with [an interview on The Verge](https://www.theverge.com/tech/845216/mozilla-ceo-anthony-enzor-demeo), where new CEO Anthony Enzor-DeMeo said that Firefox “will evolve into a modern AI browser.” With only 2.3% of the [browser market share](https://gs.statcounter.com/browser-market-share), I suppose it was inevitable that Firefox would try to shake things up, but users don’t appear to want this at all. To stem the bleeding though, [they’ve announced an AI kill switch](https://futurism.com/artificial-intelligence/outcry-firefox-promises-kill-switch-ai-features).

And that’s how I met your Mo- …[Waterfox](https://www.waterfox.com/), which is a no-AI fork of Firefox.

### Creating ‘toon text with CSS and SVG

[Andy Clarke](https://css-tricks.com/author/andyclarke/) demonstrated [how to create the text effects of classic ‘toons using CSS and SVG](https://www.smashingmagazine.com/2025/12/smashing-animations-part-7-recreating-toon-text-css-svg/). I hadn’t heard of the [`paint-order`](https://css-tricks.com/almanac/properties/p/paint-order/) CSS property before this, so that part is pretty darn cool.

![A comparison of Andy Clarke’s ‘Hum Sweet Hum’ text effect (left) and the Augie Doggie ‘toon version of the same text effect (right).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/wi-2-2-1024x405.png?resize=1024%2C405&ssl=1)

Source: [Smashing Magazine](https://www.smashingmagazine.com/2025/12/smashing-animations-part-7-recreating-toon-text-css-svg/).

### 6 CSS features that you should learn in…_2025_

That’s right, 2025! Adam Argyle wrote about the [CSS features that you should learn in 2025](https://nerdy.dev/6-css-snippets-every-front-end-developer-should-know-in-2025) at the beginning of the year. Well, it’s almost 2026 now, so how did you do? I’ll be honest — I barely even touched the surface of [`@property`](https://css-tricks.com/almanac/rules/p/property/).

### Great CSS posts on Bluesky

Let’s be honest, social media isn’t a fun place to hang out anymore, but I’ll make the exception for Bluesky. I rarely see stuff that’s not relevant to my interests, I actually talk to people on there, there’s a large dev community on there, and of course [CSS-Tricks is on Bluesky](https://bsky.app/profile/css-tricks.bsky.social) too, as is the CSS-Tricks team and [many of our authors](https://bsky.app/profile/css-tricks.bsky.social/lists/3l7w74iflfa22).

So since browser updates typically ship at the beginning of the month, here are some cool posts by the Bluesky CSS community instead:

[Temani Afif](https://css-tricks.com/author/afiftemani/) demonstrated [a very interesting combination](https://codepen.io/t_afif/pen/dPMBMBE) of [anchor positioning](https://css-tricks.com/css-anchor-positioning-guide/), [`attr()`](https://css-tricks.com/almanac/functions/a/attr/), [container queries](https://css-tricks.com/css-container-queries/), and [`shape()`](https://css-tricks.com/almanac/functions/s/shape/), which you can play around with (probably requires Chrome):

> 💡 CSS Tip!Two circles, one arrow, and CSS magic. 🪄A cool demo packed with modern features (anchor positioning, attr(), container queries, shape(), and more!) 🤩css-tip.com/connected-ci…The shape and position of the arrow are fully controlled using CSS (Yes, there is a collision detection).
> 
> [\[image or embed\]](https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k/post/3ma3zqmmtks2o?ref_src=embed)
> 
> — CSS by T. Afif ([@css-only.dev](https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k?ref_src=embed)) [16 December 2025 at 11:21](https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k/post/3ma3zqmmtks2o?ref_src=embed)

Stephen Margheim listed the various reasons [why you should namespace your semantic classes](https://bsky.app/profile/fractaledmind.bsky.social/post/3masmuiptaa2l) (e.g., rename `.btn` to `.ui-button`):

> If you're going to write semantic CSS classes in 2025, don't call them .btn or .card. Use a ui-\* prefix: ui-button, ui-input, ui-badge. Here's why naming matters more than you think…
> 
> — Stephen Margheim ([@fractaledmind.bsky.social](https://bsky.app/profile/did:plc:h6bn3rru23cnhckc4a25ekz2?ref_src=embed)) [25 December 2025 at 11:02](https://bsky.app/profile/did:plc:h6bn3rru23cnhckc4a25ekz2/post/3masmuiptaa2l?ref_src=embed)

Similar to Andy Clarke’s ‘toon text explorations, Ana Tudor’s [displacement map text effects](https://bsky.app/profile/anatudor.bsky.social/post/3mav7kg334c25) are rather astonishing as well, although you’ll most likely need Chrome for cutting-edge stuff like this:

> I personally love displacement maps.When they work, they can do really cool stuff, not just shrinking/ expansion, but also rotation (codepen.io/thebabydino/…), 3D effects (codepen.io/thebabydino/…), the bubbling lens effect (codepen.io/thebabydino/…).None of these duplicate/ split text.
> 
> [\[image or embed\]](https://bsky.app/profile/did:plc:4hm2yozxzsakerfalloor5s6/post/3mav7kg334c25?ref_src=embed)
> 
> — Ana Tudor ([@anatudor.bsky.social](https://bsky.app/profile/did:plc:4hm2yozxzsakerfalloor5s6?ref_src=embed)) [26 December 2025 at 11:41](https://bsky.app/profile/did:plc:4hm2yozxzsakerfalloor5s6/post/3mav7kg334c25?ref_src=embed)

There are [more displacement map text effects](https://bsky.app/profile/anatudor.bsky.social) on Ana’s feed.

George Black said:

> Writing CSS for my site that uses modern features only available in Chrome or Safari, but not both. Eventual consistency — eventually it’ll look right in one browser… right?

> Writing CSS for my site that uses modern features only available in Chrome or Safari, but not both. Eventual consistency — eventually it’ll look right in one browser… right?
> 
> — George Black ([@george.black](https://bsky.app/profile/did:plc:n26uge5dhwhq7lskqadwx7vx?ref_src=embed)) [28 December 2025 at 21:14](https://bsky.app/profile/did:plc:n26uge5dhwhq7lskqadwx7vx/post/3mb3ahoyo222r?ref_src=embed)

Actually, yes! Most likely. For those that don’t know, the Interop Project is a collaboration between Chrome, Firefox, and Safari where they make certain features work consistently across their browsers. You can even vote on the features! Keen to learn more? Read what [Chrome](https://web.dev/blog/interop-2026-proposals) and [WebKit](https://webkit.org/blog/17320/submit-your-ideas-for-interop-2026/) have said about Interop 2026.

Finally, a massive shout-out to our very own [Sunkanmi Fafowora](https://css-tricks.com/author/sunkanmifafowora/) for [saying what we’re all thinking](https://bsky.app/profile/sunkanmifafowora.bsky.social/post/3ma6nuiw2tk2e):

> Thank you to all who work very hard to expand and push the boundaries of what we can do with CSS. You’ve made my work and the work of millions of others so much easier. You’re not unnoticed, and I do hope you’re having an amazing day.

> Thank you to all who work very hard to expand and push the boundaries of what we can do with CSS. You've made my work and the work of millions of others so much easier. You're not unnoticed, and I do hope you're having an amazing day.💛
> 
> — Sunkanmi Fafowora ([@sunkanmifafowora.bsky.social](https://bsky.app/profile/did:plc:kc66te46cf4pmnkugea7fe5d?ref_src=embed)) [Dec 17, 2025 at 12:26](https://bsky.app/profile/did:plc:kc66te46cf4pmnkugea7fe5d/post/3ma6nuiw2tk2e?ref_src=embed)

On that note, the CSS-Tricks team wishes you a very happy new year. May your websites be free of bugs and work in all (stable) browsers!

See you in 2026!