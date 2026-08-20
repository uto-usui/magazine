---
title: "Introducing Vercel for Slack"
source: "https://vercel.com/blog/introducing-vercel-for-slack"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Vercel"
author: "Bryan Hunter"
---

[Vercel Agent](https://vercel.com/agent) now works in Slack. Mention it the way you'd pull a teammate into a thread, and it reads the discussion, answers with the context of the platform running your app, and turns the team's decisions into changes you approve. Vercel for Slack is available today in Public Beta for Pro and Enterprise teams.

[Work starts in conversation](https://slack.com/customer-stories/vercel-story). An alert gets noticed in a channel, a fix gets agreed on in a thread, and then someone leaves Slack to do the work. With Vercel Agent, you can tag it in for answers about your infrastructure or hand it the work, all without leaving the conversation.

## [Copy link to heading](#what-is-vercel-agent)What is Vercel Agent?

When we [introduced Vercel Agent](https://vercel.com/blog/introducing-vercel-agent), we called it an AI teammate for your development workflow. Today it's the [first responder for your production apps](https://vercel.com/blog/vercel-agent). When something changes, it investigates your logs, metrics, and deployments, finds the root cause, and proposes a fix, often before anyone's opened a laptop. Give it a PR and it flags the regressions and risky changes that a passing CI run won't show.

In Slack, that agent joins the conversation itself. It is a [core part of Vercel](https://vercel.com/blog/agentic-infrastructure), so your deployments, build statuses, logs, metrics, code reviews, and PRs are in front of it before you've typed anything. Mention `@Vercel` in a channel, a thread, or a DM, and it answers like a teammate with every tab already open. And answering is only half of it, because once you know what's wrong, the agent can go fix it:

-   **Diagnose issues**: Investigate incidents, trace errors to the deploy that caused them, explain a cost spike, and answer questions about your codebase.
    
-   **Code alongside your team**: Fix failing builds and CI, review PRs with knowledge of how the code runs in production, and turn a thread's decision into a tested pull request.
    
-   **Operate your projects**: Roll back deployments, update configuration, manage feature flags, and resolve unusual usage before it becomes a bill.
    

The agent is read-only by default, and anything that changes code or configuration goes through a plan that you approve. Vercel for Slack brings that whole loop into the threads where you and your team are already discussing work.

## [Copy link to heading](#accelerating-development-with-a-conversation)Accelerating development with a conversation

Teams form decisions through collaboration. Incidents get triaged in a channel, code reviews are hashed out in threads, and features get scoped between standups. But once a thread settles on what needs to be done, the actions still need to be translated into tickets, terminal commands, and PR descriptions. Every handoff drops context, and the conversation that held the full picture becomes the thing everyone summarizes from memory. Vercel for Slack gives the agent the full context of the original conversation for every turn.

### [Copy link to heading](#answers-in-one-place-speed-up-the-whole-team)Answers in one place speed up the whole team

A deployment goes out at 1:42pm. By 1:51, checkout error rates are climbing and an alert lands in the platform engineering channel.

What used to happen next was a scatter. One responder opens logs to see how bad it is, another asks their coding agent to line up the anomaly up against the deploy timeline, a third starts reading the diff of the suspect PR. Each person investigates alone, in their own view of the same system, and the thread is where they reconcile by pasting screenshots, summarizing agent findings, and correcting each other as they establish the actual state of the situation. The minutes that matter get spent assembling the picture before anyone can act on it.

With Vercel for Slack, the first question goes to the agent, right in the thread.

**"@Vercel, checkout errors spiked after the 1:42 deploy. What's going on?"**

It sizes the blast radius, correlates the spike with the deployment, identifies the PR that shipped in it, and explains which change, in which file, caused which behavior. The answer arrives in the channel, where the whole team reads the same diagnosis at the same time.

Nobody has to re-run a teammate's investigation or wait for the recap, because everyone is looking at the same report. The engineer who knows the checkout code speaks to the change itself, the on-call weighs how many users are hit against how long a fix would take, and what's left for the thread is the decision, whether to roll back or fix forward.

### [Copy link to heading](#vercel-agent-understands-how-your-team-already-talks)Vercel Agent understands how your team already talks

The thread, channel, or DM is the beginning of the prompt itself. You don't have to re-explain anything that was already said, or pass in any context from your app or codebase. Bring it into a conversation like any other team member and it reads the room, picks up what the team has been discussing, and can act on it when asked.

One example of this was our iteration on Vercel Agent's plan card, the message it posts in Slack to request approval for the work it wants to do. The first version we tested internally was a wall of text, but when one of our engineers noticed that people were often approving actions without reading all of the details, we had a redesign thread that ran 47 replies deep on what a person needs to see before confirming an action on the group's behalf. Tagging Vercel Agent in at the end of that thread is what resulted in the card you see today.

By the time a PR from a conversation like this lands in a thread, the tests have already run and the preview deployment is live, so the team can start reviewing it in the conversation that kicked off the feature in the first place.

### [Copy link to heading](#vercel-agent-reviews-pull-requests-in-the-thread)Vercel Agent reviews pull requests in the thread

Ask Vercel Agent for a review in the thread where the PR is being discussed, and the conversation is passed along with the request. What your team has been raising becomes context for what Vercel Agent checks, and its findings land back in the same thread, so discussing them, deciding, and fixing them is one loop instead of a trip to another tool.

One example from one of our own PR discussions was a review someone requested mid-thread. The agent came back with a bug sitting just outside the diff, the same title rendered twice in the UI.

A finding doesn't have to end as a comment. If the team agrees it should be fixed, the agent can patch the PR itself, and that change arrives the same way everything else does, as a proposal waiting on an approval.

### [Copy link to heading](#changes-always-go-through-a-plan-your-team-approves)Changes always go through a plan your team approves

When a thread lands on a change, Vercel Agent replies with a plan that says what will happen, in which project, and at what scope. Decisions in a channel form in fragments, across people and hours, and nobody types "DECISION:", so the plan is where all of that becomes one explicit thing to say yes to. Once approved, the agent does the work under its own identity, and the audit trail shows who asked, who approved, and what ran.

One example from our own threads was a cached page showing stale data after we shipped an update. Someone called for a cache purge scoped to just the specific pages, since it was peak hours, and asked the agent to set it up. The plan that came back matched the ask exactly, a purge of the specific path and its sub-paths with the rest of the site's cache left warm, and nothing ran until someone approved it.

Whether a thread ends in a diagnosis, a pull request, or a cache purge, the last step belongs to a person.

## [Copy link to heading](#getting-started)Getting started

The easiest way to get started is to simply ask Vercel Agent questions. Ask about the error you're chasing or the build that just failed, see what comes back, and let your team decide over time how much of the work the agent takes on. Until someone approves a plan, it's only ever reading.

Vercel for Slack is available in Public Beta for Pro and Enterprise teams. To start using Vercel Agent in Slack:

-   Open the [Slack app in the Vercel Marketplace](https://vercel.com/marketplace/slack) and click `Connect Account`.
    
-   Choose the Slack workspace to connect, then click `Allow`.
    
-   Mention `@Vercel` in a channel, a thread, or a DM.
    
-   Sign in to your Vercel account when it prompts you the first time.
    

See the [Vercel for Slack docs](https://vercel.com/docs/agent/chat/slack) for setup and permissions.

Vercel Agent can make mistakes. Review proposed changes before approving.