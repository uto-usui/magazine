---
title: "Chat SDK adds Discord Components V2 support"
source: "https://vercel.com/changelog/chat-sdk-adds-discord-components-v2-support"
publishedDate: "2026-07-15"
category: "frontend"
feedName: "Vercel"
author: "Josh Singh"
---

You can now send Discord bot messages with [Components V2](https://docs.discord.com/developers/components/reference), an opt-in layout system that treats text, images, files, and buttons as flexible components you can arrange in any order.

Set the adapter's `contentFormat` option to `ComponentsV2` and cards render with native containers, sections, media galleries, separators, buttons, and string selects. Embeds remain the default, so existing bots work unchanged.

lib/bot.tsx

```
import { Actions, Button, Card, CardText, Image, LinkButton, Section } from "chat";import { createDiscordAdapter, DiscordContentFormat } from "@chat-adapter/discord";const discord = createDiscordAdapter({  contentFormat: DiscordContentFormat.ComponentsV2,});await thread.post(  <Card title="Deployment ready" subtitle="Production build completed">    <Section>      <CardText>        **Version 2.4.0** is ready to promote.        Review the release notes, then choose an action below.      </CardText>      <Image url="https://example.com/deploy-preview.png" alt="Preview" />    </Section>    <Actions>      <Button id="promote" style="primary">Promote</Button>      <Button id="rollback" style="danger">Roll back</Button>      <LinkButton url="https://example.com/deployments/123">View deployment</LinkButton>    </Actions>  </Card>);
```

A card with sections, markdown, images, and actions rendered as Discord Components V2.

Individual sections can carry their own actions, markdown renders correctly inside components, and the adapter enforces Discord's platform limits for you, including the 40-component cap per message.

This release also includes several other Discord adapter improvements:

-   **Rename threads:** A new `setThreadTitle()`method renames native Discord thread channels. Your bot needs the Manage Threads permission to use it.
    
-   **Ignore global pings:** Bots running in gateway mode no longer treat `@everyone` and `@here` announcements as mentions. A new `respondToGlobalMentions` config option (default `false`) lets you opt back in. Direct mentions, role mentions, and replies to the bot are unaffected.
    
-   **Precise mention detection:** Mentions of similarly named users no longer trigger false matches. A message with `@bot-dev` no longer counts as a bot tag.
    

[Read the documentation](https://chat-sdk.dev/adapters/official/discord) to get started or browse the [adapter directory](https://chat-sdk.dev/adapters).

_Special thanks to community contributors_ [_DeanMauro_](https://github.com/DeanMauro)_,_ [_onmax_](https://github.com/onmax)_,_ [_FarazPatankar_](https://github.com/FarazPatankar)_, and_ [_sivchari_](https://github.com/sivchari) _for laying the groundwork for these improvements._