---
title: "Try these 10 skills—and show off your own"
source: "https://www.figma.com/blog/try-these-10-skills-and-show-off-your-own/"
publishedDate: "2026-08-13"
category: "design"
feedName: "Figma Blog"
---

For the uninitiated, skills are plain-text markdown files that help you work with an agent. Since they take the shape of [ordered instructions or guided prompts](https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/)

, at first glance, they can seem like they’re built more for engineers than designers. But they’re actually perfect for capturing the opinions and judgment calls that every designer carries around.

###### Other skills I’ve built

• [`/image-audit`](https://www.figma.com/community/skill/64144/image-audit?q_id=d63ed9d8-493b-40cd-a189-84c0a127afaa) to check the exportability of every image in a file and drop a report right on the canvas

• [`/shader-starter`](https://www.figma.com/community/skill/64012/shader-starter?q_id=b7dab0c1-dd87-49fc-801e-b17e59b8fcaa) to help people prompt for shaders with fewer details

• [`/make-a-type-scale`](https://www.figma.com/community/skill/62736/make-a-type-scale?q_id=2d65baf8-6e82-4467-89ac-360a50b4ecfd) to build a type scale from selected text and generate the matching font variables

Sometimes, one skill is all it takes to unlock a new workflow. My “aha” moment came while building a motion tutorial: I wrote a skill for [the Figma agent](https://www.figma.com/blog/agent-custom-tools-context-skills/)

to apply my go-to easing curves to the keyframes I was working on, and called it [`/ease-like-miggi`](https://www.figma.com/community/skill/66826/ease-like-miggi). When my team used it in their workflows, their motion designs eased like mine, and I was all in.

Starting today, you can work with the agent to author skills in Figma. Here’s how:

-   Ask the agent to create a skill using a design frame as reference, or one that follows specific steps or guidelines you provide.
-   Preview the skill once the agent drafts it, then put it to work in your chat.
-   Keep iterating as you test it—edit your steps, change its formatting, ask for recommendations, or open the markdown editor directly for manual changes.

I was curious about how other designers use skills when they work with the Figma agent, so I dug into the [Figma Community](https://www.figma.com/community/ai-skills?resource_type=skills). Here are 10 of my favorites, from unifying aesthetics to applying design system principles.

## [1\. Apply an x-ray effect to your images](#_1-apply-an-x-ray-effect-to-your-images)

**Created by:** Adele Ix, freelancer

**Skill:** [`/xray-scan`](https://www.figma.com/community/skill/64791/xray-scan?q_id=18828a49-051a-4b23-8020-00fd035893b1)

**What it does:** Turns a photo or text description into a realistic-looking radiograph that visualizes the internal details of an object. It generates two finishes right away—glowing white on black and soft dark tones on white.

**In Adele’s own words:** “I love making collages, and that really shows in the skill. My favorite part is layering multiple X-rays on top of each other. They’re monochrome with glowing edges, so they stack into really cool collages, and the results aren’t just cool on their own—they also blend together beautifully.”

## [2\. Find where motion is missing](#_2-find-where-motion-is-missing)

**Created by:** Emil Kowalski, Linear

**Skill:** [`/find-animation-opportunities`](https://www.figma.com/community/skill/68151)

**What it does:** Scans designs to identify places that don’t animate but should, and vice versa. The skill addresses questions like “What could be animated here?” or “How do I make this feel more alive?” It proposes what motion to add, where, and with exact values. You can implement these changes yourself in [Figma Motion](https://www.figma.com/motion/), or ask the agent to apply them for you.

**In Emil’s own words:** “This skill works best when it’s pointed at one frame and extra context is added, such as the target persona for the page. You can also use it to avoid over-animating, by asking, ‘Is there anything that shouldn't animate at all?’”

## [3\. Bring motion to a static composition](#_3-bring-motion-to-a-static-composition)

**Created by:** Mallory Dean, Figma

**Skill:** [`/camera-pan-and-zoom`](https://www.figma.com/community/skill/65256/camera-pan-and-zoom?q_id=0d17df9b-ac4c-4f09-b265-98bf7d5b4afc)

**What it does:** Builds a camera rig—a nested layer setup that mimics real camera movement—around selected content, then animates the pan, zoom, or roll like a motion director framing a shot. For example, it can do a grid tour through a set of cards before zooming back out to the full view.

**In Mallory’s own words:** “It’s a very niche skill, but it helps create zoom and pan camera movement without touching any frames in the design.”

## [4\. Catch the details your interface is missing](#_4-catch-the-details-your-interface-is-missing)

**Created by:** Jakub Krehel, Interfere

**Skill:** [`/better-interface`](https://www.figma.com/community/skill/61238/better-interface)

**What it does:** Gives the agent Jakub’s own rulebook for interface craft—specific standards across typography, layout, accessibility, motion, and product writing.

**In Jakub’s own words:** “When you go from using a good product to a great one, you can feel the difference. It’s usually not a single thing, but instead a lot of small things that add up. This skill captures these details and best practices that are often overlooked or not immediately obvious.”

## [5\. Document components automatically](#_5-document-components-automatically)

**Created by:** Mauro Berteri, Itti Digital

**Skill:** [`/component-handoff`](https://www.figma.com/community/skill/67998/component-handoff?q_id=6a288747-4c48-4d0e-a1c7-fc3f6c04aa8c)

**What it does:** Turns a single component or component set into a ready-to-share documentation frame on the canvas. Select one, and it lays out:

-   A header with a name, version, owner, and description
-   A live preview
-   A variant grid
-   A do’s and don’ts section
-   An interaction/states breakdown
-   The component’s full anatomy

**In Mauro’s own words:** “My philosophy is simple—automate the repetitive tasks that used to take me hours, so I can focus on actual creative work. With this skill, I took the exact handoff structure that has proven to work best over my years of experience and packaged it so any designer can adapt it to their own design system in a single click. It’s built to be scalable, predictable, and 100% editable directly on the Figma canvas.”

## [6\. Match colors to tokens](#_6-match-colors-to-tokens)

**Created by:** Ian Guisard, Uber

**Skill:** [`/create-color`](https://www.figma.com/community/skill/71317/create-color)

**What it does:** Turns a selected Figma component into a complete color specification. It maps every visible fill, stroke, and shadow to its design token or style, flags hard-coded colors, and documents the results across variants and states.

**In Ian’s own words:** “One of my favorite examples is a button with several types, states, and color modes. When a component uses layered fills or gradients, it lists each fill in stacking order and each gradient stop with its position, color, and bound variable. Engineers can reproduce the treatment directly from the annotation without inspecting every layer manually.”

![Design specification showing a sliding button component in Primary black and Accent blue styles, with rest, dragging, loading, and completed states. Each example is paired with a spec table detailing container, label, thumb, icon, spinner, gradient, shadow, and color-token treatments.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB1ElEQVR4nHWR3YvaUBDF9///X0R8EFsqWkGx1n1Q1pYGyrrUbdNEzdf9nJuQs8zELPahD4ecO3fmN+eSB+89yrJEHMe4Xq9wzuFyuWC73WK9XiNJEqRpiuVyicFggNFohOl0islkguFwiPF4jP1+L4wQAh6ICEopGcrzHNZa+R4OB2k8n8+yYLfbYTabYbFYYLPZYLVaYT6fy6IoioQhQE7IqYwxIj6zGJplmSzgOkP7tLyExT5NUxRFITN1XXdATsn03vNFD2bPNV7KPSz2/QwRiZqmEf0D7NP0iZXW4lla6/c7rvOZvb/N/xfIjbYHqkpq1nX1+2XiedZ7hHAH7LYQfKjfG4gClPGotIPn5xKhNA659igMe4/SBBQmoDQE4wPq+4TaemSaUJkurbKEn4lFFBvkioc9fsQGX541NkeD/clid7L4ejTYvhg8p66D8k9hAIP+Fg5Zxc9zyJTD/pfC47FCkhtcKovHF4XJU4EPhxKLqMLnqMLHbxU+fS/x9KolKbMkoXVdKk7aPTHgXFokhYVxBOO8+NPViX5nFn9yj1dW5nCpeO6W0DnXek8tEbXWOvnWdd1a50TsifztLrQUQmu9bynUbWia1hHJPPc1TdO+AbMOQxyy0KGoAAAAAElFTkSuQmCC)![Design specification showing a sliding button component in Primary black and Accent blue styles, with rest, dragging, loading, and completed states. Each example is paired with a spec table detailing container, label, thumb, icon, spinner, gradient, shadow, and color-token treatments.](https://cdn.sanity.io/images/599r6htc/regionalized/efe4f75c324a81587d2bda37df7de8eca3c0c8fb-3070x1727.png?rect=1,0,3068,1727&w=1080&h=608&q=75&fit=max&auto=format)

## [7\. Audit your components in one pass](#_7-audit-your-components-in-one-pass)

**Created by:** Amy Ha, Walmart

**Skill:** [`/analyze-components`](https://www.figma.com/community/skill/61009/analyze-components?q_id=119b6462-e475-4255-8a80-46598f880ff1)

**What it does:** Crawls a page and cleans up what it finds. It then catalogs every component with a live preview, and:

-   Flags orphans, duplicates, and naming errors
-   Fixes issues automatically by cloning orphaned components and swapping every instance to the fix
-   Writes the full results into a styled audit document on the canvas

**In Amy’s own words:** “It saves real time. Before, I'd have to right-click, go to the main file, and copy components over manually, or deal with ghost tokens and restyle everything by hand. Now I can do that kind of bulk editing all at once.”

## [8\. Design for every state](#_8-design-for-every-state)

**Created by:** Linda Ojo, Paystack

**Skill:** [`/ui-state-expander`](https://www.figma.com/community/skill/60839/ui-state-expander)

**What it does:** Takes any screen, component, or flow and expands it into the complete set of states. This skill makes sure every state is designed before it ships to engineering, accounting for:

-   Loading states
-   Empty states
-   Error states
-   Disabled states
-   Partial data states
-   Edge cases

It comes back with triggers, copy, transitions, and implementation notes, so a polished happy-path mockup becomes something engineers can build.

**In Linda’s own words:** “I kept seeing the same review comments on every handoff: ‘What happens when this fails?’ and ‘What does empty look like?’ I eventually realized the checklist in my head should be a skill anyone, human or agent, can run.”

## [9\. Give your design a crit](#_9-give-your-design-a-crit)

**Created by:** Joey Primiani, Superfuture

**Skill:** [`/superfuture-design-review`](https://www.figma.com/community/skill/65434/crit?fuid=254408835079701174)

**What it does:** Reviews a file against UX heuristics, accessibility standards, visual hierarchy, interaction design, and product thinking. It then sorts every note into a traffic light system:

-   Red for blockers
-   Yellow for recommended fixes
-   Green for what’s already working

**In Joey’s own words:** “This skill reflects my personal review process, balancing usability, accessibility, product strategy, visual design, and business goals while prioritizing feedback by user impact.”

## [10\. Create a discussion guide for usability testing](#_10-create-a-discussion-guide-for-usability)

**Created by:** Neha Kodi, Figma

**Skill:** [`/usability-test-guide`](https://www.figma.com/community/skill/71690/usability-test-guide)

**What it does:** Provides a ready-to-run discussion guide for usability tests based on Neha’s best practices as a researcher. This skill looks over a design flow intended for usability testing, then adds contextual moderation questions directly on the canvas next to each frame.

**In Neha’s own words:** “Testing and learning is at the heart of my work at Figma, and this skill applies a few practices I don’t compromise on—grounding tasks in a participant’s goal, keeping probes open-ended, and scaling the number of questions to the simplicity or complexity of the design flow.”

Learn more about how to make skills for the Figma agent in the [help center](https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make). The [Figma design agent](https://www.figma.com/blog/the-figma-agent-is-here/)

is available in open beta for Full seat users on Professional, Organization, and Enterprise plans. Collab, Dev, and View seats can use the agent in their drafts. The agent is free to use during beta.