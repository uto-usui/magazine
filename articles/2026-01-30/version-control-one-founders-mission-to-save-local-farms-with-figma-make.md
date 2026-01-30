---
title: "Version control: One founder’s mission to save local farms with Figma Make"
source: "https://www.figma.com/blog/one-founders-mission-to-save-local-farms-with-figma-make/"
publishedDate: "2025-11-26"
category: "design"
feedName: "Figma Blog"
---

“A farmer goes out of business every week in British Columbia,” says entrepreneur Aaron Veale. He discovered this in February after [coming across a video](https://globalnews.ca/video/11029159/farmers-from-across-lower-mainland-gather-for-townhall-meeting) that landed him at a town hall meeting in Surrey, BC. As he sat in a chilly barn, he heard local farmers describe the myriad challenges they face: rising costs, broken supply chains, and changing government regulations. Though he didn’t know much about farming, the problem called to Aaron viscerally. “Driving home, I said to my girlfriend, ‘I don’t think anyone’s going to help them,’” he recalls. “‘I think this is what I should be doing with my life.’”

[The Canadian government estimates](https://www150.statcan.gc.ca/n1/daily-quotidien/250528/t002a-eng.htm) that last year, BC farmers experienced a record net loss of $457 million CAD. The sector has been operating at a net loss since 2017.

Aaron spent the next six weeks speaking with dozens of farmers to research ways to plug in. “I learned they’re really good at growing food, but not good at marketing,” he says. As a result, small farms tend to get neglected—or worse, bullied—by large distributors, forcing many to sell their produce at a loss. What if, Aaron thought, there was a marketplace bridging the gap between local farms and the top Vancouver restaurants looking for high-quality ingredients?

As a founder, Aaron knows the startup playbook: create a deck, raise money, recruit a team, develop the product. But to address the urgency of the situation, Aaron needed to prioritize speed. So he turned to [Figma Make](https://www.figma.com/blog/figma-make-general-availability/), Figma’s prompt-to-app tool, to help him turn his “what if” into a functioning app called [Planet Food](https://planetfood.app/) in less than three weeks.

It only took about 20 prompts over the span of a day to spin up the first prototype. “Figma Make unlocks the ability to go to market really quickly,” he says. “You can build something and show that people are using it. That’s a huge signal for investors.” From making an MVP, to refining design, to connecting the backend, here are three milestones on the journey.

## [Version one: A conversation starter](#version-one-a-conversation-starter)

The app Aaron envisioned required two operating systems: one allowing farmers to record and categorize the produce they harvest, and another allowing chefs to search for and order ingredients. In the beginning, he built the Farm OS and Restaurant OS separately, running two Makes at the same time. While Figma Make was creating the next version of one OS, he could “continue to add layers, almost like a painting” to the other.

He shared these early concepts with would-be customers as a conversation starter. “I could build multi-screen systems in 10–20 prompts, show them to a farmer the next morning, or drop by a restaurant before opening,” he says. This connection with his customer community helped him better understand their needs.

Based on his conversations, Aaron began to design for the farmer’s reality. For example, the app defaults to dark mode, helping to reduce the glare of the sun in the field. And after learning that farmers work 12-16 hour days—with a huge chunk of that time dedicated to admin and sales—Aaron made sure any task in the app takes under three clicks. He focused on simplicity: “I reduced the noise and the clicks, and it was a much cleaner experience and more tailored to user workflows,” he says.

As his experience with Figma Make evolved, so did Aaron’s process. To make his mobile-first UI intuitive, he learned how to capture screenshots of familiar design elements—such as micro-interactions like swipes and slide-ups—and feed them back into a master prompt, using Figma Make to glue the elements together. “You can refine the product until it’s at the level you want as a designer,” he says. “Now, with Figma Make, you can prompt your way to a heartbeat.”

> With Figma Make, you can prompt your way to a heartbeat.

Aaron Veale, Founder, Planet Food

## [Version two: Humanizing the design](#version-two-humanizing-the-design)

Next, Aaron turned to the design. As a designer, Aaron has always been frustrated by his inability to bring his ideas to life through code. “In the past, I had to lean on 10 people to create my vision, and I always had to compromise,” he says. “This is the first time I don’t have to compromise.” With AI, he believes designers will increasingly become tastemakers who can bring their own ideas to fruition, spending more time on elements like branding, interactions, and the customer experience.

A man of many talents, Aaron leaned on his experience as a film director when writing his prompts. “I view prompting as storytelling, and to write a great story, you need to live the experience of the characters—in this case, the users,” he says. To do this, he distilled what he’d learned from talking to farmers and restaurant chefs into detailed customer personas, outlining their key traits, needs, and pain points. For example, here’s part of the farmer persona:

`Small–mid scale farm owner in B.C. (produce, livestock, poultry, specialty crops). Typically 32–60 years old. Operates with a slim team, heavy seasonal workload, and limited time for admin. Motivated by stability, fair prices, and direct access to local markets.`

`Key traits:`

-   `Hands-on, practical, efficiency-driven`
-   `Tech-curious but not tech-first`
-   `Wants fewer bottlenecks and more predictable income`
-   `Juggles growing, harvesting, logistics, sales, invoicing`

`Pain points:`

-   `Updating spreadsheets or Marketplace/Google Docs manually`
-   `Guessing what restaurants need each week`
-   `Overselling/underselling due to no real-time sync`

Then, he fed the MVP onboarding flow and each persona into ChatGPT, which generated a new prompt for Figma Make. He also used ChatGPT to write customer narratives about farmers and chefs reaching their “aha” moment with Planet Food. He pasted this narrative plus photographs of customers back into Figma Make. This leveled up the onboarding UX from a simple email registration to a more personalized, colorful flow.

> I view prompting as storytelling, and to write a great story, you need to live the experience of the characters—in this case, the users.

Aaron Veale, Founder, Planet Food

## [Version three: Linking the backends with Supabase](#version-three-linking-the-backends-with-supabase)

A major unlock came for Aaron when Figma introduced a [Supabase integration for Figma Make](https://help.figma.com/hc/en-us/articles/32640822050199-Add-a-backend-to-a-functional-prototype-or-web-app), which allowed him to link real backend data to his Figma Makes. In his previous prototypes, Aaron had been using mock data based on inventory lists he’d seen at restaurants. Supabase enabled farmers to upload and store their produce in a database that chefs could functionally shop. “For the first time, the Restaurant OS and the Farmer OS were talking to each other," says Aaron.

Most importantly, the integration connected to other third-party partners of Supabase, one of which was [Resend](https://resend.com/supabase), which can send emails based on specific interactions. Now, with every transaction, both growers and buyers would receive an email notification. So did Aaron, who fulfilled these early orders himself (“I delivered half a pig once—which is wild,” he says).

This speed gave him the confidence to approach investors, knowing he already had a fully functioning product, albeit basic. Given the urgent struggles of the farming community, condensing this process was vital.

## [The future of Planet Food](#the-future-of-planet-food)

Today, Aaron’s focused on adding capabilities to make Planet Food even more responsive to user needs—from a Farm OS speech-to-text feature that helps farmworkers add inventory themselves, to a Restaurant OS feature allowing chefs to create an order by uploading a photo of their ingredient list. And with 1,200 farms having registered their interest in Planet Food, he’s also working on refining the signup and onboarding flows, and overhauling the delivery process. To achieve all of this, Aaron will bring on a lean team, but continue with an AI-first approach.

Arguably his most ambitious plan, however, is Eat Local BC Day, a two-day food celebration set for September 2026 at Vancouver’s biggest sports venue, BC Place Stadium. “It’s about making people more aware of local food and buying from local farmers,” says Aaron.

It’s been a whirlwind eight months since Aaron and his girlfriend sat in a barn listening to the plight of BC farmers. He’s certain this wouldn’t have been possible without AI. “Figma Make allows founders like me to build the things we’ve always dreamed of building,” he says. In the past, you needed capital, a team of engineers, and a lot of time just to drum up initial support. That made ambitious ideas—particularly ones that tackled underappreciated, often-neglected challenges like this one—almost impossible to bring to life. That’s no longer the case. “Thinking big,” says Aaron, “is not the limitation anymore.”

[![Abstract pastel gradient background with bold white text reading ‘Software is culture.’](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGAgP/xAAeEAACAgICAwAAAAAAAAAAAAABAgADBBETUhIUQf/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBQb/xAAcEQACAQUBAAAAAAAAAAAAAAABAgADERITUQX/2gAMAwEAAhEDEQA/AOFeFRdkKjgVr2HyO8XBpoAJy+VE0VEVsASCZguyl/E6h0Czvg5uBH+mqaciJTe3TCS3K/YwlGycmf2Dk//Z)![Abstract pastel gradient background with bold white text reading ‘Software is culture.’](https://cdn.sanity.io/images/599r6htc/regionalized/57b6af26ff5cd8f3f078ee2b37717f435b54822c-1920x1080.jpg?w=1920&h=1080&q=75&fit=max&auto=format)](https://www.figma.com/blog/software-is-culture/)

Explore [Software Is Culture](https://www.figma.com/blog/software-is-culture/), a collection of stories tracing the impact of design on how we think, feel, and connect.