---
title: "Design system 102: How to build a design system"
source: "https://www.figma.com/blog/design-systems-102-how-to-build-your-design-system/"
publishedDate: "2024-04-08"
category: "design"
feedName: "Figma Blog"
---

A well-crafted design system is a powerful tool for teams looking to create cohesive, scalable, and efficient processes. By establishing a shared language and a library of reusable components, a design system ensures consistency across your products, speeds up your workflow, and frees up your team to focus on solving user problems.

In this guide, we’ll break down the process of building a design system into clear, actionable steps. From defining your principles and laying the groundwork to creating and organizing your design assets, we’ll cover best practices and real-world examples to help you create a system that empowers your team and elevates your product.

[![Abstract artwork featuring orange organic shapes and green zigzag patterns on a blue background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACYElEQVQokQXBW2+TUAAAYP6gtydnt67tSksPhQPlUi6HAoXD5QArpXRdzdRlyTJr55yLNhpn1JjoEmOMU7No9MUXf4ffRwHmj9j5TtjVHB640nlXvGS5b1znSgSXmFtF4llP+tyBVwD8lDtfk+6zkXBqi+9N7mMPXFIce0m45YlgLDXOGcY03ufQAZIO+8rCQmPkx51wD6JDBx7H8Giu4l3LTOxwpKY2v6RE8XyuDJdmZeZXjBRs5VY79mXPAbHbGmmtUq6XAz2wjiS4UJjUb1tpR8+gM0Sask8habmN0DamR7iShBtKKjXTsJ7GjTESxl25AO2prhFzoVdPjRthvKmPGDUXdOwp2kMq7N33HctOwChay+PbbgJA6lbzmCn0IKuRbN3IgUHk1O8k8eYgbwzzul4AIxwo+iGlSE/6HsbJFknvWHnNJYw1VNuJ25z2xVnLKGsRqTq+wMcWGEtwxpiThrENBIyBdkK11NcCTnaC9QP/VpBthiGd2DxHrOrMqN4TmTlw06YWqixxjITXJ7Rb1Ga44jpmy3hMcepKwX4e1c6ca7vBmppBMbLozGuWGpwCccLwY7Gduhxx/BgM8qYzqR95N/d0DmqPKEV9auFBlDWW3vUyrjClXiuiehFwpUyyjTTZgIVcL0I6D7qlCneBOd2aRtUSqT19SUHzrUB2UK7PQjaILZA8oMmCzudgB6OiP0wtkdxtx4vmaK85I70SYaI5eKTZx9C4oHjjN+t9EILnyD/tu28guuLNX13vAkQvWfKCC99B+wdv/u66n9jolYzPBvZKRV+g/lfQ/v0HgLpOhIQ//xYAAAAASUVORK5CYII=)![Abstract artwork featuring orange organic shapes and green zigzag patterns on a blue background.](https://cdn.sanity.io/images/599r6htc/regionalized/27db1d8f2eb3257c620306f5d87fd62db037c6eb-3264x1836.png?w=3264&h=1836&q=75&fit=max&auto=format)](https://www.figma.com/blog/design-systems-101-what-is-a-design-system/)

## [Step 1: Lay the groundwork](#step-1-lay-the-groundwork)

Before diving into creating components and patterns, it’s important to understand why you’re building a design system and what problems you hope to solve. Maybe you’ve noticed inconsistency across platforms, time-consuming manual updates, or collaboration challenges between design and development teams.

Take a moment to clearly define your goals by answering these key questions:

-   Why do you want a design system?
-   What specific problems will it solve?
-   How will you know if it’s successfully solving those problems?

Remember, design systems aren’t one-size-fits-all. They exist on a spectrum, from simple component collections for small teams to comprehensive systems for enterprise organizations. The key is to create a system that makes sense for your specific situation and can evolve as your needs change.

### [Take stock of what you have](#take-stock-of-what-you-have)

Once you’ve aligned on your goals, take a closer look at your existing product landscape. Gather examples of your UI across different platforms and devices, including interactive states and alternate versions. Screenshots are your best friend here! Capture examples of your product across different platforms and devices, and don’t forget to include any interactive states or alternate versions. Chances are, you’ll start to notice patterns and consistencies that can serve as the starting point for your design system.

Don’t forget to inventory your codebase as well. Engineers may have already created reusable components that aren't documented in your design files. Look for patterns in your production code—repeated UI elements, standardized CSS variables, or shared components that developers have built. This technical audit helps bridge the gap between design and development by ensuring your design system builds upon existing engineering work rather than creating parallel systems.

### [Organize and evaluate](#organize-and-evaluate)

With your inventory in hand, organize your examples into categories and evaluate the big picture. What does your current design language look like? Are there inconsistencies or redundancies that could be streamlined?

Keep an eye out for areas where your product feels disjointed or where designers and developers are solving the same problems in different ways. These are often signals that your user experience could be improved through a more cohesive design system.

### [Find your champions](#find-your-champions)

Building a design system is a team effort. Seek out people who are passionate about design consistency across your organization—not just from the design team, but also developers, product managers, and other stakeholders. Getting diverse perspectives will help ensure your design system meets the needs of your entire product team, not just one discipline.

Developers are particularly valuable allies, as they’ll be implementing the components in code and can provide insights on technical feasibility and maintenance considerations from the start. And remember, many successful design systems start with a team of one!

### [Choose your approach](#choose-your-approach)

There are two main ways to approach building your design system: starting from scratch with a custom solution, or adopting an existing framework and adapting it to your needs.

Building from scratch allows you to tailor the system to your unique requirements, but requires more time and resources upfront. Using an [existing framework](https://www.designsystems.com/open-design-systems/) can help you get up and running faster, but may require more customization to fit your specific use case.

There’s no right or wrong answer—it depends on your team’s capabilities, bandwidth, and long-term goals. Don’t be afraid to start small and evolve over time.

### [Align with company goals](#align-with-company-goals)

Make sure your design system initiative aligns with your overall company objectives. Consider factors like timing, resources, and leadership buy-in. Your earlier audit will come in handy here; use your findings to help build the case for how a design system will support key business goals.

Design systems require ongoing investment, so it’s important to secure stakeholder support early on. Tying your system to tangible business benefits, like faster time-to-market or improved developer productivity, can go a long way in getting the resources and buy-in you need.

[![Stylized illustration of a workflow with abstract shapes, checkmarks, and arrows depicting a dynamic design process.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAcDBQj/xAAhEAABAwQDAQEBAAAAAAAAAAADAQIEAAUGEhEhMQcjYf/EABYBAQEBAAAAAAAAAAAAAAAAAAUEBv/EAB8RAQABBAEFAAAAAAAAAAAAAAECAAMEEQUSE0GBkf/aAAwDAQACEQMRAD8AY2NZFa8twmOEUtylita0w3t11VE7qazY9bbPeQ30BEc9w15aicbIn9rMnx2fLFnT4w5BEjkY9Xj56VeKef0mXIifOIBIxXDIuyK5vtOYsW5bAkhJ0+xrO3cbeV3Z+A1rdXF1vA7ZNeM0gjVL+yJpt07zuil4+SaRb7YU5XvIsRnLlX32iloY0WItSPHQk9TJ+1//2Q==)![Stylized illustration of a workflow with abstract shapes, checkmarks, and arrows depicting a dynamic design process.](https://cdn.sanity.io/images/599r6htc/regionalized/3f62721e30969913c9814279da6b1e05b6cc3ff4-3264x1836.jpg?w=3264&h=1836&q=75&fit=max&auto=format)](https://www.figma.com/blog/an-insiders-guide-to-a-seamless-figma-migration/)

### [Define your guiding principles](#define-your-guiding-principles)

With the groundwork in place, define a set of guiding principles that will serve as a north star for your system. Your principles should establish the purpose and values driving your system, and ensure that every decision ladders up to your organization’s broader goals. Aim for a small set of memorable, actionable statements that can be easily referenced and applied.

In an ideal world, you’d define your principles right at the start. But in practice, they often emerge later in the process, or evolve as your system matures. That’s okay! The important thing is that once you have them, you make sure everyone is aware of and aligned with them. They’ll make future decisions much clearer.

Here are a few tips for crafting effective design principles:

1.  **Start with the “why.”** What core belief or value is driving this principle?
2.  **Be specific.** Provide concrete examples and guidelines for how to apply the principle in practice.
3.  **Keep it actionable.** Principles should translate into tangible practices for both designers and developers.

Let’s say accessibility is a core priority for your team. A principle around designing for inclusivity might include guidelines like accounting for different vision and hearing abilities, testing contrast and legibility, or following the [latest accessibility standards](https://www.w3.org/). The more specific and actionable, the better.

[![Three cards read Professional, Approachable, Thoughtful with icons and smaller text.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4klEQVQokSXMS07bQBgAYN8C/5DYVI1aCanqCbgAizzsFqiQ2kOw5wKoUJCR2Cab0hOwYYHEAm4QKRBKHo09v2c8nkeSdhw8VWDxbT/nLwVqOBTPAmwpV5dkKeFMsqNGQrCDSOaUUssYs4zROct4h1+cNlTgnenQl7pVsbq5ZlVzrVCNVeqIiYts6Jps5JYzBPssQFgFkUi/1weDUfvxsT/r9/t2MHiySZLMWJa1+a/Tut6uRXpvQ+i9Dau335aqVTGqsYqO+OMi/l4x5HGllBPXmgzEs3gNn54G7V6vN+12u/b+/t6Ox+NpSmmbX5zU9U4t0l8/CP3to9Vf3pc69I1qVtCZp4BT4popcct5CvYfg7zgEEl2VI/jpL1MRqORXZpMJlOC6UuowvVI79RyvfvO6p1aqT+/MSrw0Ck4pAWHYpGDLThYw0EscohUdlxHpB1EnCGifUVmKaWdl7BVjXToCx36Vn9aXypU4KXOIoeHIn9JecFBFByGixwOJTveIgTPCUliQki+hIhxStk5vzjZUkH1UIX+UIW+UKHPVeinqlV9cEwGlyaDG5PBrcngruBwtchhX9CjzTgmB3EcXydJcrtEkuQaU3rAfv7YlK3qvgy8Kxl4dzLwbmXg3Yhm5fI/pXGP5AcNh2QAAAAASUVORK5CYII=)![Three cards read Professional, Approachable, Thoughtful with icons and smaller text.](https://cdn.sanity.io/images/599r6htc/regionalized/cefa0d4e9196cc2b3e6a71434e724222021aeb72-800x298.png?w=800&h=298&q=75&fit=max&auto=format)](https://www.figma.com/community/file/817913152610525667)

Leverage the wealth of knowledge within your organization as the foundation for your design principles. Take a look at existing resources like brand standards, voice and tone guides, or engineering best practices. Work with cross-functional partners to ensure your principles reflect both design and development values, creating a shared foundation that everyone can rally behind.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAAClElEQVQokU3N+08ScQAA8PuLTITjJUi6qZWWj2rNkOP9UrgDvDuOVy7KmZbLAVpZ2UQ4HsIBihzQXOlatX5ordbabNZWKvc9Ev6F1m/9AZ99IG0uqGd8xgJuyKJI3GFet8dWrn+4pzwMw4dh4few8DAser+gWl6d0K05Jp5jSMKtS+OaJKFOEJAu5zcwlJGZMWRRfXwq8Ehbmb/wI9B9QslOSPiEFB174aOgfHthCI8Zbj51Tm66tSl8Mon/j//N6AvzxtLIt5AK+HoA1cMTMkBIOErO+RVfZnvX7l+1rNkmEx4khWtoXJ0kICTr1+cpQ56wZhwPntx4d/v8qVfOe5XAq+BxKcAlgOoGPtWxT3VwZ3DuMWKkMW0a19CEOklCmkxAm/MZ84Q/bdx52P+ThIELBm4JcIkBJgRYF3BLOFzZwFVHgd5CdJRK2fQZXEOTapqEkK2QjglgJfc6fe3rnIRzCQAmAhgMMBGPdvLoOYAJOY+sMaNskIrPi73P0hNOxqXNepEMBWnztyw7gUXW+jbe17jb2fQJ+aCYD4qbIbgZFDT9HXygC4Sk3Gw3CMlO58VvEgMLu2ZLkdTnfZCOCVE1z3Z9/Hdc2I51tJaFrSjcisDtqKgdE7QjHa2o8E9MerYqP4tIWiuCX3FxsT7uraD6HAVZir7YvunTfh8oCfhCF5+XAEYKGAnPiPmiiC/AoCDjCgquqOAYOSjAXFH08XX/8p7BmMUhe4mM7JvKByMv9wZq9cFqbZhlL7PVYbZ6ia1dZGvDleroLjtWroyVK1d22aFafaj0amypbjBl3JCJ8aI7HrI8TZTMnqzJlbI4k1aUtqC0yUmbnfSUI+mwxx22jWnbhn1q04pt2V2M0551IcmZv+CrXHaSUnr9AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/135c5787cd0707a690cc57a5b1fca3907427090d-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

## [Step 2: Define your foundations](#step-2-define-your-foundations)

The foundations of your design system are the essential visual and functional elements that form its base. They include elements like accessibility, color, typography, iconography, illustration, and dimensions. These elements work together to create a strong, consistent design language that’s easy for people to use and understand.

[![Screenshot of Figma, showing a layout for a financial application. The design includes buttons with labels such as 'Done', 'OK', 'Continue', and 'Retry' under a section titled 'progress', and 'Create account', 'New goal', 'Link my bank' under 'startTask', as well as 'Add cash', 'Invest in AMZN', 'Cash out' under 'startTransaction'. On the left side, a sidebar lists design elements like 'Shadow', 'Elevation', 'Color', and 'Typography' with a nested 'actionLibrary' containing UI components.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAACAACBv/EACUQAAEDAgQHAQAAAAAAAAAAAAEAAgcDEQQFBiESEyNBRHGisf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A56BaF5Hwhe0FhpvNj6SzFGiQOn8olwBvJWEHblP/ABLXiIsATayoBhIzQNc50A3YYlyliS3Ea8zvfyXKUl//2Q==)![Screenshot of Figma, showing a layout for a financial application. The design includes buttons with labels such as 'Done', 'OK', 'Continue', and 'Retry' under a section titled 'progress', and 'Create account', 'New goal', 'Link my bank' under 'startTask', as well as 'Add cash', 'Invest in AMZN', 'Cash out' under 'startTransaction'. On the left side, a sidebar lists design elements like 'Shadow', 'Elevation', 'Color', and 'Typography' with a nested 'actionLibrary' containing UI components.](https://cdn.sanity.io/images/599r6htc/regionalized/2651199d44b563858d3e0626aaf79dd6146dd2c6-2725x1508.jpg?w=2725&h=1508&q=75&fit=max&auto=format)](https://www.figma.com/customers/how-stash-builds-financial-products-customers-trust/)

### [Make your design accessible to everyone](#make-your-design-accessible-to-everyone)

Accessibility means making sure everyone can use and understand your product, regardless of their abilities. This is everyone’s responsibility, and it should be a core part of your design system principles.

When creating your design system, consider elements like font sizes, color contrast, and how components are labeled and organized. It’s important to communicate both how and why your design system assets are intended to be used when creating accessible experiences. By prioritizing accessibility from the beginning and providing clear guidelines for both designers and developers, you lay the foundation for a more inclusive product.

[![Promotional graphic for the all-new Stark plugin for Figma titled 'Supercharge Accessibility.' It showcases interface snapshots with accessibility tools for contrast checking, typography, and alt-text suggestions. The tagline states, 'All the tools designers, developers, PMs, and accessibility experts need to design accessible software products from the start.' The background is a gradient of purple with decorative yellow squiggles and a red heart doodle.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAACsElEQVQokXXR20tTAQCA8fOfFN2ISIOerOxmtnXRlrMEiQrTqaF0oYsoqdWLpEQ3IkrsZl6gzEIjBxMzXZhubtPtzM2cc+ru52ynTWsSfEE9Rg8/+N4/IWOVjf/ZttrKjjUWdq0zs3u9GVX6OJeKXBh6w0yLSUYGY/R0iTxv6aHj1Ue+DE0hZKyy8pflH5lrzezdOMqeDSYy15hRbzFz/bwb84iEb1bBbo0yavQxNCAi2r1EIwrC7vVW9qdZUadbUKVbUG+x/OnszVZUaRZUaSb2bjSTtWmcwiwLd+vdTIxFCPijLMwHWZyXmZuNIUWTpFIphJytVooOOSjXiug0IrqjIqVaJ2X5Loo1U+TvnESTYePcCZHHjW4Ge73MOEKEgzKyHCPgl5h2hQgsxlle/oFQuN3M5RMidWVuqovdVJdMU1sxw82Ls1yr8FCUK1J+zEFHyxzOiQAhX4jIgozfp/DNHWZwYJKe7hEsJg/RSByhJNNITeE4N0smqTtjp07npP6si+sVbmpKpyjOtVFZYOVdu5egP87P5R8klZ/MuCT0vXaeNetpbzVg/CzimJhFuLSzj9rcAerzh6nRfuGK9isX88ao1Jgoyx3j1D4jJYeHaG608c0ZIZVaYSX1izmPRH+fDUOfCfuEB5dzEeOgA6FxXydNB97QcPA99eoPVO3Xcz7bQHlWP7psAzqVnsojH7hT1c/op2mUeJKV1ArRkIJbXGDeG+a7soQUTTDlCCC05zziZc4Tmg8/5d7BVhrUndQd6KLqUDdXNN1UF3Rx43QHD6920v96GP9cgISSQArHWfCG8c9LxOUEicQyMXkJwXC8ib5jt+nW3qct7xGPj7ZwJ+8ltwraaDjZRlNpKw8uPOVZ7RP0L94yM+kkFpGJSQrBxSg+T5BIUCaZXPpz+TeAc0ql87J3oAAAAABJRU5ErkJggg==)![Promotional graphic for the all-new Stark plugin for Figma titled 'Supercharge Accessibility.' It showcases interface snapshots with accessibility tools for contrast checking, typography, and alt-text suggestions. The tagline states, 'All the tools designers, developers, PMs, and accessibility experts need to design accessible software products from the start.' The background is a gradient of purple with decorative yellow squiggles and a red heart doodle.](https://cdn.sanity.io/images/599r6htc/regionalized/ab5a29d9bf94abcff4c3f5736cb1c87f60f3ba9c-1920x960.png?w=1920&h=960&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/732603254453395948)

### [Choose colors that work well together](#choose-colors-that-work-well-together)

Color is a powerful tool in design. When selecting colors for your design system, aim for a balanced palette that works across different modes (like dark mode) and platforms.

[![Screenshot showcasing the 'Ultimate color palette system' by Untitled UI, featuring an extensive array of organized color swatches and names on a user interface design template.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+0lEQVQokWWS227aQBRF+f8/6GM/oepD1TS9RCGqkkKcBHOHhJJCwTa2MeO5m1XZJFKkjnQ0R5qZNfto79bxeMT7Cq0sQkgOQqCUwntPfVavqjpitENLh1Eeoz32pYxyaOVw1jf3WkeOOFchDoosK0jTjMNB4FwNBGePyLJCFAZZGoxxWOsxxqOU5XBQ7POyeW+No9UoqBVqi5QaKRVam0ahsxVFXrFdeeKNoSw1RhuUUOTxnvViw3y84HH6TBxlyFKfgNY6snxPFCXE8Y44yYiilDjOSXeaZOtJE9N8aJRE7BLi2YzZr1uCi5/cX9/x+3HVQBtgWUpm8wW3QY/gPuShNyK4GxCGU6IoQ0nXjKuURilBsf/LdjXiadih370m7ARM7gbMguELUEqeFkseegPC/ojhaEovrPcZcZxijG1MU1ojtSIVe5bJlvHzgv50wqAfMg5uGN+0adVOOucQoiTP9+R58WLOqa9VNSZo1xgitGWVa7rLgk+9LR9v5lx0+/RGIZN5eAK+rcrXEfFoeYpFnYDaHGt8AxbK8WdnuJpI3rdT3p0t+dCecT1YEszXp5HfrkaxrRpgnbm6fwXWWVPSkiWK+bjgqh1xdv7E18s53zorvnSi/xW+lvenqsPq3SvQYUqN2uwpems2P8ZMPgd0v/e5vFpzfpHyD/329Myx5GBAAAAAAElFTkSuQmCC)![Screenshot showcasing the 'Ultimate color palette system' by Untitled UI, featuring an extensive array of organized color swatches and names on a user interface design template.](https://cdn.sanity.io/images/599r6htc/regionalized/adc78700ef28c0defcf97bc5f4740b57f516dad0-1920x960.png?w=1920&h=960&q=75&fit=max&auto=format)](https://www.figma.com/community/file/1029506782158027808/ultimate-color-palette-system-untitled-ui)

Check out this [Ultimate color palette system](https://www.figma.com/community/file/1029506782158027808/ultimate-color-palette-system-untitled-ui) from Untitled UI, a purposeful set of neatly-organized color styles—the perfect starting point for any brand or project.

To simplify your color palette, look at your team’s existing designs and consolidate similar shades. A good rule of thumb is to start with 60% neutral colors, 30% primary colors, and 10% secondary or accent colors. This balance provides enough flexibility while maintaining visual coherence.

### [Pick typography that’s easy to read and fits your brand](#pick-typography-that-s-easy-to-read-and-fits-your)

Typography is another key element of your design foundation. Choose fonts that are easy to read, match your brand personality, and work well together. Pay attention to details like [letter spacing, weight, and line height](https://www.designsystems.com/typography-guides/) to create a pleasant reading experience.

Establish a consistent set of font sizes and line heights when defining your **type scale**, commonly set around a base size of 16 pixels. You may also want to organize your type scale by its intended application in mind, such as ‘display’ or ‘title,’ or opt for a more primitive naming such as ‘heading-100.’

[![Graphic showing the 'Typescale' tool with an example of a typographic scale from large to small text, using the phrase 'The quick brown fox jumps over the lazy dog,' against a vibrant yellow background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByklEQVQokYWSXU/TUBjHe07PaQveIIQ7hoHoBR/DeGn8MkrCNTeGLwAxoglsag0xukgdLGHZ2GhPm72wkYG8hTEpxQ2QlW2lm21nejYSrjD5XTxP8n/yvPwfpkOYewEdAjuEpUBPBR5hOmqP+ysZT8WuOuhoAVcLOOpAW8EtGbQpLRlQBWEcmXEVP/BRKLTY0Yat/PPG7tTN/mQz9+wyNmhEOCPC6xJ3ssz5ivYGuIhCQ2JPJWRIyPjB6svod4RtJmA7/djce31VydfPtdrO5MnKo+LnvlzoQWaxPxvs9ztYSXD0FavvhcQbIfVWUN7x8ryQDfLVFdZOT9RLs3WzYl2X6/vT+up48ZOQWexLLwi5oNDrXF1ld5dw4SO3LXIHX3DpGzqVUCMO7fTE1eFc9bzy56Jc+zl9Fh3bEfl8iM+HuMIHOranADsJzRisrcHrGLTWwV8ZOApwCWNpT0rZmcxmobCl6plXZ9HRvSW+KHLbIi6KuHdVV/HVXdzuqVV/I5sM/0q+2IxNbcVfGsmnl2sP9e/oOIzLYXQcRneMuXXvrlUuwTfykJkKmKkRe2OglULWOmjGQTMBGnFq1X+fxCOsR5/ET+lEXf4Bq6ZlF04yUlEAAAAASUVORK5CYII=)![Graphic showing the 'Typescale' tool with an example of a typographic scale from large to small text, using the phrase 'The quick brown fox jumps over the lazy dog,' against a vibrant yellow background.](https://cdn.sanity.io/images/599r6htc/regionalized/7442a27c20f463eeaf75ac81927a15d3be5fe6c0-1920x960.png?w=1920&h=960&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/967802396210455992)

For **type scale**, use plugins like [Typescale](https://www.figma.com/community/plugin/967802396210455992) by Sam Smith, or [Scaaale](https://www.figma.com/community/plugin/892543384437155629) (with three A’s) by Nicolas Massi.

### [Use elevation to create visual hierarchy](#use-elevation-to-create-visual-hierarchy)

Elevation refers to the use of shadows, layers, and transparency to create depth and order in your design. For example, cards can appear slightly raised off the page, or a dialog box might become a focal point by seeming to float above everything else through the use of shadows.

Elevation can help you structure your design, guiding users to understand which elements are primary and which are secondary, in an intuitive way.

### [Create consistent and meaningful icons](#create-consistent-and-meaningful-icons)

Icons are small visual symbols that communicate ideas and actions quickly. A well-designed **icon system** strengthens your brand identity and improves usability. Make sure your icons are clear, consistent, and maintain their meaning even when styled differently.

Use an icon grid to ensure consistent sizing and alignment, and provide descriptive names and search terms to make them easy to find and use for both designers and developers.

[![An image displaying a collection of colorful, stylized icons laid out on physical tiles, with a soft, pastel gradient overlay. The word 'Iconography' is prominently displayed in large black text, with 'FOUNDATIONS' in smaller text to the left side, indicating a focus on the fundamental aspects of icon design.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVQokXXRWVPbZhSAYf/o3nX6AzqlveqUKUlqhxYSSgzEMTYYDAZ5iyXLqyzvtmS0ffISb1zq7YQmaZuZXrxzvqtnzpkvNOw6jIc+rr1GeNsveZ9z//X+mPiUv0VMt4jZNhCzLzMImUOfB2OGYy3xnDXC3TzlfZXrrLHtFY6zxvU2/w8Ka4U9WdBpGZQVjbKsUS41KRVrFPNVSsU6cqlJVlJJpwvk81X0tonlLP8Gp5v/glN3gzNZoMoa8ViKs2ick+MYr/44Jvzid/Yjrzg6POH5s312d3/j4CDK3b2MMZnizx8Rs8evQG+DcFYYA5tWVaehNKiXaihSiUzihsxFhkKmxE0qSzqVQ7pTUNUOhuljO3Ms2w9c8QExe9o0CM38DXOxZiWWbNwZK8Nh2jawKz1GBZ1Bsc+gYtFSLRqySVMZU5UHVOQ2arFEUykExmiEN119AsWShfeBtSPY9vss1Bp2TmV8X2OQ0ehdt+mkByipETexNtexOom3ZRKnErexOOrteTDuaHj+8vOnCHzLY95tI6RrrOQ55qXE6LZBN6XTOpLR9ovkwwqxsMLpUYW3sQYXyQqF6yyt/H1g9rv/gO7EQZg2QmvycBXHOIsySdxipjX0dzrlXyXKPya42Uly+MsdL/+UeX1Z412mjiSVachyYAyGeP4qEPPHIOSYNt7EYTE0mMoyk8QF4+M4xmkW/U2d93tFsj9dcbJzxQ+7Wb47es/38SyRyztimQK5shp0R2McsQxcfx2EvAf36eTVg8tKH+JJVcZnGXr7VzQjeeRIhfsXKtFnFXbCNb45rPBtNM9uUiKak8loeqBPLAxrGoxMLwjNvTkLb876I6qPmSo93HybSVKlfZCnHFG4Dzc4f6nx+k2XvUSfn1M6e5kGUVUnNxgHHctjYLhBu2cGfwGP5kV4toFMdQAAAABJRU5ErkJggg==)![An image displaying a collection of colorful, stylized icons laid out on physical tiles, with a soft, pastel gradient overlay. The word 'Iconography' is prominently displayed in large black text, with 'FOUNDATIONS' in smaller text to the left side, indicating a focus on the fundamental aspects of icon design.](https://cdn.sanity.io/images/599r6htc/regionalized/4a2917fb40c037b561f182a1f586bfed1db0495f-1600x960.png?w=1600&h=960&q=75&fit=max&auto=format)](https://www.figma.com/community/file/836835755999342788/microsoft-fluent-system-iconography)

See how the Microsoft team uses [their Fluent icon system](https://www.figma.com/community/file/836835755999342788/microsoft-fluent-system-iconography) across their products. The Fluent icons include rounded corners, simplified shapes, and come in regular and filled.

### [Apply tokens using variables and styles](#apply-tokens-using-variables-and-styles)

![Image of a cylindrical stack of green, yellow, and red striped disks, creating a layered effect, against an orange background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACgklEQVQokSXS2U4TYQAF4HkYO52tlKWUTVo6tJ1Sg5CIQYl62/ln6VCxZbayqLEJS1zqHd4IxQLB0oJt6nLhRtxAUkO4MRENWBro/MMjaPUBvpzknINA3goFrCyRn/S25enAw/v9iQeD48krWvKanrw6nrycuDeYnBlI3wp+Hu04EuwmwE3WYrIoBCQCeQzy2KFEvlPbUolAcrpvanrg9uylyZmhydmhmzODiamLd+9ceDTRm1fo3YjziKcgazFDKGRJBHIY5PGKiO9F6jejzS9jrRuxzlWZTqv+RY1Jaf6U5kvpzLwWeKwHn2rMZrR9X6QM1mrWMI9DgTRE4lggfvPYdw7/ItS/GW59NXK2EHVvxNxZ2bOi+eb1c3Pxvrmx/rTe8/F6yxGgTGBDDI40BAqKlCkQBo/94In3w83FaGdhtGtDoXMKvabSq5o/rQcX9N4F/fyy0rMZaS8DOwQNCOT/Y9IQyUOJ2r7RlJddGdWb0fxrGpPVvDmVzqndWY3JaD1rarAY9ZbCzgqog1wjAgUcigQU8YpEfR11rI+7l+K+JZ1Z0QMZPZBVfeuypyC7izL9Qva+jtE7wx0HnN0AFOTr/7Vd89iBRL5VWlYmPItjvidxZjnOZOL+rNa9rnieKe6C4nku0x9GXD9FhwEIExCQsyNmDWNQsJZFfGukoai05xTXP+DJK7XMguwqyO683FWMdW1F2sp8ncmiJmuFgEJqJ+ExU7BWBeyXSOxJtm9SYyns2JGc2+GW7bBzJ9xUkhpLUtOu5NgXGqqAOA2dqe0MSMTkUMjjpoCZAmbwqMFZqgA/YaljYKsAe4WtOw4RJyG0yqJVjjQ4m1nDltMQ+nfnP1c1QX8QYAP8AAAAAElFTkSuQmCC)![Image of a cylindrical stack of green, yellow, and red striped disks, creating a layered effect, against an orange background.](https://cdn.sanity.io/images/599r6htc/regionalized/c2ec7935a7200553532c040462f10487fe4ab1cf-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

**Variables vs. styles**

Variables in Figma store single values such as colors, whereas styles hold more complex information, such as gradients, and are better for detailed, multi-layered designs. [Learn more](https://help.figma.com/hc/en-us/articles/15871097384471-The-difference-between-variables-and-styles).

In Figma, you can use [variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables) and styles to create a consistent and scalable design system. They are most commonly categorized into two primary types:

-   **Primitives:** These are your design system’s basic building blocks, like colors, spacing, and sizing. They form the foundations of your design but aren’t used directly in components or layouts.
-   **Semantic:** These provide a meaningful context for how a variable or style should be used. For example, you may have a color variable called“color-background-warning” to convey a sense of urgency or potential danger.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACcElEQVQokS3LaU/aYAAA4P7McbT2ePuWthwyBXogKlRo6UGhtBQohyKKc5lmcVPZ4rziXHaZTRM1xi9LtmX7E/uy5/uDwP6AGlucu5tQL5hmhxhksO5cxM/gps1kzmDmBLdtNBDDbSHUFsK+gPZyYEOCk0U2aCGwvUmtNmL+iG2NwEAh/SKh+3g5IEsjWnoNxSlYeYYb3YitheoKVm3iWgDcBhiojNNHYHuDWqvRayY9LtN9FaoTJncBsydkcYzrNqWsxsQzKJ9EVC9saqS8A+fOaXWL6hi03UPY+pTxNmHPg+tqzBly0kd2/goUdjFbQ90FcmXAzn9hMp+jK92wboDcARu/YQpHtLXBVF4iqeXHRPFbrL5DD03W3uSFK0Y+xsxa1CvgVQ8KR3z6lsl++p+FfTZ+y2fu4/nruHCLpKU/SelHTD8EAxM6Abs8Bco22ijPNDRQmjDiO1Z8TxemkYob0nViYYvJnCeyd7PZn6m5X8jT/N+U/IM1ptTQoAKVcmyibqLuEtZUcNsizAZpeTOWE7IqTywlUjUJ3eW0V7OFu3T2N5JWHpOVK9bdBeMqOVogAgnz85GWFPXkaEtCfQlrF7BWMVrTo0Y9atYwv8gMjGRjL126QTjnDdNdh2tNeqJQ6zLRy2EtKeKJEVeMejm0JWCdPOFWgbIN5WM6/5bSh/RqhRtZCecFEmvu0UEf9n04cEDHJJtVvGaglo6aOmZpMzUNr1uU0WOlMz51zyXv2dyHmPmc8btcbRtJlK/5yiWvXnDqKVs6YhandH4KpAMgHgJxH4gHMD+Nyadc+jvPP3DcA594iAvX/NJlXP76D3uMW1pPjIQDAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/d963492804d6cd64e730c464bdb4e44f3f41e096-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

Watch [Figma tutorial: Intro to variables](https://www.youtube.com/watch?v=1ONxxlJnvdM) to better understand how variables work, and how to use them to represent design tokens and account for different modes and themes.

Creating a shared language between design and code is essential for tokens to be effective. When designers and developers use the same naming conventions and token structure, it becomes much easier to maintain consistency across both design files and code implementation. This alignment ensures that design decisions flow seamlessly into development.

When naming your variables and styles, use clear and consistent conventions. Design system contributor Nathan Curtis [suggests](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676) combining a base (like color or size) with modifiers (like variant or state) to create names that are easy to understand and use.

This naming consistency extends to code as well. [Understanding basic syntax patterns used by developers](https://www.youtube.com/watch?v=t2bMxHk7D5k) can help designers create more implementation-friendly variable names. For example, using kebab-case (with hyphens) for CSS variables or camelCase for JavaScript variables can make the translation from design to code much smoother.

### [Use layout grids and spacing to create visual harmony](#use-layout-grids-and-spacing-to-create-visual)

Layout grids, spacing, and sizing (referred to collectively as “spatial systems”) are like the invisible glue that holds your design together. They create a sense of structure, consistency, and visual harmony that makes your product feel polished and professional.

-   **Layouts:** Define how your design adapts to different screen sizes and devices, ensuring a consistent experience across all platforms.
-   **Grids:** Use column grids, baseline grids, and modular grids to align elements consistently and create a clear visual hierarchy.
-   **Spacing:** Define consistent spacing units to control the distances between elements and create a balanced, readable layout.

When thinking about spatial systems, consider how your layout decisions will translate to code implementation. Discussing with developers how grid systems are implemented in your frontend framework—whether it’s CSS Grid, Flexbox, or a UI framework—can help ensure your design decisions are technically feasible and efficiently implemented.

**Why is eight a recurring number in design systems?** It’s simple—the majority of device breakpoints are divisible by eight, making it an ideal base unit for grids, spacing, and typography.

Many types of grids can be used to create the backbone of your layout:

-   **Column grids** divide the screen into vertical sections, making it easy to align elements and maintain a consistent look across different devices.
-   [**Baseline grids**](https://www.figma.com/best-practices/everything-you-need-to-know-about-layout-grids/) control the vertical spacing between elements, typically aligning with the baseline of your text.
-   **Modular grids** combine both column and row divisions to create a flexible structure for more complex layouts.

[![This image shows a comparison between two types of baseline grids used in graphic design. On the top, there is a setting panel labeled "Rows" with options for Count (100), Color (red with hex code #FF0000 at 10% opacity), Type (Top), Height (16), Offset (0), and Gutter (16). To the right, a graphic demonstrates a baseline grid that highlights line heights with red horizontal stripes spaced evenly apart against a white background, corresponding to the settings.  Below, there is a similar setting panel with the same options but the color opacity is set to 30%. To the right of this panel, there is another grid graphic, this time showing a baseline grid that highlights baselines with solid red lines on a white background, indicating where the baseline of text would align, also corresponding to the settings in the panel.  Both grids illustrate tools that designers use to ensure consistent vertical rhythm and spacing in their layouts.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABTUlEQVQ4jYWU666DMAyD9/6vug1o00vawnzkQBmMI/HjE6ikxokLjxgjUkoXuC4i8N5fCCHY814XDzz6g5wzSikG77nupgnj64WBPJ/G+H5DpgkpBOQDiToU/IopWq1orZmoFTiHPA7IA3mv13FAmSY077+Ih26iu2ArZaVWlFqRU0INgsU7fG5YvLfaXVBV0VrFPM9GrRW6Cd6JfTZOgnRIkaPg6jBgoUv5xZ+YRVB6y8dQ6JTw3mbIgYuc0LBuLjGeyD2UHndvvQtyzTuHaRwxkmGwq3MOkS+iiQP9uFnLpKii9lCYckoIIhDvId5B3EqkS46D9Rvcq+yqC9oMLeX16PSzWHLGrHqmKJZSLlQ9CFrKDKW1b8p8iSo+td5TKKhnhzzQy7IYu2DOFyfc/Is5PLbcXfZPz4LhGme1Cd/BWhM8prwTyf8/jTv+ANM8QBM/dhrPAAAAAElFTkSuQmCC)![This image shows a comparison between two types of baseline grids used in graphic design. On the top, there is a setting panel labeled "Rows" with options for Count (100), Color (red with hex code #FF0000 at 10% opacity), Type (Top), Height (16), Offset (0), and Gutter (16). To the right, a graphic demonstrates a baseline grid that highlights line heights with red horizontal stripes spaced evenly apart against a white background, corresponding to the settings.  Below, there is a similar setting panel with the same options but the color opacity is set to 30%. To the right of this panel, there is another grid graphic, this time showing a baseline grid that highlights baselines with solid red lines on a white background, indicating where the baseline of text would align, also corresponding to the settings in the panel.  Both grids illustrate tools that designers use to ensure consistent vertical rhythm and spacing in their layouts.](https://cdn.sanity.io/images/599r6htc/regionalized/63e1e589154290bde7d0d35d96bde2673924470c-2156x1532.webp?rect=0,1,2156,1531&w=804&h=571&q=75&fit=max&auto=format)](https://www.figma.com/best-practices/everything-you-need-to-know-about-layout-grids/#types-of-grids)

The grid settings above illustrate how you can take different approaches to styling a baseline grid.

**Responsive design** is an approach to building for screens that takes into consideration a diversity of devices, optimizing for an optimal viewing experience across each.

By providing pre-built layout components and templates, your design system can help teams create **responsive and adaptive designs** more efficiently. These components can be built with a set of predefined breakpoints that determine how the layout changes at different screen sizes, ensuring visual consistency while making implementation straightforward for developers.

However, just having a system in place doesn’t guarantee that everyone will use it perfectly. It’s like having a recipe book—it’s super helpful, but it’s up to the chef to follow the instructions and create a delicious meal. That’s why it’s so important for designers to understand and embrace the spatial system. When designers understand why consistent spacing and layout matter, they’re more likely to create designs that look and feel great for users.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACp0lEQVQokR3R+08ScQAA8Ptfeoy0Zmv9EK1Vs35w67FWrh9E1OU0gYM7uDsOTuQlaIpPwJxO5I2IEOKhhqkDCktbaZtz6azMtwnf46X0Y7M/4PPTByrEFaczRKbvMYMWMTJ2zlWfnlW8p6VNTkGlFebYJY1uMjD6ym0KkcSaULyjUm/aTPEVvyU73wIV4oqTKTTTXcaIWAx+PTtUlY7IE2Fc7RJU22CuDaOcpMdh6G+PSNB1GNnGZXsa9eaoObIRNJ/h/Dg/3XIXCC4AtCRrKmemiA80rnLyq6ww1yppdEj97lZXT1CBLyOiHyi2L8YPdMrVgJmGCjEq561llDcY3nkGLs60PQAh5D8WcIeFHIuEckjf+lVfvKaxnjd66jOGbSOSQ5LY6tIuQafz8qyVA8hrTMM5wGelNaXAx0vQmMZ1hissmMxOzgYVu9P6JeegWRcjiN8IdiQltg3qr9DJOzLzuhxISpiG86CBxVC3Uo4XiQmx1gNzraIKCyGzy2fHlRuhjqDJr5J9E+N7CH4kI7eM+kUoPylJdz5kkMsM7yLgFQH85vFgZTyIqkeEVVYRZ5igHPLpQHPUYTUoFxD0Fyo9lFK7Xbrl8EAIyvleMvpSILoEYFaKfyUlZh/1Po/7hGqPsNom5NrwRpc84G1zG2n5WdWuVLFv7FiJOn07k71Quv9ZqomdFBcn0eJj0dWkmH3Y+ijmrFe74RobXGPHlB5ZwNvuMtJy6RqK7bTo1yOO0MFM50lMBzHmJ6DtPtDdBro7oPke0JX96X666Kzr94rUHkQ7gg/5ZZ8mtB/dQ8OGiFG/EByY3KRN+ai2ENNAuSA/N1aX89XmR2tz3vqcl8f44Z+0ZDFMxGkiESZXp6njOWUyovse6Fnx9m1NdGTnNIWo8m9U9Q8E0oyVrlhmrQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/ec5d64028b37122d7bbb948e2efdb44ba4de9196-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

## [Step 3: Build your design system in Figma](#step-3-build-your-design-system-in-figma)

Building a design system in Figma is all about creating a consistent, efficient, and scalable way of working across your entire project. Here's a step-by-step guide to help you get started:

### [Take a closer look at your existing designs](#take-a-closer-look-at-your-existing-designs)

Remember that [initial audit you did](https://www.figma.com/blog/design-systems-102-how-to-build-your-design-system/#take-stock-of-what-you-have)? It’s time to revisit that alongside your code audit. Start by mapping your design elements to existing code components wherever possible. This alignment ensures you’re building on the foundation your developers have already established rather than creating parallel systems.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAAClUlEQVQokRXRW09SAQAAYP5O68HHai2LueZcNC+bgqnY5CKcw7l5rpwD5yCHmwgkCN5IDXFJCpqGJt6ClIBRkLeitWYvAlY/ovEDvqdPgtPVgHk/uzh/tRctLwb2WDZnQipOsGwBtxB2BpwehzcC4PIs5PSa9KJHPu7t95h9DHYKozUJQV8HhMNMbONH/qgQW9418ycCc+phCyKTwEQvGGPhT6NAygcFBAGD/Bo6AFgtkzT2tYFxuurl0qng4tnKbD7gSJH4BxorWuAcC76DiAXAEzLMh4FgBBRCNOwVVVPiUIhx8mgBQWsSjKrZsFQExDZ1sk1tR1yviRPaHU6+Qym20OEDSvNFkH829e4R0DZrzLrwvA1cI12jaB7B6hKcqnK61RFZp675Ntn6wKNWuayAZWLQ6RqKWoBSuKf+/uHvRGvGC6eDwcpO/HwtErNGzcQZSvyREMYao19Vt3V13WvStDyyq9QWEcb8Os4NRGxg+XXPda7l1/6TTBBKz81eZg7L25sxZ0ygz0eYfxKCvbGgu65+0N35ONQti2jUUVK7YlasMn1vSe2JY6AyLbsMdBzxwC7P533WgtuYYHw2qtjAuLFuJ4/DcDCqF94MU1sInLMpfvqlF2Oth5Q6QwEX/MCZaTAJG+aUyuke6bxcOqPmeKyIEjcSnKmKZMGFp0Us6zUk1jnuW+zp3+ydq6T0o0uV5fELN152EGsQQslkiru3nt9vYuRGGi4hWK2BR8miiGc5rOQ0JGNGa35p4PtBeznenbLDeyb+xGFNW63LBoZq75M3tyilbXSvjYZKjSqcrvHUuYgfC+ix3ZD0o5GweTJi9y4IE8GRl1Po0hy5NINFfPpXJmUIk4+Rz16YtOskUoHR+n+8WmcXHcFPAQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/94a257614468eb378d2a2dacc4e0c12da8bf4b0b-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

[In this Figma tip](https://www.youtube.com/watch?v=EA0NbEOrpuo), Designer Advocate Lauren Andres goes over what component properties are and how to create them.

[**Component properties**](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties) are the changeable aspects of a component. You can define which parts of a component others can change by tying them to specific design properties.

Define your variables and styles based on what’s already implemented in production to minimize inconsistencies between design intent and technical reality. Then, define your **components**—the pre-made building blocks that you can reuse throughout your designs, from simple buttons to complex modals.

### [Choose clear and consistent names](#choose-clear-and-consistent-names)

When naming your components and variables, choose names that reflect their function, rather than how they look or how they’re coded. Use **semantic naming** that reflects the meaning and purpose of the element. For example, “color-warning” for an alert message or “surface-primary” for the main background color.

This approach to naming creates a [shared language that bridges design and development](https://www.figma.com/blog/the-shared-language-of-props/)

. While designers might focus on visual variants like size and color, developers are concerned with behavioral props like accessibility attributes and event handlers. Creating alignment on how these properties are named ensures smoother handoffs and fewer implementation errors.

When it comes to **naming cases**, talk with your development team to learn about any existing conventions in your organization that you could align with. Hyphens (like “primary-button”) and camel case (like “primaryButton”) tend to be the most commonly used approaches.

### [Organize your Figma library](#organize-your-figma-library)

One of the great things about Figma is that you can share **libraries** across different files and projects. This means that everyone on your team can access the same set of styles and components, no matter what they’re working on.

When setting up your library, think about what structure will work best for your team. You might want to keep everything in a single file, or split things up into multiple files for different parts of your project. Consider how both your design team and your development team will be using the library.

To streamline the handoff process, consider using [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect) to directly link your design components to code implementation. This powerful tool surfaces design systems code from your codebase within Figma, making it easier for both designers and developers to maintain consistency between design and implementation without leaving the Figma environment.

[![A dark-themed graphic highlighting 'Design system structure' with a sidebar titled 'Best practices' and elements such as 'Alert', 'Header', 'Footer', and 'Textarea' linked by a flow diagram.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVQokY2S206DQBCGl11aDks5tWiNxqi13njhocAClkb7/u/0m52thFBae/FlWLL55s/OMJdtoHHYJ9VL+LvrWQV8q6RqyMH6F3Q9x1AouYIUNXyu4HMjZkdd2QYBzxHaBUJh0Gf9fyjXIimqnjA/Fs5EgdugwXPSEqukxf3sC/Op6hroO5IXkEIhEDUkr04LI7vAU9zifbnHx80eb9c/eM2+SfwQbom7oEE61TJ1YULZYJ3u8JLusE5aYhW3eIy2JNY1cysj5P8IfctIY7tEPCkpcXT41iwcRQ2v3Aozu6Kh6OGcFPbPfXzLDGp+EC69GqEWjiUcrs3Y7ulJJ5MSmatItnBMwkA0XcrRtTmHZ5knMeSUqktIC57jF8+c/edZurKdAAAAAElFTkSuQmCC)![A dark-themed graphic highlighting 'Design system structure' with a sidebar titled 'Best practices' and elements such as 'Alert', 'Header', 'Footer', and 'Textarea' linked by a flow diagram.](https://cdn.sanity.io/images/599r6htc/regionalized/2d3a9345a5a8c096225f4d201bb57ccd0bd4f0a3-1920x960.png?w=1920&h=960&q=75&fit=max&auto=format)](https://www.figma.com/community/file/985175703891677674)

Looking for guidance on structuring your design system? Check out [this Community file](https://www.figma.com/community/file/985175703891677674) from Figma Designer Advocate Luis Ouriach for recommendations on how to build out your design system for teams, projects, and files.

Remember, building a design system in Figma is an ongoing process that will grow and evolve along with your team. Start by laying a strong foundation, and encourage everyone—designers and developers alike—to contribute and help improve your design system over time.

If you want to learn more about the nitty-gritty of building a design system in Figma, check out our [step-by-step walkthrough](https://help.figma.com/hc/en-us/articles/14548865734679-Lesson-3-Build-your-design-system) and the video below.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACpElEQVQokSWS209SAQCHz19kZs4rV1Gas+WwBA3inAOIlqSpNHtqy+eaQWjeUAO3AEkTsSHIRc8ROBYXtRIzAbkJruAhQW4Hm7b9Xr/t274fYEVHFJ9HpMaeT15GIEE/z1DyuXo8V4Pn6vAcBc/TillaIUvN50nnGVLgrGnZyxw1PJnXvTRtvACipx3b38F3NlBmBtddbPcRIxhqTB7Xpr9VXezVZnzE80Ny0k8NhunuX61GD0dm7ZJZhcgeFArfByJRtuuQrbCzJyygFuWpEUhna3cuNgbeViVflf+RVfqnic6PLTorS4VwtXb+hE0wb4e/+DihMBPw7A7q0cHRdaHExNMgAqWNN7fGVcsYO2JCQlSW6K/AhptUUpZcx1VYIA0qkJh7Xht7dciAy90HRGMc7ACcQcAxM7yI8pU2vnwNUkiZqJgS7y2PiyoRcfP7N5zpFUhphbR2wfhm9wwqwA64kWg7EInBmI8nR6FxC6xF+As2nlwPKaQsZIgaf3wjLrqFiJsVEs7MKrywBS9hXZNoz6xDiPngcLQD8O4/W3WIR03dUhOs2eIprfDc2kPVWBs2TEw8LTt7enPnOU0tY83pwf/wGPJIYu3TO4bcu/1A9PSB66hTYe+ctHC1CKxGQB3CdKzQA/Lq1HRFaqoyOEvElltWN1mabe6SUzCFdCmc8Nef7CvtcJSN7EPjVlBm5hpcbNcRIxhrSkXq0v7qrJ+Q9ZMzAXLqpCEYpnuOW43e61QW4dYufBJiAp69AYOzT4VxNn60npzd/puhFgrEUqGmVKjDixS8SCsVaHjh+iQX5NBvuung3gcHz7Dd73KJgGiMFY7fiaWoqTQplyfjOKmEEy6LtZd4fQlvwPHG0tUaSjgJLxHyBUIqTYkl6ZHTu5FI2z9SqJ+rBU2s/gAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/5b6d531eaf0852b4f4c48316c84b449777dd822c-2560x1440.png?w=2560&h=1440&q=75&fit=max&auto=format)

And if you have any other questions or topics you’d like to learn about, give us a shout on Twitter at [@figma](https://www.twitter.com/figma). We’re always happy to help! Learn more about how Figma helps teams drive consistency, scale designs, and maintain parity with development using our [design systems features](https://www.figma.com/design-systems/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=ds_102&utm_content=ds_102) and [request a demo](https://www.figma.com/request-a-demo/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=ds_102&utm_content=ds_102).