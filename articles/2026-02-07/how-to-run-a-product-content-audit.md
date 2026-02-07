---
title: "How to run a product content audit"
source: "https://uxcontent.com/product-content-audit/"
publishedDate: "2025-06-06"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Oleksii Tkachenko"
---

**If you’re running your first audit or are unsure where to begin, use [this content design audit template](https://www.figma.com/community/file/1489250366825103388).** 

Join any content community, and you’ll notice a few recurring post topics: writers making fun of an inappropriate or misleading copy, people looking for career advice, and content designers who want to know how to audit their product after starting their new job.

The last one is worth a deeper look. Running an audit takes quite some effort, but it pays off the long run. Today, I’d like to go over a quick step-by-step guide on how to better evaluate your content and provide you with a [content design audit template](https://www.figma.com/community/file/1489250366825103388) — a tool to help you along the way.

## How do you know if you need to run a content audit?

Any house needs a foundation, and a well-done content design audit is exactly that. It serves as a first step toward higher quality of content in your product, more efficient ways of working, and making your contribution to the project easier to highlight.

I’d even argue that it’s not about whether it’s expected from you by your stakeholders. If done right, doing it proactively will put you in a much stronger position as a content designer, and will help you build a stronger content culture within the company.

## Why run a content design audit?

Let’s break it down: what’s in it for you?

### 1\. Evaluating your current content quality

Any conversation about improving the product will always start with the question of why we need to do that. Rightly so. Nobody wants to work on the idea that’s based on someone’s random opinion or a taste preference. A proper audit will serve as a conversation starter for any future improvements you want to make. 

Before we discuss where we want to be, we need to figure out where we are first. Just like navigating a map, you can’t get to your destination without checking where you stand first.

### 2\. Getting a holistic view of things you communicate to your users

Inconsistent communication often stems from teams working in silos. There’s only this much we can do in terms of syncing, informing other teams of changes we make, and aligning when we rapidly design new features and flows.

Audit is a tool that lets you zoom out and see the full journey the user goes through. This helps you see where the story breaks, logic does not align, or where your product provides users with contradicting and inconsistent messaging.

### 3\. Aligning user experience

It is not just about unifying your terminology, it’s deeper than that. After your audit, you can start building content patterns across flows and features that your product offers. Patterns are essential for efficient design process and collaboration. These are the building blocks for your future projects and a strong foundation to hold your product together.

Imagine that you’re working on a banking app and you want to make sure your users have a clear understanding how the credit limit works. For that to work, you need to keep the story consistent and avoid confusing your users by making them learn new terms or usage policies.  
  
Therefore, well-defined content patterns around how you communicate the credit limit as a concept will help you with consistency and clarity. 

![Diagram showing how the content pattern for "Communicating credit limit" connects to multiple product flows. The central green block labeled "Communicating credit limit" is supported by a glossary, guidelines, and components. This pattern is applied across four yellow flows: App onboarding flow, Credit card application flow, Shopping flow, and Debt recovery flow. Arrows indicate that the same content standard feeds into each flow for consistency.](https://uxcontent.com/wp-content/uploads/2025/06/content-patterns-scaled.png)

### **4\. Bring a measuring stick**

Just being a broken record and constantly advocating for the importance of content design won’t get us far. Instead, why not let the numbers speak to your stakeholders?

The beauty of heuristic evaluation is that it brings the numbers into the conversations about content quality. Numbers are solid, numbers are taken seriously. You will no longer be preaching to your stakeholders about some inconsistent usage of words (for them, they just exist somewhere there, far away, in the realm of grammar absolutists) — you will be showing scores reflecting how clear it is for the user to go through different parts of the product. That’s a more serious approach.

![Bar chart titled "Heuristic evaluation results" showing scores for three product flows. The Onboarding flow scored 16 (yellow bar), the Booking flow scored 22 (green bar), and the Checkout flow scored 10 (red bar). The Booking flow performed best, while the Checkout flow had the lowest score, indicating areas for improvement.](https://uxcontent.com/wp-content/uploads/2025/06/Heuristics-evaluation-e1749165261470.png)

### 5\. Getting to know the product and people building it

That’s a bonus for you. Auditing is a great onboarding exercise. Within one project you get to: know the product better from different angles, meet different teams responsible for different parts of the product, learn about technical limitations of the product, put yourself on the radar of other teams and stakeholders.

## How to conduct a content audit: step-by-step

### 1\. Set up a working space

This may vary depending on your personal preferences, level of confidence in using design tools, and what tools are available to you within your company.

A setup I recommend:

-   **Figma or FigJam:** for flow gathering and reviewing. Any other whiteboard tool that you’re more confident using might work here too.

If you’re running your first audit or are unsure where to begin, use **[this content design audit template](https://www.figma.com/community/file/1489250366825103388).** 

-   **Notion, Google Docs, or Google Sheets**: for documenting findings and content patterns (for future use).
-   **Jira or any other board:** for action items or tickets to tackle all your findings.

Just to be clear: Google Meet, Zoom, Slack, or Teams — an obvious must, as you’ll be running investigations with the engineers, syncing with designers, workshopping with others in your team, etc.

### 2\. Consolidate your content

Depending on the design and documentation hygiene at your company, this one might be either a walk in a park or quite an investigation. Your ultimate goal is to have the flows mapped out on the board.

Before you start searching for the screens, let’s address the two most popular dilemmas:

#### 2.1. Mockups or live screens?

Short answer: whatever you have. While going through live screens will help you have the most up to date picture, there is a trade-off related to you missing some scenarios, and edge cases.

If your team is bad at keeping the current design files fresh, your audit might also be a great point of highlighting why it’s important.

#### 2.2. Is the process platform-agnostic?

Whether it’s an app, a website, or a physical device with its own software and hardware platform — the process might slightly vary when it comes to actually gathering the content you have out there. However, the overall framework remains the same.

#### 2.3. What if my company is not design-led?

Learn where your strings live and locate them.

I get it, companies do not always prefer Figma as a source of truth. Instead, they either use content management systems or just work with content directly in code. This means you have to find where to export the content from and consolidate it for the review. 

For that to work, you need to find out  where the strings live. Unlike with mockups, strings might be scattered across different files or even systems. Here’s how you can track it down:

##### Work with engineers

Here’s what you want to ask when having a chat with your engineers:

-   Do they use a system or tool to store content strings?
-   Are there localization tools or files you can access?
-   If the content is stored directly in code, what are the identifiers that might help you locate it efficiently?
-   Check with localization team

Having a dedicated team working on localization makes your search way easier. Usually, it means that there’s a system where translations (including the original language) are stored: like Localise or Phrase. When there’s a system, the content is already consolidated and can be exported for review. 

##### Search directly in code

With support from engineers, you might get access to codebase or GitHub repository. There, you can locate strings by keywords using code search (GitHub/GitLab) or string search (IDEs)

You can try searching for a button copy or a label text that you saw live in the product, this way you’ll find examples of what identifiers to use while searching further for copy by specific components.

Once you locate the strings, use Notion or Google Sheets to consolidate your content. To keep it structured and clean, make sure you tag your strings based on which flow and screen they belong to.  
  
The key downside of this approach is reviewing copy without context, so you might make the same mistakes localization teams make when they prefer direct translations instead of transcreation — making changes that will not compliment the designs well.

### 3\. Do a screen-by-screen run to spot general content issues

Here’s a basic checklist that will help you spot the issues. Feel free to customize this based on your product or industry specifics.

-   Does the content fit the design (nothing gets cut off or overflows)?
-   Does the tone of voice match your brand guidelines?
-   Are grammar,spelling, and capitalization correct?
-   Is punctuation accurate and consistent?
-   Are calls to action clear and actionable?
-   Is the information accurate and fresh?
-   Is jargon avoided or explained?
-   Is it easy to find the key info (scannability and hierarchy)?
-   Is localization culturally and linguistically correct (If applicable)?

While doing your screen-by-screen check, remember to take advantage of using a whiteboard: leave notes, make sketches, tag things up to later investigate — anything that works for you.

### 4\. Do a heuristic evaluation of your flows

Bobbie Wood offers an extensive checklist for this, but since we already cover some of those things in a screen-level evaluation checklist, I recommend a simpler approach — one that aligns with the [general UX heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

Pick a flow and rate it on a scale of 1–5 to the following criteria:

-   **Match with user expectations**: Does the content align with user goals, mental models, and real-world conventions?
-   **Clarity & visibility**: Is the necessary information easily visible and understandable at each step?
-   **Guidance & error prevention**: Does the content help users navigate smoothly and avoid mistakes?
-   **Flexibility & efficiency**: Does the content cater to both new and experienced users, reducing unnecessary effort?
-   **Consistency & standards**: Does the content follow a unified voice, tone, and terminology throughout the flow?

When you’re done, you’ll have a score from 1-25 helping you clearly see which flows cause the most disruption to user experience and must be improved.

### 5\. Map out action items

So we have performed a review of your screens and flows. Next is to document your findings and prioritise your content design improvements. For that, I suggest using a classic Kanban board with a short summary of an issue, priority, and who you’ll need to collaborate with to fix that. People often forget this last bit but it’s crucial if we aim to actually fix things — it’s all about effective collaboration with others.

### 6\. Prepare a final report and socialize it

Remember why you did it in the first place? To address the harm caused by working in silos. Therefore, it’s crucial to keep your work visible and present it to your team and stakeholders.  
  
To do that efficiently, avoid just dropping them into a messy whiteboard with all the notes and drafts you’ve made along the way. Devote some time to prepare a comprehensive report and presentation. The goal is to explain the rationale behind the audit, highlight the current content quality, and give a clear roadmap for improvements from your end. 

## The content audit is over. What’s next?

It’s time to create supporting documentation for your project. The size of it may vary depending on your workload and vision. I definitely recommend setting up a separate document that includes all audited flows with current scores from heuristic evaluation. This will serve as a dashboard to track your future progress.

## Frequently asked questions about content audits

**What is a content audit in UX?**

A content audit in UX is a systematic review of the written content in a digital product—such as an app or website—to evaluate clarity, consistency, tone, usability, and alignment with user goals. It helps teams identify content debt and prioritize improvements.

**How do I know if my product needs a content audit?**

If your content is inconsistent, outdated, or difficult to manage across flows or platforms, it’s time for an audit. Content audits are especially useful when joining a new team, launching a redesign, or improving product quality and UX.

**What’s the difference between a content audit and a heuristic evaluation?**

A content audit reviews your product’s actual content for issues, while a heuristic evaluation scores that content against a rubric or principles (like clarity, guidance, and consistency). Together, they offer both qualitative and quantitative insights.

**Do I need special tools to run a content audit?**

No. Common tools include whiteboarding platforms (like Figma or FigJam), spreadsheets or Notion for documentation, and Jira or Trello for tracking action items. Some teams also use localization tools or audit templates to streamline the process.

_Oleksii Tkachenko is a Senior Content Designer at TravelPerk. [Connect with Oleksii on LinkedIn](https://www.linkedin.com/in/tkachenko-oleksii/)._