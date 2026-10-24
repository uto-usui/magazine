---
title: "How to put your design system to work with the Figma agent"
source: "https://www.figma.com/blog/how-to-put-your-design-system-to-work-with-the-figma-agent/"
publishedDate: "2026-10-23"
category: "design"
feedName: "Figma Blog"
---

[The Figma agent](https://www.figma.com/blog/3-ways-product-designers-use-the-figma-agent/)

is a powerful collaborator. But like any collaborator, it’s only as valuable as the information you give it. The more specific context it has about your design system and the work at hand, the better equipped it is to make decisions that reflect how your team actually builds. With the right context, the agent can produce outputs that actually look and feel like your product, so you spend less time correcting generic or off-brand work.

Much of that context already lives in your design system, from the components and tokens the agent should use to the documented rules and examples that show how they come together. The challenge is making sure the agent can access all of it when it needs to. Here’s how to give it the full picture.

## [Start with your source of truth](#start-with-your-source-of-truth)

Your design library houses the most basic building blocks the agent needs. Connecting your published library to the agent gives it that foundation. Once it’s connected, the agent can recognize which assets are approved by your team and use those components and tokens in its output.

Give the Figma agent access to your library by opening an agent chat, selecting “Libraries” in the prompt box, and choosing the published library you want to work from for this project.

Say your team is working on a new checkout flow. If you ask the agent to build an order summary card, it can pull from the components and variables already defined in your library. It might use your existing `Card/OrderSummary/Default` component, the approved button variant, and your spacing and color variables to assemble the design, instead of creating a new card from scratch with its own styling and structure.

When you want the Figma agent to change a specific asset in a specific part of your product, like replacing one button on a screen, you can `@-`mention the component or token you want it to use.

The more clearly your library defines its components and how they behave, the more useful it is to the agent. [That means](https://help.figma.com/hc/en-us/articles/38978644498199-AI-workflows-collection-Refine-your-components-and-variables-for-the-Figma-agent#h_01KKFV30GE7M7PH1YPBCNXG07W) using meaningful component names, defining properties and variants, applying variables, and building reusable patterns that show how smaller pieces fit together. Those details give the agent stronger signals about what each asset is for and how it’s meant to behave.

## [Make your team’s judgment explicit with guidelines](#make-your-team-s-judgment-explicit-with-guidelines)

###### What belongs in guidelines?

→ Rules the Figma agent should follow consistently

→ Exceptions to those rules

→ Mistakes to avoid and what to do instead

→ How to choose between similar components, variants, or patterns

Once the agent has your library, it knows which building blocks are available. But there are decisions that aren’t obvious from the library itself, like when to use certain components or when there are exceptions to that usage. [Guidelines](https://help.figma.com/hc/en-us/articles/43509372175511-Add-guidelines-files-to-a-design-library)—written instructions files attached to your published design library—are where you encode that judgment. They’re included automatically for any prompt with a library enabled, giving the agent guidance to follow when creating new designs without someone restating it each time.

Guidelines work best when the agent creates designs from scratch. We’re working to improve how consistently it applies them when editing existing designs.

To add guidelines, open your design library. From there, go to Library → Manage guidelines, upload the file containing your guidelines, and click Apply changes.

For example, say your library includes both primary and secondary buttons, but your team always uses a primary button for the “Place order” CTA on a checkout screen. You can put that rule in a guideline so the agent knows which one to choose in that situation. You can also specify a secondary button for actions such as “Back” so the agent has a concrete rule to follow. Those guidelines stay attached to the library, allowing your team to reuse that guidance when creating new designs with the agent.

## [Show the Figma agent your system in practice](#show-the-figma-agent-your-system-in-practice)

###### The tl;dr on types of context for the Figma agent:

**Guidelines** are standing rules for how your team uses your design library. They stay attached to the library and apply across new work.

**Library examples** show how your team puts components and patterns together in practice.

**Add context** gives the Figma agent references that matter to the task at hand, like a specific Figma file or frame.

**Skills** capture a repeatable process you want the Figma agent to follow.

Giving the agent an example of what work should look like can be more powerful than explaining it through prompts. Just as you might give a coworker an existing checkout screen as a starting point, you can give the agent a design to adapt.

`Examples` and `_example` are case-sensitive. For component sets, apply the naming or page placement to the parent set, not an individual variant. See the [Material 3 Design Kit](https://www.figma.com/community/file/1035203688168086460/material-3-design-kit) for a reference.

To add a design to a prompt, click + → Attach Figma files and select or paste the relevant design.

For patterns you want the agent to reuse across future work, publish complete designs as components on an `Examples` page, or add `_example` to the end of their names. If the example is specific to the work you’re doing now but not necessarily a pattern you’ll repeat, add it as context to the current prompt. You can also paste a frame or image directly into the chat, or ask the agent to turn a screenshot into an editable design.

For example, you might be adding a shipping address form to the checkout flow. Your library provides the form fields and checkboxes. But those components alone don’t communicate how your team puts shipping address forms together, like which fields share a row or how optional fields such as apartment numbers are presented. An example from a previous design can show how your team groups fields and handles spacing. That gives the agent a starting point it can adapt for this checkout experience.

## [Turn recurring instructions into skills](#turn-recurring-instructions-into-skills)

[To create a skill](https://help.figma.com/hc/en-us/articles/40283639496599-Create-and-manage-custom-skills-in-Figma), tell the Figma agent what you want the skill to do and give it the steps or instructions it should follow. You can then preview and edit the skill, including directly in the markdown editor.

You can also use skills [from the Figma Community](https://www.figma.com/blog/try-these-10-skills-and-show-off-your-own/) or share your own for others to use.

Many of us find ourselves repeating the same processes again and again, whether that’s auditing your screens for accessibility standards or running frequent checks to make sure you’re using the most up-to-date components. Now, instead of rewriting the same instructions each time, you can turn that process into [a skill](https://www.figma.com/blog/try-these-10-skills-and-show-off-your-own/)

the agent can reuse. Skills are sets of instructions that you teach the agent once and can trigger in any chat with a forward slash `(/)`. Rather than rewriting the same prompt or walking through the same process each time, you can publish a skill for your team or organization to use.

For example, a `/design-system-audit` skill could check selected screens against your libraries and flag detached instances, hardcoded values, misused components, and accessibility gaps. An `/analyze-components` skill could review your components for duplicates, naming errors, and components that have lost their connection to the library. Both can flag potential issues and recommend a path forward, which your team can ask the agent to carry out or handle themselves.

## [Learn from the Figma agent’s output](#learn-from-the-figma-agent-s-output)

Ask the Figma agent to fix an error on the canvas by telling it what to change in a prompt or `@-`mention the exact component or token you want it to use.

Like any time you’re working with AI, it’s still important to double check the output. When you’re reviewing its work, if you spot an issue, you can use the agent to correct those mistakes immediately, right on the canvas. If you notice it consistently makes the same mistake, that’s a signal that you might need to go back and update your guidelines, revisit your design library, or give it better examples to work from.

The Figma agent is available for Full seat users on Professional, Organization, Enterprise, and some Education plans, and limited availability on the Starter plan. Collab, Dev, and View seats can use the agent in their drafts.

Learn more about the Figma agent in our [help center.](https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files)