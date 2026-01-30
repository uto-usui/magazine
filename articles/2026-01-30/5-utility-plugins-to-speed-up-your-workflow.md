---
title: "5 utility plugins to speed up your workflow"
source: "https://www.figma.com/blog/five-utility-plugins-to-speed-up-your-workflow/"
publishedDate: "2019-08-09"
category: "design"
feedName: "Figma Blog"
---

Following last week's [launch of plugins](https://www.figma.com/blog/introducing-figma-plugins/)

, we have seen an overwhelming influx of amazing submissions from plugin developers around the world. They have been created to help improve workflows ranging from asset and data population to addressing accessibility requirements. There have also been a great number of, what I like to refer to as, "utility plugins" created. These plugins execute useful actions that accelerate repetitive tasks. In this post I'll showcase some of the most interesting and useful plugins in this category, and demonstrate how you can use them in your workflow. Also, be sure to check in next week for another round up!

## [Viewports](#viewports)

Creator: [Denis Rojcyk](https://twitter.com/rojcyk), Digital Product Designer, [kiwi.com](https://www.kiwi.com/)

[Viewports](https://www.figma.com/c/plugin/732240841094697441/Viewports/) is a really useful plugin for changing the size of your frame to various common device sizes. You'll need to setup [constraints](https://help.figma.com/hc/en-us/article/54-constraints) on your elements first, then you can launch Viewports and use it to see how your mockup will look in the selected frame size. One of the most useful aspects to this plugin, is that for each frame size, it shows you the estimated global marketshare of of users browsing content from a specific device. This is really helpful to understand how prevalent certain viewport sizes are. Word on the street is Denis is expanding this to include desktop devices in a future release. Good news, you'll have those features when they ship since there is no need to update your plugins in Figma!

## [Component Cloner](#component-cloner)

Creator: [Kate Miller](https://github.com/katekaho), Computer Science student UC Santa Cruz

Have you ever wanted to make a copy of a master component that is not an instance? Or make a copy of a master component and all of its instances? [Component Cloner](https://www.figma.com/c/plugin/736564662640346811/Component-Cloner/) has you covered. This plugin will make a copy of any master component and instances that you have selected. It's been a great time saver in my own work. Take this use case: You have an icon component, and want to see what it looks like with a number of color overrides. Or perhaps you are building an icon sprite. Maybe you want to duplicate that component and all of its instances for the next icon that you're designing? This plugin completely eliminates the legwork from that process!

## [Nisa Text Splitter](#nisa-text-splitter)

Creator: [Orkhan Jafarov](https://twitter.com/orkhanjafarovr), Senior Frontend Developer at Invme

Ever copy and paste a block of text into Figma, but realize you want each line of text as a separate object? Perhaps you also need to sort those items alphabetically or reverse their order? [Nisa Text Splitter](https://www.figma.com/c/plugin/739048247603902878/Nisa-Text-Splitter/) will remove the tediousness of this process. Simply input or paste your text into a new text box and launch Nisa Text Splitter. Then you can use it to split the text into a separate text box at each line break. Following that, you can use the plugin (or [Smart Selections](https://help.figma.com/hc/en-us/article/189-smart-selection)) re-order them. In the event you want to merge multiple text boxes into one, there is also a join function to accomplish this.

## [Find and Replace](#find-and-replace)

Creator: [Jackie Chui](https://twitter.com/jackiechuichui), UX Designer at Microsoft

Next we'll take a look at [Find and Replace](https://www.figma.com/c/plugin/735072959812183643/Find-and-Replace/); Jackie has been extending Figma before Figma Plugins were even a thing. What started off as a browser extension has now been developed into a fully featured plugin. As you may have guessed, it enables you to find text across your document, and replace it. This plugin does however have a few additional tricks up its sleeve: in addition to replacing text strings on canvas you can also find and replace layers by name. Both operations support case-sensitivity and allow you to indicate where in the string you want to make the substitution: anywhere in the text, the beginning, the end, or only strings that match exactly. There is no shortage of use cases where this will come in handy, and the copywriters on your team will love it!

## [Similayer](#similayer)

Creator: David Williames, Senior Product Designer for the Australia Post app

You may already be familiar with some of David's work on Sketch plugins, and he has now already released [6 for Figma!](https://www.figma.com/c/user/319620268789179331/) There is no shortages of use-cases for Similayer—this plugin will make a selection from whatever parameters you select. If you have ever used Figma's native "Select all with same \_\_\_\_" functions from the Edit menu, you can already get a sense of how this plugin works. Simply select an element, launch Similayer, and add the parameters you want to find a match for. For example: you could use this to find all elements with the same border radius, or all elements with the same fill, stroke, border radius, and drop shadow! This plugin will save you MANY clicks the next time you need to edit a bunch of similar layers.

## [Bonus tip:](#bonus-tip)

You can press `⌘ + /` (Mac) or `*ctrl + /*` (Windows) to open and shift focus to the menu search. You can immediately start typing the name of the plugin you wish to use and navigate to it via keyboard, and then press enter to quickly launch a plugin. Alternatively, to run the previous plugin you can use the shortcut `⌘ + ⌥ + P` (Mac) or `Ctrl + Alt + P` (Windows).

We hope that these time-saving plugins find a place in your Figma workflow. Stay tuned next week for another round up of useful plugins for even more use cases. If you're thinking of developing your own plugin, be sure to check out our [Plugin API documentation](https://www.figma.com/plugin-docs/intro/) to learn how to get started. There is also an online [Slack community of plugin developers](https://figmaplugins.slack.com/join/shared_invite/enQtNjg5NzQ4NTQ4OTAyLWJjOWQyZGRjNmYyZTRmYjk3ZTgzNjJhZTYzZmU5NmJkYzA4MzdjMDFlNzVlM2QwZjhlMGMwMTA5ZWI0N2UxZTA) to connect with too!