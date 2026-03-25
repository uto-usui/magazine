---
title: "Building a Dual-Scene Fluid X-Ray Reveal Effect in Three.js"
source: "https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/"
publishedDate: "2026-03-23"
category: "design"
feedName: "Codrops"
author: "Cullen Webber"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/ThreeJS-Fluid-Reveal.png?x79234)](https://tympanus.net/Tutorials/SkeletonFluidReveal/ "Building a Dual-Scene Fluid X-Ray Reveal Effect in Three.js Demo")

I’m [Cullen Webber](https://x.com/sinzvii), a creative full-stack developer based in Perth, Australia, with a passion for graphics programming and crafting immersive experiences on the web.

This tutorial walks you through creating a fluid X-ray effect in [Three.js](https://threejs.org/), leveraging a render pipeline powered by TSL [(Three.js Shading Language)](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language) and WebGPU.

A WebGL version is also available in the [WebGL](https://github.com/cullenwebber/three-skull/tree/webgl) branch of the [GitHub repository](https://github.com/cullenwebber/three-skull/tree/main) (Bloom is quite different).

## Breaking Down the Render Pipeline

This effect breaks down into five parts. It begins with a canvas-drawn mouse trail, which feeds into a ping-pong fluid simulation that diffuses it. Alongside this, two instanced Three.js scenes, one solid and one X-ray, are rendered to separate textures before a final post-processing pass composes and stylizes the result.

![Flowchart of the rendering pipeline from cursor input to screen output, showing how the mouse trail, fluid simulation, two 3D scenes, and post-processing compositor connect.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Diagram-1.png?x79234)

## Creating the Mouse Trail Canvas

The pipeline begins with a 2D canvas generating a simple black-on-white circular mask. This is then wrapped in a Three.js CanvasTexture, so the fluid simulation in the next step can sample it as a texture each frame.

```
export default class MouseTrail { ...
	
	#createCanvas(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = this.canvas.getContext("2d");
		this.lineWidth = Math.max(width * 0.2, 100);

		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, width, height);
	}

	#createTexture() {
		this.texture = new THREE.CanvasTexture(this.canvas);
		this.texture.minFilter = THREE.LinearFilter;
		this.texture.magFilter = THREE.LinearFilter;
		this.texture.generateMipmaps = false;
	}
	// ...
}
```

### Updating The Trail

Each frame, the trail smoothly follows the cursor (using linear interpolation), preventing jagged lines in the fluid simulation. When the cursor stops, the trail fades out, letting the solid scene restore itself. The draw method simply clears the canvas and strokes a single thick line that appears with movement and fades when idle.

```
export default class MouseTrail { ...
	
	update(mouseX, mouseY) {
		const targetX = mouseX * this.canvas.width;
		const targetY = mouseY * this.canvas.height;

		if (this.currentX === null) {
			this.currentX = targetX;
			this.currentY = targetY;
			this.lastX = targetX;
			this.lastY = targetY;
			return;
		}

		this.#lerp(targetX, targetY);
		this.#updateOpacity();
		this.#draw();

		this.lastX = this.currentX;
		this.lastY = this.currentY;
		this.texture.needsUpdate = true;
	}

	#draw() {
		const { canvas, ctx, lineWidth } = this;

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (this.opacity > 0.01) {
			ctx.beginPath();
			ctx.moveTo(this.lastX, this.lastY);
			ctx.lineTo(this.currentX, this.currentY);
			ctx.lineCap = "round";
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = `rgba(0, 0, 0, ${this.opacity})`;
			ctx.stroke();
		}
	}
	// ...
}
```

## Transforming the Mouse Trail into a Fluid

The fluid simulation takes the mouse trail canvas as input, transforming it into a dynamic fluid effect. On each frame, the trail is diffused outward, modulated with FBM ([Fractional Brownian motion](https://thebookofshaders.com/13/)) noise, and gradually fades to white.

### Implementing a Feedback Loop with Ping-Pong Rendering

This uses a technique called [ping-pong rendering](https://ostefani.dev/tech-notes/ping-pong-technique). Two render targets are maintained, and each frame one is read from while the other is written to, then they are swapped. The pair is necessary because the GPU cannot read and write the same texture in a single pass. Target A holds the previous frame’s result, the shader samples it and writes to Target B, then they trade places and the cycle continues.

```
export default class FluidSim { ...

	#createRenderTargets() {
		const opts = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			depthBuffer: false,
			stencilBuffer: false,
		};
		this.targetA = new THREE.RenderTarget(this.width, this.height, opts);
		this.targetB = new THREE.RenderTarget(this.width, this.height, opts);

		this.prevNode = texture(this.targetA.texture);
		this.maskNode = texture(this.targetA.texture);
	}

	#createFBOScene() {
		this.fboScene = new THREE.Scene();
		this.fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

		this.inputNode = texture(new THREE.Texture());

		const material = new MeshBasicNodeMaterial();
		material.colorNode = this.#createFluidShader();

		const geo = new THREE.PlaneGeometry(2, 2);
		// Flip geometry UVs Y so render target read-back is self-consistent in WebGPU
		const uvAttr = geo.attributes.uv;
		for (let i = 0; i < uvAttr.count; i++) {
			uvAttr.setY(i, 1.0 - uvAttr.getY(i));
		}
		this.fboQuad = new THREE.Mesh(geo, material);
		this.fboScene.add(this.fboQuad);
	}

	update(renderer, trailTexture) {
		this.prevNode.value = this.targetA.texture;
		this.inputNode.value = trailTexture;

		renderer.setRenderTarget(this.targetB);
		renderer.render(this.fboScene, this.fboCamera);
		renderer.setRenderTarget(null);

		// Update mask to read from the just-rendered target
		this.maskNode.value = this.targetB.texture;

		// Swap
		const temp = this.targetA;
		this.targetA = this.targetB;
		this.targetB = temp;
	}
	// ...

}
```

The `prevNode` and `maskNode` are TSL texture nodes that act as the bridge between this simulation and the rest of the pipeline. `prevNode` is what the shader samples from during the fluid pass, `maskNode` is what the post-processing compositor reads from downstream.

The simulation runs in its own scene with an orthographic camera and a fullscreen quad, so every pixel in the render target gets processed by the fluid shader.

Each frame, the update method sets `prevNode` to the last rendered frame, passes in the current mouse trail texture, renders the fluid shader to the other target, updates `maskNode` to the result, and swaps.

### Building the Fluid Shader

The shader samples FBM noise to generate a small UV offset per pixel, giving the fluid a turbulent, uneven look. Without it, the fluid spreads evenly, creating a flat blur. The noise runs at high frequency across four octaves, then is scaled down just enough to introduce subtle movement without breaking up the texture.

```
#createFluidShader() { ...

	const aspect = this.height / this.width;
	const aspectVec = this.width < this.height ? vec2(1.0, 1.0 / aspect) : vec2(aspect, 1.0);

	return Fn(() => { ...
		const uvCoord = uv();
		const disp = mul(mul(fbm(mul(uvCoord, 20.0), float(4)), aspectVec), 0.01);
		// ...
	}

}
```

The `aspectVec` adjusts for UV coordinates being normalized from 0 to 1, ensuring the displacement doesn’t stretch on non-square viewports.

Each frame, the previous frame is sampled at five positions: the current pixel and four neighbors offset by the noise. The darkest value from these samples is kept using `min()`. Because the trail paints black on white, this makes dark areas bleed outward, creating the spreading. The noise offsets ensure the result doesn’t look like a uniform blur.

```
#createFluidShader() { ...

	const blendDarken = Fn(([base, blend]) => min(blend, base));

	return Fn(() => { ...
		const texel  = this.prevNode.sample(uvCoord);
		const texel2 = this.prevNode.sample(vec2(add(uvCoord.x, disp.x), uvCoord.y));
		const texel3 = this.prevNode.sample(vec2(sub(uvCoord.x, disp.x), uvCoord.y));
		const texel4 = this.prevNode.sample(vec2(uvCoord.x, add(uvCoord.y, disp.y)));
		const texel5 = this.prevNode.sample(vec2(uvCoord.x, sub(uvCoord.y, disp.y)));

		const floodcolor = texel.rgb.toVar();
		floodcolor.assign(blendDarken(floodcolor, texel2.rgb));
		floodcolor.assign(blendDarken(floodcolor, texel3.rgb));
		floodcolor.assign(blendDarken(floodcolor, texel4.rgb));
		floodcolor.assign(blendDarken(floodcolor, texel5.rgb));
		// ...
	}
}
```

The new mouse trail is blended in the same way. Darker areas of the trail overwrite lighter values, letting the most recent movements show through.

```
#createFluidShader() { ...

	return Fn(() => { ...
		const flippedUV = vec2(uvCoord.x, sub(float(1.0), uvCoord.y));
		const input = this.inputNode.sample(flippedUV);
		const combined = blendDarken(floodcolor, input.rgb);
		// ...
	}
	// ...
}
```

A small amount of white is added each frame and clamped to 1.0. Dark pixels gradually drift back toward white, so when the cursor stops, the fluid slowly fades and the solid scene reappears. At 0.015 per frame, it takes roughly one second at 60 fps for a fully black pixel to return to white.

```
#createFluidShader() { ...

	return Fn(() => { ...
		return min(vec3(1.0), add(combined, vec3(0.015)));
	}
	// ...
}
```

### The Mask Output

The output is a grayscale texture updated every frame. White means show the solid scene, black means reveal the skeleton. The `maskNode` exposes this as a TSL texture node that plugs straight into the post-processing compositor.

## Instancing the Solid & X-Ray Scenes

The entire reveal effect relies on two scenes rendered with the same layout and camera angle. One scene shows the solid body, the other the skeleton. Both are composited later in the post-processing pipeline, so even slight differences between them will cause the reveal to appear incorrect.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Screenshot-2026-03-21-at-2.35.23-pm-scaled.webp?x79234)

Both scenes share a camera, environment map, fog, and lighting setup. The only differences are the models themselves and some minor material tweaks on the skeleton. Everything else is identical.

```
export default class Scene { ...

	#createScene() {
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x000000, 1, 3);
		scene.background = new THREE.Color(0x000000);
		scene.environment = this.envMap;
		scene.environmentIntensity = 0.1;

		const light = new THREE.PointLight(0xffffff, 0.75);
		light.position.set(1, 2, 1);
		scene.add(light);

		return scene;
	}
	// ...
}
```

The `#createScene()` method is called twice, once for `solidScene` and once for `wireScene`. Fog and a black background fade the figures at the edges, preventing them from cutting sharply against the darkness. The environment map is generated from `RoomEnvironment` and processed through a PMREM generator, providing soft ambient light without adding multiple individual lights. The intensity is kept low at 0.1, as the Fresnel material contributes most of the visual weight.

### Positioning & Instancing the Models

Twelve copies of each model are rendered, but only two draw calls are used, one per scene, thanks to `InstancedMesh`. The `InstancedModel` class loads a DRACO-compressed `.glb`, extracts the geometry by mesh name, applies the Fresnel material, and arranges all instances in a grid.

```
export default class InstancedModel { ...

	#setPositions(mesh) {
		const { count, spacing } = this;
		const gridSize = Math.ceil(Math.sqrt(count));
		const halfSize = ((gridSize - 1) * spacing) / 2;
		const spacingZ = spacing * 0.65;
		const halfSizeZ = ((gridSize - 1) * spacingZ) / 2;
		const dummy = new THREE.Object3D();

		for (let i = 0; i < count; i++) {
			const x = i % gridSize;
			const z = Math.floor(i / gridSize);
			const xOffset = z % 2 === 1 ? spacing / 2 : 0;

			dummy.position.set(
				x * spacing - halfSize + xOffset,
				0,
				z * spacingZ - halfSizeZ,
			);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
		}
		mesh.instanceMatrix.needsUpdate = true;
	}
	// ...
}
```

The grid uses a hexagonal stagger. Every other row gets offset by half a spacing unit on the X axis. This stops it looking like a rigid spreadsheet and gives it a more natural, packed arrangement. The Z spacing is compressed to `0.65` of the X spacing so the grid feels tighter front to back, which works better with the camera angle used.

### Matching the Skeleton to the Body

To get the skeleton to sit correctly inside the body, both models need to occupy the same space. Exact topology isn’t required; the skeleton just needs to fit neatly within the body mesh. In Blender, centre both models at the origin, match their scale, apply all transforms, and export them as .glb files with DRACO compression.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/blender-file-800x448.webp?x79234)

### Building the Glowing Material

This is what gives the figures their look. The Fresnel effect makes edges glow bright while surfaces facing the camera stay dark, creating that X-ray, hologram feel. We mix between a near-black core and a bright blue at the edges, then pipe that same colour into the emissive channel so the figures glow on their own without needing strong scene lighting.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Half-skeleton-Half-Model-1-scaled.webp?x79234)

```
export function createFresnelMaterial({
  heightMax = 1.0,
  roughness = 1.0,
  color = vec3(0.2, 0.6, 1.0),
  emissiveIntensity = 0.75,
}) {
  const material = new MeshStandardNodeMaterial({
    metalness: 0,
    roughness,
  });

  const fresnel = pow(
    sub(float(1.0), normalView.dot(positionViewDirection.negate())),
    float(1.0),
  );

  const coreColor = vec3(0.0, 0.05, 0.1);
  const fresnelColor = mix(coreColor, color, fresnel);

  const heightFade = smoothstep(0.5, heightMax, positionLocal.y);
  const finalColor = fresnelColor.mul(heightFade);

  material.colorNode = finalColor;
  material.emissiveNode = finalColor.mul(emissiveIntensity);

  return material;
}
```

Both models are cut at the torso to save vertices. A `smoothstep` along local Y fades the bottom to black, hiding the hard edge and creating the appearance of light falloff.

### Adding Camera Movement with Touch Fallback

Both scenes share a single `PerspectiveCamera` with a narrow 17° field of view. The tight FOV compresses depth, making the grid feel like a wall of figures rather than a scattered crowd. The camera follows the cursor with a smooth, damped ease while maintaining a fixed look point, adding a subtle sense of depth during movement.

## Building the Post-Processing Pipeline

This is where everything comes together. The `PostProcessing` class takes both scenes, the camera, and the fluid mask, compositing them into the final image through a chain of TSL effects.

```
export default class PostProcessing { ...
	constructor(renderer, solidScene, wireScene, camera, fluidMaskNode) { ...
		this.pipeline = new THREE.RenderPipeline(renderer);
		this.#compose();
		// ...
	}

	#compose() { ...
		const solidPass = pass(this.solidScene, this.camera);
		const solidColor = solidPass.getTextureNode("output");

		const wirePass = pass(this.wireScene, this.camera);
		const wireColor = wirePass.getTextureNode("output");
		// ...
	}
}
```

Each scene has its own render pass, producing a texture node that can be sampled downstream.

Bloom affects only the solid scene, adding a subtle glow to the Fresnel edges while preserving the skeleton’s detail (I felt the scene lost a lot of its mojo when the bloom was applied on the skeleton scene).

```
export default class PostProcessing { ...	
	#compose() { ...
		const bloomPass = bloom(solidColor.sample(screenUV), 0.4, 0.05);
		// ...
	}
	// ...
}
```

Scan lines are layered over the bloom. A high-frequency sine wave along the screen’s Y axis is clamped to negative values, darkening the image and keeping the effect subtractive rather than adding brightness.

```
export default class PostProcessing { ...	
	#compose() { ...
		const scanRaw = sin(mul(screenUV.y, float(1250.0)));
		const scanDarken = clamp(scanRaw, -1.0, 0.0).mul(-0.15);
		const scanLines = sub(float(1.0), scanDarken);
		const bloomWithScanLines = bloomPass.mul(scanLines);
		// ...
	}
	// ...
}
```

The fluid mask composite forms the core of the effect. The mask is inverted and used to blend between the processed solid scene and the raw wire scene.

```
export default class PostProcessing { ...	
	#compose() { ...
		const fluidMask = sub(float(1.0), this.fluidMaskNode.sample(screenUV).r);
		const blended = mix(
			bloomWithScanLines,
			wireColor.sample(screenUV),
			fluidMask,
		);
		// ...
	}
	// ...
}
```

After that it’s just atmosphere. Film grain so the image doesn’t feel too clean, a slight desaturation to pull back the blue a bit, and a colour grade that mixes dark blue into the blacks to lift the shadows. Honestly these were all just tweaked by eye until it felt right.

```
export default class PostProcessing { ...	
	#compose() { ...

		const noise = mx_noise_float(
			vec3(screenUV.mul(2000.0), time.mul(20.0)),
		).mul(0.015);

		const withEffects = blended.sub(noise);

		const luminance = dot(withEffects, vec3(0.299, 0.587, 0.114));

		const desaturated = mix(
			vec3(luminance, luminance, luminance),
			withEffects,
			float(0.985),
		);

		const lowContrast = mix(vec3(0.0, 0.0, 0.2), desaturated, float(0.9));

		this.pipeline.outputNode = lowContrast;
		// ...
	}
	// ...
}
```

## Understanding the Render Loop

The orchestration is simple. Each frame updates the scene, feeds the mouse position into the trail, runs the fluid simulation from that input, and renders the post-processing pipeline.

```
class Three { ...
	#animate() {
		const delta = this.clock.getDelta();

		this.scene.animate(delta, this.clock.elapsedTime);

		// Update mouse trail → fluid sim
		this.mouseTrail.update(
			this.scene.cameraRig.mouseNormalized.x,
			this.scene.cameraRig.mouseNormalized.y,
		);

		this.fluidSim.update(this.context.renderer, this.mouseTrail.texture);

		// Render everything (scene passes + effects)
		this.postProcessing.render();

		requestAnimationFrame(() => this.#animate());
	}
	// ...
}
```

## The Final Product

Here’s the final effect with everything wired up. Mouse trail, fluid simulation, both instanced scenes, and the post-processing pipeline all running together.

## Conclusion

If you want to take it further, everything here is modular. Swap the models, change the fluid behaviour, tweak the post-processing and you’ve got something completely different. I’m always experimenting with this kind of stuff so feel free to reach out on X [@sinzvii](https://x.com/sinzvii) if you have questions or just want to chat about Three.js. Thanks for reading.