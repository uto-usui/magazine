---
title: "Design for everyone with these accessibility-focused plugins"
source: "https://www.figma.com/blog/design-for-everyone-with-these-accessibility-focused-plugins/"
publishedDate: "2019-08-16"
category: "design"
feedName: "Figma Blog"
---

Failing to thoroughly address accessibility in your design means a large demographic of users may be excluded from being able to use your product. Just specifying the right colors so that text has enough contrast, or providing a way for users to navigate your site with a keyboard can make all the difference in enabling them to use your product too. [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) (Web Content AccessibilityGuidelines) publishes and maintains standards for creating accessible on-screen experiences and is a great resource to learn more. To meet these needs while working in Figma, there is a growing collection of accessibility-focused plugins to help you tackle these challenges in your own designs. In this weeks plugin-round up, we'll take a closer look at some helpful plugins to help you make your designs better for everyone.

Let's start with color contrast. An important part of choosing the right color pairings between text and the surfaces/backgrounds they reside on, is ensuring there is enough contrast so that the text is legible and readable by users with varying levels of vision. These plugins will help you identify if particular color combinations meet [WCAG AA or AAA](https://www.w3.org/TR/WCAG20/#visual-audio-contrast) standards. Each of these has their own unique features and user-interface, so feel free try them both to see which one works best for you.

## [Able](#able)

Creator: [Sondre Kvam](https://www.figma.com/c/user/582151016051772491/)

Able is plugin designed to check color contrast—it will analyze the color of any two objects that you have selected. One feature that I like most about this plugin is that it updates as you change your selection. The plugin also takes your colors and gives you a text/background preview and an option that enables you to simulate what those colors will look like through the lens of different types of color blindnesses. And, you can swap the colors between the text and background color. As a bonus, in the menu to select a type of color blindness to simulate, you’ll see a data point by each that indicates what percentage of the population is affected by each type of color deficiency.

## [Contrast Checker](#contrast-checker)

Creator: [Stark](https://www.figma.com/c/user/582151016051772491/)

If you're coming from Sketch, you may already recognize this one. Stark displays the contrast ratio for any two objects that you select. It also gives you a contextual preview depending on whether or not one of your layers is a text layer or not. The plugin also displays a breakdown of your selected colors at both AA/AA+ and AAA/AAA+ ratings to show different levels of contrast ratios and a rating for if the font size used is over 18pts.

## [Color Blind](#color-blind)

Creator: [Sam Mason de Caires](https://www.figma.com/c/user/680883307046421033/), UX Engineer at Cloudflare

Color Blind is a plugin designed to help you understand how your colors will look from the perspective of different types of color blindness. One of the unique things about this plugin is that it doesn't just give you a preview of the colors you have chosen, but actually generates visuals on canvas based on whatever elements you have selected. The plugin will create duplicates of your design and change the colors to reflect each type of vision in an appropriately named group.

## [Focus Orderer](#focus-orderer)

Creator: Tiffany Chen, UX designer at Microsoft

Shifting gears from colors, let’s move on to Focus Orderer. Focus Ordered lets designers annotate their designs to indicate where and what order the browser should change the focus to. With this plugin, you can select an element and use the plugin to create a focal point. If you need to change the order of the focus, you can do it all in the plugin UI by dragging to change their order and Focus Orderer will take care of renumbering them all on canvas. You can also use the plugin to test and tab through all the elements as well. This is a great way to treat accessibility as a first-class citizen during your design to implementation process.

We hope that these accessibility plugins find a place in your Figma workflow. Stay tuned next week for another round up of useful plugins, and if you missed last weeks, be sure to check out our post on [5 helpful utility plugins.](https://www.figma.com/blog/five-utility-plugins-to-speed-up-your-workflow/)

P.S: If you're thinking of developing your own plugin, be sure to check out our [Plugin API documentation](https://www.figma.com/plugin-docs/intro/) to learn how to get started. There is also an online Slack community of plugin developers to connect with, too! If developing your own plugin feels intimidating, remember you can launch the console in Figma and try a few commands to get a feel for how it works. If you've ever used Javascript to interact with the DOM on a website, interacting with the Figma canvas works almost the same.