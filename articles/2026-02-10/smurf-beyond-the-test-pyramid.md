---
title: "SMURF: Beyond the Test Pyramid"
source: "http://testing.googleblog.com/2024/10/smurf-beyond-test-pyramid.html"
publishedDate: "2024-10-15"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

This article was adapted from a Google [Testing on the Toilet](http://googletesting.blogspot.com/2007/01/introducing-testing-on-toilet.html) (TotT) episode. You can download a [printer-friendly version](https://docs.google.com/document/d/1VZZlbmkOprhzp17ttjpBQ3oaqAXxEv422O2jMezwZC8/edit?tab=t.0) of this TotT episode and post it in your office.

By Adam Bender  

The [test pyramid](https://martinfowler.com/bliki/TestPyramid.html) is the canonical heuristic for guiding test suite evolution. It conveys a simple message - prefer more unit tests than integration tests, and prefer more integration tests than end-to-end tests.

![A diagram of the test pyramid](https://lh7-rt.googleusercontent.com/docsz/AD_4nXej7qoczQGJ-CPfJ4LIt5l-nWvaGd9WXLPLEslXGzE5ih0C_jdCcK1Ds_QOpvLqD03hbNZXbnGvCNQ8Oy5cJOPZ5xR1qRT8pxp-CDF6KaFX1Dch9FOZjtbmBxzWK_y0OIjSnH8J6wYXV7obtmUaTX9BG5XW=s16000?key=9eA8neKwqCIgXwSUpDaoQQ)

While useful, the test pyramid lacks the details you need as your test suite grows and you face challenging trade-offs. To scale your test suite, go beyond the test pyramid.

The SMURF mnemonic is an easy way to remember the tradeoffs to consider when balancing your test suite:

-   Speed: Unit tests are faster than other test types and can be run more often—you’ll catch problems sooner.
    
-   Maintainability: The aggregated cost of debugging and maintaining tests (of all types) adds up quickly. A larger system under test has more code, and thus greater exposure to dependency churn and requirement drift which, in turn, creates more maintenance work.  
    
-   Utilization: Tests that use fewer resources (memory, disk, CPU) cost less to run. A good test suite optimizes resource utilization so that it does not grow super-linearly with the number of tests. Unit tests usually have better utilization characteristics, often because they use test doubles or only involve limited parts of a system. 
    
-   Reliability: Reliable tests only fail when an actual problem has been discovered. Sorting through flaky tests for problems wastes developer time and costs resources in rerunning the tests. As the size of a system and its corresponding tests grow, non-determinism (and thus, flakiness) creeps in, and your test suite is more likely to become unreliable.
    
-   Fidelity: High-fidelity tests come closer to approximating real operating conditions (e.g., real databases or traffic loads) and better predict the behavior of our production systems. Integration and end-to-end tests can better reflect realistic conditions, while unit tests have to simulate the environment, which can lead to drift between test expectations and reality.
    

![A radar chart depicting the relationship between SMURF attributes as applied to unit, integration, and end-to-end tests. Unit tests perform best on all attributes except fidelity, where they are the worst. Integration tests are mid-way performers on all aspects. End-to-end tests are worst on all aspects, except fidelity where they are the best.](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcyv0Dd8EPZJHfBuLZfvsLwVhXGVnvpBFhkhmOAOlCfCg6WZMmVyETD8ZH_oWSSYVxte2s9jTjmyGvoBxBL2sawkk-7lJVXDQKyKTaXnXulHhAugimqXk8ZocdlXTGJA6pHudUWgP4W0Zr0EHI92vzDJ_Y=s16000?key=9eA8neKwqCIgXwSUpDaoQQ)

A [radar chart](https://en.wikipedia.org/wiki/Radar_chart)  of Test Type vs. Test Property (i.e. SMURF). Farther from center is better. 

In many cases, the relationships between the SMURF dimensions are in tension: improving one dimension can affect the others. However, if you can improve one or more dimensions of a test without harming the others, then you should do so. When thinking about the types of your tests (unit, integration, end-to-end), your choices have meaningful implications for your test suite’s cost and the value it provides.