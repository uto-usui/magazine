---
title: "4 ways we’re using our MCP server at Figma"
source: "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
publishedDate: "2026-06-16"
category: "design"
feedName: "Figma Blog"
---

Two months after [opening the canvas to agents](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/)

, the

[Figma MCP server

![Abstract illustration of interlocking organic shapes in purple and orange on a dark green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACgUlEQVR4nAXBWU/aAAAA4P66PexhybLELdNQSu+Llra0peWoiBxyFSYgcgiJIqYcikMc4jXFTTc1y5wzLnNmiXF73D/Y9wGUveQCOzxoiXAkRTNpUnZjokG684wcIzQDzkbQhELAKvM0zxJhpOxFqjk+GGaVScQGCGBLBfc0+0EKW9oThRMZaogv3yqvP3vQLhdMOLoJRzdL+ir8VIvTTLSTwDttd6bIxylUAyT7hgYe+cEPRax1Jct//BOX+sRX79SdFxvyqXnHu7xjYNGmxYarRD3qGKXwviVWis66glYBFWrp9n2ffZxFNsdC6F5Dvyiuc1k9l7Sh0+zR5SGTP+Lia1Q1Cu14weMZZGRSvTi5ESHqwDxZmHUMvOA4Ao0sqjJ2hU7FwDdFvJA8Z8L0ncI/eshfsrDvTJRRKwkP0ljPJDfniF6aKgPbkrpANGLwsIC3B3zmUIiO3cZ9ALnVmWtF+qsjDyp5JXjOucApFzzkYoditC9m8/RaBFsBthWhyRc2xfkzzffDz5yoxpaYuvZzj0H7owHd68wOay6jKyMqfSvyN7Jwo4mXur7iLEeQBpBj401X7iogPcyCtwa1LmZy1GpfSv6eRv6FXnzXnHWsmbTtruOVj9zMFmu+dwdv/K6hNJfElwAZbtbY6oVXHWuenmDW2HKMqBfo6ieP/NN4fizTJaSVsh108doek14miy3BuPDx+8pskiwDTsgq0NWe5MmwoTdUzuJDaToWwettIdBWni1ycNqxGrftNvDSMa+1WC3D6BVnusQs+bBFgIAqcco0OYQlJ6MsuibhYSqso7UM6/FyT3jqVQBeMMANE0/1BWiZgxUsJMNNHek44cJ/7udjylpPwXAAAAAASUVORK5CYII=)![Abstract illustration of interlocking organic shapes in purple and orange on a dark green background.](https://cdn.sanity.io/images/599r6htc/regionalized/35f6fde4ce9f85257cecfcb6af666932842ab4af-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### The TL;DR on MCP: Why context matters and how to put it to work

Figma’s MCP server brings your design decisions into the tools where code gets written—so what gets built actually matches what was designed. Here’s what that unlocks for everyone who builds products.



](https://www.figma.com/blog/the-tldr-on-mcp/)

now works across Figma Slides,

[FigJam

![Abstract layered graphic with orange, blue, and green blocks. Magenta squares labeled “1,” “2,” and “3” in bright green appear in different corners. Dark red bars cross the center. A large black curved brushstroke forms an upward-pointing arrow, partially covering the numbers.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAADBklEQVR4nFXQW0yTBwDFcV5mYrIHzTQTZ4JR2kILziDQIgjhXgoVSNUgQ+dYEQgttZSLZN6YSiyROTUyE3Abt4SL34YYF2J4wGSTbZ2iVNiWsUlB6xSNrC3V8sX+zUzN5sN5OC+/nJwgtzjDwswIvu+aEDtrELtqWOysRuyyIHZWs9gZ6N3VPPjCxEjjPq4Lbfz96A5u/z1c/llczOIOJMi96MA7OchCiwFHXTG3zEbGDEWMl29lzLiHmyYzUyYLczVGfispojc3hytNDdx3jOF54cTz4h4e/yxufwB0+Rx4xwWcJ8ro3mGkIqkefdQ2yiOUfBz9ARWJp2lNv8SNPIEfU61ciNLRbqlk1DbEhHOMSecN/pi7zaNnU6/QIJdvGq9d4O4JA43ZVajktUSszkGxbB1rV8YRE9ZMVfwtetR2hPhemuW7sGzPw/hZLZVtRzC1HcQ6eJafHd/zjzjzeuFFpq37OLXtNNkJg6TLD7B5RTiy5VKSJWb2KtupT2rncOwxqqUatkarkGQmsUodQ3BuFBmHdvHtzQHmfdP/gfetVXQUtlOh+ZXi2G4y16Sx6R0Z+ety2asooTRST7mikFKplixpLu+FJPDWu8EsUQSjMuXTZxN4+i/oDnw4f9yMLb+VrhQ7jTGjaKUNKIKzSJWUsTO6hSLllxSpLrBT+RVp73/O2tUFvL1MzlKZhLhK3Zvgs3EB39FKnmibGE8dpmPLBAWx1wiXfEL4egsJ0T1kJo2iTv6J5M1DbFScJDSkjFCJgTWqQrZU7abPdpF5nyMA2r9BbCrFq9czXdxA//ZBPsr4kzjlVWSSQ4SutyAPa0QhtyKV1LMhxExexBn0KVfIzG5GXWeg75fXoOjAe3cYn/Apz88beHiujoH9vZTonKjTn5AYP8rGDa2Ey44RJj1CpPwUusgBWuJs9Gdfx6I9g67W9L+F/lk8ngkWZq7hnRpi7s4wl762U/KhC61GRKvxosl4QEbq76SnTJKV5sCY+JjL8X/xg2aEozknKagx0W8TXoEvASQMRlM3Rft1AAAAAElFTkSuQmCC)![Abstract layered graphic with orange, blue, and green blocks. Magenta squares labeled “1,” “2,” and “3” in bright green appear in different corners. Dark red bars cross the center. A large black curved brushstroke forms an upward-pointing arrow, partially covering the numbers.](https://cdn.sanity.io/images/599r6htc/regionalized/8a3ce8f118e4296961e3d68a5bbb771912f5e1db-6400x3600.png?w=6400&h=3600&q=75&fit=crop&crop=focalpoint&auto=format)

### FigJam is now your coding agent’s whiteboard too

Agents are changing your code faster than your team can follow. Now you can close that gap with new MCP skills, architecture layouts, and more in FigJam.



](https://www.figma.com/blog/figjam-your-coding-agents-whiteboard/)

,

[Figma Make

### Figma Make, now on your local code

From visual editing to contextual prompting and collaboration, Figma Make is expanding how teams can design with code.



](https://www.figma.com/blog/figma-make-now-on-your-local-code/)

, and the new

[Figma agent

### The Figma design agent is here

Starting today, work with an agent that is built for Figma—directly on the canvas.



](https://www.figma.com/blog/the-figma-agent-is-here/)

. That means presentation decks, FigJam boards, and Make prototypes can all be created or updated from a prompt. The MCP server also supports [custom fonts](https://help.figma.com/hc/en-us/articles/360039956894-Add-a-font-to-Figma#h_01KRYE1RA8K6RRADCBAS6FJATS) and lets you download images and icons—as SVG, PDF, JPG, or PNG—from design files through the new [download\_assets](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#download_assets) tool.

Here are four workflows Figmates are running right now using these new capabilities.

## [1\. Create and refresh decks in Figma Slides](#_1-create-and-refresh-decks-in-figma-slides)

Mallory Dean, a designer advocate at Figma, maintains an evergreen deck covering Figma’s AI product launches. It's a living deck that she refreshes every few weeks so that what she's presenting at design talks and customer meetings stays current as we ship.

The [Figma MCP server](https://www.figma.com/blog/the-tldr-on-mcp/) now supports uploaded custom fonts, so any typeface saved on your machine can be prompted to render correctly in designs or slides.

After we launched the [Figma agent](https://www.figma.com/blog/the-figma-agent-is-here/)

, she prompted in her code editor: `"Update my Figma AI deck to include our new Figma agent. Pull content from Slack, Google Drive, our [Shortcut blog](https://www.figma.com/blog/), and [Release Notes](https://www.figma.com/release-notes/) webpage. Give me suggestions for what to refresh, plus ideas for new slides."` The agent pulled relevant conversations, briefs, and launch messaging, then used the [`use_figma`](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/) tool as well as the [`/figma-use-slides` skill](https://www.figma.com/community/skills) in Figma Slides to update the deck against her template.

The new slides still needed a review pass, images to swap out placeholders and copy edits, but the first 80% of the content work was already done by the time she jumped in. With our new [custom font](https://help.figma.com/hc/en-us/articles/360039956894-Add-a-font-to-Figma#h_01KRYE1RA8K6RRADCBAS6FJATS) support, the agent rendered type in her uploaded custom fonts—not web-safe approximations—so the deck stayed on-brand.

This same setup shows up across the product development process, whether you’re generating something from scratch or updating an existing document. A PM building a kickoff deck. A designer presenting a design exploration. Marketing pulling together a GTM plan for a feature. Sales updating a customer-facing deck with the latest product changes. The work isn’t just faster—it comes out on-brand, built from your team's design system.

## [2\. Generate FigJam boards from live data](#_2-generate-figjam-boards-from-live-data)

As a product manager at Figma, Prasant Lokinendi runs feature kickoff workshops often. Prepping an engaging FigJam for these workshops—pulling in context from across the company and formatting sections to fit the session—takes time. So he built [`/figjam-builder`](https://github.com/prasantloki/figjam-builder), a custom skill that carries those instructions so he doesn't have to re-prompt them every time.

For our Make [voice-to-text launch](https://website-next-presentation.netlify.app/release-notes/?title=new-in-make-voice-to-text-question-cards-and-more) earlier this year, he prompted his agent to generate a FigJam board from context pulled across Slack, Asana, and Notion for project structure, and Hex for analytics. Instead of an empty FigJam, he started from the most up-to-date data, including product vision, customer insights, and key decisions.

## [3\. Move designs between code and canvas with Figma Make](#_3-move-designs-between-code-and-canvas-with)

The MCP server now also works in Figma Make—closing the loop from [design edits to production PR](https://www.figma.com/blog/figma-make-now-on-your-local-code/)

without ever leaving Figma. Iris Lin, a product designer at Figma, runs this loop on real product work.

For example, when Iris and a teammate recently built a sample audio editor as a demo file, her teammate shipped a first version, but Iris wanted to update the designs. Interactions are hard to show in a static file, so she branched the code and built the real thing in Figma Make: audio clips you can drag and reorder, a popover with level controls, and a playhead that scrubs.

Since Iris wanted to make edits to her design system for her demo file she brought the Make preview into the canvas by prompting in the Make prompt box: `“Can you bring back the preview here into Figma as design layers?”` The screen landed on the canvas, rebuilt with the relevant components from her library. Iris changed the audio clip component following her normal design patterns on the canvas, giving it a clear default, hover, and drag state. Then she sent it the other direction: `“Pull those new states back into the code.”` The agent read her design changes and wrote all three into the component, ready to push to GitHub as a PR.

This workflow puts you in control of what ships, all from within Figma. The agent reads and writes your real components on both ends—the same way [Code Connect](https://www.figma.com/blog/introducing-code-connect/)

maps your library to production code. Design decisions that used to lose fidelity between handoff and review now travel all the way to the PR.

## [4\. Split the work with the Figma agent](#_4-split-the-work-with-the-figma-agent)

As the product manager behind the [Figma MCP server](https://www.figma.com/blog/the-tldr-on-mcp/)

, Yarden Katz knows how to push our MCP to its limits. One scenario she keeps coming back to is a screen that exists only in code, with no canvas representation at all. The goal is to get it into Figma, attached to the right design system, so designers can work with it.

Pull all assets out of Figma directly through the Figma MCP server with our new [`download_assets`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#download_assets) capability. Unlike a screenshot, it returns the actual exportable file—SVG, PDF, JPG, or the original source image. No manual export needed.

Working from a sample app with a login flow and a dashboard, she prompted from her code editor: `"Push this dashboard and the login flow into Figma. Reuse my existing components and variables where they exist, and generate proper component sets and variables where they don't."` The Figma plugin ships with [skills](https://help.figma.com/hc/en-us/articles/39166810751895-Figma-skills-for-MCP) that give the agent context on how to use Figma, so it read her library in both Figma and her codebase and decided what to reuse and what to build new, rather than duplicating work she'd already done.

It got her a strong first pass, not a finished one. The auto layout, the fonts, and a few unmapped colors still needed work. That's where the Figma agent picked up—working beside her on the canvas with deep context on her design system. She prompted it to fix the layout, correct the type, and map every color to the right variable. When it was where she wanted it, she pushed it back to code through the MCP server. If needed, she could also pull source images and icons straight from the agent with our new [`download_assets tool`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#download_assets) without exporting separately.

In this use case, the MCP server and the Figma agent tag-team to get to final designs. The server connects Figma to the agent you're already in and brings a code-only screen onto the canvas, built from real components. Then the Figma agent takes it from there. Native to the canvas, it explores directions while staying grounded in your components and tokens, right where you and your team design.

The Figma agent and Figma Make's production codebase integration are currently in closed beta. The write capabilities in the Figma MCP server are in open beta—check out our [setup guide](https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server) to get started and we’d love to see what you build.