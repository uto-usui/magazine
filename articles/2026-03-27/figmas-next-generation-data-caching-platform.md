---
title: "Figma's next-generation data caching platform"
source: "https://www.figma.com/blog/figmas-next-generation-data-caching-platform/"
publishedDate: "2026-03-25"
category: "design"
feedName: "Figma Blog"
---

In recent years, Figma's growth has tested the scalability limits of our storage infrastructure. In 2024, we [rearchitected our durable metadata storage systems](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/)

; in 2025, we expanded our ambitions to include our ephemeral storage and caching layer, built on top of Redis.

We built FigCache: a stateless, RESP-wire-protocol proxy service that acts as a unified Redis data plane, complemented by a suite of first-party client libraries. FigCache decouples connection scalability on Redis from fleet capacity volatility in client services, centralizes traffic routing, uplevels our security posture, and delivers comprehensive, end-to-end observability across Figma's entire caching stack. Since its rollout for Figma's main API service in the second half of 2025, Figma's caching layer has achieved six nines of uptime—a new reliability milestone.

## [Growing pains in caching](#growing-pains-in-caching)

As our infrastructure footprint grew, Redis evolved from a simple, non-critical component into a critical-path dependency for site availability.

Before our rearchitecture, we had to contend with evolving structural challenges around operating a massive system at scale. Redis clusters faced growing connection volumes, slowly approaching hard limits. Rapid scale-ups of client services could trigger thundering herds of connection establishment that bottlenecked I/O and degraded availability.

Other operational challenges emerged as well. Without centralized traffic management and consistent access paradigms, applications could pollute or corrupt data across clusters. Observability features across disparate client libraries were inconsistent, making it difficult to diagnose and mitigate incidents quickly. A fragmented client ecosystem also prohibited our ability to make fleet-wide guarantees about client-side state correctness during failovers or topology changes.

Initially, we sought to remove Redis dependencies from the API subsystems supporting Figma's core functionalities. We also built localized, service-specific solutions, including a custom client-side connection pooling layer that amortized the cost of connecting to overloaded Redis clusters. While both initiatives were effective in isolating Redis outages from top-level site availability, we wanted to pursue a more strategic, longer term solution.

