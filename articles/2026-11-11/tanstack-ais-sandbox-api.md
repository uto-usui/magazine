---
title: "TanStack AI’s Sandbox API"
source: "https://blog.master.dev/tanstack-ai-sandbox-api/"
publishedDate: "2026-11-09"
category: "css"
feedName: "Frontend Masters Blog"
author: "Adam Rackis"
---

TanStack AI is a fantastic SDK for integrating AI features into software. I’ve written about it [here](https://blog.master.dev/unlocking-ai-in-your-apps-with-tanstack-ai/) and [here](https://blog.master.dev/structured-output-with-tanstack-ai/). Those posts covered basic prompt-based requests; we provided context and asked AI to generate some workouts for us. We went through streaming, persistence, and structured output.

This post is about doing actual agentic work through TanStack AI, via their Sandbox API. Specifically, we’ll use TanStack AI to drive Claude Code in a remote sandbox, make changes to a GitHub repo, and open a pull request. Why would you want to do this? Sometimes you’re away from your computer with some downtime and nothing better to do than get a few tasks done.

I want to be clear: this is already possible with tools like T3, Codex, etc. You can pair your laptop and your phone, and drive the former from the latter. But your laptop needs to be up and running for that to work. Ideally, you’d have a PC set up and always on, running a simple Linux distro, for this very purpose. But if you don’t have that set up, and don’t care to, what I’ll show you here is a decent next-best alternative. It won’t be nearly as fast, and you’ll have to pay a small amount to providers like Vercel or Railway to use the remote sandboxes. But as an occasional fill-in, it’s more than good enough in my opinion.

## Our Use Case

I have a dirt-simple web app [here](https://github.com/arackaf/tanstack-ai-sandboxes-blog-post). It has pages for different programming languages, with brief descriptions of each. I also have some admin pages that let me add features by prompting Claude Code in a remote sandbox with GitHub access.

The app has admin pages for Vercel and Railway, and both providers can clone our repo, branch, add the requested feature, and open a PR.

Let’s take a look!

## Setup

You’ll need a few tokens. We’ll use Claude Code in our sandbox and connect it to GitHub so we can clone the repo and create PRs.

Let’s set up GitHub first. Go over to [https://github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens) and generate a new token. Make sure you select either “All Repositories” or “Only select repositories” (and select the repositories you want to provide access to). Then, for permissions, choose “Contents” and “Pull requests” with read/write access, and Metadata should auto-populate.

![The GitHub fine-grained personal access token form, with repository access selected and the Contents and Pull requests permissions set to read and write.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/github-token.jpg?resize=1596%2C1548&quality=89&ssl=1)

Generate the token and copy it into this environment var:

`GH_TOKEN="github_pat_abc_xyz"`Code language: plaintext (plaintext)

Next, head over to the [Anthropic console](https://platform.claude.com/settings/keys), generate an API key, and copy it into a new env var:

![The API keys page in the Anthropic console, with a button to create a new key.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/anthropic-console.png?resize=1494%2C412&quality=80&ssl=1)

`ANTHROPIC_API_KEY="sk-ant-xyz-abc"`Code language: Bash (bash)

## Setting Up Our Sandboxes

We’ll be running code in a cloud sandbox. TanStack AI supports [a lot of different options](https://tanstack.com/ai/latest/docs/sandbox/providers#set-up-a-provider). We’ll cover Vercel and Railway here, but of course check the docs if you want to use something else.

### Vercel Setup

If you want to use Vercel, we’ll need three new env vars.

First, head over to your account settings page, which you can access from the bottom left.

![The Vercel account menu opened from the bottom left of the dashboard, with the user's name and email at the top.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/vercel-account-settings.jpg?resize=592%2C848&quality=89&ssl=1)

Click that top section with your name and email, then click the tokens link in the left nav. Create your token, and add it into this env var:

`VERCEL_TOKEN="vcp_abc_xyz"`Code language: plaintext (plaintext)

Next, go to your Vercel team in the top left, then click on Settings, and grab your team ID.

![The Vercel team settings page showing the Team ID field.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/vercel-team-id.jpg?resize=714%2C484&quality=89&ssl=1)

Copy it into a new env var:

`VERCEL_TEAM_ID="team_xyz"`Code language: plaintext (plaintext)

Lastly, create the Vercel project you want to associate with this work, click Settings, and copy the project ID.

![The Vercel project settings page showing the Project ID field.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/vercel-project-id.jpg?resize=762%2C486&quality=89&ssl=1)

Then add it:

`VERCEL_PROJECT_ID="prj_kBL24CmynuMNcclr4k5s55lqg2xf"`Code language: plaintext (plaintext)

### Railway Setup

If you want to use Railway, you’ll need two values. First, for the environment ID, go to the project settings page and click **Environments**. It should look something like this:

![The Railway project settings page on the Environments tab, with the environmentId visible in the browser URL.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/railway-env.jpg?resize=2252%2C1368&quality=89&ssl=1)

It’s a little wonky, but look at the URL, and you should see something like this:

`?environmentId=abcd-efgh-ijkl`Code language: plaintext (plaintext)

Grab that `environmentId` and put it in a new env var:

`RAILWAY_ENVIRONMENT_ID="abcd-efgh-ijkl"`Code language: plaintext (plaintext)

Then, hit the tokens link on the same page in the left navigation list, create yourself a token, and, as always, add it as a new env var:

`RAILWAY_TOKEN="c0903fad-4336-4f0f-a0bf-3edc7abcfc51"`Code language: plaintext (plaintext)

## Creating Our Sandboxes

If you’ve read my prior posts on TanStack AI, almost everything is the same. Persistence, resumability with a memory stream, etc., are all the same. The main difference is that, rather than routing our request through something like Vercel’s AI Gateway, we’ll provide a sandbox where the `chat` function can execute our request. That sandbox will have access to Claude Code and GitHub (via the setup we did above). This allows it to clone our repo, do work, and open pull requests.

We’ll review Vercel and Railway sandboxes, then put them to work.

### Vercel Sandbox

Here’s my code for creating a Vercel sandbox:

``import { createSecrets, defineSandbox, defineWorkspace, githubRepo } from "@tanstack/ai-sandbox"; import { vercelSandbox } from "@tanstack/ai-sandbox-vercel";  export const sandboxVercel = defineSandbox({   id: "repo-agent",   provider: vercelSandbox({}),   workspace: defineWorkspace({     source: githubRepo({ repo: "arackaf/tanstack-ai-sandboxes-blog-post" }),     setup: [       "sudo npm install -g @anthropic-ai/claude-code",        "sudo dnf install -y 'dnf-command(config-manager)'",       "sudo dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo",       "sudo dnf install -y gh",        "npm install",     ],     secrets: createSecrets({       ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ?? "",       GH_TOKEN: process.env.GH_TOKEN ?? "",     }),     instructions:       "Accomplish the user's request and create a pull request. To publish work: run `gh auth setup-git` once, then `git push -u origin <branch>` and `gh pr create`. GH_TOKEN is already in the environment.",   }),   lifecycle: { reuse: "thread" }, });``Code language: TypeScript (typescript)

Vercel requires a few more setup steps than Railway because its default container doesn’t include the GitHub CLI or Claude Code, so we have to install them ourselves. Also note this line:

`lifecycle: { reuse: "thread" },`Code language: TypeScript (typescript)

This tells TanStack AI to reuse the same sandbox within the same `threadId` (on the same server instance), so follow-up prompts and clarifications should maintain context.

### Railway Sandbox

Railway is pretty similar, but with less setup, since their sandbox image comes with more batteries included.

``import { createSecrets, defineSandbox, defineWorkspace, githubRepo } from "@tanstack/ai-sandbox"; import { railwaySandbox } from "@tanstack/ai-sandbox-railway";  export const sandboxRailway = defineSandbox({   id: "repo-agent",   provider: railwaySandbox({}),   workspace: defineWorkspace({     source: githubRepo({       repo: "arackaf/tanstack-ai-sandboxes-blog-post",     }),     setup: ["npm install"],     secrets: createSecrets({       ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ?? "",       GH_TOKEN: process.env.GH_TOKEN ?? "",     }),     instructions:       "Accomplish the user's request and create a pull request. To publish work: run `gh auth setup-git` once, then `git push -u origin <branch>` and `gh pr create`. GH_TOKEN is already in the environment.",   }),   lifecycle: { reuse: "thread" }, });``Code language: TypeScript (typescript)

## Making Requests

With all that set up, everything else is the same. If you’ve read my prior posts on TanStack AI, you now have pretty much everything you need to run code inside of a sandbox, with access to your GitHub repository. Here’s what my call to `chat` in my API endpoint looks like:

`const stream = chat({   adapter: claudeCodeText("claude-opus-4-8"),   messages,   threadId,   runId,   middleware: [withPersistence(chatPersistence), withSandbox(sandboxVercel)], });`Code language: TypeScript (typescript)

The sandbox is simply a new middleware entry.

If you want to see the full code, the repo [is here](https://github.com/arackaf/tanstack-ai-sandboxes-blog-post).

## Putting It to Use

Let’s make a feature request on the Vercel route.

![The app's admin chat interface with a feature request typed in and sent to the Vercel sandbox route.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/vercel-prompt.jpg?resize=1134%2C1650&quality=89&ssl=1)

We can see the actual sandbox if we go to our Vercel dashboard:

![The Vercel dashboard listing a sandbox in the running state.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/vercel-sandbox-running.jpg?resize=2456%2C322&quality=89&ssl=1)

Eventually, our PR is created:

![A GitHub pull request list showing the new PR opened by Claude Code from the sandbox.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/vercel-pr.jpg?resize=2472%2C468&quality=89&ssl=1)

## Cleaning Up

You’ll probably want to clean up the resources you’ve created. Our sandbox object has a `destroy` method, and we’ll also want to remove the relevant rows from the persistence DB. Here’s what my Vercel cleanup looks like:

`import { createServerFn } from "@tanstack/react-start"; import { eq } from "drizzle-orm";  import { db } from "../drizzle/db"; import { chatRuns, chatThreads } from "../drizzle/schema"; import { sandboxVercel } from "#/lib/vercel-sandbox";  export const deleteVercelSession = createServerFn({ method: "POST" })   .validator((data: { threadId: string }) => data)   .handler(async ({ data }) => {     const { threadId } = data;     const runs = await db.select({ runId: chatRuns.runId }).from(chatRuns).where(eq(chatRuns.threadId, threadId));      try {       console.log("Deleting threadId " + threadId + " ...");       for (const run of runs) {         await sandboxVercel.destroy({ runId: run.runId, threadId });       }       await db.delete(chatRuns).where(eq(chatRuns.threadId, threadId));       await db.delete(chatThreads).where(eq(chatThreads.threadId, threadId));       console.log("Deleted");     } catch (error) {       console.log("error deleting vercel sandbox\n\n", error);       throw error;     }   });`Code language: TypeScript (typescript)

Railway is identical except, of course, we call `destroy` on `sandboxRailway`.

**Note:** As of this writing, the Vercel cleanup provided by `@tanstack/ai-sandbox-vercel` isn’t quite… effective. The sandbox is only stopped, not deleted, and any disk snapshots aren’t deleted either. Hopefully this will be fixed soon, but whip up a cleanup script using the Vercel API if you plan to use it.

Railway does not have this problem. That said, Railway doesn’t delete disk checkpoints, but you’re not charged for them.

## Wrapping Up

TanStack AI’s Sandbox API is a joy to use. It makes remote AI request execution a breeze. The flow, performance, and overall UX don’t quite compare to running Claude Code or Codex directly, but when you’re away from your laptop, it gets the job done well enough.