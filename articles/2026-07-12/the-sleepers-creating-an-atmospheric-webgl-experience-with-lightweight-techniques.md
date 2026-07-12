---
title: "The Sleepers: Creating an Atmospheric WebGL Experience with Lightweight Techniques"
source: "https://tympanus.net/codrops/2026/07/10/the-sleepers-creating-an-atmospheric-webgl-experience-with-lightweight-techniques/"
publishedDate: "2026-07-10"
category: "design"
feedName: "Codrops"
author: "Thibaut Foussard"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/TheSleepers_cover.png.webp?x23502)](https://projects.thibautfoussard.com/the-sleepers/ "The Sleepers: Creating an Atmospheric WebGL Experience with Lightweight Techniques Demo")

**The Sleepers** is a short WebGL experience I created as a submission for Bruno Simon’s Three.js challenge.

Building for a challenge like this means working in your own time, for free, and against a tight deadline. That naturally pushes you toward one thing: efficiency.

This case study explores a collection of simple, lightweight WebGL techniques that are quick to implement and built for performance. The goal wasn’t to create the most technically complex experience, but to achieve the strongest visual impact with the simplest possible solutions.

Let’s break down some of the techniques behind it.

## The Intro: Swirling Transition

To create this transition, we’ll first need a black and white texture, such as this one:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/swirl1.jpg.webp?x23502)

Then, we use this texture as a uniform in a post-processing shader to control how the scene progressively transitions from a dark grayscale version to its original colors.

The red channel of the texture acts as a per-pixel threshold: each fragment transitions when the progress uniform (`uProgress`) exceeds its corresponding threshold value in the texture.

Here’s a simplified version of the shader I used:

```
uniform float uProgress;
uniform sampler2D uTransitionTexture;

vec3 greyscale(vec3 color, float str) {
    float g = dot(color, vec3(0.1));
    return mix(color, vec3(g), str);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 greyScaledColor = greyscale(inputColor.rgb, 1.);
    greyScaledColor = mix(greyScaledColor, vec3(0.1, 0.1, .9), pow(uProgress, 5.));

    vec4 textureColor = texture2D(uTransitionTexture, vUv);
    float mixer = step(textureColor.r, uProgress);

    outputColor = vec4(mix(greyScaledColor, inputColor.rgb, mixer), 1.);
}
```

As `uProgress` increases from 0 to 1, different parts of the screen are revealed at different times based on the texture values. Dark areas appear first, while brighter areas appear later, creating the impression that the image is being revealed by the swirling pattern. This simple technique can produce rich and organic-looking transitions while keeping the shader logic straightforward! 👌

## Fog

This fog is obviously not volumetric, it’s just a kind of color trick applied to the materials of the scene.

### Step 1: Linear Vertical Fog

First, we need to set up a shader modification (using `onBeforeCompile`), and we’ll apply it to all the materials in the scene later on.

In this `onBeforeCompile`, we’ll simply use the world position of each fragment to determine its color. Above a certain position on the Y axis, we leave the color untouched. Below it, we give the fragment the color of the fog.

```
const fogOnBeforeCompile = (shader) => {
    // 1. Retrieve the worldPosition and pass it as a varying
    shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
        varying vec3 vWorldPosition;
        void main() {
            vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    `)

    // 2. Define the uniforms and the varying in the fragment shader
    shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        uniform float fogPositionY;
        uniform float fogSmoothness;
        varying vec3 vWorldPosition;
        void main() {
    `)

    3. Use them to create a basic fog
    shader.fragmentShader = shader.fragmentShader.replace(
        'vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;',
        `
        vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

        // vertical gradient
        float verticalMixer = smoothstep(vWorldPosition.y - fogSmoothness, vWorldPosition.y + fogSmoothness, fogPositionY);

        float mixer = clamp(verticalMixer, 0., 1.);

        vec3 fogColor = vec3(1.);
        
        outgoingLight = mix(outgoingLight, fogColor, mixer);
    `);
    
    shader.uniforms.fogPositionY = { value: fogSettings.height };
    shader.uniforms.fogSmoothness = { value: fogSettings.smoothness };
}
```

Then we can apply this shader override to our materials (note that it is intended to work with instances of MeshStandardMaterial, you might need to adjust it if you’re working with different materials).

```
gltf.scene.traverse(child => {
    if (child.isMesh) {
        child.material.onBeforeCompile = (shader) => {
            fogOnBeforeCompile(shader);
        };
    }
});
```

With this logic, the result should already look like this:

In this example, I also wrapped the whole scene in a sphere, and shaded it using the same technique: color of the fog under a given world position, transparent above it. That creates the horizon fog.

### Step 2: Noise-Driven Fog Animation

To make the fog feel alive, we’ll obviously add some noise. But noise calculation can be expensive, especially when applied to numerous materials. So let’s use a seamless noise texture instead, such as this one:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/2-1.png.webp?x23502)

