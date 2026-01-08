---
title: "My pick of the year for the State of CSS Survey"
source: "https://kilianvalkhof.com/2025/css-html/my-pick-of-the-year-for-the-state-of-css-survey/"
publishedDate: "2025-08-20"
category: "frontend"
feedName: "Kilian Valkhof"
author: "Kilian Valkhof"
---

## My pick of the year for the State of CSS Survey

[CSS & HTML](https://kilianvalkhof.com/category/css-html/), 20 August 2025, 2 minute read

The [State of CSS survey](https://2025.stateofcss.com/en-US) results are always fun to read through, and the ‘pick of the year’ by everyone in particular. Whenever [Sacha](https://sachagreif.com/) asks me if I have one I blank, and then a few days later there’s an obvious answer.

### My 2025 Pick: [text-wrap: balance;](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)

> I canâ€™t remember the last time a new CSS property was introduced that I could just add to any stylesheet new and old. Itâ€™s a little magic one liner that makes your titles much nicer with zero downsides. Add it to your css resets!

There have been many awesome new CSS features in the past 12 months, like view transitions, scroll driven animations, anchor positioning, @starting-style, field-sizing, animating to auto and ::details-content to name just a few.

They’re great, but most of those aren’t fully cross-browser yet and they are all fairly specific features around animation or positioning for where there isn’t really a good fallback in other browsers (you’d have to feature detect and use a polyfill or equivalent javascript).

However `text-wrap: balance` (and its buddy `text-wrap: pretty`) is this delightful single line of CSS that makes your site _a tiny bit better_, and support is great:

![Data on support for the css-text-wrap-balance feature across the major browsers from caniuse.com](https://caniuse.bitsofco.de/static/v1/css-text-wrap-balance-1755676359879.jpg)

Text-wrap: balance will make sure that the words are properly balanced across lines, avoiding the situation where the last line will have one or two words.

No one will notice if it’s missing, but you can just add it to all your headings in your CSS reset and they will look slightly better:

```
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance
}
```

Or, in [some future version](https://chromestatus.com/feature/5090991750250496) of [your browser](https://polypane.app/):

```
:heading {
  text-wrap: balance
}
```

Having new CSS that is so widely useful and applicable, that you can add without any negative consequences for non-supporting browsers is pretty rare (and pretty exciting!) and that’s why it’s my pick of the year.

Go check out the [State of CSS survey](https://2025.stateofcss.com/en-US) to read everyone else’s picks!

ps. I completely nicked this post idea from Ana, who wrote about her pick: [My pick of the year for the State of CSS Survey by Ana Rodrigues](https://ohhelloana.blog/my-pick-of-the-year-css/)