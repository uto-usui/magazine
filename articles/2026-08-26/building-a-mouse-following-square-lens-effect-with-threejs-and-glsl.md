---
title: "Building a Mouse-Following Square Lens Effect with Three.js and GLSL"
source: "https://tympanus.net/codrops/2026/08/25/building-a-mouse-following-square-lens-effect-with-three-js-and-glsl/"
publishedDate: "2026-08-25"
category: "design"
feedName: "Codrops"
author: "Tomoyuki Nakata"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/pointer-square-lens-distortion-with-rgb-Shift.webp?x57826)](https://tympanus.net/Tutorials/PointerSquareLensDistortion "Building a Mouse-Following Square Lens Effect with Three.js and GLSL Demo")

_**Editor’s Note:** We’re delighted to have Tomoyuki Nakata, Creative Developer at baqemono, join our little Three.js celebration ahead of the very first Three.js conference in Paris. As part of our Three.js marathon, he’s bringing us this fantastic mouse-following lens effect built with Three.js and GLSL. We’re thrilled to have him along for the ride! Enjoy!_

**🇫🇷 Wait… you still don’t have your ticket?** The very first Three.js conference is coming to Paris, and tickets won’t wait forever. Use code `CODROPS` for **15% off** and **[grab your ticket before they sell out →](https://threejs.paris/tickets)**

## The Idea

What happens when you combine a grayscale image, a colored image, and a lens effect that follows the mouse? In this tutorial, we will build a mouse-following square lens effect using Three.js and GLSL.

The effect layers two images: a grayscale image covers the screen, while a color image is revealed through a square area that follows the mouse pointer. Inside this square, we add a lens distortion and a radial RGB shift, while the grayscale image has its own subtle wave and noise-like motion.

Although the final result looks fairly complex, the effect is built from a small number of simple pieces. We will create the square mask, keep it square regardless of the viewport size, apply the lens and RGB shift effects in the fragment shader, and smoothly animate the square as it follows the mouse. We will also add a GUI so that the different parameters can be adjusted in real time.

The idea for this project came while I was browsing Pinterest and found a design where part of a grayscale image appears to be cut out by a colored square with a lens effect. You can see the original reference [here](https://jp.pinterest.com/pin/662732901494470584/). It looked like something that could be recreated with WebGL, and I thought the result would be even more interesting if the square followed the mouse and the foreground grayscale image had a separate effect. So I decided to recreate it with Three.js and GLSL.

## What We are Building

The final effect consists of the following elements:

-   A grayscale image covering the entire screen
-   A color image visible only inside the square
-   A CC Lens-style distortion that bulges outward from the center of the square
-   An RGB shift that becomes stronger toward the edges of the square
-   A square mask that remains square regardless of the screen size
-   Smooth mouse interaction with a slight delay
-   Wave and random distortion applied to the grayscale image
-   A GUI for adjusting the parameters in real time

Although the result may look a little complex, it does not use post-processing with a render target or any 3D models. Instead, we create the entire effect inside a fragment shader by combining the elements above.

## Project Structure

The files and their roles are organized as follows:

```
src/
└── scripts/
    ├── webgl/
    │   ├── glsl/
    │   │   ├── chunks/
    │   │   │   ├── ccLens.glsl
    │   │   │   ├── coverUv.glsl
    │   │   │   └── random3.glsl
    │   │   ├── frag/
    │   │   │   └── frag.glsl
    │   │   └── vert/
    │   │       └── vert.glsl
    │   ├── mesh/
    │   │   └── Mesh.ts
    │   ├── stage/
    │   │   └── Stage.ts
    │   └── Webgl.ts
    └── index.ts
```

-   `glsl`: `chunks` contains reusable functions, `frag` contains fragment shaders, and `vert` contains vertex shaders.
-   `mesh` (`Mesh`): Manages the window size, texture loading, mesh creation, mesh sizing, uniform updates, and related tasks.
-   `stage` (`Stage`): Manages the scene, scene sizing, camera and renderer creation, and their updates.
-   `Webgl`: Creates and initializes the `Mesh` and `Stage` classes, connects the GUI, registers events, and manages the render loop.

The class structure is fairly conventional, so this article focuses primarily on the fragment shader implementation.

## Setting Up the Stage

Let us begin with the `Stage` class. This class creates the scene, camera, renderer, and other essentials for working with Three.js, and sets up rendering and resize handling. Most of it is standard, but one detail worth explaining is how the camera’s Z position is set.

### Setting the Camera’s Z Position

The camera’s Z position is set using a function called `calcViewportDistance`.

```
const calcViewportDistance = (height: number, fov: number): number => {
  return height / (2 * Math.tan((fov * Math.PI) / 360))
}
```

Without going into the mathematical details, this calculation finds the distance at which the visible height of the camera matches `height`. By scaling a 1 x 1 plane to the viewport width and height, the entire mesh fits precisely within the camera’s field of view (FOV).

## The Mesh Class

Next, let us briefly look at the `Mesh` class. It handles everything related to the mesh, including window sizing, texture loading, mesh creation with geometry and material, mesh sizing, and uniform management and updates. Like the `Stage` class, its structure is fairly standard, so from here we will build the final appearance step by step through the shader implementation.

## The Vertex Shader

Because this effect does not deform any vertices, the vertex shader is simple: it passes the geometry’s UV coordinates to the fragment shader and transforms the plane’s vertex positions into screen-space coordinates that account for the mesh scale, camera position, FOV, and related settings.

```
precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 v_uv;

void main() {
  v_uv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

## The Fragment Shader

### Displaying the Textures Fullscreen

Now let us move on to the fragment shader. We will begin by displaying the two images used in this effect across the full screen. The following code in the `Mesh` class’s `setTexture` method loads them: `texture1` is the color image shown inside the square, while `texture2` is the grayscale image shown across the area outside it.

```
const loader = new TextureLoader()
const texture1Path = this.$target.dataset.texture1Path
const texture2Path = this.$target.dataset.texture2Path

if (!texture1Path || !texture2Path) return

const [texture1, texture2] = await Promise.all([
  loader.loadAsync(texture1Path),
  loader.loadAsync(texture2Path)
])

this.uniforms.u_texture1.value = texture1
this.uniforms.u_texture2.value = texture2
this.uniforms.u_textureSize1.value.set(
  texture1.image.width,
  texture1.image.height
)
this.uniforms.u_textureSize2.value.set(
  texture2.image.width,
  texture2.image.height
)
```

In the fragment shader, we sample colors from both images (textures) and first confirm that each one fills the screen. The two images used here have the same aspect ratio, so `u_textureSize1` and `u_textureSize2` could be combined into a single value. However, we calculate them separately using each texture’s dimensions to support images with different aspect ratios as well.

```
precision highp float;

uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
uniform vec2 u_meshSize;
uniform vec2 u_textureSize1;
uniform vec2 u_textureSize2;

varying vec2 v_uv;

#include "../chunks/coverUv.glsl"

void main() {
  vec2 texture1Uv = getCoverUv(v_uv, u_meshSize, u_textureSize1);
  vec2 texture2Uv = getCoverUv(v_uv, u_meshSize, u_textureSize2);

  vec4 insideColor = texture2D(u_texture1, texture1Uv);
  vec4 outsideColor = texture2D(u_texture2, texture2Uv);

  gl_FragColor = insideColor;
}
```

The `getCoverUv` function used here prevents the image from stretching when its aspect ratio differs from the viewport. Rather than using `v_uv` directly, it creates UV coordinates that preserve the image’s aspect ratio and crop it from the center, just like CSS `background-size: cover`.

```
vec2 getCoverUv(vec2 uv, vec2 meshSize, vec2 textureSize) {
  vec2 meshRatio = vec2(meshSize.x / meshSize.y, meshSize.y / meshSize.x);
  vec2 textureRatio = vec2(textureSize.x / textureSize.y, textureSize.y / textureSize.x);

  vec2 resolutionRatio = vec2(
    min(meshRatio.x / textureRatio.x, 1.0),
    min(meshRatio.y / textureRatio.y, 1.0)
  );

  return (uv - 0.5) * resolutionRatio + 0.5;
}
```

The color image now fills the screen as shown below.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture01-1200x720.webp?x57826)

> You can find the code up to this point in [01-display-color-image.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/01-display-color-image.glsl).

Once the color image is visible, replace the final line with the following code and confirm that the grayscale image is displayed as well.

```
gl_FragColor = outsideColor;
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture02-1200x720.webp?x57826)

Grayscale image

> You can find the code up to this point in [02-display-grayscale-image.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/02-display-grayscale-image.glsl).

The color and grayscale image values are named `insideColor` and `outsideColor`, respectively, to make their roles in the final result easier to understand.

### Building a Coordinate System for the Square

Next, we create a mask that switches between the grayscale and color images. To make the square’s center and size easier to work with, we convert `v_uv` to the `-1.0 to 1.0` range and create a coordinate system with its origin at the center of the screen.

```
vec2 uvSquare = v_uv * 2.0 - 1.0;
```

### Creating the Square Mask

We use the `uvSquare` coordinates created above to build the mask. Treating `u_squareSize` as half the length of one side of the square, we define its left, right, bottom, and top boundaries.

```
uniform float u_squareSize;

float squareHalfSize = u_squareSize;
float left = -squareHalfSize;
float right = squareHalfSize;
float bottom = -squareHalfSize;
float top = squareHalfSize;
```

We use `step` to test whether the current pixel lies within each of the four boundaries, then multiply the four results together. This produces `1.0` inside the square, where every condition is satisfied, and `0.0` everywhere else.

```
float squareMask =
  step(left, uvSquare.x)
  * (1.0 - step(right, uvSquare.x))
  * step(bottom, uvSquare.y)
  * (1.0 - step(top, uvSquare.y));
```

To check the shape of the mask, we output the `squareMask` value directly as a color.

```
gl_FragColor = vec4(vec3(squareMask), 1.0);
```

The inside of the mask appears white and the outside black, producing a white rectangle in the center.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture03-1200x720.webp?x57826)

> You can find the code up to this point in [03-create-square-mask.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/03-create-square-mask.glsl).

### Correcting the Aspect Ratio

We now have a rectangular mask, but its aspect ratio changes when the viewport is resized. To correct this, we use the mesh dimensions to calculate an aspect-ratio correction factor for determining the square’s bounds.。

```
vec2 squareAspectScale = vec2(
  min(u_meshSize.y / u_meshSize.x, 1.0),
  min(u_meshSize.x / u_meshSize.y, 1.0)
);
```

We divide the coordinates used for the square test by this aspect-ratio correction factor, adjusting the mask’s visible area so that the square does not stretch horizontally or vertically.

```
uvSquare /= squareAspectScale;
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture04-1200x720.webp?x57826)

> You can find the code up to this point in [04-correct-mask-aspect-ratio.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/04-correct-mask-aspect-ratio.glsl).

### Compositing the Two Images

We use the `squareMask` value to blend the grayscale and color images. Where the mask is `0.0`, `outsideColor` is selected; where it is `1.0`, `insideColor` is selected. The result is a square crop of the color image displayed over the grayscale image.

```
vec4 finalColor = mix(outsideColor, insideColor, squareMask);

gl_FragColor = finalColor;
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture05-1200x720.webp?x57826)

