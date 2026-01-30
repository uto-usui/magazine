---
title: "Vercel's bot verification now supports Web Bot Auth"
source: "https://vercel.com/changelog/vercels-bot-verification-now-supports-web-bot-auth"
publishedDate: "2025-08-12"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

1 min read

Aug 12, 2025

We collaborated with industry partners to advance the IETF proposal for [Web Bot Auth](https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture) and [Vercel's bot verification system](https://vercel.com/docs/bot-management#verified-bots) supports the new protocol. Now, [Bot Protection](https://vercel.com/docs/bot-management#bot-protection-managed-ruleset) can use [HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html) to verify traffic automation from dynamic and distributed sources.

Vercel maintains a comprehensive and actively curated [directory of known bots](https://bots.fyi/) that are verified by IP, reverse DNS, and now Web Bot Auth, which verifies bots via public-key cryptography in signed headers. This ensures that legitimate automation, like SEO crawlers, performance monitoring tools, and platform-integrated AI bots, can reliably access your site, while spoofed bots are blocked.

Web Bot Auth's asymmetric signature proves the authenticity of the traffic regardless of its network origin, making it ideal for bots running in dynamic or serverless environments.

Verified Bots using Web Bot Auth include signed headers to authenticate each request, allowing them to be recognized and allowed through Bot Protection and Challenge Mode. For example, [ChatGPT operator signs its requests](https://help.openai.com/en/articles/11845367-chatgpt-agent-allowlisting) using Web Bot Auth, so is now allowed.

Learn more about [Bot Management](https://vercel.com/docs/bot-management).