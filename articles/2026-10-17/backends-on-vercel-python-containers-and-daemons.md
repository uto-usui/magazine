---
title: "Backends on Vercel: Python, containers, and Daemons"
source: "https://vercel.com/blog/backends-on-vercel-python-containers-and-daemons"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Steren"
---

Last year, we expanded [zero-config support](https://vercel.com/blog/zero-config-backends-on-vercel-ai-cloud) for Python and TypeScript backend frameworks. By this summer, developers could deploy their frontend and backend together with [Vercel Services](https://vercel.com/blog/vercel-services-run-full-stack-on-vercel) and coordinate background work with [queues](https://vercel.com/changelog/vercel-queues-now-in-public-beta) and [durable workflows](https://vercel.com/blog/a-new-programming-model-for-durable-execution).

Today at [Vercel Ship in San Francisco](https://vercel.com/ship), we are expanding the backend workloads you can run on Vercel. Python on Vercel is now generally available, [container support in Vercel Functions](https://vercel.com/docs/functions/container-images) enables custom runtimes and system libraries, and we are introducing [Vercel Daemons](https://vercel.com/daemons) in Public Beta for background workers that pull work and stay running between jobs.

## [Copy link to heading](#python-is-now-generally-available)Python is now generally available

You can build your backend in Python with the Vercel infrastructure and development experience you know from your frontend, including local development, previews, and production deployments. Frameworks such as FastAPI, Flask, and Django run on standard CPython with your PyPI dependencies, while Vercel handles framework detection, builds, and scaling.

Already, 150,000 teams run Python backends on Vercel, including engineers at OpenAI, Polymarket, and Exa.

SDKs for Python let you use Vercel products from your application, whether you’re storing files in [Vercel Blob](https://pypi.org/project/vercel/), sending background jobs to [Vercel Queues](https://pypi.org/project/vercel-queue/), coordinating durable steps with [Vercel Workflows](https://pypi.org/project/vercel-workflow/), running untrusted code in [Vercel Sandbox](https://pypi.org/project/vercel-sandbox/), or streaming model responses and handling tool calls with the [AI SDK for Python](https://ai-python.dev/).

[Delphi](https://vercel.com/customers/how-delphi-ships-100-times-a-day-with-its-python-backend-on-vercel), which builds AI digital minds from books and talks, moved its Python backend from AWS ECS to Vercel. With ten engineers and no dedicated infrastructure role, the team ships to production more than 100 times a day and uses Queues to handle background jobs.

> With Vercel, we barely think about infrastructure at all.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/46W0eajVS8z6evyvziJHy4/a48fcb445878b9dc25481fccf47e69f0/spencer_photo.jpeg)Spencer SchoebenFounding Engineer at Delphi

Visit the [Python knowledge base](https://vercel.com/kb/python) for framework details and examples.

## [Copy link to heading](#applications-in-any-language-with-containers)Applications in any language with containers

The [Vercel container runtime](https://vercel.com/blog/dockerfile-on-vercel) lets you deploy applications written in any language, packaged with the OS libraries and executables they need. Since container support entered Public Beta, 5,000 teams have shipped 150,000 container deployments on Vercel.

Containers deploy as Vercel Functions on Fluid compute, scaling with traffic and using [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute), which doesn’t charge for idle time spent waiting for API responses, database queries, or LLM inferencing. Vercel Services lets you develop and deploy your backend alongside your frontend, while [Vercel CDN](https://vercel.com/docs/cdn) serves traffic on your domains, [Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf) protects it, logs help you investigate issues, and rollbacks restore earlier deployments.

For example, take a video app that uses a container for background processing, preparing a playback copy and thumbnail for each uploaded clip. This `Dockerfile` packages the Python processor, its dependencies, and `ffmpeg` to run with Daemons:

Dockerfile

```
FROM python:3.12-slimRUN apt-get update \    && apt-get install -y --no-install-recommends ffmpeg \    && rm -rf /var/lib/apt/lists/*WORKDIR /appCOPY requirements.txt .RUN pip install --no-cache-dir -r requirements.txtCOPY processor.py .CMD ["python", "processor.py"]
```

Package the Python video processor and ffmpeg in one image

When you deploy through Git or the Vercel CLI, Vercel builds the image and stores it in your [Vercel Container Registry](https://vercel.com/docs/container-registry). Read our [containerized Functions deployment guide](https://vercel.com/docs/functions/container-images) to get started.

## [Copy link to heading](#background-workers-with-vercel-daemons)Background workers with Vercel Daemons

[Vercel Daemons](https://vercel.com/daemons) lets you deploy containers as continuously running background workers on Fluid compute. You choose the number of instances in each region, and Vercel maintains that capacity by restarting processes when they exit or crash.

Daemons launches with support for pull-based workloads, where your code requests work from another system and processes it as it becomes available. That could mean consuming queue messages or fetching pending jobs from a database.

In our example, Daemons runs the video processor continuously as it pulls jobs from [Vercel Queues](https://vercel.com/docs/queues/poll-mode). In `vercel.toml`, define the Next.js frontend, route requests to it, and add the processor using `Dockerfile`:

vercel.toml

```
#:schema https://openapi.vercel.sh/vercel.json[services.frontend]framework = "nextjs"root = "."[[routes]]src = "/(.*)"destination.service = "frontend"[daemons.videos]root = "."entrypoint = "Dockerfile"instances.iad1 = 1
```

Keep one video processor instance running in iad1 (Washington, D.C.)

Follow the [Daemons deployment guide](https://vercel.com/docs/daemons) to add a background worker to your Vercel project.

## [Copy link to heading](#run-your-backends-on-vercel)Run your backends on Vercel

We’re continuing to invest in backend support so more of your existing application can run on Vercel, using the languages, dependencies, and execution patterns it needs.

### [Copy link to heading](#resources)Resources

-   Read our backends guides [in the Knowledge Base](https://vercel.com/kb/backends)
    
-   Read the [complete guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons)
    
-   Deploy an eve agent with Python [in one click](https://vercel.com/templates/eve/eve-agent-with-python)