> You can find the code up to this point in [05-composite-images.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/05-composite-images.glsl).

### Applying the CC Lens Distortion

Next, we apply a CC Lens-style distortion to the color image inside the square. First, we convert `uvSquare` to the `0.0 to 1.0` range to create local UV coordinates called `squareUv`. These coordinates let us calculate the lens distortion relative to the square’s center, even when the square’s size changes.

```
vec2 squareUv = uvSquare / (squareHalfSize * 2.0) + 0.5;
```

We then pass these UV coordinates to the `getCCLensUv` function to produce UV coordinates distorted by the CC Lens effect. The function is defined as follows:

```
uniform float u_lensDistortion;

float getCCLensScale(float distortion, float radius2) {
  if (distortion >= 0.0) {
    return 1.0 + distortion * radius2;
  }

  return 1.0 / (1.0 - distortion * radius2);
}

vec2 getCCLensUv(vec2 uv, vec2 resolution, float distortion) {
  vec2 centeredUv = uv - 0.5;
  vec2 aspectScale = vec2(resolution.x / resolution.y, 1.0);
  vec2 centeredPosition = centeredUv * aspectScale;

  float radius2 = dot(centeredPosition, centeredPosition);
  float lensScale = getCCLensScale(distortion, radius2);

  vec2 distortedPosition = centeredPosition * lensScale;
  vec2 distortedCenteredUv = distortedPosition / aspectScale;
  vec2 distortedUv = distortedCenteredUv + 0.5;
  vec2 distortionOffset = distortedUv - uv;

  return uv - distortionOffset;
}
```

