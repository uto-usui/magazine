---
title: "Python on Vercel is now generally available"
source: "https://vercel.com/blog/python-on-vercel-is-now-generally-available"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Yury Selivanov"
---

Python on Vercel is now generally available. Build and run Python applications with the frameworks, libraries, and tools you already use.

Vercel automatically detects supported frameworks and configures the build and deployment. Your applications run on Fluid compute, which manages concurrent requests and scales with traffic. Idiomatic Python SDKs let you work with storage, queues, durable workflows, and AI models directly from Python. For full-stack projects, the Python backend and frontend share a workflow for local development, preview deployments, and production releases.

## [Copy link to heading](#our-goals-for-python-on-vercel)Our goals for Python on Vercel

Ten months ago, we [set out to make Vercel the best place to build and run Python applications](https://vercel.com/blog/investing-in-the-python-ecosystem). We wanted the experience to fit how Python developers already work, with three goals guiding our decisions:

-   **Idiomatic Python SDKs.** Working with Vercel infrastructure should feel familiar to Python developers, with APIs that use type annotations, `async`/`await`, and context managers.
    
-   **A shared workflow for both the frontend and backend.** Python applications often include a JavaScript frontend, so developers should be able to run both locally, review them in the same preview deployment, and release or roll them back together.
    
-   **Compatibility with the Python ecosystem.** The runtime should use CPython, the standard Python interpreter, on Linux to preserve compatibility with the packages and tools Python developers already rely on.
    

The first test of those goals is what happens when you deploy a Python application on Vercel: its framework, dependencies, and project structure should guide how it’s built and run.

## [Copy link to heading](#deploying-python-applications-on-vercel)Deploying Python applications on Vercel

We’ve worked to make Python feel native on Vercel. Vercel reads your project’s dependency files, including those managed by `uv`, and automatically detects frameworks such as FastAPI, Flask, Django, and FastHTML. [Framework defined infrastructure](https://vercel.com/docs/frameworks/more-frameworks) configures builds and request routing, with framework-specific support for serving static assets through the CDN.

For applications with a frontend, [Vercel Services](https://vercel.com/docs/services) brings both parts into one project. Running `vercel dev` starts them together, and shared previews let you test backend changes with the frontend that uses them.

For long-running workers that pull jobs from queues or databases, [Vercel Daemons](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta) keeps your containers running with your Python code along with any of its packages, and system dependencies.

## [Copy link to heading](#python-sdks-for-vercel-infrastructure)Python SDKs for Vercel infrastructure

A Python backend might need to store files, send messages, run durable workflows, or call AI models. We’ve built Python SDKs for these tasks, with APIs that follow the conventions of the language:

**SDK**

**What you can do**

[AI SDK for Python](https://ai-python.dev/)

Generate and stream model responses, call tools, and build agents.

[Sandbox SDK](https://vercel.com/docs/sandbox/python-sdk-reference#sandbox-handles)

Create and control isolated environments for running code.

[Workflow SDK](https://workflow-sdk.dev/docs/getting-started/python)

Define durable workflows with retries and saved execution state.

[Queues SDK](https://vercel.com/docs/queues/python-sdk)

Send and receive messages for background work and notifications.

[Blob SDK](https://vercel.com/docs/vercel-blob/python-sdk-reference)

Upload and retrieve files in object storage.

[Connect SDK](https://vercel.com/docs/connect/python-sdk-reference)

Obtain credentials for calling external APIs.

Python SDKs for storage, messaging, workflows, code execution, AI, and external API credentials.

These SDKs work alongside your framework and libraries, and the example below shows how they connect within a full-stack application.

## [Copy link to heading](#start-building-with-python-on-vercel)Start building with Python on Vercel

Whether you’re starting a new project or deploying existing code, the [framework guides](https://vercel.com/docs/frameworks/more-frameworks) cover setup and deployment on Vercel. For a guided full-stack project, the [Python on Vercel course](https://vercel.com/academy/python-on-vercel) walks through building a FastAPI backend and Next.js frontend, then deploying them together with Services.

To show how these pieces work together, I built a collaborative web application to create and browse Python notebooks. It lets people create their own notebooks, publish them for others to browse or fork, and work with an AI assistant to write and run Python code.

The application pairs a Vite frontend with a FastAPI backend and uses PostgreSQL for notebook source and chat history. Services keeps the frontend and backend in one deployment, with the frontend served through the CDN.

Here’s how the main parts connect:

-   **Editing and running code:** When a signed-in user opens their notebook in the editor, FastAPI creates or reuses a Vercel Sandbox running Jupyter, keeping user code isolated from the application backend. The browser connects directly to Jupyter, while mounted Drives provide the Python dependencies and workspace files.
    
-   **Saving and publishing:** The browser periodically sends the current notebook to FastAPI. FastAPI saves the source in PostgreSQL, renders changes as HTML, and uploads the result to Blob, so people can read published notebooks through the CDN without starting a Python kernel.
    
-   **Sharing updates:** After publishing a change, FastAPI sends a message through Vercel Queues. Each backend instance with connected browsers receives the notification and sends updated notebook listings over WebSockets, so people see changes without reloading.
    
-   **Assisting with code:** The agent uses AI SDK for Python and runs inside Vercel Workflows, which saves execution state and retries failed steps. Chat history stays in PostgreSQL, while notebook editing and execution tools work through the connected browser, which sends results back through FastAPI to resume the workflow.
    

The [source code on GitHub](https://github.com/vercel-labs/notebook-factory) includes the complete application and its deployment configuration. You can use it to explore these integrations or as a starting point for your own Python application.

## [Copy link to heading](#investing-in-the-python-community)Investing in the Python community

Last December, the Gel Data team, led by me and Elvis Pranskevichus, [joined Vercel](https://vercel.com/blog/investing-in-the-python-ecosystem) to build Python support and continue our open-source work.

At the same time, we announced our sponsorship of the Python Software Foundation and committed to funding one year of Serhiy Storchaka’s CPython maintenance through the foundation. Serhiy has authored over 600 commits to CPython’s main branch so far in 2026.

We also sponsored PyCon US and EuroPython this year, where the team and I met Python developers and heard where they were getting stuck. Those conversations help us figure out what to fix next.

![The Vercel Python team at PyCon US 2026.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4rliMLz37nKg2N44ljMuoc%2F53a33b2126c3f570a7966f13fd20fa1b%2Fpycon.jpg&w=1920&q=95)

The Vercel Python team at PyCon US 2026.

We also published [PEP 827](https://peps.python.org/pep-0827/), which, if accepted, would add type manipulation features that could help frameworks such as FastAPI offer simpler APIs with less boilerplate and more precise type checking.

## [Copy link to heading](#what’s-next-for-python-on-vercel)What’s next for Python on Vercel

We’re continuing to improve Python SDKs, runtime performance, and development workflows for both people and coding agents. If you run into a deployment issue or find something missing in the Python SDKs, [share your feedback in Vercel Community](https://community.vercel.com/) so the team can use it to guide that work.

### [Copy link to heading](#resources)Resources

-   Point your agent at our Python guides in [the Knowledge Base](https://vercel.com/kb/python)
    
-   Deploy an eve agent in Python [in one click](https://vercel.com/templates/eve/eve-agent-with-python)