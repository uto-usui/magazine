---
title: "Design context, everywhere you build"
source: "https://www.figma.com/blog/design-context-everywhere-you-build/"
publishedDate: "2025-09-23"
category: "design"
feedName: "Figma Blog"
---

AI makes it easier than ever to turn an idea into working code. But to get the best results, you need more than a well-structured prompt. Today we're announcing updates to the Figma MCP server and Code Connect that make it possible to bring Figma design context anywhere you work—whether it's in your IDE, your AI agent, or your prototypes.

These updates make your design context—context about how your design system is structured, how your codebase is written, and how your team builds products—more portable and powerful, helping you move from idea to product with less friction. That context often represents years of combined effort, and it should be accessible both on and off the Figma canvas.

## [Bringing remote access to the Figma MCP server](#bringing-remote-access-to-the-figma-mcp-server)

Affirm’s PMs, engineers, and designers use Figma's MCP Server and told us it speeds up their development velocity by “orders of magnitude”—they were able to rebuild major product flows in fewer than two days.

Earlier this year we introduced the [local MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)

in Dev Mode, giving developers a way to pull live design context into their editor. Teams at companies like Affirm and Coinbase have already been using it to build complex user flows in significantly less time.

Now the Figma MCP server [supports remote access](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/). This means you can connect to Figma from your IDE, from an AI coding agent, or even from a browser-based model. In Figma, designs can be so much more than static images. Figma designs encode responsive layouts, interaction details, and in some cases entire visual programs. Customers can convey this Figma context to new partners such as Android Studio, Replit, and Warp. You no longer need our desktop app to bring design context into your workflow. Figma started in the browser to bring teams closer together, and this update extends that mission.

Connecting Figma to your workflow has also become easier with our [partner catalog](https://www.figma.com/mcp-catalog/). Simply find your IDE or agent of choice from the list, then integrate the Figma MCP server. Or, integrate from inside your client. We want every developer who builds from Figma files to have an uninterrupted and powerful experience. And like our [recent tool addition](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#create_design_system_rules) that creates design system rules, we’ll continue to add more functionality and partners to our MCP server throughout the beta and beyond.

## [Expanding MCP to Figma Make](#expanding-mcp-to-figma-make)

For teams using [Figma Make](https://www.figma.com/make/) to rapidly build and explore product ideas, the Figma MCP server now creates a bridge between Make and your codebase. By using a Figma Make file via an MCP client, AI models can see the underlying code instead of a rendered prototype or image.

The way we do this is straightforward: The Figma MCP server indexes the code in your Make file so you and your favorite platforms can [request exactly what’s needed](https://developers.figma.com/docs/figma-mcp-server/bringing-make-context-to-your-agent/). Developers and AI agents can reuse code directly from a specified file, or reference the logic, design, and patterns as inspiration.

We’ve worked with partners like Anthropic, Cursor, Windsurf, and VS Code to make this experience available in their products starting today. And we’re already building our next major updates, such as connecting partner MCP servers into Figma Make.

## [Improved component mapping in Code Connect](#improved-component-mapping-in-code-connect)

[Code Connect](https://developers.figma.com/docs/code-connect/) was built to align codebase components with Figma design components. By defining these relationships, Code Connect allows both humans and AI agents to build products faster. It’s a step towards our mission to unify design systems, wherever they live.

Until now, those mappings required manual setup from your terminal. With Code Connect’s new [in-app mapping experience](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/), you can browse components inside of Figma, map them to the right code and file, and easily see which are linked or missing. This complements [Code Connect CLI](https://developers.figma.com/docs/code-connect/quickstart-guide/), which helps developers bring production-ready snippets into Dev Mode with defined prop or variant mappings for most frameworks. Many teams are adopting both.

Customers using Code Connect can now convey more than design context through our MCP server—they’ll have access to code component locations and usage guidelines. The Figma MCP server, on its own, brings rich design context to AI agents. With Code Connect, it also brings production awareness. Early tests from internal evals and alpha customers saw more consistent code output, faster file navigation, and improved token efficiency from AI agents when using both. Developers and teams will see improvements in all of these categories—and more—throughout the beta.

## [Integration reviews and rate limits](#integration-reviews-and-rate-limits)

As we open up more ways to connect Figma with the tools you already use, we’re also strengthening the foundation that makes those connections reliable. Extensibility is best when customers and developers trust the platform they’re building on.

Going forward, all public third-party integrations and MCP clients will be reviewed by Figma before they can access your data. This adds a layer of confidence for anyone adopting new apps or workflows and is consistent with how we review plugins and widgets. Our [REST API rate limits](https://developers.figma.com/docs/rest-api/rate-limits) will be adjusted to create a more predictable experience for app builders and users. These changes go into effect on November 17 and will affect less than one percent of Figma’s active users.

## [Looking ahead](#looking-ahead)

The remote MCP server, support for Make files in Figma MCP, and the in-app Code Connect experience are the first steps toward a broader vision. We want context to move freely between tools so that explorations can evolve into production features, without unnecessary rewrites or modification.

Today, the Figma MCP server conveys design and code context to other tools. Over time, it will become a two-way connector, pulling external context back into Figma. That means more realistic prototypes, fewer rebuilds, and more time spent solving real problems and building products that stand out.

Design artifacts are not just references. They’re active inputs that shape your business and user experience. Whether it’s a design system, an interactive prototype, annotated mockups, or generated code, each contains knowledge your team can use to build more accurately and quickly.

All of these features are in beta starting today. We’re continuing to refine and improve them as we move toward general availability. Imagine what you can build when Figma is everywhere you build.