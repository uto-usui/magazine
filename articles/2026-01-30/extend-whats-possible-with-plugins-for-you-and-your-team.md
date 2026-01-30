---
title: "Extend what’s possible with plugins for you and your team"
source: "https://www.figma.com/blog/extend-whats-possible-with-plugins-for-you-and-your-team/"
publishedDate: "2020-03-11"
category: "design"
feedName: "Figma Blog"
---

If you’ve already started integrating plugins into your workflow, then you’ve probably discovered the productivity gains of being able to reduce lengthy operations to a few clicks. However, there isn’t always a plugin to come to the rescue. Maybe your challenge is too specific to your product or the nuances of your components and styles. So what do you do? Build your own bespoke tools to help you and your team work faster!

Over the last six months it has been encouraging to see the growth of the plugin community. In addition to the 400+ plugins that are now publicly available, many people have also shared private plugins that are specifically tailored to their own individual and team’s workflows. At [Config](https://www.figma.com/blog/reflections-on-config-our-first-user-conference/)

, one of our most popular sessions—and one that we certainly underestimated the demand for—centered around this exact topic. In this series of lightning talks, [Lily Nguyen](https://twitter.com/lily___digital) (Uber), [Brian Lovin](https://twitter.com/brian_lovin) (GitHub), and [Jake Millar](https://twitter.com/pwnies) (Atlassian) shared a collection of tools they created, along with guidance on how to identify the right opportunities for building your own.

## [Automating the boring parts—a mono plugin for GitHub](#automating-the-boring-parts-a-mono-plugin-for)

Brian Lovin, Staff Product Designer at GitHub, started building plugins after realizing how cumbersome repetitive tasks could be. As he encountered these tasks, each eventually became the impetus to build a small utility to make those boring jobs easier (and faster!).

### [Borders utility](#borders-utility)

The first plugin was a small utility that shows and hides a particular combination of layers in Github’s list item components. Instead of having separate components that would each need to be maintained, each list item component could make use of many divider sizes and placements. This meant that Brian could consolidate all of the divider options into a single group within the component. He then built a plugin to toggle the visibility of the correct divider.

### [Color theming](#color-theming)

For their [upcoming mobile app](https://github.com/mobile) the team planned to support light and dark themes, in addition to a high contrast mode (available in both themes) for accessibility. This meant creating and managing four sets of different (but sometimes visually hard to distinguish) colors and repetitively applying each of those functionally named colors with their counterparts in corresponding themes. Brian built a plugin to quickly search and manage the growing list of styles, making it easier for designers to find the right colors. Additionally, the plugin also made it possible to quickly switch entire designs from one theme to another with a couple of clicks.

### [Real content and a consolidated approach](#real-content-and-a-consolidated-approach)

Continuing down this path, adding real content was next. In order to create accurate mockups (and stress test designs), a data population plugin was made to pull live real data from their API directly into designs. The plugin pulls in random samples of data and maps corresponding content, like avatars, usernames, and full names, to layer names in their components.

After building each of these tools, Brian consolidated their functions into a single “mono plugin.” This enabled a more seamless user experience for other designers on the team to install and launch a single plugin UI to access all of these workflow enhancements.

## [Real content, and nearly real avatars at Atlassian](#real-content-and-nearly-real-avatars-at-atlassian)

Fueled by the fear of unknowingly shipping filler text and imagery to production, Jake Miller, Design Systems Lead at Atlassian, set out to tackle building a content generator for their designers. While there were a few existing plugins for populating designs with more generic text, the design teams at Atlassian needed content specific to their products and data that was linked together (i.e. a project description that would correspond to a project name). The end result: a plugin called ADG Data Generator that enables designers to choose content from whichever product they’re working on. Working on a Jira feature? Projects and ticket numbers! BitBucket? Branches and commit messages!

The plugin can fill in data for users as well, with one twist: instead of using stock imagery—which potentially means shipping a photo of an actual person—the plugin leverages AI-generated images of realistic looking users who aren’t _actually_ real.

Looking to build something similar? Jake and the team have been kind enough to [share the source code of their generator](https://proto.atlassian.design/figma) plugin with the community.

## [3d vehicles, linting, crits and more at Uber](#_3d-vehicles-linting-crits-and-more-at-uber)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsSAAALEgHS3X78AAACFklEQVQozw2QW0/TAACF+4bJUNy4jEHX3dq167r72t23so2WcUfdmJBIAKOYZUFZYkR4keiDJpr4Yvi3n334nk7ynZwjzD8PEQzKyLES5bzN5fkFj4+/+P3nG0cH+xhqlp7t8OXujtv7BwbOGR1rxGQ85ef0KzfHn3hzMGNy9Z0rD8H3bIXAokR4XSOrmwxfvuL+fsZsNsHddNCVDGaxwWh4yvj4nHbtkFp+jz37hKFzzk7rjH79DHfjErd7ifDEF2BpIYi+KtGIp+iaNVzHpdfrU8qbJCIpEtE02XSFcrZNMdWirG5QSTmY+oBqdpeKsUs5tU3JQ5j3LZLyr3AiSlzHZQ4SKgXNIKfnyHlzk55QWksSE3W0aA4jWqCcqFJP2jS0Lm2jRznZIRdvYSU3EBRJobMmcRsO80+Oc61qDIpF+tUam1YT12zjWjaDlovT2sJKNynJFVpam02jSzfdQY9YKGLJK2kiDBo2W2qaj+sif2MRbg2dcdVkp9lgt93j3fYLHk7f8mP6mZv3Mw43x1T1DmWlSjtVp+rJ5fU8SamEpbUQRs42vUwBJxji9eoqQ1mmlVRRpChqVMUt1Jm4R0xHFxzvn9I2HfKKhamUaWoWuWgWVTRo6nV2vEw4tPtUjRxiYBlxwU/GE8lihKc+P3Nzz/DPLyEtS8RDMuJKjGAgTCyYoKaWsI2a92kGJZTESZt86Lj8Bzj3DD3tZCsRAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/f0d6c9a54af74d577e64a0f940d021724d2e7d17-1598x678.png?w=804&h=341&q=75&fit=max&auto=format)

Lily, in collaboration with [Vietanh Nguyen](https://twitter.com/bettergui), has been working closely to improve collaboration, reduce inconsistencies and accelerate workflows at Uber. The duo has produced over four plugins to help their team in different ways:

### [Design crits for mobile](#design-crits-for-mobile)

Part of successfully evaluating a mobile design is interacting with it on a device. The team already had a very open and collaborative critique process, but sharing to a large screen made it difficult for each member to get a sense of how the design would feel in the palm of their hands. To make this process easier, they built a plugin that uses a [QR code](https://www.figma.com/qr-code-generator/) with a URL to mirror whatever frame is selected in Figma, directly to each persons device. Everyone in the crit can now independently experience each design, enabling them to provide more thoughtful feedback.

### [Color linter](#color-linter)

Linting is a tool used by developers to help automate the discovery of programming bugs, syntax errors, and stylistic inconsistencies. Lily and Vietanh decided to bring this concept to Uber’s designers by building a plugin that would find incorrectly applied color styles, and objects without them. The plugin flags them and assists users in picking the right semantically-named colors from their palette. The end result not only helps them reduce errors when developers are inspecting files, but also allows designers to use Uber’s custom light/dark mode plugin to instantly preview any design in the opposite theme with a single command.

### [Uber Garage: Improving mock-up quality with 3d vehicles](#uber-garage-improving-mock-up-quality-with-3d)

Due to the wide range of vehicles you can request at Uber, designers had to mockup designs for everything from passenger cars, to scooters, to helicopters. With all these considerations, there’s a limitless combination of perspectives and angles required to accurately situate these vehicles on a map. To solve this, the team built a plugin called Uber Garage which allows a designer to choose a vehicle, rotate a 3-dimensional model to their desired angle and instantly insert it into their design.

## [Watch](#watch)

Want to watch the full session? Tune into the recording of all three lightning talks!

## [Getting started](#getting-started)

So you’ve got some ideas brewing and want to build your own? We’ve got some useful resources to help you get started.

-   [Figma Plugin API documentation](https://www.figma.com/plugin-docs/intro/): Our documentation website of course has an API reference, but also includes a getting started guide, along with some useful information that explains how plugins work, how to create a UI, and how to work with network requests.
-   [Figma Plugins Slack Workspace](https://join.slack.com/t/figmaplugins/shared_invite/enQtNjg5NzQ4NTQ4OTAyLWJjOWQyZGRjNmYyZTRmYjk3ZTgzNjJhZTYzZmU5NmJkYzA4MzdjMDFlNzVlM2QwZjhlMGMwMTA5ZWI0N2UxZTA): This is a great place to interact with other plugin developers, get help and ask questions. You’ll even find some members of the Figma team there—they’re happy to help and field feedback on the plugin API roadmap.
-   [Open source source plugins](https://github.com/thomas-lowry/figma-plugins-on-github): This repo is an always-evolving list of plugins and plugin development resources that are available on GitHub. Want to see how an existing plugin works? Looking for a boilerplate to get up and running with React, Vue, or Svelte? You’ll find it here!
-   [Building a plugin tutorial](https://alcohollick.com/writing/figma-plugin-tutorial-1-6/): [Dan Hollick](https://twitter.com/DanHollick) has put together a comprehensive 6-part tutorial that takes you through building a color contrast checker.