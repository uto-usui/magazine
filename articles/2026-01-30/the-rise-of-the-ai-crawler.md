---
title: "The rise of the AI crawler"
source: "https://vercel.com/blog/the-rise-of-the-ai-crawler"
publishedDate: "2024-12-17"
category: "frontend"
feedName: "Vercel"
author: "Giacomo Zecchini"
---

5 min read

Dec 17, 2024

Real-world data from MERJ and Vercel shows distinct patterns from top AI crawlers.

AI crawlers have become a significant presence on the web. OpenAI's GPTBot generated 569 million requests across Vercel's network in the past month, while Anthropic's Claude followed with 370 million. **For perspective, this combined volume represents about 20% of Googlebot's 4.5 billion requests during the same period.**

After [analyzing how Googlebot handles JavaScript rendering](https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process) with [MERJ](https://merj.com/), we turned our attention to these AI assistants. Our new data reveals how Open AI’s ChatGPT, Anthropic’s Claude, and other AI tools crawl and process web content.

We uncovered clear patterns in how these crawlers handle JavaScript, prioritize content types, and navigate the web, which directly impact how AI tools understand and interact with modern web applications.

## [Link to heading](#data-collection-process)Data collection process

Our primary data comes from monitoring `nextjs.org` and the Vercel network for the past few months. To validate our findings across different technology stacks, we also analyzed two job board websites: [Resume Library](https://www.resume-library.com/), built with Next.js, and [CV Library](https://www.cv-library.co.uk/), which uses a custom monolithic framework. This diverse dataset helps ensure our observations about crawler behavior are consistent across different web architectures.

For more details on how we collected this data, [see our first article](https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process).

Note: Microsoft Copilot was excluded from this study as it lacks a unique user agent for tracking.

## [Link to heading](#scale-and-distribution)Scale and distribution

The volume of AI crawler traffic across Vercel's network is substantial. In the past month:

-   Googlebot: 4.5 billion fetches across Gemini and Search
    
-   GPTBot (ChatGPT): 569 million fetches
    
-   Claude: 370 million fetches
    
-   AppleBot: 314 million fetches
    
-   PerplexityBot: 24.4 million fetches
    

While AI crawlers haven't reached Googlebot's scale, they represent a significant portion of web crawler traffic. For context, GPTBot, Claude, AppleBot, and PerplexityBot combined account for nearly 1.3 billion fetches—a little over 28% of Googlebot's volume.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6u9fWREKIJUpqCe8NoOsj7%2Fb7238c07caf9f6692e2d36f200f68486%2Fai-crawler-traffic-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1oJMXDcXebiuw2HoOrHUGF%2F861d02e5d4ca21e3b12f31d1edc0344b%2Fai-crawler-traffic-dark.png&w=1920&q=75)

### [Link to heading](#geographic-distribution)Geographic distribution

All AI crawlers we measured operate from U.S. data centers:

-   ChatGPT: Des Moines (Iowa), Phoenix (Arizona)
    
-   Claude: Columbus (Ohio)
    

In comparison, traditional search engines often distribute crawling across multiple regions. For example, Googlebot operates from seven different U.S. locations, including The Dalles (Oregon), Council Bluffs (Iowa), and Moncks Corner (South Carolina).

## [Link to heading](#javascript-rendering-capabilities)JavaScript rendering capabilities

Our analysis shows a clear divide in JavaScript rendering capabilities among AI crawlers. To validate our findings, we analyzed both Next.js applications and traditional web applications using different tech stacks.

The results consistently show that none of the major AI crawlers currently render JavaScript. This includes:

-   OpenAI (OAI-SearchBot, ChatGPT-User, GPTBot)
    
-   Anthropic (ClaudeBot)
    
-   Meta (Meta-ExternalAgent)
    
-   ByteDance (Bytespider)
    
-   Perplexity (PerplexityBot)
    

The results also show:

-   Google's Gemini leverages Googlebot's infrastructure, enabling full JavaScript rendering.
    
-   AppleBot renders JavaScript through a browser-based crawler, similar to Googlebot. It processes JavaScript, CSS, Ajax requests, and other resources needed for full-page rendering.
    
-   Common Crawl (CCBot), which is often used as a training dataset for Large Language Models (LLMs) does not render pages.
    

The data indicates that while ChatGPT and Claude crawlers do _fetch_ JavaScript files (ChatGPT: 11.50%, Claude: 23.84% of requests), they don't _execute_ them. They can't read client-side rendered content.

Note, however, that content included in the initial HTML response, like JSON data or delayed React Server Components, may still be indexed since AI models can interpret non-HTML content.

In contrast, Gemini's use of Google's infrastructure gives it the same rendering capabilities we documented in our [Googlebot analysis](https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process), allowing it to process modern web applications fully.

## [Link to heading](#content-type-priorities)Content type priorities

AI crawlers show distinct preferences in the types of content they fetch on `nextjs.org`. The most notable patterns:

-   ChatGPT prioritizes HTML content (57.70% of fetches)
    
-   Claude focuses heavily on images (35.17% of total fetches)
    
-   Both crawlers spend significant time on JavaScript files (ChatGPT: 11.50%, Claude: 23.84%) despite not executing them
    

For comparison, Googlebot's fetches (across Gemini and Search) are more evenly distributed:

-   31.00% HTML content
    
-   29.34% JSON data
    
-   20.77% plain text
    
-   15.25% JavaScript
    

These patterns suggest AI crawlers collect diverse content types—HTML, images, and even JavaScript files as text—likely to train their models on various forms of web content.

While traditional search engines like Google have optimized their crawling patterns specifically for search indexing, newer AI companies may still be refining their content prioritization strategies.

## [Link to heading](#crawling-\(in\)efficiency)Crawling (in)efficiency

Our data shows significant inefficiencies in AI crawler behavior:

-   ChatGPT spends 34.82% of its fetches on 404 pages
    
-   Claude shows similar patterns with 34.16% of fetches hitting 404s
    
-   ChatGPT spends an additional 14.36% of fetches following redirects
    

Analysis of 404 errors reveals that, excluding `robots.txt`, these crawlers frequently attempt to fetch outdated assets from the `/static/` folder. This suggests a need for improved URL selection and handling strategies to avoid unnecessary requests.

These high rates of 404s and redirects contrast sharply with Googlebot, which spends only 8.22% of fetches on 404s and 1.49% on redirects, suggesting Google has spent more time optimizing its crawler to target real resources.

## [Link to heading](#traffic-correlation-analysis)Traffic correlation analysis

Our analysis of traffic patterns reveals interesting correlations between crawler behavior and site traffic. Based on data from `nextjs.org`:

-   Pages with higher organic traffic receive more frequent crawler visits
    
-   AI crawlers show less predictable patterns in their URL selection
    
-   High 404 rates suggest AI crawlers may need to improve their URL selection and validation processes, though the exact cause remains unclear
    

While traditional search engines have developed sophisticated prioritization algorithms, AI crawlers are seemingly still evolving their approach to web content discovery.

> Our research with Vercel highlights that AI crawlers, while rapidly scaling, continue to face significant challenges in handling JavaScript and efficiently crawling content. As the adoption of AI-driven web experiences continues to gather pace, brands must ensure that critical information is server-side rendered and that their sites remain well-optimized to sustain visibility in an increasingly diverse search landscape.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6yWoQt4Te8YDK9mpwvcCmJ/5dfa5eb974d59d8189b8c69881455522/avatar)
> 
> **Ryan Siddle,** Managing Director of MERJ

## [Link to heading](#recommendations)Recommendations

### [Link to heading](#for-site-owners-who-want-to-be-crawled)For site owners who want to be crawled

-   **Prioritize server-side rendering for critical content.** ChatGPT and Claude don't execute JavaScript, so any important content should be server-rendered. This includes main content (articles, product information, documentation), meta information (titles, descriptions, categories), and navigation structures. [SSR, ISR, and SSG](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app) keep your content accessible to all crawlers.
    
-   **Client-side rendering still works for enhancement features.** Feel free to use client-side rendering for non-essential dynamic elements like view counters, interactive UI enhancements, live chat widgets, and social media feeds.
    
-   **Efficient URL management matters more than ever.** The high 404 rates from AI crawlers highlight the importance of maintaining proper redirects, keeping sitemaps up to date, and using consistent URL patterns across your site.
    

### [Link to heading](#for-site-owners-who-don't-want-to-be-crawled)For site owners who don't want to be crawled

-   **Use** **`robots.txt`** **to control crawler access.** The `robots.txt` file is effective for all measured crawlers. Set specific rules for AI crawlers by specifying their user agent or product token to restrict access to sensitive or non-essential content. To find the user agents to disallow, you’ll need to look in each company’s own documentation (for example, [Applebot](https://support.apple.com/en-us/119829) and [OpenAI’s crawlers](https://platform.openai.com/docs/bots)).
    
-   **Block AI crawlers with Vercel's WAF.** Our [Block AI Bots Firewall Rule](https://vercel.com/templates/vercel-firewall/block-ai-bots-firewall-rule) lets you block AI crawlers with one click. This rule automatically configures your firewall to deny their access.
    

### [Link to heading](#for-ai-users)For AI users

-   **JavaScript-rendered content may be missing.** Since ChatGPT and Claude don't execute JavaScript, their responses about dynamic web applications may be incomplete or outdated.
    
-   **Consider the source.** High 404 rates (>34%) mean that when AI tools cite specific web pages, there's a significant chance those URLs are incorrect or inaccessible. For critical information, always verify sources directly rather than relying on AI-provided links.
    
-   **Expect inconsistent freshness.** While Gemini leverages Google's infrastructure for crawling, other AI assistants show less predictable patterns. Some may reference older cached data.
    

Interestingly, even when asking Claude or ChatGPT for fresh Next.js docs data, we often don't see immediate fetches in our server logs for `nextjs.org`. This suggests that AI models may rely on cached data or training data, even when they claim to have fetched the latest information.

## [Link to heading](#final-thoughts)Final thoughts

Our analysis reveals that AI crawlers have quickly become a significant presence on the web, with nearly 1 billion monthly requests across Vercel's network.

However, their behavior differs markedly from traditional search engines, when it comes to rendering capabilities, content priorities, and efficiency. Following established web development best practices—particularly around content accessibility—remains crucial.