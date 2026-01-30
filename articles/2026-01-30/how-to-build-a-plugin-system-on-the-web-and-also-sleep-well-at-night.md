---
title: "How to build a plugin system on the web and also sleep well at night"
source: "https://www.figma.com/blog/how-we-built-the-figma-plugin-system/"
publishedDate: "2019-08-22"
category: "design"
feedName: "Figma Blog"
---

_Since we published this blog post, we decided to change our sandbox implementation to an alternative approach: compiling a JavaScript VM written in C to WebAssembly. As you'll see in the blog post below, it was one of several ideas we originally weighed._

_We decided to implement this alternative after a security vulnerability in the Realms shim (which our original approach uses) was privately disclosed to us. The security vulnerability was promptly fixed by the Realms shim team before the vulnerability was made public and we have no evidence it was ever exploited. Read more about the vulnerability and our approach to fixing it [here](https://www.figma.com/blog/an-update-on-plugin-security/)_

_._

At Figma, we recently tackled one of our biggest engineering challenges yet: supporting plugins. Our plugins API enables third-party developers to run code directly inside our browser-based design tool, so teams can adapt Figma to their own workflows. They can enable accessibility checkers to measure contrast, [translation apps](https://www.figma.com/c/plugin/733062974250826253/Translate/) to convert language, design tools like [color wheels](https://www.figma.com/color-wheel/) to enhance color selection, [importers](https://www.figma.com/c/plugin/738454987945972471/Unsplash/) to populate designs with content, and anything else their heart desires.

We knew we needed to design this plugin functionality carefully. Throughout the history of software, there have been many instances where third-party extensions negatively affected a platform. In some cases, they slowed the tool to a crawl. In other cases, the plugins broke whenever new versions of the platform were released. To the extent that we could control it, we wanted users to have a better plugin experience with Figma.

Furthermore, we wanted to make sure plugins would be safe for users to run, so we knew we wouldn’t want to simply `eval(PLUGIN_CODE)`. That is the quintessential definition of insecure! Yet, eval is essentially what running a plugin boils down to.

To add to the challenge, Figma is built on a very unconventional stack with constraints that previous tools haven’t had. Our design editor is powered by [WebGL](https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/)

and

[WebAssembly

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABAElEQVQoz62SO4qEQBRF/Yu/FkRENFEDwQ+Cse7A3MwtmJoZm7gBA2MDcSeGruc2VclM97QTdXCpqncfp3i3imEYBr/FsuyL3v33vg/ez+HxeKAoCtR1jaqqkGUZdF3/A1IUBaZpUo/n+XtgHMcYxxHHcWDfdwzDgDAMwXEcBEGgMLLato0gCOD7PoXfAsuyxLquuK4L53linmckSQJJkqCqKoWRved5SNOUXkbqt8A8zzFNE7Ztw7Is6PseURRBFEXIskzHI0DXdWndcRzq3QJJY9M06LoObdvSLC3LenkAAjUMg2ZI4P8+ChmJNBMIkaZpn0KnmRLd/AAGX9Z3gU/gHtjWtex8CQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/ccdc497d27cc1c9abb7c7cb07e7c1a57d4c711be-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### WebAssembly cut Figma's load time by 3x

WebAssembly was just released this past March but has already generated a lot of excitement in the web community.



](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/)

, with some of the user interface implemented in Typescript & React. Multiple people can be

[editing a file at the same time

### Multiplayer Editing in Figma

Today’s public release of Figma contains two long-awaited changes.



](https://www.figma.com/blog/multiplayer-editing-in-figma/)

. We are powered by browser technologies, but also limited by them.

This blog post will walk you through our pursuit for the perfect plugin solution. Ultimately, our efforts boiled down to one question: How do you run plugins with security, stability, and performance? Here’s a brief overview of our many non-trivial constraints:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAABeUlEQVQ4y4WUWY+CQBCEIVEJD4Aitwd4IGA0/v9f15uvN01G9mEfSuboqequntHzfV/W67UEQSCbzUbHS6xWq39jAHsewWmaStM0UhSF7Pd7nfMFu91OkiSRLMvkcDhIVVVfMXxBFEW/hPzUdS1938v1epW2beV8PitOp5MK5Xkux+NRHo+H3G63ec+AEKQzIaoQgvv9rocghgQxCDnEHrhcLioOGCNAtn8Ih2FQMCbQzRBCMpymScZxVBCLAOJY8lUywW4gWUIKkRGy/nq95Pl8apxrAYQ0zaM7TFhECZgvCNEo/IGU9a7rNIZ9sieGCmneTMiERTZBWZYqYl3cbrf6ZZ04uw0u4jjWqzN7iBeURBmYbRmwBzlClIe/VGPZWQKIKiFpUsr7/ZbP56PAJ4gRoURIicE74sxj6zK3Yb42YRiqGkHWQeu0GU6JkHKYNUSWdxXbNEMImZg/LsxLXgpYvg4D53kpvDr10ED5S7hv141dAjL+F34AVLBIDGGm/SoAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/0dadc8e3f372dd3f2708519e6f79e942a355a6ab-2296x1498.png?rect=1,0,2294,1498&w=804&h=525&q=75&fit=max&auto=format)

We considered dozens of different approaches branching into all sorts of different paths. We had weeks of discussing, prototyping and brainstorming. This blog post will focus on just three of those attempts that formed the most central path in our exploration.

For me, it has been the most satisfying exercise in first principles thinking. I had fun leveraging all the computer science fundamentals I learned in the classroom (the ones I never thought I’d ever use in the real world). If that idea excites you too, [we’re hiring](https://www.figma.com/careers/)!

## [Attempt #1: The <iframe> sandbox approach](#attempt-1-the-iframe-sandbox-approach)

During our first few weeks of research, we found many interesting attempts at third-party code sandboxing. Some used techniques such as code-to-code transformation. However, most had not been validated in a production application and as such, carried some risk.

In the end, for our first attempt, we went for the closest thing to a standard sandboxing solution: the `<iframe>` tag. It’s used in applications that need to run third-party code, such as CodePen.

The `<iframe>` is not your everyday HTML tag. To understand why `<iframe>`s are secure, it’s necessary to think about what properties they need to guarantee. An `<iframe>` is typically used to embed one website into another website. For example, in the screenshot below, you can see that yelp.com is embedding google.com/maps to provide map functionality.

Here, you wouldn’t want Yelp to be able to read what’s inside a Google website just by virtue of embedding it. There could be private user information in there. Similarly, you wouldn’t want Google to be able to read what’s inside a Yelp website just by virtue of having been embedded.

This means communication to and from the `<iframe>` is heavily restricted by browsers. When an `<iframe>` has a different origin than its container (e.g. yelp.com v.s. google.com), they are completely isolated. Then, the only way to communicate with the `<iframe>` is via message-passing. These messages are, for all intents and purposes, plain strings. Upon receipt, each website is free to take action on those message, or ignore them.

They’re so isolated, in fact, that the HTML spec allow browsers to implement `<iframe>`s as separate processes, [if they chose to](https://www.chromium.org/developers/design-documents/oop-iframes).

Now that we know how `<iframe>`s work, we can implement plugins by creating a new `<iframe>` every time a plugin runs, and sticking the plugin’s code inside the `<iframe>`. The plugin can do anything it wants inside the `<iframe>`. However, it won’t be able to interact with Figma documents except through explicit, whitelisted messages. The `<iframe>` is also a given a null origin, which means that any attempt to make a request to figma.com will be denied by the browser’s [cross-origin resource sharing policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAIAAACgpqunAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJ0lEQVQoz22T266EIAxF/f+P0/jkoyZeEj3eUVCPA7OnHRg0rkxIbdltKUzw+nK+TvrBovXGaUN+NODIrpQUM9Z9x6KklKtFWhA6LJwi0FrDErPo215JtW3bNE1d17Vt+0ewPY4jQtgJJbJ8xdzMKpVY1UFdofKyLEKImRAEKiNkjGH9RbyTQ5sP6MWd898CG/5nMX+bKwgdHixAomextnB9Pp4v/vRIXNumIW8WfOKcZVnWdc1zZienu4sRw5AwnomA3TRNHMdJkgzDgAuDBysXeKjMXgYVsDXP8zRNcUnOCR7E/qkYfFZVFUURmvfzKnpIP7GbocvNj6woijAMsyxDcT4OXzj2eM/T3ipfLB8BeowAb6vv+9ECsSt7Ed/+Bg6/Kdj+tjeWKS6guDowFAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/fc301e8b64dca86544a67d114c164ccb680770ad-1000x700.png?w=804&h=563&q=75&fit=max&auto=format)

Effectively, the `<iframe>` acts as a sandbox for the plugin. Furthermore, the security properties of the sandbox are guaranteed by browser vendors, who have spent years searching for and fixing any vulnerability in the sandbox.

An actual plugin using this sandbox model would use an API that we add into the sandbox and look roughly like this:

TypeScript

```
const scene = await figma.loadScene() // gets data from the main thread
scene.selection[0].width *= 2
scene.createNode({
  type: 'RECTANGLE',
  x: 10, y: 20,
  ...
})
await figma.updateScene() // flush changes back, to the main thread
```

Plain text

const scene = await figma.loadScene() // gets data from the main thread
scene.selection\[0\].width \*= 2
scene.createNode({
  type: 'RECTANGLE',
  x: 10, y: 20,
  ...
})
await figma.updateScene() // flush changes back, to the main thread

The key thing is that plugins initialize by calling loadScene (which sends a message to Figma to get a copy of the document) and finish by calling updateScene (which sends the changes made by the plugin back to Figma). Note that:

-   We get a copy of the document instead of using message passing for every read and write to a property. Message-passing has overhead on the order of 0.1ms per round-trip, which would only allow for ~1000 messages per second.
-   We don’t make plugins use postMessage directly, since it would be cumbersome to work with.

We went with this approach and built it for about a month. We even invited some alpha testers. However, it soon became clear that there were two major flaws with this approach.

### [Problem #1: async/await is not user friendly](#problem-1-async-await-is-not-user-friendly)

The first feedback we got is that people were having trouble with having to use async/await. In this approach, it is unavoidable. Message-passing is fundamentally an asynchronous operation, and there’s no way in JavaScript to make a synchronous, blocking call to an asynchronous operation. At the very least, you need the `await` keyword which also requires marking all calling functions `async`. All things considered, async/await is still a fairly new JavaScript feature that requires some non-trivial understanding of concurrency. This is a problem, because we expect many of our plugin developers to be designers who may be comfortable with JavaScript, but may not have formal CS education.

Now, if it were only necessary to use `await` once at the beginning of the plugin and once at the end, it wouldn’t be so bad. We would just tell developers to always use `await` with `loadScene` and `updateScene` even if they don’t quite understand what it does.

The problem is that some API calls require a lot of complex logic to run. Changing a single property on a layer sometimes cause multiple layers to update. For example, resizing a frame can recursively apply constraints to its children.

These behaviors are often complex and nuanced algorithms. It would be a bad idea to re-implement them again for plugins. That logic is also in our compiled WebAssembly binary, so it’s not easy to reuse. And if we don’t run that logic inside the plugin sandbox, plugins will be reading stale data.

So while this is manageable:

TypeScript

```
await figma.loadScene()
... do stuff ...
await figma.updateScene()
```

This can get unwieldy very quickly, even for experienced engineers:

TypeScript

```
await figma.loadScene()
... do stuff ...
await figma.updateScene()
await figma.loadScene()
... do stuff ...
await figma.updateScene()
await figma.loadScene()
... do stuff ...
await figma.updateScene()
```

### [Problem #2: copying the scene is expensive](#problem-2-copying-the-scene-is-expensive)

The second problem with the `<iframe>` approach is that it requires serializing large parts of the document before sending them to the plugin.

It turns out that people can create very, very large documents in Figma to the point of hitting memory limits. For example, on Microsoft’s design systems file (which we spent a month optimizing last year), it took 14 seconds just to serialize the document and send it to the plugin, _before the plugin could even run_. Given that most plugins are going to involve quick actions like “swap two items in my selection”, this would make plugins unusable.

_Loading the data incrementally or lazily also isn’t really an option, because:_

1.  It would involve months of re-architecting the core product.
2.  Any API that may need to wait on a piece of data that hasn’t arrived yet will now be asynchronous.

In summary, because Figma documents can have really large amount of data with a lot of interdependencies, the `<iframe>` wasn’t going to work for us.

## [Back to the drawing board, and the main thread](#back-to-the-drawing-board-and-the-main-thread)

With the `<iframe>` approach having been ruled out, we had to backtrack in our research.

We went back to the drawing board and spent two long weeks discussing a variety of approaches. As the simple solution didn’t work out, we had to give serious consideration to more exotic ideas. There were many — too many to fill the margins of this blog post.

_But most approaches had one or more major disqualifying flaws:_

-   Have an API that would be too difficult to use (e.g. accessing the document using a REST API or GraphQL like method)
-   Depends on browser features that browser vendors have removed or are trying to (e.g. synchronous xhr + service worker, shared buffers)
-   Requires significant research work or re-architecting of our application that could take months before we can even validate that it can work (e.g. load a copy of Figma in an iframe + sync via CRDTs, hack green threads into JavaScript with generators by cross-compiling)

At the end of the day, we concluded that we had to find a way to create a model where plugins can directly manipulate the document. Writing a plugin should feel like a designer automating their actions. So we knew we’d have to allow plugins to run on the main thread.

### [Implications of running on the main thread](#implications-of-running-on-the-main-thread)

Before we dive into Attempt #2, we need to take a step back and re-examine what it means to allow plugins to run on the main thread. After all, we didn’t consider it at first because we knew that it could be dangerous. Running on the main thread sounds an awful lot like `eval(UNSAFE_CODE)`.

_The benefits of running on the main thread are that plugins can:_

1.  Directly edit the document rather than a copy of it, eliminating loading time issues.
2.  Run our complex component updating and constraints logic without needing to have two copies of that code.
3.  Make synchronous API calls in situations where you’d expect a synchronous API. There would be no confusion with loading or flushing updates.
4.  Be written in a more intuitive way: plugins are just automating actions that the user would otherwise do manually using our UI.

_However, now we have these problems:_

1.  Plugins can hang, and there is no way to interrupt a plugin.
2.  Plugins can make network requests as figma.com.
3.  Plugins can access and modify global state. This includes modifying our UI, creating dependencies on internal application state outside the API, or doing downright malicious things like changing the value of `({}).__proto__` which poisons every new and existing JavaScript object.

We decided that we could drop the requirement for (1). When plugins freeze, it affects the perceived stability of Figma. However, our plugin model works such that they are only ever run on explicit user action. By changing the UI when a plugin runs, freezes would always be attributed to the plugin. It also means that it is not possible for a plugin to “break” a document.

### [What does it mean for eval to be dangerous?](#what-does-it-mean-for-eval-to-be-dangerous)

To deal with the issue of plugins being able to make network requests and access global state, we must first understand exactly what it means that “eval arbitrary JavaScript code is dangerous”.

If a variant of JavaScript, let’s call it SimpleScript, had only the ability to do arithmetic such `7 * 24 * 60 * 60`, it would be quite safe to `eval`.

You can add some features to SimpleScript like variable assignment and if statements to make it more like a programming language, and it would still be very safe. At the end of the day, it still essentially boils down to doing arithmetic. Add function evaluation, and now you have lambda calculus and Turing completeness.

In other words, JavaScript doesn’t _have_ to be dangerous. In its most reductionist form, it’s merely an extended way of doing arithmetics. What _is_ dangerous is when it has access to input & output. This includes network access, DOM access, etc. It’s **Browser APIs** that are dangerous.

And APIs are all global variables. So hide the global variables!

### [Hiding the global variables](#hiding-the-global-variables)

Now, hiding the global variables sounds good in theory, but it’s difficult to create secure implementations by merely “hiding” them. You might consider, for example, removing all properties on the `window` object, or setting them to `null`, but the code could still get access to global values such as `({}).constructor`. It would be very challenging to find all the possible ways in which some global value might leak.

Rather, we need some stronger form of sandboxing where those global values never existed in the first place.

> In other words, JavaScript doesn’t have to be dangerous.

Consider the previous example of a hypothetical SimpleScript that only supports arithmetic. It’s a straightforward CS 101 exercise to write an arithmetic evaluation program. In any reasonable implementation of this program, SimpleScript would simply be unable to do anything other than arithmetic.

Now, expand SimpleScript to support more language features until it becomes JavaScript, and this program is called an **interpreter**, which is how JavaScript, a dynamic interpreted language, is run.

## [Attempt #2: Compile a JavaScript interpreter to WebAssembly](#attempt-2-compile-a-javascript-interpreter-to)

Implementing JavaScript is too much work for a small startup like ours. Instead, to validate this approach, we took [Duktape](https://github.com/svaarala/duktape), a lightweight JavaScript interpreter written in C++ and compiled it to WebAssembly.

To confirm that it works, we ran [test262](https://github.com/tc39/test262/tree/es5-tests) on it, the standard JavaScript test suite. It passes all ES5 tests except for a few unimportant test failures. To run plugin code with Duktape, we would call the `eval` function of _the compiled interpreter_.

_What are the properties of this approach?_

-   This interpreter runs in the main thread, which means we can create a main-thread based API.
-   It’s secure in a way that’s easy to reason about. Duktape does not support any browser APIs — and that’s a feature! Furthermore, it runs as WebAssembly which itself is a sandboxed environment that has no access to browser APIs. In other words, plugin code can communicate with the outside world only through explicit whitelisted APIs by default.
-   It’s slower than regular JavaScript since this interpreter is not a JIT, but that’s ok.
-   It requires the browser to compile a medium-size WASM binary, which has some cost.
-   Browser debugging tools don’t work by default, but we spent a day implementing a console for the interpreter to validate that it’d be at least possible to debug plugins.
-   Duktape only supports ES5, but it’s already common practice in the web community to cross-compile newer JavaScript versions using tools such as [Babel](https://babeljs.io/).

(Aside: a few months later, Fabrice Bellard released [QuickJS](https://bellard.org/quickjs/) which supports ES6 natively.)

Now, compiling a JavaScript interpreter! Depending on your inclinations or aesthetics as a programmer, you might either think:

THIS IS AWESOME! 🤩

or

…really? A JavaScript engine in a browser that _already has a JavaScript engine?_ 🤨. What next, an operating system in a browser?

And some amount of suspicion is healthy! It is best to avoid re-implementing the browser unless we absolutely have to. We already spent a lot of effort [implementing an entire rendering system](https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/)

. It was necessary for performance and cross-browser support and are glad we did it, but we still try to not re-invent the wheel.

**This is not the approach we ended up going with.** There’s an even better approach. However, it was important to cover as a step towards understanding our final sandboxing model which is more complicated.

## [Attempt #3: Realms](#attempt-3-realms)

While we had a promising approach compiling a JS interpreter, there was one more tool to look at. We found a technology called the [Realms shim](https://github.com/tc39/proposal-realms) created by the folks at [Agoric](https://agoric.com/).

This technology describes creating a sandbox and supporting plugins as a potential use case. A promising description! The Realms API looks roughly like this:

TypeScript

```
let g = window; // outer global
let r = new Realm(); // realm object

let f = r.evaluate("(function() { return 17 })");

f() === 17 // true

Reflect.getPrototypeOf(f) === g.Function.prototype // false
Reflect.getPrototypeOf(f) === r.global.Function.prototype // true
```

This technology can actually be implemented using existing, albeit lesser known JavaScript features. One aspect of the sandbox is to hide the globals. The core of how this shim does that looks roughly like this:

TypeScript

```
function simplifiedEval(scopeProxy, userCode) {
  'use strict'
  with (scopeProxy) {
    eval(userCode)
  }
}
```

This is a simplified version for presentation purposes; there are a few more nuances in the real version. However, it showcases key pieces of the puzzle: the `with` statement and the Proxy object.

The `with (obj)` statement creates a scope where variable lookups can be resolved using the properties of `obj`. In this example, we can resolve the variables `PI`, `cos` and `sin` as properties of the `Math` object. On the other hand, `console` is not a property of `Math` and gets resolved from the global scope.

TypeScript

```
with (Math) {
  a = PI * r * r
  x = r * cos(PI)
  y = r * sin(PI)
  console.log(x,  y)
}
```

**Proxy objects** are the most dynamic form of JavaScript objects.

-   The most basic JavaScript object returns a value on a property access `obj.x`.
-   The more advanced JavaScript object can have `getter` properties that returns the result of evaluating a function. The access `obj.x` calls the getter for `x`.
-   Proxies by running a function `get` to evaluate any property accesses.

The proxy below (also simplified for presentation purposes) will return `undefined` when trying to access **any** property on it, other than the ones in the object `whitelist`.

TypeScript

```
const scopeProxy = new Proxy(whitelist, {
  get(target, prop) {
    // here, target === whitelist
    if (prop in target) {
      return target[prop]
    }
    return undefined
  }
}
```

Now, when you give this proxy as the argument of the `with` object, it will capture all variable resolutions and never use the global scope to resolve a variable:

TypeScript

```
with (proxy) {
  document // undefined!
  eval("xhr") // undefined!
}
```

Well, almost. It’s still possible to access certain globals via expressions such as `({}).constructor`. Furthermore, the sandbox does need access to some globals. For example, `Object` is a global, often used in legitimate JavaScript code (e.g. `Object.keys`).

To give plugins access to these globals without messing up the window, the Realms sandbox instantiates a new copy of all these globals by creating a _same-origin_ iframe. This iframe is **not** used as a sandbox the way we did in our first attempt. Same-origin iframes are not subject to CORS restrictions.

Instead, when an `<iframe>` is created in the same origin as the parent document:

1.  It comes with a separate copy of all the globals, e.g. `Object.prototype`
2.  These globals can be accessed from the parent document.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABCUlEQVQ4y42T6Q6DMAyD+/5vyn3foExfJaOs2th+WC0scWxnhPM8zeM4Dtu2zaZpsnEcI+Z5ju/T2k8I67oaWJblRt/3VhSFZVlmeZ5b0zSxhobruh4RUIAarwjCqqoiaV3XNgxDVP2kbN/36CLQDESKPQCJ3qMahZDSmEKuQOi6ztq2jY2y7yPgzgBlKWJBv8NDNAElFNOsaZ/UMpTTD1ItNboHNUkZ5OQGmAgR97IsbyeKgRObGkR/8BNFKCIVYwdSTq9IUcghuLfs8/JNUuKjUY4+c0XwtuWURIO8i2+bFuKWgbYo8Iwq5UvxX1/KL4Up4c8vxVtLM/HwhI8K/Z/0KRs1iPCbwhf6cEI5xZRzJgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/34084215d95f0c385f5a7bf990781474e594d5fe-1000x700.png?w=804&h=563&q=75&fit=max&auto=format)

These globals are put into the Proxy object’s `whitelist`, so that the plugin has access to them. Finally, this new `<iframe>` comes with a new copy of the `eval` function that differs from the existing one in an important way: even built-in values that are only accessible by syntax such as `({}).constructor` will also resolve to a copy from the iframe.

This sandboxing approach using Realms has many nice properties:

-   It runs on the main thread.
-   It is fast, because it still uses the browser’s JavaScript JIT to evaluate the code.
-   Browser developer tools work

But one question remains. Is it secure?

### [Implementing the API using Realms securely](#implementing-the-api-using-realms-securely)

We feel good about the sandboxing capabilities of Realms. Although it involves more subtleties than the JavaScript interpreter approach, it still works as a whitelist rather than a blacklist, which keeps its implementation small and auditable. It is created by respected members of the web community.

However, using Realms isn’t the end of the story, since it’s simply a sandbox in which plugins wouldn’t be able to do anything. We still need to implement APIs that the plugin can use. Those APIs will need to be secure too, as most plugins do need to be able to show some UI and make network requests to be useful (e.g. populate a design with data from Google Sheets).

Consider, for example, that the sandbox does not contain a `console` object by default. After all, `console` is a browser API, not a JavaScript feature. It is possible to pass it as a global to the sandbox.

TypeScript

```
realm.evaluate(USER_CODE, { log: console.log })
```

Or perhaps hide the original value inside a function so that the sandbox can’t modify it:

TypeScript

```
realm.evaluate(USER_CODE, { log: (...args) => { console.log(...args) } })
```

This, unfortunately, is a security hole. Even in the second example, the anonymous function was created outside the realm, but is given directly to the realm. This means that the plugin could reach outside the sandbox by navigating through the `log` function’s prototype chain.

The correct way to implement `console.log` is to wrap it in a function created inside the realm. A simplified example is shown [here](https://github.com/tc39/proposal-realms/issues/189) (in practice, it’s also necessary to convert any exceptions thrown between realms).

TypeScript

```
// Create a factory function in the target realm. 
// The factory return a new function holding a closure.
const safeLogFactory = realm.evaluate(`
        (function safeLogFactory(unsafeLog) { 
                return function safeLog(...args) {
                        unsafeLog(...args);
                }
        })
`);

// Create a safe function
const safeLog = safeLogFactory(console.log);

// Test it, abort if unsafe
const outerIntrinsics = safeLog instanceof Function;
const innerIntrinsics = realm.evaluate(`log instanceof Function`, { log: safeLog });
if (outerIntrinsics || !innerIntrinsics) throw new TypeError(); 

// Use it
realm.evaluate(`log("Hello outside world!")`, { log: safeLog });
```

In general, the sandbox should never have direct access to an object created outside the sandbox as it could get access to global scope. It’s also important that the API is careful about manipulating an object from inside the sandbox, as it risks getting mixed with objects outside the sandbox.

This poses a problem. While it is possible to build a secure API, it is not tenable to have our developers worry about subtle object origin semantics every time they want to add a new function to the API. So how can we fix that?

## [An API for an interpreter](#an-api-for-an-interpreter)

The problem is that building the Figma API directly on top of Realms makes it so that each API endpoint needs to be audited, including its input and output values. The surface area created is too large.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVQ4y6WT2W6EMAxF+f+vnI4q9n0NBHB9PTECFPrQPlwl2PHBsZ1g2zZa15WWZfmXwAArUOA8z6L7QdimaRI9+aEL0ForRqz43vddhEPjOFJd1yLsYVO/L9YLVCiCh2GgsiypqqoLUM95gb4rG2ME1nUdtW0rwh42+H69Mj7wBxzQPyI4z3PKskzW8x5w1BRgyJvhWXAiKE1TiuOYlbg1FhvqiR+qkLV2OtBUFax1ATBhQBSGFEXRR7yHreZ69n1/CLU9gPcMBcjOtiop/X5T8n6xvpxeYmvLghZ3TZXGB5rdJUMGjg1fK4moi0NenWQfic/ahc6xKj8QjTFc9IGvxMENjw0yHtqG5nEQnzbhXn8/0D1FdLDhWhZFKbOIBhjzGS3rzp578JjhMZcYCzw7LrqOyezGZP0L8DxrKn3TT8AfMolEZQcJFBYAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/bc2488a8638435767f257c2d94be9d94a4f5c659-1000x700.png?w=804&h=563&q=75&fit=max&auto=format)

Despite the fact that code inside the Realms sandbox runs using the same JavaScript engine (and gives us convenient tooling benefits), it still helps to pretend that we live under the restrictions of the WebAssembly approach.

Consider the Duktape, the JavaScript interpreter compiled to WebAssembly from Attempt #2. It’s not possible for main thread JavaScript code to directly hold a reference to an object inside the sandbox. After all, inside the sandbox, WebAssembly manages its own heap and all JavaScript objects are just segments in this heap. In fact, Duktape might not even implement JavaScript objects using the same memory representation as the browser engine!

As a result, implementing an API for a Duktape would _only_ be possible via low-level operations such as copying integers and strings in and out of the virtual machine. It would be possible to hold a reference to an object or function inside the interpreter, but only as an opaque handle.

Such an interface would look like this:

TypeScript

```
// vm == virtual machine == interpreter
export interface LowLevelJavascriptVm {
  typeof(handle: VmHandle): string

  getNumber(handle: VmHandle): number
  getString(handle: VmHandle): string

  newNumber(value: number): VmHandle
  newString(value: string): VmHandle
  newObject(prototype?: VmHandle): VmHandle
  newFunction(name: string, value: (this: VmHandle, ...args: VmHandle[]) => VmHandle): VmHandle

  // For accessing properties of objects
  getProp(handle: VmHandle, key: string | VmHandle): VmHandle
  setProp(handle: VmHandle, key: string | VmHandle, value: VmHandle): void
  defineProp(handle: VmHandle, key: string | VmHandle, descriptor: VmPropertyDescriptor): void

  callFunction(func: VmHandle, thisVal: VmHandle, ...args: VmHandle[]): VmCallResult
  evalCode(code: string): VmCallResult
}

export interface VmPropertyDescriptor {
  configurable?: boolean
  enumerable?: boolean
  get?: (this: VmHandle) => VmHandle
  set?: (this: VmHandle, value: VmHandle) => void
}
```

Note that this is the interface the API implementation would use, but it maps more or less 1:1 to Duktape’s interpreter API. After all, Duktape (and similar virtual machines) were built precisely to be embedded and to allow the embedder to communicate with Duktape.

Using this interface, the object `{x: 10, y: 10}` could be passed to the sandbox as such:

TypeScript

```
let vm: LowLevelJavascriptVm = createVm()
let jsVector = { x: 10, y: 10 }
let vmVector = vm.createObject()
vm.setProp(vmVector, "x", vm.newNumber(jsVector.x))
vm.setProp(vmVector, "y", vm.newNumber(jsVector.y))
```

An API for the “opacity” property of a Figma node object looks like this:

TypeScript

```
vm.defineProp(vmNodePrototype, 'opacity', {
  enumerable: true,
  get: function(this: VmHandle) {
    return vm.newNumber(getNode(vm, this).opacity)
  },
  set: function(this: VmHandle, val: VmHandle) {
    getNode(vm, this).opacity = vm.getNumber(val)
    return vm.undefined
  }
})
```

This low-level interface can be implemented equally well with the Realms sandbox. Such an implementation is a relatively small amount of code (~500 LOC in our case). This small amount of code then needs to be audited carefully. However, once that is done, future APIs can be built on top of this interface without worrying about sandbox-related security issues. In literature, this is called the membrane pattern.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaElEQVQ4y5WUi26DMAxF+/9/OKmbNrXdGI8QwvtVNyerK2Cs0pAuGAff+NoOh3meZZom6fte2raVruv+BWKIhQOuA7dxHINzGIZgswiwCWqaJgB7u04Msdi/CPnoer0GcLFW17VkWSbGmECKTy++IwbSVYYqWXdRTOMkrSdxRSHOuSBPAzVuN0MlVNk8q7qS3Foxeb4CPsgVhd+sqqoQtyLUegBqlVoj79FFXj9P8nYHNr4ojUMJFBBryR6EihkZ4yCmcnIysRyjs7xcPgKO3+fgy8pCWr/p0A8PVY8aLmuiGL2PAFs6iZJYTl+XADLDV7e+4323KpOS7mbIs/MNKAsr1nc4T9MAbHxITP17HP9Ip45MA6SHVVfv2Sph7Ypd0HUIkyQR65sEGRNAH/4kREog9R0sfUag8Z3vFqdpWT/FLqEOOrsiRwcbqRAtm7DFU0I9dswZsvT46SAvM3ua4bOfxfZnsM30BgLgQqJ1LHj+AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/b3580df5a8ad508076269b57377a725625e144a1-1000x700.png?w=804&h=563&q=75&fit=max&auto=format)

Essentially, this treats both the JavaScript interpreter and the Realms sandbox as “some separate environment in which JavaScript runs."

There’s one more key aspect of creating a low-level abstraction over the sandbox. While we are confident about the security of Realms, it never hurts to be extra careful when it comes to security. We recognize the possibility that Realms could have an undiscovered vulnerability that will one day turn into an issue we need to deal with. But this is why we had a few paragraphs talking about compiling an interpreter that we don’t even use. Because the API is implemented with an interface whose implementation can be interchanged, using an interpreter remains a valid backup plan that we could use without reimplementing any APIs or breaking any existing plugins.

## [Rich functionality in plugins](#rich-functionality-in-plugins)

We now have a sandbox that can run arbitrary plugins safely, and an API that allows these plugins to manipulate Figma documents. This already opens up a lot of possibilities.

However, the original problem we were trying to solve was to build a plugin system for a design tool. To be useful, most of these plugins will want the ability to create a user interface, and many will want some form of network access. More generally, we would like plugins to be able to leverage as much of the browser and JavaScript ecosystem as possible.

We could expose safe, restricted versions of browser APIs one at a time, carefully, just like in the example of `console.log` above. However, browser APIs (and the DOM in particular) is a huge surface area, larger than even JavaScript itself. Such an attempt would likely either be too restrictive to be useful or it could have a security flaw.

We solve this problem by reintroducing, yet again, the null-origin `<iframe>`. Plugins can create an `<iframe>` (which we show inside the Figma editor as a modal) and put any arbitrary HTML and Javascript in it.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC50lEQVQ4y1VTWUtbYRC9/0khgjUPNZonQdCfIA2IoqRSFUEJGBoLkogoVKq22FYTDS5ZmmY1ahIVK4IvRjFxX57EBRWXOZ355AYNnNzvwv3OnDlnRltYWEAqlUI6nVZYXFxU+BtJwDU4gcZPX2BzODHnDxS+SSQSGBsbg8PhEJCc4/E4JZNJ0vhPESjSTOblUibN72kEQ3G4vT7M+oJYWkpheWUFmeVlhCMROJ1OfLBYYLFYSM5+v5+CwSBpuroMk+lYW1vD1tYWdnO7yOfz2N/fx/7BAfJ7e8jlcqqwzWZDpdkMs9lMHR0dcHs8ND4+TlqEq0WjUYhSvaWNjQ2cnJzg+voad3d3uL+/fwMp1tnZCUNJCQwGA1k/WuH1eikQCJDW3d0Nu92O0dFR8YFbW8K/9XWcn5/j9vZWQSd9fHwEESnVcs9oNKLMaKTW1lb4fD6an58nrba2FjU1Nejq6gJ7gCSHtLq6itPTU9zc3ODy8lJBzkL89PSEo6MjDA0Noa6uTkC9vb0IhUIvoVRXV6OqqgriA0tWra+w+a8Jr66u3hAeHx+rjhoaGgTU398Pto44XNKam5vR1NSEvr4+hMNhRfhaoe7jw8NDoeU9DqenpweVlZWoqKhQoXhmZuiHf440j8cDgajTZ1BS1gnFQ51IID9JWiwqLi5GUVERiajB3z+pceQrabFYDAI9ZRmjdQ7l7OysEIioe35+LhCKQhlqU3k54z21t7dj1OMm+8QvHptolJhQGcpkxCkTK6TDw0O6uLgogFsnLkCcNjEhjQwPk/gnELt8PNizf3iwZUxer568y3Bvbm4im80qbG9vY2dnRyHLZ9mYgYEB1NfXK7hcLsywh5OTk6T5eRj9gSBFWaUoZNI3T0lOVHMR4r0n2dnp6Wlqa2sjk8lE3La0TFNTU+R2u0mz2T+T4NvId4rxx3JZLooFnDpJ5TkeWiESa2TePHzRarVS2bt3VFpaSi0tLWpLRMB/J6Vt/nlYCeoAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/78c70ac651eeca4776af923c21e58fff99de0206-1000x700.png?w=804&h=563&q=75&fit=max&auto=format)

The difference with our original attempt at using `<iframe>`s is that now, the plugin is made of two components:

-   The part that can access the Figma document and runs on the main thread, inside a Realms sandbox.
-   The part that can access browser APIs and runs inside an `<iframe>`.

These two parts of can communicate with each other via message passing. This architecture makes using browser APIs a little more tedious than if we could run both parts in the same environment. However, it is the best we are able to do given current browser technologies, and it has not prevented developers from creating amazing plugins in the two months since we opened the beta.

## [Our takeaways](#our-takeaways)

We may have taken a winding journey to get here, but ultimately we were excited to find a viable solution for implementing plugins in Figma. The Realm shim allowed us to isolate third-party code while still letting it run in a familiar browser-like environment.

While this is the best solution for us, it may not be the right approach for every company or platform. If you need to isolate third-party code, it’s worth evaluating if you have the same performance and API ergonomic concerns as we did. If not, isolating code via iframes may be sufficient, and simple is always good. We would have liked to stay simple!

Ultimately we cared deeply about the final user experience—both that users of plugins would find them stable and reliable, _and_ that developers with basic Javascript knowledge would be able to build them. Fulfilling those accessibility and quality values made all the time we spent trying to get this right worth it.

One of the most exciting things about working on the engineering team for a browser-based design tool is that we encounter a lot of uncharted territory, and we get to create new ways of handling technical challenges like this. If these kind of engineering adventures sound like fun to you, check out the [rest of our blog](https://www.figma.com/blog/section/engineering/) for more. Or join us, [we’re hiring](https://www.figma.com/careers/)!