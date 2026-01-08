---
title: "Mobile business card"
source: "https://csswizardry.com/2011/02/mobile-business-card/"
publishedDate: "2011-02-23"
category: "css"
feedName: "CSS Wizardry"
---

22 February, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [The code](#the-code)
2.  [Issues](#issues)

Business card style sites are nothing new. [Tim Van Damme](http://timvandamme.com/) popularised them a while ago and they’re a handy tool for relaying the most basic and important information about yourself in a very short space of time. I made [my own business card type site](https://csswizardry.com/profile/) recently (and [tweeted about its self-indulgence](https://twitter.com/#!/csswizardry/status/36048647212761088)) and put some nifty CSS to work–a digital business card whose content changes when you rotate your mobile.

[Here it is](https://csswizardry.com/profile/). Visit this on a desktop browser and in a smartphone (and then try rotating the device).

I was inspired after I saw [Engage Interactive’s](http://www.engageinteractive.co.uk/) iPhone site in [Paul Annett](https://twitter.com/nicepaul)’s .net magazine article whilst on the train. I only had my iPhone with me which meant that, although in the ideal viewing medium, I wasn’t able to pick apart any source. As my mind so frequently does, I started coding up a ‘my version’ in my head.

After building mine I went and found that Engage’s iPhone site uses JavaScript and works solely on an iPhone (I imagine some for of browser sniffing is used to detect it). This gives them increased functionality as they have horizontal-left and horizontal-right; I only have horizontal but I wanted a device independent site that would work using _only_ CSS.

Read on for the how-to…

* * *

## The code

What we have here is a page with personal and contact information. We have three possible states: desktop, mobile-portrait and mobile-landscape.

The stacked paper effect is achieved by replicating the appearance of the page `<div>` in both a `:before` and `:after` pseudo-element, giving these a negative `z-index` and then rotating them. This effect is achieved with no extra markup or images.

```
<code><span class="code-comment"><!-- Markup --></span>
<div id="page">

  <div id="about">
    
    [content]
  
  </div>
  
  <div id="contact">
    
    [content]
    
  </div>

</div>

<span class="code-comment">/* CSS */</span>
#page{
  position:relative;
  margin:0 auto;
  padding:20px 20px 0 20px;
  border:10px solid #f0f0f0;
  background:#fff;
  width:400px;

  -moz-box-shadow:0 0 10px rgba(0,0,0,0.25);
  -webkit-box-shadow:0 0 10px rgba(0,0,0,0.25);
  -o-box-shadow:0 0 10px rgba(0,0,0,0.25);
  box-shadow:0 0 10px rgba(0,0,0,0.25);
}
#page:before,
#page:after{
  content:" ";
  display:block;
  border:10px solid #f0f0f0;
  background:#fff;
  z-index:-1;
  position:absolute;
  top:-10px;
  right:-10px;
  bottom:-10px;
  left:-10px;
  
  -moz-box-shadow:0 0 10px rgba(0,0,0,0.25);
  -webkit-box-shadow:0 0 10px rgba(0,0,0,0.25);
  -o-box-shadow:0 0 10px rgba(0,0,0,0.25);
  box-shadow:0 0 10px rgba(0,0,0,0.25);
  -moz-transform:rotate(1deg);
  -webkit-transform:rotate(1deg);
  -o-transform:rotate(1deg);
  transform:rotate(1deg);
}
#page:after{
  z-index:-2;
  -moz-transform:rotate(-1.5deg);
  -webkit-transform:rotate(-1.5deg);
  -o-transform:rotate(-1.5deg);
  transform:rotate(-1.5deg);
}</code>
```

Each type of content is wrapped in its own `<div>`. This may, at first, seem extraneous but these are the hooks used to toggle the content displayed on mobile devices in different orientations. If your browser is portrait then hide the contact `<div>`, if it is landscape them hide the about `<div>`.

I hide each `<div>` by absolutely positioning it way off to the left of the screen. This offers more accessibility than a simple `display:none;`:

```
<code>@media (max-width: 480px) and (orientation: portrait){

#contact{
  position:absolute;
  left:-9999px;
}

}
@media (max-width: 480px) and (orientation: landscape){

#about{
  position:absolute;
  left:-9999px;
}

}</code>
```

Further, when the page loads on a mobile device an overlay animates in and out with some Webkit animations, telling the user to ‘Try rotating your phone…’

```
<code><span class="code-comment"><!-- Markup --></span>
<div id="mask"></div>

<p id="instructions">Try rotating your phone…</p>


<span class="code-comment">/* CSS */</span>
<span class="code-comment">/*------------------------------------*\
  INSTRUCTIONS
\*------------------------------------*/</span>
#mask,
#instructions{
  display:block;
  -webkit-animation-duration:3s;
  -webkit-animation-iteration-count:1;
  -webkit-animation-timing-function:linear;
}
#mask{
  position:absolute;
  left:-9999px;
  background:rgba(0,0,0,0.75);
  z-index:2;
  -webkit-animation-name:mask;
}
@-webkit-keyframes mask{
0%{
  opacity:0;
}
10%{
  opacity:1;
  top:0;
  right:0;
  bottom:0;
}
90%{
  opacity:1;
  top:0;
  right:0;
  bottom:0;
}
99%{
  opacity:0;
  top:0;
  right:0;
  bottom:0;
}
100%{
  opacity:0;
}
}
#instructions{
  font-family:Calibri, sans-serif; <span class="code-comment">/* Using a non-Typekit face to try and alleviate the delay in text-display */</span>
  width:200px;
  position:absolute;
  top:-9999px;
  left:50%;
  background:rgba(0,0,0,0.75);
  z-index:3;
  padding:10px;
  background:#fef8c4;
  border:1px solid #d8d566;
  margin:-12px 0 0 -100px;
  font-weight:bold;
  text-align:center;
  
  -moz-box-shadow:0 0 10px rgba(0,0,0,0.75),0 1px #fff inset;
  -webkit-box-shadow:0 0 10px rgba(0,0,0,0.75),0 1px #fff inset;
  -o-box-shadow:0 0 10px rgba(0,0,0,0.75),0 1px #fff inset;
  box-shadow:0 0 10px rgba(0,0,0,0.75),0 1px #fff inset;
  -webkit-animation-name:message;
}
@-webkit-keyframes message{
0%{
  opacity:0;
}
10%{
  opacity:1;
  top:50%;
  left:50%;
}
90%{
  opacity:1;
  top:50%;
  left:50%;
}
99%{
  opacity:0;
  top:50%;
  left:50%;
}
100%{
  opacity:0;
}
}

}
</code>
```

Another thing to note; the image in the page is used as an inline image, the favicon _and_ the iPhone homescreen icon. The same image has been reused three times, this isn’t anything amazing but it means only one request over a mobile connection.

## Issues

[Suze](https://twitter.com/suzehaworth) bought me [Typekit](http://typekit.com/) recently which I thought I’d try out, however there is a little bug on mobile whereby Typekit prevents any text from displaying for a moment. The length of this ‘moment’ depends on the speed of your connection.

Furthermore, the overlay mentioned previously is displayed with CSS based on resolution. Ideally you’d use a more robust method of writing this to the view than saying ‘if the screen is really this small then use CSS to display the markup that is there anyway regardless of the device’. Resolution dependence isn’t explicit enough because a) no matter what device you are on, the ‘rotate you phone’ text is always present in the markup and b) a 27” iMac will display the text to the user is they resize their browser down far enough; a user can actually see the phone related text on a desktop if they resize enough.

However, this was just a proof-of-concept idea just to see if I _could_ do it–I’m pretty pleased with the results.

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