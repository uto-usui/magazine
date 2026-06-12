---
title: "headingoffset is Not the Document Outline Algorithm"
source: "https://adrianroselli.com/2026/06/headingoffset-is-not-the-document-outline-algorithm.html"
publishedDate: "2026-06-11"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

Hi, just me _heading off_ some bad advice I’m starting to see in developer venues.

## Background

![The JAWS heading list dialog with a yellow three-in-one surface level resting on top and a board nailed over it with hand-scrawled ‘offset=2’.](https://adrianroselli.com/wp-content/uploads/2026/06/level-heading-offset.png)

The proposed Document Outline Algorithm, where headings would automatically reset themselves to the appropriate level based on their position in the DOM structure, was never part of a final HTML specification. It was quickly proven to be unworkable; brief support in JAWS demonstrated that. You can read the [tortured history](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html#Minutiae) (and a JAWS support demo) in my 2016 post [There Is No Document Outline Algorithm](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html).

In 2019 WHATWG worked to resurrect `<hgroup>`, partly in a novel effort to try to resurrect the Document Outline Algorithm. In the end, even that effort was futile. `<hgroup>` came back, but it came back as a grouping element only. The only impact it has on heading structures is that browser could, if they really wanted, [ignore other headings in the same `<hgroup>`](https://www.w3.org/TR/html-aam-1.0/#el-hgroup).

In 2020, [Steve Faulkner wrote about](https://web.archive.org/web/20200307115952/https://twitter.com/stevefaulkner/status/1236241209686966272) the [`doc-subtitle` role](https://www.w3.org/TR/dpub-aria-1.0/#doc-subtitle), from the [Digital Publishing WAI-ARIA Module 1.0](https://www.w3.org/TR/dpub-aria-1.0/), as a way to handle subtitles until `<hgroup>` found its new footing. Sadly, a cadre of authors thought _that_ role could be the basis for the Document Outline Algorithm.

Authors very much want to make the browser decide heading levels for them. Authors also very much continue to write content and HTML structures that make that impossible.

So I wasn’t surprised when Firefox’s recent announcement of [`headingoffset` support](https://mastodon.social/@firefoxwebdevs/116680726980295049) coming to Firefox behind a flag resulted in many cheering the “return” (irony quotes) of the Document Outline Algorithm.

But it isn’t.

## `headingoffset`

The `headingoffset` attribute lets _authors_ offset heading levels for descendants of a given node.

So if you have, say a dialog that starts at `<h2>`, you could add `headingoffset="2"` and then let it pull in (server-side or via your preferred user-slowing front-end tooling) another page that uses `<h1>` as its first heading, you can be comfortable knowing that `<h1>` will be _treated_ as `<h3>` in the accessibility tree.

This can be handy for content re-use without authors needing to make every heading a variable or burning down the DOM each time to forcibly re-write them.

But it’s still the author’s job to make an intentional and good decision. The browser will know nothing more about your content or structure than it did before. And it certainly doesn’t _reduce_ WCAG risk.

Other useful nuggets:

-   `headingoffset` values must be valid non-negative integers.
-   `headingoffset` values must be between 0 and 8.
-   `headingoffset` values greater than 8 are specified to max at level 9, but existing bugs may impact that.
-   Other invalid `headingoffset` values _should_ fall back to level 2, but again, bugs and implementation decisions wil impact that.
-   `headingreset` is a boolean attribute that tells browsers to ignore `headingoffset` for that node and its descendants.
-   Do not use `headingoffset` until you can confirm support for the computed heading level in your target audience browser.

## Recap

1.  `headingoffset` is not the (nor any) Document Outline Algorithm, nor does it replicate it.
2.  `headingoffset` requires the author to make decisions based on content.
3.  Until JAWS and TalkBack fix existing bugs, probably don’t do / allow any heading levels higher than 6.
4.  Don’t do / allow any heading levels higher than 9.
5.  If you are hoping `headingoffset` will resolve your heading level problems in a hands-off way with imported or user-generated content, you may end up creating [confusion and WCAG risk](https://www.tpgi.com/heading-off-confusion-when-do-headings-fail-wcag/).
6.  Do not try to use `headingoffset` to try to recreate the Document Outline Algorithm.

Not a ton of detail in this post, but at 500 words if you want more then here are some resources beyond what I linked:

-   [There Is No Document Outline Algorithm](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html), 29 August 2016.
-   [Be Wary of doc-subtitle](https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html), 16 August 2020.
-   [Irrational Headings](https://adrianroselli.com/2022/07/irrational-headings.html), 21 July 2022.
-   [Level-Setting Heading Levels](https://adrianroselli.com/2024/05/level-setting-heading-levels.html), 8 May 2024.
-   [Context-aware headings in HTML](https://www.matuzo.at/blog/2026/content-aware-headings), 3 June 2026 by Manuel Matuzović.