---
title: "Measuring the value of design systems"
source: "https://www.figma.com/blog/measuring-the-value-of-design-systems/"
publishedDate: "2019-12-19"
category: "design"
feedName: "Figma Blog"
---

_As of February 2025, [Figma’s Library Analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) now includes styles and variables data in addition to the existing components data for both Organization and Enterprise customers, with expanded capabilities available through the [Library Analytics API](https://www.google.com/url?q=https://www.figma.com/developers/api%23library-analytics&sa=D&source=calendar&ust=1739650689598073&usg=AOvVaw2aB3mbDsCCnpFfbmXS9WC0) for Enterprise customers. Functionality in this article may not represent these changes._

As a Data Scientist at Figma, I dig into customer data everyday to help our team make informed product decisions. Figma’s cloud-based platform gives us a unique advantage to rapidly learn through data and share those insights back to our customers. For example, we recently [opened up the data around design system usage](https://www.figma.com/blog/introducing-design-system-analytics/)

to our customers on the Figma Organization plan.

We wanted to make design system analytics accessible to our customers for two key reasons:

1.  Design systems are critical to helping teams unite around a single source of truth for assets that are used repeatedly within a product (in fact, 3/4ths of Figma’s enterprise customers are currently leveraging design systems across their entire org).
2.  Design systems are difficult to build and maintain without quantitative insight into how they are actually being used by designers.

We believe that with the right data, design systems teams are able to make better decisions about their shared libraries and components, resulting in more useful and relevant design systems.

As we worked towards releasing this feature, I found myself asking if there was a way to quantify the benefit of maintaining up-to-date and relevant design systems. We knew Design System Analytics would help customers work towards this end state, but was there something more we could measure about the value they’d be gaining? As someone who’s background involves designing experiments, I was excited by the prospect of doing some analysis working with our own design team to understand the impact of design systems.

I built the following experiment to quantify the amount of time a relevant design system can save designers.

[![colorful graphic with text, gradients, code](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEC0lEQVQ4jVWUW2yTBRiGGxi4M4eObW6wwRxjjCBjWw9rtx5o7djf09/D+rdr1/5toR1jg5HoAAeRCwVi1EQTlcOFiqKJ0aCiHESiQTwEJUAYI0QgZMrQBAEjiBsXj2nRC6++uyfvl/egyI+oUCbamdtroTzRwSJpGxbnlzhWnkZ03sDj/A2XMIrbcQ2XcBGh83s03v2UdUvkRVrID6vIMAp7NBT2qFEU9KipWmNj6ZMeavs81EvDmO0HcQrn8bpuITp+wSmM4nHdRHT8TOfKr1GJeygNdWVBeeGW/wNnxfUsHnSj2hxk2YYwjZHtWB1f4eocRXSM4RZ+wm2/jMd5E7f9KoLwIxrPO5SGHirMC6vIiCqOaSmKalBUpC00PylheDqKZkhGlXwJm/csDscl7PYzuFxn8HmvIorXcNov4nBdRus/QFl3kBmxVmbJembKOkoS7dmrqMwA+wN09qcx96Zp7XkWk/cQK9wnMLqPYpOO4YyexCIdR+89jM5/mAbpRUoibspWm6jstTI70Ubm0+JYK4oMtSHmQnYP85TxNXrb9tFt+Bi7+QjttiNo3YfQBD5kSdduarp2MC84hDLSTaFsYubqdpQpI8VJHYVxLbkxFYoZcivNcoDt7Xv5vHKE9yuu8fzCMfqXXkdU30BvvEKj7RvqHO8y17uTklAfBTEX0xN6cpIqpifUFKf0zO41kJtQoyhLmTCsjvGq/j1OK8c5rrzH7qq/2FQ/SbDpASb9bZpWjFAvHKTa8wpzgoMUxjxMS7YxJdnC1EQLRWk9c9aayUtqUJSnzKjlIC+o3+SUcoxjJX/yevVdNi6eQGqaxKS/RZPlPPXCJ1R7XmZOcD0FMZFpSX0WOCXezCNJNUUpHdMTKhQz4zoWhgQGtDvYX32CvQvOsrXhHMmmEVbqRlCZf6Ch4zNqnHuo9D2DMpSiKCqSGzcyLa4hJ95CblJDflJDTqwZRcah6rgNrRjGvmIQm2UIXcdGGoVh6pxbqRI3Ue4boKwrTWVgHfODm6kJbWF+9xAV4TTlcT9Va+1UrLGQF1WhyFg/N22lVDYyK6RHGbRSEexmgTRIrTRMjbSRecE+FkhDNHW9jdH/HVbfBay+UYz+b1FFd7F8fYq69Q6Ko9qHTZkdb8umvCCi5dGQzPLAPkz+Uzzhu4DFdw6D/yRm/ync4g1k+wRrbZP02x4gC3exBr5g2ZoBageEbFsUmbQXR1vJj7RQFDZQJ23D5b5EumOSDZZJ1lkniQsTRB0TbDL9zRuP3+XQY7c5UnOHt5b8TspylEa5l+o+278KZX22Qv8BGwLPscp2hd2N9/i09jYfLPqDndr7bDFM8FHdHcYLf+V+znUmpo4zXjDGroYDtHbJlK4yZgfiH+bfa7OEGkzsAAAAAElFTkSuQmCC)![colorful graphic with text, gradients, code](https://cdn.sanity.io/images/599r6htc/regionalized/29eb9a3444c39b6d2529947d88e6b07bbe01580e-1608x1206.png?w=1608&h=1206&q=75&fit=max&auto=format)](https://www.figma.com/blog/what-we-launched-at-framework-2024/)

At Framework 2024, we announced [Code Connect for developers](https://www.figma.com/blog/introducing-code-connect/), typography and gradient variables, and our Library Analytics API to help you drive design system adoption across your entire organization. [Read more](https://www.figma.com/blog/what-we-launched-at-framework-2024/).

## [Our hypothesis: A well-maintained design system means time savings for your designers](#our-hypothesis-a-well-maintained-design-system)

Each time a designer leverages an asset from a design system, they save themselves time by avoiding the following tasks:

-   Recreating something from scratch
-   Searching through old design files to look for an asset they know exists
-   Making micro-decisions around text style, placement, and even color selections, often guided by tools like the [color wheel](https://www.figma.com/color-wheel/)

The time saved from avoiding these tasks can add up to a huge benefit for designers, allowing them to have more focus time on strategically impactful work.

## [The experiment: How we quantitatively measured a creative process](#the-experiment-how-we-quantitatively-measured-a)

I created a scenario where designers were asked to design a screen that allows users to accomplish two different tasks within the context of a bank account aggregator app. Both tasks were tested to make sure they take an individual the same amount of time to complete, so while one person may complete both tasks in 8 minutes and another may complete both in 12, each designer acts as their own control.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB3UlEQVQ4y5WTzW7TQBSF+3ws2AAb3oVNVRAbxCNAEZQNZMGSDVAIIBUVSBE/aRPU1sahie35u2M7juZwZxyHSNAoXXy61zNnzsy9M94gIgSMCRifiwQ2eoXy8BHK/jbzYB7v89jDMOc1plnnwloi59n4r+Gkj/LLXdRvrqPevcpcQf3yMuoXlzi/Fua8ZqWhWTbMTmAHHRSfb6P4tIVp7xbqgy3UvU1MD3hs2AmatQ2NltB5AjH+CclYEaE2CWbmFJU85nJHQdMamnMN59GjtIFUHBmyBaaFxEz8QJV+BcnxQrfScNlUKQkpRUBrBSsTFMk7UNyFzqK/Fa1rKKVEmqYBpRQK0ij0WbhdLfNl7WrDRclsIoQI+F5NS809jLmHJyCVrV9yi9Y60J6kVCNUSRdF/Bomjy7eQ19ynmXI8zyclnQGSocw4yMoMZ5rL9jDjA09mm+8Ki3qIkdpJvxkxELLpv8YhsTv1EYPlxswRjtrrZvSxM0m+676vef4Yha61e+wfdgqhTn7BhO/h4m6ATp+Dvp+j9mG+bXXaOa/7Pkn9Lv57/zU0fCZo94dRx9vNuxvOvpwo8kHnaAJ2vakKw3FyFH81tnBU2cPHzM7zvZ3mvzoCc91g2bZsDX9AzdtauqyhkbfAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/4d3adae63bcd656d178d05b11477ea86f92cb875-1600x1200.png?w=804&h=603&q=75&fit=max&auto=format)

The sample homescreen designers were provided for this experiment.

The tasks were to 1) design a screen for viewing financial transactions and trends for a specific account, and 2) design a user flow for connecting a new account to your profile. All designers completed both tasks but were only given access to a design system for one of the two tasks. For the task without a design system we provided old design files that each designer could reference for the task - something we often hear designers doing.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAABYlAAAWJQFJUiTwAAABBklEQVQY0z2Q2UrFQAyG+/7P4xN456UiIijiWT3dp52ts/UzPRUDIZOQ/MtURvcYYwlLxDuLU2eW/o08f5O8wgWPj45kbxT9RfENJQVKzmTJUso913W9ZzWoH4a+wc6axc6E7pV8eqDcHrHjgatquekON74T6yeC+hTiiWUxIsISgyNvBH+gVd3VtO0ZO43kRZSYC6l/JqsP9Fxz6a90G6Bp8Ooks4ZejyijsEaA5Z3k7h+wG3pG1QubDHMiuYEwHaV2BLFqvagO8iVe4/SAtROTm9Gi0jtNMJoclt0yUAVpYow7QxFAfRHbolAfpY9ssWbZmQ8s7YvUEznuNnOSu5Rkb1e3xS8NAIGbEjHmXAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/ed9770735a2e6194cdf0ff93b02afd7f0c3e1fa6-7070x2002.png?rect=0,1,7070,2001&w=1632&h=462&q=75&fit=max&auto=format)

The design system used in this experiment.

To eliminate any potential bias, we alternated which task designers were asked to complete first and gave them plenty of time to familiarize themselves with the assets before beginning each exercise. The prompts for each scenario were written to describe tasks the user should be able to do and did not prescribe what the designer should be creating.

We measured the time it took to complete each task and participants decided for themselves what was an appropriate stopping point to control for quality across both tasks.

## [The Result](#the-result)

We found that when participants had access to a design system they completed their objective **34% faster** than without a design system.

It’s important to call out that the design system used in this experiment was directly applicable to the task the designers were given; it was up-to-date and relevant to what they were working on. As a result, we expect that this time-savings finding is the maximum time savings one would find in a real-world scenario.

I wanted to take this time-savings result one step further to make it more tangible for a real design team, like the one here at Figma. Figma has 7 Product Designers and based on their calendars they each get about 20 hours of focused design time per week, for a total of 140 design hours per week.

This means that if **none of the tasks they’re working on** have a relevant design system, they are able to do 140 hours of design work a week.

However, if **every task they’re working on** has a relevant design system, they are able to do 34% more design work in that 140 hours, giving them 212 design hours. That’s equivalent to adding another 3.5 designers to the team each week!

In reality, Figma’s design team is probably somewhere in between, as they are using a design system that is relevant for some tasks and not others. As we evolve our design system to cover more use cases, and work to ensure all designers on the team are using it consistently, we can expect this to increase.

## [Investing in your design systems](#investing-in-your-design-systems)

While the value of design systems is generally accepted, our goal with this experiment was to take a quantitative approach to make that value more tangible. In addition to the time savings, this experiment also revealed a more qualitative benefit. Several participants commented that they felt more confident in their final design when they had access to the design system because they knew it was consistent with the product.

With the confirmation that design systems truly are worth the investment, it becomes more critical that design systems teams have the resources they need to make the best decisions when building and evolving their design systems. Figma’s unique insight into design system usage informs these decisions, enabling teams to build more relevant and up-to-date design systems that will have a meaningful impact on their designers’ efficiency. You can get started today with these [tips for making the most of your design system data](https://www.figma.com/best-practices/make-the-most-of-design-system-analytics/).

I had a lot of fun designing this experiment and helping our product team build Design System Analytics. As a Data Scientist, neither is technically part of my day-to-day role, but the ability to work on interesting data-related projects in other areas of the business is one of the best parts of being at Figma. If any of this peaks your interest, check out our careers page - [we’re hiring](https://jobs.lever.co/figma/?team=Engineering)!