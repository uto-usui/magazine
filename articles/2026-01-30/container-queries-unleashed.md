---
title: "Container Queries Unleashed"
source: "https://www.joshwcomeau.com/css/container-queries-unleashed/"
publishedDate: "2025-01-27"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

The most exciting thing about container queries, in my opinion, is that they expand what’s possible in terms of user interface design. They give us new options when it comes to responsive design, creating UIs that would be impractical or impossible using traditional media queries.

In this post, I’ll share the most useful pattern I’ve discovered, so that you can start taking full advantage of container queries in your own work.

## [Link to this heading](#the-killer-pattern-1)The killer pattern

There’s one pattern in particular that I find myself using over and over again. Let’s look at an example, from this blog:

[![Web copy of an email. The first column, taking up roughly one third of the available space, shows the “metadata” like the sender, the subject line, and the date. The second column, filling the remaining space, shows the body of an email](https://www.joshwcomeau.com/images/container-queries/deadmau5-email-layout-desktop-light.png)![Web copy of an email. The first column, taking up roughly one third of the available space, shows the “metadata” like the sender, the subject line, and the date. The second column, filling the remaining space, shows the body of an email](https://www.joshwcomeau.com/images/container-queries/deadmau5-email-layout-desktop-dark.png)](https://www.joshwcomeau.com/email/2024-07-13-deadmau5/)

This layout is used to display newsletter issues.

On desktop, it’s a two-column layout. The email metadata on the left, the content on the right. On mobile/tablet, it collapses to a single column:

[![Same email as before, except on a narrower screen. The layout shifts to a single column, with the metadata stacked above the main content.](https://www.joshwcomeau.com/images/container-queries/deadmau5-email-layout-tablet-light.png)![Same email as before, except on a narrower screen. The layout shifts to a single column, with the metadata stacked above the main content.](https://www.joshwcomeau.com/images/container-queries/deadmau5-email-layout-tablet-dark.png)](https://www.joshwcomeau.com/email/2024-07-13-deadmau5/)

This is a pretty common design pattern, and it’s easily solved using media queries, but it leads to a curious side-effect: the width of each column actually _increases_ when the viewport shrinks below the mobile threshold.

Keep your eye on the width of the left-hand column as you shrink the (virtual) window, using the slider:

Window Width:

When we reach the mobile threshold, our two-column layout becomes a one-column layout, which means the _metadata_ column actually gets bigger, expanding to fill the entire width of its container.

**Now, here’s where it gets tricky.** I have two different layouts for the _metadata_ column, depending on the available space:

Layout Type:

Some thoughts about passion…

From

Josh W. Comeau

Reply-To

support@joshwcomeau.com

Sent

December 29, 2025

When there’s enough room, I want to show the key/value pairs in a single row. Otherwise, the values should move to a new line.

**But we want to do this based on the _container’s_ size, not the viewport’s size!** There isn’t a clear linear relationship between the two.

Here’s the ideal behaviour. Notice how the _metadata_ layout changes back-and-forth as the window changes size:

Window Width:

We’re using media queries to control the “top-level” layout, flipping from two columns to one column, but we can’t really use media queries to describe how the stuff _within_ those columns should respond dynamically.

Or, well, technically we _can_, but it’s messy and fragile. We _could_ do something like this:

```
.metadata-column {
  /* Condensed styles here */

  @media (min-width: 35rem) and (max-width: 42rem),
         (min-width: 60rem) {
    /* Sparse styles here */
  }
}
```

This approach combines multiple media conditions using a comma, which acts like an OR operator. We apply the “Sparse” styles if our viewport is between 35rem to 42rem, or at least 60rem.

**But where did these numbers come from?** 35rem, 42rem, and 60rem aren’t breakpoints in our design system, they’re magic numbers. They’re the arbitrary values that _happen_ to work given the current layout. When I’ve gone with this approach in the past, I’ve literally measured the width of the viewport at the points where I wanted it to flip.

_This is extremely fragile._ It’ll work as long as none of the styles change, but even minor tweaks like adjusting the padding on one of the columns can cause problems.

It’s easy to imagine another developer coming along in a few months and tweaking, say, the `gap` between the columns. All of a sudden, our calculated values are wrong, and the content starts to overflow near those arbitrary breakpoints. The developer probably won’t even notice, since the issue only happens at a narrow range of viewport widths, but some of our users will definitely notice!

**Check out how much nicer the solution is with container queries:**

```
<style>
  .metadata-column {
    container-type: inline-size;
  }

  .metadata {
    /* Condensed styles here */

    @container (min-width: 19rem) {
      /* Sparse styles here */
    }
  }
</style>

<div class="metadata-column">
  <div class="metadata">
    <!-- Stuff here -->
  </div>
</div>
```

As we cover in [“A Friendly Introduction to Container Queries”](https://www.joshwcomeau.com/css/container-queries-introduction/), the `@container` at-rule works just like `@media`, except it uses the size of a defined container element. We specify which element should act as the container with the new `container-type` property.

Instead of 3 arbitrary numbers, we have 1 _intentional_ number; 19rem, in this example, is the actual size that we’ve chosen for the flip, because the “sparse” layout would feel too cramped below that threshold.

## [Link to this heading](#named-containers-2)Named containers

Containers are defined using the `container-type` CSS property. This is how we create the boxes that our container queries will measure.

One of the lesser-known features of this API is that we can _choose which container to use_, if multiple ancestors establish themselves as containers.

By default, the nearest ancestor will be used. Try to resize the “RESULT” pane below by dragging the middle divider (or focusing and using left/right arrow keys):

Code Playground

Code editor:

Result

The setup here is that our `.child` element has two container ancestors, its parent `<section>` and grandparent `<main>`. By default, the nearest ancestor will be used, and indeed, we can see that the element’s parent `<section>` is currently being used.

We can manually select a _different_ container, though! Check this out:

Code Playground

Code editor:

Result

When we define our container query with `@container`, we can optionally specify a `container-name`, which allows us to override the default behaviour and specify a different container!

We can simplify our code a bit by using the `container` shorthand property:

```
main {
  container: outer / inline-size;

  /* Equivalent to: */
  container-name: outer;
  container-type: inline-size;
}
```

The slash character (`/`) is a modern convention in CSS as a way to separate groups of values. It has nothing to do with division.

## [Link to this heading](#the-dawn-of-a-new-era-3)The dawn of a new era

So, I’ve been using container queries in my own work for a few months now, and it still feels to me like we’re just scratching the surface of what’s possible. ✨

In this blog post, we explored the killer use case I’ve discovered so far: creating sub-layouts _within_ our media queries that expand as the viewport shrinks. I’ve used this trick all over this blog, from the [Gradient Generator](https://www.joshwcomeau.com/gradient-generator/) to my [About page](https://www.joshwcomeau.com/about-josh/):

[![A grid full of squares that each contain nested elements, like an illustrated cat head or a phonetically-spelled name](https://www.joshwcomeau.com/images/container-queries/about-grid.png)![A grid full of squares that each contain nested elements, like an illustrated cat head or a phonetically-spelled name](https://www.joshwcomeau.com/images/container-queries/about-grid-dark.png)](https://www.joshwcomeau.com/about-josh/)

As the viewport size changes, these cards grow and shrink. Many of them respond dynamically to their own size!

I’ve also seen other developers discover the same pattern; Ahmad Shadeed uses it for adjusting the caption on “feature images”, and has a [wonderful blog post(opens in new tab)](https://ishadeed.com/article/modern-css-feature-image/) on the subject:

Once you start using this pattern, you’ll see opportunities for it everywhere. 😄

And this is just the tip of the iceberg. The ability to select _which_ container is used could unlock some really interesting possibilities, allowing us to create multi-layered UIs, layouts within layouts.

Whether anyone will be clever enough to use this stuff to its full potential remains to be seen, but it makes me excited for the future of web UIs!

I’m going to continue experimenting with container queries, and I’d encourage you to as well. Browser engineers have given us some incredible new tech, and now it’s up to us to show them that their time was well spent. 😄

### Last updated on

January 27th, 2025