---
title: "The new UX Toolkit: data, context, and evals"
source: "https://uxdesign.cc/the-new-ux-toolkit-data-context-and-evals-9bd09fea466d"
publishedDate: "2026-02-12"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

## **_Designing how models behave._**

[

![Paz Perez](https://miro.medium.com/v2/resize:fill:64:64/1*N8wZM-QehnW-b0ScR2iPqw.png)



](https://medium.com/@perez.mpaz?source=post_page---byline--9bd09fea466d---------------------------------------)

7 min read

Feb 2, 2026

\--

We have entered a world where the experience is generated in the moment, and users react to it. The days when products rendered code that produced exactly what we designed are numbered. When someone uses an AI product, they are responding to behavior unfolding in real time, shaped by probabilistic systems rather than fixed screens. This marks a break from the era where designers could predict and control every outcome, and it forces UX to confront a new kind of material.

AI products are defined by non-deterministic behavior. The experience is something that unfolds on the fly, produced by AI models. What users see, read, hear, or are guided through is the result of systems making decisions on their behalf. Yet much of the current focus in UX and AI remains on production speed. Faster prototyping. Vibe coding. These practices matter, but they stop short of addressing the real shift AI introduces.

The real transformation of our craft lies in designing how the model behaves.

Engineering, and now Product, have moved upstream. They shape models, constrain outputs, define system behavior, and determine what is possible or impossible. UX often treats the model as a black box and designs around it. The result is AI products that may appear user-centered, but are often misaligned with the user intent and, at times, harmful.

### **How it works today**

In many organizations, engineering and product teams are already designing the core of the experience. Not through screens, but through system prompts, fine-tuning strategies, tool definitions, orchestration logic, and evaluation frameworks. They are using an AI product Flywheel, and iterating constantly. UX is often brought in downstream to make the output feel nicer, more on-brand. That is not where the real leverage is.

During a talk last summer, [Andrew Ng](https://www.andrewng.org/) argued that the real bottleneck is no longer engineering, but product. As AI accelerates code production, the hard part becomes deciding what to build. His advice was for PMs to talk to users, develop empathy, create mental models of the users they are serving.

UX was notably absent from this framing, which says a lot about how poorly our discipline has articulated its value. The proposal is for product management to take on a larger role relative to engineering, even changing the ratio. His example shifts from one PM to four engineers, to one PM to half an engineer. As this space opens up for product, it should open to designers as well, with comparable influence. After all, understanding users, framing problems, and deciding why we build things have always been core to UX.

Press enter or click to view image in full size

[_Andrew Ng_](https://youtu.be/RNJCfif1dPY?si=AQw-GonzEACloOCc)_: Building Faster with AI. Y Combinator._

### **A necessary mental shift for designers**

For designers, this is a new space to conquer; it requires a mental shift away from deterministic systems and toward behavioral design. This does not mean abandoning user-centered design, it means applying it where it matters most. Models are not magic, they are material that can be designed.

_“In the pre-software age the only thing designers had to worry about was how a product was built. But in the post-software era we have to think about how the products will behave. That’s a new paradigm and many people are still stuck in the pre-software era when it comes to design…” —_ [**_Ovetta Sampson_**](https://www.linkedin.com/in/ovettasampson/) **_and_** [**_Tim Brown_**](https://www.linkedin.com/in/timbrownatlindkedin/) **_(99U 2019)_**

For us to enter this space, we need to get educated. Not to become AI engineers, but to understand how behavior emerges from systems. That means asking about training data, shaping the context a model processes, and contributing to evaluation strategies that define what is acceptable and what is not.

Some companies are already ahead of the curve. They employ [Model Designers](https://uxdesign.cc/the-rise-of-the-model-designer-cef429d9c134) whose work focuses explicitly on shaping model behavior. This is a reality at companies like OpenAI, Google and [Figma](https://www.aidesignfieldguide.com/articles/barron-webster), but it should not be treated as an exception. Every organization building AI products needs this capability within its design practice, whether as a dedicated role or as a core skill embedded in existing design roles.

### **The new toolkit: Data, context, and evals**

When AI models [are the material](https://youtube.com/shorts/fSy3MNG0QIQ?si=rpXVTcKgAv24THyY), then data, context, and evals are the tools we need to shape it. Let’s get familiar with your new tools.

Press enter or click to view image in full size

AI Flywheel

**Data shapes what a model knows and what it predicts.** Pretraining data, fine-tuning data, and data generated during interaction shape what will be generated, and no data is created equally. Designers should be asking what kinds of behavior this data encourages, what perspectives it excludes, and also how it was acquired.

We are immersed in a world of large multimodal models, where much of the data has been scraped from the internet, often taken from authors without consent, and filled with biases and unfair patterns. As designers, we also must question whether this is the path we want to take, or whether smaller, more ethical models are the better choice.

**Context shapes what a model can consider in the moment.** This includes user input, environmental signals, retrieved knowledge, system prompts, safeguards, and instructions. The context window is where most of the experience is assembled. Writing system prompts, instructions, and constraints is design work. It is mostly done using plain, simple language with XLM markups, and of course AI can help designers with this process.

Lately, we have witnessed AI models generate adult content, sometimes involving minors, often without consent from the real people in the images. We have seen models suggest harmful acts during conversations, in some heartbreaking cases resulting in death. Choosing not to implement strong safeguards, or deciding not to block or redirect certain conversations, is also a design decision. With technology this powerful, designers must be truly intentional about defining what systems should not do.

**Evals determine what success means.** What is acceptable. What is unsafe. What must never happen. Deciding what to measure is deciding what matters. It is highly influential, and for most AI companies evaluations have become the moat. Without evals, we cannot know what is failing or how broken a system really is.

## Get Paz Perez’s stories in your inbox

Join Medium for free to get updates from this writer.

This becomes especially critical when working with large pre-trained models (such as GPT or Gemini). These models are continuously updated, and engineering teams will change them over time. How do you know whether a new version performs better for your product than the previous one. How can you recover quickly knowing that the user will be ok. This is where evaluations come in.

A good place to start is with frameworks. These are highly use-case dependent and often form part of a company’s secret sauce. One framework I find useful is RISK. Relevant, Inclusive, Safe, and Kind. We want to measure if and how often the output is relevant, whether it is a generated interface or a response.

Strong evaluation strategies also mix different types of evaluators:

**1/Human evaluations** involve manually reviewing outputs. They are necessary, but expensive and slow.

**2/Automated evaluators** complement human judgment.

-   Code-based evaluators are deterministic tools that apply explicit, predefined logic.
-   LLM as Judge evaluators use language models to assess quality along dimensions that are difficult to encode in traditional code.

Once we have evaluations in place, we can start to measure results and decide how to act on them to improve the product. This might include adding new data sets for fine-tuning, grounding responses by connecting to a knowledge base, revising context through system prompt changes, or even introducing antagonistic models. We work with data, context, and evaluations in a continuous AI flywheel of improvement.

Press enter or click to view image in full size

Let’s join engineering and product

### **Agentic design and systemic thinking**

Agentic design is not about a single model responding to a user. It is about ecosystems of specialized AI agents, each with its own instructions, memory, tools, and goals. They coordinate, hand off tasks, make decisions, and act over time.

Designing this requires systemic thinking. Designers must understand how agents work, how they delegate, how failures propagate, and how users control these workflows.

There are many definitions of agents today. But at their core, they are AI models and rely on the same design materials. Your new toolkit: Data, context, evals.

### **Final thoughts**

We might not need AI at all.

Before jumping into the hype, technology should not be the thing driving the solution. Many problems can and should be solved with simpler systems. When AI is truly needed, smaller or more specialized models are often better than massive multimodal ones for everyday goals. They are easier to shape, easier to evaluate, and less risky for users. If an organization chooses to build on large, popular multimodal models, then being a critical participant in shaping behavior becomes non-negotiable.

Engineering looks after the technology. Product looks after the business. The user, however, is alone without us.

This is where UX must step in. Designers need to move upstream, working alongside engineering and product to shape AI products end-to-end.

Go and learn your new tools.

_Note: If this resonates and you want to build these skills with your team, I offer the Model Designer workshop. It is a hands-on training for designers shaping AI behavior through data, context, and evaluations._ [_Available now._](https://www.nothingfancy.ai/#workshops)

Sources:

[AI Evals For Engineers & PMs](https://maven.com/parlance-labs/evals?promoCode=google-ads&utm_source=google&utm_medium=video&utm_campaign=23489291219&gad_source=1&gad_campaignid=23489291219&gbraid=0AAAAA_BlNfmeyjzZpPokar-f2TbcswODy&gclid=CjwKCAiAs4HMBhBJEiwACrfNZeYc3LBNOstL9BGqVwQJa6CCLJzI-rILCAMyapthniBV6dE5XAYZKRoCSHEQAvD_BwE) Maven

[AI Design Field Guide](https://www.aidesignfieldguide.com/)

[The New Code — Sean Grove, OpenAI](https://youtu.be/8rABwKRsec4?si=-YJkHdgny9AuhjTI)

[No Priors Ep. 128 | With Andrew Ng](https://youtu.be/SYisFbhR7xs?si=-s7RfH2fXJYodbQg)

[Model designer](https://medium.com/user-experience-design-1/the-rise-of-the-model-designer-cef429d9c134)