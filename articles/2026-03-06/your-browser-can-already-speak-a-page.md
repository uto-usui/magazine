---
title: "Your Browser Can Already Speak a Page"
source: "https://adrianroselli.com/2026/03/your-browser-can-already-speak-a-page.html"
publishedDate: "2026-03-05"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

![“Read aloud” controls on a web page showing back, forward, and play buttons, a slider to control speaking speed, and a select menu to choose voice, with Microsoft Mark selected.](https://adrianroselli.com/wp-content/uploads/2026/03/read-aloud_Firefox_thumb.png)

Users can customize the features built into the browser, something not often available from third-party approaches.

Is an “AI” company offering to provide spoken versions of your pages for users? Is an overlay company promising to make your content more accessible by its overlay speaking it? Is some other vendor pitching you on some kind of _thing_ that reads your web pages aloud to users?

You don’t need it.

Or, rather, your users may not need it. Their browser already offers it. At no cost to you. Nor them.

## No Really, Try It

These features may not appear for pages that are not well-formed (lack a main region, are nothing but div-soup, etc.). If they don’t appear for your content, that’s a signal that you may have work to do on the underlying HTML. Any fixes you make would likely result in a better experience for everyone.

Instructions for common browsers:

-   In [Firefox on desktop](https://support.mozilla.org/en-US/kb/firefox-reader-view-clutter-free-web-pages), you can enter reader view (F9) and then activate the headphone / “Read aloud” button (N).
-   Chrome:
    -   in [Chrome desktop](https://support.google.com/chrome/answer/14218344?hl=en&co=GENIE.Platform%3DDesktop&oco=1), right-click, choose “Open in reading mode”, and then hit the play button (K).
    -   in [Chrome mobile](https://support.google.com/chrome/answer/14768725?hl=en), activate the “More” kebab, then choose “Listen to this page.”
-   Edge:
    -   [Edge on desktop](https://www.microsoft.com/en-us/edge/features/read-aloud?form=MT0160) offers the Read Aloud feature (Ctrl + Shift + U).
    -   Edge on mobile uses the immersive reader, where you can choose “Read aloud” from the toolbar.
-   Safari:
    -   on [iDevice Safari](https://support.apple.com/guide/iphone/listen-to-a-webpage-iph449fc616c/ios), activate the “Page menu” button (the double-underlined rectangle on the left of the address bar) and choose “Listen to Page.”
    -   on macOS Safari, choose “Edit” from the menu bar, then “Speech,” then “Start Speaking.”

In most cases, users can choose the reading speed and voice, pause or restart it, and even jump back and forth through paragraphs. This is more control than third-party products offer.

## But Also

If an “AI” company offered on-demand or pre-recorded audio, they’re leveling up our overall [destruction of the environment](https://adrianroselli.com/2024/04/what-you-can-do-as-a-web-builder-on-earth-day.html).

If an overlay vendor offered it through its overlay, you’re adding legal risk, trusting them to not be liars, letting them track your users, and assuming it will work. Because, as I’ve documented extensively, [overlays don’t work](https://adrianroselli.com/tag/overlay) (sometimes at all but usually as advertised).

Any other vendor is probably a mix of data harvester, crypto miner, scam platform, or government panopticon node.

Users who most benefit from a page being spoken to them know about browsers’ built-in features. Those users may rely on extensions for even more control. They are unlikely to benefit from (or care about) these third-party offerings.

## However

If you have good research, not provided by the vendor, that your specific users are asking for this specific feature then sure. Go for it. But also track its use and understand you’re taking on the vendor’s risks as your own — for those users whose blockers don’t block it.