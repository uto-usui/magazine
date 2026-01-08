---
title: "Building a Dependency-free Site in 2019"
source: "https://css-irl.info/building-a-dependency-free-site/"
publishedDate: "2019-03-22"
category: "css"
feedName: "CSS IRL"
---

![My personal website screenshot](https://css-irl.info/building-a-dependency-free-site.jpg)

A screenshot of my new, improved personal website

After several years of basically ignoring it, I decided recently that it was time for a refresh of [my personal site](http://michellebarker.co.uk/). The previous iteration used a combination of Gulp and Bower, coupled with Susy, a Sass library for the grid system (version 2, rather than the latest version 3 release). The last time I did any work on it was around 2015 and, suffice to say, my tools were pretty out-of-date. This just wasn’t going to cut it in 2019.

I didn’t want to spend a whole lot of time configuring a new set of tools for what I intended to be a very simple single-page site. I didn’t plan on using Javascript, although I wouldn’t rule this out down the road (as progressive enhancement). I wanted to get my site built and published as quickly as possible, so that I’d have something to point people to if they want to know what I do. But I also wanted to be able to maintain it relatively easy – add extra speaking engagements, articles and bio updates when the need arises. It was important to me that re-visiting the site a little way down the road wouldn’t require a whole new re-configuration of a complex set of tools – I didn’t want to spend an hour updating dependencies before I could do any actual work. I want my tools to get out of the way so I can concentrate on the things I love: HTML and CSS.

At the core, a HTML file and a CSS file are all you need to build a website. (And of course, a CSS file is optional! But there aren’t many websites you’d want to build without one.) But the last time I built a site without _any_ kind of tooling was probably five or six years ago. I’ve become pretty dependent on Sass, and figured that writing CSS without it would be quite frustrating. However, CSS has moved on significantly in the intervening years. We now have CSS variables (or custom properties), which allow us to store and reuse property values throughout our CSS file. We also have the CSS Grid Layout specification, which makes it incredibly simple to build layouts – there’s no longer any need to import a dependency like Bootstrap for its grid system, and you can cut out quite a lot of CSS (notwithstanding some fallbacks you might have to write for older browsers).

Not only that, but code editors have come along in leaps and bounds too. With VS Code, it’s very easy to search for keywords within your file or project, find-and-replace values and lint your code. A whole plethora of extensions allow things like autocompletion, autoformatting, and even picking colours right from the editor.

So maybe writing vanilla CSS wouldn’t be so burdensome after all. I decided to try building my site in HTML, CSS and nothing else.

Naturally there are some advantages of automated tools that I’ve had to forgo. I can’t minify my files, lazyload images or inject critical CSS, all of which would give a performance advantage. But on balance I’m ok with that, as the site is pretty lightweight anyway. I’m not using any full-width images, and the images I am using are compressed sensibly, so their file sizes are small. In fact, it scores 100% for performance using Google’s [Lighthouse](https://developers.google.com/web/tools/lighthouse/) tool for analysis – better than anything I’ve ever built before!

## A systematic approach

My first port of call was semantic HTML. I wanted the site to be as accessible as possible. This informed the design too, which is quite simple and minimalist, without extraneous clutter. One thing I was interested in experimenting with however, is the grid system. A lot of sites default to a 12-column layout, which of course has its advantages. But I always like the idea of using asymmetric grids, which feel fresh and different. I used the same asymmetric grid for each section of my site, and nested two- or three-column grids for the blocks of links for articles, speaking engagements and sites I’ve worked on.

### CSS

One thing I really missed from Sass is being able to separate your files into partials. Writing all the CSS in a single file isn’t the easiest experience, even with all the advantages of modern editors. In both my HTML and CSS files I was careful to group related styles using spacing and comments, to make it easier to find the relevant blocks. I used [BEM](http://getbem.com/introduction/) for naming my CSS classes, which helped with this.

I found that thinking systematically lends itself well to the single-CSS-file approach. I didn’t employ a CSS reset (e.g. Normalize), which I would usually reach for almost without thinking about it. I leaned on default styling, (e.g. only changing font sizes when the defaults didn’t look right) and configured some global and base-level rules, which I then only overrode when I needed to using something akin to Harry Roberts [ITCSS](https://www.hongkiat.com/blog/inverted-triangle-css-web-development/) methodology. I only added classes when necessary, and named these carefully to ensure they would be reusable to an extent. I utilised the cascade and inheritance when possible, and let CSS do the hard work for me. This is in contrast to an atomic CSS approach (which I’d been using in my previous job for the best part of a year, with [Tailwind](https://css-irl.info/a-year-of-utility-classes/)), which favours composition over inheritance.

For a very large site, it might be that the systematic approach I took is less practical and has some performance drawbacks, but it was ideal here.

## Drawbacks

In addition to partials, I really missed nesting from Sass. I don’t advocate going overboard with nesting, but when it comes to media queries, [feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) and pseudo-selectors, there’s no doubt in my mind that nesting makes writing CSS a lot more manageable. I also missed being able to use variables in media queries, which you can’t do with CSS variables. In short, there are a lot of reasons to keep using Sass in my work, and I don’t plan on stepping away from it just yet.

This simplified approach for building a website clearly doesn’t lend itself to dynamic content. Several people have suggested using a static site generator. I’m fully aware of the benefits of SSGs (this blog uses one), but it was a deliberate decision not to use one in this case. The point was to build fast, with as minimal tooling as possible, and I don’t feel like it will be too hard a task to keep such a small site up-to-date right now. The whole site took around four hours to design _and_ build – I imagine that configuring an SSG would have taken a good proportion of that time.

That said, I wouldn’t rule out an SSG for the future, and I might consider adding dynamic content later on. It would be nice to pull in blog articles and speaking engagements without having to update manually.

## Utilising the code editor

I use VS Code, and one Twitter user recommended an extension that allows you to [compile Sass to CSS in your editor](https://github.com/wojciechsura/easysass), without a build pipeline. This was a revelation, as I hadn’t really considered it as something my code editor could do before. It reminds me of Codekit, a GUI tool I used a few years ago for compiling Sass, and is certainly something I’ll try out at some point, although I don’t plan on adding Sass to my personal site at this point in time. It’s pretty impressive just how powerful VS Code is becoming. There are some other areas it could help with my development process too:

### Snippets

In VS Code you can define reusable code snippets that act as shortcuts for what would otherwise be larger blocks of code. If I was dealing with multiple pages I think I’d find it a bit of a headache having to ensure the HTML for my header and footer was the same everywhere. I could create a snippet, and have them populate any new HTML pages with just a few keystrokes.

Although I didn’t use any snippets in the first iteration of my site, I think they’ll also be really useful for media queries. I could set a few snippets for common breakpoints and save myself a lot of time typing things out. I’m really keen to introduce these to my workflow.

### In-editor minification

There’s are also a few extension available that can [minify your CSS, HTML and JS](https://github.com/HookyQR/VSCodeMinify) with a simple shortcut. It can be beneficial for performance to minify these, and I can imagine this will be very useful if my CSS file grows.

## Conclusion

I feel like many people will be quick to dismiss this as being completely anti-tooling, which is not the case at all. There are a lot of situations where the complex tools we’ve developed as an industry are good and necessary. I’m fully aware the approach I’ve taken here is unlikely to scale well beyond a a very simple site.

There are clear benefits to a build process, and good reasons why we as developers have come to rely so much on NPM, Webpack, Gulp, Babel and more. But while I wouldn’t recommend building _all_ sites in the way I’ve done with my site, I think we’re often guilty of assuming that because our tools are great solutions for some things, they’re automatically the solution for _everything_. To paraphrase a famous quote, “When your only tool is a hammer, everything looks like a nail”. Some sites simply don’t need the kind of complex tools we’re accustomed to, and if anything are more performant and easier to build without them.

I have a couple of freelance clients that need their (small) sites re-built, and I’m already thinking that this approach is probably going to be good enough, while previously I wouldn’t have considered it. What’s more, I’ll be confident that the code I write is maintainable, and I can easily add more tooling if I need to down the road.

I’d love to hear if you’ve had any similar thoughts (or if you strongly disagree!), and if you have any recommendations for ways to speed up the development process without adding dependencies. When I tweeted about my site re-build, it became my most popular tweet ever.

> I re-built my personal site using just HTML, CSS and nothing else, just to see if that’s possible in 2019 and it turns out it totally is 🤷‍♀️ [https://t.co/2Hv5qQfw5s](https://t.co/2Hv5qQfw5s)
> 
> — Michelle Barker (@mbarker\_84) [March 17, 2019](https://twitter.com/mbarker_84/status/1107416868711743490?ref_src=twsrc%5Etfw)

It’s quite something when building a website using the most basic technologies imaginable has somehow become revolutionary.