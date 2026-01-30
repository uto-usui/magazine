---
title: "Running Next.js inside ChatGPT: A deep dive into native app integration"
source: "https://vercel.com/blog/running-next-js-inside-chatgpt-a-deep-dive-into-native-app-integration"
publishedDate: "2025-10-15"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

## Running Next.js inside ChatGPT: A deep dive into native app integration

8 min read

Oct 15, 2025

When OpenAI announced the Apps SDK with Model Context Protocol (MCP) support, it opened the door to embedding web applications directly into ChatGPT. But there's a significant difference between serving static HTML in an iframe and running a full Next.js application with client-side navigation, React Server Components, and dynamic routing.

This is the story of how we bridged that gap. We created a Next.js app that runs natively inside ChatGPT's triple-iframe architecture, complete with navigation and all the modern features you'd expect from a Next.js application.

## [Link to heading](#what-chatgpt-apps-and-mcp-enable)What ChatGPT apps and MCP enable

[ChatGPT apps](https://openai.com/index/introducing-apps-in-chatgpt/) are interactive applications that run inside ChatGPT conversations. When you ask ChatGPT to "find me a hotel in Paris," a Booking.com widget appears directly in the chat with real search results you can interact with. These apps reach over 800 million ChatGPT users and appear naturally when relevant to the conversation.

ChatGPT apps are built on [Model Context Protocol](https://vercel.com/blog/model-context-protocol-mcp-explained) (MCP), an open standard that connects AI models to external tools and data. MCP works like REST or GraphQL, but for AI agents. Instead of hard-coding API calls, you define tools and resources in a structured format that models can discover and use. When ChatGPT needs to show your app, it fetches HTML from your MCP server and renders it in an iframe.

For Next.js developers, this means your existing application can run inside ChatGPT with the right patches, giving you immediate distribution without rebuilding from scratch. Our [starter template](https://github.com/vercel-labs/chatgpt-apps-sdk-nextjs-starter) gives you a working ChatGPT app you can [deploy to Vercel](https://vercel.com/templates/ai/chatgpt-app-with-next-js) right away.

[

**Ready to build your own ChatGPT app?**

Deploy our ChatGPT Apps SDK Next.js starter template to Vercel and start experimenting right away.

Deploy now



](https://vercel.com/templates/ai/chatgpt-app-with-next-js)

The template handles all the browser API patches and MCP server configuration automatically. ChatGPT's nested-iframe architecture breaks several Next.js features. Understanding how the patches fix these issues helps you customize and extend your app beyond the starter.

## [Link to heading](#how-chatgpt's-nested-iframe-architecture-breaks-modern-frameworks)How ChatGPT's nested-iframe architecture breaks modern frameworks

ChatGPT renders apps in a three-layer iframe architecture to protect itself from potentially malicious apps. An iframe is an HTML element that embeds one webpage inside another, creating an isolated sandbox.

```
chatgpt.com  └── web-sandbox.oaiusercontent.com (sandbox iframe)     └── web-sandbox.oaiusercontent.com (inner iframe)        └── your app's HTML 
```

The sandbox domain (`web-sandbox.oaiusercontent.com`) acts as a security buffer between ChatGPT and your app. This isolates apps from ChatGPT's main interface and protects users from potentially harmful code.

But this security model creates several technical challenges. When Next.js runs inside the deepest iframe, it thinks its origin is `web-sandbox.oaiusercontent.com` instead of your actual domain.

This behavior breaks several core features:

1.  **Asset loading breaks:** Next.js requests `/_next/static/chunks/app.js` from the sandbox domain instead of your actual domain, returning 404s
    
2.  **Relative URLs resolve incorrectly:** Images, fonts, and API calls using relative paths (like `/logo.png` or `/api/data`) resolve against the sandbox domain instead of your app's domain
    
3.  **Browser history stores full URLs:** `history.pushState` saves `https://your-app.vercel.app/about`, which exposes your real domain and breaks the sandbox security model
    
4.  **Client-side navigation fails:** When you click a Next.js Link, fetch requests go to the sandbox domain instead of your server
    
5.  **CORS blocks React Server Components:** Cross-origin requests from the iframe to your server fail without proper headers. Browsers also send `OPTIONS` preflight requests that Next.js doesn't handle by default
    
6.  **Parent frames modify your HTML:** ChatGPT occasionally adds attributes to your root `<html>` element, causing React hydration mismatches
    
7.  **External links navigate inside the iframe:** Links to external sites try to load inside the constrained iframe instead of opening in the user's browser
    

Let's explore how we solved each of these problems.

## [Link to heading](#making-static-assets-load-from-your-actual-domain)**Making static assets load from your actual domain**

Next.js generates asset paths like `/_next/static/chunks/app-pages-browser.js`. When running in the ChatGPT iframe, these requests resolve to `https://web-sandbox.oaiusercontent.com/_next/static/chunks/app-pages-browser.js`. But that URL doesn't exist. The assets live on your actual domain.

Next.js provides `assetPrefix` for exactly this scenario. Setting `assetPrefix` to your app's URL forces all `/_next/` requests to use the correct origin:

next.config.ts

```
import type { NextConfig } from "next";import { baseURL } from "./baseUrl";const nextConfig: NextConfig = {  assetPrefix: baseURL, // Forces /_next/ requests to use your-app.vercel.app};export default nextConfig;
```

The `baseURL` is dynamically determined based on the environment:

baseUrl.ts

```
export const baseURL =  process.env.NODE_ENV == "development"    ? "<http://localhost:3000>"    : "https://" +      (process.env.VERCEL_ENV === "production"        ? process.env.VERCEL_PROJECT_PRODUCTION_URL        : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL);
```

This ensures assets load correctly in development, preview, and production environments.

## [Link to heading](#setting-a-base-url-for-all-relative-paths)**Setting a base URL for all relative paths**

Even with `assetPrefix` configured, other relative URLs still break. Images, fonts, and API calls using relative paths (like `/logo.png`, `/fonts/inter.woff2`, or `/api/data`) all resolve to `https://web-sandbox.oaiusercontent.com` instead of your domain. Next.js doesn't have a built-in way to rewrite every relative URL in your app.

The HTML `<base>` element solves this. It sets the base URL for all relative URLs in a document:

app/layout.tsx

```
function NextChatSDKBootstrap({ baseUrl }: { baseUrl: string }) {  return (    <>      <base href={baseUrl}></base>      {/* Other bootstrap code... */}    </>  );}
```

With this single element, every relative URL automatically resolves against your actual domain. This includes images (`<img src="/logo.png">`), stylesheets (`<link href="/styles.css">`), and API calls (`fetch('/api/data')`).

## [Link to heading](#patching-browser-history-to-prevent-url-leaks)**Patching browser history to prevent URL leaks**

Next.js uses the History API (`history.pushState` and `history.replaceState`) to update the URL bar during client-side navigation. However, when running inside an iframe with a different displayed origin, these APIs store full URLs like `https://your-app.vercel.app/about`. This exposes your real domain and breaks the sandbox security model.

Our solution is to intercept calls to `history.pushState` and `history.replaceState`, stripping them down to just the path, search params, and hash:

app/layout.tsx

```
const originalReplaceState = history.replaceState;history.replaceState = (state, unused, url) => {  const u = new URL(url ?? "", window.location.href);  const href = u.pathname + u.search + u.hash;  originalReplaceState.call(history, state, unused, href);};const originalPushState = history.pushState;history.pushState = (state, unused, url) => {  const u = new URL(url ?? "", window.location.href);  const href = u.pathname + u.search + u.hash;  originalPushState.call(history, state, unused, href);};
```

This ensures that navigation history entries only contain relative paths like `/about` instead of full URLs, preserving the iframe's security boundary while maintaining functional browser history and back/forward buttons.

## [Link to heading](#rewriting-fetch-requests-for-client-side-navigation)**Rewriting fetch requests for client-side navigation**

Next.js uses a sophisticated client-side navigation system powered by React Server Components (RSC). When you click a Link, Next.js makes a `fetch` request to load the new page's RSC payload (a special format containing the component tree and data).

But remember, your app runs in an iframe at `web-sandbox.oaiusercontent.com` while the server is at `your-app.vercel.app`. Without intervention, these fetch requests fail because they target the wrong domain.

Our solution is to patch `window.fetch` to rewrite same-origin requests to use the correct base URL:

app/layout.tsx

```
const appOrigin = new URL(baseUrl).origin;const isInIframe = window.self !== window.top;if (isInIframe && window.location.origin !== appOrigin) {  const originalFetch = window.fetch;  window.fetch = (input: URL | RequestInfo, init?: RequestInit) => {    // Parse the request URL from various input types    let url = /* ... parse input to URL ... */;    // If the request targets the iframe's origin, rewrite it    if (url.origin === window.location.origin) {      const newUrl = new URL(baseUrl);      newUrl.pathname = url.pathname;      newUrl.search = url.search;      newUrl.hash = url.hash;      return originalFetch.call(window, newUrl.toString(), {        ...init,        mode: "cors", // Enable CORS for cross-origin RSC requests      });    }    return originalFetch.call(window, input, init);  };}
```

This patch only runs when:

1.  The app is inside an iframe (`window.self !== window.top`)
    
2.  The iframe's origin differs from the app's actual origin
    

When these conditions are met, any fetch request to the iframe's origin is transparently rewritten to use the app's real origin, with CORS mode enabled for cross-origin requests.

## [Link to heading](#adding-cors-headers-for-cross-origin-requests)Adding CORS headers for cross-origin requests

With fetch patching in place, client-side navigation now makes cross-origin requests from the iframe to your server. But these requests will fail without proper CORS headers.

Modern browsers also send `OPTIONS` preflight requests before cross-origin `POST` requests (which Next.js uses for RSC payloads). Without handling these `OPTIONS` requests, navigation hangs.

Next.js middleware runs on every request before it's processed, which makes it the perfect place to add CORS headers and solve this problem:

middleware.ts

```
import { NextResponse } from "next/server";import type { NextRequest } from "next/server";export function middleware(request: NextRequest) {  // Handle OPTIONS preflight requests  if (request.method === "OPTIONS") {    const response = new NextResponse(null, { status: 204 });    response.headers.set("Access-Control-Allow-Origin", "*");    response.headers.set(      "Access-Control-Allow-Methods",      "GET,POST,PUT,DELETE,OPTIONS"    );    response.headers.set("Access-Control-Allow-Headers", "*");    return response;  }  // Add CORS headers to all responses  return NextResponse.next({    headers: {      "Access-Control-Allow-Origin": "*",      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",      "Access-Control-Allow-Headers": "*",    },  });}export const config = {  matcher: "/:path*", // Apply to all routes};
```

This middleware:

1.  **Responds to OPTIONS requests** with a 204 status and appropriate CORS headers
    
2.  **Adds CORS headers to all responses** so cross-origin fetch requests succeed
    

Now when Next.js makes an RSC request during navigation, the browser's preflight check passes and the actual request receives the data it needs.

## [Link to heading](#preventing-parent-frame-interference-with-dom-mutations)**Preventing parent frame interference with DOM mutations**

ChatGPT's parent frames occasionally modify the root `<html>` element by adding attributes. When React tries to hydrate, the server-rendered HTML doesn't match the DOM, causing hydration mismatch errors.

Our solution is to use a `MutationObserver` to watch for attribute changes on the root element and immediately remove unauthorized modifications:

app/layout.tsx

```
const htmlElement = document.documentElement;const observer = new MutationObserver((mutations) => {  mutations.forEach((mutation) => {    if (      mutation.type === "attributes" &&      mutation.target === htmlElement    ) {      const attrName = mutation.attributeName;      if (attrName && attrName !== "suppresshydrationwarning") {        htmlElement.removeAttribute(attrName);      }    }  });});observer.observe(htmlElement, {  attributes: true,  attributeOldValue: true,});
```

We also add `suppressHydrationWarning` to the `<html>` tag to prevent React from logging warnings:

app/layout.tsx

```
<html lang="en" suppressHydrationWarning>
```

While this isn't a perfect solution (the parent frame shouldn't modify our HTML), it prevents the console from being flooded with hydration warnings.

## [Link to heading](#opening-external-links-in-the-user's-browser)**Opening external links in the user's browser**

Without intervention, links to external sites try to navigate inside the constrained iframe. This creates a poor user experience when users click on documentation, blog posts, or other external resources.

ChatGPT provides an `openai.openExternal()` API specifically to handle this case. Our solution is to intercept clicks on external links and use this API to open them in the user's browser:

app/layout.tsx

```
window.addEventListener(  "click",  (e) => {    const a = (e?.target as HTMLElement)?.closest("a");    if (!a || !a.href) return;    const url = new URL(a.href, window.location.href);    if (      url.origin !== window.location.origin &&      url.origin !== appOrigin    ) {      try {        if (window.openai) {          window.openai.openExternal({ href: a.href });          e.preventDefault();        }      } catch {        console.warn("openExternal failed, likely not in OpenAI client");      }    }  },  true // Use capture phase to intercept before Next.js Link components);
```

This ensures external links open in the user's browser instead of navigating inside the constrained iframe.

## [Link to heading](#connecting-your-next.js-app-to-chatgpt-with-mcp)**Connecting your Next.js app to ChatGPT with MCP**

With all the browser API patches in place, the final step is implementing the MCP server that connects ChatGPT to your Next.js app. MCP servers expose two main primitives: resources (content that can be displayed) and tools (actions the model can invoke).

### [Link to heading](#how-mcp-resources-serve-html-to-chatgpt)How MCP resources serve HTML to ChatGPT

Resources serve HTML content that ChatGPT renders in iframes. We fetch the homepage HTML and register it as a resource:

app/mcp/route.ts

```
const html = await getAppsSdkCompatibleHtml(baseURL, "/");server.registerResource(  "content-widget",  "ui://widget/content-template.html",  {    title: "Show Content",    description: "Displays the homepage content",    mimeType: "text/html+skybridge",    _meta: {      "openai/widgetDescription": "Displays the homepage content",      "openai/widgetPrefersBorder": true,    },  },  async (uri) => ({    contents: [      {        uri: uri.href,        mimeType: "text/html+skybridge",        text: `<html>${html}</html>`,        _meta: {          "openai/widgetDescription": "Displays the homepage content",          "openai/widgetPrefersBorder": true,        },      },    ],  }));
```

The `mimeType` of `text/html+skybridge` tells ChatGPT to render this as an interactive widget. The `_meta` object contains OpenAI-specific configuration like the widget description and whether to show a border.

### [Link to heading](#how-mcp-tools-trigger-app-displays)How MCP tools trigger app displays

Tools are actions ChatGPT can invoke. By linking a tool to a resource via `openai/outputTemplate`, ChatGPT knows to render the widget after the tool is called:

app/mcp/route.ts

```
server.registerTool(  "show_content",  {    title: "Show Content",    description: "Fetch and display the homepage content with the name of the user",    inputSchema: {      name: z.string().describe("The name of the user to display"),    },    _meta: {      "openai/outputTemplate": "ui://widget/content-template.html",      "openai/toolInvocation/invoking": "Loading content...",      "openai/toolInvocation/invoked": "Content loaded",      "openai/widgetAccessible": false,      "openai/resultCanProduceWidget": true,    },  },  async ({ name }) => {    return {      content: [        {          type: "text",          text: name,        },      ],      structuredContent: {        name: name,        timestamp: new Date().toISOString(),      },      _meta: {        "openai/outputTemplate": "ui://widget/content-template.html",        "openai/toolInvocation/invoking": "Loading content...",        "openai/toolInvocation/invoked": "Content loaded",        "openai/widgetAccessible": false,        "openai/resultCanProduceWidget": true,      },    };  });
```

The `_meta` object contains OpenAI-specific configuration:

-   **`openai/outputTemplate`****:** Links to the registered resource URI
    
-   **`openai/toolInvocation/invoking`****:** Text shown while the tool is executing
    
-   **`openai/toolInvocation/invoked`****:** Text shown after completion
    
-   **`openai/widgetAccessible`****:** Whether the widget should be keyboard/screen reader accessible
    
-   **`openai/resultCanProduceWidget`****:** Signals that this tool can render a widget
    

## [Link to heading](#how-your-app-receives-data-from-chatgpt)How your app receives data from ChatGPT

The app can receive data from tool invocations via the `window.openai.toolOutput` property. ChatGPT automatically populates this object with the `structuredContent` from the tool's response:

app/page.tsx

```
const [name, setName] = useState<string | null>(null);useEffect(() => {  if (typeof window === "undefined") return;  if (!window.openai) {    (window as any).openai = {};  }  let currentValue = (window as any).openai.toolOutput;  Object.defineProperty((window as any).openai, "toolOutput", {    get() {      return currentValue;    },    set(newValue: any) {      currentValue = newValue;      if (newValue?.name) {        setName(newValue.name);      }    },    configurable: true,    enumerable: true,  });  if (currentValue?.name) {    setName(currentValue.name);  }}, []);
```

This reactive pattern allows the app to update its UI whenever ChatGPT invokes a tool. The property setter intercepts changes to `toolOutput` and updates React state accordingly.

## [Link to heading](#using-react-hooks-to-manage-chatgpt-integration)Using React hooks to manage ChatGPT integration

The manual [`window.openai`](https://developers.openai.com/apps-sdk/reference) approach shown above works, but it's verbose and requires boilerplate in every component that needs ChatGPT integration. For production applications, we built a collection of React hooks that abstract the browser API into type-safe patterns.

These hooks handle server-side rendering, optimize re-renders, and provide type safety. Three core hooks cover most use cases:

**`useSendMessage`** **sends followup messages to ChatGPT:**

app/page.tsx

```
const sendMessage = useSendMessage();// Trigger a new ChatGPT message from user interaction<button onClick={() => sendMessage("Show me more examples")}>  More Examples</button>
```

**`useWidgetProps`** **accesses tool call outputs with type safety:**

app/page.tsx

```
const toolOutput = useWidgetProps<{ name?: string }>();// Access structured data from the tool invocationconst name = toolOutput?.name;
```

**`useDisplayMode`** **customizes your interface based on display mode:**

app/page.tsx

```
const displayMode = useDisplayMode();// Render different layouts based on how ChatGPT displays the appreturn displayMode === "fullscreen" ? <FullView /> : <CompactView />;
```

The full collection of hooks is available in the [ChatGPT Apps SDK Next.js Starter](https://github.com/vercel-labs/chatgpt-apps-sdk-nextjs-starter/tree/main/app/hooks).

## [Link to heading](#the-advantages-this-approach-unlocks)**The advantages this approach unlocks**

This approach provides several significant advantages over simpler iframe embedding.

### [Link to heading](#native-next.js-navigation)Native Next.js navigation

Users can click links and navigate between pages using Next.js's client-side routing. The browser's back and forward buttons work correctly. Navigation is fast thanks to React Server Components streaming page updates instead of reloading the entire iframe.

Without these patches, you'd be limited to serving a single static page or adding yet another iframe layer, which would introduce even more complexity.

### [Link to heading](#full-next.js-feature-set)Full Next.js feature set

You're not limited to static HTML. All of Next.js's features work normally:

-   React Server Components and streaming
    
-   Server Actions for forms
    
-   Incremental Static Regeneration (ISR)
    
-   Dynamic routing with `[slug]` patterns
    
-   API routes
    
-   Middleware
    

### [Link to heading](#unchanged-developer-experience)Unchanged developer experience

The patches are applied once in `layout.tsx`. The rest of your codebase uses familiar Next.js patterns without workarounds. You can develop locally with `next dev` and deploy to Vercel like any other Next.js app.

### [Link to heading](#performance-that-matches-standard-next.js-apps)Performance that matches standard Next.js apps

Client-side navigation is faster than full page reloads because only the new page's data transfers over the network, not the entire document. React Server Components enable streaming, so users see content faster on slower connections.

### [Link to heading](#native-feeling-user-experience)Native-feeling user experience

The app feels integrated into ChatGPT rather than bolted on. Users can:

-   Navigate naturally with working back/forward buttons
    
-   See instant page transitions
    
-   Open external links in their browser
    
-   Experience smooth interactions without iframe nesting issues
    

## [Link to heading](#getting-started-with-next.js-in-chatgpt)Getting started with Next.js in ChatGPT

These seven patches solve the fundamental incompatibilities between ChatGPT's iframe architecture and Next.js's expectations. The [starter template](https://github.com/vercel-labs/chatgpt-apps-sdk-nextjs-starter) implements all of them, so you can focus on building your app's features instead of wrestling with browser APIs.

Whether you're building productivity tools, data visualizations, or interactive experiences, this foundation brings the full power of Next.js to ChatGPT's 800 million users.

[

**Ready to build your own ChatGPT app?**

Deploy our ChatGPT Apps SDK Next.js starter template to Vercel and start experimenting right away.

Deploy now



](https://vercel.com/templates/ai/chatgpt-app-with-next-js)