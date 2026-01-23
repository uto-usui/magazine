---
title: "Masonry Layout is Now grid-lanes"
source: "https://css-tricks.com/masonry-layout-is-now-grid-lanes/"
publishedDate: "2025-12-19"
category: "css"
feedName: "css-tricks"
author: "Sunkanmi Fafowora"
---

We’ve talked a lot about Masonry layout here on CSS-Tricks, so there’s no need to remind you of the two-sided discussions about [how to approach it](https://css-tricks.com/csswg-minutes-telecon-2024-12-04-just-use-grid-vs-display-masonry/), the idea of using it [as a new unifying layout concept](https://css-tricks.com/masonry-watching-a-css-feature-evolve/), or [alternative approaches for making it work today](https://css-tricks.com/making-a-masonry-layout-that-works-today/).

Here’s what you do need to know: it’s going to be **`display: grid-lanes`**.

![A series of tall images arranged in five columns.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/pinterest-layout_y8vjhk.png?resize=1913%2C1463)

The earliest talks concerning masonry began in 2017 when [Rachel Andrew expressed some concerns about how to make a Pinterest masonry layout](https://github.com/w3c/csswg-drafts/issues/945). Rachel said it felt like the right approach should be a flexbox kind of thing, but this wasn’t fully achievable with flexbox, as items would rather flow from top-to-bottom rather than across each row:

> Currently the closest you can get with CSS to this type of layout is to use `multi-col` however, the items then flow top to bottom rather than across the rows.
> 
> This feels more like a behaviour of flexbox than grid, as the solution is very much based on the size of the items. Opening this in order to record the feature request/use case for future discussion.

And so, the talks surrounding masonry layout in CSS began within the W3C. In that same GitHub thread, you’ll read that [Tab Atkins-Bittner](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-274621588) shared a “hacky” way to go about it with CSS Grid.

> You can have Grid do Masonry if you know the heights of the items ahead of time. It’s a bit hacky, but you set the grid container to `grid: auto-flow dense 1px / <column widths here>;`, then set each item to grid-row: span `<pixel height as integer>;` (for example, if the item is 50px tall, use `grid-row: span 50;`).

I’m a sucker for clever CSS hacks, but you know what else I’m a sucker for? A working CSS solution that makes it easier for beginners to use. And no, unfortunately, we cannot use `grid-template-rows` or `grid-template-columns`, as [Nate Green suggested](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-311091451) in the same thread:

```
.figure-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: flow;
}
```

[Atkins-Bittner replied](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-319921105):

> There’s no “simple” way to adapt Grid into Masonry – anything would involve non-trivial edits to the layout algorithm. Packery, in particular, really needs things to have a defined width.

Okay, that’s fine. I’m sure you’d be thinking as well, “why not create a new `display` property for it?” Well, [Rachel added](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-319994626) that:

> The thing is we can’t create a brand new value of display for every distinct design pattern.

Mind you, all these discussions were happening as far back as 2017, meaning masonry has been an elusive goal for quite some time.

Just to make sure you’re with me, this is an example image of the kind of layout masonry looks like (thanks to [Michael Richins for this](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-321411718)):

![A series of nine green boxes arranged in three columns, each box with a large black number labeling their order in the layout.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/s_784A261A980C64638433C95E78563C3270A2142F061161C1BD041DE68CD7E0D4_1763637710599_29148470-cf9b8db2-7d2a-11e7-81f7-3a146d594b8f.png?resize=800%2C800)

One thing I would like is that prior to the announcement of masonry display type, there were solutions/hacks discussed, [like this one from Andy Barefoot](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-334962477), but nothing truly was decided as the main go-to feature for CSS masonry. Hey, there was even a super cool [Masonry library](https://masonry.desandro.com/) from [David DeSandro](https://github.com/desandro), and he gave [pretty useful advice to W3C](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-432658269) and browser vendors when writing the spec and implementing the masonry layout, like on how loading images would work, multi-column spanning items, filling gaps, retaining horizontal order.

Check out the [Masonry.js docs](https://masonry.desandro.com/) for more information about the object options.

This thread helped, **but it still didn’t lead to a conclusive statement** about what the masonry syntax will look like. In fact, we had code suggestions, like from [Dan Tonon](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-334448407):

```
.flex-container {
  display: flex;
  flex-direction: column;
  flex-block-count: 2; 
  flex-block-flow: cross; 
}
```

This introduces two new flexbox properties called `flex-block-count` and `flex-block-flow` which allows us to control items similarly (with `column-count`) and control the flow of items, respectively. However, this wouldn’t fly as [Michael Richins pointed out](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-334483625):

> This will still not work for children of different height…

This thread was not going anywhere, so discussions ended in April 2020 with a GitHub user with the name [Nic787 referencing and agreeing with an earlier](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-611247371) [_probable_](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-611247371) [solution](https://github.com/w3c/csswg-drafts/issues/945#issuecomment-611247371) for masonry using `float` instead of grid.

> I think you have a good point. Currently, float is becoming old and flexbox allow a lot of things to be done, but this masonry layout is lacking in both.
> 
> … Sometimes you can have lot of small images in a row, so making it left to right can’t work all the time. Masonry is left to right like always, but in a way it’s easier for the user to access informations.

[Fortunately, discussions still continued in many threads,](https://github.com/w3c/csswg-drafts/issues?q=is%3Aissue%20state%3Aopen%20sort%3Acreated-asc%20masonry) and the requests for the masonry display property flooded W3C. Another notable GitHub thread that surfaced on the masonry debate is, well, the [Masonry Syntax Debate](https://github.com/w3c/csswg-drafts/issues/11243) in November 2024, but that also didn’t lead to much _[at that point](https://github.com/w3c/csswg-drafts/issues/11243#issuecomment-2518124401)_. In fact, [Jen Simmons noted in the meeting](https://github.com/w3c/csswg-drafts/issues/11243#issuecomment-2518124401) that:

> Personally disappointed that we’re not making more progress. We’ve been having this argument for 5 years.

Five years of back and forth on how exactly the naming and structure would be. Do we use grid? Do we use a brand new property? Do we create separate properties just for masonry? We couldn’t really decide on that.

One thing I like to get behind is a comment from our very own [Juan Diego](https://css-tricks.com/author/monknow/), stating how [solutions aren’t “just use grid” or create a new property](https://github.com/w3c/csswg-drafts/issues/11243#issuecomment-2524100674), but that we could get rid of the `grid-` prefix altogether and settle for an option that caters for both `grid` and `masonry`:

> …it should be possible to use a new unprefixed `template-areas` property for masonry and grid, regardless of the formatting context..

Fortunately, something good came out of that thread because [another meeting](https://github.com/w3c/csswg-drafts/issues/11243#issuecomment-2627998471) was held on January 31st of 2025, and guess what? It was resolved to reuse grid templating and placement properties for masonry layout.

> The CSS Working Group just discussed `[css-grid-3][masonry] Masonry Syntax Debate`, and agreed to the following: RESOLVED: Re-use grid templating and placement properties for masonry layout.

Wait. Why am I announcing about masonry syntax properties? What about the main syntax itself? Isn’t that why we’re here? Awesome, you’re still with me. So let me show you the exact thread where the masonry syntax war ended.

### It’s (almost) here!

This brings us to the [latest announcement](https://github.com/w3c/csswg-drafts/issues/12022#issuecomment-3525043825) that setting `grid-lanes` on the `display` property activates a masonry layout.

```
.masonry {
  display: grid-lanes;
}
```

It was tough to get here. Deciding on the keyword alone took _years_. Just [look at all of the names](https://github.com/w3c/csswg-drafts/issues/12022#issue-2956927327) that were considered leading up to `grid-lanes`:

-   `collapsed-grid` or `grid collapse`
-   `grid-stack` or `stacked-grid`
-   `grid-pack` or `packed-grid` or `grid pack`
-   `compact-grid` or `compact grid`
-   `grid-masonry` or `masonry-grid`
-   `grid-flex` or `flex-grid`
-   `grid single-axis` (masonry grid) vs. `grid dual-axis` (normal grid)
-   `grid stack` (masonry grid) vs. `grid grid` (normal grid)
-   `staggered-grid` or `grid staggered`
-   `uneven-grid`
-   `semi-grid`
-   `lane-grid` or `grid-lanes`
-   `axial-grid`

I wouldn’t have minded `staggered-grid` since that’s what it is in React Native. In fact, [Kevin Powell](https://css-tricks.com/author/kevinpowell/) [agreed](https://github.com/w3c/csswg-drafts/issues/12022#issuecomment-3334326242). That said, I am perfectly okay with `grid-lanes`. It will take some time for browsers to implement it, as discussions surrounding the [shorthand adjustments for masonry are still going on](https://github.com/w3c/csswg-drafts/issues/12023), with nothing much said on the issue just yet.

### What about Item Flow?

Oh yeah, [remember that](https://css-tricks.com/quick-hit-42/)? It’s [still in the works](https://github.com/w3c/csswg-drafts/issues/11243#issuecomment-2584991716), and I expect that we’ll see it after a proper `grid-lanes` implementation starts making the rounds. [There’s a nice hypothetical example from Fantasai](https://github.com/w3c/csswg-drafts/issues/11243#issuecomment-2584991716) illustrating how it might look if added to the spec today:

```
item-flow: <item-direction> || <item-wrap> || <item-pack> || <item-slack>

/* shorthand for */
item-direction: row | column | row-reverse | column-reverse
item-wrap: wrap | wrap-reverse
item-pack: normal | dense || collapse
item-slack: <length-percentage>
```

In use, it would look something along the lines of:

```
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  item-flow: collapse; /* == item-flow: row collapse 1em; */
  gap: 1rem;
}
```

### So, what’s next?

After many back-and-forths, masonry `grid-lanes` is here! But where exactly?

Well, this is the awkward part. The truth is we’ll still have to wait for browsers to implement `grid-lanes`. How long may it take? I really can’t say, but take into consideration that all major browsers already have implemented some type of masonry layout behind flags or previews, but with different syntaxes:

-   The Chrome and Edge teams initially [implemented Masonry](https://developer.chrome.com/blog/masonry-update#test-css-masonry) in Chromium 140 as `display: masonry` but are already working on switching to `grid-lanes`. Some of [their demos](https://github.com/MicrosoftEdge/Demos/tree/main/css-masonry) already reflect it.
-   The WebKit team [implemented masonry](https://webkit.org/blog/16026/css-masonry-syntax/#the-remaining-debate-over-syntax) in Safari 17 as `display: grid`, but they [already seem to have some work](https://bugs.webkit.org/show_bug.cgi?id=302618) on `grid-lanes` in the pipelines.
-   The Mozilla team was actually the first browser to implement masonry layout in 2020 — using `display: grid` as well. But like the others, [they’re already in the process](https://bugzilla.mozilla.org/show_bug.cgi?id=2002087) of making the switch to `grid-lanes`.

So, good news all around! All that’s left is to wait. If you want to track `grid-lanes` progress, here is a good [link pool for each browser](https://patrickbrosset.com/lab/css-masonry-resources/) from Patrick Brosset. And, if you can’t wait for the official masonry implementation, [Zell Liew has an approach](https://css-tricks.com/making-a-masonry-layout-that-works-today/) for using it today, with minimal JavaScript.