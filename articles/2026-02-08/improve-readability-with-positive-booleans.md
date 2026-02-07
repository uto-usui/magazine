---
title: "Improve Readability With Positive Booleans"
source: "http://testing.googleblog.com/2023/10/improve-readability-with-positive.html"
publishedDate: "2023-10-17"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
---

> **Note:** Full content could not be retrieved. [Read the original article](http://testing.googleblog.com/2023/10/improve-readability-with-positive.html)

@media only screen and (max-width: 600px) { .body { overflow-x: auto; } }

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1eKfofxfQYq86Icx0FxneQ47kwss5OQX5GhGo1yGAVOE/edit) to display in your office._

By Max Kanat-Alexander

Reading healthy code should be as easy as reading a book in your native language. You shouldn’t have to stop and puzzle over what a line of code is doing. One small trick that can assist with this is to make boolean checks about something positive rather than about something negative.

Here’s an extreme example:

if not nodisable\_kryponite\_shield:

  devise\_clever\_escape\_plan()

else:

  engage\_in\_epic\_battle()

What does that code do? Sure, you can figure it out, but healthy code is not a puzzle, it’s a simple communication. Let’s look at two principles we can use to simplify this code.

1\. Name your flags and variables in such a way that they represent the positive check you wish to make (the presence of something, something being enabled, something being true) rather than the negative check you wish to make (the absence of something, something being disabled, something being false).

1.    
    

if not enable\_kryponite\_shield:

  devise\_clever\_escape\_plan()

else:

  engage\_in\_epic\_battle()

That is already easier to read and understand than the first example.

2\. If your conditional looks like “if not … else …” then reverse it to put the positive case first.

if enable\_kryponite\_shield:

  engage\_in\_epic\_battle()

else:

  devise\_clever\_escape\_plan()

  

Now the intention of the code is immediately obvious.

There are many other contexts in which this gives improvements to readability. For example, the command foo --disable\_feature=False is harder to read and think about than  
foo --enable\_feature=True, particularly when you change the default to enable the feature.

There are some exceptions (for example, in Python, if foo is not None could be considered a “positive check” even though it has a “not” in it), but in general checking the presence or absence of a positive is simpler for readers to understand than checking the presence or absence of a negative.