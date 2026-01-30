---
title: "Grep a million GitHub repositories via MCP"
source: "https://vercel.com/blog/grep-a-million-github-repositories-via-mcp"
publishedDate: "2025-07-17"
category: "frontend"
feedName: "Vercel"
author: "Dan Fox"
---

2 min read

Jul 17, 2025

[Grep](https://vercel.com/blog/vercel-acquires-grep) now supports the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction), enabling AI apps to query a million public GitHub repositories using a standard interface. Whether you're building in Cursor, using Claude, or integrating your own agent, Grep can now serve as a searchable code index over HTTP.

## [Link to heading](#what-is-the-grep-mcp-server)What is the Grep MCP server

MCP is a protocol for exposing tools to large language models (LLMs). Grep’s new MCP server provides an endpoint that searches public GitHub repositories. Through the Grep MCP server, AI agents can issue search queries and retrieve code snippets that match specific patterns or regular expressions, filtered by language, repository, and file path.

It's backed by the same infrastructure as grep.app. Results typically return in a fraction of a second, with snippets ranked for relevance.

## [Link to heading](#how-to-configure-it-in-your-ai-client)How to configure it in your AI client

Setting up MCP servers is generally straightforward. Once your client is aware of the MCP endpoint, it can introspect the available tools and invoke them directly. Each tool is defined in a machine-readable schema, which makes integration predictable for agents and apps.

To connect an AI client to Grep’s MCP server, use the following configurations.

### [Link to heading](#in-cursor:)**In Cursor:**

```
{  "mcpServers": {    "grep": {      "url": "https://mcp.grep.app"    }  }}
```

### [Link to heading](#with-claude-code:)**With Claude Code:**

```
claude mcp add --transport http grep https://mcp.grep.app
```

## [Link to heading](#an-example-of-how-to-use-it)**An example of how to use it**

Let’s say you're writing an MCP server of your own. As you’re implementing it, you have to handle some cases where there’s an error and you want to communicate that to the client. You’re not sure the right way to do that, so you might ask your AI agent how to handle it.

`What's the right way for this MCP tool to return an error message to the client?`

If you have the Grep MCP server configured, your agent may decide to run some code searches to help it answer the question. It may try a few different queries, and eventually arrive at this one, which is looking for a `server.tool` function call that includes a `catch` block.

```
{ "query": "(?s)server\\.tool.*catch", "language": [  "TypeScript",  "JavaScript" ], "useRegexp": true}
```

The Grep MCP server returns a list of results, which look like this:

```
Repository: microsoft/rushstackPath: apps/rush-mcp-server/src/tools/base.tool.tsURL: https://github.com/microsoft/rushstack/blob/main/apps/rush-mcp-server/src/tools/base.tool.tsLicense: UnknownSnippets:--- Snippet 1 (Line 39) ---  public register(server: McpServer): void {  // TODO: remove ts-ignore  // @ts-ignore  server.tool(this._options.name, this._options.description, this._options.schema, async (...args) => {    try {      const result: CallToolResult = await this.executeAsync(...(args as Parameters<ToolCallback<Args>>));      return result;    } catch (error: unknown) {      return {         isError: true,         content: [
```

This result in particular suggests the answer: when returning an error response from an MCP tool call, you should set `isError: true` .

To confirm the answer, the LLM runs another query.

```
{ "query": "isError: true", "language": [  "TypeScript",  "JavaScript" ]}
```

That query provides more examples of how MCP servers return error responses.

Based on these search results, the AI agent is able to respond with the answer and offer to update your project to properly handle errors.

## [Link to heading](#from-zero-to-mcp-in-minutes)From zero to MCP in minutes

We built Grep's MCP server in an afternoon. Using the [`mcp-handler`](https://vercel.com/changelog/mcp-server-support-on-vercel) package, we turned Grep’s existing API into a fully compliant MCP server. The adapter handles schema, request routing, and response formatting so the only work needed was mapping the search endpoint to the MCP contract.

If you're exposing an existing tool or API to AI clients, Vercel's MCP adapter abstracts the boilerplate and makes development and deployment simple on Vercel.

Try [Grep](https://grep.app/) or Grep's MCP server today.

[

**MCP Server with Next.js**

Get started building your first MCP server on Vercel.

Deploy now



](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)