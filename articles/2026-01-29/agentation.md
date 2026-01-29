---
title: "Agentation"
source: "https://agentation.dev/"
publishedDate: "2026-01-28"
category: "design"
feedName: "Sidebar"
---

Agentation is currently desktop only.

## Overview

Point at problems, not code

localhost:3000

1

2

3

4

5

Benji's Project

Claude Codev2.1.14Welcome back Benji!Opus 4.5 · ~/Code/agentation

█

Agentation (agent + annotation) is a dev tool that lets you annotate elements on your webpage and generate structured feedback for AI coding agents.

Click elements, select text, add notes, and paste the output into Claude Code, Cursor, or any agent that has access to your codebase. It’s fully agent-agnostic, so the markdown output works with any AI tool. Zero dependencies beyond React.

The key insight: agents can find and fix code much faster when they know exactly which element you’re referring to. Agentation captures class names, selectors, and positions so the agent can locate the corresponding source files.

It grew out of [a post by Benji Taylor](https://benji.org/annotating) exploring how to give better feedback to AI coding agents.

## Quick start

1.  Click the icon in the bottom-right corner to activate
2.  **Hover** over elements to see their names highlighted
3.  **Click** any element to add an annotation
4.  Write your feedback and click **Add**
5.  Click to copy formatted markdown
6.  Paste into your agent

## How it works with agents

Agentation works best with AI tools that have access to your codebase (Claude Code, Cursor, Windsurf, etc.):

1.  You see a bug or want a change in your running app
2.  Use Agentation to annotate the element with your feedback
3.  Copy the output and paste it into your agent
4.  The agent uses the class names and selectors to **search your codebase**
5.  It finds the relevant component/file and makes the fix

Without Agentation, you’d have to describe the element (“the blue button in the sidebar”) and hope the agent guesses right. With Agentation, you give it`.sidebar > .nav-actions > button.primary` and it can grep for that directly.

## Try it

The toolbar is active on this page. Try annotating these demo elements:

### Example Card

Click on this card or select this text to create an annotation. The output will include the element path and your feedback.

## Animation pause demo

Click in the toolbar to freeze this animation:

## Best practices

-   **Be specific** — “Button text unclear” is better than “fix this”
-   **One issue per annotation** — easier for the agent to address individually
-   **Include context** — mention what you expected vs. what you see
-   **Use text selection** — for typos or content issues, select the exact text
-   **Pause animations** — to annotate a specific animation frame