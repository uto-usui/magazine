---
title: "The 3 Roles of Context for AI Agents"
source: "https://www.nngroup.com/articles/3-agent-context-roles/"
publishedDate: "2026-09-18"
category: "design"
feedName: "Nielsen Norman Group"
author: "Tanner Kohler"
---

Summary:  AI-agent power users curate 3 kinds of context: global (across tasks), local (task-specific), and ambient (raw streams like email).

[Advanced AI users](https://www.nngroup.com/articles/vibe-architects/) have [AI agents](https://www.nngroup.com/articles/definition-ai-agent/) execute complex and laborious tasks for them. But the leverage they can get largely depends on the context the AI has access to. Without the right context, AI agents can produce generic or problematic outputs that don’t reflect users’ needs, business goals, or a product’s brand.

[Curating the right context](https://www.nngroup.com/articles/ux-context-design/) now matters even more than [writing a good prompt](https://www.nngroup.com/articles/careful-prompts/).

-   [The 3 Roles of Context](#toc-the-3-roles-of-context-1)
-   [The Same Information Can Play Multiple Context Roles](#toc-the-same-information-can-play-multiple-context-roles-2)
-   [1\. Global Context](#toc-1-global-context-3)
-   [2\. Local Context](#toc-2-local-context-4)
-   [3\. Ambient Context](#toc-3-ambient-context-5)
-   [The Right Context Makes Prompting Efficient](#toc-the-right-context-makes-prompting-efficient-6)
-   [Where Context Should Live](#toc-where-context-should-live-7)

## The 3 Roles of Context

In a recent study with Claude power users — people who rely on the agent daily for substantial professional work — every participant had built a **context library**: a collection of files, databases, and live connections that Claude drew on alongside whatever the user typed in the prompt.

The libraries differed in form, but the information in them consistently played one of 3 roles. These roles are not specific to Claude or to power users: any AI agent that works from files, memory, or live connections needs information of all three kinds, and any user who supplies it is deciding, knowingly or not, which role it plays.

The 3 roles that AI context can play are:

-   **Global:** information that rarely changes and shapes the agent’s actions across interactions
-   **Local:** information intentionally scoped only to a specific task or project
-   **Ambient:** the raw, uncurated information streams (e.g., email messages, meeting transcripts) that have not been scoped in advance and through which the agents sift for relevant information

Which role a piece of information should play was decided sometimes by Claude and sometimes by the user. Some files (agent skills, for instance) included a short description of when they applied, so Claude could recognize on its own that a particular file in the library was relevant to the current interaction and use it. In other cases, the user decided:  they would upload the information directly or explicitly point Claude to information stored in the library and ask it to use it for the current task.

To illustrate the differences between these roles, take the task of writing a research report. The table below highlights which inputs play which roles.

Context role

Example

Global

The best practices that shape what a good report entails

Local

The to-do list the researcher is using to manage their work and the research data they are working from

Ambient

The recent emails with the client about the project and a transcript of a call with a colleague discussing the main findings

Note that in this example, the research report itself is the output of the task, not a form of context. However, the report could later serve as **context for similar future projects** if it were a good example of a properly prepared research report.

![Diagram of the three types of AI context: a single global context layer supports three local contexts, which feed into the AI output; an ambient-context cloud surrounds all of them.](https://media.nngroup.com/media/editor/2026/09/18/the-three-types-of-ai-context-1-1.png)

_The global context forms the foundation, the local context forms the task-specific pillars supporting the output, and the ambient context surrounds the process with the user’s current communication milieu._

## The Same Information Can Play Multiple Context Roles

The role that one piece of context information plays can change. A Slack message, for example, may start out as one item in the ambient stream pulled in through an [MCP connection](https://www.nngroup.com/articles/artificial-intelligence-glossary/). Once the user points the AI at that message for the current task, it becomes local context. Or an article that a user heavily references as local context for a set of specific tasks could evolve into global context if the user archived it so that it became a reference across interactions. Certain information might even play multiple roles at the same time.

## 1\. Global Context

Global context is meant to last. It guides the agent’s high-level reasoning and priorities, and it rarely changes.

Here are a few examples of global context, each from participants in our study:

-   **Specific user information:** Details about the user (such as life circumstances or preferences) that the AI encountered during conversations and saved to that user’s profile. These memories were used across later sessions, even when the topic of conversation was entirely different.
-   **Best practices:** Guidance, examples, or templates defining what different types of work look like when done well. For example, one participant had a “Build Your Own X” skill for creating skills across different domains.
-   **Governance rules:** Which actions required the user's approval, and which Claude could take on its own. For example, Claude needed permission for anything public-facing and for any "hard pivots" away from what one participant had asked for.
-   **A “canon” of reference books:** One participant had created a list of books containing advice he respected and that Claude was supposed to use as a north star. The markdown file containing this list included explicit instructions to approach work in accordance with the principles outlined in the books.
-   **Brand guidelines:** One product designer who liked to have Claude create custom applications for niche tasks had documented the hex codes and visual rules that captured his personal brand.
-   **Intent-clarification rules:** A standing set of instructions to ask clarifying questions and ensure the AI understands what the user’s prompt means.

Global context can be powerful because it relieves the user of having to specify these details in each new conversation.

## 2\. Local Context

Local context is information the AI uses that is directly related to the user's current work. Here are some examples of local context from our study participants:

-   **Task lists:** Prioritized to-do lists grouped by project, that Claude generated and updated on its own, either in a markdown file or in a separate task-management tool (like Todoist)
-   **Agent skills:** Codified ways of working, stored as markdown files, called upon for performing specific tasks
-   **Conversational context:** The back-and-forth chat history of any one conversation with the AI. One participant demonstrated summarizing a chat when it became too long and importing it into a fresh conversation to continue.
-   **Change logs:** Records of what changed in each project, updated automatically at the close of a working session.
-   **Project records in an external database:** The details of every job one participant had applied to (e.g., company, role, status) were stored in a Notion database. She never updated the database herself; Claude read and updated records whenever it helped her with her job search.
-   **Research reports:** One property developer had Claude produce extensive research reports on potential plots of land; the reports then served as a temporary source of context for specific projects in that area.

Local context generally lives either in a specific file that the AI can directly access and edit (such as a markdown file) or in an external database. Some of it (task lists, change logs, decision logs) is written and kept current by Claude itself, not just read. However, it is not the direct artifact or material the user is currently working on — it supports it, helping the AI understand and communicate its priority and progress.

## 3\. Ambient Context

Ambient context is the messiest and largest type of context. It consists of the raw, uncurated information streams that surround the user’s work — emails, meeting transcripts, chat messages — and that were not scoped to a task in advance. This information is valuable precisely because it is unfiltered: it captures what shapes the user’s priorities and sense of what good work looks like, without requiring the user to explicitly document it.

One participant in our study described it this way:

> “\[Some documents I create are\] certainly helpful, but I want them in the moment, and then I'm never going to need \[to use\] them again. But they do need to remain around for context … like a Google Doc, that I then used as a transcript for a phone call, where I \[then\] made edits to it, and talked about it in a different way”

In other words, he did not want to curate his call transcripts or his notes into global or local context, but he did want Claude to keep them in view. Like ambient noise, these streams are always on, never organized, and still shape how the user thinks, so the AI should take them into account.

Participants in our study made no effort to define, inspect, clean, or format ambient context. Most of it came from continuously changing sources of information (such as email or Reddit posts) and reached Claude through MCP connections. More information is not always better, but participants had no time to curate what mattered from these streams and file it as global or local context. So they handed Claude the whole stream and hoped it would keep up with them.

Examples of ambient context in our study included:

-   **Shopify purchase data:** Claude was responsible for regularly exporting this data from Shopify using a script the participant wrote herself so it could update customer profiles in HubSpot to monitor each customer’s status.
-   **Granola transcripts:** Most participants transcribed as many meetings as they could to make all that information available to Claude as ambient context. Participants considered these transcripts essential to their context library.
-   **Slack and email:** Similar to meeting transcripts, messages sent and received were another key piece of what was happening in the participants’ brains, so the AI needed to have them, too.
-   **Online articles or social media threads:** One participant regularly forwarded articles that seemed interesting to himself and had AI scrape ~30 popular AI, marketing, and business subreddits to stay abreast of what was happening.
-   **Product analytics:** One product lead connected Amplitude (an analytics tool) to Claude so it could continuously access background data on product performance.

Some of these data came from sources that were easy for Claude to access through MCP connections. Other (like Shopify or certain calendars) required users to create workarounds to grant Claude access. Yet participants in our study were willing to figure out a solution and maintain it because of the great value they placed on providing Claude with as much ambient context as possible.

## The Right Context Makes Prompting Efficient

Using context in these 3 ways allowed participants to worry less about their prompts. Many of our participants simply turned on their microphone and dictated casually into the prompt window, relying on the context library to ensure the system interpreted what they meant correctly.

For example, a participant building a custom dietary application first brainstormed his plan using Gemini, then exported it as a markdown file and saved it to his computer. To build the app, he pointed Claude at the file and simply said, "Read the MD file in the project directory and implement it." By many standards, [this is a poor prompt](https://www.nngroup.com/articles/vague-prototyping/). Yet it was sufficient because the markdown file contained enough local context for Claude to execute the task properly.

## Where Context Should Live

Participants generally kept information playing the three roles in separate places. Global and local context lived in distinct files or databases — for instance, one markdown file documenting the user’s writing style across all projects (global) and another holding the current outline or draft (local). These files might sit in different locations within the context library and still be referenced together by the AI. Ambient context usually stayed outside the user’s files altogether, in its raw form inside the software that generated it, and reached Claude through an MCP connection or an API key.

### Conclusion

When AI agents have access to the right context and know what role it should play, prompting becomes easier. **As you build a context library for yourself or your team, ask what role each piece of information plays**, because the role determines how to handle it. Does it apply to most tasks? Curate it carefully and store it where the agent will find it every time (global). Does it apply only to the current project? Keep it in a file the agent can read and update, but won’t interfere with unrelated tasks (local). Is it a stream you don’t have time to curate? Connect the agent to the source and let it sift (ambient).