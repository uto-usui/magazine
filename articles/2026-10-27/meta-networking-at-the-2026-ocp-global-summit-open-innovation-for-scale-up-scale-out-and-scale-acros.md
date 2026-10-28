---
title: "Meta Networking at the 2026 OCP Global Summit: Open Innovation for Scale-Up, Scale-Out, and Scale-Across AI Networks"
source: "https://engineering.fb.com/2026/10/26/open-source/ocp-summit-2026-meta-networking-talks/"
publishedDate: "2026-10-26"
category: "engineering"
feedName: "Meta Engineering"
---

At the 2026 Open Compute Project (OCP) Global Summit, Meta shared the [networking innovations](https://engineering.fb.com/2026/10/12/open-source/ocp-summit-2026-powering-ai-with-open-innovations-in-scale-up-scale-out-and-scale-across-networks/) that are directly supporting our latest AI models, including [Muse Wonder](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/) and [Muse Spark](https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2), and our [gigawatt-scale Prometheus cluster](https://engineering.fb.com/2026/10/19/data-center-engineering/inside-prometheus-meta-gigawatt-scale-supercluster/). 

## Highlights

-   **IcePack & IceCube:** Meta’s first liquid-cooled network rack with 102.4T switch blades (128×800G, Broadcom Tomahawk 6C and NVIDIA Spectrum-6 variants), running FBOSS. 
-   **Flattened Planar Fabric (FPF) for scale-out:** Meta’s multi-plane scale-out fabric where each GPU connects to eight network planes. 3-tier → 2-tier Clos, NIC-level packet spraying, and a combined host+switch control plane. Built with NVIDIA and shared with our cloud partners.
-   **Scale-across:** BAG, our petabit-scale super-spine joining buildings, campuses, and regions in [our gigawatt-scale Prometheus cluster](https://engineering.fb.com/2026/10/19/data-center-engineering/inside-prometheus-meta-gigawatt-scale-supercluster/), plus SRv6 regional backbones on FBOSS + SAI.
-   **Ethernet for scale-up**: Tahan, the Ethernet scale-up switch for [MTIA 300](https://engineering.fb.com/2026/08/24/networking-traffic/mtia-300-meta-training-chip-built-in-nics/) based on Broadcom Tomahawk5; a preview of 72 accelerators per rack on 102.4T silicon; and ESUN progressing from 1.0 → 1.1.
-   **OSPA:** a new OCP initiative co-led by Meta, Microsoft, and Alibaba to [standardize the switch platform layer](https://www.opencompute.org/news/introducing-ospa-unifying-the-switch-platform-layer-for-open-networking/). v1.0 spec submitted to OCP.
-   **MetaRoCE:** [our RDMA transport for AI networks](https://engineering.fb.com/2026/08/24/networking-traffic/metaroce-rdma-transport-ai-ethernet/), now going open source.

We shared insights into key networking-related initiatives through talks from many of the Meta network and hardware teams. Those talks and their slide decks are now available to everyone! 

## Keynote and Executive Sessions

![](https://engineering.fb.com/wp-content/uploads/2026/10/OCP-2026-Omar-Meta.jpg)

[**Concrete to Code: Engineering AI Infrastructure at Gigawatt Scale**](https://drive.google.com/file/d/1I1HrFcVRKkSYyNxQyt7urpPQ8G7Ffwjj/view?usp=drivesdk) ([video](https://www.youtube.com/watch?v=lvieN3sJTUk))  
AI has changed the shape of infrastructure. Santosh Janardhan, Head of Infrastructure at Meta, shares how Meta is designing, building, and operating at a scale that requires rethinking the network, the facility, and the systems that hold it all together.  
_Speaker: Santosh Janardhan, Head of Infrastructure, Meta_

[**Betting on the Network: Meta’s Case for Full-Stack, Open AI Networking**](https://drive.google.com/file/d/1QdGTFJx5q2RUti_99ZQeAHlc9GbcJVW3/view) ([video](https://www.youtube.com/watch?v=sfSCknQJwbM))  
AI progress now depends on the network as much as on compute. The path forward is a full-stack, open approach built in the open ecosystem rather than behind proprietary walls.  
_Speaker: Omar Baldonado, Senior Director, Data Center & AI Networking, Meta_

[**Breaking the Walls: Open Scale-Across for the AI Era**](https://drive.google.com/file/d/13lXcXJMPzaYRNYu35MnZU1-SayV_1b-7/view?fbclid=IwY2xjawVElFlleHRuA2FlbQIxMQBwZG9mBGJyaWQRMXZrRXNzMUJETEo4ekFsM1FzcnRjBmFwcF9pZAEwAAEeqrRw1PhVEz66CjO1aSkQBaD56YvQw8vULRvR9Y1MMyJKrQdBerW6s561vZk_aem_KzMWQBBdzdwdJmTZforOgw) ([video](https://www.youtube.com/watch?v=Qp0OwKYl6mc))  
Training compute is compounding faster than infrastructure can scale. This talk lays out why open scale-across networking is needed to connect AI capacity across data centers and regions.  
_Speakers: Vipul Deokar, VP, Core Network Infrastructure, Meta; Rakesh Chopra, SVP, Silicon & Systems Architecture and Engineering Fellow, Cisco; Tom Williams, VP, Marketing, Cisco_

## Switch Platforms, Optics, and Interconnect

[**Meta 102.4T Ethernet Switch**](https://drive.google.com/file/d/1HBSpWnbuKEbmtQxH52qOFHcO7dnaxYLY/view) ([video](https://www.youtube.com/watch?v=39tvEfs9LuA))  
IceCube is Meta’s 102.4T switch that goes into our liquid-cooled Icepack rack. Icecube and N-IceCube are based on a 2OU, hybrid liquid/air-cooled, PHY-less design and incorporate either the Broadcom Tomahawk 6C or NVIDIA Spectrum-6 ASICs with 128x800GE of non-blocking capacity.  
_Speakers: Rongchun Zhou, Network Hardware Engineer, Meta; Reza Niazmand, Network Technical Program Manager, Meta_

[**Integrated Optics at Scale: From 51.2T CPO Validation to Meta’s 102.4T**](https://drive.google.com/file/d/15XRDwq-46b3G2xgUpiWXODVdfo6dKCEW/view) ([video](https://www.youtube.com/watch?v=t-ELqYbn7F0))  
A look at why integrated optics matter for rack-scale AI — power, density, disaggregation, and reliability — and what Meta learned validating 51.2T co-packaged optics that could carry over to 102.4T.  
_Speakers: Granthana Rangaswamy, Hardware Engineer, Meta; Siamak Amiralizadeh, Optical Engineer, Meta; Xu Wang, Hardware Engineer, Meta_

[**Operating Linear Pluggable Optics at Hyperscale**](https://drive.google.com/file/d/1lX-AnmWYNzWMhwvF8vFP5sAwINKQcav6/view) ([video](https://www.youtube.com/watch?v=ZDsh2GK38qY))  
At AI scale, the per-module retimer DSP is a repeated tax in power, heat, and cost across millions of links — but removing it moves equalization and triage onto the host. This talk answers whether linear optics can match retimed reliability at fleet scale.  
_Speakers: Amin Yekani, Optical Engineer, Meta; Qing Wang, Optical Engineer, Meta_

[**Large-Scale Deployment of 800G AECs in Meta Data Centers**](https://drive.google.com/file/d/1QqdDZrnH0QALHVjwN0frxJrp4xTtGR04/view) ([video](https://www.youtube.com/watch?v=VtaBAmRlhrA))  
The economics of AI networking are set at the short-reach link. This session covers Meta’s large-scale deployment of 800Gb/s active electrical cables and the component quality work behind it.  
_Speakers: Jingyu (Kevin) Yu, Component Quality Engineer, Meta; Abhijit Chakravarty, Quality Head, Optics & Interconnects, Meta_

[**Beyond Pluggables: Building the NPO Ecosystem for Scaling AI**](https://www.youtube.com/watch?v=V5blMEcg3GQ)A look at what it takes to build a near-package optics (NPO) ecosystem capable of supporting AI scaling beyond what pluggable modules can deliver.  
_Speaker: Nan Ge, Technical Sourcing Manager, Meta_ 

## FBOSS and Open Platforms

![](https://engineering.fb.com/wp-content/uploads/2026/10/OCP-2026-audience.jpg)

[**Open Switch Platform Architecture (OSPA) — A Unified Network Switch Platform Reference Design**](https://drive.google.com/file/d/1Sw9xqHQYCtoozeCwpC9phbAfsTRk-rgD/view) ([video](https://www.youtube.com/watch?v=ldBNxQeHbv8))  
While SAI has made data plane software portable, the switch platform layer remains proprietary and fragmented, adding months of duplicated bring-up work per platform. This talk introduces OSPA, which proposes a unified, multi-vendor reference design for that layer, and the 1.0 specification that has been contributed to OCP.  
_Speakers: Tao Ren, Tian Fang, and Xu Wang, Meta; Guohan Lu, Individual; Ying Xie, Microsoft; Yiyuan Huang and Zhiping Yao, Alibaba_

[**NVIDIA SDK + FBOSS: Building Production-Ready AI Network Fabrics**](https://drive.google.com/file/d/105Qsg6nRnTK23JytU1hGcPJTeqYNwOeO/view) ([video](https://www.youtube.com/watch?v=7t-8hkSfCgQ))  
How NVIDIA’s Spectrum-X switch, SDK, SAI implementation, and simulator come together with FBOSS, Meta’s network operating system, to build production AI fabrics. The talk covers the CI/CD and test-driven workflow that made rapid joint integration possible.  
_Speakers: Parvez Shaikh, Meta; Harish Krishnamoorthy, Alan Elder, and Tom Zhu, NVIDIA_

[**Open, AI-Ready FBOSS: From Platform Bring-up to Solution Qualification**](https://drive.google.com/file/d/1vETOnh8k3GLQslC9RM-mKXYlK0QHP3P5/view) ([video](https://www.youtube.com/watch?v=pHQiaacYY5I))  
A tour of the FBOSS software stack — routing, forwarding, platform services, and board support — and how a config-driven approach can more quickly and easily take a platform from board bring-up to qualified status for the OCP ecosystem.  
_Speakers: Srikrishna Gopu, Software Engineer, Meta; Benoit Sigoure, Software Engineer, Nexthop AI_

## Experiences With Scale-Out and Scale-Across

[**High Performance at Scale and Reliability by Design: Operating Meta’s Largest AI Clusters**](https://drive.google.com/file/d/1Lwp3AyOb11ABSelD9mWuG2oiKeJSMtJt/view?usp=sharing) ([video](https://www.youtube.com/watch?v=rlHg5wD-T08))  
What it takes to operate Meta’s largest AI clusters reliably, walking the full training stack from GPUs and scale-up fabrics through FBOSS, drivers, communication libraries, and the scheduler.  
_Speakers: Jose Leitao, Production Engineering, Meta; Guille Cobo, Network.AI, Meta_

[**Scaling AI Infrastructure Across DC and Beyond: Meta’s Journey with BAG**](https://drive.google.com/file/d/18eW9f--PwFBDFUozE_h5jpE6IDC7huhz/view) ([video](https://www.youtube.com/watch?v=pvrGBgPpTOM))  
An overview of Backend Aggregation (BAG) — its purpose, architecture, and performance benefits — with lessons from deployment in Meta’s [Prometheus](https://engineering.fb.com/2026/10/19/data-center-engineering/inside-prometheus-meta-gigawatt-scale-supercluster/) cluster. The talk also covers the engineering challenges of platform fit, distance management, reliability, and capacity planning, especially given the quickly evolving AI ecosystem.  
_Speakers: Jalpa Patel, Technical Program Manager, Meta; Hany Morsy, Network Engineer, Meta_

[**SRv6 Powered Backbone Networks**](https://drive.google.com/file/d/1nkRjJbCa649CxJx60cNYNX6prtB_hZxu/view) ([video](https://www.youtube.com/watch?v=FlAk9ApT0F4))  
This talk delves into why Meta chose SRv6 for a new layer of its backbone, how the data plane and control plane work in production on FBOSS (including using shallow buffers at WAN distances), and the accelerated timeline from concept to deployment in a matter of months.  
_Speakers: Jasmeet Bagga, Software Engineer, Meta; Andrey Golovanov, Network Engineer, Meta_

[**Bridging On-prem and Cloud: GPU Networking at Meta Scale**](https://drive.google.com/file/d/1yRz2EetkYgP5bGiIDukEWzAhjKSPx6pW/view) ([video](https://www.youtube.com/watch?v=FNk0lQTa7Os))  
A look at how Meta uses cloud GPU capacity, and what lessons Meta brings from its on-premises deployments into clouds to make them highly performant and reliable for AI workloads.  
_Speakers: Adi Gangidi, Technical Lead, Meta; Carmen Au, Software Engineering Manager, Meta_

[**Scale-Across Networking Panel**](https://drive.google.com/file/d/1cW5Kt_MhR8vy-80rFpap42ZnJACnV-xs/view) ([video](https://www.youtube.com/watch?v=LdjbbZV7zCg))  
A cross-industry panel on what scale-across AI clusters demand from routing and optical transport equipment. Panelists compare approaches across hyperscalers, silicon, and systems vendors.  
_Panelists: Jeff Rahn, Meta; Tad Hofmeister, Google Cloud; Yawei Yin, Microsoft Azure; Xiguang (Henry) Wu, Broadcom; Vijay Vusirikala, Arista Networks (moderator)_

[**Tahan: An Open, Ethernet-Based Scale-Up Switch for MTIA**](https://drive.google.com/file/d/1Wr6Uvm7drImPv-bHR-1VjxQ8MrQrlodz/view) ([video](https://www.youtube.com/watch?v=PwuacNKEoBE))  
We introduce Tahan, an Ethernet-based scale-up switch for [our rack-scale MTIA 300 AI system](https://engineering.fb.com/2026/08/24/networking-traffic/mtia-300-meta-training-chip-built-in-nics/). This talk walks through Tahan’s bandwidth and latency characteristics and scale-up feature set, demonstrating Ethernet’s strengths in scale-up and moving toward ESUN for future scale-up designs.  
_Speakers: Vimal Vasudevan, Technical Program Manager, Meta; Ashutosh Grewal, Software Engineer, Meta_

[**ESUN: Open Ethernet for the AI Scale-Up Era**](https://drive.google.com/file/d/1yu-vP82YmjEsCdV2dC8HMagA-R71GcwP/view) ([video](https://www.youtube.com/watch?v=c0bFXfA4LX8))  
We partnered with the community last year to launch [ESUN: Ethernet for Scale-up Networking](https://www.opencompute.org/news/introducing-esun-advancing-ethernet-for-scale-up-ai-infrastructure-at-ocp/). This talk covers progress since the last OCP Global Summit, with the [1.0 specification](https://www.opencompute.org/news/the-ocp-esun-10-specification-has-been-released/) released earlier in the year and the upcoming 1.1 specification.  
_Speakers: Manoj Wadekar, AI Network Technologist, Meta; Pratik Marolia, AI System Architect, Microsoft_

[**Validation Methodologies for the ESUN Ecosystem**](https://drive.google.com/file/d/1eSkAOdBzpF2gu1osvlijzTSH790ZBWXR/view) ([video](https://www.youtube.com/watch?v=z0gNH2kKreU))  
A validation methodology for the ESUN ecosystem, situating scale-up within the broader set of AI scaling domains — scale in, up, out, across, edge, and above.  
_Speakers: Manoj Wadekar, AI Systems Technologist, Meta; Venkat Pullela, CTO, AI Infrastructure, Keysight_

[**Test Methodology for Multi-Accelerator Copper Scale-up Interconnect**](https://drive.google.com/file/d/1gpyWDK-ejW4LpAKN5cisCE9qdvqRJkYU/view) ([video](https://www.youtube.com/watch?v=4n5BX5pxL2k))  
In a copper scale-up domain, thousands of connections per rack mean roughly 10 bad links even at 99.9% yield — and blind-mate cartridges leave no per-link serviceability. At Meta, we look at this as a statistical problem rather than a set of isolated debugging problems. This talk shares our test methodology.  
_Speakers: Yao Rong, Systems Engineer, AI Systems, Meta; Karthik Ganesan, AI/HPC System Performance Engineer, Meta_

## RDMA Transport

[**MetaRoCE: Rethinking RDMA for AI**](https://drive.google.com/file/d/1Tdvk8n45Edf-5lTYavf97_8nEEJ_Q7m0/view) ([video](https://www.youtube.com/watch?v=aTo7X9HT2s0))  
The network is now in the critical path for AI clusters, with all-reduce and all-to-all performance gated by the slowest node across hundreds of thousands of accelerators. This talk covers the [MetaRoCE](https://engineering.fb.com/2026/08/24/networking-traffic/metaroce-rdma-transport-ai-ethernet/) transport specification.  
_Speakers: Arvind Srinivasan, Meta; Sandeep Nagaraja, Meta; Balakrishnan Raman, AMD_

[**MetaRoCE in Software**](https://drive.google.com/file/d/1OMx_izf14TGc_phIYMeF1Cg921bkV77j/view) ([video](https://www.youtube.com/watch?v=BoPZBxqkCOo))  
Meta is making its MetaRoCE software implementations available in open source, starting with a user-space version on GitHub ([libsoftmetaroce)](https://github.com/facebookincubator/metaroce/) with a DPDK-based version coming soon.  
_Speakers: Ashkan Nikravesh, Software Engineer, Meta; Yiorgos Nikolaidis, Software Engineer, Meta_

## Watch Everything From the 2026 OCP Global Summit 

You can watch all of the recorded talks from the event on the [2026 OCP Global Summit website](https://www.opencompute.org/events/ocp-summit/2026-ocp-global-summit/recorded-content/).

A huge thank-you to every presenter from our Meta network and hardware teams and to our great partners across the industry who made this possible! 

_Images courtesy Open Compute Project (OCP)._