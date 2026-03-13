---
title: "Building dynamic toggletips using anchored container queries"
source: "https://piccalil.li/blog/building-dynamic-toggletips-using-anchored-container-queries/?ref=main-rss-feed"
publishedDate: "2026-03-12"
category: "css"
feedName: "Piccalilli"
author: "Daniel Schwarz"
---

To add to the [container query options that we already have](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) (size queries, style queries, scroll-state queries), as well as the container query range syntax and many upgrades to all of the above, we can now use _anchored_ container queries from Chrome 143.

[Chrome’s announcement post](https://developer.chrome.com/blog/anchored-container-queries) demonstrates how, if we were using anchor positioning, we could use anchored container queries to query the currently active fallback position (if any). They’ve provided a little demo in the post where a toggletip caret is anchored to the side of a toggletip, but if the toggletip needs to be anchored to a different side of the trigger due to lack of space, the caret is anchored to a different side as well. So in this case, anchored container queries are used to determine which position the toggletip is in, so that we can position the caret accordingly.

This is a pretty good use-case for anchored container queries, but also a great opportunity to look at how we might build toggletips in the (hopefully) near future. You’ll learn about popovers and anchor positioning, which are already baseline and will ensure that the toggletips at least work, as well as declarative anchors, ‘modern’ `attr()`, and `corner-shape`, progressive enhancements en_chant_ments that provide a range of magical benefits.

Here’s what we’ll be making:

In Chrome you’ll see toggletip carets that flip to the appropriate side depending on the amount of space available, but in other web browsers you’ll get the toggletips without carets.

Let’s get into it!

## [Setting up the popover and anchor associations](#setting-up-the-popover-and-anchor-associations)

We’ll be using popovers to mark up the toggletips, as that’s the semantic way to do so these days, but before we begin it’s worth mentioning that they’re implicitly anchored. However, since you might want to use anchored container queries without popovers, I’ll show you how to set up anchor associations anyway.

To set up the popover and anchor associations in a declarative but progressively enhanced way, we’ll need the following HTML markup:

`<div anchor="leftButton" id="--leftPopover" popover>Toggletip</div> <div anchor="centerButton" id="--centerPopover" popover>Toggletip</div> <div anchor="rightButton" id="--rightPopover" popover>Toggletip</div>  <button id="leftButton" popovertarget="--leftPopover">Button</button> <button id="centerButton" popovertarget="--centerPopover">Button</button> <button id="rightButton" popovertarget="--rightPopover">Button</button>`

The most familiar part of this is probably the popover markup. We’ve given the toggletips the `popover` attribute, and then an `id` so that each trigger can reference a popover using the `popovertarget` attribute. The strange part is that we’ve used custom-ident values (e.g., `--leftPopover`), but I’ll explain why shortly. That’s the popover functionality set up.

For the anchor positioning we’ve also given `id`s to the triggers, and then referenced them from `anchor` attributes set on the toggletips. These values _don’t_ have to be custom idents.

However, for web browsers that don’t support the `anchor` attribute, we’ll need to use CSS instead, and there’s a shorter and a longer way to do that depending on whether or not modern `attr()` is supported.

The shorter, modern `attr()` way:

`/* Modern attr() supported */ @supports (x: attr(x type(*))) {   button {     /* Reuse the name from popovertarget */     anchor-name: attr(popovertarget type(<custom-ident>));   }    [popover] {     /* Anchor to the relevant button */     position-anchor: attr(id type(<custom-ident>));   } }`

Basically, if modern `attr()` is supported, we reuse the `popovertarget` values of the buttons as anchor names while making it clear that we want to parse them as custom idents. After that, we match the `id` values of the popovers to said anchors, thus setting up the anchor positioning associations. The `anchor-name` and `position-anchor` CSS properties only accept custom idents (e.g. `--leftPopover`), so that’s why we’re making a big fuss about them.

Next, if modern `attr()` _isn’t_ supported, name each anchor manually:

`/* Modern attr() not supported */ @supports not (x: attr(x type(*))) {   /* Assign anchor name */   #leftButton {     anchor-name: --leftButton;   }    /* Anchor to button */   #leftPopover {     position-anchor: --leftButton;   }    /* And so on... */   #centerButton {     anchor-name: --centerButton;   }    #centerPopover {     position-anchor: --centerButton;   }    /* And so on... */   #rightButton {     anchor-name: --rightButton;   }    #rightPopover {     position-anchor: --rightButton;   } }`

Once modern `attr()` is _Baseline widely available_, we can delete this block, and then once the `anchor` attribute is _Baseline widely available_, we can delete _all_ of this CSS. You won’t even need to use custom-ident values, so `--leftPopover` can become `leftPopover`, for example.

Note: if we’d rather that the toggletips be triggered on `:hover` (making them tooltips instead of toggletips), we can swap `popovertarget` for `interestfor`, but note that [interest invokers](https://css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers/) are only supported in Chrome 142 and above. Keep them in mind for the future!

[Advert![Save 20% on all the courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Aligning and styling the toggletips](#aligning-and-styling-the-toggletips)

Like last time, I’ll drop the code right here so you can skim through it before we look at it line-by-line:

`[popover] {   position: fixed;    /* Align to right/implied center */   position-area: right;    /* If no space, flip to other inline side */   position-try: flip-inline;    /*     1rem of spacing between the button and     toggletip that also flips side accordingly   */   margin-inline-start: 1rem;    /* Anchor toggletip caret to this */   anchor-name: --toggletip;    /* Used to query this container’s fallbacks */   container-type: anchored;    /* Scooped corners, if supported */   @supports (corner-shape: squircle) {     border-radius: 3rem;     corner-shape: squircle;   }    /* Normal corners, if not supported */   @supports not (corner-shape: squircle) {     border-radius: 1rem;   } }`

First, we must declare `position: fixed` on the anchored element (in this case though, popovers already have it).

Next, we need to position the toggletip relative to the button (let’s say the center-right) using the `position-area` property. Now, you might think that `position-area: center right` is the correct declaration here, but here’s what that actually does:

![An Inset-Modified Containing Block where an anchored toggletip is overflowing the center-right tile.](https://piccalil.b-cdn.net/images/blog/anchor-toggle-tips-wrong.png?auto=format&w=1500)

As you can see, it’s overflowing the center-right tile, which is wrong but forgiving, since web browsers declare `align-self: anchor-center` under the hood to make it work anyway. This is declared on what’s called the Inset-Modified Containing Block (IMCB), which again is the center-right tile.

However, [for reasons unknown, web browsers aren’t so forgiving when a fallback position is activated](https://nerdy.dev/why-isnt-my-position-try-fallback-working-in-small-spaces). The trick is to use `position-area: right` instead. By omiting the `center` keyword, it resolves to `position-area: span-all right`, which does this:

![An Inset-Modified Containing Block where an anchored toggletip is contained within the right-side tiles and then vertically centered.](https://piccalil.b-cdn.net/images/blog/anchor-toggle-tips-right.png?auto=format&w=1500)

Now the toggletip _does_ fit into the tile (IMCB). And again, it’s vertically aligned within the center of it due to `align-self: anchor-center`.

We can safely use `position-try: flip-inline`, which turns `right` into `left` whenever the toggletip overflows the viewport. Later on, anchored container queries will query whether this is happening or not.

After that, `margin-inline-start: 1rem` adds `1rem` of spacing between the button and the toggletip at the start of the inline axis, which also flips accordingly.

[Advert![Save 20% on all of our courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

`anchor-name: --toggletip` turns the popovers into anchors so that we can create toggletip carets and anchor them to said popovers. Normally this’d be a naming collision waiting to happen (because three different popovers are now called `--toggletip`, right?), but the toggletip carets will be nested inside the popovers, so they’re somewhat scoped.

And remember, we’ll be flipping the toggletip’s caret to the opposite side whenever the toggletip is flipped, and that’s what `container-type: anchored` is for — it’s a totally new type of container and we’ll be querying it’s fallback position to determine the correct side.

One more thing, though…

If `corner-shape: squircle` is supported (`@supports (corner-shape: squircle)`), then we use it with `border-radius: 3rem` to create corners that aren’t quite rounded but aren’t quite square either. If it’s _not_ supported then we just use `border-radius: 1rem`. This is optional of course, but `corner-shape` will play a bigger role when we use it again in a moment:

`/* Scooped corners, if supported */ @supports (corner-shape: squircle) { 	border-radius: 3rem; 	corner-shape: squircle; }  /* Normal corners, if not supported */ @supports not (corner-shape: squircle) { 	border-radius: 1rem; }`

## [Creating and positioning the toggletip’s caret](#creating-and-positioning-the-toggletips-caret)

Similar to how we anchored the toggletips to the buttons, the following code anchors the toggletip carets to the toggletips:

`[popover] { 	/* Previous section code */    /* Toggletip caret */   &::after {     /*       Only create carets if anchored       container queries are supported     */     @supports (container-type: anchored) {       /* Create caret */       content: "";        /* Anchor to toggletip */       position: fixed;       position-anchor: --toggletip;        /* Scooped carets, if supported */       @supports (corner-shape: scoop) {         height: 1rem;         aspect-ratio: 1/2;         corner-shape: scoop;         background: inherit;       }        /* Normal carets, if not supported */       @supports not (corner-shape: scoop) {         /* Hack to create a triangle */         width: 0;         height: 0;         border-top: 0.5rem solid transparent;         border-bottom: 0.5rem solid transparent;       }        /* If no fallback */       @container anchored(fallback: none) {         /* Position caret on the left */         position-area: left;          /* Needed for scooped carets */         @supports (corner-shape: scoop) {           border-top-left-radius: 100% 50%;           border-bottom-left-radius: 100% 50%;         }          /* Needed for normal carets */         @supports not (corner-shape: scoop) {           /* Part of the triangle hack */           border-right: 0.5rem solid var(--toggletip-color);         }       }        /* If flip-inline fallback triggered */       @container anchored(fallback: flip-inline) {         position-area: right;          @supports (corner-shape: scoop) {           border-top-right-radius: 100% 50%;           border-bottom-right-radius: 100% 50%;         }          @supports not (corner-shape: scoop) {           border-left: 0.5rem solid var(--toggletip-color);         }       }     }   } }`

First of all, the toggletip carets are CSS-generated using the `::after` pseudo-element:

`[popover] {   &::after {     /* Toggletip caret */ 	} }`

Then, within that, we need to see if the web browser supports anchored container queries (if not, the toggletip carets simply aren’t generated, although the toggletips will still work):

`[popover] {   &::after { 		@supports (container-type: anchored) { 	    /* 	      Only create carets if anchored 	      container queries are supported 	    */ 		} 	} }`

Within that, `content: ""` generates the toggletip carets (or, rather, it generates a pseudo-element with no content that we’ll style _into_ carets).

`position: fixed` and `position-anchor: --toggletip` anchors them to the toggletips.

After that, we again leverage `corner-shape` to create scooped toggletips. Or, if `corner-shape` isn’t supported, then we use the classic [border trick to create triangle-shaped carets](https://css-tricks.com/snippets/css/css-triangle/).

We also — finally — implement those anchored container queries to position the carets to the correct side of the toggletips. When a fallback isn’t active, `@container anchored(fallback: none)` will match, but when a fallback _is_ active, `@container anchored(fallback: flip-inline)` will match. The value of `fallback` simply needs to match a value of `position-try`:

`/* Scooped carets, if supported */ @supports (corner-shape: scoop) { 	height: 1rem; 	aspect-ratio: 1/2; 	corner-shape: scoop; /* (Border radius is set later) */ 	background: inherit; }  /* Normal carets, if not */ @supports not (corner-shape: scoop) { 	/* Hack to create a triangle */ 	width: 0; 	height: 0; 	border-block: 0.5rem solid transparent; /* (Side is set later) */ }  /* If no fallback */ @container anchored(fallback: none) { 	/* Position caret on the left */ 	position-area: left;  	/* Left border radii for scooped carets */ 	@supports (corner-shape: scoop) { 		border-top-left-radius: 100% 50%; 		border-bottom-left-radius: 100% 50%; 	}  	/* ‘Left’ border for normal carets */ 	@supports not (corner-shape: scoop) { 		border-right: 0.5rem solid var(--toggletip-color); 	} }  /* If flip-inline fallback triggered */ @container anchored(fallback: flip-inline) { 	position-area: right;  	/* Right border radii for scooped carets */ 	@supports (corner-shape: scoop) { 		border-top-right-radius: 100% 50%; 		border-bottom-right-radius: 100% 50%; 	}  	/* ‘Right’ border for normal carets */ 	@supports not (corner-shape: scoop) { 		border-left: 0.5rem solid var(--toggletip-color); 	} }`

As a reminder, here’s the final demo:

## [Wrapping up](#wrapping-up)

Container queries are evolving beautifully, especially with the newest addition, _anchored_ container queries. And, thanks to other modern CSS features such as the `anchor` attribute, ‘modern’ `attr()`, `corner-shape`, and even interest invokers, we can include all kinds of progressive enhancements to create some really awesome — in this case — toggletips.

If you want to go ahead and implement this (full code in [the demo](https://codepen.io/mrdanielschwarz/pen/gbrMGYx)), you totally can. If something isn’t supported it’ll simply revert to something that is, and then as new features become baseline, you can very easily remove the code that’s no longer needed.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_