---
title: "Borders on responsive images"
source: "https://csswizardry.com/2011/07/borders-on-responsive-images/"
publishedDate: "2011-07-31"
category: "css"
feedName: "CSS Wizardry"
---

31 July, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [](#demo)[Demo](http://jsfiddle.net/csswizardry/eqE9J/show/)

This is a quick-tip type post, nothing major but a simple and effective tip for getting responsive borders on responsive images in your responsive designs.

As we know all too well, we can’t specify borders as percentages. This is a major annoyance if you’re working (or attempting to work) large borders into a responsive design. It may not be all that difficult with images, it turns out.

Instead of applying something like this:

```
img{
  max-width:100%;
  border:5px solid red;
}
```

Simply use:

```
img{
    max-width:98%;
    padding:1%; /* A percentage that, when doubled and added to the above, makes 100%. */
    background:red; /* Color of the faux border. */
}
```

## [Demo](http://jsfiddle.net/csswizardry/eqE9J/show/)

I made [a jsFiddle](http://jsfiddle.net/csswizardry/eqE9J/) and [here is its output](http://jsfiddle.net/csswizardry/eqE9J/show/).

Now this does seem ridiculously obvious but a quick bit of Googling (other search engines are available) yielded nothing similar. Apologies is someone’s beaten me to this and I’m retreading old ground.