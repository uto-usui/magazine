---
title: "Config 2023: Reimagining where teams design and build together"
source: "https://www.figma.com/blog/config-2023-recap/"
publishedDate: "2023-06-21"
category: "design"
feedName: "Figma Blog"
---

Today at Config 2023, over 8,000 members of the Figma community came together and many thousands more virtually. The last time we connected in person was at our first Config, in February 2020. Since then, the world around us has shifted and Figma’s product, company, and community have all undergone a tremendous amount of change.

Our vision is to build a new kind of design tool—one that is designed for the entire product development team. Today's launches reimagine how design and development come together in Figma. I'm excited to introduce three ways we're doing this: making developers feel at home in Figma with Dev Mode, connecting design to the language of code with variables, and putting a step in between a 2D design and a shipped product with advanced prototyping. We’re also launching an improved auto layout, an upgraded font picker, and updates to the file browser to help everyone work better in Figma.

## [Making Figma better for developers with Dev Mode](#making-figma-better-for-developers-with-dev-mode)

Design systems have served as a shared language to help narrow the gap between design and development. The gap exists because we're optimizing for very different things when we're designing and developing. In the design process, you optimize for rapid iteration and ideation; you’re trying to get an idea out of your head as fast as possible. And as you get closer to production, you have to think not only about how something looks and works, but also how it will be maintained, re-used, and composed. To date, Figma has been purpose-built for the design end of the spectrum, but it’s time we focused on development as well.

We're introducing Dev Mode to bridge design and development and make developers feel at home in Figma. Dev Mode is a workspace in Figma that brings the structure and functionality that developers need to do their work in Figma's infinite canvas. With Dev Mode, developers can:

