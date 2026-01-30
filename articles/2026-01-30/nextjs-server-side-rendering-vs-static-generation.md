---
title: "Next.js: Server-side Rendering vs. Static Generation"
source: "https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation"
publishedDate: "2020-07-09"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

8 min read

Jul 9, 2020

[**Next.js**](https://nextjs.org/) is a React framework that supports **pre-rendering.** Instead of having the browser render everything from scratch, Next.js can serve pre-rendered HTML in two different ways.

With **Server-side Rendering** (SSR), Next.js pre-renders the page into HTML on the server on _every request_. [TTFB](https://web.dev/time-to-first-byte/) (Time to first byte) is slower, but your data is always up-to-date.

With **Static Generation** (SSG), Next.js pre-renders the page into HTML on the server _ahead_ of each request, such as at build time. The HTML can be globally cached by a CDN and served instantly.

Static Generation is more performant, but because pre-rendering happens _ahead_ of time, the data could become stale at request time.

Fortunately, there are ways to work around this issue without rebuilding the entire app when the data is updated. With Next.js, you can use Static Generation for maximum performance _without_ sacrificing the benefits of Server-side Rendering.

In particular, you can use:

-   **Incremental Static Generation**: Add and update statically pre-rendered pages incrementally _after_ build time.
    
-   **Client-side Fetching**: Statically generate parts of the page without data, and fetch the data on the client-side.
    

To demonstrate, let’s use a hypothetical e-commerce Next.js app as an example.

## [Link to heading](#e-commerce-next.js-app-example)E-commerce Next.js App Example

An e-commerce app might have the following pages, each with different data requirements.

-   **About Us**: This page shows the company information, which will be written directly in the app’s source code. No need to fetch data.
    
-   **All Products**: This page shows the list of all products. The data will be fetched from a database. This page will look the same for all users.
    
-   **Individual Product**: This page shows each individual product. Like the All Products page, the data will be fetched from a database, and each page will look the same for all users.
    
-   **Shopping Cart**: This page shows a user’s shopping cart. The data will be fetched from a database. This page will look different for each user.
    

### [Link to heading](#per-page-basis)Per-page Basis

One of my favorite features of Next.js is **per-page configuration** for pre-rendering. You can choose a different data fetching strategy for each page.

For our e-commerce app example, we’ll use the following strategy for each page. We’ll explain how they work shortly.

-   **About Us:** Static Generation without data.
    
-   **All Products / Individual Product:** Static Generation with data, and then improve upon it using Incremental Static Generation.
    
-   **Shopping Cart:** Static Generation without data, combined with Client-side Fetching.
    

## [Link to heading](#about-us-page:-static-generation-without-data)About Us Page: Static Generation without Data

If a page does not require fetching external data, it will automatically pre-render into HTML at build time. This is the default for Next.js pages. Let’s use this for the about page, which has no data requirements.

Create a file under the `pages` directory and export only the component.

pages/about.js

```
// This page can can be pre-rendered without// external data: It will be pre-rendered// into a HTML file at build time.export default function About() {  return (    <div>      <h1>About Us</h1>      {/* ... */}    </div>  )}
```

## [Link to heading](#all-products-page:-static-generation-with-data)**All Products Page:** Static Generation with Data

Next, let’s create a page showing all products. We want to fetch from our database at build time, so we’ll use Static Generation.

Create a page component that exports a `getStaticProps` function. This function will be called at build time to fetch external data, and the data will be used to pre-render the page component.

```
// This function runs at build time on the build serverexport async function getStaticProps() {  return {    props: {      products: await getProductsFromDatabase()    }  }}// The page component receives products prop// from getStaticProps at build timeexport default function Products({ products }) {  return (    <>      <h1>Products</h1>       <ul>        {products.map((product) => (          <li key={product.id}>{product.name}</li>        ))}      </ul>    </>  )}
```

`getStaticProps` is run on our build server (Node.js environment), so the code will [not be included](https://nextjs.org/docs/basic-features/data-fetching#technical-details) in the client-side JavaScript bundle. This means you can directly query your database.

## [Link to heading](#individual-product-page:-static-generation-with-data)Individual Product Page: Static Generation with Data

Your e-commerce app needs a page for each product with a route based on its id (for example, `/products/[id]`).

In Next.js, this can be done at build time using [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) and `getStaticPaths`. By creating a file called `products/[id].js` and having `getStaticPaths` return all possible ids, you can pre-render all individual product pages at build time.

Then, you can fetch data for the individual product from the database. We can use `getStaticProps` again by providing the `id` at build time.

pages/products/\[id\].js

```
// In getStaticPaths(), you need to return the list of// ids of product pages (/products/[id]) that you’d// like to pre-render at build time. To do so,// you can fetch all products from a database.export async function getStaticPaths() {  const products = await getProductsFromDatabase()  const paths = products.map((product) => ({    params: { id: product.id }  }))  // fallback: false means pages that don’t have the  // correct id will 404.  return { paths, fallback: false }}// params will contain the id for each generated page.export async function getStaticProps({ params }) {  return {    props: {      product: await getProductFromDatabase(params.id)    }  }}export default function Product({ product }) {  // Render product}
```

## [Link to heading](#incremental-static-generation)Incremental Static Generation

Now, suppose your e-commerce app has grown significantly. Instead of 100 products, you now have 100,000. Products get updated frequently. This poses two problems:

-   Pre-rendering 100,000 pages at build time can be very slow.
    
-   When product data is updated, you’d only want to modify the affected pages. We can't have a full app rebuild every time a product is modified.
    

Both of these problems can be solved by **Incremental Static Generation**. Incremental Static Generation allows you to pre-render _a subset of pages incrementally after build time_. It can be used to add pages or update existing pre-rendered pages.

This allows you to use Static Generation for maximum performance without sacrificing the benefits of Server-side Rendering.

### [Link to heading](#adding-pages-\(fallback\))Adding Pages (Fallback)

If you have 100,000 products and pre-rendering all pages at build time is too slow, you can lazily pre-render the pages.

For example, suppose that one of those 100,000 products is called product X. Using Next.js, we can pre-render this page when a user requests the page for product X. Here’s how it works:

1.  A user requests the page for product X.
    
2.  But we haven’t pre-rendered this page yet. Instead of rendering 404, Next.js can serve a "fallback" version of this page (for example, show a loading indicator).
    
3.  In the background, Next.js will render the product X page. When that’s done, the loading page will be swapped to the product X page.
    
4.  The next time someone else requests the page for product X, the pre-rendered product X page will be served instantly, just like regular static generation.
    

To enable this behavior, you can specify `fallback: true` in `getStaticPaths`. Then, in the page itself, you can use `router.isFallback` to see if the loading indicator should be displayed.

pages/products/\[id\].js

```
export async function getStaticProps({ params }) {  // ...}export async function getStaticPaths() {  // ...  // fallback: true means that the missing pages  // will not 404, and instead can render a fallback.  return { paths, fallback: true }}export default function Product({ product }) {  const router = useRouter()  if (router.isFallback) {    return <div>Loading...</div>  }  // Render product...}
```

We’ve created a demo of this behavior [here](https://static-tweet.now.sh/) using Twitter as the data source.

### [Link to heading](#updating-existing-pages-\(incremental-static-"re"generation\))Updating Existing Pages (Incremental Static "Re"generation)

When product data is updated, you don’t want to rebuild the entire app. You only want the affected pages to change.

For example, suppose that at build time, we’ve pre-rendered the page for product Y. At some point, the data for product Y gets updated.

Using Next.js, we can pre-render this page again after some interval. Here’s how it works:

1.  Next.js can define a "timeout" for this page — let’s set it at 60 seconds.
    
2.  The data for product Y is updated.
    
3.  When the page for product Y is requested, the user will see the existing (out of date) page.
    
4.  When another request comes in 60 seconds after the previous request, the user will see the existing (out of date) page. In the background, Next.js pre-renders this page again.
    
5.  Once the pre-rendering has finished, Next.js will serve the updated page for product Y.
    

This approach is called Incremental Static **Re**generation. To enable this, you can specify `revalidate: 60` in `getStaticProps`.

pages/products/\[id\].js

```
export async function getStaticProps({ params }) {  return {    props: {      product: await getProductFromDatabase(params.id)    },    revalidate: 60  }}
```

Inspired by [stale-while-revalidate](https://tools.ietf.org/html/rfc5861), this ensures traffic is served statically, and new pages are pushed only after generating successfully. A small number of users may get stale content, but most will get the latest content, and every request will be fast because Next.js always serves static content.

Both adding and updating pages are fully supported by both `next start` and the [Vercel Edge Network](https://vercel.com/docs/concepts/edge-network) out of the box.

## [Link to heading](#shopping-cart-page:-static-generation-without-data,-combined-with-client-side-fetching)Shopping Cart Page: Static Generation without Data, Combined with Client-side Fetching

Some pages, like the shopping cart page, can only be partially pre-rendered ahead of a request. Because the items on a shopping cart are unique to each user, you must always render them at request time.

You might think this is when you opt for Server-side Rendering, but that’s not necessarily the case. Instead, for better performance, you can do **Client-side Fetching** on top of Static Generation without data:

1.  Pre-render the page without data and show a loading state. (Static Generation)
    
2.  Then, fetch and display the data client-side. (Client-side Fetching)
    

For fetching data on the client-side, I recommend using the data fetching library called [SWR](https://swr.now.sh/). It handles caching, revalidation, focus tracking, and more.

```
import useSWR from 'swr'function ShoppingCart() {  // fetchAPI is the function to do data fetching  const { data, error } = useSWR('/api/cart', fetchAPI)  if (error) return <div>failed to load</div>  if (!data) return <div>loading...</div>  return <div>Items in Cart: {data.products.length}</div>}
```

## [Link to heading](#benefits-of-static)Benefits of Static

Using one of the Static Generation strategies we’ve discussed, you can gain the following benefits:

-   **Static is consistently and predictably fast.**
    
    Pre-rendered HTML files can be cached and served by a global CDN.
    
-   **Static is always online.**
    
    Even if your backend or data source (e.g. database) goes down, your existing pre-rendered page will still be available.
    
-   **Static minimizes backend load.**
    
    With Static Generation, the database or API wouldn’t need to be hit on every request. Page-rendering code wouldn’t have to run on every request.
    

## [Link to heading](#server-side-rendering)Server-side Rendering

If you want to use Server-side Rendering (pre-render a page on the server on _every request_) with Next.js, you can. To use this feature, you can export a function called `getServerSideProps` from a page, just like `getStaticProps`. Server-side Rendering is also supported when deployed to Vercel.

However, by using Server-side Rendering, you’ll give up on the benefits of Static as mentioned above. We suggest trying Incremental Static Generation or Client-side Fetching and see if they fit your needs.

## [Link to heading](#also:-writing-data)Also: Writing Data

Fetching data is only half the equation. Your app might need to write data back to your data source. For our e-commerce app, adding an item to the shopping cart is a good example of this.

Next.js has a feature called **API Routes** for this purpose. To use this feature, you can create a file inside the `pages/api` directory, which creates an API endpoint we can use to mutate our data source. For example, we can create `pages/api/cart.js`, which accepts a `productId` query parameter and adds that item to our cart.

Inside our [API route](https://nextjs.org/docs/api-routes/introduction), we export a request handler, which receives a request and returns a `json` response.

```
export default async (req, res) => {  const response = await fetch(`https://.../cart`, {    body: JSON.stringify({      productId: req.query.productId    }),    headers: {      Authorization: `Token ${process.env.YOUR_API_KEY}`,      'Content-Type': 'application/json'    },    method: 'POST'  })  const { products } = await response.json()  return res.status(200).json({ products })};
```

API routes allow us to write to external data sources securely. Using [environment variables](https://nextjs.org/docs/basic-features/environment-variables), we can include secrets for authentication without exposing the values client-side.

API routes can be deployed as [Serverless Functions](https://vercel.com/docs/v2/serverless-functions/introduction) (which is the default when you deploy to Vercel).

## [Link to heading](#conclusion)Conclusion

With Next.js, you can use Static Generation for maximum performance without sacrificing the benefits of Server-side Rendering. For more information, please refer to the Next.js documentation.