---
title: "Workflow lab: AI image tooling and interactive prototyping in Figma"
source: "https://www.figma.com/blog/workflow-lab-ai-image-tooling/"
publishedDate: "2026-02-27"
category: "design"
feedName: "Figma Blog"
---

###### Workflow fact sheet:

**Figma products:** Figma Design, Figma Make, FigJam

**Tools:** Glass effect, Remove background, Vectorize, Cut tool, Inline variables search, Bounding boxes, Variables, Erase object, Expand image, Figma Make embed

**Team:** Designer, content designer, product manager, growth analyst, engineer

**Question to solve:** What drives signups?

_Welcome to Workflow Lab, where we present a sample workflow using Figma products and tools._

Figuring out a new workflow means connecting the dots between different tools and teams. Follow along as the design team at Trivet—a cooking and recipe app—goes from problem to production in a fast-moving sprint.

## [The problem](#the-problem)

The Trivet team recently launched a referral program for their app, but the banner promoting it isn’t driving the clicks or signups they expected. Pop-ups can increase visibility, but they also impact the flow. So, the question is whether the banner is too subtle to matter, or too disruptive to work.

The goal is simple: drive more clicks and signups for the referral program. The constraint is clear: increase attention without derailing the experience. The team tests a range of UX options from subtle to high-visibility: a modal (a brief interruption), an in-feed card (the most subtle option), and a full-screen overlay (maximum visibility). Each direction requires a different visual approach, so they experiment with visual effects, a hand-drawn illustration, and photography.

This sprint isn’t just about layout. It’s about testing tone, visual tension, and how much attention actually earns conversion.

## [Direction one: Use visual treatment to spark curiosity](#direction-one-use-visual-treatment-to-spark)

