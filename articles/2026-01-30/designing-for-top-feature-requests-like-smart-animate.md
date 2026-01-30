---
title: "Designing for top feature requests, like Smart Animate"
source: "https://www.figma.com/blog/announcing-smart-animate-and-advanced-transitions/"
publishedDate: "2019-10-03"
category: "design"
feedName: "Figma Blog"
---

Today, we’re introducing new prototyping features that will open the door to new transition possibilities in Figma. They’ll help bring more of your interaction design ideas to life:

-   Smart Animate, a new transition type that automatically animates similar objects and improves existing transitions
-   Drag, a new interaction type that lets users control a transition with a drag of their finger

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABK0lEQVQokZWSb0vCUBTG9y1zdw7ToWS9SKKgemGyQEOj+RXcXZtr0agkHfNfH+w+J84VC9IRwY/Dw73ngXOeew3fVL6JXaSFsMpIa8+tb8IXytCK9iBIlikosyhoQLF5l9K2lnbNJRodaDbXmo2WJklB0qLHCo3r9NSgsErSgiEFxg4lTRo7FB5SWOEa1Zi4TnGDkiNKT5Ge4fUc0zYWfbXosw5sGIGNyRVWD5j3kLnIblXmqtkNPtrIe1gOmM+hWg/V2lMsPJV38dJCUNbm90usPPYv77H21HKgMhfTDuZ37My7mHUwucbbBdIWkmNEDgU2SaHHjmo89obnEyRNxHXeLW4wkcO7cLfFy49MDoKz+J32d1TbE27Shp+0//dUouCptXn/D/sbob4ADd2/EdUIkRcAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/cc23925ec7729e492cac183ad86a5cadc0aa11fe-300x168.png?w=300&h=168&q=75&fit=max&auto=format)

