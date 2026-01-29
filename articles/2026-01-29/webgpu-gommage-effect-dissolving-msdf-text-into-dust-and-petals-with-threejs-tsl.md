---
title: "WebGPU Gommage Effect: Dissolving MSDF Text into Dust and Petals with Three.js & TSL"
source: "https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/"
publishedDate: "2026-01-28"
category: "design"
feedName: "Codrops"
author: "Thibault Introvigne"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/gommage-1.webp?x92538)](https://tympanus.net/Tutorials/WebGPUGommage "WebGPU Gommage Effect: Dissolving MSDF Text into Dust and Petals with Three.js & TSL Demo")

We’re going to build a small WebGPU “moment”: a piece of MSDF text in a Three.js scene that disintegrates over time, shedding dust and petals as it fades away. It’s inspired by the [Gommage](https://clair-obscur.fandom.com/wiki/Gommage) effect from _Clair Obscur: Expedition 33_, but the goal here is practical: use the idea as a reason to explore modern Three.js WebGPU + TSL workflows in a project that’s visually rewarding and technically real.

The tutorial is step-by-step on purpose: we’ll start from a blank project, then add one system at a time (text, dissolve, particles, post-processing), keeping everything easy to tweak and understand. If you’d rather skip around, each section links to the matching GitHub commit so you can jump straight to the part you care about.

**What you’ll learn:**

-   Use TSL to build shader logic and post-processing
-   Render MSDF text in a Three.js scene
-   Create a noise-driven dissolve effect
-   Spawn and animate dust particles with `InstancedMesh`
-   Spawn petal particles with bend + spin
-   Add selective bloom with MRT nodes

This tutorial is long on purpose. It’s written step by step so you can understand why each part works. If you’d rather jump around, each section links to the matching [GitHub commit](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops)!

Here is the final result:

## 0\. Inspiration

In 2025 I played _Clair Obscur: Expedition 33_ and found the whole experience amazing ([and apparently I wasn’t the only one](https://thegameawards.com/winners/game-of-the-year)). I wanted to give an homage to the game by recreating the “Gommage”, a curse that makes people disappear, leaving only a trail of flower petals once they reach a certain age (play the game, it will all make sense).

Yep, it’s very dramatic but let’s get over it and analyze it a bit. If we simplify it, we can see three things happening:

-   A disintegration/dissolve effect.
-   Small specks of dust flying out.
-   Red petals flowing out (we will also use white petals in our experience to bring some variety).

Let’s implement all that!

## 1\. Base Setup for Three.js

> Don’t hesitate to check the demo GitHub repository to follow along, each commit match a section of this tutorial! [Check out this section’s commit.](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/tree/26504869f059250719f93caa645729eefb27005b)

Start with a project containing just an `index.html` file and `base.css` files. First things first, let’s install Vite and Three.js:

```
npm install -D vite
npm i three@0.181.0
```

Now create a `/src` folder and inside it create an `experience.js` file, reference it in `index.html` and style the canvas in `base.css`.

```
//index.html

<script type="module" src="/src/experience.js"></script>
```

```
// base.css

canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

Now we’re going to create an Experience class in `experience.js` that will contain the base code for Three.js. I won’t go into much detail for this part as it’s pretty common, just make sure to respect the camera parameters and position!

Note that I also added a test cube to check that everything is working well.

```
//experience.js

import * as THREE from "three/webgpu";

export class Experience {

  #threejs = null;
  #scene = null;
  #camera = null;
  #cube = null;

  constructor() {}

  async initialize(container) {
    await this.#setupProject(container);
    window.addEventListener("resize",  this.#onWindowResize_.bind(this), false);
    this.#raf();
  }

  async #setupProject(container) {
    this.#threejs = new THREE.WebGPURenderer({ antialias: true });
    await this.#threejs.init();

    this.#threejs.shadowMap.enabled = false;
    this.#threejs.toneMapping = THREE.ACESFilmicToneMapping;
    this.#threejs.setClearColor(0x111111, 1);
    this.#threejs.setSize(window.innerWidth, window.innerHeight);
    this.#threejs.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.#threejs.domElement);

    // Camera Setup !
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 25;
    this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.#camera.position.set(0, 0, 5);
    this.#scene = new THREE.Scene();

    this.createCube();
  }

  createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.#cube = new THREE.Mesh(geometry, material);
    this.#scene.add(this.#cube);
  }

  #onWindowResize_() {
    this.#camera.aspect = window.innerWidth / window.innerHeight;
    this.#camera.updateProjectionMatrix();
    this.#threejs.setSize(window.innerWidth, window.innerHeight);
  }


  #render() {
    this.#threejs.render(this.#scene, this.#camera);
  }


  #raf() {
    requestAnimationFrame(t => {
      this.#cube.rotation.x += 0.001;
      this.#cube.rotation.y += 0.001;
      this.#render();
      this.#raf();
    });
  }
}

new Experience().initialize(document.querySelector("#canvas-container"));
```

## 2\. Displaying the MSDF text

> Don’t hesitate to check the demo GitHub repository to follow along, each commit matches a section of this tutorial! [Check out this section’s commit.](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/tree/5465bb40ec45520c6ffe4baf2dcb045735b0c678)

Now a bit of context about how to display text in a Three.js scene.

SDF (Signed Distance Field Fonts) and its alternative MSDF (Multi-channel Signed Distance Field) are font rendering formats where glyph distances are encoded in RGB format.

So basically to use an MSDF font you need 3 things:

-   A glyph atlas texture, usually a .png file
-   A font metadata file, usually a .json
-   A shader/material to render the final font

Initially, I wanted to use the [Troika library](https://www.npmjs.com/package/troika-three-text) that uses SDF text but at the time of writing this article the lib was not compatible with WebGPU and TSL, so I had to find a replacement.

After some research I found the library [Three MSDF Text](https://github.com/leochocolat/three-msdf-text-utils) by Léo Mouraire, and it was perfect for the use case, compatible with WebGPU, and it even used an MSDFTextNodeMaterial that will be perfect to use with TSL!

Now we just need a tool to convert a font to be usable with MSDF, and [this library](https://github.com/soimy/msdf-bmfont-xml) by Shen Yiming, is perfect for that. Clair Obscur uses the Cinzel font from [Google Fonts](https://fonts.google.com/specimen/Cinzel), so convert it with this command after downloading the font:

```
msdf-bmfont Cinzel-Regular.ttf \
-f json \
-o Cinzel.png \
--font-size 64 \
--distance-range 16 \
--texture-padding 8 \
--border 2 \
--smart-size
```

Let’s just spend a few moments on the options here.

When generating the MSDF, depending on your params, your final text can contain visual artifacts or not look good at every zoom level.

A better quality atlas also means a heavier PNG file, so it’s important to find a balance.

-   **font-size**: Bigger font size means more detail for the glyphs, but it’ll take more space in the atlas (again, a heavier file).
-   **distance-range**: The bigger the range, the more we can enhance/reduce the fonts without artifacts.
-   **texture-padding**: Empty space between the glyphs — one of the most important params to avoid artifacts and bleeding.
-   **border**: Adds some space between the glyphs and the border of the texture.
-   **smart-size**: Shrinks the atlas to the smallest possible square.

Put the final files in `/public/fonts/Cinzel/`

Keep in mind that even with good settings some typefaces convert more cleanly to MSDF than others. And that gives us the PNG and JSON files that we need to display our MSDF Text!

> If you prefer, you can get the converted font directly from the [demo GitHub repository.](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/tree/master/public/fonts/Cinzel)

Now install the three-msdf-text-utils library that we’ll use for displaying the text:

```
npm i three-msdf-text-utils@^1.2.1
```

Also, remove everything related to our test cube (function and animation) in experience.js. Let’s create 2 new files: `gommageOrchestrator.js`, which will organize the different effects and `msdfText.js`, which will be responsible for displaying the MSDF text. We’ll start with `msdfText.js`, to load our PNG atlas use a texture loader and a simple fetch for our JSON file.

```
//msdfText.js

import * as THREE from "three/webgpu";
import { MSDFTextGeometry, MSDFTextNodeMaterial } from "three-msdf-text-utils";

export default class MSDFText {
constructor() {
}

async initialize(text = "WebGPU Gommage Effect", position = new THREE.Vector3(0, 0, 0)) {
  // Load font data
  const response = await fetch("/fonts/Cinzel/Cinzel.json");
  const fontData = await response.json();

  // Load font atlas
  const textureLoader = new THREE.TextureLoader();
  const fontAtlasTexture = await textureLoader.loadAsync("/fonts/Cinzel/Cinzel.png");
  fontAtlasTexture.colorSpace = THREE.NoColorSpace;
  fontAtlasTexture.minFilter = THREE.LinearFilter;
  fontAtlasTexture.magFilter = THREE.LinearFilter;
  fontAtlasTexture.wrapS = THREE.ClampToEdgeWrapping;
  fontAtlasTexture.wrapT = THREE.ClampToEdgeWrapping;
  fontAtlasTexture.generateMipmaps = false;

  // Create text geometry
  const textGeometry = new MSDFTextGeometry({
      text,
      font: fontData,
      width: 1000,
      align: "center",
  });

  const textMaterial = new MSDFTextNodeMaterial({
      map: fontAtlasTexture,
  });
  // Adjust to remove visual artifacts
  textMaterial.alphaTest = 0.1;
  const mesh = new THREE.Mesh(textGeometry, textMaterial);

  // With this we make the height of lineHeight 0.3 world units
  const targetLineHeight = 0.3;
  const lineHeightPx = fontData.common.lineHeight;
  let textScale = targetLineHeight / lineHeightPx;

  mesh.scale.set(textScale, textScale, textScale);
  const meshOffset = -(textGeometry.layout.width / 2) * textScale;
  mesh.position.set(position.x + meshOffset, position.y, position.z);
  mesh.rotation.x = Math.PI;
  return mesh;

  }
}
```

Notice the part where we compute the text scale depending on the variable `targetLineHeight = 0.4`. By default the text geometry is expressed in font pixels (`based on fontData.common.lineHeight`). That’s why it appears extremely large at first, often too large to even be displayed on the screen! The trick is to compute a scale factor using `targetLineHeight/lineHeightPx` to convert the font’s pixel metrics into the desired line height in world units.

If the text appears too big for your current screen feel free to adjust the `targetLineHeight`! We can check that it works well by instantiating the MSDFText entity in `experience.js`.

```
//experience.js

