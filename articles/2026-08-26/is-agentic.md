---
title: "Is Agentic"
source: "https://is-agentic.com/"
publishedDate: "2026-08-25"
category: "design"
feedName: "Sidebar"
---

### What the score measures

Is Agentic scores the public parts of a website that AI agents can discover, retrieve, understand, and use. Essential checks carry most of the score and cover fundamentals such as server-rendered content, correct HTTP behavior, clear document structure, recoverable errors, and usable controls.

Recommended checks activate when scan evidence indicates that a site offers an API, OAuth flow, GraphQL endpoint, MCP server, developer portal, or commerce surface. Checks that do not apply are excluded rather than counted as failures, so a public website is not penalized for omitting an interface it does not provide.

### How to use a report

Start with failed Essential checks because they describe the baseline an ordinary agent needs. Then review Recommended gaps that match the product’s real capabilities. Every finding includes the evidence observed during the scan and, where available, a concrete recommendation that can be copied into an implementation workflow.

Emerging formats can earn limited bonus credit, but their absence never lowers a score. After shipping a fix, rescan the same public URL to replace the latest report with a fresh snapshot while retaining a stable URL for sharing and comparison.

### Observed tasks and developer interfaces

Each report also includes an observed agent journey showing how one agent navigated the site and where it encountered friction. That run is supporting evidence rather than part of the numeric score, because one task cannot represent every agent, user goal, or production condition.

Developers and agents can retrieve completed reports through the public JSON API or the Is Agentic MCP server. The docs describe the endpoints, schemas, authentication policy, and machine-readable OpenAPI description without changing the browser scoring experience.

### How agents can consume a report

Public report URLs are stable and render their latest completed score in the initial HTML response, so crawlers do not need to execute JavaScript or wait for a client-side fetch. An agent that asks for text/markdown receives a compact Markdown representation at the same canonical URL, while software integrations can request structured JSON from the report API. Shared caches keep the HTML and Markdown representations separate through the HTTP Vary header.

The MCP server exposes the same completed report as a read-only tool with a declared input schema, structured output, and an optional interactive score card for hosts that support MCP Apps. None of these machine interfaces starts a scan, mutates the target site, or requires a credential. If a completed report does not exist yet, the browser report URL is the place to start and observe a new scan.

### Freshness, evidence, and limits

A report describes evidence available from one public URL at a particular time. Status codes, crawler policies, rendered content, documentation, advertised APIs, and emerging agent protocols can all change after the snapshot. Is Agentic stores the newest completed result for quick retrieval and may refresh stale reports in the background while keeping the previous completed score visible until replacement evidence is ready.

Use the report as a prioritized technical review, not as a guarantee that every model or browser automation system will complete every task. Private pages, authenticated workflows, geographic differences, bot defenses, temporary outages, and user-specific state can produce behavior that a public scan cannot observe. Security, accessibility, privacy, legal compliance, and business quality each require their own dedicated review.