---
title: "Using constraints & “magic numbers” to build responsive layouts in Figma"
source: "https://www.figma.com/blog/creating-responsive-layout-templates-in-figma/"
publishedDate: "2018-11-08"
category: "design"
feedName: "Figma Blog"
---

This post is part of a series: [Building a design system with Figma at littleBits](https://blog.prototypr.io/building-a-design-system-with-figma-at-littlebits-17edff8f4236). Read the previous post — [how we created atomic components with Figma — here](https://www.figma.com/blog/creating-atomic-components-in-figma/)

.

This year we faced a big challenge at Little Bits — launching 4 new apps on multiple platforms with both mobile and tablet layouts. We knew we needed a strong design system to do it right, particularly given our small team and short time span (6 months).

Templates with responsive layouts played a key role in scaling our work. Here’s how we figured out the approach that worked for us in both Figma and React.

## [Magic Number](#magic-number)

One thing that’s great to have at the heart of a design system is a ‘magic number’ — it helps harmonize layout if sizes of text, graphic elements, margins, and padding, share a common numeric factor.

Before we had any kind of system, we had mocks of several key screens that had been created to establish the visual direction of the app.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAIAAADKYVtkAAAACXBIWXMAAAsSAAALEgHS3X78AAABPElEQVQY0wExAc7+AMmrwK6Bn6llgLRZd8Vmh86FmNiWkOephvDJkezZtc62v697obddf8hTac5RZNJveNKOidGYhdWefNysfQDTxdSnfZ2ZSnOnSXC7X4TSf5fgk5fnpY3qu4/jyq3Itr6ld5+qRXfBO2XJQGbOVnXTcYLWiYfbm4XfpYAA5+DotpCrlkd0nEBvq2SJwISbzZSd0ZyS1KOL0bGjuKCrkl2EnTRpuS1kvTFnukZ2yWuL1YeW1JCRzYyAAPfy9dS4yathiKNMeaRykJt7haB5eqZ3dbKAeMCdmKSHmH5HbJQ3YrQyaLAtZqNDbrBrg8GCkMGAibV2eQD9/P3n0968dpmzXoiwhJiOamiMW1CQWFSdZ2a3kpKegJN4RGaTPmK0PW+vNWaZPlieVF+wbG2zb26pamo9JK4Rk2HCWQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/d214007f17c27a68a1eb161eae7293471cf66bd2-1000x273.png?rect=0,1,1000,272&w=804&h=219&q=75&fit=max&auto=format)

Initial ‘eyeballed’ design mock compared with eventual design using layout based off 8's

We looked at the sizes and padding that had been ‘eyeballed’ in these designs, and found that things were mostly working off 8’s — buttons were 48px high, margins were mostly 24px, some headings were 32px, etc.

Everything was close enough to nudge towards numbers that multiplied from 8 (and 8 in itself is a number that multiplies and divides well!). So 8 became our magic number for all things moving forward.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAA5ElEQVQI12N47ThzxWub6fNemU2Z8NpuxtY3zrMfvLadfumVyaT5r62nrXnjNufJG6dZ315bTr32ynjS0tdW0w6+cZn9CSj2Byj2/pXRpF2v9CcsB+KLQHyS4bX9DHOgIpNXppPNX9vOCH3tNCsXaEEaULM/UEMc0MImoEW9QAurXhlNTHptMbX+tf3MxUB9q16bT1nwynBiJ9CgZa8MJjwE0vcYQOAqgzTDK71+JqAh7K9MJnMBbeUESrIDMS9QgxhQsQSQLQxUI/jKYKICUF4PqNYQKKcNFDN8pdvfDKRvAenzABwWgKDJnGhbAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/5bceef2ca4f69ce928db5bd48f9cb80c00cb50b1-800x109.png?rect=2,0,797,109&w=804&h=110&q=75&fit=max&auto=format)

Buttons built on a scale of 8

From smallest to largest our buttons and form elements were made 32, 48, 56, 64, & 96px high; key headings & copy 48, 32, 24, & 16px; padding & gutters 16, 24, & 32px; larger layout cards would be 240px high.

You get the picture…all the key sizes are multiples of 8!

## [Different Screen Sizes](#different-screen-sizes)

