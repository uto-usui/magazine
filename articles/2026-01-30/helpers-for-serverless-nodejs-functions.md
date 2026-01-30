---
title: "Helpers for Serverless Node.js Functions"
source: "https://vercel.com/blog/vercel-node-helpers"
publishedDate: "2019-06-19"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

3 min read

Jun 19, 2019

Migrating to serverless Node.js functions or creating new ones can mean that some of the tools and frameworks you used previously are not suitable anymore.

With today's feature release, we want to solve this problem by providing you with a set of default **helpers exposed within your Node.js function**.

## [Link to heading](#what's-new)What's New

The recent update to serverless Node.js functions on Vercel introduces six default methods to the `request` and `response` payload:

-   `request.query`
    
-   `request.cookies`
    
-   `request.body`
    
-   `response.status()`
    
-   `response.json()`
    
-   `response.send()`
    

In order to access any of these methods, **no changes are required on your side.**

### [Link to heading](#performance)Performance

With the introduction of helpers, your application receives a **gain in performance** when compared to a basic [Express.js](https://expressjs.com/) application:

**NOTE:** The benchmarks above are used to showcase the performance difference between serverless Node.js functions on Vercel and the [Express.js](https://expressjs.com/) framework.

While the relative improvement will stay the same, the actual time taken will vary depending on your system configuration.

## [Link to heading](#how-to-use-helpers)How to Use Helpers

These are the properties and methods that are available on the `request` and `response` arguments that your serverless function receives:

### [Link to heading](#request.query)`request.query`

**Before this update**, the easiest way to parse the GET parameters of an incoming GET request was to retrieve the `request.url` property and then pass the value to a parser.

With `request.query`, however, you have direct access to all the GET parameters, without having to parse them on your own:

```
module.exports = (request, response) => {  console.log(request.query);};
```

For example, if your endpoint's URL is `/endpoint?key=value`, the content of `request.query` would look like this:

```
{ "key": "value" }
```

### [Link to heading](#request.cookies)`request.cookies`

In order to access the cookies supplied by an incoming request, you **previously** had to retrieve the `Set-Cookie` [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) from the request and then parse it manually.

With `request.cookies`, you only need to invoke a property:

```
module.exports = (request, response) => {  console.log(request.cookies);};
```

Doing so will give you all the cookies in a single object:

```
{  "cookie1": "i am a cookie",  "cookie2": "i am yet another cookie"}
```

### [Link to heading](#request.body)`request.body`

As the most versatile property out of all mentioned above, `request.body` allows you to easily access the body of incoming requests, **no matter what format**:

```
module.exports = (request, response) => {  console.log(request.body);};
```

Naturally, the body for incoming requests to serverless functions can be either:

-   A string of text (`text/plain`)
    
-   A buffer (`application/octet-stream`)
    
-   A json object (`application/json`)
    
-   A form data query string (`application/x-www-form-urlencoded`)
    

No matter which of those formats you are using for your body, accessing `request.body` will automatically parse it and return it.

For example, this is what the body would look like for a JSON request:

```
{  "firstKey": "example value",  "secondKey": "another example value"}
```

### [Link to heading](#response.status\(\))`response.status()`

This method for outgoing responses can be invoked before `response.send()` and `response.json()` in order to define a [status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) for the response.

If you were to return an access error, for example, you could do it like this:

```
module.exports = (request, response) => {  response.status(403);  response.json({ error: 'You do not have access' });};
```

### [Link to heading](#response.json\(\))`response.json()`

As you can see in the example above, the `response.json()` method can be invoked with a JSON object as the first (and only) argument. It will then stringify the JSON it receives and send it back to the client:

```
module.exports = (request, response) => {  response.json({ property: 'value' });};
```

When invoked, the method will automatically set the `Content-Type` header of the outgoing response to `application/json`, in order for the client to understand that JSON was sent.

### [Link to heading](#response.send\(\))`response.send()`

This method – just like `response.json()` – allows you to define the body of the outgoing response. However, it is used for sending **plain text** or **buffers:**

```
module.exports = (request, response) => {  const example = Buffer.from('Welcome!');  response.send(example);};
```

## [Link to heading](#conclusion)Conclusion

Assuming you are using the latest version of Vercel, there is no action to be taken: Edit one of your serverless Node.js functions and start using the helpers.

In the future, **the list of helpers will grow**. So [stay tuned](https://twitter.com/vercel)!

We also recommend checking out:

Should you encounter any problems with the current helpers, please [let us know](https://vercel.com/feedback) or join the [Vercel Community](https://community.vercel.com/) to find answers to your questions.