The function first uses `uv - 0.5` to move the center of the UV coordinates to the origin, then uses `dot` to calculate the squared distance from that center. Based on this distance, it calculates a `scale` that changes more for pixels farther from the center and offsets the texture sampling position. Because we are applying the function to local UV coordinates inside a square, we pass `vec2(1.0)` as `resolution` to represent a `1:1` aspect ratio. For `distortion`, we pass the `u_lensDistortion` uniform so that its value can later be changed through the GUI.

```
vec2 distortedSquareUv = getCCLensUv(squareUv, vec2(1.0), u_lensDistortion);
```

We now have `distortedSquareUv`, the distorted local UV coordinates inside the square. However, using them directly as the color image’s UV coordinates would remap the entire image into the square. We want the grayscale and color images to remain aligned in size and position while distorting only the color image, so we calculate an offset from the difference between the UV coordinates before and after distortion. `squareLensOffset` stores how far the CC Lens effect moved the local UV coordinates within the square.

```
vec2 squareLensOffset = distortedSquareUv - squareUv;
```

Adding this offset directly to the full-screen `v_uv` would treat a square-relative movement as though it were relative to the entire screen, making the distortion too large. We therefore multiply it by the square size and the aspect-ratio correction factor, converting the square-relative offset into `viewportLensOffset`, an offset relative to the full-screen UV coordinates.

