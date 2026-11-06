---
title: "Analyze your Stripe data directly with your agent "
source: "https://stripe.com/blog/analyze-your-stripe-data-directly-with-your-agent"
publishedDate: "2026-11-05"
category: "engineering"
feedName: "Stripe Blog"
---

As AI becomes a larger part of how teams work, users increasingly tell us they want to access and analyze their Stripe data directly with the agents they use every day.

Agents can now have structured access to your Stripe data to help you make faster, better business decisions. We introduced the ability for you to connect compatible agents such as Claude and Cursor to your Stripe analytics data via [Stripe’s MCP](https://docs.stripe.com/mcp) or by using the [Queries API](https://docs.stripe.com/reports/query-runs) and [Reports API](https://docs.stripe.com/reports/api) directly—now available for all Stripe users. With natural language prompts, you can do things like create an investor slide deck highlighting where your business outperformed in the previous quarter, or build a custom dashboard to understand why your Stripe revenue changed.

The Queries API is free for all Stripe users through January 31, 2027. After that, you’ll pay per credit of API usage, with no monthly subscription required. The Reports API will remain free.

## How it works

To make use of your Stripe data, an agent needs to know which tables to use, how Stripe defines the relevant metrics, and how to construct the analysis. The Reports API has the modeled data schema of more than 300 tables, as well as built-in guidance for how the agent should use the tables, so you can get the most accurate and reliable analysis. If you want to better understand your subscriptions business, Stripe can route the agent to track monthly recurring revenue over time and attribute changes to upgrades, downgrades, churn, and anything else that is important for you to understand and take action on.

Once your agent has the relevant Stripe data, it can analyze the data alongside information from connected tools and relevant context from previous conversations. In Claude, you could bring together website activity from a PostHog connector, subscription data from Stripe, and context from earlier threads about a campaign to understand which customers clicked a button but later churned. 

This type of financial analysis often informs important business decisions and investor reporting, so results from an agent need to be clear and verifiable. For each analysis with our APIs, you can inspect the underlying SQL, confirm how the result was calculated, and edit the query as your needs change.

## Example prompts to get started 

Explore and use your Stripe data with an agent using these example prompts, which you can copy or customize.

**To answer accounting and finance questions:**

-   “Reconcile each payout from the past three months to its underlying payments, refunds, disputes, fees, and transfers. Show any amounts that do not tie out and the transactions contributing to each difference.”
-   “Create an Excel file with all open and past-due invoices grouped by customer and invoice age from the last month. Flag customers with repeated collection failures.”

**To track business growth:**

-   “Build a monthly recurring revenue dashboard for me to monitor MRR, expansion, contraction, churn, and reactivation, then explain the largest month-over-month changes by product and plan.”
-   “How have our new promotions affected revenue this quarter?”

**To understand and prevent fraud:**

-   “Set up a Slack notification when fraud rates go higher than my predefined range. Show trends by payment method and dispute reason, then highlight the segments with the largest increases.”
-   “Find the payment segments with the highest chargeback rates over the past 90 days.”

**To analyze payments performance:**

-   “Give me a visual report on my payments business over the past quarter, with charts of payment volume, success rates, failures, refunds, and disputes. Show the most important trends by payment method and market, flag notable changes, and summarize where performance is improving or needs attention.”
-   “Find failed payments from the past 30 days that did not succeed within three days. Group them by decline reason and payment method.”

If you’re already connected to the Stripe MCP, you can [get started](https://docs.stripe.com/data/analyze-with-ai) by directly prompting your agent with one of the above examples. If you’re new to the [Stripe MCP](https://docs.stripe.com/mcp), open your agent and prompt: “Pull my Stripe data in” to get connected. 

If you want to access Stripe data programmatically from your own workflow, you can get started with the [Queries API](https://docs.stripe.com/reports/query-runs) or [Reports API](https://docs.stripe.com/reports/api) directly.