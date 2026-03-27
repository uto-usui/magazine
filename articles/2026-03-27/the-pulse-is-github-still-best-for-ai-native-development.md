---
title: "The Pulse: is GitHub still best for AI-native development?"
source: "https://newsletter.pragmaticengineer.com/p/the-pulse-is-github-still-best-for"
publishedDate: "2026-03-26"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_The Pulse is a series covering events, insights, and trends within Big Tech and startups. Notice an interesting event or trend? Hit reply and share it with me._

Today, we cover:

1.  **Does GitHub still merit “top git platform for AI-native development” status?** Availability has dropped to one nine (~90% – !!), partly due to not being able to handle increased traffic from AI coding agents. There’s also no CEO and an apparent lack of direction.
    
2.  **Should a tool auto-add itself as a contributor to PRs?** Claude Code and GitHub Copilot auto-add themselves to commits, which is effectively free advertising. Codex and OpenCode purposely do not.
    
3.  **Microsoft promises Windows will not be “Microslop.”** After years of forced Copilot integrations, Start menu ads, and mandatory Microsoft accounts, the Windows team is promising to undo the self-inflicted damage done to the OS. It’s better late than never, but why did Microsoft allow the “Microslop” perception to stick around so long?
    
4.  **Industry pulse.** Massive LLM supply chain attack via LiteLLM, backlash after Cursor forgets to mention that Composer 2 is based on an open source model, what happens when you stop reviewing AI code, OpenAI kills Sora, and more.
    

We’re used to highly reliable systems which target four-nines of availability (99.99%, meaning about 52 minutes of downtime per year), and for it to be embarrassing to barely hit three nines (around 9 hours of downtime per year.) And yet, in the past month, GitHub’s reliability is down to one nine!

Here’s data from the third-party, “[missing GitHub status page](https://mrshu.github.io/github-statuses/)”, which was built after GitHub stopped updating its own status page due to terrible availability. Recently, things have looked poor: