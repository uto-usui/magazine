---
title: "From furniture to screens"
source: "https://www.figma.com/blog/from-furniture-to-screens/"
publishedDate: "2016-01-21"
category: "design"
feedName: "Figma Blog"
---

Furniture gives function to what is otherwise empty space. The primary purpose is to support the act of living, whatever that means for each user. Furniture itself is not the focus; the life you create around it is what matters.

The challenge of Figma is to design a product whose ultimate value is how well other people are able to design their own products. This means that Figma should fade away, and enable users to focus solely on their ideas.

Here are a few ways furniture design principles have influenced the way I’ve gone about designing Figma over the past two years:

## [Tools](#tools)

It is possible to do a lot with a very basic toolset. A hammer can be used to build a small cabinet or an entire house. With Figma, we’ve tried to whittle down our primary drawing tools to the most foundational yet versatile set, tools that are well-equipped for tasks both simple and complex.

Our pen tool, for example, has been rethought to feel and function more similarly to a physical pen. Vector objects in Figma are drawn as networks of points, rather than traditional paths, meaning you can connect any point to any other point. This change allows for a more flexible and natural drawing process, shifting the focus from procedure to production.

The Figma editor should feel like a tightly knolled workbench. The basic tools you need to get started are simple and well organized. Having the right tools in the proper places is a prerequisite to building.

## [Control](#control)

Tactile familiarity goes a long way towards feeling in control when working with hand tools and digital tools alike. Keyboard shortcuts are a familiar opportunity to give users this physical control and increase efficiency. The product detail I’m most proud of is a key command that addresses an annoyance in selecting nested items on screen.

A common desire is to select the content of an element without selecting the element itself, like selecting the buttons within a toolbar without selecting the toolbar.

When you command+drag, Figma uses a heuristic to figure out which items are the container and which are contained, and it will select only the contained items. This allows you to box select all the icons in the toolbar without selecting the toolbar background itself. I have found this command to be incredibly useful and a significant time saver as it lets me work with the elements in the scene without having to think about layer hierarchy.

## [Color](#color)

The principle that furniture should facilitate living was informative to the original visual design of Figma. Just as furniture should fade away when in use, it was our intention early on to create a system to ensure that the visual style of our product wouldn’t distract users from the aesthetics of their own designs.

A previous version of Figma embraced an “unskinned” visual style, relying almost entirely on a monochromatic palette. It was effective for a time, but as we added functionality, it became increasingly difficult to clearly differentiate between UI components.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAB6ElEQVQY0x2Qz2vaABzF888Mdut1bIN0/8Ru3RiD0fay2SFzUDoKPYwVRnUO67B2GjtDpWlNorSgaP1FpokmuApZYk2nxZ+R6BQT1+a70AcP3uHz3uEhkiRlmkp91lNqcF3joFXlQWKKUDw7B56pgCTKbUGUd6M/q+FU5eIvWxFg94sHXjxdAvvqGzil4yCKIgiCMCuxbAFpNBrJzp/fo76YhZaQNttSDepCFcgfBBweEFDm+CtZUdxSq4v1RpNhv6/CSQg3bUsvYdPugArLmtPpFDRNG3d7vQzSbDatQVG7LMWBSxJmtcxBhRNg3x82vd4gMEzpymLcVgG7ub0dzmczyJKkubHyCrY23sNF7ZcJlnRjPtLG43NEUZTTS6nWy5xF5+GAX8fxiBE5InWvD9Oxg8i/UrEk1WV5Rx0M9g3D6ExG2k2KJvS1lWfGO8dro8yXdd0w5uPJdNDtD5IIz/NbZY7F4zRNBwMY+T0QooKhMIWFcDJ6QtLZVGqPyeWXrWvW1OEw3G5fx6LHOLW8+px667BRBaZAqapKtzudQ7le/4j4fL4Fv9//2OPxLDpdrkWn03lnl5U9bueTr5+3H+x82r4Xo2P38/n8w3Q6hfr2vqE2uw1d/7COEscEmsvl0EQi8YggiIX/t29oiqZ/VIcAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/c4e56694d3d7a414d52dc3f8e137250a6f343c7a-1800x570.png?rect=2,0,1797,570&w=804&h=255&q=75&fit=max&auto=format)

Figma UI, before and after.

At this point, we reconsidered our strategy. It wasn’t that the UI had to totally “disappear,” but instead should go unnoticed. To do this, our current visual style uses color as an additional layer of semantics. For instance, green is used for actions and blue for selection. These groupings across the layout of the tool help inform users at a glance, shifting cognition from how to what they’re drawing.

## [Design Across Disciplines](#design-across-disciplines)

To create innovative solutions for design tools, we must continually challenge our collective frame of reference. In his post Grid Systems for Screen Design, my teammate Johan Prag pointed out that “some of the most interesting solutions may come from looking to the past.” I agree and move to cast this net even wider. The best principles of design transcend disciplines. Let’s look not only to the past but also outside of our immediate field to move design tools forward.