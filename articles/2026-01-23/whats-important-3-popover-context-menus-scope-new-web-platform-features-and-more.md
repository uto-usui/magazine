---
title: "What’s !important #3: Popover Context Menus, @scope, New Web Platform Features, and More"
source: "https://css-tricks.com/whats-important-3/"
publishedDate: "2026-01-15"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

The developer community hasn’t wasted any time kicking off 2026 with some really great articles, demos, and insights. Firefox 147 and Chrome 144 also shipped, and while they’re not jam-packed with features, the releases are still pretty exciting for what’s normally a slow time of year, so without further ado, here’s what’s important from the last couple of weeks (or should I say the _first_ couple of weeks, of 2026?)…

Chris Coyier (a familiar name, perhaps) shows us [how to build context menus using popovers and anchor positioning](https://frontendmasters.com/blog/popover-context-menus-with-anchor-positioning/) over at Frontend Masters. Interest invokers, `<menu>`, discrete transitions, `[@starting-style](https://css-tricks.com/almanac/rules/s/starting-style/)`, and fallback positions are also mentioned, so grab a pickaxe, because this one’s a bit of a goldmine.

Also, [anchor positioning](https://css-tricks.com/css-anchor-positioning-guide/) went baseline this week, so you can use it on production websites now! Do we have our CSS feature of the year already?

### Scoping CSS with `@scope`

Funnily enough, I also got the opportunity to write something for Frontend Masters, and I went with `[@scope](https://css-tricks.com/almanac/rules/s/scope/)`. `@scope` has been my most-anticipated CSS feature for quite a while now, and Firefox shipping it in their final release of the year (making it baseline) made it _my_ feature of the year, so I’m very happy to kick off 2026 with this little [how-to on using `@scope` and scoping CSS overall](https://frontendmasters.com/blog/how-to-scope-css-now-that-its-baseline/).

### Generating gradient borders from an image source

In this demo, created and posted by Ana Tudor on Bluesky, Ana [blurs an image and masks it with a border](https://bsky.app/profile/anatudor.bsky.social/post/3mc5awalzss2t). You can actually accomplish this in Safari using just three lines of CSS, but the cross-browser solution isn’t too complex either (the key parts are the `[backdrop-filter](https://css-tricks.com/almanac/properties/b/backdrop-filter/)` and `[mask](https://css-tricks.com/almanac/properties/m/mask/)` CSS properties).

Given the current popularity of gradients, blurs, and dare I say it, _[glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)_, it’s a pretty sweet effect that you can probably adapt for other scenarios.

> Offset gradient border from img source – how would you get the result from the screen below? Real gap transparency, border gradient obtained from the image. My solutions on @codepen.io: Safari only in 3 declarations codepen.io/thebabydino/… Cross-browser codepen.io/thebabydino/… #CSS #filter
> 
> [\[image or embed\]](https://bsky.app/profile/did:plc:4hm2yozxzsakerfalloor5s6/post/3mc5awalzss2t?ref_src=embed)
> 
> — Ana Tudor ([@anatudor.bsky.social](https://bsky.app/profile/did:plc:4hm2yozxzsakerfalloor5s6?ref_src=embed)) [11 January 2026 at 09:52](https://bsky.app/profile/did:plc:4hm2yozxzsakerfalloor5s6/post/3mc5awalzss2t?ref_src=embed)

### You probably don’t need tabs

HTML, like CSS, is _soooo_ good now. That being said, even though we’ve been getting all these new HTML elements that enable us to build interactive components without JavaScript, that doesn’t necessarily mean that we should. Stephen Margheim says that [tab components are over-engineered most of the time](https://bsky.app/profile/fractaledmind.bsky.social/post/3mbk6xfzutf2w), and explains why and what you can do instead.

> A hot take after seeing yet another fancy tabs design: the classic "tab component" is over-engineered for 90% of use cases. You probably don't need it…
> 
> — Stephen Margheim ([@fractaledmind.bsky.social](https://bsky.app/profile/did:plc:h6bn3rru23cnhckc4a25ekz2?ref_src=embed)) [3 January 2026 at 19:57](https://bsky.app/profile/did:plc:h6bn3rru23cnhckc4a25ekz2/post/3mbk6xfzutf2w?ref_src=embed)

### Using your OS as a CMS

Speaking of simplicity, Jim Nielsen introduced me to this incredibly cool OS-as-a-CMS concept as he explains [how he got “Edit Post” buttons on his website to open the local document on his computer in iA Writer](https://blog.jim-nielsen.com/2026/os-as-cms/), completely negating the need for a CMS. Jim walks you through the whole thing, but the key ingredient is just a little link with a custom URL scheme:

```
<a href="ia-writer://open?path=posts:post.md">Edit</a>
```

I love this because I also write in Markdown (using iA Writer, no less), and could will easily integrate this into my Eleventy build. But it got me thinking: do any other apps have their own URL scheme? Well, as it turns out, some of them do! Here’s an incomplete list (with examples of ‘edit’ commands for each app):

-   **Obsidian:** `obsidian://open?vault=posts&file=post`
-   **VS Code:** `vscode://exact/path/to/post.md:9:1` (`:9:1` is the line and column number)
-   **Ulysses:** `ulysses://x-callback-url/open-item?id=ITEM_ID`
-   **Sublime Text** (with [subl protocol](https://packagecontrol.io/packages/subl%20protocol)): `subl://exact/path/to/post.md:9:1`
-   **Apple Shortcuts:** `shortcuts://run-shortcut?name=Edit&input=/path/to/post.md` (great for doing stuff with apps that _don’t_ have custom URL schemes)

### Quick hits and new web platform features

As you know (hopefully?), we post [Quick Hits](https://css-tricks.com/category/quick-hits/) throughout the week. The best way to find them is in the sidebar of the homepage, and they’re either links to things that you can read in just a minute or two, or just PSAs to read and remember. Anyway, here’s what you might’ve missed:

-   [HTML Document Outline died](https://www.tempertemper.net/blog/the-final-nail-in-the-html5-document-outline-coffin) (it was never really alive, to be fair)
-   Scroll-fade _didn’t_ die, but [we’re hoping that it does](https://dbushell.com/2026/01/09/death-to-scroll-fade/)
-   Chris Coyier quickly explained [how `!important` works with custom properties](https://frontendmasters.com/blog/important-and-css-custom-properties/)
-   [ReliCSS](https://www.alwaystwisted.com/relicss/) shipped, which helps you to replace any CSS hacks with `@supports` and modern CSS
-   Temani Afif coded [Mario World with CSS](https://bsky.app/profile/css-only.dev/post/3mbgzfvaonc2w)

> Ready for the first cool demo of the year? A mini Mario world with keyboard control. Yes, you can move Mario and also jump! 👀 Demo: codepen.io/t\_afif/full/… via @codepen.io ✔️ 100% CSS Magic ✔️ Minimal HTML ❌ 0% JavaScript A Chrome-only experimentation using modern CSS.
> 
> [\[image or embed\]](https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k/post/3mbgzfvaonc2w?ref_src=embed)
> 
> — CSS by T. Afif ([@css-only.dev](https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k?ref_src=embed)) [2 January 2026 at 13:39](https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k/post/3mbgzfvaonc2w?ref_src=embed)

And finally, here are my top picks from what Firefox and Chrome shipped on Tuesday:

-   [Firefox 147](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/147)
    -   [Anchor positioning](https://css-tricks.com/css-anchor-positioning-guide/) (now Baseline!)
    -   [View transition types](https://css-tricks.com/what-on-earth-is-the-types-descriptor-in-view-transitions/) (also Baseline!)
    -   [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) (a now-Baseline _JavaScript_ API that replaces the History API and `window.location`)
-   [Chrome 144](https://developer.chrome.com/blog/new-in-chrome-144)
    -   [`::search-text`](https://blogs.igalia.com/schenney/find-in-page-highlight-styling/) (only Chrome supports this pseudo-element that selects highlighted find-in-page text)
    -   [`<geolocation>`](https://developer.chrome.com/blog/geolocation-html-element) (only Chrome supports this HTML element that requests the user’s location declaratively)
    -   [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) (Chrome joins Firefox in supporting this replacement for JavaScript’s Date API, which [Piccalilli wrote about](https://piccalil.li/blog/date-is-out-and-temporal-is-in/))

Thanks for tuning in. I’ll see you in two weeks! Be there or be square (`aspect-ratio: 1`)!