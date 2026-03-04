---
title: "Finding an accessibility-first culture in npmx"
source: "https://piccalil.li/blog/finding-an-accessibility-first-culture-in-npmx/?ref=main-rss-feed"
publishedDate: "2026-03-03"
category: "css"
feedName: "Piccalilli"
author: "Abbey Perini"
---

Back in January, I found myself longing for an accessibility-first culture and for a while, I’ve also been looking for ways to learn senior-level accessibility skills. I expected to find one of those needs, but not _both_, when I joined [npmx](https://npmx.dev/) on a whim. Today is the [alpha release of npmx](https://npmx.dev/blog/alpha-release), and I’m happy to share how they’ve already exemplified an accessibility-first community.

It’s hard to put into words how lonely it is when you’re the only person ensuring that there aren’t click handlers on generic elements. I’ve come to accept that the bar for “accessibility advocate” is just “still cares about accessibility in spite of it all.” I’m used to being the only one giving accessibility feedback when joining a new project. It’s exhausting having to explain the same small issues over — the same issues that are easily caught by automated accessibility testing tools. Sometimes, it’s tempting to just delete the repository and start over.

When you know anything about digital accessibility, you know that compliance doesn’t always have to be a never-ending slog of fixes. It _can_ be baked in from the start.

![A purple and yellow cupcake You can't sprinkle eggs on the cupcake after baking it. Fixing accessibility later is messy, slow, ineffective! “Later” and “messy, slow, ineffective”](https://piccalil.b-cdn.net/images/blog/npmx-eggs-slide.jpg?auto=format&w=1500)

Stef Walter’s AxeCon talk, [How to Convince People to Care and Invest in Accessibility](https://www.deque.com/axe-con/sessions/how-to-convince-people-to-care-and-invest-in-accessibility/)

In many ways, I am lucky. At work, my recommendations are respected and my coworkers want to learn. When I come across hard questions, I can always reach out to former coworkers from my previous job at a digital accessibility company. When I need someone to check my assumptions, I just talk to the accessibility expert friends who always support me. I’ve never asked for permission to fix accessibility issues or build accessibly because accessibility has consistently improved the user experience, that’s worked in my favor.

Recently however, I got the chance to catch up with some of my former coworkers. There was a moment when I said “I don’t know if the automated captions are better or worse.” One of them responded “Yeah, they’re really wrong - a live captioner would be a lot better.” I closed my eyes, leaned back in my chair, and sighed “It’s nice not to have to explain.” Then, I remembered how nice it was to have a live captioner in our meetings. The next week, I started looking at expensive certifications. I wanted a reason to start learning deeply about accessibility again.

[Advert![Save 20% on all the courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

When I joined npmx the next month, I was curious and hoped I’d get to learn from brilliant developers. At [VueConf 2025](https://vueconf.us/), I had learned that [Daniel Roe](https://bsky.app/profile/danielroe.dev) wrote a script that automatically registers an [npm package](https://docs.npmjs.com/packages-and-modules) every time he buys a domain. I figured he’d probably know a thing or two about npm.

From an accessibility standpoint, I was expecting more of the same. I assumed I would still be the only person insisting “accessibility is a right, not a privilege.” Explaining that screen reader users use several lists of things to navigate a webpage: links, headings, [landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/). That’s why your `<header>` should be outside of `<main>` and your link text shouldn’t all be “click here!”

Inside the [npmx Discord](https://chat.npmx.dev/), I didn’t expect to see a dedicated accessibility channel. I was delighted to see automated accessibility tests when I opened up my first pull request for review. There were other people already hard at work making sure there were no click handlers on generic elements. I started to feel things that I hadn’t felt since working in digital accessibility full time.

Immediately, I started learning deeply about accessibility again. Some things were small, like HTML’s struggle with headings inside `<details>`/`<summary>` but I was also getting to have the big conversations about architecture and design that I missed having. I didn’t even have to explain what a [VPAT](https://rightbadcode.com/accessibility-conformance-reports-setting-expectations) was. Most importantly, our conversations are being treated as important. If there’s a possible accessibility issue in another conversation, accessibility experts are tagged in. It’s all filling a bucket I hadn’t even realized was empty.

Of course, there are things we weren’t able to fix before the alpha release — that’s how software is: perpetually unfinished, never 100% accessible — but I don’t have to justify a fix with a business logic bug because we’re already auditing. Earlier this week, someone asked how the accessibility channel felt about accessible color contrast. I had already typed out a justification for sufficient color contrast before I realized it was an invitation to review a pull request.

[Advert![Save 20% on all of our courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Wrapping up with some tips for building an accessibility-first culture](#wrapping-up-with-some-tips-for-building-an-accessibility-first-culture)

For many reasons, the first step is writing documentation. In your onboarding documentation, encourage developers to install [accessibility linters](https://dev.to/steady5063/automated-accessibility-part-1-linting-5378). Document the accessibility problems you’ve already solved, patterns for interactive controls and colors that have sufficient contrast together.

Tests are another form of documentation and useful for preventing regressions and always use [accessibility testing tools](https://docs.cypress.io/app/guides/accessibility-testing). Write your components and types in ways that enforce accessibility. An `<input>` should always have a label, so the `labelText` prop for your component with an `<input>` should be required, right?

Think of accessibility concerns as early as possible, such as in the design and planning phases. Accessibility auditing is part of quality assurance (QA). If you have the budget, pay accessibility testing experts to do manual testing and also, testing with users with disabilities. When accessibility experts raise concerns, **take them seriously**. Also celebrate the little wins — sufficient color contrast and [alt text](https://accessibility.huit.harvard.edu/describe-content-images) mean a _lot_ to a lot of people.

Finally, respond with humility when you get it wrong, because you _will_ get it wrong. Use those moments as learning and improvement opportunities because your ultimate goal _should_ be inclusion. It makes a lot of sense listen to the people who are excluded.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_