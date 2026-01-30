---
title: "A conversation with Figma's accessibility team"
source: "https://www.figma.com/blog/a-conversation-with-our-accessibility-team/"
publishedDate: "2022-11-17"
category: "design"
feedName: "Figma Blog"
---

_Earlier this month, we launched [screen reader support for Figma prototypes](https://www.figma.com/community/file/1167124335986833540) and [beta recruiting for screen reader support in FigJam](https://docs.google.com/forms/d/e/1FAIpQLSeNEr354V5GN5JV42YDkb9kPbIOhVbhNi2zyQVl4-zFK8JBRw/viewform), as part of our goal to [make Figma more accessible](https://www.figma.com/blog/a-step-forward-in-our-accessibility-efforts/)_

_. As the year comes to a close, we sat down with engineers Rachel Miller, David Winslow, and Dorothy Chen, as well as product manager KC Oh on the accessibility team. Here, they share what they’ve learned from the community and their vision for what’s ahead._

#### [In May, we first announced that screen reader support for prototypes was in open beta for all users to try. What kind of insights came out of testing?](#in-may-we-first-announced-that-screen-reader)

**David:** One of the most important things about an open beta is that you learn a lot more about the actual user—you can only get so much data from internal testing. In this case, we realized that our feature worked well for Mac VoiceOver, but we needed to make adjustments for compatibility with other screen reader technologies like JAWS. We learned that each has unique requirements and considerations, so we now test all major screen reader technologies earlier in our development process.

**KC:** The beta reinforced for me that there’s a spectrum of users: I’m embarrassed to admit that I previously assumed screen reader usage was more binary—blind and dependent on audio versus sighted—and that folks relying on a screen reader wouldn't be doing visual work in a tool like Figma. In reality, the screen reader mode complements the visuals, so someone with low vision can have additional context that they otherwise might not be able to resolve. Plus, it improves the experience for everyone by offering different ways to interact with content.

These insights better informed how the visual experience and screen reader experience should interact. Here are some of the decisions we made as a result:

-   We provide positioning information in the accessibility tree (the information that a page makes available to screen readers) so that the screen reader cursor correctly indicates its position on screen for sighted screen reader users.
-   We trigger "On hover" interactions while clickable elements have focus (accessible designs often differentiate these two states, and the ideal fix here would be a “While focused” interaction trigger).
-   Scrollable areas scroll as the screen reader cursor moves through them, just as native HTML content would.
-   We now take [keyboard focus](https://web.dev/learn/accessibility/focus/) into account when auto-hiding the viewer’s toolbars. It’s important that these get out of the way when you’re exploring a prototype, but also that the focused control stays visible. Finding the right balance took some iteration.

More broadly, we all learned that this is something we have to work on—removing any prior assumptions and really taking the time to learn and empathize with our users.

**Rachel:** A beta is the best way to understand what’s not working yet in your feature. Even when the prototype experience was accessible to screen readers, we realized how frustrating it was that there wasn’t an accessible way to get to the prototypes from a Figma design. It was a humbling moment, for sure. So, for the actual launch, we prioritized including a shortcut to open prototyping mode (Mac: _Opt+Cmd+Return_, PC: _Alt+Ctrl+Enter_), a toggle to turn on screen reader support more permanently, and more feature education on Figma Community.

#### [We also brought on accessibility partners to help us stress-test the beta and upcoming accessibility features. Can you share more about this process?](#we-also-brought-on-accessibility-partners-to-help)

**Dorothy:** We work with [Fable](https://makeitfable.com/), which connects companies like Figma to people who use assistive technologies. Fable can help us facilitate everything from setting up tests for users to try specific flows we’ve built, to user interviews for in-depth product feedback. Fable users have flagged important considerations, like how to communicate accessibility controls to users. We are starting to address this by incorporating accessibility navigation keyboard shortcuts into our keyboard shortcuts panel and making the panel UI itself more accessible. We are continuing to iterate to improve the experience.

Fable has also challenged us to be more thoughtful in how we communicate the information hierarchy in FigJam for the screen reader beta. As a result, we now tell screen readers the number of children or siblings each FigJam item has and are looking into more ways to contextualize everything on the canvas.

Fable has really helped us consider various screen reader softwares and better support people at different skill levels, which allows us to fine-tune what we build.

#### [Are you happy with how Figma prototypes work with screen readers today? Or will there be more improvements?](#are-you-happy-with-how-figma-prototypes-work-with)

**Rachel:** There is still a lot to do at Figma to support people who use screen readers and other assistive technologies—and we have plans to continue. For example, we’ve prioritized making sure content is always available to screen reader users by default. But we know that accessibility is an essential part of the design, and we’d like to give more control to designers over the HTML we generate. Longer term, we’d also like to see more helpful tools for designers to evaluate how accessible their designs are, even if they aren’t very familiar with screen readers.

**David:** In my mind, there are two general features users are looking for when asking for deeper control over accessible prototypes. One is being able to provide even more information for screen readers: accessibility-minded web designers have a good idea of the HTML features they want to leverage—standard semantic features like <main>, <nav>, <h1> through <h6>, and alt text for images. The other is customizing accessibility controls: Some designers are thinking about applications outside the browser and want to adapt basic navigation to emulate other platforms. (Think of a TV set-top-box interface where the remote only has _arrow_ and _OK_ keys, so the Tab key isn’t available to control focus.) The most demanding, interactive prototypes require both features—communicating detailed context to the screen reader, and specialized keyboard controls—to provide the most accessible experience.

#### [People can now sign up and try screen reader support for FigJam. How did we incorporate previous learnings into this latest beta?](#people-can-now-sign-up-and-try-screen-reader)

**Rachel:** We applied similar solutions from accessible prototypes for our FigJam beta: For both, we needed to translate Figma’s internal representation of designs into HTML with accessibility-friendly metadata. Prior to this work, we’d never created HTML to represent our designs, despite HTML being the common building blocks for most websites.

![A screenshot of a FigJam file with a rectangular box. Inside the box has three yellow stickies with brainstorming text. The FigJam file is set on a green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACUElEQVQokXXSb09SYRjHcd+A9aSeOOut9DJss1J60DNrK9v8U1tLLTN1mZrackmrZQb+qQdOtyA0IxUlYZigIAGpRzgIHDhwhPFt59asNT3bde6zs/v32X3tuktODVdQZqqi2tbJhH8O+5aH2bAba8CJxb+MNbCMxb/Epw0HloCTmZCLLxE3tuAK0+5ljHM2Kqc6hKFbJfrrnNlA7fwga3IIRVOJJmIEg26CgXm2pQ2keIwdWWInFkGK7xBN7iGnU8STCq5IkJtfXwhDgKXDFZw3X6XRYSSSiqI/uUwcOTCN7DWiSg40JUkmuk4qbCUtrZBVkuTzBSgiMg0OozBK/wUbHEOEUpLYlFPjJCOfSW2+JbM9S1pykQhOsOftIxWeIpOMou3nKRaLIqNnjwGNhFO7AtRyKpnEFlnZT3p7Adn3mrh3gHRoHDXqRlUSAqRYFJkTTvgX3N/Pk1XzaBkNVfaR3DShhD6iJYJoGZWsqh2CnAzWL+ot71IoFIjJcfz+EOu+AL5VF6tOKx7nDD88HrxrAYI/I6SU9GHLuye3/EuJoWVzOBxLGIde0dvTx9OuHtofd/CotU2sXU+6GTWPEQlHDoai/DcUfdTlJgM19n4WJS8b0TATtikePOukoe0+da33qG2+w62mRm633BX/et8M8s37XbSrZ67b+4VxdA/PjlziwmQdN+wD1C+8pMbSjeHDQ66MNYu6PNokSv+uGm/h2mQ7tXPPxVXTMT2rG0fg6XcXOTNSSdn7KspN1QdlNojLelzpp/mzT8/oWd3Qwd9rFJs0qzkCkgAAAABJRU5ErkJggg==)![A screenshot of a FigJam file with a rectangular box. Inside the box has three yellow stickies with brainstorming text. The FigJam file is set on a green background.](https://cdn.sanity.io/images/599r6htc/regionalized/02e4b6087d9f52cbc80368c0eda91f018a31de0e-1600x900.png?w=804&h=452&q=75&fit=max&auto=format)

The screen reader beta in FigJam

**Dorothy:** We brought on Fable while we were still building the FigJam beta (but after we already announced the prototype open beta), so our Fable sessions helped influence feature must-haves for the FigJam screen reader experience. These include announcing images as “unlabelled image” instead of “article” which is too ambiguous; adding structure to pages so users can differentiate between a section/parent and the child content within; and addressing critical bugs for [NonVisual Desktop Access (NVDA) users](https://www.nvaccess.org/) ahead of release.

#### [What were some unique considerations and challenges for building screen reader support for FigJam?](#what-were-some-unique-considerations-and)

**Rachel:** Given the complexity and volume of content in FigJam files, it’s crucial to support screen readers navigating the content in ways that make sense. Since a screen reader can only announce one item at a time, users tend to build up a mental map of the content. Power users might have some common keyboard sequences committed to muscle memory (like _Alt+F, Down, Down, Down, Enter_ to open the File menu and activate the fourth item to hit Save). Imagine those types of waypoints being the primary way that you navigate an application—it’s pretty different from being able to visually scan the screen.

Unlike design prototypes, FigJam files tend to be fluid and place lots of meaning where content is on the canvas. Creating a good reading order here isn’t as straightforward as a traditional web page—which usually has a clear structure and hierarchy. Until recently, under the hood, Figma could only order objects in stacking order—which in FigJam tended to mean we could look through stickies in creation order. For this launch, we now give screen readers a way to iterate through content in a way that much more closely resembles a visual reading order. To do this, we reuse how our new [find and replace feature](https://www.figma.com/blog/behind-the-feature-find-and-replace/#forming-heuristics) cycles through text matches: heuristics like going left to right and top to bottom, but making sure to read clusters of stickies at a time before moving over to a new cluster.

While content navigation has been more challenging to get right for FigJam compared to prototypes, it has been more straightforward to map a FigJam file into HTML that captures the right information! Prototypes often represent entire web applications, but so far, Figma designs don't capture information about how frames and shapes translate into real application pieces; we don’t know whether a rectangle is a drawing, a header, or something else. However in FigJam, things like stickies and sections are well-defined in terms of what they are and how they’re used, so reading them is more straightforward. There are still things that could be better—like being more thoughtful about how much information to present and when—but at least the translation to HTML has been much clearer.

One interesting FigJam challenge we haven’t solved yet: Given that teams often use FigJam for synchronous brainstorming, we still would like to learn more about how to present real-time changes to screen readers. For example, announcing each cursor chat and new sticky would probably be really overwhelming and disruptive. We’re looking forward to learning about how to refine this experience from the beta test.

**KC:** On the product side, here are some potential areas we’re exploring:

-   Getting FigJam screen reader support from closed beta to a full launch
-   Giving designers more explicit control to customize the screen reader experience
-   Providing a design preview from the perspective of screen reader users  
    Working towards screen reader support in the actual Figma design tool

**David:** Internal education is also top of mind. We want to make sure that Figmates have a strong understanding of how to build accessible products. This includes investing in engineering and design tooling to make it easier for teams to build accessible products from the onset (e.g., an accessible component library and accessibility automated testing).

These steps will go a long way in preventing us from accruing accessibility debt as we move fast shipping features. We’ve also started supporting other Figma teams that are actively working to improve their accessibility support through a weekly office hours program, and we’re hopeful that as more engineers take on these kinds of challenges, we’ll see more representation of accessibility needs throughout the organization.

**Rachel:** Yes, I want to stress we’re still in the early phases of supporting teams building accessible experiences, and at the end of the day, we want to keep driving toward our true vision: to make design accessible to all.

We're incredibly grateful to our community, beta testers, and partners who continue to help us make Figma accessible. Learn more about how you can [start using accessible prototypes here](https://www.figma.com/community/file/1167124335986833540), or [sign up here](https://docs.google.com/forms/d/e/1FAIpQLSeNEr354V5GN5JV42YDkb9kPbIOhVbhNi2zyQVl4-zFK8JBRw/viewform) to try our latest accessibility support for FigJam.