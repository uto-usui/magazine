---
title: "Joffrey Spitzer Portfolio: A Minimalist Astro + GSAP Build with Reveals, Flip Transitions and Subtle Motion"
source: "https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/"
publishedDate: "2026-02-18"
category: "design"
feedName: "Codrops"
author: "Joffrey Spitzer"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/Joffrey.webp?x21398)](https://joffreyspitzer.com/ "Joffrey Spitzer Portfolio: A Minimalist Astro + GSAP Build with Reveals, Flip Transitions and Subtle Motion Demo")

I’ve been working in the web industry for seven years, yet I never took the time to build a truly solid portfolio.

Well… that’s not entirely accurate. I actually spent a lot of time starting portfolio versions, but I never finished any of them. I kept iterating, chasing a result that felt “good enough,” and every attempt eventually turned into another restart.

I realized something along the way: you can be your own toughest client.

To make it work this time, I decided to treat my portfolio like a real project, with a real constraint: a deadline. My goal is to launch in January 2026, which gives me three months to design and develop a finished version and, most importantly, to ship it.

## Design and inspirations

In this article, I’ll mostly focus on the technical side of things and how these interactions are built, rather than the design process itself but I’ll still share a few notes on the design choices along the way.

I designed my portfolio to feel restrained and precise, mixing minimalist clarity with brutalist edge clean, quiet layouts with moments that feel raw and direct. I’m obsessed with finesse: smooth interactions, subtle transitions, and that extra attention to micro-details that makes everything feel intentional without being loud.

The work of [Brijan Powell](https://www.instagram.com/brijanpowell/), [Thomas Monavon](https://www.thomasmonavon.com/), [Greg Lallé](https://gregorylalle.com/), and [Gil Huybrecht](https://gilhuybrecht.com/) has been a big influence here.

## Tech stack

I decided to use **Astro**: a framework that’s become quite popular recently, and one I genuinely enjoy because it makes **SSG** straightforward while still letting me keep things simple with **vanilla JavaScript** (no React or other JS frameworks).

For animations and interactivity, I naturally went with **GSAP**, an industry standard for web animation. I used **Lenis** for smooth scrolling (it pairs really well with GSAP), **Three.js** for WebGL, and **Swup** to handle page transitions. For styling and layout, I used **Tailwind**.

I won’t go too deep on the backend, but I used **Prismic** as a CMS and hosted everything on **Netlify**: a solid alternative to Vercel, which I’m choosing to step away from (for reasons you can probably guess).

## Animations & Interactions

High-quality, subtle animations that let me showcase what I can do while keeping everything minimal and concise. The goal is to keep everything as smooth as possible.

I’ve been using **[GSAP](https://gsap.com/)** for years, and it’s still my go-to tool for creative front-end work. With its [**plugin ecosystem**](https://gsap.com/docs/v3/Plugins), we can build all kinds of animations and interactions while keeping things performant and smooth. That’s why this article focuses on GSAP, and I won’t cover the 3D “rock” animation made with Three.js. That part could easily be a tutorial on its own.

Here are the animation types we’ll be looking at:

-   Reveal animations
-   Page transitions
-   The vertical slider
-   The slider to grid switch
-   The preloader

### Reveal animations

This part is crucial because it defines the site’s rhythm and how smooth everything feels.

For text, I split things into two categories: paragraphs (usually multiple lines) and titles (just one or a few words). Paragraphs will reveal line by line, while titles will animate character by character.

To do that, we’ll use GSAP’s **[SplitText](https://gsap.com/docs/v3/Plugins/SplitText)** plugin, then animate each line with a simple mask, a subtle stagger, and a consistent ease. This is probably one of the most important parts of motion design if you want everything to feel smooth.

When animating lines, I’m using `autoSplit: true` so the text can re-split responsively if the layout changes. In that case, the animation must be created inside the `onSplit()` callback and returned so GSAP can properly revert and rebuild it on resize.

```
// Titles
this.split = new SplitText(this.element, {
  type: "words, chars",
  autoSplit: true,
  mask: "chars",
  charsClass: "char",
  onSplit: (self) => {
    return gsap.from(self.chars, {
      duration: 1,
      yPercent: -120,
      scale: 1.2,
      stagger: 0.01,
      ease: "expo.out"
    });
  }
});

// Paragraphs
this.split = new SplitText(this.element, {
  type: "lines, words",
  autoSplit: true,
  mask: "lines",
  linesClass: "line",
  onSplit: (self) => {
    return gsap.from(self.lines, {
      duration: 0.9,
      yPercent: 105,
      stagger: 0.04,
      ease: "expo.out"
    });
  }
});
```

Regarding images and videos, I went for a subtle fade-up reveal, with a small stagger to create a gentle delay between visuals in the galleries.

```
// Galleries
gsap.fromTo(
  this.images,
  { yPercent: 100, autoAlpha: 0 },
  {
    yPercent: 0,
    autoAlpha: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1
  }
)
```

## Page transitions

Page transitions are also essential in creative development. They let us stay in control of the site’s rhythm and keep the experience feeling continuous. Instead of a hard cut between two screens, we can guide the content swap with subtle motion, making navigation smoother and avoiding that “new page” jolt. There are several front-end libraries that help with this, and for this project I chose **Swup** because it’s easy to integrate and gives you plenty of freedom to orchestrate the animations.

On page leave, I’m keeping it simple by reversing the reveal animations. This clears the stage so the new page can animate on enter.

I’m a big fan of transitions that carry an element from the outgoing page into the next one. It adds a real sense of continuity to navigation, and that kind of detail often makes the difference in how polished everything feels. That’s exactly what I wanted for the transition to the About page, where the “About” menu item becomes the page title and of course we reverse it when leaving the page.

To achieve this, we’ll use the **[Flip](https://gsap.com/docs/v3/Plugins/Flip/)** plugin. It’s incredibly powerful and, in my opinion, still a bit underused. We first capture the link’s state (position, size, typography, etc.) with `Flip.getState()`. Then we move that same link into the title’s spot and match its dimensions and typographic properties. Finally, `Flip.from(state)` animates it from the captured state to the new layout, scaling it up until it becomes the page title.

```
// 1) Capture the link’s current state (small, in the header)
const state = Flip.getState(link)

// 2) Hide the title and fit the link into the title’s position/size
gsap.set(title, { opacity: 0 })
Flip.fit(link, title, {
  absolute: true,
  scale: false,
  props: "fontSize,lineHeight,letterSpacing"
})

// 3) Animate from the captured state to the current position (link “grows” into the title)
Flip.from(state, {
  absolute: false,
  simple: true,
  duration: 0.9,
  ease: "expo.inOut",
  onComplete: () => {
    gsap.set(title, { opacity: 1 });
    gsap.set(link, { opacity: 0 })
  }
})
```

I’m using the same approach to animate the transition from the work list to each work’s detail page.

## The vertical slider

For the cases listing, the idea was to go for a very brutalist-style interaction: a vertical slider that lets you scroll through the works, while the active one scales up to take the spotlight. I won’t go into every detail here because, even if it looks pretty straightforward, the animation is actually quite complex and ended up being a decent chunk of code. A big part of that complexity comes from performance choices: instead of animating `width` and `height`, I’m scaling the images (which is much smoother), but that also means you have to carefully recalculate positioning as you scroll.

To build this kind of scroll-controlled interaction, I’m using **[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)** to drive a **GSAP** timeline.

```
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: this.dom,
    start: "top-=6.5% center",
    end: "bottom center-=0.5%",
    scrub: true
  }
})

timeline.to(image, {
  scaleX: scaleExpanded,
  scaleY: scaleExpanded,
  force3D: true,
  duration: 0.8,
  ease: "none",
}, index)

timeline.to(image, {
  scaleX: 1,
  scaleY: 1,
  force3D: true,
  duration: 1.5,
  ease: "none",
  delay: 0.3,
}, ">")
```

For the work detail pages, I’m using the same approach to animate the thumbnail navigation, while also displaying the active image at a larger scale on the left: the biggest image is always the currently active one.

### From slider to grid

I really wanted to add a little extra that doesn’t necessarily bring much in terms of content (maybe nothing at all), but clearly levels up the motion and is something you often see in portfolios: a layout switch, moving the works from a vertical slider to a grid.

You probably guessed it from the transition we built earlier: **[Flip](https://gsap.com/docs/v3/Plugins/Flip/)** is the perfect tool for this. I simply toggle a CSS class on the wrapper, which completely reshapes the layout.

```
.--grid-mode {
  .projects__wrapper {
    @apply col-span-full grid grid-cols-6 gap-12;
  }

  .projects__item {    
    &:first-child {
      @apply col-span-2;
    }

    &:nth-child(4) {
      @apply col-start-4;
    }

    &:nth-child(6) {
      @apply col-start-1;
    }

    &:nth-child(8) {
      @apply col-start-5;
    }
  }
}
```

The idea is to capture the state of my images before toggling the CSS class. Once the class is applied, I can simply use `Flip.from(state)` to animate each element from its captured state to its new size and position.

```
// 1) Capture current state (list layout)
const state = Flip.getState(targets)

// 2) Toggle layout: CSS does the rest (grid vs list)
projectsDOM.classList.add("--grid-mode")

// 3) Animate from captured state to new layout
Flip.from(state, {
  absolute: true,
  duration: 1,
  ease: "expo.inOut",
  nested: true,
  scale: true,
  simple: true
})
```

### The preloader

Beyond the purely creative side, the preloader is mostly here to preload media and key assets, so the site feels faster and more reliable. That’s especially important in my case because the homepage opens straight on a video that weighs several megabytes, so its loading needs to be anticipated.

A simple counter on top of a background that eventually transforms into the video.

The counter animation itself is straightforward. It’s just a number going from 0 to 100 in fourteen steps and with GSAP you can get that “chunky” progression by using a `steps(14)` ease.

```
gsap.to(progressVal, {
  duration: 3,
  ease: 'steps(14)',
  value: 100,
})
```

After that, I use **[Flip](https://gsap.com/docs/v3/Plugins/Flip/)** (again) to move the background image (which is the first frame of the video) to the exact size and position of the showreel video on the page.

```
const showreelState = Flip.getState(showreel)

showreel.classList.remove("--preloading-showreel")

Flip.from(showreelState, {
  absolute: true,
  duration: 1,
  ease: "expo.inOut",
  scale: true,
  simple: true
})
```

In parallel, I also animate the frame that contains the counter using `clip-path`.  

```
gsap.fromTo(
  background,
  { clipPath: "inset(2.5rem 2.5rem 2.5rem 2.5rem)" },
  {
    clipPath: "inset(100% 0rem 0rem 0rem)",
    duration: 1,
    ease: "expo.inOut"
  }
)
```

## Conclusion

I hope this article was clear and that you picked up a few useful takeaways along the way.

In the end, I’m really proud of how it turned out, and I feel confident about the technical choices I made. Astro has been a genuine revelation for me, and GSAP is still a library you can always rely on: it’s incredibly versatile, yet remains performant and easy to work with. And it shows in practice, even with a solid amount of GSAP animation and some Three.js on top, the site still scores well on PageSpeed Insights.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/Capture-decran-2026-02-14-a-17.36.22-766x600.png?x21398)

Thanks for reading, and see you around 👋