```
vec2 viewportLensOffset = squareLensOffset * squareHalfSize * squareAspectScale;
```

We add the converted `viewportLensOffset` to `v_uv` to create the UV coordinates used to sample the color image.

```
vec2 lensTexture1Uv = getCoverUv(v_uv + viewportLensOffset, u_meshSize, u_textureSize1);
```

We then replace the `texture1Uv` previously used to sample `insideColor` with `lensTexture1Uv`.

```
vec4 insideColor = texture2D(u_texture1, lensTexture1Uv);
```

The color image now appears with lens distortion inside the square mask.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture06-1200x720.webp?x57826)

> You can find the code up to this point in [06-apply-cc-lens-distortion.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/06-apply-cc-lens-distortion.glsl).

### Adding a Radial RGB Shift

In addition to the lens distortion, we apply an RGB shift inside the square. Simply adding a constant value to the UV coordinates would shift the colors in the same direction and by the same amount everywhere in the square. Instead, as with the lens effect, we use the center of the square as the reference point so that there is no color shift at the center and the shift becomes stronger toward the outside.

The `squareUv` coordinates used for the lens distortion are local UV coordinates where the bottom-left corner of the square is `0.0` and the top-right corner is `1.0`. For the RGB shift, we need the direction and distance from the square’s center to each pixel. We first subtract `0.5` from `squareUv` to move the square’s center to the origin, then multiply by `2.0` to create `rgbShiftDirection` in a size-independent `-1.0 to 1.0` range.

```
vec2 rgbShiftDirection = (squareUv - 0.5) * 2.0;
```

The shift amount for each RGB channel is supplied through three uniforms: `u_rgbShiftR`, `u_rgbShiftG`, and `u_rgbShiftB`. These values will also be adjustable through the GUI. Each component of `rgbShiftDirection` is `0.0` at the center of the square and reaches `-1.0` or `1.0` at the corresponding edge, so each uniform sets the maximum per-axis UV shift at that edge. Positive and negative values shift in opposite directions, while `0.0` leaves that channel unchanged.

```
uniform float u_rgbShiftR;
uniform float u_rgbShiftG;
uniform float u_rgbShiftB;
```

Next, starting from the lens-distorted `lensTexture1Uv`, we add an offset for each channel by multiplying `rgbShiftDirection` by its shift amount. We then recombine the sampled R, G, and B values into `insideColor`.

```
float r = texture2D(u_texture1, lensTexture1Uv + rgbShiftDirection * u_rgbShiftR).r;
float g = texture2D(u_texture1, lensTexture1Uv + rgbShiftDirection * u_rgbShiftG).g;
float b = texture2D(u_texture1, lensTexture1Uv + rgbShiftDirection * u_rgbShiftB).b;

vec4 insideColor = vec4(r, g, b, 1.0);
```

The RGB shift is now applied. With the default values of `0.01` for R, `0.0` for G, and `-0.01` for B, all three channels overlap at the center of the square, while R and B separate in opposite directions toward the edges. Later, when we subtract `u_mouse` from `uvSquare` to move the square, the origin of the RGB shift derived from `squareUv` moves together with the center of the lens.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture07-1200x720.webp?x57826)

> You can find the code up to this point in [07-apply-rgb-shift.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/07-apply-rgb-shift.glsl).

### Making the Square Follow the Mouse

Next, we make the square mask and the center of the lens follow the mouse. Add a `u_mouse` uniform and the following line:

```
uniform vec2 u_mouse;

uvSquare -= u_mouse;
```

DOM mouse coordinates are measured in pixels from the top-left corner, while `uvSquare` uses coordinates in the `-1.0 to 1.0` range with the origin at the center of the screen. We therefore convert the mouse coordinates to the same range in TypeScript.

