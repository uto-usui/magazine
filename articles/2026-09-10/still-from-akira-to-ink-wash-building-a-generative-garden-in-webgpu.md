---
title: "Still: From Akira to Ink Wash, Building a Generative Garden in WebGPU"
source: "https://tympanus.net/codrops/2026/09/09/still-from-akira-to-ink-wash-building-a-generative-garden-in-webgpu/"
publishedDate: "2026-09-09"
category: "design"
feedName: "Codrops"
author: "Ming Jyun Hung"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/MJ_Still.png.webp?x57826)](https://still.mingjyunhung.com/ "Still: From Akira to Ink Wash, Building a Generative Garden in WebGPU Demo")

_**Editor’s Note:**_ _With the **Three.js Conference just one day away**, we couldn’t imagine a better final feature before the festivities begin. Today, we’re delighted to spotlight **Ming Jyun Hung** and Still, the latest chapter in his ongoing astronaut story. Inspired by Akira and traditional Japanese art, Ming Jyun brings together toon shading, ink wash, silk textures, procedural flowers, and generative tendrils to create a world that feels both carefully crafted and wonderfully alive! We really hope you enjoy this amazing breakdown!_

**🇫🇷 Tomorrow’s the day!** The first ever Three.js Conference is almost ready to bloom in Paris. 🌸 If you’re already around and still thinking about it, this is your last chance to be there! Use code `CODROPS` for **15% off** and **[grab your ticket →](https://threejs.paris/tickets)**

_Still_ is chapter three of an interactive, real-time astronaut story I have been making on the web ([previous Codrops article](https://tympanus.net/codrops/2026/04/21/false-earth-from-webgl-limits-to-a-webgpu-driven-world/)). Each chapter moves the story forward while giving me a new visual and technical question to explore.

After being lost in _[Drift](https://drift.mingjyunhung.com/)_, he ran across _[False Earth](https://false-earth.mingjyunhung.com/)_ day after day, always moving, never arriving. Eventually, after what felt like forever, exhaustion caught up with him, and he lay down, suspended between waking and sleep. In that half-dreaming state, time loses its edges. The ground, the flowers, and the suit begin to merge into one continuous landscape, while his thoughts drift between memory and the present.

## Building a Japanese Print Style

The visual exploration for this chapter started with _Akira_. My connection to the film was emotional before it became technical: its visual style, atmosphere, sound design, and music stayed with me long after I watched it, leaving me wanting to create something with a similarly lasting feeling.

I then looked toward traditional Japanese paintings and folding screens. Placing _Akira_ beside these paintings, I noticed a shared visual logic: flat areas of color, clear edges, deliberate composition, woven surfaces, and irregular marks that create atmosphere through shape, surface, and spacing rather than realism. In both, stillness and rhythm matter as much as detail.

I translated this shared logic into a real-time 3D scene. **Toon shading** keeps the planes broad, the **ground shadow** becomes an uneven ink wash, the **silk weave** supplies material grain, and **procedural growth** gives the flowers and tendrils an organic rhythm. The goal was not to reproduce either reference literally, but to carry their sense of composition and material presence into a living scene.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-5-600x900.png.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-9-678x900.png.webp?x57826)

### Woodblock Toon

I wanted the astronaut and flowers to share the same visual style, but each needed its own shading and outline methods. For shading, the suit uses a toon material on textured albedo, while petals and stems use a vertex-color material built for VAT instancing. Applying the same quantized lighting to both is what makes them read as one image. For the outlines, the character uses an inverted hull, while the petals use a mask-based shader.

I start with N·L, which measures how much a surface faces the light: N is the normal and L is the light direction. I remap it between `thresholdLow` and `thresholdHigh`, then use `floor` to quantize it into color levels. I keep the result to two levels: one shadow band and one lit band, because more steps stop reading like print. Shadow and highlight are tints on the base color, and when the bands look too clean I add a little world-space noise to the threshold to break the hard edge.

```
const ndl = max(dot(N, L), 0.0);
const thresholdNoise = fbm3(positionWorld.mul(thresholdNoiseScale))
  .sub(0.5)
  .mul(thresholdNoiseStrength);
const preShade = clamp(
  ndl.sub(thresholdLow.add(thresholdNoise))
    .div(thresholdHigh.sub(thresholdLow)),
  0.0,
  1.0,
);
const quantized = floor(preShade.mul(colorLevels.sub(1.0)).add(0.5))
  .div(colorLevels.sub(1.0));

const litColor = mix(
  albedo.mul(shadowTint),
  albedo.mul(highlightTint),
  quantized,
);
```

The outline follows the same style, but the implementation depends on each asset’s geometry. On the character, I use an inverted hull: a second mesh with back faces pushed out along the normal. Petals skip that path because each VAT head is instanced hundreds of times, so adding another mesh for every head would be expensive and would still trace the wrong silhouette: the deforming mesh is not the petal cutout. The shape is already in a mask texture, so I discard the outside and draw the rim in the shader on that same mask, which lets one texture handle both shape and edge.

### Ink-Wash Ground Shadow

While I was looking at _Akira_ for this chapter, I found this poster. Kaneda and the bike sit on flat white, but the shadow underneath is the part I keep noticing: soft at the edge, uneven inside, and only loosely following the silhouette, like paint thinned on paper. Since the rest of the scene is built to look drawn, I wanted the shadow to follow the same logic.

![Akira — Kaneda and the bike on flat white, grounded by a soft ink-wash shadow](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-12-735x900.png.webp?x57826)

The directional light already gives me a shadow map. I read it on the ground, invert it, and run it through `smoothstep` to turn it into a broad wash with a soft edge. One noise field loosens the edge and breaks up the fill, so the edge and fill vary together.

The darker **contour** uses the same shadow value and sits just outside the wash rather than tracing the silhouette, so it stays tied to the shadow while reading as a separate drawn stroke. A finer noise breaks the line so it does not run as one continuous edge, while `fwidth` keeps its screen-space width steady. I combine the wash and line with `max`, so overlapping masks do not stack and make the result too dark.

```
const shade = shadow(light).oneMinus();
const noise = fbm2(positionWorld.xz.mul(washScale));
const fill = smoothstep(washAt, washAt.add(washSoft), shade.add(noise.mul(washBleed)));
const wash = fill.mul(float(1.0).sub(noise.mul(washMottle).max(0.0)));

const wobble = mx_noise_float(positionWorld.xz.mul(contourWobbleScale)).mul(contourWobble);
const penWidth = fwidth(shade).mul(contourWidth).max(0.0001);
const line = float(1.0).sub(smoothstep(0.0, penWidth, shade.sub(contourShade.add(wobble)).abs()));
const shColor = mix(washColor, contourColor, line);
return mix(bg, shColor, max(wash.mul(washStr), line.mul(contourStr)));
```

Beyond the ground wash, I also wanted the flowers to cast shadows on the character without casting them onto themselves. For that, I use a second shadow map containing only the flowers: their casters use a separate layer, and the plant-shadow light’s shadow camera is restricted to it. The light shares the main light’s position but has zero intensity, so it writes depth without adding visible light and keeps the character out of the map.

_The low-poly VAT mesh also serves as a shadow-only proxy on a separate render layer, so the shadow passes do not need the full petal geometry._

### Silk Weave

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-14-465x900.png.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-13-484x900.png.webp?x57826)

I was looking at two Japanese folding screens of hollyhocks: Sakai Hōitsu’s and Ogata Kenzan’s. The ground is the part I keep noticing: a faint weave, a grid like threads, and marks that sit like stains, uneven enough to feel painted by hand. I wanted to carry that quality into the scene.

I put that weave over the whole frame because, on those screens, the grid and stains belong to the ground of the painting rather than to one object. I scale `screenUV` into thread cells, jitter the grid so it does not look machine-made, and combine the warp and weft directions into a weave. I shift the thread tones and multiply in slower noise for stains, then multiply both layers with the scene color so the texture darkens the frame as a whole.

```
const coord = screenUV.mul(vec2(aspect, 1.0)).mul(threadCount);
const x = coord.x.add(hash(floor(coord.y)).sub(0.5).mul(irregularity));
const y = coord.y.add(hash(floor(coord.x)).sub(0.5).mul(irregularity));
const warp = pow(abs(sin(x.mul(PI))), sharpness);
const weft = pow(abs(sin(y.mul(PI))), sharpness);
const checker = mod(floor(x).add(floor(y)), 2.0);
const weave = mix(warp, weft, checker);
const fabric = clamp(float(1.0).sub(strength.mul(float(1.0).sub(weave))).add(threadTone), 0.0, 1.0);
const blotch = float(1.0).sub(blotchStrength.mul(smoothstep(0.45, 0.95, stain)));
const overlaid = sceneColor.mul(tint).mul(fabric).mul(blotch);
```

## One Plant

With the frame established, I turn to the smallest repeated unit in the garden: one plant. Before building the field around him, I use a single plant to work out its flower, stem, leaves, and lifecycle.

### Flower

For the flower animation I use the _[Blooming Flowers](https://superhivemarket.com/products/blooming-flowers---geo-nodes-curve-asset-pack)_ Blender pack. Its Geometry Nodes already produce the detailed bloom motion I need, so I keep that animation and convert it to VAT with the same workflow I used in _False Earth_, using an [addon](https://github.com/momentchan/BlenderAlembicToVAT) I made for the whole process in Blender.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-15-1200x711.png?x57826)

On top of that baked VAT, petals leave a few at a time, then lift and fan out. I took the shedding idea from [_Flowers and People_](https://www.teamlab.art/w/flowersandpeople-hour/) by teamLab, where a flower reaches its fullest point just before it falls. The mesh already comes as separate islands, so I group vertices by connectivity and pack a petal id and a pivot vertex into vertex color. A hash of that id staggers the timing and varies each petal’s lift, while the eased value drives both the upward motion and the outward spread. Combining baked VAT with a procedural pass lets me preserve detailed authored motion while adding variation and controllable behavior at runtime, making the animation feel more alive and less repetitive without rebaking the original.

```
const petalId = color.g; // island id, 0..1
const pivot = sampleVAT(color.b, frame); // same vertex, current bloom frame
const startJitter = fract(sin(petalId * 127.1) * 43758.5453);
const heightJitter = fract(sin(petalId * 127.1 + 7.13) * 43758.5453);
const t = clamp((shed - startJitter * stagger) / (1.0 - stagger), 0.0, 1.0);
const ease = t * t * (3.0 - 2.0 * t);
const shrunk = pivot.add(basePos.sub(pivot).mul(1.0 - ease));
const height = 1.0 + (heightJitter - 0.5) * 2.0 * riseVariance;
const lift = rise * max(height, 0.0) * ease;
const outward = normalize(vec3(pivot.x, 0.0, pivot.z));
const fan = rotate(outward, flowerRotation) * spread * ease;

const position = rotate(shrunk, flowerRotation) + flowerPosition
  + vec3(0.0, lift, 0.0) * stemLength
  + fan * stemLength;
```

### Stem

That pack also builds stems in Geometry Nodes, but those stems are tied to specific flowers. I wanted a stem I could reshape in Three.js, so I rebuilt the same basic idea: a curve swept into a tube. A seeded Catmull-Rom curve starts slightly below the ground, leans toward the flower head, and gets a sideways bend. I sample that curve into rings, flare the base, and taper the shaft toward the tip.

```
const from = new THREE.Vector3(0, -BASE_BURY, 0);
const to = /* lean azimuth × stemLength */;
const bend = /* seeded sideways offset */;
const curve = new THREE.CatmullRomCurve3(
  [
    from,
    from.clone().lerp(to, 0.25).add(bend),
    from.clone().lerp(to, 0.75).add(bend),
    to,
  ],
  false,
  'centripetal',
);
const scale = (1 - (1 - radiusAttenuation) * t) + baseFlare * (1 - t) ** 3;
```

After building the tube once, I grow it with one value from 0 to 1. The fragment shader hides everything beyond the growth front, while the vertex shader scales each visible ring out from the centerline and moves the front continuously through its active segment. I use the same value to place the flower head along the curve, so the bloom stays attached to the end of the stem as it grows.

```
If(uv().x.greaterThan(growth), () => Discard());
const rScale = startScale + growth * (1.0 - startScale);
grown = center.add(positionLocal.sub(center).mul(rScale));
```

### Leaf

With the stem in place, I add leaves as a separate modeled mesh. In the shader I bend each blade, starting with a tight curl and easing it open as the leaf grows.

I place a few leaves at seeded positions along the middle section of the curve, sort them from base to tip, and alternate them around the shaft. Each leaf attaches to the tube’s surface at its own `t`, so its position stays stable while the stem grows. The same 0 to 1 growth value then reveals each leaf after the front reaches its attachment point.

```
curve.getPointAt(t, P);
pos.copy(P).addScaledVector(outward, stemRadius * radiusScale);
const growFrac = smoothstep(attachT, attachT + GROW_WINDOW, stemGrow);
placed = attach.add(leafPos.mul(growFrac));
```

### Lifecycle

The animation has two levels of time. At the plant level, each instance owns a complete lifecycle with its own seeded age and durations, so plants can be in different phases while using the same rules. Within that timeline, the stem, flower, and leaves each receive their own component progress. These are not separate clocks: the plant lifecycle decides when each part acts, and its local progress decides how that part appears.

The plant clock uses the same four stages as _False Earth_: **Delay, Grow, Keep, Die**. During Delay, the plant is at rest. During Grow, the stem advances from 0 to 1, the flower follows its tip as the VAT opens, and each leaf starts unfolding when the growth front reaches its attachment point. During Keep, the stem and flower stay full and the leaves remain open. During Die, **petal shed** begins while the stem is still standing, then the stem returns from 1 to 0 and the leaves retract with it.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/lifecycle-timeline-1200x800.png.webp?x57826)

## The Field

Once one plant works, I can distribute it around the astronaut. Random copies read as noise, so I build the field as uneven masses with gaps of ground between them. The two references below build density through clustered marks and open gaps rather than filling the surface evenly. That is the balance I wanted for the field: dense hubs, soft fall-off, and no uniform carpet.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-19-505x900.png.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/image-16-602x900.png.webp?x57826)

I build the field as a probability map before placing any plants. Four anchors around the astronaut raise the local probability, and a warp breaks the resulting shapes into irregular masses. Hearts mark centers within those masses and move slowly, while the density field stays fixed. Flowers hop from a heart and repeat that step when a plant dies.

### The Density Field

I define four body-contact regions as anchors: the hip, left hand, left boot, and backpack. Each adds density nearby with an elliptical falloff along its local axis. Those falloffs would be too regular on their own, so I distort the map by warping each sample coordinate before evaluating it.

I combine the anchor contributions so overlapping regions merge into one mass, then use the posed body and pack BVHs to reject samples that fall inside or too close to the model. The tendril system uses the same BVHs later for its surface queries, so I build the host geometry once and reuse it. Finally, I leave **bare patches** so the result does not become a carpet.

### Hearts and Hops

Density tells me where plants can grow, but I still need a way to group them. I place **hearts** as local clump centers, roughly one for every seven plants. I distribute them across the anchors by weight and keep each one only if it lands inside the density field. The hearts then wander slowly, while the underlying density map remains fixed.

Each flower starts with a short random step from a heart. I keep the new point only if it passes the same density check, so it stays inside the surrounding mass. When a plant dies, I repeat the step around a nearby heart, so the next plant remains in the same local mass as the hearts move. Local density then controls head size and opening range. To keep the clusters from becoming visually noisy, I let the quieter rose fill most of the field and reserve the brighter, busier dahlia for fewer plants.

### Packed Stems

With the layout fixed, I merge the repeated stem tubes into one geometry and render them in one draw, following the instanced grass approach from _False Earth_. The CPU keeps each plant’s static layout and shape data, written once when the field is built. The GPU receives only the values that change, such as growth, sway, world offset, and rotation angle, through a DataTexture updated each frame. A respawn can then change a plant’s position without rebuilding the geometry.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Group-46-1-1.png.webp?x57826)

## Generative Tendrils

I added tendrils to connect the garden to the astronaut, both visually and conceptually. They turn the plants from an independent field into a living system that reaches back to him: the field grows around him, while tendrils cross the suit and lead back to the ground. Each tendril is a wrap across the suit joined to a ground route, then combined into one tree.

### Tendril Trees

Field stems are single tubes that run from ground to tip, while tendrils form branching tube structures. One ground entry can split into several branches that wrap around the suit. I pack these segments into one tree, so the whole structure can reveal as one continuous path. I use the root-to-tip reveal idea from [THREE.Tree](https://github.com/mattatz/THREE.Tree), but the branching comes from the surface routes and wrap targets. Routes taper toward the tips according to their downstream load, and a shared world-space noise field gives nearby wraps a related wobble. The wrap shape depends on its guide: radial guides form partial arcs around a capsule, while planar guides form surface strokes. I keep both shapes slightly away from the suit surface to avoid mesh intersections.

#### How They Grow

Each tendril combines two parts: a **wrap curve** across the suit and a **ground route** back to the floor. The wrap follows the host’s surface, while the ground route follows its connectivity. I use the **MeshBVH** for the wrap’s geometric queries and the **surface graph** for the route back to the ground. The hitch marks their handoff: the wrap begins there, and the ground route connects it back to the floor through the graph. The workflow follows that order: prepare the hosts, construct the wrap, then connect the hitch to the ground.

1.  **Prepare the hosts**: I bake the posed body and backpack into host-space geometries, build one BVH for each, and turn their meshes into surface graphs.

##### Wrap Construction

2.  **Choose a wrap station**: I sample the posed surface, assign each accepted point to an eligible guide, and store its normalized position `u` along that guide. Together, these values determine where the wrap begins.
3.  **Generate wrap candidates**: The guide turns that station into temporary positions for testing the host surface.
4.  **Project the candidates onto the host**: I project each candidate onto the host surface using the guide and host BVH. The accepted hits are ordered into the **wrap curve**, whose first point is the **hitch**.

##### Ground Route

5.  **Choose the graph node**: The **hitch** does not always lie on a graph vertex, so I connect it to a nearby graph node before tracing the ground route.
6.  **Route from the ground**: I use the vertices near the ground as possible sources. Dijkstra selects the source connected to that graph node by the shortest path through the surface graph. The result is the **ground route**.

Finally, the local connection joins the graph node to the hitch. Both parts belong to one tendril tree, so a single growth front reveals the tendril from the ground, through the handoff, and around the wrap.

### Suit Integration

The body and backpack use the same host and routing pipeline. The body carries most of the routes, while the backpack adds a lighter contact layer. Plumeria heads bind to active wraps, giving the suit its own flower type within the field.

## Conclusion

This chapter started with visual observation: how _Akira_ and traditional Japanese paintings use flat color, clear edges, tactile surfaces, and careful spacing to create atmosphere. Those observations became toon-shaded forms, ink-wash shadows, woven surfaces, procedural flowers, and tendrils that grow across the posed body.

The process taught me how to turn observation into a working system. Rather than copying a reference, the challenge was to identify what created its feeling and find a practical way to reproduce that quality in real-time 3D. The field rules, flower lifecycles, packed data, tendril routes, culling, level of detail, and lightweight shadow proxies all had to support a clear visual or narrative goal. The most difficult part was balancing visual richness with performance: the scene needed to feel dense, tactile, and alive, but every additional vertex, instance, shadow, and layer of detail had a cost. That balance remains open, with room to push the visual richness further while keeping the experience responsive.

That process will continue in future work. I want to keep observing the visual qualities of artworks, the forms and rhythms of living things, and the details of the world around me. A new story may lead toward a different visual direction, while a visual experiment may reveal an unexpected story. For me, that exchange between observation, technology, and storytelling is where the next work begins.