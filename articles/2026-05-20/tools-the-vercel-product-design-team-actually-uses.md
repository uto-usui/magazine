---
title: "Tools the Vercel product design team actually uses"
source: "https://www.hannahhearth.com/posts/tools-the-vercel-product-design-team-actually-uses"
publishedDate: "2026-05-19"
category: "design"
feedName: "Sidebar"
---

This writeup will be out of date within weeks, but that’s ok. This is a snapshot in time kind of post. Design tools are changing fast in a world that has never felt more disrupt-able. For our latest team meeting, I hosted a design tooling _Show and Tell_, where product designers shared what tools they are actually using for design work.

My takeaways were:

-   Even within our small team, everyone is using completely different tools right now.

-   We have a wide range of AI usage, from early adopters who haven’t gone a day without using AI in 6 months to skeptics who still find it mostly useless in their creative endeavors.

-   AI tools for design workflows are clunky and lagging behind relative to AI tooling for engineering workflows.

Here’s a deeper dive into a few specifics.

## Make Claude and Codex do Pair Programming

Timo has been using Codex as his primary coding agent but created a skill for Claude to review Codex’s work. The skill file instructs Codex to share its plan with Claude and ask for feedback (i.e. Is this more complex than it needs to be? Is there duplication? Is the API actually well designed?). The file also instructs Codex not to blindly comply, but defend what it believes in, only updating the plan when both models agree.

You can try this without any custom tooling. Just ask your agent to share its plan with a second model and hash it out before coming back to you. If you want to use Timo’s skill, check it out [here](https://github.com/timolins/claude-review) or use `npx skills add timolins/claude-review` to install.

## To Achieve Flow State, You Need Concurrent Threads

It was easy to get into a flow state in traditional design tools. We spent hours of focus time going broad and deep with creative juices. But now, we send a prompt and sit there waiting for the agent to complete a series of tasks. Before we know it, we’re doomscrolling Slack.

A few people on the team have landed on ways to use parallel threads to get into a flow state. Tom will start a project in Conductor and open a few different tabs in that project for a variety of topics: maybe one is for UX flows, one is for state and data, and another is for miscellaneous small paper cut fixes. Not only does it increase your agents’ productivity in the same amount of time, it also keeps things organized so you don’t lose your mind managing 100 little robot armies at once.

## Designing from Production

In the old world, design files were _ahead_ of production. Teams worked hard to keep them in sync. Now, because implementation cost and time has dramatically dropped, design files are laughably stale and production has a million features that never even started on a canvas. That’s ok because our designers are coding too.

But it presents some challenges. Sometimes you need a canvas to play around with ideas before going back to code. We’ve found a few tools that are good at getting production styles back into a canvas: I’ve personally had success with the Paper browser extension that copies the structure and style of a page almost perfectly and brings it into the Paper design canvas. But I’m not really an expert in designing in Paper yet and having more native access to our design system seems like the logical next feature.

With production as the source of truth, Sam built this [custom chrome extension](https://github.com/sambernhardt/click-to-component-chrome-extension) as an alternative to React Dev Tools to jump to the file locations. Both technically work but the custom extension is a bit quicker for his workflow so he prefers that - keyboard shortcuts for the win.

We also use agents in Slack to change code and open PRs for us. Everything from v0 to Cursor to Claude get @ mentions all the time in our Slack channels to update the repo for anything that doesn’t require significant new componentry. You can skip adding things to the backlog. It’s just as easy to fix clear and obvious paper cuts with an agent right from the Slack thread where your teammate made the complaint.

## Iterate Without a Canvas

One major challenge with using AI coding tools to design is that without a canvas, you often end up down one narrow rabbit hole instead of diverging on a lot of ideas.

But the browser can be a canvas of sorts too. Sam created a custom dev tool called [UI Fork](https://github.com/sambernhardt/uifork) that allows you to create multiple versions of components that run inside local dev. You or your reviewers can switch between the variations in your browser with an overlaid UI toggle or keyboard shortcut. When you've landed on something you like, you promote that variation, and UI Fork will merge just that version's diff back to the original file.

## Figma is Still Natural For a Lot

Not everyone believes AI is useful in the day-to-day design work. Some designers described trying AI-first design workflows, and then going back to Figma because it's just better for broad exploration. Others missed the canvas life, but find that the design process in Figma feels dramatically slower compared to AI coding tools.

With some success, we’ve used the Figma MCP to fill in design mocks with realistic content. This week, I started to populate a bunch of list views with data and logos, and realized: it’s 2026…I can use AI for this menial, time consuming task. A quick prompt in Cursor to fill a specific Figma file with relevant data and images saved a meaningful chunk of time. We are still surprised that Figma doesn’t just do this natively. And the rest of the MCP use cases are pretty hit or miss.

## Non-AI Tools are Valid

Not every new tool needs to use AI. Skilli shared an internal tool called [Timeless](https://github.com/vercel-labs/timeless-releases) that continuously records your screen and lets you save the last five minutes at any point. If you spot a fleeting layout shift or a bug you can't reproduce, you can capture it after the fact, trim to the moment you need, share it.

William shared how he uses the Pin tool in Cleanshot to overlay a screenshot onto a new design to quickly swap before and after for detailed comparisons.

* * *

These are the tools we're actually using right now. If you've found a better approach to any of these problems, I'd love to hear about it.