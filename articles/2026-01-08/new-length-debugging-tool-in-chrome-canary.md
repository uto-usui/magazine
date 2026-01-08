---
title: "New Length Debugging Tool in Chrome Canary"
source: "https://css-irl.info/new-length-debugging-tool-in-chrome-canary/"
publishedDate: "2021-08-24"
category: "css"
feedName: "CSS IRL"
---

A few weeks ago I blogged about [inspecting sizes](https://css-irl.info/inspecting-sizes/) in the browser dev tools, lamenting the lack of a way to toggle between different unit types for length values:

> Currently, inspecting a colour value in Firefox or Chrome allows you to toggle between RGB, HSL and hex values by holding down the shift key on click. It would be great to see a similar thing for size values too. Being able to toggle between pixels, ems and rems (or even percentages) in the browser would be so useful!

Well, it looks like the browser gods have answered my prayers! [Adam Argyle](https://twitter.com/argyleink) on the Google Chrome team just shared this brand new feature that’s landed in Chrome Canary.

> 🆕 <length> Tool  
> in Chrome Canary today:
> 
> ✅ drag px, rem, em, vh, etc  
> ✅ hold shift to adjust by 10  
> ✅ hold alt/opt to adjust by .1  
> ✅ change/explore unit types in a dropdown
> 
> \*much like design tools\* 😎
> 
> \[video alt\]  
> drag to adjust padding, gaps and widths! [pic.twitter.com/afthDT9l0Z](https://t.co/afthDT9l0Z)
> 
> — Adam Argyle (@argyleink) [August 23, 2021](https://twitter.com/argyleink/status/1429869198197415939?ref_src=twsrc%5Etfw)

It looks super useful, and seems to work pretty well as far as I can see! It even allows you to toggle units you wouldn’t wouldn’t normally expect to use in CSS, like centimetres and millimetres (which are valid units, so I guess someone, somewhere is using them!). My only criticism is that (as with many other features in dev tools) the way to adjust by steps of 10 or 0.1 not _that_ intuitive — without the tweet I wouldn’t even know. I also can’t be the only one who finds it a little fiddly to click and drag on the tiny area of the property value to scale it up or down. (You can just type the value you want though, or use the arrow keys to adjust.)

The unit switcher doesn’t currently appear to be keyboard accessible — but right now it’s effectively in beta, we’ll likely see some improvements by the time it makes its way into regular Chrome.

Adam [also asks](https://twitter.com/argyleink/status/1429869254371790878?s=20):

> What should happen when you change the unit?
> 
> 1.  just the unit changes (current)
> 2.  convert the length so it stays the same length but uses the new unit

From my perspective, option 2 is better for many of the situations where I’d use this, such as when a designer gives me a length in pixels and I quickly need to convert it to rems.

In summary, this is a great new feature to have in the browser and, while not yet perfect, pretty much does exactly what I’d hoped for!