---
title: "Exploring 3D Image Rotations on Scroll"
source: "https://tympanus.net/codrops/2026/06/18/exploring-3d-image-rotations-on-scroll/"
publishedDate: "2026-06-18"
category: "design"
feedName: "Codrops"
author: "Manoela Ilic"
---

Some ideas for animating images in 3D while scrolling.

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/RotatingOnScrolAnimation_featured.png.webp?x13474)](https://tympanus.net/Development/RotatingOnScrollAnimations/ "Exploring 3D Image Rotations on Scroll Demo")

Some days ago I stumbled upon [this beautiful animation](https://www.instagram.com/p/DT-snsfDakn/?img_index=1) by [Jason Booth](https://www.instagram.com/jason_booth_/?e=da2adb63-7fd9-4f96-a428-54fed06f6a62&g=5).

I really liked how the images rotate as they move through the viewport, and it got me thinking about how many different variations could be built from the same core idea. These demos are the result of that exploration.

## The Concept

The main idea behind these effects is to arrange the images along a wave-like path and animate their transforms based on scroll progress. As each image enters and leaves the viewport, it rotates through 3D space while also moving along the z-axis, creating different depth and orientation changes throughout the interaction.

The animations are driven by GSAP’s ScrollTrigger, with Lenis providing smooth scrolling. From there, everything comes down to how the transforms are calculated and mapped to the scroll progress.

## Variations

Once the basic setup is in place, there are lots of directions you can take it. Different easing curves, interpolation functions, rotation ranges, depth mapping, scaling, and CSS filters all produce very different results while relying on the same underlying structure. Some demos exaggerate the 3D motion, others emphasize depth or use blur and brightness to reinforce the illusion of movement.

Variation 1: A simple combination of 3D rotation and depth, with images following a wave-like layout as they move through the viewport.

Variation 2: Increased rotation angles and stronger depth movement create a more pronounced 3D effect while preserving the same scroll-driven structure.

Variation 3: A non-linear rotation combined with depth, vertical movement, and color adjustments creates a more dynamic transition through the viewport with depth.

Variation 4: Scroll velocity is used to introduce motion blur and saturation changes, making the animation react to how quickly the page is scrolled.  

Variation 5: Scale, blur, brightness, and a held midpoint are combined with 3D transforms to create a more stylized transition.

These examples are meant as a starting point, so feel free to tweak the maths, combine ideas from different demos, and see what kinds of interactions you can come up with.

![](https://secure.gravatar.com/avatar/d8198e594845ff1b6d8961590d2c9ab11e4a6d0e22db58ca44826e3527e18d23?s=160&d=retro&r=g)

### [Manoela Ilic](https://tympanus.net/codrops/author/crnacura/)

Editor-in-Chief at Codrops. Designer, developer, and dreamer — sharing web inspiration with millions since 2009. Bringing together 20+ years of code, creativity, and community.

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Adrien_Vanderpotte_3423-1-copie-2-160x160.jpg?x13474)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/czYiOaMh_400x400-160x160.jpg?x13474)

![](https://secure.gravatar.com/avatar/c05ec8c4a1421cac11613d4bd233dc469791b790a1119e83bed9492b226f3784?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/DSC_0112-awwwards-160x160.jpg?x13474)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/CorentinBernadou_Profile-160x160.jpg?x13474)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/IMG_0891-160x160.jpg?x13474)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/09/celia-160x160.jpeg?x13474)

![](https://secure.gravatar.com/avatar/9d360a8984abc54d8eedfca50873d7cca9d496a59378a0371d3f8ea103a3feb1?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/profile-160x160.jpg?x13474)

![](https://secure.gravatar.com/avatar/38c09524b21fd8d80cb1440c8132212f38ec882b078239b83a121b55d12e49c2?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/2312d29cfd3a049ca9a21acce720d8d4b77ab2d002e59cb3cf8abd293019fd4c?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/5fcada51aa5e188ba78900105d1e58d88f977c45b87ae90fea631e84eaf0680f?s=160&d=retro&r=g)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Logo-San-Rita-160x160.jpg?x13474)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/lemma-logo-160x160.png?x13474)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/b2sBj1rG_400x400-160x160.jpg?x13474)

![](https://secure.gravatar.com/avatar/14d845d8c2c0e1f2ab1107b82c4b9d8a71c4165cb5a44be9b33fa6f1126a03f1?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/logo-160x160.png?x13474)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/exoape-160x160.jpg?x13474)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.