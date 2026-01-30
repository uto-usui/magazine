---
title: "What’s new in Figma: August 2021"
source: "https://www.figma.com/blog/whats-new-in-figma-august-2021/"
publishedDate: "2021-08-25"
category: "design"
feedName: "Figma Blog"
---

At Figma, our team is constantly obsessing over how we can improve the design experience. This is not just because we love our users (we do!) but also, selfishly, we run into a lot of these challenges firsthand. Since we’ve built Figma and FigJam _in_ Figma and FigJam, we realize that certain parts of the design process can be faster, more interactive, or even automated. This leaves you with more time to focus on what you do best—creating.

To that end, over the last month we’ve released new features and capabilities—for design teams, by our design team—to help make working in Figma better. We have sped up workflows, made it easier to maintain your design systems, and introduced new ways to customize your experience in both Figma and FigJam. If you're interested in learning more, read on for the full recap:

We know no two jam sessions are alike. Sometimes, you need to think through a user journey with a teammate. Other times, you need to bring in more people to crowdsource and vote on ideas. To help make brainstorms and workshops more tailored to how you and your team collaborate, we’re bringing our open platform to FigJam—with plugins to automate workflows and widgets to engage the entire team.

Plugins make your individual workflows more efficient, whether you’re customizing styles, organizing stickies, or importing data. Widgets are interactive canvas objects that the entire team can use together. From voting and polls to notepads and games, widgets make facilitation a breeze and bring a spark of joy to every jam session.

Our plugin and widget APIs are flexible, allowing you to build for a variety of use cases. But we’ve also made it simple to get started. If you know basic HTML and Javascript, you can build a plugin. And if you’re familiar with React, you can build a widget.

