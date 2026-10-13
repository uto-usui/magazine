---
title: "How to lighten design system upkeep with the Figma agent"
source: "https://www.figma.com/blog/figma-agent-and-design-systems/"
publishedDate: "2026-10-06"
category: "design"
feedName: "Figma Blog"
---

Every design system depends on maintenance that’s necessary but easy to put off, like cleaning up naming, checking token usage, updating stale docs, and finding where your product has drifted from the library. As teams move faster than ever, it’s hard to see where designs have fallen out of sync with the system. Output from an agent is only as good [as the context it’s given](https://www.figma.com/blog/why-you-should-care-about-design-context/)

, and much of that context lives in your design system.

Now, [the Figma agent](https://www.figma.com/blog/the-figma-agent-is-here/)

can take design system maintenance off your plate—and even automatically apply your system’s rules and conventions when creating new work—so you can spend your time on the decisions that shape, rather than service, your system. Here’s where and how to put our agent to work.

## [Use the agent to automate documentation](#use-the-agent-to-automate-documentation)

Design system documentation serves different audiences across product development, from designers trying to choose the right component to developers looking for what they need for handoff. At its core, documentation clarifies how the system is meant to be used, which allows teams to apply it consistently and maintain a high quality bar. The agent can help you create that documentation and update it as your design system evolves.

### [Document how components work](#document-how-components-work)

Documentation is one of the easiest things to fall behind on. Once you’ve settled on how a component should work, the agent can help draft documentation that explains how it should be used and behave.

Ask the agent to:

-   Spell out do’s and dont’s for using a component
-   Show visual examples of different variants, properties, and configurations
-   Recommend component APIs for handoff, like merging booleans into enums, dropping unnecessary hover states, or promoting buried child properties

For example, Uber Product Designer Ian Guisard [uses the agent](https://www.figma.com/blog/3-ways-product-designers-use-the-figma-agent/) and a [set of skills](https://www.figma.com/blog/try-these-10-skills-and-show-off-your-own/)

he built to document components across Uber’s seven platforms. Instead of manually writing specs for each component, designers can run [`/create-api`](https://www.figma.com/community/skill/71319) to create a clear, organized, and developer-friendly description of how a component should work and `/create-color` to create a color spec showing which design token each part uses across variants and states.

That gives developers the details they need without having to dig through the Figma file or come back to designers for clarification. Automating parts of the documentation work helps the team focus on improving the system rather than spending valuable time updating every spec by hand.

## [Keep product work aligned with your design system](#keep-product-work-aligned-with-your-design-system)

As product building gets faster it gets harder to see where designs have fallen out of sync with the system. The agent can help find those gaps and update designs to use current components and tokens before inconsistencies spread.

### [Audit designs for adherence](#audit-designs-for-adherence)

Checking designs against your design system can be time consuming. A single screen can use components and tokens from several libraries, leaving you to trace where each one comes from. The agent can help point out those instances so you don’t have to do a manual review.

Ask the agent to:

-   Create an inventory of the components and tokens used in a screen
-   Map those components and tokens to their respective libraries

For example, say a designer building a checkout screen creates a “Save for later” button from scratch rather than using the design system’s existing button component. The agent can check that screen against the design library, flag that the button duplicates the system’s existing `Button/Secondary` component, and point out if it’s using a hard-coded color or spacing value instead of the current token. That gives the designer a chance to swap in the production component and token before the design moves forward.

### [Match your design system](#match-your-design-system)

Both existing product screens and AI-generated designs can fall out of sync with product components and tokens. [Updating that work](https://www.figma.com/blog/workflow-lab-staying-in-the-flow-with-the-figma-agent/) to match your design system can mean replacing parts by hand. The agent can help.

Ask the agent to:

-   Replace a specific component or token across a design in bulk by @-mentioning it in your prompt
-   Ask the agent to find and replace components from a specific library, then review the changes

At Granola, the AI notetaking app, Product Designer Paavan Buddhdev uses the Figma Chrome extension to bring an existing screen from the Granola app into Figma. When he does, buttons and other elements become disconnected from Granola’s design system. Instead of replacing each one by hand, he’s able to select an imported button and ask the agent to swap in the matching button from the design system.

#### [Give the agent context to use your system as intended](#give-the-agent-context-to-use-your-system-as)

Once you’ve brought existing work back onto the system, the next question is how to keep new work on-system as it gets created. [You can add guidelines](https://help.figma.com/hc/en-us/articles/43509372175511https:/help.figma.com/articles/43509372175511) to a published library to capture the intent, rules, and patterns behind your design system for the agent to use. Because that context is included automatically when the library is attached, designers don’t have to spell out the same instructions in every prompt.

## [Let the agent help with cleanup](#let-the-agent-help-with-cleanup)

Small inconsistencies in a design system pile up quickly, are tedious to fix by hand, and can erode trust in the system, making product builders more likely to work around it instead of use it. The agent can take on some of that upkeep, from applying naming changes across a library to checking whether components are using the tokens they should.

### [Standardize naming across your system](#standardize-naming-across-your-system)

Renaming one component is easy. Cleaning up an entire library where the same state is called `hover`, `hovered`, and `mouse-over` is a different job entirely. You may also have generically named assets that don’t clearly communicate what they’re for. The agent can help you find those inconsistencies and apply your naming decisions across the system.

Ask the agent to:

-   Take stock of the names currently used across your system
-   Surface names that have drifted apart, like `small` and `sm`, then reconcile them to a single convention, like `small`
-   Apply a naming decision you’ve already made across the whole library at once
-   Replace generic asset names like `icon_1` or `icon_2` with descriptive names like `linkedin_icon` or `tiktok_icon`.
-   Create a record of what was renamed so those changes can be carried into code

### [Check that components are using design tokens](#check-that-components-are-using-design-tokens)

As a library grows, it gets harder to know whether every component is still using the right tokens. The agent can inspect a component’s values and check whether they’re tied to design tokens, making it easier to spot where something is off.

Ask the agent to:

-   Check token adoption across components
-   Create annotations that show which tokens a component is using

For example, it can surface where one button component uses `8 px` for icon spacing instead of the shared spacing token used by the rest of the library. If your team wants to run that same check regularly, you can use [a skill](https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/)

to package the steps into a repeatable workflow.

The Figma agent is available for Full seat users on Professional, Organization, Enterprise, and some Education plans, and [limited availability](https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files) on the Starter plan. Collab, Dev, and View seats can use the agent in their drafts.

Learn more about the Figma agent in our [help center](https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files).