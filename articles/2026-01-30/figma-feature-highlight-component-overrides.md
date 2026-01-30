---
title: "Figma Feature Highlight: Component Overrides"
source: "https://www.figma.com/blog/figma-feature-highlight-component-overrides/"
publishedDate: "2018-09-20"
category: "design"
feedName: "Figma Blog"
---

_In the Figma Feature Highlights series (see [1](https://blog.figma.com/figma-fun-fact-click-an-avatar-in-a-file-to-watch-someone-move-around-the-design-2d00fc5e412e) and [2](https://blog.figma.com/figma-feature-highlight-sketch-import-dbb71c1935dd)), we’ve been showcasing Figma’s super powers with ideas on how to use them. This week we cover “component overrides.” If the concept of “Components” in Figma is new to you, we recommend first reading [our Support article on Components](https://help.figma.com/hc/en-us/drawing/components) here or our [original Components announcement blog.](https://blog.figma.com/components-in-figma-e7e80fcf6fd2)_

Design systems must strike the right balance between flexibility and consistency. You might use the same foundational components everywhere, like lists, avatars or status bars, but you’ll still need to tweak and adapt instances of them depending on context. Maybe individual list items will have different lines of text, or the background [color](https://www.figma.com/colors/) on a status bar will change if a user hovers over it.

Instead of forcing you to build these particular instances from scratch, design tools should make it easy for you to tweak the original component, while still maintaining your design system.

That’s where Figma’s component overrides function comes in handy. Overrides work exactly how they sound — by allowing you to “override” properties of a design instance without breaking it apart from its parent component. You can change things like the background color, font, stroke, or other properties in an instance, and the instance will still stay connected to the original parent component. As a result, when you adjust the parent component, the instance will continue to inherit those changes — while maintaining its distinct differentiators.

## [Overrides in action](#overrides-in-action)

In Figma, you can override a nearly endless number of properties in an instance, including:

-   Color
-   Type alignment
-   Add, remove, modify strokes
-   Styles
-   Opacity
-   Blend mode
-   Fills
-   Effects (drop shadows, blurs)
-   Text
-   Visibility (show/hide)

If you’re looking for inspiration, here are a few concrete examples of ways you might use overrides to maintain consistency in your design system.

1) **Create a realistic list of information** — Working on a simple to-do app or a complex table view for a dashboard? Create a single “cell” component and override the text in each separate instance to add unique data.

2) **Show a button in different states** — Need to show different states of a button after user behavior (hovering, pressing, ignoring, etc)? Use a single button component and override its background color (or text opacity…or drop shadow…or whatever you’d like!).

3) **Build an address book with photographs** — Want to create an address book with different people’s profiles? Override the fill from a circle component with placed images — like photographs — to customize each avatar.

4) **Make a kaleidoscope** — Looking for a little bonus fun? One of our designers, Rasmus Andersson, created the kaleidoscope gif below to dazzle you with the power of overrides.

**Here’s how to create your own kaleidoscope at home:**

1.  Make a frame, draw an illustration in it and convert it to a component.
2.  Duplicate it to create an instance and place it adjacent to the right. Flip horizontal (shift-H).
3.  Duplicate again and place the new instance below the previous. Flip vertical (shift-V).
4.  Duplicate one more time and place the new instance in the “hole” that’s left to form a large 2x2 rectangle. Flip horizontal (shift-H).
5.  Draw in the original component (top left corner) and watch the kaleidoscope unravel.

## [FAQs about component overrides](#faqs-about-component-overrides)

We get a lot of questions about component overrides and wanted to capture the most frequent ones and their answers. Here’s the 101 rundown on everything you might want to know about them ([and you can find more information in our help documentation here.)](https://help.figma.com/hc/en-us/drawing/components)

**Q: Can you duplicate a master component in a file?**

A: No, it isn’t possible to duplicate a component in a single file. When you do that it will always create an instance of the original component. However, when you copy a component from file A and paste it into file B, you will have a fully functioning component in file B.

**Q: Can you reset overrides in an instance?**

A: Yes! If you decide you want to reset a component back to its original state then you can, but one of the unique things about Figma is that you can also reset any property for each element within your instance.

**Q: If you edit your master component, will it automatically update the overridden instance?**

A: Yes and no. As you further change the master component, you’ll see that the instance still updates accordingly, except for whatever property you manually changed. For example, if you have a blue circle as a component and change the instance’s color to green, then the instance will stay green even if you edit the master component to be red. However, if you change the stroke weight of the master component, then the instance will reflect those changes synchronously.

**Q: Do overrides work across files?**

A: No, they do not.

**Q: Are there any properties you can’t override?**

A: Yes, any properties that impact the layout of child layers. That includes:

-   Size
-   Position
-   Point and bezier positions
-   Constraint settings

## [Which little known feature should we highlight next?](#which-little-known-feature-should-we-highlight)

Let us know what you think what should get the next Figma Feature Highlight treatment in the comments! You know us, we’re always gunning for user feedback. And be sure to brush up on our previous Figma Feature Highlights: [Observation Mode](https://blog.figma.com/figma-fun-fact-click-an-avatar-in-a-file-to-watch-someone-move-around-the-design-2d00fc5e412e) and [Sketch Import](https://blog.figma.com/figma-feature-highlight-sketch-import-dbb71c1935dd).