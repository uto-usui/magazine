---
title: "Workflow lab: Expanding the canvas with Figma MCP"
source: "https://www.figma.com/blog/workflow-lab-expanding-the-canvas-with-figma-mcp/"
publishedDate: "2026-04-30"
category: "design"
feedName: "Figma Blog"
---

###### Workflow fact sheet:

**Figma products:** Figma Design, Dev Mode

**Tools:** Figma MCP server, use\_figma, generate\_figma\_design

**Skills:** /sync-figma-token

**Team:** Designer and developer

**Question to solve:** What if the canvas could interact with everything happening in the build?

_Welcome to Workflow Lab, where we present a [sample workflow](https://www.figma.com/blog/workflow-lab-ai-image-tooling/)_

_using Figma products and tools._

The team at Astra, a fictional AI-powered video creation and editing platform, ships features weekly using agentic coding tools. This speed is an asset, but it comes with a downside—decisions multiply in code that never touch the canvas, creating blind spots for design. At best, this widens the gap between intent and implementation. At worst, incomplete solutions ship when the team can't apply their expertise to the full experience.

In this example, a simple export video flow sets the initial direction, but as it evolves in code, it quickly becomes more complex. Follow along as a designer and developer at Astra use the [**Figma MCP server**](https://www.figma.com/blog/the-tldr-on-mcp/)

to bring that evolving reality back to the canvas—reviewing, iterating, and making decisions across the full product, not just the initial flow.

## [The problem](#the-problem)

The designer lays out an export video flow: The user selects a sequence, chooses a format, confirms settings, and exports. This is enough to set direction and start building. But at Astra's pace, new states begin to emerge as the build progresses: encoding errors, render status, empty selections, and unsupported format edge cases. These aren't states the designer missed or forgot to design; they're issues that became clear once the feature hit real code and data. Every one of them is a design decision waiting to be made.

When the canvas only captures part of the picture, designers can only work on part of the product. But what if the canvas could interact with the build? With Figma MCP, an [agent can read code and write to the canvas](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/)

, expanding the designer's workspace to include decisions that were previously invisible.

## [The canvas expands](#the-canvas-expands)

The agent reads the coded export flow and identifies every state the developer handled. For each one, it generates an editable, designable frame on the canvas using Astra's design system components via [`use_figma`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#use_figma). And the designer's canvas goes from four frames to fourteen.

###### Zoom out

Designers can now use Figma MCP to bring the full reality of the build onto the canvas. Instead of a feedback loop of tasks or tickets, the workflow becomes a conversation between design and code with the agent connecting the two.

The encoding error state has no recovery path, just a red message, so the designer adds guidance: what went wrong, what to try next, and how to find a way back. The loading state during render is a spinner with no context, so the designer adds a progress indicator and time estimate. The empty selection state is blank, so the designer gives it copy and personality to drive feature adoption.

The canvas gives immediate visibility into states that emerge as the build progresses, surfacing new areas where designers can apply their expertise. Instead of uncovering these moments through time-consuming discovery sessions, this workflow shortens the feedback loop, shifting time away from requirements discussions and toward designing and building actual features.

![A side-by-side visual diff comparing the Export dialog in Figma Design against its coded counterpart, with a findings panel below surfacing eight discrepancies across high, medium, and low severity—including a larger modal title, an added "Post share link" button, a stripped settings panel surface, and a demoted settings header.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwElEQVR4nD2TzU9TaRSH71/FfkzAtrIx029WTtSFMGoTURHQlg8hdFpoETGIEGgpMmW8vZ1bWlIRirbFxFnMihjdMJkitfRDuEg/TB5zLw2L3+K85+Q5Oed3XqGlpQWdXo/RZMJstmCxWLBarNhsdjo6OrTYYDCg1+kwGU1YbTasVjVv02S3d2C322lvb0dlCRcu/ML1a7/Rc/8OTtdDXCNjjI5PMh9YYi0eRxRfMTg4SFfnDR703GVoaIARtwe3b4rn84tE/5aJx+N4vV6tsaBra+V211WGHjpwj7kY8U8yubDEVvY9B/k8e3t7BAMBeu46cD64hXu0H7ffx8SLReTXW/z3f45isUgsFtMmFHS6Vhw3rzLsdDD+hxP/0wlmAwukd3Y4PDwkl9vn5XKI3h4HA32/4xntxf/Ew/TcLImNDb4cHHB8fMT6+rq2CuHixVY6O6/Q39uFd6yP2aduAnPPSL/bPgeGQkt0d9/kXvd1Hg/c4dnkCHMzftbjMvv7OY6OjkgkmkCDQY9roJ/A4gziX0vEpDAJWeL9ToZPnz7zz4d/mZ6e4ZGzn6kpD6HgLGI4SPTVCltvXrO7u8vHj58JBle4fPlXdWQdw8OPWQ2HkaQIkiQRjUaRZRlZXiMUWsXt9uPxjrO8HCISETWjIqKIFBGJSlHCf4q4XKO0tekRVLt9Ph/JZJLt7W3S6TSZTOZcb9+m2dxMkUqltDib3SGbzZJJZ0inUrzb2mQjmWRiws+lS+0IRqOR1fCq5mY+n6dQOKRYLFEulymXK1QqZyqXStpOVamullQVCpQKXznYzxGJRDCZTAhms5m1WIxyqYyifOfk5JRqtU69/oNG40z1Wp3q6SmKcqLprKZGrVanUW+gKIpmivoJBIvZTCIe51ul0iz+TvW02oQ2zqD1RhOocHysnDetNfPqu3o2KvAnwvWOPOPmXPsAAAAASUVORK5CYII=)![A side-by-side visual diff comparing the Export dialog in Figma Design against its coded counterpart, with a findings panel below surfacing eight discrepancies across high, medium, and low severity—including a larger modal title, an added "Post share link" button, a stripped settings panel surface, and a demoted settings header.](https://cdn.sanity.io/images/599r6htc/regionalized/2700987198b97be2fc753a14c3afa1914ae7893d-2160x1215.png?rect=1,0,2158,1215&w=1080&h=608&q=75&fit=max&auto=format)

The coded version and the original design, placed side by side on the Figma canvas.

## [Something looks different](#something-looks-different)

While reviewing the states, the designer notices the export confirmation screen looks different in code than what’s in Figma. Color values are slightly off and the spacing is tighter. Is it using the design system? There appears to be some drift between Figma and code. The designer puts the agent to work to remove any ambiguity. Using the [`/sync-figma-token`](https://github.com/firebenders/sync-figma-token-skill/tree/main) skill with the [`use_figma`](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/)

tool, the agent compares tokens used in code against variables in the Figma library to detect drift and sync values.

Now there’s token parity, but not everything is resolved. A structural problem comes into focus: The button hierarchy has shifted, the applied font styles are not right, and a secondary button was added. Rather than squinting at a deployed build and a Figma frame side by side, annotating screenshots, or describing necessary changes in a dev ticket, the designer asks the agent to document it directly. The agent [replicates the coded version as a Figma frame](https://www.figma.com/blog/introducing-codex-to-figma/)

with the [`generate_figma_design`](https://developers.figma.com/docs/figma-mcp-server/skill-figma-generate-design/#parallel-workflow-with-generate_figma_design-web-apps-only) tool, places it next to the original design, and annotates the differences: the hierarchy shift, the type styles, the new action.

###### Zoom out

The artifact isn't a bug report. It's a shared reference for a design conversation.

Some of these changes—like the secondary action—may be improvements the developer decided to make in context. Some may be unintentional oversights. Now the designer and developer can have a specific conversation about each one. Should the design update to match? Should the code revert? Should they meet in the middle?

Through this more integrated workflow, questions like "Why doesn't it match the design?" evolve from an alignment exercise to collaborative refinement.

## [A moment worth redesigning](#a-moment-worth-redesigning)

The export flow works. The build is solid. But looking at the full state map on the canvas, the designer notices something: The export success screen is purely functional. "Export complete. View file." Done.

###### Zoom out

This is what the canvas is for: exploration without commitment, in a space where nothing is too precious.

It ships, it works. But on the canvas, the designer might focus on something more nuanced: What if this is a missed opportunity to have a bigger brand moment? Astra knows that they're building a dedicated community because their product is not only easy but fun to use. Finding the right brand moments are critical to building that creative connection. The designer believes that exporting a final sequence is a meaningful moment to celebrate.

In code, every direction is an engineering investment. Hard to throw away, easy to settle on "good enough." On the canvas, ideas stay cheap. You can explore without commitment, throw away freely, and only carry forward what earns it.

The developer quickly adds a playful transition when the render finishes that shows a preview of the exported clip. The motion works but the brand tone isn't fully captured. So the developer sends the key animation states to the canvas, and the designer takes it from there. They create a version that's bold and expressive, a version that's minimal and elegant, and a version that's unexpected and delightful. Three directions in less than an hour, none of which are bound to tokens or committed to code.

The designer decides the bold and expressive option is right for the moment. Now it's ready for the design system: tokens, components, and specs.

![Four design explorations for an export success state, showing different visual treatments—Bold 05 with a centered checkmark and particle burst, Bold 06 with a corner-pinned checkmark, Minimal with a compact dialog, and Movie Poster with a full-bleed thumbnail—all confirming a completed export of "Mountain Biking in Marin.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACMElEQVR4nH2SW4/URhBG569kyTJju292t9uXGY/Hc2GuO5slziYBoYTsapECSCABgkfe+c8H2SsB88JDqdR9+lJV3zeQSiLlaSh1Gj9l6pQPrCtxLiNJUuI4IY4d1ma4fn98n23HXc+7fMoLnPXEsUUpzaBprplWe4qiJk1zvK8oy0fMZhcsFy3z+Z9U1YE8n/Y8y2rG4w3N7Mhy8QfNrKWarPG+RBvD4HJ3Qz1tsbYiNo4kmVBka7bLI+3xCcfdLdWkJUnGffVJMmVcbDmsL2mPT9mv/6UsDhjjkVIx2CxafLphFCSEgUBElkRPWFZrrrYt68U1SbJiNDKEoUREKS6esplt+W3bsqh/R+ua4VAQhiEDZ2uUKghCRSQEUhqUcKRJTZnvSN0CKT1BIBFCIoVBS4+3c8p8i7MNkXAEgSCKIgZCGoTQ/WGlFFoblIoxOsWYHGPSft0NvGP3PEFrjzEZWrueS6nvW5ZSfJPcGINznnI85dF6y+FwyXqzo5rU+DTD2rQXZlI1zFc7prMlWV7ifad62n82+NFDxsS9hVarDXd3t7x/95aX/7/gsN+T+XvrpGnBZnfBs+f/8fivJ1TNnDTLsdaitf7+YNduF13rs+mYl3d/8/njCz68/ofNqiEKg37oUSSoJzlPr/c8vjqQFhNGYcRweE4UhacVds7vLjZVxrtXz/jy+S2f3tywnFecn//KaPiQYPQQbwIOc8+qLhHKcvbgnLOzXwiCEV8BC/5suWC643wAAAAASUVORK5CYII=)![Four design explorations for an export success state, showing different visual treatments—Bold 05 with a centered checkmark and particle burst, Bold 06 with a corner-pinned checkmark, Minimal with a compact dialog, and Movie Poster with a full-bleed thumbnail—all confirming a completed export of "Mountain Biking in Marin.](https://cdn.sanity.io/images/599r6htc/regionalized/e2f4ebeed2115b8e6636039c70cbc04af2b054ed-2160x1215.png?rect=1,0,2158,1215&w=1080&h=608&q=75&fit=max&auto=format)

The designer explores new animation styles and keyframe directions.

## [The full picture](#the-full-picture)

###### Zoom out

With Figma MCP, the canvas expands into territory it couldn't reach before.

Let’s follow the thread from canvas to code and back. The designer started with four frames but by the end of the sprint:

-   Fourteen states landed on the canvas, and the designer pushed each one further.
-   The team documented and resolved drift between design and code through a shared visual artifact.
-   By exploring freely on the canvas before committing to code, the team turned a functional success screen into an expressive brand moment.

None of this required the designer to learn the codebase. None of it required the developer to learn Figma. The agent translated between the two, and the designer's judgment was applied at every step.

## [Path to production](#path-to-production)

From here, the refined states move back into [**Dev Mode**](https://www.figma.com/blog/why-devs-should-play-an-active-role-in-design/)

as updated specs—a direct handoff that doesn't require a separate review cycle. The visual-diff artifact from the confirmation screen comparison becomes the checklist for the next design-dev sync, turning what could have been a back-and-forth into a single focused conversation. The expressive success screen direction that earned its place moves into the design system as tokens, components, and specs. And the loop between design and code stays continuous—the canvas now reflects the full product, not just where it started.

## [A different kind of source of truth](#a-different-kind-of-source-of-truth)

The source of truth used to be a single artifact—canvas, codebase, PRD. But that framing breaks down the moment a team moves fast enough for all three to diverge. What the Figma MCP server makes possible is something different: not a single artifact everyone defers to, but a system of artifacts that stay connected. The canvas talks to the code. The code writes back to the canvas. The designer's judgment moves through both. That's a different kind of source of truth—not a file, but a living connection between the canvas, the codebase, and the team building with both.

To see a similar workflow demoed live, [watch the recording](https://www.youtube.com/live/R9mBpeiCMM0) of our livestream event. Read [our guide](https://help.figma.com/hc/en-us/articles/32132100833559) to the Figma MCP server for an overview of supported clients and capabilities, and dive into our developer docs for detailed instructions on using MCP tools like [`generate_figma_design`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#generate_figma_design) and [`use_figma`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#use_figma).