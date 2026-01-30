---
title: "Full-scale expression with Grilli Type"
source: "https://www.figma.com/blog/variable-fonts-a-conversation-with-grilli-type/"
publishedDate: "2022-05-27"
category: "design"
feedName: "Figma Blog"
---

Type can suffer from scaling problems: When you increase the size of a font, say, from a business card to a billboard (or even from a mobile device to a desktop), you’re also changing the spatial perception between each letter. Lines of copy that you might easily read in a given form factor will start to deform and become illegible in another. Balancing size and legibility often requires minute, exacting adjustments to the kerning (the spacing between individual letters) and tracking (the spacing between groups of letters), so that typography looks consistent and readable. Plus, managing different weights and styles requires multiple files, which can be tricky from a development perspective—more font styles means more code and assets to download, resulting in additional work, potential room for error, and slower loading times.

In short, making sure a font shows up in the best way can require a lot of finessing. That’s why we [launched support for variable fonts](https://www.figma.com/typography/variable-fonts/), single font files that can be manipulated to achieve a variety of expressions by giving designers the ability to adjust type along a series of axes. Need to balance the optical size and weight of a font simultaneously? Go ahead. Want to play with the slant of a font? Have at it.

Variable fonts are also an exciting way to bring more dynamic expression to the web, a subject that [Thierry Blancpain](https://twitter.com/blancpain?lang=en), co-founder of [Grilli Type](https://twitter.com/grillitype?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor), an independent font foundry based in Lucerne and New York City, is passionate about. Grilli Type’s fonts and their accompanying [mini sites](https://www.gt-planar.com/) have pushed the traditional boundaries of type design to enticing new heights. Blancpain [asked Figma for variable fonts support](https://mobile.twitter.com/grillitype/status/1311360524249169932?lang=bg) back in 2020, and after exchanging DMs with Figma Design Manager [Marcin Wichary](https://twitter.com/mwichary), he and his team joined Figma's variable fonts beta. We spoke to Blancpain about what it takes to develop a typeface, the importance of dynamic web design, and what variable fonts mean for accessibility and user experience.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**After asking Figma to support variable fonts, how does it feel to see it launched?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

It feels really good. I think the design community is used to companies ignoring very obvious feature requests for decades. I don’t want to speak for Figma here, but the company’s origin as a user interface tool and as a product design tool probably helped in the decision to develop a feature that benefits the corporate world as well as designers who want to do interesting things for the web.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**Grilli has always been an early proponent of variable font development. Why do you think variable fonts are so critical to a modern design practice?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

First of all, it's the new standard format, and supporting the overall tool chain for fonts is really important. If the main tools of the trade like Figma don't support those standard formats, it becomes this endless process of trying to find workarounds.

But what’s nice about variable fonts, is that it’s one file with an entire font in it. You can actually use it across the board, and you don't need this version for that tool, this version for some other one. Just based purely on that efficiency, it’s really nice to have. From a broader perspective, it allows for precise typography in a way that previous formats didn't. Some people might not need it, but if you do need it, it's super useful, especially when creating designs that can be converted by developers into actual code.

We have \[created\] variable font websites without being able to use variable fonts in Figma. It works for me, personally, because I'm a developer and a designer, but in a more traditional environment where designers and developers are separate, it doesn't work.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**Why do you think variable fonts are such an empowering tool for designer-developer collaboration?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

Understandably, developers don’t want to complicate their lives for something that they might not have a deep interest in. I think the nice thing about variable fonts is that it offers a little bit for everyone. Developers love the idea that they only have to use a single font file for the entire family, and that's super helpful to them: it makes updating things easier, makes keeping the code clean easier, etc.

Designers love the ability to pick their specific weights, and really fine tune typography in terms of optical size. But they’re also able to use really fun effects like in [GT Maru Mega](https://www.gt-maru.com/), where you can have this very exuberant typeface and still make it work at really small sizes. The other part is animation. I think the web will become more and more of a moving experience. A purely static site often feels very old school nowadays.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**How do you think variable fonts move us towards a more dynamic version of web design?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

Typography can be expressive beyond just providing information. And sometimes that's just going from regular to bold if a user hovers over something. I think that dynamism just improves the experience, but it can also go further.

I think our [mini site for GT Flexa](https://www.gt-flexa.com/) is a really good example of where we see that going. Our mini sites generally try to push web design, and we want to show that our typefaces can lead the way.

Our [friends at XXIX](https://www.xxix.co/) made a website that was the first use of GT Flexa in the wild. The type appears to breathe very slightly in and out—it sort of creates this calming experience with a certain rhythm to it. I think more and more, we're going to see expressive experiences like that, where type supports the overall brand value and how the brand feels on the web. Every website is a chance to communicate, and not using type to its fullest to do that job is missing something.

> Every website is a chance to communicate, and not using type to its fullest to do that job is missing something.

It's very easy to forget the fact that, ten years ago, we were all using Verdana, Times New Roman, Georgia, and Arial on the web. So I think the explosion of type also means that there's a lot of expressive potential that's being used now. And being able to access the entire family out of a single file, animating it, using all of these aspects in interesting new ways, allows for further expression.

But that can also go too far! We're going to see websites that use this potential to produce pretty terrible results. But that's okay. I think as the web design community, we've evolved from that position where everything has to be as boring as possible in order to be as usable as possible. We now understand that there's a tradeoff between expression and functionality, and we can push that boundary forward as well.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**As a type foundry, what role does Grilli play in pushing those boundaries forward?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

Grilli is sort of like a record label and mixing studio that works with artists to create these typefaces. Instead of a recording session lasting a few weeks, our typefaces take years to develop.

[GT Planar](https://www.gt-planar.com/) was designed by Dominik Huber. After Dominik shared a first draft with us, the project went back and forth between our team and Dominik, with many dozens—even hundreds—of rounds of revisions over the last few years. Each revision sharpens the concept further and further. We aim for each of our typeface releases to have a really clear-cut concept that succeeds on both the visual and functional level.

![Slanted white text on black background showing a variety of font weights](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrUlEQVQokT2Sy9aqMAxGmeDfyh0FFBFFWKJ4G/j+r5actcvBQVbapNn5mtZbrVZqjVH7Z9Rao8HaOr+YMX9qrFW7tmp+sTm+Zm+MWGN1bYz4vi9eEASaJokmSaJxFGmWZRrHsYZhqFEUKnn2aZZqFEW/3ByPNApDSZNU8ywTa614HCrLUouimAvTuXABUbzZbH55jOZ5nmtVlXihfrfbSRAE4pE8HA663+8dbFGIASJWVRUFDkR+hlXatq0D7esaxgzkwPF4dFBU4OlIAXHWdV07y/PMNSZGM2JFUQi+aRoJw3AG0glrmkaHYdDT6eRgl8vFARbgdrt18f8gd76qKqG273uJ41g85J/P55+9328dx1G7rnNwgBTShHXf924NZJom1kJsHEdJ03RWyIHlEMDb7ebUAUYNOfaoezweer1e3f71eiFCGFPbtvOVGTQFKMJ/Ph9XwBogqmlwv98d5Pv96vP5dOoXII26rpuBfA+usswRBRTyqssYaIIB4QY0RMA0TULjYRiEKydJIp7v++6vcXW+CMNmrvxF9hhwmvKyywtznhdefFmWYoyRf7BMF68x67O4AAAAAElFTkSuQmCC)![Slanted white text on black background showing a variety of font weights](https://cdn.sanity.io/images/599r6htc/regionalized/33cd49285085b50f0d810e661d5b6883ed107be1-2000x1081.png?rect=1,0,1999,1081&w=1080&h=584&q=75&fit=max&auto=format)

For GT Planar, the team focused on functionality, "no matter the length, size, or angle"

With GT Planar, we wanted to crystallize the idea of the typeface doing one really specific thing. It's very easy to try to make a typeface that does 15 things and is interesting; it's very hard to do a typeface that does one thing—has a really clear expression and clear concept—and does it in an interesting way.

GT Planar is a beautiful typeface on its own, but it does things that no other typeface does. And to achieve that, it has to push how we think a proper typeface should look. Because at the -45° and +45° angles, you have to do such weird stuff to make it work. This is very often part of our design process—as you expand the typeface, you reach the limits, and you have to adjust how you get there, how that works.

![White text that reads "GT Planar" on a black background, slanted at 45 degrees](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7ElEQVQ4jX1S2ct5URTlXvMY9wEPHnTVTQiRIUOiS5QbKUOGQogUyot//qxf+xi++8n3e1jts/c+Z521B4MgCBBFEWSNRiO3elDMYDB8xTPHnmcmCAIz/EVIZwLlrFYrbDYbLBbLr9wT7GU54YvkdUFP7PV6IcsyEokEkskkFEXhsQ9S9rxPltQ+pH+W5nK5kMvl0O/3Ua/Xkc/nUS6XEY1GuVo9ofCo6kGoJyNrt9sRCAQQi8XQ6/Uwm81QrVa5XywW3+dgMAiHw8GJvhISnE4n4vE4BoMBptMphsMh1us1drsdlsslNpsNjscj9yeTCTKZDFXy7uGbkNRRwyORCNrtNg6HA384Go044fl85rher7hcLrjdbrjf75jP5ySAeTwemM3mn6EQ/H4/79F4POYkq9UKmqahUCggnU6jVCpBVVV0u12u/nQ6ccWtVovRwHw+38/amM1mhMNhdDodbLdbjsViwf1QKMQHRH1rNBq8DZTf7/f8XCqVGG2BJEmPkkVRZCTX7/czRVEYXajVaqxSqbBUKkXlMIfDwWRZZtlsljWbTaZpGlNVlYgYEdGHFovlTcj3iiwppSm73W5QX2hIJpOJg+LkU1ySJCqRx3Q7STv4UKhbyq94T/CP3K/3zz164/X4E//7WE/6D4g+UiL8a5yzAAAAAElFTkSuQmCC)![White text that reads "GT Planar" on a black background, slanted at 45 degrees](https://cdn.sanity.io/images/599r6htc/regionalized/589003777a90c756058145f8f1699bfdf84be44e-2000x1250.png?rect=1,0,1998,1250&w=804&h=503&q=75&fit=max&auto=format)

GT Planar transitions from -45° Retalic to +45° Italic

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**Variable fonts can be challenging to develop, compared to traditional type—what is Grilli Type’s approach?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

Variable fonts work along axes, which is different from traditional type design where you only use weight and end up with static instances. What’s really different is that we want to create families that contain more than just weights, whether that's with weight and italic, like in GT Flexa's case, or weight and slant angles, like in GT Planar.

Our approach has become more about type systems than about typefaces. And it's a very small difference, but I think the end result is that we all—brands, people, us—think about how to use type in a certain way. So the really cool thing about variable fonts is that it opens up that customization to the end user. And instead of getting these static instances, you get a design space. You can pick whatever fits in that design space for your brand, so you're not bound to exactly that width, or exactly that weight.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**So it’s more about creating an adaptive design space than showcasing new typefaces?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

We have no interest in just providing BS marketing. We want to say things that are true, that are interesting, that are helpful. I feel that by giving people the tools to better understand the fonts that they're using, they're also going to use them in more interesting and better ways. That’s why we have the [GT Academy](https://www.instagram.com/grillitype/guides/); that’s why we have the mini sites. It’s to give more control to the user to understand what they're doing. I think if people use our fonts better, our fonts become better. It's how people use fonts that makes them interesting.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**How do you think variable fonts impact accessibility and user experience?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

Variable fonts use optical sizes. \[Historically\], as a design was translated into different type sizes, the type cutter would make adjustments to the typeface as they saw fit. If you look at a lowercase ‘a’ across different sizes in a metal typeface, each is completely different and sort of gradually changes at different sizes. That changed as people started making fonts in a single size.

So, with variable fonts, we’re going back to that century-old practice. We’re getting tools to effectively make type that translates one-to-one to legibility and accessibility for the end user. If the type is more appropriate for the end user, their reading and browsing experience is going to be better automatically.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgQIB//EACUQAAIBBAAGAgMAAAAAAAAAAAECAwAEBREGBxITITEUYRVicf/EABcBAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAgEQACAQQBBQAAAAAAAAAAAAABAgADBBIhURETQVKR/9oADAMBAAIRAxEAPwCxcweb+UbFQWmBgIu5jtpwddCj3UPw3zI4xTP4wXFstxbuwWSOJ/Lg+NndbkU0ccnfu7eDt9OtkDx/az/J4+KyPVJbF3YCN09j6pBvctoNcR9K2VqZZjsToECWVVcTquwDrwdUrnwZmdRqO4uun9XOqURdj1PyS9oTy/izKXaZ+2txM3ZQh+g+ifuoXJZK4nuWJKoEO1VBoA0pVtmijDXiMqEhWA5lywXGOUtsbHEnx2VfRaPZpSlaOC8STqZ//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/956e7977e70c019eda167959561742019b5997ed-1444x1444.jpg?w=1444&h=1444&q=75&fit=max&auto=format)

Ted B.

**Do you think that’ll evolve as variable fonts get picked up more?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHAwT/xAAiEAABAwQCAgMAAAAAAAAAAAABAAIDBAUGERIhB0EUUWP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayy45JDcaWOCCIQlp60dr15HjlBFi0V4oKieWZxBmEjdDv2FLXDHq+zhkszogSeuDtlWtmteQX/C3UVI+Mw8tlkj+3aPr6QZwdbRXLPFOUSN5Np4dH9AiDvRu+XZIjUAPPE9lVGLTPpbRKYDx030iINNsVRIbVTku7LdlERB//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b6963c99e4f60da0a21eaebf1441d097413ff3c-450x450.jpg?w=450&h=450&q=75&fit=max&auto=format)

Thierry B.

Designers are going to feel empowered to use these tools with their own judgment, but users are also going to be free to challenge that. I think that's going to be really cool when people start feeling empowered to question the type designer—each use is a little different and you can't really know ahead of time how a type piece is going to be used in a particular environment. Those kinds of questions are going to be really interesting over the next few years.

Check out [Grilli Type](https://www.grillitype.com/)’s work, and [learn more](https://www.figma.com/typography/variable-fonts/) about variable fonts in Figma.