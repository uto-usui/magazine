---
title: "React Router 6.4 Release"
source: "https://remix.run/blog/react-router-v6%2E4"
publishedDate: "2022-09-13"
category: "frontend"
feedName: "Remix Blog"
---

After several months of development, the data APIs from Remix have arrived for React Router in v6.4.

## Feature Overview

The web is a wonderful place where [highly dynamic shopping experiences](https://www.tesla.com/model3/design), [creative productivity software](https://figma.com/), and [super basic but excellent classified ads](https://craigslist.com/) are all possible on the same platform.

While these websites are all wildly different, they all have one thing in common: **data coupled to URLs**. It's not just about data loading either. They all have data mutations, too! React Router 6.4 embraces this reality with new conventions, APIs, and automatic behaviors for:

-   Loading data into components
-   Updating data in components
-   Automatic data revalidation after updates
-   Managing race conditions and interruptions for navigations, mutations, and revalidation
-   Managing errors and rendering something useful to the user
-   Pending UI
-   Skeleton UI with `<React.Suspense>`
-   and more...

## Why Couple Routing and Data?

Most people realize that `<Link>` renders `<a href>` underneath, preventing the default browser behavior (sending a document request to the server) and instead changes the URL with JavaScript. It's kinda like this:

```
function Link({ to }) {
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        doReactRouterStuff();
      }}
    />
  );
}
```

You've definitely written that kind of code yourself, except with a `<form>`

```
function NewContactForm({ to }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        doYourThing();
      }}
    />
  );
}
```

Have you ever wondered...

> What default event am I preventing here?

Just like `<a href>`, `<form action>` also creates a request and sends it to the server when the user submits it. The only difference is a form can send along some data and usually means you want to update your database.

In other words, **data mutations with HTML forms are routing events.**

It's hard to explain just how much simpler and more capable your code becomes when your router understands the full data lifecycle with data loading (`<a href>`) and mutations (`<form action>`). You kind of have to experience it yourself, so take it for a spin today:

-   [Feature Overview](https://reactrouter.com/en/main/start/overview)
-   [Tutorial](https://reactrouter.com/en/main/start/tutorial)

Happy routing!