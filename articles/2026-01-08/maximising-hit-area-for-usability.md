---
title: "Maximising hit-area for usability"
source: "https://csswizardry.com/2011/01/maximising-hit-area-for-usability/"
publishedDate: "2011-01-13"
category: "css"
feedName: "CSS Wizardry"
---

12 January, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [A better example](#a-better-example)
    1.  [](#demo)[Demo](https://csswizardry.com/demos/maximising-hit-area/)

This post is brought to you by Captain Obvious of _The Society of Explaining the Self-Explanatory_: increasing the hit area of an object makes it easier to click… Please, don’t let that put you off, there’s more to this article than that; I _promise_.

So yeah, this is old news. People have, for years, been making the target area for links as big as possible to make them easier for users to click. Hell there’s even [a law based on this knowledge](http://particletree.com/features/visualizing-fittss-law/), but today I’m only going to share a nifty little trick whereby you don’t just make the hit area bigger, but make it _bigger than it appears_.

First off, head over to [http://suzannahaworth.com/](http://suzannahaworth.com/2010/12/crosby-beach/).

I use this technique on the ‘Tweet this’ link at the end of each article. Now **before** you scroll down and hover that link, notice that we have something that is probably built like this:

```
<code><element>
  If you liked this article, <link>please Tweet it</link>.
</element></code>
```

Or so you’d think… What we actually have is this:

```
<code><link>
  If you liked this article, <element>please Tweet it</element>.
</link></code>
```

Can you see where this is heading? Good!

The actual code is this:

```
<code><p id="tweet-this">
  <a href="http://twitter.com/share?text=I&amp;rsquo;m+reading+&amp;lsquo;Crosby Beach&amp;rsquo;&amp;via=suzehaworth&amp;url=http://suzannahaworth.com/2010/12/crosby-beach/">
    If you liked this article, <strong>please Tweet it</strong>.
  </a>
</p></code>
```

So what we do here is have the whole content of that paragraph as a link–everything is clickable. Then we remove all the styles from that link so that it looks like it’s _not_ a link at all. Anything we set to appear at `a{ ... }` we effectively remove so that it simply looks like ordinary text. The **(abridged)** CSS for `a{ ... }` and the undoing of this is:

```
<code><span class="code-comment">/* Define generic link styles here */</span>
a{
  font-family:Calibri, Arial, Verdana, sans-serif;
  font-weight:bold;
  color:#347832;
  text-decoration:none;
}
a:hover,a:active,a:focus{
  text-decoration:underline;
}
a:active,a:focus{
  position:relative;
  top:1px;
}

#tweet-this a{
  display:block;
  padding:20px;
  <span class="code-comment">/* Here we undo certain styles applied above */</span>
  font-family:Cambria, Georgia, "Times New Roman", Times, serif;
  font-weight:normal;
  color:#555;
}
#tweet-this a:hover{
  <span class="code-comment">/* Undo the hover state of the link */</span>
  text-decoration:none;
}
#tweet-this strong{
  <span class="code-comment">/* Make this strong look just like the a */</span>
  font-family:Calibri, Arial, Verdana, sans-serif;
  font-weight:bold;
  color:#347832;
}
#tweet-this a:hover strong{
  <span class="code-comment">/* Make this strong look just like the a on hover */</span>
  text-decoration:underline;
}</code>
```

So here we’re maintaining our specific call to action of ‘please Tweet it’ by styling that as though it’s a link, but in actual fact our link is far bigger. The user sees the specific call-to-action, goes to click it, only to find that it is in fact far larger than it appears, thus easier to click.

Now in this example it would do no harm to just have the whole lot look like a link. We don’t really _need_ to spoof calls-to-actions and hit-areas here but it’s quite a nice feature.

* * *

## A better example

A better example I unfortunately can’t share just yet as it appears on a site I built that hasn’t gone live. What I can do however is replicate it for you…

The PSD I was handed contained a section where the text was For a detailed quote for your project, please contact us » and its obvious choice of markup was:

```
<code><p>For a detailed quote for your project, please <a>contact us</a></p></code>
```

That was until I remembered the technique I’d used on Suze’s site. I could keep the ‘contact us’ call-to-action, but also make it a lot easier for the user to click by using a full-size hit-area.

### [Demo](https://csswizardry.com/demos/maximising-hit-area/)

I’ve made [a (very crude) replica](https://csswizardry.com/demos/maximising-hit-area/) of that for you which you can pick through the source a little more freely.

So there it is, creating larger hit-areas on very specific calls to action.

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