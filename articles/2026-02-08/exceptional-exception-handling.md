---
title: "Exceptional Exception Handling"
source: "http://testing.googleblog.com/2023/12/exceptional-exception-handling.html"
publishedDate: "2023-12-05"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
---

> **Note:** Full content could not be retrieved. [Read the original article](http://testing.googleblog.com/2023/12/exceptional-exception-handling.html)

@media only screen and (max-width: 600px) { .body { overflow-x: auto; } }

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1DplVjabYLpASmmr6DRXfA5L3y4NPsiiYVhW-BNVP4ZM/edit) to display in your office._

by Yiming Sun

  

Have you ever seen huge exception-handling blocks? Here is an example in Java, although you may have seen similar problems in Python, TypeScript, Kotlin, or any language that supports exceptions.

  

Let's assume we are calling bakePizza() to bake a pizza, and it can be overbaked, throwing a PizzaOverbakedException.

class PizzaOverbakedException extends Exception {};

  

void bakePizza () throws PizzaOverbakedException {};

  

try {

  // 100+ lines of code to prepare pizza ingredients.

  ...

  bakePizza();

  // Another 100+ lines of code to deliver pizza to a customer.

  ...

} catch (Exception e) {

  throw new IllegalStateException(); // Root cause ignored while throwing new exception.

}

Here are the problems with the above code:

-   Obscuring the logic. The method bakePizza(), is obscured by the additional lines of code of preparation and delivery, so unintended exceptions from preparation and delivery may be caught.
-   Catching the general exception. catch (Exception e) will catch everything, despite that we might only want to handle PizzaOverbakedException here.
-   Rethrowing a general exception, with the original exception ignored. This means that the root cause is lost - we don't know what exactly goes wrong with pizza baking while debugging.

Here is a better alternative, rewritten to avoid the problems above.

class PizzaOverbakedException extends Exception {};

  

void bakePizza () throws PizzaOverbakedException {};

  

// 100+ lines of code to prepare pizza ingredients.

...

try {

  bakePizza();

} catch (PizzaOverbakedException e) {  // Other exceptions won’t be caught.

  // Rethrow a more meaningful exception; so that we know pizza is overbaked.

  throw new IllegalStateException(“You burned the pizza!”, e);  

}

// Another 100+ lines of code to deliver pizza to a customer.

...