---
title: "Dogfooding vs. QA vs. User Research"
source: "https://www.nngroup.com/articles/dogfooding/"
publishedDate: "2026-08-07"
category: "design"
feedName: "Nielsen Norman Group"
author: "Therese Fessenden"
---

Summary:  Dogfooding, or using your own products internally, helps catch bugs, but it can't replace user research: your team knows too much to represent real users.

Big Tech CEOs are eager to show that they and their employees use their own products. Mark Zuckerberg is building an AI agent to help him be CEO. Elon Musk posts prolifically on X. It’s a marketing strategy older than the industry itself: the people selling the future want you to know they're living in it first.

These performances are often conflated with **dogfooding,** which, recently, has become a go-to strategy for teams racing to [design and ship AI products](https://www.nngroup.com/courses/designing-ai-experiences/). Done properly, it can catch bugs, surface broken flows, and build empathy with users before a product ships. But its usefulness has a ceiling — much lower than most product teams think.

-   [What Is Dogfooding?](#toc-what-is-dogfooding-1)
-   [Dogfooding Is Not “Drinking the Kool-Aid”](#toc-dogfooding-is-not-drinking-the-kool-aid-2)
-   [QA Testing vs. User Testing vs. Dogfooding](#toc-qa-testing-vs-user-testing-vs-dogfooding-3)
-   [Reliability: Crucial in the AI Era](#toc-reliability-crucial-in-the-ai-era-4)
-   [Should You Dogfood?](#toc-should-you-dogfood-5)

## What Is Dogfooding?

> **Dogfooding** is using your own products internally to make them better.

I first heard the term “dogfooding” when I started at Microsoft in 2013, when a friendly onboarding manager chirped, “We eat our own dogfood here.” The term had been popular in tech since 1988, when Microsoft manager Paul Maritz sent an email titled "Eating our own Dogfood," challenging employees to increase internal usage of the company's products.

The idea is simple: **when teams use the products they’re developing, they know first-hand whether the product behaves as expected.** The goal is to catch bugs, crashes, and broken flows before users hit them and to surface missing features that appear only in real use.

At its best, dogfooding is about stress-testing products in varied environments at scale and building shared product ownership and empathy across the organization. If the product breaks, it impacts not only users but also the people building it. With a clear feedback loop, development teams can fix issues before they spread to the broader customer base.

## Dogfooding Is Not “Drinking the Kool-Aid”

Dogfooding is not the same as the similar-sounding “[drinking the Kool-Aid](https://dictionary.cambridge.org/us/dictionary/english/drink-the-kool-aid),” or conforming unquestioningly to a behavior or culture out of loyalty to a mission. But it’s easy to conflate the two: many contemporary examples of dogfooding are performative acts of loyalty rather than genuine quality control.

For instance, McDonald’s CEO Chris Kempczinski was roasted on social media for posting a video of himself taking a tiny, hesitant bite of the company’s new product, the Big Arch burger. The internet's verdict was instant, whether fair or not: this man doesn't eat at McDonald's. It went viral because viewers sensed he wasn't a genuine user of his own product. Your team dogfooding your product has the same problem. They're insiders performing use, not real users encountering it fresh.

Ultimately, dogfooding’s usefulness boils down to the motivation behind it: is this only for optics? Or is this something the company would do anyway to stress-test a system, without the press? If the company is motivated primarily by how investors view the news, it likely isn’t genuine quality control.

## QA Testing vs. User Testing vs. Dogfooding

To an untrained eye, informal internal use can feel like quality-assurance testing and user research combined.

### Quality-Assurance Testing

> **Quality-assurance (QA) testing** is a structured, systematic process to evaluate that a product works as intended (i.e., the product’s reliability).

For instance, if a user fills out a form to request a reimbursement, the form behaves as expected and the user can submit the request without errors, dead ends, or bugs. Whether the user _enjoys_ that reimbursement process is irrelevant to quality assurance.

QA testing is typically conducted by QA professionals: people whose entire job is to pretend to be the customer and try to break the product to catch issues before launch.

The goal is not to represent realistic use, but to determine whether the system functions consistently by following every available path and looking for bugs or fail points in workflows and system states, exceptions, or edge cases.

### User Research

> [**User research**](https://www.nngroup.com/articles/research-methods-glossary/) is a structured approach to gathering data from customers or representative users about the product or service, how easy it is to use, and how well it meets users’ needs.

Unlike QA testing, user researchers do not pretend to be customers; they source [representative participants](https://www.nngroup.com/articles/selection-criteria/) for direct feedback. The goal here is _not_ to click every button or navigate through every level of a menu hierarchy to see what breaks; it’s to observe realistic usage to determine whether users understand what the system is doing and whether they can accomplish their goals.

### Dogfooding Is Not QA or User Research

Dogfooding straddles the line between QA and user research, using employees as the primary source of feedback while trying to represent “realistic” usage.

But, is the usage really realistic if the employee understands industry jargon better than end users and already understands the data model and how everything connects? The big — and usually incorrect — assumption is that users share employees’ [mental model](https://www.nngroup.com/articles/mental-models/) of the system. [We’ve seen time and again that they don’t](https://www.nngroup.com/articles/false-consensus/): they come from a very different vantage point and set of experiences and expectations. It’s the “[curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge)” effect: once you know how something works, you cannot reliably simulate not knowing.

So [employee-usability feedback](https://www.nngroup.com/articles/employees-user-test/) can confound research data and even contradict user-research findings.

Used properly to improve reliability, though, dogfooding adds to existing QA testing: more people poking and prodding a system to see how it fails means more data points. It can also provide a usability upper bound for the system: if employees struggle to understand how it works, then it’s likely that users will struggle even more. (But if they are successful, it does not mean that real users will be too.)

**Type of Feedback**

**Who Provides Feedback?**

QA testing

Reliability in overall functionality of the product or service

QA or development professionals

User research

Usability, user comprehension, and user-needs analysis

Customers or representative users

Dogfooding

Internal staff’s perspective on reliability and usability within a semirealistic context

Employees and internal staff members

## Reliability: Crucial in the AI Era

It’s important to [distinguish reliability and usability](https://www.nngroup.com/articles/theory-user-delight/), two distinct user needs to meet. At a minimum, a product must be functional and reliable before it can be usable. If a product keeps crashing mid-task or misses a workflow step, it _can’t_ be usable, by definition. With deterministic systems, reliability is straightforward, even for complex workflows: if the user does x, then y happens, every time.

With nondeterministic AI models, however, reliability is harder to assess, because the system provides probabilistic answers. Reliability now hinges on many things:

-   Does the system consistently provide the right answer?
-   Does it default to the right data sources?
-   Does it factor in the user’s context? Does it use that context appropriately?
-   What are the guardrails to prevent catastrophic failure or inconsistency?

Dogfooding helps answer some of these questions: multiple people with different perspectives interact with the system and share their interpretations of its output.

That said, it is not a replacement for QA and user research. It’s better than doing neither, but it’s ultimately [more costly to retrofit a design](https://www.nngroup.com/articles/ux-debt/) built on employee feedback than to build one with customer feedback from the start.

## Should You Dogfood?

Dogfooding can be a helpful additional data source when you’re designing a product or service. It belongs alongside other methods better suited to providing more specific, more actionable data. Each answers a different question, and none substitutes for the others:

-   **Dogfooding:** Does the product work? Does it break? Are there obvious gaps the team can spot?
-   **QA testing:** Does the product have any failure points, bugs, or blind spots? Are there any gaps in functionality, error states, or exceptions we need to design for?
-   **User research:** Can someone who doesn't know the product accomplish their goals? What are users trying to do, and how does the product fit — or not — into their real context?

Before any feedback activity, ask: **whose** **perspective** are we getting, and is that the perspective we need? If your team is the only source of feedback on a design decision, you don't have user research; you have internal opinion.

At the end of the day, dogfooding tells you what **your** **team** thinks of your product. **Research** tells you what your users experience.