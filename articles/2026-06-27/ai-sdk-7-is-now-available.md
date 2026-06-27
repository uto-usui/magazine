---
title: "AI SDK 7 is now available"
source: "https://vercel.com/changelog/ai-sdk-7"
publishedDate: "2026-06-25"
category: "frontend"
feedName: "Vercel"
author: "Gregor Martynus"
---

AI SDK 7 is a major release for building production agents in TypeScript. The SDK has grown from model calls and chat primitives into a broader agent platform for developing, running, integrating, and observing agents across text, audio, realtime, image, and video. Every major provider is supported out of the box.

## [Link to heading](#at-a-glance)At a Glance

-   **Develop agents** with reasoning control, tool and runtime context, provider files and skills support, MCP Apps, and a terminal UI.
    
-   **Run agents** with tool approvals, durable `WorkflowAgent` execution, first-class timeouts, and sandbox support.
    
-   **Integrate any agent harness** such as Codex, Claude Code, Deep Agents, OpenCode, or Pi.
    
-   **Observe agent behavior** with redesigned telemetry, `@ai-sdk/otel`, Node.js tracing channel support, lifecycle callbacks, and step performance statistics.
    
-   **Build beyond text** with stable speech/transcription APIs, richer file parts, image generation and editing, multimodal embeddings, reranking, realtime voice (experimental), and video generation (experimental).
    
-   **Upgrade with clearer APIs** through the new migration skill, codemods, and migration paths for ESM, Node.js 22, `instructions`, `telemetry`, `stream`, `finalStep`, `runtimeContext`, and `toolsContext`.
    

## [Link to heading](#before-you-upgrade)Before You Upgrade

AI SDK 7 introduces two breaking requirements:

-   **Node.js 22 minimum**: Node 22 is required because the SDK depends on APIs (including the native `fetch` implementation and improved `AsyncLocalStorage` semantics) that are not backported to earlier LTS lines.
    
-   **ESM imports required**: AI SDK 7 requires ESM imports (`import` syntax or `.mjs` files). CommonJS `require()` is not supported. Update your `package.json` to include `"type": "module"` or migrate individual files to `.mjs`.
    

Run the v7 codemods to automate the majority of import and rename changes before reviewing semantic migration items manually. See the [full v7 migration guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0).

## [Link to heading](#develop-agents)Develop Agents

-   **Provider-agnostic reasoning control**: `generateText` and `streamText` now support a top-level `reasoning` option that maps to provider-native settings across OpenAI, Anthropic, Google, Groq, xAI, Bedrock, Fireworks, DeepSeek, Open Responses, and OpenAI-compatible providers. Note that exact behavior and available parameters vary by provider.
    

```
import { generateText } from 'ai';const result = await generateText({  model: 'openai/gpt-5.5',  prompt: 'Plan a launch checklist.',  reasoning: 'high',});
```

-   **Typed runtime context**: Shared orchestration state lives in `runtimeContext` and flows through `prepareStep`, approval functions, lifecycle callbacks, telemetry, `ToolLoopAgent`, and `WorkflowAgent`.
    

```
import { ToolLoopAgent } from 'ai';const agent = new ToolLoopAgent({  model: 'openai/gpt-5.5',  runtimeContext: {    audience: 'developers',  },  prepareStep({ runtimeContext }) {    return {      instructions: `Write for ${runtimeContext.audience}.`,    };  },});
```

-   **Scoped tool context**: Tools can declare a `contextSchema`, and callers provide per-tool values through `toolsContext`, so third-party tools only receive the secrets or config they need.
    

```
import { generateText, tool } from 'ai';import * as z from 'zod/v4';const result = await generateText({  model: 'openai/gpt-5.5',  tools: {    weather: tool({      inputSchema: z.object({ city: z.string() }),      contextSchema: z.object({ apiKey: z.string() }),      execute: async ({ city }, { context }) =>        getWeather(city, context.apiKey),    }),  },  toolsContext: {    weather: {      apiKey: process.env.WEATHER_API_KEY,    },  },  prompt: 'What is the weather in SF?',});
```

