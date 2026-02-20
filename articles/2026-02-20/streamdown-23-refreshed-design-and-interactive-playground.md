---
title: "Streamdown 2.3 — Refreshed design and interactive playground"
source: "https://vercel.com/changelog/streamdown-2-3"
publishedDate: "2026-02-19"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Feb 19, 2026

Streamdown 2.3 enhances design consistency by applying a unified nested-card design to tables, code blocks, and Mermaid diagrams. Action buttons now remain sticky during scroll, and code blocks render plain text immediately to reduce perceived latency before syntax highlighting loads.

To accelerate testing, the new interactive playground supports real-time execution with custom markdown and editable props. This enables faster experimentation with configuration changes without spinning up a local project.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5QeV7cegQNrlZoZrwRwSjB%2F2b9a2524b6c6b4e0ea847c0819736914%2FCleanShot_2026-02-18_at_16.51.25_2x.png&w=1920&q=75)

New hooks and utilities provide improved control over rendering. The `useIsCodeFenceIncomplete` hook detects in-progress fenced code blocks during streaming. Tables now support copying as Markdown, and a new HTML indentation normalization property handles inconsistent whitespace in raw input. Image rendering also includes improved error handling with custom messaging.

Documentation has been reorganized for easier reference. Plugin documentation for CJK, Math, and Mermaid is now consolidated into dedicated pages, and the redesigned homepage links directly to templates for faster onboarding.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7Jab7ZbhRwlJP0GmeKyrHP%2Febfc1c2daef5f986232920a3d7973675%2FCleanShot_2026-02-18_at_16.55.23_2x.png&w=1920&q=75)

This release also resolves issues with nested HTML block parsing, custom tag handling, Mermaid diagram artifacts, and Shiki syntax engine inconsistencies. Streamdown 2.3 ships with a fully cleared bug backlog.

[Read the documentation](https://streamdown.ai/docs) for more information.