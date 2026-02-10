---
title: "Simplify Your Control Flows"
source: "http://testing.googleblog.com/2023/10/simplify-your-control-flows.html"
publishedDate: "2023-10-24"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1wi50sHboQQPhsgq9VosWwn91RrNDhOLi9C-YivZiO_c/edit) to display in your office._

By Jeff Hoy

When adding loops and conditionals, even simple code can become difficult to understand.  
Consider this change:

if (commode.HasPreferredCustomer()) {

if (commode.HasPreferredCustomer()) {

  commode.WarmSeat();

  commode.WarmSeat();

  

} else if (commode.CustomerOnPhone()) {

  

  commode.ChillSeat();

}

}

While the above change may seem simple, even adding a single else statement can make the code harder to follow since the complexity of code grows quickly with its size. Below we see the code surrounding the above snippet; the control flow on the right illustrates how much a reader needs to retain:

while (commode.StillOccupied()) {

  if (commode.HasPreferredCustomer()) {

    commode.WarmSeat();

  } else if (commode.CustomerOnPhone()) {  

    commode.ChillSeat();                   

  }

  if (commode.ContainsKale()) {

    commode.PrintHealthCertificate();

    break;

  }

}

![](https://lh7-us.googleusercontent.com/pH4drAWtciV0pwKh2TM6Dg3rD0CeXykX2N1mHQJT02NMb__OmC8luVQiHo2PP48U-99MtQqlVlDuA4BRWgHqLr-x1PuVKhflK-PtuZz8QW0Icgp24-c0nCUXz6LgXZJ-TdObSmIHgSWvitn1c_rkivc)

Code Control Flow with 5 structures and 9 edges:

challenging for a reader to retain in memory.

In order to fully understand the code, the reader needs to keep the entire control flow in their head.  However, the retention capacity of working memory is limited ([source](https://en.wikipedia.org/wiki/Working_memory#Capacity))  Code path complexity will also challenge the reader, and can be measured using [cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity).

To reduce cognitive overhead of complex code, push implementation logic down into functions and methods. For example, if the if/else structure in the above code is moved into an AdjustSeatTemp() method, the reviewer can review the two blocks independently, each having a much simpler control graph:

while (commode.StillOccupied()) {

  commode.AdjustSeatTemp();

  if (commode.ContainsKale()) {

    commode.PrintHealthCertificate();

    break;

  }

}

![](https://lh7-us.googleusercontent.com/zVM_EP3hjr4ETeIbV-wigEQas0pdY9_XAa0wojjtK6oQHNtBkkhiBOTym_mqWl-WKviIti0IQuKV2QRh884WtVrE27KZmX4vpiGPHp2NbUQuHoW9alYrk5QIuyFhRoIosYFxrjd97HEMOcfJ-rLuUIM)

3 control structures and 5 edges: easier to remember

![](https://lh7-us.googleusercontent.com/BwS3I9uDSeSN8PnKlzjkQLNztOfqXfZJ5m9Jrq2KH2BIZqoKr-QOW3Aa1ER6Al6mBkdK564tS01SvGYjy4l3cAMYGokyLcxskqV2z3YR0gIYWxnLhK79S5OgKtFsKpX85fKy_4SnUlA_kgUV-KgMnQg)

Commode::AdjustSeatTemp()

with 2 structures and 4 edges

Avoiding complexity makes code easier to follow. In addition, code reviewers are more likely to identify logic errors, and maintainers are less likely to introduce complex code.