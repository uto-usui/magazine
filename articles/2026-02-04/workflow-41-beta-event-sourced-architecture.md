---
title: "Workflow 4.1 Beta: Event-sourced architecture"
source: "https://vercel.com/changelog/workflow-event-sourcing"
publishedDate: "2026-02-03"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

2 min read

Feb 3, 2026

[Workflow 4.1 Beta](https://github.com/vercel/workflow/releases/tag/workflow%404.1.0-beta.51) changes how workflows track state internally. Instead of updating records in place, every state change is now stored as an event, and current state is reconstructed by replaying the log. This release also adds support for provider-executed tools and higher throughput.

## [Link to heading](#what-event-sourcing-means-for-workflows)**What event sourcing means for workflows**

[Event sourcing](https://useworkflow.dev/docs/how-it-works/event-sourcing) is a persistence pattern where state changes are stored as a sequence of events rather than by updating records in place. Instead of storing "this run is completed," the system stores "run\_created, then run\_started, then run\_completed" and reconstructs the current state by replaying those events.

In Workflow 4.1, runs, steps, and hooks are no longer mutable database records. They're materializations of an append-only event log. Each event captures a timestamp and context, and the runtime derives current state by processing events in order.

This architecture makes workflows more reliable in three ways:

-   **Self-healing**: If a queue message is lost or a race condition occurs, replaying the workflow route detects missing state and re-enqueues the necessary messages. Old runs required manual intervention to recover from queue downtime; new runs recover automatically.
    
-   **Complete audit trail**: The event log lets you replay the exact sequence that led to any state, which makes debugging distributed workflows much easier.
    
-   **Consistency**: Events are append-only, so partial failures during a write can't leave entities in an inconsistent state. The event log is the single source of truth.
    

For a deeper look at the event model, including state machine diagrams for run, step, and hook lifecycles, see the [Event Sourcing documentation](https://useworkflow.dev/docs/how-it-works/event-sourcing).

## [Link to heading](#other-updates)**Other updates**

-   **Improved throughput**: The workflow queue system now processes many thousands of steps per second. When dependencies allow, multiple steps execute in parallel.
    
-   **Provider-executed tools**: `@workflow/ai` now supports provider-executed tools like Google Search and WebSearch, which run on the model provider's infrastructure rather than in your workflow.
    
-   **NestJS support**: The new `@workflow/nest` package adds build support for NestJS applications, handling dependency injection patterns so workflows integrate with existing NestJS services.
    
-   **Top-level** **`using`** **declarations**: The SWC plugin now supports the TC39 Explicit Resource Management proposal inside step and workflow functions, enabling automatic resource cleanup.
    
-   **Custom class serialization**: Client mode now supports custom class serialization, with a `classes` object in `manifest.json` that declares serializable types.
    
-   Fixed double-serialization of tool output in `@workflow/ai`
    

Learn more about [Workflow](https://useworkflow.dev/) or [get started](https://useworkflow.dev/docs/getting-started) with your first workflow.