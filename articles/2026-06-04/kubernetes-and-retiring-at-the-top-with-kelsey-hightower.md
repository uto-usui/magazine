---
title: "Kubernetes and retiring at the top with Kelsey Hightower"
source: "https://newsletter.pragmaticengineer.com/p/kubernetes-and-retiring-at-the-top"
publishedDate: "2026-06-03"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/UlXpOGIpITM), [Spotify](https://open.spotify.com/episode/25qDLvBsunU9WJ3YpiftCG), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!HVBB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a9e89e3-866b-4248-91a9-e6461be25cd8_1497x131.png)

](https://substackcdn.com/image/fetch/$s_!HVBB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a9e89e3-866b-4248-91a9-e6461be25cd8_1497x131.png)

**• [Antithesis](https://antithesis.com/pragmatic)** – managing infra has gone through a mindset shift: from an imperative approach (with the likes of Puppet and Ansible) to a declarative one (with the likes of Terraform and Kubernetes). Software development is going through a similar shift with AI agents – and Antithesis is the declarative testing tool that can keep up with these AI agents. [Learn more](https://antithesis.com/pragmatic)

**• [Buildkite](https://buildkite.com/pragmatic)** – the CI used by companies like OpenAI, Anthropic, Uber, Shopify, Airbnb, Ramp and many more. Buildkite was stress-tested at the largest scale inside companies solving some of the hardest engineering problems. It’s built to absorb whatever your coding agents throw at the build queue, today. [Learn more.](https://buildkite.com/pragmatic)

**• [Sentry](http://sentry.io/pragmatic,)** – application monitoring software built by developers, for developers. With Sentry MCP and CLI, set up a helpful flow like “when a production error fires, have an agent investigate it, pulling all the error context that Sentry already has. [Check out Sentry](http://sentry.io/pragmatic,)

Kelsey Hightower went from a self-taught technician installing DSL modems to becoming one of Google’s elite Distinguished Engineers, whom the CEO of Microsoft personally tried to recruit. Hightower’s career achievements are rooted in hard work and self-directed learning, and today he’s one of the most influential voices in modern infrastructure, through his talks, open source work, and writing.

In this episode of The _Pragmatic Engineer podcast_, Kelsey and I cover his unconventional path into tech and the lessons he’s learned during three decades in the industry. We discuss his entrepreneurial years, building a reputation through open source, the rise of containers and Kubernetes, and his time at Google during one of the most consequential periods in cloud computing.

He recounts how a job offer from a big tech giant led to the biggest raise of his career, what prompted him to slow down after years of career acceleration, and we also discuss his perspective on AI. Throughout, Kelsey keeps a simple idea front of mind: that technology is ultimately about people. Whether it’s infrastructure, leadership, careers, or AI, he argues that the goal is not to build technology for its own sake; it’s to solve meaningful human problems.

This is a long episode with many compelling, previously unshared stories. As such, there’s a lengthier-than-usual list of 15 interesting takeaways.

**1\. Kelsey’s career path is incredibly inspiring.** From modest beginnings with no role models in technology, Kelsey worked his way up from technician, to software engineer, and grew into one of the most respected Distinguished Engineers at Google. His drive to improve and to always do his very best work is infectious. My sense is Kelsey would never be satisfied with “good enough” and has always aimed for standout work. This approach is rare and has opened doors that stay closed to average work.

**2\. Treat every public talk like a job interview.** Kelsey’s career inflection points often came from people in audiences offering him jobs. He joined CoreOS because the team watched him PXE-boot CoreOS live on stage; afterwards, they wanted to recruit him.

**3\. “Some people have 20 years’ tenure – but only one year of experience.”** Doing the exact same work for years does not advance your skillset. For example, Kelsey observed people in a call center doing identical manual, ticket-closing work for two decades, who never thought of automating themselves out of even some of it. Kelsey started doing this almost immediately and gained valuable new experience.

**4\. Side hustles and doing your own thing teach you business like no IC job can.** Before becoming a software engineer at Google, Kelsey was a manager for his comedian friend, operated a computer store, and did IT contracting. These gigs taught him logistics, planning, and about money. All this helped him be far more effective at talking with executives and acting as an executive sponsor inside Google.

**5\. Business owners get paid last, but not employees.** Kelsey ran a computer store in Atlanta that did well, but he closed it down to become an employee. As he puts it: “Employees get paid first, the owner gets paid last, and there are months where you get paid last, or you don’t get paid at all.” Kelsey hit a point in his life where he valued the predictability of a salary over volatile income.

**6\. Leading without influence: don’t tell people the answers, let them be discovered.** Kelsey knew that Kubernetes was difficult to onboard and needed the Kubernetes team’s help to fix it. To get this done, he got the Kubernetes team to install K8s with no scripts, watched them struggle, and then guided them to what was missing. After people discovered the problems themselves, they set about fixing them. Kelsey noted that people uncovering problems on their own works better than an issue being handed down to them.

**7\. Can you explain what your startup does without mentioning AI?** When Kelsey researches startups seeking his advice, he challenges founders to not say “AI” once. This means that they must explain the _actual_ value their company creates. One unexpected benefit of this is that it often reveals there are easier, cheaper ways to achieve a goal than with AI.

**8\. “Look in the mirror”: AI’s impact on the software engineering profession.** Kelsey says that when complaining about AI, engineers should bear in mind how their industry has disrupted and displaced jobs in other parts of the economy. It might be one reason why affected software engineers get seemingly little public sympathy.

**9\. Don’t let agents run loose on raw infra; provide guardrails and context.** As Kelsey puts it, “I’ve seen what humans do when you just give them the AWS console. Watch what Claude’s going to do!”

**10\. It’s okay to interview when you’re happy in a job. Just put your ego aside and check out the market.** Kelsey wasn’t looking and didn’t want to bother, but his wife pushed him, saying Kelsey should see what’s out there. She was right!

**11\. It’s very rare to get an extra zero put on your compensation figure – but it happened.** Kelsey was a successful, well-paid Google engineer when Microsoft made him an offer that 10x’d his compensation. When Kelsey told Google he was planning to take the offer, it matched the offer, proving that his market value had massively increased. It shows that being well paid doesn’t necessarily mean you’re being paid at the correct market rate.

**12\. Satya Nadella: “We gave you an offer as if you were running away from something. We should have given you something to run towards.”** Microsoft’s CEO himself acknowledged that when trying to recruit Kelsey, the Windows maker should’ve focused on the mission and growth opportunities, instead of just throwing money at him. It’s a lesson that goes well beyond this specific case.

**13\. Reframe money as “freedom tokens” instead of status.** Once Kelsey stopped caring about impressing others with displays of wealth, money became a means to exit the game, not an end in itself. This reframing changed what he optimized for: to have enough money to not _have_ to work for someone else.

**14\. Kelsey’s advisory setup: 1-year, no cliff, 10-year exercise window, plus a retainer.** Kelsey advises select startups and has learned a few important things:

-   Advisory shares _alone_ are usually worth nothing, mostly due to dilution and the tax traps of exercising them.
    
-   Cash retainers ensure he is not working for free. It also means the companies paying him expect impact, and real impact is worth paying for – by serious companies, that is.
    

Referrals are the fuel for winning more advisory work, and these are based on outcomes. Kelsey advised Pixie Labs, which was later acquired by New Relic, partly thanks to Kelsey’s involvement. Word got around that Kelsey’s advisory could make an impact, so more VCs and founders started reaching out to him.

**15\. Apply “intentional living” everywhere, not just where it’s comfortable.** As a long-time minimalist, Kelsey is intentional about possessions, but realized he was being unintentional in other areas. For example, he now reads lyrics while listening to music to actually understand a song. Intentionality is a habit you extend, not a one-time setting.

**•** [Career paths for software engineers at large tech companies](https://newsletter.pragmaticengineer.com/p/career-paths-for-software-engineers)

**•** [The past and future of modern backend practices](https://newsletter.pragmaticengineer.com/p/the-past-and-future-of-backend-practices)

**•** [How Kubernetes is built](https://newsletter.pragmaticengineer.com/p/how-kubernetes-is-built-with-kat)

**•** [How Linux is built](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah)

**•** [The Staff Engineer’s Path: You’re a role model now (sorry!)](https://newsletter.pragmaticengineer.com/p/the-staff-engineers-path)

[00:00](https://www.youtube.com/watch?v=UlXpOGIpITM) Intro

[03:34](https://www.youtube.com/watch?v=UlXpOGIpITM&t=214s) Kelsey’s first job at McDonald’s

[05:04](https://www.youtube.com/watch?v=UlXpOGIpITM&t=304s) His non-traditional path into tech

[11:45](https://www.youtube.com/watch?v=UlXpOGIpITM&t=705s) Landing his first tech job with an A+ certification

[15:33](https://www.youtube.com/watch?v=UlXpOGIpITM&t=933s) His entrepreneurial years

[19:45](https://www.youtube.com/watch?v=UlXpOGIpITM&t=1185s) Joining Google as a data center technician

[27:48](https://www.youtube.com/watch?v=UlXpOGIpITM&t=1668s) Learning automation at a Rackspace spinoff

[33:26](https://www.youtube.com/watch?v=UlXpOGIpITM&t=2006s) Moving into financial services

[50:00](https://www.youtube.com/watch?v=UlXpOGIpITM&t=3000s) Building a reputation through open source

[53:55](https://www.youtube.com/watch?v=UlXpOGIpITM&t=3235s) From configuration management to containers

[1:08:20](https://www.youtube.com/watch?v=UlXpOGIpITM&t=4100s) The rise of Kubernetes

[1:25:05](https://www.youtube.com/watch?v=UlXpOGIpITM&t=5105s) Why he almost joined NASA instead of Google

[1:29:20](https://www.youtube.com/watch?v=UlXpOGIpITM&t=5360s) Defining DevRel at Google

[1:38:20](https://www.youtube.com/watch?v=UlXpOGIpITM&t=5900s) Demonstrating impact at Google

[1:41:20](https://www.youtube.com/watch?v=UlXpOGIpITM&t=6080s) Microsoft’s offer

[1:55:20](https://www.youtube.com/watch?v=UlXpOGIpITM&t=6920s) Learning how to slow down

[2:06:39](https://www.youtube.com/watch?v=UlXpOGIpITM&t=7599s) Advising and investing

[2:15:03](https://www.youtube.com/watch?v=UlXpOGIpITM&t=8103s) A people-first view of GenAI

[2:24:27](https://www.youtube.com/watch?v=UlXpOGIpITM&t=8667s) Using AI with guardrails

[2:28:26](https://www.youtube.com/watch?v=UlXpOGIpITM&t=8906s) Matching AI to the task

[2:36:06](https://www.youtube.com/watch?v=UlXpOGIpITM&t=9366s) Staying relevant in the AI era

**Where to find Kelsey Hightower:**

• X: [https://x.com/kelseyhightower](https://x.com/kelseyhightower)

• LinkedIn: [https://www.linkedin.com/in/kelsey-hightower-849b342b1](https://www.linkedin.com/in/kelsey-hightower-849b342b1)

**Mentions during the episode:**

• TI-BASIC: [https://en.wikipedia.org/wiki/TI-BASIC](https://en.wikipedia.org/wiki/TI-BASIC)

• Georgia HOPE scholarships: [https://www.gafutures.org/hope-state-aid-programs/hope-zell-miller-scholarships/hope-scholarship](https://www.gafutures.org/hope-state-aid-programs/hope-zell-miller-scholarships/hope-scholarship/)

• BellSouth: [https://en.wikipedia.org/wiki/BellSouth](https://en.wikipedia.org/wiki/BellSouth)

• FreeBSD: [https://en.wikipedia.org/wiki/FreeBSD](https://en.wikipedia.org/wiki/FreeBSD)

• Puppet: [https://www.puppet.com](https://www.puppet.com/)

• Rackspace: [https://www.rackspace.com](https://www.rackspace.com/)

• TSYS: [https://www.tsys.com](https://www.tsys.com/)

• James Turnbull’s website: [https://jamesturnbull.net](https://jamesturnbull.net/)

• Kubernetes: [https://kubernetes.io](https://kubernetes.io/)

• Red Hat: [https://www.redhat.com](https://www.redhat.com/)

• Terraform: [https://developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform)

• Docker: [https://www.docker.com](https://www.docker.com/)

• Mitchell Hashimoto’s new way of writing code: [https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto](https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto)

• CoreOS: [https://fedoraproject.org/coreos](https://fedoraproject.org/coreos)

• Mesos: [https://en.wikipedia.org/wiki/Apache\_Mesos](https://en.wikipedia.org/wiki/Apache_Mesos)

• Go: [https://go.dev](https://go.dev/)

• GopherCon: [https://www.gophercon.com](https://www.gophercon.com/)

• Rob Pike’s blog: [https://commandcenter.blogspot.com](https://commandcenter.blogspot.com/)

• Russ Cox’s website: [https://swtch.com/~rsc/](https://swtch.com/~rsc/)

• Brad Fitzpatrick’s website: [https://bradfitz.com](https://bradfitz.com/)

• Erik St. Martin on X: [https://x.com/erikstmartin](https://x.com/erikstmartin)

• Brian Ketelsen’s website: [https://brian.dev](https://brian.dev/)

• Billie Cleek on LinkedIn: [https://www.linkedin.com/in/billie-cleek-677b0830](https://www.linkedin.com/in/billie-cleek-677b0830)

• KubeCon: [https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/](https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/)

• How Kubernetes is Built with Kat Cosgrove: [https://newsletter.pragmaticengineer.com/p/how-kubernetes-is-built-with-kat](https://newsletter.pragmaticengineer.com/p/how-kubernetes-is-built-with-kat)

• _Kubernetes: Up and Running: Dive into the Future of Infrastructure_: [https://www.amazon.com/Kubernetes-Running-Dive-Future-Infrastructure/dp/1491935677](https://www.amazon.com/Kubernetes-Running-Dive-Future-Infrastructure/dp/1491935677)

• Brian Grant on LinkedIn: [https://www.linkedin.com/in/bgrant0607](https://www.linkedin.com/in/bgrant0607)

• Eric Tune on LinkedIn: [https://www.linkedin.com/in/eric-tune-3033693](https://www.linkedin.com/in/eric-tune-3033693)

• Dawn Chen on LinkedIn: [https://www.linkedin.com/in/chendawnhomepage](https://www.linkedin.com/in/chendawnhomepage)

• Satya Nadella on X: [https://x.com/satyanadella](https://x.com/satyanadella)

• Hit Refresh: The Quest to Rediscover Microsoft’s Soul and Imagine a Better Future for Everyone: [https://www.amazon.com/Hit-Refresh-Rediscover-Microsofts-Everyone-ebook/dp/B01HOT5SQA](https://www.amazon.com/Hit-Refresh-Rediscover-Microsofts-Everyone-ebook/dp/B01HOT5SQA)

• Thomas Kurian on LinkedIn: [https://www.linkedin.com/in/thomas-kurian-469b6219](https://www.linkedin.com/in/thomas-kurian-469b6219)

• Liz Rice on LinkedIn: [https://www.linkedin.com/in/lizrice](https://www.linkedin.com/in/lizrice)

• Pixilabs: [https://www.pixilabs.com](https://www.pixilabs.com/)

• Datadog: [https://www.datadoghq.com](https://www.datadoghq.com/)

• Guillermo Rauch on X: [https://x.com/rauchg](https://x.com/rauchg)

• Massdriver: [https://www.massdriver.cloud](https://www.massdriver.cloud/)

• Here’s everything the iPhone has replaced in the last 10 years: [https://www.cnbc.com/2017/06/29/everything-the-iphone-has-destroyed-in-the-last-10-years.html](https://www.cnbc.com/2017/06/29/everything-the-iphone-has-destroyed-in-the-last-10-years.html)

• Wix: [https://www.wix.com](https://www.wix.com/)

• Lambda: [https://aws.amazon.com/lambda](https://aws.amazon.com/lambda)

—

Production and marketing by [Pen Name](https://penname.co/).