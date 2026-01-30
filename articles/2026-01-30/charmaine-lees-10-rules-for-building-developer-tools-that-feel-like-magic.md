---
title: "Charmaine Lee’s 10 rules for building developer tools that feel like magic"
source: "https://www.figma.com/blog/charmaine-lees-10-rules-for-building-developer-tools/"
publishedDate: "2024-06-07"
category: "design"
feedName: "Figma Blog"
---

The first product Charmaine Lee ever loved was an unassuming code editor in Neopets that let her personalize her profile with custom colors, fonts, and images in real time. Fast forward several years, and the software engineer–turned–product manager has loved many other tools for developers like the Slack API, Unity, and of course, Lens Studio by Snap AR, the AR experience builder she’s working on now. “These are all dramatically different tools used for very different purposes,” says Charmaine, “but the thing that unifies them is a feeling of _magic_.”

The problem with magic, of course, is that it’s not easy to define—and even harder to replicate. According to Charmaine, it’s tempting to judge the merits of a product based on its UI, but this is, in fact, a trap. “Even the most experienced product managers occasionally forget that a sleeker design doesn’t necessarily equate to a better product for users,” she says. So what _does_ it take to build a developer product that feels like magic? Charmaine gives us her guiding principles.

## [1\. Put less emphasis on the first-time user experience (FTUE)](#_1-put-less-emphasis-on-the-first-time-user)

