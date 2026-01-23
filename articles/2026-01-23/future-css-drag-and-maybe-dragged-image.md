---
title: "Future CSS: :drag (and Maybe ::dragged-image?)"
source: "https://css-tricks.com/future-css-drag-and-maybe-dragged-image/"
publishedDate: "2026-01-07"
category: "css"
feedName: "css-tricks"
author: "Sunkanmi Fafowora"
---

Now, I know what you’re thinking. _Yet another CSS pseudo-class…_ But I think [this suggestion](https://github.com/w3c/csswg-drafts/issues/11584) is rather cool.

Earlier this year, it was proposed to add a new pseudo-class, `:drag`, that would enable developers to apply styles when an element is being actively dragged by the user. Currently, CSS lacks a mechanism to detect drag interactions, making it difficult to manage UI behaviors that depend on this action without relying on JavaScript.

No JavaScript! I like the idea of having a pseudo-class dedicated to this function rather than going through the `classList.toggle()` route.

But, how would this work, though?

To understand, you first have to know that the [HTML Drag and Drop API](https://html.spec.whatwg.org/multipage/dnd.html). Some of the [events it fires](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#drag_events) include: 

-   `drag` (fires every few milliseconds when the element is dragged), 
-   `dragstart` (event fires at the initial drag), and 
-   `dragend` (event fires when the dragging the element stops).

Let’s take a quick look at how these drag-and-drop events work in JavaScript in order to understand how they would translate in CSS. Imagine we have seven button elements in a `<div>` :

```
<menu class="menu-bar">
  <li><button>Home</button></li>
  <li><button>Products</button></li>
  <li><button>Services</button></li>
  <li><button>About</button></li>
  <li><button>Contact</button></li>
  <li><button>Blog</button></li>
  <li><button>Careers</button></li>
</menu>
```

We can make the entire `.menu-bar` draggable by slapping an attribute on it:

```
<menu class="menu-bar" draggable="true">
  <!-- etc. -->
</menu>
```

For our CSS, we simply give the `is-dragging` class some styling, which will be applied only when the element is dragged or moved:

In CSS, we can set up an `.is-dragging` class that we’ll set on the element with JavaScript when it’s in the process of being dragged. These are the styles we apply to the element when that’s happening:

```
.is-dragging {
  box-shadow: 0 4px 12px rgba(0 0 0 / 0.15);
  background: #fff;
  transform: translate(1px);
  opacity: 0.2;
  scale: 1.2;
}
```

And here’s the JavaScript to toggle between the start of the mouse drag and its end. It listens for a `dragstar` event and adds the `.is-dragging` class to the `.menu-bar`. And when we drop the `.menu-bar`, the dragging fun stops and the `.is-dragging` class is removed:

```
menuBar.addEventListener("dragstart", (event) => {
  event.target.classList.add("is-dragging");
});

menuBar.addEventListener("dragend", (event) => {
  event.target.classList.remove("is-dragging");
});
```

Our output would look something like this. Drag the dropdown element to see:

Not bad! When the menu bar is dragged, it retains an image of itself in its original position that is styled with the `.is-dragging` class. And while we were totally able to knock this out with JavaScript, how cool would it be to have that proposed `:drag` pseudo-class to abstract all that script-y stuff:

```
.menu-bar:drag {
  cursor: grabbing;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #fff;
  transform: translate(1px);
  opacity: 0.2;
  scale: 1.2;
}
```

+1 for performance! +1 for one less dependency! +1 for maintainability!

### How about the preview image?

Did you know we can style the actual element itself as it’s being dragged around the screen? That’s called the **preview image** and we can replace it with a `<div>` that we can add custom styling to.

![A horizontal menu of buttons in a single row being dragged by a mouse cursor. We can see the menu in its original position and its current dragged position.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/Screenshot-2025-12-12-at-10.03.09-AM-scaled-e1765559057362-1024x305.png?resize=1024%2C305)

The browser displays a “preview” of the element as it is dragged.

It’s just a little more JavaScript using the [`dataTransfer.setDragImage()`](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#setting_the_drag_feedback_image) function:

```
const dragPreview = document.createElement("div");

dragPreview.textContent = "📦 Dragging...";
dragPreview.style.cssText = `
  background: #fff6d6;
  border: 2px dashed orange;
  border-radius: 0.5rem;
  color: #333;
  padding: 0.5rem 1rem;
`;

document.body.appendChild(dragPreview);

// This replaces the default drag preview
event.dataTransfer.setDragImage(dragPreview, 0, 0);

// Remove after the event fires
setTimeout(() => dragPreview.remove(), 0);
```

Here’s where I’ll go out on a limb and suggest _another_ CSS pseudo specifically for that `::drag-image`. Imagine being able to sidestep all that JavaScript and straight-up write the styles in CSS:

```
::drag-image {
  content: "📦 Dragging...";
  padding: 0.5rem 1rem;
  background: #fff6d6;
  color: #333;
  border: 2px dashed orange;
  border-radius: 0.5rem;
}
```

I suppose it could be a pseudo-class instead, but it feels like a pseudo-element makes more sense since we’re talking about a specific object rather than a state.

[I opened an issue for that](https://github.com/w3c/csswg-drafts/issues/13198) — give it a thumbs-up if you’d find it handy to have a `::drag-image` pseudo-element like that. The CSSWG is [already slated to discuss](https://github.com/w3c/csswg-drafts/issues/11584#issuecomment-3638123282) the `:drag` proposal. If that gets baked into the specifications, then I’d push for the pseudo-element, too.

### Thoughts?

Yea or nay for drag-related pseudos? Would you reach for something like that, or do you feel steps on JavaScript’s toes too much?