Figma is great for building with responsive constraints — you can stretch your layouts and see how they will respond to changes in screen size. (If you’re new to constraints in Figma, [check out this beginner primer here](https://help.figma.com/hc/en-us/properties-panel/using-constraints).)

You can even have elements pin to edges of a column:

But it’s hard to create a single layout that will look good on most phones, still fit on a smaller phone like an iPhone SE, and feel full on a tablet.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAACgklEQVQozx2SS28SYRSG+VE1MW2BFsqdmeEylNswXDowMwww5SZFKLWFQiW9JbWGqNVE46axrYlr6x9wLYlrF8bYat3YmPR7/WB1ds95znteg9coEfdChrAumQiBCikmN0ktuwM93f2pCp0z3l64YEy5a9asgDXLxG/NI+opIxtpQV/poqYM0NCGaBSGqOcfw+AyponRFiezTJzwAY306k/ung7eol3Yv5Kj7bOgTZsCuQUFAWuexCgsw69BEdZRTG1SaA+rUm8Kn0wDY83B6BYwy0SxzKnoV47I8dYbVJPbVzHn6jvfonJBza59iyqCDo1E2BISfBVyvI1SuouC+Aj5xMYUPDUU/NWxx5Ude5zpcdytjTW+9UXl21+jTv0z51BfsRb5nNr9onbwOCWywCXh4iTomS3srb9ARz+cgqu5PurqDgyirzri7fnRslMbJbnKSPRWRxFncZQQtP2VkrbNs8p7n0X9HbDlYXOmyT0uiiVGxIPcNl7unmK49gx6qou80IEUasLgMImXFlvi0uPJXspC+yPd+KmpDT/0W43+8VCqZfjsud+i3gSWqKFdIg53GkF3DvnQQ7TkXZTFHjL+BqIuHQEai8Fsjt7OMJHbRVa8reR6f092T/8ddE6+DUqt/ecNMZ5mpNc0xz+Tk4N2jYTdRQhMGSmuhiRXR8ypI0hBrCkH+jz6FE6GiUvA5U5Cp9oHzROsK3s/smx1Qw9r85lA9WjZUaSGGkL2Iom6VxHzlhFxlRC0quAmIGN2UilMmmAoKZuEZxQStEpEdOh3oq2CsLnwnZuTm+XcYKZdPjhcCTVvgrYCaIVImIJ4mqd3PgPX/RS8c9LUjl6BSUf/A0ejcK+mKx4VAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/f62a6c56bb398d5fc9f46e83984b8939d8b652ce-1000x437.png?w=804&h=351&q=75&fit=max&auto=format)

Controls layouts on different screens with nothing but layout constraints.

Around half our users are loading the app on a tablet, so we didn’t want the experience there to feel like an afterthought. We didn’t want our designs to be compromised to fit with smaller screens either.

In this case our designs were sympathetic to being proportionally scaled up and down, so we looked at the relationship between different screen sizes to get scaling ratios:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAACIUlEQVQoz2NgIBHExcVZdHV1bdm6dduvU6dO/wfif6dPn/6/ffuOfx0dHb8YCgsLhebNnSe8bt164WnTpgvl5uZxe3h4cGdlZclPmTJFb/369forV64y6Orq1g4PD5dMSkqynjNn7qZLly7/fPPm7f/Xr9/8A9FXr179PXv2nI8MjY2NpXv27K26ePFS7caNm0qrqqq8PD09jYB0DtAZC2/cvLniwsWLKxctWjw7PT09AuhCt6VLl627e/fejx8/fv7//uPHvx8/f/1/8ODhryVLl75k6OzovHTq5Kn7D+4/fL53z94b9fUNnUAD/YEWzTx08NDzly9efn1w/8H3NWvWPMzJyWmMiIgIAPpoA9CFP968fgty3d+3QHz16rVfc2bP+cDQ0dy2+cjuA4evn718esfGrbvqa+qKgQba11bV1OzYsHX/zfNXz106ce7csvmLt2dnZKWFhITY9nf1duzatP3w2cMnT58+ePz02UMnT+/ZvON4b1vXAYaOknrn1b3zIjZPXpqwvGe2b0NhpTrQQJGqrCLdJW3TfDb1LYxc3zs/fGZ9r2t2QppSoH+AcEtBlcGS5qm+K9tmxsyvn5iypGlq/JKmKYGt2ZVuDBsnLuWe0zZVaXrTBK357dMltk5eyQKKzdW6eYzJ/NasTpxqPG6cGlz5Ao4sZ3TqGVK1vRh2MMQybq+fz7Wka47itOYJujMbJyqvq5/Nd8ygngkA29Mlja4Rd/UAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/e2dcd9d6966e5a78059851f77e156956fb2b20e4-800x276.png?w=804&h=277&q=75&fit=max&auto=format)

Then we rounded out the ratio values so we could keep whole numbers as we scaled:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAIAAAB2/0i6AAAACXBIWXMAAAsSAAALEgHS3X78AAABQklEQVQY002PfU/CMBDG9/2/EInwBxGWEEEBwQ3d0E0mXa+TrWv3PhKfUWNMnlzvcs/v7mrVda2UYmcWBgHnpLTiafzK9ptwuXDuF+5sE65Q8pRVVQUnccqyDBRKS2stpYxZHJ0iIiHzLKSPx8C2vcn0ZTR1RnNvsgrskN6VymUmecwvl0tRFBg0wHhQCxIYmSsJ3yqY2/549nYHzf3xMpiFdAScy1wkSZqmhrKwvWkanFGW5XBMXcXZ2WXP22i5+XyAkLhsG2dfQ7OudVEYZDgbT9d1bduigdi0jZDc465z3u6j9S5aI/G4I2QMJwxVWZoE8T9c/cI5GXh3WkM32BU5RwuG8gYDGWDUfd//bW67NlHkk4GfoAEmVyiOFpjydrNBLNTX6xURMGLXt99aHMUB38bZED7si0OiCS0wZodBfgAclbhL/ncLQQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/f344eb56a3358737a9cb63ef9d44d413563ba46f-761x309.png?w=804&h=326&q=75&fit=max&auto=format)

We baked these rules into how the React codebase calculated sizes (along with typical layout constraints).

Because our templates were designed with this system in mind, when we tested the final build on tablets and smaller phones, things looked great right out of the box without needing extra adjustments.

In our Figma designs we were able to have just one template design for each screen, and use a mixture of the scale tool and frame resizing to get a preview of how things would look on different devices.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAACmElEQVQozy2SyU8TcRTH++944mKMlJYutKUzne6F6UybGTpdptOZdminZd9KyyaEyGYaTRQ0Rg8CGj0K3I0nD5J49mCMoHiRmPD7OhAPL3nJSz7vm/c+FsaeI7RTIiFKJulYjZTFJqnnl6FnWj+U9Mx+wqcdBnsL52FHESGHTKJ9JXCBKvLJSejZFurFJYyq9zCmrWKktAILZc8QuzdFrMEUScRU0m5sXz1Yeo4pbf1M5qb24171BhhyFBBxyYSlyhBjDcj8FDSxCV1qofK/hnNtWIJ9BdjpNKxBDoNhBYu1LbIz/wyGuHDG+4dfRVzFw4BNOu+3CfD4BEIxWcQDRUjxETQKy9eLoQ+1oAlNNJRlWNJR4zRA5U8D/sxpilZP1cTkZyUx9YXz6x8j/cqTkFs+oHqGftqdSXQlkqSL5eHypSCz49jd2Me7FydYn3mMmrSAurwEixhtdAb61Q5LaR0xbHSEoGH2lU5M1NdDRnUhFCm9pnszv6w+Drc4lnTxHLwmsMxN483ee3w4+oRHyy+hcXOQYqOwMI7ccb8ncxwOKseKMHM0oa6d1IpLb6V2czH8cLzOJNUD2pG96HXzuBNgiZfhwbpF5KgaFod3sDO7B4NvY9CpIepUYPE5hi6tfu7SExq6rMrtP5tzu39nqxtfC0ZzPbo2mooOlJ9G3MXftEMC5c6QuC+PtK9klg6BMpD2DiPSXQBzNwfzebBEAyW4aAE0I6EizKCtb0NPz3/ng9VZsTBhq+RbW9mBsYsBXxlxj0qSVMXURgfrL5uJZDDWLJieHMLOommBmVARpskgo5EkrZJMuH4l0AYSLvVbyFYYN726vbmyd3+svHrBM9UbIEvpMG9upsmC7s6AseVNUPF6BlMx/AOZg3GNC+wAwgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/3dede2ccbe427f9c2f00805238c8a260f6caad10-1000x437.png?w=804&h=351&q=75&fit=max&auto=format)

