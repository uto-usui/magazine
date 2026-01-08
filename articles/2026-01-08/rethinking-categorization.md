---
title: "Rethinking Categorization"
source: "https://lea.verou.me/blog/2023/rethinking-categorization/"
publishedDate: "2023-07-20"
category: "css"
feedName: "Lea Verou"
---

## Rethinking Categorization

This is the third spinoff post in the [migration saga of this blog from WordPress to 11ty](https://lea.verou.me/blog/2023/going-lean/).

Migrating was a good opportunity to [rethink the information architecture of my site](https://twitter.com/LeaVerou/status/1680900090829983744), especially around categorization.

Just like most WP users, I was using both categories and tags, simply because they came for free. However the difference between them was a bit fuzzy, as evidenced by how inconsistently they are used, both here and around the Web. I was mainly using Categories for the _type_ of article (Articles, Rants, Releases, Tips, Tutorials, News, Thoughts), however there were also categories that were more like content tags (e.g. CSS WG, Original, Speaking, Benchmarks).

This was easily solved by moving the latter to actual tags. However, tags are no panacea, there are several issues with them as well.

### [Tag aliases](#tag-aliases)

First, there were many tags that were **synonyms of each other**, and posts were fragmented across them, or had to include both (e.g. [JS](https://lea.verou.me/blog/tags/js/) and [Javascript](https://lea.verou.me/blog/tags/javascript)). I addressed this by defining [aliases](https://github.com/LeaVerou/lea.verou.me/tree/main/data/tag_aliases.json) in a global data file, and using Eleventy to [dynamically build Netlify redirects](https://github.com/LeaVerou/lea.verou.me/tree/main/redirects.njk) for them.

```
# Tag aliases
{% for alias, tag in tag_aliases %}/tags/{{ alias }}/ /tags/{{ tag }}/ 301
{% endfor %}
```

Turns out I’m not the first to think of building the Netlify `_redirects` file dynamically, some googling revealed [this blog post](https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/) from 2021 that does the same thing.

I’ve also decided to expose these aliases in the [tags index](https://lea.verou.me/blog/tags/):

![](https://lea.verou.me/blog/2023/rethinking-categorization/images/aliases-tag-index.png)

### [“Orphan” tags](#%E2%80%9Corphan%E2%80%9D-tags)

Lastly, another issue is what I call “orphan tags”: Tags that are only used in a single post. The primary use case for both tags and categories is to help you discover related content. Tags that are only used once clutter the list of tags, but serve no actual purpose.

It is important to note that orphan tags are not (always) an authoring mistake. While some tags are definitely too specific and thus unlikely to be used again, the vast majority of orphan tags are tags that _could_ plausibly be used again, but it simply hasn’t happened.

I definitely removed a bunch of overly specific tags from the content, but was still left with more orphan tags than tags with more than one post (103 vs 78 as I write these lines).

For (1), the best course of action is probably to remove the tags from the content altogether. However for (2), there are two things to consider.

#### [How to best display orphan tags in the](#how-to-best-display-orphan-tags-in-the-tag-index%3F) [tag index](https://lea.verou.me/blog/tags/)?

For the [tag index](https://lea.verou.me/blog/tags/), I’ve separated orphan tags from the rest, and I’m displaying them in a `<details>` element at the end, that is collapsed by default.

![](https://lea.verou.me/blog/2023/rethinking-categorization/images/orphan-index.png)

Each tag is a link to the post that uses it instead of a tags page, since there is only one post that uses it.

#### [How to best display orphan tags in the post itself?](#how-to-best-display-orphan-tags-in-the-post-itself%3F)

This is a little trickier. For now, I’ve refrained from making them links, and I’m displaying them faded out to communicate this.

![](https://lea.verou.me/blog/2023/rethinking-categorization/images/orphan-tags-post.png)

Another alternative I’m contemplating is to hide them entirely. Not as a punitive measure because they have failed at their one purpose in life 😅, but because this would allow me to use tags liberally, and only what sticks would be displayed to the end user.

A third, intermediate solution, would be to have a “and 4 orphan tags” message at the end of the list of tags, which can be clicked to show them.

These are not just UX/IA improvements, they are also performance improvements. **Not linking orphan tags to tag pages means I don’t need to generate these tag pages at all.** Since the majority of tags are orphan tags, this allowed me to substantially reduce the number of pages that need to be generated, and cut down build time by a whopping **40%**, from 2.7s to 1.7s (on average).

### [Tag hierarchies?](#tag-hierarchies%3F)

The theory is that categories are a [taxonomy](https://en.wikipedia.org/wiki/Taxonomy) and tags a [folksonomy](https://en.wikipedia.org/wiki/Folksonomy). Taxonomies can be hierarchical, but folksonomies are, [by definition](https://en.wikipedia.org/wiki/Folksonomy#Folksonomy_vs._taxonomy), flat. However, **in practice, tags almost always have an implicit hierarchy**, which is also what [research on folksonomies in the wild tends to find](https://en.wikipedia.org/wiki/Folksonomy#Folksonomy_vs._taxonomy).

Examples from this very blog:

-   There is a separate tag for [ES](https://lea.verou.me/blog/tags/es/) (ECMAScript), and a separate one for [JS](https://lea.verou.me/blog/tags/js). However, any post tagged ES should also be tagged JS – though the opposite is not true.
-   There is a tag for [CSS](https://lea.verou.me/blog/tags/css/), tags for specific CSS specifications (e.g. [CSS Backgrounds & Borders](https://lea.verou.me/blog/tags/css-backgrounds/)), and even tags for specific CSS functions or properties (e.g. [`background-attachment`](https://lea.verou.me/blog/tags/background-attachment/), [`background-size`](https://lea.verou.me/blog/tags/background-size/)). However, these are not orthogonal: posts tagged with specific CSS features should also be tagged with the CSS spec that contains them, as well as a general “CSS” tag.

**I have yet to see a use case for tagging that does _not_ result in implicit hierarchies.** Yet, all UIs for entering tags assume that they are flat. Instead, it’s up to each individual post to maintain these relationships, which is tedious and error prone. In practice, the more general tags are often left out, but not intentionally or predictably.

It would be much better to be able to define this hierarchy in a central place, and have it automatically applied to all posts. In 11ty, it could be as simple as a data file for each tag’s “parent” tag. Every time the tag is used, its parent is also added to the post automatically, recursively all the way up to the root (at build time). I have not tried this yet, but I’m excited to experiment with it once I have a bit more time.

Back to our original dilemma: Do I still need categories, especially if I eventually implement tag hierarchies? It does seem that the categories I used in WP for the article type (Articles, Rants, Releases, Tips, Tutorials, News, Thoughts etc) are somewhat distinct from my usage of tags, which are more about the content of the article. However, it is unclear whether this is the best use of categories, or whether I should just use tags for this as well. Another common practice is to use tags for more specific content tags, and categories for broader areas (e.g. “Software engineering”, “Product”, “HCI”, “Personal” etc). Skipping past the point that tag hierarchies make it easy to use tags for this too, this makes me think: maybe what is needed is actually metadata, not categories. Instead of deciding that categories hold the article type, or the broader domain, what if we had certain attributes for _both_ of these things. Then, we could have a “type” attribute, and a “domain” attribute, and use them both for categorization, and for filtering. Since Eleventy already supports arbitrary metadata, this is just a matter of implementation.

Lots to think about, but one thing seems clear: Categories do not have a clear purpose, and thus I’m doing away with them. For now, I have converted all past categories to tags, so that the additional metadata is not lost, and I will revisit how to best expose this metadata in the future.