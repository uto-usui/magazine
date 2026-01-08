---
title: "How To Measure The Impact Of Features"
source: "https://smashingmagazine.com/2025/12/how-measure-impact-features-tars/"
publishedDate: "2025-12-19"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Vitaly Friedman)"
---

-   8 min read
-   [UX](https://smashingmagazine.com/category/ux), [Design](https://smashingmagazine.com/category/design), [Tools](https://smashingmagazine.com/category/tools)

Meet TARS — a simple, repeatable, and meaningful UX metric designed specifically to track the performance of product features. Upcoming part of the [Measure UX & Design Impact](https://measure-ux.com/) (use the code 🎟 `IMPACT` to save 20% off today).

So we design and ship a **shiny new feature**. How do we know if it’s working? How do we measure and track its impact? There is [no shortage in UX metrics](https://measuringu.com/an-overview-of-70-ux-metrics/), but what if we wanted to establish a **simple, repeatable**, meaningful UX metric — specifically for our features? Well, let’s see how to do just that.

[![Adrian Raudaschl's framework for measuring feature impact.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-measure-impact-features-tars/1-impact-features-tars.jpg)](https://files.smashing.media/articles/how-measure-impact-features-tars/1-impact-features-tars.jpg)

With [TARS](https://uxdesign.cc/tars-a-product-metric-game-changer-c523f260306a?sk=v2%2F2a9d7d1e-bae9-4875-9063-4b6a10ae110c), we can assess how effective features are and how well they are performing.([Large preview](https://files.smashing.media/articles/how-measure-impact-features-tars/1-impact-features-tars.jpg))

I first heard about the **TARS framework** from Adrian H. Raudschl’s wonderful article on “[How To Measure Impact of Features](https://uxdesign.cc/tars-a-product-metric-game-changer-c523f260306a?sk=v2%2F2a9d7d1e-bae9-4875-9063-4b6a10ae110c)”. Here, Adrian highlighted how his team tracks and decides which features to focus on — and then maps them against each other in a **2×2 quadrants matrix**.

It turned out to be a very useful framework to **visualize** the impact of UX work through the lens of business metrics.

Let’s see how it works.

## 1\. Target Audience (%)

We start by quantifying the **target audience** by exploring what percentage of a product’s users have the specific problem that a feature aims to solve. We can study existing or similar features that try to solve similar problems, and how many users engage with them.

Target audience **isn’t the same** as feature usage though. As Adrian noted, if we know that an existing Export Button feature is used by 5% of all users, it doesn’t mean that the target audience is 5%. **More users** might have the problem that the export feature is trying to solve, but they can’t find it.

> Question we ask: “What percentage of all our product’s users have that specific problem that a new feature aims to solve?”

## 2\. A = Adoption (%)

Next, we measure how well we are **“acquiring”** our target audience. For that, we track how many users actually engage _successfully_ with that feature over a specific period of time.

We **don’t focus on CTRs or session duration** there, but rather if users _meaningfully_ engage with it. For example, if anything signals that they found it valuable, such as sharing the export URL, the number of exported files, or the usage of filters and settings.

[![The TARS Framework Step](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-measure-impact-features-tars/2-impact-features-tars.jpg)](https://files.smashing.media/articles/how-measure-impact-features-tars/2-impact-features-tars.jpg)

Adoption rates: from low adoption (<20%) to high adoption (>60%). Illustration by [Adrian Raudaschl](https://uxdesign.cc/tars-a-product-metric-game-changer-c523f260306a?sk=v2%2F2a9d7d1e-bae9-4875-9063-4b6a10ae110c). ([Large preview](https://files.smashing.media/articles/how-measure-impact-features-tars/2-impact-features-tars.jpg))

High **feature adoption** (>60%) suggests that the problem was impactful. Low adoption (<20%) might imply that the problem has simple workarounds that people have relied upon. Changing habits takes time, too, and so low adoption in the beginning is expected.

Sometimes, low feature adoption has nothing to do with the feature itself, but rather **where it sits in the UI**. Users might never discover it if it’s hidden or if it has a confusing label. It must be obvious enough for people to stumble upon it.

Low adoption doesn’t always equal failure. If a problem only affects 10% of users, hitting 50–75% adoption within that specific niche means the feature is a **success**.

> Question we ask: “What percentage of active target users actually use the feature to solve that problem?”

## 3\. Retention (%)

Next, we study whether a feature is actually used repeatedly. We measure the frequency of use, or specifically, how many users who engaged with the feature actually keep using it over time. Typically, it’s a strong signal for **meaningful impact**.

If a feature has >50% retention rate (avg.), we can be quite confident that it has a **high strategic importance**. A 25–35% retention rate signals medium strategic significance, and retention of 10–20% is then low strategic importance.

> Question we ask: “Of all the users who meaningfully adopted a feature, how many came back to use it again?”

## 4\. Satisfaction Score (CES)

Finally, we measure the **level of satisfaction** that users have with that feature that we’ve shipped. We don’t ask everyone — we ask only “retained” users. It helps us spot hidden troubles that might not be reflected in the retention score.

[![Customer Satisfaction Score, measured with a survey](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-measure-impact-features-tars/3-impact-features-tars.jpg)](https://files.smashing.media/articles/how-measure-impact-features-tars/3-impact-features-tars.jpg)

We ask users how easy it was to solve a problem after they used a feature. Illustration by [Adrian Raudaschl](https://uxdesign.cc/tars-a-product-metric-game-changer-c523f260306a?sk=v2%2F2a9d7d1e-bae9-4875-9063-4b6a10ae110c). ([Large preview](https://files.smashing.media/articles/how-measure-impact-features-tars/3-impact-features-tars.jpg))

Once users actually used a feature multiple times, we ask them **how easy it was to solve** a problem after they used that feature — between “much more difficult” and “much easier than expected”. We know how we want to score.

## Using TARS For Feature Strategy

Once we start measuring with TARS, we can calculate an **S÷T score** — the percentage of Satisfied Users ÷ Target Users. It gives us a sense of how well a feature is performing for our intended target audience. Once we do that for every feature, we can map all features across 4 quadrants in a **2×2 matrix**.

[![Feature retention curves](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-measure-impact-features-tars/4-impact-features-tars.jpg)](https://files.smashing.media/articles/how-measure-impact-features-tars/4-impact-features-tars.jpg)

Evaluating features on a 2×2 matrix based on S/T score Illustration by [Adrian Raudaschl](https://uxdesign.cc/tars-a-product-metric-game-changer-c523f260306a?sk=v2%2F2a9d7d1e-bae9-4875-9063-4b6a10ae110c). ([Large preview](https://files.smashing.media/articles/how-measure-impact-features-tars/4-impact-features-tars.jpg))

**Overperforming features** are worth paying attention to: they have low retention but high satisfaction. It might simply be features that users don’t have to use frequently, but when they do, it’s extremely effective.

**Liability features** have high retention but low satisfaction, so perhaps we need to work on them to improve them. And then we can also identify **core features** and project features — and have a conversation with designers, PMs, and engineers on what we should work on next.

## Conversion Rate Is Not a UX Metric

TARS doesn’t cover conversion rate, and for a good reason. As [Fabian Lenz noted](https://www.linkedin.com/posts/fabian-lenz-digital-experience-leadership_conversion-rate-is-not-a-ux-metric-yes-activity-7394261839506739200-78G9), conversion is often considered to be the **ultimate indicator of success** — yet in practice it’s always very difficult to present a clear connection between smaller design initiatives and big conversion goals.

[![Chart comparing Leading vs Lagging Measures for UX metrics](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-measure-impact-features-tars/5-impact-features-tars.png)](https://files.smashing.media/articles/how-measure-impact-features-tars/5-impact-features-tars.png)

Leading vs. Lagging Measures by [Jeff Sauro and James R. Lewis](https://measuringu.com/leading-vs-lagging/). (But please do avoid NPS at all costs). ([Large preview](https://files.smashing.media/articles/how-measure-impact-features-tars/5-impact-features-tars.png))

The truth is that almost everybody on the team is working towards better conversion. An uptick might be connected to **many different initiatives** — from sales and marketing to web performance boost to seasonal effects to UX initiatives.

UX can, of course, improve conversion, but it’s not really a UX metric. Often, people simply **can’t choose the product** they are using. And often a desired business outcome comes out of necessity and struggle, rather than trust and appreciation.

### High Conversion Despite Bad UX

As Fabian [writes](https://www.linkedin.com/posts/fabian-lenz-digital-experience-leadership_conversion-rate-is-not-a-ux-metric-yes-activity-7394261839506739200-78G9/), **high conversion rate** can happen despite poor UX, because:

-   **Strong brand power** pulls people in,
-   Aggressive but effective **urgency tactics**,
-   Prices are extremely attractive,
-   Marketing performs brilliantly,
-   Historical customer loyalty,
-   Users simply have no alternative.

[![UX Scorecard and design metrics overview](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-measure-impact-features-tars/6-impact-features-tars.jpg)](https://files.smashing.media/articles/how-measure-impact-features-tars/6-impact-features-tars.jpg)

A practical overview of design metrics and UX scorecards: [Measuring UX: Your First Step Towards Objective Evaluation](https://uxplanet.org/measuring-ux-your-first-step-towards-objective-evaluation-a408b312777b) by Roman Videnov. ([Large preview](https://files.smashing.media/articles/how-measure-impact-features-tars/6-impact-features-tars.jpg))

### Low Conversion Despite Great UX

At the same time, a low conversion rate can occur despite great UX, because:

-   **Offers aren’t relevant** to the audience,
-   **Users don’t trust the brand**,
-   Poor business model or high risk of failure,
-   Marketing doesn’t reach the right audience,
-   External factors (price, timing, competition).

An improved conversion is the **positive outcome of UX initiatives**. But good UX work typically improves task completion, reduces time on task, minimizes errors, and avoids decision paralysis. And there are plenty of [actionable design metrics we could use](https://www.linkedin.com/posts/vitalyfriedman_how-to-measure-ux-httpslnkdine5uedtzy-activity-7332664809382952960-HERA) to track UX and drive sustainable success.

## Wrapping Up

**Product metrics** alone don’t always provide an accurate view of how well a product performs. Sales might perform well, but users might be extremely inefficient and frustrated. Yet the churn is low because users can’t choose the tool they are using.

[![Chart comparing Leading vs Lagging Measures for UX metrics](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-measure-impact-features-tars/7-impact-features-tars.jpg)](https://files.smashing.media/articles/how-measure-impact-features-tars/7-impact-features-tars.jpg)

[Design KPIs and UX Metrics](https://www.linkedin.com/posts/vitalyfriedman_ux-design-activity-7140641630507687936-YTI7), a quick overview by yours truly. Numbers are, of course, placeholders. ([Large preview](https://files.smashing.media/articles/how-measure-impact-features-tars/7-impact-features-tars.jpg))

We need UX metrics to understand and improve user experience. What I love most about TARS is that it’s a neat way to connect customers’ usage and **customers’ experience with relevant product metrics**. Personally, I would extend TARS with [UX-focused metrics and KPIs](https://www.linkedin.com/posts/vitalyfriedman_ux-design-activity-7140641630507687936-YTI7) as well — depending on the needs of the project.

Huge thanks to [Adrian H. Raudaschl](https://www.linkedin.com/in/adrian-raudaschl/) for putting it together. And if you are interested in metrics, I highly recommend you follow him for practical and useful guides all around just that!

## Meet “How To Measure UX And Design Impact”

You can find more details on **UX Strategy** in 🪴 [**Measure UX & Design Impact**](https://measure-ux.com/) (8h), a practical guide for designers and UX leads to measure and show your UX impact on business. Use the code 🎟 `IMPACT` to save 20% off today. [Jump to the details](https://measure-ux.com/).

[![How to Measure UX and Design Impact, with Vitaly Friedman.](https://files.smashing.media/articles/ux-metrics-video-course-release/measure-ux-and-design-impact-course.png)](https://measure-ux.com/ "How To Measure UX and Design Impact, with Vitaly Friedman")

## Useful Resources

-   “[How To Measure UX and Design Impact](https://measure-ux.com/)”, by yours truly
-   “[Business Thinking For Designers](https://thecdo.school/books)”, by Ryan Rumsey
-   “[ROI of Design Project](https://www.linkedin.com/feed/update/urn:li:activity:7338462034763661312/)
-   “[How the Right UX Metrics Show Game-Changing Value](https://articles.centercentre.com/how-the-right-ux-metrics-show-game-changing-value/)”, by Jared Spool
-   “[Research Sample Size Calculators](https://www.linkedin.com/posts/vitalyfriedman_ux-design-research-activity-7164173642887606274-rEqq)”

### Further Reading

-   “[Designing For Stress And Emergency](https://www.smashingmagazine.com/2025/11/designing-for-stress-emergency/)”, Vitaly Friedman
-   “[AI In UX: Achieve More With Less](https://www.smashingmagazine.com/2025/10/ai-ux-achieve-more-with-less/)”, Paul Boag
-   “[The Accessibility Problem With Authentication Methods Like CAPTCHA](https://www.smashingmagazine.com/2025/11/accessibility-problem-authentication-methods-captcha/)”, Eleanor Hecks
-   “[From Prompt To Partner: Designing Your Custom AI Assistant](https://www.smashingmagazine.com/2025/09/from-prompt-to-partner-designing-custom-ai-assistant/)”, Lyndon Cerejo

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)