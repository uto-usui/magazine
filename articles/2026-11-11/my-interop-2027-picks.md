---
title: "My Interop 2027 Picks"
source: "https://adrianroselli.com/2026/11/my-interop-2027-picks.html"
publishedDate: "2026-11-10"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

[Interop 2027](https://github.com/web-platform-tests/interop/tree/main/2027) is gathering votes and the deadline is [19 November 2026](https://github.com/web-platform-tests/interop/blob/main/2027/selection-process.md#proposal-ranking). For the second year now, [Firefox made a page to let you rank your Interop 2027 choices](https://interop-rank.fxdx.dev/). Which I’ve now done.

I narrowed it down to fifteen, though getting there was oddly difficult. It seems the top three are really what matter, but I’ll share all fifteen with some tiny amount of context for each.

## Mine

Ranked.

1.  [`ariaNotify()`](https://github.com/web-platform-tests/interop/issues/1387):  
    Because years of watching [developers get live regions wrong](https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/) (arguably because companies aren’t employing screen reader users in critical roles) coupled with [confusion about exposure and support](https://adrianroselli.com/2026/01/live-region-support.html), makes me hopeful this new approach will help close some of those gaps. The ARIA Working Group put in a bunch of effort to [spec `ariaNotify()`](https://w3c.github.io/aria/#ARIANotifyMixin) (from an early odd proposal), so I look forward to broad support.
2.  [HTML `focusgroup` attribute](https://github.com/web-platform-tests/interop/issues/1348):  
    I’ve shared [my opinions on `focusgroup`](https://adrianroselli.com/2026/07/focusgroup-tests.html#Opinions), so I am hopeful for better outcomes for users, while simplifying keyboard patterns for authors (and hopefully less scripting).
3.  [Shadow DOM `referenceTarget`](https://github.com/web-platform-tests/interop/issues/1333):  
    Because I have seen so many broken associations across shadow boundaries that have left screen reader and voice control users stranded. While [ARIA reflection](https://wicg.github.io/aom/spec/aria-reflection.html) and the proposed AOM continue to get some attention, they aren’t here today.
4.  [HTML `headingoffset` and `headingreset` attributes](https://github.com/web-platform-tests/interop/issues/1412):  
    Because headings coming from user-generated or third-party content are often the wrong level, though they aren’t typically blockers for users. That said, my fear is authors will get more cavalier, even [treating this as an outline algorithm](https://adrianroselli.com/2026/06/headingoffset-is-not-the-document-outline-algorithm.html).
5.  [Device Posture API](https://github.com/web-platform-tests/interop/issues/1439):  
    While [foldable phones named Duo](https://toot.cafe/@aardrian/117248262298414098) have been around for years, Apple’s newest hardware is already causing problems with design systems that (wrongly, IMO) rely on known and fixed screen sizes. I feel this can help limit user pain caused by author error.
6.  [Viewport Segments API](https://github.com/web-platform-tests/interop/issues/1440):  
    For essentially the same reason as the prior entry, with the added bonus of numbers.
7.  [CSS linked parameters](https://github.com/web-platform-tests/interop/issues/1346):  
    This is an author feature to me, because I use plenty of SVGs referenced by `<img>` and hate that I cannot pass colors into them.
8.  [CSS `AccentColor` system color reflects `accent-⁠color`](https://github.com/web-platform-tests/interop/issues/1361):  
    There was a brief period where some design systems leaned on this user preference, and thanks to fingerprinting concerns, are stuck with low-contrast browser defaults instead. Some of those patterns aren’t getting updates, so let’s fix it in the place that broke it.
9.  [CSS `line-⁠clamp` property](https://github.com/web-platform-tests/interop/issues/1379):  
    Card designs have been visually clipping text or moving interactive controls to the wrong place for years, making for confusing UIs for keyboard and screen reader users. While I am wary of letting CSS generate content (localization risk), I’d still like to see card usability improved and this might jelp.
10.  [HTML `<input type="week">`](https://github.com/web-platform-tests/interop/issues/1405):  
     Again, this is a personal preference given how many poorly-coded, inaccessible date pickers I have seen. Adding a week option might seem trivial, but I’ve yet to see an author get it right.
11.  [CSS `random-⁠item()` function](https://github.com/web-platform-tests/interop/issues/1403):  
     Not having to use script for this would be nice, though there is risk authors will use it for more than basic styling, potentially messing with exposure to AAPIs.
12.  [CSS anchor positioning with transforms and animations](https://github.com/web-platform-tests/interop/issues/1457):  
     The script payload to do this well seems to cause my phone to overheat and my fans to spin, so seeing this handled natively would be nice as an author and user.
13.  [CSS `flex-⁠wrap: balance`](https://github.com/web-platform-tests/interop/issues/1350):  
     To fix a years-old and glaring (IMO) gap in flex.
14.  [Responsive iframes](https://github.com/web-platform-tests/interop/issues/1443):  
     This is an accessibility issue, in my experience, once critical content is visually hidden. Even when scrollbars appear, it’s a visual and functional mess.
15.  [Improve interoperability of pointer events on touch devices](https://github.com/web-platform-tests/interop/issues/1427):  
     This only made the list because [Apple is finally making a touch-screen Mac](https://www.pcmag.com/news/hands-on-with-apples-macbook-pro-proled-xdr-touch-displays-come-to-mac) and, [if VoiceOver is any indication](https://adrianroselli.com/2025/02/which-voiceover.html), will fail to use what it learned on mobile and probably invent new interactions because it knows better. Maybe this proposal can get ahead of that behavior.

There are plenty of items I didn’t rank. There are plenty of items I would down-vote if I could. Regular readers of this site could probably guess a few.

## Others

Others have shared their own rankings, so I’ve listed them alphabetically by last name for no particular reason (though I realize it’s _only_ people with last names that I’ve found so far, kind of doubling down on the Western Wide Web phenomenon):

-   [Jeff Bridgforth](https://jeffbridgforth.com/my-interop-feature-ranking-2027/)
-   [Declan Chidlow](https://vale.rocks/micros/20261011-0700)
-   [Joshua Comeau](https://www.joshwcomeau.com/css/interop-2027/)
-   [Chris Coyier](https://blog.master.dev/my-interop-2027-picks/)
-   [Ky Decker](https://ky.fyi/posts/interop-2027)
-   [Joe Crawford](https://artlung.com/blog/2026/10/22/2027-web-platform-ranking/)
-   [Roland Franke](https://rolandfranke.nl/frontend-stories/my-interop-2027-css-wishlist/)
-   [Paweł Grzybek](https://pawelgrzybek.com/my-interop-2027-picks/)
-   [Jeremy Keith](https://adactio.com/journal/22805)
-   [Christopher Kirk-Nielsen](https://chriskirknielsen.com/blog/interop-2027-rankings/)
-   [David Marland](https://www.hammerspace.co.uk/posts/interop2027-10-2026)
-   [Eric A. Meyer](https://meyerweb.com/eric/thoughts/2026/10/14/my-interop-2027-rankings/)
-   [Stuart Robson](https://www.alwaystwisted.com/articles/and-thats-my-rank-2027-edition)
-   [Ana Rodrigues](https://ohhelloana.blog/my-interop-2027/)
-   [Remy Sharp](https://remysharp.com/2026/10/29/my-2027-web-platform-feature-ranking)
-   [Sam Smith](https://smth.uk/2027-interop-ranking/)
-   [Sara Soueidan](https://www.sarasoueidan.com/blog/interop-2027-rankings/)
-   [Tyler Sticka](https://tylersticka.com/journal/interop-2027-rank/)
-   [Cyd Stumpel](https://cydstumpel.nl/my-picks-for-interop-2027/)

None of those rankings are wrong. Except where they _are_ wrong, of course.