---
title: "CSS-Tricks, Version 20"
source: "https://css-tricks.com/css-tricks-version-20/"
publishedDate: "2026-11-09"
category: "css"
feedName: "css-tricks"
author: "Geoff Graham"
---

I’ve been bashing on updating this site’s design for the last couple of weeks. It’s high time things get a fresh coat of paint, right? The last version of CSS-Tricks was pushed _five years ago_. That’s ancient in web (and dog) years.

It’s not like the site has simply sat all that time. We pushed lots of changes and shipped new features, [particularly since 2024](https://css-tricks.com/thank-you-2024-edition/), but we never really got the paint brushes out of storage.

Now, before there’s a chorus of _“things don’t look thaaaat different”_ I want to say I’m rarely a fan of complete re-builds and tend to lean into iterative releases. And the new v20 theme is what I’d call an iterative rollup that’s worthy of a version bump.

Let’s go over the most notable updates to see why.

## Excavating Ghosts

First and foremost, some of the biggest changes are what you _don’t_ see. As you might imagine, this site has carried over plenty of pieces across 19 years. I decided to excavate the theme and definitely found some ghosts to bust.

For example, the global compiled JavaScript file retained some scripts that just weren’t being used anymore. Things like handling embedded versions of the newsletter from before we began self-hosting the posts. There were relics that catered specifically to the Flexbox Guide for handling toggles back before we had proper HTML `<details>`. There was a jQuery lazy-loader thing that is well-covered by WordPress core now. We had some scripts for serving third-party ads that are no longer needed now that we’re self-hosting ads. Things like that. The overall JavaScript was nicely trimmed from 151.6 KB (55.3 KB gzipped) to 133.8 KB (48.1 KB).

I also decided to formally retire the CSS-Tricks Forum. We put it in “archive mode” back in, like, 2018. None of those discussions are particularly valuable for today as they were over 10 years ago, so I deactivated the bbPress plugin that powered it and cleared out the database… and wow, that carved a whopping 400 MB from the ol’ database, not to mention it allowed me to drop several custom templates from the theme.

There were more ghosts busted along the way and, to be sure, there are still some lurking around. But it’s way less scary poking around the theme directory now, and further cleanup should be a lot easier from here on out.

## Modern Dev Tooling

Yeah, yeah, raise your hand if you’re still running Gulp. We are 🙋‍♂️. That’s not a bad thing in and of itself, but keeping it in a fixed state for all this time is not the greatest. I think we’re sporting a more modern workflow than before, even if there’s still room to grow. A smattering of the related commits:

-   Prettier enforced via husky + lint-staged pre-commit hook
-   Stylelint added for alphabetical CSS property order
-   GitHub Actions build check added
-   Cache-busting switched from rewriting source files to `filemtime()`

For years, I endured the same errors every time I fired up a new terminal. Those are gone and things run super cleanly, not to mention quickly. Very happy here.

## Security Pass

Oof, this is everyone’s favorite job, right?! Aside from being able to spot and fix a few unescaped custom field calls here and there, I decided to ask Claude to help me with a holistic audit. I prompted it to review recent WordPress security release notes and identify areas where the theme could be hardened to comply with what WordPress is doing.

_Whoa, you used AI?_ Yeah, I sure did. But for things like this where it could be my little gopher and allow me more time to do what I do best: front-end. I’m still able to make most of the patches myself based on the output recommendations, but it’s nice to have a gut-check for things where I’m clearly no expert, like security.

## Sass Rewrite

I still use and like Sass very much. I mean, yes, I would like to be straight-up vanilla CSS everywhere, but I can’t tear myself away from partials in particular.

The previous theme had a fairly nice “flat” structure — very few partial directories and most things all in the same top-level source. Totally cool. But an organization nut like me (you should see my house) has to have a place for everything to live. It ain’t perfect, but I’m happy with what I was able to put together without leveling the building in the process.

![](https://css-tricks.com/wp-content/uploads/2026/11/Screenshot-2026-11-04-at-3.35.39-PM.png)

There are some compromises. Like, `/header` should really be in `/layout`. The ordering is really important, though, and some of my ideals were simply not possible. I’m hoping to eventually work in some sort of Cascade Layers structure.

I’m pleased as punch to see the overall size of CSS drop in the process. It went from 180 KB (31.7 KB) to 169 KB (24.6 KB). Not hugely significant, but not _not_ significant either. I had to do a couple tricky things to cheat my way there, like serving all the form styles I’m about to talk about into a separate `forms.css` file and serving it just on pages where WooCommerce, Restrict Content Pro, and Gravity Forms are enqueued.

## A Sort-of Design System

Are you starting to notice a trend? We’re still talking about fairly invisible work. CSS-Tricks has so many nooks and crannies that it’s nearly impossible to make things perfectly consistent across the board. But because of those nooks and crannies, so many fixed values, magic numbers, one-off styles, and older utilities were hiding about. I decided to tackle a good chunk of that while reorganizing the Sass.

For example, there are now semantic design tokens that abstract away one-off colors. So many grays, let me tell you. Now there’s a maintainable palette that’s referenced throughout. Same with fonts, font styles, and font sizes. Same with paddings and margins. It feels a lot better to make a change at the “system” level with confidence that the change is taking effect everywhere it needs to.

But this is also where some clearly visible changes happened! Most notably, link styles are consistent all over the place with a small handful of intended and maintained variations. Not only is it more pleasing visually, but it improves accessibility throughout because the inherited styles default to proper visual cues that do not rely solely on color or opacity changes.

Oh, and my favorite piece of this? Forms and tables have both been redone. That’s tough to do in a WordPress theme where these components don’t always come from one source. For example, forms could come from any one of the Gravity Forms, WooCommerce, or Restrict Content Pro plugins, and they all have their own stylesheets. Resetting those allowed me to bring a certain level of harmony in all those instances.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-tables.webp)

Tables are a perfect example of how component styles line up throughout version 20.

## Theme Toggle

OK, something even more visual. This is the first time CSS-Tricks has had more than one color scheme! It certainly could have been done a long time ago, but I’d also argue that the design hasn’t really called for a light/dark toggle over the last 8 years or so. It’s a nice blend of both light and dark elements that marry the best of both worlds no matter your theme preference.

But I had to take a stab, right? The site has predominantly been dark despite the content being against a white background, so I treated things as though a “dark” mode already existed. The result is a creamy light theme that is largely just a change in background and component styles. And I used some of what I learned from [the recent “toggle” debate](https://css-tricks.com/dark-mode-toggles-two-states-are-enough/) to handle system, dark, and light themes with a single toggle.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-theme-toggle-1.webp)

What hasn’t changed is the main content container you see in things like articles. That was already white, even in a “dark” mode, and I’m not confident that simply toggling it between white and black is the best approach. Something on the radar for sure.

Oh, and it’s all wired up to a view transition that slides the new theme over the previous one.

## Jawbreaker Texture

I hope you think the site’s header and footer are cute. Yes, cute. That’s what I was going for when adding a colorful series of dots as the backdrop.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-header.webp)

Sorta like a subtle candy texture, right? Or a colorful group of stars? I dunno, but I’m calling it “Jawbreaker” for lack of a better term and because it reminds me of the jawbreaker candy I loved as a kid. Naming still sucks.

It’s all part of the same SVG. I really, really (_really_) wanted to `random()`\-ly position dots around, but that would have taken a lot of empty individual elements (e.g., `<i>`) in the markup. Not my favorite. So, I generate the `<circle>` elements in PHP:

```
<?php echo csstricks_jawbreaker_svg( array(
  'count'    => 90,
  'seed'     => mt_rand(),
  'size_min' => 2,
  'size_max' => 5,
) ); ?>
```

It’s a lot of SVG…

![](https://css-tricks.com/wp-content/uploads/2026/11/jawbreaker-texture.png)

I really, really wanted to `random()`\-ize all the things, but inlining random coordinates on each `<circle>` was the way to go. Same deal with the inlined styles that set a `fill`, and sizing for each circle in the texture, and variables that set a `--delay` and `--dur` on the subtle animation that twinkles them in and out.

I’ll have to look at generating the SVG using `<defs>` or whatever later since that pattern repeats in the footer, too.

That’s carried through to the 404 page as well:

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-404-scaled.png)

An updated play on what the 404 was like before, just not as a raster image.

## Blobs, blobs, blobs

If your browser supports `border-shape` and `random()` (only Chrome, I think), then the homepage gives you a blobby-blob shape behind the grid of author avatars. Hover it and it gets, you know, even blobbier.

It takes an existing pattern I’m calling `.gradient-card`:

```
.gradient-card {
  /* basic styles */
}
```

…and sets a gradient on the component’s `:before` pseudo:

```
.gradient-card {
  /* basic styles */

  &:before {
    content: "";
    background: linear-gradient(
      130deg,
      #ff7a18 0%,
      light-dark(#ff2d6b, #af002d) 41.07%,
      light-dark(#00bfae, #319197) 76.05%
    );
    border-radius: 12px;
    z-index: 1;
  }
}
```

That sits underneath the `:after` pseudo that’s translucent, allowing the `:before`‘s gradient to show through a smidge:

```
.gradient-card {
  /* basic styles */

  &:before {
    /* etc. */
  }

  &:after {
    content: "";
    background: light-dark(color-mix(in srgb, white 72%, transparent), #000);
    box-shadow: inset 0 2px 16px
      light-dark(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.6));
    border-radius: 8px;
    z-index: 2;
  }
```

The differing `border-radius` values allow `:before` to bleed outside, giving the impression of a border around the entire deal. That’s the basic shape. The `border-shape` is where things get blobby:

```
.gradient-card {
  /* etc. */

  &:before, &:after {
    border: 1px solid transparent;
    border-shape: var(--blob-shape-static);
    clip-path: var(--blob-shape-static);
    opacity: 0.5;
  }
}
```

Those variables? They’re mapped to `shape()`s. I grabbed the first one from [Temani Afif’s blob generator](https://css-generators.com/blob/):

```
--blob-shape-static: shape(
  from 50% 3%,
  curve to 65.86% 11.71% with 59.41% 2.7%,
  smooth to 72.37% 27.63%,
  smooth to 77.43% 38.64%,
  smooth to 88% 50%,
  smooth to 92.79% 67.72%,
  smooth to 81.37% 81.37%,
  /* etc.
);
```

It’s called “static” because that’s the default state. Hover or focus on the component and it swaps out those points out with a “hover” version of the shape:

```
--blob-shape-hover: shape(
  from 50% 3%,
  curve to var(--blob-point-1-x) var(--blob-point-1-y) with 59.41% 2.7%,
  smooth to 72.37% 27.63%,
  smooth to 77.43% 38.64%,
  smooth to var(--blob-point-4-x) var(--blob-point-4-y),
  smooth to 92.79% 67.72%,
  smooth to 81.37% 81.37%,
  smooth to var(--blob-point-7-x) var(--blob-point-7-y),
  smooth to 50% 79%,
  /* etc. */
);
```

Those variables? They’re mapped to `random()` values:

```
--blob-point-1-x: random(62.86%, 68.86%);
--blob-point-1-y: random(8.71%, 14.71%);
--blob-point-4-x: random(85%, 91%);
--blob-point-4-y: random(47%, 53%);
--blob-point-7-x: random(60.22%, 66.22%);
--blob-point-7-y: random(78.93%, 84.93%);
/* etc. */
```

So, the hover state is different on each page load. And we animate between the two:

```
&:hover,
&:focus-within {
  &:before,
  &:after {
    border-shape: var(--blob-shape-hover);
    clip-path: var(--blob-shape-hover);

    @media (prefers-reduced-motion: no-preference) {
      animation: scale-down 1.5s var(--ease-out-3) infinite alternate;
    }
  }
}
```

Fun!

## New Almanac Index

I’m pretty stoked on this one. The [Almanac](https://css-tricks.com/almanac) has grown, evolved, and just plain gotten _great_ the past few years. But the primary page for it… not so great. It was definitely overshadowed by work on the pages inside it and never revisited beyond clickable cards to get to each feature subset.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-19-almanac-scaled.png)

_Bo-ring!_

Now the page is a real index of the CSS features that gets you where you need to go quickly. Someone somewhere sometime did some sort of CSS periodic table. I forget where I’d seen that but the general idea sat with me and I thought I could pull it off. There’s nothing “tricky” about it but I love what the layout adds to the overall site.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-almanac.png)

## New Guides Index

This is another area that sorely needed love. Our guides have always been a vertical stack of items. The book effect was definitely cool, but I started believing that leaning on it as the main visual hook was holding things back from being more functional. With something like 27 guides, we’re talking about a lot of scrolling with no clear idea of what you’re going to see as you go.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-19-guides-scaled.png)

Again, nothing “tricky” but I like the overall usefulness of the new layout. There’s a featured guide, a widget of newly added and updated guides, and a categorized grid of everything below that.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-guides.jpg)

