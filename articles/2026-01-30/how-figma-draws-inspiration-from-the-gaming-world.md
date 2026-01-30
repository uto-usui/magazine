---
title: "How Figma draws inspiration from the gaming world"
source: "https://www.figma.com/blog/how-figma-draws-inspiration-from-the-gaming-world/"
publishedDate: "2023-05-03"
category: "design"
feedName: "Figma Blog"
---

I’ve always been drawn to video games. There’s no feeling like immersing myself in a different time period and location, getting to know a wide range of characters and stories, and experiencing incredible graphics in real time. And building them is equally rewarding. Before Figma, I spent most of my career developing game engines for different consoles.

While we’re not _exactly_ developing games at Figma, one of the reasons I joined is that there’s a lot of overlap between video game engines and the technology that powers Figma. On the engineering team, we borrow elements from the gaming world, and that playful, collaborative spirit is a consistent thread throughout Figma. That extends to our technology, too; some of our most interesting technical challenges mirror those in gaming, from infrastructure to the user experience.

## [Engineers as digital world-builders](#engineers-as-digital-world-builders)

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEz0lEQVQ4jQHEBDv7AJm5+aK++KfB95279nak+EeI+zF8/jqA/EqH+E+L+GSa/I+1/q/I/rzP/azF+Xej90CD+yx6/0mM/4Ou/wB4pfiAqfmGrfl/qfpwoPldlflIiftKiftelPhomvZwoPh2pfuFrvyjwPunwvl+p/ZOi/k4gP09g/5UkP0Agar2g6r2gan4bZ76YJb7apz4Zpn4XJT7Y5j7c6H5gar6d6X7aJv8dqP6g6v5dKH3XZL3U473U433WZH3AJO0+I6x+IKq+Wuc+mGT9m+Z63md5W6X52KP6GKP5muU5WyW52GO6F6M5GKP5GaT7W6c83ul8oCn8X+n8wCRs/uNsPuCqvx1oPhukt1xhrh3hqp0hKprfqdhdqJgdKBpfKdrfqlkeKRddKVqicmGqe2Yt/OMr/V8pvoAo7/8oL38mbn8k7L1iJ3NfYSbfH6Le32JeXuGcnN9cHF7d3qGen2Ld3yMcXqSgZO9nLXspsD4l7f7iK39ALnM97bK9bDF8qzA7Ky736avxqSkraKgoZaYoZGPlpSRlZSYopWYpZ6ktaWwyq694bjL9r3P/LjM/LHI/QCjs82issmaq8GUqL6muM6su8murqC2rYygopGUmIqio5Cgo5aamZKws7TE0d/K2fHQ3frT3/7R3v7P3f4AZXyJaXyGZXt7XXp0Z4aAaoV6coJdiotUg4NUfYBSm5BlmY1vfYR1iZyUm7CwpbnHxdPn2+X62OL5zdvyAENiXkVjW0JhTTxgPzxeOztaN0ZbNF1gNGBXLG5YMZ5vTp93Y3B2dGZ+dWV8b2mDhJett8HQ37HD2I2pwgAvVjkyVzs3VTg5TzM8TS89Ty5BTi5LRipIOB5WPCN+VjmGaExub11yfV17g2F2g3B6k4iHoqZlipw8a4YAGkIhKUYrMUMzKjkzKDYyLTowMz0oOzQfOykWPiwWRjwbS04kWGIzfIFKnZt1n56FhZRzaYprQnRkK2NfABk3ICc6KiY1MBssLhcoKxssJicyHjM0Fz4vEkYtEkItEzcuE0dCGW5oNY6Kap6dfJWdYHeTSE2BQjt5QAAdMykgNTEdMzMiMiwnMSMlNBwtRRk3TxdDRBVYPBddOhpDKRRBMxNcYSd5hUuQmlWXpkKEojlWiTc8fjAAFEJbFEZgG0ZWLEM4ND0hMDsYMkcWOFAeQEUeVEUbXE0bQTQVNTERRlgYZHYpe4QugZUqeJ0uW40xQYApABF1sxNyrRtkjCNRWSZENyg2IS0uGDs2JkY8J0hLGkVZFzZFEzA8EDhHElBQGF9gHGN9Hm6VJmaNKkV2IAAZn94Yl9QXgrcXcZUcY3AkPTkyKB1HNShSRShJWRo8ZRU1XBI7XxJEWhVMRhhIRxdRZRttfyhmeihBaRsAKKmxK7fEKbnJJrLHKpOXLlBBOjUgTEQnUFAjRVwZN2AWNl4TR28TVm8YUlsaQ1EXS1QdYl8qVWUjPGgUAD+eTk7GdUnaozjWzTmrmjNZODE+GENPHUtQHTtFFys9Ey46EkRNFFZcGVVqGlV2HFlkJFRVJj9ZFzFdDQBNlBJkxjVV24M718g/r5Y0WTQqNRI/RBdLQxs1LRYlIBIoHhM+KxdOQBpUZhdoiB9lcCpGUh8xUwwsVAk5uypNXB6haQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/bba486cc951b814b7b3728f77bd7e8a6610e27c8-2048x2048.png?w=2048&h=2048&q=75&fit=max&auto=format)](https://en.wikipedia.org/wiki/Minecraft)

[**Minecraft**](https://en.wikipedia.org/wiki/Minecraft) is a 2011 sandbox game developed by Mojang Studios. The game was created by Markus "Notch" Persson in the Java programming language.

To build vast and imaginative spaces, game designers and engineers utilize “game engines,” collections of different systems that all come together to help us visualize a world. If you’ve played [_Minecraft_](https://www.minecraft.net/en-us), you know how collaborative and creative the community is. After all, it’s a multiplayer game where you design your own world, so there’s a strong culture of user-generated content—like maps and games—to customize your experience. It isn’t unlike a certain creative collaboration tool where people come together to bring their designs to life. 😉

Video game engines usually start with the same building blocks:

-   A graphics and rendering system to display the objects and effects you see on screen
-   A control system that enables you to take action in the game’s world

On top of those foundational building blocks, depending on the game, you might want to add additional systems. For example, _Minecraft_ might require:

-   A multiplayer system to allow you to see, collaborate, or compete with the other players in real time
-   A physics and collisions engine driving gravity and how you physically traverse the world
-   An animation system to give life to your character’s movements
-   An artificial intelligence system to drive all the NPCs (non-player characters) in the world
-   A combat system so you can fight with monsters or aliens

In Figma, we’re effectively building a state-of-the-art 2D graphics and rendering system on the web, the same foundational building block used in video games. For every text, shape, and line that a user creates, it’s the engineering team’s job to bring it to life in the browser. Users can pan and zoom to their hearts’ desire, and we ensure that the objects show up correctly on the screen at the positions that the users expect.

![A black grid on a green background, with shapes mapped along the x and y axes like a graph. Underneath the grid, a different system corresponds to a different grouping of shapes: Control system; graphics and rendering system; multiplayer system; physics and collision engine; animation system; AI system; control system.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACsElEQVQokV2T20sUYRiHvYgoc2Y1TdFVyc5rlqxRdrI1T1Qed8ddw8xMMAXFLDMqpBTSIiMx192dPbrjITVZRCiLLrLoIgoKuo+E7rroX3hqZnfTvHjmm3l5v9/3vt/83hjdtA2930ymXE1esIzB0B7GFrI4MV2MoNQiRplY876eSSvitA1xpo6Y1HGJmoEiWu6c5PRwMRXBE0jKUXYHziL4LYgRdH7pH2KUgAUxICGOS2FRVXC/q5JHnYeYas6hps9EzpNSjI+L0dvLETw1iF4zOq+FBHctSbKNFFcjGa4O0uRW4j02BK85fKhaqSp42F6Ovy2XF40GbL0FZD8o5cBgCWlPy9G5zWT6mjAGuzEq3eT4OzksD1DqCHHcEUAvt2kH/idocFVpFS7X79HWht4CqvpMGIbPkOiRyA/c4ubsIvdDy9yYW+Sqsky7ewWz4yO7XXfQeSUEtXUl0nKyz4x0LZ+piu28rc7iZf1eXC0HqeovJF2WKFTuMjL/kcXFXyjzKwxN/KTb8xuz4xO7XLcR1wuKcjXpDbmUG7bSZ4hnrCid3pZcyh6ewTTdQeeSk5GlNwzNv6NrfIkr8heanN8psofYPtZFgrsO0SettizYK9lkyWZLahz6bZsxlOxg571CDP4L9Lxz8WHlGzNfl7HMDZItX+eQc4RjzgAGex+Zox2kOJuJ91k1QZ1Woc9C7K1TbKzcxwZTFptajxA7WkHGZCOd7x28/vGZkS8h8mbbtY3bfI0key+T5Gkg2X2JJM9FdAHrqm1UQ6q/Xhg+R9xgqbaKPjOJig3j83ZqXvVjWughValHUP02bgnfWbAWXdCKqBExtyb4rC78oaLeQyRZnLASr1hJnDxPwoQtbF5tYtS8SH4UdYqmIpOiPjTRKOoIqayNRePrY2tRdf4K/gE0Cf9ceUIGpAAAAABJRU5ErkJggg==)![A black grid on a green background, with shapes mapped along the x and y axes like a graph. Underneath the grid, a different system corresponds to a different grouping of shapes: Control system; graphics and rendering system; multiplayer system; physics and collision engine; animation system; AI system; control system.](https://cdn.sanity.io/images/599r6htc/regionalized/b998a7652fec678c49ac3855d7c3bc08a77042e3-3200x1864.png?rect=0,1,3200,1863&w=804&h=468&q=75&fit=max&auto=format)

Video games have many foundational systems, depending on the type of game.

![A visual of the systems that make up Figma's building blocks. Each building block is a rectangle with illustrations that corresponds to a system: control system (plain grid); graphics and rendering system (wavy shapes); multiplayer system (cursors collaborating); collisions engine (shapes floating); animation system (balls bouncing); chat and audio (chat bubbles); components and variants (shapes arranged vertically).](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAADA0lEQVQokW2T7U9bZRiH+wfYU4mCszUg0WhHopufyJaBji0MFym0PW2VbKOlgdIWCnS4l5Sse6nlpQyRriunpy/nnL7SwsaMhsQt7MO2LzPRP+kyLVNj4ocrz537fp4r94ffoxMqToSig7aik66am+MNH5/UpjBXAvSUZuhU3bytOjCoDtpVDyZlFpM6iUkTeb84ikmz8WH2MkbJR5s6jk7QHOgLNtoVF72NOb7+OcL53Qie8gOuyWksqTA9speT+UX65CTnpF0GM3EcsgXnQwvWB98ylphm4N49OlMhdIJqR5+38k5WxFya4PO6n1OV6yxpuxSkA0LJBM58grnSE2bl1/jSr5mSl5ndHuXmSpA7sQCZuJVbcTe96eaGih19zoohY+O9jJuu3Dy9+RhLxd+QlD/xZRRc6ibfl6tczz0lLB0ykb3LUGaC8Y0fSMTCPIuepLZu5qJ67l9hm+TgeDrCQLqOmNknXnqGXP6dYFpiKDmJWHATLsSYlw5xJvNc3AgwvhVhdWuaV2sf80vqGCPlM0fCt7JWOiQbQ3KIhazKnLzHj8UdapUD1jfWmIlewPbTebzZWwS3X+JfU7hxQ8QXsxLOXeB57Ri/1juwVP8R2jDK3+AvD1Dfs5OsRElVGzTqL0gmVoj5TxO6+iXe1XVmUocsbd5h+fYZpuL9XJb7kBqdbO51018+i87QFOZsGHMjzD8a5uWLMR49vU1m/4Di4z9YXFnmu9ETTIpfEIjGCD084GomQjR1lptrTsYTl3Bm+/iq3E+XNoyumUG9YqdDcTC6P8P9V6vcfb7FwmOFcH2HwfvX6PT08un0KQa3FrEWcgxmo1ikMTyr81iWF+jZtvGuNoJBc6BrBVsVW+Htqrg5UQ/y2U4QcymAWQvwQfYK+s1h9EkLJvUK3Zofo+LFmL/ER2kv3dse2nMigmJDKDvRCVUXQsnR+i2CJrZCrlftrbpFyYGhSfHoFIpHPX2T5ptmTxWPqDSFNRctadWFoUnFiaHypn7D3/P/3Pu/ec3FX5RnIe+paCCbAAAAAElFTkSuQmCC)![A visual of the systems that make up Figma's building blocks. Each building block is a rectangle with illustrations that corresponds to a system: control system (plain grid); graphics and rendering system (wavy shapes); multiplayer system (cursors collaborating); collisions engine (shapes floating); animation system (balls bouncing); chat and audio (chat bubbles); components and variants (shapes arranged vertically).](https://cdn.sanity.io/images/599r6htc/regionalized/b9cf3f0adb501089465b8cc639fa9c9d77cef521-3200x1864.png?rect=0,1,3200,1863&w=804&h=468&q=75&fit=max&auto=format)

Figma shares many of the same foundational building blocks, with systems like chat and audio layered on top.

Just like games, graphics and rendering are just one part of the equation; much like _Minecraft_, we need to build on top of that foundation. Allowing users to collaborate is core to making Figma work the way we intended. In fact, we were so inspired by cooperative games that, when it came time to name Figma’s collaboration engine, [we called it “multiplayer.”](https://www.figma.com/blog/multiplayer-editing-in-figma/)

For example, in a video game, Player A might lay down a building block on the street, while Player B moves a flower into the same spot. In this case, game developers would have to resolve the players’ actions in real-time to avoid collisions. This is something that we also do in Figma, for all of our design elements, so that users can add, move, and edit things at the same time. And while you can’t fight monsters or aliens, you can lay out blocks and pixels to perfection, which isn’t too dissimilar from a game of multiplayer Tetris anyway!

Figma’s multiplayer engine is just one of the building blocks in our digital world. We call our building blocks “systems,” and, in addition to multiplayer, we also have an [animation system](https://www.figma.com/blog/how-we-built-spring-animations/)

to make interactions more delightful on screen, and a collision engine that figures out what your cursor is hovering over and how to connect items together. Collaboration in Figma is such a key part of our user experience and—like a multiplayer game—we need to integrate systems like [chat and audio](https://www.figma.com/blog/talk-it-out-in-figma-and-figjam/)

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAACNklEQVQoz1XSS0hUcRTH8auMDtbcK0hpYRIajYTZQlpki0SiB6Old+Zeza6hjvawwElTa5QIDZloE4Rjia/R8UkiES2KXJnpQgsjhGrVLoMULA1S6Nv9O0Pp4nD+qw+/c85f0tQ/6PmgOddQzy2Re+Eravknqm/10/agiqePDUb8pymrTSPhRBJR2Slsq8pE7shH6dWQO9WNrgzoKH0a0j9Q/4Xj8jzHGl5y/O4QpW1emgdPMjqUynhHHJ6SGBKSoolM2E6MlobcegYl4ELucqIETTBogj3OMKhCcdESFTWvMJoC6M0BbrZfw9dxgEavjeYrErlHJWSrhMVmQc6zE/swxwRcKN3OECZSmm9JD4PlxgItdcPca3xEvecZ7T4P/tvxnM2OICsjEvveCKItJrozmkQjlR1+B7LABNovQNd/UDNHNvQVPO733KiYobJ4lrrS65TlKGTYJQ7tk9gTLxFnM9/pFjKr7SR25iBvTtinbQVFLzAPU+hcR8v7gnqqnqzDu0hNjiI50crueCtHDsZQczEOd2s6KcFcbALsUkPYxg5d5g7DWKiDy+zn9W94r7bhq1WpLHWguVQ0TaWhppCxgRLuPC9i/7COTexNHCUQHtusLQlFCdBtLNPdMs7b4VZmXowwOfGaN1PTfJibZf7zFL5pP/bRMmz92kYqWaQUOxwoEGAo2Waw3PhJb9MEH4d6+D43yfLiIiurq6z/XmPhxyL33z3BPnYJeVAnti/0F+Xw6H8BhqaUxUOlzaoAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/afaa64f870202a5335047d9c5d827c1036ba9aad-4240x2000.png?w=4240&h=2000&q=75&fit=crop&crop=focalpoint&auto=format)

### Talk it out in Figma and FigJam

](https://www.figma.com/blog/talk-it-out-in-figma-and-figjam/)

[Today, we launched](https://www.figma.com/blog/talk-it-out-in-figma-and-figjam/) [audio](https://help.figma.com/hc/en-us/articles/1500004414622) and [cursor chat](https://help.figma.com/hc/en-us/articles/1500004414842-Send-messages-with-cursor-chat), introducing two new ways to communicate without leaving Figma and FigJam. Now, you can quickly add a question to your cursor or hop on a call to chat with your teammates while you’re working together in the same file. And if you’re jamming in FigJam, you can even high-five.

to let users communicate in real time. Additionally, we have systems that are more tailored to our users’ specific needs: an auto layout system to help users visually organize; [component](https://www.figma.com/best-practices/component-architecture/) and [variant](https://www.figma.com/blog/bridging-design-and-code-with-variants/)

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAABW0lEQVQoz5WSTUsCURSGb2nYokCEwmhVQctWLfwBbdu2cOWmli7CP2A/oE2LMqyV0ocRLSoonXGaZiZCcBIrmCaQCEojBb/yo9G3myUaTotZvLxwz7kP59z7ElwRfKspdbwhEnxeEpRZgnyYoBghqF0QaMJPvbu3fb8togesCxYUuFHkouPIRseo21HibajR88YvsGkEWJHseI85kU548SJ7W55LLqMcc0CTLMaB1esJZO9X8KxyUO84pBQBb6kzFJKLqEtW4yuXBTueeBeS3BrizDpk1gdFWEVGnEdNHPozYfeb9gDbhTxjRXxnDmG/G+EtD879HrDbS1AOZ1HhB3v6/52wAxyGHHQg4nOC2XRRd4HZWMDt7gyKbOdj9MC6wA/OjNTRCBLBKciB6ZZuApN4CNmQPjGhROOkiQaAVZq51+M+qCETlH0zBQ1Q74eyR/B4QJA5pbnk9YFfkBj2FX7G4bAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/75a982ec665a13478d1fd5ca7a13e49ded3b1f8a-4240x2000.png?w=4240&h=2000&q=75&fit=crop&crop=focalpoint&auto=format)

### Bridging design and code with Variants

](https://www.figma.com/blog/bridging-design-and-code-with-variants/)

[Today, we’re excited to introduce](https://www.figma.com/blog/bridging-design-and-code-with-variants/) [**Variants**](https://www.figma.com/best-practices/creating-and-organizing-variants/), which lets you combine variations of the same component—simplifying the asset panel and mapping components more closely to code. This feature, along with changes to the Inspect panel and updates to Auto Layout, will enable designers and developers to work more efficiently together. Below, we dive into how we built Variants, including the crucial pieces of feedback our users gave us along the way.

systems to help users build a library of assets; a

[widget

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAACOklEQVQokSWSS2sTARSFZ2H/QqEbcdONqLiXgisFsdpF1eDCNjFtXs1r0mQmmZlkkpkkTZqkbxutxaV7UdCFmyKCLkVBKyIuClIMqGiLbXI/Sbu4cDkH7jnwXcVMClZGqFvCvAZO7JBKusNq9Qe1/AEVA9rzx54RhEQAogGYs4R2XVgowebqPx6svWHaW0Cx011cS2gWoWXCfEaoqgfU0gdUVKE6CwtGXwM7DLkZUEOQiwvVtNA0oVHq4JtYYXj4HErY9wrb/ELD3aeqQS0Fyxas5GHZhJWCHO0NDcoxsCNgRqAQF2oZYc2BZnEXz3idoaFTKOfPXsVzs0Re+0Ap2aU006OV7bJaFNpl2KgJD+vCugutLFTiQjneDxAWTWHBgKaxh5nYYnzUQBkYOMGZ0yOEJ59hx3+R8X9m1veeYvQnTR2WC8JmXXjUgo05aLuw7gjrznFAMQJOFOa0PxRT31AGB08ycsFDPLhFJrKNZ2yJ8St1tKltGjo0s8JSQbjXP1SG+xVhrQSLZg838Zvs9C7Z0B65GBTSoFwfbRENP8fSd/BPvODiiJexyzaZu1+pJMBNCXm1P+CkoJwU7BCYwX1i3tdMeh4T9n9CjfbI64KSjHSwM/vY6l+mbj/l2iUD/40n6N4/GH7Iz8gRUS0BZp90TLACoAX2CE685M6tNsnwO7JqDycHiqNDWYV88PCoVXLyLbp/h5yvR84LhZBQSUPDgYYL9Vz/XcDNdinq37FiHzFjHeIBIRWC/0c9+bVZULyuAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/17ad83cf182c246908d7b9121c7cd24aa02b3169-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### Bringing the power of our open platform to FigJam

We are opening up our platform and inviting all builders to create the first plugins and widgets for FigJam.



](https://www.figma.com/blog/bringing-the-power-of-our-open-platform-to-figjam/)

and

[plugin

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABTElEQVQoz52STUsCURiFHXXGj3FkZmrQEGxAqoVKtppoIimjoMA+FhK0s72g4MKNCII7d+7yZ/hLdGsLFcGF/+FJBwQLqqELZ3Mv97nvOed6PB4P2xIEAUmSiEQiRKNRR7IsI4oSwWCIcFjG7/fz/d6Wvm6EQiFs26ZWq9FqtWg2m5TLZbLpNMmYQWovhqGpzqOugKqqUqlUGI1GLJdLPsZj3vt97goF7rPHvFhn5A4OURTFcfMjcHOo6zqNRoPFYsF6TSYTOp0OefuCx6snXp/fyJ1YKKsovG6AmqZRr9eZTqcOcD6f0+v1yBeuyVzekr15IHmUcSb0eoW/La/LKJVKDAYDZrMZw+GQbrfL6bnNbmqfHTOJbhhO1r9a3mjdYCKRoFgs0m63qVarWJblRBEISKsyRCRRxOfzuStle1LTNInH4399E3fA/+oTMR75Qysxuf8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/d115570e5b76580ec1ed82b94662cfb6ff6077bf-4240x2000.png?w=4240&h=2000&q=75&fit=crop&crop=focalpoint&auto=format)

### Plugins are coming to Figma

We're introducing the beta for Figma plugins, and we’re calling all builders to apply to be among the first creators.



](https://www.figma.com/blog/plugins-are-coming-to-figma/)

system to empower users to build their own systems and share them with the community, and many, many more.

Systems can come in all shapes and sizes. For every core structural system, we can also build a delightful, smaller system on top of it. All of these add up. We have to run many systems in Figma and FigJam—of differing, and sometimes increasing, scope and complexity. On top of that, the code has to run inside of a browser window or in a mobile app, both of which present more memory and performance constraints. To satisfy these constraints, we have opted to use a tech stack that looks more similar to a game engine’s stack than a web stack. We build the canvas in C++ (then [compile it into WebAssembly](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/)

), which is widely used in game engines for its efficiency and flexibility in memory management; that’s exactly what makes it well-suited for high performance, real-time applications. However, C++ does not come with great libraries for delightful and responsive user interface engineering, so we opted to write our UI layer in React and TypeScript instead. We also use a few different technologies on the server side, including using

[Rust in our multiplayer server

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA50lEQVQoz53RPctGUBzHcc8lBjFJYVUWEyMLg91otRjIIqW8BbPVw2KQjN7b7+4Y77qucg3f5ZzOp3P+h6IoCp8SBAGmacL3fQRBAMuynrVvZ6hPGxzHwXVdFEWBvu/Rti3yPIfjOOB5/j2oquoDbNuG4ziwLAvGcUSWZdA07T1Into0Da7rwn3fOM8T8zyjrmvYtv0e1HUdZVli3/cHmqYJ67qiqioYhvEeFEURURQ98yN1XYdhGJAkCSRJeg+SFEWB53mI4xhpmiIMw2cULMv+BpLIj8qy/OAkcjuGYX4H/0fT9Nf9P7Gn6JBIx6S6AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/4ebb54efbfa2fd4951e04ddb0b3f2b67146976ad-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### Rust in production at Figma

How Mozilla’s new language dramatically improved our server-side performance



](https://www.figma.com/blog/rust-in-production-at-figma/)

, which provides better developer ergonomics than C++.

![A deconstructed version of the Figma canvas on the left side is powered by React & Typescript (for UI) and C++ (for the canvas), and by Rust on the server side.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACR0lEQVQokY2T20sUYRjG/QN2Z911zUPUFtRFF0aX5UUh4k0S67oz7ayuWYsQERFqFqQGErTSTSQGsduu7GlmdsbDuipJSJSJnVC7iA4QXRX9Gb+YmXVVurCLh3nn5eH3zbzf81YJOQkhu59EhIy4vy8nUVUx5i/iMpWVcGUkXDnJejf7FaB5+HavLFfFI1keG1huOtNBHM86cCT8OFIBnCZADdkHlWtBs1Vt9su1JZOxDazOh6hP99A4KeN9eAHveDuNjzppSIbwqGFLNUoYtxbmQEGiSW+ndbqFZqMNXyGA2wQqZaAzI1KvRGgzhunLxgg/GSI8OcC11BhSYZTjeh9etQuvGqZOi3CmcIl7s+eZXjpJfKEZWZfxqT07X+jMBPHpVxhcTbCytcbrdYPVtQTvN18QfztHc3EAt2L/dqPaS7d+n1Jpgm/Lw3xcekBs5jGntBt7gYf1y9xeT7L5Y4vf3+f582WSXz9fYXxaoWXhDm5FRshLNKi9iPoE6eIHXpa+sjj/mZGZeZq0/t1AkTq1G//zMZ6+m2ZpQ2N5I8Hi5hzjb7KcLvZTq3VbM6zVIjQVBonoKe4ay9w0ZmktxDioRXdmaF2KEuKoEeVccQh/aYSO0gj+hVHOFm9xxIhSs+tSPFoXh/JRTmSucyx7lTq1B5cm7wVaeVJCuHMhPEkRTzyIZ0rCk5epVuVKbFxmbFQ7Xs5EB85kwBrFP7HZTrllTAZwxP3W0xyHvUkiQnpXsM061YkwFawsxU6w91072/hfq5eV+AtDRhCIa+msRAAAAABJRU5ErkJggg==)![A deconstructed version of the Figma canvas on the left side is powered by React & Typescript (for UI) and C++ (for the canvas), and by Rust on the server side.](https://cdn.sanity.io/images/599r6htc/regionalized/35d881e9c91c4f2d6756271f984143f2d2ba8636-3200x1864.png?w=1080&h=629&q=75&fit=max&auto=format)

Figma's tech stack is more similar to a game engine stack than a web stack.

## [Creativity requires systems-level collaboration](#creativity-requires-systems-level-collaboration)

In a video games studio, engineers don’t work in silos. Rather, they work directly with artists to perfect the glow on a character’s face, or with game designers to fine-tune the timing in a boss’s attacks. That kind of creative collaboration really allows the team to push the system to its limits, through the engineers’ understanding of the system, and the artists and designers’ desire to improve user experience. At Figma, not only do we collaborate often to ensure that different systems work well with each other, but we also work closely with product managers, designers, data scientists, and researchers.

[![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwgE/8QAJxAAAQQCAQMCBwAAAAAAAAAAAQACAwQFIREGEjEiYQcTFSNRoeH/xAAXAQADAQAAAAAAAAAAAAAAAAABAgMF/8QAIBEAAgIBAwUAAAAAAAAAAAAAAAECAxEEEhMUMkFS0f/aAAwDAQACEQMRAD8AkulhHBL35Syx0BHcSR5H5V++HHUONzwuzwuaTDMYmuOiWjwVi1u1Ynnhi+1G94IaweD/ABenD/UsYyV7K/yWA7MT9H34Ur9HVOed3weGpsUcYOoDk67PT3jXui5itZzNMncIHyyR+Q46RN0NniaF54erM46sv2at5ja0rogCQO3WlCRZnJGVpdesO9Q0XlEUq+1BZesf1jlI6zWcV38a5dHyT+0RFnTb3Mqkf//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/2fe7584f9ecdf793ed7ae5690f674168b5f670f1-3174x3174.jpg?w=3174&h=3174&q=75&fit=max&auto=format)](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild)

[**The Legend of Zelda: Breath of the Wild**](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild) is a 2017 action-adventure game by Nintendo for the Nintendo Switch and Wii U. Set at the end of the Zelda timeline, the player controls an amnesiac Link as he sets out to save Princess Zelda and prevent Calamity Ganon from finishing his destruction of Hyrule.

When you are building a series of interdependent systems, _any changes in one system will affect another_. Take the popular [_Breath of the Wild_](https://www.zelda.com/breath-of-the-wild/) game as an example: You can build a fire in the game, which provides light, warmth, and a hot meal. Still, the same fire can burn and hurt you, until you realize you can also use it to your advantage to defeat monsters! The game is so satisfying to play because the number of interdependent systems allow it to react to an infinite combination of scenarios.

The same is true of Figma, and that’s why I find my work here so fascinating. For example, we recently discovered a file that we thought had autosave failures. While it looked like an autosave system failure on the surface, engineers Katie Jiang and Jonas Sicking discovered that connectors in a FigJam file (those arrows that smartly connect things together) would oscillate because every user in the file was modifying it and sending slightly differing data back and forth indefinitely. This caused a huge number of multiplayer messages, which overloaded the multiplayer and autosave systems.

What could be causing the connectors to misbehave? After an audit of the code revealed nothing, another engineer, Isaac Goldberg, rigged up some debugging messages which eventually led us to a six-month-old PR change in an area of the code that has _nothing_ to do with connectors! Turns out, because connectors have to smartly connect different pieces of objects, their state can be influenced by the code driving those other objects. For example, if a user changes the position or size of a sticky note with a connector, we have to recompute where the connector connects to, to preserve the illusion that the sticky and the connector are stuck together. It was the perfect encapsulation of an interdependent complex system, where one part of the code causes a bug in an entirely different part of the codebase. In this case, a bug in the layout system for objects led to a failure in the autosave system.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACwklEQVQokY2T60uTYRiH/ViBe+eKCk2QikAysBmhhbW0MCrFcnu3rCRjmlFptjKp7Ix9qaxMPExt72mnd3O6OS2zTFQsIioI+hD0r1yxgxTVhz5ccD/cz3PxwP27MwyqDYNiY6XqINt7nFxfHet8dazWahGUVO+/UW1kGGQrWaod88h5Tr1+SNvcAM2zPZTH2lmj1pIp1ZC48xeJj2jiLxJC2ZoSrvQ62BVv48Y7if5PUR59DCG+6iTbdyL50KiJCKqIoNkQEmfFijFR++0pfHaEhHRJaPI6KBproeHtY64uDNM610fVy9uUxFzsmWhn3+Q1isddbAidZHPgEBZ/Gdv8FeQGbORHzlAy7mJTqBGjIqaFqp3S2GVufVAY/DpB1+cwZ+ee0bLQS9enML1forS/97A33owzUow2kcvN0XyKg9XUTN3j+qKHysmbrFIcZBgkKyZZZHuklZbZAToXg3TMK5yafkLDdDcdczJ351WaZnooH2viTmwL39+sIDCZg0U/SFm8nfqZh5RGL2FS7ClhlixS6G2lLtzPhRE/58NeGnUPp3WJ5hGFi7EhjkUfUBp0cme0gO/TywlO5LBDr2Bt8AS5oXrW+I8hyLa0ULJjVi/jDChc0eO0BWK4vJEkV0IROsZ9OKPdWAKN3I4U8G1qOf74Oor1CjL9djL9Ipnab1M2SiIb5WbK5G6qFIlK6TkHhtwcHHZTKQ9TrQ2yW3tAkdfJ3WgBP94sI/wih5JQBULAkcK7NGXJitEjkjfkYodbonwgSllvBMszHUuPnqz39kfZ7n7OFvkcl0bNzE+Z6IuvZ1twP4Z0dJJZXBIKko3s4SY2u+9jdneztf8JhX1dFPY9StZm91PyBzvJ8zjZ7SunQS+iOrCTPK0qHez0piSF6dUTZJEs6SgmqfafJHpGWcSk1LBaOcwq5Ugy4H+u3k80uSdQ+Hv5vgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/1a0ee9d34760199c50b10b030f5ccd80372ab1ad-3200x1864.png?w=1080&h=629&q=75&fit=max&auto=format)

Figma's interdependent system means that changes in one system affect the others.

## [How we put multiplayer into practice](#how-we-put-multiplayer-into-practice)

There is a classic scenario in gaming: Everyone is hyper-focused on the graphics, so developers spend most of their time improving the rendering system. But without _also_ investing in the animation system or texture art, the game might look jagged and wonky, and won’t achieve the quality that players are looking for. To build an immersive world that suspends disbelief, we can’t just dive deep into one system—we need to take a step back and look at the big picture, ensuring that every system complements the others.

This thinking drives our development in Figma and FigJam. For example, we recently launched [tables in FigJam](https://www.figma.com/blog/tables-in-figjam/)

. As the product team focused on polishing the single-player use case—things like copy and paste, undo and redo, dragging to resize, and so on—the engineering team collaborated with our platform team to ensure that tables would work well in our multiplayer system. We learned that it’s surprisingly hard to make tables truly collaborative. If a user types in a cell while another user actively deletes it, what should happen? What if one person adds a row and another changes the color of a column that intersects with the row? We ran through so many of these scenarios, making sure that the end result is something that feels natural and consistent with the rest of the app. We could have opted to reduce complexity by locking a table when one person is actively editing it, but that wouldn’t be aligned with the collaborative nature of FigJam.

Even once we solved the [hard problem of making tables multiplayer](https://www.figma.com/blog/tables-in-figjam/#roundtable-discussions), we realized that _observing_ multiplayer changes was a jarring experience. Imagine: You’re editing a cell and someone starts rearranging the rows so that your cell ends up two rows below where it was—technically correct, but confusing in practice. Designer Jakub Świadek came up with an interaction that would improve that experience, and engineer Tim Babb went to work on a framework that could bring it to life. To properly recreate Jakub's prototype in code, we needed to build a new system to animate elements on the canvas.

First, we started with “live feedback” so that users editing a table could see their actions in real time, even without a lot of explicit animation. As we built the system, we pushed every revision live to our internal testing environment, and the team really loved how snappy it is; it allows the user to see where they are moving a row and column, with just the right amount of FigJam delight. However, since it is tied to only _one_ specific user’s mouse movement (the person initiating the change), we realized that it was jarring for everyone else. So, we decided to layer on more animation, allowing users observing the change to more clearly follow table edits as they happen.

For extra credit, we even looked at how dragging a row feels, and added a rubber band effect to help users understand the limits of where they can drag rows and columns. This is similar to games where designers add invisible walls and barriers to guide users onto the right path, without using explicit signage.

Finally, we partnered with our [accessibility team](https://www.figma.com/blog/a-step-forward-in-our-accessibility-efforts/)

to ensure that users can navigate tables via keyboard shortcuts. While many FigJam users use a mouse or trackpad to navigate, it is more accessible and equitable to provide a keyboard navigation option for our features. This is actually a very common use case in games as well! Some games allow players to play with their keyboard and mouse, with a standard gamepad, or with specialized gamepads. Going back to those building blocks, a system dedicated to accommodating different control schemes can enable more people to enjoy the game! In the last game I shipped ([Wattam](https://store.steampowered.com/app/702680/Wattam/)), we supported the [XBox adaptive controller](https://www.xbox.com/en-US/accessories/controllers/xbox-adaptive-controller), and the community reached out thanking me for that decision. I’m glad that Figma

[continues to invest

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfklEQVQokR3MSU8TAQBA4TnpH9CDJ+OBRH+AB696UaPBg8ZE9GaQhGjEGD1oY1zADcQQMIhLXKKUVVm0VWhBpDNlpvvCdDqtrQNtgem0YMGoQZ/Rw7t9eYKqqiS0BJqmIfll7FOjDMtu0kaGpYJFcGyBtzcWeHO9gNj+EbXhGHp1FfkDWykf2kahbjeJpy0EPFN4RA+Coij4fD4kn8zjT4OccdynU36LsZSjOLeK57VFz8VFei4s4W4Oo926QfbUHvLHd1Ko30eyzUZ47D1+xYcoehG8MzNMSp95NDnAkeGr7Bps4I5sxzALGOHvfGhdYeha8X+Om4vM9nuZ739M7lkjRk8TSddDVF8vashBNDCBICsKfdMO6hwtVPWdZHt/LbcVO2kjR2i0wtCVFcY7LMY7Td7dXSTkmqOgezHD7VhKLSW5mpK8nyXlBFn5EoKqJXDFvNye6Wbvexs7+8/S6HlNMPCViY5v2E9XGGmycHYajL1IEvBEMeKvKPsO8lPazLq4gXVxI8vTVejuowhFy8KqLJM052mX3BzufsL5gVF67Wn6bGV6z1VwNFtM2jNIkxH8iozmf0VRPsIPaQu/pE2sendgTNfgm2hDWFtb48/v3yyvfGdIzNLwPEZdl46tNU/rFZOhR0XiUolMYoHZmIqiyISDHgrJHiraZSpJGyW9Cz06iiROIZimSblcJv0ly4grRNPLBPUPctTeW+RsS46HvV+JqPPk83l0Xcfv9xMIBjGyGtbCLGVTp1TMkcmkEUURIRKJEAqFcLtdDLwZpu2Zk/pmL8cao9Q0RrnQEWBkPEgsFicej/+3wWCAWCxGMqmjp1KkUin+fZxOJ38B+WU+jwbONQ8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/442adee373200edeb652c6ef76505d7c0ff0694b-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### A conversation with Figma's accessibility team

Figma's accessibility team shares what they’ve learned from the community and their vision for what’s ahead.



](https://www.figma.com/blog/a-conversation-with-our-accessibility-team/)

in making our control system more accessible, too.

It takes a lot of deep problem-solving and collaboration to make Figma and FigJam responsive and delightful. I’m humbled by the talented engineers I get to work with, and appreciate that I can “nerd out” on complex systems whenever I want. More than anything, I love seeing users create complex worlds—especially when they [build their own games](https://bootcamp.uxdesign.cc/10-of-the-best-and-funniest-figma-files-59fb98c23906).

_If you have a background in making video games, or if you are intrigued by virtual-world-building technologies, consider joining our team—[we’re hiring](https://www.figma.com/careers/)!_