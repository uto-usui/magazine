---
title: "How Figma stays ahead of vulnerabilities with agents"
source: "https://www.figma.com/blog/how-figma-stays-ahead-of-vulnerabilities-with-agents/"
publishedDate: "2026-07-23"
category: "design"
feedName: "Figma Blog"
---

**Precision** is the share of reported findings that are real vulnerabilities. High precision implies low false positives.

**Recall** is the share of real vulnerabilities the system catches. High recall implies low false negatives.

Pointing coding agents at the codebase and asking them to find vulnerabilities is simple. Getting the precision and recall an organization needs is still hard engineering: How many findings are legitimate, and how many actual bugs does the system catch?

This post walks through how we approach precision, recall, and trust when it comes to running agentic security for Figma’s codebase. We use agents to prevent, detect, and fix vulnerabilities at three stages: code generation, pull request review, and auditing of historical code.

We’ll share learnings across these stages, spending most of our time on PR review—the first thing we built, which unlocked secure code generation and auditing by helping us develop and automatically improve the policy all of our security agents follow.

![Software delivery pipeline with layered security: A shared policy powers AI checks during code authoring, pull request review, and full-repository audits before software ships.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIEBv/EAB4QAAIDAAIDAQAAAAAAAAAAAAECAAMRBBMSFCFB/8QAFQEBAQAAAAAAAAAAAAAAAAAABQb/xAAhEQACAQIGAwAAAAAAAAAAAAABAgMABAUREiExQVGB0f/aAAwDAQACEQMRAD8A1nrM9XYLAoHzNic+k8GpXdhaCNxZJbYy2MAfkTsc6GbQYrd4uI5Gj32zHA9d0VZ4HJLGkylciAeT8qql+ysN4ld/DCFJ2sbCUEDa4lbyBU3cJolZT0TX/9k=)![Software delivery pipeline with layered security: A shared policy powers AI checks during code authoring, pull request review, and full-repository audits before software ships.](https://cdn.sanity.io/images/599r6htc/regionalized/6be94b1974554b768831ee377f883dcd2b6d5146-3264x2176.jpg?w=1080&h=720&q=75&fit=max&auto=format)

Generation, review, and auditing all apply the same shared policy that contains trust boundaries, accepted risks, and precedents.

## [Secure code review](#secure-code-review)

We built review first because its improvement loop is faster than those for generation or auditing. Three properties make that loop work:

1.  It's universal: Every pull request goes through it.
2.  It's self-serve: The reviewer comments on the PR and the author responds to the finding directly.
3.  It's instrumented in both directions: Precision and recall each get their own signal.

The precision signal is the author's rating: On the few PRs that surface a finding, the author gives it a thumbs up or thumbs down, usually with a note on why. To measure recall, we run the reviewer against commits we already know were buggy and count what it misses.

![Improving an AI code reviewer: Human feedback increases precision while replaying known-bad examples improves recall, with both feeding back into a common security policy.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGQAAAQUAAAAAAAAAAAAAAAAAAAEDBAUG/8QAHhAAAgICAgMAAAAAAAAAAAAAAQIAAwQRITESQYH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBf/EACARAAIBAwQDAAAAAAAAAAAAAAECAAMREgQFQXGh0eH/2gAMAwEAAhEDEQA/AN/dbVUg8mY2E6CKImfklalKoNga44kHJudMhgDwOo2ci0jRbfyWF0LOM8vniHV3SnScoVNx17lhi2tdjpY6GtmGyp9QhisWpUnuEMjE2lJGDqGHM//Z)![Improving an AI code reviewer: Human feedback increases precision while replaying known-bad examples improves recall, with both feeding back into a common security policy.](https://cdn.sanity.io/images/599r6htc/regionalized/68ed59a003214d1360b19bb2cc5ec63f7d89c4b4-3264x2176.jpg?w=1080&h=720&q=75&fit=max&auto=format)

We currently run both Claude Code with Opus 4.8 at the xhigh (extra-high) effort setting and Codex with GPT-5.6 Sol at high effort, because they miss different bugs. If either model surfaces a finding, we bubble it up.

Cost isn’t a constraint for per-PR review. For both the models we use, a pull request review runs about $0.50 median spend, rarely more, since most PRs have nothing to flag. This approach pays for itself many times over in avoided bounty payouts, not to mention avoided impact to our users.

Some of the vulnerabilities our reviewer catches involve complex multi-step chains. On one recent PR, it reasoned that an injected sandbox object leaked the host realm's `Function` constructor, opening a path to code execution in the desktop client.

Most of what it catches is more ordinary, and still worth fixing. For example, on another recent PR, the reviewer flagged an endpoint that returned an invoice by a caller-supplied ID without checking if the invoice belonged to the caller's org—meaning that any authenticated user could read another organization's invoices just by knowing the ID. Here’s a very simplified version of the finding:

![AI security reviewer comment on a GitHub pull request identifying an insecure object reference and recommending scoping invoice lookups to the authenticated user's organization.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABhUlEQVR4nIWTiY6EIBBE/f/f3FVHBJT7UKc23XjMJpssyQuKWl1QbWeMxXffox8GzFJiNRbWOljnkFLGcRx44//xfr+ZzoeA1yQwjCOmSbDoPDeWZUWMEaXWm1ortrqhEtuG7QMq3sWYIOaZHY7jBCFmZhIzi2q9YF3XhjGw1iKEwIWIlNI9k2gXQmRnX1/fGMfXKWBgzCeWxfg4nGNBOo6UM0opzfXjMLKjvh94vhxQocsF7cKHCOcDPPHxvJTCQtfocinQywohJDsh6/QSrdNcSmXoPueTc7052+9AOBQ6WGMtpFS8VedcS/lMmnDeszPnaPbIOWPfj1vkGixIFeiDli4F8YTCAdGaVFyQQlJK85Hse3MGPKK3IFVXWvNHkoSl5GulFOQFPVOaW4nev8Ko2xMIC+aUobXmXnxN080kBIQQPBMkuHD6Z+NbC+cpcfoBIouegomdDKdI2/bl8kJx+1Da3C5MQs4UYEKtT9LdsVekFGCDR0gRubTe+s3vbf3FNX4AIdCes2oTIe8AAAAASUVORK5CYII=)![AI security reviewer comment on a GitHub pull request identifying an insecure object reference and recommending scoping invoice lookups to the authenticated user's organization.](https://cdn.sanity.io/images/599r6htc/regionalized/f9f250f725347dcd3bd129a8ffdf1b6e9a3f13dc-1914x1196.png?rect=0,1,1914,1195&w=804&h=502&q=75&fit=max&auto=format)

### [How we started](#how-we-started)

In August 2025, Anthropic released the [Claude Code Security Reviewer](https://github.com/anthropics/claude-code-security-review); we rolled it out the day it shipped, but in shadow mode, so findings went to Slack and Datadog, not to PR comments. It was a fairly standard two-pass reviewer that started by finding possible vulnerabilities and then adversarially filtered false positives. We found that when we replayed it against real incidents, it surfaced the exact root cause with minimal tuning, and generalized well across everything from application security to infrastructure misconfiguration.

However, in week one, only about 15% of findings (4 of 27) were valid. That is the trust problem behind [OpenAI's argument](https://alignment.openai.com/scaling-code-verification/) that precision matters more than recall: Developers stop trusting any tool that floods them with low-quality findings. Precision had to come first, which is not the order you might guess. You would expect the bugs we had already found to be our biggest head start, but replayed as evals, they only measure recall, so they did nothing for the precision we needed first.

Our 70% precision goal was more intuitive than scientific. Most of the team would read a comment if seven of ten were valid.

We held back developer-facing PR comments until precision stayed above 70% over a two-week lookback, with no embarrassingly bad false positives. To clear that bar, we replayed the reviewer over the previous eight weeks of PRs and hand-labeled the false positives ourselves as a security team. From there, we wrote the policy that the agent should follow.

A **precedent** is an example that explains why a finding is or is not valid in context. In this system, we prefer precedents over broad rules because they preserve the security reasoning an agent needs.

Following [prompting best practices](https://code.claude.com/docs/en/best-practices#provide-specific-context-in-your-prompts), the policy consists of precedents instead of rules. For example, rather than “don’t flag SQL injection in `dbops`”, we write something like “`dbops` is only run by highly privileged operators who already have direct database access.”

Ninety-nine lines, 2,560 words, and 68 precedents later, this work had a side effect we did not plan for: We had written a complete threat model, in roughly the form we'd want a new hire to read on day one. _The policy is the threat model._ Agents need security context in an explicit, structured format and at an unusually high resolution. Over Figma's first decade, that context accumulated across documentation, incident learnings, and deep institutional knowledge. It had not yet been consolidated at the resolution an agent needs. That artifact is the real payoff. Secure code generation and repo-wide auditing run on the same threat model, so we never had to build it twice.

> This work had a side effect we did not plan for: We had written a complete threat model, in roughly the form we'd want a new hire to read on day one.

Rohan Sharma, Security Engineer, Figma

### [From prototype to production infrastructure](#from-prototype-to-production-infrastructure)

Within a month of launch, iterating on the policy pushed precision to 80% on a two-week lookback, clearing our 70% bar comfortably. At that point we turned on developer-facing comments. The precision rate continued to improve overall, which let us institute a requirement that no pull request merges without a completed review pass.

Then came the unglamorous part. Making review a merge requirement turned it from a nice-to-have into infrastructure, and infrastructure has to be boring to be trusted. We added provider failover and retry policies, so an outage at one model vendor can't let a PR slip through unreviewed. We added telemetry to Datadog and Slack, because we needed to know the moment precision or recall slipped. We also added fix-rate tracking, because our ultimate objective is to fix vulnerabilities, not to make sure they merely get surfaced.

By December 2025, we'd outgrown Anthropic's GitHub Action and rebuilt around it in three ways:

**Ablation** is the process of removing lines from a prompt to understand the impact of each line.

-   **Moved the reviewer into a TypeScript service.** Our fork of the Action was fine for a prototype, but it quickly became a giant GitHub workflow that wasn’t easy to maintain. We pulled it into a small TypeScript service, which made the reviewer easier to observe and iterate on. This also lets us run Claude Code and Codex independently and retry on failure.
-   **Removed (AKA “ablated”) most of the prompt.** Agents and models have gotten much better at [context management](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) and [long-context retrieval](https://www.digitalapplied.com/blog/long-context-retrieval-needle-in-haystack-2026). We concluded the reviewer didn’t need a separate adversarial pass at all and folded the filtering into a single prompt. Newer frontier models also don’t need to be taught how to find a vulnerability or be reminded about the OWASP Top 10.
-   **Added an adjudicator.** The reviewer kept missing real bugs, and from analyzing eval data we kept seeing the same pattern: Chasing precision, the agent talked itself out of true findings with "pre-existing pattern," "low confidence," or "preparatory plumbing." The first pass already emits the candidates it dropped as structured output, so we added a second pass that re-examines those borderline dismissals. In our evals with known-bad commits, adjudication raised pass-rate recall by a relative ~30%.

![AI review workflow: A single prompt drives an AI reviewer that proposes findings, which a human adjudicator filters before promoting approved results.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAMABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAEFBAb/xAAkEAACAQMDAwUAAAAAAAAAAAABAgMABBESITETIlEjQVNxkf/EABcBAAMBAAAAAAAAAAAAAAAAAAMEBQb/xAAcEQACAgIDAAAAAAAAAAAAAAABAgADETEEIoH/2gAMAwEAAhEDEQA/AOhsLRLjXrkAKxl+cb+Kg3F4yPECsqky6Oxcg/fgVfQr019NM45xT7Pij/KzVfCB7YGPZTNhzuZ5IVTTiQNlQTj2op3GnqbIo24FFJWoquQFhlJI3P/Z)![AI review workflow: A single prompt drives an AI reviewer that proposes findings, which a human adjudicator filters before promoting approved results.](https://cdn.sanity.io/images/599r6htc/regionalized/29fd796459efe9329c82285ede4372ae7d3ef032-3264x1904.jpg?w=1080&h=630&q=75&fit=max&auto=format)

### [Metrics](#metrics)

We're not chasing [pass^k](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) confidence intervals or building holdout sets. We need assurance that the controls work and telemetry that shows when performance slips.

We were confident the reviewer was precise, and backtesting hinted it had good recall too. The next step was to solidify how we measured and improved recall, precision, and fix rate.

#### [Measuring recall with evals](#measuring-recall-with-evals)

We measure recall through a general-purpose eval framework. Since this measures known security flaws, not what’s still emerging or unknown, we treat it as a floor for the agent to clear rather than proof of coverage.

The framework uses a growing corpus of 66 tasks, each a real vulnerability that got past human review and into the codebase, surfaced only later by a bounty, an incident, or an audit. Forty-six of the 66 are tagged from our HackerOne bug bounty program (24 of those from a single top researcher) and the remaining 20 are from internal incidents and audits.

Each task is represented by a small YAML file that contains the root-cause commit, a description of the vulnerability, a score that weights it, and some tags (detection source, incident channel, or researcher).

YAML

```
# evals/pr-review/doc-export-idor.yaml
name: "doc-export-idor"
tags: ["authz", "bug-bounty"]
score: 10000

commit: "<root-cause-commit-sha>"

description: >
  A document export endpoint trusts a document id from the request and returns
  the file without checking whether the caller may access it. Any authenticated user
  can export another user's private document.
```

The framework checks out each commit into its own isolated Git worktree for clean-room analysis, runs the reviewer, and grades what it finds. The task grader is a simple LLM-as-judge that focuses on the description, checking if the reviewer’s finding captures the same issue (even if it’s described differently).

We run two types of scoring:

-   **Pass-rate scoring** tells us what percentage of tasks passed, providing a coverage baseline across known bugs.
-   **Payout-weighted scoring** is normalized to what each bug paid out in our bounty program, with an estimated payout for the ones the program didn’t catch. This tells us how we’re doing on the bugs that matter most, which tend to cluster in a few high-value classes.

Keep in mind that every task in the corpus is a bug that our historical review process, human reviewers plus static analysis (SAST), already missed. So a 75.8% union catch rate is 75.8% of the bugs that got all the way past our existing controls. Here’s how those metrics look with the latest frontier models:

![Reviewer benchmark comparison: A chart compares three AI reviewers by pass-rate recall and payout-weighted recall, with later systems outperforming earlier ones.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUDBgcI/8QAJhAAAQMDAwIHAAAAAAAAAAAAAQIDBAAFEQYHIRITFCIxQWGBsf/EABUBAQEAAAAAAAAAAAAAAAAAAAUE/8QAIREAAQMCBwEAAAAAAAAAAAAAAgABAwQRBRMjMUFhcZH/2gAMAwEAAhEDEQA/ANFatj9wCiw8Gu15iCM9VJILEuW46kvJHbXnkevxSnYyy62jT5MvVEhL0J5jCEl4KIP1VoNnufgrqiEEIlOBQZUVDAPsaPjrCkxBxI9P3pIgYPAZPu1rfVKAQORRXP8AdbFuhAmrYcnlShzkSU4/aKWauiflT57L/9k=)![Reviewer benchmark comparison: A chart compares three AI reviewers by pass-rate recall and payout-weighted recall, with later systems outperforming earlier ones.](https://cdn.sanity.io/images/599r6htc/regionalized/6b2eb62012a2f243fc6186956b1d12218f0b84c8-2293x1720.jpg?w=804&h=603&q=75&fit=max&auto=format)

Every policy change is reviewed by a security engineer and rerun against the full corpus before it ships. That catches regressions on the bugs we already know about; it tells us nothing about the ones we haven’t found yet.

#### [What the policy is worth](#what-the-policy-is-worth)

To see what the engineering is worth versus the raw model, we ran the same Claude Code reviewer with our entire Figma policy ablated to nothing: just "find vulnerabilities," the model, and tools. It still cleared 44.4% of the corpus on payout weight.

While a frontier model finds plenty of vulnerabilities with no help at all, our policy is still a significant advantage. With our policy back in, the same single reviewer climbs from 44.4% to 64.2%. Precision is the larger gap: With no exclusions to lean on, the empty prompt flags every suspicious pattern. We can’t put a number on that from this run, because the corpus is all true positives and only measures recall, but anyone who has turned a coding agent loose on their own repo has seen exactly this.

#### [Measuring precision with human feedback](#measuring-precision-with-human-feedback)

The precision signal can't come from the eval corpus, which is all true positives; it shows up only on live PRs. We hand-labeled once to bootstrap, but we can't keep re-running that. Real findings are rare, so a standing offline precision number would mean running the reviewer over far more PRs than we could hand-check just to gather enough findings to judge, then redoing that sweep after every policy change, since anything we do to raise recall can move precision too. So we measure precision in production.

The reviewer already runs on every PR, and the author knows their own change better than a security engineer seeing it for the first time, so the first call on each finding goes to them, though it isn’t final. A separate agent periodically re-reads the current code behind recent findings, and any disputed or unaddressed case whose flagged pattern is still present goes to security on-call to decide. Because findings are rare, PR authors encounter them only occasionally.

On Opus 4.7, we held a sustained stretch of zero disputed findings from late April through late May 2026. Precision took a small dip when we moved to Opus 4.8, which we think is an acceptable tradeoff for recall improvements via chasing deeper, multi-step exploit chains.

#### [Measuring fix rates](#measuring-fix-rates)

None of this matters if the bugs never get fixed, so we track pre-merge fix rates, with a second agent tagging each finding as fixed, disputed, acknowledged, not addressed, or still pending. Improving this metric requires some social engineering, because a real, well-written finding still competes with everything else on a developer’s plate. We considered hard-blocking merges on an open finding, but ultimately decided not to because the following lightweight changes improved our fix rate significantly without us paying that heavy friction tax.

First, we changed the comment footer from a meek “Questions? Ask #security. False positive? Click 👎 and close. Apologies for the noise.” to a (literally) bolder “🎯 **We tune these for high signal via evals and human feedback. Please address this finding. Click 👎 on false positives to help us keep it high signal. Questions? #security.**”

Second, we restricted the output format to a one-sentence finding, numbered exploit steps, a short recommendation, and relevant code links. That kills the wall-of-text habit Opus 4.5+ models fall into.

### [How we improve the agent](#how-we-improve-the-agent)

When any user-controlled text reaches an agent, there’s a risk of prompt injection. Therefore, we enforce strong trust boundaries for our evals and self-improvement loops:

1\. A validation agent with minimal, read-only privileges does the initial assessment and screens for injection.

2\. Any fix-writing agent runs in an isolated sandbox with egress controls.

3\. CI for agent-generated PRs does not have access to deploy credentials and production secrets.

4\. Nothing merges without human review, SAST, and agentic review passes.

We have two types of self-improvement loops for the agent, one for recall and one for precision. Both strengthen our policy so that we avoid repeating the same mistakes in the future.

#### [Recall: Fixing blind spots in the system](#recall-fixing-blind-spots-in-the-system)

Let’s say one of our bug bounty researchers on HackerOne finds a vulnerability in Figma and reports it. Here’s the loop:

1.  A cloud agent picks up the report and triages it.
2.  The agent filters out the low-quality reports (roughly 75% of submissions), and recognizes this one as different: a rare exploit chain. Note that the monorepo makes validation tractable for the agent, because all of our application logic lives there. We believe reading code is more than sufficient for validating an externally reported vulnerability—exploit generation is unnecessary.
3.  The agent writes a fix and opens a PR. Security on-call reviews the patch and merges it.
4.  The agent traces the vulnerability back to the commit that introduced it, and adds that commit to our eval corpus.
5.  A second agent runs our existing PR reviewer agent against that root-cause commit.
6.  If the reviewer doesn’t catch the bug, the second agent reads the reviewer’s own chat transcripts, works out why it missed (Was the file even read? Read but not flagged? Flagged but excluded?), updates the policy until the reviewer catches the bug, and opens a PR with the change.
7.  Security on-call reviews the policy change and adjusts if needed.

The fix closes this one bug. Updating the policy matters more, because it makes the reviewer catch every future bug of this type during PR review. That is how we improve recall automatically.

We use humans at several stages in this loop, because we still want human judgment on what we merge, especially if an external researcher reported the bug. Furthermore, automated policy refinement can still overfit (“[Goodhart](https://en.wikipedia.org/wiki/Goodhart%27s_law)”) to the one bug in front of it, or produce a verbose amendment no human wants to read.

![Learning from escaped bugs: Security incidents become fixes, root-cause examples, and evaluation tests that continuously improve the AI reviewer and threat model.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBBAYH/8QAJRAAAgECBQMFAAAAAAAAAAAAAQIDAAQFBhESIRMjMRRBUWGB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQQF/8QAHhEAAQQBBQAAAAAAAAAAAAAAAQACBRESAyFRcYH/2gAMAwEAAhEDEQA/ANbloQLZQmfDZXh6akdg6+KYTWtncXCyGxuF267VEB5qMqY80VgG6LP1Ik4aUkDj2GlNzmEmRZPTaOEKAiQ+D+VnvlNUHHEEdnm0l1m1zjMdvZ21+qJaTkbAeYT8mireYMXeC9RNjP2wdWfnyfqiqBIPGzWivUGyv//Z)![Learning from escaped bugs: Security incidents become fixes, root-cause examples, and evaluation tests that continuously improve the AI reviewer and threat model.](https://cdn.sanity.io/images/599r6htc/regionalized/8d59988d740da6228d2800167713e28a698d86e3-3264x2176.jpg?w=1080&h=720&q=75&fit=max&auto=format)

An escaped bug leads to an updated threat model, so that the next similar bug is caught during PR review.

#### [Precision: Reducing the occurrence of false positives](#precision-reducing-the-occurrence-of-false)

If a PR author dismisses a comment as a false positive—either by a thumbs-down reaction, a comment indicating why, or both—we run a simplified version of the previous loop:

1.  An agent skill runs and updates the policy so that this class of false positives never shows up again. It takes into account developer feedback and looks through chat transcripts to see why the model made the error.
2.  Security on-call reviews the policy change and adjusts if needed.
3.  We run the reviewer against the baseline eval corpus with the updated policy.

## [Secure code auditing](#secure-code-auditing)

Auditing runs on the exact same policy we built for PR review. The threat model we were forced to write down to make review precise, and which is continually improved via the feedback loops described above, is what makes auditing possible at all. The main difference here is that we point the agent and policy at the whole monorepo, instead of a single PR.

This is important not only for historical code (our monorepo is 10+ years old), but also in the steady/future state. Models are stochastic and might not surface everything in a single review pass. Plus, our threat model is constantly evolving, and each new model generation can catch vulnerabilities the last one couldn’t.

Auditing is a harder task than review, both for agents and humans. Tell an engineer to find a bug in a PR, and they'll do a good job. Give an engineer a ten-year-old codebase and tell them to find all the bugs, and they won't know where to start. That holds true for agents as well.

We made the task tractable by brute-forcing the problem with many agents. We picked a cost budget and, knowing roughly what one agent costs to scan one slice, turned it into an agent shard count, then scanned. We mostly shard by file or by application routes. Two more adjustments helped: ablating low-severity bug classes so the budget goes where it matters, and bringing back a lightweight adversarial review pass to refute findings.

![Large-scale repository scanning: A budget-aware planner splits a monorepo into shards for parallel AI scanning, then adversarial review and human adjudication confirm vulnerabilities.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFABQDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAAQFB//EAB0QAAICAgMBAAAAAAAAAAAAAAEDAAIEMQUREgb/xAAXAQADAQAAAAAAAAAAAAAAAAACAwQG/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAECAxETQZH/2gAMAwEAAhEDEQA/ANp+QZfK4drL2IIZcdAyzKmFflb7r9DYGoiYOx67JqJV0hpxchYtU5zb9HZEREarZY54gj//2Q==)![Large-scale repository scanning: A budget-aware planner splits a monorepo into shards for parallel AI scanning, then adversarial review and human adjudication confirm vulnerabilities.](https://cdn.sanity.io/images/599r6htc/regionalized/3ae33f8daf71c28aeb363b4c0bbfa79a7fcc4965-3264x816.jpg?w=1632&h=408&q=75&fit=max&auto=format)

On our first run, we found more than a hundred latent vulnerabilities, including two criticals missed by traditional SAST tools, which we patched immediately. We added both to our eval corpus, where they are now its two highest-scored tasks.

More recently, we’ve tried [dynamic workflows](https://code.claude.com/docs/en/workflows) for repo-wide audits with promising early results, but with unpredictable token usage. We might swap our repo-wide audit multi-harness for dynamic workflow-like systems as they mature. With these systems we can simply prompt “find vulnerabilities” with a pointer to the threat model, and they parallelize scans and run adversarial and adjudication passes if necessary.

## [Secure code generation](#secure-code-generation)

An **agent hook** is a script that runs automatically at a defined point in an agent's loop: before or after a tool call, after a user prompt, at session start, etc. These are like git hooks, but instead of firing on git operations they fire on the agent's actions, letting you inspect, block, or modify what the agent does.

To help agents generate secure code, we use hooks. We've found they steer agents more reliably than the same guidance placed in `AGENTS.md`. For some bug classes like logging safety (writing data to the wrong logs), the drop after we added a guidance hook was about 50%. We maintain a vendored, agent-agnostic version of Anthropic’s [security guidance plugin](https://github.com/anthropics/claude-code/tree/main/plugins/security-guidance). It has two sets of agent hooks:

-   One injects just-in-time guidance the moment an agent touches something risky, like adding a route, changing a [permissions policy
    
    ![On the left (Fig. A) showing a purple line scribbled in a roundabout way, and on the left (Fig. B), a much cleaner, circular spiral.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAABbUlEQVQokWWS227bMAyG8xKJzTN18Clz7CRdmqZAL/b+L7VJTrsO+0EJAsUPJEju2rYFAGZmeZ4vIeL2Rf+pbdv9fr9rmgYARCpGlSemYvR5ExYRVasvAoDD4fCEC0QaOEXpjDKBApSgGocIbJSi9EYRoXgA4CszClvSYQ7XNd2P4SVwT8BUkxBK5OHo1zndJj9H7hj5b9kI6JJGXy75cRt/XbqPwU5GVqpnNsmjn9f8dunf1/w62WIcvpeNJnHwZUmPy/CxdO+DL86hdk2M02DnJd8v/WPNr6OfXSIAFrh2G4U127Sk+9q9HcM16w9l3zIzWZLpFH+e8/2UbllnYX9mbtsWEZklSBx9nsLS29EoEZZWFxZJ0DodR5uzToKBkP+BhUVIlM3ElY2QsZLbCIlYWU1cWAjLRBGxaZpPuAapqrur6vdV0Sp3DyGqqYioKGEZ9Q6qtmUSkRijqm7OTVvx7p5SUtW6MCX4D/wbDTFOJt/5PC4AAAAASUVORK5CYII=)![On the left (Fig. A) showing a purple line scribbled in a roundabout way, and on the left (Fig. B), a much cleaner, circular spiral.](https://cdn.sanity.io/images/599r6htc/regionalized/a794eaca524cf9bdfe6e3337c96434d019ae566f-3264x1837.png?w=3264&h=1837&q=75&fit=crop&crop=focalpoint&auto=format)
    
    ### How we built a custom permissions DSL at Figma
    
    When our permissions system came apart at the seams, everything came to a halt. This is the story of how we fixed it while improving performance, accuracy, and developer ergonomics.
    
    
    
    ](https://www.figma.com/blog/how-we-rolled-out-our-own-permissions-dsl-at-figma/), or logging telemetry.
-   The other set hands the diff to an LLM periodically or, on commit, kicks it to a second coding agent for a look. These run on the same policy as our reviewer and auditor.

![Terminal showing an AI coding assistant blocking a file write with a security warning that requires reading authentication, compliance, and test coverage documentation before adding a new API route.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsTAAALEwEAmpwYAAABCUlEQVR4nI2Qy26DMBBF2aQ0CW/ztDEGg41DSOn//9ytbGg2Tasujnw18hxdjVdxBTbeQeUD9bDuHLkUC4ruhuqY20y4AWnnA/PMGdOIawkvrQRYbzDoFWJ+QJgPCLOB6w10tNKbo+jsskbKJiRUImkkUjoiPXJU9biQFt45aUAaASEVpDIY5gWdXsAm23pBKWwDhcyKmgFhKRAUHNecuzdwucUlo/CTGp4fVwiLFlQoDOqOfl7RqXWXddpJnkuE4ZxRvKfNS/y42oX2c8k1hN7Qm0/0ZnN3Je3kZL8Jfgi/G57TBlHZgbAReTs5MioRFvzPRi8bnsIcflTAj0o3cLi88xb9n1OQ4wv4JLJasSvzxgAAAABJRU5ErkJggg==)![Terminal showing an AI coding assistant blocking a file write with a security warning that requires reading authentication, compliance, and test coverage documentation before adding a new API route.](https://cdn.sanity.io/images/599r6htc/regionalized/fe7962d55728926dd0a935a8850f8cf00546f908-1500x497.png?rect=0,1,1500,496&w=804&h=266&q=75&fit=max&auto=format)

Adapted recreation (not a live terminal capture). The just-in-time PreToolUse hook intercepts a Claude Code Write, detects the new API route rule, and blocks the edit until the agent reads the required API route and authorization guidance. Note that the above guidance is for the agent, not the human operator.

Hooks also have a property that PR review doesn’t: They don’t carry a high precision bar, because they’re mostly invisible to the human author. That lets us use them to nudge toward good practices, not just away from vulnerabilities. When an agent adds a new API route, a hook can steer it to attach the proper secure-by-default authorization decorator and tests, in addition to merely surfacing authorization bugs.

## [What we learned](#what-we-learned)

We can't tell you exactly what to do: The specifics depend on your company size, the risks you face, and the feedback loops you already run. But one main lesson is to improve precision before recall. The order is counterintuitive, because the historical bugs you already have can only measure recall; they barely help with the precision you must fix first.

Another key lesson is that precision and recall come from different places, which is the part we had to work out ourselves. Recall comes from replaying the reviewer against bugs you already found and counting the misses. Precision has no fixed target to replay and shifts with every policy change, so there is no standing offline eval to run. Judging enough of the rare live findings would mean combing through mostly benign PRs at a scale no team could keep up with. In production the reviewer runs on every PR anyway, so the author, who wrote the change, makes the first call, with another agent re-reading the current code behind each finding and sending any disputed or unaddressed case whose flagged pattern is still present to internal security experts.

A few more things we’ve learned:

-   **Put a triage agent, with source access, on every incoming bug bounty report.** A newer kind of bug bounty researcher chains low-severity vulnerabilities into high-impact exploits. Triage fast, build trust, and treat these researchers as some of your most valuable security assets. We can’t rely on the reviewer to catch a novel bug class outside the threat model. Those still fall to internal security experts and external sources such as the bug bounty program. Manual triage is too slow to sustain the whole feedback loop, whereas an agent enables fast triage that builds trust with researchers, feeds better evals, and eventually drives better recall.
-   **Make agents review for good practice, not just for bugs.** Have agents check that code uses the right secure-by-default frameworks and has real test coverage. Skip this and the codebase drifts toward something neither a human nor a model can reason about. Across all three stages discussed, we run separate agents to guard against anti-patterns and quality issues well beyond bug finding, more than we can cover here.

With the right systems in place, our security engineers moved from triaging one bug at a time to writing the policy that catches hundreds of bugs and prevents hundreds more. It’s a lot like the job we’ve always had, just with more leverage.