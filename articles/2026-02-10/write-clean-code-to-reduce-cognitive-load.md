---
title: "Write Clean Code to Reduce Cognitive Load"
source: "http://testing.googleblog.com/2023/11/write-clean-code-to-reduce-cognitive.html"
publishedDate: "2023-11-06"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1AgcBG2iOmzEWIKYs6hNDyTMZ-an0SOwmJZRsX898XD0/edit?pli=1) to display in your office._

By Andrew Trenk

Do you ever read code and find it hard to understand? You may be experiencing cognitive load!

[Cognitive load](https://en.wikipedia.org/wiki/Cognitive_load) refers to the amount of mental effort required to complete a task. When reading code, you have to keep in mind information such as values of variables, conditional logic, loop indices, data structure state, and interface contracts. Cognitive load increases as code becomes more complex. People can typically hold up to 5–7 separate pieces of information in their short-term memory ([source](https://en.wikipedia.org/wiki/Working_memory#Capacity)); code that involves more information than that can be difficult to understand.

![Two brains displayed side-by-side. 
The left brain is red with a sad face. The text below it says 'Complex code: Too much cognitive load'.;
The left brain is green with a happy face. The text below it says 'Simple code: Minimal cognitive load'.](https://lh7-us.googleusercontent.com/WzdHDiRPb_QYc-sXvRxiM_5qb07FAfm5Jp3zin9MlU92Rpjjz0KLx7JKUwe1PDPRKZsK6Fg7hGhNN50qa5ftWFpnq7fUMrar0EOckvDZQ9HgBw7nf3IHOTVf4cFrSdMOGCVwxzw5VC-UWyBivPSclWQ)

Cognitive load is often higher for other people reading code you wrote than it is for yourself, since readers need to understand your intentions. Think of the times you read someone else’s code and struggled to understand its behavior. One of the [reasons for code reviews](https://google.github.io/eng-practices/review/reviewer/looking-for.html#complexity) is to allow reviewers to check if the changes to the code cause too much cognitive load. Be kind to your co-workers: reduce their cognitive load by writing clean code.

The key to reducing cognitive load is to make code simpler so it can be understood more easily by readers. This is the principle behind many code health practices. Here are some examples:

-   Limit the amount of code in a function or file. Aim to keep the code concise enough that you can keep the whole thing in your head at once. Prefer to [keep functions small](https://martinfowler.com/bliki/FunctionLength.html), and try to limit each class to a [single responsibility](https://en.wikipedia.org/wiki/Single-responsibility_principle).
    
-   Create abstractions to hide implementation details. [Abstractions](https://en.wikipedia.org/wiki/Abstraction_\(computer_science\)) such as functions and interfaces allow you to deal with simpler concepts and hide complex details. However, remember that over-engineering your code with too many abstractions also causes cognitive load.
    
-   Simplify control flow. Functions with too many if statements or loops can be hard to understand since it is difficult to keep the entire [control flow](https://testing.googleblog.com/2023/10/simplify-your-control-flows.html) in your head. Hide complex logic in helper functions, and [reduce nesting](https://testing.googleblog.com/2017/06/code-health-reduce-nesting-reduce.html) by using early returns to handle special cases.
    
-   Minimize mutable state. Stateless code is simpler to understand. For example, avoid mutable class fields when possible, and make types [immutable](https://en.wikipedia.org/wiki/Immutable_object).
    
-   Include only relevant details in tests. A test can be [hard to follow](https://testing.googleblog.com/2023/10/include-only-relevant-details-in-tests.html) if it includes boilerplate test data that is irrelevant to the test case, or relevant test data is hidden in helper functions.
    
-   Don’t overuse mocks in tests. [Improper use of mocks](https://testing.googleblog.com/2013/05/testing-on-toilet-dont-overuse-mocks.html) can lead to tests that are cluttered with calls that expose implementation details of the system under test.