---
title: "Building the brain of your accessibility AI"
source: "https://www.last-child.com/build-ai-brain-a11y.html"
publishedDate: "2026-01-27"
category: "design"
feedName: "Sidebar"
---

## Summary

How accessibility leaders can build trusted, scalable AI assistants by curating the right standards, documentation, and institutional knowledge.

**Preface**

This document reflects the most accurate guidance I can offer today, based on the current state of accessibility standards, AI tooling, and real-world practice. Both accessibility and AI are evolving quickly. As models improve, platforms change, and new standards emerge, some of the details and recommendations here will need to adapt. The core principles—intentional curation, clear boundaries, and responsible use—are designed to hold up over time, even as the technology underneath them shifts.

* * *

Building a useful accessibility AI isn’t about clever prompts or the latest model. It’s about trust. More specifically, it’s about whether the answers your AI gives reflect how _your_ organization actually works, align with accepted standards, and help people make better decisions without creating new risk.

I often describe this as building the _brain_ of your accessibility AI. Prompts are the voice. Models are the horsepower. But the brain—the thing that makes the system reliable, consistent, and aligned with your values—is the knowledge you choose to feed it.

This document focuses on _how to curate that knowledge_. It is written for accessibility leaders who want to create an internal AI assistant that reflects their standards, reduces friction for product teams, and scales guidance responsibly.

This approach works whether you are using ChatGPT, Gemini Gems, or another AI platform. The mechanics differ slightly by vendor, but the underlying principle is the same: AI systems are only as good as the sources you allow them to _reference and ground their answers in_. This is not about retraining foundation models; it is about carefully controlling which materials the AI is allowed to draw from when responding.

### Start Inside Your Own Walls

Before you reach for external standards or open-source libraries, pause and look inward. The most important job of an accessibility AI is not to recite [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)—it’s to answer the questions your teams already ask, in a way that matches how your organization expects work to be done.

This internal audit is about finding your North Star. You are looking for clarity, consistency, and decisions that have already been made.

Some of the most valuable internal sources tend to be:

-   Finalized accessibility policies and standards. Not drafts. Not half-remembered wiki pages. The approved versions that represent what leadership has signed off on.
-   Verified checklists and testing protocols. These documents quietly encode how strict you are, where you allow judgment calls, and what “done” actually means.
-   Design system documentation that explains intent, not just implementation. Code tells an AI _what_ exists. Rationale tells it _why_.
-   Training materials from Lunch & Learns, onboarding sessions, or internal workshops. These often contain the clearest explanations because they were designed to teach, not impress.
-   Logs of common failures—accessibility-related Jira tickets, QA notes, or recurring review comments. This is where your organization’s real pain lives, and where an AI can provide the most immediate value.

As you collect these materials, apply two simple filters. Is it current? And is it definitive? Anything pre-WCAG 2.1 that hasn’t been explicitly reaffirmed should be treated with caution. Drafts and speculative documents should stay out of the system entirely.

When these files are uploaded into an AI knowledge base, they give the system a shared memory of your internal decisions. Instead of guessing, it can say, “Based on our design system…” or “According to our testing protocol…,” which is exactly what your teams want to hear.

### Standing on the Shoulders of Giants

Even the most mature organizations don’t have answers for everything. External, open-source standards provide guardrails and context when internal documentation is silent.

High-quality design systems prevent hallucination and vague advice. A few consistently strong sources include:

-   [The U.S. Web Design System](https://designsystem.digital.gov/documentation/accessibility/)
-   [IBM’s Carbon Design System](https://carbondesignsystem.com/)
-   [Pinterest’s Gestalt Design System](https://gestalt.pinterest.systems/)
-   [The GOV.UK Design System](https://design-system.service.gov.uk/accessibility/)

From these systems, capture accessibility guidance, developer expectations, and voice-and-tone rules. These materials teach an AI how accessible components _behave_, not just how they look.

You may also choose to include a compiled PDF containing WCAG, ARIA specifications, and related best practices. This gives your AI direct access to authoritative standards while still grounding responses in your internal context.

### Creating a Trusted Resource Index

In addition to PDFs, a simple CSV file dramatically improves reliability. This index acts as a map, telling the AI what a resource is for and when it should be used.

A well-structured CSV typically includes:

-   Resource name
-   URL
-   Topic or category
-   Intended audience (designers, developers, PMs, QA, content)
-   A short, action-oriented description
-   Author or source

When paired with clear instructions, this index allows your AI to recommend the right resource to the right role at the right time.

### Training Documents and Resource Details

This section is intentionally practical. The specifics will vary by AI platform, but the constraints and trade-offs are consistent across most tools.

There are practical limits when preparing documents for AI systems. Most platforms prioritize uploaded or connected documents when answering questions, so focus on a small set of high-value PDFs rather than uploading everything at once. While many tools allow relatively large files, they often process only a portion of each document. For text-heavy materials, smaller, well-curated files tend to produce more reliable results. You can also provide instructions that explain _when_ each document should be used. For instance, a compilation of WCAG/ARIA would be used for questions about compliance and rules, but not for questions about disability accommodations.

Collect the raw documents in a shared folder, so they can be easily pruned and generate a compiled document regularly. I have an automation script for doing this on a Mac.

The CSV of trusted resources should only include the best resources, not an encyclopedia. Overly large or unfocused lists reduce signal and make it harder for the AI to identify the most relevant sources for a given question. Be sure to include what subject each URL excels at.

This method creates a _practical internal tool_, not a replacement for specialized accessibility platforms. Companies like [Evinced](https://www.evinced.com/), [Deque](https://www.deque.com/), and TestParty have invested years into building comprehensive accessibility intelligence, automated testing, and expert-maintained knowledge bases.

What you are building here is different. This approach gives you an internal assistant that reflects _your decisions, your standards, and your language_. It supports scale, consistency, and sustainability—but it does not replace expert audits, commercial tooling, or deep platform integrations.

Used thoughtfully, this becomes an extension of your accessibility program rather than a shortcut around it.

### Sample documents

I’ve created a GitHub project ([a11y-ai-training](https://github.com/7mary4/a11y-ai-training/tree/main)) for sharing these resources—feel free to comment or fork.

-   [Trusted Resources (.csv)](https://github.com/7mary4/a11y-ai-training/blob/main/Trusted%20resources%20for%20training%20AI%20-%20Trusted_Resources%20-%20compiled%20list%20with%20descriptions.csv)
-   [Compiled W3C/ARIA resources (.pdf)](https://github.com/7mary4/a11y-ai-training/blob/main/compiled%20w3c%20documents.pdf)
-   [Knowledge Base Instructions (.pdf)](https://github.com/7mary4/a11y-ai-training/blob/main/AI%20knowledge%20base%20instructions.pdf)
-   [Automator script for concatenating pdf documents (apple script)](https://github.com/7mary4/a11y-ai-training/blob/main/automator-pdf-compilation)