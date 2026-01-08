---
title: "Typography for Developers"
source: "https://csswizardry.com/2017/02/typography-for-developers/"
publishedDate: "2017-02-07"
category: "css"
feedName: "CSS Wizardry"
---

6 February, 2017

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Ellipses](#ellipses)
2.  [Quotes](#quotes)
    1.  [Apostrophes](#apostrophes)
    2.  [Sixty-Sixes and Ninety-Nines](#sixty-sixes-and-ninety-nines)
3.  [Dashes](#dashes)
    1.  [Hyphens](#hyphens)
    2.  [Minuses](#minuses)
    3.  [En Dashes](#en-dashes)
    4.  [Em Dashes](#em-dashes)

Since as long as I can remember, I’ve had a soft spot for typography, and when it makes up so much of the web, typography should be good. Learning how to design with type, and pair typefaces, is a skill unto itself, but the good news for us less design-minded developers is that there are a few simple rules we can follow to get guaranteed better looking text with almost zero effort. And if there’s one thing developers love, it’s rules.

Time and again I see mis-implemented type that could have been avoided simply by developers having a better appreciation for, and understanding of, some typographical nuance. Learn and memorise the rules in this article and you’ll find that your text will become much more harmonious and polished, and you won’t have designers bugging you about using the wrong type of dash…

## Ellipses

Let’s start with the simplest one, the ellipsis. The ellipsis represents an omission or trailing of thought. It is a single glyph comprising three dots, like so:

To be continued…

Try highlighting the three dots: notice how there’s only one character there, not three? That because the ellipsis is not three separate period glyphs, and it most **definitely** isn’t a whole series of periods:

To be continued........

That isn’t a thing at all, so certainly never do that.

If you want to write an ellipsis character, you have a few options:

Mac

Win

HTML

Output

Alt+;

Alt+0133

`&hellip;`

…

* * *

## Quotes

The quotes you find on your keyboard are ambidextrous, or _dumb_ quotes. They are big, awful, clumsy, straight lines that look like wedges jammed into your text. They exist purely because of space constraints on modern keyboards: there just isn’t enough room to have left and right single- and double-quote marks, so instead we have quote marks that can do both.

'Single' and "double" dumb quotes. Ugly.

These are the kinds of quotes you’re used to writing in your code, and they’re fine there, but in any prose we want to make sure we use proper _book_ quotes. Their purposefully designed shapes are much more sympathetic to the typeface, and are visually much less jarring:

‘Single’ and “double” book quotes. Beautiful.

### Apostrophes

Apostrophes follow the same rule as quotes, and use the same glyph as a right single quote:

It's awful like this.

See how awkward and harsh that looks? Like it doesn’t belong?

It’s much nicer like this.

Mac

Win

HTML

Output

Alt+\]

Alt+0145

`&lsquo;`

‘

Alt+Shift+\]

Alt+0146

`&rsquo;`

’

### Sixty-Sixes and Ninety-Nines

When I was at school we were taught that opening quotes look like two sixes, 66, and that closing quotes look like two nines, 99. This likeness is much more apparent in serif faces:

“Sixty-sixes and ninety-nines.”

Mac

Win

HTML

Output

Alt+\[

Alt+0147

`&ldquo;`

“

Alt+Shift+\[

Alt+0148

`&rdquo;`

”

However, I seldom use double quotes. I share Jost Hochil’s sentiment that \[a\] more attractive appearance is achieved by using single quotation marks for the more frequently occurring quotations, and the double version for the less frequent occurrence of quotations within quotations.[1](#fn:1)

American English tends toward the use of “double quotes”, but I much prefer the less obtrusive appearance of ‘single quotes’. They look far more subtle in passages of text, and the best typography always goes unnoticed.

‘Sixes and nines.’

* * *

## Dashes

Dashes are a whole chapter unto themselves. Again, as with the ambidextrous quotes, physical limitations on keyboards meant that we have just one catch-all key, the hyphen, that is often called upon to fulfil the role of all kinds of dash.

### Hyphens

The hyphen on your keyboard is actually only useful for a small number of tasks. If you need a compound modifier (e.g. a _light-green dress_), a double barrelled name (e.g. _Robert Bayden-Powell_), or words split over two lines in justified text, you should use a hyphen. Pretty much everything else has a more specific type of dash that should be used.

Front-end Developer

Mac

Win

HTML

Output

\-

\-

`-`

\-

### Minuses

If you really want to show off, there’s technically a different character for minuses. A hyphen is a very close approximation, but is set a little lower and shorter than a true minus.

Your balance is £-1902.

Your balance is £−1902.

Use this in any math you need to write, or for displaying negative values. Unfortunately it’s a little harder (read, potentially impossible) to write out on a Mac.

Mac

Win

HTML

Output

N/A

Alt+2212

`&minus;`

−

### En Dashes

The en dash is a slightly longer dash used to denote ranges or relations, e.g.:

Refer to pages 88–93.

Father–son relationship.

It is typically, though not necessarily, half the width of the em dash.

Mac

Win

HTML

Output

Alt+-

Alt+0150

`&ndash;`

–

### Em Dashes

The em dash is usually one em wide (hence the name), meaning that it would be 24 points wide in a 24pt font, 12pt wide in a 12pt font, and so on. It represents a change in thought, and is a slightly more elegant substitute for parenthesis.

It has been said—though I would say otherwise—that I’m something of a pedant.

It could also be used in place of a colon.

The three technical ingredients for responsive web design—fluid grids, flexible images, and media queries.

Mac

Win

HTML

Output

Alt+Shift+-

Alt+0151

`&mdash;`

—

Em dashes are usually set with no space between them and the adjoining character, however some people prefer to use an en dash set with spaces and avoid the em dash altogether. I’m not so much a fan of this approach as it can often look a little ambiguous, but let your decision be guided by your styleguide and/or the typeface.

Spaced en dashes – like these – can take the place of ems.

#### Hair Spaces

Again, if you’re feeling particularly fancy, you can set your em dashes with hair spaces (`&#8202;`) either side of them.

Hair-spaced em dashes — like these — are pretty neat.

Mac

Win

HTML

Output

N/A

N/A

`&#8202;`

\] \[

* * *

There’s plenty more out there to be learned, but for now I think that would make a great start. A few simple rules that drastically improve the quality of your text without you needing any real design knowledge.

* * *

1.  [Detail in Typography](https://www.amazon.co.uk/Jost-Hochuli-Typography-English-Reprint/dp/2917855665/) [↩](#fnref:1)
    

* * *

* * *

* * *

![](https://csswizardry.com/img/content/avatar.jpg)

##### By [Harry Roberts](https://csswizardry.com/about/)

Harry Roberts is an [independent consultant](https://csswizardry.com/consultancy/) web performance engineer. He [helps companies](https://csswizardry.com/services/) of all shapes and sizes find and fix site speed issues.

* * *

* * *

![](https://csswizardry.com/img/css/masthead-small.jpg)

Hi there, I’m **Harry Roberts**. I am an **[award-winning](https://web.archive.org/web/20190630140300/https://thenetawards.com/previous-winners/) Consultant Web Performance Engineer**, **designer**, **developer**, **writer**, and **speaker** from the UK. I **[write](https://csswizardry.com/blog/)**, **[Tweet](https://twitter.com/csswizardry)**, **[speak](https://csswizardry.com/speaking/)**, and **[share code](https://github.com/csswizardry)** about measuring and improving site-speed. You [should hire me](https://csswizardry.com/services/).

* * *

#### Connect

-   [𝕏 (Twitter)](https://twitter.com/csswizardry)
-   [Mastodon](https://webperf.social/@csswizardry)
-   [Bluesky](https://bsky.app/profile/csswizardry.com)
-   [LinkedIn](https://www.linkedin.com/in/csswizardry/)
-   [GitHub](https://github.com/csswizardry)
-   [YouTube](https://www.youtube.com/@csswizardry?sub_confirmation=1)

* * *

#### Projects

#### Next Appearance

-   #### Talk
    
    ![](https://csswizardry.com/img/icons/nl.png) [performance.now()](https://perfnow.nl/): Amsterdam (Netherlands), October 2025

I help teams achieve **class-leading web performance**, providing consultancy, guidance, and hands-on expertise.

I specialise in tackling complex, large-scale projects where speed, scalability, and reliability are **critical to success**.

**CSS Wizardry Ltd** is a company registered in England and Wales. **Company No.** 08698093, **VAT No.** 170659396. [License Information](https://csswizardry.com/license/).