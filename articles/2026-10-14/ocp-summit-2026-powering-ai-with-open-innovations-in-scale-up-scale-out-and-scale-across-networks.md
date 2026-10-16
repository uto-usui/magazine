---
title: "OCP Summit 2026: Powering AI with Open Innovations in Scale-Up, Scale-Out, and Scale-Across Networks"
source: "https://engineering.fb.com/2026/10/12/open-source/ocp-summit-2026-powering-ai-with-open-innovations-in-scale-up-scale-out-and-scale-across-networks/"
publishedDate: "2026-10-12"
category: "engineering"
feedName: "Meta Engineering"
---

-   At the 2026 Open Compute Project Global Summit, Meta is sharing the next generation of open networking infrastructure, including: 
    -   Our first liquid-cooled network rack (IcePack), and 102.4T switch platform (IceCube).
    -   Flattened Planar Fabric (FPF), a multiplane backend scale-out fabric that fundamentally changes how GPUs connect to the network
    -   MetaRoCE, our open-source AI transport protocol.
    -   Launching the Open Switch Platform Architecture (OSPA) initiative within OCP.
-   We’re inviting engineers, silicon vendors, system integrators, and operators to join us and the OCP community in meeting the challenges of building open, efficient, and sustainable AI infrastructure.

At Meta, we believe that open networking is critical for building high-performance, scalable, and sustainable infrastructure, and we’ve acted on that conviction since co-founding the Open Compute Project (OCP) in 2011. 

