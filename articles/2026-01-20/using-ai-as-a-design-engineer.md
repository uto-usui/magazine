---
title: "Using AI as a Design Engineer"
source: "https://jakub.kr/work/using-ai-as-a-design-engineer"
publishedDate: "2026-01-19"
category: "design"
feedName: "Sidebar"
---

### Table of Contents

-   [Using AI as a Design Engineer](#using-ai-as-a-design-engineer)
-   [Preface](#preface)
-   [Setup](#setup)
-   [Commands](#commands)
-   [Models](#models)
-   [Figma MCP](#figma-mcp)
-   [Agent Modes & Prompting](#agent-modes-prompting)
-   [MCPs](#mcps)
-   [CLI](#cli)
-   [Code Review](#code-review)
-   [Writing Less Code](#writing-less-code)
-   [Other](#other)
-   [Conclusion](#conclusion)

As a design engineer, a role that's all about craft, thoughtfulness and creativity, I should be skeptical of AI. By definition AI is not particularly great at those things, at least for now. But despite that, I kinda enjoy using it?

1 File

Review

Plan, @ for context, / for commands

Opus 4.5

When I work on something, whether it's at [Interfere](https://interfere.com/) or my personal projects, I like to experiment a lot. Design engineering is a lot about trial and error, and I often spend hours trying to find the "this feels right" moment.

This is where AI helps. Instead of spending hours on a concept that I'm unsure of, I try that concept out in a matter of minutes, and throw it away if it doesn't feel right.

There is an important distinction to make here though. I don't use AI to come up with ideas or to replace my own thinking. _I use it to accelerate my workflow._

Animate between the icon and the checkbox pls

Wrap both icons in a motion.div with a key that changes based on the state. Then wrap that motion.div in an Animate...

It's also very important to understand what the agent is doing. AI works best if the user is in charge and not the other way around. Don't just blindly follow whatever the agent gives you.

![prompt-example](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Fworkflow-example-2.avif&w=3840&q=75)

With that being said, here's how I use AI everyday as a design engineer.

Whether you are using [Claude Code](https://claude.com/product/claude-code), [Codex](https://openai.com/codex/), [Cursor](https://cursor.com/) or any other agent, one of the most important things is the setup. I personally use Cursor for most of my work, so I'll use that as an example.

The first thing I do when starting a project is create a set of rules for the codebase.

You already have a pretty good idea of how you want to do certain things. Whether it's about using `will-change`, using the `cn` utility instead of template literals, design system usage or something else.

I like to keep rules short and to the point, often referencing other files too. This is something that is recommended by Cursor in their [blog](https://cursor.com/blog/agent-best-practices).

Rules

animation-performance.mdc

react-compiler.mdc

cn-util.mdc

design-system.mdc

animation-rules.mdc

Copying someone else's rules and using them without understanding what they actually do isn't all that great. If you're going to copy rules I'd recommend trying understand what they actually do first.

Humans can remember a lot of context across many different conversations. When talking to AI we sometimes assume it thinks the same way, but it doesn't. That's why when I start a conversation with an agent, _I always assume it has no context_, and that tends to lead to the best results.

Accessibility\- Icon-only buttons need \`aria-label\`\- Form controls need \`<label>\` or \`aria-label\`\- Interactive elements need keyboard handlers (\`onKeyDown\`/\`onKeyUp\`)\- \`<button>\` for actions, \`<a>\`/<Link> for navigation (not \`<div onClick>\`)\- Images need \`alt\` (or \`alt=""\` if decorative)\- Decorative icons need \`aria-hidden="true"\`\- Async updates (toasts, validation) need \`aria-live="polite"\`

Depending on the project, I use different sets of rules. For this website, for example, I have a couple which are about animation performance, react compiler, using the `cn` util instead of template literals and the design system.

All of these save me a great amount of time, since I don't have to describe these things every time I talk to an agent and I can always reference them in my prompts.

In addition to my own rules, [ui-skills](https://www.ui-skills.com/) and [Vercel Web Interface Guidelines](https://x.com/JohnPhamous/status/2010777566085595357) are great too. [Motion](https://motion.dev/) also has a great set of rules that come with the [plus](https://motion.dev/plus) subscription and [TailwindCSS](https://tailwindcss.com/sponsor) also provides a set of rules when you become a sponsor.

In addition to rules, I also use a couple of commands. The first one is `/deslop`, which [Eric](https://x.com/ericzakariasson) from Cursor [shared on X](https://x.com/ericzakariasson/status/1995671800643297542). Depending on the codebase, I also create custom ones.

/ deslop

\# Remove AI code slopCheck the diff against main, and remove all AI generated slop introduced in this branch. This includes: - Extra comments that a human wouldn't add or is inconsistent with the rest of the file - Extra defensive checks or try/catch blocks that are abnormal for that area of the codebase (especially if called by trusted / validated codepaths) - Casts to any to get around type issues - Any other style that is inconsistent with the file Report at the end with only a 1-3 sentence summary of what you changed

For example, at [Interfere](https://interfere.com/) we have a custom `/review` command that compares the PR against specific rules that we follow in the codebase.

I'm not an expert on models by any means, but I've tried a bunch of them, and at the time of writing this article, I use [Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5) as my daily driver. It is pretty fast and for the majority of the things that I use it for, it does a great job.

When it comes to building UI, the [Figma MCP](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) has been a game changer for me. At [Interfere](https://interfere.com/) we're currently at a point where a lot of UI needs to be built.

I've always been hesitant to use AI for building out UI since I wanted to have full control over every little detail and I thought it would always take longer to build out UI with AI and then polish it, instead of doing it myself.

![Figma MCP](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Ffigma-mcp.avif&w=2048&q=75)

However, I tried it with Opus 4.5 for the first time a couple weeks ago and I was pleasantly surprised. If your rules are set up well, the output is surprisingly good.

Don't get me wrong, it's not perfect by any means, but building out the scaffolding for complex screens with a lot of components is way faster.

![prompt-example](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Ffigma-mcp-prompt-example.avif&w=3840&q=75)

You can see that the prompt I used is not very technical. This has generally worked pretty well for me when it comes to building out UI scaffolding, partially because the codebase rules are set up well.

Once the scaffolding is built, I start tweaking, polishing and animating.

I can't stress enough how important it is to actually understand what the agent is doing. If you don't understand, ask the agent to explain (Cursor's Ask mode is great for this).

Cursor also offers different modes. They are great, I use all of them, but the one I use the most outside of the Agent one is the Plan one.

If I work on a bigger feature, the difference between using the plan mode and not using it is pretty significant.

![prompt-example](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Fmodes-2.avif&w=3840&q=75)

Another thing that helps a lot is structuring prompts. Structuring your prompt into multiple smaller ones makes the output much better and is also way easier to follow.

Do this pls

Do this too pls

Oh and this too

I forgot this

And this doesn't work

Do task number 1

then

Do task number 2

Outside of the Figma MCP, there is only one more that I use on a daily basis and it is [context7](https://github.com/upstash/context7). It fetches the most up-to-date documentation for the libraries and frameworks I work with.

These can often be outdated in the LLM training data, so it's pretty useful.

In terms of using the CLI, I tried [Claude Code](https://claude.com/product/claude-code), [Codex](https://openai.com/codex/), [Cursor CLI](https://cursor.com/cli) and [OpenCode](https://opencode.ai/).

![prompt-example](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Fopencode.avif%3Fv%3D2&w=3840&q=75)

They are all pretty good, with [Claude Code](https://claude.com/product/claude-code) being my favorite. I mix and match between using an IDE and a CLI, but I've been using the CLI more and more lately.

I find CLIs to be much better at bigger tasks than IDEs or their web counterparts, so I mostly use them for that.

My code review setup is pretty basic. I have Codex set up to review any pull request I make. This way I also leverage my OpenAI subscription. I also use the [Vercel agent](https://vercel.com/docs/agent), but I mostly use it for bigger PRs.

![prompt-example](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Freview.avif&w=3840&q=75)

Not crucial by any means, but having another layer of code review is always nice.

Another part of my workflow where I leverage AI a lot is writing less code. Not in the sense that AI writes the code for me, therefore I write less code, but where less code is written to achieve the same thing.

![prompt-example](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Fless-code.avif&w=3840&q=75)

Sometimes you write the same code multiple times across the codebase and it's difficult to keep track of all of these duplications. AI is great at finding them and extracting them into shared components/utilities.

For example, last week I learnt that the icon set ([central icons](https://centralicons.com/)) that I use on this page has an [npm](https://www.npmjs.com/package/@central-icons-react/all) package. Up until now I've been defining icons manually, but now I wanted to migrate.

![prompt-example](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fai-workflow%2Fcentral-icons-package.avif&w=3840&q=75)

This is a pretty tedious task to do manually, because you have to replace imports, delete files and I didn't really have time to do it. I figured why not ask Claude to do it for me? It needed a bit of help here and there but it did pretty well.

Now my codebase has ~5000 less lines of code but the same functionality. These are the kind of tasks I like using AI for the most.

There are also other aspects, not strictly related to code, where I use AI. For example, all of the images in this component were generated by ChatGPT.

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FRiver-guvWDXsXm603mnNcSVE5utdb9htSIu.webp&w=2048&q=75)

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FBeach2-7Ju0JFtz96qCZiKcJ2pjqMr6t75ePt.webp&w=2048&q=75)

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FCity-NiSzH3I7jvF6uWSDgH6Ir6wXsC1JOD.webp&w=2048&q=75)

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FSnow-uIsjugzCxFMaqYgFY9csfkRKX8DqfD.webp&w=2048&q=75)

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FDesert2-SnMCtUDmKAIxfkFnfoLRh7s7lJFsPs.webp&w=2048&q=75)

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FFuji2-oUusgSaGjrc3pkdasZp2w3y2bnhiSV.webp&w=2048&q=75)

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FVolcano-uhgiBEcTnisoehyei3DRWuk4yAztgv.webp&w=2048&q=75)

![Image](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fimage-spotlight%2FRain-YEa7DVUUkQ6wAwctRA4Rz99XhcUzG4.webp&w=2048&q=75)

AI has changed the way I work on a day-to-day basis. On one hand it's fantastic, you can get things done faster than ever and you can experiment more than ever.

On the other hand, there is also more slop than ever. Handing-off everything you do to an agent and _outsourcing your thinking can hurt you in the long run_. That's why I always try to use AI to only accelerate bits and pieces that are tedious or time-consuming but never to replace my thinking.

With such a vast amount of knowledge at our fingertips and the barrier to entry being lower than ever, quality and craftsmanship will be more important than ever. Design and user-experience _will become the [product](https://x.com/lukeshiels/status/2009313575349977295)_.

Some of the things mentioned in the article are obvious to some, but hopefully helpful to others. I'm not an AI expert by any means, I just wanted to share my workflow.

If you have any tips or tricks, feel free to [shoot me an email](mailto:jakub@kbo.sk). I'd also recommend watching [this video](https://x.com/leerob/status/2011810357942084085) by [Lee Robinson](https://x.com/leerob) about a lot of the concepts outlined in this article.

Thanks to [Hana](https://www.linkedin.com/in/hanaholcikova/) and [Luke](https://x.com/lukeshiels) for proofreading and giving feedback on this article.

## More

In case you have any questions reach me at [jakub@kbo.sk](mailto:jakub@kbo.sk), see more of my work on [Twitter](https://x.com/jakubkrehel) or subscribe to my newsletter.

## Newsletter

I share stuff that I'm working on, new posts and resources here.