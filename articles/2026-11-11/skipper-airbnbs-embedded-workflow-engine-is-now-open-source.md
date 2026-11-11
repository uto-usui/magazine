---
title: "Skipper, Airbnb’s embedded workflow engine, is now open source"
source: "https://medium.com/airbnb-engineering/skipper-airbnbs-embedded-workflow-engine-is-now-open-source-78dd354f472b"
publishedDate: "2026-11-10"
category: "engineering"
feedName: "Airbnb Engineering"
author: "Andriy Sergiyenko"
fetchedBy: "playwright"
---

## _Durable workflows, running inside your service with no separate orchestration cluster._

[

![Andriy Sergiyenko](https://miro.medium.com/v2/da:true/resize:fill:64:64/0*3B5C20Kn8IK25Yh4)



](https://medium.com/@andriy.sergiyenko?source=post_page---byline--78dd354f472b-----------------------------------------)

6 min read

11 hours ago

Press enter or click to view image in full size

![A white sailboat with its sails raised cruises along the deep blue sea, set against the terraced, hillside villages of Italy’s Amalfi Coast under a clear blue sky with scattered white clouds.](https://miro.medium.com/v2/resize:fit:700/1*iN_UiC2_U7flSb9jddr8tQ.png)

**By**: [Ricardo Gamba](https://www.linkedin.com/in/ricardo-gamba), [Andriy Sergiyenko](https://www.linkedin.com/in/asergiyenko/)

[Skipper](https://skipper.airbnb.tech/), an embedded workflow engine used in production by teams all across Airbnb, is now available to the open source community. Skipper lets you express multi-step business processes as Java or Kotlin classes, persist their progress, and recover from crashes and transient failures. It runs inside your service and reuses its existing dependencies.

Skipper is available under the Apache 2.0 license. The code is on [GitHub](https://github.com/airbnb/skipper), alongside documentation and runnable examples. Our [earlier engineering deep dive](https://medium.com/airbnb-engineering/skipper-building-airbnbs-embedded-workflow-engine-f6c34552146f) explains how we built it. Here, we’ll focus on the architecture of Skipper and where it fits in the ecosystem of options for development around workflows.

## Why we developed Skipper

A process that spans multiple services, waits for human input, or involves a mix of synchronous and asynchronous steps, needs persistent storage for recording its progress. When a server restarts, it must know what has already happened, what (if anything) should be retried, and what is still awaiting processing. Implementing this separately for each process would mean repeatedly solving the same problems around partial failure, timers, and recovery, with associated testing and debugging; using a proven library is likely to improve quality and reduce toil.

Existing workflow engines meet these challenges. A common approach relies on a central orchestration service, whether self-hosted or fully managed, to handle durable execution. This setup provides a unified platform for multiple teams, streamlining central operations and monitoring.

For Airbnb, we wanted a new approach, one in which each service owned its workflows within its existing deployment and database. For critical services, that meant avoiding an additional shared orchestration dependency. It also let workflow execution stay in-process, without a separate coordinator between steps.

That requirement shaped Skipper’s architecture, as shown in the figure.

With Skipper, the service’s replicas also run the workflow runtime and scheduler. In a typical production deployment, they share a database that holds workflow state and scheduled work. The scheduler polls for runnable tasks and uses leases to coordinate ownership. If a replica fails, another can recover the work; takeover timing depends on scheduling and lease settings.

This reduces the number of separately deployed systems. It also puts responsibility for workflow execution, database capacity, and recovery with the service’s team. The duty of assuming those responsibilities is part of the tradeoff.

We believe that Skipper will appeal to teams that have a robust operational environment and need a workflow engine that adapts to their existing ways of working.

## A workflow is a class

Skipper has two main abstractions. A **workflow** describes the orchestration: decisions, ordering, and waits. **Actions** perform work with potential side effects, such as calling an API or updating a database. Skipper records action results so they can be reused during recovery.

Consider a hypothetical listing-publication process. Some listings require a human review before publication; afterward, the host receives a notification:

class PublishListing : Workflow() {  
  private val listing = actions<ListingActions>()

  @StateField var reviewApproved: Boolean? = null

  @WorkflowMethod  
  suspend fun publish(request: PublicationRequest): Boolean {  
    if (request.requiresReview) {  
      val reviewed = waitUntil(  
        { reviewApproved != null },  
        Duration.ofDays(1)  
      )  
      if (!reviewed || reviewApproved != true) return false  
    }

    listing.publish(request.listingId, request.requestId)  
    listing.notifyHost(request.listingId, request.requestId)  
    return true  
  }

  @SignalMethod  
  fun recordReview(approved: Boolean) {  
    reviewApproved = approved  
  }  
}

`waitUntil` hibernates the workflow without holding a thread. The `recordReview` signal lets an API handler or queue consumer supply the review decision. A redeploy during the wait does not discard the persisted workflow. If approval never arrives, the timer allows the workflow to complete and deliver a negative result.

## Get Andriy Sergiyenko’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

The action implementations and request type are omitted here. Each action must make its own side effects idempotent, for example, by deduplicating publication and notification separately using the stable request ID. Skipper does not make calls to downstream systems transactionally.

Java workflows use the same model, with methods that can return `CompletableFuture`. The [examples](https://skipper.airbnb.tech/examples/) include Java, Kotlin, Spring Boot, and Dropwizard projects. For tests, `WorkflowTest` provides an isolated in-memory runtime with controllable time, so you can exercise waits, signals, retries, and completion while supplying fakes for downstream collaborators.

## Recovery through checkpoints and replay

When Skipper resumes an interrupted workflow, it re-executes the workflow method from the top. Actions with durably persisted checkpoints return their saved results. Execution continues through the remaining work.

This requires **deterministic workflow code**: orchestration must remain compatible with replay. Clock reads, randomness, and I/O belong in actions or explicit checkpoints rather than directly in the workflow body.

By default, Skipper batches action checkpoints until execution completes or pauses for a wait or retry. This reduces database writes, but a crash before that batch is persisted can require several previously completed actions to execute again. Actions can request immediate checkpointing to narrow that window. Even then, a downstream effect and its checkpoint are not one atomic operation, so side effects remain at least once.

On the normal execution path, a workflow can run directly in the service process, backed by persisted state and scheduled recovery work. It does not need a round-trip to an external orchestration service between actions. Database access and downstream calls still contribute to latency; the benefit is removing the separate orchestration tier from that path.

Durability does not mean every business operation succeeds. Developers define which errors are retryable and choose retry policies. Permanent failures and exhausted retries are surfaced for handling; scheduler tasks that exhaust recovery attempts can require manual intervention. Skipper also supports Saga-style compensation when a process needs explicit recovery actions for previously completed steps.

## Where Skipper fits

Skipper’s production use already spans multiple teams at Airbnb. It is a good fit for a Java or Kotlin service that owns a multi-step process, and wants durable execution within its existing deployment. It is especially useful when the alternative is maintaining custom retry jobs, state tables, and polling loops for each new process.

## What’s in the release, and what’s next

The open-source release includes the core engine, MySQL and SQLite adapters, test utilities, and the admin UI. Signals, queries, retries, compensation, and workflow evolution primitives are part of the programming model. It also includes **Skipper State Machine**, a Kotlin DSL for processes that are easier to describe as states, events, and transitions. The [documentation](https://skipper.airbnb.tech/docs/) covers these capabilities and JVM compatibility.

Next, we plan to explore adding more storage plugins, such as Postgres, DynamoDB, etc., and improve tooling for workflow evolution and replay debugging. Open source project contributions around automated compatibility checks, migration assistance, and clearer replay visualization could also help developers work through problems common to replay-based engines.

If this type of work interests you, check out some of our [open positions](https://careers.airbnb.com/)!

## Acknowledgements

A huge thank you to everyone who contributed code, adopted Skipper, shared feedback, and helped get this release over the finish line. This work reflects contributions from teams across Airbnb.

Special thanks to:

Our engineering leadership sponsors Navjot Sidhu, Musaab At-Taras, Mini Atwal. Jon Parise for guiding the team through the open source process, and Gary Leung and Harshit Gupta for helping us shape Skipper with its first use-case.