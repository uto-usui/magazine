---
title: "Using SvelteKit 1.0 on Vercel"
source: "https://vercel.com/blog/using-sveltekit-1-0-on-vercel"
publishedDate: "2022-12-14"
category: "frontend"
feedName: "Vercel"
author: "Steph Dietz"
---

8 min read

Dec 14, 2022

As of today, December 14th, 2022, SvelteKit 1.0 has officially launched.

[SvelteKit](https://kit.svelte.dev/) is a new framework for building web applications that is gaining popularity among developers for its simplicity and performance. Built on top of Svelte (like Next.js for React), SvelteKit simplifies creating and deploying web applications. Server-side rendering, routing, code-splitting, and adapters for different serverless platforms are just a few of its out-of-the-box features.

[Deploying SvelteKit 1.0 today](https://vercel.com/templates/svelte/sveltekit-boilerplate) or continue reading to learn about the improvements to the framework in the past year and the benefits of deploying SvelteKit projects on Vercel.

## [Link to heading](#what-is-sveltekit)What is SvelteKit?

SvelteKit is built around the Svelte framework, a modern JavaScript compiler that allows developers to write efficient and lightweight code. Instead of using runtime frameworks to stack user interfaces on top of the DOM, Svelte compiles components at build time down to a native JavaScript bundle. This results in fast web apps with small bundle sizes.

SvelteKit solves many common issues faced by web developers by providing an intuitive experience that takes care of tedious configuration and boilerplate code. Additionally, instead of retrieving the entire application on initial load, SvelteKit makes it easy to split your code into reusable chunks that can be quickly loaded on demand, allowing for snappy user and developer experiences alike.

SvelteKit extends Svelte by adding:

-   Server-side rendering (SSR), which can improve the performance and SEO of your application
    
-   Easy generation of static sites, which can be useful for blogs, marketing sites, and other types of content-heavy websites
    
-   TypeScript support
    
-   Hot Module Replacement, allowing you to update your application in real-time without losing state or refreshing the page
    

## [Link to heading](#sveltekit-features)SvelteKit Features

SvelteKit is great for building applications of all sizes, with a fluid developer experience to match. It doesn't compromise on SEO, progressive enhancement, or the initial load experience, but unlike traditional server-rendered apps, navigation is instantaneous. SvelteKit comes with an abundance of out-of-the-box features, making it the recommended way to build Svelte applications. Let’s take a look:

-   **Directory-based Router:**
    
    SvelteKit includes a directory-based router that updates the page contents after intercepting navigations. This means that the folder structure of the `/src/routes` folder is going to be the route structure of our application. So for example, `/src/routes/+page.svelte` creates the root route, and `/src/routes/about/+page.svelte` creates a an `/about` route. To learn more about routing in SvelteKit, checkout Vercel’s [Beginner SvelteKit](https://vercel.com/docs/beginner-sveltekit/routing) course.
    
-   **Layouts:**
    
    If you need an element displayed on multiple pages of an application, such as a header or a footer, you can use layouts. To create layouts in SvelteKit, add a file called `+layout.svelte` in the `/routes` folder. You can add whatever markup, styles, and behavior you want to this file, and it will be applied to all pages in the app. You can even make nested and grouped layouts to target only specific routes.
    
-   **The** **`load`** **function:**
    
    SvelteKit has a unique way of loading page data using the `load` function. All `+page.svelte` files can have a sibling `+page.js` file that exports a `load` function. The returned value of this is available to the page via the `data` prop. The load function runs on both the client and server, but you can add the extension `+page.server.js` to make it run on the server only.
    
-   **Layout Data:**
    
    All `+layout.svelte` files can also have a sibling `+layout.js` file that loads data using the `load` function. In addition to the layout it ‘belongs’ to, data returned from layout `load` functions is also available to all child `+layout` and `+page` files.
    
-   **Endpoints:**
    
    As well as pages, you can define routes with a `+server.js` file (also referred to as an 'API route' or an 'endpoint'), which gives you full control over the response. These files export functions corresponding to HTTP verbs that that take a [Request Event](https://kit.svelte.dev/docs/types#public-types-requestevent) argument and return a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
    
-   **Adapters:**
    
    An adapter is a plugin that takes your app as input during build and generates output suitable for deployment on a specific platform. By default, projects are configured to use `@sveltejs/adapter-auto`, which detects your production environment and automatically selects the appropriate adapter for you.
    

To learn more about SvelteKit's features in depth, check out Vercel's free [Beginner SvelteKit](https://vercel.com/docs/beginner-sveltekit) course.

## [Link to heading](#what’s-changed-in-the-past-12-months)What’s changed in the past 12 months

As the Svelte team, including the core team members at Vercel, have worked hard to prepare for the stable SvelteKit 1.0 release, some necessary breaking changes had to be made. If you’ve used SvelteKit in the past, it may look quite different today. Let’s go over the most notable changes made to SvelteKit in the last year.

## [Link to heading](#new-directory-based-routing)New Directory-based Routing

Changing SvelteKit’s file-based routing is by far one of the biggest updates made to SvelteKit. Previously, any file added to the `routes` directory would automatically create a route at that name. For example, creating the page `routes/about.svelte` would automatically create a page at `/about`, and `routes/index.svelte` would create our root page. Now, all routes are directory based and the old `index.svelte` has been replaced by `+page.svelte`. This new convention ensures that you are deliberately creating a route, and eliminates the need of underscores in order to colocate files. With this new convention, the page at the route `/about` will be `routes/about/+page.svelte` and our root page will be `routes/+page.svelte`.

**Old File-based routing**

```
src└ routes	├ dashboard/	│ ├ index.svelte	│ └ _nonPageRoute.js	├ about.svelte	└ index.svelte
```

**New Directory-based routing**

```
src└ routes	├ dashboard/	│ ├ +page.svelte	│ └ nonPageRoute.js	├ about/	│ └ +page.svelte	└ +page.svelte
```

Learn more about [SvelteKit's routing](https://vercel.com/docs/beginner-sveltekit/routing).

## [Link to heading](#new-layouts-system)New Layouts System

With the new routing changes came major changes to the layouts system as well. Instead of naming our layout files `__layout.svelte` we now name them `+layout.svelte` similar to our pages. Previously, we could have multiple layouts in a single directory using named layouts, such as `index@about.svelte`, which we have since said goodbye to 👋.

In addition to the changes, a new grouped layouts convention was added. This allows us to share layouts within group directories, which are folders wrapped in parentheses. Group directories do not affect the pathname of nested routes, but acts as a root route for layouts. To learn more about SvelteKit’s layouts checkout the Beginner SvelteKit course [here](https://vercel.com/docs/beginner-sveltekit/layouts).

**Old layouts system**

```
src└ routes	├ dashboard/	│ └ index@dashboard.svelte	├ about/	│ ├ index.svelte	│ └ testimonials/	│    ├ index.svelte	│    └ __layout.svelte	├ __layout-dashboard.svelte	└ __layout.svelte
```

**New layouts system**

```
src└ routes  │ (app)/	│ ├ dashboard/	│ ├ item/	│ └ +layout.svelte	│ (marketing)/	│ ├ about/	│ ├ testimonials/	│ └ +layout.svelte	├ admin/	└ +layout.svelte
```

Learn more about [SvelteKit's layouts](https://vercel.com/docs/beginner-sveltekit/layouts).

## [Link to heading](#loading-data)Loading Data

Previously, the `load` function would be called in a page component’s `context="module"` script block, and the returned data would become available to the page as a prop. A page calling the load function would look something like this:

```
<script context="module">  export async function load() {    const product = 'some data';    return {      props: {        product: product.data,      },    };  }</script><script>  export let product;</script>
```

Now, SvelteKit has completely gotten rid of the `context="module"`, and the `load` function has moved into the endpoint file. Our `+page.svelte` can automatically load the data from a `+page.js` route by exporting the strongly-typed `data` prop. Just like before, the `load` function runs on both the client and server. If you only want it to run on the server, you can add the `.server` extension (`+page.server.js`). Loading data into a page the new way looks like this:

+page.js

```
export const load = () => {  let product = "some data"  return {    product  }}
```

```
<!--+page.svelte--><script>  /** @type {import('./$types').PageData} */  export let data; // this is typed as `{ product: string }`!</script><h1>This is our data: {data}</h1>
```

To learn more about [SvelteKit's data fetching](https://vercel.com/docs/beginner-sveltekit/loading).

## [Link to heading](#server-routes-\(endpoints\))**Server routes (Endpoints)**

Previously, to create an endpoint, you would add a `.js` (or `.ts` ) file somewhere into `src/routes`, and include the data type it was meant to return as part of the name of that file. For example: if you wanted to return some data as JSON at the path `/api/about.json`, you could simply add an `about.json.js` file into your routes folder like this:

```
src/└ routes/    └ about.json.js
```

Now, instead of adding server routes directly in the routes directory, we instead add them in the `/routes/api` directory. The new way of creating an endpoint is more similar to creating a page. Instead of simply adding the file `about.json.js` within this directory, we add a `+server.js` file within an about `folder` like this:

```
src/└ routes/	└ api/	  └ +server.js
```

In addition to this change, server routes must now return a proper [**Response object**](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response). Thankfully, SvelteKit has a `json` function available that will do this for us by simply importing it, then wrapping whatever data we return in that function call. Lastly, the HTTP verb functions accepted by a server route must now be capitalized.

Migrating an old project? Checkout the [Migration Guide](https://github.com/sveltejs/kit/discussions/5774).

## [Link to heading](#sveltekit-on-vercel)SvelteKit on Vercel

Vercel is a cloud platform for deploying and hosting web applications. Using [Vercel in conjunction with SvelteKit](https://vercel.com/solutions/svelte) creates a dream stack, offering several improvements:

-   Vercel provides a zero-configuration platform for deploying and hosting SvelteKit apps, making it easy to get your app up and running quickly.
    
-   Vercel recently launched [Edge Functions](https://vercel.com/features/edge-functions), which allow you to run JavaScript code on their globally-distributed edge network. SvelteKit supports Vercel Edge Functions, meaning you can serve your users dynamically-rendered pages at the same speed you would serve static files from a CDN, drastically improving the performance and scalability of your SvelteKit app.
    
-   Vercel offers Vercel Analytics in the dashboard to help you understand the performance of your application based on real visitor data. With the Vercel Analytics API, you can now use Vercel Analytics with SvelteKit.
    
-   Vercel provides built-in support for server-side rendering (SSR) and static site generation (SSG), which can improve the performance and SEO of your SvelteKit app.
    
-   Vercel offers seamless integrations with popular development tools and services, such as GitHub, GitLab, and Visual Studio Code, making it easy to integrate your SvelteKit app into your existing workflow.
    
-   Vercel provides a powerful, intuitive interface for managing and monitoring your SvelteKit app, allowing you to see how your app is performing and make updates and changes as needed.
    

Overall, Vercel can provide a number of benefits when used with SvelteKit, making it easier to deploy, host, and manage your SvelteKit app. Whether you're a small team building a simple web app or a large organization with complex, mission-critical applications, Vercel can help you get the most out of your SvelteKit app.

## [Link to heading](#community)Community

One of the key reasons for SvelteKit’s growing popularity is the inclusive community that has formed around it. Svelte Society, the community-run Svelte network, has become the home of all things related to Svelte and SvelteKit.

This community encourages participation from developers of all skill levels, and there are plenty of opportunities for beginners to get involved and learn from more experienced members. In addition to Svelte Society, there is also a network for women and non-binary people interested in Svelte called [Svelte Sirens](https://twitter.com/SvelteSirens). These communities are all active on [forums](https://discord.com/channels/457912077277855764/939868205869072444) and social media, and there are regular events where SvelteKit developers can connect with each other.

But the SvelteKit ecosystem is more than just documentation and a supportive community. There are also many tools and resources available to use while building SvelteKit applications. These include templates, starter kits, and other helpful resources that can make it even easier to get started with SvelteKit. Here are some of our favorites:

The SvelteKit ecosystem is constantly growing and evolving. We’ve already got some awesome companies using SvelteKit on Vercel to do some amazing things! Check some of them out:

## [Link to heading](#get-started-with-sveltekit-1.0)Get started with SvelteKit 1.0

Get started with SvelteKit on Vercel by [deploying one of our SvelteKit templates](https://vercel.com/templates/svelte) in seconds, or begin learning with Vercel’s free [Beginner SvelteKit course](https://vercel.com/docs/beginner-sveltekit)!