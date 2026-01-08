---
title: "Learning About CSS 3D Transforms and Perspective"
source: "https://css-irl.info/learning-about-css-3d-transforms/"
publishedDate: "2020-09-15"
category: "css"
feedName: "CSS IRL"
---

3D transforms, despite being available in CSS for a while, are one area I’ve never understood well. I think if they were new to CSS now, I’d spend a lot more time playing around with them, like I have with Motion Path and some other new CSS features. As things stand, I’ve never had much cause to use them in production (with the odd exception), so I’ve concentrated my time and energy on other things.

But recent work by talented folks on Codepen had me wishing I had a better grasp of this powerful area of CSS. I fell in love [this demo by Adam Kuhn](https://codepen.io/cobra_winfrey/full/mdJWzXQ), which combines 3D transforms with Motion Path – I can see lots more potential for using these together. [Ana Tudor](https://twitter.com/anatudor) built an [entire series of Johnson Solids](https://codepen.io/thebabydino/pen/BevRMj), which get progressively more complex. She has an impressive body of work coding polyhedra, which can be found in [this collection](https://codepen.io/collection/eErLu). Not to mention this quite simply mind-blowing demo my [Amit Sheen](https://twitter.com/amit_sheen), where pages of a book are actually animated with 3D transforms:

I figured it was time to learn! I came across this [well-written article](https://css-tricks.com/how-css-perspective-works/), also by Amit Sheen, explaining 3D transforms and perspective. The interactive examples, coupled with a step-by-step walk-through creating an animated cube, really helped things click. I’m looking forward to building a lot more with 3D transforms in the future, and feeling much more confident about it!

To try out my newfound knowledge, I made a little CSS animation inspired by a GIF I saw online. It uses a single `<div>`, with multiple repeating background gradients, 3D transforms and animated `background-position`. (You can’t animate gradients with CSS alone, but you _can_ animate `background-position`).

I’ve also made a couple of demos showing how several elements’ transforms are altered by changing the `transform-style` and `perspective-origin` properties of the parent – something that took me a while to get my head around:

I still feel I have a lot to learn, but the only way is through practice!

## Inspiration

Some more inspiring demos from talented folks:

-   **[Climbing up the stairs](https://codepen.io/amit_sheen/pen/vYGdBNo)** – yet another incredible demo from Amit Sheen, where the text animates up a flight of stairs
-   **[CSS 3D Transforms and animations](https://codepen.io/collection/AaPGwd)** – this collection by [Pete Barr](https://twitter.com/petebarr) has just too many amazing examples to pick just one...but if I have to choose, I’m rather partial to [this one](https://codepen.io/petebarr/pen/MWKgmYW), which responds to scroll
-   **[CSS 3D Animated Toaster](https://codepen.io/jh3y/pen/KKVjLrx)** – this cute little toaster animation is, like everything [Jhey](https://twitter.com/jh3yy) does, an absolute delight!
-   **[3D CSS](https://codepen.io/collection/c7ee87c195ce7c6b5d8608803ac1bab0)** – some more spectacular 3D magic from [Adam Kuhn](https://twitter.com/cobra_winfrey), whose continuously high-quality creative output is unrivalled