---
title: "Introducing Streamdown: Open source Markdown for AI streaming"
source: "https://vercel.com/changelog/introducing-streamdown"
publishedDate: "2025-08-21"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Aug 21, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6dgaMl2ncIYQ3UbGpCusyG%2F5b6dc51053268509cb0d84610d1f9968%2Fstreamdown.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4cCHlHqMZZA7cKWrufoZ71%2F465e9cea4b58b5815f1ce65e731d33ea%2Fstreamdown_dark.png&w=1920&q=75)

Streamdown is a new open source, drop-in Markdown renderer built for AI streaming. It powers the [AI Elements](https://ai-sdk.dev/elements) [Response](https://ai-sdk.dev/elements/components/response) component, but can also be used standalone to give developers a fully composable, independently managed option with `npm i streamdown`.

Streamdown is designed to handle unterminated chunks, interactive code blocks, math, and other cases that are unreliable with existing Markdown packages.

It's available now, and ships with:

-   **Tailwind typography styles:** Preconfigured classes for headings, lists, and code blocks
    
-   **GitHub Flavored Markdown:** Tables, task lists, and other GFM features
    
-   **Interactive code blocks:** Shiki highlighting with built-in copy button
    
-   **Math support:** LaTeX expressions via `remark-math` and KaTeX
    
-   **Graceful chunk handling:** Proper formatting for unterminated Markdown chunks
    
-   **Security hardening:** Safe handling of untrusted content with restricted images and links
    

You can get started with start with AI Elements:

```
npx ai-elements@latest add message
```

Or as a standalone package:

```
npm i streamdown
```

[Read the docs](https://streamdown.ai/) and upgrade your AI-powered streaming.