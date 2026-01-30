---
title: "Introducing the v0 composite model family"
source: "https://vercel.com/blog/v0-composite-model-family"
publishedDate: "2025-06-01"
category: "frontend"
feedName: "Vercel"
author: "Aryaman Khandelwal"
---

5 min read

Jun 1, 2025

We recently launched our AI models `v0-1.5-md` and `v0-1.5-lg` in [v0.dev](http://v0.dev/) and `v0-1.0-md` [via API](https://vercel.com/docs/v0/api). Today, we're sharing a deep dive into the composite model architecture behind those models. They combine specialized knowledge from retrieval-augmented generation (RAG), reasoning from state-of-the-art large language models (LLMs), and error fixing from a custom streaming post-processing model.

While this may sound complex, it enables v0 to achieve significantly higher quality when generating code. Further, as base models improve, we can quickly upgrade to the latest frontier model while keeping the rest of the architecture stable.

## [Link to heading](#why-does-v0-need-a-composite-model-architecture)Why does v0 need a composite model architecture?

Most AI models¹ are one of two things: a proprietary model from a frontier model provider or an open-source model from a third-party host.

While building AI products like v0 and tools like the AI SDK, we’ve found limitations with both of these approaches:

1.  Model knowledge can quickly become outdated for topics that change fast
    
2.  Frontier model labs don’t have the resources or desire to focus on specific use cases like building web apps
    

v0 specializes in building fast, beautiful full-stack web applications. To do so, we leverage the libraries and frameworks that make up the web ecosystem. Projects like React and Next.js are constantly evolving, and proprietary frontier models almost immediately fall behind on framework updates.

Fine-tuning open-source models offers more flexibility, but as of today, proprietary models outperform open models on tasks relevant to v0 by a wide margin, especially code generation with multimodal input.

Frontier models also have little reason to focus on goals unique to building web applications like fixing errors automatically or editing code quickly. You end up needing to prompt them through every change, even for small corrections.

Our composite model architecture lets us decouple these pieces from the base model. We can pair a state-of-the-art base model with specialized data retrieval, an optimized Quick Edit pipeline, and a custom AutoFix model to improve output.

This allows us to adopt new state-of-the-art base models as they are released without needing to rewrite every step of the process. When you use a v0 model through our API, you get access to this entire pipeline.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1BH582IYXTHlsRnvK0Qyjj%2F6e07dc7baed28474adcc2323d1f20f3e%2F1920w_x_vh.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6yaiscbJ28aw0EJHuilrvJ%2F16d28ef20398f77532f55a6108201e61%2F1920w_x_vh_d.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ROQeG0emgbR2ayy7BmvPm%2F8dd53ce8442b2bffdde0deb9ea780fd2%2F414w_x_vh.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1pSH7LcJ1CNluquyoImcIn%2Fc096c1eee543ffda8b31dfe224e4f204%2F414w_x_vh_d.png&w=1920&q=75)

## [Link to heading](#how-does-v0’s-composite-model-work)How does v0’s composite model work?

**Pre-processing**

When you send a message to v0, we take a number of steps to prepare input before making a model call.

First, v0’s system prompt defines v0’s response format and includes information about v0’s capabilities. We also include recent messages from your chat to maintain continuity, and summaries of older ones to optimize the context window.

Finally, we retrieve additional context based on your query from our own dataset, pulling from documentation, UI examples, your uploaded project sources, internal Vercel knowledge, and other sources to improve v0's output.

**State of the art base models**

For new generations or large-scale changes, our base model handles the generation task. This is a high-capability model chosen from the current set of frontier models, depending on which v0 model you're using.

For smaller edits, parts of your request are routed to our Quick Edit model that is optimized for speed. Quick Edit is optimal for tasks with narrow scope, like updating text, fixing syntax errors, or reordering components.

Because of v0’s composite architecture, base models can be updated or replaced as new models become available without needing to rebuild the entire model pipeline. For example, `v0-1.0-md` currently uses Anthropic's Sonnet 3.7 while `v0-1.5-md` uses Sonnet 4. The composite model architecture allowed us to upgrade the base model while keeping the rest of the stack stable.

**Custom AutoFix model**

While the base model streams output, v0 is constantly checking the output stream for errors, inconsistencies, and best practice violations. Our custom AutoFix model handles many of these issues mid-stream to further improve output quality.

Once the model finishes streaming, we run a final pass to catch any remaining issues that couldn’t be detected mid-stream. We also run a linter on your final output to catch and fix style inconsistencies and simple errors.

## [Link to heading](#how-do-v0-models-perform)How do v0 models perform?

One of our primary evaluations for v0 models measures how often their generations result in errors. We’ve designed evaluation sets from common web development tasks and measure the rate at which models can produce error-free code while performing them. From our benchmarks, v0 models substantially outperform their base model counterparts.

**Model**

**Error-free generation rate**

v0\-1.5-md

93.87

v0\-1.5-lg

89.80

claude-4-opus-20250514

78.43

claude-4-sonnet-20250514

64.71

gemini-2.5-flash-preview-05-20

60.78

gemini-2.5-pro-preview-05-06

58.82

o3

58.82

gpt-4.1

58.82

`v0-1.5-lg` is a bigger model than `v0-1.5-md` but can make more mistakes, a common tradeoff in scaling AI models.

While error rates are similar across `v0-1.5-md` and `v0-1.5-lg`, we’ve found that `v0-1.5-lg` is better at reasoning about hyper-specialized fields like physics engines in three.js and multi-step tasks like database migrations. `v0-1.5-lg` also supports a much larger context window.

## [Link to heading](#training-our-own-autofix-model)Training our own AutoFix model

Language models are stochastic, and each one comes with its own quirks. Some consistently over-format with markdown, others misplace files or introduce subtle bugs. We use a comprehensive set of evals, along with feedback from [v0.dev](http://v0.dev/) users, to track these patterns and identify areas where output consistently needs correction.

These issues led us to build a pipeline that combines deterministic rules with AI-based corrections to catch and fix common errors during generation. Early versions of this pipeline relied on Gemini Flash 2.0.

To improve both speed and reliability, we trained our own custom AutoFix model, `vercel-autofixer-01`, in conjunction with Fireworks AI using reinforcement fine-tuning (RFT). Over the course of multiple training iterations, we optimized the AutoFix model to minimize error rates across a variety of tracked categories.

**Performance optimization over training iterations**

`vercel-autofixer-01` was designed to quickly apply fixes while reducing error rates. On our error incidence evals, it performs at par with gpt-4o-mini and gemini-2.5-flash, while running 10 to 40 times faster.

**Model Name**

**Error-free output rate**

**Chars/Sec**

vercel-autofixer-01

86.14

8,130.01

gemini-2.5-flash-preview-05-20

89.55

559.05

gpt-4o-mini

83.33

238.9

gpt-4.1-nano

79.31

374.26

gemini-2.0-flash

70.3

627.47

claude-3-5-haiku-20241922

61.03

246.05

gemini-2.0-flash-lite

26.67

733.55

## [Link to heading](#what’s-next)What’s next?

The v0 model family is available via API and in [v0.dev](https://v0.dev/). You can [use v0 models in your favorite editors](https://vercel.com/docs/v0/cursor), or build custom workflows. For instance, you can [leverage v0 to write scripts tailored to automated code migration](https://x.com/rauchg/status/1926478569892348216). We’ll continue to improve our model output and release new model classes in the upcoming months.

¹: A notable exception is [Perplexity Sonar](https://ai-sdk.dev/providers/ai-sdk-providers/perplexity), an "online" model.