---
title: "Introducing Vercel AI SDK 3.2"
source: "https://vercel.com/blog/introducing-vercel-ai-sdk-3-2"
publishedDate: "2024-06-18"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

4 min read

Jun 18, 2024

The importance of adapting quickly in an ever-changing AI world.

We’ve been listening to your feedback and working hard to expand the capabilities of the [AI SDK](https://sdk.vercel.ai/docs/introduction) while improving its existing functionality. Today, we’re launching AI SDK 3.2.

This release advances the [SDK](https://sdk.vercel.ai/docs/introduction) across four major areas:

-   [**Agents**](#agents)**:** Extended `generateText` and `streamText` for multi-step workflows
    
-   [**Providers**](#providers)**:** Added new providers and expanded capabilities for Anthropic and Google models
    
-   [**Embeddings**](#embeddings)**:** Introduced embeddings support to power use cases like retrieval augmented generation (RAG) and semantic search
    
-   [**DX improvements**](#dx-improvements)**:** Improved AI SDK observability and enabled client-side tool calls
    

## [Link to heading](#agents)Agents

As AI models become more capable, they’ve been charged with increasingly complex tasks — some of which require multiple steps. With the AI SDK 3.2, we’ve taken the first step towards making these agentic workflows much easier to build.

Let’s say you were building an application to analyze product feedback with an LLM.

```
await generateText({  model: openai('gpt-4o'),   system: "You are a product feedback analyzer. You summarize a piece of feedback, then determine whether it is positive, negative, or neutral."  prompt: userFeedback,});
```

To ensure the model generates useful information, you’ll probably want to first clean the data, then analyze it, and finally send it to a platform where your coworkers can also take a look. In other words, you want your LLM to act as a basic agent.

With just a few short additions, we can use the AI SDK to implement this agent.

```
await generateText({  model: openai('gpt-4-turbo'),   system: "You are a product feedback analyzer. You summarize feedback, then determine whether it is positive, negative, or neutral. If the feedback is not neutral, you send a message to our Slack channel with that feedback. Always clean the feedback before summarizing or categorizing. "  prompt: userFeedback,  tools: {    cleanUserFeedback: tool({      description: "Removes spam, PII, and profanity from raw user feedback",      parameters: z.object({userFeedback: z.string() }),      execute: async ({userFeedback}) => cleanUserFeedback(userFeedback),    }),    sendMessageToSlack: tool({      description: "Sends feedback to Slack"      parameters: z.object({ sentiment: z.enum(["positive", "negative", "neutral"), feedbackSummary: z.string()}),      execute: async ({ sentiment, feedbackSummary }) => {        sendMessageToSlack(sentiment, feedbackSummary)        process.exit(0);      },    }),  },  maxToolRoundtrips: 10,});
```

The agent will first call the `cleanFeedback` tool with `userFeedback` as input. It will then summarize and determine a sentiment for the cleaned feedback. Finally, it will call the `sendMessagetoSlack` tool send the sentiment and feedback summary to Slack before exiting.

This release is only the beginning of what’s necessary to support complex, autonomous agents, and we’ll continue to build on this work in future releases.

## [Link to heading](#providers)Providers

We’ve been adding support for new model providers, aided by the work of our wonderful community. With today’s 3.2 release, the AI SDK has added support for the following providers:

As providers upgrade their models’ capabilities, we’ve been updating the SDK’s functionality too. Image input is now supported for the following providers:

The up-to-date list of supported providers and capabilities can be found in the [AI SDK documentation](https://sdk.vercel.ai/providers/ai-sdk-providers).

We’ve also built an adapter to allow you to use LangChain’s AI tools and abstractions with the UI and streaming capabilities of the AI SDK. Check out [our docs](https://sdk.vercel.ai/providers/adapters/langchain) for more information.

## [Link to heading](#embeddings)Embeddings

AI applications often require representing model inputs and outputs as vectors in a high-dimensional space — especially for use cases like [RAG](https://vercel.com/guides/retrieval-augmented-generation). To solve this problem, embeddings provide _semantically_ _meaningful_ representations of content.

The most common method of comparing two embeddings vectors is cosine similarity — a measure of the semantic distance between pieces of embedded content.

This release extends the unified API of AI SDK Core to generating embeddings with the OpenAI, Mistral, Azure OpenAI, and Ollama providers.

```
// 'embedding' is a single embedding object (number[])const { embedding } = await embed({  model: openai.embedding('text-embedding-3-small'),  value: 'sunny day at the beach'});
```

When loading data, it can often be useful to embed many values at once.

```
// 'embeddings' is an array of embedding objects (number[][]).// It is sorted in the same order as the input values.const { embeddings } = await embedMany({  model: openai.embedding('text-embedding-3-small'),  values: [    'sunny day at the beach',    'rainy afternoon in the city',  ],});console.log(`Similarity from -1 to 1: ${cosineSimilarity(embeddings[0], embeddings[1])}`)
```

The AI SDK now also provides the `cosineSimilarity` helper function to help you determine semantic similarity between embedded values.

Pairing a vision model with semantic similarity using the AI SDK unlocks new applications like [semantic image search](https://semantic-image-search.labs.vercel.dev/).

To get an in-depth look at the code for this example, check out our [semantic image search template](https://github.com/vercel-labs/semantic-image-search)!

## [Link to heading](#dx-improvements)DX Improvements

The 3.2 release is laying the groundwork for AI observability with the AI SDK. We’ve made it easier to understand token usage and errors when using `streamText` and `streamObject`. We’ve also introduced the `onFinish` callback, which is invoked when the stream is finished and contains the token usage.

```
const result = await streamObject({  model: openai('gpt-4-turbo'),  schema: z.object({    name: z.object({      firstName: z.string(),      lastName: z.string(),    })  })      prompt: "Generate a random name",  onFinish({ object, error, usage, ...rest}) {    console.log("Token usage:", usage);    if (object === undefined) {      console.error("Error": error);    } else {      console.log("Success!", JSON.stringify(object, null, 2))    }      }    })
```

You can now also access the final, typed object as a promise from the `streamObject` result, allowing you to log and use the finished result with guaranteed type-safety.

```
const result = await streamObject({  model: openai('gpt-4-turbo'),  schema: z.object({    name: z.object({      firstName: z.string(),      lastName: z.string()    })  }),  prompt: "Generate a random name"});result.object.then(({ name }) => {  // Use the fully typed, final object with no ts-ignore needed  console.log("Name:", name.firstName, name.lastName);});
```

To reduce the AI SDK’s bundle size, we’ve also split AI SDK UI by framework. Our 3.2 release will be backwards compatible, but we recommend migrating to `@ai-sdk/react`, `@ai-sdk/vue`, `@ai-sdk/svelte`, or `@ai-sdk/solid`.

With this release, you can now build generative UI chatbots client-side with just `useChat` and `streamText` in your React projects. We’ve enabled client and server-side tool execution with `streamText` and the new `toolInvocations` and `onToolCall` utilities, which allows you to conditionally render UI based on which tools the LLM calls.

Here’s a simple example of a chatbot that tells the user where they’re chatting from.

app/api/chat/route.ts

```
export async function POST(req: Request) {  const { messages } = await req.json();  const result = await streamText({    model: openai('gpt-4-turbo'),    messages: convertToCoreMessages(messages),    tools: {      // client-side tool that starts user interaction:      askForConfirmation: {        description: "Ask the user for confirmation",        parameters: z.object({message: z.string().describe("The message to ask for confirmation") }),      },      // client-side tool that gets the user's location:      getLocation: {        description:          "Get the user location. Always ask for confirmation before using this tool.",        parameters: z.object({}),      },    }  })}
```

In your `streamText` call, you can omit the `execute` parameter to execute the tool on the client-side.

app/page.tsx

```
export default function Chat() {  const {    messages,    input,    handleInputChange,    handleSubmit,    addToolResult  } = useChat({    maxToolRoundtrips: 5,    // run client-side tools that are automatically executed    async function onToolCall({ toolCall }) {      if (toolCall.toolName === 'getLocation') {        return getUserLocation();      }    }  });  return (    <div>      {messages?.map((m: Message) => (        <div key={m.id}>          <strong>{m.role}:</strong>          {m.content}          {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {            const toolCallId = toolInvocation.toolCallId;            const addResult = (result: string) =>              addToolResult({ toolCallId, result });            // render confirmation tool (client-side tool with user interaction)            if (toolInvocation.toolName === 'askForConfirmation') {              return (                <div key={toolCallId}>                  {'result' in toolInvocation ? (                    <b>                      {toolInvocation.args.message}: {toolInvocation.result}                    </b>                  ) : (                    <>                      {toolInvocation.args.message}:{' '}                      <button onClick={() => addResult('Yes')}>Yes</button>                      <button onClick={() => addResult('No')}>No</button>                    </>                  )}                </div>              );            }          })}        </div>      ))}      <form onSubmit={handleSubmit}>        <input value={input} onChange={handleInputChange} />      </form>    </div>  );  }
```

You can use `onToolCall` within `useChat` to define functions to execute for client-side tools. `toolInvocation` gives you access to the tools the LLM has chosen to call on the client, which allows you to conditionally render UI components to handle tool calls — implementing probabilistic routing much like the `streamUI` function does in AI SDK RSC. `addToolResult` allows you to pass user-provided information back to the LLM for use in future responses.

## [Link to heading](#conclusion)Conclusion

With the [AI SDK](https://sdk.vercel.ai/docs/introduction) 3.2, we’re taking the first steps towards supporting two new use cases: [embeddings](https://sdk.vercel.ai/docs/ai-sdk-core/embeddings) and [agents](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling#tool-roundtrips). We’ll continue to update the SDK so you have access to the cutting edge of model providers and a seamless development experience when building with AI.

We can’t wait to see what you’ll build. Get started by [deploying your own image search app](https://github.com/vercel-labs/semantic-image-search?tab=readme-ov-file#deploy-your-own) or [experimenting with SDK model providers](https://sdk.vercel.ai/)!  

[

**Ship production-grade AI applications faster with Vercel**

Talk to our team to learn more about building AI-powered applications at your organization.

Contact Us



](https://vercel.com/contact/sales)