...
async #setupProject(container) {
  ...
  const MSDFTextEntity = new MSDFText();
  const msdfText = await MSDFTextEntity.initialize();
  this.#scene.add(msdfText);
}
...
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/image-1-scaled.png?x92538)

And here is our text! Before we leave `experience.js`, let’s do a small adjustment to the `onWindowResize` function to make our experience responsive.

```
//experience.js
...  
#onWindowResize_() {
  const HORIZONTAL_FOV_TARGET = THREE.MathUtils.degToRad(45);
  this.#camera.aspect = window.innerWidth / window.innerHeight;
  const verticalFov = 2 * Math.atan(Math.tan(HORIZONTAL_FOV_TARGET / 2) / this.#camera.aspect);
  this.#camera.fov = THREE.MathUtils.radToDeg(verticalFov);
  this.#camera.updateProjectionMatrix();
  this.#threejs.setSize(window.innerWidth, window.innerHeight);
}
```

Since the text is centered, we want the camera’s horizontal FOV to stay constant (45°) so the framing doesn’t change when the viewport resizes.

Three.js stores the camera FOV as a vertical FOV, so on resize we recompute the corresponding vertical FOV from the current aspect ratio and update the projection matrix.

And let’s not forget to call it in the `setupProject` for the initial load.

```
//experience.js

...
async #setupProject(container) {
  ...
  this.#onWindowResize_();
  this.#scene = new THREE.Scene();
  ...
}
...
```

Now, before we finish this part, put the logic to create our MSDF Text in our new file `gommageOrchestrator.js`

```
//gommageOrchestrator.js

import * as THREE from "three/webgpu";
import MSDFText from "./msdfText.js";
export default class GommageOrchestrator {
  constructor() {
  }

  async initialize(scene) {
      const MSDFTextEntity = new MSDFText();
      const msdfText = await MSDFTextEntity.initialize("WebGPU Gommage Effect", new THREE.Vector3(0, 0, 0));
      scene.add(msdfText);
  }
}
```

And use it in `experience.js`:

```
//experience.js

...
async #setupProject(container) {
  ...
  // const MSDFTextEntity = new MSDFText();
  // const msdfText = await MSDFTextEntity.initialize();
  // this.#scene.add(msdfText);
  const gommageOrchestratorEntity = new GommageOrchestrator();
  await gommageOrchestratorEntity.initialize(this.#scene)
}
...
```

Okay we have our text on the screen, great job 🔥

## 3\. Dissolving the text

> Don’t hesitate to check the demo GitHub repository to follow along, each commit match a section of this tutorial! [Check out this section’s commit.](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/tree/9b5b3672356bfca3a09b9d9088afdbb9f820a295)

Ok, now let’s get our first TSL effect down!

The process to dissolve the text is quite simple, we’ll use a Perlin texture and depending on a progress value going from 0 to 1, we’ll set a threshold that progressively hides parts of the text until it’s all gone. For the Perlin Texture I used one found on the Screaming brain studios website: [https://screamingbrainstudios.com/downloads/](https://screamingbrainstudios.com/downloads/)

> If you want to use the same one as me, you can also get the texture directly from the [demo GitHub repository.](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops)

Put it in `/public/textures/perlin.webp` and load it in `msdfText.js`

```
//msdfText.js

...
async initialize(text = "WebGPU Gommage Effect", position = new THREE.Vector3(0, 0, 0)) {
  ...
  const perlinTexture = await textureLoader.loadAsync("/textures/perlin.webp");
  perlinTexture.colorSpace = THREE.NoColorSpace;
  perlinTexture.minFilter = THREE.LinearFilter;
  perlinTexture.magFilter = THREE.LinearFilter;
  perlinTexture.wrapS = THREE.RepeatWrapping;
  perlinTexture.wrapT = THREE.RepeatWrapping;
  perlinTexture.generateMipmaps = false;
  
  // Create text geometry
  ...
```

We’ll need to customize our text material, and that’s where TSL is going to be useful! Let’s create a function for that and use it when we instance our text mesh.

```
//msdfText.js
 
...
async initialize(text = "WebGPU Gommage Effect", position = new THREE.Vector3(0, 0, 0)) {
    ...
    const textMaterial = this.createTextMaterial(fontAtlasTexture, perlinTexture)
    ...
  }
...
createTextMaterial(fontAtlasTexture, perlinTexture) {
    const textMaterial = new MSDFTextNodeMaterial({
        map: fontAtlasTexture,
    });

    return textMaterial;
}
...
```

To see our Perlin Texture, let’s display it on our text!

```
//msdfText.js

...
createTextMaterial(fontAtlasTexture, perlinTexture) {
    const textMaterial = new MSDFTextNodeMaterial({
        map: fontAtlasTexture,
    });

    const glyphUv = attribute("glyphUv", "vec2");

    const perlinTextureNode = texture(perlinTexture, glyphUv);
    const boostedPerlin = pow(perlinTextureNode, 4);

    textMaterial.colorNode = boostedPerlin;

    return textMaterial;
}
...
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/image-4.png?x92538)

Note that we are using the `glyphUv`, which according to the three-msdf-text-utils doc represents the UV coordinates of each individual letter. Since the noise is very subtle we can use a power to visualize it better on the letters.

To test our dissolve effect, let’s hide parts of the text where the noise value is above a given threshold.

```
//msdfText.js

...
createTextMaterial(fontAtlasTexture, perlinTexture) {
    const textMaterial = new MSDFTextNodeMaterial({
        map: fontAtlasTexture,
        transparent: true,
    });

    const glyphUv = attribute("glyphUv", "vec2");

    const perlinTextureNode = texture(perlinTexture, glyphUv);
    const boostedPerlin = pow(perlinTextureNode, 2);
    const dissolve = step(boostedPerlin, 0.5);

    textMaterial.colorNode = boostedPerlin;
    const msdfOpacity = textMaterial.opacityNode;
    textMaterial.opacityNode = msdfOpacity.mul(dissolve);


    return textMaterial;
}
...
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/image-5.png?x92538)

And that’s the basic logic behind the dissolve effect!

Now it’s a good time to introduce a great debugger tool, Tweakpane. We’ll use it to trigger the dissolving effect, let’s install it.

```
npm i tweakpane
```

For my projects, I like to create a singleton file dedicated to Tweakpane that I can just import anywhere. Let’s create a `debug.js` file.

```
// debug.js

import { Pane } from "tweakpane";

export const DEBUG_FOLDERS = {
  MSDF_TEXT: "MSDFText",
};

class Debug {
  static instance = null;
  static ENABLED = true;

  #pane = null;
  #baseFolder = null;
  #folders = new Map();

  static getInstance() {
      if (Debug.instance === null) {
          Debug.instance = new Debug();
      }
      return Debug.instance;
  }
  constructor() {
    if (Debug.ENABLED) {
      this.#pane = new Pane();
      this.#baseFolder = this.#pane.addFolder({ title: "Debug" });
      this.#baseFolder.expanded = false;
    }
  }
  createNoOpProxy() {
    const handler = {
      get: () => (..._args) => this.createNoOpProxy(),
    };
    return new Proxy({}, handler);
  }

  getFolder(name) {
    if (!Debug.ENABLED) {
      return this.createNoOpProxy();
    }
    const existing = this.#folders.get(name);
    if (existing) {
      return existing;
    }
    const folder = this.#baseFolder.addFolder({ title: name });
    this.#folders.set(name, folder);
    return folder;
  }
}

export default Debug;
```

I won’t go into too much detail about the implementation, but thanks to this Debug class we can add debug folders and options easily and disable it altogether if needed by switching the ENABLED variable.

Let’s use it in our MSDF material to control the progress of the effect:

```
//msdfText.js
...
import Debug, { DEBUG_FOLDERS } from "./debug.js";
...

createTextMaterial(fontAtlasTexture, perlinTexture) {
  const debugFolder = Debug.getInstance().getFolder(DEBUG_FOLDERS.MSDF_TEXT);

  const textMaterial = new MSDFTextNodeMaterial({
      map: fontAtlasTexture,
      transparent: true,
  });

  const glyphUv = attribute("glyphUv", "vec2");

  const uProgress = uniform(0.0);

  debugFolder.addBinding(uProgress, "value", {
      min: 0,
      max: 1,
      label: "progress",
  });
  
  const perlinTextureNode = texture(perlinTexture, glyphUv);
  const boostedPerlin = pow(perlinTextureNode, 2);
  const dissolve = step(uProgress, boostedPerlin);

  textMaterial.colorNode = boostedPerlin;
  const msdfOpacity = textMaterial.opacityNode;
  textMaterial.opacityNode = msdfOpacity.mul(dissolve);


  return textMaterial;
}
```

By playing with the progress slider we can see the effect dissolving live, but there’s a problem, the effect is way too uniform, each glyph dissolves in the exact same way.

To get a more organic effect we can use a new attribute from the MSDF lib `center`, that introduces an offset for each letter. We can further customize the feel of the dissolve by multiplying the `center` and `glyphUv` attributes.

To better visualize the change let’s create two uniforms, `uCenterScale` and `uGlyphScale`, and add them to our debug folder.

```
//msdfText.js
...
createTextMaterial(fontAtlasTexture, perlinTexture) {
  const textMaterial = new MSDFTextNodeMaterial({
      map: fontAtlasTexture,
      transparent: true,
  });

  const glyphUv = attribute("glyphUv", "vec2");
  const center = attribute("center", "vec2");

  const uProgress = uniform(0.0);
  const uCenterScale = uniform(0.05);
  const uGlyphScale  = uniform(0.75);
  
  const customUv = center.mul(uCenterScale).add(glyphUv.mul(uGlyphScale));
  
  const debugFolder = Debug.getInstance().getFolder(DEBUG_FOLDERS.MSDF_TEXT);
  debugFolder.addBinding(uProgress, "value", {
      min: 0,
      max: 1,
      label: "progress",
  });
  debugFolder.addBinding(uCenterScale, "value", {
      min: 0,
      max: 1,
      label: "centerScale",
  });
  debugFolder.addBinding(uGlyphScale, "value", {
      min: 0,
      max: 1,
      label: "glyphScale",
  });

  const perlinTextureNode = texture(perlinTexture, customUv);
  const dissolve = step(uProgress, perlinTextureNode);

  textMaterial.colorNode = perlinTextureNode;
  const msdfOpacity = textMaterial.opacityNode;
  textMaterial.opacityNode = msdfOpacity.mul(dissolve);


  return textMaterial;
}
...
```