Throughout the ongoing AI revolution, Meta has pushed the boundaries of what’s possible in data center networking and shared our advances with the industry. At OCP 2025, [we introduced](https://engineering.fb.com/2025/10/13/data-infrastructure/ocp-summit-2025-the-open-future-of-networking-hardware-for-ai/) our latest AI scale-out fabrics and drove the creation of the [Ethernet for Scale-Up Networking (ESUN)](https://www.opencompute.org/news/introducing-esun-advancing-ethernet-for-scale-up-ai-infrastructure-at-ocp/) initiative.

This year at OCP 2026, we’re sharing the networking innovations that directly support our latest AI workloads such as Meta’s [Muse Wonder](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/) and [Muse Spark](https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2) models, and [Muse, our personal AI agent built for everyone](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/). Here’s some of what’s new:  

-   **The 102.4T scale-out switch**: Meta’s first liquid-cooled network rack (IcePack) and 102.4T switch blades (IceCube), designed to support high power density, deliver higher thermal efficiency, and enable gigawatt-scale AI clusters.
-   **The scale-out Flattened Planar Fabric (FPF)**: Meta’s multiplane fabric, enabling larger, highly efficient GPU clusters with lower latency — with learnings shared with our cloud partners.
-   **Scale-across for multi-site clusters**: Meta’s [petabit-scale backend aggregation (BAG) super-spine](https://engineering.fb.com/2026/02/09/data-center-engineering/building-prometheus-how-backend-aggregation-enables-gigawatt-scale-ai-clusters/) and how large-scale training jobs deal with failures at this scale — with an overview of how we’ve built SRv6 regional backbones using FBOSS and SAI to handle even longer distances
-   **Ethernet for Scale-Up Networking:** Meta’s MTIA 300 system uses Tahan, an Ethernet-based 51.2T scale-up switch, delivering 6.4 Tbps per accelerator — with a preview of next-gen 72-accelerator-per-rack design on 102.4T silicon and moving toward an ESUN-based implementation with future chips.
-   **Open Switch Platform Architecture (OSPA)**: a new OCP initiative, co-led by Meta, Microsoft, and Alibaba, that standardizes the switch platform layer — with specification v1.0 now submitted to OCP.
-   [**MetaRoCE**](https://engineering.fb.com/2026/08/24/networking-traffic/metaroce-rdma-transport-ai-ethernet/): Meta’s RDMA transport protocol for AI networks — now with open-source implementations.

## The 102.4T Generation: Liquid-Cooled Networking at AI Scale

As AI clusters grow to gigawatt scale, network switches must deliver dramatically more bandwidth while fitting within increasingly dense power and cooling envelopes. Our answer is the **IcePack** rack, Meta’s first-generation liquid-cooled network rack.

IcePack is based on [OCP’s ORV3-HPRv1 rack standard](https://www.opencompute.org/documents/open-rack-base-specification-version-3-pdf/). **IceCube** switch blades — 102.4-Tbps fabric switches that deliver 128×800G non-blocking switching capacity — sit inside each rack. IceCube comes in **two variants**, one built on Broadcom’s **Tomahawk6C** switch ASIC and one on NVIDIA **Spectrum-6** Switch ASIC. Both run Meta’s open-source [**FBOSS**](https://engineering.fb.com/2018/09/04/data-infrastructure/research-in-brief-building-switch-software-at-scale-and-in-the-open/) network operating system that leverages OCP SAI (Switch Abstraction Interface). 

This new generation represents a 2x bandwidth increase over our 51.2T platforms while achieving the thermal density required for next-generation AI data centers.

![](https://engineering.fb.com/wp-content/uploads/2026/10/Meta-OCP-2026-IcePack-Rack-e1791838724959.png)

The IcePack rack — Meta’s first liquid-cooled network rack, populated with IceCube 102T switch blades.

![](https://engineering.fb.com/wp-content/uploads/2026/10/Meta-OCP-2026-IceCube.jpg)

IceCube — Meta’s 102.4 Tbps liquid-cooled switch blade, delivering 128×800G non-blocking capacity and running FBOSS.

## Scaling AI Fabrics From Building to Region

[As seen at Meta and across the industry, AI clusters now span buildings, campuses, and multiple regions](https://engineering.fb.com/2025/09/29/data-infrastructure/metas-infrastructure-evolution-and-the-advent-of-ai/). This demands fabric architectures that are not only massive in scale but also resilient and flexible.

### Flattened Planar Fabric (FPF): More Resilient, Larger Clusters

We’re introducing **Flattened Planar Fabric (FPF)**, Meta’s multiplane backend scale-out fabric that fundamentally changes how GPUs connect to the network and the network control plane of the fabric.

With FPF, each GPU connects via **eight independent 100G links to eight different switches (one per network plane)**. This multiplane approach replaces the traditional single-plane uplink architecture and delivers four key advantages:

-   **Larger non-blocking GPU clusters** compared to single-plane topologies, which enables the scale required for our largest AI training workloads
-   **A flattened topology**, moving from the 3-tier Clos fabric of our NSF fabric to a 2-tier Clos fabric. Removing this tier of switches reduces network hops, latency, and infrastructure cost.
-   **NIC-level hardware load balancing:** Load balancing, traditionally done by network switches, now starts at the NIC, which sprays every packet across all eight planes in hardware.
-   **A combined control plane for fault tolerance:** The control plane of FPF includes both the switches and the hosts, allowing the host to steer traffic away from downed planes. 

Meta collaborated closely with NVIDIA on developing FPF running inside Meta’s infrastructure, leveraging NVIDIA Spectrum-X Multiplane innovations to ensure FPF has high performance even under assorted failure conditions and operational lifecycle scenarios. Going beyond our own infrastructure, Meta and NVIDIA have been working closely with our joint cloud partners to help standardize multiplane fabrics implementations within those partners based on our FPF learnings.

### Bridging On-Prem Data Centers and Public Cloud

This work with cloud providers on FPF is just one example of how we at Meta are not just building our own infrastructure, but are helping our partners’ infrastructure. 

Our ambitions for scaling our AI capacity cannot be met by building data centers alone, because construction runs on multi-year lead times while demand moves in months. So we use leased facilities and **public cloud capacity**, alongside our own campuses, to close the gap. But it only works if the network behaves the same way no matter where the GPUs sit.

That is genuinely difficult, because **cloud networking is not the same as owning the rack**. Fabric topologies differ from provider to provider rather than following one uniform design. Buffering is often shallower, which changes congestion and loss behavior. RDMA transports are provider-specific, and some clouds still run InfiniBand rather than Ethernet and RoCE. What works for a handful of cloud instances also tends to break at fleet scale.

At OCP we’re sharing how we’re converging these environments into a single operational model. That includes a **standardized performance validation framework** — cloud partners run a common suite of point-to-point and collective benchmarks, scaling from tens to over a thousand GPUs, before a cluster is ever handed over, so performance is proven rather than assumed. It includes **normalizing heterogeneous, often multiplane fabrics,** mapping divergent traffic-class schemes and congestion-control parameters onto our lossless RDMA classes so end-to-end paths behave predictably across different vendors’ NICs and switches.

The principle we keep applying is that heterogeneity is manageable but standardization is what makes it affordable. Testing and qualification, RDMA transport and congestion behavior, and telemetry all still diverge across providers, and every divergence becomes engineering work. 

### BAG: Scale-Across Aggregation

The scale of AI capacity Meta has committed to this decade — **Prometheus at roughly 1 gigawatt in 2026, and Hyperion scaling toward 5 gigawatts**— means a single cluster now outgrows any single region. Our [**backend aggregation (BAG)**](https://engineering.fb.com/2026/02/09/data-center-engineering/building-prometheus-how-backend-aggregation-enables-gigawatt-scale-ai-clusters/) layer is a centralized, Ethernet-based super-spine that interconnects many spine-layer fabrics into one mega cluster spanning buildings, campuses, and regions. It operates at **petabit scale** — inter-BAG capacity between a pair of regions reaches tens of petabits per second. BAG is what allows Prometheus to function as a single cluster even though its capacity is spread across conventional data center buildings, weatherproof outdoor structures, and adjacent colocation space.

At this reach, **distance itself becomes a design constraint**. Lossless Ethernet requires buffer headroom proportional to cable length, so once links stretch tens of kilometers, buffer management turns into a first-order problem rather than a tuning detail. And getting it wrong risks congestion spreading well beyond the link that caused it. Instead of provisioning every link for a worst-case distance, FBOSS now **measures actual cable length in place**, timing probe traffic on an uncongested queue to derive round-trip distance, and allocates headroom against the measurement.

Load balancing also has to reason about paths that are **degraded rather than simply down**. BAG uses eBGP link-bandwidth signaling so traffic is distributed in proportion to the capacity actually available on each path, with deliberate damping so that a single link failure does not ripple routing churn across the domain. And because inter-fabric latency is several times intra-fabric latency, collective communication libraries — which generally choose algorithms without any awareness of network distance — can fall off a performance cliff. 

We’ve been addressing that from both directions, with adaptive routing improvements to reduce the latency penalty and scheduling that minimizes how much collective traffic needs to cross the BAG layer at all. Training remains resilient throughout. When a replica fails, it is automatically excluded and the surviving replicas continue synchronizing across BAG.

The direction of travel is longer distances still — training jobs spanning regions tens, hundreds, or thousands of kilometers apart — and increasingly heterogeneous clusters that mix hardware generations and vendors.

![](https://engineering.fb.com/wp-content/uploads/2026/10/Meta-OCP-2026-Backend-aggregation.jpg)

Backend aggregation (BAG) connects building-scale AI fabrics — both DSF and NSF — across sub-regions into a unified training network.

### SRv6-Powered Regional Backbone Using FBOSS

We’ve deployed Segment Routing over IPv6 (SRv6) using FBOSS for our regional backbone networks. This enables more flexible traffic engineering and simplified operations as we interconnect AI clusters across geographies — running on open shallow-buffer switch platforms powered by Cisco SiliconOne, with ongoing work to onboard additional silicon families, all managed under FBOSS using OCP SAI.

![](https://engineering.fb.com/wp-content/uploads/2026/10/Regional-Backbone-RBB.jpg)

Meta’s Regional Backbone (RBB) interconnects data center campuses and bridges to public cloud capacity.

## Ethernet for Scale-Up: Our Commitment to Ethernet

A defining milestone of OCP 2026 is proving that **Ethernet can serve the scale-up domain** — the high-bandwidth, ultra-low-latency interconnects between accelerators within a rack or pod that have traditionally required proprietary technologies.

### Tahan: Ethernet-Based Scale-Up Switch

We’re introducing **Tahan**, Meta’s Ethernet-based scale-up switch — purpose-built for our [MTIA 300 training accelerators](https://engineering.fb.com/2026/08/24/networking-traffic/mtia-300-meta-training-chip-built-in-nics/). Tahan is built on the 51.2 Tbps Tomahawk 5 ASIC from Broadcom, offering total capacity of 64x800G, half of which is used to provide scale-up connectivity to the accelerators via the backplane. Four Tahan switches interconnect 16 accelerators in a non-blocking topology.

Importantly, Tahan reuses the **same lossless RoCE transport** (routed IPv6, PFC, AI-tuned QoS) as our scale-out network, unifying both scale-up and scale-out fabrics under FBOSS.

![](https://engineering.fb.com/wp-content/uploads/2026/10/Meta-Tahan.jpg)

Tahan, Meta’s first open, Ethernet-based scale-up switch (32×800G), liquid-cooled and running FBOSS.

### Next-Generation Scale-Up: 72 Accelerators per Rack on 102.4T Silicon

We’re also previewing the **next-generation scale-up blade**, a 216×400G switch built on 102.4 Tbps Broadcom Tomahawk6C silicon. Eight of these switches interconnect **72 accelerators per rack**, a dramatic increase in density enabled by the bandwidth of the 102.4T generation. A future generation of this scale-up blade is planned to adopt **OCP Ethernet for Scale-Up Networking** (**ESUN) as the scale-up data plane**, cementing our commitment to open standards for the entire scale-up stack.

![](https://engineering.fb.com/wp-content/uploads/2026/10/MTIA-scale-up-blade.jpg)

The next-generation MTIA scale-up blade: 216×400G on 102.4 Tbps silicon, adopting OCP ESUN as the scale-up data plane.

### ESUN Evolving

The ESUN initiative we founded within OCP last year has made significant progress. Working alongside AMD, Arista, ARM, Broadcom, Cisco, HPE, Marvell, Microsoft, and NVIDIA, ESUN is advancing open specifications for:  

-   Protocol headers and framing optimized for scale-up topologies.
-   Error handling mechanisms for lossless multi-hop fabrics.
-   Alignment with UEC and IEEE standards.

This work has already produced a concrete result with the [ESUN 1.0 Network Operator Requirements Base Specification](https://www.opencompute.org/documents/ocp-esun-network-operator-requirements-base-specification-rev-1-0-final-pdf) released earlier this year. ESUN 1.0 deliberately **focuses on the fabric**, defining what the network must deliver while leaving implementation flexibility to GPU and accelerator vendors, which broadens adoption. It also **coordinates with existing standards bodies**, leveraging work underway in IEEE and the Ultra Ethernet Consortium (UEC) rather than duplicating it.

Since publishing ESUN 1.0, the group is now close to the next version, ESUN 1.1, tackling new features such as switch profiles and inter-packet gap reduction that further optimize Ethernet for low-latency, scale-up use cases.

![](https://engineering.fb.com/wp-content/uploads/2026/10/ESUN-technical-focus.png)

ESUN’s technical focus: a fabric-centric scope that preserves GPU implementation flexibility, coordinated with IEEE and UEC standards work with the ESUN 1.0 specification already released.

With Tahan shipping today, a 72-accelerator-per-rack design on the horizon adopting ESUN as its data plane, and ESUN continuing to evolve its open specifications, we’re helping build a complete open platform for the scale-up future.

## Ecosystem Enablement and Open Transport

Our commitment to openness extends across the full networking stack — from switch platform hardware to transport protocols.

### OSPA: Open Switch Platform Architecture

![](https://engineering.fb.com/wp-content/uploads/2026/10/OCP-OSPA-logo.jpg)SAI made switch _data plane_ software portable across silicon. But the layer beneath it, the **switch platform layer**, has remained proprietary and fragmented. Every new hardware platform requires months of duplicated, custom engineering to bring up, and a lack of standard platform design multiplies long-term maintenance and troubleshooting cost. In an era of compressed AI hardware cycles, that onboarding tax has become untenable.

To fix this, we’re co-leading a new OCP initiative with **Microsoft and Alibaba**, the [**Open Switch Platform Architecture (OSPA)**](https://www.opencompute.org/news/introducing-ospa-unifying-the-switch-platform-layer-for-open-networking/) — a unified reference design for the switch platform layer. 

OSPA standardizes the hardware and software interfaces for:  

-   Power management and power sequencing.
-   Sensor and environment control, including thermal and fan management.
-   Hardware inventory management and device enumeration.
-   Out-of-band hardware interfaces (management Ethernet, serial console, USB, LED indicators).
-   Firmware maintenance and updates.
-   Platform troubleshooting and diagnostics.

### FBOSS Ecosystem Enablement

![](https://engineering.fb.com/wp-content/uploads/2026/10/FBOSS-logo.jpg)

Over the past year we made a major push to extend **open-source FBOSS** so that switch vendors can **self-onboard their own platforms** without Meta engineers in the loop for the port. The goal is a self-service model in which multiple new switch platforms can be developed concurrently, giving vendors access to a hyperscale-proven NOS as they build FBOSS-compatible hardware.

Vendors and developers can get started at the [FBOSS documentation site](https://facebook.github.io/fboss/) and the [FBOSS GitHub repository](https://github.com/facebook/fboss).

### MetaRoCE: Open-Source Transport for AI Clusters

As we recently announced, [**MetaRoCE** is our open-source RDMA transport protocol](https://engineering.fb.com/2026/08/24/networking-traffic/metaroce-rdma-transport-ai-ethernet/) optimized for AI cluster networks over Ethernet. MetaRoCE provides the congestion control and reliability semantics that distributed AI training workloads demand. It’s purpose-built for the unique traffic patterns of collective communication across large-scale Ethernet fabrics. 

At OCP, we are announcing our open-source MetaRoCE implementations, enabling the broader AI infrastructure community to adopt and build upon a production-proven transport stack.

## Join Us in Building the Open Future of AI Networking

The pace of AI infrastructure evolution continues to accelerate. The challenges of building open, efficient, and sustainable AI networking are too large for any single company to solve alone.

We invite engineers, silicon vendors, system integrators, and operators to join us and the OCP community in defining what comes next. Visit our presentations at OCP 2026, explore our open-source contributions including FBOSS and [MetaRoCE](https://engineering.fb.com/2026/08/24/networking-traffic/metaroce-rdma-transport-ai-ethernet/), and collaborate with us on building the networking infrastructure the AI era demands.

* * *

_The authors are members of the Network Infrastructure team at Meta._