---
title: "Enhancing Our Components with CSS :empty"
source: "https://ishadeed.com/article/css-empty/"
publishedDate: "2016-10-18"
category: "css"
feedName: "Ahmad Shadeed"
---

While building a component, we sometimes don’t think about what will happen in case there was no content. How does it will look? In CSS, we have a useful pseudo-class `:empty` that provide us with the ability to check if the content of an element is empty or not. In this article, we will explore some use cases and real world examples where `:empty` can be useful.

## 1\. Figure Element

![](https://ishadeed.com/assets/css-empty/figure.jpg)

HTML has an awesome element called `<figure>`, it provide us with the ability to add an `<img>` in addition to a caption by using the element `<figcaption>`. In some cases, we want to keep the caption empty, in case it has padding and a background color, then it will look empty and bad. `:empty` to the rescue!

{% highlight html %}

![](https://ishadeed.com/article/css-empty/hello.jpg)

{% endhighlight %}

{% highlight css %} figcaption { padding: 1em; background: lightgrey; }

figcaption:empty { display: none; } {% endhighlight %}

See the Pen [CSS :empty - Figure](https://codepen.io/shadeed/pen/194f328c7f0d52ef85295795603cb537/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## 2\. Article tag

![](https://ishadeed.com/assets/css-empty/article.jpg)

On any news website, it’s important to have different categories for the articles. We can place a category tag on each article to let users explore that category if they are interested. In some edge cases, we don’t have a clear category for an article so we leave it empty.

By using `:empty`, we can hide it completely to prevent any unwanted look.

{% highlight css %} .post-category:empty { display: none; } {% endhighlight %}

See the Pen [CSS :empty - Article Tag](https://codepen.io/shadeed/pen/5d4007fd83d0f72935367de8748668ba/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## 3\. Alerts

![](https://ishadeed.com/assets/css-empty/alert.jpg)

Each website needs to provide users with alerts and updates when they need to. For example, an alert that prompts when a user clicks on submit button without finishing the whole form. What if the alert doesn’t have content? It will look empty and weird.

{% highlight css %} .alert:empty { display: none; } {% endhighlight %}

See the Pen [CSS :empty - Alert](https://codepen.io/shadeed/pen/96603a97e777bb50f2d1a330990ab97e/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## 4\. Showing a message

![](https://ishadeed.com/assets/css-empty/show-message.jpg)

In some cases, when we have an empty element, we want to replace it with a warning or something to indicate that there is an issue. We can revert some styles and add content using `:after` or `:before` pseudo-elements.

{% highlight css %} .post-time:empty { border-left: 0; padding-left: 0; font-size: 90%; }

.post-time:empty:after { content: “No specified date for this post.”; opacity: 0.5; } {% endhighlight %}

See the Pen [CSS :empty - Show a message](https://codepen.io/shadeed/pen/c44ed8cd0f4b7dd43d9f2ca16b68c7af/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## 5\. Hide Separators

![](https://ishadeed.com/assets/css-empty/separator.jpg)

Nowadays we depend a lot of CSS to add borders and separators between elements. I realized lately that it’s better to use the default `<hr/>` element for separating important things. For instance, a paragraph followed by a short sentence, we want to separate them with a `<hr/>`.

In case there is no paragraph, I want to hide the separator because there is no need for it. By using CSS adjacent sibling selector (next-sibling selector), I will hide the `<hr/` that is placed after the `.content` element.

{% highlight css %} .content:empty + hr { display: none; } {% endhighlight %}

See the Pen [CSS :empty - Hide Separators](https://codepen.io/shadeed/pen/b26d87f5264c3b404269fc119881facb/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

![](https://ishadeed.com/assets/css-empty/comments.jpg)

Sometimes, we need to show the comments count for a specific article. In case it was empty, we don’t need to show it. By using `:empty` we can hide them easily.

{% highlight css %} .counter:empty { display: none; }

.counter:empty + .label { display: none; } {% endhighlight %}

See the Pen [CSS :empty - Comment counter](https://codepen.io/shadeed/pen/83f229d3bfb949e0e45a3d520ff0fe8c/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

Did you like the article? [Share it on Twitter](https://twitter.com/intent/tweet?text=Ahmad%20Shadeed%20-%20{{%20page.title%20}}&url={{%20site.url%20}}{{%20page.url%20}}&via=shadeed9&related=shadeed9 "Share on Twitter")

Thank you for reading.