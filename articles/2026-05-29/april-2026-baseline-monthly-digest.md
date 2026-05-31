---
title: "April 2026 Baseline monthly digest"
source: "https://web.dev/blog/baseline-digest-apr-2026?hl=en"
publishedDate: "2026-05-27"
category: "web-standards"
feedName: "web.dev"
---

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v6.jpg)

Published: May 27, 2026

Welcome to the Baseline monthly digest. In April 2026, some CSS capabilities and precision math utilities became newly available, while structural semantic elements and other Web API additions became widely available, along with happenings in the developer community.

## Baseline and accessibility in 2026

Building for the web means building an experience that everyone can use, and [a recent piece from A11y Up](https://a11y-up.com/articles/baseline-and-accessibility-in-2026/) makes the case that accounting for accessibility needs is more effective when developers rely on web standards. For some time, engineers have shipped custom and often heavy JavaScript solutions to recreate accessible patterns that are now part of the web platform. These bespoke solutions are sometimes fragile, prone to breaking under assistive tech, and are challenging to maintain.

The article highlights that as web platform features achieve cross-browser interoperability, they make developing with accessibility in mind a more effective task. Using web features to achieve common goals and user interface patterns handles much of the heavy lifting, smoothly exposing the right semantics directly to screen readers and keyboard navigation utilities. Baseline acts as a guide here, signaling the moment a web feature is mature enough to evaluate and use in your projects.

## Baseline newly available features

The features in this section are supported as of April 2026 in the core browser set and are now Baseline newly available.

### CSS `contrast-color()` function

Dynamic theme engines and customizable components have forced developers to maintain multiple color systems to accommodate a user preference for high contrast. The CSS `contrast-color()` function shifts that maintenance burden entirely to the browser. By passing a base input color into the function, the engine evaluates and returns a highly contrasting companion color, typically mapping to either black or white depending on which delivers the highest readability score.

```
.card-header {
  background-color: var(--dynamic-bg-color);
  /* Automatically resolves to the highest-contrast text color */
  color: contrast-color(var(--dynamic-bg-color));
}
```

This lets you meet accessible standards for readability, without a custom solution, or CSS that is hard to maintain. While you should still keep an eye on your mid-tone color choices, this function reduces boilerplate CSS required to handle this user accommodation. You can find out more on the [MDN reference page for `contrast-color()`](https://developer.mozilla.org/docs/Web/CSS/contrast-color).

### `Math.sumPrecise()`

Summing sequences of numbers using standard loops or methods like `Array.prototype.reduce()` can result in floating-point precision loss. This can affect important financial calculations or telemetry totals.

The `Math.sumPrecise()` method addresses this problem. It accepts an iterable of numbers and executes a precision-safe routine to provide an accurate sum. Take a look into the mechanics on the [MDN documentation for `Math.sumPrecise()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise).

## Baseline widely available features

The following features became Baseline widely available, meaning that they are now broadly compatible and usable in your projects.

### `<search>` element

The HTML `<search>` element acts as an explicit wrapper for form controls, filtering mechanisms, and submission utilities that collectively represent a search experience on a web application.

```
<search>
  <form action="/site-search">
    <label for="query">Search documentation</label>
    <input type="search" id="query" name="q">
    <button>Go</button>
  </form>
</search>
```

By switching a containing element to the `<search>` tag, you provide an accessibility benefit to users. The browser automatically assigns an implicit ARIA landmark role of `search` to the element, removing the need to specify `role="search"` on the `<form>` element. This lets screen readers identify and help users navigate to search interfaces. Read the implementation details on the [MDN page for the `<search>` element](https://developer.mozilla.org/docs/Web/HTML/Element/search).

### Web Authentication public key access

Going passwordless with the Web Authentication (WebAuthn) API is now less complex thanks to broad support for direct property extractors on the `AuthenticatorAttestationResponse` interface. With methods like `getPublicKey()` and `getPublicKeyAlgorithm()`, the browser extracts public key details for you without having to work with raw binary data. Learn more about these properties and how to use them on the [MDN page for `AuthenticatorAttestationResponse`](https://developer.mozilla.org/docs/Web/API/AuthenticatorAttestationResponse).

### `String.prototype.isWellFormed()` and `String.prototype.toWellFormed()`

JavaScript strings are UTF-16 encoded, which maps complex characters and emoji in Unicode pairs. If a string is sliced without accounting for this, isolated halves of a surrogate pair—known as lone surrogates—will remain resulting in malformed text.

`isWellFormed()` lets developers check whether a string contains lone surrogates and returns a boolean. If a string fails validation, you can call `toWellFormed()` to replace the rogue surrogates with the standard Unicode replacement character (`U+FFFD`). This is helpful before calling functions such as `encodeURI()`, which will throw a `URIError` when encountering malformed inputs. Learn how these methods work in [the MDN documentation for `String.prototype.isWellFormed()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/isWellFormed).

### ARIA attribute reflection

Updating accessibility states on interactive elements required roundtrips through standard DOM attribute methods—for example, `element.setAttribute('aria-expanded', 'true')`. ARIA attribute reflection simplifies this by mirroring accessibility properties as object properties.

The `Element` interface reflects ARIA attributes straight to instance properties like `element.ariaExpanded`, `element.ariaChecked`, and `element.ariaHidden`. This lets you modify accessibility states using dot-notation syntax:

```
// Clean and readable state updates
toggleButton.ariaExpanded = toggleButton.ariaExpanded === "true" ? "false" : "true";
```

Treating ARIA targets as JavaScript properties lets UI frameworks and state management tools coordinate assistive contexts more reliably, and helps to keep screen reader contexts aligned with your actual application state. For a complete list of reflected properties, check out the [MDN guide on `Element` instance properties](https://developer.mozilla.org/docs/Web/API/Element#instance_properties).

## That is a wrap

Tell us if we missed anything Baseline-related, and we will make sure it gets captured in a future edition! If you have any questions or want to provide feedback on Baseline, you can file an issue in our [issue tracker](https://github.com/web-platform-dx/web-features/issues).