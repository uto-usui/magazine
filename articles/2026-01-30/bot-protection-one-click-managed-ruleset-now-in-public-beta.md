---
title: "Bot Protection: One-click managed ruleset now in public beta"
source: "https://vercel.com/blog/one-click-bot-protection-now-in-public-beta"
publishedDate: "2025-04-23"
category: "frontend"
feedName: "Vercel"
author: "Malavika Tadeusz"
---

4 min read

Apr 23, 2025

The [Vercel Web Application Firewall (WAF)](https://vercel.com/security/web-application-firewall) inspects billions of requests every day to block application-layer threats, such as cross-site scripting, traversal, and application DDoS attacks. While we already inspect and block malicious bot traffic, we wanted to provide better, more precise controls to fine tune your application security.

Today, we're launching the [Bot Protection](https://vercel.com/docs/bot-management#bot-protection-managed-ruleset) managed ruleset, free for all users on all plans. With a single click, you can protect your application from bot attacks.

[

**Enable Bot Filter Today**

Bot Filter protects applications from bot attacks with a single click.

Enable Now



](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Fconfigure&title=Enable%20Bot%20Filter)

## [Link to heading](#countering-the-threat-of-bad-bots-)Countering the threat of bad bots

Automation plays a key role in how the internet works. While some bots serve useful functions, like crawling and indexing, it’s estimated that nearly one-third of internet traffic is malicious bot activity. They’ve become some of the biggest security threats facing developers, security teams, and end-users today.

To counter automation at this scale, there’s no one-sized fits all approach. Teams need a variety of tools and mitigation techniques to stop bad bots.

### [Link to heading](#evolving-our-bot-protections)Evolving our bot protections

Vercel provides bot mitigation as part of our secure by default platform.

-   Our platform-wide [DDoS mitigations](https://vercel.com/docs/vercel-firewall/ddos-mitigation) block traffic from botnets behind DDoS traffic, HTTP floods, and malformed requests
    
-   [Firewall templates](https://vercel.com/templates/vercel-firewall) let users deploy rules targeting known bad actors, from open source blocklists to common AI scrapers
    
-   [Attack Challenge mode](https://vercel.com/docs/vercel-firewall/attack-challenge-mode) can be used to challenge requests during highly-sophisticated or targeted attacks
    

However, as automated attacks become more advanced, teams require more targeted protections that are always on and always adapting.

## [Link to heading](#introducing-bot-protection)Introducing Bot Protection

The Bot Protection managed ruleset gives you the ability to stop unwanted bot traffic, while allowing business-critical bots through. This new security layer goes beyond our platform protections to give you greater control over the type of traffic accessing you applications.

### [Link to heading](#how-bot-protection-works)How Bot Protection works

The Bot Protection ruleset takes a proactive approach using a heuristics-based detection. It quickly distinguishes between browser-based traffic (human) or non-browser based (likely bot) traffic with zero configuration needed. When enabled:

-   Requests from real browsers and [verified bots](https://vercel.com/docs/bot-protection#verified-bots) are allowed through, including internal sources like project cron jobs and API calls from your functions. We publish additional information about verified bots on [bots.fyi](https://bots.fyi/).
    
-   Requests from non-browser clients, like `curl` or unwanted scrapers, can be issued a [challenge](https://vercel.com/docs/vercel-firewall/firewall-concepts#challenge)
    

Bot Protection ties directly into the WAF. As a managed ruleset, we maintain the list of verified bots to ensure authenticity and reduce maintenance overhead.

### [Link to heading](#when-to-use-bot-protection)When to use Bot Protection

Use Bot Protection to restrict access to your sites to human users and Vercel-verified bots. It’s ideal for legitimate services like AI and SEO bots, or when you expect mostly human traffic. Bot Protection continuously challenges non-browser traffic, improving app performance and optimizing resource usage for real customers.

We recommend you enable Bot Protection in Log-Only Mode first to gain visibility into your app's traffic and bot sources by showing what requests would be challenged. For legitimate automated traffic not covered by verified bots list, you can use custom WAF rules with the bypass action to ensure that this traffic reaches your app.

Bot Protection is not designed to defend against sophisticated bots that mimic human and browser behavior. Should you want to issue a challenge to all traffic to block automation entirely, use Attack Challenge Mode instead.

## [Link to heading](#what’s-next-for-bot-management)What’s next for bot management

### [Link to heading](#public-beta-feedback)Public Beta Feedback

During this [public beta](https://vercel.com/docs/release-phases/public-beta-agreement) period, we’ve set up a [thread](https://community.vercel.com/t/feedback-thread-for-bot-filter-public-beta/9174) on the Vercel Community where you can share your feedback, feature requests, and experiences with Bot Protection.

### [Link to heading](#looking-ahead)Looking ahead

Bot management plays a key role in strengthening our secure by default platform. AI agents and other automated tools are only increasing, and the rising volume of sophisticated bot traffic will change the way developers build, operate, and secure apps.

Our planned bot management updates for the Vercel Firewall focus on specific attack types and better end-user experiences. Additional features include deeper observability into bot traffic, more granular control over verified and AI bots, Bot Protection SDK, and runtime bot protection capabilities. Enterprise users looking for more granular control will also get access to underlying detection signals as configurable inputs in the Firewall for more advanced control over automated traffic.

## [Link to heading](#enable-bot-protection-today)Enable Bot Protection today

You can enable the Bot Protection from [your Firewall's Configure dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Fconfigure&title=Bot+Protection).

[

**Learn about security that scales with you**

The Vercel Firewall delivers multi-layer protection against application-layer attacks, DDoS threats, and bots. Visit our security page to sign up for a demo or add firewall rules today

Learn more



](https://vercel.com/security)

If you're just getting started with Vercel Firewall, or don't yet have a clear picture of your app's traffic patterns, start in Log-Only Mode so you can refine your allowlist before switching to active enforcement.

If you are a SaaS provider and want to add your bot to our verified bots list, you can reach out to us at [https://bots.fyi/](https://bots.fyi/).

Learn more in the [changelog](https://vercel.com/changelog/bot-protection-is-now-in-public-beta) or read the [documentation](https://vercel.com/docs/bot-management#bot-protection-managed-ruleset).  
  
Edit: During the beta period, we renamed the Bot Filter managed ruleset to Bot Protection