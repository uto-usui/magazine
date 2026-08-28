---
title: "Workflow lab: Moving between design and code with agents"
source: "https://www.figma.com/blog/workflow-lab-moving-between-design-and-code-with-agents/"
publishedDate: "2026-08-26"
category: "design"
feedName: "Figma Blog"
---

_Welcome to Workflow Lab, where we present a [sample workflow](https://www.figma.com/blog/workflow-lab-deploying-designs-directly-with-figma-make/)_

_using Figma products and tools._

###### Workflow fact sheet:

**Figma products:** Figma Design, FigJam

**Tools:** Figma MCP server, Code Connect, `use_figma`, `generate_diagram`, `search_design_system`, `generate_figma_design`, `get_variable_defs`

**Team:** Product designer, design systems lead, software engineer

**Question to solve:** What if your coding agent’s output could be production-ready sooner?

The engineering team at Radicle, a fictional STEM learning app, is moving faster than ever. Work that used to take weeks now takes days, or even hours. Still, this speed isn’t getting them very far; their AI-generated code strays from design specs more often than not. The team gives their coding agent screenshots and dev tickets to work from, but it’s not enough to get the outputs right, and the team gets stuck reworking them.

What if the first AI pass came back closer to production-ready? Given more design context to work from—like approved components and tokens documented in Figma—a coding agent can match your intent in fewer prompts. In this example workflow, a developer at Radicle uses [Figma dev tools](https://www.figma.com/engineers/) to give their coding agent better context so it can generate better code. Follow along to see how the developer keeps a new feature’s design and code in lockstep, from the first wireframe to final review.

## [The problem](#the-problem)

The Radicle team wants to refresh the inbox where students can message instructors and fellow students. First, they plan to add a new bulk-update flow, which will have three surfaces: a toolbar, a modal, and a toast (a temporary notification). The toolbar will let a user select all their messages, delete them, or mark them unread; the modal will ask them to confirm or cancel the action; and finally, the toast will show if the action was successful, with an option to undo it.

The team’s designer creates each screen in Figma Design, and the developer on the project feeds these designs into their coding agent. They get code back fast—but the UI is off. The icons don’t match, the modal’s spacing is uneven, and the toast is missing its failure state. The developer could spend the afternoon reworking it. Instead, they take a step back and start over with Figma’s dev tools.

![Dark-mode conversations inbox showing a toolbar with select all, unread, delete, and sort controls above a list of messages.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAACE4AAAhOAFFljFgAAABS0lEQVQokZVS23KFIAzkD6oiCgh4P7ad/v/v5cxGwtH2oXMedqIk2c1N/Xzu9HXslGKkVrdUfVRvQzeabG+p73pSc4o0pUSD80xYV/XbhE3dkGkN5ytnHQUfyDtHpj0JAQT9BxFvMiEqVa53NKeJ4hCo1ZqD4LRdz20AzgKu/PNbb6kzHZOBCO0iT3nr6Vg3WsepqCAh+IFFYogUQ7b4F4RIPo8JACEEFGb3/ThomxfqzIXwmizE2cI3+IHjdKNLhUzoraNjf9A8jqyEFuCEOsSuVgAiJEu8bvR9Kfu68tnAgQAEY24Qg18sILOSpdR5gYUQatuyUArhRdgaHjqT5aqE8Hd1dVVznrxxhdu60ZhSCSoVuldlQn5+Y9NnpSBDXiGEY54mHvS1ZbzfzuR2NqcPcbIULBRnp8AqzmsLJp8DqviL8106ksXAPgEEuC217NYJNgAAAABJRU5ErkJggg==)![Dark-mode conversations inbox showing a toolbar with select all, unread, delete, and sort controls above a list of messages.](https://cdn.sanity.io/images/599r6htc/regionalized/62780457957c344884778b098d94ea00a9fe577d-4306x2632.png?rect=0,1,4306,2631&w=1080&h=660&q=75&fit=max&auto=format)

Radicle's new inbox toolbar lets a user select all messages, mark them unread, or delete them.

## [Planning before prompting](#planning-before-prompting)

Before writing any code, the developer outlines the intended behavior of the screens, states, and transitions that define the new bulk-update flow. They feed the outline to their agent, along with the PRD and the code for the components that make up the inbox today. Using the [`generate_diagram` tool](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#generate_diagram) with [**Figma’s MCP server**](https://developers.figma.com/docs/figma-mcp-server/), the developer then creates an editable diagram in [**FigJam**](https://www.figma.com/blog/figjam-your-coding-agents-whiteboard/)

that illustrates the flow across three surfaces:

-   The toolbar’s “select-all” option checks off every message
-   The “delete” option opens the confirmation modal
-   The toast’s “undo” button refreshes the dashboard to its previous state

The diagram provides additional context the agent can build from while also giving the team something to react to before development begins. The developer shares the FigJam with their design counterpart and a design systems lead, who both leave feedback directly on the diagram instead of a Slack thread.

## [Giving the agent a system to build from](#giving-the-agent-a-system-to-build-from)

Once everyone signs off, the developer feeds the FigJam diagram to their coding agent through [Figma’s MCP server](https://www.figma.com/blog/the-tldr-on-mcp/)

, which gives the agent access to the components, tokens, and layouts in Radicle’s design system.

If the developer just had a screenshot to work from, they’d be digging through the codebase for the right component, or pinging the designer to clarify details: whether that 12 px gap is the right spacing token, whether the button is the secondary one already in the repo, or if the modal is a new pattern or something the team already shipped. Instead, those answers are all in the file through Figma’s MCP server giving the agent all the design context it needs.

![Flowchart showing bulk conversation actions: mark unread or delete, with confirmation paths and design review notes.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAACB0lEQVR4nHWTS0scQRSF/f/rhAQhGxENCmJCVskmIUIiRp1Xz3R3dde7enp6XpoxaiDwhW6fIzOLC1VU1VfnXs7ZCCHgQ8A5h9Yaa22zD2uqPs/zHCEyRHZX9d4Y05xv1I+VC6TaI5RFGYfz64HGKETaJxl0SZOIJBkgRNqI8d6zUT/uqCFHacUPUXEuK4Qr16j0BJvgxRE+/kwQ3/CqizW66fBRYaRHfBUzviQXfM/mRLbCrQGWts1E7DMbbDIXu4ztCUW4gz0Cc1vQViNO8orTrCRWAXv/40tg5Vpcqffcyjdcq22m7idFsE/AWqrSGqlNM79caUSWY7ReDfQ9FuYjN3qbP+aAiT9dBlpnkVpimjl4pLYNUCtN8H5Fy13G4gOzeIt5fsDYnS63HBcpfR+TeEFiHe20oNe3yMzh3YoZmhaTZId5/zWXWd3y8bLCk9E5x8MzWmWXyGlaUUXn15S0M8GqcsUM2yzUPrdyk2u9y9S/ALZHPVplj2g4IHOGtF8RHc+Jz2YYWRKWPOkZuR6X6hNXcoff+pCxOyM8b1kXGlUYdDBoY8hTS9obkg2GGO0bsy7PsMMkPWA2eMdM7N3b5pnCxqz30ZNSkucSrRzWuCZOddQe7jQK7TkXYpdF/IpFtsXUvrDNw+IBeBehOt++Adb1pNIzdi1uzB7/zFv+mm3mfhn4H2ONq8Aq/ByZAAAAAElFTkSuQmCC)![Flowchart showing bulk conversation actions: mark unread or delete, with confirmation paths and design review notes.](https://cdn.sanity.io/images/599r6htc/regionalized/40a7948603a0bf3d91bf3694f1c28046a2d7d42d-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

The developer feeds the agent the FigJam diagram along with Radicle’s Figma library, giving the agent access to the right components, variables, and layouts.

![Three mobile screens for the Radicle learning app: branded splash screen, login and sign-up screen, and course dashboard.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAADQUlEQVR4nFWTXU8cVRyHudCYomlMyu4sOy9nZmdnZudlZ3dZGovdIihgeFl2xdpWm2DBlWXp0pZaarUgMdGaNFIjCkjsjUFT29Q0Wr2w1htNmhjv9VY/gH6Fx8xwoV6cnJOT/H/nyfPL6TA1nayuYxkCocjIaRVNc9CFhaaoqGkZXVUpGgpPZFL0ujb1iSrn2qe5eH6J5aVznJ5vMjo8jGtZdGSEIMiZlAs2pq4iqxbC6UeYB0lJMlIiiabIeLpMyeim/2CZs+02O1sfc31nm08/2Wbjg2vMTE+Tdz06MprAMjR8x6AY+pTLfVjeYRTNI53qpluSUGQZTZYxhUq5UKBerdKYnaUxO8PMy9O8dPw4g/1PkctGhJogLaViiv7KESbGx/G9PEo6hZ1J4doGruNgZS10oaMLgZdz6SmW6CkWCXwfy8xiaIIoqyM6pJISqqzwzODTPFerkfd91HQCNysR+lY8WAwLmEYmpo7cGroRhyuygiRJ8b2hav8GClXj2eFhjk5NEQYhqWTkLkXOsSgVC5QKBSzTROlOx4NRkRGRrihoUXGKgvlfwujVkaEhjj4/RZgPSXYlkWWFnB/gBXksy0PTbRwjS61ymHZ9ksWpWrw3q+OMPdmHl83uOYwCI+T+SoV6bZJCfo/QtjT6KiHlXgfPy5Hzi/T19LJ8ssHu6jo3397g9jtb7K5tcOZEg6Ib/N/h4MBAHBh4PqZIUB9KcKkpsdI6wOX5NMvNDLMv9tJ4ZZWLl75lZeU+b639xBsr93nh2CqBW6Qj8hHRObbNxNgYteoErpOj5CS4cupxfrnWyW+bj/D79j5+/fBRNl93efXCmzTevcv81R9pvf8zjSv3GD15GdeLAjURN5YvhFSOVKj0HSJ0XQZ8je16F38u7eev5U7+Pv8wfyw8xK05k6vvnWXrq122737D5nffs377DqeWXiMMw72fYls2Xj4gY5qYQhDaNgOeydqhBD+M7ufBxGM8GOvk3tA+PhrPsr7a4satHb688zlffH2T6zc+Y35xgTAIolJ0MsLA0PXYo5pOk9E0AkNQdbtZLHVxoXwgXu1SF8fKJicmx2jPNznTarG4sEBrbo7RkRFylsU/o6LCMxEJEX4AAAAASUVORK5CYII=)![Three mobile screens for the Radicle learning app: branded splash screen, login and sign-up screen, and course dashboard.](https://cdn.sanity.io/images/599r6htc/regionalized/3b1fa1157c28aa908f2b6bd384b22d644ac452ae-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

## [Connecting the design system to code](#connecting-the-design-system-to-code)

Knowing which component to use isn’t the same as knowing how it’s built. That part comes from [**Code Connect**](https://developers.figma.com/docs/code-connect/quickstart-guide/), which Radicle’s design systems lead sets up. Starting in Figma, they connect the library to the team’s GitHub repo so each component points at the file that implements it. Then, they write template files for components like buttons, icons, and modals in the codebase, mapping Figma properties to code properties.

Now, the developer prompts the agent to build from their Figma selection, and Code Connect identifies which component to import. Instead of burning time and credits writing new code, the agent starts from the implementation blueprint that already exists.

![Figma design file showing Radicle dashboard components alongside inspection details, component behavior, and connected React code.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsTAAALEwEAmpwYAAACO0lEQVR4nFWRTU/bQBCG/V+b9NCeK+794Bc0qBzLiSZtgKZCFQcqkHACCaSQxISQ9drYu5sE/O31ftiOKjtBKqNHo3dWendnZpU7YzwANxfjrqqdq1rnbNg+G6rqqK1qHVXr9MZ9aJl+ELLnSBiLKTUX+OS2p9zenlxft7qX3zu9RrtXVy92z853291vnV6902v8HRwhDCilUso0TbMy0iwL4miCoDIZnWr9w2H/56jfGvZbg6uDm8v9wVVRjvqt+/HpYm7GMWWMCSmzPM+XyzxfciGeXEeB0zt4r8HpyACaATQIRnA6gmBdIgu4rhPFSZywhAnGpZCZTHPGpet5yu/Do9bBr/29/WZzr/mj+YJm8/j4j2GYYRQnjCeM04QxLoRMuRCe5ykf3n/aeLfx9s3b15Vq9VWlUrIS1Up18+Nm96Lr+z6NKY3jAlqMkCSJ8+Qo9Xpj5+vO9pftrVqt9vklta1GvTG5m0RRRAtvvDInSaEfF48KnBo6gADoOtDB/0yLbFm27weccyHE6qs451JKxpjjOIptzpA1w2hG8BzjeSmKcsVi8RSG0crMOWecp2ma57kU0nV9BQIMITIMpEMMdKSvNQI6ghAhNPe9YN1suawsy5bLpRTSc33FMEiBSaBBdINAc61BeYjxYxBECWWciSJkYS5elrLYtm0R2yIIvcB+zmS+CIKw+GJe9l3ekaYpX81smcR+INgmGBOCi7yCYGJi+2GOXN8rF52EEQ3jOKKMMhaH4XxG/gHqmaEMRCjo1gAAAABJRU5ErkJggg==)![Figma design file showing Radicle dashboard components alongside inspection details, component behavior, and connected React code.](https://cdn.sanity.io/images/599r6htc/regionalized/75a410c0c97c35b54ee99a494113bb8ec688f930-1608x1072.png?w=1080&h=720&q=75&fit=max&auto=format)

Code Connect links the selected Figma variant to its React implementation, giving the agent a component to build with.

But the bulk-update selection state is new, so it’s the one piece Code Connect can’t map. Before building it from scratch, the developer prompts [`search_design_system`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#search_design_system), which looks across the team’s Figma libraries for an existing selection component. The agent identifies a similar one from a feature the team shipped a few months ago. From there, the agent finds that component in the codebase and adapts it for the bulk-update flow. The result is on brand and consistent with the rest of the Radicle app, and the agent doesn’t need to invent a pattern the team already built.

## [Catching drift before it happens](#catching-drift-before-it-happens)

The developer moves on to coding the confirmation modal. But while they’re working on it, the design team makes two changes: the modal needs to be a darker brand color, and its button has a new corner radius. The designer publishes the update in Radicle’s library and flags the changes in a ticket. Instead of making the changes manually, the developer asks the agent to check for drift.

They prompt [`get_variable_defs`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/#get_variable_defs) in the coding agent, which returns the variables used in the modal, now reflecting the designer’s changes. The agent compares those against the tokens in code, finds both mismatches right away, and updates the modal.

![Code diff updating the Radicle red color token from #FF7A45 to #E95000 in CSS and TypeScript files.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVklEQVR4nH2STUgUYRjH5xgR9EFE0CXo42JQEuUhunirQ0SaHcolthVzFD+qQ6TYKSxCEL1oYQQhQrSIdu7kJ257i3J353Nnd+Z9Z8bZ3dl535l3vjZmMNEO/vidHvi//+eFh4JQBQDIsnKgMgSgVq0hhDG2d6VUqEIAlAMBCtjWdateJ4S4rud6O1L7g/I/9wEBMAzDsizbtrHtoEiCHZeSY/ZHdt+LR9HOsFKtWpZlIVSpo20TbZvYsByK21wTMqvizxUxsyJmlvnNZT6zKmZWi9mNYnZDzK6L2fXSn1+GpmGEsW1b2DGRXUNOHRPq99TLwuRzdqKPGX/KvHuSH0vm3nax7/uFidfi5BthYjQ/NVJYmlOLoo1t13V9z/f8Hanci9bi4PVy76VS98VS1/lS6pyUuqB0t6j9HepQEva38YO3cp/GAJO3TOTZJPSDMAzDRiNsNCiuu0l5fAY+OgEeHoedJ2HnKZg4rScv6333tcGUTt+Vem4yH0ZBYaterRMTB44XBmEjhuISZ8sdR+W2Q5Hth+X2I3LHMZho0uh72kBSo+9IPTeYmWGN3cIIu9jxbRJ6fhjXU1vPWtm+axx9haObObqZpa8yvS3C0G1puKs0OiC9SjLDDwpfxnWBIYT4rusTEnhReRTOL8wW0jPMt+nI9HQ+/TGXni0sfGYX57mlr9ziPPN9jl/7YShll5AgCHzPC3w//nWDKvHcXiWBj+Q5iWeLAqdIIixLqlyu6pqDURDEjTFROD6J/4zupCiXWSCphl4za5VKxaxWMEae5wV7+AsDoH6jco2QZQAAAABJRU5ErkJggg==)![Code diff updating the Radicle red color token from #FF7A45 to #E95000 in CSS and TypeScript files.](https://cdn.sanity.io/images/599r6htc/regionalized/5077c6268db5f84188c91c9ed2a2a5bfeb992c3a-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

The agent checks for drift, finds the stale repository token, and replaces it with the right color.

![Figma inspection view of an orange “Sign up. Start learning.” button with spacing, layout, and color token details.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJklEQVR4nH2S2ZKEIAxF5/+/VLslkISwBXAKKdvpbU75oA8n9xL52fe9tRZjZGYvEmJMKdVa+3f2k58piwgAGAPGGAAIIuVAVVtrH819yrVWZl7X27Ksy7Ku682CRWKHxORTKkVrzmNWPRq9yt57AAsA1lrr0CE78taRRWaJEqKXQUpJVWutT7J4j84ROkIcDxExE/PIZs/sH4QQSikz/0q2YKzZrNnA3C1siI5Oxi5P5FjHkywyZDAbwGbgDi/yFew/yZ5HMmzOAqLD2fwt1r/LrdUYBB04uzFjCCEehIP5Pj9FJISgqpfce085ESGRizHUT6hqznlOUdVr26c8SDm93IRJ732OKKW08av+JOec+WCe5x9qq609y6o6Kz0uwDdGr7PaL42V9IRBlgt2AAAAAElFTkSuQmCC)![Figma inspection view of an orange “Sign up. Start learning.” button with spacing, layout, and color token details.](https://cdn.sanity.io/images/599r6htc/regionalized/c849b8688a6e79733fdc24fe7b854fdd0bd4e8d1-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

## [The path to production](#the-path-to-production)

The developer has finished the toolbar, the message selection states, and the confirmation modal—all three from components the team maintains. That leaves the toast, which was created during the build, and so far only exists in code. It still needs a failure state. The developer prompts [`use_figma`](https://developers.figma.com/docs/figma-mcp-server/write-to-canvas/) to put the toast on the canvas as editable layers, and the designer adds the missing state with a “retry” action. Then, the design systems lead publishes the new component and maps it to code with Code Connect. The toast now works like everything else in Radicle’s library.

From there it looks like any other release. The developer opens a pull request, and the diff is mostly feature logic. Engineers review the code, and the designer checks a preview build.

Figma’s MCP server and Code Connect give the agent access to the same system everyone works in, so the team can sweat the details that shape the user experience instead of reworking AI-generated code. More time building means better work, not just faster work.

Start giving your agent better context by installing the [Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) and connecting it to your coding agent of choice. [Set up Code Connect](https://developers.figma.com/docs/code-connect/quickstart-guide/) for the components your team reuses most.

Read all our blog posts in the [Workflow Lab series](https://www.figma.com/blog/working-well/) to explore other ways of working in Figma.