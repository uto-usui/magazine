---
title: "Components in Figma"
source: "https://www.figma.com/blog/components-in-figma/"
publishedDate: "2016-12-08"
category: "design"
feedName: "Figma Blog"
---

Today we are excited to release Components in Figma. By bringing concepts like composition, inheritance and unlimited overrides from engineering to design, Components move us closer to a world where we are able to easily reason about design systems as we go about our day to day work.

We kicked off the project of building Components almost a year ago. As someone who comes from a background in both design and engineering, I’ve noticed the way we design is very different than the way we build software. People expect complex user interfaces that are alive, connected and always improving. How can we keep up as designers? Engineers have already figured this out.

Components are a popular concept in engineering used in everything from [iOS](https://developer.apple.com/reference/uikit/uiview), [Android](https://developer.android.com/reference/android/view/View.html), [macOS](https://developer.apple.com/reference/appkit/nsview), [Windows](https://msdn.microsoft.com/en-us/library/bb613551.aspx), [Unity](https://unity3d.com/learn/tutorials/topics/user-interface-ui), [HTML](https://html.spec.whatwg.org/multipage/dom.html#elements) and other technologies used for actually building user interfaces and games. [React](https://facebook.github.io/react/) for instance is a way of building large UI systems without the headache of needing to understand everything at once, through composition of smaller parts into more complex behavior.

What if we applied this concept to design tools?

## [Designing with Components](#designing-with-components)

Composition is a foundational part of design. It allows us to reason about a smaller part of a greater system and enables us to reuse existing parts saving us time on otherwise repetitive and tedious work. Adding the concept of components to a design tool makes the composition of complex designs more consistent and more efficient.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAABT0lEQVQY0wFEAbv+AGeIdCh8mYgmhZGhKISCrimDfrIpgoGvKYWDoSmNc34hhGlkHISchSGewaMnnbW9J4OW3S14k+A0hJnNKrugmBf1pmES86ViEtyIZBPCaWYbAHaWfySkrZgorKWiKaiSoyaojqUkp5CjJaiRmSSqgH4ck2xmF42agR2qvZ0kqrqwHXWd1RdfmNwabJvTE5+drgf2pmEE8qRjBM94ZgjBaGcSAG6KeRmZoY4cpZuKGKSGeROmgXQSpYN1E6SBcBKcbmQRiGVdEJaXeRS0uZAYtr6YD2qvrwUxrL4FOqnHAwBz/wAAAAAAAAAAAL1faQHEaGgFAE5cWAdYZV0HVFlQBkxHOwVNRTgFTEU4BVBHPQVQQ0EFaV5TBsSujhDbv50Z2cCaDb6+bwEAAAAA2ewBAP+tRQD1pWIA9KViAO2YZQDheHAABgKG6Wo8JQYAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/7d3bc6adb6a9372ec674f8a17376de69633d6c7d-800x163.png?rect=1,0,799,163&w=804&h=164&q=75&fit=max&auto=format)

For instance, an address–book app might have a table which lists one contact per row. Designing a good list view requires finding the right type size, spacing, icons and other graphics. The same component can be used in many places at once, each at a different size with local modifications and differences:

Not only does this make it easier to reuse existing parts quickly but components also help with consistency. And since reused components are not copies, but _instances_ of the same component, any changes applied later are immediately reflected across your design.

## [Our Approach to Components](#our-approach-to-components)

At Figma, we believe that design tools should not get in the way of your creative work. Many tools have tried to tackle the problem of reusable design, but we believe our implementation is different.

When designing Components, our goal was to make them:

-   _easy to learn_ for anyone to get started
-   _powerful_ enough for advanced users
-   _flexible_ enough to work throughout the design process

Designing systematically shouldn’t slow you down — it shouldn’t require more overhead. It should allow you to build things faster and more consistently, without blocking your ability to be creative and solve new problems.

## [How it works](#how-it-works)

