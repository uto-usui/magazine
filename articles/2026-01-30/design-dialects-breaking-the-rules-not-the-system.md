---
title: "
					Design Dialects: Breaking the Rules, Not the System				"
source: "
					https://alistapart.com/article/design-dialects-breaking-the-rules-not-the-system/				"
publishedDate: "2025-09-27"
category: "web-standards"
feedName: "A List Apart"
author: "
				by 					"
---

_“Language is not merely a set of unrelated sounds, clauses, rules, and meanings; it is a totally coherent system bound to context and behavior.”_ — Kenneth L. Pike

Article Continues Below

The web has accents. So should our design systems.

## **Design Systems as Living Languages**[#section2](#section2)

Design systems aren’t component libraries—they’re living languages. [**Tokens**](https://m3.material.io/foundations/design-tokens/overview) are phonemes, [**components**](https://atlassian.design/components) are words, [**patterns**](https://designsystem.university/glossary#pattern) are phrases, [**layouts**](https://www.figma.com/blog/design-systems-102-how-to-build-your-design-system/#use-layout-grids-and-spacing-to-create-visual) are sentences. The conversations we build with users become the stories our products tell.

But here’s what we’ve forgotten: the more fluently a language is spoken, the more accents it can support without losing meaning. English in Scotland differs from English in Sydney, yet both are unmistakably English. The language adapts to context while preserving core meaning. This couldn’t be more obvious to me, a Brazilian Portuguese speaker, who learned English with an American accent, and lives in Sydney.

Our design systems must work the same way. Rigid adherence to visual rules creates brittle systems that break under contextual pressure. Fluent systems bend without breaking.

**Consistency becomes a prison**

The promise of design systems was simple: consistent components would accelerate development and unify experiences. But as systems matured and products grew more complex, that promise has become a prison. [Teams file “exception” requests by the hundreds](https://adobe.design/stories/design-for-scale/designing-design-systems-supporting-implementation-and-adoption). Products launch with workarounds instead of system components. Designers spend more time defending consistency than solving user problems.

Our design systems must learn to speak **dialects**.

**A design dialect is a systematic adaptation of a design system that maintains core principles while developing new patterns for specific contexts.** Unlike one-off customizations or brand themes, dialects preserve the system’s essential grammar while expanding its vocabulary to serve different users, environments, or constraints.

## **When Perfect Consistency Fails**[#section3](#section3)

At [Booking.com](https://booking.com/), I learned this lesson the hard way. We A/B-tested everything—color, copy, button shapes, even logo colors. As a professional with a graphic design education and experience building brand style guides, I found this shocking. While everyone fell in love with Airbnb’s pristine design system, Booking grew into a giant without ever considering visual consistency.  

The chaos taught me something profound: **consistency isn’t ROI; solved problems are.**

At Shopify. Polaris ([https://polaris-react.shopify.com/](https://polaris-react.shopify.com/)) was our crown jewel—a mature design language perfect for merchants on laptops. As a product team, we were expected to adopt Polaris as-is. Then my fulfillment team hit an “Oh, Ship!” moment, as we faced the challenge of building an app for warehouse pickers using our interface on shared, battered Android scanners in dim aisles, wearing thick gloves, scanning dozens of items per minute, many with limited levels of English understanding.

Task completion with standard Polaris: **0%**.

Every component that worked beautifully for merchants failed completely for pickers. White backgrounds created glare. 44px tap targets were invisible to gloved fingers. Sentence-case labels took too long to parse. Multi-step flows confused non-native speakers.

We faced a choice: abandon Polaris entirely, or _teach it to speak warehouse_.

## **The Birth of a Dialect**[#section4](#section4)

We chose evolution over revolution. Working within Polaris’s core principles—clarity, efficiency, consistency—we developed what we now call a **design dialect**:

**Constraint**

**Fluent Move**

**Rationale**

Glare & low light

Dark surfaces + light text

Reduce glare on low-DPI screens

Gloves & haste

90px tap targets (~2cm)

Accommodate thick gloves

Multilingual

Single-task screens, plain language

Reduce cognitive load

**Result:** Task completion jumped from **0% to 100%**. Onboarding time dropped from three weeks to one shift.

This wasn’t customization or theming—this was a **dialect**: a systematic adaptation that maintained Polaris’s core grammar while developing new vocabulary for a specific context. Polaris hadn’t failed; it had learned to speak warehouse.

## **The Flexibility Framework**[#section5](#section5)

At [Atlassian](http://www.atlassian.com/), working on the Jira platform—itself a system within the larger Atlassian system—I pushed for formalizing this insight. With dozens of products sharing a design language across different codebases, we needed systematic flexibility so we built directly into our ways of working. The old model—exception requests and special approvals—was failing at scale.

We developed the **Flexibility Framework** to help designers define how flexible they wanted their components to be:

**Tier**

**Action**

**Ownership**

**Consistent**

Adopt unchanged

Platform locks design + code

**Opinionated**

Adapt within bounds

Platform provides smart defaults, products customize

**Flexible**

Extend freely

Platform defines behavior, products own presentation

During a navigation redesign, we tiered every element. Logo and global search stayed Consistent. Breadcrumbs and contextual actions became Flexible. Product teams could immediately see where innovation was welcome and where consistency mattered.

## **The Decision Ladder**[#section6](#section6)

Flexibility needs boundaries. We created a simple ladder for evaluating when rules should bend:

**Good:** Ship with existing system components. Fast, consistent, proven.

**Better:** Stretch a component slightly. Document the change. Contribute improvements back to the system for all to use.

**Best:** Prototype the ideal experience first. If user testing validates the benefit, update the system to support it.

The key question: “Which option lets users succeed fastest?”

Rules are tools, not relics.

## **Unity Beats Uniformity**[#section7](#section7)

Gmail, Drive, and Maps are unmistakably Google—yet each speaks with its own accent. They achieve unity through shared principles, not cloned components. One extra week of debate over button color costs roughly $30K in engineer time.

Unity is a brand outcome; **fluency is a user outcome.** When the two clash, side with the user.

## **Governance Without Gates**[#section8](#section8)

How do you maintain coherence while enabling dialects? Treat your system like a living vocabulary:

**Document every deviation** – e.g., dialects/warehouse.md with before/after screenshots and rationale.

**Promote shared patterns** – when three teams adopt a dialect independently, review it for core inclusion.

**Deprecate with context** – retire old idioms via flags and migration notes, never a big-bang purge.

A living dictionary scales better than a frozen rulebook.

## **Start Small: Your First Dialect**[#section9](#section9)

Ready to introduce dialects? Start with one broken experience:

**This week:** Find one user flow where perfect consistency blocks task completion. Could be mobile users struggling with desktop-sized components, or accessibility needs your standard patterns don’t address.

**Document the context:** What makes standard patterns fail here? Environmental constraints? User capabilities? Task urgency?

**Design one systematic change:** Focus on behavior over aesthetics. If gloves are the problem, bigger targets aren’t “”breaking the system””—they’re serving the user. Earn the variations and make them intentional.

**Test and measure:** Does the change improve task completion? Time to productivity? User satisfaction?

**Show the savings:** If that dialect frees even half a sprint, fluency has paid for itself.

## **Beyond the Component Library**[#section10](#section10)

We’re not managing design systems anymore—**we’re cultivating design languages.** Languages that grow with their speakers. Languages that develop accents without losing meaning. Languages that serve human needs over aesthetic ideals.

The warehouse workers who went from 0% to 100% task completion didn’t care that our buttons broke the style guide. They cared that the buttons finally worked.

Your users feel the same way. Give your system permission to speak their language.