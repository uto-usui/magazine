---
title: "Creating coherence: How Spotify’s design system goes beyond platforms"
source: "https://www.figma.com/blog/creating-coherence-how-spotifys-design-system-goes-beyond-platforms/"
publishedDate: "2023-08-31"
category: "design"
feedName: "Figma Blog"
---

August 31, 2023

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAECAwQFBv/EACMQAAEDAwQCAwAAAAAAAAAAAAIBAwUABBEGEiExE1EzQfD/xAAWAQEBAQAAAAAAAAAAAAAAAAAFAgP/xAAeEQACAwABBQAAAAAAAAAAAAABAgADITERIiNRcf/aAAwDAQACEQMRAD8A7KLhFixK9vW/OzsxkEztX990o2VnM3wErLlo0KCqESfL75rOYmZBIcmUunPFjbt46p8FJXhoNsb5ExjGxcLxTTU3gtaW7uMJ4+e5AZMUDJFqQI22lDZsxUmgREynuiqeojU5d9S74TrFFI0J416knJix0z//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/f9647816e8517c5da05d0fa3006f653a9b16a802-3264x1836.jpg?w=1632&h=918&q=75&fit=max&auto=format)

Design Manager Juli Sombat sheds light on how a need for more cohesion led Spotify’s design systems team to take a cross-platform approach to components.

###### Illustrations by Andreas Samuelsson.

