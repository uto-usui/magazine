---
title: "Media Queries of the Future!"
source: "https://una.im/media-queries-of-the-future/"
publishedDate: "2014-10-16"
category: "css"
feedName: "Una Kravets"
---

Published on October 16, 2014

Media queries are infants. The first Media Query public working draft was published in 2001, and they became a W3C recommendation after [browser support](https://caniuse.com/#search=media%20queries) increased in 2012. 2012! **That’s TWO years!** Hard to believe, considering how essential they’ve become in our web workflows today. Media queries are most often used to build flexible [web designs](https://mediaqueri.es/) which adapt to various browsers properties. Here are some [pointers](https://developers.google.com/web/fundamentals/layouts/rwd-fundamentals/use-media-queries?hl=en) from the smart people at Google.

### Media Query Capabilities

If you’re familiar with building responsive websites, you’re probably familiar with something like: `@media screen and (max-width: 700px)`, but did you know that you can use media queries to specify how to handle **paged braille printers** or **TVs** or how to use **[logic](https://css-tricks.com/logic-in-media-queries/)** in your media queries? Yeah, they’re pretty rad.

Here’s a list of current media types you can target:

-   `all` — all the media types below
-   `braille`\* — braille tactile feedback devices
-   `embossed`\* — paged braille printers
-   `handheld`\* — handheld devices like mobile phones
-   `print` — printed material
-   `projection`\* — projected presentations
-   `screen` — color computer screens
-   `speech` — speech synthesizers
-   `tty`\* — teletypes, terminals, and other devices with limited display capabilities
-   `tv`\* — televisions and television like devices

\* = deprecated as media **types**, but can be used similarly as media **features** — read on)

And this is what you can specify (expressions) for each of those media types:

-   `width` — width of the current window
-   `height` — height of the current window
-   `device-width` — width of the device
-   `device-height` — height of the device
-   `orientation` — either landscape or portrait
-   `aspect-ratio` — aspect ratio of the current window
-   `device-aspect-ratio` — aspect ratio of the device
-   `color` — number of color bits per color component
-   `color-index` — number of available colors on the device
-   `monochrome` — number of bits per pixel in a monochrome frame buffer
-   `resolution` — resolution of the device
-   `scan` — either progressive or interlace
-   `grid` — is the device grid-based?

This list was stolen from [here](https://cssmediaqueries.com/what-are-css-media-queries.html), by the way.

### Responsive Beyond the Browser Size

Media queries are most often used for their screen size properties to allow for **“Responsive Web Design”**, or **RWD**. But viewing “responsive design” as just a means for detecting screen sizes and browsers is narrow-minded. Responsive principles go far past the browser and stretch into the real world — how can the products we design respond to a users location, or the weather, or the lighting? How can we really personalize experiences for our users?

Well media queries are helping us get one step closer! As devices are able to detect more, browsers are keeping up to date with these capabilities.

The [Media Queries 4](https://dev.w3.org/csswg/mediaqueries-4/) spec brings insight to technological capabilities that are coming up soon (this is based on the Editor’s Draft, October 10, 2014).

### Media Features vs Types

One important distinction to note is that all of the **media types**\* listed above will eventually become deprecated and replaced with more specific **[media features](https://dev.w3.org/csswg/mediaqueries-4/#mq-features)**

Media features are always wrapped in parentheses and combined with the `and` keyword rather than being separated with semicolons.

Here’s an example from the spec: {% highlight sass %}(color) and (min-width: 600px) {% endhighlight %}

### @media (light-level) : dim | normal | washed

The `light-level` media feature is for detection **ambient lighting**. _(Ambient is such a fun word)_.

Values:

-   `dim` — lighting in a dim environment (i.e. nighttime)
-   `normal` — lighting in the “ideal screen range”
-   `washed` — lighting in an overly bright environment (i.e. broad daylight)

Here’s an example: {% highlight sass %} // change text coloring due to lighting for better legibility

@media (light-level: dim) { body { background: dimgrey; color: white; } }

@media (light-level: washed) { body { background: white; color: black; font-size: 2em; } } {% endhighlight %}

### @media (pointer) : none | course | fine

The `pointer` media feature detects the **presence and accuracy of a pointing device**.

Values:

-   `none` — there is no pointing device present (i.e. TV, printer)
-   `course` — the primary input mechanism is of limited accuracy (i.e. Nintendo Wii, Kinect, Google Glass)
-   `fine` — the primary input mechanism is an accurate pointing device (i.e. stylus, mouse, touchpad)

Here’s an example: {% highlight sass %} // Make input larger for inaccurate pointing devices

@media (pointer:coarse) { input\[type=“text”\] { font-size: 3em; padding: .5em; } } {% endhighlight %}

### @media (hover) : none | on-demand | hover

The `hover` media feature detects the ability of the primary pointing mechanism to hover over elements.

Values:

-   `none` — there primary pointing mechanism can’t hover
-   `on-demand` — the user can hover but it requires significant action (i.e. touch screens)
-   `fine` — the primary pointing system can easily hover

\* If different input devices have different characteristics, there are also `any-pointer` and `any-hover` media features

Here’s an example: {% highlight sass %} //If hover is difficult, display the menu differently

@media (hover:none) and (hover:on-demand) { .menu { display: block; position absolute; … } } {% endhighlight %}

### @media (update-frequency) : none | slow | normal

The `update-frequency` media feature is used to query the ability of the output device to modify the appearance of content once it has been rendered.

Values:

-   `none` — once rendered, the layout will not update (i.e. printed materials)
-   `slow` — the layout may change dynamically but not smoothly (i.e. e-ink displays)
-   `normal` — the output device is not constrained

Here’s an example (stolen right from the spec):

{% highlight sass %} //If a page styles its links to only add underlines on hover, // it may want to always display underlines when printed:

a { text-decoration: none; }

a:hover, a:focus { text-decoration: underline; }

@media (update-frequency: none) { a { text-decoration: underline; } } {% endhighlight %}

### @media (scripting) : none | initial-only | enabled

The `scripting` media feature detects **whether or not Javascript is enabled** in the browser.

Values:

-   `none` — scripting is not supported by the user agent, or innactive
-   `enabled` — scripting is supported and active
-   `initial-only` — scripting is supported on initial page load, but not afterwards

This section also borrowed heavily from the these [slides](https://www.slideshare.net/yiibu/the-future-of-mediaqueries), which break down the information from the spec really well.

Remember, it has only been 2 years since the general adoption of media queries and responsive web design. If this is just the beginning, then where are they heading next?