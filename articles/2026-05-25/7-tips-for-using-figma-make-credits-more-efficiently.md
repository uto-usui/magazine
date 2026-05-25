---
title: "7 tips for using Figma Make credits more efficiently"
source: "https://www.figma.com/blog/7-tips-for-using-figma-make-credits-more-efficiently/"
publishedDate: "2026-05-22"
category: "design"
feedName: "Figma Blog"
---

Since we launched Figma Make [a year ago](https://www.figma.com/blog/8-ways-to-build-with-figma-make/)

, one pattern keeps coming up: The teams who get the best results out of AI prototyping aren’t necessarily the ones writing the longest prompts. They’re the ones who understand how to set up their work well, scope edits tightly, and scale their context for collaboration.

These seven tips can help you do the same in Make.

## [1\. Make your first prompt do the heavy lifting](#_1-make-your-first-prompt-do-the-heavy-lifting)

Your first prompt sets your project’s structure and establishes its constraints. The more complete that starting point is, the less time you’ll spend fixing it later.

A useful rule of thumb: Treat the initial prompt as the brief, and every follow-up as a delta. This means your first prompt should include:

-   The goal
-   The context
-   All key elements, behaviors and constraints
-   What "done" will eventually look like

###### Make tip

Ensure your first prompt is as intentional and complete as possible, then keep the rest of the conversation focused.

Once you have a good base to build on, your follow-up prompts can get much smaller. Good ones typically cover three things:

-   What should change
-   How it will change
-   What should stay the same

For larger builds, consider breaking your work into stages. Get your project’s structure right first, without worrying too much about content details—structure is often the hardest thing to change once you’re deep into a build. Add intelligence and behaviors next, then refine the content and polish after that.

Avoid combining multiple changes in a single follow-up prompt, _unless_ they are related fixes on the same piece of logic or UI. If three edits all affect the same component, then it’s more efficient to bundle them in one request than spend multiple rounds on the same thing.

Any follow-up prompt works better if it’s tightly scoped. The more specific you can be in what you want Make to change, the more efficient you’ll be. For example, “Update the calendar component,” “Add a new state to this screen,” or even “Edit the `tokens.ts` file” all direct Make more clearly than “That’s not right, can you redo it?”. The specific prompts tell Make exactly where to look and what to do. The vague prompts require Make to interpret your intention before guessing how to best achieve it, adding extra cost.

![An example of an efficient first prompt detailing the project’s goal, context, key elements, behavior and constraints: “Build a robust spreadsheet creation tool for mobile web to view cells in an accessible way. Default screen is interactive spreadsheet. Allow user to create tabs for documents. Allow csv upload to populate the spreadsheet. Must include Formula parser for mathematical operations, and dynamic cell formatting. Does not need to add user accounts and authentication.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAs0lEQVR4nK2SWQ6DMAxEuf8BK0oBOyYrl3A1FukilaqBfliOP/w040knIvqpnHNWeHvvNYSgMUbrezsiot03IDNbX5bFQDlnTSnZ3AxkZiUiewMAdeu6GvQwkJltGZYrsJTSDnTOmTpUtQwoYKcVyjafBrqXlOsd/xIKbx1wwFI6qJCIdJ7nh3V8G4SCcESeyptCAbDahrqSs9I06jTe3s7xk8IKrgnjfjF4HfqLDtd+F3gH3+0i1wuJ+nsAAAAASUVORK5CYII=)![An example of an efficient first prompt detailing the project’s goal, context, key elements, behavior and constraints: “Build a robust spreadsheet creation tool for mobile web to view cells in an accessible way. Default screen is interactive spreadsheet. Allow user to create tabs for documents. Allow csv upload to populate the spreadsheet. Must include Formula parser for mathematical operations, and dynamic cell formatting. Does not need to add user accounts and authentication.](https://cdn.sanity.io/images/599r6htc/regionalized/8cc669bfeec2e808fb48ab08d08e7608d4f962fc-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

An efficient first prompt

![An example of a follow-up prompt structured around what changes, how it changes, and what stays the same: “Create a distinct new state for cells once they have been populated. In that state, clicking on a cell will open a dropdown with text formatting options rather than triggering text edit. Unpopulated cells should behave as per their default state.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAmElEQVR4nK2SWwrDIBBF3f8So3UevpYx5doYWkiKmHwcVJTjHWacqtqTuNmHKaX7QmY+ZCDn3FkSMrPFGE1EDkop1lr7m9ZdXRBRF0IMcEa6JaGI/AixB6rJaq1rCfmrZCRDubU2q6WYqqwJiWgXfpIBii8L3pugYSdJL4WjEdgPIdYQNvN+68Kz0qfmcIxN/2hv0u3BnuUNK2Ehrhkyk3kAAAAASUVORK5CYII=)![An example of a follow-up prompt structured around what changes, how it changes, and what stays the same: “Create a distinct new state for cells once they have been populated. In that state, clicking on a cell will open a dropdown with text formatting options rather than triggering text edit. Unpopulated cells should behave as per their default state.](https://cdn.sanity.io/images/599r6htc/regionalized/f9c5ae278f0eee8d02c0fef9b7c27bac89b3baab-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

An efficient follow-up prompt

## [2\. Prioritize manual edits for select changes](#_2-prioritize-manual-edits-for-select-changes)

The teams getting the most out of Make also know when to stop prompting and start editing directly. For small visual changes—tweaking spacing, removing an element, adjusting text—the [**Edit tool**](https://help.figma.com/hc/en-us/articles/31304485164695-Create-and-edit-a-Figma-Make-file#h_01JTEVBJ0527WJSQ40FDX87CRH) is often the quickest move. It lets you make targeted adjustments without reopening the whole problem. That matters because many follow-up prompts aren’t actually asking Make to solve a new design problem; they’re asking it to nudge something that’s already basically correct.

###### Make tip

Use the **⌘F shortcut** to scan through code and find a specific tag or the data feeding content into your project. A good place to start is `App.tsx`—if it's not there, check the other `.tsx` files in the component folder.

The same is true in code. Some of the most efficient changes in Make happen when you jump to the source and edit the relevant value directly. This is especially useful when something is dynamic and not editable from the preview alone. For example, if you need to update text inside a repeated component, or change data pulled from a list in the same folder. Instead of prompting your way toward the right output, you can use **Go to source**, search the code, and make the change directly where it lives.

You don’t need to be a developer to benefit from this. Make’s code is readable enough that you can locate what you need, especially when you already know which element or behavior you’re trying to adjust.

For larger visual changes, we recommend using the Figma Design canvas. With [**Copy design**](https://www.figma.com/blog/bringing-figma-make-to-the-canvas/)

, you can bring your Make preview into Figma Design as editable layers, make changes there with the tools you already know, then send that direction back into Make with a single prompt. That hybrid workflow can be much faster than prompting one visual adjustment after another. For example, when fellow Designer Advocate Miggi Cardona generated a functional audio app that came out in dark mode, he copied it to the canvas, crafted a light version, and brought that result back into Make as context for his prototype update. One prompt, no interpretation or guesswork needed. Simple and efficient!

The point is to reserve prompts for the work they’re best at: generation, reasoning, and larger transformations—and opt for manual edits when the work gets more visual.

## [3\. Turn repeated prompts into rules and workflows](#_3-turn-repeated-prompts-into-rules-and-workflows)

If you find yourself repeating the same instructions, it’s time to pull them out of the prompt. This is where markdown files like [`guidelines.md`](https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make) become valuable. The teams that get the most out of AI in their workflow systematically treat these as project requirements, not nice-to-haves.

###### Make tip

Ask the model to critique your markdown files based on how it uses them. It can often spot redundancy, inconsistent naming, or vague instructions.

[A good `guidelines.md` file](https://developers.figma.com/docs/code/write-design-system-guidelines/#guidelines-structure) lists the rules you want Make to follow throughout your project:

-   What is in the design system
-   What naming conventions to follow
-   What patterns to prefer
-   What quality bar to aim for
-   Where to find the right source of truth for common decisions

Think of it as reusable project memory: a place to keep the rules and references Make should carry at all times. Since it isn’t relearning every time, the payoff is twofold: less repetition in your prompts and better first results.

Structure matters here. A single massive markdown file isn’t always the best answer. In many cases, it’s cleaner to have one primary guidelines file and smaller supporting `.md` files for more specific topics, like components, motion, tokens, or content patterns. The more readable these files are for the model, the more useful they become. Clear section headings, consistent labels, semantic naming, and less redundancy all help.

![A Guidelines.md file open in a code editor, showing structured Figma Make documentation for SAP Fiori's design system including product character principles and cross-cutting rules](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABZElEQVR4nHVTCY7DIBDj/x/dkgsGCOSsV54ulFbaSBYkGYzHBrOuK0op2LYNa0pY0wp+I3LOH/MK1u77rjiOA+d56kgYkYAYE0ouiCFCnEcQgYgghNBGIsaIXgAJz/PEfd8NxvuIEFaUvCHFhCAB6W8hkai6U0iyXtl933g+nwo+JoSElLIqDF6wTDPc4lRZj15hr+66LkUjZFHOBSVnLNMC+/PA8LAYrMUwDAprLcZhxDRNcM43YvWzbLoBFZPYxBiaL/TQOwfxHuIF3nsF5wpVGltwL8LSSKnasJXaBgvo2UeS3J3tHe8kOWe72vJJXO3dVJO5CxU6KhTRI0RSJT5efv2Hq5ubGjcXkqx6xRa/02UNxx6Z/5gB33OBYTJMiMXLvMA+LMZxfBF2h7xaUFU3lE1tqf+UEE9g33a4edF0VaHIxxmsKX6jP9T3db8VcgFVzdOkyVai71vRXzOS1IccvCm/rcKjxf8l2/cAAAAASUVORK5CYII=)![A Guidelines.md file open in a code editor, showing structured Figma Make documentation for SAP Fiori's design system including product character principles and cross-cutting rules](https://cdn.sanity.io/images/599r6htc/regionalized/d885f843b62d3b36a528419cc412f1748a32ef3e-3562x2160.png?w=1080&h=655&q=75&fit=max&auto=format)

Make guidelines created by Designer Advocate Laura Fehre based on SAP’s open source design system

`Skills.md` files are the next step when the thing you keep repeating is not just context, but an entire workflow. `Guidelines.md` and `skills.md` can be easy to confuse because they’re both markdown files—at their core, they’re plain text instructions that help Make deliver more reliable outputs. The difference is the role they play:

-   Guidelines: Always-on, ambient project memory that a Make project carries in the background
-   Skills: On demand workflows you invoke when a specific task calls for them

If guidelines tell Make what to know, skills tell Make what to do. A skill works like a manual for a recurring task: reviewing a screen against your design standards, building from a PRD, checking product copy, or generating a specific kind of interface. Instead of rewriting the same long series of prompts every time, [you can turn that process into a skill and invoke it when you need it](https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-Figma-Make).

## [4\. Be judicious about bringing in outside context](#_4-be-judicious-about-bringing-in-outside-context)

If `guidelines.md` are where you store standing instructions, [MCP connectors](https://help.figma.com/hc/en-us/articles/36343926263703-Manage-MCP-connectors-in-Figma-Make) are how you fetch the outside context a task depends on.

Connectors are most useful when Make needs access to something beyond the project itself: a live spec, a ticket, a design system reference, a technical document, a bug report, a workspace in another tool, or a custom internal system. But more context isn’t always better.

Pointing Make at a large external source without specifying the details to pay attention to is one of the easiest ways to make a task harder than it needs to be. A giant Notion page, a broad Jira or Linear query, or an open-ended search across a connector workspace all introduce noise. The model has to figure out not only what to do, but also which context is actually relevant for its task.

###### Make tip

Used well, external context gives Make better grounding. Used loosely, it just makes its job bigger.

The better approach is to scope retrieval tightly: Point to the exact doc; link the exact ticket; name the specific file, error, or component that matters. If there’s only one paragraph or one set of requirements that Make needs, consider pasting that excerpt directly rather than making it search for the answer.

This is also where [file attachments](https://help.figma.com/hc/en-us/articles/31304529835671-Attach-files-to-a-prompt) can be helpful. If the work requires a live source, connectors are often the right tool. But if it depends on specific files you already have, attaching those directly inside your prompt is the more efficient move. A research read-out PDF can give Make the findings it needs to work from. A CSV dataset can help Make populate dashboards, tables, or profile screens with real values. A video or media asset can help Make embed real material instead of generating a placeholder.

In each case, the aim is simple: Give Make the original material to make its job as easy as possible. Skills can help here, too—by giving Make exact steps to follow when it uses a connector, a custom MCP, or a file attachment, you get a more controlled, predictable, and efficient output. The goal isn’t to maximize context; it’s to give Make the _right_ context.

## [5\. Create and scale reusable foundations](#_5-create-and-scale-reusable-foundations)

The fastest way to build in Make is to avoid rebuilding the same UI from scratch every time. Both [Make kits](https://www.figma.com/blog/introducing-make-kits-and-make-attachments/)

and [templates](https://help.figma.com/hc/en-us/articles/34716344138519-Create-and-update-a-template-in-Figma-Make) give you jumping-off points that already include context, reusable patterns, and even working structure. This is one of the easiest ways to reduce unnecessary rework. A good reusable base helps you avoid blank-page prompting, reduces the chance of hallucinations, and gives more people on a team a strong starting point quickly.

Think of Make kits as shared system ingredients—they help scale the distribution of things like foundations, tokens, components, and `guidelines.md` when you are working from 0→1 in Make. For teams with React components available as an npm package, this can be especially powerful: Make kits can [bring the components and patterns](https://developers.figma.com/docs/code/bring-your-design-system-package/) your development team has in production into your projects, instead of approximating them from scratch.

###### Make tip

Reuse isn't just about speed—it's also about consistency. Make kits provide reusable ingredients, including npm packages, library styles, tokens, and guidelines. Templates provide reusable starting points.

Templates on the other hand, give your team reusable starting points: product shells, preferred layouts, and even starter prompts. This is especially useful for larger teams scaling Make across varied levels of AI fluency and multiple product areas. Fellow Designer Advocate Laura Fehre’s [open source SAP template](https://www.figma.com/community/file/1629111664100387328/sap-dynamic-page?q_id=95bcea90-6d92-47fb-b209-644c8c650cb5), for example, contains fixed UI elements (header, navigation) that are shared by all products, alongside strict guidelines to make sure prompts can’t easily change them. It also includes “recipes” that help the template users spin up specific themes and layouts on demand. Those recipes live directly in the template's UI as ready-made, code-based prompts—click to copy, then paste into Make.

That kind of setup does two things at once: It makes the template more immediately useful, and it teaches people how to use it well. The result is less rework, fewer dead ends, and a more reliable path to the prototypes the team actually wants to build.

## [6\. Choose the right model for the job](#_6-choose-the-right-model-for-the-job)

No single AI model is the best fit for every Make workflow. The right choice depends on the job: how complex it is, how much reasoning it requires, how much visual context you’re attaching, and how refined the output needs to be.

A good rule of thumb is to choose the lightest model that can handle the task well.

###### Make tip

The right AI model depends on the job: Use lighter models for simple iteration, stronger ones for ambiguity, complexity, or high-fidelity work.

If you’re making a small change or doing some routine iteration, a lighter model like Gemini Flash is often the better fit. If the work is more ambiguous, involves tougher debugging, requires stronger reasoning, or needs to preserve a lot of visual fidelity, a stronger model like Claude Opus may get you to a better result faster, albeit at a higher cost. In those cases, investing more upfront can actually be more efficient than spending many rounds correcting a weaker first pass.

This is especially true when you’re starting a new Make file or attaching rich visual context to a prompt. Design mockup attachments can be extremely helpful when you want Make to align to an existing direction. But the more intricate the design file, the more Make has to interpret it. If you’re front-loading Make with a lot of context at once, either use a model that can handle the complexity well, or reduce the context to only what matters for the current step.

It’s worth knowing that long-running Make projects also become heavier over time. As chat history builds up, each new turn gives Make more context to consider, which can compound cost—especially if you’re using more expensive models. When that happens, [clearing your chat context](https://help.figma.com/hc/en-us/articles/39893099629975-Clear-chat-context-in-Figma-Make) can give Make a cleaner slate without forcing you to abandon the project or move everything into a new file.

![A list of the different LLM models available inside Make as of May 2026: Default (Recommended), Claude Sonnet 4.6 (Balanced, efficient), Claude Opus 4.7 (Thorough, uses more credits), Gemini 3 Flash (Fast, iterative), Gemini 3.1 Pro (Deep, creative).](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABXElEQVR4nJ2Tz2rCQBCH8yDSRFHQVIx/DoL4AuJR+xLi0YMRRQWfQC99A73Xg75GtLloQkGqePMQIVbjV5JKaSFS68CP3Vl2v9nZmRXwscPhwHa7xTAMlsvlL61WKyzL4nw++x1F8Ftcr9cMh0Pa7TaNRgNVVanX654GgwHz+dwL6gcVfjruBle6rlOr1cjlcmQyGRRFQZZlYrEYpVKJ6XTKfr+/HTibzahWq6TTaRKJhAcSRZFAIEChUGA8Ht8PVBSFeDxOOBxGkiSKxaIHvPaOwl/AZDLpASORCKFQ6D6gpmlUKhVSqZSXcjQaJRiUEMWHS8ov/wPql6Lk83my2axXGPeWsvxIufzEZHJjUbiY2zaj0Yher0e326XT6dBstlDVFv3+M5r2im1/3A60bZvNZoNpmt8yDJPFwuTt7Z3dzuJ4dPDrbV+gG9lxHE+n0+kyur47//KvfBQ+Af3J5vW04jTmAAAAAElFTkSuQmCC)![A list of the different LLM models available inside Make as of May 2026: Default (Recommended), Claude Sonnet 4.6 (Balanced, efficient), Claude Opus 4.7 (Thorough, uses more credits), Gemini 3 Flash (Fast, iterative), Gemini 3.1 Pro (Deep, creative).](https://cdn.sanity.io/images/599r6htc/regionalized/4893befc32f6c60a00cd1f4f9be33e843747f8ee-1920x1080.png?rect=1,0,1918,1080&w=1080&h=608&q=75&fit=max&auto=format)

A list of the different LLM models available inside Figma Make

## [7\. Decide what’s worth automating](#_7-decide-what-s-worth-automating)

Finally, the teams getting the most value from Make aren’t just teaching individuals how to use it better. They’re deciding, together, where it fits in their workflow and where it doesn’t.

###### Make tip

Efficiency isn't just about how fast you move in Make. It's about knowing which parts of your work are worth moving fast on.

That might mean reserving Make for bringing existing designs to life rather than 0→1 exploration, where ambiguity and iteration can be valuable. It might mean using it to accelerate prototyping, but not to replace manual craft in areas where the team already moves quickly and confidently. It might mean investing in templates, guidelines, and kits because the payoff compounds over time.

Not every task benefits equally from automation. The strongest teams know where Make adds leverage, where human precision still matters most, and where a bit of setup work up front will save a lot of effort later.

The goal isn't to automate everything—it's to make better decisions about what to automate and how. Sometimes the most efficient investment is the one that costs a little more attention up front: a better template, clearer guidelines, cleaner prompts, or a shared team playbook. The payoff is that every project after that starts from a stronger place.

For more guidance on optimizing AI credits in Figma Make, visit our [help center](https://help.figma.com/hc/en-us/articles/40097793879191). If you've found other approaches for working more effectively in Make, we'd love to hear them—share what you're building with us online or in our [Figma Forum](https://forum.figma.com/).