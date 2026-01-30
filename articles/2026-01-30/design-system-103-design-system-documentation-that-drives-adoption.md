---
title: "Design system 103: Design system documentation that drives adoption"
source: "https://www.figma.com/blog/design-systems-103-documentation-that-drives-adoption/"
publishedDate: "2025-01-23"
category: "design"
feedName: "Figma Blog"
---

[![An abstract, symmetrical artwork with bold, vibrant colors. The left side features repeating wavy yellow forms, bordered by a row of green circles. The center has a vertical blue stripe and a black rectangle with two horizontal blue bars. The right side includes overlapping green arcs, forming a curved structure, with additional green circles along the edge. The background alternates between orange and black sections, creating a striking visual contrast.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AHyWTMnLPvPsOfjwOfnxOvPsOMrLPIOQYF9mlV5ZrGBgnmB8fVyTaliYaVmYaluaa1ubbF6YbGKOYl6CVgB2j0y/wT/t5Dv06jv17Dvy6TvNzD+Fkmdja6ljY8dtZrJ8cXltd1RNcVBCbVBFcFNOempbgolbgYJTfWMAeJBOxMRC7+Y/9Ok+9Og+7uM9x8RBgpBsZnC2aGzae2zAmWZzeFA4NjgqIjEpJzYwPk5nXWmvYHKpU3ZzAHmRUMXFRO/mQPTqQPTqQO7lP8fFQoOSbmh0uWtx3n5wxZphdGs8LiQeGhQYGBkcHi0wTk1OkVtfkVlvaQB2kE6/vkLr4D3z6D306j3x6D3Ny0KHlm9pd7prc99/ccWXYHJlOSsgGxcSFhYVGBgcHykuLUVIRk9aaVAAe5JKxcQ98OU49Ok59Og47uQ3x8U8hJRraHW4aW7cfWzDll1xZDcrHxkWEBQVFhgZHyIvMzJSS0pZW2pSAHuTSsXFPfDnOfTqOfTpOO7kNsfFO4WUamh0tmhs2nxqwZlecm09LiUfGhMYGBsfITM3V1NVnl9lnVt0bAB4kUvBwT3t5Dn06jr16zny6jjOzT2Il2pmcrJladN3abuWaXN6Wj09RTEoPjEuRDhFWWhecKZfeKJUe28AepFNwMBG599G6+JH6uFG5NtDv75EgI9mYmyhYWG7amSoeHZ4bINaVYFYTH1YTn9ZVIRnXYl8XoZ2WIBfAGV8TpKWV6ypZaypaqqlaKOdYomKVmZzW1tbdl1Pg2BUeGFsY1mCW1OJXVOIXlSIXlOHXVuEWmZ7UWB2TQA/VERHT1dSU2xUVXRSU3NOT2xFS1hETUdNQ0RSOkRVPD5USTpGWT8+X0Q9X0U+X0Y/XkRLWT1cVDVWWjsgpSyl004GXAAAAABJRU5ErkJggg==)![An abstract, symmetrical artwork with bold, vibrant colors. The left side features repeating wavy yellow forms, bordered by a row of green circles. The center has a vertical blue stripe and a black rectangle with two horizontal blue bars. The right side includes overlapping green arcs, forming a curved structure, with additional green circles along the edge. The background alternates between orange and black sections, creating a striking visual contrast.](https://cdn.sanity.io/images/599r6htc/regionalized/29137f93e041248656758416e6d8af4d05c2c17d-1920x1080.png?w=1920&h=1080&q=75&fit=max&auto=format)](https://www.figma.com/blog/design-systems/)

When Razorpay’s teams missed small details, Head of Design Saurabh Soni recognized it wasn’t a quality issue—it was a communication problem. “Before we rolled Blade \[our design system\] out, it was easy for teams to miss a lot of small nuances like different button states, or how an error within a text field should be handled,” [he says](https://www.figma.com/blog/how-razorpay-sharpened-developer-workflows/)

. “Teams would try to hard-code and build everything custom, and in doing so, they might leave something out by mistake.”

This challenge resonates across organizations. “Designers and developers speak a little bit of a different language,” [explains Lukas Oppermann](https://www.figma.com/blog/unlocking-the-power-of-code-connect/)

, Staff System Designer at GitHub. This linguistic gap often leads to inconsistent naming conventions, misaligned component properties, and mismatched expectations about how a product should look and feel. Good documentation bridges this gap, serving as the connection between intention and implementation. But it needs to do more than catalog components—it needs to capture the how and why behind design decisions. Without this comprehensive guidance, even thoughtfully crafted systems gather digital dust.

When done well, documentation helps teams:

-   Understand design principles and implementation details
-   Make consistent decisions across products and platforms
-   Onboard new team members efficiently
-   Bridge communication between designers and developers

## [How to determine your source of truth](#how-to-determine-your-source-of-truth)

The first question isn’t what to write—it’s where to put it. “One of the most challenging things when it comes to keeping consistency is determining your source of truth,” [explains Raul Menezes](https://www.figma.com/blog/unlocking-the-power-of-code-connect/)

, Design System and Platform Engineer at Bumble. As design systems mature and teams grow, this challenge only intensifies. Gone are the days of static PDFs immediately becoming obsolete in shared drives. Teams today have more options than ever, from dedicated documentation sites to collaborative workspaces.

### [Building from scratch](#building-from-scratch)

Custom documentation sites shine for large organizations where design systems need to deeply integrate with their tools and processes. [Google’s Material Design](https://m3.material.io/), [IBM’s Carbon](https://carbondesignsystem.com/), and [eBay’s Evo](https://playbook.ebay.com/) all use custom documentation sites serving both internal and external audiences, with gated content and specialized pathways for different user groups.

“People simply want to do the best possible work they can,” explains Ryan Tinsley, Staff Product Designer at eBay. “We’ve seen teams level up their work dramatically by referencing our documentation. The office hours we have now versus before the playbook are just night and day—people always know what to reference and how to show the brand in a way that aligns to best practices.”

Rather than creating separate destinations for brand and product documentation, eBay built a [unified playbook](https://playbook.ebay.com/). “We wanted to combine guidance for both of these in one location so people wouldn’t have to jump ship to different experiences,” says Ryan. To make this work, the eBay team developed custom tooling that exports changes from Figma directly to their CMS, enabling designers and other teams to get the latest Playbook updates as soon as they’re approved for use.

> We’ve seen teams level up their work dramatically by referencing our documentation.

Ryan Tinsley, Staff Product Designer, eBay

### [Leveraging existing platforms](#leveraging-existing-platforms)

[![A cropped screenshot of a design interface, likely from Figma, displayed against a green background. The interface highlights the right-hand panel with three visible tabs: 'Design,' 'Prototype,' and 'Inspect,' with 'Design' selected. Below is a 'Background' section showing a gray swatch with the hex code 'E5E5E5' and an opacity of 100%, accompanied by an eye icon. Further down, a 'Plugins' section lists two options with pink icons: 'View story' and 'Open story in browser.' The layout emphasizes design tools and plugin options.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB30lEQVR4nK2Ty2rbQBSG9QxdpHRRaEqdReiiXcQKLYFAaBZ5jlK6CClZpsZguypZ5wXa5whkXe8MzkV4Yzst2ESOLjOWZMmSpT/McSYQYyVy24GPmY0+/WfOGeXpx/f4HyztbeLJ4Q6UF8VV/DNrq3i+/RZLXzahrBQKeIzCzHmWlVcFvFRf49mnDSjF4hoyUYtQ1wUq1m9R56GqeLP9Dst7H6CUSiVkUS6XUalUUK1WUavVoGnfbtGgfdemuzZl/7CEraPPUBqNBrJoNpvQdZ1otVpot9vodDr36Ha7xMlZHbvHR1D6/T6yGAwG4JzDdV0iCALEcUxMJhMiSRLiwrzEwa8fUHq9HrIwDAOMMTiOA9M06Twej++J0jQlhPBr/efjQpGQcwbLMmkXwiiKCBIipR+cGZ18QlHqaDSC53m0C5GQCihlmiKOYpxetfOVLIQylSxV7rLcZJLg/LqLg7wJhVA0QkjmrUQ2pZ4z4SgIEIYhJZOpZtGt3/kScsbAbAdDzqls8fG8pVt/8jVlaNpwDQtDm93NoUz1V0Lv2kF4ZcOz2F3HRdLZO9VzC02GcMDg29MXI8bH931CXkG6kJC7iP0AURBSY+QMyhezcFNEkuSB7i5cMgkz5m9eU24AWXoSOJYtZjoAAAAASUVORK5CYII=)![A cropped screenshot of a design interface, likely from Figma, displayed against a green background. The interface highlights the right-hand panel with three visible tabs: 'Design,' 'Prototype,' and 'Inspect,' with 'Design' selected. Below is a 'Background' section showing a gray swatch with the hex code 'E5E5E5' and an opacity of 100%, accompanied by an eye icon. Further down, a 'Plugins' section lists two options with pink icons: 'View story' and 'Open story in browser.' The layout emphasizes design tools and plugin options.](https://cdn.sanity.io/images/599r6htc/regionalized/1d2299ab99a43442d4655a0f13e04c299202ab96-1920x1920.png?w=1920&h=1920&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/1056265616080331589/Storybook-Connect?ref=storybookblog.ghost.io)

The [Storybook Connect for Figma](https://www.figma.com/community/plugin/1056265616080331589/Storybook-Connect?ref=storybookblog.ghost.io) plugin lets you link Storybook stories to Figma designs, letting you easily compare implementation to design specifications.

Not every team needs this level of complexity. Smaller teams often start with collaborative tools like [Notion](https://help.figma.com/hc/en-us/articles/360046037373-Notion-and-Figma) or [Confluence](https://help.figma.com/hc/en-us/articles/360053110673-Confluence-and-Figma), prioritizing quick setup and easy maintenance. Many teams combine approaches: technical specs in [Storybook](https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma) and design guidelines in more accessible formats, complemented by custom plugins. At Razorpay, the team discovered that their documentation needed to do more than explain what existed—it needed to meet different teams where they are. They built a custom plugin, [RazorSharp](https://www.figma.com/blog/how-razorpay-sharpened-developer-workflows/)

, that bridges the gap between design documentation and implementation. The key is choosing tools that support your current needs while leaving room for growth.

![Image of a geometric artwork with an orange triangle with a scalloped base, a green zigzag shape, and a blue cloud-like form, all against a peach background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACfklEQVQokT3R708ScQDH8ftXWiI/1khRpghtWI8zRQEFf4EoePc9vDvPhfrAos0fN5uzFDhRvACvpdlmW1u1Hrg5N2cPwPXIZaWb8eNad+KjIL6sXTX/gNc+2+eNpME9AWgL4PoFqCpg1374FFnfjYs5belID38ZKiV97twY/2DrX8fbw6O25TFbmOzk/P3xyaHlCJICbTmgk4BSBCoJU+S9qgyqlZZ0xRMD/G2C5cb8T3Ni3+niCEt41BqhbCzRxRF9yYBnlUFSmCUL6kVcLQKNiCnzXrWMI3XFUyMs34KwKV+4kzzodXGkJUx3sJR1hXBwhIu/74nNIClgyQK9iGv+YcGrzmA1EqsvnZogvMI9Lo5sC9HtEcrKEs5nhIsPeNZnkRRuyeL1Eq4RcY0EqgWfOgN0IttQOpNxBRqEy+aNw+6BONkeoa0rlH2V7EmSA5vjQ3EGSeNtOVwn4SoRV4lAIQzLWJKxsQJNFdgoXJr5j47BJGGN0p1ro10xsu85NbQ9Mcz/x7USXi0CpYgp5GWsRgrVF781QWiUccHMH15hqitG9m6Qg1vjw4l5JA1ac6BWfhtTimiV4FVlUa0YqpNx2QSh4S92euJkB0vbopQ9SnTHCTcfGIwxcqqsjKslTCmhVXmv6jt6U3yiKx4byqUmWGrICebEntMtp6Kt4TFbhHRwI32JCQ+7gLwj6CO/5QRv/grMn8HtNNpygNo/PWg9e3M3c9Jy/qUltedc2qBdS0H741nH7KJjnnGGgu7wUx+zgywE3nP02jY5s0M8fDHCrPjXFv18lAxvTk/vJIJbiTmWWZ2Y2h6Yetk/+doztusOvHUHX/ke7eKTx38AdxZoGw176DEAAAAASUVORK5CYII=)![Image of a geometric artwork with an orange triangle with a scalloped base, a green zigzag shape, and a blue cloud-like form, all against a peach background.](https://cdn.sanity.io/images/599r6htc/regionalized/81ea5af5fa174e55cc11fae59e757c52ada2df9c-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

## [What to include in your documentation](#what-to-include-in-your-documentation)

Beyond where documentation should live, you have another big decision to make: what goes into it. Here are the essential elements:

#### [Design principles](#design-principles)

Every design system needs clearly articulated design principles that inform decisions from big-picture strategy to nitty-gritty details. When you document the “why” behind decisions, teams better understand the rationale and how to implement them consistently.

#### [Component library](#component-library)

For each component, include:

-   Usage guidelines and best practices
-   Design specifications covering anatomy, dimensions, and behavior
-   Real-world examples and use cases
-   Code snippets and implementation details
-   Interactive prototypes showing states and variations

#### [Visual style guide](#visual-style-guide)

Document key design decisions defining your brand’s aesthetic:

-   Color palette with usage guidelines
-   Typography system specifying hierarchy and best practices
-   Icon libraries with design specifications
-   Image and illustration standards including accessibility guidelines

#### [Technical implementation](#technical-implementation)

Help developers implement your system with:

-   Component APIs and props documentation
-   Accessibility requirements and testing procedures
-   Performance considerations
-   Integration guides for different frameworks
-   Clear naming conventions and token documentation

#### [Accessibility guidelines](#accessibility-guidelines)

Make accessibility requirements explicit:

-   WCAG compliance levels for components
-   Screen reader behavior
-   Keyboard navigation patterns
-   Color contrast requirements
-   Touch target sizes

At eBay, the Design Systems team found that the more in-depth details they provided, the better: “People crave documentation,” says Ryan. “Even with a system [as comprehensive as ours](https://playbook.ebay.com/), we constantly hear ‘What about this edge case?’ or ‘Have you considered documenting this scenario?’ This continuous feedback loop drives us to refine and expand our resources—partners are not just passively consuming the documentation, they’re actively helping us shape it.”

[![An abstract artwork with a layered composition of overlapping rectangles and diagonal black lines. The background alternates between vibrant magenta, green, and blue sections, with the magenta at the top, green in the center, and blue at the bottom. Each section contains angular black lines forming shapes resembling chevrons or arrows, creating a sense of dynamic movement across the bold color blocks.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD10lEQVQ4jTWTbUyVZRjHHzRE5AAHkAMccFJRh2ITOC8oR2IHDpznec5zznkO54W3o034YLX8QC161aTZcmm5UrJszdEci3QucQop9IG30FlJSUtlc5ACLdemVpuU9mvPg3z43x+u/67//buvXbfwX9wsSyJujn/jfuWXxGFOpHdxMWmAhWXTIMwt+sKc7u0zv8WXqw8xk3CB4ZSv6E/rZm7FhO4L2rEkLWxq5Rhdpg/pzN7NRNKgXlvy78VdZzz5FHvMOzhj7OH3+EkGU4/yvrmD3vQu5lf8iHA/bhZNC8tmuJo4xmHTB+zOfYO+tG5uxv/M/bgbujT6O8un9Ma9uW/yveGMTn9t5XmOZHbyTu7rOogwknWWEdMA/Tkn2F3wNi1FLews2E6v+SiL3lnGMs5wLn2A/qzjdBRs58XCNnrWHGE0a4DxzG8YS+ujy7SfV9ZuQ5BqWtFUVRujpFak2OXC5QojuVuQalvxVrcS2rCFyPoW5MoY5ZUyZVUy7poYYm0Lmyte4NjaHiYNw5xM+xwhKeYgqdmBMWojWynFLJeSHrZjaHawKuYgtd6OWbaS7bOSFrGT5beRK1nJDGp9dix1Xg4UfsIfCZf5c/kUgiFWgbF+I2bFyRqpnMygk5SmjSTFyjHEnGSEneTJ5ZiC5Ria1pMatZOtWPVQY6gUiyqx/4mPubViCoR5hMcadlCkvkqxZxtPKs/zePQ1Hq1vJz+ylYfDW7EEnmOd/BKWUDumpgb9ktSojRyvjRy5hGJRotOyFDiHIIau4FFGqPb04Fb68dRN4lZHqfR+gUs5jkvqoUbuoyo4hKVhFykxF6tiNoxRByallLJKD5/mH+RW/IPAoO8GijiOIo5R5/+NiHqXgPcyXnEEVbmG33sJr2cIjzJKUXQvqTE3iZtsJMXKMIatbKjwcDj3I24/dFVffkGsOak3a8GR4D3C6l/4pO9QpPOEArcJqXfwyz9RLR7DUtdGSnOlHpjc6GC1WsqGpzx8tuYgswkTXEkcRXC7DuGTLxJW7xKtgzr/TbziKH7vJJHgAhGt5punWuyhILCF5CYnhkY7poCNHKkEq9vDu4V7OZXRzXvmnRph7yKhf45I8B9U3wxecQjVN00keP8B4eQiYbCNtIZKnSxPtJIZsPJIoJrN9mfYufZlOvLatRle1+eniN/qYX75kk6okYbVv/XnLs5wmHWhPZgDVZilEn0fkxvtZEad1DrD7MvbxTnDaQSNQguSPYM6mUbrky7o89Muk2q/xif9gBKcxqYeIN/jIttbQkq9g8RNdkxRJ0/bn2XMeFr/2/8DoxqUTCRy8pAAAAAASUVORK5CYII=)![An abstract artwork with a layered composition of overlapping rectangles and diagonal black lines. The background alternates between vibrant magenta, green, and blue sections, with the magenta at the top, green in the center, and blue at the bottom. Each section contains angular black lines forming shapes resembling chevrons or arrows, creating a sense of dynamic movement across the bold color blocks.](https://cdn.sanity.io/images/599r6htc/regionalized/4b569560fb80744397542d4700c1363bacbbda88-1608x1206.png?w=1608&h=1206&q=75&fit=max&auto=format)](https://www.figma.com/blog/introducing-code-connect/)

[**Boost adoption with Code Connect**](https://www.figma.com/blog/introducing-code-connect/)

Code Connect lets you customize code snippets in Figma’s Dev Mode, making it easier for developers to access and implement your system directly from Figma.

## [How to maintain and evolve documentation](#how-to-maintain-and-evolve-documentation)

One of the most common challenges with documentation is how to keep it current as your team evolves. Out of date documentation can result in inconsistent designs, which, in turn, tarnishes the credibility of the design system. While refreshing documentation requires effort, the payoff is immense: faster onboarding, fewer misalignments, and a more cohesive experience.

### [Keeping documentation up to date](#keeping-documentation-up-to-date)

**Pro tip:** Make documentation a required step for completing new components or patterns, ensuring that it reflects evolving design decisions and stays up to date.

“What you see in design is what you get in code,” Razorpay’s Kamlesh notes. This alignment comes from intentional choices about how documentation is structured, maintained, and evolved. “We have around 70 designers and 100 front-end developers,” shares Saurabh. “Within those teams, three designers and five engineers are dedicated to our design system.” This core team nurtures community through regular office hours, focus groups, and an advocacy program that includes designers from various teams.

![Image of a repetitive pattern of green circles overlapping in rows to create a woven effect, with a blue background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACcElEQVQokS3LaU/aYAAA4P7McbT2ePuWthwyBXogKlRo6UGhtBQohyKKc5lmcVPZ4rziXHaZTRM1xi9LtmX7E/uy5/uDwP6AGlucu5tQL5hmhxhksO5cxM/gps1kzmDmBLdtNBDDbSHUFsK+gPZyYEOCk0U2aCGwvUmtNmL+iG2NwEAh/SKh+3g5IEsjWnoNxSlYeYYb3YitheoKVm3iWgDcBhiojNNHYHuDWqvRayY9LtN9FaoTJncBsydkcYzrNqWsxsQzKJ9EVC9saqS8A+fOaXWL6hi03UPY+pTxNmHPg+tqzBly0kd2/goUdjFbQ90FcmXAzn9hMp+jK92wboDcARu/YQpHtLXBVF4iqeXHRPFbrL5DD03W3uSFK0Y+xsxa1CvgVQ8KR3z6lsl++p+FfTZ+y2fu4/nruHCLpKU/SelHTD8EAxM6Abs8Bco22ijPNDRQmjDiO1Z8TxemkYob0nViYYvJnCeyd7PZn6m5X8jT/N+U/IM1ptTQoAKVcmyibqLuEtZUcNsizAZpeTOWE7IqTywlUjUJ3eW0V7OFu3T2N5JWHpOVK9bdBeMqOVogAgnz85GWFPXkaEtCfQlrF7BWMVrTo0Y9atYwv8gMjGRjL126QTjnDdNdh2tNeqJQ6zLRy2EtKeKJEVeMejm0JWCdPOFWgbIN5WM6/5bSh/RqhRtZCecFEmvu0UEf9n04cEDHJJtVvGaglo6aOmZpMzUNr1uU0WOlMz51zyXv2dyHmPmc8btcbRtJlK/5yiWvXnDqKVs6YhandH4KpAMgHgJxH4gHMD+Nyadc+jvPP3DcA594iAvX/NJlXP76D3uMW1pPjIQDAAAAAElFTkSuQmCC)![Image of a repetitive pattern of green circles overlapping in rows to create a woven effect, with a blue background.](https://cdn.sanity.io/images/599r6htc/regionalized/d963492804d6cd64e730c464bdb4e44f3f41e096-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

As your design system evolves, it’s important to have clear processes for managing updates and contributions. The process should balance centralized governance with community input, allowing for flexibility while maintaining standards. Here are some tools and processes you may want to adopt:

-   **Contribution guidelines:** Establish clear guidelines for how team members can suggest changes or additions, including templates, style guides, and review processes.
-   **Version control:** Use semantic versioning to communicate the scope and impact of each update. This helps your team understand how each version differs and what to expect when upgrading.
-   **Change logs:** Maintain a detailed running list of changes in each release, including new features, bug fixes, or breaking changes, along with migration steps.
-   **Quality assurance:** Implement multiple checkpoints to check quality such as feedback loops, regular reviews, and linting systems.

eBay’s Design Systems and Design Technology teams maintain a component status table showing implementation status across different platforms. As Cordelia McGee-Tubb, Staff Design Technologist at eBay explains: “A lot of our developers have been using this component status API to figure out, ‘Hey, does the component exist in the framework I build in? And is it up to date with the Figma version? Is it up to date with the Playbook documentation?’ That’s been a huge win.” They also developed a custom linter to validate their documentation, which checks component usage against guidelines, verifies accessibility information is complete, ensures all images have alt text, and flags inconsistencies in naming or structure.

[![A screenshot of a Google Sheets document titled 'Component Matrix,' displayed on a web browser with an orange background. The spreadsheet tracks the progress of various components, organized in columns such as 'Components,' 'Design / Code,' 'Figma File,' 'Consolidate,' 'Align,' 'Finalize,' 'Progress,' and others. Rows list components like 'accountInfo,' 'advertisement,' and 'button,' with associated status values and checkboxes indicating completion of tasks such as fundamentals and default states. The layout includes percentages for progress and green progress bars in some cells, visually representing the status of each component.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC+0lEQVQ4jVWRXU/bZhiG83PXiEnbQdkmbbCzHmxroZrERuhSKrq1G2gbDCgh5DskfAQICbFjJ46dOPbrrzhEYaJH1xQXaerBpefR80q3rltvbLz1Oddrc+SeP+Jo6ZOIzPIjssvxD/N5nMKPcxGzfXafzdlbZumB5ThnK3HMjTliwfbXVP74ge3XP/H3xio7vybYe/OC/be/8O73JKnNddJ/bkSktl5FHG694mBznb23SXbeJPnrtyR7ye+prHxK7C7zHfplmhtZotXuoHR7dDQDpduP0PQBet+kZ5hoxmwO0GfofbqajqoZSGqP09w+2ZXHxN4XlhDtMorZQ3Ms3DAkGN8xdKeYYoLv+Yx8C9t1GDgBtusR+A5h4DAOHCahT+AJ5NMMhdUviN3nn6FcHZBtVimrdTRhI/wJPTNEMxzEoIut15E6EleKgaob2JaBZw8YOSaTQODZfVqVFPmf54m9zz9DutjlXT1Ptl1DFQInmNK3QgamIBiqiF6NZrvJuaSj6H2EMBl5NuPA5W4y+thwFihf7nFwXSSvXtJ1HbzwjqEYY9kOodVB6BdRYPVGpa5IDAYqvm0QugOmI4Fv95FPUhQTUeWnUWCqUSKrXESG7ugh0HIiQ7tXoyE3KNRvqDTOUJULLK2J25cZiy7CkGiV/6G4Ov8hUJoZ1gscSWeotoUf3iHcMbbtMJpVfjA8bipcyg0MrYFjyARWl4nXxzM7yJV9ion5/w0PmyXy6gW6J5hM/2UUTgh8j1vRxRtcIXclam2dtt7DFQa33pDpyOZ+4nHrW6jnR5TWviR2n3tK+3KfzE2VolqPDN3gFuEGCCHwh53ol1uqRE3uIWkatt0ncIeEnsVk5OAJk9bJIYWocvoJSuE12dw26ewulVKGq2qBejXP9UmO1kmaZmWf81KKSvGI83KaxkmG1mkO6SyHXMtzXU1T3UlSXPmM2P3uV3Q3Fym/XOQosUAmsUD+xQKl5ALH699SeWC2lx/4+L5IMfkNx4nH3KzF+Q+8+20MbYrnQgAAAABJRU5ErkJggg==)![A screenshot of a Google Sheets document titled 'Component Matrix,' displayed on a web browser with an orange background. The spreadsheet tracks the progress of various components, organized in columns such as 'Components,' 'Design / Code,' 'Figma File,' 'Consolidate,' 'Align,' 'Finalize,' 'Progress,' and others. Rows list components like 'accountInfo,' 'advertisement,' and 'button,' with associated status values and checkboxes indicating completion of tasks such as fundamentals and default states. The layout includes percentages for progress and green progress bars in some cells, visually representing the status of each component.](https://cdn.sanity.io/images/599r6htc/regionalized/2522ff79bcc909ff526e1b4f106bd8719d11d08a-3044x2024.png?w=3044&h=2024&q=75&fit=max&auto=format)](https://www.designsystems.com/keeping-design-system-contributions-in-check/)

![Image of an abstract design resembling stacked paper layers, with a red top layer and other layers in white, green, and blue, on a bright yellow background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACTklEQVQokVXS/UsTcRwH8Pu3Wjof5lw6KFGJ6gchQVDBniAkqX+gX2SuVQQSOjVdFEFQwdJ0zqJm5m4+Xd3N7R7mvnf3/d7Tttvt7vslVgn25vXD55c3vH/4UASHCAkQ4sfYh+s+R2zXNwZBYrK8PA1WomAlAhIRkJgBiShIPGoeKxH5/UODHfWcLupfGbd51fM1IYi2R8pbsZPdtfLRLmBygKGbfp5isoDZldmkrjxwG90UIT3Y63asoFEYAD+mpJ3XJXZPBicqVFUIT6E/VBWKENIIvaxYE54XoFy319L6QH6Up6P8wUaJP5ZlGUKI/qMgeIJgAaoZhBYMfdKu9WHcTtm1Hr4wfEg/45htSRJkWVYURYVno0CYR+iLpr3RtJiuT5rm1Xo9iLGfqtcviKWhHDO9z64XJU5RZU3TNP1skK4XDCNlWbPV2pRtDzlO2PM6CG6jsBes2iFBufKdvf/5YHkvv1MCoqYh0zDOgKYhmmauYn2oVp7WancdZ6A5m+AAxm224+fVUPpo5O329Fr2Hc1lWeEXJ7CcyHIixwl5tonlhINjKVOWE6Z1w3U7KYK7COnApNVp+CStc5O5trh17/lGLJ6eX0jH4+nFeHp5LvViLrU0l1qc31x4lYln2Iiij7hes9xNSCchfoJ9DbdFMYPf8v1LX4efrI89/jQWW7sZXb0z8/F2JHlrJjkRXR2f3RpPHl4X0cWG15z998NaCTmHcYvndVh2oKj27Eu9OSGc4/tp/jJdHMwW++nipRwf3pPCrByGlaCL238DaDkD1MclJ7kAAAAASUVORK5CYII=)![Image of an abstract design resembling stacked paper layers, with a red top layer and other layers in white, green, and blue, on a bright yellow background.](https://cdn.sanity.io/images/599r6htc/regionalized/2bad519087d604a07fb859f14b2fdc4eb61f20b7-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

### [Making it work for everyone](#making-it-work-for-everyone)

Different team members need different things from your documentation—success requires understanding those distinct needs for each audience. [At Alaska Airlines](https://www.figma.com/blog/alaska-airlines-reaches-new-heights-with-the-help-of-variables/)

, designers struggled with pixel-perfect implementation while developers received mismatched designs. Product Designer June Lee focused on documenting key features when moving their Auro design system to Figma. “I really focused on education with our designers so they could understand what Figma could do,” she says. “I could see that designers were better utilizing Figma, and that meant fewer conflicts between designers and engineers.” Here’s a look at what each collaborator might find most useful:

#### [For designers](#for-designers)

-   Visual examples and usage patterns
-   Component variants and states
-   Design token implementation
-   Grid systems and spacing
-   Asset libraries and resources

#### [For developers](#for-developers)

-   Technical specifications
-   API documentation
-   Integration guides
-   Testing requirements
-   Performance considerations

#### [For product managers](#for-product-managers)

-   High-level system overview
-   Component selection guidance
-   Feature roadmap
-   Release notes and updates

### [Gathering feedback and measuring impact](#gathering-feedback-and-measuring-impact)

At Razorpay, success isn’t measured by adoption numbers alone—it’s about the tangible impact on workflows and collaboration. [They set concrete goals](https://www.figma.com/blog/how-razorpay-sharpened-developer-workflows/): Teams building new features should use their system for 70% of their design work, while existing products aim for 50% coverage. “We surveyed our designers and developers, and 80% said that they felt more productive when using our Blade design system versus without it,” shares Saurav Rastogi, Staff Designer.

When gathering feedback and proofpoints for your own system, look beyond simple page views to understand how documentation influences behavior. Consider user testing and interviews to gather comprehensive feedback. By prioritizing continuous improvement and iteration, you can ensure that your design system remains a valuable and effective tool for your team, even as your products and processes evolve.

## [Planning for scale](#planning-for-scale)

The most effective documentation not only details what exists, but also empowers teams to build better experiences together. Investing in tooling and processes that keep documentation current pays dividends in adoption and consistency. As you think about how to build and evolve your own documentation, consider these takeaways:

-   **Meet teams where they work** through integrated tools and custom solutions
-   **Build bridges between disciplines** by creating what GitHub’s [Lukas Oppermann calls](https://www.figma.com/blog/unlocking-the-power-of-code-connect/) “a third language” where designers and developers can truly communicate
-   **Create clear contribution paths** through dedicated teams and regular community engagement
-   **Measure impact** by tracking improvements in team productivity and collaboration

The future points toward more integrated approaches where documentation lives alongside the work itself. When documentation evolves with your system, adoption naturally follows. The goal isn’t perfect documentation—it’s documentation that helps teams do their best work.

What else would you like to learn? Tweet us at [@figma](https://www.twitter.com/figma) with your questions. Learn more about how Figma helps teams drive consistency, scale designs, and maintain parity with development using our [design systems features](https://www.figma.com/design-systems/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=ds_102&utm_content=ds_102) and [request a demo](https://www.figma.com/request-a-demo/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=ds_102&utm_content=ds_102).