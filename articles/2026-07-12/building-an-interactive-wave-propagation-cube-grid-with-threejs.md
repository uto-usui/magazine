---
title: "Building an Interactive Wave Propagation Cube Grid with Three.js"
source: "https://tympanus.net/codrops/2026/07/09/building-an-interactive-wave-propagation-cube-grid-with-three-js/"
publishedDate: "2026-07-09"
category: "design"
feedName: "Codrops"
author: "Franky Hung"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/franky_cover.png.webp?x23502)](https://projects.arkon.digital/threejs/wavy-cubes/ "Building an Interactive Wave Propagation Cube Grid with Three.js Demo")

Hi, this is Franky Hung. I’m a creative frontend developer from Hong Kong. In this tutorial, we’re going to build a minimalistic yet mesmerizing 3D wave grid background!

One day, I was scrolling on Pinterest looking for inspirations and I stumbled upon a very cool [animation](https://www.pinterest.com/pin/2603712281769673/) showcasing waves propagating across a grid of cubes with realistic shadows. I thought to myself, “that doesn’t seem too hard to recreate in Three.js, why not consider it a small challenge?”

Before diving right into the details, here’s a quick breakdown of this tutorial:

1.  Project structure
2.  Setting up the stage
3.  Implementing the mouse trail
4.  Propagate waves from the mouse trail
5.  Postprocessing magic
6.  Production-ready optimizations
7.  Customize your wave grid!

Let’s get started!

## Project Structure

```
root
├── src
|  ├── ThreeJS
|  |  ├── Camera.js
|  |  ├── Orchestrator.js
|  |  ├── Renderer.js
|  |  ├── Stage.js
|  |  ├── Effects
|  |  |  ├── MouseTrail.js
|  |  |  └── VignetteRGBShiftShader.js
|  |  └── Utils
|  |     ├── Debug.js
|  |     └── Sizes.js
|  ├── index.html
|  ├── script.js
|  └── style.css
├── public
|  └── arrow.svg
├── package.json
└── vite.config.js
```

Vite is chosen for bundling as it’s a widely-used and very performant modern build tool. `script.js` is our entry which initializes the Three.js scene, binds it to the canvas element in the `index.html` and runs other interactive code. Everything Three.js related is grouped under the `ThreeJS` folder.

The way I structure my Three.js code is heavily inspired by Bruno Simon’s boilerplates in his course. Let me briefly explain the roles of each file:

-   `Orchestrator.js` **:** A central singleton that initializes and coordinates the scene, camera, renderer, essential utils and update loop. This is the backbone of our Three.js scene.
-   `Camera.js` **:** Manages the `PerspectiveCamera` and the mouse-based camera tilt behavior.
-   `Renderer.js` **:** Handles the `WebGLRenderer` setup and the post-processing pipeline using `EffectComposer`.
-   `Stage.js` **:** Manages all the content to be displayed in the scene, including lighting, the interactive cube grid and the gui controls for all tweakable parameters.
-   `Utils/Debug.js` **:** Holds a singleton GUI instance and toggles the controls menu based on whether `#debug` is present in the URL.
-   `Utils/Sizes.js` **:** Monitors window dimensions and pixel ratio, emitting resize events for the camera and renderer to update accordingly.
-   `Effects/MouseTrail.js` **:** Tracks mouse history to generate a dynamic trail texture used for real-time wave displacement.
-   `Effects/VignetteRGBShiftShader.js` **:** A custom shader providing subtle peripheral darkening and chromatic aberration post-processing.

## Setting up the stage

Time to build! I’m not going to paste every line of code here so please refer to the Github repo whenever in need.

Although there aren’t going to be like thousands of cubes, but reducing 400 draw calls into one is definitely a big reason to using instancing. For this tutorial though, we are aiming for the aesthetic of relatively larger cubes, so only a fraction of the 400 cubes will be rendered. Since we need the cubes to cast shadows, `MeshPhongMaterial` would suffice; we don’t need `MeshStandardMaterial` here since we don’t need physically accurate lighting for simple cube surfaces.

Let’s define `setGrid`, `updateGrid` functions and a `setLighting` function for their respective roles.

```
setGrid() {
    const count = this.gridSize * this.gridSize; // gridSize: 20
    const geometry = new THREE.BoxGeometry(
        this.cubeWidth, // width: 0.8
        this.cubeHeight, // height: 3
        this.cubeWidth,
    );
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

    // Per-instance XZ world position passed to the vertex shader
    this.offsetAttribute = new THREE.InstancedBufferAttribute(
        new Float32Array(count * 2),
        2,
    );
    geometry.setAttribute("aOffset", this.offsetAttribute);

    this.instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    this.instancedMesh.castShadow = true;
    this.instancedMesh.receiveShadow = true;
    this.scene.add(this.instancedMesh);

    // Arrange cube instances into a grid
    this.updateGrid();
}
```

Notice that we are defining an extra buffer attribute, this acts as both an ID and the 2D position of each instance, which will be useful later. It’s important to set `castShadow` and `receiveShadow` to true to let the cubes cast shadows onto themselves.

In `setLighting()`, these lines are particularly important:

```
this.directionalLight.castShadow = true; // don't forget this else there'll be no shadows!
this.directionalLight.shadow.mapSize.set(1024, 1024);
this.directionalLight.shadow.radius = 6;
```

The `shadow.mapSize` determines the resolution of the shadow map rendered by this light. To optimize your application as much as possible, reduce resolutions to the minimum until the visual quality starts to drop below what’s acceptable. Increase the shadow radius to get softer shadows. Finally, do not forget to toggle the main switch of shadows on for the renderer!

```
this.instance.shadowMap.enabled = true;
this.instance.shadowMap.type = THREE.PCFShadowMap; // PCFSoftShadowMap was deprecated in Three.js version r182
```

And voila! Now you have a grid of white cubes with not much to see!

## Implementing the mouse trail

Now with our static grid in place, it’s time to bring it to life! The core idea is to make waves that ripple out from the path of the cursor. To do this, we need to know where the cursor is, not on the 2D screen, but in our 3D world. This logic is all handled within our `MouseTrail.js` class. Let’s dive in.

The classic Three.js technique is to use a `Raycaster` to translate the cursor position into 3D world position, with an active “pointermove” event listener bound to the canvas. We “shoot” a ray from the camera through the normalized coordinates of the pointer and see where it intersects with a large, invisible horizontal plane that sits at `y = 0`, the same as the grid.

```
this.raycaster = new THREE.Raycaster();

// Invisible horizontal plane for pointer → world-space raycasting
this.rayPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(bounds, bounds),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        visible: false,
    }),
);
this.rayPlane.rotation.x = -Math.PI / 2;
this.rayPlane.updateMatrixWorld(true); // important!
```

Note that we need to call `rayPlane.updateMatrixWorld(true)` after rotation due to its absence in the actual scene for display; Three.js does not automatically update its world matrix so we need to do this manually. This gives us a flat surface to consistently intersect with, allowing us to get the `(x, z)` coordinates of the mouse on the grid’s plane.

Next, we need to initialize the trail data and texture for later use:

```
// DataTexture (MAX_TRAIL × 1, RGBA float): trail data for the shader
this.trailData = new Float32Array(MAX_TRAIL * 4);
this.trailTexture = new THREE.DataTexture(
    this.trailData,
    MAX_TRAIL, // 128
    1,
    THREE.RGBAFormat,
    THREE.FloatType,
);
this.trailTexture.needsUpdate = true;
```

After having the `rayPlane` ready, here’s what we do whenever a `pointermove` event fires:

1.  Using the raycaster to calculate the (x, z) coordinates of the mouse projected on the 3D grid.
2.  Calculate a `distDelta` that stores the distance between current cursor position and the last one. This will be useful in adjusting wave elevations.
3.  Evict the oldest point in the trail data array if we’re storing more than what the `MAX_TRAIL` defines.
4.  Push the new point into the trail data array, also assigning new point’s coordinates as last point’s for the next cycle.

For the trail data array, for each point we store: `{ x, z, age, distDelta }`. We only add a new point when the cursor has moved a minimum distance (`trailSpacing`), which prevents the trail from becoming too dense when the mouse is almost stationary.

To pass this data to the GPU efficiently, we’ll serialize it into a `DataTexture`. This is a special texture where we can directly manipulate the raw pixel data. We’ll create a `MAX_TRAIL` x 1 texture, where each “pixel” is a 4-component float (`RGBA`) that stores the data for one trail point.

-   **R:** `x` position
-   **G:** `z` position
-   **B:** `age` of the point in seconds, 0 for new point
-   **A:** `distDelta` (distance from the previous point), 0 for first point

### Updating the trail every frame

In our main animation loop, we call the `update()` method of `MouseTrail`. This method has two jobs:

1.  **Age and Prune:** iterates through the `trail` array, increases the `age` of each point, and removes any points that have exceeded their lifespan.
2.  **Upload to GPU:** copies the data from the `trail` array into our `trailData` `Float32Array`, and then flags the texture for an update by setting `this.trailTexture.needsUpdate = true`. This tells Three.js to upload our latest trail data to the graphics card.

```
// Points survive for fadeTime * 4 seconds; at that age the shader
// fade factor exp(-4) ≈ 0.018 makes them visually negligible.
const expiry = this.params.fadeTime * 4;

for (let i = this.trail.length - 1; i >= 0; i--) {
    this.trail[i].age += delta;
    if (this.trail[i].age > expiry) {
        this.trail.splice(i, 1);
    }
}
```

```
// Upload the latest MAX_TRAIL live points to the texture
const count = Math.min(this.trail.length, MAX_TRAIL);

if (count > 0 || this._uniforms.uTrailCount.value > 0) {
    for (let i = 0; i < count; i++) {
        const ti = i * 4;
        this.trailData[ti] = this.trail[i].x;
        this.trailData[ti + 1] = this.trail[i].z;
        this.trailData[ti + 2] = this.trail[i].age;
        this.trailData[ti + 3] = this.trail[i].distDelta;
    }
    this.trailTexture.needsUpdate = true;
    this._uniforms.uTrailCount.value = count;
}
```

And that’s it! We now have a system that continuously feeds our mouse’s path to the GPU. In the next section, we’ll finally modify the cube’s vertex shader to read this texture and create beautiful waves.

## Propagate waves from the mouse trail

This is the fun part! We can finally use our `trailTexture` to make waves! We’ll be modifying the default `MeshPhongMaterial` vertex shader to displace the tops of our cubes based on their proximity to the mouse trail. Let’s dive back into `Stage.js`.

### Extending the vertex shader

Three.js provides a powerful hook, `onBeforeCompile`, that lets us inject custom GLSL code into its built-in shaders before they’re compiled. This is perfect for our needs, as we can add our wave logic without writing a whole new shader from scratch.

Inside `Stage.js`, we’ll define a method `overrideVertexShader` that takes the default vertex shader and injects our wave logic. This method will also be reused by the custom depth material later. The core of this logic happens inside a loop that iterates through each point in our `uTrailTexture`.

Let’s break down the key concepts here:

#### The texture loop

```
// inside overrideVertexShader(vertexShader)
...inserted after #include <begin_vertex>
for ( int i = 0; i < uTrailCount; i++ ) {
    // texel layout: (worldX, worldZ, age, distDelta)
    vec4 td = texture2D(
        uTrailTexture,
        vec2( ( float(i) + 0.5 ) / 128.0, 0.5 )
    );
    ...
}
```

Since our `DataTexture` dimensions are 128×1, we only need to roll the x coordinate of the uv index. We also add 0.5 to both axes to pinpoint the center position of each texel.

#### Gaussian envelope

```
float dist      = length( worldXZ - td.rg );
float wavefront = uWaveSpeed * td.b;
float relDist   = dist - wavefront;

// Gaussian envelope centred on the expanding wavefront
float window = exp( -( relDist * relDist ) / ( uWaveWidth * uWaveWidth ) );
```

For each cube and each point in the mouse trail, we calculate the cube’s distance from the expanding circular wavefront. The `relDist` variable is key: it’s the cube’s distance from the trail point minus the distance the wave has already traveled (`wavefront = uWaveSpeed * age`), which gives us the distance between the wavefront and the cube.

We then use this `relDist` in a Gaussian function. This creates a smooth, bell-shaped “bump” centered on the wavefront. The `uWaveWidth` uniform controls the width of this bump. The result is a soft, natural-looking ripple.

#### Attenuating the waves

To make the effect feel more physical and less chaotic, we apply several forms of attenuation to control the wave’s strength (`weight`):

```
// Exponential time-fade + distance attenuation
float fade   = exp( -td.b / uFadeTime );
float atten  = 1.0 / ( 1.0 + dist * 0.1 );
float weight = fade * window * atten * td.a; // td.a is distDelta, used to weaken waves from closely spaced trail points
```

**Time Fade:** As a trail point gets older (its `age`, stored in `td.b`, increases), its influence fades out exponentially. Increase the `uFadeTime` uniform to slow down the time-based attenuation.

**Distance Attenuation:** The further a cube is from a trail point, the weaker the wave’s effect on it. This is a simple inverse relationship with distance.

**Speed Attenuation:** Remember `distDelta` from `MouseTrail.js`? We stored it in the ‘A’ channel of our texture. We use it here to scale the wave’s weight. If the mouse moves too slowly, `distDelta` is small, which weakens the wave. This prevents a stationary or slow-moving mouse from creating a huge, overpowering wave.

#### Wave frequency and weighted average for subtler wave fronts

```
float waveHeight  = 0.0;
float totalWeight = 0.0;
for ( int i = 0; i < uTrailCount; i++ ) {
    ...

    waveHeight  += weight * cos( uWaveFreq * relDist );
    totalWeight += weight;
}
// Weighted average: overlapping waves average rather than stack,
// cancelling chaotic superposition while preserving single-wave peaks.
waveHeight /= max( totalWeight, 1.0 );
```

Before adding the calculated weight to the `waveHeight` of each cube, we oscillate it with a cosine function, controlled by the wave frequency uniform. By using a higher wave frequency, you could enable multiple wavefronts instead of a single wavefront from your mouse swipes. But for the sake of a subtle aesthetic, let’s keep the wave frequency at a lower number ~1.

If multiple waves from different parts of the trail overlap, simply adding their heights can create chaotic, spiky, and visually jarring superpositions. To avoid this, we calculate a `totalWeight` for all contributing waves and then compute a weighted average of their heights. This ensures that when waves overlap, they blend together smoothly, creating a more subtle and pleasing effect while still allowing single, strong waves to reach their full height.

#### Wave jitter effect

```
vec2 jitter  = hash2( aOffset ) * uJitter;
vec2 worldXZ = aOffset + jitter;
```

If you want to break up the perfect circles of the waves, just sprinkle in a bit of “jitter”. We use a simple hash function based on the cube’s static world position (`aOffset`) to generate a deterministic, pseudo-random offset for each cube. This `jitter` is applied before the wave calculations, slightly shifting each cube’s position in the wave field.

### Using the wave height to mix colors

This feature has arguably the most profound impact to the visual identity of the scene, yet it is the easiest to implement! Until now our cubes are very monotonic; adding a new color changes everything. By passing the calculated `vHeight` from the vertex shader to the fragment shader, we can then use this height to mix between a base color and a highlight color.

```
// inside material.onBeforeCompile
shader.fragmentShader = shader.fragmentShader
    .replace(
        "#include <common>",
        `#include <common>
        varying float vHeight;
        uniform vec3  uColorBase;
        uniform vec3  uColorHigh;
        uniform float uMaxHeight;`
    )
    .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float t = clamp( vHeight / uMaxHeight, 0.0, 1.0 );
        diffuseColor.rgb = mix( uColorBase, uColorHigh, t );`
    );
```

This simple addition really makes the waves “pop” visually, with the peaks glowing in the highlight color and the rest of the wave tinted in a smooth gradient towards the base color.

### Don’t forget the shadows!

Here’s a crucial detail: for our shadows to look correct, the objects in the shadow map pass must be deformed in exactly the same way as the objects in the main camera pass. If they don’t match, you’ll get weird artifacts where shadows don’t line up with the objects casting them.

Three.js makes this easy. `InstancedMesh` has a `customDepthMaterial` property. We can create a separate `MeshDepthMaterial`, give it the exact same `onBeforeCompile` vertex shader logic, and assign it. This ensures our wavy shadows are perfectly in sync with our wavy cubes.

```
// inside setGrid()
const depthMaterial = new THREE.MeshDepthMaterial();

depthMaterial.onBeforeCompile = (shader) => {
    // ... copy all uniforms from the main material ...
    shader.uniforms.uWaveSpeed = { value: this.params.waveSpeed };
    // ... etc ...

    // Use the exact same vertex shader override
    shader.vertexShader = this.overrideVertexShader(
        shader.vertexShader,
    );
};

this.instancedMesh.customDepthMaterial = depthMaterial;
```

### Update scene background

Previously I’ve noticed sudden dark flashes in the gaps between cubes as my mouse is moving around the screen. To prevent this issue, we should ensure the background color matches the shade of the base color of the cubes. When the user changes the `colorBase` in the GUI, we’ll update both the shader uniform and the scene’s background property.

```
// inside contructor()
this.scene.background = new THREE.Color(this.params.colorBase).multiplyScalar(0.5); // half of colorBase for a more subtle background

// inside setGUI()
this.gui
    .addColor(this.params, "colorBase")
    .name("Base Color")
    .onChange((v) => {
        if (this.shaderRef)
            this.shaderRef.uniforms.uColorBase.value.set(v);
        this.scene.background = new THREE.Color(v).multiplyScalar(0.5); // half of uColorBase for a more subtle background
    });
```

## Post-processing magic

Our scene is looking good, but let’s be honest, it’s a bit too… clean. To give the scene a more stylized look, we’re going to need post-processing. Post-processing allows us to apply full-screen effects to our rendered scene, much like applying a filter to a photograph. It’s a powerful way to define the mood and aesthetic of your work.

For this project, we’ll create a custom effect that combines a subtle **vignette** (darkening the corners) with a **chromatic aberration** (splitting the color channels). This will add to the scene a slightly dreamy, retro-futuristic vibe, as if viewed through a vintage camera lens.

#### The `EffectComposer`

First, we need to set up an `EffectComposer` in our `Renderer.js` file. This is Three.js’s tool for chaining together different post-processing passes.

The setup is straightforward. We create an `EffectComposer` and add a few essential passes:

1.  **`RenderPass`**: This is the foundational pass. It takes our scene and camera and renders the scene as-is, providing the input for the subsequent effects.
2.  **`ShaderPass`**: This is where our custom magic happens. We’ll feed it our own `VignetteRGBShiftShader` to manipulate the image.
3.  **`OutputPass`**: This is the final step. It takes the result from the previous passes and renders it to the screen.

Here’s how it looks in `Renderer.js`:

```
// ...
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { VignetteRGBShiftShader } from "./Effects/VignetteRGBShiftShader.js";

export default class Renderer {
    // ...
    setPostProcessing() {
        this.composer = new EffectComposer(this.instance);
        this.renderPass = new RenderPass(this.scene, this.camera.instance);
        this.composer.addPass(this.renderPass);

        this.vignetteRGBShiftPass = new ShaderPass(VignetteRGBShiftShader);
        this.vignetteRGBShiftPass.uniforms.shiftAmount.value = 0.005; // Adjust the intensity of the RGB shift
        this.vignetteRGBShiftPass.uniforms.vignetteRadius.value = 0.3; // Adjust where the effect starts (0.0 to 1.0)
        this.vignetteRGBShiftPass.uniforms.vignetteSoftness.value = 0.3; // Adjust the falloff smoothness of the effect
        this.composer.addPass(this.vignetteRGBShiftPass);

        this.outputPass = new OutputPass();
        this.composer.addPass(this.outputPass);
    }
    // ...
    update() {
        // render via composer when you have post-processing effects
        this.composer.render();
    }
}
```

#### The Custom `VignetteRGBShiftShader`

Now for the home-made post-processing recipe! You may wonder that there are built-in effects for Vignette and RGBShift, why make a custom shader? The answer is simple: what I’m trying to achieve is a blended effect of the two; using the vignette as a mask to apply the chromatic aberration effect. Also, to add more depth to the scene, we scale the color shift based on the strength of the vignette mask.

Here’s how the fragment shader is implemented in `VignetteRGBShiftShader.js`:

```
// ...
void main() {
  // 1. Calculate distance from the center of the screen
  vec2 center = vec2(0.5);
  float dist = distance(vUv, center);

  // 2. Create the vignette mask
  float vignetteFactor = smoothstep(vignetteRadius, vignetteRadius + vignetteSoftness, dist);

  // 3. Scale the shift intensity based on the vignette mask
  float currentShift = shiftAmount * vignetteFactor;

  // 4. Sample the color channels with the dynamic shift
  float r = texture2D(tDiffuse, vUv + vec2(currentShift, currentShift)).r;
  float g = texture2D(tDiffuse, vUv).g;
  float b = texture2D(tDiffuse, vUv - vec2(currentShift, currentShift)).b;

  // 5. Apply a standard darkening vignette overlay
  float darken = 1.0 - vignetteFactor * 0.5;

  gl_FragColor = vec4(vec3(r, g, b) * darken, 1.0);
}
```

Before and After:

![before postprocessing was added](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/before-1200x724.jpg.webp?x23502)

![after postprocessing was added](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/after-1200x728.jpg.webp?x23502)

## Production-ready optimizations

The code you see has been optimized well for production release, but I think it’s helpful to list out what I’ve optimized before releasing this online.

-   **Reduced texture loop iterations**: Reduced `MAX_TRAIL` from 200 to 128 for data texture width and the vertex shader. This reduced the shader computation cost, lowering GPU pressure.
-   **Efficient Texture Management:** Added conditional checks to skip `needsUpdate` on the trail data texture when no points are active, reducing unnecessary CPU-to-GPU data transfers.
-   **Shader Optimization:** Simplified the wave height calculation in the vertex shader by skipping the bottom vertices of the cubes, which are not visible and don’t contribute to the final visual effect. This further reduces the computational load by 50% without affecting the visual quality.

### Workaround for mobile devices

There was a significant problem for mobile devices; they don’t have a mouse pointer to trigger the waves! Although the user could still swipe on the screen with fingers to trigger the same pointermove events, but that is not intuitive, especially when my landing page is taking up all the screen space already, with no scrolling needed.

I came up with a simple fix: to start adding random points to the trail after 3 seconds of inactivity, and stop when the user touches the screen or moves the mouse. Moreover, the page starts with `isPlacingRandomPoint = true`, so that some waves will start rippling across even if the mobile user hasn’t touched or swiped the screen yet.

## Customize your wave grid!

This is the end of my tutorial and thank you for reading this far. Finally, who doesn’t love a scene with params to play and tweak around with? Here are some fun examples of what could be achieved to change the visual style of the grid:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/v1-1200x656.png?x23502)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/v4-1200x637.png.webp?x23502)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/v3-1200x624.png.webp?x23502)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/v2-1200x627.png.webp?x23502)

**Credits:** landing page overlay design from the [free template](https://www.framer.com/community/marketplace/templates/portez/).