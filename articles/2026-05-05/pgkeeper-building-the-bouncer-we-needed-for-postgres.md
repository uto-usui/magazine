---
title: "PGKeeper: Building the bouncer we needed for Postgres"
source: "https://www.figma.com/blog/pgkeeper-building-the-bouncer-we-needed-for-postgres/"
publishedDate: "2026-05-04"
category: "design"
feedName: "Figma Blog"
---

Figma has grown a lot over the past few years in terms of both features and users, which means our database layer has to contend with an onslaught of novel workloads and increased traffic. It was clear we were outgrowing PgBouncer, a lightweight and widely adopted PostgreSQL connection pooler. That led us to build PGKeeper, a new connection and load management service that replaces PgBouncer in front of our Postgres fleet. In this post, we walk through how we designed and rolled it out.

## [10,000-foot view of the database stack](#_10-000-foot-view-of-the-database-stack)

PostgreSQL serves as the foundation of Figma's OLTP system. As Figma grew, we implemented [horizontal](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/)

and

[vertical

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAACa0lEQVQokUXS20/SARjG8a66VBTDY+aNlmbmKa2c81DZQUPbcKIMVEAEDwkrOzjRbJamE88BBvwU+HFQs0xXLpu15dZN6x+o+7rpb/gWWPPivf3sefc8R2LCTUhCLST5O8lcGeS8d4obPgc1vgUuio/JC/WRs2rgzKqOonA7F8IGCsJG0oJtSIMqJKFmYsPKgwspORIBj4la8j02GpZ26XTuc2dhk/7nDrSuEQq9PaQF1WQHFBT6b1EoKskT9WR6TWR4jSQGWqNQTKjpHxhqItVv5KYQZsz9nYBtj+2BUXaGDSxO6bjqMHNKuEepx8I5z22yl3vIWjFT4LFS5hkjb2WEVH8PkqCKSLgoeFw00iqusSp85Zt1ki/GNl6a+3hiHaTBNssV+xp19hDVDhclDjuV9hkM9jHMi9Mo5oPkL80gE3XRlFEwRdQjFxeZf+Fny9yJrUGOUm7isnaYyqdOFM4duoRPGIRdmu2bdD+bYM7ayv3eRmr0D8kdGkYmaA8TpgR01G1MMLhhxzLQTllxLgmyDJJKqikbGqF/7R2+rR/4N34y6v7I+KCF+ZZL1BedJiUrB5nqOvHOg3KiYHpYj37Xjm3/LYrpERLLCzkqkyItLeba+DBzHz6z/f4X669+MyrsYR0yM99Yhf5sJjk5J0nW1hLvUh2CiWENVZuP0GwLVCxNkmJRIlFXIuuVU+S4i2bTTc/6GzrE19QuL1Iz24fpgZwuQzkV3fWcmNAR71MT+//lSN3SoJrkQAfJPgMJgoY4t5K45WakoprkoJ400USaPzITHTJRQ4agJMulIF1QkSBqiI3s8W8pfwBARJixybsgNwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/5c8ad1394a1cf21fc39adf7ca3d9f317c8b98b80-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### The growing pains of database architecture

How the Figma infrastructure team reduced potential instability by scaling to multiple databases.



](https://www.figma.com/blog/how-figma-scaled-to-multiple-databases/)

sharding across our database fleet.

![A playful diagram showing an application layer feeding into a DBProxy, which distributes connections through poolers to multiple RDS database instances including a primary, a replica, and sharded primaries.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAC4jAAAuIwF4pT92AAADS0lEQVR4nI2Q+0/bdhTF8y9vLQWpE5paVaPSJi1jLNug4lkoJECbQCCQNE/HeTiO7dgk8ffr94Mkxo7t2KHLA01Z+aFilah0dKWrcz+6Ryfg32kP5E1U0+c0g1S7uOmy3kjxJw9v/P8UeLAP73T7VgRCGckeFM93mpVkR2HsgeBN1Mdh/067cUAdvbz4+4/E0s+5YAgLR0CjbHn8N8ATVdfo6uGHzMvl1IvfUy9Wsq9WsGj8utvyp4/AujdWNImsHX8ohjbyu4fI3lHxz00seqLr9P+Tf+Wz0WdZBsXRZAVL4/V8vfyxSRcNm33080yDsaL1Ac7WSkS+QiIkwDULDMbKNxXm32m6zZXrxXT8MHN6WMGRa/srbflfwt5UnQWbat5U67kcVUvnIqu5yCqJpw2X86fq54PZfAhPNXcs259Ea8hbt2LPAQydzZzt5C/fNVuI4cD+rWANefuT6H6R/x52R7IxgD2X7bmg6wLFYKhWIYeeFMrxBosoBtNzwcxyWGMAnZH8ubwZ3B9CXi4wzXNZx8wBVDs42TjFydMWX2wJKE7FCepE1qumCyQdo6/OoJi1fPYeVrvVdOKX6P48iUe6PYYijqLvFpLx15KGKh0scxGM7s3h5bfXHapBvo/tL6TiS5KGelM14E1VUSudR5fC209qlX29Q2HVg/D20/PYT6KKyh0slQhGtp6ghQ1FrxP14+Pdhfj7V1DKDyZKYDBWxE49W4xcpLZpNqffXBHMx/PLzULpWO5SikGjWCyR3MIbl9rNVZNDUpndDBLmtJozkgPOP4JqVMnmWY0+5bWibuFtMV0lozRI6iau3dQa7YsqEQNi7tqs8yqCN06IqzOlW7H8dqBrIZq6I3PLIlgW+b8E6Y0khcR2UOJWJGlN5FaF5m8C/avMhgS4KsKQ2ApKraAirGudREDRY1LrtUTNi8QzlnjeZn4UmOdS9alQe8bSi21ykS/Nich3XGW+RSxC4gepMieWvuepl7ISDnT7FYk/gvQGaKzD9p4gHHHNtwB/A8h1Dh7wXASSmyy2BhtbPB/h2X1YX2fxNZ4Nd0x0VpjtC6YDTQf0Pc4eCpbLmTYwbWh7/L3VB5YLnaHQ93jThqYN+h4/GMn/AlFM/sIZbtaYAAAAAElFTkSuQmCC)![A playful diagram showing an application layer feeding into a DBProxy, which distributes connections through poolers to multiple RDS database instances including a primary, a replica, and sharded primaries.](https://cdn.sanity.io/images/599r6htc/regionalized/175f23ce93df8b45091f5dfdfc578522a786d6ca-1608x1608.png?w=528&h=528&q=75&fit=max&auto=format)

We built a request routing system called DBProxy to hide the sharding complexity from application code. It parses and analyzes the query, selects the appropriate target Postgres instances, and rewrites the query into one or more queries for each designated instance. From there, the request goes to a connection pooler (the component this post is about), which sits between DBProxy and Postgres. Each Postgres machine is served by a dedicated set of connection pooler replicas, establishing an n-to-1 relationship between the poolers and the underlying database.

## [Why PgBouncer was no longer enough](#why-pgbouncer-was-no-longer-enough)

For several years, our system relied on [PgBouncer](https://www.pgbouncer.org/), which performed adequately during Figma's earlier stages of growth. However, as our traffic grew and the reliability bar kept rising, we encountered the following limitations:

**CoDel** is a load-shedding algorithm that sheds work based on how long requests have been waiting, not how many are queued. Originally designed for network routers, the same idea applies anywhere a queue can get overwhelmed, including in front of a database.

-   **Scalability**: PgBouncer's single-threaded architecture imposed a ceiling on vertical scalability. We scaled it horizontally by adding more replicas, but performance began to degrade due to load distribution skew.
-   **Load management**: PgBouncer has no way to prioritize critical traffic above misbehaving, lower-priority traffic. Furthermore, the absence of a backpressure mechanism and support for sophisticated algorithms such as Controlled Delay (CoDel) prevents the graceful management of bursty load.
-   **Connection management**: Postgres connections are resource-intensive. High connection churn or unbounded connection creation introduces significant reliability risks. PgBouncer lacks mechanisms to safeguard connections against both rapid creation and churn. Consequently, naive recovery after an overload incident can itself overwhelm the database, causing extended connection churn and prolonged, cascading overload across Postgres nodes.
-   **Extensibility and fine-grained control**: As PgBouncer took on a more central role in our infrastructure, we needed the operational tooling we apply to our other critical services (deep observability, safe rollout via feature flags) and the ability to shape its behavior at the level of individual traffic types, with capabilities like admission control and fair resource sharing. Our experience maintaining even small patches to PgBouncer showed that extending it would carry significant maintenance costs.

## [Building PGKeeper](#building-pgkeeper)

A natural question is why we didn't simply push connection pooling into DBProxy, our existing request router. The answer comes down to a numbers mismatch: We typically size each PostgreSQL instance's connection pool to about 100 connections, but we operate hundreds of stateless DBProxy replicas.

Distributing a small, fixed-size connection pool across a large number of stateless DBProxy instances is not feasible. Embedding connection pool management into each DBProxy replica would either violate the connection limit or require complex coordination across replicas.

The next candidate was [PGCat](https://github.com/postgresml/pgcat), a modern multi-threaded PostgreSQL proxy that directly addresses PgBouncer’s vertical scalability limitations. But the extensibility problem from our PgBouncer evaluation applied here too: Adding the observability, feature flagging, and admission control we needed would require deep changes to PGCat’s core execution paths, changes unlikely to be accepted by upstream. In practice, this would force us to maintain a fork of PGCat, which would be a long-term burden.

So rather than adapting an existing proxy, we built our own. PGKeeper is a Go service that sits between DBProxy and Postgres. The name comes from the idea of a goalkeeper that protects bad traffic from overloading the system and protects connections from churning.

Unlike PgBouncer and PGCat, PGKeeper exposes a gRPC interface to clients. Each database query is treated as an independent request with metadata attached (e.g., traffic tier, user type, and request source) that PGKeeper uses to make decisions about how to handle it.

We built PGKeeper on top of [PGX](https://github.com/jackc/pgx), a mature Go-based PostgreSQL toolkit. PGX provides the necessary primitives for connection management and protocol handling without constraining higher-level behavior, allowing us to implement custom load management and admission control logic cleanly.

Choosing Go aligned with our team’s expertise and broader infrastructure ecosystem. Its concurrency model and efficient resource usage also provided strong vertical scalability out of the box, directly addressing one of PgBouncer’s core limitations.

## [PGKeeper deep dive](#pgkeeper-deep-dive)

PGKeeper replicas are deployed behind an NLB, and clients can establish multiple lightweight gRPC connections and distribute requests across them in a round robin manner. This decouples load balancing from the stateful nature of PostgreSQL connections and enables more even load distribution across PGKeeper pods. Each PGKeeper serves only a single Postgres instance, with multiple replicas deployed per instance across Kubernetes clusters for high availability.

At runtime, a request lands on one of the replicas and proceeds through three stages:

1.  **Admission control**: Before the query reaches the database, PGKeeper uses the request’s metadata to decide whether to admit or reject it based on current capacity.
2.  **Connection pool**: Once admitted, the request gets a connection from a managed pool. PGKeeper governs connection creation and destruction rates, maintains the pool's health through warming and cooling mechanisms, and guarantees that connections are returned to the pool in a sanitized state to prevent unnecessary churn.
3.  **Query execution**: The query is executed against the underlying PostgreSQL instance, and the results are streamed back to the client.

![A diagram of a DBProxy sending a request via gRPC through an admission control gate and connection pool before reaching PostgreSQL via the wire protocol.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAACrElEQVR4nE2S+09SARTH7z/kvRe4IMnj8lLBXDkfZVvlqllplj3kzb3yELyXx8V8VDanJc6lIOOhIA91rYfL1IbKSkBBCCa/9Dc01E22787Ovjvfc344HyDghC5FQUEHtOyAlx1wgAKrTHjZDgcrZtWwEwaqk6tW+peh2k09Z8PAiZqZqyQ9QtI3LMxNE/unoe6biR0lGEEKvpgfoV2GV+y0TSM7oxOm1I3bStmuWryH8w4GeWlMWNBKipr6nEa8o+eErfTKfeo8TEF+iuanoCjJSOL8MiYrWlqPh9rz6qa8XFJQSMqqhlO1rKBqKqmkKUywZkF8VshHQAEHDCzauHOkdMGGxgjWISYoE+3l+b7y3JO8oSXRJ0j0ojlF44mp9dDckdU2J1VoRI+4jciivtZrZQCu0Yczo4OukUdhC3owKCxM3iutm0txQ8px63sP/2s3N6ltzk73HM89O7J0bA/wvGrmDCabxm7MkyLAP2tYcb32TSnCRH3CIMpOPTgJGU5C+NGbu8lXkoOngvRQW+6TIr+kyVG3fylRr5Yzgd8Z1fd/IFqA0Pv7oYmu4FhbnET3DeKMvTM11p0e787abhY1slNlQ9Hcmnv7OPeu96+18xAXhfXcSWPbuLHro1kGLNnqFsxMD4nECVZCK0gqpIkBWULe9FshK6mk/zTSU93VNHYtpbtexJozmChmrJ01sqeNV1wmFuC1gR5rjdcORgjGlpaz+5K/9Zz3o5+784L/RynMasQZtWhfju7J0bRauI/zo2aGhwAXiRq3Far+Mxy3IGt65qoOCWsZER0Sw5E4zozhSBRD4jjy2cRatzBXbLSz70IBZxUkAScUpGC/HVoiQPcw6CEu5B6ucQ+DXhL02yvwXhJaTdi5/M7KVl9F4HlzUZ2g/wzharb/A2XKjbHU4jBAAAAAAElFTkSuQmCC)![A diagram of a DBProxy sending a request via gRPC through an admission control gate and connection pool before reaching PostgreSQL via the wire protocol.](https://cdn.sanity.io/images/599r6htc/regionalized/1a5a029d81502c924a64217a4374e4fce9efb7bf-3264x2176.png?w=1080&h=720&q=75&fit=max&auto=format)

How a request flows through the DB stack with PGKeeper

### [Connection management](#connection-management)

PostgreSQL operates on a process-per-connection model. Every client connection instantiates a dedicated backend process on the server, which carries its own memory allocation, session state, and query plan cache—connections are expensive to create and stateful. These costs make connections worth protecting. A pooler plays a critical role in managing connection lifecycles and minimizing churn. The mechanisms below are how PGKeeper does that.

#### [Pool warming](#pool-warming)

A new PGKeeper instance with an empty connection pool will experience higher latency when first handling requests, as time is spent establishing connections. PGKeeper solves this with a simple but effective mechanism: pool warming. This feature proactively brings connections online before production traffic is routed to the instance.

#### [Connection creation and teardown rate limiting](#connection-creation-and-teardown-rate-limiting)

Pool warming handles the steady-state case, but it does not protect us during a massive connection churn event. Pool warming will attempt to re-establish the lost connections when the pool is not fully hydrated. Without guardrails, this re-creation could itself become a source of overload.

PGKeeper rate-limits connection creation through a token-bucket mechanism. New connections are only established when a creation token is available, spreading the cost of pool growth over time. This prevents bursts of connection creation from overwhelming Postgres, particularly during recovery from churn events, where simultaneous query replanning across new connections can saturate CPU and prolong overload.

PGKeeper uses [bradenaw/backpressure](https://pkg.go.dev/github.com/bradenaw/backpressure), a Go library for prioritized load management authored by Figma alumnus Braden Walker. It provides numerous primitives. We adopt two: a rate limiter (a token-bucket that refills at a fixed rate up to some burst capacity) and a semaphore (which bounds concurrent work rather than rate). Both support priority levels, so higher-priority requests are served first when capacity runs low, and both use CoDel to drop stale requests under sustained overload. PGKeeper uses the rate limiter for connection creation and teardown, and the semaphore for admission control.

The same principle applies to teardown. During our upgrade from PostgreSQL 13.21 to 13.22, we discovered that mass connection closure during pool shutdown also drove significant CPU saturation on the database host. PGKeeper therefore also rate-limits connection destruction, ensuring that connection pool shutdown does not itself become a source of instability.

#### [Connection churn avoidance](#connection-churn-avoidance)

PGKeeper implements three mechanisms to ensure connections are cleaned up and reused rather than discarded.

1.  **Bounded exhaust:** When a client does not fully consume a result set, the connection may retain server-side state such as open cursors or buffered rows. PGKeeper drains up to 100 remaining rows before returning the connection to the pool. This is enough to rescue the vast majority of incomplete reads (P99 of our queries return fewer than 5 rows), while avoiding unbounded work on the outliers.
2.  **Auto rollback:** If a connection is released while a transaction is still in progress, PGKeeper automatically issues a ROLLBACK before returning the connection to the pool. Without this, the connection would carry uncommitted transactional state, making it unsafe to reuse and forcing the pool to discard it.
3.  **Context cancellation handling:** The Postgres wire protocol has no native mechanism for a client to signal that it’s no longer interested in the result of an in-flight query, short of opening a second connection and issuing a cancellation from there. PGKeeper handles this by accepting a context from the client through its gRPC interface and translating cancellation into Postgres-native operations. When a client cancels a request, PGKeeper returns an empty result to the caller immediately and handles the actual connection cleanup in the background. Because P95 of our queries complete within 2 ms, PGKeeper waits briefly before initiating cancellation, avoiding unnecessary overhead for queries that are likely to complete on their own. If the query does not complete within this waiting window, PGKeeper issues a `pg_cancel_backend()` call through a dedicated cancel-only pool (kept separate so cancellations don’t monopolize the main pool). The return of the `pg_cancel_backend()` call only ensures the kill signal has been enqueued, not necessarily delivered and handled. So, we need to force the target backend to get scheduled and handle the signal. Thus, we run a lightweight `SELECT 1` to flush any pending kill signals immediately after the cancel invocation. The connection then goes through the normal bounded exhaust and auto rollback steps before being returned to the pool.

These mechanisms were born from hard-won lessons operating Postgres at scale. Since deploying PGKeeper's connection management, we have not experienced a single massive connection churn incident. Knock on wood.

### [Admission control](#admission-control)

At scale, overload is inevitable: Incoming demand exceeds available capacity and the system cannot serve every request successfully within a reasonable time. The question is not whether to shed traffic, but how. Blindly admitting requests leads to a vicious cycle where queues grow, latency spikes, and failure cascades across unrelated workloads. Conversely, indiscriminate rejection wastes work, extends downtime, and results in a poor end-user experience.

The system must define how it operates when capacity is constrained, and there are always tradeoffs. With Figma’s traffic patterns, historical incidents, and operational requirements in mind, we aligned on the following design principles for admission control:

-   **Optimize for the end-user experience.** During overloaded situations, we should try to keep actions like opening a file, loading a document, or saving edits highly available and responsive. On the other hand, asynchronous batch processing jobs and other lower-priority workflows can tolerate temporary degradation.
-   **Solve for concurrency-based load.** Knowing that no solution could cover all problems, we focus on the most frequent source of overload at Figma: an unexpected spike in the volume of concurrent requests.
-   **Be adaptive and dynamic.** Because we often see traffic patterns that fluctuate greatly, and are undergoing a period of intense scale, we didn’t want static thresholds or a system that needed constant manual adjustment. Whatever mechanisms we choose should be self-balancing.
-   **Make decisions fast.** Admission control runs in the critical path of every database request, so any system we implement must exhibit low (ideally negligible) latency overhead.

#### [V1: Priority-based admission control](#v1-priority-based-admission-control)

We started with a semaphore, which provides a straightforward mechanism for bounding concurrency. By defining a fixed capacity, we can ensure the database never serves more than a maximum number of concurrent connections.

When a request arrives, PGKeeper attempts to acquire a semaphore slot. If capacity is available, the request proceeds. If the limit has been reached, we have the choice to immediately reject the request or queue it. Both options have tradeoffs.

Immediately rejecting is often inefficient. Clients are extremely likely to retry relatively soon, so the system pays for the rejection and then pays again to handle the retry. Database pool capacity is typically sized for average peak load; when traffic spikes above that, immediately rejecting leaves us with no room to make more sophisticated choices in our favor.

![Two side-by-side charts comparing query load: the left shows stable daily QPS peaks over days, while the right shows a sudden sharp spike in QPS over minutes.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC3UlEQVR4nF3N209SAQDH8fNHNXuoZQ/pVk4TFVG7zLRNH7ysBoogG9kE76hwSkBALhb3w+UcbjMJrSzvIizviMjxyOFioOABH5pYW2v7PPxevvsBiCWuQVJyBzHlzMr/oXRm9faMy4F/n9/bWPZ7V/3eFf/Gkn91wbe+6Ftf3lpZOALU+hMOFG9HLlsQohUh2vJaEeK1jRiCz632Hb/XFMHEsagwiouwAzDwbSi4NoIGpQd7TkCpC9MM0WprhgQTFTBRmVcBEzUI0W09Nzk393fF6XR3LsfIZhmp/TbM+Czy6cUvlIWhSkCpDdP0ONmSLocJ0l/lMEFBCOafWJTJMK6u6ESmM7neFBFVxox1ySMmhioApfb4Jib9F8PXMeTw7u2IMunr+DJJO5tvxMfKE7raZJB5/azSHtN0p2RzimTN5F3cDIr1gmlJQY7NvW1ROs3I5eiZODXhqscHyxLa2tTfONylPqjX+GoMQQp08kS3TTEeVxvRBt3WG2MYgr1by2ASpV6eUS/Cr+Lmpzi3NK6mJA8Z1/G0LtyrmGOJ+e1yTbPK2SERtsihJoWtWyLkfZiDtIs+dV/EUh//0hD72ohPkfGekris6szXgQbkgEZ7ODEpFY/X8fgvOSAVHK8b5jdz+W0i/nPVlBCWz24Os7He8sjI4xOw4nSwNMp6FBsqw41NQY8AgDR+9QRbx7s7PVgg7buj6rul6C9QDNzWj94zS9kumdXfx4owSiJdRaGuohD9AdZZHGUUn3KrA6K3gEntNUz0GHgPNYOFSs59JadQxS3UDBSaxktgGdclQ1b7e4Os2iCz6mdnpZ9G2qVXhZjkI3bD9mg/ABsCRrkFkoJmqcAkASGJwCQFLTIBohDZNS7Hx7XZ96aFMeGyQLwokPwQTC6BkpV3khWhalHuAmZsSQQKO0yHbhvqtmNu+8mNzw7M7YjPIAm7IWTXB9wW1IOcemx5COZBIh5b7DcOKhSInGl3aAAAAABJRU5ErkJggg==)![Two side-by-side charts comparing query load: the left shows stable daily QPS peaks over days, while the right shows a sudden sharp spike in QPS over minutes.](https://cdn.sanity.io/images/599r6htc/regionalized/00360b61be3e2019d142f75c5368bca758f72b7c-3264x2176.png?w=804&h=536&q=75&fit=max&auto=format)

Looking at the weekly average for one instance, traffic appears to peak at 20k QPS. Zooming into a finer time-scale, we see traffic spikes to 45k QPS.

For short-term spikes, queuing is a more graceful response. Rather than rejecting excess work immediately, the system can temporarily hold requests while capacity recovers.

![A diagram illustrating a semaphore-based flow where requests acquire capacity, execute using a connection if available, or queue and potentially time out and be rejected.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAC4jAAAuIwF4pT92AAACmElEQVR4nHWT+0uTURjH9/eIvxikzr2Xc97ruWxzU6ekiCssVoEKIRUilURFJYh0MbtCWglB2W0khRBOamqpu+rcxV3eve+rf0TMTVlW8IVzOM/zOec53+ccyw4VyipSIYbAD4kNSkxIBVkqmvuh/8lSHnapULBLS+1u/3Gvv7d3obsz0YwMUgqZVDDtouGQDYds2sVyclkWg8AiEYoYZJrRl77+idG7d8Yfvhm6tO5xJxUupXLbTpTo7F7z+lZ7fPEub9ZlLxCoEaATaMkifkPh4pIt2ow/Do/cnnp7dfr99M3x4LGOFWhdEayh1rZvg7dmrkw9vzz1aWhipccXVkFUsiUUtgRvKtymxMRcZG545N6jmbHJV69vjP3sOhaXmbjMRDyeufOjj6+9vH/9xczIk+8nByJYjJdgzmJSqBOoY5BzoaXTPv/gRf+5C4H+ga12t06gQWDWRX95T3w90//5bF/glC/R4dGoWCyXvbtvnW4X0y686aZJF9luoUWnUl43qag55ZRTiTukLbuo7eeXDKuQRMgiPqPyOcQbBO5QWN0SDYOEzK4JTetiU0rldFLVKpMKeQTiMhsSbRsKqxG4SwWDwDwGBQx0IqRUPgit81z9At8YlpgCrmxdOTmPQExiVoWmiGTLYZCnIERtC7g+gBsilEkgbgla59mji3xjTGa1Q7BOYAbxCYVNqlwOg6iDmW2pe9BaM9la88F9JEyYiMQsQ+uqYEurvF66VxVs7vEahgUMchiE7LZ3LXXPPLVP22pnXXVrxJZB/DbicwgUCTx4thX4QDqBaZWPKswyti7ihgBuCCJrWGEyiDf+dPEfsEGEHAJplU+rfFLltlSuPM9j8Pc/OQxXfsKe24U9t42qOg/BvwHh1LLtqF1xlwAAAABJRU5ErkJggg==)![A diagram illustrating a semaphore-based flow where requests acquire capacity, execute using a connection if available, or queue and potentially time out and be rejected.](https://cdn.sanity.io/images/599r6htc/regionalized/5d787182eddefb9a4709a4087d8932cda39f5070-2160x1620.png?w=1080&h=810&q=75&fit=max&auto=format)

But queueing has its own failure mode, and we’d seen it before with PgBouncer. During a sustained overload, the queue fills faster than capacity can drain it, and requests sit there long enough that the work they represent stops mattering. Picture a user waiting on a slow page load. After a few moments of nothing happening, they hit refresh; now there are two requests in the queue, but the original one is no longer meaningful. At scale, the queue fills with stale requests and the system struggles to clear the backlog.

A more detailed explanation of Controlled Delay and adaptive LIFO can be found [here](https://queue.acm.org/detail.cfm?id=2839461).

An ideal queuing mechanism would absorb short-term pressure and maximize the value of work under limited capacity. To accomplish this, we adopted the CoDel algorithm combined with adaptive LIFO scheduling.

The system's health is determined by the state of its request queue. A healthy, non-overloaded state exists when the queue is usually empty, allowing requests to be processed in a standard First-In, First-Out (FIFO) order.

Conversely, the system is defined as overloaded when the queue remains non-empty for an extended duration during periods of heavy traffic spikes. To aggressively shed this excess work and rapidly drain the backlog, the system switches its processing order to Last-In, First-Out (LIFO) and employs shorter permitted time in the queue, ensuring older backlog requests are dropped more quickly than usual.

![A diagram comparing queue strategies: in a healthy steady state requests are served FIFO, while in an overloaded state the system switches to adaptive LIFO to prioritize newer or higher-priority requests.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAIAAADzvTiPAAAACXBIWXMAAC4jAAAuIwF4pT92AAAFBElEQVR4nG3T+U8aaRgH8P6/m+xqL2tt1Ypccg9zcAgKiIjVtvbAbaO7W6UqiMoxDPPODDAXc3HKUVdXzUZrbU2aPHnz/vLJ902e73tvcFn7Nv0LsXVSVY6B0gFaj9F6tNIBtSZRaxHKMVA7lNQiGgOmfyHeknu3t95/gtwGJS5TYjOskufUfFXOkWyaqKQAlwH8YbmW1bp0//xXuH8u8g0yVUwfgoNak2z0mHqPVtpAbBAEl00VMoAttgbs4EIcXPyE+1exYmsgAJ75+wuxuQtIgW32+eN/hc6JoLS5/RKd2ARbuxUg8PUu3z0V+xffcetMYDQuQwiJz2LkpeCNcct/VrYz9D4B0jjY3AGRtbI3zM/GpJVPUvJIIGW+eSZc4a+XNb7Hv88J4bUGFm3ZfKIOoo0w6QiU3KECFMLtvqLOnp+05vVwBZrTfK+0tZzI9/mv11hkOvzCnoQsHiPBY6dfMaKcAWanMc6McjMYb0bYF1Z8zLQ/bivMwJwlWg/ty5WucIPLHT66J2MLzaBH9mDcjJfVe6tGbxVGqx60CqHlaag45jiadGQtLtKyIIcyd/FCSvaE6xGo7HMVjXBxHC1OITjiwgNOHIVwA1yYxIpGlHDBwHqFlV8lYyIGM0YYTKFgCqPsboBAwO2mZhDK4C1bfCzkFWyL9fAVFm9wpcMvpiQk1kYCDadXMCCMES0bvawZq8zA9AzMmGDGjFZsPgHyq86l5sJPz66JPf4jzr/8JC+/l2JvueAKGVwm5lap0CodiJf8sWIgTkRe0YtrbPytEN+QPpaE2kD4eile7bl9JrAtjhJZki3jNLmP53aODnZzh7vZw8+pvb92d5KZ9BFRKFUZiq9SEsu1uc6Z+KOe/XOxe8prLaLKfKHpJCtleRWvSFnAZig2UwJJQPyjqIXuKd8/F2/r/R1f1HqnnCpny5kP1b03dS7dPqbVNiU3QL0BhNIWk3wlFTY6Dbx3yn3r5g3unbLtJt5g95TDRO1jSFqBlI2Iim/U6KRIJeXCprwZkVZh+Q0mb8frzHa7ifdPuRvcaeFqalV65+WilmpguoqO0d4JKmwil+zEkoOKWhnfJI2MAfgpMztVe+3W0qudNjG4kK4/hnKgrmPq/DTneU4jYxQ0QkJPgOsxgJ6UXCNF50jW8mDfPJwyDeVsj3jfM3Xd01azN7itHGgJVAsbpDm9ENAJsy+EOaMwbxLnzXxgmsbG887RQ+fokXucwKZE/7iaQNpqtn+D5Yz8ARHCpnLIAoIGKmikYgi1MsusBOhFNxk0EX59KWQjl7Dysk8OG7Vr/CNZ/oCwYRMZsub9+pxPn42483F/YcmXm3fk/QZ81liKQuTKbHU1qC6YtQR6B6sJVA4ZuDkj7dMVkee4V0fOGko+fR5+jsPPCsh4ya+vhK1y1NEI67X1u1hbxxphvRTQVT0TFPSEhp9Wkadl+CkFjVDuURIapZBngm+yPjfdCum0dewXmPNOFOyPj2aGCrZHhP1hwf4wb72ftz04stzPWh8QzhHBO9GYn7qDv62qETFUPRNp03BS91vaPJwxD6XNw2nTUMr0x57x97R5+ND6kEHHtblrrNwmNwvqTlxL+GtrGFhyElEbFXfSSw4q7gRLDhBzgJidXnZVXrqE16jyDlN34p1m8QZ3TyoN6UApf1GZpHI12yqTVK/ObYXeuh2V2VLpLYXZqtf2uyeVwWXtfw+P8bPo8upuAAAAAElFTkSuQmCC)![A diagram comparing queue strategies: in a healthy steady state requests are served FIFO, while in an overloaded state the system switches to adaptive LIFO to prioritize newer or higher-priority requests.](https://cdn.sanity.io/images/599r6htc/regionalized/e2c9095a162eaf2fc484abf6e0edcdf49382c07e-1608x2144.png?w=528&h=704&q=75&fit=max&auto=format)

So far we've talked about how PGKeeper handles capacity pressure, but none of that addresses _which_ requests get served when the system is under pressure. All traffic at Figma is tagged with a priority. Higher priorities correspond to critical user flows, while lower priorities represent background jobs or auxiliary workflows. (Requests tagged with high priority undergo careful review before being approved to receive that designation.) During overload, PGKeeper admits requests in priority order, preserving the user experience as much as possible.

PGKeeper enforces this ordering through a self-adjusting mechanism known as _debt_, a feature of the [backpressure library](https://pkg.go.dev/github.com/bradenaw/backpressure) we adopted. Whenever a higher-priority request can’t immediately acquire a semaphore ticket, the system assigns debt to all lower-priority traffic tiers. That debt has to be paid: A request from a lower-priority tier can only acquire a token if there's enough capacity for both the request and the accumulated debt against its tier. Debt decays over time, and pays down faster when higher-priority traffic is succeeding. This dynamic approach ensures that higher-priority requests are favored during periods of overload, without permanently allocating capacity to any specific class of traffic.

In production, this approach proved effective during overload incidents. High-priority traffic stayed available while lower-priority requests were shed and mostly retried successfully, invisible to end users.

![A line chart showing availability over time for different traffic tiers, illustrating that higher-priority tiers maintain better availability during overload while lower tiers dip more significantly.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAC4jAAAuIwF4pT92AAACiklEQVR4nH2Sy08TQRzH+ceUh7A7pU3lINF4NiYUQunDpbsUTCSgYCGKwMUb73Dy5sGbF0NCqUQq7fZFH9vHbruF7rbb3Z2ZmtkqYCROPvkdvsnn95vfZHpkDsicrRa0i0FHirGdeaiYD/B+8NNLn3tB3Efg/baYD0Q9dJqxSUGHHLTLM0DmQI/MgWrQLoaelbcW8ruhzPab7M5Sfi+UI6wU9i0OVkmysyzsLUs7i/KHCfml05JZujr3UNyer0ePGkLmKpdsZHk1n1ALqZaQbhW7ZJpCWs0nlVxC4SPKp/X6/KjM0kSW5kbEw9VmOQsxNiHUdUPXNENrwnYTtVtQb0Fdg7pmttuGYRhypfVl63LhMZFrLC0EnYX9ULN0gTsYYwwRhiY0dMNoa4amkaq3Td0wTUhOvaIR+QmRqwEqHXCkt5eV4kUH4451cKeDMIYQmRYQIYgwIp0RuhRvySydnHYkt5YU4Ua+boGxVa8D/LdcY+ks58zuvlW7k/8H6iCEbl9b5ujK7Ej5IKQKaQRNDE30B0yANyCSwLr1YItdmaWrs87Sxxnx2+f6+XEjdqzEwmo8rMTCDQs1ftLkIyofUfhIIx65+v61fhiSXz3qTgYSN5yaG/3x+nl8ZSL7frK84ZE2veUNT27NnV1zlzY84qavuO5NvXPzq5OJkCs7/1SasZNPUueAyIKzqcEjV9+5e0BgKCkAqlZYZCiBocQAqLK2vJ86He87Ges9He9Leh5IAfr39xRZEJ0aCk/0X/gGayxJ/6XgH4q47ofH7p26ehNTt2SJsyX8tqiHKjDUnabMgRJDxd0DMXd/3D2Q8Q7eyFUOCAF7bnq4wt5tkgEBsgVZ5MVQiaFqVvgLpYiJC9qKmg4AAAAASUVORK5CYII=)![A line chart showing availability over time for different traffic tiers, illustrating that higher-priority tiers maintain better availability during overload while lower tiers dip more significantly.](https://cdn.sanity.io/images/599r6htc/regionalized/97ed7aaaac38b02fbf04ebdff741a118954d55d8-2160x1620.png?w=804&h=603&q=75&fit=max&auto=format)

During an overload incident, we observed that high priority traffic maintained high availability.

#### [V2: Multi-dimensional fair sharing](#v2-multi-dimensional-fair-sharing)

The priority-based semaphore worked well, but it left a gap. A single dominant workload could consume the majority of available concurrency within its priority tier and starve out traffic at the same level. An unexpectedly popular new feature, or a DDoS attack, could exhaust the high-priority budget before admission control rebalanced resources. While lower-priority traffic would still be shed first, unrelated workloads at the same priority would experience degradation.

Real traffic varies along multiple axes: authentication status, request source, client, user type, and so on. Under overload, we want capacity to be allocated proportionally across these categories, ensuring that no single workload can monopolize its tier.

So we built a weighted min-max fair share algorithm. Assuming there is a finite resource and multiple consumers demanding more than the available amount, fair sharing works by giving each consumer a baseline allocation. Consumers who don’t need their full share release the rest into a common pool, and consumers who need more than their share can draw from that pool, up to a limit. The result is that no one starves, and no one hogs the resource either.

![A four-panel illustration showing weighted resource allocation where three users (Foo, Bar, Baz) request different shares, and capacity is progressively distributed among them based on equal weights.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC6klEQVR4nB3Sf0/aeACA8b7Py/64Gbfl2GU3RE+dLiYuw2WeTHCozMXsLuPmWTfBKVSKwhVKUUDtYNCWjra09Hf7bb8o/rlsyZPPK3gQv1Zy6hWrQVl16qeVn1Fug4TtlD6I8npEtdeAt+aCmAuijht13ZgP/xrdLiBOlZApQj4j1VpFqhTFSnFwTirV0qBy6jY/SWKswa/y8oZubCjKa1le07R1VYlr6gqEC4hJFul8nikWVPKEw3a47H9mGVfxA+nwA7hIqnKk3g13+ku6sfCNC/FsyNaf6r1ZpT3hu1OIThZLmfwFXlAJrJPa7KQSzv9HxtGOuJvw6u/0wasKG6bFRc0IMV9+ZZt3XeOxyQXk+ji0gohVLl5lc0z+xCBw/vA9f5h0iGMN2xdTSXCRtNXlpjDfHTyxnIkef0/g73tO0JB+lzsPIAgifg3Typ+tasavYSaZNsk0rGFO5bNO7MPWzlBfNo1Z15m79udtc8Y2Z67hHLBnLX362p9DgLBtsls2swGYOOjE/fb6kEnA7vaw9+5G2vbFtya/YXEx0F0FbNRjo0M2CpkY5NZuhAQi6eHLrwt0LcCcj/Wo+0r5gXYeNLgl14hBPS7TaAPfuTxYbaeX+P3l/t6KgkYUNKIdbAJiDxHMpyQ9fXY23qrdaRG/cKd3lPPf5K9zirAIBhGpvldKodTuehN91Xz/kvl7Rfw33vtntZeM23gK0cGTKrt41Z3vS38wV3e5yzFbemywjxT6oS+GtauPVAa7wDLSaaq9v8l8ShgnKfUgKaFvnMIhYvqzVe45LT7TjEm2Nca2xlwjaPKBfmPcF57p9Ecym7/Eiypx3ElvMektp5TVM7sCuuUWjxBv+CcvT/f1GQAm5X5AlgIeCFnqo8G3h1AJuzTK5rLCac4q5UQMlTDULeW0HwvtukQOGd1Oef4EHE6Obqd8GPJhaDSagjDkeaEb88V1c88hjkE5D6mCQ+BOCYdUwS3nbSIHqcJ3NuNXaTfGs1sAAAAASUVORK5CYII=)![A four-panel illustration showing weighted resource allocation where three users (Foo, Bar, Baz) request different shares, and capacity is progressively distributed among them based on equal weights.](https://cdn.sanity.io/images/599r6htc/regionalized/fcd54d3ea343ab1f969193a2f57f004f0f1fff69-3264x2176.png?w=1080&h=720&q=75&fit=max&auto=format)

Recursively distributing the remaining resources across requests by weight until exhausted

In PGKeeper, the resource is database concurrency capacity and the consumers are categories of traffic. A category might be “authenticated traffic to the comments endpoint” or “unauthenticated traffic to the search endpoint.” Because traffic varies along multiple axes at once, we represent these categories as a tree, with each level corresponding to a different dimension. The diagram below shows a simplified two-level version: The top level splits by authentication status (with authenticated traffic weighted much more heavily, since it’s almost always more important), and the second level splits each of these by route.

Capacity is allocated from the root downward. At each node, the available concurrency is divided across child categories according to their weights. This process repeats recursively through the tree.

This hierarchical structure allows PGKeeper to enforce fairness simultaneously across multiple dimensions, preventing any single workload from monopolizing database capacity.

![A diagram showing a multi-dimensional fair-sharing tree that allocates capacity between authenticated and unauthenticated traffic and further splits it across routes based on weights.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC0ElEQVR4nH2T2U8aARCH+fNqpYUFkZpSFBOCIFrr0agV8UBEpHK4LLBcK1k5l2VZWE+KXCrxSI01FWtCjDVYj6QqHtinBvpiL5PvZZL58stkZmhA9P4BJQZRfBY4p/vPawKHEjwjCq6wAkd07DuTKP7eWYb2sGBGSs/xi2rvcZW7wPbstQVnW/EFti9f7T9jhq6AaOkxGYhUkrEzurdARz5xIJIDUXRkl+49YeCXTPLu0WTyDggU6n0bzf75Bou7+p2xqmOqbmipXrfNtXxheE7+8B/I1D2DKPI865qwnkh2T890DGrlsk5U/zYO9ma6BzK15hyDKALU/5KJK4F3GSKHox8kRKzFOjUCDuBw15K1Kz4iS/GgXUbo6h8yswKDKHI9O83TeAdqa3dZW8we8ehC00BCMpwRjm9yHHkGcQ1QP4DoLyoym7zlEBe8YEGMbrfZEkJ7ugZeoUMrVcbsE8PaU0MWMK3yrEuNSOyVf7uWOGaRl0DktixzwpdNWE7ui4FO1KfTkRq1QwfLwYjYlOZDab4xKQIXu4yoClRNTspUpvc9dkLq2uT7D9jhKxov+FUb8sXn+9aDb1YhZVJvX9DaMBCzmmMaPTGhJpAxyqdyhEd1UaUBV054VS67Zq4XznKD32h8LG+fs3zcEG+lXs+5ER+c9kJxnzmNWlYs2hlkiCL7k7PyRUq+QMniEdnMTH+MGEwr9Wt1/gLtJX40RmF4SoHHxm3ukB7O6i1ZA7ymhddUYHJ8bMk0sgwr0rAiaRlOw4qETZEyKZd7oC0udkqrCV+K8J3BaXLC4lJrvUo1PqoOKTVkH5hoRnaErn0xsi9x7jU7cxV2pchnCZKr9xyWZwaipReBY9k46ZTKUWGnS9iJCjuRpp7RgSkBmmeRNyzyml2BVaZY4ZpF3gDRUnlVddjpoIrwiLoxgdQvaPU3SKcb28dkDgF68PcnPTzPnz+xMWGXmaG+AAAAAElFTkSuQmCC)![A diagram showing a multi-dimensional fair-sharing tree that allocates capacity between authenticated and unauthenticated traffic and further splits it across routes based on weights.](https://cdn.sanity.io/images/599r6htc/regionalized/0b5daa462dc41e12385561ea3be3d1c39b832cea-2160x1620.png?w=1080&h=810&q=75&fit=max&auto=format)

Multi-dimensional Fair Sharing is implemented as a tree. When a node is saturated, capacity distributions flow down to its children for computation.

PGKeeper comprises both of the controllers we’ve discussed. Every request first passes through priority admission control, which uses the semaphore-with-debt mechanism to favor high-priority traffic when the database is under contention. If a request clears that, it then passes through the fair-sharing tree, which checks whether the request's category has room within its own allocation. A request only proceeds if both controllers admit it.

![A diagram of composite admission control where requests first pass through priority-based admission control and then through fair-share admission control.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAC4jAAAuIwF4pT92AAACvElEQVR4nHWT2U8TURTG+3/xaEwkITEmRB+IfwItpDAzLQoFkbKUKlLRAEGJmqioLKFBKLQFSotAVzpdprXtLJ12uk/bubP1wdQSBMXkezg3+X73fCfnXoXcQFqSZIQXII6DAIABD3MAAgCqcxAHLmoAIEGAL/1yA1FcVqIEs1V1Nqui0koq3Z2mlSTVTZDdVFqZyapoWklnlCyrlmT4BliSkVq9L5/vbfkyWVUi2YOG1BimpqjebFaVy/fU6n2SfFPnVnNegAEP8XwzP0lqvB6d16PDcS1bbWYWpT/mv+HLCKKoqdV0BG4MoTORyBhNDwAAN/5xXp0Z4QUNxz1i2Sf5/AxJfI5FnbGoE8c/5XLPqtVhnh8QRI0kN2+/BguipljSEcRUPDYfRr+Ego6gHwv6GDTAoOeRcNCGRT4mE69I0pDLjda5gRbfgmHAa1Mp45FzfcvqWrX4d+xx5xF5dkyf/aCPHIR5D1vZ9phtTofLEgkvlUpDV2AZFgQNTpo29p36tQT0NTVpJjYdWb+vHPCVNx0Z/Qbeu5IcXsdXD7HYz1WWHRYlWG5oFJKMAL6/XocT5OvFveOuN2j7QvDhh9iiPes/rwYC7LyF6FoO3VkIPliOmKxYOLlVKY/WuT5RQhSiBNfq6nIZwVLLL7bPOmZdbZMHd+d9zy2U219xe4tGc7zD5GqbsLe/PBn7jnmi9nxunK2qBRFqdubF/lptME6szO0FOhe9t+dO778Lz9oo73nRHyyadlOdS75bppN7b4N6S+oEdeYZI+BhSYabM0syDMAQQS+tu7f1VuvgrnXcvv/NcxDGnNHY8Zr78KnVrt2xj9gO358eBLC1QmGi9VouViWK2mpthCpMRHOGMGOIMgayOFUqG0oVA1kwRJhplDGGmelUwVCs6Dnw+Oqqfqt5hv+jlufal5IbyC/0dbgiuLNTFAAAAABJRU5ErkJggg==)![A diagram of composite admission control where requests first pass through priority-based admission control and then through fair-share admission control.](https://cdn.sanity.io/images/599r6htc/regionalized/0646e396186c33aedc10ebe749e8d2454ffa7557-1608x1206.png?w=804&h=603&q=75&fit=max&auto=format)

#### [Symbiotic client relationship](#symbiotic-client-relationship)

Admission control significantly improves system stability, but rejection alone cannot prevent overload at sufficiently high request rates. At some point, the only way to prevent sustained pressure is for clients to send less traffic.

PGKeeper returns informative error codes that indicate overload rejections, and provides an [AdaptiveThrottle](https://github.com/bradenaw/backpressure/blob/main/adaptive_throttle.go) package that clients can use to back off when encountering errors (paired with exponential backoff and retry strategies). Using this feedback loop, the server and its clients converge toward a stable request rate without any central coordination.

#### [Limitations](#limitations)

PGKeeper doesn’t eliminate every failure mode. Three classes of problems remain:

-   **Expensive queries**: Admission control primarily protects against excessive concurrency, not the cost of individual queries. A single poorly behaved query can still monopolize database resources. For example, an unexpected sequential scan on a large table or a poor query plan produced by the Postgres optimizer can consume significant CPU or I/O even when concurrency is low. We reduce the likelihood of this failure mode through an adjacent project, Guardrails, which flags inefficient queries at CI time so they never reach production.
-   **Skewed load distribution**: Per-instance load management only works if traffic is evenly distributed across PGKeeper pods, and load balancing is rarely perfect—uneven distribution leaves some pods under more pressure than others. Today we mitigate this by placing PGKeeper replicas behind an NLB and having clients establish multiple gRPC connections, which helps spread traffic more evenly across pods. A service mesh would give us stronger guarantees, and that’s where we’d like to go.
-   **Small connection pools**: Multi-dimensional fair sharing needs enough total concurrency to slice across categories. With a small connection pool, there just aren’t enough slices to go around. Fairness becomes coarse, and admission control has to fall back on simpler prioritization.

## [Safe rollout](#safe-rollout)

Migrating production traffic from PgBouncer to PGKeeper without any degradation in performance or reliability required a deliberate, incremental rollout strategy, and thorough disaster scenario tests.

### [Disaster readiness testing (DRT)](#disaster-readiness-testing-drt)

Before rolling out to production, we ran two kinds of disaster readiness tests.

1.  **Load testing:** We load-tested PGKeeper at 3× our peak production QPS to check its vertical scalability and measure how much latency the gRPC layer added on top of raw PgBouncer. The overhead was sub-millisecond—well within what we could afford for the gains in load management and observability we were getting in return.
2.  **Synthetic load generators:** We couldn't predict every traffic pattern PGKeeper would see in production, but we could replay the ones that had hurt us before. We built synthetic load generators from past incidents and ran them against PGKeeper, tuning parameters and refining the algorithm until the system held up under each one.

### [Rollout ordering](#rollout-ordering)

A bad rollout of PGKeeper could have taken down database availability for the entire platform, so we designed the deployment to bound the blast radius of any failure. We classified every database instance group by criticality and rolled them out in strict order, from lowest-risk to highest-risk groups.

We began with a single replica in each cluster, ranked by criticality. Starting with one replica was low-risk because DBProxy hedges replica requests; if the PGKeeper replica had problems, traffic would be served by the others still behind PgBouncer. From there, we gradually expanded to include all replicas. This methodical approach gave us a safe way to validate PGKeeper's behavior under live production traffic before moving to configurations with higher potential impact. Once all replicas were rolled out, we proceeded to non-critical primaries, and eventually, all primaries.

### [Automatic error detection](#automatic-error-detection)

Even with a careful rollout ordering, we needed a mechanism to detect problems and react faster than a human operator could. We implemented a sliding window error detector that continuously evaluated the error profile of recent traffic in the DBProxy layer. If the error rate exceeded a threshold for a sustained number of windows, DBProxy would automatically flip traffic back to PgBouncer. This mechanism proved its value early. During the first phases of rollout, the detector flipped the traffic back to PgBouncer a few times and helped us avoid availability issues.

Flipping all traffic back to PgBouncer at once means a sudden surge of new connections against PgBouncer, which could itself cause instability. But a brief period of unavailability during the switchback was preferable to an extended availability issue caused by a malfunctioning PGKeeper continuing to serve traffic.

## [From bouncer to keeper](#from-bouncer-to-keeper)

Since the full rollout, Figma's database SLO, measured against core user experience availability, has held at above 99.99%. In Q4 2025 alone, PGKeeper prevented more than 20 incidents that would otherwise have caused user-visible outages.

PGKeeper began as an effort to replace an aging connection pooler. It has since become a foundational component of Figma's database infrastructure, serving as the primary line of defense between our applications and PostgreSQL. Owning this layer comes with tradeoffs, including maintenance burden, on-call responsibility, and operational overhead, but the gains in reliability, observability, and control have made those tradeoffs worthwhile.

_We would like to thank Braden Walker for the inspiration and the powerful backpressure library that informed much of this work. We are also grateful to our partner teams, including Compute, Deploys, Traffic, Application Platform, DevEx, and Storage Products, for their collaboration and support throughout the design and rollout of PGKeeper._

_Finally, this work would not have been possible without the PGKeeper team: Gustavo Mezerhane, Bashar Al-Rawi, Tanay Lathia, Mehant Baid, Manish Jain, and Dylan Visher._