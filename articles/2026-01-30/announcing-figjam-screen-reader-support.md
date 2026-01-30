---
title: "Announcing FigJam screen reader support"
source: "https://www.figma.com/blog/announcing-figjam-screen-reader-support/"
publishedDate: "2023-05-16"
category: "design"
feedName: "Figma Blog"
---

May 16, 2023

![outline of a browser with abstract boxes symbolizing images, text, showing chat bubbles](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAACNklEQVQokW2RS08TYRRA2Rj/gj/AjVuXRnfuWBJ3bsRQ6MqEmBjRDRskoAihhYIxYJCEBCoReSiPiiRULKWVyqvQJ0OnnenM983XKW6PoSWsXJzkJvfm5CS3oVqtYpYFqYxGNndG2bJwHKeGdByEkNi2wDJtSpqNnrMxCgLblvUbebG3UUpx4WqouFX2UiYLm6esRYvEjyWJtCKRdkjmBFrBRNcL5E50YksWax9MFhaPWDmI8Vs/xnDqAVdCR7msx8u8njHomha8/azomxX0zZYZXzYJbReIJLJsh09Z9gkC7RreN0GavnTTGZkgriUxTbPGRW2DdFy+RiUvJhXed+d4Ryq0+AxaBnWevjd5NW3hnzeZXTIIjTmMdWd44A9wa6qNh8tdrOyHyaRT5PO5mvRS6NAx6dI68hfPkEPzQJFH/Toev4V31OXZRJWpVclhTLETyTO4OsaTeQ/939vZ2R0lfzDDWfonVtm4FG5LOj5WaA1UafELmgdKNenjwTKe4QovJivMbRpk8kUKZ2kOEsPE1++T2riN/esOItKIlfThCL0u/BaVvJxUtAVUrcrjL9fxmbQNCzqnJAthjaPjDFpun9KfbsSPm7ih65yvX6OycQO5/xwlzupP2TqQjCxJej8JeoIWvUH7au4J2gQWbULRItm8TknPYCTHKUeasML3kFt3UTuNOKkhlCzS4LpVtJJi90Swffh/YklBWhMIqagogTD2sHML2NkgIjuDPJ1DGXHciuQfWL9bJuVOWIoAAAAASUVORK5CYII=)![outline of a browser with abstract boxes symbolizing images, text, showing chat bubbles](https://cdn.sanity.io/images/599r6htc/regionalized/ff694d1cf59e22c96062c15b3e674bf2298d7fbd-4240x2000.png?rect=1,0,4239,2000&w=1632&h=770&q=75&fit=max&auto=format)

We sat down with the accessibility team to talk about the journey from beta to official release and share tips for anyone who’d like to use these updates to make their FigJam files more accessible.

In order to make it possible for screen reader and keyboard-only users to **read and create content in a FigJam file,** content needs to be legible literally and contextually via hierarchy and location on the canvas. With this latest update, screen reader or keyboard users can now move focus around the canvas, as well as between different menus and screens, to create, edit, and read out content (including file structure, shapes with text, stickies, tables, and image alt text).

“Investing in screen reader coverage means wrestling with interesting product questions, like: What is an optimal model for multiplayer features like cursor chat?” says Product Manager KC Oh. “We’ll learn more as adoption grows.” It also means there are plenty of features we still need to address in the future. At this point, FigJam doesn't yet support navigation via a screen reader or keyboard for cursor chat, adjusting stamps, voting, using the emote wheel, interacting with widgets, or adjusting freeform vector nodes (lines, highlights, [washi tape](https://www.figma.com/blog/figjam-washi-tape/)

, and marker drawings).

#### [Bringing screen readers to the whole team](#bringing-screen-readers-to-the-whole-team)

