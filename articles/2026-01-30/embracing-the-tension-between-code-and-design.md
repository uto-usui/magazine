---
title: " Embracing the tension between code and design"
source: "https://www.figma.com/blog/config-europe-2020-new-feature-announcements/"
publishedDate: "2020-09-17"
category: "design"
feedName: "Figma Blog"
---

There’s a natural tension between design and code. In the world of design, the focus is deciding what to build—in the world of code, the focus is building it.

Traditionally, designers and developers have occupied different worlds, requiring separate tools. In practice, they’re partners working to bring a product to life. While their approaches may differ, each offer unique advantages. Designers optimize for freeform, creative exploration, while developers take a more structured approach. The result is an inevitable tension between the two: what feels like “breaking” a component to a developer is just creative exploration to a designer; what reads as “structure” to a developer might be inhibiting to a designer.

We believe in embracing concepts from engineering and design, adopting the rigor and reusability of code while preserving the rapid iteration and uninhibited exploration that makes visual design so powerful.

At [Config Europe](https://config.figma.com/) this morning, we announced several new features that will carry the best of both worlds to design systems in Figma—bringing them closer to code and making them intuitive to use, while more efficiently translating designs into production.

## [Supporting design systems that mirror your code base](#supporting-design-systems-that-mirror-your-code)

Teams typically maintain a set of components for design, and one for development. While this is a normal and good approach, straddling both worlds isn’t always easy. When code and design components mirror each other, teams can move much more efficiently. Today, we announced Variants, Interactive Components, and improvements to Auto Layout that will allow teams to do just that.

### [Bridging code and design components with Variants (coming in November)](#bridging-code-and-design-components-with-variants)

A single component in front-end code typically renders in a number of visual styles, for different contexts and states of user interaction. For example, a button might have primary and secondary styles, small and large sizes, and different versions for iOS and Android. Currently, a button component like this would be represented by different components, each for a different visual style. This mismatch between design and code can result in miscommunication, ultimately slowing down the development process.

To solve this problem, we’re launching [Variants](https://help.figma.com/hc/en-us/articles/360055471353-Prepare-for-Variants), a way to logically group together variations of the same component into a single, more powerful component. In addition to simplifying the asset panel, this update will allow components to map more closely to code.

### [Drag and drop Interactive Components into prototypes (launching in January)](#drag-and-drop-interactive-components-into)

Now that you’re able to group a component’s interactive states together with Variants, you may be wondering whether or not these interactive states work with your prototypes.

While Variants let us group a component’s states together, prototyping the transitions between these states in Figma today still requires a lot of work. Just to create the illusion of an interactive object, designers would have to connect multiple frames with overlays.

Interactive Components make prototyping much more efficient by letting designers add prototyping interactions between Variants, so instances are immediately “alive” in prototyping mode.

### [Design like you code with Auto Layout (coming in November)](#design-like-you-code-with-auto-layout-coming-in)

The introduction of Auto Layout in 2019 brought layout rules to Figma. By allowing designers to make updates to button text without manually adjusting frame size, Auto Layout empowers them to more easily create responsive interfaces. But we knew we had more work ahead of us to bring Auto Layout even closer to how the CSS [box model](https://www.w3schools.com/css/css_boxmodel.asp) and [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) work on the Web.

In our next evolution, we’re bringing a simplified UI to Auto Layout so it’s even easier to use, plus new features based on some of our most frequent requests: the ability to stretch elements along both axes, configure independent padding values, and optimize spacing for common UI patterns like navigation icons.

## [Making design systems more accessible at scale](#making-design-systems-more-accessible-at-scale)

In addition to making design systems more powerful, we’ve added features that help both designers and developers navigate large, complex libraries.

When you’re navigating thousands of components, finding the right one was previously a clunky experience in Figma. You’d have to remember the exact component name or scan a giant list. In addition to Variants, which will reduce the number of components designers need to look through, we’ve overhauled the [Instance Swap Menu](https://help.figma.com/hc/en-us/articles/360039150413) so that it scales with your design system. You can now use thumbnails, keyboard shortcuts, and search to find the component you’re looking for.

### [Copy, paste, and code with the new Inspect Tab (live now)](#copy-paste-and-code-with-the-new-inspect-tab-live)

When it comes time to implement designs, developers need to find the right information. The new [Inspect Tab](https://help.figma.com/hc/en-us/articles/360055203533) replaces the Code panel and provides more relevant properties developers can grab. The name of the selected layer is shown right at the top to help designers and developers get on the same page about what’s being implemented. And there are new sections showing relevant values for Variants, Colors, Shadows, Content, Typography, Borders, and more. It also lets developers click to copy any value to their clipboard—including whole snippets of key:value pairs—so they can easily paste things into code.

These updates are just the start of how we envision bringing design and code closer together in Figma. There are times when a designer needs a free and unrestrained canvas to work in, and there are times when a more structured code-inspired approach is the fastest way for a designer to work. We imagine a world where designers can move smoothly between those two ways of working as they see fit.