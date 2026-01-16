---
title: "When protections outlive their purpose: A lesson on managing defense systems at scale"
source: "https://github.blog/engineering/infrastructure/when-protections-outlive-their-purpose-a-lesson-on-managing-defense-systems-at-scale/"
publishedDate: "2026-01-15"
category: "engineering"
feedName: "GitHub Engineering"
author: "Thomas Kjær Aabo"
---

To keep a platform like GitHub available and responsive, it’s critical to build defense mechanisms. A whole lot of them. Rate limits, traffic controls, and protective measures spread across multiple layers of infrastructure. These all play a role in keeping the service healthy during abuse or attacks.

We recently ran into a challenge: Those same protections can quietly outlive their usefulness and start blocking legitimate users. This is especially true for protections added as emergency responses during incidents, when responding quickly means accepting broader controls that aren’t necessarily meant to be long-term. User feedback led us to clean up outdated mitigations and reinforced that observability is just as critical for defenses as it is for features.

**We apologize for the disruption.** We should have caught and removed these protections sooner. Here’s what happened.

## What users reported

We saw reports on social media from people getting “too many requests” errors during normal, low-volume browsing, such as when following a GitHub link from another service or app, or just browsing around with no obvious pattern of abuse.

![Screenshot of a 'Too many requests' screen encountered by users.](https://github.blog/wp-content/uploads/2026/01/1.png?resize=1024%2C659)

_Users encountered a “Too many requests” error during normal browsing._

These were users making a handful of normal requests hitting rate limits that shouldn’t have applied to them.

## What we found

Investigating these reports, we discovered the root cause: Protection rules added during past abuse incidents had been left in place. These rules were based on patterns that had been strongly associated with abusive traffic when they were created. The problem is that those same patterns were also matching some logged-out requests from legitimate clients.

These patterns are combinations of industry-standard fingerprinting techniques alongside platform-specific business logic — composite signals that help us distinguish legitimate usage from abuse. But, unfortunately, composite signals can occasionally produce false positives.

The composite approach did provide filtering. Among requests that matched the suspicious fingerprints, only about 0.5–0.9% were actually blocked; specifically, those that also triggered the business-logic rules. Requests that matched both criteria were blocked 100% of the time.

![Chart showing percentage of fingerprint matches that were blocked by also triggering business-logic rules, fluctuating between 0.5-0.9% over 60 minutes](https://github.blog/wp-content/uploads/2026/01/2.png?resize=1024%2C509)

_Not all fingerprint matches resulted in blocks — only those also matching business logic patterns._

The overall impact was small but consistent; however, for the customers who were affected, we recognize that any incorrect blocking is unacceptable and can be disruptive. To put all of this in perspective, the following shows the false-positive rate relative to total traffic.

![Chart showing false positives as approximately 0.003-0.004% of total traffic, with a reference line at 100%](https://github.blog/wp-content/uploads/2026/01/3.png?resize=1024%2C508)

_False positives represented roughly 0.003-0.004% of total traffic._

Although the percentage was low, it still meant that real users were incorrectly blocked during normal browsing, which is not acceptable. The chart below zooms in specifically on this false-positive pattern over time.

![Chart showing false positive rate over 60 minutes, hovering around 0.003-0.004%](https://github.blog/wp-content/uploads/2026/01/4.png?resize=1024%2C509)

_In the hour before cleanup, approximately 3-4 requests per 100,000 (0.003-0.004%) were incorrectly blocked._

This is a common challenge when defending platforms at scale. During active incidents, you need to respond quickly, and you accept some tradeoffs to keep the service available. The mitigations are correct and necessary _at that moment_. Those emergency controls don’t age well as threat patterns evolve and legitimate tools and usage change.

Without active maintenance, temporary mitigations become permanent, and their side effects compound quietly.

### Tracing through the stack

The investigation itself highlighted why these issues can persist. When users reported errors, we traced requests across multiple layers of infrastructure to identify where the blocks occurred.

To understand why this tracing is necessary, it helps to see how protection mechanisms are applied throughout our infrastructure. We’ve built a custom, multi-layered protection infrastructure tailored to GitHub’s unique operational requirements and scale, building upon the flexibility and extensibility of open-source projects like HAProxy. Here’s a simplified view of how requests flow through these defense layers _(simplified to avoid disclosing specific defense mechanisms and to keep the concepts broadly applicable)_:

![Diagram showing user requests flowing through multiple infrastructure layers (Edge, Application, Service, Backend), with protection mechanisms at each layer including DDoS protection, rate limits, authentication, and access controls.](https://github.blog/wp-content/uploads/2026/01/5.png?resize=923%2C1024)

Each layer has legitimate reasons to rate-limit or block requests. During an incident, a protection might be added at any of these layers depending on where the abuse is best mitigated and what controls are fastest to deploy.

The challenge: When a request gets blocked, tracing which layer made that decision requires correlating logs across multiple systems, each with different schemas.

In this case, we started with user reports and worked backward:

1.  **User reports** provided timestamps and approximate behavior patterns.
2.  **Edge tier logs** showed the requests reaching our infrastructure.
3.  **Application tier logs** revealed 429 “Too Many Requests” responses.
4.  **Protection rule analysis** ultimately identified which rules matched these requests.

The investigation took us from external reports to distributed logs to rule configurations, demonstrating that maintaining comprehensive visibility into what’s actually blocking requests and where is essential.

### The lifecycle of incident mitigations

Here’s how these protections outlived their purpose:

![Diagram showing incident mitigation lifecycle: control added during incident, works initially, remains active over time without review, eventually blocks legitimate traffic.](https://github.blog/wp-content/uploads/2026/01/6.png?resize=1024%2C115)

Each mitigation was necessary when added. But the controls where we didn’t consistently apply lifecycle management (setting expiration dates, conducting post-incident rule reviews, or monitoring impact) became technical debt that accumulated until users noticed.

## What we did

We reviewed these mitigations, analyzing what each one was blocking today versus what it was meant to block when created. We removed the rules that were no longer serving their purpose, and kept protections against ongoing threats.

## What we’re building

Beyond the immediate fix, we’re improving the lifecycle management of protective controls:

-   Better visibility across all protection layers to trace the source of rate limits and blocks.
-   Treating incident mitigations as temporary by default. Making them permanent should require an intentional, documented decision.
-   Post-incident practices that evaluate emergency controls and evolve them into sustainable, targeted solutions.

Defense mechanisms – even those deployed quickly during incidents – need the same care as the systems they protect. They need observability, documentation, and active maintenance. When protections are added during incidents and left in place, they become technical debt that quietly accumulates.

Thanks to everyone who reported issues publicly! **Your feedback directly led to these improvements.** And thanks to the teams across GitHub who worked on the investigation and are building better lifecycle management into how we operate. Our platform, team, and community are better together!

* * *

## Tags:

-   [developer experience](https://github.blog/tag/developer-experience/)
-   [incident response](https://github.blog/tag/incident-response/)
-   [Infrastructure](https://github.blog/tag/infrastructure/)
-   [observability](https://github.blog/tag/observability/)
-   [site reliability](https://github.blog/tag/site-reliability/)

## Written by

 ![Thomas Kjær Aabo](https://avatars.githubusercontent.com/u/1464954?v=4&s=200)

Thomas is an engineer at GitHub, where he works on the Traffic team.

## Explore more from GitHub

![Docs](https://github.blog/wp-content/uploads/2024/07/Icon-Circle.svg)

### Docs

Everything you need to master GitHub, all in one place.

[Go to Docs](https://docs.github.com/)

![GitHub](https://github.blog/wp-content/uploads/2024/07/Icon_95220f.svg)

### GitHub

Build what’s next on GitHub, the place for anyone from anywhere to build anything.

[Start building](https://github.com/)

![Customer stories](https://github.blog/wp-content/uploads/2024/07/Icon_da43dc.svg)

### Customer stories

Meet the companies and engineering teams that build with GitHub.

[Learn more](https://github.com/customer-stories)

![The GitHub Podcast](https://github.blog/wp-content/uploads/2023/02/galaxy23-icon.svg)

### The GitHub Podcast

Catch up on the GitHub podcast, a show dedicated to the topics, trends, stories and culture in and around the open source developer community on GitHub.

[Listen now](https://the-github-podcast.simplecast.com/)