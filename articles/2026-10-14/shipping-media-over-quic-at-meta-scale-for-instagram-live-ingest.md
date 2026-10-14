---
title: "Shipping Media Over QUIC at Meta Scale for Instagram Live Ingest"
source: "https://engineering.fb.com/2026/10/12/video-engineering/shipping-media-over-quic-at-meta-scale-for-instagram-live-ingest/"
publishedDate: "2026-10-12"
category: "engineering"
feedName: "Meta Engineering"
---

-   Meta has begun deploying Media over QUIC (MoQ), an emerging open protocol for real-time video streaming at scale.
-   MoQ will help simplify our protocol stack for live streaming video and enhance overall user experience for live video.
-   We’re sharing how we shipped MoQ on Instagram Live ingest, and what the future looks like from here.
-   This work was also presented at [DEMOQED 2026](https://moqalliance.org/demoqed-2026/).

Instagram Live now uses the open standard transport protocol [Media over QUIC (MoQ)](https://datatracker.ietf.org/group/moq/about/) for live video ingest on iOS and Android. As a transport designed for both ingest and playback, MoQ gives us the foundation to build toward an architecture that is lower-latency, more resilient on unreliable networks, and more responsive for creators and viewers. It also gives teams across Meta a common foundation for bringing those improvements to future live and interactive experiences without rebuilding them on separate protocol stacks.

## MoQ: A Media Protocol for Every Moment in Time

The internet has accumulated a rich set of media protocols, each shaped by the problem in front of it. RTMP for ingestion. HLS and DASH for playback. WebRTC for real-time calls. [RUSH](https://datatracker.ietf.org/doc/draft-kpugin-rush/) for the cases that did not fit neatly into any of those. Each was a strong answer for its moment, and together they’ve carried the industry a long way. At Meta, someone who starts a live stream and then makes a voice call on the same app touches three different protocol stacks, each with its own serving infrastructure, monitoring, and operational expertise. 

That separation made sense when these experiences were distinct. But as live video, real-time AI, and generative AI creation tools increasingly share the same product surface, the lines between these use cases are starting to blur. A common protocol across ingest, delivery, and playback can reduce the number of custom transports and operating models that engineering teams need to maintain and improve over time. 

## How MoQ Works

MoQ is an emerging IETF standard that enables low-latency, scalable media delivery (live streaming, real-time communication) over the QUIC transport layer. It’s being developed collaboratively at the IETF, with active participation from Meta, Google, Akamai, Cisco, Cloudflare, and academia.

For nearly a decade, Meta’s live streaming video has run on Reliable Ultra-low-latency Streaming over HTTP (RUSH), an in-house QUIC-based protocol built to move past RTMP. RUSH proved that QUIC could carry live media at scale and was a predecessor to MoQ. The lessons learned from running RUSH in production are part of what shaped our bet on MoQ.

The core abstraction in MoQ is a **Track**, an addressable stream of media objects that publishers push and subscribers receive through a network of relays. Relays cache and forward objects without parsing the media payload – they only need to understand the MoQ framing and delivery metadata.

A few properties matter for using MoQ as a single transport across the full latency spectrum:

-   **Built on QUIC:** QUIC lets independent streams make progress without TCP-style cross-stream head-of-line blocking. It also supports faster connection setup and connection migration. [Meta’s earlier QUIC rollout](https://engineering.fb.com/2020/10/21/networking-traffic/how-facebook-is-bringing-quic-to-billions/) achieved lower request errors, tail latency, and video stalls than HTTP/2. MoQ applies the same transport foundation to live and real-time media. MoQ would also automatically benefit from any feature added to QUIC (e.g., FEC). 
-   **Native Fan-out and caching:** MoQ relays are built-in caching and request/stream coalescing endpoints, so media streams scale through CDN relays out of the box. Request coalescing, caching, and fan-out are not new (live streaming already does them), but MoQ makes them part of the protocol design rather than a bolt-on, and it is designed to scale via relays more efficiently than traditional HTTP streaming.
-   **Tunable Latency per use case:** Two subscribers to the same track can run at different latencies at the same time — e.g., ~100 ms for an interactive participant and several seconds for an archival or buffered service — based on tunable per-subscription delivery properties.
-   **Track-aware delivery:** Relays can drop, prioritize, or replay objects based on metadata, giving better congestion behavior under loss than byte-stream protocols.
-   **First-class media context:** Tracks and their quality variants are modeled in the protocol itself, so adaptive bitrate logic is built directly on native MoQ constructs rather than reconstructed at higher layers.
-   **Standards-based TCP fallback:** When QUIC is blocked, MoQ can fall back to TCP through a standardized mapping (e.g., WebTransport over HTTP/2, or the emerging QMUX mapping), so a blocked network doesn’t force the ecosystem back into multiple parallel transports.

![](https://engineering.fb.com/wp-content/uploads/2026/10/MoQ-Instagram-Live-Meta-e1791568958445.png)

MoQ delivers low latency at high scale, while also satisfying the full spectrum of use cases.

## First Deployment at Scale: Instagram Live

Of all the surfaces MoQ can serve at Meta, we chose to ship live video ingest first for three reasons:

**Instagram Live is our largest-scale test:** Instagram Live serves users at Meta scale. Proving MoQ at this scale clears the bar for the most demanding ingest workloads, and is complementary to the low-latency properties that matter for real-time use cases.

**RUSH was falling behind the open ecosystem:** Live ingest had been running on RUSH, Meta’s pragmatic QUIC-based answer to RTMP. RUSH was stable and performant at scale for nearly a decade, but the move to MoQ shifts development from a protocol operated primarily by Meta to a shared standards effort. Multiple implementers can contribute experience, test interoperability, and improve the specification instead of Meta evolving the transport largely on its own. 

**Metric parity is a prerequisite for everything else:** Proving MoQ can operate at Meta scale for its largest live surface without regression gives us a clean baseline from which to explore, including live playback among others.

## Rolling out MoQ on Instagram Live

Replacing the live ingest protocol on Instagram Live meant changing the foundation under every broadcast on the service. We had to do it without regressions visible to creators or viewers, and without coupling the wire-format change to a rewrite of every downstream system.

Replacing a transport protocol in a live production system is hard for reasons that have little to do with the protocol itself — broadcaster apps need to learn it, the backend pipeline expects the old framing, the rollout has to be reversible in seconds, and a non-trivial slice of networks can’t carry the new transport at all. 

We tackled these as three constrained problems:

**Client integration across four apps:** A MoQ publisher built on [moxygen](https://github.com/facebookexperimental/moxygen), Meta’s open-source MoQ library, integrated in our apps. moxygen provides publisher, subscriber, and relay roles, integrates with our QUIC stack ([mvfst](https://github.com/facebook/mvfst)), and exposes hooks for custom media handlers. A single config parameter chooses MoQ or RUSH for a given broadcast.

**Translation at the edge instead of rewriting the backend.** MoQ ingest connections terminate on dedicated edge endpoints, where a translation layer converts MoQ frames to the RUSH format the existing backend already understands. Nothing downstream changes while we swap the client transport. The translator is temporary scaffolding; once MoQ is the only ingest path, the backend will consume MoQ natively and the shim goes away.

**Server-side routing for fast ramps.** Stream URL generation routes experiment-eligible broadcasts to MoQ-capable endpoints based on experiment-group membership, so phased rollout doesn’t depend on app-version adoption and the experiment can be resized in minutes.

## Operational Hurdles

-   **Evolving Specifications:** As an active IETF standard, the MoQ draft continued to evolve while we built. We pinned to specific draft versions, kept compatibility shims around for older clients, and contributed improvements back to the IETF working group.
-   **Firewalls:** UDP/443 is still blocked or rate-limited on a non-trivial slice of enterprise and carrier networks. We pick the transport (TCP or QUIC) at the start of the live stream based on which handshake wins, and go with that for the session.
-   **Debugging:** QUIC’s encryption hides framing from middleboxes, and from our own packet captures. We built MoQ-aware tracing into the edge so we could see object-level events without decrypting the wire.

## The Outcome

After months of experimentation on Instagram iOS and Android, we launched MoQ for Instagram Live ingest. The MoQ path matched RUSH across the streaming-quality indicators and reliability measures used for the rollout.

Achieving parity was the target for this phase, and it showed that we could replace a production transport without disrupting creators or viewers. It also gives the next phase a production-tested transport, rollout controls, and observability.

This now becomes the foundation to extend MoQ to an end-to-end architecture for live video delivery and playback. In that target architecture, media can be pushed as it is produced, and partial reliability can let the player skip stale video after loss instead of allowing delay to accumulate. Adaptive bitrate work can trade resolution for continuity as bandwidth changes. We believe these capabilities will form the basis of the next-generation live video architecture for richer, more responsive experiences for creators and viewers.

## What’s Next: Other Explorations Within Meta

Instagram Live is the first MoQ workload at Meta. Reaching parity at Instagram Live scale gives us a clean baseline to ask where else a single QUIC-based transport could collapse a set of special-case stacks into one. The directions below are areas we’re exploring:

**Finishing the Live Ingest Story:** The next logical steps build on top of what we’ve done — extending MoQ across the rest of Meta’s apps using MoQ-native constructs like subgroups to carry audio, video, and metadata on independent streams for better resilience under loss, and adding a standards-based TCP fallback (QMUX). Today, we lean on RUSH’s existing TCP fallback as an expediency for QUIC-blocked networks; standardizing on QMUX removes that dependency so a blocked network no longer forces a second protocol, eventually opening the door to retire RUSH.

**Real-time Interactive AI:** Conversational and real-time AI surfaces move architectures toward continuous human-to-server communication. A single low-latency, bidirectional transport that carries signaling and media together is a natural fit. Meeting the latency, loss-recovery, and media quality requirements that real-time communication demands is an area we are actively exploring. 

Shipping MoQ for Instagram Live makes this one of the largest application usages of MoQ we are aware of in the industry, both by the number of ingest streams and total volume. An open IETF-standard transport is now carrying media at Meta’s scale, and the future it unlocks is exciting. 

## Learn More About Meta’s MoQ Deployment

Interested in learning more? Check out the [MoQ Transport IETF draft](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/) and our [moxygen open-source library](https://github.com/facebookexperimental/moxygen).