FigJam’s [emphasis on collaboration](https://www.figma.com/figjam/)—_bringing everyone on a team together to define ideas, align on decisions, and move work forward_—made it a clear choice to tackle after launching screen reader support for Figma prototypes. “FigJam is really a place where entire teams come together,” says KC. “It’s a tool specifically built for collaboration. So, we wanted it to be inclusive of as many people as possible.” Another deciding factor: the tool’s UI. As a precise design tool, Figma has many more levels of menus and interaction compared to the digital white-boarding tool. “FigJam was an opportunity to build for a UI where most of the features are accessible at the surface level, while also tackling issues we’ll certainly encounter with Figma Design,” KC adds.

#### [Moving with intention to get it right](#moving-with-intention-to-get-it-right)

###### ARIA specs

ARIA specs refer to WAI-ARIA (or Web Accessibility Initiative – Accessible Rich Internet Applications), **a technical specification that provides a framework to improve the accessibility and interoperability of web content and applications**. This document is primarily for developers creating custom widgets and other web application components.

Unlike static websites or simple widgets, which benefit from a plethora of clear ARIA specs and other resources, canvas-based creation tools (like Figma and FigJam) lack the same number of existing accessibility paradigms or best practices to model themselves after. With a nebulous end-state, most of our team’s early work was spent understanding what features were needed to use the tool effectively. This made iteration slower than expected, but the team felt strongly about taking time to make sure they were building something useful for screen reader and keyboard-only users. Our team once [again engaged Fable](https://www.figma.com/blog/a-conversation-with-our-accessibility-team/)

, an agency that connects companies with people who use assistive technologies to facilitate user testing and feedback. Many of the team’s beta testers had never used a digital whiteboard tool (or a physical one), so they didn’t know what patterns to expect. Our team mapped out various user journeys to define a set of core features that felt substantial enough for an initial release.

#### [Better accessibility across the (key)board](#better-accessibility-across-the-key-board)

With a variety of assistive technologies, screen reader settings, and [keyboard setups](https://www.figma.com/blog/behind-the-scenes-international-keyboard-shortcuts/)

, there are thousands of different combinations people can use. “We learn something new about how screen readers can be used in every beta interview,” says Software Engineer Dorothy Chen. Many of those lessons are carried over to other parts of the product, and to accessibility considerations being made across Figma. “Some of our React components have really benefited from this work, such as ARIA labels and tags. Once the patterns exist in the code base, other engineers can replicate them going forward,” says Dorothy.

###### Nifty "stamp-bomb" feature

Our design advocate Miggi Cardona shared this [FigJam pro-tip on Twitter](https://twitter.com/miggi/status/1655662752952623105): Select the item you want to stamp, pull up the stamp tool (E), choose a stamp, then press command + return (Ctrl + enter on Windows) repeatedly. It will randomly populate the selection with stamps.

Additionally, this work has paved the way for better keyboard navigation across the board: Users can now navigate FigJam files using the `Tab` key to jump between objects on the canvas, as well as between text nodes for efficient editing. Hold `Shift + Tab` to tab in reverse. (See our [Release Notes](https://www.figma.com/release-notes/?title=Tab%20between%20objects%20in%20FigJam).) The team was able to make stamps operable using only a keyboard, as well—leading to a [nifty stamp-bomb feature](https://twitter.com/miggi/status/1655662752952623105) that _anyone_ can appreciate!

#### [What’s next](#what-s-next)

To repeat a familiar refrain: We still have a lot of work to do! As we continue to improve access to our own products, we’re also advancing our understanding of what our users need to design accessibly. We’ve also updated our help center with new accessibility guidance for [screenreader users](https://help.figma.com/hc/en-us/articles/14477051168791) and [FigJam file creators](https://help.figma.com/hc/en-us/articles/14477101678359). We’re always looking for more feedback, so if you use a screen reader or keyboard to navigate your FigJam files, try this new update and [let us know what you think](https://forum.figma.com/t/making-figjam-accessible-to-screen-readers/43380).

### [Tips for making your FigJams more accessible](#tips-for-making-your-figjams-more-accessible)

**1\. Use sections to group content**

If you’re trying to organize information, use sections instead of shapes for grouping your content together. While the two can look nearly identical (especially if you’re using a rounded rectangle), sections [create a hierarchy](https://www.figma.com/resources/learn-design/inclusion/) that is legible to assistive technologies. You can then nest sections within sections, allowing them to be read out successively by a screen reader. Sections also allow you to add a title, which can be surfaced in the Landmarks menu in Apple’s [VoiceOver rotor](https://support.apple.com/guide/voiceover/with-the-voiceover-rotor-mchlp2719/mac) or by pressing "H" for next heading in JAWS or NVDA (if you’re on Windows). Shapes are still useful for the objects themselves, but you should place them inside sections.

![FigJam diagram showing two versions of nearly identical text organized into white rounded rectangles on a green background. The text is organized under headings for 'Quick tips,' 'Toolbar,' 'Move and Zoom,' and 'Work with your team.' A landmark menu on the right indicates that the information is correctly surfaced.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACwUlEQVQ4jXWR60+SYRjG+xNbn+pDh83NqR3XYZ1WSmiS0WHTlDgYExCBMsyQFDEKUl4UQkGTg5I2KFcm9R4srX7tfTssy57t2nNfz3b9dj27d9Rb1qkzKxy0KpywS5x1Spx3yZxzytp8TtVPr87q21mnqN1nHKKWUbMqQ2Xt+AU87ZAxjVRxx1dwxsu4hTf4p1bpT7ylN17RdH9qlZG0xOi0QnhaYTgl0z0qadktwHqzQpNXojexjG0mQlvKT1c2RKCU5l4uzs3kIDfSAYIvZ3j9UUT+9BX50xeq4ibRWQWddwtQod68ziWfhF3IYUz2c1FwcCXZj30+jDkbQC+40CXceAoxVpQ14JumzxtfEHLr6H1/Ay3r6LwijkQR11yEu7ko/YUJPMUYnsITvHMRuoUhHONBJuemWVhYoFgssrC4xOPnq1zySn99+SfQPVVisJAg9ipDtJJlcEng4UuBkZyA7YGbRmMLrW0GjEYjBoMBi/UOvcEsOo+oMdRyWxr2Ti7iz08wtvSc8PI0/lKcgdIEgdlndLpsHDl+jNraWmpqajhwYD/nLzRi8Qk09X3UGGrLP4ASPYkC9tlRnC/C9OWiuAtPceXHsKeDXB+8Q/Pt67SbbmEymejq6sTt8eEL5bZpaP4BNI1nOR6zsSdk4FDMxI3sAPqkm72hNvYMXebqeB/pxReUyxXK5TLlygpPZqraQv/Zss6nAjMci5rZ+aiZfZEOrmT86JJOdocM7Bpp4+bsEBXlPb/OxuZXEvn/bLnRI2J9VqQrFeba1Cgtiad0zMSwZSK0p8LohTFs2RT5d+/5IG1qelvdIJKRafJsAzzZI9Hsf01LcB79ozwXAgV0wRytw/Nc1nye1uESrtgaA4KCX5C5NyHTGZQ41bMNsMGi0GAVqbdWqbOsaWqwVv/xR7pFjnZLv3XYJmvZH0CF70ttLrUuCYWaAAAAAElFTkSuQmCC)![FigJam diagram showing two versions of nearly identical text organized into white rounded rectangles on a green background. The text is organized under headings for 'Quick tips,' 'Toolbar,' 'Move and Zoom,' and 'Work with your team.' A landmark menu on the right indicates that the information is correctly surfaced.](https://cdn.sanity.io/images/599r6htc/regionalized/f258ab0410b53d4c3467e44bcc9ea05444fc32eb-3200x2054.png?w=804&h=516&q=75&fit=max&auto=format)

While these two examples look nearly identical, the one on the right uses sections, so is surfaced in the Landmarks menu.

**2\. Use numbered lists to describe order**

Instead of using decorative numbers, stickers, or iconography to items in numerical order, use a straightforward numbered list within the text box. Iconography relies on visual inference, while stickers are illegible to screen readers, both making it difficult for someone using assistive technology to parse information about structure. Text-based numbered lists, however, provide accurate information about your content’s structure.

![Two examples of numbered lists: the left has decorative numbers within shapes and an [x] indicating wrong, while the right shows a simple numbered list using text and a [check] indicating correct](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACt0lEQVQ4jXWTy08TURSH/QcEfOw0gu5069qVG3WhiSaA1geoibpzZ4yCiW408RljTHwhAQ1FQowmAkpUKPhoKcQoRkuHDm1npnc67UyntfiKn7m3ajDo4peZnO/Md8/MnbugqquBmmAji4M7WNIdqETez4lkFf67Zz6vCTZS3dXIguquBlb17mfDQCuBZ2fZNXSOPcPnVZpCF9g5dJbNT06yaeAEDU/PKL5b8tCvDJ9ny+ApVt8/pKRKuO7REa6+7eOZPskL4yNjIk7UjjNha7y0PhCMPadt8jF92jgjqQ9EMlOKy4zbGt3xkJLKSZVw4+MT9CXGMRyPTK6A4xXJuj75Qgnb94mYMYZm3hIXNpZTwHZ9HNdXPV6xTDgzpaaWn+KPsF+fwMjm0U0b3RAkjAwpK0s6lydsxAil3qHZgqTlkDCE6tFNoQZ4ZcbmCwf0CcxsnhkpNAXJTFY1W16BsBljJDXJTM7BEJVFUyKH6XjkirO8zsT/MWFinLRw0I2MEqaEg+0WEX6JiDn1l3DGsjHsPMIt4n36Qlho84V9iSjJjM102lKvm5RCr4QolgibU4RSk+hOlrTIVYTZitD9n3Aw+UZthp2XG1Ii55cpzn7HLX8masV5kX6PWSiQ92dxvBJucRa//I3y1x+M2dN/C9f3H6NHG0VzBdOu/Sd6IcfHvEV/YowH2iveOSl0z0FTPEvCc9ALDgPJCeqfnlY/uRKuuX+I5tBFjkc7aY100Dpym5bRdlrHOjkaaedA6DL7hy9xJNKmai2jt2mRPeEOWqKdHBy9wtqHh1kU3F4RylGX9TRR27uPumAzq64HWHlzJ7X3mqnt3cvynibFV/TuVbW6GwHqru2grqvyjORLuwNUy5NSFWxEnmeZhfJ6p57qW9uoatvGwrv1ldocLmuSVd3cqnrncpmf/BUDl2G9Hv4AAAAASUVORK5CYII=)![Two examples of numbered lists: the left has decorative numbers within shapes and an [x] indicating wrong, while the right shows a simple numbered list using text and a [check] indicating correct](https://cdn.sanity.io/images/599r6htc/regionalized/f89a9e1cf1a9a96cfd3ad628d94431d8ba2e70df-3200x2054.png?w=804&h=516&q=75&fit=max&auto=format)

###### alt text

Short for alternative text, and also known as alt tag, alt description, and alt attributes, it is code within a webpage or app used to provide a meaningful description of what an image communicates. Alt text is exposed by screen readers and may be crucial for individuals navigating your page or product with reduced vision.

In programming, it should be applied to every image within the HTML code by including an alt tag. It should be added even if the image is decorative, in which case the tag should be empty.

**3\. Provide ALT text**

You can now add [alt text](https://www.figma.com/dictionary/#alt-text) to your GIFs and static images within FigJam! Click on any image to open the toolbar, and type in your alt text. This text should describe all meaningful images, enabling someone navigating using a keyboard or screen reader to understand what the visual intends to convey.

**4\. Use underscores to communicate fill-in-the-blanks**

Avoid using pen and pencil tools to create vectors meant to be read, as screen reader users cannot read them. Instead, use underscores or other text characters within the text box. This allows the screen reader to read the blank space as part of the line of text.

![Comparison of two approaches to depicting blank space: on the left, a drawn line is not recognized by the captions panel with an [x] indicating incorrect, while on the right, a line created using an underscore key is recognized in the captions panel with a [check] indicating correct.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAAClElEQVQ4jXWP2U8TURSH/R9JXNEYiInbu4nGd1zqixHxRYK0KYvaVhAV6q6AdKPELaC0tFPoTO1Mp53ldqblM3Prvjz8bm7Od853cvaM7d9lvL/L9Gmfe2c9Zs//nsQZj8kTvkzw/5PPnPXkbOAIXHuCJ3qsw9NrLu+fOWymBIW0RzFIps27eUEyJFgIueQfOHxaERRSXq8n47Hxqs3zYSEdP4RTJ31Sdxy2KxZ608ZsujQtgSN8tC2P5XHB6zGH4nqLumn1eMvFdj1M3ScXa0vHT+Epn3TMpaw0KFU1ipUqFa1OwxGoZZ/liGAx7FJYNymrNbYqKuVqDd2yMRodcgnvb2EmLlAUk+K2yqZSRdF0DEdQLfkshwVLYZfiRlMuLCgqiqqjWy668R9hNiHY3rHYqRtoDQvDbtPyOlTL34QRQelzj6tGS3LL62IYXbKJf5wcFKuqg2a2MF0fpwNOF1SlI08Oomw6aI2mlNk+uF1omLv/P3lnx0LVTb6YNnpLYNiCSsFladyVJ5c+9XitYaG3XMlrNUEmJv4WLk7orOU3SK+uspLJ8iadIb2aY3V5kxejJi9Hm+RXCmTX8qxkcrxJZ0nlsuRz67yO6r8LJ4/7JG9oPJnJMHv3CfHJee5GHzJzO8njO2ssXDVIXjV4Gn/LXPwZiakFYhOPiE/Nk0ykSI6oTBz/RRg52iFxzubBlRr3QiWmhz4wPfSRmVCZ+xfrxM64MnOX6sxeUbh94SNTQ+9JXN5iLqQRP2dLxw/hrYO7hI90iQ7C+IDDcH+RkcMKkUGP6ACED3dlgn9koM31/jLXDhVk78QgcjZwSOGtAzC2P0hQgJt7Pa731RnpMxjdF2z9zno8qAVsuK8ue3+dDVxfAf7FYpG9eLKCAAAAAElFTkSuQmCC)![Comparison of two approaches to depicting blank space: on the left, a drawn line is not recognized by the captions panel with an [x] indicating incorrect, while on the right, a line created using an underscore key is recognized in the captions panel with a [check] indicating correct.](https://cdn.sanity.io/images/599r6htc/regionalized/694ebba3d37061b23b416b257b0487e45f92f57a-3200x2054.png?w=804&h=516&q=75&fit=max&auto=format)

On the left, the blank space is created using the pencil tool, while on the right, the line created using underscore key characters.

_We continue to be incredibly grateful to our community, beta testers, and partners who are helping us to make Figma more accessible. Learn more about [navigating FigJam using a screen reader](https://help.figma.com/hc/en-us/articles/14477051168791) or [making your FigJam files accessible](https://help.figma.com/hc/en-us/articles/14477051168791)._

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)