---
title: "Workflow SDK 5: built for production"
source: "https://vercel.com/blog/workflow-sdk-5"
publishedDate: "2026-11-12"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

When we first launched Workflow SDK, the goal was simple: write regular async JavaScript, and let the SDK keep it running through crashes, deployments, and long waits.

workflows/welcome-user.ts

```
import { sleep } from "workflow";export async function welcomeUser(email) {  "use workflow";  const user = await createUser(email);  await sendWelcomeEmail(user);  // Survives crashes and deployments  // while it waits  await sleep("3d");  await sendCheckInEmail(user);}
```

A basic durable workflow

Last year, [we shipped just that](https://vercel.com/blog/introducing-workflow), with the world-class developer experience Vercel is known for. Then we watched what our customers built with it.

More than 4 billion steps and 700 million runs later, two clear patterns have emerged.

-   **The first is automation**: Traditional workflows that move data, process orders, coordinate background jobs, manage subscriptions, and run ETL and data pipelines.
    
-   **The second is agents and harnesses**: Agents are expensive and long running, so they naturally require durability too.
    

As those workloads matured, Workflow matured with them. Our priorities have always been security, reliability, and performance.

Here’s how Workflow SDK 5 delivers on all three.

## [Copy link to heading](#more-secure-workflows)More secure workflows

The Workflow [event log](https://workflow-sdk.dev/docs/how-it-works/event-sourcing) stores step arguments and return values so a run can recover after a crash or deployment. That data can include sensitive customer information, model context, credentials, and tool-call results. Persisting it requires strong protection.

Workflow SDK [encrypts every payload end to end](https://workflow-sdk.dev/docs/how-it-works/encryption), before it leaves your code. Workflow and step inputs and outputs, hook payloads, and stream data are encrypted with AES-256-GCM, using a unique key for each run. With encryption enabled, any Workflow SDK backend, including Vercel, only sees and stores ciphertext. Plaintext is decrypted in your deployment or in authorized observability tools.

### [Copy link to heading](#encryption-with-zero-configuration-on-vercel)Encryption with zero configuration on Vercel

On Vercel, encryption needs no setup and no code changes. Each run’s key is derived from a key scoped to the deployment that created it, so a run can only decrypt its own data. Your workflow code doesn’t change:

workflows/onboard-customer.ts

```
export async function onboardCustomer(  customer: Customer,) {  "use workflow";  // The customer record is stored  // encrypted in the event log  const account = await createAccount(customer);  await sendWelcomeEmail(account.email);  return account.id;}async function createAccount(  customer: Customer,) {  "use step";  // ...and arrives here decrypted,  // inside your deployment  return db.accounts.create(customer);}
```

Workflow and step payloads are encrypted without changing application logic.

Because Vercel manages the keys by default, observability keeps working. Names, timings, and statuses are always visible, and when you need to see a payload, you can decrypt it in the dashboard or the CLI. Decryption happens in your browser or terminal, follows the same permissions as the project’s environment variables, and every request is recorded in your team’s audit log.

```
# Payloads show as 🔒 Encryptednpx workflow inspect run <run-id># Decrypts locally, if you have accessnpx workflow inspect run <run-id> --decrypt
```

Inspect encrypted payloads, then decrypt locally with authorized access.

### [Copy link to heading](#encryption-on-self-hosted-worlds)Encryption on self-hosted Worlds

Encryption is implemented in the SDK, so it can also protect payloads on [self-hosted Worlds](https://workflow-sdk.dev/docs/deploying) before they reach storage, queues, or streams.

A [custom World enables encryption](https://workflow-sdk.dev/docs/how-it-works/encryption#custom-world-implementations) by implementing `getEncryptionKeyForRun()` with your [key management](https://workflow-sdk.dev/docs/how-it-works/encryption#key-management). Return the same 32-byte key for each run on every call so the SDK can encrypt new payloads and decrypt them during replay:

world.ts

```
import type { World } from "@workflow/world";type RunKeyProvider =  World["getEncryptionKeyForRun"];export const getEncryptionKeyForRun:  RunKeyProvider = async (run) => {    const runId =      typeof run === "string" ? run : run.runId;    // Return the same 32 bytes for a run    // every time, so replays can decrypt    return keyStore.getRunKey(runId);  };
```

Provide a stable 32-byte encryption key for each run in a custom World.

### [Copy link to heading](#more-security-work-in-v5)More security work in v5

Cross-run writes are sealed too. When code resumes another run’s hook, starts a run in another deployment, or writes into a stream forwarded from another run, the payload is encrypted to the target run’s public key. The writer can encrypt for that run without reading its existing payloads.

You can also limit how long sensitive data is stored. With [payload retention](https://workflow-sdk.dev/docs/observability/retention) set to `experimental_retention: 0`, inputs, outputs, and stream contents are deleted as soon as a run completes or fails. The run’s metadata stays visible in observability.

## [Copy link to heading](#a-redesigned-trace-viewer)A redesigned trace viewer

The [redesigned trace viewer](https://workflow-sdk.dev/docs/observability) makes runs easier to navigate, with span search, zoom, a minimap, and local inspection during development.

[Run attributes](https://workflow-sdk.dev/docs/observability/attributes) are new in v5. They let you attach searchable context to a run, such as an order ID, and then find runs by it. Attributes are plaintext, so they should not contain secrets.

## [Copy link to heading](#workflows-in-every-region)Workflows in every region

In Workflow SDK 4, every run lived in `iad1`. Even when a project was deployed to several regions, each run’s event log, queue, and streams were only stored in one region, so a step running anywhere else made cross-region requests to record its progress.

For v5, we [deployed Workflow infrastructure to every Vercel Function region](https://vercel.com/changelog/configure-where-run-state-lives-in-vercel-workflows). Each run has its own home region: its state, queue dispatch, and streams are served from the region where it started, without cross-region round trips on the hot path.

By default, a run starts in the region of the function that starts it. Deploy to several regions, and each run stays close to the user who triggered it, with no configuration:

app/api/checkout/route.ts

```
import { start } from "workflow/api";import { processOrder } from "@/workflows/process-order";export async function POST(request: Request) {  const order = await request.json();  // Runs in the region that served this request  const run = await start(    processOrder,    [order],  );  return Response.json({ runId: run.runId });}
```

Start each order workflow in the region that handles its request.

To place a run somewhere else, [pass a region to `start()`](https://workflow-sdk.dev/worlds/vercel#explicit-region-selection). That lets a workflow run next to the database it reads and writes, or keep a customer’s data in the region where it has to stay:

app/api/checkout/route.ts

```
// Keep this customer’s run data in Frankfurtconst run = await start(  processOrder,  [order],  { region: "fra1" },);
```

Store this order workflow’s data in Frankfurt.

The `region` option decides where a run’s data lives. Your steps run where your app is deployed, so deploy to that region too if you want them to execute there. Existing v4 runs stay in `iad1`.

## [Copy link to heading](#infrastructure-reliability)Infrastructure reliability

Regional isolation also improves reliability. A disruption in one region does not have to stop new runs in healthy regions. For projects with [Vercel Function failover](https://vercel.com/docs/functions/configuring-functions/region#automatic-failover) configured, steps can execute in a fallback region while continuing to use the run’s original home region for state. That state remains pinned to its home region; it does not migrate during failover.

With the help of anonymized telemetry and close collaboration with many customers, we found and fixed dozens of rare bugs and race conditions in the Workflow runtime. Workflow SDK also recovers on its own from more kinds of intermittent network errors.

As a result, with Workflow SDK 5, we’ve seen almost no runs fail or stall because of a platform or runtime bug.

## [Copy link to heading](#agent-ready-performance)Agent-ready performance

In Workflow SDK 4, every step invocation involved a queue hop to start the step and another to continue the workflow. That is acceptable for slow background automations, but adds latency to the AI workloads developers are building today.

Agent loops and harnesses can contain thousands of sequential events, high-throughput token streams, tool chains, and dynamic subagents. At that scale, the networking and CPU work around every step became a limit.

In Workflow SDK 5, we rewrote large parts of the engine to minimize extra queue hops, unnecessary networking, and CPU work. Across the measured workloads, we saw 1.6× to 25× improvements in measured latency and overhead, while preserving the same developer experience and introducing no major breaking changes.

The benchmarks below compare **v5.2.0 with v4.8.12** on Vercel. Pick a measurement to see how v5 compares with v4, then play or scrub through the explainer to see exactly what each benchmark measures.

Workflow SDK 5 includes hundreds of performance improvements to achieve this. Here are some of the major changes behind these numbers:

**Fewer queue hops**

In v4, each step handed execution back through the queue. In v5, an invocation can execute several steps inline, including parallel steps, before yielding for a wait, a hook, or an approaching timeout.

The runtime also avoids unnecessary persistence round trips and folds step creation into execution. Fewer queue and network requests mean less CPU work and lower runtime overhead. In a five-step benchmark, p75 step-to-step overhead fell from **618 ms to 109 ms**.

**Incremental replay**

Over a 1,020-step benchmark, v4’s p75 overhead grew with the [event log](https://workflow-sdk.dev/docs/how-it-works/event-sourcing): replaying the full event history took time proportional to its size. In the final sampled range, overhead reached 1,748 ms. On v5.2.0, it was **70 ms**. The median time to finish all 1,020 steps fell from 21.0 minutes to 3.0 minutes.

**WebSocket streaming**

Durability should not make a streamed response fall behind its producer. On the Vercel World, v5.2.0 [writes streams over WebSockets by default](https://vercel.com/changelog/workflow-writes-now-use-websockets-on-vercel). In a benchmark replaying a 52.4-second agent response, median delivery dropped from **226.1 seconds to 53.5 seconds**.

[Payload compression](https://workflow-sdk.dev/docs/how-it-works/encryption#compression) reduces the data stored and transferred. AI token streams average around 80% smaller after compression.

These measurements describe one workload, in one region, against the Vercel World. They are a useful view of runtime overhead, rather than a prediction for every application.

### [Copy link to heading](#benchmark-results-and-methodology)Benchmark results and methodology

Measured October 8, 2026, on Vercel production in `iad1`, against the [managed Vercel World](https://workflow-sdk.dev/worlds/vercel). Each version uses a separate deployment of the same app. Steps take 1 KB of JSON in and out.

Selected results · v4.8.12 compared with v5.2.0

Measurement

v4.8.12

v5.2.0

Change

First step, p75

418 ms

172 ms

2.4× faster

Between steps, p75

618 ms

109 ms

5.7× faster

Late-run overhead, p75

1,748 ms

70 ms

25× lower

1,020 steps, median

21.0 min

3.0 min

7× faster

Resume, p75

699 ms

425 ms

1.6× faster

Stream delivery, median

226.1 s

53.5 s

4.2× faster

Chunk trip time, p75

172 ms

102 ms

1.7× faster

Runs with a chunk delayed >1 s

6 / 10

0 / 10

100% fewer

The full results, including tails, are in the [performance documentation](https://workflow-sdk.dev/docs/performance#all-results).

Workflow SDK’s durable functions sit on a [World](https://workflow-sdk.dev/docs/deploying): the interface for storing progress, dispatching work, and delivering streams. That same foundation also now supports [fx](https://fx.sh/) and [durable-harness](https://vercel.com/docs/agent-harnesses), which adds durability to existing agent harnesses.

Improvements to the shared storage, queue, and streaming infrastructure can benefit any consumer of a World. Optimizations inside the Workflow replay runtime apply to Workflow SDK; they do not automatically apply to every harness.

Choose the integration around how you want to build:

-   [**Workflow SDK**](https://workflow-sdk.dev/): write durable application logic with `use workflow` and `use step`.
    
-   [**WorkflowAgent**](https://ai-sdk.dev/docs/agents/workflow-agent): use `@ai-sdk/workflow` for an AI SDK agent loop inside a workflow.
    
-   [**fx**](https://fx.sh/): embed and extend a native coding agent with libfx.
    
-   [**durable-harness**](https://vercel.com/docs/agent-harnesses): keep an existing supported harness and add durability beneath it.
    
    -   Supports [Pi](https://vercel.com/docs/agent-harnesses/pi) and [OpenCode](https://vercel.com/docs/agent-harnesses/opencode), with experimental integrations for [Claude Code](https://vercel.com/docs/agent-harnesses/claude-code) and [Codex](https://vercel.com/docs/agent-harnesses/codex) in Vercel Sandbox.
        
-   [**eve**](https://vercel.com/docs/agent-harnesses/eve): build agents with durable sessions powered natively by Workflow SDK and Worlds.
    

We’ll soon be adding more offerings to our catalog of SDKs and frameworks backed by Worlds for durability.

## [Copy link to heading](#build-with-workflow-sdk-5)Build with Workflow SDK 5

Besides the improvements above, Workflow SDK 5 also adds:

The [v5 upgrade docs](https://workflow-sdk.dev/docs/whats-new) cover what changed. To start building a new workflow, install the SDK:

```
pnpm add workflow@latest
```

Install the latest Workflow SDK.

Workflow SDK also has a [Python SDK](https://workflow-sdk.dev/docs/getting-started/python), now in beta, with the same durable workflows, steps, sleeps, and hooks.