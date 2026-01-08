---
title: "Vote for the web features you want to see"
source: "https://web.dev/blog/upvote-features?hl=en"
publishedDate: "2025-12-11"
category: "web-standards"
feedName: "web.dev"
---

![Rick Viscomi](https://web.dev/images/authors/rviscomi.jpg)

Published: December 11, 2025

Have you ever found yourself checking Can I Use, seeing all that red for a feature you're dying to use, and wishing you could just poke the browser vendors and say, "Hey, I need this!"?

Well, now you can.

The WebDX Community Group is launching a new way for you to directly signal which web features are most important to you. Now, you can **upvote** the features you want to see become interoperable across major browsers.

Starting today, you can find these upvotes integrated here on web.dev as well as [caniuse.com](https://caniuse.com/) and [webstatus.dev](https://webstatus.dev/). Other platforms like MDN are investigating similar integrations.

## How it works

When you're looking up browser support for a feature, keep an eye out for the "Upvote" button. For example, here's the widget for the `:has-slotted` feature:

Clicking that button will take you to a specific issue in the [web-platform-dx/developer-signals](https://github.com/web-platform-dx/developer-signals/issues?q=is:issue+state:open+sort:reactions-%2B1-desc+label:feature) repository on GitHub, where most Limited availability features are tracked. From there, casting your vote is quick: **just add a 👍 reaction to the issue description.**

### More than just a thumbs up

A thumbs up shows demand, but context drives understanding. If a feature is critical to your workflow, we want to know _why_.

Are you relying on a heavy polyfill? Are you hacking together a workaround that breaks accessibility? Or are you just avoiding the feature entirely because support is spotty?

Leave a comment on the issue sharing your specific use case. Browser engineers read these to understand the real-world friction you're facing.

## "Wait, didn't I just do this for Interop 2025?"

If you've participated in the Interop selection process or the _State of HTML/CSS/JS_ surveys, this might sound familiar. Those annual traditions aren't going anywhere. Instead, this new channel is designed to augment that data in a more evergreen way:

-   **Always on:** Interop proposals and annual surveys happen during a specific window. This new signal channel is open year-round. You can vote the exact moment you hit a roadblock, not months later when you might have forgotten about it.
    
-   **No resets:** Unlike Interop, where proposals often reset annually, your votes here **roll over**. If a feature doesn't get picked up immediately, your signal persists and continues to grow over time.
    
-   **Zero friction:** Nearly every non-Baseline feature already has a tracking issue. You don't need to write a formal proposal or spec; you just need to click a button.
    

## Does the feature with the most votes win?

That would be fun, but no—browser development isn't a popularity contest.

Browser vendors have to balance a massive number of factors: security, privacy, architectural complexity, device constraints, and existing standards positions.

However, **developer demand is a huge factor in prioritization**. When vendors are deciding what to put on their roadmap, being able to point to a feature and say, "lots of developers are actively asking for this," moves the needle.

For a great example of this, Chrome [recently announced](https://groups.google.com/a/chromium.org/g/blink-dev/c/WjCKcBw219k/m/NmOyvMCCBAAJ) how developer signals like these factored into the decision to welcome JPEG XL contributions in Chromium:

> Since JPEG XL was last evaluated, Safari has shipped support and Firefox has updated their position. We also continue to see developer signals for this in bug upvotes, Interop proposals, and survey data\[...\] Given these positive signals, we would welcome contributions to integrate a performant and memory-safe JPEG XL decoder in Chromium.

Rick Byers, on behalf of Chrome tech leads in the [Intent to Prototype: JPEG XL](https://groups.google.com/a/chromium.org/g/blink-dev/c/WjCKcBw219k/m/NmOyvMCCBAAJ) thread on blink-dev

## Start voting today

This is your chance to help shape the web platform.

1.  Keep an eye out for the upvote buttons on sites like web.dev, webstatus.dev, and caniuse.com.
    
2.  Click the buttons or head directly to the [developer-signals repo](https://github.com/web-platform-dx/developer-signals/issues?q=is:issue+state:open+sort:reactions-%2B1-desc+label:feature) to browse open features.
    
3.  **Vote (👍)** and **Comment** on the features that matter to you.
    

Just remember to follow the [Code of Conduct](https://github.com/web-platform-dx/developer-signals/blob/main/CODE_OF_CONDUCT.md), stay on topic, and be kind to one another. We're all building the web together—let's make sure we're building the parts that matter most.