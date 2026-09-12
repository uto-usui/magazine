---
title: "How Tailscale built a customer-facing model router on AI Gateway"
source: "https://vercel.com/blog/how-tailscale-built-a-customer-facing-model-router-on-ai-gateway"
publishedDate: "2026-09-11"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

### [Copy link to heading](#tailscale-on-vercel)**Tailscale on Vercel**

-   Hundreds of AI models shipped to customers in-product
    
-   Model access granted and revoked by tailnet network identity
    
-   Went from model routing prototype to paying customers in months
    

Tailscale connects a company's laptops, servers, cloud instances, and personal devices into one private network called a tailnet. Remy Guercio, who leads product for Aperture by Tailscale, describes it simply: "It's basically like a VPC that can span any cloud, on-prem, your house, and your phone."

Aperture takes that same idea and applies it to AI. Instead of giving every employee, agent, or tool a separate provider API key, Aperture lets companies control model access through the tailnet itself. Add someone to the network, and they can immediately use approved models. Remove them, and access disappears.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3DhSCxAOD8fN57mjODjx9V%2Fe28b0206c8e9043d9a7135656bc8da23%2FApertureChatMain.png&w=1920&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3DhSCxAOD8fN57mjODjx9V%2Fe28b0206c8e9043d9a7135656bc8da23%2FApertureChatMain.png&w=1920&q=95)

Under the hood, Aperture is built on Vercel [AI Gateway](https://vercel.com/ai-gateway) and [Vercel Sandbox](https://vercel.com/sandbox). AI Gateway gives Tailscale one API for hundreds of models. Sandbox gives agents a safe place to run. Together, they let Tailscale offer model access and agent execution inside a customer's private network, without their team building every piece of AI infrastructure from scratch.

## [Copy link to heading](#model-routing-is-harder-than-it-looks)Model routing is harder than it looks

Tailscale is an infrastructure company, so building the routing and execution layers in-house was the obvious first option. But once they took a deeper look into the engineering effort required, they chose not to.

The provider layer looked deceptively simple from the outside. "You would think all of the endpoints are the same," Remy says. "They are not."

David Carney, Co-founder and Chief Strategy Officer, has the receipts, because Tailscale still maintains that plumbing for a few customers who haven't migrated to Aperture yet. "There are a lot of things the big providers don't do that blow my mind that the gateway does, like simply putting the cost in the response," he says. "We initially built those systems for customers ourselves, and the complexity is insane."

Agents raised the stakes further. An agent that can read private data, act on the text it reads, and reach the public internet is a security problem now called the "lethal trifecta." The right mitigation is an isolated sandbox with identity and access controls baked in. "I think we wouldn't have been able to deliver the product if we were also trying to build a sandbox ourselves," David says. "But we were able to go from prototype to paying customers in months on Vercel."

## [Copy link to heading](#building-a-custom-model-router-on-ai-gateway)Building a custom model router on AI Gateway

Tailscale shopped the routing layer first. "We did talk to a lot of other folks, including providers themselves, and Vercel just made it very easy," Remy says. AI Gateway gives Aperture one API across hundreds of models, and returns cost and usage on every request, so Aperture can surface spend to customers without Tailscale maintaining price tables for each provider.

Tailscale's customers care about protecting their data, and [Zero data retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) (ZDR) was table stakes for Aperture. Tailscale chose AI Gateway because:

-   The AI Gateway itself retains no data.
    
-   They can set ZDR globally or use the per-request `zeroDataRetention` flag, which automatically restricts routing to ZDR-compliant providers.
    

"All this ZDR stuff is a moving target, like, which models have zero data retention versus not," David says, "but we don't have to write any of that logic, because it's all handled for us."

#### [Copy link to heading](#zero-cost-markup-for-tailscale-and-their-customers)Zero cost markup for Tailscale and their customers

AI Gateway doesn't mark up token costs on any provider or model, including when Tailscale's customers bring their own keys. Aperture's customers pay the same rate they would going direct, across every model in the catalog.

## [Copy link to heading](#time-to-first-token,-from-signup)Time to first token, from signup

Ask David what Vercel is worth to Aperture, and his answer is simple: time to first token. But that means something different to David than it does to Remy, and both are right.

"\[David\] Carney likes to overload the term _time to first token_," Remy says. "In the AI infrastructure world it has a very specific meaning, which is how long it takes to load the cache, generate the response, and deliver it back to the user." Remy explains David's definition: "It's the time from user signup to their first model call, which is the real value Aperture provides to our customers."

And Aperture's success is measured by that time-to-value. "I constantly push the team to remove the most barriers possible to get someone to that wow moment as fast as we can," David says. "After months of testing different products, Vercel was the answer to the infrastructure side, because AI Gateway has such low latency."

## [Copy link to heading](#running-agents-on-the-tailnet-in-vercel-sandbox)Running agents on the tailnet in Vercel Sandbox

Once Aperture had model access in place, the team focused on making it safe to run agents inside a tailnet. This is the workflow:

-   A sandbox spins up and connects to Aperture.
    
-   Aperture connects to AI Gateway.
    
-   Tailscale validates the identity.
    
-   The agent does its work.
    
-   The sandbox shuts down.
    

No key is ever issued to the agent.

Tailscale shopped the sandbox layer too, and even had a working implementation on a different provider before deciding to switch. "We wanted to focus on network identity, not sandbox security boundaries, and Vercel's sandboxes are bulletproof," says Remy.

> We tried many different sandbox providers and even had a full implementation on one, and still switched to Vercel. It was shockingly easy for us to switch everything over.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/4TjKNMLjayzDqg32npLzHg/a74f729d2ad55e5bab08d5d944337566/tailscale-remy.jpeg)Remy Guercio • Aperture Product Lead at Tailscale

