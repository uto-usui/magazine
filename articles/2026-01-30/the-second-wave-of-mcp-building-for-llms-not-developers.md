---
title: "The second wave of MCP: Building for LLMs, not developers"
source: "https://vercel.com/blog/the-second-wave-of-mcp-building-for-llms-not-developers"
publishedDate: "2025-09-09"
category: "frontend"
feedName: "Vercel"
author: "Boris Besemer"
---

3 min read

Sep 9, 2025

When the MCP standard first launched, many teams rushed to ship something. Many servers ended up as thin wrappers around existing APIs with minimal changes. A quick way to say "we support MCP".

At the time, this made sense. MCP was new, teams wanted to get something out quickly, and the obvious approach was mirroring existing API structures. Why reinvent when you could repackage?

But the problem with this approach is LLMs don’t work like developers. They don’t reuse past code or keep long term state. Each conversation starts fresh. LLMs have to rediscover which tools exist, how to use them, and in what order. With low level API wrappers, this leads to repeated orchestration, inconsistent behavior, and wasted effort as LLMs repeatedly solve the same puzzles.

MCP works best when tools handle complete user intentions rather than exposing individual API operations. One tool that deploys a project end-to-end works better than four tools that each handle a piece of the deployment pipeline.

## [Link to heading](#how-llms-use-apis-differently)How LLMs use APIs differently

The key difference is context and state management. When you write code, you keep track of information between API calls. You store the project ID from the create call, check deployment status before adding the domain, and wrap error handling around each step so failures don't break the entire process.

LLMs work differently. Each conversation starts fresh with no memory of previous conversations. While they can see tool results within the current conversation, they have to figure out the right sequence of tools to use based on what's available. When those tools are low-level API wrappers, the LLM has to orchestrate multiple calls and manage the complexity of chaining them together each time.

For example, take deploying a project with the Vercel API. A developer might write code like this:

```
// Traditional API usage: developer manages the sequenceconst project = await client.projects.create({  name: domain.replace(/\./g, '-'),  gitRepository: { repo: repoUrl }});await client.projects.createProjectEnv({  idOrName: project.id,  upsert: 'true',  requestBody: Object.entries(env).map(([key, value]) => ({    key, value,    target: ['production', 'preview', 'development'],    type: 'encrypted'  }))});const deployment = await client.deployments.createDeployment({  requestBody: {    name: project.name,    target: 'production',    gitSource: { type: 'github', repo: repo.replace('.git', ''), ref: 'main' }  }});await client.projects.addProjectDomain({  idOrName: project.id,  requestBody: { domain: domain }});
```

This approach involves nested configurations, ID management across calls, and parsing repository URLs. A developer will solve for this once and re-use. But an LLM faces this puzzle fresh each time, often getting the nesting wrong or forgetting required fields.

## [Link to heading](#single-workflow-tools-vs-multiple-endpoints)Single workflow tools vs multiple endpoints

The solution is building tools around complete user goals rather than API capabilities. Instead of four separate tools, create one `deploy_project` tool that handles the entire workflow internally.

This changes everything about tool design:

**API-shaped tools**

**Intention-based tools**

`create_project`, `add_env`, `deploy`, `add_domain`

`deploy_project`

Multiple calls with state management

Single atomic operation

Returns technical status codes

Returns conversational updates

LLM assembles the workflow

Tool owns the complete process

Consider the difference in practice. An API-shaped MCP server might expose these tools:

```
create_project(name, repo)add_environment_variables(project_id, variables)create_deployment(project_id, branch)add_domain(project_id, domain)
```

The LLM has to call each tool in sequence, pass IDs between calls, and handle potential failures at each step.

An intention-based tool looks different:

```
deploy_project(repo_url, domain, environment_variables, branch="main")
```

This single tool handles the complete workflow internally and returns a conversational response. Instead of `{ status: 200, data: { id: "proj_123" } }`, the LLM can respond with "Project deployed at `example.com`. Build completed in 45s. All systems running normally."

## [Link to heading](#designing-workflow-based-mcp-tools)Designing workflow based MCP tools

Start by testing the workflow manually before writing any code. Take a real user request like "set up my project with authentication and a database" and walk through it step by step using your existing APIs. The parts that feel tedious or repetitive are good candidates for a single MCP tool.

Think of MCP tools as tailored toolkits that help an AI achieve a particular task, not as API mirrors. There may be multiple APIs and business logic behind a single MCP tool. If users think of something as one workflow, design it as one tool.

Here's how to structure a complete workflow tool:

```
server.tool(  "deploy_project",  "Deploy a project with environment variables and custom domain",  {    repo_url: z.string(),    domain: z.string(),    environment_variables: z.record(z.string()),    branch: z.string().default("main")  },  async ({ repo_url, domain, environment_variables, branch }) => {    // Handle the complete workflow internally    const project = await createProject(repo_url, branch);    await addEnvironmentVariables(project.id, environment_variables);    const deployment = await deployProject(project.id);    await addCustomDomain(project.id, domain);    return {      content: [{        type: "text",        text: `Project deployed successfully at ${domain}. Build completed in ${deployment.duration}s.`      }]    };  });
```

Use plain code for the deterministic parts. Things like API sequencing, error recovery, and state management are better suited for regular programming. Only involve the LLM for parts that truly need reasoning or natural language processing.

Test with real scenarios. Run actual user workflows through your tools. When you see the LLM making multiple attempts or asking for clarification, that's feedback about your tool design. The goal is for complex workflows to succeed on the first try.

## [Link to heading](#performance-improvements-with-workflow-tools)Performance improvements with workflow tools

Teams that have shifted from API shaped tools to workflow shaped tools have seen meaningful improvements in reliability and efficiency.

The common thread is how these tools are designed:

-   They focus on user intentions rather than API coverage
    
-   They handle complete workflows rather than exposing single operations
    
-   They respond in a conversational way rather than returning technical codes
    

MCP works best when tools reflect complete user goals. LLMs do not manage state the way developers do, so building tools around workflows produces better results.

Give this approach a try. The [MCP handler](https://github.com/vercel/mcp-handler) makes it straightforward to expose your application logic as workflow based MCP tools. Get started with the [Next.js MCP template](https://vercel.com/templates/ai/model-context-protocol-mcp-with-vercel-functions) or [explore the documentation](https://vercel.com/docs/mcp).