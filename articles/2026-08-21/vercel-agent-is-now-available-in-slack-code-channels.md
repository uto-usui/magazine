---
title: "Vercel Agent is now available in Slack code channels"
source: "https://vercel.com/changelog/vercel-agent-is-now-available-in-slack-code-channels"
publishedDate: "2026-08-20"
category: "frontend"
feedName: "Vercel"
author: "Hiroki Osame"
---

Vercel Agent now works in Slack code channels, a new kind of channel launched today for working with a coding agent. Anyone in the channel can follow the work, give Agent new instructions, and review the code it writes.

Choose **Create a code channel** from the Slack sidebar, select Vercel as the agent, and describe what you need to get started. You can also ask Agent to create one from an existing channel or thread. It brings that context with it to the new channel.

Use code channels to investigate incidents, write and review code as a team, or manage ongoing work such as dependency upgrades and migrations.

Inside a Vercel Agent code channel:

-   **Follow the work:** Agent posts relevant deployments, logs, errors, and diffs in the channel as it works.
    
-   **Talk without repeated** `**@Vercel**` **mentions:** Agent follows the conversation, recognizes which messages are for it, and continues when the team gives it more work.
    
-   **Review pull requests:** Ask Agent for a PR review and it posts its findings in the channel. It can find bugs outside the diff, and explain failing checks and their root causes.
    
-   **Approve every change:** Agent is read-only by default and never exceeds the requester's permissions. Before making a change, it drafts a plan and waits for approval. For every action, Vercel records who requested and approved it and what Agent ran.
    
-   **Stop work at any time:** The person who created the code channel can cancel an active task.
    

Vercel Agent in Slack code channels is available in public beta for Pro and Enterprise teams. Add [Vercel to Slack](https://vercel.com/changelog/vercel-for-slack-now-in-public-beta), learn about [Slack Code](https://slack.com/features/code-channels), or read the [docs](https://vercel.com/docs/agent/chat/slack#slack-code).