The first direction leans into imagery. It uses a modal—based on the Trivet design system in Figma—for a more immersive interaction than an in-feed card. Since users are being asked to pause, the visual treatment needs to justify that moment. With copy already defined, the attention shifts to how the experience feels. The designer draws from “recipe row components” in the design system as a foundation. Because the modal copy is about "unlocking" exclusive recipes, the visuals support that language. Photography becomes the anchor, with recipes slightly blurred so they feel visible, but just out of reach. A [**glass**](https://help.figma.com/hc/en-us/articles/360041488473-Apply-effects-to-layers) treatment introduces a frosted surface, refraction adds depth, and a progressive blur softens the edges. Rather than overwhelming the interface, the effects reinforce the idea of gated access.

This direction emphasizes the unlock by adding depth and making the rewards feel tangible and intriguing.

## [Direction two: Insert more personality into the UI](#direction-two-insert-more-personality-into-the-ui)

The second direction takes a more integrated approach. Instead of interrupting the experience, the banner lives directly in the feed—designed to feel supportive rather than immersive. Because space is limited, the visual weight needs to be reduced. The designer experiments with illustration instead of photography, introducing a hand-drawn graphic as the starting point. Using [**Remove background**](https://help.figma.com/hc/en-us/articles/24004542669463-Make-or-edit-an-image-with-AI#h_01KBJQAF0GMV3AH0X4H8RTEJZP) and [**Vectorize**](https://www.figma.com/blog/introducing-vectorize/)

—Figma’s AI tool that converts raster images into editable vectors—a sketch of a cake becomes a flexible design artifact.

Once vectorized, the illustration becomes easier to refine. The designer adjusts colors to align with the brand by searching in the fill panel for the appropriate variable. The [**Cut tool**](https://help.figma.com/hc/en-us/articles/360039957634-Edit-vector-layers#h_01K6B4SP0MG9KM68X053Y17W93) refines edges while keeping paths intact, and anchor points are rotated using [**bounding boxes**](https://help.figma.com/hc/en-us/articles/360039957634-Edit-vector-layers#h_01KGG63W91EM7ZXKWKTHY2C94T) to polish small details without losing the hand-drawn quality. What begins as a sketch becomes a reusable, brand-aligned asset that can scale and adapt to the design.

This direction introduces texture and personality, making the reward feel lighter and more approachable.

## [Direction three: Create a full-screen overlay](#direction-three-create-a-full-screen-overlay)

When the goal is to command attention, nothing competes with a full-screen moment. It creates a clear break in the experience and signals priority. But with more room to work, the photography needs to feel bold enough to carry that weight.

The selected image is strong, but the proportions don’t quite fit the layout, and the spoon detracts from the food as hero. Rather than spending time finding alternatives or adjusting the design to accommodate it, the designer adapts the image to fit the design. They use the [**Erase object**](https://www.figma.com/blog/introducing-three-new-tools-for-precise-image-editing-in-figma/)

tool to remove the spoon and **[Expand image](https://help.figma.com/hc/en-us/articles/24004542669463-Make-or-edit-an-image-with-AI#h_01KBJQAF0GHQH58JT9VKQETNPY)** to extend the background, scaling the image up with additional context-aware detail—without distorting the original proportions—by dragging the blue handles. The result keeps the integrity of the image intact while fitting within the layout.

This direction leans into photography to elevate the cooking atmosphere—inviting users to pause and take in the call to action.

## [Putting the options side by side](#putting-the-options-side-by-side)

With the three directions complete, the team regroups to zoom out. Each direction feels viable, but they test different levels of intervention and distinct visual tones. A static frame only tells part of the story, which can lead to everyone imagining the experience differently. Feedback can also skew toward visuals, allowing ambiguity to creep in. Friction rarely shows up in a screenshot, and clarity often comes through interaction.

With that in mind, the team agrees that before bringing these options to stakeholders, the work needs to feel more like the real product.

## [Making it real](#making-it-real)

Since the Trivet team already uses Figma Make, the new designs are easily brought into Figma Make using an existing shared template—with built-in styles and structural guidelines—allowing them to jumpstart prototypes without rebuilding context each time. Within minutes, each concept becomes an interactive prototype. The flows are simple but the added fidelity shifts the conversation. Instead of debating hypotheticals, the team reacts to something that behaves like a product. Beyond the layout, they can also evaluate timing, hierarchy, and motion.

This is especially important when testing conversion. Seeing the full flow reframes the discussion and sharpens decision-making. For crit, it removes interpretation from the equation and creates a shared reference point for evaluation.

## [Crit, with context](#crit-with-context)

The team _could_ share individual Figma Make links for the review, but that makes side-by-side comparison difficult and feedback easy to fragment. Instead, they [**embed Figma Make**](https://www.figma.com/blog/introducing-figma-make-embeds/)

prototypes directly into Figma Design, Figma Slides, or FigJam, keeping everything in one place for review. For crit sessions, the team prefers laying all the options out in FigJam, so they can share feedback through comments, stickies, and live reactions, making it easier to align in real time.

Because the prototypes feel closer to reality, the feedback is sharper. The group doesn’t just react to visuals—they respond to behavior, and ask key implementation questions earlier. Other PMs, designers, and engineers join the session. Cursors move. Comments stack up. And direction three quickly gains momentum.

## [Path to production](#path-to-production)

From here, the path to production is flexible. The PM or engineer can continue iterating on the full-screen overlay in Figma Make before bringing it into code. The designer can polish the design further in Figma Design, and when it’s ready, the developer can jump into Dev Mode in the same file to start coding. Or the designer can move from canvas to code themselves, using [**Figma MCP**](https://www.figma.com/blog/introducing-figma-mcp-server/) to carry design context directly into the build.

By using AI tools to move faster, refining assets without leaving the design surface, and working inside interactive prototypes earlier, the team moves from problem to production with fewer gaps in between.

To see this workflow demoed live—along with more on what we’ve been shipping and how we’re thinking about design in 2026—[watch the recording](https://youtu.be/QJIgDWol5CE) of our February 25 Release Notes event in San Francisco.