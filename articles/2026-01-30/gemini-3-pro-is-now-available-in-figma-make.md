---
title: "Gemini 3 Pro is now available in Figma Make"
source: "https://www.figma.com/blog/gemini-3-pro-is-now-available-in-figma-make/"
publishedDate: "2025-11-18"
category: "design"
feedName: "Figma Blog"
---

At Figma, we believe AI's role is to help teams explore and imagine more. Every new model we bring to our platform gets evaluated through the same lens: Does it implement your designs with accurate fidelity? Does it take more of the busywork off your plate? Will it expand your team's creative possibilities?

Our early tests of Gemini 3 Pro showed solid performance, and a clear strength in exploring varied layouts, styles, and interactive patterns. We're excited to offer it as an experimental model in [Figma Make](https://www.figma.com/make/).

###### Gemini 3 Flash

You can also try Gemini 3 Flash in Figma Make—a lighter, faster model perfect quick ideation and rapid refinements.

### [Bridging the design-to-code leap](#bridging-the-design-to-code-leap)

Moving from a crafted design to working code can feel like a leap of faith. You shape an idea with care, but then the translation step flattens or misinterprets it. I wanted to see whether Gemini 3 Pro could help turn a new design into an accurate, code-backed prototype that felt crafted and alive.

As a holiday trial run, I put Gemini 3 Pro to work on a Thanksgiving gratitude board. I designed a set of golden leaves on a deep maroon canvas in Figma Design and asked Figma Make to generate SVGs and animate them using on-screen physics. The first prompt produced a calm, organic flow of delicate leaves across the screen. A few extra instructions and a Supabase connection completed the loop: Guests could send in their gratitude, which became a new leaf revealing their note on hover. A small concept unfolded into a warm, interactive experience—made possible with Gemini's help.

### [From Y2K to concrete poetry](#from-y2k-to-concrete-poetry)

We used a New Year's Eve RSVP page as our playground. The feature set was straightforward, but the aesthetic possibilities were endless.

We began with a Y2K prompt: retro-futuristic, moody, dark chrome energy, plus a functioning RSVP form. Gemini 3 Pro nailed both the visual tone and the interaction model. Then we veered hard and asked for a "concrete poetry" treatment—severe typography, brutalist tension, minimal ornamentation.

Gemini 3 Pro matched each shift without losing fidelity. It gave us distinct, coherent styles without sacrificing the working form. One plus was how consistently it generated motion and interactive details that matched each aesthetic. It made exploration feel open instead of boxed in.

### [Bringing AI into the system layer](#bringing-ai-into-the-system-layer)

It was clear Gemini 3 Pro could dream big, but most design work today happens inside mature systems. Real products evolve through careful iteration on shared libraries and components. So we pushed Gemini 3 Pro into that environment, using the design system foundations we've brought to Figma Make through Make kits and npm imports. It was time to test Gemini 3 Pro on Figma itself.

Starting from a Figma Make FigJam template built from our UI3 library, we asked the model to introduce a new feature—letting users switch the canvas background between different styles. Gemini delivered 12 unique styles, correctly implemented with UI3 components and proper interactivity with minimal instruction. It even improvised some nice details like animating between each texture, as well as sticky note layering and scaling effects. The result was so fun, it made me want to add the feature to our backlog.

### [A wider canvas for design](#a-wider-canvas-for-design)

Through all of these explorations, one thing stood out: AI extends the reach of the designer. As models deepen their design fluency, the creative space to explore widens, and Figma grows with them. Speed no longer competes with creativity, and the designer becomes even more essential in steering what's possible.

To try out new models like Gemini 3 Pro and Gemini 3 Flash in Figma Make, [tap your settings](https://help.figma.com/hc/en-us/articles/36400680326551) in Figma and toggle to your preferred model in the experimental models section—just look for the little lab icon.

_This article was updated on December 17, 2025 to include new Gemini model drops._