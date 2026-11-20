---
title: "Give your agents controlled access to analyze your data and move funds"
source: "https://stripe.com/blog/give-your-agents-controlled-access-to-analyze-your-data-and-move-funds"
publishedDate: "2026-11-19"
category: "engineering"
feedName: "Stripe Blog"
---

Stripe businesses increasingly use agents to automate individual financial tasks so they can spend more time building their companies. More than 24,000 businesses already use [Stripe Treasury for agents](https://docs.stripe.com/treasury/agents), giving agents read access to financial data to work on those tasks, including reviewing transactions, building cash flow models, and reconciling payments. Now, we’re adding write access and customizable controls that enable agents to move money on Stripe.

For agents to take on more operational work alongside humans, they need access to the right capabilities but also clear limits on what they can do. With Stripe Treasury, you can allow agents to transfer funds, convert currencies, and pay vendors within limits you set. Agents can complete end-to-end financial workflows on Stripe. They don’t just analyze your business, but also help run it.

A payables agent could monitor balances across accounts, transfer funds to keep bill pay accounts topped up, and prepare vendor payments. Or you can build a payroll agent that converts currencies and moves money into the right accounts so employees are paid on time.

Stripe businesses grant access by connecting a compatible AI tool, such as Claude or Codex, through Stripe’s [Model Context Protocol](https://docs.stripe.com/mcp) (MCP) server and choosing what Stripe data the agent can see, which actions it can take, and when human approval is required.

 ![Blog > Give your agents controlled access to analyze your data and move funds > Inline image 1 ](https://images.stripeassets.com/fzn2n1nzq965/427Vgu4DvkcqqNyerQxBaw/d06bb497b739995966a22c9aa9900358/image__20_.png?w=1616&q=80)

## Stripe’s unified payments and banking data give agents more context

When your business uses Stripe for both payment processing and banking through Treasury, agents can see incoming payments, funds across your business’s Stripe balances and financial accounts, and outgoing transfers. That gives them a clearer picture of how money moves through your business. 

For example, you can ask your agent to create a daily financial report combining incoming payments, balances, card spend, and bills paid. Your team gets a current, unified view of its finances without having to pull and reconcile data from separate systems.

Your payables agent could use this connected view to link incoming payments to upcoming bills. It could anticipate a shortfall, prioritize overdue invoices, and follow up with customers. As payments settle, the agent could reconcile them to invoices, update the cash forecast, look up the vendor recipient’s details, and ready vendor payments for approval.

## You control agent access and actions

Your business can connect agents to Stripe in two ways: 

**1\. Connect an agent through an authorized user**

When you connect an agent to Stripe MCP through OAuth, the agent acts as an extension of that user and inherits their permissions. You need to confirm every action that moves money, including a refund or payout, before it’s completed.

 ![Blog > Give your agents controlled access to analyze your data and move funds > Inline image 2](https://images.stripeassets.com/fzn2n1nzq965/4aDfFs7rFSSqMfXGup6kDd/70b4b688d7a23a35addf3113492ca7a4/updated_inline_image.png?w=1616&q=80)

**2\. Give an agent its own identity and rules**

You can give an agent its own identity and persistent access to Stripe through an [agent API key](https://docs.stripe.com/keys#agent-keys). You set the key’s permissions, expiration date, and rotation schedule. Instead of waiting for a user to prompt it, the agent can work in the background, such as preparing reports overnight. 

By default, agent-initiated refunds, payouts, and outbound transfers [require human approval](https://docs.stripe.com/account/approvals). An agent could prepare a vendor payment in the background and route it to a designated approver before funds move.

Unlike with OAuth, businesses can adapt these rules for agents using agent API keys. For example, an agent could process an ACH transfer under $50 automatically but route larger transfers for approval. Businesses can also create custom approval rules for other agent actions, such as adding or removing an account administrator or updating a bank account.

## Get started with Treasury for agents

Stripe’s agentic money movement capabilities are now available in public preview. Next, we’ll expand the financial actions agents can take, including creating cards with spending limits. 

We’re building toward a Treasury experience that does more than answer, “What’s my balance?” With time, agents will proactively identify what needs attention and help take care of it, with businesses deciding how far agents can go. 

Learn more about [Stripe Treasury](https://stripe.com/treasury) or start [automating money movement with agents](https://docs.stripe.com/treasury/agents) today.