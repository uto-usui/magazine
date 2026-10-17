---
title: "Advancing Generative Recommendation Inference: our collaboration with NVIDIA on TensorRT LLM"
source: "https://engineering.atspotify.com/2026/10/advancing-generative-recommendation-inference-our-collaboration-with-nvidia-on-tensorrt-llm/"
publishedDate: "2026-10-16"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

At Spotify, every surface and interaction is personalized to you as a user: the content on the Home page, the next song that plays, and more recently the ability to talk to Spotify. 

Traditionally, this content is provided by recommendation systems that require multiple steps for candidate retrieval and ranking, and perhaps individual systems per surface. Generative AI is fundamentally changing this. We have been exploring how to provide recommendations via a Large Personalized Language Model in real time, across multiple surfaces.

This shift, however, presents unique engineering challenges, particularly when moving from a proof of concept to a scalable, production-grade inference architecture. 

## **Spotify’s journey into LLM-powered recommendations**

### **Beam search**

In January 2026, Spotify introduced LLM-powered technology to its podcast recommendations. The work is grounded in recent advancements in generative recommendation architectures, specifically the foundational methods introduced in the [PLUM paper](https://arxiv.org/abs/2510.07784) . At Spotify, we have applied these concepts to build a specialized generative recommendation system for podcasts, aimed at delivering deeply personalized listening experiences. Our specialized architecture, detailed in our ["Deploying Semantic ID-based Generative Retrieval for Large-Scale Podcast Discovery at Spotify"](https://arxiv.org/pdf/2603.17540) paper  employs beam search to explore multiple token sequence paths simultaneously for candidate generation. 

Beam search is a technique that allows exploration of an LLM’s output space with the goal of identifying highly probable token sequences. This technique navigates a decision tree of potential recommendations by keeping the most promising 'beams' or sequences active at each step, with the goal of identifying the highest-scoring podcasts for personalization. For this reason, these top sequences constitute semantic IDs that are then translated to catalog items to serve recommendations to users.

![Beam Search](https://images.ctfassets.net/p762jor363g1/428m8tTUKuNmmg3vEbNYKT/76d6fe626e4a683dd2a3994bc5d6a3c1/image1.png)

Beam search decoding explanation.

Our initial release relies on [vLLM](https://github.com/vllm-project/vllm) as an inference engine. vLLM is one of the most widely adopted open source inference engines, particularly strong at supporting modern model architectures for high-throughput  inference deployments. However vLLM’s support for beam search is limited compared to traditional completion requests – its beam search implementation doesn’t extract the maximum performance from GPU devices.

Specifically, vLLM's beam search implementation operates outside the core GPU engine, which introduces CPU-side bottlenecks and additional GPU work due to the recomputation of partially filled KV blocks.

For our January launch, these limitations meant we couldn't fully utilize high-end GPUs, so we opted for lower-tier accelerators to manage costs while keeping the system at a more optimal load point. 

## **Candidate scoring**

Another inference technique we’ve been exploring is candidate scoring. Candidate scoring uses a model's log probabilities to evaluate and rank a set of candidates. 

A naive way to perform this type of inference is to adopt a “fan-out” approach and run inference on each candidate separately, for each request then we extract the related logprobs, before aggregating them to achieve the desired ranking operation.

This type of inference is generally available in most open source inference engines, however a more efficient technique has found its way into [SGLang](https://github.com/sgl-project/sglang), thanks also to work from [Linkedin’s engineering team](https://www.linkedin.com/blog/engineering/ai/turbocharging-linkedins-recommendation-systems-with-sglang). For this reason we’ve been utilizing SGLang as well to access this feature at inference time with an efficient candidate masking technique that allows us to score multiple candidates in a single request.

![Candidate scoring](https://images.ctfassets.net/p762jor363g1/63LsM1ILHVYf5AZYjC9NWE/7e90af20c1a20fea24c827e7706b6141/image3.png)

Multi item scoring explanation.

## **Personalization**

The most important part of Spotify recommendations is our ability to personalize based on user preferences and interactions. In our traditional recommendation systems, we have used [dense user embeddings](https://research.atspotify.com/2025/9/generalized-user-representations-for-large-scale-recommendations) to accomplish personalization at scale. As we have experimented with LLM-based recommendations, we have explored a few approaches to enable personalization in this new paradigm.

### **Plain User Text**

This approach entails converting user listening and interaction history to text to place in the prompt for the LLM. The major issue with fully text based user history is the amount of text required to accurately represent the user. Prompts become extremely large, resulting in large inference latency that is too long for our request budget as well as higher GPU usage. Plain User Text is used sparingly, generally for smaller cases like the user’s most recent real time streams.

### **User Semantic Ids**

Similar to the PLUM paper mentioned earlier, we explored representing user history as a semantic id. This approach extends the model vocabulary with user semantic id tokens, which are easily added to prompts using a handful of text tokens, keeping prompts short and easily servable with no custom inference requirements. The LLM was fine tuned using the user semantic id space and extended vocabulary, and at inference time, a user semantic id is added to the prompt. While early results were promising, this approach requires further experimentation and research before it's ready for production. 

### **Soft Tokens**

The most successful method we have used for personalizing LLM requests is based on our existing user embeddings. The general approach is outlined in a white paper called [Embedding to Prefix](https://arxiv.org/pdf/2505.17051) created by [Spotify Research](http://research.atspotify.com/). Overall, the idea is to learn a projection from an existing embedding space into an LLM’s embedding space as a single soft token.  The LLM is fine tuned using a subset of the weights to be able to use this soft token to personalize recommendation outputs. At inference time, a user vector is projected into the LLM embedding space and inserted into the prompt before executing the initial forward pass. We have used this approach successfully for podcast recommendations and are currently integrating and evaluating it for various tasks with our internal LLM model.

![Soft token projection](https://images.ctfassets.net/p762jor363g1/2eO1SYzEzJffCdvTxWAWr0/771213aefee421d0169996ecf9010772/image2.png)

Soft token projection explanation.

## **Expanding LLM-powered recommendation systems**

The successful rollout of our first LLM-powered recommendation system, along with continued internal experimentation, has grown into a broader effort to bring generative recommendation capabilities across Spotify, powering our listening experience across catalog offerings and driving user interactions across surfaces. As this work moves toward production, an efficient and manageable inference stack becomes increasingly important. This is where our collaboration with NVIDIA began.

## **Partnering with NVIDIA: Building for Feature Parity**

We kicked off our collaboration with NVIDIA with a clear goal: unify the inference features that we require (efficient beam search, scoring, and user soft tokens) into a single engine. 

To address these challenges, we looked to [TensorRT LLM](https://github.com/NVIDIA/TensorRT-LLM) (TRT-LLM) together with NVIDIA engineers. While TensorRT LLM offered superior hardware utilization for beam search, it initially lacked the specific "Score API" functionality available in our SGLang-based setup, as well as the ability to inject soft tokens and return sequences for multiple beams in beam search available in vLLM. With the NVIDIA engineering team—including Marek, Martin, Stefan, and Alexander—our goal was clear: close the feature gaps in TensorRT LLM.

This work resulted in several additions to the project to aid Spotify’s application of LLM in recommendation systems, specifically

-   support for returning multiple sequences in beam search ([v1.2.0rc3](https://github.com/NVIDIA/TensorRT-LLM/releases?page=5#release-v1.2.0rc3))
    
-   support for out-of-tree models in trtllm-serve ([v1.2.0rc4](https://github.com/NVIDIA/TensorRT-LLM/releases?page=5#release-v1.2.0rc4))
    
-   support for passing multi-modal embeddings via “image\_embeds” ([v1.3.0rc0](https://github.com/NVIDIA/TensorRT-LLM/releases?page=4#release-v1.3.0rc0))
    
-   support for multi-item scoring via the Python API ([v1.3.0rc20](https://github.com/NVIDIA/TensorRT-LLM/releases?page=4#release-v1.3.0rc20))
    
-   general bug fixes and performance improvements
    

Beam search in TensorRT LLM is implemented as part of the sampler, which reduces host overheads and, combined with overlap scheduling, ensures good GPU utilization. Moreover, the C++-based sampler in TensorRT LLM has been replaced with a more flexible design relying more heavily on PyTorch. The beam search support implemented in this new sampler provided a notable performance uplift compared to the previous implementation.

With NVIDIA’s help and review, we used TensorRT LLM’s [out-of-tree model support](https://nvidia.github.io/TensorRT-LLM/torch/adding_new_model.html#out-of-tree-models) to implement a customized Qwen3 extension plugin to implement our soft token approach. The plugin enables passing user vectors via multi-modal request parameters and performs the user embedding projection and soft token replacement.

The multi-item scoring extensions to TensorRT LLM’s Python API enable functionality equivalent to SGLang’s scoring API. Currently, a custom serving layer implementing efficient tokenization and request batching is required. However, TensorRT LLM is continuously evolving and has, e.g., [recently added](https://github.com/NVIDIA/TensorRT-LLM/pull/15424) support for serving prefill-only embeddings. Multi-item scoring is an important performance optimization, because it avoids the overhead of a single request per candidate, while retaining a computational effort linear in the number of candidates.

The efforts mentioned above have landed in recent versions of TensorRT LLM, and the following benchmarks show the performance edge that the implementation is delivering.

![Beam search comparison](https://images.ctfassets.net/p762jor363g1/2vdun8ZuSq0SZEf9Mi9QVX/661ef9ea72c592cfe7458717f45d6d47/image5.png)

Beam search performance comparison.

![Multi-item scoring](https://images.ctfassets.net/p762jor363g1/3KqPDnNnEuNFPAjQIer16y/07d60b8d5da81ca4ebbea613dc45a98c/image4.png)

Multi item scoring performance comparison.

These performance improvements have materially translated into significant cost reduction for Spotify’s generative recommendation applications. Looking at the 1.7B variant of Qwen3 this results in up to 54% cost reduction for beam search workloads and up to 7% cost reduction for scoring workloads.

## **The Road Ahead**

Our collaboration with NVIDIA engineers has not only helped us address immediate inference challenges but has also broadened our perspective on the opportunities for further efficiency gains. As we continue to expand the use of generative recommendation models across Spotify, optimizing inference performance and cost efficiency will remain key priorities. Looking ahead, we are excited to continue working closely with NVIDIA to explore additional optimizations, with a particular focus on quantization and NVIDIA Blackwell-specific techniques that can help us unlock even greater performance from the latest GPU architectures. Ultimately, our goal is to build an inference stack that can support increasingly sophisticated personalization capabilities at scale, while keeping latency and infrastructure costs under control.

### **Acknowledgments**

Thank you to everyone who contributed to this collaboration, and to the authors of this post from Spotify and NVIDIA:

Ivo Senese, Reid Wilbur, Mark VanMiddlesworth, Guy Stone, Marek Pikulski, Stefan Niebler, and Alexander Young.