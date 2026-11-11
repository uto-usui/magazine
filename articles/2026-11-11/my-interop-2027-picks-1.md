---
title: "My Interop 2027 Picks"
source: "https://blog.master.dev/my-interop-2027-picks/"
publishedDate: "2026-11-10"
category: "css"
feedName: "Frontend Masters Blog"
author: "Chris Coyier"
---

![Post Thumbnail for My Interop 2027 Picks](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/margin-trim-2.jpg?fit=1024%2C614&quality=89&ssl=1)

I absolutely love that everyone is chiming in on Interop this year with blog posts. Surely, in no small part, thanks to [the official ranking tool](https://interop-rank.fxdx.dev/). Gotta put in my votes! I’m only doing three, so you know they gotta be good.

## #1) `margin-trim` in CSS

I’m picking this as my top vote because I think about it _all the time._ I always freaking hate it when I have to do like:

`.element {      > *:last-child {     margin-block-end: 0;   } }`Code language: CSS (css)

Janky.

I’d rather deal with it right on the container:

`.element {   margin-trim: block; }`Code language: CSS (css)

The point is that if the element has padding (which it likely does), extra margin on the final element (in any direction) will make that space too big. I love thinking about the container being able to chop off that extra margin. No margin! Bad margin!

The brainworm:

Any time an element has `padding` in a direction, add `margin-trim` in that same direction.

Safari has had it for a long time. It’s nice that Chrome just picked it up last month, but now we need Firefox to get on board. That makes this a perfect Interop vote.

## #2) `random()` in CSS

I think once we have it and everyone knows we have it (and it works everywhere), we humans responsible for the CSS are going to reach for it regularly.

Any design effect with details that don’t need to be exactly prescribed could have an element of randomness that might end up looking awesome.

-   Does the placement need to be precise, or could it be randomly offset a little?
-   Does the gradient angle need to be exact, or could it start in a random place each time?
-   Do those grungy speckles need to be exactly where they are, or should they be randomly sized and placed?
-   If a bunch of elements are being animated at once, do they need precise timing, or could they stagger with slightly random timing?
-   Does that curvy clipping path need to be exactly right there, or could it have a bit of random variation?

I think it can add elegance and fun to a design, and even pull off certain effects that might be tedious or annoying without it. Still a fan of [my own starfield parallax demo](https://codepen.io/editor/chriscoyier/pen/019a82f5-7fde-72f5-90ab-d23632dd9ca6) (which is way smoother in Safari and makes me wonder why).

Brecht De Ruyte has a good article on it recently (and we have [several of our own](https://blog.master.dev/tag/random/) as well). I like this demo from Brecht where obviously there is a bunch of randomization involved, but the effect as a whole isn’t random, it’s an established aesthetic put into place.

Browser support also seems close, and the implementation doesn’t seem overly difficult, so let’s get it done!

## #3) `reading-flow` and `reading-order` in CSS

I hate the fact that if you basically _ever use `order`_ you’re breaking the law. Just by its very use, if it actually re-orders something, now you’ve broken the connection between visual order and tab order, and that’s an accessibility no-no.

This is the one thing that can actually fix that.

> \`reading-flow\` is great in that means we can fix useful usage of \`order\` in flex/grid layouts. Not supported everywhere, hence a vote from me in Interop 2027. (Any why no support with grid-lanes?)
> 
> Here's a look: [pic.twitter.com/frJ2332RUD](https://t.co/frJ2332RUD)
> 
> — Chris Coyier (@chriscoyier) [November 7, 2026](https://x.com/chriscoyier/status/2119115274393878633?ref_src=twsrc%5Etfw)

## Smarter People Weigh In!

Lots of people are blogging their votes this year. You love to see it.

-   [Eric Meyer](https://meyerweb.com/eric/thoughts/2026/10/14/my-interop-2027-rankings/)
-   [Josh Comeau](https://www.joshwcomeau.com/css/interop-2027/)
-   [Ana Rodrigues](https://ohhelloana.blog/my-interop-2027/)
-   [Sara Soueidan](https://www.sarasoueidan.com/blog/interop-2027-rankings/)
-   [Declan Chidlow](https://vale.rocks/micros/20261011-0700)
-   [Cyd Stumpel](https://cydstumpel.nl/my-picks-for-interop-2027/)
-   [Tyler Sticka](https://tylersticka.com/journal/interop-2027-rank/)
-   [Paweł Grzybek](https://pawelgrzybek.com/my-interop-2027-picks/)
-   [Stuart Robson](https://www.alwaystwisted.com/articles/and-thats-my-rank-2027-edition)
-   [David Marland](https://www.hammerspace.co.uk/posts/interop2027-10-2026)
-   [Sam Smith](https://smth.uk/2027-interop-ranking/)
-   [Roland Franke](https://rolandfranke.nl/frontend-stories/my-interop-2027-css-wishlist/)
-   [Jeremy Keith](https://adactio.com/journal/22805)
-   [Jeff Bridgforth](https://jeffbridgforth.com/my-interop-feature-ranking-2027/)
-   [Ky Decker](https://ky.fyi/posts/interop-2027)
-   [Remy Sharp](https://remysharp.com/2026/10/29/my-2027-web-platform-feature-ranking)
-   [Christopher Kirk-Nielsen](https://chriskirknielsen.com/blog/interop-2027-rankings/)
-   [Jeremy Keith](https://adactio.com/journal/22805)
-   [Tyler McGinnis](https://bytes.dev/archives/535)