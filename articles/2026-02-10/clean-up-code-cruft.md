---
title: "Clean Up Code Cruft"
source: "http://testing.googleblog.com/2023/11/clean-up-code-cruft.html"
publishedDate: "2023-11-28"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1zAkHB8jMa75kpvAVAAi--tJTwXOOc6Md8CvwKHn6SsM/edit) to display in your office._

By Per Jacobsson

The book [Clean Code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/) discusses a camping rule that is good to keep in the back of your mind when writing code:

  

Leave the campground cleaner than you found it

So how does that fit into software development? The thinking is this: When you make changes to code that can potentially be improved, try to make it just a little bit better.

This doesn't necessarily mean you have to go out of your way to do huge refactorings. Changing something small can go a long way:

-   Rename a variable to something more descriptive. 
    
-   Break apart a huge function into a few logical pieces.
    
-   Fix a lint warning.
    
-   Bring an outdated comment up to date.
    
-   Extract duplicated lines to a function.
    
-   Write a unit test for an untested function.
    
-   Whatever other itch you feel like scratching.
    

Cleaning up the small things often makes it easier to see and fix the bigger issues.

But what about "If it's not broken, don't fix it"? Changing code can be risky, right? There's no obvious rule, but if you're always afraid to change your code, you have bigger problems. Cruft in code that is actively being changed is like credit card debt. Either you pay it off, or you eventually go bankrupt.  

Unit tests help mitigate the risk of changing code. When you're doing cleanup work, be sure there are unit tests for the things you're about to change. This may mean writing a few new ones yourself.

If you’re working on a change and end up doing some minor cleanup, you can often include these cleanups in the same change. Be careful to not distract your code reviewer by adding too many unrelated cleanups. An option that works well is to send the cleanup fixes in multiple tiny changes that are small enough to just take a few seconds to review. 

As mentioned in the book: "Can you imagine working on a project where the code simply got better as time passed?"

“Clean Code: A Handbook of Agile Software Craftsmanship” by Robert C. Martin was published in 2008.