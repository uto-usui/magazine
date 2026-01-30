---
title: "Deploying AI-driven apps on Vercel"
source: "https://vercel.com/blog/deploying-ai-applications"
publishedDate: "2023-01-25"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

7 min read

Jan 25, 2023

Tooling and templates to jump-start your AI workflow.

[AI](https://vercel.com/ai) is transforming how we build and communicate on the Web—nowhere seen more clearly than on Vercel. A stable diffusion search engine, a suite of AI-powered visual editing tools, and even a rejection generator are just a few of the [new projects keeping us amazed](https://twitter.com/steventey/status/1610656840412696578?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_deploying_ai_apps).

Whether you’re just starting out with AI or have experience in the field, let's explore how AI teams are building new projects, faster on Vercel.

One-step templates mentioned in this post:

-   [Twitter Bio Generator](#twitter-bio-generator)
    
-   [Photo Restorer](#photo-restorer-\(with-replicate\))
    
-   [Image Alt Text Generator](#image-alt-text-generator-\(with-replicate\))
    
-   [DALL·E 2 Art Generator](#dall·e-2-art-generator)
    
-   [Extrapolate - AI Aging App](#extrapolate---ai-aging-app)
    

## [Link to heading](#building-your-ai-stack)Building your AI stack

By using Vercel to build and deploy a headless stack, you can easily connect your data and integrate AI features such as natural language processing, image recognition, or speech translation into your favorite framework.

### [Link to heading](#openai-machine-learning-models)OpenAI machine learning models

**ChatGPT**

[ChatGPT](https://openai.com/blog/chatgpt/) is a natural language processing model that focuses on understanding the context of a conversation. It uses sentiment analysis (option mining) for complex and surprisingly human conversations.

**Other models**

OpenAI's currently available GPT-3 models include DaVinci, Curie, Babbage, and Ada, which have each been created to accomplish [specific tasks](https://beta.openai.com/docs/models). To feel out the differences between them and understand which one will work best for your application, we recommend heading over [to our AI Playground.](https://play.vercel.ai/)

Additionally, you can stress test DaVinci in both our [Twitter Bio Generator](https://vercel.com/templates/next.js/twitter-bio) and [GPT-3 Chatbot](https://vercel.com/templates/next.js/ai-gpt3-chatbot) templates.

**Whisper**

[OpenAI's Whisper](https://openai.com/blog/whisper/) is a GPT-3 model that can accurately identify spoken words, even with accents or background noise. Since Whisper was trained on over 680,000 hours of audio from 97 different languages, it can quickly transcribe audio to text, or even translate it from one language to another. It has the potential to revolutionize how we interact with AI, using our own voice instead of typing commands.

**DALL·E 2**

[DALL·E 2](https://openai.com/dall-e-2/) is a version of GPT-3 that allows you to generate realistic images or art from natural language. It supports outpainting, which means you can use existing images to influence the direction of the output. Additionally, it can be used to refine existing images, which makes it a powerful tool for digital art.

While DALL**·**E 2 is comparable to Midjourney and Stable Diffusion, the output from each of these three text-to-image methods varies heavily. Try playing with our [DALL·E 2 Art Generator](https://vercel.com/templates/next.js/dall-e) or [Inpainting with Stable Diffusion](https://vercel.com/templates/next.js/inpainter-stable-diffusion) templates to get a feel for some of the differences.

### [Link to heading](#running-your-ai-models-in-the-cloud)Running your AI models in the cloud

[Replicate](https://replicate.com/) is a company deployed on Vercel that allows you to run open-source machine learning models (like OpenAI) on their GPUs, and then access those models through their cloud API. This is vital for teams who want to experiment at scale without spinning up their own server farms.

Replicate has plenty of [models to choose from](https://replicate.com/explore), with in-app demos, example code, and full API documentation.

### [Link to heading](#choosing-the-right-framework)Choosing the right framework

Whichever AI API you work with, you'll need a framework to present the data to your end user in an understandable and engaging way. Next.js and SvelteKit 1.0 both make formidable frameworks to handle the complexities of AI-driven applications. Here, in part, is why:

1.  **API routes.** Making a dedicated API route is a simple matter of placing any file inside the pages/api [directory for Next.js](https://nextjs.org/docs/api-routes/introduction?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_deploying_ai_apps) or placing a `+server.js` file anywhere in your [SvelteKit directory](https://kit.svelte.dev/docs/routing#server?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_deploying_ai_apps). Dedicated API routes enable you to keep your AI API code entirely separate from the other logic of your application, and they provide a safe place to store sensitive environment variables.
    
2.  **Code splitting.** [Code splitting](https://nextjs.org/learn/foundations/how-nextjs-works/code-splitting) allows for large applications to be broken down into smaller bundles which can then be selectively loaded on demand or in parallel, reducing the downloads needed at page load. Both Next.js and [SvelteKit](https://vercel.com/docs/frameworks/sveltekit) use code splitting out-of-the-box, which keeps your AI application feeling fast no matter how large it scales.
    
3.  **Full TypeScript integration.** TypeScript can help even the most complex AI APIs become more readable and extendable in your code through tighter IDE integration. TypeScript can be enabled in Next.js or SvelteKit with one command when installing.
    
4.  **Hot Module Replacement.** Both Next.js and SvelteKit provide HMR, which allows you to see changes to your app’s local preview without refreshing the page. This vastly improves iteration speed and helps you stay in flow.
    

Deploying [Next.js](https://vercel.com/solutions/nextjs) or [SvelteKit](https://vercel.com/docs/frameworks/sveltekit) on Vercel is as simple as a `git` commit and offers the ability to scale up your application while Vercel manages the infrastructure. This is perfect for AI startups, who often need to focus their time and capital in other realms.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3PSs1WEjpXmLBQhZgtLW2n/893abb227e02926ad9be4b0c327addab/jasper-ai-logo.png)

Jasper is an AI Writing Assistant deployed with Next.js on Vercel that helps users generate engaging and ethical content. It takes input from the user and produces posts, tweets, short stories, and more.

The company recently acquired Outwrite to build an extension that works inside Microsoft Word, Google Docs, social media, and any text field online. They've also partnered with Surfer to let users SEO-optimize their content with AI-generated advice.

### [Link to heading](#managed-infrastructure)Managed infrastructure

The [OpenAI](https://vercel.com/docs/integrations/openai) API (and others in the field) can take a long time to complete a roundtrip, and you may run into timeouts when using serverless compute. Take a look at our [serverless limits docs](https://vercel.com/docs/concepts/limits/overview#general-limits) to learn about the timeout limitations by plan.

  
You can also opt for [Vercel Edge Functions](https://vercel.com/features/edge-functions), which not only have a much higher threshold of execution time, but also offer the ability to stream responses and allow much more time to process API data. This means you can locate your API calls as close to the AI server as possible to speed up the user experience.

Check out our [Twitter Bio Generator template](https://vercel.com/blog/deploying-ai-driven-apps-on-vercel#twitter-bio-generator) and the video below to learn more about how these Edge Functions can work for you.

Also, take a look at [some of our other customers](https://vercel.com/customers/industries/ai) using Vercel's managed global infrastructure to ship their products out to the world.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5bXDUrFqi9MO73Td3m4yHG/4d79e4234acf09e493f25d06bae62f13/scale-ai-logo.png)

Scale is a data platform company that helps machine learning teams at places like Lyft, SAP, and Nuro fast-track their AI development. They provide a comprehensive approach for managing the entire machine learning lifecycle with data-driven solutions.

Learn more about [how Vercel enables Scale to save cost](https://vercel.com/customers/scale-unifies-design-and-performance-with-next-js-and-vercel) in design and infrastructure, iterating rapidly through use of quick buildtimes, Preview Deployments, performance analytics, and the Vercel CLI. The team also appreciated Vercel's partner integrations with Okta, GitHub, and Slack.

### [Link to heading](#streamlined-collaboration)Streamlined collaboration

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2vRstv6DS5NWcAPkfrq8xw%2F73120966c9eaa76a83df6e9e3335e2e8%2FComments_GA_-_Light_Mode.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3fQxMKpVLuqJP61x1HaWAn%2F9df6e666adef98e7e278dcc2d2bcb74d%2FComments_GA_-_Dark_Mode.png&w=1920&q=75)

Vercel encourages innovation through collaboration with [comments on Preview Deployments](https://vercel.com/blog/introducing-commenting-on-preview-deployments). From any pull request, you can view your application from a user's perspective, leaving comments for your whole team that stay embedded in the visual context of the needed fix.

When working with AI, applications can grow to a point where it's hard to track issues, especially in the areas that most affect your users. Comments on Preview Deployments allow you and your team to iterate faster while staying committed to a product everyone loves to ship.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3MfTzAXCOqrWFX6dd58keY/0b802f91f267abb692dbf354635328ab/viable-ai-logo-2.png)

Viable uses AI to analyze customer feedback and present insights to businesses to improve products and services. With just six engineers, they’ve already processed 3.8 million data points for businesses like Latch, Uber, and AngelList. 

Founded in 2020, Viable’s team has been using Vercel since the beginning. Their AI product is built with Next.js and deployed to Vercel, helping them rapidly innovate and scale their infrastructure with high demand from customers. 

Check out how [Viable uses Vercel's workflow](https://vercel.com/blog/delivering-ai-analysis-faster-with-the-vercel-workflow), including comments on Preview Deployments to preserve team context, while working with complex applications.

### [Link to heading](#further-recommendations)Further recommendations

Next.js and SvelteKit apps on Vercel easily integrate with everything you need to develop your AI applications. For more recommendations, check out [this thread](https://twitter.com/steventey/status/1618298340541886465?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_deploying_ai_apps) of must-learn tools for building and deploying AI applications.

## [Link to heading](#one-click-deploy-ai-templates)One-click deploy AI templates

Itching to play around with some AI? We’ve got you covered with our currently-expanding [collection of templates](https://vercel.com/templates/ai):

### [Link to heading](#twitter-bio-generator)Twitter Bio Generator

[Twitter Bio Generator](https://vercel.com/templates/next.js/twitter-bio) makes new social media bios using the [OpenAI](https://vercel.com/docs/integrations/openai) GPT-3 API ([`text-davinci-003`](https://beta.openai.com/docs/models)) and [Vercel Edge Functions](https://vercel.com/features/edge-functions) with streaming. It constructs a prompt based on the form and user input, sends it to the GPT-3 API via an Edge Function, then streams the response back to the application.

To see a more in-depth explanation of working with Vercel Edge Functions and OpenAI's API—especially in regards to handling long response times—check out the video below:

### [Link to heading](#ai-film-recommendation-generator)AI Film Recommendation Generator

The [AI Film Recommender](https://vercel.com/templates/svelte/watch-this) is a SvelteKit template that curates movies and shows based on prompts given to OpenAI's GPT-3 ([`text-davinci-003`](https://beta.openai.com/docs/models)). The template uses [Vercel Edge Functions](https://vercel.com/features/edge-functions) with streaming.

Check out this deep dive into how the application was made:

### [Link to heading](#ai-room-generator)AI Room Generator

[AI Room Generator](https://vercel.com/templates/next.js/room-GPT) uses an ML model called [ControlNet](https://github.com/lllyasviel/ControlNet) to generate variations of real rooms. The user can upload a photo of any room and then the application will take the user's prompt and transform the space into their dream room.

The ML Model is hosted on [Replicate](https://replicate.com/) and uses [Upload](https://upload.io/) for image storage.

### [Link to heading](#photo-restorer-\(with-replicate\))Photo Restorer (with Replicate)

[Photo Restorer](https://vercel.com/templates/next.js/ai-photo-restorer) livens up old face photos using AI. It uses a machine learning model from the Applied Research Center called GFPGAN on Replicate to restore face photos. This application gives you the ability to upload any photo, which will send it through this machine learning model using a Next.js API route, and return your restored photo.

Check out this video on how we built this template to give you the starter code for your own AI apps:

### [Link to heading](#image-alt-text-generator-\(with-replicate\))Image Alt Text Generator (with Replicate)

[Image Alt Text Generator](https://vercel.com/templates/next.js/ai-alt-text-generator) uses an machine learning model from Salesforce called [BLIP](https://github.com/salesforce/BLIP) on Replicate’s cloud API to generate relevant alt text for images. You can feed the Next.js API route an image as a query parameter and it will return a one sentence description of that image.

Rather code your REST APIs in Python? We’ve got you covered with our [Flask version of this template](https://vercel.com/templates/python/flask-alt-text-generator).

### [Link to heading](#dall·e-2-art-generator)DALL·E 2 Art Generator

[DALL·E 2 AI Art Generator](https://vercel.com/templates/next.js/dall-e) uses an machine learning model from OpenAI called DALLE-2 to generate an image using AI with just a text description. When text is submitted, the application proxies calls to the OpenAI API via QStash in `/api/image`. QStash sends responses to `/api/callback` in the form of an image URL, which is persisted to Upstash Redis. After calling the OpenAI API, the client polls Redis and loads the image on the page once it's available.

### [Link to heading](#extrapolate---ai-aging-app)Extrapolate - AI Aging App

[Extrapolate](https://vercel.com/templates/next.js/extrapolate) is an app that takes a photo and outputs a GIF showing how you might age. It uses Cloudflare R2 to store and retrieve images and [Upstash](https://upstash.com/) qStash to remain privacy-friendly, deleting all photos from the server within 24 hours. The app also has a feature that can notify you via email when your GIF is ready, thanks to [Replicate's](https://replicate.com/) web hooks.

[Cloudflare R2 Object Storage](https://www.cloudflare.com/lp/pg-r2/) is an S3-compatible solution designed to store large amounts of unstructured data with zero egress fees. It provides reliable access from any Cloudflare datacenter, integrates fully with Cloudflare Workers, and has a generous free tier.

## [Link to heading](#your-ai-journey-starts-here)Your AI journey starts here

Whatever AI app you [imagine building](https://v0.dev/), you can build it on Vercel. Our Hobby plan is the perfect way to play around with new ideas, but [upgrading to Pro](https://vercel.com/pricing) unlocks increased Edge Functions for querying AI APIs, longer serverless timeouts, team comments on password-protected preview deployments, and much more.

Have questions about getting started? We're [happy to talk with you](https://vercel.com/contact/sales) about the best way to ship your AI application in 2023.