---
title: "Stripe on Stripe: What we learned moving $1B in vendor payments to Global Payouts"
source: "https://stripe.com/blog/stripe-on-stripe-what-we-learned-moving-1b-in-vendor-payments-to-global-payouts"
publishedDate: "2026-10-30"
category: "engineering"
feedName: "Stripe Blog"
---

Stripe makes nearly 20,000 payments to vendors in more than 70 markets a year. Historically, we’ve made those payments through direct bank integrations connected to our enterprise resource planning (ERP) system. Where we didn’t have an integration, teams had to manually enter payments through bank portals.

That system worked but grew harder to support as Stripe scaled. Every banking relationship came with its own technical, contractual, and security requirements, and it took weeks to build an integration for a new market. When a payment failed, our operations and finance teams had to search across bank portals and the ERP to identify the problem and resend the money. 

Earlier this year, we began moving Stripe’s own vendor payments to the product we were building to help our users send money around the world: [Stripe Global Payouts](https://stripe.com/payouts). Global Payouts enables businesses to pay recipients in more than 160 countries through a single API using local bank transfers, international wires, and stablecoins without requiring recipients to open a Stripe account. 

By October 2026, we had paid over $1 billion to more than 3,400 vendors in the US and UK using Global Payouts. The time it took to set up vendor payouts in a new market dropped from as many as six weeks to one. Our finance and treasury teams now save an estimated 20–30 hours a month with automated reporting and reconciliation, and payouts have maintained a 99.9% success rate. 

Using Global Payouts ourselves put us in our users’ shoes. Companies like Lyft, Scale AI, BMW, and Meta already use Global Payouts for use cases including marketplace earnings, freelancer payments, insurance claims, and customer reimbursements. Running our own vendor payments through the product showed us the pain points businesses hit when integrating and tracking payouts at scale and exposed gaps in vendor data, payment visibility, and high-value transactions—all of which we’ve since resolved. Here’s how we rolled it out and what we learned.

 ![Blog > Stripe on Stripe > Image 1](https://images.stripeassets.com/fzn2n1nzq965/5G94zyai2uqjz4gcxP3W6w/207cd75189db916eabf1a8b7b1fdfc78/Send_flow.png?w=1616&q=80)

## How we rolled out the migration

We began testing Global Payouts in February 2026, sending one low-dollar ACH or wire payment through each US payment flow. In March, we started a staged, four-wave rollout, increasing payment amounts only after nearly all eligible payouts in the previous wave had succeeded. By June, Global Payouts was handling the vast majority of Stripe’s domestic US vendor payments, measured by both payment count and value. 

## What we learned using Stripe Global Payouts

### **Lesson 1: Validate vendor data before a payment reaches the banking system**

Bank payments can fail for a lot of reasons, including insufficient funds, bank limits, and restricted accounts. Our previous bank integrations didn’t always catch incorrect or incomplete information when we submitted a payment. During Stripe’s migration, we discovered that recipient data problems were responsible for the majority of failures. A small mistake, like an incorrect postal code, might not become apparent until days later, when the bank returned the payment or the vendor contacted us.

Once we identified the most common reasons for failure, we moved those checks earlier in the payment flow. Our orchestration layer translates vendor and bank account records to the recipient and payout methods used by Global Payouts. The API checks that the required information is present and valid before any money moves. If there’s an issue, the error message identifies what needs attention. Our operations teams can now fix most issues in minutes, rather than having to retrace a failed payment days later.

### **Lesson 2: Sender-side visibility isn’t enough**

Before Global Payouts, payment status information was spread across bank portals and our ERP. With Global Payouts, our teams can trace each vendor payment through a single API. Every payment has a unique reference number, and its invoice information is attached to the outbound payment as [metadata](https://docs.stripe.com/metadata). We can track the invoice and the payment from initiation through settlement.

However, in adopting Global Payouts, we found that the vendor’s bank statement didn’t necessarily provide the same context. The vendor might see that money had arrived but couldn’t always tell who sent it or which invoice it covered. A payment would be traceable in our systems but hard to recognize for the person receiving it.

To address the issue, we added customizable [statement descriptors](https://docs.stripe.com/get-started/account/statement-descriptors) so businesses can attach recognizable information to recipients’ bank statements. This gives vendors more context to identify incoming funds and makes it easier for both the sender and recipient to reconcile the payment.

### **Lesson 3: Test transaction size, not just transaction volume**

Global Payouts had to process tens of thousands of payments, but volume wasn’t the only dimension of scale. Some of our vendor payments were much larger than the system had been designed to handle. When a payment exceeded the existing limits, our operations teams had to process it manually. 

We raised the ACH and wire limits on the [Outbound Payments API](https://docs.stripe.com/api/treasury/outbound_payments) to $100 million. This allows more high-value vendor payments to run through the same automated workflow without bypassing the existing processes for approval, ERP recording, funding, reconciliation, and reporting.

## Continuing to build

Global Payouts is now generally available in the US and UK. The product helps thousands of businesses send money to third parties in more than 160 countries, even when those recipients don’t use Stripe.

We’re now working to bring more of Stripe’s cross-border and cross-currency vendor payments onto Global Payouts. This includes expanding recipient-country coverage, supporting stablecoin payouts, and handling cases where a vendor’s address and bank are in different countries or a payment is sent in a different currency from the vendor’s bank account currency. 

We’re also developing AI-assisted capabilities for payouts and recipient onboarding through [Stripe's Model Context Protocol](https://docs.stripe.com/mcp), a standard way for agents to interact with Stripe. Businesses can delegate more of their workflow, like beginning recipient onboarding or initiating a payment, to agents while retaining control. They determine which Stripe data an agent can access, which actions it can take, and when a person needs to approve a payout. 

Learn more about [Stripe Global Payouts](https://stripe.com/payouts) or [contact the team](https://stripe.com/contact/sales) to get started.