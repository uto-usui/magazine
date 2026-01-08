---
title: "Penpot Is Experimenting With MCP Servers For AI-Powered Design Workflows"
source: "https://smashingmagazine.com/2026/01/penpot-experimenting-mcp-servers-ai-powered-design-workflows/"
publishedDate: "2026-01-08"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Daniel Schwarz)"
---

-   6 min read
-   [Workflow](https://smashingmagazine.com/category/workflow), [Tools](https://smashingmagazine.com/category/tools), [AI](https://smashingmagazine.com/category/ai)

[Penpot](https://penpot.app/?utm_source=SmashingMagazine&utm_medium=Article&utm_campaign=MCPserver) is experimenting with MCP (Model Context Protocol) servers, which could lead to designers and developers being able to perform tasks in Penpot using AI that’s able to understand and interact with Penpot design files. Daniel Schwarz explains how [Penpot MCP](https://github.com/penpot/penpot-mcp) servers work, what they could mean for creating and managing designs in Penpot, and what you can do to help shape their development.

Imagine that your Penpot file contains a full icon set in addition to the design itself, which uses some but not all of those icons. If you were to ask an AI such as Claude or Gemini to export only the icons that are being used, it wouldn’t be able to do that. It’s not able to interact with Penpot files.

However, a **Penpot MCP server** can. It can perform a handpicked number of operations under set rules and permissions, especially since Penpot has an extensive API and even more so because it’s **open-source**.

The AI’s job is simply to understand your intent, choose the right operation for the MCP server to perform (an export in this case), and pass along any parameters (i.e., icons that are being used). The MCP server then translates this into a structured API request and executes it.

It might help to think of AI as a server in a restaurant that takes your order, the MCP server as both the menu and chef, and the API request as (hopefully) a hot pizza pie on a warm plate.

Why MCP servers, exactly? Well, Penpot isn’t able to understand your intent because it’s not an LLM, nor does it allow third-party LLMs to interact with your Penpot files for the security and privacy of your Penpot data. Although Penpot MCP servers do act as a **secure bridge**, translating AI intent into API requests using your Penpot files and data as context.

What’s even better is that because Penpot takes a **design-expressed-as-code approach**, designs can be programmatically created, edited, and analyzed on a granular level. It’s more contextual, more particular, and therefore more powerful in comparison to what other MCP servers offer, and _far_ more thoughtful than the subpar ‘Describe → Generate’ AI workflow that I don’t think anybody really wants. [Penpot’s AI whitepaper](https://penpot.app/blog/penpot-ai-whitepaper/) describes this as the bad approach and the ‘Convert to Code’ approach as the ugly approach, whereas MCP servers are more refined and adaptable.

## Features And Technical Details

Before we move on to use cases, here are some features and technical details that further explain how Penpot MCP servers work:

-   Complies with MCP standards;
-   Integrates with the Penpot API for real-time design data;
-   Includes a Python SDK, REST API, plugin system, and CLI tools;
-   Works with any MCP-enabled AI assistant (Claude in VS Code, Claude in Cursor, Claude Desktop, etc.);
-   Supports sharing design context with AI models, and letting them see and understand components;
-   Facilitates communication with Penpot using natural language.

What, then, could MCP servers enable us to do in Penpot, and what have existing experiments already achieved? Let’s take a look.

## Penpot MCP Server Use-Cases

If you just want to skip to what Penpot MCP servers can do, Penpot have a few [MCP demos](https://drive.google.com/drive/u/0/folders/1CCuBqHEevWsp15bYkf3W7CLXLja5R_M_) stashed in a Google Drive that are more than worth watching. Penpot CEO Pablo Ruiz-Múzquiz mentioned that videos 03, 04, 06, 08, and 12 are their favorites.

An even faster way to summarize MCP servers is to [watch the unveiling from Penpot Fest 2025](https://www.youtube.com/watch?v=KNsvFc4Elfs&list=PLgcCPfOv5v57Sp_vY4VggqUpAbP5fTIkM).

Otherwise, let’s take a look at some of the more refined examples that Penpot demonstrated in their [public showcase](https://community.penpot.app/t/penpot-mcp-server-showcase-ask-for-help/10040?utm_source=SmashingMagazine&utm_medium=Article&utm_campaign=MCPserver).

### Design-to-Code and Back Again (and More)

Running on from what I was saying earlier about how Penpot designs are expressed as code, this means that MCP servers can be used to convert design to code using AI, but also code to design, design to documentation, documentation to design system elements, design to code again _based_ on said design system, and then completely new components based on said design system.

It sounds surreal, but the demo below shows off this **transmutability**, and it’s not from vague instruction but rather previous design choices, regardless of how they were expressed (design, code, or documentation). There are no surprises — these are simply the decisions that you would’ve made anyway based on previous decisions, executed swiftly.

In the demo, Juan de la Cruz García, Designer at Penpot, frictionlessly transmutes some simple components into documentation, design system elements, code, new components, and even a complete Storybook project like a piece of Play-Doh:

Quick demo: Penpot MCP server in action

### Design-to-Code, Design/Code Validation, And Simple Operations

In a similar demo below, Dominik Jain, Co-Founder at Oraios AI, creates a Node.js web app based on the design before updating the frontend styles, saves names and identifiers to memory to ensure smooth design-to-code translation before checking it for consistency, adds a comment next to the selected shape in Penpot, and then replaces a scribble in Penpot with an adapted component. There’s a lot happening here, but you can see exactly what Dominik is typing into Claude Desktop as well as Claude’s responses, and it’s _very_ robust:

Penpot MCP Server: Developer Workflow. Applications

By the way, the previous demo used Claude in VS Code, so I should note that **Penpot MCP servers are LLM-agnostic**. Your tech stack is totally up to you. IvanTheGeek managed to [set up their MCP server with the JetBrains Rider IDE and Junie AI](https://community.penpot.app/t/penpot-mcp-server-showcase-ask-for-help/10040/3?utm_source=SmashingMagazine&utm_medium=Article&utm_campaign=MCPserver).

### More Use Cases

Translate a Penpot board to production-ready semantic HTML and modular CSS while leveraging any Penpot design tokens (remember that Penpot designs are already expressed as code, so this isn’t a shot in the dark):

Generate an interactive web prototype without changing the existing HTML:

As shown earlier, convert a scribble into a component, leveraging existing design and/or design system elements:

Create design system documentation from a Penpot file:

And here are some more use-cases from Penpot and the community:

-   Advanced exports,
-   Search for design elements using natural language,
-   Pull data from external APIs using natural language,
-   Easily connect Penpot to other external tools,
-   Saving repetitive tasks to memory and executing them,
-   Visual regression testing,
-   Design consistency and redundancy checking,
-   Accessibility and usability analysis and feedback,
-   Design system compliance checking,
-   Guideline compliance checking (brand, content, etc.),
-   Monitor adoption and usage with design analytics,
-   Automatically keep documentation in sync with design,
-   Design file organization (e.g., tagging/categorization).

Essentially, Penpot MCP servers lead the way to an **infinite number of workflows** thanks to the efficiency and ease of your chosen LLM/LLM client, but without exposing your data to it.

## What Would You Use MCP Servers For?

Penpot MCP servers aren’t even at the beta stage, but it is an **active experiment** that you can be a part of. Penpot users have already begun exploring use cases for MCP servers, but Penpot wants to see more. To ensure that the next generation of design tools meets the needs of designers, developers, and product teams in general, they must be built **collectively** and **collaboratively**, especially where AI is concerned.

**Note**: _Penpot is looking for beta testers eager to explore, experiment with, and help refine Penpot’s MCP Server. To join, write to [support@penpot.app](mailto:support@penpot.app) with the subject line “MCP beta test volunteer.”_

Is there anything that you feel Penpot MCP servers could do that current tools aren’t able to do well enough, fast enough, or aren’t able to do at all?

You can learn [how to set up a Penpot MCP server right here](https://github.com/penpot/penpot-mcp) and start tinkering today, or if your brain’s buzzing with ideas already, Penpot want you to [join the discussion](https://community.penpot.app/t/penpot-mcp-server-showcase-ask-for-help/10040?utm_source=SmashingMagazine&utm_medium=Article&utm_campaign=MCPserver), share your feedback, and talk about your use-cases. Alternatively, the comment section right below isn’t a bad place to start either!

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)