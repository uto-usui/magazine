---
title: "The Secret to Great Code Reviews: Respect Reviewers' Comments"
source: "http://testing.googleblog.com/2023/10/the-secret-to-great-code-reviews.html"
publishedDate: "2023-10-04"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1S8PoWYwLXXAka_lXtuQ0AgfP_Z7LbHyEyid7Pr4igjc/edit) to display in your office._

By Marius Latinis

You prepared a code change and asked for a review. A reviewer left a comment you disagree with. Are you going to reply that you will not address the comment? 

When addressing comments for your code reviewed by colleagues, find a solution that makes both you and the reviewer happy. The fact that a reviewer left a comment suggests you may be able to improve the code further. Here are two effective ways to respond:

-   When it’s easy for you to make an improvement, update the code. Improved code benefits future readers and maintainers. You will also avoid a potentially long and emotional debate with a reviewer.
    

-   If the comment is unclear, ask the reviewer to explain. To facilitate the process, talk directly with the reviewer through chat, or in person.
    

Let’s demonstrate with an example code review scenario:

1.  You prepare a code change that modifies the following function:
    
    3 // Return the post with the most upvotes.
    
    3 // Return the post with the most upvotes.
    
    4 // Restrict to English if englishOnly = true.
    
    4 Post findMostUpvotedPost(
    
    5 Post findMostUpvotedPost(
    
    5     List<Post> posts) {
    
    6     List<Post> posts,
    
    7     boolean englishOnly) {
    
    6   ... 
    
    8   ... // Old and new logic mixed together.
    
    7 }
    
    9 }
    

2.  The code reviewer leaves the following comment:
    
    alertreviewer
    
    11:51 AM
    
    The new function signature is too complex. Can we keep the signature unchanged?
    
    Reply
    

You disagree with the comment that one additional parameter makes the signature too complex. Nevertheless, do not reject the suggestion outright.

There is another issue that might have prompted the comment: it is not the responsibility of this function to check the post’s language ([https://en.wikipedia.org/wiki/Single-responsibility\_principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)).

3.  You rewrite your code to address the reviewer’s comment:
    
    ImmutableList<Post> englishPosts = selectEnglishPosts(posts);  // Your new logic.
    
    Post mostUpvotedEnglishPost = findMostUpvotedPost(englishPosts);  // No change needed.
    

Now the code is improved, and both you and the reviewer are happy.