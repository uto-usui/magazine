---
title: "How we’re adapting SEO for LLMs and AI search"
source: "https://vercel.com/blog/how-were-adapting-seo-for-llms-and-ai-search"
publishedDate: "2025-06-10"
category: "frontend"
feedName: "Vercel"
author: "Kevin Corbett"
---

7 min read

Jun 10, 2025

Search is changing. Backlinks and keywords aren’t enough anymore. AI-first interfaces like ChatGPT and Google’s AI Overviews now answer questions before users ever click a link (if at all). Large language models (LLMs) have become a new layer in the discovery process, reshaping how, where, and when content is seen.

This shift is changing how visibility works. It’s still early, and nobody has all the answers. But one pattern we're noticing is that LLMs tend to favor content that explains things clearly, deeply, and with structure.

"LLM SEO" isn’t a replacement for traditional search engine optimization (SEO). It’s an adaptation. For marketers, content strategists, and product teams, this shift brings both risk and opportunity. How do you show up when AI controls the first impression, but not lose sight of traditional ranking strategies?

Here’s what we’ve noticed, what we’re trying, and how we’re adapting.

## [Link to heading](#why-search-changed)Why search changed

AI interfaces now answer many queries directly, often without a single click. Questions like _"How do I write this API request?"_ are resolved inline. These zero-click answers are changing how people search and how content gets seen.

