---
title: "Pell Mell: Crafting a Visual Exploration Platform with Editorial Rhythm"
source: "https://tympanus.net/codrops/2026/03/27/pell-mell-crafting-a-visual-exploration-platform-with-editorial-rhythm/"
publishedDate: "2026-03-27"
category: "design"
feedName: "Codrops"
author: "Gaspard Silvestre"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Pellmell.webp?x79234)](https://pellmell.fr/ "Pell Mell: Crafting a Visual Exploration Platform with Editorial Rhythm Demo")

## **Project backstory**

Pell Mell started from a pretty simple observation. There are a lot of portfolio websites, but most of them are built the same way. Clean grids, filters, categories, but very little feeling.

The initial idea was not to build another directory of artists. It was to rethink how creative work is discovered. Something less static, less structured in appearance, even if the underlying system is actually very strict. The project was also heavily influenced by editorial design. The intention was to create something that feels closer to browsing a magazine than navigating a platform.

In terms of timing, the project moved quite fast on paper, but most of the work was in the details. A lot of iterations happened around rhythm, spacing, motion, and how content appears on scroll.

One of the main turning points was realizing that the interface had to disappear. At the beginning, there were more UI elements, more controls. Step by step, everything was removed until only what was strictly necessary remained.

## ****Tech stack & tools****

The stack was kept relatively simple on purpose. The goal was to have full control over performance and behavior. On the front-end, the project is built with a component-based architecture. Each section is modular and reusable, which makes the system easier to scale.

```
const revealElements = document.querySelectorAll('.reveal');

revealElements.forEach((el) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add('visible');
    }
  });

  observer.observe(el);
});
```

Animations are handled in a lightweight way. Instead of relying on heavy frameworks, most interactions are based on native APIs and simple logic like Intersection Observer.

Media handling is also important. A large part of the content is video, so using Vimeo allowed us to keep quality high while maintaining fast loading times.

On the styling side, everything is built around a simple grid and spacing system. No unnecessary abstraction, just clear rules applied consistently.

## **First impression matters**

The loader is short, but it sets everything. It introduces the rhythm of the site before anything is even visible. It’s not just a technical step. It’s part of the experience. It prepares the user for what comes next.

## Feature breakdowns

There are no “big” features in the traditional sense. The project is more about a collection of small interactions that together create a coherent experience.

Hover states are a good example. They are simple, but they add a constant layer of feedback.

```
.card {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.card:hover {
  transform: scale(1.03);
  opacity: 0.9;
}
```

Another important element is the reveal system. Almost every block appears progressively as you scroll.

```
.reveal {
  opacity: 0;
  transform: translateY(40px);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease;
}
```

This keeps the experience dynamic without becoming overwhelming.

## ****Visual & interaction design****

The whole project is built around flow. Everything is scroll-driven. There are no abrupt transitions, no hard cuts between sections. The idea is always to guide the eye without forcing it.

Animations are soft, slightly delayed, often staggered. This creates a rhythm that feels natural.

Typography plays a big role here. The choice of a Displaay typeface like [Season](https://displaay.net/typeface/season) allows the interface to carry a strong identity without adding graphic elements.

The type was slightly adjusted to behave almost like a logotype, and then used across the entire interface. It becomes both a structural and visual element.

Dark mode was also part of the design from the beginning. Not as a feature, but as an alternative mood. The structure stays the same, but the perception changes.

  
You arrive, you start scrolling, and the experience unfolds. This changes the way you design everything. You don’t guide too much. You don’t over-explain. You let the user move through the content at their own pace.

## **An almost invisible navigation**

Navigation exists, but it never becomes the focus. There is no heavy menu, no complex structure. The main entry points are always accessible, but they don’t interrupt the experience. If users start relying on the navigation too much, it usually means something is wrong in the flow. The goal is that most of the time, people don’t think about how they move through the site. They just do.

## **Architecture & structure**

Behind the visual simplicity, the structure is very organized. The entire system is based on a few core entities: artists, projects, categories. Everything else is derived from that.

```
const Project = {
  title: "Moncler",
  artist: "Styleframe",
  category: "Luxury",
  media: "video"
}
```

This makes the platform easy to scale and compatible with a CMS.

The CMS logic itself was designed with constraints. Instead of giving full freedom, we defined blocks that can be combined.

```
const blocks = [
  "hero",
  "artistGrid",
  "projectHighlight",
  "textBlock"
];
```

This allows flexibility without breaking the design.

Performance was also a key part of the architecture. Images are lazy-loaded, videos are externalized, and animations remain lightweight.

```
<img src="thumbnail.jpg" loading="lazy" />
```

The goal was to keep everything fast, even with a large amount of visual content.

## **About & Contact pages notes**

The About page is where the tone shifts slightly. It becomes more personal, more direct. It’s also where the founder becomes more visible.

The Contact page was treated with the same level of attention as the rest. It’s not a secondary page. It’s part of the experience.

The 404 page is more of a signature. It’s a small moment where the system can break a bit and show personality.

## **Designed for the real mobile context**

From the start, the project was designed with mobile in mind. Not as an adaptation, but as a primary context. The interface had to remain simple, readable, and fluid on smaller screens. Navigation was reduced to the essentials, with a bottom menu that stays accessible without breaking the flow of the experience. It allows users to move through the platform without having to think about structure or hierarchy. A lot of attention was also given to how content scales. Images remain large, immersive, and aesthetic, even on mobile. Nothing feels compressed or secondary. The visual experience stays intact.

Performance was a key constraint as well. Video content is handled through Vimeo, which allows us to keep loading times fast and stable while maintaining a high level of quality. The goal was simple. The mobile version should not feel like a lighter version of the desktop experience. It should feel just as complete, just adapted to a different way of navigating.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/11-1-800x600.png?x79234)

## **Reflections**

What worked well is the overall coherence. Every small decision adds up to something that feels consistent. What was more challenging was finding the right balance between simplicity and personality. Removing elements is easy, but knowing what to keep is much harder.

Performance was also a constant constraint. With that much visual content, it’s easy to slow everything down. If something had to be rethought, it would probably be pushing some interactions further, while still keeping the same level of restraint.

In the end, the project is less about features and more about how everything connects. It’s not a static website; it’s a system that can evolve.

## Credits

**Client**: [Pell Mell](https://pellmell.fr/)  
**Agency**: [Le Fruit](https://lefruitstudio.fr/)  
**Design Team**: [Gaspard Silvestre](https://www.linkedin.com/in/gaspard-silvestre-55070226/) – [Paul Sirand](https://www.linkedin.com/in/paul-sirand-6270793b/) – [Ludmilla Maury](https://www.linkedin.com/in/ludmilla-maury-designer-ux-ui/)  
**Motion Designer**: [Gaspard Silvestre](https://www.linkedin.com/in/gaspard-silvestre-55070226/)  
**Developer**: [Emma Houlé](https://www.linkedin.com/in/emma-houl%C3%A9-1738b99b/)