Controls layouts with constraints and scaling rules applied.

There were other responsive design challenges to solve. The app had hundreds of videos and animations, we didn’t want to have to double handle multiple versions of the content files for different screen dimensions.

We created all our video / animation content to work in 4:3 but with safe areas that could be cropped for 16:9 screens.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9ElEQVQoz32Sy27TQBiFhzXhPeiON2KBFFY8DksqEBepYsWim6IGKSoU2qaNmqvdxCa24/gy8dztbpjDOKgCqRIjHY01nvn+858ZorWBMfVO7TerBMp8i62ToBxGGnvb3Lb/pVPP6ciJ1XUDXglbZuVOUkjr1i25g91JCgXORLsZkkloZWxzH1i1a1KqX9kmt0mytoxxWzeNJbWDtNX+hToIaLlFHCfI86Kt3O5pgV+U0p+dG66VAmMVsjxHuk5R5RSGStxzWNc13CG4qhiPJwjDn1ZrvQNq504I9b7cFBfpKrpJk9iLoshbegsvufQ9drr0SJtbC/hzyEFrAyEksizDahX9dWhqpXX9kTP5bLWInnrDyfPA97ue73Uvv190Z5++dvMPZ13icnC5SQjOIdgWjFNQWmKz2exUFC5w155pGuUyeq20eTIezB6e9wePJtfTztVw2Dk+POqcvTrsxC97HcIdbEsZkiBGOJ8jiQOk6dq1GsL3fUynU5uuEqiSK1OpfSP0Y/K/wbhEkVEspwH80QxRGGDj2g2CENejEYaDKxufzcH6vhKnwb5YZHvHAJm/6z9YeDdkNB6Rk16fDA96JH3zjRAlNYR7IrTYOnCBsqTgXOzmKI6xDmNLT3yUb38oejDYr86DvdbIkrwg7oLuGfwNX5ZR1stJRMgAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/ea34909c92a48405aca8d515e82397b2af4ba187-800x352.png?rect=1,0,799,352&w=804&h=354&q=75&fit=max&auto=format)

