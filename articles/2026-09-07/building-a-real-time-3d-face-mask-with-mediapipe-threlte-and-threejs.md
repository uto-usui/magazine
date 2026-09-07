---
title: "Building a Real-Time 3D Face Mask with MediaPipe, Threlte and Three.js"
source: "https://tympanus.net/codrops/2026/09/06/building-a-real-time-3d-face-mask-with-mediapipe-threlte-and-three-js/"
publishedDate: "2026-09-06"
category: "design"
feedName: "Codrops"
author: "Marek Jóźwiak"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/3dfacemask.png.webp?x57826)](https://experiment-001.madebyhex.workers.dev/ "Building a Real-Time 3D Face Mask with MediaPipe, Threlte and Three.js Demo")

_**Editor’s Note:**_ _As our Three.js Conference celebration continues, we’re especially excited to shine a light on **Marek Jóźwiak** today. Marek was so amazing to submit this fantastic tutorial and demo, and his talent and attention to detail really shine through in this exploration of MediaPipe, Threlte, and Three.js. We’re thrilled to have his work as part of our celebration and can’t wait for you to dive in!_

**🎟️ Paris is calling!** The very first Three.js Conference is coming to Paris for two days of talks, ideas, and connections. Use code `CODROPS` for **15% off** and **[get your ticket →](https://threejs.paris/tickets)**

I started this experiment with a modest goal: put a Three.js material on my face.

The first prototype was less convincing than that sentence sounds. MediaPipe tracked the face, but Three.js still had no surface to render. After I supplied a topology, the mesh and the mirrored, cropped video disagreed about framing. Then the texture appeared upside down.

That sequence became the actual subject of the experiment: recovering Google’s fixed face topology, transferring UVs from the canonical model, and projecting the result into the same view as the camera image. Initializing MediaPipe and Three.js was the easy part.

## From landmarks to a textured mesh

The runtime has two clocks. MediaPipe analyzes the video and writes its latest result to a mutable reference. Threlte reads that reference inside its render task and mutates the existing `BufferGeometry`. Inference can miss a render frame without pushing 468 changing positions through Svelte’s reactive graph.

The camera layer itself is conventional. The detail that matters later is visual: the video uses `object-cover` and is mirrored, so the projection applied to the mesh must reproduce both operations.

I wrapped MediaPipe in a small service class. It resolves the Tasks Vision WASM files, loads the float16 face model, and selects the GPU delegate.

```
const VISION_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm';

const filesetResolver = await FilesetResolver.forVisionTasks(VISION_BASE_URL);

this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
	baseOptions: {
		modelAssetPath:
			'https://storage.googleapis.com/mediapipe-models/' +
			'face_landmarker/face_landmarker/float16/1/' +
			'face_landmarker.task',
		delegate: 'GPU'
	},
	outputFaceBlendshapes: true,
	runningMode: 'VIDEO',
	numFaces: 1
});
```

Video mode expects a monotonically increasing timestamp. `performance.now()` is a convenient source:

```
startPrediction(videoElement: HTMLVideoElement) {
  const predict = () => {
    if (
      this.faceLandmarker &&
      videoElement.readyState >= 2
    ) {
      const results = this.faceLandmarker.detectForVideo(
        videoElement,
        performance.now()
      );

      this.landmarksRef.current = results;
    }

    this.requestRef = requestAnimationFrame(predict);
  };

  predict();
}
```

I store the result in `landmarksRef`, a plain object rather than a deeply reactive Svelte array:

```
landmarksRef = { current: null };
```

Nothing in the DOM needs to rerender when 468 positions change. Three.js will read them during its own frame loop. Keeping this hot data path outside Svelte’s reactive graph avoids asking the UI framework to observe thousands of number assignments per second.

The bundled model returns 478 landmarks. This mesh consumes the first 468 because they match MediaPipe’s canonical face model and its fixed topology. The remaining ten describe the irises and are not needed for the mask surface.

That produced stable landmark positions, but not a surface. I still needed the index buffer that describes which landmark IDs form each face:

```
[
	127,
	34,
	139, // triangle 1
	11,
	0,
	37, // triangle 2
	232,
	231,
	120 // triangle 3
];
```

The order is significant because it determines winding and therefore which side Three.js treats as the front face.

Google had already published the face mesh topology I needed. I found the flattened array in the [face landmark detection demo in Google’s TensorFlow.js models repository](https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/demos/shared/triangulation.js). That file starts with the same sequence:

```
127, 34, 139,
11, 0, 37,
232, 231, 120,
```

It contains 2,640 indices, or 880 triangles. I copied the flattened data into `FaceTriangulation.ts` and use it directly as `FACE_MESH_TRIANGULATION`.

The current MediaPipe repository also publishes [`FACE_LANDMARKS_TESSELATION`](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/python/vision/face_landmarker.py#L2744) in the Python Face Landmarker API. It stores connections rather than triangle triples. Its opening entries are:

```
Connection(127, 34),
Connection(34, 139),
Connection(139, 127),

Connection(11, 0),
Connection(0, 37),
Connection(37, 11),
```

The connection table encodes the same opening triangles as closed edge cycles. `127 → 34 → 139 → 127` becomes `[127, 34, 139]`; `11 → 0 → 37 → 11` becomes `[11, 0, 37]`.

The TensorFlow.js representation is more convenient for an indexed `BufferGeometry` because it is already flattened into triangle triples. The MediaPipe connection sets remain useful when an effect needs named regions such as the eyes, lips, or face oval.

Both repositories publish the relevant code under the Apache 2.0 license.

With the index recovered, I could allocate the geometry buffers once:

```
const vertexCount = 468;
const indices = new Uint16Array(FACE_MESH_TRIANGULATION);
const positions = new Float32Array(vertexCount * 3);
const uvs = FACE_MESH_UVS;
```

Then Threlte creates the Three.js buffer attributes:

```
<T.BufferGeometry bind:ref={geometry}>
	<T.BufferAttribute
		args={[positions, 3]}
		attach="attributes.position"
		count={vertexCount}
		itemSize={3}
		usage={THREE.DynamicDrawUsage}
	/>

	<T.BufferAttribute args={[uvs, 2]} attach="attributes.uv" count={vertexCount} itemSize={2} />

	<T.BufferAttribute args={[indices, 1]} attach="index" count={indices.length} itemSize={1} />
</T.BufferGeometry>
```

`DynamicDrawUsage` is a driver hint, not an update mechanism. The later `position.needsUpdate = true` marks the buffer for upload. Topology and UVs stay fixed; only the 468 XYZ positions are rewritten.

Wireframe mode is the best first test. A solid black material can hide bad topology surprisingly well, while a wireframe immediately shows disconnected vertices, a reversed face, or a badly scaled depth axis.

![Wireframe face mesh showing the fixed triangular connections between MediaPipe landmarks.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/2-wireframe-1600w-1200x680.jpg.webp?x57826)

The triangle index solved connectivity. Texture mapping introduced a second indexing problem: the UV attribute still had to be reordered into the same 468-entry vertex order.

Google provides a [`canonical_face_model.obj`](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/modules/face_geometry/data/canonical_face_model.obj) in the MediaPipe repository. The [Face Geometry documentation](https://github.com/google-ai-edge/mediapipe/wiki/MediaPipe-Face-Mesh#canonical-face-model) describes it as the bridge between a static asset and the runtime landmark set. The useful invariant here is the shared landmark index space: vertex 127 in the canonical asset corresponds to landmark 127 returned by the detector.

The same directory also contains Google’s [canonical\_face\_model\_uv\_visualization.png](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/modules/face_geometry/data/canonical_face_model_uv_visualization.png). It is an excellent debug texture because its printed grid makes flipped or mismatched UVs obvious.

The OBJ contains:

-   468 `v` records for vertex positions;
-   468 `vt` records for texture coordinates;
-   898 `f` records describing faces.

The counts reveal an important distinction between the two source files. The TensorFlow.js index has 880 triangles, while the canonical OBJ has 898 faces, and the face lists are not identical. I do not combine them. The runtime index comes entirely from `triangulation.js`; the OBJ is only used to recover the UV assigned to each of the 468 vertex IDs.

This is valid because a `BufferGeometry` index addresses every vertex attribute at once. Once the UV array is reordered to match the landmark positions, each selected triangle interpolates position and UV from the same three indices. The OBJ’s own `f` records are necessary during extraction because they reveal the vertex-to-UV mapping, not because they become the runtime index buffer.

The next problem was recovering the actual vertex-to-UV relation. The number of `v` and `vt` records happens to match, but their file order is not the mapping. OBJ face records carry that relationship explicitly:

```
f 174/43 156/119 134/220
```

Here `174/43` means vertex 174 uses texture coordinate 43. OBJ indices are one-based, so both values are decremented before they address JavaScript arrays.

I wrote a small Node script to extract that relationship and generate a typed TypeScript array. Parsing an OBJ at runtime would make the demo heavier for no benefit because these UVs never change.

The input and output paths are resolved relative to the script, so it can be run from the project root with `node scripts/extract-uvs.js`:

```
const objPath = join(__dirname, '../src/lib/assets/models/canonical_face_model.obj');

const outputPath = join(__dirname, '../src/lib/utils/FaceUVs.ts');
```

The parser collects `vt` records, then resolves their relationship to vertices from each `f` token:

```
const textureCoords = [];
const vertexToUV = new Map();

for (const line of lines) {
	const trimmed = line.trim();

	if (trimmed.startsWith('vt ')) {
		const parts = trimmed.split(/\s+/);
		const u = parseFloat(parts[1]);
		const v = parseFloat(parts[2]);

		textureCoords.push([u, v]);
	} else if (trimmed.startsWith('f ')) {
		const parts = trimmed.split(/\s+/).slice(1);

		for (const part of parts) {
			const indices = part.split('/');
			const vertexIdx = parseInt(indices[0]) - 1;
			const uvIdx = parseInt(indices[1]) - 1;

			if (!vertexToUV.has(vertexIdx)) {
				vertexToUV.set(vertexIdx, uvIdx);
			}
		}
	}
}
```

In this canonical file, all 468 vertices resolve to exactly one unique UV, so the relation is a bijection. Keeping the first assignment is safe here, but it is not a general-purpose OBJ strategy: a model with UV seams may assign several texture coordinates to one geometric vertex and must duplicate that vertex in the render buffer.

With that map built, the script emits UVs in landmark order:

```
const uvArray = [];

for (let i = 0; i < 468; i++) {
	const uvIdx = vertexToUV.get(i);

	if (uvIdx !== undefined && textureCoords[uvIdx]) {
		const [u, v] = textureCoords[uvIdx];
		uvArray.push(u, 1.0 - v);
	} else {
		uvArray.push(0.5, 0.5);
	}
}
```

The generated `Float32Array` contains 936 values, two for each vertex, and the `1.0 - v` conversion flips the vertical texture coordinate. Since that flip already happens in the generated data, I disable Three.js’s usual image flip when loading the texture:

```
texture.flipY = false;
texture.colorSpace = THREE.SRGBColorSpace;
```

Missing that relationship gave me an upside-down mask. Flipping either the UV data or the texture is fine; flipping both is not.

## Matching the mesh to the camera

With topology and UVs solved, the next mismatch was spatial. MediaPipe returns normalized coordinates, while the mesh lives in Three.js world units.

For a perspective camera, the visible height at a distance `d` is:

```
const distance = camera.position.z;
const vFov = (camera.fov * Math.PI) / 180;
const height = 2 * Math.tan(vFov / 2) * distance;
const width = height * viewportAspect;
```

If the video were stretched to the viewport, `width` and `height` would be enough. It uses `object-cover`, so we need to reproduce that sizing rule:

```
let scaleX = width;
let scaleY = height;

const videoAspect = videoElement.videoWidth / videoElement.videoHeight;
const screenAspect = viewportWidth / viewportHeight;

if (screenAspect > videoAspect) {
	scaleY = width / videoAspect;
} else {
	scaleX = height * videoAspect;
}
```

When the screen is wider than the camera image, `object-cover` fits the video to the screen width and crops it vertically. In that case the WebGL plane must also become taller. On a relatively narrow screen, the video fits by height and overflows horizontally, so the WebGL plane becomes wider.

Now each landmark can be mapped into the visible plane while retaining MediaPipe’s relative depth:

```
const z = -landmark.z * scaleX * maskScale * depthScale + offsetZ;
const depthRatio = (distance - z) / distance;

const x = ((0.5 - landmark.x) * scaleX * maskScale + offsetX) * depthRatio;

const y = (-(landmark.y - 0.5) * scaleY * maskScale + offsetY) * depthRatio;
```

Subtracting `0.5` recenters normalized coordinates. The signs on X and Y account for the mirrored video and opposing image/WebGL Y axes. Z follows the visible width, with a separate multiplier because MediaPipe depth is relative rather than a Three.js world-space measurement.

MediaPipe’s X and Y values are already projected screen coordinates. Giving each vertex a non-zero Z position and then passing it through a perspective camera would project it again, shifting it away from the tracked position. Here the camera is fixed at `(0, 0, 5)` and the reference plane is `z = 0`, so multiplying X and Y by `(distance - z) / distance` moves the vertex along the same camera ray. Perspective projection then returns it to the tracked screen position while Z still shapes the surface normals and lighting.

The scale and offsets are exposed in Tweakpane. They are useful while developing, especially when testing different webcams, but the aspect calculation does most of the alignment work.

With the projection defined, the Threlte `useTask` callback can write the current landmark positions into the existing buffer. It hides the mask when no face is available:

```
useTask(() => {
	if (!landmarkRef.current?.faceLandmarks?.length || !videoElement || !geometry || !mesh) {
		if (mesh) mesh.visible = false;
		return;
	}

	mesh.visible = true;

	const face = landmarkRef.current.faceLandmarks[0];
	const position = geometry.attributes.position;

	for (let i = 0; i < 468; i++) {
		const landmark = face[i];
		if (!landmark) continue;

		const z = -landmark.z * scaleX * maskScale * depthScale + offsetZ;
		const depthRatio = (distance - z) / distance;
		const x = ((0.5 - landmark.x) * scaleX * maskScale + offsetX) * depthRatio;
		const y = (-(landmark.y - 0.5) * scaleY * maskScale + offsetY) * depthRatio;

		position.setXYZ(i, x, y, z);
	}

	position.needsUpdate = true;
	geometry.computeVertexNormals();
});
```

No geometry is allocated inside the hot loop. The index and UV attributes never move, and the position attribute keeps the same size for the life of the component. Replacing it every frame would create garbage and force Three.js to rebuild GPU resources.

Normals do need to change. A `MeshPhysicalMaterial` reacts to light according to the surface normal, and the surface changes when I turn my head or open my mouth. `computeVertexNormals()` recalculates them after the position update.

Once the geometry was stable, I wanted to inspect it in two ways. The experiment keeps one `MeshPhysicalMaterial` and switches its map at runtime. Texture mode sets the base color to white, then neutralizes the physical properties that would obscure the UV debug image:

```
const useTexture = maskState.renderMode === 'texture';

material.map = useTexture ? maskTexture : null;
material.color.set(useTexture ? '#ffffff' : maskState.color);
material.metalness = useTexture ? 0 : maskState.metalness;
material.roughness = useTexture ? 1 : maskState.roughness;
material.clearcoat = useTexture ? 0 : maskState.clearcoat;
material.clearcoatRoughness = useTexture ? 0 : maskState.clearcoatRoughness;
material.transmission = useTexture ? 0 : maskState.transmission;
material.thickness = useTexture ? 0 : maskState.thickness;
material.iridescence = useTexture ? 0 : maskState.iridescence;
material.flatShading = useTexture ? false : maskState.flatShading;
material.needsUpdate = true;
```

`needsUpdate` matters because adding or removing a map changes the shader defines. The texture is disposed when the component unmounts; the MediaPipe animation frame is canceled and the landmarker is closed by its service.

The same separation shaped the component boundary. `FaceLandmarkerService` owns inference and its latest result; `FaceMask.svelte` owns the per-frame geometry mutation. Material controls live in slower reactive state. Making the landmark array deeply reactive would add bookkeeping without creating a useful DOM update.

Threlte also keeps the scene markup short without hiding Three.js. `BufferGeometry`, `BufferAttribute`, `MeshPhysicalMaterial`, `DynamicDrawUsage`, and `computeVertexNormals()` are still the same Three.js objects and APIs.

The surprising part of this experiment was not loading a machine-learning model. MediaPipe makes that fairly direct. The real work was understanding the data around the model: the fixed face topology, the canonical OBJ, UV indexing, image orientation, and the camera crop.

Once those pieces agree, the face becomes an ordinary dynamic Three.js mesh. It can use a physical material, a diagnostic UV image, or any texture designed around the canonical layout. The tracking model supplies the motion, but the mesh is open to the same rendering ideas as any other geometry in a WebGL scene.

And if you ever find yourself staring at a file that begins with `127, 34, 139`, at least now you know where it came from.