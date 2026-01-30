---
title: "10 Next.js tips you might not know"
source: "https://vercel.com/blog/10-next-js-tips-you-might-not-know"
publishedDate: "2021-01-26"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

5 min read

Jan 26, 2021

Techniques from the Next.js experts that empower your application.

Here are 10 little known Next.js tips you might not have heard that could help you save time on your next project:

-   [**Next.js Redirects**](#tip-1-next.js-redirects)
    
-   [**Next.js Rewrites**](#tip-2-next.js-rewrites)
    
-   [**Next.js Preview Mode**](#tip-3-next.js-preview-mode)
    
-   [**Hooking Into the Build Process**](#tip-4-hooking-into-the-build-process)
    
-   [**Next.js With Preact**](#tip-5-next.js-with-preact)
    
-   [**Absolute Imports and Module Path Aliases**](#tip-6-absolute-imports-and-module-path-aliases)
    
-   [**CRUD API Routes**](#tip-7-crud-api-routes)
    
-   [**Setting Response HTTP Caching Headers**](#tip-8-setting-response-http-caching-headers)
    
-   [**Shared Component Attributes**](#tip-9-shared-component-attributes)
    
-   [**Next.js Mobile Applications?**](#tip-10-next.js-mobile-applications)
    

## [Link to heading](#tip-1:-next.js-redirects)Tip 1: Next.js Redirects

[Next.js Redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) are new to version 9.5 (released in July 2020) and give the ability to reroute an incoming request path to another destination. 

Path matching, regex path matching, and wildcard paths are all valid ways to reroute your source path. Use the `redirects` key to create an asynchronous function that will return an array of objects where each object contains the properties for a redirect in the application. 

next.config.js

```
module.exports = {  async redirects() {    return [      {        source: '/about',        destination: '/',        permanent: true,      },    ]  },}
```

For more usage examples, take a look at this [next.config.js](https://github.com/vercel/next.js/blob/canary/examples/redirects/next.config.js) file.

## [Link to heading](#tip-2:-next.js-rewrites)Tip 2: Next.js Rewrites

[Rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) were also introduced in Next.js 9.5 and work similar to redirects. Where a redirect will reroute a page with a 301/302 status code, a rewrite will act as a proxy and mask the new path. This will make it appear to the user that they have not changed where they are on the site. 

The same rules apply for rewrites as they do for redirects except that rewrites are not able to overwrite public files or the routes that are automatically generated from the `pages` folder. These routes take precedence over rewrites.

next.config.js

```
module.exports = {  async rewrites() {    return [      {        source: '/about',        destination: '/',      },    ]  },}
```

To take a look at how rewrites look using regex or wildcard paths, take a look at this [next.config.js](https://github.com/vercel/next.js/blob/canary/examples/rewrites/next.config.js) file. 

## [Link to heading](#tip-3:-next.js-preview-mode)Tip 3: Next.js Preview Mode

[Preview Mode](https://vercel.com/docs/next.js/preview-mode) allows you to see a draft of your statically-generated content prior to publishing it to the web. Next.js has the ability to generate these draft pages at request time instead of build time so that developers can see what their content will look like when published. 

Take a look at the Next.js [Preview Mode documentation](https://nextjs.org/docs/advanced-features/preview-mode) for detailed information on how to build this out or test out Preview Mode before constructing it on your own with this [example Vercel application](https://next-preview.vercel.app/). 

## [Link to heading](#tip-4:-hooking-into-the-build-process)Tip 4: Hooking into the Build Process

With Next.js, we can use the `next.config.js` file to override defaults, configure Webpack, or inject code into the build process. By running a script during the build process to inject code, Next.js can create a [sitemap](https://leerob.io/blog/nextjs-sitemap-robots), RSS feed, or a search index with ease.

## [Link to heading](#tip-5:-next.js-with-preact)Tip 5: Next.js With Preact

If you’re building a basic Next.js application and not using advanced React functionality, you can explore using Preact with Next.js. For more information about Preact, check our their [documentation](https://preactjs.com/).

You can use Preact only in the client production build so you don’t miss any features of the Next.js local development experience. Use `next.config.js` to override the default Webpack configuration and use Preact.

New features in React may not be compatible with Preact (i.e. Suspense or Server Components) .

next.config.js

```
module.exports = {  webpack: (config, { dev }) => {    // Replace React with Preact only in client production build    if (!dev) {      Object.assign(config.resolve.alias, {        react: 'preact/compat',        'react-dom/test-utils': 'preact/test-utils',        'react-dom': 'preact/compat'      });    }    return config;  }};
```

## [Link to heading](#tip-6:-absolute-imports-and-module-path-aliases)Tip 6: Absolute Imports and Module Path Aliases

As your application grows, you might end up with deeply nested import statements. To prevent the import statements’ relative paths from becoming excessive, you can use [Absolute Imports and Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases) to make them more readable.

This, for example, will turn:

```
import Button from “../../../components/button”;
```

to:

```
import Button from “@/components/button”;
```

It creates a much shorter string that is easier to read. Now instead of being an import with a relative path, it is an absolute import. 

To set this up, create a JSON file. Inside this file, create a `compilerOptions` object inside a JSON object that will contain a `baseUrl` that is a string and `paths` property that is an object. 

Your configuration file for absolute imports should look something like this:

```
{  "compilerOptions": {    "baseUrl": ".",    "paths": {      "@/components/*": ["components/*"]    }  }}
```

The `baseUrl` property indicates that the base of the absolute import starts in the same directory that the configuration file is in. The `paths` object sets up the string we will use for the module alias as the key.

The value is an array that contains the relative path to the folder we are wanting to make the alias. The asterisk on the end of the key and value mean that any file or directory in the components folder can follow the same convention.

This structure is not necessary to create your project, but is a great way to make your import statements a little easier to read.

## [Link to heading](#tip-7:-crud-api-routes)Tip 7: CRUD API Routes

CRUD stands for **C**reate, **R**ead, **U**pdate, and **D**elete — all are common HTTP methods used in an application programming interface (API) that POST, GET, PUT, and DELETE data. 

We have the ability to build basic CRUD endpoints using the [built-in Next.js router.](https://nextjs.org/docs/routing/introduction) Create a folder inside `pages` called `api`. Inside `api` create a file with a `.js` or `.ts` extension that will contain the handler for all of our CRUD methods. 

Here’s a high-level outline of how an API might look: 

pages/api/item.js

```
export default async function handler(req, res) {  if (req.method === 'PUT') {    res.status(201).json({});  }  if (req.method === 'GET') {    res.status(200).json({});  }  if (req.method === 'POST') {    res.status(200).json({});  }  if (req.method === 'DELETE') {    res.status(204).json({});  }}
```

The actual setup used to define these endpoints may vary depending on how the app is constructed. Here is a full example of a CRUD API using [DynamoDB and Next.js](https://vercel.com/templates/next.js/aws-dynamodb-with-nextjs-api-routes) 

## [Link to heading](#tip-8:-setting-response-http-caching-headers)Tip 8: Setting Response HTTP Caching Headers

For static pages, the [Vercel Edge Network](https://vercel.com/docs/edge-network/overview) will automatically [cache](https://vercel.com/docs/edge-network/caching) static assets in order to serve data as fast as possible. When there is a need to use an API Route or Server-Side Rendered page, though, you will need to set a `Cache-Control` header. 

Here’s an example API Route that sends a JSON response and caches that response for one day: 

pages/api/user.js

```
export default function handler(req, res){  res.setHeader(    'Cache-Control',    's-maxage=86400'  );  res.status(200).json({name: ‘John Doe’ });};
```

## [Link to heading](#tip-9:-shared-component-attributes)Tip 9: Shared Component Attributes

When working with Next.js applications, sometimes there is a need to share information between pages. This is done by creating a [\_app.js](https://nextjs.org/docs/advanced-features/custom-app) file in the pages folder. 

pages/index.js

```
Home.title = "test"Home.description = "A container for blog posts"export default function Home() {    return (        <Container>            <Blogpost />        </Container>    )}
```

pages/\_app.js

```
import Head from 'next/head'export default function App({ Component, pageProps }) {  return (    <>      <Head>        <title>{Component.title}</title>        <meta name="description" content={Component.description} />      </Head>      <Component {...pageProps} />    </>  )}
```

This is just one way to take advantage of the customized app. There are several different things a developer can do when creating a custom app including global CSS, shared layout, maintain state, and more.  

## [Link to heading](#tip-10:-next.js-mobile-applications-)Tip 10: Next.js Mobile Applications? 

You can create a mobile app with Next.js? How is that possible!? 

Thanks to the Ionic team, you can build mobile-like experiences using Next.js. They are the creator of CapacitorJS, a library that will give you a native-like experience on your mobile phone.

![The Mobile Stack Visualized](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6B7Fx8roYhcTS2V8Zg52Z8%2Fa798f7c69be3416e84cb3815d07aee86%2Fimage.png&w=1920&q=75)

The Mobile Stack Visualized

Learn more about Ionic's Next.js/Tailwind CSS/Capacitor starter [here](https://capacitorjs.com/blog/mobile-apps-with-tailwind-css-nextjs-ionic-and-capacitor).

## [Link to heading](#next-steps)Next Steps

That’s it! How many of these tips are you going to implement in your next project?

If you have never used Next.js before, start with this tutorial on creating [your Next.js application](https://nextjs.org/learn/). 

If you have never written any React code before, start with [React’s official tutorial](https://reactjs.org/tutorial/tutorial.html). This will help you get a firm grasp on JavaScript and React prior to using Next.js. 

For the easiest way to deploy a Next.js app, start with this [introduction](https://vercel.com/docs) to Vercel. Vercel, built by the same team that made Next.js, provides production-grade hosting for Next.js websites with zero configuration.