---
title: "Drawing Raindrops with CSS Gradients and Masks"
source: "https://css-irl.info/drawing-raindrops-with-css-gradients-and-masks/"
publishedDate: "2023-11-18"
category: "css"
feedName: "CSS IRL"
---

![Blue raindrops on a light blue background](https://css-irl.info/rainy-gradient_900.webp)

If you live in the UK like I do, you can’t escape the fact that it’s been a wet few months. Since today had been yet another rainy day, I was inspired to see if I could create a rainy background with CSS.

I started of thinking I could get away with just using `background` properties. That enabled me to create the raindrop shape, but creating the highlights (which attempt to allude to reflections and refractions present in water droplets) was trickier. I decided to apply the raindrop shape as a mask, with the `mask-image` property. That mean the highlight (that I drew with `radial-gradient`) could bleed off the shape and wouldn’t be present in the background.

Using a mask meant I had to use a pseudo-element, as a mask on the `<body>` element won’t do anything. I’m using viewport units so that the raindrops will scale.

See the Pen [Rainy day gradient pattern (with viewport units)](https://codepen.io/michellebarker/pen/RwvQNgx) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

I made a few more tweaks, cleaned up the code a little (with custom properties) and added a second pseudo-element, so the raindrops are staggered, which I think looks a lot better.

Here’s the result!

See the Pen [Staggered rainy day gradient pattern](https://codepen.io/michellebarker/pen/MWLQwpJ) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).