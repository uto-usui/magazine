---
title: "Exhaustive matching in TypeScript"
source: "https://tkdodo.eu/blog/exhaustive-matching-in-type-script"
publishedDate: "2020-08-09"
category: "frontend"
feedName: "TkDodo"
---

![exhaustive matching](https://tkdodo.eu/blog/static/9ea491fae20f706a71d53383ac797515/bbe0c/exhaustive-matching.jpg "exhaustive matching")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

**Last Update: 2022-04-23**

It is already well known in the frontend development community that adopting TypeScript is a good idea for (almost) every project that reaches a certain size. Advantages cited usually evolve around safety, clearly documented interfaces, finding errors before they go to production and being able to refactor safely.

While I totally agree that these are great points in favor of TypeScript, I think there is one advantage that is criminally underrated:

## The ability to safely add code[](#the-ability-to-safely-add-code)

Even though I firmly believe that deleting code is much more fun (and productive) than writing code, what we do most of the time, is adding code.

Adding new features. Adding enhancements to existing features. Making a feature a bit more customizable. After all, it is mostly what customers want. So how come we never talk about how great TypeScript is, if used correctly, for _adding_ things.

Yes, moving and renaming things and having the compiler tell you where you forgot something is great, but IDEs are catching up and are pretty good at these things for JavaScript files already. But no Editor will tell you that you forgot to handle a new branch in your switch statement when you add a new feature.

This is where exhaustive matching comes into play.

## What is exhaustive matching?[](#what-is-exhaustive-matching)

Some languages, like `OCaml`, `F#` or `scala` support the concept of _pattern matching_. It's a little bit like javascript's switch statement on steroids, as it allows matching a value not only against other values, but also against patterns.

Exhaustive matching basically means that the compiler, given that he knows all the possible states, can tell you when you are missing one state in your match. I will use `scala` code for the examples since it's the language I am most familiar with.

basic-pattern-matching-in-scala

```
1sealed trait Shape2
3final case class Circle(radius: Int) extends Shape4final case class Rectangle(width: Int, height: Int) extends Shape5
6def renderShape(shape: Shape): String = {7  shape match {8    case _:Rectangle => "I am a Rectangle!"9  }10}
```

[Try me in scastie](https://scastie.scala-lang.org/8asQjmtsSTuK2FKgmEX65w)

Here, the compiler would complain with the following message:

> match may not be exhaustive. It would fail on the following input: Circle

Great, so as a JavaScript developer, being aware of the [default-case](https://eslint.org/docs/rules/default-case) eslint rule, I'll just add a default case here and call it a day:

default-case

```
1def renderShape(shape: Shape): String = {2  shape match {3    case _:Rectangle => "I am a Rectangle!"4    case _ => "I'm a Circle"5  }6}
```

[Try me in scastie](https://scastie.scala-lang.org/eBVdb1hIR46nLDqwuzPeeg)

The program works, and all the cases in the match are being taken care of, so no one complains. But what happens if we add another shape?

a-new-shape

```
1final case class Square(length: Int) extends Shape2
3def renderShape(shape: Shape): String = {4  shape match {5    case _:Rectangle => "I am a Rectangle!"6    case _ => "I'm a Circle"7  }8}
```

[Try me in scastie](https://scastie.scala-lang.org/gPHbnUrpTgyK0arINPP2cg)

Right. The program will still work, but it will _not_ work correctly. If we pass a Square to the renderShape method, it will identify as a _Circle_, which is certainly not what we would expect.

Sure, as long as the code is [co-located](https://kentcdodds.com/blog/colocation), this might be a non-issue. You will see that you have to adapt the code right below.

But obviously, in a fairly large code base, you will have go to through all the usages, and it's easy to forget one. Being able to utilize _compiler driven development_ (think: Fix everything that's red and then it is guaranteed to work) is of great help.

So here is how the fixed scala code would look:

exhaustive-match

```
1def renderShape(shape: Shape): String = {2  shape match {3    case _:Rectangle => "I am a Rectangle!"4    case _:Circle => "I'm a Circle"5    case _:Square => "I'm a Square"6  }7}
```

[Try me in scastie](https://scastie.scala-lang.org/KinShmJ1R3GyxyBR5POWSQ)

Notice how we just got rid of the default case completely. If we add a _Triangle_ now, it will show us an error again.

## How can we do this in TypeScript?[](#how-can-we-do-this-in-typescript)

This is great and all, but TypeScript doesn't support pattern matching, so how are we supposed to do this in TS?

It turns out that the TypeScript compiler is actually pretty smart when it comes to matching exhaustively on union types. This is best done with tagged unions, which just means a union where each member define a discriminator of a literal type:

tagged-union

```
1type Circle = {2  kind: 'circle'3  radius: number4}5
6type Rectangle = {7  kind: 'rectangle'8  width: number9  height: number10}11
12type Shape = Circle | Rectangle13
14const renderShape = (shape: Shape): string => {15  switch (shape.kind) {16    case 'circle':17      return 'I am a circle'18  }19}
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAwglgJwMYBtoF4oG8BQV9QDWcAdgCYBcUA5EoqhNXgQgIZlwCuAzlSZwFsARhAQ4AvjlCQoAJQhJgrEgHM0UTLgJFSlGggVLVaJtoDucMsAAWfQSLHbrEOCuvA7w0RKnhoAZWtWGUx4ZHUAHzlDZTUIHBwkAHsSbmAoA3JRQOCMKAAKbiDIKhzIAEoqNIRSFQ0APmxmfG4LYCRrAqLcgDpicnKm7W0kVm5oWnoTCmbh7QNgTgQSGgBJKFYBDag6cMZZyXEgA)

In this example, the _kind_ field serves as the discriminator: Every shape is uniquely identified by it.

With the above code, you should now see the following error:

> Function lacks ending return statement and return type does not include 'undefined'.(2366)

Note that even if you remove the explicit return type, and if you have [noImplicitReturns](https://www.typescriptlang.org/tsconfig#noImplicitReturns) turned on in your `tsconfig.json`, you will _still_ get the error:

> Not all code paths return a value.(7030)

So the compiler _really_ wants to tell us that we forgot something here, which is great.

Again, we should _not_ fall into the trap of adding a default case here. I would even disable the aforementioned eslint rule for TypeScript files, because I don't think it adds a lot that the compiler won't catch for us anyways.

The compiler will also narrow the type for us in the case block, so we _will_ have access to `shape.radius` inside the `case 'circle'`, but not outside of it.

A small caveat seems to be that you cannot use object destructuring on the shape param. Even though all members of the union type contain a shape, TypeScript won't accept this:

❌-no-destructuring-😢

```
1const renderShape = ({ kind, ...shape }: Shape): string => {2  switch (kind) {3    case 'circle':4      return `I am a circle with ${shape.radius}`5  }6}
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAwglgJwMYBtoF4oG8BQV9QDWcAdgCYBcUA5EoqhNXgQgIZlwCuAzlSZwFsARhAQ4AvjlCQoAJQhJgrEgHM0UTLgJFSlGggVLVaJtoDucMsAAWfQSLHbrEOCuvA7w0RKnhoAZWtWGUx4ZHUAHzlDZTUIHBwkAHsSbmAoA3JRQOCMKAAKLB1yABooADpK7iCZcSocyABKKjSEUhUNAD5sZnxuC2AkawLickae7W0kVm5oWnoTCl7J7QNgTgQSKAADAEkoVgEDqDpw6AHhgBIsatzytg4ecW3lyXEgA)

It is especially important to keep this in mind when working with React components, as their props tend to be destructured a lot.

So with all this in mind, our code would look like this:

exhaustive-matching-in-ts

```
1const renderShape = (shape: Shape): string => {2  switch (shape.kind) {3    case 'circle':4      return 'I am a circle'5    case 'rectangle':6      return 'I am a rectangle'7  }8}
```

[Typescript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAwglgJwMYBtoF4oG8BQV9QDWcAdgCYBcUA5EoqhNXgQgIZlwCuAzlSZwFsARhAQ4AvjlCQoAJQhJgrEgHM0UTLgJFSlGggVLVaJtoDucMsAAWfQSLHbrEOCuvA7w0RKnhoAZWtWGUx4ZHUAHzlDZTUIHBwkAHsSbmAoA3JRQOCMKAAKbiDIKhzIAEoqNIRSFQ0APmxmfG4LYCRrAqLcgDpicnKm7W0kVm5oWnoTCmbh7QNgTgQSGgBJKFYBDag6cMZZkbGJg0VY6YO5jIhF5bWNrdYr0+N97UlxIA)

Typescript is happy with this, and we will get a compile time error when we add a new Shape. 🎉

## Runtime caveats[](#runtime-caveats)

Types don't exist at runtime - all the safety that we have only exists at compile time. This is no problem as long as we, with our 100% typescript codebase, are the only callers of that function. In the real world, this is sometimes not the case. We might have some untyped JavaScript code that calls our function, or we are not in control at all where our input comes from.

Let's assume for example that we call a rest service that delivers a couple of Shapes that we want to render, and we have established with the backend team that we will focus on Circle and Rectangle first and will add Square later. We will use `React` to render our little app:

react-shapes

```
1export const App = () => {2  const [shapes, setShapes] = React.useState()3
4  React.useEffect(() => {5    getShapes().then(setShapes)6  }, [])7
8  if (!shapes) {9    return <Loading />10  }11
12  return (13    <Grid>14      {shapes.map((shape) => (15        <Shape {...shape} />16      ))}17    </Grid>18  )19}20
21const Shape = (props: Shape): JSX.Element => {22  switch (props.kind) {23    case 'circle':24      return <Circle radius={props.radius} />25    case 'rectangle':26      return <Rectangle width={props.width} height={props.height} />27  }28}
```

Great, this is future-proof, typescript will tell us what to do as soon as we add _another_ Shape.

Here, you can see the whole App in action:

## Undefined strikes back[](#undefined-strikes-back)

But then, something else happens: The backend team is _faster_ than expected 😮. Their sprint is running great, so they decide to implement the Square right away. It's a quick win on their part, and they ship a new minor version of the API.

Guess what happens to our little App?

It will die a horrible runtime death. A minor backend release makes our whole App crash because of this fancy typescript pattern 😢. This happens because now, we fall through our switch statement, and because we have no default branch, `undefined` is returned. `Undefined` is one of the few things that `React` _cannot_ render, so we die with the famous error:

> Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.

​Update: Since [React 18.0](https://reactjs.org/blog/2022/03/29/react-v18.html), React [can render undefined](https://github.com/facebook/react/pull/21869). It behaves the same as rendering `null` now, so this fallthrough is not such a big problem anymore.

See it live:

## Never to the rescue[](#never-to-the-rescue)

In TypeScripts type system, never is its [bottom type](https://en.wikipedia.org/wiki/Bottom_type). It denotes something that can never happen, for example, a function that always throws an Exception or has an infinite loop will return never.

How is this helpful?

If typescript narrows the type with each case in the switch statement, if all cases are covered, what remains must be of type _never_. We can assert that with a little helper:

never

```
1const UnknownShape = ({ shape }: { shape: never }) => (2  <div>Unknown Shape</div>3)4
5const Shape = (props: Shape): JSX.Element => {6  switch (props.kind) {7    case 'circle':8      return <Circle radius={props.radius} />9    case 'rectangle':10      return <Rectangle width={props.width} height={props.height} />11    default:12      return <UnknownShape shape={props} />13  }14}
```

This approach has two advantages:

-   It will _not_ fail at runtime - it will still display all other shapes and display a little not-found helper for the newly added shape
-   If we add Square to our Shape type, because we finally catch-up with the backend team and want to implement it as well, we will _still_ get a compile error from TypeScript. You can see that [here](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQFA0wCeYWcAQmlgMoAWyzcAXjgBvGnDjAAJgC44AOwCuIAEZYoAbhoBfTY34BhYFFwAbFkPaouvfgDIRYuAGtgcmXABEuI6awfN4lDIksAKqLKKKmqaOvRMLNj4yHIA5maCbBw8fCz2ouIubrIelEmpZv6OAO5SMNwRSqoajtxYwCncMA1RzbF6LJwAjgrIlBmW1jlweY4Fru4eqMOjfgA0s3BmqXWyAOzacfzZ-EKGxukAPphYZWksV0MjlJo0uBByqPBnvhkAFMJwIIhMJwLSyADyIGAMAAPN8zKtPIVJB44FcPFIPAA+ACUgixcF+jhhIQAbliAJJkUjIODec4sGp1QHBULoYRAtlaGEAejJWJoOJebw+8ESMGSdz+AJqkjqiNa7U6oIhUNh4slCKR81R6MxuPxhOJ-I2VJpgJuEvKjOh3DgsuZwgd3C0KDccEVHXgwk9nS0xL5wHJguF70+cAAqnInHIIFU5MdzISAagbCwwSI4KmchEsKS1KC8QICSSg1iozG43I4IneSbXmH4Im-mBiGBwjW0zjZAApTgADQAdABRMwgLByeDFhzicSoJm4O2-VsQduD5F4-Kz7e4Djkem+MjSDbb7eUGAKKDVuE+dKcsICYQrtf31CunkC0+z3dWcilK13EeJ5fhaF5XnAMIata9q1Nwj7Pqgg7Oq6vowPBbaIah76fiBkhYAQyAKCYXTAV+56XteFaxvGzbZsw6Grm+cAfhs-paEAA). This is because now, the type is not narrowed to never (since Square is still left), so the type of props for UnknownShape does not match.

## Conclusion[](#conclusion)

Exhaustive matches are a great tool in any language to make your code safer for additions. When you have full control over the input, omitting the default branch seems like a good choice. If that is not the case, and because TypeScript is in the end just JavaScript, protection at runtime with a never guard is a good alternative.

* * *

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)