---
title: "Ask LukeW: in Your AI Tools"
source: "https://www.lukew.com/ff/2171/ask-lukew-in-your-ai-tools"
publishedDate: "2026-11-11"
category: "design"
feedName: "LukeW"
author: "info@lukew.com (Luke Wroblewski)"
---

To date, the [Ask LukeW](https://www.lukew.com/ask/) feature on my website has answered more than 17,000 people's questions about digital product design. Each of them, though, had to make their way to my site for that to happen. Going forward, they won't have to.

More than a [billion](https://www.reuters.com/technology/chatgpt-app-hits-1-billion-monthly-active-users-record-time-data-shows-2026-06-02/) people each month use AI through tools like ChatGPT, Claude, Cursor, and more. An ever increasing number connect these tools to their email, calendar, and apps. Now Ask LukeW's product design advice is available in those places too, through both an MCP server and a custom agent.

The [MCP](https://www.lukew.com/ff/2103/mcp-model-context-protocol) (Model Context Protocol) format is a pretty simple and increasingly universal way to connect AI assistants to outside tools. Adding Ask LukeW just requires finding the "Add MCP" setting in your favorite AI tool and plugging in: [lukew.com/mcp](https://lukew.com/mcp). No account or login needed.

[![LukeW MCP retrieval sytem diagram: keywords and semantic](https://static.lukew.com/asklukew_ranking_mcp.png)](https://static.lukew.com/asklukew_ranking_mcp.png)

Under the hood, the Ask LukeW MCP supports two ways of searching [everything](https://www.lukew.com/) I've published over the years: keyword and semantic search. Keyword search finds exact words or phrases, which is useful for names, quotes, or talk titles. Semantic search finds passages about the same idea even when the wording differs. These are exposed as tools in the MCP server so AI models can decide which to use and how to use them (i.e. only searching PDFs). Every result also includes a link back to its source so everything can be cited by the model.

While a set of tools can enhance an AI model's capabilities, it's on the model itself to decide when to use those tools and how based on the MCP server's descriptions and the tools' parameters. Bundling tools with detailed instructions makes things more specific and more useful.

For example, I made an [Interface Designer agent](https://github.com/sutterhill/intent-specialists/blob/main/lukew-interface-designer.md) by combining a larger set of instructions with the Ask LukeW MCP server. The agent starts with semantic search and then checks key phrases with keyword search. It removes duplicates, links each source, and answers in first person as me. When used in a coding tool, like [Intent](https://intentapp.dev/), this agent can assess a user interface and guide coding agents toward improving things.

When I asked the agent to “suggest UI improvements for the signup action” on a site we’re building, it evaluated what was there: a single email field with the right input type and autocomplete settings, a button that disables while the request runs, and a high-contrast primary action.

[![LukeW agent that evaluates user interfaces](https://static.lukew.com/lukew_agent_ui_recommendations3.png)](https://static.lukew.com/lukew_agent_ui_recommendations3.png)

Then the agent made specific suggestions grounded in things I’ve written or talked about and linked to the source behind each recommendation:

-   put the success message where people are looking by swapping the form itself for the confirmation
-   show progress on the button while the request runs
-   change the button copy from "Sign up" to match the header’s "Get early access" so it reinforces the offer
-   validate the email address on blur and offer a one-tap fix for typos like "gmial.com"

It also suggested prompts for a coding agent to act on any one of these design suggestions... all without anyone needing to visit lukew.com to hunt for articles or presentations. I've spent decades writing and presenting on how to design better user interfaces. Seeing that advice pointed at real code and turned into near instant improvements is perhaps the most useful [form](https://github.com/sutterhill/intent-specialists/blob/main/lukew-interface-designer.md) it's taken so far.