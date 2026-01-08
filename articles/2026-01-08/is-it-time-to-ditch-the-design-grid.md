---
title: "Is it Time to Ditch the Design Grid?"
source: "https://css-irl.info/is-it-time-to-ditch-the-design-grid/"
publishedDate: "2021-07-27"
category: "css"
feedName: "CSS IRL"
---

I came across this website, [Gridless Design](https://gridless.design/) recently, and it immediately struck a chord. It’s something I’ve been thinking about for a long time — the way that the usual design process, where designers hand off static mockups based, so often, on a 12-column grid, is not fit for purpose. I know I’m far from the first person to think that way, but increasingly with the advancements in CSS layout in recent years, the design grid feels more like a hangover from print than ever. A solution to a problem that, on the web, we simply don’t have.

CSS layout features like flexbox and Grid enable us to build more flexible layouts that prioritise content. We talk about intrinsic and extrinsic sizing in CSS — sizing based on both content and context. The promised container queries specification will put even more power in the hands of developers. But it feels to me like the design process is still stuck in the past.

Designers will often prescribe that an element should span (for example) four out of 12 columns on a desktop screen, without the knowledge that their idea of “columns” on the web bears no relation to how the layout may actually be built. This isn’t a slight against any individual designer, but it feels like the industry as a whole has some catching up to do. There is a collective failure to think of components in terms of behaviour — how layouts will respond to different types of content, and atypical viewport sizes — as opposed to fixed breakpoints.

This means developers play a significant role in filling in the gaps. Even if you’re a developer who doesn’t think of yourself as a designer, you _are_ a designer. It’s up to us to decide how a layout behaves at the “in between” sizes, the edge cases, or where the content differs from what’s provided in the design. This requires imagination and design thinking on the part of the developer.

Consider the following component, consisting of a heading, an image and paragraph of text. If we’re under strict instruction to follow a design grid, then as soon as we start to resize the screen the layout starts to look less pleasing.

Resizing the two layouts produces different result, depending on whether we force them to align to a grid

But given the freedom to build a more flexible layout, we can prioritise the content — using the intrinsic sizes of elements to dictate the distribution of space. In this video, the first component forces each element to stick to a prescribed grid. Almost immediately the layout starts to look broken as we resize the viewport, as each grid child gets proportionally narrower. The second component retains the width of the elements, but closes the gap between them as the screen narrows, resulting in an arguably more pleasing (not to mention legible) layout, despite not adhering to a strict grid.

See the Pen [Comparing rigid and flexible grids](https://codepen.io/michellebarker/pen/KKmZmVx) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

Similarly, this quote from the Gridless Design site sums up nicely how a card layout can respond to the context, rather than fixed columns dictated by a design.

> The CSS grid syntax allows children to reflow into new columns as needed. Columns can be informed about their size by the content in their children or a fractional amount of available space. This technique is very powerful for card layouts, allowing cards to be as big as a specified column allows and wrapping to the next row when it might become too small.

Many developers are embracing innovation in our CSS toolset. Andy Bell and Heydon Pickering created [Every Layout](https://every-layout.dev/), which helps developers learn to embrace the inherent flexibility and unknowability of the web, to build resilient layouts that work for variable content. It would be great to see more innovation in design tools to encourage designers to think in a similar way. Good communication during the design and development process can help too, although not everyone has that luxury.

But developers aren’t entirely without blame. Part of the problem too, is CSS frameworks. Tailwind, Bootstrap and plenty of others come with classes that make it trivial to build a layout that adheres to a simple grid. But if we want to build a flexible, robust, content-aware layout, you need to look beyond the frameworks and write some custom CSS. Paradoxically, where CSS Grid shines is not only in building layouts that adhere to a strict design grid, but in baking flexibility into our components. But the temptation to choose the quick and easy solution, rather than the _best_ one, is hard to resist.

It feels like we need a big industry shake-up here. We shouldn’t be forcing content into a rigid design grid to the detriment of user experience. Users won’t notice if your design doesn’t align perfectly to a 12-column grid. They _will_ notice if they can’t use the site you’ve built. In those cases, the grid is serving no one but the designer’s ego. That’s why I’m happy to see the Gridless Design site advocating ditching the grid altogether. It might sound like a radical proposition for some, but the article does a great job of explaining how other devices, such as gestalt principles of space, proximity and continuity can make for a good design without a grid.

The site provides a far better explanation than I have here, so [check it out](https://gridless.design/).