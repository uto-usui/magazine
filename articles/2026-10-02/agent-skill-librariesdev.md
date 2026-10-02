---
title: "Agent skill: Libraries.dev"
source: "https://libraries.dev/skill"
publishedDate: "2026-10-01"
category: "design"
feedName: "Sidebar"
---

Generic AI output

## Installation

`npx skills add Jakubantalik/Libraries.dev`

Installs the free skill: all seven libraries with the options their detail pages offer, plus commands to find where each one fits. Works with Claude Code, Cursor, GitHub Copilot, Codex, and Gemini CLI.

`npx libraries-dev skill --pro`

ProInstalls the **Pro** skill: every option the Studio exposes, palettes, cursor gravity, and core customization for rebuilding an effect’s geometry or shader. Requires a [Libraries Pro](https://libraries.dev/pro.html) plan; it opens your browser to confirm your account and replaces the free skill. Run it again to update.

## Commands

`libraries reveal`

List the seven libraries with a line on what each is for. “What’s in libraries.dev” routes here too.

`libraries review`

Read your stack and scan the project for spots that fit: waiting states, chat inputs, mic buttons, bot avatars, image placeholders, primary buttons. Returns a per-file list of which library goes where, and why. Read-only; nothing gets edited.

`libraries apply`

Install the best-fit library where you are working: picks it, installs the package with your package manager, places the component with the right options and wires it to real app state. Name one to skip the choice, for example `libraries apply thinking-orbs`.

## Pro commands

Included in the Pro skill, `npx libraries-dev skill --pro`, with a [Libraries Pro](https://libraries.dev/pro.html) plan.

`libraries tune`

Turn a description into exact values: “calmer, slower orb”, “warmer beam”, “tone down the metal”. Changes the fewest options, inside each library’s ranges, for light and dark.

## Try it

`Review my project and suggest where libraries.dev effects fit`

`Show a thinking orb while the chat reply is streaming`

`Add a border beam to the prompt input while it generates`

`Give each agent in the sidebar a bot avatar that follows its status`