---
title: "The website specification"
source: "https://specification.website/"
publishedDate: "2026-06-11"
category: "design"
feedName: "Sidebar"
---

## What a good website does.

A platform-agnostic specification of the technical features every decent website should have — from `<title>` to `/.well-known/security.txt`, from WCAG contrast to `llms.txt`. Written for humans and agents.

## Categories

Ten areas, mapped to widely-accepted standards.

[All topics →](https://specification.website/spec/)

-   [
    
    ### Foundations
    
    14
    
    The HTML, head, and document basics every page needs.
    
    ](https://specification.website/spec/foundations/)
-   [
    
    ### SEO
    
    14
    
    Search visibility — robots.txt, sitemaps, canonicals, structured data.
    
    ](https://specification.website/spec/seo/)
-   [
    
    ### Accessibility
    
    21
    
    WCAG-aligned rules so people of all abilities can use the site.
    
    ](https://specification.website/spec/accessibility/)
-   [
    
    ### Security
    
    14
    
    Headers, transport, and policies that keep visitors safe.
    
    ](https://specification.website/spec/security/)
-   [
    
    ### Well-Known URIs
    
    10
    
    Standard, agreed-upon paths under /.well-known/.
    
    ](https://specification.website/spec/well-known/)
-   [
    
    ### Agent Readiness
    
    18
    
    Things that make a site legible to AI agents and crawlers.
    
    ](https://specification.website/spec/agent-readiness/)
-   [
    
    ### Performance
    
    22
    
    Core Web Vitals, caching, images, fonts, network behaviour.
    
    ](https://specification.website/spec/performance/)
-   [
    
    ### Privacy
    
    6
    
    Consent, signals, and respecting visitor choice.
    
    ](https://specification.website/spec/privacy/)
-   [
    
    ### Resilience
    
    6
    
    Graceful failure — error pages, offline, redirects.
    
    ](https://specification.website/spec/resilience/)
-   [
    
    ### Internationalisation
    
    12
    
    Language, locale, direction, and translated content.
    
    ](https://specification.website/spec/i18n/)

### Standards, not opinions

Each topic links back to the source standard — WHATWG, W3C, IETF RFCs, WCAG, MDN, and the organisations defining the modern web.

### Platform agnostic

Whether you ship WordPress, Drupal, TYPO3, Next.js, Astro, Hugo, a Django app, or plain HTML, the spec is the spec. Implementation hints follow it, not the other way round.

### Built in the open

Every page has an [Edit on GitHub](https://github.com/jdevalk/specification.website) link. PRs welcome. Sources credited on every page.

## Let your agent query the spec.

The whole spec is available as an open [MCP](https://modelcontextprotocol.io/) server — read-only, no auth — plus a published [Agent Skill](https://specification.website/.well-known/agent-skills/specification-website/SKILL.md) that teaches any compatible agent when and how to use it. Per-page Markdown is available via `/llms.txt` and `Accept: text/markdown` on any spec URL.

```
{
  "mcpServers": {
    "specification-website": {
      "transport": "http",
      "url": "https://mcp.specification.website/mcp"
    }
  }
}
```

## How to use this site

1.  01
    
    ### Audit
    
    Run through the [checklist](https://specification.website/checklist/). Each item is a “does the site do this — yes or no.”
    
2.  02
    
    ### Learn
    
    Click into any item for what it is, why it matters, and how to implement it.
    
3.  03
    
    ### Improve
    
    Found a gap, a stale fact, or a missing topic? Open a PR. Sources required.