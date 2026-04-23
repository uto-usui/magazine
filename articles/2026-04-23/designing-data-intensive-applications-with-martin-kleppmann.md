---
title: "Designing Data-intensive Applications with Martin Kleppmann"
source: "https://newsletter.pragmaticengineer.com/p/designing-data-intensive-applications"
publishedDate: "2026-04-22"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/SVOrURyOu_U), [Spotify](https://open.spotify.com/episode/0iJ8NpuQvAeO9Yhp41givL), and [Apple](https://podcasts.apple.com/us/podcast/designing-data-intensive-applications-with-martin/id1769051199?i=1000763097607).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** – ⁠ The unified platform for flags, analytics, experiments, and more. Stop switching between different tools, and have them all in one place.

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for code verification and automated code review. Sonar helps teams close the “architecture gap” by preventing code complexity and structural decay. [Learn how Sonar](https://www.sonarsource.com/solutions/architecture/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-sonar-architecture26&utm_content=podcast-sonar-architecture&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer) is empowering the Agent Centric Development Cycle with new architecture management capabilities that ensure both humans and AI agents respect your system’s blueprint.

• **[WorkOS](https://workos.com/)** – Designing large systems is about tradeoffs. But one thing isn’t a tradeoff: enterprise features. WorkOS gives you APIs to ship enterprise features – SSO, directory sync, RBAC, audit logs – in days, not months. Visit [WorkOS.com](http://workos.com/) to learn more.

[Martin Kleppmann](https://martin.kleppmann.com/) is a researcher and the author of [Designing Data-Intensive Applications](https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/), one of the most influential books on modern distributed systems. As of this month, the second, heavily [updated edition of the book is out](https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/).

In this episode of Pragmatic Engineer, we discuss Martin’s career in tech building startups, how he ended up writing this iconic book, and what he’s focused on, these days, after moving from industry, into academia.

We talk about the tradeoffs behind modern infrastructure, how the cloud has changed what it means to scale, and the thinking behind Designing Data-Intensive Applications, including what’s changing in the second edition.

Martin reflects on lessons from building startups like Rapportive, which he sold to LinkedIn, and shares how his experience in both academia and industry shaped his perspective.

We also explore what’s ahead: why formal verification may become more important in an AI-assisted world, the challenges of building local-first software, and his recent research into using cryptography to improve transparency in supply chains without exposing sensitive data.

Here are 12 of my most interesting takeaways from talking with Martin:

**1\. Seeing Kafka as it was built at LinkedIn heavily shaped the ideas behind the book.** Kafka (a popular event streaming platform) was open-sourced while Martin was at LinkedIn. Seeing this large system up close helped Martin build a mental model of how various data systems fit together, what they have in common, and their fundamental principles.

**2\. Martin wrote the book because he wished he had this resource when they were “drowning” in design decisions at his startup.** At Rapportive, they hit database performance problems and were searching in the dark, with no idea what to do, because they lacked foundations. Martin wrote the book, so hopefully others won’t have to learn the fundamentals the hard way that his team did.

**3\. Knowing system internals as a superpower for application developers.** Martin maintains that Designing Data-Intensive Applications is not a book for people who build databases or even infrastructure, but it’s helpful for application developers to develop an intuition for making good design decisions and debugging performance issues they will encounter.

**4\. Multi-region and multi-cloud are risk/cost trade-offs, not best practices.** Martin does not believe that there is a “best practice” in deciding whether to go multi-region or multi-cloud. This decision is a tradeoff between risk and costs. It’s a business decision to be made. Designing Data-Intensive Applications gives engineers the vocabulary to articulate the tradeoffs, not to dictate answers.

**5\. Scaling** _**down**_ **can be as challenging as scaling up**. When talking about scaling systems, most engineers associate this with scaling up. But building a system that can operate efficiently and scale down when there’s less traffic is an exciting (and challenging) problem as well! Solutions like Serverless are valuable building blocks for scaling down efficiently.

**6\. Replication for fault tolerance is more relevant these days than sharding.** Though the book has a full chapter on sharding, Martin said that the cloud has reduced the need for manual sharding for the majority of teams. This is also because machines are increasingly bigger, and more workloads fit on a single machine. Sharding across machines is increasingly a specialist concern; replication for fault tolerance, however, is still relevant at every scale.

**7\. MapReduce might be “dead,” but it is still worth knowing about.** The second edition of the book cut most MapReduce coverage because Martin observed that, these days, practically nobody uses it: technologies like Spark and Flink have replaced MapReduce. The second edition of the book has a reference to MapReduce purely as a learning tool, for understanding partitioned batch systems.

**8\. Distributed systems theory makes deliberately paranoid assumptions: this is on purpose!** The theory assumes that there’s no upper bound on how long it might take for a message to go over the network: it might arrive in 100 microseconds or 10 years. Clocks, crashes, and network delays all get similarly worst-case treatment. Occasionally, reality will hit some of these extremes!

**9\. An engineer’s job is increasingly about surfacing risks — including societal ones — to decision-makers.** Martin believes that engineers need to articulate tradeoffs in a way that enables business leaders to make informed decisions. These tradeoffs include reputational and societal risks, not just technical ones.

**10\. Formal verification was too expensive to use across the industry, and LLMs may change this.** Martin said that he never used formal verification in his time in the industry because it was too time-consuming. Now he sees two things happening at once:

-   LLMs are producing so much code that human review becomes the bottleneck
    
-   LLMs are getting good at writing formal proofs as well
    

Put both together, and we might see more formal verification happening!

**11\. Building local-first software has difficult engineering challenges.** Decentralized access control sounds trivial, but it becomes pretty hard without a single server to arbitrate. For example, a revoked user can make a concurrent edit, and different devices will disagree about what happened. Martin is currently working in this problem space.

​**12\. Industry and academia dismiss each other, and this is not great for either field!** The tech industry calls academia “theoretical” and misses useful research. Academia, in turn, often calls industry work just engineering and misses the interesting problems they solve. Martin has worked in both industry and academia, and would like to build better respect in both directions. The best PhD students he works with have a few years of real engineering experience.

• [Building Bluesky: a distributed social network](https://newsletter.pragmaticengineer.com/p/bluesky) (Martin is an advisor at Bluesky)

• [Inside Uber’s move to the cloud](https://newsletter.pragmaticengineer.com/p/uber-move-to-cloud)

• [The history of servers, the cloud, and what’s next](https://newsletter.pragmaticengineer.com/p/the-history-of-servers-the-cloud?)

• [The past and future of modern backend practices](https://newsletter.pragmaticengineer.com/p/the-past-and-future-of-backend-practices)

• [How Kubernetes is built](https://newsletter.pragmaticengineer.com/p/how-kubernetes-is-built-with-kat)

([00:00](https://www.youtube.com/watch?v=SVOrURyOu_U)) Early career

([05:46](https://www.youtube.com/watch?v=SVOrURyOu_U&t=346s)) Building Rapportive

([10:47](https://www.youtube.com/watch?v=SVOrURyOu_U&t=647s)) Working at LinkedIn

([14:09](https://www.youtube.com/watch?v=SVOrURyOu_U&t=849s)) Writing Designing Data-Intensive Applications

([23:00](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1380s)) Reliability, scalability, and repeatability

([26:24](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1584s)) DDIA: the second edition

([30:50](https://www.youtube.com/watch?v=SVOrURyOu_U&t=1850s)) Tradeoffs of using cloud services

([39:02](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2342s)) How the cloud changed scaling

([42:53](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2573s)) The trouble with distributed systems

([49:02](https://www.youtube.com/watch?v=SVOrURyOu_U&t=2942s)) Ethics for software engineers

([52:45](https://www.youtube.com/watch?v=SVOrURyOu_U&t=3165s)) Formal verification

([1:00:12](https://www.youtube.com/watch?v=SVOrURyOu_U&t=3612s)) Academia vs. industry

([1:03:50](https://www.youtube.com/watch?v=SVOrURyOu_U&t=3830s)) Local-first software

([1:09:50](https://www.youtube.com/watch?v=SVOrURyOu_U&t=4190s)) Computer science education

([1:18:32](https://www.youtube.com/watch?v=SVOrURyOu_U&t=4712s)) Martin’s current research and advice

**Where to find Martin:**

• LinkedIn: [https://www.linkedin.com/in/martinkleppmann](https://www.linkedin.com/in/martinkleppmann)

• Bluesky: [https://bsky.app/profile/martin.kleppmann.com](https://bsky.app/profile/martin.kleppmann.com)

• Website: [https://martin.kleppmann.com](https://martin.kleppmann.com/)

• Distributed Systems lecture series: [https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv\_ohr\_HdUFe97RItdiB](https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB)

• Designing Data Intensive Applications, 2nd edition: [https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058](https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058)

**Mentions during the episode:**

• Selenium: [https://www.selenium.dev](https://www.selenium.dev/)

• SauceLabs: [https://saucelabs.com](https://saucelabs.com/)

• Rapportive on YC’s website: [https://www.ycombinator.com/companies/rapportive](https://www.ycombinator.com/companies/rapportive)

• Kafka: [https://engineering.linkedin.com/teams/data/data-infrastructure/streams/kafka](https://engineering.linkedin.com/teams/data/data-infrastructure/streams/kafka)

• The Log: What every software engineer should know about real-time data’s unifying abstraction: [https://engineering.linkedin.com/teams/data/data-infrastructure/streams/kafka](https://engineering.linkedin.com/teams/data/data-infrastructure/streams/kafka)

• Materialized View:

• The Missing README: A Guide for the New Software Engineer: [https://www.amazon.com/Missing-README-Guide-Software-Engineer/dp/1718501838](https://www.amazon.com/Missing-README-Guide-Software-Engineer/dp/1718501838)

• How AWS S3 is built: [https://newsletter.pragmaticengineer.com/p/how-aws-s3-is-built](https://newsletter.pragmaticengineer.com/p/how-aws-s3-is-built)

• MapReduce: [https://en.wikipedia.org/wiki/MapReduce](https://en.wikipedia.org/wiki/MapReduce)

• Prediction: AI will make formal verification go mainstream: [https://martin.kleppmann.com/2025/12/08/ai-formal-verification.html](https://martin.kleppmann.com/2025/12/08/ai-formal-verification.html)

• Isabelle proof assistant: [https://isabelle.in.tum.de](https://isabelle.in.tum.de/)

• Rocq: [https://rocq-prover.org](https://rocq-prover.org/)

• Lean: [https://lean-lang.org](https://lean-lang.org/)

• TLA+: [https://github.com/tlaplus](https://github.com/tlaplus)

• FizzBee: [https://fizzbee.io](https://fizzbee.io/)

• Local-First Software: You Own Your Data, in spite of the Cloud: [https://martin.kleppmann.com/papers/local-first.pdf](https://martin.kleppmann.com/papers/local-first.pdf)

• How AI assistance impacts the formation of coding skills: [https://www.anthropic.com/research/AI-assistance-coding-skills](https://www.anthropic.com/research/AI-assistance-coding-skills)

• Cryptography: [https://en.wikipedia.org/wiki/Cryptography](https://en.wikipedia.org/wiki/Cryptography)

—

Production and marketing by [Pen Name](https://penname.co/).