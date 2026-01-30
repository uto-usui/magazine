---
title: "Introducing: Figma’s Platform"
source: "https://www.figma.com/blog/introducing-figmas-platform/"
publishedDate: "2018-03-22"
category: "design"
feedName: "Figma Blog"
---

Today, we’re excited to launch the [Figma Platform](https://www.figma.com/developers), a way to improve design workflows by connecting Figma to other tools, scripts and even web apps. **We’re starting off with a new concept for the design space: A web API.**

It’s crazy that a web API is groundbreaking in 2018, but to our knowledge, no one has ever created one for a professional design tool before. The reason? Design traditionally takes place in a world of siloed, offline desktop software, whereas Figma lives online where everything is connected.

By harnessing the open nature of the web, our API lays the foundation for unique forms of design collaboration. Companies are already using it to craft custom tools that meet their unique needs. For example, Uber created a live feed of what their design team is working on to raise visibility across the organization. GitHub automated part of their icon creation process to improve its efficiency.

> Our API lays the foundation for unique forms of design collaboration

Those ideas are just the beginning — we’re open sourcing a number of demo projects ranging from a Figma spell checker to a generative art tool to a [method for putting your designs](https://www.youtube.com/watch?v=-fMUngXFXQY&feature=youtu.be) on the Ethereum blockchain. We’re also introducing new and improved integrations with other design tools like [Avocode](https://avocode.com/?lng=en), [Haiku](https://www.haiku.ai/), [Zeplin](https://zeplin.io/) and [Pagedraw](https://pagedraw.io/).

We’re most excited to see what our community will make. Read on to learn more about how our platform works and ways to [get started](https://www.figma.com/developers). (And check out Harry McCracken’s [excellent Fast Company article](https://www.fastcompany.com/90165051/as-design-and-engineering-blur-figma-wants-to-be-their-platform) about our API’s significance for the broader tech industry.)

## [How it works](#how-it-works)

The first release of the Figma Web API has three core capabilities:

1.  Read design files in an open JSON file format
2.  Read/Write comments to design files
3.  Render design files (and parts of design files) into standard image formats (png, svg, etc)

Our open file format allows third party tools to consume Figma designs in a reliable way. Unlike our desktop competitors, Figma’s Web API isn’t tied to operating systems, specific file paths or versions of design software. This means it’s possible to access the current state of a design from software running on entirely different computers, or even on the web like Figma itself — setting the stage for an entirely new class of design integrations.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAADtUlEQVQ4yw2SWVOTZwCFv5uOjkKhskgyQdCAlaiFwhRakAIWMNPWyh6WQAhIYiBkgxAStoCAQBZAC2ERQRBFVEC0Su1YrbQXnc50Ov0F/SXv01ydqzNzznmOtGvKEtst58VytRJXvkxoVNFcTo7gUkoCNcWljPVNsv/8Pc+eHeBxDuF2B1jZ/ocX7/7j9as/Wb2zzMiNNoZrighpv0R6oE0TP5YrRV+hnKb0T0SJMoq8MzLU2bnoNWYG+xfZ2T3kxf5bvL3DDPSMcn91n4d3t1gZHWXJaWaps4k1i4YXvVVIM98ni+68k+FkUZSmxIhC1TmKsy9ToW6kVTeM17vO3vND9p7+RF9nF46mZkK9XWy4zaw4jCx22/F1ubhp6WHDY0YaKJKL61lxokx1EnVGuigrqaPmmhl9rZ1eR5DbgU0erj5hfmqWztp6PBUl7HRp2OoNp+/w0mOfwtETwGD2E3D2IbkLFMJZkCrsJTk0qKuFpsqFTtODrdlOwOtnwR9iKTjPzJgfe6OOyfoSDoe0rLgHqG0JobOt0TH4AH3XOjedE0jD36SIhZp8caelkubKVnGt3ElDeTuWhlamB8fYCIUrP3nJw63HeKwWfI1qfh9qZMk9QrVhkxrHKxp6f6bO9hS3w480UpwmNpvVYslUj65aLyo1NnQNZszXbYQCKxzsvufdh7/YfrmHy25hvP4Kh4Na1vq8aI1rVBq20Bju02aa5VaXB8mYrRRztcVizlCHpaVDuDwBBr0zdNjHmfI/4uXOH/z24V+2dt9gabfhrirm1/46dodcDFqnGHBME/D4uBcmvhsYQCpLU4ipqwViXl9Pv7VfBG8/Inh7HYN1DEffMvdWf+H1wd/c33zDDWM3Nk0Z+0Mm3k572fYF2J6dY2dhgaeLCzxeDCGVpCqEtzhP3GlsYNw9IeYWn+EL3qXV5KHd4WPCv8nc/Da3Jpcxd7ixGzuZ7R9gYWycoHeUm2E4Lms3N1qNaGu1SGdlsaI+86LwVlUw5hkRE74QrvDgTToT+hYrJpMTQ5sVnfY61RW1lH13jR+ufEtpYRGXsnPIvHiBC2eVqM4oOH9ahhQVcUxkJMpF+VdfhP9XLioqqlGXXqEgL5f8nGxyMzPI+UzF558qSU2Sk5gQgyIumqT4aE7JYkmUxZEsO8H5pBi+TjuJdOzoEREbFSFOxZ9AkRAn5GFNjP84bIgkNSEClew46YpIVPJIEqKPEn38I+Ijj6CUx6JKS0N1MYNzqafJOivnalYi/wOZOjzLDs/ccwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/5173ea00298728296d86bcdb1f00637448fd2fbf-800x532.png?rect=1,0,799,532&w=804&h=535&q=75&fit=max&auto=format)

Uber employee looks at a real-time feed of designs fed to a TV by Figma’s API

Once you know the unique key of a Figma design — which is contained in the URL — you can extract a live snapshot of the tree of shapes, text, components, prototype links, transitions, constraints, etc that define how a Figma design looks and behaves. You can also ping an endpoint to generate a JPG, PNG or SVG of any file or file subtree.

We’ve designed the API to be as ergonomic as possible so it’s fast and easy to script improvements to internal company workflows or integrate Figma with other tools. Because it’s web-based, you don’t need to learn esoteric scripting languages to do this. You can rely on the programming frameworks you’re familiar with and interface directly with a well defined web API rather than bind yourself unnecessarily to another proprietary plugin framework. (This will make it easier to keep integrations up to date — and therefore less buggy!)

We know you’re wondering what’s coming up soon. Here’s a preview:

1.  **Webhooks.** Next we plan to release Webhooks that stream callbacks to events in Figma. You can attach a Webhook to a file or team. You’ll get back events mapping to file updates.
2.  **Write API.** While our Comment API allows clients to write to Figma, today’s release is mostly about enabling read cases and opening Figma up to the outside world. We plan to introduce a Write API later this year… it’s something we’re super excited about!
3.  **Extensions.** If we had $1 for every time customers requested in app extensions, we might not have needed to raise our last round of funding. That said, we have watched as our competitors added extension models which granted developers freedom at the expense of quality, robustness and predictability. We’re eager to leverage the incredible collective brainpower of the Figma community in making our tool better, but we’re not going to introduce extensions until we are confident our extension model is robust. There’s no ETA just yet, but we are actively exploring how to build this in a solid way.

## [Take workflow inspiration from: Uber & GitHub](#take-workflow-inspiration-from-uber-github)

As design plays a growing role at big companies, more and more departments touch it. It’s not just the UI person who interacts with mockups and visual conceptions of ideas — so do copy-editors, engineers, researchers, marketers, executives and countless others.

This snowballs into big problems. Traditional desktop design tools weren’t built for collaboration, so it’s painful for people to work together on designs. Files must be exported and uploaded before they can be shared, and thus they’re immediately out of date when the original design changes. Leaders can’t easily see and comment on real-time work; engineers spend hours hunting down the right assets; teams wrestle with problems that — unbeknownst to them — many others solved in previous contexts.

For true collaboration at scale, enterprises need a better way to share, search and see real-time designs across the entire organization. That’s why we’re so excited about the promise of custom workflows fueled by Figma’s API.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAACaklEQVQozxXPbU8SAQAA4PtFaeVy03SrYSIIiIKSoN4Bx8txwB0eLwYeHOcJyt0hZwjigcAkKl82GIjTZWst3GzWZln+gD7l1gez+bV6/sEDhMIE6gJlg73Sx91UyN1+V7v4fPymVT1sVj6etE7bzaPm1laeq5aEg3qlvlvaLq0104n3Gyvt2hYgV8o142rViGJMrSRwpCAKOy/F/DqXfr4krLLxGDVH2AknxMbJZIKJ+vCYzZh3wDU+3typAH2PBqaM9tBCKsII85GlCL0cphjC54dRwuBa1GOczhrR20g8kvFS+YCT5kCTCM8U6XAhnQLUOggLMOW9D7utT2JxnxfKMTY7F+FBnNOR+9P8Bch/NXLnJv7bdOzSHDikXdEsZhUwOO6AAL3J5XkWqzZOW28vy8UGv5zhkhmGExGyOMOewYVrW+mPdfPGlLuZ4H9rQuduPJlwW+KQmtRIAKlSi+LBaq29f/QlL5QXgwyfzHJrVYyugOyZpXhtK99aNm+h3K2Wu9HMf3cHcjSOhkH1/LgE6OrusSCear3dOjoXExtRT5DnMqncnpt+YYidGHNX4PovvXA1wf5UhX+oPG3YncIROzKphmT9QEdnF2h2Fl8f79ZOVqkUacdi0fgimzXPJoZRUeVvqHwNqXN72LmtI+qWwCvMx5qMsHxwoOfBPeBOx92nBmhpJc+nCkGXN2C1kXOhWS+lNXh6h5C+IYts1DygnJKNQma7l1rg/6VQFFcolBKJBOjs7NDptF4fMetxO+DpkM9BhRnYvvpkJH2/n37YN6VRKbRjMrlcMqKUInbY7w9OTs4M/yf/C5vYKq9lCPduAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/a6f605f34e3c730ca4face4187e5c1182caad34f-800x400.png?w=804&h=402&q=75&fit=max&auto=format)

An Uber designer works in Figma

## [Uber](#uber)

The [on-demand ridesharing service](https://www.uber.com/) boasts a design team spread across 4 different cities, working on a diverse array of products from Uber Eats to Uber Freight. Its new VP of Design wanted an easy way to browse these projects, so they’re creating internal tools for visibility with our web-based technology.

“Figma’s API has helped bring ideas we have dreamt about for ages to life,” said [Erik Klimczak](https://twitter.com/eklimcz?lang=en), Senior Design Manager for Uber’s [Advanced Technology Group](https://www.uber.com/info/atg/).

Uber is planning to broadcast in-progress designs on TVs around the office, surface them through a Dribbble-like website repository and load designs on a Chrome browser extension for employees. Designers will have the autonomy of deciding when to share — the API won’t pick up their work until they drag it into a particular frame in Figma.

> Figma’s API has helped bring ideas we have dreamt about for ages to life.” — Erik Klimczak, Sr. Design Manager, Uber

Other companies have made similar products to facilitate the sharing of design work, but this is the first time we’ve seen anyone create a real-time feed based on an online source of truth instead of a messy export flow. We found the magnitude of Uber’s effort inspiring, and we hope to see more teams explore similar concepts.

## [Github](#github)

![Screenshots: 1. Octicons in Figma; 2. Octicons repository on Github](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAACCElEQVQoz22Qz2/SYBjHe5smmrgDyZSAWnASXBxBamIyE/HAifO4rRqwxh5HIWZ/gLQuIzsYvEw9mAUq29UBB4mJ0Dnkh3gzM6PIWNrC+pbC3HRLfCg7ePBzeN7kfd/P833eFzt77vwlx03cfQd3OHEbforNdtUxhU+58UmHxWK5AIyPWy9fwe3XcJsdjicmLo6NncHsk9epyELs5Wt2Kc4CHDeqseUXbGKFiy8zDHMP8N5nok/ZxTi3uPQsxpIPHlqtVmxm5m5ybX1bbDbE5k5jiCiKTWC33dyTmq3dfD5P0/QTmv6Q/9gQWzti6/v2j5VXb9xuN+b1ejc23iNV7fV6KoJV1TSt3+8PBgPdqPV6PRKJhBmmUqkipMNFWe4kk7yHIIZyJpPpGYDZMeh2uwgaIQSbtVotGo2G5+e3hE1pT5LbUvtne/XtqueWZyjncjmIOjDQdR1MWZb3DaBFtVo15PDW5mdF6XaUfVlSUime8BjJ2WwWEkY+zAnOKFw2KJVK8GfhMFOtfT04PPp1eKQijX+3RhC3T8dGxoQAJCPj5VAVRYEu5XJ5JNfq337/OTk+PkGalkzxHkgmCCKRSBQKBUEQisWi8A+jzXQ6TZLk3BzJp9dLXyrlSuVTocBxz53OG5jZbPb7/aFQ6NH/oCgqEAi4XK7padfsbICiHgPBYNDn85lMpr8pS3K3mzlBzQAAAABJRU5ErkJggg==)![Screenshots: 1. Octicons in Figma; 2. Octicons repository on Github](https://cdn.sanity.io/images/599r6htc/regionalized/e5e07bbe641e8de58921fb1344cbeb7e06f6f199-800x400.png?w=804&h=402&q=75&fit=max&auto=format)

The GitHub Octicon set in Figma (left) and GitHub (right)

With the new Figma API, GitHub can push changes to their icon system — Octicons — from a single design file. When someone needs to alter an icon, they can simply edit the Figma file, which serves as the source of truth. A designer or engineer can then submit a pull request with a reference to the updated Figma design. This triggers a new build via Travis CI which uses Figma’s API to automatically extract icons from the Figma file and publishes the updated icon set in each format.

Driving the changes from a single design file reduces the barrier for contributing said changes. It also allows GitHub to run everything via common continuous integration services rather than setting up Mac servers. In the future, when Figma releases our Write API, GitHub plans to make data flow bidirectionally so the repository and design file are always in sync. This way anyone will be able to make changes to the Octicons icon set in the way they feel most comfortable, whether that’s design or code!

## [A new world of integrations](#a-new-world-of-integrations)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAIAAAB2/0i6AAAACXBIWXMAAAsSAAALEgHS3X78AAABHElEQVQY01VRi07DMAxM/HYetGs32IaGgAmhIf7/+/ACk8ZJqRTn7mxfEzMXd1UFgJSviEprrbemIrPS92yXWbsgIhD+IWgp4O6lFBFF9WwFiEUkKmGHgI3gvfJb5SZkptEmYGbRgIhS8OKuXuXxRMczlh7iqMRbTplyrpQ3QvtW9/NDizaqIbbhkoaTWml2eOXTJ9RJWHqbetkQSkwXE04qX9vlY7tUNzDBaqTBkkQDzELeoPRMQsjrdHjZXboveSxniLviixu74tNMzysUzZGR3BAG18xShgzd1/3mXG3+DSYO5CADmuhx1dMuxDFS0rFDbB5r3GLMCKzs8U13uP4IlTJ1aR6MYRl+iGHhQ3zHzKPlP7EwX7O80X4AX/sNQ7IVvtUAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/c3d0fe4b0d1d01ff8f17b9da222e43ab9dc86d35-800x333.png?rect=1,0,799,333&w=804&h=335&q=75&fit=max&auto=format)

In addition to helping companies like Uber and Github customize their own workflows, our API will make it easier for third parties to build — and maintain — public Figma integrations. [Zeplin](https://zeplin.io/) just issued an overhaul of their integration with our new API, and three other products have introduced Figma functionality for the first time:

1.  [Haiku](https://www.haiku.ai/) — a tool for creating interactive, cross-platform UI components (available today)
2.  [Pagedraw](https://pagedraw.io/) — a production ready React UI code generator (available today)
3.  [Avocode](https://avocode.com/?lng=en) — developer handoff tool (coming soon)

Integrations like these are more important than ever before for design. We live in a world with myriad workflows, where every team has different processes for getting things done. At Figma, it seems obvious to us that no single company is going to solve every problem, so tools need to work well together. By partnering with services like Haiku, Pagedraw, Avocode and Zeplin, we can unlock new use cases for our community and unblocks teams with other needs.

> Figma has long been one of our favorite design tools.” — Zack Brown, CEO of Haiku

“Figma has long been one of our favorite design tools,” [Zack Brown](https://twitter.com/zackaboo?lang=en), the CEO of Haiku, said. “With this integration, we’re coupling the strength of Figma’s design collaboration platform with Haiku’s app production power.”

## [Example Projects](#example-projects)

To help you get started, the Figma team (and friends of the family) spent a few days building fun projects on top of the Web API. Everything below is open sourced on GitHub. If you already have ideas on what you want to build, we hope these examples will be helpful as reference material. If you’re not sure what to make yet, we encourage you to fork these projects and take them in new directions that we might never dream of!

### [(1) Figma Custom Mockup Generator](#_1-figma-custom-mockup-generator)

See what a design will look like in different real-world contexts — like an iPhone, bus stop, or billboard. Try it out by [accessing the public repository](https://github.com/figma/figma-api-demo/tree/master/projector) on GitHub, downloading the code and running it as an HTML page.

### [(2) Figma Spell-Check](#_2-figma-spell-check)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAAB/ElEQVQoz12Sv27TUBTG7aSO48SOXZe4+L9ru775Q1QksiDlCdqhfQCgldo0r4CUIUIsleKQBUUKyYzKUxRQUQtIHSgsZcOGmDgSAbmKmixcuw0DP53hu9b9zvnkexAEQVAUiaEQ5D9isRhFUoqiAADy+XwholgsWgBwHIdhGLQhVCLOpTBiAUoEjXpFhSaTOLxaq9VarWedTqfb7fZ6vX6/37Rbm5tbLMsi0CJn8Hs8JWSSeGIhCQuHheEJbJGhN9bXXx0efr24cF13MBh4njccDj+dn9frdU3TwsBZEr8jMga/KGQzYpaWOEbi6OUlShb5Rw8fHL99M/KH4/H4MmIymTiOYzebpVIpjJcicPk2a2l8TheAxl8LXVm2TG2/uvvx/cnv8a8gCK7mwBTtdrtcLodmgiBEUQCWmbNMc0XTVdk0NH1FBcCqVasfTk8vg2A6nc7muK5j2/ba3bVocioly+EvtSzLMKBdU7UQ+GV/b+/k3TE0X9uuZrM/09mXb86Tg4NVYN1M5nleVUOLaZq6rkuSJIqiYRg729uvj45+ep7v+6PR6PvQP/vhvzz7vPu4Lihq+J7xeBwOT6fTFEUxDEPTNEmS8Ah1pVJpNBq9OZ3ui8bz3s7T1v2NLZpdutkHdA5cjH8aNoWNYJDCHLgoq7mCYgL2VrgkfwFunrkKxv8O9QAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/ea2344eb1ac6d4bf5a533424032a049a62701ce8-800x400.png?w=804&h=402&q=75&fit=max&auto=format)

Figma’s spell-check demo uses our Comment API to note incorrectly spelled words in a design

With the Figma [spell-check demo](https://github.com/figma/figma-api-demo/tree/master/spellchecker), you can run a command line tool that will scan text in a design. When words are mis-spelled, it will automatically leave a comment suggesting alternatives. We’re excited to see the different things people build with our comments API, and this is just one idea.

### [(3) Figma Kaleidoscope](#_3-figma-kaleidoscope)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABsElEQVQoz2NYt/Tp2iVP1i97CmSsX/p0w7Knm1Y+27ft5cnD7/Zsu1Ne2qGrY8jHx8fCwsKACYAa1sE1L3u6dc3zw3teXzn/4c6NL6eOPurrmRseFmNubiEqKsbMzIyhGahtydMNy58BTdm44tnBXa+vXvh45+bnm1e/HD/0aMbUlRXltZmZOVbWNry8vIxggKb5CdC1QM3b1j4/e/wd0M4bVz5dOP3h+KEny5ds6+2Z1NnZG5+QJCMjg0PzcpDmnRtenD/1/vqlT5fPf7x09uOFMy+2bTk4a+b8adNmlZSWa2pqAl2OonndUoTN29e/OHXkHdDOi2c+XL3w6fzp5+vX7gZqnjdvUU1NnY6ODjDYUG1eCvbzsmdAU7asfnZo9+uzx95dOvvh6sVPxw8/mjt7zYQJ02bPmZ+XX6ioqMjExITpbGiAAR0PdPmRvW/OnngHtPzw/gczpi5vauqorq5zc3MXEBBA9/O6ZQibwZH8fOfGl8DYOn303ZF9D6ZNXpKSnOHg4CgpKYklqtcDtUFsXvYMSALRxhXPgfYf3vNm7/Y7TXUTzEwtBQUFsSYSAKm1H5hYUwu7AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/cdffcfb9ae93aefa7a9674ac4bbaad315de3cbc0-800x400.png?w=804&h=402&q=75&fit=max&auto=format)

A photomosaic moon made with our Kaleidoscope demo

Have you ever seen a picture that’s composed of hundreds or thousands of smaller images (I believe the official term is photomosaic)? Now you can do that in Figma. Choose a photograph (the “big picture”), then open Figma and draw the icons that will serve as the smaller mosaic pieces. You can access our [public GitHub repository](https://github.com/figma/figma-api-demo/tree/master/kaleidescope) and use our API to then render those shapes into a unique piece of pixelated art.

Lastly, Airbnb backend engineer Elena Nadolinski created [this short video tutorial](https://www.youtube.com/watch?time_continue=1&v=-fMUngXFXQY) on how to use Figma’s API. Learn how to create your own Ethereum tokens that represent emoji art using a Figma file and Figma’s Web API.

## [Getting Started](#getting-started)

Whew! That was a lot. We hope this epic screed of a blog gave you all the information you need to get started with our new API. For more details, check out our [documentation here](https://www.figma.com/developers/docs?utm_source=figma_blog&utm_medium=link_in_post&utm_campaign=platform_launch).

In case you can’t tell, we’re really excited to see what our community builds with this technology. If you create something with our platform, we want to hear about it. Give us a shout in the “Show and Tell” channel of our [Spectrum user forum](https://spectrum.chat/figma/show-and-tell/).