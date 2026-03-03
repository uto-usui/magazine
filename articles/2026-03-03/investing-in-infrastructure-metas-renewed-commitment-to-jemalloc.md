---
title: "Investing in Infrastructure: Meta’s Renewed Commitment to jemalloc"
source: "https://engineering.fb.com/2026/03/02/data-infrastructure/investing-in-infrastructure-metas-renewed-commitment-to-jemalloc/"
publishedDate: "2026-03-02"
category: "engineering"
feedName: "Meta Engineering"
---

-   Meta recognizes the long-term benefits of jemalloc, a high-performance memory allocator, in its software infrastructure.
-   We are renewing focus on jemalloc, aiming to reduce maintenance needs and modernize the codebase while continuing to evolve the allocator to adapt to the latest hardware and workloads.
-   We are committed to continuing to develop jemalloc development with the open source community and welcome contributions and collaborations from the community.

Building a software system is a lot like building a skyscraper: The product everyone sees is the top, but the part that keeps it from falling over is the foundation buried in the dirt and the scaffolding hidden from sight.

[jemalloc](https://github.com/jemalloc/jemalloc), the high performance memory allocator, has consistently been a highly-leveraged component within our software stack, adapting over time to changes in underlying hardware and upper-layer software. Alongside the Linux kernel and the compilers, it has delivered long-term benefits to Meta, contributing to a reliable and performant infrastructure. 

## Listening, Reflecting, and Changing

High leverage comes with high stakes. On the spectrum of practical versus principled engineering practice, foundational software components like jemalloc need the highest rigor. With the leverage jemalloc provides however, it can be tempting to realize some short-term benefit. It requires strong self-discipline as an organization to resist that temptation and adhere to the core engineering principles. 

In recent years, there has been a gradual shift away from the core engineering principles that have long guided jemalloc’s development. While some decisions delivered immediate benefits, the resulting technical debt eventually slowed progress.

We took the community’s feedback to heart. In the spirit of collaboration, we have reflected deeply on our stewardship and its impact on jemalloc’s long-term health. As we’ve met with some members of the community, including the project’s founder, [Jason Evans](https://jasone.github.io/), to share our introspection and how we are changing our approach. We’ve started an effort to remove technical debt and rebuild a long-term roadmap for jemalloc. 

## A New Chapter for jemalloc

As a result of these conversations with the community, the original [jemalloc open source repository](https://github.com/jemalloc/jemalloc) has been unarchived. We are grateful for the opportunity to continue as stewards of the project. Meta is renewing focus on jemalloc, aiming to reduce maintenance needs and modernizing the codebase while continuing to evolve the allocator to adapt to the latest and emerging hardware and workloads.

Looking ahead, our current plan for jemalloc focus on several key areas of improvement:

-   **Technical Debt Reduction**: We are focusing on cleaning up technical debt, refactoring, and enhancing jemalloc to ensure it remains efficient, reliable and easy to use for all users.
-   **Huge-Page Allocator:** We will continue to improve jemalloc’s hugepage allocator  (HPA) to better utilize transparent hugepages (THP) for improved CPU efficiency.
-   **Memory Efficiency:** We plan to deliver improvements to packing, caching, and purging mechanisms for optimized memory efficiency.
-   **AArch64 Optimizations:** We will make sure jemalloc has good out-of-the-box performance for the AArch64 (ARM64) platform.

We know that trust is earned through action. Our hope is that, over time, our renewed commitment will be evident in the health and progress of jemalloc. We invite the community to join us in this new chapter — share your feedback and help shape jemalloc’s future. We look forward to collaborating with the community to drive jemalloc forward.