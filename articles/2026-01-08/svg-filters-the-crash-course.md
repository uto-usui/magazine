---
title: "SVG Filters: The Crash Course"
source: "https://www.sarasoueidan.com/blog/svg-filters/"
publishedDate: "2018-08-11"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [The Video Recording](#the-video-recording)
2.  [The Talk Slides](#the-talk-slides)
3.  [Further Resources](#further-resources)
4.  [So Many Possibilities](#so-many-possibilities)

I always try to customize in-house client [workshops](https://www.sarasoueidan.com/workshops/) to my client’s needs. That sometimes also means that if my client’s design and dev team is interested in learning something that is not covered in my workshop, I will tweak the content of the workshop to make sure they learn what they need to make their work better.

One such example is when [I ran my SVG Workshop for the design and engineering team at Netflix](http://localhost:1313/blog/netflix-workshop/) last year. [Elijah](https://twitter.com/Elijah_Meeks) told me he’d be interested in learning more about SVG Filters. I hadn’t dug into SVG filters before that, so I took his request as an opportunity to finally do it, so that I could customize the workshop for them.

I learned all the basics of SVG filters in time for the workshop, and then spent the following two months learning more. The material I gathered, learned and created turned out to be useful enough to share with others, so I thought I’d write a series of articles on the topic, maybe even give them their own URL somewhere. I also thought they’d be good material for an interesting talk, so I created a talk and gave that talk twice this year: the debut was at [Beyond Tellerrand](https://beyondtellerrand.com/) Munich in January, and the second one was at [CSS Day](https://cssday.nl/) in Amsterdam last month.

If you know me, you know that my talks tend to be fast, packed with practical and technical goodies and tips. This talk was no exception. And the feedback to both talks was mind-blowing.

I had not shared the slides for the talk before today. The main reason was that I wanted to create that series of articles that I’d been meaning to write on the topic. But that plan never saw the day of light, and, to be quite frank, I don’t think that it will any time soon because I don’t feel as excited to write long, deep dives about SVG as I used to. My interest and excitement is shifting to other aspects of the front-end. I’m still very much into SVG but only as one of the many tools in our front-end arsenal, and my future articles are going to reflect that.

So I decided to write this article to share the video(s) of the talk(s), the slides, and some links for if you’re interested in learning more about SVG Filters from further resources.

### The Video Recording

The following is the video recording of my talk at btconf:

[SVG Filters: The Crash Course - Sara Soueidan - btconfMUC2018](https://vimeo.com/251312501) from [beyond tellerrand](https://vimeo.com/beyondtellerrand) on [Vimeo](https://vimeo.com/).

I don’t want to slow this page down too much by embedding two videos, so here’s [a link to the CSS Day talk recording](https://vimeo.com/283654933).

You _may_ want to watch the videos at a slower pace than the default. 🙈

If you run an event and would like me to give this talk at it, please feel free to [drop me a line](mailto:soueidan.sara@gmail.com) and request it.

### The Talk Slides

You can find the slides online [here](https://sarasoueidan.com/slides/SVG-Filters-Crash-Course.pdf).

### Further Resources

I Googled a _lot_ while learning about filters. I jumped between the [official specification](https://www.w3.org/TR/filter-effects/) and a bunch of articles that were not specifically about SVG filters, but more about the concepts that you need to know about in order to understand SVG filters. So I learned about noise generation, turbulence, random math functions, color matrices, color functions, Gaussian and other blur operations, and so, so much more. But there were a few resources that I found myself coming back to, and those include:

-   [The Web Platform SVG Filter docs](https://webplatform.github.io/docs/svg/tutorials/smarter_svg_filters/) were an indispensable resource.
    
-   I learned so much from [Michael Mullany](https://twitter.com/mmullany)’s work. He wrote some of the content of the Web Platform docs, and has written [a wonderful introduction to SVG filters for net magazine](https://www.creativebloq.com/netmag/how-go-beyond-basics-svg-filters-71412280) that I learned a tonne from.
    
-   Michael also has [a bunch of SVG filter experiments on Codepen](https://codepen.io/mullany/) that I highy recommend checking out. I also broke down most of his pens and one of the demos in my talk was inspired by / borrowed from his examples.
    
-   [Dirk Weber’s wonderful experiments on Smashing Magazine](https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/). The article doesn’t dive into the concepts needed or used in SVG filter primitives, but I broke down some of his demos as a way of learning more about the filters used.
    

I learned everything else by picking up small tips and pieces of information from here and there and sewing them together.

### So Many Possibilities

I only scratched the surface of what is possible with SVG Filters. You can do _so_ much with SVG Filters. As I showed in my talk, you can recreate many graphic editor capabilities using almost exactly the same steps in SVG using filter primitives. But there are also limitations. I was particularly interested in recreating [one particular Photoshop color glitch effect](https://www.youtube.com/watch?v=6BWA5pAATKQ) when I was working on the demos for the talk, but I don’t think there’s a way to do that using SVG’s filter primitives. I could be wrong, though. After all, I only scratched the surface and stopped halfway through my research because I had to focus on client work. So if you know a way to do this, please feel free to share and [tweet at me](https://twitter.com/SaraSoueidan).

After my talk, many people expressed their interest in experimenting with SVG filters, and many of them already started sharing great demos on Codepen. [Yoksel](https://twitter.com/yoksel_en) has been tweeting about her SVG filter experiments lately that I highly recommend checking out. Others have requested more resources after my talk, which prompted me to write this article today. So, I hope you too find it useful and are excited enough to experiment with SVG filters today.

Cheers,  
Sara

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.