---
title: "Susurrus: Crafting a Cozy Watercolor World with Three.js and Shaders"
source: "https://tympanus.net/codrops/2026/04/24/susurrus-crafting-a-cozy-watercolor-world-with-three-js-and-shaders/"
publishedDate: "2026-04-24"
category: "design"
feedName: "Codrops"
author: "Xianyao Wei"
---

A behind-the-scenes look at blending NPR shading, sound, and interaction to shape a meditative WebGL scene.

[3D](https://tympanus.net/codrops/tag/3d/) [case study](https://tympanus.net/codrops/tag/case-study/) [postprocessing](https://tympanus.net/codrops/tag/postprocessing/) [Three.js](https://tympanus.net/codrops/tag/three-js/) [WebGL](https://tympanus.net/codrops/tag/webgl/)

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/susurrus-main-image-1-2.webp?x30804)](https://susurrus.vercel.app/ "Susurrus: Crafting a Cozy Watercolor World with Three.js and Shaders Demo")

What would it look like if a Three.js/WebGL 3D web experience behaved like a watercolor painting—fluid, responsive, and interactive? In _Susurrus_, I explore this idea using Non-Photorealistic Rendering (NPR), approaching stylization as both an aesthetic and a performance consideration. In this case study, I’ll walk through how this project was designed and built.

## Concept: Comfort That Doesn’t Exist

A forgotten windmill floats on the water, rendered with the delicacy of a watercolor painting yet fully 3D and interactive. In _Susurrus_, the scene feels natural and cozy at first glance, but subtly surreal and absurd upon closer inspection. Soft sound design and a calm atmosphere create a meditative, lo-fi–like space.

Beneath the cozy visuals, a subtle uncanny emerges: a submerged millhouse endlessly producing bread, even though the grain should be long gone—a quiet symbol of non-existent comfort.

## Designing Painting-like Visuals

As always, I rarely use Figma or other design tools for personal projects. I prefer a freestyle approach, exploring ideas from a brief concept. The design process feels like an echo in my mind: I want to have a house floating on reflective water, with the Kuwahara shader applied as post-processing to create a painting-like 3D web experience.

The UI/UX is intuitive and clear, focusing on 3D content. Two poets are featured, but the core message is emotion and atmosphere—expressed through visuals and sound. Just like the name _Susurrus_, the words are subtle and unclear, more about conveying a vibe than literal meaning.

## Tech Stack

-   React
-   React Three Fiber
-   Drei
-   React Three Rapier
-   Howler.js
-   TypeScript
-   WebGL
-   HTML / SCSS

## Kuwahara Shader: Defining the Project’s Identity

The entire visual style of Susurrus is based on the Kuwahara shader. Although it may look heavily processed, the Kuwahara shader is actually the only post-processing pass in the project, and everything is built around it. Some settings and custom shaders are used to subtly “cheat” the eye and achieve the final effect.

In this project I started with it as the first step—even before finishing the 3D models in Blender. This approach allowed me to adjust visual effects early and avoid unexpected shader results later.

I researched different approaches to implementing the Kuwahara shader and found several helpful resources online. The reference that most inspired me was a [blog](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) by [Maxime Heckel](https://blog.maximeheckel.com/), where he clearly explains the Kuwahara filter and explores painterly shading techniques.

Based on these references, I developed my own simplified implementation during the project, focusing on a more lightweight and limited approach:

1.  I didn’t use `TensorPass` to keep the pass simple, even though it can enhance detail.
2.  I use a different vertex-stage approach compared to standard Kuwahara shader implementations.

```
varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
   

    // Set the final position of the vertex
    gl_Position = projectionMatrix * modelViewPosition;
  }
```

And the vertex code of my Kuwahara shader is:

```
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
```

I didn’t use the full modelViewProjection (MVP) matrices to keep calculations slightly faster, with the trade-off that the effect is weaker when the camera gets very close—but since the camera isn’t animated to approach the models, this works okay.

Hier is my version of Kawahara Pass which I used in Susurrus:

## The Reflective Water

The reflective water is actually made in a dirty way, it’s just three steps:

-   1\. Used `MeshReflectorMaterial`, with the watercolor-like style, the resolution can be very low, keeping performance smooth on both mobile and desktop.
-   2\. Created a custom shader and applied it to a plane above the `MeshReflectorMaterial` plane, adding more detail and animation to the water.
-   3\. Adjusted lightning so the water looks more lively, not too flat or boring.

![water dev](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/water-dev-800x600.webp?x30804)

## Spawning Bread on Click

he concept is about building a dynamic painting, so I thought it would be interesting to implement the physics in this project. The Spawning Bread is featured as the main interactive element of Susurrus.

## Reveal Effect for the Intro

Regarding performance, I used `ScrollControls` to control the reveal shader uProgress and applied the shader to a `ScreenQuad`, which is a very handy way to implement the intro reveal effect.

```
const RevealOverlay = ({ visible = true }: { visible?: boolean }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.raycast = () => null;
    }
  }, []);

  useFrame(() => {
    if (!materialRef.current) return;

    let offset = scroll.offset;
    if (offset < 0.001) offset = 0;

    materialRef.current.uniforms.uProgress.value = offset * 0.9;
  });

  if (!visible) return null; 

  return (
    <ScreenQuad ref={meshRef} renderOrder={-1}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false} 
        uniforms={uniforms}
        vertexShader={revealVertexShader}
        fragmentShader={revealFragmentShader}
        side={THREE.FrontSide}
        depthTest={false}
      />
    </ScreenQuad>
  );
};

export default RevealOverlay;
```

## Sound Effects & Interaction

I used `react-howler` to implement sound effects. Different audio interactions can be triggered by hover or click. The sound effects are integrated with background music to achieve a lo-fi style, which makes _Susurrus_ feel like a painting that can sing.

## Responsive Design

As always, my goal is mobile compatibility and smooth performance on mobile devices and older devices as well.

![responsive design](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/responsive-800x600.webp?x30804)

## Final Thoughts

Before AI became so powerful, I sometimes worried my work was too strange. But as AI has grown more capable, my mindset has shifted. In this AI era, uniqueness feels more important nowadays. If my personal projects are distinctive enough to leave even a faint impression, or make someone pause for a millisecond and think, “what is that?”—that feels enough to be proud of. It also pushes me to experiment more in my personal work.

## Credits

3D Assets:  
(Sourced and modified for this project)

-   [Bram Verheyen – DAE Villages | Ancient Greek Bakery (Sketchfab)](https://skfb.ly/ovAuW)
-   [Rocco Giandomenico – Stylized Low-poly Wood Floor (Sketchfab)](https://skfb.ly/otJwv)
-   [Alienn27 – Low Poly Boat (Sketchfab)](https://skfb.ly/prTI6)

Music & Sound Effects:

-   [PaulYudin – Emotional Light Piano (Pixabay)](https://pixabay.com/music/modern-classical-emotional-light-piano-159833/)
-   [DRAGON-STUDIO – Single Key Press (Pixabay)](https://pixabay.com/sound-effects/film-special-effects-single-key-press-393908/)
-   [TrevorG97 – Wind Effect 1.ogg (Freesound)](https://freesound.org/s/474806/)
-   [mcmikai – Waves on the lake in summer time in wav (Freesound)](https://freesound.org/s/532179/)
-   [Porphyr – Synthetic Fire Effect (Freesound)](https://freesound.org/s/209651/)

![](https://secure.gravatar.com/avatar/d1871c9e03227e4920b67aeb0363574abbd96c3e571b98535da462b769a6678a?s=160&d=retro&r=g)

### [Xianyao Wei](https://tympanus.net/codrops/author/xianyaowei/)

Hi, I’m Xianyao Wei, a designer and creative technologist based in Germany, originally from China. I also go by Wei, inspired by "V" from Cyberpunk 2077—hence my portfolio name, Weisdevice.

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://secure.gravatar.com/avatar/a928d40c103c02bca0d4a03ddddc1708b19c7720ff67c934059cfc9b9b032d27?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/c05ec8c4a1421cac11613d4bd233dc469791b790a1119e83bed9492b226f3784?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/db-social-pf-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/02/IMG_3840-scaled-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/czYiOaMh_400x400-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/8B497010-BF25-4A66-BA41-6967B0E19938-160x160.jpeg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/profile-160x160.jpg?x30804)

![](https://secure.gravatar.com/avatar/2e189e28555b71adbaad5137cd62e1e333be596f3a4f89ec14d2c60e736049ba?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/bimo-160x160.jpeg?x30804)

![](https://secure.gravatar.com/avatar/c607d4f442935b1a89e22abff3a811d725e1edb1848d50fbc3295a010b03c978?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/enrico-160x160.jpg?x30804)

![](https://secure.gravatar.com/avatar/9d360a8984abc54d8eedfca50873d7cca9d496a59378a0371d3f8ea103a3feb1?s=160&d=retro&r=g)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/basementstudio_logo-160x160.jpeg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/03/ava-160x160.png?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/14islands_profile-160x160.jpg?x30804)

![](https://secure.gravatar.com/avatar/97012e58c68836d8d1d99fbd97332ed9be903997ace4a72254b3322059c33f17?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/uncommonstudio_logo-160x160.jpeg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/forged-160x160.jpeg?x30804)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.