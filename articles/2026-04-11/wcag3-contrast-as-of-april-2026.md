---
title: "WCAG3 Contrast as of April 2026"
source: "https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html"
publishedDate: "2026-04-10"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

For years I have seen people, teams, products, organizations, and projects promoting [APCA contrast](https://apcacontrast.com/) as **_the_** WCAG3 color contrast algorithm. In many of those cases, those same actors have suggested dismissing the contrast algorithm in WCAG2.

This kind of problematic advice happened so often that I started filing issues with tool makers to remove APCA, as with [this May 2024 Chromium issue](https://issues.chromium.org/u/1/issues/341439947).

In January 2025 I saw a post promoting that advice, which would create legal risk for anyone following it. You can see my [original 2025 response on Mastodon](https://toot.cafe/@aardrian/113801092971854851) and the [same post on Bluesky](https://bsky.app/profile/aardrian.bsky.social/post/3lfdxgqdblc27), where the creator of APCA also weighed in. Read those to ensure you aren’t just taking my word for it.

## Current Situation

Here is the most current (as of this writing) contrast ratio algorithm in WCAG3 with the salient bit highlighted:

> contrast ratio test Exploratory
> 
> meeting a sufficient level of contrast between two colors using the relationship of hue, saturation, and lightness values
> 
> Editor’s note
> 
> The contrast algorithm used in WCAG 3 is yet to be determined.

APCA was marked for removal in early 2023:

> Exploratory content that does not gain WG support to proceed to the next stage within 6 months is automatically removed in the [WCAG 3 development process](https://www.w3.org/WAI/GL/wiki/Maturity_Labeling_Process). We still hope the promising contrast work will continue to mature for potential later inclusion.

As with other WCAG3 ideas that did not get working group support, the working group pulled it from the [July 2023 WCAG3 working draft](https://www.w3.org/TR/2023/WD-wcag-3.0-20230724/#color-and-contrast). APCA was only ever exploratory, and the [W3C’s July 2023 update explained removal of exploratory items](https://web.archive.org/web/20230726204602/https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/#status-exploratory-draft). The APCA creator’s response to Michael Cooper’s comment acknowledged that APCA versions in the draft were all **_early versions that were very obsolete_** (emphasis theirs).

I have no idea if APCA, whatever version, will come back to WCAG3.

## What to Do?

![The W3C logo with a frog-headed eyedropper over it.](https://adrianroselli.com/wp-content/uploads/2026/04/w3c-logo_eyedropper.png) You can still use APCA (whatever version). If you do, limit your risk by taking one of these approaches:

-   Choose colors that _also_ conform to WCAG2 contrast requirements; or
-   If you pick colors that fail WCAG2 contrast requirements, document it and have a ready response should you receive a drive-by lawsuit from a bad actor using an automated checker to find a contrast violation (assuming your attorney lets you do this).

I am still not a (bird) lawyer.

In the meantime, [WCAG3 is years away from being done](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/#timeline), perhaps 2030 at the soonest. Any contrast algorithm it picks won’t be final until at least then. But if you like whatever is proposed and want to use it before 2030, then probably refer to my two approaches above.