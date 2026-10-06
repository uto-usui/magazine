---
title: "The new basics: questions content designers should be able to answer in 2026"
source: "https://uxcontent.com/the-new-basics-questions-content-designers-should-be-able-to-answer-in-2026/"
publishedDate: "2026-10-02"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Patrick Stafford"
---

As the year heads into its final quarter (ack), it feels like a good time to take stock of where we are as an industry. 

This year’s Button conference was a good piece of inspiration. The case studies people share there are great examples of how increasingly complex and technical work is becoming just part of everyday content design jobs.

Our [recent AI survey supported this](https://uxcontent.com/ai-in-content-design-report): most content designers say their jobs are becoming more technical.

Now, the job of content has always involved more than writing interface copy. But the range of systems a content designer might need to understand is getting wider. You may be asked to shape an AI assistant’s behavior, define language rules for a component, or work on establishing content rules that apply across a range of different states.

One example I keep going back to is [Ademola Adepoju’s job ads analysis from earlier this year](https://ademolaadepoju.substack.com/p/what-do-companies-actually-want-from?utm_source=chatgpt.com). He pointed out that 87 out of 100 job ads requested systems thinking skills, 65 asked for technical skills, and 52 asked for AI skills.

LinkedIn isn’t real life (thank goodness) but there are a range of posts from people like Christopher Greer, Adedayo Agarau, Laura Costantino, Ayelet Kessel, Jody Allard, and others who share a wealth of information about their jobs and how they’re changing. 

All of these signals point in a clear direction: the “floor” for content skills is changing. 

So we thought we’d put together a key list in 4 key areas we believe content designers need to focus. Of course, this is on top of all the basic skills you’d expect for a UX writer, like the ability to understand how content works within components, strategy, etc. 

You don’t need to know everything in them, but can you explain how each one affects a decision you might face at work? If not, it might suggest there’s something for you to learn.

## **How models behave**

Content designers have always shaped how products communicate. We have to think about what information the product uses, what it does when information is missing, and how we know whether its answers are good enough. All that good stuff. 

Now, however, more roles demand basic abilities to guide how models behave.

You can see that shift in job ads. New roles describe working with prompts, training data, and the model itself. 

Say your team is building an assistant that answers questions about a financial product. Someone asks you to make its answers more reassuring. Then a user asks, “Am I guaranteed to qualify?”

The assistant needs to know the eligibility rules and whether it has enough information to apply them. It needs to avoid promising an outcome it can’t confirm. It may need to ask a follow-up question or direct the user to a person. A warmer tone won’t solve any of those problems.

If the answer is wrong, where would you look? The assistant may have received the wrong source material, failed to use the material it received, or followed an instruction that pushes it to answer when it should say it doesn’t know. 

This is all fairly simple stuff, but it isn’t easy. Understanding model behavior is about balancing a model itself, system instructions, and other data. It might even involve working with engineers to fine-tune a model for a specific purpose using purpose-built benchmarks. 

This is also where evaluation comes in. You could test the assistant with questions from eligible customers, ineligible customers, and people who leave out a crucial detail. You would check whether it gives the right next step without making an unsupported claim. You would also read the answers as a content designer: an answer can be technically correct and still leave someone confused.

Want to stay up to date? Ask yourself:

-   Do you know how an LLM produces text?
-   Do you know why different models produce different answers to the same prompt?
-   Do you know what a system prompt is?
-   Do you know what a context window is and what happens when it fills up?
-   Do you know the difference between a model, a product built on a model, and an agent?
-   Can you express voice and tone as instructions a model will follow?
-   Do you know what an eval is, and how to write them?

## **Building with AI**

Using AI to draft or edit your own work is useful. But a growing part of content design is building something that helps _other people_ work better: a tool, a set of reusable instructions, or a workflow that solves a recurring problem.

[Jody Allard recently described a content designer](https://jodyallard.substack.com/p/the-content-design-job-market-just) who had built two such tools while doing his regular product work. One helped product designers draft against his team’s voice, tone, and terminology standards before bringing the work to content design for review. The other tracked terminology decisions across Figma and the company’s chat tool.

We’re seeing this more and more. In our [AI Accelerator](https://uxcontent.com/content-design-ai-accelerator/) classes, we’ve seen several different content designers create tools for tracking and checking whether content is applying to specific styles and rules. [Christopher Greer’s work on Dante](https://www.linkedin.com/feed/update/urn:li:activity:7505959183268356096/) at Stripe is a good example of this.

Of course, merely building artifacts sits on a spectrum. It’s very easy to ask AI to build you something, but whether that “something” actually is robust, and works appropriately, is a different matter.

That’s the skill that matters more than just “building with AI.” You need to describe a problem clearly, give the tool reliable material to work from, test it against edge cases, and work out who will maintain it. A prototype that impresses people for a week is very, very different from a tool the team can depend on long-term.

Ask yourself:

-   Do you know the difference between using AI to do a task and building something that does the task for other people?
-   Do you know how to turn a task you repeat into reusable instructions a model can follow?
-   Do you know how to give a model reference material, like your style guide or terminology list, so it works from your standards?
-   Can you describe a problem clearly enough that a model can build a working solution?
-   Do you know what AI coding tools can build for you, and where you still need an engineer?
-   Do you know how to share what you’ve built so your team can use it?

## **How content gets into the product**

A lot of content work still happens in Figma, but Figma is really only one stop on the way to the product. It’s not the product itself. 

Now, yes, content designers will have varying levels of access to code repositories. But understanding where your content lives, how it’s managed, how it’s reviewed, and so on, can give you an enormous amount of power and influence that you didn’t previously have.

Just as Figma made it easier for UX writers to work directly in design rather than using copy docs, LLMs are making it easier for us to work in code. You can ask a tool to find where a message lives, explain how it’s used, and help propose a change. Yes, GitHub might sound and look pretty scary at first glance, but it actually unclocks a huge amount of power. 

The list of job ads we linked to earlier found that 57 of the 100 postings mentioned working with engineers. It does make one wonder how much better that work could be if we knew our way around a repo: [where product strings are stored](https://uxcontent.com/course-technical-foundations-for-content-designers/), what else uses them, and how a proposed change gets reviewed.

This leads to even more impactful conversations, like discussing whether your strings might be better suited to key-value pairs – which could unlock even more flexibility.

We don’t really have an excuse anymore. Understanding how repos work is now easier than ever, and LLM-based tools make it easier for content designers to own the content end-to-end. The question isn’t why would we learn this…given the amount of influence available, why wouldn’t we?

Ask yourself:

-   Do you know how your words travel from Figma into shipped code?
-   Do you know the difference between hardcoded text and key-value strings?
-   Do you know how variables and plurals work in a string?
-   Do you know what a repo is?
-   Do you know what a branch, a pull request and a code review are?

## **Structured content and systems**

We’ve been talking about systems thinking in content design for years. But what does it actually mean when the content itself has to work as part of a system?

Think about how often the same information appears across a product. A subscription plan might have a name, a price, a short description, a list of features, and eligibility rules. Those details could show up on a comparison page, at checkout, in an email, and in an answer from a support assistant.

This work is showing up quite explicitly. Earlier this year Netflix published a job ad that asked for someone who can connect language standards to things like a JSON schema, metadata pipeline, or product component. That’s a specialist role, of course. But the underlying question applies to plenty of less specialized jobs: how do you make a content decision hold up when dozens of people and systems use it?

It can be hard to describe what “systems thinking” actually means, but essentially it’s just about understanding how content is stored and moves across a product. 

And AI makes those decisions more pressing. If an assistant draws on your product information, will it find the current eligibility rules? Can it tell an approved fact from an old piece of marketing copy? Giving it access to more content won’t help much if that content contradicts itself.

So when someone asks you to “think in systems,” ask where the information comes from, how it’s structured, who owns it, and how a change makes its way through the product.

Ask yourself:

-   Can you break content into patterns and parts, like a title, summary and body, that different screens can reuse?
-   Can you read a JSON file or a schema?
-   Do you know how a design system component sets rules for its text, like length limits and required fields?
-   Do you know what design tokens are, and how terminology can be stored as data?
-   Do you know what a taxonomy and metadata do in a product?
-   Do you know how conditional or personalized content is built with logic?

## **Where to start**

Looking at this list, you might feel like you need to learn five new disciplines at once. You don’t. Start with the part of your job where you keep running into a wall.

Pick a single problem, and see it through to the end. Ask where the information comes from, how the product uses it, and who can change it. When you reach a point you can’t explain, you know where to start!

## Check your skills against the new basics

Answer yes or no to each question. Answer yes if you could explain it to a colleague today. When you’re done, open your skills report to get a practice exercise.

### How models behave

7 questions

### Building with AI

6 questions

### How content gets into the product

5 questions

### Structured content and systems

6 questions

### Tools, connections, and automated checks

3 questions

Get my skills reportHide my report

Start again

This clears all your answers.

## Your skills report

Answer at least one question above and your report will appear here.

Each no comes with a practice exercise below.

You answered yes to every question. There’s nothing on your practice list.

How models behave yes

Building with AI yes

How content gets into the product yes

Structured content and systems yes

Tools, connections, and automated checks yes

-   How LLMs produce text
    
    Read Hugging Face’s [How do Transformers work? (opens in a new tab)](https://huggingface.co/learn/llm-course/chapter1/4), focusing on the overview rather than the code. Explain how a model uses context to generate text, and why it can produce a convincing but incorrect product claim.
    
-   Why models give different answers
    
    Give Claude, ChatGPT, and Gemini the same product brief and ask for a cancellation message. Compare accuracy, tone, and next steps. Note which differences would matter if you shipped the copy.
    
-   System prompts
    
    Write system instructions in [Google AI Studio (opens in a new tab)](https://aistudio.google.com/) for a subscription support assistant. Define its tone, limits, and handling of missing information. Test five questions with and without the instructions.
    
-   Context windows
    
    Read Anthropic’s [context window guide (opens in a new tab)](https://docs.anthropic.com/en/docs/build-with-claude/context-windows). Then review a draft in Claude or ChatGPT using a short product brief and style guide. Identify which context the task needs and what you could remove without losing useful guidance.
    
-   Models, products, and agents
    
    Read Anthropic’s [Building effective agents (opens in a new tab)](https://www.anthropic.com/research/building-effective-agents). Map a subscription cancellation assistant: distinguish generating an explanation, retrieving account details, and taking an action. Identify where users need a confirmation or recovery message.
    
-   Voice and tone as model instructions
    
    Create a Claude Skill or custom GPT, where available, using three rules: explain the next step, avoid blaming the user, and avoid humor when something goes wrong. Test onboarding, a payment failure, and account closure. Check where the rules need more context.
    

You already know

-   How LLMs produce text
-   Why models give different answers
-   System prompts
-   Context windows
-   Models, products, and agents
-   Voice and tone as model instructions
-   Evals

-   Using AI versus building with it
    
    Read [Jody Allard’s account (opens in a new tab)](https://jodyallard.substack.com/p/the-content-design-job-market-just) of a candidate’s internal tools. Pick a repeated content task and sketch a reusable version: what colleagues provide, what they receive, and when they need your review.
    
-   Reusable instructions
    
    Create a Claude Skill or custom GPT, where available, that reviews error messages against your guidelines. Test three messages, including one with no clear recovery action. Check whether it asks for missing context before suggesting copy.
    
-   Reference material for models
    
    Create a ChatGPT Project or Claude Project and add a terminology list with definitions, preferred terms, and exceptions. Review copy containing incorrect terms and valid exceptions. Compare the findings with a fresh chat that doesn’t have your list.
    
-   Briefing a model to build a tool
    
    Use Claude Artifacts or [Google AI Studio (opens in a new tab)](https://aistudio.google.com/)’s Build mode to make a button-label checker. Specify the inputs, component rules, and feedback. Test labels that pass, fail, or need more context, then refine the brief where the tool makes wrong assumptions.
    
-   Where AI coding tools stop
    
    Build a character counter with Claude Code or Replit that checks copy against component limits. Test long variables and translated text. Ask an engineer what else it would need before the team could rely on it.
    
-   Sharing what you’ve built
    
    Share your Claude artifact with a colleague and provide a short README explaining its purpose, inputs, and limits. Ask them to use it without your help. Improve the instructions wherever they misunderstand the results.
    

You already know

-   Using AI versus building with it
-   Reusable instructions
-   Reference material for models
-   Briefing a model to build a tool
-   Where AI coding tools stop
-   Sharing what you’ve built

-   How words travel from Figma to code
    
    Choose one message in your product and ask an engineer to trace it from Figma to its implemented source. Record where it lives, which screens use it, and how an approved wording change reaches users.
    
-   Hardcoded text and key-value strings
    
    Ask ChatGPT, Claude, or Gemini to show the same confirmation message embedded directly in a simple component and stored separately as a key-value string. Compare the examples and ask an engineer how your product handles its text.
    
-   Variables and plurals in strings
    
    In Google Sheets, write a shopping-cart message for zero, one, and five items. Mark where the product inserts the number and where the wording changes—for example, “1 item” versus “5 items.” Ask ChatGPT, Claude, or Gemini to explain how a product chooses which version to show.
    
-   Repos
    
    Read GitHub’s [Hello World guide (opens in a new tab)](https://docs.github.com/en/get-started/start-your-journey/hello-world). Create a practice repo containing a README and a small file of onboarding messages. Identify where the content lives and how GitHub records a wording change.
    

You already know

-   How words travel from Figma to code
-   Hardcoded text and key-value strings
-   Variables and plurals in strings
-   Repos
-   Branches, pull requests, and code review

-   Content patterns and reusable parts
    
    In Google Sheets, model a subscription plan with fields for name, price, features, and eligibility. Map those fields to checkout, a comparison page, and a support answer. Mark which facts stay consistent and which wording needs to change.
    

-   Design tokens and terminology as data
    
    Follow Figma’s [Build your design system (opens in a new tab)](https://help.figma.com/hc/en-us/articles/14552901442839) lesson to create a button, alert, and form field. Add shared styles and text properties, and explore variables for approved labels. Change a shared value and inspect which instances update.
    

You already know

-   Content patterns and reusable parts
-   JSON and schemas
-   Component content rules
-   Design tokens and terminology as data
-   Taxonomy and metadata
-   Conditional content

-   Markdown
    
    Use the Markdown Guide’s [basic syntax reference (opens in a new tab)](https://www.markdownguide.org/basic-syntax/) to turn a page of content guidance into a .md file. Add headings, examples, lists, and links. Preview it and check whether the hierarchy makes the rules easy to find.
    
-   APIs
    
    Follow Postman’s [quick-start guide (opens in a new tab)](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/) to send a request using its practice API. Include sample content data such as a preferred term and definition. Inspect the response and sketch how another tool could use that information in a content review.
    
-   Automated style checks
    
    Create a Claude Skill or custom GPT, where available, that checks copy against three rules from Google’s [word list (opens in a new tab)](https://developers.google.com/style/word-list). Test deliberate violations and valid exceptions. Check whether its feedback explains the rule and avoids changing approved product names.
    

You already know

-   Markdown
-   APIs
-   Automated style checks

Change any answer above and this report updates.