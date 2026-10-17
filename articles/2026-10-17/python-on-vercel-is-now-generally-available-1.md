---
title: "Python on Vercel is now generally available"
source: "https://vercel.com/changelog/python-on-vercel-is-now-generally-available"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Yury Selivanov"
---

[Python](https://vercel.com/docs/functions/runtimes/python) is now a first-class language and runtime on Vercel. Build APIs, full-stack applications, and AI agents with native Python SDKs and a shared development and deployment workflow for your Python backend and JavaScript frontend.

## [Copy link to heading](#python-framework-and-runtime-support)Python framework and runtime support

Vercel handles the infrastructure so you can focus on your application:

-   **Automatic framework support:** FastAPI, Flask, and Django applications are automatically recognized and configured, with framework-specific support for serving static assets through the Vercel CDN.
    
-   **Native Python runtime and tooling:** Vercel runs CPython on Linux and supports `uv` and `pyproject.toml` for dependency management.
    
-   **Compute for APIs and workers:** Scale request-driven applications with Fluid compute and run long-running pull-based workloads with Vercel Daemons.
    

## [Copy link to heading](#native-python-sdks)Native Python SDKs

Within your application, Python SDKs let you build agents, run untrusted code, and orchestrate durable workflows.

-   [Sandbox](https://vercel.com/docs/sandbox/python-sdk-reference): Give your application or agent an isolated Linux VM on demand.
    
-   [AI SDK for Python](https://ai-python.dev/) (Beta): Generate or stream model responses and call tools. Get started with `uv add ai`.
    
-   [Workflow SDK for Python](https://workflow-sdk.dev/docs/getting-started/python) (Beta): Persist execution state and retry failed workflow steps.
    
-   [Queues](https://vercel.com/docs/queues/python-sdk) (Beta): Send and receive messages for background work.
    
-   [Connect](https://vercel.com/docs/connect/python-sdk-reference): Obtain credentials for calling external APIs.
    
-   [Blob](https://vercel.com/docs/vercel-blob/python-sdk-reference): Upload and retrieve files in object storage.
    

Use the SDKs individually or combine them in the same Python application.

## [Copy link to heading](#your-frontend-and-backend,-together)Your frontend and backend, together

For full-stack applications, [Vercel Services](https://vercel.com/docs/services) allows you to deploy your frontend and backends together in one project, with shared previews and atomic deployments and rollbacks. Within that project, you can view logs by service and connect backends privately through service bindings.

For a frontend in `frontend/` and a FastAPI `app` defined in `backend/main.py`, add this `vercel.toml` at the repository root.

```
[services.web]root = "frontend/"[services.api]root = "backend/"entrypoint = "main:app"[[rewrites]]source = "/(.*)"destination = { service = "web" }[[rewrites]]source = "/api/(.*)"destination = { service = "api" }
```

Requests under `/api/` reach matching FastAPI routes with the path unchanged, while other requests reach the frontend. Run both services locally with `vercel dev`, then deploy them together from the same repository.

Read the [Python documentation](https://vercel.com/docs/functions/runtimes/python) to get started.