---
title: "Composable AI for ecommerce: Hands-on with Vercel’s AI SDK"
source: "https://vercel.com/blog/composable-ai-for-ecommerce-hands-on-with-vercels-ai-sdk"
publishedDate: "2024-04-09"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

5 min read

Apr 9, 2024

Build custom AI-powered features at lightning speed.

Imagine you have a great idea for an AI-powered feature that will transform your ecommerce storefront—but your existing platform stands in the way of innovating and shipping. Legacy platforms come with slow and costly updates, and you're beholden to your vendor's roadmap.

[With composable architecture](https://vercel.com/resources/8-advantages-of-composable-commerce), that all changes. You can choose and seamlessly integrate all the best tools, shipping your ideas with maximum efficiency.

At Vercel, we believe composable should include AI. We want it to be as straightforward as possible within the JavaScript ecosystem to develop AI features that enrich your users’ digital experiences.

## Contents

1.  [
    
    Case study: AI-powered reviews
    
    ](#case-study:-ai-powered-reviews)
2.  [
    
    Prompt engineering in Vercel’s AI Playground
    
    ](#prompt-engineering-in-vercel’s-ai-playground)
3.  [
    
    Using Vercel AI SDK
    
    ](#using-vercel-ai-sdk)
4.  [
    
    Prototyping UI with v0
    
    ](#prototyping-ui-with-v0)
5.  [
    
    Case study takeaways
    
    ](#case-study-takeaways)
6.  [
    
    Ideas for AI features
    
    ](#ideas-for-ai-features)
7.  [
    
    Making search relevant
    
    ](#1.-making-search-relevant)
8.  [
    
    Speeding up customer support
    
    ](#2.-speeding-up-customer-support)
9.  [
    
    AI for everyone
    
    ](#ai-for-everyone)

## [Link to heading](#case-study:-ai-powered-reviews)Case study: AI-powered reviews

I recently [demonstrated the speed and power of composable AI](https://www.linkedin.com/posts/malteubl_today-was-a-great-day-to-get-my-hands-dirty-activity-7164385372733464576-7vf9/). Using a combination of v0, Mistral AI (via Perplexity), and the Vercel AI SDK, I made a [working replica](https://vercel.com/templates/next.js/customer-reviews-ai-summary-nextjs-vercel) of Amazon’s AI-generated review summaries in just a couple of hours.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6CTJjxzajrfrwZVAg1BSH9%2F289cef702127d684f55359143e7fb19d%2Freview-summarizer-app-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1TEheg78ywE0iv771Xl7tX%2F1c021764f1c3bedf653b648996d7b8f4%2Freview-summary-app-dark.png&w=1920&q=75)

For this, I coded up a [Next.js app that prompts an LLM](https://github.com/vercel/ai-review-summary/blob/main/lib/ai-summary.ts) with a product's user reviews and average rating to generate a quick summary of how users feel about the product. This gives shoppers an at-a-glance understanding of product quality beyond the flat star averages or rating distributions.

The app is a proof-of-concept, but with a few small tweaks, you could get it working with real product data across your storefront. You can [clone the template](https://vercel.com/templates/next.js/customer-reviews-ai-summary-nextjs-vercel) to further understand the functionality.

### [Link to heading](#prompt-engineering-in-vercel’s-ai-playground)Prompt engineering in Vercel’s AI Playground

The [prompt I wrote](https://github.com/vercel/ai-review-summary/blob/45813fac9579e3b24cd2268f3bc0d371d019ddfe/lib/ai-summary.ts#L21-L48) can likely be optimized further, but it works great for a start. The real complexity comes in choosing an AI model.

There are a lot of great LLMs out there, which makes it tricky to figure out which one is going to accept the prompt and do the job best. For this review summarizer, I was able to quickly find a suitable model by [competing a few against each other on `play.vercel.ai`](http://play.vercel.ai/).

![To help you determine LLM responsiveness and accuracy, Vercel’s AI Playground lets you quickly test as many models as you’d like with synchronized prompts and chats. You can tweak settings, such as temperature, for each model.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6bDqKJOU3O4652fkFwmVvX%2F8d3878235b72ebad4a9a25c7ef8f03e1%2Fvercel-ai-playground-review-summaries.png&w=1920&q=75)

To help you determine LLM responsiveness and accuracy, Vercel’s AI Playground lets you quickly test as many models as you’d like with synchronized prompts and chats. You can tweak settings, such as temperature, for each model.

From this, I determined that Mistral’s open-source, 7-billion-parameter LLM is extremely responsive and accomplishes the job at hand. But for a sophisticated use case, something more capable and computationally expensive, like OpenAI’s GPT-4 or Anthropic’s Claude 3 Opus, might be necessary.

### [Link to heading](#using-vercel-ai-sdk)Using Vercel AI SDK

[Vercel’s AI SDK](https://sdk.vercel.ai/docs) is an open-source library designed to help developers build conversational streaming user interfaces in JavaScript and TypeScript. The SDK supports React/Next.js, Svelte/SvelteKit, and Vue/Nuxt as well as Node.js, Serverless, and the Edge Runtime.

With the AI SDK inside of Next.js App Router, for instance, you can easily tweak the model and its related settings right inside your [Server Components](https://vercel.com/blog/understanding-react-server-components), which allows for enhanced composability:

```
import { render } from 'ai/rsc'import OpenAI from 'openai'const openai = new OpenAI()async function submitMessage(userInput) {  'use server'  return render({    provider: openai,    model: 'gpt-4',    messages: [      { role: 'system', content: 'You are an assistant' },      { role: 'user', content: userInput }    ],    text: ({ content }) => <p>{content}</p>,  })}
```

This means building even complex AI features becomes like building any other UI. Plus, you can further optimize by, for instance, swapping models in different development environments to see how they perform in context.

After the query is ready to send to the model, we can use AI SDK and Next.js to stream and cache our response. With the review summarizer demo, [I used Next.js caching](https://github.com/vercel/ai-review-summary/blob/45813fac9579e3b24cd2268f3bc0d371d019ddfe/lib/ai-summary.ts#L60-L82) to ensure the prompt is only sent to the model once, on deploy. However, it can also be configured to be fully dynamic or [programmatically revalidated and statically regenerated without redeploy](https://vercel.com/docs/incremental-static-regeneration).

### [Link to heading](#prototyping-ui-with-v0)Prototyping UI with v0

Now that I had a way to return a response from the model, I needed a place to display it. Here, I could use another AI tool, Vercel’s v0, which allows you to generate usable React UI from text and image prompts, so you can quickly get a feel for user experience.

Here’s a brief overview of how it works:

Once I had a design that I liked as a base, I could then tweak individual parts of it. For instance, if I wanted the font to be bigger on a heading, I could click that heading and prompt.

When I was happy, I pasted the code directly into my prototype. For this demo, that was all the UI I needed to test feature viability.

### [Link to heading](#case-study-takeaways)Case study takeaways

To get proper outputs from AI, you need a lot of space to experiment and iterate.

Vercel’s AI SDK and v0 maximize iteration speed in order to fail faster and get to the right solution. AI SDK provides an abstraction layer to hot-swap a variety of the latest AI models in and out of your application. v0 generates usable UI from prompts, so you can quickly get a feel for the user experience.

Combined, these tools let you prove—often in a single day—whether a complex AI idea will work as a feature for your business.

[

**v0 is available for everyone.**

Generate UI in seconds with text or images. What will you ship?

Napkin Sketch Time



](https://v0.dev/)

## [Link to heading](#ideas-for-ai-features)Ideas for AI features

The beauty of modern LLMs is how quickly you can move, and how you don’t necessarily need PhD levels of expertise to create impactful automation. A composable commerce workflow on Vercel means you choose the AI providers that best suit your needs and swap them out as better models and products come to market.

In the case of the review summary generator above, the need for which I was trying to solve was relatively hypothetical. However, your business likely has very tangible challenges that can be solved through AI.

Here are two examples:

### [Link to heading](#1.-making-search-relevant)1\. Making search relevant

Ecommerce sites often suffer from search that delivers irrelevant results, which kills sales. Traditional search functionalities—like matching keywords and their stems, handling misspellings and synonyms, and ranking for context and relevance—are typically tedious to implement and optimize.

LLMs almost instantly solve this problem since they have an inherent understanding of language, synonyms, context, and nuance. They can be tuned on your store’s specific product offerings, and they can adapt over time to provide better results.

There’s also plenty of room with LLMs to go beyond the basics and offer fully dynamic faceted search, which intelligently adapts available filters and search results in real time based on the user's query and selections. This can drastically speed up product discovery and make the process of shopping more intuitive.

### [Link to heading](#2.-speeding-up-customer-support)2\. Speeding up customer support

Customers expect immediacy and convenience. To deliver on this across a storefront outside of working hours, businesses often choose to employ chatbots.

However, managing chat has all the same natural language challenges as search—plus a whole bunch more, such as limited world knowledge, lack of personalization, and no ability to self-improve.

LLMs provide an elegant solution for this and are able to offer quick, personalized, and even multilingual support out of the box.

Klarna, for instance, recently reported that [their OpenAI-powered chatbot](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/) is on par with human agents in regard to customer satisfaction but resolves queries in 80% less time. The bot accomplishes the work of 700 full-time agents and drives $40M in net revenue.

## [Link to heading](#ai-for-everyone)AI for everyone

Cutting-edge AI features shouldn't be a luxury reserved for tech giants. Composable AI democratizes development, empowering you to choose the best providers and build better storefronts, faster.

We understand that fast implementation speed and customer personalization are musts to stay competitive, so we will keep developing tools like v0—which let you prototype at the speed of thought—and [innovating further into the generative UI space](https://vercel.com/blog/ai-sdk-3-generative-ui).

[

**Ready for the future of ecommerce?**

Break free from the monolith. Learn how the Vercel stack can accelerate your digital success.

Talk to an Expert



](https://vercel.com/solutions/composable-commerce/migration)