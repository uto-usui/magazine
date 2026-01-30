---
title: "Team Libraries in Figma"
source: "https://www.figma.com/blog/team-libraries-in-figma/"
publishedDate: "2017-02-15"
category: "design"
feedName: "Figma Blog"
---

With this release, we build on the foundation we established with Components to make design systems easier to create, maintain and use across an entire team. Team Libraries are available in the product today at figma.com.

## [The problem](#the-problem)

Many prevalent problems in product design today stem from the fact that most design tools were built to imitate traditional print design tools.

The core of these applications were either built for editing photos, doing complex illustration work, or making static rectangles with text on them. Physical paper doesn’t have interactivity, so while you could draw pictures of applications with these tools, they’d never really understand how the app would actually behave in different contexts. Communicating realistic application behavior in a static artboard or using constraints that don’t actually exist in a platform’s API just isn’t good enough.

To make matters worse, your source of truth is a moving target. When building out a design system, you might start with a master file with some nice documentation and a well-defined system of symbols. That’s a great start, but as soon as you copy symbols from one file to another, they’re out-of-sync and can only be updated manually. Now you have to dig through all your design documents, replace symbols and update their overrides one symbol at a time any time you make a minor change.

As designers, our tools just don’t support the synchronized and compounding component structures needed to create lasting design systems.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAIAAACHqfpvAAAACXBIWXMAAAsSAAALEgHS3X78AAABb0lEQVQY002QTU/bQBCG/d+59II4cWglDqWNkEhBFAEJgpg4cZBZ1zjrxFlnbSfrT9bf601/QIdbpdlXM7Pvo9GMcpCB7P8L4feCyt6HPsRf0D4QHe1aDxS+2sZraiK6rZS+Ar4seafuSxwuqsKJd0ZIpkVuVxynzMhjsy7W/MNJYytL7TxdEndmoTH1FsArbUNs43ZyeWw8fCXLEVJ/zH6fbt7viT3SR2dI/cn8xUeGk8hiO7QP31ZY1bWbP2gM8xV45vzX+PxIHZ6Y8yGQzxdfLO0CGzezu2/G83dGdZ7jPLEjZkZ7RD19aT059qSpiAJrhJ6G1IH9eu1v1LVxhbWBjx9jOts5D2zzVGYWT8w01PMI8czeU52uVRa+wQkUuEpbrrJgziOjKTDf6TlVqwTVmVkE05LpXYnrFPFAAxW1W6UmZ6+ASBl8woee9o0rW3IQW9G4onL6ZtO3pCsdUa1k50EOCTTB+VmCWVAA/wED6mLfQSGhmQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/2555eedf35ceae8d5b6cf8f77e261fb370766b81-800x281.png?w=804&h=282&q=75&fit=max&auto=format)

Brad Frost’s Atomic Design

None of this is new. Design systems have been a hot topic of conversation in product design for a while now. There’s a reason the most successful design teams in the world like Facebook, Google, and Airbnb invest heavily in design systems to help their teams function more efficiently — because design tools have failed to keep up. As a result, these companies have had to build their own custom tools and hire staff whose entire job is to maintain these systems.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAAB30lEQVQozz1Ry27TQBT1P7EoUoVEV10WiUpIgNgEiQISIEAqammRWFdVV+2OdRdJEVIbN/ThpE3scR62E4j7QCS8GtszdnjEzszUG+7Ecq6uRjNnzjlzdEcaUsoYu0yLc04pHQ6H45WNCnCeEARFFECSEPP0Ko6BG0ZRGIaJTJAYG+/jOAZWYkcZlegIBUNxAWLOovGDlPIRDyKIdKlYRAKEghgc0lQsvqScCxgEjEZJbsg/Mks40AAnD0ingY/cXgO7FsE6dpo+Nohb9XpN4tU8B7pFsEk8oNkBqWHXDvwv0H3fDwfSu3P7Wa28aKBlS3+AikumPt9QH6LSG0t/Uj1+rB+9bVZfGdpa21qzrRf1yvpJq/C9o/zodvuBtNo275T372vKvcrBZGHrRlGePtieyGdvFnev7b6flHO3SoXrHz/cLe8vmuhR9Wjj9FPTc776xB/8k1Y+g3gvoym3j/euytkZJT99uD0h52aL8pS8NZXPzSrylZ0smK60zVXb2vnZJYNBMlER+3m9/NpEC4aWUQ9hfdmozKHSsqk/RSXoJQNlVGXBQJuds83Ouepe/Imi5Kuls36gw8A8p46divOrgR2YlupcGNiFQWpuDzZwrGP3JCAtH3/7+ztKv/A/6T/6DaD8C+MAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/f5212d72d943f0e2953bf338ade624d58f7270e9-800x381.png?w=804&h=383&q=75&fit=max&auto=format)

