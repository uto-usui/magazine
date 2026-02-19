---
title: "Redefining impact as a data scientist"
source: "https://www.figma.com/blog/redefining-impact-as-a-data-scientist/"
publishedDate: "2026-02-18"
category: "design"
feedName: "Figma Blog"
---

In domains where accuracy and visibility are critical, data science looks different. The work often involves modeling event lifecycles, reconciling data across systems, and building simple tools to make things observable. It’s less about running A/B tests and more about understanding how complex systems behave.

I encountered this while working on Figma’s Billing infrastructure, but the lessons apply to many high-stakes, complex domains. Here are five takeaways that can help data scientists have more impact, regardless of the problem they’re working on.

## [Think of data science as a full-stack discipline](#think-of-data-science-as-a-full-stack-discipline)

The ways DS (data science) can add value varies dramatically from team to team. Some teams need rigorous experimentation frameworks, some need deep product analyses, and others rely on strong data modeling or instrumentation work. Figma hires full-stack data scientists because a single role often needs to span most of these modes—sometimes all within the same project.

Unlike more traditional product surfaces, Billing sits somewhere between a user-facing product and a backend system. Reliable, accurate billing directly affects the customer experience and their trust in the platform. Over time, we’ve learned that supporting Billing with data science means building domain expertise, partnering closely across functions, and developing tools that can explain, verify, or clarify system behavior. Tasks like experimentation and opportunity analysis are important, but they represent a smaller slice of the work.

I captured this shift in a set of pie charts that contrast my understanding of the “traditional” DS model, the team’s early assumptions, and the actual distribution of work once we understood the domain.