In Figma, Components works just like [Frames](https://help.figma.com/hc/en-us/articles/360039832054-Frames-and-Groups), with the twist that duplicates of a component creates new instances rather than copies. We start out by selecting something that we want to make into a component and click the “Create Component” action in the toolbar:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAIAAACHqfpvAAAACXBIWXMAAAsSAAALEgHS3X78AAABOUlEQVQY012PQU7CQBSGeyFxYTyBJG5MPACBVCFaFl2g8Q7EHVxBE1hhNKDpTKmgLhAkUUmoYGJsUpiZ92Z6BqetaMKXzGL++f/3vzEOUw7Mol0p1S6O6pfWyVk+l9vJZjc2M5ntrd39PbNUPLYs0zQLhXy+8I/hui51KSHEue/R0Xt3PPEeHq9arfNqtVIun9p2rV5rdzqe51FKSefWaV2TmzZxCKHEAAABYsF4sGQLDoCIUoZhOBkOB43Gc7M5HY+XjGlZ+8D/BO8JR6+wWAKCoZSSSnIBIRccUF+jKNIHg0D0+6LXx+A7lrQolZrOo7tuNHhRjGunIRN0oUha1QpkXHzMhD9DxlJFSoVBiG8+zr8kgK40kjXXwQRIkKhtqShRz+f64TcS/3ktn8ZWW/wlU1HXxyukzh9amE2NP0SGNQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/9f0d2500b96b01cafd9dd55c0039be8a88e52342-800x266.png?w=804&h=267&q=75&fit=max&auto=format)

At this point it’s just a Frame with a fancy purple outline. Well, until we create some _instances_.

We can hold the alt-key and drag, use the “Duplicate” action, or simply copy-and paste a Component to create instances:

With two instances, we now have three of the same thing. Each has an independent position on the canvas, but are otherwise identical.

Any change we make to our Component is immediately reflected in its instances:

There’s one important aspect that makes instances special: they are reflections of the component they represent and allow overrides to various properties, but restrict a few properties like position and size of objects inside, all to make it as easy as possible to manage and maintain Components.

Since any change to a Component is reflected in an instance, what happens if we change something inside an instance? Does that change simply disappear when the Component is modified? No, that’d be crazy.

## [Style and Property Overrides](#style-and-property-overrides)

Changes made to instances can be thought of as _overrides_ of the original Component’s style and properties. Let’s see what happens if we override the color and stroke in our instances, and then change the original Component:

What happens here is that we said “for this particular instance, let the fill color be dark grey, and for this one let the color and width of the stroke be red and 6px, no matter what the values are for the original component.” When we later make changes to the Component, our overrides remain, but other properties which we didn’t override are reflected verbatim.

Any property of any part of an instance can be overridden, including any sublayers and their properties. This makes the possibilities virtually endless.

When we change our minds and want to clear the overrides from our instances, we can simply select the things we want to reset and choose “Reset Instance.”

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAIAAADXZGvcAAAACXBIWXMAAAsSAAALEgHS3X78AAAAR0lEQVQI12NIRgUpKSlxcXGubq6GxobuXp5JSUnp6empqalA8WQMwHAYFRw5cmT79u2NTY2xcbHtne279+w5duzYETA4jAEA5UNA48D9g/0AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/c6ae0d21019cb214134a5c4f2295af536c537ad4-800x85.png?w=804&h=85&q=75&fit=max&auto=format)

## [Complex components](#complex-components)

Earlier in this article we spoke about creating systems out of easily-comprehensible components and that components can contain other instances to form more complex behavior. Such “nested components” are as easy to create and work with any other object in Figma. Simply add an instance into a component, or create a new component from one or more selected instances:

## [Constraints](#constraints)

Figma is powerful in the way we can combine several features together. [Constraints](https://help.figma.com/hc/en-us/articles/360039957734) is one of these features that when added to a design, allows a whole new dimension of creative expression, especially in how things react to various sizes and positions:

_Read more about Constraints in [Grid Systems for Screen Design](https://www.figma.com/blog/grid-systems-for-screen-design/)_

This release of Components is just the beginning for us, but it is the foundation for a series of steps we are taking to bring design closer to engineering. As design becomes more complex and more people become involved in the design process, it will be even more essential that our tools become smarter and help us do work that can be automated so we can focus on solving design problems. Try it out and let us know what you think!