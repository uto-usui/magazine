---
title: "Understanding CSS random()"
source: "https://piccalil.li/blog/understanding-css-random/"
publishedDate: "2026-11-18"
category: "css"
feedName: "Piccalilli"
author: "Mat Marquis"
---

One develops a certain degree of muscle memory putting together [an in-depth course on JavaScript’s arcane workings](https://piccalil.li/javascript-for-everyone/). That’s why a particularly keen-eyed reader might notice that the posts on [my own blog](https://wil.to/posts) have started shamelessly copying _taking inspiration from_ features that you’ll see here on Piccalilli.

In the earliest drafts of [_JavaScript for Everyone_](https://piccalil.li/javascript-for-everyone) I was using Piccalilli’s `<SideNote>` component to solve for a specific problem that I ran into almost immediately: JavaScript is made out of JavaScript, and you can’t cover almost any topic or syntax without touching on dozens of other topics and syntaxes. When I found myself backed into a corner by terminology and concepts related to the topic at hand that we hadn’t yet covered, I would use a side note to call it out — a way to keep from littering every lesson’s prose with “_which we’ll cover later_”s and “_don’t worry about this yet_”s:

![A screenshot of an article layout showing a main paragraph about javascript primitives on the left, paired with a boxed side note in the right margin explaining that variables will be covered in detail after primitives](https://piccalil.b-cdn.net/images/blog/sidenote-formal.png?auto=format&w=1500)

As tends to happen with any feature, the more I found myself settling into the project, the looser the use case for these little components became:

![A screenshot of an article layout showing a paragraph explaining javascript symbols on the left, paired with a boxed side note in the right margin joking that the pun "uniquely fraught" is very funny and will be on the test.](https://piccalil.b-cdn.net/images/blog/sidenote-informal.png?auto=format&w=1500)

…And owing to a condition that I call _The Speedrunner’s Temperament_, I inevitably ended up using them to play with the boundaries of the medium a little bit, just to see what I could get away with:

![A screenshot of an article layout showing a paragraph on the left joking about playing an airhorn sound effect when a JavaScript promise resolves, paired with a boxed side note in the right margin that reads, "Editors note: Mat, we've talked about this."](https://piccalil.b-cdn.net/images/blog/sidenote-meta.png?auto=format&w=1500)

I ended up really missing these little widgets when I’d be writing for my own site, so I used a little bit of my downtime this week to steal _take inspiration from_ them. The core of it ends up bring a relatively light lift, thanks to grid layout and a quick Eleventy shortcode that parses a supplied string as Markdown and returns the result wrapped in `<aside class="sidenote"></aside>`. I use “hand-scribbled” accents for notation on my website, so I carried that sort of design treatment over to these as well:

![An example of Mat's blog, showing prose and a side note in the right margin. There's a hand-drawn style line leading up to the note.](https://piccalil.b-cdn.net/images/blog/wilto-scribble.png?auto=format&w=1500)![](https://piccalil.b-cdn.net/images/blog/css-random/wilto-scribble.png?auto=format&w=1500)

Good start, but anything worth doing is worth doing to ludicrous excess, I always say: a subtle application of `animation-timeline: view()` makes them fade in and scale up ever-so-slightly as they approached the center of the viewport, by a slightly different `scale()` factor across breakpoints. That had things looking pretty sharp, but arguably a little _too_ sharp — these were meant to be “scribbled in the margins” both tonally and in terms of presentation, and a perfectly squared span of text wasn’t quite getting that across. Easy enough to put a quick `transform: rotate(2deg)` on there too, but that would still give me a uniform result throughout the page:

![Multiple of the same style notes as the image above. This time, they both slightly vary in rotation angle.](https://piccalil.b-cdn.net/images/blog/wilto-skew.png?auto=format&w=1500)

What I needed was some old fashioned, organic-style _jank_, and that gave me the perfect excuse to finally try out the [brand new](https://caniuse.com/mdn-css_types_random) `random()` CSS function.

In its most basic form `random()` accepts a pair of comma-separated values that will act as the lower and upper bounds for the random value that will result, and an optional third value defining the **step** — the intervals between those limits. `random( 0px, 10px )` will result in an arbitrary pixel value between 0 and 10, while `random( 0px, 10px, 5px )` will result in 0, 5, or 10. Nothin’ to it, at face value. `transform: rotate( random( -2.5deg, 2.5deg ) )` suited my needs just fine, giving me a random rotation value between -2.5 and 2.5 degrees. By default this calculation is **scoped to each individual element, which means that each note will have its own random rotation**:

`.sidenote {   transform: scale(0.925) rotate(random(-2.5deg, 2.5deg)); }`

![As demonstrated in the previous image, the notes now have an even more random rotation angle.](https://piccalil.b-cdn.net/images/blog/wilto-randomskew.png?auto=format&w=1500)

Quick work, though we’re not quite done yet. For one thing, remember that I mentioned I was applying slightly different transforms to these components across breakpoints — overriding the `transform` property in a media query meant I needed to include that random rotation again, lest the new instance of `transform` undo my rotation altogether. Easy enough to fix:

``.sidenote {   transform: scale(0.925) rotate(random(-2.5deg, 2.5deg)); }  @media (min-width: 55rem) {   .sidenote {     /* Just using `transform: scale(1.1);` would override the rotation, so: */     transform: scale(1) rotate(random(-2.5deg, 2.5deg));   } }``

The result is that the baseline scale of my sidenotes changes while — notably — **each element maintains the same random rotation across breakpoints, rather than being recalculated**.

Of course, I’m using `transform` in my little timeline animation as well (in browsing contexts where `animation-timeline: view()` is supported, at least). By animating a `transform` that didn’t include that `rotate()` value, my rotation could be once again be undone, and my sidenotes summarily _de-jauntified_.

Just as easily fixed; I just needed to repeat the `rotate` transforms inside my `@keyframes` rule as well:

`.sidenote {   animation: movein ease-in-out;   animation-timeline: view();   /* … */   transform: scale(0.925) rotate(random(2.5deg, 2.5deg)); } @keyframes movein {   0%,   100% {     opacity: 0.5;     transform: scale(0.925) rotate(random(2.5deg, 2.5deg));   }   50% {     opacity: 0.9;     transform: scale(1) rotate(random(2.5deg, 2.5deg));   } }`

As before, no recalculation takes place in terms of each individual note’s rotation inside or outside of the animation window — the reason being, all these calls to `random()` share the same random **base value** (or **seed**) used to generate the rendered value.

The base value is the randomly generated number that provides the basis for calculating the value that results from the call to `random()`. When `random( 0px, 100px )` is called, a random seed between `0` and `1` is generated and used to perform the calculation of the resulting value - if the value of that seed is `.5`, the resulting value is `50px`. If the value of the seed ends up being `.25`, the resulting value is `25px`. Any two `random()` calculations based on the same seed will always give you the same end result.

The way I’m using `random()` in the snippet above, the rotation value that results from the first evaluated call to `random()` will be the value that results from the the other calls to `random()`, since they’re all able to share the same base value used to generate that rendered value. Once `random()` is called and a base value is generated, an identifier that represents that seed value is created — a **random cache key** that can be used anywhere that cache key is in **scope**. In the examples you’ve seen so far here, the cache key is leaning on the default scoping behavior: scoped to individual elements (each instance of `.sidenote`), the property name (`transform`), and the **index** of that call — the order in which `random()` was called within the value of that property.

That’s a lot on paper (and I found the concept of index scoping particularly tricky, I don’t mind admitting), but it _does_ make a lot more sense one we start putting some of this into practice. To start with, let’s step through some of the `random()` usage you’ve already seen in a little more detail:

`div {   transform: rotate(random(2.5deg, 2.5deg)); }  @media (min-width: 55rem) {   div {     transform: rotate(random(2.5deg, 2.5deg));   } }`

The first call to `random()` generates a random seed between 0–1, uses it to calculate a value between `-2.5deg` and `2.5deg`, and creates a cache key — an invisible identifier that represents the random seed. Here, that cache key will be **scoped to the first** `random()` **value in subsequent** `transform` **declarations that are applied to each individual element targeted by the selector**. Given these calls to `random()` using the same values, on the same element (any individual `div`), within the same property (`transform`), as the first call to `random()` in each declaration — that is, at the same _index_ — the random seed already available to that scope is used for the calculation, and the same rotation results. If our page contains two `div`s, they’ll both end up with different random values since the cache key is scoped to each individual element.

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch-discount-experiment.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=author-promo)

Given another element altogether, we leave the scope where that cache key applies — so a new random seed is created to perform that calculation and a new cache key is generated for that new scope:

`<div></div> <div></div> <p></p>`

`div {   transform: rotate(random(2.5deg, 2.5deg)); }  p {   transform: rotate(random(2.5deg, 2.5deg)); }  @media (min-width: 55rem) {   div {     transform: rotate(random(2.5deg, 2.5deg));   } }`

In this snippet three discrete cache keys are generated, each representing a different seed value, and each resulting in a different rendered value. One for _each_ `div`, scoped to the `transform` property and and first index (the first instance of `random()` in the declaration). For each individual `div` on the page, and given the same `transform` property, a call to `random()` at the same index uses the same seed — each `div` ends up with a different rotation value, and those values are maintained across breakpoints. Naturally, that cache key is _out_ of scope for the subsequent `p`, so a new value is calculated there.

Again, how `random()` works _mechanically_ might seem a little arcane, but the out-of-the-box behavior gives us predictable results with relatively little code, and “keep the scoping as tight as possible” is an inarguably sensible default for any addition to the web platform. For my part, leaning on defaults means my little sidenotes play out something to the tune of:

`:root {   --scale-down: 0.925;   --scale-up: 1; }  .sidenote {   align-self: flex-end;   animation: movein ease-in-out;   animation-timeline: view();   /* … */   transform: scale(var(--scale-down)) rotate(random(2.5deg, 2.5deg)); }  @media (min-width: 55rem) {   .sidenote {     /* … */     transform: scale(var(--scale-down)) rotate(random(2.5deg, 2.5deg));   } }  @keyframes movein {   0%,   100% {     opacity: 0.5;     transform: scale(var(--scale-down)) rotate(random(2.5deg, 2.5deg));   }   50% {     opacity: 0.9;     transform: scale(var(--scale-up)) rotate(random(2.5deg, 2.5deg));   } }`

That’s a _lot_ of repetition, I know, but remember that there’s no assumption of execution order in CSS — any one of these `random()` calls could be the one that defines their shared cache key.

Now, leaning on the default scoping behavior gets the job done for my little margin notes, but doesn’t mean we’re _stuck_ with the default scoping behavior. So far we’ve only been passing `random()` a minimum and maximum value, but that first argument can instead be used to _define_ a random key, with a specific identifier and specific scope — the second argument then defines the minimum value, and so on:

`.sidenote {   transform: rotate(random(--random-rotation auto, -5deg, 5deg, 1deg)); }`

Used this way, that first argument will allow you to specify two things. The first is a dashed identifier (prefixed with `--`) that will act as the cache key. The second is a keyword that dictates whether that value should be scoped to a property (`property-scoped`) or property _and_ index (`property-index-scoped`), to individual elements (`element-scoped`) or all matching elements identically, to individual elements _and_ property and position (`auto`, the default), or a fixed number (`fixed`) which you’d likely only use for debugging purposes. Once we’ve established a random key and a scope where it applies, we can reuse it in other instances of `random()` — an explicit means of saying “if a random seed is already available in this scope, use it.”

Mind the comma placement here, too — the dashed identifier and scope keyword make up _one_ argument. I may or may not have tripped over `rotate( random( --random-rotation, auto, 0px, 10px )` a few times myself.

Let’s walk through our scoping options one at a time:

## [`auto`](#auto)

In the example above, the `--random-rotation` identifier I specified just ends up serving as a human-readable representation of the cache key — by specifying `auto` for the scope, I’m still just leaning on the default per-element property and index scoping.

`:root {   --scale-down: 0.925;   --scale-up: 1; }  .sidenote {   align-self: flex-end;   animation: movein ease-in-out;   animation-timeline: view();   /* … */   transform: scale(var(--scale-down)) rotate(random(--sidenote-rotation auto, 2.5deg, 2.5deg)); }  @media (min-width: 55rem) {   .sidenote {     /* … */     transform: scale(var(--scale-down)) rotate(random(--sidenote-rotation auto, 2.5deg, 2.5deg));   } }  @keyframes movein {   0%,   100% {     opacity: 0.5;     transform: scale(var(--scale-down)) rotate(random(--sidenote-rotation auto, 2.5deg, 2.5deg));   }   50% {     opacity: 0.9;     transform: scale(var(--scale-up)) rotate(random(--sidenote-rotation auto, 2.5deg, 2.5deg));   } }`

It adds a little more noise to an isolated case like this one, but I certainly wouldn’t mind having a human-readable label for the availability of a given cache key if we assume a couple thousand lines of real-world CSS between these instances of `random()`.

[Advert![Mindful Design. Learn to design for real humans. Available now](https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp)](https://piccalil.li/mindful-design?utm_source=piccalilli&utm_medium=graphical-ad)

Again though, the addition of a manually-specified cache key doesn’t gain us anything over using a generated cache key apart from a human-readable label for what are expected to be shared `random()` results, and specifying `auto` will result in the same scoping rules. What specifying a cache key _does_ gain us is the ability to _change_ the scope where that key will be available:

## [`property-scoped`](#property-scoped)

The _invisibility_ of default/`auto` scoping has the potential for confusion once we start adding a little real-world complexity, particularly when it comes to the “index” part of the equation. Given the following, we might expect all these calls to make use of the same random key, same seed, and same rendered result:

`div {   margin-block: random(1rem, 5rem); }  @media (min-width: 55rem) {   div {     margin-block: random(1rem, 5rem) random(1rem, 5rem);   } }`

Here, we’re targeting the same element inside and outside the media query and we’re using the same property, but the cache key generated by the first call to `random()` is scoped to the _first_ random value of the `margin-block` declaration applied to each `div` — even though we might expect these declarations to give us the same rendered result, the declaration using the start and end shorthand will have an identical `margin-block-start`, but generate a _new_ random value for the `margin-block-end`. If we wanted these declarations to be functionally equivalent, we need something a little outside of the default scoping rules.

If we instead specify `property-scoped` to say that the random key should be scoped to _just_ the property — not the index — we can reuse that calculated value as both values in the `margin-block` shorthand:

`div {   margin-block: random(--random-margin property-scoped, 1rem, 5rem); }  @media (min-width: 55rem) {   div {     margin-block: random(--random-margin property-scoped, 1rem, 5rem) random(--random-margin property-scoped, 1rem, 5rem);   } }`

Now the same value will be used for all three values.

We don’t _have_ to specify an identifier for the cache key. The previous snippet is functionally identical to:

`div {   margin-block: random(property-scoped, 1rem, 5rem); }  /* … */  @media (min-width: 55rem) {   div {     margin-block: random(property-scoped, 1rem, 5rem) random(property-scoped, 1rem, 5rem);   } }`

Same result, but again: given a couple thousand lines of CSS between these statements, I’d just as soon know what random seed is meant to be associated with which declarations at-a-glance.

There’s a catch here, though: by explicitly specifying `property-scope`, we’ve broadened the scope to _only_ be limited by property — the cache key is no longer scoped to individual elements. Instead, _any_ matching elements will be able to share a single cache key. If we were to only specify `property-scope`, like so:

`.sidenote {   transform: rotate(random(--random-key property-scoped, -2.5deg, 2.5deg)); }`

The resulting value will be shared by all elements matching our selector, across all properties — a result comparable to:

`.sidenote {   transform: rotate(/* Pick a random number between -2.5deg and 2.5deg */); }`

Good news, though: we can control that too.

## [`element-scoped`](#element-scoped)

By _also_ adding `element-scoped` to this first argument, we can specify that the shared base value is scoped to individual elements _and_ scoped to property only, not index:

`.sidenote {   transform: rotate(random(--random-key element-scoped property-scoped, -2.5deg, 2.5deg); }`

But the same way specifying only `property-scoped` meant “_only_ scoped to property” and lost that individual-element scoping, we can broaden the scope to “individual elements, _any_ property, _any_ index” by specifying `element-scoped` alone:

`div {   margin-block: random(element-scoped, 1rem, 5rem); }  @media (min-width: 55rem) {   div {     margin: random(element-scoped, 1rem, 5rem) 2rem;   } }`

Here we’re saying that per-element is the only applicable scope for this cache key — instead of the default/`auto` behavior of being scoped to individual elements, property, and index, this cache key is _only_ scoped to individual elements. That means any instance of `random()` using these values in any property that applies to any `div` on the page can share the same random seed, and will result in the same value:

`div {   margin-block: random(element-scoped, 1rem, 5rem); }  @media (min-width: 55rem) {   div {     margin: random(element-scoped, 1rem, 5rem) 2rem;   }    div.by-class {     padding: random(element-scoped, 1rem, 5rem);   } }`

The resulting seed is scoped to each individual `div` in the rendered page, so all of these calls to `random()` will result in the same random value between `1em` and `5em` — but at higher breakpoints, any `div.by-class` will use that same value for `padding` as well.

## [Identifier Only](#identifier-only)

We can, in fact, go one step global-er. Specifying an identifier and omitting a specific scope for that identifier results in the broadest possible scope for a cache key: a random key not specific to property or index, _and_ not scoped to individual elements — a random seed scoped to **all elements and properties targeted by that styling**.

In this example, the same random seed will be used to calculate a random value that can be reused for any property and any index, but it won’t be recalculated from one `div` to another, either. Unless otherwise overridden elsewhere, the _same_ random value will be used across every `div` targeted by these selectors:

`.sidenote {   transform: scale(0.925) rotate(random(--random-key, -2.5deg, 2.5deg)); }`

The resulting value will be shared by all elements matching our selector, across all properties — a result comparable to:

`.sidenote {   transform: scale(0.925) rotate(/* A random value between -2.5deg and 2.5deg */); }`

But because we’re not scoping this to property or index, that means _all_ of these calls to `random()` will result in the same value:

`.sidenote {   margin-block-start: random(--random-key, 1rem, 5rem); }  @media (min-width: 30rem) {   .sidenote {     border: solid red;     border-width: random(--random-key, 1rem, 5rem) random(--random-key, 1rem, 5rem) 0 0;   } }  @media (min-width: 50rem) {   .sidenote {     font-size: random(--random-key, 1rem, 5rem);   } }`

Any property, any index — and because we’ve left the realm of `auto` or `element-scoped`, every `.sidenote` element will be rendered using the same random value for all of these properties, if and when they apply to the user’s browsing context.

## [`fixed`](#fixed)

There’s one more random key you can specify, and it’s a weird one. Remember back where I said “when `random( 0px, 100px )` is called, a random seed between `0` and `1` is generated to perform the calculation of the resulting value - how, given `random( 0px, 100px )` and a random seed of `.5`, the resulting value would be `50px`?” Well, the keyword `fixed` will allow you to specify a base value _manually_, using a number between zero and one — a hard-coded seed:

`.sidenote {   transform: rotate(random(fixed 0.5, -2.5deg, 2.5deg)); /* 0deg */   transform: rotate(random(fixed 0.5, 0deg, 20deg)); /* 10deg */   transform: rotate(random(fixed 0.25, 0deg, 100deg)); /* 25deg */ }`

As you might have guessed, `fixed` has a pretty specific use case: it gives you a quick way to try out some of the values that might result from a call to `random()` without needing to scratch out the entire line and replace it with a static value. You’d never use this in production.

Odds are, you’ll only reach for `fixed` when finessing the upper and lower bounds of a call to `random()` to see how a range of potential results would render — I certainly did, if only to try it out. Granted, trying a few different `fixed` values on for size was probably overkill for my purposes; realistically, a sense of how a whopping five (5) potential degrees of rotation will play across a few little side notes doesn’t require much more than a couple of page-reloads and a little imagination. Still, tinkering with those base values _does_ give you a little glimpse into the mechanics of how `random()` rolls the dice.

As for how those base values are _shared_ between calls to `random()`, well, that clearly requires a little more imagination.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch-discount-experiment.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=author-promo)