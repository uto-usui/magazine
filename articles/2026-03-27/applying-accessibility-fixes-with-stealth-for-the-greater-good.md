---
title: "Applying accessibility fixes with stealth for the greater good"
source: "https://piccalil.li/blog/applying-accessibility-fixes-with-stealth-for-the-greater-good/?ref=main-rss-feed"
publishedDate: "2026-03-26"
category: "css"
feedName: "Piccalilli"
author: "Steve Frenzel"
---

Accessibility had never really played a significant role since I started working as a front-end developer in 2019. It didn’t have a significant role in my boot camp, or in YouTube tutorials I watched, and certainly not in my job.

At some point I got very invested in accessibility, because it was the missing link for me in my profession. Suddenly, the things I built not only looked good, but they also worked as expected when using a keyboard and a screen reader. Slowly, practicing web development with accessibility in mind became the new normal for me. Unfortunately though, [accessibility is still far from normal in the tech industry](https://webaim.org/projects/million/#errors).

Before I get into the craft, technical aspects and how to sneak fixes in, I would first like to address that a major inspiration for this piece was [The Accessibility Operations Guidebook](https://dpersing.com/book/) by [Devon Persing](https://dpersing.com/).

## [Ableism (in the tech industry)](#ableism-in-the-tech-industry)

If you haven’t heard this term before, here’s a summary from the [Wikipedia on ableism](https://en.wikipedia.org/wiki/Ableism):

> Ableism \[…\] is discrimination and social prejudice against physically or mentally disabled people. Ableism characterises people as they are defined by their disabilities and also classifies disabled people as being inferior to non-disabled people.

In the following, I will try to use my own experiences to illustrate when I have encountered ableism during my job.

### Medical model of disability

Whenever I brought up the topic and pointed out barriers, it was assumed that these barriers arose or existed because people with disabilities were using the product. So the fault lies with the people, not the product.

This is the [medical model of disability](https://en.wikipedia.org/wiki/Medical_model_of_disability), which assumes that people, rather than their environment, are the problem:

> This model links a disability diagnosis to an individual’s physical body. The model supposes that a disability may reduce the individual’s quality of life and aims to correct or diminish the disability with medical intervention.

As long as you can operate everything with the mouse and you can still somewhat recognise the light grey font on a white background with font size 10, everything is fine, right? This attitude is ableist because, among other things, it excludes not only keyboard users but also people with poor, or even _no_ vision.

People with disabilities don’t use the product anyway, so why invest time and money to make it accessible to a few blind people, right? This attitude is also ableist, because in Germany alone, the [official number of people with severe disabilities](https://www.destatis.de/EN/Themes/Society-Environment/Health/Disabled-People/_node.html) is 7.9 million, and the real number is very likely much higher. From an economic point of view alone, it makes no sense to ignore the potential purchasing power of these people.

[Wikipedia explicitly addresses this very attitude](https://en.wikipedia.org/wiki/Medical_model_of_disability):

> In ableist societies, the lives of disabled people are considered less worth living, or disabled people less valuable, even sometimes expendable.

This ableist attitude is reflected in statements such as “We don’t have any customers with disabilities.” or “We don’t have any blind users, so it doesn’t need to be keyboard-accessible.” These and many other myths are debunked on the [Accessibility Myths Debunked](https://a11ymyths.com/) website. Fortunately, there is also a counter-model for this, namely:

The [social model of disability](https://en.wikipedia.org/wiki/Social_model_of_disability) is summarised as follows on Wikipedia:

> The social model of disability proposes that people are disabled by systemic barriers, negative attitudes, and social exclusion, rather than by their own physical or mental differences.

Here, we recognise that the problem is not _people_ with disabilities who can only use the product to a limited extent or not at all. Instead, it shows us that _we ourselves_ have created these barriers through our ableist attitudes.

This realisation can lead us to start making real changes and improvements, starting with the people, through the tools we use every day, to the product we create.

My personal recommendation is always to start with the [six most common problems](https://webaim.org/projects/million/#wcag) and then continue with the [Easy Checks](https://www.w3.org/WAI/test-evaluate/easy-checks/). Many so-called “low hanging fruits” can be detected using automated tools such as [ARC Toolkit](https://www.tpgi.com/arc-platform/arc-toolkit/), [Axe DevTools](https://www.deque.com/axe/devtools/), and [WAVE](https://wave.webaim.org/). This makes it easier to document and fix problems at the beginning before tackling more complex issues where these tools reach their limits.

However, we still need to dig deeper to understand why this article you’re reading right now, exists in the first place.

With a few exceptions, the teams I work in have been, and continue to be predominantly white and male. This is certainly also due to the fact that I live and work in Germany, which is why I asked my friends who also work in development how diverse their working environment is.

Their situation is similar to mine (they also live and work in Germany), and they too have noticed that female colleagues are more likely to be found in the design, marketing, and management departments. In development, however, their colleagues are also predominantly white and male, which brings me to the next topic:

[Advert![Save 20% on all courses, using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Battling against ableism in the tech industry](#battling-against-ableism-in-the-tech-industry)

In her essay [White Supremacy Culture](https://www.whitesupremacyculture.info/), Tema Okun touches on many topics that overlap with my professional career as a front-end developer. Lots of companies seem to have embodied and implemented these awful characteristics and from what I can tell, this seems to be the default behaviour. The [Wikipedia article on her essay](https://en.wikipedia.org/wiki/White_Supremacy_Culture#Contents) lists 15 characteristics, of which I will quote three that I have experienced myself:

> **Sense of urgency:** Emphasising speed and immediate results at the cost of thoughtful reflection or long-term solutions.

Who among you has been told that there is no time or money to make the product accessible? Or that it will be done later because it has to go live now due to pressure from management and/or stakeholders?

This [move fast and break things](https://en.wikipedia.org/wiki/Meta_Platforms#History) attitude leads to products reaching the market that were created for the majority but exclude minorities. In addition, in the long term, it can lead to enormous time and cost expenditures if accessibility is only considered at the end of the cycle.

If [companies shift to the left](https://www.deque.com/blog/design-code-thinking-accessibility-ground/) instead and work according to the motto [“Slow is smooth. Smooth is fast.”](https://piccalil.li/complete-css/lessons/5) they will not only aim to create the most inclusive product possible, but also offer added value in other areas:

-   You reach a larger customer base
-   The risk of being sued can be vastly reduced or even completely eliminated
-   By focusing on accessibility, product quality and employee mindset can be greatly improved

The whole team is responsible, not just the development team. We can only make lasting changes and avoid making people responsible if we take a comprehensive approach that includes everyone.

> **Quantity over quality:** Prioritising “things that can be measured” over things that cannot, such as relationships and conflict resolution.

It is now (for better or worse) normal for websites to measure where people click, how long they watch videos, whether they skip certain sections, and so on. Thanks to automated testing, many accessibility issues can also be recorded as metrics. However, this does not mean that a product is 100% accessible as soon as these tests no longer show any errors! You can [build the most inaccessible website with a perfect Lighthouse score](https://www.matuzo.at/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/), as Manuel Matuzović has impressively proven. Automated tests are an indicator of how compliant something is, but not how well people can actually use it.

That’s why it’s very difficult, if not impossible, to quantify the return on investment (ROI) for accessibility. So-called “invisible wins” are particularly difficult to sell if the focus is not on the structure, but only on the appearance of a product.

If you just click through with the mouse, quality of life improvements such as consistent, clearly visible keyboard focus, landmark elements, and the correct use of [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) unfortunately go unnoticed.

Simply taking these three things into account can lead to more people being able to use the product, regardless of whether they have a disability or not. This can lead to more satisfied customers, who are very likely to recommend the product to others. This can expand the customer base, which in turn can lead to increased sales.

> **Only one right way:** Believing that there is only one correct way to do things, excluding diverse approaches and perspectives.

One of the websites I share most often is [The ideal viewport doesn’t exist](https://viewports.fyi/). It uses real data and practical examples to show us that it no longer makes sense to stick to the rigid concept of breakpoints. How are you supposed to know what screen width a “desktop,” “tablet,” or “phone” has?

Doesn’t it make much more sense to [be the browsers mentor, not its micromanager](https://buildexcellentwebsit.es/)? We have long had the ability to implement [fluid typography and UI](https://utopia.fyi/) that adapts to the respective screen widths. CSS allows us to do this thanks to [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties), the [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) and [minmax()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax) functions, and [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container).

The advantages are as numerous as they are obvious:

-   No need to think up or research arbitrary breakpoint sizes. A design is created for the maximum and minimum width, and browsers take care of everything in between.
-   Realising that the pixel-perfect approach is like chasing the dragon: it’s the pursuit of an unattainable goal. Designs for websites are just paintings of them. [Actual software is alive; it responds, it adapts, it moves, it errors, it loads.](https://adamsilver.io/blog/design-in-code-get-praise/)
-   The amount of CSS code can be drastically reduced because edge cases no longer need to be taken into account. [Cascade layers](https://ishadeed.com/article/cascade-layers/) could then be used for fine-tuning.
-   The code base is easier to read, more robust, and future-proof because these features tend to be used more in the foreseeable future.

Am I making sense here? I think I do! After I made this pitch, however, the reactions were mostly “but we’ve always done it this way” (_love_ this one) or “But what breakpoint sizes do we use then?” in addition to huge question marks above the heads of the respective recipients.

My suggestion to modify a small side project or the current main project according to this principle was often rejected because the concept is too new, too alien and people would have to move out of their comfort zone and adapt their way of working.

After dealing with these uncomfortable topics that need to be addressed and discussed, and perhaps feeling that it is impossible for you to bring about any change, you may ask yourself the following:

[Advert![Save 20% on all courses using the code NEXTLEVEL.](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Why would you do it if it’s not part of your job?](#why-would-you-do-it-if-its-not-part-of-your-job)

Perhaps, like me, you are officially a front-end developer and your contract more or less specifies your area of responsibility. So why should you be doing the work of an accessibility practitioner / designer / engineer? My answer is always: because it’s **part of the work**.

Among all the things that lead from the initial idea to the final website, I don’t see any distinction between ‘normal’ work (i.e. what’s in your contract) and work in the realm of accessibility. Three examples from the top of my head to get my point across:

1.  The work is not done if the thing we are working on cannot be operated with a keyboard
2.  The work is not done if complex widgets do not have a meaningful semantic role and an accessible name
3.  The work is not done if there are problems with colour contrast because the brand colours are always to be used

As already mentioned, accessibility is not yet as normalised as many other topics. But if it is as important to you as it is to me, you will have to ask yourself another question:

## [Why wouldn’t you tell your boss?](#why-wouldnt-you-tell-your-boss)

Here, too, the answer can be complex and individual. A few possible scenarios could be:

### It’s not part of your job description

If your employer thinks that accessibility isn’t part of your job and is something separate, then they’re not entirely wrong. If you’re dealing with this issue at management level, for example, in order to integrate it into all processes throughout the company, it really is a full-time job. But I digress!

Your contract does not explicitly state that accessibility is part of your job, and you don’t want to fall out with your employer. It may also be that you have a very strict employer, which would be another reason to keep it secret.

### “No time and money for accessibility”

One of the most popular myths! This one is also disproved succinctly at [Accessibility Myths Debunked](https://a11ymyths.com/):

> It may not be the case if accessibility is considered from the beginning of the project and a development team has proper skills. When accessibility has become a habit, the **development time doesn’t change** or changes a little.

Unfortunately, that doesn’t change the fact that your boss insists on it and you feel compelled to improve the website behind their back.

### No interest or pushback

> “I don’t give a damn about accessibility, I’m not interested in it! But I think it’s good that you’re involved in it and know about it.”

This is something a front-end developer once said to me. They simply have no interest because they have never used a website with a keyboard in their lives or are firmly convinced [that it only affects people with disabilities](https://tetralogical.com/blog/2025/12/03/common-misconceptions-about-disability/), who are not their customers anyway. Could this be because the website is not accessible? Maybe, but I don’t want to digress again!

They may even react irritably or go on the offensive when you bring up the subject. This can happen very quickly when you show people that they have an ableist approach to an issue. Caution is advised here, because it can quickly become personal. That would be another reason to take a low-key approach to the issue.

Do these scenarios sound familiar, and do you still see it as your responsibility to make the product you are working on as accessible as possible, even though it is not officially your job? Then, in the following sections, we will discuss how to find allies and work with them to create leverage.

## [Culture, climate and power lines](#culture-climate-and-power-lines)

In this scenario, we assume that we will not receive any support “from the top” and will have to organise ourselves like a [grassroots movement](https://en.wikipedia.org/wiki/Grassroots) from the bottom up. For this to work, we need allies, no matter how big or small our company is. This will not only help us to distribute tasks and responsibilities, but also [reduce the potential psychological pressure](https://aaardvarkaccessibility.com/accessibility-without-burnout/) that can come with it.

To understand how we can reach and communicate with the respective people, we need to understand the difference between culture and climate and how we can use power lines for our purposes. The following quotes are taken directly from The Accessibility Operations Guidebook by Devon Persing:

> Organisations are impacted both by their **culture**, which is driven by a minority in leadership, and their **climate**, which is driven by the majority of people in the organisation. Resources, support and information flow through organisations along **power lines**.

She further explains that “organisational culture is formal and systemic”, while “organisational climate is informal, a kind of ‘shared perception’ of the organisation’s day-to-day”.

> **People in official leadership roles create an organisation’s culture.** They communicate this culture to other members through management.

This can be understood as the “official stance of the organisation”, like a mission statement, for example. It is “perpetuated in the same way it is in the larger culture, with ceremonies and rituals (meetings, events) and institutional myths (stories) by leadership.”

> **Climate, in comparison to culture, is less official. It’s a vibe.** It’s the feel of the organisation, how structured or loosey-goosey it is.

This describes “how much freedom workers really have, and how much actual support they have from leadership to try new things or make the workplace better.”

She continues by explaining that culture (top) can obviously can push down on climate (bottom), but that climate can also push up on culture.

One example for the former is “an organisation requiring workers to return to corporate offices with the supposed end of the COVID-19 pandemic, despite public opinion and scientific data supporting the positives of working from home.”

An example for the latter is “the wave of [diversity, equality and inclusion](https://en.wikipedia.org/wiki/Diversity,_equity,_and_inclusion) (DEI) efforts that happened because of Black workers’ need to hold space around ongoing and escalating police brutality.”

> In an organisation, power lines are usually connected to people like managers who represent their teams or departments. \[…\] The way that culture and climate can push each other is a form of power \[…\]

She explains that “power lines are usually connected to people like managers who represent their teams or departments.” and she’s mentioning specialists, meaning people that have a focus on a certain topic, who can “become conduits for these types of lines, too”.

In case of the (accessibility) specialist, she’s warning that it can be “easy to become a bottleneck for other people while you’re trying to do accessibility work across an organisation, even if that’s not your intent.”

With this basic understanding, let’s look at the most important point so that we can successfully sneak in accessibility fixes without telling our boss.

## [Finding allies](#finding-allies)

I’ll be honest with you: I can’t give you bulletproof instructions on how to find allies in your company because it depends on so many variables, including (but not limited to):

-   Your personality, professional experience, expertise, and rhetorical skills
-   The culture and climate in your current company
-   The personality, professional experience, expertise, and rhetorical skills of your colleagues

Instead, I’ll tell you a few anecdotes about how I’ve been able to make a difference in the area of accessibility, sometimes more, sometimes less.

### Being upfront

As I wrote at the beginning, it was only during the course of my career that I began to focus clearly on the topic of accessibility. At a certain point, I made it very clear in interviews (for permanent positions and freelance jobs alike) that I would be concentrating on this area.

My pitch was more or less what I wrote under [_Why would you do it, if it’s not part of your job?_](#why-would-you-do-it-if-its-not-part-of-your-job) I also made it clear that I work holistically and don’t see the topic as my sole responsibility. It affects development, design, management, human resources, and other departments equally.

When I was first introduced to a team, it was mentioned that I was very knowledgeable about the topic and an expert (which is not true, and I clarified that right away). I was also allowed to repeat my pitch in front of the assembled team, which signalled to interested colleagues, “Aha, he’s one of us!” or “Nice, I have a few questions on the topic.”

From that point on, I was “the accessibility guy,” which can have advantages, but also disadvantages, as some colleagues might associate it with something negative. Very often, people approached me proactively afterwards or were very open when I talked about it. Not just developers and designers, but also product owners and marketing people!

### Sharing knowledge

As mentioned earlier, I don’t see it as my responsibility to carry the burden of this issue alone. That’s why I first check the respective communication tool (Slack, Teams, etc.) to see if there is a channel for accessibility so that I can share knowledge.

Unfortunately, in the past, creating this channel and inviting people has not been very effective. Either the topic is too overwhelming for them, or they are not interested because it is not directly related to their daily business. More often than not, I was just screaming into the void, and there was no real interaction except for an emoji here and there.

Since we are pursuing a grassroots movement approach, I recommend instead looking for a channel where knowledge is actively shared among developers and/or designers. Maybe there are even a few people from management in this channel! In any case, this channel must be alive.

Here I often share articles that I read in my favourite newsletters: [Accessibility Weekly](https://a11yweekly.com/), [Web Weekly](https://webweekly.email/), and _of course_ [The Index](https://piccalil.li/the-index/). These sources provide enough material to keep the digital fire burning and share something at least once a week.

### Showing examples

I had the biggest breakthroughs when I showed people directly on the respective product what positive effects improved accessibility can have.

In development, it was for example the use of native elements instead of third-party solutions. Everyone in this department is happy when _even more_ dependencies and potential security risks are not added to `package.json`. Another great example for low effort and big impact: [Landmark elements](https://www.stevefrenzel.dev/posts/x-marks-the-spot-landmark-elements/)!

Even seemingly small things like using headings correctly can have a big impact. Especially after I navigated them with a screen reader and explained why it is so important for users of this software. Some people were amazed that screen readers exist and that content can be consumed in this way!

Using the [Stark plugin for Figma](https://www.figma.com/community/plugin/732603254453395948/stark-contrast-accessibility-checker), I was able to show designers how they can take this topic into account during creation and handover. I even wrote an article about it, [“Fuck off” to hand-off: Holistic web design](https://www.stevefrenzel.dev/posts/fuck-off-to-hand-off-holistic-web-design/).

[Advert![Save 20% on all the courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Different roles require different techniques](#different-roles-require-different-techniques)

I’m an RPG fan, by which I mean Final Fantasy 7 to 12, Dragon Quest, Ni No Kuni, you name it. That’s why in this section I’m introducing four roles (or avatars?) that have specific skills to promote accessibility within the organisation.

Depending on our role in the company, our skills and allies, and how much support we receive from our colleagues, we can take on different roles.

A role also depends on when we join a project. The earlier we become involved, the more likely it is that we will have taken on every role at some point.

### The adviser

This is my personal favourite role, because it allows us to avoid future mistakes and do a lot of educational work.

Is the project supposed to be a simple landing page that won’t really be maintained by the customer, or hardly at all? Then we can advise against using heavyweights like React or Vue.js and instead recommend a static site generator like [Astro](https://astro.build/) or [Eleventy](https://www.11ty.dev/) (now called Build Awesome).

Do your colleagues want to use a UI library to speed up the design and development process? Fair enough, but it should be tested beforehand to ensure that it is accessible and that, in individual cases, [components can be replaced with native HTML elements](https://paulmakeswebsites.com/writing/shadcn-radio-button/).

This stage of the process is also a good time to talk about [progressive enhancement](https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/). Not only does it bring many benefits for users, but it will also increase the skill level of the designers and developers involved.

### The mediator

This role can overlap somewhat with that of an adviser, depending on how open and flexible the designers are, how good our communication skills are, and how much time is available for any changes.

At this stage, designs have already been created and are ready to be handed over to development. Ideally, they will first be reviewed by a developer and only passed on once all changes have been implemented and the go-ahead has been given.

Here, too, we can do a lot of educational work on the topic of progressive enhancement, explain the power of native HTML and CSS, and suggest tools that make the handover even smoother. The goal is to minimise follow-up questions from the development team so that they can get started right away.

The article [Accessibility for designers: where do I start?](https://stephaniewalter.design/blog/accessibility-resources-tools-articles-books-for-designer/) by Stephanie Walter is a treasure trove for exactly this scenario, providing you with the resources you need to support your designers. I also strongly agree that [the time for designers to learn to code is now](https://piccalil.li/blog/the-time-for-designers-to-learn-to-code-is-now/).

### The smuggler

The following example comes from [Amber Hinds](https://amberhinds.com/), thank you for sharing!

> We have clients who really care about SEO, some of whom are legacy clients on marketing retainers. Because there’s so much overlap, we are able to use SEO hours to fix accessibility. We put our Accessibility Checker WordPress plugin on the site to find issues and fix things like empty links, links with ambiguous anchors, headings out of order, empty or missing alternative text, etc. I don’t think that these clients would ever sign up for an accessibility retainer, but because of SEO we can do it.

We often slip into this role when we’re actively working on development and can make various small to medium fixes that don’t slow us down in our main task.

This is not only a good “selling point” for our superiors, but also another opportunity to show our colleagues, using practical examples, that accessibility doesn’t have to be difficult.

During these sneaky fixes, wen can often notice larger, global problems, such as:

-   Insufficient colour contrast and font sizes
-   Poorly recognisable or non-existent keyboard focus
-   Missing or incorrectly used landmark elements

These should at least be documented and, best case, turned into a ticket that can be [dealt with in a timely manner so they won’t catch dust in the backlog](https://intopia.digital/articles/straight-to-the-pool-room-the-pitfalls-of-placing-accessibility-issues-in-the-backlog/).

### The hacker

This role is exclusively for developers and overlaps somewhat with the adviser role. It can be a rather passive role, as we ask, for example, whether an [accessibility linter](https://docs.deque.com/linter/4.0.0/en/using-linter-home) is used in the code editor (very often Visual Studio Code or JetBrains) to identify potential problems during development.

Or whether an accessibility linter can be integrated into a [pre-commit hook](https://typicode.github.io/husky/) so that non-accessible code cannot be pushed in the first place. Another option would be to add this linter to the pipeline.

Regardless of whether it is part of the definition of done (if there is one) or not: as soon as we find potential accessibility issues during a code review, we should at least leave a comment.

Best case, we can mark the respective pull request as “not approved” until the issue has been resolved. However, a delicate touch and open, transparent communication with our colleagues is important here so that they don’t wonder why we have commented on code that is OK for them but not for us.

## [Wrapping up](#wrapping-up)

This article shouldn’t exist. Accessibility should be as normal in conversation as performance, security, SEO, and “AI”. Unfortunately, the tech industry has a big problem with ableism and white supremacy, which is why I wrote this article.

Understanding the culture, climate, and power lines within your organisation can help you find allies so you can organise like a grassroots movement from the bottom up. You can take on different roles to support each other, share knowledge and bring about change without [the man](https://en.wikipedia.org/wiki/The_Man) noticing.

The most important tool when it comes to accessibility is not browser extensions, newsletter subscriptions, or screen readers. They play an important role, but none is as important as the community you have around you. Always make sure you’re on the same page as your allies and that you’re all working toward the same goal, even if you might take different paths to get there.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_