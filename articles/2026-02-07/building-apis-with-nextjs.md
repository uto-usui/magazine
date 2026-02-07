---
title: "Building APIs with Next.js"
source: "https://nextjs.org/blog/building-apis-with-nextjs"
publishedDate: "2025-02-28"
category: "frontend"
feedName: "Next.js Blog"
author: "Lee Robinson"
---

This guide will cover how you can build APIs with Next.js, including setting up your project, understanding the App Router and Route Handlers, handling multiple HTTP methods, implementing dynamic routing, creating reusable middleware logic, and deciding when to spin up a dedicated API layer.

-   [1\. Getting started](#1-getting-started)
    -   [1.1 Create a Next.js app](#11-create-a-nextjs-app)
    -   [1.2 App Router vs. Pages Router](#12-app-router-vs-pages-router)
-   [2\. Why (and when) to build APIs with Next.js](#2-why-and-when-to-build-apis-with-nextjs)
-   [3\. Creating an API with Route Handlers](#3-creating-an-api-with-route-handlers)
    -   [3.1 Basic file setup](#31-basic-file-setup)
    -   [3.2 Multiple HTTP methods in one file](#32-multiple-http-methods-in-one-file)
-   [4\. Working with Web APIs](#4-working-with-web-apis)
    -   [4.1 Directly using Request & Response](#41-directly-using-request--response)
    -   [4.2 Query parameters](#42-query-parameters)
    -   [4.3 Headers and cookies](#43-headers-and-cookies)
-   [5\. Dynamic routes](#5-dynamic-routes)
-   [6\. Using Next.js as a proxy or forwarding layer](#6-using-nextjs-as-a-proxy-or-forwarding-layer)
-   [7\. Building shared “middleware” logic](#7-building-shared-middleware-logic)
-   [8\. Deployment and “SPA Mode” considerations](#8-deployment-and-spa-mode-considerations)
    -   [8.1 Standard Node.js deployment](#81-standard-nodejs-deployment)
    -   [8.2 SPA/Static Export](#82-spastatic-export)
    -   [8.3 Deploying APIs on Vercel](#83-deploying-apis-on-vercel)
-   [9\. When to skip creating an API endpoint](#9-when-to-skip-creating-an-api-endpoint)
-   [10\. Putting It All Together](#10-putting-it-all-together)
-   [Conclusion](#conclusion)
-   [Frequently Asked Questions](#frequently-asked-questions)
    -   [What about Server Actions?](#what-about-server-actions)
    -   [Can I use TypeScript with Route Handlers?](#can-i-use-typescript-with-route-handlers)
    -   [What are the best practices for authentication?](#what-are-the-best-practices-for-authentication)

## 1\. Getting started[](#1-getting-started)

### 1.1 Create a Next.js app[](#11-create-a-nextjs-app)

If you’re starting fresh, you can create a new Next.js project using:

> **Note:** The `--api` flag automatically includes an example `route.ts` in your new project’s `app/` folder, demonstrating how to create an API endpoint.

### 1.2 App Router vs. Pages Router[](#12-app-router-vs-pages-router)

-   **Pages Router**: Historically, Next.js used `pages/api/*` for APIs. This approach relied on Node.js request/response objects and an Express-like API.
-   **App Router (Default)**: Introduced in Next.js 13, the App Router fully embraces web standard Request/Response APIs. Instead of `pages/api/*`, you can now place `route.ts` or `route.js` files anywhere inside the `app/` directory.

> **Why switch?** The App Router’s “Route Handlers” lean on the [Web Platform Request/Response APIs](https://developer.mozilla.org/en-US/docs/Web/API) rather than Node.js-specific APIs. This simplifies learning, reduces friction, and helps you reuse your knowledge across different tools.

## 2\. Why (and when) to build APIs with Next.js[](#2-why-and-when-to-build-apis-with-nextjs)

1.  **Public API for Multiple Clients**
    
    -   You can build a public API that’s consumed by your Next.js web app, a separate mobile app, or any third-party service. For example, you might fetch from /api/users both in your React website and a React Native mobile app.
2.  **Proxy to an Existing Backend**
    
    -   Sometimes you want to hide or consolidate external [microservices](https://vercel.com/blog/how-vercel-adopted-microfrontends) behind a single endpoint. Next.js Route Handlers can act as a proxy or middle layer to another existing backend. For instance, you might intercept requests, handle authentication, transform data, and then pass the request along to an upstream API.
3.  **Webhooks and Integrations**
    
    -   If you receive external callbacks or webhooks (e.g., from Stripe, GitHub, Twilio), you can handle them with Route Handlers.
4.  **Custom Authentication**
    
    -   If you need sessions, tokens, or other auth logic, you can store cookies, read headers, and respond with the appropriate data in your Next.js API layer.

> **Note:** If you only need server-side data fetching for your own Next.js app (and you don’t need to share that data externally), Server Components might be sufficient to fetch data directly during render—no separate API layer is required.

## 3\. Creating an API with Route Handlers[](#3-creating-an-api-with-route-handlers)

### 3.1 Basic file setup[](#31-basic-file-setup)

In the App Router (`app/`), create a folder that represents your route, and inside it, a `route.ts` file.

For example, to create an endpoint at `/api/users`:

### 3.2 Multiple HTTP methods in one file[](#32-multiple-http-methods-in-one-file)

Unlike the Pages Router API routes (which had a single default export), you can export multiple functions representing different HTTP methods from the same file.

Now, sending a GET request to `/api/users` returns your list of users, while a `POST` request to the same URL will insert a new one.

## 4\. Working with Web APIs[](#4-working-with-web-apis)

### 4.1 Directly using Request & Response[](#41-directly-using-request--response)

By default, your Route Handler methods (`GET`, `POST`, etc.) receive a standard [Request](https://developer.mozilla.org/docs/Web/API/Request) object, and you must return a standard [Response](https://developer.mozilla.org/docs/Web/API/Response) object.

### 4.2 Query parameters[](#42-query-parameters)

### 4.3 Headers and cookies[](#43-headers-and-cookies)

The `cookies()` and `headers()` functions can be helpful if you plan to re-use shared logic across other server-side code in Next.js. You'll notice Next.js also provides `NextRequest` and `NextResponse` which extend the base Web APIs.

## 5\. Dynamic routes[](#5-dynamic-routes)

To create dynamic paths (e.g. `/api/users/:id`), use **Dynamic Segments** in your folder structure:

This file corresponds to a URL like `/api/users/123`, with the `123` captured as a parameter.

Here, `params.id` gives you the dynamic segment.

## 6\. Using Next.js as a proxy or forwarding layer[](#6-using-nextjs-as-a-proxy-or-forwarding-layer)

A common scenario is **proxying** an existing backend service. You can authenticate requests, handle logging, or transform data before sending it to a remote server or backend:

Now your clients only need to call `/api/external`, and Next.js will handle the rest. This is also sometimes called a “Backend for Frontend” or BFF.

If you want to apply the same logic (e.g. authentication checks, logging) across multiple Route Handlers, you can create reusable functions that wrap your handlers:

Then in your Route Handler:

## 8\. Deployment and “SPA Mode” considerations[](#8-deployment-and-spa-mode-considerations)

### 8.1 Standard Node.js deployment[](#81-standard-nodejs-deployment)

The standard Next.js server deployment using next start enables you to use features like Route Handlers, Server Components, Middleware and more – while taking advantage of dynamic, request time information.

There is no additional configuration required. See [Deploying](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### 8.2 SPA/Static Export[](#82-spastatic-export)

Next.js also supports outputting your entire site as a [static Single-Page Application (SPA)](https://nextjs.org/docs/app/building-your-application/upgrading/single-page-applications).

You can enable this by setting:

In **static export mode**, Next.js will generate purely static HTML, CSS, and JS. **You cannot run server-side code** (like API endpoints). If you still need an API, you’d have to host it separately (e.g., a standalone Node.js server).

> **Note:**
> 
> -   **GET Route Handlers** [can be statically exported](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#route-handlers) if they don’t rely on dynamic request data. They become static files in your out folder.
> -   **All other server features** (dynamic requests, rewriting cookies, etc.) are **not** supported in a pure SPA export.

### 8.3 Deploying APIs on Vercel[](#83-deploying-apis-on-vercel)

If you are deploying your Next.js application to Vercel, we have a [guide on deploying APIs](https://vercel.com/guides/hosting-backend-apis). This includes other Vercel features like [programmatic rate-limiting](https://vercel.com/docs/security/vercel-waf/rate-limiting-sdk) through the Vercel Firewall. Vercel also offers [Cron Jobs](https://vercel.com/docs/cron-jobs/manage-cron-jobs), which are commonly needed with API approaches.

## 9\. When to skip creating an API endpoint[](#9-when-to-skip-creating-an-api-endpoint)

With the App Router’s **React Server Components**, you can fetch data directly on the server without exposing a public endpoint:

If your data is only used inside your Next.js app, you may not need a public API at all.

## 10\. Putting It All Together[](#10-putting-it-all-together)

1.  **Create a new Next.js project**: `npx create-next-app@latest --api`.
2.  **Add Route Handlers** inside the `app/` directory (e.g., `app/api/users/route.ts`).
3.  **Export HTTP methods** (`GET`, `POST`, `PUT`, `DELETE`, etc.) in the same file.
4.  **Use Web Standard APIs** to interact with the `Request` object and return a `Response`.
5.  **Build a public API** if you need other clients to consume your data, or to proxy a backend service.
6.  **Fetch** your new API routes from the client (e.g., within a Client Component or with `fetch('/api/...')`).
7.  Or **skip creating an API** altogether if a Server Component can just fetch data.
8.  **Add a shared “middleware”** pattern (e.g., `withAuth()`) for auth or other repeated logic.
9.  **Deploy** to a Node.js-capable environment for server features, or **export** statically if you only need a static SPA.

## Conclusion[](#conclusion)

Using the Next.js **App Router** and **Route Handlers** gives you a flexible, modern way to build APIs that embrace the **Web Platform** directly. You can:

-   **Create a full public API** to be shared by web, mobile, or third-party clients.
-   **Proxy** and customize calls to existing external services.
-   **Implement** a reusable “middleware” layer for authentication, logging, or any repeated logic.
-   **Dynamically route** requests using the `[id]` segment folder structure.

## Frequently Asked Questions[](#frequently-asked-questions)

### What about Server Actions?[](#what-about-server-actions)

You can think of [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) like automatically generated `POST` API routes that can be called from the client.

They are designed for mutation operations, such as creating, updating, or deleting data. You call a Server Action like a normal JavaScript function, versus making an explicit `fetch` to a defined API route.

While there _is_ still a network request happening, you don't need to manage it explicitly. The URL path is auto-generated and [encrypted](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security), so you can't manually access a route like `/api/users` in the browser.

If you plan to use Server Actions _and_ expose a public API, we recommend moving the core logic to a [Data Access Layer](https://nextjs.org/blog/security-nextjs-server-components-actions) and calling the same logic from both the Server Action and the API route.

### Can I use TypeScript with Route Handlers?[](#can-i-use-typescript-with-route-handlers)

Yes, you can use TypeScript with Route Handlers. For example, defining the `Request` and `Response` types in your `route` file.

Learn more about [TypeScript with Next.js](https://nextjs.org/docs/app/api-reference/config/typescript).

### What are the best practices for authentication?[](#what-are-the-best-practices-for-authentication)

Learn more in our [authentication documentation](https://nextjs.org/docs/app/building-your-application/authentication).