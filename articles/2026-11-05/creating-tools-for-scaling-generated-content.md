---
title: "Creating tools for scaling generated content"
source: "https://designnotes.blog.gov.uk/2026/11/03/creating-tools-for-scaling-generated-content/"
publishedDate: "2026-11-03"
category: "design"
feedName: "GOV.UK Design Notes"
author: "Pete Kowalczyk – Conversation Designer, GOV.UK AI team, GDS"
---

https://designnotes.blog.gov.uk/2026/11/03/creating-tools-for-scaling-generated-content/

In the GOV.UK AI team, we're working on personalised experiences that curate content for users based on their specific circumstances. 

The potential value to users is huge, offering tailored interfaces that directly reflect their needs. But the content design challenge is a big one too. For example:

-   The final content isn’t generated until someone asks for it, so you can't review the exact output beforehand.
-   There's no single message to sign off. There are potentially thousands.
-   A good example tells you very little. One output reading well says nothing about the next hundred.

In this post, we look at some new design tooling we’ve made to evaluate and refine content quality at scale — and how this tooling helps us improve not only content but the design of our systems as a whole.

## **An example use case**

One of our teams is currently working on guiding users through life moments by curating personalised plans. We’ve previously written about this work exploring using AI agents to [curate tasks for users](https://alphagov.github.io/govuk-ai/using-agentic-ai-to-curate-tasks-for-users/), [create space for planning before action](https://alphagov.github.io/govuk-ai/planning-before-action/), and [make work visible](https://alphagov.github.io/govuk-ai/making-work-visible/).

These personalised plans might cover a scenario like having a baby, which involves multiple interactions with government that differ depending on circumstances. For example, a high income, married couple living in Scotland will need a different plan to a single parent claiming Universal Credit in England. The approach to generating these plans needs to accommodate a wide range of scenarios.

![Two versions of a ‘Having a baby’ plan on a phone. The first has 4 steps, including arranging parental leave and pay. The second has 7 steps, including claiming Maternity Allowance and updating a Universal Credit claim. Each step shows its status and how many of its tasks are done.](https://designnotes.blog.gov.uk/wp-content/uploads/sites/53/2026/10/image3-1-620x1179.png)

_Two example plans for different circumstances._

The team has designed these plans to contain multiple 'steps' and 'tasks' depending on what the user needs to do.

Each plan, step and task has been designed with its own content rules, such as:

-   what information needs to go where
-   when to highlight important details
-   in what structure and syntax
-   how many sentences to use
-   how titles should be worded, and how long the strings should be

![3 phone screens from the prototype, each joined to the block of instructions that writes its content. The screens show the ‘Having a baby’ plan, the ‘Register the birth’ step and the ‘Register the birth’ task.](https://designnotes.blog.gov.uk/wp-content/uploads/sites/53/2026/10/image2-619x354.png)

_Our current prototypes include content rule sets based on designer intuition and domain knowledge — system prompts are designed alongside screens._   

These are the things a content designer would naturally define when working on static content.

The challenge is implementing them repeatably, at scale. When content is generated, it's not the content itself you're designing. It's the instructions that produce it.

## **What we've done to solve this**

To measure content quality, we've built a test runner for our content instructions. Here’s how it works. We generate content, evaluate it, look at the failures, check the ones we disagree with, change the prompts where needed, and run it all again.

It has four parts:

-   **Scenarios** are a bank of realistic situations and circumstances, such as having a baby, bereavement, job loss or starting a business. They stand in for the range of people the service needs to work for.
-   **Prompts** are the instructions given to the model, split by plan, step and task, and versioned like any other design artefact.
-   **Generation** runs every scenario against a prompt in one go, so you get a wide spread of outputs.
-   **Content quality evals** are a rubric of criteria, scored automatically against every plan. Do the titles use –ing verb forms? Does it address the reader as "you"? Is a legal requirement phrased as "you must" rather than "you need to"? Is a deadline anchored to the life event instead of a calendar date? Was specific ‘call out’ content presented correctly?

We use these content quality evals to assess the design of the content only. We have different systems for assuring accuracy, completeness, groundedness or faithfulness of the generated plans.

![A flow diagram. The plan is then checked by a rule engine with 21 criteria and a model acting as judge with 19 criteria. This gives a score for each plan, such as 54 out of 56. One loop lets you change the prompt and regenerate a single plan. The other reads all the failures for a rubric and suggests one change to the prompt.](https://designnotes.blog.gov.uk/wp-content/uploads/sites/53/2026/10/image5-619x249.png)

_Every plan in the test runner passes through the same five stages, plus two feedback loops that can feed straight back into the prompt._

![The ‘Evals’ tab of the test runner. It lists 4 evals, for global, plan, step and task content, with between 7 and 14 criteria each. Each eval has a score, such as 910 out of 966 for task evals, and buttons to edit or delete it.](https://designnotes.blog.gov.uk/wp-content/uploads/sites/53/2026/10/image6-619x355.png)

_We can easily see evaluation results, and edit the evaluations._ 

![The ‘Plans’ tab of the test runner. It lists generated plans with a score and an ‘Inspect’ button for each, such as ‘Registering the death and claiming what you’re entitled to’, which scores 94 out of 98.](https://designnotes.blog.gov.uk/wp-content/uploads/sites/53/2026/10/image4-619x355.png)

_We can review generated content and see where content rules have passed or failed._

![The ‘Prompts’ tab of the test runner. It shows a form for editing a prompt called ‘Personalised planning prompts’, with separate boxes for plan, step and task instructions.](https://designnotes.blog.gov.uk/wp-content/uploads/sites/53/2026/10/image1-619x355.png)

_We can also add or edit the scenarios we use to generate plans, and edit the system prompts._

By turning our content rules into rubric criteria, we can make sure they are checked on every plan, every time.

We can also measure what should not be there. Generated content tends towards too much: repeating a deadline that's already on the screen above, adding a caveat nobody asked for, being helpful in the wrong place. This tendency is easy to miss when you're reading one output and easier to catch when you're scoring hundreds.

Our tests also help to surface disagreements early. If "is this plain English?" fails on something we thought was fine, we can discuss it and amend the evaluation.

Regressions become visible too. For example, if we tweak a task prompt to fix one bad heading, we can see straight away whether that same tweak made titles longer everywhere else.

### **Responding to these evaluations**

While generating and evaluating content, we can see where changes to the system prompts are needed. But tweaking prompts is only part of the work.

When reviewing outputs, we can identify other opportunities to shape and improve the experience. For example, by improving the information architecture, changing the frontend design, and making system architecture choices such as the data schemas available to the models.

## **Experimenting with implementation and scaling**

This is an open experiment, and we're still working out how best to use it.

Here are some things we’ve found so far:

-   Some criteria are mechanical. Title length, verb form, whether a string contains a date. Those are cheaper and more reliable when built as simple code checks than as model judgements.
-   Other criteria are a matter of judgement, and for those we're using a model as the judge. That only works if the judge agrees with a person, so we're calibrating against human labels rather than trusting the score on its own.
-   We're keeping criteria binary. Pass or fail forces a decision, where a score out of five lets everyone settle on a comfortable ‘three’.
-   We're being careful about what we measure. A criterion is only worth having if it catches a failure we've actually seen and intend to fix. Generic quality scores tell us very little about what to change.
-   We’re not very interested in aggregate numbers. What's more useful is the pass rate for a single criterion across every scenario, because that points at the one line of the prompt that needs rewriting.

None of this replaces content design judgement. It gives content designers something to work with, to implement their decisions at scale where reading everything isn't an option. 

We’re looking forward to refining this approach and seeing how it might apply to other products in future.

Let us know in the comments if you’re working on anything similar or you can see any other potential use cases for this kind of approach.