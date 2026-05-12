---
title: "The organization is the bottleneck"
source: "https://www.oreilly.com/radar/the-organization-is-the-bottleneck/"
publishedDate: "2026-05-11"
category: "design"
feedName: "Sidebar"
---

Everyone is adopting AI coding tools. Engineers are writing code faster than ever. But are organizations actually delivering value faster? That’s not obvious.

I wrote [_Enabling Microservice Success_](https://www.oreilly.com/library/view/enabling-microservice-success/9781098130787/) with a big focus on engineering enablement, guardrails, automated testing, active ownership, and light touch governance. I didn’t know AI coding agents were coming, but it turns out that the practices that make microservices work long-term are exactly the foundations you need to make AI coding agents work too. If your organization is adopting these tools—and the evidence suggests we all are—the book covers how to build these foundations in detail.

I’m hearing very different experiences from different organizations, and what seems to make the difference is the level of maturity that the software engineering organization has. As [the latest DORA report](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf) puts it, “AI’s primary role in software development is to amplify. It magnifies the strengths of high-performing organizations and the dysfunctions of struggling ones.”

A decade ago, I started building microservices at the _Financial Times_. It didn’t take long to realize that success wasn’t about the technology choices. Success was about getting the cultural and organizational setup right, because that’s what allows teams the autonomy to move fast. There’s no benefit to adopting microservices if your organization can only release code once a week: You’re paying the cost of a more complicated operational architecture but not benefiting from being able to ship changes frequently and with a high degree of confidence they won’t break something in some other part of your system.

The pattern with AI coding agents is strikingly similar. If you don’t have automated tests, or documentation, or CI/CD pipelines that support progressive delivery, you won’t succeed with microservices—and you won’t succeed with AI coding agents either. The organizations reporting the best results are the ones that already invested in the foundations.

Here are some of the specific parallels.

**Guardrails matter.** When we moved to microservices, we learned quickly that you can’t just tell teams to “do the right thing” and hope for the best. You have to build paved roads and guardrails that help people to do the right thing automatically, so that autonomy doesn’t become chaos. AI coding agents need exactly the same approach. An agent with access to your codebase and no constraints is an autonomous team with no guardrails: it will move fast, but not necessarily in the right direction. If you’ve already built those guardrails for your teams—coding standards enforced in CI, architectural decision records, templates for new services—you have a serious head start because those same artifacts become the constraints that keep agents on track.

**Your deployment pipeline is your best safety net.** Automated tests, progressive rollouts, zero-downtime deploys—these are the practices that catch mistakes before they reach production, whether the code was written by a human or by an AI. Observability matters here too: You wouldn’t run a microservice without logs, metrics, and traces, so why would you merge code you didn’t write yourself without the ability to understand what changed and why? And independent deployability gives you independent reversibility—when an AI agent makes a bad change to one service, you can roll it back without unwinding six other things. If we’re shipping code three times as fast with the help of AI agents, all of this becomes even more important.

**Engineering enablement is how you scale.** Your platform team’s templates, libraries, and golden paths don’t just help developers: they become the constraints and context that make AI agents effective across your organization. The organizations that already invested in enablement are the ones finding it easiest to adopt AI coding tools. The ones that didn’t are finding that AI just amplifies the mess.