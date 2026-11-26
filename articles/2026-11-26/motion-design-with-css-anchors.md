---
title: "Motion Design with CSS Anchors"
source: "https://blog.master.dev/motion-design-with-css-anchors/"
publishedDate: "2026-11-25"
category: "css"
feedName: "Frontend Masters Blog"
author: "Preethi Sam"
---

It sounds like a paradox, but CSS anchors, typically used to tether elements to one another, are even more practical when elements have to break free from their places.

Anchors position elements relative to each other. A tooltip to a control, for instance. **The _anchored element_ is bound to its _anchor_ and moves whenever the anchor moves** to maintain their connection.

But anchored elements can also, so to speak, free themselves from their anchors and move elsewhere when they attach to another.

We can use that to **create waypoints for an element to travel through**, resulting in a slick motion effect.

Hover over the text in the demos below to see it in action.

Let’s start with the first example and follow the logo. It moves around, reveals a tagline, then returns to its original position inside the word.

In the pre-anchor era, this would involve tracking the arbitrary positions and sizes of the word, and the beginning and end of the tagline. That’s followed by animations to move the logo between those exact coordinates. We can avoid all of that now.

Let’s see what we can do instead.

**Note:** At the time of writing, Firefox successfully updates the anchor names during animation but doesn’t yet perform the smooth inset transitions that result.

## The Anchored Element

The star of the demo is the logo. This is our anchored element, and to establish that, we change its `position` to `absolute` (for movement within a non-static ancestor) or `fixed` (for movement within the viewport).

`<header>   <h1>     The <span class="letter">C</span><img class="logo" src="logo.svg">dePen Blocks   </h1>   <p class="tagline">     A build plan based on your Pen   </p> </header>`Code language: HTML, XML (xml)

`.logo {   position: absolute; }`Code language: CSS (css)

The logo inside `<h1>` is now free, but _too_ free. We have to anchor it to the letter it’s right next to (`.letter`), which is also its starting position in the upcoming animation.

## The Anchors

`h1 {   --logoHgt: 0.65em; } .letter { /* The letter 'C' in the demo */   anchor-name: --letterAnc;   /* Maintain some space for the logo at right */   margin-right: calc(var(--logoHgt) + 0.05em); } .logo {   position: absolute;   position-anchor: --letterAnc;   top: calc(anchor(center) - (var(--logoHgt) / 2));   left: anchor(right); }`Code language: CSS (css)

The letter ‘C’ is designated as an anchor using `anchor-name: --letterAnc`.

The logo is then attached to that anchor name using the `position-anchor` property. This establishes the logo as the element anchored to the letter.

Finally, the logo’s top-left corner (`top` and `left`) is aligned with the letter’s mid-right position (`anchor(center)` and `anchor(right)`).

The second anchor in our demo is the tagline. It’s initially hidden with clipping.

`.tagline {   anchor-name: --taglineAnc;   clip-path: inset(0 100% 0 0); }`Code language: CSS (css)

That’s it. The waypoints are laid out. On to the animation now.

## The Animations

We need two animations: one to move the logo, and another to reveal the tagline.

`header:hover {   .logo, .tagline {     animation: 1.5s linear forwards;   }   .logo {     animation-name: moveLogo;   }   .tagline {     animation-name: revealLine;   } }  @keyframes moveLogo {   20% {     top: calc(anchor(--taglineAnc bottom) - var(--logoHgt));     left: anchor(--taglineAnc left);     rotate: 360deg;   }   80% {     top: calc(anchor(--taglineAnc bottom) - var(--logoHgt));     left: anchor(--taglineAnc right);     rotate: -360deg;   }   100% {     top: calc(anchor(center) - (var(--logoHgt) / 2));     left: anchor(right);   } }`Code language: CSS (css)

At `20%`, the logo’s top-left corner reaches the tagline’s (`--taglineAnc`) bottom-left corner. It also rotates.

