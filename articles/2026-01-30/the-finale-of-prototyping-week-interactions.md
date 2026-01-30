---
title: "The finale of Prototyping Week: Interactions"
source: "https://www.figma.com/blog/the-finale-of-prototyping-week-interactions/"
publishedDate: "2018-08-23"
category: "design"
feedName: "Figma Blog"
---

I worked on many of these updates during my summer engineering internship here at Figma, so I’ve enjoyed reading all your reactions (and predictions about what’s coming next). Before I head back to school, I have one last feature to leave you with: Interactions.

With Interactions, you can now add hover and pressed states to buttons as well as imitate long presses and dropdown menus. This should make your prototypes feel more realistic since elements will behave how they would in production. As always, the Figma community helped guide the form and priorities of our product, and we’re grateful to the teams who spent time working with us in the user research phase.

Read on for more details on Interactions, and a quick recap of everything we shipped this week!

## [Interactions](#interactions)

People interact with applications in a wide range of ways. They hover over buttons to view tooltips or press elements to see additional functionality, and they expect applications to respond automatically.

For a prototype to feel real, the buttons and elements inside it also need to respond to the user’s input in these predictable ways. Through our new Interactions feature, you can create these rich experiences for more accurate user testing.

**Here’s the full list of Interactions now available to you in Figma:**

1.  On Click
2.  While Hovering
3.  While Pressing
4.  Mouse Enter
5.  Mouse Leave
6.  Mouse Down
7.  Mouse Up
8.  After Delay

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsSAAALEgHS3X78AAABH0lEQVQoz2P4SgFgoL7mbyDiy9cvIARkf/tGtOYvX79++vz5w6dPQPTx82egCVDTiNH8/O37kzcfbD9/c8eF2zsv3d1/7f6Vxy/effxESPM3kFvP3bhdPWu5f1W3d3mnZ1lHaP2EyWu333/yHNPx6DZ/+fLlwJFjQQmp0jrGwio6vPJqsnqm+VV1127e+oahG4vm/fv3+/n5iYqK8vLysrOzi4uLZ2dnX716lVjN/v7+YmJifHx8HBwcIM05OSRr5uHhYWNjI83mQ4cORUREKCkpSUlJAXWqq6uXlpZev36dKM1ASyZNmlRQUAC0MCsrq7i4eMmSJY8ePSKsGQjevn179+5doBFXrly5fPkykPHw4cOPHz+SkLa/oQLqZwwA5lL8dyo1oygAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/6aa98fbc19e16f659c0490b6dfb148444b8c5ae6-800x600.png?w=804&h=603&q=75&fit=max&auto=format)

There are three Interactions we think you’ll find most useful: “On Click”, “While Hovering” and “While Pressing.” These allow you to show hover states of buttons or communicate the pressed state of a list item. For example, if someone hovers over a menu item in your prototype, you can change the item’s background color.

Four of our new Interactions offer more advanced functionality: “Mouse Enter,” “Mouse Leave,” “Mouse Down” and “Mouse Up.” They give you more granular control about how the application responds to detailed behavior from the user. For example, if you use “Mouse Enter” on a button to show a dropdown menu, the menu will automatically stay open until the user performs a different interaction.

> When you have a device frame selected, some interactions will appear as On Tap, Touch Down and Touch Up.

### [After Delay](#after-delay)

We’ve also included the “After Delay” Interaction, which causes transitions to occur automatically after a specified amount of time. Use it to mimic things like notifications and auto-redirected pages.

You can only set an “After Delay” transition from one screen to another. After all, an “After Delay” transition isn’t tied to any specific sublayer of the frame.

All this can be a bit abstract, until you play with it. Go check out Interactions yourself in the tool (you’ll find it in the prototype section of the right hand sidebar). To learn more about how to use them, visit our [Help Center](https://help.figma.com/hc/en-us/prototyping/prototyping).

Interactions are the final surprise we have for you in Prototyping Week. For those who don’t follow our Twitter account, here’s the rundown of everything else we shipped this week.

## [Monday: Landscape Device Frames](#monday-landscape-device-frames)

We released [Figma 3.0](https://blog.figma.com/figma-3-0-217d6c248f85) two months ago and added device frames around designs in presentation view. Now you can set device frames around screens that are meant to be viewed sideways.

## [Tuesday: Clickable URLS](#tuesday-clickable-urls)

To integrate Figma designs more with other content, we introduced Clickable URLs, which let you link a prototype frame to an external web link or another Figma file. For example, you could link to a personal website at the end of a presentation deck and send viewers directly to your portfolio when they click the link.

## [Wednesday: Back Transitions](#wednesday-back-transitions)

Back Transitions act exactly the way they’re named. Sometimes, you’ll want users of your prototype to be able to return to the previous screen — for instance, you may be designing a confirmation menu. And, if the screen can be accessed from several different locations, Back Transitions allow you to keep track of where the user started without duplicating the screen and transition for each initial location.

One thing to note: If you navigate to the current frame with an animated transition, pressing the back button will play that animation in reverse. The gif above shows this in action.

## [What’s next?](#what-s-next)

The team is hard at work developing additional features. We’ve heard a lot from the community about Overlays — let us know what else you’d like to see from our prototyping tool set on [Spectrum](https://spectrum.chat/figma)!