-   Understand and translate designs to code faster
-   Connect to their tools and codebase with plugins including [Jira](https://www.figma.com/community/plugin/1220802563996996107/Jira), [GitHub](https://www.figma.com/community/plugin/1220512233196109878/GitHub), and [Storybook](https://www.figma.com/community/plugin/1056265616080331589/Storybook-Connect)
-   Track what needs to go to production
-   Inspect files alongside where they code with Figma in [VS Code](https://help.figma.com/hc/en-us/articles/15023121296151)

Dev Mode is now in beta and available to everyone for free through 2023. [Learn more](https://www.figma.com/blog/introducing-dev-mode/)

about why we built Dev Mode, and [take a look](https://www.figma.com/dev-mode/) at all the features and post-beta pricing.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADPElEQVQokS2QW0yTZwBAi4DcWhSF2OEuMtAxB5OYgZglwGAIlmrLAFtsuZQiaLVQ5FK5TOpEqHIrTRilRWXKTEw0bstiYnxasmUvS5bsxUTHls1tOmEItCAy/u8s23w6bycnR2ao+1uqPbUsLI4Axx1+YelepP70HDX2JxjqZzCcmOXIucfYO39jqOoRY7o/Gdf/xUT5Epf0z5nQrTBwLIDtTICq9lVkpuZnUrdrUYxf9uO9vCD6vNMcHbjDAcso2QedZBVfIM88gLrcib7QSUXRELWacewltxnSPeBj4yLnTvo50ftCaLYHpEH3grh10c9V30/C6v6EPfZa4vPSiXktgZikJDanpxD37i6Uqky2VuWzraaI3ToD5YeG6TD/QFvXPHV9y1S2riKraQlIPV3zwtc1g91xW+xurESuTSXkbSVBcZEEbQpnXWIM69U7iOjMQu5WIR9REd2Zyw7jB2gMk5ganlDZtMbh2jVk1c1LUkf7U3G29T5ay3kRW5xBaEESYepkQrMTCN6+meA344gwv4PCVUS0V0u0R0tUfwGbjuSQru6kpHQanR7KSiVkptYlyTH4VPQNfI/qcINQpCUQmp9IpHUvEda9hOYkEJL2EhH1Gcj7C5EPq1CMqIk6v4+N9VnsKmhCo75HWTGUasW/D5ckl29RfDp1j7q2dqHMTiY4PZ716mTCNDv/kwW/EUu4MQ35wH4UXi0KXzFRznxiK3LILPiIUs0v6EoEh4rXkNXal6TRiYC48/nPjF4ZE3nHVWxIeZlgpYJ1SjlBG8MIio0kJPMVwo/tIao3H0XvPuIa3yPDYMRU+QWNxllsxt+xVt//v3DI6xdffjbDzZvfii6ni9wDel5/K4MtCanEbU1hy7adxKem8GpuBom690mt1KCqs/Ch4xpe50M8tseMN9zFbZ9CVmVbkU5d8ItBzyLDYzOiZ+gB1o6vKKu7TmHJFAX7JzGUd9Ni09PSYuToyR4s7ddw9H+NZ/JXJr0LXD37kCvddxk+fR1ZefWaVGV9LszNK5ibV17wGSbbMoaaVUwVc7gdk3x3I49vbh3EdekGbeOPaPPN0+ad44xnFp/nD0ZHpmlq/5F/AJ6E/jM6ogRrAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/a313056d03f6e2734d587ee87c5a38c23936f8e5-5569x3132.png?w=5569&h=3132&q=75&fit=max&auto=format)

## [With variables, design systems speak the same language as code](#with-variables-design-systems-speak-the-same)

Teams rely on design systems to support all the different ways a product needs to be designed. While structure helps create consistency, it’s often at the expense of providing flexibility to designers when they need it. As products have grown more sophisticated, design systems have become increasingly complex as they flex to support everything—multiple themes, platforms, products, brands, and more. Design systems managers are forced to solve this complexity with multiple libraries, large sets of components, and bespoke plugins. And yet none of their designs are connected to code.

> Something that can be simple is not always simple at our scale. When you want to change some button spacing or you want to change iconography, we are affecting millions of lines of code, over ten products.

Lewis Healy, Senior Product Designer - Design Systems, Atlassian

Tokens are features that our community has long asked for. Today, we’re launching variables, a more holistic solution to streamline the process of creating designs. Variables are adaptable for many use cases:

-   Color, number, text, and boolean variables that store reusable values and can be applied to designs for theming and tokens
-   Aliasing and scoping support to contextualize variables for the whole team
-   Variable modes with different values (e.g. light and dark) that can be toggled to change between design themes
-   Plugin and REST API support for variables to help you scale creation and management  
    

## [Using variables in prototyping to bring designs to life](#using-variables-in-prototyping-to-bring-designs)

As product teams face more pressure to ship high quality products with fewer resources, prototyping and testing is more important than ever. But to date, prototyping in Figma has been time-consuming and complex. We heard stories of users building prototypes that were impossible to edit or resorting to other tools. Other times, they’d skip this process entirely and wait until designs were coded to see how they came to life.

> There’s so much that goes into designing a feature. A static image can only convey so much, so when you build something and an interaction is triggered in your own hands, it’s kind of revolutionary.

Jackie Zen, Senior Product Designer, NBCU

Using variables, designers can easily create and update more dynamic prototypes. This makes it possible to test out the full experience early and often, so teams can understand how an infinite set of static design ideas work in reality and choose the best ones. Like an Excel formula, prototyping interactions can now reference and modify variables via mathematical expressions and conditional logic (e.g. you can specify “each click changes number variable _x_ to _x+10_,” or “navigate to _frame 1_ if variable is _x_, otherwise navigate to _frame 2_”). Prototyping is both more powerful and simpler than ever. Plus, a new inline preview helps you iterate more rapidly and instantly playback your design.

Today we’re introducing:

-   Advanced prototyping features with variables, conditions and expressions
-   Usability updates like in-context editing and inline preview, to edit designs and preview prototypes in the same view

## [Work more efficiently with quality of life updates](#work-more-efficiently-with-quality-of-life-updates)

We’re always listening and iterating, and we know that new features and improvements can make a big difference in your day-to-day workflows. Here are the latest updates to simplify how you work in Figma:

-   An improved auto layout, including the ability to wrap and set a min/max height/width
-   An upgraded font picker so you can search and filter for the fonts you’re looking for and easily preview font names in their own font
-   Updates to the file browser so that you can more easily find files and projects shared with you by external teams  
    

## [Investing in the future](#investing-in-the-future)

### [AI: The next chapter in design](#ai-the-next-chapter-in-design)

As a technologist in 2023, I can’t write about the future without mentioning AI. Here’s how I see AI impacting design: It will help people express themselves visually. It will accelerate your workflow. And it will enable anyone to create a good first draft. But going from a good draft to a world-class product still requires _you_.

We’ve been building our ML team and investing in early development for some time now. To accelerate this investment, I’m excited to share today that we’ve acquired Diagram. Diagram was founded by Jordan Singer, a long-time member of the Figma community who has built 3rd-party AI-assisted tools on our platform for years. Diagram’s tools make design feel magical. We’ll work with Diagram to [deliver AI capabilities across the entire Figma platform](https://www.figma.com/blog/ai-the-next-chapter-in-design/)

.

### [Building a digital-first future for every student](#building-a-digital-first-future-for-every-student)

The future needs more thinkers and builders, and AI will enable more people to answer that call. That’s why our Figma for Education program is so incredibly important to us. It’s something we’ve been investing in since the early days of Figma. We've always been committed to offering all Figma products for free to any student or educator. This is something we'll do forever.

Last year, we [announced a beta partnership with Google Chromebooks](https://www.figma.com/blog/figma-chromebook-next-generation-of-designers/)

to bring Figma and FigJam to students (ages 13+) in classrooms. We worked with 50 schools and 10K students around the country to learn about their unique needs. Today, we’re

[moving that partnership to General Availability

![Students sit together beside a laptop ](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGB//EACMQAAICAgEDBQEAAAAAAAAAAAECAwQABQYREyExMkFRYXH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAQT/xAAaEQADAAMBAAAAAAAAAAAAAAAAAhEBEiFB/9oADAMBAAIRAxEAPwBZt+XxUuMu9O1DV2LyqhVvco+SPvJuvyW5unaKxbeWWGcLFP8A3Ifsx3NhEtle4OpHnKvh9Cq2xeExDtK4IXqfXDZMty+lRtVsNSfZpARFfVTYQAMyjw37hiXYyOltwrdBhmmAH//Z)![Students sit together beside a laptop ](https://cdn.sanity.io/images/599r6htc/regionalized/bac38be5cf9cea2d75ade36cff69527fb096fc34-3840x2160.jpg?w=3840&h=2160&q=75&fit=crop&crop=focalpoint&auto=format)

### Building a digital-first future for every student

After a year of exponential growth and a successful beta, Figma and Google for Education are doubling down on the promise of bringing design and technology tooling on Chromebooks to K12 students across the US and Japan.





](https://www.figma.com/blog/building-a-digital-first-future-for-every-student/)

, so any classroom in a US school district can use Figma, for free. And for the first time, we will expand our program to include students of all ages across the US and Japan, where we introduced Figma’s first localized UI.

I can’t wait to see what these next generation of designers—and all of you—think and build for our future world.