ChatGPT now refers [around 10% of new Vercel signups](https://x.com/rauchg/status/1910093634445422639). That's up from 4.8% the previous month, and 1% six months ago. Others are noticing changes too. [Tally saw AI search become their biggest acquisition channel](https://x.com/MarieMartens/status/1932355206550851903). ChatGPT and Perplexity now drive the majority of their new signups, helping them grow from $2M to $3M ARR in just four months.

However, not all AI-driven results translate to views. Some [research suggests that Google's AI Overviews may reduce clicks](https://ahrefs.com/blog/ai-overviews-reduce-clicks/) by as much as 34.5% compared to similar searches without an AI Overview.

Search isn’t just about ranking anymore. It’s about being surfaced in new places, under new rules.

## [Link to heading](#balancing-traditional-seo-and-llm-seo)Balancing traditional SEO and LLM SEO

The shift from link-building to concept clarity changes how we approach content. Traditional and LLM SEO serve different systems, but you can't neglect one for the other. To be found by people and machines, you need to support both.

**Don't abandon traditional SEO.** Leverage the foundational concepts and add depth and breadth.

This starts with understanding where the strategies diverge, and where they overlap.

**Traditional SEO**

**LLM SEO / AI SEO**

**Both**

Backlinks

Embedding-based relevance

Crawlable, indexable pages

Volume-based keywords

Natural-language queries

Clear heading hierarchy (H1 → H2 → H3)

Search engine results page rankings (SERP)

Visibility in Retrieval-Augmented Generation (RAG) indexes

Fresh, regularly updated content

Anchor text optimization

Concept clarity and ownership

Schema markup (TechArticle, FAQPage, etc.)

Meta descriptions

Self-contained, extractable snippets

Internal linking across related topics

Link equity

Community mentions (GitHub, Reddit, etc)

Fast, static HTML/CSS pages

Click-through rate (CTR) optimization

Semantic depth and originality

High-intent, decision-stage content

Depth and clarity matter more than repetition or scale. LLMs don’t match keywords; they interpret meaning. Stuffing keywords or swapping synonyms has little impact if the content lacks substance. Models surface the clearest, most semantically rich explanation, not the one that says it the most.

Legacy tactics like keyword stuffing or hidden text might still exist in training data, but they don’t help. At best, they’re ignored. At worst, they muddy your signal or hurt traditional SEO performance.

The brands that succeed will create content that is structured, original, and relevant. Built for both human searchers and the models guiding them.

## [Link to heading](#how-llms-read-and-process-content)How LLMs read and process content

To improve how content is surfaced, we need to understand how AI systems interpret it. Many use RAG, which fetches external information at runtime. ChatGPT, Copilot, and Meta AI use Bing’s index. Google uses its own. Perplexity uses a mix. In all cases, your content must be crawlable, structured, and easy to interpret.

﻿Beyond retrieval, models also rely on what they’ve learned during training, encoded as high-dimensional embeddings that represent relationships between words and concepts. This allows them to reason about concepts even without exact keyword matches.

RAG adds current or specific context by retrieving content that closely aligns with a query’s intent. In this system, clarity, depth, and originality matter more than keyword density or backlinks.

## [Link to heading](#what-llms-actually-reward)What LLMs actually reward

LLM SEO is the art of becoming the answer. It means owning a concept with depth, structuring for retrieval, earning citations, and keeping it fresh and reliable.

This doesn’t happen quickly. It takes intentional effort across your content pipeline. What matters is how clearly, consistently, and originally a concept is defined. Structure, ranking, and indexability still matter. You need to support both real-time retrieval and long-term inclusion in training data. When done well, these efforts reinforce each other.

Here are the principles and practices we use to create balanced content that AI systems understand and human readers find useful.

### [Link to heading](#find-a-frontier-concept)Find a frontier concept

LLMs favor the first or clearest explanation of a concept. If you're early, your version may become the default. If not, aim to be the most definitive.

Identify low-competition, high-opportunity topics where you can become the source.

-   Monitor Twitter/X, Reddit, GitHub, Discord, and forums for emerging questions
    
-   Find gaps where competitors are shallow or absent
    
-   Find topics that match your company or product strengths
    
-   Share original data, benchmarks, customer stories, or insights that are hard to copy
    
-   Start with what your users are already asking for
    

### [Link to heading](#publish-the-definitive,-evidence-based-source)Publish the definitive, evidence-based source

Once you’ve found your angle, go deep. Generic summaries are often skipped. LLMs prefer substance and infer authority from depth. Include original data, code, expert quotes, or stories that others can’t easily copy.

-   Go beyond surface-level coverage
    
-   Include metrics, code blocks, tables, lists, quotes, and diagrams
    
-   Use precise, consistent terminology. Fuzzy synonyms weaken embeddings
    
-   Write for extraction. Short, self-contained insights are more likely to be cited
    
-   Aim to be the canonical source in your niche
    

**The litmus test**: Ask yourself, _"Could a competitor easily replicate this tomorrow?"_ If the answer is yes, dig deeper.

### [Link to heading](#structure-for-machines)Structure for machines

Structure helps models understand what your content is and when to surface it. Even if indexed, a page may be skipped if meaning isn’t clear or the layout is hard to parse.

Make intent obvious in both markup and layout:

-   Use consistent terminology and clean heading hierarchies (H1 → H2 → H3)
    
-   Add [Schema.org](https://schema.org/) or [JSON-LD](https://json-ld.org/) markup to reinforce meaning
    
-   Use semantic elements where possible. Callouts, glossary terms, nav sections with clear class names or ARIA labels
    
-   Use semantic HTML like definition lists, tables, and other semantic HTML elements to enhance structure
    
-   Confirm indexability in Bing and Google
    
-   [Most AI crawlers fetch but do not execute JavaScript](https://vercel.com/blog/the-rise-of-the-ai-crawler#javascript-rendering-capabilities). Use [Server-Side Rendering (SSR), Static Site Generation (SSG), or Incremental Static Regeneration (ISR)](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app) to expose static HTML
    
-   With [Next.js](https://nextjs.org/) and Vercel, serve pages on demand without full rebuilds to keep content fresh and accessible
    

The goal isn’t to trick the system. It’s to make your intent as clear to machines as it is to humans.

### [Link to heading](#seed-authentic-citations)Seed authentic citations

LLMs learn from the web. Guide the conversation. For training influence, community mentions matter. They help models associate your brand with a concept. If people cite you, models often follow. For retrieval, backlinks and indexability still remain critical.

-   Share in threads, AMAs, changelogs, and product demos
    
-   Create open-source resources or real examples others can reference
    
-   Build topic clusters with interlinked articles to reinforce relationships
    
-   Focus on high-signal, indexable channels: Reddit, GitHub, Hacker News, Twitter/X, LinkedIn, Stack Overflow
    
-   Avoid paid links. Organic citations carry more weight in training data
    

### [Link to heading](#set-a-refresh-cadence)Set a refresh cadence

[Models re-crawl the web regularly](https://vercel.com/blog/the-rise-of-the-ai-crawler#scale-and-distribution). Over time, stale content becomes less useful. To both people and AI systems. Even if a page is indexed, it may stop being retrieved or referenced if it’s no longer accurate or relevant.

In retrieval-based systems, newer, higher-ranking content is more likely to be included. Keeping content fresh improves your chances of being surfaced and cited.

Regular maintenance matters:

-   Fix 404s, update `lastmod`, and keep your sitemap clean
    
-   Review content at 30, 90, and 180 days
    
-   Refresh what’s stale, expand what’s working
    
-   Archive outdated pages (with redirects)
    
-   Close gaps as competitors catch up
    

Consistent upkeep keeps content relevant and signals to both users and models that your information can be trusted.

## [Link to heading](#tracking-ai-impact)Tracking AI impact

Measuring visibility in AI systems is still an evolving challenge. There’s no reliable dashboard showing if your content appears in answers or is embedded in training data. However, there are some signals to watch:

-   **Source citations:** Perplexity, Google AI Overviews, ChatGPT, and others sometimes show sources inline. Search your domain or key topics to check visibility
    
-   **Referrer traffic:** Use [web analytics](https://vercel.com/docs/analytics) and [observability](https://vercel.com/docs/observability) tools to track visits from chat.openai.com, perplexity.ai, bard.google.com, claude.ai, and more
    
-   **Mentions and links:** LLMs often echo what real people cite. Watch for references on community forums, social media, and blogs. Tools like Ahrefs, Mention, or Semrush can help too. Repeated phrasing hints at influence
    
-   **Index coverage:** Retrieval requires discoverability. Use Google Search Console and Bing Webmaster Tools to track indexing and rank for key concepts. Make sure `robots.txt` allows crawlers and maintain a clean, accurate sitemap. Prioritize good [Core Web Vitals scores](https://vercel.com/docs/speed-insights) for performant indexing
    

Attribution isn’t always clean, but traffic from AI referrers often reflects users who’ve already asked a question, seen an answer, and are now acting on it. That behavior matters more than volume.

No single metric confirms usage. But together, these patterns give useful signals to inform what to create, maintain, and prioritize while better tooling emerges.

## [Link to heading](#final-thoughts)Final thoughts

There’s no shortcut to LLM SEO. Concept ownership isn’t built in a week. It’s a strategic moat that takes discipline and a new mindset to build. We’re moving from search ranking to answer shaping.

You’re not just optimizing for humans. You’re also optimizing for models that decide what humans see. That means going deeper, being clearer, and creating content that models can learn from and surface.

Traditional SEO still matters. Speed, structure, and indexability are foundational to both. Stay balanced. This space is evolving quickly. While Bing is critical today, Google, Perplexity, DuckDuckGo, and private RAG systems are also shaping AI discovery.

Don't optimize in isolation, and don’t chase hype. Call it LLM SEO, Language Engine Optimization (LEO), Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), or AI SEO, the goal is the same: Own a concept clearly, consistently, and with the right structure so models understand it well.