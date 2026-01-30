---
title: "Give footnotes the boot"
source: "https://jakearchibald.com/2025/give-footnotes-the-boot/"
publishedDate: "2025-07-01"
category: "web-standards"
feedName: "Jake Archibald"
---

I hate footnotes1, and hopefully by the end of this, you will too. Let's get down to it…

You, the reader, encounter a tiny number2 within some prose. This indicates to you that I, the writer, have something more to say on this topic. And, for your inconvenience, I've put it way down at the bottom of the page.

The choice is yours: do you skip over it, and stay in the flow of the article, or do you set off on a side-quest to discover the extra wisdom I have to offer?

It's like one of those "choose your own adventure" books, except you know the destination is a dead-end, meaning you'll have to re-trace your steps so you can continue the main thread of the article.

Maybe if you know me well enough, you can be in tune with the kinds of things that I'd choose to leave in a footnote, and you can make some kind of judgement on whether it's likely to be worth your time. But since this is the first time I've used footnotes in an article3, you don't really have anything to go on. All that little 3 tells you is that there's some additional content that may or may not be contextually useful to you, and that it's the third time I've done this to you.

Whether you go out of your way to read the footnote content is really just a test of your curiosity.

If you did make your way down to the footnotes, I hope you appreciated that I set the text size to be a little smaller than the 'ideal' size that I chose for the main body content, making them harder to read, such is the tradition within the footnote community.

And if you enjoyed all of that, I have _great news for you_: many people bring this experience to the world wide web.

## [Footnotes on the web](#footnotes-on-the-web)

If reproduced as-is, footnotes on the web are even worse than their printed counterparts. In print, the footnotes are usually at the bottom of the current page, so they're a quick glance away, and you can use a finger to mark your place in the main text while you're off on your side-quest. Whereas on this beautiful pageless web of ours, you have to scroll all the way down to the end of the article. You can try flinging right to the bottom of the document, but if there's a sizeable footer or comments section, you'll overshoot the footnotes. And of course, after all of this, you have to scroll back to where you were, which is easier said than done.

