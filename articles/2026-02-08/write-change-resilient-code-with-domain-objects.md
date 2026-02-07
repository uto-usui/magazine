---
title: "Write Change-Resilient Code With Domain Objects"
source: "http://testing.googleblog.com/2024/09/write-change-resilient-code-with-domain.html"
publishedDate: "2024-09-04"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
---

> **Note:** Full content could not be retrieved. [Read the original article](http://testing.googleblog.com/2024/09/write-change-resilient-code-with-domain.html)

@media only screen and (max-width: 600px) { .body { overflow-x: auto; } .post-content table, .post-content td { width: auto !important; white-space: nowrap; } }

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1JjZQl70z2vd8hgBy2nVp7am6cxdzLAh-ar-S_XRvF3s/edit) to display in your office._

By Amy Fu

  

Although a product's requirements can change often, its fundamental ideas usually change slowly. This leads to an interesting insight: if we write code that matches the fundamental ideas of the product, it will be more likely to survive future product changes.

Domain objects are building blocks (such as classes and interfaces) in our code that match the fundamental ideas of the product. Instead of writing code to match the desired behavior for the product's requirements ("configure text to be white"), we match the underlying idea ("text color settings").

For example, imagine you’re part of the gPizza team, which sells tasty, fresh pizzas to feed hungry Googlers. Due to popular demand, your team has decided to add a delivery service.

Without domain objects, the quickest path to pizza delivery is to simply create a deliverPizza method:

public class DeliveryService {

  public void deliverPizza(List<Pizza> pizzas) { ... }

}

Although this works well at first, what happens if gPizza expands its offerings to other foods?  
You could add a new method:

  public void deliverWithDrinks(List<Pizza> pizzas, List<Drink> drinks) { ... }

But as your list of requirements grows (snacks, sweets, etc.), you’ll be stuck adding more and more methods. How can you change your initial implementation to avoid this continued maintenance burden?

You could add a domain object that models the product's ideas, instead of its requirements:

-   A use case is a specific behavior that helps the product satisfy its business requirements.  
    (In this case, "Deliver pizzas so we make more money".)
    
-   A domain object represents a common idea that is shared by several similar use cases.
    

To identify the appropriate domain object, ask yourself:

1.  What related use cases does the product support, and what do we plan to support in future?
    

A: gPizza wants to deliver pizzas now, and eventually other products such as drinks and snacks.

2.  What common idea do these use cases share?
    

A: gPizza wants to send the customer the food they ordered.

3.  What is a domain object we can use to represent this common idea?
    

A: The domain object is a food order. We can encapsulate the use cases in a FoodOrder class.

Domain objects can be a useful generalization - but avoid choosing objects that are too generic, since there is a tradeoff between improved maintainability and more complex, ambiguous code. Generally, aim to support only planned use cases - not all possible use cases (see [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) principles).

// GOOD: It's clear what we're delivering.

public void deliver(FoodOrder order) {}

// BAD: Don't support furniture delivery.

public void deliver(DeliveryList items) {}

_Learn more about domain objects and the more advanced topic of domain-driven design in the book [Domain-Driven Design](https://www.oreilly.com/library/view/domain-driven-design-tackling/0321125215/) by Eric Evans._