## Author Pages

The pages that show all of an author’s published articles got a little spruce-up, too.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-author-page-lee-meyer-1024x732.png)

It’s a little change, really. The right sidebar was moved to the left and the author image and bio moved in, allowing the articles to creep up to the top. I hope to do more here since the small layout tweak opens up more opportunities.

Also need to do the larger [Authors index](https://css-tricks.com/authors/), but another time.

## WordPress Admin Styles

This one’s just for those of us working in the WordPress editor. I don’t need a complete visual editor to get things done, but it is a nice affordance to have some of the front-end styles sneak into the editing UI for a better idea of what you’re working with.

![](https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-wp-editor-scaled.png)

Things like fonts and text styles now have minimal styling that reflects the front end.

## Comparing v19 to v20

Using Lighthouse to measure things like performance, accessibility, and best practices is [woefully fraught](https://www.smashingmagazine.com/2024/11/why-optimizing-lighthouse-score-not-enough-fast-website/) with [caveats](https://www.smashingmagazine.com/2024/06/how-hack-google-lighthouse-scores-2024/), but there’s no reason to chuck it completely. I find them more fun than fact and I don’t mind the recommendations for improving things.

So, after a few runs and tweaks, here’s how things shook out theme-to-theme.

### Lighthouse Scores

Category

v19

v20

Performance

71

72

Accessibility

86

91

Best Practices

75

100

SEO

92

90

I’m happy here. There are some things I just don’t have the control to fix when it comes to performance, so seeing v20 come in consistent with v19 is just fine by me. I’m happier with the boosts to accessibility and best practices. SEO? Meh. Don’t really care unless it’s hurting more important things like accessibility.

## Lighthouse Metrics

Metric

v19

v20

LCP

8.5s

7.2s

CLS

0.032

0

TBT

10ms

13ms

FCP

2.6s

2.5s

Speed Index

3.2s

3.5s

Time to Interactive

8.6s

4.0s

**Total page weight**

**2.03 MB**

**1.24 MB**

Again, very happy. There’s little I can do with time to first byte but everything else seems to clock in at least marginally better. The total page weight is a clear win and that’s probably what I care most about here.

## Is that all?!

Oh gosh, there’s a lot more but they’re mostly minor things that don’t bubble up to the front end. Sort of the same way browser changelogs have some generic line of “bug squashing” or whatever. In this case, it’s things like better post queries and breadcrumbs and function management and naming and… you get it.

There’s definitely so much more to do. And plenty of things I’m sure I missed or broke along the way. That’s just life and those will have to come in another iterative release less worthy of a version bump. You can let me know what I muffed up in the comments.

**I hope you at least like where this is going!**