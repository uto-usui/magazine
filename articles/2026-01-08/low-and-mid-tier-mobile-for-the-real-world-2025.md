---
title: "Low- and Mid-Tier Mobile for the Real World (2025)"
source: "https://csswizardry.com/2025/08/low-and-mid-tier-mobile-for-the-real-world-2025/"
publishedDate: "2025-08-18"
category: "css"
feedName: "CSS Wizardry"
---

18 August, 2025 (last updated on 20 August, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [PageSpeed Insights and the Moto G Series](#pagespeed-insights-and-the-moto-g-series)
2.  [Low- and Mid-Tier Mobile in DevTools](#low--and-mid-tier-mobile-in-devtools)
3.  [Real Low- and Mid-Tier Mobile Devices](#real-low--and-mid-tier-mobile-devices)
    1.  [Why the Samsung Galaxy A15 and A54?](#why-the-samsung-galaxy-a15-and-a54)
4.  [Real Low-Tier Mobile for 2025: Samsung Galaxy A15 5G](#real-low-tier-mobile-for-2025-samsung-galaxy-a15-5g)
    1.  [Good Low-Tier Alternatives](#good-low-tier-alternatives)
5.  [Real Mid-Tier Mobile for 2025: Samsung Galaxy A54 5G](#real-mid-tier-mobile-for-2025-samsung-galaxy-a54-5g)
    1.  [Good mid-tier alternatives](#good-mid-tier-alternatives)
6.  [WebPageTest Equivalents](#webpagetest-equivalents)
7.  [Closing Thoughts](#closing-thoughts)

For the casual performance enthusiast, dedicated device testing is likely to be overkill. However, anyone [working full time on site-speed](https://csswizardry.com/services/) will probably benefit from having at least one real device to hand.

I’m working on [a project](https://csswizardry.com/case-studies/) at the moment where mobile INP is our key focus, and while [Chrome Desktop’s DevTools](https://csswizardry.gumroad.com/l/perfect-devtools) has been a great starting point, replicating real-world mobile interactions and performance has been a consistent challenge.

I decided to deep dive and look at what would constitute a real low- and mid-tier mobile device in 2025, and how that maps to the Chrome DevTools presets.

When assessing, I wanted to factor in a sensible mix of:

-   **Distribution and market penetration:**
    -   how likely is it that folk actually have one of these devices?
-   **Device and hardware capabilities:**
    -   arguably the most important part of the research.
-   **Support and longevity:**
    -   how long are these devices likely to be around?
-   **Price-point:**
    -   are they sensible and reasonable prices for consumers?

And remember, as we’ll look at next, trying to triangulate on one single device per category is a little futile in itself—sheer device diversity and evolution means that _anything_ we pick is going to be something of a compromise. My aim, however, is to minimise that compromise as much as possible and distill our choices down to a single representative device for each category. Can I do it?

## PageSpeed Insights and the Moto G Series

For the longest time, the Chrome team touted the Motorola _Moto G4_ as the global baseline device. As a result, I bought a physical Moto G4 and used that for my real-device testing, inspecting and tracing Chrome remotely. However, seeing as the G4 was released over nine years ago and is currently locked to Android 7.0, that soon stopped being entirely representative.

If you’d like to learn more about testing with real devices, either Android or iOS, then [arrange a Masterclass](https://csswizardry.com/masterclasses/).

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/08/moto-g4.jpg)

My old Moto G4 is locked to Android 7 and can no longer be updated.

In [Lighthouse 10](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.0.0), the team switched to an emulated _Moto G Power_ (though this was more of a viewport and DPR change than hardware capabilities).

The key word is here _emulated_: there is no real device and all of the network and CPU throttling is simulated, so actually listing any device at all, to me at least, seems a little disingenuous. There is no Moto anything, so they’d be better off saying ‘low-end mobile’, or words to that effect.

## Low- and Mid-Tier Mobile in DevTools

In [Chrome’s DevTools](https://developer.chrome.com/docs/devtools/device-mode#throttle), that’s exactly what they do! _Low-tier mobile_ defaults to a 6× CPU slowdown and a 3G-like connection. _Mid-tier mobile_ is a 4× CPU slowdown and a Slow 4G-like network. If you take the time to calibrate these presets yourself, you’ll get something a little more bespoke. For me, on my development machine, a mid-tier CPU is 2.9× slower than my machine’s true capabilities and low-tier mobile is a staggering 9.1× slower. That’s quite a departure from the off-the-shelf 4× and 6×!

## Real Low- and Mid-Tier Mobile Devices

It’s important to remember that **‘low-tier’ does not mean old**. Likewise, **‘mid-tier’ does not mean ‘a flagship from 2018’**. They are a device class in their own right and it’s perfectly possible for your users to be using brand new low-tier devices. As such, we needn’t look to the past for our benchmarks.

With that in mind, let’s go find ourselves some real low- and mid-tier devices that we can use for real-world testing in 2025.

TL;DR: If you want broadly representative Android hardware for real-world web performance testing in 2025, buy a [**Samsung Galaxy A15 5G (SM-A156x)**](https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub/) (low-tier) and a [**Samsung Galaxy A54 5G (SM-A546x)**](https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a54-5g-green-256gb-sm-a546blgdeub/) (mid-tier). Both are mass-market, widely ranged across regions, have multi-year software support, and map well to Chrome DevTools’ _Low-_ and _Mid-tier_ presets.

### Why the Samsung Galaxy A15 and A54?

-   **Distribution and market penetration:**
    -   Samsung leads global shipments and the _A_ series is the backbone of that share. These models are sold/carrier-ranged across Europe and North America, so you’re testing on what people actually use. [1](#fn:1) [2](#fn:2) [3](#fn:3) [4](#fn:4) [5](#fn:5)
-   **Device and hardware capabilities:**
    -   Both are self-style low- and mid-range devices with hardware characteristics to match. [6](#fn:9) [7](#fn:10) [8](#fn:11) [9](#fn:12)
-   **Support and longevity:**
    -   Both lines ship with four generations of Android OS updates and five years of security patches, so they’ll have a decent shelf life. [10](#fn:6) [11](#fn:7) [12](#fn:8)
-   **Price-point:** Typically $199 for the A15 5G, well under the A54’s original $450 RRP. [13](#fn:13) [11](#fn:7)

Based on these factors alone, many devices might make the grade, so let’s look in a little more detail.

## Real Low-Tier Mobile for 2025: Samsung Galaxy A15 5G

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/08/a15.avif)

Image credit: samsung.com

The A15 is one of the cheapest mainstream 5G handsets Samsung markets worldwide: you’ll find it in Latin America, Africa, Europe, South Asia, and North America. That ubiquity is quite rare; most lower-end Androids tend to be regional brands (Infinix, Tecno, Lava, etc.).

The A15 also reflects what a budget-conscious, mainstream consumer gets in 2024/25: limited CPU/GPU headroom, middling storage I/O, and memory constraints. Perfect for showing how web performance characteristics change when you head toward the floor of mass-market devices.

-   **Release date:** December 2023
-   **Cost at release:** $199
-   **Chipset:** [MediaTek Dimensity 6100+](https://www.mediatek.com/products/smartphones/mediatek-dimensity-6100plus)
    -   MediaTek say themselves that the Dimensity 6100+ chip is a highly capable 5G SoC for mainstream and entry-5G smartphones…. [8](#fn:11) [9](#fn:12)
-   **Memory/Storage:** 4–8 GB LPDDR4X, UFS 2.2.
    -   Universal Flash Storage 2.2 is a almost exclusively found in low- to mid-tier devices. [9](#fn:12)
-   **Screen:** 6.5″ FHD+ 90Hz AMOLED.
    -   Lots of pixels, but the 90Hz panel won’t hide any jank if you don’t meet your frame budget.
-   **Support window:** four generations of OS updates and five years of security updates. [12](#fn:8)
-   **Why it’s representative:** It’s cheap, everywhere, and carrier-marketed in the US (T-Mobile, AT&T, Verizon), while being widely retailed across the UK/EU. That combination gives huge base coverage. [3](#fn:3) [4](#fn:4) [5](#fn:5) [13](#fn:13)

### Good Low-Tier Alternatives

-   **Xiaomi Redmi 13C 5G:**
    -   Dimensity 6100+ chipset
    -   6.74″ 90Hz screen
    -   Aggressively priced and widely sold in Europe.
-   **Moto G34 5G:**
    -   Snapdragon 695 chipset
    -   UK/EU ranging and very low retail price
    -   Good for testing entry level but newer hardware. [14](#fn:14) [15](#fn:15)

## Real Mid-Tier Mobile for 2025: Samsung Galaxy A54 5G

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/08/a56.jpg)

Image credit: samsung.com

While not even ‘flagship-lite’—its Exynos 1380 chip and GPU are properly mid-market—the A54 is one of [the world’s top-selling mid-tier Androids](https://www.forbes.com/sites/johnkoetsier/2023/08/29/top-10-selling-smartphones-all-from-2-companies-apple-and-samsung/), and it has staying power in both carrier contracts and SIM-free contexts.

Further, Samsung sells essentially the same A54 device everywhere, which makes test data reproducible between Europe, India, Southeast Asia, Latin America, and even the US. Many competitors (e.g. Xiaomi, OPPO, realme) tend to fragment their mid-tiers by market.

Finally, both the A15, and A54 get Samsung’s long software support, meaning they will likely still be in market for several years.

I actually went out and bought myself an A54 5G after conducting this research!

-   **Release date:** March 2023
-   **Cost at release:** $450 US
-   **Chipset:** [Exynos 1380](https://semiconductor.samsung.com/processor/mobile-processor/exynos-1380/)
    -   Samsung’s own chip is decidedly mid-range [7](#fn:10) [6](#fn:9)
-   **Memory/Storage:** 6–8 GB, UFS 2.2
    -   More RAM than the A15
    -   Still much slower storage—think HTTP cache reads
-   **Screen:** 6.4″ 120Hz AMOLED
    -   Slightly smaller screen but faster refresh rate than the A15
-   **Support window:** four generations of OS updates and five years of security updates. [11](#fn:7)
-   **Why it’s representative:** The A5_x_ line is the volume mid-range many Europeans actually buy. If your site flies here, you’re golden on most mid-tier Androids.

### Good mid-tier alternatives

-   **Galaxy A55 5G:**
    -   Successor with Exynos 1480 chipset
    -   Four generations of OS update and five years of security updates
    -   Very similar to A54 [16](#fn:16)
-   **Redmi Note 13:**
    -   Europe-wide launch
    -   Note 13 5G/Pro 5G are common mid-range alternatives to Samsung in Spain/CEE
    -   Useful to cross-check different SoC/storage stacks [17](#fn:17) [18](#fn:18) [19](#fn:19)

## WebPageTest Equivalents

If you’d like to replicate these devices in [WebPageTest](https://www.webpagetest.org/), you’ll need to pick from their (slightly dated) device emulation list. While there aren’t any one-to-one matches for current hardware, there are some pretty close proxies. I’d recommend:

-   **Galaxy A15 5G → Pixel 3A**
    -   Modest CPU, 4 GB RAM, mid-2019 mid-tier silicon.
    -   This is almost bang-on for what a budget A-series feels like today.
-   **Galaxy A54 5G → Pixel 5**
    -   Former ‘premium midrange’ Android.
    -   Slightly older, but architecturally very close to the Exynos 1380.
    -   Perfect stand-in for a global mid-tier.

It’s worth stressing that these aren’t perfect matches (they never will be), but they’re close enough to give you realistic lab results when you can’t test directly on a physical device.

## Closing Thoughts

The web is used on billions of people, but not all devices are created equal. If we’re serious about building a fast, accessible web, we need to calibrate our benchmarks against hardware that people actually own and not just the flagships we keep in our pockets and the presets that DevTools hands over.

Having just _one_ real device in your arsenal is a great place to start, and in 2025, that’s the Samsung Galaxy A15 5G for low-tier, and the Galaxy A54 5G for mid-tier testing.

* * *

1.  [Canalys Q2 2025](https://www.canalys.com/newsroom/global-smartphone-market-q2-2025): Samsung #1 with 19%, lead underpinned by Galaxy A series [↩](#fnref:1)
    
2.  [Canalys Europe (2024)](https://www.canalys.com/newsroom/europe-smartphone-market-q4-2024): Europe returned to growth; Samsung remained #1 with 46.4M shipments [↩](#fnref:2)
    
3.  [T-Mobile US page for Galaxy A15 5G](https://www.t-mobile.com/cell-phone/samsung-galaxy-a15-5g) [↩](#fnref:3) [↩2](#fnref:3:1)
    
4.  [AT&T prepaid page for Galaxy A15 5G](https://www.att.com/buy/prepaid-phones/samsung-galaxy-a15-5g-prepaid.html) [↩](#fnref:4) [↩2](#fnref:4:1)
    
5.  [Verizon prepaid page for Galaxy A15 5G](https://www.verizon.com/smartphones/samsung-galaxy-a15-5g-prepaid/) (US only) [↩](#fnref:5) [↩2](#fnref:5:1)
    
6.  [Notebookcheck review of Galaxy A54 5G](https://www.notebookcheck.net/Samsung-Galaxy-A54-5G-review-A-powerful-mid-range-smartphone-with-many-upgrades.710600.0.html) [↩](#fnref:9) [↩2](#fnref:9:1)
    
7.  [Wikipedia: Samsung Galaxy A54 5G, SoC (Exynos 1380), release, and core specs](https://en.wikipedia.org/wiki/Samsung_Galaxy_A54_5G) [↩](#fnref:10) [↩2](#fnref:10:1)
    
8.  [Notebookcheck: Galaxy A15 5G review.](https://www.notebookcheck.net/Samsung-Galaxy-A15-5G-smartphone-review-Important-updates-for-the-affordable-phone.819065.0.html) Dimensity 6100+ class and pricing [↩](#fnref:11) [↩2](#fnref:11:1)
    
9.  [Wikipedia: Galaxy A15 5G SoC, memory, storage, OS support summary](https://en.wikipedia.org/wiki/Samsung_Galaxy_A15) [↩](#fnref:12) [↩2](#fnref:12:1) [↩3](#fnref:12:2)
    
10.  [Samsung: ‘Four generations of OS upgrades’ and ‘five years of security updates’ for select Galaxy devices](https://news.samsung.com/global/samsung-sets-the-new-standard-with-four-generations-of-os-upgrades-to-ensure-the-most-up-to-date-and-more-secure-galaxy-experience) [↩](#fnref:6)
     
11.  [Samsung Newsroom UK launch of A54/A34](https://news.samsung.com/uk/the-samsung-galaxy-a54-5g-and-galaxy-a34-5g-awesome-experiences-for-all): five years of security updates; four generations of OS updates. £449 UK RRP for A54. [↩](#fnref:7) [↩2](#fnref:7:1) [↩3](#fnref:7:2)
     
12.  [Samsung product page confirms A15 5G is also offered with five years of security updates and four generations of OS updates](https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub/) [↩](#fnref:8) [↩2](#fnref:8:1)
     
13.  [TechAdvisor: UK launch pricing: A15 5G £199 (A15 4G £169)](https://www.techadvisor.com/article/2176227/samsung-galaxy-a15.html) [↩](#fnref:13) [↩2](#fnref:13:1)
     
14.  [TechRadar: Moto G34 5G UK sale & £149.99 pricing](https://www.techradar.com/phones/moto-g34-review) [↩](#fnref:14)
     
15.  [Vodafone UK press release: Moto G34 5G](https://www.vodafone.co.uk/newscentre/press-release/the-motorola-moto-g34-5g-is-now-available-on-vodafone-evo/) [↩](#fnref:15)
     
16.  [Samsung newsroom](https://news.samsung.com/global/samsung-galaxy-a55-5g-and-galaxy-a35-5g-awesome-innovations-and-security-engineered-for-everyone): A55 5G continues five years of security updates and four generations of OS updates policy; Exynos 1480 and EU retail presence [↩](#fnref:16)
     
17.  [Xiaomi global launch of Redmi Note 13 series](https://www.androidauthority.com/redmi-note-13-series-global-launch-3403087/) [↩](#fnref:17)
     
18.  [Xiaomi official specs for Redmi Note 13 5G](https://www.mi.com/global/product/redmi-note-13-5g/specs/) [↩](#fnref:18)
     
19.  [StatCounter vendor share Spain](https://gs.statcounter.com/vendor-market-share/mobile/spain): Samsung & Xiaomi dominate—useful proxy for EU mid-range tastes [↩](#fnref:19)
     

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