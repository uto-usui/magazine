---
title: "Dev Mode fast follows: 200+ new features and fixes"
source: "https://www.figma.com/blog/dev-mode-fast-follows-200-new-features-and-fixes/"
publishedDate: "2023-08-22"
category: "design"
feedName: "Figma Blog"
---

## [New to Dev Mode](#new-to-dev-mode)

1\. **You can now add status labels to components, instances, and frames** in addition to sections on the canvas—making it even easier to share assets for development without having to totally reorganize your file.

2\. You asked, we delivered: **Access layout grids, rules, and outline mode** via the “View” menu, or using the same shortcuts as in Design Mode.

3\. Want to learn more about detached components? Voilà—**you can compare changes to the main component.**

4\. By popular demand, **we brought back Android XML & iOS UIKit as code options**.

5\. Expand your palette with **the new UIColor option**. Select it using the color format dropdown in the Inspect panel.

6\. Drum roll, please: **With version history, you can view and inspect different iterations** of your design by clicking the file name in the toolbar.

## [Usability and performance improvements](#usability-and-performance-improvements)

7\. When a design system component hails from an external library, **we’ll surface the name of that library**.

8\. **Nested component props show up in the component playground**, giving you higher detail and more to experiment with.

9\. If you have different modes set for a component configuration—say, light and dark modes—**you can experiment with them in the component playground**, too.

10\. When choosing which units you want to see in the canvas and generated code, **you can select the rem unit only with text properties**, and keep the other properties in pixels.

11\. **You can select—and even export—multiple objects at once** from the canvas. Just hold “Shift” and click to round ’em up.

12\. **All files and notifications from your Figma account [will surface in VS Code](https://help.figma.com/hc/en-us/articles/15023121296151-Figma-for-VS-Code)**, making it easier for you to switch projects and stay on top of changes.

13\. Typography preview goes beyond visualization, **revealing rich text properties like style name, font size, and line height**—all of which you can copy with a click.

14\. Let’s get granular. **You can select individual parts of the text on the canvas to inspect**.

15\. **The layers section in the left panel is vertically resizable**—just click and drag to change the height to your heart’s desire.

16\. When there’s a raw value with a high probability match with a variable in your design system, **we’ll suggest the variable** so designers don’t have to add them in manually.

17\. You can inspect values not only through code snippets, but **also as Figma properties**.

18\. The new source files section **allows you to download files**, such as images, that are part of the design.

19\. We added the **alternative units feature** to the regular preference menu to make it easier to find.

20\. When a section is selected, you’ll get **a collated view for links by frame** at the section level.

## [Updates to code generation](#updates-to-code-generation)

21\. New shortcut alert: **Hold down “Shift” to copy all code snippets** at once.

22\. You can use `padding-top`, `-bottom`, `-left`, and `-right` in CSS even if only one padding value is set.

23\. No more squinting to see if that’s Arial or Helvetica. We always show `font-style`, `line-height`, and `font-weight` in code snippets.

24\. Code snippets show `line-height` as both a % value and pixel value, so you always have the information you need.

25\. OpenType font features `font-feature-settings`, `font-variant-numeric`, and `font-kerning` are supported in CSS codegen.

26\. We’ve added variable support for auto layout properties `min-width`, `max-width`, `min-height`, and `max-height` as well as vertical gap in wrapping layouts.

27\. For text layers that have multiple paragraphs or spans that include different text styles, **we display the CSS code for each individual style.**

28\. We can’t take credit for this one, but **there are nearly 80 codegen plugins available** in the Figma community. [Check out some of our favorites](https://www.figma.com/community/plugins/devmode) for Tailwind, React, Vue, and more.

## [Bug fixes](#bug-fixes)

29\. **Switch between Design and Dev Mode** using tab navigation.

30\. We made sure to **correctly display alternative units** across all hint texts and tooltips.

31\. **Gradients in text** are smoother than ever.

32\. You can **select layer names from the layers panel, and click to copy them**.

33\. **The right-click context menu is available in the layers panel** instead of just on the canvas.

34\. **We’ve fixed issues with logging in to VS Code** and added a troubleshooting guide for navigating external factors.

35\. **We’ve solved performance issues** in certain files.

We released Dev Mode in open beta so we could rapidly iterate based on your feedback, and we’re always excited to hear more. Please [keep sharing your thoughts with us](https://form.asana.com/?k=wksnkyJe5TlKwleZgXZHng&d=10497086658021) as we bring design and development closer in Figma.