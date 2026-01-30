---
title: "Building a GPT-3 app with Next.js and Vercel Edge Functions"
source: "https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions"
publishedDate: "2023-02-01"
category: "frontend"
feedName: "Vercel"
author: "Hassan El Mghari"
---

6 min read

Feb 1, 2023

A full-stack template for building fast GPT-3 apps.

The field of artificial intelligence continues to take the world by storm. Huge strides have been made in text and image generation through tools like ChatGPT, GPT-3, DALL-E, and Stable Diffusion. It’s spawned a wave of exciting AI startups, many of which we’re seeing [built with Vercel and Next.js](https://twitter.com/steventey/status/1610656840412696578?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_building_a_gpt3_app).

One of the most exciting developments in the AI space is GPT-3, a cutting-edge natural language processing model developed by [OpenAI](https://vercel.com/docs/integrations/openai). With its ability to understand and generate human-like text, GPT-3 has the potential to disrupt how we perform many of our tasks.

In this blog post, we’re going to break down how to build GPT-3 Apps with OpenAI, Next.js, and [Vercel Edge Functions](https://vercel.com/features/edge-functions). We’ll do this by building [twitterbio.com](https://www.twitterbio.com/)—first with serverless functions, then rebuilding it with Edge Functions and streaming to showcase the speed and UX benefits. By the end, you should be able to build your own GPT-3-powered applications.

## [Link to heading](#the-frontend)The frontend

The Next.js frontend consists of a few elements:

-   A text box for users to copy their current bio or write a few sentences about themselves
    
-   A dropdown where they can select the tone of the bio they want to be generated
    
-   A submit button for generating their bio, which when clicked calls an API route that uses OpenAI’s GPT-3 model and returns two generated bios
    
-   Two containers to display the generated bios after we get them back from the API route
    

Here’s what the code for our [index page](https://github.com/Nutlope/twitterbio/blob/serverless/pages/index.tsx) looks like. We have a few pieces of state that correspond to the elements mentioned above. We’re also defining a prompt—like ChatGPT, we need to send a prompt to GPT-3 to instruct it to generate the new bios. Finally, we ask GPT-3 to generate two bios clearly labeled (so we can parse them correctly) using the user-provided bio and vibe as context.

```
const prompt = `Generate 2 ${vibe} twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure each generated bio is at least 14 words and at max 20 words and base  them on this context: ${bio}`;
```

The rest of our index page is comprised of the UI elements themselves: our text box, dropdown, submit button, and two containers on the bottom that we display when we get the generated bios. There's also some loading logic for the button to show a loading indicator when clicked.

GenerateBio.tsx

```
<textarea  value={bio}  onChange={(e) => setBio(e.target.value)}  rows={4}  className="..."  placeholder={"e.g. Senior Engineer @vercel. Tweeting about web dev & AI."}/><div className="...">  <Image src="/2-black.png" width={30} height={30} alt="1 icon" />  <p className="...">Select your vibe.</p></div><div className="block">  <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} /></div><button className="..." onClick={(e) => generateBio(e)}>  Generate your bio &rarr;</button><hr className="..." /><div className="...">  {generatedBios && (    <>      <div>        <h2 className="...">Your generated bios</h2>      </div>      <div className="...">        {generatedBios          .substring(generatedBios.indexOf("1") + 3)          .split("2.")          .map((generatedBio: any) => {            return (              <div className="..." key={generatedBio}>                <p>{generatedBio}</p>              </div>            );          })}      </div>    </>  )}</div>
```

In addition to the UI elements and the loading logic, we have a `generateBio` function that’s called when the user clicks the submit button. This sends a `POST` request to our `/api/generate` API route with the prompt in the body.

GenerateBio.tsx

```
const generateBio = async (e: any) => {  e.preventDefault();  setGeneratedBios("");  setLoading(true);  const response = await fetch("/api/generate", {    method: "POST",    headers: {      "Content-Type": "application/json",    },    body: JSON.stringify({      prompt,    }),  });  if (!response.ok) {    throw new Error(response.statusText);  }  let answer = await response.json();  setGeneratedBios(answer.choices[0].text);  setLoading(false);};
```

We get the generated bios back from the API route, save it to the `generatedBios` state, then display it to the user. Because we asked GPT-3 to return the text in a specific numbered format, we can split it based on the “2.” to show the user the two bios separated nicely into containers as seen below.

![Screenshot of the site showing two generated bios.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1G4yjOzi9Q65TdUvcRZYwa%2F13bfece2aae61192c047933f6fe96512%2FUntitled__6_.png&w=1920&q=75)

Screenshot of the site showing two generated bios.

## [Link to heading](#the-backend)The backend

A great advantage of using Next.js is being able to handle both our frontend and backend in a single application. We can spin up an API route just by creating a file called `generate.ts` in our `api` folder. Let’s take a look at our `/api/generate` API Route.

We get the prompt from the request body that’s passed in on the frontend, then construct a payload to send to OpenAI. In this payload, we specify some important information like the exact model (GPT-3) and how many tokens we want OpenAI to respond with (a token is approximately 4 characters). In this case, we’re limiting the max tokens because Twitter bios have a character constraint.

After the payload is constructed, we send it in a `POST` request to OpenAI, await the result to get back the generated bios, then send them back to the client as JSON.

generate.js

```
export default async function handler(req, res) {  const { prompt } = req.body;  const payload = {    model: "text-davinci-003",    prompt,    temperature: 0.7,    top_p: 1,    frequency_penalty: 0,    presence_penalty: 0,    max_tokens: 200,    n: 1,  };  const response = await fetch("https://api.openai.com/v1/completions", {    headers: {      "Content-Type": "application/json",      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,    },    method: "POST",    body: JSON.stringify(payload),  });  const json = await response.json();  res.status(200).json(json);}
```

There we have it! We built the first version of our application. Feel free to check out the [code](https://github.com/Nutlope/twitterbio/tree/serverless) and [demo](https://twitterbio-git-serverless-randomteam.vercel.app/) for this approach.

## [Link to heading](#limitations-of-the-serverless-function-approach)Limitations of the serverless function approach

While this serverless approach works, there are some limitations that make edge a better fit for this kind of application:

1.  If we’re building an app where we want to await longer responses, such as generating entire blog posts, responses will likely take over 10 seconds which can lead to serverless timeout issues on Vercel’s Hobby tier. Vercel's [Pro tier](https://vercel.com/pricing) has a 60-second timeout which is usually enough for GPT-3 applications.
    
2.  Waiting several seconds before seeing any data isn't a good user experience. Ideally, we want to incrementally show the user data as it’s being generated—similar to how ChatGPT works.
    
3.  The responses may take even longer due to the cold start that’s present in serverless lambda functions.
    

**Thankfully, there is a better way to build this application that addresses all three of these problems:** [**Vercel Edge Functions**](https://vercel.com/features/edge-functions) **with streaming.** Edge Functions may not always be the answer, especially if you're replying on specific Node.js libraries that are not edge compatible. In this case however, they will work great.

Let’s explore what Edge Functions are and how we can migrate our app to use them for faster generations and a better user experience.

## [Link to heading](#edge-functions-vs.-serverless-functions)Edge Functions vs. Serverless Functions

You can think of Edge Functions as serverless functions with a more lightweight runtime. They have a smaller code size limit, smaller memory, and don’t support all Node.js libraries. So you may be thinking—why would I want to use them?

Three answers: speed, UX, and longer timeouts.

1.  Because Edge Functions use a smaller edge runtime and run very close to users on the edge, they’re also fast. They have virtually no cold starts and are significantly faster than serverless functions.
    
2.  They allow for a great user experience, especially when paired with streaming. Streaming a response breaks it down into small chunks and progressively sends them to the client, as opposed to waiting for the entire response before sending it.
    
3.  Edge Functions have a timeout of 25 seconds and even longer when streaming, which far exceeds the timeout limit for serverless functions on Vercel’s Hobby plan. Using these can allow you to get past timeout issues when using AI APIs that take longer to respond. As an added benefit, Edge Functions are also cheaper to run.
    

_To see a demo of Serverless vs Edge Functions in action, check out the video below, specifically from 4:05 to 4:40._

## [Link to heading](#edge-functions-with-streaming)Edge Functions with streaming

Now that we understand the benefits and cost-effectiveness of using Edge Functions, let’s refactor our existing code to use them. Let’s start with our backend's API route.

The first thing we do is define a config variable and set the runtime to `"edge"`. This is all you need to define this API route as an Edge Function. We also added an extra variable to our payload, `stream: true`, to make sure OpenAI streams in chunks back to the client.

Finally, the last major change to this file is to define the stream variable after specifying the payload. We used a helper function, `OpenAIStream`, to enable us to incrementally stream responses to the client as we get data from OpenAI.

generate.ts

```
import { OpenAIStream } from "../../utils/OpenAIStream";export const config = {  runtime: "edge",};const handler = async (req: Request): Promise<Response> => {  const { prompt } = (await req.json()) as {    prompt?: string;  };  const payload = {    model: "text-davinci-003",    prompt,    temperature: 0.7,    top_p: 1,    frequency_penalty: 0,    presence_penalty: 0,    max_tokens: 200,    stream: true,    n: 1,  };  const stream = await OpenAIStream(payload);  return new Response(stream);};export default handler;
```

Let’s take a look at the helper function we used. It sends a `POST` request to OpenAI with the payload, similar to how we did it in the serverless version, but this is where the similarities stop. We create a stream to continuously parse the data we’re receiving from OpenAI, all while waiting for the `[DONE]` token to be sent since this signifies the end. When this happens, we close the stream.

OpenAIStream.ts

```
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";export async function OpenAIStream(payload) {  const encoder = new TextEncoder();  const decoder = new TextDecoder();  let counter = 0;  const res = await fetch("https://api.openai.com/v1/completions", {    headers: {      "Content-Type": "application/json",      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,    },    method: "POST",    body: JSON.stringify(payload),  });  const stream = new ReadableStream({    async start(controller) {      function onParse(event: ParsedEvent | ReconnectInterval) {        if (event.type === "event") {          const data = event.data;          if (data === "[DONE]") {            controller.close();            return;          }          try {            const json = JSON.parse(data);            const text = json.choices[0].text;            if (counter < 2 && (text.match(/\n/) || []).length) {              return;            }            const queue = encoder.encode(text);            controller.enqueue(queue);            counter++;          } catch (e) {            controller.error(e);          }        }      }     // stream response (SSE) from OpenAI may be fragmented into multiple chunks     // this ensures we properly read chunks & invoke an event for each SSE event stream     const parser = createParser(onParse);      // https://web.dev/streams/#asynchronous-iteration      for await (const chunk of res.body as any) {        parser.feed(decoder.decode(chunk));      }    },  });  return stream;}
```

In our frontend, the only code that changes is our `generateBio` function. Specifically, we define a reader using the native web API, [getReader()](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader), and progressively add data to our `generatedBio` state as it’s streamed in.

GenerateBio.tsx

```
const generateBio = async (e: any) => {    e.preventDefault();    setGeneratedBios("");    setLoading(true);    const response = await fetch("/api/generate", {      method: "POST",      headers: {        "Content-Type": "application/json",      },      body: JSON.stringify({        prompt,      }),    });    if (!response.ok) {      throw new Error(response.statusText);    }    const data = response.body;    if (!data) {      return;    }    const reader = data.getReader();    const decoder = new TextDecoder();    let done = false;    while (!done) {      const { value, done: doneReading } = await reader.read();      done = doneReading;      const chunkValue = decoder.decode(value);      setGeneratedBios((prev) => prev + chunkValue);    }    setLoading(false);  };
```

We’ve now refactored our app to use Edge Functions with streaming, making it faster and greatly improving the user experience by incrementally displaying data as it comes in.

## [Link to heading](#resources)Resources

We hope this walkthrough helps you build incredible GPT-3 powered applications. We’ve already seen several sites built with this template such as [Rephraser](https://twitter.com/jsonjun/status/1617739994529148928), [GenzTranslator](https://twitter.com/verfasor/status/1616861894069088256), and [ChefGPT](https://twitter.com/madeinusmate/status/1616698060398264323)—some of which have thousands of users. Visit the [Twitter Bio site](https://www.twitterbio.com/) to see everything we talked about in action, check out our [other AI templates](https://vercel.com/templates/ai), or start optimizing prompts across various models with Vercel's [AI Playground](https://play.vercel.ai/).