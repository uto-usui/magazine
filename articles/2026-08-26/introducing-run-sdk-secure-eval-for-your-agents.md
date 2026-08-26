---
title: "Introducing Run SDK: secure eval for your agents"
source: "https://vercel.com/blog/introducing-run"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Aayush Kapoor"
---

Agents increasingly write TypeScript programs to coordinate tools and process their results. Once those programs touch real applications, some steps require authentication, while others need human approval.

Executing that code with `eval` gives it the same access as the application around it, including its secrets and internal services, and leaves no durable way to pause at those boundaries.

Today, we're releasing the [Run SDK](https://github.com/vercel-labs/run), a package for executing untrusted JavaScript and TypeScript without giving it direct access to your application or system. Applications expose narrow host functions and can interrupt execution for authentication or human-in-the-loop approval. The program resumes after a decision without repeating completed work.

```
pnpm add run
```

## [Copy link to heading](#a-small-interface-to-the-host)A small interface to the host

The Run SDK evaluates JavaScript or type-stripped TypeScript in a fresh QuickJS context inside a worker thread, with no direct route to Node.js or the network.

The application exposes selected operations through `hostFunctions`. These are regular functions that become callable globals inside the sandbox:

```
import { run } from 'run';const result = await run({  source: `    const orders = await store.listOrders("customer_123");    const total = orders.reduce((sum, order) => sum + order.amount, 0);    return { count: orders.length, total };  `,  hostFunctions: {    store: {      listOrders: async (customerId: string) => {        return database.orders.findMany({ customerId });      },    },  },});if (result.status === 'completed') {  console.log(result.value);}
```

Here, the generated program knows about `store.listOrders()`. The database client and its credentials remain in the application.

Calls cross the sandbox boundary through serialization. A host function may return a promise, so existing service clients can sit behind this interface without being passed into the sandbox.

You can try this in the [playground](https://www.run-sdk.dev/playground). Code you run there can only reach the host functions on the page.

## [Copy link to heading](#code-mode-in-practice)Code mode in practice

The Run SDK is the internal module powering [code mode tool execution in the AI SDK](https://ai-sdk.dev/docs/ai-sdk-core/code-mode). Giving an agent a program changes the unit of work. One model response can describe the calls and the logic connecting them:

```
const result = await run({  source: `    const accountId = "account_123";    const [account, invoices] = await Promise.all([      crm.getAccount(accountId),      billing.listInvoices(accountId),    ]);    const overdue = invoices.filter(invoice => invoice.status === "overdue");    return { account: account.name, overdue };  `,  hostFunctions: {    crm: { getAccount },    billing: { listInvoices },  },});
```

The two requests happen concurrently, and invoice filtering stays local to the program. Only the useful result returns to the application.

This is a good fit for agents that work across several internal services. A research agent can combine search results before answering. A support agent can inspect an account without putting an entire billing response back into its context.

The same package can power a code interpreter or a product feature that accepts customer-defined transformations. In both cases, the application chooses the available data and operations.

Host functions work best when they map to actions in your product, like refunding an order. Exposing `orders.refund(id)` gives the application a clear place to check the user and the order. A generic request function would make that authority much harder to reason about.

## [Copy link to heading](#native-support-for-human-in-the-loop-and-auth)Native support for human-in-the-loop and auth

Reading invoices is different from issuing a refund. When generated code reaches a sensitive operation, the host function can interrupt execution:

```
import { getHostFunctionContext } from 'run';const hostFunctions = {  documents: {    publish: async (draftId: string) => {      const context = getHostFunctionContext();      if (context.resume === undefined) {        context.interrupt({          kind: 'approval',          message: `Publish ${draftId}?`,        });      }      if (context.resume.resolution !== true) {        return { published: false };      }      return publishDraft(draftId);    },  },};
```

When the run is interrupted, the result includes a signed token the application can save with an approval request and use to resume the run when a decision arrives.

Resuming replays the program, but settled host function calls use their recorded results. Host function work completed before the interruption does not run again. The interrupted function receives the approval and continues from there.

This mechanism also works when a workflow must wait for authentication. The application owns the waiting period; the worker does not need to remain alive.

## [Copy link to heading](#running-within-limits)Running within limits

A sandbox still needs to account for code that loops forever or produces an oversized result. `createRunner()` sets shared limits:

```
import { createRunner } from 'run';const runner = createRunner({  limits: {    timeoutMs: 10_000,    memoryLimitBytes: 32 * 1024 * 1024,  },});
```

Limits can also be set per run. The defaults cover the QuickJS heap and the values crossing the host boundary; applications can tighten them for their workload.

Each invocation receives a new QuickJS context. Dynamic evaluation is disabled and built-in prototypes are hardened. This boundary applies to the generated program, while host functions remain trusted application code and must perform their normal authorization checks.

The Run SDK is intended for JavaScript computation inside an application. Workloads that require an operating system, package installation, or process-level isolation should use Vercel Sandbox instead.

## [Copy link to heading](#extracting-the-execution-layer)Extracting the execution layer

The first version of this runtime lived inside [`just-bash`](https://github.com/vercel-labs/just-bash) as `js-exec`, backed by QuickJS. It let agents write TypeScript against the shell's virtual filesystem and command set.

We extracted that layer into the Run SDK and replaced the Node-shaped environment with application-defined host functions. We tested the underlying mechanism in [`eve`](https://github.com/vercel/eve), using it to run agent-generated TypeScript against real tools. It now powers [code mode in the AI SDK](https://github.com/vercel/ai/pull/18832) where existing AI SDK tools are mapped to host functions, while the Run SDK handles their sandboxed execution.

## [Copy link to heading](#getting-started)Getting started

The Run SDK supports Node.js 22.13+ and Bun. You will need pnpm or another package manager installed on your local development machine.

```
pnpm add run
```

Check out the [documentation](https://www.run-sdk.dev/docs/introduction) and [API reference](https://www.run-sdk.dev/docs/reference).