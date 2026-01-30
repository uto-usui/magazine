---
title: "How Carvana fuels consistency and scale"
source: "https://www.figma.com/blog/how-carvana-fuels-consistency-and-scale/"
publishedDate: "2024-04-16"
category: "design"
feedName: "Figma Blog"
---

As the fastest-growing online used car retailer, Carvana has proven that speed doesn’t have to come at the expense of best-in-class customer service. Since its founding in 2012, it’s helped over one million customers buy, sell, and finance cars online. Carvana’s 40-person design systems team is critical to unlocking scale and making design excellence a standard across the 10,000 person company. A well-timed move to Figma has allowed the team to maintain a design system that meets rigorous design standards, keeps up with a growing brand, and supports better handoffs between designers and developers.

![An image compiles examples from Carvana’s design system, which includes buttons, tooltips, input fields, badges, colors, progress trackers, and more. ](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAAB8UlEQVQokZWSy2sUQRCH8/9fxaPgRTx58BQFFR8ERVFMNNEgMY9JsrszOz2Pfj9mP+neJBtFEAdqeqa76qtfV9XWarXitk1//P+vbeWXc5ZuVAhpGa3HxURME2laMRWbSGkq39dJ0zQVnxATPiRCnNbA7LwQHXs/Z+ydLqmEQtqA9deOiRAizoeyphtI3otoGxDS0elQBBTgeTPweu+Mnf2KqhkYtEbKESUVxrgSaHMSGwpYG4exHusCyjja0dIpvwZmmbUYef/1mI/fTpiLnuWwpG0qRD1H9BLjMixemUcqfQMdlUFphfduU8NBaqrZklnTFXXN2DBvK5ZijpASaTxSe5QJRbHRGu/WyrWxWGtI0W+AWfqoLLpcw9INSxbtJWKokWZEGsegPIP2yCvAlGIBpJRK037rcojxVl0cou+5rGtq0SK1RuVrGl8akGs2Ko0ytsQobTHOE1PaAGNMWOdLwV2IdNJwtui4aHoG7dAuYFws3e0Gxe73Y168+8LTnc9sv/nEqw/7nF42ZZQKcD0KsWTJ8KwiN6rpZClDTpJh2a9ue56/3eXeo2fcffiEOw+2uf/4JbuHJyW2AMuwTlMZ2Lzmg6w2z1qG5MzXdco3uVi0HB5fcHB0zv5RxY/TGW0vy+DfAP9qwGqVbbP3r+cXWuOehVK0CG4AAAAASUVORK5CYII=)![An image compiles examples from Carvana’s design system, which includes buttons, tooltips, input fields, badges, colors, progress trackers, and more. ](https://cdn.sanity.io/images/599r6htc/regionalized/2dc111c11ac262a7b104dc9d6ae99818d96c2d8b-4352x2672.png?w=1080&h=663&q=75&fit=max&auto=format)

Some components from Carvana’s design system

## [Achieving speed and scale with a single source of truth](#achieving-speed-and-scale-with-a-single-source-of)

In 2019, Carvana’s growth hit an inflection point, illuminating the need for a design platform that could lay the foundation for scaling up. Their existing design system was scattered across a PDF-based UI kit, Principle, and Sketch, and they needed a centralized and connected source of truth that engineering and design teams could reference. As Hudson Paine, Senior Product Designer at Carvana, recalls, “Everything was copy and paste. A 5% change that occurs 15 times ends up being astronomically different from the first component you started with. There was no source of truth, no libraries: everything was everywhere.”

That’s when the team moved the design system to Figma, a decision that was pivotal and perfectly timed. The Covid-19 pandemic prompted sky-rocketing car sales, and the switch allowed Carvana to meet demand by establishing a unified source of truth and “reducing any friction that would have been there, had the team been on \[previous design tools\],” says Hudson.

## [Driving consistency and collaboration with variables](#driving-consistency-and-collaboration-with)

Figma’s own Luis Ouriach, Designer Advocate, and Jacob Miller, Product Manager, [gave a talk at Config 2023](https://www.youtube.com/watch?v=M0NU5QFLCl4) on leveling up design systems with variables.

Carvana’s growth was a double-edged sword. While it brought thousands of new customers, the challenge was maintaining a high bar of design quality across a growing product ecosystem. Inconsistencies in [color](https://www.figma.com/colors/) palettes, spacing, type styles, and corner radii crept into the designs.

When [variables were first introduced at Config](https://www.figma.com/blog/config-2023-recap/#with-variables-design-systems-speak-the-same) with the ability to apply reusable values to all kinds of design properties, Carvana saw an opportunity to address those problems. Hudson says, “These inconsistencies have been revolutionized by our use of variables, especially number variables, which allow us to build consistent spacing and corner radii into our designs.”

![A screenshot shows how Carvana’s color variables are set up within Figma](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACxUlEQVQokXXSy08TURQGcP4mO7XTarsAl26A0pYKbApkjAsfMSGpwYXEca17Hy0Q+pDiAlBYCCu3DIkGlenQUqb0Oe97Z2bRc8yMxGDExZe7ud8vueeeIWq7twh1HhPq8Baxn3unYRL+53GV39r+yK+srPK5/DL/Lpf3U9n4wH/9dsTrhslf6rwg1Fmgtnt7iNruI0KdfcMkJ6qqV1VNr3Y6Xenz3p6UzWaldPqOlEwmpVQq5ef+g4fS5ta21Gq1JVXTJVXVql6XUOcLtd2nHrhEqCPphom9Xh97vR7KZ2e4sV7BmelpjEQiyLJhvBmNYjQaw8nJNJZKZWw2m6goCvb6ffS6hDoytd1XHviMUEc0LYKapg00VYOzmgxruQJMjE0AwzBwLcBAiA0DG45AMpWC9fV16Ha7oOs6KIoyMH6DDWq7L4cIdZao7YiE2GiaJpimBbW6DK/frMLoaByCwSAEmCBcZyMQugS2221QVdWDB6qmo0Xsq0HDMKDWOMG3K29wbHwUGSaIDMNgKMQiy7KYSCRwbW0N6/U6tlotaJ6fQ19RrwCpjaZl+WCjUcNCIY+JRByDQQ8MIBsKYZhlcSIex+XlZaxWq94cQZab/wetP2ADisUCJJNJ/8neHFmWhXA4DPF4HPL5PIhiFWRZ9sDBvyB1RItQvBgy1E9PoVAowEQiAYFAwE8oxPro2Pg45HI5EEURms0rwIu1EU2TYF9RwFubRuMMK5UKzszM+KsSi8VweHgEh0dGcGpqyp9hrVbHdrvjBf76FGq79wh1Nk2LHmq6caBphtDp9oS9vX1hcXFRyGQyQiYzK8zNzQuzc/NCNvtE2NnZFVrtjqDphqBq+oFhkkNCnV1quwseGCTUSRPq3CXU4bwYJuGORYn7tLPLlcrvuVKpzBWLZa5QLHGbW9vc0fcfnG5Y/t2LeN1pars3fgFsi9tw5U7kZwAAAABJRU5ErkJggg==)![A screenshot shows how Carvana’s color variables are set up within Figma](https://cdn.sanity.io/images/599r6htc/regionalized/3a130cf28c91acd3e72e5d6745b15b37615752ce-8192x4832.png?w=1080&h=637&q=75&fit=max&auto=format)

Carvana’s setup of variables within Figma

For the design team, the ability to define the values of their variables brings a new level of pixel-perfect accuracy and efficiency to the process. And while there was an initial learning curve with setting up variables, Hudson says the gains far outweigh the cost: “We end up with much more polished designs at the end of the day, which means we’re sending fewer things back. In the long term, variables will increase our efficiency because our designers have fewer and fewer revisions to make.”

## [Merging lanes with new business](#merging-lanes-with-new-business)

As Carvana expands into new areas of the industry, variables also enable the design team to [quickly introduce new themes](https://help.figma.com/hc/en-us/articles/5576781786647-Change-themes-in-Figma). After Carvana acquired ADESA, the national car auction business, the process of redesigning it to fit within the larger ecosystem and design language was as easy as “flipping a switch,” says Hudson. Runming Dai, a product designer on Carvana’s design systems team, used variables to set up an additional theme for ADESA, and Joyce Park, a Carvana product designer, instantaneously converted designs to the new branding.

> In the long term, variables will increase our efficiency because our designers have fewer and fewer revisions to make.

Hudson Paine, Senior Product Designer, Carvana

Without variables, the process would have required rebuilding Carvana’s component library with new styling—easily at least a full month’s worth of work. Theming, as supported by variables, provides a single source of truth for component structure and functionality, allowing the design team to update the ADESA library in less than a week and build design comprehensives for ADESA three times faster than usual.

## [Building connections between design and development](#building-connections-between-design-and)

With Figma, the collaboration between design and engineering teams at Carvana is better than ever. As Hudson says, “Figma enables us to be more connected, to get designs even closer to what they’d look like on the development side, to move closer to one-to-one, which is always the goal.” Since the team uses variables to define their tokens, those are also shared with developers. By reusing components and pulling style tokens directly from the design system, developers are building design comps dramatically faster, and with more consistency.

> Figma enables us to be more connected, to get designs even closer to what they’d look like on the development side, to move closer to one-to-one, which is always the goal.

Hudson Paine, Senior Product Designer, Carvana

The design systems team’s main priority is empowering designers and developers with the information they need. With Figma, they’re on the road to success. Hudson sums it up: “We can attribute many of our design system’s efficiency and performance advantages to Figma itself. Without it, it wouldn’t be possible to build and distribute a design system as robust as ours.”