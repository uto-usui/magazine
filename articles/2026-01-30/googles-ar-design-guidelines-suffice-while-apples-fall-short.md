---
title: "Google’s AR Design Guidelines suffice while Apple’s fall short"
source: "https://www.figma.com/blog/googles-ar-design-guidelines-suffice-while-apples-fall-short/"
publishedDate: "2018-10-22"
category: "design"
feedName: "Figma Blog"
---

The 3D industry hit a huge turning point last summer when Google and Apple introduced mobile augmented reality (AR) platforms. In a matter of weeks, the center of gravity for 3D UX design shifted to mobile.

For the first time, anyone familiar with mobile app development could build immersive 3D experiences, with the potential to reach half a billion Android and iOS users (instead of just a small pool of VR headset owners). These platforms — ARCore from Google and ARKit from Apple — democratized 3D design for the masses.

But enthusiasm quickly gave way to more practical concerns:

1.  What tools and documentation were available to facilitate the embrace of 3D?
2.  How could mobile app designers and developers, accustomed to mature tools that formed (mostly) integrated workflows, begin to design for 3D? Not only did they need to learn the important [differences between designing for 2D and 3D](https://www.torch.app/blog/a-3d-primer-for-screen-designers), but they also had to wade through the hodgepodge of tools and [byzantine workflows](https://www.torch.app/pain) borrowed from gaming, video/film entertainment, architecture and engineering disciplines.

To answer designers’ first concern, both Apple and Google quickly released augmented reality design guidelines. Apple’s guidelines are the more modest of the two in terms of both content and ambition. These appear under the [Augmented Reality entry](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/augmented-reality/) in their Human Interface Guidelines. Google’s Augmented Reality Design Guidelines (GARDG) caught our attention for its greater breadth of topics, which seem to draw from their inspiration from Google’s real-life experience designing and building apps like [AR Stickers](https://play.google.com/store/apps/details?id=com.google.vr.apps.ornament&hl=en_US) and Just a Line.

But both guidelines ultimately fall short when confronting the complexity and ambition expressed by many designers. Apple and Google limit their focus to simple, single scene applications and make no allowance for complex mechanics — or really anything behind simple object placement and sticker-like functionality.

This doesn’t meet the needs of anyone building apps that include interactivity like:

-   Object selection
-   Conditional behaviors
-   Branching scene flows or storyboards driven off of user behavior
-   Movement between scenes using teleportation
-   Portals
-   Physical gestures

Both sets of guidelines lack any mention of multi-scene use cases, which automatically excludes many modes of interactivity or conditional behavior that leads to transitions, complex or more interesting changes of state, personalization, and ultimately a deeper, more immersive experience.

Similarly, there is no discussion of animations (a common topic in our interviews with designers), either triggered or timed, or the notion of a shared or collaborative environment. The latter example is one we frequently encounter. Designers want to allow remote collaborators and clients to see their AR prototypes in the environment for which they were intended, and to provide feedback, all in real time.

Even in the relatively tame realm of static object creation and placement, designers are already searching for the best way to design for complex behaviors, such as selecting objects that might be hidden by other objects.

That said, when it comes to object placement (the most basic interaction in AR), the Google guidelines make assumptions about optimal object placement range — within the reach of the user — that we see no reason to codify at this time. What about throwing objects as a method of placement, or pointing, grabbing and interacting with objects at a distance?

However, compared to Apple’s guidelines, which cover object placement only in relation to [ARkit surface plane detection](https://www.youtube.com/watch?v=9ZnG9wrVxtM), Google’s treatment looks exhaustive. Not only are there sections covering “tap to place,” “drag to place,” and “free placement” methods, Google also includes a section on creating a sense of realism that briefly touches on the use of physics in object placement.

Despite what it’s missing, Google’s Augmented Reality Design Guidelines (GARDG) is a good starting point, with more practical advice and a more pragmatic layout. Since they launched it in the summer, there’s been a lot of new additions, like an excellent new section on [UI components](https://developers.google.com/ar/design). Meanwhile, a section entitled [Designing the Experience](https://designguidelines.withgoogle.com/ar-design/designing-the-experience/experience.html) covers practical concerns like onboarding.

With its ongoing evolution, we can reasonably expect the guidelines to grow to reflect many of the areas of interest we’ve heard expressed. In the meantime, designers can fill in the gaps left by Google and Apple. We have the opportunity to shape best practices for 3D UX ourselves, and a few industry leaders have already started doing so. For instance, Bushra Mahmood, a designer currently with Unity, took the initiative to develop her own extensive design guidelines (well worth a look, [here](https://medium.com/@goatsandbacon/a-quick-guide-to-designing-for-augmented-reality-on-mobile-part-1-c8ecaaf303d5)), while teams, like one at [Marino Software](https://uxplanet.org/design-challenge-rapid-prototyping-a-functioning-augmented-reality-app-fb73ede33a4e), are bootstrapping entire new processes with a mishmash of existing tools.

This kind of grassroots work is crucial, because Apple’s and Google’s guidelines will never keep up with millions of creative people experimenting and innovating. By the time headsets are widely available, the distinction between 2D and 3D UX design will have been permanently erased.

By offering little in the way of resources, Apple and Google are holding the door wide open for anyone who wants to lead the way. Maybe that was the plan all along?

### [About the Author](#about-the-author)

Paul Reynolds has been a software developer and technology consultant since 1997. In 2013, after 10 years of creating video games, Paul joined Magic Leap where he was a Senior Director, overseeing content and SDK teams. In 2016 Paul moved to Portland, OR where a year later he founded [Torch](https://www.torch.app/), a prototyping, content creations, and collaboration platform for the AR and VR cloud.