```
public onPointerMove(event: PointerEvent): void {
  this.mouse.set(
    (event.clientX / this.windowWidth) * 2 - 1,
    -(event.clientY / this.windowHeight) * 2 + 1
  )
}
```

The Y coordinate is negated because DOM coordinates increase downward, whereas the shader treats upward as the positive direction.

Then, inside the `render` method, we use `Vector2.lerp` for linear interpolation and copy the resulting `this.mouseEase` value to `u_mouse`, making the effect follow the mouse smoothly.

```
this.mouseEase.lerp(this.mouse, this.pointerEase)
this.uniforms.u_mouse.value.copy(this.mouseEase)
```

The square mask and lens center now use the mouse position as their origin and follow its movement smoothly.

> You can find the code up to this point in [08-follow-mouse.glsl](https://github.com/tomoyukinakata/pointer-square-lens-distortion-with-rgb-shift/blob/master/src/scripts/webgl/glsl/frag/steps/08-follow-mouse.glsl).

### Adding Motion to the Outside Image

Next, we add some subtle motion only to the grayscale image covering the screen. Because both the wave distortion and random distortion we are about to create animate over time, we first add a `u_time` uniform.

```
uniform float u_time;
```

On the TypeScript side, we convert the elapsed time returned by `performance.now()` to seconds and pass it to `u_time` on every frame.

```
this.uniforms.u_time.value = performance.now() * 0.001
```

#### Adding the Wave Distortion

We use `sin` to add a wave-like effect. The three values `u_waveFrequency`, `u_waveSpeed`, and `u_waveStrength` are added as uniforms so they can be adjusted through the GUI.

```
uniform float u_waveFrequency;
uniform float u_waveSpeed;
uniform float u_waveStrength;
```

Using these uniforms, we apply a wave-like offset to the grayscale image’s sampling position along the Y axis.

```
float wave = sin(texture2Uv.y * u_waveFrequency + u_time * u_waveSpeed) * u_waveStrength;

texture2Uv.y += wave;
```

#### Adding the Random Distortion

Next, we use the `random3` function to add fine, noise-like distortion. As with the wave, `u_randomFrequency`, `u_randomSpeed`, and `u_randomStrength` are added as uniforms so they can be adjusted through the GUI.

```
uniform float u_randomFrequency;
uniform float u_randomSpeed;
uniform float u_randomStrength;
```

The `random3` function is adapted from [this Shadertoy example](https://www.shadertoy.com/view/XsX3zB).Rather than writing this function directly in the fragment shader, we move it into `glsl/chunks/random3.glsl` so that it can be reused by other shaders.

```
// <www.shadertoy.com/view/XsX3zB>
// by Nikita Miropolskiy
vec3 random3(vec3 c) {
  float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
  vec3 r;
  r.z = fract(512.0 * j);
  j *= 0.125;
  r.x = fract(512.0 * j);
  j *= 0.125;
  r.y = fract(512.0 * j);

  return r - 0.5;
}
```

Before the `main` function in `frag.glsl`, we include this chunk in the same way as `coverUv.glsl` and `ccLens.glsl`. During the build, the function body is inserted at the `#include` directive, allowing `main` to call it like a regular GLSL function.

```
#include "../chunks/random3.glsl"
```

Inside `main`, we use the `random3` function to offset `texture2Uv` as follows:

```
texture2Uv += random3(vec3(texture2Uv * u_randomFrequency, u_time * u_randomSpeed)).x * u_randomStrength;
```

This completes the effect shown at the beginning!

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/capture08.webp?x57826)

## Adding GUI Controls

The visual effect and interaction are now complete. Finally, we add the parameters to a GUI so that we can adjust the square size, lens strength, RGB shift amounts, `wave` and `random` motion, and more.

### Defining the Shader Parameters

The `Webgl` class manages the logic that ties the demo together, including initialization of the `Stage` and `Mesh` classes, event registration, and the render loop. Since this is a conventional structure, we will skip the details and focus on creating the GUI and updating the shader parameters. The default parameter values are managed in the `Webgl` class’s `constructor`.

```
this.shaderParams = {
  squareSize: 0.3,
  lensDistortion: 1.5,
  rgbShiftR: 0.01,
  rgbShiftG: 0,
  rgbShiftB: -0.01,
  waveFrequency: 10,
  waveStrength: 0.01,
  waveSpeed: 1,
  randomFrequency: 1,
  randomStrength: 0.02,
  randomSpeed: 0.2,
  pointerEase: 0.1
}
```

### Creating the GUI

The GUI is created and its parameters are added in the `Webgl` class’s `setGUI` method. Here, we add the parameters to folders organized by effect.

```
private setGUI(): void {
  this.destroyGUI()

  this.gui = new GUI({
    title: "Square Texture Effect"
  })

  this.gui.onChange(this.updateShaderParams)

  const squareFolder = this.gui.addFolder("Square")
  const rgbShiftFolder = this.gui.addFolder("RGB Shift")
  const waveFolder = this.gui.addFolder("Wave")
  const randomFolder = this.gui.addFolder("Random")
  const pointerFolder = this.gui.addFolder("Pointer")

  squareFolder
    .add(this.shaderParams, "squareSize", 0, 5, 0.01)
    .name("Square Size")

  squareFolder
    .add(this.shaderParams, "lensDistortion", -5, 5, 0.01)
    .name("Lens Distortion")

  rgbShiftFolder
    .add(this.shaderParams, "rgbShiftR", -0.05, 0.05, 0.001)
    .name("Red Shift")

  rgbShiftFolder
    .add(this.shaderParams, "rgbShiftG", -0.05, 0.05, 0.001)
    .name("Green Shift")

  rgbShiftFolder
    .add(this.shaderParams, "rgbShiftB", -0.05, 0.05, 0.001)
    .name("Blue Shift")

  waveFolder
    .add(this.shaderParams, "waveFrequency", 0, 200, 1)
    .name("Wave Frequency")

  waveFolder
    .add(this.shaderParams, "waveStrength", 0, 0.1, 0.001)
    .name("Wave Strength")

  waveFolder
    .add(this.shaderParams, "waveSpeed", 0, 5, 0.01)
    .name("Wave Speed")

  randomFolder
    .add(this.shaderParams, "randomFrequency", 0.1, 20, 0.1)
    .name("Random Frequency")

  randomFolder
    .add(this.shaderParams, "randomStrength", 0, 0.1, 0.001)
    .name("Random Strength")

  randomFolder
    .add(this.shaderParams, "randomSpeed", 0, 2, 0.01)
    .name("Random Speed")

  pointerFolder
    .add(this.shaderParams, "pointerEase", 0.01, 1, 0.01)
    .name("Pointer Ease")
}
```

### Updating the Uniforms

When a parameter changes in the GUI, `shaderParams` is passed to the `Mesh` class through the `updateShaderParams` method.

```
private updateShaderParams = (): void => {
  if (this.mesh) {
    this.mesh.setShaderParams(this.shaderParams)
  }
}
```

In the `Mesh` class, the values received from the GUI are assigned to their corresponding uniforms as shown below. Because `pointerEase` is not passed to the shader, it is updated as a property of the `Mesh` class instead. This lets us change the parameter values in real time.

```
public setShaderParams({
  squareSize,
  lensDistortion,
  rgbShiftR,
  rgbShiftG,
  rgbShiftB,
  waveFrequency,
  waveStrength,
  waveSpeed,
  randomFrequency,
  randomStrength,
  randomSpeed,
  pointerEase
}: ShaderParams): void {
  this.uniforms.u_squareSize.value = squareSize
  this.uniforms.u_lensDistortion.value = lensDistortion
  this.uniforms.u_rgbShiftR.value = rgbShiftR
  this.uniforms.u_rgbShiftG.value = rgbShiftG
  this.uniforms.u_rgbShiftB.value = rgbShiftB
  this.uniforms.u_waveFrequency.value = waveFrequency
  this.uniforms.u_waveStrength.value = waveStrength
  this.uniforms.u_waveSpeed.value = waveSpeed
  this.uniforms.u_randomFrequency.value = randomFrequency
  this.uniforms.u_randomStrength.value = randomStrength
  this.uniforms.u_randomSpeed.value = randomSpeed
  this.pointerEase = pointerEase
}
```

The GUI is now complete as well. Try adjusting the values to see how they change the appearance of the effect!

## Conclusion

What did you think? I hope this article showed that even an effect that looks complex at first glance can be built by combining small, simple elements. You could also add your own parameters to this implementation or change the adjustable ranges to create something original. This project was inspired by a single image I found on Pinterest, but ideas are everywhere: in images, websites, videos, and everyday life. When something catches your attention, try turning it into code as we did here. Finally, if you have any questions about this article, feel free to contact me on [X](https://x.com/yukiloz7). Thank you for reading!