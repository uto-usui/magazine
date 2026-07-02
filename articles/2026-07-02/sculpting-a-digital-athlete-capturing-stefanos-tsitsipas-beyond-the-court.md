---
title: "Sculpting a Digital Athlete: Capturing Stefanos Tsitsipas Beyond the Court"
source: "https://tympanus.net/codrops/2026/07/01/sculpting-a-digital-athlete-capturing-stefanos-tsitsipas-beyond-the-court/"
publishedDate: "2026-07-01"
category: "design"
feedName: "Codrops"
author: "OFF+BRAND"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/Stefanos.png.webp?x68649)](https://tsitsipas.com/ "Sculpting a Digital Athlete: Capturing Stefanos Tsitsipas Beyond the Court Demo")

When designing a website around a person rather than a product, the challenge goes beyond visuals. The experience has to capture who they are and what people associate with them.

For Stefanos Tsitsipas, that meant first understanding his world before translating it into an interactive experience. Our goal was to represent his personality as authentically as possible for his community and fans.

## Project Backstory

Stefanos Tsitsipas is one of the most recognizable names in tennis. Beyond his performances on the court, he is also a familiar face in international brand campaigns. From the very beginning, we wanted the experience to reflect both sides of his identity: the elite athlete and the personality beyond the game.

## Production Pipeline

The 3D production pipeline relied on Cinema 4D, Redshift, Blender, and Marvelous Designer for asset creation, animation, and cloth simulation.

### Photogrammetry

The first step was to capture a 360-degree scan of Stefanos using photogrammetry. OFF+BRAND partnered with a French studio to carry out the scan, as the process requires around 70 cameras and a highly specialized setup.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-1-1200x545.png.webp?x68649)

Stefanos being scanned with the photogrammetry technic in Paris

We asked Stefanos to stand in either an A-pose or a T-pose to make rigging in Mixamo easier.

We requested two distinct setups: one for the on-court version and another for the off-court version. For the on-court version, we needed the tennis outfit, hair with a headband, and wristbands to be included in the scan. For the off-court version, we required his hair without a headband and no additional accessories.

The studio delivered two versions of Stefanos, each with three Levels of Detail (LODs), ranging from high-definition models to optimized low-poly versions.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-2-1200x765.png.webp?x68649)

Off-court 3 LODs

Each part of the body had its own texture—arms, legs, head, and torso. This setup wasn’t suitable for WebGL, as it was not optimized at all. 

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-3-1200x543.png.webp?x68649)

Stefanos Photogrammetry Scan Textures

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-4.png.webp?x68649)

UV sets from the Stefanos 3D scan model

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-5-1200x377.png.webp?x68649)

Arm texture applied to the arm UVs.

### UV Optimization

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-6.png.webp?x68649)

Set of 8 textures

The first step was to consolidate all eight textures into a single optimized texture set. To achieve this, we used Blender’s texture remapping tools. We duplicated the UVs, creating UV1 from the original model and UV2, which was remapped to pack all eight textures into a single UV layout. We then transferred the texture data from UV1 to UV2, as the original textures had already been baked onto the UV1 layout.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-7-1200x662.png.webp?x68649)

One single texture for one single object for Stefanos

### Rigging

Once we had reduced the model to a single texture, we needed to rig it. After several tests, we discovered an issue with one of the hands, so we adjusted the fingers to ensure they were properly separated, allowing Mixamo to correctly interpret the topology.

Since we didn’t need an animation from Mixamo, we only downloaded the newly rigged model of Stefanos in a T-pose.

### Character Posing

We then imported the rigged model into Cinema 4D and adjusted its pose to give Stefanos a strong, powerful stance. Both the on-court and off-court versions needed to share the same pose, so we chose one in which he holds his racket while crossing his arms. We created two keyframes for each animated bone: one maintaining the A-pose, which we would need later, and a second, a few frames afterward, with the arms crossed.

