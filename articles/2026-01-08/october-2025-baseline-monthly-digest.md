---
title: "October 2025 Baseline monthly digest"
source: "https://web.dev/blog/baseline-digest-oct-2025?hl=en"
publishedDate: "2025-11-11"
category: "web-standards"
feedName: "web.dev"
---

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v6.jpg)

Published: November 11, 2025

As we get closer to the end of the year, another month has come and gone—and with it, many interesting developments around Baseline occurred in October. If you missed anything, this edition will get you caught up.

## Baseline regression on top-level `await`

A [notable issue](https://github.com/web-platform-dx/web-features/issues/2957) surfaced in a regression related to the top-level `await` implementation in Safari. Top-level `await` lets you use the `await` keyword at a top-level context outside of an `async` function. This is having an effect on developers relying on the feature for asynchronous module loading.

For Baseline, this means that top-level `await` has regressed from Widely available to Limited availability. For more information on when this change occurred, [the pull request to revert the feature's status](https://github.com/web-platform-dx/web-features/pull/3483) can give you more information, and you can expect to hear more about this issue in future Baseline content here on web.dev.

## Baseline Newly and Widely available features

The following features became Baseline Newly available in October:

-   [Same-document view transitions](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)
-   [WebRTC encoded transform](https://developer.mozilla.org/docs/Web/API/WebRTC_API/Using_Encoded_Transforms)

Of these two, same-document view transitions landing as Newly available is a big moment for web developers, meaning that more and more of [the view transitions API](https://developer.mozilla.org/docs/Web/API/View_Transition_API) is becoming interoperable. Additionally, we recently published [a post on `URLPattern` becoming Newly available](https://web.dev/blog/baseline-urlpattern) that was authored by YouTube's [Jay Rungta](https://www.linkedin.com/in/jay-rungta/).

And, because time never stops, the following features became Baseline Widely available in October:

-   The [HTML `inert` attribute](https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/inert)
-   The HTML `<canvas>` element [`roundRect` method](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)
-   The HTML `<canvas>` element [`createConicGradient` method](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createConicGradient)

## The Baseline Hackathon concludes

Back in September of 2025, the Chrome Developer Relations team [kicked off the Baseline Hackathon](https://web.dev/blog/baseline-hackathon-2025), which concluded in October. There were 3,000 applicants total, and hundreds of projects submitted all vying for a shot at the $10,000 prize pool.

The hackathon once again proved that the web developer community is both inventive and tenacious when it comes to delivering useful tools—and it wasn't easy to filter through all the tools we saw produced for the Baseline Hackathon to select the winners. Eventually, [three winners were selected](https://web.dev/blog/baseline-hackathon-2025-winners)—and we think you'll find what useful Baseline tools they built. To see the full gallery of eligible submissions, take a look at [the full project gallery](https://baseline.devpost.com/project-gallery).

## Windsurf IDE now supports Baseline

In October, Windsurf—a popular web development IDE derived from Visual Studio Code—released a significant update. As of version 1.100, Windsurf now has built-in Baseline support. This means that Windsurf users will benefit from seeing Baseline compatibility information whenever they hover over HTML and CSS features within their code.

![A Baseline hover card as shown in the Windsurf IDE as the user hovers over a feature.](https://web.dev/static/blog/baseline-digest-oct-2025/image/fig-1.png)

This integration helps streamline the development workflow and reduces the need for context switching when checking web feature support. This functionality ships as a core part of Windsurf, and no additional packages need to be installed to benefit!

## "Web dev and web design" Discord community Baseline bot

The "web dev and web design" Discord community has developed and launched a bot capable of quickly looking up the Baseline status of any web feature. This new tool is already proving useful for developers seeking instant compatibility checks and fostering a more informed discussion around web standards within the community.

![The Baseline bot showing data on a web feature in the web dev and web design Discord community.](https://web.dev/static/blog/baseline-digest-oct-2025/image/fig-2.png)

Web developers switch between many contexts—including those that include chat applications—and the ability for developers to get the information they need within as many of them can be helpful. In this case, developers participating in this Discord community will be able to check web feature interoperability as part of their discussions.

## That's a wrap

That's another eventual month down in 2025 for Baseline—and as the holidays approach, this may be the last Baseline digest with significant developments. As usual, [let us know](https://issuetracker.google.com/issues/new?component=1400680&template=1857359) if we missed anything Baseline-related, and we'll make sure it gets captured in a future edition. See you soon!