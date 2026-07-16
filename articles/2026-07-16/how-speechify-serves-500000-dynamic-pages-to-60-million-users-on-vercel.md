---
title: "How Speechify serves 500,000 dynamic pages to 60 million users on Vercel"
source: "https://vercel.com/blog/how-speechify-serves-50000-dynamic-pages-to-60-million-users-on-vercel"
publishedDate: "2026-07-15"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#speechify-on-vercel)**Speechify on Vercel**

-   500,000+ pages served across 40+ languages
    
-   Cut costs 50% by auto-scaling with [Fluid compute](https://vercel.com/fluid)
    
-   Zero user impact on bad deploys with Instant Rollbacks
    

[Speechify](https://speechify.com/) started as a tool for people with dyslexia. Cliff Weitzman, Founder & CEO, built it because reading was challenging and audio made it much easier. That initial use case led Speechify to tens of millions of users and an [Apple Design Award](https://speechify.com/news/speechify-wins-2025-apple-design-award-before-wwdc/) for inclusion.

The product has since grown into something much larger: an AI work platform where 60 million people listen to documents, delegate tasks to agents, and complete work entirely through voice.

But the journey wasn't easy. Early on, they got hacked, and for half a day, every visitor was redirected to a casino website. After that, Denis Chernobai, Head of Growth Engineering, knew it was time to re-evaluate their infrastructure stack.

He decided to rebuild from scratch on Next.js and Vercel, and they ended up serving 40 times more pages, reaching a global audience three times larger, and achieving a 50% cost reduction. Since migrating to Vercel, Speechify has maintained 99.99% uptime and hasn't had a single security incident.

## [Copy link to heading](#the-cost-of-serving-500,000-dynamic-pages)The cost of serving 500,000 dynamic pages

Speechify's website is its primary growth engine, with 10,000 base pages translated into 40+ languages across onboarding funnels, localized landing pages, and pricing experiments that change constantly. Static generation isn't an option because the content changes too frequently. But serving everything dynamically means every visitor is a potential database read, which compounds fast at hundreds of thousands of visits every day.

Vercel's Data Cache, ISR, and [Next.js Cache Components](https://nextjs.org/docs/app/getting-started/caching) resolve both problems at once. Pages render dynamically on first visit, cache immediately, and serve from the closest point of presence until something changes. The result is a global growth engine that scales without the infrastructure costs scaling with it.

## [Copy link to heading](#the-risk-of-shipping-to-60-million-users)The risk of shipping to 60 million users

#### [Copy link to heading](#instant-rollbacks:-ship-fast,-fix-faster)Instant Rollbacks: ship fast, fix faster

Speechify's growth team ships constantly. New funnels and A/B experiments are deployed every few days to a user base of millions who expect everything to work. At that scale, a bad release isn't a bug for developers to fix. It's a revenue problem that can show up before anyone has time to react.

Before Vercel, a bad release meant scrambling to patch it before it became an incident. That shift from deploying with dread to deploying with confidence is what enables a small growth team to operate at a speed that would otherwise require a much larger team.

## [Copy link to heading](#the-cost-of-moving-slower-than-the-market)The cost of moving slower than the market

#### [Copy link to heading](#next.js-on-vercel:-from-code-to-global-delivery)Next.js on Vercel: from code to global delivery

When AI moves this fast, you need to constantly ship to stay competitive, and capabilities evolve rapidly, often every few weeks. "We see new voice functionality and agents emerging that didn't exist just last month," said Rohan Pavuluri, Speechify's Chief Business Officer. Each week that an idea remains unimplemented is a week someone else might bring it to life first. With Next.js on Vercel, the only hurdle to turning an idea into reality is the code itself.

Speechify ships on Next.js with continuous deployments. The growth team doesn't have a dedicated platform engineering function and doesn't need one. Security patches apply automatically, infrastructure scales to demand with [Fluid compute](https://vercel.com/fluid), and there's no deployment pipeline to maintain.

## [Copy link to heading](#what's-next)What's next

Speechify is expanding into new international markets and shipping new AI capabilities to millions of users. Most recently, they launched [SpeechifyAI](https://speechify.ai/), a developer platform bringing the same voice technology behind their consumer success to builders via API, and its flagship Simba 3.2 model ranks number one on the [Artificial Analysis](https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice) text-to-speech leaderboard as of July 2026.

As the product grows and the user base expands, Vercel is scaling with it, from cached pages to continuous deployments on a platform that lets their small, focused engineering team compete with companies ten times their size.

**About Speechify:** [Speechify](https://speechify.com/) is an AI work platform helping people consume content through voice and delegate work to AI agents. Its developer platform, [SpeechifyAI](https://speechify.ai/), offers the #1-ranked text-to-speech models on Artificial Analysis via API, as of July 2026.