---
title: "Behind the build: a Q&A with developer Tekeste Kidanu"
source: "https://www.figma.com/blog/behind-the-build-a-qanda-with-developer-tekeste-kidanu/"
publishedDate: "2021-11-04"
category: "design"
feedName: "Figma Blog"
---

_We recently [introduced plugins and widgets to FigJam](https://www.figma.com/blog/introducing-new-figjam-prices-and-a-more-open-platform/)_

_to help teams better collaborate and connect. After building widgets internally for a few weeks, we opened up the API to a close community of external builders. We are always impressed with the [Figma Community](https://www.figma.com/community/figjam) and wanted to share what they’ve come up with, so we reached out to three developers to learn more about who they are, what they built, and what they’re working on next. Read our second Q&A in the series with [Tekeste Kidanu](https://www.figma.com/@tkmadeit), and [check out his widget](https://www.figma.com/community/plugin/754026612866636376/SPELLL---Spell-Checking-for-Figma-%26-FigJam) on the Figma Community._

**Tell us about yourself!**

Hi, I am Tekeste but usually go by [tkmadeit](https://twitter.com/tkmadeit) on the interwebs. I am an introverted frontend developer who is passionate about the web and web technology. I moved to the U.S. in 2016 to study computer science and have been living here since then! If I am not binge watching Netflix shows, you can find me contributing to the Figma Community by building helpful plugins that make designers productive. Since I started building plugins for Figma, I have become increasingly interested in cultivating my design skills. Even though I can tell a well designed UI from one that isn’t so great, I have never been able to actually create my own designs. To change that, I am currently learning the fundamentals of UI design such as color theory and typography.

**What did you build and who is it for?**

I have built a handful of plugins for both Figma and FigJam. Of the plugins I have built so far, my favorite is [SPELLL](https://www.figma.com/community/plugin/754026612866636376/SPELLL---Spell-Checking-for-Figma-%26-FigJam), a grammar and spell checker plugin for Figma and FigJam. Like Grammarly, it scans your Figma or FigJam document and allows you to easily fix grammar or spelling errors.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAABz0lEQVQoka2Sy25SYRSFz41CgVNKNWmIwiHEkgCnkbuXCO/jLSa8AG9gnDQRJFaqDU0plkSbpnNnzo0zTbRJDYWmokA5yGf+o6Y6Y+Dgy57srL322luSJIn/jDRTo9vtJhKJkEqlSKfTZDIZstksuVzOrtFoFK/XK3plFEVFVTVURUWRVWRZsflbUIiVSiXqG3UajQbbzSYvd3dpt9vstFqUy2Xi8TiSqmj4Fy8QCoVtlpcD+Hx+5uZciGF/BJPJJM826nz4/Imj4w6n/a+MRiPG4zOGg+/s7b2mUCggadocwcsG2WyefP4aq6tXCYcj6LoPRTl3Kdbc3Nri6KTL6XDAaDzGmvxgaE05GVq82j+gWCwKQQdLSxcJBg0MQ7g0CAQusejz45l3M+904tBUO7PtnSbfBgMm0ymWZdEfnPG+O+HNoUWtdcCtQhFJuHC5XHg8HjtUXdfR9QW7+nQvCx43ToeDZCrF8xebdI679Pt9er0eh186vP3YY/9dh0f1Ftdv3Px1ZSGqquIw/6L9RpFl2/2du/epPqnxdH2darXK40qFtUqNh2sVbt97wJWVldnfRmwh4kgkTEzTJBaL2ZhmAjORwDBC9mvNLDgrPwF3G05GANumbQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/aa27665d58391e54aca3296c2e3e4dc44acc5762-1600x800.png?w=804&h=402&q=75&fit=max&auto=format)

**How did you come up with the idea?**

Most of my plugin ideas come from the [Figma Forum](https://forum.figma.com/t/please-add-a-spell-checker/2755) and other design related communities like [Designer News](https://www.designernews.co/stories/96173-there-is-a-higher-rate-of-dyslexia-in-designers--but-design-tools-dont-have-good-spell-check-). I also follow and interact with a lot of talented designers who use Figma on Twitter. If you are trying to get ideas for your next plugin, I suggest doing a quick search on either [Twitter](https://twitter.com/miggi/status/1334544211295744000?s=21) or the forums.

**How did you start actually building it?**

After doing some research on how it should function, I started teaching myself the ins and outs of the Figma plugin API by reading through the [docs](https://www.figma.com/plugin-docs/intro/) and by asking questions in the [Figma Plugins](https://figmaplugins.slack.com/?redir=%2Farchives%2FCHPTY6TFD) Slack workspace.

**What surprised you in the process?**

I was surprised by how easy and intuitive it was to get started. I had never built a design plugin before, and my JavaScript and web development skills were enough to give me a jumping off point.

**What do you hope people get out of it?**

I am hoping to save designers precious time that they would have spent manually spell checking their Figma files (and also save them from being embarrassed by a typo when they present their work 🙂).

**Where do you often draw inspiration from?**

Mostly on Twitter and especially the [Figma Twitter handle](https://twitter.com/figma). Lots of designers mention that account, asking for help or making requests for new features. Usually the feature can be implemented through the plugin API until Figma builds it natively. Besides that, I also hang out in the [Friends of Figma](https://friendsoffigma.slack.com/archives/CTB7GN10X) Slack workspace which a good place to meet designers who work with Figma.

**What inspired you to build for FigJam?**

I was already familiar with building for Figma, so when I heard FigJam would also support plugins, it was a no-brainer for me to get started working on migrating my existing plugins to FigJam. I also appreciate that both Figma and FigJam plugins have almost the same API and development process.

**What else are you currently working on?**

I am working on a [FigJam widget called Notes](https://www.figma.com/community/widget/1028465458230585901), which lets you take detailed notes inside your FigJam board in plain text or markdown format without cluttering your file. I have also built a [color picker for FigJam](https://www.figma.com/community/plugin/1030933889092035687/Color-Picker-for-Figjam) that provides custom colored stickies and shapes.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAACK0lEQVQokW2S7U9SYRyG+VsVV8uttfXBVXNtDUxzJS+5pjlUEMnWJk1dbr5kmYk6sdIEEQIJEBSFc55zpMM5h6sdMFuuD9fu59O1+9nvtimKwl9UVLWVXw9q9I7rdPSY2J0N7D3XMf/FadLuNLGpqiVpYUn/CHcTKgOBMrcexbE/iNJ+f7vJzYff6Hp2RN+4wDNl4H1tNnkaNOkeuiZsoSAUlf2kYDi0y91uHzduO7F3OujodHCny8UL3ztWt3Ls/6gRS2vEMxpb+zoT8wa2SqVCtVpFCHHVUAiVg7TCzGKS4NQMwWCQyckQoVCIcDhMZHOTbK7AuSSQhIpyUePnSZ3ZTwa2fD6PRblcplqVEEJGFgqHRyorG0U+ru2wvv6ZSCRCJLJBNBolkUyRPy4hyQJNq1PXdQplg9k1A1sulyOTyWBlsVikcn6OLCscpAXT8zFe+l7h9XgYGHDhcrkYGRlhcWmZ9FEW9aKGYTYwGw2Oz8yWMJvNkkwmSaVSWO9y+RTpUvhm7juDQwHcbhdutwev9zmjY2O8X/lANn+MUtOQf5mc1UwyJb315UKh0BRZDUulEtVq5bLhBW+XT5maiRGe32N2Ic7cUoKF1TRr2yd8iavspXQ2EwarMZ2VnTr+OR2bJEnNo1gpy63DCEVh77DG8LSG06fRO67R5683eeLX6Q8Y9E9YmPQGTHr8Bo5Rg3uD/52NtcfWsB+P6c2xtjn+T3uTxhVtjga/Ad9kp7t7/Gf3AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/b4b70b11f892a5b71c3ce776598a215c6f697f56-1600x800.png?w=804&h=402&q=75&fit=max&auto=format)

**What do you want to build next?**

I recently shared the first version of a [voting widget for FigJam](https://www.figma.com/community/widget/1037535899287211554). I want to keep building on what I already have and make it the best voting widget out there. With this widget you can run either an anonymous or non-anonymous voting sessions.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAAAsTAAALEwEAmpwYAAADWElEQVQ4jXWU2W/cVBSH5x/jgQce+JMQEk8gnkBqBQhUhVCEoAVaqEpAIURdQpO0abbJzDiz2eN9ufb19TYzmRn1Q/akLA88/PS75/j407nHOm6pPCfJFFGWEmWyOdc5lf2/suZ5QSALel7JiVU1XsetWEomrsPAMhg5JhPPwXZcLNvBsu3G7ebs4HoecSKvwQW2KNg3Krb7Uw6MqolbYSToD4ecXbS50Hpo/T49TaPb7dHtaXRqvz6PRmPq+nWXBSItMKKSvl9iROu4JVOF7weYpo1tObiuh113Zlk4117Ldl28MKC+UZpl12MpSLOi8UZ5QSvPS7K4IjamxOMpKqxQiUB6faTdJnW7SGHipDZaMqArNUapjqcSHFGi+1OMcIafTBt4K5MVsXaFtb3C3FoRnS5Q5oS4+xDxcgN5fgdhHnIaHXHfe8B37l1+j3bpCpuTyYxH2pKn/RU9Z0GsKlppUOHuLbjcXKLdWmJtL0h6A+Lj2wSPP0Ac3CQc7bAfPuaWs8kN6xO+9+9xHOo8Gy54cPqKX9qvOJksEWlFS4mK4MWC0Z0Vg2+WuE8WyOGYuP0D4f5N4pcbRMZTjqIDvvXusuFs8jDcoi1MjvQrtjsr/uiuaFuLNTDLSlJ7TniyxHu+QAzrOQYo+ww53kPqByR+H0OOOU5OORTPOY/bmDJsZqc5V/TsGZOgJFH1DPOCQsWUkU7m9VHCJctS8iylUAlKCmQa4ysfXRkM5JBxYhDICJEowljhhZJASFKV0SryhHnyJ0v7Yxbmh8yjX6lyn7KsKKuK6XSGKjN68pKdcJet4Df2xDPG8QTT8RnqFiPDxvWjNbBUBgv7BqvO26zab7KavMdcdaga2JT5fI6aZhwmL/jSuc2n9uf8GPxEJ7qkr1ucXgw4740wLA+Z1sBUZ2F9xPLiLZbnb7DU32GuLhpYA5ytgc+TI75yvuYz+wvuBz/TjS4Z6BZnneF/gUUeMxe7LM33udLfZebfo8rdpsNaZVmSForLdMCj6AnbwQ770SFGYmJ7AeOJ08j1w/WV6z9HmYdMlUYRn6PiCVmmKMqykVIKmaaILMbPAuzUxUlcRJo0HdWrK+Kk0d/A+kvnRdksfZ18vfy1lMqa3Oua2v9dkxf1Hv/z3l9K+5EA27wFdAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/7603541fb5b3de7023f0dcc75e9e0a84ad73608e-1600x1270.png?w=804&h=638&q=75&fit=max&auto=format)

**What do you hope someone else builds?**

A widget for FigJam that displays what everyone in the file is currently listening to. I think it would be a cool way to share everyone’s taste in music. If you want more plugin or widget ideas, I’d love to hear from you on [Twitter](https://twitter.com/tkmadeit).

**What else are you currently excited about?**

I am super pumped about the public release of FigJam plugins and widgets! I can’t wait to see what people are going to build with it. Besides that, I’m excited that playful, bouncy, and fun user interfaces are becoming popular theses days. To give you a couple of examples, I love what Apple is doing with [Maps](https://www.apple.com/newsroom/2021/09/apple-maps-introduces-new-ways-to-explore-major-cities-in-3d/) by showing you 3D imagery of popular landmarks. [Honk](https://honk.me/) is another good example of an iOS app that has amazingly playful UI. For 3D goodness on the web, check out the landing page for [Superlist](https://superlist.com/). I get really excited to play with and use these types of apps and websites.

[Browse more widgets and plugins](https://www.figma.com/community/widgets/widgets) in the Figma Community, and check out all of the recent updates to the [FigJam platform here](https://www.figma.com/blog/introducing-new-figjam-prices-and-a-more-open-platform/)

.