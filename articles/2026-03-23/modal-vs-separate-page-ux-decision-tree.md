---
title: "Modal vs. Separate Page: UX Decision Tree"
source: "https://smashingmagazine.com/2026/03/modal-separate-page-ux-decision-tree/"
publishedDate: "2026-03-19"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Vitaly Friedman)"
---

-   7 min read
-   [Design](https://smashingmagazine.com/category/design), [User Experience](https://smashingmagazine.com/category/user-experience), [UI](https://smashingmagazine.com/category/ui), [Design Patterns](https://smashingmagazine.com/category/design-patterns)

How to choose between modals and pages, when to avoid modals, and how to determine the right level of interruption or navigation. Brought to you by [Smart Interface Design Patterns](https://smart-interface-design-patterns.com/), a **friendly video course on UX** and design patterns by Vitaly.

You probably have been there before. How do we choose between **showing a modal** to users, and when do we navigate them to a separate, new page? And does it matter at all?

Actually, it does. The decision influences users’ flow, their context, their ability to look up details, and with it **error frequency and task completion**. Both options can be disruptive and frustrating — at the wrong time, and at the wrong place.

So we’d better get it right. Well, let’s see how to do just that.

## Modals vs. Dialogs vs. Overlays vs. Lightboxes

While we often speak about a single modal UI component, we often ignore fine, intricate nuances between all the different types of modals. In fact, **not every modal is the same**. Modals, dialogs, overlays, and lightboxes — all sound similar, but they are actually quite different:

[![A 2x2 grid illustrating four types of dialog boxes: nonlightbox modal, nonlightbox nonmodal, lightbox modal, and lightbox nonmodal. Each shows a modal window on a browser interface.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/2-modal-nonmodal-lightbox-nonlightbox-dialog-boxes.jpg)](https://www.nngroup.com/articles/popups/)

Understanding modal vs. nonmodal and lightbox vs. nonlightbox dialog boxes for good UX. (Image source: [Popups by NN/g](https://www.nngroup.com/articles/popups/)) ([Large preview](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/2-modal-nonmodal-lightbox-nonlightbox-dialog-boxes.jpg))

-   **Dialog**  
    A generic term for “conversation” (user ↔ system).
-   **Overlay**  
    A small content panel displayed on top of a page.
-   **Modal**  
    User must interact with overlay + background **disabled**.
-   **Nonmodal**  
    User must interact with overlay + background **enabled**.
-   **Lightbox**  
    Dimmed background to focus attention on the modal.

As Anna Kaley [highlights](https://www.nngroup.com/articles/popups/), most overlays appear at the wrong time, interrupt users during critical tasks, use poor language, and break users’ flow. They are **interruptive by nature**, and typically with a high level of severity without a strong need for that.

[![A diagram categorizing overlay types into modal and non-modal components, with examples like dialogs, navigation drawers, snackbars, and tooltips.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/3-overlay-types-modal-non-modal-components.jpg)](https://miro.medium.com/v2/1*wUxWMpp5GXXvg2fHhQWoWQ.jpeg)

The many sides of modals and overlays. A little tree to understand the differences for UI components. (Image source: [Ryan Neufeld](https://uxplanet.org/modal-vs-page-a-decision-making-framework-34453e911129)) ([Large preview](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/3-overlay-types-modal-non-modal-components.jpg))

Surely users _must_ be slowed down and interrupted if the consequences of their action have a high impact, but for most scenarios **non-modals are much more subtle** and a more friendly option to bring something to the user’s attention. If anything, I always suggest it to be a **default**.

## Modals → For Single, Self-Contained Tasks

As designers, we often dismiss modals as irrelevant and annoying — _and often they are!_ — yet they have their value as well. They can be very helpful to **warn users about potential mistakes** or help them avoid data loss. They can also help perform related actions or drill down into details without interrupting the current state of the page.

But the biggest advantage of modals is that they help users **keep the context** of the current screen. It doesn’t mean just the UI, but also edited input, scrolling position, state of accordions, selection of filters, sorting, and so on.

[![Equity filters panel showing categories and a modal interface to set intraday price change conditions.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/4-nonmodal.png)](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/4-nonmodal.png)

Nonmodal in action: large and small overlays for filters and a modal for customization work well on [Yahoo! Finance](https://finance.yahoo.com/markets/stocks/most-active/). ([Large preview](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/4-nonmodal.png))

At times, users need to **confirm a selection quickly** (e.g., filters as shown above) and then proceed immediately from there. Auto-save can achieve the same, of course, but it’s not always needed or desired. And blocking the UI is often not a good idea.

However, modals aren’t used for any tasks. Typically, we use them for **single, self-contained tasks** where users should jump in, complete a task, and then return to where they were. Unsurprisingly, they do work well for high-priority, short interactions (e.g., alerts, destructive actions, quick confirmations).

**When modals help**:

🚫 Modals are often disruptive, invasive, and confusing.  
🚫 They make it difficult to compare and copy-paste.  
✅ Yet modals allow users to maintain multiple contexts.  
✅ Useful to prevent irreversible errors and data loss.  
✅ Useful if sending users to a new page would be disruptive.

✅ Show a modal only if users will value the disruption.  
✅ By default, prefer non-blocking dialogs (“nonmodals”).  
✅ Allow users to minimize, hide, or restore the dialog later.  
✅ Use a modal to slow users down, e.g., verify complex input.  
✅ Give a way out with “Close”, ESC key, or click outside the box.

## Pages → For Complex, Multi-Step Workflows

Wizards or **tabbed navigation within modals** doesn’t work too well, even in complex enterprise products — there, side panels or drawers typically work better. Troubles start when users need to compare or reference data points — yet modals block this behavior, so they re-open the same page in multiple tabs instead.

[![A modal with the text saying ‘We use too many damn modals. Let us just not’.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/5-modal.jpg)](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/5-modal.jpg)

Perhaps, we use [Too Many Modals](https://modalzmodalzmodalz.com/). A not-very-modal-friendly project by Adrian Egger. ([Large preview](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/5-modal.jpg))

For more complex flows and multi-step processes, **standalone pages work best**. Pages also work better when they demand the user’s full attention, and reference to the previous screen isn’t very helpful. And drawers work for sub-tasks that are too complex for a simple modal, but don’t need a full page navigation.

**When to avoid modals**:

🚫 Avoid modals for **error messages**.  
🚫 Avoid modals for **feature notifications**.  
🚫 Avoid modals for **onboarding experience**.  
🚫 Avoid modals for complex, **lengthy multi-step-tasks**.  
🚫 Avoid **multiple nested modals** and use prev/next instead.  
🚫 Avoid **auto-triggered modals** unless absolutely necessary.

## Avoid Both For Repeated Tasks

In many complex, task-heavy products, users will find themselves performing the same tasks repeatedly, over and over again. There, **both modals and new page navigations add friction** because they interrupt the flow or force users to gather missing data between all the different tabs or views.

Too often, users end up with a broken experience, full of never-ending confirmations, exaggerated warnings, verbose instructions, or just missing reference points. As [Saulius Stebulis mentioned](https://www.linkedin.com/feed/update/urn:li:activity:7417845782365560832/?dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287417848602338902016%2Curn%3Ali%3Aactivity%3A7417845782365560832%29), in these scenarios, **expandable sections** or **in-place editing** often work better — they keep the task anchored to the current screen.

In practice, in many scenarios, users don’t complete their tasks in isolation. They need to look up data, copy-paste values, refine entries in different places, or just review similar records as they work through their tasks.

Overlays and drawers are more helpful in maintaining access to background data during the task. As a result, the context always stays in its place, available for reference or copy-paste. Save modals and page navigation for moments where the interruption genuinely adds value — especially to prevent critical mistakes.

## Modals vs. Pages: A Decision Tree

A while back, Ryan Neufeld put together a [very helpful guide](https://uxplanet.org/modal-vs-page-a-decision-making-framework-34453e911129) to help designers **choose between modals and pages**. It comes with a handy [PNG cheatsheet](https://miro.medium.com/v2/1*JQSGKbw1_iv5b85xYyNL-Q.png) and a [Google Doc template](https://docs.google.com/spreadsheets/d/1fZhXsV-IFWM0ZuMLLc8gG1BXqeQxFkCoYvSJt0gl2II/edit?gid=150659778#gid=150659778) with questions broken down across 7 sections.

It’s lengthy, extremely thorough, but very easy to follow:

[![A decision tree diagram for UI design, asking questions to determine whether to use a Page, Non-Modal Component, Dialog, or Sheet Nav Drawer.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/6-decision-tree-diagram-ui-design.png)](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/6-decision-tree-diagram-ui-design.png)

A flowchart to choose between page vs. modal, with the page being the default, and modals reserved for interruption and focus. Put together by wonderful [Ryan Neufeld](https://uxplanet.org/modal-vs-page-a-decision-making-framework-34453e911129). ([Large preview](https://files.smashing.media/articles/modal-separate-page-ux-decision-tree/6-decision-tree-diagram-ui-design.png))

It might look daunting, but it’s a quite simple **4-step process**:

1.  **Context of the screen**.  
    First, we check if users need to maintain the context of the underlying screen.
2.  **Task complexity and duration**.  
    Simpler, focused, non-distracting tasks could use a modal, but long, complex flows need a page.
3.  **Reference to underlying page**.  
    Then, we check if users often need to refer to data in the background or if the task is a simple confirmation or selection.
4.  **Choosing the right overlay**.  
    Finally, if an overlay is indeed a good option, it guides us to choose between modal or nonmodal (leaning towards a nonmodal).

## Wrapping Up

Whenever possible, avoid blocking the entire UI. Have a dialog floating, partially covering the UI, but allowing navigation, scrolling, and copy-pasting. Or show the contents of the modal as a side drawer. Or use a vertical accordion instead. Or bring users to a separate page if you need to show a lot of detail.

But if you want to boost users’ efficiency and speed, **avoid modals at all costs**. Use them to slow users down, to bundle their attention, to prevent mistakes. As [Therese Fessenden noted](https://www.nngroup.com/articles/modal-nonmodal-dialog/), no one likes to be interrupted, but if you must, make sure it’s absolutely worth the cost.

## Meet “Smart Interface Design Patterns”

You can find a **whole section about modals** and alternatives in [**Smart Interface Design Patterns**](https://smart-interface-design-patterns.com/), our **15h-video course** with 100s of practical examples from real-life projects — with a live UX training later this year. Everything from mega-dropdowns to complex enterprise tables — with 5 new segments added every year. [Jump to a free preview](https://www.youtube.com/watch?v=jhZ3el3n-u0). Use code [**BIRDIE**](https://smart-interface-design-patterns.com/) to **save 15%** off.

[![Smart Interface Design Patterns](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7cc4e1de-6921-474e-a3fb-db4789fc13dd/b4024b60-e627-177d-8bff-28441f810462.jpeg)](https://smart-interface-design-patterns.com/)

Meet [Smart Interface Design Patterns](https://smart-interface-design-patterns.com/), our video course on interface design & UX.

## Useful Resources

-   [Different Types of Popups](https://www.nngroup.com/articles/popups/), by Anna Kaley
-   [Best Practices for Designing UI Modals](https://app.uxcel.com/courses/ui-components-n-patterns/modals--dialogs-best-practices-166), by Uxcel
-   [We Use Too Many Damn Modals: UX Guidelines](https://modalzmodalzmodalz.com/), by Adrian Egger
-   [Modal & Nonmodal Dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/), by Therese Fessenden
-   [Modern Enterprise UI Design: Modal Dialogs](https://medium.com/pulsar/modern-enterprise-ui-design-part-2-modal-dialogs-2ccd3cc33c92), by James Jacobs
-   [Modals in Design Systems](https://designsystems.surf/components/modal)

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)