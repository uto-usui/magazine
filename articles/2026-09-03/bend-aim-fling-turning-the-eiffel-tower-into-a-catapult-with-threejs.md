---
title: "Bend, Aim, Fling: Turning the Eiffel Tower into a Catapult with Three.js"
source: "https://tympanus.net/codrops/2026/09/01/bend-aim-fling-turning-the-eiffel-tower-into-a-catapult-with-three-js/"
publishedDate: "2026-09-01"
category: "design"
feedName: "Codrops"
author: "Yuri Artiukh"
---

A playful Three.js experiment that turns the Eiffel Tower into a catapult, combining interactive physics with real-world 3D data from Cesium ion to launch yourself across Paris toward the Three.js conference.

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/EiffelTowerCataputl_cover.png.webp?x57826)](https://tympanus.net/Development/EiffelCatapult/ "Bend, Aim, Fling: Turning the Eiffel Tower into a Catapult with Three.js Demo")

_**Editor’s note:** Another addition to our Three.js party marathon, celebrating the first Three.js conference coming to Paris this September 🎉 This time, Yuri has cooked up a very fun interactive demo where you can literally catapult yourself from the Eiffel Tower all the way to Maison de la Chimie, the iconic venue for the conference._

**We’d also like to thank [Cesium ion](https://ion.cesium.com/) for supporting this experiment and helping us make it available throughout the conference celebration.**

## The Concept

The idea is simple: **bend the Eiffel Tower, aim, and fling yourself across Paris**.

The catapult is built as an interactive Three.js scene, with the tower acting as a springy, deformable launcher. Dragging it changes its shape and builds up energy for the launch; release sends the ball flying in the direction you’ve aimed. You can fling yourself pretty much anywhere across Paris — but the real challenge is getting your trajectory just right and landing at the conference venue. From there, the demo takes care of the trajectory, collisions and landing, with the whole thing wrapped up as a playful physics experiment.

But the Eiffel Tower and Maison de la Chimie aren’t just floating in a hand-built scene. The Paris around them comes from [Cesium ion](https://ion.cesium.com/), which provides access to streamed 3D geospatial content and Google’s Photorealistic 3D Tiles. That gives the experiment a real-world geographic context while still letting Three.js handle the interactive experience, animation and physics on top.

So underneath the slightly ridiculous premise, there’s a nice mix of **interactive deformation, physics, real-world 3D data and web-based rendering**, all coming together to turn a trip across Paris into a rather unconventional way of getting to the conference.

**🇫🇷 Ready to fling yourself to Paris?** The very first Three.js conference is almost here! If you’re still deciding whether to make the trip, consider this your launch signal. Use code `CODROPS` for **15% off** your ticket and **[launch yourself to the conference →](https://threejs.paris/tickets)**

## How it works

### Physics

If you follow Three.js news closely, you’ve probably heard of an amazing library called [Wiggle](https://wiggle.three.tools/) made by [Xavier](https://x.com/KMkota0). The idea behind it is that we can add bones to any object. But not just to bake some boring animations. We can then apply spring physics to make it wiggle, wobble, and bounce in an interactive way. And oh my, how much fun is that! Just look at it and go ahead and try it yourself.

Now, of course, we can use this technique on any object, so I decided to try rigging the Eiffel Tower model. My first attempt, in my opinion, exceeded all my expectations, and I still think this is the one that should have gone into production. Just look at this cutie!

Jokes aside, you can see the number of bones and basically how it works here.

### Paris

On the other hand, the organizer of the upcoming Three.js conference, David Ronai, recently posted a new repo featuring [cinematic zoom](https://github.com/Makio64/threejs-cinematic-world-zoom), based on [Garret Johnson’s](https://x.com/garrettkjohnson) 3D Tiles and the amazing [CesiumJS](https://x.com/CesiumJS). So I just couldn’t pass up this coincidence. Now the tower should bend in the real-world Paris!

It’s actually as easy as adding a 3D model. I just needed to collapse the original scanned version of the 3D tower, and voilà, we have a spring-based Eiffel Tower right in the real city. (By the way, we can still see the original tower collapsed on the ground.)

The rest is easy. I added a ball to the tip, added a physics engine, and now you can literally [throw yourself into the conference location](https://tympanus.net/Development/EiffelCatapult/)! Hope you’ll have fun doing that 😀

And I hope to see you in Paris! <3

![](https://secure.gravatar.com/avatar/faad79e9b52a0014d44888d65160c7b61980a656c5bb95ecd7e83d96e4e43d14?s=160&d=retro&r=g)

### [Yuri Artiukh](https://tympanus.net/codrops/author/akella/)

Yuriy is a developer from Kyiv, Ukraine. Leading a small frontend agency [riverco.de](http://riverco.de/), also speaking at conferences, and open for freelance projects. Curious about CSS and shaders. Loves to learn every day.

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://secure.gravatar.com/avatar/d31c3faca6a76c53bb492455cb65cdcf23b59309157fbaa0f657ecb2b1e1d24d?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/DSC_0112-awwwards-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/0840447446f9c4dacd7171391e4e1634475d723bc557b93d746cd56b95ab3b43?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Adrien_Vanderpotte_3423-1-copie-2-160x160.jpg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/photo-square-400x400-1-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/f1b0cc5150146515b715a7ee44b8d15b84ae1eb088fcc44d8a7130ae1c0a8d95?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/andres-160x160.jpeg?x57826)

![](https://secure.gravatar.com/avatar/9d360a8984abc54d8eedfca50873d7cca9d496a59378a0371d3f8ea103a3feb1?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/huy-160x160.jpeg?x57826)

![](https://secure.gravatar.com/avatar/5fcada51aa5e188ba78900105d1e58d88f977c45b87ae90fea631e84eaf0680f?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/2e189e28555b71adbaad5137cd62e1e333be596f3a4f89ec14d2c60e736049ba?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/db-social-pf-160x160.jpg?x57826)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/makemepulse_logo-160x160.jpeg?x57826)

![](https://secure.gravatar.com/avatar/23a6300fe4080c3fbc7d7e6deaa885b96c829a6358c86db198f200f5cb676090?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/3c7e247b86783a78cc69bde393a2e6cc6c6623bf2b5229d4fc46a44268d2e6c5?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/Malvah_Logo-160x160.png?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/offbrand-160x160.jpg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/b2sBj1rG_400x400-160x160.jpg?x57826)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.