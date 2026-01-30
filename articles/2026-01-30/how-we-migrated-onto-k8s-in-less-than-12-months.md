---
title: "How we migrated onto K8s in less than 12 months"
source: "https://www.figma.com/blog/migrating-onto-kubernetes/"
publishedDate: "2024-08-08"
category: "design"
feedName: "Figma Blog"
---

At high-growth companies, resources are precious. At Figma, we need to be sure that any decision we make—whether it’s about user-facing features or back-end infrastructure—will leave the platform in a better position than when we started. The larger and more resource-heavy the workstream, the more confident we need to be that we’ll be able to complete the effort in a reasonable timeline without causing downtime to users. That’s why we didn’t take the decision to migrate our core services to Kubernetes lightly. Here’s a look at our process of evaluating, scoping, and executing the move.

## [On Figma’s compute platform](#on-figma-s-compute-platform)

By early 2023, we had already done the hard work of running all of our services in containers. At the time, we used AWS’s Elastic Container Service (ECS)—a great off-the-shelf way to quickly spin up containerized workloads—as our orchestration platform. We grew a team to build out this important domain, which allowed us to think more proactively about the projects we wanted to take on to set us up for the long term.

At this point, it was time to think anew about the next generation of what we call our compute platform, the platform that enables teams to own and operate services at Figma. We considered building on top of what we already had in ECS, but doing so would make it harder to build many of the features on our wishlist. We wondered: Were we iterating toward a local maximum instead of the global maximum?

More broadly, we’re not a microservices company, and we don’t plan to become one. While we sometimes uncover use cases that warrant entirely new services for isolation or performance reasons—like when we introduced a service to manage calls to various AI inference engines—we have a powerful set of core services that provide a base level of modularization and traffic isolation out of the box. This means that we’re often able to support new products by adding logic within these services, without creating new services. The idea of migrating to Kubernetes was much more digestible knowing that we don’t run thousands of services that we’d need to migrate.

### [Missing Kubernetes functionality](#missing-kubernetes-functionality)

