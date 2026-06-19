---
title: "CI/CD with Robert Erez"
source: "https://newsletter.pragmaticengineer.com/p/cicd-with-robert-erez"
publishedDate: "2026-06-17"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/2x0eq5oDOJY), [Spotify](https://open.spotify.com/episode/0U7CodzNgOe0PxLHmRYfmo), and [Apple](https://podcasts.apple.com/us/podcast/ci-cd-with-robert-erez/id1769051199?i=1000773146557).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!YCsL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

](https://substackcdn.com/image/fetch/$s_!YCsL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

**• [Antithesis](https://antithesis.com/pragmatic)** – if you're using agents to code, the problem isn't writing the code but making sure it didn't break anything. Antithesis goes beyond code review and runs your whole system in faster than real-time and identifies hard to find bugs before your users hit them in production. Antithesis enables teams like Jane Street, Fly.io, and the etcd community to use agents safely and ship better code, faster. [Learn more](https://antithesis.com/pragmatic)

**• [WorkOS](https://workos.com/)** – make your app and agents Enterprise Ready, with SSO, SCIM, RBAC, and more. [Get started.](https://workos.com/)

**• [turbopuffer](https://turbopuffer.com/pragmatic)** – a vector and full-text search engine built on object storage. It’s fast, cheap, and extremely scalable. The teams building the smartest AI products out there — Cursor, Notion, Cognition, Anthropic — they [all run on turbopuffer](https://turbopuffer.com/pragmatic).

Robert Erez is a principal engineer at Octopus Deploy, and a longtime expert in CI/CD, deployment systems, and software delivery. Rob and I were also once colleagues on the Skype web team, working on large-scale deployments and release processes.

In this episode of _The_ _Pragmatic Engineer_, I sit down with Rob to discuss how teams deploy software safely and efficiently at scale. We cover Kubernetes, GitOps, platform engineering, progressive delivery, feature flags, cloud development environments, and the growing role of AI in CI/CD workflows. We also get into the tradeoffs in different deployment approaches, why self-hosted software still matters for some organizations, and the recent evolution of software delivery practices.

Here are 10 interesting takeaways from our chat:

**1\. Roll forward, never backwards.** When a system has state – which typically means it uses databases – then doing a rollback can leave the code talking to a schema that’s no longer in sync. Rob’s advice is to not treat a failure in v2 as a trip back to v1, but rather as a push to v3 with the fix in it.

**2\. GitOps isn’t actually about Git.** None of the four pillars of GitOps – 1) declarative, 2) versioned and immutable, 3) pulled, not pushed, 4) continuously reconciled – require Git, although Git can work under these constraints. Yet, the term ‘GitOps’ has made the industry dogmatic about cramming _everything_ into a repo – even things like secrets that absolutely shouldn’t be there!

**3\. Continuous deployment can be overkill; continuous delivery is more practical.** Shipping every single change to prod (continuous deployment) is not as necessary as many people think, Rob says, and there’s often more value in continuous delivery, where changes flow through testing and the deployment process itself is validated. With continuous delivery, you can decide whether to push to production automatically, or click a button once a week.

**4\. Feature toggles are a better safety net than rollbacks.** When something breaks in production, reaching for a toggle to switch a feature off enables you to “stop the bleeding” and then calmly diagnose an issue. Rolling back a feature flag is less nerve-jangling than scrambling to force a redeployment in the middle of the night!

**5\. One problem with feature flags is that they’re addictive.** On the other hand, the ease with which feature flags are added can create a hygiene crisis if they’re continuously added, but not removed. Treat feature-toggle cleanups like a form of gardening and “weed” rolled-out toggles from the codebase.

**6\. A Git repo can be a bottleneck at scale.** Rob mentions that some companies run thousands of independent Kubernetes clusters that pull state from a Git repository. But such clusters can get throttled by the repo, forcing them into workarounds. Pull-based GitOps doesn’t scale infinitely for free.

**7\. A sizable number of major institutions remain on-prem – and this won’t change.** Banks, other financial bodies, and governments, demand full control over their hardware, upgrades, and downtime. That’s why Rob expects this segment won’t move to cloud-based SaaS.

**8\. Platform teams work at larger companies.** These teams earn their keep in big organizations with multiple teams and projects because they offer ways of bringing sanity and focus.

**9\. There’s a trend of ephemeral environments replacing test/staging environments.** Companies used to have a few testers fighting over a handful of static test environments, but today, it’s trivial to spin up a full environment, per-feature branch, pre-merge. This is an “ephemeral” environment for evaluating that things work, which is then torn down once something is merged. It helps speed up the feedback process.

