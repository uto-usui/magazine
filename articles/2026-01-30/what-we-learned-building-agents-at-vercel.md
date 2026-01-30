---
title: "What we learned building agents at Vercel"
source: "https://vercel.com/blog/what-we-learned-building-agents-at-vercel"
publishedDate: "2025-11-06"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

4 min read

Nov 6, 2025

Agents present incredible promise for increased productivity and higher quality outcomes in enterprises. Companies are already using them to streamline customer support, code reviews, and sales operations.

When building custom internal agents, the challenge isn't whether AI can create value, it's identifying the problems it's ready to solve today, at a cost that makes sense for the business.

At Vercel, we are going through the same AI transformation as our customers. We use our own products to build agents that help us move faster and spend more time on meaningful work.

After months of experimentation, we’ve turned our learnings into a repeatable methodology for finding and investing in AI projects that have the highest likelihood of creating significant business impact.

## [Link to heading](#finding-the-agentic-sweet-spot)Finding the agentic sweet spot

Over time AI will touch nearly every workflow, handling complex tasks like our own [code review and anomaly investigation agent](https://vercel.com/blog/introducing-vercel-agent). Our intuition for what agents can do is skewed towards high expectations because coding agents like these are so amazing.

But most companies don’t have the engineering capacity to productionize that level of internal use case, and today’s models still face limits in reliability and precision in other domains. This is why we need to select problems that fit what today's frontier models are well suited for.

We've learned that the highest likelihood of success for current-generation agentic AI comes from work that requires low cognitive load and high repetition from humans.

These tasks are too dynamic for traditional automation, but predictable enough for AI to handle reliably. They show up across businesses in data entry, research, qualification, and triage, where automation saves time and keeps quality consistent.

This is the low-hanging fruit to tackle today, while models continue to mature toward reliably automating more complex tasks in the future.

## [Link to heading](#our-methodology-for-finding-the-right-projects)Our methodology for finding the right projects

As simple as it sounds, we talked to our team about tasks that fit the sweet spot: mindless activities repeated often.

Humans don’t love boring, repetitive work, so you can often find great ideas by asking questions like “what part of your job do you hate doing the most?” or “which tasks would you like to never do again?”

Most use cases we’ve found have been relatively simple to automate and have yielded high-quality, measurable outcomes in productivity. Here are two specific examples:

### [Link to heading](#lead-processing-agent)Lead processing agent

We used to have a team of 10 people triaging leads that come through our website. When we asked the team’s top performer what they wished they never had to do again, they told us manually researching the information needed to make an initial qualification judgment was mind-numbing.

We shadowed that employee to learn their process, then [built an agent to automate initial qualification](https://www.businessinsider.com/ai-agent-entry-level-sales-jobs-vercel-2025-10). Now one person handles the work of 10 and the 9 other employees are focused on higher value, more complex sales work.

Here’s the agent workflow:

-   Deep research - performs comprehensive research on the lead and their company
    
-   Qualification - uses `generateObject` to categorize the lead
    
-   Email composition - automatically generates a personalized follow-up email
    
-   Human review - sends all of the information to Slack for human approval
    
-   Approval & email send - catches a Slack webhook event upon human approval
    

### [Link to heading](#anti-abuse-agent)Anti-abuse agent

Our security team manages a steady flow of abuse reports, from phishing and spam to copyright violations. We take each case seriously because false positives can lead to wrongful takedowns, while misses risk leaving harmful content online.

Before automation, human reviewers investigated every report manually, running a formulaic process to make an initial judgment call.

We built an abuse platform agent that automatically takes potentially infringing or high-risk URLs, runs visual analysis, understands the page’s intention, and returns recommended actions for human validation.

Even in its first iteration, this workflow led to a 59% reduction in time to ticket closing, freeing the team to focus on edge cases that require more complex human reasoning.

Here’s the agent workflow:

-   URL intake - retrieves new reports from the abuse queue
    
-   Analysis - runs visual/textual analysis to detect phishing or copyright content
    
-   Recommendation - compiles findings and proposes an action plan
    
-   Human review - sends recommendation to a security engineer for final judgment
    
-   Resolution - records the decision and closes the ticket
    

## [Link to heading](#get-started-with-our-agent-templates)Get started with our agent templates

Everyone should begin asking their team the questions above, but you can get started immediately by using one of our agent templates.

We’ve open-sourced a range of agent examples meant to be used as the building blocks for custom agents.

-   [Lead processing agent](https://vercel.com/templates/ai/lead-processing-agent): Have AI perform the research grunt-work and do initial qualification, then validate with a human in the loop
    
-   [Data analyst agent](https://vercel.com/templates/ai/oss-data-analyst-agent-reference-architecture): Converts natural language questions into SQL queries and performs data analysis using multi-phase reasoning
    
-   [Flight booking app](https://github.com/vercel/workflow-examples/tree/main/flight-booking-app): A conversational flight booking assistant with built-in retries, resume capabilities, and fault tolerance
    
-   [Storytime Slackbot](https://github.com/vercel-labs/storytime-slackbot): An interactive, AI-powered Slack bot that creates collaborative children's stories with members of your Slack organization
    

If your team want’s more direct support in finding and building high-ROI AI projects, we’re offering a [hands-on program](https://vercel.com/go/an-agent-on-every-desk) that guides you through use case discovery and agent implementation with our team of forward-deployed engineers.