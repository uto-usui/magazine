---
title: "A reconsideration—in defence of &lt;b&gt; and &lt;i&gt; (or: people fear what they don’t understand)"
source: "https://csswizardry.com/2010/01/a-reconsiderationin-defence-of-b-and-i-or-people-fear-what-they-dont-understand/"
publishedDate: "2010-01-27"
category: "css"
feedName: "CSS Wizardry"
---

26 January, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [What the facts state](#what-the-facts-state)
2.  [Twitter](#twitter)
    1.  [Some replies](#some-replies)
    2.  [What about `strong` and `em`?](#what-about-strong-and-em)
    3.  [Where to use `<b>` and `<i>` then?](#where-to-use-b-and-i-then)
    4.  [A go-between in the meantime?](#a-go-between-in-the-meantime)
    5.  [The resolve?](#the-resolve)

The other day, I got to thinking about the HTML elements `<b>` and `<i>`, and wondered if they were still _viably_ usable in production code. I’ve personally never used them before but I was aware that they existed and were still very much valid XHTML markup (even in the Strict `DOCTYPE!`). Wondering whether I’d avoided two elements for three years unnecessarily, I did some digging.

## What the facts state

`<b>` and `<i>` _are_ still valid, and as XHTML is just an XML serialisation of HTML, pretty much all the elements apparent in the HTML spec are true of the XHTML spec too–it is, pretty much, just the way in which these elements are written that makes them different in XHTML.

## Twitter

With the help of [@smashingmag](https://twitter.com/smashingmag) I turned to [Twitter](https://twitter.com/csswizardry) and my knowledgeable followers and asked the question:

> Using `<i>` and `<b>` in (valid) XHTML (strict)… your thoughts on this would be much appreciated. #upcomingBlogPost Cheers all! **[@csswizardry](https://twitter.com/csswizardry)**

Most of the answers I got said petty much the same thing: use `strong` and `em` … `b` and `i` are deprecated. While this is largely true, there are some myths that need dispelling.

-   `strong` and `em` are _not_ the same as bold and italics. strong is strong emphasis and em is emphasis. **It is purely through convention that these two elements happen to adopt either bold or italicised appearances.**
-   `b` and `i` are _not_ deprecated in any way in HTML or XHTML. **They are still in existence, still valid and still (in the right places) usable.**

A few choice replies I received which are, on the whole, representative of everyone’s thoughts:

> strong and em make more sense, especially when taking screen readers into account. **[@CreativeNotice](https://twitter.com/CreativeNotice)**

Or so you’d think, see below…

* * *

> I prefer `<strong>` `<em>` because of semantics. You want to put emphasis, not just make text italic. **[@WeHelpDesign](https://twitter.com/wehelpdesign)**

True, if you _do_ just want emphasis that is…

* * *

> Using `<i>` and `<b>` is just fine if it’s for visual bling without real semantic background. **[@levito](https://twitter.com/levito)**

Ah, this is more like it!

* * *

> `<b>` and `<i>` tags describe presentation, not structural semantics. Rather style `<em>` and `<strong>` tags. **[@hornergraphic](https://twitter.com/hornergraphic)**

A view that is seemingly shared by almost everyone else who responded.

* * *

### What about `strong` and `em`?

The vast majority of people who replied were in favour of `strong` and `em` over `b` and `i`. Presuming all respondents were assuming the question was ‘What are your thoughts on using `b` and `i` to represent strong emphasis and emphasis, and thus replace `strong` and `em`?’ then they’d have all been spot on correct. However, `b` and `i` and `strong` and `em` are totally separate things. `b` and `i` assume no semantic value, meaning literally bold and italic respectively. `strong` and `em` however have nothing to do with bold or italics. As previously mentioned, it is through convention only that the default styling for each is so.

`strong` and `em` are ‘spoken word’ type elements, where they represent a change in tone only. This means that their styling is in no way linked to their naming, it is just that us, as people, are familiar with italicised prose sounding more stressed–or emphasised–than surrounding text. This is where the importance of aforementioned semantics and screenreaders come in. Or is it…?

#### The screenreader fallacy

Screenreaders _don’t_ use `strong` and `em`!

The common belief is that `strong` and `em`’s semantic meaning is used by screenreaders to alter tonality when reading content aloud, thus letting the user know that the copy is in fact meant to be understood in a different manner to any neighbouring text. This was something I too believed until the wonderfully knowledgeable [@pekingspring](https://twitter.com/pekingspring) pointed me toward [this article](http://www.paciellogroup.com/blog/?p=41) by [@stevefaulkner](https://twitter.com/stevefaulkner)–it turns out screenreaders _don’t_ use `strong` and `em` to alter tonality!

This means that screenreaders see no semantic value in the `strong` and `em` element. However, they should be used _unconditionally_ where a change in tone is implied, whether a screenreader will understand this or not.

### Where to use `<b>` and `<i>` then?

One of my first thoughts was where to use these elements if indeed they are still usable. My initial idea was the use of `i` for markup up things that have to be italicised but the italics aren’t indicative of any tone. To quote the Penguin Guide to Punctuation:

> Another use of italics … is to cite titles of complete works…

Initially I thought this was the ideal use for the `i` element–something that had to be in italics, yet implied no tone of voice. It was such a good fit! However, [@pekingspring](https://twitter.com/pekingspring) came to my aid again and reminded me that the `cite` element is for this exact purpose. That was that idea gone.

Another possible usage for the `i` element was gleaned from the [Typography Manual](http://typographyapp.com/) iPhone app, which states:

> Italics should be used for single letters in a sentence referred to as letters. \[for\] example ‘The letter _j_ appears too large.’

An idea I had for using `b` was somewhat linked to the `cite` element anyway. A common mistake is to markup the ‘author’ of a quote in `cite` tags. This is of course incorrect, but what _do_ you use? It’s not really a paragraph, so what is it? I did consider the `b` element for this, but I feel that such a piece of information does need a more semantic element to represent it.

Friend and colleague [@simonwiffen](https://twitter.com/simonwiffen) has a very nicely written example usage for each, which I personally think are spot on. The following chunk of text is lifted directly from an internal document written by [@simonwiffen](https://twitter.com/simonwiffen):

* * *

**1.4.3 Strong, emphasis, bold and italic**

`<strong>` (strong emphasis) and `<em>` (emphasis) should be used as opposed to `<b>` (bold) and `<i>` (italic) unless the bold or italic is required without any semantic context (for example in a product name).

**Examples**

Remember **you must** check this box

```
<p>Remember <strong>you must</strong> check this box.</p>
```

You should _really_ try to validate your pages

```
<p>You should <em>really</em> try to validate your pages</p>
```

Read more about **Splash_down_!™** below

```
<p>Read more about <b>Splash<i>down</i>!™</b> below</p>
```

* * *

Succinct and, in my opinion, pretty hard to argue with.

#### HTML5 has it sussed

I won’t be using HTML5 for a long while yet, but that’s another story altogether…

Ideally I’d like to retrofit the HTML5 specification’s definitions of each for use right now in XHTML, however I’m not sure I’d be comfortable going ahead with doing such a thing, coding to one spec whilst picking my favourite bits of another.

##### The `<b>` element in HTML5

> The \`b\` element represents a span of text to be stylistically offset from the normal prose without conveying any extra importance, such as key words in a document abstract, product names in a review, or other spans of text whose typical typographic presentation is boldened.
> 
> **[HTML5](http://dev.w3.org/html5/spec/Overview.html#the-b-element)**

##### The `<i>` element in HTML5

> The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, a thought, a ship name, or some other prose whose typical typographic presentation is italicized.
> 
> **[HTML5](http://dev.w3.org/html5/spec/Overview.html#the-i-element)**

### A go-between in the meantime?

There will always be the argument that instead of using `b` and `i` you could or should use something like or so as to avoid using insemantic elements, however a class name like that is more insemantic than an in-spec HTML element. Not to mention the fact that a `span` with a `class` applied is far more cumbersome than a ‘pre-made’ piece of HTML.

### The resolve?

So which is worse?

-   Using `i` to mark up emphasised text
-   Using `em` to mark up italicised and non-emphasised text
-   Using `i` to mark up purely italicised text
-   Using `<span class="italics">` to mark up italicised text

Special thanks to the following for help with this article: [@smashingmag](https://twitter.com/smashingmag), [@pekingspring](https://twitter.com/pekingspring), [@stevefaulkner](https://twitter.com/stevefaulkner), [@simonwiffen](https://twitter.com/simonwiffen) and all [my Twitter followers](https://twitter.com/csswizardry/followers).

I think that the fact that `b` and `i` are still in the spec, are valid (even in strict) and are being carried over to HTML5 (albeit slightly redefined) indicates that there is still a very real place for them in web development right now. The frequency with which they’ll be used is slim at best, but they should not be ruled out, and at the very least not misunderstood. I’m not going to make the leap myself just yet, but they are there, they are usable, and one day I might just use them.

What are you going to do?

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