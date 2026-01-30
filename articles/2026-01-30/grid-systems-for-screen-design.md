---
title: "Grid Systems for Screen Design"
source: "https://www.figma.com/blog/grid-systems-for-screen-design/"
publishedDate: "2015-12-15"
category: "design"
feedName: "Figma Blog"
---

In the 1950s, a small group of Swiss designers started searching for a better way of systematizing how information was organized on the printed page. Their work came to be known as grid design and a handful of pioneers like Joseph Müller-Brockmann and Karl Gerstner produced work that was as beautiful as it was rational.

Today their ideas are still foundational. Grids are the invisible scaffolding that give a design coherence. Their work took for granted a few things, though: a fixed page size with precise control over type-size, line-height and margins. Because of this, it can often feel incompatible within our current age of designing for a fluidity of device sizes and screen densities. We at Figma believe this is less a problem of philosophical incompatibility, and more an issue of contemporary digital designers lacking the proper tools. We think grids are as foundational for our flexible canvases as they are for a fixed page.

## [Tools](#tools)

As we started designing for screens, much traditional knowledge was thrown out due to the technical limitations of the new medium. Nowadays, we have better support for typography and better control over layouts, but the tools we are using have not yet adapted to designing for screens. Even for web design where browser sizes are fluid, designers are still working with tools created for fixed layouts. A designer or an engineer then has to figure out how to translate a design based on the conventions of the past into the present reality of knowing very little about how the design will be displayed. Making sure that the design translates would either involve a lot of repetitive copy/pasting between artboards of different sizes or some sophisticated guesswork.

When the first iPad was introduced, many designers welcomed the return of the page and of edges — comforting boundaries that help anchor a design. With new devices introduced every year, it is now obvious that the ‘page’ in digital design can take any size and shape. Less obvious is how a tool can allow you to design in a way that is flexible yet also allows for a fine degree of control.

## [Building blocks](#building-blocks)

When I started working at Figma, I thought this was a challenge our team could tackle. Our approach is to create a set of tools built for flexible screen sizes that allow you to create very powerful layout systems when properly combined. The toolset consists of a) constraints b) layout grids and c) the ability to nest a frame inside of another frame. (We call them frames, other people call them artboards.) You can get started using just one of these tools, but the real power comes from combining them.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAIAAABM9SnKAAAACXBIWXMAAAsSAAALEgHS3X78AAAA7klEQVQY012Q2QqDUAxE/f/fEndRXIrighe0goqorXVDTefa9qUhD5OQkwwRoijKsowxVhTFOI7neRJiWahp6H7nCYGSaNu2siwxj+H4CkHTNNd1Pc8LgqBt2+M4CPzzSXFMjsMTAuV5zvMMUpZl0zQVRVFVVRBF0bIs27bBN02z7zuHh4FuN9I00nUuhgGOlmVJkkTXdd/3wRuGIUiSBNJxHLT+YZA/+HMZVnEQZ7AClgWQMByGIbZ2Xfe1/XoRYxQEPCHGEc1pmgB/bGMFh+u6bq/o+35d1+/DcB/848ETAuX1sKqq0jTN85xd8QZroENM4tuC5gAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/75c41d380c886288c21260c997767cc875f4fb6d-1440x405.png?w=804&h=226&q=75&fit=max&auto=format)

Constraints, grids & frames in Figma

## [Constraints](#constraints)

We started with constraints. Constraints allow you to specify how an object should respond as its frame changes size. You can tell an object to stay to the left, the right, or to stretch to fill up space.

## [The grid](#the-grid)

Constraints give you a very basic framework for creating designs where elements stick to the edges of a frame or are centered in it, but we know most designs are a bit more complex than that. This is where grids come in. In Figma, grids are the device that allows granular control over how constraints work.

Take a look at this design. We use a grid system to keep everything in balance, but how would you want the design to change as the screen resizes? What if you want X to grow with the change in screen dimensions? Our solution has been to allow grids to stretch, and our constraint system knows how to work hand-in-hand with the grid. If you stretch a box over two grid columns, the box will grow and shrink to align itself to the grid as the screen size changes.

Beyond the obvious use of a column grid to dictate the flow of text on a web-page, column grids are useful for helping align all kinds of elements. For example, consider a row of icons in a toolbar with each icon aligned to a column of the grid. At that point, the grid and constraints alone do not allow the icons to respond to the grid whilst also allowing for a different layout of the main content. However, it does when you nest one frame inside of another.

## [Frames within frames](#frames-within-frames)

Nesting frames is the last piece of the puzzle that gives you full control over the alignment of your design as a whole. This ability is also one of the reasons why we chose not to call them artboards, frames go beyond artboards in the functionality they offer. Using multiple frames for the same design also allows you to set up different layout grids for different parts of your design.

If you’re familiar with HTML, you might notice this structure is similar to how you would translate a design into code. The idea of a nested frame has a lot in common with a nested `<div>`.

## [A modern design tool](#a-modern-design-tool)

Moving beyond static layouts is just a start. Where else is there room for improvement? This is an opportune time to question how our design tools work, think critically about how well they really meet our needs, and to try new solutions. Some of the most interesting solutions may come from looking to the past for ideas.

## [Acknowledgements](#acknowledgements)

The thoughts presented here are the result of countless conversations at Figma about design tools, grids, and the history of design. Evan Wallace deserves special mention for originating key concepts.