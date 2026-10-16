---
title: "The Baseline Features audit is now available in Lighthouse"
source: "https://web.dev/blog/baseline-lighthouse-features-audit?hl=en"
publishedDate: "2026-07-27"
category: "web-standards"
feedName: "web.dev"
---

## The Baseline Features audit is now available in Lighthouse

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v7.jpg)

Published: July 27, 2026

The [Baseline Features diagnostic audit](https://developer.chrome.com/docs/lighthouse/best-practices/baseline-features) is available in [Lighthouse](https://developer.chrome.com/docs/lighthouse) in the Best Practices audit category. This audit reports the [Baseline](https://web.dev/baseline) status of web platform features detected on a page, providing browser interoperability information directly within Lighthouse reports.

The [`web-features` package](https://www.npmjs.com/package/web-features) powers this audit, which identifies web platform features used on a page, including features in third-party scripts and active browser extensions. It identifies the Baseline status of each detected feature—Widely available, Newly available, or Limited availability—and lets you see where the feature appears in the page source code, with links to web feature entries on [webstatus.dev](https://webstatus.dev/).

The Baseline Features audit is available in the current version of Lighthouse and Chrome DevTools. You can run it on any page in Lighthouse to inspect feature usage and read browser compatibility data.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-07-27 UTC.