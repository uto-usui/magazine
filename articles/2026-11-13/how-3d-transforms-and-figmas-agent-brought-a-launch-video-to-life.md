---
title: "How 3D transforms and Figma’s agent brought a launch video to life"
source: "https://www.figma.com/blog/how-3d-transforms-and-figmas-agent-brought-a-launch-video-to-life/"
publishedDate: "2026-11-12"
category: "design"
feedName: "Figma Blog"
---

Earlier this year, [we announced new expressive functionality in Figma](https://www.figma.com/blog/config-2026-recap/)

: Figma Motion, generative plugins and shaders powered by the Figma agent, and 3D transforms. Today, 3D transforms are available in open beta, helping you bring more depth and perspective to your designs, along with a new way to work with familiar materials.

Use the 3D transform effect to tilt, rotate, and arrange text, images, vectors, and frames in space. Add the perspective effect to a parent frame, and those elements become part of a shared spatial composition. The effects are non-destructive: The original artwork remains editable underneath, while text and fills render with the transformed layer. Like any effect in Figma, you can combine 3D transforms with other effects like shaders, animate them with Figma Motion, or explore with the agent to take your work in new directions.

Having these materials on the canvas changes not just what teams can make, but how they work together. For the Figma Brand Studio team, these tools help us explore spatial layouts in new ways, save time by automating tedious tasks, and build on each other’s ideas from the design phase all the way through to animation. Our team put these effects to work on a fitting project: the launch video for 3D transforms. Here’s what we made, and how our explorations on the canvas shaped the result.

## [From storyboard to ship](#from-storyboard-to-ship)

###### Using 3D transforms

Apply the 3D transform and perspective effects to vectors, images, frames, components, and text. Hide or remove the effects at any time.

For the 3D transforms launch video, the team’s brief was simple: push the feature as far as we could, to the edges of what’s possible in Figma. We began scoping the video through exploration, testing how brand elements relate to one another in static spaces and in motion, making layouts feel more playful, immersive, or dimensional. A typographic composition can turn toward the viewer. A set of images can rotate in a carousel. An illustration can take on dimension while its vectors remain editable.

These are a few of the use cases we landed on for the launch video.

### [Turning typography into spatial compositions](#turning-typography-into-spatial-compositions)

Deanna Gueli, a brand designer on our team, started experimenting with typography arranged along different axes in 3D space. Her exploration began with a simple black-and-white study: one word, repeated and staggered in space. She worked out an initial placement, then asked the Figma agent to repeat it at intervals along the Z axis. Asking the agent to do the heavy lifting let her explore the spacing without manually calculating every position. “There was a tango back and forth: The agent did math, and I did the creative stuff,” she says.

> There was a tango back and forth: The agent did math, and I did the creative stuff.

Deanna Gueli, Brand Designer, Figma

To push the sense of depth further, Deanna built geometry, placed the typography on its surfaces, and rotated the whole object in 3D space. She used the Figma agent to help construct the geometry, placing the type animation onto a rectangular tube and turning that form into a component.

Duplicating the component let her quickly test a larger composition: How many tubes should fill the frame? How far apart should they sit? What happens when the whole arrangement rotates? Being able to quickly iterate on the 3D forms and compare compositions side by side on the canvas helped Deanna see which directions were working, and which weren’t. She discovered how rotating the forms could reveal the full depth of the design, showing relationships that a single static view couldn’t capture.

![“Form → Space → Depth → Light → Motion → Perspective” shown as flat text and on an angled yellow 3D strip with a pink top.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABbUlEQVQokZWTW5LbIBBFtf91yTO2ZVuWxBu6UVZyppA0jySTpPJx6kLDbZou6FQVEaXpxtfxv/jJJ5t2pQg5ZXJO5JwpOW3k0mKZcugn6Qv501cyIkIXY8QagzEz1h6YBecWnN2xjfd1M2GWJ8ZMe9zuhOC3pF1OCe883lm8f8cRgiM0PcZb/FDnzLY/OEewlmgMyXmkFLpWZsmNsgWKlK301tcPimxrmjIaE+I8uljqtFAfI/V2R+cZzYVOP4wV1bo3ugg1CTVmqg/UxbFOM+vjwToM6OUVPZ9YLz312qP3F9SMSLuyFkVTofpItZ46G+rzyXq/82O4sl5eduOlR4ceuZ0ojzNlviF2RINBk0dLQlXoNETqOLJez9TziXru0WtPvZ2o4ys6Dah5IG5CokVy61VEpGwJ9Jen1El0yHNAxwtynCp+QZNDckAlf2vc2vPN2+yaQXLcS/7t1KOvfzB/n7D9lDap//FD/sIbIiUMbpr0NusAAAAASUVORK5CYII=)![“Form → Space → Depth → Light → Motion → Perspective” shown as flat text and on an angled yellow 3D strip with a pink top.](https://cdn.sanity.io/images/599r6htc/regionalized/02f264d3e112d6229cb18015b9fa6b7123a380c9-1920x1080.png?w=528&h=297&q=75&fit=max&auto=format)

Building explorations with components made it so anyone could refine the composition, from updating colors to adding or removing tubes.

Deanna explored placing type on geometry and rotating those elements in space.

Motion shows the power of 3D: These aren't just skewed text nodes, they're 3D objects with multiple sides rotating in space.

Turning the forms into components also opened up the art direction to the rest of the team. Even after the scene was animated, brand designer Yeojin Shin could adjust colors and gradients through the components, and those changes would carry into the animation. That became especially useful as we assembled the edit. When the typography shot moved to a different point in the video, we could easily adjust its color palette to complement the shots around it. We could keep shaping the art direction while simultaneously seeing how the animation looked in the context.

### [Building expressive layouts with Figma’s agent](#building-expressive-layouts-with-figma-s-agent)

Ben Hill, a brand motion designer on the team, wanted to explore expressive 3D layouts by tilting, stacking, and rotating frames to give flat compositions depth. He started with a set of simple cards, but arranging each one by hand was slow.

“Laying out a bunch of elements in 3D space by hand is tedious and imprecise. You’re either eyeballing their placement, or doing math and manually entering values for dozens of objects,” Ben said. “So I had the Figma agent build a generative plugin to do the heavy lifting, arranging everything into a grid, a helix, a ring, or a randomized scatter.”

> Laying out a bunch of elements in 3D space by hand is tedious... So I had the Figma agent build a generative plugin.

Ben Hill, Brand Motion Designer, Figma

With the plugin handling placement, Ben could generate variations, move the arrangements in space, and compare compositions on the canvas. Working with placeholder shapes let him focus on depth, balance, and movement before developing the artwork.

![3D layout arranger plugin with its layout menu open, showing ring selected and cube highlighted among eight arrangement options.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAPoAAAD6AG1e1JrAAACd0lEQVQokY3S20vTcRjH8f0BIpJO0d/ExFS00og8wLQ0LRPtonCekG4UAsXhXyB43Z0z7c4wK7VwNk2RMbbZhkiM0pYWNDtaK3W/HZ071Dv2M43yxosPfHmeDy+ei6/MbDZz1CwsLByK+b+O7CiQ1WrFZrOxvLzMysoKdrud1dVV7PbX0txisfwFjUYjJpNJyv4w9o7N97O0tITD4cDpdLK1tYnbLeL1+nCJIo71dRYXFw+6Mo1mgKGhO0xMTGAwGNDr9YyO3mdgYJDYTqO5zdjYOGtrbyTEFwjiDuziCUbY9u7wYvkVIyP36O/XSH2ZUllBTU09vb19zM7OMTk5iVrdQ2XlZWK78vKLtHfcxGAw4nJ7+bQdwPbZi+3rDs8/uBgem6KxqQ2l8gJlZRXIEhNTycrKo6tLjU43LV2jUrUgKDJJTEojOSWd6ku1PNHNsCV6effDzzOHiPm9H9PbTW4N3qWoSIk81pUL/4LT03tgQwwUMkk8lkqyXEF1dS063Qxut4ctt4+P30W+uAI4NrZ5MPyQtrIqaoQM6hTHkSUlC4fBhj+gPA25kE5VbZ10ocfjwe/3S3BgZwdx28fL8Xlm65uYP1WIsaAQWYoigxPZ+XR1dh+AquZWhNxsEvIySSjKoaLtGtq5pxIYDO5KWCgUxi8G2dBacKraCRSXEiopQSbkZJOde5LOffDxIxq72hGunCP+6hnirp/lfHczWv0cPq+PcDhCOBwmGo0ScO/inLLiauwgUlzKzxiYXpBPTv7pvQt104zrJmnuU5PeXkn8jVLiWoso72lBq5+Vvk04EiUUihCJRKQLv2ktiKoOosWl/Cop4TdSu22k3S3+5wAAAABJRU5ErkJggg==)![3D layout arranger plugin with its layout menu open, showing ring selected and cube highlighted among eight arrangement options.](https://cdn.sanity.io/images/599r6htc/regionalized/222f89045df6d65e95959134992974b5d8d51f31-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

The agent-generated plugin gave Ben a range of 3D layouts and specific controls for orientation, spacing, and a slider to generate alternate random layouts.

Ben tested a wide range of spatial arrangements using placeholder shapes, focusing on composition before refining the visuals.

Ben chose the plugin’s randomized arrangement for its loose, expressive feel, then replaced the placeholder cards with photography, circles, lines, and other graphic elements. Building brand components let him keep refining the artwork as he animated. He could watch the composition turn, see how the elements worked together from different angles, and adjust the design in response.

Shaders helped develop the look further. Ben explored surface treatments and added light sweeps across the assets to give them a sense of texture. The layout, art direction, and animation could evolve together, with each pass informing the next, until Ben was happy with the final result.

### [Illustrating a dimensional experience](#illustrating-a-dimensional-experience)

Ben’s next exploration started with a question: Could a set of vector shapes become a dimensional illustration? He arranged shapes in 3D space to build a flower, starting in grayscale to work out the form and composition before developing its visual treatment. Shaders brought color into the scene, and Ben used a gradient-map shader to assign colors to the light and dark values in the artwork.

To explore how the 3D illustration could function within a brand experience, Ben placed it in a homepage concept for a fictional brand alongside animated typography, logos, and icons that Gilles Desmadrille, another brand motion designer on our team, had developed. That context changed how the scene needed to move.

“The original flower animation had a more fluid, handheld camera style, but we wanted to make it a bit more simple and tied to a scrolling action,” Ben explained. The team pared back the motion and adjusted its timing to work with the type animation.

## [Shaping every shot, together](#shaping-every-shot-together)

Using 3D transforms allowed us to flip our creative decision-making. We could test a rough spatial composition in motion, see whether the idea worked, and use what we learned to develop the art direction. Some ideas were hard to judge as static designs. Testing them in motion let us show how they would work before committing to the final art direction.

The work also remained collaborative throughout the process. Brand designers could adjust colors and gradients through components after a scene was animated, while motion designers continued refining the movement. As the edit came together, we could make those decisions in context, without moving assets between tools or waiting for someone to hand over a working file. Being on the canvas meant there was more room to experiment, and more people involved in the process.

When you’re ready to bring your spatial designs into a website or product, 3D transforms map directly to CSS. Select a 3D layer in [Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode-in-Figma) to inspect and copy its exact CSS transform, including depth and rotation on every axis. Coding agents can also read and create 3D designs through the [Figma MCP server](https://www.figma.com/blog/the-tldr-on-mcp/), connecting what you explore on the canvas with what you build in code.

3D transforms are now in open beta for all Full seat users. Start exploring dimension, perspective, and depth in your compositions, or ask the Figma agent to build a 3D scene and bring it to life with keyframed animations in Figma Motion.

Go to the [help center](https://help.figma.com/hc/en-us/articles/44568893374999) to learn more, and check out the [playground file](https://www.figma.com/community/file/1697663412897353944) to learn how to get started and explore examples from our product design and brand design teams. We can’t wait to see where you take them.