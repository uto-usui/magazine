---
title: "The Fastest Site in the Tour de France"
source: "https://csswizardry.com/2025/07/the-fastest-site-in-the-tour-de-france/"
publishedDate: "2025-07-27"
category: "css"
feedName: "CSS Wizardry"
---

27 July, 2025

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [The Teams and Bikes of the 2025 Tour de France](#the-teams-and-bikes-of-the-2025-tour-de-france)
2.  [The Fastest Bike Sites in the 2025 Tour de France](#the-fastest-bike-sites-in-the-2025-tour-de-france)
3.  [Deeper Analysis](#deeper-analysis)
    1.  [🥇 Merida](#-merida)
    2.  [🥈 Factor](#-factor)
    3.  [🥉 Giant](#-giant)
    4.  [Trek](#trek)
    5.  [Orbea](#orbea)
    6.  [Ridley](#ridley)
4.  [Patterns and Insights](#patterns-and-insights)
5.  [The Fastest Team Sites in the 2025 Tour de France](#the-fastest-team-sites-in-the-2025-tour-de-france)
6.  [Appendix](#appendix)
    1.  [Credits and Inspiration](#credits-and-inspiration)
    2.  [Methodology](#methodology)
    3.  [WebPageTest URLs and Scripts](#webpagetest-urls-and-scripts)

**Which bike brand raced ahead in the browser as well as the bunch?**

Today, the 112th edition of the [Tour de France](https://www.letour.fr/en) came to a close. [Wout van Aert](https://en.wikipedia.org/wiki/Wout_van_Aert) won the final stage in Paris, and [Tadej Pogačar](https://en.wikipedia.org/wiki/Tadej_Poga%C4%8Dar), predictably, won the overall title, making it his fourth time taking the [_maillot jaune_](https://fr.wikipedia.org/wiki/Maillot_jaune).

I’m a huge cycling nerd, and the Tour de France is the pinnacle of the sport. Three weeks of racing—21 stages—covering 3,338.8 kilometers of terrain, it really is a marathon and not a sprint.

But that isn’t to say that speed isn’t important! Cycling is a sport obsessed with aerodynamics, weight savings, and marginal gains. Bike manufacturers obsess over every gram shaved or watt saved. Cycling is the perfect sport for the performance engineer because things can always be measured, and they can always be improved.

And while most of the success undoubtedly lies on the shoulders of the athletes, as a bike _manufacturer_, having the lightest or fastest bike puts you in a much stronger position on race day. And indeed, this leads to some fairly outlandish statements:

> Nothing is faster than the Tarmac SL8 \[…\] it’s more than the fastest Tarmac ever – it’s the world’s fastest race bike.  
> — [Specialized](https://www.specialized.com/gb/en/s-works-tarmac-sl8-shimano-dura-ace-di2/p/216953?color=349996-216953)

Or:

> Having a leading high-tech wind tunnel on-site, unique for a cycling brand, enables us to build the fastest bikes in the world.  
> — [Ridley](https://www.ridley-bikes.com/en_GB/news/article/83550)

Bold claims, but how do they stack up in the browser? For an industry utterly obsessed with speed, how does that translate to its online presence? Every individual in the peloton wants to be the fastest rider, and every bike manufacturer that sponsors them claims to have the fastest bike, but **who has the fastest website?**

I took a look at the sites of every bike manufacturer that has a presence in 2025’s Tour (all 21 of them) and ran the numbers. My question: **does a bike brand’s focus on web performance predict their performance on race day?**

The results are in…

## The Teams and Bikes of the 2025 Tour de France

In total, [23 teams](https://www.letour.fr/en/riders) are sponsored by 21 different bike brands. All teams that compete in the Tour de France are [WorldTeam](https://en.wikipedia.org/wiki/UCI_WorldTeam) status, except for selected [ProTeams](https://en.wikipedia.org/wiki/UCI_ProSeries) (marked below) who are invited to compete in a similar manner to _wild cards_ in tennis.

-   [Alpecin–Deceuninck](https://www.alpecin-deceuninck.com/)
    -   [Canyon](https://www.canyon.com/)
-   [Arkéa–B&B Hotels](https://www.arkea-bbhotels.com/en)
    -   [Bianchi](https://www.bianchi.com/)
-   [Bahrain Victorious](https://bahraincyclingteam.com/)
    -   [Merida](https://www.merida-bikes.com/)
-   [Cofidis](https://www.equipecofidis.com/)
    -   [LOOK](https://www.lookcycle.com/)
-   [Decathlon AG2R La Mondiale Team](https://decathlonag2rlamondialeteam.com/)
    -   [Van Rysel](https://www.vanryselcycling.com/)

See full list…

-   [EF Education–EasyPost](https://efprocycling.com/)
    -   [Cannondale](https://www.cannondale.com/)
-   [Groupama–FDJ](https://www.equipecycliste-groupama-fdj.fr/)
    -   [Wilier](https://www.wilier.com/)
-   [Ineos Grenadiers](https://www.ineosgrenadiers.com/)
    -   [Pinarello](https://pinarello.com/)
-   [Intermarché–Wanty](https://intermarche-wanty.eu/)
    -   [CUBE](https://www.cube.eu/)
-   [Israel–Premier Tech](https://israelpremiertech.com/) (ProTeam)
    -   [Factor](https://factorbikes.com/)
-   [Jayco–AlUla](https://greenedgecycling.com/)
    -   [Giant](https://www.giant-bicycles.com/)
-   [Lidl–Trek](https://racing.trekbikes.com/teams/lidl-trek)
    -   [Trek](https://www.trekbikes.com/)
-   [Lotto](https://www.lottocyclingteam.be/) (ProTeam)
    -   [Orbea](https://www.orbea.com/)
-   [Movistar Team](https://movistarteam.com/)
    -   [Canyon](https://www.canyon.com/)
-   [Red Bull–BORA–hansgrohe](https://www.redbullborahansgrohe.com/)
    -   [Specialized](https://www.specialized.com/)
-   [Soudal Quick-Step](https://www.soudal-quickstepteam.com/)
    -   [Specialized](https://www.specialized.com/)
-   [Team Picnic PostNL](https://www.teampicnicpostnl.com/)
    -   [Lapierre](https://www.lapierrebikes.com/)
-   [Team TotalEnergies](https://teamtotalenergies.com/) (ProTeam)
    -   [Enve](https://enve.com/)
-   [Team Visma | Lease a Bike](https://www.teamvismaleaseabike.com/)
    -   [Cervélo](https://www.cervelo.com/)
-   [Tudor Pro Cycling Team](https://www.tudorprocycling.com/) (ProTeam)
    -   [BMC](https://bmc-switzerland.com/)
-   [UAE Team Emirates–XRG](https://www.uaeteamemirates.com/)
    -   [Colnago](https://www.colnago.com/)
-   [Uno–X Mobility](https://www.unoxteam.com/) (ProTeam)
    -   [Ridley](https://www.ridley-bikes.com/)
-   [XDS Astana Team](https://xds-astana.com/)
    -   [XDS](https://xds.co/)

What I want to work out is, of those teams, which of their bike manufacturers put as much effort into web performance as they do race-day performance?

## The Fastest Bike Sites in the 2025 Tour de France

To rank the bike brands, I used my own proprietary [CrRRUX score](https://csswizardry.com/2024/11/designing-and-evolving-a-new-performance-score/) (higher is better). CrRRUX is specifically designed to compare the [Core Web Vitals](https://web.dev/articles/vitals) data of a finite cohort of origins, placing them proportionally on a 0–1 scale. Given just how close a lot of the sites seem to land, I had to push CrRRUX to four decimal places.

Core Web Vitals, for folk who haven’t come across them before, are three web performance metrics that are designed to measure site-speed in a way that reflects how they actually _feel_. Human-centric signs of fast or slow:

-   **Largest Contentful Paint (LCP):** How fast did the page and its content load?
-   **Interaction to Next Paint (INP):** How quickly did the page respond to user input?
-   **Cumulative Layout Shift (CLS):** Did elements jump around the page as it was loading?

It is around these three metrics that this meta analysis is conducted.

The headline news is right here. According to their relative CrRRUX score, here are the bike brands from fastest to slowest:

Rank

Brand

Sponsors of…

CrRRUX Score

🥇

Merida

Bahrain Victorious

1.0000

🥈

Factor

Israel–Premier Tech (ProTeam)

0.9986

🥉

Giant

Jayco–AlUla

0.9985

4

LOOK

Cofidis

0.9967

5

Enve

Team TotalEnergies (ProTeam)

0.9963

6

Cervélo

Team Visma | Lease a Bike

0.9942

7

Van Rysel

Decathlon AG2R La Mondiale Team

0.9895

8

Canyon

Alpecin–Deceuninck, Movistar Team

0.9879

9

BMC

Tudor Pro Cycling Team (ProTeam)

0.9876

10

Pinarello

Ineos Grenadiers

0.9855

11

Lapierre

Team Picnic PostNL

0.7997

12

Cannondale

EF Education–EasyPost

0.7941

13

Specialized

Red Bull–BORA–hansgrohe, Soudal Quick-Step

0.7919

14

CUBE

Intermarché–Wanty

0.7878

15

Bianchi

Arkéa–B&B Hotels

0.7657

16

XDS

XDS Astana Team

0.7492

17

Colnago

UAE Team Emirates–XRG

0.6023

18

Wilier

Groupama–FDJ

0.5961

19

Trek

Lidl–Trek

0.4581

20

Orbea

Lotto (ProTeam)

0.2292

21

Ridley

Uno–X Mobility (ProTeam)

0.0000

Huge congratulations to our podium!

1.  **Merida**, sponsors of Bahrain Victorious
2.  **Factor**, sponsors of Israel–Premier Tech
3.  **Giant**, sponsors of Jayco AlUla

And the Core Web Vitals scores for each brand (at the time of writing):

Brand

LCP (ms)

INP (ms)

CLS

Merida

1,188

77

0.00

Factor

1,248

119

0.00

Giant

1,298

105

0.01

LOOK

1,486

112

0.00

Enve

1,552

85

0.01

Cervélo

1,552

137

0.01

Van Rysel

1,893

131

0.00

Canyon

1,394

145

0.06

BMC

2,069

83

0.00

Pinarello

1,415

83

0.09

Lapierre

2,215

144

0.13

Cannondale

2,704

121

0.07

Specialized

2,078

308

0.05

CUBE

2,179

110

0.19

Bianchi

3,381

109

0.01

XDS

3,651

135

0.01

Colnago

3,410

214

0.08

Wilier

3,150

266

0.10

Trek

2,869

210

0.15

Orbea

5,050

138

0.41

Ridley

4,694

1,121

0.61

When we look at the raw data with some colour coding, a fascinating pattern emerges: a lot of sites performed incredibly well. The fastest 10 pass all three Core Web Vitals. The general state of web performance in the cycling industry seems very healthy!

![Spreadsheet ranking 21 major bike brands by web performance metrics, with a focus on CrRRUX Score, a composite metric representing Core Web Vitals quality. The best-performing sites include Merida, Factor, Giant, Look, and Enve, all scoring near-perfect 1.0000 CrRRUX values. In contrast, Ridley and Orbea score lowest, with Ridley’s CrRRUX at 0.0000 and Orbea at 0.2292. The table includes LCP, INP, CLS, weighted and aggregate scores, highlighting significant variation in real-world user experience across brands’ official websites.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/tdf-bike-crrrux.png)

A visual comparison using [CrRRUX](https://csswizardry.com/2024/11/designing-and-evolving-a-new-performance-score/) highlights interesting insights.

A clear cliff appears between rows 12 (Lapierre) and 13 (Pinarello) when sites suddenly move from failing one or all of the Core Web Vitals to overwhelmingly passing all three. This is measured by the [_Ordinal_ score—around which CrRRUX is heavily weighted](https://csswizardry.com/2024/11/designing-and-evolving-a-new-performance-score/#naive-approach-1-ordinal-score)—and means any site that only passes, say, two Core Web Vitals cannot rank above any site that passes all three.

The fact we go from high-70s to high-90s in one leap isn’t something one typically observes in these kinds of comparison. There’s no deep or hidden meaning there—it’s just a very interesting thing to see.

## Deeper Analysis

I decided to look further into what made the top three stand out (and the bottom three come over the line with the [gruppetto](https://en.wikipedia.org/wiki/Autobus_\(cycling\))), so I did some individual analysis of this subset of six bike brands:

Rank

Brand

Sponsors of…

CrRRUX Score

🥇

Merida

Bahrain Victorious

1.0000

🥈

Factor

Israel–Premier Tech (ProTeam)

0.9986

🥉

Giant

Jayco–AlUla

0.9985

…

…

…

…

19

Trek

Lidl–Trek

0.4581

20

Orbea

Lotto (ProTeam)

0.2292

21

Ridley

Uno–X Mobility (ProTeam)

0.0000

I tested the homepage and the product page for the specific bike the teams are likely to use in a race. This is because the UCI mandates that all bikes used by race teams must either be already available for purchase by the general public, or must be available to them within 12 months of the race:

> Equipment shall be of a type that is sold for use by anyone practising cycling as a sport. Any equipment in development phase and not yet available for sale (prototype) must be subject of an authorization request to the UCI Equipment Unit before its use. Authorization will be granted only for equipment which is in the final stage of development and for which commercialization will take place no later than 12 months after first use in competition.  
> — _Article 1.3.006_

Crucially, that means any of the bikes raced and sites tested are subject to use by real people. **This isn’t a theoretical exercise.**

What follows is an incredibly high-level look at how each site performs and suggested areas for improvement. **Subscribers will get to see much more in-depth analysis.**

[Subscribe Now](https://csswizardry.gumroad.com/l/subscribe)

* * *

### 🥇 Merida

![Merida REACTO TEAM aero road bike with deep-section wheels and team Bahrain Victorious livery, displayed on a white product background with detailed geometry, specs, and download links—ideal for elite racers and enthusiasts.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/merida-pdp.jpg)

[Merida REACTO TEAM](https://www.merida-bikes.com/en/bike/4850/reacto-team)

Founded in 1972, Merida is a Taiwan-based design and manufacture operation. Interestingly, for the first 16 years of its life, Merida only produced bikes for other brands, and only launched its own line of cycles in 1988.

Fascinatingly, Merida is fast in spite of its site, not because of it. Some very quick-fire analysis…

#### General Findings with Merida

LCP (ms)

INP (ms)

CLS

1,188

77

0.00

Despite utilising Vue.js 2.1.10 in places, Merida’s site is a pretty traditional—dare I say _old school_—MPA. I can’t work out the exact stack too quickly, but it sticks to ‘classic’ CSS and JS, and age-old advice like styles at the top; scripts at the bottom. This reminds of the McMaster–Carr site that did the rounds a few years ago: websites _are_ fast until developers start messing around with them.

-   They host all of their [critical path resources on a third-party origin](https://csswizardry.com/2019/05/self-host-your-static-assets/)!
    -   This adds a lot of network overhead.
-   They don’t have a proper font stack in place (`font-family: 'Uni Sans';`) so they get a FOUT showing Times New Roman.
    -   No `font-display` rules either!
    -   Their fonts’ [origin could be `preconnect`ed](https://csswizardry.com/2023/12/correctly-configure-preconnections/).
-   Aggressive `cache-control: no-store, no-cache, must-revalidate` means `200`s on every request.
    -   They could drop it down to just [`no-store, private`](https://www.linkedin.com/posts/csswizardry_quick-caching-caveat-no-store-might-activity-7303763824388558848-oKEr/) if they really do want to forgo [HTTP caching](https://csswizardry.com/2019/03/cache-control-for-civilians/) on every single page view, or a more liberal `no-cache` coupled with either `Etag` or `Last-Modified` if they wanted to ensure freshness but also make use of cache after an immediate `304`.
-   They cache their static assets for six months but don’t attach revalidation headers.
    -   Based on `Age` headers (I saw one at `1990959` seconds!), these files don’t change very often at all.
-   Their URLs work both with and without a trailing `/` but they have no `rel=canonical`s set up.

#### Merida’s Homepage Highlights

-   **URL:** [merida-bikes.com/en](https://www.merida-bikes.com/en)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDcGY\_AFS](https://www.webpagetest.org/result/250804_ZiDcGY_AFS)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-merida-home.png)

Their LCP image is entry 34. Note the 250ms connection overhead added to the critical path at entry 2—we’d like to avoid this wherever possible.

Issues specific to the homepage:

-   Their LCP is a [`background-image`](https://csswizardry.com/2022/03/optimising-largest-contentful-paint/#background-image-url) which is never great without some additional help from `preload`.
-   Not only is the image late-discovered, it suffers a large _Element Render Delay_ while the main thread is busy with heavy Scripting and Rendering tasks.

#### Merida’s Product Details Page Insights

-   **URL:** [merida-bikes.com/en/bike/4850/reacto-team](https://www.merida-bikes.com/en/bike/4850/reacto-team)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDcZS\_AFT](https://www.webpagetest.org/result/250804_ZiDcZS_AFT)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-merida-pdp.png)

It might have a `.tif` extension, but their LCP image is actually a `image/jpeg` `content-type`.

And issues specific to their product details page:

-   Their LCP image comes in at a weighty 379.2KB! That’s pretty large.
    -   They don’t employ any form of responsive images, either. This means that even on the smallest screens we still fetch a 2,500px image.
-   Their LCP image is fetched with _Medium_ priority; we’d rather that be _High_.
    -   Although because it’s an `<img>`, it at least hits the network before their JS, unlike in the homepage.
-   Again, we see a large _Element Render Delay_ while we wait on the main thread.

#### Takeaways

Merida is a great example of simply not getting in the way of the browser. Sure, they have room for improvement, but even then they are still coming in at number one. By not throwing every npm package in the world at the site—by simply [betting on boring](https://csswizardry.com/2025/01/build-for-the-web-build-on-the-web-build-with-the-web/)—they’ve sustained class-leading performance. That’s more than can be said for most ‘modern’ stacks.

Chapeaux, Merida!

[Subscribe now](https://csswizardry.gumroad.com/l/subscribe) to see detailed analysis of Merida’s website.

* * *

### 🥈 Factor

![Close-up of the Factor OSTRO VAM road bike frame showcasing its aerodynamic design and iridescent branding. Displayed on a clean, minimal product page, ideal for performance-focused cyclists researching high-end race bikes.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/factor-pdp.jpg)

[Factor OSTRO VAM](https://factorbikes.com/bikes/ostro-vam)

Founded in 2007 in Norfolk, England, Factor Bikes began life as an offshoot of motorsport engineering firm bf1systems. The company’s early projects included high-performance prototypes before it launched its first commercial bike, the Factor ONE, in 2013.

#### General Findings with Factor

LCP (ms)

INP (ms)

CLS

1,248

119

0.00

Our second fastest site, Factor, is built on Shopify’s headless _Hydrogen_ storefront and deployed onto their _Oxygen_.

-   Factor is built as a _Single Page App_ with soft navigations.
-   I’ve never see `<head>` tags so tiny! Only nine items in the source HTML.
-   Unfortunately, they do have a number of assets on third-party origins. Persistently across the site, that is a stylesheet on the `unpkg.com` CDN.
    -   This is easily remedied by pulling the file onto first party infrastructure.
    -   I must have said this a million times by now, but please, [self-host your static assets](https://csswizardry.com/2019/05/self-host-your-static-assets/)!
-   No `cache-control` headers means HTML responses can’t be accurately revalidated, always returning a `200` when it could have been a `304`.
    -   The absence of a `cache-control` header is not enough to count as a [caching strategy](https://csswizardry.com/2019/03/cache-control-for-civilians/).
    -   However, as everything else is so well cached, including LCP images, repeat-view LCP metrics are substantially faster.
-   We’re also missing proprietary `Oxygen-Cache-Control` headers, meaning we can’t get edge cache hits either.
-   LCP images on both pages are both `background-image`s that are late-discovered.
    -   They also live on yet another third-party origin that is not `preconnect`ed—Contentful’s `images.ctfassets.net`.

#### Factor’s Homepage Highlights

-   **URL:** [factorbikes.com](https://factorbikes.com/)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDcJ3\_AFV](https://www.webpagetest.org/result/250804_ZiDcJ3_AFV/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-factor-home.png)

Their LCP (42) is weirdly late-discovered.

-   The homepage compounds the `unpkg.com` problem by also making requests to the first/third-party `cdn.shopify.com` origin.
    -   It would be wise to add `Link` HTTP response headers to `preconnect` this origin. Cloudflare, who Factor are fronted by, can then upgrade these to `103 Early Hints` for them.
-   The homepage LCP image is very late discovered (entry 42 at 1.7s), and on a different origin, as discussed, but it’s also enormous! 1,235.1KB of WebP.
    -   There is some synchronous JS visible at around 1.7s on line 1 that must be further blocking the discovery of the `background-image`.
    -   To make matters worse, Contentful’s response heavily interleaves image bytes with less critical images, returning non-LCP resources (43–47) before our key candidate.

#### Factor’s Product Details Page Insights

-   **URL:** [factorbikes.com/bikes/ostro-vam](https://factorbikes.com/bikes/ostro-vam)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDc69\_AFW](https://www.webpagetest.org/result/250804_ZiDc69_AFW/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-factor-pdp.png)

It’s refreshing to see such a clean and overwhelmingly first-party waterfall!

There really isn’t much different between the homepage and product detail pages. In fact, there are more similarities.

-   Unfortunately, the LCP is a `background-image` once again.

#### Takeaways

This site is a remarkable exercise in restraint. No heavy-handed runtime, a very considerate approach to third parties. A modern stack without any modern baggage. I’m impressed, Factor!

[Subscribe now](https://csswizardry.gumroad.com/l/subscribe) to see detailed analysis of Factor’s website.

* * *

### 🥉 Giant

![Product page for the Giant Propel Advanced SL 0 RED aero road bike, featuring full carbon frame, deep-section wheels, and SRAM Red components. High-end build targeted at competitive riders seeking top-tier aerodynamics.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/giant-pdp.jpg)

[Giant Propel Advanced SL 0 (Red)](https://www.giant-bicycles.com/us/propel-advanced-sl-0-red)

Established in 1972, Giant is a Taiwanese brand headquartered in Taichung. Originally a manufacturer for other companies, Giant began producing bikes under its own name in 1981 and has since grown into the world’s largest bicycle manufacturer.

#### General Findings with Giant

LCP (ms)

INP (ms)

CLS

1,298

105

0.01

Giant took third place on our podium. It looks as though they make use of Vue.js—or at least Vue Cart—but no obvious signs of a framework such as Nuxt.

-   Giant is built as a _Multiple Page App_. Or as we used to call them, _websites_.
-   No word of a lie, they have a `spacer.gif`!
-   Pages open three new connections: two to `https://static.giant-bicycles.com` and one to `https://images2.giant-bicycles.com`.
    -   The `static.` origins are on the critical path.
-   They make use of old school, JS-based lazy loading.
-   They use unquoted `attribute=value` pairs like I do—_nice_.
-   Great restraint shown here—only a small number of resources loaded from the `<head>`.
    -   Non-critical CSS files are fetched asynchronously.
-   They’re making good use of `font-display`.

#### Giant’s Homepage Highlights

-   **URL:** [giant-bicycles.com/us](https://www.giant-bicycles.com/us)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDc67\_AFX](https://www.webpagetest.org/result/250804_ZiDc67_AFX/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-giant-home.png)

That very last request is their LCP candidate! That’s far too late.

-   They’re lazily loading their homepage LCP!
    -   With JS, no less. Super slow. It’s the 84th request.
    -   It’s getting requested _after_ Facebook, Google Tag Manager, Google Analytics, and Klaviyo have been completely returned.
    -   And they’re putting `fetchpriority=high` on there. Make your mind up!

#### Giant’s Product Details Page Insights

-   **URL:** [giant-bicycles.com/us/propel-advanced-sl-0-red](https://www.giant-bicycles.com/us/propel-advanced-sl-0-red)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDcBC\_AFY](https://www.webpagetest.org/result/250804_ZiDcBC_AFY/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-giant-pdp.png)

There’s no point fast-fetching your LCP if you’re going to wait so long to paint it.

-   The LCP image is `preload`ed now, meaning the `images2.` connection is negotiated much earlier on PDPs.
    -   This is why it’s now the sixth request as opposed to the 84th.
    -   The `preload` needs `fetchpriority=high`
    -   The killer here is the fact that we don’t put the LCP on the glass for a very, very long time.
    -   In the screenshot above, we see our LCP image is on the device by about 1.5s, but our LCP event doesn’t fire until approximately 7s (the dashed green line).
    -   This eyewatering _Element Render Delay_ is down to the fact that Giant move to a client-rendered architecture for their image gallery (and _Add to Cart_) on PDPs.
-   Our repeat view has heavily cached assets, but as the LCP event is so runtime dependent, we get no customer-facing performance improvements.

#### Takeaways

With the Giant site, we’re in a place where looking at two pages in isolation actually look quite bad—there are a couple of egregious decisions that put them on the back foot. But looking at the site overall, they’re glowing. It would be interesting to drill down into specific page- and template-types.

[Subscribe now](https://csswizardry.gumroad.com/l/subscribe) to see detailed analysis of Giant’s website.

* * *

### Trek

![Trek Madone SLR 9 Gen 8 road bike displayed on a premium product page with race-ready features, OCLV carbon frame, aerodynamic shaping, and integrated cockpit. Designed in collaboration with pro riders for optimal speed and handling.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/trek-pdp.jpg)

[Trek Madone SLR 9 Gen 8](https://www.trekbikes.com/us/en_US/bikes/road-bikes/performance-road-bikes/madone/f/F213/madone-slr-9-gen-8/46707/5320708/)

Founded in 1976 in Waterloo, Wisconsin, Trek was created with a mission to build high-end bikes in the United States. It has since become a major global player, with a strong focus on innovation and racing pedigree across road and mountain disciplines.

#### General Findings with Trek

LCP (ms)

INP (ms)

CLS

2,869

210

0.15

Trek is a cycling powerhouse! One of the bigger brands in the peloton, how have they found themselves toward the back of the pack? Trek use fully client-rendered Vue.js on top of SAP Commerce Cloud, deployed on Azure and fronted by Cloudflare.

-   Fully client-rendered Vue.js (without Nuxt, etc.).
-   They still force hard navigations, so every page view runs into a high boot-up cost—it runs as an MPA.
-   They have a silly redirect whereby their logo links to `/us/en_US`, but the resulting URL is actually `/us/en_US/`. This adds pure latency onto every homepage click.
-   Most pages don’t place-hold client rendered content very well at all, explaining their high CLS scores.

#### Trek’s Homepage Highlights

-   **URL:** [trekbikes.com/us/en\_US](https://www.trekbikes.com/us/en_US/)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDcS3\_AFZ](https://www.webpagetest.org/result/250804_ZiDcS3_AFZ/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-trek-home.png)

Client-side rendering spells disaster for this late-rendered LCP image.

-   I haven’t included the full waterfall for any of the sites so far, but it’s worth noting that Trek’s homepage yielded 262 requests!
-   The homepage’s LCP (29) is actually fetched relatively quickly, despite being fully client-rendered.
    -   And JS-lazy loaded once it arrives—wow!
    -   This slow-path request for the LCP image got it onto the device by about five seconds, but we don’t display it until approximately 15 seconds!
-   The homepage seems to have its app-shell pretty well place-held as there is no CLS penalty.
-   Another very aggressive `cache-control: no-cache, no-store, max-age=0, must-revalidate` header means we get `200` responses on every subsequent visit.
    -   Almost all other directives are redundant in the presence of `no-store` as if there is nothing to store, there is nothing to cache, nothing to expire, and nothing to revalidate. Still, it doesn’t do any harm to include them all.
-   INP scores are pushed up by a huge _Recalculate Style_ event when opening the nav.
    -   They’re reading style properties while also attempting to write them.
    -   As just 2.9× CPU throttling, this event took an eyewatering 154ms!

#### Trek’s Product Details Page Insights

-   **URL:** [trekbikes.com/us/en\_US/…/madone-slr-9-gen-8/…](https://www.trekbikes.com/us/en_US/bikes/road-bikes/performance-road-bikes/madone/f/F213/madone-slr-9-gen-8/46707/5320708)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDc8W\_AG0](https://www.webpagetest.org/result/250804_ZiDc8W_AG0/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-trek-pdp.png)

The story gets worse as key content is late-fetched via client-side API calls.

-   Interestingly enough, the video on the PDP isn’t classed as the LCP candidate—it’s a piece of text that appears quite a lot earlier.
    -   The PDP’s ‘obvious’ LCP candidate is a YouTube video loaded via an `iframe`. Both RUM and synthetic testing cannot detect `iframe`\-originated LCP’s for privacy reasons, but CrUX, being part of Chrome, can. The upshot of this is that developers might wrongly assume that the site is much faster than it is if they are relying on Lighthouse, DevTools, WebPageTest, or anything other than CrUX.
-   The rest of the PDP’s LCP story is a bit of a car crash. As content loads on the client, the LCP candidate keeps on changing (all while CLS scores keep on increasing). Once the browser does settle on its LCP candidate, Trek fade it in! Chrome takes the end of the animation as its LCP timestamp, further exacerbating the issue.
    -   The API response that contains the LCP content is the 148th request!
-   Product pages are not sufficiently place-held to safeguard CLS scores: the main app shell is empty, and oncoming content is not place-held either.

#### Takeaways

The Trek site going all in on client-side Vue has left it struggling to hit decent paint timings. This coupled with particular page types not being adequately place-held gives us the CSR double whammy of LCP and CLS penalties. I can only imagine (or hope) Trek might have a rebuild or replatform on the horizon—seeing fully-client rendered Vue is already something of a relic.

[Subscribe now](https://csswizardry.gumroad.com/l/subscribe) to see detailed analysis of Trek’s website.

* * *

### Orbea

![Orbea ORCA AERO M10i Replica road bike in Lotto team colours, shown with integrated cockpit and deep rims. Customisable colour and size options highlighted on the page, reflecting Orbea’s focus on personalisation and performance.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/orbea-pdp.jpg)

[Orca Aero M10i Replica](https://www.orbea.com/gb-en/bicycles/road/orca-aero/cat/orca-aero-m10i-replica)

Founded in 1840 in the Basque Country of Spain, Orbea actually started out making guns. It pivoted to bicycles in the 1930s and is now one of the oldest bike manufacturers in the world, known for its sleek, performance-oriented designs.

#### General Findings with Orbea

LCP (ms)

INP (ms)

CLS

5,050

138

0.41

Orbea is deployed as an MPA but uses Alpine.js for client-side templating. Other than that, it’s quite difficult to see what stack they’re on.

-   Orbea is deployed as an MPA.
    -   They suffer incredibly high TTFB.
    -   And they also have an extremely aggressive `no-store, no-cache, must-revalidate` policy.
    -   This means every page view is a back end-heavy trip to origin: `cf-cache-status DYNAMIC`.
-   They link to a lot of [render-blocking](https://csswizardry.com/2024/08/blocking-render-why-whould-you-do-that/) resources, including third-party ones.
-   They use Typekit which [contains an `@import`](https://csswizardry.com/2018/11/css-and-network-performance/#avoid-import-in-css-files)—a real killer.
    -   It’s particularly harmful for Orbea as the bulk of their JavaScript is blocked behind it.
    -   They’re attempting to use `Typekit.load()` but it’s undefined.
-   Their fallback font is very different to their custom font; different enough to almost go over 0.1 CLS on the homepage.
-   They seem to have the same `rel=canonical` issues as Merida.
-   They make sporadic use of `font-display`.

#### Orbea’s Homepage Highlights

-   **URL:** [orbea.com/us-en](https://www.orbea.com/us-en/)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDc6C\_AG1](https://www.webpagetest.org/result/250804_ZiDc6C_AG1/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-orbea-home.png)

Orbea’s JS-heavy and lazily-loaded homepage means late LCP for them.

-   They lazy load their LCP on the homepage.
    -   The sheer amount of JS that runs beforehand means it’s discovered incredibly late—entry 89.
-   However they don’t lazy load images much further down the page.
    -   They also omit `alt` and `width` and `height` attributes.
-   They fetched about 11.8MB of images.

#### Orbea’s Product Details Page Insights

-   **URL:** [orbea.com/us-en/…/orca-aero-m10i-replica](https://www.orbea.com/us-en/bicycles/road/orca-aero/cat/orca-aero-m10i-replica)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDc96\_AG2](https://www.webpagetest.org/result/250804_ZiDc96_AG2/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-orbea-pdp.png)

More _Element Render Delay_ issues, but for Trek this time.

-   The PDP introduces two new third party blocking origins.
    -   One points at `https://unpkg.com/tippy.js@6` which then `302`s to `/tippy.js@6.3.7/dist/tippy-bundle.umd.min.js`.
    -   This adds a whole round trip of latency to the critical path and is only cacheable for one minute.
-   They appear to be attempting a JS-based lazy loading strategy with `data-src` attributes but they also have a non-empty `src` that points to the mobile image anyway.
    -   This means desktop will fetch the mobile image and, conditionally, the desktop image.
-   The PDP has two near (if not completely) identical carousels on it—more additional fetches.
    -   JS hides one of the carousels, but not before incurring a severe layout shift.
-   You see those two colour swatch images in the screenshot above? The two bisected circles? They are both 822KB JPEGs.
    -   How?!

#### Takeaways

It’s first byte times that are crippling Orbea. Setting even a modest `max-age` (and allowing Cloudflare to serve cached HTML responses) would take the edge off. Typekit—and the way they’ve placed it—cause them severe paint-timing issues. Blocking on top of blocking on top of blocking. The double-carousel issue on the PDP accounts almost exactly for their CLS scores. That would be a quick win for them.

[Subscribe now](https://csswizardry.gumroad.com/l/subscribe) to see detailed analysis of Orbea’s website.

* * *

### Ridley

![Ridley Noah FAST 3.0 Ultegra Di2 aero road bike product page showing the bike in purple colourway with integrated cables, aggressive aero tubing, and DT Swiss wheels. Aimed at serious road cyclists and racers.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/ridley-pdp.jpg)

[Ridley Noah FAST 3.0](https://www.ridley-bikes.com/en_US/bikes/SBINF3RID082)

Established in 1997 in Belgium by Jochim Aerts, Ridley has built a reputation around aerodynamic innovation and cobble-tough endurance bikes. Its roots in Flemish cycling culture are unmistakable, and its bikes are a regular fixture in the pro peloton.

#### General Findings with Ridley

LCP (ms)

INP (ms)

CLS

4,694

1,121

0.61

-   Ridley is built on Nuxt and is a soft-navigation SPA.
-   They fetch Google Maps in a blocking manner.
-   They also have a blocking tracking script on a separate origin which always causes a network request as it’s marked `max-age=0`.
-   Their LCP candidates live on separate asset domains.
-   The fallback font is so far from the web font that it causes severe layout shifts.
-   There are no caching headers whatsoever, which is inadvisable.
    -   But as they do have an `ETag` header, `304`s are possible.
-   Nuxt is doing that annoying pattern where it `preload`s a CSS file then immediately requests it with `rel=stylesheet` right after.
    -   It’s not harmful, but it’s not helpful either, and ends up marking blocking requests as non-blocking which is misleading.
    -   On the subject of `preload`, they’re [`preload`ing Google Fonts](https://csswizardry.com/2020/05/the-fastest-google-fonts/) but also async-injecting it with JavaScript. Again, not harmful, but also not much point either.
-   The real killer for Ridley is a near-infinite `requestAnimationFrame()`. The whole time we have a page open, `rAF()` is in a non-stop repetition.
    -   This is how we end up with a 1s+ INP score.
    -   You can see this in the waterfalls below. It stops after about 20 seconds.
-   Interestingly, despite being visible much earlier, the actual LCP event in WebPageTest didn’t fire until the nonstop `rAF()` settles down briefly.
-   Thankfully, assets are fingerprinted and [cached for a year](https://csswizardry.com/2023/10/what-is-the-maximum-max-age/).
-   Their Nuxt JS bundles are defined at the `</body>` with both `async` and `defer`. In this scenario, [`async` always wins](https://x.com/csswizardry/status/1331721659498319873).
    -   `async` is an open invite for race conditions, so I can only assume their bundles have been designed to run independently (otherwise, expect lots of errors and bugs).

#### Ridley’s Homepage Highlights

-   **URL:** [ridley-bikes.com/en\_US](https://www.ridley-bikes.com/en_US)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDcBP\_AG3](https://www.webpagetest.org/result/250804_ZiDcBP_AG3/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-ridley-home.png)

A staggeringly large LCP image on line 23. That much dark purple is bad news.

-   The LCP image is 1.4MB!
    -   On slower connections, this is a killer.
    -   It is in the HTML at least—they should stick `fetchpriority=high` on there.
-   The homepage ‘carousel’ is actually stacked one pane on top of the other rather than in a row like a traditional carousel.
    -   This means that while the heavy images are downloading, we see loads of stacked text nodes which looks very broken.

#### Ridley’s Product Details Page Insights

-   **URL:** [ridley-bikes.com/en\_US/bikes/SBINF3RID082](https://www.ridley-bikes.com/en_US/bikes/SBINF3RID082)
-   **WebPageTest:** [webpagetest.org/…/250804\_ZiDcYD\_AG4](https://www.webpagetest.org/result/250804_ZiDcYD_AG4/)

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/wpt-ridley-pdp.png)

Even modern image formats like AVIF can’t do much to help us here.

-   The LCP image is in the initial HTML as an `<img>`, but missing `fetchpriority=high`.
    -   They’re actually attempting to lazy load it! But thankfully also getting it wrong: `lazy=true`.
-   When you switch between different bike sizes, you get huge layout shifts.
-   We have more poorly optimised images.
    -   16MB of the 24MB transferred is image data.
-   The PDP’s HTML payload is gargantuan.
    -   Almost 4MB decompressed—almost all of it is Nuxt state (`window.__NUXT__`).
-   We have an eyewatering 5MB of JS.
    -   12MB of the total 37MB uncompressed page bytes are JavaScript.
    -   That’s not a typo.

#### Takeaways

Before we focus on the bad, Ridley’s new Noah 3.0 won its first ever race. And at the Tour de France, no less. It also marked the first ever Tour stage win for Uno-X Mobility, the team that ride Ridley’s bikes. That’s more of a win than any Core Web Vitals, so congratulations are in order. Let’s take a moment.

But onto the job at hand. Ridley is struggling a lot with all three metrics. LCP is hampered by already-high first-byte times, leaving only a 500ms budget to get from TTFB to LCP. The majority of their lost time happens between FCP and LCP—this is almost all lost to _Element Render Delay_. This may well be the phenomenon observed above: the LCP event doesn’t fire until the main thread dies down.

On the subject of the main thread, the constantly-firing `requestAnimationFrame()` is dragging them into the very pits of INP—well over one second! This isn’t because the main thread is necessarily blocked—`rAF()` is relatively noninvasive and each one only lasts a small amount of time—but the main thread is just kept _so_ busy, it’s hard to sneak any user input in.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/ridley-raf.png)

Note that while none of the tasks are _long_, there are thousands of them back-to-back. It literally is thousands in that screenshot.

Finally, because INP is so high, a lot of interactions take over 500ms which then puts us outside of the 500ms grace period for CLS: `hadRecentUserInput: false`.

I honestly think just sorting out that `requestAnimationFrame()` would start to take chunks out of the other metrics, too.

[Subscribe now](https://csswizardry.gumroad.com/l/subscribe) to see detailed analysis of Ridley’s website.

* * *

## Patterns and Insights

As a cycling enthusiast, perhaps the most surprising insight for me was that most of the larger, wealthier, and most prestigious brands tend to appear in the slower half of the cohort. Is this complacency? An Apple-esque arrogance? Who knows.

**Big brands aren’t always the best performers.**

Several of the industry’s most recognisable names fall startlingly low on this list. Trek, Orbea, and Specialized—brands with global reach and significant marketing clout—rank 19th, 20th, and 13th respectively. Their reputations far outpace their web performance.

**High-end doesn’t always mean high CrUX scores.**

Colnago (17th), Wilier (18th), and Bianchi (15th) are all brands dripping with prestige and heritage (and the price tags to match), but in terms of web performance, they’re clustered towards the bottom of the group. This might suggest that legacy and luxury don’t always translate into digital excellence—or perhaps that their customer base tolerates slower experiences in exchange for reputation and perception.

**The underdog story is online-first.**

Merida and Factor might not be the first names fans think of when naming top-tier race bikes, but they do top this table with near-perfect CrRRUX scores. These brands show that operational excellence, modern manufacturing, and attention to digital experience can co-exist without the century-old heritage.

* * *

## The Fastest Team Sites in the 2025 Tour de France

As a bit of an added stretch goal, I decided to run the numbers for each of the team sites to see if any patterns emerged. These are the CrRRUX scores for each _team_ site that raced the 2025 Tour de France:

1.  Team Picnic PostNL – 0.9999
2.  Bahrain Victorious – 0.9982
3.  Israel–Premier Tech – 0.9978
4.  Ineos Grenadiers – 0.9972
5.  Intermarché–Wanty – 0.9928
6.  Lotto – 0.9919
7.  UAE Team Emirates–XRG – 0.9895
8.  Uno–X Mobility – 0.9893
9.  Groupama–FDJ – 0.9892
10.  EF Education–EasyPost – 0.9888
11.  Arkéa–B&B Hotels – 0.9847
12.  Soudal Quick-Step – 0.9792
13.  Cofidis – 0.9761
14.  Team TotalEnergies – 0.9705
15.  XDS Astana Team – 0.9701
16.  Lidl–Trek – 0.9587
17.  Movistar Team – 0.9585
18.  Team Visma | Lease a Bike – 0.7959
19.  Tudor Pro Cycling Team – 0.7941
20.  Red Bull–BORA–hansgrohe – 0.7445
21.  Decathlon AG2R La Mondiale Team – 0.7175
22.  Alpecin–Deceuninck – 0.5588
23.  Jayco–AlUla – 0.5562

1.  **Team Picnic PostNL**, sponsored by Lapierre
2.  **Bahrain Victorious**, sponsored by Merida
3.  **Israel–Premier Tech**, sponsored by Factor

**The fastest bike brand also supports a mid-ranked team.**

Merida tops the CrRRUX rankings for manufacturers (1.0000) but sponsors Bahrain Victorious—only 17th in the final Tour standings. The Bahrain Victorious team site, however, is the second-fastest overall. It’s a rare alignment: fast bike site, fast team site, middling result.

**Factor and Israel–Premier Tech deliver on both fronts.**

Factor comes second in the CrRRUX bike table (0.9986) and Israel–Premier Tech ranks third among team sites (0.9978). This is one of only two pairings where both bike and team site land in the top three for performance. Their Tour placement? 18th. Fast site, slow legs.

**Jayco–AlUla ride one of the fastest bike sites but have the slowest team site**

Giant ranks third in the bike CrRRUX table (0.9985), but Jayco–AlUla come dead last for team website performance (0.5562). Their Tour finish—17th—sits toward the bottom. Perhaps the team should take some performance tips from Giant’s developers?

Could we conclude that Merida and Factor and Bahrain Victorious and Israel–Premier Tech care about performance in all aspects of their operations?

## Appendix

### Credits and Inspiration

My good friend and peer [Jake Archibald](https://jakearchibald.com/) wrote a multi-part piece in 2021 asking [Who has the fastest F1 website in 2021?](https://jakearchibald.com/2021/f1-perf-part-1/). That should definitely be seen as the genesis of this post.

### Methodology

I took the most [up-to-date CrUX data](https://developer.chrome.com/docs/crux/history-api) (blended mobile and desktop data) for the most recent time period available on the final stage of the Tour (27 July 2025). CrUX data is based on real users’ experiences.

I pulled that data into Google Sheets where I ran it through my own [CrRRUX algorithm](https://csswizardry.com/2024/11/designing-and-evolving-a-new-performance-score/)—a metric designed to objectively and fairly rank a cohort of origins’ Core Web Vitals data.

For each of the fastest and slowest three sites, I took the homepage and the product details page for their flagship, high-end road race bike. I then ran a series of synthetic tests with [WebPageTest](https://www.webpagetest.org/). Below are the tests and the relevant scripts.

### WebPageTest URLs and Scripts

URLs tested (US-locale homepage and flagship bike page; mobile):

```
https://www.merida-bikes.com/en/
  https://www.webpagetest.org/result/250804_ZiDcGY_AFS/
https://www.merida-bikes.com/en/bike/4850/reacto-team
  https://www.webpagetest.org/result/250804_ZiDcZS_AFT/
https://factorbikes.com/
  https://www.webpagetest.org/result/250804_ZiDcJ3_AFV/
https://factorbikes.com/bikes/ostro-vam
  https://www.webpagetest.org/result/250804_ZiDc69_AFW/
https://www.giant-bicycles.com/us
  https://www.webpagetest.org/result/250804_ZiDc67_AFX/
https://www.giant-bicycles.com/us/propel-advanced-sl-0-red
  https://www.webpagetest.org/result/250804_ZiDcBC_AFY/
https://www.trekbikes.com/us/en_US/
  https://www.webpagetest.org/result/250804_ZiDcS3_AFZ/
https://www.trekbikes.com/us/en_US/bikes/road-bikes/performance-road-bikes/madone/f/F213/madone-slr-9-gen-8/46707/5320708
  https://www.webpagetest.org/result/250804_ZiDc8W_AG0/
https://www.orbea.com/us-en/
  https://www.webpagetest.org/result/250804_ZiDc6C_AG1/
https://www.orbea.com/us-en/bicycles/road/orca-aero/cat/orca-aero-m10i-replica
  https://www.webpagetest.org/result/250804_ZiDc96_AG2/
https://www.ridley-bikes.com/en_US
  https://www.webpagetest.org/result/250804_ZiDcBP_AG3/
https://www.ridley-bikes.com/en_US/bikes/SBINF3RID082
  https://www.webpagetest.org/result/250804_ZiDcYD_AG4/
```

Cookie consent script:

```
setCookie https://www.merida-bikes.com cookie_consent_status=["necessary","statistics","media"]
setCookie https://www.giant-bicycles.com cookieControlPrefs=["essential","marketing","statistics"]
setCookie https://factorbikes.com/ preferredCountry=US
setCookie https://factorbikes.com/ preferredMarket=US
setCookie https://www.trekbikes.com/ CookieConsent={stamp:%27atAx5dV3eelO+NTJEeE2/2hjQP8EfzneY261Azp3e9ayU+Ns0nlBKQ==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1753619313310%2Cregion:%27gb%27}
setCookie https://www.orbea.com/ CookieConsent={stamp:%27-1%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:1%2Cutc:1753619371996%2Cregion:%27GB%27}
setCookie https://www.ridley-bikes.com/ __BCF_CONSENT={"categories":["functional","product_enhancement_content_tracking","personalisation","marketing","social_media"],"level":["functional","product_enhancement_content_tracking","personalisation","marketing","social_media"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"2025-07-27T12:30:56.243Z","consent_uuid":"d5fbdb16-4793-42ca-b748-c517c6b4f427","last_consent_update":"2025-07-27T12:30:56.243Z"}
setCookie https://www.ridley-bikes.com/ _BCF_CONSENT={"categories":["functional","product_enhancement_content_tracking","personalisation","marketing","social_media"],"level":["functional","product_enhancement_content_tracking","personalisation","marketing","social_media"],"revision":0,"data":null,"rfc_cookie":false,"consent_date":"2025-07-27T12:30:56.243Z","consent_uuid":"d5fbdb16-4793-42ca-b748-c517c6b4f427","last_consent_update":"2025-07-27T12:30:56.243Z"}
navigate %URL%
```

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