---
title: "How I Rewrote a Client's ESLint Config With a Single AI Command"
source: "https://www.bitovi.com/blog/how-i-rewrote-a-clients-esling-config-with-a-single-ai-command"
publishedDate: "2025-08-16"
category: "frontend"
feedName: "Bitovi"
author: "knazario@bitovi.com (Kyle Nazario)"
---

I recently refactored some code for a Bitovi client, [Strategic Wealth Preservation](https://swpcayman.com/). We used [GitHub Copilot](https://github.com/copilot) [Agent mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode) with [Claude Sonnet 4](https://www.anthropic.com/news/claude-4) to adjust the code formatting and linting rules for SWP's codebase.

SWP uses a monorepo for several of their internal projects, as well their [public-facing website](https://swpcayman.com/). These projects each have their own [Prettier](https://prettier.io/) config. Only the public-facing website project had an [ESLint](https://eslint.org/) config. They wanted one shared config for both Prettier and Eslint.

I could have done this myself, but I wanted to take the opportunity to experiment with AI agents to see what they can and can't do. After some experimentation, I figured out a way to have my Copilot agent implement new features with a single command.

[![Vector](https://no-cache.hubspot.com/cta/default/2171535/interactive-194572368051.png)](https://www.bitovi.com/hs/cta/wi/redirect?encryptedPayload=AVxigLL9qQRn4DWXS%2FdPueGZRRIbrbsOLxedaMONZ1n5x7JD1%2FtQYUi771n93uYXhu9M4EFMa5GTmLlFR7fWaBPSL22XC%2FWY804XGFkSnsyiY6aPHMX%2Bb0%2F23eZDfjsWr0y%2FWdRdnjnu12eInFhjbR%2BvYDO9xgVwDEI2puBXlB8mzV05YFes8hKlfq2j4EGvtejuLQ%3D%3D&webInteractiveContentId=194572368051&portalId=2171535)

### Step 1: Write out the whole process

I experimented with Copilot by having it refactor the client’s Prettier configs, one step at a time. I would write a command to the agent, check the results, and do it again. This allowed me to check Copilot's work, but it also felt slow. For the second part of this project, I wrote out all the steps Copilot would need to perform to create one `.eslint.json` file for the whole monorepo. This [prompt chain](https://www.promptingguide.ai/techniques/prompt_chaining) was based on Bitovi's [prompt chain to load a JIRA ticket and fully implement it in code](https://github.com/bitovi/ai-enablement-prompts/blob/main/writing-code/generate-feature/generate-feature.md).

Although I had to fine-tune my prompt (see the next section), I appreciated the speed of performing all the steps at once. It was easier to just check Copilot's work at the end of the process using `git diff`.

### Tip 2: Label the steps of your prompt chain explicitly

When I first ran [my prompt chain](https://justpaste.it/gwk7z), I noticed Copilot performed the steps out of order, even though I'd written in the style of "First do this, then do this, then this."

Large language models are strange and require explicit instructions to perform steps in order. I found Copilot would follow my prompt chain correctly only with this at the top:

```
You are a senior software engineer implementing code change to help your team. Please closely follow these instructions. Do not deviate from them. Follow them in exactly this order. Do not move on to the next step until the current one is finished.

Step 1: Analyze this project for eslint config files...
```

(I don't believe the “You are a senior software engineer” bit actually mattered for this workflow.)

Once the model was told to follow the steps in order, and the steps were numbered, it performed them correctly.

### Tip 3: The command line is kind of MCP

[Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro), or MCP, is a red-hot frontier of AI development. MCP servers are essentially APIs so AIs can call, well, regular APIs. For example, [GitHub's MCP server](https://github.com/github/github-mcp-server) includes tools for AIs to create branches, open pull requests, monitor Action runs, and anything else you might like to automate.

MCP servers can be powerful - Bitovi's Mike Dane used them to have [Copilot complete his Jira ticket in two minutes](https://www.bitovi.com/ai-enablement-blog/how-github-copilot-completed-my-jira-ticket-in-2-minutes). But, you don't have to dive into that pool if you don't need those features yet. You can simply have Copilot access your command line and run commands.

For example, the last step of my prompt chain implementing a shared ESLint config was to commit the changes and push them to a remote branch. But for basic tasks, Copilot can simply run CLI commands like:

```
git commit -m "Add shared ESLint config"
git push origin branch-name
```

This approach has some limitations. To return to Dane's example, it could not load a Jira ticket, or open a pull request. But, it can automate a lot of basic operations.

The final prompt, which correctly refactored the ESLint configs in one go, looked like:

```
You are a senior software engineer implementing code change to help your team. Please closely follow these instructions. Do not deviate from them. Follow them in exactly this order. Do not move on to the next step until the current one is finished.
 
Step 1: Analyze this project for eslint config files, and compare their similarities and differences. Create a new eslint config file in the root of the project that is as close to the existing configs as possible.
 
Step 2: Delete all previous eslint config files. Do not make any changes to any package.json files.
 
Step 3: Commit all changes with the message “Shared eslint config”.
 
Step 4: Add Eslint to the root package.json and remove it from the other package.json files. The version of eslint added to the root of the project should be compatible with the version of NextJS installed in the packages/pfw folder. 
 
Step 5: Run npm install in the root and in packages/pfw.
 
Step 6: Commit all changes with the message “Moves eslint to root”.
 
Step 7: Create NPM scripts in the root package.json for linting and fixing lint errors. Remove any lint scripts from package.json files in sub-projects.
 
Step 8: Commit all changes with the message “Shared lint scripts.”
 
Step 9: Run the lint script in the root package.json. Note any errors and pause if it fails.
 
Step 10: Push the changes to the eslint-ai branch on the origin remote. Use the upstream flag.
```

## Conclusion

Refactoring SWP's code with AI was fascinating. The potential of AI agents is obvious. But, writing prompts for them seems like its own skill, and one I personally will keep working on. Who knew you had to tell the AI to go in order?

If you want help using AI to win back time from manual tasks, reach out to our [AI Consulting](https://www.bitovi.com/services/ai-consulting) team.