---
title: "eve adds new Slack event hooks and session controls"
source: "https://vercel.com/changelog/eve-adds-new-slack-event-hooks-and-session-controls"
publishedDate: "2026-07-27"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

[eve](https://eve.dev/) agents on Slack can now keep replying in a thread without repeated mentions, cancel an in-progress response or reset a conversation entirely, and react to any event your Slack app subscribes to.

## [Copy link to heading](#continue-conversations-without-repeated-mentions)Continue conversations without repeated mentions

Mentions no longer have to carry the conversation. Once a thread has an active session, your agent can reply on its own.

The new `onMessage` hook receives incoming Slack messages, and two helpers decide which ones to handle: `ctx.isBotMentioned()` detects an explicit mention, and `ctx.isSubscribed()` checks whether the message belongs to a thread with an active eve session:

agent/channels/slack.ts

```
export default slackChannel({  credentials: connectSlackCredentials("slack/my-agent"),  async onMessage(ctx, message) {    if (message.author?.isBot) return null;    const isDirectMessage = message.raw.channel_type === "im";    return isDirectMessage || ctx.isBotMentioned() || (await ctx.isSubscribed())      ? { auth: null }      : null;  },});
```

Dispatches DMs, explicit mentions, and follow-ups in threads with an active session.

When routing depends on who has joined the thread, the new `ctx.thread.listParticipants()` helper returns unique human Slack user ids in first-appearance order. Public channel messages require the `message.channels` trigger event type and the `channels:history` bot scope; private channels also need `message.groups` and `groups:history`.

## [Copy link to heading](#cancel-a-turn-or-reset-the-conversation)Cancel a turn or reset the conversation

Message hooks also receive two thread-bound session helpers.

`ctx.cancel()` stops the current turn while keeping the session: call it before returning `{ auth }` to queue the new message as replacement input, so a mid-turn correction drops the stale work and the agent responds to the latest message.

When the conversation should start over instead, `ctx.reset()` terminally retires the session that owns the thread. The next delivered message begins a new session with fresh history, state, and sandbox. Inside your `onMessage` dispatch logic, a reset command takes three lines:

agent/channels/slack.ts

```
export default slackChannel({  credentials: connectSlackCredentials("slack/my-agent"),  async onMessage(ctx, message) {    if (message.text.trim() !== "!new") return null;    await ctx.reset({ reason: "Slack user requested !new" });    await ctx.thread.post("Started a fresh conversation.");    return null;  },});
```

Retire the session and start the next message fresh.

## [Copy link to heading](#handle-any-events-api-callback)Handle any Events API callback

Your agent can now react to any event your Slack app subscribes to.

The new `onEvent` hook receives raw events such as `reaction_added`, `team_join`, and `channel_created`. Inside the hook, call `ctx.receive()` to start an agent turn, or call it several times to fan one event out to multiple targets. The `team_join` event, for example, can kick off onboarding in each of your welcome channels.

agent/channels/slack.ts

```
const onboardingChannels = ["C0123ABC", "C0456DEF"];export default slackChannel({  credentials: connectSlackCredentials("slack/my-agent"),  async onEvent({ receive }, event) {    if (event.type !== "team_join") return;    await Promise.all(      onboardingChannels.map((channelId) =>        receive({          message: `A user joined the Slack workspace. Onboard them from this event:\n${JSON.stringify(event)}`,          target: { channelId },          auth: null,        }),      ),    );  },});
```

Fans a single team\_join event out into onboarding turns across multiple channels.

Read the [Slack channel documentation](https://eve.dev/docs/channels/slack) to get started, or add the channel to your eve agent with `eve channels add slack`.

[

**Start an eve agent from a template**

Pick a template, deploy in minutes, and debug every agent session in the Vercel dashboard from the first run.

Build your agent



](https://eve.dev/templates)