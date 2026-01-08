---
title: "Custom Carets and Users: When The Caret Is No Longer a Stick (Yes, That’s a Poor Attempt at a Pun)"
source: "https://adrianroselli.com/2025/09/custom-carets-and-users-when-the-caret-is-no-longer-a-stick-yes-thats-a-poor-attempt-at-a-pun.html"
publishedDate: "2025-09-22"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

Animated example ![Blinking vertical line in a text box, then the word “Wikipedia” is typed into the box.](https://adrianroselli.com/wp-content/uploads/2025/09/caret-in-textbox.gif)  First, let’s define _caret_. For the scope of this post, I am not talking about the ^ symbol, which evolved from the [circumflex](https://en.wikipedia.org/wiki/Circumflex). I’m also not talking about the [proofreader mark](https://en.wikipedia.org/wiki/Caret_\(proofreading\)), sometimes rendered as ‸, ⁁, or ⎀. I am talking about the [navigation symbol](https://en.wikipedia.org/wiki/Caret_navigation) (or insertion caret), typically a vertical line, that shows the position of the cursor in a chunk of text or text entry box.

The most common kind of caret most users see is a simple vertical line; a stick. Yes, I am trying to make the post title work by calling it a stick.

But new CSS features will allow you to change [properties of the insertion caret](https://drafts.csswg.org/css-ui-4/#the-insertion-caret), specifically its [shape](https://drafts.csswg.org/css-ui-4/#caret-shape), [color](https://drafts.csswg.org/css-ui-4/#caret-color) (ok, not new, but see next property), and [animate](https://drafts.csswg.org/css-ui-4/#caret-animation) it.

You can play with these today if you have Chrome 140 or later. Go to [chrome://flags#enable-experimental-web-platform-features](chrome://flags#enable-experimental-web-platform-features) to enable it (and ostensibly everything else that’s experimental in the browser).

## Where Users Encounter Insertion Carets

I find folks forget that carets appear in more than just forms.

### Fields

The most common place users see insertion carets is in text fields — the `<input type="text">`, its text siblings (date, time, password, etc.), and `<textarea>`. I stuffed a text field after this paragraph as an example. The caret is particularly useful when editing a value or when focus is automatically moved to the next field in a series (phone number, social security, credit card, etc).

### Editables

Any content on a page with `contenteditable="true"`, such as this paragraph, accepts the insertion caret (and allows you to edit the text). This is common in a WYSIWYG editor and in many content management systems that let authorized users make content changes. Or, in more offensive sites, as text fields made from `<div>`s.

### Browsing

 Sorry, your browser doesn’t support embedded videos, but don’t worry, you can [download it](https://adrianroselli.com/wp-content/uploads/2022/05/scrolling-area_Edge.mp4).

Less common is caret browsing. I go into more detail in the [“Activate Caret Browsing in Chrome, Edge, or Firefox” section](https://adrianroselli.com/2022/06/keyboard-only-scrolling-areas.html#Caret) of my post [Keyboard-Only Scrolling Areas](https://adrianroselli.com/2022/06/keyboard-only-scrolling-areas.html). Essentially, if you press F7 in those browsers, you can move an insertion caret (text cursor) through the page content with arrow keys. I included a video from that post, and if you follow the green arrows starting at about 0:10, you can see the barely-visible caret moving through the content.

Safari also lets you do it without pressing F7, but there’s no visual cue (no caret).

## WCAG Risk

Making changes to default browser or system caret has some WCAG implications.

### 2.4.7

Under WCAG [SC 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), the [system caret alone is considered sufficient to pass (G149)](https://www.w3.org/WAI/WCAG22/Techniques/general/G149) for a default text field with no other cues. Once an author makes a change to the system caret, it’s no longer the system caret and G149 is arguably mooted.

### 1.4.11

The same system caret is also the [only indicator needed to pass SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#:~:text=Text%20input%20focus%20style) for a field with no other passing visual cues. The Understanding doc refers to it as a sufficiently strong visual indication, implying the caret contrast is what provides that visual indication. An author change to that caret can break that visual indication.

### 2.3.1

[SC 2.3.1: Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html) says nothing on the page can blink more than 3 times per second. This can impact a zoomed user if an author creates a more rapid animation, particularly if the caret shape is a block (taking up more of their field of view). [G176](https://www.w3.org/WAI/WCAG22/Techniques/general/G176) (flashing size) limits whether you can fail this. To the CSSWG’s credit, it links to Guideline 2.3 Seizures, but in the WCAG 2.0 spec from 2008.

### CSSWG

Otherwise (and sadly), the [CSS draft caret spec suggests](https://drafts.csswg.org/css-ui-4/#example-87a611c4) a user who is disturbed by or has adverse reactions to blinking or flashing visuals can rely on user stylesheets to disable it (while acknowledging browsers may not offer that feature). This spec is aimed at authors, not users. As such, this would be the place to counsel authors to wrap their animations in a [`prefers-reduced-motion: no-preference` query](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion).

## User Preferences

Microsoft Windows 11 allows you to customize the insertion caret, which it calls the text cursor (and part of why I keep rotating terms in this post).

[![The Windows 11 settings screen, showing controls and examples for any caret changes.](https://adrianroselli.com/wp-content/uploads/2025/09/win11-cursor-settings.jpg)](https://adrianroselli.com/wp-content/uploads/2025/09/win11-cursor-settings.jpg)

As seen in Windows 11 in the dark theme.

Windows lets you add colored bells to the ends of the caret so it looks like a barbell(-ends). These are retained when in Firefox, Chrome, and Edge whenever the caret appears. It is not impacted by the caret color when set by CSS in Chrome (the only supporting browser when the experimental feature is enabled).

Windows also lets you set the caret thickness. This is not honored by Firefox, Chrome, or Edge. That suggests that when authors set a caret that is too narrow to be visible, there is no way for the user to override it from system preferences.

![A text cursor in a string of text; it has a purple bell on the top and bottom and is the width of a letter, with an inverted letter showing through the bar.](https://adrianroselli.com/wp-content/uploads/2022/05/text-cursor_win11.png)

A thickened, barbell-ended caret in Windows 11.

Meanwhile, macOS seems to only offer the option to “Prefer non-blinking cursor,” which prevents the system insertion caret from flashing. This appears to have no impact on animated carets in Chrome (with the feature enabled).

What this means is that there are currently no ways for user preferences to override the caret when set by CSS. Whether because the operating system offers no or few options or because browser makers and spec authors chose to ignore the limited preference a user can provide (size, blinking). I am hoping we’ll see motion preferences factor into cursor animation styles (at least from authors if not by the spec).

## Wrap-up

I’d feel better if the CSSWG did a better job of outlining risks and best practices, at least beyond stale WCAG links and suggestions that user style sheets are the best approach to get around forcing animations on users. Granted, the [CSSWG has shown a willingness to ignore the Priority of Constituencies](https://adrianroselli.com/2025/05/my-request-to-google-on-accessibility.html#Carousels) lately, so I’m also not terribly surprised.

As an author, if you feel the burning desire to implement custom cursors, I encourage you to:

-   Only set a caret color if you confirm it has sufficient contrast with text field backgrounds _and_ the page background (or any container backgrounds).
-   Be cautious of making a caret too narrow, but also be cautious of making it wider than a single character.
-   Wrap any caret animations in a `prefers-reduced-motion: no-preference` query.

-   [Coloring the insertion caret](https://blogs.igalia.com/mrego/2017/01/09/coloring-the-insertion-caret/) by Manuel Rego Casasnovas at Igalia, 09 January 2017
-   [Caret Customization on the Web](https://blogs.igalia.com/schenney/caret-customization-on-the-web/) by Stephen Chenney also at Igalia, 26 October 2024
-   [Playing with the new caret CSS properties](https://blogs.igalia.com/mrego/playing-with-the-new-caret-css-properties/) by Manuel Rego Casasnovas still at Igalia, 11 July 2025
-   [caret-animation](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-animation) at MDN (which is not a standards body)
-   [caret-color](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color) at MDN (which is not a standards body)
-   [caret-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-shape) at MDN (which is not a standards body)

## Update: 22 September 2025

[Francis Storr pointed out](https://bsky.app/profile/fstorr.bsky.social/post/3lzgx636h7k2w) they have a WCAG PR in the queue to update the 1.4.11 Understanding document to specifically call out caret styling. Check the language in [#4524 Update non-text contrast for caret styling](https://github.com/w3c/wcag/pull/4524).

Granted, authors who style carets need to know about the SC, need to know the language update, and need to care. Automated tools will take time to catch up, if they do.