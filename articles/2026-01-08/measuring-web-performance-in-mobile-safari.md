---
title: "Measuring Web Performance in Mobile Safari"
source: "https://csswizardry.com/2021/02/measuring-network-performance-in-mobile-safari/"
publishedDate: "2021-02-26"
category: "css"
feedName: "CSS Wizardry"
---

26 February, 2021

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Why iOS Gets Overlooked](#why-ios-gets-overlooked)
2.  [Why This Is a Problem](#why-this-is-a-problem)
    1.  [Why This Isn’t a Huge Problem](#why-this-isnt-a-huge-problem)
3.  [But, Can’t I Just Emulate?](#but-cant-i-just-emulate)
4.  [You Will Need…](#you-will-need)
5.  [Testing with WebPageTest](#testing-with-webpagetest)
6.  [Testing in Safari’s DevTools](#testing-in-safaris-devtools)
    1.  [Set Your iPhone up as a Development Device](#set-your-iphone-up-as-a-development-device)
    2.  [Enable Web Inspector](#enable-web-inspector)
    3.  [Inspect Your Phone From Your Mac](#inspect-your-phone-from-your-mac)
7.  [Why Bother?](#why-bother)

**N.B.** This article is no longer accurate, and changes in both iOS/MacOS and WebPageTest are no longer properly reflected. Let me update this article when I get chance. In the meantime, the particularly determined among you can probably fill the gaps yourselves—good luck!

So far this year, all but one of my clients have been concerned about [Google’s upcoming Web Vitals update](https://developers.google.com/search/blog/2020/11/timing-for-page-experience). The client who’s bucking the trend is great, not least because it’s given me something a little different to focus on—they’re more interested in how their site fares on iOS. What makes this particularly fun for me is that iOS Safari is a completely different ballgame to Chrome, and not something many people tend to focus on. So, I’m going to share with you a handful of tips to make it a little easier should you need to do the same—and you should do the same.

## Why iOS Gets Overlooked

Google has a pretty tight grip on the tech industry: it makes by far the most popular browser with the best DevTools, and the most popular search engine, which means that web developers spend most of their time in Chrome, most of their visitors are in Chrome, and a lot of their search traffic will be coming from Google. Everything is very Google centric.

This, of course, is exacerbated by the new Vitals announcement, whereby data from the _Chrome_ User eXperience Report will be used to aid and influence rankings.

In short, it’s easy to see why Safari gets left out in the cold.

## Why This Is a Problem

The moment you don’t consider Safari, you’re turning your back on all of your iOS traffic. All of it. Every browser available on iOS is simply a wrapper around Safari. Chrome for iOS? It’s Safari with your Chrome bookmarks. Every bit of iOS traffic is Safari traffic.

In short, it’s difficult to see why Safari gets left out in the cold.

This isn’t Google’s fault, and I’ve long wished that Apple would let other browsers on their platform, but that doesn’t seem likely to happen any time soon. So, we’re stuck only with Safari. That we probably aren’t testing.

### Why This Isn’t a Huge Problem

It’s worth noting that, by and large, the same page will perform better in iOS Safari than it would on Android Chrome—[iPhones are generally far more powerful](https://browser.geekbench.com/mobile-benchmarks) than their Android counterparts. Further, and by chance, [iOS usage](https://gs.statcounter.com/vendor-market-share/mobile/worldwide) is strongly correlated with [regions we generally find to have better infrastructure](https://www.webworldwide.io/). This means that iOS devices tend to be faster and are found in ‘faster regions’.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/ios-android-loading-comparison.gif)

Same page, same connection speed, same locale, same release year, different devices.

## But, Can’t I Just Emulate?

No.

## You Will Need…

For better or worse, I’m an iPhone and Mac user, so I’m pretty well set up out of the gate. If you don’t have an iPhone, well, you’ll struggle to test an iPhone. But the additional need for a Mac will be a barrier to entry for many I’m afraid.

But! Fear not! It’s not the end of the line for non-Mac users. Read on.

## Testing with WebPageTest

[WebPageTest](https://webpagetest.org/) is easily, by far, without a shadow of a doubt, the single most important tool when it comes to web performance. I could not do my job without it. I cannot overstate its importance. It’s vital.

So imagine how happy I am to report that it has first-class, genuine iOS device support!

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/wpt-ios-devices.png)

Real iOS devices—unreal!

This will give you [a fantastically detailed waterfall](https://www.webpagetest.org/result/210225_DiPE_eaab5afc3f7f8bcd6ab043a72a315984/3/details/#waterfall_view_step1)—among plenty more—that you can go back and refer to time and again.

However, there are two key caveats:

1.  **The devices are in the US** which doesn’t help if your typical customer is based in, say, the Balkans.
2.  **The data is static** which isn’t necessarily a drawback until it is—DevTools allows us to work far more quickly and interactively, responding to changes and tweaks as we make them.

Still, this is an amazing starting point for anyone wanting to begin profiling web performance on iOS. In fact, this is something that WebPageTest has improved upon and [written about](https://www.catchpoint.com/blog/m1-mac-mini-mobile-device-testing) only a month prior to this article you’re reading right now.

## Testing in Safari’s DevTools

What we really want to do, alongside capturing good benchmark- and more permanent data with WebPageTest, is interact with and inspect a site slightly more realtime. Thankfully, if you have a Mac and an iPhone, this is remarkably straighforward!

### Set Your iPhone up as a Development Device

**N.B.** This step and its sub-step are optional, but highly recommended.

Plug your iPhone into your Mac and fire up Xcode. Once its opened, go to _Window_ » _Devices and Simulators_ and look for your device in the resulting window.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/xcode-devices.png)

Make sure that any option or alert that pertains to running your iPhone as a development device is enabled. Truthfully, I’ve never really had to do anything more in this view than unlock my phone and maybe restart it once or twice. As long as I see this much, I can guarantee the next step will work…

#### Network Link Conditioner

I honestly can’t even believe I’m telling you this… this is so cool. Now, in iOS’ _Settings_ app, you should find a new _Developer_ option.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/ios-developer-settings.png)

In there, you should find a tool called _Network Link Conditioner_. This provides us with very accurate network throttling via a number of handy presets, or you can configure your own. This means that, even if you’re connected to the office wifi, you can still simulate slower (and very realistic) connection speeds.

### Enable Web Inspector

Next, in Safari’s settings on iOS, head to _Advanced_ and enable _Web Inspector_. That’s it! You’re good to go.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/ios-safari-settings.png)

This will allow your desktop version of Safari to inspect the current tab of your iPhone’s Safari instance.

### Inspect Your Phone From Your Mac

Now open Safari. I know, you haven’t opened it in a while, so hit ⌘⎵ and type _Safari_. Head to _Develop_ and look out for your device in the dropdown menu.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/safari-01.png)

…and that’s it. That’s really it. You’re now inspecting your phone from Safari’s desktop DevTools:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/inspecting-safari-01.png)

As long as your phone stays unlocked and with the webpage in question active, you can inspect the iOS device as you would desktop. Neat!

Of course, the whole point of this article is performance profiling, so let’s move over to the _Network_ tab. If you’re used to Chrome’s _Network_ tab then, well, I’m sorry.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/inspecting-safari-02.png)

Regrettably, this far into the article and its screenshots, I learned that there is no longer a way to disable ServiceWorkers in Safari. This means none of the data in the screenshots is particularly interesting, but thankfully we aren’t here to profile my site.

Here is how my actual iPhone on a throttled connection deals with my website. There are some truly fascinating differences between how Chrome and Safari work, visible even on a scale as small as this. It really helps drive home the importance of testing each platform in its own right, and explains why you can’t simply emulate an iPhone in Chrome’s DevTools.

But! That said. Chrome’s DevTools are far, far better than Safari’s, so we might as well use that to our advantage, right?

Export the HAR (Http ARchive) file from Safari’s _Network_ panel and save it on your desktop where it will remain until you buy a new machine somewhere sensible. Next, open Chrome and its own _Network_ DevTools panel. Import the HAR file here.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2021/02/inspecting-chrome-01.png)

Viewing Safari’s Network data in Chrome’s superior DevTools.

This is key: Safari captures less data than Chrome, which is a problem. Simply opening this file in Chrome’s DevTools doesn’t make the data itself better, but it does allow us to interrogate it far better. It’s basically just a far nicer workflow onto the data provided by Safari.

If you want to know more about how best to use DevTools for performance testing, I’m running a workshop with Smashing Magazine real soon, and that will make you DevTools experts. You can still [grab tickets](https://smashingconf.com/online-workshops/workshops/harry-roberts).

## Why Bother?

With iOS generally being faster, and Vitals being entirely Chrome centric, and most emerging economies being Android-led, it might seem redundant to test performance at all on iOS. In fact, it’s a relatively safe assumption that if you’re fast on, say, a Moto G4, you’ll be blazing fast on an iPhone. But still, given the sheer prevalence of iOS, it’s wise to be aware of what might currently be a total blind-spot.

While it’s unlikely to become your default process, it’s important to know how to do it. And now you do.

Still worried about Vitals? [Drop me a line!](https://csswizardry.com/contact/) There’s still a little while before the May update.

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