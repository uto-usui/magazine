---
title: "The skills CLI now supports Notion hosted skills"
source: "https://vercel.com/changelog/skills-cli-notion-skills"
publishedDate: "2026-09-17"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

`skills@1.7.0` adds [Notion skills databases](https://developers.notion.com/guides/agent-skills/overview) as an install source for agent skills .

Notion skills are reusable agent skills written as Notion pages. Teams author, review, and update them in the workspace they already use, then install them into any agent the skills CLI supports. No Git repository required.

To browse your Notion workspace's skills, run:

```
npx skills add notion
```

The CLI lists the skill packs shared with you and installs every skill in the packs you select.

To install a single skill, pass its Notion page URL:

```
npx skills add <NOTION_PAGE_URL>
```

Both commands use the Notion CLI (`ntn`) to authenticate. To set it up:

```
curl -fsSL https://ntn.dev | bashntn login
```

`ntn login` requires a Notion personal access token, so your workspace must allow them.

Access follows Notion's page permissions. You only see skills shared with you, so controlling who can install a skill is the same as controlling who can view the page.

This integration is built on Notion's new Agent Skills API, which exposes skills stored in Notion as standard Agent Skills folders. Because the format is standard, the same skills work in any agent that reads them.

Get started by [creating a Notion skill](https://developers.notion.com/guides/agent-skills/overview).