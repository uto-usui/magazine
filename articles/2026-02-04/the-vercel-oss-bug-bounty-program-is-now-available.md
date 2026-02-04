---
title: "The Vercel OSS Bug Bounty program is now available"
source: "https://vercel.com/blog/the-vercel-oss-bug-bounty-program-is-now-available"
publishedDate: "2026-02-03"
category: "frontend"
feedName: "Vercel"
author: "Andy Riancho"
---

3 min read

Feb 3, 2026

Security is foundational to everything we build at Vercel. Our open source projects power millions of applications across the web, from small side projects to demanding production workloads at Fortune 500 companies. That responsibility drives us to keep investing in security for the platform and the broader ecosystem.

Today, we're opening the Vercel Open Source Software (OSS) bug bounty program to the public on [HackerOne](https://hackerone.com/vercel-open-source). We're inviting security researchers everywhere to find vulnerabilities, challenge assumptions, and help us reduce risk for everyone building with these tools.

Since August 2025, we've run a private bug bounty for our open source software with a small group of researchers. That program produced multiple high-severity reports across our Tier 1 projects and helped us refine our processes for triage, fixes, coordinated disclosure, and CVE publication. Now we're ready to expand.

## [Link to heading](#building-on-our-foundation-of-security-investment)Building on our foundation of security investment

Last fall, we opened a bug bounty program focused on [Web Application Firewall](https://vercel.com/security/waf) and the React2Shell vulnerability class. Rather than wait for bypasses to surface in the wild, we took a proactive approach: pay security researchers to find them first.

That program paid out over $1M across dozens of researchers who helped us find and fix vulnerabilities before attackers could. The lesson was clear. Good incentives and clear communication turn researchers into partners, not adversaries.

Opening our private OSS bug bounty program to the public is the natural next step. Security vulnerabilities in these projects don't just affect Vercel; they affect everyone who builds with these tools. Finding and fixing them protects millions of end-users.

## [Link to heading](#which-projects-are-covered)Which projects are covered

All Vercel open source projects are in scope. The projects listed below represent the core of the Vercel open source ecosystem. These are the frameworks, libraries, and tools that millions of developers rely on daily.

### [Link to heading](#core-projects-included-in-the-hackerone-program)Core projects included in the HackerOne program

**Project**

**Description**

[Next.js](https://github.com/vercel/next.js)

React framework for production web applications

[Nuxt](https://github.com/nuxt/nuxt)

Vue.js framework for modern web development

[SWR](https://github.com/vercel/swr)

React Hooks library for data fetching

[Svelte](https://github.com/sveltejs/svelte)

Framework for building user interfaces

[Turborepo](https://github.com/vercel/turborepo)

High-performance build system for monorepos

[AI SDK](https://github.com/vercel/ai)

TypeScript toolkit for AI applications

[vercel (CLI)](https://github.com/vercel/vercel)

Command-line interface for Vercel platform

[workflow](https://github.com/vercel/workflow)

Durable workflow execution engine

[flags](https://github.com/vercel/flags)

Feature flags SDK

[ms](https://github.com/vercel/ms)

Tiny millisecond conversion utility

[nitrojs](https://github.com/nitrojs/nitro)

Universal server engine

[async-sema](https://github.com/vercel/async-sema)

Semaphore for async operations

[skills](https://github.com/vercel-labs/skills)

The open agent skills tool: npx skills

These are the projects where vulnerabilities have the highest potential impact, and where we prioritize incident response, vulnerability management, and CVE publication.

## [Link to heading](#how-to-participate)How to participate

If you’re a security researcher and ready to start hunting, visit [HackerOne](https://hackerone.com/vercel-open-source) to find everything you need: scope details, reward ranges, and submission guidelines.

When you find a vulnerability, submit it through HackerOne with clear reproduction steps. Our security team reviews every submission and works directly with researchers through the disclosure process. We're committed to fast response times and transparent communication.

We appreciate the researchers who take the time to dig into our code and report issues responsibly. Your work helps keep these projects safer for everyone.

[Join our bug bounty program](https://hackerone.com/vercel-open-source) or [learn more about security at Vercel](https://vercel.com/security).