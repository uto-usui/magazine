---
title: "Building a Scroll-Driven 3D Gallery Using a Blender Camera Path with Three.js and GSAP"
source: "https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/"
publishedDate: "2026-07-07"
category: "design"
feedName: "Codrops"
author: "Gaspard Hedde"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/curvegallery_cover.png.webp?x68649)](https://tympanus.net/Tutorials/CurveGallery/ "Building a Scroll-Driven 3D Gallery Using a Blender Camera Path with Three.js and GSAP Demo")

In this tutorial, we’ll build an interactive 3D gallery that follows a hand-drawn path. Images are distributed along a curve created in Blender, while the camera moves through the scene in response to scroll. As images approach the camera, they scale up as if coming into focus, while the rest remain quietly in the background.

The result feels like a continuous camera dolly shot. Every scroll advances the camera a little further along the path, creating the illusion of traveling through a three-dimensional space.

We’ll use three tools:

-   **Blender** to draw and export the camera path
-   **Three.js** to reconstruct the path and render the scene
-   **GSAP** to drive the camera movement and smooth the scale transitions

The inspiration for this comes from [digital artwork](https://www.cosmos.so/e/780940495) by creative studio [BAXSTUDIO](https://www.cosmos.so/search/elements/BAXSTUDIO?origin=caption).

## 1\. Drawing and Exporting the Camera Path from Blender

Everything starts in Blender, where we’ll create the path the camera will follow.

Add a curve (`Add → Curve → Bezier`), switch to **Edit Mode**, and shape it however you like. The curve defines the rhythm of the gallery—a spiral, a wave, a sharp turn, or a long straight section will all produce a different experience. This is the main creative decision in the project.

Once you’re happy with the path, we’ll export it as a JSON file that can be reconstructed in Three.js.

### Exporting the Curve

Open Blender’s **Scripting** workspace, create a new script (`Scripting → New`), and paste in the following Python code:

```
import bpy
import json

obj = bpy.context.active_object
depsgraph = bpy.context.evaluated_depsgraph_get()
obj_eval = obj.evaluated_get(depsgraph)

mesh = obj_eval.to_mesh()

points = []
for v in mesh.vertices:
    co = obj.matrix_world @ v.co
    points.append([round(co.x, 3), round(co.z, 3), round(-co.y, 3)])

obj_eval.to_mesh_clear()

path = "/you/path/path1.json"
with open(path, "w") as f:
    json.dump(points, f)

print("export done")
```

One line deserves a closer look:

```
points.append([round(co.x, 3), round(co.z, 3), round(-co.y, 3)])
```

Blender and Three.js use different coordinate systems. In Blender, the **Z** axis points up, whereas in Three.js the **Y** axis is the vertical axis. Exporting the coordinates as-is would rotate the entire curve, causing the camera to move through the scene incorrectly.

This remapping converts Blender’s coordinates into Three.js’ coordinate system:

-   `X` → `X`
-   `Z` → `Y`
-   `Y` → `-Z` (the negative sign preserves the correct orientation)

Once the export is complete, select your curve and run the script. It generates a JSON file containing the sampled points:

```
[[-27.559, 0.0, -0.0], [-27.56, 0.02, -0.022], [-27.56, 0.04, -0.044], ...]
```

Place the exported file in `public/paths/path1.json`. In the next section, we’ll load it into Three.js and reconstruct the curve.

## 2\. Setting Up the Scene and Reconstructing the Curve

With the curve exported, we can now reconstruct it in Three.js and build the scene around it.

### Setting Up the Scene

We’ll start by creating the renderer, the scene, and the camera:

```
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('canvas-container').appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
scene.fog = new THREE.Fog(0xffffff, 10, 40)

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
```

The fog isn’t essential to the effect, but it helps reinforce the sense of depth by gradually fading distant images into the background.

### Scene Constants

Next, let’s define the constants that control the scene:

```
const SCALE = 16 // The curve is defined in Blender units. multiply it by 16 to obtain a consistent size within the scene.
const TEX_VARIANTS = 12 // Number of images in the /img folder
const textureLoader = new THREE.TextureLoader()
const textures = loadTextureVariants(TEX_VARIANTS, textureLoader)

const TOTAL = 500 // Total number of planes to create along the curve
const CAM_Z = 10 // Camera offset along the Z axis
const FOCUS_DIST = 5.5 // The distance from the camera at which planes start to scale up
const MAX_SCALE = 14 // The maximum scale factor for the planes
const Z_GATE = 11 // Filters out planes that are too far away in depth to avoid unnecessary calculations

const LATERAL_OFFSET_RANGE = [-1, 1]
const DEPTH_OFFSET_RANGE = [-0.75, 0.75]
const SIZE_RANGE = [0.18, 0.4]
```

Loading and Reconstructing the Curve

Next, we’ll load the exported JSON file and reconstruct the curve using `THREE.CatmullRomCurve3`:

```
function toScaledVector3([x, y, z], scale) {
  return new THREE.Vector3(x * scale, y * scale, z * scale)
}

function buildCurve(raw) {
  const points = raw.map(p => toScaledVector3(p, SCALE))
  return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5)
}
```

`THREE.CatmullRomCurve3` takes an array of `THREE.Vector3` points and generates a smooth curve that passes through each one. The constructor accepts a few important parameters:

-   `true` closes the curve, allowing the camera to loop indefinitely without ever reaching an end.
-   `'catmullrom'` selects the interpolation algorithm. Catmull-Rom produces a smooth curve while ensuring it passes through every point.
-   `0.5` sets the curve’s tension, controlling how tightly it bends between points.

We load the exported JSON asynchronously when the application starts:

```
async function init() {
  const raw = await fetch('/paths/path1.json').then(r => r.json())
  const curve = buildCurve(raw)
```

### Reading the Curve

To place objects along the curve, we need two pieces of information at any given point: its position and the direction the curve is heading. We can retrieve both with a small utility function:

```
function getCurveFrame(curve, t) {
  const pos = curve.getPoint(t)
  const tangent = curve.getTangent(t)
  return { pos, nx: -tangent.y, ny: tangent.x }
}
```

`t` is a normalized value between `0` and `1` representing progress along the curve. `curve.getPoint(t)` returns the corresponding position as a `THREE.Vector3`, while `curve.getTangent(t)` returns the curve’s direction at that same point.

To scatter the planes to either side of the path, we also need a vector that’s perpendicular to the tangent. We compute this **normal** by rotating the tangent 90° in the **XY** plane:

The normal is then used to apply lateral offsets relative to the curve, so the planes naturally follow every bend instead of being offset along a fixed world axis.

`nx` and `ny` define the normal’s components.

## 3\. Distributing Planes Along the Curve

Now that the curve is ready, we can populate the scene. We’ll create 500 image planes, distribute them evenly along the path, and assign each one a random texture.

### Loading the Textures

We’ll start by loading all the texture variants upfront:

```
const textureLoader = new THREE.TextureLoader()
const textures = loadTextureVariants(TEX_VARIANTS, textureLoader)

function loadTextureVariants(count, loader) {
  return Array.from({ length: count }, (_, i) => loader.load(`/img/picture${i + 1}.webp`))
}
```

We load every texture once at startup and reuse them across all 500 planes. Each plane simply picks one at random from this pool. Reusing texture instances is much more efficient than creating a new texture for every mesh, reducing both GPU memory usage and loading overhead.

### Creating and Placing the Planes

```
const planes = []

for (let i = 0; i < TOTAL; i++) {
  const t = i / TOTAL // distribute planes evenly along the curve

  const { pos, nx, ny } = getCurveFrame(curve, t) // get position and local normal at this point on the curve

  // random offsets to distribute the objects along the curve
  const lateralOffset = randomBetween(...LATERAL_OFFSET_RANGE)
  const depthOffset = randomBetween(...DEPTH_OFFSET_RANGE)
  const size = randomBetween(...SIZE_RANGE)

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: textures[Math.floor(Math.random() * TEX_VARIANTS)], // assign a random texture
      side: THREE.DoubleSide,
    })
  )

  mesh.position.set(
    pos.x + nx * lateralOffset, // lateral offset in the XY plane
    pos.y + ny * lateralOffset, // lateral offset in the XY plane
    pos.z + depthOffset // depth offset
  )

  mesh.userData.t = t
  mesh.userData.lateralOffset = lateralOffset
  mesh.userData.depthOffset = depthOffset
  mesh.userData.setScale = createScaleAnimator(mesh) // attach a pre-built GSAP animator for smooth scale transitions

  planes.push(mesh)
  scene.add(mesh)
}
```

The planes aren’t placed randomly along the curve. Their base position is determined by `t = i / TOTAL`, ensuring they’re evenly distributed from start to finish. Randomness is only applied to their lateral offset, depth offset, and size, producing a more organic layout without creating clusters or gaps.

Rather than offsetting planes along a fixed world axis, we use the curve’s local normal (`nx`, `ny`). This keeps the distribution perpendicular to the path, regardless of how the curve bends.

We also store a few values in each mesh’s `userData`. This includes its position along the curve (`t`), its random offsets, and a reusable scale animator. Since these values never change, they can simply be read back during each animation frame instead of being recomputed.

### Creating the Scale Animator

Each plane gets its own scale animator, built with `gsap.quickTo()`:

```
function createScaleAnimator(mesh) {
  const proxy = { value: 1 }
  return gsap.quickTo(proxy, 'value', {
    duration: 0.4,
    ease: 'power3.out',
    onUpdate: () => mesh.scale.setScalar(proxy.value),
  })
}
```

`gsap.quickTo()` returns a reusable function that animates a property toward whatever value you pass it. Instead of creating a new tween every time the scale changes, it updates the existing one. That’s exactly what we need here: every plane receives a new target scale on every animation frame. Without `quickTo()`, we’d be creating 500 new tweens per frame, which would quickly become a performance bottleneck.

The `proxy` object acts as an intermediate value that GSAP can animate. On every update, we simply copy `proxy.value` to the mesh using `mesh.scale.setScalar()`. This keeps the animation logic separate from the Three.js object while still producing a smooth scale transition.

## 4\. Scroll-Driven Camera Movement

With the scene in place, the only thing left is to move the camera. Rather than animating it in world space, we’ll move it along the curve in response to the user’s scroll.

### The Principle

The camera’s position is defined by a single parameter, `t`, which ranges from `0` to `1`. A value of `0` corresponds to the start of the curve, while `1` brings us back to the same point since the curve is closed.

Instead of updating `t` directly from the scroll input, we maintain two values:

-   `targetT`: updated immediately whenever the user scrolls.
-   `camProxy.t`: a smoothed version of `targetT`, animated by GSAP.

This separation lets the camera react instantly to user input while still moving smoothly through the scene.

```
const camProxy = { t: 0 }
const setCamT = gsap.quickTo(camProxy, 't', { duration: 1, ease: 'power3.out' })

let targetT = 0
const SENSITIVITY = 1 / (window.innerHeight * 4)
```

`SENSITIVITY` controls how much the camera moves for a given scroll input. Scaling it by `window.innerHeight` keeps the interaction feeling consistent across different screen sizes, so scrolling the full height of the viewport advances the camera by roughly the same amount regardless of the device.

### Capturing Scroll with GSAP Observer

We’ll use GSAP’s `Observer` plugin to capture the user’s input:

```
Observer.create({
  target: window,
  type: 'wheel,touch,pointer',
  onChange: (self) => {
    targetT += self.deltaY * SENSITIVITY
    setCamT(targetT)
  },
})
```

`Observer` is a GSAP plugin that unifies wheel, touch, and pointer input behind a single API. Instead of handling different events for different devices, we always receive the same normalized `deltaY` value, making the scroll logic identical on desktop and touch screens.

On each input event, we update `targetT` and call `setCamT()`. Rather than jumping directly to the new value, `gsap.quickTo()` smoothly animates `camProxy.t` toward it using a one-second `power3.out` ease. Because the camera position is derived from `camProxy.t`, the camera naturally glides along the curve.

### Updating the Camera in the Animation Loop

Inside the `animate()` loop, we convert the current `camProxy.t` value into a 3D position:

```
function animate() {
  requestAnimationFrame(animate)

  const t = ((1 - camProxy.t) % 1 + 1) % 1

  const pathPos = curve.getPoint(t)
  camera.position.set(pathPos.x, pathPos.y, pathPos.z + CAM_Z)
```

`CAM_Z` offsets the camera by 10 units along the world **Z** axis. Instead of sitting directly on the curve, the camera stays slightly in front of it, giving the scene a better viewing angle and preventing it from passing through the planes.

One line deserves a closer look:

```
const t = ((1 - camProxy.t) % 1 + 1) % 1
```

The expression does three things:

-   `1 - camProxy.t` reverses the direction of travel, so scrolling down moves the camera forward along the curve.
-   `% 1` wraps the value so it stays within the curve’s normalized range of `0` to `1`.
-   `((...) + 1) % 1` handles negative values correctly. Since JavaScript’s modulo operator can return negative results, adding `1` before applying `% 1` again guarantees that `t` always remains in the `[0, 1)` interval.

## 5\. Scaling Images into Focus

The final step is what gives the gallery its sense of depth. As the camera moves through the scene, nearby images smoothly scale up as if coming into focus, while distant ones remain at their original size.

### The Principle

On every animation frame, we iterate over all 500 planes and determine whether each one falls inside the focus zone. If it does, we compute a target scale based on its distance to the camera. Otherwise, its target scale remains `1`.

A plane only enters the focus zone when both of these conditions are met:

-   Its distance from the camera in the **XY** plane is smaller than `FOCUS_DIST`.
-   Its distance from the camera along the **Z** axis is smaller than `Z_GATE`.

```
for (const plane of planes) {
  const dx = camera.position.x - plane.position.x
  const dy = camera.position.y - plane.position.y
  const dz = Math.abs(camera.position.z - plane.position.z)
  const distXY = Math.sqrt(dx * dx + dy * dy)

  let dt = Math.abs(plane.userData.t - t)
  if (dt > 0.5) {
    dt = 1 - dt
  }

  const isInFocusZone = dt < focusTGate && dz < Z_GATE && distXY < FOCUS_DIST
  const targetScale = isInFocusZone
    ? computeFocusScale(distXY, FOCUS_DIST, MAX_SCALE)
    : 1

  plane.userData.setScale(targetScale)
}
```

Since the curve is closed, `t = 0` and `t = 1` represent the same position. Without any correction, a plane at `t = 0.02` and a camera at `t = 0.98` would appear to be `0.96` apart, even though they’re actually very close to one another.

The following check fixes that:

```
if (dt > 0.5) {
  dt = 1 - dt
}
```

Instead of taking the direct difference, it always measures the shortest distance around the loop. This ensures planes near the start and end of the curve are treated as neighbors, allowing the focus effect to remain continuous as the camera wraps around.

### **Computing the scale**

```
function computeFocusScale(distance, maxDistance, maxScale) {
  const f = 1 - distance / maxDistance
  return 1 + f ** 3 * (maxScale - 1)
}
```

`f` is a normalized proximity value. It is `1` when a plane is directly in front of the camera and decreases to `0` as it reaches the edge of the focus zone.

Rather than using `f` directly, we raise it to the power of `3`. This makes the scaling effect much more localized: distant planes remain close to their original size, while the scale increases rapidly only as a plane approaches the camera. A linear interpolation would make the effect feel too gradual, causing images to start growing much earlier.

The resulting scale ranges from `1` (its original size) to `MAX_SCALE`, which defines the maximum enlargement when a plane is closest to the camera. With `MAX_SCALE = 14`, only the image currently in focus reaches its full size, reinforcing the feeling of moving through the gallery.

### Applying the Scale with GSAP

We never set the mesh scale directly. Instead, we call the animator created earlier with `gsap.quickTo()`:

```
plane.userData.setScale(targetScale)
```

Every frame, we compute a new target scale based on the plane’s distance from the camera. `quickTo()` then smoothly interpolates the current scale toward that value, updating the existing tween instead of creating a new one.

This means planes ease naturally into and out of the focus zone. Even though the target scale is recalculated every frame, the transition remains fluid rather than snapping abruptly between values.

## Going Further

The demo includes a couple of additional features that build on the same concepts but aren’t covered in detail here.

**Path switching.** Five different curves are available. When the user selects a new one, all 500 planes are redistributed along the target path using `redistributePlanes()`. Each plane’s position is animated individually with `gsap.to()`, producing a smooth transition between layouts rather than an instant jump. Once the redistribution is complete, the active curve is replaced and the camera continues moving seamlessly along the new path.

**Auto-scroll.** A toggle enables automatic camera movement. Instead of waiting for user input, `targetT` is incremented continuously inside the `animate()` loop using the frame’s delta time. Since the camera already follows `targetT` through `gsap.quickTo()`, the same smoothing logic applies, creating the impression of a continuous, autonomous dolly shot.

## Conclusion

A simple curve can drive an entire interactive experience.

In this project, each tool has a clear role. Blender is used to draw the path, Three.js reconstructs it and populates the scene, and GSAP brings everything to life with smooth, responsive camera movement and scale transitions.

The real creative control lies in the curve itself. Change its shape in Blender, export it again, and the entire gallery takes on a different rhythm and perspective. The implementation stays the same—the experience is defined by the path.