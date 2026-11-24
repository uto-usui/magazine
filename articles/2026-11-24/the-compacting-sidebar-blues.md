---
title: "The Compacting Sidebar Blues"
source: "https://blog.master.dev/the-compacting-sidebar-blues/"
publishedDate: "2026-11-24"
category: "css"
feedName: "Frontend Masters Blog"
author: "Chris Coyier"
---

I think it’s reasonable to have an application sidebar like this:

![Sidebar navigation menu with icons and labels for Home, Search, Projects, Messages, Calendar, Team, Reports, and Settings](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-22-at-11.58.37-AM.png?resize=953%2C1024&quality=80&ssl=1)

But you never know what the details are of a screen showing your web app. What if the screen is squat enough that all these nav items don’t fit?

![Sidebar navigation menu showing Home, Search, Projects, Messages, Calendar, and a people icon.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-22-at-12.00.22-PM.png?resize=1024%2C624&quality=80&ssl=1)

Aw. That kinda sucks. It’s not an unusable disaster, but scrolling internal elements for something as important as app navigation is pretty rough.

Maybe we could yank the labels?

![Vertical sidebar navigation menu with home, search, folder, messages, calendar, users, analytics, and settings icons](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-22-at-12.02.10-PM.png?resize=1024%2C634&quality=80&ssl=1)

Maybe you hate that? It’s not as clear as text, but I think it’s a tenable choice as a first breakpoint. And of course, you’ll have a proper `aria-label`, or the text label is merely kicked off the screen, not literally `display: none;`, so the label stays accessible.

Let’s say we’re going to do it.

How do you know _when_ to break into this state?

## The Cursed Approach: Adjust Styling When a Scrollbar Appears

This is what my brain _wants_ to do. If the sidebar content is too big that it triggers a scrollbar, then apply styles that do some compacting.

There is a sucky logical flaw in this, though. If you apply styles that do some compacting, then the sidebar content doesn’t scroll anymore, and if it doesn’t scroll anymore, the styles reapply that grow the size, creating a ridiculous, janky, infinite loop.

See what happens in Chrome:

Let’s look at the code that causes that.

`/* If we're in a browser that does scroll-state queries... */ @supports (container-type: scroll-state) {    /* The "inside" of the sidebar doesn't      have a fixed height, so it will only      scroll when it needs to based on the      parent sidebar height. We make it a       scroll-state container to check that */   .sidebar-inside {     container-name: sidebar;     container-type: scroll-state;          /* If scrolling, we yank the text        labels, shrinking the height */     @container sidebar scroll-state(scrollable: y) {       .nav-label {         position: absolute;         width: 1px;         height: 1px;         overflow: hidden;         clip-path: inset(50%);         white-space: nowrap;       }     }   } }`Code language: CSS (css)

That’s all it is really, and it triggers the infinite loop of doom.

