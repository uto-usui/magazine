---
title: "Building the Maxima Therapy Website: React, GSAP, and Dabbling with AI"
source: "https://tympanus.net/codrops/2026/04/06/building-the-maxima-therapy-website-react-gsap-and-dabbling-with-ai/"
publishedDate: "2026-04-06"
category: "design"
feedName: "Codrops"
author: "Nicolas Garnier"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/maxima-2.webp?x34745)](https://maximatherapy.com/ "Building the Maxima Therapy Website: React, GSAP, and Dabbling with AI Demo")

## The Project

Maxima Therapy is an organization dedicated to supporting neurodivergent individuals throughout their lives. They believe in kindness, creativity and a warm and empowering environment. With this mindset, our mission was to deliver a highly illustrated, interactive and playful website for the California-based company.

Beyond the creative aspects, we wanted to push the boundaries of what a “tech industry friendly” stack could offer. And with the rise of coding agents, we looked at how using AI could possibly help us in the process.

## The Stack

For the foundation, we chose **Sanity** as our CMS, **React Router** for the frontend with static generation, and **Cloudflare Pages** for hosting. Compared to Next.js, React Router offered an easier configuration to get things started. Data is fetched from Sanity at the root level and passed down to individual contexts, which lets us share it across different parts of the site without being constrained by page-level scope limitations.

The site’s scrolling is smoothed with **Lenis**, while **GSAP** powers all of the interactive elements, especially the scroll-based animations driven by **ScrollTrigger**. Both are synchronized using GSAP’s internal ticker and Lenis’s `onScroll` event. Many of the SVG animations are handled with **Lottie**, alongside some custom canvas implementations for patterns and **Matter.js** for the physics-based effects. Using GSAP with React also gives us access to the `useGSAP` hook, which ensures automatic cleanup while mimicking React’s own `useEffect`.

On the styling side, we used **Tailwind CSS**, with the occasional CSS module where needed, and we also brought in TypeScript for type checking, even if that discipline was sometimes loosely enforced. Altogether, the stack gave us a solid foundation and enough flexibility to achieve the final result. Claude Code also came in very handy for speeding up and automating tasks that would otherwise have been tedious, which I’ll get into more below.

## The Features

### Home Carousel

The main gate to the experience is the interactive home hero carousel.

Users can grab and release the wheel to navigate through the main programs Maxima offers, and each section of the wheel contains a set of SVG animations playing with Lottie as well as a custom interactive element.

The home hero carousel

The main challenge here was to render and animate quite a large amount of big SVG elements while keeping the page interactive. It is done by splitting the four different sections into four separated, rotated `<div>` elements within a main wrapper. Each section is unresponsive until it becomes visible.

When a user clicks an arrow or drags the wheel, the SVG animations pause, the whole wrapper rotates and the newly visible section becomes interactive.

The section swap also triggers a route change. Because the hero carousel and the rest of the page (represented by the Outlet component) live on a different level within the page’s layout, the data on the page can change while the carousel doesn’t re-render:

`routes/programs/layout.tsx`

```
export default function ProgramsLayout() {
  return (
    <ProgramHoverProvider>
      // Carousel logic, separated from the rest of the page and free of re-renders when the data updates
      <ProgramHeroCarousel />
      <ProgramHeroCards />

      // Rest of the page, re-rendering when the program route changes
      <Outlet />
    </ProgramHoverProvider>
  );
}
```

Each section of the carousel showcases a Lottie animation combined with a main user interaction:

The mountain looks at the cursor on the first program illustration

The second program lets users play with a balloon

An interactive masked Lottie animation is playing for the third program

The fourth program features a sun setting on a calm sea, illuminated by a lighthouse in the background. Users can interact with the water itself: every mouse movement triggers gentle ripples that spread across the surface.

This is done using a simple ripple simulation on an SVG shape with multiple control points:

Mouse-based ripples for the fourth program

This is where AI came in handy. Creating and distributing control points across an SVG shape can be difficult and time-consuming. Claude Code helped with that, taking the original shape and generating the content so GSAP could animate each control point following the ripple algorithm:

```
Original sea shape:

<path ref={sea} className="sea2" d="M277.223 703.836
  C 1200 703.836 1800 703.836 2705.13 703.836
  C 2705.13 703.836 2705.13 1491.4 2705.13 1491.4
  C 2705.13 1491.4 277.223 1491.4 277.223 1491.4
  C 277.223 1491.4 277.223 703.836 277.223 703.836 Z" 
  fill="#56D3D2" 
/>

// Claude-generated control point system combined with GSAP:

function animateWave(mouseX?: number) {
    const startX = 277.223;
    const endX = 2705.13;
    const baseY = 703.836;
    const numPoints = 50;
    const amplitude = -(pointerSpeed.speedY) * 0.3;
    const duration = 3;

    // Determine epicenter of ripple
    const epicenterX = mouseX !== undefined ? Math.max(startX, Math.min(endX, mouseX)) : (startX + endX) / 2;

    gsap.killTweensOf(rippleProgress.current);
    rippleProgress.current.value = 0;

    gsap.to(rippleProgress.current, {
      value: 1,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (!sea.current) return;

        const progress = rippleProgress.current.value;
        const fadeOut = 1 - progress;

        // Calculate ripple spread distance from epicenter
        const maxDistance = Math.max(epicenterX - startX, endX - epicenterX);
        const rippleDistance = progress * maxDistance * 1.5;

        // Generate points along the curve
        const points: Array<{
          x: number;
          y: number
        }> = [];
        for (let i = 0; i <= numPoints; i++) {
          const x = startX + (endX - startX) * (i / numPoints);

          // Calculate distance from epicenter
          const distanceFromEpicenter = Math.abs(x - epicenterX);

          // Ripple effect: only apply amplitude where the ripple has reached
          let ripple = 0;
          if (distanceFromEpicenter <= rippleDistance) {
            // Calculate how far into the ripple wave this point is
            const ripplePhase = (rippleDistance - distanceFromEpicenter) / (maxDistance * 0.3);
            ripple = Math.sin(ripplePhase * Math.PI) * amplitude * fadeOut;
          }

          const y = baseY + ripple;
          points.push({
            x,
            y
          });
        }

        // Build the path with smooth curves
        let pathData = `M${startX} ${baseY}\n`;

        // Create smooth curve through all points
        for (let i = 0; i < points.length - 1; i++) {
          const current = points[i];
          const next = points[i + 1];
          const cpX = (current.x + next.x) / 2;
          pathData += `Q ${current.x} ${current.y} ${cpX} ${(current.y + next.y) / 2}\n`;
        }

        // Connect to last point and close the path
        const lastPoint = points[points.length - 1];
        pathData += `L ${lastPoint.x} ${lastPoint.y}\n`;
        pathData += `L ${endX} ${baseY}\n`;
        pathData += `L ${endX} 1491.4\n`;
        pathData += `L ${startX} 1491.4\n`;
        pathData += `L ${startX} ${baseY} Z`;

        sea.current.setAttribute('d', pathData);
      },
      onComplete: () => {
        if (!sea.current) return;
        // Reset to original path
        sea.current.setAttribute('d', `
          M277.223 703.836
          C 1200 703.836 1800 703.836 2705.13 703.836
          C 2705.13 703.836 2705.13 1491.4 2705.13 1491.4
          C 2705.13 1491.4 277.223 1491.4 277.223 1491.4
          C 277.223 1491.4 277.223 703.836 277.223 703.836 Z
        `);
      }
    });
  }
```

### Scroll-based Interactive Backgrounds for Lottie Animations

Another fun challenge was to mix Lottie-based animations with a fixed pattern background, that reacts to the scroll:

Interactive fixed background pattern on Lottie animation

To achieve the effect, we came up with an approach that combines multiple canvas layers, blended together using **globalCompositeOperation**:

```
Step1: draw the fixed pattern once in an offscreen canvas
Step2: set Lottie's render mode to canvas
Step3: grab the Lottie's canvas and use it as a mask
Step4: draw the mask and fixed pattern together with a globalCompositeOperation
```

## Physics-based Interactive Block

The careers page features an interactive element where the word “supports” hangs from two ropes, echoing the team-building message. To make it even more impactful, Louis came up with the idea to let users interact with it.

The natural solution was to incorporate a physics engine for a realistic and engaging experience.

We used the Matter.js library, mapping the word’s dimensions to a rectangle body. The ropes are a stack of composites, rendered in canvas. The word “supports” itself is an SVG, that then gets displaced with the results from the physics simulation:

Result and skeleton of the physics behind the rope animation

### Morphing Shapes

A small interaction, that at first looks simple but actually presented some challenges is the morphing shape of the square-to-circle CTA piece.

CTA getting morphed on pointer hover

GSAP’s MorphSVG plugin makes this straightforward:

```
<svg
  width="140"
  height="140"
  viewBox="0 0 140 140"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  ref={svg}
>
  <path d={circleShapePath} className="cta-circle-shape opacity-0" />
  <path d={rectPath} className="cta-rect"/>
</svg>


function onEnter() {
  gsap.to('.cta-rect', {
    duration: 0.9,
    morphSVG: '.cta-circle-shape', ease: 'elastic.out(0.8, 0.8)'
  });
}

function onLeave() {
  gsap.to('.cta-rect', {
    duration: 0.9,
    morphSVG: '.cta-rec', ease: 'elastic.out(1.2, 1)'
  });
}
```

### Stickers Block

Adding stickers to some of the sections felt like a natural interaction, giving a playful dimension to the text.

Clicking the title cycles through the stickers

Cycling through an array of stickers on click and displaying them with bouncy animations was made easy using GSAP’s built-in elastic easing:

```
// Animate the scale for the current sticker
if (stickerRefs.current[targetIndex]) {
  gsap.fromTo(stickerRefs.current[targetIndex], {
    scale: 0,
  }, {
    scale: 1,
    ease: 'elastic.out(1.2, 0.8)',
    duration: 1,
  });
}
```

### Scroll-based Interactions

Lastly, the website is packed with scroll-based interactions. From text showing to images revealing and SVG animations playing, it is crucial to be able to manage each interactive element’s state with ease.

Scroll-based interactions

ScrollTrigger is an ideal fit for this. It helped us avoid setting up Intersection Observers manually and integrates perfectly with the useGSAP hook:

```
// Example of a scroll-based parallax animation created with ScrollTrigger and useGSAP. The tweens are automatically killed and discarded once the component unmounts

useGSAP(() => {
    ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setDispY(20 * self.progress * weight);
      }
    });
  }, []);
```

## The Use of AI in the Project

While traditional coding techniques were still at the core of the project, AI offered a very strong extra pair of hands for tasks that would be otherwise tedious and time consuming.

It was very good at optimizing SVGs when given clear guidance (for example, converting a mask to a clip-path for performance gains). With a clear data model as a starting point, it also helped create additional similar Sanity blocks and map the data fetching on the application’s side.

We also found that some of the more advanced creative coding techniques (like the wave ripple effect) were also surprisingly accurate, and it made resolving TypeScript issues and creating types a breeze.

It also came with some caveats:

First, it occasionally produced inconsistent and inaccurate results. It would sometimes alter certain data fetching patterns unexpectedly, making the code messy and potentially causing critical issues if left unchecked.

Though good at optimizing and cleaning certain SVGs, it also hallucinated in some instances (even creating made-up shapes and adding them to the code without consideration).

All in all, we enjoyed using AI for smaller, tightly scoped tasks rather than bigger ones. One point could also be made about “AI fatigue”, where letting an agent code most of a functionality led to a certain feeling of not controlling the output anymore. Going back to generated code felt like doing extra code review, and became tricky when the features had to be rewritten in some instances.

## Final Words

Crafting Maxima Therapy was an exercise in combining tech and creativity. Setting up a strong framework with Sanity, React, and GSAP streamlined the design-to-code delivery. With a strong creative vision, having the tools ready meant we were able to say “yes” to the ideas as they came along.

Using a coding agent made iterating on concepts faster and reduced some of the most tedious tasks to an afterthought, allowing us to focus on the true creative intent.

It truly was a fun challenge and we are very grateful to have been trusted with helping Maxima in their mission to deliver extra good care for people with neurodivergence.

## Credits

Agency: [KOKI-KIKO](https://www.koki-kiko.com/)  
Strategy & PO: [Kim Levan](https://www.linkedin.com/in/kimlevan/)  
Art Direction & Design: [Louis Paquet](https://louispaquet.com/)  
Branding & Illustrations: [Anthony Morell](https://anthonymorell.com/)  
Tech & Development: [Nicolas Garnier](https://nico.computer/)