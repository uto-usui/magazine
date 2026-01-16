---
title: "Live Region Support"
source: "https://adrianroselli.com/2026/01/live-region-support.html"
publishedDate: "2026-01-14"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

This post does not discuss whether live regions are good, nor is it a post about the best way to use them. This post only covers how they are exposed to the audience who experiences them — screen reader users. Written by a non-screen-reader user.

![1970s movie poster of darkened baby carriage with two clawed and bloody hands reaching out while cops run in the far background, titled “It’s Alive!”.](https://adrianroselli.com/wp-content/uploads/2026/01/its-alive.jpg) If you’re here because your live region isn’t working as you expect, then your expectation is wrong, you did something wrong, or you found a fun bug. Read Pat’s [Why are my live regions not working?](https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/) instead of this post.

If you want a quick review of current support and simple test cases with testing steps, then keep reading. Otherwise, I dunno, close this tab?

## Demo

I made this demo in mid-2024 to demonstrate a problem. It now covers five kinds of live regions:

-   polite, via [`aria-live="polite"`](https://w3c.github.io/aria/#aria-live:~:text=region%2E-,polite);
-   assertive, via [`aria-live="assertive"`](https://w3c.github.io/aria/#aria-live:~:text=assertive,-Indicates);
-   an alert, via [`role="alert"`](https://w3c.github.io/aria/#alert);
-   the HTML [`<output>`](https://html.spec.whatwg.org/#the-output-element) element
-   a control with a node associated via [`aria-describedby`](https://w3c.github.io/aria/#aria-describedby) whose value changes, [triggering an event](https://www.w3.org/TR/core-aam-1.2/#event-aria-describedby).

That last one is a bit of a curve ball because it isn’t a live region, but it can functionally behave like one. Many authors are unaware of this, and for those who are aware, many think it’s a bug. The example uses a button, text input, and select menu. The button fires on activation, the two fields on change. Give the live region time to clear before moving to the next control. When testing, be sure you are hearing the de facto live region and not that you moved focus to the subsequent control with a description.

The demo also shows how these live regions work when hidden using any of three methods:

-   via HTML using [`hidden`](https://html.spec.whatwg.org/#the-hidden-attribute);
-   via ARIA using [`aria-hidden`](https://w3c.github.io/aria/#aria-hidden);
-   via CSS using [`display:none`](https://drafts.csswg.org/css-display/#valdef-display-none).

As always, I have a [debug view](https://cdpn.io/aardrian/debug/rNQMXPY) without the Codepen cruft so you can test more easily.

See the Pen [Live Regions, Hidden and Not](https://codepen.io/aardrian/pen/rNQMXPY) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

## Results

The detailed results that follow the table go into specific versions and browsers used. Failure for a screen reader to support a feature properly may be a function of the browser, not the screen reader (especially with dynamic descriptions). Other bits:

-   buggy means that an implementation has bugs. These could be from the browser or the screen reader. Wade into the detailed results later in this post to check the most current version.
-   yes means the feature works as intended. You’ll note it only appears in the last column because it’s the only one that’s unambiguous in what is expected or preferred.
-   Blank cells reflect what I could not test because I had no Braille viewer.
-   I updated Chrome just before publishing and got a different result on the dynamic description test, so I threw a question mark on it until I can confirm if this is user error or some kind of change.

Current Support

Screen Reader / Browser

polite, Audio

polite, Braille

assertive, Audio

assertive, Braille

alert Role, Audio

alert Role, Braille

alert Role, Audio “alert”

alert Role, Braille “alert”

<output>, Audio

<output>, Braille

aria-describedby, Audio

aria-describedby, Braille

Hidden Regions Hidden

NVDA / Firefox

polite

assertive

polite

assertive

assertive

buggy

yes

buggy

polite

assertive

no

no

yes

JAWS / Chrome

polite

assertive

polite

assertive

polite

assertive

no

no

polite

assertive

polite?

assertive?

yes

Narrator / Edge

polite

assertive

polite

assertive

polite

assertive

no

no

polite

assertive

no

no

yes

VoiceOver macOS / Safari

buggy

buggy

assertive

assertive

assertive

assertive

no

no

buggy

buggy

no

no

yes

Orca / Firefox

polite

polite

buggy

buggy

polite

no

no

yes

TalkBack / Chrome

polite

polite

polite

no

polite

no

no

yes

VoiceOver iDevice / Safari

polite

assertive

assertive

no

polite

no

no

yes

## Detailed Results

For the read-all testing on macOS, I would activate it (Ctrl + Opt + A), then when a button had focus I would hit Enter. I could visually confirm the live region was populated and I had the Braille emulator running. NVDA’s read-all (Caps Lock + A) and JAWS’ read-all (Caps Lock + ↓) does not leave programmatic focus on controls while reading so the tactic does not work there.

I’m not a daily screen reader user and I used the [Braille viewers built into each screen reader](https://adrianroselli.com/2023/01/jaws-nvda-and-voiceover-braille-viewers.html), so they may not reflect actual hardware exposure to users.

-   JAWS 2023.2306.38 + Chrome 114
    -   All live regions treated as polite (announces at first break, which is not at end of sentence).
    -   `alert` role does not pre-pend announcement with alert.
    -   Each appeared as assertive in the Braille emulator.
    -   No live region announces when hidden
-   JAWS 2026.2512.50 + Chrome 143.0.7499.193
    -   All live regions treated as polite (announces at first break, which is not at end of sentence).
    -   `alert` role does not pre-pend announcement with alert.
    -   Each appeared as assertive in the Braille emulator.
    -   The dynamic description announces and is exposed in Braille emulator.
    -   No live region announces when hidden
-   JAWS 2026.2512.50 + Chrome 144.0.7559.60
    -   All live regions treated as polite (announces at first break, which is not at end of sentence).
    -   `alert` role does not pre-pend announcement with alert.
    -   Each appeared as assertive in the Braille emulator.
    -   The dynamic description does not announce nor is it exposed in the Braille emulator.
    -   No live region announces when hidden
-   NVDA 2023.1 + Firefox 114
    -   `alert` role treated as assertive (interrupts announcement but goes back and re-announces content it interrupted).
    -   `alert` role pre-pends announcement with alert.
    -   Only the `alert` role message appeared in the Braille emulator.
    -   No live region announces when hidden
-   NVDA 2024.1 + Firefox 126
    -   Polite, assertive, and `<output>` live regions treated as polite (announces at first break, which is not at end of sentence).
    -   `alert` role treated as assertive (interrupts announcement but goes back and re-announces content it interrupted).
    -   `alert` role pre-pends announcement with alert.
    -   Each appeared as assertive in the Braille emulator.
    -   The `alert` role was expsed in the Braille emulator only as “alert”, without the message..
    -   No live region announces when hidden
-   NVDA 2025.3.2 + Firefox 146.0.1
    -   Polite, assertive, and `<output>` live regions treated as polite (announces at first break, which is not at end of sentence).
    -   `alert` role treated as assertive (interrupts announcement but goes back and re-announces content it interrupted).
    -   `alert` role pre-pends announcement with alert.
    -   `alert` role showed alert in Braille emulator, but not the rest of the message.
    -   Each appeared as assertive in the Braille emulator.
    -   The `alert` role was expsed in the Braille emulator only as “alert”, without the message..
    -   The dynamic description does not announce nor is it exposed in the Braille emulator.
    -   No live region announces when hidden
-   Narrator Win11 22621.1702 + Edge 114
    -   All live regions treated as polite, waiting for first sentence to finish before announcing live region and then continuing to read content.
    -   `<output>` is not announced at all. Likely a Narrator bug since it is not announced in Chrome or Firefox either. Though Chrome and Firefox both show it as a `status` region in Microsoft Accessibility Insights, Edge does not seem to expose it. Chatter on the socials suggests [it might be a UIA bug](https://toot.cafe/@matt/110595061096851329).
    -   `alert` role does not pre-pend announcement with alert.
    -   It has no Braille emulator.
    -   No live region announces when hidden
-   Narrator Win11 25H2 + Edge 143.0.3650.139
    -   All live regions treated as polite, waiting for first sentence to finish before announcing live region and then continuing to read content.
    -   Each appeared as assertive in the Braille emulator.
    -   `alert` role does not pre-pend announcement with alert.
    -   Each appeared as assertive in the Braille emulator.
    -   The dynamic description does not announce nor is it exposed in the Braille emulator.
    -   No live region announces when hidden
-   VoiceOver + macOS 12.6.6 + Safari 16.5
    -   `aria-live="polite"` is not announced during read-all (Ctrl + Opt + A), but acts assertive in Braille displays and some content is lost.
    -   `aria-live="assertive"` treated as assertive (interrupts announcement, stops reading).
    -   `alert` role treated as assertive (interrupts announcement, stops reading).
    -   `alert` role does not pre-pend announcement with alert.
    -   `<output>` is not announced during read-all (Ctrl + Opt + A), but acts assertive in Braille displays and some content is lost.
    -   No live region announces when hidden
-   VoiceOver + macOS 26.0.1 + Safari 26.0.1
    -   `aria-live="polite"` is not announced during read-all (Ctrl + Opt + A), but acts assertive in Braille displays and some content is lost.
    -   `aria-live="assertive"` treated as assertive (interrupts announcement, stops reading).
    -   `alert` role treated as assertive (interrupts announcement, stops reading).
    -   `alert` role does not pre-pend announcement with alert.
    -   `<output>` announces twice and appears in Braille emulator twice.
    -   The dynamic description does not announce nor is it exposed in the Braille emulator.
    -   No live region announces when hidden
-   Orca + Ubuntu 24.10 + Firefox 131.0.2
    -   All live regions treated as polite, waiting for end of first visual line (at wrap) before announcing live region and then continuing to read content.
    -   `alert` role not announced at all.
    -   The dynamic description does not announce.
    -   I have no Braille emulator.
    -   No live region announces when hidden
-   Orca + Ubuntu 25.04 + Firefox 146.0.1
    -   All live regions treated as polite, waiting for end of first visual line (at wrap) before announcing live region and then continuing to read content.
    -   `alert` role not announced at all.
    -   The dynamic description does not announce.
    -   I have no Braille emulator.
    -   No live region announces when hidden
-   TalkBack 13.1 + Android 13 + Chrome 114
    -   All live regions treated as assertive (interrupts announcement, does not go back and re-announce content it interrupted).
    -   `alert` role does not pre-pend announcement with alert.
    -   I have no Braille emulator.
    -   No live region announces when hidden
-   TalkBack 16.0.0.777931756 + Android 16 + Chrome 143.0.7499.146
    -   All live regions treated as polite.
    -   `alert` role does not pre-pend announcement with alert.
    -   I have no Braille emulator.
    -   The dynamic description does not announce.
    -   No live region announces when hidden
-   VoiceOver + iPadOS 16.5 + Safari 16.5
    -   `aria-live="assertive"` and `alert` role treated as assertive (interrupts announcement but goes back and re-announces content it interrupted).
    -   `alert` role does not pre-pend announcement with alert.
    -   I have no Braille emulator.
    -   No live region announces when hidden
-   VoiceOver + iPadOS 26.2 + Safari 26.2
    -   `aria-live="assertive"` and `alert` role treated as assertive (interrupts announcement but does not go back and re-announces content it interrupted).
    -   `alert` role does not pre-pend announcement with alert.
    -   I have no Braille emulator.
    -   The dynamic description does not announce.
    -   No live region announces when hidden

## Wrap-up

This reflects support as noted for the latest releases in the _Detailed Results_ section. If you find something amiss, leave a comment. It’s possible I got something wrong during transcription or testing. Or just, you know, life.