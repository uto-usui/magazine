---
title: "Single responsibility, the distorted principle"
source: "https://www.truehenrique.com/en/2021/10/27/single-responsibility-the-distorted-principle/"
publishedDate: "2026-06-12"
category: "design"
feedName: "Sidebar"
---

Oct 27 | Henrique F. Teixeira

Software is made by humans, for humans and machines. And humans make mistakes, consequently causing the machine to fail too.

Given this context, over time, various principles and patterns of software development have been developed and established. And they all have one thing in common: **to simplify so that we can work using less cognitive effort**, given that our minds are limited and the problems we have to solve are often complex enough just in their concept, without a single line of code written.

This is a very important insight I had after going through several projects throughout my career; at first, it's not easy to understand despite seeming simple:

-   SOLID
-   MVC
-   DDD (Domain-driven design)
-   Clean Architecture
-   Clean Code
-   Refactoring / Code Smells
-   TDD
-   Redux
-   Microservices
-   Microfrontends
-   Object-Oriented Programming (Encapsulation, inheritance, polymorphism, anemic models, overloading…)
-   Functional Programming (Monads, functors, closures, currying, category theory, pure functions…)
-   Actor Model
-   Law of Demeter
-   Serverless
-   Web components

And beyond software:

-   Agile
-   Scrum
-   Kanban

Why do we learn and study all this?

The answer might seem obvious:

-   "We learn and study to use it in our daily lives, always, and these are the best practices."

But is that really the right answer?

There are contexts where we don't need to use any of this, and many others where we would benefit from using only some of these patterns and practices, not all. Thus, my answer today would be:

-   "We learn and study to know where and when to use it in our daily lives."

The thing is, this answer only comes with experience, with reality. And often at the beginning of a career and for a long time, we find ourselves using patterns just because we recently studied them and assume that's what we should do, after all, it's a pattern! It's the right thing to do!

This last sentence results in two of the biggest problems I particularly faced throughout my career, coming from legacy code (or from myself):

-   **Overengineering**: Too much engineering and too many patterns for a simple problem.
-   **Underengineering** (I just invented this term): Too little engineering and too few patterns for a complex problem.

And these problems are things that "full-stack JavaScript" courses, frameworks, or languages generally won't teach us.

**Every pattern was created from a problem.** If we haven't experienced that problem, we don't need the pattern. And strongly recognizing the problem is as important, if not more important, than knowing the details of a pattern. Our job as a _Software Engineer_ is precisely to work without "over" and without "under," just with the "engineer." First, recognize the problems, then fit the patterns (and not the other way around).

Given this introduction, I would now like to talk about a "unique case" and a very curious one:

-   A pattern/principle where it's very common for people not to recognize the problem it actually solves, nor even how it works, but they go around "using" (and "preaching") it everywhere. This is probably the result of a giant "game of telephone" among developers (one tells another, the other listens and tells another, and none of them actually seeks to understand it deeply). Another point that may have led to this is the simplicity of its name:

## Single Responsibility Principle

Unlike "Liskov Substitution Principle," "Chain of Responsibility," or "Law of Demeter," it's very easy to read "Single Responsibility Principle" and think:

"Oh! Single Responsibility Principle, this class does more than one thing! It has more than one responsibility! Let's split it into two."

It's simple. Methods, classes, and every organism within a _software_ should have "a single responsibility," right?

**It depends on what we understand as responsibility.**

To illustrate, I really like to use the dictionary:

-   Responsibility: Obligation to answer for one's own actions or those of others. Character or state of being responsible. **Duty to answer for one's own behavior.**

I highlighted the last sentence because it will be simpler to use with the example below:

Imagine you are a pizza delivery person; what is your responsibility, and what behavior are you accountable for?

…

Imagined it?

I would say that:

-   Responsibility: Deliver the pizza
-   Behavior you are accountable for: Carefully storing the pizza in the bag so it arrives intact, starting the motorcycle, accelerating the motorcycle, riding safely while observing traffic laws, ringing the doorbell upon arrival, and being polite to the customer.

Do we have more than one responsibility? Or do we have behaviors we are accountable for given our responsibility?

Using real-world examples makes it clearer, right?

…

So I'm going to make the example worse; our own pizza delivery body has organs, and they also have their responsibilities:

-   The heart beats and is responsible for blood circulation.
-   The lungs breathe and are responsible for absorbing O2 and eliminating CO2 from inhaled air.
-   The kidneys filter and are responsible for the amount of waste in our blood.

