---
title: "The TL;DR on MCP: Why context matters and how to put it to work"
source: "https://www.figma.com/blog/the-tldr-on-mcp/"
publishedDate: "2026-04-15"
category: "design"
feedName: "Figma Blog"
---

MCP—short for Model Context Protocol—has had [no shortage of buzz](https://www.figma.com/blog/double-click-what-does-mcp-mean-for-agentic-ai/)

since it broke through last year. In short,

[MCP creates a universal way

### Introducing our MCP server: Bringing Figma into your workflow

Today we’re announcing the beta release of the Figma MCP server, which brings Figma directly into the developer workflow to help LLMs achieve design-informed code generation.



](https://www.figma.com/blog/introducing-figma-mcp-server/)

for AI tools to pull context from the tools and data sources your team already uses. But you might still be wondering what that actually changes about how you ship. Here's what it actually means when MCP meets your product workflow.

## [Why MCP matters across the product team](#why-mcp-matters-across-the-product-team)

Product development is no longer linear. The old sequence has given way to something more fluid—teams jump between stages, start wherever makes sense, and loop back as the work evolves. MCP supports that way of working. It moves design context into code, and [code-to-canvas tools](https://www.figma.com/blog/introducing-codex-to-figma/)

bring working UI back onto the canvas. Together, they keep the whole team involved as the product takes shape.

When an AI coding tool looks at a Figma design without context, it's working from a screenshot—it sees the end result, not the decisions that went into it. It picks a shade of blue that's close to your brand color but doesn't know it's mapped to a specific token. It sees a card and builds one from scratch instead of pulling the one your team has used across dozens of surfaces. A form built from multiple nested components gets flattened into a single element. The output might look right at a glance, but it drifts from your system in ways that compound across every screen and component it touches.

[The Figma MCP server closes that gap](https://www.figma.com/blog/design-systems-ai-mcp/)

[.

![Abstract illustration of interconnected black circles at the center, with thin black lines branching out to green dots and colorful geometric shapes. The shapes include red, yellow, blue, and multicolored forms with comb-like textures, arranged symmetrically on a gray background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACdElEQVR4nAXBW0/TUAAA4P40TVSMhKAx8UGjEhjqGspu7ArdVmAydt962Wl7ul5Ot7brVrArF4EhbksEDUpA44uv+x9+H1ajvWLF1aTeGJT/ZYlpbGkaXZhGXk+JN1P87d+w/6Sc92zm6py8mwSuRxtnAx6xdS5DysUytp0/IikPcM4p5K4L6VsqdkNGr5Phm2Tk93r0MkMOaHrfEobe7viI/HKY9zpsP52w/MvdrRxWZw7zxYEguvu27XXUPdiymJZe5W2Gd0XRFqEha5aOLCQZGmgjscs0RoTvh+/VeaGAGfYhDx3AG8gwOj1LRiYQNQ6IggChBHnIAwAAy4tNSeRlUVI6jfrpqm+ML57TNNZ3Hcg366VdILKqobGAI0kyGg6vBUMhIhAgCPy937+MJ2Mb1TIrCKrC0EpqDSUSDi9he51WayfT3KFgC6imWqmXln1Lz+efPZ2dn3s8Nzvz5OH9Rw/uzbx8sfBxsySJSBKFRqlcpCpspYUNy1mXjFpMTTeRaiAO8FRmKx6JrwVjkUAsRITwd8TSQiC4kq5XmpqCFEWt1uRUUk7FVWyUDgyzSVeVLafXNk1ZtQXBhIKmSJoqtRWoNBmhXIC1iipBTUO6qhhMw0rEzXDQwAallFejXEPs9gwZ9Tjgck2nBZElCp84rttoSDVG4GQIkaIpekeyDFmXpXKhuU3x2Nn+zsgjJ6e5Aw+yoJfdcirVnszLTi4zDOH94IpA5SSgyqqu6Hy/n7842ph8jh/vJfqdPPZ9XLy9TN5drV+cAQDM7Gabpm1DQgMq/fWDz10l9GLVaneNrm3Y8vHB1s8R/ufb4q8JPj7Z/A8UMoHO1gQ5lQAAAABJRU5ErkJggg==)![Abstract illustration of interconnected black circles at the center, with thin black lines branching out to green dots and colorful geometric shapes. The shapes include red, yellow, blue, and multicolored forms with comb-like textures, arranged symmetrically on a gray background.](https://cdn.sanity.io/images/599r6htc/regionalized/396116262667f31a91d215cb60dc1b4981e94553-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Design systems and AI: Why MCP servers are the unlock

Paired with MCP servers, design systems become a productivity coefficient for AI-powered workflows, ensuring that AI agents produce output that’s relevant and on brand.



](https://www.figma.com/blog/design-systems-ai-mcp/)

It gives AI coding tools structured access to your Figma file—not just what a design looks like, but the components, tokens, and layout decisions behind it. This is where your design system comes in. The context your team built to keep your product consistent is exactly the kind of context MCP draws from. How MCP changes your work depends on where you sit on the team.

### [For designers: Your files carry more weight](#for-designers-your-files-carry-more-weight)

[Your design system](https://www.figma.com/reports/the-business-value-of-design-systems/) has always kept your product consistent. Now it’s also shaping the code AI writes, from early prototypes all the way to production. How you build your files directly influences what gets built, and because AI generates at scale, that influence compounds across every surface it touches.

That influence also means mistakes travel further. Before AI, a messy file was a localized problem—a developer would clean it up during implementation and move on. But now, AI coding tools are generating code at scale from those files, so a small inconsistency doesn't stay small. It gets picked up and reproduced everywhere the AI builds from that file. What used to be a one-time fix becomes a systemic issue.

MCP keeps code and canvas connected through the whole process—so when developers build in code, designers can bring that work back to the canvas to fill in missing states, refine the details, and get it production-ready without having to rebuild what already exists.

### [For developers: Less translation, more building](#for-developers-less-translation-more-building)

AI coding tools sped things up for developers, but [without design context](https://www.figma.com/blog/why-you-should-care-about-design-context/)

, they were still guessing. Historically, translating a design into production code meant a lot of manual interpretation—inspecting designs for spacing values, hunting through the codebase for the right component, cross-referencing token names between Figma and code. MCP changes that. Instead of generating a component from scratch, an AI agent with MCP context can reference the actual component from your codebase, apply the correct tokens, and produce code that's buildable from the start. That means less time on translation and more time on the work that actually needs a developer.

But translation doesn’t go in just one direction anymore. More developers today are starting in code to spin up a working prototype, then bringing that work back to the canvas using tools like [`generate_figma_design`](https://www.figma.com/blog/introducing-codex-to-figma/)

. Because MCP carries design context through that loop, what comes back to the canvas is something the whole team can actually build on.

### [For the whole team: Roundtrip design](#for-the-whole-team-roundtrip-design)

Say a developer is building out a checkout flow and hits an edge case. Instead of guessing at a solution or waiting for a new mockup, the developer pushes the current UI back to the Figma canvas using our [code-to-canvas capability](https://www.figma.com/blog/introducing-codex-to-figma/)

. Now the designer can see exactly where the flow breaks down and explore solutions using real components right in context. The PM can compare both versions side by side in Figma to make sure the experience still lines up with what the team intended. Once the team aligns on a direction, the developer pulls the updated design back into code—with all the context from MCP still intact—and ships it. In each of these moments, the builder is shaping the work while there’s still room to influence it.

###### The Figma MCP server includes two tools that power the roundtrip.

`generate_figma_design` translates HTML from live apps and websites into editable Figma layers—useful when designs fall out of sync with code and you need to bring the latest UI onto the canvas. `use_figma` lets AI agents create or edit designs directly on the canvas using your actual components and variables. These tools are complementary: one brings code to the canvas, the other lets agents build on the canvas with your design system.

For everyone who builds products, this loop is only getting tighter. [MCP recently expanded](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/)

to let AI agents create and modify designs directly on the Figma canvas using your components and variables—making it possible to move between code and canvas without leaving the tools your team already uses.

## [Getting the most out of MCP](#getting-the-most-out-of-mcp)

MCP can only work with the context it's given. The more intentional your setup, the better the output. Here's where to start.

### [Guide agents with skills](#guide-agents-with-skills)

[Skills are one of the most important](https://www.figma.com/community/skills) factors in improving MCP output. Skills are markdown files, written in plain language, that specify which components to reach for, what conventions to follow, and what steps to take when building a new screen. Without skills, especially [`figma_use`](https://github.com/figma/mcp-server-guide/tree/main/skills/figma-use)—a foundational Figma skill—an agent might use the right components in the wrong way. With them, the output stays aligned with how your team actually designs.

### [Invest in your design system](#invest-in-your-design-system)

Everything you've codified in your system is context MCP can surface. AI can't infer things that your team might take for granted, like when to use one component over a similar one, or what your brand's spacing conventions are. The more of that knowledge you make explicit in your system, the less guesswork AI has to do, and that extends to how your files are built. Here’s where to focus:

-   Name your layers clearly—”card" or “nav-bar” give the AI something meaningful to work with. “Frame 1337” doesn’t.
-   Use auto layout to define spatial relationships the AI can read as responsive behavior.
-   Use real components and tokens from your libraries instead of detached instances or hard-coded values.
-   Add annotations for interaction intent—states, transitions, dynamic content. The AI can't infer behavior from static frames alone.

###### Add code syntax to your variables for better accuracy

[**Code syntax**](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections#code_syntax) tells MCP how each variable is actually written in your codebase—so instead of just passing along "brand-blue," it passes along the exact code your developers use, like color-brand-blue in CSS. It's a small step that makes a big difference in output accuracy.

### [Connect your code to Figma](#connect-your-code-to-figma)

If your design system is already in good shape, the next step is connecting it to your codebase.

[Code Connect](https://www.figma.com/blog/design-context-everywhere-you-build/)

tells MCP which code component matches your Figma component and where to find it. Without it, MCP can tell an AI coding tool that your design uses a card component, but the AI still has to search your codebase to figure out which one maps to it. With Code Connect, that guesswork goes away. Designers can map components directly in Figma using the [in-app mapping experience](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/), while developers can set it up through the [Code Connect CLI.](https://developers.figma.com/docs/code-connect/quickstart-guide/)

[![Cover image for Figma's guide, "How design systems power the new pace of product development," featuring abstract geometric illustrations in blue and green on a yellow background](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAACxLAAAsSwGlPZapAAAElklEQVR4nG2T+VNTZxSG+Qc7gi2ITJ2xIwouLSgMJCGARXYwiiNQoQpuyOJoEoFAA9n3hJAEkrAIyc2eEFRcfn4690bHttMf3rn3PffO873nnPnKTgpXOErVcZyu42PxCieFyxRSdRyl6ylm6zlK10leqmXrORaVqaeQLv3zPn+ZT8WrfD4uqayQvMS2/xz72+elj6IP+c7hsZ3F56zBaTmDZa0Sq6GyVHPU4LJUYzdW4bRUE948RyF16TswnygBD6K/8CF/mZxwCY/9LPrl0+h1P7LypgL1wg+SdNoKVhcr0GnLWdKcYkVbjs1YxX74vJRcAooQseV3uXopejZ+EbetmmVNOcuaClaXTrOoLkf7+hRLmnKW1KdYFoHqkl/TnWbDVSMFkYDfon6TCPTYqll5IwLLpZRrYtLFCimtBBKhmnIpqWH1J6nDYqb+/4HiCEK+n6VWzGuV2IxncFnPYjeewWqowqSvlCBmfSXW9Sq89hriexcQl/sv4JevOinUU0heJBuvJR2rJROvJZeoJStKqCUTu0AqdkGqi76QusiHQh2fj/8DPCle4+joN3KFBnL5BvKFRvLZG2QSLSQP5SQOFSRFHShIHMpL71996lBGPtXEx6NfS8BPx1cR0k2Ywj2ofSrUXhWrgUGsG4PoViaZnZ9lZm6OmblZXvxDs/MvJL18/RSb6za5zI0S8GPxGqHdTqb+esTgywWGX80xtfYQrXGc6RcL3H+4yOi0ltHHGsamtYxPaxh/rOHBEzUPnr5iYm4BjXUUId1M2Zd3V3mfb8C7McC05hkT2mc80k3z2jKK0T6CemmKJeMYBu8wRt8wJu93mUXvG0LnVbG+3YeQaRITXuE404jFoWJCPcOE/hFTlj945RrB5FahN43i3eohEpezJSjYiisIx+WEY21EYgrp6dzpwhztJiECxc0WM9cxeoe5q3vC4No0KusEk/YxllwjGLy38e11spWU4RHasAtKggk50ZicSEwEK7AH+6QOEskWyj4Vr5FPN+EJ9TBvHufx+iRPTA+Yt4yhd6swhXpxx5UE0604UgrWU234UzIigpyAoMAbU2LaGGLddo9kvJUycX6JuIzQ9i2cvkFplj5/PxuBPqlVa7ibDUFBON+EK9eCOSvDl2nFn1DgEJRYYh2YNwcw2UdKwONcI/GYDE+gD7PzDtFoJ0JcxtuDNkJ7HdijXYQScnaL1wkdNeHMtOJIKrDG2zHF27Em2nBs9WJ13CUhAfMNCEIrDv8Abwzj2LxDhHZusr3XQWD3JrZwN76YknC+md1sM4GkDHusHdPBTSyHHbiFNhzBPszfgMVcI/tv2/AGejHYR9Db7mHxDbEZ6cIXvoXOo2LJdxt9cABDsJ/1UB+r4V50kV5WIj2sRnrQeO6ic9wjIbSUWt7fa8cf7CWw1U10p5OdvXb29pUEIl1obfd5pn/Ic/2fPF+bZMY6xpxfxVxokLnQELPBIZ5v3GE1MEAq1UyZeEvEexg/lJMSWhAPECVuPiG0Eor+jsvfj9M/gHOzH2e4G/fbTjwxJe5YO+6YEs+hkh1BRrHQwN/179QgXR1KZAAAAABJRU5ErkJggg==)![Cover image for Figma's guide, "How design systems power the new pace of product development," featuring abstract geometric illustrations in blue and green on a yellow background](https://cdn.sanity.io/images/599r6htc/regionalized/25c90b846b7c4b2002828c14cd1c6a7fbe0a510c-4320x4320.png?w=4320&h=4320&q=75&fit=max&auto=format)](https://www.figma.com/reports/design-systems-power-the-pace/)

For a deeper look at how to build and maintain a design system that's ready for AI, [read our guide](https://www.figma.com/reports/design-systems-power-the-pace/).

MCP changes what's possible when design and code are connected. Designers' decisions carry further, and developers spend less time translating and more time on the work that actually needs them. The whole team stays closer to what was intended, because the context that matters most travels with the work.

The initial investment will pay off across every project and every surface AI touches. The teams that invest now won't just move faster. They'll build better.

**See the roundtrip in action:** [Watch the livestream](https://www.youtube.com/live/R9mBpeiCMM0) where Thariq Shihipar, technical staff at Anthropic, and Brett McMillin, designer advocate at Figma, walk through moving between Claude Code and Figma end to end.