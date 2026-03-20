---
title: "Introducing the Machine Payments Protocol"
source: "https://stripe.com/blog/machine-payments-protocol"
publishedDate: "2026-03-18"
category: "engineering"
feedName: "Stripe Blog"
---

AI is evolving from question-and-answer chatbots to autonomous agents that can make comprehensive plans, execute actions, and evaluate outcomes. We believe agents will become an integral part of the internet economy, and they need the ability to transact with businesses and one another.

However, the tools of the current financial system were built for humans, so agents struggle to use them. Making a purchase today can require an agent to create an account, navigate a pricing page, choose between subscription tiers, enter payment details, and set up billing—steps that often require human intervention. 

To help eliminate these challenges, we’re launching the [Machine Payments Protocol](https://mpp.dev/) (MPP), an open standard, internet-native way for agents to pay—co-authored by [Tempo](https://tempo.xyz/) and Stripe. MPP provides a specification for agents and services to coordinate payments programmatically, enabling microtransactions, recurring payments, and more.

Stripe users can [accept payments over MPP](https://docs.stripe.com/payments/machine/mpp) in a few lines of code using our PaymentIntents API. Businesses can then accept payments directly from agents, in stablecoins as well as fiat with cards and buy now, pay later payment methods via [Shared Payment Tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens) (SPTs). 

MPP is already powering new agentic business models on Stripe. Browserbase, a browser infrastructure provider, now lets agents spin up headless browsers and pay per session. PostalForm helps agents pay to print and send physical mail. Prospect Butcher Co. lets agents order sandwiches for human pickup or delivery to anywhere in New York City. And agents can now programmatically contribute to [Stripe Climate](https://climate.stripe.dev/).  

“Parallel is built for a world where agents are the primary users of the web. We integrated machine payments with Stripe in just a few lines of code, and now agents can autonomously pay per API call for web access. This allows us to reach any agent developer in the world on the same Stripe stack we already run on,” said Parag Agrawal, founder of Parallel Web Systems.

## How MPP works

An agent can request a resource from a service, API, Model Context Protocol (MCP), or any HTTP addressable endpoint, and the service responds with a payment request. The agent authorizes the payment, and the resource is delivered to the agent. 

For Stripe businesses, these payments appear in the Stripe API and Dashboard like any other transaction; the funds settle into a business’s existing balance, in their default currency, and on their standard payout schedule. The same Stripe infrastructure businesses rely on for human payments can work for agents, including tax calculation, fraud protection, reporting, accounting integrations, and refunds.

## Building for the agent economy

Agents represent an entirely new category of users to build for—and increasingly, sell to. Stripe is building a broad set of agentic financial infrastructure to enable these important new patterns, via our [Agentic Commerce Suite](https://stripe.com/blog/agentic-commerce-suite), [Agentic Commerce Protocol](https://www.agenticcommerce.dev/) (ACP), [MCP integrations](https://docs.stripe.com/mcp), and payment support for both MPP and x402. 

To get started with MPP using Stripe, read our [docs](https://docs.stripe.com/payments/machine) and [sign up for early access](https://docs.stripe.com/payments/machine#integration-guides).