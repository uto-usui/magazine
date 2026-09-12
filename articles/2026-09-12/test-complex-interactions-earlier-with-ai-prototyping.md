---
title: "Test Complex Interactions Earlier with AI Prototyping"
source: "https://www.nngroup.com/articles/test-earlier-with-ai/"
publishedDate: "2026-09-11"
category: "design"
feedName: "Nielsen Norman Group"
author: "Megan Chan"
---

Summary:  AI tools make it feasible to build fully interactive prototypes of complex interfaces so you can test them with users earlier in the design process.

Complex interfaces like [filters](https://www.nngroup.com/articles/filter-categories-values/), [](https://www.nngroup.com/articles/dashboards-preattentive/)[dashboards](https://www.nngroup.com/articles/dashboards-preattentive/), and [](https://www.nngroup.com/articles/ai-chatbots-design-guidelines/)[conversational AI](https://www.nngroup.com/articles/ai-chatbots-design-guidelines/) have many possible states and can be tedious to prototype by hand. Before AI tools were available, most teams would test a simple prototype that covered only a few happy paths and wait until developers built the product to see how users interacted with it. With AI tools, teams can now build realistic prototypes and test them before deployment.

For less [](https://www.nngroup.com/articles/complex-application-design-framework/)[complex interfaces](https://www.nngroup.com/articles/complex-application-design-framework/), [](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/)[static prototypes](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/) are still useful for answering many research questions. However, when an interface is complex, AI prototyping tools make it easier to build high-fidelity, interactive prototypes that closely resemble the real product.

-   [Interactive Prototypes, Fast](#toc-interactive-prototypes-fast-1)
-   [How to Prototype Complex Interfaces with AI](#toc-how-to-prototype-complex-interfaces-with-ai-2)
-   [Integrating AI Prototyping into Your Process](#toc-integrating-ai-prototyping-into-your-process-3)

## Interactive Prototypes, Fast

AI tools bring speed to the design process, enabling designers to create a realistic working prototype in a day. Incorporating realistic participant data, numerous states, complex filtering, and AI-generated responses is now available early in the design process. This means you can test with users earlier, more often, and iterate on what you learn from research. Let's look at some case studies of AI prototyping.

### Prototyping an Expense-Policy Editor

Ramp's design team has started integrating AI prototyping into its work. Designers across teams leverage AI to prototype interactions that would be difficult, time-consuming, and impractical to develop manually. Ramp’s senior product designer, [Pavan Garidipuri,](https://www.linkedin.com/in/pavangaridipuri/) used Cursor to prototype a redesign of the expense-policy editor, a tool that helps admins manage spending rules and was historically challenging for users to navigate. I discussed the project with Pavan, who explained that he chose an AI prototyping tool because manual prototyping of the interaction design was too complex. The redesign focused on the experience of editing a policy through AI chat. Since conversation-based editing relied on dynamic interface responses, it was hard to simulate with static screens.

During usability testing, participants received a link to the working prototype, loaded with their own sanitized data. The prototype operated like the actual product, enabling participants to interact naturally and provide precise feedback. This approach allowed Pavan’s team to discover edge cases that might have otherwise remained unnoticed. One key finding was that the way of tracking and displaying edits was confusing. Pavan said his team couldn't have found that usability issue without an interactive prototype that closely resembled the real interface.

The prototype quickly progressed from concept to demo in only three weeks, with ongoing iterations guided by customer feedback. This project ultimately influenced the team's roadmap for the remainder of the year.

### Prototyping Conversational AI

Also at Ramp, product designer Andrew Lucas used AI to visualize a conversational AI expense-reporting workflow. This interface was difficult to prototype realistically without AI because it had to generate a sensible response to virtually any user input and might even produce different outputs for the same input. Traditional design tools, which are limited to a fixed set of prebuilt screens, can't capture that kind of open-ended, nondeterministic behavior.

Andrew used Cursor to prototype a conversational AI interface connected to an agent that provided nondeterministic outputs, mimicking the real product. This interactive, realistic prototype could then be tested with users before deployment. Study participants could input anything they’d like, rather than having to follow a predetermined path. As a result, the researchers could see how the agent handled unexpected requests. These kinds of issues surface only when testing a near-final version and might not emerge if participants are shown only one happy path.

### Prototyping a Filter Interface for Traffic Engineers

Researchers at Purdue University developed a filtering interface to assist highway traffic engineers in analyzing complex traffic data. The dataset included 27 attributes per traffic event, with several containing nested sub-attributes. The team experimented with two prototyping approaches: static prototypes built by hand and AI-generated interactive prototypes.

This was a sequential case study focused on a single project rather than a controlled experiment.  From phase one to phase two, as the prototypes shifted from static, hand-built to interactive, AI-generated, the team's understanding of the problem deepened. Because of this, interpret this example as an illustration of what became feasible to build and test, not as evidence that AI prototyping produces better research.

#### Phase 1: Static Screens Built by Hand

First, the team built low-fidelity wireframes in Figma without any AI assistance and got user feedback on the prototype’s [visual design](https://www.nngroup.com/articles/testing-visual-design/), but couldn't observe how people would interact with the filters because the prototype was static. While visual design matters, a key aspect of filter design is how the system responds when users interact with it (for example, by applying or removing it). To thoroughly test filters, users should be able to click through and use the system as they would with the real product.

![Two side-by-side wireframes: a map of Indiana with a pink block labeled "Dataset Filtering Options Here," and an unstyled panel of priority, status, and event-type filters.](https://media.nngroup.com/media/editor/2026/08/26/static-wireframes.jpeg)

_Static low-fidelity wireframes of the traffic-event filtering interface showed the layout and available filters, but users couldn't interact with them._​​​​

Phase 2: Interactive Prototype Generated with AI

In this phase, the team rebuilt the interface with v0 and Bolt, prompting the tools with specific design requirements and a synthetic, AI-generated dataset. During usability testing, researchers shared a link to the working prototype, and participants interacted with the interface as they would with the finished product.

![Left: a location filter over a working map of Indianapolis with a radius slider. Right: a statewide map of plotted traffic events with a severity summary.](https://media.nngroup.com/media/editor/2026/08/26/ai-prototype.png)

_Interactive, high-fidelity prototypes generated with AI tools: a component exploration created with v0 (left) and a full-page layout created with Bolt (right)_

The Purdue researchers noted that participants engaged with the two types of prototypes differently. With static screens, they provided less specific feedback and appeared to treat the designs as too preliminary for in-depth critique. In contrast, with the AI-generated, interactive prototype, users identified specific problems the team could address.

Designing filters is challenging because there are many edge cases to consider. These cases cannot be tested with a static prototype, but manually building an interactive prototype when the dataset has many attributes and sub-attributes is unrealistic. AI cuts the time required to build a prototype that behaves like the real product.

## How to Prototype Complex Interfaces with AI

Receiving usable outputs from AI tools depends on the context that you give the tool and the design guidelines that you specify. The process below outlines how to use AI to prototype a complex interface in five steps.

1.  **Determine what you need the prototype to do.** Before you open the AI tool, decide what level of interaction the prototype needs to support to answer your research questions. What behaviors does the research require? Which interactions, states, data, or responses must work? Sometimes a simple prototype answers your research questions, and full interactivity is not necessary.
2.  **Make your design decisions**. Once you know what the prototype needs to do, decide how it should look and behave. Write down what the layout, hierarchy, interactions, and even edge cases, like empty states and error states, should look like. The quality of the prompt you write in step 4 depends on the thinking you do in this step.
3.  **Collect the data to use in your prototype.** Here, you have a couple of options. First, you can export real data from your product to provide to the AI tool. If you choose to use real data, follow your organization’s data policies and do not upload any personally identifiable information. Also, review your tool’s data policies to understand how your data could be used by the company that owns the AI tool. Alternatively, you could ask an AI tool such as Claude, Gemini, or ChatGPT to [generate a synthetic dataset](https://www.nngroup.com/articles/ai-data-prototype-testing/) based on criteria you define.
4.  **Write a prompt that describes your design decisions and includes your data.** This step combines the information gathered in the first two steps. Craft a [](https://www.nngroup.com/articles/careful-prompts/)[detailed, specific prompt](https://www.nngroup.com/articles/careful-prompts/) to guide the AI tool in building a high-quality interface. The prompt should describe the interface you want (the layout, the interactions, the edge cases) and include a file containing your data. Feel free to attach any sketches, wireframes, mood boards, or existing designs, too. If you're unsure how to structure the prompt, you can ask a general-purpose AI tool to help format it; markdown format is usually easiest for LLMs to parse.
5.  **Feed the context into an AI prototyping tool.** Tools like Cursor, v0, and Figma Make can take a detailed prompt and return a working, interactive prototype. The tool you use depends on how much control you need and how comfortable you are editing code.
6.  **Edit the output and iterate.** AI prototyping tools are not perfect, and the first output probably won't get everything right. Expect to go back and forth, tweaking the layout, fixing interactions, and guiding the tool toward what you had in mind. Once you’re satisfied with your iterations, run a quick pilot test to ensure the prototype works as intended and doesn’t introduce any unforeseen misunderstandings.

![Six-step AI prototyping process: determine the goal, make design decisions, collect data, write the prompt, use an AI tool, then edit and iterate.](https://media.nngroup.com/media/editor/2026/09/03/test-complex-interactions-earlier-with-ai-prototyping-1.png)

![Six-step AI prototyping process: determine the goal, make design decisions, collect data, write the prompt, use an AI tool, then edit and iterate.](https://media.nngroup.com/media/editor/2026/09/03/test-complex-interactions-earlier-with-ai-prototyping-2.png)

## Integrating AI Prototyping into Your Process

[AI tools can support many phases of the design process](https://www.nngroup.com/courses/ai-for-design/), from discovery and alignment to ideation and handoff. This article focuses on rapid prototyping for usability testing. There are a few points to keep in mind.

### You Still Make the Design Decisions

If you leave design decisions to the AI tool, it will automatically fill in the gaps and will lack [human attention to detail](https://www.nngroup.com/articles/ai-prototyping/). These tools don't inherently understand content layout or [visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), so they need detailed [guidance from a knowledgeable designer](https://www.nngroup.com/articles/future-proof-designer/) to produce useful outputs. That said, AI tools are valuable because they can execute your design decisions quickly.

Ultimately, AI helps you realize design ideas faster, but the design decisions remain yours. What's changed is how quickly you can turn those decisions into interactive prototypes that you can learn from.

### Don't Fall for the Fidelity Trap

Have you ever built an AI prototype that looks polished, shows real data, and has full interactive capabilities, and heard someone say, "This looks great, can we just ship this?"

It's a reasonable question from someone who doesn't know how the prototype was made, but you shouldn’t assume that this AI-generated, high-fidelity interactive prototype is production-ready. The danger is that its polish might cause people to stop working to improve it. AI-generated prototypes may look complete while introducing all sorts of assumptions and inaccuracies, such as using the wrong design pattern for the situation, creating a confusing hierarchy, or unnecessarily repeating elements. To avoid this temptation, make sure that someone with strong design knowledge reviews the prototype before it’s pushed to production.

### Conclusion

Creating realistic, interactive prototypes for complex interfaces used to be prohibitively time-consuming. AI prototyping tools change that. They let you develop high-fidelity prototypes that you can test with users before committing to building them for real.

### References

Tianyi Li, Tanay Maheshwari, Alex Voelker (2025). _User-Centered Design with AI in the Loop: A Case Study of Rapid User Interface Prototyping with "Vibe Coding."_  ACM Collective Intelligence 2025. [https://arxiv.org/abs/2507.21012](https://arxiv.org/abs/2507.21012)

Elizabeth Lin. (2025, November 10). _Building with Cursor ft. designers from Cursor (Ryo Lu), Notion (Jin Park), and Ramp (Catherine Wang)_ \[Video\]. YouTube. [](https://www.youtube.com/watch?v=T8T2gHCKWCE)[https://www.youtube.com/watch?v=T8T2gHCKWCE](https://www.youtube.com/watch?v=T8T2gHCKWCE)