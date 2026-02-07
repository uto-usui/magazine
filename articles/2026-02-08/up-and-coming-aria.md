---
title: "Up and Coming ARIA "
source: "https://webaim.org/blog/up-and-coming-aria/"
publishedDate: "2025-05-31"
category: "accessibility"
feedName: "WebAIM Blog"
author: "John Northup"
---

If you work in web accessibility, you’ve probably spent a lot of time explaining and implementing the ARIA roles and attributes that have been around for years—things like `aria-label`, `aria-labelledby`, and `role="dialog"`. But the ARIA landscape isn’t static. In fact, recent ARIA specifications (especially ARIA 1.3) include a number of emerging and lesser-known features that are quietly laying the groundwork for the next phase of inclusive web design. 

In this article, we’ll look at some of the **“up and coming” ARIA features**—some already supported, some just getting started, and some you might not have heard of. Think of these as tools to keep on your radar as browser and screen reader support continues to evolve. 

## Environments Tested 

-   **Windows 11:** Current versions (May 2025) of JAWS, NVDA, and Narrator with Chrome, Firefox, and Edge. 

-   **MacOS Sequoia:** Current versions (May 2025) of VoiceOver with Safari, Chrome, and Firefox. 

-   **iOS 18.4:** VoiceOver with Safari. 

-   **Android 15:** TalkBack 15.2 with Chrome. 

## New and Notable ARIA Attributes 

### aria-errormessage 

This attribute lets you explicitly associate a custom error message with a form field when `aria-invalid="true"` is present. Unlike `aria-describedby`, which is often used generically, `aria-errormessage` gets announced _only when_ the field is invalid—making it purpose-built for form error feedback. 

**Support:** Strong across JAWS, NVDA, and iOS VoiceOver, but limited elsewhere. 

### aria-description 

This provides a programmatic description of an element that’s not necessarily visible on screen. It differs from `aria-describedby` in that it’s meant more as a _supplement_, such as content that is not visible in the page; not essential content. 

A practical example: a breadcrumb trail with `aria-description="You are here:"`—which offers helpful orientation to screen reader users without cluttering the visual design. 

**Support:** Surprisingly limited, with only NVDA and iOS VoiceOver currently handling it well. 

### aria-details 

This attribute points to detailed, supplementary content—kind of like a modern replacement for the old (and poorly supported) `longdesc` attribute. It is intended to contain more information than would normally be provided via `aria-describedby`. For instance, you might have a chart with `aria-details` referencing a nearby data table. 

**Support:** Announced in some screen readers, but there’s currently _no way_ to access the details element directly from the element that references it. So, it’s more of a placeholder for future capability than a production-ready feature. 

### aria-keyshortcuts 

Want to communicate that a button is triggered with the Escape key, or that pressing “Ctrl+M” will mute audio? `aria-keyshortcuts` allows you to document keyboard shortcuts directly in the DOM. 

This doesn’t _enable_ the shortcut—it just declares it. But for users navigating with screen readers, this can surface helpful hints they might not see otherwise. 

**Support:** Decent in Chrome and Edge, less so in Firefox and mobile environments. 

### aria-placeholder 

The HTML `placeholder` attribute adds text to an empty field. This text is read by a screen reader, even when the field is no longer empty. `aria-placeholder` text is read by the screen reader without adding the visible text and is particularly useful for custom widgets that simulate form fields. For example, if you build a `div[contenteditable]` component, you can add a prompt with `aria-placeholder` that matches the visible placeholder text.

**Support:** Surprisingly consistent across major screen readers—including JAWS, NVDA, VoiceOver, and TalkBack. 

## Lesser-Known ARIA Roles 

### role=”mark”, role=”comment”, and role=”suggestion” 

These roles are especially useful for editorial and collaborative systems. 

-   `role="mark"` = highlighted text 

-   `role="comment"` = user-generated feedback or discussion 

-   `role="suggestion"` = proposed content changes 

Support is still inconsistent, though `role="mark"` (semantically equivalent to `<mark>`) is catching on. 

### role=”code” and role=”time” 

These mimic the semantics of `<code>` and `<time>` respectively and are useful in component-based systems where native tags aren’t practical. Support is limited. 

### role=”image” 

This one is more of a convenience: it’s just a synonym for `role="img"`. It doesn’t change behavior, but it can be useful for readability or design consistency when using roles that mirror natural language. 

## Where Does This Leave Us? 

Many of these features are in what you might call the **“infrastructure stage”**: they’re well-defined and ready to use _in theory_, but screen reader and browser support remains uneven. Still, that’s exactly when accessibility professionals should start paying attention—because by the time support is universal, the best practices will already be written. 

Until then, it’s important to know what’s possible, test across multiple environments, and deploy these newer features when they add real value and degrade gracefully. 

## Want to Explore Some HTML Examples? 

Check out the companion demo page here:   
[webaim.org/presentations/2025/examples/up-and-coming-aria](https://webaim.org/presentations/2025/examples/up-and-coming-aria)