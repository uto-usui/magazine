---
title: "How AWS S3 is built"
source: "https://newsletter.pragmaticengineer.com/p/how-aws-s3-is-built"
publishedDate: "2026-01-21"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/5vL6aCvgQXU), [Spotify](https://open.spotify.com/episode/5iWI2dX07eHjpU3poZLeMo), and [Apple](https://podcasts.apple.com/us/podcast/how-aws-s3-is-built/id1769051199?i=1000746086683).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** — ⁠ The unified platform for flags, analytics, experiments, and more. I’m hosting The Pragmatic Summit with Statsig. 11 February, San Francisco. [Join us there](https://www.pragmaticsummit.com/).

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&ut[%E2%80%A6]egory=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for automated code review. Sonar’s latest **[State of Code Developer Survey report](https://www.sonarsource.com/pragmatic/developer-survey-report/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-state-of-code-developer-survey26&utm_content=podcast-sonar-dev-survey&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** found how the surge in output with AI is creating a new bottleneck for devs with _code review_. SonarQube helps with just this: it’s the automated layer for code quality verification. More than 7 million developers trust it – [see why](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer).

• **[WorkOS](https://workos.com/)** – Everything you need to make your app enterprise ready. WorkOS is a collection of primitives like single sign-on, authentication, directory sync, MCP authentication, and more. Focus on your product, not building enterprise complexity. [Check out WorkOS.](https://workos.com/)

Amazon S3 is one of the largest distributed systems ever built, storing and serving data for a significant portion of the internet. Behind its simple interfaces hides an enormous amount of engineering work, careful tradeoffs, and long-term thinking.

In this episode, I sit down with Mai-Lan Tomsen Bukovec, VP of Data and Analytics at AWS, who has been running Amazon S3 for more than a decade. Mai-Lan shares how S3 operates at extreme scale, what it takes to design for durability and availability across millions of servers, and why building for failure is a core principle.

We also go deep into how AWS approaches correctness using formal methods, how storage tiers and limits shape system design, and why simplicity remains one of the hardest and most important goals at S3’s scale.

Ten things I learned from talking with Mai-Lan:

**1\. The mind-boggling scale of S3.** S3 handles hundreds of millions of transactions per second (!!) worldwide and stores over 500 trillion objects across hundreds of exabytes of data (one exabyte is 1,000 petabytes or 1 million terabytes). To visualize the hardware: if you stacked all of S3’s tens of millions of hard drives on top of each other, they would reach the International Space Station and almost back.

**2\. The ridiculous engineering feat of rolling out strong consistency practically overnight.** When S3 launched in 2006, it was designed with [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) (also called optimized replication) to optimize for high availability, but relaxing data consistency promises. The engineering team later achieved strong consistency _without_ compromising availability or increasing costs to customers — a very difficult feat! A key innovation was a replicated journal — a distributed data structure where nodes are chained together so writes flow sequentially through all nodes. This was combined with a new cache coherency protocol that provides a “failure allowance” — allowing multiple servers to receive requests while tolerating some failures.

**3\. The quiet Rust takeover.** S3 was not written in Rust in 2006, but the team has rewritten almost every performance-critical piece of code in the request path to Rust. The motivation: achieving the highest performance and lowest latency possible. S3 now has a lot of Rust engineers focused on this ongoing optimization work.

**4.** **The 11 nines of durability is measured, not just promised.** One claim S3 has is 11 nines of [durability](https://en.wikipedia.org/wiki/Durability_\(database_systems\)) (99.999999999%) — which was something I had to take a double check on, as it is such a high target. The system has auditor microservices that continuously inspect every single byte across the entire fleet. When signs of needed repair are detected, separate repair systems automatically kick in. At any given moment, servers are failing, and the system is designed with the assumption that failure is constant.

As Mai-Lan confirmed to me, the AWS team can answer this question any time:

> “What is our actual durability this week/month/year?”

**5\. Formal methods are practice, not theory at S3.** S3 uses formal methods (automated reasoning) extensively in production. When engineers check in code to the index subsystem that handles consistency, the system automatically runs formal proofs to verify that the consistency model hasn't regressed. As Mai-Lan put it:

> “At a certain scale, math has to save you. Because at a certain scale, you can’t do all the combinatorics of every single edge case, but math can.”

Formal methods are also used to prove correctness in cross-region replication. See also the AWS paper [Formally verified cloud-scale authorization](https://www.amazon.science/publications/formally-verified-cloud-scale-authorization).

**6\. Correlated failures cause most problems these days at S3.** Individual failures are expected and handled. The real threat is correlated failures — when multiple components fail together because they share a fault domain (same rack, same availability zone, same power source). As Mai-Lan explained, S3’s architecture is designed around preventing correlated failures with approaches like:

-   Data is replicated across multiple availability zones
    
-   [Quorum](https://en.wikipedia.org/wiki/Quorum)\-based algorithms tolerate individual node failures
    
-   Physical and logical infrastructure are designed to avoid correlation
    
-   Every object is stored multiple times across different fault domains
    

**7\. S3 operates on 200+ services.** It’s not too surprising to learn that S3 has several (micro)services behind each regional endpoint — but it was interesting to learn that the number of services in the range of ~200. This is much smaller than [Uber’s 4,500+ microservices](https://www.uber.com/en-NL/blog/up-portable-microservices-ready-for-the-cloud/) — and to me it’s yet another confirmation that there’s no one “right” way to slice and dice your services. If anything, it proves that there’s not much correlation between the number of services and the scale a system handles!

Mai-Lan explained that a significant portion of the AWS microservices are dedicated solely to durability — health checks, repair systems, and auditors. The philosophy is that complexity must be managed through simplification: each microservice must remain focused, or the system becomes unmaintainable.

**8\. S3 Vectors: the challenges of building a completely new data primitive.** Unlike S3 Tables (which builds on objects via [Parquet](https://parquet.apache.org/) files), S3 Vectors is a completely new data structure. The challenge team had when building these: searching for nearest neighbors in high-dimensional vector space is expensive. S3’s solution:

-   Precompute “vector neighborhoods” — clusters of similar vectors computed asynchronously offline
    
-   When a new vector is inserted, it’s added to one or more neighborhoods based on similarity
    
-   Queries first find the nearest neighborhoods, then load only those vectors into fast memory for the nearest neighbor algorithm
    
-   Result: sub-100ms warm query times with support for 2 billion vectors per index (!) and 20 trillion vectors per bucket (!!)
    

**9\. Crash consistency as a design philosophy.** Mai-Lan told me how S3 engineers think deeply about crash consistency — the property that a system should always return to a consistent state after a fail-stop failure. Their approach: reason about all possible states a system can reach in the presence of failure, then design microservices to work together, assuming failure is always present.

**10\. The “Scale Is to Your Advantage” design principle.** One of S3’s core philosophies that I really liked was this:

> Scale _must_ be to your advantage.

This means that engineers at S3 cannot build something where performance degrades as the service grows. Instead, systems must be designed so that increased scale _improves_ attributes. For example: the larger S3 gets, the more de-correlated workloads become, which ends up improving reliability for all users.

**A reading recommendation from Mai-Lan: research papers!** Mai-Lan reads a lot of research papers. For curious folks, she recommends following research on multimodal embedding models — the next frontier for understanding data across different formats (text, images, audio) through semantic vectors. As she put it:

> "If you think about the future of data lakes, I think it's actually going to about metadata and the semantic understanding of our data. We will need to understand it through vectors, and search will need to be done across multiple modalities."

If you’re interested in how one of the largest systems in the world is built, and keeps evolving: this episode is for you.

-   [Inside Amazon’s engineering culture](https://newsletter.pragmaticengineer.com/p/amazon)
    
-   [How AWS deals with a major outage](https://newsletter.pragmaticengineer.com/p/how-aws-deals-with-a-major-outage)
    
-   [A Day in the Life of a Senior Manager at Amazon](https://newsletter.pragmaticengineer.com/p/a-day-in-the-life-of-a-senior-manager)
    
-   [What is a Principal Engineer at Amazon?](https://newsletter.pragmaticengineer.com/p/what-is-a-principal-engineer-at-amazon) – with Steve Huynh
    
-   [Working at Amazon as a software engineer](https://newsletter.pragmaticengineer.com/p/working-at-amazon-as-a-software-engineer) – with Dave Anderson
    

-   [Using lightweight formal methods to validate a key-value storage node in Amazon S3](https://www.amazon.science/publications/using-lightweight-formal-methods-to-validate-a-key-value-storage-node-in-amazon-s3)
    
-   [Formally verified cloud-scale authorization](https://www.amazon.science/publications/formally-verified-cloud-scale-authorization)
    
-   [Analyzing metastable failures](https://www.amazon.science/publications/analyzing-metastable-failures)
    
-   [Amazon’s engineering tenets](https://www.amazon.jobs/content/en/teams/principal-engineering/tenets)
    

([00:00](https://www.youtube.com/watch?v=5vL6aCvgQXU)) Intro

([01:03](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=63s)) S3’s scale

([03:58](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=238s)) How S3 started

([07:25](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=445s)) Parquet, Iceberg, and S3 tables

([09:46](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=586s)) S3 for developers

([13:37](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=817s)) Why AWS keeps S3 prices low

([17:10](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=1030s)) AWS pricing tiers

([19:38](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=1178s)) Availability and durability

([26:21](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=1581s)) The cost of S3’s consistency

([31:22](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=1882s)) Automated reasoning and proof of correctness

([35:14](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=2114s)) Durability at AWS scale

([39:58](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=2398s)) Correlated failure and crash consistency

([43:22](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=2602s)) Failure allowances

([46:04](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=2764s)) Two opposing principles in S3 design

([49:09](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=2949s)) S3’s evolution

([52:21](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=3141s)) S3 Vectors

([1:01:16](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=3676s)) The 50 TB limit on AWS

([1:07:54](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=4074s)) The simplicity principle

([1:10:10](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=4210s)) Types of engineers working on S3

([1:14:15](https://www.youtube.com/watch?v=5vL6aCvgQXU&t=4455s)) Closing recommendations

**Where to find Mai-Lan Tomsen Bukovec:**

• LinkedIn: [https://www.linkedin.com/in/mailan](https://www.linkedin.com/in/mailan)

**Mentions during the episode:**

• Amazon S3: [https://aws.amazon.com/s3](https://aws.amazon.com/s3)

• Exabyte: [https://simple.wikipedia.org/wiki/Exabyte](https://simple.wikipedia.org/wiki/Exabyte)

• Apache: [https://www.apache.org](https://www.apache.org/)

• Netflix: [https://www.netflix.com](https://www.netflix.com/)

• Pinterest: [https://www.pinterest.com](https://www.pinterest.com/)

• AWS tenets: [https://www.amazon.jobs/content/en/teams/principal-engineering/tenets](https://www.amazon.jobs/content/en/teams/principal-engineering/tenets)

• Using lightweight formal methods to validate a key-value storage node in Amazon S3: [https://www.amazon.science/publications/using-lightweight-formal-methods-to-validate-a-key-value-storage-node-in-amazon-s3](https://www.amazon.science/publications/using-lightweight-formal-methods-to-validate-a-key-value-storage-node-in-amazon-s3)

• Apache Parquet: [https://aws.amazon.com/blogs/big-data/tag/apache-parquet](https://aws.amazon.com/blogs/big-data/tag/apache-parquet)

• What is Apache Iceberg?: [https://aws.amazon.com/what-is/apache-iceberg](https://aws.amazon.com/what-is/apache-iceberg)

• S3 Tables: [https://aws.amazon.com/s3/features/tables](https://aws.amazon.com/s3/features/tables)

• Amazon S3 Intelligent-Tiering storage class: [https://aws.amazon.com/s3/storage-classes/intelligent-tiering](https://aws.amazon.com/s3/storage-classes/intelligent-tiering)

• S3 Glacier: [https://aws.amazon.com/s3/storage-classes/glacier](https://aws.amazon.com/s3/storage-classes/glacier)

• Quorum: [https://en.wikipedia.org/wiki/Quorum\_(distributed\_computing)](https://en.wikipedia.org/wiki/Quorum_\(distributed_computing\))

• What is Automated Reasoning?: [https://aws.amazon.com/what-is/automated-reasoning](https://aws.amazon.com/what-is/automated-reasoning)

• An unexpected discovery: Automated reasoning often makes systems more efficient and easier to maintain: [https://aws.amazon.com/blogs/security/an-unexpected-discovery-automated-reasoning-often-makes-systems-more-efficient-and-easier-to-maintain](https://aws.amazon.com/blogs/security/an-unexpected-discovery-automated-reasoning-often-makes-systems-more-efficient-and-easier-to-maintain)

• How automated reasoning helps Amazon S3 innovate at scale: [https://aws.amazon.com/blogs/storage/how-automated-reasoning-helps-us-innovate-at-s3-scale](https://aws.amazon.com/blogs/storage/how-automated-reasoning-helps-us-innovate-at-s3-scale)

• AWS research on automated reasoning: [https://www.amazon.science/research-areas/automated-reasoning](https://www.amazon.science/research-areas/automated-reasoning)

• The Pragmatic Summit: [https://www.pragmaticsummit.com](https://www.pragmaticsummit.com/)

• Andy Warfield on X: [https://x.com/andywarfield](https://x.com/andywarfield)

• What is SQL?: [https://aws.amazon.com/what-is/sql/](https://aws.amazon.com/what-is/sql/)

• Amazon S3 Vectors: [https://aws.amazon.com/s3/features/vectors](https://aws.amazon.com/s3/features/vectors)

• Turbopuffer: [https://turbopuffer.com](https://turbopuffer.com/)

• Amazon Nova Multimodal Embeddings: State-of-the-art embedding model for agentic RAG and semantic search: [https://aws.amazon.com/blogs/aws/amazon-nova-multimodal-embeddings-now-available-in-amazon-bedrock/](https://aws.amazon.com/blogs/aws/amazon-nova-multimodal-embeddings-now-available-in-amazon-bedrock/)

• How AWS deals with a major outage: [https://newsletter.pragmaticengineer.com/p/how-aws-deals-with-a-major-outage](https://newsletter.pragmaticengineer.com/p/how-aws-deals-with-a-major-outage)

• Inside Amazon’s Engineering Culture: [https://newsletter.pragmaticengineer.com/p/amazon](https://newsletter.pragmaticengineer.com/p/amazon)

• Working at Amazon as a software engineer – with Dave Anderson: [https://newsletter.pragmaticengineer.com/p/working-at-amazon-as-a-software-engineer](https://newsletter.pragmaticengineer.com/p/working-at-amazon-as-a-software-engineer)

• The Pulse #144: Rare look into AWS’s PR/FAQ process: [https://newsletter.pragmaticengineer.com/p/the-pulse-144](https://newsletter.pragmaticengineer.com/p/the-pulse-144)

—

Production and marketing by [Pen Name](https://penname.co/).