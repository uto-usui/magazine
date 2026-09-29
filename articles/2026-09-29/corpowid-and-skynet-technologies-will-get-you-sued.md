---
title: "#Corpowid and #Skynet Technologies Will Get You Sued"
source: "https://adrianroselli.com/2026/09/corpowid-and-skynet-technologies-will-get-you-sued.html"
publishedDate: "2026-09-28"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

The market is flooded with so many accessibility overlays that it’s impossible to keep up. I’ve written about the biggest players (plus some also-rans) and provided enough technical details that most readers should know how to quickly evaluate their false claims and poor technology. Never mind their ethical failures as business models.

So today is a two-fer, with no more free consulting telling these companies how to improve their products. They have not followed any advice I’ve offered over the years, other than temper their claims ever so slightly.

## Corpowid

I’ll let Corpowid demonstrate its features using this 21 second silent video I recorded when I activated its overlay. See how many visible WCAG violations you can spot. Hints — my window is 1,280px wide and watch the arrows.

 Sorry, your browser doesn’t support embedded videos, but don’t worry, you can [download it](https://adrianroselli.com/wp-content/uploads/2026/09/corpowid-ai.mp4).

Fake transcript (hidden because spoilers for sighted users)

Viewing a [Corpowid blog post](https://corpowid.ai/blog/the-eu-ai-act-and-accessibility-how-they-intersect-in-2026), zoomed 200%, with overlapping text and graphics (Google for Startups, AWS Startup Programs, NVIDIA Inception Program, Visa Innovation Program) in its footer. There is a horizontal scrollbar. The bottom left corner has a floating button that animates new icons into it and flashing curved black “Try widget now!” text around it. When the overlay is activated, a crowded set of buttons with a tiny scrollbar that I miss when first trying to activate it appears. Finally I scroll to the right to show much of the navigation is off the screen, with a play button that pulses a purple border along with a block of text on the main page (“Book an accessibility consultation”) that also has a never-ending pulsing purple border.

[Corpowid’s accessibility statement](https://corpowid.ai/accessibility-statement) is attenuated to sound good to layfolk, but absolve itself of legal risk with squishy terms like:

-   [Substantially conformant](https://corpowid.ai/accessibility-statement#:~:text=Substantially%20conformant)
-   [informed by](https://corpowid.ai/accessibility-statement#:~:text=informed%20by)
-   [remain usable](https://corpowid.ai/accessibility-statement#:~:text=remain%20usable)
-   [We aim to respond](https://corpowid.ai/accessibility-statement#:~:text=We%20aim%20to%20respond)

In the end, if the overlay introduces WCAG violations and the company behind the overlay can’t itself follow nor commit to WCAG, then this is another case of paying to add risk to your site.

## Skynet Technologies

It’s telling that Skynet Technologies doesn’t run its overlay on its own site. I found it on a restaurant site [linked from a Masto post](https://wandering.shop/@fugueish/117335095225022107). While the overlay didn’t fix any of the WCAG violations on the site, it had nifty text controls.

 Sorry, your browser doesn’t support embedded videos, but don’t worry, you can [download it](https://adrianroselli.com/wp-content/uploads/2026/09/skynet-tech_in-use.mp4).

Fake transcript (hidden because why not at this point)

Viewing [Dinosaurs Sandwiches](https://www.eatdinosaurs.com/) and promptly activating the overlay (which is signaled by an audio cue). The overlay appears and I use the font size control, where I click an up arrow five times for a maximum resize of 150% before the button disables itself — the page text gets larger, but the overlay text does not. Then I activate the “Sign Language Font” button, which turns all text on the page and in the widget (excepting the Skynet Technologies branding) into ASL finger-spelled words. Every letter is replaced by a hand representing that letter in ASL. I close the overlay (signaled by a different audio cue) and scroll to the bottom of the page, showing the restaurant menu as hands, except for the dollar sign, decimals, ampersands, and the copyright symbol.

The overlay replaced every letter with a glyph using American Sign Language showing the sign for the letter it replaced (fingerspelling). I changed the overlay’s interface language to British English and Australian English, but the signs did not change (both England and Australia use different signing alphabets because they are different sign languages, [BSL](https://en.wikipedia.org/wiki/British_Sign_Language) and [AusLan](https://en.wikipedia.org/wiki/Auslan) respectively). Skynet turned its pandering into a localization foot-gun.

Also, the overlay (surprise) introduces WCAG violations in its interface. I am still not giving free consulting by pointing them out, but some are so obvious that automated scanners find them. You could try the Skynet Technologies All in One Accessibility® overlay on its [trial-sign up page](https://ada.skynettechnologies.us/trial-subscription), where you can quickly see it does not fix the WCAG issues even in that simple form and introduces more when you activate some features (“high contrast” and “smart contrast” are visually obvious cases).

## Wrap-up

Don’t use accessibility overlays. They do not work. If you want to install one to help users, keep reading. If you want to build one because you think it can help users, you’re kidding yourself. If you want to start a business selling them, [you might be the baddie](https://en.wikipedia.org/wiki/Are_We_the_Baddies%3F).

I posted about each of these on the socials: [Corpowid on Masto](https://toot.cafe/@aardrian/117332564274425079), [Corpowid on Bluesky](https://bsky.app/profile/aardrian.bsky.social/post/3mwe63jl6is2d), [Skynet Technologies on Masto](https://toot.cafe/@aardrian/117340122053585722), [Skynet Technologies on Bluesky](https://bsky.app/profile/aardrian.bsky.social/post/3mwhjkrmo422y). I share those because some folks left insightful responses and you should see what prompted this post.

Other overlay vendors that I believe misrepresent the truth:

-   [#accessiBe Will Get You Sued](https://adrianroselli.com/2020/06/accessibe-will-get-you-sued.html), 29 June 2020
-   [#UserWay Will Get You Sued](https://adrianroselli.com/2021/09/userway-will-get-you-sued.html), 13 September 2021
-   [#FACILiti Will Get You Sued](https://adrianroselli.com/2022/03/faciliti-will-get-you-sued.html), 9 March 2022
-   [#AudioEye Will Get You Sued](https://adrianroselli.com/2023/02/audioeye-will-get-you-sued.html), 26 February 2023
-   [#Accesstive Will Get You Sued](https://adrianroselli.com/2025/07/accesstive-will-get-you-sued.html), 8 July 2025
-   [#ARTY Could Get You Sued](https://adrianroselli.com/2025/07/arty-could-get-you-sued.html), 17 July 2025

Talks I’ve given about overlays:

-   [Overlays Underwhelm: Web Directions AAA 2021](https://adrianroselli.com/2021/11/overlays-underwhelm-web-directions-aaa-2021.html), 4 November 2021
-   [Overlays Underwhelm: a11y NYC](https://adrianroselli.com/2022/03/overlays-underwhelm-a11y-nyc.html), 1 March 2022
-   [Overlays Underwhelm at ID24](https://adrianroselli.com/2022/09/overlays-underwhelm-at-id24.html), 21 September 2022
-   [Overlays Underwhelm at WordPress A11y Day](https://adrianroselli.com/2022/11/overlays-underwhelm-at-wordpress-a11y-day.html), 3 November 2022

Tactics worth knowing:

-   [Sub-$1,000 Web Accessibility Solution](https://adrianroselli.com/2021/01/sub-1000-web-accessibility-solution.html), 12 January 2021
-   [Free Feedback for #accessiBe](https://adrianroselli.com/2021/02/free-feedback-for-accessibe.html), 14 February 2021
-   [FTC, Commercial Surveillance, and Overlays](https://adrianroselli.com/2022/08/ftc-commercial-surveillance-and-overlays.html), 12 August 2022
-   [‘Accessibility at the Edge’ W3C CG Is an Overlay Smoke Screen](https://adrianroselli.com/2022/09/accessibility-at-the-edge-w3c-cg-is-an-overlay-smoke-screen.html), 1 September 2022

Ethics:

-   I have a chapter on overlays in the book [Digital Accessibility Ethics: Disability Inclusion in All Things Tech](http://digitalaccessibilityethics.org/)
-   [Overlay False Claims](https://overlayfalseclaims.com/)
-   [Overlay Fact Sheet](https://overlayfactsheet.com/)