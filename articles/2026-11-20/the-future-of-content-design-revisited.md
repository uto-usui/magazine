---
title: "The future of content design, revisited"
source: "https://uxcontent.com/the-future-of-content-design-revisited/"
publishedDate: "2026-11-19"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Patrick Stafford"
---

Back in April 2024, which seems like an eternity ago, I wrote a post with a terrible title called [Content Design 3.0](https://uxcontent.com/content-design-3-0-roadmap-ux-content/). It was basically a manifesto (rambling) about my thoughts on the content design industry, how it was beginning to change, mostly influenced by AI, and what I thought would come next.

I’ve been thinking about that post a lot lately. Partly because I’ve referenced it in a bunch of talks this year, and partly because so much has happened since then that I wanted to know whether it actually held up.

Like all “predictions” there are some things that are right, and some things that are wrong. I’m far less interested in keeping score and being correct than I am in the actual, tangible reality for content design careers.

So let’s review. Here were the five principles:

1.  Dynamic systems over static deliverables
2.  Democratized content creation
3.  Development of era-defining technology
4.  Content as general design leadership
5.  Increased specialization

Let’s dive in.

## #1. Dynamic systems over static deliverables

### **What I wrote:**

> “We’re moving to an environment where we focus less on the individual output of what we create and more about the parameters to shape those outputs.”
> 
> “Previously output was defined by the extent of our ability to write. Now, our output is defined by our ability to create quality instructions for models to write on our behalf.”
> 
> “This opens up new possibilities, like extreme personalization. A future scenario where UI strings are no longer individually created but dynamically generated then poses a question: who guides the dynamic creation of UI content at scale?”

### **What’s happening now:**

I was half right about this. The extreme personalization of the user interface is still something that hasn’t happened and I doubt it will, but content being scalable? Output being defined by the parameters we create more than the individual strings themselves? This is absolutely the trajectory of the content design industry.

It was only a few months after the Content Design 3.0 post that Ron Yakar at Monday.com [posted about his content design automation](https://www.writersofsiliconvalley.com/episodes/ai-scale-ux-writing-monday) built through Frontitude. Over the past two years, we’ve seen countless more stories of content designers using AI to create systems and structures for content at scale, to the point where this has basically become a requirement for any content design role.

-   In early 2026, Christopher Greer from Stripe published his [UX Writing skill](https://content-designer.github.io/ux-writing-skill/), and recently helped build voice and tone rules into the company’s AI design assistant, Dante.
-   In 2025, Nicole LeBlanc from Zillow wrote about how her content design team [built AI tooling for designers and developers](https://www.nicoleleblanc.design/casestudies/content-design-hub)
-   Giovanni Ella pitched a content architect role at Clover for five months before it existed, and he’s written a [whole series for us](https://uxcontent.com/from-content-designer-to-content-architect/) about building it out with voice models, decision trees, prompt systems, rubrics, and so on.
-   Jeremy Hoover from Microsoft put his entire [content system up on GitHub](https://github.com/jeremydhoover-blip/hoover-content-system), and then built a [repo to teach other content designers](https://uxcontent.com/technical-content-design/) how to work in that kind of environment (AGENTS.md files, CLAUDE.md files, skills, the works).
-   The team at Miro have created an AI system to [manage content design and localization.](https://miro.com/ai/ai-for-localization-content-design-and-accessibility/)
-   Sarah Mohs and Eva Ratcliffe turned their content standards into Claude skills, then into a [plugin that sits in Intuit’s internal skill directory](https://uxcontent.com/claude-skills-for-content-design-inside-intuits-ai-build/). Anyone who installs it gets the rules, and updates get pushed automatically.

Not only that, but more job ads now mention using AI to govern content at scale. Earlier this year Netflix advertised for a [Staff Systems Designer, Language](https://www.linkedin.com/jobs/view/4440417544/), whose job was basically to turn voice and tone into rules machines can read. Adobe advertised for a [Content Systems Architect](https://www.linkedin.com/jobs/view/4446439797/).

Our [survey earlier this year](https://uxcontent.com/ai-in-content-design-report/) found 77% of content designers say their scope is growing, and more of that work is moving into systems and governance.

In hindsight, my prediction did overcomplicate things a bit. I mentioned knowledge graphs, which are definitely still a big focus, but overall the real change has been in how content designers are now expected to use AI to govern at scale.

## #2. Democratized content

### **What I wrote:**

> “The designer doesn’t need to ‘think’ about creating the content. It simply happens during the design process. In many ways, principle 2 is the reason why principle 1 is important: content creation is becoming democratized, ergo we need guidelines to ensure quality at scale.”

### **What’s happening now:**

The second principle was about everyone becoming a writer. I said generative tools would make the “rogue content” problem way worse, and that content designers who held on to the idea that we’re the only ones who write would struggle.

Product designers, PMs, and engineers write a huge amount of product content, a lot of it through AI tools. Figma has AI rewriting built in. Vibe coding tools spit out copy along with the code. Sarah Mohs and her team at Intuit [did some research](https://uxcontent.com/claude-skills-for-content-design-inside-intuits-ai-build/) and found designers were prompting 30 to 50 times to build a single workflow, and only thinking about the content right at the end.

As a result, content designers are building tools to get their standards into the places where content actually gets made. I mentioned a bunch in the first section, but here are some more:

-   **Coinbase.** Hunter Gebron built a content design agent that 40+ product designers were using every day, powered by a 30-page system prompt. When he [tried to bring it into Figma](https://uxcontent.com/what-vibe-coding-a-figma-plugin-taught-me-about-content-design/) as a plugin, he ended up rebuilding it as 17 skill files.
-   **Wix.** Ayelet Kessel [built a set of tools](https://uxcontent.com/ai-content-design-tool/) that won’t review a single string at all. You have to send the whole screen, because so often the problem is a missing button or a tooltip that should’ve been a subtitle.
-   **PayPal.** Michelle Savage has [led her team through similar work](https://uxcontent.com/ai-turned-lights-on-your-content/) at a pretty big scale.
-   **Roblox.** Jody Allard [built one in her first month](https://jodyallard.substack.com/p/one-month-at-roblox), which is pretty impressive.
-   **BILL.** Going back to 2025, Giovanni wrote about [rolling out Writer](https://uxcontent.com/governance-ai-content-strategy/) to govern content across the company.

One thing I didn’t really see coming, though, was how easy it would be for content designers to build these types of tools on their own. As tools like Claude Code have gotten better, it’s become much, much easier for anyone to make a tool like this.

Jody Allard at Roblox even [told me on my Writers of Silicon Valley podcast](https://www.writersofsiliconvalley.com/episodes/jody-allard-content-designer) that she expects content designers to have built something with AI when interviewing, a big change from a year ago.

Of course, building something is one thing, and building something people can trust is another.

Hunter Gebron is a good example. His coding tool told him his agent was connected to Figma, but it wasn’t, and he only found out because he’s naturally skeptical and wrote some evals to check. Eva Ratcliffe also wrote [a great piece](https://uxcontent.com/how-we-stopped-outsourcing-decision-making-to-ai/) about the moment she and Sarah found a line in one of their skills that neither of them could explain. So they had to go back and look through every single rule one-by-one.

Anyone can build a tool now that appears to work on the surface, but do you know it works? How? Can you [demonstrate the evaluation process](https://uxcontent.com/ai-evaluation-content-design/) on edge cases? Those are becoming the biggest differentiators.

## #3. Era-defining technology

### **What I wrote:**

> “We are also witnessing content designers move from traditional ‘content design’ roles to ‘AI model design’ roles. These are very much still content roles but are slightly changing their focus. It isn’t just for people at larger organizations. Any generative AI experience needs content parameters and someone to identify ‘good’ or ‘bad’ answers.”

### **What’s happening now:**

I wasn’t sure “model design” would ever be an actual title. But here we are.

OpenAI’s Model Behavior team now hires [Model Designers](https://www.choppingblock.ai/jobs/model-designer-at-openai), who work with researchers to understand and shape how the models behave. Google DeepMind hires [Model UX Content Designers](https://job-boards.greenhouse.io/deepmind/jobs/7649725) for Gemini to write response strategies, system instructions, rubrics, and evaluation methods. Anthropic has [Model Behavior Architects](https://jobs.therundown.ai/jobs/110420856/apply).

And a lot of the content design roles at these companies now list prompt engineering and evaluation as core skills. We’ve even started seeing content designers move into model design positions (do a quick search on LinkedIn – so many model designers have content design backgrounds.) So what does that actually mean for the rest of us?

Well, what are these roles asking for? Response strategies. Guidelines. Rubrics. Figuring out what a good answer looks like. That’s content strategy! The work underneath is stuff content designers have been doing for years.

Michelle Savage [put this really well](https://uxcontent.com/nobody-will-care-that-you-used-ai-but-theyll-care-if-your-writing-sucks/) in a recent post: you can’t write every response, because there are millions of them, but you can define what good behavior looks like.

If your company ships any kind of assistant, someone has to decide what it does when it doesn’t know the answer, when it should hand off to a person, and how to tell the difference between an answer that’s technically correct and one that’s actually useful. Alice Chen and the team at Indeed, for example, built [rubrics, golden datasets, and LLM-as-a-judge systems](https://uxcontent.com/ai-evaluation-content-design/) for their AI features.

I still don’t think every content designer needs to understand the depths of transformer architecture and Python. But given most of the model design work is in prompts, instructions, rubrics, evals, and datasets, that matters a lot. So it depends on where you want to end up.

## #4. Design leadership

### **What I wrote:**

> “I believe Content Design 3.0 will see — and has already seen — more content leaders adopt generalized UX leadership positions.”

### **What’s happening now:**

I definitely was wrong about this. However, what is true is that more content designers are being asked to demonstrate leadership qualities inside their current roles.

You can see it in the job ads. When we rebuilt our Fundamentals course this year, we went back and [compared nine UX writing job ads from 2018](https://uxcontent.com/weve-rebuilt-our-fundamentals-of-ux-writing-course/) against [Ademola Adepoju’s dataset](https://ademolaadepoju.substack.com/p/what-do-companies-actually-want-from) of 100 job ads from 2026. Not one of the 2018 ads mentioned a design tool. Accessibility went from showing up in one ad to 59 out of 100. Measurement went from rare to pretty much expected. And Ademola found systems thinking in 87 of his 100 ads.

When all the content designers mentioned in this post have to get their plugins, skills, and tools taken up by design teams across entire organizations, they need to use some pretty serious collaboration skills. Giovanni Ella [got all four members of Clover’s design leadership team](https://uxcontent.com/scaling-ai-content-tooling-from-1-designer-to-32/) to build content checks into their definition of done. The Intuit team reached every PM and engineer through a company-wide skill directory.

That’s influence! The thing we’ve always wanted!

## #5. Specialization

### **What I wrote:**

> “Ever since the retraction in the hiring during COVID, there has now been a distinct focus on growth and proving impact. And while this may just be a temporary shift, I actually think it’s a signifier of something slightly more permanent, which is that over time, we are going to see fewer generalist content design roles and more content design roles that are attached to specific functions.”

### **What’s happening now:**

I was pretty wrong about this.

The specialist roles definitely exist: content architects, language systems designers, model designers, developer experience content strategists, support content engineers. But for most content designers, the job has gotten wider. Most people are doing the old job, plus systems work, plus AI work, plus technical work…and anything else.

## What I didn’t see coming

Of course, with any prediction there are things that you don’t see coming. Here are some of mine:

**Content designers as builders.** I don’t know what I imagined originally, but I didn’t see content designers building their own tools as much as they have. In our [AI in Content Design survey](https://uxcontent.com/ai-in-content-design-report/) this year, 73% of respondents told us they work at organizations building content-related AI tools. This is probably the biggest trend of 2026.

**Evaluation.** It was important in 2024, but it’s now one of the most valuable things a content designer can do, and even content designers who aren’t participating in the structure of LLMs themselves are having to do a lot of evaluation work.

**Documentation.** Content designers are now having to become much more literal and specific about how they instruct AI to speak. For many this is new, and difficult. Good writers often internalize their taste, and describing literal rules and patterns can be challenging.

**Speed.** Engineering has sped up a lot, and the expectation that content keeps up came right along with it. AI now allows you to audit and change content directly in code, so access is no longer an excuse for a lot of content designers. Engineers and developers are using AI for nearly everything now, and content needs to keep up that pace while also maintaining quality.

## Some things stay the same

I’m not going to make another bunch of predictions for the next few years. Who knows what’s going to happen.

But one thing that hasn’t changed: every example in this post relies on someone who knows what good content looks like. Giovanni’s Gem, Intuit’s plugin, Hunter’s agent, the rubrics at the AI labs: they’re all fundamentals that someone wrote down and handed to a machine. If those fundamentals are weak, the tools just spread the problem faster.