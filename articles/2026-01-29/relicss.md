---
title: "ReliCSS"
source: "https://css-tricks.com/relicss/"
publishedDate: "2026-01-28"
category: "css"
feedName: "css-tricks"
author: "Geoff Graham"
---

We all have a few skeletons in our CSS closets. There’s probably that one-off `!important` where you can now manage that more effectively with cascade layers. Or maybe a dated Checkbox Hack that `:has()` has solved. Perhaps it’s been a long while since your last site redesign and it’s chock-full of vendor-prefixed properties from 2012. _Thar be demons!_

Stu Robson’s [ReliCSS](https://www.alwaystwisted.com/relicss/) (clever name!) tool can excavate outdated CSS in your codebase that have modern CSS solutions.

Each relic is assigned a level of severity. As Stu explains it:

> -   **High Severity:** True “fossils”. Hacks for (now) unsupported browsers (IE6/7) or “dangerous” techniques. High-risk, obsolete, should be first targets for removal.
> -   **Medium Severity:** The middle ground. Hacks for older unsupported browsers (IE8-10). They work but they’re fragile. Hacks to review to see if they’re still relevant for your actual users.
> -   **Low Severity:** Modern artifacts. Usually vendor prefixes (-webkit-, -moz-). Safe mostly, but better handled by automated tools like Autoprefixer. They’re an opportunity to improve your build process.

It’s been a little while since my personal site got an overhaul. Not to toot my own horn, but heyyyyyy!

![Screenshot of a CSS audit using Stu Robson's ReliCSS tool. No issues are found.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-28-at-9.54.42-AM.png?resize=1724%2C868)

Seriously, though. I know there are things in there I’m embarrassed to admit.

But what if we do archeological dig on CSS-Tricks? I mean, it’s been [at _least_ five years](https://css-tricks.com/design-v18/) since this place has gotten the love it deserves. I’m almost afraid to look. Here goes…

![Screenshot auditing CSS-Tricks CSS stylesheet in Stu Robson's ReliCSS tool. Out shows 19 total relics.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-28-at-10.11.46-AM-1024x663.png?resize=1024%2C663&ssl=1)

🫣

OK, not as bad as I imagined. It’s largely vendor prefixing, which I’m sure comes courtesy of an older Autoprefixer configuration.

[Direct Link →](https://www.alwaystwisted.com/relicss/)