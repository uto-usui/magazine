---
title: "An Introduction to Streaming on the Web"
source: "https://vercel.com/blog/an-introduction-to-streaming-on-the-web"
publishedDate: "2023-06-22"
category: "frontend"
feedName: "Vercel"
author: "Lydia Hallie"
---

6 min read

Jun 22, 2023

Chunking data, handling backpressure, server-side events, and more.

The ability to process data as it streams has always been a fundamental concept in computer science. JavaScript developers had access to streaming through `XMLHttpRequest`, but it wasn't until 2015 that it was accessible natively through the Fetch API.

[Web streams](https://streams.spec.whatwg.org/) provide a standardized way to continuously send or receive data asynchronously across network connections. They bring the power of streaming to the web, enabling developers to handle large data sets through "chunks", deal with congestion control (_backpressure_), and create highly efficient and responsive applications.

Leveraging web streams in your web apps can enhance the performance and responsiveness of your UIs. The immediate data processing allows for real-time updates and interactions, providing a seamless user experience with quicker load times, more up-to-date information, and a smoother, more interactive interface.

Due to their increasing popularity, the [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) has become a cornerstone of many major web platforms, including web browsers, Node.js, and Deno. In this blog post, we’ll look at what web streams are; how they work, the many advantages they bring to the table for your website, streaming on Vercel, and tools built around web streams that we can use today.

![Comparison between a non-streaming and streaming HTTP response ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FNsyhwYpQewiSNpPLBLF1b%2F8a443223fa5b48c18e9e58a3dcd93c01%2FBlog_Graphics.png&w=1920&q=75)![Comparison between a non-streaming and streaming HTTP response ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fl44Sp8MrrZJTWHCb6Kt0y%2F112bf17e865021de4c8a3bf85714587b%2FBlog_Graphics.png&w=1920&q=75)

Comparison between a non-streaming and streaming HTTP response

Web streams provide several key advantages, especially around **efficiency** and **control:**

1.  **Instant data processing**: As data arrives in chunks, it can be processed without waiting for the entire payload. This can significantly enhance the perceived performance of large data loads or slow network connections.
    
2.  **Fine-grained control**: Web streams allow developers to control how data is read and processed, accommodating specific needs and scenarios.
    

Web streams can generally be categorized into three types: `WritableStream`, `ReadableStream` and `TransformStream`. While all three types are involved in handling streaming data, they each have their own role:

-   ​**`WriteableStream`**: Write data (but not read) to any destination through a "writer".
    
-   **`ReadableStream`**: Asynchronously read data (but not write) through a "reader".
    
-   **`TransformStream`**: Manipulate or transform data as it's being transferred
    

Web streams can be piped together, creating a chain of data processing steps that enhances code readability, maintainability, and makes it easy to create complex data processing pipelines.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F78okwOALMPBf6LIokSLB1s%2Ff9411916141a0597babfdfeb039f6ccf%2FBlog_Graphics.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Femx8f4mH64AU3OON776Rn%2Fc32d231258cfa43968e934cbfb0bbe94%2FBlog_Graphics.png&w=1920&q=75)

## [Link to heading](#chunks)Chunks

Chunks are the fundamental data units in web streams, often represented as strings (for text streams) or Uint8Arrays (for binary streams). Chunks can take many shapes and sizes influenced by certain factors, such as:

1.  **Data source.** If you're reading data from a file, the operating system might read the file in blocks of a certain size, which could influence the chunk size.
    
2.  **Stream implementation**. It might buffer data to send it in larger chunks or as soon as it's available, resulting in smaller chunks.
    
3.  **Local development environment.** In local development, chunk sizes might be more influenced by the stream implementation than network conditions, as there's no actual network transmission happening in local development.
    
4.  **Network.** The network's [Maximum Transmission Unit](https://www.cloudflare.com/learning/network-layer/what-is-mtu/) setting can limit chunk size, especially in data transmission over a network. The physical distance between the client and server can also cause the chunks to get [fragmented](https://vercel.com/docs/concepts/functions/edge-functions/streaming#caveats).
    

Writing your code to handle chunks of any size is important, as it's unpredictable and often beyond your control.

Let’s take a look at an example.

```
const decoder = new TextDecoder();const encoder = new TextEncoder();const readableStream = new ReadableStream({  start(controller) {    const text = "Stream me!";    controller.enqueue(encoder.encode(text));    controller.close();  },});const transformStream = new TransformStream({  transform(chunk, controller) {    const text = decoder.decode(chunk);    controller.enqueue(encoder.encode(text.toUpperCase()));  },});const writableStream = new WritableStream({  write(chunk) {    console.log(decoder.decode(chunk));  },});readableStream   .pipeThrough(transformStream)   .pipeTo(writableStream); // STREAM ME!
```

