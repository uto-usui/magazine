---
title: "Designing For Stress And Emergency"
source: "https://smashingmagazine.com/2025/11/designing-for-stress-emergency/"
publishedDate: "2025-11-24"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Vitaly Friedman)"
---

-   7 min read
-   [Design](https://smashingmagazine.com/category/design), [UX](https://smashingmagazine.com/category/ux), [Design Patterns](https://smashingmagazine.com/category/design-patterns)

Practical guidelines on designing time-critical products that prevent errors and improve accuracy. Part of the [Measure UX & Design Impact](https://measure-ux.com/) (use the code 🎟 `IMPACT` to save 20% off today). With a [live UX training](https://smashingconf.com/online-workshops/workshops/vitaly-friedman-impact-design/) starting next week.

No design exists in isolation. As designers, we often imagine specific situations in which people will use our product. It might be indeed quite common — but there will also be other — **urgent, frustrating, stressful situations**. And they are the ones that we rarely account for.

So how do we account for such situations? How can we help people **use our products while coping with stress** — without adding to their cognitive load? Let’s take a closer look.

## Study Where Your Product Fits Into People’s Lives

When designing digital products, sometimes we get a bit too attached to our **shiny new features and flows** — often forgetting the messy reality in which these features and flows have to neatly fit. And often it means 10s of other products, 100s of other tabs, and 1000s of other emails.

[![An example of a split screen with two power consumption dashboards on a 22-inch screen.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-for-stress-and-emergency/1-designing-for-stress-and-emergency.jpg)](https://files.smashing.media/articles/designing-for-stress-and-emergency/1-designing-for-stress-and-emergency.jpg)

Design never exists in isolation. It must fit the user’s context and their expectations to do its job. (Image source: [Engine And Power Dashboard](https://seabits.com/engine-and-power-dashboards/)) ([Large preview](https://files.smashing.media/articles/designing-for-stress-and-emergency/1-designing-for-stress-and-emergency.jpg))

If your customers have to use a **slightly older machine**, with a _smallish_ 22” screen and a lot of background noise, they might use your product differently than you might have imagined, e.g., splitting the screen into halves to see both views at the same time (as displayed above).

Chances are high that our customers will use our product **while doing something else**, often with very little motivation, very little patience, plenty of urgent (and way more important) problems, and an unhealthy dose of stress. And that’s where our product must do its job well.

## What Is Stress?

What exactly do we mean when we talk about “stress”? As H Locke noted, stress is the **body’s response to a situation it cannot handle**. There is a mismatch between what people can control, their own skills, and the challenge in front of them.

If the situation seems unmanageable and the goal they want to achieve moves further away, it creates an enormous sense of **failing**. It can be extremely frustrating and demotivating.

[![SOS Emergency System](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-for-stress-and-emergency/2-designing-for-stress-and-emergency.jpg)](https://alypain.com/5-apps-to-reduce-stress-in-teens/)

Stress has many levels. The key is not to let it spiral into dangerous zones. (Image source: [Alypain](https://alypain.com/5-apps-to-reduce-stress-in-teens/)) ([Large preview](https://files.smashing.media/articles/designing-for-stress-and-emergency/2-designing-for-stress-and-emergency.jpg))

Some failures have a local scope, but many have a **far-reaching impact**. Many people can’t choose the products they have to use for work, so when a tool fails repeatedly, causes frustration, or is unreliable, it affects the worker, the work, the colleagues, and processes within the organization. **Fragility has a high cost** — and so does frustration.

## How Stress Influences User Interactions

It’s not a big surprise: stress disrupts attention, memory, cognition, and decision-making. It makes it difficult to prioritize and draw logical conclusions. In times of stress, we **rely on fast, intuitive judgments**, not reasoning. Typically, it leads to instinctive responses based on established habits.

[![Designing For Stress And Emergency](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-for-stress-and-emergency/3-designing-for-stress-and-emergency.png)](https://files.smashing.media/articles/designing-for-stress-and-emergency/3-designing-for-stress-and-emergency.png)

Overwhelming products can add to the cognitive load and lead to mistakes. However, people also get used to any products once they’ve used them long enough. ([Large preview](https://files.smashing.media/articles/designing-for-stress-and-emergency/3-designing-for-stress-and-emergency.png))

When users are in an emergency, they experience _cognitive tunneling_ — it’s a state when their peripheral vision narrows, reading comprehension drops, fine motor skills deteriorate, and patience drops sharply. Under pressure, people often make decisions hastily, while others get entirely paralyzed. Either way is a likely **path to mistakes** — often irreversible ones and often without time for extensive deliberations.

Ideally, these decisions would be made way ahead of time — and then suggested when needed. But in practice, it’s not always possible. As it turns out, a good way to help people deal with stress is by **providing order** around how they manage it.

## Single-Tasking Instead Of Multi-Tasking

[People can’t _really_ multi-task](https://consensus.app/search/how-effective-are-people-at-multi-tasking-for-work/9GEx-KC0S8-OhSEgXClnrA/), especially in very stressful situations or emergencies. Especially with a big chunk of work in front of them, people need some order to make progress, reliably. That’s why simpler pages usually work better than one big complex page.

Order means giving users a **clear plan of action** to complete a task. No distractions, no unnecessary navigation. We ask simple questions and **prompt simple actions**, one after another, one thing at a time.

[![Task list pattern by Gov UK](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-for-stress-and-emergency/4-designing-for-stress-and-emergency.png)](https://designnotes.blog.gov.uk/2017/04/04/weve-published-the-task-list-pattern/)

Poorly designed products can add to the cognitive load and lead to mistakes. ([Large preview](https://files.smashing.media/articles/designing-for-stress-and-emergency/4-designing-for-stress-and-emergency.png))

An example of the plan is the [Task List Pattern](https://designnotes.blog.gov.uk/2017/04/04/weve-published-the-task-list-pattern/), invented by fine folks at Gov.uk. We break a task into a **sequence of sub-tasks**, describe them with actionable labels, assign statuses, and track progress.

To support accuracy, we revise **default settings**, values, presets, and actions. Also, the **order of actions** and buttons matters, so we put high-priority things first to make them easier to find. Then we add built-in safeguards (e.g., Undo feature) to prevent irreversible errors.

## Supporting In Emergencies

The most effective help during emergencies is to help people deal with the situation in a well-defined and effective way. That means being prepared for and designing an **emergency mode**, e.g., to activate instant alerts on emergency contacts, distribute pre-assigned tasks, and establish a line of communication.

[![Emergency plan by Rediplan App](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-for-stress-and-emergency/5-designing-for-stress-and-emergency.jpg)](https://www.redcross.org.au/emergencies/prepare/get-prepared-app/)

[Rediplan App](https://www.redcross.org.au/emergencies/prepare/get-prepared-app/) to prepare and act in case of emergencies. ([Large preview](https://files.smashing.media/articles/designing-for-stress-and-emergency/5-designing-for-stress-and-emergency.jpg))

[Rediplan App](https://www.redcross.org.au/emergencies/prepare/get-prepared-app/) by Australian Red Cross is an emergency plan companion that encourages citizens to **prepare their documents and belongings** with a few checklists and actions — including key contracts, meeting places, and medical information, all in one place.

## Just Enough Friction

Not all stress is equally harmful, though. As [Krystal Higgins points out](https://www.kryshiggins.com/optimal-onboarding-zone/), if there is not enough friction when onboarding new users and the experience is **too passive** or users are hand-held even through the most basic tasks, you risk that they won’t realize the **personal value** they gain from the experience and, ultimately, lose interest.

[![Bell Curve For Optimal User Onboarding](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-for-stress-and-emergency/6-designing-for-stress-and-emergency.png)](https://www.kryshiggins.com/optimal-onboarding-zone/)

We need to find the sweet spot between value realization and friction to create experiences that keep users engaged. (Image source: [Krystal Higgins](https://www.kryshiggins.com/optimal-onboarding-zone/)) ([Large preview](https://files.smashing.media/articles/designing-for-stress-and-emergency/6-designing-for-stress-and-emergency.png))

## Design And Test For Stress Cases

**Stress cases aren’t edge cases**. We can’t predict the emotional state in which a user comes to our site or uses our product. A person looking for specific information on a hospital website or visiting a debt management website, for example, is most likely already stressed. Now, if the interface is overwhelming, it will only add to their cognitive load.

Stress-testing your product is critical to prevent this from happening. It’s useful to set up an annual day to **stress test your product** and refine emergency responses. It could be as simple as running [content testing](https://contentdesign.intuit.com/foundations/content-testing/), or running tests in a real, noisy, busy environment where users actually work — at peak times.

And in case of emergencies, we need to check if fallbacks work as expected and if the current UX of the product helps people manage failures and exceptional situations well enough.

## Wrapping Up

Emergencies _will_ happen eventually — it’s just a matter of time. With good design, we can help **mitigate risk and control damage**, and make it hard to make irreversible mistakes. At its heart, that’s what good UX is exceptionally good at.

## Key Takeaways

People can’t multitask, especially in very stressful situations.

-   Stress **disrupts attention**, memory, cognition, decision-making.
-   Also, it’s **difficult to prioritize** and draw logical conclusions.
-   Under stress, we rely on fast, intuitive judgments — not reasoning.
-   It leads to instinctive responses based on **established habits**.

Goal: Design flows that support focus and high accuracy.

-   Start with better default settings, values, presets, and actions.
-   **High-priority first**: order of actions and buttons matters.
-   Break complex tasks down into a series of simple steps (10s–30s each).
-   Add built-in **safeguards** to prevent irreversible errors (Undo).

Shift users to single-tasking: ask for one thing at a time.

-   **Simpler pages** might work better than one complex page.
-   Suggest a **step-by-step plan of action** to follow along.
-   Consider, design, and test flows for emergency responses ahead of time.
-   Add emergency mode for **instant alerts** and task assignments.

## Meet “How To Measure UX And Design Impact”

You can find more details on **UX Strategy** in 🪴 [**Measure UX & Design Impact**](https://measure-ux.com/) (8h), a practical guide for designers and UX leads to measure and show your UX impact on business. Use the code 🎟 `IMPACT` to save 20% off today. [Jump to the details](https://measure-ux.com/).

[![How to Measure UX and Design Impact, with Vitaly Friedman.](https://files.smashing.media/articles/ux-metrics-video-course-release/measure-ux-and-design-impact-course.png)](https://measure-ux.com/ "How To Measure UX and Design Impact, with Vitaly Friedman")

## Useful Resources

-   “[Designing The SOS Emergency System](https://medium.com/design-bootcamp/ux-case-study-standby-17000867133c)”, by Ritik Jayy
-   “[Designing For Crisis](https://medium.com/net-magazine/designing-for-crisis-9cab10b4c519)”, by Eric Meyer
-   “[Designing For Stressed Out Users](https://medium.com/designing-services/designing-for-stressed-out-users-part-1-4489793dbe41)” (Series), by H Locke
-   [Designing For Stress](https://uxpodcast.com/293-life-death-design-katie-swindler/) (Podcast), by Katie Swindler
-   [Designing For Edge Cases and Exceptions](https://www.linkedin.com/posts/vitalyfriedman_ux-design-activity-7167433494200066048-trWE), by yours truly
-   [_Design For Real Life_](https://dfrlbook.com/), by Sara Wachter-Boettcher, Eric Mayer
-   “[Optimal Stress Levels For Onboarding](https://www.kryshiggins.com/optimal-onboarding-zone/), by Krystal Higgins

### Further Reading

-   “[How To Minimize The Environmental Impact Of Your Website](https://www.smashingmagazine.com/2025/09/how-minimize-environmental-impact-website/)”, James Chudley
-   “[AI In UX: Achieve More With Less](https://www.smashingmagazine.com/2025/10/ai-ux-achieve-more-with-less/)”, Paul Boag
-   “[How To Make Your UX Research Hard To Ignore](https://www.smashingmagazine.com/2025/10/how-make-ux-research-hard-to-ignore/)”, Vitaly Friedman
-   “[From Prompt To Partner: Designing Your Custom AI Assistant](https://www.smashingmagazine.com/2025/09/from-prompt-to-partner-designing-custom-ai-assistant/),” Lyndon Cerejo

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)