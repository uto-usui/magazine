---
title: "Clever Code Considered Harmful"
source: "https://www.joshwcomeau.com/career/clever-code-considered-harmful/"
publishedDate: "2019-11-14"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

There is something undeniably satisfying about coming up with clever solutions to hard problems. There is a joy when you challenge yourself to use recursion instead of iteration, for example, or when you create elegant, cascading layers of abstraction that ensure code is never duplicated.

My favourite outlet for this kind of programming is [Project Euler(opens in new tab)](https://projecteuler.net/).

Project Euler is a repository of challenges based around advanced mathematics, meant to be solved with software. The catch is that your program should run in under a minute, on 2004-era hardware. That means that a brute-force solution often won’t cut it, and you’ll have to come up with a smarter solution.

Here’s an example:

![A math problem, to calculate numbers arranged in a spiral problem. Screenshot of this page: https://projecteuler.net/problem=58](https://www.joshwcomeau.com/images/legacy/1__sbbO5gKvxk__TuJOIRMUzKA.png)

Helpful tip: Euler is pronounced “Oiler”. Impress your math friends with this knowledge!

Once you’ve solved a problem, you’re able to view solutions that other people have shared. And oh wow, do people come up with terse, clever solutions for these things.

Here's one by a user named WillNess written in Haskell, a functional programming language:

```
pe58 = n
  where
  a p q = scanl (+) p $ iterate (+ 8) q
  b = [[x,y,z] | (x,(y,z)) <- zip (a 3 10) $ zip (a 5 12) (a 7 14)]
  c = zip (scanl1 (+) . map (length . filter isPrime) $ b) (iterate (+ 4) 5)
  [(n,_)] = take 1 $ dropWhile (\(_,(a,b)) -> 10*a > b) $ zip [3,5..] c
```

Here's another one, written in [J lang(opens in new tab)](https://en.wikipedia.org/wiki/J_%28programming_language%29) by user u56:

```
gt;:-:>:1 i.~0.1>}.(>:i.$n)%~+/\n=. isprime +/\1,4#2*>:i.14000
```

Clearly, it takes a tremendous amount of skill to solve such a hard problem with such a small amount of code. I would feel very pleased with myself if I was able to write a solution like this; my solutions are always way longer and less elegant.

This is not "production-ready" code, though. This is recreational code. This is code that you write to feel clever, to impress fellow math nerds, to exercise your brain. When you solve a Project Euler problem, you never have to look at that code again. It's disposable. We aren't handing it off to someone else to maintain it.

This is a different universe from the environments we write code in day-to-day.

## [Link to this heading](#the-intern-test-1)The intern test

When it comes to day-to-day production code, here's the barometer I like to use: will a junior developer, someone at the very start of their career, struggle to understand this code?

In the context of a shared codebase, good code is simple code. Code that doesn’t do anything fancy. Code that makes minimal use of abstractions. Code that you’d use to explain fundamental concepts to novices.

A few years ago, I was asked to review a pull request that included the following function:

```
const extractDataFromResponse = (response) => {
  const [Component, props] = response;

  const resultsEntries = Object.entries({ Component, props });
  const assignIfValueTruthy = (o, [k, v]) => (v
    ? { ...o, [k]: v }
    : o
  );

  return resultsEntries.reduce(assignIfValueTruthy, {});
}
```

I suggested we re-write it like this:

```
const extractDataFromResponse = (response) => {
  const [Component, props] = response;

  const output = {};

  if (Component) {
    output.Component = Component;
  }

  if (props) {
    output.props = props;
  }

  return output;
}
```

The original version has lots of things going for it, on paper:

-   Less code (only 4 statements instead of 7)
    
-   No duplication (the second version uses two `if` statements that do essentially the same thing)
    
-   Doesn't mutate any variables
    
-   More scalable: could easily be rewritten to handle 10 fields instead of 2.
    

And yet, the original version is _way_ harder to understand. I had to burn a ton of calories trying to work out what it was doing. I suspect many junior developers would be completely stumped trying to decipher it.

In my opinion, the readability cost of the functional version is too high. It's not worth it.

## [Link to this heading](#why-is-readability-so-important-2)Why is readability so important?

To understand why I think readability is such a crucial attribute of good code, let’s look at a popular open-source library, [lodash(opens in new tab)](https://github.com/lodash/lodash).

![Screenshot of the “lodash” Github page](https://www.joshwcomeau.com/images/legacy/1__cDMSqwCi1aSPRxXdG5PUzg.png)

lodash is an immensely popular tool. It’s downloaded more than 26,000,000 times a week on NPM alone, and has over 42,000 Github stars. There is something absolutely curious about it, though; it consistently has less than 10 open issues.

"Inbox zero" is a thing with email, but it _never_ happens with issues on popular projects. And yet, lodash often sits at zero open issues. It's been like this for years.

Well, one reason is that the library’s primary author, John-David Dalton, is a passionate maintainer who spends a lot of his time triaging issues as they come in. But I don’t believe anyone, no matter how superhuman, can get a library this popular to 0 issues alone.

Years ago, I heard JDD on [a podcast(opens in new tab)](https://podcasts.apple.com/us/podcast/012-jsair-lodash-open-source-with-john-david-dalton/id1066446588?i=1000364088851) talk about how the key to managing a project like this is to encourage lots of folks to contribute to it. One of the ways he’s done this is by keeping the code at a pretty fundamental level; by using simple, basic constructs, it ensures that aspiring contributors can understand and contribute to the code, regardless of how much experience they have. I believe JDD mentions that they prefer if/else to ternaries simply because less people have experience with ternaries. When the goal is to keep the code simple, the expressive power of the ternary operator is detrimental.

This is important to keep in mind if you’re building an open-source tool, but it’s _even more important_ if you’re working in a production codebase with other humans. Especially ones that have less experience than you.

## [Link to this heading](#bugs-and-code-length-3)Bugs and code length

Have you ever heard someone say this?

> Less code means less space for bugs to hide

This argument makes the case that short code is better, because it'll be easier to spot bugs. With every additional character you type, you're increasing the likelihood of a mistake.

This is true when it comes to _typos_, sure. But typos tend to be easy to catch and fix. The _really_ troublesome bugs — the ones that tend to break user experiences for _weeks_ as developers pass the support ticket around like a hot potato — are often caused by too much _complexity_, not too many characters.

In order to debug an issue, you have to wrap your mind around what the code is doing. When you create an abstraction to reduce duplication (“Make it DRY”), you add a layer of indirection that your mind has to unpack. The harder it is for your mental model to account for every edge-case and possible state, the more likely it is that you’ll have trouble diagnosing what’s gone wrong.

> “Everyone knows that debugging is twice as hard as writing a program in the first place. So if you’re as clever as you can be when you write it, how will you ever debug it?”

## [Link to this heading](#the-cost-of-abstractions-4)The cost of abstractions

If the goal is to reduce complexity, and abstractions add complexity, should we abolish abstractions altogether?

Well, no. Abstractions are everywhere. Loops are abstractions. Functions are abstractions. Programming languages themselves are abstractions over machine code, which itself is an abstraction over transistors flickering off and on really fast. It’s abstractions all the way down.

The key is to weigh the cost of an abstraction against its benefit. Say we’re building a React app, and we have a list of 100 things to render. We could copy/paste the same JSX 100 times, or we could map over an array and write the JSX once. The “complex” solution in this case is totally worth it, because the underlying complexity is commonly known, and the alternative would be burdensome to maintain.

As we build stuff, we make trade-off decisions like this all the time. If I have a point, it’s that we should consider these tradeoffs with our most junior teammates in mind; how much complexity are we adding for them? Is it worth it?

## [Link to this heading](#inevitable-complexity-5)Inevitable complexity

Code sometimes has to be complex, because the real world is complex and our software has to model it! We won’t always be able to write code that a junior engineer can easily parse and contribute to. Sometimes the business logic is genuinely really tricky, sometimes we have to use an API with an inscrutable interface, and so on.

I think the best way to deal with this is to try and sequester complexity. Set up clear boundaries between the simple stuff and the complex stuff. Don’t let the complexity seep into the surrounding areas.

John-David Dalton did this with lodash. According to his interview in [that same podcast(opens in new tab)](https://podcasts.apple.com/us/podcast/012-jsair-lodash-open-source-with-john-david-dalton/id1066446588?i=1000364088851), the vast majority of lodash code is simple and easy-to-follow, and they’ve pushed the complex bits to a sophisticated core that handles the hard problems. This means that most contributors are spared from having to deal with that complexity, since it isn’t sprinkled across the application.

If your app is architected so that the most complex concerns are all dealt with in the same place, you can keep the overwhelming majority of your app’s surface area simple.

What if the junior engineer needs to work on that complex core? Well, good news! They have a more-senior person (you) to help guide them through it. Mentorship and education is a huge part of being a senior developer.

## [Link to this heading](#impostor-syndrome-6)Impostor syndrome

One of my favourite talks from React Rally last year was [Chantastic’s “Hot Garbage; Clean Code is Dead”(opens in new tab)](https://www.youtube.com/watch?v=-NP_upexPFg). I won’t spoil the talk (seriously, go watch it!), but one of the takeaways I took from it is that everyone suffers from impostor syndrome, and as a result, we're always trying to prove to each other that we know our stuff. If we write a function that is super clever and indecipherable, our co-workers will know that we're smart, that we belong here!

What I've come to realize, though, is that anyone can write code that seems complicated. The hard thing is solving complex problems with simple code. If you can develop that skill, nobody will ever doubt your abilities. ✨

### Last updated on

January 16th, 2023