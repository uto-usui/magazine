---
title: "Introducing Gemini 3 Flash"
source: "https://addyosmani.com/blog/gemini-3-flash/"
publishedDate: "2025-12-17"
category: "performance"
feedName: "Addy Osmani"
---

**Today we’re expanding the Gemini 3 model family with the release of Gemini 3 Flash, which offers frontier intelligence built for speed at a fraction of the cost.** With this release, we’re making Gemini 3’s next-generation intelligence accessible to everyone across Google products.

For years, developers have faced an impossible choice: pick a model that delivers deep reasoning and strong coding capabilities but runs slowly and costs significantly, or choose one that’s fast and economical but struggles with complex logic and agentic workflows. With Gemini 3 Flash, that tradeoff is over.

## Why Gemini 3 Flash matters for your production systems

Gemini 3 Flash was built for developers who need to ship production-ready applications at scale. Whether you’re building high-frequency workflows, autonomous coding agents, real-time customer support systems, or multimodal applications that process video and documents on the fly, this model delivers the intelligence you need without the latency penalties or cost barriers that have historically come with frontier-class models.

Last month, we kicked off Gemini 3 with [Gemini 3 Pro](https://addyosmani.com/blog/gemini-3/) and Gemini 3 Deep Think mode, and the response has been incredible. We’ve seen developers use Gemini 3 to build code simulations that help teams learn complex topics, design interactive games that respond to natural language, and create applications that understand all types of multimodal content.

With Gemini 3, we introduced frontier performance across complex reasoning, multimodal and vision understanding, and agentic and vibe-coding tasks. Gemini 3 Flash retains this foundation, combining Gemini 3’s Pro-grade reasoning with Flash-level latency, efficiency, and cost. The model doesn’t just enable everyday tasks with improved reasoning - it’s also our most impressive cost-effective model for agentic and coding workflows.

## Frontier intelligence at scale

Gemini 3 Flash demonstrates that speed and scale don’t have to come at the cost of intelligence. The model delivers frontier performance on PhD-level reasoning and knowledge benchmarks like GPQA Diamond (90.4%) and Humanity’s Last Exam (33.7% without tools), rivaling much larger frontier models. The model also reaches state-of-the-art performance with an impressive score of 81.2% on MMMU Pro, comparable to Gemini 3 Pro.

Building on the Flash series architecture that developers and users already trust, Gemini 3 Flash pushes the Pareto Frontier of quality versus cost and speed. The model’s strength lies in its raw speed - it outperforms 2.5 Pro while being 3x faster based on Artificial Analysis benchmarking. Even when thinking levels are set to “minimal” 3 Flash often outperforms previous versions with thinking turned on.

### Benchmarks that matter for real applications

Here’s how Gemini 3 Flash performs across the benchmarks developers care about:

**Reasoning and knowledge**

-   GPQA Diamond: 90.4% (academic reasoning at the PhD level)
-   Humanity’s Last Exam: 33.7% without tools, 46.5% with tools
-   MMMU Pro: 81.2%

**Coding and agentic performance**

-   SWE-bench Verified: 75% (matching Gemini 3 Pro)
-   Aider polyglot: 95.2%
-   BFCL overall: 92.8%

**Mathematical reasoning**

-   AMC 2023: 95.2% with tools, 79.7% without tools
-   AIME 2024: 33.6%

**Input/output pricing**

-   $0.50 per 1M input tokens
-   $3.00 per 1M output tokens
-   Audio input remains at $1/1M input tokens
-   Context caching included standard, enabling up to 90% cost reductions for repeated token use

For comparison, note that pricing scales up from $0.30/$2.50 for teams using 2.5 Flash. While 3 Flash costs slightly more per token, the performance gains and reduced need for multiple model calls make it significantly more cost-effective for complex workflows.

## Built for iterative development

Gemini 3 Flash is made for developers building production applications. The model offers Gemini 3 Pro-grade coding performance with low latency - it can reason about and solve tasks quickly in high-frequency workflows. On SWE-bench Verified, a real-world coding evaluation measuring the model’s capabilities at addressing GitHub issues, Gemini 3 Flash achieves a score of 75%, outperforming not only the 2.5 series but also Gemini 3 Pro. The model strikes an ideal balance for agentic coding, production-ready systems, and responsive interactive applications.

### What this means for your development workflow

The combination of strong reasoning, low latency, and competitive pricing makes Gemini 3 Flash particularly effective for several development patterns:

**High-frequency API calls**: When you’re building applications that make dozens or hundreds of model calls per user session - like code review tools, interactive tutoring systems, or real-time content moderation - the speed and cost efficiency of 3 Flash means you can afford to be more ambitious with your feature set.

**Agentic systems**: For autonomous agents that need to make decisions, execute tool calls, and iterate on problems, the model’s 75% SWE-bench Verified score combined with its sub-second response times means your agents can operate at conversation speed rather than forcing users to wait for each reasoning step.

**Multimodal processing pipelines**: The model’s strong performance on visual reasoning and multimodal understanding, combined with its speed, makes it practical to build applications that analyze video content in near real-time, extract structured data from complex documents, or provide visual Q&A for customer support workflows.

## Real-world adoption and use cases

We’re already seeing impressive adoption from companies using Gemini 3 Flash to transform their businesses. Companies like Salesforce, Workday, and Figma are using the model’s inference speed and reasoning capabilities, recognizing how its performance on par with larger models makes it possible to deploy sophisticated AI features at production scale without the costs typically associated with frontier models.

### Deepfake detection at scale

Resemble AI is using Gemini 3 Flash to provide real-time deepfake intelligence by instantly transforming complex forensic data into simple explanations. They discovered that 3 Flash offered 4x faster multimodal analysis compared to 2.5 Pro, processing raw technical outputs without hindering workflows that require both speed and accuracy.

### Legal document analysis

Performance gains often come with a latency tradeoff, but Gemini 3 Flash proves that fast models can still handle the rigorous accuracy demands of the legal industry. With strong reasoning capabilities, the model enables new levels of efficiency for complex document analysis.

Harvey, an AI company for law firms and professional service providers, has seen Gemini 3 Flash achieve a meaningful step up in reasoning, improving over 7% on Harvey’s BigLaw Bench from its predecessor, Gemini 2.5 Flash. These quality improvements, combined with Flash’s low latency, prove impactful for high-volume legal tasks such as extracting defined terms and cross-references from contracts.

### Video analysis and content understanding

Developers building applications that need to understand video content - whether for in-game assistants, content moderation, educational tools, or accessibility features - can now process visual information at the speed required for responsive user experiences. The model’s multimodal capabilities extend to complex video analysis, data extraction, and visual Q&A, making it possible to build applications that were previously impractical due to latency or cost constraints.

## Where you can build with Gemini 3 Flash

Starting today, Gemini 3 Flash is rolling out to millions of developers globally across multiple platforms and surfaces:

**For developers using the Gemini API**: Access Gemini 3 Flash now in [Google AI Studio](https://ai.dev/) and through the [Gemini API](https://ai.google.dev/gemini-api/docs). The model is available globally with the model string `gemini-3-flash-preview`.

**For everyone using consumer products**: Gemini 3 Flash is now the default model in the Gemini app, replacing 2.5 Flash. That means all Gemini users globally will get access to this next-generation intelligence at lightning speeds.

**For enterprises**: Gemini 3 Flash is available in preview in [Vertex AI](https://cloud.google.com/vertex-ai) and [Gemini Enterprise](https://cloud.google.com/gemini-enterprise). Business teams can access the model through Gemini Enterprise, our advanced agentic platform for teams to discover, create, share, and run AI agents in their enterprise.

## Advanced multimodal capabilities

Flash remains our most popular version - 2 Flash and 2.5 Flash are used by millions of developers, powering hundreds of thousands of apps and processing trillions of tokens. With 3 Flash, you no longer need to make the tradeoff between speed and intelligence. The core model is so capable that 3 Flash often yields better performance with thinking disabled than previous versions did with thinking turned on.

Gemini 3 Flash excels at multimodal processing across several dimensions:

**Video understanding and analysis**: Build applications that can analyze video content in near real-time, whether for in-game assistants that need to understand what’s happening on screen, content moderation systems, or educational tools that provide contextual help based on video content.

**Document extraction and understanding**: The model features advanced visual and spatial reasoning capabilities, making it effective for applications that need to extract structured information from complex documents, understand layouts, or reason about diagrams and charts.

**Code execution and visual outputs**: Gemini 3 Flash now offers code execution capabilities, allowing the model to write, run, and iterate on code to solve problems. This feature is particularly useful when you need the model to generate visualizations, perform calculations, or validate logic by actually running code rather than just describing it.

### What makes 3 Flash different for multimodal applications

The speed of Gemini 3 Flash opens up new application patterns that weren’t practical with slower models. When you can process a video frame or analyze a complex document in under a second, you can build interactive experiences that feel responsive rather than making users wait. This is particularly valuable for:

-   Customer support applications where agents need to understand screenshots or screen recordings from users in real-time
-   Gaming applications where NPCs or assistants need to react to visual game state
-   Accessibility tools that need to provide audio descriptions of visual content with minimal delay
-   Educational applications that provide contextual help based on what students are looking at

## Pricing designed for scale

We believe frontier intelligence should be accessible to developers at every stage, from prototype to production. Gemini 3 Flash is priced to support building applications at scale:

-   Input tokens: $0.50 per 1 million tokens
-   Output tokens: $3.00 per 1 million tokens
-   Audio input: $1.00 per 1 million tokens (same as 2.5 Flash)

Context caching comes standard with Gemini 3 Flash, allowing for up to 90% cost reduction for applications with repeated token use. This is particularly valuable for applications that maintain conversation history, work with large codebases, or process similar documents repeatedly. Similarly, 3 Flash is also available today with the Batch API, allowing for 50% cost savings and higher rate limits for asynchronous processing. For synchronous and real-time use cases, paid API customers also have access to production-ready rate limits.

### Comparing pricing across the Gemini family

While 3 Flash costs more per token than 2.5 Flash ($0.50/$3 versus $0.30/$2.50), the performance gains typically result in lower overall costs for complex tasks because you need fewer retries, can use a single model call instead of multiple steps, and get higher-quality outputs that require less post-processing. For teams currently using larger models for reasoning-heavy tasks, 3 Flash offers significant cost savings - typically 85-90% reduction - while maintaining comparable performance.

## Building with Gemini 3 Flash: practical guidance

Flash is our most popular model series, used by millions of developers worldwide. With 3 Flash, you get frontier intelligence without sacrificing the speed and cost efficiency that made the Flash series successful. Here’s how to think about using 3 Flash in your applications:

**When to use Gemini 3 Flash**:

-   **Scaling workloads**: Use 3 Flash for scaling high-volume traffic, instant tool execution, and low latency response.
-   **Production systems**: Where performance at scale is critical, including high-frequency applications and real-time customer support.
-   **Multimodal applications**: For processing images, video, or documents on the fly with top-tier intelligence.

**When you might still want Gemini 3 Pro**:

-   **Hardest 10% of tasks**: Use 3 Pro for complex strategic planning, deep reasoning, and high-stakes decision making.
-   **Deepest reasoning**: Tasks that benefit from the absolute highest quality and where cost and latency are secondary to reasoning depth.
-   **Complex workflows**: Where you need the model to think deeply about multi-step problems before responding.

The most effective strategy is often to **start with Gemini 3 Pro** for reasoning and initial development, then **scale with Gemini 3 Flash** for production. This architecture helps lower total cost of ownership while maintaining premium intelligence across your application.

**When to use thinking modes**:

-   Complex reasoning problems that benefit from chain-of-thought
-   Tasks where you want to see the model’s reasoning process
-   Problems where accuracy is more important than response time

For many developers, Gemini 3 Flash will be the right starting point. You can always upgrade to Pro or add thinking modes for specific hard problems, but the baseline intelligence of 3 Flash is pretty strong.

## Start building today

Gemini 3 Flash is available now across our entire ecosystem:

-   **Google AI Studio & Gemini API**: Available globally for developers
-   **Vertex AI**: Available in preview for enterprise customers
-   **Gemini CLI**: Downloadable now to install in your terminal
-   **Android Studio**: Integrated for mobile developers
-   **Gemini app**: Rolling out as the default model to users worldwide
-   **AI Mode in Search**: Available globally with access to everyone

We built Gemini 3 Flash because we believe the future of AI development shouldn’t require choosing between intelligence and practicality. With frontier-class reasoning, strong coding and agentic capabilities, advanced multimodal understanding, and the speed and cost efficiency to deploy at scale, we’re excited to see what you build.

Get started at [AI Studio](https://ai.google.dev/) or explore the model in [Vertex AI](https://cloud.google.com/vertex-ai) today.