Feel free to test with different values for `uCenterScale` and `uGlyphScale` to see how they impact the dissolve, a lower `uGlyphScale` will result in bigger chunks dissolving for instance. If you used the same texture and params for the noise as I did, you’ll notice that by the time progress reaches 0.7 the text has fully dissolved and that’s because Perlin textures rarely use the full 0–1 range evenly.

Let’s remap the noise so that values below `uNoiseRemapMin` become 0 and the values above `uNoiseRemapMax` become 1, and everything in between is normalized to 0–1. This makes the dissolve timing more consistent over the `uProgress` range:

```
//msdfText.js
...
createTextMaterial(fontAtlasTexture, perlinTexture) {
  const textMaterial = new MSDFTextNodeMaterial({
      map: fontAtlasTexture,
      transparent: true,
  });

  const glyphUv = attribute("glyphUv", "vec2");
  const center = attribute("center", "vec2");

  const uProgress = uniform(0.0);
  const uNoiseRemapMin = uniform(0.4);
  const uNoiseRemapMax = uniform(0.87);
  const uCenterScale = uniform(0.05);
  const uGlyphScale  = uniform(0.75);
  
  const customUv = center.mul(uCenterScale).add(glyphUv.mul(uGlyphScale));
  
  const debugFolder = Debug.getInstance().getFolder(DEBUG_FOLDERS.MSDF_TEXT);
  debugFolder.addBinding(uProgress, "value", {
      min: 0,
      max: 1,
      label: "progress",
  });
  debugFolder.addBinding(uCenterScale, "value", {
      min: 0,
      max: 1,
      label: "centerScale",
  });
  debugFolder.addBinding(uGlyphScale, "value", {
      min: 0,
      max: 1,
      label: "glyphScale",
  });

  const perlinTextureNode = texture(perlinTexture, customUv);
  const perlinRemap = clamp(
      perlinTextureNode.sub(uNoiseRemapMin).div(uNoiseRemapMax.sub(uNoiseRemapMin)),
      0,
      1
    );
  const dissolve = step(uProgress, perlinRemap);

  textMaterial.colorNode = perlinRemap;
  const msdfOpacity = textMaterial.opacityNode;
  textMaterial.opacityNode = msdfOpacity.mul(dissolve);


  return textMaterial;
}
...
```

Now for the final touch let’s use two colors for the text: the normal one and a desaturated version, so that they blend during the effect progression.

```
//msdfText.js
...
createTextMaterial(fontAtlasTexture, perlinTexture) {
  const textMaterial = new MSDFTextNodeMaterial({
      map: fontAtlasTexture,
      transparent: true,
  });

  const glyphUv = attribute("glyphUv", "vec2");
  const center = attribute("center", "vec2");

  const uProgress = uniform(0.0);
  const uNoiseRemapMin = uniform(0.4);
  const uNoiseRemapMax = uniform(0.87);
  const uCenterScale = uniform(0.05);
  const uGlyphScale = uniform(0.75);
  const uDissolvedColor = uniform(new THREE.Color("#5E5E5E"));
  const uDesatComplete = uniform(0.45);
  const uBaseColor = uniform(new THREE.Color("#ECCFA3"));

  const customUv = center.mul(uCenterScale).add(glyphUv.mul(uGlyphScale));

  const debugFolder = Debug.getInstance().getFolder(DEBUG_FOLDERS.MSDF_TEXT);
  debugFolder.addBinding(uProgress, "value", {
      min: 0,
      max: 1,
      label: "progress",
  });
  debugFolder.addBinding(uCenterScale, "value", {
      min: 0,
      max: 1,
      label: "centerScale",
  });
  debugFolder.addBinding(uGlyphScale, "value", {
      min: 0,
      max: 1,
      label: "glyphScale",
  });

  const perlinTextureNode = texture(perlinTexture, customUv).x;
  const perlinRemap = clamp(
      perlinTextureNode.sub(uNoiseRemapMin).div(uNoiseRemapMax.sub(uNoiseRemapMin)),
      0,
      1
  );
  const dissolve = step(uProgress, perlinRemap);
  const desaturationProgress = smoothstep(float(0.0), uDesatComplete, uProgress);

  const colorMix = mix(uBaseColor, uDissolvedColor, desaturationProgress);
  textMaterial.colorNode = colorMix;
  const msdfOpacity = textMaterial.opacityNode;
  textMaterial.opacityNode = msdfOpacity.mul(dissolve);
  return textMaterial;
}

...
```

And that’s it for the Text Material ! Let’s make a little change: the `uProgress` uniform will be used for our other particle effects, so it’ll be more convenient to create it in `gommageOrchestrator.js` and pass it as a parameter.

```
//gommageOrchestrator.js
...
export default class GommageOrchestrator {
  constructor() {
  }

  async initialize(scene) {
      const uProgress = uniform(0.0);
      const msdfText = await MSDFTextEntity.initialize("WebGPU Gommage Effect", new THREE.Vector3(0, 0, 0), uProgress);
      scene.add(msdfText);
  }
}
```

```
//msdfText.js
...
export default class MSDFText {
  constructor() {
  }

  async initialize(text = "WebGPU Gommage Effect", position = new THREE.Vector3(0, 0, 0), uProgress) {
    ....
    const textMaterial = this.createTextMaterial(fontAtlasTexture, perlinTexture, uProgress);
    ...
  }
  createTextMaterial(fontAtlasTexture, perlinTexture, uProgress) {
    // Delete the uProgress declaration inside the function
    // We can also remove the other debug params
  }
```

Finally create a debug button that will trigger our Gommage (and another to reset it). GSAP will be perfect for that:

```
npm i gsap
```

Now we can add the debug buttons in `gommageOrchestrator.js`.

```
//gommageOrchestrator.js
...
async initialize(scene) {
    ...
  const GommageButton = debugFolder.addButton({
      title: "GOMMAGE",
  });
  const ResetButton = debugFolder.addButton({
      title: "RESET",
  });
  GommageButton.on("click", () => {
      this.triggerGommage();
  });
  ResetButton.on("click", () => {
      this.resetGommage();
  });
}

triggerGommage() {
    gsap.to(this.#uProgress, {
        value: 1,
        duration: 4,
        ease: "linear",
    });
}

resetGommage() {
    this.#uProgress.value = 0;
}
```

## 4\. Adding the Dust particles

> Don’t hesitate to check the demo GitHub repository to follow along, each commit match a section of this tutorial! [Check out this section’s commit.](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/tree/9b5b3672356bfca3a09b9d9088afdbb9f820a295)

Usually in WebGL for particles such as dust which are just texture on a plane we would use a Points primitive. Unfortunately with WebGPU there is a big limitation: variable point size is not supported, so all points appear the size of 1 pixel. Not really suited for displaying a texture. So instead there are two options: Sprites or Instanced Mesh. Both would be working fine for our dust but since we are going to implement Petals in the next section, let’s keep the same logic between the two particle systems, so Instanced Mesh it is. Now let’s create a new `dustParticles.js` file:

```
//dustParticles.js

import * as THREE from "three/webgpu";

export default class DustParticles {
  constructor() { }

  #spawnPos;
  #birthLifeSeedScale;
  #currentDustIndex = 0;
  #dustMesh;
  #MAX_DUST = 100;

  async initialize(perlinTexture, dustParticleTexture) {
    
    const dustGeometry = new THREE.PlaneGeometry(0.02, 0.02);
    this.#spawnPos = new Float32Array(this.#MAX_DUST * 3);
    // Combined 4 attributes into one to not go above the 9 attribute limit for webgpu
    this.#birthLifeSeedScale = new Float32Array(this.#MAX_DUST * 4);
    this.#currentDustIndex = 0;

    dustGeometry.setAttribute(
        "aSpawnPos",
        new THREE.InstancedBufferAttribute(this.#spawnPos, 3)
    );
    dustGeometry.setAttribute(
        "aBirthLifeSeedScale",
        new THREE.InstancedBufferAttribute(this.#birthLifeSeedScale, 4)
    );

    const material = this.createDustMaterial(perlinTexture, dustParticleTexture);
    this.#dustMesh = new THREE.InstancedMesh(dustGeometry, material, this.#MAX_DUST);
    return this.#dustMesh;
  }

  createDustMaterial(perlinTexture, dustTexture) {
    const material = new THREE.MeshBasicMaterial({
      map: dustTexture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    return material;
  }
}
```

As you can see we have quite a few attributes for our dust, let’s go quickly over them:

-   `aSpawnPos`, will be the starting position of a new dust particle.
-   `aBirthLifeSeedScale`, we pack 4 values into one instanced attribute to reduce WebGPU vertex inputs (InstancedMesh already consumes several). This avoids hitting WebGPU’s vertex buffer attribute limits and breaking the shader (happened during the development of this effect 🥲).
    -   Birth, will contain the timestamp of the particle creation.
    -   Life, is the time in seconds before the particle disappear.
    -   Seed, a random number between 0 and 1 to induce some randomness.
    -   Scale, simply the size of the particle.

Notice that we will also need our perlin texture, to avoid repeating ourselves let’s move all the texture initialization to gommageOrchestrator.js and pass it as a param for both the dust and the MSDFText, and remove everything related to texture loading in `msdfText.js`! Ok now we can load our textures and instantiate the dust in `gommageOrchestrator.js.`

