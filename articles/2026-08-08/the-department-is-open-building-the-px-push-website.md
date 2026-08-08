---
title: "The Department Is Open: Building the PX PUSH Website"
source: "https://tympanus.net/codrops/2026/08/07/the-department-is-open-building-the-px-push-website/"
publishedDate: "2026-08-07"
category: "design"
feedName: "Codrops"
author: "Lewis Webber"
---

[![Building the PX PUSH Website](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/PXPUSH-Codrops.jpg.webp?x48895)](https://pxpush.com/ "The Department Is Open: Building the PX PUSH Website Demo")

PX PUSH is a subscription design studio built for Freedom Tech, the decentralisation and open economic movement, and one of the most underserved sectors in design. Teams building here move fast and ship in public, but agencies and studios around them rarely speak that language. We wanted the website to reflect how the business itself works: structured, accountable, and slightly deadpan about the whole thing.

The PX PUSH identity draws heavily from 1980s corporate culture: bureaucratic language, office equipment, software packaging, and the kind of organisation that would stamp a document “approved for continued use” without irony. We let that period govern everything else: the visitor is looking at the site through an old convex CRT monitor, a simulated device sitting permanently between them and the content, on every page.

The overall design should answer the same question: **what would this look like on a screen from 1988?**

## Stack

-   **Nuxt 3** — SSR/SSG, file-based routing, the whole app.
-   **GSAP + ScrollTrigger** — drives nearly every scroll-based reveal, parallax, and hover state on the site, wired through a small custom attribute system built once and reused per effect.
-   **Lenis** — smooth scroll, ticked manually off a single `tickLenis` hook on the GSAP clock, keeping scroll interpolation and every `ScrollTrigger` on one heartbeat. Disabled outright on mobile in favor of native scroll.
-   **Three.js** — three separate builds, each solving a different problem: an extruded chrome logo, a cloud-flight hero, a floppy disk in the pricing section.
-   **@nuxt/content** — the Journal runs on markdown files, queried at build and request time, no external CMS.
-   **Splitting.js** — splits headings and paragraphs into lines and words in the DOM, feeding the reveal animations.

## The Screen You’re Looking Through

To create the CRT effect, I kept the entire simulation inside a single component, `Wrapper.vue`, mounted above the rest of the application. The effect is built from a small stack of fixed-position overlays. A scanline bar sweeps bottom to top on an 8-second loop, a faint repeating line pattern that simulates CRT refresh lines, a soft `backdrop-filter: blur` layer to create a light bloom effect on old glass, and a full-screen `crt.png` overlay, stretched across the viewport to darken and distort the edges like the curved glass of an old monitor. A final animated noise texture adds a restrained layer of screen static.

The whole effect is built from CSS and two images, running continuously, everywhere, for the lifetime of the session:

```
.scanlines::before {
  background: rgba(0, 0, 0, .7);
  animation: scanline 8s linear infinite;
}

.gloom::before {
  backdrop-filter: blur(10px);
  opacity: .15;
}

.vignette::before {
  background-image: url("/img/crt.png");
  background-size: 100% 100%;
  transform: scale(1.02);
  opacity: .7;
}
```

I used the same period references to guide the rest of the design system. The primary blue, `#03049C`, came from the Blue Screen of Death. The grey, `#BABABA`, was chosen to resemble the plastic casing of old Macintosh computers and office electronics.

For the hero, I wanted something that felt like an operating-system wallpaper or startup screen, which led to the cloud-flight WebGL scene. The floppy disk in the pricing section takes the idea of buying a design “package” literally, referencing the way software was once purchased physically on a floppy disk.

## Three.js: Three Scenes, Three Jobs

I built three separate Three.js scenes, each for a different part of the site. The first is the PX PUSH logo. I loaded the SVG through `SVGLoader`, extruded it into geometry, added bevels, and applied a metalness and clearcoat material under PMREM environment lighting to create the mirrored chrome finish.

As the page scrolls, the logo scales down and moves from the centre of the hero into the header. I also use scroll velocity to control its rotation. Scrolling faster increases the spin, while reversing the scroll direction reverses the rotation. Once the logo reaches the header, it becomes the link back to the homepage.

```
function update() {
  const progress = gsap.utils.clamp(0, 1, window.scrollY / lockScrollY)
  const scale = gsap.utils.interpolate(1, finalScale, progress)
  const top = Math.max(stickyTop, startTop - window.scrollY)

  gsap.set(logo, {
    position: "fixed",
    top,
    left: (window.innerWidth - startWidth) / 2,
    scale,
    transformOrigin: "50% 0%",
  })
}

function updateLogoScrollSpin(velocity) {
  logoScrollSpinTarget = gsap.utils.clamp(
    -logoScrollSpinMax,
    logoScrollSpinMax,
    -velocity * logoScrollSpinStrength
  )
}

function renderLogoFrame() {
  logoScrollSpinTarget *= 0.9
  logoScrollSpin += (logoScrollSpinTarget - logoScrollSpin) * 0.16
  logoGroup.rotation.y += logoIdleSpin + logoScrollSpin
  renderer.render(scene, camera)
}
```

The second scene is the cloud-flight hero. It uses roughly 8,000 cloud planes combined into a single buffer geometry, with a custom GLSL shader to fade their edges and add distance fog. There’s a hover easter egg in the hero copy: hovering over the word “speed” raises the camera’s flight-speed multiplier from `0.2` to `2`, then returns it to normal on mouse-out. It’s a small gesture — hover the word “speed”, the scene gets faster — and it was worth the extra state tracking just for that.

The third scene is the floppy disk in the pricing section. It uses a GLTF model with its glossiness map recoloured at runtime on a canvas rather than baked into a static texture. The model rotates and tilts with scroll progress, positioned beside the section that introduces the monthly design package.

All three scenes register themselves with the same lifecycle system before they start loading, which is where the engineering effort went.

## The Founders Rotate Like a Character-Select Screen

For the About page, we photographed each founder from fifteen different angles, styled as 80s corporate portraits. I connected the image sequence to a small scroll accumulator. As the visitor scrolls, the page moves forwards or backwards through the frames, making each person appear to rotate in place. The effect works like an old character-select screen, but uses real photography instead of a 3D model.

```
onUpdate: (self) => {
  const velocity = self.getVelocity()
  imageAccumulator += Math.abs(velocity) * getImageCycleSpeed()

  while (imageAccumulator >= 1) {
    const direction = velocity >= 0 ? 1 : -1
    const images = getFounderImages(activeFounderIndex)
    const next = gsap.utils.wrap(
      0,
      images.length,
      activeImageIndexes[activeFounderIndex] + direction
    )

    gsap.set(".team__image", { autoAlpha: 0 })
    gsap.set(images[next], { autoAlpha: 1 })
    activeImageIndexes[activeFounderIndex] = next
    imageAccumulator -= 1
  }
}
```

Each profile also carries a QR code generated at runtime, linking out to each founder’s own site — styled with the same grey and blue tokens as the rest of the page.

## The Page Waits for the Scenes

The main engineering problem was coordinating three WebGL scenes with page transitions. Nuxt’s page hooks can tell me when a component has mounted, but not when a scene has loaded its assets and rendered its first frame. Without another layer, the page could reveal itself while one of the scenes was still blank.

I built a small lifecycle—`prepared → revealed → ready`—as a plain pub/sub system using window events. Any component can register a promise through `registerPageTask()`. The page waits until every registered task has settled, or until a hard timeout is reached:

```
const pendingTasks = new Set()

export function registerPageTask(task) {
  const pendingTask = Promise.resolve(task).catch(() => {})
  pendingTasks.add(pendingTask)
  pendingTask.finally(() => pendingTasks.delete(pendingTask))
  return () => pendingTasks.delete(pendingTask)
}

export function waitForPageTasks() {
  return Promise.allSettled([...pendingTasks])
}
```

The logo, cloud hero, and floppy disk register themselves when they mount. This lets the page wait for all three without connecting the scenes directly to one another.

## A Drawer Made of Paper

The Journal is a list of articles. Instead of opening each article as a conventional new page, I slide a drawer over the list and style it like a sheet of office paper. A repeating paper-grain texture sits over a cardboard texture. The left edge uses a live CSS mask to create a vertical line of transparent punch holes:

```
.journalDrawer__panel {
  --hole-x: 2vw;
  --hole-radius: .55vw;
  --hole-gap: 50vh;

  mask-image: radial-gradient(
    circle at var(--hole-x) 50%,
    transparent 0 var(--hole-radius),
    #000 calc(var(--hole-radius) + 1px)
  );
  mask-size: 100% var(--hole-gap);
  mask-repeat: repeat-y;
}
```

The drawer has its own Lenis instance for internal scrolling. It waits for the page lifecycle’s `ready` event before opening, and only returns the route to `/journal` after the closing transition has finished. Each article still has its own slug, canonical URL, Open Graph tags, and `BlogPosting` schema. The drawer changes how the article appears, but not how it is routed or indexed.

## The Error Page

The 404 and 500 pages recreate a classic Blue Screen of Death using a full-screen blue background, monospace type, and copy based on old Windows error screens. A line underneath reads “Press any key to continue \_” — pressing any key clears the error and returns the visitor to the homepage. It also explains the origin of the site’s primary blue without adding another section or piece of explanatory copy.

## The Marquee Titles Read One Word at a Time

Every major section title uses the same `MarqueeText` component: an oversized title repeated eight times and moving continuously across the screen. Two scroll-based effects run over the constant movement. As the title enters the viewport, its words appear individually in random order, rotating in from a slight 3D perspective:

```
gsap.fromTo(
  words,
  {
    opacity: 0,
    z: -100,
  },
  {
    opacity: 1,
    z: 0,
    rotationX: 0,

    stagger: {
      each: 0.03,
      from: "random",
    },

    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      end: "top 0%",
      scrub: true,
    },
  }
);
```

As the same title approaches the top of the viewport, it fades and blurs out:

```
gsap.fromTo(
  el,
  {
    opacity: 1,
    filter: "blur(0px)",
  },
  {
    opacity: 0,
    filter: "blur(20px)",

    scrollTrigger: {
      trigger: el,
      start: "top 5%",
      end: "top -30%",
      scrub: true,
    },
  }
);
```

I connected both effects through a small declarative attribute system. Any element can receive an attribute such as `effect__titleRandom` or `effect__fadeOut`, and one function finds those elements and attaches the relevant GSAP timeline after each page loads.

The marquee also uses `effect__separatorIn` to reveal its top and bottom rules with a `clip-path` animation. The same system handles text fades, character reveals, parallax, and other transitions across the site.

## Bringing the ’80s Office into the Browser

The aim was not to recreate an old website, but to bring the visual language of 1980s corporate culture into a modern digital experience. The CRT overlays, chrome logo, cloud-flight scene, floppy disk, Blue Screen of Death reference, and the Journal paper drawer with punch holes, all come from the same period, but are built with a current Nuxt, Three.js, and GSAP stack. Keeping those references consistent across the site helped the individual effects feel like parts of the same system rather than separate visual ideas.

## **Credits**

Design, concept, and development — **Stud Creative House** ([stud.house](https://stud.house/)), directed by **Lewis Webber** ([wbbr.co](https://wbbr.co/)), in collaboration with the [PX PUSH](https://pxpush.com/) team.