4:3 Content Cropped on 16:9

## [Text Sizes & Internationalization](#text-sizes-internationalization)

With a ‘magic number’, sometimes there will need to be exceptions — with text in particular at smaller sizes a few pixels makes a lot of difference. But where 8’s didn’t fit, we tried to fall back to 4’s — so some text sizes were 12 & 20px.

As well as needing variations for smaller copy, we were translating the app for 6 languages. Ideal text sizes were set in the templates for headings etc, but if a (German!) word didn’t fit within the available space, we created code to scale it down to the next heading size that would fit.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAABgUlEQVQY0w3P3W7SAACGYa5AAwTTVppttjCqrClgMQQyKH8bzEWK7CczC6xLoIpLmGMHii5MncGYeOTdtBfV3sD3yfmTN3kjW2KOmlRiUbK4KzVZlxpsC1XuCyV05TJrcinMinlfEQ1Pk4rBS6nGitSEtXZ7ySYP5Aa7yTLrYoGGsMOIGtO4u9HieXZE97nD6eYZZ8kBblQbn7I9XiqNsPpE93fimlcRy8HbZ0d0UkO4m+84k08wV9dW78PNtNF+mkdk+5HGrtLndemWC3OOhTrhd8XBL9PFfXlMN9UJrZjmF6IZry21Aicz5o0+w9cXH/mguViZ7/GzPsUsP0ArmVsHo7n1ps3z9IST9ARXGxe8Mz7gb2+J5eFnDrY7oRFN+0ZC92pCJ+jLQzrKGPPcFf/sLfDv5AGr43tcFE9RkHVE0gmT+ViLVvwNDxI2j0SbU/MSP4ZLXJ/espqxwq3Hiq/Gs54RrwWV6CH3EzZGhsNvxwv+dlf4MrrD61c9pAQN/wEEIa9sX4PbbgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/8c7490ba1fd3350d092c1dfb86017c0f0ac3c0da-1474x402.png?w=804&h=219&q=75&fit=max&auto=format)

So we ended up with a larger number of heading sizes than we used in the primary designs, but we kept a smooth transition of sizes when dropping from H1 to H6.

## [Summary](#summary)

Most of our layouts are reasonably simple — centered elements, or 2–3 columns of content. We were lucky not to need responsive patterns besides the scaling system and basic layout constraints.

The ‘magic number’ helps the design feel tight, it saves time when deciding how to position, size and space things, and of course it is much easier to code up a design that follows well defined consistent rules.

Next step was to figure out the [correct workflow for our themes](https://blog.prototypr.io/creating-themed-versions-of-a-master-design-in-figma-3d6679ffdeb7).

This post is part of a series [Building a Design System with Figma at littleBits](https://blog.prototypr.io/building-a-design-system-with-figma-at-littlebits-17edff8f4236). Read the next post [Creating Themed Versions of a Master Design in Figma](https://blog.prototypr.io/creating-themed-versions-of-a-master-design-in-figma-3d6679ffdeb7).