Infinite loops aren’t new to CSS. A really early demo I made at CSS-Tricks was for [CSS-Jitter Man!](https://css-tricks.com/examples/CSS-Jitter/) Where the `:hover` state of an image was _smaller_ than the regular state. So as you hovered over it, it would shrink, then you weren’t hovering over it anymore, so it expanded, and so on.

## A Solution: Only Slightly Magic Numbers

A full-blown magic-number approach would just be to fully wing it. Do a quick screen measurement of how tall the sidebar’s content is, and write a query around that number.

`.sidebar {   ...    height: 100svb;   container-name: sidebar-height;   container-type: size; }  @container sidebar-height (height < 500px) {   .nav-label {     position: absolute;     width: 1px;     height: 1px;     overflow: hidden;     clip-path: inset(50%);     white-space: nowrap;   } }`Code language: CSS (css)

_Perfect_, right?

I mean, it’s not bad for now. But that’s how magic numbers lure you in. They work under certain circumstances but are fragile.

-   What if the number of nav items changes?
-   What if the type renders differently across systems, is intentionally changed, or is changed by a user?
-   What if the gap changes or the icons change dimensions?

The exact breakpoint height won’t be right anymore.

## De-Magic-Ifying

The 500px magic number I got was just a ⌘-Shift-4 on my Mac and dragging over the area to measure the pixel height.

Instead, we could get decently far by doing a bit of math instead.

-   There is 8px on the top and bottom of the sidebar
-   Each nav item has 8px on the top and bottom of it
-   There is no gap between them
-   Each icon is 23px tall
-   There is 6px of gap between the text and the icon
-   The text is 14px tall\*

That last one is the only one that is still \*magic. That’s not set in CSS, and it shouldn’t be; it’s just how big it renders under unaltered circumstances.

Still, with just one bit of magic, our math can be a lot closer to reality.

`--navItemHeight: calc(   (     8px      + 8px     + 23px     + 6px     + 14px    )    * sibling-count()   + 8px   + 8px );`Code language: CSS (css)

I just did that as a CSS custom property, but (SAD TROMBONE), we can’t actually use a custom property in a media (or container) query.

`/* NOPE. Too bad suckeroo. */ @container sidebar-height (height < var(--navItemHeight)) { }`Code language: CSS (css)

I guess the reason we can’t do this is that `var()` is resolved on an element basis, and a query like above doesn’t really have an element to resolve against. It would be incredibly useful if there were a way to do this. Although I wonder if this very blog post might be making the point why we can’t. Like, what if changing the custom property made the media query hit, which changed the custom property, which made the media query stop hitting, etc.? An infinite loop at that level seems pretty bad.

I don’t even think `@custom-media` is going to help us when/if that ever ships.

We’re so close! If only there were a way!!!

## A Solution With Style Queries

There is a way, chat.

First, let’s calculate the size of everything in that sidebar programmatically after all:

`--limit: calc(   (     var(--spacing) * 2     + var(--icon-size)     + var(--text-gap)     + 14px   )   * sibling-count()    + var(--spacing) * 2 );`Code language: CSS (css)

We gotta make sure to register the properties we’re going to use at the top of the CSS as well!

`@property --sidebar-h { syntax: "<length>"; inherits: true; initial-value: 0px; } @property --limit     { syntax: "<length>"; inherits: true; initial-value: 0px; }`Code language: CSS (css)

That looks complex, but it’s just adding up the little details that make up a navigation item, plus the container’s padding. Crucially, it’s multiplying the math by how many actual nav items there are with `sibling-count()`, which is super cool. But careful! Tossing a little `<hr />` or something like that in there will throw off the math.

![Accessibility inspector highlighting the Calendar navigation link with calendar icon in a sidebar.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-23-at-3.39.24-PM.png?resize=662%2C796&quality=80&ssl=1)

We’ve still got that `14px` magic number, which I don’t love, but that’s pretty minor overall. I tried flipping it out for like `0.6lh`, but that’s just another magic number really. We could also set the font in a `px` value and multiply by a known `line-height`, but eh, I’m trying to illustrate the point that measuring the height of text is dicey territory.

The real magic here happens with a _style_ query, which does let us use and compare CSS custom properties. So let’s measure the height of the guts of the sidebar and set that `--limit` on each of the nav items.

`.sidebar-inside {   --sidebar-h: 100cqh;    ... }  .nav-item {    --limit: /* see above */;   container-name: nav-item;    ... }`Code language: CSS (css)

Now we can use a style query to compare!

`@container nav-item style(--sidebar-h < --limit) {    /* Hide the label if the sidebar is too squat. */   .nav-label {     position: absolute;     width: 1px;     height: 1px;     overflow: hidden;     clip-path: inset(50%);     white-space: nowrap;   } }`Code language: CSS (css)

Yes!!! I just think that’s so cool. This avoids the infinite-loop problem because the limit is calculated from non-changing constants.

### Demo

You should be able to (on a device with a pointer) grab the lower right corner and resize the area to see the style query hit.

Note that this should work in Chrome (142+) and Firefox (154+), but not yet in Safari, as Safari needs support for the range syntax in style queries to land. Safari just keeps the labels, though, so it’s not a disaster.

CSS is cool.