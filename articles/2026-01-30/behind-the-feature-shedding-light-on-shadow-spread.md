---
title: "Behind the feature: shedding light on shadow spread"
source: "https://www.figma.com/blog/behind-the-feature-shadow-spread/"
publishedDate: "2020-07-23"
category: "design"
feedName: "Figma Blog"
---

Starting today, you can adjust shadow spread in Figma on rectangles, ellipses, frame backgrounds, and component backgrounds, just like you can with CSS `box-shadow`.

_I had initially planned to build this during Figma’s recent [Maker Week](https://www.figma.com/blog/the-making-of-maker-week/)_

_, when we set aside time for everyone at the company to explore a project outside of their daily responsibilities. What seemed like a straightforward feature that I could tackle in a few days turned into a weeks-long journey of algorithmic ideas, W3C spec rabbit holes, and nuanced product decisions. Here, I’m sharing more about how we made tough tradeoffs about a (seemingly) simple user request._

There’s a lot that goes into creating a robust [web-based design platform](https://www.figma.com/blog/under-the-hood-of-figmas-infrastructure/)

for teams who build products together. We provide a system that helps you

[develop

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABi0lEQVQoz4WSv0tCURTH79P37ntqRmIhGEVLKD2lNWhvELSh1c2lsf8hGoysKV3DBpXaLIdAIhrMoEaNggaRUpdI9Bn449t9T5+9EGr43HP4Hs6Xc+89RBTT+A+zOQ9C6nA6+wiHu8jlOmg02mi1WhMQUUzhb9IQhDwzVQ0HCAZ7yGS+UKspUJT2BITSc9b0Ax1h1CTpGm73GwKBDmKxNgqFJqrVT9TrkxCev4eOwBch8gVQ/g5G3WZ7hN9fQiTyhGi0jHi8jERCp/QLwnHMlWHmPjDPP2OdTbNKi5gyvTO9CbVOaQUu1y08ngv4fFnIcg7ySh4+hpbL2TGEkAE7AAvXQchyheTsDvZm9rHMv2q6Wjdxde0dKU2DCik4WPSyp1BRc0pTYwyGCraslzib28aBYxde4QXD2oBNOTTUf33BcoKQ/Qib9kMssty4EWNDE+lhia9gQ7rBmviAaXZdfUKjIWU4pFPI1mMNh5TUNH0jiD6F2syRPsykq5nrmtFQu/JonaQRaq7qevwGb6CEMxYFkOwAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/f81c4b4bf1c4af1da0c034133f4f21e199d2ed07-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### How to build your design system in Figma

We’re bullish on design systems here at Figma and we want to support our own users in their design system journey.



](https://www.figma.com/blog/how-to-build-your-design-system-in-figma/)

and

[understand the value of

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAACiUlEQVQoz0WSWUjUURyF/5b+m9Gyl9RWlcqaEm3IGbdMcyS3MRWddBY1cxmXNsMMNSZBpVywTLJQE1PLPS1DtDTqoRrzpRdpEyGCoofA6qGn4OumUA+Hcy+X+/0O515p+t4SI7cXuds+z2DnO/o65ulumeNKqZ2CQ3ZSVXYMqtll/ytrxCznM4YxJZ0mKS6PksJmKkraOVN4dVlS943XnC26hjHlLEU5dRRm27AVZzFWl87UZSNjF42M2lb8QZWRR3VmhmpTsR7VEReVxnGLjRidhb27A4W0SElx+ezZpWWHty8RoSlEBB+g/JgrHwZlfkwr+Diq4P2AQuwVfLqv4OeMgoVhJaUWJRo/P2KissR9DU6OMo6rnZDcNmxh6+adYoqZbJMNvU5H3QkXPo87CeAaFodl3vTJzN+RWRiS+T4tizOZ6nwngtR70UfnEqyJYaO7J+5u25BiozIwpZZSU9kvNEiWIZfawgDm2v1427Of2dYwnreEY28NFusQ5rs0zLX5U5XnT7xOT2Z6OWnJp4iONJMcb0XqbHlFa+NTUWwHyfoCQjVRmKK1dFeoBSCUydoM7l3IZepSIhM1RqbrE+itDMQSq0GrDicsOJGwoIRl4GlrE9Kzh7/o73hDjijXZ4caDxFdrfISCTx52aZipsHAyIUsHjfoGK8+Qm9FAKcM6/HZ5oKzch0uzq4oFWvZ7uXLcbMN6cXkbyYGvtJUM0HG0TLRRywHgw5TUZzNWHM5PZVtNFu7uFXSyNXiMnL1+1B5SeIRJCTpvzxEf2bDuRXgs/FfzIz+4Hr9E/EVMok8aKBWdDpwc5Ebtm9UmpcoN33hZNqQSB+Co+OqfyAHB4dl3+ThjUUE+gNoTInY4xG+dgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/6c8d34c3342468928df9aa5a8fb27c16557b6234-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### Measuring the value of design systems

The data science team at Figma set out to find out just how much time (and money) could be saved when teams leverage a design system.



](https://www.figma.com/blog/measuring-the-value-of-design-systems/)

complex design systems, enable

[real-time collaboration

### How Figma’s multiplayer technology works

A peek into the homegrown solution we built as the first design tool with live collaborative editing.



](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

for teammates around the world, and even

[improve on old standbys

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABP0lEQVQoz2WSOXbDMAxEef8bRUWSxuqkZ+0bJWot7Esg+IjpFClkY4CZAQHSFUUhbdvKPM/ivZe6rqXve8P8g8nzNU0rwzD8q4HxwMvx03Wd7Psuy7IYaZomw4jBYV1l2zZpu15GrR3HYRxqaODiYYYQSSKGFEKwrhHT+X4vXkanmU+cSjUrsebh4oGXO8/TQFVVNgZJCHRr9ARpmspHkkhVN/J4PmXddql1dBrARYMWD7wcRyWJyTiOFsdclmWSqNnn17eNi9m8BDXz0isfDprhFaNzeZ7rshuJo5dlaQQwp7zdUml07CWs7x3uukOM4MZR8cDLUWAPFLgtMDsEx/2QB3uvL+Ede+PGGlywu67LLiLukBujEPcCprtN8XoJ1OBQizvEAy/HCeLzYAd0QgxGxEf8+5z+MBy4aMDR5wf8in3CvpaJyQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/1bdc357a039e397dbea844e222e6830a82670760-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### Introducing Vector Networks

Before I co-founded Figma my background was in game development, not in design.



](https://www.figma.com/blog/introducing-vector-networks/)

like the trusty pen tool. So, you might ask: why, then, in the 958 days since a user [first asked on Spectrum](https://spectrum.chat/figma/general/support-for-drop-shadow-spread~46b62ac2-5664-4fe2-9dc4-78a9977ba48e), is there no support for shadow spread, a basic feature of CSS’s `box-shadow`? Is it really so hard for us to, um, make a shadow, just…bigger?

If you ask a graphics engineer this question, the answer is a resounding _well, actually_. A shadow’s `spread` value represents the distance by which to expand or contract a shadow in all directions. To understand when this becomes complicated, we’ll start by considering how we draw shadows in the first place. Here, a few simple drop shadows:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB2klEQVQoz4WSTU8TURSG+wM0/ACJW+FfGNds3DQsgSUs1K2JG4PpgoSNJCxgy4cJNYRaQyRtSIkubAkI2PAZSnGGFoeOLTOd7/NyTr/skBpP8ubeuXPvc9577olcGNfQ7Cp0x0DFue0pvSHjXyIZmUHMoohm12D7LnwK4Ad+c+whj/91y/07JznHDGIWRYQuP0zPxqWp4bR2FdIZS61XYPkOJGRv1TUhRgzPkmTUWhenTaA4PNAvMJ1fxcvsHF506VVuHjNHSRzWlAbshkFZ7QTp0h729AL+uCZxhIF1zr6h7mAo/Rb98VE8io90xscfx/A8E8NG6Qe7dFE0fmOl+A2zJ+tIKFlc1jX2GNwDeg4+Kzk8/fIaD5ejeNDWUhR9H4bxLPUGa2oOpm+jYJSxUMjg/XESn9RtBt6Qfx8o9dks7WN4awqDiQk8WRvHQGK8Mcp39OsU1ku7DHTwi+uc5OSrynfsV4uoenV2GL4yOYFHnJkWCxmK5eM0+XOF3uXbitP8eYr4MNm8jx+EuJ50fKuS1E8eRSLksN0GMlctHYpVCanMfWrwdcWJ1EtqabVarR0dIDcuuZy5EwCLwmpFQOEIutaEIaxI2dKJe5CkMbmWPeQ2ZP9HwhDWHZbEH/ojk3gNAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/c02fa84b2e43a52542a47fd45546d8ced60f7091-1601x900.png?w=804&h=452&q=75&fit=max&auto=format)

As you can see, the shapes of the drop shadows look familiar. To create a drop shadow like this, we copy the object’s geometry, fill it with a single color, make it blurry, and render it underneath the node itself.

It might seem like rendering a shadow with a spread value could be as simple as scaling up the shadow’s geometry. It’s true that this works for the rectangle, but not so much for anything more complex—say, Figma’s logo, which is full of holes:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACAElEQVQoz52SW08TQRTH+wnU6GfB+KDyIXwRffFDEKPhA3h50Hh50Qdvb1ZCIhFDgaDEpqU2XmqixS20RdouldLu7kzZy+yev2cGClX0xUn+OZOZs7/5nz0nVZdt6gQu9UL5nxImaoZmpfRmJw6pHwfkqh1yov5hqb65k5wzyBXKN9L7MFHkx5GBppxQQqoAK6KFGfsj0hs5vNiT2TfyeL35CUW3iqq/hYbfRdlr4rNTR0XaaIcu+CEwFJqV0na3I0lTzQKN5W7R6fmrRmdMvEKjCxN0qXCPHm0sUd5do0JvlaYay/Ss/pYymyX6Lm3aigQ7DU3pGohOKPC4toiR2XEcfX5+X0dYx9MXcHZhAneqs3jnWFjqlE3uXWsGk+z+i/eDtMtDwCe1Nzg5BDy2F0+kL2J0H1gxwKec+3BtHpl2CZZx6P0O3Gag/lfnsjcxkhk/ED9wau4yxpZv48H6IrIMzHcrmG4W8cr+gJK7jlbgcMN8BNyUAZB63Mls16L7tTm6Zr2k60O6UZk255PtIuXcVfomm/TVa9CKbJHNMN15RQlFSXzgUHCXdAffezXwj/+r9F25b8MOHfzkEjuR0GUiIYJeKonR2+2yoCCJdrvE89Zlt131h3gKdBSxTz7n6lnUMWZng6WMQ6EH21Ncv+JLxYf/VDyk4TMT+VvN0KxfjbkMMdvgu1EAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/a6a078f4bcb23fe98c5454fdc0ec494660469b86-1601x901.png?rect=0,1,1601,900&w=804&h=452&q=75&fit=max&auto=format)

If we consider the definition of a shadow spread—expanding the shadow by a certain number of pixels outward (or inward) from the geometry in _every direction_—we’d want something more like this:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACEklEQVQoz6WSzU4TYRSGewX+RK9EZQ+JF+AOjCy9AuxO4kJc4AZRE6MujIkxKZJCjca2piUK1ioUQ0C0pXTaQkpLO9POTKedn86c1/MNVkHiRid55juZfHnynjknUDLqnmxpXss2/gvhEK6AbOnUdW0fvWcy3b9gUofvWJ7z626bEbXjuWS5DglXQLUNGD0LW0YV8f01zFeWjxBh3tbX8UUroWwq2LNaWNd2kGrmkFElSN0GDNcCS8FJEeAXKXab5iqfaTQ9TUOJcRpKHjDI9cWFG3R15QE93V2kT5pES80cPS4maHIrQg/LSYrLG1QyZT+pcAkhGraOJ8UkBmJBnJq57HPaP0dwdnYUg8lx3JNieNfK4WVtFTezYQQ3nuF2/hVmayu0aVQg2j8qlJK4EL2GkyzpcyI0jDMvrvwUxn1hpJbxhdc3Q7hfjGO+vkpfWagfFsp2G6HdFC4tTeJcdAznBbExvx6IBzGSnsKj8gLes/B1fQ13Cm8wxTyvppFofqOi2cDhlqnpGLSoZGm6EKWJbJgmcnMHcH2Lz7tSjERrKXWbPqp5CtcyNFNbJiH73tkjjdM5Xu93Qu4f29060loBH9T8MVIMDwTZThU7lgLRYkYvId/dB8tAROj1p9zkCYsd4tGTwkllRvmD/jfxn0zewzbfVXk3xV665JF4xC4KV6Bhah7373Fkz2acf0Q4hOsHBVQElNmAg28AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/430cbf18db20b358a2bf7a851c3ac8611962ee79-1601x901.png?rect=0,1,1601,900&w=804&h=452&q=75&fit=max&auto=format)

But no one told me that before I decided I’d try to tackle shadow spread one afternoon during Figma’s [Maker Week](https://www.figma.com/blog/the-making-of-maker-week/)

in May. I bushwhacked naïvely through the “wrong” approach during Maker Week, realized the problem, and then charged ahead, determined to figure it out. This isn’t rocket science, I thought. _We can figure out how to render shadows of 2D shapes._

It’s true that there are a few interesting [algorithmic ways](https://twitter.com/ryanjkaplan/status/717413392474988544) to go about this, but none of these slotted neatly into our existing rendering system. It’s also possible to approach this in a non-algorithmic way—by taking advantage of strokes to emulate shadows with spread distances—but I quickly realized that wasn’t an option either; we handle certain vertex angles differently in strokes than you’d want for shadow spread, and we don’t have stroke generation code in our prototype renderer. Somehow we needed to find a way to make this work without adding tons of complex geometry code to two different rendering codebases.

## [A framework for prioritization](#a-framework-for-prioritization)

If there’s one thing I love more than debugging rendering bugs, it’s reading specs about internet technologies. (Ask me [all the weird things I learned about GIF89a](https://medium.com/@lbudorick/weird-things-i-love-about-gifs-e2fed7ccce03) when implementing GIF support in Figma last year.) I began to interrogate the assumptions we’d held about shadow spreads. We know Figma users today implement workarounds and include separately maintained documentation for developer handoff when shadow spread values are involved. If we’re building shadow spread because we want to reduce friction during developer handoff, CSS should guide our constraints. Do we really need to draw perfect shadow spreads for hole-y Figma logos? Can we even do that in CSS?!

In fact, we can't. The thing about `box-shadow` is that it only works to render shadows of _boxes_ (and other box-like things, which include ellipses, if you get the corner radii right). `box-shadow` will not render a shadow of the Figma logo as a copy-of-the-logo-but-blobby; rather, it will render a box.

_(An aside: at every step in this process, someone told me, “actually, spread values are supported in `filter: drop-shadow()`,” and pointed me to an MDN page that mistakenly implied that spread values were included in the spec and were simply not supported by browsers yet. Unfortunately, this was never true, as explicitly noted in the [W3C spec](https://www.w3.org/TR/filter-effects-1/#funcdef-filter-drop-shadow). We know! We’re sad too.)_

Having discussed with our designer advocates, who were sure a huge percentage of use cases would be covered just by having shadow spread available on rectangles and ellipses, and further steeled by the idea that CSS compliance should motivate our decisions here, we determined that it doesn’t matter whether we can render a Figma-shaped logo. We decided to ruthlessly prioritize: we’d at least do what CSS can do.

To make this happen, we decided to implement CSS-like shadow spread parameters only on shapes where `box-shadow` would apply: rectangles, ellipses, frame backgrounds, and component backgrounds. This seemed achievable by doing the simple thing, more or less—generating a bigger or smaller version of the original node. It’s not quite as straightforward as stretching the node, as this would break down on things like rounded corners. Still, it’s easy enough to generate new rectangle geometries in both of our rendering engines.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaElEQVQoz6WRTUsCURhG5yeZ/Ybod7RqrdCmRdQqIiKEFi2DCEoi1D6MNrUTISumUlMRSZPxu5mRMe/MvG/3UUOLpIEWh4G5zzlcHcUQFhMR2+RyTRhctBpcsGqewBYOXDTQUjr9LgvX4Vpf5zPtjtezJ7z8eOAJbOHARQMtGTSp79pUtOq0lTuluetV8l0EaCYeIN8UBmdygy0cuGigNbqhzdWPDoffEryk7vPi7a4nsJUOwRWDYHcYtOV1TafHqlnmy4bKES3FUUlkCl9n2EqH4MrGOIjf3xQmX9VV3szFeOX5UHI0ev7G8Axb6RBcMQ6ahOuWrCaF8uc0f7NG/niQZkf4fzD5Hls4cMX3/9BhTX6pcCXBwYc9XkjueAJbONrkV24PbuhQzxX02mvRvV6iZKdAyfYfyA22cOCigZaSahVE9r0i8kZVvOgVkdHLIu0RbOHARQMtZePp2NhOR41QJvYv0EDrEzn62MzB7U7+AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/98ca02d191d31cac616961ea2f22f9565304618e-1600x901.png?rect=1,0,1599,901&w=804&h=453&q=75&fit=max&auto=format)

Top: a shadow generated simply by stretching the object’s geometry; bottom: a shadow created by generating a new rounded rectangle

## [Hiccups along the way](#hiccups-along-the-way)

Of course, nothing was as straightforward as we expected. There were several hitches in this plan: how would we generate correct ellipses? (A true spread shadow for an ellipse would no longer be definitionally elliptical; our ellipse generation code does not generate non-ellipses, and simple transforms on an ellipse in either direction maintain its elliptical properties.) How would we render rounded corners when a spread distance was applied to a rounded rectangle? (The W3 spec defines both a general rule about transforming corner radii, and a specific formula to use for large spread values.) How would we render shadow spread on stroke-only nodes, an undefined behavior in CSS?

We solved a few of these problems with the tried-and-true science of mashing buttons in a CodePen and seeing what browsers do. Interestingly, browsers don’t implement elliptical shadows with spread by generating spread blobs; they just do the easy thing of generating a larger ellipse. Having decided to mostly do what CSS does, we do that too.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsUlEQVQoz6WST2sTURTF51spWPAD+B3c24Irg9JNRSwoilhwYUEKXRZSN7VNcFGJuEmr0ExDNLhwcGrS1s4kmT/NTGfePd7zaqWtRUEfnGHevef8ePPuOKOjFCKC/11kkOUM8gSlKX8Wf5cxZ3WRh4sMZQmBkptSCmPksCglynMJxoeynybSi2PxR6phokr1/bjGHj30MsMsGRYYZgm0AS8K8LbfRdVrYuHzGzz7WMOj7RU8aK3gsVvDE7eOh61XtsYePfRqRrwoJEOUJc7BOMZ+mqLR6+K+W8X1d09xbf0err6exuVaBZfWKrhSv42J+h27p9ijh95ZtyoNPYgyJMhicfSBQTZGJ+zjpbeBuc4q7m4tofJhETc3X2CyOY8bzedWUxvztnbr/SJm1DPXWWNGmFXGMZDfnZWF3kUhod5LL4nkSxRId7gn7fCbtAJftg6+WrnBjtZ68mm4az30MsMsGSdDQSFnp2xUhT6OyovFnjk3ZTLIsicsdEL2Tzq1zF90ejFbnEzZS/b879nI140f5vEvDf6g8JyYJYMsZ3Vnc3m97y43dtuq7X9U2zLI+gGn4Rymgg1OZAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/9b32ed449c9e7af4113232fa7147444489dd7e5d-1600x901.png?rect=1,0,1599,901&w=804&h=453&q=75&fit=max&auto=format)

The effect becomes more pronounced as an ellipse’s axes diverge:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABSElEQVQoz6WRT0/CQBDF+/0/gVzk4IXEePMMMVQgogkmJsifAg0QWxZLV9q13W73ubOUoFc7yUt2dt78djPjfEkBrTXqBjG4TOEc8gSqVLWBxCAWAbUslaZQutRFWZr8olz9lVSXGnmph6IwDGI5kaGKQoJnGTZJjGm8w1u0xWi/xgvz8RT6eA7XVkM6mzuqkWdmvNsk1jzPiKEjC8yOiLMcKx6jFyxw74/Q8vpoTh/QeG/jatzG9aSL5sRFY9yxd1RreQPr7QcL7XNuPpRrwzr9MJESTKTmRYbXzw2GbIleOEc3mFr1zXmw8+AGM5s/hjMMd0vrNT2aCYFUVj88z1DZeSmrTBVW31ay0u/8VD/7lZ1pNUPaTKHrb5kY1ZaPdkN147RlM8MJ37JNumeBOLAPEf1L1EsMYjk3Xse9Xbnund+rJWIQ6wc8hjrPiSQtYwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/a4e1f6d39c7f129cef7728f909c9f166bf7fb69f-1600x901.png?rect=1,0,1599,901&w=804&h=453&q=75&fit=max&auto=format)

More surprisingly, after following the [specific W3C cubic rule](https://www.w3.org/TR/css-backgrounds-3/#shadow-shape) for corner radii of shadows with large spread values (a [carefully considered](https://drafts.csswg.org/css-backgrounds-3/spread-radius) rule!), comparing our results with a quick CodePen indicated that browsers, as of this publication, [don't implement this at all](https://github.com/w3c/csswg-drafts/issues/1900). To create shadow spread for a rounded rectangle, browsers—and now, Figma—always simply add or subtract the spread value and the original corner radius.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACcUlEQVQoz5WRy08TURTG+weoLHxsxEeMxpX+AepWXbjSGDFRgwngIzFuRAkxIeIG2fiKUkGiRmKsFktFAbFBoharUp5JbaEVKX0XOn0NQ2fans9zJxDBuHGS796Z+53zO3fOMWQ0BUUi5DQV0dQcAokoglIM4WQcyfkM8sUC8oUCJDmNEJ8JLyhFEeH3tJxFkT3xEDMEy5BSZeQKGsbnpnBr1ILLAw9Rzap1PEKrpxdjKT9cqQCeeGz6WfVAC6rtLWgYfI5e/xBC8wmoxbxeOMksAy8k5xfoTeA7HbTV0SbzaSo1l9M2SyUd/dxIbQE7tYe+UfnAbdpuqaKN7JVyzJ6eK9Tg7iBH0kcJTSaGkmDpN8zmF2CZ+YK9vTVY86IMq03HsNZ8Avv7r+H+tA2PZz7iyKcbWG8+iVXsiZhdXRdx1WWCLeGisJrCCqC8BHxXgxKTAJZhHQMP9NejaRlwg/mUXqzEdBy7/wLmitpKYFfQiUP917HVWoktHRXY0XkOh+2NaPZ/QFvQjnLHHezsPI/N7ImYfbZa1HvalwEXbygWHgqNJae5JxY643xAlU4jnR1qpjr3S3oWdtDb+Ajd9fXQheFWqmCvinVp/CkZ/X3UJ7kplEv96aGYjJiQpMngBsMaG8KrmBMW3l/HR/BecmEw8wuD6Sl0z44tek5Y48PonhvHVz6f1bLQeNL6lCU1S1qxoFeIqmnyKXHyKjFdkywfi3+JOIn8C4kVntiDOYnmCyoz8iRYhlFpSvFmQsrPTESZSIcUTzqouJdJfE+y782E2f+3J3IFQ7AMN39YI/c8XRHjRHekiWX8Ty3lCIZg/QYMsNRRBwq5EAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/e3a403e3dca468b518b68b7bd47a38fd794f8798-1600x901.png?rect=1,0,1599,901&w=804&h=453&q=75&fit=max&auto=format)

But CodePen would be no help in defining shadow spread behaviors for stroke-only nodes, as our shadow approach already diverges significantly from CSS here. Even fully transparent fills in CSS factor into and mask their own shadows (though not other shadows); Figma takes an approach closer to physically-based rendering, allowing the user to see shadows through transparent and translucent fills, and not including invisible geometry in shadows.

Below, the same rectangles (zero-opacity fills, with strokes and drop shadows) in CSS (left) and Figma (right):

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB60lEQVQoz4WSW2/TQBCF8895QvwTHmjfQAJRhOChKKhSaC6NmjYNcRI7iR171/E1tzmcWaIQygORjpxdz/nm7Kwb6bZAtquwrAyCMsGiNE5z/lfZTY5iVyOqUrc+fx+UMZJNJgcRCH9kScPQoKawslC4mlU5m4S1hVdE8CuC2JBmWNZond3m3LO6L9V+i91hL2RJQ4vMEWiPadeqbYlxEaJphrhNPUzL1Qm43pWEljyV1VOJeurDlsBMEyoww898iY710EwecR0PnK6iLt6Ft2jaIR6yAMNsjlG2gJeHGLP+ietZsfoXqJ218MY84VPUw4ewQ7XxdtnC+6iNVjrGI83Do55Yq8/B2ic4FE38LGHu4oc1B8+5BbVxc+tnPr4lD+isJ5jxAmJtztmpYnp8XsyUCdMTMHdAsZtCCJRlbSXgkAmTGdVdT+Vz3JcbO5IJjVGdit4q5+jM6tFL4ZGl3p8SHj8LptNE10z0Jb7H1+QeV6sePsY9tLMJ5rzlhZN1tSo9UUJ/ud/8SagdN4edXr34tZG73Jd2NpXOUf08kIDJi30tbMx5VS6RKuda9xWmCZXV+B4NpGs86duJdMxYfiQjaZ1J17p/x/eqnvX+lvn97LJGWY0X7dfysvtGXvUuznT5TBf/0aVjKOsXhL8tX38b4aMAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/3aa89e701cc84a448eb569c7db8f27aa61d5ee81-1600x900.png?w=804&h=452&q=75&fit=max&auto=format)

While it’s easy to know how to render a shadow for a node with a fill (below left), you might imagine interpreting shadow spread for a stroke in several ways:

A. Outset the stroke by `spread`, leaving the stroke constant B. Add `spread` to the outside of the stroke width C. Add `spread` to the stroke width, centered so that it's distributed on either side D. Add `spread` to each edge of the stroke width, ultimately adding `2 * spread` to the stroke width

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACQElEQVQoz22Ru3LTQBSG/Qg8Ai1vwAvQQQ8VDR201DSho4GOoaWBUGQmATuZTMItkJhkQmJHE8uRE1uyVtHFulqWfDk/Z9chITPszq9dHWm/8+85lWScI5+WOMkcbHpNVJ19rLsNNBMTwThDyPLLRGnAe6neKEArEzjObOhDB+dljGI2hmRVojKDU0R42/2Kh9svcffzAu5vvcAr/SOasQk7H8AdRXCLGFYeqMQNTqYz8HToQkstBZeJJasSlhl1hx4tHC3SreXHdOPdA7q59Iie7L2h7UAnBhJnppRl5T6xc2rEPTovYhWXZ7W0T16ZkGQph/ZogNfGGu59WcDt1ae4s/EMz7UP2A9PYWYezi8c9oYejtO+ircSWzmUCRiIoEznQH4gmeTqesv2Lt6bW1jq11EfnOCMAa2kjyP+piUW9FSgzVf+EehYdQ+x6h1i3W9SIzURjYdXwPFsqiSbM5wWapWyRyEO4q5qkJTc/2ZtBpoEqXXNa9BudMoNvHJIk9mUAFzThKbUywNVM1GErIgOuXbfBy3aCDTpijq5SzuRQT/DtqrppUMGAoo0n3IwUHWVIehwrWS95H4nNLDha2o9SHr4NmihHhngpvztcnrp8N8x4ykzGqlD7VQQ144YzK591eV6aFA96vB1O2RwPJ2M5g6NRAgnD4VXxMIbXZeMm5kvupkruMPCGvrCzgNxxu9tPqentjhJnYv4QEhWZfFsq7Zi1mtVa7f26T+q9veuZO2p/6r/xq35umL+qknWH3N3Gl8bE8asAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/786bb5b419383e765e61b59348b9bb7aa956a474-1600x901.png?rect=1,0,1599,901&w=804&h=453&q=75&fit=max&auto=format)

After considering the options, we arrived at D: we thought that when you toggle the visibility of the object’s fill, the shadow’s outer footprint should stay the same, which eliminated C. Of the remaining options, D seemed most in keeping with the idea of a shadow spread: a shadow, extruded along every point by `spread`.

Building a new feature isn’t always as simple as it seems. When interpreting a feature request, it’s important to think about the motivations behind that request, and instructive to consider the tradeoffs made by those before us. In this case, after navigating a winding journey of investigations and explorations, we’re excited to ship a widely-requested feature that hopefully makes designers’ and developers’ lives easier. [Check out our playground file](https://www.figma.com/community/file/868158851332972548) to see what’s possible with shadow spread!