However, most webby footnoters have realised that in the printed world, the numbering of footnotes is used to manually _link_ the primary content to the supplemental content, and the web has a dedicated feature to enhance connections like this: hyperlinks[4](#footnote-4).

Of course, with footnotes being at the bottom of the article, sometimes these links will simply take you to the end of the document, so you'll _still_ have to visually scan for the pertinent footnote[5](#footnote-5).

If the footnote markers are links, then the user can use the back button/gesture to return to the main content. But, even though this restores the previous scroll position, the user is still left with the challenge of finding their previous place in a wall of text[6](#footnote-6).

We could try to solve that problem by dynamically pulling the content from the footnotes and displaying it in a popover. In some browsers that will display like a tooltip, pointing directly back to the footnote marker. Thanks to modern web features, this can be done entirely without JavaScript.

But this is still shit! I see good, smart people, who'd always [avoid using "click here" as link text](https://www.w3.org/QA/Tips/noClickHere), littering their articles with link texts such as 1, 7, and _sometimes even 12_. Not only is this as contextless as "click here", it also provides the extra frustration of a tiny-weeny hit target.

_Update:_ Adrian Roselli pointed out that there are [numerous bugs with accessibility tooling and superscript](https://adrianroselli.com/2022/09/brief-note-on-super-and-subscript-text.html).

And all this for what? To cargo-cult academia? Stop it! Stop it now! Footnotes are a shitty hack built on the limitations of printed media. It's dumb to build on top of those limitations when they don't exist on the web platform. So I ask you to break free of footnotes and do something better.

## [Alternatives to footnotes on the web](#alternatives-to-footnotes-on-the-web)

Here are the goals:

-   Provide easily-read supplementary content.
-   Let the user easily skip over it if they're not interested.
-   Make it easy for the user to decide if they're interested or not.

Given that:

### [Just, like… parentheses?](#just-like-parentheses)

Honestly, if you've got a quick little aside, just pop it in parentheses. If the reader really wants to skip it, scanning for the next closing parenthesis is pretty easy (unless you're nesting them – don't do that), and it keeps the reader in the flow of the article.

### [A 'note' section](#a-note-section)

If your content is a little longer, you can use `<section role="note">` and style it to look self-contained.

#### [Why not `<aside>`?](#why-not-aside)

I thought [the `<aside>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside) would be ideal for this, but that uses [the `complementary` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/complementary_role) which doesn't seem like a good fit for this kind of content. Whereas [the `note` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/note_role) is specifically for "parenthetic or ancillary content", which sounds perfect.

The heading makes the topic of the note clear, and since the content is semantically and visually contained, it's easy to skip over.

### [A 'details' section](#a-details-section)

If your content is too long for a note, consider using [`<details>` and `<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details).

Animating the height of the `<details>` element

Thanks to a few newer CSS features (currently only available in Chromium), such as [the `::details-content` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content), [`allow-discrete` transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior#allow-discrete), and [interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size), we can animate the opening and closing of `<details>` elements.

```
:root {
  interpolate-size: allow-keywords;
}

.details-demo {
  &::details-content {
    height: 0;
    overflow: clip;
    display: flow-root;
    transition:
      height 0.5s ease,
      content-visibility 0.5s ease allow-discrete;
  }

  &[open]::details-content {
    height: auto;
  }
}
```

Like the note section, the summary makes the topic of the details clear, and since the content is semantically and visually contained, it's easy to skip over. The benefit with `<details>` is the user doesn't have to scroll past lots of content if they're not interested.

I'm not a UX designer, so maybe you can think of better patterns. But if the alternative is footnotes, the bar is lowwwww.

## [Update: are my alternatives too disruptive?](#update-are-my-alternatives-too-disruptive)

I've really enjoyed the reasoned feedback to this post. Particularly those from [Lea Verou](https://front-end.social/@leaverou/114784950642671149), and [Stuart Langridge](https://www.kryogenix.org/days/2025/07/03/a-limited-defence-of-footnotes/). I recommend reading them in full (and also try a 'chello-bull for yourself), but I want to respond to the general sentiment that the alternatives are _too disruptive_.

Let's take my parenthetical example:

> Honestly, if you've got a quick little aside, just pop it in parentheses. If the reader really wants to skip it, scanning for the next closing parenthesis is pretty easy (unless you're nesting them – don't do that), and it keeps the reader in the flow of the article.

Where the user experience is:

1.  Read "scanning for the next closing parenthesis is pretty easy".
2.  Read "(unless you're nesting them".
3.  Then one of the following:
    -   Read " – don't do that)".
    -   Or, if you've become disinterested in this supplementary information, scan along to ")".
4.  Continue reading.

And compare it to the popover-footnote experience:

> Honestly, if you've got a quick little aside, just pop it in parentheses. If the reader really wants to skip it, scanning for the next closing parenthesis is pretty easy, and it keeps the reader in the flow of the article.

Where the user experience is:

1.  Read "scanning for the next closing parenthesis is pretty easy8".
2.  Decide, given no real clue as to the content of the footnote, to do one of the following:
    -   Explore, by clicking the 8:
        1.  Read "Unless you're nesting them – don't do that."
        2.  Click outside the popover.
        3.  Continue reading.
    -   Or, skip over the 8.
3.  Continue reading.

Hopefully it's clear from the above that the simple parentheses solution is less disruptive, except maybe in the case where the reader is by-default disinterested in the extra content. And that's where the argument loses me.

**Why are you optimising the reading experience for people disinterested in your content?** Like, if the content is really that pointless, don't put it in the article – that's even less disruptive! But, if you've got something interesting to say, say it in context. If it's really optional, make it easy for readers to skip it once they realise it's not for them. Skipping over less-relevant content is a normal part of reading. We don't need to over-engineer it.

What about sidenotes?

One of the footnote patterns I didn't explore were [sidenotes](https://scottstuff.net/posts/2024/12/17/more-notes-on-notes/), which only really work on desktop. But the disruption is similar. You see the superscript, and then you have to find the related sidenote (which is especially annoying in implementations that `Math.random()` the note to either the left or right), then visually find your way back to the main content.

All that said, I will admit I was really pleased with the no-JS popover footnotes when I got them working (although they're Chromium-only right now). But, I think that might be more down to the excitement of playing with a new CSS feature for the first time. Oh, on the topic of CSS anchors, my advice is to ignore [`position-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/position-area), which included too much magic for me to figure out, and instead use [`anchor()`](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor). Although your mileage may vary.

You'll be glad to hear my new job starts in August, so I won't have as much time to waste on posts like this.

There. I hope you're happy.