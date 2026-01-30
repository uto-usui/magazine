---
title: "Behind the scenes of creating the official Figma kit for Tailwind UI"
source: "https://www.figma.com/blog/behind-the-scenes-of-creating-the-official-figma-kit-for-tailwind-ui/"
publishedDate: "2021-03-30"
category: "design"
feedName: "Figma Blog"
---

_David Luhr, Lead Developer at Tailwind Labs, shares how the team created a Figma kit for Tailwind UI, a set of fully responsive components that helps designers and developers collaborate more efficiently. Here, he shares what he learned—from organizing the project, to getting customer feedback, to the small polish details that made all the difference. Today, a starter pack of the kit is [live on the Figma Community](https://www.figma.com/community/file/958381589801778722)._

Tailwind UI is a collection of thoughtfully crafted, fully responsive HTML components built with Tailwind CSS, a utility-first CSS framework.

Since [Tailwind UI](https://tailwindui.com/) launched in early access in spring 2020, customers have asked almost daily if and when Figma files would be available. By the fall, demand from customers became overwhelming, and I set out to create the official Figma kit for Tailwind UI. With over 400 fully-responsive code components, Tailwind UI's surface area rivals most design systems, so I had quite the challenge ahead of me.

For much of the next few months, I'd be heads down in Figma, building (and even rebuilding) over 1,400 components and 10,000 distinct elements, all while keeping quality and usability top of mind. Here's what I learned.

## [Attention to detail at every level of a design system](#attention-to-detail-at-every-level-of-a-design)

Building a commercial design kit requires the utmost attention to detail. This is in contrast to working files for designing new products and features, which are often messy, temporary, unpredictable workspaces whose sole purpose is to unlock new ideas and solutions as efficiently as possible.

When the design files are the final product, decisions at every scale define the user experience—from layer names to component structure to page layout. To build the best Figma kit possible, we had to flip the typical workflow, and have the final code product inform the design files as a pixel-perfect standard to match. Maintaining high quality at every level of a design system was our north star.

### [Naming layers](#naming-layers)

Let's start with layers themselves. I established naming conventions and labeled everything accordingly, making sure I was staying consistent throughout. In Figma, consistent naming also allows for overrides to carry over when swapping instances or changing variants of a component. For example, a "button" component has a simple text layer named "Text." If I change my button to a larger size variant, the custom text I create carries over. With more complex components, this saves a lot of time for users, who might customize icons, headings, paragraphs, link text, and more, then decide to swap their component for a different variation.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACC0lEQVQoz22TXWsTQRSG8/8vRBD1QkVExLa0QqGlIl5IKRUaKhRskqbaJO5mv2Z3dnZ2d2a/mtczOxs/0Isnk7DhOec9Z3YUswwiVchlhTyvUJYaRVHCdRnG4++4uFhgMolwO+eY31huZhwzYjrhmFwnWK1SMCYQJwKjIlfQqkWl71FX92gbOpsGvp/j/CzCyVFAMLw/jnF0yHoO31kO9iLs70T4cpki4QUyWWKkVDXIgKYGum6Dtu0QhgqfzwUJEhzsMuy9ZXj9MsSrFyGePw3w7ImPxw89PHqwxuknTkJKWWiMTMReqI1wg67doGlbCKEpSoHpNMfVlaQuJBXIcHYq8PFDipNjjv3dGDtvGC7HGXg6CE2HJqrprhdSh03T0hwrJKlGFGsEkYYfaniBhutRIUfjbqkwnSl8vS7huIriboUlRa62kQchdShpQUawcissHYLOxXDeOeZ7TacljCv6v6alboX6/0LTmeNVVmqEP0hGfFtabhc15oQf/SlU+u/I7RCZColMgQtF0VU/9DjRYETIaAzMjmBNxFwPQvXvltte2PX30VwDkRW/yKS9GoKwz0qkhMzt/OyW6UOrjtj04sbcw7rpqyU8B4ulJZHU4ZaMnknabI5U5L3cSCUtZiSEpLeE7LJGQXMzMzVvCk8zBGEKP+Dw/N+sPQ5nncAlzG8/5FRQUIGs5ydabzhJJZhQSQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/27104debcc96b5690b04350a8356d31268e6f008-1606x906.png?rect=1,0,1604,906&w=804&h=454&q=75&fit=max&auto=format)

Layer naming in button variations

### [Organizing layers](#organizing-layers)

Now, how to organize these layers? With the latest auto layout features, combined with layout grids and layout constraints, you can create layers that mimic HTML markup pretty well. While I'd love an option to stack Figma's layers bottom-to-top to further match the stacking context of the web, you can get a good approximation. This is worth it for a couple reasons: there's shared understanding between designers and developers around what's possible in terms of layout in the browser, and there's similar architecture for customers to navigate in both design and code versions.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACUElEQVQoz23TyW8SYRgGcP4ptSrWirKJGlqtbbzUpi5YmtqiCYnGmzExXq1Jqx6NiVGvxpq4sJW9lK2GaqHA0GGYAWaG/fL4DpQU1MObuf2+511Gldgt4WdGRCorIZWX8IuRsFeUwAkieKGCZJLBx/dRvF7z49WqH2/fbGL98298/cJg/VO++41FObDFCoRyFaosJ4LhGygILexXqKpKNSFIDVTFOoIBDk8fx2G94YNl1osH98N49mQbj+xxLFk2YV/awod3eygUJMi1OlSFsgxObKFY7XSLkzpgpTbKchMioR4Xh3sLEZg0DhhOf8f1aS+W5yOYNm9Aq/6GcaMTqysp5Km7eqN5AEo9kK0QKrbB0gN90O3kCIjBMLoBndqFmakAlu5EcfViAJoRF8x6D4E7XbBWV0BBJoRAsZeOkwmUWgMJeUq4jfNjQUL9mJ2OwDafxNSlCM6d8GPCGMTayu4hyPAy9ss0tzJh4r+g28nDZh0Gl/vg8T6YHgCFHljgO12UFTtDLbscJSzeSkBLaXRqBdzC3dsJXDaGceaoDxOGEIGZ4ZbZag9kSgraxv4A6PxRgnUuDs0xH7Qne+DizQTMuhDGjvwPpKUUCVSwfLFD56MkPNyyi8CFITD6FxjGyxcKKPe2zAgSpWoS2CawTWB76A7djiKWLVvQq73QnzqYoSWGSVMAZ0e8NMNQd4a5nHKHDagyrIAcJ1HVkC9R8TXkaFEs/SklvkpgFg9tfozrXLig8WLuWgj2xSBmJj0wjrpxxeTH6vMdpNMCyhURfwBocMjRWpegNQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/f80c83622749fbfa295d56e3a13b402d11b699ab-1606x906.png?rect=1,0,1604,906&w=804&h=454&q=75&fit=max&auto=format)

Layer structure in a complex component

This also reveals opportunities to document patterns that otherwise might go unnoticed. For example, many components in Tailwind UI have consistent responsive padding and a centered, max-width container. By creating design file layers that match what's needed in HTML markup, developers can see this consistency and create a dedicated container to handle these repeated layout rules.

### [Crafting variants](#crafting-variants)

With well-structured components, variants can vastly simplify design systems and make components much more adaptable.

Instead of manually maintaining and arranging a collection of 80 unique badge components, for example, I created a single Badge with convenient variants for type, size, theme, and some optional secondary elements. While it takes some upfront work to create these variants, it makes the final component much simpler and more adaptable for users. Customers can drop in a single badge and quickly adapt it to their needs with an intuitive set of options.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNElEQVQoz5WTy47CMAxF+f9fZIHEDG2aOHaeZem5CbQQmJGYxVEj1T65TdzDNC/qiNVz2Jlmp8fjWU+nL12sVYv3ixO1gBok6n0YejYOTRZT0ZTrDktWY0itscqe1ElQy1nJFxUQBaQ69GwcmrUtSr3upLxqCFkjYzMhpYB0kBCvEKIR65xWLeU69DUGYS5rJ4EYsyYWCB2EPAgjN2Hd6595E7ZdW8K4J3wXbgl7/db3V8ImzHdhTxjwyVFwjgWHjqNgCEPtNR8Le8I4Cm24J2xCqZ8n7Gf4nLB9cuSH8D9nuJFfL+VZCLaEv94yeelzeEt227XNWJCkwXsIMNiCwcYcOsKMUukJU6x7/ZBwxvA2KUsEoT8Jf4G1Xt1sMNwXvSxGz4b1ewpqJlwQ1p5Qy/He9+AHi2NIX+FYknEAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5f2ad27df439950d0a69acbacaff3bcbde8e4d66-1606x906.png?rect=1,0,1604,906&w=804&h=454&q=75&fit=max&auto=format)

Badge component with 80 unique variants

When creating variants, it’s important that the same properties a developer might provide with a code component exist on a component in Figma, using the same terminology. Again, consistent naming conventions and structure for variants provide a predictable experience for design kit users. When building [Tailwind UI's Figma kit](https://www.figma.com/community/file/958381589801778722), I found that across hundreds of final components, I could use the same variant names for the vast majority: type, size, theme, position, breakpoint, and state.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABtUlEQVQoz3VT2W7kMAzL//9k0WZy+L7tHINhJRvtYhboAxFDkSlKoqd1E9h2g3XTkMrAugAfIqwPENJiWXX/r7SFsf4N1jp475FzRq21Y+JEbSKRBUqKCLEg5AKfMnwk+EQFMsUzYipvCDHBOYcQAlpreD6fmEal1EmtSyM5145UKnJpf4IJpVQQQnTS+74xaeM7kSV1PiQkIip1XEhEzuBzqccbMhVzzmNZFszzDK11VzkZJjQBWuqeUNuB87rp5wFPM7LGUpGC47x6nMFnLmKp3WVZOynP8rquQWiUg1gFDM2T1fGlSl+jaFFC9vn9T8h5vDwpZUdKacyQW1bSYXsI+rKaRupuSmhQu8a+SThPW2wX2nF38DmXo8/QGHKGtZ3wd4ZKeexkD609LYXndSFGIhSWFBpqp6CUi1QP8JkLRyLkVmOM/7bMhJoIpWCfBSKsPdnRopSimOELtSt6R+uzZWXsP1b3er2GD/dN4fHYsAvdN82QtCQeuJAjNnz348Xa3ZDIq0xYSsF5nkMhv5T5a8XHxxdmIh1GpxeybBT7/I2xX7Vx44XQa2I4ek3svx9SbvsbzChIy5owWZ0AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/0fc272ac67ae5bc2fdfac115a2cf4944ce89fa55-1606x906.png?rect=1,0,1604,906&w=804&h=454&q=75&fit=max&auto=format)

Variants for a complex component

Variants are essentially self-documenting. Anyone can look at a component, see the distinct variations and how they map to settings in the variants panel. And wow, do they keep the final component count slimmed down. When the Tailwind UI Figma kit was complete, we had 1,430 components, with an average of seven variants. Without variants, this would be more than 10,000 components. Since we wanted to focus the kit on the final components found on the website, variants helped us keep the component count down much closer to the 400 or so code components that customers will be using in their work.

### [Auditing components for pixel perfection](#auditing-components-for-pixel-perfection)

If you're recreating existing components or UIs, I highly recommend using screenshot overlays to speed up and improve the accuracy of your work.

When I mentioned pixel-perfect earlier, I wasn't saying that lightly. As I built each component in Tailwind UI's Figma kit, I made heavy use of the Dev Tools' "Screenshot Node" feature to create images that I overlaid with 50% opacity on top of my designs in Figma. This helped me double check my work at every level, and even revealed a few inconsistencies in our code components that we later fixed. More on that feedback loop later.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACvElEQVQoz2WS+UvUQRiH99+I6BCvzMwDb203E5PUUEjNozDIvCqLsijMiiKoSLRDKSx/MSwSurNybak8KhGsrEAzz111Xfe7uu5+1fV4Gr+kGQ08vMwMPPO+w0fV3a3n7btPnDpdTHLafhJTckhOXyCLpD8k78omLSOPQwWnqXn0gt5+AyazBbPAarVit9sVbDYbquHhMep1H8jYe5QNflG4bdTg4rUJZ89QXEV189YI1OJ8EyER8RSdL0b7tpnvHd2MjErIk5M4HA5mZmYUVJ/bzDyoaSB19xG8/GOEZAur3UNY4eTHSucAVrkGscY9GCePEDz9Iti9N5/S8kpe1jdgGBrBISRzc3PMz88rVVVWruPchSoSU/MJi9xJgHoHPkFxeHhH4uKpxmldKOtE1xv9owgMjyUjM5+LxWU8fFbHgGGY2dlZRbaIamtsLrEJOUTFprM5OklIEwnW7MA3KB53r0jWuofivD4cNy8NAWEx7MsroOR6BU9q69EPGZe6WxJ6eG8mPCKBbfHpRG9PU6QR0cloopIIVsfjE7gNT99I0aVa7OPIyjvGldKbPH6hVUZeLlOEialZ5B8pouRaBVfLKjl59jL7DxeSe+gk2QdPsCf7OCl7DpOScYDM3AIKz1yi5MZtnr7UMWg0/SNbWKonT+tobGqlT0RBbzDS0NzOvRodVdV13L2v5U61llv36qh6+Fr8m1aI3lCrfU9L2zdGpbH/R7aIf5DFxbws47BP0f/LQmujgdYmPV9aBmlrM/K1c5SeQbPoaIFRBaNJYsImK8LlSzXyowPLz1/Y+vqQhVzqMaH/rGe4fQCpcxBLvxmLZMM6ISuCRcatNhFku8je7FJklNi0Pn9Fu1ZH78cWzD+7sA3omejqZqKjE3uXeMhgYNwsIVnGMEt/MYlQW8SZLE8yPT3N1NSUwm+mPZFS3plyxAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/d7f57c1df81aa91a8c5172ffb7d7da69b1b7ce39-1606x906.png?rect=1,0,1604,906&w=804&h=454&q=75&fit=max&auto=format)

Overlaying Figma components with a browser screenshot

### [Designing a showroom](#designing-a-showroom)

Code components on the website are each displayed in a responsive preview that users can adjust to see how each component adapts across Tailwind CSS's defined breakpoints. This creates a sort of showroom—allowing users to see each component in context—which we wanted to recreate in the Figma kit.

To do this, I built every component at a mobile and desktop breakpoint, while making them as flexible as possible with auto layout and layout grids.

To further replicate the website's user experience, each page of the Figma kit matches a page on the website. Every page has a dedicated heading that links to the corresponding page on the website. A page contains only the final components, complete with example backgrounds to show the component in context with the intended viewport size. These example backgrounds are components themselves, and are kept tidy in a locked group layer at the very bottom of the layer list. This allows users to instantly select the components without the example backgrounds, so they can quickly copy/paste them for their own use.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABCUlEQVQoz42TjXKEIAyEff9XPe0p4R/CNvHU0yu2dWYHYTMfSYBhfEwYHzOmkUDGwzkPYwjj9IXHOOE5LyCyIGu30cF2pN6yEAYimZgMaypiYNRSkXNGTAlJxpwLiqztqrUv9WJMGJyNsMQCBFIEmNsWxGitdYTup14uRYHhBGwHsIiYeZ1z28TtZpOXp9WsGTrLIiCnE7DswA/dAvkNtKaTofZLguoJ9v5vVwlQvXRk+FfJh/g/JYdXyXQtua7Aa9/ueihH8tFD2oG4AO+y+fWULUmGVOGtLCRer0sRQ3fr3znuHpZ6KWUMz6fBMgfQkuBdRAiSsdcX4+Bl9D6cJPMQJOan1NfX8g25xmDCz9VatgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/0a5afaf063bd18796dc2a5df8ea71e4cc18b0f17-1606x906.png?rect=1,0,1604,906&w=804&h=454&q=75&fit=max&auto=format)

Example background components in a locked layer group

When the design files are a product in their own right, these little details of polish and consistency in how you present components go a long way.

### [Creating a parts inventory](#creating-a-parts-inventory)

With only the final components on each page, where do all the granular, building-block components go? To keep the main pages clean and focused, I created a dedicated “Parts” page that's home to every component outside of the "showroom" pages. The Parts page can grow to be a behemoth, but it's easy to maintain with auto layout layers and dedicated headings that back link to the respective pages in the kit. The majority of the time, users will reach for a final component and never need to look at the Parts page, but those who want to dig deeper have a complete inventory of well-organized components they can peruse and adapt to their own use cases.

## [How to structure a design system project](#how-to-structure-a-design-system-project)

Beyond the more granular decisions of layers, components, and pages, we learned how to best sequence a project of this scale, when to rethink our approach, and how to engage customers along the way.

Here are our main takeaways:

-   **Start with the foundations.** Build the most granular components—buttons, dropdowns, badges, and avatars—first. These can be immediately reused to create more complex components like styles and colors.
-   **Next, tackle the tough challenges.** From there, start on whatever seems the most difficult, tedious, or unknown, with the goal of reducing risk upfront. In our case, that was tricky tables, intricate description lists, and elaborate marketing sections. Doing so will reveal how to build even the most complicated components as early as possible, which makes the rest of the project more efficient (and less stressful). You’ll also be able to commit to naming conventions, layout approaches, and overall organization at the outset, knowing that they’ll apply to all situations.
-   **Polish as you go.** Finalizing each component and page along the way makes for calm, easy, and quick launch prep once the full design system is ready, with no flurry of QA needed. In fact, on February 16, after several months of work, I completed the final component in the Tailwind UI Figma kit at 10 AM, and we were able to officially [announce and launch the kit](https://twitter.com/tailwindcss/status/1361797146744393731), ready for download, just four hours later.
-   **Know when to rebuild.** If things aren’t up to standards, a naming convention isn’t scaling, or a major new Figma feature launches, don’t be afraid to start over. It’ll be faster to build on a second pass, and the design system will be more resilient and easier to maintain. With the Tailwind UI Figma kit, we decided to completely redo months of work when the new auto layout features and variants landed in November 2020. By starting fresh, our customers have the best possible kit to use in their work.
-   **Involve users along the way.** Look for opportunities to share your work. Provide preview files to users for feedback on things like component features, naming conventions, or page organization and share your work to drum up excitement. To help with the overwhelming demand, we provided a number of preview releases to existing customers to gain valuable feedback, and I did multiple [livestreams of showing my process](https://www.youtube.com/watch?v=1qIKkJdR7uM&list=PLKFUh46KjXES8fEhnlmtGZvRi_V-OInaz) for building the Figma kit so anyone could learn from our approach.
-   **Give back to the community.** While Tailwind UI is a paid product, we’re heavily involved in open source and wanted to create value for customers and non-customers alike. As a thank you to the community, we created Figma Community files to help the design community kick off a new project with Tailwind CSS styles, as well as a free preview set of Tailwind UI components to explore and use.

## [The feedback loop](#the-feedback-loop)

This project was rooted in designing components from existing code, which provided an interesting feedback loop. Originally, every Tailwind UI component began life in Figma with initial designs. Then, those were developed into code components, which were recreated as design components in Figma. We found some inconsistencies and bugs in the code components while building the kit, which we were able to immediately improve on the website (isn't it amazing how much you notice when you study every single component, line by line?). As the project came to a close, we had more confidence than ever in both our design files and our code components.

So, design informs development, which informs design, which informs development further—polishing everything with each loop. And, on that note, I better get back to Figma to add the latest batch of new components.

Now, you can check out a starter pack of the [Tailwind UI kit](https://www.figma.com/community/file/958381589801778722) on the Figma Community.