**10\. AI shifts the CI/CD calculus from speed to risk.** Today, shaving ten minutes off the CI build-time matters because a long-running build blocks human devs. But this time saving will be insignificant when an AI agent writes most of the code and “babysits” a slow pipeline without context switching. Then, the new priority will be to reduce the risk of an AI agent shipping a bug to production, so it will make much more sense to run extra, more thorough, tests – and also even slower ones.

**•** [Kubernetes and retiring at the top](https://newsletter.pragmaticengineer.com/p/kubernetes-and-retiring-at-the-top) with Kelsey Hightower

**•** [The past and future of modern backend practices](https://newsletter.pragmaticengineer.com/p/the-past-and-future-of-backend-practices)

**•** [Microsoft is dogfooding AI dev tools’ future](https://newsletter.pragmaticengineer.com/p/microsoft-ai-dev-tools)

**•** [How Kubernetes is built](https://newsletter.pragmaticengineer.com/p/how-kubernetes-is-built-with-kat) with Kat Cosgrove

**•** [How Linux is built](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah) with Greg KH

[00:00](https://www.youtube.com/watch?v=2x0eq5oDOJY) Intro

[02:09](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=129s) Canary deployments at Skype

[05:01](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=301s) Joining at Octopus Deploy

[06:15](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=375s) Continuous deployment

[10:26](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=626s) Why Kubernetes won

[15:51](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=951s) Kubernetes on-prem

[18:50](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=1130s) How GitOps works

[25:00](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=1500s) The uses and limitations of GitOps

[31:04](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=1864s) The rise of platform teams

[35:51](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=2151s) How AI is changing CI/CD

[39:49](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=2389s) Progressive delivery explained

[47:31](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=2851s) Rollbacks and roll-forwards

[50:14](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=3014s) Feature flags

[54:32](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=3272s) How development environments are evolving

[57:40](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=3460s) Cloud development environments (CDEs)

[1:03:45](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=3825s) Self-hosting CI/CD

[1:09:25](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=4165s) Getting started with progressive delivery

[1:11:15](https://www.youtube.com/watch?v=2x0eq5oDOJY&t=4275s) Book recommendations

**Where to find Robert Erez:**

• X: [https://x.com/no\_erez](https://x.com/no_erez)

• LinkedIn: [https://www.linkedin.com/in/roberterez](https://www.linkedin.com/in/roberterez)

**Mentions during the episode:**

• Skype: [https://en.wikipedia.org/wiki/Skype](https://en.wikipedia.org/wiki/Skype)

• Canary deployments: [https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/canary-deployments.html](https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/canary-deployments.html)

• Octopus Deploy: [https://octopus.com](https://octopus.com/)

• Paul Stovell on LinkedIn: [linkedin.com/in/paulstovell](http://linkedin.com/in/paulstovell)

• Kubernetes: [https://kubernetes.io](https://kubernetes.io/)

• How Kubernetes is Built with Kat Cosgrove: [https://newsletter.pragmaticengineer.com/p/how-kubernetes-is-built-with-kat](https://newsletter.pragmaticengineer.com/p/how-kubernetes-is-built-with-kat)

• Kubernetes and retiring at the top with Kelsey Hightower: [https://newsletter.pragmaticengineer.com/p/kubernetes-and-retiring-at-the-top](https://newsletter.pragmaticengineer.com/p/kubernetes-and-retiring-at-the-top)

• Docker: [https://www.docker.com](https://www.docker.com/)

• HashiCorp: [https://www.hashicorp.com](https://www.hashicorp.com/)

• Mitchell Hashimoto’s new way of writing code: [https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto](https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto)

• Terraform: [https://developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform)

• GitOps: [https://about.gitlab.com/topics/gitops/](https://about.gitlab.com/topics/gitops/)

• Cursor: [https://cursor.com](https://cursor.com/)

• _The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win_: [https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592](https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592)

• _Radical Candor: Be a Kick-Ass Boss Without Losing Your Humanity_: [https://www.amazon.com/Radical-Candor-Kick-Ass-Without-Humanity/dp/1250103509](https://www.amazon.com/Radical-Candor-Kick-Ass-Without-Humanity/dp/1250103509)

• _Diaspora_: [https://www.amazon.com/Diaspora-Novel-Greg-Egan/dp/1597805424](https://www.amazon.com/Diaspora-Novel-Greg-Egan/dp/1597805424)

• _Schild’s Ladder_: [https://www.amazon.com/Schilds-Ladder-Novel-Greg-Egan/dp/1597805440](https://www.amazon.com/Schilds-Ladder-Novel-Greg-Egan/dp/1597805440)

• _The Clockwork Rocket: Orthogonal Book One_: [https://www.amazon.com/Clockwork-Rocket-Orthogonal-Book-One/dp/0575095148](https://www.amazon.com/Clockwork-Rocket-Orthogonal-Book-One/dp/0575095148)

—

Production and marketing by [Pen Name](https://penname.co/).