```
//gommageOrchestrator.js
...
export default class GommageOrchestrator {
  ...
  async initialize(scene) {
    const { perlinTexture, dustParticleTexture, fontAtlasTexture } = await this.loadTextures();

    const debugFolder = Debug.getInstance().getFolder(DEBUG_FOLDERS.MSDF_TEXT);
    const MSDFTextEntity = new MSDFText();
    // /!\ Pass the perlinTexture as parameters and remove the previous texture load
    const msdfText = await MSDFTextEntity.initialize("WebGPU Gommage Effect", new THREE.Vector3(0, 0, 0), this.#uProgress, perlinTexture, fontAtlasTexture);
    scene.add(msdfText);

    const DustParticlesEntity = new DustParticles();
    const dustParticles = await DustParticlesEntity.initialize(perlinTexture, dustParticleTexture);
    scene.add(dustParticles);

    const GommageButton = debugFolder.addButton({
        title: "GOMMAGE",
    });
    const ResetButton = debugFolder.addButton({
        title: "RESET",
    });
    GommageButton.on("click", () => {
        this.triggerGommage();
    });
    ResetButton.on("click", () => {
        this.resetGommage();
    });
  }
  ...
  async loadTextures() {
    const textureLoader = new THREE.TextureLoader();

    const dustParticleTexture = await textureLoader.loadAsync("/textures/dustParticle.png");
    dustParticleTexture.colorSpace = THREE.NoColorSpace;
    dustParticleTexture.minFilter = THREE.LinearFilter;
    dustParticleTexture.magFilter = THREE.LinearFilter;
    dustParticleTexture.generateMipmaps = false;

    const perlinTexture = await textureLoader.loadAsync("/textures/perlin.webp");
    perlinTexture.colorSpace = THREE.NoColorSpace;
    perlinTexture.minFilter = THREE.LinearFilter;
    perlinTexture.magFilter = THREE.LinearFilter;
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;
    perlinTexture.generateMipmaps = false;

    const fontAtlasTexture = await textureLoader.loadAsync("/fonts/Cinzel/Cinzel.png");
    fontAtlasTexture.colorSpace = THREE.NoColorSpace;
    fontAtlasTexture.minFilter = THREE.LinearFilter;
    fontAtlasTexture.magFilter = THREE.LinearFilter;
    fontAtlasTexture.wrapS = THREE.ClampToEdgeWrapping;
    fontAtlasTexture.wrapT = THREE.ClampToEdgeWrapping;
    fontAtlasTexture.generateMipmaps = false;

    return { perlinTexture, dustParticleTexture, fontAtlasTexture };
  }
  ...
}
```

Now I don’t know if you noticed but our dust particles are in the scene!

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/image-6-600x600.png?x92538)

Yep that’s the little white dot between the two “M” of “Gommage”, right now we have 100 instanced meshes at the exact same place! Now let’s create the function that will spawn our dust particles in `dustParticles.js`!

```
//dustParticles.js
...
spawnDust(spawnPos) {
  if (this.#currentDustIndex === this.#MAX_DUST) this.#currentDustIndex = 0;
  const id = this.#currentDustIndex;
  this.#currentDustIndex = this.#currentDustIndex + 1;
  this.#spawnPos[id * 3 + 0] = spawnPos.x;
  this.#spawnPos[id * 3 + 1] = spawnPos.y;
  this.#spawnPos[id * 3 + 2] = spawnPos.z;
  this.#birthLifeSeedScale[id * 4 + 0] = performance.now() * 0.001; // Birth time
  this.#birthLifeSeedScale[id * 4 + 1] = 4; // Life duration
  this.#birthLifeSeedScale[id * 4 + 2] = Math.random(); // Random seed
  this.#birthLifeSeedScale[id * 4 + 3] = Math.random() * 0.5 + 0.5; // Random Scale

  this.#dustMesh.geometry.attributes.aSpawnPos.needsUpdate = true;
  this.#dustMesh.geometry.attributes.aBirthLifeSeedScale.needsUpdate = true;
}
...
```

Let’s adapt our material a bit to account for the parameters:

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  const material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
  });

  const aSpawnPos = attribute("aSpawnPos", "vec3");
  const aBirthLifeSeedScale = attribute("aBirthLifeSeedScale", "vec4");
  const aBirth = aBirthLifeSeedScale.x;
  const aLife = aBirthLifeSeedScale.y;
  const aSeed = aBirthLifeSeedScale.z;
  const aScale = aBirthLifeSeedScale.w;

  const dustSample = texture(dustTexture, uv());


  const uDustColor = uniform(new THREE.Color("#8A8A8A"));
  material.colorNode = vec4(uDustColor, dustSample.a);
  material.positionNode = aSpawnPos.add(positionLocal);

  return material;
}
...
```

Now, we should also create a debug button to spawn some dust:

```
    //dustParticles.js
...
debugSpawnDust() {
  for (let i = 0; i < 10; i++) {
    this.spawnDust(
      new THREE.Vector3(
        (Math.random() * 2 - 1) * 0.5,
        (Math.random() * 2 - 1) * 0.5,
        0,
      )
    );
  }
}
...
```

And add it to our debug options in `gommageOrchestrator.js`.

```
//gommageOrchestrator.js
...
export default class GommageOrchestrator {
  ...
  async initialize(scene) {
    ...
    const GommageButton = debugFolder.addButton({
        title: "GOMMAGE",
    });
    const ResetButton = debugFolder.addButton({
        title: "RESET",
    });
    const DustButton = debugFolder.addButton({
        title: "DUST",
    });
    GommageButton.on("click", () => {
        this.triggerGommage();
    });
    ResetButton.on("click", () => {
        this.resetGommage();
    });
    DustButton.on("click", () => {
        DustParticlesEntity.debugSpawnDust();
    });
  }
  ...
}
```

Of course lots of things are missing, back to `dustParticles.js`. Let’s begin with a basic horizontal movement.

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });

  const aSpawnPos = attribute("aSpawnPos", "vec3");
  const aBirthLifeSeedScale = attribute("aBirthLifeSeedScale", "vec4");
  const aBirth = aBirthLifeSeedScale.x;
  const aLife = aBirthLifeSeedScale.y;
  const aSeed = aBirthLifeSeedScale.z;
  const aScale = aBirthLifeSeedScale.w;
  
  const uDustColor = uniform(new THREE.Color("#8A8A8A"));
  const uWindDirection = uniform(new THREE.Vector3(-1, 0, 0).normalize());
  const uWindStrength = uniform(0.3);
  
  // Age of the dust in seconds
  const dustAge = time.sub(aBirth);
  
  const windImpulse = uWindDirection.mul(uWindStrength).mul(dustAge);
  const driftMovement = windImpulse;

  const dustSample = texture(dustTexture, uv());
  material.colorNode = vec4(uDustColor, dustSample.a);
  material.positionNode = aSpawnPos
  .add(driftMovement)
  .add(positionLocal);

  return material;
}
...
```

Time to introduce `uWindDirection` and `uWindStrength`, those variables will be responsible for the direction and intensity of the base particle movement. For windImpulse we take the wind direction and scale it by `uWindStrength` to get the particle’s velocity. Then we multiply by `dustAge` this creates a constant, linear drift. Finally we add this offset to `positionNode` to move the particle.

Ok nice start, now let’s make our particles rise by updating the drift movement. Let’s create a new uniform uRiseSpeed, that will control the rise velocity.

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  ...
  const uRiseSpeed = uniform(0.1);
  ...
  const windImpulse = uWindDirection.mul(uWindStrength).mul(dustAge);
  const rise = vec3(0.0, dustAge.mul(uRiseSpeed), 0.0);
  const driftMovement = windImpulse.add(rise);
  ...
}
...
```

Also let’s apply the scale attribute.

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  ...
  material.positionNode = aSpawnPos
    .add(driftMovement)
    .add(positionLocal.mul(aScale));
  ...
}
...
```

A nice detail is to have the dust scale up quickly when it appears, and near the end of its life have it fade out. Let’s introduce a variable that will represent the lifetime of a particle from 0 (its creation) to 1 (its death).

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  ...
  const driftMovement = windImpulse.add(rise);
  // 0 at creation, 1 at death
  const lifeInterpolation = clamp(dustAge.div(aLife), 0, 1);
  ...
}
...
```

Let’s use it to scale up and fade out the particle.

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  ...
  const lifeInterpolation = clamp(dustAge.div(aLife), 0, 1);
  const scaleFactor = smoothstep(float(0), float(0.05), lifeInterpolation);
  const fadingOut = float(1.0).sub(
    smoothstep(float(0.8), float(1.0), lifeInterpolation)
  );
  ...
  material.positionNode = aSpawnPos
    .add(driftMovement)
    .add(positionLocal.mul(aScale.mul(scaleFactor)));
  material.opacityNode = fadingOut;
  ...
}
...
```

Ok it’s already better, but too uniform all the dust behaves almost exactly the same. Let’s make use of some randomness.

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  ...
  const uNoiseScale = uniform(30.0);
  const uNoiseSpeed = uniform(0.015);
  ...
  const randomSeed = vec2(aSeed.mul(1230.4), aSeed.mul(5670.8));
  
  const noiseUv = aSpawnPos.xz
    .add(randomSeed)
    .add(uWindDirection.xz.mul(dustAge.mul(uNoiseSpeed)));
  const noiseSample = texture(perlinTexture, noiseUv).x;
  ...
}
...
```

Ok so let’s check what’s going on here, first we have 2 new uniforms. `uNoiseScale` controls how often the noise pattern repeats. A smaller value means the variations are broader and the effect feels calmer. On the contrary, a bigger value give a more turbulent look. `uNoiseSpeed` controls how fast the noise pattern slides over time. Higher values make the motion change faster, lower values keep it subtle and slow. To sum up, `uNoiseScale` changes the shape of the noise and `uNoiseSpeed` changes the animation rate. Also to make sure two particles don’t end up using the same noise values, we multiply the seed by arbitrary large numbers. With all that we can compute our `noiseUv`, which we’ll use to sample our perlinTexture. Now let’s use this sample, actually we’ll need two, one for the X axis and one for the Y axis, to add some random turbulence!

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  ...
  const uWobbleAmp = uniform(0.6);
  ...
  const noiseSample = texture(perlinTexture, noiseUv).x;
  const noiseSampleBis = texture(perlinTexture, noiseUv.add(vec2(13.37, 7.77))).x;
  
  // Convert to turbulence values between -1 and 1.
  const turbulenceX = noiseSample.sub(0.5).mul(2);
  const turbulenceY = noiseSampleBis.sub(0.5).mul(2);
  
  const swirl = vec3(clamp(turbulenceX.mul(lifeInterpolation), 0, 1.0), turbulenceY.mul(lifeInterpolation), 0.0).mul(uWobbleAmp);
  ...
}
...
```

