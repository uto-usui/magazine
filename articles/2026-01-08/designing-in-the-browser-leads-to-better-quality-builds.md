---
title: "Designing in the browser leads to better quality builds"
source: "https://csswizardry.com/2010/10/designing-in-the-browser-leads-to-better-quality-builds/"
publishedDate: "2010-10-06"
category: "css"
feedName: "CSS Wizardry"
---

5 October, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [A little background](#a-little-background)
    1.  [The article I wish I’d written](#the-article-i-wish-id-written)
2.  [How it works](#how-it-works)
3.  [How it improves build quality](#how-it-improves-build-quality)
4.  [Designer to developer](#designer-to-developer)
    1.  [Designers obsolete?](#designers-obsolete)
5.  [On pushing the limits](#on-pushing-the-limits)
    1.  [Developers still need designers!](#developers-still-need-designers)
    2.  [Big brands](#big-brands)
6.  [Aiding programmers](#aiding-programmers)
7.  [When do you design in the browser?](#when-do-you-design-in-the-browser)
    1.  [When can’t it be used?](#when-cant-it-be-used)
8.  [Final word](#final-word)

Last night I got to thinking that the majority of design and build I have done in the past few years I have done straight into the browser. Personal sites, personal clients and some clients worked on during employment–all have benefited from being designed in the browser, and their code has benefited also. I maintain that the build quality of a site designed in the browser can be far greater than if it started its life in Photoshop.

## A little background

**N.B.** I am in no way saying we invented the concept of designing in the browser, we merely adopted it _very_ early, before most.

I have championed designing in the browser long before it became popular. True fact. I was doing this long before it was a mainstream practice.

When working at [Sense](http://sense.co.uk/) I was extremely lucky to work alongside a man called [Philip Meitiner](https://twitter.com/ReluctantPhil). He was Sense’s Account Director and a genuine pleasure to work with and learn from. It was whilst we were working on a white-label website for some big name clients (Nissan, Renault, Mercedes, Volvo and more…) that we decided to ditch Photoshop and dive straight into the browser. This idea was born from the fact that I’d put together a series of HTML wireframes whose code was of a quality that I deemed suitable for production. It seemed backward to us to then fire up Photoshop and design an image based on a set of HTML pages, to then return to the HTML and style it.

Thus was born our idea to design in the browser. We saved the HTML in isolation and used it as a starting point for each development of the various sites we had to build. We branded and designed each white-label in the browser and sent live, actual code back to the client for approval. It was, for everyone involved (though me more so) a dream come true.

### The article I wish I’d written

Months later, 24 Ways published [their article on designing in the browser](http://24ways.org/2009/make-your-mockup-in-markup). If there was one article I wish I’d written, it’s that one. Phil was equally dismayed, however at least we knew we were on to something good.

## How it works

For those not in the know, designing in the browser is exactly as it sounds. Instead of building a website in Photoshop then markup, you dive straight into the browser and notepad and get cracking. A few benefits:

-   Saves time, cutting all Photoshop work.
    
-   Changing repeated elements (e.g. hyperlink colours) takes just one CSS declaration in the browser. It takes a lot of donkey work in Photoshop.
    
-   Clients buy websites, not printouts of websites. Designing in the browser allows them to see how their site looks in its intended environment.
    
-   This makes progressive enhancement usage much simpler. If they view it in Chrome, they see your round corners. If they view it in IE they see square corners. Both are intended behaviours, and both are fine.
    
-   It can show things like hover effects and interactions that Photoshop can’t.
    

> “Clients buy websites, not printouts of websites.”

## How it improves build quality

There are a few reasons why I believe that designing in the browser improves the overall build quality of a website.

Users don’t (generally) visit a website for its design, they visit for its content. Designing in the browser considers content first. This is absolutely essential for a well thought out website, in my opinion. In Photoshop you design a layout and then populate it with content. Designing in the browser you start with your content and design around it. Content is the focus and the design does nothing but complement it. You’re coming up with a suitable way to house the content you’re starting out with, rather than shoehorning content into a preconceived design.

By focussing on what your users are actually coming for, you often find that a better UX will follow. Ignore anything extraneous to begin with, nail the fundamentals (hint: [typography](http://www.informationarchitects.jp/en/the-web-is-all-about-typography-period/)!) and concentrate on how pretty it looks after. Designs change more frequently than content does; invest in the content early.

> “What happens when your Photoshop printout uses nice anti-aliased Helvetica, and the final site renders in non-aliased Arial on the client’s machine?”

Another reason is that, particularly if you are in a team where the designers don’t do a lot of hands-on coding and build, devoting a lot of code to purely visual effects and design can lead to insensible builds, insemantic markup and a whole host of other issues. This is, admittedly, a marginal chance, but coding around the content before the design will often lead to more sensibly built websites, focussing more effectively on its content.

The main time to use the designing in the browser as your primary build method is probably with a lot more sites than you’d imagine. Blogs, ecommerce, portfolios, news sites, apps, aggregators. You name it.

## Designer to developer

Hopefully this one doesn’t happen often, but it can do…

I’m sure developers have had this countless times–a designer brings you a design that just isn’t codable. The client had been shown a PSD that you have no hope of coding unless you botch and hack at markup and use ridiculously extraneous amounts of Javascript to manipulate it. By designing at code level you avoid all these problems from the outset. What you code _is_ your design, your design _is_ codable.

### Designers obsolete?

Far from it. The designer is often the developer anyway, and if not, the designer is needed to call the creative shots and create initial visuals. Take [Venturelab](http://venturelab.co.uk/) for example. [Si](https://twitter.com/simonwiffen) came up with the skeleton of that design in Photoshop. Any type work, any calls-to-action, lists, navigation and tables were done by me, in the browser. Si created two ‘mood board’ style PSDs (and very good ones at that) but [Justin](https://twitter.com/JustinWhitston) was only ever shown working code, designed in the browser.

Nail the backbone in Photoshop if needs be, but in areas where rapid development and the need for quick and arbitrary changes are needed (think typography and link colours etc.) designing in the browser is far more efficient. Imagine the pain of changing the zebra-stripe colours of a giant table in Photoshop when you just edit one CSS declaration and see to it all in one go.

## On pushing the limits

There have however been one or two occasions in my career where not designing in the browser has done more good for a project than bad.

> “There’s a large chance that \[a developer working in the browser\] won’t make things difficult for themselves, that they won’t push their boundaries. This is a bad thing.”

The first example links back to what I said about designers handing sites to developers that the developers can’t code. If the person designing the site is also the person building it, there is a (pretty large) chance that they’ll take the easiest simplest route to completion. There’s a large chance that they won’t make things difficult for themselves, that they won’t push their boundaries. This is a bad thing.

If I draw on my own experience, the [Findus Crispy Pancakes](http://www.finduscrispypancakes.com/) site is an excellent example of designers giving developers the kind of headaches we love. I built Findus about a year or so ago whilst at Sense. [Rob](https://twitter.com/RobFarnell) designed the site in Photoshop and when I saw it I nearly fainted. I had no idea where I’d even start coding up such a complex looking, overlapping, quite frankly mental design.

Yet despite this, I got my developers brain on and got to work. I finished the site about four days ahead of schedule and enjoyed every minute of it. That design pushed me more than it would have if it had started out in the browser. It was a lot better for being in Rob’s hands first. And I still maintain that it was one of my most challenging builds to date (IE6 support…).

### Developers still need designers!

[Follow Rob on Twitter](https://twitter.com/RobFarnell). Fantastic designer and all-round nice guy.

It is important that the designer and developer have overlapping knowledge of each others’ respective areas, yet play to their fullest in their own. The Findus site was a bit of fun on a small project which allowed me and Rob to really stretch ourselves, and that’s what it’s all about.

### Big brands

Another couple of times where designing in the browser hasn’t been viable was when we, at Sense, were working on the [Travelodge](http://travelodge.co.uk/) and [Rizla](http://rizla.co.uk/) websites. Travelodge was designed by another agency anyway, but even so, as they had very stringent brand guidelines that stated that round corners were a pivotal part of the brand, everything needed to be done in Photoshop.

Another example would be Rizla, which, again, we built at Sense. As Rizla’s brand is so important to their success and recognition it could not have just gone straight into the browser. Rizla wasn’t so much about quickly accessible content, so much as heavily designed and branded content. We allowed for users to change the design, and for the design to carry off promotional work, which could not have happened straight in the browser.

## Aiding programmers

This section was edited in part by [Dan Bentley](https://twitter.com/dan_bentley).

Programmers manipulate markup. A Photoshop document is nigh on totally useless to a programmer, whose involvement lies in all that magic stuff that happens behind the scenes. Allowing programmers access to the code from an earlier point means they can start their job alongside the developer sooner.

Furthermore is the idea that Javascript developers can visualise their involvement much sooner, too, and see what markup they will be manipulating from the outset, rather than having to second guess what markup might result from the developer’s take on the PSD. They can start manipulating the DOM and begin building prototypes alongside the main build developer right from the start, making life easier for them as well.

## When do you design in the browser?

At every available opportunity.

It saves time, it’s a much better way of presenting concepts to clients, it leads to better quality builds, it gives more consideration to content, it’s more fun than working in Photoshop (at least from my point of view), it’s easier to experiment, it’s far more efficient and the quality of the code is usually better as it concerns itself with content over decoration.

> “Designs change more frequently than content does; invest in the content early.”

For any content-centric sites (I know, _all_ sites are about content) such as blogs, web-apps, CMS style dashboard builds, news sites, informational sites or anything similar, you can’t lose by designing in the browser.

If you’re an account manager type person at an agency, run the idea past your development team; I’m pretty sure they’d love to work like this, if they don’t already.

### When can’t it be used?

Sometimes, designing straight in the browser just can’t work. Heavily branded or very graphical sites that are more about decoration or branding than content will be a struggle to create without opening Photoshop first. However, by completing the major chunk of the layout and graphical design in Photoshop, you can often leave it at that, and model/work on type straight in the browser (what happens when your Photoshop printout uses nice anti-aliased Helvetica, and the final site renders in non-aliased Arial on the client’s machine?). For the fine details, designing in the browser will be far more efficient and true-to-life than using Photoshop will ever be. Embrace it, and enjoy it.

## Final word

So, do you design in the browser? Are there any reasons why you don’t? Would you like to? Leave a comment and open the debate up a little wider…

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