Knowing this, as pizza delivery people, do we have many more responsibilities than we imagine? We also need our bodies to function well to perform the profession, right?

As pizza delivery people, are we accountable for the behavior and responsibilities of our bodies?

By now, you must be quite confused. Things have started to take on large proportions that probably made you exert much more cognitive effort to understand all the complexity involved in the "single responsibility principle," the meaning of responsibility, and behavior.

Looking at the first example, it seems clear what responsibility and behavior are, but when I brought up the second, you probably realized that this can be infinite and take on gigantic proportions.

**I could end the article here, for those who understand, a hint is enough.**

But I will continue. Making an "analogy of the analogy" at the _software_ level, this confusion is exposed in the worst possible way and similarly increases our cognitive effort, going against **simplifying so that we can work using less cognitive effort**.

If this were _software_, I wouldn't be surprised to open the files and see things like:

-   "PizzaDeliveryPerson"
-   "PizzaDeliveryPersonBuilder"
-   "MotorcycleStarter"
-   "KidneyMaintainerService"
-   "MotorcycleAccelerator"
-   "SafeRiding"
-   "PizzaCare.Care()"
-   "Heartbeats.Beat()"
-   "HeartbeatsFactory.create()"
-   "DeliverPizzaFacade"
-   "PizzaServices"

That "delicious code" with high granularity, several dependency injections, and several classes with only one method with "five, ten lines of code," "respecting the _Single Responsibility Principle_ to the end"!

Very easy to maintain, by the way _(contains irony)_

Ultimately, this type of situation causes _software_ that is "structured sideways" (Object-Oriented Programming or Functional Programming no longer exists). Instead of reading code from top to bottom, we end up opening "20" files in our _IDE_ to understand a single business rule that can often represent behaviors of a single responsibility (in "20" files).

Instead of finding what we are looking for in a central point, in a single file, we have to look in several files and then mentally connect them.

**It's like putting together pieces of a giant puzzle.**

And I'm talking about the least bad case! Because this granularity can end up spreading to different projects, _microservices_, or _microfrontends_. Imagine having to open 10 _microservices_ + 5 _microfrontends_?

What happens is that many people still have no idea of the difference between **responsibility** and **behavior**.

Uncle Bob himself (the creator of the principle) said in one of his books:

> _"Of all the SOLID principles, the Single Responsibility Principle is probably the least understood. This is possibly due to its rather inadequate name. In general, upon hearing this name, programmers immediately imagine that all modules should do only one thing."_
> 
> _Robert C. Martin - Clean Architecture p/ 62_

Returning to our example, we have only **one** responsibility: **Deliver the pizza.**

Why can we affirm this?

The method and behavior are independent of the responsibility. We continue to be just **pizza delivery people** with the single responsibility of **delivering pizzas** regardless of how we do it.

For example, I can start delivering by car instead of by motorcycle. And if someone needs to learn how to deliver pizzas, that person will look for me, and I will clearly teach them how.

> _"A module is just a cohesive set of functions and data structures. This word "cohesive" suggests the SRP. Cohesion is the force that binds the code responsible to a single actor."_
> 
> _Robert C. Martin - Clean Architecture p/63_

It is completely **cohesive**, for example, to have a `PizzaDeliveryPerson` class with a `deliver_pizza` method that receives three objects: `pizza`, `customer`, and `motorcycle`. And this method has all the behavior we listed. After all, we won't look for how the delivery person delivers the pizza in another part of the code:

Just a sketch…

class PizzaDeliveryPerson
  def deliver\_pizza(pizza, customer, motorcycle)
    store\_in\_bag(pizza)
    motorcycle.start(motorcycle\_key)
    motorcycle.ride\_safely\_to(customer.address)
    ring\_doorbell()
    be\_polite\_to(customer)
  end

  private
	
  def motorcycle\_key
	
  # ...

  def store\_in\_bag(pizza)
	
  # ...
end

_Single Responsibility Principle_ is about that.

It's about **responsibility**, **behavior**, and how we describe them **cohesively**. Not about "doing only one thing."

> _… "This principle is important when there is a change in some software functionality. When this occurs, the programmer needs to look for the classes that have the responsibility to be modified. Assuming a class has more than one reason to change, this means it is accessed by two parts of the software that do different things. Making a change in one of the responsibilities of this class can, unintentionally, break the other part unexpectedly. This makes the class design fragile."_
> 
> _Maurício Aniche - Test-Driven Development p/ 204_

