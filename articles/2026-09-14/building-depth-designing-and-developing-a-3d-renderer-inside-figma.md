---
title: "Building Depth: Designing and Developing a 3D Renderer Inside Figma"
source: "https://tympanus.net/codrops/2026/09/13/building-depth-designing-and-developing-a-3d-renderer-inside-figma/"
publishedDate: "2026-09-13"
category: "design"
feedName: "Codrops"
author: "Aleksei Kipin"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-22-scaled.png.webp?x57826)](https://depth.fyi/ "Building Depth: Designing and Developing a 3D Renderer Inside Figma Demo")

I started Depth while designing a product website that depended heavily on 3D renders. Other tools covered parts of the workflow, but I couldn’t find a simple renderer that would accept arbitrary models.

The finished images came from a visualization team already handling requests from designers across the company. At the same time, I was reviewing the work with leadership every two weeks and changing the page between those reviews.

I had access to the 3D models, but testing an idea myself meant leaving Figma, preparing a scene in Blender or Cinema 4D, software I didn’t use fluently, exporting an image, and bringing it back.

I didn’t need final materials or production lighting at that stage. I needed enough form and light to judge whether the image worked on the page.

Depth was built for that part of the process: load a model, adjust the camera and lighting, place a render on the canvas, and continue designing from there.

Before working on the full interface, I built a narrow proof of concept around that workflow. It could load a model, move the camera, change the light, and return an image to Figma. I was mainly watching how responsive the scene remained inside the plugin window and how much 3D control could fit there without making the tool feel unfamiliar to someone who spends most of the day in Figma.

Once the MVP proved that I could achieve the performance and rendering quality I wanted inside Figma, I started working on the nice-to-have features and shaping the plugin’s overall experience.

Depth is split between two parts of the Figma plugin. Three.js handles the model, camera, materials, and lighting inside the plugin window, while a separate controller reads and updates the Figma document. When a user selects a frame, the controller sends it to the 3D scene as a PNG. Once the render is finished, it returns to Figma as a normal image layer. A 2x export doubles the PNG’s width and height while keeping the layer at its intended size on the canvas, producing a sharper image without changing the composition.

I kept Figma’s inspector pattern on the right and used camera, viewport, and timeline conventions similar to tools such as Cinema 4D and 3ds Max. Export is simple: choose a multiplier and place the image in your Figma project.

During camera movement, Depth temporarily reduces rendering, then restores fuller shadows and cleaner edges for the image placed in Figma.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Screenshot-2026-08-30-at-7.40.15-PM-1200x478.png.webp?x57826)

When a model uses transparent or translucent materials, Depth includes the scene background in the export so they retain convincing reflections and refractions.

## Creating the website

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-25-1200x900.png.webp?x57826)

For the website, I wanted visitors to experience what Depth does. I structured it around the order in which a render takes shape: the visitor meets a bare form, changes its material and environment, then reaches a catalogue of final renders. The site begins almost completely dark and introduces information one layer at a time. The same object remains visible as those variables change, making the effect of each decision easier to read.

## The Opening Scene

I wanted the opening to feel cinematic while still giving visitors some control over the scene. It introduces the visual language of the site before the Form, Material and Environment chapters begin, so its image quality carried more weight than anywhere else on the page.

My first attempt used a live 3D model. It was the most direct extension of Depth: generate a form, bring it into the browser, and let the visitor manipulate it. I tried different textures and HDRIs, but the materials and lighting never reached the visual quality I wanted for the opening. The scene behaved correctly, yet it still looked like an interactive 3D experiment rather than the image I had in mind.

I stopped trying to render the entire hero live. I generated two frames and used Seedance 2.0 to create a 360 degree turn between them. That motion became a 240 frame sequence controlled by the horizontal position of the mouse pointer, so moving across the page turns the island directly instead of starting a fixed video. I could now control the composition, surface detail and atmosphere of the central image frame by frame while preserving a simple physical response.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-27-847x900.png?x57826)

The finished hero still uses real time 3D around the sequence. Those layers supply depth and immediate movement, while the island keeps the image quality I could not get from the first fully live version. The handwritten DEPTH title sits inside the same composition. Together, they create the impression of one 3D scene, even though the central image is controlled media.

The hybrid approach comes with a media cost, so the first frame cannot depend on the full sequence being ready. The page paints a poster first, keeps separate landscape and portrait media, and starts the heavier parts later.

## Form and Material

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Screenshot-2026-08-30-at-7.57.45-PM-1200x601.png.webp?x57826)

The same form stays in place as the page moves from Form into Material. When users apply different materials to the object, the new surface takes almost 2 seconds to travel across the object, which

The control responds immediately; only the surface takes time. The transition runs inside one opaque Three.js material, blending colour, roughness, metallic response, surface detail, and reflections before the object is lit. Three.js still treats it as one solid object, so its edges and depth remain stable while the visitor rotates it. If someone changes their mind halfway through, choosing the starting material sends the sweep back from its current position. Choosing a third option clears the active change quickly, then begins the latest selection.

## Environment

The next chapter opens the scene up. The object is still there, now with its chosen surface, and the visitor can turn the environment around it. I wanted the reflections of a photographic world without placing that photograph behind the object, where clouds, snow, and a horizon would crowd the black space and make the page look like a conventional 3D viewport.

I split the job in two. An HDRI, a panoramic image wrapped around a 3D scene to supply light and reflections, remains invisible. The mountain the visitor actually sees is a separate layer, sampled from real terrain and drawn as a sparse field of points. Its ridges and changes in height come from the model, but the dotted texture keeps it in the same visual language as the rest of the site.

## Render

For the final section, I wanted to show how a render from Depth could move into a real design workflow. After adjusting the scene, the visitor places the object inside a fictional store of abstract figures, turning an isolated render into part of a finished website.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-28-1200x900.png.webp?x57826)

In the catalogue, each figure is presented as a combination of form, material, and light, the same decisions the visitor has just explored.

You can explore the website at [depth.fyi](https://depth.fyi/) and [open Depth in Figma](https://www.figma.com/community/plugin/1543753936265776885/depth).