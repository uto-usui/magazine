---
title: "How (and why) we built branching"
source: "https://www.figma.com/blog/how-and-why-we-built-branching/"
publishedDate: "2021-10-12"
category: "design"
feedName: "Figma Blog"
---

_In April, we [introduced branching](https://www.figma.com/blog/introducing-branching-space-to-iterate-and-explore-freely/)_

_as a way to enable collaboration at scale. Today, branching is broadly available on the Figma Organization plan. We have put together a [best practices guide](https://www.figma.com/best-practices/branching-in-figma/when-to-consider/) to help you learn more about how and when to use branching, but we also wanted to share a bit about why we built it and how it came together in Figma._

We built Figma to be multiplayer and, in most cases, real-time collaboration is an advantage. You don’t have to wonder if you’re working on the right file, because everyone’s working in the same file. But, the [design process](https://www.figma.com/design-process/) can get messy. And at scale, even messier. “Unapproved” changes find their way into code, work gets overwritten, and teams have a hard time telling the difference between WIP and production-ready designs.

That’s why we’re excited to launch branching out of beta. Branches are exploratory spaces that enable designers to try new ideas without changing the main file until they’re ready and approved. They are especially useful for preserving the integrity of approved designs, while making room for work that’s experimental or iterative in nature, like contributing to a design library and previewing work for stakeholders. Now, when the time calls for a more structured approach to your designs, you can better manage your main files as a single source of truth.

## [Balancing freedom and structure at scale](#balancing-freedom-and-structure-at-scale)

At Figma, we pay very close attention to user feedback. And, as design teams have grown over the years, we noticed more and more teams asking for better version control.

The idea of branches comes from the world of software development, in which changes to files are local (i.e. stored on the machine you’re working on). Figma, on the other hand, is online, meaning that changes to files are in the cloud.

So when we were considering building branching, we asked ourselves questions like: How exactly should it work in Figma? Should we still allow multiple people simultaneously in the main file, and what about a branch? We also wondered whether it was possible to do this in a way that doesn’t add too much complexity for designers.

## [Leaning into first principles](#leaning-into-first-principles)

We decided to take a different approach than previous tools, one purpose-built to complement multiplayer collaboration in the cloud. We leaned into simplicity and consistency as first principles, with the goal of giving teams one way of thinking about versioning that’s inclusive of both branching and multiplayer.

This is why the main file is still multiplayer, and branches work the same way as a regular Figma file. Access control and permissions for editors and viewers haven’t changed. We prioritized the sanctity of user data so your changes are safe no matter what happens, and intentionally kept the bells and whistles to a minimum (no branching from a branch).

Keeping it simple, however, didn’t mean it was an easy task. Take the case of merging, for example. You might think that the hardest part would be dealing with merge conflicts—which _is_ hard. But there were lots of other unexpected "gotchas," like when you’re in the middle of reviewing a merge and the file changes from under you. Or, when you’re halfway through a merge and you lose your connection. How could we make sure you're never in a bad state?

These are just a few of the things we had to solve for that were unique to building branching into a multiplayer environment. And, in the end, we’re really happy with the way it turned out, and the decisions we made.

Today, we’re excited to open up this new workflow to everyone on a Figma Organization plan. We expect to do more with branching, so this is just the beginning. Give it a try and let us know what you think.

_You can learn more about how branching works in our [Help Center](https://help.figma.com/hc/en-us/articles/360063144053-Create-branches-and-merge-changes). If you’d like to upgrade to a Figma Organization plan, [reach out to our sales team](https://www.figma.com/contact/) for more information._