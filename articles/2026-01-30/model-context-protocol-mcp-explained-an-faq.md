---
title: "Model Context Protocol (MCP) explained: An FAQ"
source: "https://vercel.com/blog/model-context-protocol-mcp-explained"
publishedDate: "2025-07-25"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

10 min read

Jul 25, 2025

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is a new way to help standardize the way large language models (LLMs) access data and systems, extending what they can do beyond their training data. It standardizes how developers expose data sources, tools, and context to models and agents, enabling safe, predictable interactions and acting as a universal connector between AI and applications.

Instead of building custom integrations for every AI platform, developers can create an MCP server once and use it everywhere.

## [Link to heading](#what-is-mcp)What is MCP?

MCP connects AI models (like Claude, GPT-4, etc) to external tools and systems. That can be your app’s API, a product database, a codebase, or even a desktop environment.

MCP lets you expose these capabilities in a structured way that models can understand. MCP isn’t a library or SDK. It’s a spec, like REST or GraphQL, but for AI agents.

Models continue to rely on their own trained knowledge and reasoning, but now they have access to specialized tools from MCP servers to fill in the gaps. If it reaches limits in its own understanding, it can call real functions, get real data, and stay within guardrails you define instead of fabricating its own answers (hallucinating).

So when it needs to reference stock levels, it's not making assumptions. It's querying your actual inventory system. The documentation it's fetching isn't [the last time it was crawled](https://vercel.com/blog/the-rise-of-the-ai-crawler), but the latest version you merged into prod 15 minutes ago.

## [Link to heading](#why-would-i-want-to-create-an-mcp-server)Why would I want to create an MCP server?

You’d create an MCP server if you want to give AI models controlled access to your app or service. That could mean letting a model place an order, fetch user data, write a file, or run a search.

It’s about extending AI capabilities by giving it useful access to your systems in a safe way. Instead of hoping the model understands your API docs, you define exactly what it can do and how.

## [Link to heading](#should-i-build-my-own-mcp-server-or-create-tools-directly-in-my-app)Should I build my own MCP server or create tools directly in my app?

If you’re building something for just your app or a single AI provider, you can define your tools directly in the LLM call. It’s simpler, faster, and gives you full control over execution.

MCP adds another layer: your tools are hosted outside your app, on a separate server. When you make a call to the LLM, you first connect to the MCP server, provide context to the model, then invoke the MCP server with the model’s chosen input for execution.

MCP servers make sense when you want your context and tools to be shared across many apps, models, or environments.

## [Link to heading](#what’s-the-difference-between-mcp-server-tools-and-an-api)What’s the difference between MCP server tools and an API?

An API is made for apps to call directly. A developer writes a request, sends it to a known endpoint, and gets back a predictable response. It’s built for humans and programs that know exactly what they’re doing and when they want to do it.

An MCP server is made for models. It provides metadata and structured descriptions that help the model understand which tools are available, what they do, and when to use them. Unlike APIs that need hard-coded calls, models use this context to figure out what to do.

You probably already have APIs, internal tools, and databases. An MCP server makes all of that accessible to AI in a standardized way. Write the integration once. Any MCP-compatible agent can use it. No custom logic for each model. No vendor lock-in.

## [Link to heading](#what’s-the-easiest-way-to-create-an-mcp-server)What’s the easiest way to create an MCP server?

The [AI SDK has built-in support for MCP](https://v5.ai-sdk.dev/cookbook/node/mcp-tools) and lets you quickly define functions and tools.

You can also use our [mcp-handler](https://vercel.com/changelog/mcp-server-support-on-vercel), an open source SDK to easily expose an MCP server to a Next.js, Nuxt, and Svelte app. It’s lightweight, requires only a few lines of code, and works with most frameworks.

Either way, you don’t need to understand every detail of the MCP spec. You define what the model can do and what it has access to, and the MCP server handles the rest. The abstractions AI SDK and mcp-handler provide make creating an MCP server in a few hours (or less) possible ([we added an MCP server to Grep in an afternoon](https://vercel.com/blog/grep-a-million-github-repositories-via-mcp-1H5Bmvo4XKswf0TpZIOmEI#from-zero-to-mcp-in-minutes)).

[

**MCP Server with Next.js**

Get started building your first MCP server on Vercel.

Deploy now



](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)

## [Link to heading](#how-do-i-use-an-mcp-server)How do I use an MCP server?

You connect a client, like your model or AI host (e.g. Claude or Cursor), to a MCP server. That connection allows the client to list capabilities that the server exposes, what input they take, and what output they return.

The model sees that, plans its calls, and sends requests when the server is needed. It’s like giving the model a toolbox it can pick from, and it picks the right tool based on the prompt. You don’t need to manage this. The model reads the MCP spec and decides what to use.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3XunBMRoNDm6o3l7ulxH7h%2F33bf3e1ec3fb9576cc8ee8e8bee73862%2FMCP_Flow_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6c0UoGpFTDsMJUc706hPR8%2F692d3992cde27fbd5e936dc2a9ab066a%2FMCP_Flow_-_Dark.png&w=1920&q=75)

## [Link to heading](#how-does-mcp-work-for-tools)How does MCP work for tools?

At a high level, an MCP server exposes a list of tools to the model in a machine-readable format (usually JSON). Each tool has a name, description, input schema, and output schema. This is called the tool manifest.

When the model sees this manifest, it can plan a sequence of actions by calling those tools, one at a time or in a loop, depending on the goal.

Each tool call is a normal HTTP request (or other transport) from the model to the MCP server. The server runs the tool logic and returns a response, which the model can then use to decide what to do next.

At its core, MCP treats requests like function calls. The model plans the next step. The server runs the tool and returns a result. That cycle continues until the task is done.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1DGdNIagF4Ey0NZJLgmgZR%2F01e01c46ada93921165adf75706ab279%2FHow_MCP_Works_-_Light_Mode_-_Desktop.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F337xqonIe2oQ39C7Fe0BHl%2Fbb0d4fdf427cfbbe87512c7ea2f97f05%2FHow_MCP_Works_-_Dark_Mode_-_Mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F17VFbo8UgJnbxMAgINzNxf%2Fc3a042a0eeea4a8019f69f09bfea6e05%2FHow_MCP_Works_-_Light_Mode.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4takwj7gWpDYYcE1F1Se53%2Fb6f93f54372985b8311a832d71d52eda%2FHow_MCP_Works_-_Dark_Mode.png&w=1920&q=75)

## [Link to heading](#what-are-the-"transports"-of-mcp)What are the "transports" of MCP?

Transports are how the model talks to your MCP server. Today, StreamableHTTP is the main one. The model uses standard HTTP to hit a URL and create a connection. Optionally, it also allows the use of Server-Sent Events (SSE) on the side for real time notifications.

The other popular transport is stdio, used in local or command line interface (CLI) environments where the model and tools share the same process.

Transport choice depends on the kind of interaction: one-off call vs stream of actions.

Packages like [mcp-handler](https://vercel.com/changelog/mcp-server-support-on-vercel) support many transports, so it’s easy to switch or support more than one.

## [Link to heading](#what-is-the-difference-between-an-ai-agent-and-an-mcp-server)What is the difference between an AI agent and an MCP server?

An AI agent is the model (client or system using the model) that plans and takes actions. An MCP server is the environment that defines what actions are possible. The agent decides what to do. The MCP server tells it how to do it.

Think of it like this:

-   The chef decides what to make (AI agent)
    
-   The kitchen determines what tools and ingredients are available (MCP server)
    
-   The chef can only work with what the kitchen exposes
    

You need both. The agent figures out the intent. The MCP server makes sure it stays on track and uses approved tools. The server doesn’t take action. It just shows the model what’s possible.

## [Link to heading](#what’s-the-difference-between-a-local-and-remote-mcp-server)What’s the difference between a local and remote MCP server?

The difference is where they run and how they talk to each other.

A local MCP runs on the same machine or environment as the model. This is common in playgrounds, dev tools, prototyping, experimentation, or when developing both the model and MCP server locally on your machine. Local MCP servers are useful when you don’t want to expose data publicly. It’s fast and private.

A remote MCP runs on a server, separate from the AI models accessing it. This is how most production apps work. It lets models running on OpenAI, Claude, or your IDE reach your platform’s tools, allowing centralized and shared access.

You can start local while developing, then move to remote when you go live.

## [Link to heading](#what-are-use-cases-for-mcp-servers)What are use cases for MCP servers?

MCP servers are useful anywhere you want a model to interact with real systems safely and predictably.

-   For e-commerce, that might mean exposing tools for product search, cart updates, order history, and checkout. A model can help users find items, manage carts, or even complete purchases
    
-   In finance, models can pull account balances, categorize transactions, or generate reports, while respecting permissions and limits
    
-   Marketing can run audience queries, send outbound messages, or schedule campaigns using structured workflows
    

There are also meta-use cases: MCP servers can help one AI agent coordinate with another, or manage tools inside AI-native apps.

These are just a few examples. You’ll also see MCP used in customer support bots, logistics tracking, clinical assistant tools, and so much more. Any time you want a model to actually take action (search, update, book, create) MCP gives it structure and control.

## [Link to heading](#how-will-mcp-help-everyday-internet-users)How will MCP help everyday internet users?

They won’t see MCP directly. But they’ll notice smarter, more helpful AI features on the sites and apps they use. Instead of chatbots giving vague or generic answers, they’ll get precise responses backed by real data.

They’ll be able to do things and take actions on their behalf. Ask an AI to reschedule a meeting, and it actually moves the event, notifies attendees, and sends a confirmation. Say "Find me a blue dress for next month’s graduation," and it checks store inventory, considers shipping times, and places the order. Planning a trip? The AI books the flights instead of just listing websites.

For businesses, this means customers can do more through simple conversation. They don’t need to learn a new interface or app. The AI understands what they mean and handles the rest.

## [Link to heading](#are-mcp-servers-secure)**Are MCP servers secure?**

Yes, but it depends on how you build them. MCP servers don’t bypass your existing auth or logic. They only expose what you choose. The model can only see and use the tools you define. If a tool requires user auth, you can enforce that just like any other API.

MCP is about surfacing capabilities, not giving blanket access. And since you control the logic behind each tool, you can put in checks, rate limits, logging, and more. The model can't do anything outside what you allow.

The [mcp-handler supports](https://github.com/vercel/mcp-adapter?tab=readme-ov-file#authorization) the [MCP Authorization Specification](https://modelcontextprotocol.io/specification/draft/basic/authorization). This allows you to protect your MCP endpoints and access authentication information in your tools.

## [Link to heading](#who-created-and-supports-mcp-is-it-open-or-closed-sourced)Who created and supports MCP? Is it open or closed sourced?

MCP was created by [Anthropic](https://www.anthropic.com/) and released as open source under the MIT license. Everything lives on GitHub, including the spec, SDKs, and example implementations.

Now it's a growing community project. [Zed](https://zed.dev/) uses it for coding tools. [Sourcegraph](https://sourcegraph.com/) uses it for code search and navigation. Independent developers have built servers for things like smart homes and research tools.

There is no formal committee, but a core maintainer group and a community. People discuss ideas in public and improve the protocol through real use. This keeps it focused on what actually works.

The AI SDK and v0 both support the MCP spec out of the box.

## [Link to heading](#what-are-the-alternatives-to-mcp)What are the alternatives to MCP?

There are a few other ways to connect AI models to tools, depending on your needs.

**Simple Language Open Protocol (SLOP)** uses plain HTTP endpoints that accept natural language. It’s easy to set up, but puts more work on the AI to figure things out at runtime. For simple use cases, that tradeoff can make sense.

**Platform-specific solutions**, like OpenAI’s function calling, are tightly integrated into their own ecosystems. They offer good performance and tools that "just work," but you have to rebuild for each platform. That can lead to vendor lock-in.

**Orchestration frameworks**, like LangChain, help manage workflows across multiple LLMs and tools. These often support MCP and can be used together.

Choose the tool based on what you’re building:

-   For quick experiments, SLOP is fast
    
-   For deep integration with one provider, platform tools make sense
    
-   For complex workflows, orchestration frameworks help
    

However, for using one tool setup across many AIs, with clear structure and security, MCP is the right fit for most.

## [Link to heading](#why-mcp-matters)Why MCP matters

MCP changes how we think about AI integration. Instead of building one-off solutions for each platform, developers can create tools that work across the entire ecosystem.

This is similar to how the web evolved. Early websites needed browser-specific code. Then standards like HTTP and REST made the web more consistent and powerful. MCP brings that kind of structure to AI.

For developers, the integration cost is low. You already have APIs and systems that do useful things. MCP gives you a standard way to make those tools available to AI. As more platforms adopt it, the value of a single integration grows.

The most exciting part is what this unlocks. When AI can take action, not just give suggestions, new kinds of apps become possible. The line between knowing and doing gets thinner.

For example, [we recently added an MCP server to Grep](https://vercel.com/blog/grep-a-million-github-repositories-via-mcp), our fast code search app. It already had APIs, but by adding an MCP server, you can now integrate [Grep](https://grep.app/) into tools like Cursor and Claude Code. AI agents can now reference coding patterns and solutions used in over one million open source projects to solve problems and answer questions in building your app.

_Thanks to MCP co-creator,_ [_David Soria Parra_](https://x.com/dsp_)_, for reviewing the post and providing feedback._