And that gives us a swirl value that’ll add small random variations on both axes! By multiplying the turbulence values by `lifeInterpolation`, we ensure that the swirl isn’t too strong at the birth of the particle. Now we can add the swirl to our `driftMovement` to add some randomness! Let’s also use it for our rise value, to make it a bit more random too, that’ll give us our final dust material!

```
//dustParticles.js
...    
createDustMaterial(perlinTexture, dustTexture) {
const material = new THREE.MeshBasicMaterial({
  transparent: true,
  depthWrite: false,
  depthTest: false,
});

const aSpawnPos = attribute("aSpawnPos", "vec3");
const aBirthLifeSeedScale = attribute("aBirthLifeSeedScale", "vec4");
const aBirth = aBirthLifeSeedScale.x;
const aLife = aBirthLifeSeedScale.y;
const aSeed = aBirthLifeSeedScale.z;
const aScale = aBirthLifeSeedScale.w;

const uDustColor = uniform(new THREE.Color("#8A8A8A"));
const uWindDirection = uniform(new THREE.Vector3(-1, 0, 0).normalize());
const uWindStrength = uniform(0.3);
const uRiseSpeed = uniform(0.1); // constant lift
const uNoiseScale = uniform(30.0); // start small (frequency)
const uNoiseSpeed = uniform(0.015); // scroll speed
const uWobbleAmp = uniform(0.6); // vertical wobble amplitude

// Age of the dust in seconds
const dustAge = time.sub(aBirth);
// 0 at creation, 1 at death
const lifeInterpolation = clamp(dustAge.div(aLife), 0, 1);

// Use noise
const randomSeed = vec2(aSeed.mul(123.4), aSeed.mul(567.8));
const noiseUv = aSpawnPos.xz
  .mul(uNoiseScale)
  .add(randomSeed)
  .add(uWindDirection.xz.mul(dustAge.mul(uNoiseSpeed)));

  // Return a value between 0 and 1.
const noiseSample = texture(perlinTexture, noiseUv).x;
const noiseSampleBis = texture(perlinTexture, noiseUv.add(vec2(13.37, 7.77))).x;

// Convert to turbulence values between -1 and 1.
const turbulenceX = noiseSample.sub(0.5).mul(2);
const turbulenceY = noiseSampleBis.sub(0.5).mul(2);

const swirl = vec3(clamp(turbulenceX.mul(lifeInterpolation), 0., 1.0), turbulenceY.mul(lifeInterpolation), 0.0).mul(uWobbleAmp);

const windImpulse = uWindDirection.mul(uWindStrength).mul(dustAge);
const riseFactor = clamp(noiseSample, 0.3, 1.0);
const rise = vec3(0.0, dustAge.mul(uRiseSpeed).mul(riseFactor), 0.0);
const driftMovement = windImpulse.add(rise).add(swirl);

const scaleFactor = smoothstep(float(0), float(0.05), lifeInterpolation);
const fadingOut = float(1.0).sub(
  smoothstep(float(0.8), float(1.0), lifeInterpolation)
);

const dustSample = texture(dustTexture, uv());
material.colorNode = vec4(uDustColor, dustSample.a);
material.positionNode = aSpawnPos
.add(driftMovement)
.add(positionLocal.mul(aScale.mul(scaleFactor)));
material.opacityNode = fadingOut;

return material;
}
...
```

It’s time to use our dust alongside our previous dissolve effect and synchronize them! Let’s go back to our `msdfText.js` file and create a function that will give us a random position inside our text, that’ll give us our spawn positions for the dust.

```
//msdfText.js
...
export default class MSDFText {
  ...
  #worldPositionBounds;
  ...
  async initialize(text = "WebGPU Gommage Effect", position = new THREE.Vector3(0, 0, 0), uProgress, perlinTexture, fontAtlasTexture) {
    ....
    // Compute the world position bounds of our text
    textGeometry.computeBoundingBox();
    mesh.updateWorldMatrix(true, false);
    this.#worldPositionBounds = new THREE.Box3().setFromObject(mesh);
    return mesh;
  }
  ...
}
```

In the initialize function, at the end, we compute the world `positionBounds`. This gives us a 3D box (min, max) that encloses the text in world space, which we can use to sample random positions within its bounds. Now let’s create our `getRandomPositionInMesh` function.

```
//msdfText.js
...
export default class MSDFText {
  ...
  getRandomPositionInMesh() {
      const min = this.#worldPositionBounds.min;
      const max = this.#worldPositionBounds.max;
      const x = Math.random() * (max.x - min.x) + min.x;
      const y = Math.random() * (max.y - min.y) + min.y;
      const z = Math.random() * 0.5;
      return new THREE.Vector3(x, y, z);
    }
  ...
}
```

Ok, let’s update our dust debug button to use these new bounds in `gommageOrchestrator.js`.

```
//gommageOrchestrator.js
...
export default class GommageOrchestrator {
  ...
  async initialize(scene) {
  ...
    DustButton.on("click", () => {
      const randomPosition = MSDFTextEntity.getRandomPositionInMesh();
      DustParticlesEntity.spawnDust(randomPosition);
    });
  }
  ...
}
```

And now, by pressing the dust debug button multiple times, we can see the particles being spawned within the text bounds at random positions! Now we need to adapt `gommageOrchestrator.js` to synchronize the two effects. For starter we’ll need to access `MSDFTextEntity` and `DustParticlesEntity` in the `triggerGommage` function, so let’s put them at class level. Then in the `triggerGommage` function, we’ll create a new tween, `spawnDustTween`, that will spawn a dust particle at a given interval. The smaller the interval value, the more particles will be spawned. Also, let’s store the tween as a class member, this way we’ll have more control over it to restart or kill the effect! The final class will look like this:

```
//gommageOrchestrator.js

import * as THREE from "three/webgpu";
import MSDFText from "./msdfText.js";
import { uniform } from "three/tsl";
import DustParticles from "./dustParticles.js";
import Debug, { DEBUG_FOLDERS } from "./debug.js";
import gsap from "gsap";

export default class GommageOrchestrator {
  #uProgress = uniform(0.0);

  #MSDFTextEntity = null;
  #DustParticlesEntity = null;

  #dustInterval = 0.125;
  #gommageTween = null;
  #spawnDustTween = null;

  constructor() {
  }

  async initialize(scene) {
    const { perlinTexture, dustParticleTexture, fontAtlasTexture } = await this.loadTextures();

    const debugFolder = Debug.getInstance().getFolder(DEBUG_FOLDERS.MSDF_TEXT);
    this.#MSDFTextEntity = new MSDFText();
    const msdfText = await this.#MSDFTextEntity.initialize("WebGPU Gommage Effect", new THREE.Vector3(0, 0, 0), this.#uProgress, perlinTexture, fontAtlasTexture);
    scene.add(msdfText);

    this.#DustParticlesEntity = new DustParticles();
    const dustParticles = await this.#DustParticlesEntity.initialize(perlinTexture, dustParticleTexture);
    scene.add(dustParticles);

    const GommageButton = debugFolder.addButton({
        title: "GOMMAGE",
    });
    const ResetButton = debugFolder.addButton({
        title: "RESET",
    });
    const DustButton = debugFolder.addButton({
        title: "DUST",
    });
    GommageButton.on("click", () => {
        this.triggerGommage();
    });
    ResetButton.on("click", () => {
        this.resetGommage();
    });
    DustButton.on("click", () => {
        const randomPosition = this.#MSDFTextEntity.getRandomPositionInMesh();
        this.#DustParticlesEntity.spawnDust(randomPosition);
    });
  }

  async loadTextures() {
    const textureLoader = new THREE.TextureLoader();

    const dustParticleTexture = await textureLoader.loadAsync("/textures/dustParticle.png");
    dustParticleTexture.colorSpace = THREE.NoColorSpace;
    dustParticleTexture.minFilter = THREE.LinearFilter;
    dustParticleTexture.magFilter = THREE.LinearFilter;
    dustParticleTexture.generateMipmaps = false;

    const perlinTexture = await textureLoader.loadAsync("/textures/perlin.webp");
    perlinTexture.colorSpace = THREE.NoColorSpace;
    perlinTexture.minFilter = THREE.LinearFilter;
    perlinTexture.magFilter = THREE.LinearFilter;
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;
    perlinTexture.generateMipmaps = false;

    const fontAtlasTexture = await textureLoader.loadAsync("/fonts/Cinzel/Cinzel.png");
    fontAtlasTexture.colorSpace = THREE.NoColorSpace;
    fontAtlasTexture.minFilter = THREE.LinearFilter;
    fontAtlasTexture.magFilter = THREE.LinearFilter;
    fontAtlasTexture.wrapS = THREE.ClampToEdgeWrapping;
    fontAtlasTexture.wrapT = THREE.ClampToEdgeWrapping;
    fontAtlasTexture.generateMipmaps = false;

    return { perlinTexture, dustParticleTexture, fontAtlasTexture };
  }

  triggerGommage() {
    // Don't start if already running
    if(this.#gommageTween || this.#spawnDustTween) return;

    this.#spawnDustTween = gsap.to({}, {
        duration: this.#dustInterval,
        repeat: -1,
        onRepeat: () => {
            const p = this.#MSDFTextEntity.getRandomPositionInMesh();
            this.#DustParticlesEntity.spawnDust(p);
        },
    });

    this.#gommageTween = gsap.to(this.#uProgress, {
        value: 1,
        duration: 5,
        ease: "linear",
        onComplete: () => {
            this.#spawnDustTween?.kill();
            this.#spawnDustTween = null;
            this.#gommageTween = null;
        },
    });
  }

  resetGommage() {
    this.#gommageTween?.kill();
    this.#spawnDustTween?.kill();

    this.#gommageTween = null;
    this.#spawnDustTween = null;

    this.#uProgress.value = 0;
  }
}
```