What makes or breaks a developer product is what happens _after_ the “aha moment,” or the pivotal moment when a new user realizes the value of your product. Too often, we overload the FTUE with all the complexities of a product in the hopes of sparking an “aha moment” and turning the acquired user into an activated user. We get so caught up on nailing conversions that we forget the real goal, which is empowering them to truly understand and use the product. When we launched the public beta of [Lens Studio 5.0](https://ar.snap.com/lens-studio-5.0-beta), we omitted the FTUE altogether. This forced us to ensure that the product felt intuitive enough to use without a fully guided onboarding process.

> What makes or breaks a developer product is what happens after the ‘aha moment,’ or the pivotal moment when a new user realizes the value of your product.

## [2\. Focus on accelerating your users’ time to magic](#_2-focus-on-accelerating-your-users-time-to-magic)

What’s crucial is the time it takes for users to ditch the training wheels, so to speak, and learn to ride the bike on their own. It’s about ushering them to the magical moment where they’re not just users—they’ve become creators. They’re proud of what they can build with the tool, and can’t wait to share it with their communities. On our team, we illustrate the user journey on FigJam to see all the elements that prop up or follow an “aha moment,” identifying what sparks delight, what needs improvement, and what’s missing. In the case of Lens Studio, we realized there were about 19 steps from downloading the app to submitting a first project, so we started trimming. We also chose to not invest in actions that user testing showed us were surprisingly intuitive.

![A screenshot of a FigJam file shows a 19-step developer journey, stickies with notes from user testing, and a final four-step FTUE.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAABYlAAAWJQFJUiTwAAABOklEQVQokVWMiW7jMAxE/f+/WGALpDlsORJl3baOt3DSdrEkHjgcDDkVf5CtJZmZJAvJapIownrFLVeiViTzIOovtuWKuV9x6kGS5ysbngtuvpD0nZocU3YHXgKihU0sabMUuxJWhVYaox0iG2I0ss7I445VGm89bgvop2WdFd5oas5MR2mIZD6XxF3vZB+osuCV4bIUPtTB57PyZ83clpVtnjFrRNvKais3vXNfEyKJPR9MvXWsP/hQO1+mkeNODY68ZRbpXMzgYQdXacwmEm0gukqIAxcHNgw23wmhspfK1HvH58JNAg8JWOdJKVGPxnEMyjF+50mrg37SoLdBa7y8F60z9dEJJaI2YRaNkhUXHe28OGuMb079lm/9478Z37welrrj94grAV8C+Sic/vvuX/g/fvp3f9dfn3AdLIVvFRsAAAAASUVORK5CYII=)![A screenshot of a FigJam file shows a 19-step developer journey, stickies with notes from user testing, and a final four-step FTUE.](https://cdn.sanity.io/images/599r6htc/regionalized/a632f3151250a55d91f9ebe10d34c0f7877d2dff-14821x5024.png?rect=0,4,14821,5016&w=390&h=132&q=75&fit=max&auto=format)

In FigJam, the team audited a 19-step user journey from landing on the Snap AR website to submitting a lens.

![A screenshot of the same FigJam file zooms in on the revisited FTUE, which has been trimmed down to four steps.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABmklEQVQokaWSW2/TQBCF8/9/D5QKCmmDRJBSJCIoJLETt2lix5ddr70XXxLrQ07SUpB44uFIu+eMPs1oZhBXgtClqFbjuvq/VHctA31wqL2hPFhM5zBddZbD7C1mbzDP2ZPO+R/11RE6qLrm+OmBuZOkYktWxKhGI4xiG2eEeYlsLNIKknRNqiJUUyJtX78hK3aoWmEOjkFP1Z0jbw3Bg8/tzTumX8ZsZEKQlXz+ljGeFSyFZnnvMRm+YToZ8ZhuWAZzbm/e8nXykYfdClXlT8AKUWt+eHOuLi4YXV/jRyGBLJgsUsbznHlScuf7DC8v+TT6gL8N+D674/3rV4yGV3jrxXHC5w6zuiCIN/z0ZiyWPo8yYacjQnHPOolYS8GDSPBXPquVd5xgnW5YeFP85YwoT9F7ewYeHKKShCpipxLSQpIYReZihN2SFBGhiomtItOSTGUktiCtBEKHZGWKrA3291IcRauRVY6sS1RjUK09bj/v/bpAVIq80afsRa7aEtUair07bbm/nf5hu+ov9d5L/cs/qWf0zf0CsW+oVjXRjocAAAAASUVORK5CYII=)![A screenshot of the same FigJam file zooms in on the revisited FTUE, which has been trimmed down to four steps.](https://cdn.sanity.io/images/599r6htc/regionalized/6ae97e7a4acf0f2f80ef2853e32a437ac9e77c2d-3456x1568.png?rect=1,0,3454,1568&w=804&h=365&q=75&fit=max&auto=format)

The revisited FTUE focuses on four key moments.

## [3\. Meet your users where they are](#_3-meet-your-users-where-they-are)

Developers are surprisingly social creatures, and they love to gather at conferences, meetups, livestreams, and hackathons. I make it a point to immerse myself in these environments: I go to every AR meetup possible, travel for hackathons, check the _Lens Studio_ keyword on X every morning. Doing so helps me speak our developers’ language and get candid, real-time feedback on ideas my team is working on. My superpower as a PM is having the time to build massive context comprising every dialogue that’s ever occurred about our tool, and being able to retrieve insights to inform product decisions.

## [4\. Replace traditional marketing with developer relations (DevRel)](#_4-replace-traditional-marketing-with-developer)

Developers are allergic to traditional marketing. Here’s what they value: an authentic voice that resonates with their own experiences, granular stories about building the product, transparency and a willingness to own up to mistakes, and a balance between accessibility and technical terminology. While designated DevRel teams often shine at companies, DevRel should be everyone’s job. When we’re all responsible for evangelizing our product and advocating for the needs of our users, we build a loyal community. At Snap AR, we encourage team-wide participation in events like [Lens Fest](https://ar.snap.com/lens-fest), our developer conference, and social platforms like X, where we post project demos, share product hacks, answer questions, and ask for firsthand feedback.

## [5\. Break down work silos to create a seamless user experience](#_5-break-down-work-silos-to-create-a-seamless)

When shipping a product or feature, it’s easy to lose sight of the larger ecosystem. From the core product to documentation and support, every element should feel integrated, so individuals on those teams should be working together to create a consistent experience. In the past, we’ve had problems with losing context around known issues and edge cases, and confusion around routing users to the support team versus the DevRel team. Now, everyone who works on our AR authoring ecosystem—including product, design, engineering, documentation, and support—reports to the same manager. This has worked wonders in terms of ensuring we’re all aligned, but there are other ways to encourage transparency and accountability across the team.

## [6\. Ship fast, and ship often](#_6-ship-fast-and-ship-often)

It may seem counterintuitive, but being less precious about what you ship helps you arrive at a more polished product. We used to have a rigorous process of holding features until they were much more refined, but this delayed getting user input. Shortening our six-week release cycles to two weeks has fundamentally shifted the way we work, allowing for quicker iterations and improvements because we get features into the hands of developers right away. [Presenting work in progress](https://www.figma.com/blog/welcome-to-the-wip/)

encourages people to give honest feedback. We collect that through [a portal powered by UserVoice](https://snap.uservoice.com/), which drops messages in our internal Slack, so we can discuss before responding.

> Being less precious about what you ship helps you arrive at a more polished product.

## [7\. Empower your users to help each other](#_7-empower-your-users-to-help-each-other)

To reduce your developers’ reliance on the product development team for support, create spaces on forums, Discord, and X where they can collaborate and help each other. Offer open-source repositories where they can contribute to and customize functionalities to meet their unique needs, and enable plugin development so they can extend the product’s capabilities.

## [8\. Blur the boundaries between design and development](#_8-blur-the-boundaries-between-design-and)

As evident with the rise of design engineers, developers are starting to flex their design skills, and designers are learning to code. Leverage the power of AI and collaborative tools like Figma, which can help bridge the gap between technical and non-technical skills, to encourage areas of overlap on your team and bring more innovative ideas to life. For example, I recently prototyped an ad hoc feature request by duplicating our designer’s Figma file and editing the text, images, and components according to our design system. Our designer, in turn, used Dev Mode to build an AI assistant panel—which leverages documentation, YouTube tutorials, forum posts, and other resources to answer questions about Lens Studio—that worked immediately in production.

## [9\. Do things that don’t scale](#_9-do-things-that-don-t-scale)

Most developer tools have significantly fewer users compared to consumer apps, which means we have the luxury of focusing on first principles instead of solely on scaling up. We can prioritize building strong relationships with our community; instead of just meeting users where they are, we can proactively create spaces for connection through ad hoc meetings, hosting workshops in schools, and providing personal support through Discord. It also allows us to build solid foundations by refining the core functionality, usability, and performance of the tool rather than rushing to add new features.

## [10\. Make space for play—your users will thank you](#_10-make-space-for-play-your-users-will-thank-you)

When the people building a product have fun, it [translates into delight for users](https://www.youtube.com/watch?v=nqHIDavoeiU). Embrace quirky details like ASCII art hidden in code, or [shaking the cursor to get a high five](https://help.figma.com/hc/en-us/articles/1500004290981-Stamps-emotes-and-high-fives). When I worked at Unity, the team scheduled extended reality (XR) hangouts every Friday, treating them as headset field trips for play and exploration. We also used this time to stress-test products and gather candid feedback. In a recent brainstorm, we dropped our most outrageous ideas in a FigJam and voted on our favorites. Building off each other’s ideas on stickies, stamping hearts, and drawing smiley faces created a safe, low-pressure environment to share and collaborate.

![Five stickies of different sizes suggest ideas like, “Add Valentine’s candy hearts to the asset library for V-Day,” and are covered with heart stamps.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAACF0lEQVQokXWS30/TYBSG93d7a2KiXonRRCMKRoUQNYgSWWCBMRhjc7DVuQ3GJutcR0tX2Prja7+v3WNQIGDixZOT9+I8OTl5U77vY5om3W4XvdvFskyEECRJTJIklzO+kW8TX3KVU0opgiBg7LqMxi6uHyAiSSQVUirUDS6ylJJIRdcoKf+iFHEck7qwXixbrqRphWgDwXczpGVLzGHE0BDYeoDdE9iDgN7QpuH8pOa0OXA6mE4f4Y//SK+FQaTYNwQzZYep/ClPiucs/BDs1QWNrXOq6VO01SG1vE2mrvGivsjj2jzTjY9sdDaxzga3hV6oyOuCR9s291YNHq6bzBbP2Sl5VFZGZOd10m8aZJfbvC/vcLfyijvfnnK/9JYP1Sxt/YTAvXlhKKnoLnMFk5n1HvMbx6RzHeq5Podpm8xcjbmXGVaW9/hcLTDVeMeD2izPS19ZympoxVMcI0Kpqx+KEON4QHG3xdpWi41ck+p2DSPfxMw00ZZKZL/sUi4dUq5XWNOWWNAWeFb9xOtCjnxBx9JDlLwUqihEWBbOUQej2abf7GB1eoy6A/xmm7NaC7NtYg1GWP1fGEdVSq1NZluLTB8skz9s4ViC+OrCWClUGKICH+W5SM8lCgRRGCJ9H+n5SBERhZJICELPxTjrUzypsH2yT8cxCIKIJE5ITSaTWyX9X3n/zZGSeKHHOHQRKiROYibJhN+uuuAhpq9yUgAAAABJRU5ErkJggg==)![Five stickies of different sizes suggest ideas like, “Add Valentine’s candy hearts to the asset library for V-Day,” and are covered with heart stamps.](https://cdn.sanity.io/images/599r6htc/regionalized/195474726e07b3a47cf875af6bf7beffe7590998-2144x1056.png?w=804&h=396&q=75&fit=max&auto=format)

We zoom in on some popular stickies from a FigJam brainstorm session.

It helps to keep the bigger picture and potential impact of the product in mind. Every morning, I wake up excited that I get to work on AR—the ultimate magic that extends the human experience—alongside an energized team. I’m grateful that I get to shape a technology that has the potential to bring me closer to my family, who lives across the globe, to deepen relationships with my closest friends, and to elicit a sense of play and wonder.