---
title: "Vercel AI SDK 3.3"
source: "https://vercel.com/blog/vercel-ai-sdk-3-3"
publishedDate: "2024-08-06"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

5 min read

Aug 6, 2024

Introducing tracing, multi-modal attachments, JSON streaming to clients, and more.

The [Vercel AI SDK](https://sdk.vercel.ai/) is a toolkit for building AI applications with JavaScript and TypeScript. Its unified API allows you to use any language model and provides powerful UI integrations into leading web frameworks such as [Next.js](https://nextjs.org/) and [Svelte](https://svelte.dev/).

Vercel AI SDK 3.3 introduces four major features:

-   [**Tracing**](#tracing) (experimental): instrument AI SDK functions using OpenTelemetry
    
-   [**Multi-Modal File Attachments**](#multi-modal-file-attachments) (experimental): send file attachments with `useChat`
    
-   [**useObject hook**](#useobject-hook) (experimental): stream structured object generation to the client
    
-   [**Additional LLM Settings**](#additional-llm-settings): raw JSON for tools and structured object generation, stop sequences, and sending custom headers
    

We have also added [AWS Bedrock](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock) and [Chrome AI (community)](https://sdk.vercel.ai/providers/community-providers/chrome-ai) model providers as well as many smaller features and additions. You can find all changes including minor features in our [changelog](https://sdk.vercel.ai/docs/troubleshooting/migration-guide/migration-guide-3-3).

Experimental features let you use the latest AI SDK functionality as soon as possible. However, they can change in patch versions. Please pin the patch version if you decide to use experimental features.

## [Link to heading](#tracing)Tracing

Given the non-deterministic nature of language models, observability is critical for understanding and developing AI applications. You need to be able to trace and understand timing, token usage, prompts, and response content for individual model calls.

The Vercel AI SDK now supports tracing with [OpenTelemetry](https://opentelemetry.io/), an open-source standard for recording telemetry information, as an experimental feature. Here is an example of how trace visualization looks with the [Vercel Datadog integration](https://vercel.com/integrations/datadog):

![Trace visualization with Datadog and the Vercel AI SDK](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1NpgJvfv176AOtoC05DaXJ%2F03584fb4bb8f888da1563453508d18b1%2FCleanShot_2024-08-02_at_17.56.31.png&w=1920&q=75)![Trace visualization with Datadog and the Vercel AI SDK](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7agw8xGasIusRa37EhJppZ%2Ff23d8e952f76d9684bbea702a6d06d8d%2FCleanShot_2024-08-02_at_17.58.28.png&w=1920&q=75)

Trace visualization with Datadog and the Vercel AI SDK

You can analyze the AI SDK tracing data with Vercel observability integrations such as [Datadog](https://vercel.com/integrations/datadog), [Sentry](https://vercel.com/integrations/sentry), and [Axiom](https://vercel.com/integrations/axiom). Alternatively, you can use LLM observability providers such as [LangFuse](https://langfuse.com/docs/integrations/vercel-ai-sdk), [Braintrust](https://www.braintrust.dev/docs/guides/tracing#vercel-ai-sdk), or [LangSmith](https://docs.smith.langchain.com/how_to_guides/tracing/trace_with_vercel_ai_sdk).

To [use telemetry with the Vercel AI SDK](https://sdk.vercel.ai/docs/ai-sdk-core/telemetry#telemetry), you need to configure it for your application. We recommend using `@vercel/otel` . If you are using Next.js and deploy on Vercel, you can add `instrumentation.ts` with the following code to your project:

instrumentation.ts

```
import { registerOTel } from '@vercel/otel';export function register() {  registerOTel({ serviceName: 'your-project-nameapp' });}
```

Because the tracing feature is experimental, you need to opt-in to record information using the `experimental_telemetry` option. You can also supply function IDs to identify the call location as well as additional metadata that you want to record.

```
const result = await generateText({  model: anthropic('claude-3-5-sonnet-20240620'),  prompt: 'Write a short story about a cat.',  experimental_telemetry: {     isEnabled: true,    functionId: 'my-awesome-function',    metadata: {      something: 'custom',      someOtherThing: 'other-value',    },  },});
```

Enabling the feature will record tracing data for your function calls. You can find more details in the [AI SDK telemetry documentation](https://sdk.vercel.ai/docs/ai-sdk-core/telemetry#telemetry). If you want to get started, check out our [deployable AI SDK Next.js tracing template](https://vercel.com/templates/Next.js/ai-chatbot-telemetry).

## [Link to heading](#multi-modal-file-attachments)Multi-Modal File Attachments

In many AI chat applications, users need to send attachments along with their messages, such as images, PDFs, and various media files. These attachments also need to be available for preview alongside messages to be viewed by users.

As a result, we have added `experimental_attachments` to the `handleSubmit()` handler of the `useChat()` React hook.

Check out [this example in action](https://ai-sdk-preview-attachments.vercel.app/) and [deploy the template](https://vercel.com/templates/Next.js/multi-modal-chatbot).

There are two ways to send attachments with a message, either by providing a `FileList` object or a list of URLs to the `handleSubmit` function:

### [Link to heading](#filelist)FileList

By using `FileList`, you can send multiple files as attachments along with a message using the file input element. The `useChat` hook will automatically convert them into data URLs and send them to the AI provider.

```
const { input, handleSubmit, handleInputChange } = useChat();const [files, setFiles] = useState<FileList | undefined>(undefined);return (  <form    onSubmit={(event) => {      handleSubmit(event, {        experimental_attachments: files,      });    }}  >    <input      type="file"      onChange={(event) => {        if (event.target.files) {          setFiles(event.target.files);        }      }}      multiple    />    <input type="text" value={input} onChange={handleInputChange} />  </form>);
```

### [Link to heading](#urls)URLs

You can also send URLs as attachments along with a message. This can be useful for sending links to external resources or media content.

```
const { input, handleSubmit, handleInputChange } = useChat();const [attachments] = useState<Attachment[]>([  {    name: 'earth.png',    contentType: 'image/png',    url: 'https://example.com/earth.png',  }]);return (  <form    onSubmit={event => {      handleSubmit(event, {        experimental_attachments: attachments,      });    }}  >    <input type="text" value={input} onChange={handleInputChange} />  </form>)
```

You can learn more in our [multi-modal chatbot guide](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot).

## [Link to heading](#useobject-hook)useObject hook

Structured data generation is a common requirement in AI applications, e.g. for extracting information from natural language inputs. With the new `useObject` hook, you can stream structured object generation directly to the client. This experimental feature, available today for React, allows you to create dynamic interfaces that show JSON objects as they're being streamed.

For example, imagine an application where you can enter your expenses as text for reimbursement. You can use AI to convert textual inputs into structured objects, and stream the structured expense to the user as it’s being processed:

Here's how you could implement this in a Next.js application. First, define a schema for the expenses. The schema is shared between client and server:

app/api/expense/schema.ts

```
import { z } from 'zod';export const expenseSchema = z.object({  expense: z.object({    category: z      .string()      .describe(        'Category of the expense. Allowed categories: ' +        'TRAVEL, MEALS, ENTERTAINMENT, OFFICE SUPPLIES, OTHER.',      ),    amount: z.number().describe('Amount of the expense in USD.'),    date: z      .string()      .describe('Date of the expense. Format yyyy-mmm-dd, e.g. 1952-Feb-19.'),    details: z.string().describe('Details of the expense.'),  }),});export type PartialExpense = DeepPartial<typeof expenseSchema>['expense'];export type Expense = z.infer<typeof expenseSchema>['expense'];
```

Then, you use [`streamObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-object) on the server to call the language model and stream an object:

app/api/expense/route.ts

```
import { anthropic } from '@ai-sdk/anthropic';import { streamObject } from 'ai';import { expenseSchema } from './schema';// Allow streaming responses up to 30 secondsexport const maxDuration = 30;export async function POST(req: Request) {  const { expense }: { expense: string } = await req.json();  const result = await streamObject({    model: anthropic('claude-3-5-sonnet-20240620'),    system:      'You categorize expenses into one of the following categories: ' +      'TRAVEL, MEALS, ENTERTAINMENT, OFFICE SUPPLIES, OTHER.' +      // provide date (including day of week) for reference:      'The current date is: ' +      new Date()        .toLocaleDateString('en-US', {          year: 'numeric',          month: 'short',          day: '2-digit',          weekday: 'short',        })        .replace(/(\w+), (\w+) (\d+), (\d+)/, '$4-$2-$3 ($1)') +      '. When no date is supplied, use the current date.',    prompt: `Please categorize the following expense: "${expense}"`,    schema: expenseSchema,    onFinish({ object }) {      // you could save the expense to a database here    },  });  return result.toTextStreamResponse();}
```

Finally, you consume the expense stream on a client page. While the expense is streaming, we preview the partial expense, and once the generation is finished, we append it to the list of expenses:

app/expense-tracker/page.tsx

```
'use client';import { experimental_useObject as useObject } from 'ai/react';import {  Expense,  expenseSchema,  PartialExpense,} from '../api/expense/schema';import { useState } from 'react';export default function Page() {  const [expenses, setExpenses] = useState<Expense[]>([]);  const { submit, isLoading, object } = useObject({    api: '/api/expense',    schema: expenseSchema,    onFinish({ object }) {      if (object != null) {        setExpenses(prev => [object.expense, ...prev]);      }    },  });  return (    <div>      <form onSubmit={e => {        e.preventDefault();        const input = e.currentTarget.expense as HTMLInputElement;        if (input.value.trim()) {          submit({ expense: input.value });          e.currentTarget.reset();        }      }}      >        <input type="text" name="expense" placeholder="Enter expense details"/>        <button type="submit" disabled={isLoading}>Log expense</button>      </form>      {isLoading && object?.expense && (        <ExpenseView expense={object.expense} />      )}      {expenses.map((expense, index) => (        <ExpenseView key={index} expense={expense} />      ))}    </div>  );}
```

The expenses are rendered using an ExpenseView that can handle partial objects with undefined properties with `.?` and `??` (styling is omitted for illustration purposes):

app/expense-tracker/page.tsx

```
const ExpenseView = ({ expense }: { expense: PartialExpense | Expense }) => (  <div>    <div>{expense?.date ?? ''}</div>    <div>${expense?.amount?.toFixed(2) ?? ''}</div>    <div>{expense?.category ?? ''}</p></div>    <div>{expense?.details ?? ''}</div>  </div>);
```

Check out [this example in action](https://ai-sdk-preview-use-object.labs.vercel.dev/) and [deploy the template](https://vercel.com/templates/Next.js/use-object).

You can use this approach to create generative user interfaces client-side for many different use cases. You can find more details on how to use it in our [object generation documentation](https://sdk.vercel.ai/docs/ai-sdk-ui/object-generation#object-generation).

## [Link to heading](#additional-llm-settings)Additional LLM Settings

Calling language models is at the heart of the Vercel AI SDK. We have listened to your feedback and extended our functions to support the following features:

-   [**JSON schema support for tools and structured object generation**](https://sdk.vercel.ai/docs/reference/ai-sdk-core/json-schema)**:** As an alternative to Zod schemas, you can now use JSON schemas directly with the `jsonSchema` function. You can supply the type annotations and an optional validation function, giving you more flexibility especially when building applications with dynamic tools and structure generation.
    
-   [**Stop sequences**](https://sdk.vercel.ai/docs/ai-sdk-core/settings#stopsequences)**:** Text sequences that stop generations have been an important feature when working with earlier language models that used raw text prompts. They are still relevant for many use cases, allowing you more control over the end of a text generation. You can now use the `stopSequences` option to define stop sequences in `streamText` and `generateText`.
    
-   [**Sending custom headers**](https://sdk.vercel.ai/docs/ai-sdk-core/settings#headers)**:** Custom headers are important for many use cases, like sending tracing information, enabling beta provider features, and more. You can now send custom headers using the `headers` option in most AI SDK functions.
    

With these additional settings, you have more control and flexibility when working with language models in the Vercel AI SDK.

## [Link to heading](#conclusion)Conclusion

With new features like OpenTelemetry support, `useObject`, and support for attachments with `useChat`, it’s never been a better time to start building AI applications.

-   **Start a new AI project**: Ready to build something new? Check out our [multi-modal chatbot guide](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot).
    
-   **Explore our templates**: Visit our [Template Gallery](https://vercel.com/templates?type=ai) to see the AI SDK in action and get inspired for your next project.
    
-   **Join the community**: Let us know what you’re building with the AI SDK in our [GitHub Discussions](https://github.com/vercel/ai/discussions/1914).
    

We can't wait to see what you'll build next with Vercel AI SDK 3.3!

## [Link to heading](#contributors)Contributors

Vercel AI SDK 3.3 is the result of the combined work of our core team at Vercel and many community contributors.

Special thanks for contributing merged pull requests:

[gclark-eightfold](https://github.com/gclark-eightfold), [dynamicwebpaige](https://github.com/dynamicwebpaige), [Und3rf10w](https://github.com/Und3rf10w), [elitan](https://github.com/elitan), [jon-spaeth](https://github.com/jon-spaeth), [jeasonstudio](https://github.com/jeasonstudio), [InfiniteCodeMonkeys](https://github.com/InfiniteCodeMonkeys), [ruflair](https://github.com/ruflair), [MrMaina100](https://github.com/MrMaina100), [AntzyMo](https://github.com/AntzyMo), [samuelint](https://github.com/samuelint), [ian-pascoe](https://github.com/ian-pascoe), [PawelKonie99](https://github.com/PawelKonie99), [BrianHung](https://github.com/BrianHung), [Ouvill](https://github.com/Ouvill), [gmickel](https://github.com/gmickel), [developaul](https://github.com/developaul), [elguarir](https://github.com/elguarir), [Kunoacc](https://github.com/Kunoacc), [florianheysen](https://github.com/florianheysen), [rajuAhmed1705](https://github.com/rajuAhmed1705), [suemor233](https://github.com/suemor233), [eden-chan](https://github.com/eden-chan), [DraganAleksic99](https://github.com/DraganAleksic99), [karl-richter](https://github.com/karl-richter), [rishabhbizzle](https://github.com/rishabhbizzle), [vladkampov](https://github.com/vladkampov), [AaronFriel](https://github.com/AaronFriel), [theitaliandev](https://github.com/theitaliandev), [miguelvictor,](https://github.com/miguelvictor) [jferrettiboke,](https://github.com/jferrettiboke) [dhruvvbhavsar,](https://github.com/dhruvvbhavsar) [lmcgartland,](https://github.com/lmcgartland) [PikiLee](https://github.com/PikiLee)

Your feedback and contributions are invaluable as we continue to evolve the SDK.