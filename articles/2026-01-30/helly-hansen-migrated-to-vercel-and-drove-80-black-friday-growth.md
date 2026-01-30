---
title: "Helly Hansen migrated to Vercel and drove 80% Black Friday growth "
source: "https://vercel.com/blog/how-helly-hansen-migrated-to-vercel-and-drove-80-black-friday-growth"
publishedDate: "2025-09-15"
category: "frontend"
feedName: "Vercel"
author: "Alina Weinstein"
---

4 min read

Sep 15, 2025

The 150-year-old Norwegian brand leveraged Next.js and Vercel to achieve 30%+ conversion lift while competing against industry titans

Founded in 1877, Helly Hansen is a global leader in technical apparel, but its digital experience wasn't living up to its legacy. Operating across 38 global markets with multiple brands (including [HellyHansen.com](https://www.hellyhansen.com/), [HHWorkwear.com](https://www.hhworkwear.com/), and [Musto.com](https://www.musto.com/)), the company was being held back by an outdated tech stack that slowed site speeds and frustrated customers.

Through an incremental migration to Next.js and Vercel, Helly Hansen improved Core Web Vitals from red to green, increased developer agility, and delivered a record-breaking Black Friday Cyber Monday, building a foundation for future innovation.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7vPc3VLrZzYEKCYcTEzsQe%2F1b2b4e3f14d0cd892ef44819b26ff7e7%2FSite-screenshot.png&w=1920&q=75)

Helly Hansen saw 80% year-over-year growth on Black Friday Cyber Monday with zero downtime after migrating to Next.js and Vercel.

## [Link to heading](#core-performance-issues-destroying-customer-experience)Core performance issues destroying customer experience

Helly Hansen's performance issues stemmed from its architecture. The Adobe Commerce PWA relied on client-side rendering for personalization and A/B testing, triggering heavy scripts on every load. This blocked rendering and caused major layout shifts.

The impact was severe: Core Web Vitals failed across the board, load times exceeded 4 seconds, and Cumulative Layout Shift spiked above 2.8. These issues degraded customer experience, hurt conversion on marketing spend, and jeopardized peak revenue events like Black Friday Cyber Monday.

### [Link to heading](#incremental-migration-starting-with-checkout)Incremental migration starting with checkout

