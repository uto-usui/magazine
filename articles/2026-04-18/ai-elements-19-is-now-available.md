---
title: "AI Elements 1.9 is now available"
source: "https://vercel.com/changelog/ai-elements-1-9"
publishedDate: "2026-03-12"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Mar 12, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7g3YLWsFKnsKGIHuyYt9Ik%2Fea42d72556d78087b32c279834be707f%2Fnpx-ai-elements.png&w=1920&q=75)

AI Elements 1.9 adds new components, an agent skill, and a round of bug fixes across the library.

**AI Elements skill**

You can now install an AI Elements skill into your preferred agent, giving it a better understanding of how to build and use composable AI interfaces.

```
npx skills add vercel/ai-elements
```

**<JSXPreview />**

The new `<JSXPreview />` component renders JSX strings dynamically, supporting streaming scenarios where JSX may be incomplete. It automatically closes unclosed tags during streaming, making it a good fit for displaying AI-generated UI in real time.

```
npx ai-elements@latest add jsx-preview
```

**<PromptInputActionAddScreenshot />**

A new `<PromptInput />` sub-component that captures a screenshot of the current page, useful for giving visual feedback to AI models.

```
npx ai-elements@latest add prompt-input
```

**Download conversations**

The `<Conversation />` component now includes an optional button that downloads the conversation as a markdown file.

Read the [documentation](https://elements.ai-sdk.dev/docs) to get started.