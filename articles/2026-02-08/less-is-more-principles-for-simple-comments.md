---
title: "Less Is More: Principles for Simple Comments"
source: "http://testing.googleblog.com/2024/08/less-is-more-principles-for-simple.html"
publishedDate: "2024-08-21"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
---

> **Note:** Full content could not be retrieved. [Read the original article](http://testing.googleblog.com/2024/08/less-is-more-principles-for-simple.html)

@media only screen and (max-width: 600px) { .body { overflow-x: auto; } .post-content table, .post-content td { width: auto !important; white-space: nowrap; } }

_This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1mxkwnBoPNqhj4qW4Y23Kq-HfRl6T_wEg-eEVbG0raHk/edit) to display in your office._

By David Bendory

  

Simplicity is the ultimate sophistication. — Leonardo da Vinci

You’re staring at a wall of code resembling a Gordian knot of Klingon. What’s making it worse? A sea of code comments so long that you’d need a bathroom break just to read them all! Let’s fix that.

-   Adopt the mindset of someone unfamiliar with the project to ensure simplicity. One approach is to separate the process of writing your comments from reviewing them; proofreading your comments without code context in mind helps ensure they are clear and concise for future readers.
    

-   Use self-contained comments to clearly convey intent without relying on the surrounding code for context. If you need to read the code to understand the comment, you’ve got it backwards!
    

Not self-contained; requires reading the code

Suggested alternative

// Respond to flashing lights in // rearview mirror.

// Pull over for police and/or yield to

// emergency vehicles.

while flashing\_lights\_in\_rearview\_mirror() {

  if !move\_to\_slower\_lane() { stop\_on\_shoulder(); }

}

-   Include only essential information in the comments and leverage external references to reduce cognitive load on the reader. For comments suggesting improvements, links to relevant bugs or docs keep comments concise while providing a path for follow-up. Note that linked docs may be inaccessible, so use judgment in deciding how much context to include directly in the comments.
    

Too much potential improvement in the comment

Suggested alternative

// The local bus offers good average- // case performance. Consider using // the subway which may be faster

// depending on factors like time of // day, weather, etc.

// TODO: Consider various factors to // present the best transit option.

// See [issuetracker.fake/bus-vs-subway](https://www.google.com/search?q=bus+vs+subway)

commute\_by\_local\_bus();

-   Avoid extensive implementation details in function-level comments. When implementations change, such details often result in outdated comments. Instead, describe the public API contract, focusing on what the function does.
    

Too much implementation detail

Suggested alternative

// For high-traffic intersections // prone to accidents, pass through // the intersection and make 3 right // turns, which is equivalent to // turning left.

// Perform a safe left turn at a

// high-traffic intersection.

// See discussion in

// [dangerous-left-turns.fake/about](https://web.archive.org/web/20240804111208/https://www.popularmechanics.com/science/a36620755/eliminate-left-turns/).

fn safe\_turn\_left() {

  go\_straight();

  for i in 0..3 {

    turn\_right();

  }

}