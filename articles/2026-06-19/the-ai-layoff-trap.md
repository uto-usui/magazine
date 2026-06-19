---
title: "The AI layoff trap"
source: "https://ailayoffs.rajnandan.com/"
publishedDate: "2026-06-18"
category: "design"
feedName: "Sidebar"
---

Economic Theory · Automation · Externalities

## If every firm lays off workers at once, _who will buy the product?_

Rational, forward-looking firms competing on cost are trapped in an automation arms race. Each captures the full savings of replacing a worker — but bears only 1/N of the resulting collapse in demand. The rest falls on rivals. The race is a dominant strategy. This simulator makes the trap visible as parameters change.

Paper: arXiv:2603.20617 · [Hemenway Falk & Tsoukalas, March 2026](https://arxiv.org/abs/2603.20617)

Story Mode · Start here

## A region with 1,000 companies and 100,000 workers.

Each company has 100 employees. They pay wages. Workers spend those wages at the same companies — that's where most of the money comes from. Now every company gets access to AI. Decide how aggressively they cut — how many workers to replace each round, and how many rounds go by — then run the simulation.

Configure the simulation

Layoffs per round

5%

What fraction of the workforce every company replaces in one cycle.

Number of rounds

10

How many decision cycles the region goes through before the simulation stops.

50%

**50,000** of 100,000 workers replaced by the final round

**How the region works:**

Each worker earns $50k/year. When laid off, only 30% of that income is replaced by a new job or transfers (the paper's η). Workers spend half of their income at local companies (the paper's λ). An AI replacement costs the company $20k/year (saves $30k per worker).

Integrating AI gets harder as more workers are replaced — a convex (k/2)Lα² friction cost in the paper. In this region, automating all 100 workers adds $2M/year in integration cost per company.

Everyone is employed. Companies pay wages, workers spend in the shops, companies earn back most of what they pay out. A steady, if boring, economy.

The region · 100,000 workers

Each dot is ten people. Forest means employed; washed-out tan means replaced by AI.

100,000 employed

0 replaced

at a job replaced by AI

0% automated · 1 dot = 10 workers

Workers with jobs

100,000

of 100,000

Money in workers' pockets

$5.0B

region-wide labor income

Profit per company

$500k

vs. before AI

Region total pie

$5.5B

workers + owners combined

The profit arc · one company

The marker shows where the region sits right now. Profit **rises** at first as AI saves on wages, peaks at the **sweet spot**, then **falls below the starting line** because laid-off workers have stopped buying.

Round

Automation

Profit / co.

Δ vs last round

Verdict

Advanced Simulator

## The full model.

The story above shows the paper's intuition. Below is the model itself. Every parameter is tunable — number of firms, wages, AI costs, friction, worker spending habits, income replacement — with Nash equilibrium, cooperative optimum, and policy instruments responding live.

Nash equilibrium αNE

0.00

fraction of workforce automated

Cooperative optimum αCO

0.00

what firms would choose together

Over-automation wedge

0.00

αNE − αCO

Pigouvian tax τ\*

0.00

\= ℓ(1 − 1/N)

Fig. 1 — The profit curve

## Both the firm _and_ the worker lose

Normalized owner surplus and worker income as every firm automates at the same rate. The curve peaks at the **cooperative optimum**. Firms don't stop there — their private best-response is further right, at the **Nash equilibrium**, where both curves have already fallen. This is the deadweight loss the paper identifies.

Owner surplus K(α) Worker income W(α) αCO — cooperative αNE — Nash trap

Fig. 2 — Comparative statics

## More firms, wider trap

The wedge grows with competition. A monopolist (N=1) fully internalizes the externality. Each extra entrant dilutes responsibility — the demand loss gets spread across more rivals.

Fig. 3 — Factor payoff frontier

## Pareto dominated

Workers on one axis, owners on the other, as α sweeps from 0 to 1. The cooperative optimum sits at (1,1). The Nash point lies strictly to the southwest — **both** groups could be made better off.

"Foresight alone cannot prevent the race toward the cliff. Each firm captures the full cost saving but bears only 1/N of the demand loss."

Fig. 4 — Policy comparison

## Six instruments. Only one closes the wedge.

Owner surplus + worker income under each policy, relative to laissez-faire. UBI raises the floor but changes no margins. Capital income tax cancels from the first-order condition. Coasian bargaining fails the grand-coalition test. Worker equity narrows but does not close. Only a Pigouvian automation tax τ\* = ℓ(1−1/N) implements the cooperative optimum.

Table — Policy instruments at these parameter values

## Who moves which margin

Instrument

α equilibrium

Total surplus

Closes externality?