First, we encode the string `"Stream me!"` and enqueue it into a `ReadableStream`. This `ReadableStream` effectively becomes a source of data that other streams can consume.

To allow data to flow from the `ReadableStream` to another stream, we can use the `pipeThrough` method. In this instance, we're using a `TransformStream`, which accepts input, manipulates it, and outputs the transformed data. Our `TransformStream` receives chunks of data, decodes it into a text string, transforms the string to uppercase, re-encodes it back, and then enqueues the transformed chunk for consumption by the next stream.

Lastly, we direct our transformed data to a `WritableStream` using the `pipeTo` method. `WritableStream` is essentially an endpoint that allows us to consume the data in a customized way. In this case, we decode the incoming data chunk and log it to the console.

One primary method of interacting with web streams is through the Fetch API. When reading streamed data from a fetch request, the `getReader` method on the response's body allows sequential reading of data chunks as they arrive, enabling you to handle large amounts of data efficiently.

```
const decoder = new TextDecoder();const response = await fetch('/api/stream');const reader = response.body.getReader();let done = false;while (!done) {  const { value, done: doneReading } = await reader.read();  done = doneReading;  const data = JSON.parse(decoder.decode(value));  // Do something with data} 
```

## [Link to heading](#handling-backpressure)**Handling backpressure**

One of the most powerful features of web streams is their ability to handle _backpressure,_ which happens when the data producer generates data faster than the consumer can process it, for example a high-speed server sending data to a client with a slower internet connection.

When there’s a mismatch between the production and consumer processing rate, the exceeding items will be queued and wait to be processed by the consumer. If this continues for an extended period, the queue will continue to grow, potentially leading to a memory overflow if there's not enough available memory to store the queued items.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4meeBWN6eJwj192LSI0pr1%2F9caa0fed2b93d299488264ada712b357%2FBlog_Graphics.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6r3bBoTw2z9kpgvV6hVtbi%2F2b3804d5c031c4192b575cadf236dba1%2FBlog_Graphics.png&w=1920&q=75)

Handling backpressure can be challenging since it requires a good balance between **the rate at which data is produced and consumed**. Uncontrolled data production can lead to memory issues since the incoming data has to be buffered, but halting production until all data has been processed can be inefficient; the producer would remain idle while there may still be processing capacity available.

### [Link to heading](#handling-backpressure-with-web-streams)Handling backpressure with web streams

Web streams handle backpressure through _**flow control.**_ When the stream is in a `"readable"` state, data can flow from the producer to the consumer. If the incoming data begins to outpace the consumer's processing capacity, the stream transitions to a `"backpressure"` state. This state sends a signal to the producer to pause data production.

When the consumer starts to catch up, the stream switches back to the `"readable"` state which resumes the data production. This automatic pause-and-resume mechanism prevents the consumer from getting overwhelmed with data and ensures that the producer doesn't remain idle unnecessarily.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1yWEO1cUT1x7tT3EvKLM3c%2F5e2e26225a4fae07f051589a857ae9c5%2FBlog_Graphics.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2K9nvGLZOgYv1ZXPln2FF3%2F39289ee87cfe5225c92808f8e56d6b3d%2FBlog_Graphics.png&w=1920&q=75)

In a `ReadableStream`, backpressure is applied indirectly through the reader. When a reader pulls chunks from the stream, it signals that it's ready to handle more data. If the reader doesn't pull more data, e.g. by not calling the `read` method, the stream infers that the reader is busy and shouldn't be sent more data for the time being.

`WritableStreams` expose backpressure directly to the **writer**. The `write` method returns a promise, which only resolves when the stream is ready for more data. An accumulation of unresolved promises would indicate backpressure.

```
const stream = new WritableStream(...)async function writeData(data) {    const writer = stream.getWriter();    for (const chunk of data) {        // Wait for the ready promise to resolve before writing the next chunk        await writer.ready;        writer.write(chunk);    }    writer.close();}
```

Using the await keyword pauses the execution until the promise resolves, which indicates that the stream is ready for more data. This ensures that we don't write data faster than the writable stream can handle.

## [Link to heading](#server-sent-events-)**Server-Sent Events**

[Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) are a popular way to stream real-time updates from a server to a client. While web streams are primarily used for data processing, SSEs maintain an open connection with the server, enabling new data to be transmitted as it becomes available.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7tKzqotEW6GaRmbUGLVbE9%2Ff0d0e6f63b20eaf49091ebadc0be44a1%2FBlog_Graphics.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4U23NHnZw99eZn9FWrGd0E%2Fe9b6da2d3e858f289a0230bc30bd14c1%2FBlog_Graphics.png&w=1920&q=75)

