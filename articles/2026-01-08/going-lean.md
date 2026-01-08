---
title: "Going Lean"
source: "https://lea.verou.me/blog/2023/going-lean/"
publishedDate: "2023-07-21"
category: "css"
feedName: "Lea Verou"
---

## Going Lean

WordPress has been with me since [my very first post in 2009](https://lea.verou.me/blog). There is a lot to love about it: It’s open source, it has a thriving ecosystem, a beautiful default theme, and a revolutionary block editor that makes my inner UX geek giddy. Plus, WP made building a website and publishing content accessible to everyone. No wonder it’s [the most popular CMS in the world](https://almanac.httparchive.org/en/2022/cms#most-popular-cmss), by a **huge** margin.

However, for me, the bad had started to outweigh the good:

-   Things I could do in minutes in a static site, in WP required finding a plugin or tweaking PHP code.
-   It was slow and bloated.
-   Getting a draft out of it and into another medium was a pain.
-   Despite having never been hacked, I was terrified about it, given all the horror stories.
-   I was periodically getting “Error establishing a database connection” errors, whose frequency kept increasing.

It was time to move on. _It’s not you WP, it’s me._

It seemed obvious that the next step would be a statically generated blog. I had been using [Eleventy](https://11ty.dev/) for a while on a variety of sites at that point and loved it, so using that was a no-brainer. In fact, my blog was one of my last remaining non-JAMstack sites, and by far the biggest. I had built a [simple 11ty blog for my husband](https://svgees.us/blog/) a year ago, and was almost jealous of the convenience and simplicity. There are so many conveniences that just come for free with this workflow: git, Markdown, custom components, even GitHub Copilot as you write your prose! And if you can make the repo public, oooooh, the possibilities! People could even file PRs and issues for your blog posts!

Using [Netlify](https://netlify.com/) as a platform was also a no-brainer: I had been using it for years, for over 30 sites at this point! I love their simplicity, their focus on developer experience, and their commitment to open source. I also happen to know a bunch of folks there, and they have a great culture too.

However, I was dreading the amount of work it would take to migrate 14 years of content, plugins, and styling. The stroke that broke the camel’s back was a particularly bad db outage. I [tweeted](https://twitter.com/LeaVerou/status/1652166572335587329) about my frustration, but I had already made up my mind.

I reviewed the list of plugins I had installed on WP to estimate the amount of work. Nearly all fell in one of two categories:

1.  Solving problems I wouldn’t have if I wasn’t using WP (e.g. SVG support, Don’t Muck My Markup)
2.  Giving me benefits I could get in 11ty with very little code (e.g. Prism syntax highlighting, Custom Body Class, Disqus, Unlist Posts & Pages, Widget CSS classes)
3.  Giving me benefits I could get with existing Eleventy plugins (e.g. Add Anchor Links, Easy Table of Contents)

This could actually work!

## [Public or private repo?](#public-or-private-repo%3F)

One of the hardest dilemmas was whether to make the repo for this website public or private.

Overall, I was happy to have most files be public, but there were a few things I wanted to keep private:

-   Drafts (some drafts I’m ok to share publicly, but not all)
-   Unlisted pages and posts (posts with publicly accessible URLs, but not linked from anywhere)
-   Private pages (e.g. in the previous site I had a password-protected page with my details for conference organizers)

Unfortunately, right now it’s all-or-nothing, even if only one file needs to be private, the whole repo needs to be private.

Making the repo public does have many advantages:

-   Transparency is one of my core values, and this is in line with it.
-   People can learn from my code and avoid going down the same rabbit holes I did.
-   People can file issues for problems.
-   People can send PRs to fix both content and functionality.
-   I wouldn’t need to use a separate public repo for the data that populates my [Speaking](https://lea.verou.me/speaking/), [Publications](https://lea.verou.me/publications/), and [Projects](https://lea.verou.me/projects/) pages.

I went back and forth quite a lot, but in the end I decided to make it public. In fact, I fully embraced it, by making it as easy as possible to file issues and submit PRs.

![Notice from top of page saying "You are browsing the new, beta version of my website. Some things may not work properly. View this page on the old website and if you spot any problems, please file an issue!" with links throughout](https://lea.verou.me/blog/2023/going-lean/images/broken-page-notice.png)

Each page has a link to report a problem with it, which prefills as much info as possible. This was also a good excuse to try out [GitHub Issue Forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms), as well as [URLs for prefilling the form](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue#creating-an-issue-from-a-url-query)!

!["Edit on GitHub link"](https://lea.verou.me/blog/2023/going-lean/images/gh-edit.png)

Each page has a link to edit it on GitHub, which automatically takes you through a PR flow if you don’t have write access to the repo.

### [Licensing](#licensing)

Note that **a public repo is not automatically open source**. As you know, I have a long track record of open sourcing my code. I love seeing people learning from it, using it in their own projects, and blogging about what they’ve learned. So, [MIT-licensing](https://opensource.org/licenses/MIT) the **code** part of this website is a no-brainer. [CC-BY](https://creativecommons.org/licenses/by/4.0/) also seems like a no-brainer for **content**, because, why not?

Where it gets tricky is the **design**. I’m well aware that neither my logo nor the visual style of this website would win any design awards; I haven’t worked as a graphic designer for many years, and it shows. However, it’s something I feel is very personal to me, my own personal brand, which by definition needs to be unique. Seeing another website with the same logo and/or visual style would feel just as unsettling as walking into a house that looks exactly like mine. I’m speaking from experience: I’ve had my logo and design copied many times, and it always felt like a violation.

I’m not sure how to express this distinction in a GitHub `LICENSE` file, so I haven’t yet added one, but I did try to outline it in the [Credits & Making Of](https://lea.verou.me/credits/#licensing) page.

It’s still difficult to draw the line precisely, especially when it comes to CSS code. I’m basically happy for people to copy as much of my CSS code as they want (following [MIT license](https://opensource.org/licenses/MIT) rules), as long as the end result doesn’t scream “Lea Verou” to anyone who has seen this site. _But how on Earth do you express that?_ 🤔

## [Migrating content to Markdown](#migrating-content-to-markdown)

The title of this section says “to Markdown” because that’s one of the benefits of this approach: static site generators are largely compatible with each other, so if I ever needed to migrate again, it would be much easier.

Thankfully, travelers on this road before me had already paved it. Many open source scripts out there to migrate WP to Markdown! The one that worked well for me was [lonekorean/wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown) (though I later discovered there’s [a more updated fork](https://github.com/flowershow/wordpress-to-markdown) now)

It was still a bumpy road. First, it kept getting stuck on parsing the WP XML export, specifically in comments. I use Disqus for comments, but it mirrors comments in the internal WP system. Also, WP seems to continue recording trackbacks even if they are not displayed anywhere. Turns out I had hundreds of thousands of spam trackbacks, which I spent hours cleaning up (it was quite a meditative experience). In the end I got the total comments + trackbacks from 290K down to 26K which reduced the size of the XML export from 210 MB to a mere 31 MB. This did not fix the parsing issue, but allowed me to simply open the file in VS Code and delete the problematic comments manually. It also fixed the uptime issues I was having: I never got another “Error establishing a database connection” error after that, despite taking my own sweet time to migrate (started in April 2023, and finished in July!). Ideally, I wish WP had an option to export without comments, but I guess that’s not a common use case.

While this importer is great, and allowed me to configure the file structure in a way that preserved all my URLs, I did lose a few things:

-   “Read more” separators (filed it as [issue #93](https://github.com/lonekorean/wordpress-export-to-markdown/issues/93))
-   Figures (they are imported as just images with text underneath) (filed it as [issue #94](https://github.com/lonekorean/wordpress-export-to-markdown/issues/94))
-   Drafts ([#16](https://github.com/lonekorean/wordpress-export-to-markdown/issues/16))
-   Pages (I had to manually copy them over, but it was only a handful)
-   Any custom classes were gone (e.g. a `"view-demo"` class I used to create “call to action” links)

A few other issues:

-   It downloaded all images, but did not update the URLs in the Markdown files. This was easy to fix with a regex find and replace from `https?://lea.verou.me/wp-content/uploads/(\d{4}/\d{2})/([\w\.-]+\.(?:png|gif|jpe?g))` to `images/$2`.
-   Some images from some posts were not downloaded – I still have no idea why.
-   It did not download any non-media uploads, e.g. zip files. Thankfully, these were only a couple, so I could detect and port over manually.
-   Older posts included code directly in the content, without code blocks, which meant it was being parsed as HTML, often with disastrous results (e.g. the post just cutting off in the middle of a sentence because it mentioned `<script>`, which opened an actual `<script>` element and ate up the rest of the content). I fixed a few manually, but I’m sure there’s more left.
-   Because code was just included as content, the importer also escaped all Markdown special symbols, so adding code blocks around it was not enough, I also had to remove a bunch of backslashes manually.

## [Rethinking Categorization](#rethinking-categorization)

While the importer preserved both tags and categories, this was a good opportunity to rethink whether I need them both, and to re-evaluate how I use them.

This spun off into a separate post: [Rethinking Categorization](https://lea.verou.me/blog/2023/rethinking-categorization/).

Probably one of the hardest parts of this migration was preserving Disqus comments. In fact, it was so hard that I procrastinated on it for three months, being stuck in a limbo where I couldn’t blog because I’d have to port the new post manually.

I’ve documented the process in a [separate blog post](https://lea.verou.me/blog/2023/preserve-disqus/), as it was quite involved, including some thoughts about what system to use in the future, as I eventually hope to migrate away from Disqus.

## [Keeping URLs cool](#keeping-urls-cool)

I wanted to preserve the URL structure of my old site as much as possible, both for SEO, but also because [cool URLs don’t change](https://www.w3.org/Provider/Style/URI). The WP importer I used allowed me to preserve the `/year/month/slug` structure of my URLs.

I did want to have the blog in its own directory though. This site started as a blog, but I now see it as more of a personal site _with_ a blog. Thankfully, redirecting these URLs to corresponding `/blog/` URLs was a one liner using [Netlify redirects](https://docs.netlify.com/routing/redirects/):

```
/20* /blog/20:splat 301
```

Going forwards, I also decided to do away with the month being part of the URL, as it complicates the file structure for no discernible benefit and I don’t blog nearly as much now as I did in 2009, e.g. compare [2009](https://lea.verou.me/blog/2009) vs [2022](https://lea.verou.me/blog/2022/): 38 vs 7! I do think I will start blogging more again now, not only due to the new site, but also due to new interests and a long backlog of ideas (just look at [July 2023](https://lea.verou.me/blog/2023/07/) so far!). However, I doubt I will ever get back to the pre-2014 levels, I simply don’t have that kind of time anymore (coincidentally, it appears my blogging frequency dropped significantly after I [started my PhD](https://lea.verou.me/blog/2014/02/im-going-to-mit/)).

I also wanted to continue having nice, RESTful, [usable](https://www.nngroup.com/articles/url-as-ui/) URLs, which also requires:

> URLs that are “hackable” to allow users to move to higher levels of the information architecture by hacking off the end of the URL

In practice, this means it’s not enough if `tags/foo/` shows all posts tagged “foo”, `tags/` should also show all tags. Similarly, it’s not enough if `/blog/2023/04/private-fields-considered-harmful/` links to the [corresponding blog post](https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/), but also:

-   [`/blog/2023/04/`](https://lea.verou.me/blog/2023/04/) should show all posts from April 2023
-   [`/blog/2023/`](https://lea.verou.me/blog/2023/) should show all posts from 2023
-   and of course [`/blog/`](https://lea.verou.me/blog/) should show all posts

This proved quite tricky to do with Eleventy, and spanned an entirely different [blog post](https://lea.verou.me/blog/2023/11ty-indices/).

## [Overall impressions](#overall-impressions)

Overall, I’m happy with the result, and the flexibility. I’ve had a lot of fun with this project, and it was a great distraction during a very difficult time in my life, due to dealing with some serious health issues in my immediate family.

However, there are a few things that are now more of a hassle than they were in WP, mainly around the editing flow:

-   In WP, editing a blog post I was looking at in my browser was a single click (provided I was logged in). I guess I could still do that by editing through GitHub, but now I’m spoiled, I want an easy way to edit in my own editor (VS Code, which has [a lot of nice features for Markdown editing](https://code.visualstudio.com/docs/languages/markdown)), however the only way to do that is to either painfully traverse the directory structure, or …search to find the right \*.md file, neither of which is ideal.
-   Previewing a post I was editing was also a single click, whereas now I need to run a local server and manually type the URL in (or browse the website to find it).
-   Making edits now requires me to think of a suitable commit message. Sure, this is useful sometimes, but most of the time, I want the convenience of just saving my changes and being done with it.

### [Open file in VS Code from the browser?](#open-file-in-vs-code-from-the-browser%3F)

There _is_ a way to solve the first problem: VS Code supports a `vscode://` protocol that allows you to [open a file in VS Code from the browser](https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls). This means, this link would open the file for this blog post in VS Code:

```
<a href="vscode://file/Users/leaverou/Documents/lea.verou.me/blog/2023/going-lean/index.md">Edit in VS Code</a>
```

See the issue? I cannot add a button to the UI that only works for me! However, I don’t _need_ to add a button to the UI: as long as I expose the input path of the current page (Eleventy’s [`page.inputPath`](https://www.11ty.dev/docs/data-eleventy-supplied/)) in the HTML somehow, I can just add a bookmarklet to my own browser that just does:

```
location.href = `vscode://file/Users/leaverou/Documents/lea.verou.me/${document.documentElement.dataset.inputpath}`;
```

In fact, here it is, ready to be dragged to the bookmarks bar: Edit in VS Code

Now, if only I could find a way to do the opposite: open the localhost URL that corresponds to the Markdown file I’m editing — and my workflow would be complete!

## [What’s next?](#what%E2%80%99s-next%3F)

Obviously, there’s a lot of work left to do, and I bet people will find a lot more breakage than I had noticed. I also have a backlog of blog post ideas that I can’t _wait_ to write about.

But I’ve also been toying around with the idea of porting over my personal (non-tech) blog posts, and keep them in an entirely separate section of the website. I don’t like that my content is currently hostage to [Tumblr](https://pensieve.verou.me/) (2012-2013) and [Medium](https://leaverou.medium.com/) (2017-2021), and would love to own it too, though I’m a bit concerned that properly separating the two would take a lot of work.

Anyhow, 'nuff said. Ship it, squirrel! 🚢🐿️