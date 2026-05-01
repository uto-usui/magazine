---
title: "Vercel now supports Pro plan in Stripe Projects "
source: "https://vercel.com/changelog/vercel-now-supports-pro-plan-in-stripe-projects"
publishedDate: "2026-04-29"
category: "frontend"
feedName: "Vercel"
author: "Tony Pan"
---

1 min read

Apr 29, 2026

You can now sign up for or upgrade to a Vercel Pro plan directly from Stripe Projects using [shared payment tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens) (SPTs). Agents and developers can manage plan changes programmatically from the Stripe CLI, without leaving their workflow.

### [Link to heading](#what’s-new)What’s new

-   Provision or upgrade to Vercel Pro directly from the Stripe CLI
    
-   Support for both upgrade and downgrade flows
    
-   Powered by shared payment tokens for secure, streamlined billing
    

This builds on our [Stripe Projects launch in developer preview](https://vercel.com/changelog/vercel-is-now-available-in-stripe-projects) by enabling end-to-end provisioning and billing in one place. Instead of switching between dashboards, you can now handle infrastructure setup and plan management directly from the terminal.

### [Link to heading](#getting-started)Getting started

If you’re already using Stripe Projects and have set up billing via `stripe projects billing add` , you can upgrade your Vercel plan from the CLI simply by running `stripe projects add vercel/pro`

If you are new to Stripe Projects, Install the plugin and initialize your project:

```
stripe plugin install projects stripe projects init my-app stripe projects add vercel/pro
```