---
title: "How Microsoft built plugins to improve their workflow"
source: "https://www.figma.com/blog/how-microsoft-built-plugins-to-improve-their-workflow/"
publishedDate: "2019-08-28"
category: "design"
feedName: "Figma Blog"
---

Since the introduction of its Fluent design system, Microsoft has been on a mission to improve usability, consistency, and accessibility across all their products. But driving adoption across multiple product lines, organizations, and teams comes with its fair share of complexities. Tooling is more important than ever. As Eugene Gavriloff, Design Tools Team Lead, explains, “We’re constantly thinking about how to create better design tools and services that help people make great products.” And that is where Figma plugins come into play.

Plugins can serve as little power-ups to a designer’s process. For large teams, they can bring more efficiency to your workflow and help eliminate tedious tasks. But sometimes, you may need a private plugin tailored specifically to your team's needs, like bringing in relevant data, importing translations, or automating tedious work.

For Microsoft, the opportunity to customize their processes with Figma Plugins meant they could more seamlessly integrate the Fluent design system into their workflow and help designers be more efficient. As [Jackie Chui](https://www.figma.com/blog/behind-the-plugins-jackie-chui-microsoft/)

, UX designer, puts it, “The more tools we integrate into our Fluent design system, the more useful our system becomes.” Let’s see what they’ve built…

## [Bring custom design assets into Figma](#bring-custom-design-assets-into-figma)

Every designer knows that dummy content can fail to capture design intent; lorem ipsum doesn't always cut it. And at Microsoft dropping in generic content can lead to issues, even if used in a mock or prototype. So Eugene created a custom plugin called [Content Reel](https://www.figma.com/c/plugin/731627216655469013/Content-Reel/) which helps Microsoft designers find specific content for their layouts.

While this plugin is available to the community, Microsoft has an internal version just for their teams. For example, Microsoft’s version of Content Reel pulls in approved text strings, avatars, and icons into their designs. Not only does this make the designer’s life easier, but it also removes the process of finding or seeking approval on specific content.

Interested in building your own Content Reel plugin? We imagine every company can have its own version of Content Reel that pulls in custom content, approved by their organization.

## [Switch between your own libraries easily](#switch-between-your-own-libraries-easily)

For companies with multiple products, it’s a common practice to have unique libraries and styles for each product. At Microsoft, they have hundreds of libraries in Figma. At this scale, adapting designs to multiple product styles can be a manual, thankless process. Thus Jackie set out to solve this challenge. He created Themer, which allows Microsoft designers to quickly switch between their multiple product themes like Work, Outlook, and others.

If you’re looking to create your own version of Themer, first check out the publicly available [Themer plugin](https://www.figma.com/c/plugin/731176732337510831/Themer/) built by our very own Design Advocate, Tom Lowry. Tom’s Themer plugin allows you to easily swap between published styles from your libraries.

## [Build workflow tools that unleash creativity](#build-workflow-tools-that-unleash-creativity)

Ever mindful of their workflows, designers recognized how much time they spent on repetitive tasks. To free up time for creative problem solving, the Microsoft team also built a suite of plugins to help each other – and any design team – trade the daily grind for an efficient state of zen.

For Jackie, his passion for plugins preceded plugins themselves. A natural tinkerer, he’s been exploring the Figma API ever since the launch of [Figma platform](https://www.figma.com/blog/introducing-figmas-platform/)

more than a year ago and loves building tools that empower designers to focus on what they do best—creating beautiful experiences. “Figma has become the primary design tool in Microsoft,” Jackie says, “so it only makes sense for me to start building on the platform that helps my team's workflow and expand outward from there.” Here are a few of Jackie’s plugins available to the Figma community:

[**Find and Replace does**](https://www.figma.com/c/plugin/735072959812183643/Find-and-Replace/) just what it says; it searches for texts on your page and replaces them just like a text editor.

[**Paste to Fill**](https://www.figma.com/c/plugin/740097744539225981/Paste-to-Fill/) enables you to copy an image and paste it as a fill on your selected layers. You can also paste in an image URL to load its image as a layer fill.

[**Button Resizer**](https://www.figma.com/c/plugin/740127005583346577/Button-Resizer/) allows you to easily resize your button to fit its label width.

Another plugin enthusiast is Microsoft designer [Tiffany Chen](https://www.figma.com/blog/behind-the-plugins-tiffany-chen-microsoft/)

. She sits on the Modern Input and Accessibility team where she is focused on creating more awareness around making product experiences more inclusive. She is on a mission to reverse how designers approach accessibility at Microsoft. She explains, “We tend to think of accessibility as an afterthought—something that gets tacked on at the end of the product development process, but that results in a lot of serious implications.”

Tiffany has built a handful of accessibility tools that empower her fellow designers to bring designing accessibility to the forefront. Her vision is to build an entire suite of accessibility plugins and make them available to the public. Here are the first of Tiffany’s accessibility plugins:

[**Focus Orderer**](https://www.figma.com/c/plugin/731310036968334777/Focus-Orderer/) automates a lot of the (very manual) design process for annotating for accessibility purposes. It enables you to quickly annotate your designs’ focus / tab order flow, so the flow of focused, interactable objects is meaningful.

[**Color Contrast Checker**](https://www.figma.com/c/plugin/733159460536249875/Color-Contrast-Checker/) checks the color contrast ratio of all visible text in a frame and provides feedback on whether it meets WCAG’s AA and/or AAA level compliance. It also provides color sliders that allow users to adjust the colors and understand how the corresponding contrast ratio changes in real-time.

This is just the beginning for the Microsoft team. In addition to building out the functionality of Content Reel and publishing more accessibility plugins, the team plans to tap into telemetry data and integrate it into their design processes, like a private plugin that captures usage data of Fluent design system components.

Creating a Figma plugin is as easy as building a webpage. To create your own, [check out our developer docs](https://www.figma.com/developers).