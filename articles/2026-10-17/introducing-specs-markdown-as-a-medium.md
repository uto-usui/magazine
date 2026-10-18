---
title: "Introducing Specs: Markdown as a medium"
source: "https://www.figma.com/blog/introducing-figma-specs/"
publishedDate: "2026-10-15"
category: "design"
feedName: "Figma Blog"
---

Turn existing Markdown into a spec by dragging and dropping any .md file onto the canvas.

Today, more and more product builders are working in Markdown, as collaborating with agents becomes more standard. It’s the de facto format for sharing context. But for all the context Markdown helps us express, it’s missing a lot of context, too. Markdown files tend to be single player on local computers, with brittle relationships to each other, and little tying them to the projects that spawned them. While most context is ephemeral, some context evolves into key inputs that need refinement over time and collaboration. That’s why we built Specs: a multiplayer container that allows context to fully express itself and move into, out of, and across Figma.

Specs contains your shared decisions and references your work on the canvas—diagrams, code layers, designs, and more. It has collaborative, unique-to-Figma features, like the ability to embed a FigJam file, a frame, or any node from the canvas right in the spec, so text and designs sit side by side instead of living in screenshots or stale links. And since [the Figma agent](https://www.figma.com/blog/3-ways-product-designers-use-the-figma-agent/)

can read and reply to comments, you can collaborate with the agent the same way you would with a human collaborator.

With Specs in Figma, teams and agents can bring written intent, visual explorations, and technical details together into a shared plan to guide agents from prototype to production.

[![Config India launch recap showing collaborative app design, a “Build this with code” option, and an AI prompt to add a bookmarking feature.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADC0lEQVQokR2Q20+TBwBHv39FQnrFfm2/XqkZMC8jihNFJaNYWIVGmWLBohKWsbGlzulG4qLzZXvYgwlTCHUbrqUWgVELhuG4aESqvd9pINuezwIPJ7+3k5OfIEkGbOY6aq1H2Gc6gFEyo9dLGC3VVNe8j632ALadrdmPteYQtoMNnG5tx+Ppo7+/f5fu7m4ajjYgGSSEHWGN9QMaa118+J6TamMtksFI/dFjuK8O8OlXX3NtcIiBIS/ugS+wn+9h6JthgqEQCwvzhCMRHoz7cH3ShclsQmhxNOFwtHDOeYFzZy9yvOkktrr92D/u4P6Yj/DSMjPPF3m2tMz44wB9A4N8/qWX3ycmmJ2dIfR0mp9GHtC2I7RYEHz+e4yM32Zk7Dajv95l+J6XU21ttLm6GJ/w8zadIZ5JkcxmmZueoc/dS2PjCc44HDjPOmlrb+ek3U7d4XqMJhPCRmKKN9EwG9EI8dRz5peCeG/dwHOlnwn/JIlsjnQ+RypfIPznHD2XerBW70MvGXa/1ooioiii0+uRJAkhllwkX0hRKpfY2i5T3MwRCPgZvn6dKZ+PTCpNrlQiWywQjszR0+vGbDajUVftslelQq2Qs1etQqfTIiQLq2Q3S2TL/1Lc+o/trW3mw2Hu3LxJ6OFDMokE+VKGfPoFi9M/cmuwGWeTBvthOa1HFJw6qKDWJEPSKNDrRITCPy/JbmVIl0vkykXeRV8z+ssIXu8N/IEQmXyWUnGdfNTH8h8XGf3Oyg/XKrlzeQ93PRV4z1fSXC/DrFch6bUI8fJLEpsxkuU08VKS4EwQz9UrXHB78AVnWU3mWE9GicfmmZv8nm8/O0bXR2o6j1fSeUK2W1lnVaIVq9DpdAgv3r5mLRlnPZfjVTrD/Ue/0XzGQUdHJ77HT5hcyzGxkmUlkWF2forevm4sFiMalQKNWoVaqUQuk6NUqhBFLcLCqw3+ehNjJZ7h73dpfh57xOmWVlwOO4HxUSJrCZ6splmNx3ga8XHpsgvJYEAhU6CWVyGvlFOxpwKZTIZGI/I/ySU2D6XblwkAAAAASUVORK5CYII=)![Config India launch recap showing collaborative app design, a “Build this with code” option, and an AI prompt to add a bookmarking feature.](https://cdn.sanity.io/images/599r6htc/regionalized/6fb8bfd609660ecc0fc8729137a58c451db49fe1-3840x2160.png?w=3840&h=2160&q=75&fit=max&auto=format)](https://www.figma.com/blog/build-by-design/)

###### What’s new with Figma MCP

→ MCP now reduces errors and token usage so teams can move faster and more efficiently.

→ Agents can generate images, create code layers, and run Weave workflows.

→ [20 new integrations](https://www.figma.com/mcp-catalog/) bring Figma context and capabilities into more of your tools.

To create a spec, just press ‘D’ on your keyboard or click the Specs icon in the toolbar in Figma or FigJam.

Specs is where your design intent takes shape. Bring in outside context with an agent, work together to turn rough ideas into a detailed spec, then send it to your coding agent using [Figma’s MCP server](https://www.figma.com/blog/the-tldr-on-mcp/)

, or build a code layer on top and refine the spec as you learn.

For example, Figma Software Engineer Noah Finer created a spec to give context to his coding agent when he was building the Specs feature. He first wrote a spec mapping out guiding principles for edge cases, embedded diagrams from FigJam to show the flow, then shared it with teammates for comments. “After the spec was finalized, I provided it along with my coworkers’ comments as context to my agent via the Figma MCP server,” he says. “As I made progress on my code, I used MCP to update the original spec on the canvas. I also continuously had agents use MCP to create new diagrams in FigJam, embed those in Specs, and send them to coworkers handling code review.”

![Prompt to write a bundled delivery technical spec using GitHub, beside the resulting spec document.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABoklEQVQokY2SW4vbMBBG8///VUthH9ZpAm7WwfFFTny/25JsuQ2cYqdburCFPBxGCHTEzHw7rTXPotSKQq9Vq+1umqYH84Pd0zKtGaSiGSRNL6l7STMoejWj5gVtfm7sPvzyP/SEVJpWzpTSUIyGbDDk40KtftHPd6S5o5b7QyilZBgGxnH8W9/PK3KUD6FayEeDn/c4cc05rrjEJVFWkRQ1SV6yW2fSNA1FUWzkef7hXJYlfd+j9ESnF26twjqHfNmf+GrZfHs98nq0OdonrP3hIey6bpO+07btVuu6Jm96klZTjxONWoi7GVvkm/TgBNhugCduXOMUEd3YrTNa257nGWPMB2ZjSAbDS9hz8DPiRnLrZk5Rwd4J+P524RxElE3HtL5Z/lnKZ8KVapix3ISXo0OQNVw7swmtk4dlO5xcn7SoGOUaoz+xWdv+nHVhirKqidOMtFXE/YKb1Jy8K44vuIQR4hoTJylZlj+bQ7VtuVaGpDe4cckPN+TshVwCgReEBGGIEOL5YI+bcCEdDF5S8XYRuL7ADwVhdCWKIkQk+A3IDT9GXq7DRwAAAABJRU5ErkJggg==)![Prompt to write a bundled delivery technical spec using GitHub, beside the resulting spec document.](https://cdn.sanity.io/images/599r6htc/regionalized/bbbca76b8e9aa644e38e72e1eb45083513d3e8a4-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

Draft a technical spec based on your codebase with the GitHub connector.

![Prompt to analyze a delivery metrics table using Hex and leave a comment with the results.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABjUlEQVQokYWSW0/CQBCF+f+/xReNKbeC0G0pt3IxkBIQaSuWi9CKFHw85gyhwUD04WTPtjPfzO5spt1ug2o2m6jVarBtW3yr1folxlx6xliWJaI/czJnU6/XoZSCYRgC5r7RaMg/x3FEl54Q0zQlh7FXQCYTVqlUpMtut4vBYADXdTEajURnz7XX60lh0zTTwjeBVL/fx2zmIQgC+L6P+XyOMAxlXSwWWK3XmEwmUlgp9TeQAcPhEEHwhul0hpfJNAW+hyE22y2+9nt4nic56j8gj8BjEUBo4AdYLpdYrVaiTbzDxy7Bq+fLgGqWdRvIi61Wq1JxPB4jjmPs9wmSJMHxeBQdDkeEn99wghiNZ1dybNtOJ58C+YGd6bqOcrksF84OoygSMBVFMbZRjNF8g3vbxZ1WQrFYlMHcBLIzBhQKBemUz6LT6aRynNPadHrIPyk8PGpS/PLJXAEJy+VyyOfz4in6s1jQqBqwlIIyDHnUBN7skANhEoFUNptNpWmaiJ5FdL2EUukk5l0O5QcAXu1W9RcPNwAAAABJRU5ErkJggg==)![Prompt to analyze a delivery metrics table using Hex and leave a comment with the results.](https://cdn.sanity.io/images/599r6htc/regionalized/55441e5a560346ce7e34eb77d75ce48175116897-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

Prompt the agent to run an analysis using the Hex connector and leave a comment with the results.

Connectors help bring outside context into Specs too. If you’re drafting a technical spec, for example, you can pull in context directly from your codebase with the GitHub connector. Or, say your team uses Hex for product usage data, and your PRD has an open question that data could answer. Select the question, add the Hex connector, and ask the agent to run the analysis and leave its findings as a comment on the spec. The answer lands in the document, right where the question was asked.

You can also drag in content from the Figma canvas, like a design exploration you riffed on with your team, or a diagram of a proposed user flow. Then, when you drag it back out, you can still preserve Figma properties.

## [Move between materials on the canvas](#move-between-materials-on-the-canvas)

Your specs live on Figma’s collaborative canvas, next to the work they describe. Drag in an existing Markdown file onto the canvas, or use Figma's agent to draft a spec alongside your designs and code. You can duplicate a spec on the canvas, so each person on your team can work on their own version at the same time before aligning on a direction.

Mark Harvey, Staff Product Designer at Intuit, works with the Intuit Design System and is designing a new set of icons. To document them, Mark adds a spec right next to the icons on the Figma canvas. Each entry captures an icon’s file name, category, search tags, and description, so the team can review the icons and their details in one place. “It’s very helpful to capture it in a nicely formatted way,” Mark says. “With Specs, bringing in a structured, formatted document that’s consistent across every file makes design files much more accessible and easier to follow for non-designers.”

![Creating components with agent in Specs](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB6UlEQVQokY2TS08UQRRG+f8rt/4EEo26Y2EgCBEkTuIg6PCYgenHVD/qXV1Nd7s4pnuQRGLUxclNLercW19V7cQY+R/atkUWirO9Uw5fH5AvU9qmRVeWq/kN32bfqQvFztOm9g+SZ0JdaebHc87ef0IkG5oQscqTrjes7zKMclthiA/Y2D1hmg4XO+JDR9dtGYXeejapILlPkLXEuYCzHqkrpCrxLozCFhM7hO/J3TCR2h7hBlz7g64f6Puetn0guIjRAa0d1ni8ayaJ9QrrJcFPwogNEaE8ubTktSUp9VS1DTRNM003NvamxVQRVTSYusHbODXxdjtp8M1W6LynrmuKskQUgjzP2QiBVGNnT5hybAk2YmWkuFek1xtUYXDKUyQl2WqDkY8ZjlOE4AkhTNU5t6WJZLZjJRuk8TQ+4k0gu81YzBaUSYkuNcuL5bSWQrEzHmdkDH7MahgG+pF+wHcDX0XD/kXK9X2GG3MzESk0Yl2iCouVgSqXFGmJ1Y8T/noWzxlvPykNs8sbbpZ305urUkOZKXTlKVNDdluSrwT1RuLs46X8jeA9Skq0NqhKs/h8xcXJJfmq4PrLksO3R+y/OmB+fD5J/yn87aeUitnBjJO9U+4XCecfz3nz8g27L3b58O4IsS74Cb15O+SvloMiAAAAAElFTkSuQmCC)![Creating components with agent in Specs](https://cdn.sanity.io/images/599r6htc/regionalized/d89a510a2d9768f462349e3355890e600a37c52f-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

View design systems components and have Figma’s agent document usage context in a spec, side by side on the canvas.

> With Specs, bringing in a structured, formatted document that’s consistent across every file makes design files much more accessible and easier to follow for non-designers.

Mark Harvey, Staff Product Designer, Intuit

As you riff with your team, you can fluidly move across primitives. Use the Figma agent to turn a PRD into designs, prototypes, and code, or turn designs and code back into a spec. If your team is exploring with [code layers](https://www.figma.com/blog/design-together-with-code-layers/)

, which bring working code onto the canvas, select `Extract designs` to convert its current state back into editable design layers. You choose what comes over: a single screen, a specific state, or a full flow. Add annotations on intent, and once engineers have weighed in and marked the frames as ready for dev, keep them next to the spec so designers and engineers are aligned on exactly what will ship.

## [Codify a direction](#codify-a-direction)

When you have a ton of context, it can be hard to synthesize it into clear next steps. Whether you’re trying to distill an engineer’s annotations on a screen, a code layer detailing a new design systems pattern, or even feedback during a design crit, you can synthesize those inputs into an editable doc that sits alongside whatever you’re planning. That way, anyone can zoom out and see structured, written artifacts alongside all the relevant context.

When Figma researcher Mike Blight is exploring product directions, his collaborators push and pull on the options with stickies, comments, and annotations. Once everyone’s feedback is in, he consolidates decisions in a spec, including the questions the team is still working through. Then, when they’re ready to start another exploration, they have the context from the previous brainstorm as a jumping off point. “That's the flywheel for me: Explore together, consolidate what comes out of it, and keep the work moving,” Mike says. “Having Specs on the canvas gives our thinking a durable place to land, and a starting point for what comes next.”

![TK](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACAElEQVQokVWS6Y7VMAxG7/u/HBohGBDMdpfetE2TZm2Wtgc1AwP8+GTLlk4+2zl577HONbl/8qMeQmhqufct+hCIreZQWjMpjZkNug+IH4mT8wFtHFLNSD0zaYOxlhgjOWdSzi2PfmZxkhQNS4w45zHGNjnnCC7iTebkfWCUE+fLlbfLlVt3Z1KKZVlY17Wp5ETxHXX+QnUXnPYM18DQBewc8MFjFovMilOIEaUUXdchhEBKibWWnNJv4EYtiTXcWNUDdXxmPjuuj5n7cyGYSioZmRQ//SunYxxjDNM0Mc9zs3/sKsaljVtKpdZCLY7i7pRzT/xuUa8JNRaWWEg1MydLF/p3h7MxjOP4AbX2gIYP6OHAVocMI6aThLNm0hN9nJiSZlwmRByZFv3XYd/3DOOAmg3SRkabsDGTSyWWhEgjT/6Vzt5RTnH21zbiOd549m+t16fxHXjs7HCotML4yIvKfBaFu11JdSPVgimWIUl0nvElMCyKix+4h4l+ka1nq/0feIxsrOeiFh77hLCFVFbqWqnbSt3+xBWdKk868zJnTK6UrbLu6zvw2NtdiHbpoR8ZBo0YTasvi6eUwrZt79p36rYzxJ1P/crDcMB3th32fed0/Lfjqoc70QvEvae7SMRtQktBsAM5xQbN5bh6IdeKjCtfp41vasPmvT12fLNfc/dKm2iTKTAAAAAASUVORK5CYII=)![TK](https://cdn.sanity.io/images/599r6htc/regionalized/0d1d3358cc87c9238ea116581c794db43bdaed01-3840x2160.png?rect=2,0,3837,2160&w=1080&h=608&q=75&fit=max&auto=format)

Use Specs in FigJam to brainstorm ideas and collaborate with your team.

Figma's agent can collaborate, too. Because it can read and write comments in Specs, you can ask it to reply to every open comment on a spec with a suggested fix, while teammates weigh in on the same document. Each conversation lives in its own thread, so you can run several in parallel, the same way you would with people.

Once Figma Software Engineer Kat Busch is ready to share her work broadly, she organizes her work in a spec, which her agent can then read as Markdown. If, for example, the name of a feature changes, she can prompt the agent to make those updates directly to the spec. “It's the easiest way to be able to collaborate with an agent on something I want to share broadly,” Kat says.

## [Ship it to production](#ship-it-to-production)

Through the [Figma MCP server](https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/), agents like Codex can read a spec and see all of the context it links to.

Once your team agrees on a direction, you can hand off a technical spec to your coding agent to implement. Just copy the link to the spec, and add it to your prompt in your coding agent—all of that context, including Markdown, references to frames, diagrams, code layers, and [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect) snippets come with it.

From the first idea to the final build, Specs gives your team and your agents one place to shape the plan, and the context to act on it.

Whether you’re a PM capturing a PRD, a designer documenting decisions, or an engineer scoping an architecture change, Specs equips everyone on your team to explore, plan, and implement with full context.

Specs is available on web, desktop, and mobile, rolling out in open beta to paid plans starting today. [Get started here](https://www.figma.com/specs/), and learn more in the [help center](https://help.figma.com/hc/en-us/articles/44049066011671).