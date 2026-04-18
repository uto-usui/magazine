---
title: "Advancing Python typing"
source: "https://vercel.com/blog/advancing-python-typing"
publishedDate: "2026-03-02"
category: "frontend"
feedName: "Vercel"
author: "Yury Selivanov"
---

2 min read

Mar 2, 2026

We’re excited to share a year-long research effort aimed at making Python’s type system more expressive and composable, something closer in spirit to the programmable types in TypeScript, but carefully crafted for Python’s runtime model. The result is [PEP 827: Type Manipulation](https://peps.python.org/pep-0827/).

Python’s runtime is incredibly powerful: classes, methods, and even whole APIs can be generated on the fly from a few lines of code. Concepts like metaprogramming can transform class declarations, decorators can give functions and methods additional behaviors, and those are just a few examples.

But Python's static typing often can’t “follow along” without typechecker plugins or boilerplate code. PEP 827 proposes a set of standard, type-level building blocks for introspecting existing types and constructing new ones, designed to help both type checkers and runtime tooling.

FastAPI creator [Sebastián Ramírez](https://x.com/tiangolo) summed up the potential impact well [on our post in the Python Discourse](https://discuss.python.org/t/pep-827-type-manipulation/106353/2):

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5fkuLNW9smn1ULW29z8fKb%2F8b2687f758bb4794e8cec6f6d5b17889%2FCleanShot_2026-03-03_at_15.49.33_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4hcSUZImyxqyfxAWdNkcHQ%2F0e25131cae509c1f716291f8b3481d67%2FCleanShot_2026-03-03_at_15.49.47_2x.png&w=1920&q=75)

## [Link to heading](#quick-taste)Quick taste

One concrete example is the familiar TypeScript utility types, like `Pick` and `Omit`. Here's `Pick` implemented in TypeScript and Python side by side:

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4TyAKOFUZ4tptHDEwpsjMA/fe96edd6bfc2f67d941f2e35bc846815/pick-sidebyside.svg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6ncplacJlUx2y9vVr1dH1Q/81e29d84e5a1e1e674048e8350efc56b/pick-sidebyside-dark.svg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/o4Fkzn3AKjXvQZZSjUk4s/fbccd82cc1d3292e2cba6c6988162867/pick-stacked.svg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4vHW3iUE2GBJAMkmzRBgby/ee7aa8ef3a6cdc7bcc76015dd0d9e4da/pick-stacked-dark.svg)

We can immediately see that the TypeScript dedicated typing syntax is short and to the point, albeit quite different from the rest of the language. Python, on the other hand, relies on the standard Python imperative syntax combined with type-level APIs.

Now let's look at how `Omit` can be implemented:

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1zT49h5wxIcs3eHxYHsYa2/4a7c978a3a20eb4bcaa19a298d79aac9/omit-sidebyside.svg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3uCg6ljPUNhSmcnDL0QgZQ/33bf9af80c6ea902ee9a076d74f7710c/omit-sidebyside-dark.svg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/47QKYhokrjv7VEi8DOkIfL/4aa8390a4fb6d3183e6e8b147e7cfbef/omit-stacked.svg)![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3hnsm8jLvC7YRWjq1d48B4/1f4746a8903985fd238eb4c3573bd24c/omit-stacked-dark.svg)

Interestingly enough, Python's version is more in line with the `Pick` implementation, the only difference is inverting the condition. TypeScript, on the other hand, composes quite differently, and requires a deeper rewrite.

This illustrates that the big idea isn't "make Python look like TypeScript." It’s to give Python typing a programmable core that matches Python’s semantics and stays introspectable at runtime, so frameworks like Pydantic can benefit too.

## [Link to heading](#what's-next)What's next

PEPs are debated, revised, and sometimes rejected. We’re excited to be part of that process, and we invested in this research because we build across TypeScript and Python and want both ecosystems to thrive.

One might ask: in an age where agents are writing an increasing share of source code, should we even care about programming language syntax, tooling, or type system capabilities?

We argue the answer is, more than ever, "yes". We want type checkers to be more thorough and frameworks to be more expressive, so that we can safely ship more reviewable, succinct code. The less boilerplate we have to maintain, the better, and we don’t see that changing anytime soon.

So yes, agents will care. And so will we.