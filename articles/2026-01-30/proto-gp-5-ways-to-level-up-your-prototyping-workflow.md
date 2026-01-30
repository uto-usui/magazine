---
title: "Proto GP: 5 ways to level up your prototyping workflow"
source: "https://www.figma.com/blog/proto-gp-5-ways-to-level-up-your-prototyping-workflow/"
publishedDate: "2019-05-02"
category: "design"
feedName: "Figma Blog"
---

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAACF0lEQVQoz32SS2tTQRiG+wNyaeslPaeSSogKFSIaDCQUbKw0Gi+FpGAX/gEXbUWsFkRBXAgBFy6ybbxCNWAVosakJtGA2YiILgxNi9RacaeokNBz5jyeS1K1FgdeZjPz8Mx8b5vD4cCI2+0mHA4Tj8cZHh4mGo3S29tLR2cnzl0H2DSZQ56qs3NaYeChwtFHCof19N1X8NxW6Lpupa0FDAaDJJNJyuUylUqFdDrNyMgILlcXTt8AG8/l6LnR4HhO5WZVMLskyH4UXH0j6JuxYK7Uym9gJBKhUCigKArGqtXmGR8/hdy9xQQahttuNZh4KZj7qqEKjbqq8eyTMG3/AjqdThNYLBZRVdUEzi18YPTMJLJnB517j+C+UCBwr8GV14KlH5p5RtU0XiwLhh4rSOsZGsCW4fuFRU6evYi03ceGYAzvpRL7ZxpceytY/mkBFd3yuQ48thbYMiyVSquGNcPw9ARSj4f2PQeRz8+ye7rB5VeCxe9NwyZwaD3g4OAg+Xyeer1uWlarVcbGRpHlbmso+h96m384/80CrujAYtPwn6EEAgESiQSZTIZsNstUKkUsFmNza8o6cKs+5ROzKul5QeWLRvmzIPlOsO/BGqDdbkeSJPx+P/39/WYfQ6EQHo/+3PYOs4dGbeRUHd9dhUMZhXhWJfZEJax30nvnjx7abDb+HzsOs4dPcenFti6urAJaMeyM/ReXePswax1fPgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/83d44a534d3df35c85a7c5f94279c2316a12b94e-2400x1256.png?w=2400&h=1256&q=75&fit=max&auto=format)

As designers, we build prototypes for a lot of different purposes: Running user tests, presenting realistic plans to stakeholders, communicating intent to developers, the list goes on.

Because prototypes are so important across the design process, the experience of making them needs to be fast and easy. To help streamline and speed up your prototype creation workflow, I collected a few of my favorite tips and tricks for you. Read on!

## [1\. Use master components to speed up prototype connections](#_1-use-master-components-to-speed-up-prototype)

Let's say you're designing a screen with some sort of persistent navigation, like a tab bar. You have to link each menu item to a specific frame (like linking the 'home' button back to the home frame). If that menu is repeated across multiple screens, as tab bars often are, the tedious task of linking can take way longer than it should.

THERE'S A BETTER WAY. Early in your process, turn your hamburger menu into a component. Once you've done that, link each menu item of that master component to the appropriate frame. Moving forward, any time you create an instance of the hamburger component, all the connections will automatically propagate! No more beating your head against a wall with busy work.

One caveat: This doesn't work if you're dragging an instance of a component from a team library. Because the master component is located in a different file than yours, out of the gate, you won't be be able to leverage the previously mentioned tip.

Instead, create a new master component with the instance from your library inside it. Figma allows you to deep select down into the nested layers within each component, so you can still link multiple menu items from the instance without it detaching from the master. I often place some of these repeated components off to the side, outside my mockups, as a convenient place to access them and maintain the linked connections to different screens.

Link to Figma file

## [2\. Use components for scrolling content](#_2-use-components-for-scrolling-content)

When you're designing longer scrolling screens with fixed elements, such as status bars, headers or footers, you can simply drag the bottom of the frame down to accommodate the extra content. If the content exceeds the height of the viewport for the device you selected, Figma will automatically scroll the frame when in prototype mode. Handy, right?

