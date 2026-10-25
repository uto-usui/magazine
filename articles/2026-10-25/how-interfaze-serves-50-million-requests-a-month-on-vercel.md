---
title: "How Interfaze serves 50 million requests a month on Vercel"
source: "https://vercel.com/blog/how-interfaze-serves-50-million-requests-a-month-on-vercel"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#interfaze-on-vercel)Interfaze on Vercel

-   50 million requests a month
    
-   Backend running on Fluid compute
    
-   Multiple model providers behind one fallback layer with [AI Gateway](https://vercel.com/docs/ai-gateway)
    

[Interfaze](https://interfaze.ai/) builds models for deterministic work that general-purpose LLMs handle poorly: document processing, OCR, object detection, web scraping, speech to text, and classification.

As founder Yoeven Khemlani puts it, "Most models aren't deterministic by nature. That's fine when you're drafting an essay. But when a hospital or a legal team needs to process documents, you don't reach for an LLM." Ask an LLM for the total on an invoice and you get a number with no easy way to check where it came from. Interfaze's models return the number along with a bounding box showing where on the page it came from and a confidence score for how sure the model is. Every result can be checked, and the models still take prompts the way an LLM does.

Everything around Interfaze's models runs on Vercel, including the backend. That spans the API serving 50 million requests a month, the sandbox that executes code the model writes, and the routing that keeps data preprocessing running when a third-party model provider goes down.

![Interfaze playground with Vision, Web, Audio, GUI, and Compute tabs, a prompt reading "Extract all text," and a drop zone for PDF, DOCX, or image files.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3N8W799qXUlIyPYaaUtEcn%2F00b761cd5a3fe1441ea59b8815b23c91%2F74904bee-868d-49a0-b647-ac02ec0b3c74.png&w=1920&q=95)![Interfaze playground with Vision, Web, Audio, GUI, and Compute tabs, a prompt reading "Extract all text," and a drop zone for PDF, DOCX, or image files.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3N8W799qXUlIyPYaaUtEcn%2F00b761cd5a3fe1441ea59b8815b23c91%2F74904bee-868d-49a0-b647-ac02ec0b3c74.png&w=1920&q=95)

Interfaze's playground accepts documents, audio, and images, and returns structured, checkable output.

## [Copy link to heading](#the-backend-required-no-infrastructure-work)The backend required no infrastructure work

Interfaze's frontend and backend both run on Vercel. The backend handles every request to Interfaze's API, whether a customer is calling the model or uploading a file. All of it runs as serverless functions in the same codebase as the frontend. When a request needs computation, the model hands the code to [Vercel Sandbox](https://vercel.com/sandbox), which runs it in isolation. There was no separate infrastructure to set up.

> On other platforms, setting up a backend means networking, security, and function limits before you serve a single request. On Vercel, I create a folder and I have a backend.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/XxbWgKWsmV9rKZfVElHH8/88c5463f5f9b64acdb596227cb7a9d8c/yoeven_photo.jpeg)— Yoeven Khemlani CEO & Co-Founder @ Interfaze

## [Copy link to heading](#fluid-compute-handles-the-heavy-jobs)Fluid compute handles the heavy jobs

Scalability was Yoeven's top requirement. The goal is serving the model to millions of users, and [Fluid compute](https://vercel.com/fluid) scales with traffic on its own. Heavier work runs there too. Vercel's memory and timeout limits are high enough that Interfaze's web scraping, which runs on Puppeteer, works out of the box.

> We never expected to use Vercel for our backend. Fluid compute is a real Node.js server underneath, so even our heaviest workloads just work.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/XxbWgKWsmV9rKZfVElHH8/88c5463f5f9b64acdb596227cb7a9d8c/yoeven_photo.jpeg)— Yoeven Khemlani CEO & Co-Founder @ Interfaze

## [Copy link to heading](#ai-gateway-makes-model-routing-reliable-at-scale)AI Gateway makes model routing reliable at scale

Interfaze pushes large volumes of data cleaning through open source models hosted by third-party providers. A single provider is a weak link. Providers hit rate limits or go down, and when one does, the cleaning stops unless traffic moves somewhere else.

The providers are also not interchangeable. Two of them can claim to host the same open source model and serve it at very different quality.

When a provider fails or throttles, [AI Gateway](https://vercel.com/ai-gateway) fails requests over to the next provider automatically. It also lets Interfaze choose which provider serves a given model, so the team can run the same workload through each one, see which performs well, and send traffic there.

> Two providers will claim they're hosting the same model. One's at four bit, one's at eight. With AI Gateway we can route between them and see who's actually doing better.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/XxbWgKWsmV9rKZfVElHH8/88c5463f5f9b64acdb596227cb7a9d8c/yoeven_photo.jpeg)— Yoeven Khemlani CEO & Co-Founder @ Interfaze

## [Copy link to heading](#workflow-sdk-runs-email-sequences-over-months)Workflow SDK runs email sequences over months

Interfaze runs its lifecycle email system on the [Workflow SDK](https://vercel.com/workflows), with sends conditioned on product usage. The system tracks which API a customer called, at what volume, and how that compares against their first week. Retries are handled automatically, so one failed step doesn't take down the sequence.

The part Interfaze needed most was durable execution. A workflow can pause a step and pick it back up months later with its state intact, which the team found other systems could not do for long.

## [Copy link to heading](#preview-deployments-carry-new-model-versions-to-customers)Preview deployments carry new model versions to customers

Interfaze runs more than one version of its model at a time, each at its own URL. When an error comes in, the team has to know which version produced the error before they can fix anything. On Vercel every URL is its own deployment with its own logs, so the error is already filed under the version that caused it. There was no separate logging vendor to set up.

Those same preview URLs are how a new model version gets to customers before it ships. The Vercel side of a release builds in about three minutes. Hosting the weights on GPUs is the slow part.

> A new model version is a new branch. I send the preview URL to a few customers, they test it for a month, and we merge.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/XxbWgKWsmV9rKZfVElHH8/88c5463f5f9b64acdb596227cb7a9d8c/yoeven_photo.jpeg)— Yoeven Khemlani CEO & Co-Founder @ Interfaze

## [Copy link to heading](#what's-next)What's next

Interfaze recently released [Interfaze 1 Lite](https://interfaze.ai/blog/the-first-open-weight-model-for-deterministic-work-interfaze-1-lite), an open-weight version of its model that runs on a single GPU and is served through the same API. Next is a gateway for web search, one API that routes to whichever search provider a developer picks, the way AI Gateway does for models. It launches on the same Vercel backend as everything else.

**About** [Interfaze](https://interfaze.ai/)**:** Interfaze builds models for deterministic tasks, including OCR, object detection, web scraping, speech to text, and classification. Its customers are engineering teams in legal, healthcare, and finance.