---
title: "Got skills? Make the Figma agent a better collaborator"
source: "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
publishedDate: "2026-07-01"
category: "design"
feedName: "Figma Blog"
---

July 1, 2026

![Abstract illustration of colorful interface elements—including arrows, a letter, a smiley face, a flower, and a square—connected by a winding striped path on a black background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAERUlEQVR4nH2U629TdRzGezm9nEvv17Xr1tKu56xd23WTwdzmoJlBBxLdUASj6NjACRjRkYk4IUPmBk7QMZgXEGckkiEImKDxhW8gUXljYmIUNRGERE34AxTJx7SbyZDhiycnOb9zPuf3O8/zfHU6nY7/lV4/LZ3+lvt6vQFdUTev3Q5kQDCJWGU3FtmN0STOvDy9ZjBZECx2BIuCwWieDZ17V4JZxO+tRItkiZVnsbkqMZok9AYBQbQjuiLI3iSSJ47FVoah9EH93MDiUWTZTb4yx4PJPG2xLOFQBrPsQ7A6kbzzsAU0bO4oXn8Cf6gGxRme2ektQD06gxHFHqQxVsd6NcXqhEqyIoPkLEdxJXCWZVEcISrsTtrVOJ3zF5KOZrFabLcDCoi2ILmKHF1JjW5NIx+rxROqIZm6m+aGTmqr6lkSj3K4o5mprgfoqG/GIblmgP86WXJOX/pPVlsZiXCGVfEqetUkhcQC6mqXs3b1C+zvf5fBnl3039fJqZ7lnOp9mBWNBRyKp2iYEaPFhlnyYJE9iJIbSfZh8yaoDGVYXhFjUzJOd32BLasGOLzjGKdf/ZQTw2eY3DrO2Jq1rF/cSlarQ1Rc6MyyF8kbxxtMUVOe4a5oHYVYA03zGmgsT/NQOEJfqoqR9pV8tP0on4x+xkT/IY4OTnF27+fsePxF8sn5uIPVmItHVgJplEA1lZ4KHoskGNXyjKcbGFRz9JTHeCoc5nk1wc5F9/L2xlGmdn3M0cHjHB86zZGBD1iztJtIJIPsq8IkOtDZwzlkf5KYw8+GUIT31TRTqSzjVRqbQuWsi4R4NhVnQ32Grral7Nm8mzOvn+WdlyZ5pL0LNTEfVzBdyqRgtqGT3HGUQIpIUKUzmmFb9QJ2pJt4RmtgZVzj0aY029cV2N2/jIGt9zM2toUjh/bT29tHMn0njkAK2a9iVvzoDSZ0gtmO6Ijg8KlUBDW0oEqqrBotkqO+7g56+5Zx4os+LvywiwsXh/j6pxFOnh+iZ9tGorWtSJ4EZsmLXiiFupgUA0bBWnLaUJRJxmh1IroTZJpaGHmrm29/G+XK329y9cYEV64f5Jurexk88DTawlYkdwLB6kBnmOn5zTk0lGpnNEuI7nnkm1vYP/kkP17bV4JdvnGgdP3+j32MHHiC6vocij+F6IxgECxzdXkaXARaPVFyLY288V4PF6/tLYF+LQEP8t3vrzE0topkTbxkhuJTEYq1m55G/x0MeoyCiOSMkWpsYWC8m68u7+HSXxNcuj7BL39OcO7nYTa/3ElldQLFl0T2JjBa5LmB01AjJtGFX81xT89KRj7sZ+r8MCe/HObYuVfYOfkcrauX4ItnsAVSWO2h2TNx7gFbrKTF5iOQrCXftohCx1LaVrSzuKOdXGExfm06v1ZbCKNJRqebbcrtoHqh9LBZsmNVXFgVZ0lmyYFgtWM0F6e1ZTaMfwAvJGragk7Z3wAAAABJRU5ErkJggg==)![Abstract illustration of colorful interface elements—including arrows, a letter, a smiley face, a flower, and a square—connected by a winding striped path on a black background.](https://cdn.sanity.io/images/599r6htc/regionalized/015a2686397343b62eda89ffb3507562b91341b6-1536x1536.png?w=1632&h=1632&q=75&fit=max&auto=format)

From sharing your best thinking to learning from your team’s go-to prompts, here’s what skills unlock in the Figma agent.

Every team has their own way of working.

Maybe it’s how you capitalize product names, the way your PM formats specs, or the prompt your team swears by for design feedback. These are the workflows everyone relies on—easy to use, hard to explain, and often living in someone’s head.

That’s where [skills](https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make) come in. A skill is a reusable set of instructions, written in plain English, that you teach the [Figma agent](https://www.figma.com/blog/agent-custom-tools-context-skills/)

once and can trigger in any chat with a forward slash (`/`). Instead of rewriting the same prompt or re-explaining the same process, you can publish a skill to your team or organization so the agent can use it.

Since [launching skills in the Figma agent at Config](https://www.figma.com/blog/config-2026-recap/)

, we’ve been putting our own skills to work. Here’s what we’ve learned, and what using them looks like in practice.

## [A second opinion, on demand](#a-second-opinion-on-demand)

###### /tip

Skills and design systems are complementary. Your design system gives the agent the right components, patterns, and UI elements to build with. Skills layer on the rest of your team’s expertise, from applying your brand voice and compliance guidelines, to critiquing work, following review processes, or even calling your design system as part of a larger workflow.

Skills can help you see work from a sharper angle. They can push on an idea, help you ask better questions, or critique a design through a specific lens. They can also help teams apply and uphold shared standards, from UX writing guidelines, to accessibility checks, to product principles. Here’s how we created some skills to uplevel our work:

-   **Simulate a stakeholder’s feedback style:** Feed the agent examples of how someone gives you feedback—public comments, past critiques, notes in a file—and prompt the agent to apply that skill to your work. We built one based on our CEO Dylan’s comments so designers can pressure-test their work before going into a review.
-   **Uphold UX writing standards:** Give the agent your style guide so it can take a first pass at catching inconsistencies. Figma's UX Writing team built one that follows our standards for capitalization, punctuation, and more, so our writers can focus on the meatier stuff.
-   **Get a new user’s perspective:** Run a skill to review an experience as a first-time user to help surface friction and missing context that is often invisible to anyone who knows the product deeply (e.g. the product designers).

## [Build once, use everywhere](#build-once-use-everywhere)

Some skills make recurring team rituals easier to run. They can help onboard new teammates, prepare project spaces, or give new projects a consistent starting point. The pattern is simple: if your team does something the same way every time, it’s probably worth turning into a skill. Here are a few worth trying:

-   **A catch-me-up**: Summarizes recent activity in a file or project so that anyone rejoining after time away can get up to speed without need to hunt through comment threads.
-   **A crit prep checklist**: The agent interviews you about your project to gather context like persona, scope of work, and crit audience, then creates a crit page with guided discussion prompts. We built our skill to reference Nielsen Norman Group best practices for research questions, ensuring discussion questions drive deeper conversations.
-   **A crit recap**: Takes the feedback from a critique and organizes it into a follow-up plan grouped by theme, including decisions made, action items, and deferred items. Our version of the skill creates a recap card that lives on the canvas or can be pasted into a Slack thread, so nothing gets lost and information flows to the right places after the meeting ends.

## [Connect the dots](#connect-the-dots)

###### /tip

Skills get even more useful when they can draw from the tools your team already uses. Skills work with [MCP connectors](https://www.figma.com/blog/agent-custom-tools-context-skills/) to let the Figma agent interact with apps like Slack, Notion, Asana, and more, so it can bring in context like PRDs, product data, research notes, or project discussions as it works beside you.

Skills work across both the [Figma agent](https://www.figma.com/blog/the-figma-agent-is-here/)

and Figma Make, so the same reusable workflow is always available wherever you’re working. With [connectors](https://help.figma.com/hc/en-us/articles/35440096186007-Use-verified-partner-MCP-connectors-with-the-Figma-agent-and-Figma-Make), skills can also pull context from the tools your team already uses—bringing in information, logging decisions, or updating external systems without manual handoffs. And soon Figma skills will be available through

[Figma's MCP server

![Abstract illustration of interlocking organic shapes in purple and orange on a dark green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACgUlEQVR4nAXBWU/aAAAA4P66PexhybLELdNQSu+Llra0peWoiBxyFSYgcgiJIqYcikMc4jXFTTc1y5wzLnNmiXF73D/Y9wGUveQCOzxoiXAkRTNpUnZjokG684wcIzQDzkbQhELAKvM0zxJhpOxFqjk+GGaVScQGCGBLBfc0+0EKW9oThRMZaogv3yqvP3vQLhdMOLoJRzdL+ir8VIvTTLSTwDttd6bIxylUAyT7hgYe+cEPRax1Jct//BOX+sRX79SdFxvyqXnHu7xjYNGmxYarRD3qGKXwviVWis66glYBFWrp9n2ffZxFNsdC6F5Dvyiuc1k9l7Sh0+zR5SGTP+Lia1Q1Cu14weMZZGRSvTi5ESHqwDxZmHUMvOA4Ao0sqjJ2hU7FwDdFvJA8Z8L0ncI/eshfsrDvTJRRKwkP0ljPJDfniF6aKgPbkrpANGLwsIC3B3zmUIiO3cZ9ALnVmWtF+qsjDyp5JXjOucApFzzkYoditC9m8/RaBFsBthWhyRc2xfkzzffDz5yoxpaYuvZzj0H7owHd68wOay6jKyMqfSvyN7Jwo4mXur7iLEeQBpBj401X7iogPcyCtwa1LmZy1GpfSv6eRv6FXnzXnHWsmbTtruOVj9zMFmu+dwdv/K6hNJfElwAZbtbY6oVXHWuenmDW2HKMqBfo6ieP/NN4fizTJaSVsh108doek14miy3BuPDx+8pskiwDTsgq0NWe5MmwoTdUzuJDaToWwettIdBWni1ycNqxGrftNvDSMa+1WC3D6BVnusQs+bBFgIAqcco0OYQlJ6MsuibhYSqso7UM6/FyT3jqVQBeMMANE0/1BWiZgxUsJMNNHek44cJ/7udjylpPwXAAAAAASUVORK5CYII=)![Abstract illustration of interlocking organic shapes in purple and orange on a dark green background.](https://cdn.sanity.io/images/599r6htc/regionalized/35f6fde4ce9f85257cecfcb6af666932842ab4af-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### The TL;DR on MCP: Why context matters and how to put it to work

Figma’s MCP server brings your design decisions into the tools where code gets written—so what gets built actually matches what was designed. Here’s what that unlocks for everyone who builds products.



](https://www.figma.com/blog/the-tldr-on-mcp/)

, so you'll be able to use them from any MCP-compatible client, extending the workflows you build in Figma beyond Figma itself. A few patterns for connecting your toolkit:

-   **Log and track feedback**: After a review, a skill can take comments and feedback, and convert them into tasks in your project management tool so nothing falls through the gap between design and engineering.
-   **Bring research into the room**: A skill can pull relevant user insights from your research libraries like HeyMarvin or Notion and surface supporting evidence to strengthen a design.
-   **Back a direction with data:** Feed a skill the right data source and it can pull relevant figures to support a design direction, sharpen a narrative, or fact-check a claim before it goes to stakeholders.

###### /tip

Not every conversation should be shared. If you’re working on something sensitive, you can always switch an agent chat to private.

One of our favorite updates to the Figma agent is that chats are now shared by default in collaborative files. Instead of agent work happening off to the side, you can see how teammates approach problems, which skills they use, and how they prompt to get there.

That changes how people learn. Instead of asking, “How did you do that?” you can open the chat, follow their thinking, and try the approach in your own work.

Extending your team's context and creativity is now easier than ever, learn more about creating your own skills in our [help center](https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make).

The [Figma design agent](https://help.figma.com/hc/en-us/articles/37998629035799) is available in open beta for Full seat users on Professional, Organization, and Enterprise plans. Collab, Dev, and View seats can use the agent in their drafts. The agent is free to use during beta. Play around in the agent [playground file](https://www.figma.com/community/file/1636475245178613559) or learn practical [ways to use AI](https://help.figma.com/hc/en-us/sections/41296947580311) in your design workflow.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAUGBwj/xAAkEAACAgIABgIDAAAAAAAAAAABAwIEABEFBhITIUEWIjJRgf/EABYBAQEBAAAAAAAAAAAAAAAAAAUGBP/EABsRAQACAwEBAAAAAAAAAAAAAAEAAwIRMTIE/9oADAMBAAIRAxEAPwDzdR4a2ystP0SDrqPs5uOUeDzVFrW00FSpCJb1bPnJnMs4JoIq1FyEYz/ID6j+5teTLZs8m36AVEvgstkzY2Rv1hlmbbVtOxavEwt0PJWhTHSNAYyhw0rfRTNc+qJiPOMEVHTHAE2Tj/E7rmVxXkQVBolrXvL3IzZfJUp8dt9di5j9jWMZR/QepOVeydERwarCqjt9yAlAEiMtDeMYwxJvFn//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/073950d4ccee875ad0f07674e396934bb828d735-2184x2184.jpg?w=2184&h=2184&q=75&fit=max&auto=format)

Sachi Shah is a product manager on Figma's Workflow team, shaping how teams work together—from core sharing and permissions to entirely new cross-product workflows. She earned a self-designed degree in Leadership in Creative Enterprise from Carnegie Mellon University and previously worked at Adobe.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEl0lEQVR4nCXN+08TBwDA8fvFR3uv3qt3vfbu2t71wfWu716ftCAtDwWEKj6YTlEHe6DDWR+zmyAqWgQKFW2hVRwTxC1m/rBlJks2p3NmybJflrhlcWZ/yuKWfH795gtU781W18q1tXJt/X/zS/cX6utz9fW5pfsLtfX5mcUL54rDF0unb342XV+bWX5jdmX9+trGNFBdHq/enrzZmLxVn1huTDTuXq6vXru9OrWyeuXOvdLSamnuRnFifPja9Nidxif3Vs6vNM7X68X1u8VHa0WgWh69NTc6MzUyfenYzZn3apUPb1QKlYVCZf6jhfKpcvlUuTRaGj80fXFo8dqRxSsHSxf2T5zbe6W4b35yEKhePTx3Yf8nx3tPHOsqjO4sFvacOjn4zrt79x3M7xnsGTq0Y3S4e/hw+1sD6b39sV094fzOaL4/3tkezLaowInDrUcGkgPbI20ZXyqptLaG0i1RfzTi8AaEJsWpylpzMNEa9gScdqdZ8dlbssHtvYlk2uuUecCv8F4PHwlIQb8kShYLx7hsbEKxpbyiSxJMnFlUnOF0WI0qomyNxOWu3njf7pbO7ngspQAuh1mWhajmTiY8iiraeeNOTSgNhmcOaCM5T4vPGvGKrdtCsdaQGnHH02quS+voTeS6E+lsEAiotlDYlcz4W3KalvS2RqSrB7Qnkz1PL/VsnMydzYd74672jBpJqXLIGW1WMtlAczaopVVvWAI8Mh/U5FgmmMhq8Yz/0A7/w3Odv80O/HI1/+Nk38KxTF/SFfLxkmwWXKwStAU0sUnleJFiLCgg2Gi3avP4JadXdCvCQFvTxpmOX6/vfjre/V2xq3I0mQtbTSxqoEADBVIswlhQkoEwQodgWwGSQWkLQbE4ZkQwCpYlaqzf/3Wx6/nFnm/O5C7vC6UUFsP0OnizDtqsgzeD6FYE0+G4niT1AEJAqBHBaAOCgzCqw3Ew5GY+HdQej3c/LGQLvd5tXo6jUQjaotNv0uk36eEtKA7SRkTkMQDGIYPRYLRQJIPjFEIaDayZyMakyvuZr4qdleHm4z2+qJvBUD0IbYGRrRgOMixmtVI+mQWMZtLE04LDLEgsZzcJEiuIbMQnXB6KP5vN/zS7e/l4S2eIp3AIx94MOY4QJZPkNHk8ZiAYlPwB0R+UVL+9SbW5FKtLFrpS7uWxtt9rg3803v78dEdbgCdxkCIhs8nAWXALRzIWnBUIoDnuimsOLSL5AvYmxepwcx5ZOLor9W356KuNsT/vj9XO5mMqjxn0FAGxNMLQCEnCOAkTNAqITpPNYRIkRhAZq52x8qTsYE8MbX/2YPKfJ5WXj2cWJ4ZiAbuRAGkSMhlhkxGmCIjAIZyAAFpAaSvKWFGz1SDwOGdCHQI1cqD9yZdTr180/npa+6Ja6O8I2TiMNcIMBdMkROEgiYMEDgI2N2R/AxYl1M5jHIM4BHJkMPv9g0uvni+9/nn5xaPSxx/0BWSzmYaNBEhgegLTkzhIEhAgNultLr3gAK122MahnAmRRXrsSOezh1N//xe//GFxuTSyLe420wiJgRiqwww6HNMZSfBfD/hCU475IEEAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5943061d69fe724a89331e600dc3f23e897e9f34-480x480.png?w=480&h=480&q=75&fit=max&auto=format)

Sean Lee is a product manager on Figma Make, focused on getting agents to sweat the pixel-level details. Previously, he worked on FigJam, Slides, and Figma's native mobile app.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)