---
title: "How HP powers up design handoff with Dev Mode"
source: "https://www.figma.com/blog/hp-powers-up-design-handoff-with-dev-mode/"
publishedDate: "2024-07-30"
category: "design"
feedName: "Figma Blog"
---

HP, a titan in the electronics industry, faces the challenge of maintaining a cohesive user experience across its diverse offerings, from printers and laptops to gaming systems. To address this, HP developed a comprehensive design system called Veneer and leveraged Figma’s [Dev Mode](https://www.figma.com/dev-mode/) to transform how their teams collaborate and build products. We sat down with HP’s Gilson Hoffmeister, Design Systems Strategist, and Andrei Garcia, Senior Design Manager, to learn how they’re using Veneer and Dev Mode to drive consistency at scale.

[![Contact sales](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAk0lEQVQImSWO2w6CQAxE+VGjInKXZZeLrAJiSPzsHlP2oZnOpNOZKLkgzojYBsoMqTIwNdgHVDkobyrI75DGUKSBOwNNGbTr6dDVK1GWIL1F/AizR2Z/INsCnznsfgANHB2sL/iu8Nth32AaoM5DgDNIpN/bGsYOefbQtcGsh+8poHJtqybVdDRIcbBQaPsbxGfkDyodrDp1sujJAAAAAElFTkSuQmCC)![Contact sales](https://cdn.sanity.io/images/599r6htc/regionalized/681ff46c0596d92030e5a8c09b1f28f6851c79bb-5586x1014.png?w=5586&h=1014&q=75&fit=max&auto=format)](https://www.figma.com/contact/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=Framework)

## [Building a multilayered design system for a complex ecosystem](#building-a-multilayered-design-system-for-a)

“HP is a big company with more than 100 diverse product lines. Each HP product has a unique DNA,” explains Gilson. This diversity posed a significant challenge for maintaining consistency across the company’s digital experiences. Andrei adds, “We had challenges with the many different business units at HP, each doing their own thing and focusing on their own needs. They often worked in isolation without much coordination on how HP should look and feel digitally.”

To address these challenges, the team developed [Veneer](https://veneer.hp.com/). “What began as merely a ‘frontend component library’ has evolved into a multifaceted system that saves time, prevents redundant work, and creates cohesion,” says Andrei. Veneer provides teams with end-to-end support, including a design language, components and patterns, documentation, and a governance model.

![Four cubes arranged diagonally from bottom left to top right, representing stages in a design system. The cubes are labeled, from bottom left to top right: "Design Language" (foundation, connected to HP Brand, translated to tokens), "Components and Patterns" (building blocks available in design and development libraries), "Documentation" (guidelines, principles, components usage, best practices, code standards, code snippets), and "Community and Collaboration" (system evolves with feedback from designers and developers).](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB3klEQVQokW2Sy27TQBiF865ILFiwQ0KCDY+AxAMgQKCC1KIWUWhFIqrCoiW9EAhqE+L7ZTxjO87FDqsPzSRWTMriyDMaz9F3zj+tNK1QqiJNS/NdqyRVJVKVDGVJWy74IP/QkxVCn5n/yxtq3TRbHiSqIlQVjqxou2Me/Qy51wt4Y2U4yZxMg6T67r9qaYpaTaqrqOKTs2DPWvCsL7nbvuDWYZfnfR8rnpKIKXE8MRJiipTzmrDGrZA6TrTADxZ0BjMefFHc+ax4cqZ4fT5i+2JI15L44RjXlVi2wLJiHCchioqVoUbVhkmJa5f0zivOTiv2TwvuHzjc/ujwspcz8AvcIDNmYZjjecqYuq406zheGabRlGKkGF8LBt8k77dDdrZijo5zOj8UB78kPafAD3IcW2DbAs9LCYLcUAkxJUlm68h5P2Sye8Ls1RHu7iWdt9fs7zn0LjOCYILnZ7iuMkYjKzZETTNlJt4YiupaiMc7JA+fIreOsb8HDIcpvlcQaionMT0tu5ImbnMIavPZyN8JwbsTghdt5NcrhJfh+emqmxQ/0KQ5YTg2PSXJ2qymaq5bSs6RXo60FTIsiKPCkOiIvp+aZ9Hs6H+qTZdDaeTXE9cXtcFm2Ztdbe5rwr++IiogS/x0qAAAAABJRU5ErkJggg==)![Four cubes arranged diagonally from bottom left to top right, representing stages in a design system. The cubes are labeled, from bottom left to top right: "Design Language" (foundation, connected to HP Brand, translated to tokens), "Components and Patterns" (building blocks available in design and development libraries), "Documentation" (guidelines, principles, components usage, best practices, code standards, code snippets), and "Community and Collaboration" (system evolves with feedback from designers and developers).](https://cdn.sanity.io/images/599r6htc/regionalized/2e7d79a59d98f0bb9d1b15c746b5480bcd4c14cc-3840x2160.png?rect=2,0,3837,2160&w=1080&h=608&q=75&fit=max&auto=format)

## [Measuring adoption and impact](#measuring-adoption-and-impact)

The team uses a combination of quantitative and qualitative metrics to measure Veneer’s adoption and impact. Gilson shares an impressive statistic: “With our Iconography library, we see that 915 icon components are utilized by 320 teams across HP with an average of 85,000 inserts per week.”

![A dashboard titled "Coverage & Adoption" showcasing Veneer Iconography, version 37.8.0. It includes statistics: used by 320 teams, with 915 total components, and an average of 85k weekly inserts. A graph shows component insertions over time, with top teams listed and a table displaying component statistics, including names, total variants, total instances, inserts, and detaches over 90 days.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABj0lEQVQokW2SzW7bMBCE9SpJkMQwxd8lZckKJDtW0ObHhx7aS2899P3fYIKhREcJchgQXHK/HS63atsWwzDgcDhgHEccj8e8ppSgtYZSCnVdf0hRatY6vqjy3qNpGnRdB8J3u12GOecul4wxsNbmAutkVRP8cYeqeKntWpxOp+yMUBapF3c8d97BS4ANDsZZGGeytJ1lrIFl3NoZyCefz2e8vrzmp8cYZwcrYGgEYSfwDRXmNQW4SHk48bDeodJGo3nYY/g5YZyO2Pc9QgifgNzHJkGS5ES6DUkgTUSIJTZDK2U1tlOLza8R26mDFnfpFYHsC3vKVohI7i1bIlFy71NKeU8FCaiU07h763H1b8L1nwH3fYDS80+y6QSyBUym05xIx0sspZQLUYxXyhncnntc/f+Bm7+P2IwRyugLkG6zo8Udf5srkwskLIUYz0/ePLW4/X3A5nkPJRaqjMUyawVCOEXX5elcSyGqYnKGtAFKltlbQGsgIeu5LKACu8zhd9P+1WG5XM7psrhewxh/BxkQWjawfQtpAAAAAElFTkSuQmCC)![A dashboard titled "Coverage & Adoption" showcasing Veneer Iconography, version 37.8.0. It includes statistics: used by 320 teams, with 915 total components, and an average of 85k weekly inserts. A graph shows component insertions over time, with top teams listed and a table displaying component statistics, including names, total variants, total instances, inserts, and detaches over 90 days.](https://cdn.sanity.io/images/599r6htc/regionalized/55167647f6888514a0af1d87e5cd4884f705a18c-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

The impact on efficiency has been substantial. “From January to December of 2023, we saw that using Veneer saved projects 500% more time compared to what was spent to create it,” Gilson reports. Andrei adds, “According to our VP of Engineering, Gaurav Roy, using Veneer has **cut development time by 50%** for certain projects.”

However, driving adoption wasn’t always easy. Andrei explains, “A significant issue was—and still is—the multitude of sub-brands HP has. It’s impossible to support this scenario with a single-layered design system.” The team had to structure Veneer to be flexible enough to support a multi-brand strategy.

Gilson adds, “Getting designers to use Veneer posed a hurdle because they cared so much about their products and users. When something from the outside tries to touch what they’ve been building, it raises a red flag for them.” The team had to demonstrate how a unified design system could empower designers to focus on more creative and unique aspects of their projects.

## [Enter Dev Mode: Bridging the design-development gap](#enter-dev-mode-bridging-the-design-development-gap)

Figma’s Dev Mode has been a game-changer for HP. “Dev Mode has streamlined the way our developers access these design specifications within Figma, reducing the need for extensive back-and-forth discussions and meetings, and making the transition from design to code smoother than ever,” Gilson explains.

The team has found several features particularly useful:

1.  **Compare changes**: “It’s super helpful for seeing what’s changed from one design version to another, especially when we’re updating our existing products,” says Andrei.
2.  **Ready for development**: This feature allows designers to mark specific parts of the design as ready for implementation, focusing developers’ efforts and reducing confusion.
3.  **Variables**: HP uses variables linked to primitive or semantic tokens, which scale across different themes and modes. “Our Foundation team manages Veneer’s core elements, including leveraging automation to streamline the transition from design to code,” Andrei explains. “They have successfully built a robust bridge that connects design and development by using the Figma API to read these variables directly from the designs.”

![A design component example titled "Breadcrumb" under the Veneer web category, showing different states (default, hover) and properties like font, fill, and padding. Annotations explain design adjustments: default and hover states with specific fonts and fills, increased padding from 8px to 12px, and details on height, width, and gap for responsive versions.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABp0lEQVQokYWSzUvrQBTF8z+6eOCmIA8UXOnChZv3L/gFhW66fWCx8hSKWmyFbltsTV9LS6Ft2kwkTdJ8N+nHkXs1QVAw8MudkJkzZ+4ZaTKZIEFVVRiGAcdx4DouPNeD7/nw/a+4rgtd1zGdTnktVUJKBoSmabAsE6ZpQn+dwdBNzOdzBEGA5XKJ1WqVEkURz1NVNRWkKtFrMBhAlmV0Oh0IITCbzSBUDUJo7MLzPKzXa3x+aAPLslLBBGk0GqFarSKbzSKXy6HRaMB2bD4WCZE7ckOuSJTYbDaI45gFhRAsmh653+8jn88jk8lgd28PpVIJtm0jimMWooXxx5i/lzG7o41IQJZltFot9Ho9KIoCqd1u4/TsHFu/tpHZ+Y1/N7cwLRN+ELDLMAwRLRZcw0WYbkLBNZtNFItFFAoF1Go1DIdDSNS3v5cFHB7/wf7B0bugaaRJsmgQsiOChcOQT9HtdlGpVFAul1Gv10Ht4x7K7f+4ur7ByckF7u8ePtK2+ApRkt9B/6h35IoYj8fvoSRxv7Re8PRYxXPjGRNF4ck/8fnKJaG8AShijiNEehXkAAAAAElFTkSuQmCC)![A design component example titled "Breadcrumb" under the Veneer web category, showing different states (default, hover) and properties like font, fill, and padding. Annotations explain design adjustments: default and hover states with specific fonts and fills, increased padding from 8px to 12px, and details on height, width, and gap for responsive versions.](https://cdn.sanity.io/images/599r6htc/regionalized/7ea41a244a646c9af0811d9f3e9ed3f54fe18a37-2231x1045.png?rect=1,0,2230,1045&w=1080&h=506&q=75&fit=max&auto=format)

## [Code Connect: Reducing context switching](#code-connect-reducing-context-switching)

[Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect) is the developer bridge from your component codebase to Figma. With Code Connect, bring your design system component code directly into Figma’s [Dev Mode](https://help.figma.com/hc/en-us/articles/15023202277399-Use-code-snippets-in-Dev-Mode#01H8CZ5SQRYZE7A36EW1KBWGS1). Preview example components that mirror the framework of your production code.

As early adopters of [Code Connect](https://www.figma.com/blog/introducing-code-connect/)

, HP has seen significant benefits. “Code Connect is the feature that we’ve been most excited about. Setting it up was super easy– it only took one engineer two weeks,” Gilson shares.

The team has gone a step further by automating processes like changes to components. Gilson explains, “We have a source file where all icons are in their ‘editable’ version. We watch for changes on the source file via automation—where we flatten them and create a dictionary with the SVG code, which is used to create our Iconography Figma library, and shared with development to be added to the development libraries.”

The result? “What we love about Code Connect is that it reduces so much of the context switching that developers had to do before,” says Gilson. “Now with Code Connect, they can just click on a component in Figma and see code snippets with all the right settings. This really speeds up how quickly we can develop and integrate Veneer.”

> What we love about Code Connect is that it reduces so much of the context switching that developers had to do before.

Gilson Hoffmeister, Design Systems Strategist, HP

## [Measurable impact and team feedback](#measurable-impact-and-team-feedback)

The impact of Dev Mode has been significant. In a survey of 400 HP employees using Dev Mode, the team found:

-   80% of respondents saw an efficiency gain
-   90% agreed that it increased their quality of work
-   On average, users saved 98 minutes per week from reduced context switching

Developers have praised the tool, with one noting, “Dev Mode cuts down the time I spend on routine tasks, letting me focus on enhancing functionality.” Another added, “The ability to generate and use code snippets directly has significantly sped up our development cycles.”

## [Looking ahead: A new era of collaboration](#looking-ahead-a-new-era-of-collaboration)

Beyond the tangible time savings and efficiency gains, Dev Mode is fostering a cultural shift at HP. “With Dev Mode, we’ve also had a big mindset change,” Andrei reflects. “It’s helping designers and developers speak the same language, and helps us rethink the process of how they build products.”

As HP continues to innovate across its diverse product lines, Veneer and Dev Mode are proving to be invaluable tools in maintaining consistency, driving efficiency, and fostering collaboration. The success story of HP demonstrates the transformative power of a well-implemented design system, coupled with tools that bridge the gap between design and development.

_[Learn more about Dev Mode](https://www.figma.com/blog/everything-you-need-to-know-about-dev-mode/)_

_and [explore its benefits](https://www.figma.com/dev-mode/), or [get in touch with our Sales team](https://www.figma.com/contact/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=HP) for tailored guidance._