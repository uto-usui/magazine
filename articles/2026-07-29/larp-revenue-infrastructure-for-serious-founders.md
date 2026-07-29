---
title: "LARP: Revenue infrastructure for serious founders"
source: "https://www.larp.website/"
publishedDate: "2026-07-28"
category: "design"
feedName: "Sidebar"
---

⇄ LARP

[Start a loop](#ledger)

Series A–ready revenue infrastructure

## Revenue is just an agreement between friends.

LARP pairs you with another founder. You send them **$10,000**. They send you **$10,000** right back. You've both now booked **$10,000 in revenue**. The books balance. Cash never moves. Everybody's a rocketship.

[Run your first loop →](#ledger) [See the math](#how)

Global LARP volume this year

$0

$0 of it real.

Trusted by 400+ finance and accounting teams

VerithorNorthbankCadenza Systems Halyard & VaneOrlick LabsSteelportMerridian

99.98%

Settlement uptime

<400ms

Median recognition latency

SOC 2 Type II

Audited annually

How it works

## Three steps to a rounding error the size of a Series B.

No product required. No customers required. No, seriously — no customers.

#### 01 — Match with a peer

Any founder with a bank account and a dream.

You both agree on a number. Bigger is better. The number is the entire product.

#### 02 — Wire it in a circle

You → them → you. Or don't. Honestly, don't.

Each leg counts as revenue for the receiver. Two legs, two "customers," zero net cash.

#### 03 — Recognize it forever

Annualize. Then annualize the annualization.

$10k/mo becomes $120k ARR. Loop weekly and watch a single hundred-dollar bill fund a whole deck.

#### The catch

There isn't one. That's the catch.

The number in the pitch is real. Whether it _means_ anything is a philosophy question, not an accounting one.

This isn't hypothetical

## The trillion-dollar version books about as much new demand as yours did.

Same shape as your ledger — capital, chips, and cloud credits circling a handful of companies, each leg counted as revenue somewhere. Tap a company to see the actual reported deals. Every figure is real and sourced.

capital flowing chips / compute flowing back tap a node

**To be clear:** every deal here is legal, publicly announced, and defended by the people in it — Anthropic CEO Dario Amodei called the structure "nothing inappropriate in principle." Critics compare the pattern to 1990s dot-com vendor financing and warn it can inflate the _appearance_ of demand. As Bloomberg puts it, a circular deal is legally different from a fraudulent "round-trip" — regulators' term for sham trades with no economic substance designed to inflate results. LARP is a joke about the round-trip. This is the legal cousin it rhymes with.

The ledger — live

## Book some revenue.

Enter a friend's startup and a number. Hit execute. Watch your ARR launch while your cash sits exactly where it started: nowhere.

Your annual recurring revenue

$0

NET CASH MOVED: **$0**

Counterparty startup

Monthly loop amount ($)

#### You — Bird Capital Holdings

Debit / Credit journal

No entries yet. Suspiciously honest of you.

Revenue recognized$0

#### Synergos AI

Debit / Credit journal

Also waiting to get rich doing nothing.

Revenue recognized$0

Chart shows revenue recognized. It does not, and cannot, show cash — because there isn't any.

Customers

## Finance teams close faster on LARP.

Controllers and CFOs use LARP to remove settlement friction from the revenue cycle.

"We recognized 340% year-over-year revenue growth without any change to our cash position. Our auditors had no questions. The journal entries were already there."

DM

D. Mercer

VP Finance, Cadenza Systems

"Before LARP, growth was constrained by whether customers actually paid us. That's no longer a bottleneck we think about."

RO

R. Oduya

Controller, Northbank

"We closed the quarter in four days. Every entry reconciles perfectly, because every entry has a matching entry."

SV

S. Valko

CFO, Halyard & Vane

Developers

## Settle programmatically.

A single endpoint posts matched entries to both counterparties.

curl -X POST https://api.larp.co/v1/settlements \\ -H "Authorization: Bearer $LARP\_API\_KEY" \\ -d counterparty\_id=cp\_8f2a91 \\ -d amount=1000000 \\ -d currency=usd \\ -d recognition=monthly

{ "id": "stl\_4b1e77", "status": "settled", "amount": 1000000, "recognized\_by": \["acct\_self", "cp\_8f2a91"\], "net\_capital\_movement": 0, "journal\_entries": 4 }

Both counterparties recognize the full amount. See Recognition → Symmetry.

Support

## The legality question.

#### Is this legal?

Yes. LARP facilitates mutual service agreements between consenting, verified business entities. Each agreement specifies genuine deliverables and genuine consideration, and each party independently recognizes revenue under ASC 606 upon satisfaction of its performance obligation. Bilateral commercial arrangements — including reciprocal vendor relationships, strategic partnerships, and vendor financing — are longstanding and lawful features of commercial practice, and are widely used by public companies today.

Customers are solely responsible for determining whether their use of the platform complies with applicable accounting standards, disclosure obligations, and securities law. LARP does not provide accounting, legal, or tax advice. Our platform records what our customers instruct it to record.

#### How is this different from round-tripping?

Round-tripping refers to sham transactions with no economic substance, entered into for the purpose of inflating reported results. LARP requires that all agreements specify genuine deliverables. Determining whether a given arrangement has economic substance is the responsibility of the customer and its auditors.

Pricing

## You literally cannot pay us. That's the whole point.

Charging you would create real revenue, which would violate our principles.

### Bootstrapper

$0

/ forever

-   Loops up to $10k
-   One imaginary customer
-   Community-tier delusion

[Start looping](#ledger)

### Growth ★

$0

/ still forever

-   Unlimited loops
-   Auto-generated board decks
-   "Up and to the right" guarantee
-   Annualize the annualization

[Go parabolic](#ledger)

### Enterprise

Call us

/ we won't pick up

-   Multi-party loop rings
-   A very relaxed auditor
-   Plausible deniability add-on

[Contact sales](#)

Optional postscript

## Actually — you can pay me.

The pricing section is a bit. This one isn't. If the joke earned a real dollar from you, here's where it goes.

GIFT · NOT A SECURITY

No equity. No revenue share. No pro-rata on the next round. No round. You are tipping a joke — that is the entire transaction, and the entire thing you get in return.

[Tip the joke →](https://buy.stripe.com/aFadR238V5LtbSHe7VaAw03)

Or just email me — [\[email protected\]](https://www.larp.website/cdn-cgi/l/email-protection#4927262821232621273a26272a263930092e24282025672a2624). Say thanks, argue with the disclaimer, or tell me about the actual company you're building. That's the address.

VOID

### There's nothing to withdraw.

No real money ever moved — that would be securities fraud, and this is a joke _about_ securities fraud. Your ARR is real. Your bank balance is exactly what it was.