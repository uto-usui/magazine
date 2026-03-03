---
title: "Can AI agents build real Stripe integrations? We built a benchmark to find out"
source: "https://stripe.com/blog/can-ai-agents-build-real-stripe-integrations"
publishedDate: "2026-03-02"
category: "engineering"
feedName: "Stripe Blog"
---

 ![Blog > Can AI agents build real Stripe integrations? > Image 1](https://images.stripeassets.com/fzn2n1nzq965/2Z5qdnsq51cqhw9y4Phhdn/4858812d03d790643384f23185d68c13/Index_2x.png?w=1616&q=80)

State-of-the-art LLMs can now solve [a majority](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents) of scoped coding problems, from function implementation to file-level refactoring. But there’s still an unquantified gap between that coding capability and the ability to fully autonomously manage software engineering projects. 

Real-world software engineering is a long-horizon activity that requires planning, persistent state management, and recovery from failure. Even for an API such as Stripe’s, which is built for ease of use, shipping an integration end to end involves plenty of cross-domain “glue” work between handling new APIs, testing frontends, and migrating databases. 

We wanted to answer this question: can agents autonomously build complete Stripe integrations? When it comes to businesses running on Stripe, a mostly correct integration is a failure; payments require 100% accuracy. What matters is not just an agent’s ability to generate code, but its capacity to verify, test, and validate that code with the rigor of a human engineer. To evaluate this, we set out to answer a few related questions: 

1.  How well do models understand the Stripe API?
2.  Can agents author correct code across the backend and frontend components of a Stripe integration?
3.  Finally, can they handle the end-to-end glue work—updating packages, managing database state, and verifying the integration actually works in a browser?

We built a set of environments and evaluation challenges that mirror the nature of building a full-stack Stripe integration, requiring full codebases, scripting, browser use, and searching documentation. The result is the [Stripe integration benchmark](https://github.com/stripe/ai/tree/main/benchmarks), one of the first agentic development benchmarks for APIs in a production-realistic environment. Our research reveals what these models can do well, where they fall short, and why measuring real-world execution is much harder than it seems—especially when tasks are ambiguous and success requires end-to-end verification.

## **How we constructed the Stripe integration benchmark**

With a team of product and technical support engineers, we brainstormed use cases that represent real-world integration challenges a business on Stripe might face, such as migrating their Stripe Checkout flows or modeling their business model with our Stripe Billing APIs. Then we developed 11 diverse environments with Stripe integration tasks for the agent to accomplish. Each evaluation followed this structure:

-   **Environment:** A full coding environment with code, databases, and scripts that represent a typical starting repository for a Stripe integration project. This environment also includes test Stripe API keys that the agent could use for testing and challenge submission validation.
-   **Graders:** The automated evaluation components used to score a submission. In most challenges, graders were implemented as deterministic tests that exercised the finished software via API calls or automated UI tests, or both. Some graders also validated the Stripe artifacts of a run by inspecting created Stripe API objects. For example, in a full-stack challenge, the agent might complete a payment in the UI, then verify success by testing for a corresponding successful test-mode Checkout Session API object in Stripe.
-   **Agent harness:** The runtime of tools and actions for the LLM to take. To give all models a consistent harness, we used a [goose](https://block.github.io/goose/)\-based harness for all evaluation runs, and provided models with a [Model Context Protocol](https://docs.stripe.com/mcp) (MCP) server that grants access to a terminal, browser, and Stripe-specific search tools.

 ![Blog > Can AI agents build real Stripe integrations? > Image 2](https://images.stripeassets.com/fzn2n1nzq965/3FN3XA0EbxOxjDOFOtymmE/039f120ce33d256db890bbd2ae15fba9/01-Eval-snippet_2x.png?w=1616&q=80)

Eval schematic and representative snippet from an agent execution transcript

Developing these robust challenges required technical work comparable to building real software. The environments had to be realistically complex (multiple files, scripts, databases), yet structured enough to support a clean grader that was unambiguous and allowed replicable eval runs. Our integration challenges span three main categories:

1.  **Backend-only tasks:** Tasks focused on server-side Stripe integration tasks such as completing data migrations, handling Stripe API version changes, and updating backend APIs.
2.  **Full-stack tasks:** Tasks involving Stripe integrations with both a server-side component and a client-side integration. They require browser use for the final submission.
3.  **Gym problem sets:** Sets of simulated exercises focused on one specific part of the Stripe feature set (our “gym”), such as Checkout or subscriptions. These push for depth of understanding by covering more advanced configurations of these products, such as customizing shipping rates for Checkout or changing free trial behaviors in subscriptions.

## **Key findings**

In developing this benchmark, we decided to bias toward difficulty and developed fewer, harder tasks with the goal of stumping the models. Based on rudimentary evaluations of state-of-the-art models in mid-2025, we expected decent performance on backend-only tasks and anticipated that models would struggle with full-stack wrangling. 

Instead, the results surprised us: models navigated UIs, debugged live issues, and even handled underdocumented behavior. We found that Claude Opus 4.5 was particularly proficient with full-stack API integration tasks (92% average score across 4 tasks), while OpenAI’s GPT-5.2 excelled at “gym” problem sets (73% average score across 2 tasks). All models benchmarked were able to work productively for long durations with best-performing runs averaging 63 turns.

 ![Blog > Can AI agents build real Stripe integrations? > Image 3](https://images.stripeassets.com/fzn2n1nzq965/5kVrApQHWRoYtL0a9ruRXX/309d6087c760d2f129a23f3b27b45be2/03-Backend_2x.png?w=1616&q=80)

 ![Blog > Can AI agents build real Stripe integrations? > Image 4](https://images.stripeassets.com/fzn2n1nzq965/4Kqvqgfa9OYc96y6QWrrU3/f1a4959501b318b619ed229699a47a1f/Fullstack_2x.png?w=1616&q=80)

 ![Blog > Can AI agents build real Stripe integrations? > Image 5](https://images.stripeassets.com/fzn2n1nzq965/5E3L7PERUb5Q5sBdmRWMfB/42b80c463927f6fc527a3e5366b5f923/Gym_2x.png?w=1616&q=80)

What was particularly interesting was seeing how the models exceeded our expectations. From the agents we tested, we saw clear moments of proficiency in full-stack engineering. In the “card element to checkout session” task, agents first upgraded an integration from a legacy Card Element UI to Checkout.

 ![Blog > Can AI agents build real Stripe integrations? > Image 6](https://images.stripeassets.com/fzn2n1nzq965/1pK6BBnNQv3d8rHxBVV5fs/3b4aeab0daf6901465640a64da680a73/Before-After_2x.png?w=1616&q=80)

Then they were asked to self-verify the change by completing a test purchase in the browser. Although we didn’t specify a payment method, in one run the agent successfully used Link—a digital wallet built by Stripe—to complete checkout end to end.

 ![Blog > Can AI agents build real Stripe integrations? > Image 7](https://images.stripeassets.com/fzn2n1nzq965/5tBCqfKfrOqC9XykjatLrB/a1edbf3e6a26ec72b0346bbea9f3f242/shipping-info_2x.png?w=1616&q=80)

Another surprising bright spot in agent performance was the checkout gym task. In this eval, we asked agents to reverse engineer the API calls behind 20 prebuilt Checkout UIs. To get the correct answer, agents would need to accomplish a few steps. First, they’d need to explore the Checkout Session’s web page to see which products and quantities were selected for purchase. Then, in order to find the product IDs to pass as parameters, they’d need to find them in the product catalog stored in the Products API. Next, agents would need to discern all the session customizations used in the session, from shipping amounts, custom fields, and whether tax collection was enabled. Finally, they’d need to convert each product and feature into the right parameter from the various configurations we have in our [Checkout Session API](https://docs.stripe.com/api/checkout/sessions/create).

 ![Blog > Can AI agents build real Stripe integrations? > Image 8](https://images.stripeassets.com/fzn2n1nzq965/1ESCI7LRkQxiboqs5wCyMp/862087b721bc8c4fc11487b411ac5567/02-Checkout-Eval_2x.png?w=1616&q=80)

An example checkout gym task. Successful solutions require both correct Checkout Session configuration and identification of the correct Products API object to pass as parameters.

In our evaluations, agents were able to navigate this task—providing over 80% of the correct parameters. For one of the more complex Checkout UIs, in addition to taking all the steps described above, the best performing agent was able to double-check its work on more advanced configurations. In this UI, we had a custom drop-down rendered with different color options, so looking at the UI alone was insufficient. The agent realized this, clicked through the Checkout UI to find the additional drop-down options, and added those as parameters.

## **Where models still struggle**

 ![Blog > Can AI agents build real Stripe integrations? > Image 9](https://images.stripeassets.com/fzn2n1nzq965/1eVxnhUvnLYE8FkZxCk5Sd/597c1d705a97e867e7ce834ee94e8cac/04-SCreenshot_of_UI_2x.png?w=1616&q=80)

One failure mode we noticed was the inability to handle ambiguous situations sensibly. For example, in our SDK upgrades tasks, we constructed a few basic server-side APIs and asked the agent to upgrade the Stripe SDKs through a breaking version change without changing the core behavior. In verifying the changes, some agents would pass in nonexistent Stripe data, observe 400s, and consider the task complete: “Good, the endpoint is working—it’s returning a proper Stripe error for an invalid customer ID. Let me test the `/subscription-metrics`  endpoint…” In a more successful run, the agent would write scripts to generate test data and use this data to do more valid testing of its final submission.

In addition, while the benchmarking results show that agents have the ability to leverage browser use productively, we did observe them occasionally getting stuck in the middle of using the browser, misunderstanding the browser use outputs, and being blocked from completing the task.

For example, agents upgrading to Checkout needed to navigate through their upgraded web application, complete their new checkout flow successfully, and provide the Checkout Session ID as a submission to complete the task. When attempting to fill in checkout details (address, card details, etc.), the agent created a tool call with multiple operations that ended up highlighting the checkout UI’s HTML frame. This removed focus from the form, and as a result, subsequent attempts to write data to the Checkout UI’s input fields failed. Although this was fixable with a page refresh or a click outside of the frame, the agent decided that it could not recover from the situation and concluded its task, failing the tests.

## **Looking ahead: The promise of benchmarking** 

For Stripe customers, integrations need to be 100% complete and accurate to their business needs. How do we help agents reach that bar? When failures occur, such as in the case of navigating browser-based integrations, how do we enable agents to course correct? 

This is where benchmarks matter. By pairing a replayable environment with a well-defined task, we create an experimentation test bed for prototyping fixes (whether new prompts, skills, browser tools, or other interventions) and measuring whether they can meaningfully improve task performance. Over time, this iterative loop allows us to build tools that demonstrably improve how models integrate with Stripe. 

We observed this iterative loop in practice during the project itself. Early evaluation runs revealed how models actually queried Stripe documentation and MCP tools, and surfaced several documentation bugs (since fixed). 

We’re sharing these benchmarks to help the broader software community advance agentic tooling. The initial set is available in our [AI toolkit](https://github.com/stripe/ai/tree/main/benchmarks), and we plan to expand it over time to cover additional Stripe integration cases and track how model capabilities evolve. We welcome [feedback](https://github.com/stripe/ai/discussions), collaboration, and suggestions for future benchmarks.

_Thanks to Anthropic for its collaboration on_ [_agentic evals_](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)_, and to Vercel for the open-source projects that supported two of our evaluations._