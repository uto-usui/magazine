---
title: "With Figma’s new SVG Exports, less = more"
source: "https://www.figma.com/blog/with-figmas-new-svg-exports-less-more/"
publishedDate: "2018-08-15"
category: "design"
feedName: "Figma Blog"
---

Here’s one big lesson we’ve learned since [launching collaborative design tool Figma](https://www.figma.com/): when it comes to SVG Export, less is more. For a long time, we stuck as much information as possible into our SVG files, hoping it would help other tools render and import designs accurately.

Fueled by feedback from our community, we’ve had a change of heart and have been gradually tweaking the Export format over the past few months. As our [release note junkies](https://releases.figma.com/) have noticed, our SVGs are now simpler, more compact and compatible with more tools (like Android Studio). Read on for a quick primer on SVG and details about what we changed.

## [Why tools render the same SVGs so differently](#why-tools-render-the-same-svgs-so-differently)

SVG — which stands for Scalable Vector Graphics — is an increasingly popular image format for 2D vector graphics. It emerged in 2001 as an open specification aimed primarily for use in web browsers. Unlike traditional bitmap image formats like JPG and PNG that become blurry when resized, SVG is designed to always remain crystal clear.

That’s because SVGs are effectively instructions describing how to paint an image from scratch while bitmap images are static snapshots of the final result. SVG is perfect for assets like logos and icons on the web, where they might show up anywhere from a huge monitor to a high resolution retina screen on a phone.

> Here’s the rub though: there’s no standardized way of converting the SVG markup to pixels on the screen.

Here’s the rub though: there’s no standardized way of converting the SVG markup to pixels on the screen. Most tools have their own custom SVG importers or renderers and the quality of these implementations varies widely. The SVG specification is also sufficiently complex that most tools only understand a subset and have bugs even when dealing with the subset that they claim to support.

For example, SVG has a nifty feature that allows you to define instructions in a `defs` block and reference them repeatedly with the `use` element. As we learned the hard way, Android Studio does not support this in most cases.

In addition to choking many importers, our complicated and extraneous markup also bloated the file size and made the output difficult to digest for humans. Many of our users had resort to post-processing with tools such as SVGO and svgito or, even worse, by manually cleaning up the file by hand. 😬😬😬

## [From Figma’s SVG naïveté… to our new pragmatic approach](#from-figma-s-svg-na-vet-to-our-new-pragmatic)

People have been asking for smaller, simpler SVGs from Figma for a long time. We resisted making the change because we were hoping that SVG would become the de facto data transfer format between design tools. In this utopia, you could easily spread your design workflow across different design tools depending on what was the best fit for each stage.

We now accept that was a bit of pie-in-the-sky naïveté, and our new SVG Exporter takes a more pragmatic approach.

To understand the improvements, let’s start with a seemingly innocent example: a frame containing a single black rectangle with a grey inside stroke.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAy0lEQVQ4y82UTQrEIAyFxSPV0/R8vYBX8RgKbopum5knzaCDdpRamMVDTeLHC/6IGCPd1IExhHBA4jHge/EZR3TpkKH5ugHJa/odttrscpgD930n7z0558haWwgx5FDDwBPeBmKDMYa01rRtWyHEkEPNTyBD4QIb13UlpRQty5KEOWLIoSZr9RqI1uAGACklCSGSMEcMOdQMA+GKYSzE/gc4reVphzL92jx2se8+vYN1PvRiXVNlD4Pr/+HA11X8i8lhy0WvvjubDnwBCbOTi3Zika4AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/87440f826b54b4f49df2068222052e45d7739720-200x200.png?w=804&h=804&q=75&fit=max&auto=format)

### [With our old SVG Exporter, we generated this embarrassing novel:](#with-our-old-svg-exporter-we-generated-this)

markup

```
<svg width="100" height="100" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Frame</title>
  <desc>Created using Figma</desc>
  <g id="Canvas">
    <clipPath id="clip-0" clip-rule="evenodd">
      <path d="M 0 0L 100 0L 100 100L 0 100L 0 0Z" fill="#FFFFFF" />
    </clipPath>
    <g id="Frame" clip-path="url(#clip-0)">
      <g id="Rectangle">
        <use xlink:href="#path0_fill" transform="translate(10 10)" />
        <mask id="mask0_outline_ins">
          <use xlink:href="#path0_fill" fill="white" transform="translate(10 10)" />
        </mask>
        <g mask="url(#mask0_outline_ins)">
          <use xlink:href="#path1_stroke_2x" transform="translate(10 10)" fill="#CCCCCC" />
        </g>
      </g>
    </g>
  </g>
  <defs>
    <path id="path0_fill" d="M 0 0L 80 0L 80 80L 0 80L 0 0Z" />
    <path id="path1_stroke_2x" d="M 0 0L 0 -10L -10 -10L -10 0L 0 0ZM 80 0L 90 0L 90 -10L 80 -10L 80 0ZM 80 80L 80 90L 90 90L 90 80L 80 80ZM 0 80L -10 80L -10 90L 0 90L 0 80ZM 0 10L 80 10L 80 -10L 0 -10L 0 10ZM 70 0L 70 80L 90 80L 90 0L 70 0ZM 80 70L 0 70L 0 90L 80 90L 80 70ZM 10 80L 10 0L -10 0L -10 80L 10 80Z" />
  </defs>
</svg>
```

After a lot of hard work, we’ve managed to squeeze all of that down to a tweet:

markup

```
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="15" width="70" height="70" fill="black" stroke="#CCCCCC" stroke-width="10"/>
</svg>
```

Let’s go through the larger changes one by one:

**Primitives**

For simple shapes such as rectangles and circles, we now use the easily understandable SVG shape primitives instead of cryptic paths.

markup

```
<path d="M0 100V0H100V100H0Z"/>
```

to

markup

```
<rect width="100" height="100"/>
```

**Inside/Outside Strokes**

Because SVG only supports center strokes, design tools have had to devise various workarounds to simulate inside and outside strokes. Previously, we did this by using center strokes with a doubled stroke width. That is visually equivalent to having both an inside and outside stroke so we used a `mask` to hide the unnecessary half. This approach greatly inflated the file size and complicated the markup.

We now try to adjust the points in the path such that the visual result will resemble an inside or outside stroke while using center strokes with the original stroke width. For example, a rectangle with an inner stroke can be represented as smaller rectangle with a center stroke.

markup

```
  <mask id="path-1-inside-1" fill="white">
<path d="M0 100V0H100V100H0Z"/>
</mask>
<path d="M0 100V0H100V100H0Z" fill="#C4C4C4" stroke="black" stroke-width="2" mask="url(#path-1-inside-1)"/>
```

to

markup

```
<path d="M99.5 99.5H0.5V0.5H99.5V99.5Z" fill="#C4C4C4" stroke="black"/>
```

**Minimal Markup**

We no longer output purely informational elements like `title` and `g` or attributes like id and version.

We also added some smarts to avoid markup when they have no effect. For example, we used to always output a `clipPath` for clipped frames, but now we do so only when clipping is actually necessary.

Finally, we now inline SVG elements where we previously had a `use` reference to a deduplicated element defined within the `defs` block. Even though we lost deduplication, it turns out that the simplified structure actually reduces the overall file size in most cases. This is especially true when the SVGs are compressed with something like gzip.

**Export Options**

The new SVG Export defaults are optimized for the most common usecases. For example, most of our users will not miss the id attributes, but for those of you that do, we went ahead and added an option. We also have an option to control the markup for strokes and text objects.

We hope Figma’s new short ‘n' sweet SVGs have been treating you well. If you have feedback, please let us know in [our community on Spectrum](https://spectrum.chat/figma)!