---
title: "Measuring the Hard-to-Measure"
source: "https://csswizardry.com/2018/03/measuring-the-hard-to-measure/"
publishedDate: "2018-03-01"
category: "css"
feedName: "CSS Wizardry"
---

1 March, 2018

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Beacons and Tracking Pixels](#beacons-and-tracking-pixels)
    1.  [Update 2018-03-01 12:53:00 UTC](#update-2018-03-01-125300-utc)
2.  [Print Stylesheets](#print-stylesheets)

Last night I gave a performance-oriented talk at the wonderful [DaFED](https://dafed.org/) event in Novi Sad, Serbia. In the talk, I go into detail about third parties, and how they can have tremendous negative impact on our performance. I also mention that, sometimes, it’s more important to think about resilience than speed. For example, what happens to us if a third party script fails to load? Can we recover from that? What happens if a third party has an outage? Do we suffer the effects of it?

This led to a great question from [Dragan](https://twitter.com/draganeror) along the lines of Nowadays, how important is it to test sites with JavaScript disabled? It’s certainly a thought-provoking question, but I won’t be going into my answer in this post. Instead, I want to talk about being able to measure just how many users do have JavaScript disabled. Most analytics software is powered by JavaScript, so detecting JavaScript becomes self-fulfillingly impossible. I want to share an incredibly quick tip to measure how many of your users turn up on a device with no JavaScript capabilities…

## Beacons and Tracking Pixels

I recently wrote an article about [finding dead CSS](https://csswizardry.com/2018/01/finding-dead-css/) by using a tracking pixel… we can use almost the exact same technique to detect non-JavaScript browsers:

```
<noscript>
  <img src="/pixels/no-js.gif" alt="" />
</noscript>
```

Now, any browsers that have JavaScript disabled will make a request for `no-js.gif`, and all we need to do is check our server logs after a few months and we’ll get a rough idea of just how many users arrive with JavaScript disabled. Based on this data, you can make much more informed decisions about your policy for non-JavaScript users.

I set up a local server to test this out. After disabling JavaScript and visiting the relevant test page, sure enough, `no-js.gif` began to appear in my logs:

![A screenshot
showing non-JavaScript browsers making HTTP requests for a specific tracking
pixel.](https://csswizardry.com/wp-content/uploads/2018/03/screenshot-no-js.png)

### Update 2018-03-01 12:53:00 UTC

[Ryan](https://twitter.com/RyanTownsend) makes a great point:

> Might be worth noting on your new article that you’ll want to set a far-future Cache-Control expiry header for the `no-js.gif` (or even use immutable) if you want to count the number of users without JS rather than counting the number of pageviews.

## Print Stylesheets

In recent discussions with the NHS, a client of mine, we wondering whether a print stylesheet would be appropriate. Most of the discussion centred around hypotheticals and maybes: I can imagine x user might want to print y information. These were sensible and educated guesses, but guesses nonetheless. Let’s gather some data:

```
@media print {

  html::after {
    content: url('/pixels/print.gif');
  }

}
```

Note that most printers will not print background-images and -colours by default, so we insert the image via `content` rather than, say, `background-image`.

Now, whenever someone wants to print our page, a request for `print.gif` will fire off and we can capture that information: we can make informed decisions about if and how to implement a print stylesheet, and how much effort we should put into it.

Once again, I built a quick demo to test it out. Expectedly, as soon as I hit ⌘+P, a request for `print.gif` fires off:

![A screenshot
showing how printing a page makes an HTTP request for a specific tracking
pixel.](https://csswizardry.com/wp-content/uploads/2018/03/screenshot-print.png)

While tracking pixels are far from a new idea, there are creative ways in which we can use them to collect data useful to developers. Once the data is gathered, we can begin to make much more informed decisions about how we work.

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