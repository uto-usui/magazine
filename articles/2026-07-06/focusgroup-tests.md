---
title: "Focusgroup Tests"
source: "https://adrianroselli.com/2026/07/focusgroup-tests.html"
publishedDate: "2026-07-05"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

[Chrome 150 has landed support for `focusgroup`](https://developer.chrome.com/blog/new-in-chrome-150/#focusgroup), a feature proposed by Open-UI and not yet in WHATWG HTML as anything more than a [feature request](https://github.com/whatwg/html/issues/11641). Open-UI has outsized representation from Google and Microsoft folks, so it’s no surprise Chrome would implement it first.

![“FOCUS!” set in a stylized geometric font and in stone the color of sand, two characters per line and each maybe ten feet tall, mounted on a wall of similar stone slabs, but the slabs are completely desaturated.](https://adrianroselli.com/wp-content/uploads/2026/07/focusgroup-tests_thumb.jpg)

“[FOCUS!](https://www.flickr.com/photos/16782093@N03/9118080939)” by [Metro Centric](https://www.flickr.com/photos/16782093@N03/), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.en); cropped, skewed, and desaturated.

Open-UI has a handy [`focusgroup` explainer](https://open-ui.org/components/scoped-focusgroup.explainer/), which is the only place (inside or outside of a spec) to understand how to use it and what it’s meant to do. Which means this is your best opportunity to play with it before it gets into a spec.

To hopefully make that easier, I’ve created a series of very basic demos using the [properties outlined in the explainer](https://open-ui.org/components/scoped-focusgroup.explainer/#focusgroup-tokens).

## Demos

The effort has started with the composite (excepting `toolbar`) ARIA widgets `[listbox](https://w3c.github.io/aria/#listbox)`, `[menu](https://w3c.github.io/aria/#menu)`, `[menubar](https://w3c.github.io/aria/#menubar)`, `[radiogroup](https://w3c.github.io/aria/#radiogroup)`, `[tablist](https://w3c.github.io/aria/#tablist)`, and `[toolbar](https://w3c.github.io/aria/#toolbar)`. I’ve linked to the ARIA spec instead of APG. These [map to specific behaviors](https://open-ui.org/components/scoped-focusgroup.explainer/#supported-behaviors), based on [APG’s keyboard guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).

There is no scripting in any of these demos. The only styles are to honor dark / light mode, make focus styles more obvious, and add some text defaults. None of the controls do anything. The labels are nonsense. I left a set of boring default HTML buttons at the end of each demo as a comparison.

Observe how the axis of movement is based on the default widget visual display. For example, `listbox` wants up and down arrows because they are generally vertically stacked (block). My demo, however, makes no effort to set a layout. This is not a `focusgroup` bug, but if you use `listbox` for something like “pills,” which are generally horizontal (inline), then you would need to address that.

With all the available properties, there are more permutations than I have coded. I also haven’t done complex nor nested demos. I just don’t have the time. But you, dear reader, probably enjoy pointing out things I missed. Please do so. Make your own examples. Play around. Try your own use cases and expectations. Leave comments letting me know what I, or the proposal, got wrong.

If you work in digital accessibility, you have an opportunity to find gaps that others might miss (especially in how roles are exposed). Let’s get those documented before the spec or browsers ossify code that cannot be readily changed in the future. Let’s help ensure developers won’t create more _inaccessible_ experiences simply by using this new property.

You’ll need Chrome 150 to test these today, but as more browsers add support these will still be useful.

### `listbox`

[View the listbox demo pen](https://codepen.io/aardrian/pen/ogBpWWP?editors=1000) directly or open the [listbox demo in debug mode](https://cdpn.io/aardrian/debug/ogBpWWP).

See the Pen [focusgroup="toolbar"](https://codepen.io/aardrian/pen/ogBpWWP/f9fc0c60d68e15bb65d473b4b04a7997) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

[View the menu demo pen](https://codepen.io/aardrian/pen/EaZomoQ?editors=1000) directly or open the [menu demo in debug mode](https://cdpn.io/aardrian/debug/EaZomoQ).

See the Pen [focusgroup="menu"](https://codepen.io/aardrian/pen/EaZomoQ/5b608ff2d793e6297be3c23feaaf6683) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

[View the menubar demo pen](https://codepen.io/aardrian/pen/wBgpdmK?editors=1000) directly or open the [menubar demo in debug mode](https://cdpn.io/aardrian/debug/wBgpdmK).

See the Pen [focusgroup="menubar"](https://codepen.io/aardrian/pen/wBgpdmK/052c22b6112aa2f587d44c2863da2e50) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

### `radiogroup`

[View the radiogroup demo pen](https://codepen.io/aardrian/pen/ogBpWdQ?editors=1000) directly or open the [radiogroup demo in debug mode](https://cdpn.io/aardrian/debug/ogBpWdQ).

See the Pen [focusgroup="radiogroup"](https://codepen.io/aardrian/pen/ogBpWdQ/23d82ab15afecf34321deca513b4c612) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

### `tablist`

[View the tablist demo pen](https://codepen.io/aardrian/pen/RNKxVBz?editors=1000) directly or open the [tablist demo in debug mode](https://cdpn.io/aardrian/debug/RNKxVBz).

See the Pen [focusgroup="tablist"](https://codepen.io/aardrian/pen/RNKxVBz/4e73d5112fbe5df7c9b1f197d093495a) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

### `toolbar`

[View the toolbar demo pen](https://codepen.io/aardrian/pen/dPNJGJV?editors=1000) directly or open the [toolbar demo in debug mode](https://cdpn.io/aardrian/debug/dPNJGJV).

See the Pen [Untitled](https://codepen.io/aardrian/pen/dPNJGJV/eeed2f7219f93f185ca7bc734c9563b7) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

## Notes

In very quick tests, a few things jumped out at me:

-   In the `focusgroup="none"` test across all patterns, I found the button with `focusgroup="none"` as well as those flanking it accepted focus from Tab. It presents as the first three buttons accepting focus (the second one has `focusgroup="none"`). I understand why, but that feels like a bug.
-   The interactive child with `focusgroup="none"` (to remove it from the `focusgroup`) keeps its role from the element, instead of assigning it the required accessibility child role. That might feel like a bug if you expect `focusgroup="none"` to work like a weird disabled state (it’s not).
-   Adding `role="presentation"` to a node with `focusgroup` has no effect. The role from the `focusgroup` is still exposed in the accessibility tree and AAPIs. This is also true for `role="none"` ([`none` is a synonym for `presentation`](https://w3c.github.io/aria/#presentation)). This means you cannot apply `focusgroup` and then un-role it to keep the interaction but avoid the other requirements of the role. This feels like a bug?
-   When using NVDA or JAWS, the virtual cursor will not let me go letter-by-letter within a button (handy for getting the spelling) unless I leave forms mode (by pressing Esc in JAWS, for example). This is different from how I can typically interact with buttons. That feels buggy but I am not a daily screen reader user.

A table tracking what property behaviors are exposed from my tests.

`focusgroup` Default Behaviors

Role

`listbox`

`menu`

`menubar`

`radiogroup`

`tablist`

`toolbar`

Direction

`block`

`block`

`inline`

both

`inline`

`inline`

Wrapping

`nowrap`

`wrap`

`wrap`

`wrap`

`wrap`

`nowrap`

Default Acc Child

`[option](https://w3c.github.io/aria/#option)`

`[menuitem](https://w3c.github.io/aria/#menuitem)`

`[menuitem](https://w3c.github.io/aria/#menuitem)`

`[radio](https://w3c.github.io/aria/#radio)`

`[tab](https://w3c.github.io/aria/#tab)`

nope

## Opinions

I’m frustrated the explainer leans on APG patterns as if they are a, or _the_, standard while pointing only to MDN instead of the _actual_ ARIA standard. I understand why, but you may know [how I feel about APG](https://adrianroselli.com/2019/02/uncanny-a11y.html#APG).

I’m frustrated the menu example refers to web site navigation, when there is [years-old evidence showing that as an anti-pattern](https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html). I’m working on a web site navigation post to address this.

I’m frustrated yet [pleased](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html) navigation across a two-axis construct, such as an ARIA grid, is deferred. Though I understand that gets more complex.

While I’m thrilled this isn’t going into CSS, I’m worried that it isn’t completely off the table. I’ve so far been [unimpressed with the CSS Working Group’s ability to address accessibility concerns](https://alice.boxhall.au/articles/a-threat-model-for-accessibility-on-the-web/).

I’m excited to see these ARIA concepts finally make it to HTML (if only as a proposal so far). This fits the original model of ARIA as a temporary, bridging technology until HTML caught up. Which hey, maybe that will start to happen.

While I like that using `focusgroup` brings ARIA roles for free (in the accessibility tree and exposed to AAPIs), I’m worried how readily developers will unintentionally [role-up](https://adrianroselli.com/2020/02/role-up.html) standard HTML just to get free arrow key interactions. One Open-UI explainer [menu example fails to remove roles from lists](https://open-ui.org/components/scoped-focusgroup.explainer/#nested-focusgroups), demonstrating how easy it is to forget unless your testing is robust.

In April, Steve Frenzel shared his own in [My thoughts on the “focusgroup” attribute proposal](https://www.stevefrenzel.dev/posts/my-thoughts-on-the-focusgroup-attribute-proposal/) for an older proposal.