---
title: "When using IDs can be a pain in the class..."
source: "https://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/"
publishedDate: "2011-09-12"
category: "css"
feedName: "CSS Wizardry"
---

11 September, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Reusability](#reusability)
2.  [Wild card](#wild-card)
    1.  [Remove IDs completely?](#remove-ids-completely)
3.  [Final word](#final-word)

**N.B. Since authoring this article I have decided that a blanket ban is sensible. Save yourself many potential headaches and never use IDs in your CSS files.**

There have been a few articles flying about lately which tell you never to use IDs in CSS selectors. I always get a little concerned when articles like this command rather than advise, they often neglect to take into account context and necessity. I’m going to try and offer up one _decent_ reason here as to why IDs _might_ trip you up unnecessarily (and how you can avoid the pitfalls).

* * *

ID selectors are fine, valid and perfect for styling unique parts of pages. They’re HTML/CSS basics, you can use one ID per page and style the relevant element with `#the-id-you-chose`.

IDs, as well as being non-reusable, carry quite a high specificity, take the following:

```
<p id="intro" class="excerpt">Lorem</p>

#intro{ color:blue; }
.excerpt{ color:green }
p{ color:red; }
```

Even though we define `#intro` first–thus expecting it to be overwritten by subsequent matching selectors–it still takes precedence over any other rules. This is the IDs heightened specificity, and this is where you can come unstuck…

## Reusability

One argument against using IDs is that they can’t be reused, but to my mind this is a weak argument. The whole point of using an ID is that it’s unique; if you want to reuse something you’d use a class. Developers know this, developers aren’t stupid so to tell them not to use an ID because it’s not reusable is, in my opinion, quite patronising.

Also, some things just _can’t_ be reused. Some designs would be wholly impossible to have, say, two content areas in. You couldn’t reuse that even if you wanted to.

## Wild card

That is _wild card_ meaning a person or thing whose influence is unpredictable or whose qualities are uncertain and not to be confused with the CSS _wildcard_ selector (`*{}`).

One of the main and, in my opinion, most valid arguments against using IDs is that they can introduce specificity headaches where you want them least, and it can be a total nightmare fighting your way back out.

Using an ID in a selector instantly adds a specificity wild card (note, not wildcard), and you might not want this effect. It is, in a way, similar to `!important`; it is a trump card that will override nigh on all other types of selector. You probably don’t always want this.

The best way to illustrate this is with a specific example.

Let’s imagine you’re building a site and one of the requirements is to have a reusable Twitter widget that needs to be placable wherever the client chooses. Let’s for example say they want to kick things off with having the widget in the header and also in-page, at the bottom of an article. The Twitter widget’s styling must remain consistent.

So, let’s look at some [example code](http://jsfiddle.net/csswizardry/gTZGq/1/).

Here we can see that we have a small specificity problem, the `#header a` rule has a lot higher specificity than `.tweet a` and therefore the links in the widget adopt the header’s (unreadable) colour. Remember that the Twitter widget’s styling must always remain the same so this is not ideal whatsoever.

We can work around this by [adding a new selector to the `.tweet a` rule](http://jsfiddle.net/csswizardry/gTZGq/2/) Or, even worse, we could add an `!important` to the relevant declaration. Shudder…

Now, you don’t need me to tell you that this is far from a nice solution, as soon as that widget gets put in the `#footer` we may well have to add yet another selector, which will prove a maintainability nightmare. This is not a very future-proof fix.

This is where using IDs can be a pain for you, where a specificity trump is introduced.

A better fix: add a class instead of (or as well as) the ID on that header `div`, thus: [http://jsfiddle.net/csswizardry/gTZGq/3/](http://jsfiddle.net/csswizardry/gTZGq/3/)

That now brings the specificity gap way down to, well, zero. Removing the ID means that you now don’t have to fight yourself out of a self-induced specificity war.

I did mention that you can add a class as well as the ID or remove the ID completely. It depends…

### Remove IDs completely?

We’ve covered where IDs can trip us up and be but they serve a purpose other than style-hooks; they can be used as [fragment identifiers](https://csswizardry.com/2011/06/namespacing-fragment-identifiers/) for marking landmarks in the page.

I’m sure you’ve seen ‘Skip to navigation’ or ‘Jump to content’ links in pages, and these wouldn’t work without our IDs so we need to keep those in as well as adding our new class.

So, as is the case with most development conundrums, it’s _all about context_. You know your context better than I, or anyone else does, so don’t let anyone else tell you what to do. If you want to keep an ID for completeness or for fragment identifiers then do, it’s totally your call.

## Final word

So yeah, IDs aren’t evil, they’re perfectly valid and a blanket ban on them is stupid. Use your own knowledge and context of the project to use the most suitable and sensible solution.

Don’t stop using IDs, just be aware of where they can cause you headaches and know where to sensibly circumvent them. Anyone telling you not to use them at all is not wrong, but they’re definitely not right…

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