Phew, that was a big part! Good news is, for the petals most of the code will be directly copied from our dust!

## 4\. Petal particles

> Don’t hesitate to check the demo GitHub repository to follow along, each commit match a section of this tutorial! [Check out this section’s commit.](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/tree/25375bb50a0467fa61fc62bf6fb4c653c2aca53a)

Ok let’s go for the final part of the effect! For the petal shape, we’re going to use the geometry of a simple .glb model that I created in Blender. Put it in `public/models/` and load it in `gommageOrchestrator.js`.

> You can grab the petal model from the [demo GitHub repository](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/blob/master/public/models/petal.glb) here.

```
//gommageOrchestrator.js
...
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
...
export default class GommageOrchestrator {
  ...
  async initialize(scene) {
    const { perlinTexture, dustParticleTexture, fontAtlasTexture } = await this.loadTextures();
    const petalGeometry = await this.loadPetalGeometry();
    ...
  }
  ...
  async loadPetalGeometry() {
    const modelLoader = new GLTFLoader();
    const petalScene = await modelLoader.loadAsync("/models/petal.glb");
    const petalMesh = petalScene.scene.getObjectByName("PetalV2");
    return petalMesh.geometry;
  }
  ...
}
```

Let’s already prepare the creation of our petal particles in initialize:

```
//gommageOrchestrator.js
...
export default class GommageOrchestrator {
  ...
  #PetalParticlesEntity = null;
  ...
  async initialize(scene) {
    ...
    this.#PetalParticlesEntity = new PetalParticles();
    const petalParticles = await this.#PetalParticlesEntity.initialize(perlinTexture, petalGeometry);
    scene.add(petalParticles);
    ...
  }
  ...
}
```

Of course it doesn’t exist yet so let’s copy most of the dust particles code into a new file `petalParticles.js`

```
//petalParticles.js

import * as THREE from "three/webgpu";
import { attribute, uniform, positionLocal, texture, vec4, uv, time, vec2, vec3, clamp, sin, smoothstep, float } from "three/tsl";

export default class PetalParticles {
  constructor() { }

  #spawnPos;
  #birthLifeSeedScale;
  #currentPetalIndex = 0;
  #petalMesh;
  #MAX_PETAL = 400;

  async initialize(perlinTexture, petalGeometry) {

    const petalGeo = petalGeometry.clone();
    const scale = 0.15;
    petalGeo.scale(scale, scale, scale);

    this.#spawnPos = new Float32Array(this.#MAX_PETAL * 3);
    // Combined 4 attributes into one to not go above the 9 attribute limit for webgpu
    this.#birthLifeSeedScale = new Float32Array(this.#MAX_PETAL * 4);
    this.#currentPetalIndex = 0;

    petalGeo.setAttribute(
        "aSpawnPos",
        new THREE.InstancedBufferAttribute(this.#spawnPos, 3)
    );
    petalGeo.setAttribute(
        "aBirthLifeSeedScale",
        new THREE.InstancedBufferAttribute(this.#birthLifeSeedScale, 4)
    );
    const material = this.createPetalMaterial(perlinTexture);
    this.#petalMesh = new THREE.InstancedMesh(petalGeo, material, this.#MAX_PETAL);
    return this.#petalMesh;
  }

  debugSpawnPetal() {
    for (let i = 0; i < 10; i++) {
      this.spawnPetal(
        new THREE.Vector3(
          (Math.random() * 2 - 1) * 0.5,
          (Math.random() * 2 - 1) * 0.5,
          0,
        )
      );
    }
  }

  spawnPetal(spawnPos) {
    if (this.#currentPetalIndex === this.#MAX_PETAL) this.#currentPetalIndex = 0;
    const id = this.#currentPetalIndex;
    this.#currentPetalIndex = this.#currentPetalIndex + 1;
    this.#spawnPos[id * 3 + 0] = spawnPos.x;
    this.#spawnPos[id * 3 + 1] = spawnPos.y;
    this.#spawnPos[id * 3 + 2] = spawnPos.z;
    this.#birthLifeSeedScale[id * 4 + 0] = performance.now() * 0.001; // Birth time
    this.#birthLifeSeedScale[id * 4 + 1] = 6; // Life time
    this.#birthLifeSeedScale[id * 4 + 2] = Math.random(); // Random seed
    this.#birthLifeSeedScale[id * 4 + 3] = Math.random() * 0.5 + 0.5; // Scale

    this.#petalMesh.geometry.attributes.aSpawnPos.needsUpdate = true;
    this.#petalMesh.geometry.attributes.aBirthLifeSeedScale.needsUpdate = true;
  }

  createPetalMaterial(perlinTexture) {
    const material = new THREE.MeshBasicMaterial({
        transparent: true,
        side: THREE.DoubleSide,
    });

    const aSpawnPos = attribute("aSpawnPos", "vec3");
    const aBirthLifeSeedScale = attribute("aBirthLifeSeedScale", "vec4");
    const aBirth = aBirthLifeSeedScale.x;
    const aLife = aBirthLifeSeedScale.y;
    const aSeed = aBirthLifeSeedScale.z;
    const aScale = aBirthLifeSeedScale.w;

    const uDustColor = uniform(new THREE.Color("#8A8A8A"));
    const uWindDirection = uniform(new THREE.Vector3(-1, 0, 0).normalize());
    const uWindStrength = uniform(0.3);
    const uRiseSpeed = uniform(0.1); // constant lift
    const uNoiseScale = uniform(30.0); // start small (frequency)
    const uNoiseSpeed = uniform(0.015); // scroll speed
    const uWobbleAmp = uniform(0.6); // vertical wobble amplitude

    // Age of the dust in seconds
    const dustAge = time.sub(aBirth);
    const lifeInterpolation = clamp(dustAge.div(aLife), 0, 1);

    // Use noise
    const randomSeed = vec2(aSeed.mul(123.4), aSeed.mul(567.8));
    const noiseUv = aSpawnPos.xz
        .mul(uNoiseScale)
        .add(randomSeed)
        .add(uWindDirection.xz.mul(dustAge.mul(uNoiseSpeed)));

    // Return a value between 0 and 1.
    const noiseSample = texture(perlinTexture, noiseUv).x;
    const noiseSammpleBis = texture(perlinTexture, noiseUv.add(vec2(13.37, 7.77))).x;

    // Convert to turbulence values between -1 and 1.
    const turbulenceX = noiseSample.sub(0.5).mul(2);
    const turbulenceY = noiseSammpleBis.sub(0.5).mul(2);

    const swirl = vec3(clamp(turbulenceX.mul(lifeInterpolation), 0., 1.0), turbulenceY.mul(lifeInterpolation), 0.0).mul(uWobbleAmp);

    const windImpulse = uWindDirection.mul(uWindStrength).mul(dustAge);

    const riseFactor = clamp(noiseSample, 0.3, 1.0);
    const rise = vec3(0.0, dustAge.mul(uRiseSpeed).mul(riseFactor), 0.0);
    const driftMovement = windImpulse.add(rise).add(swirl);

    // 0 at creation, 1 at death
    const scaleFactor = smoothstep(float(0), float(0.05), lifeInterpolation);
    const fadingOut = float(1.0).sub(
        smoothstep(float(0.8), float(1.0), lifeInterpolation)
    );

    material.colorNode = vec4(uDustColor, 1);
    material.positionNode = aSpawnPos
        .add(driftMovement)
        .add(positionLocal.mul(aScale.mul(scaleFactor)));
    material.opacityNode = fadingOut;

    return material;
  }
}
```

At this step it’s mostly the same code, except we use the petal geometry instead of the dust texture, plus a small change to the material. I also set the petal life to 6 seconds in `spawnPetal` and added the `DoubleSide` parameter since our petals are going to spin! Let’s fix our code in `gommageOrchestrator.js` by importing the correct class, and let’s add a simple debug button to create some petals:

```
//gommageOrchestrator.js
...
export default class GommageOrchestrator {
  ...
  #PetalParticlesEntity = null;
  ...
  async initialize(scene) {
    ...
    const PetalButton = debugFolder.addButton({
      title: "PETAL",
    });
    ...
    PetalButton.on("click", () => {
      this.#PetalParticlesEntity.debugSpawnPetal();
    });
    ...
  }
  ...
}
```

Ok it’s not much yet, but we have our geometry and the petal particles code seems to be working. Let’s start improving it, back to `petalParticles.js`. Since we now have 3D models, let’s bend our petals to reflect that! In `createPetalMaterial`, let’s start by adding 3 functions that will handle rotation on all 3 axes. For the bending we’ll only need the X rotation for now, but we’ll need the two others soon after.

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    const material = new THREE.MeshBasicNodeMaterial({
      transparent: true,
      side: THREE.DoubleSide,
    });

    function rotX(a) {
      const c = cos(a);
      const s = sin(a);
      const ns = s.mul(-1.0);
      return mat3(1.0, 0.0, 0.0, 0.0, c, ns, 0.0, s, c);
    }
    function rotY(a) {
      const c = cos(a);
      const s = sin(a);
      const ns = s.mul(-1.0);
      return mat3(c, 0.0, s, 0.0, 1.0, 0.0, ns, 0.0, c);
    }

    function rotZ(a) {
      const c = cos(a);
      const s = sin(a);
      const ns = s.mul(-1.0);
      return mat3(c, ns, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
    }

    const aSpawnPos = attribute("aSpawnPos", "vec3");
    ...
  }
}
```

Now let’s create two new uniforms for the bending, uBendAmount and uBendSpeed:

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const uNoiseSpeed = uniform(0.015);
    const uWobbleAmp = uniform(0.6);

    const uBendAmount = uniform(2.5);
    const uBendSpeed = uniform(1.0);
    ...
  }
}
```

