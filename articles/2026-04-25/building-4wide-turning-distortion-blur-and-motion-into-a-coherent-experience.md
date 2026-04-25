---
title: "Building 4WIDE: Turning Distortion, Blur, and Motion into a Coherent Experience"
source: "https://tympanus.net/codrops/2026/04/23/building-4wide-turning-distortion-blur-and-motion-into-a-coherent-experience/"
publishedDate: "2026-04-23"
category: "design"
feedName: "Codrops"
author: "Tomoya Okada"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/4WIDE_featured.webp?x30804)](https://4wide.jp/ "Building 4WIDE: Turning Distortion, Blur, and Motion into a Coherent Experience Demo")

Today I want to introduce the 4WIDE website, which launched on March 31, 2026. I’ll walk through the background, some of the technical side, and the thinking behind the visual design. Hope you stick around to the end!

## Project backstory

Keep the tone but correct it, make it flow better, don’t add anything or take anythign away, don’t use dashes: This project was created as the business website for my independent practice under the name 4WIDE.

From the initial concept to the public launch, the project took about three months, during which I explored a wide range of ideas for both the content and the expression. The main point I focused on with this website was balancing expressiveness with clarity of message. It is not a website meant to merely showcase my personal artistic sensibilities. As a business website, it needed to clearly communicate what I do and what I can offer.

At the same time, one of the areas I want to pursue in my work is expressive design. I therefore aimed to find a balance where that intention could be conveyed properly while still allowing the site to function as a business website.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/ogp-800x420.png?x30804)

## Tech stack & tools

The tech stack is as follows:

-   Framework: Astro
-   Page transitions: Swup
-   CMS: WordPress (Headless)
-   Hosting: Vercel
-   Animation: GSAP, Three.js

I selected these frameworks and libraries from tools I had already used and felt familiar with. That said, there were also technologies I used properly for the first time on this site: Swup and headless WordPress. They were both tools I had been interested in for some time but had not had the opportunity to use before, so I decided to take the chance and try them on this project.

## Visual & interaction design

There are three visual and interactive elements I would like to introduce.

### About page

This page is structured so that a curved image emerges from the main visual and leads into the message section. The idea behind this structure was to leave a strong impression of my stance toward both my business and my creative work. The narrative is that behind the surface-level elements labeled “Notes,” which describe my scope and approach, the more fundamental ideas begin to appear.

As I developed this flow, I felt that simply revealing the content from behind would not create enough visual impact, so I added a curved distortion and blur effect, along with an interaction where the text itself moves in sync with the scroll.

Below is part of the code used to create the curved effect.

```
float distortion = 1.0 + u_strength * r * r;
vec2 distortedUv = uv / distortion;

distortedUv.x /= u_aspect;
distortedUv = distortedUv * 0.5 + 0.5;

float t = clamp(r / 1.2, 0.0, 1.0);
float t2 = t * t;

vec2 radialDir = r > 0.001 ? normalize(uv) : vec2(0.0);
vec2 radialDirNorm = vec2(radialDir.x / u_aspect, radialDir.y);
```

There was also one technical point I particularly struggled with, which was mobile optimization. This expression was important to the narrative of this section, so I never considered turning it off on mobile.

However, as development progressed, I became increasingly concerned about the performance cost on mobile devices. To improve it as much as possible, I made several adjustments. Here are some of them:

**1\. Optimizing the images**  
I prepared images optimized for mobile sizes and changed the format to WebP.

**2\. Adjusting geometry size and segment count**  
I reduced both the size and the number of segments by half.

**3\. Adjusting the blur effect**  
The blur effect is turned off on mobile.

**4\. Adjusting the renderer’s powerPreference**  
On mobile, it is set to low-power.

The most effective of these was the third adjustment: modifying the blur effect. Blur-based visuals are extremely demanding in terms of performance.

### Showcase page

This page was created to present several selected works with a strong emphasis on visual expression. To enhance immersion, I reused the curved and blur effect from the About page, while also introducing a large moving parallax effect and RGB shift.

I feel that blur and RGB effects work extremely well when the goal is to heighten immersion. They are used not only in web design but also frequently in visual and motion-based media.

As intended, I feel the overall scrolling experience became very smooth and created a space with a strong sense of depth.

Below is part of the code used to create the parallax effect.

```
vec2 uv = imageAspect(u_planeSize, u_imageSize, vUv);
uv = (uv - vec2(0.5)) / u_imageScale + vec2(0.5);
uv.x -= u_imageOffsetX;
uv.y -= u_imageOffsetY;
```

```
images.forEach((img, index) => {
  gsap.to(this.objcts[index].material.uniforms.u_imageOffsetY, {
    value: -0.3,
    scrollTrigger: {
      trigger: img,
      scroller: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

Because the page is also connected to the CMS, content can be freely replaced, added, or removed from the admin panel.

### Top page

The main visual on the top page is a reel-style video, but it actually has two modes: default and focus.

In focus mode, visitors can view information about 4WIDE, what I value, and the design elements that make up the site, such as Grid and Type. The shift to focus mode affects not only the information being shown, but also the background video, which becomes heavily distorted and plays more slowly. By doing this, I adjusted the experience so that it feels more focused.

Below is part of the code used to create the focus mode.

```
setupMvModeChange() {
  const modeButton = document.querySelector(".index-mv__mode-button");
  let modeFlag = false;
  modeButton.addEventListener("click", () => {
    if (mvModeRunning) return;
    modeFlag = !modeFlag;
    if (flag) {
      gsap.to(this.plane.material.uniforms.u_filter, {
        value: 0.9,
        duration: 1.4,
        ease: "power4.out",
      });
      if (this.fisheyePass.uniforms.u_strength) {
        gsap.to(this.fisheyePass.uniforms.u_strength, {
          value: 0.7,
          duration: 1.4,
          ease: "power4.out",
        });
      }
      if (this.video) {
        gsap.to(this.video, {
          playbackRate: 0.6,
          duration: 1.4,
          ease: "power4.out",
        });
      }
    } else {
      gsap.to(this.plane.material.uniforms.u_filter, {
        value: 0.3,
        duration: 1.4,
        ease: "power4.out",
      });
      if (this.fisheyePass.uniforms.u_strength) {
        gsap.to(this.fisheyePass.uniforms.u_strength, {
          value: 0.0,
          duration: 1.4,
          ease: "power4.out",
        });
      }
      if (this.video) {
        gsap.to(this.video, {
          playbackRate: 1,
          duration: 1.4,
          ease: "power4.out",
        });
      }
    }
  });
}
```

## Reflections

This project, created as the website for my own business, became something through which I was able to think deeply and experiment extensively. Overall, I am very satisfied with the final result, though I am sure there are still areas where it could have been presented even better. This website is not something I consider finished, and I want to continue improving and refining it so that it can serve me for a long time.

Finally, I would like to thank Codrops for giving me the opportunity to introduce this project in this way. Thank you very much for reading until the end.