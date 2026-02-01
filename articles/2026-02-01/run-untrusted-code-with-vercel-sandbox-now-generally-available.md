---
title: "Run untrusted code with Vercel Sandbox, now generally available"
source: "https://vercel.com/blog/vercel-sandbox-is-now-generally-available"
publishedDate: "2026-01-30"
category: "frontend"
feedName: "Vercel"
author: "Harpreet Arora"
---

3 min read

Jan 30, 2026

AI agents are changing how software gets built. They clone repos, install dependencies, run tests, and iterate in seconds.

Despite the change in software, most infrastructure was built for humans, not agents.

Traditional compute assumes someone is in the loop, with minutes to provision and configure environments. Agents need secure, isolated environments that start fast, run untrusted code, and disappear when the task is done.

Today, Vercel Sandbox is generally available, the execution layer for agents, and we're open-sourcing the Vercel Sandbox [CLI](https://www.npmjs.com/package/sandbox) and [SDK](https://www.npmjs.com/package/@vercel/sandbox) for the community to build on this infrastructure.

## [Link to heading](#built-on-our-compute-platform)Built on our compute platform

Vercel processes over 2.7 million deployments per day. Each one spins up an isolated microVM, runs user code, and disappears, often in seconds.

To do that at scale, we built our own compute platform.

Internally code-named Hive, it’s powered by [Firecracker](https://firecracker-microvm.github.io/) and orchestrates microVM clusters across multiple regions. When you click Deploy in [v0](https://v0.dev/), import a repo, clone a template, or run `vercel` in the CLI, Hive is what makes it feel quick.

Sandbox brings that same infrastructure to agents.

## [Link to heading](#why-agents-need-different-infrastructure)Why agents need different infrastructure

Agents don’t work like humans. They spin up environments, execute code, tear them down, and repeat the cycle continuously.

That shifts the constraints toward isolation, security, and ephemeral operation, not persistent, long-running compute.

Agents need:

-   Sub-second starts for thousands of sandboxes per task
    
-   Full isolation when running untrusted code from repositories and user input
    
-   Ephemeral environments that exist only as long as needed
    
-   Snapshots to restore complex environments instantly instead of rebuilding
    
-   Fluid compute with Active CPU pricing for cost and performance efficiency
    

We’ve spent years solving these problems for deployments. Sandbox applies the same approach to agent compute.

## [Link to heading](#what-is-vercel-sandbox)What is Vercel Sandbox?

[Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) provides on-demand Linux microVMs. Each sandbox is isolated, with its own filesystem, network, and process space.

You get `sudo` access, package managers, and the ability to run the same commands you’d run on a Linux machine.

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create();await sandbox.runCommand({  cmd: 'node',   args: ["-e", 'console.log("Hello from Vercel Sandbox!")'],  stdout: process.stdout,});await sandbox.stop();
```

Sandboxes are ephemeral by design. They run for as long as you need, then shut down automatically, and you only pay for active CPU time, not idle time.

This matches how agents work. A single task can involve dozens of start, run, and teardown cycles, and the infrastructure needs to keep up.

## [Link to heading](#how-teams-are-using-sandbox)How teams are using Sandbox

### [Link to heading](#roo-code)[Roo Code](https://roocode.com/)

Roo Code builds AI coding agents that work across Slack, Linear, GitHub, and their web interface. When you trigger an agent, you get a running application to interact with, not just a patch.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4akOrFWjrPFcyIWytOE3cy%2F8ca374feb4c6c3363f6c723f341ed6a7%2Fwl.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FVk0uJVooqq34EUbeI0UBa%2F984e2eca2ece046d199144d73a1a2b3c%2Fwd.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2XzlZm399298FnfwUBMidh%2Fb36ae2dc632016214611b3f9fc4ab64c%2Fml-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3wuRm0w0D3hetbvBM37XlL%2F263fa5bea0614484db17ed592b5d829d%2Fmd.png&w=1920&q=75)

> The agent operates inside a complete environment where services can run together, so it can test changes end-to-end before handing you something to review. Instead of ‘review a patch and hope,’ you get a preview you can engage with as the agent iterates.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3qYNpZjdrQV1fBdq2LcV8U/14715756ddfb9e5f9cb3802e84b2059c/1649212598152.jpg)
> 
> **Matt Rubens,** CEO Roo Code

Snapshots changed their architecture. They snapshot the environment so later runs can restore a known state instead of starting from scratch, skipping repo cloning, dependency installs, and service boot time.

> Snapshots turn agents from stateless workers into persistent collaborators. Start a task on Monday, snapshot it, resume Thursday when stakeholders can review. Branch from a working state and try two approaches in parallel.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3qYNpZjdrQV1fBdq2LcV8U/14715756ddfb9e5f9cb3802e84b2059c/1649212598152.jpg)
> 
> **Matt Rubens,** CEO Roo Code

### [Link to heading](#blackbox-ai)[Blackbox AI](https://www.blackbox.ai/)

Blackbox AI built Agents HQ, a unified orchestration platform that integrates multiple AI coding agents through a single API. It runs tasks inside Vercel Sandboxes.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fjp0uhrxY5Lh5Tf0TwXEqx%2F4c1ba0703bc84583fea9825680cf85fa%2Fwd-2.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2kEQQsGTaeQMV9z5FCEL6f%2F2b0875b0cc69bdb7759fe8f6a9ffb0fa%2Fwd-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5XJdQhLllO8j0ilnWB24RC%2Ff955ba3ea0859efce772a392ee234dcf%2Fml.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1O5voPWRtSRpGRGavRlPya%2F4a8d6b4217792a0b17debbfa9803a4f2%2Fmd-1.png&w=1920&q=75)

> The decision to standardize on Vercel’s sandbox infrastructure was driven by two critical performance metrics: infrastructure stability and cold start performance. Sub-second sandbox initialization times enabled rapid task distribution and reduced end-to-end execution latency, which proved essential for production-grade agent orchestration.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1tTshMBckrXHJ2nuJIs73D/367f8049960702689a1e265e81a9515e/image.png)
> 
> **Robert Rizk,** Co-founder and CEO of Blackbox AI

This supports horizontal scaling for high-volume concurrent execution. Blackbox can dispatch tasks to multiple agents in parallel, each in an isolated sandbox, without resource contention.

> By using Vercel sandboxes to let users run AI agents at scale, we enable organizations to treat AI agents as reliable, scalable compute primitives within their development and production systems.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1tTshMBckrXHJ2nuJIs73D/367f8049960702689a1e265e81a9515e/image.png)
> 
> **Robert Rizk,** Co-founder and CEO of Blackbox AI

## [Link to heading](#create-your-first-sandbox-with-one-command-in-the-cli)Create your first sandbox with one command in the CLI

```
npx sandbox create --connect
```

Explore the [documentation](https://vercel.com/docs/vercel-sandbox) to get started, and check out the [open-source SDK](https://github.com/vercel/sandbox).