### Breaking our Single Responsibility Principle and the problems that originated it

Imagine you are a _software engineer_ at the pizzeria and need to change how the pizza is delivered (**behavior**) in the system. Which classes would you look for first?

1.  `DeliverPizza` or `PizzaDeliveryPerson`
2.  `Kitchen` or `KitchenOven`
3.  `CalculateAccounting` or `Payroll`

You surely chose **option 1**, because it is the most cohesive.

The first problem that SRP corrects is precisely **low cohesion**. If we had a class called `CalculateAccounting` that had the behavior of "heating the kitchen oven," we would be violating SRP.

No programmer will think of opening a `CalculateAccounting` class to change the "kitchen oven temperature." It's counterintuitive. `CalculateAccounting` would have **2 responsibilities**: taking care of the kitchen and accounting. **It would have different reasons to change.**

The second biggest problem is the complexity that a class with many responsibilities (remembering that **responsibility** is not **behavior**) can have. The tendency is for the class to become difficult to maintain and test. Besides, two completely different contexts can interfere with each other.

_Note:_. Also note that in the example in the previous section, the `deliver_pizza` method of the `PizzaDeliveryPerson` class knows how to start the `motorcycle`, but doesn't know how the motorcycle works internally when it starts. The behavior of the motorcycle's machinery is not the `PizzaDeliveryPerson`'s responsibility. If the machinery's behavior were also in this class, we would have something similar to this image:

![](https://www.truehenrique.com/images/motaur.png)

Whenever we wanted to maintain the motorcycle, we would have to mess with the `PizzaDeliveryPerson`. Which, for sane people, makes no sense at all.

### The magic formula to respect SRP

-   Avoid using generic names within your _software_, such as _Services_ or _Manager_.
-   If in doubt, ask yourself:
    -   Should class/module Y, which has responsibility X, be accountable for behavior Z?
-   Before you start coding, take some time to think about how to translate your business rule into structures (classes, modules, and functions) with cohesive names. Use words that are common in your team's daily life. I like to think that well-written software is one that a non-technical person (PO, PM, and Stakeholders) can open the files and superficially understand what is happening.

### Summary

These are the 5 main messages I emphasize with this article:

-   Responsibility is not behavior itself. It is the duty to answer for a set of behaviors.
-   SRP is about **responsibility**, **behavior**, and how we describe them **cohesively**. Not about doing only one thing.
-   Cohesion, above all, has to do with the names we give to variables, classes, modules, functions, and methods in relation to what they do and/or are.
-   Every and any pattern or practice serves to **simplify so that we can work using less cognitive effort**; if this does not happen, we should not use the pattern or practice.
-   It is up to the _software engineer_, given a certain context, to find the adequate and ideal solution to the problem, identifying which patterns to use or not, given the deadline, project size, and business objectives.

##### Some cool / complementary links on the subject:

[You dont understand the single responsibility principle (Hackernoon)](https://hackernoon.com/you-dont-understand-the-single-responsibility-principle-abfdd005b137)

[Single responsibility principle: how can i avoid code fragmentation (Stack Exchange Question)](https://softwareengineering.stackexchange.com/questions/150760/single-responsibility-principle-how-can-i-avoid-code-fragmentation)

[The Single Responsibility Principle (David Tanzer)](https://www.davidtanzer.net/david%27s%20blog/2017/07/26/the-single-responsibility-principle.html)

[Single reponsibility principle (Blog Clean Coder / Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)

[Book Clean Architecture (Amazon purchase link)](https://www.amazon.com.br/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164/ref=asc_df_0134494164/?tag=googleshopp00-20&linkCode=df0&hvadid=379726160779&hvpos=&hvnetw=g&hvrand=7253478441797173469&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001766&hvtargid=pla-423658477418&psc=1)

[Cohesion (computer science) (Wikipedia)](https://en.wikipedia.org/wiki/Cohesion_\(computer_science\))

[Book TDD with Ruby (Casa do código)](https://www.casadocodigo.com.br/products/livro-tdd-ruby)

[Book Clean Code (Amazon link)](https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675/ref=asc_df_8576082675/?tag=googleshopp00-20&linkCode=df0&hvadid=379792215563&hvpos=&hvnetw=g&hvrand=4192535749629342066&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001766&hvtargid=pla-398225630878&psc=1)

Hey, what did you think of this article??

Share and give your opinion by clicking on one of the networks below:

Thank you very much!