![Three side-by-side pie charts compare personal, team, and actual distributions of a billing data scientist’s responsibilities.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQFBgf/xAAhEAACAgMAAQUBAAAAAAAAAAABAgMEAAURMQYSITJBcf/EABYBAQEBAAAAAAAAAAAAAAAAAAQCA//EABsRAQADAQADAAAAAAAAAAAAAAEAAhEhA5Gh/9oADAMBAAIRAxEAPwDc6O+p2tjYhCyqVJUdbz/BjFvYw1ac8qpOxA+B3uNR66ouweZa6CUj7cxg1oTDKpjX2t3owJW662+Sq3W2oZK/qfUUc9UsSwIcrwjuGTlGjVgrKkUEar55z9wzR5zYhfDvB9z/2Q==)![Three side-by-side pie charts compare personal, team, and actual distributions of a billing data scientist’s responsibilities.](https://cdn.sanity.io/images/599r6htc/regionalized/9afdbbe16ca503f128e6d7768d8401f03980e59b-2160x1215.jpg?rect=1,0,2158,1215&w=1080&h=608&q=75&fit=max&auto=format)

Figma’s engineering culture values initiative and growth over following conventions and playing it safe. Coupled with our full‑stack model, this gave us permission to explore, and we ended up co-defining the right support with partners rather than running a playbook. Especially in non-traditional product areas, this approach helps ensure data science is focused on work that’s meaningful and valuable to the people it serves.

## [Not all data science explanations come from charts or models](#not-all-data-science-explanations-come-from)

The flashiest data science work often involves forecasting and inferential modeling. But sometimes the most impactful work focuses on the present or past outcomes of a complex system, and explaining how those results came to be—which can look very different from the “traditional” approach.

This was definitely the case when we worked on simplifying our invoicing process. In Figma’s billing model, users occupy seats, and the lifecycle of those seats—assignments, removals, permission changes, contract terms, and edge-case adjustments—spans several systems with different schemas. What looks like a simple line item on an invoice can actually represent a long chain of interactions.

Internally, many teams need to understand how those charges come to be. Support, order-management, and enterprise specialists must explain invoices to customers with clarity and confidence. Billing and monetization engineers rely on precise charge histories when debugging unexpected system behavior. Even small discrepancies can stem from nuanced interactions between product events and billing logic.

To make this complexity easier to reason about, our team built the **Invoice Seat Report**, a data application that reconstructs the full narrative behind each seat charge. The tool pulls together product usage events, contract metadata, billing rules, and past state transitions, then compiles them into a plain-language explanation of why each charge occurred.

Building the Invoice Seat Report required more than querying a few tables. Much of the early effort involved wrangling fragmented data and developing a shared mental model of how seat state evolves across systems. That meant validating assumptions with engineers, cleaning inconsistencies in historical data, and requesting new instrumentation where gaps existed. In several cases, existing logs captured _what_ happened but not _why_, so we worked closely with engineering to ensure future events reflected the underlying mechanics more faithfully.

Once the data foundation was reliable, the next challenge was emulating billing logic in analysis. Seat pricing is determined not just by usage events, but by contractual terms, upgrade paths, workspace state, and the exact moment transitions occur. For example, we had to handle legacy multiyear contracts with sparse seat history, and early upgrades that can create blind spots in the data. This work required a careful translation of rules into SQL and transformations that could be traced and debugged.

## [Data scientists can inform technical direction, not just product direction](#data-scientists-can-inform-technical-direction)

By translating business rules into measurable checks, data science can help define what correct looks like, monitor for drift or regressions, and surface anomalies early. These data-driven validations provide an additional layer of assurance in development and production, especially for complex, stateful workflows where failures can be subtle and costly.

In Billing, for example, it’s essential to ensure that our architecture is consistently producing the right results. Every seat assignment, state transition, and invoice calculation needs to reflect the intended logic, because even minor discrepancies can impact customers’ bills and their trust in the platform.

When Figma refreshed its [billing model](https://www.figma.com/blog/billing-experience-update-2025/)

—a major re-architecture of our pricing, packaging, and billing mechanics—we needed a way to verify that new logic worked as intended. We had to know that data was flowing accurately through our pipelines and that users weren’t encountering unexpected billing states. And we needed that verification to work in both development and production environments.

**Consistency checkers** are a critical testing tool for ensuring product and business flows operate as expected. Consistency checkers can enforce the correctness of a system more thoroughly than other tools, such as end-to-end (E2E) testing and User Acceptance Testing (UAT), which is why [other companies](https://slack.engineering/data-consistency-checks/) also leverage them as part of their testing strategy.

To support this, our team built a testing framework called **consistency checkers**: SQL-based invariant tests that compare expected system state against the data recorded across multiple sources of truth on a pre-defined cadence. These checks fall broadly into two categories:

-   **Data-quality checks**, which validate whether stored data accurately reflects the real product state
-   **Code-logic checks**, which detect when application behavior diverges from defined billing rules

Designing these invariants required building a deep understanding of how data moved through our billing systems, and where it could go wrong. We worked closely with engineers to map out the assumptions baked into billing logic, identify the upstream events that should trigger downstream changes, and define the states that should never occur.

We then encoded these invariants into simple SQL checks, each targeted and explainable. When a checker detected a violation, it routed a structured alert, along with the exact rows and metadata needed, to the relevant engineering team. Because these checks unified data from product logs, billing state, payment processing, and CRM systems, they gave engineers a holistic view that wasn’t captured anywhere else in the stack.

In some cases, this surfaced code-quality issues where the product behavior was unexpected, typically due to an unexpected race condition or edge case condition that was not accounted for. In others, it revealed data quality issues stemming from gaps in how certain transitions were logged or materialized downstream.

![A flowchart titled “Consistency checker lifecycle” outlines an alerting and investigation process, ending with either backfilling data or updating code logic.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwYI/8QAIxAAAQQBAQkAAAAAAAAAAAAAAQACAwQREwUSITEyM0Fxgf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAHBEBAAICAwEAAAAAAAAAAAAAAQACIUERErHR/9oADAMBAAIRAxEAPwDpCee2I3NbW1HZ8HGQqDPchnaI6LnAji7f5JwpUdcPLGENTK2do2BYkDrhhIPRpE4+oTez3ne0IOibkNqWVz79n//Z)![A flowchart titled “Consistency checker lifecycle” outlines an alerting and investigation process, ending with either backfilling data or updating code logic.](https://cdn.sanity.io/images/599r6htc/regionalized/442e5e4a21ea45f34e54a905eeb4cdb19b562dcb-2160x925.jpg?rect=1,0,2158,925&w=1080&h=463&q=75&fit=max&auto=format)

## [Building data applications scales your impact](#building-data-applications-scales-your-impact)

When a question or workflow repeats often enough, turning the underlying logic into a simple application saves time and reduces cognitive load across teams. Both the Invoice Seat Report and consistency checkers emerged this way. Each started as a bespoke analysis and became a data application when we realized multiple teams depended on the same logic:

-   **The Invoice Seat Report** captured the sequence of events and rules that led to each seat charge, giving support, order management, and engineering a shared, reliable explanation. Engineers no longer needed to trace multi-system event flows manually, and customer-facing teams gained a clear explanation they could share directly with users. The Invoice Seat Report has become one of the most-viewed data applications at Figma.
-   **Consistency checkers** encoded the invariants behind the billing model so engineers could quickly see when system behavior drifted from expectations. During the billing model refresh, consistency checkers gave engineers real-time observability into system behavior across both development and production environments. That visibility helped catch edge-case bugs early and made for an uneventful rollout (the best kind). Since then, the framework has been adopted beyond the billing team, powering data-integrity and code-logic checks across product security, access and identity management, and other growth teams. For example, [connected projects](https://help.figma.com/hc/en-us/articles/30124855491863-Guide-to-connected-projects) use consistency checkers to confirm that sharing and access settings behave as expected.

Ultimately, these tools reinforced an important lesson for our team: In domains where correctness and clarity matter, data science isn’t just about analysis. Sometimes the most impactful work is building small, durable applications that embed shared logic directly into the way teams operate.

## [The data science process doesn’t change, even if the work does](#the-data-science-process-doesn-t-change-even-if)

General data-science methods can be applied to many kinds of problems. On Billing, the challenges weren’t about experimentation or product metrics, but the same core process still guided the work—just expanded to fit a correctness-driven, systems-heavy area.

![A flow diagram titled “Billing data science process” shows steps from understanding the domain to sharing findings, with sticky notes noting complexity and ad hoc work.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIFCP/EACEQAAEDBAIDAQAAAAAAAAAAAAEAAgMEBRESMTMUITKB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwIE/8QAIREAAgEDAwUAAAAAAAAAAAAAAQIAAyExERITUVJhodH/2gAMAwEAAhEDEQA/ANCUlVcJWSeZS6DOAM5yElLPVsL5DSCMA4HvkK1L8uSydP4sFSysVt0z9l1BvYEHTwJCZd7u7bFuGocQDtyEK3T9QQgpOzoGJzB4G7z6n//Z)![A flow diagram titled “Billing data science process” shows steps from understanding the domain to sharing findings, with sticky notes noting complexity and ad hoc work.](https://cdn.sanity.io/images/599r6htc/regionalized/838f4715069ccf1e5d9c80e288d580d8cc576384-2160x925.jpg?rect=1,0,2158,925&w=1080&h=463&q=75&fit=max&auto=format)

We still started the process like any traditional DS work, with understanding the domain. It just looked a bit different: Instead of learning a user-facing product surface, we were mapping system boundaries and learning how first-party logic interacted with external systems like Stripe. This step became deeply technical because correctness depended on knowing how all of these components produced state.

Gathering and cleaning data is a key part of the data science process, and a large portion of our time was spent here as well. Sparse or inconsistent billing data often signaled instrumentation gaps or misaligned logic, so this work sometimes required advocating for new logs, adding tracking for missing transitions, or collaborating with engineering to align representations across services.

After preparing the data, it’s typical to undertake exploratory data analysis (EDA). For us, exploratory work meant reconstructing how the system arrived at a given outcome—stitching together product events, contract logic, state transitions, etc. Some investigations were necessarily ad hoc because they spanned multiple systems and sources of truth.

Though we applied the same core principles from a traditional DS process, the deliverables were a bit different. We didn’t deliver a model or writeup, but rather developed tools like the Invoice Seat Report and consistency checkers. These forms of delivery aligned more closely with the needs of our Billing team than presentations or experiments would have.

The work on Billing reinforces the bigger picture for us: Data science fundamentals don’t change, but the problems they’re applied to can look very different than what’s typical. The same steps that we use to do ML modeling or run A/B tests can expand to solve challenges involving correctness and system behavior.

Techniques like reconstructing event paths, defining invariants, or packaging reasoning into internal tools aren’t specific to Billing. They’re approaches that can help any team bring clarity and confidence to complex systems, especially as the data science field continues to evolve.

As Figma continues to grow, that understanding will remain central to how we use data science to deliver great customer experiences and help teams build reliable, explainable systems at scale.