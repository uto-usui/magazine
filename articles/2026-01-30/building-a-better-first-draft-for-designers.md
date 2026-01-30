---
title: "Building a better First Draft for designers  "
source: "https://www.figma.com/blog/figma-ai-first-draft/"
publishedDate: "2024-09-24"
category: "design"
feedName: "Figma Blog"
---

September 24, 2024

We’re reintroducing our Make Designs feature with some key improvements, including a new name—First Draft—to better reflect our goal of giving designers another way to get started.

There's a lot of tedium along the journey of bringing great designs to life. Even if you have a pretty good idea in your head of what you want to make, you still have to navigate so many hurdles just to get to that first draft, kick off a productive discussion, or push an idea forward. There’s _a lot_ we’d like to do to make this journey smoother in Figma, and we believe AI offers so much potential to help you express what’s in your head in new and exciting ways.

###### How First Draft works

First Draft doesn't train on customer content. It uses off-the-shelf AI models (like OpenAI’s GPT-4 and Amazon Titan) with three key elements: model, context, and prompt. The context includes proprietary mobile and desktop design systems with numerous components and assembly examples. Users input their design goals as the prompt. The AI then selects, arranges, and customizes design system components based on these inputs, creating a starting point for designs.

At Config 2024, we announced over 10 [new Figma AI features](https://www.figma.com/blog/introducing-figma-ai/) in limited beta to explore what it might look like to accelerate the whole process from idea to production, while helping to elevate craft along the way. One of those features was called Make Designs, which allowed you to generate a first draft of a basic design from a simple prompt. Shortly after launch, we learned that an issue with the feature’s underlying design system resulted in mocks that too closely resembled existing apps, so we [disabled the feature](https://www.figma.com/blog/inside-figma-a-retrospective-on-make-designs/) until we could confidently correct the problem.

Today, after extensive analysis, iteration, and testing, we're reintroducing the feature in limited beta under a new name: First Draft. This new name is actually an old name—our original, internal project name—and one we think better reflects our intent: to give designers a simple jumping-off point. We’re also introducing some key updates, like letting you choose from one of four libraries depending on your needs—whether it’s a wireframing library to help you sketch out less opinionated, lo-fi primitives, or higher-fidelity libraries to provide more visual expressions or patterns to explore. This offers a looser, more exploratory counterpoint to the utility of our [Visual Search feature](https://www.figma.com/blog/introducing-figma-ai/#find-exactly-what-you-need-with-enhanced-search), which allows you to search your Figma files via prompt or image to find existing files or components. We see First Draft as just one more way to explore the option spaces and help bring the ideas in your head to life.

![An image of a UI module showing options for generating basic designs in First Draft](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvklEQVQ4jY2TS0/bQBRG+f8/AAqVWh5SpSJV6oZC1eemUsOOlnaFSgHHseM4tuN5ejxzKk8gEl0kLI4+ezQ+ur4zdythhyTscMd2zCTsMQ77pP7wniPScLTMFYeM/T5JeP74W3bYeix8xsQfM+u+MTcXzO0Flf1B3f1c4pY5rJXddzL/hiTsrhPuMvXvaO0tSrcRqRYxbadwvaFzGttpZDdh5j/EKtcI9yj8+7jZGIvWBiEkUiq6zuF9wHsf0/qS0n9mvFl4RmvHKCURQtA0NU3ToJTCWnOPRXY5s/7j5gqn/SkLndAKwWLRUlUVdVVF+SDVekAjTEbxJKE/Y2FShDIIqWhbgZQyVuWcW6Fdwcx/2vzLg7A2KY1QtFIjlY6yoXchhBVdmFOGdT0M2yTskfenZM0Vd/mEoq6QajiQpRDCiicLs/6EtP7NzeSaaZUj5AJtRLwyzluMs2jXoX1OGTZem12y/i2lvmQubmnUmFZPaM0EaXMak3PdTPlTF5TmisKfxDatnZTUv6JwX5h3I8oH7Ci+Z2bEr/qcy/qc1Hwl8683TcrDLL+Is/qIcEDiD7jpD/jrhueXce//s/wP3aCyCacTMvgAAAAASUVORK5CYII=)![An image of a UI module showing options for generating basic designs in First Draft](https://cdn.sanity.io/images/599r6htc/regionalized/ce1d50ea89373586d1ac89ba6f20a04af58c2bfd-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

You can choose from one of four libraries—ranging from lo-fi wireframes to high-fidelity sites or apps.

Our vision is for First Draft to extend beyond our current libraries and allow organizations to incorporate their own custom libraries. In the future, teams will be able to draft ideas using their company's unique design language without having to sift through hundreds of components by hand. We’re developing this proof of concept with industry-standard design systems like Google Material 3, to show how building with more powerful, code-backed components could help product teams iterate in lock-step. In this way, we see First Draft as a powerful extension of your existing toolkit, allowing you to not only find the exact jumping-off point you’re looking for, but to also open up the option spaces to start crafting your next big idea. As always, we will be focused on gathering feedback and learning from you as we continue to evolve this together.

_Figma AI, including First Draft, is available in limited beta; we will be rolling it out to users gradually over the coming months. Learn more [here](https://help.figma.com/hc/en-us/articles/24919293730327-How-do-I-get-access-to-UI3-and-AI-features)._

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcCAwUG/8QAIxAAAgEEAQQDAQAAAAAAAAAAAQIDAAQFEQYHEyIxMkFxof/EABUBAQEAAAAAAAAAAAAAAAAAAAMA/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECETESQf/aAAwDAQACEQMRAD8Al9wJbG1WW2jEjMwUb9An7qg8dxl1HBE17Jbydxd6iHx/a43GsHfZ8vDaRbVRssw8Qa9jxfHZiW/lx8kZ70KEiPQAP5Qy6TVYNBQcJXpk2PjJ8k2aVvuJngmaObaSKdMp9g0paAOn0dcjApoDyY7OvdUOKCODOW08ShZGQqxH2KUpfCIz1IuJE5hfBG0Ng/ylKUb0j//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/7484a1712d7b7eb955a7f096d434333f94088a77-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

> Noah Levin is the Vice President of Design at Figma, overseeing the product design, UX writing, research, and design ops functions.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)