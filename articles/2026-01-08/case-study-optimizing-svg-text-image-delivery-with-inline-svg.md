---
title: "Case Study: Optimizing SVG Text & Image Delivery with Inline SVG"
source: "https://www.sarasoueidan.com/blog/optimizing-svg-delivery-with-svg/"
publishedDate: "2018-01-11"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [The Challenge](#the-challenge)
2.  [The Solution](#the-solution)
3.  [Final Words](#final-words)
    1.  [Footnotes](#footnotes__title)

I love when I’m pushed to think of creative techniques when tackling design and dev challenges on my client projects. And it so happens that [the new Smashing Magazine design](https://smashingmagazine.com/) released this year was one of the more (fun and) challenging projects I’ve worked on. And one of the challenges I had to tackle was delivering three fairly complex SVG images in a performant, accessible way.

I was the front-end developer (and, at times, the designer) on the project. I’ve written [a case study](https://www.sarasoueidan.com/case-studies/smashing-magazine/) about the project earlier this year. But the case study was more about the design aspect of the project than it was about the development of it. I’ve talked about the development part [at a few conferences during the last year](#smashing-case-study-videos). This is the first in a series of articles going over some of the tips and tricks I mentioned in those talks.

### The Challenge

The new Smashing Magazine offers, as a replacement to ads on the site, three new types of memberships. [The Membership signup page](https://www.smashingmagazine.com/membership) shows these three membership options, with a fairly complex SVG illustration for each one.

The following image shows the three illustrations I worked on. Even though the content of these illustrations has changed since I worked on the project, the complexity of the images as well as the technique used to embed them remained unchanged.

![The (old) Smashing membership illustrations.](https://www.sarasoueidan.com/assets/images/smashing-membership-illustrations.png)

The (old) Smashing membership illustrations.

Each of these illustrations contains the title/name of a membership. There are no actual titles in the HTML to represent these memberships otherwise, which means that the text in each image _is_ the title of that particular membership. This, in turn, means that **this text needs to be as searchable, selectable and accessible as real (HTML) text**.

In other words, the text inside the images needs to remain real text and not be converted to outlines, for starters. SVG text — wrapped in `<text>` elements within an `<svg>` — is searchable, selectable and accessible by default. So we have a great start there.

And since the text inside each image is real text, it needed to be styled like the rest of the text — more specifically, the headlines — on the site.

Using `font-family`, you can apply a font face to SVG text the same way you would apply a font face to text in HTML. And I wanted the font styles to be applied in the main style sheet, not in a seperate style sheet referenced within each SVG image.

So, ideally, these three images would be embedded inline in the page. This would give us both the styling from the main style sheet as well as flexibility to do pretty much anything else we may want to do with the text otherwise.

But inlining the illustrations was not as simple as it sounded. Each illustration was complex enough to make the size of it so large that adding it inline to the HTML was simply not an option. The following recording shows the size of _one_ of these illustrations.

![](https://www.sarasoueidan.com/assets/images/smashing-membership-illustration.gif)

Inlining three times the amount of code shown in the above image was definitely not an option. But I still wanted the text inside those images to be inlined. So, what’s the best way to get the best out of SVG: searchable, selectable and accessible text, a cacheable illustration (hence better performance), and clean code?

### The Solution

There are seven different ways to embed an SVG on a Web page. Choosing which one to use depends largely on the case at hand and what your project requirements are. But something that I frequently mention when talking about embedding techniques is that you may not have to choose _one_ technique. In other words, **you can choose to embed an SVG using more than one embedding technique at the same time!**

SVG is a document format, not just an image format. Thus, referencing external images inside an `svg` document is possible just like it is in HTML. So, why not take this a step further and reference _an SVG_ image from within an SVG document?

Since I wanted the text to be inlined and the rest of the image to be external and cacheable, and since the nature of SVG allows me to do pretty much anything with its contents, I thought “Why not split each of these images into separate parts: text and illustration?”, and then use an inline `<svg>` to wrap and stitch these two parts together?

In other words, an inline `<svg>` in the page would contain the `<text>` of the illustration, and then I’d reference the rest of the the illustration using an `<image>` element, within the same inline `svg`. So, in essence, I’d be working with SVG content in a similar way to HTML text and images. We use an `<svg>` document to embed an SVG image plus its accompanying text. Then, using some tweaking, I’d position the inline text on top of the illustration so that the end result would look like the original image.

So, I took each of the three images and removed the text content from them. That left me with three illustrations with no titles.

Then, for each illustration, I embedded that illustration within an inline `<svg>` that also contained the text for that illustration. The code looked something like this:

```
<svg width="318.029" height="267.921" viewBox="0 0 318.029 267.921" aria-describedby="title">	<title id="title">Supporter Plan</title>	<image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/plan--supporter--no-text.svg" x="0" y="0" width="100%" height="100%"></image>	<text x=173" y="50" font-size=".8em">Supporter</text></svg>
```

Using this solution, I achieved all three main goals I needed:

1.  The complex illustration is no longer embedded in the HTML. This means **the HTML code remains clean and uncluttered.**
2.  **The illustration is cached upon subsequent requests**, which is a win for performance.
3.  The title for each plan is real, inline text, and is therefore **searchable, selectable and accessible**.

Then, to finish this off, the text inside the SVG representing the title for the respective plan was styled further in CSS:

```
svg text {	font-weight: bold;	text-transform: uppercase;	font-family: $mija;}
```

And… that’s pretty much it.

### Final Words

Replacing the old illustrations with new ones was easy and fast. I got three new illustrations without text in them, and referenced those by simply changing the path to the images in the inline `<svg>`s, and then tweaked the `x` and `y` for the `<text>` of each one to position it correctly in the new images. The styles for the text and everything else was left untouched.

**Sometimes you don’t have to choose just _one_ embedding technique to embed an SVG.** Keeping the document nature of SVG in mind opens doors to creative solutions that might otherwise not come to mind at first glance. SVG is, after all, both a document and an image, and that’s where most of its power really comes from.

I hope you found this tip useful. Don’t forget to subscribe to the RSS (link in footer below) to receive the latest and new articles in your RSS reader as soon as they’re out.

Thank you for reading.

#### Footnotes

1.  There is [a video recording](https://vimeo.com/214427831) of me going over ths particular trick if you're more into listening than reading. [↵](#smashing-case-study-videos-ref)
    

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.