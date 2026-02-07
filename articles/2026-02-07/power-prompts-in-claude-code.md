---
title: "Power prompts in Claude Code"
source: "https://hvpandya.com/power-prompts"
publishedDate: "2026-02-06"
category: "design"
feedName: "Sidebar"
---

AI experiments

I’ve been tinkering with Claude Code for a few months. It’s a lot of fun. The frontend optimizations are now very easy to implement. Recently when I was redoing design of this website, my CSS, JS and layout code got quite messy. I am not a web perf expert so I didn’t want to dive into it myself. But I also did not want the performance optimizations to mess up the exact look and feel, UX and features I had built for the website.

I’ve seen (I bet you have too) many people share on X how complex their Claude Code setup is with multiple agents running in parallel, skills, MCPs and so on. I’ve mostly been very vanilla so far. But this time I thought I’d actually give sophistication a shot.

So I wrote up a prompt – no additional configurations done, just describing what I wanted to do in this performance exercise. And to my surprise, it just worked.

### The prompt

Here’s what I asked Claude Code:

Optimize my site for performance, accessibility, SEO, and code quality.

Before making any changes, capture baseline screenshots of all the key pages.

Run the audit and fixes in parallel using multiple agents: one for performance/build, one for accessibility, one for SEO, one for code cleanup.

After all changes are complete, take screenshots at desktop, tablet, and mobile breakpoints and compare with the baseline to make sure nothing broke visually.

Update CLAUDE.md with what changed.

Finally, create a reusable skill so I can run this same audit workflow in the future.

Each highlighted part of this prompt triggers a different capability. Let’s see how Claude Code reacted to each part one by one.

* * *

### Capture screenshots before making changes

Optimize my site for performance, accessibility, SEO, and code quality.

Before making any changes, capture baseline screenshots of all the key pages.

Run the audit and fixes in parallel using multiple agents: one for performance/build, one for accessibility, one for SEO, one for code cleanup.

After all changes are complete, take screenshots at desktop, tablet, and mobile breakpoints and compare with the baseline to make sure nothing broke visually.

Update CLAUDE.md with what changed.

Finally, create a reusable skill so I can run this same audit workflow in the future.

This triggers Claude Code’s **MCP (Model Context Protocol)** integration. If you have Playwright MCP configured, Claude will actually launch a browser, navigate to your pages, and capture screenshots.

Claude Code's output

```
⏺ mcp_playwright_browser_navigate (MCP)
  url: "http://localhost:4000/"

⏺ mcp_playwright_browser_take_screenshot (MCP)
  filename: "baseline/homepage-desktop.png"
  ✓ Saved screenshot to .playwright-mcp/baseline/homepage-desktop.png

⏺ mcp_playwright_browser_resize (MCP)
  width: 768, height: 1024

⏺ mcp_playwright_browser_take_screenshot (MCP)
  filename: "baseline/homepage-tablet.png"
  ✓ Saved screenshot to .playwright-mcp/baseline/homepage-tablet.png
```

Why this matters: You now have a visual record of what your site looked like _before_ any changes. This is crucial for the comparison step later.

* * *

### Run multiple tasks at once

Optimize my site for performance, accessibility, SEO, and code quality.

Before making any changes, capture baseline screenshots of all the key pages.

Run the audit and fixes in parallel using multiple agents: one for performance/build, one for accessibility, one for SEO, one for code cleanup.

After all changes are complete, take screenshots at desktop, tablet, and mobile breakpoints and compare with the baseline to make sure nothing broke visually.

Update CLAUDE.md with what changed.

Finally, create a reusable skill so I can run this same audit workflow in the future.

This triggers **multi-agent parallelization**. Instead of doing tasks sequentially, Claude launches 4 separate agents that work simultaneously:

-   Agent 1: Deletes unused fonts, enables minification, optimizes build config
-   Agent 2: Fixes focus indicators, adds ARIA labels, improves keyboard navigation
-   Agent 3: Updates schema markup, fixes sitemap issues
-   Agent 4: Removes dead code, updates documentation

Claude Code's output

```
⏺ Launching 4 agents in parallel...

⏺ Task (agent)
  description: "Performance and build optimization"
  ↳ Running: Scanning assets/fonts/ for unused font files...

⏺ Task (agent)
  description: "Accessibility audit and fixes"
  ↳ Running: Checking focus indicators and ARIA labels...

⏺ Task (agent)
  description: "SEO and structured data"
  ↳ Running: Validating JSON-LD schema and sitemap...

⏺ Task (agent)
  description: "Code quality cleanup"
  ↳ Running: Searching for test code in production files...
```

Why this matters: **Speed.** These tasks don’t depend on each other. Font cleanup doesn’t need to wait for ARIA labels. Running them in parallel means 4x faster completion.

* * *

### Compare before and after to catch regressions

Optimize my site for performance, accessibility, SEO, and code quality.

Before making any changes, capture baseline screenshots of all the key pages.

Run the audit and fixes in parallel using multiple agents: one for performance/build, one for accessibility, one for SEO, one for code cleanup.

After all changes are complete, take screenshots at desktop, tablet, and mobile breakpoints and compare with the baseline to make sure nothing broke visually.

Update CLAUDE.md with what changed.

Finally, create a reusable skill so I can run this same audit workflow in the future.

This triggers a **visual regression testing loop**. Claude will:

