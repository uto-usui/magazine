---
title: "Research-In-The-Loop: How UXR Adapts to Development at AI Speed"
source: "https://www.nngroup.com/articles/research-in-the-loop/"
publishedDate: "2026-11-13"
category: "design"
feedName: "Nielsen Norman Group"
author: "Tony Alicea"
---

Summary:  As AI speeds up development, it can be a challenge for research to adapt. Research can define what each release must measure and what it can help teams discover.

-   [Shipping Can Be Faster than Research](#toc-shipping-can-be-faster-than-research-1)
-   [The Cost of Software](#toc-the-cost-of-software-2)
-   [The Same Drop in Cost Works for Research](#toc-the-same-drop-in-cost-works-for-research-3)
-   [Research-in-the-Loop](#toc-research-in-the-loop-4)
-   [From Research Requirements to Instrumentation](#toc-from-research-requirements-to-instrumentation-5)
-   [Quant and Qual in the Loop](#toc-quant-and-qual-in-the-loop-6)
-   [New Work and New Skills](#toc-new-work-and-new-skills-7)
-   [Open Questions](#toc-open-questions-8)
-   [How to Begin](#toc-how-to-begin-9)
-   [Research at the Speed of AI](#toc-research-at-the-speed-of-ai-10)

## Shipping Can Be Faster than Research

As AI agents write more code, the economics of building software is changing, and long-standing practices for making usable software are changing with them. This has happened in technology before.

Early photographers worked slowly. Film was expensive, exposures took time, and you didn't see the result until the film was developed. Every shot was set up with care.

Then digital photography changed the economics of taking a picture. Now you hold down the button, take dozens of frames, look at what you got, adjust, and shoot again. You still aim. But much of the learning happens after the shot, because each shot costs almost nothing.

Software development is going through a similar change. With AI coding agents, many teams now pick a direction, build, release, and watch what happens. If it's wrong, they change it, because iterating is cheap.

However, if a release can be shipped faster than users can be studied, where does that leave research? Unlike a bad photo, a bad release reaches real people. Thus, research can't go away, but it needs to change to keep pace with development at AI speed. We call that change **research-in-the-loop**.

To describe it we, like AI, need some context.

## The Cost of Software

For most of software's history, building was expensive and changing what you built was harder. A feature could take months. A mistake that shipped might need to wait a full release cycle to be fixed, and fixing it after release cost money, time, and customer trust.

So [formative research](https://www.nngroup.com/articles/formative-vs-summative-evaluations/) went first. Teams studied users and tested designs before engineers wrote code.

AI coding agents have removed much of the cost of fixing a mistake after launch. When a feature can be implemented in an afternoon, a long study before the build is harder to justify, and many teams now ship first and ask questions later.

But a release tells you what happened. It rarely tells you why. A team watching its dashboards can see that people abandoned a workflow. It can't see what they were trying to do or what confused them. Those are the questions research has always answered.

Building the wrong thing quickly is still a failure. Research matters no matter how fast development moves. But the real question is how research adapts to AI-driven development speed.

That answer is still being written, but new possibilities and revised versions of long-standing practices are already emerging and worth exploring.

## The Same Drop in Cost Works for Research

The change that weakens the case for long upfront studies also opens a door for research to provide value to product development at AI speed.

Consider what researchers have historically needed from engineering: an intercept survey that appears when someone abandons a flow, event logging for a new feature, a feedback button tied to a specific release, a dashboard showing where work gets stuck. Each of these took engineering time, and engineering time usually goes to new features.

Now a coding agent can build those things alongside the feature itself, often from a few lines in the requirements. Research instrumentation is as cheap to build as everything else.

AI makes it possible to build research mechanisms alongside the software, which can tighten the loop between development and research.

## Research-in-the-Loop

In AI, human-in-the-loop describes a system where a person reviews or approves decisions inside an otherwise automated process. As more teams build agentic workflows (sometimes called [software factories](https://www.nngroup.com/articles/ux-agentic-software-factories/), where requirements go in and working software comes out), people are asking where humans belong in that loop.

> **Research-in-the-loop** is an approach to integrating UX research into AI-assisted software development, adapting research activities to faster development cycles. It takes advantage of AI’s ability to build instrumentation-based evaluation mechanisms together with product features, while also determining when other research methods (such as open-ended discovery) are needed in order to inform development decisions.

Before the build, research can help shape what a release must capture. During the build, coding agents implement that capture along with the feature. After the release, researchers study what happened. What they learn feeds the next set of requirements.

Research-in-the-loop could support different kinds of research activities:

-   **Evaluation**: Did the change result in the outcomes we predicted? Did it introduce anticipated problems? Instrumentation can help answer these questions by tracking the right, predefined metrics.
-   **Investigation**: Why did people behave as they did? What happened that the team didn't predict? Instrumentation can reveal anomalies in the data that research can investigate further (often through qualitative research).
-   **Discovery:** What needs, behaviors, or problems didn’t the team anticipate? Answering these questions often requires more open-ended research that is not necessarily tied to product releases or instrumentation.

These types of activities complement each other. Instrumentation can make evaluation and investigation more efficient, but it cannot replace independent discovery.

Therefore, research-in-the-loop involves rethinking how research is allocated across AI-assisted development: which questions can be answered through continuous evaluation, which require independent discovery, and which need research before development begins. How best to balance these activities remains an open question.

One promising starting point is to build research instrumentation alongside product features.

## From Research Requirements to Instrumentation

With AI-assisted development, teams can specify research _and_ product requirements in a single spec, and coding agents can build the necessary instrumentation alongside the features. Researchers can then use the resulting data to inform subsequent design improvements, while continuing to run other types of research where appropriate.

One way to support this process is by adding a research section to the requirements a team and its coding agents build from. It may be written in plain language in a file next to the rest of the spec, so people and agents can both read it.

For example, suppose a help-desk product is used by companies with several support departments. A ticket that needs to be passed to another department goes back through a central queue. However, a product team is adding a feature that lets departments pass tickets directly to each other. Thanks to AI, that feature will be built and released very quickly.

That feature's requirements (sometimes called a "spec" or an "intent" document in AI-assisted teams) might have a research-focused area that looks something like this:

\## Research  
 

\*\*What we expect:\*\* Letting departments pass tickets directly to each other will get tickets to the right team faster, with fewer handoffs.  
 

\*\*Signs suggesting it worked:\*\* Less time between a ticket's creation and its resolution. Fewer tickets passing through three or more departments. Lower overall support cost per ticket, measured by turnaround time.

\*\*Signs suggesting it caused problems:\*\* More tickets sent back for review, or more tickets reopened by customers.

\*\*What to track:\*\* Every handoff: which department sent it, which received it, how long it waited, and whether it was sent back. Show this in a small dashboard for the research team. Group it by department rather than by person. Its purpose is to help the researchers determine who to talk to.

\*\*When to talk to people:\*\* When a department sends back an unusually high share of tickets, or tickets stall there, schedule contextual inquiry with people from that department.

A coding agent reading this spec can build the event logging, the dashboard, and the send-back question along with the feature, releasing the research instrumentation along with the software.

The first three items in the spec identify the outcomes the team wants to evaluate. They help the team members determine if their prediction might have been correct and they intentionally include both user (fewer handoffs) and business outcomes (support cost per ticket). Researchers can struggle to connect user behavior to business results after the fact. Here the connection is designed into the system before the software is shipped.

The last two items help researchers investigate problems uncovered by the collected data. The dashboard won't explain why tickets stall in a particular department, but it can help researchers identify which department to talk to. Other research, conducted independently of these signals, could identify problems or needs that instrumentation was not designed to address. For example, it could identify that support agents often bypass the official ticket-transfer process, relying instead on informal communication with people they know in other departments. Because these interactions happen outside of the ticketing systems, they may not be reflected in the data.

Importantly, this specification is not yet a complete evaluation design. It identifies what to measure but it does not establish whether any observed changes in the measurements were caused by the new feature. For example, if ticket-resolution times decrease post release, how do we know that this was because of the new feature or because changes in staffing or ticket volume due to seasonality? A valid evaluation may require more than just a set of metrics. It may involve specifying a comparison group, a sample size, an observation period. Researchers would also need to determine whether the metrics adequately capture the intended outcomes: for example, faster resolution times may not necessarily mean lower support cost if the system simply reduces the time the ticket waits in the queue instead of the time spent addressing it.

AI can make instrumentation and experimentation more accessible to researchers, but they still need to determine what evidence is necessary and how to collect and interpret it soundly.

## Quant and Qual in the Loop

This is a lot of potential data. Thus, for quantitative research, this can be a remarkable time. Every release can produce data from the actual user base. A researcher can use AI to build a dashboard combining support tickets, satisfaction scores, and in-product behavior and to run a first pass at synthesis across all of it.

However, quant only covers what the release was set up to capture. It shows what people did. Explaining the patterns in the data, as well as discovering new user needs will require qualitative research.

Thus, qual stays essential. What changes is the different ways it fits into the loop. Qual research may be carried out via multiple simultaneous approaches, for example:

-   **Cadence.** Research sessions could be carried out on a regular schedule, such as weekly, and not tied to software releases. Research teams may focus that period's research on recently released features to check mission-critical workflows, assess the overall health of the user experience, or conduct other research or open-ended discovery deemed useful.
-   **Signals.** Release data or incoming feedback may need further investigation that would best be carried out through user research — for example, it may point to a group or a moment worth exploring: a department where tickets stall, a cohort that behaved unexpectedly, an odd answer to an exit survey.
-   **Decisions.** Some decisions are hard to reverse: pricing, promises to customers, how sensitive data is handled, a new mental model. Those deserve evidence before the team commits. Coding agents, for example, can quickly build interactive prototypes to assist with research prior to implementation.

A clear picture of how traditional research fits into this fast-paced, AI-driven loop is still emerging. However, the approaches above are some of what teams are trying today.

![Research-in-the-Loop framework: research methods feed a repeating cycle of Specify, Build and Instrument, Release, and Evaluate and Learn.](https://media.nngroup.com/media/editor/2026/11/13/research-in-the-loop.png)

Research-in-the-loop builds evaluation in the AI-assisted development cycle through instrumentation, while also using more traditional research methods to inform what to build and explore next. 

## New Work and New Skills

Research-in-the-loop creates new types of work for researchers:

-   Writing research requirements that coding agents can implement
-   Packaging research methods as agent skills, such as drafting research requirements from a feature's intent 
-   Building their own tools: dashboards, intercept surveys, prototype variants
-   Running continuous synthesis of incoming feedback and support tickets, so that an anomaly in this data triggers a request to run a round of qual research

Research sections live alongside the [UX-context](https://www.nngroup.com/articles/ux-context-design/) and the product requirements. Research becomes part of what the team builds from.

Some of that work calls for skills many researchers haven't needed before:

-   **Spec fluency:** [reading and writing markdown specs](https://www.nngroup.com/contents/self-paced-courses/writing-specs-for-ai-built-products/), plus basic Git
-   **Directing coding agents:** [asking an agent to build something](https://www.nngroup.com/contents/self-paced-courses/coding-tools-for-designers-building-prototypes-with-ai/), then checking what it built
-   **Analytics-instrumentation literacy:** events, cohorts, feature flags, staged rollouts
-   **Data plumbing:** MCP connections, APIs, and who has access to what

However, the core skills of research matter more than ever in this loop: asking good questions, avoiding bias, using judgment in synthesis, designing sound quantitative experiments and analyzing quantitative data, as well as enforcing ethical research practices. An agent can build a survey in minutes. The researcher is accountable for asking the right questions.

## Open Questions

Research-in-the-loop is a proposition, and many questions remain open:

-   **Where do different forms of research fit?** Generative, foundational, and longitudinal research may each belong in different parts of the loop.
-   **How do we monitor and evaluate system-level effects**, where a feature may work okay by itself but affect other parts of the system
-   **How do we design instrumentation so we derive sound conclusions from it**, and avoid invented patterns and bias in AI synthesis?
-   **How do we decide that traditional research is better suited than continuous evaluation?**
-   **How should cadence, signals, and decisions be balanced?** A team that follows only signals will study only what it instrumented.
-   **What counts as valid evidence from a release?** A short period of noisy data and self-selected survey responses have real limits.
-   **What is the impact of measuring every release?** Does it pull teams toward small, measurable improvements at the expense of bigger questions?
-   **Who owns the research requirements?** Researchers, product managers, or both? Who reviews it?
-   **How much is too much?** Intercepts and surveys can pile up on the same people, and too much instrumentation can feel like surveillance.

## How to Begin

You don't need to reorganize your team to start. Try it for one release, end to end.

1.  **Audit data readiness.** Map where user signal lives and check which sources you and your team's agents can reach.
2.  **Write one research section.** A hypothesis, success and harm criteria, what to track, and when to talk to people.
3.  **Share it with the team.** Show it to the product manager and engineers working on the release, and work toward building it in. If that release isn't ready for it, use AI to find insights in the data you already have.

## Research at the Speed of AI

Shipping can now be cheaper than a big upfront study. However, a team shipping faster than ever still needs to know whether what it shipped worked and why. It still needs to discover previously unknown user needs. The same drop in cost that made shipping cheap now lets researchers build those answers into every release.

That's an opportunity research hasn't had before. For years, researchers asked for engineering time and waited. Now they can specify what a release must capture and see it built alongside the feature.

A photographer with a digital camera takes far more pictures than one with film. Someone still has to know which picture is the one to keep.