So what are some of these limitations of ECS? First, service owning teams with increasingly complex needs were starting to spend a lot of engineering hours working around some of the limitations of the ECS platform. The most egregious example was figuring out a way to run [etcd](https://etcd.io/), a strongly consistent consensus data store, on ECS. Since ECS doesn’t support [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), a Kubernetes primitive which allows persistent identity of pods, we instead came up with a way to wrap custom code into the etcd container startup to dynamically update cluster membership. This code proved fragile and hard to maintain. By contrast, the norm is to utilize StatefulSets' ability to provide stateful network assignment when running an etcd cluster on Kubernetes.

Another limitation is a lack of support for running a set of services defined via [Helm charts](https://helm.sh/), a popular way to package and distribute open source software (OSS) on Kubernetes. Various teams at Figma increasingly wanted to run OSS software (like [Temporal](https://temporal.io/), a workflow execution tool), but these would be hard to install and maintain on ECS; we’d have to manually port every service to be defined in [Terraform](https://www.terraform.io/), a tool to write infrastructure as code via a domain specific language.

We also encountered many smaller paper cuts, like attempting to gracefully terminate a single poorly behaving EC2 machine when running ECS on EC2. This is easy on Amazon’s Elastic Kubernetes Service (EKS), which allows you to simply cordon off the bad node and let the API server move the pods off to another machine while respecting their shutdown routines.

### [Access to the Cloud Native Computing Foundation ecosystem](#access-to-the-cloud-native-computing-foundation)

In addition to the missing functionality, running on ECS meant we were missing out on all the open source technology in the Cloud Native Computing Foundation (CNCF) ecosystem. As we turned our attention to the next generation of compute platform, auto-scaling was top of mind. At the time we did not auto-scale any of our containerized services and were spending a lot of unnecessary money to keep services provisioned such that they could always handle peak load, even on nights and weekends when our traffic is much lower. While there is some support for auto-scaling on ECS, the Kubernetes ecosystem has robust open source offerings such as [Keda](https://keda.sh/) for auto-scaling. In addition to simple triggers like CPU utilization, Keda supports scaling on the length of an [AWS Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) queue as well as any custom metrics from Datadog.

We felt it was likely that we’d adopt some form of service mesh down the line. We were routing our traffic between services through AWS Application Load Balancers (ALBs) and Network Load Balancers (NLBs), and these have some painful drawbacks. For example, registering new targets and removing old targets takes several minutes on NLBs. This slows down how quickly we can perform emergency deploys, which increases the mean time to remediation of incidents. In addition, Envoy is generally much more customizable and allows us to run custom filters. We had already set up a cluster of standalone Envoy machines running as a proxy in front of a major service so that we could employ a custom filter to shed load during incidents. We suspected that in the long term, we would want to run Envoy as a mesh across our entire fleet. In the EKS world there are a lot of open source options—like Istio—but in ECS, we would have to painfully rebuild a lot of the same functionality ourselves.

Beyond these two examples, the CNCF ecosystem is constantly evolving and improving. We suspect that both Kubernetes itself and the broader ecosystem will see significantly more investment than Amazon will be able to put into ECS in the upcoming years given the broad, vendor-agnostic user base of Kubernetes.

### [Advantages to being on a popular platform](#advantages-to-being-on-a-popular-platform)

We try not to be the biggest users of any service or software; those users find more rough edges than anyone else, and they’re often the first to hit scaling limits and challenges. With Kubernetes, we’re far from it. In fact, many large companies run huge compute platforms on Kubernetes, and that gives us confidence that they are de-risking the platform for everyone else—particularly those running smaller setups.

In addition, running on Kubernetes helps to avoid vendor lock-in. It’s always easier in the long run to find the best vendor and price point for running your compute if you have the flexibility to move between providers. EKS provides a nice middle ground: We get the advantages of having a vendor supported control plane, but because all of our services are written to run generically on Kubernetes, the lift to move to another vendor-supported Kubernetes platform—or a self-hosted one—wouldn’t be particularly high.

Lastly, while we think we can hire a lot of great, versatile engineers to work with basically any stack or technology, we are able to hire people with a lot more prior experience running on Kubernetes. That lets them hit the ground running and bring a lot of context to what would otherwise be novel decisions for us.

## [Scoping the migration](#scoping-the-migration)

We were convinced that, if tractable, the migration would leave Figma’s compute platform in a significantly better position. The next step was to make sure that we could pull off the migration in a reasonable amount of time.

The key was to be really careful about what we scoped into the migration. The safest scoping for a major migration limits the changes to the core system you want to swap out, and keeps the abstraction the same for all users of the platform. In this case, that meant moving everything to run on EKS instead of ECS, but changing nothing about how they run, how they are deployed, or how tooling to interact with services looks. The reason this is so effective is because anything that changes—even things that feel nonfunctional—has second order effects. Usually these second order effects are what end up blowing up the timelines for large migrations.

There are two exceptions to this rule:

-   Sometimes it takes extra work to build the new system such that it performs as the old system did. In these cases, it might be worth burning through the second order effects rather than taking on the extra work. In our case this didn’t occur too much because EKS functionality is largely a superset of ECS functionality; therefore we could support most of the things we had on ECS without a lot of additional work.
-   Some decisions are one-way doors, or expensive to change later. In these cases it may be worth doing something new from the start.

Even tightly scoped, the migration would require meaningful time and resources. Before diving into the migration, we set out to identify a few key wins that it would enable.

### [Improvements we scoped into the migration](#improvements-we-scoped-into-the-migration)

#### [Developer experience](#developer-experience)

Previously, developers created or modified the definition of an ECS service primarily through Terraform. When applied, Terraform code would spin up a template of what the service should look like by creating an ECS task set with zero instances. Then, the developer would need to deploy the service and clone this template task set, substitute in the appropriate image hash, and deploy this new task set with a nonzero number of instances to ECS. This meant that something as simple as adding an environment variable required writing and applying Terraform, then running a deploy. Not only was this a cumbersome process, it had to be sequenced in exactly this order before you could safely use the env var in code—a dependency many of us forgot in the moment which led to many bugs.

Instead, in EKS we decided that services should be defined in a single place and changes should be deployed in a single step. We created a simple internal way to define a service via a Bazel configuration file and then automatically generated the service definition [YAMLs](https://yaml.org/) (a human-friendly data serialization language) as well as YAMLs for other aspects of the service like the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) objects. These were generated via our continuous integration tooling when the code was committed and applied via our in-house deploy system. This was an easy change in behavior to prioritize as it is covered by both exceptions above. It would have been a lot of effort to maintain the prior status quo—using our old Terraform setup to generate services—and it would have made for challenging migrations if we wanted to move away from it at some point.

#### [Improved reliability](#improved-reliability)

We improved the reliability of services running on EKS by having three separate EKS clusters actively running pods and receiving traffic for each service. If all operations occurred cluster by cluster, we could reduce full outages to a third of service. Particularly for services that can support retried requests or run async, this often results in minimal disruption for users. We’re happy to report that we have seen multiple examples of bugs and operator errors where the blast radius was significantly reduced by this setup.

This was, however, significantly more complex to build and run and increased the complexity of things like our deploy pipelines. We decided it was worth it to migrate directly to it rather than having to add this in later. It also aligned well with one of the main goals of the infrastructure organization at Figma: making Figma more reliable.

#### [Cost efficiency](#cost-efficiency)

We didn’t want to tackle too much complex cost efficiency work as part of this migration, with one exception: We decided to support node auto-scaling out of the gate. For our ECS on EC2 services, we simply over-provisioned our services so we had enough machines to surge up during a deploy. Since this was an expensive setup, we decided to add this additional scope to the migration because we were able to save a significant amount of money for relatively low work. We used the open source CNCF project [Karpenter](https://karpenter.sh/) to scale up and down nodes dynamically for us based on demand.

### [Work we kept out of scope](#work-we-kept-out-of-scope)

We had an overly complex logging pipeline. It first wrote all logs to Cloudwatch, and then a lambda would read them and perform some transformations such as redacting certain patterns and adding specific tags. This lambda then wrote them to Datadog and Snowflake. The intermediate storage on Cloudwatch was getting expensive. We planned to introduce [Vector](https://vector.dev/), a CNCF project which lets you run a sidecar that can process and forward logs in the EKS stack. We knew we had an opportunity to replace the log forwarding, but we decided this was not worth the upscope in the migration. We didn’t want to risk the potential second order effects of porting all the logic in the log forwarder into the Vector configuration; we could easily tackle this later. In another example, we didn’t scope any pod level autoscaling into the migration. We felt this would add too much complexity to the migration, and this was also something we could easily add later on.

Both of these cases became fast-follows that we recently tackled. This allowed us to add these improvements even while working on migrating other services to EKS. This pipelining of workstreams ended up being an effective way to provide incremental benefits to our users and the company without upscoping the migration process. Plus, it allowed us to de-risk the initial migration as quickly as possible.

![A timeline on a teal background with time intervals in purple that identify the quarter, from Q1 2023 to Q1 2024. The timeline intervals explain the part of the Kubernetes migration the team focused on at the time.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABLElEQVQokZWS6W6DMBCE8/4PlKpp0twNBPgXpBwcxoTbwCNMtWvchqpq1B+j/WzGo13jidf38Loebtc9lTfifsRer9cTA27dwskUnKqFY7h84OKRlfbniuWqDm6vwycMbQs7r3EQJaysYh3iElY6MO3LH5xXsBItu2rgdu13h8emwS69YxNLXROJVSi4ao6xjhOsRYJVJLAREluZfvGhLOG0D4FWVWERhphdL1gJgfnthhffxzwImKe+j9fzmZk871GEZRRhdiEO+by5Tx1Y1zrwogPfrldMTycsggDLOOYgqts0Ze3zHLv7nb37LIOj1PinHJXCLsuwkZKNJoTWNA51QNfCYw2jEdM5sx51yAal2EAHKeSjKGA3dNnD06Dn9YeMhwN/+/hfmZE/Ack1hoWMhn4BAAAAAElFTkSuQmCC)![A timeline on a teal background with time intervals in purple that identify the quarter, from Q1 2023 to Q1 2024. The timeline intervals explain the part of the Kubernetes migration the team focused on at the time.](https://cdn.sanity.io/images/599r6htc/regionalized/94257d8b0e2d25b1a95aa31c67c92c22566cd8bb-2160x926.png?rect=1,0,2158,926&w=804&h=345&q=75&fit=max&auto=format)

## [Performing the migration safely](#performing-the-migration-safely)

Once we scoped the migration to a feature set that we could deliver on, we had to decide how to safely execute such a large migration. Our ECS stack was relatively stable, so we needed to make sure that both the migration itself and the less tested novel stack could be at least as reliable. We stuck to a lot of tried and true engineering concepts, but they are worth exploring because they allowed us to do this migration with very little disruption to users. We’ve translated them to a set of principles for anyone planning a similar migration.

### [Invest in load testing](#invest-in-load-testing)

This was key to making sure we understood how our cluster functioned at scale and what unexpected scaling problems we would hit during the actual migration. We created a “Hello, World” service and scaled it up to run the same number of pods as the largest services at Figma. From this, we found that we had to tune the size and scale of many of the core compute services that we had introduced to support the overall platform. [Kyverno](https://kyverno.io/), a tool used for cluster security assertions, is a good example of this. If Kyverno isn’t sized sufficiently, it can slow down the start-up of new pods.

### [Identify a mechanism for incremental rollout](#identify-a-mechanism-for-incremental-rollout)

Weighted DNS entries allowed us to incrementally shift traffic from an existing ECS service to its EKS equivalent. Having that fine grained control for shifting or reverting traffic was key to a safe migration. We knew we would run into unexpected impacts on systems, often at various unknown inflection points, and we needed to be able to isolate the effects to as minimal a surface area as possible and rollback quickly.

### [Run a real service in a staging environment—early](#run-a-real-service-in-a-staging-environment-early)

Putting real workloads on the system will help you learn so much that you can’t understand in staging alone. We even migrated one of our services over before we had finished building the staging environment, and it turned out to be well worth it; it quickly derisked the end to end ability to effectively run workloads and helped us identify bottlenecks and bugs.

### [Keep raw Kubernetes YAMLs from users](#keep-raw-kubernetes-yamls-from-users)

Having users define services directly in YAML can be confusing. Instead, we worked to define a golden path for users and allow customization for special cases. By being explicit about what users can and should customize—and otherwise enforcing consistency by default—you’ll save users time and energy while also simplifying maintenance and future changes.

### [Work closely with service owners](#work-closely-with-service-owners)

We took care of setting up the new service configuration, but we collaborated closely with service owners on updating monitoring and alerting since they know best how to understand the health of their service. We also spent extensive time talking through various options and tradeoffs with service owners before making the original call to start the migration. Getting their buy-in early helped validate our hypothesis and ensured they saw the value in helping with the complex process.

### [Staff accordingly](#staff-accordingly)

A migration of this scale often results in unforeseen challenges and requires a lot of team cycles. We knew there would inevitably be problems with the new platform, complex interactions, and general bugs that would require deep technical expertise and debugging capability, so we made sure we had a team that could tackle those challenges.

## [Our migration](#our-migration)

After formulating this plan over the course of Q1 2023, we got buy-in to proceed with the migration. In Q2, we were able to set up a staging environment and migrate a single service to run on it. In Q3, we focused on productionalizing, running the load tests, and getting more services ready to migrate. And, in Q4 and into the first weeks of January, we slowly cut traffic over for these services.

By January 2024, we had migrated a majority of our highest priority services to the new EKS clusters. This includes our monolith containing core business logic, one of our [most complex services which handles all the multiplayer aspects](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

of Figma file edits, and the suite of services that comprise our

[new Livegraph 100x

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACtUlEQVQokVWTS28bZRSGvWHFhj8BQuoesQOxZYnUH1EkFrBBiAXqBsECFRUJKa18GXviuXwz49jxeGb8zc0NqSok2hKjOhcbmthN7MZx7nXSVk9ll4tYvDqLIz16dfScTOGXF8yirL58PdMpmjxHBGfzaN4xJfcArf4Uyx0j/BNE8N/eDE7R/RNUeYZy55LMHPI3NH/ngpI8oVY/Jqge4laGLIttXH0D19ykbvdwK3sES0c0l44JKkf4zgS3MsFunFBML/4PzKbnqMEYb2lIYvbxjXX8cpuouEaz3KFhdvBFj1CMiI19Ym2PxBgRWQfU6keUkikZZXUGez5vl01OKQYj6laPVG0Tl9uExhZSf4w0d5FWHym6hGJArPVJi49o6T0Sp8/y8gg1OidTWH1JfuU52dYludYUtbmPa3dplf8g1bcIzQFN88m8VWTuEVt/ktg7xEYXqf5KYjwktjssVfso0RmZwsoFuWRCLhqRj4dojR6e/ZDYfEDT2MDTBwTGE0JzSCyGpNY2qfMYaXVwzftIs40U61i1Afl41jB5ilJvookFnOJN3IUfCBe+Ryo/4i1W8MqbBMYukbVDy+rTEjvE4i+k1UNaA0KxSyB2cOpDlOQZGSXaQhfX8X7+kN++usLWtXf4/csrhD99gKt8jWc8wLOHSLFBaLTxzXUaootnbePbYzx7gmsPcRoHlNIpmWLYQRifE914m+61N5lcfYPNT98ivPEuFfUzrOp9LPcQx+kixBqlygbl6jZGdZfF2hht+RDDnVBunr72UIl66PZ31Bc+5t4377P2xXvcvf4RtVufoJnfoviP5rcpyAm55j635QHZ6Jh8dEo2PiefPKOQTuewmXqZQjqm2EhZdBQM7RamehtNz6M6iyhuTC7aI9uazg3Ir1zOjZjlnw/7NzP9Vl/wCoZTwniYBq6HAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/dab0aeb9516eba9f8a68af25582c89baff3b28ab-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Keeping it 100(x) with real-time data at scale

After years of playing catch-up with Figma’s growth, it was time to fundamentally rethink LiveGraph’s architecture.



](https://www.figma.com/blog/livegraph-real-time-data-at-scale/)

setup for pushing real time updates to all clients. We’ve seen a number of benefits: saving money by not over provisioning for deploys; being more reliable running on three clusters; and improving developer ergonomics. We’re also excited by what else we can do for these services as we expand the platform.

All of this was done with only minor incidents and with little customer impact. Some of this resilience can clearly be attributed to our new three cluster setup. We had an incident where an operator accidentally performed an action which destroyed and recreated CoreDNS on one of our production clusters. Previously, an incident like this would have resulted in a full outage. But with three clusters, the impact was limited to a third of requests, and when most downstream services retried their requests, they eventually succeeded.

### [The post-launch period](#the-post-launch-period)

We had created tooling to help service owners debug what was happening in the clusters—to see how many instances were running, to shell into containers, and to perform emergency operations like scaling. Shortly after launch we received feedback that this access tooling wasn’t user friendly enough.

When we dug in, we realized that two things had made this tooling too complex for users. First, the introduction of the three clusters meant users had to run commands across multiple clusters and add cluster names to all their commands. Second, during the migration, we had partnered with our security team to provide more granular permissions, leaning on the newly available RBAC roles of Kubernetes. This made the platform more secure and satisfied the principle of least privilege. However, it meant users had to understand which roles they had and which roles they needed for specific tasks. Thankfully, both of these issues were easily addressable, so we immediately paused other work and updated the tooling to automatically infer the right cluster and role. This meant that users didn’t have to waste time searching for those roles, particularly while solving emergencies in the middle of the night.

## [What’s next](#what-s-next)

Outside of this immediate follow-up, we’re now focused on parallel tracking a number of improvements to our new compute platform while continuing to migrate the remaining services. We’ve focused on simplifying design for our logging pipeline, supporting horizontal pod auto-scaling via Keda, and migrating the most expensive service at Figma to Graviton processors to save money and create a path for future services to also run on Graviton.

We’re very excited to more deeply explore some of the areas we haven’t had a chance to invest in yet. We think there is a lot of opportunity to improve both the reliability and observability of our networking stack, likely by exploring service mesh offerings. We also want to see if we can even further simplify and unify our stack by moving more resources out of Terraform and managing them with AWS Controllers for Kubernetes (ACKs). Lastly, we plan to work with our developer experience team to unify how we run services in development with how we run them in other environments.

We’re always looking for ways to build long-term, sustainable solutions for Figma. If this type of work sounds interesting to you, check out our open roles—[we’re hiring](https://www.figma.com/careers/#job-openings)!