---
title: "Agentic workflows are not conversations"
source: "https://blog.raed.dev/posts/agentic-workflows-are-not-conversations/"
publishedDate: "2026-03-09"
category: "design"
feedName: "Sidebar"
---

A user removes an item from their cart. Five minutes later, your AI agent recommends they buy the exact item they just removed. You check the logs. The model didn’t hallucinate, it did exactly what it was told. The cart update never made it back into the message history, so the agent was working from stale context.

This is what happens when you treat a flat array of `[{role: "user"}, {role: "assistant"}]` as a backend execution environment.

The AI industry spent two years rediscovering why databases exist. OpenAI’s `/v1/chat/completions` schema is a REST serialization format. Not a compute architecture. Not a Finite State Machine. Yet most teams build agentic workflows by wrapping a `while` loop around an append-only chat log and hoping for the best.

## The presentation layer is not the backend

Your application has structured state: the current user, selected items, where they are in a flow, data from your database. The LLM has a flat array of messages. These diverge constantly, and you’re the one reconciling them.

When you use the conversation array as your source of truth, you’re forcing a presentation-layer data structure to act as your control flow. When state drifts **(and it will)**. Debugging means reading the message array and inferring what the agent thought the state was at step 4. There’s no other way. The flat model erases that structure.

This isn’t a new problem. What you’re actually building, when you mix high-latency LLM calls with database writes and human-in-the-loop pauses, is a workflow. And we have a name for the right abstraction: durable execution.

Frameworks like Temporal work by checkpointing function state at every network call, transparently. Your code looks like a normal synchronous script. The framework handles the rest.

The difference becomes concrete when something fails. Say the LLM decides to call `charge_credit_card`, but the billing API times out. In the naive chat loop, the whole thing crashes. To retry, you re-feed the prompt and hope the non-deterministic model makes the same decision it did last time. In a durable execution model, the framework catches the timeout, waits, and retries `charge_credit_card` directly. The LLM isn’t invoked again. The workflow resumes from exactly where it paused.

Let the LLM do what it’s good at—semantic routing, data extraction, deciding what to do next. Hand the actual control flow, retries, and state management to a deterministic execution engine.

## Tool calls are not messages

The OpenAI and Anthropic APIs represent tool calls as message parts: an assistant message with a `tool_calls` field, followed by `tool` role messages with results. Fine for serialization. As an architectural model inside your application, it’s the wrong abstraction.

There are three meaningfully different kinds of tool call, the flat model makes them all look identical.

## Read calls

`search_products`, `get_cart`, `fetch_user_profile` observe the world without changing it.

A read call produces state: the agent’s knowledge. Before `search_products`, the agent doesn’t know what matches the query. After it, it does. The flat model makes that transition invisible.

The first thing that breaks is caching. If the user asks a follow-up that needs the same product search, there’s no clean way to detect the result is already in history without parsing message content. You re-fetch, or you write deduplication logic outside the agent loop.

Context management is the slower problem. As history grows, tool results become expensive tokens you need to trim. Dropping stale search results from a flat array means string manipulation on JSON-encoded message content. There’s no typed handle on “this tool was called with these args and returned this.”

## Write calls

`send_email`, `place_order`, `delete_file` change the world.

When a write call executes, something happened. That fact needs to live somewhere other than a conversation array the client can supply, modify, or reconstruct. It belongs in a server-owned record the client can’t touch.

If something goes wrong, you need to know what executed, with what arguments, at what time. A mutable conversation array can’t hold that. The flat model has no vocabulary for partial failures. You’re left guessing from which `tool` messages happen to be present. Replaying a failed workflow shouldn’t mean re-prompting an LLM; it should mean resuming from the last successful step.

## Hybrid calls

`reserve_inventory` and `charge_payment` are the awkward ones nobody talks about.

`reserve_inventory` looks like a read. You’re asking “is this available?” But it places a hold. If the workflow dies after the reservation but before the order, you have a dangling lock. In a distributed system you handle this with a Saga pattern and compensating transactions. In a naive agent loop you just have a dangling `tool` message sitting in an array, doing nothing while your inventory stays locked.

`charge_payment` reads the current balance and writes a charge. Not cleanly reversible. Failure mid-workflow has completely different recovery semantics than a pure read or write.

The flat model has one representation for both. The difference ends up encoded in application logic outside the agent loop, with no typed access to what it needs.

```
type ReadCall = {
  kind: "read";
  tool: string;
  args: Record<string, unknown>;
  result: unknown;
  cachedAt?: Date;
};

type WriteCall = {
  kind: "write";
  tool: string;
  args: Record<string, unknown>;
  idempotencyKey: string; // Required for reliable retries
  executedAt: Date;
  result: unknown;
};

type HybridCall = {
  kind: "hybrid";
  tool: string;
  args: Record<string, unknown>;
  compensatingAction: string; // e.g., "inventory.release"
  result: unknown;
};

type ToolCall = ReadCall | WriteCall | HybridCall;
```

Caching branches on `kind === 'read'`. Audit logging filters on `kind === 'write'`, so mutations go to a database rather than a prompt. Rollbacks get an explicit compensating action instead of guessing from message content.

An LLM chat log is not a backend. Build state machines and DAGs that happen to use LLMs as non-deterministic compute nodes.

The chat interface is for the user. The event log is for the system. The LLM is just a function call in between.