But there are times when you want to see what's visible in the viewport by default (i.e. before the user scrolls). That gives you a sense of what content is initially cut off when users first navigate to that prototype frame. Devices with different viewport sizes will segment the content in different places. To make it easy to peruse these different views, use a component.

To see what content is initially visible in a scrollable frame:

1) Turn your scrolling content into a component.2) Make sure you've set up [constraints](https://help.figma.com/hc/en-us/article/54-constraints) for all of the elements inside.3) Ensure "clip content" is checked in the properties panel (this should be enabled by default).4) Flip to prototyping mode and enable the scrolling direction you want by configuring the "Overflow Behavior."5) Place an instance of this component within your designs and resize them to fit.

Now you can get an idea of what is in view for each device size and manage all of your scrolling content centrally with a single component.

Link to Figma file

## [3\. Timed delays and overlays to simulate interactions](#_3-timed-delays-and-overlays-to-simulate)

With prototypes, instant interactions can feel abrupt for the end user. You may want to add elements of realism, like simulating loading screens or adding a short delay.

One light-touch way you can use to do this is through the [after delay trigger](https://help.figma.com/hc/en-us/article/199-getting-started-with-prototyping#triggers), where an interaction takes place after a set duration. Timed delays are especially useful when paired with [overlays](https://help.figma.com/hc/en-us/article/203-prototyping-with-overlays), as you can see in the simple form example below.

Users expect the form to take them to a confirmation page, but if that happens too abruptly they may feel disoriented. By using overlays, with manual positioning and the swap overlay feature, we can create a simple button interaction in tandem with timed delays. The user then experiences a submit interaction, brief loading sequence and success message before the confirmation page appears.

Link to Figma file

## [4\. A table of contents](#_4-a-table-of-contents)

Prototypes in Figma are currently limited to single pages. This allows you to have separate prototypes in a single document, all with their own unique URLs that you can share with people when they want to view them. But sometimes, you just want to share one link to people that lets them see multiple design options.

To do this in Figma, create a table of contents frame as your prototype starting screen. Then, link each list item in the TOC to a different user flow. From the back-end Figma will interpret all of this as one prototype, but end users will experience them as different prototypes with a selection between them at the start. Note: All your user flows must be on the same page for this to work.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGBAf/xAAgEAABAwUAAwEAAAAAAAAAAAABAgMRAAQFEiEGFFEi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A7xb5nIv+TXuMexTjVi03s3eT+Vn5SWzsHlqR7XsJKX1EGY2Hyr1clsieRU1i8U0NtlqUEOlSZJPTUqwzxLKWrTVLbiBsTCj2itlu3o3GxPaKQr//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/55448c902b659cea64829073b29dfb8ab90fd91e-2450x1622.jpg?w=2450&h=1622&q=75&fit=max&auto=format)

Link to Figma file

## [5\. Using Observation Mode](#_5-using-observation-mode)

Do you know about [Observation Mode](https://www.figma.com/blog/figma-feature-highlight-observation-mode/) in Figma? It lets you follow along with another person's screen while they present something or riff. You can click your collaborator's avatar in the top right corner of the editor to see everything they're seeing in a design file.

Observation Mode ALSO works with prototypes. You can click your collaborator's avatar to know where they are in the prototype and what they're doing. This is great for remote user tests when you want to study how a user is interacting with your design. It's also a great way to get everyone to follow along when presenting your work in a meeting.

## [Get started with prototyping](#get-started-with-prototyping)

I hope some of these tips will help you accelerate your prototyping process. All of the examples in this post can be found in this [starter file](https://www.figma.com/file/QyrQupokvL94qokQVs1Fubyt/Prototyping-tips-and-tricks/duplicate). As always, feel free to share your tips, questions and and experiences in our [online community on Spectrum](https://spectrum.chat/figma).

If you are looking for more info on getting started with prototyping check out [Getting Started with Prototyping](https://help.figma.com/hc/en-us/article/199-getting-started-with-prototyping) in our Help Center.