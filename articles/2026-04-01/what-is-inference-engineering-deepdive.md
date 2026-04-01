---
title: "What is inference engineering? Deepdive"
source: "https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering"
publishedDate: "2026-03-31"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

Two years ago, we learned about [how LLMs work](https://blog.pragmaticengineer.com/how-does-chatgpt-work/) at a high level from [the ChatGPT team](https://blog.pragmaticengineer.com/how-does-chatgpt-work/), and today, almost all software engineers use large language models (LLMs) in our day-to-day work. The most visible part of using an LLM is **inference**; when an existing model takes an input (prompt) and generates an output, one token at a time. So, with AI models and AI agents everywhere across the tech industry in 2026, that means so is inference.

**And now, inference engineering is becoming more widespread, too, as open LLM models grow more capable.** This is because with closed models, inference engineering is done only by the AI engineers who build the model, whose number might add up to a few thousand globally. In contrast, with the open models which tech companies are adopting, it’s possible to tweak them to perform better at inference. For example, Cursor built its new Composer 2.0 model [on top of](https://newsletter.pragmaticengineer.com/i/192229275/backlash-after-cursor-hides-that-composer-2-is-based-on-open-source-model) the open Kimi 2.5 model, and successfully used plenty of inference engineering approaches to make it even faster.

So, based on this industry-wide prevalence and the related need for superior technical performance, it’s worth understanding a bit about what inference engineering actually is, and some interesting approaches worth knowing about, as a software engineer.

For some answers, I turned to [Philip Kiely](https://x.com/philipkiely), a software engineer who has been working for four years at the inference startup, Baseten. With his hard-earned experience, Philip has written an excellent, in-depth book about precisely this topic, _“Inference Engineering.”_

[

![](https://substackcdn.com/image/fetch/$s_!FctC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff39fe534-3703-4096-acc3-fcc01d4d5d00_1600x1200.jpeg)

](https://substackcdn.com/image/fetch/$s_!FctC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff39fe534-3703-4096-acc3-fcc01d4d5d00_1600x1200.jpeg)

_My personal copy of Inference Engineering_

In today’s issue, we cover:

1.  **Setting the stage: why is inference so important?** More capable, widespread, open models are driving demand for inference engineering.
    
2.  **What is inference?** As the phase that comes after training a model, the inference layer introduces new engineering challenges like batching, caching, and quantization.
    
3.  **When is inference engineering needed?** Investing in this area is typically worth it when your product and usage scales up, and there are product requirements which a current, off-the-shelf solution lacks.
    
4.  **What hardware does inference use?** Datacenter GPUs are the most common, while on-premises, air-gapped GPUs are also employed.
    
5.  **What software does inference use?** Commonly-used software includes NVIDIA’s CUDA and Dynamo, as well as hardware-agnostic projects like PyTorch, vLLM, and others, which are growing in popularity.
    
6.  **What infrastructure does inference need?** Autoscaling is a baseline requirement. Kubernetes is a popular choice for autoscaling inside a cluster, while multi-cloud inference might be necessary for high-scale use cases.
    
7.  **Five approaches to make inference faster.** Quantization (reducing the numerical precision of a model’s weights), speculative decoding (taking advantage of spare compute to generate “draft tokens”), caching, parallelism (tensor parallelism and expert parallelism) and disaggregation (separating the prefill and decode phases to run on separate workers, not the same GPU).
    

This deepdive uses a few abbreviations and concepts that are everyday lingo for inference engineers, but maybe are not for those less versed in the domain:

-   **CUDA:** Compute Unified Device Architecture. NVIDIA’s proprietary API to program NVIDIA GPUs for high-performance computing, including LLM-related use cases.
    
-   **TTFT**: time to first token. Think of this as the “time to process the prompt.” This metric determines the perceived responsiveness of models and GenAI systems.
    
-   **TPS**: tokens per second. Akin to a model’s “typing speed.”
    
-   **ITL**: intertoken latency. The time between generating one token and the next.
    
-   **KV cache**: key-value cache. The cached results of the attention algorithm, reused between requests to speed up inference. _We cover more on KV cache in the [Scaling ChatGPT deepdive](https://newsletter.pragmaticengineer.com/i/141865286/challenge-1-kv-cache-and-gpu-ram)._
    
-   **Prefill / decode:** the two phases of inference. Prefill is when the model takes the full input and processes tokens, outputting the KV cache. Decode is the phase in which the model generates one token at a time.
    
-   **MoE**: Mixture of Experts. An architecture that enables models to be pretrained with far less compute. [More details on this approach.](https://huggingface.co/blog/moe#what-is-a-mixture-of-experts-moe)
    

Below is an introduction to inference adapted from Philip’s book, “_Inference Engineering,” which_ is [free to download as an e-book](https://baseten.com/inference-engineering). Physical copies are currently sold out, but Philip is printing more as fast as possible.

_My usual disclaimer: as with all my recommendations, I was not paid to mention this book, and no links in this article are affiliates. See my [ethics statement](https://blog.pragmaticengineer.com/ethics-statement/) for more._

_With that, it’s over to Philip:_

Inference is the most valuable category in the AI industry, but inference engineering, on the other hand, is still in its infancy. In their work, inference engineers work across the stack from CUDA to Kubernetes in pursuit of faster, less expensive, and more reliable serving of generative AI models in production.

When ChatGPT launched in late 2022, there were perhaps a few hundred inference engineers in the world, and they didn’t call themselves that. These specialists mostly worked at frontier labs like OpenAI, Midjourney, and Anthropic, or at big tech companies like Google and NVIDIA.

Back then, it looked like this might be the way of the AI industry: that training generative AI models would be so hard and expensive that only a handful of companies would develop closed models and thereby require inference engineering for production serving. In that alternate future, the rest of the world would be mere consumers of AI via APIs, renting intelligence a token at a time.

Three years later, it turns out that training generative AI models is indeed both hard and expensive – but it’s not so hard and expensive to be limited to a handful of players. Instead, a proliferation of open models – more than two million and counting on [Hugging Face](https://huggingface.co/) (the “GitHub for AI”) – means that today every engineer can now deploy their own intelligence to power AI products.

Research labs around the world, from OpenAI and NVIDIA Nemotron in America, to Mistral AI and Black Forest Labs in Europe, to Alibaba Qwen, DeepSeek AI, Z AI, and Moonshot AI in China, regularly release open models of all modalities.

[

![](https://substackcdn.com/image/fetch/$s_!Hir-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fb80caa-61e3-4346-bafc-3ffda6aa18bf_1600x1305.png)

](https://substackcdn.com/image/fetch/$s_!Hir-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fb80caa-61e3-4346-bafc-3ffda6aa18bf_1600x1305.png)

Well over two million open models on Hugging Face, 25 times more than five years ago

Despite closed models getting smarter and cheaper, the movement into open models is accelerating, which differ by the availability of their weights:

-   **Closed model:** A proprietary model whose weights are unavailable to the public, like GPT-5 and Claude Sonnet.
    
-   **Open model:** A model whose weights are publicly available, like Llama or DeepSeek, and which is usually released under the MIT license, or a similar permissive license (some models restrict commercial use, so always double-check license terms).
    

Before December 2024, there was a meaningful gap in intelligence between closed and open models, but when DeepSeek V3 and R1 were released, that gap disappeared. _Note from Gergely: we previously covered [how DeepSeek’s release rocked the AI industry.](https://newsletter.pragmaticengineer.com/p/the-pulse-122-deepseek-rocks-the)_

Today, new closed models are matched by open models within months if not weeks, and occasionally, open models like Kimi K2 Thinking even exceed closed models’ capabilities for brief periods.

Despite the fact that open models are constantly chasing closed models on benchmarks, they nonetheless change the equation for AI product builders. And as both types improve, closed and open models cross capability thresholds.

[

![](https://substackcdn.com/image/fetch/$s_!TyQk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0874a12e-2bf7-4ab8-80ce-19ba8db78283_1600x1096.png)

](https://substackcdn.com/image/fetch/$s_!TyQk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0874a12e-2bf7-4ab8-80ce-19ba8db78283_1600x1096.png)

_Open and closed models improve rapidly, making new products possible_

In 2022, it was impossible to build the kinds of AI-native products that define the industry today. But over time, closed models got smarter and new categories like customer service voice agents and AI-powered IDEs became possible. The early models were slow, expensive, and unreliable, but the capabilities were there and AI engineers began building companies around them.

**As open models crossed the same capability thresholds, these folks began using them to replace closed models.** Many also began fine-tuning open models to cross capability thresholds faster, and even exceed closed model quality in their specific product and domain.

[

![](https://substackcdn.com/image/fetch/$s_!k0BW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F776ec68f-41aa-401d-8f4f-8afb231ab590_1600x1096.png)

](https://substackcdn.com/image/fetch/$s_!k0BW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F776ec68f-41aa-401d-8f4f-8afb231ab590_1600x1096.png)

_Customizing open models retains control over latency, reliability, and economics_

Switching to open models means the opportunity to use inference engineering to make the models powering AI products better in new ways:

-   **Latency:** Closed model APIs are built for throughput, but open models can be optimized for real-time applications.
    
-   **Availability:** While APIs for GPT and Claude are stuck at two nines of uptime, it’s possible to achieve four nines or better with dedicated deployments of open models.
    
-   **Cost:** Open models are often at least 80 percent less expensive at scale.
    

So, whereas three years ago it looked like inference engineering was a niche field, the fact is that today, every company aiming to build truly differentiated and competitive AI products needs an inference strategy.

AI-native startups like Cursor, Clay, Gamma, and Mercor are redefining hypergrowth by building products that rely on open and in-house models. Leading digital native companies like Notion and Superhuman succeed by deeply integrating AI capabilities into their category-defining products.

Elsewhere, a new generation of blended research and engineering teams – World Labs, Writer, Mirage, and dozens more – are building businesses by training and productizing their own foundation models.

Adoption is even strong in enterprise and regulated industries, which historically were slow to adopt new technologies. Companies like OpenEvidence, Abridge, and Ambience are making generative AI ubiquitous in healthcare, while at the world’s largest companies, AI initiatives are moving past the pilot stage into massive user adoption. Market-wide demand for inference means that everyone from developers to executives has the opportunity to learn inference engineering and use it to advance their career and business.

I’ve been incredibly fortunate to have a front-row seat in the fastest-moving market in history over the last four years at Baseten, where we power mission-critical inference for the best AI products, including every company listed in the previous paragraphs.

**The good news is that you are early.** There are still relatively few professionals working on inference, and newcomers can become experts quickly. Also, the potential and impact of inference is becoming ever clearer, but the domain is still in its infancy. That means there are enormous opportunities to solve novel, interesting, and deeply technical problems at all levels of the stack.

Inference is the second phase of a generative AI model’s lifecycle:

-   **Training:** The process of learning model weights from data.
    
-   **Inference:** Serving generative AI models in production.
    

During the past decade’s machine learning (ML) boom, hundreds of thousands of data scientists and ML engineers became familiar with the full lifecycle of training and inference for ML models.

Inference for classic ML models is relatively straightforward. In the early days of Baseten, we ran inference for models built with tools like XGBoost on lightweight CPUs with a simple software stack.

In contrast, inference for generative AI models is complex. You can’t simply take model weights, get some GPUs, and expect inference to be fast and reliable enough for large-scale production use. Doing inference well requires three layers:

-   **Runtime:** Optimizing the performance of a single model on a single GPU-backed instance.
    
-   **Infrastructure:** Scaling across clusters, regions, and clouds without creating silos, while maintaining excellent uptime.
    
-   **Tooling:** Providing engineers working on inference with the right level of abstraction to balance control with productivity.
    

These three layers must work together to create a system that can handle mission-critical inference at scale.

[

![](https://substackcdn.com/image/fetch/$s_!Aqry!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcba5fc58-2204-4293-820e-c6b60467e165_1595x1600.png)

](https://substackcdn.com/image/fetch/$s_!Aqry!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcba5fc58-2204-4293-820e-c6b60467e165_1595x1600.png)

A complete inference stack includes runtime and infrastructure optimizations

The runtime layer is responsible for ensuring an individual model running on a GPU (or across several GPUs in a single instance) runs as performantly and efficiently as possible. This layer depends on a sophisticated software stack, from CUDA, to PyTorch, to inference engines like vLLM, SGLang, and TensorRT-LLM. Low-level optimization is important, with kernels like FlashAttention delivering significant performance gains.

The runtime layer relies on a number of model performance techniques that apply new research to the challenges of inference on generative AI models:

-   **Batching:** Run incoming requests in parallel, weaving them together on a token-by-token basis to increase throughput.
    
-   **Caching:** Reuse the KV cache – the cached results of the attention algorithm – between requests that share prefixes.
    
-   **Quantization:** Lower the precision of select pieces of the model to access more compute and reduce memory burden.
    
-   **Speculation:** Generate and validate draft tokens to produce more than one token per forward pass during decode.
    
-   **Parallelism:** Efficiently leverage more than one GPU to accelerate large models without introducing new bottlenecks.
    
-   **Disaggregation:** Separate the two phases of LLM inference, prefill and decode, onto independently scaling workers.
    

These model performance techniques are used for all modalities and not just LLMs, such as vision language models, embedding models, automatic speech recognition, speech synthesis, image generation, and video generation, which extend the capabilities of AI systems and require their own inference optimizations. But these runtime optimizations are not enough: no matter how performant a single instance of a model server is, it will eventually receive more traffic than it can handle. This is not a CUDA problem or a PyTorch problem, it’s a systems problem that needs to be solved at the infrastructure layer.

The nature of infrastructure problems changes at each level of scale. At first, the problems are around autoscaling: knowing when to add and remove replicas, and figuring out how to do so quickly.

**Past a certain scale – generally a few hundred GPUs – infrastructure problems are defined by capacity.** To get access to enough GPUs, inference engineers begin spreading workloads across multiple regions and cloud providers. This quickly leads to silos, where models in one cluster may be starved for resources while other clusters have unused capacity. The final level of scale in infrastructure is a global system that treats all available resources as a single unified pool of compute.

Thoughtful multi-cloud infrastructure also improves reliability, protecting against downtime in any individual region or cloud provider. And for global applications, running inference near to end users improves end-to-end latency.

Once these runtime and infrastructure capabilities are built, they need to be presented at the appropriate level of abstraction. Inference providers like Baseten and internal teams building inference need to consider what tooling and developer experience to provide as the critical third layer in a complete inference platform.

Of course, developer experience is subjective. For inference, one extreme is the black box: give a platform model weights, and get back an API. At the other extreme is providing only basic constructs for compute, network, disk, and so forth.

The right developer experience is somewhere in the middle, where inference engineers have enough control to run mission-critical inference confidently, and enough abstraction to work productively.

This article – which is an excerpt of _Inference Engineering_ – presents an overview of the technologies and techniques that power inference across all three layers of runtime, infrastructure, and tooling.

Inference engineering adds speed and scale to AI products by optimizing production serving of generative models. Optimization means identifying the best solution from a range of options.

Before optimizing model performance and building robust infrastructure, you need to know what “best” means for your product; many performance improvements come from making tradeoffs in latency, throughput, and quality. In practice, optimization is often about finding the right balance, rather than maximizing a single factor.

For example, NFL players are big, fast, and strong. But they’re not as big as sumo wrestlers, fast as Olympic sprinters, or strong as champion powerlifters. Their bodies and skills are optimized to fulfill the specific demands of their position over the course of a full season.

[

![](https://substackcdn.com/image/fetch/$s_!BjhW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5cd0e2b2-8865-4806-9c03-58289d752f05_1600x805.png)

](https://substackcdn.com/image/fetch/$s_!BjhW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5cd0e2b2-8865-4806-9c03-58289d752f05_1600x805.png)

_Like elite athletes, inference services must be specialized for the demands of their workloads_

Similarly, your inference system must be optimized to fulfill the specific demands of your model, product, and traffic. The more constraints you can introduce, the better the outcomes that can be achieved.

You should know:

-   **Model requirements:** Which model(s) do you need to run inference on?
    
-   **Application interface:** How will inputs be delivered to the model, and how is the output expected to be formatted?
    
-   **Latency budget:** How fast does your product need to respond to a user action, end-to-end?
    
-   **Unit economics:** How much sense does it make to spend on a per-request, per-user, or per-month basis?
    
-   **Usage patterns:** How many concurrent users are you serving, and is there any pattern to their usage (e.g., more activity during business hours)?
    

Early in building an AI product, the answers to these questions may not be clear. At this point, it’s often better to use off-the-shelf APIs whenever possible, rather than investing in dedicated inference. But as a product scales, the requirements become clear and inference engineering becomes a worthwhile pursuit.

Inference engineering relies on accelerators: powerful hardware designed to load terabytes of data and perform trillions of operations per second.

The most common type of accelerator for inference is the GPU, and the market leader in GPUs for inference is NVIDIA. My book focuses on inference engineering for NVIDIA GPUs in the datacenter, and also covers other vendors of datacenter accelerators and local inference.

Across vendors, there are three types of GPUs on the market:

-   **Datacenter GPUs:** Racked servers with interconnected high-performance GPUs. Example: NVIDIA B200.
    
-   **Workstation GPUs:** Individual desktop GPUs for professional workflows. Example: NVIDIA RTX Pro 6000.
    
-   **Personal computing GPUs:** Individual desktop GPUs for everyday use. Example: NVIDIA GeForce RTX 5090.
    

Inference at scale uses datacenter GPUs mounted on racks: refrigerator-sized chassis with standardized power, networking, and cooling.

Datacenter GPUs like the [NVIDIA B200](https://www.nvidia.com/en-us/data-center/dgx-b200/) offer the highest individual performance, and more importantly, include high-bandwidth GPU-to-GPU interconnects, are installed in highly standardized configurations, and are available by the millions in datacenters worldwide.

I doubt there is a B200 GPU running under your desk, but if there is, please send me a picture! Instead, inference on datacenter GPUs runs in one of three modes:

-   **Cloud:** GPUs are rented in someone else’s datacenter, usually hyperscalers like AWS and GCP, or neoclouds like CoreWeave and Nebius.
    
-   **On-premises:** GPUs are purchased and installed in a datacenter that you control directly.
    
-   **Air-gapped:** GPUs are installed on-prem and you need to physically access the GPUs to run inference.
    

Most inference engineers use cloud GPUs. Large enterprises and governments run on-prem and air-gapped deployments, but cloud-based GPUs offer the flexibility and access that fast-growing AI products need to scale.

Even with constraints, navigating the hardware landscape is complex. From variations between cloud providers, to NVIDIA’s personal naming conventions, there are many nuances in selecting the right accelerator.

NVIDIA’s market dominance in the inference space is in no small part due to the robust, mature software ecosystem around its hardware. Hardware iteration cycles are slow. Best-in-class hardware companies like Apple and NVIDIA release new architectures and generations at most annually, with two-year release cycles being more common. But software iteration is fast. Often, to run a newly released open model on day zero, you need to install a nightly build or other pre-release version of each software dependency just to get support for the new model.

Software’s fast iteration cycle and lower barrier to entry dramatically expands the landscape of inference engineering. There are countless companies building software at various levels of the inference stack, in contrast to hardware, which centers on NVIDIA and a few competitors.

For inference engineers, these are some of the key software players:

-   **NVIDIA:** Invests heavily in its own sometimes-proprietary software ecosystem, from CUDA up to Dynamo.
    
-   **Hugging Face:** Maintains a model registry for all open models plus [transformers](https://huggingface.co/docs/transformers/en/index) (models built on the [transformer architecture](https://en.wikipedia.org/wiki/Transformer_\(deep_learning\))), and [diffusers](https://huggingface.co/docs/diffusers/index) (models built on the [diffusion-based](https://en.wikipedia.org/wiki/Diffusion_model) generative ones).
    
-   **The Linux Foundation:** Maintains hardware-agnostic projects like PyTorch and vLLM.
    
-   **LMSYS Org:** Develops essential tools for inference and evaluation, most notably SGLang.
    

There are thousands more companies, universities, and research institutions making essential open-source contributions to inference. Over time, technologies have been built at increasing levels of abstraction:

-   **CUDA:** Direct communication to the GPU for explicit control over computations and memory.
    
-   **Deep learning frameworks:** Abstractions over CUDA for training, exporting, and running neural networks in Python.
    
-   **Inference engines:** Highly configurable PyTorch-backed inference for common architectures.
    
-   **NVIDIA Dynamo:** Sits on top of inference engines to power large-scale deployments.
    

Most inference engineering today happens at the higher levels of abstraction, configuring and deploying inference engines and orchestrating inference across multiple GPUs. No matter which level of the stack you work at, it’s essential to have a strong mental model for the adjacent levels of abstraction to guide your work.

When you scale production traffic, your assumptions are rigorously tested. Everything from input and output sequence lengths, to traffic patterns, to what topic a user decides to chat about; they all impact your observed performance in production. And maintaining secure, robust infrastructure is an entirely different skillset from optimizing model inference on the GPU.

No matter how fast and efficiently a single instance can serve a model, the service will be overwhelmed if traffic gets high enough. It’s an infrastructure problem, not with PyTorch or CUDA, and it requires a different mindset and different technologies.

Scaling in production introduces new complexities about where and how to get GPUs, balance traffic across them, and prevent downtime. The goal of autoscaling is to ensure you always have enough resources to serve all incoming requests, while maintaining latency SLAs and without wasting money on idle GPUs.

[

![](https://substackcdn.com/image/fetch/$s_!k4ge!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F58d466c2-fc03-4920-80ba-909b6d08a471_1600x939.png)

](https://substackcdn.com/image/fetch/$s_!k4ge!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F58d466c2-fc03-4920-80ba-909b6d08a471_1600x939.png)

_Without autoscaling, inference systems waste resources during traffic lulls and miss SLAs during traffic spikes_

[

![](https://substackcdn.com/image/fetch/$s_!5hww!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5223ec4d-8b1e-4eb4-86f2-364e026cf470_1600x939.png)

](https://substackcdn.com/image/fetch/$s_!5hww!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5223ec4d-8b1e-4eb4-86f2-364e026cf470_1600x939.png)

_A strong autoscaling system for inference matches resources to demand_

Autoscaling systems use Kubernetes, an open-source container orchestration system, along with a cluster-level system for provisioning and deallocating compute. Kubernetes can run one or more replicas of a model container, each on its own instance. An instance includes the GPUs and other hardware resources that the container requires.

Unless your traffic is unusually consistent, there probably isn’t a specific number of replicas that perfectly matches your needs.

Autoscaling is the practice of dynamically adjusting the number of replicas allocated to a given model within a cluster. There are two ways to make autoscaling decisions:

-   **Utilization:** Scale up or down based on GPU utilization signals like memory usage or compute usage.
    
-   **Traffic:** Scale up and down based on the number of requests being processed in the system.
    

Utilization and traffic don’t always match. For example, in LLM prefill, a few requests with hundreds of thousands of uncached input tokens could cause much higher utilization than many small requests with high cache hit rates.

Traffic-based scaling decisions can be made proactively, while utilization is a lagging indicator. Use both in combination to keep system resources matched with demand.

When designing a traffic-based autoscaling system, you want to configure five factors:

-   **Min replicas:** What is the minimum number of replicas that stay running, regardless of traffic?
    
-   **Max replicas:** What is the maximum number of replicas you can allocate when traffic is high?
    
-   **Autoscaling window:** How long is the sliding timeframe used to measure traffic and make autoscaling decisions?
    
-   **Scale down delay:** For how long after a scale-down is suggested do you wait, in case there’s another traffic spike?
    
-   **Concurrency target:** How many requests can each replica handle at once?
    

The exact configuration determines how well the autoscaling system achieves its goals of maintaining latency SLAs without wasting resources. For example, increasing the scale-down delay prevents premature scaledowns for spikey traffic, but could result in unnecessary spend after traffic has properly cooled down.

Autoscaling within a single cluster works up to a certain point, but high-volume deployments serving a global user base need thousands of GPUs distributed around the world.

It’s straightforward to build multi-cloud inference as a collection of siloed compute across different cloud providers. But in these setups, there’s no way to use inter-cloud compute fluidly, and moving workloads across clouds is a tedious, error-prone process.

True multi-cloud inference requires building a multi-region, multi-provider bin packing tool, which treats distinct pools of compute as fungible with each other. Like Kubernetes within a single cluster, multi-cloud capacity management must take a global view, enabling global scheduling.

[

![](https://substackcdn.com/image/fetch/$s_!hHbk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F40620524-e497-4f72-9f40-c84605d4461f_1600x1007.png)

](https://substackcdn.com/image/fetch/$s_!hHbk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F40620524-e497-4f72-9f40-c84605d4461f_1600x1007.png)

_A multi-cloud approach extends the idea of control and workload planes to a multi-cluster, multi-region system_

Running true multi-cloud inference unlocks:

-   **Capacity:** Pool capacity from multiple providers for greater, more flexible GPU access.
    
-   **Redundancy:** Split inference across providers for resiliency against outages.
    
-   **Latency:** Run inference close to end users to reduce network latency overhead.
    
-   **Compliance:** Run inference in compliance with data sovereignty and other regulatory requirements.
    

Scaling from one cluster in one cloud to many clusters in many clouds requires a new coordination layer. A multi-cloud architecture contains:

-   **Control plane:** Handles model deployment and global scaling decisions, receives real-time event streams.
    
-   **Workload planes:** Handles direct inference traffic and in-cluster scaling decisions, reports utilization and demand.
    

This separation of responsibilities ensures that individual workload planes can serve traffic independently. If something happens to the control plane or any given workload plane, other workloads should be unaffected.

One of the coolest things about working in inference engineering is that, unlike many industries where new academic research takes years or decades to be adopted, techniques from new papers are live in production within months or even weeks.

But there is a gap to bridge between research and production, and some of the most visible inference engineering work of all comes from doing so.

Real-world traffic defies constraints. But with volume, you can adapt systems over time to match the changing nature of usage. Tuning the parameters of inference engines, speculation algorithms, and model servers isn’t a one-time task. Instead, either through iterative deployments or dynamic runtime adjustments, you can continuously improve the performance of an inference system.

Finding the right combination of techniques and configurations takes patient experimentation. I remember an internal hackathon during which one of Baseten’s inference engineers worked on an autocomplete model for code, and ended up trying 77 different configurations via a handwritten script before finding a non-obvious solution that doubled TPS (tokens per second) for a customer’s model.

Sometimes, techniques are symbiotic or incompatible, which makes inference optimization even more complex. For example, quantizing the KV cache alleviates a bottleneck in disaggregation, but increasing batch sizing reduces the compute available for speculation. An inference engineer’s challenge is always to create a balanced set of optimizations that delivers more than the sum of its parts.

Let’s look into the key categories of applied research for inference acceleration: quantization, speculation, caching, parallelism, and disaggregation.

Quantization means reducing the numerical precision of a model’s weights. It improves latency (both TTFT \[time to first token\] and TPS, increases system throughput, and opens up headroom for other optimizations like disaggregation, speculation, and prefix caching to be even more effective. But when it goes wrong, quantization can materially reduce a model’s output quality.

Models are trained with weights, activations, and other components represented in a certain native number format. Usually, this is [BF16](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format) or [FP16](https://en.wikipedia.org/wiki/Half-precision_floating-point_format), although 8-bit and 4-bit native precisions are becoming more popular for training.

Post-training quantization works by changing those model weights and other values from their native number format, to a lower-precision format. Cutting precision in half improves performance in both phases of inference:

-   **Prefill:** Compute-bound prefill now runs on lower-precision Tensor Cores with twice the FLOPS.
    
-   **Decode:** Memory-bound decode now loads half as much data per value, effectively doubling memory bandwidth.
    

Working with quantized data introduces overheads, so it’s not linearly twice as fast to go from 16 to 8 bits. In practice, quantization down a single level of precision generally offers 30%-50% better performance for LLMs. The catch with quantization is that it runs the risk of reducing a model’s output quality, and has the potential to introduce precision errors throughout the calculations that power inference.

Precision errors compound over time. Consider what happens when you square and cube different precisions of Pi:

[

![](https://substackcdn.com/image/fetch/$s_!VrYE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe8988ece-35ae-4377-9551-ca6adc714317_902x308.png)

](https://substackcdn.com/image/fetch/$s_!VrYE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe8988ece-35ae-4377-9551-ca6adc714317_902x308.png)

Most of the work in quantization is in preventing precision errors and minimizing their impact on the final model output.

Sixteen-bit, 8-bit, and 4-bit precisions are the primary formats for inference. Number formats contain:

-   **Precision:** The number of bits used to express a single value in the format. For example, FP16 uses 16 bits.
    
-   **Type:** Whether these bits are interpreted to represent an integer (non decimal) or a floating-point number (decimal).
    
-   **Scale factor:** A multiplier used to map values from a low-precision format back to the higher-precision format.
    

Combined, these attributes determine the two factors behind how well a number format represents the values used in inference:

-   **Dynamic range:** The difference between the lowest and highest value that can be represented in the format.
    
-   **Granularity:** The number of parameters or other values that are quantized along a single scale factor.
    

Dynamic range is essential to low-precision inference without quality loss. Sixteen bits can represent 65,536 distinct values, while 8 bits can only represent 256 different values. The dynamic range is the distribution of these values – the difference between the smallest and largest available value.

Dynamic range explains why floating-point formats are better than integer formats for inference. Floating-point formats have three properties:

-   **Sign:** A single bit that represents whether a number is positive or negative.
    
-   **Exponent:** A set of bits that, taken together, represent an exponent factor.
    
-   **Mantissa:** A set of bits that together represent the base value multiplied by two to the exponent.
    

An FP8 number in an E4M3 data format means it has a 4-bit exponent and a 3-bit mantissa, with the remaining bit for the sign. Integer formats only have sign and value bits.

[

![](https://substackcdn.com/image/fetch/$s_!mHG6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F689475aa-baa7-44f7-9ad9-8cb5d3dda6b6_1600x933.png)

](https://substackcdn.com/image/fetch/$s_!mHG6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F689475aa-baa7-44f7-9ad9-8cb5d3dda6b6_1600x933.png)

_Floating-point number formats have exponent and mantissa bits, along with the sign bit_

The exponent in floating-point numbers gives it a higher dynamic range, meaning it can better express very large and very small numbers. This is important because outlier values are significant in inference, and floating-point number formats better represent outliers after quantization.

Within floating-point formats, there are multiple options at each precision, like FP4, MXFP4, and NVFP4. These formats differ in granularity, or in the number of values quantized by a single scale factor.

Quantization can be applied at three levels:

-   **Tensor level:** Calculate a single scale factor for the entire QKV tensor.
    
-   **Channel level:** Calculate a different scale factor for each feature vector within the tensor.
    
-   **Block level:** Within each feature vector, divide the vector into blocks of N values and calculate a scale factor for each block.
    

More granular quantization has a lower chance of smoothing over outliers, which preserves quality. However, more granularity also introduces extra overhead for storing and applying scale factors.

The components of a model have varying sensitivities to quantization. Reducing the precision of more sensitive components runs a higher risk of quality degradation. From the least to most sensitive components:

1.  **Weights:** the linear layers are least sensitive to quantization.
    
2.  **Activations:** The intermediate output of activation functions are only somewhat sensitive to quantization. They are rarely quantized as they are such a tiny fraction of the model’s weights.
    
3.  **KV cache:** The cached values from the attention calculation are moderately sensitive to quantization.
    
4.  **Attention:** The attention layers of a model are highly sensitive to quantization, especially equations like softmax.
    

Within each component, you can get more selective about quantization.

Even in linear layers and activations – generally the least sensitive to quantization due to their size – early and late layers, like the input and output layers of the neural network, may be left in their original precision as these layers are more sensitive.

While quantizing weights and activations helps performance, KV cache quantization gives an additional boost to techniques like prefix caching and disaggregation. The KV cache is a valuable resource and quantizing it allows inference engines to store more of it in memory and read it more quickly.

However, the KV cache for each token is used by each subsequent token. This means precision errors introduced by quantization can compound from token to token. Compounding errors are exactly why attention layers are the riskiest to quantize: not only is attention very sensitive to dynamic range, but each attention calculation relies on the results of each previous attention calculation. Therefore, over a sequence of thousands of tokens, errors accumulate quickly.

All but the most aggressive quantization schemes run functions like softmax in their original precision.

[

![](https://substackcdn.com/image/fetch/$s_!C71B!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbbf0898f-e872-4167-8d6b-9e019982e65a_1453x1600.png)

](https://substackcdn.com/image/fetch/$s_!C71B!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbbf0898f-e872-4167-8d6b-9e019982e65a_1453x1600.png)

_Quantization risk is low for weights and activations, moderate for KV cache, and high for attention_

A moderate approach to low-precision inference uses a format like FP8 with high dynamic range – if possible, a microscaling format like MXFP8 – to carefully quantize select linear layers, activations, and often KV cache values. Even with these high dynamic range formats, components of the attention layer are rarely quantized.

The decode phase of LLM inference is an autoregressive process in which tokens are generated one at a time. The bottleneck on decode is memory bandwidth, with compute sitting idle at low-to-moderate batch sizes as weights are read from memory.

Speculative decoding takes advantage of that spare compute to try and generate multiple tokens per forward pass through the target model. If an inference engine could generate two, three, or even more tokens for each round-trip of weights through memory, it would generate far more tokens per second. Note, speculative decoding only improves TPS / ITL (inter-token latency), not TTFT (time to first token.)

There are multiple algorithms for speculative decoding and they share a common mechanism:

1.  The speculator generates one or more **draft tokens**.
    
2.  The **target model** – or the underlying model that you’re trying to accelerate – performs **validation** on these tokens to check if they match what the model would generate.
    
3.  The target model accepts any valid draft tokens and generates an additional token itself, completing the forward pass.
    

This generates N+1 tokens per forward pass, or iteration through the decode loop, where N is the number of accepted draft tokens.

Generating draft tokens is not free, it takes both compute and memory. However, it is much faster for a target model to validate a draft token than to generate an original token. If you imagine a sudoku puzzle, solving it is hard, but checking if the solution is correct is very easy. For the target model, generating a token is like solving a sudoku, while validating a draft token is like checking a finished sudoku.

The performance uplift from any speculative decoding strategy depends on three factors:

1.  **Draft token cost:** Time taken to generate a draft token.
    
2.  **Draft sequence length:** The number of draft tokens generated per forward pass.
    
3.  **Token acceptance rate:** The percentage of draft tokens accepted by the target model.
    

Token acceptance rate is high early in the draft sequence, but draft tokens get less reliable deeper in the sequence.

[

![](https://substackcdn.com/image/fetch/$s_!yXtg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2aa828ac-64d7-41cb-9cf3-37a308efabfb_1182x1600.png)

](https://substackcdn.com/image/fetch/$s_!yXtg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2aa828ac-64d7-41cb-9cf3-37a308efabfb_1182x1600.png)

Speculative decoding from draft token generation and validation to prefix acceptance with subsequent token generation

**Aim for short, high-percentage sequences** because while generating and validating tokens is inexpensive relative to generating tokens in the original model, it still comes with meaningful overhead. Additionally, once a single draft token is rejected as wrong, all subsequent tokens in the sequence are also rejected.

Working with speculation is interesting because so many factors affect token acceptance rate. The big one is the temperature parameter – higher temperatures yield token distributions that are harder to predict, reducing the effectiveness of speculative decoding. But even factors as simple as subject matter can make a difference on acceptance rate if the draft model or additional decoder head used for speculation is better versed in, say, math than history.

Another limitation on speculative decoding is that it’s most useful at low batch sizes where there are spare compute cycles. At higher batch sizes, speculative decoding must be dynamically disabled as compute is too saturated to afford verification.

Each speculation algorithm navigates these tradeoffs differently, and careful implementation of the right algorithm for the situation can lead to major improvements in TPS.

During prefill, the inference engine builds a KV cache (a store of keys and values for each token) on the input sequence. It then updates the KV cache for each token during decode. As inference is autoregressive, the value for each new token depends on the value of every previous token in the sequence.

Every inference engine uses KV caching by default on a request-by-request basis. Without KV caching, LLM inference would be unbearably slow since each previous value in the entire sequence would need to be recalculated for each subsequent token.

However, engineers can get more utility from the KV cache by reusing it between requests rather than solely within each inference sequence.

Consider the following two prompts, each with four tokens on most tokenizers:

[

![](https://substackcdn.com/image/fetch/$s_!1jj0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa294de82-8f97-475a-baa2-fb0e9bb83329_1600x970.png)

](https://substackcdn.com/image/fetch/$s_!1jj0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa294de82-8f97-475a-baa2-fb0e9bb83329_1600x970.png)

_A pair of four-token sequences with two-token matching prefixes_

By default, the inference engine has to run prefill on all four tokens of each prompt. But the first tokens of each prompt – “Weather in” – form a shared prefix between the pair.

With prefix caching, you can reuse the KV cache from the first request to improve TTFT on the second request by skipping prefill on the first two tokens and reading in the existing KV cache instead.

When you see pay-per-token APIs charge less for “cache hit” input tokens than “cache miss” tokens, this is why: reusing cached tokens takes very little compute power and time. As an inference engineer, you can apply the same principle to reduce latency, improve throughput and therefore save money on your own deployments.

Saving two tokens won’t make a big impact on TTFT, but prefix caching can skip prefill on thousands of tokens in certain domains:

-   **Complex system prompts:** Agents, customer-facing chatbots, RAG scaffolds, and tool calls often feature long, complex system prompts on every call.
    
-   **Code completion:** Code completion, code generation, and other coding functions require passing the same thousands of lines of code as shared context.
    
-   **Documents and retrieval:** Document summarization, question answering, and retrieval all add repeated context ahead of user prompts.
    
-   **Multi-turn conversations:** Ordinary conversations repeat back every message in a chat template, increasing the savings from prefix caching with every turn.
    

Prefix caching works from the start of the input sequence until the first non-repeated token. The fourth token in the weather example, a question mark, is shared between the two input sequences. However, the prefix ends at the first non-repeated token, so the fourth token isn’t read from cache.

Since prefixes end at the first unique token, your context engineering determines TTFT savings. Consider a different approach to the same prompt:

[

![](https://substackcdn.com/image/fetch/$s_!ehf3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb65f49c0-53a8-49cf-bade-4144a02a728b_1600x871.png)

](https://substackcdn.com/image/fetch/$s_!ehf3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb65f49c0-53a8-49cf-bade-4144a02a728b_1600x871.png)

_A pair of four-token sequences with no prefix match. The first tokens are different, so it doesn’t matter that the next three are the same_

Here, there is no savings from prefix caching, as the very first token differs between the two sequences, even though every subsequent token is the same. To take advantage of prefix caching, ensure that novel tokens are as late in your prompt as possible.

Tensor Parallelism (TP) should be your default strategy for multi-GPU model inference. It supports dense models like Llama 405B, and the MoE (mixture of experts) models that currently dominate the open model landscape.

[

![](https://substackcdn.com/image/fetch/$s_!hyIE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb3fca43a-177d-483f-aaaa-09a77d7ded48_1600x635.png)

](https://substackcdn.com/image/fetch/$s_!hyIE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb3fca43a-177d-483f-aaaa-09a77d7ded48_1600x635.png)

_Tensor Parallelism splits weights across GPUs, effectively sharing VRAM resources to run large models fast_

TP works by splitting apart each layer of the model (as opposed to Pipeline Parallelism, which keeps layers intact) and distributing the layer fragments across the allocated GPUs. For each layer, the expense of reading from weights’ memory and executing matrix multiplication is shared across the GPUs.

[

![](https://substackcdn.com/image/fetch/$s_!upQ4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ba6857f-6b2f-43a1-8bb7-d6bd5956cfba_1600x635.png)

](https://substackcdn.com/image/fetch/$s_!upQ4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ba6857f-6b2f-43a1-8bb7-d6bd5956cfba_1600x635.png)

_For an MoE models, each expert runs across multiple GPUs with Tensor Parallelism_

However, the results of each layer need to be communicated in an all-reduce fashion (across all eight GPUs) into a single output before the next layer can be computed. In nodes with high-bandwidth intra-node NVLink and NVSwitch, this communication overhead is minimized.

Increasing Tensor Parallelism improves TPS on a per-user basis, assuming the model is large enough and the sequences are long enough that the communication overhead doesn’t outweigh the faster forward pass – which is the case for most frontier models.

Expert Parallelism (EP) neatly divides experts across GPUs, so that in a model with 128 experts served in EP8 across eight GPUs, each GPU hosts 16 full experts.

[

![](https://substackcdn.com/image/fetch/$s_!ky6k!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9f4985f5-2ca5-46d3-82e1-dcd6b5d79e11_1600x635.png)

](https://substackcdn.com/image/fetch/$s_!ky6k!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9f4985f5-2ca5-46d3-82e1-dcd6b5d79e11_1600x635.png)

_EP runs each expert within a single GPU, with each GPU hosting multiple experts_

EP improves total system throughput, making inference more scalable and less expensive. With individual experts processing tokens separately, each token takes just as long, but the system as a whole can handle more simultaneous tokens.

Many deployments use a mix of TP and EP to achieve both benefits.

[

![](https://substackcdn.com/image/fetch/$s_!Lp5z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29868580-3456-4211-bad8-74d93a75ac3e_1600x859.png)

](https://substackcdn.com/image/fetch/$s_!Lp5z!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29868580-3456-4211-bad8-74d93a75ac3e_1600x859.png)

_This deployment uses TP for attention and EP for the sparse MoE layer_

EP requires less inter-GPU communication than Tensor Parallelism. The Expert Router, which determines which experts each token activates, is replicated onto each GPU as it is a relatively small component of the model. Inter-GPU communication is necessary for passing tokens from expert to expert, but unlike TP, it is not required to collect the results of each layer.

Thanks to this lower communication overhead, EP scales well to multi-node deployments and systems with limited interconnect bandwidth.

Disaggregation combines three important ideas in inference engineering:

1.  Prefill is a compute-bound process that determines the time to first token (TTFT), while decode is a memory-bound process that determines TPS.
    
2.  Specialization improves performance in everything from kernel selection to inference engine parameter tuning.
    
3.  You can effectively parallelize model serving over multiple GPUs, or even multiple nodes, if you can avoid bottlenecks from lower-bandwidth interconnects.
    

When prefill and decode run on the same node under heavy traffic, they have a higher chance of interfering with one another. Ideally, prefill uses more compute resources, while decode uses more memory, and the two can co-exist efficiently. However, with larger batches and more compute-intensive optimizations, prefill and decode start competing for resources.

Disaggregation, or disaggregated serving, is the idea of separating prefill and decode into separate engines on separate GPUs or nodes.

[

![](https://substackcdn.com/image/fetch/$s_!lh6b!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F90917382-7d84-4ddf-806f-a514cd61d581_1600x1014.png)

](https://substackcdn.com/image/fetch/$s_!lh6b!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F90917382-7d84-4ddf-806f-a514cd61d581_1600x1014.png)

Disaggregation assigns prefill workers to generate the first token and decode workers to generate subsequent tokens

Disaggregation turns LLM inference into a three-step process:

1.  The prefill engine takes the input sequence and generates a KV cache while computing the first token.
    
2.  The prefill engine sends the KV cache over the hardware interconnect to the decode engine.
    
3.  The decode engine computes all subsequent tokens.
    

In conditional disaggregation, the request is first sent to the decode engine, which checks if the input sequence is already cached, or is short enough to handle locally:

1.  If so, the decode engine handles prefill locally, skipping disaggregation.
    
2.  If not, the decode engine transfers the request to the prefill engine for disaggregated serving.
    

Conditional disaggregation is better for real-world traffic.

Another benefit of disaggregation is that with separate prefill and decode engines, you can optimize each engine individually and the system as a whole. For example, the compute-bound prefill engine requires a lower TP than the memory-bound decode engine.

_This is Gergely again._ Thanks to [Philip](https://x.com/philipkiely) for this deepdive into inference engineering, which is around 10% of the contents of his new book, _”Inference Engineering.”_ If you’d like to go deeper into this topic, you can download the full book for free:

[Get the full e-book, for free](https://baseten.com/inference-engineering)

This title will also be available in physical, printed form: sign up to the [waitlist](https://www.baseten.co/inference-engineering/paper-waitlist/) to be notified when it’s available.

**It’s encouraging that inference engineering is no longer a “monopoly” belonging to a few leading AI labs.** Top AI model makers like OpenAI and Anthropic control all aspects of their AI models – from training to inference – so there’s no inference engineering to be done with them.

However, thanks to increasingly capable open models, engineering teams have the opportunity to tweak how they use models, and this is where the theory and practice of inference engineering becomes invaluable.

**Even so, the discipline of inference engineering still seems to only make sense for a subset of tech companies.** To justify investment in inference engineering, you need to be spending big money on inference from vendors. This is the point at which it can make sense to invest time and money to see if you can set up your own inference stack on top of open models, and swap out some existing usage.

**I wonder if inference engineering is the AI version of the “build vs buy” dilemma.** For software-as-a-service (SaaS), the question for every company is whether to build it in-house, or buy from a vendor. For example, should you build a project management software (it’s possible!), or just buy an existing one? And what about feature flagging, not to mention observability?

Experienced engineers all understand the pros and cons of building it yourself (time and maintenance, which is a constant drag.) Tuning and operating your own LLM stack is a much newer field, and inference engineering is at the heart of building better inference stacks than what comes “out of the box” with open models.

**Picking up the basics of inference engineering feels like a valuable skill – and it’s also new and interesting.** If you become well-versed in inference engineering, you could create optionality for your own team and company in LLM usage**.** Running your own inference stack on top of an open model gives control of what you’re running and of pricing. Inference engineering helps create options for achieving better performance from an open model by using the approaches covered in the extract above from Philip’s book.

No posts