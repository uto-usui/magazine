---
title: "A Fun CSS Text Effect"
source: "https://css-irl.info/a-fun-css-text-effect/"
publishedDate: "2023-11-19"
category: "css"
feedName: "CSS IRL"
---

Today’s post is a quick one, but (hopefully!) a fun one! It’s a demo featuring a fun text effect, using `background-clip: text` and `text-stroke`. It’s not a new technique, but worth remembering.

It looks like the text has been clipped out of the black translucent background, but in fact the `<h1>` just has the same background as the body. I’m making sure they line up with each other by setting the `background-position` to `center`.

See the Pen [Background text fill](https://codepen.io/michellebarker/pen/MWLQomX) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

It’s interesting to see how browsers handle the different properties. `-webkit-text-stroke` (it has to be prefixed to work cross-browser) seems to render unevenly in Firefox with this particular font. I also think it looks pretty cool without the text stroke.

The other trick here is using the `filter` property to create the shadow. The text colour has to be set to `transparent` in order to see the background “through” the text, so `text-shadow` doesn’t work as it hides the text. I’m also using some of these techniques for the hero text effect on my [personal site](https://michellebarker.co.uk/).