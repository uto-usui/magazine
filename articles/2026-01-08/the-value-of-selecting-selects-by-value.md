---
title: "The Value of Selecting Selects by Value"
source: "https://adrianroselli.com/2025/11/the-value-of-selecting-selects-by-value.html"
publishedDate: "2025-11-22"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

This is meant to use voice control to test select menus (and other fields, but the title would be less weird) by their value because their accessible names are hidden. I’m sharing results of that testing.

This was partially driven by:

-   WCAG issue [#3808 SC 3.3.2: Labels or Instructions and a <select> element lacks a visible label and rely on default option](https://github.com/w3c/wcag/issues/3808).
-   That issue spawned [#4630 SC 3.3.2: Labels or Instructions needs another example for failure when a <select> element lacks a visible label](https://github.com/w3c/wcag/issues/4630).
-   Both of those issues are pre-dated by [#2484 2.5.3 is visible select option considered part of the accessible name here?](https://github.com/w3c/wcag/issues/2484) (which is closed) and
-   [#2509 3.3.2: provide failure examples/techniques for `placeholder`and `<select>` relying on default `<option>` only](https://github.com/w3c/wcag/issues/2509).

It’s not unusual to be loved by anyone for there to be multiple related WCAG issues.

## Demo

A made a demo that looks somewhat like a flight booking form.

See the Pen [Flights](https://codepen.io/aardrian/pen/MYadEmB) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

[Visit the pen directly](https://codepen.io/aardrian/pen/MYadEmB) (for forking or reviewing). Also available in [debug mode](https://cdpn.io/aardrian/debug/MYadEmB) (which gets rid of the wrapper cruft).

### Notes

-   The accessible names come from visually-hidden `<label>`s, which you can make visible with the “Visible labels” button.
-   This demo is to test how voice control works when selecting controls by their value.
    -   The first select menu and the first text input of each fieldset (and the one between the selects) have a defined value.
    -   The second select menu has a default value (which is the first option), and the latter two text fields of each fieldset have no value.
    -   The accessible names are correctly exposed according to browser dev tools.
-   Feel free to [validate the HTML](https://validator.w3.org/nu/?doc=https%3A%2F%2Fcdpn.io%2Faardrian%2Fdebug%2FMYadEmB).

## Testing Results

Again, I only tested voice control. I didn’t test Dragon because I’m not paying. If you have it, feel free to leave your testing results in the comments.

### Windows Voice Access with Chrome, Firefox

-   Speaking “Round trip” selected it.
-   Speaking “First class” selected it.
-   Any other non-hidden words on the page that included any of the spoken commands would cause voice access to offer me a choice instead of selecting the control.
-   Speaking the value of any other control did _not_ select it (but sometimes offered a number to select it from others), and in the case of “BUF” focused a browser tab that had an article about tourism in Buffalo.
-   I could select a select menu by speaking one of its not visible options, _unless_ the option had a hyphen.
-   I could select any control by speaking the accessible name provided by the `<label>`.

### macOS 26 Voice Control with Safari

-   Speaking “Round trip” selected it.
-   Speaking “First class” did _not_.
-   Any other non-hidden words on the page that included any of the spoken commands would cause voice control to offer me a choice instead of selecting the control.
-   Speaking the value of any other control did _not_ select it.
-   I could select any control by speaking the accessible name provided by the `<label>`.

### Android Voice Access with Chrome, Firefox

-   Speaking “Round trip” selected it in Chrome, _not_ Firefox.
-   Speaking “First class” selected half the time.
-   Speaking the value of any other control did _not_ select it.
-   I could select any control by speaking the accessible name provided by the `<label>`.

### iPadOS 26 Voice Control with Safari

-   Speaking “Round trip” did _not_ select it.
-   Speaking “First class” also did _not_ select it.
-   Any other non-hidden words on the page that included any of the spoken commands would cause voice control to offer me a choice instead of selecting the control.
-   Speaking the value of any other control did _not_ select it.
-   I could select any control by speaking the accessible name provided by the `<label>`.

## Recommendation

Remove ambiguity by using visible labels that correspond to the accessible name ([ideally by using `<label>`](https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html)). Relying on field values is risky, prone to error, can conflict with unknown values, is not per spec, and creates extra work for voice users. Avoid making extra work for voice users.

In no way is this meant to [denigrate](https://adrianroselli.com/2020/03/i-dont-care-what-google-or-apple-or-whomever-did.html) the terrible [work of others](https://www.google.com/travel/flights/).