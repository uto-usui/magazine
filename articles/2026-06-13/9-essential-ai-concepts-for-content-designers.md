---
title: "9 essential AI concepts for content designers"
source: "https://uxcontent.com/essential-ai-concepts-for-content-designers/"
publishedDate: "2026-06-12"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Jeremy Hoover"
---

_![Alt text options depending on context: Concise: "Side-by-side comparison of the same meadow scene with a tree, wildflowers, and mountains: the left image is in sharp focus throughout, while the right is heavily blurred except for a small cluster of flowers in the centre.](https://uxcontent.com/wp-content/uploads/2026/06/Screenshot-2026-06-12-at-8.26.45-pm-1024x680.jpg)_

_Caption: Your LLM and its agents lose context in the middle of conversations and executing tasks, making a clear picture blurry._

When I’m teaching people how to use AI there are a few basics that consistently come up, regardless of the tool or approach they use.

I’ve found that by building a foundation and understanding how the core concepts work with today’s AI tools, especially [Large Language Models (LLMs)](https://developers.google.com/machine-learning/crash-course/llm), anyone can use them without being a software engineer or data scientist.

I don’t think that by understanding these basics you’ll vibe code an app that you can sell for millions, but you will be able to cut through the hype and navigate any tool, whether it’s Cursor, Claude, Windsurf, Copilot, or whatever comes next.

You probably come across these terms all the time, but here’s my take and how they can help you in your day-to-day work.

### **1\. Models**

Each model has different capabilities and advantages or disadvantages. It is worth trying out each of the “big” ones ([GPT by OpenAI](https://chatgpt.com/), [Claude by Anthropic](https://claude.com/), [Gemini by Google](https://gemini.google.com/)) and understanding from first-hand experience which you like best. This can include the extensions, UI, GPTs/agents, customization options, etc., but more importantly, understanding how each one consumes different amounts of tokens and uses context at different rates.

In other words, for different tasks you WILL want to use different models.  
  
There are plenty of great tools that allow you to try out different models. This means you can run the same tasks, workflows, agents, skills, etc., with different models, and evaluate them to determine which provides the best outputs for your needs, while balancing reasoning/token consumption with speed and completeness.

Models alone don’t make a night-and-day difference, but each one performs better at certain tasks or consumes more or less tokens. To me, they’re consistently producing similar outputs and it comes down to the task and how much time I want it to spend reasoning vs. executing.

I like to use Claude Sonnet 4.6 with medium reasoning for most tasks and then scale up or down to high or low if needed. WIth that said, I try each model as they come out and re-test my agents and skills against the established benchmarks.

In addition to the model, there are “modes” in many tools that are very useful. Each of these differ on the number of tokens that get consumed and context that is used, so I make sure to switch between modes like Agent, Ask, and Plan as needed.

It’s also easy to make custom modes for very specific, repetitive tasks, like organizing notes or turning a markdown file into an HTML file that’s designed and ready to share

### **2\. Tokens**

This is like the energy of your LLM. [Tokens are consumed](https://blogs.nvidia.com/blog/ai-tokens-explained/) when running tasks with an LLM. The number depends on the complexity of the task or prompt, and the model itself. In short, the most important thing to understand is that you only have a limited number of tokens that you can consume, and so they should be treated very valuably.

Currently many of the leading AI providers are cutting back on unlimited token packages and will start charging by the token, which makes this even more important to understand.

Things like “talk like a [caveman](https://github.com/juliusbrussee/caveman)” and other tricks exist to limit token use, and a good rule of thumb is that if you can do something with a command, or anything that is deterministic, it should be done in terminal, without using an LLM. I tend to think that tokens won’t be as expensive in the future and will be like text messages (remember when you used to pay a premium for just 100 messages per month?).

### **3\. Context**

LLMs have a foundational knowledge base but they don’t have access to all of it all the time. Additionally, any context that you provide, such as via MCP, API, local .md, etc., can only be consumed and remembered for a specific timeframe, aka “context window.”

Context is crucial to build for the LLM to be able to properly execute tasks. Without the right context it will make mistakes that make you smack your head on the table.

The most difficult part of context building is the window, and at some point it will inevitably run out. It will summarize/compact the conversation, and then essentially start a new one without explicitly telling you and being confident that “nothing” has changed.

I have found that creating and documenting a plan.md file that the LLM can consistently refer to when completing a task is crucial to overcome this, but as windows increase in size the need for constant reference to this plan wanes.

In the meantime, creating a very well-documented plan that is created with the LLM before ANY work is done is the crucial first step, and the biggest challenge is understanding when you are out of the window, and when it might be worth starting over with a fresh chat.

If you ever were in the middle of a conversation and the LLM started just sounding dumb for no good reason, this is why.

### **4\. Context window**

As soon as the context window is reached you are basically starting over from scratch or a very compacted version of the conversation had up until this point. In practice this means it suddenly happens in the middle of your conversation or task and it will suddenly forget specific details, being left with only a vague understanding.

Think of it like having a clear picture to refer to and describe back to you, but then suddenly the picture becomes blurry. But the LLM doesn’t know it’s blurry and thinks it’s the same clear picture from the beginning (see the image for this post for a visual representation of this).

This is the context window in the current LLM experience. It is awful and explains why conversations always degrade over time.

For autonomous agents especially, the only way around this is to execute tasks within short windows and document any long-term plans that will cover more than one task to execute.

There is no workaround besides this, and just figure out ways to consume less tokens and less context as you work and execute tasks.

One way to do this is to only use an LLM when necessary, which requires some basic developer knowledge. [Learn more about context windows](https://github.blog/changelog/2026-06-04-larger-context-windows-and-configurable-reasoning-levels-for-github-copilot/).

### **5\. Deterministic vs. probabilistic**

Something that is deterministic guarantees the same result each time. This is a basic concept of computing that we all need to understand and have at the front of our minds, even if we aren’t writing code. The “magic” of LLMs is that each time you give them an input, you get a different response. In other words, the outputs are probabilistic.

This has both positives and negatives that are impactful and relevant during every interaction. On one hand it’s great because it allows for some reasoning and instances where an error would be returned for an AI agent to instead seek a solution to move forward.

But on the other hand, it means that we can’t really control those outputs and can’t assume the outputs will ever be exactly the same.

For creators this is especially problematic because we can’t rely on an LLM to consistently generate content that follows our specific rules and instructions. And even if it does follow them, it will interpret them differently each time, and as a result the outputs will be different.

Instead, we need to engineer our LLM-integrated tools so that we can have the highest level of success based on our own [evaluations](https://uxcontent.com/ai-evaluation-workshop/) and criteria, which includes UX considerations like how clear and concise outputs are, what happens when something fails, what happens when an agent hands off between skills, etc.

Because these are probabilistic actions the UX and error-handling experience becomes even more important.

The way I think of this is that anything that can be engineered to be deterministic will continue to be, but now we have more opportunities to provide context when it was previously impossible.

This can be done via system prompts, agents, skills, MCPs and more. But in a sense we are always walking a fine line and need to be prepared for inconsistency and hallucinations.

### **6\. Prompts**  

Most of our initial interactions with LLMs have been putting a prompt (also called a query) into a chatbot and getting a response. This has spawned a speciality commonly referred to as prompt engineering.

This includes the most typical use case – referred to as zero-shot prompting – where no additional context is provided, but quickly evolved to include a wide range of prompting techniques, such as chain-of-thought prompting and few-shot prompting.

Approaches such as [CARE (context, ask, rules, and examples)](https://www.nngroup.com/articles/careful-prompts/), were quickly established and helped set a standard for how a single prompt should be created, but many also found that cramming everything into a single prompt was less effective.

As a result, the use of system prompts has increased drastically and became a common file-type content designers and others use to create reusable context files.

These files can include references, examples, templates, guardrails, and more, and they can be used when prompting or by agents when completing tasks. Naturally these system prompts have continued to evolve and are now key files when building agents, skills, MCPs and more.  
  
I have found that the more I use LLMs and learn to integrate traditional software engineering approaches into my work, the less I spend prompting and having “conversations” in a chat window.

Instead, I spend more time in a CLI, researching and documenting, and eventually building and letting my agents run autonomously to complete simple tasks like gathering information, making updates to my personal wiki, updating a design log, etc.

### **7\. Agents**

This was the big thing a few years ago but you might not hear about them quite as much now. This is because the flaws of agents became more apparent, but also because it has become fairly easy to create one without any technical knowledge.

Now most of the major LLMs offer custom agents and you have full agentic modes that can do tasks out of the box without any tooling.

Many of these agents can work with a few system prompts, but are much more effective when they are integrated with deterministic actions powered by APIs, scripts, automations, etc.

To get started with your first agent is as simple as creating a system prompt and ensuring it is called each time you ask a question. The next level will be to add some automations, and allow an agent to use system prompts and context files as references (when needed) while completing tasks.

This is when it goes from a system prompt to an agent. Generally when talking about agentic content design it can start with a simple set of system prompts that are guided by your style guide and rules, but should evolve into something that combines reasoning and deterministic actions to complete a variety of tasks on its own.

Agents are meant to be configured once and then set off to complete tasks, or to go into action when triggered in a larger workflow. They are great for completing deterministic tasks and using context to determine when to actually complete those tasks.

We have all been building agents for a few years now, but in order to get them to work well (and consistently) it involves lots of evaluations and testing and getting feedback from users.

Additionally, agents are only as good as the access to data/information, and tools and context that they have.

Whenever you approach building an agent, you first need to consider APIs, security, evaluations, skills, user needs (even if you or your team are the users), and much more before ever writing a line of code or markdown content.

### **8\. Skills**

More recently skills have been the hot new thing that everyone is racing to build. [Introduced by Anthropic](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf) in late 2024, a skill is more context for an LLM that is structured similar to a CLAUDE.md file, but for a very specific set of tasks or workflows.

For example, I have created a content-design agent that has a variety of skills for very specific tasks that I would want to do myself – such as content strategy or content writing – as well as tasks that I would want it to use when completing tasks, such as a guardian for my glossary, or voice and tone enforcer.

It’s very simple to create a skill, but difficult to build a skill that consistently works and can be utilized by someone else. Again, evaluations, sharing, and iterating are key here.

Additionally, a skill can and should include more than a single SKILL.md file. This can include reference for more in-depth content, scripts to run deterministic actions, as well as templates (or blueprints) and examples for outputs.

Ultimately I would frame skills as just a way to get more use out of your LLM when prompting or when you want to improve the consistency of outputs from an agent (regardless of how autonomous it is).

### **9\. MCPs**

I feel that in order to understand [Model Context Protocol (MCP) servers](https://modelcontextprotocol.io/docs/getting-started/intro), it’s first crucial to understand how [Application Programming Interfaces (APIs)](https://aws.amazon.com/what-is/api/) and [Command Line Interfaces (CLIs)](https://aws.amazon.com/what-is/cli/) work.

MCPs are essentially just a collection of APIs and exposed tools and resources that include context for an LLM. The problem with MCPs is that if you don’t know exactly which tool to call, it can be very costly and waste a lot of tokens and context to find and actually use the correct tools.

When creating MCPs, I have found that focusing on the tool name and description, as well as being clear about what is a tool vs. what is access to a resource, is crucial for the LLM to understand what to call, and when and how to use it.

And similarly, when using MCPs, if I can turn off irrelevant tools or specifically call the ones I need, I will see better, more consistent results that consume less tokens and waste less context.

MCPs should continue to get better and become more integrated with our workflows and we will continue to learn how to better leverage them and know when to use them, and how.

Similar to skills and agents, I would frame this as just another way to provide context for LLMs, and it is never going to be the final answer if you need to guarantee consistent outputs.

### **Conclusion**

The power of LLMs and how they are integrated into the products we work on will continue to change as they become more prevalent. Instead of trying to keep up with every new announcement, I think the way to be prepared for what’s next is to master the basics and foundational concepts. Then when use cases for utilizing LLMs come up naturally, you’ll be prepared to execute and build something that can continue to work over time.

I believe that we don’t need to become engineers to make an impact, and that these are some of the most important foundational concepts to understand. For me, this means focusing on small wins with AI and continuing to improve my UX and technical fluency, and trying out each new tool and integration myself, at my own pace.