Features to help achieve advanced transitions like Smart Animate and Drag have been on our minds for a while. They’ve been on our customers’ minds for even longer. If you’re a fellow designer or someone who works closely with design teams, you’re probably all too familiar with the challenges of designing for a highly requested customer feature, one where users may have pre-existing expectations for how it might work. [Click ahead](https://www.figma.com/blog/announcing-smart-animate-and-advanced-transitions/#find-the-figma-way-or-your-way) to dig into the features and see real examples of Smart Animate in action. Or continue reading to see how we designed Smart Animate…

As we kicked off design discovery for our first release of Smart Animate, we began to look for answers starting from a familiar place—our users.

## [Understand users who are experiencing pain](#understand-users-who-are-experiencing-pain)

When working on a hard design problem, talking to users is always a great start and you don’t have to be a big company to set up systematic ways to do qualitative user research. One of the ways we continuously gather feedback is through in-product NPS surveys. (Surprise! We do read the comments and take action.) Our support team replies to many responses directly, but we also categorize the NPS comments into meaningful groupings. This makes it easy to keep a pulse on specific topics and can serve as a starting point for user feedback when we’re ready to kickstart design for a new feature.

Here are some things we heard about prototyping in Figma...

> Speaking of animations, I would love simple things like dropdown lists, buttons hovers, varied and smooth appearance of pop-ups, switching tabs, and so on. It is not about complex animation…

> When I am designing screens where animation plays a big part in the experience, we need other tools to show what we want from our developers. E.g. a click shows an advanced transition from one screen to another. I would like to not use another tool for my creations.

> I was wondering if you plan to add more prototype transitions? It would be nice to have an auto-animate as well as a drag/slide transition.

The value of the NPS surveys does not lie in the score. For us, it’s in having an open feedback channel where we can hear from customers who are experiencing “pain”. We’re able to talk to them directly to get ideas on what features they’re looking for and understand what they like and don’t like about how they animate prototypes today inside and outside of Figma.

Fun fact: Many of these NPS survey respondents became our first beta customers. Special shoutout and thank you to all of them!

## [Zoom out to uncover patterns across use cases](#zoom-out-to-uncover-patterns-across-use-cases)

Because a feature like Smart Animate needs to support a variety of use cases, we can’t just design Smart Animate with one specific use case in mind. Otherwise, it’ll be too limiting and not useful for the majority of our users. To make sure that what we design can scale for a multitude of use cases, we had to zoom out and search for common design patterns.

We gathered all the animation examples we could find through our conversations with customers. We also did our own research into interactive interfaces we use in our daily lives. Then we explored how someone would prototype this in Figma and what challenges they would face when doing so.

This process led us to two major patterns that you’ll see in today’s first release of Smart Animate.

**Pattern #1: An object appears, disappears, or changes while the user stays on the same screen**You probably see this pattern everyday, like when you hover over a video and the playbar appears, when you hover over a navigation item and a dropdown expands, or when you swipe an object away and new content emerges from underneath.

**Pattern #2: Several UI elements stay fixed while the majority of the content on the user’s screen changes**You’ll find this common pattern in a tabbed navigation. This slightly more complex animation appears when you drag content left or right and the tab bar indicator moves in the opposite direction.

Upleveling beyond individual use cases allowed us to focus on common denominators. Pinning down these two patterns helped us keep the feature scope focused while still addressing many of our customers’ use cases.

## [Find the Figma way (or your way)](#find-the-figma-way-or-your-way)

We’re not the only ones trying to solve these design challenges for our customers. However, we wanted our implementation of the solution to ‘feel’ like Figma. That meant making sure Smart Animate and Drag felt well-integrated with existing prototyping features. Sometimes, building new features requires a re-examination of what’s currently there.

First at the most fundamental level, we wanted the auto-animation of layers to work out-of-the-box as best as possible. So we revisited the basics, like layer naming. We didn’t want to completely reinvent the wheel, but this seemingly small update took countless hours to get right. I’ll spare you all the details, but essentially we updated how we automatically name and rename objects on creation or duplication, so layers that match up based on hierarchy, naming, and order will auto-animate. Additionally, in cases where something wouldn’t work, we wanted to make debugging of that situation a lot easier! That’s why you’ll get visual feedback on hover and selection to quickly check if layers match up correctly. Now when you hover over the layer you’re trying to animate, you’ll see every matching counterpart on other frames.

The other thing we wanted to make sure we got right is enabling users to combine the new Smart Animate transition with existing transitions. For transitions you already use today like Push, Move, or Slide, you’ll now see an additional setting called “Smart Animate Matching Layers”. This automatically detects matching layers between two screens and animates them separately from the other objects. This little checkbox enables you to build more complex animations, faster, while minimizing the number of duplicative layers you previously needed to create to express such an animation.

For us, designing new features also means making sure the new additions work seamlessly alongside existing features and doesn’t add unnecessary product complexity. It’s not just about building more new stuff; it’s also about making sure the stuff that’s already there still works great and continues to support new capabilities.

## [Prototype examples to help you get started](#prototype-examples-to-help-you-get-started)

Now to help inspire ideas and give you a few real examples, our team got together to create a bunch of new animated prototypes you can view and duplicate. Check out some examples of what you can create with Smart Animate and Drag. And get the [source file](https://www.figma.com/file/ytXAsXHl7wSv0Vl8TghFat/Smart-Animate-Examples/duplicate) to see how our team built it.

### [Simple card expansion](#simple-card-expansion)

### [Page transition with Material Design](#page-transition-with-material-design)

### [Tab transition with multiple animating elements](#tab-transition-with-multiple-animating-elements)

### [Swipe to remove animation](#swipe-to-remove-animation)

### [Prototype for your favorite devices, like Apple Watch](#prototype-for-your-favorite-devices-like-apple)

We can’t wait to see what you create in Figma prototypes! Tweet [@figma](https://twitter.com/figma) with your prototype examples, and email me at [niko@figma.com](mailto:niko@figma.com) for thoughts on how we can continue to improve prototyping in Figma. There’s so much more that we want to do!