---
title: "Case Study: Implementing Accessible Data Charts for the Khan Academy 2018 Annual Report"
source: "https://www.sarasoueidan.com/blog/accessible-data-charts-for-khan-academy-2018-annual-report/"
publishedDate: "2019-10-10"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [How accessible are SVG data visualizations & charts?](#how-accessible-are-svg-data-visualizations-%26-charts%3F)
2.  [Choosing the most appropriate SVG embedding technique](#choosing-the-most-appropriate-svg-embedding-technique)
3.  [Embedding the charts](#embedding-the-charts)
4.  [“Can’t you just use](#%E2%80%9Ccan%E2%80%99t-you-just-use-%3Cfigure%3E-for-the-charts%3F%E2%80%9D)
    
    [for the charts?”](#%E2%80%9Ccan%E2%80%99t-you-just-use-%3Cfigure%3E-for-the-charts%3F%E2%80%9D)
    
5.  [Final Words](#final-words)
6.  [Further Reading](#further-reading)

A few months ago I teamed up with [SuperFriendly](https://superfriend.ly/) to [create an accessible micro-site](https://www.sarasoueidan.com/work/khan-academy-2018-annual-report) for the [Khan Academy 2018 Annual Report](https://khanacademyannualreport.org/). The site is a very beautiful visual representation of Khan’s real-life impact on world education, their end-of-year financial reports, and more. By nature, the annual report contains a _lot_ of data and visualizations and charts to represent it. My mission was to make sure that the way this data is presented and implemented is as accessible to site’s visitors as possible, regardless of how they explore the site.

Data visualizations are a great way to make information stand out and sometimes a lot easier to parse and understand. But they also come with their own accessibility challenges that you need to be aware of.

![An example of a chart from the Khan Academy 2018 Annual Report. Screenshot.](https://www.sarasoueidan.com/assets/images/work/khan-academy/khan-academy-chart.png)

[The Khan Academy annual report](https://khanacademyannualreport.org/) represented all of the main data showcasing the impact they had on world education using different kinds of charts — simple and complex.

When it comes to visualizing data on the Web, SVG is the most used format. It is perfect for creating data visualizations because it comes with all the elements needed to create the shapes used to represent information. Because SVG is an XML format, similar to HTML, it comes with a lot of tags to represent different kinds of elements, mostly shapes. We have [elements for creating basic shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes) such as `circle` s, `ellipse` s, `rect` angles, `polygon` s, `polyline` s, `line` s, and more complex `path` s, all of which are used to draw all kinds of data charts and visualizations.

And often times, these charts and visualizations are also animated and interactive; and SVG provides us with the ability to animate and interact with the images we create with it — using CSS and JavaScript.

But SVG data visualizations are, at the end of the day, SVG _images_. This means that when a screen reader comes across one, it is likely going to announce it the same way it would announce any image: as an image, with an accessible name (because I’m assuming that the image _does_ have an accessible name provided in the `alt` attribute). This, in turn, means that the screen reader is not going to announce the content presented _inside_ the chart to the user by default. It is only going to announce whatever accessible name we provide it with. Making sure it announces the content inside the image is something that requires a little more work on our side.

### How accessible _are_ SVG data visualizations & charts?

Albeit being a perfect candidate for _visually_ representing information, SVG is not equipped with the semantics needed to convey _the content_ of that information to the user.

In [her article about creating accessible line graphs with SVG](https://tink.uk/accessible-svg-line-graphs/), Léonie Watson says:

> “SVG is often used for data visualisation, but because SVG lacks the semantics to express structures like bar charts, line graphs, and scatter plots, the content is difficult for screen reader users to interpret.”

Léonie wrote a few articles about making content inside SVG accessible that I will link to at the bottom of this article. The concept in all of them is the same: use some of the available ARIA roles to modify the semantics of SVG elements to be announced to screen readers as something other than what they are.

> SVG has no native semantics for representing structures like tables, but ARIA1.1 introduces a number of roles that can be used to polyfill the necessary semantic information. — Léonie Watson, [Accessible SVG Tables](https://tink.uk/accessible-svg-tables/)

For example, in her article, she uses the ARIA table attributes to announce a visual line graph as a table to screen reader users, which makes it possible for them to announce the data inside those tables to their users as well. This is possible because a table is often times an appropriate alternative way to represent the information in a line graph.

But Léonie finally notes (and emphasis is mine here) that:

> “The state of SVG accessibility support in browsers and screen readers is still highly inconsistent, even when ARIA is used to polyfill semantic information.
> 
> The upshot is that this technique is enough to make the primary SVG content more screen reader accessible \[…\] but it isn’t enough to make it completely so. For this (and many other good reasons), **it’s a good idea to provide an alternative view of the information**, for example by providing both a graphical and a tabular view of the content”

Personally, I’d avoid hacking my way around making an SVG chart accessible using ARIA roles. Most of the charts in the Khan Academy annual report were more complex, so using ARIA roles to change their semantics would not only prove to be counter-productive, but also risky, especially given how inconsistent screen reader and browser support is, and how important those charts are for the site’s visitors.

So, I chose the alternative view of the information route. And with all the different SVG embedding techniques available to use, SVG makes all kinds of fallbacks easy to implement.

### Choosing the most appropriate SVG embedding technique

There are 6 ways to embed an SVG on a Web page. Choosing the most appropriate one highly depends on your requirements and what you need the SVG to be capable of _and_ the kind of fallback that you need.

-   For data visualizations and infographics, it’s usually best to provide the plain text (or table) version of the content of the image as fallback. Since that text fallback is likely to be more than one or two sentences long, we need to embed the SVG using an embedding technique that caters for that.
-   We were also planning on animating the charts had the project timeframe allowed it. This means that the embedding technique also needs to allow that.
-   _And_ I know that we will need JavaScript for the animation, which also narrows down my embedding options further.

`<iframe>` , `<object>` and inline `<svg>` all tick all of the above boxes.

I’m not a big fan of `<iframe>` s, and `<object>` already gives me everything I need that `<iframe>` does, so, out of these two, I always choose `<object>` .

In addition to the above requirements, I had a couple of other considerations in mind:

-   we have a _lot_ of charts, especially on the [leveling the playing field](https://khanacademyannualreport.org/leveling-the-playing-field/#introduction) page,
-   and some of those charts are quite larger than the others. So I’ll want to keep page load and performance in mind.

If I were to embed the charts inline, they would “pollute” my HTML, and would not be cached unless the whole page is. That’s not ideal. Whereas an `<object>` would reference an external SVG image which, after the first request, would then be cached, making subsequent visits faster.

Also, on a more design-related note: I was working with SVG images exported from Adobe Illustrator, which tends to repeatedly create and use the same IDs and CSS class names for the images it exports. If I were to embed all of the images inline, the IDs and class names would clash and I would need to spend time I didn’t have to go over each SVG and provide it with unique class names to avoid the style inheritance nightmare, because, by default:

> Styles within an inline `<svg>` are not scoped to it.

This means that if you have two inline `svg` s on the page, the styles from the second SVG in the DOM order will override the styles in the first one for elements with shared class names.

And last but not least, I love the clean and uncluttered way that `<object>` enables me to provide text fallback for my SVG images: simply place the text fallback in between the opening and closing `object` tags, and that text will be displayed wherever SVG is not supported and/or whenever the SVG fails to load.

So, `<object>` it is.

### Embedding the charts

The initial base code for one of the simple charts would then look like this:

```
<object    type="image/svg+xml" data="/images/long_beach.svg">        <p>Khan Academy math usage for 30 minutes per week proved to            improve more than 5,000 Long Beach students scores by 2 times            in the Smarter Balanced Assessment.</p></object> 
```

This was just the base markup, but I was curious enough to check how it would be announced by a screen reader. I’m on macOS so I usually test my work with VoiceOver (VO) on Safari.

VO announced the chart as a frame, and used the file name of the SVG (in this case `long_beach.svg` ) as the accessible name for it. Ouch.

I was expecting the random name situation since my markup doesn’t yet include a label for the image, but I didn’t know how an `object` is usually announced. I was also curious if VO would _somehow_ recognize or find the fallback text and announce it. It didn’t. Now, it was time to start “fixing” the situation.

I want my chart to be announced as an image to start, so I needed to modify its semantics using ARIA `role` . To give it an accessible name, I used `aria-label` :

```
<object    role="img"     aria-label=“Khan Academy Math usage level in Long Beach. Chart."    type="image/svg+xml" data="/images/long_beach.svg">        <p>Khan Academy math usage for 30 minutes per week proved to            improve more than 5,000 Long Beach students scores by 2 times            in the Smarter Balanced Assessment.</p></object> 
```

With these two attributes added, VO communicated my chart as an image, and used the label I gave it as its accessible name. Great.

But a visitor using VO would now know that there is a chart showing Math usage levels in Long Beach, but they would not be able to access the data inside that chart.

Since I already have a text fallback clearly describing the data in the chart right there in my markup, I thought I could use that instead of try to communicate the same content in a second way. That text fallback was not being exposed to my screen reader. In other words, it was _hidden_ from screen readers.

But I already know that I can expose hidden content to my screen reader to announce if I reference that content inside of `aria-labelledby` . I’ve used this in [my previous article](https://www.sarasoueidan.com/blog/accessible-icon-buttons) to provide a visually-hidden accessible label to an icon-only button. So it makes sense that I’d be able to do the same using `aria-describedby` .

There are several reasons why I’d want the image’s text content exposed using `aria-describedby` not `aria-labelledby` :

-   `aria-labelledby` is used to provide an accessible label to an element. My image already has one that I have provided in `aria-label` .
-   The text content is used to _describe_ the (content of) the image.
-   An accessible name (label) should be short and succinct. A description is usually longer, especially (and particularly) in the case of text (or table!) provided for charts and visualizations.
-   And, last but not least, I want the text content to be announced after the image and its accessible name are. That’s exactly what `aria-describedby` does.

> There is a major difference between the way the content referenced in `aria-labelledby` is announced versus that referenced in `aria-describedby`. The accessible name is announced _before_ the image’s role is announced (in VO, at least); the description is announced _after_ the image’s role, **with a short pause preceding it**.

That’s exactly how I want my text to be announced. So, with all that taken into account, the final code for my chart looks like this:

```
< object    role="img"     aria-label=“Khan Academy Math usage level in Long Beach. Chart."    aria-describedby="long_beach_desc"    type="image/svg+xml" data="/images/long_beach.svg">        <p id="long_beach_desc">Khan Academy math usage for 30 minutes per week proved to            improve more than 5,000 Long Beach students scores by 2 times            in the Smarter Balanced Assessment.</p>< /object> 
```

This works very well, including for images that have longer descriptions. Of course, we made sure (thanks, Jessi) that the descriptions were as concise and succinct as possible, so the user is not overwhelmed with long announcements but would still get a very clear and accurate text version of the information provided in each chart.

### “Can’t you just use `<figure>` for the charts?”

I got this question a couple of times after speaking about my implementation choice above — once during a workshop, and once after a talk.

I’m guessing that the idea here is that you would implement the SVG chart in an `img` inside a `figure` and use the `figure` ’s `figcaption` to provide the text alternative of the chart’s content to screen reader users. I assume the suggestion would be to hide the figcaption in this case visually (because we don’t show it visually, of course) and make it available to screen readers only, using a utility class such as `sr-only` .

```
< !-- This is what you should NOT do.--> < figure>     <img src="/path/to/chart.svg" alt="ACCESSIBLE_CHART_TITLE" />    <figcaption class="sr-only">        <p>Here goes the text that describes the information inside the chart.</p>         <p>Note that this text could be a couple of a few paragprahs long.</p>        <p>It might even be appropriate to represent the data using a table!</p>    </figcaption>< /figure> 
```

```
/*  * Utility class to hide content visually while keeping it screen reader-accessible. * Source: https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html  */.sr-only:not(:focus):not(:active) {  clip: rect(0 0 0 0);   clip-path: inset(100%);   height: 1px;   overflow: hidden;   position: absolute;   white-space: nowrap;   width: 1px; }
```

This approach has more than one issue.

-   I didn’t choose `<figure>` because I excluded all SVG embedding options that don’t allow the SVG charts to be animated. `<figure>` is static — meaning that it won’t allow the would-be SVG `img` inside of it to be animated.
    
-   I also didn’t consider `<figure>` as an option because a `figure` is, by definition, meant to be a meaningful wrapper for a piece of content that is relevant to the current document, but not vital to its understanding.
    

> \[The `figure` element\] can thus be used to annotate illustrations, diagrams, photos, code listings, etc, that are referred to from the main content of the document, but that could, without affecting the flow of the document, be moved away from that primary content, ...
> 
> — [HTML5: Edition for Web Authors](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-figure-element.html)

Khan Academy’s annual report charts _are_ vital to the understanding of the page they’re in, and _cannot_ be removed from the primary document without affecting it. The data inside these charts _is_ the meat of the annual report.

So, as far as semantics are concerned, `figure` is not an element suitable to represent these charts.

-   The `figure` ’s `figcaption` is used by screen readers as **the accessible name** of the \_ `figure` \_. As I mentioned earlier, the text fallback for the charts is _not_ meant to be used as a name (label), and it should be announced as a _description_, not a name.

Furthermore, the markup for the figure would have to be very dirty even if using it _were_ possible, because the text that goes in the `figcaption` needs to be provided inside an `aria-label` on the `figure` alongside a `role` attribute for certain browser-screen-reader combinations to even announce `figure` as it is intended to be announced; and this brings us again to the “but the text inside `figcaption` is not even a label for the `figure` element” argument…

My friend [Scott O’Hara](https://twitter.com/scottohara) has [a wonderful article](https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html) about `figure` and `figcaption` detailing how to use and _not_ use them, and how to ensure the best cross-browser and screen reader compatibility. I highly recommend checking it out.

When it comes to accessibility, semantics matter _a lot_. Learning about an element’s semantics and proper usage helps us make better informed decisions as to which element to use when.

### Final Words

I had great fun working on the Khan Academy annual report, and I learned quite a bit in the process. Khan Academy’s mission is to provide free education for everyone everywhere. In other words, they are working to make world-class education _accessible_ by everyone. The least I could do is to make sure the product I helped build for them was just as accessible by everyone, regardless of their context and abilities. I’m quite proud of the work we did. And if you could use my help building better, more accessible products, [get in touch](https://www.sarasoueidan.com/contact/).

And if you want to be the first to know when the next article comes out (hint: there will be more like this one), you can [subscribe to my blog’s RSS feed](http://sarasoueidan.com/blog/index.xml).

Thank you for reading.

### Further Reading

-   [Inclusively Hidden](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html)
-   [How do you figure?](https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html)
-   [Accessible SVG Tables](https://tink.uk/accessible-svg-tables/)
-   [Accessible SVG Line Graphs](https://tink.uk/accessible-svg-line-graphs/)
-   [Accessible SVG Flowcharts](https://tink.uk/accessible-svg-flowcharts/)

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.