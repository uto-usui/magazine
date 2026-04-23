---
title: "9 Accessibility Myths and Pushbacks (And How to Answer Them)"
source: "https://stephaniewalter.design/blog/9-accessibility-myths-and-pushbacks-and-how-to-answer-them/"
publishedDate: "2026-04-22"
category: "design"
feedName: "Stephanie Walter"
author: "Stéphanie Walter"
---

Reframes, evidence, and practical strategies to help designers convince teams to invest in accessibility.

Many designers care about accessibility. Developers do too. Tech people in general care. **Caring about accessibility is easy. Convincing others is the hard part**. You raise accessibility in a meeting. Then people push back. “We have no disabled users” “We’ll fix it later” “Branding won’t allow it”. It feels like you fight the same battles again and again. Friends, you’re not failing, you’re just having the wrong conversations.

This article is a text version of the talk [How to Convince People to Invest in Accessibility as a Designer](https://www.deque.com/axe-con/sessions/how-to-convince-people-to-care-and-invest-in-accessibility/), that I presented at axecon 2026 (you can register for free to access the video). It’s targeted towards designers, but, hopefully, can help other roles. I go through **9 usual pushbacks designers** often face, when **advocating for accessibility**. And I will equip you with the tools to answer: how to **reframe**, what **evidence** to use (business outcomes, hard data, real examples) and **strategies** to set up. And I’ll end with real actual actions you can take tomorrow.

## Misconceptions About Disability

The first pushbacks I usually have to deal with, are linked to misconceptions people in tech and around, have about disability and disabled users.

### “Disabled people don’t use our website.”

A lot of people are convinced that disabled users don’t use their website. They’ll claim things like “We don’t have disabled users, so we don’t need to make our website accessible” This is a myth. And it’s one of the most frustrating ones to hear.

#### The reframe

There is **no real way to know if a user is disabled**, unless you ask them directly or run a survey. So how can anyone be so sure? Statistically, you do have disabled users.

But analytics won’t show you who gave up on your website because it wasn’t accessible. Those people are invisible in the data. They just left.

![Not all disabilities are visible or disclosed. Illustration of a yellow and purple rainbow labeled Rainbow of Disabilities with the words auditory, cognitive, learning, neurological, physical, speech, and visual written along the rainbow’s bands.](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-3.jpg)

Sidenote: you can [get the rainbow of disabilities as a sticker on my shop](https://shop.stephaniewalter.design/b/disability-rainbow-stickers)!

#### The data

Around 1.3 billion people experience significant disability worldwide. That’s 16% of the world population. One person in six. The odds are high that some of them visit your site (You can use [the world health organisation as a source for those numbers](https://www.who.int/news-room/fact-sheets/detail/disability-and-health).)

Let’s also not forget that not all disabilities are visible. Not all are disclosed. So again, how would you know?

#### The strategy

The strategy I use here is education. Stakeholders and people with decision power need to **understand how disabled people actually use the web**. Show your team videos of people using the web, with different disabilities. W3C has a great resource for that: [Stories of Web Users](https://www.w3.org/WAI/people-use-web/stories/) It’s a collection of user stories from people with different disabilities. Ade is a reporter with limited use of his arms. Ian is a data entry clerk with autism. Lakshmi is a senior accountant who is blind. Each story comes with a short video.

Send those to your team. Let people see the reality. Even better, if you can: show videos of disabled people using your own products.

### “No one complained about accessibility!”

Once people accept they probably do have disabled users, the next pushback shows up. “If it was broken, users / clients would have told us by now. So it must be fine!”

#### The reframe

Users **can’t complain if they can’t even use your site**. They don’t send feedback. They just go to a competitor who built something accessible.

#### The data

![2/3 Transactions abandoned by blind users because of lack of accessibility. 6.9 Billion dollars lost to competitors each year because of inaccessible website.](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-1.jpg)

The numbers back this up. [A Nucleus Research study from 2019](https://manuals.plus/m/f1a24326a132f0af6e1ddfa528862ee18b766f1d4b8937c253101139ad91b75a) showed that 23% of transactions on e-commerce websites were **abandoned by blind users because of accessibility issues**. That’s $6.9 billion lost to competitors every year. And that’s only blind users. So, yeah, users won’t complain, they’ll just go elsewhere! Inaccessibility is a revenue loss risk!

#### Inclusion builds loyalty. Inaccessibility builds the opposite.

Let’s also not forget that people talk. **The disability community is quite loya**l. When we find something accessible, we recommend it. [Freespoons](https://freespoons.co.uk/products/) is a good example. It’s a collaborative site where disabled people recommend accessible products and services to their community.

![Screenshot of the FreeSpoons website displaying accessibility solutions with a grid of recommended products and services, including Laundry Heap, Loom, Notion, Morphy Richards Soup Maker, Todoist, and Lubluelu robot vacuum.](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-2.jpg)

Disabled people recommend products and services to their community.

The opposite is also true: when a product is inaccessible or a brand does something harmful, we tell others to avoid it. For example: [Sonos’s 2024 app redesign broke screen reader accessibility for blind users](https://mosen.org/sonos2024/). After backlash, they began fixing issues. They committed to including blind testers. But trust was damaged.

#### The strategy

The strategy here is to **tie accessibility to the KPIs your company already tracks.** Customer satisfaction, retention, conversion. Find the metric your stakeholders care about. Then connect accessibility to it. And remember: silence is not satisfaction.

## Short-Term Thinking: Responsibility, Cost & Timing

The second category of pushbacks I face quite often comes from short-term thinking. People argue about who is responsible, how much it costs, and when to do it. These pushbacks feel very different on the surface. But they all share the same root: people don’t see the long-term cost of ignoring accessibility early.

### “Fixing accessibility is the developers’ job.”

People will claim things like “We can fix accessibility in the development phase. Designers don’t need to worry about it.” This is a very common one. And it’s wrong.

#### The reframe & data

![Bar chart titled IBM System Science Institute Relative Cost of Fixing Defects, cost of fixing defects by phase, with four vertical bars labeled Design 1x, Developement 6.5x, Testing 15x, Maintenance 100x](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-3-1.jpg)

Yes, you could wait for developers to fix accessibility issues. But **at what cost**?

[An IBM study on the relative cost of fixing defects](https://www.researchgate.net/publication/255965523_Integrating_Software_Assurance_into_the_Software_Development_Life_Cycle_SDLC/figures?lo=1) shows exactly what happens when you wait:

-   Fixing a problem during development costs 6.5 times more than catching it in the design phase.
-   Wait until testing, and it’s 15 times more.
-   Fix it after launch, during maintenance, and it’s 100 times more expensive.

Accessibility is not a defect in itself. But when designers skip it, it becomes one. Bad contrast, missing labels, poor hierarchy; these are design decisions. If designers don’t catch them early, developers inherit them late. And **late fixes are expensive**.

If you need more data: [Deque has a study on how 67% of accessibility issues originate in design](https://www.deque.com/blog/is-closing-the-web-accessibility-design-development-gap-a-bridge-too-far/)

#### The strategy

**Make accessibility a shared responsibility**. Add clear checkpoints at each phase of the workflow. Here is how each role can contribute:

-   Product and project managers can define accessibility requirements at project level. They can make accessibility part of the definition of done in an agile environment.
-   UX researchers and UI designers can involve disabled people in research and usability testing. They can check for accessibility issues in mockups and fix them early.
-   Developers ensure the technical accessibility of pages and components.
-   UX writers and SEO specialists can help with accessible content, heading levels, and alternative text.
-   QA testers can check that pages and components work with assistive technologies.

Accessibility is a team effort. It doesn’t belong to one role.

### “Accessibility will slow designers down.”

People will claim things like “Accessible design means more documentation work for designers, we don’t have time” I think it’s actually the opposite.

#### The reframe

Clear **documentation actually prevents misunderstandings**. It avoids reworks and saves time in the long run.

Think about what happens without it. Let’s take an example of my dropdown component. Developers often get minimal documentation: here’s the component, in 3 states, closed, open, done.

They wonder: How does this thing even work??? With a mouse? A keyboard? When this is not documented, they have to come up with it themselves.

Not documenting doesn’t save time. It just moves the work to the next person. And might create confusion and misunderstanding along the way.

#### The strategy

![Strategy: Put designers and developers around the same table, so that they can discuss such requirements.](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-13.jpg)

Designers don’t need to document everything. That’s not realistic. What we do need is to **sit down with developers and talk through the requirements**. The documentation is the result of that conversation. Not a one-way handoff.

What to do? Put designers and developers around the same table. That table can be a Figma file, a Zoom call, a Jira ticket. Whatever your team uses to communicate. The goal is a shared understanding of how complex components work. Accessibility included.

For more on the topic, check [an interesting reflection on why an annotation kit won’t solve all your accessibility problems by Eric Bailey](https://ericwbailey.design/published/accessibility-annotation-kits-only-annotate/).

### “Accessibility is too expensive.”

People will claim things like “We don’t have the budget right now.” Sometimes they drop the “right now” entirely, going “We don’t have the budget”. Period.

#### The reframe

The real question is: “is accessibility too expensive, or is skipping it from the start what really costs you money?”. Really, think about it for a couple of minutes.

#### The data![Infographic with three concentric circles in purple shades and matching statistics from the text. Outer circle: 13 Trillion dollars in annual disposable income. Middle circle: 3.3 Billion potential customers added by their friends and family. Inner circle: 1.85 Billion emerging market of people with disability.](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers14.jpg)

Let’s again talk numbers, from [The 2020 Return On Disability Report](https://www.rod-group.com/research-insights/annual-report-2020/), because stakeholders love numbers.

-   Around **1.85 billion people worldwide live with a disability**. This is an emerging market larger than China.
-   Add their friends and family, people who make purchasing decisions based on emotional connection to a disabled person, and you reach **3.3 billion potential customers**.
-   That’s **$13 trillion in annual disposable income**, according to the 2020 Return on Disability report.

You are **losing potential revenue by excluding these users**. Accessibility opens new markets.

#### The strategy

Find out what business KPIs your stakeholders care about. Conversion? Revenue? ROI? Customer acquisition? Connect accessibility to that metric. Speak their language.

For example: if your stakeholders care about ROI of initiatives specifically, bring this [Forrester Research study from 2022](https://www.forrester.com/report/The-Six-Steps-For-Justifying-Better-UX/RES117708). It showed that every $1 invested in web accessibility and UX brings back $100. That’s a 99% return on investment.

### “It’s not our priority now. We’ll fix it later.”

“We need to launch. We’ll fix accessibility next quarter. Next release. If someone complains.” I’ve heard this so many times. And every time, “later” never comes.

#### The reframe

![Illustration of a cupcake with text next to it that reads: You can’t sprinkle eggs on the cupcake after baking it. Fixing accessibility later is messy, slow, ineffective!](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-5.jpg)

Let me get one thing straight: you **can’t sprinkle the eggs on the cupcake after baking it**. The cupcake will crumble. This is exactly what we’re trying to do when we push accessibility to the end of a project. **Fixing accessibility later is messy, slow, and ineffective.**

Maybe you can’t convince stakeholders with a cupcake analogy. Here’s another one that tends to bring some impact: You wouldn’t fix security later. So why skip accessibility?Treat accessibility like security: non-negotiable from day one.

#### The legal risk of not fixing accessibility

Also, this “Later” can become very expensive. And very public. Let me bring you a few real examples, to convince people.

In 2019, [a blind user sued Beyoncé under the Americans with Disabilities Act](https://www.theguardian.com/music/2019/jan/04/beyonce-parkwood-entertainment-sued-over-website-accessibility). Her website had no alternative text on images. The lawsuit claimed the site prevented visually impaired people from learning about tours, buying tickets, and accessing merchandise. Yup, even being Queen B doesn’t give you a free pass when it comes to accessibility!

An **overlay solution won’t save you from a lawsuit** either. An e-commerce company selling glasses thought it would. They installed an overlay on top of their inaccessible site, but a blind user still couldn’t access it. They sued. During the case, an accessibility expert documented all the barriers that remained, even with the overlay running. The company settled. They had three years to rebuild their accessibility strategy from scratch. Check [The ADA lawsuit settlement involving an accessibility overlay by Sheri Byrne-Haber](https://uxdesign.cc/important-settlement-in-an-ada-lawsuit-involving-an-accessibility-overlay-748a82850249) for full details.

And if you are in Europe: the European Accessibility Act came into force in June 2025. This is no longer just for the public sector. E-commerce websites, online banking, telecom services, transport ticketing, streaming platforms, and video-on-demand services are all required to be accessible. Products like smartphones, ATMs, and e-readers too. If your service is based outside Europe but sells to European customers, it still applies to you.

And if you need resources on the EAA, here you go:

-   [The European Accessibility Act: what businesses and app developers need to know](https://abra.ai/blog/the-european-accessibility-act-what-businesses-and-app-developers-need-to-know)
-   [Understanding the European Accessibility Act (EAA)](https://tetralogical.com/blog/2025/03/19/understanding-the-eaa/) 
-   [The European Accessibility Act for websites and apps](https://martijnhols.nl/blog/the-european-accessibility-act-for-websites-and-apps)
-   [European Accessibility Act (EAA): Top 20 Key Questions Answered](https://www.deque.com/blog/european-accessibility-act-eaa-top-20-key-questions-answered/)

#### The strategy

Reframe **accessibility as risk management**. You wouldn’t skip security testing before launch. You wouldn’t ship something with known vulnerabilities and hope no one notices. So why treat accessibility differently?

**Including accessibility from the start is a proactive risk management strategy**. Fixing issues before a lawsuit or a public backlash is always cheaper and safer than reacting after. Don’t wait for a lost customer or a legal notice to make it a priority, start embedding it early in the project.

And remember: legal compliance is the floor, not the ceiling. The goal is to bring a great UX for everyone. Accessibility isn’t just about compliance, it’s about dignity.

## Design and Complexity Myths

The last category of pushbacks I want to talk about is linked to design and complexity myths. These ones are close to my heart, because they hit designers specifically.

### “Accessibility ruins creativity.”

People claim things like “We can’t innovate anymore. It will make everything look the same. Accessibility kills creativity.” I could retire if I had a euro for every time I heard that one.

#### The reframe

We already accept usability constraints as part of our job. We also accept technical constraints. Accessibility constraints are no different. **Constraints are part of design.** And accessibility constraints can actually **inspire better solutions for everyone.**

#### When accessibility drives innovation

![Photo of a google voice assistant with the title and a screenshot of GOV.UK Accessibility in government webpage titled Text (digitised) and videotape, with the title.](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-11.jpg)

Two examples: voice control, from independence for disabled people, to personal assistants and beyond. And transcripts: accessibility that works for everyone (and SEO too).

Let me give you two examples of innovations that were designed and developed for disabled people, that reached the general population: **voice control and video transcripts**.

We take voice control for granted now. But did you know it was originally developed for users with mobility impairments, so they could control their devices without a keyboard or mouse? The technology improved. Big tech saw broader potential. That same innovation became the foundation for Siri, Alexa, and Google Assistant. We went from a tool for independence to a technology everyone uses daily. More on this topic: the Dictation Software section of [Disability Pride Month: The Origins of Assistive Technology](https://blog.usablenet.com/disability-pride-month-the-origins-of-assistive-technology).

Another example: video transcripts. The UK Ministry of Defence added them to help colleagues with disabilities. They quickly became a favorite for everyone. Staff used them to skim content, save time, copy information, or avoid wearing headsets.

[What started as an accessibility feature became a usability boost, and even helped with SEO](https://accessibility.blog.gov.uk/2025/03/13/text-digitised-and-videotape-video-transcripts-help-everyone-not-just-people-with-access-needs/).

#### The strategy

Don’t present accessibility as a constraint. Present it as a **way to challenge people to think of innovative solutions**. A creative brief. Ask your team: how can we solve this in a way that works for everyone? The answer might end up benefiting a lot more people than expected.

### “We need to prioritize brand identity over accessibility.”

I’ve been in situations where people would claim “the yellow is not accessible. Branding will never allow changing colors”. We spend soooo much time discussing and validating colors in certain places, that the idea of just adapting them, brings fear to people.

#### The reframe

When you change some colors, to ensure sufficient contrast, **you are not changing the brand. You are expanding it**. There is a big difference. You are **creating accessible color palettes and design tokens for digital use**. That’s not a threat to brand identity. That’s brand maturity.

#### Bring good examples of accessible branding

![Screenshot of design system color palette swatches showcasing different color combinations of green, pastel pink, pastel peach, yellow and light blue, with wise banking app mockups, and a montage of how the colors are used in their new identity.](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-7.jpg)

Wise did a great job when reworking their digital brand with accessible colors

Hard data is tricky here. But real-world examples work just as well.

Wise reworked their digital brand with accessibility in mind. They built a color palette with bright green, pastel pink, pastel peach, yellow, and light blue. The combinations work nicely. And they made it work across their app, logo, and all brand touchpoints. [The result kills the myth that yellow and pastels can’t be accessible](https://wise.design/foundations/colour). It’s not about specific colors. It’s about how you combine them to ensure the right contrast.

If you want more yellow examples, [The Grenoble Metropole](https://www.grenoblealpesmetropole.fr/)’s website has a very high accessibility grade, and they do use yellow as the primary color.

And on the very specific topic of “yellow is not accessible”, I wrote an article about exactly that: [Yellow, Purple, and the Myth of “Accessibility Limits Color Palettes”](https://stephaniewalter.design/blog/yellow-purple-and-the-myth-of-accessibility-limits-color-palettes/)

#### The strategy

When you hit this wall, **reframe the conversation**. You’re not redesigning the brand. You’re building an accessible digital extension of it. Propose a parallel accessible palette with design tokens. Show examples like Wise. **Make it feel like progress, not a threat.**

### “Accessibility is overwhelming.”

“It’s just too complex. There are too many rules. Too much to do. We don’t have the expertise and don’t know where to start.” This one is hard, because honestly, I get it. It can feel overwhelming, especially if you’re starting from scratch.

#### The reframe

It’s hard to accept, but **you can’t fix everything at once**. And that’s okay. Focus on progress, not perfection. Start small. Build on top of that.

#### The strategy

Here is the thing: you don’t need a top-down mandate to start. As a designer, you are already in a position to **bring change from the bottom up.** You can start a grassroots movement. And let it grow. And that’s exactly what the last part is about.

## Designers, YOU can start a grassroots movement

We often think that change needs to come from the top. Leadership buys in. A mandate comes down. Everyone follows. But that’s not the only way it works.

As a designer, you are already in a position to bring change from the bottom up. You don’t need a title. You don’t need a budget. You just need to start.

### 1\. Start Small. Pick one thing you can do tomorrow

Not a hypothetical future tomorrow, but the actual tomorrow. It’s like going to the gym. The hardest part is starting. Once you do one thing, you build on top of it. Here are a few ideas.

#### Show your team how people use the web with assistive technologies.

![Screenshot of the webpage Web Accessibility Impact Perspectives Videos: explore impact and benefits of accessibility featuring assistive technology for everyone, with perspective videos on how disabled people use the web. Screenshot of the TetraLogical YouTube channel featuring videos on the topic of browsing with assistive technology. Currently a video is playing with a demo of a screen magnification in the bottom right corner. ](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-8.jpg)

Show your team how people use the internet with different assistive technologies

Go to your team and **show them how people navigate your site using only a keyboard, or with a screen reader**.

Not there yet? No problem, [W3C has Web Accessibility Perspectives videos](https://www.w3.org/WAI/perspective-videos/), short clips that show why different people need keyboard navigation, captions, good contrast, and more. [Tetralogical’s YouTube channel](https://www.youtube.com/@TetraLogical) has demos of people browsing with assistive technologies like screen magnification. The goal is simple: help your team see real human needs behind the accessibility requirements.

#### Include people with disabilities in user research.

Include **people with disabilities in user research**, before you start building anything. When you schedule exploratory interviews or usability testing sessions, actively look for participants with disabilities. Understand the challenges they face in your product before a single pixel is designed.

Resources on the topic:

-   [Conducting Accessibility User Testing: Expert Insights – The A11Y Collective](https://www.a11y-collective.com/blog/accessibility-user-testing/)
-   [Unlocking Accessibility: User researchers share their approach to digital accessibility and recruiting people with disabilities](https://accessibility.blog.gov.uk/2025/01/07/unlocking-accessibility-user-researchers-share-their-approach-to-digital-accessibility-and-recruiting-people-with-disabilities/)
-   [User Research with People with Disabilities](https://www.sheribyrnehaber.com/user-research-with-people-with-disabilities/)

#### Fix contrast issues in your mockups

![Screenshot of gluten free pizza recipe in native mobile app on left showing pizza image ingredients and orange button next to color contrast checker on right passing WCAG for white text on orange button with 5.6:1 score for regular text](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-9.jpg)

Fix one small thing on mockups (like contrast)

Audit your mockups and pick one thing to fix. Often **contrast issues** are the first, and easiest to fix. Use a contrast analyser tool to check if your text has enough contrast against its background. If they don’t, change background or text color. Good, one step in the right direction.

If you need help, check my article [How to check and document design accessibility in your mockups](https://stephaniewalter.design/blog/how-to-check-and-document-design-accessibility-in-your-figma-mockups/)

#### Document alternative text for icon-only buttons

While you audit your mockups, check for places where you have **buttons with icons but no visible label.** Because a screen reader user has no idea what they do. Pick one. Document what it should read. Tell your developer. Then document the next one. And the next one. Step by step.

#### Integrate accessibility barriers in user journey maps

![Left: a simplified version of a user journey map divided into Phase 1 Phase 2 Phase 3 with user goal scope, actions / tasks ,access experience line graph showing stars and peaks and opportunities for features and improvements.Right: photograph of a workshop for accessibility journey mapping with some accessibility barrier cards mapped to different points in the journey that is described with sticky notes. ](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-10.jpg)

Integrate accessibility barriers in user journey maps

We usually map goals, phases, tasks in journey maps. What if we also mapped the **accessibility experience**? Where do users with disabilities hit walls?  
For example, I ran a workshop with a library, where we mapped all the accessibility barriers students face when borrowing a book, across every touchpoint. Take your existing journey maps. **Add the barriers. Make the invisible visible**.

* * *

_If you are interested in such an exercise, I’m available to run a remote or in person version of my new [Accessibility User Journey Mapping Workshop](https://stephaniewalter.design/accessibility-user-journey-mapping-workshop/). Accessibility is often added after the journey is already mapped. In this hands-on workshop, I will teach designers and project teams how to embed accessibility barriers directly into a user journey maps, across digital, physical, and human touchpoints. You know me, I love cards, so of course I created a dedicated deck of “accessibility barrier cards”.  It’s available as a 2-hour intro or a 6-hour applied session, in English and French._

[Check out my Accessibility Journey Mapping Workshop](https://stephaniewalter.design/accessibility-user-journey-mapping-workshop/)

* * *

#### Run a usability testing session with a disabled user.

**Include disabled users, when you run usability testing sessions**. You could run a session on a specific journey. For example: can someone complete your checkout process using only a keyboard? No mouse. Start to finish. We often test accessibility technically. But do we check if people can actually accomplish a full journey?

### 2\. Build Momentum. Celebrate wins and share progress.

Once you start, don’t keep it to yourself. Share what you did. Make progress visible. Celebrate small milestones, a contrast fix, a first accessible component, a usability test with a disabled participant

Public appreciation builds accessibility champions. It spreads momentum. Other people see it and want to be part of it. **Momentum is contagious.**

### 3\. Grow the Movement. Slowly increase the pace, add new initiatives.

Once you have some wins, **bring in more people. Train them. Add new initiatives.** Increase the pace gradually.  
But don’t try to do everything at once. This is the mistake I see most often. People want to start and immediately fix everything, bring in consultants, and launch a full accessibility program. The energy is great. But if you try to grow too fast without those small seeds planted first, you will burn out. Your team will burn out. And the movement dies.

This is **a marathon, not a sprint**. Forty-two kilometers, not a hundred-meter dash. Pace yourself.

## Beyond the business case: accessibility is a universal right

![Accessibility grows revenue, protects your brand, and sparks innovation.Accessibility is an essential universal right! And, it’s the  right thing to do!](https://stephaniewalter.design/wp-content/uploads/2026/04/accessibility-pushback-designers-12.jpg)

Most of the pushbacks you’ll face can be answered. You now have the tools to do it. When the argument is about money, show the numbers. Accessibility grows revenue. It opens markets. It protects your brand from legal and reputational risk. It sparks innovation that ends up benefiting everyone.

But I also want you to remember this. All the business cases, the ROI figures, the lawsuit examples, those are tools to convince people who need that kind of argument. They are not the reason accessibility matters. **Accessibility is a universal right. It’s not a nice-to-have**. It’s not a feature for later. It’s the right thing to do. It’s about making sure that everyone can do what everyone else can do, every day, without barriers.

So go. Pick one thing. Start tomorrow. Build on it. And don’t fight these battles alone.

Also, if you want to present this talk at your company, a meetup, or an event, online or in-person, reach out. I’d love to do it!