---
title: "Older Tech In The Browser Stack"
source: "https://smashingmagazine.com/2025/11/older-tech-browser-stack/"
publishedDate: "2025-11-13"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Bryan Rasmussen)"
---

-   19 min read
-   [CSS](https://smashingmagazine.com/category/css), [Techniques](https://smashingmagazine.com/category/techniques), [Tools](https://smashingmagazine.com/category/tools)

There are many existing web features and technologies in the wild that you may never touch directly in your day-to-day work. Perhaps you’re fairly new to web development and are simply unaware of them because you’re steeped in the abstraction of a specific framework that doesn’t require you to know it deeply, or even at all. Bryan Rasmussen looks specifically at XPath and demonstrates how it can be used alongside CSS to query elements.

I’ve been in front-end development long enough to see a trend over the years: younger developers working with a new paradigm of programming without understanding the historical context of it.

It is, of course, perfectly understandable to _not_ know something. The web is a very big place with a diverse set of skills and specialties, and we don’t always know what we don’t know. Learning in this field is an ongoing journey rather than something that happens once and ends.

Case in point: Someone on my team asked if it was possible to tell if users navigate away from a particular tab in the UI. I pointed out JavaScript’s [`beforeunload` event](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event). But those who have tackled this before know this is possible because they have been hit with alerts about unsaved data on other sites, for which `beforeunload` is a typical use case. I also pointed out the [`pageHide`](https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event) and [`visibilityChange`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) events to my colleague for good measure.

How did I know about that? Because it came up in another project, not because I studied up on it when initially learning JavaScript.

The fact is that modern front-end frameworks are standing on the shoulders of the technology giants that preceded them. They abstract development practices, often for a better developer experience that reduces, or even eliminates, the need to know or touch what have traditionally been essential front-end concepts everyone probably ought to know.

Consider the [CSS Object Model (CSSOM)](https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/). You might expect that anyone working in CSS and JavaScript has a bunch of hands-on CSSOM experience, but that’s not always going to be the case.

There was a React project for an e-commerce site I worked on where we needed to load a stylesheet for the currently selected payment provider. The problem was that the stylesheet was loading on every page when it was only really needed on a specific page. The developer tasked with making this happen hadn’t ever loaded a stylesheet dynamically. Again, this is totally understandable when React abstracts away the traditional approach you might have reached for.

The CSSOM is likely not something you need in your everyday work. But it is likely you will need to interact with it at some point, even in a one-off instance.

These experiences inspired me to write this article. There are many existing web features and technologies in the wild that you may never touch directly in your day-to-day work. Perhaps you’re fairly new to web development and are simply unaware of them because you’re steeped in the abstraction of a specific framework that doesn’t require you to know it deeply, or even at all.

I’m speaking specifically about [XML](https://developer.mozilla.org/en-US/docs/Web/XML/Guides/XML_introduction), which many of us know is an ancient language not totally dissimilar from HTML.

I’m bringing this up because of recent WHATWG discussions [suggesting](https://github.com/whatwg/html/issues/11523) that a significant chunk of the XML stack known as [XSLT](https://developer.mozilla.org/en-US/docs/Web/XML/XSLT) programming should be removed from browsers. This is exactly the sort of older, existing technology we’ve had for years that could be used for something as practical as the CSSOM situation my team was in.

Have you worked with XSLT before? Let’s see if we lean heavily into this older technology and leverage its features outside the context of XML to tackle real-world problems today.

## XPath: The Central API

The most important XML technology that is perhaps the most useful outside of a straight XML perspective is **XPath**, a query language that allows you to find any node or attribute in a markup tree with one root element. I have a personal affection for XSLT, but that also relies on XPath, and personal affection must be put aside in ranking importance.

The argument for removing XSLT does not make any mention of XPath, so I suppose it is still allowed. That’s good because XPath is the central and most important API in this suite of technologies, especially when trying to find something to use outside normal XML usage. It is important because, while CSS selectors can be used to find most of the elements in your page, they cannot find them all. Furthermore, CSS selectors cannot be used to find an element based on its current position in the DOM.

XPath can.

Now, some of you reading this might know XPath, and some might not. XPath is a pretty big area of technology, and I can’t really teach all the basics and also show you cool things to do with it in a single article like this. I actually tried writing that article, but the average Smashing Magazine publication doesn’t go over 5,000 words. I was already at more than 2,000 words while only halfway through the basics.

So, I’m going to start doing cool stuff with XPath and give you some links that you can use for the basics if you find this stuff interesting.

## Combining XPath & CSS

XPath can do lots of things that CSS selectors can’t when querying elements. But CSS selectors can also do a few things that XPath can’t, namely, query elements by class name.

CSS

XPath

`.myClass`

`/*[contains(@class, "myClass")]`

In this example, CSS queries elements that contain a `.myClass` classname. Meanwhile, the XPath example queries elements that contain an attribute class with the string “`myClass`”. In other words, it selects elements with `myClass` in any attribute, including elements with the `.myClass` classname — as well as elements with “`myClass`” in the string, such as `.myClass2`. XPath is broader in that sense.

So, no. I’m not suggesting that we ought to toss out CSS and start selecting all elements via XPath. That’s not the point.

> [The point is that XPath can do things that CSS cannot and could still be very useful, even though it is an older technology in the browser stack and may not seem obvious at first glance.](https://twitter.com/share?text=%0aThe%20point%20is%20that%20XPath%20can%20do%20things%20that%20CSS%20cannot%20and%20could%20still%20be%20very%20useful,%20even%20though%20it%20is%20an%20older%20technology%20in%20the%20browser%20stack%20and%20may%20not%20seem%20obvious%20at%20first%20glance.%0a&url=https://smashingmagazine.com%2f2025%2f11%2folder-tech-browser-stack%2f)
> 
> “

Let’s use the two technologies together not only because we can, but because we’ll learn something about XPath in the process, making it another tool in your stack — one you might not have known has been there all along!

The problem is that JavaScript’s `document.evaluate` method and the various query selector methods we use with the CSS APIs for JavaScript are incompatible.

I have made a compatible querying API to get us started, though admittedly, I have not put a lot of thought into it since it’s a departure from what we’re doing here. Here’s a fairly simple working example of a reusable query constructor:

See the Pen \[queryXPath \[forked\]\](https://codepen.io/smashingmag/pen/jEqEyEx) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [queryXPath \[forked\]](https://codepen.io/smashingmag/pen/jEqEyEx) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

I’ve added two methods on the document object: `queryCSSSelectors` (which is essentially `querySelectorAll`) and `queryXPaths`. Both of these return a `queryResults` object:

```
{
  queryType: nodes | string | number | boolean,
  results: any[] // html elements, xml elements, strings, numbers, booleans,
  queryCSSSelectors: (query: string, amend: boolean) => queryResults,
  queryXpaths: (query: string, amend: boolean) => queryResults
}
```

The `queryCSSSelectors` and `queryXpaths` functions run the query you give them over the elements in the results array, as long as the results array is of type `nodes`, of course. Otherwise, it will return a `queryResult` with an empty array and a type of `nodes`. If the `amend` property is set to `true`, the functions will change their own `queryResults`.

**Under no circumstances should this be used in a production environment.** I am doing it this way purely to demonstrate the various effects of using the two query APIs together.

## Example Queries

I want to show a few examples of different XPath queries that demonstrate some of the powerful things they can do and how they can be used in place of other approaches.

The first example is `//li/text()`. This queries all `li` elements and returns their text nodes. So, if we were to query the following HTML:

```
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

…this is what is returned:

```
{"queryType":"xpathEvaluate","results":["one","two","three"],"resultType":"string"}
```

In other words, we get the following array: `["one","two","three"]`.

Normally, you would query for the `li` elements to get that, turn the result of that query into an array, map the array, and return the text node of each element. But we can do that more concisely with XPath:

```
document.queryXPaths("//li/text()").results.
```

Notice that the way to get a text node is to use `text()`, which looks like a function signature — and it is. It returns the text node of an element. In our example, there are three `li` elements in the markup, each containing text (`"one"`, `"two"`, and `"three"`).

Let’s look at one more example of a `text()` query. Assume this is our markup:

```
<pa href="/login.html">Sign In</a>
```

Let’s write a query that returns the `href` attribute value:

```
document.queryXPaths("//a[text() = 'Sign In']/@href").results.
```

This is an XPath query on the current document, just like the last example, but this time we return the `href` attribute of a link (`a` element) that contains the text “Sign In”. The actual returned result is `["/login.html"]`.

## XPath Functions Overview

There are a number of XPath functions, and you’re probably unfamiliar with them. There are several, I think, that are worth knowing about, including the following:

-   **`starts-with`**  
    If a text starts with a particular other text example, `starts-with(@href, 'http:')` returns `true` if an `href` attribute starts with `http:`.
-   **`contains`**  
    If a text contains a particular other text example, `contains(text(), "Smashing Magazine")` returns `true` if a text node contains the words “Smashing Magazine” in it anywhere.
-   **`count`**  
    Returns a count of how many matches there are to a query. For example, `count(//*[starts-with(@href, 'http:'])` returns a count of how many links in the context node have elements with an `href` attribute that contains the text beginning with the `http:`.
-   **`substring`**  
    Works like JavaScript `substring`, except you pass the string as an argument. For example, `substring("my text", 2, 4)` returns `"y t"`.
-   **`substring-before`**  
    Returns the part of a string before another string. For example, `substing-before("my text", " ")` returns `"my"`. Similarly, `substring-before("hi","bye")` returns an empty string.
-   **`substring-after`**  
    Returns the part of a string after another string. For example, `substing-after("my text", " ")` returns `"text"`. Similarly, `substring-after("hi","bye")`returns an empty string.
-   **`normalize-space`**  
    Returns the argument string with whitespace normalized by stripping leading and trailing whitespace and replacing sequences of whitespace characters by a single space.
-   **`not`**  
    Returns a boolean `true` if the argument is false, otherwise `false`.
-   **`true`**  
    Returns boolean `true`.
-   **`false`**  
    Returns boolean `false`.
-   **`concat`**  
    The same thing as JavaScript `concat`, except you do not run it as a method on a string. Instead, you put in all the strings you want to concatenate.
-   **`string-length`**  
    This is not the same as JavaScript `string-length`, but rather returns the length of the string it is given as an argument.
-   **`translate`**  
    This takes a string and changes the second argument to the third argument. For example, `translate("abcdef", "abc", "XYZ")` outputs `XYZdef`.

Aside from these particular XPath functions, there are a number of other functions that work just the same as their JavaScript counterparts — or counterparts in basically any programming language — that you would probably also find useful, such as `floor`, `ceiling`, `round`, `sum`, and so on.

The following demo illustrates each of these functions:

See the Pen \[XPath Numerical functions \[forked\]\](https://codepen.io/smashingmag/pen/emZmgzX) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [XPath Numerical functions \[forked\]](https://codepen.io/smashingmag/pen/emZmgzX) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

Note that, like most of the string manipulation functions, many of the numerical ones take a **single input**. This is, of course, because they are supposed to be used for querying, as in the last XPath example:

```
//li[floor(text()) > 250]/@val
```

If you use them, as most of the examples do, you will end up running it on the first node that matches the path.

There are also some type conversion functions you should probably avoid because JavaScript already has its own type conversion problems. But there can be times when you want to convert a string to a number in order to check it against some other number.

Functions that set the type of something are boolean, number, string, and node. These are the important XPath datatypes.

And as you might imagine, most of these functions can be used on datatypes that are not DOM nodes. For example, `substring-after` takes a string as we’ve already covered, but it could be the string from an `href` attribute. It can also just be a string:

```
const testSubstringAfter = document.queryXPaths("substring-after('hello world',' ')");
```

Obviously, this example will give us back the results array as `["world"]`. To show this in action, I have made a demo page using functions against things that are not DOM nodes:

See the Pen \[queryXPath \[forked\]\](https://codepen.io/smashingmag/pen/qEZERqd) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [queryXPath \[forked\]](https://codepen.io/smashingmag/pen/qEZERqd) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

You should note the surprising aspect of the `translate` function, which is that if you have a character in the second argument (i.e., the list of characters you want translated) and no matching character to translate to, that character gets removed from the output.

Thus, this:

```
translate('Hello, My Name is Inigo Montoya, you killed my father, prepare to die','abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,','*')
```

…results in the string, including spaces:

```
[" * *  ** "]
```

This means that the letter “a” is being translated to an asterisk (`*`), but every other character that does not have a translation given the target string is completely removed. The whitespace is all we have left between the translated “a” characters.

Then again, this query:

```
translate('Hello, My Name is Inigo Montoya, you killed my father, prepare to die','abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,','**************************************************')")
```

…does not have the problem and outputs a result that looks like this:

```
"***** ** **** ** ***** ******* *** ****** ** ****** ******* ** ***"
```

It might strike you that there is no easy way in JavaScript to do exactly what the XPath `translate` function does, although for many use cases, `replaceAll` with regular expressions can handle it.

You could use the same approach I have demonstrated, but that is suboptimal if all you want is to translate the strings. The following demo wraps XPath’s `translate` function to provide a JavaScript version:

See the Pen \[translate function \[forked\]\](https://codepen.io/smashingmag/pen/ZYWYLyZ) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [translate function \[forked\]](https://codepen.io/smashingmag/pen/ZYWYLyZ) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

Where might you use something like this? Consider [Caesar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher) encryption with a three-place offset (e.g., top-of-the-line encryption from 48 B.C.):

```
translate("Caesar is planning to cross the Rubicon!", 
 "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "XYZABCDEFGHIJKLMNOPQRSTUVWxyzabcdefghijklmnopqrstuvw")
```

The input text “Caesar is planning to cross the Rubicon!” results in “Zxbpxo fp mixkkfkd ql zolpp qeb Oryfzlk!”

To give another quick example of different possibilities, I made a `metal` function that takes a string input and uses a `translate` function to return the text, including all characters that take umlauts.

See the Pen \[metal function \[forked\]\](https://codepen.io/smashingmag/pen/YPqPNrN) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [metal function \[forked\]](https://codepen.io/smashingmag/pen/YPqPNrN) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

```
const metal = (str) => {
  return translate(str, "AOUaou","ÄÖÜäöü");
}
```

And, if given the text “Motley Crue rules, rock on dudes!”, returns “Mötley Crüe rüles, röck ön düdes!”

Obviously, one might have all sorts of parody uses of this function. If that’s you, then this [TVTropes article](https://tvtropes.org/pmwiki/pmwiki.php/Main/HeavyMetalUmlaut) ought to provide you with plenty of inspiration.

## Using CSS With XPath

Remember our main reason for using CSS selectors together with XPath: CSS pretty much understands what a class is, whereas the best you can do with XPath is string comparisons of the class attribute. That will work in most cases.

But if you were to ever run into a situation where, say, someone created classes named `.primaryLinks` and `.primaryLinks2` and you were using XPath to get the `.primaryLinks` class, then you would likely run into problems. As long as there’s nothing silly like that, you would probably use XPath. But I am sad to report that I have worked at places where people do those types of silly things.

Here’s another demo using CSS and XPath together. It shows what happens when we use the code to run an XPath on a context node that is not the document’s node.

See the Pen \[css and xpath together \[forked\]\](https://codepen.io/smashingmag/pen/ogxgBpz) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [css and xpath together \[forked\]](https://codepen.io/smashingmag/pen/ogxgBpz) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

The CSS query is `.relatedarticles a`, which fetches the two `a` elements in a `div` assigned a `.relatedarticles` class.

After that are three “bad” queries, that is to say, queries that do not do what we want them to do when running with these elements as the context node.

I can explain why they are behaving differently than you might expect. The three bad queries in question are:

-   `//text()`: Returns all the text in the document.
-   `//a/text()`: Returns all the text inside of links in the document.
-   `./a/text()`: Returns no results.

The reason for these results is that while your context is `a` elements returned from the CSS query, `//` goes against the whole document. This is the strength of XPath; CSS cannot go from a node up to an ancestor and then to a sibling of that ancestor, and walk down to a descendant of that sibling. But XPath can.

Meanwhile, `./` queries the children of the current node, where the dot (`.`) represents the current node, and the forward slash (`/`) represents going to some child node — whether it is an attribute, element, or text is determined by the next part of the path. But there is no child `a` element selected by the CSS query, thus that query also returns nothing.

There are three good queries in that last demo:

-   `.//text()`,
-   `./text()`,
-   `normalize-space(./text())`.

The `normalize-space` query demonstrates XPath function usage, but also fixes a problem included in the other queries. The HTML is structured like this:

```
<a href="https://www.smashingmagazine.com/2018/04/feature-testing-selenium-webdriver/">
  Automating Your Feature Testing With Selenium WebDriver
</a>
```

The query returns a line feed at the beginning and end of the text node, and `normalize-space` removes this.

Using any XPath function that returns something other than a boolean with an input XPath applies to other functions. The following demo shows a number of examples:

See the Pen \[xpath functions examples \[forked\]\](https://codepen.io/smashingmag/pen/JoXYGeN) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [xpath functions examples \[forked\]](https://codepen.io/smashingmag/pen/JoXYGeN) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

The first example shows a problem you should watch out for. Specifically, the following code:

```
document.queryXPaths("substring-after(//a/@href,'https://')");
```

…returns one string:

```
"www.smashingmagazine.com/2018/04/feature-testing-selenium-webdriver/"
```

It makes sense, right? These functions do not return arrays but rather single strings or single numbers. Running the function anywhere with multiple results only returns the first result.

The second result shows what we really want:

```
document.queryCSSSelectors("a").queryXPaths("substring-after(./@href,'https://')");
```

Which returns an array of two strings:

```
["www.smashingmagazine.com/2018/04/feature-testing-selenium-webdriver/","www.smashingmagazine.com/2022/11/automated-test-results-improve-accessibility/"]
```

XPath functions can be nested just like functions in JavaScript. So, if we know the Smashing Magazine URL structure, we could do the following (using template literals is recommended):

```
`translate(
    substring(
      substring-after(./@href, ‘www.smashingmagazine.com/')
    ,9),
 '/','')`
```

This is getting a bit too complex to the extent that it needs comments describing what it does: take all of the URL from the `href` attribute after `www.smashingmagazine.com/`, remove the first nine characters, then translate the forward slash (`/`) character to nothing so as to get rid of the ending forward slash.

The resulting array:

```
["feature-testing-selenium-webdriver","automated-test-results-improve-accessibility"]
```

## More XPath Use Cases

XPath can really shine in **testing**. The reason is not difficult to see, as XPath can be used to get every element in the DOM, from any position in the DOM, whereas CSS cannot.

You cannot count on CSS classes remaining consistent in many modern build systems, but with XPath, we are able to make more robust matches as to what the text content of an element is, regardless of a changing DOM structure.

There has been [research on techniques](https://ieeexplore.ieee.org/document/6983884) that allow you to make resilient XPath tests. Nothing is worse than having tests flake out and fail just because a CSS selector no longer works because something has been renamed or removed.

XPath is also really great at **multiple locator extraction**. There is more than one way to use XPath queries to match an element. The same is true with CSS. But XPath queries can drill into things in a more targeted way that limits what gets returned, allowing you to find a specific match where there may be several possible matches.

For example, we can use XPath to return a specific `h2` element that is contained inside a `div` that immediately follows a sibling `div` that, in turn, contains a child image element with a `data-testID="leader"` attribute on it:

```
<div>
  <div>
    <h1>don't get this headline</h1>
  </div>
  
  <div>
    <h2>Don't get this headline either</h2>
  </div>
  
  <div>
    <h2>The header for the leader image</h2>
  </div>
  
  <div>
    <img data-testID="leader" src="image.jpg"/>
  </div>
</div>
```

This is the query:

```
document.queryXPaths(`
  //div[
    following-sibling::div[1]
    /img[@data-testID='leader']
  ]
  /h2/
  text()
`);
```

Let’s drop in a demo to see how that all comes together:

See the Pen \[Complex H2 Query \[forked\]\](https://codepen.io/smashingmag/pen/zxqxNev) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

See the Pen [Complex H2 Query \[forked\]](https://codepen.io/smashingmag/pen/zxqxNev) by [Bryan Rasmussen](https://codepen.io/bryanrasmussen).

So, yes. There are lots of possible paths to any element in a test using XPath.

## XSLT 1.0 Deprecation

I mentioned early on that [the Chrome team plans on removing XSLT 1.0 support from the browser](https://xslt.rip/). That’s important because XSLT 1.0 uses XML-focused programming for document transformation that, in turn, relies on XPath 1.0, which is what is found in most browsers.

When that happens, we’ll lose a key component of XPath. But given the fact that XPath is really great for writing tests, I find it unlikely that XPath as a whole will disappear anytime soon.

That said, I’ve noticed that people get interested in a feature when it’s taken away. And that’s certainly true in the case of XSLT 1.0 being deprecated. [There’s an entire discussion happening over at Hacker News](https://news.ycombinator.com/item?id=45006098) filled with arguments against the deprecation. The post itself is a great example of creating a blogging framework with XSLT. You can read the discussion for yourself, but it gets into how JavaScript might be used as a shim for XLST to handle those sorts of cases.

I have also [seen suggestions](https://www.saxonica.com/saxonjs/documentation3/index.html#!browser) that browsers should use SaxonJS, which is a port to JavaScript’s Saxon XSLT, XQUERY, and XPath engines. That’s an interesting idea, especially as Saxon-JS implements the current version of these specifications, whereas there is no browser that implements any version of XPath or XSLT beyond 1.0, and none that implements XQuery.

I reached out to [Norm Tovey-Walsh](https://norm.tovey-walsh.com/) at Saxonica, the company behind SaxonJS and other versions of the Saxon engine. He said:

> “If any browser vendor was interested in taking SaxonJS as a starting point for integrating modern XML technologies into the browser, we’d be thrilled to discuss it with them.”
> 
> — [Norm Tovey-Walsh](https://norm.tovey-walsh.com/)

But also added:

> “I would be very surprised if anyone thought that taking SaxonJS in its current form and dropping it into the browser build unchanged would be the ideal approach. A browser vendor, by nature of the fact that they build the browser, could approach the integration at a much deeper level than we can ‘from the outside’.”
> 
> — [Norm Tovey-Walsh](https://norm.tovey-walsh.com/)

It’s worth noting that Tovey-Walsh’s comments came about a week before the XSLT deprecation announcement.

## Conclusion

I could go on and on. But I hope this has demonstrated the **power of XPath** and given you plenty of examples demonstrating how to use it for achieving great things. It’s a perfect example of older technology in the browser stack that still has plenty of **utility** today, even if you’ve never known it existed or never considered reaching for it.

### Further Reading

-   “[Enhancing the Resiliency of Automated Web Tests with Natural Language](https://dl.acm.org/doi/full/10.1145/3700523.3700536)” (ACM Digital Library) by Maroun Ayli, Youssef Bakouny, Nader Jalloul, and Rima Kilany  
    _This article provides many XPath examples for writing resilient tests._
-   [XPath](https://developer.mozilla.org/en-US/docs/Web/XML/XPath) (MDN)  
    _This is an excellent place to start if you want a technical explanation detailing how XPath works._
-   [XPath Tutorial](http://www.zvon.org/xxl/XPathTutorial/General/examples.html) (ZVON)  
    _I’ve found this tutorial to be the most helpful in my own learning, thanks to a wealth of examples and clear explanations._
-   [XPather](https://xpather.com/)  
    _This interactive tool lets you work directly with the code._

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)