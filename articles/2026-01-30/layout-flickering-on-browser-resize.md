---
title: "Layout Flickering On Browser Resize"
source: "https://ishadeed.com/article/layout-flickering/"
publishedDate: "2019-08-23"
category: "css"
feedName: "Ahmad Shadeed"
---

Have you ever noticed a flickering animation that disappears in less than a second while resizing your browser window or rotating your phone from portrait to landscape?

This happens a lot, because there is a CSS transition that is added to an element by default. As a result, it will **animate** on resize.

I’ve seen this issue on CSS Tricks, check out the below video (Note: I’ve intentionally made the transition time two seconds for the video recording purposes. It was 0.2s).

## The Why

When adding a CSS transition to an element for all screen sizes, it will work in all cases.

I worked on a simple demo for a website menu that demonstrates the issue.

```
.c-nav ul {
  display: flex;
  transition: 0.3s ease-out;
}

@media (max-width: 480px) {
  .c-nav ul {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateX(100%);
    visibility: hidden;
    background: #fefe;
  }
}
```

As you see, the `<ul>` element has a transition of 300ms or 0.3s. When resizing down to mobile size, there is a flickering from the desktop to mobile styles.

## The Solution - 1st Part

In order to fix that, the transition should be added only for mobile. Per that, the CSS transition will be moved to the class that activates the menu on mobile.

```
@media (max-width: 480px) {
  .c-nav ul.is-active {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    transition: 0.3s ease-out;
  }
}
```

### Result

Now when the window is resized, there is no flickering. However, there is a new issue! When removing the `is-active` class, it doesn’t disappear smoothly. That’s happening because the transition is added only when the class `is-active` is there. Toggling the menu button will result in removing that class, and thus, there is no transition.

## The Solution - 2nd Part

In order to make the menu animate back when it’s closed, a bit of Javascript should be used. I want to use a timer than remove the `is-active` class after 300ms, in other words, after the transition ends.

To do that, I will add some inline styles that will reset the menu to its default state, and then to reset them again after 300s, after that, the class is removed.

```
menuToggle.addEventListener("click", function (e) {
  e.preventDefault()

  if (menu.classList.contains("is-active")) {
    // Resetting the menu to its default state
    menu.style.opacity = "0"
    menu.style.visibility = "hidden"
    menu.style.transform = "translateX(100%)"

    setTimeout(function () {
      // Remove the class after 300ms
      menu.classList.remove("is-active")

      // Reset the styles to avoid CSS specificity issues
      menu.style.opacity = ""
      menu.style.visibility = ""
      menu.style.transform = ""
    }, 300)
  } else {
    menu.classList.add("is-active")
    menuToggle.innerHTML = "close"
  }
})
```

## Final Result

See the Pen [2) Responsive Resizing](https://codepen.io/shadeed/pen/vYBgpOK/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## The End

And that’s a wrap. Do you have a comment or a suggestion for another solution? Please feel free to ping me on [@shadeed9](https://twitter.com/shadeed9).

Thank you for reading.