---
title: "A deep dive into Vercel’s build infrastructure"
source: "https://vercel.com/blog/a-deep-dive-into-hive-vercels-builds-infrastructure"
publishedDate: "2024-10-30"
category: "frontend"
feedName: "Vercel"
author: "Mariano Cocirio"
---

5 min read

Oct 30, 2024

Building a compute platform optimized for fast, secure, and reliable builds.

Vercel has a new low-level untrusted and ephemeral compute platform—designed to give us the control needed to securely and efficiently manage and run builds. Since November 2023, this compute platform, internally codenamed "Hive", has powered Vercel’s builds, enabling key improvements like enhanced build machines and a 30% improvement in build performance.

The platform operates on the fundamental assumption that we’re executing potentially malicious code on multi-tenant machines, requiring it to be safe, reliable, performant, and cost-effective. It’s architected to handle multiple use cases and can be composed in different ways depending on what’s needed. Most recently, Hive allowed us to reduce [provisioning times for Secure Compute](https://vercel.com/docs/security/secure-compute#build-delay) customers from 90 seconds to 5 seconds, while also improving their build speeds.

We built Hive because we needed finer control and more granular management to continuously improve Vercel’s infrastructure, to meet the growing demands of our customers and to fulfill our vision of delivering the best development experience in the world.

## [Link to heading](#inside-hive)**Inside Hive**

Each hive is a cluster running in a specific region. There can be multiple hives per region, designed to efficiently manage and execute customer builds. It’s made up of several key components that work together to handle everything from code execution to scaling.

-   **Hive**: The top-level primitive in the system. We run multiple hives, and each has its own failure boundary, operating independently from the others.
    
-   **Box**: Refers to the bare metal machines that run the virtual machines in Hive. At this layer, we’ve implemented several optimizations to speed up VM startup times, including Docker image caching, which alone has reduced startup times by around 45 seconds compared to previous solutions which took almost 2 minutes. Additionally, we handle block device snapshotting and other optimizations to ensure each Virtual Machine (VM) starts quickly, avoiding repetitive work.
    
-   **Cell**: Is what we call a virtual machine. Inside each cell, we run at least one container. Each cell is assigned dedicated CPUs and memory, while disk and network throughput are rate-limited based on the overall capacity and how the box is divided up.
    
-   **Control Plane**: Orchestrates the cluster, managing job placement, and handling autoscaling, instance lifecycles, monitoring, and overall cluster health. It ensures each build runs smoothly and efficiently.
    
-   **API**: Each Hive has its own API, which is minimal by design. The API primarily handles requests to run cells.
    

These components together make up Hive, allowing us to manage builds at scale while optimizing for performance, reliability, and resource efficiency.

## [Link to heading](#how-hive-components-work-together)**How Hive components work together**

The inner workings of Hive is an orchestrated system that ensures secure, isolated, and efficient execution of customer builds. At the core, each box in Hive runs a [Kernel-based Virtual Machine](https://linux-kvm.org/page/Main_Page) (KVM), which is a full virtualization solution for Linux on x86 hardware. By leveraging KVM, we can run multiple virtual machines, each with its own unmodified Linux image, on a single box. This setup allows each VM to have private virtualized hardware, providing isolation and security between tenants.

On top of this KVM layer, we run multiple [Firecracker](https://firecracker-microvm.github.io/) processes. Firecracker is an open-source virtualization technology—built for creating and managing secure, multi-tenant containers and function-based services within microVMs. In Hive, these microVMs are called cells. Each cell is mapped directly to a Firecracker process, this 1:1 relationship ensures that each VM is fully managed by its corresponding Firecracker process.

Managing this complex orchestration is a box daemon that runs on each box. The box daemon is responsible for provisioning block devices, spawning Firecracker processes, and managing communication with the cells. It coordinates the setup and lifecycle of each cell by communicating with a cell daemon inside the cells through a dedicated socket connection.

The cell daemon inside each cell plays an equally important role. It maintains communication with the box daemon and controls the build containers that execute customer workloads. When a build request arrives, the cell daemon ensures that the container runtime starts, stops, or runs the necessary containers. This tight integration between the box and cell daemons allows Hive to effectively manage isolated environments and quickly handle customer builds.

This entire architecture allows Hive to balance secure isolation, fast startup times, and the scalability required for customer builds—all while minimizing overhead and optimizing performance.

## [Link to heading](#life-of-a-build)Life of a build

When a build task is initiated, the build pipeline selects the appropriate hive cluster based on the customer and build configuration. It uses the Hive API to run the build inside a container within a cell. While Hive is responsible for running and scaling the containers' execution, it doesn’t manage each container’s internals. The build pipeline, which uses the Hive API, provides the build container image ready to execute the build.

To ensure quick starts, we cache the build container image, as it's a fairly large container, so it’s typically pre-loaded in a cell. Booting the VM and preparing everything takes only a few seconds, so we maintain a pool of pre-warmed cells ready to handle the load. If a pre-warmed cell is available, the build starts immediately. In rare cases, like during traffic spikes or for specific builds such as Secure Compute, a new cell must be provisioned, which takes about 5 seconds. Once the build is complete, the cell is destroyed.

## [Link to heading](#the-impact-of-hive:-before-and-after)**The impact of Hive: before and after**

Since adopting Hive, we’ve seen significant improvements across the board. Overall, there has been a 20% reduction in build times compared to our previous solution. Builds that require spawning a new cell have benefited even more, with provisioning times dropping from nearly 90 seconds to 5 seconds and build times, decreasing by 40%.

In addition to these speed gains, Hive has delivered more stable performance and flexibility. For example, it's enabled us to offer enhanced machines for customers who need extra memory or disk space.

## [Link to heading](#start-building-with-vercel-today)**Start building with Vercel today**

Hive has been powering Vercel builds behind the scenes for over a year, and you can experience the benefits firsthand. By building on Vercel, you’re tapping into a platform that continuously improves and scales with your needs, all backed by Hive’s secure and efficient compute capabilities. Whether you’re deploying small projects or handling large-scale builds, Hive is designed to support your applications.

We’re actively working on making builds even faster by improving caching strategies, optimizing cloning processes, and enhancing overall performance. As a general-purpose compute platform, Hive has endless potential beyond builds. We’re investing in exploring new use cases to unlock even more value for developers.

Join us in building a faster, and more scalable web. [Start building on Vercel today, powered by Hive](https://vercel.com/templates/next.js/nextjs-boilerplate).