In 2019, when our leadership at Spotify [unveiled their ambition](https://pr-newsroom-wp.appspot.com/2019-05-09/sten-garmark-spotifys-vp-of-product-unpacks-our-ubiquity-strategy/) to make audio content available and consistent to anyone on any device, our design team faced a significant challenge: Spotify would now be available across 45 unique platforms, and over 2,000 types of devices spread across 200 brands. This meant that someone could be jamming to their favorite tunes from their living room TV, continue the party in their car, and carry that into the work week with a “focus” playlist on their computer.

Our design approach wasn't just about ubiquitous coverage, it was about consistency. Wherever people tuned in, we wanted that experience to be as seamless and cohesive as possible. (And our customers noticed, too.) Ensuring that Spotify felt inherently “_Spotify_,” regardless of the medium, became our core focus. In my role as the design lead on our design systems team, [Encore](https://spotify.design/article/can-i-get-an-encore-spotifys-design-system-three-years-on), I’ve had a front-row seat as our teams tackle the daunting task of keeping the experience unified. Components have been core to our strategy—rethinking how we approach them, all the way from scoping to execution.

![Two green buttons reading small and large, with a hand-written script saying "different state treatments?"](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB0klEQVQ4jeWTv2/TQBTH8x91ZS4jM/8AUgcmhgywwICYWEDdoAydkJCQ+CGBIqFKCAmKCENFoRWhFaA6dmw3sR0nvrN9vg+6g6hxSDqUbHytr987v3vfe+e712DJaPyHghrQ2rx/27PQwPpoGrNi2BVOOImfBj2lYbc8m6SnHoNKa0SVE6sRA5USqZREjcl1WRMzsBVOBmbCTxnwPtnnbfyFb6LLuJL0yyFb6Q73gpese09Z956xefyK9rjDuBK1HdYEzeqPwzdc3rvLpd3b3PdecJSHfBY/aDoPOPfpCivv1ljZXmN1/yp3wid0i+PFgmYbrUGbGwebXOts8Ch4jVcM+CodbnoPubB3nfMfmqy2m1zs3GKj36JXRosFlVYMyiGHwuUg6+IXEXlVkirBbvadVvyR5/1ty61kh0PpkVdFXXD2pBZB6cr+Y6kLy0KXVH8Obbqo2rXJ85zRaGSZiQwhhGWWZUghkWac1ZnnOVVVnVybiaD5OBwOcV0Xx3Ho9XqEYUgQBNY31g98XM+l63btPN/3bY5S6m9BY6WUJElCFEXWpmlqE4xvrGEcxzZurBlLKedXON1KZoLhvDabxGbjp3bKWaDnHcq/sFbhMrF0wV9EkA9QyJzv+QAAAABJRU5ErkJggg==)![Two green buttons reading small and large, with a hand-written script saying "different state treatments?"](https://cdn.sanity.io/images/599r6htc/regionalized/f253affe00c632a0e35b389650b863de18c0846c-3216x3216.png?w=3216&h=3216&q=75&fit=max&auto=format)

**Before:** Button components for Encore's Consumer Mobile system

### [Spotting the discrepancies: the birth of Encore](#spotting-the-discrepancies-the-birth-of-encore)

When we [introduced our design system, Encore](https://spotify.design/article/reimagining-design-systems-at-spotify), in 2019, we broke it out into two key segments. **Encore Consumer Mobile** was incredibly flexible, designed for mobile-centric Spotify experiences. In essence, it acted as a vast catalog of ever-growing and evolving UI components. Meanwhile, **Encore Web** catered to a broader spectrum of web products. We adopted design tokens for foundational design decisions, such as color schemes and type styles. But, as our journey progressed, we recognized the need for more commonality between our subsystems.

![Three green buttons reading small, medium, large with hand-written callouts indicating inconsistent type and sizing](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB9UlEQVQ4ja2TTWsUQRCG90f5A3Lw4sFfIiJ4EFQUVhD0EA+KELxFEhFczMVVEURFMaDJgkmIWWVNNLvrTGZ25/u7ux/p1h2zHjTgFrxdRU3V2293TzWYsTWOUqSUqv3fUBP+q/Co0NaYBLMwpdRvhVIpKiUQShpksiAQCb6IjU9lQakEkUixK49hOTI4qHximSGV/KlQL0IJ+oXD23CbTvyZvcLmZbTBHesxNwcrLNhtnoUdunmfdvCe69YDmvtLNPtLzNsPeR59MJvWhLksWQ23ufb1PguDR7wKN03hya3LzK2d5cTWBZrDZZ6G6zSte8ztnOPY+imD493z3HBWGJTuL0KFOWovHdK2VnnhdOimfZ4Ea8z3W1zp3eXq7jIt5zUb6S4t/w0X+4uc+XSb0zu3uLS/SDt4hyei6UcpRYWfhkRZTCkrYpnjVgHf8xHfQouDeERa5XgiNlfyMdxjc9zjSzI096zvvSaUUlIUBUmSkKapicuipCorlJTGJ3FioPOmNk7I0sz0Tr2yXsqyxPM8LNvCtm0cx6l9mmVUVYXv+1iWheO6uK6L4zpGgFQSxR//oW6IoojxeGygyXWTjrUarUIr13lN7Ac+QRCQF/nUFOn3MISTYwshauhNtD/8fQKd1/7whEyN3iwmZGK1wv+d4YnCH9oMeY6z+iBbAAAAAElFTkSuQmCC)![Three green buttons reading small, medium, large with hand-written callouts indicating inconsistent type and sizing](https://cdn.sanity.io/images/599r6htc/regionalized/9035141f88a3057aab7ec3fc5776e7da780f93b5-3216x2412.png?w=3216&h=2412&q=75&fit=max&auto=format)

**Before:** Button components for Encore's Web system

![Concentric circles showing Encore's system layers, with "Foundation" at its core, followed by “Web” and “Mobile”, then “Content Web Platform”, “Advertising Web”, “Consumer Mobile”. Annotations indicate that “Mobile” is the new layer, and it has platform parity with “Web”.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAD8UlEQVQ4ja2U2U8bVxyF2cwSMEtZjW32xYANY3vsMTbYYJvFBrOaLUvNUghQWiBpSJpGQglLq5I0NEKNaIjaRomakPYlEk/lhVZqn5IKqf/PV83QBqi6Sn04Gl1p9N1zf+fcGxUVFcX/qujYGGLjY4lNjFMUJ38T4ohRxRAdE01U9H8EpuSpUevSyCh+g6zyHDLLskgrTCclX01SZhJxySoF/q/BuXV5aEU91qCN7ole2s4FqPRUoTFr0Zr1aE06MgoySEhNICYu5p+BGlGLsaWW+eUFdl/s8vnjB/RO9mEOWOi/GGZyaQrvgI98o5YzOcnKSP7WrUbUYgtJfHx/g5c/v2T/YJ+Z67MMzg7z6PkjDn48YO3eOmKHneyaHNTaVOKSVH8N1YhaqrzVvLU0yc7XD7m9fYeuiW4uLETY29/j8JdDtr7YwtXXiPxvjinvCCo7/TOgzllAoacEa5+Nztku/BOtmEICzed9XN/4gDvbnxBZHKPKW6MAZWUbc0nOTTkKK+oPwLLOSir7q6kds+BYaEB6x4UQERGGrUgjTuoHXBh81WjtegWWb9OhsWrJrMwiMT3xqFongTXn6xAuirhX/QR3egnc78b1fpOygWHISGlnBXp3Efl23WuHMjRX0JCqT1M6ewpoGjUjzjto3eqk79sRep4O07zehmVawjwuUhexUtVnpKS5DL2jUIEpLkUtmYZsEtITTwdkjAiYZ+00fdRK6KswXQ/D+G6245xz45w9km2inrqwhQqvAb10DM2t05CiUZ/upylipnbCgv2yi+a1NppvteJcdOOYaVBgjmkXtkkJ4ZyVijYDOqlAmaHsMM+cT1pR+unE5SML0yL119x4P2zHs9KCfdGJOC3hftdFy9VGvFcc2KcslHdUUOIuxxIUkbodlLsryazIQpWsOgYq7q404NsM0vllP8GdHjzrfhqXXIRWmji7HWRkJ0BgpRHxgkD7WJDVe2vc3dlkaHaYAnMh8er4Y6AwJeJabiLwoIfup4N0PRkgsBUiuOYjvNXO8LMww98M0vdZO60LbhbXFvn+px94dfiKlU9XqWkwHgF/D6Zu0kr9DQ9t210KMPQ4TMtmEP+yh67bfoae9HL2WT89d/14ZhyMXxtn98Vz9r7b49LNy5RLlahSTjg0jVuwzjtwr/lo2erAtxnAecODOGfH/Z5E70YTg5vN+K9KGPursYRE5Z6/uRjB2dNAjiEX1ZkTM5RDkedomZOwXXIiLtQjTNswjZkRJsy43rbimbdiidRS0lqKzlFAkbOE4oZS5dmT385T5ZZ7KEMVjf2mUTNGeR0RqB09kiFcQ4Gn+HWpZcm3RZ2feqqHvwI7AXhUpeBLmQAAAABJRU5ErkJggg==)![Concentric circles showing Encore's system layers, with "Foundation" at its core, followed by “Web” and “Mobile”, then “Content Web Platform”, “Advertising Web”, “Consumer Mobile”. Annotations indicate that “Mobile” is the new layer, and it has platform parity with “Web”.](https://cdn.sanity.io/images/599r6htc/regionalized/5f2f31736a339cb2c6a461201f0983b0c992d5aa-3216x3216.png?w=3216&h=3216&q=75&fit=max&auto=format)

Encore is made up of two subsystems (Mobile and Web), which share a foundation of design decisions in order to build coherence across our platforms and products.

As Spotify grew, so too did our product teams’ appetite for more refined components. By 2022, it was evident that the pendulum had swung too far towards flexibility, and a recalibration was necessary. We assembled a specialized team with a sole purpose: creating reusable components for Encore Mobile. If we think of our various subsystems as radiating from our core foundational system, each increasingly specialized and divergent from that center, this new subsystem exists between **Encore Consumer Mobile** and that foundational system. In doing so, it creates something of a first line of defense, reducing the demand on Encore Consumer Mobile to provide every component themselves, while creating greater platform parity across the rest of our system. In collaboration with Encore Web, we began developing cross-platform components at the outset, as opposed to an afterthought.

### [The mechanics of cross-platform design](#the-mechanics-of-cross-platform-design)

The art of crafting cross-platform components wasn’t entirely new ground. The traditional processes were still in place: design, based on research, followed by development. The major shift, however, was in the design phase. In this new way of working, we didn’t want to just design for one platform; we wanted to synchronize our designs _across_ platforms to maintain cohesion.

![An array of green buttons on black background, varying in terms of size and action.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAABd0lEQVQokWWQ6U7DMBCE8wpx7NaO68TNTY6mpREUBAWBEPcpQAJ+wvu/wqBsSxHix0je8Xr87TpaaxhjoJQC5xye55EYY2Aug+u6JKrX+vHId9mfXkcqH3pkoHwNLgSFccFJHvdIzGO//oDDEyv/R3yw9rkHZygVtDHw9YgI+0d+ohE0IfxU01laiWEgYaoAtosQtBamDqDzEfWErYWdR3TvCDGAVApSyhWFFIgWCcqbBvFBimgv2QQU5yWm73PUDy22rmokyxzxfkp17xfnFZx+/s3eXAahBJJlhuZ5huykQHKUw3ZjBFOL6m6C7muB9m0b9VOL/GwL6XGO9m2O7nMX1f0EzmbB68WKnnAvQXnbIDnMiCCcWZhJSATTjw71Y4vyuqGwfoq+JsKLNeFGLgMfCqJJTwsKtjsxTBtiVAWIDzIUVzXSnnyZ0V04H1NvcVlT+L9AMRQY78Q0UnnX0K/92ONFTOfmdUb0Kz9DtL+apnmZ0Qq+ATTj4O/ShzWyAAAAAElFTkSuQmCC)![An array of green buttons on black background, varying in terms of size and action.](https://cdn.sanity.io/images/599r6htc/regionalized/7eb087cfff66b5366c30a6fd5ea653dcf319bcad-6528x2796.png?rect=3,0,6522,2796&w=1080&h=463&q=75&fit=max&auto=format)

After: Button components for Encore's Web and Mobile system, giving both more options

At the same time, each platform has unique characteristics that we want to design for. So, how do you build a website that looks and feels the same as your mobile products or your TV experience, without losing those qualities? Generally, there are experts at designing for web and experts at mobile—and it’s very rare to find someone who’s an expert on both. Each person brings a knowledge set tailored to their respective domain.

> So, how do you build a website that looks and feels the same as your mobile products or your TV experience, without losing their unique characteristics?

We start by getting everyone in the same room, and then our journey begins with thorough research. Teams from each platform—iOS, Android, and Web—delve deep into the intricacies of each component. Each representative is conducts an audit and diagrams out what’s unique to their surface. Desktop has more real estate; TV’s different because of the viewing distance; Watch requires all the information to be condensed.

![Dotted lines showing the horizontal gap between selected and deselected text](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA50lEQVQ4ja2TyY6EMBBDExIIO2I7sUrw/7/olktiBiHohe6DD0mlXoxTKKUUfiz19IDnebDWQmv9PVBrDd/3EUWRQD8GGmMEwOZNYRgiSRI452R9rBtjzoF0w6Y8z1HXtagsS2RZhjRNURQFqqpC0zR/NV4UBMExjv+s6IYN8zxjWRZM0yQQQtu2lf11XaU2jqNAnXPSe+mQzYTQxQajk22fYF760qG6yJBrNu3X+zPmKsOzFz7T7bGx1son8ZH24ggdMsNbQObJrLquE/V9j2EYJNsXM3n9hxAax7E4pTg+nIRbDu/qAQrVEWHyB0ZKAAAAAElFTkSuQmCC)![Dotted lines showing the horizontal gap between selected and deselected text](https://cdn.sanity.io/images/599r6htc/regionalized/17e1ea0ce8b62008ecc21f3d183b0047802c922b-2112x1408.png?w=528&h=352&q=75&fit=max&auto=format)

During the alignment phase, the working group makes sure to define terms, available states, and how properties will be applied together.

![Outline for an icon with annotations emphasizing that end iOS users will not interact with the property.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAABgElEQVQ4ja2U646CQAyFp+AdjaDi/QoKqO//fN18XceYbNZFsj9O2iHlTC+n45xz+s9w2ul0NIoiw2AwsLOINCMUER2Px7rdbnW/3+tms9EkSTQMw+aEk8lEz+ezXi4XzbJMF4uFdrvdZoRBEOhsNtOyLLWqKiM9HA6WZavVsqCPypdHhnmeGykWwvV6ba2gp/S23+/Xa4OI6Gg0st5BhF2tVkYI8AGXMqxahFEU6Xw+tx+xaZqaXS6XRopPDO2pJZt2u/0sDUt5HsPhsH657kFIMKSAsgA+3z/Wo4hYFpSJXCiRPuKTcSPCJElMf0VRmHTu97vpMo7jun3TH7JBf16L1+tVT6eTZd5I2GmaGtHtdjNSMt3tdiYnevlR2cELIaV6QjJkv5GOlwzEHm8J4zjW4/H43BJ8DzKdTqdW/qu0/Fq636bst4Pp4jNpzmTIGQsxl9OKN1vjTLgEUzoDwufB8GBTALvNK/SHPr+FTWCv1zP7Cr5xIbbmgBq8eW/wBeIetXcZUya0AAAAAElFTkSuQmCC)![Outline for an icon with annotations emphasizing that end iOS users will not interact with the property.](https://cdn.sanity.io/images/599r6htc/regionalized/9212bafa844e43175308e6a75d6902eb6cf65fe2-2112x2112.png?w=528&h=528&q=75&fit=max&auto=format)

![Glossary defining the term "tab."](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAABBklEQVQ4ja1TSY6EMAwMW9j3HQQIOCH+/z6PyiOPUE9zaNSHUhwnqVQ5jlJK0ZehyHVdqqqK+r6ntm2pLEvyfZ8Mw3hGGEUR7ftO53nScRwcF0VBlmU9I3Qch5IkYRIgyzLyPI9M03xGaNs2qwRpmqY8xnHMOeBDcsX1GoaB1nWlbdt4XJaF5nmmaZqoaRoKgoCdaK0ZiAHz/0W/j1LXNZOO48iQGCPW8jxn9SgHIE601u8tQwHswarYfY1BIJC84zj3jwIV8jBQACAnqkSZxGEY3ltGH8KeoOu6P6Av5YKrStTefEcIhdiMg1B3VYoY5UBZ0JdX3DS+4gVseD0k8w9/zHf/8g9uVhnROk9UFwAAAABJRU5ErkJggg==)![Glossary defining the term "tab."](https://cdn.sanity.io/images/599r6htc/regionalized/5474d535964626fcfcf9199bcc5d13a8caee774b-2112x1408.png?w=528&h=352&q=75&fit=max&auto=format)

From here, we come together and share context about naming conventions, platform specifications, and accessibility requirements so that we can align on what we should build. By pooling our findings, we craft what we call the component’s **outline**, which captures these decisions and lays the foundation for a more detailed design phase. The outline might include a glossary of terms, the anatomy of the component, or any variants we need to support.

Take, for instance, our button component. When Encore was in its infancy, buttons varied widely across platforms. They had different size frameworks, interactions, padding, and used different increments in our type scale. But through rigorous collaboration, we developed a unified hierarchy: primary, secondary, and tertiary. We also defined a size framework and naming structure that we’ve used again and again—one that we were able to implement with variables. Today, Encore’s unified buttons boast a range of sizes, custom focus states (platform-dependent), and even usage guidelines.

![Various green buttons shown on a spectrum from “Total consistency” to “Total platform independence” with “Cohesion” in the middle.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB10lEQVQokX2TXWsTQRiF89+9UC8qosWLIggSUKlRijWFFpVSS4tWWq0f2BLbNOk22cTdbDc737OP7JSkVVJfOCxz5syZMzPv1vinyrKcoirlDbEekZocV/qp5rqqXWtWgikdbdnnbbLLVvadocnwVzSzUJtlNkmQ2JzVZIe59iILp6/ZHx+hvZ2pLyeGs8gqXVVdPaAev+HGcZ2F02X28hbam/8euzaLtKVjYDI2s2/MR0vMdZ/z+GyVd8keLRmROxHus3CKvk6JdYrw6jJhZVB4hfQ6kIWT7OQHPIya3Gw/4X60xIPoFfPdJV4M33OkekF7ILosxus04g1+yTN86S8M+yblY/6TH+IkCKuXbYmI5eE2dzsNbp085XbnGQtnTTayfWIzQnjNp/yQO50G97ov+VIchdTB8FQNWU8+s5sdkpsC5xzSKtpFj2a8zaPOCvVojc30K0M1wliLtJrDcZfl/hYrgw+hG6YJhVX0xkMG4wSpFdbYAKElcfGb4yyic94jkRna6DBXfbPinCjt08sGFFpeuUNjKcZjRCGw1uK9v4R1aKUwWuOd+2tOSskoHQUodfVRnAuErhb5i78htAZlGFebWGcpSx+4SdtUvBACIS+CVIZ/AFQFRdcsYqebAAAAAElFTkSuQmCC)![Various green buttons shown on a spectrum from “Total consistency” to “Total platform independence” with “Cohesion” in the middle.](https://cdn.sanity.io/images/599r6htc/regionalized/39d48701b8e1b1753159c4eb07c03ce7b7a033d5-17728x9792.png?rect=0,1,17728,9790&w=804&h=444&q=75&fit=max&auto=format)

After: Spacing variables have helped us build layout themes that when applied to our buttons, create a united family of buttons—right in the sweet spot between consistency and chaos.

[Our research](https://dbanks.design/blog/multi-platform/) showed that many design systems are platform-agnostic, using a single design across all. In other cases, a system optimizes for a primary platform (like [IBM’s Carbon](https://carbondesignsystem.com/) for web). Other platforms aren’t as critical, if they’re supported at all. There are great examples too, like Lyft, whose article on [building for parity](https://www.designsystems.com/a-system-built-on-parity-how-to-treat-all-of-your-users-equally/) was an inspiration to us.

### [Why cross-platform?](#why-cross-platform)

We see the pursuit of cohesion being the middle path between perfect consistency and total platform independence. We’ve also found a few key benefits to making design system decisions from a **cross-platform perspective**:

**Cohesion**

Adhering to this approach ensures a shared Spotify essence across platforms. While nuances do exist, the core experience remains undiluted.

**Efficiency**

Starting from a common foundation saves time. Instead of reinventing the wheel, platform teams can customize based on their unique requirements. Plus, we’ve made strides in building reusable frameworks. For instance, our cross-platform naming system is now a staple in our design approach.

**Scalability**

With such a system in place, it’s significantly easier to adapt to growing needs, be it a brand evolution or a new partner integration, as updates can happen at the cross-platform  level and then flow outward to our subsystems.

### [Emerging challenges](#emerging-challenges)

Of course, the journey isn’t without its hurdles. The complexity of managing multiple platforms while keeping multiple teams on the same page poses a few challenges:

**Increased project complexity**

It’s certainly simpler to focus on one platform at a time. With multiple platforms, we have to keep track of many requirements and limitations, which can get tricky. Encore’s role is to absorb this pain, rather than creating complexity for product teams or our customers. We make this simpler for ourselves by choosing a project lead per component, and that individual gets input from design and engineering partners with platform expertise as needed.

**More dependencies**

When coordinating design and build phases across several teams, the variations in release schedules, roadmaps, and timing can make things harder. We’ve improved this for ourselves by limiting our number of active projects, and being very proactive with our internal communication.

Yet, these teething troubles were but a small price to pay for the cohesion and clarity it brought to our users.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFBgf/xAAhEAACAgIBBAMAAAAAAAAAAAABAgMEABEFBgchMRIUQf/EABUBAQEAAAAAAAAAAAAAAAAAAAQC/8QAHhEAAgIBBQEAAAAAAAAAAAAAAQIAEQMEISJBUZH/2gAMAwEAAhEDEQA/AMBwPUPMct3fmZHlNaFnVoh6CDO7dKXYPvPJyMTiJRsA+dnEqfEUaVye1UrRRWJvMjqvlsakjDRMAdbHsYYvjK0V36PkcA6A0ZUnmpPKzRxt8SdjDJFBClVVLFtfpwwTaZbPI/TLxuWUMRVz/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/72a7f2dbac1aeb1d192fb490303fccb20097d452-1608x1072.jpg?w=1080&h=720&q=75&fit=max&auto=format)

### [A note on collaboration](#a-note-on-collaboration)

In the intricate orchestration of creating a design system as expansive and immersive as Spotify’s, cross-platform is just one facet of the larger gem. Cross-functionality is equally important. You might even say that our systems are as much about breadth (across platforms) as they are about depth (across functions).

At Spotify, this cross-functional synergy is not just a byproduct; it’s intentional. Every step in the creation of Encore was a testament to the power of collective endeavor. For any team aspiring to create a cohesive, integrated user experience, cross-functional collaboration isn’t just preferable—it’s essential.

> For any team aspiring to create a cohesive, integrated user experience, cross-functional collaboration isn’t just preferable—it’s essential.

In our pursuit of consistency, our mantra was clear: Unity in design, diversity in thought. This meant regular sync-ups, [brainstorming sessions](https://www.figma.com/blog/the-five-stages-of-an-effective-brainstorm/)

, and feedback loops. It also meant shedding individual silos and embracing a collective mindset. From sharing context about naming conventions to debating over the anatomy of a component, these discussions became a melting pot for great ideas and solutions.

In the end, the seamless Spotify experience—from TV screens to mobile devices—is not just the product of consistent design. It’s the result of countless hours of cross-functional teamwork, where each discipline respected the other and truly believed that the whole was greater than the sum of its parts.

### [Unity is invaluable](#unity-is-invaluable)

I will be speaking at [DSW Day 2023](https://www.dsw.community/schedule), happening September 20, 2023. It’s free to sign up, and everyone is welcome to attend. Hope to see you there!

Designing from a more cross-platform perspective has helped Encore make Spotify’s experiences feel both coherent and familiar, while preserving platform-specific interactions and details. Spotify designers can optimize for their unique platform, such as considering different screen sizes or input types, while still aligning with Encore.

For teams navigating design systems across platforms, I’ll emphasize this: Unity is invaluable. By defining what’s non-negotiable in your design, you not only elevate its consistency but also spark the creativity within your team to think beyond boundaries.

Our Encore work is far from over. With our foundations firmly in place, we’re continuing to roll out new cross-platform components and, in doing so, expand the system’s coverage. Next on our list? Building up our contribution process so everyone can start to benefit more from what we’ve learned, including showcasing some of our best examples of cross-functional components. Questions or curious about where we’re headed next? Reach out and follow along on [Twitter](https://twitter.com/spotifydesign) and [Instagram](https://www.instagram.com/spotify.design/).

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACR0lEQVQokX3RXUhTYRjA8YMG4lehUF1p0hdEYCWRF0EQxISgCC+6CbKLoF0VRV2VWIu6MCJKtC6SIhyRMaGWO+SMzQLB5uZy6Tab29z0bHY2t3POe87e7xMTErvpd//n4XkewTRNvom5GSeUFhdAwLba25a1NOabqpSa6kJ9s9zYLtdbclsESqmu64qiqKoKIWSMbaScIw1l3XlP15Jtb+rctuyh6tXd2zN7jkrN57Nbr2QrBQBALBabWZdIJHQA/s7nnBmSnuxPuU7MPd7x82btnLVh7lJr9MyF+EFbqr4/VSEoihIMBt1jY6IoTk1NZTIZjPH6Bowz/ZeyeDvsOTD5oc7zqXZcbPEMnf1+/WG4zbFY54lVCIZhxOMJvz/g802HQrMr0ooBDUoJo5hRdX4teTUwu0uM1IwsNzqWDn/8ap24+zZ4LBCui89XCowxTdN/y4VcTi4WVotaXoVaqaQTA1BUjK4t3/It7RuRd9oL++3pjuGJHvH+l8njaX9DIVAlcM4xoUBHhqEjqBpIAwjAcqxTrEpa9sVsusORaX+VPj0Ysr52PX9n87tOrXmbSt8aBNM0KWUIIQQhRhBhiDGiGDNCOIMGyvuXE4/c4WuD03eeufue2p0D9xbedAJHKxltKceMMUoIwWQDo7R8c045U1WQCkVnROfn0QG7t7fvR2+31HexNHSSOY+U4/Jl/7XxLZNDRnIlNZqLeVa8dun9E3moWx224vFO5rOU4/8iJgMcS0wPUtmFky9J5AGJ3KCxyyzZ9QdWrg+kUhUksQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/6dd0b818bf5d087b52c4f01736ec167558efc67b-1200x630.png?w=1200&h=630&q=75&fit=max&auto=format)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAE2UlEQVQ4jVXT2VNTZxjH8fwLveplp+O0ozPMtGOdaqVMrdtYgYoKIlUURUUEJiyVVWTfdxFDIAlRA2FTlFVEQDBFEwKEkI1zwpKF/hvfzjnUUS9+F+/NZ57lfRQB3wZ+3wa+bS9e0YV5YQ6DroPKwjwqC3MxaNuxmGbYEtYIbLgJeKW4CIpOdsQ1/pUiOAkKLvyCC4WESfEKLl5PDFNakM3FiFOEhx4k5uivJMeepbYwh6mRQTacKwREJ37BQVBYY0fYBXfktwu/+Bm4Yv1AXVkREWG/EP5TCEknDlNw7jiF0SfIiQ2nrSyfxblJfJ5V/Ot2Aut2goJdRoOCg4DowvcRlNqdnRon/eZVLoQdoCYhiskyJebau5jK0xjIukJHThKv+/WIdjM+jw2/x0ZgfVVGJdD/Obi14eFFv4HbF6PIOX+CqcoMNvV1BLvqCXRW4GjOZaxMyZi2CYd5Fp97Wc4uaicgV+j81LK47pSHfycmgrqrZ5iv/hvHozLWVRVsqMpxNBfwqiSFwYZCLG+G2XIs4nMtyaBfBtcIiruoDApuOz2dbWTFRVFzKQKjMp7Bu4mM5NxiIieJ55kJaO9ckNueHniMuLLAtmsJn3vlC1Da/G6FThvD2odUJcbSGB+F6kYMLTdiUCVGo7oSRX1cOPUJUWjyU5jp17O+bGLbZf0CDEgVep0ofD4vHruVqa5W+vKSGc2/w0h+Cv3ZSTzLSmQoPQFDchzdGdcYf1COZfI5wsoCW85PoF9aitcpR7G9LWKzmnj2qIbe/GRM1TnYGguxlGdhLk7DWqrkn3tJzBalMK9pYHl2FMG2wKZzke2PoLgL+jacKDY33VhMr2kpyiTz/En0ymvYGvJxVGexVJLK4v0U3uUl8iLzCobSu8y8NOJeNrEhgZ7/W/4cFAU77171U5J6idP795IZ+TszxSms1WWyXJaGuSCJifRLVEUfI/38Kbrbalkzz+J1LrL1cYby/HajcDssTBpbKb8VydkDe4g/HIIhNQZrdSr2GiWLJcl034ri2sF9XDi0j/ZiJUtvRxHXLGxJf1G6GGnD3t0o7JZphjuKaU45RfrpEG7/tpe2hJOYypOw1SuZvned0j9Difz+ay7//A3q3Mu8HzfgkeYobXrdRkC6Z69TjsI0/gRjbQrNt49QHref4nM/ok48xlzFLZaaMhjIjCU5dC8Re74i7ci36LLPMtfXgv39FKL9A9vuJQLCqlylDA6oSmnPi6P++iHqr+yn5fpBupKPMl16jcWmDHrTo0kN/Y74H76mOCoEQ/45xjqKmRvpYfXDDJsOC37PCkHRzo7Ucmd1Ho8KrtOWEYlaeQJdxnF6sv5gsuQqC3VKhrL/oiomjPvRYTxMO4Ox4iYDrUU817czNz6EyzqPz2UlKNjY8dpRdDZWoqsv4kltDt3VqfRW3uBZ9W0mmvN421bMq/pcjGWZ6KvyedpYgvFBBUZVE31aNaP93VjnJtlcMxNcX2FHXEWhVz3AoG6lW9VMz6M6+lXVDHY28FLfztjTTkafqBnqUtOv68CoUdPT0Y5R00GvVsPzp4+Zn3gpn2LAs8SOYENh0Kjo1qrp7lTJMWrV9HZp6NNr6Xus241eR2+XFqO2E6NWQ69OS69Ow4Bex5sXgzjNc/jdVnaEFf4DgdKa4nyAr+8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cd2b76176c94b5de7ac24c05a89dd625f812dbf-1024x1024.png?w=1024&h=1024&q=75&fit=max&auto=format)

Juli currently leads design for [Encore](https://spotify.design/article/can-i-get-an-encore-spotifys-design-system-three-years-on), Spotify's family of design systems. Her team elevates design quality through consistency and attention to detail, and supports Spotify's Research & Development teams at scale.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)