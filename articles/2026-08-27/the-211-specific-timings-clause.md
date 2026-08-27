---
title: "The 2.1.1 “specific timings” Clause"
source: "https://adrianroselli.com/2026/08/the-2-1-1-specific-timings-clause.html"
publishedDate: "2026-08-26"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

Many simplified, intro, or “plain-English” WCAG re-interpretations frame [Success Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG22/#keyboard) as ensuring a control or widget or _thing_ can be operated with a keyboard. Some go further and also ask you to consider keyboard-like devices.

Very few (I counted 1 out of 10) pay attention to the part mentioning timings (emphasis mine):

> All functionality of the content is operable through a keyboard interface _without requiring specific timings for individual keystrokes_, except where the underlying function requires input that depends on the path of the user’s movement and not just the endpoints.

This might be because it’s rare to find a keyboard interface that requires the user to do a specific keystroke for a specific time. The authors of these simplified re-framings may have never even seen one before.

The W3C’s 2.1.1 Understanding page explains what specific timings means:

> Examples of “specific timings for individual keystrokes” include situations where a user would be required to repeat or execute multiple keystrokes within a short period of time or where a key must be held down for an extended period before the keystroke is registered.

This is in my head because of an experience I had at Wayfair:

  Sorry, your browser doesn’t support embedded videos, but don’t worry, you can [download it](https://adrianroselli.com/wp-content/uploads/2026/08/2.1.1-failure_wayfair.mp4). The [caption file](https://adrianroselli.com/wp-content/uploads/2026/08/2.1.1-failure_wayfair.vtt) is also available in case your video player can import it.

My experience opening a Wayfair link in a new tab while on the Wayfair site. I did not buy that desk which eventually loaded; I closed the tab instead.

When I posted a static image and grumped about this on the socials ([Masto](https://toot.cafe/@aardrian/117130084843682135), [Bluesky](https://bsky.app/profile/aardrian.bsky.social/post/3mtkanuyxbs2s)), [Scott rightly guessed](https://bsky.app/profile/scottohara.me/post/3mtkhbionjk2m) the behavior and noted the 2.1.1 violation. [BrainDouche was surprised](https://bsky.app/profile/braindouche.bsky.social/post/3mtlhwtpmyk2v) to see this in the wild. It’s an obvious problem regardless of the SC, as [Curtiss Grymala experienced](https://higheredweb.social/@cgrymala/117156336289985784) and [Joe had also noted](https://front-end.social/@threetonesun/117156412897660615) the week prior.

I got feedback in real life as folks named the assorted SCs this failed (people play weird games; don’t judge). None of them named 2.1.1, however (ok, maybe judge). On prompting, it was a combination of overlooking such a rare failure and using non-W3C resources as their sole WCAG reference.

I get that WCAG is not an easy read, but if you’re going to do the job, then as Eric Eggert points out, [you have to do the work](https://yatil.net/blog/wcag-is-difficult-to-read-dont-read-it-is-a-self-fulfilling-prophecy). Don’t rely on non-W3C non-normative re-imaginings of WCAG (he also has [opinions on that](https://www.linkedin.com/posts/yatil_there-is-a-resource-making-the-round-explaining-activity-7319063786701635584-hHN5/)).

I doubt Wayfair is aware of the WCAG violation here. [Wayfair’s accessibility statement makes no promises](https://www.wayfair.com/help/article/wayfair_accessibility_statement/), so I’m not sure how motivated it or its vendors are.

I could lay out a case for the potential loss of revenue, [as I did for IndieGoGo](https://adrianroselli.com/2019/09/an-html-element-potentially-worth-18m-to-indiegogo-campaigns.html). Or I could _not_ give free labor to point out the other ways that human-blocking bot-affirming Wayfair button fails under WCAG.

To recap:

-   SC 2.1.1. Keyboard has a clause about holding down keys;
-   most simplified revisionist takes on WCAG miss that;
-   if you use one that misses it, maybe stop using it;
-   also don’t be a Wayfair.