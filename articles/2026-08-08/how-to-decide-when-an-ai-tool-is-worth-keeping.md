---
title: "How to Decide When an AI Tool Is Worth Keeping"
source: "https://www.nngroup.com/articles/prove-framework/"
publishedDate: "2026-08-07"
category: "design"
feedName: "Nielsen Norman Group"
author: "Caleb Sponheim"
---

Summary:  Pressure to adopt AI isn't evidence that a tool helps. The PROVE framework tests one tool against one task and produces a provisional decision you can defend.

Tech workers face constant pressure to adopt AI tools, with little guidance on how to tell whether a specific tool improves a specific type of work. This article introduces **PROVE**, a lightweight evaluation framework we teach at NN/G, and applies it to a real workflow.

-   [Why It's Difficult to Evaluate AI Tools](#toc-why-its-difficult-to-evaluate-ai-tools-1)
-   [Problem Alignment: Start with the Task, Not the Tool](#toc-problem-alignment-start-with-the-task-not-the-tool-2)
-   [Risk: Confirm You Can Use the Tool Responsibly](#toc-risk-confirm-you-can-use-the-tool-responsibly-3)
-   [Output Quality: Benchmark Against Your Own Real Work](#toc-output-quality-benchmark-against-your-own-real-work-4)
-   [Velocity: Measure Total Time, Not Generation Time](#toc-velocity-measure-total-time-not-generation-time-5)
-   [Experience: Weigh the Friction that Recurs](#toc-experience-weigh-the-friction-that-recurs-6)
-   [Turn the Evaluation into a Decision You Can Explain](#toc-turn-the-evaluation-into-a-decision-you-can-explain-7)
-   [Use Evidence in Both Directions](#toc-use-evidence-in-both-directions-8)

## Why It's Difficult to Evaluate AI Tools

Product teams hear from leadership that they need to move faster, use the tools the company has purchased, and keep up with every release, all while spending less money on AI and learning new tools without taking time away from their work. Under that kind of pressure, evaluating a new tool fails in two main ways:

1.  We try a tool once, get a plausible result on a demo-friendly use case, and call it productive.
2.  We try it on the wrong task, hit a frustrating limitation, and write it off completely.

Neither failure addresses the real question: **compared with how you already do this work, does the tool produce an outcome worth adopting?**

PROVE stands for **Problem Alignment, Risk, Output Quality, Velocity, and Experience**. The goal is to evaluate one tool against one task and end with a recommendation you can explain to a manager, teammate, client, or yourself. PROVE is not meant for organization-wide tool recommendations or for characterizing monetary costs for prolonged use. Instead, PROVE is a framework for a person deciding whether a tool is promising enough to keep using on a specific task. It is designed to alleviate the pressure to rapidly evaluate and adopt new AI tools for work.

### Gemini Notebooks Example

To show how the framework works, I'll walk through an evaluation I ran on Google's Gemini Notebooks (formerly known as NotebookLM). Every week, I curate two to four articles worth sharing with colleagues and write a short editorial digest for our team's Slack channel; ideally, it's a paragraph of commentary on each piece, with links. I wanted to know whether Gemini Notebooks could draft that digest for me.

## Problem Alignment: Start with the Task, Not the Tool

It's tempting to open a new AI tool and start poking around. Exploration can be fun, but it won't tell you whether the tool is useful. Before you spend money, change a workflow, or ask colleagues to adopt anything, define the task first: **what would this tool help you do?**

Start with a recurring task that takes meaningful time or effort, then ask whether the tool's capabilities match that task. A tool that looks impressive in a demo may have no useful role in your workflow, while a modest tool may remove a bottleneck you hit every week. AI doesn't exist in a vacuum; it competes against your current process: your current quality, speed, and tolerance for friction.

### Gemini Notebooks Evaluation

For my needs_,_ the digest task passed this check easily. It recurs weekly, so any improvement compounds. It doesn't demand publication-quality writing, since the audience is an internal Slack channel. And Gemini Notebooks' core mechanic (upload sources, ask it to synthesize across them) maps directly onto the work: I've already read and selected the articles; I need help turning them into a digest. I also already had access to it through our Google Workspace, so no procurement request was needed.

## Risk: Confirm You Can Use the Tool Responsibly

Before spending hours testing a tool, make sure it's appropriate for the data you plan to give it. Is the tool approved by your organization? What kinds of data or information will you put into it? Does the privacy policy permit that use? Are you handling personal information, confidential research data, unreleased strategy, or proprietary code?

When someone is under pressure to adopt AI, creating a personal account or subscribing to an unapproved service can feel like an easy workaround. This practice (often called shadow AI) is widespread: [UpGuard's research](https://www.upguard.com/resources/the-state-of-shadow-ai) found that roughly 80% of employees admit to using AI tools their employer hasn't approved. ‘Widespread’ doesn't mean ‘safe.’ Using organizational data in an unapproved tool creates risks that can wipe out the time savings you were after.

If you can't use a tool responsibly for the task you have in mind, don't force it into the workflow. Use that finding to redirect the conversation: maybe the team needs a different approved tool, a limited use case with safe inputs, or a formal security review.

### Gemini Notebooks Evaluation

The inputs to my AI digest workflow were published, public articles, so there's no participant data or client information. I still checked Gemini Notebooks' privacy documentation, which states that Workspace users' uploads and queries aren't reviewed by humans or used to train models. Low-sensitivity inputs, along with acceptable terms, meant the tool passed. If I were uploading research transcripts instead of public blog posts, this step would have ended the evaluation.

## Output Quality: Benchmark Against Your Own Real Work

Once an AI tool meets a need and is safe to use, it's time to evaluate its output against a real benchmark. Pick an actual example of your own work and ask: is the tool's version better than, as good as, or good enough compared with what you already produce?

Quality isn't one universal standard. A rough internal outline can be useful even if it doesn't sound like you; a client-facing recommendation has a higher bar. What matters is whether the output is good enough **for this task and its stakes**.

### Gemini Notebooks Evaluation

My benchmark was a digest I had written and posted to Slack. I uploaded the same three sources: a 1983 white paper on the ironies of automation, a podcast episode, and a blog post about AI coding agents. Then I used Gemini Notebooks to produce a digest for the same audience. The output was accurate and complete: every claim traced to the right source, with no invented findings. But it read like a report, with numbered items and _Summary/Significance_ labels, where my version read like a person talking to colleagues. The tool captured the content and missed the voice, so output quality wasn't perfect.

## Velocity: Measure Total Time, Not Generation Time

A new AI tool can make one part of a task feel fast, but without a comparison point, it's hard to know whether the whole task is faster with AI or without. Compare the **total time** required with and without the tool: setup, prompting, reviewing, correcting errors, reformatting, and moving material between systems. A three-second generation can still create a thirty-minute editing job.

The inverse can also happen: Using a new AI tool may take longer than your usual approach but produce an outcome you couldn't have produced alone, and that trade can be worthwhile when the quality gain matters.

### Gemini Notebooks Evaluation

Writing the digest by hand takes me about 25 minutes. The Gemini Notebooks version took a little over 10 (including voice edits). Some of that time was learning curve, so I'd expect the second run to be even faster.

## Experience: Weigh the Friction that Recurs

A tool can deliver high-quality output quickly but still fail in daily practice because it's difficult to use. Maybe it requires repetitive setup, forces you to shuttle content across browser tabs and file formats, or makes its results hard to review and trust. These small costs can compound over time, especially for frequent tasks.

In PROVE, we recommend separating one-time friction from recurring friction. It's reasonable for a new tool to require setup and practice, but it's less reasonable for it to lead to an awkward, error-prone workflow forever. The best AI tools fit the work well enough that people keep using them after the novelty wears off.

### Gemini Notebooks Evaluation

Setup friction was low, and the learning curve is mostly behind me; they're both one-time costs that amortize quickly for a weekly task. The recurring friction is workflow fragmentation: Gemini Notebooks adds a system to the middle of the task without removing one. When writing the update manually, the digest is three steps:

-   read the articles
-   write
-   post

With Gemini Notebooks, it becomes six:

-   read the articles
-   upload them to Gemini Notebooks
-    prompt the system one or more times
-   copy the draft out
-   reformat it for Slack
-   post

 I still select and read the articles myself, and I still edit and format in Slack; the tool sits between those two steps and costs me two extra handoffs every week. It's tolerable, but it's the reason this dimension of PROVE earned my lowest score.

## Turn the Evaluation into a Decision You Can Explain

For rating the dimensions of output quality, velocity, and experience, we recommend a simple five-point scale, where 3 means "about the same as my current approach."

My Gemini Notebooks evaluation came out as follows.

-   **Output quality: 4/5 –-** Accurate and complete, but needs voice editing before posting
-   **Velocity: 4/5 –-** Roughly 60% faster on raw time; closer to even with a full voice edit
-   **Experience: 3/5 –-** Functional but not seamless; two extra handoffs every run

Scores reveal the pattern, but they don't replace judgment. A tool with strong quality but a weak experience may warrant a limited trial; a high total score may still be the wrong fit for a high-stakes task.

Whether the evaluation is for yourself or a stakeholder, you should be able to answer four questions:

1.  **What did you evaluate?** Name the tool and the specific task.
2.  **What did you find?** State the most important quality, time, and workflow evidence.
3.  **What are you going to do?** Keep using it, run a time-boxed trial, set it aside, or revisit it later.
4.  **What is the main caveat or next step?** Name the condition that matters and what should happen next.

Here's my Gemini Notebooks evaluation in that form:

I evaluated Gemini Notebooks for drafting a weekly research digest for our team Slack channel. Compared with writing by hand, it produced accurate, complete drafts and cut drafting time from about 25 minutes to about 10, though the output needs voice editing before posting. I'm going to keep using Gemini Notebooks for this task through a one-month trial, because a first pass against a real benchmark showed enough quality and time gain to justify a longer test. The main caveat is that it writes like a report rather than a person, so the next step is a month of weekly use to confirm the time savings.

That structure gives your teammates enough information to understand the decision, and it keeps the claim proportional to the evidence: a single run on a single set of inputs is a screen, not a verdict. It also prevents a common overreach: an evaluation of one tool for one task is not evidence that the whole organization should use that tool for everything.

## Use Evidence in Both Directions

Pressure to use AI is real, but **pressure is not evidence**. If someone asks why you're not using a particular tool, you should be able to point to the task you tested, the tradeoffs you found, and the decision you reached: "This tool didn't improve this work enough to justify its cost, risk, or friction." It also replaces a vague demand like "use more AI" with a better question: which parts of this workflow have we tested, and where did the evidence show improvement?

Skepticism can become its own reflex, though. A framework should not become a way to protect every existing workflow from change. My Gemini Notebooks evaluation ended in a ‘yes,’ and the evidence made that ‘yes’ easy to defend. If a tool produces work that's good enough for the task, saves meaningful time, and fits how people work, it's likely worth keeping in your workflow, even if you feel personally resistant.

Treat the outcome of a PROVE evaluation as a provisional decision, not a permanent one. Tools change, tasks change, and your own skills change. We recommend revisiting a tool after a few weeks of real use, especially when the tool updates or the workflow evolves. The eventual goal is a smaller set of tools you trust for work that demonstrably improves. We want to avoid a growing pile of AI that looks impressive but makes your work worse.