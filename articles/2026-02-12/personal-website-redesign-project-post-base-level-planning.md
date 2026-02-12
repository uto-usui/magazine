---
title: "Personal website redesign project post: Base-level planning"
source: "https://piccalil.li/projects/personal-site/2/?ref=main-rss-feed"
publishedDate: "2026-02-11"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

Right, by now you’ve (hopefully) [read the _why_](https://piccalil.li/projects/personal-site/1/), so let’s start moving towards the _what_. Let’s go right to the start of this first iteration look at the planning that happened.

I can’t stress enough how even a modest amount of pre-thinking, sketching or even just making a checklist beats jumping into a code editor or design tool, regardless of whether you’re doing a small ticket at work, building a personal site or even starting a whole client project. Sitting down and thinking **away from the tools** really helps you to consider what is actually important, what is a nice to have, how you measure improvement and importantly, what the process of iterations/cycles look like.

For me who works obsessively in iterations, I need to work out what I would **like** the end goal looks like. With that, I can then map out how I get there in sensible iteration. I _could_ just start from zero and work up to the end goal, _then_ publish my website. It’s how I usually do it! The reason I want to work in iterations this time though is because I’m _determined_ to have a solid, scalable _system_ that I can tinker with as I please, long into the future, regardless of how my personal technology preferences change over time.

With all of that in mind, my ideal endpoint is as follows:

> I want my website to be built out of much smaller pieces that culminate in a themeable, light design system where a future redesign is a simpler job of editing a single theme CSS file and switching out some creative assets.

I’m in a lucky position with this project because we’ve achieved this not once, but twice in [the studio](https://set.studio/) already.

![A composition of selected elements from “The Lost Estate” website, featuring bold typography, vintage-inspired illustrations, event details, customer reviews, and booking buttons. The design uses a dark theme with red and gold accents.](https://piccalil.b-cdn.net/images/projects/work-tle.jpg?auto=format&w=1500)

The Lost Estate are a London based events company who we built a themeable design system for to enable them to spin up event sites that were really creative, but also consistent and performant.

Then of course there’s this very website you’re looking at! This whole thing is a themeable system which not only powers dark mode, but also the [heavily customised course landing pages and courses themselves](https://piccalil.li/blog/weve-implemented-full-brands-for-our-upcoming-courses/).

Anyway, let’s get stuck into some planning.

## [Find the pain points and measure against them](#find-the-pain-points-and-measure-against-them)

This is the live version of the final state of my _old_ [codebase on web archive](https://web.archive.org/web/20260102205804/https://bell.bz/), because remember, [you’re reading these articles in the past](https://piccalil.li/projects/personal-site/1/#the-format-and-how-this-series-works). Anyway, that stack was:

1.  Headless WordPress for blog posts
2.  Notion database for the music collection
3.  Markdown-powered static pages
4.  Eleventy front-end

The setup was not too heavy as far as setups generally go, but it was _riddled_ with technical debt, regardless. A lot of that technical debt can be assigned to it being a personal website — something I built quickly and maintained very infrequently. The codebase was also over 3 years old with the CSS and markup being nearly 5 years old, from when it was a full WordPress site. The source of the technical debt, very much pointed in two places for me though:

1.  The Notion-powered music collection had to go. The API is slow and working on the site locally was a nightmare (even with caching). I’m also in the process of “de-Notioning” everything.
2.  The WordPress system was wildly out of date and becoming cumbersome to work with in the admin areas, which meant I blogged a lot less than I could have.

That’s the main sources of technical debt identified, that are worth fixing up front.

The WordPress one was easy, I just had to _update_ as I was \[gulp\] several years out of date…

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=in-article-ad)

The Notion-powered system was also quite simple. I already have a pretty robust script I use for Piccalilli that pulls content from Notion, turns it into markdown with [front matter](https://learneleventyfromscratch.com/lesson/4.html), then downloads any media assets to a relative, local destination. All I had to do was create a variant of that script, which resulted in [this big ol’ pull request to migrate](https://github.com/Andy-set-studio/personal-site-eleventy/pull/2) the content.

The music collection is now markdown files which look like this:

`--- title: 'The Artist In The Ambulance' artist: 'Thrice' cover: '1768832680013-335.jpeg' formats: ['Vinyl'] tags: ['Top 10'] pubDate: 2022-03-02T22:08:00.000Z ---`

I already know I’m doing a re-platforming, so I don’t need to worry about the lower priority items of technical debt such as HTML, CSS and JavaScript I’ve sloshed around over the years, so let’s now identify the other main issues I’m trying solve, now that I’ve managed to do a technical debt sweep.

### The list to measure against

1.  The homepage is underwhelming and doesn’t communicate what I do well at all
2.  The codebase is difficult to maintain and I’ve carried over tech debt from multiple personal sites and half-baked ideas
3.  I don’t feel the urge to maintain and look after the current site because I’m fundamentally not a fan of it anymore because it bores me
4.  The music collection should do more to help people discover music in the places they actually listen to music
5.  I know I can do much better in terms of look and feel than I have for the last few redesigns

This list of issues can be used as a measuring stick as I work through the project because if I’m not fixing _these_ issues at least, there’s no point in even bothering, as I see it. This list is a useful canonical _anchor_ too.

The _anchor_ is something to think back to when I’m going off pisté a bit too much and a useful method of determining whether an idea is worth pursuing. If the idea puts any of the items on this list at risk in any way, it’s not worth pursuing, which I imagine, will be touched on _a lot_ as I add those _nice_ touches and flourishes that I will undoubtedly take _too far_ in the flair pass.

The first and fifth issues of the list are actually tangibly related to each other. When I designed the now _old_ version of the site you could sum that process up as “I spend all day in iA writer so I might as well make my website look like that”. In short, I was _lazy_ and crapped out the front-end in a couple of days. What I really need to be doing is more of a content strategy and look and feel strategy this time around.

We’ve also partially tackled point two of the list, but like I said earlier, re-platforming (which we will get to, don’t you worry) and re-building _properly_ should sort the rest. In a similar vein, point three _should_ be addressed by the _end_ of this process.

## [Work out the core features](#work-out-the-core-features)

I know where I don’t want to be and where I _want_ to be at this point in the planning, so it makes sense to actually start working out the core features of the website to find a sensible, iterative route to the end.

I ended up just making a list in markdown:

![An Obsidian markdown file called "core features and iterations." It lists a development roadmap across four iterations, including tasks like "basic shell version of the site," "look and feel design," "AT protocol integration," and "last.fm integration."](https://piccalil.b-cdn.net/images/projects/personal-site-core-features.jpg?auto=format&w=1500)

This is the point I’m making: _any_ planning is better than nothing. If I had just started coding and designing, I might well get to iteration four quicker, but the journey there would forever be in the first cycle in this diagram, I use every day, forever and always.

![A dotted line that starts as a very scruffy, messy circle. Over the course of three more circles, it gets neater and neater until it’s nearly perfect. There's a "we are here" marker pointing at the messiest part](https://piccalil.b-cdn.net/images/projects/course-branding-iteration.svg?auto=format&w=1500)

The visual representation of how we do things at [Set Studio](https://set.studio/) and my approach to building in general

Right, this feels like a good place to break off for this part one of planning. I know, I know, planning is _boring_ but we’re gonna be patting ourselves on the back, later in the project, I just _know it_.

Let’s do some more tangible sketching-based planning, technology-based planning and a touch of auditing in the next one. _Then_ we can open our code editor.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![Complete CSS. Take your CSS skills beyond the next level. Available now!](https://piccalil.b-cdn.net/images/ads/complete-css-ad-landscape-free-lessons.png?format=webp)](https://piccalil.li/complete-css/lessons/3?utm_source=piccalilli&utm_medium=graphical-ad)