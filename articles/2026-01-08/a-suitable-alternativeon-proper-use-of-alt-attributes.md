---
title: "A suitable alternative—on proper use of alt attributes"
source: "https://csswizardry.com/2010/01/a-suitable-alternativeon-proper-use-of-alt-attributes/"
publishedDate: "2010-01-27"
category: "css"
feedName: "CSS Wizardry"
---

26 January, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [When not to use it](#when-not-to-use-it)
2.  [You’re using it, but not quite right…](#youre-using-it-but-not-quite-right)
    1.  [Other poor uses](#other-poor-uses)
3.  [Using the attribute properly](#using-the-attribute-properly)
4.  [The biggest no-no of all](#the-biggest-no-no-of-all)
5.  [How to do it properly](#how-to-do-it-properly)

Images in HTML come with a mandatory attribute used to _textually_ describe the information displayed _visually_ through the image. The `alt` attribute (not _tag_) is used by screenreaders etc to tell users who can’t view the actual image what it represents. It is also used in any circumstance where images can’t be loaded (slow connections, broken URIs etc).

## When not to use it

You should never _not_ use an `alt` attribute, rather leave it empty, thus: `alt=""`

The only time you can really get away with _not_ having a complete `alt` attribute is if the image holds no context or information that the user needs to be aware of. This is usually the case when the image is purely decorational, though it may be argued that the image should therefore be added through CSS in the spirit of separating style and content. By that token it is fairly safe to say that there should never be an instance in which you leave an `alt` attribute empty.

## You’re using it, but not quite right…

The next best scenario is that you are using images correctly, for their correct purpose and are using `alt` attributes, but they don’t really do as much as they should. A lot of the time I come across images that have less than ideal `alt` attributes.

![A photograph of an abandoned car](https://csswizardry.com/wp-content/uploads/2010/01/car.jpg)

Image sourced via Google Images–original author unknown.

One example might be the above image of a car. This, while technically correct, is not ideal: `<img src="/img/car.jpg" alt="Car" />`. All this tells the user is ‘Car’. It doesn’t say whether it’s a picture with the word car in it, or whether it’s a picture of a car. A much better `alt` attribute would be `alt="A photograph of an abandoned car"` (as used in my code).

### Other poor uses

Another real-world example of poor `alt` attribute usage is actually on [CNN’s website](http://www.cnn.com/). On their home page today (26 January, 2010) they have a series of headlines with accompanying images. The code for such a pairing looks like this:

```
<code><img height="68" border="0" width="120" alt="Haiti's swanky club ->
now home to misery" src="http://i.cdn.turner.com/cnn/2010/WORLD/ ->
americas/01/26/haiti.camp/tzvids.haiti.aid.cnn.jpg"> ->
… Haiti's swanky club now home to misery</code>
```

This is wrong on two counts:

1.  A screenreader will read out to the user Haiti’s swanky club now home to misery … Haiti’s swanky club now home to misery. Every image/headline pairing on the page is laid out like this, meaning in every instance a user using a screenreader will hear the headline twice. This will surely soon get annoying.
    
2.  Secondly, the image was actually of earthquake survivors holding a large bag, nothing to do with clubs and, unfortunately, far from swanky.
    

## Using the attribute properly

On the [BBC’s home page](http://www.bbc.co.uk/) however (on the same date) they are using `alt` attributes perfectly. They have an image of a woman wearing a veil, alongside the article’s headline France report back face veil ban. The image’s `alt` attribute: `alt="A woman wears a full-length veil in Lyon, 25 January"`.

## The biggest no-no of all

One thing which consistently winds me up is the ridiculously bad practice of stuffing `alt` attributes with keywords. `alt` attributes are an accessibility feature, end of. They are _not_ a way of slipping in keywords out of sight, and any attempt to do so is irresponsible and incredibly bad practice. The only time ‘keywords’ may be validly placed in `alt` attributes is if it’s explicitly related to the image; for example: `<img src="/img/product.jpg" alt="A photograph of Mike's Carpets' ProClean™ carpet cleaner" />`.

## How to do it properly

Writing proper `alt` text is incredibly simple, yet a little more time consuming than the ‘Car’ cop-out. All you need to do is write out in full exactly what the image shows. If it’s an elephant giving a donkey a piggy-back don’t be lazy and use `alt="Elephant and a donkey"`. Instead, write out `alt="A photograph of an African elephant giving a donkey a piggy back across a swamp"`.

Also, for any pages that use similar images repeatedly but are slightly different to one another, make sure your alt attributes reflect these differences. A good example would be my portfolio page. Instead of using `alt="Screenshot"` over and over again I used text like `alt="Screenshot of RAAMaudio UK Ltd."` etc.

This is one of the most basic aspects of web development, but one that too many people are still getting wrong.

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