---
title: "Detecting Hover-Capable Devices"
source: "https://css-irl.info/detecting-hover-capable-devices/"
publishedDate: "2021-06-30"
category: "css"
feedName: "CSS IRL"
---

With a greater proliferation of devices than ever before, we developers can no longer rely on viewport size as the factor that determines the styles we serve up to our website users. Up until fairly recently, we might have caught ourselves making assumptions based on the size of a device: that mobile devices would rely on touch input, for instance, while for larger screen sizes we might assume the majority of users would interact with our webpage using a mouse. We might provide different experiences with a media query:

```
.some-component {
  /* Styles for touch devices */
}

@media screen and (min-width: 1024px) {
  .some-component {
    /* Styles for hover-able devices */
  }
}
```

This doesn’t really help us today. A decent iPad has a higher screen resolution than a low-end laptop. Or someone might be using their tablet as a secondary monitor — using it in this way with a mouse would mean they _would_ be able to use their pointer to hover on elements. But the media query above doesn’t tell us anything about their input method.

Nowadays we need to be more sophisticated about how we detect how a user is browsing our site. Luckily some newer media queries serve this exact purpose.

## Level 5 Media Queries

The [CSS Level 5 Media Queries specification](https://drafts.csswg.org/mediaqueries-5) brings us all sorts of new media queries beyond the familiar ones for viewport size. One of these is the [hover feature](https://www.w3.org/TR/mediaqueries-5/#hover). This determines whether the user’s primary pointing device is capable of hovering on the page. The possible values are `hover` (which would be true for a device with a mouse, for instance) or `none` (which would be true for a tablet being used with touch input). We can use the media query like this:

```
.some-component {
  /* Styles for touch devices */
}

@media (hover: hover) {
  .some-component {
    /* Styles for hover-able devices */
  }
}
```

See the Pen [Hover media query](https://codepen.io/michellebarker/pen/jOmNbgW) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

This works well in most browsers, but some versions of Android have a feature where a long press emulates hover, so the media query evaluates true. If we want to serve the same styles to those users as those of other touch devices, we need to query for a second media feature.

### Pointer

The `pointer` feature tests whether the device has a pointer and the accuracy of the pointing device. Possible values are `coarse` (for a pointer such as a finger used on a touch screen), `fine` (a mouse, for example) or `none` (a device with no pointer).

Adding this to our media query successfully detects touch input on Android devices:

```
.some-component {
  /* Styles for touch devices, including Android */
}

@media (hover: hover) and (pointer: fine) {
  .some-component {
    /* Styles for hover-able devices */
  }
}
```

See the Pen [Hover media query](https://codepen.io/michellebarker/pen/NWjKxKP) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

### any-hover and any-pointer

If that’s not quite enough, the `any-hover` and `any-pointer` media features enable us to test the capabilities of _any_ of a devices input devices — not just the primary one. So if you have device that responds to both a mouse _and_ touch input `any-hover: hover` would be true.

I haven’t needed to use these features yet, but the [specification](https://www.w3.org/TR/mediaqueries-5/#any-input) includes several examples of how this can be used, with some different (and more complex) considerations.

## Javascript example

I recently built a webpage where hovering on any one of several identical image links would bring up the name of the link, a bit like a tooltip. But users of touch devices wouldn’t see that tooltip. Instead, clicking on the image would take the user directly to the link URL, which might be a jarring experience as they wouldn’t know which page they were visiting. Instead, for touch devices, I decided to interrupt the click and show a button that the user could then press to go to the relevant URL. We can use the same media query to detect touch input in JS, using `matchMedia`:

```
const list = document.querySelector('[data-list]')
const isHoverableDevice = window.matchMedia(
  '(hover: hover) and (pointer: fine)'
)

/* Hide the block link initially */
blockLink.hidden = true

list.addEventListener('click', (e) => {
  /* Do nothing if target is not a link, or device is hover-capable */
  if (!e.target.dataset.link || isHoverableDevice.matches) return

  /* If touch device, show the block link */
  e.preventDefault()
  blockLink.hidden = false
  blockLink.innerText = `Visit ${e.target.dataset.link}’s page`
  blockLink.setAttribute('href', e.target.href)
})
```

A quick demo:

See the Pen [Touch/hover tooltip](https://codepen.io/michellebarker/pen/rNmBxpJ) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

## Accessibility

Depending on the UI, we might want to give assistive technologies a helping hand here, by using ARIA attributes to announce the button when the change occurs, or moving the user’s focus to the button. [This example](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) from MDN includes a demonstration of how to use ARIA live regions to announce dynamic changes to an element.

## Browser support

The great news is you can use these media queries right now, as they’re supported in all modern browsers. Now you can provide better experiences for users of _all_ devices!