---
title: "Introducing AI Elements: Prebuilt, composable AI SDK components"
source: "https://vercel.com/changelog/introducing-ai-elements"
publishedDate: "2025-08-06"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Aug 6, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2CSEG3aHx2MfFyYv4PIiiJ%2Fa0dba7f85831140f8e518b6bcc0e5d6d%2FTwitter_post_-_4__2_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1eyQHy7jmkdZtRhZQJBPIG%2F4d084813e88bd411a0169983105bb8b7%2FTwitter_post_-_6.png&w=1920&q=75)

[AI Elements](https://ai-sdk.dev/elements/overview) is a new open source library of customizable React components for building interfaces with the Vercel AI SDK.

Built on [`shadcn/ui`](https://ui.shadcn.com/), it provides full control over UI primitives like message threads, input boxes, reasoning panels, and response actions.

For example, you can use `useChat` from the [AI SDK](https://ai-sdk.dev/) to manage state and streaming, and render responses using AI Elements.

```
import { Message, MessageContent } from "@/components/ai-elements/message";import { Response } from "@/components/ai-elements/response";import { useChat } from "@ai-sdk/react";export default function Example() {  const { messages } = useChat();  return messages.map((message) => (    <Message from={message.role} key={message.id}>      <MessageContent>        {message.parts          .filter((part) => part.type === "text")          .map((part, i) => (            <Response key={`${message.id}-${i}`}>{part.text}</Response>          ))}      </MessageContent>    </Message>  ));}
```

### [Link to heading](#getting-started)**Getting started**

To install the components, you can initialize with [our CLI](https://ai-sdk.dev/elements/overview/setup), and pick your components, import them, and start building.

Terminal

```
npx ai-elements@latest
```

[Read the docs](https://ai-sdk.dev/elements/overview) and start building better AI interfaces, faster.

AI Elements replaces ChatSDK with a more flexible set of UI building blocks for AI interfaces. ChatSDK will be migrated to a dedicated Next.js template. Future templates will use AI Elements to support a wider range of AI-native interface patterns beyond chat.