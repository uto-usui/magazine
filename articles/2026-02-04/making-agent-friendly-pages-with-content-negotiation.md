---
title: "Making agent-friendly pages with content negotiation"
source: "https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation"
publishedDate: "2026-02-03"
category: "frontend"
feedName: "Vercel"
author: "Zach Cowan"
---

2 min read

Feb 3, 2026

Agents browse the web, but they read differently than humans. They don't need CSS, client-side JavaScript, or images. All of that markup fills up their context window and consumes tokens without adding useful information. What agents need is clean, structured text.

That's why we've updated our blog and changelog pages to make markdown accessible to agents while still delivering a full HTML and CSS experience to human readers. This works through content negotiation, an HTTP mechanism where the server returns different formats for the same content based on what the client requests. No duplicate content or separate sites.

## [Link to heading](#how-agents-request-content-)How agents request content 

Agents use the HTTP `Accept` header to specify what formats they prefer. Claude Code, for example, sends this header when fetching pages:

`Accept: text/markdown, text/html, */*`

By listing `text/markdown` first, the agent signals that markdown is preferred over HTML when available. Many agents are starting to explicitly prefer markdown this way.

Try it out by sending a curl request:

```
curl https://vercel.com/blog/self-driving-infrastructure -H "accept: text/markdown"
```

Our middleware examines the `Accept` header on incoming requests and detects these preferences. When markdown is preferred, it routes the request to a Next.js route handler that converts our Contentful rich-text content into markdown.

This transformation preserves the content's structure. Code blocks keep their syntax highlighting markers, headings maintain their hierarchy, and links remain functional. The agent receives the same information as the HTML version, just in a format optimized for token efficiency.

## [Link to heading](#performance-benefits)**Performance benefits**

A typical blog post weighs 500KB with all the HTML, CSS, and JavaScript. However, the same content as markdown is only 2KB. That's a 99.6% reduction in payload size.

For agents operating under token limits, smaller payloads mean they can consume more content per request and spend their budget on actual information instead of markup. They work faster and hit limits less often.

We maintain synchronization between HTML and markdown versions using [Next.js 16 remote cache](https://nextjs.org/docs/app/api-reference/directives/use-cache-remote) and shared slugs. When content updates in Contentful, both versions refresh simultaneously.

## [Link to heading](#how-agents-discover-available-content)**How agents discover available content**

Agents need to discover what's available. We implemented a markdown sitemap that lists all content in a format optimized for agent consumption. The sitemap includes metadata about each piece, including publication dates, content types, and direct links to both HTML and markdown versions. This gives agents a complete map of available information and lets them choose the format that works best for their needs.

Want to see this in action? Add `.md` to the end of this page's URL to [get the markdown version](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation.md).