Helly Hansen took an [incremental migration approach with Vercel](https://vercel.com/blog/incremental-migrations), proving value step by step instead of risking a single high-stakes launch. Working closely with our professional services team, they first completed an architecture review to define the optimal rendering and caching strategy.

The team chose to begin with checkout pages rather than the homepage, isolating their most critical conversion point while avoiding disruption to complex marketing attribution systems. Using server-side experimentation, they A/B tested different checkout flows in real-time. [The Vercel CDN](https://vercel.com/docs/cdn) ensured these critical pages loaded quickly for customers worldwide, while [Vercel Functions](https://vercel.com/docs/functions) ensured automatic scaling during traffic spikes.

### [Link to heading](#from-red-to-green-core-web-vitals)From red to green Core Web Vitals

The biggest technical change was moving from client-side to server-side rendering using Vercel's Edge Network. This directly addressed the root cause of their performance issues. Within five months, their Core Web Vitals transformed from all red to all green across every metric.

-   **Load times** dropped from over 4 seconds to a consistent 1.8-2 seconds
    
-   **Cumulative Layout Shift** was virtually eliminated
    

By focusing the initial migration on a single part of the customer journey, Helly Hansen could precisely measure Next.js impact. Through [Vercel Web Analytics](https://vercel.com/docs/analytics), load times, conversion rates, and Core Web Vitals became quantifiable proof points that generated the evidence needed to justify continued investment and proceed with global rollout in under six months.

![LCP improved by 30% immediately after launch by moving off Adobe Commerce's PWA to Next.js and Vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1DuasYBJjG7RLiNAExbaJD%2Fdfe6e132092fab6e684519e80b82aeb1%2Fcustomer_story_-_Helly_Hanson_-_LCP_-_light.png&w=1920&q=75)![LCP improved by 30% immediately after launch by moving off Adobe Commerce's PWA to Next.js and Vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2zSbbO5cXZDjyVbmF0yjtX%2Fbbd14f204af3fb828663f5790a04fc7a%2Fcustomer_story_-_Helly_Hanson_-_LCP_-_dark__2_.png&w=1920&q=75)

LCP improved by 30% immediately after launch by moving off Adobe Commerce's PWA to Next.js and Vercel

## [Link to heading](#black-friday-instability-threatening-peak-revenue)Black Friday instability threatening peak revenue

Q4 represents 55% of annual revenue for this seasonal outdoor business, making Black Friday Cyber Monday a high-stress, high-risk event. Pre-Vercel Black Fridays meant high stress, maintenance issues, and frequent site outages during their most critical revenue period.

### [Link to heading](#leveraging-next.js-and-vercel's-performance-and-reliability-infrastructure)Leveraging Next.js and Vercel's performance and reliability infrastructure

Next.js automatically optimized product data and pricing information by leveraging [Vercel Data Cache](https://vercel.com/docs/edge-cache), while [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration) and cache shielding protected performance at the most critical moments, maintaining consistently strong web performance even during peak traffic.

Hosting on Vercel delivered the performance and stability to transform Black Friday from a high-stress event into a growth opportunity. When the team identified third-party scripts slowing the site during Black Friday, they executed a low-risk deploy to hard-code a fix during a code freeze, a move impossible on their old platform.

### [Link to heading](#record-breaking-black-friday-performance)Record-breaking Black Friday performance

The site's speed instantly recovered, securing a record-breaking sales period with:

-   **80% year-over-year growth** with zero downtime
    
-   **2x lift in conversion rates**, allowing them to increase their marketing spend mid-campaign three times because it was so profitable
    

> Conversion was so high because the site was so fast. During Black Friday, we increased our performance marketing spend three times because it was so profitable.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4U34c4d0zLDHkTMHybwwXF/c9eb2b379e7b20d0e81562c2272af828/Anshika_Jain_Headshot.jpeg)
> 
> **Anshika Jain - Chief Digital Officer**

This ability to scale marketing spend in real-time turned their high-performing site into a growth engine, bringing peace of mind, structured planning, and zero major issues.

## [Link to heading](#limited-development-velocity-and-experimentation-capabilities)Limited development velocity and experimentation capabilities

The old platform severely limited testing velocity, allowing only one A/B test per month. This constrained their ability to optimize the customer experience and respond quickly to market demands.

### [Link to heading](#building-a-modern,-api-first-foundation)Building a modern, API-first foundation

By migrating to Next.js and Vercel, Helly Hansen established a modern, API-first foundation for their ecommerce platform. This transition to server-side rendering (SSR) enabled them to launch a full-scale server-side testing program with [feature flags](https://vercel.com/docs/feature-flags) to continuously optimize the customer experience.

With this high-performance infrastructure in place, they improved developer velocity and deployed [**Constructor.io**](http://constructor.io/) to drive personalization in just 11 weeks.

### [Link to heading](#accelerated-growth-and-innovation)Accelerated growth and innovation

The team increased their testing velocity dramatically, running 5-6 A/B tests per sprint compared to just one per month previously. This modern foundation delivered:

-   **21% ecommerce growth** while others in the industry remained flat
    
-   Highly personalized customer experience at near-zero latency within a year of launch
    
-   Proof that speed and personalization can coexist without compromise
    

## [Link to heading](#leadership-advice-for-cdos-and-ctos)Leadership advice for CDOs and CTOs

Reflecting on the project, CDO of Helly Hansen, Anshika Jain offered advice for other Chief Digital Officers and Chief Technical Officers considering a digital transformation:

-   **"Prioritize speed as your foundation"**\- Speed is a gift that never stops giving. Faster experiences not only convert better, they unlock personalization, experimentation, and rapid feature delivery. Vercel isn’t the finish line; it’s the starting point. Invest early in infrastructure that guarantees fast, reliable experiences
    
-   **“Test, learn, and scale”-** Don’t swing for the fences on day one. Use small, data-driven experiments to prove value, build momentum, and de-risk larger transformations. Scaling is easier, and more defensible when you have evidence in hand
    
-   **“Embrace change as the norm rather than the exception”-** Change isn’t a phase, it’s the new operating system. Organize for agility, expect resistance, and make adaptability muscle memory. The winners are those who normalize rapid response to constant change
    

> It's not that you won't fail. It's more about who's in it with you. And it has always felt like that with Vercel. That's the hallmark of a true partnership.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4U34c4d0zLDHkTMHybwwXF/c9eb2b379e7b20d0e81562c2272af828/Anshika_Jain_Headshot.jpeg)
> 
> **Anshika Jain,** Chief Digital Officer

By partnering with Vercel, Helly Hansen has not only solved its immediate performance challenges but has built a performant, scalable, and future-proof foundation that allows them to innovate and outperform their competition for years to come.

[

**Interested in going headless?**

Wherever you are in your headless migration journey, we can help. Talk to our team of experts about modernizing your ecommerce stack with Vercel.

Talk to an Expert



](https://vercel.com/solutions/composable-commerce/migration)