And let’s compute the bending right after the swirl definition:

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const swirl = vec3(clamp(turbulenceX.mul(lifeInterpolation), 0, 1.0), turbulenceY.mul(lifeInterpolation), 0.0).mul(uWobbleAmp);

    // Bending
    const y = uv().y;
    const bendWeight = pow(y, float(3.0));

    const bend = bendWeight.mul(uBendAmount).mul(sin(dustAge.mul(uBendSpeed.mul(noiseSample))));

    const B = rotX(bend);
    ...
  }
}
```

Note that `bendWeight` depends on the UV y value so we don’t bend the whole model uniformly, the further away from the petal base, the more we bend. We also use `dustAge` to repeat the movement with a sin operator, and add a noise sample so our petals don’t all bend together. Now, just before computing `positionNode`, let’s update our local position:

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const positionLocalUpdated = B.mul(positionLocal);
    material.colorNode = vec4(uDustColor, 1);
    material.positionNode = aSpawnPos
      .add(driftMovement)
      .add(positionLocalUpdated.mul(aScale.mul(scaleFactor)));
    material.opacityNode = fadingOut;

    return material;
  }
}
```

That’s it for the bending! And now it’s time for the spin, that will really bring life to the petals! Again, let’s start with two new uniforms, `uSpinSpeed` and `uSpinAmp`:

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const uBendAmount = uniform(2.5);
    const uBendSpeed = uniform(1.0);
    const uSpinSpeed = uniform(2.0);
    const uSpinAmp = uniform(0.45);
    ...
  }
}
```

Let’s start by adding `turbulenceZ`, we’ll need it shortly after.

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const turbulenceX = noiseSample.sub(0.5).mul(2);
    const turbulenceY = noiseSammpleBis.sub(0.5).mul(2);
    const turbulenceZ = noiseSample.sub(0.5).mul(2);
    ...
  }
}
```

And now we can compute the spin right after the bending!

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const baseX = aSeed.mul(1.13).mod(1.0).mul(TWO_PI);
    const baseY = aSeed.mul(2.17).mod(1.0).mul(TWO_PI);
    const baseZ = aSeed.mul(3.31).mod(1.0).mul(TWO_PI);

    const spin = dustAge.mul(uSpinSpeed).mul(uSpinAmp);
    const rx = baseX.add(spin.mul(0.9).mul(turbulenceX.add(1.5)));
    const ry = baseY.add(spin.mul(1.2).mul(turbulenceY.add(1.5)));
    const rz = baseZ.add(spin.mul(0.7).mul(turbulenceZ.add(1.5)));

    const R = rotY(ry).mul(rotX(rx)).mul(rotZ(rz));
    ...
    const positionLocalUpdated = R.mul(B.mul(positionLocal));
    ...
  }
}
```

Ok, before we move on, let’s explain what happens in this code.

```
const baseX = aSeed.mul(1.13).mod(1.0).mul(TWO_PI);
const baseY = aSeed.mul(2.17).mod(1.0).mul(TWO_PI);
const baseZ = aSeed.mul(3.31).mod(1.0).mul(TWO_PI);
```

First we create a random base angle using our random seed, the multiplication by different values ensures that we don’t get the same angle on all axes, and the mod ensures that we stay within a value between 0 and 1. After that we simply multiply that number by `TWO_PI` (a TSL constant) so we can get any value up to a full rotation.

```
const spin = dustAge.mul(uSpinSpeed).mul(uSpinAmp);
const rx = baseX.add(spin.mul(0.9).mul(turbulenceX.add(1.5)));
const ry = baseY.add(spin.mul(1.2).mul(turbulenceY.add(1.5)));
const rz = baseZ.add(spin.mul(0.7).mul(turbulenceZ.add(1.5)));
```

Now we compute a spin amount that increases over time and varies with the turbulence. `uSpinSpeed` controls how fast the angle changes over time, and `uSpinAmp` controls the amount of rotation.

```
const R = rotY(ry).mul(rotX(rx)).mul(rotZ(rz));
...
const positionLocalUpdated = R.mul(B.mul(positionLocal));
```

With all that we can build a rotation matrix that we’ll apply, along with the bending, to update the `positionLocal` of our mesh. Ok with all those changes your petal material should look like this:

```
//petalParticles.js
...
export default class PetalParticles {
...
createPetalMaterial(perlinTexture) {
  const material = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    side: THREE.DoubleSide,
  });

  function rotX(a) {
    const c = cos(a);
    const s = sin(a);
    const ns = s.mul(-1.0);
    return mat3(1.0, 0.0, 0.0, 0.0, c, ns, 0.0, s, c);
  }
  function rotY(a) {
    const c = cos(a);
    const s = sin(a);
    const ns = s.mul(-1.0);
    return mat3(c, 0.0, s, 0.0, 1.0, 0.0, ns, 0.0, c);
  }

  function rotZ(a) {
    const c = cos(a);
    const s = sin(a);
    const ns = s.mul(-1.0);
    return mat3(c, ns, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
  }

  const aSpawnPos = attribute("aSpawnPos", "vec3");
  const aBirthLifeSeedScale = attribute("aBirthLifeSeedScale", "vec4");
  const aBirth = aBirthLifeSeedScale.x;
  const aLife = aBirthLifeSeedScale.y;
  const aSeed = aBirthLifeSeedScale.z;
  const aScale = aBirthLifeSeedScale.w;

  const uDustColor = uniform(new THREE.Color("#8A8A8A"));
  const uWindDirection = uniform(new THREE.Vector3(-1, 0, 0).normalize());
  const uWindStrength = uniform(0.3);
  const uRiseSpeed = uniform(0.1); // constant lift
  const uNoiseScale = uniform(30.0); // start small (frequency)
  const uNoiseSpeed = uniform(0.015); // scroll speed
  const uWobbleAmp = uniform(0.6); // vertical wobble amplitude

  const uBendAmount = uniform(2.5);
  const uBendSpeed = uniform(1.0);
  const uSpinSpeed = uniform(2.0);
  const uSpinAmp = uniform(0.45); // overall rotation amount

  // Age of the dust in seconds
  const dustAge = time.sub(aBirth);
  const lifeInterpolation = clamp(dustAge.div(aLife), 0, 1);

  // Use noise
  const randomSeed = vec2(aSeed.mul(123.4), aSeed.mul(567.8));
  const noiseUv = aSpawnPos.xz
      .mul(uNoiseScale)
      .add(randomSeed)
      .add(uWindDirection.xz.mul(dustAge.mul(uNoiseSpeed)));

  // Return a value between 0 and 1.
  const noiseSample = texture(perlinTexture, noiseUv).x;
  const noiseSammpleBis = texture(perlinTexture, noiseUv.add(vec2(13.37, 7.77))).x;

  // Convert to turbulence values between -1 and 1.
  const turbulenceX = noiseSample.sub(0.5).mul(2);
  const turbulenceY = noiseSammpleBis.sub(0.5).mul(2);
  const turbulenceZ = noiseSample.sub(0.5).mul(2);

  const swirl = vec3(clamp(turbulenceX.mul(lifeInterpolation), 0, 1.0), turbulenceY.mul(lifeInterpolation), 0.0).mul(uWobbleAmp);

  // Bending
  const y = uv().y;
  const bendWeight = pow(y, float(3.0));

  const bend = bendWeight.mul(uBendAmount).mul(sin(dustAge.mul(uBendSpeed.mul(noiseSample))));

  const B = rotX(bend);

  const windImpulse = uWindDirection.mul(uWindStrength).mul(dustAge);

  const riseFactor = clamp(noiseSample, 0.3, 1.0);
  const rise = vec3(0.0, dustAge.mul(uRiseSpeed).mul(riseFactor), 0.0);
  const driftMovement = windImpulse.add(rise).add(swirl);

  // Spin
  const baseX = aSeed.mul(1.13).mod(1.0).mul(TWO_PI);
  const baseY = aSeed.mul(2.17).mod(1.0).mul(TWO_PI);
  const baseZ = aSeed.mul(3.31).mod(1.0).mul(TWO_PI);

  const spin = dustAge.mul(uSpinSpeed).mul(uSpinAmp);
  const rx = baseX.add(spin.mul(0.9).mul(turbulenceX.add(1.5)));
  const ry = baseY.add(spin.mul(1.2).mul(turbulenceY.add(1.5)));
  const rz = baseZ.add(spin.mul(0.7).mul(turbulenceZ.add(1.5)));

  const R = rotY(ry).mul(rotX(rx)).mul(rotZ(rz));

  // 0 at creation, 1 at death
  const scaleFactor = smoothstep(float(0), float(0.05), lifeInterpolation);
  const fadingOut = float(1.0).sub(
      smoothstep(float(0.8), float(1.0), lifeInterpolation)
  );

  // Update local position
  const positionLocalUpdated = R.mul(B.mul(positionLocal));

  material.colorNode = vec4(uDustColor, 1);
  material.positionNode = aSpawnPos
      .add(driftMovement)
      .add(positionLocalUpdated.mul(aScale.mul(scaleFactor)));
  material.opacityNode = fadingOut;

  return material;
  }
}
```

And that was one of the most technical parts of the project, congratulations! Let’s adjust the color so it better matches the Clair Obscur theme, but feel free to use any colors. Let’s create these two color uniforms:

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const uSpinSpeed = uniform(2.0);
    const uSpinAmp = uniform(0.45);
    const uRedColor = uniform(new THREE.Color("#9B0000"));
    const uWhiteColor = uniform(new THREE.Color("#EEEEEE"));
    ...
  }
}
```

And we can apply them to our `colorNode`.

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const petalColor = mix(
      uRedColor,
      uWhiteColor,
      instanceIndex.mod(3).equal(0)
    );

    material.colorNode = petalColor;
    ...
  }
}
```

A small trick is used here, relying on `instanceIndex` (a TSL input), so that one third of the created petals are white.

We’re almost there! Our petals feel a bit flat because there’s no lighting yet, but we can compute a simple one to quickly add more depth to the effect. We’ll need a `uLightPosition` uniform, last one of the lesson, I swear.

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const uRedColor = uniform(new THREE.Color("#9B0000"));
    const uWhiteColor = uniform(new THREE.Color("#EEEEEE"));
    const uLightPosition = uniform(new THREE.Vector3(0, 0, 5));
    ...
  }
}
```

