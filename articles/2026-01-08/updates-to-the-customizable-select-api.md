---
title: "Updates to the customizable select API"
source: "https://una.im/select-updates/"
publishedDate: "2025-01-10"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/select/bg.png)

Published on January 10, 2025

A few months ago, I shared a [blog post](https://developer.chrome.com/blog/rfc-customizable-select) outlining the current state of the customizable select prototype and asking for developer feedback. Since then, a lot has changed! And for the better. There were a few things re-named, and significant changes to the user agent stylesheet. Now that this feature has evolved and is [shipping soon](https://groups.google.com/a/chromium.org/g/blink-dev/c/kN5LTzuTLVs/m/6HqTsmk3EQAJ), here is a list of updates since the RFC.

## High-level overview of changes:

1.  `::select-fallback-button` was removed, and the `button` itself is now `display: contents`. This means, styles for the button should be put on the `select` element instead.
2.  The dropdown arrow icon was changed from `select::after` to `select::picker-icon`
3.  Checkmarks that indicate the selected option were changed from `option::before` to `option::checkmark`
4.  `<selectedoption>` was renamed to `<selectedcontent>`
5.  Many styles were removed from the user agent stylesheet, such as default shadows, border-radius, and font styles
6.  Options now are styled using flexbox instead of block layout

I’m very happy to see the changes land that changed the use of existing pseudo elements (`::before` and `::after`) to use new ones for the built-in checkmarks and icons (`::picker-icon` and `::checkmark`). I think this makes a lot more sense and something I had advocated for! I’m also happy to see the rename of `<selectedoption>` to `<selectedcontent>`, which [Jake Archibald](https://jakearchibald.com/) brought up as being a potential source of confusion in his podcast, [Off the Main Thread](https://offthemainthread.tech/episode/stylable-select-element/). Finally, I’m happy to see a less-intrusive UA stylesheet applied to this element. I’m always a fan of the less-is-more approach when it comes to these customizable components, because after all, the entire idea is to make them your own. And the fewer browser-provided styles you need to undo the better 😄.

## Recap of usage

### Opt-in mode

To use the new customizable select, you need to “opt-in” with `appearance: base-select` on both the select itself and the picker (you may know the picker as the “dropdown”).

```
select, ::picker(select) {
  appearance: base-select;
}
```

Now, you can style the select however you want and have access to new elements and pseudo classes.

### New elements and pseudos

With these updates, if you want to style the button directly, you style `select`. You can also use the `:open` pseudo class to style the select and its picker if the picker is open.

Option One Option One Option Two Option Three Option Four Option Five <select> <selectedcontent> ::picker(select) <option>::checkmark <option>:checked <option> <select>::picker-icon

-   `select` is the parent element. It also acts as the button you click on to open the picker
-   `::picker(select)` is a shadow DOM element that contains the options
-   `option::checkmark` contains the checkmark of the selected option
-   `select::picker-icon` contains the arrow icon (▼) in the button that opens the picker
-   `selectedcontent` is an element you can use inside of `select` to mirror the inner HTML of the currently selected option
-   `select:open` styles the select button when the picker is open
-   `option:checked` styles a selected option in the picker

## Demos

I have updated my [demo collection](https://codepen.io/collection/BNZjPe) with the latest syntax based on the resolutions and API updates outlined above. Definitely check them out for some inspiration and to see this feature live:

## Conclusion

Thank you to everyone who provided feedback and big shoutout to all the folks working on bringing this feature to life (particularly the [OpenUI](https://open-ui.org/) community group and [Joey Arhar](https://x.com/JosephArhar), who has been the primary engineer patiently prototyping and re-prototyping this feature through numerous syntax and behavioral changes)!

I’m so excited to see this finally landing in Chrome! It’s a huge win for the web 🥳