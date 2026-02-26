---
title: "Mitchell Hashimoto’s new way of writing code"
source: "https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto"
publishedDate: "2026-02-26"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/WjckELpzLOU), [Spotify](https://open.spotify.com/episode/0bIuuNChmWXcwbIydP6Ckk), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** — ⁠ The unified platform for flags, analytics, experiments, and more. See why companies like Notion, Brex, and Atlassian [use Statsig](http://statsig.com/pragmatic).

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for automated code review. Join me online at the [Sonar Summit on March 3rd](http://sonarsource.com/pragmatic/sonarsummit?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-sonar-summit26&utm_content=podcast-sonar-summit&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer), where myself, other eng leaders and devs will share practical strategies for the AI era.

• **[WorkOS](https://workos.com/)** – Everything you need to make your app enterprise ready. If you’re building SaaS — especially an AI product — WorkOS provides all the enterprise building blocks you need. [Check out WorkOS.](https://workos.com/)

How has the day-to-day workflow of Mitchell Hashimoto changed, thanks to AI tools?

Mitchell Hashimoto is one of the most influential infrastructure engineers of our time, and is one of the most pragmatic builders I’ve met. He is the co-founder of HashiCorp and creator of Ghostty. In this episode, we talk about how he got into software engineering, the history of HashiCorp, and the challenges of turning widely used open-source tools into a durable business. We also go into what it’s really like to work with AWS, Azure and GCP as a startup.

Mitchell shares how he uses AI these days, and how agents have completely changed how he works. We touch on Ghostty, open source, and what’s changing for software engineers and founders in an AI-native era.

Here are 9 observations from this conversation that I found the most interesting:

**1\. Vagrant was created because dev environment setup was an unbillable time sink at a consultancy.** At the Ruby on Rails shop where Mitchell worked, jumping onto another client’s project could waste half a day just setting up the environment, plus destroy your existing one. Vagrant solved this in a simple and elegant way, with VirtualBox VMs.

**2\. Terraform won, despite being 7th to market.** Mitchell is frustrated by the narrative that Terraform won because it was first to market in infrastructure-as-code. “We were seventh to market... no one was a clear winner. It was a warring market.” Terraform won through relentless conference presence, community building, and a better developer experience — not timing.

**3\. HashiCorp had no real business for four years and their first commercial product was a full-on failure.** The initial product, Atlas, required customers to adopt the entire HashiCorp stack, which created an unsolvable internal budget problem: no one org within a company would want to purchase the _whole_ stack! HashiCorp pivoted to selling individual services like Vault, and this approach turned out to be a winner.

**4\. VMware almost bought HashiCorp for ~$100, and Terraform would have not happened if it did.** When HashiCorp was only 3 people, VMWare made an initial offer of $20M for the company. Mitchell and Amon (the founders) asked for $100M as the number they would sell for. VMWare took this to their board, where they rejected to buy with a single vote. Mitchell said that Terraform probably never would’ve existed if the VMWare purchase went through.

**5\. Mitchell’s new rule for building software: always have an agent running in the background doing something.** “If I’m coding, I want an agent planning. If they’re coding, I want to be reviewing.” He kicks off tasks before leaving the house — research, edge-case analysis, library comparisons — so work progresses while he drives or is away.

**6\. Open source is moving from “default trust” to “default deny” — and Mitchell thinks that’s how it should be.** This is because AI makes it trivial to create plausible looking but incorrect and low-quality contributions. As he put it: “open source has always been a system of trust. Before, we’ve had default trust. Now it’s just default deny.”

**7\. Git and GitHub may not survive the agentic era in their current form.** Agents cause so much churn that merge queues become untenable, branches proliferate, and repos balloon. Mitchell compares the needed shift to Gmail’s revolution for email: “We’re at the Gmail moment for version control... never delete, archive everything.”

**8\. The best engineers Mitchell ever hired had boring, invisible backgrounds.** “They don’t have social media profiles... they’re honestly nine-to-five engineers. They go back and they don’t code at night.” No GitHub contributions, no public profiles, companies you’ve never heard of. “Every moment you spend on social media is taking away from something else... the best engineers are the ones that context-switch the least.”

**9\. Mitchell’s advice for AI-skeptical engineers: start by reproducing your research, not your code.** “There’s a lot of people like, ‘I don’t want it to write code for me.’ But just delegate some of the research part.” He uses agents for library comparisons, edge-case analysis, and deep research — not just code generation. “You don’t need to pick up on the ‘it must replace you as a person’ kind of propaganda.”

-   [AI Engineering in the real world](https://newsletter.pragmaticengineer.com/p/ai-engineering-in-the-real-world)
    
-   [The AI Engineering stack](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack)
    
-   [Pressure on commercial open source to make more money](https://newsletter.pragmaticengineer.com/p/the-pulse-64) – and HashiCorp changing its license
    
-   [How Linux is built with Greg Kroah-Hartman](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah)
    

([00:00](https://www.youtube.com/watch?v=WjckELpzLOU)) Intro

([02:03](https://www.youtube.com/watch?v=WjckELpzLOU&t=123s)) Mitchell’s path into software engineering

([07:19](https://www.youtube.com/watch?v=WjckELpzLOU&t=439s)) The origins of HashiCorp

([15:52](https://www.youtube.com/watch?v=WjckELpzLOU&t=952s)) Early cloud computing

([18:22](https://www.youtube.com/watch?v=WjckELpzLOU&t=1102s)) The 2010s startup scene in SF

([23:11](https://www.youtube.com/watch?v=WjckELpzLOU&t=1391s)) Funding HashiCorp

([25:23](https://www.youtube.com/watch?v=WjckELpzLOU&t=1523s)) The Hashi stack

([32:33](https://www.youtube.com/watch?v=WjckELpzLOU&t=1953s)) Why HashiCorp’s business lagged behind its technology

([35:28](https://www.youtube.com/watch?v=WjckELpzLOU&t=2128s)) An early failure in commercialization

([38:28](https://www.youtube.com/watch?v=WjckELpzLOU&t=2308s)) The open-core pivot and path to enterprise profitability

([48:08](https://www.youtube.com/watch?v=WjckELpzLOU&t=2888s)) Taking HashiCorp public

([51:58](https://www.youtube.com/watch?v=WjckELpzLOU&t=3118s)) The near VMware acquisition

([59:10](https://www.youtube.com/watch?v=WjckELpzLOU&t=3550s)) Mitchell’s take on all the cloud providers

([1:06:02](https://www.youtube.com/watch?v=WjckELpzLOU&t=3962s)) AI’s impact on open source

([1:07:00](https://www.youtube.com/watch?v=WjckELpzLOU&t=4020s)) Why Mitchell built Ghostty

([1:09:11](https://www.youtube.com/watch?v=WjckELpzLOU&t=4151s)) Why Mitchell used Zig

([1:10:38](https://www.youtube.com/watch?v=WjckELpzLOU&t=4238s)) How terminals work and Ghostty’s approach

([1:17:31](https://www.youtube.com/watch?v=WjckELpzLOU&t=4651s)) AI’s impact on terminals and libghostty

([1:19:13](https://www.youtube.com/watch?v=WjckELpzLOU&t=4753s)) How Mitchell uses AI

([1:22:02](https://www.youtube.com/watch?v=WjckELpzLOU&t=4922s)) Ghostty’s evolving AI use policy

([1:28:36](https://www.youtube.com/watch?v=WjckELpzLOU&t=5316s)) Why open source must change

([1:31:46](https://www.youtube.com/watch?v=WjckELpzLOU&t=5506s)) The problem of Git in monorepos

([1:36:22](https://www.youtube.com/watch?v=WjckELpzLOU&t=5782s)) What needs to change to work effectively with AI

([1:39:57](https://www.youtube.com/watch?v=WjckELpzLOU&t=5997s)) Mitchell’s hiring practices

([1:47:52](https://www.youtube.com/watch?v=WjckELpzLOU&t=6472s)) Mitchell’s AI adoption journey

([1:50:41](https://www.youtube.com/watch?v=WjckELpzLOU&t=6641s)) Advice to would-be founders

([1:52:21](https://www.youtube.com/watch?v=WjckELpzLOU&t=6741s)) Mitchell’s advising work

([1:53:20](https://www.youtube.com/watch?v=WjckELpzLOU&t=6800s)) What’s changing for software engineers

([1:55:03](https://www.youtube.com/watch?v=WjckELpzLOU&t=6903s)) How Mitchell recharges

([1:55:50](https://www.youtube.com/watch?v=WjckELpzLOU&t=6950s)) Book recommendation

**Where to find Mitchell Hashimoto:**

• X: [https://x.com/mitchellh](https://x.com/mitchellh)

• LinkedIn: [linkedin.com/in/mitchellh](http://linkedin.com/in/mitchellh)

• Website: [https://mitchellh.com](https://mitchellh.com/)

• Ghostty: [https://ghostty.org](https://ghostty.org/)

• How Mitchell adopted AI: [https://mitchellh.com/writing/my-ai-adoption-journey](https://mitchellh.com/writing/my-ai-adoption-journey)

**Mentions during the episode:**

• HashiCorp: [https://www.hashicorp.com](https://www.hashicorp.com/)

• PHP Manual: [https://www.php.net/manual/en/index.php](https://www.php.net/manual/en/index.php)

• Ruby on Rails: [https://rubyonrails.org](https://rubyonrails.org/)

• Armon Dadgar on LinkedIn: [https://www.linkedin.com/in/armon-dadgar](https://www.linkedin.com/in/armon-dadgar)

• Amazon S3: [https://aws.amazon.com/pm/serv-s3](https://aws.amazon.com/pm/serv-s3)

• How AWS S3 is built: [https://newsletter.pragmaticengineer.com/p/how-aws-s3-is-built](https://newsletter.pragmaticengineer.com/p/how-aws-s3-is-built)

• Vagrant: [https://developer.hashicorp.com/vagrant](https://developer.hashicorp.com/vagrant)

• Google App Engine: [https://en.wikipedia.org/wiki/Google\_App\_Engine](https://en.wikipedia.org/wiki/Google_App_Engine)

• Packer: [https://www.hashicorp.com/en/products/packer](https://www.hashicorp.com/en/products/packer)

• Consul: [https://www.hashicorp.com/en/products/consul](https://www.hashicorp.com/en/products/consul)

• Kubernetes: [https://kubernetes.io](https://kubernetes.io/)

• Terraform: [https://www.hashicorp.com/en/products/terraform](https://www.hashicorp.com/en/products/terraform)

• Vault: [https://www.hashicorp.com/en/products/vault](https://www.hashicorp.com/en/products/vault)

• Nomad: [https://www.hashicorp.com/en/products/nomad](https://www.hashicorp.com/en/products/nomad)

• VMware: [https://www.vmware.com](https://www.vmware.com/)

• Microsoft Azure: [https://azure.microsoft.com](https://azure.microsoft.com/)

• Google Cloud: [https://cloud.google.com](https://cloud.google.com/)

• Zig: [https://ziglang.org](https://ziglang.org/)

• Kitty: [https://sw.kovidgoyal.net/kitty](https://sw.kovidgoyal.net/kitty)

• Alacritty: [https://alacritty.org](https://alacritty.org/)

• Mitchell’s post on X about improving rendering performance:

[

![X avatar for @mitchellh](https://substackcdn.com/image/fetch/$s_!zePj!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1141762999838842880%2F64_Y4_XB.jpg)

Mitchell Hashimoto@mitchellh

Love doing highly targeted performance work. I've been working the past few days on changing the way the render thread in Ghostty reads the terminal data (which requires a lock that blocks IO). I've got lock held time down 2.4x so far. Too early to PR, but getting close! This

![](https://pbs.substack.com/media/G6FNZ6yagAApZG5.jpg)

1:43 AM · Nov 19, 2025 · 31K Views

10 Replies · 3 Reposts · 279 Likes





](https://x.com/mitchellh/status/1990958974238163155)

• Gastown: [https://github.com/steveyegge/gastown](https://github.com/steveyegge/gastown)

• Lobsters: [https://lobste.rs](https://lobste.rs/)

• Real-world engineering challenges: building Cursor: [https://newsletter.pragmaticengineer.com/p/cursor](https://newsletter.pragmaticengineer.com/p/cursor)

• My AI Adoption Journey: [https://mitchellh.com/writing/my-ai-adoption-journey](https://mitchellh.com/writing/my-ai-adoption-journey)

• The Invisible Life of Addie LaRue: [https://www.amazon.com/Invisible-Life-Addie-LaRue/dp/0765387565](https://www.amazon.com/Invisible-Life-Addie-LaRue/dp/0765387565)

—

Production and marketing by [Pen Name](https://penname.co/).