## [Copy link to heading](#migrating-tailscale's-internal-ai-layer-to-ai-gateway)Migrating Tailscale's internal AI layer to AI Gateway

Tailscale's own AI usage had grown the way most companies' has: a mix of direct provider accounts and cloud endpoints, accumulated one team at a time. Internally, those requests went through Aperture, but behind the proxy, it was still calling separate providers directly. After implementing AI Gateway for their customers, they knew they wanted to make the migration themselves.

Tailscale's engineering team built a switch in Aperture that pointed requests to AI Gateway instead of the individual provider APIs, so now they have one integration rather than separate ones for each provider. Nothing changed for employees. Aperture was still the endpoint they called, and every model they were already using was in the AI Gateway catalog, so the cutover happened with zero interruption. Tailscale now uses their own migration as the playbook for enterprise customers juggling dozens of provider accounts and keys.

> We were able to cut the entire company over to using AI Gateway in seconds, and nobody noticed. That was the exciting part. Nobody noticed.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/4TjKNMLjayzDqg32npLzHg/a74f729d2ad55e5bab08d5d944337566/tailscale-remy.jpeg)Remy Guercio • Aperture Product Lead at Tailscale

## [Copy link to heading](#what's-next-)What's next

Aperture started as a raw gateway for engineers to point a coding agent at. It now has a chat UI, MCP connectors, and sandboxes launchable as ephemeral nodes, all running on tailnet identity.

> Aperture has turned into a single place for our customers' AI access, not just a developer tool.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/4TjKNMLjayzDqg32npLzHg/a74f729d2ad55e5bab08d5d944337566/tailscale-remy.jpeg)Remy Guercio • Aperture Product Lead at Tailscale

Aperture's new goal is time to first app. David wants users to sign up, run a prompt, build an app, and share it, all in ten minutes or less.

"We don't exactly know what that's going to look like, but we know we're going to have to iterate quickly," Remy says. "Having partners you can work with hand in hand on that is incredibly important."

David's advice to other companies is to focus on the product they deliver to customers, not the infrastructure required to run it. "A lot of people want to build their own router. And look at us, we tried to do it too," he says. "But you don't need to build another router."

**About** [**Tailscale**](https://tailscale.com/): Tailscale is a secure connectivity platform that connects a company’s users, devices, servers, cloud infrastructure, and services through an identity-based private network. Their model router, Aperture by Tailscale, extends that network to AI models and agents.