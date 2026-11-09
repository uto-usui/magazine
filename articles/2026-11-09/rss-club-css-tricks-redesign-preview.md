---
title: "RSS Club: CSS-Tricks Redesign Preview"
source: "https://css-tricks.com/css-tricks-redesign-preview/"
publishedDate: "2026-11-06"
category: "css"
feedName: "css-tricks"
author: "Geoff Graham"
---

![](https://secure.gravatar.com/avatar/a8e040142716a4b44d014d80fbcf99c635b1d8faabfe469b6954a8ef2f168595?s=80&d=retro&r=pg)

**Hey you wonderful RSS subscribers!** We just soft-pushed a site redesign and wanted to give ya’ll the first heads-up. A full write-up is coming Monday but here are the high-level details:

-   **Ghost Busting:** As you might imagine, this site has carried over plenty of pieces over 19 years. I decided to excavate the theme and defintely found some ghosts to bust.
-   **Modern Dev Tooling:** Much better than the 5-year workflow we had before. Prettier, Styleint, GitHub Actions, auto cache-busting!
-   **Security:** I decided to ask Claude to help me with a holistic audit. I prompted it to review recent WordPress security release notes and identify areas where the theme could be hardened to comply with what WordPress is doing.
-   **Sass Rewrite:** I’m pleased as punch to see the overall size of CSS drop in the process. It went from 180 KB (31.7 KB) to 169 KB (24.6 KB zipped). Not hugely significant, but not _not_ significant either.
-   **Design-ish System:** Broad theme consistency! Semantic tokens for things like colors, fonts, font sizes, reused values.
-   **Theme Toggle:** The site has predominantly been dark despite the content being against a white background, so I treated things as though a “dark” mode already existed. The result is a creamy light theme.
-   **Jawbreaker Texture:** I’m calling it “Jawbreaker” for lack of a better term and because it reminds me of the jawbreaker candy I loved as a kid. You’ll find it splattered throughout the site.
-   **New Almanac Index:** Now the page is a real index of the CSS features that gets you where you need to go quickly. Someone somewhere sometime did some sort of CSS periodic table.
-   **New Guides Index:** There’s a featured guide, a widget of newly added and updated guides, and a categorized grid of the everything below that.
-   **Author Pages:** It’s a little change, really. The right sidebar was moved to the left and the author image and bio moved in, allowing the articles to creep up to the top.
-   **WordPress Admin Styles:** Things like fonts and text styles now have minimal styling that reflects the front end.

The full write-up will dig deeper into these, plus provide a side-by-side comparison with the previous design. Watch for it Monday! I hope you have a great weekend.