-   **Provider file uploads**: `uploadFile` uploads large inputs once and reuses provider references in later calls, reducing redundant uploads in repeated PDF, dataset, image, and multi-step workflows.
    

```
import { readFile } from 'node:fs/promises';import { openai } from '@ai-sdk/openai';import { streamText, uploadFile } from 'ai';const { providerReference } = await uploadFile({  api: openai.files(),  data: await readFile('./brief.pdf'),  filename: 'brief.pdf',});const result = await streamText({  model: 'openai/gpt-5.5',  messages: [    {      role: 'user',      content: [        { type: 'text', text: 'Summarize this brief.' },        {          type: 'file',          mediaType: 'application/pdf',          data: providerReference,        },      ],    },  ],});
```

-   **Provider skill uploads**: `uploadSkill` brings the same pattern to provider-managed skill environments.
    

```
import { readFile } from 'node:fs/promises';import {  anthropic,  type AnthropicLanguageModelOptions,} from '@ai-sdk/anthropic';import { streamText, uploadSkill } from 'ai';const { providerReference } = await uploadSkill({  api: anthropic.skills(),  files: [    {      path: 'my-skill/SKILL.md',      content: await readFile('./SKILL.md'),    },  ],  displayTitle: 'My Skill',});const result = await streamText({  model: anthropic('claude-sonnet-4-6'),  prompt: 'Use my-skill to complete the task.',  providerOptions: {    anthropic: {      container: {        skills: [{ type: 'custom', providerReference }],      },    } satisfies AnthropicLanguageModelOptions,  },});
```

-   **MCP Apps**: MCP support now includes model-visible versus app-only tools, app metadata, sandboxed iframe rendering, and JSON-RPC communication for tools, resources, logs, and display updates.
    

```
import { experimental_MCPAppRenderer as MCPAppRenderer } from '@ai-sdk/react';import { isToolUIPart } from 'ai';{  messages.map(message =>    message.parts.map(part =>      isToolUIPart(part) ? (        <MCPAppRenderer          key={part.toolCallId}          part={part}          sandbox={{ url: '/mcp-app-sandbox' }}          loadResource={app => fetch(`/api/mcp-apps?uri=${app.resourceUri}`)}          handlers={{ allowedTools: ['refreshDashboard'] }}        />      ) : null,    ),  );}
```

-   **Terminal agent development**: `@ai-sdk/tui` runs AI SDK agents in an interactive terminal UI, letting you test reasoning, tools, and markdown output before building a full app.
    

```
import { ToolLoopAgent } from 'ai';import { runAgentTUI } from '@ai-sdk/tui';const agent = new ToolLoopAgent({  model: 'openai/gpt-5.5',});await runAgentTUI({ agent });
```

## [Link to heading](#run-agents-in-production)Run Agents in Production

AI SDK 7 adds the primitives agents need once they leave local demos.

-   **Tool approvals**: `generateText`, `streamText`, and `ToolLoopAgent` can define approval policies at the call or agent level. Policies can require user approval, auto-approve, auto-deny, or delegate to typed approval functions.
    

```
import { generateText } from 'ai';const result = await generateText({  model: 'openai/gpt-5.5',  tools: { deleteFile },  toolApproval: {    deleteFile: 'user-approval',  },  prompt: 'Remove stale temporary files.',});
```

-   **Hardened approval replay**: Higher-risk approval flows can revalidate tool inputs and policies before continuation, use WorkflowAgent approval validation, and opt into HMAC signing. HMAC signing cryptographically binds the original tool inputs to the approval token, preventing tampering with tool arguments between the approval request and resumption.
    
