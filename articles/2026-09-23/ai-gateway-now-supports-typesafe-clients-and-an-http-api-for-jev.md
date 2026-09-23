---
title: "AI Gateway now supports TypeSafe clients and an HTTP API for Jev"
source: "https://vercel.com/changelog/ai-gateway-now-supports-typesafe-clients-and-http-api-for-jev"
publishedDate: "2026-09-21"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

[

**Jev is free on AI Gateway until September 25th**

Give your application a faster way to decide what should happen next. Use Jev to route requests, flag content, and score priorities.

Get started



](https://vercel.com/kb/jev-from-typesafe-ai)

You can now call [Jev from TypeSafe AI](https://vercel.com/ai-gateway/models/jev) through AI Gateway using an existing TypeSafe client or the HTTP API, in addition to the AI SDK.

-   **TypeSafe client:** Point an existing TypeSafe client at AI Gateway without changing its evaluation calls.
    
-   **HTTP API:** Call Jev directly from any language or framework.
    
-   **AI SDK:** Call Jev from a TypeScript application using AI SDK.
    

[Jev](https://vercel.com/i/what-is-jev) is a probabilistic decision model for software. State goes in, and typed answers come out with probabilities attached, so there's no generated text to parse. Requests are billed through AI Gateway on all three paths, so they appear alongside your other model calls in usage and observability.

### [Copy link to heading](#migrate-an-existing-typesafe-client)Migrate an existing TypeSafe client

Change the base URL and API key. Your `systemOne` calls, `noul` questions, and response shapes stay exactly as they are.

```
import { TypeSafeClient } from '@typesafe-ai/sdk';const client = new TypeSafeClient({  apiKey: process.env.AI_GATEWAY_API_KEY,  baseURL: 'https://ai-gateway.vercel.sh/typesafe',});const result = await client.systemOne({  state: 'The agent fixed the checkout bug and all tests pass.',  questions: {    continueWorking: {      type: 'noul',      instructions: 'Should the agent take another step?',    },  },});const shouldContinue = result.answers.continueWorking.noul >= 0.8;
```

Connect an existing TypeSafe client to AI Gateway without changing its evaluation calls.

### [Copy link to heading](#start-a-new-integration)Start a new integration

New integrations name the model as `typesafe-ai/jev` and ask one of three question types: `boolean` returns a probability from 0 to 1, `choice` picks one option from a set you name, and `score` rates against a scale you define. This example asks whether an agent should keep working after fixing a bug and passing its tests.

With the HTTP API, `POST` to `/v1/evaluate`:

```
curl https://ai-gateway.vercel.sh/v1/evaluate \  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \  -H "Content-Type: application/json" \  -d '{    "model": "typesafe-ai/jev",    "state": "The agent fixed the checkout bug and all tests pass.",    "questions": {      "continueWorking": {        "type": "boolean",        "instructions": "Should the agent take another step?"      }    }  }'
```

Ask Jev whether an agent should continue working through the native HTTP API.

With the AI SDK, run the same evaluation through `evaluate`:

```
import { experimental_evaluate as evaluate } from 'ai';const result = await evaluate({  model: 'typesafe-ai/jev',  state: 'The agent fixed the checkout bug and all tests pass.',  questions: {    continueWorking: {      type: 'boolean',      instructions: 'Should the agent take another step?',    },  },});const shouldContinue =  result.answers.continueWorking.probability >= 0.8;
```

Run the same evaluation in a TypeScript application with AI SDK.

You can also use Jev through [eve](https://eve.dev/), a framework for building and deploying agents with sandboxed compute, human approvals, and evaluations already built in. eve uses Jev as the default [evaluation model](https://eve.dev/docs/guides/evaluate) for automatic model selection, typed evaluations, and automated tool approvals.

See the [TypeSafe-compatible API guide](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe) to migrate a client, or the [evaluation guide](https://vercel.com/docs/ai-gateway/modalities/evaluation) for the HTTP API or [AI SDK](https://ai-sdk.dev/docs/ai-sdk-core/evaluation).