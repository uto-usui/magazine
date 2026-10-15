---
title: "Find features to support for Interop 2027 with your coding agent"
source: "https://web.dev/blog/coding-agents-interop-proposals?hl=en"
publishedDate: "2026-09-18"
category: "web-standards"
feedName: "web.dev"
---

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v7.jpg)

Published: September 18, 2026

Web developers spend a lot of time maintaining legacy code that they'd rather replace with better solutions using modern and interoperable web features. While more features are becoming [Baseline](https://web.dev/baseline) all the time, there are still features that can be landed to solve developer needs.

[Interop 2027](https://web.dev/blog/interop-2027-proposals) is under way. That means you have a chance to let browser vendors know what web features will help you most in your day-to-day work—**but the proposal period ends on September 23rd**.

Rather than scroll through pages of GitHub issues to find features to upvote or propose, your coding agent in your terminal or IDE can help you find web feature gaps in your current project. The following is a sample prompt you can use to find features:

```
Audit this codebase for Interop 2027 alignment:

1.  **Scan the Project**:
   -   Run a Lighthouse "Baseline Features" audit using DevTools MCP.
   -   Scan files for polyfills, wrapper libs, `@supports` blocks, and custom JS workarounds.

2.  **Match open proposals**:
    -   Fetch open proposals using `gh issue list -R web-platform-tests/interop -l focus-area-proposal -s open`.
    -   List proposals that directly match features used or would be using if not for compat issues.

3.  **Find Unproposed Gaps**:
    -   Identify platform features we need that lack an Interop 2027 proposal.
    -   Verify each candidate has a stable spec (W3C/WHATWG), ≥1 engine implementation, WPT tests, and no vendor blockers.
    -   Refer to https://github.com/web-platform-tests/interop/blob/main/proposal_guide.md for more information on what makes a good proposal.

**Output**: A summary table of **Proposals to Upvote** (with estimated code/libs eliminated) and **Vetted Features to Propose** (with spec/WPT links). Sort both tables by highest impact in descending order, with impact measured as estimated code/libs eliminated.
```

When you run this prompt, your agent analyzes web feature usage in your project, and analyzes what it finds against the list of [open Interop proposals](https://github.com/web-platform-tests/interop/issues?q=is%3Aissue%20state%3Aopen%20label%3Afocus-area-proposal). The agent's output will tell you:

1.  **Currently used features:** These will include web feature IDs for each feature (such as [async-clipboard](https://webstatus.dev/features/async-clipboard), for example), Baseline status, potential occurrences in your codebase, and any detected polyfills or other areas where usage of features are gated.
2.  **Proposals to upvote**: A list of features relevant to your codebase which have current interop proposals you can upvote. This is the optimal outcome; if you see a feature in this list that's useful for your project, upvote it!
3.  **Features to propose**: These are features relevant to your project that likely don't have an existing proposal, which means you can propose it yourself. To do so, read about [what makes a good proposal](https://web.dev/blog/interop-2027-proposals#what_makes_a_good_project_proposal), then read [the proposal guide](https://github.com/web-platform-tests/interop/blob/main/proposal_guide.md) in the Interop repository. If the feature fits the proposal criteria, [file an issue in the repo](https://github.com/web-platform-tests/interop/issues/new/choose). If you do, be sure to select **Focus area proposal**. Also note that [the proposal submission rules](https://github.com/web-platform-tests/interop/blob/main/.github/ISSUE_TEMPLATE/focus-area-proposal.yml) require that proposals be written by humans.

Interop 2027 is an opportunity for developers to shape the future of the web platform by highlighting the features and fixes that matter most to their daily workflows. Your coding agent can make it easier than before to discover and advocate for the features you care most about. Submit or upvote proposals before the September 23rd deadline!