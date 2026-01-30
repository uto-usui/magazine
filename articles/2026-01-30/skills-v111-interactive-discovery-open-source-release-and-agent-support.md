---
title: "Skills v1.1.1: Interactive discovery, open source release, and agent support"
source: "https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support"
publishedDate: "2026-01-26"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

1 min read

Jan 26, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4hRja7H3Bm3W8vYtodFH1b%2Fe5e44e38266f8774e110a0c2756fa7a0%2Fskills_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3cGcmnlO0O6im6sSeqikN2%2Fb1efbdbde8be64b084c322ef6f482e63%2Fskills_dark.png&w=1920&q=75)

`skills@1.1.1` adds interactive skill discovery and is now fully open source.

The new interactive discovery keeps the workflow simple for developers, while also giving agents a clear path to discover skills programmatically by replacing the deprecated `npx add-skill` command with the updated `npx skills` interface.

You can now use `npx skills find` to search as you type and discover skills interactively. For AI agents, [Skills](https://github.com/vercel-labs/skills) includes a meta "find-skills" skill, along with a non-interactive mode designed for automated workflows, and support for 27 coding agents.

Skills maintenance is also simpler with the new `npx skills update` command, which refreshes your local skills without manual steps.

The full codebase is available on GitHub at [Skills](https://github.com/vercel-labs/skills).

### [Link to heading](#migration)Migration

The previous `npx add-skill` command is deprecated. Use `npx skills find` for interactive discovery, and use `npx skills update` to refresh existing skills.

Get started with `npx skills@latest` or explore the [Skills repository](https://github.com/vercel-labs/skills).

```
npx skills add vercel-labs/agent-skills
```