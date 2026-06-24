---
title: "Taste: design DNA for AI agents"
source: "https://www.tastelab.xyz/"
publishedDate: "2026-06-23"
category: "design"
feedName: "Sidebar"
---

[![Taste Lab - Extract any website's design DNA | Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=1170971&theme=neutral&period=daily&t=1781512666509)](https://www.producthunt.com/products/taste-lab?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-taste-lab) [![Taste Lab - Extract any website's design DNA | Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=1170971&theme=neutral&period=weekly&topic_id=44&t=1781692664863)](https://www.producthunt.com/products/taste-lab?embed=true&utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_campaign=badge-taste-lab)

Abductive reasoning for any website's design taste

/taste turns any URL into a complete design context for your AI agent.  
Design Map, Taste DNA, and the reasoning behind every choice.

Pipeline

## Four steps from URL to taste.

Four agents, four roles. Each reads the same page through a sharper lens until what's left is a file any AI tool can build from.

1.  Extract Measurements
    
    You are a Senior Design AI. Your job is to extract precise, objective design measurements from a webpage.
    
2.  Detect Patterns
    
    You are a Principal Design Engineer detecting SYSTEMATIC RULES in the measurements provided by Step 1.
    
3.  Infer Taste
    
    You are the Ultimate Design Critic. You will now derive the "Taste" — the deliberate, painful TRADE-OFFS the designer made.
    
4.  Observer
    
    You are the Lead Critic & Final Editor. Your job is to RUTHLESSLY filter the taste analysis from Step 3. Zero bullshit passes through you.
    

1 Extract  
measurements

2 Detect  
patterns

Infer taste 3

4 Observe  
output

How to reverse engineer **design taste**

20 measurement categories, every colour, weight, spacing value, radius, and shadow cited with exact px / hex / ratio. No approximations.

5–8 system-level rules extracted. Each pattern gets an Evidence line and a Design Goal explaining why it exists.

4 taste principles — each with Trigger, Decision, Reason, Evidence, and Trade-off. At least one Restraint principle is required.

Quality gate. Runs anti-slop grep, validates JSON, then writes the final output.`{domain}.md` + `{domain}.json`

The output

## Two files. One brief.

Every run writes a .md and a .json. The full token set, plus 4 principles explaining why each design choice was made and what it gave up.

Output structure

Part 1: Design Map — colors, typography, spacing, radius, shadows. The complete token set from the page.

Part 2: Taste DNA — 4 principles, each explaining the reasoning behind one design decision.

What a Taste DNA principle contains

Trigger — what design decision prompted this choice

Decision — what was chosen

Reason — the design logic behind it

Evidence — specific proof from the page (px, hex, DOM values)

Trade-off — what this choice gives up

taste output

Color System

Page background

#08090A

Near-black, not pure black

Surface-1

rgba(255,255,255,0.02)

Barely-there panel tint

Surface-2

rgba(255,255,255,0.05)

Card face

Text primary

#F7F8F8

Nearly white, cool

Text secondary

#D0D6E0

Cool gray

Panel border

#23252A

1px inset ring

Typography

H1 / Display

64px · wt 510

−1.408px tracking

H2

48px · wt 510

−1.056px tracking

H3

20px · wt 590

−0.24px tracking

Body

15px · wt 400

24px line-height

Font

Inter Variable

wt 510/590 = variable-only

Spacing

Base unit

8px

Section padding

72px

top per section

Inter-section gap

10px

breathing room is inside sections

Button h-pad

12px

Border Radius

2px

Tags, micro elements

6px

Primary card

most common

8px

Modal / chat panels

9999px

Pill badges / buttons

Depth & Shadow

Card border

#23252A 0px 0px 0px 1px inset

primary depth signal

Float

rgba(0,0,0,0.4) 0 2px 4px

floating cards only

Vignette

rgba(0,0,0,0.2) inset

product screenshot depth

Principle 1 — RESTRAINT

Brand lives in white, not in color

Trigger

Deciding on an accent or brand color.

Decision

Don't introduce one. Use white (#F7F8F8) as the accent against near-black.

Reason

Color-as-brand is a shortcut for products without visual confidence. On a near-black surface, white carries all the emphasis needed — everything else is noise. Adding a purple or blue CTA button would cheapen the effect by making it feel like a template.

Evidence

Every nav link, button, and CTA is white or near-white. The only colored element is a translucent green badge for functional status. DOM accentCandidates are 100% grays and whites.

Trade-off

You cannot differentiate feature tiers by color. Linear resolves this with weight and size hierarchy alone — not color weight.

Works with your tools

## Your AI agent gets the taste.

One extra file, formatted for your tool. The agent picks it up on its next run. No setup, no pasting.

Cursor

.cursor/rules/{domain}-taste.mdc

Windsurf

.windsurf/rules/{domain}-taste.md

Claude Code

CLAUDE.md (appends Design Taste section)

GitHub Copilot

.github/copilot-instructions.md

Bolt

.bolt/prompt

Antigravity

GEMINI.md

v0 by Vercel

taste-tokens.css + instructions

Figma Make

taste-figma.css + instructions

Lovable

Printed to paste in Project Knowledge

Get started

## Three steps. Then run it anywhere.

Clone, connect Playwright, run. Works in Claude Code and Gemini CLI.

Clone into your Claude skills directory

git clone https://github.com/senlindesign/taste-skill ~/.claude/skills/taste

Install Playwright MCP (one-time — downloads Chromium ~100MB)

claude mcp add playwright -s user -- npx -y @playwright/mcp@latest --isolated

Restart Claude Code, then run it on any URL

/taste https://linear.app

Clone into your Gemini skills directory

git clone https://github.com/senlindesign/taste-skill ~/.gemini/skills/taste

Add Playwright MCP to ~/.gemini/settings.json

{ "mcpServers": { "playwright": { "command": "npx", "args": \["-y", "@playwright/mcp@latest", "--isolated"\] } } }

Restart Gemini CLI, then run it on any URL

/taste https://linear.app

Give it a try

![Taste Lab](https://www.tastelab.xyz/avatar.png)