Airbnb’s Design Language System

## [Bridging the gap](#bridging-the-gap)

Since long before I joined the team last June, Figma’s been working to create a tool that connects visual design to dynamic user interface design. So far, we’ve released:

-   Reliable and intuitive vector editing
-   Constraints that map to system behavior
-   Reusable, dynamic components to help make high-level design systems feasible on a personal level

Now, we’re releasing a beta of Team Libraries to make components usable across all of your files and team members.

Team Libraries are a perfect example of why we built Figma on the web. They let you create effective, scalable design systems by reusing shared, synchronized components across files and team members. This feature makes it easier and more efficient to build layouts with rules and structure, enabling faster design processes for a wide variety of devices and platforms. Because it’s always online, there’s effectively zero sync time across your files.

## [Our Approach](#our-approach)

Just as systemic design has moved from being a “nice-to-have” to becoming a requirement in product design, the composition of applications from discrete, clearly-defined parts has become more popular in engineering, via frameworks like React. The product cycle benefits globally from a clearer, more maintainable structure, so we purposely enabled designers to benefit from that workflow in Figma.

Building programming principles into a design tool isn’t cut-and-dry, though. We know that many designers think differently than their technical teammates, so we took a few engineering concepts and refined them to make them more accessible.

## [How it works](#how-it-works)

The core of the feature can be described in three simple steps: Publish, Insert, and Update.

### [Publish](#publish)

As you’re working in a design file and iterating through the latest swath of UI concepts, you’ll inevitably come to a point where a decision needs to be made about which of the many possible solutions is The One™.

When you finally get to that point:

1.  Select the component you want to make available in the team library by clicking the “Add to Library” button in the inspector sidebar.
2.  Add as many components from the file as you like.
3.  Review your changes and publish them to your team’s library.

Separating the library from the source file allows you to manage permissions for who is able to change the source of truth for your design system. Only people with Edit permissions to the source file can modify your source components, but anyone with View access can use the published components from that file. So, now your Production Designers are the only ones who can edit the file with the final icon assets and your Brand Designers are the only group who can control your color documentation. Everyone else can use their work, but they can’t set the rules.

### [Insert](#insert)

Once you’ve added your components to your team’s library, they’re available to anyone who has permission to view the source file. The shared components can be inserted in any file by clicking the components tool in the toolbar and selecting the component(s) to be inserted.

You can even nest components and publish them to the team library. That way you can construct modules from individual source elements, then later reuse those modules across more complex views and flows in other files. Deeply-nested components make maintaining a single source of truth incredibly easy and predictable.

### [Update](#update)

What happens when your brand guidelines change and assets need to be updated? Simply make the changes inside the existing component and publish it again. You’ll get a confirmation step, just like when you added them to the team library in the first place and you’ll see a nice visual diff of what changed from the last version. If you delete a component in the source file and publish those changes, you’ll see that component disappear from the team library as well, so only the current parts of your design system are shared with your team.

Being able to change a component in the team library could be problematic when the component is being used in different UI explorations, so we built in an extra step to make sure you don’t lose work. When a change is published to a component you’re using in a different file, you’ll see a notification alerting you to the update. You can choose whether or not to accept it, and if you decide not to you can update it later through the team library.

## [Conclusion](#conclusion)

By creating a design system that is clear and rule-driven, your UI components can be built and maintained in their simplest possible form and any updates will be applied in way that is predictable and cascade throughout the rest of your system.

We’re launching this as a beta feature today because we want to get it out into the world to start honing it based on user feedback as fast as possible. You can try out Team Libraries at Figma.com right now — just make a component and hit ‘Add to Library’!

We’d love to hear what you think and how we can make this even better for you and your workflow.