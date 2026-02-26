---
title: "Slack Agent Skill simplifies building Slack agents with coding assistants"
source: "https://vercel.com/changelog/slack-agent-skill-simplifies-building-slack-agents-with-coding-assistants"
publishedDate: "2026-02-24"
category: "frontend"
feedName: "Vercel"
author: "Timothy Jordan"
---

1 min read

Feb 24, 2026

[The Slack Agent Skill](https://skills.sh/vercel-labs/slack-agent-skill/slack-agent) is now available, enabling developers to build and deploy Slack agents in a single session with their coding agent of choice.

The skill handles the complexity of OAuth configuration, webhook handlers, event subscriptions, and deployment so you can focus on what your agent should do rather than on infrastructure setup.

The wizard walks through five stages:

1.  **Project setup:** Choose your LLM provider and initialize from the Slack Agent Template
    
2.  **Slack app creation:** Generate a customized app manifest and create the app in Slack's console
    
3.  **Environment configuration:** Set up signing secrets, bot tokens, and API keys with validation
    
4.  **Local testing:** Run locally with ngrok and verify the integration
    
5.  **Production deployment:** Deploy to Vercel with environment variables configured automatically
    

  
Install the skill and run the wizard by invoking it in your coding agent (for example, `/slack-agent new` in Claude Code).

```
npx skills add vercel-labs/slack-agent-skill
```

Try the [skill](https://skills.sh/vercel-labs/slack-agent-skill/slack-agent) to make your custom agent or use the [Slack Agent Template](https://vercel.com/templates/nitro/slack-agent-template) to deploy right away and customize later.