-   **Durable execution**: `@ai-sdk/workflow` introduces `WorkflowAgent` for long-running agents. Execution state is persisted to durable storage between steps, so agents survive deploys, process restarts, interruptions, and delayed approvals. To learn more, see the [WorkflowAgent docs](https://ai-sdk.dev/docs/agents/workflow-agent).
    

```
import { WorkflowAgent } from '@ai-sdk/workflow';const agent = new WorkflowAgent({  model: 'openai/gpt-5.5',  tools,  runtimeContext: {    userId: 'user_123',  },});
```

-   **Workflow-aware agent features**: `WorkflowAgent` supports streaming, tools, approvals, typed runtime and tool context, lifecycle callbacks, stable telemetry, provider-executed approval resumption, and tool result conversion.
    
-   **First-class timeouts**: Text generation and agent APIs can define total, per-step, per-chunk, default tool, and per-tool timeout budgets. Timeout aborts use `TimeoutError`, and abort reasons flow through stream and UI protocols.
    

```
import { generateText } from 'ai';const result = await generateText({  model: 'openai/gpt-5.5',  timeout: {    totalMs: 60_000,    stepMs: 10_000,    chunkMs: 2_000,    toolMs: 5_000,  },  prompt: 'Research this issue and summarize it.',});
```

-   **Sandboxed execution**: The sandbox abstractions support command execution, streaming output, working directories, environment variables, abort signals, and step-level sandbox overrides.
    

```
import { generateText, tool } from 'ai';import * as z from 'zod/v4';const result = await generateText({  model: 'openai/gpt-5.5',  tools: {    runCommand: tool({      inputSchema: z.object({ command: z.string() }),      execute: async ({ command }, { experimental_sandbox }) => {        if (experimental_sandbox == null) {          throw new Error('Sandbox is not available');        }        return experimental_sandbox.run({ command });      },    }),  },  experimental_sandbox: sandbox,  prompt: 'Run the tests and summarize the result.',});
```

## [Link to heading](#integrate-agent-harnesses)Integrate Agent Harnesses

AI SDK 7 introduces a harness layer for bringing established agents into the AI SDK ecosystem. Wrap harnesses such as Claude Code, Codex, Deep Agents, OpenCode, and Pi behind the same agent interface used by the rest of the SDK.

-   `**HarnessAgent**`: Run external agent harnesses through the AI SDK `Agent` interface, with standard `generate` and `stream` results.
    

```
import { HarnessAgent } from '@ai-sdk/harness/agent';import { claudeCode } from '@ai-sdk/harness-claude-code';import { createVercelSandbox } from '@ai-sdk/sandbox-vercel';const agent = new HarnessAgent({  harness: claudeCode,  sandbox: createVercelSandbox({ runtime: 'node24' }),  instructions: 'Review the repository and make a small, safe fix.',});const result = await agent.generate({  prompt: 'Fix the failing unit test.',});
```

-   **Adapters for agents**: Claude Code, Codex, Deep Agents, OpenCode, and Pi harness adapters let teams plug existing agent runtimes into AI SDK apps.
    
-   **Configurable harness runs**: Harness agents can receive sandboxes, instructions, custom skills, and tools, so the same runtime can be shaped for different products and workflows.
    
-   **Durable, resumable sessions**: Workflow utilities, session bridging, and APIs for interrupted-turn continuation make harness runs suitable for longer tasks.
    
-   **Gateway-ready authentication**: Harness adapters support Vercel OIDC for AI Gateway, simplifying hosted and sandboxed agent execution.
    

## [Link to heading](#observe-agents)Observe Agents

-   **Global telemetry integrations**: Register telemetry once and receive structured events across model calls, steps, tools, embeddings, reranking, and agent execution.
    

```
import { generateText, registerTelemetry } from 'ai';import { LangfuseVercelAiSdkIntegration } from '@langfuse/vercel-ai-sdk';registerTelemetry(new LangfuseVercelAiSdkIntegration());const result = await generateText({  model: 'openai/gpt-5.5',  prompt: 'Write a launch announcement.',  telemetry: {    functionId: 'launch-copy-agent',  },});
```

-   **Dedicated OpenTelemetry package**: OpenTelemetry support now lives in `@ai-sdk/otel`, with GenAI-semantic convention spans and metrics, supplemental AI SDK attributes, and span-enrichment hooks. To learn more, see the [@ai-sdk/otel docs](https://ai-sdk.dev/docs/ai-sdk-core/telemetry).
    

```
import { generateText, registerTelemetry } from 'ai';import { OpenTelemetry } from '@ai-sdk/otel';registerTelemetry(new OpenTelemetry());const result = await generateText({  model: 'openai/gpt-5.5',  prompt: 'Write a launch announcement.',});
```

-   **Node.js tracing channel**: AI SDK 7 emits structured telemetry through the Node.js tracing channel, allowing observability providers to subscribe once while preserving async context across streaming and tool execution.
    

```
import { tracingChannel } from 'node:diagnostics_channel';import {  AI_SDK_TELEMETRY_TRACING_CHANNEL,  type TelemetryTracingChannelMessage,} from 'ai';tracingChannel(AI_SDK_TELEMETRY_TRACING_CHANNEL).subscribe({  start(message) {    const { type, event } = message as TelemetryTracingChannelMessage;    console.log(`AI SDK ${type} started`, event);  },});
```

-   **Sensitive context controls**: Runtime and tool context can be deliberately included in telemetry, with controls to prevent secrets from being exposed by default.
    

```
import { generateText } from 'ai';const result = await generateText({  model: 'openai/gpt-5.5',  prompt: 'Write a launch announcement.',  runtimeContext: {    userId: 'user_123',    feature: 'launch-copy',  },  telemetry: {    includeRuntimeContext: {      userId: true,      feature: true,    },  },});
```

-   **Lifecycle callbacks**: Callbacks are more consistent across core functions, agents, tools, embeddings, reranking, structured output, and UI streams. Callback payloads carry richer data for step, usage, content, file, source, warning, tool, model-call, and error events.
    

```
import { generateText } from 'ai';const result = await generateText({  model: 'openai/gpt-5.5',  prompt: 'What changed in AI SDK 7?',  onStart({ callId, modelId }) {    console.log('started', { callId, modelId });  },  onStepEnd({ stepNumber, finishReason, usage }) {    console.log('step finished', { stepNumber, finishReason, usage });  },  onEnd({ usage, finishReason }) {    console.log('finished', { usage, finishReason });  },});
```

-   **Performance statistics**: Step results expose timing and throughput metrics, including response time, total step time, tool execution time, time to first output, and output tokens per second.
    

```
import { streamText } from 'ai';const result = streamText({  model: 'openai/gpt-5.5',  prompt: 'Explain partial prerendering in two paragraphs.',  onLanguageModelCallEnd({ usage, performance }) {    console.log({      totalTokens: usage.totalTokens,      responseTimeMs: performance.responseTimeMs,      outputTokensPerSecond: performance.outputTokensPerSecond,    });  },});
```

## [Link to heading](#build-beyond-text)Build Beyond Text

AI SDK 7 expands the SDK across realtime, video, speech, transcription, images, files, embeddings, and structured output.

-   **Realtime (experimental)**: Browser-to-provider WebSocket sessions for OpenAI, Google, and xAI, with audio/text conversations, client-driven tool calls, and normalized routing through AI Gateway.
    

```
import { gateway } from '@ai-sdk/gateway';import { experimental_useRealtime } from '@ai-sdk/react';const realtime = experimental_useRealtime({  model: gateway.experimental_realtime('openai/gpt-realtime-2'),  api: {    token: '/api/realtime/setup',  },});
```

-   **Video generation (experimental)**: Video generation works across AI Gateway, Google AI Studio, Google Vertex, fal, Replicate, ByteDance Seedance, Kling AI, Prodia, and xAI, with support for long-running SSE responses and safer bounded downloads.
    

```
import { fal } from '@ai-sdk/fal';import { experimental_generateVideo } from 'ai';const { video } = await experimental_generateVideo({  model: fal.video('luma-dream-machine/ray-2'),  prompt: 'A cat walking on a treadmill',});
```

-   **Stable speech and transcription**: `generateSpeech`, `transcribe`, `SpeechResult`, and `TranscriptionResult` are stable exports.
    

```
import { readFile } from 'node:fs/promises';import { openai } from '@ai-sdk/openai';import { generateSpeech, transcribe } from 'ai';const speech = await generateSpeech({  model: openai.speech('tts-1'),  text: 'Welcome to AI SDK 7.',});const { text } = await transcribe({  model: openai.transcription('whisper-1'),  audio: await readFile('meeting.mp3'),});
```

-   **Images as files**: Image parts move toward the same canonical file model as other media. Tool outputs can use a single `file` shape for inline data, URLs, provider references, and text-backed content.
    
-   **Richer media and model support**: Providers add image generation, image editing, multimodal embeddings, speech, transcription, reranking, file references, reasoning files, and provider-specific media metadata.
    
-   **Structured output reliability**: JSON Schema post-processing is stricter for Zod and Standard Schema inputs, malformed JSON extraction and repair is available for structured outputs and tool calls, and array output mode preserves transforms, coercions, defaults, and pipes.
    

## [Link to heading](#ui,-streams,-and-message-handling)UI, Streams, and Message Handling

The UI and streaming work in v7 focuses on making agent streams correct, composable, and reliable.

-   **Direct agent transport**: `DirectChatTransport` can call an `Agent` directly from UI code.
    

```
import { DirectChatTransport, useChat } from '@ai-sdk/react';const { messages, sendMessage } = useChat({  transport: new DirectChatTransport({ agent }),});
```

-   **Tool approval in UI flows**: UI messages support automatic approval responses and improved approval replay behavior.
    
-   **Framework improvements**: React `useChat` callbacks update with current props/state; `sendAutomaticallyWhen` supports async conditions; Vue gains an idiomatic `useChat` composable; and Angular APIs are aligned with current AI SDK patterns.
    
-   **More reliable streams**: Provider streams that end before a finish chunk are treated as errors, tool execution errors are emitted and cleaned up predictably, and streaming reasoning edge cases are handled more consistently.
    
-   **Provider metadata preservation**: Provider metadata is retained across text generation, UI streams, tool invocations, and multi-turn provider ID mapping.
    
-   **Multi-step results**: Top-level `content`, tool calls/results, `files`, `sources`, `warnings`, and `usage` now represent the full run. Final-step-only details are available through `finalStep`.
    

```
const finalStep = await result.finalStep;console.log({  totalUsage: await result.usage,  finalStepUsage: finalStep.usage,});
```

## [Link to heading](#configure-mcp)Configure MCP

The MCP package grows from a tool transport layer into a richer integration surface for agent tools and app UIs.

-   **Protocol and metadata**: MCP clients support protocol version `2025-11-25`, server metadata, server instructions, ping responses, negotiated protocol headers, and public `listTools()`.
    
-   **Typed tool outputs**: MCP tools can expose `outputSchema` and `structuredContent`, and tool definitions can be separated from executable tools.
    
-   **Resource content**: Tool results and prompt messages can include MCP `resource_link` content.
    
-   **App rendering**: MCP Apps use tool metadata to render app-specific UI inside sandboxed iframes while keeping model-visible and app-only tools separate.
    
-   **Transport reliability**: HTTP, SSE, and OAuth transports support custom `fetch`, redirect configuration, OAuth refresh deduplication, state validation, asynchronous client authentication, richer errors, and better SSE frame handling.
    

## [Link to heading](#configure-runtime-and-packaging)Configure Runtime and Packaging

-   **Node.js 22 minimum**: AI SDK packages require Node.js 22 or later.
    
-   **ESM imports required**: AI SDK 7 requires ESM imports (`import` syntax or `.mjs` files). Update your `package.json` to include `"type": "module"` or migrate individual files to `.mjs`.
    
-   **Migration skill available**: A dedicated migration skill is available that developers can install and ask their agent to use for AI SDK v6-to-v7 upgrades.
    
-   **Codemods available**: The v7 codemods cover the majority of renames and cleanup migrations.
    

Terminal

```
npx skills add vercel/ai --skill migrate-ai-sdk-v6-to-v7npx @ai-sdk/codemod v7
```

Send this prompt to your AI coding agent to get started:

AI Prompt

```
Use the migrate-ai-sdk-v6-to-v7 skill and migrate my app from AI SDK v6 to v7.
```

### [Link to heading](#coming-out-of-experimental)Coming Out of Experimental

The following highlights cover the most impactful promotions:

-   `experimental_customProvider` becomes `customProvider`
    
-   `experimental_generateImage` becomes `generateImage`
    
-   `experimental_output` becomes `output`
    
-   `experimental_prepareStep` becomes `prepareStep`
    
-   `experimental_telemetry` becomes `telemetry`
    

### [Link to heading](#renamed-apis)Renamed APIs

The following highlights cover the most impactful renames:

-   `system` option becomes `instructions`
    
-   System messages inside `prompt` or `messages` require `allowSystemInMessages: true`
    
-   `onFinish` becomes `onEnd`
    
-   `StreamTextResult.fullStream` becomes `stream`
    
-   `CallSettings` is split into model generation options and request/transport options
    

### [Link to heading](#deprecated-apis)Deprecated APIs

The following highlights cover the most impactful deprecations:

-   **Tool approval**: `needsApproval` on `tool()` and `dynamicTool()` is deprecated. Move approval logic to `toolApproval` on `generateText`, `streamText`, or `ToolLoopAgent`.
    
-   **Stream response helpers**: Result methods like `result.toUIMessageStreamResponse()` and `result.toTextStreamResponse()` are deprecated. Use top-level helpers like `createUIMessageStreamResponse` and `createTextStreamResponse`.
    
-   **Vue chat**: The Vue `Chat` class is deprecated. Use the `useChat` composable instead.
    

### [Link to heading](#other-migration-themes)Other Migration Themes

-   **Reasoning configuration is centralized**: The top-level `reasoning` option replaces overlapping provider-specific reasoning settings unless a provider-specific override is intentional.
    
-   **OpenTelemetry moved to** `@ai-sdk/otel`: OpenTelemetry span collection is no longer built into the `ai` package. Telemetry is registered globally, and custom tracers move into the `OpenTelemetry` constructor.
    
-   **Request and response body retention is opt-in**: Text generation results exclude request and response bodies by default.
    
-   **Multi-step results now represent the full run**: Top-level `usage`, `content`, tool calls/results, files, sources, and warnings accumulate across all steps; final-step-only data lives under `finalStep`.
    
-   **Message parts are more canonical**: Legacy media and image-specific parts move toward `file` parts with media types.
    
-   **Package-specific behavior changed**: MCP HTTP/SSE redirects are treated as errors, OpenAI Responses reasoning summaries default to detailed, and Anthropic cache creation token metadata moves into standard usage fields.
    

## [Link to heading](#upgrade-path)Upgrade Path

Follow these steps to migrate an existing project to AI SDK 7:

1.  **Update Node.js to 22+**: Verify your runtime and CI environments meet the minimum requirement before upgrading packages.
    
2.  **Update packages**: Bump `ai` and all `@ai-sdk/*` packages to their v7 releases in your `package.json`.
    
3.  **Run the v7 codemods**: The codemods automate the majority of renames, import changes, and API moves. Review the diff before committing.
    
4.  **Migrate OpenTelemetry**: If you use tracing, move your setup to `@ai-sdk/otel` and register telemetry globally. Refer to the [@ai-sdk/otel docs](https://ai-sdk.dev/docs/ai-sdk-core/telemetry) and the [OpenTelemetry span schema](https://ai-sdk.dev/docs/ai-sdk-core/telemetry#genai-semantic-conventions) for attribute details.
    
5.  **Review semantic changes manually**: Codemods cannot fully decide runtime requirements, ESM imports, instruction/message behavior, runtime/tool context separation, approval policy placement, stream helper usage, and multi-step result shapes. See the [full v7 migration guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0).
    

Terminal

```
npx @ai-sdk/codemod v7
```

For a guided migration, install the AI SDK v7 migration skill and ask your agent to apply it to your app:

Terminal

```
npx skills add vercel/ai --skill migrate-ai-sdk-v6-to-v7
```