In response to these growing pains and [historical incidents](https://www.figma.com/blog/postmortem-service-disruptions-on-june-6-and-7-2022/)

, we sought to deliver a foundational, step-function evolution in our platform offering. We took this opportunity to rearchitect the caching stack from the ground up, and deliver a next-generation platform for internal customers.

## [Designing for longevity](#designing-for-longevity)

We sought to remedy all existing core deficiencies while operating on a multi-year time horizon to support the next phase of Figma's business growth. This materialized as a concrete set of design objectives:

-   **Isolate Redis from client connection volatility.** The connection volume served by Redis should be decoupled from the size and elasticity of client applications, and Redis should be isolated from thundering herds of new connections when client capacity scales up rapidly.
-   **Supply batteries-included observability features.** The platform should supply consistent, multi-layered, and granular observability features so that both service owners and platform operators can monitor the availability and performance of individual workloads in an inherently multitenant environment.

**Redis Cluster** is a Redis deployment mode that shards data across multiple nodes, enabling arbitrary horizontal scalability.

-   **Expose transparent and elastic horizontal scalability behind a simplified API.** Capacity elasticity of the underlying caching infrastructure should be transparent to clients. The complexity of correctly handling cluster topology changes—including scale-outs, scale-ins, node failovers, and total shard losses—should be managed at a layer below thick client libraries. For Redis, this meant abstracting away the mechanics of the [Redis Cluster protocol](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/).
-   **Abstract multiple backends and clusters behind a universal endpoint.** Figma's Redis footprint spans many clusters with varying degrees of isolation requirements, durability expectations, criticality characteristics, and traffic volumes. Traffic routing between applications and clusters should be mediated by a centralized source of truth, disambiguating cluster partitioning decisions among applications and removing application-level complexity in configuring multiple independent endpoints and clients.
-   **Support seamless pluggability of alternative backend storage systems.** The platform should accommodate changes in feature requirements from new workloads with minimal modifications to client applications. For example, the system should have the flexibility to provide opt-in true durability backed by an alternative storage technology, exposed behind the same protocol and API.
-   **Be extensible by default.** The system should abstract away custom, Figma-specific data plane logic across all applications, like inline data encryption, guardrail enforcement, traffic backpressuring, and more.

## [An opportunity for new foundational technologies](#an-opportunity-for-new-foundational-technologies)

In search of solutions, we determined a need for two key pieces of infrastructure.

The first was **a caching proxy service**, acting as a unified Redis data plane and ingress layer. This would offer applications a consistent, language-agnostic interface for accessing Redis, and hide the complexity of traffic routing and cluster management. It would act as a connection multiplexer, isolating connection scalability on Redis clusters from connections created by Redis clients. Additionally, it would implement a standardized, comprehensive observability system to provide consistent monitoring on all Redis traffic, for any connecting application.

The second was **first-party, cross-language, battle-tested client libraries**. These libraries would provide a Figma-wide baseline for supported client features, enable universally consistent and language-agnostic client-level observability, and guarantee use of vetted configuration parameters. To be minimally invasive to existing applications, we opted to build wrappers over existing, established open source Redis client libraries that were already in use in the codebase; this allowed us to forgo significant additional complexity in creating a proprietary protocol or adopting and migrating to a new client technology altogether.

We landed on a three-phase delivery strategy:

1.  Develop opinionated, first-party clients in core Figma server-side languages (Go, Ruby, and Typescript), and migrate all services to use these clients, without otherwise changing the endpoint(s) they connect to.
2.  Develop and productionize an internal Redis proxy service, and tackle all scalability, reliability, operability, and observability challenges at that layer.
3.  Facilitate a gradual but reversible migration of applications to the proxy service, with a carefully planned rollout sequence that trades off site availability risk and potential for reliability wins.

## [Why we built instead of bought](#why-we-built-instead-of-bought)

In many ways, Figma faced classic infrastructure problems, for which solutions exist in open source. We carefully evaluated build-versus-buy tradeoffs, and ultimately decided to build a proxy system in-house.

Existing solutions shipped with rudimentary RPC servers that were not capable of extracting full, annotated arguments from arbitrary inbound Redis commands. This limited our ability to build generic yet comprehensive runtime guardrails that operated on the rich _semantics_ of commands.

Similarly, this prevented us from defining and implementing custom commands that could be intercepted and executed by the proxy itself. We needed the flexibility to augment the Redis protocol to expose capabilities that would otherwise be duplicated among clients. This included, among other extensions, a language-agnostic, multi-cluster distributed locking abstraction over Redlock, and a protocol-native graceful connection draining mechanism to accommodate rapid continuous deployments.

Beyond protocol extensibility, we also had to contend with the realities of our fragmented client ecosystem. Existing applications connected to Redis with various permutations of Redis Cluster-awareness, TLS in-transit encryption, and other connection parameters. A proprietary proxy layer allowed us to build several shims in the RPC layer that transparently handled all these quirks—like a Redis Cluster mode emulation layer that exposed the proxy to cluster-aware clients as a fake cluster—making migrations significantly easier and less risky.

Finally, extending existing open source Redis proxies with custom business logic proved heavyweight and logistically brittle, requiring maintenance of a source code fork that would be difficult to keep in sync with upstream. We designed our proxy to be internally composable, making it straightforward to extend command processing and execution with proprietary logic. This enabled forward-looking optionality to build features like priority-aware traffic load control (QoS-based backpressuring), inline data encryption and compression, multi-upstream traffic mirroring, highly customizable command usage restrictions, and more.

## [FigCache, our in-house caching service and client ecosystem](#figcache-our-in-house-caching-service-and-client)

**RESP** refers to the [Redis Serialization Protocol](https://redis.io/docs/latest/develop/reference/protocol-spec/), a specification of the text-encoded wire format used for transacting structured data between Redis clients and servers.

To address our design objectives, we built FigCache: a stateless, RESP-wire-protocol proxy service backed by a fleet of Redis clusters on AWS ElastiCache, complemented by a suite of rich, first-party client libraries.

![Client requests flow through a load balancer to distributed FigCache nodes that interact with standalone and clustered Redis instances.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAABYlAAAWJQFJUiTwAAADBUlEQVR4nG2T609ScRjH+Y+4RLWWtXpRZpqVc5Zm2sUX2sW5iQKVeEEIZF6A4CgJbprlXbuzldbyUlMEQQ6cczg/zk1A0GkSF51iTSxzzu27Z8+bz57n932+P9bCb+igtv/VHen/NRATVlNoPWmpImclFC5johrWfoxK6J1xzWykxRXXOuJt38KmiXC7I9ZGbELMpp52ScnGArw4HdzLoPV3GVLxH/ZtQ56NZz2Bp0q8etCv7AuYhNjrUvcbtbd7cqUVj2rAuJi4m0bxedRxPl12hYHr/sJMEoZjWoW3NneuUgukHZQxz/4xZWosf3roFdEKrzQjYxVI/jnA5gAuF9y/RDtrk/A2xGzvwPaYpgqvzrZXGhnZl+XWZtBd5uivcXS9IXXzS03wWIWrKA05wXenHMUFV2m3lMUkdES8CUQayFjzzM8mESa55hB2+xXWX5B52TiyaBwNtllCavuiCp4Uo+JsJOsMkn0WyG9QuJzljaqQgMBJFs8zwvGFepHzcbZFYCBlr4NGGTFUjQ8bqc6vPrXNp3RPiEFFFpKWgqafImqu05iMha3Ww0SRA8mxYSVfiepHNtGVybIWtMZEmXLnzCenxm5OD3WizywLSuyLkCi6CPg8/BiP3DUMRFVuf7mTLHH5xJMBucj5OGum3EBIzcHWOrTn1uxwue1lj2cHRkYrsMJUjM1GuWz8QdIwOqEjYo0g0kDFWyxrzSJMkmMXvvArrGHofcjY7zeZFw0/guq5QIPrk8BTmIpx2CiP432YyTjrDnfbQMvfhdpV1IDc299Fd0yFNPBSo/uzgChMpXhcks9jSi8fcmeltzbXVqkBUhNlypszn/4+entmsJeAkneuRAvOezgcD48Ddtc+kLC+gEIFakYWlR+ChifIQO7s21Jb7yDd5l5Te8ZF7tsXYC4HPsLFSjPpvcl72YbjWmu0Bd3QouvQxKrhfcj4aem5IwKR6zrKJQWNBZ7idE9JBqG7Q+/P9n75dt+SgOgtiNnSLySSfVhNYjLCKiGsEgrs/Ko/7BpyslDzScwAAAAASUVORK5CYII=)![Client requests flow through a load balancer to distributed FigCache nodes that interact with standalone and clustered Redis instances.](https://cdn.sanity.io/images/599r6htc/regionalized/3454542f4fec4373a5f742e074b33029b2305c6b-1608x1206.png?w=804&h=603&q=75&fit=max&auto=format)

FigCache is a stateless, highly available, and horizontally scalable service that proxies connections to ElastiCache Redis clusters.

### [Decoupled proxy architecture](#decoupled-proxy-architecture)

We architected FigCache to be maximally flexible for plug-and-play extensibility. Key to this objective was out-of-the-box support for:

-   **Alternative frontends**, to expose FigCache capabilities to services without necessarily requiring a RESP or Redis client.
-   **Alternative storage backends**, to support durable Redis alternatives like AWS MemoryDB, or [Figma's in-house Postgres stack
    
    ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAADh0lEQVQ4jXWUaU8bVxSG/Yf6Da9gAzIEKFsUghtsSkhoI9KAwTZgMOCF8RjP3Lkzw+JQAgqLw5IqKZCqpKWJ0kqJuihVFalSpEotUv/IU2HoIlX58OrofjjvudI5z+sYlk7epSGzqlLHDA8Z3Y+q15HTA0wIL1HpZMRwk1MbWM20s5hrIKl5cFSazfPmv3X2rhjKKuLCiV0IcJRr51k2xHH2KvfyzUwaXkaFF0VpZWsuxFa+hbTmxVExkf/XsFnFHVlFUneyl/Pww0SAl9FmXsVCPMmEUIx6xgwfC1o7T0oDPLwbJiMDOGKGi1lRg6bVI7UgQgui6LUkhZdh00VKuNjLVfFl/D32B708Hx/gaTGKarUwJt3YWjOHdj/lhR6mDT+O9LyfjVwrx5luvstG+DHXx/O5EKVCkITpISk9mPk6xGwTC2ov394vcrIxh7rURtxwoykNPMpeY0e5zOy8B4eq1LI+0cT2aAuPE528SfXwR7qTx4qfKekmJn2kCx2oYpC13SlenKgc7A+TXWpgTLiRyiUeaf1siGtMzvtwpOfqmBlrJBqtIz3ZwDfzbZwW6vki7yEl3YyYHma1RmwZ4v5aH1vbEeTq+4zZPhLChVVooGz2oVlhhrUAjvFCEzezvVxVBpi5N8jLzxKcrtzisNjMtOllxHKTEj5kMchKsRlba6yc0Kh0ERMuzEKQXbULu9BJXKvBMaU2MVH4iKnNFA++N/jt5zJ/PlziwAhVfhi3fFiijePidV5pN3khPmRL7yAlqklIL5/aHXy12E9Zu8J0sRqHkvNTnm3j683bvP5J5ffXJd7uF9g3upmUHiYsPzsyzFs7xulqnDfrQxwuhJkz6kiYNVgrYQ7Lo2wvdzN9tpRp1c1qxs+ReZmTzRuclD/m81IYS1wiYXqZtLzsiSC/Lnfxy1qEo9IH3NXbSBsBYmY1GXmFzcVbrBudpIouHCOGkwndTUavQTFqmZO1zBg1FdyGLRdJ6WRbc/PMbmF3OcKiFcbUO0nLWuLSQ15pZC/bwwP1CrNa9QUpZ+hdoPZf3TGdjBsuSlqQBaOP23aM+HIMeylC1q4nIdwYmToO8n3smANMi+AFyxXUzpn+RxfhcLbNtF5PUu/iuujjE9lL1mwlaVWfn02ull09grl4g5F/Dd+VNuc1Kl2MGB6iwkdUeCspczZ0VDgpqAFK8x1ktXaG9Br+An8Yxg3O72TfAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/eb69f56265b7cda32a4b043d80147928a3a400ab-1608x1204.png?w=1608&h=1204&q=75&fit=crop&crop=focalpoint&auto=format)
    
    ### How Figma’s databases team lived to tell the scale
    
    Our nine month journey to horizontally shard Figma’s Postgres stack, and the key to unlocking (nearly) infinite scalability.
    
    
    
    ](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/).
-   **Composable inline request and response manipulation engines**, to support capabilities like read/write connection splitting, key pattern-based routing, internally parallelized scatter-gather execution, and more.

![System architecture diagram showing frontend RPC processing, backend filter and data engines, and Redis cache integrations.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAABYlAAAWJQFJUiTwAAADbElEQVR4nF3R/U8adwDH8fuTSqDTOtNpOju6ZLbVZelsGhVqa+++dxxPx0O6WeB4Oh4cUwsTZHZ2/aU/rJuYhaTKaGNnLPJwcPA9QOVBLIpgi7otzZYsdlmyLHn9+s7nhw9yAr99kwnUY97SC0/phWd/w9dM+WOhSa/1C1qjMVHUhFJ5l5RpcVxHEHdJckKpNFEUrdHSGg1ynAu+zvjria8rMaYaY/aTUwep2diic4FW+pW3goqbflLqI0amwfAMGPHJRv2kdE5xc1Z526MCyB/5B8e8/4C3vNpU1IuqJm9vcf5MyBE1jiYJcY7o4/C+NPgwgV1gwYUc0fePGPHxE/kQ8rb43W/5QLNgrJfR+jbWzFsOcwG4xCQNn+9inYeoqImebdwR7Y0LDzHRMf5eG5xtY6IqeH9FdgVp5+cOoK+WdW5nJjbZL6ucczfjZUPWl4brW1j3LtpRQzurd07VwbkG0bWHn9sHnUXwQVg2gJThFAedLGRYaE/nmdymi8u5ni+aFunxMPnpsuzqMjn4zkBEPhiRD66QAxFy4Gf5Zw+VEgTy7o0ta7xm4xquQttTPPKwFcfTJeMCrZ6TgyCJBhTAT6Lz2NjDcemD26Pzt0YXxiXz6Nh9EiB8wZ2s2tkDR+HEU/nrfuXPGe6VK7JkDBnUTwEewUAI4I+l0uUrV9fEl1bF4tWPxGviS9FP+h/fuIHAvCtRtqf2mfyRp/R2Zvv3KXbHGQ0Zfr2n2gRYFUNTGLZyfSh9/vyOSFgWnqoJhbCrK3z5MpKDznjJlqjb4ZvJwokHvnYnyvboomH9nqoKQB2ALAC/DA2x3d0VgaAsEFQEgsqZM9mOjnB/PwL5d8t7DN+ezB99lW254iX7s5Bh3aCu4HgdAA6A8PBwVCx+2dOT6O1N9vZu9PSsXrz4w7VrCJ93J8qny1zLxbVcbIOJbdmi/4lTOP4IRb1S6ezISFAiCUqlAYlkdmxsBscRCF2xomW9ZInv2OI120bVugbNKz8ZIgY1SxA5gngmk/mUSlqtNlOUhaJoijKqVEa12qLTnf6czTnT0JHhHWmeYSGTSNmXn9Dfm7QLCsUjhSKoUrk1GotOZ9XrrXq9WaejtVpaq7Xo9Ug7H2xBfwN+s5fx1tjpGjtdjk89/9E+Y9ab1CqzRmPT6Wz/lv/zN/1RGPVasxE9AAAAAElFTkSuQmCC)![System architecture diagram showing frontend RPC processing, backend filter and data engines, and Redis cache integrations.](https://cdn.sanity.io/images/599r6htc/regionalized/d1019cedf70d480c49b3fd54bf34de3326453d37-2160x1620.png?w=1080&h=810&q=75&fit=max&auto=format)

FigCache is internally partitioned into independent RPC and execution layers.

FigCache is built on a decoupled internal architecture that separates frontends and backends. The frontend layer encapsulates all client interaction, which includes the RESP-based RPC system, network I/O responsibilities, connection management, and protocol-aware structured command parsing. The backend layer encapsulates command processing and manipulation, connection multiplexing to storage backends, and physical command execution.

### [A native, drop-in replacement](#a-native-drop-in-replacement)

We designed FigCache to be a drop-in Redis replacement for applications, transparently handling responsibilities of connection pooling, traffic routing, and observability. In the simplest case, migrating an application to FigCache was as trivial as a one-line endpoint configuration change.

We also sought to push the complexity of connection management to FigCache, and isolate from Redis the cost of client-side connection establishment. This required carefully designing the RPC layer to make connections as cheap as possible, and building a connection pooling layer that multiplexes commands from orders of magnitude more client connections to a finite volume of outbound connections to Redis.

To meet these objectives, we developed ResPC (a portmanteau of RESP and RPC), a Go library providing an RPC framework for building servers over RESP. ResPC is the entry point into FigCache's core command processing and execution engine.

![Layered pipeline illustrating networking, I/O, parsing, and execution stages for processing RESP protocol commands.](data:image/png;base64,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)![Layered pipeline illustrating networking, I/O, parsing, and execution stages for processing RESP protocol commands.](https://cdn.sanity.io/images/599r6htc/regionalized/bb20bced5fef33d83ac0657857b7ff0499a5aa8f-1608x2144.png?w=804&h=1072&q=75&fit=max&auto=format)

ResPC derives structured, semantically rich RESP commands from a stream of raw bytes issued by Redis clients.

The ResPC framework is split into several independent components:

-   **Server layer:** Responsible for accepting connections from clients, managing in-memory client connection state, and efficient network I/O.
-   **Streaming RESP protocol parser:** Handles incremental parsing and serialization of RESP messages over the wire.
-   **Schema-driven structured command parser:** Derives semantically meaningful parameters from RESP commands, driven by a schema registry that declaratively expresses supported command sequences with annotated arguments.
-   **Command dispatch layer:** Performs implementation-agnostic command processing and execution. In FigCache, this is the layer that implements the core proxy logic, dispatching commands for execution against various upstream clusters.

### [Configuration-driven, dynamic engines](#configuration-driven-dynamic-engines)

FigCache's backend layer is modeled as a dynamically-assembled tree of engine nodes, each of which is a discrete unit of logic that accepts a structured ResPC command as input and produces a similarly structured ResPC reply. Leaf-level nodes are "data engines" responsible for executing commands against Redis; intermediate-level nodes are "filter engines" that route, block, or modify commands inline before passing execution to child engines. Conceptually, processing a command in FigCache is equivalent to executing this directed graph over the command, starting from the root.

Redis in cluster mode returns `CROSSSLOT` errors for multi-key operations, like pipelines and transactions, that span different hash slots. This implies that the operation may be cross-shard, and therefore is not guaranteed to be executed atomically (for transactions) or over a single physical connection (for pipelines).

For example, the _fanout_ filter engine intercepts eligible multi-shard [pipelines](https://redis.io/docs/latest/develop/using-commands/pipelining/) and internally executes them as a parallelized scatter-gather, dispatching many individual commands and aggregating the responses. This allows FigCache to transparently resolve read-only batch operations that would normally have surfaced to clients as a `CROSSSLOT` violation.

![FigCache decomposes requests into parallel operations across Redis cluster shards and reassembles results.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAABYlAAAWJQFJUiTwAAACnElEQVR4nJWS609ScRzGzz+kuJKlaTR9UXOZq6ym2VatohRMJ2otZ+Ey8TYhBA6DspyRs5RsrGDzhU4D5H47XM7tdw4XZYUphKAOsKasVlsvaHv2ffHdPntePB8o8gMuPOFdaWhtlMYFoZgwkpFBhZL7cHhPGvT3U0o26GukZu/R4aF/wfu/8ucnJw9uiIhpLllfRR1nEs212ELnXzCdk9vTysXEy+XkBLKroLNwKAuHcgcJZ2HqizAw2YzVschjR9FbNQFtxyGcL9mXeXYUiugMF9e1kbrx9Tn1pkoTV2kTU+ZtJb4rIeMizNSLDjShLWcxJRsQA1AoK6F2xkBqlEqLjHHFQ/oTy+8sQ5w1iP5yYLmBNNwGS4q1aVdCQqXEgBwiXnMwQROp6wpuiCAyOehf53mDrd5o7+K6mIdpyhEnw+FimM0lFgvD4WS5zU/IWVtcFtwSkQv3Qds5cLEa9F8hbY+hQOwRQt5wBxocRKuWHG5H1OUuC8NqZRj0jFVDkclcaTf0YW9tW1IQHfE/Z+OnK0AJA7t6KqBph4jEgC/S5gF3HFS3Foy2++bL3PZim73YaGSYTEVWe6XTxMffWbek1DchqulA2Wew2hNozyXc2AOFMhKQGsETg+jm8FJU/CCgPulcLbWamKufmRZDqd1S7dQ/xWasm+PUtpjEB/HJZrS/kfjIC8bGoPyk4RwcykhdSdmL4CTPp+Z45rkeNRd5z/F+6PbNvQlPeJMS8P0Z4eQTwus47zxQtdCh35IcrkVnYXdark8oVuLKlYTy4MaVhoQCScuDGZj+KsRUHKK+ClTkJekqTM+8YTERNtWC1bEI5hH0Zg2q4/2P2zsS4ODjY9ewzgv4q7sACAqG83xqnCIEpINPR0bCe7KfwyiSEZYIb8oAAAAASUVORK5CYII=)![FigCache decomposes requests into parallel operations across Redis cluster shards and reassembles results.](https://cdn.sanity.io/images/599r6htc/regionalized/21838680c75dc89ddc043b83b6da2212c552b5b7-1608x1206.png?w=804&h=603&q=75&fit=max&auto=format)

The fanout execution engine internally resolves certain cross-shard, read-only pipelines as parallelized scatter-gathers.

The entire engine tree is expressed in configuration, and assembled at runtime during server initialization. To accommodate the expression of complex, nested engine nodes, we developed a custom configuration system that models engine configuration as a [Starlark](https://bazel.build/rules/language) program, dynamically evaluated at runtime in a virtual machine, which renders a Protobuf-structured configuration definition consumed by FigCache's backend.

This enables operators to express complex runtime behaviors exclusively in configuration, without requiring heavyweight changes to core business logic in the server or deployments of updated server binaries. For example, command-type splitting, key-prefix–based routing and rejection, and proxying to distinct Redis clusters can be modeled as a composition of a few primitive engine building blocks. This is illustrated below in the configuration program and accompanying engine tree visualization.

![Routing diagram showing commands directed through routers to different Redis instances or rejected based on rules.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAIAAADzvTiPAAAACXBIWXMAABYlAAAWJQFJUiTwAAADoElEQVR4nI2UW2tcVRTH8+iDn0E/gWCaNpIG2lh6w4f6EGxCQRSMweKFSqKFtlIyQprSViztRMxgQWlsLtNoOg02dqxJJjOZzkzOnPuZc87ee621z4RcnVzwA8gMaXMhxNmPe/Hb/73+6793jdx3CUSbewYruMCQaFe1Zl8SJtzcbe23kNJ/z/hjlllUPaxy+6YaPZkO1aUutjy/+cD6ywceVAWTTHr5L3ORN1Kdr01/1jhz5XttxOJuUQZVKWvc+U6Nnkx+Uzv1RUv6+oD1jFWrLKUgnChkb6R+vBjvimQHFW7JnZ7tB0sZcBQ5LTE583veeM45R4BqYZISiTzPM03ddhzX8zjntE18P7gA9KdNP89CX4b/khPjOnN4dcok6ZlDn07NvTW28GZs8ejY/JUpyLjw/4YFUgLRgEpHnyy8+rD0SrT0+shix9+Q87C4P0xSEhEDGMnzD5+Ktx8HTY/le2MskvYdBuXai7b3ghEFZ57rZnR7NGMOZQtDOXckbSRV03FdxhhA+Yg9YCTyhTBcVzHNnK5rpukzJoRwHMdQFDud9lRVcL63sgUQ87w+xwlb1g+6PmqathCEyFWVR6N065aMRDCRIMZ2wyTlBGNf2/Y7lnXCst41jG5NyzGGhQIODCycP186fXqlubnY3Q3T00RUs8NhxNFC4QNdb1DVelU9oSg3NE0TQiiKCIWWmprWDhwo1dcH587xaBQRt+Cyw0I8taweRfkqn+9UlK5cLmaaPpFQFNbVVTxyZLG2dv7gQWhtZcPDBFCBg/Lkhe8XDEPR9WnDSDpO0nFSpmm6HpAEp8D7f4W2Nnn8OJ05w0MhkUjIzWsjkqbRo0fi/n13fNzTdayYxHzX91QBsyBmhTrJhvv9nh4WDsPk5JZhqChBX99Se/tyS8vcpUsiFgPPQ5ICVMTBoHi3OHc3CH7izhM3O8M0DYXYHBUi8lis2NZWOnx47dChpVOn4No1oShIhJiYX+gprbavrn20vNJBclCAg5UAvoAB2PAwnj27WFe3XFs719jIL18W2SxJApxaWPx2feP9jX9bS6ufS/kAwSnP82W2ywGIx0VHhzx2rNjQgM3NrDcMhkGbytfX1j9Z3/h45Z9OKYcQ3cpMtz0MtG0xOsqvXuUXLvDeXkilqPJjIOokH8ogLIM7MrhHNEW02e2OeILn+cmkG49zVSXEl0kHsHw/63oZzlWissN7wEQEAEII3CK37wNWjNoF/wcSliCXTPnWKwAAAABJRU5ErkJggg==)![Routing diagram showing commands directed through routers to different Redis instances or rejected based on rules.](https://cdn.sanity.io/images/599r6htc/regionalized/e45ae49f981d7a2e6f74a8a3ae241387cbda4f02-1608x2144.png?w=804&h=1072&q=75&fit=max&auto=format)

Starlark configuration programs materialize a command execution graph that can be modeled as a tree, whose nodes are individual engines.

Python

```
def main():
   """
   This configuration program expresses hierarchical evaluation
   of keys to conditionally serve or reject requests in two Redis
   clusters, foo and bar.
  
   It is modeled by composing two primitives--a Router, which
   splits execution among multiple child engines based on a match
   of the command schema or key pattern, and a Redis, which
   executes the command against a Redis cluster.

   GET commands are unconditionally served by redis-foo.
   SET commands are served by redis-bar, but only if its key
   starts with `bar:`; other keys are rejected with a static
   error message.
   """
   redis_foo = enginepb.Redis(...)
   redis_bar = enginepb.Redis(...)
  
   bar_router = enginepb.Router(
       rules = [
           enginepb.Rule(
               prefix = enginepb.Rule.Prefix(prefix = "bar:"),
               engine = redis_bar,
           ),
           enginepb.Rule(  # passthrough
               engine = enginepb.Static(
                   reply = respcpb.Reply(message = "rejected"),
               ),
           ),
       ],
   )
  
   cmd_router = enginepb.Router(
       rules = [
           enginepb.Rule(
               command = respcpb.Schema(name = "GET"),
               engine = redis_foo,
           ),
           enginepb.Rule(
               command = respcpb.Schema(name = "SET"),
               engine = bar_router,
           ),
       ],
   )
  
   return cmd_router
```

## [The big migration](#the-big-migration)

Our overarching migration design and strategy was directed by a number of important principles:

-   **Build correctness confidence early.** FigCache should be rigorously exercised in application integration tests _and_ in live environments with synthetic load generation.
-   **Minimize the code changes required of client applications.** Adopting the new system should be as low-friction as possible. We incurred some upfront engineering cost to migrate all Figma applications to use first-party FigCache client wrappers; however, this was a much lighter lift since we maintained interface compatibility with existing open source clients.
-   **Provide granular switches to roll over traffic gradually.** Services should be opted in to use FigCache on a case-by-case basis. Additionally, for large workloads, like Figma's main API service, traffic should be incrementally shifted across multiple, independent domains—an all-or-nothing approach was unacceptable.
-   **Ensure changes are reversible at runtime with appropriate feature flags.** In an emergency, we need the ability to quickly revert live traffic, without requiring code changes or binary deployments.

Beyond these goals, we knew we also needed to derisk the potential impact of performance regressions. Introducing a proxy tier necessarily adds latency due to additional critical-path network hops and layers of I/O. We knew this could be a show-stopping blocker, and came up with a few strategies to understand and optimize performance.

First, we ran extensive performance evaluations with a suite of open source and internal Redis benchmark tools. Notably, this included installation of a distributed stress test that runs weekly, on production, surging throughput to an order of magnitude higher than Figma's typical organic peak. This served as an automated, ongoing validation of our system's end-to-end production capacity under excessive load.

To control latency effects through the network path, we deployed routing-level configuration to probabilistically prefer zonal traffic colocation across client services, FigCache load balancers, and FigCache service instances themselves. The latency penalty of a network hop between AWS availability zones can be as much as a few milliseconds—this optimization makes this penalty much more stable and predictable.

We also built development-time performance assessment tools to support a real-time feedback loop for analyzing the potential performance penalties of code changes. On every pull request, our continuous integration system automatically produces CPU and memory profiles for tests of critical hot code paths, and hermetically exercises synthetic benchmarks against the server, ensuring there are no significant regressions against a golden performance baseline.

## [What we unlocked](#what-we-unlocked)

In 2025, we delivered FigCache for multiple critical Figma services with no disruption to availability or functionality, which provided confidence it accomplished all of our core design objectives.

### [Infrastructure scalability](#infrastructure-scalability)

FigCache foundationally solves connection scalability challenges. This has in turn unlocked the ability to rapidly scale Figma's API fleet in response to user traffic, without adverse impact on the underlying infrastructure. As a connection pooling layer, FigCache has also alleviated absolute connection pressure on our most critical Redis clusters, derisking many years of continued capacity growth.

![Line chart showing Redis server-side connection counts dropping sharply after July and stabilizing at lower levels.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAACA0lEQVR4nIXO3U/aUADG4f7/d0N7Ti2btJQPQVlC0CUbZIhzA6GDopzT0wIDOYVSWmiLfGpkiyyLxAuWPBfvzS95mZGH6a9iD132GgWKCkP9++Re9ujP/Vyz5vmEcSa3Dsm6tbSnpL1aelrPzBoX88anvS6metazZMZ2q1Yr7SBpgqUJ2sKvfFWaE2muvRH222fu6JqhrlxtnxYxXyL8DQmWVP5G5Utq8Afmy4TXu7w15G3rjSNrFBl5l4zmypnmSQSBGIExAqMqiKhQUjkBwTiB10PYXcD+ChrrHStgLMLmMs/gsZxqJj6oUNSBqIFjDb4nHK9yHIaCDgsO7DzB/gYav3dsgPEUHq7zDBpXUq1kSOMkjZU0VtC5lxhDDkFBgwV7b4zHcqqVFHbiIOGO/sb6/2I0lj+2EiGVEzUgajBE/t1GnKBzV/tj4srnnXhEY6MtEG0CST8M66yog2MCIk1wNWLbj4A+A7p51Xtm6aNorvNMd1opDmK53kHOCORoIEsDOfouSwNfeoHPvcC34UHdO8QPLJ5tbQeasWQq3s++MtZSaU8yxIkTJ67aMdWJISeOnZeB7bhinVStRG2UrDtnip2sWQnFTirOacPJdPwiM17jwUPZ8MuGL1Ov0vUqTU/ueBXqV/q+PJgp5uLWXNxZy4a5uBvM6+bibrhsWEtkr7Q/vpRtdLryC10AAAAASUVORK5CYII=)![Line chart showing Redis server-side connection counts dropping sharply after July and stabilizing at lower levels.](https://cdn.sanity.io/images/599r6htc/regionalized/2e5b439675d3aee728f1a593c62f8c293067bee3-3264x2176.png?w=1080&h=720&q=75&fit=max&auto=format)

Following the rollout for 100% of Redis traffic originating from Figma's main API service, connection counts on Redis clusters dropped by an order of magnitude across the board, and became significantly less volatile despite an unchanged, diurnal site traffic pattern.

### [Step-function improvements to reliability](#step-function-improvements-to-reliability)

Connection pooling in FigCache eliminated an entire class of reliability risks around thundering herds of new connections from clients, a theme that materialized across many high-severity incidents. Additionally, standardizing on FigCache as a universal Redis access tier simplifies the platform guarantee of correctness in handling ElastiCache operational events. Node failovers, cluster scaling activities, and transient connectivity errors are now zero-downtime events.

### [Comprehensive observability](#comprehensive-observability)

The entire caching stack is now instrumented end-to-end with metrics, logs, and traces. Out-of-the-box automatic measurement of the availability, throughput, latency, payload size, command cardinality, and connection distribution characteristics of all Redis traffic has reduced the time to diagnose incidents and performance regressions from hours or days to minutes.

Additionally, FigCache's routing-layer traffic classification engine now ascribes rich ownership metadata to all inbound Redis commands. This has allowed us to slice core operational metrics across hundreds of unique application workloads by tier, durability expectations, consistency requirements, and more.

More broadly, this work enabled us to formally define a caching platform SLO and precisely quantify the aggregate reliability profile of Redis at Figma.

### [Minimal-overhead infrastructure operability](#minimal-overhead-infrastructure-operability)

Historically, operations like hardware rotations, cluster topology modifications, OS upgrades, and security updates required expensive cross-team coordination and, in rare cases, scheduling of site downtime. Pushing down this responsibility to FigCache has downgraded these events from high-severity incidents to routine, zero-downtime background operations. In particular, shard failovers now require zero operator intervention, and are executed liberally and frequently across our entire Redis footprint—partially to serve as a regular, production-environment live exercise of the system's built-in resiliency to Redis topology volatility.

[![Abstract composition of colorful geometric shapes surrounding a cloud-like form connected to a vertical panel of stylized numbers.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nG2U3VMaZxTGvQVMW5sJTW3SmjZX2pnEDCKShBiLTigqGCEq7LLALq4rIF8LAnGBgF9V22nSJpl+zTTepdPkrpf9234dMFo0Xjzzvu+Z9zzznDPnOT1mYYRjmNpn2IZJsJ3EOgifeZ/NEf5Hz/Hlg9AIVnGUftnJgHiPIWmGYTXADXWG6/EpLkbuYhHsJ4kWYZReYQxL2IG5K35CaF1wcVNcxKWl8Ed0dPUH9uq/8aT2PfFchVvLQfoiY5jfqbdK4wwm/HwV9/KhePt9wv5HAVxzTwn6/iTn/4PDxF/8W/ubN81D9h8/ZTGjcS02gaXz386g6iVaUZnJSnwiTWAKdxOKY/SH4kxMvyR+26DhyvLav8U/6havSk0Oqg0KxSyTq0Guxe7zUcSJLe2jupchZizzWcyNKXxUdo9ZdPCx5mGwtIonV0eWBBpLEr8vNHmh1GjpBVqVEs1ymbyeYz4lMSh7cObnaTzXUXeSXJUnOwrb6nvMESdXSvOM/5LA/2ucpe0ghR2dg9LPFLUqoXSMtJ6kXmzyOPuczNounhWFKV2i+bKMtpfm825Ck+jgUsrN8P4sD148ZOEgQPKnLMbmFkJa486yj9BalFJ2l7z6lszKIUFtnZmCxpNnFdTtdwpDxwrbIyCOMqC5mDYCaDsK+mYSwyiyqqd4lImS1JMYpW6FCdw5kY39PHJd5cqpHnYGd4SByDiBxCK6qlBf1Wis65QbBnprg8pmnUqzQaZaJLAWPeph7iG1H/MstzSuxo9KPjU2l6V7OMRvCfoesOb3kVNkMnqB9VqF8u4myndN7lcUvlTc9IlO7Nk56s+KqNup90tuo1e0Y10a5WvvMJPuEQI+L3IggK5E0Y0yc60qA3oYS9SJOWxnSJtGriXxF2UuR8/OYQc2LGEbF4O3+GLexo2wm3HRx6y2hHdD46ahcikzi0VydFrUdspQws/1+PT5TunGBcFOX+wOVuUb+lem+DTloU+b4oJ8F7N41Py2r9te7hUcpzx+LuHxFjGJ9lPb5OxmOQ//AbnaPvLaxzpaAAAAAElFTkSuQmCC)![Abstract composition of colorful geometric shapes surrounding a cloud-like form connected to a vertical panel of stylized numbers.](https://cdn.sanity.io/images/599r6htc/regionalized/e85478d82728490083efe8027723e309ed0cb3fd-2048x1536.png?w=2048&h=1536&q=75&fit=max&auto=format)](https://www.figma.com/careers/)

_This work is the product of countless contributions by the Storage Products team in collaboration with many other engineers across Figma Infrastructure. It was made possible by Justin Palpant, Indy Prentice, Pratik Agarwal, and Yichao Zhao, with additional contributions by Devang Sampat, Mehant Baid, Alex Sosa, Ankita Shankar, Anna Saplitski, Can Berk Guder, Jim Myers, Lihao He, Manish Jain, and Ping-Min Lin._