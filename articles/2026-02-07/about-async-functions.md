---
title: "About async functions"
source: "https://tkdodo.eu/blog/about-async-functions"
publishedDate: "2021-07-23"
category: "frontend"
feedName: "TkDodo"
---

![async](https://tkdodo.eu/blog/static/bfc273b3e8e4b70ebd2f4c4cc43b42dd/bbe0c/async.jpg "async")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

**Last Update: 2024-06-10**

[Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) are great, especially if you have to call multiple functions in a row that return promises. With async / await, code becomes easier to reason about for humans, because the data flow mimics synchronous code, which is what we are used to reading.

So what are async functions exactly?

## Syntactic sugar[](#syntactic-sugar)

When I first learned about async functions, the following sentence stuck with me:

> Async / await is "just" syntactic sugar for promise chaining

— Someone, somewhen

This is mostly true, and if that's your mental model about async functions, it will get you quite far. To re-iterate, let's take an example and refactor it from promise chaining to an async function:

promise-chaining

```
1function fetchTodos() {2  return fetch('/todos')3    .then(response => response.json())4    .then(json => json.data)5}
```

So far, so good. Nothing too difficult here, just our normal data fetching and extracting (error handling left out intentionally here). Still, even with this example, the callbacks are not so easy to read, so how would this look with an async function?

async-function

```
1async function fetchTodos() {2  const response = await fetch('/todos')3  const json = await response.json()4  return json.data5}
```

Ah, I believe that reads a lot better, because you can actually see where we are assigning variables to and what will be the final return value of that function.

So, if that is a good mental model for async functions, what's the problem with the above definition? Well, it's just not everything. There are a couple of subtle difference between promise chaining and async functions that I learned the hard way. Let's go through them:

## They always return a promise[](#they-always-return-a-promise)

This is actually _the_ defining trait of an async function. No matter what you do, it will always return a promise, even if you don't explicitly return one:

promisify

```
1async function fetchRandom() {2  // ✅ this will return `Promise<number>`3  return Math.random()4}
```

This is necessary because you can use the _await_ keyword in async functions, and once you do that, you enter promise-land, in which there is no escaping from. If code is async, you can't turn it back to sync code. I was personally quite confused by this, because in scala, [Await.result](https://docs.scala-lang.org/overviews/core/futures.html#blocking-outside-the-future) actually takes a promise, blocks the execution for a certain amount of time and then lets you continue synchronously with the resolved value.

In JavaScript however, an async function will stay asynchronous, so the return value _must_ be a promise, and the language construct makes sure of this out of the box. This brings us to the next point:

## It transforms thrown Errors into rejected promises[](#it-transforms-thrown-errors-into-rejected-promises)

You might have seen this in example code involving [the fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), as fetch will not automatically give you a failed promise on erroneous status codes like other libraries, e.g. [axios](https://axios-http.com/), do. To get to a failed promise, you just throw an Error (or anything, really), which will then be transformed into a failed promise. This is happening because, again, an async function always needs to return a promise:

throw

```
1async function fetchTodos() {2  const response = await fetch('/todos')3  if (!response.ok) {4    // ✅ this will become a failed promise5    throw new Error('Network response was not ok')6  }7  return response.json()8}
```

Now the same works if you are in a promise chain, but not if you are _outside_ of it. Suppose you want to do some parameter validation and decide to throw an Error if the input is invalid in a non-async function:

parameter-validation

```
1function fetchTodo(id: number | undefined) {2  if (!id) {3    // 🚨 this will NOT give you a failed promise4    throw new Error("expected id")5  }6  return fetch('/todos')7    .then(response => response.json())8    .then(json => json.data)9}
```

If you make the same function _async_, it would give you a failed promise. These little nuances can be quite confusing, so I prefer to explicitly work with _Promise.reject_ no matter which context I'm in:

parameter-explicit-promise-rejection

```
1function fetchTodo(id: number | undefined) {2  if (!id) {3    // ✅ this will work as expected, no matter where4    return Promise.reject(new Error("expected id"))5  }6  return fetch('/todos')7    .then(response => response.json())8    .then(json => json.data)9}
```

## They always return a _new_ promise[](#they-always-return-a-new-promise)

I first stumbled upon this when working with [query cancellation in react-query](https://react-query.tanstack.com/guides/query-cancellation). Here, react-query wants us to attach a `.cancel` method on our resulting promise. Surprisingly, this doesn't quite work in async functions:

query-cancellation

```
1async function fetchTodos() {2  const controller = new AbortController()3  const signal = controller.signal4
5  const promise = fetch('/todos', {6    signal,7  })8
9  promise.cancel = () => controller.abort()10  // 🚨 This will be a new promise without the cancel method!11  return promise12}
```

Because we are in an async function, a _new_ promise will be returned at the end of it, even if we already return a promise ourselves! [Here](https://www.carlrippon.com/cancelling-requests-with-react-query/) is a great article if you want to see how query cancellation can work even with async functions.

## Handling errors[](#handling-errors)

The default way of handling errors in async functions is with try / catch, which I don't like very much, mainly because the scope of try / catches seems to get very large. If additional, synchronous code happens _after_ the async operation that might fail, we are likely still treating it as if the fetch failed:

error-handling

```
1const fetchTodos = async (): Promise<Todos | undefined> => {2  try {3    const response = await axios.get('/todos')4    // 🚨 if transform fails, we will catch it and show a toast :(5    return transform(response.data)6  } catch (error) {7    showToast("Fetch failed: " + error.message)8    return undefined9  }10}
```

Sometimes, we even silently catch and discard the error, which will make debugging very hard.

So if you also think that async / await is cool, but try / catch is not, you can try combining async functions with "traditional" catch methods:

await-and-catch

```
1const fetchTodos = async (): Promise<Todos | undefined> => {2  const response = await axios.get('/todos').catch(error => {3    // 🚀 showing the toast is scoped to catching the response error4    showToast("Fetch failed: " + error.message)5    return undefined6  })7  return transform(response?.data)8}
```

## In summary[](#in-summary)

I hope this gives you a bit of a deeper understanding of what async / await is doing under the hood. I have seen lots of code where the _async_ keyword is just stuck on a function for no good reason, so lastly, here are some examples of patterns that I think should be avoided:

weird-combos

```
1// 🚨 the async keyword doesn't do anything -2// except creating a new unnecessary promise3const fetchTodos = async () => axios.get('/todos')4
5const fetchTodos = async () => {6  const response = await axios.get('/todos')7  // ⚠️ awaiting a non-promise is possible, but doesn't do anything8  return await response.data9}10
11// 🙈 async/await mixed with .then12const fetchTodos = async () =>13  await axios.get('/todos').then(response => response.data)14
15const fetchTodos = async () => {16  try {17    return await axios.get('/todos')18  } catch (error) {19    // 🚨 the catch-and-re-throw is totally unnecessary20    throw error21  }22}
```

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)