At `80%`, the logo moves to the tagline’s right corner while maintaining its vertical position. It rotates the other way.

At `100%`, the logo returns to its starting position, at the mid-right position of the letter. When an anchor name is not explicitly provided in `anchor()`, it uses the `position-anchor` value.

The above snippet can also be written like this to avoid repeating values:

`@keyframes moveLogo {   20% {     left: anchor(--taglineAnc left);     rotate: 360deg;   }   20%, 80% {     top: calc(anchor(--taglineAnc bottom) - var(--logoHgt));   }   80% {     left: anchor(--taglineAnc right);     rotate: -360deg;   }   100% {     left: anchor(right);     top: calc(anchor(center) - (var(--logoHgt) / 2));   } }`Code language: CSS (css)

Simultaneously, the other animation is also running. The tagline reveal starts at `20%` and ends at `80%` to sync with the logo’s arrival and departure.

`@keyframes revealLine {   20% {     clip-path: inset(0 100% 0 0);     opacity: 0;   }   80%, 100% {     clip-path: inset(0 0 0 0);     opacity: 1;   } }`Code language: CSS (css)

We didn’t have to do much beyond pacing the animation through the desired intervals. The browser handled figuring out what’s where and moving the logo to the different anchors.

## More Examples

In the example above, we updated the anchored element to change which anchor it was attached to. We’ll do the same thing again, but for more than one anchored element, and use `transition` for the animation.

`<!-- a to-do list --> <menu>   <li>     <div class="todo">       <input type="checkbox" aria-label="delete todo item">       <p>Pick a theme</p>     </div>   </li>   <!-- more items --> </menu>  <div id="trash">   <!-- trash icon --> </div>`Code language: HTML, XML (xml)

When a to-do item is checked, it flies toward the trash icon while shrinking and fading away.

That means the trash icon is our final anchor.

`#trash {   anchor-name: --trashAnc; }`Code language: CSS (css)

The to-do items are the anchored elements, which are initially anchored to their list containers.

`li {   anchor-name: --todoAnc;   anchor-scope: --todoAnc; } .todo {   position: absolute;   /* Anchor this to the parent <li> and cover it */   inset: anchor(--todoAnc inside); /* matches left to left, top to top, etc. */ }`Code language: CSS (css)

`anchor-scope` makes sure subsequent `<li>` elements don’t override one another by scoping the anchor name to each individual `<li>` element.

On checking a to-do item, its anchor changes to the trash icon (`--trashAnc`).

`.todo {   /* ... */   transition-duration: 0.6s;   transition-property: inset, scale; } .todo:has(:checked) {   inset: anchor(--trashAnc inside);   scale: 0; }`Code language: CSS (css)

So far, we’ve updated the anchored elements. Now, let’s try changing the anchor itself.

`<div id="indicator"></div> <menu>   <li>     <input type="radio" name="r" id="r1" checked>     <label for="r1">8 AM to 10 AM</label>   </li>   <li>     <input type="radio" name="r" id="r2">     <label for="r2">10 AM to 12 PM</label>   </li>   <!-- ... --> </menu>`Code language: HTML, XML (xml)

`/* Chosen time slot */ li:has(:checked) {   anchor-name: --chosenAnc; } /* The red dot */ #indicator {   position:   fixed;   bottom:     anchor(--chosenAnc outside);   left:       anchor(--chosenAnc center);   translate:  -50% 50%; }`Code language: CSS (css)

The `--chosenAnc` anchor name is dynamically assigned to whichever time slot is chosen, replacing the previously selected time slot as the anchor.

The red dot indicator, which remains anchored to the element carrying the anchor name `--chosenAnc`, then smoothly moves to the selected slot.

Animations like these could be useful in UIs for data flow, timelines, or reordering items. They could also help a mascot or logo move around different parts of a webpage for onboarding or tips. We only have to set up a group of relevant anchors and rotate through them, making each one the anchor for the element at the right time using the animatable inset properties.