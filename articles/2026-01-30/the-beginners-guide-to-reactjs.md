---
title: "The Beginner's Guide to ReactJS"
source: "https://kentcdodds.com/blog/the-beginners-guide-to-reactjs"
publishedDate: "2017-12-01"
category: "frontend"
feedName: "Kent C. Dodds"
---

Yesterday my two new ReactJS courses were published on [egghead.io](http://egghead.io/?af=5236ad). [Read more about them here](https://kentcdodds.com/blog/learn-react-fundamentals-and-advanced-patterns). I had high hopes for this release, but the response has been way more positive than I had expected. The announcement post got in [Medium's top 20 posts yesterday](https://medium.com/browse/top/december-04-2017) and my courses have had over 250 hours watched already! If you haven't seen them yet, give them a look! If you have, I hope you loved them!

![I just wanted to say, Thanks, partner](https://res.cloudinary.com/kentcdodds-com/image/upload/f_auto,q_auto,w_1600/v1625033415/kentcdodds.com/content/blog/the-beginners-guide-to-reactjs/0.gif)

Two weeks ago, my newsletter was an overview of the [Advanced React Component Patterns course](https://egghead.io/courses/advanced-react-component-patterns?af=5236ad) ([that's been published today](https://kentcdodds.com/blog/advanced-react-component-patterns)!) This week I'd like to talk a little bit about the other course that was published: [The Beginner's Guide to ReactJS](https://egghead.io/courses/the-beginner-s-guide-to-reactjs?af=5236ad).

In the beginner's course every lesson is an individual `index.html` file. No more than that. The reason is I wanted to keep things as simple and isolated as possible. There's absolutely no tooling necessary. Nothing to get in the way of your learning.

In addition, the course starts out with a totally blank slate. The first lesson builds out the `index.html` from scratch. But the first thing I do isn't include React at all. Instead I build a "Hello World" by using `document.createElement`. I slowly introduce React APIs as we go through the course.

When I really started to "get" React is when I realized that everything is "just JavaScript." Just objects and functions. So I try to get people to that point as soon as possible. Right from the beginning I `console.log` what you get back from `React.createElement` to show that React elements aren't magic. They're just JavaScript objects.

To take things even further. When I show JSX (seriously, when teaching React to beginners, please don't _start_ with JSX), I make it really clear that JSX is a fairly straightforward abstraction on top of `React.createElement`. I spend a fair amount of time showing tips and tricks of how to use the JSX syntax and how that converts to regular JavaScript. I even have a lesson about conditionally rendering an element to drive it in further. All of this is to stress the fact that React APIs are simple and just JavaScript. When you get this, it changes the way you think about JSX and React components.

There's a lot more to the course than these ultra-basics. But I think that nailing these are foundational to a good solid understanding of React. If you ever teach a total beginner React, make sure that you help them get a solid understanding that creating React elements is not magic and that JSX is a really simple abstraction on top of `React.createElement`. Once they get that, then learning the rest will come much more easily. Then they too can feel like they can do magic!

![magic](https://res.cloudinary.com/kentcdodds-com/image/upload/f_auto,q_auto,w_1600/v1625033413/kentcdodds.com/content/blog/the-beginners-guide-to-reactjs/1.gif)

I hope that's helpful (and that [the free course](https://egghead.io/courses/the-beginner-s-guide-to-reactjs?af=5236ad) will be helpful to you as well). Good luck!