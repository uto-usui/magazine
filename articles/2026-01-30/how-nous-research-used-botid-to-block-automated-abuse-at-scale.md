---
title: "How Nous Research used BotID to block automated abuse at scale"
source: "https://vercel.com/blog/how-nous-research-used-botid-to-block-automated-abuse-at-scale"
publishedDate: "2025-11-07"
category: "frontend"
feedName: "Vercel"
author: "Liz Hurder"
---

3 min read

Nov 7, 2025

AI lab [Nous Research](https://nousresearch.com/) made Hermes, their open-source language model, free for one week to increase accessibility. Within days, automated scripts overwhelmed the service with fake accounts performing high-volume inference requests across thousands of accounts to bypass rate limits.

Despite having Cloudflare Turnstile in place, bulk signups continued. The abuse led to wasted inference compute and inflated identity provider bills. After the promotion ended, Nous realized that before reintroducing any kind of free tier, it needed a stronger layer of bot protection.

[

**Free BotID Deep Analysis**

Enterprise and Pro teams can use Vercel BotID Deep Analysis free of charge through January 15

Read Now



](https://vercel.com/changelog/free-botid-deep-analysis-through-end-of-the-year)

## [Link to heading](#about-nous-research)About Nous Research

Nous Research is an AI research lab that manages multiple applied AI research areas, including an LLM series named [Hermes](https://hermes4.nousresearch.com/). While anyone can download and run Hermes for free, Nous also offers a hosted chat UI and inference API, providing users a simple, direct way to interact with the models without any prior setup.

## [Link to heading](#unexpected-app-abuse-during-free-tier-promotion)Unexpected app abuse during free tier promotion

During the one-week promotional period offering free Hermes inference, app abusers interacted with the chat product programmatically. Scripts ran datagen prompts, spreading the load across thousands of fake accounts to bypass rate limits.

> We were swamped with scripts running datagen prompts, spreading the load across thousands of users. Our only protection was captcha on sign-up, which it seems was not effective.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6pv9ZA0vm8GriBjvVQ9HSQ/4f82fd495f0a57ba277067ed376a67eb/RobinHeadshot2025.jpg)
> 
> **Robin Fernandes,** Engineer at Nous Research

The abuse led to wasted inference compute and inflated identity provider bills, despite having Cloudflare Turnstile in place for signup protection.

## [Link to heading](#retooling-for-security-and-efficiency)Retooling for security and efficiency

Nous took the opportunity to rework its sign-up and chat flow. Ahead of relaunching another promotion period, Nous adopted [Vercel BotID Deep Analysis](https://vercel.com/docs/botid#how-botid-deep-analysis-works), our most sophisticated bot protection solution that accurately identifies bots impersonating human behavior. BotID works as an invisible captcha, verifying users without disrupting their experience.

They deployed BotID across both their portal and chat interfaces at critical checkpoints:

-   **Portal (Auth Flow):** BotID checks run both before and after user sign-up or sign-in. Failed checks stop progress immediately
    
-   **Chat (UI Layer):** To prevent API-style abuse of the chat app, Nous implemented a heartbeat mechanism. The chat client triggers periodic BotID checks via tRPC. Successful checks are cached on the backend for a short window. Inference requests only proceed if a recent human verification exists
    

This layered approach protected both entry points and continued app interaction to ensure security and cost efficiency.

## [Link to heading](#botid-blocked-a-coordinated-attack-that-spiked-traffic-by-3,000%)BotID blocked a coordinated attack that spiked traffic by 3,000%

On October 16th around 12pm AEST, Nous quietly reopened its free tier without marketing promotion. Within a few days, Vercel BotID detected and mitigated a coordinated attack that found the open chat and tried to exploit it.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FEepZiVzQPOcONZsDFRfFE%2F5721a3e62f9e6336397ccf00a1c9d67b%2FCleanShot_2025-10-30_at_15.38.03_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4LV9pfTM1J5Xk4fTh4jDjb%2F81989c908c19d9af920231234d4ea0b6%2FCleanShot_2025-10-30_at_15.38.11_2x.png&w=1920&q=75)

The traffic spike produced a few key attack signals:

-   Five to six IPs generated most of the load with a long tail of smaller sources
    
-   A majority of traffic originated from Japan
    
-   3–4 distinct JA4 hashes correlated across attack attempts
    

After BotID identified and blocked the traffic, the attack lasted two hours before attackers realized they couldn't perform any inference, and stopped. At its peak, Nous saw a 3,000% increase in traffic volume to its chat app. Despite thousands of attempted sign-ups, inference traffic and availability remained stable.

Interestingly, the same JA4 fingerprints that BotID marked "human" at the sign-in portal later appeared as the most-blocked patterns in chat. This highlights how sophisticated attackers can adjust their attack patterns, and BotID's deeper behavioral analysis provides adaptive defense beyond surface-level protection.

> We didn’t see a spike in inference at all and our chat performance remained steady. The attack burned out once it became clear they couldn’t get past BotID.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6pv9ZA0vm8GriBjvVQ9HSQ/4f82fd495f0a57ba277067ed376a67eb/RobinHeadshot2025.jpg)
> 
> **Robin Fernandes,** Engineer at Nous Research

## [Link to heading](#how-botid-prevented-abuse-without-impacting-legitimate-users)How BotID prevented abuse without impacting legitimate users

By deploying Vercel BotID at multiple points in its user flow, Nous Research prevented large-scale automated abuse before it could impact infrastructure, reduced wasted inference costs, and maintained app availability for its free tier without compromising security or user experience. And because BotID responded automatically, Nous did not have to spend valuable time or resources triaging traffic issues. Now they can continue their mission to host a free, open-source LLM for users around the world safely.

[

**Protect your most critical routes from automated abuse**

Detect and stop advanced bots before they reach your most sensitive routes like login, AI inference, and APIs. Easy to implement, hard to bypass.

Get started



](http://vercel.com/botid)