Once we were happy with the pose, we exported it as an Alembic file so that the animation could be imported into Marvelous Designer.

### **Clothing Simulation**

The initial timeline for the entire 3D production process was estimated at five to eight days, but it ultimately took 14 days to complete. Given the tight schedule, we decided to use ready-made outfits from the Marvelous Designer Marketplace.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-9-1071x900.png.webp?x68649)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-10-1071x900.png.webp?x68649)

_Free outfits for on court_

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/image-11-1073x900.png.webp?x68649)

_Outfit for the off-court_

We opened the outfits in Marvelous Designer and imported Stefanos’ Alembic files.

Although the first two versions of Stefanos on the homepage were not animated, we still needed them to start in an A-pose so the T-shirt could be properly fitted between the arms and the torso. Otherwise, fitting the T-shirt correctly would have been much more difficult, as the arms would have interfered with the process.

Once we were happy with the pose, we re-exported the dressed model of Stefanos as an FBX so it could be imported into the next tool. For the crossed-arms pose, we further refined it in Cinema 4D, subtly enlarging the torso and arms to give him an even stronger presence.

Below is a comparison between the initial pose and the final iteration. The difference in energy is immediately noticeable. Since we wanted to showcase Stefanos’ personality while evoking the presence of a Greek statue, we paid close attention to these details, as they made a significant difference.

For the animated version, we exported the model again as an Alembic file to preserve the animation.

As with Stefanos’ original model, each outfit came with its own UV set. We therefore consolidated them into a single texture set.

We used two different approaches for the textures.

For the static poses, we baked the shadows. We set up the lighting in Cinema 4D using Redshift, positioning the main light to come from Stefanos’ left side. We also baked ambient occlusion (AO) to add more realism to the statue.

### Texture Development

For the animated version, we used only ambient occlusion and diffuse maps. We exported them from Substance Painter in case we later needed roughness and metalness maps, as these are not included in the beauty pass.

For the animated Stefanos statue, the main challenge was choosing the right angle to avoid introducing excessive ambient occlusion into the clothing. To solve this, we created two AO textures from different moments in the animation and combined them. We then refined the result with additional adjustments in Photoshop.

For the painted version, the reference image—created using AI tools—was a painted portrait of Stefanos. In WebGL, this meant the texture needed to incorporate a painterly shading style.

We ran several tests in Substance Painter but ultimately found that the WebGL rendering alone already provided a sufficiently painterly look.

### Prop Optimization

To simplify the racket’s geometry, we used an alpha texture to create the strings. We then applied the PNG to a simple square mesh.

### Hair Sculpting

For the hair and beard, we wanted them to resemble a Greek statue, so they needed to be sculpted. We used ZBrush to sculpt each strand individually.

### Character Animation

For the animation, Stefanos has a very distinctive service motion, which we needed to replicate as accurately as possible. We used reference videos found online and worked frame by frame to match the movement.

The main challenge was that the 3D artist was not a character animation specialist and was not deeply familiar with tennis, making it difficult to judge whether the pose was accurate or realistic for a professional player. Fortunately, our project manager, Matt, is very knowledgeable about tennis and provided valuable feedback throughout the process. His input paid off, as Stefanos’ team provided very little feedback on the 3D animation.

Another challenge was exporting an optimized animated model with cloth simulation. Our developer, Adrian, found a solution by removing selected keyframes from the shape keys.

At first, the result looked completely broken, but it was simply a matter of understanding how the system worked. Each shape key is linked to a specific keyframe: at frame 1, shape key 1 is set to 1 while all others are set to 0.

However, if shape key 1 is set to 1 at frame 1 and no new value is recorded later, it will remain at 1 in subsequent frames. Therefore, when removing keyframes to reduce the file size, we also needed to readjust the shape key values by deleting unnecessary keys and re-recording the remaining ones.

From photogrammetry to WebGL optimization, every step of the pipeline was carefully crafted to create a digital experience that reflects Stefanos Tsitsipas’ personality both on and off the court.