Users on every plan can start building plugins today. You can also [sign up](https://docs.google.com/forms/d/e/1FAIpQLSfx40r8fC58dT5G93I_f8fkaaqO_6SQg2oWdFUf4riwqBu3ww/viewform) to start building widgets in a private beta. And for those of you excited to use plugins and widgets in your jams—stay tuned, they’ll be available soon!

Head on over to the [blog post](https://www.figma.com/blog/bringing-the-power-of-our-open-platform-to-figjam/)

for all the details.

## [Expanding our Figma plugin API for more use cases and faster development](#expanding-our-figma-plugin-api-for-more-use-cases)

In addition to bringing our open platform to FigJam, we’ve also updated our Figma plugin API, making it faster to build plugins—and available for more use cases.

The Figma plugin API now supports prototyping writes. This means developers can build plugins to automate the prototype creation process, or update and modify interactions in bulk. With this update, we hope to see plugins become a powerful tool to improve prototyping workflows, just like they are for design work. Check out our [API documentation](https://www.figma.com/plugin-docs/intro/) to start building yourself.

We also introduced a way to use [quick actions to accept user input](https://www.figma.com/plugin-docs/plugin-parameters/), eliminating the need to create your own UI. Developers will now have a faster, simpler way to build more powerful plugins. Plugin parameters are now available in open beta. Get started with some examples [here](https://github.com/figma/plugin-samples#resizer-parameter-only).

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB50lEQVQokXWTUW/SUBiG+fkmXnvhhcZEjWbT2UEZAzYHI2NE0dUwGJQKtLTndLQFugK3j2m7jjH14ss5Ocl5vvf9zntyG6GwFoe4poqmn9EdtxBmHbdfxB+fsZR17oTK2lEe1WFyZ/Oo4vN4zWXAyDkksIv4ooZv1nCvi3hGjUA0WTqnRKLCShyzFoUncIVN1sRRyG27xR3yhLKKMBuMBpcIs4t/a7DwdKJgyMrXWMlqAt1INS2RT1VmClNySl+LPJ55xE3vhM5Aw5YSL5gzD0OidUQUmiycOt5IxZ+UCJ0ya3m0azkDJrJFnmlfpVkv0P7xHcudIed3Sc3CiMViyu3knG7rE62v7+m195mbqcpUUDLDXaAcHKOdn3Hd7jCZSkzXZyw9LNdjNhvhmU06FwXKn1/TKL9C6l+2QOcfwNAqc6tfYPV/MdT76MYA3egzNG5wrCuWzjkzo4L+84ChtkcwSa3uArODuJOs4I2rdL/l0Volxv0G9u8GtlHDm5wSOaXkUVZOgciOld1HZ8fyw1ALLO0K2uVH9t88o3zwAntQTCCRnUIyN2kqthlMwcrfwMAs0ay/48Pb55wUXyKHeTay8ASQQe5z+D/L8f7OVrEGCt2rPUa9A5aWmo7iIbyPVD35LXFs/gBHFAZr8I0w1AAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/88970dc392c5c8f0f4b027f6a709578bdea4b44e-1920x1080.png?rect=0,1,1920,1079&w=804&h=452&q=75&fit=max&auto=format)

A prototype write plugin example from Anthony DiSpezio

## [Making it easier to maintain your design system](#making-it-easier-to-maintain-your-design-system)

Design systems are central to scaling design projects while maintaining consistency throughout. While they make it easy for your team to move quickly, we know that sometimes managing and updating components and styles can be challenging. We released three new updates to components that make it easier to use and manage your design system:

-   **Move components:** You can now move published components and component sets between files, without breaking links to instances in your design system. This will make it easier to split large libraries up into smaller files or move published components to new files.
-   **Swap libraries:** Our new swap libraries feature allows you to replace an entire set of styles with another, instead of individually making changes to the styles and components.
-   **Search components:** We have created a new shortcut to help you get to the components you need faster. Use Shift + I (as in igloo) to quickly search for components.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaUlEQVQokY2S6UsTcByHtyl26CiC+huC3peKGUIwqjeZ88AD016EBWLRbBHTNaemIuVRZhlo2SFhHpkyXWotjylW6gTTzW2a23LOAxPcUJ9wCpWU9OLh94UfPHy+h4AeAevd/2bjf1YjRPvwIG+exDI2/JYll5GVJSvuH1Pe1zRUS03JSYpl+xCsbwn5je1Ca8NuyrOOUJh/Hd2HASYts3x3OJhzzbC44GKgrwOlLJ5YyWEE3oTbYFttrg+gVBmIWqWmrs6AXj+DwTCOyWTEZrPT3aVDnnaJ8OPHNhOu6QR4ND64m/xwN/viaRPhbvHxsvpeiLlBTFlWEHm5WbS0fGJ48BvGsVEmJ0aZtpjo6mznZvpVos9INoUejYjFR2JceYeYK9rPfOUuXMX+zBYFsNzoy0R9APdVQRTkqdDperCaTdgmR3BYhrF9HUanaUGeLiNSKt0StolYqPTHefcAs2Vi5qv9cD7Yg7NsL8tNPpjrxZSpginMz6K3tw/b9BQOu5XpSSPjI0O0NTcjl98gKipmc4ZrHwV42kWstPrg1orwdAhxa4WsaIWs6gRYGraEBWr6+z9jt8/gcDgxm63o9Xpqa18jk8mJiIhG4N1sz85YGjdmGExerhLtu04MhhEGvwzSr9fT3qqhuqqKlJTLSCSnf53NTndoaQjwJsxUyKioqOBVzQtePn/Ks6rHVJWXcud2NnGxcYSEhG62/Df+EDaKuXcrkCupF1EoFOSo1WSrclBlKsmQy7iWlkpMdCxhYaf+T2htFFOScZSkxBiSkpI5n3iBSGkykdJE4uMTSEiIJ/xsNCdCz/ETt/dhR+0iZH8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/d1932a8314d6cafb30cff3d19c9077b8ee3a5b03-1600x900.png?w=804&h=452&q=75&fit=max&auto=format)

Quickly search for components by pressing SHIFT + I

## [Solving for common user problems in Figma](#solving-for-common-user-problems-in-figma)

We also brought some exciting user experience updates to Figma, inspired by some of our team’s pet-peeves:

-   Transparent objects now “knock out” shadows behind them by default, saving you an extra click ([sending you a box of tissues, Sho](https://twitter.com/skuwamoto/status/1418243575297437697?s=20))
-   You can now hold down Shift to draw straight lines with the pencil tool, in both Figma and FigJam ([we can't wait to see those sqlobs, Luis](https://twitter.com/disco_lu/status/1418267147042701320?s=20))

You can see a full list of bug fixes and improvements in our [release notes](https://releases.figma.com/). And if you have any other feature requests, we’d love to hear them! Feel free to share with us on [Twitter](https://twitter.com/figma) or in the [Figma Support Forum](https://forum.figma.com/).