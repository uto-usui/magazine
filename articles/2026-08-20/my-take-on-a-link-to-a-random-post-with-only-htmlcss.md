---
title: "My take on a link to a random post with only HTML/CSS"
source: "https://kilianvalkhof.com/2026/css-html/my-take-on-a-link-to-a-random-post-with-only-html-css/"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Kilian Valkhof"
author: "Kilian Valkhof"
---

## My take on a link to a random post with only HTML/CSS

[CSS & HTML](https://kilianvalkhof.com/category/css-html/), 19 August 2026, 3 minute read

Chris Coyier recently posted about creating a “random post” link on a site that would link to a different URL using only HTML/CSS: [A Button That Links to a Random Post in HTML & CSS Only](https://master.dev/blog/a-button-that-links-to-a-random-post-in-html-css-only/) . Here’s my take on that.

I saw that article and it reminded me of [one of the random() examples I made](https://polypane.app/blog/experimenting-with-the-new-pure-css-random-function/#designing-a-poem-with-random-item), a poem where I toggle between discrete values using `if()`. So I shot off this post but as I was about to go on holiday, I left it at that:

> This article is pretty fun. I'd solve it with a bunch of stacked links, then have a registered custom property that uses random() to set an int between 0 and number-of-links, then use that in an if() function to display:block one link (matching the randomly chosen int)
> 
> master.dev/blog/a-butto…
> 
> [\[image or embed\]](https://bsky.app/profile/did:plc:z6uec3g7xgkvxpy442663waq/post/3mrulg67s4c22?ref_src=embed)
> 
> — Kilian Valkhof ([@kilianvalkhof.com](https://bsky.app/profile/did:plc:z6uec3g7xgkvxpy442663waq?ref_src=embed)) [July 30, 2026 at 3:49 PM](https://bsky.app/profile/did:plc:z6uec3g7xgkvxpy442663waq/post/3mrulg67s4c22?ref_src=embed)

Well, I’m back now and I figured I’d do something with this blog again and show you my implementation! It is very similar to the poem example I mentioned earlier, but uses `sibling-index()` and `sibling-count()` as the inputs for determining which link to show.

Here’s a Codepen (no fallback for browsers without support, go open this page in [Polypane](https://polypane.app/))

### More details on the implementation [#](#more-details-on-the-implementation)

For the HTML, it’s just a bunch of links directly in the body tag. As long as they’re all siblings we’re good. Contrary to my post, if we just hide all but one link we don’t really need them all to be stacked in one grid-area, so I decided to skip that part for clarity.

The full CSS is pretty small:

```
@property --discrete-number {
  syntax: "";
  inherits: true;
  initial-value: 0;
}

a {
  --discrete-number: random(--link, 1, sibling-count(), 1);
  display: if(
    style(--discrete-number: sibling-index()): block; 
    else: none;
  );
}
```

There’s really three pertinent details to my implementation:

#### An integer-cast random value [#](#an-integer-cast-random-value)

I register a custom property as an integer so that I can use it to compare to other integers:

```
@property --discrete-number {
  syntax: "";
  inherits: true;
  initial-value: 0;
}
```

Without this, the type of the random number and sibling-count() are different, and the comparison never returns true.

#### Getting a random number between 1 and the total number of links [#](#getting-a-random-number-between-1-and-the-total-number-of-links)

I declare the `--discrete-number` value on the `<a>` itself, and use a custom ident (`--link`) so that we get a single value shared across all the elements:

```
a {
  --discrete-number: random(--link, 1, sibling-count(), 1);
}
```

1 is the minimum value, sibling-count() is the maximum value, and the last 1 is the step size, so that we only get round numbers (cast to integer). This means that on every page refresh, `--discrete-number` is a value between 1 and the total number of links.

#### Using the random number to show and hide [#](#using-the-random-number-to-show-and-hide)

Lastly, I use an `if()` function to compare the `--discrete-number` to the current `sibling-count()`. If it matches, we show the element and if not, we hide it.

```
a {
  display: if(
    style(--discrete-number: sibling-index()): block; 
    else: none;
  );
}
```

Since the value of `--discrete-number` is the same for all links, and there’s only ever one element that has a matching sibling-index, we end up with a single randomly chosen visible link that’s different on each page refresh.

If you want to learn more about `random()` in CSS, check out my deep dive over on the Polypane blog: [Experimenting with the new pure CSS Random function](https://polypane.app/blog/experimenting-with-the-new-pure-css-random-function/).