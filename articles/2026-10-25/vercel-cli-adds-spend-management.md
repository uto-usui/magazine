---
title: "Vercel CLI adds Spend Management"
source: "https://vercel.com/changelog/vercel-cli-adds-spend-management"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "Vercel"
author: "Lakshmi Subbramanian"
---

You can now view and manage your team's [Spend Management](https://vercel.com/docs/spend-management) budget from the Vercel CLI. Run `vercel budgets` and you, or the scripts and agents you run, get back your current spend and the active budget.

terminal

```
$ vercel budgets> No budget set on team my-team. Current spend is $63.33. Create one with `vercel --scope my-team budgets set --amount <dollars>`.$ vercel budgets set --amount 200 --pause> Pause all projects on team my-team at 100% ($200). Production deployments become unavailable.> Success! Budget updated on team my-team.  scope    amount    spent     used    status    pause    webhook  team       $200    $63.33     32%    active    yes      —$ vercel budgets  scope    amount    spent     used    status    pause    webhook  team       $200    $63.33     32%    active    yes      —$ vercel budgets remove --yes> Success! Removed the $200 budget on team my-team.
```

### [Copy link to heading](#view,-set,-and-remove-a-budget)View, set, and remove a budget

This is the same On-Demand Budget shown in your team's billing settings. Setting a budget does not stop usage on its own. The `--pause` flag pauses production deployments of all projects when spend reaches 100%.

### [Copy link to heading](#list-budget-alert-history)List budget alert history

You can now see your budget alert history. Run `vercel budgets alerts` for the full log, filtered with `--since`, `--until`, `--limit`, and `--json`. A bare `vercel budgets` prints the three most recent alerts.

terminal

```
$ vercel budgets alerts> 3 budget alerts on team my-team  date                    budget    threshold      spent    budget amount    actions configured  2026-09-21 14:33 UTC    team            50%    $313.33             $600    notify  2026-09-19 23:12 UTC    team           100%    $313.33             $250    notify, pause  2026-09-19 02:35 UTC    team            75%    $230.00             $300    notify
```

Managing budgets requires the **Owner** or **Billing** role. Spend Management is available at no additional cost to Pro teams and to Enterprise teams on the Flexible Commitment plan.

Full reference now available in the `vercel budgets` [CLI reference](https://vercel.com/docs/cli/budgets). Read more about [Spend Management](https://vercel.com/docs/spend-management).