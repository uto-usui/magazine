---
title: "The three types of AI bot traffic and how to handle them"
source: "https://vercel.com/blog/the-three-types-of-ai-bot-traffic-and-how-to-handle-them"
publishedDate: "2025-08-13"
category: "frontend"
feedName: "Vercel"
author: "Kevin Corbett"
---

5 min read

Aug 13, 2025

AI bot traffic is growing across the web. We [track this in real-time](https://bots.fyi/stats), and the data reveals three types of AI-driven crawlers that often work independently but together create a discovery flywheel that many teams disrupt without realizing it.

Not all bots are harmful. Crawlers have powered search engines for decades, and we've spent just as long optimizing for them. Now, large language models (LLMs) need training data, and the AI tools built on them need timely, relevant updates. This is the next wave of discoverability and getting it right from the start can determine whether AI becomes a growth channel or a missed opportunity.

Blocking AI crawlers today is like blocking search engines in the early days and then wondering why organic traffic vanishes. As users shift from Googling for web pages to prompting for direct answers and cited sources, the advantage will go to sites that understand each type of bot and choose where access creates value.

## [Link to heading](#the-three-types-of-ai-bot-traffic)The three types of AI bot traffic

When we say “AI bot traffic,” we mean automated crawlers built to train, update, or run AI systems, not just spammy scrapers. They visit your site to collect content for model training, fetch real-time updates, or deliver AI-driven referrals.

Think of AI traffic as a pipeline with distinct stages. Your content is not crawled once and forgotten. Each stage builds on the last until it reaches a user. If you block crawlers, your content will not enter the training data. Without training data, it cannot be cited. Without citations, you will not receive referrals.

Did you know bots made up more than 20% of all traffic across Vercel deployments last week? About a quarter of that came from AI crawlers alone. Some of this is malicious and blocked automatically, but much of it drives discovery and growth when handled well.

### [Link to heading](#ai-training-crawlers-scan-everything)AI training crawlers scan everything

AI training crawlers have a goal to capture a wide and current view of the web so the information can be built into future AI responses. This content becomes part of what these models “know” about your product. These crawlers, such as GPTBot and ClaudeBot visit nearly every public page they can access. That includes documentation, blog posts, product pages, pricing, and changelogs.

In our bot traffic dataset last week, training crawlers made up the largest share of AI bot traffic as they don't just revisit popular pages, they aim to cover the full breadth of a site so they can store as much relevant material as possible.

For an e-commerce site, if you publish detailed product descriptions, a training crawler can store them so an AI model can later answer “Where can I buy X?” and link to your store. Without being indexed, your docs will never make it into those answers.

### [Link to heading](#ai-engine-grounding-bots-fetch-real-time-updates)AI engine grounding bots fetch real-time updates

Grounding crawlers run when a user’s question needs current information that might not be in the training data. When someone asks ChatGPT “What’s new in Next.js 15?”, or Perplexity “Which startups are building in AI infrastructure?”, these systems check both their training data and live websites for updates.

If your content is in the training set, the system can reference it in responses. Without it, the system has nothing to reference, making citations unlikely. Out of sight often means out of mind.

Even a single well-indexed page can generate [hundreds or thousands of mentions](https://x.com/rauchg/status/1910093634445422639) across different queries.

**Example**: A blog post announcing a new feature can be fetched by grounding bots within days of publication, letting the AI recommend your product to users searching for related tools much faster.

### [Link to heading](#ai-referrals-bring-high-intent-visitors)AI referrals bring high-intent visitors

AI referrals are human visitors who click through from AI-generated responses to your site. They often arrive after a highly relevant prompt led to a response that cited your content, so they already know what they are looking for and are ready to act. Many convert at higher rates after seeing a tailored summary or recommendation.

In our network data, AI referrals still trail traditional search referrals in total volume but continue to grow each month. Some sites report higher conversion rates from this group than from organic search visitors.

**Example**: If an AI platform suggests your product in a list of “the best platforms for serverless deployment” and the user clicks through, they often arrive ready to evaluate or purchase.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3nSCgj18jZrGA7TegHGDj8%2F75c59be4c95e7925a8cbe2afe593fc9c%2FIMG_3043.png&w=1920&q=75)

## [Link to heading](#why-blocking-ai-crawlers-backfires)**Why blocking AI crawlers backfires**

Some websites once blocked Google’s crawlers, thinking bots wasted bandwidth. "Why should I let Google crawl my site for free?" Those sites missed the search boom. Today, developers are making the same mistake with AI crawlers.

AI-powered search already handles billions of queries. Users now discover content through AI platforms alongside traditional search. Blocking AI crawlers cuts off a growing discovery channel, and these channels are an integral part of the source material AI systems draw from when generating answers, recommendations, and comparisons.

Compare this to traditional SEO, where you're competing for one of ten blue links. With AI systems, your content can surface across countless user queries.

## [Link to heading](#when-to-block-ai-crawlers,-without-hurting-discoverability)**When to block AI crawlers, without hurting discoverability**

There are legitimate cases for restricting AI crawlers. If your content is your product (news sites, educational platforms, premium research), then unlimited AI access might cannibalize your business model. But even beyond that, different pages serve different purposes.

Crawler access should be selective, allowing only the pages that benefit your discoverability.  
For example, you may want to:

-   Block AI crawlers from sensitive routes like `/login`, `/checkout`, `/admin`, and user dashboards. These pages provide no value for training data and do little to improve discoverability
    
-   Allow crawlers on discovery content such as documentation, blog posts, landing pages, product pages, and pricing pages. This is where being cited or recommended can drive traffic and increase brand visibility
    

The best approach is to protect pages that neither explain your product nor answer likely user queries in AI tools, while keeping high-value discovery content open. Tools like [Vercel Firewall](https://vercel.com/docs/vercel-firewall), [Bot Protection](https://vercel.com/blog/one-click-bot-protection-now-in-public-beta), and [BotID](https://vercel.com/docs/botid) can help verify legitimate crawlers, block impersonators, and filter suspicious traffic without shutting down AI-driven discovery.

## [Link to heading](#ai-crawlers-are-the-new-discovery-process)AI crawlers are the new discovery process

The web is shifting to serve both human visitors and AI systems. As more users turn to AI tools for answers, those tools depend on crawlers to find and recommend content. Sites that adapt see more AI referrals, more citations, and greater authority in their domains.

Bots have always been part of the internet. What is changing is where people go for answers and how those answers are sourced. Making your content accessible can be the difference between being discovered or overlooked.