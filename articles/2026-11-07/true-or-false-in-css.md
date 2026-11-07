---
title: "true or false in CSS"
source: "https://blog.master.dev/true-or-false-in-css/"
publishedDate: "2026-11-06"
category: "css"
feedName: "Frontend Masters Blog"
author: "Preethi Sam"
---

CSS has boolean values and logic, just not in the way we might expect. While a native boolean data type might still appear one day, we can use boolean principles today for programming logic and flags. Let’s see how.

**A boolean data type represents one of two values.** For example: on or off, 0 or 1, and, most commonly, true or false.

## The Keywords

Both the `true` and `false` keywords are available in CSS. You might’ve come across them while working with `@property`, where the `inherits` configuration is set to either `true` or `false`.

`@property --myProperty {   /* ... */   inherits: true; /* or false */ }`Code language: CSS (css)

Now that we have the keywords, we just need a way to store and use them freely. CSS custom properties, also known as CSS variables, are good for that.

`--isTrueOrFalse: true; /* or false */`Code language: CSS (css)

Let’s tighten up that declaration by [registering the custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API/Registering_properties) `--isTrueOrFalse`, and make it hold only one of those keywords. This is possible since the `@property` rule, used to create registered custom properties, accepts keyword syntaxes:

`@property --isTrueOrFalse {   /* Accepts either true or false */   syntax: "true | false"; }`Code language: CSS (css)

Next, you provide an initial value.

`@property --isTrueOrFalse {   syntax: "true | false";   /* Default value is false */   initial-value: false; }`Code language: CSS (css)

I want to constrain this further and stop `--isTrueOrFalse` from being inherited.

`@property --isTrueOrFalse {   syntax: "true | false";   initial-value: false;   /* Cannot be inherited */   inherits: false; }`Code language: CSS (css)

`--isTrueOrFalse` is now **a registered custom property that holds `true` or `false`, with the default being `false`, and is not inheritable**. This is not a real boolean type, but it emulates one well enough for our purpose.

We can use `--isTrueOrFalse` for conditional styling like this:

`@container style(--isTrueOrFalse: true) {   /* style declarations */ }`Code language: CSS (css)

Let’s take this up for a test drive.

## An Example

We’ve got a set of bag products which need to be filtered by type: backpack, or duffel bag, or both.

`<!-- the controls to filter the bags --> <ul id="controlsList">   <li>     <input type="checkbox" id="isBackpack">     <label for="isBackpack">Backpacks</label>   </li>   <li>     <input type="checkbox" id="isDuffel">     <label for="isDuffel">Duffel bags</label>   </li> </ul>  <!-- the bags --> <ul id="productsList">   <!-- list of bags --> </ul>`Code language: HTML, XML (xml)

There are two checkboxes. They should work like this: checking ‘Backpacks’ filters all the products down to only backpacks, the other only duffel bags, and when both are checked, both backpacks and duffel bags are shown while the remaining bags are removed.

### The Registered Custom Properties

Instead of listing out combinations for which of the checkboxes is `:checked` or `:not(:checked)` and bloating the selectors, we can substitute them with `true` or `false` for easier implementation.

As I mentioned before, unregistered custom properties also work, but I’m going to set up registered custom properties **for type safety, performance, and avoiding inheritance**.

`@property --isBackpack {   syntax: "true | false";   inherits: false;   initial-value: false; } @property --isDuffel {   syntax: "true | false";   inherits: false;   initial-value: false; }`Code language: CSS (css)

By default, these are `false`. **When the filter controls are checked, we set these properties to `true` in an ancestor element.** You can choose any suitable ancestor for this. I’m going with `:root`.

`:root {   &:has(#isBackpack:checked) { --isBackpack : true; }   &:has(#isDuffel:checked)   { --isDuffel: true; } }`Code language: CSS (css)

Since we’ll be querying these registered custom properties in a deeper descendant, we give `:root` a container name to be referenced in the query.

`:root {   container-name: root;   &:has(#isBackpack:checked) { --isBackpack : true; }   &:has(#isDuffel:checked)   { --isDuffel: true; } }`Code language: CSS (css)

> Note: Assigning a container name won’t be necessary if the custom properties were either set in a direct parent of the element where the container query is used, or if they were inheritable.

### The Container Queries

In `#productsList`, where all the bags are present, we have to **hide some of the bags based on which checkbox, or if both, are selected.**

`@scope` is not necessary here, but I’ll use it to isolate the `<li>` elements inside `#productsList`.

`@scope(#productsList) {   /* When both backpacks and duffel bags filters are applied */   @container root style(--isBackpack: true) and style(--isDuffel: true) {     /* Remove all bags except backpacks and duffel bags */     li:not(.backpacks, .duffels) { display: none; }   }   /* When backpacks filter is applied and not duffel bags */   @container root style(--isBackpack: true) and style(--isDuffel: false) {     /* Remove all bags except backpacks */     li:not(.backpacks) { display: none; }   }   /* When duffel bags filter is applied and not backpacks */   @container root style(--isBackpack: false) and style(--isDuffel: true) {     /* Remove all bags except duffel bags */     li:not(.duffels) { display: none; }   } }`Code language: CSS (css)

The `@container` style queries check the root element’s `--isBackpack` and `--isDuffel` values. Based on the `true` and `false` combo, a selective group of bags is removed from the product grid.

The `true` and `false` keywords provide a clear indication of the states of the filter controls, and using them in the style query maintains that clarity in the **combined state of the controls**.

Similar use cases can benefit from the `true` and `false` keywords that can be saved in a custom property that’s either registered or not. I recommend registered.

In a nutshell, **the keywords `true` and `false` can build quick-to-understand expressions for container queries and make compound conditions more comprehensible.**