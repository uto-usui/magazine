---
title: "Blender to Three.js and Back: 10 Tips for a Better Workflow"
source: "https://tympanus.net/codrops/2026/08/24/blender-to-three-js-and-back-10-tips-for-a-better-workflow/"
publishedDate: "2026-08-24"
category: "design"
feedName: "Codrops"
author: "Andrew Woan"
---

A practical collection of tips for combining AI, Blender, and Blender MCP to streamline your Three.js workflow.

[blender](https://tympanus.net/codrops/tag/blender/) [mcp](https://tympanus.net/codrops/tag/mcp/) [Three.js](https://tympanus.net/codrops/tag/three-js/)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/og-image-1.png.webp?x57826)

_**Editor’s note:** As part of our little Three.js conference celebration, we’re happy to have Andrew Woan sharing some great tips and insights with us today. In this article, Andrew takes a look at how AI, Blender, and Blender MCP can be used together to speed up and improve different parts of a Blender-to-Three.js workflow, with practical ideas you can adapt to your own projects._ _**Andrew has also created a fantastic demo as his contribution to the celebration, giving you another opportunity to explore his work. You can [check out the demo here](https://codrops-demo-for-threejs-conference-ten.vercel.app/) and [find the source code here](https://github.com/andrewwoan/codrops-demo-for-threejs-conference).**_

**🇫🇷 Ready for some Plinko & Pinball in Paris?** Codrops readers can use the code `CODROPS` to get **15% off** on tickets. **[Get a ticket](https://threejs.paris/tickets) →**

## Before we get started

In a few prompts with AI + Blender MCP, you should be able to recreate the following tips pretty quickly and fit them to your own project/structure a lot better than using a template online! A few of these tips have been around for ages, but they’re worth repeating because they’re now so fast to create. For those who are completely new to a Blender-to-Three.js workflow/pipeline, I’d consider prompting an AI for a list of tips and tricks first.

## 1\. You can create a Blender Addon + coding system that instantly updates every time you export

You can see a case study by [Merci-Michel](https://mercimichel.medium.com/coastal-world-8f23b945823b) in which they use a special export tab in Blender that auto-refreshes in Three.js.

## 2\. You can sync basic rotation/scale/move operations between three.js and Blender

Feel free to make your adjustments in Blender or Three.js! They can be synced between the two.

## 3\. Geoscatter instances work with Blender MCP

The [Geoscatter addon](https://www.geoscatter.com/) for Blender can “work” with three.js through the Blender MCP. If you ask your AI agent to create instances based on the Geoscatter addon, it’ll work! It also works with regular scatter methods, like the [Scatter on Surface](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/scatter_on_surface.html) Geometry Nodes modifier in Blender 5.0+.

## 4\. Use Blender empties and dummy objects for a lot of stuff

Blender empties and dummy objects are really helpful and can be used in a lot of situations:

-   Spawn points for lights, characters, etc.
-   Target points for lights/objects to lookAt
-   Simplified colliders
-   Pivot points

Using an empty allows the LLM to copy key position/rotation/location information if you need to recreate or use it in your coding project.

## 5\. You can create a Blender Addon that calls other addons

You can create your own custom Blender Addon that calls other Blender addons you’ve created or paid for. This allows you to combine workflows between paid Blender Addons.

## 6\. Combine multiple steps with vibe-coded Addons

I recently created an addon (still in development) called “One Shot Baking” that will do all of the following in one click (after setting a few parameters):

1.  Add a second UV map for baking on all objects
2.  Unwrap all objects per selected collection on to a single image texture
3.  Pack it, either with Blender’s packing system or calls my UVpackmaster3 Addon
4.  Bake it
5.  Denoise the baked image with Blender compositor
6.  Optimize the Image texture
7.  Duplicate the original mesh and hook it up to the new baked texture
8.  Hide the original mesh

You can see a demo of this [addon here](https://youtu.be/g80mQtoB05s?t=334).

Python scripting with Blender is so OP!!! If what you’re doing works in the scripting tab, then it’ll work as an addon too!

## 7\. Converting Geometry Node setups into Three.js code works decently well

Having the LLM with Blender MCP analyze your Geometry Nodes setup and convert it into a three.js experience is pretty common! It works decently well with a lot of Geometry Nodes setups, surprisingly. For more complicated setups, though, you still need a person who knows what they’re doing.

## 8\. Run common dev tools and command line tools directly from Blender

GLTFJSX/KTX2/ImageMagick/gltf-transform, etc. are all common command line tools, and they’re often recreated for convenience in the browser. However, you can actually just create an addon in Blender that runs these things for you behind the scenes. That way you get the power of your computer and the easiness of having a one-stop shop for everything, rather than uploading to a browser and redownloading. You also don’t have to prompt the AI every time to compress/optimize/convert/etc. for you. Save those tokens and water usage!

## 9\. Upgrade to Blender 5.2+ LTS for the Meshopt compression option

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-1.png.webp?x57826)

## 10\. Now with Three.js Shading Language (TSL), converting Blender shader nodes is a lot easier

If you haven’t heard yet, TSL is becoming the new standard way of writing custom shaders with three.js. The core maintainers specifically created it to make writing shaders easier and to have a way to compile down to both GLSL (the older web standard for web graphics) and WGSL, the newer upcoming standard.

Of course, for those more advanced, they always have the option to write their own low-level code, but for those who don’t, definitely check out TSL. It has a lot of similarities to Blender nodes! None of the nodes are one-to-one, but it’s close and easier to understand than raw GLSL or WGSL code for 3D artists, in my opinion. And yea, it’s not just Blender! If you’re familiar with shader/material nodes from things like cables.gl or Unity/Unreal, that knowledge definitely can be transferred over too!

![](https://secure.gravatar.com/avatar/d2c8f3a952a5384318b8d6893b98a49e7fff0c4f296df7db445cd9fb053990fa?s=160&d=retro&r=g)

### [Andrew Woan](https://tympanus.net/codrops/author/andrewwoan/)

Heyo! 👋 I'm a freelancer that likes to put 3D worlds from 3D software into the web browser for everyone to visit! I also do research on mental health technology, primarily how to use websites to promote emotional growth and self-awareness development. If you're into digital mental health interventions or want your own 3D world in the browser, definitely reach out! I'd love to chat!

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://secure.gravatar.com/avatar/673ba8ea1ee1d87231a6f5869cc73e976167d7c00a1165eabd9ba81a02854abb?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/czYiOaMh_400x400-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/c05ec8c4a1421cac11613d4bd233dc469791b790a1119e83bed9492b226f3784?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/02/IMG_3840-scaled-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/6f4def39f0c4360f11ad0aa4de30e35200ae1c5f1365f7c7249837ba3ad7f0f7?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/db-social-pf-160x160.jpg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/enrico-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/f20df6ee31ee4136a63ba09430e79accd1f1c0c6d82fb0505a67e93064974b01?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/07/photo-profil-160x160.png?x57826)

![](https://secure.gravatar.com/avatar/5fcada51aa5e188ba78900105d1e58d88f977c45b87ae90fea631e84eaf0680f?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/38c09524b21fd8d80cb1440c8132212f38ec882b078239b83a121b55d12e49c2?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/maria-160x160.jpeg?x57826)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Logo_Wordmark_Avatar-160x160.jpg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/bonhomme-160x160.jpeg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/lemma-logo-160x160.png?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/logo-160x160.png?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/Malvah_Logo-160x160.png?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2023/04/avatar-circle-1-160x160.png?x57826)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.