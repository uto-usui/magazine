---
title: "Sidebranch: worktree visual diffing"
source: "https://sidebranch.dev/"
publishedDate: "2026-09-16"
category: "design"
feedName: "Sidebar"
---

## Git-based visual diffing, made easy

Switch back and forth between branches and visually compare UI changes side by side — without ever touching your own working tree.

[Add the extension](https://chromewebstore.google.com/detail/sidebranch/ljgndbomggclpkejggdhocihphhhdhig) [Install the package](#install)

## Features

**In-page branch switching**

Pick any branch from the pill and it builds in an isolated worktree on its own dev server.

**Side-by-side diffs**

Both panes live, plus blend and onion diff modes where UI changes are highlighted.

**Framework agnostic**

Next, Vite, Django, Rails, everything supported as long as it answers HTTP on a port.

**Zero dependencies**

The entire tool is Node builtins, with no external packages or dependencies.

## Installation

### Add the extension:

Install [sidebranch from the Chrome Web Store](https://chromewebstore.google.com/detail/sidebranch/ljgndbomggclpkejggdhocihphhhdhig) (Chrome or Edge), then:

$ cd your-repo
$ npx sidebranch init     \# writes a starter .sidebranch.json

### Tell it how to run your app (.sidebranch.json):

{
  "dev": "npm run dev",        // start command, run inside each pane
  "install": "npm install",   // runs only when lockfiles change
  "copy": \[".env", ".env.local"\]
}

### Start the daemon:

$ npx sidebranch start    \# http://127.0.0.1:49400, loopback only

Then click the pill, pick a branch, and compare. Full configuration reference, recipes for complex apps, and more live in the [README](https://github.com/cristobalwee/sidebranch#readme).

### If you want to install the package yourself instead:

$ npm install --save-dev sidebranch

Then add the widget to your app, in dev builds only — gate it however your stack gates dev-only code:

<script src="http://localhost:49400/widget.js" defer></script>

## Commands

Run these from the repo you are reviewing — sidebranch resolves the project from your working directory, exactly like git.

### Check the environment, config, and daemon status:

$ npx sidebranch doctor

### Stop the daemon and its pane dev servers:

$ npx sidebranch stop

### Remove pane worktrees when you are done reviewing:

$ npx sidebranch clean              \# all panes, with a prompt
$ npx sidebranch clean --pane a     \# just pane A

### Run on a different port:

$ npx sidebranch start --port 5000  \# match it in the extension options