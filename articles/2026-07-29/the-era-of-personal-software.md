---
title: "The era of personal software"
source: "https://allen.hutchison.org/2025/11/28/the-era-of-personal-software/"
publishedDate: "2026-07-27"
category: "design"
feedName: "Sidebar"
---

I was sitting in a coffee shop this afternoon, nursing a cappuccino and doing a quick triage of the GitHub repositories I maintain. It was supposed to be a quick check-in, but I was surprised to find a pile of issues I hadn’t seen before. They had slipped through the cracks of my notifications.

My immediate reaction wasn’t just annoyance; it was an itch to fix the process. I needed a way to monitor a configurable set of repos and get a consolidated report of new activity—something bespoke. For my smaller projects, I want to see everything. For the big, noisy ones, I only care if I’m assigned or mentioned.

So, I opened up my terminal. I fired up `gemini cli` and started describing what I needed.

Twenty minutes later, I had a working command-line tool. It did exactly what I described, filtering the noise exactly how I wanted. I ran it, verified the output, and added it to my daily workflow. I closed my laptop and went on with my day.

But on the walk home, I realized something strange had happened. Or rather, something _hadn’t_ happened.

I never opened Google. I never searched GitHub for “activity monitor CLI.” I didn’t spend an hour trawling through “Top 10 GitHub Tools” blog posts, or installing three different utilities only to find out one was deprecated and the other required a subscription.

I just built the thing I needed and moved on.

We are entering the era of **Personal Software**. This is software written for an audience of one. It’s an application or a script built to solve a specific problem for a specific person, with no immediate intention of scaling, monetizing, or even sharing.

Looking back at my recent work, I realize I’ve been living in this category for a while. In many ways, this is the active evolution of the “[Small Tools, Big Ideas](https://allen.hutchison.org/2025/05/10/small-tools-big-ideas/)” concept I explored earlier this year. Instead of just finding these sharp, focused tools, I’m now building them. [Gemini Scribe](https://allen.hutchison.org/gemini-scribe/) started because I wanted a better way to write in Obsidian. [Podcast Rag](https://allen.hutchison.org/category/projects/podcast-rag/) exists solely because _I_ wanted to search my own podcast history. My [github-activity-reporter](https://github.com/allenhutchison/github-activity-reporter) from this afternoon? Pure personal necessity. Even [adh-cli](https://github.com/allenhutchison/adh-cli) was just a sandbox for me to test ideas for the [Gemini CLI](https://geminicli.com/).

We have crossed a threshold where building a bespoke application is often faster—and certainly less frustrating—than finding an off-the-shelf solution that _mostly_ works. The friction of creation has dropped so low that it is now competing with the friction of discovery.

There is a profound freedom in this approach. When you build for an audience of one, the software does exactly what you want and nothing more. There is no feature bloat, no upsell, no UI clutter. You are the product manager, the engineer, and the customer. If your workflow changes next week, you don’t have to file a feature request and hope it gets upvoted; you just change the code. You don’t have to convince anyone else that your problem is worth solving.

But this freedom comes with a new kind of responsibility. When you step outside the walled garden of managed software, you are on your own. If you get stuck, there is no support ticket to file. If an API changes and breaks your tool, you are on the hook to fix it.

There is also the “trap of success.” Sometimes, your personal software is so useful that it accidentally becomes _non-personal_. Friends ask for it. Colleagues want to fork it. Suddenly, you aren’t just a user anymore; you’re a maintainer. You have to decide if you’re willing to take on the burden of supporting others, or if you’re comfortable saying, “This works for me, good luck to you.”

Not every problem is a nail for this particular hammer, of course. Over time, I’ve started to develop a rubric for what makes for good Personal Software.

The sweet spot is usually **glue and logic**. If you need to connect two APIs that don’t talk to each other, or parse a messy data export into a clean report, AI can write that script in seconds. My GitHub activity reporter is a perfect example: it’s just fetching data, filtering it against my specific rules, and printing text.

It’s also great for **ephemeral workflows**. If you have a task you need to do fifty times _today_ but might never do again—like renaming a batch of files based on their content or scraping a specific webpage for research—building a throwaway tool is vastly superior to doing it manually.

Another fantastic category is **quick web applications**. We used to think of web apps as heavy projects requiring frameworks and hosting headaches. But modern platforms like [Google Cloud Run](https://cloud.google.com/run) or [Vercel](https://vercel.com/) have made deployment trivial. Tools like [Google AI Studio](https://aistudio.google.com/prompts/new_chat) take this even further—offering a free “vibe coding” platform that can take you from a rough idea to a hosted application in minutes. My [boxing workout app](http://boxing.hutchison.org/) is a prime example: I didn’t write a line of infrastructure code; I just described the workout timer I needed, and it was live before I even put on my gloves.

Where Personal Software falls short is in **infrastructure and security**. I wouldn’t build my own password manager or roll my own encryption tools, no matter how good the model is. The stakes are too high, and the “audience of one” means there are no other eyes on the code to catch critical vulnerabilities. Similarly, if a problem requires a complex, interactive GUI or high-availability hosting, the maintenance burden usually outweighs the benefits of customization.

Despite the downsides, I find this shift fascinating. For decades, software development was an industrial process—building generic tools for mass consumption. Now, it’s becoming a craft again. We are returning to a time where we build our own tools, fitting the handle perfectly to our own grip.

So, I want to turn the question over to you. What are you building just for yourself? Are there small, nagging problems you’ve solved with a script only you will ever see? I’d love to hear about the kinds of personal software you’re creating in this new era. Let me know in the comments or reach out—I’m genuinely curious to see what handles you’re crafting.