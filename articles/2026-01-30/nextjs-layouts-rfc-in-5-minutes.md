---
title: "Next.js Layouts RFC in 5 minutes"
source: "https://vercel.com/blog/next-js-layouts-rfc-in-5-minutes"
publishedDate: "2022-09-14"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

2 min read

Sep 14, 2022

The Next.js team at Vercel released the [Layouts RFC](https://nextjs.org/blog/layouts-rfc) a few months ago outlining the vision for the future of routing, layouts, and data fetching in the framework. The RFC is detailed and covers both basic and advanced features.

This post will cover the most important features of the upcoming Next.js changes landing in the next major version that you should be aware of.

## [Link to heading](#creating-routes)Creating Routes

In the new `app` directory, folders are used to define routes. To create a route, add a `page.js` file inside a folder. For example, `app/page.js`:

app/page.js

```
export default function Page() {  return <h1>Hello, Next.js!</h1>}
```

A new Page inside the app directory.

A page (with the `page.js` naming convention) is UI that is unique to a specific route segment. In this instance, the route segment is `/` (or the [root segment](https://nextjs.org/blog/layouts-rfc#route-segments)).

![Each route segment is mapped to a corresponding segment in a URL path.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FTvIi0gcnHOrapoHrT3qjq%2F9039474cdf25f27125cbdbdde35f32f5%2Froute-segments-to-path-segments.png&w=1920&q=75)

Each route segment is mapped to a corresponding segment in a URL path.

You can incrementally adopt the `app` directory from the existing `pages` directory.

## [Link to heading](#creating-layouts)Creating Layouts

You can create nestable layouts that are shared across pages by adding `layout.js` files.

![Creating routes using pages and layouts.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2NTJRiV6ZRoAnAtr4kFcLv%2F3622c319dcb839bb765bea4c63a4319c%2Frecap-2.png&w=1920&q=75)

Creating routes using pages and layouts.

To make your first layout, you will create a new file `app/layout.js`.

app/layout.js

```
export default function RootLayout({ children }) {  return (    <html>      <head>        <title>Next.js Layouts RFC in 5 Minutes</title>      </head>      <body>{children}</body>    </html>  );}
```

Root layout inside the app directory.

`app/page.js` above will render as a child of `app/layout.js`:

```
<html>  <head>    <title>Next.js Layouts RFC in 5 Minutes</title>  </head>  <body>    <h1>Hello, Next.js!</h1>  </body></html>
```

The rendered HTML output from the root layout and page.

## [Link to heading](#sharing-layouts)Sharing Layouts

Layouts can be shared across different pages. Every route in `app/` shares the same root layout, defined at `app/layout.js`. For example, if we created a new route segment `app/blog/page.js`:

app/blog/page.js

```
export default function BlogPage() {  return <h1>Blog Posts</h1>}
```

Blog page inside the app directory.

This page would use the same root layout. `app/blog/page.js` would render as a child of `app/layout.js`.

```
<html>  <head>    <title>Next.js Layouts RFC in 5 Minutes</title>  </head>  <body>    <h1>Blog Posts</h1>  </body></html>
```

The rendered HTML output from the root layout and blog page.

If we wanted a custom layout for this route segment, we would create a new layout at `app/blog/layout.js`. For example, maybe our blog needs a sidebar navigation layout:

app/blog/layout.js

```
export default function BlogLayout({ children }) {  return (    <>      <aside>        <nav>...</nav>      </aside>      {children}    </>  )}
```

Layout specific to the blog route segment.

`app/blog/page.js` would render as a child of `app/layout.js` and `app/blog/layout.js`:

```
<html>  <head>    <title>Next.js Layouts RFC in 5 Minutes</title>  </head>  <body>    <aside>       <nav>...</nav>    </aside>    <h1>Blog Posts</h1>  </body></html>
```

The rendered HTML output from the root layout, blog layout, and blog page.

Similarly, if we created a nested dynamic route `app/blog/[slug]/page.js` for an individual blog post, it would also use the same layouts:

app/blog/\[slug\]/page.js

```
export default function IndividualBlogPost() {  return (    <main>      <h1>Routing with Next.js</h1>      <p>Lorem ipsum dolor sit amet</p>    </main>  )}
```

Page for a specific blog post, using a dynamic route.

```
<html>  <head>    <title>Next.js Layouts RFC in 5 Minutes</title>  </head>  <body>    <aside>       <nav>...</nav>    </aside>    <main>      <h1>Routing with Next.js</h1>      <p>Lorem ipsum dolor sit amet</p>    </main>  </body></html>
```

Layout for the individual blog post page with a dynamic route.

## [Link to heading](#loading-&-error-boundaries)Loading & Error Boundaries

`loading.js` automatically wraps a page or nested segment in a React Suspense Boundary. Next.js will show your loading component immediately on the first load and again when navigating between sibling routes.

You can use this to create _meaningful_ loading UI for specifics part of your UI.

![The Next.js Loading UI creates a React Suspense boundary.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7kboZYFdbD59rXIQggNYpB%2F8742658248b28f6c10eed2970b30c29a%2FUntitled__3_.png&w=1920&q=75)

The Next.js Loading UI creates a React Suspense boundary.

`error.js` automatically wraps a page or nested segment in a [React Error Boundary](https://reactjs.org/docs/error-boundaries.html). Next.js will show your error component whenever an error in a subtree is caught.

![The Next.js Error UI creates a React error boundary.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5OjpIuL0esHP3JF8ucK9to%2F4deb286e1e60f90cb45ba114c07931e2%2FUntitled__4_.png&w=1920&q=75)

The Next.js Error UI creates a React error boundary.

Use this to isolate errors to specific parts of an app, show specific error information, and attempt to recover.

## [Link to heading](#route-groups)Route Groups

Route groups can be used to:

-   Organize routes without affecting the URL path
    
-   Opt a segment out of a layout
    
-   Create multiple root layouts for sections of an app with a completely different UI
    

![You can exclude routes from layouts using route groups.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5IgJ3rLjUb2Le9IPXlEKjJ%2F6f9830e2244bd94225187ad6d53bf057%2FUntitled__2_.png&w=1920&q=75)

You can exclude routes from layouts using route groups.

## [Link to heading](#summary)Summary

An example `app` directory using some of the above concepts would look as follows:

[Read the full Layouts RFC](https://nextjs.org/blog/layouts-rfc) and stay tuned for more information from the Next.js team at Vercel.