We’ll need the normal for the light computation, and since we’ve updated our model’s local position we also need to update our normals! Let’s add:

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const positionLocalUpdated = R.mul(B.mul(positionLocal));
    const normalUpdate = normalize(R.mul(B.mul(normalLocal)));
    ...
    material.normalNode = normalUpdate;
    ...
  }
}
```

Also we’ll need the world position of the petals, so let’s extract the logic currently in `positionNode` into a separate variable.

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const positionLocalUpdated = R.mul(B.mul(positionLocal));
    const normalUpdate = normalize(R.mul(B.mul(normalLocal)));
    const worldPosition = aSpawnPos
      .add(driftMovement)
      .add(positionLocalUpdated.mul(aScale.mul(scaleFactor)));
    ...
    material.positionNode = worldPosition;
    ...
  }
}
```

And finally, let’s compute whether our model is facing the light with:

```
//petalParticles.js
...
export default class PetalParticles {
  ...
  createPetalMaterial(perlinTexture) {
    ...
    const petalColor = mix(
      uRedColor,
      uWhiteColor,
      instanceIndex.mod(3).equal(0)
    );

    const lightDirection = normalize(uLightPosition.sub(worldPosition));
    const facing = clamp(abs(dot(normalUpdate, lightDirection)), 0.4, 1);

    material.colorNode = petalColor.mul(facing);
    ...
  }
}
```

And that’s it for our petal material, well done! Now we just need to spawn them alongside our dust in `gommageOrchestrator.js`. Similar to the dust, let’s add the class members `petalInterval` and `spawnPetalTween`.

```
//gommageOrchestrator.js
...
export default class GommageOrchestrator {
  ...
  #dustInterval = 0.125;
  #petalInterval = 0.05;
  #gommageTween = null;
  #spawnDustTween = null;
  #spawnPetalTween = null;
  ...
}
```

And in the `triggerGommage` function, let’s add the tween for the petals:

We should also update `msdfText.js` with a small change to `getRandomPositionInMesh` for the petals. It didn’t really matter for the dust, but to avoid having petals clipping into each other, let’s add a small Z offset to the position.

```
//msdfText.js
...
getRandomPositionInMesh() {
  const min = this.#worldPositionBounds.min;
  const max = this.#worldPositionBounds.max;
  const x = Math.random() * (max.x - min.x) + min.x;
  const y = Math.random() * (max.y - min.y) + min.y;
  const z = Math.random() * 0.5;
  return new THREE.Vector3(x, y, z);
}
...
```

And we’re done with the effect, thank you for following the guide with me! Now let’s add the last details to polish the demo.

## 5\. Last details

> Don’t hesitate to check the demo GitHub repository to follow along, each commit match a section of this tutorial! [Check out this section’s commit](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops/tree/1311775148fc8e30dddd3f3543688451877157ba).

For the finishing touch let’s do two things, add a bloom post process and a HTML button to trigger the effect instead of the debug. Both tasks are fairly easy, it’ll be a short part. Let’s start with the post processing in `experience.js`. Let’s start by adding a `#webgpuComposer` class member and a `setupPostprocessingGPGPU` function that will contain our bloom effect. Then we call it in initialize, and we finish by calling it in the render function instead of the previous render command.

```
//experience.js

import * as THREE from "three/webgpu";
import GommageOrchestrator from "./gommageOrchestrator.js";
import { float, mrt, pass, output } from "three/tsl";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";

export class Experience {

  #threejs = null;
  #scene = null;
  #camera = null;
  #webgpuComposer = null;

  constructor() {}

  async initialize(container) {
    await this.#setupProject(container);
    window.addEventListener("resize",  this.#onWindowResize_.bind(this), false);
    await this.#setupPostprocessing();
    this.#raf();
  }

  async #setupProject(container) {
    this.#threejs = new THREE.WebGPURenderer({ antialias: true });
    await this.#threejs.init();

    this.#threejs.shadowMap.enabled = false;
    this.#threejs.toneMapping = THREE.ACESFilmicToneMapping;
    this.#threejs.setClearColor(0x111111, 1);
    this.#threejs.setSize(window.innerWidth, window.innerHeight);
    this.#threejs.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.#threejs.domElement);

    // Camera Setup !
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 25;
    this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.#camera.position.set(0, 0, 5);
    // Call window resize to compute FOV
    this.#onWindowResize_();
    this.#scene = new THREE.Scene();
    // Test MSDF Text
    const gommageOrchestratorEntity = new GommageOrchestrator();
    await gommageOrchestratorEntity.initialize(this.#scene);
  }

  async #setupPostprocessing() {
    this.#webgpuComposer = new THREE.PostProcessing(this.#threejs);
    const scenePass = pass(this.#scene, this.#camera);

    scenePass.setMRT(
      mrt({
        output,
        bloomIntensity: float(0),
      })
    );
    let outNode = scenePass;

    const outputPass = scenePass.getTextureNode();
    const bloomIntensityPass = scenePass.getTextureNode('bloomIntensity');
    const bloomPass = bloom(outputPass.mul(bloomIntensityPass), 0.8);
    outNode = outNode.add(bloomPass);

    this.#webgpuComposer.outputNode = outNode.renderOutput();
    this.#webgpuComposer.needsUpdate = true;
  }

  #onWindowResize_() {
    const HORIZONTAL_FOV_TARGET = THREE.MathUtils.degToRad(45);
    this.#camera.aspect = window.innerWidth / window.innerHeight;
    const verticalFov = 2 * Math.atan(Math.tan(HORIZONTAL_FOV_TARGET / 2) / this.#camera.aspect);
    this.#camera.fov = THREE.MathUtils.radToDeg(verticalFov);
    this.#camera.updateProjectionMatrix();
    this.#threejs.setSize(window.innerWidth, window.innerHeight);
  }

  #render() {
    //this.#threejs.render(this.#scene, this.#camera);
    this.#webgpuComposer.render();
  }

  #raf() {
    requestAnimationFrame(t => {
      this.#render();
      this.#raf();
    });
  }
}

new Experience().initialize(document.querySelector("#canvas-container"));
```

Using MRT nodes lets our materials output extra buffers in the same scene render pass. So alongside the normal color output, we write a `bloomIntensity` mask per material. And in our `setupPostprocessing`, we read this mask and multiply it with the color buffer before running `BloomNode`, so the bloom is applied only where `bloomIntensity` is non zero. Yet nothing changes since we didn’t set the MRT node in our materials, let’s do it for the text, dust and petals.

```
//msdfText.js
...
createTextMaterial(fontAtlasTexture, perlinTexture, uProgress) {
  const textMaterial = new MSDFTextNodeMaterial({
    map: fontAtlasTexture,
    transparent: true,
  });
  
  ...
  
  textMaterial.mrtNode = mrt({
    bloomIntensity: float(0.4).mul(dissolve),
  });

  return textMaterial;
}
```

```
//petalParticles.js
...
createPetalMaterial(perlinTexture) {
  const material = new THREE.MeshBasicNodeMaterial({
      transparent: true,
      side: THREE.DoubleSide,
  });

  ....

  material.mrtNode = mrt({
      bloomIntensity: float(0.7).mul(fadingOut),
    });

  return material;
}
```

```
//dustParticles.js
...
createDustMaterial(perlinTexture, dustTexture) {
  const material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
  });
  
  ...

  material.mrtNode = mrt({
    bloomIntensity: float(0.5).mul(fadingOut),
  });

  return material;
}
```

Much better now! As a bonus, let’s use a button instead of our debug panel to control the effect, you can copy this CSS file, `controlUI.css`.

```
@font-face {
  font-family: 'Cinzel';
  src: url('/fonts/Cinzel/Cinzel-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

#control-ui-container {
  position: fixed;
  bottom: 200px;
  z-index: 9999;
  width: 100%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  transform: translateX(-50%);
  --e33-color: #D5CBB2;
}

.E33-button {
  font-family: 'Cinzel', serif;
  padding: 12px 30px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--e33-color);
  border: none;
  position: relative;
  clip-path: polygon(0% 50%,
          15px 0%,
          calc(100% - 15px) 0%,
          100% 50%,
          calc(100% - 15px) 100%,
          15px 100%);
  transition: transform 0.15s ease-out 0.05s;
  font-size: 2rem;
  transition: opacity 0.15s ease-out 0.05s;

  &.disabled {
      opacity: 0.4;
      cursor: default;
  }
}

.E33-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--e33-color);
  --borderSize: 1px;
  clip-path: polygon(0% 50%,
          15px 0%,
          calc(100% - 15px) 0%,
          100% 50%,
          calc(100% - 15px) 100%,
          15px 100%,
          0% 50%,

          var(--borderSize) 50%,
          calc(15px + 0.5px) calc(100% - var(--borderSize)),
          calc(100% - 15px - 0.5px) calc(100% - var(--borderSize)),
          calc(100% - var(--borderSize)) 50%,
          calc(100% - 15px - 0.5px) var(--borderSize),
          calc(15px + 0.5px) var(--borderSize),
          var(--borderSize) 50%);
  z-index: -1;
}
```

Now use it in your HTML:

```
<!DOCTYPE html>
<html lang="en" class="no-js">
  <head>
	  ...
    <link rel="stylesheet" type="text/css" href="css/controlUI.css" />
    ...
    </head>
      <div id="canvas-container"></div>
      <div id="control-ui-container">
         <button class="E33-button" id="gommage-button">Start</button>
      </div>
      ...
  </body>
</html>
```

We can now listen to the button interaction in gommageOrchestrator.js.

```
//gommageOrchestrator.js
...
async initialize(scene) {
  ...
  // Use HTML buttons
  const gommageButton = document.getElementById("gommage-button");
  gommageButton.addEventListener("click", () => {
      this.triggerGommage();
  });
  ...
}
...
```

And let’s finish by disabling our Debug class in `debug.js`.

```
//debug.js
...
class Debug {
  static instance = null;
  static ENABLED = false;
...
```

And that’s it for real this time! I hope you learned a thing or two in this tutorial. To expand the demo a bit, you can add some options to change the petal amount or update the text dynamically, get creative!