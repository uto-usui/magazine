---
title: "Chat SDK adds message subjects and direct SDK access"
source: "https://vercel.com/changelog/chat-sdk-adds-message-subjects-and-direct-sdk-access"
publishedDate: "2026-05-20"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

May 20, 2026

You can now read the parent issue or pull request when your bot is mentioned in a Linear or GitHub comment. `message.subject` resolves to that parent with title, status, URL, and the full typed payload.

lib/bot.ts

```
bot.onNewMention(async (thread, message) => {  const subject = await message.subject;  if (subject) {    await thread.post(      `This is about: ${subject.title} (${subject.status})\n${subject.url}`    );  }});
```

Reply to a mention with the parent issue's title, status, and URL

`message.subject` is cached per message, so repeated access only hits the API once. It resolves to `null` on Slack and other chat platforms, where there's no parent resource.

## [Link to heading](#direct-access-to-platform-sdks)Direct access to platform SDKs

The GitHub, Linear, and Slack adapters now expose their underlying platform SDKs. Use them to extend your bot by calling provider APIs directly.

```
// Add a "triaged" label to issue #42const { octokit } = bot.getAdapter("github");await octokit.rest.issues.addLabels({ owner: "vercel", repo: "chat", issue_number: 42, labels: ["triaged"] });// Create a new issue in a teamconst { linearClient } = bot.getAdapter("linear");await linearClient.createIssue({ teamId: "TEAM_ID", title: "Investigate flaky test" });// Pin a message in a channelconst { webClient } = bot.getAdapter("slack");await webClient.pins.add({ channel: "C123ABC", timestamp: "1234567890.123456" });
```

Add a GitHub label, create a Linear issue, or pin a Slack message

The previous `.client` getter remains as a `@deprecated` alias on the adapters.

Read the [documentation](https://chat-sdk.dev/docs/subject) to get started, or explore one of our [templates](https://chat-sdk.dev/resources).

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)