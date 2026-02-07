---
title: "Let Code Speak for Itself"
source: "http://testing.googleblog.com/2023/12/let-code-speak-for-itself.html"
publishedDate: "2023-12-13"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
---

> **Note:** Full content could not be retrieved. [Read the original article](http://testing.googleblog.com/2023/12/let-code-speak-for-itself.html)

@media only screen and (max-width: 600px) { .body { overflow-x: auto; } td{ white-space: nowrap; } }

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1ohtX8DsDeDolm7OgpmEB-JTITImULJZO4eSvwy_7Yo8/edit) to display in your office._

by Shiva Garg and Francois Aube

  

Comments can be invaluable for understanding and maintaining a code base.  But excessive comments in code can become unhelpful clutter full of extraneous and/or outdated detail.

Comments that offer useless (or worse, obsolete) information hurt readability. Here are some tips to let your code speak for itself: 

-   Write comments to explain the “why” behind a certain approach in code. The comment below has two good reasons to exist: documenting non-obvious behavior and answering a question that a reader is likely to have (i.e. why doesn’t this code render directly on the screen?):

// Eliminate flickering by rendering the next frame off-screen and swapping into the

// visible buffer.

RenderOffScreen();

SwapBuffers();

-   Use well-named identifiers to guide the reader and reduce the need for comments:

// Payout should not happen if the user is

// in an ineligible country.

std::unordered\_set<std::string> ineligible =

  {"Atlantis", "Utopia"};

if (!ineligible.contains(country)) {

  Payout(user.user\_id);

}

if (IsCountryEligibleForPayout(country)) { Payout(user.user\_id); }

-   Write function comments (a.k.a. API documentation) that describe intended meaning and purpose, not implementation details. Choose unambiguous function signatures that callers can use  without reading any documentation. Don’t explain inner details that could change without affecting the contract with the caller:

// Reads an input string containing either a

// number of milliseconds since epoch or an

// ISO 8601 date and time. Invokes the

// Sole, Laces, and ToeCap APIs, then

// returns an object representing the Shoe

// available then or nullptr if none were.

Shoe\* ModelAvailableAt(char\* time);

// Returns the Shoe that was available for

// purchase at \`time\`. If no model was

// available, throws a runtime\_error.

Shoe ModelAvailableAt(time\_t time);

-   Omit comments that state the obvious. Superfluous comments increase code maintenance when code gets refactored and don’t add value, only overhead to keep these comments current:

// Increment counter by 1.

counter++;

Learn more about writing good comments: [To Comment or Not to Comment?](https://testing.googleblog.com/2017/07/code-health-to-comment-or-not-to-comment.html), [Best practices for writing code comments](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments)