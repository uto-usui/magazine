---
title: "Personal website redesign project post: Wrapping up the planning"
source: "https://piccalil.li/projects/personal-site/3/?ref=main-rss-feed"
publishedDate: "2026-02-26"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

As promised in the [last one](https://piccalil.li/projects/personal-site/2), we’ll wrap up planning today. This stuff is the more fun to do though!

## [The tools](#the-tools)

I know it’s what you want to see, so let’s get into what I’m using for this project.

### Planning and organising

-   **[Obsidian](https://obsidian.md/)** for tracking what needs to be done, lists and notes
-   **[tldraw](https://www.tldraw.com/);** for sketching/mapping

### Design

-   **[Affinity](https://www.affinity.studio/)** for vectors and photoshop-like work
-   **[Penpot](https://penpot.app/)** for UI design
-   **HTML, CSS and web components** for prototyping

### Website system

-   **Navi** for the pattern library/design system (this is our internal software that we use in [the studio](https://set.studio/))
-   **[Astro](https://astro.build/)** for the front-end framework
-   **[sugarcube](https://sugarcube.sh/)** for CSS utilities and converting design tokens to custom properties
-   **HTML, CSS and web components**: to make everything look good and work nicely

## [Existing page audit](#existing-page-audit)

The aim of the game here is to surface the current pages landscape.

![A Penpot file that has every page type from my existing site mapped out next to each other in labelled sections](https://piccalil.b-cdn.net/images/projects/penpot-page-audit.jpg?auto=format&w=1500)

I like to do this process for the following reasons:

1.  I like to be able to draw all over it in a sketch up plan (which I cover in [Complete CSS](https://piccalil.li/complete-css?utm_medium=author-promo) FYI) to help me work out what patterns I need to account for
2.  It’s a useful method of seeing the scale of the design job I’ve got ahead of me
3.  I can keep referring back to this audit to make sure I’ve either got a pattern covered, or I’ve removed the need for it all together

[Advert![Save 20% on all courses using the code NEXTLEVEL.](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Map out data sources and their URL segments](#map-out-data-sources-and-their-url-segments)

I like to do this with a pen/stylus when I’m doing a project on my own, but for a client project, we’d usually use Figma/Penpot because expecting other people to read my handwriting is asking too much (as you will see).

I did this part in two passes. The optimistic pass, then after a couple of days (to freshen my mind), the pragmatic pass.

### Optimistic pass

![A hand-drawn digital flowchart mapping out website architecture and data flow](https://piccalil.b-cdn.net/images/projects/optimistic-data-diagram.jpg?auto=format&w=1500)

As I covered earlier in the series, blog content comes from an existing headless WordPress system and the Bluesky/AT protocol posts (and in the future, interactions and discussion) come from the [`@atproto/api`](https://npmx.dev/package/@atproto/api) client library.

The original idea was to merge WordPress and AT Protocol data into a shared `/feed` route and then, based on type/source, render in different sections of the site. The music collection will always be treated as its own little ecosystem.

Everything in this pass is idealistic. Now let’s get pragmatic.

### Pragmatic pass

![Another hand-drawn digital flowchart but this time, it's been simplified](https://piccalil.b-cdn.net/images/projects/pragmatic-data-diagram.jpg?auto=format&w=1500)

The sections are near-enough the same, but there are less arrows. With fresh eyes, I rightly considered how stinky merging two different types could be, both technologically and creatively, so I simplified that. There’s no more stream crossing, as it were.

I also did exactly what I said I would need to do in the last post too: I [measured this idea against the list of problems I was trying to solve](https://piccalil.li/projects/personal-site/2#find-the-pain-points-and-measure-against-them:~:text=The%20list%20to%20measure%20against) and I couldn’t in good faith tell you that point 2 — _“The codebase is difficult to maintain and I’ve carried over tech debt from multiple personal sites and half-baked ideas”_ — would not be put at risk.

![An Obsidian markdown file called "core features and iterations." It lists a development roadmap across four iterations, including tasks like "basic shell version of the site," "look and feel design," "AT protocol integration," and "last.fm integration."](https://piccalil.b-cdn.net/images/projects/personal-site-core-features.jpg?auto=format&w=1500)

I’d also mapped out the deeper integration with the AT protocol in iteration three, so at that point — especially as this is a _new_ addition to the site — I’ll render individual posts and _hopefully_ all of the replies and interactions.

[Advert![Save 20% on all courses, using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Sketching and prioritisation](#sketching-and-prioritisation)

Ok, the last pit stop on our planning tour is to do a bit more sketching, but this time, the focus is on content prioritisation. Aside from the blog, music-collection and posts, the three most important pages are:

1.  The home page
2.  The about page
3.  The links page

As I identified in the last post, one of the most important problems to fix is:

> The homepage is underwhelming and doesn’t communicate what I do well at all

I’d say the same for the about page too. For too long on the web, I’ve leaned into reputation and social graph, but what about people who’ve never heard of me or seen me around? I need to make it clear to those people especially what I’m about.

For the links page, I quite like the idea of a [Linktree](https://linktr.ee/), “link in bio” sort of thing without all the KPI-chasing _weight_, so it’s worth sketching that too.

What is very important when doing this sort of work is that you do it _fast_. Your tool of choice needs to work as fast as your brain does. Sure, you can make a neater version of these guides if you need to collaborate, [like we did here](https://piccalil.li/blog/redesigning-piccalilli-the-first-part-of-the-design-process/#sprint-one), but working fast and loose helps my brain, especially, remain in a focused state. If I’m faffing around aligning stuff and making stuff neat, it’s busywork.

![A priority guide / wireframe that's also digitally done by hand](https://piccalil.b-cdn.net/images/projects/priority-guide-sketch.jpg?auto=format&w=1500)

What an absolute shambles, eh? Let me break down what’s going on here. I first sketch out blocks of content in priority order, from top to bottom. Sure there’s a _bit_ of layout going on, but generally this is vertically ordered blocks.

After I got the priority sorted, I then went ahead, annotated with blue and commented with red. This is a me thing: I need the different colours so specific types of information stick out from each other. Mostly I’m either identifying _what_ an element does, or if it’s repeatable.

Notice on the about page I didn’t re-create the blocks of content? There’s no point, when I can make a note that I have a repeat of the homepage or a variant of that. This is mostly there to remind me to consider both contexts when I come to do the actual UI design. I also want to retain the longform prose on my about page, but that is _less_ important, priority-wise, so it gets pushed down.

I mapped out the links page too — I’m looking forward to working this part out especially in design. In terms of prioritisation it’s pretty straightforward. “Repeat of most important” means links like Piccalilli and Set Studio, followed by icon-based social network links. This will help me map out the Astro collections too.

Lastly, because [I am also a big fan of a good off screen menu](https://piccalil.li/blog/in-praise-of-off-screen-menus/), I’m going to give myself that creative freedom. I just needed to work out _what_ went in there, aside from navigation. I’ve settled on links to important stuff and expanding into a sub-navigation where appropriate. For example, the sub-navigation of the music collection might free me up to simplify the music collection layout itself.

## [Determine an order of operations](#determine-an-order-of-operations)

Now I have all of this planning done and I’ve got my iterations worked out, I can quickly map out the order of operations:

1.  Planning (done)
2.  Sketching and priority guides (done)
3.  HTML only shell of the site with shell components
    -   Aside task: creative inspiration and scrapbooking
4.  Creative UI design and prototyping
5.  Core build, including design system, followed by full pages
6.  Flair pass and nice touches

You see that? We’re getting into some coding in the next one: the start of getting to the website’s current state (at the time of writing).

![My homepage looking very simple with a picture of me and some prose. There's a banner at the top explaining that this is a wireframe version of the site. ](https://piccalil.b-cdn.net/images/projects/personal-site-initial-live-version.jpg?auto=format&w=1500)

See you in the next one!

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_