1.  Resize the browser to each breakpoint (1280px, 768px, 375px)
2.  Capture new screenshots
3.  Compare them with the baseline screenshots
4.  Flag any visual differences

Claude Code's output

```
⏺ Visual Regression Check

  Comparing baseline vs current screenshots...

  Desktop (1280px)
    Homepage:    ✓ No changes detected
    Blog post:   ✓ No changes detected
    Notes page:  ✓ No changes detected

  Tablet (768px)
    Homepage:    ✓ No changes detected
    Blog post:   ✓ No changes detected

  Mobile (375px)
    Homepage:    ✓ No changes detected
    Blog post:   ✓ No changes detected

  Result: 0 visual regressions found
```

Why this matters: Code changes can have unintended visual side effects. A CSS tweak might look fine on desktop but break mobile. This catches those issues before you deploy.

* * *

### Document changes for future sessions

Optimize my site for performance, accessibility, SEO, and code quality.

Before making any changes, capture baseline screenshots of all the key pages.

Run the audit and fixes in parallel using multiple agents: one for performance/build, one for accessibility, one for SEO, one for code cleanup.

After all changes are complete, take screenshots at desktop, tablet, and mobile breakpoints and compare with the baseline to make sure nothing broke visually.

Update CLAUDE.md with what changed.

Finally, create a reusable skill so I can run this same audit workflow in the future.

This triggers Claude to update the **project documentation**. CLAUDE.md is a special file that Claude reads at the start of every session. By documenting changes there, future sessions will know:

-   What fonts are actually used
-   What accessibility patterns to follow
-   What was optimized and why

Claude Code's output

```
⏺ Edit (CLAUDE.md)
  Adding section: "Site Optimization (January 2026)"

  + ## Site Optimization (January 2026)
  +
  + ### Fonts
  + - Only 3 font families in use: Ivar Text, Ivar Headline, Departure Mono
  + - Deleted 48 unused font directories (65MB savings)
  +
  + ### Accessibility
  + - Emoji reactions use <button> elements with aria-labels
  + - Focus indicators visible on all interactive elements
  + - Keyboard navigation tested and working
```

Why this matters: **Continuity across sessions.** You (or Claude) won’t accidentally undo optimizations or repeat work.

* * *

### Create a reusable workflow

Optimize my site for performance, accessibility, SEO, and code quality.

Before making any changes, capture baseline screenshots of all the key pages.

Run the audit and fixes in parallel using multiple agents: one for performance/build, one for accessibility, one for SEO, one for code cleanup.

After all changes are complete, take screenshots at desktop, tablet, and mobile breakpoints and compare with the baseline to make sure nothing broke visually.

Update CLAUDE.md with what changed.

Finally, create a reusable skill so I can run this same audit workflow in the future.

This triggers Claude to create a **skill file**, a markdown document that teaches Claude a reusable workflow. Once created, you can trigger the entire optimization workflow again in any future session.

Claude Code's output

```
⏺ Write (.claude/skills/site-audit.md)

  # Site Audit Skill

  Run a comprehensive site audit covering performance,
  accessibility, SEO, and code quality.

  ## Workflow

  ### 1. Capture Baseline Screenshots
  Before making any changes, use Playwright MCP to capture
  screenshots of homepage, blog post, and notes page at
  desktop (1280px), tablet (768px), and mobile (375px).

  ### 2. Run Parallel Audit Agents
  Launch 4 agents simultaneously:
  - Agent 1: Performance & Build
  - Agent 2: Accessibility (WCAG 2.1 AA)
  - Agent 3: SEO & Structured Data
  - Agent 4: Code Quality

  ### 3. Visual Regression Testing
  Compare new screenshots with baseline...

  ✓ Created .claude/skills/site-audit.md
```

Why this matters: **Automation.** Complex multi-step workflows become one-command operations. The skill file contains all the detailed steps so your prompt can stay simple.

* * *

### The results

From this single prompt, Claude:

-   Deleted 71MB of unused fonts
-   Fixed 6 accessibility violations
-   Added proper JSON-LD schema
-   Removed test code from production
-   Captured 15 screenshots across breakpoints
-   Verified zero visual regressions
-   Created a reusable skill for future audits

Not bad for a few sentences of asking.

* * *

### Try it yourself

Here’s a template you can steal:

Before making changes, capture screenshots of the current state. Then \[describe your task\]. After you're done, compare screenshots to verify nothing broke visually. Document what changed in CLAUDE.md.

The thing that surprised me most is that Claude Code doesn’t need you to be precise. You can describe what you want the way you’d explain it to a colleague, and it figures out how to make it happen.

For the screenshot stuff to work, you’ll need [Playwright MCP](https://github.com/anthropics/anthropic-cookbook/tree/main/misc/model_context_protocol) set up. The parallel agents and skill creation work out of the box.

### Read more

### **[16 Pieces of Design Wisdom](https://hvpandya.com/design-wisdom)**Career

### **[Tyranny of Optionality](https://hvpandya.com/tyranny-of-optionality)**Career

### **[The Paradox of Builders & Users](https://hvpandya.com/builders-and-users)**Product

### **[Success Helps Ease the Pain](https://hvpandya.com/success-helps)**Observations

### **[Products, Soul & Markets](https://hvpandya.com/soul-vs-scale)**Product