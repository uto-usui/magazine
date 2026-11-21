---
title: "Workflow lab: Turning context into a plan with Specs and the Figma agent"
source: "https://www.figma.com/blog/workflow-lab-specs-and-the-figma-agent/"
publishedDate: "2026-11-20"
category: "design"
feedName: "Figma Blog"
---

_Welcome to Workflow lab, where we present [a sample workflow](https://www.figma.com/blog/workflow-lab-build-with-code-on-the-canvas-using-the-figma-agent-and-code-layers/)_

_using Figma products and tools._

When teams are going from prototype to production faster than ever, it’s easy for important context to get lost along the way. Written requirements, design details, and engineering guidance are critical to making sure teams are sprinting toward the right outcomes, but these inputs often end up scattered across separate documents and links.

Now, [Specs](https://www.figma.com/blog/introducing-figma-specs/)

provides a shared container for context right on the canvas, alongside the work it describes, where teammates and agents can contribute together. In this workflow example, an engineer uses Specs and

[the Figma agent

![World Peas website design in Figma beside an agent conversation showing a request to replace the main image with a close-up mushroom photograph.](https://cdn.sanity.io/images/599r6htc/regionalized/e45f20141c28283bd8a1a0a1889c5f8e9befd922-7680x4320.png?w=7680&h=4320&q=75&fit=crop&crop=focalpoint&auto=format)

### 6 easy ways to use the Figma agent right now

From making designs more expressive and automating busywork, to exploring more possibilities on the canvas, here are six ways to push designers further with the Figma agent.



](https://www.figma.com/blog/6-easy-ways-to-use-the-figma-agent-right-now/)

to turn sprawling context into a plan their coding agent can build from.

[![Agent prompt referencing Pickup UI Guidelines to create UI components, alongside button variants, labels, icons, and a Pickup logo.](https://cdn.sanity.io/images/599r6htc/regionalized/a2750e9d408e484e522568848450786c3ec1beb0-7680x4320.png?w=7680&h=4320&q=75&fit=max&auto=format)](https://www.figma.com/blog/introducing-figma-specs/)

## [The problem](#the-problem)

The team at Pickup, a fictional marketplace shopping app, is scoping a new delivery feature. The lead engineer is taking stock of the designs and technical decisions they’ll need to build it: There’s a PRD, a diagram in FigJam, and a Figma file containing designs, [code layers](https://www.figma.com/blog/design-together-with-code-layers/)

, and components on the canvas. Across all of these sources, it’s not clear which details are missing or who still needs to give input. The engineer needs to connect the dots.

[A code layer](https://www.figma.com/blog/code-on-the-figma-canvas/) is an interactive prototype on the canvas backed by running code.

## [Starting with the data](#starting-with-the-data)

The engineer combs through the PRD and notices that the team plans to pilot the new delivery feature in a single city, but haven’t identified which one yet. The engineer doesn’t want to start implementing code until they know which city’s map they’re building for, so they decide to look into where Pickup’s demand is highest based on the app’s usage data. That data lives in Hex, the team’s data analytics platform, but the engineer wants designers and other teammates to be able to view and react to the data in a shared space.

[Connectors](https://help.figma.com/hc/en-us/articles/35440096186007-Use-verified-partner-MCP-connectors-with-the-Figma-agent-and-Figma-Make) let the agent access information from a tool outside Figma.

The engineer turns to the Figma agent to help add the data to the canvas in the form of a spec. They open the agent, add the Hex connector to the conversation, and prompt: `Go find where we have the most usage of Pickup and create a spec breaking that down. Also, update this map code layer to show usage data for the top cities.`

![A Pickup delivery PRD and a mobile map prototype displayed side by side on the Figma canvas.](https://cdn.sanity.io/images/599r6htc/regionalized/5c786b897160a067df7bfa5e6db0cba7f235c02c-5760x4104.png?rect=2,0,5756,4104&w=1080&h=770&q=75&fit=max&auto=format)

The product team’s PRD sits in a spec beside a map code layer, keeping the delivery requirements alongside the working prototype.

The agent produces a spec that contains a table with app usage and order volume by city, along with code layers showing maps for each of the top four cities. The engineer and their collaborators review the Hex data and the screens on the canvas. The team decides to launch in Bengaluru, India, the city that clearly has the highest density of customers and demand.

![A Pickup usage report with a city comparison table and chart sits beside four mobile map code layers on the Figma canvas.](https://cdn.sanity.io/images/599r6htc/regionalized/84e0e3eded19ba6847fddf60666c0c9f11028a4b-5760x4104.png?rect=2,0,5756,4104&w=1080&h=770&q=75&fit=max&auto=format)

The Figma agent creates a usage report and four map code layers to help the team compare potential launch cities.

## [Gathering context on the canvas](#gathering-context-on-the-canvas)

The engineer opens the team’s technical spec. It explains how the app will store information about deliveries, how the team will make the feature available to customers, and how they’ll monitor it for problems after launch. They then drag in an existing FigJam diagram showing the delivery process and what the seller, buyer, and driver each do.

![A spec titled “Delivery Data & System Architecture” contains a flow diagram above sections covering scope, checkout, and pricing.](https://cdn.sanity.io/images/599r6htc/regionalized/c626104aad9e924603386edab41f18b80dbeb53a-7680x5280.png?rect=3,0,7675,5280&w=1080&h=743&q=75&fit=max&auto=format)

The engineer embeds the delivery lifecycle diagram in the technical spec, bringing the visual explanation together with the written requirements.

Elsewhere on the canvas, designers are reviewing the final screens. The team has added annotations on the frames to call out key details, and both design and engineering approved the designs.

![Three Pickup design frames show the marketplace home screen, map, and product details, with colored annotations attached to specific elements.](https://cdn.sanity.io/images/599r6htc/regionalized/4ab0ed558e84f9ff3c963132974fbd3d55e766e5-1666x1394.png?rect=1,0,1665,1394&w=1080&h=904&q=75&fit=max&auto=format)

The team specifies when to show the delivery icon and reminds developers to display prices in the local currency.

The engineer also includes an interactive version of the Bengaluru map as a code layer so the agent can see how it should work—for example, how nearby items group together and how they animate as someone moves around the map.

Lastly, the engineer reviews a new component from the design systems team. A code layer shows how the component works, and a written spec beside it explains when to use it instead of the existing component.

The engineer selects the technical spec, annotated design frames, interactive map code layer, new component, and design system guidance on the canvas, then opens the Figma agent. They prompt the team’s previously configured `build-implementation-plan` [skill](https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/)—a reusable set of instructions for the agent. The agent creates a new spec that brings those inputs together into a plan for a coding agent to build the feature, including how it should look and behave.

![The Figma canvas shows a technical spec with an embedded diagram, annotated design frames, a map code layer, and address component guidance. The agent panel is open on the left.](https://cdn.sanity.io/images/599r6htc/regionalized/637e317329aeee9c0e9e1ad6a3dca262ab606b82-5760x4104.png?rect=2,0,5756,4104&w=1080&h=770&q=75&fit=max&auto=format)

The engineer brings together the technical spec, annotated designs, map interactions, and design system guidance before asking the Figma agent to create an implementation plan.

## [Reviewing the plan and handing it off](#reviewing-the-plan-and-handing-it-off)

Before handing the plan off to a coding agent, the engineer reviews it to make sure the details are right, expanding the spec to its full width. They check that the spec includes the team’s design system, testing and observability requirements, rollout details, and a table outlining what needs to be done to build and ship the feature, along with references back to the specs, designs, and code layers it draws from.

![A spec titled “Pickup Delivery: Implementation Plan” includes sections for context, key details, design system adherence, and testing, with a code example.](https://cdn.sanity.io/images/599r6htc/regionalized/3c63ae537ad5394b5dcf0d7ac88ed7c1a874676c-7680x5280.png?rect=3,0,7675,5280&w=1080&h=743&q=75&fit=max&auto=format)

The agent creates a spec with an implementation plan for the engineer to review before handing it to a coding agent.

The engineer spots a detail in the spec that isn’t quite right, leaves a comment on the spec with the problem, then prompts the Figma agent: `Read my comment and reply to it with a solution.` The agent comments back with an edit for the engineer to review. Reading on, the engineer notices another detail that needs adjustment, but this one requires input from a designer on the team, who the engineer tags in a comment. The designer receives a notification, jumps into the spec, and makes the change in real time.

![Highlighted text in the Pickup implementation plan has an open comment thread asking someone to take a look, with a reply beneath it.](https://cdn.sanity.io/images/599r6htc/regionalized/4fd25831cc9802be648b8da0eb13520581143730-8908x8448.png?rect=0,1,8908,8446&w=1080&h=1024&q=75&fit=max&auto=format)

The engineer mentions a teammate in a comment to check a detail in the generated plan.

## [The path to production](#the-path-to-production)

Clicking on the spec, the engineer copies a link to share it and opens Codex. They paste the link and prompt: `Implement this feature`. [Through Figma’s MCP](https://www.figma.com/blog/the-tldr-on-mcp/)

, Codex can read not just the spec, but also the annotated design frames, code layers, design system components, and other context that went into the plan—all with just one link. All of that context helps Codex build the delivery feature, and once implemented, the team can review and test the feature before rolling it out to users.

Specs is in open beta on all plans and available on web, desktop, and mobile. [Get started here](https://www.figma.com/specs/), and learn more in the [help center](https://help.figma.com/hc/en-us/articles/44049066011671).