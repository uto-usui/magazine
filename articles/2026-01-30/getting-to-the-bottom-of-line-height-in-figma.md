---
title: "Getting to the bottom of line height in Figma"
source: "https://www.figma.com/blog/line-height-changes/"
publishedDate: "2019-04-25"
category: "design"
feedName: "Figma Blog"
---

At Figma, we try to strike a balance between historic design principles, forged through the centuries, and new practices. Today marks another step on that journey: we’re altering the way we handle text. Figma will now distribute extra line height above and below letters, and it will measure line height in a more modern way. It’s a purely optional change — none of your existing files will change in any way, and you can choose whether to update old text at your own pace.

These modifications may seem simple; our path to get there was anything but. To find the right solution for our users, we dove into the beautifully complex world of type and vertical alignment, studying how laying out text evolved since Gutenberg, and how computers — first graphical user interfaces, then the web — further complicated the issues.

This historical baggage — and the fact that Figma is used in so many different ways — made it challenging to come up with one ideal solution. We did a lot of research and testing, and we're excited to introduce what we came up with.

If you’d like to get straight to the details, you can [jump to them](https://www.figma.com/blog/line-height-changes/#changes-to-figma) in this post or read about them in our [support doc](https://help.figma.com/hc/en-us/articles/360040449893-Line-height-behavior). Alternatively, you can stay here and join me on our journey through type history and into the modern times. We’ll chat with the creators of CSS, shed a tear for OS/2, and hopefully get a better understanding of all the changes happening to Figma today.

## [The early centuries of typesetting](#the-early-centuries-of-typesetting)

Things were simpler in the days when type was made out of metal. There were two main roles — type designer and typesetter — and their work was constrained by the rules of the physical universe.

It also helped that by late 1800s, the type industry had figured out most of the basics. A life of a typeface would start on paper, with a type designer spending weeks or months sketching all the necessary letterforms. After they were done, the drawings of the typeface were turned into a font: actual physical blocks of lead.

You needed to buy one or more such blocks for each letter. You also needed to buy additional metal blocks for different sizes of text. But font size wasn’t defined as the size of the letters — it was the height of the metal block holding them, expressed in a unit known as point (each point was a 1/72 of an inch, or about 0.4mm). The block height was known, but within it, the type designer could do whatever they wanted: Fonts of the same size could be bigger or smaller, their baseline (the line each letter “sits” on) placed higher or lower, and so on.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACEklEQVQoz3WTzW8TMRDF8y8jVKgAcam4cuCKREupEB+lJEXtiariAEIgmpCiHrrdpCFJt0k3a3ttZ72J5MfYTkhAyuFpVvboefx+3orWGlqphfQKKbWqz86rUspWFBnKXIJlHCnLcSM0bvKgEUlIDaVIUoEzjixlSDOBVCiktE+yjHqk8sbBsDuS+NQWqMUKe5cF3ncM3l0a7HcKNAfOVGFEBj96AofnDNVIYq9dUK9BtWPs12SMISdDPyGdfjrUeHJmsF4vce/nBPdJt+tTrDcm+NDWyITEFdd4FRd4UDdYOymxVp/gFvVQtc/Px+ikcmHYysbY/22wHZd42TJemxclti8Mvl1pcIrERXDcL7BF689Irj6N6Dsy9qg7RsLmhjpcaUhXSrjCNWXolNBECdUsdxkql5HPzU3q5Pb74du6LHOlFoaKJhAZC4Fz6cN2QFzYuVpAEVwgWwLieuhAyz0UTVC0rbhnM2AS3zsMhxFHraVRpbBrBOaoVyBKFfIZlJN+joNYYrdV4G3bYJdEvf9CcW8oHmnsRAUeNQ02Tks8bE4IzhSPz0p87tFzmUFxZDeapYd1tzH1UO40JvZFtATFGXap+WPP4E07PJfXVHdid3qBX0O6qgxQviSF35uD2wrg7HFvjGu2NKGgjIYiQPgLhTQQIccAxT9ivz7XDM5/UKhx5e/mpWda2TP79bQlwPYPHPR4kj+PiWIAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/ba172b2ca24c4f613ce07008d95f4364913f1a7d-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

Four metal fonts with the same, 16pt font size. Notice some fonts take up more space than the others, and the baselines vary all over the place.

When the typeface was finished and the fonts made, the [type foundry](https://en.wikipedia.org/wiki/Type_foundry) that employed the designer would sell them to printing shops. Those, in turn, would employ typesetters, whose job was to lay out the metal blocks into words, then sentences, then paragraphs, then pages.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAOABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUDBgf/xAAgEAACAgICAgMAAAAAAAAAAAACAwEEABEFIRJBIiOh/8QAFgEBAQEAAAAAAAAAAAAAAAAABAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AW8XTWcAFZMqGI9dFrJrfCKNZimCAo70XucfWihagWsA+wdiUx2OIS5J1adO00f2cEeqtnhDF0+dImF7neGadXBLqymwM/Md94Zqf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/57b438029fbd920e33e121f209aafce776a5bd42-5098x3563.jpg?rect=1,0,5097,3563&w=804&h=562&q=75&fit=max&auto=format)

Typesetters could put lines of blocks immediately one after another, in a process called setting type solid, since it resulted in solid, unspaced blocks of lead. Usually, however, they inserted extra narrow strips of metal to space things out, let text breathe, and make it easier for the reader’s eyes to jump from one line to another.

Since the spacing strips were made of lead, the practice of adding that space was called leading (pronounced “ledding”). Here is an example of a 16-point type with 4-point leading, which gives us text with a combined line height of 20pt.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABoUlEQVQoz42TWUsbURSA/Y998qUUCi4FH/ogiNGaSIo/oLYgCH2SLKWJtWhSa0ujJlGwMUMk7q244KSZ5TK5d2j74NeZJDQGlcnDxznc5eMu5/RJqZBSPozjoOp1lK6jTBPVaKD8caWaUSl1o/zci976m77mYGuig+t2oi8wjC6hL3tQWHNcdI9rIbkyBRe/TM5rRit6XNXqWHqtd+HnHwbZI52PlTPeFSskChqxjRKJfJn45i7pze9UD09x2kIZdOWJ+CrhVI7J5BrjCyvNPJz6xvTiBpH0OjOJLLntMuJax7WtYOGT6CtG3sR4Pp9ibCHLi/c5xhNrRJYKhD/kicYyfC2WsJtCO1g4MJfi6eskz94uE1rZJZQpM5ouMPlJI5TVmMnssK4dI7x37En4ePUnj5Il+pf2GSxaDG8LBvIGw1s2Qx6hHYsvJwa29zk9Caf3XKY0h0hFEt3/w8uDv/+Jeswe/6Z46SAMC1eIYGHVdOnC6ObIVOiiQcMvcL9kbsvuE7pKEoRSrc2y3QC3TndX2Gq9Hmh3kWyfTHY6q0v4D+wAbG4ukN13AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/43620074e6380c1a080b58078537ff4af0ec0e73-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

Finding the right amount of leading was its own art. It needed to be different depending on the font sizes and lengths of lines. Even dealing with the same font size and identical amount of leading could make one font look cramped and another floating in space.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABRUlEQVQoz7WTW4+CMBCF+f//iygkxAjEBFEgoHjhLvo6sz0DJSxr9vKwDyfTDp1vTktrPJ9P/o1er5doPh5Fs0jG4uNb/dCMZpEMTLqu46ZpuG3bL3o8Htz3vazROazV66uqoqIoMB+AKDidThwEAe/3ew7DcNLxeOQ8zycICq/Xq+RutxuXZYkxJUmCPKnGAzCOY7Ztm03TZMuyROv1mh3H4SiKJjcAAAgDiMqdANFY5UixyMB2sizjzWbDq9VKwBCAyKVpKjB9LHB5Pp+/B2ILrusKCK4AQtxut9IMMOwEYADnDhWcDoeDxAl4uVx4t9sJyPM8Gfu+LxHFc+D9fheHOMO6rlFLOBY4FSD+8mhd3ACAMRzoIsA0EOcIA3A6OibUqLXDTwEQLpda3jedBwRNEMfrRJhP1+ZfLvZfnt6bZp+e3gc87IVOsTsKawAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/ea317cc50f5d580a8cdfc512ec8bcc5e4a36a4d6-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

On the left, one foundry brags that their baselines are finally consistent. On the right, an announcement of a new idea: font sizes expressed in numbers, rather than a completely arbitrary set of names. One of these problems remains unsolved.

It was a relatively simple system, with clearly defined roles and rules. The font came from the type foundry as a monolithic, unchangeable block, and line height could only be added, never removed. Yes, you could order a font with an unusual line height built in, but that was uncommon. (Any such font came with a discouraging name — “bastard type”.) Your job was to lay things down and space them to your heart’s content.

## [Enter pixels, enter problems](#enter-pixels-enter-problems)

Then computers ruined it all. As we transitioned from paper and metal to screens and software, typography inherited everything that computers have to offer — including bugs, incompatibilities, and updates.

Fonts were no longer solid blocks of lead; instead, they arrived as collections of numbers packed into files. A type designer or type foundry also had to prepare their fonts in different file formats, subject to the requirements of early graphical platforms — Windows, Macintosh, and now-forgotten [OS/2](https://guidebookgallery.org/guis/os2). (Plus, the platform’s rendering of fonts was sometimes quirky or buggy, and type foundries had to adjust for that, too.)

Not everything was horrible, of course. Computers gave both type designers and typesetters unprecedented amounts of freedom. Pixels were subject to few of the restrictions of the metal universe — things could overlap at will, or stick out of their once-rigid boxes. As a typesetter, you could add as much leading as you needed without requiring any actual lead. Alternatively, you could remove said leading. Even all of it, if you so desired.

In the physical world, a box needed to have actual minimal dimensions, since leading could only be added. But in digital type, the default line height of a font could be set to a completely arbitrary number – and it often became taller than font size and more comfortable to read (as opposed to setting things solid, which usually felt too tight).

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACe0lEQVQoz22S22sTQRTG+0/5og+CF9Qigqj44B8gQhHaJ0WUItQL3hAfLLYWW1v64Ju+iCjaxrYU0kta25imSc2lm8vuZi8zs9ndJPN5ZjelEXz4dpbdb35zzvmmTwgBwTkEY5E89S7+I/Wdxx7xr0fGq5Cc1EcPOA5DXW9Aq1vYbzDs2wIaqeIINFwBzgUYgUzTQrVmQtNt7Fv8wCd18ricwKQ+ZS6YHJ/zLt6lGcYyTYxnA7wlzeZ8rFQEbJdBdzjmiwzTaRfjaYGxHR9vdgJMZAP5teShYrFD4Kbu4VXax+BKiJsrLQyQbiRbuLUW4lOew7RclKmiqV0fQ6shBpKx53qyrVY5/tvDntEDzDc8fCz4mNgNMJWLTsUonT5JgGWNw3JUhQIJrYmZfID35Jmh6ifJP53z5VzZQ9XuadlmXJWMssmgdWdTIqnViGbII0VgO25ffddjSYvRjHkUThdIxgoFUtRMFGo2Cg2OguWhZB0A41B0w0KpRj6DoUj/lMgj6043lBjIkTM4PuwwvFx38XxD4NlWgCfbIUYzARY1FQpH3VbBMbxIcTzc9PF4K8QD0tPtQH4qNFVnh8Bk1YsCuLTQwpXFNi4utNGf6ODaUguzWaqSQik2hNqM/vk2Ts11Ih39LnFiriNH6ICs0dPycrWJwdUWLvzs4OpSDDxJG9QBUxkFdPCHgCNU0en5Ds6QziVi4PEfHTm87iNT70k5bXh4Te3dToW4uxHiDq1Day0M0/uXooBF91ABHxHwbBd2mTo5TwX0J9ryfqqJTM0lIIuBJg0+a3pI1T2s9+gX3c+yFae8R1dLzewYVXXkm4ygCk6dyHs9Ff4FzIxaiY8tdSEAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/a8d3b1c2002c2e6dfdd2a4d40c6a52353551d01c-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

Four digital fonts with 16pt font size and 100% (default) line height.

But getting used to the newfound freedoms took some time. Early graphic programs like Photoshop or QuarkXPress were still used to design for paper, where you had absolute control over fonts, and could measure and position everything with a lot of precision. As a result, they followed the same principles and the same vocabulary as print typography. A designer using Photoshop, for example, would still specify a 16-point type and then add 4 points of leading to it.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACOElEQVQoz2VSaVPiUBDM//8ZW26tZWltURISDjk0RDmEXYSFQExCEsIVEg75+npnHmph+aGrJzOpfj2HslqlGPwL8dRyUG8S2i7q3SnMng+zH6JOtfYkgjePsdsfcDwe8fb2JsExQXww5YTiOBH0fAsXlxVcXNVwcfOAnxkTl1oTl5T/oZr4pT/i6Y+FdZx8EXyHOGOh2LYPTavh+kaFqt1B1csSWrEKtVDBdSaHq98q6o8dLJebk+Dx090Xhwzl9dVHoVBFLqfBMB5wf19DpVxG+e4OeV1H9vYWWk5Hs9nFfL7Cntre7/c4HE5MENvtFrvdTlCOHU6Rz1eQydyScFEKZ7NZ4hzlMhSrqFbv0en+xXQaII5jbDYbiSRJyPVSeJ6HIAgE5U4Oy2WDBHSUSiXo5ErTNBSLRXqggFqthufnZwyHI4RhKAVnsxl838dqtcJisRC2bcNxHEHfQnHdEN3uAIPBEFyYTMYYj8fv8QT9fh+tVgsvLy9wXRfshuNOp8MiLCr4kfV6zSwUz5thNHIQRQtqI5HgVpIklW5Y1DAMmKYpnbbbbTQaDcmWZdFc5zw7nump5SCYo9ezyIlFwjb99EoiLsGTPBxaVO9RbSRds3uOmbltFmQDvBwpGMcp2OVkMgUviGfqOAEhlGzbDuUcObcoiiQzeJ48Q14KgZd0EuSj5FPY7fbfkKZbdiCdsBjHtAQWkfGHINd4luRUKGcH+g38WJqmn6fCrfE3x2fnI5fCYnyL/wHmxl1/tjVYYwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/8bbf1d888d3eef851d7b961c0ac08f8f563a6fa9-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

Type windows from early versions of Photoshop and QuarkXPress. Sharper-eyed among you might notice the leading numbers themselves are not aligned with the legends, hinting at the near future of alignment issues in the user interface.

Other programs did it slightly differently. Sometimes, instead of leading, they would ask you for line height (in this case 20 points). Or, you could instead say, “I want a line height of 100%”, and this would mean the font’s default line height as specified by the digital font designer — which could be 16 points, 20 points, or any other value.

Things evolved from there. As computer screens spread, they became a destination rather than a stopgap. More work was designed for screens themselves, and different needs arose. Particularly in user interface design, it became much more important to carefully center text vertically next to an icon, or an avatar — an issue that wasn’t as crucial in the world of print.

At the same time, some of the old traditions disappeared. Fonts and line heights started to be expressed more often in pixels, rather than points. Following the disappearance of lead, the word "leading" was slowly replaced with the more abstract term "line spacing." (Thankfully, no one thought of “pixelling” or “electroning.”)

All the competing font standards converged, too. The industry invented [OpenType](https://en.wikipedia.org/wiki/OpenType), the one unified type of font that could work everywhere. It was a bit of an illusion, though — inside the font file, there would still be [three different sets of values](https://glyphsapp.com/tutorials/vertical-metrics), and different platforms and programs would only pick one of these sets.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABRklEQVQoz5WS2W7FIAxE+f/fvLdVEhaDIa92xwEa1CqV+nA0LNZgY7tSipaS1ZSZtdb6X2RRcZuP+rl7PXxQIjNmUIeu1IdzlkXFvbekL7B70kRVqbRnMiBWSkaZCEVohGLtok+aAmlGIHP7g1MZGXIkZVTFIfV1IGF44ExwJq6lpKeRszb8Y5uKMlpe9vinxrXHhtiVyFTONDRGcec07JcIDoqLmxT7HRp2VkAjFo9cSiRjPQynkWEGZmh4f5tbDDK86CZXRSOR2zAEGNrLFrCarYYG7ts0nI/PBJDV2A/D1lBOuQNS/G2+ZmiZzSznH87Sgbs6aN3L6DKawARS7p2coAnXHZrChUfsN3KdYQZt7YKv6g+wdw7TjTVspHHHSB3ARguzljBaNqs/kEVhuDU9Ppru78GrE7aqGQNcciejigdkUfkC7guTL1KdVPcAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/28c14bde5cf4b55fb6461095a0aaaf45cf02240a-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

A font — P22 Johnston Underground — with three different sets of built-in metrics depending on the platform.

## [The web of lines](#the-web-of-lines)

Then in 1989, the web was born — and the challenges compounded.

People putting together the building blocks of the early web made two decisions that changed the nature of line height. First, they distributed the extra space that was once a strip of lead both above and below each line. They nicknamed the new system “[half-leading](https://www.w3.org/TR/CSS1/#the-height-of-lines).”

I reached out to the creators of CSS to understand the rationale behind the change. They explained to me that while [early proposals for web style sheets matched the print universe](https://www.w3.org/TR/WD-css1-951117.html), they had good reasons for deciding to go with half-leading. Namely, web’s text boxes had more responsibilities.

In the world of print or early programs, a text box only needed to hold the text inside it. The web asked it to do more. “I was aware half-leading wasn’t a traditional typographic concept,” mentioned Bert Bos, who worked on CSS1 in 1995 and 1996. "But the problem I had with adding leading only below the lines was what happened to a paragraph when you put a background behind it or a border around it.”

If leading appeared only at the bottom of such a box, that box would feel bottom-heavy and would require additional work to look good. Half-leading offered a way out of this new problem.

The other change CSS introduced? The 100% line height was redefined as “100% of font size.” Before, a font designer might have given a 16-pixel font a default line height of 20 pixels. But on the web, 100% line height of a 16-pixel font came to be exactly 16 pixels, regardless of what the original designer dictated.

The reason for that change was simple: knowing the default line height of a font required loading that font, which could be really slow on the early internet. Multiplying line height by font size, on the other hand, could be done immediately. “We wanted to do as many calculations as possible without having to load the font,” mentioned Håkon Wium Lie, co-creator of CSS. Line height no longer understood the font inside — luckily, the fonts weren’t required to fit within physical boxes, so that wasn’t that big of a problem.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACIklEQVQoz32TW28TMRCF+5MpIg/cJCTED+AHgAgXpYGGtBLKAwgBEpcXmhCKKOSeNqTJbnZt79p7SSQfxnaXbR/Kw9EkmtHZ8fnsLaUUlJSl1CWS8rI5XVQppd6SZBhHMcKAwV9xeDyGHymrFYnHClKSYgnOOIIVzYUCvpDFjGY0E0tljMmQhmdhjI8Tjv2ewO4wwctJhiapdZzih6cgyGxFBl9PBF79Zmj0Y+yOUrwYZ2ZWf54ntAhtKs8Mj3yFh70Ud7oZbnXXuEG63t3g3mGO11OJUMT4wxVqwxQ3Oxkq7RzXOmtcaW9Q6ax1tZdguopLwylL8GaW4fk4t1/dGWV4NszQGKfoLOjYkYvh/TzF42GO6iC39UHf/M70u1mCBTtnGNGRTCZLLuEJI4UlyVRmM5SUkTv2KTdSWFDvVNiqTdbULwwlItqAEZTAD+EHFwK/AIWFnMAxs4019KgfEBQ3Y2grZ3gcSLwdCjSPGJr9yAZujt2cpOguSyifpgL1XwK1QYIa9Xconj2CckCxBOJsQ3OnDr0E939mNvC733PcJijbnQ0BytGaKAeFKVT7KbYPclxtO2iVb2ZmrRujBPMwKjOcEJTWSYY6QdmfEgy6Mk8o9Dpt0bZQXAQfCMqjgYNSp+2e0gxtqr/MKR5+DoqQ7iIXIDwXtv0f/oPiMp0TkBl31YjA6KCAYi62fXrqP0/O9suZYoFIOljl01OaXp3+C19hd71h6hSYAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/5afd1489b84d04e9a584cbfbd6fdf16a222538f4-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

See the variety in four digital fonts with 16pt font size and 100% line height on the web.

And so, the same font as before would have a size of 16 pixels — but a line height of 20 pixels would now be expressed as 125% or 1.25, since 16×1.25 gives exactly 20. (The traditional 100% was preserved in one specific instance, as [line-height: normal](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height).)

Web also took away some of the control from typesetters. What in the print era were absolute rules, now became suggestions. Positioning the text box exactly where you wanted it to be not only became harder — it was often discouraged. Web browsers, after all, could be found on vastly different computers, each one with a different screen and a different set of installed fonts.

Browsers, like platforms before them, now had to take some of the responsibilities for type rendering and typesetting — but, as you can imagine, they also came with their own sets of bugs and idiosyncrasies. Each one did things slightly differently: be it alignment, rounding pixels up or down, or interpreting the various incantations of CSS.

The history of web design can be seen as a set of tensions between designers wanting things to be positioned with utmost precision, and the web pushing back on some of that control. One of the unexpected casualties of that push and pull was line height. The early web didn’t allow for easy vertical centering of text — cue literal decades of jokes about aligning a text to an icon next to it being the [hardest problem in computer science](https://blog.logrocket.com/13-ways-to-vertical-center-in-2018-cb6e98ed8a40) — but line height provided a quick workaround for a situation much more common in user interface design than in the world of print.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABHUlEQVQoz3VTyxaFIAjs/3+z1+ldKlu5DEl5rRZzRBlHQKhCCAx47xW2J6JX2zjZWYQtiLArHDrneJomHoaBl2XRvQnYZQht28bruqptggTBez0F933nvu+5rmvuuu55KQmCB9HLdyJm6yloryM6YD8Oe/2RcshTRqplhJQTkapEAZCIkuwJ0SRxtXEG382JiXcLKhEEiY4kdWoapnFkkqj1konClnKor22ZpObCiXoXwp+CUsuHIGCCEAIH3FdBAGE/03lPGX48dj74n3JIBfdy6BKuXis+Becu46UPKj5FyHAukgp6EdhS24SibdAJ8I9SjqxfI+VtcwkKAcR5nrXfvhrbHkWvXoI2MRahTcshdSun5CvlbASjjSDwAzIamCAG/xIPAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/572031c160fd9756f4647a48985aa6baccfda0bc-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

In a few short decades, [Tim Berners-Lee’s invention](https://en.wikipedia.org/wiki/Tim_Berners-Lee) grew beyond anyone’s imagination. But the web didn’t take over the entire world. Desktop applications evolved into native iOS and Android apps — and under the hood, they continued to look at fonts from the perspective of print.

Now on everyone’s computer, there were apps and websites — and both groups looked at fonts slightly differently. It was hard to say which approach was more proper than the others, but it was easy to notice that they weren’t compatible.

Still-young digital typography quickly amassed quirks and baggage, too. There is a joke in the keyboard world — why is this key in this particular weird place on a keyboard? Because it was there on the keyboard before it. The same holds true for typography.

Platforms and browsers started adding hacks and exceptions to make things look like they did on previous popular platforms and browsers, and type designers compensated for rendering quirks by moving things around. Most importantly: people developed different expectations depending on where they first started interacting with typography.

The end result? There was no longer one way to think of type.

## [Changes to Figma](#changes-to-figma)

This world, with all its line height baggage, isn’t the one we perhaps would’ve chosen to inherit when launching Figma ;·). We didn’t, however, have a choice. And, on top of all the previously mentioned challenges, Figma came with its own unique set:

-   people use Figma to design _on_ different platforms
-   people use Figma to design _for_ different platforms
-   people do all these things _while_ working together (using multiplayer)
-   Figma exists in a larger ecosystem and needs to understand and respect it

There is no longer one way to think of type…and yet Figma needs to think of type one way. We couldn’t render things differently on different platforms, because that would cause trouble for people collaborating on one file. We wanted to support designing for iOS devices in your Chromebook web browser, or Android apps on your Mac, but we didn’t want a set of toggles to make Figma’s type UI feel like one platform or the other. We needed to create a convenient, powerful UI – but also understand that often the end result of work in Figma lives elsewhere as CSS, or native source code.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABWUlEQVQoz51T2Y6DMAzs/38bj5UqtYXSA8oNCcmrXY9JoFW1q9U+jBxfw9gWO+ccA977/4JghYOAXXB4nme21qqFj7cxRm3MwwdiTeih4IN4IUSgqiq+XC7cdZ2SwL9er1wUBQ/DoHG8H48Ht22rPbDSQ6gVfyMEwfl85iRJ+H6/8ziOnOc57/d7Pp1O3DTN+sEsy/j5fGrP7XZDD6VpqkpXQowBNYfDgcuy5GmaVMnxeFTivu8/FMYpUCs9BOKVELsAIeRDBYrhY8y6rtdmxPCOecTwFlLCBCDUo7wvHMri0mMsHsW5cBQcLhwNyuWjBDGS2wgVuFREIIj+LB8CttxSb1XESAZ5OcpK6K1hb0bBpHDAtPhWDtSUFbcCK43eLjlnxlhH6tt3hULopuELXgpBWNWy36ZbCEH0WUdq7W8jB3iMjd3NC3Qa91VHYRXbn/IT3N9i9GbpBfjZkJvbKpT2AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/9e197b0c86ab46d54bcb7f50f760bd5bf65b320c-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

To achieve all our goals, Figma needs to take ownership of the entire space — interpret font files, make decisions previously reserved for platforms and browsers, and narrow the space of design decisions.

Figma originally borrowed from the world of print: line spacing was added below and “100%” meant “font’s default line height.” Over time, however, it became increasingly obvious that this is less and less how people think of or use type. Instead, most expect fonts to behave like the web; our approach to fonts caused trouble in the handoff between design and engineering, and even in designing itself.

We heard from a lot of you that Figma’s approach to text was confusing, so we looked at it more carefully. We observed how people used Figma to design visuals and UIs for all sorts of platforms. We dug into the history of where different line height and typography interpretations came from. We built tools to help ourselves understand how different platforms use text ([here is one you can play with that explores line height on different platforms](https://aresluna.org/line-height-playground)).

And we went through a lot of seedy alleys of typography, places I wouldn’t want you to ever encounter: rogue fonts, ridiculously tall text cursors, selections that overlapped or refused to.

After all the research and conversations, we settled on a particular set of changes to how line height is treated inside Figma. It’s a solution we hope will meet more of your needs and use cases, while not causing any trouble for the less popular ones.

### [1\. Line height distribution](#_1-line-height-distribution)

In text boxes, Figma will now distribute line height just like web does. This should help most people with most tasks — not just designing for the web.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACJklEQVQoz4WTz09TQRDH+WuktGAt2KIiFw41Hjx4IB48ERMPxgQN/ojGaIgmHPTkxQQTMUY0HowmNYXXPl4lGpA2RQqlYCOoMbRKaBp7ILbvvf24r9tK0RoPn8zsZvY7szuzLS4NmtEWae43iRGOlYg26beohajirtkq2h/U4tzSupUAv4Vq1qUEBR65sU+Hzinw6uqAqxFNiXVEhYxT1iWTtCqE40scYVVhuwz26zaHDJtuQ+CN2rRrFh6JW7OrFTpJ9suEva/hYAy6pO9TiL2qCEdYCXZMlukJbREM5Tga/s6R8CbBV3n6Qt8IhEtS2JZJBMfeWpxNWgylbM69txmcN+XaFP0zlkwm1JWdK/kntzkRWmPwRYKhl3Euh1Nc1dKcn8hwfCKPN2LSKTk1XeBecoPxxRyPUzmeSPtwIScuzWxxWK/UBOX79MUqjCQLhJc+E1nIEl3+xHR2g9BKnotzPwhM2fi0MgORr9w1UtzX5xjV4zyaSTM2uyouxL7QE9muCwqCbwSjazbposnH4k+yxTLrJZNkweJWxuZATNAVtTgzW+LBQp6nyXXGJc+X8zzLbIpriSK9hrlTofPIp+dhZBXuZOH2B2VvrsDJuHx4nWp3+98JrixaDC+Z3FiqMJy2uJ62xECi2sydCj2yyz55IGDsxj+lxsRdmz9ntAIGsuIdug2EM26exi43zNRfuBqo7+3ZjWhtnMP6F/o/4l/Ufoq68i9YKc0wJWdKOwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/cc71b292007b59be8d1742cc79c808d1a6cb866e-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

### [2\. Treatment of subsequent lines](#_2-treatment-of-subsequent-lines)

Every subsequent line will have its leading added above, though. This is different than CSS where the leading would be split above and below, and different than Figma’s prior behavior of putting all the leading below; we believe it’s easier to control text if the extra leading goes in one place, as people often use line height to space lines of text apart.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACbUlEQVQoz3WTW2sTURDH+200pkksWn1RUHyyXsCAiNBaRUEfFEQEffETFEQQq6B460t9koqlSTa3Jt3YJG1uTWobUrO5blaTapNsNjXJ+XvO7qrYxodhzjJnfvOfmbMDBgew107AvNFBYOE0M9JvNaZ7A43to2biNGNnlkeNGLR8ws4DBjWgJVicBIfdUI2dWZJ2WSto4oBht2ZmJ2hcLUZ0UcxTIKvCAtQP2do4aqvjuH1L9cNzTZjsHR1IcNDZw4i/i/OBLqx8Fyd9HRxy9YimloHJX6DR3sMJCrruEHDPlcF9bw7XPBKOcIoGpPeOORXc5quYCEt4uCzhQbCKM94WGfwHqLdsdvQw6m/iTawE56oA13oJTxM0Yb6ttsZUjLhlTCwW8T6awWwii1dxEZcWmsTC9f4D9NXxNpKHO/UF7s95PItJODuvqDBmFz51MSO0kK/VIf5oIFhRcCfaIQdcRJ/lDuCYv4GpWBGe1Sy86RKer1Rh9bcxyP0GdvAxr0Cst1BttLAkKbhLgcP9gGyrtyJdBKU2ak0FX5ttcOWfGA/1aEx7Uqc9Mh4vlcGlBHjXcpheEXGVb5Ih1vIuIFVxI7QNb6GBwmYdAm3rgyBjbLGD/TqQLgBPIhU64xx863m8S0m4EpAJy901QxNt+aJ3Cy/CAubiGdhSOUxGJVh9yp+HzICTFOhZy2MhXVSBl3mZmPpumcoe52VMJ0Xw6QL4DREvUzU6w231r2HAU54WHoVKmI1vgEtmMZUoY5RumYnpu2UqHzPpGuLFbwgLFbxOVnHO396xZQU5Oo7y9wYCYgs3lzvETDvYowN/AdQZ5Coq4Y6LAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/919354f33aca3c555e08bb7e00537b6c3ee22159-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

### [3\. Font size percentage](#_3-font-size-percentage)

Line height 100% now means “100% of font size” rather than “100% of font’s default line height.” This should make calculations easier, and remain in sync with how most people think of this value.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACFElEQVQoz3VSz2sTURDuP9PdzaZN0ioYpFIsBVE8iKIX8WBB9CxooX+AoHgTREH8B7TaHybZ7SZpUpsS2x7spYdSWukliI1kQ7LpZrPvc9572TSb2sMwOzsz3/fNvBmKrDBoJsD9GTO7JmL0+ZAx7gmDezYkA1k4agFjObIsMGLJBq3XyBAli1sMMTKdvlWTi2Gs2889BzxVmKDCZN4nYxizfERNP6QwRiTJVeByAbiYp5iIoz2FrKuQs9APnfwFw8FUuorrxjGuGVVcydiIm+3eCi7lOriz7mKm7OJh+QT3Si4m8h2mS1EEGCgkwJEVHzcsG7P5A7wq7uF16RBP1yq4mm3JkYlwKutgdr2Ct5tHeL99hBflCm6tNhjvDQOaEHu5v+Hi464NY7+KzEENb3abuPndo31JwOmcg7lSBe82f+EDAb7c+o3bxSYBsrOAfOHTRR9Ptjw8/+nh2Y6PmW1gonD6KEka+e6ag0cbDTz+0cKDchuTBX9g5O4OuddTLYwu2Uikm+JR4llJFIysZ9qILdeRSDUwbnXERdA1hB8lOBnu1WUHw/N/MbxQh5rxgrMQhCKfOpH5LzUoKff/ZxMC/OZAma9C+XwMdamJiNHpHbgAJhCFAJVPf6Au1qGR4ohUdo5CUqB8rYkm2eChP6+l21AWbElKdbxe6wc0BwA1wxdNwohdxP15OnRBEtTQBIOA/wAAZrq7RrkBcAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/1d4e08a6f70d0390547d439da9206524f5472ba9-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

Text boxes also start with automatic line height. When you switch between the fonts, we will adjust the line height to match the font’s default line height. That will make it easier to explore different fonts and have the text feel great either way. We won’t do this, of course, if you specify line height in pixels or as percents.

### [4\. Line heights in pixels](#_4-line-heights-in-pixels)

Speaking of pixels…from now on, whenever you say “I want my line height to be 20 pixels,” we will be more forceful in respecting that — even when the web wouldn’t be (line-height in CSS is really min-line-height). We watched people use specific line height values for aligning things, and we want to respect that.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABV0lEQVQoz4VTyU7DMBDt52SjCUsLqOwFIRAIcYAL4oDEiT9sltKWsqgC8UdvmMnYcSoSODyNNeN5fs9jd/yUyBsRSWyC1P6pw6zh87rjCEFRBkpyhawl5400yr6QY5wrwrSqV4SeI9SGOCfqj4l6jG7mFFo1EefWC0WULSs0cVlhzKp6Y0U3s8ocVkx9c6wuAs0bhbAKURJKca0A7U5A+1PQRuFsWUju8hV0+wEaztS6EqKFMFeyw5kqidJKRYktzt0vQE/foOt3sPWy3kwosc8N53PQBavYflYyOxSJQnD1Brpb6J4/CaVZ1ImCh0/Q2VyvoG47MQ5OuXbMLgZ86GoOBG7ajlAa96Z6+uMX6Ibv6WhWqdChMeFgovmhAV8DwiZCO5QDJj150aadieas9dColJwcJENK2hRaW2EN8rgD94B/wa89m4rQktkv1obGr6c1mHo5lB81B7pPoWAmHAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/8bb49a440d75c0673909c4228a5aeeaf73b1081b-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

### [5\. 🤗❤️✏️](#_5)

We’ve also observed people (and ourselves) getting annoyed when inserting emoji stretches the line height and destroys the rhythm of text. Now, if you sprinkle your text with emoji, we’ll no longer expand the line box.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABg0lEQVQoz6VT2VLCQBDM5xgOwQNFsRRvJQgK+LEGJAhJ8JcUMmP37qZQCn3xoWtqM13dc8XzQ9F/QvxQXRTxinhURqq7QGWoWsB760W+gWTVEnLVkeWucYQcgFG88lC09ipaj0T3EUt4F8IV8kq28f1gbDllw9EcPyusjEQPQTyZiDYiK8x3PVIjwDxNdhCPI8cZO46NsmdNpEhBOjbfRO9i0XuHVpxpEC/1ZgaBia2KYrd4BwnyQADeQ7LUdpzJ5dQKw1Q8Ol2D2E1FH1MFRHvJAvjQdpLp+VRN1acw7SA3mIv25wpk+px+6iBdCMWRF3RkBen8BGLPoZ8uDTqohO6s7swJ9td4vTQzguhSWKXHObBdEgfvNuZgtaye821uECRQiHAMFDyKIMjBX80smQJdB75b1tm0TFEatxOLwAEzlwt0QTHM2m6Zoo1otWmCbfI7t8uTqTpe3W0533TNLsNsGdcgnu/urehQCDffob8h5yCrPwaC7sp/hT3aPznusE2ULyAwxMEkCfDHAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/a8328685bfc42a9dfea600d02b928f946f88be7c-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

The interactions between emoji and text deserve its own book!

### [6\. Font measurements](#_6-font-measurements)

Previously, we interpreted font files according to one method. We learned that this method meant some fonts were drawn a little bit higher than people expected. This is now fixed.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABr0lEQVQoz41TXUsCQRTt56z2LWEahVH2EBFRUBBklFr/rSgpzXJ3drVei+qlD6qXICJEA+lLRZ3TnZ1Z28o+Hg4zd/bMuefevdOmGYCnBTS99b4Fh6uYe3TwNufDV7jP/+B8FpQO+XfoCnb8K4ermJMWOaRDL13oNoFeQheTseaGLkU7meR1MClmOyUR5VgIy5IFoc/iCGTFSrGdvdF0KES9tPaYHH7i+IjTzpquPxw6PexmDQwarwjvFTG6W0AolcfQ9gOG0o/oZ1X7skgSZBWE9RLGjBJGMiUMp4sI7T7yAaMsKpMli+x+s45ZVkA8eY7o+hGW1g4R3zhGPH2NqdwzOZNJJ80SYnS2kjhFbPME8cQJVlMXfM4qwm81lCDV32c2MHPwgqh5j0jqCpHkFaKZWyxl85jYL9t9E70dz71hkd1jYesS84kzLO7cYNm449O5J2pVU5Db5YgeBq06lVVFgDBg1ezYZ3K7fwJiH6Dzfr0Mf+aVeBUEzRoXhjrcPWzOlvEDPv4o3A9BxVxT80g86dA9d5qCxw1nDr9wNGcOdedvqx62HNr/Q70UWfI7vz21iiJuFxUAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/30794c58fb7ec9d5c702ab47faec09d8483620a3-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

### [7\. Letter spacing](#_7-letter-spacing)

And, while we’re at it, if the last letter on a line has extra letter spacing, Figma will now ignore it. This is different than web/CSS, but it should make it much easier to center text.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABTklEQVQoz62T607CQBCFeZy2UkBjGo2KMRJBDC8gPxTDO+Jub6DxYQQDCUI3YJjjXlothGgM/vgyO52zs6fTbcHmwDYstn29RUNpTjYDFbLCJvnnv2jWG1qMZLITpCMjsnjq0JGUfKASqEg61y42XBalphyoaJqlGtI67ZBUQ0JRchgSjiITsw12zr0jqQQET2r2ZdzjXxrSusyhemWXfeCEz1GPJHGCWpjgMqUaLU0DtoLHBGrBHFdRVhc4DwQdsAWcfMNyT+D68Q138QgP/RE6ku7TGN3nMW5fEpz2CSV56EVvgnY4RCd+xX081PX2YEJVPlMHrjs88xM0oxluwnfJFK1+gtZAoD5YmjHwFY65QENrpmgGRtOIBXn+Uo3ku6GahZqJmp3aqHDl2vXNfB2+qTE61+SU1sn66R7+Acqi/sr/dg957h7uyNqf8gkNSrc6PsGQSAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/806506afc8515be0b06429cabf612bb959a0f485-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

There is no one right way to look at fonts, but we believe this is a better way than before. It should solve more actual problems than our previous approach, and — as far as we know — shouldn’t make anything harder. In the Code panel, we now also output more information that should help the transition between design and engineering.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAAA5ElEQVQoz6WT3Y6DIBSE+/4v2aQKovJ/4LbTAxFxN9uGTS8mY8jJJ8zALeeMppTS6X/pnL1+5/xszjPP2zsgEcF7D1cUCYEatHi+/mAMWGBKKYiFZTz2kBC/ATrnIKXEQ0jM2jGQQL+AxYeBIQRorbHtGtoFeOo5pkMF/q8MC9QX1QyprrWdnT4KjDFCWwdlWNZjY7ccQzyguYMHM+RShFpxnyXuYsEkFdZ9rzvuwDQOLC3LZcFjmlgzBJezblsH9vs6fmRrbS3GGFPlrkc+gYMZNtFRRi8k/Zj72PIV+vkJvge+APOXmhhCn5c6AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/bb4735908e3a002931c9357379c953fd4249abfb-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

There are some things we cannot solve — a type designer can choose to put their font very tall in its box, for example, and we should respect their wishes. To make things more complicated, it’s hard to even agree what vertical text alignment really is. The world of type happens to be the world [where things often feel right even when the measurements don’t quite add up](https://medium.engineering/typography-is-impossible-5872b0c7f891). Any of the examples below could be considered vertically aligned — and it’s up to a designer, not Figma, to make those decisions.

But overall, we hope that Figma will do the right thing more often than before and allow you to make decisions more quickly as a designer (and understand those decisions better as an engineer). I don’t think people should have to be aware of the seven nuances I just listed. The goal is for Figma’s type rendering to just work.

We also want to be respectful of the many designs you might have already made in Figma. You will only get any of the above updates to text rendering if you create a new text box — but we won’t automatically upgrade any of your previous text boxes, because that could shift things up and down.

You can update your previous text boxes at your own pace (either one by one, or by selecting all items on your canvas, and [doing it en masse](https://help.figma.com/hc/en-us/article/283-changes-to-line-height)), and any of the changes will be reversible.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAwUlEQVQoz82R2w7CIBBE/f//NFZ7L8u9MLLYmw9NavXBh5PZTOAQ4CKlxAwRLTnPe2zWxqmLPF/2hJxKKWitM8aYnNydFrLEOQfvPcZxzMndaaG1NotCCBmeuftKyKIY4yL9mXCW/o+Q+JeNhR0D3IT1IXd0XLiKuzTX0qLVHl2iUQ4VGVRCo6ePhRKNkCgGjXsSlMKg6BWuLeHWSXRiFtIRIeXs06ZqWCkTj55QD4Rhc5Pjb0gvsdhAC7QcnHgTPgFT+KFCT2DPBwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/89861b7f030ffc5619862dcdf0e704fb5e50584a-1340x800.png?w=804&h=480&q=75&fit=max&auto=format)

## [It’s all led to this](#it-s-all-led-to-this)

All of the above might seem like a world of pain, and it wasn’t an easy problem to navigate. [I joined Figma's design team](https://www.figma.com/blog/how-we-built-the-figma-design-team/)

recently to work on typesetting and this was one of the projects I started with. I learned a lot about laying out text, and I’m pretty sure I barely scratched the surface of all there is to know.

There is a saying in urban design: “If you can understand a city, that city is dead." How people live and organize their buildings and lives evolves in all sorts of unpredictable ways. It’s easy to see that as messy or annoying, but one can also see it as beautiful and very human. I often look at typography that way, too, as a thing of infinite complexity, rich in history and meaning. I’m in awe of it all, and it feels like a privilege to be part of that journey.

We’ll keep working on Figma’s type and improving it, and I hope you'll continue to help us in doing so — just [@ us on Twitter](https://twitter.com/figma) or write to us at [type@figma.com](mailto:type@figma.com).

We’ll also have more exciting font news to announce soon. I can barely wait.