There are many ways to incorporate noise and many ways to customize the appearance of the fog. I personally used domain warping to get an interesting fog surface and used the distance from the `worldPosition` to the camera to have control over the visual depth.

For the sake of simplicity, here’s a basic version of the final shader:

```
const fogOnBeforeCompile = (shader) => {
    // 1. Retrieve the worldPosition and pass it as a varying
    shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
        varying vec3 vWorldPosition;
        varying vec2 vUv;

        void main() {
            vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            vUv = uv;
    `)

    // 2. Define the uniforms and the varying in the fragment shader
    shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        uniform float fogPositionY;
        uniform float fogSmoothness;
        uniform sampler2D noiseTexture;
        uniform float uTime;
        varying vec3 vWorldPosition;
        varying vec2 vUv;

        void main() {
    `)

    3. Use them to create a basic fog
    shader.fragmentShader = shader.fragmentShader.replace(
        'vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;',
        `
        vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

        vec4 noiseColor = texture2D(noiseTexture, vec2(vWorldPosition.x * noiseFreq + uTime, vWorldPosition.z * noiseFreq + uTime));
        float noise = noiseColor.r;

        // vertical gradient
        float verticalMixer = smoothstep(
            vWorldPosition.y - fogSmoothness, 
            vWorldPosition.y + fogSmoothness, 
            fogPositionY + noise);

        float mixer = clamp(verticalMixer, 0., 1.);

        vec3 fogColor = vec3(1.);
        
        outgoingLight = mix(outgoingLight, fogColor, mixer);
    `);
    
    shader.uniforms.fogPositionY = { value: fogSettings.height };
    shader.uniforms.fogSmoothness = { value: fogSettings.smoothness };
    shader.uniforms.uTime = 0;
    shader.uniforms.noiseTexture = fogSettings.noiseTexture;
}
```

And here is a demo you can check out and play with:

## Mesh Outlines

![Train outline](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/outline-1200x722.jpg.webp?x23502)

This technique has many names: shell outline, backface outline, inverted hull outline, etc. and it’s actually a Blender technique:

### **Step 1: Create a material dedicated to the outline.**

Since we want a black outline, we’ll create a black material. Not too long ago it was possible to use a RGB node that would then be interpreted as a MeshBasicMaterial by Three.js. But the RGB node has been removed from Blender since version 5.0.0 and as of today, there’s no way (that I’m aware of) to get a Blender material to be translated into a MeshBasicMaterial.  
So let’s just keep the Principled BSDF node. Three.js will then create a MeshStandardMaterial but that’s ok, as it’s going to be easy enough to manually reassign it to a MeshBasicMaterial in JavaScript.

Make sure to place your outline material in the last slot. This is going to make our lives easier in the next step.

We’ll also need to enable backface culling (this option means that the back faces of the material will not be rendered).

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Capture-decran-le-2026-05-29-a-14.55.18-1200x698.jpg.webp?x23502)

### **2\.** Solidify modifier

Now add a Solidify modifier with the following settings:  
– A negative thickness  
– Flipped normals  
– And provide the slot position of your outline material in “Material Offset”. In my case that would be “2”, but you can also simply fill in a high number and Blender will just select the last material slot of the mesh. That will make your life much easier if you’re going to copy this modifier across many objects that don’t necessarily have the same amount of slots.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Capture-decran-le-2026-05-29-a-14.57.09-1200x718.jpg.webp?x23502)

That’s it! When exporting as a glTF, don’t forget to select “_apply modifiers_” and “_export materials_”.

## Infinite Scrolling City

Zoomed-out view showing the repositioning of the chunks

No surprise here, I used a single repeatable chunk managed by a dynamic grid system that maintains a 3×3 layout around the camera. Tiles are cloned once and seamlessly repositioned as the camera moves, creating the illusion of an infinite city while keeping memory consumption low.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/tile-1200x675.jpg.webp?x23502)

Isolated view a single chunk

## Lighting

I guess it’s time for a little bit of self-promotion. In almost 100% of my projects, I like to use **Three.js LightKit** to handle the lighting.

It’s a simple add-on that lets you browse and test hundreds of different HDRs (the whole polyhaven library) in no time. It also lets you try different `toneMapping` and exposure settings.

Once you’re happy with your preset, just hit “export” to save it as a JSON file and load it as your default lighting setup.

Also, it works with WebGL and WebGPU projects, as well as vanilla JS and React.

If you want to check it out live, you can try out the demo here: [Three.js LightKit](https://threejs-lightkit.com/)

## That’s all folks!

Hope you enjoyed this breakdown and found some ideas you can apply to your own projects! 🫡