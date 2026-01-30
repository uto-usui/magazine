---
title: "Creating atomic components in Figma"
source: "https://www.figma.com/blog/creating-atomic-components-in-figma/"
publishedDate: "2018-11-08"
category: "design"
feedName: "Figma Blog"
---

_This post is part of a series: [Building a design system with Figma at littleBits](https://blog.prototypr.io/building-a-design-system-with-figma-at-littlebits-17edff8f4236). Read the next post on [building responsive layouts here](https://blog.figma.com/creating-responsive-layout-templates-in-figma-e310f02a06cc)._

This year the software team at littleBits faced a challenge: we wanted to update our [littleBits branded app](https://itunes.apple.com/us/app/littlebits-app/id1435611535?mt=8) for the launch of [three new kits](https://shop.littlebits.com/collections/fall-line-kits), and we were also excited to create a [Marvel themed app](https://itunes.apple.com/us/app/avengers-hero-inventor/id1420127248?mt=8) to launch with our new [Avengers Hero Inventor Kit](https://shop.littlebits.com/products/avengers-hero-inventor-kit).

All in all we were looking at releasing four new apps (two apps, deployed for both iOS and Android, targeting both mobile & tablet layouts!), and we had uh — around 6 months of clear roadmap with a small team.

As we were considering how we would approach building our design system, we looked to existing methodology — primarily [Atomic Design](https://atomicdesign.bradfrost.com/) by Brad Frost. We also looked at popular front end frameworks like [Bootstrap](https://getbootstrap.com/). This post is a look at how we built an atomic design system in Figma.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAIAAACHqfpvAAAACXBIWXMAAAsSAAALEgHS3X78AAABXklEQVQY0y2Q2U7CQBSG+0g+kPEpuPAhTEw0GC+58kLjckEaEQImRmpkkaUaq7RA0dLFFjq0nZnOtOOxODk5+f85S3I+KeM8YwyyECLPc1Y8EKLw/yFEJgT88iyDEs9zzDnhXFp6nuk4/noNMzHGM8dZuG5CCKbUDgIoQU4oJVmGKEVJQtLUJkRx3PbclG4Gg7PR6MkwVmE4WS7PO53rXg9WzGz7SlHKsnzZboPdpGmAsReGMP8crEr9l73anVTudg/7/Yamfbvuo6YdNOpHrVZP11XDOJHlUqVyXK2+mWZIaUCpnyRrQh58f7fb36nVpeZ02tL1T8vyw/B1sagOh7eqOrGsL8+7V9ULRWmOx1YQbBhzKYVAjH1E0enc3H/XpJ849hCCa+FmhLGNkINQRAhhzI/jJUKQgQ3cvEpTCEAVcW5iDCskAAgYswLpH+0CZsFa8EJv7Zb2tnNrQfwCNLt8r/gRlgIAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/35fe8be3a6cf55b8a1b673c483e1874c3e954eea-700x246.png?rect=1,0,699,246&w=804&h=283&q=75&fit=max&auto=format)

## [Atoms](#atoms)

On the Atomic level, text styles and [colors](https://www.figma.com/colors/) were defined using Figma Styles.

A set of icons (customized from [Modern Pictograms](https://modernpictograms.com/)) was imported and converted to components.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAABfUlEQVQoz22R62rjMBCF/f4vk/3RP32BZWtCWq/TBEJuDnbsupYseSTrZmt2XLrQQgcOGgTn05lRYm3469y0KHd2ehpH+yCF3EgpzTgaVEov8l3X8f1+D+v1ek7TFPM8j8fjES+XC16vVyyKAquqwsS5oEmKNFrr2kFC2r61OWfcqEGj7AEBlOdUh8MBsiybt9stnk6nWNc1CiHQGIPWWnTOYeL9RE3AECY0o1XsXWRlUb+yjhkQgP27QDUoT0ZOENjtdjOd2DRNpCnQe49fa0kYSfMCHbWFrhXPZfG2ZV0/ggQUTESttCMzO5/PA6WcabRID5DHxXme49dKrPEU10dnA2pNoTrx0lbNa8+5VQA0sqB7HYZh6GlX+na7IfU4TRP+VAlBFlA0xlFCA0qIjWjqZ0k7U1LogXegleIEuVVlWd7v9w4AGAEZ+RmF+tD/Pvn8RQJaWq4ls/jT8/ujEGyjpMwGzlKt4DdBHukTVrS7FcF/hRBWBPgmgq7+AbZmDQ8mVkGOAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/4975808c75f64909ab1ea67da13da1a925c8da4f-1800x625.png?w=804&h=279&q=75&fit=max&auto=format)

We drew some of the swatch names from Bootstrap. Knowing that colors would be changed in themes, we wanted to use semantic naming for key UI states, and Bootstrap’s were a familiar base.

We extended Bootstrap’s UI and Grayscale categories of swatch with more detailed brand swatch sets, and specific swatches for backgrounds, overlays, and outlines.

## [Molecules & organisms](#molecules-organisms)

As we developed our templates it became clear that it was not that common for us to have complex ‘molecules’ or ‘organisms’ that were re-used between multiple templates.

So we named everything from those categories as ‘Components.’ This was a simpler structure that also mapped well to what eventually became our React Native components.

Components included basic things like cards and tooltips, as well as foundational things like buttons.

The release of Figma Styles mid way through our process allowed us to drastically simplify the layer structure of our components — this helped a lot with general usability and document performance.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABt0lEQVQoz0WSTW/TQBCG/WfhAleO/AMu5ciZE6itBKqQ4FC1QBFSUpWmqBSSEppgx5+7653ZD3sd8a6DYLQHz86+88yHE9GosiibumFm5zwRN7VomoaIuq7r+8G7YE3vXB+90UIfYMMwJMxGyZY0ee9x731HmqEc3ShgbYq0zn9XWhFuhtF2ocRaByWweI100IPvAAKgB9BXm/ri4+zTu8n32UKJFsztdouiIEyAssY66+AjEMXwrNtViO8yq84/XJ4enU1OLta3qTMO5M53hk2yexH1kdajWI51cOywiyEl9GqZza+Xi2/L9C7XLYPwX8xklGrRp/NeOkp1JVjtyEhKpap/ZJurO5z8eq1uC79RXnIUo2wkg9gYtp5TW97QqnRyHGuwkvXnn82zs/LJcbV3Uj09FXvv9fMpXa5NywlGojWo7B11tGn1r8qW3NvYfwimasXrWfHoVX7vRfHwoHiwX9x/WT5+I45vWNEoxqZaciSCXAxyHpwa1xiXabURX1f50ZfN/iQ7PM8Op9nBNH97JeeZNXHavW7jqg1pVDl4NfQ+hL+/AWaG+clGilr8O1IotIgHfwB1Hi5Z+V2H4wAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/02ae87f8a78755af483f932544600c520a0ef2c5-1000x495.png?w=804&h=398&q=75&fit=max&auto=format)

If your looking for an easy way to create a custom color palette for your projects, try our [color wheel](https://www.figma.com/color-wheel/) tool.

Because it was so simple to mix and match text styles with swatches, we didn’t create extra components for combos of color and styles — we made a style guide for reference, and applied text styles and swatches in templates as needed.

Semantic names for swatches also helps keep patterns and usage clear — for example in a light theme, the “bg — light” swatch is used for background colors, and “ui — dark” is the default for foreground elements. When swatches are used in this way, it’s easier to edit colors design wide in future, and be confident it wont break things.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAIAAABM9SnKAAAACXBIWXMAAAsSAAALEgHS3X78AAABAElEQVQY01WQS08DMQyE9///KC6ICwdEhUBFUFVLt6W7eT8c20lWwtueGI2iHPJlxh7mSemrhYyt9VZ75ba5tna7tPrPBTGlBFCICAmHz/fjYf+jZpczOh301XgTcoLkc/SZUP5olTayt54LLtaLbUxQyvD48PL89HYaZ+/SdLyMX6floqNLZrZmcQILU6UWd1ECnBY7KadihoLD7vV7/zEq5SVZMp2WRIAIQgYbpX/njp4xcOUqhbW2LqTCzLUOUtjoECMUICqM20mCnQ5n2YWMzbn5Edw5E5AgAPJCmmwaEBCRmLbZeu33xUi4LDKY2NvasKdfzJqk+bqu9aY7/AdAWlVabwIhwAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/26a552579f5ce789e28d6dffb2e3973074bc07db-800x255.png?w=804&h=256&q=75&fit=max&auto=format)

Being able to mix and match text styles within a single text box gave us flexibility working with text where copy length was variable.

For our main button styles though, we did create nested components.

Some of our button styles had outlines (which still aren’t as easy to centrally manage in Figma), and buttons are of course repeated a lot across the design.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAIAAACHqfpvAAAACXBIWXMAAAsSAAALEgHS3X78AAABF0lEQVQY03VQ2U7DMBDM//8JvCN+ApVTgEAqpS1N08Sx4/UeviI2VLzBarQa2WvPzDZM0fvgvReRnDMG2n+0L7dv709rO7gUU045x7/RpJSJGBFj1IPMLEM37jbtYdd5B1FilPQfmpwLkSBSSqmUEll858z6aD97smFRSGeUBbn8EmWliZIBECCoQ32cgOjxAFfPcP0ir13FNMdSOddY5lLnOpdS60LqPM8NoTg7aS22VXlCuNmOFytzuQp3uzRxAhGL4lldqJoGEWLtqt1gYGedLuycWZDtdmjvN+3Dxu0NeXL9NHwN48kiMAe2vetbMw6OAjW6oRCQmfNP6ZeThb4d+qOBKdB5+mCcmZQjkOnscX9abh18A0HsjzvviWiHAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/d948e90643d8cd39abc152ff1ca37a4aaff3ac1b-800x275.png?w=804&h=276&q=75&fit=max&auto=format)

We created Primary, Secondary, and Tertiary styled versions of of our button component, and also called out some other custom buttons that would be repeated a lot in our designs.

And just like that.. We had a great base for a system that mapped well to components that would be defined in our React Native app.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsSAAALEgHS3X78AAADXklEQVQoz02TbUxTZxTH70e/GJwm0znNlGANmVhRpOXeh7a2CBoxY7lLIJPMsZENLBVrS8VWoBaLJIv4EroPhpmw1Q+LgoaEOWIUaGlLL68tG/g2wwoSpQVu7/vT2xlvh1FPTp5P55d/zv9/HgT7oDQajUFvcP96s/1qe8W3FQUFBRgGUAzNV2pLsg2V2a5yRWMRiqtQjTSMYhiyigEApLekpMTV/nN4Yio8Ee7u6rbb7aWlZVqt7uD+r8ozLxllfxp33/0up+1LZXUBejQfUyPvSJ1OV2eu83n95HKcodnoYiw0GXK73SaD9Tiw6zPuWLYNW2XBs/IBk+JWJWjFVT++Vy4rLfut0z0fecFzAhQSEIosw83Nvui54W8q/MOc7qlPJxoyRx3ZE61oqPnAgFHXgUgYiqKFhYUNtsagnyCX4lCAYiKZapiM/sv2XZl1gtGU7I4Re9a4c1/4JzB9QTt4Qns5paxSqSR7bv3eFXk+R63QAieIYvK/5GueEqf6YtfL/7ZlBuvTgzbZqH3XREvOXxfBuFFz4wvVNym4uLi4ra3t0fRjiqRpkmEoVuATCZhcmGa6rM8asoLmrQGrbKRp15hjT+hibvgcuPd1vlkDdIhara6pqXn4oJ+KU4mEyLE8E2d5FlJRIXBzoVU9ZtjgNW70WzNGzsvHW/aHmvMC1eDaIYADDCA4jnd0/BKZjUg+8TzkGJ6jpIbPR8jOqhnT1iH9Oq/xE79tB+HYM96iGLOgt3FQrcJSUSPNdgcRIKRsWIZfWaLIKMmS9PIcM3B93qEgaj7ynNros2wPNn5OOPeONSn6K1CnDitejQgZ7Lm/8HQO8pDnYDxGU9FlenHliWexs3q6brtPn+Y5LcnuDF6QE86cwCll51H0OMBUqwEjr2Yi1PwSZISEIAqSUzT16kms79I/LYAwbvaeXO99C+8dtuX2HlNaD2BF/59m6q4QdolmYzRHSRtDyTCW5EO9L1345OlPPbUfe4ybhsxbAlLC5+SeqlzX4bxSgOW/+wsI5KDACBzNST5DQVyYoW9bn9XLfFVr+w0bBk1bfJZtwbMZRG1WN55bq8Z0q9u+hUUoSscE+YTUPC2G78UuH5k8kTbww5qH+rRB02bfmc8IS8bQ93JXkRIHH5BSvQGAZ/NoUkUPiAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/bd66f9f73b23a2e6b046957db312751fcd8455c5-800x590.png?w=804&h=593&q=75&fit=max&auto=format)

Next step was to build a system of [responsive layout templates](https://blog.figma.com/creating-responsive-layout-templates-in-figma-e310f02a06cc).

This post is part of a series [Building a Design System with Figma at littleBits](https://blog.prototypr.io/building-a-design-system-with-figma-at-littlebits-17edff8f4236). Read the next post [Building Responsive Layout Templates in Figma](https://blog.prototypr.io/creating-responsive-layout-templates-in-figma-f7fe718d633d).