Whereas web streams close the HTTP connection once all the data has been sent, Server-Sent Events use a long-lived HTTP connection to ensure the server can send more events once they’re available. SSEs are popular for applications requiring real-time data, including AI providers such as [OpenAI](https://platform.openai.com/docs/api-reference/chat/create#chat/create-stream).

To handle the SSE’s returned plain text response, we can use the [`eventsource-parser`](https://github.com/rexxars/eventsource-parser) library to parse the fragmented chunks that are passed through the `feed` function.

```
import { createParser } from "eventsource-parser";export function OpenAITextStream(  res: Response,): ReadableStream {  const encoder = new TextEncoder()  const decoder = new TextDecoder()  let counter = 0  const stream = new ReadableStream({    async start(controller): Promise<void> {      function onParse(event: ParsedEvent | ReconnectInterval): void {        if (event.type === 'event') {          const data = event.data          if (data === '[DONE]') {            controller.close()            return          }          try {            const json = JSON.parse(data)            const text =              json.choices[0]?.delta?.content ?? json.choices[0]?.text ?? ''            if (counter < 2 && (text.match(/\n/) || []).length) {              return            }            const queue = encoder.encode(`${JSON.stringify(text)}\n`)            controller.enqueue(queue)            counter++          } catch (e) {            controller.error(e)          }        }      }      const parser = createParser(onParse)      // [Asynchronously iterate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) the response's body      for await (const chunk of res.body as any) {        parser.feed(decoder.decode(chunk))      }    }  })  return stream}
```

A complete example can be found [in this repo](https://github.com/Nutlope/twitterbio/blob/8d40e3cbbf7603f65641e5978899d30aa72fdca4/utils/OpenAIStream.ts#L39).

## [Link to heading](#streaming-on-vercel)Streaming on Vercel

Vercel supports web streams in both Edge and Serverless environments, making it easy to handle real-time data efficiently. It can stream JSON data back to the client, or even progressively render UI pieces.

```
export const config = {  runtime: "edge",};const delay = (ms) => new Promise((res) => setTimeout(res, ms));export default async function handler() {  const encoder = new TextEncoder();  const readable = new ReadableStream({    async start(controller) {      controller.enqueue(encoder.encode("<html><body>"));      await delay(500);      controller.enqueue(encoder.encode("<ul><li>List Item 1</li>"));      await delay(500);      controller.enqueue(encoder.encode("<li>List Item 2</li>"));      await delay(500);      controller.enqueue(encoder.encode("<li>List Item 3</li></ul>"));      await delay(500);      controller.enqueue(encoder.encode("</body></html>"));      controller.close();    },  });  return new Response(readable, {    headers: { "Content-Type": "text/html; charset=utf-8" },  });}
```

Progressively rendering can be used to improve perceived performance for users, especially those with slow internet connections. The same principle applies to streaming JSON data, where you might want to send parts of a large dataset as they become available.

### [Link to heading](#vercel-ai-sdk)Vercel AI SDK

Building UIs around LLM data has become increasingly popular with the rise of AI providers, and streaming LLM responses have introduced significant changes in app development.

The decision to use streaming depends on factors such as the language model's size, response speed, and response length. Large models can generate complex responses but may slow down response times due to increased computational demands. Smaller models, while less capable, deliver quicker responses.

The model size and interface style choice rely on factors like required response speed and complexity. [Streaming](https://platform.openai.com/docs/api-reference/completions/create#completions/create-stream) lengthier responses can boost the perceived responsiveness, but it demands a more complex setup and management than a blocking UI.

The [Vercel AI SDK](https://sdk.vercel.ai/) helps minimize the boilerplate associated with handling streaming responses, making fetching and rendering streaming responses much easier.

app/api/chat/route.ts

```
import { OpenAIStream, StreamingTextResponse } from 'ai'export const runtime = 'edge'export async function POST(req: Request) {  const response = await openai.createChatCompletion({    model: 'gpt-3.5-turbo',    stream: true,    messages: [...]  })  // Convert the response into a friendly text-stream  const stream = OpenAIStream(response)  // Respond with the stream  return new StreamingTextResponse(stream)}
```

This streaming response can be used by the package’s [`useChat`](https://sdk.vercel.ai/docs/api-reference) and [`useCompletion`](https://sdk.vercel.ai/docs/api-reference) [hooks](https://sdk.vercel.ai/docs/api-reference), which can be used to build a UI around the response easily.  

```
'use client'import { useChat } from 'ai'export default function Chat() {  const { messages, input, handleInputChange, handleSubmit } = useChat()  return ...}
```

## [Link to heading](#conclusion)**Conclusion**

Web streams have fundamentally transformed the way we handle data in web applications. They provide a powerful, efficient, and standardized way to process large amounts of data asynchronously.

With their capability to handle backpressure and deliver data chunk-by-chunk, they can significantly enhance the performance of applications, especially those dealing with heavy data loads or operating over slow network connections. Transforming data during transit opens up a whole new realm of possibilities for data processing and manipulation.