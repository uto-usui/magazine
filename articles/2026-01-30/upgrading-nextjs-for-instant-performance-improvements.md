---
title: "Upgrading Next.js for instant performance improvements"
source: "https://vercel.com/blog/upgrading-nextjs-for-instant-performance-improvements"
publishedDate: "2022-03-17"
category: "frontend"
feedName: "Vercel"
author: "Lydia Hallie"
---

7 min read

Mar 17, 2022

Since the release of Next.js, we’ve worked to introduce new features and tools that drastically improve application performance, as well as overall developer experience.  
  
Let’s take a look at what a difference upgrading to the latest version of Next.js can make.

In 2019, our team at Vercel created a serverless demo app called [VRS (Virtual Reality Store)](https://serverless-vrs.vercel.app/) using Next.js 8, Three.js, Express, MongoDB, Mongoose, Passport.js, and Stripe Elements. Users could sign up, browse multiple 3D models, and purchase them.

Although this demo is still fully functional three years later, it lacked some of the performance improvements that were added over the years.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7pBraplxdF3bBLIh7hQ7OZ%2F98ef16a17f0aa27601615a75d80cb64e%2FTimeline.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3pXZgC4vKlWUGdupw0dAdt%2F516578215077daa0db3656abefb0ee52%2FTimeline.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3KK4hhuyndrHJQnqd7meAZ%2F6af0c085beba65a1c7d48b1cfc6f15f3%2FMobile_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6T0OBkJ1dNORizcniL6YrB%2F2d586808b29bd10250b0e131cd3314de%2FMobile_Dark.png&w=1920&q=75)

By upgrading the demo app to Next.js 12, we were able to vastly improve our [Core Web Vitals](https://vercel.com/blog/core-web-vitals) and go from an average performance score of 32 to 99.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5U2oqPsfqThz7Gb2vVkiGx%2Fa2008f6c025d9c400c19fe0f6b24e939%2FTable_-_1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1kVSAguIij5bYlVCbXkCYu%2Fc87cbfae7461c7732da6ac2e174b3a01%2FTable_-_1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5U2oqPsfqThz7Gb2vVkiGx%2Fa2008f6c025d9c400c19fe0f6b24e939%2FTable_-_1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1kVSAguIij5bYlVCbXkCYu%2Fc87cbfae7461c7732da6ac2e174b3a01%2FTable_-_1.png&w=1920&q=75)

  
Let's explore the changes we made to improve performance and streamline the developer experience using new Next.js features.

## [Link to heading](#-using--getstaticprops-and-getstaticpaths)  
Using `getStaticProps` and `getStaticPaths`

The old implementation relied on a separate backend folder that contained a custom Express server, which exposed an `/api/checkout` endpoint to handle payments, `/api/get-products` to fetch data used to render all models, and the `/api/get-product/:id` endpoint to fetch the data for a specific model.

When a user navigated from the landing page to the `/store` page, `getInitialProps` would make a request to the `/api/get-products` endpoint to retrieve data for the shown models.

The store page was only visible to the user once the request had been resolved. This could take a while, depending on the quality of their internet connection.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3L1s5k6eVWLCyTzOQgizv9%2F622519cabd0f30d282473735d678b0be%2FNetwork_-_1__2_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fn5pNXe8XT5EsGAsmM6pDt%2Fd5dff35ac6cdb2dee4bf7c035826fe24%2FNetwork_-_1__3_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ncVHyooU1tkfqLGE65xf8%2F78d6dc69be7c6b49a502f82f423ee1e9%2FNetwork_1_-_Mobile_Light__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Y0lvKWc6HVVslU2qDiN1L%2F874f4d0cd6557fb461677f986893498d%2FNetwork_1_-_Mobile_Dark__1_.png&w=1920&q=75)

Next.js 9 introduced `getStaticProps`, which allows developers to fetch data at build time. Unlike `getInitialProps`, this function **always runs server-side**! The code written inside this function _won’t_ be included in the JavaScript bundle sent to the client, so it’s safe to write server-side code directly in `getStaticProps`.

Instead of relying on external API endpoints to fetch the data needed to render the models on the `/store` page, this data is available to us instantly when navigating to the page.

Static Site Generation using `getStaticProps` is especially powerful when it’s used in combination with the `<Link />` component. This component prefetches pages as soon as their link appears in the viewport. When the user actually clicks on the link, no additional requests have to be made in order to render the page: Next.js will use the data that’s already been prefetched!

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F51iCVBNARB0Me5mWkuvlPY%2Fda7e778ad56bbbd76a0c4aa7de7787fd%2FNetwork_-_2.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F34pjRju7RGortqMpPcCxxZ%2F12f2f2c7338743f26234f340269420f8%2FNetwork_-_2.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7tlWugG8Qb7hFulSKMvDLP%2F5cdcb0feae8be5f73f9988aa8dcc546c%2FNetwork_2_-_Mobile_Light__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F52NNeBdi5kFbPKaCvjGn0n%2Fa03cc46c9e721a53c5293a0d90bd9dac%2FNetwork_2_-_Mobile_Dark__1_.png&w=1920&q=75)

Although the user hadn’t clicked the "Store" link yet, the `store.js` and `store.json` files that are necessary to render the store page had already been prefetched. Using `getStaticProps` with the `<Link />` component drastically improves the responsiveness of the application.

You might notice that the time it takes to fetch the thumbnails has also been reduced tremendously. We were able to do this by replacing the native `<img />` tag in favor of the `<Image />` component.

## [Link to heading](#--using-next/image)  
  
Using `next/image`

The `<Image />` component was introduced in Next.js 10 and further improved in later versions, allowing developers to efficiently serve images using modern image formats without [layout shift](https://nextjs.org/learn/seo/web-performance/cls).

The performance improvement is instantly noticeable when we compare the loading time of the `/store` page, which renders an image for each model thumbnail.

![Loading the /store page using Next.js 8 without next/image](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5z0Hf6DgB1NHQdR4oYT3fY%2Fbb8f4c08abc540e585ae0231995b5726%2FScreen_Shot_2022-03-08_at_1.40.00_PM.png&w=1920&q=75)![Loading the /store page using Next.js 8 without next/image](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5z0Hf6DgB1NHQdR4oYT3fY%2Fbb8f4c08abc540e585ae0231995b5726%2FScreen_Shot_2022-03-08_at_1.40.00_PM.png&w=1920&q=75)

Loading the /store page using Next.js 8 without next/image

![Loading the /store page using Next.js 12 with next/image](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1T70jFoNwEP5BtniYq3SuG%2Fc004ced55ccfd68b77cc85c7027f9b3e%2FScreen_Shot_2022-03-08_at_1.40.21_PM.png&w=1920&q=75)![Loading the /store page using Next.js 12 with next/image](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1T70jFoNwEP5BtniYq3SuG%2Fc004ced55ccfd68b77cc85c7027f9b3e%2FScreen_Shot_2022-03-08_at_1.40.21_PM.png&w=1920&q=75)

Loading the /store page using Next.js 12 with next/image

Let’s look at the differences between using the native `<img />` tag, and using the `<Image />` component.  

### [Link to heading](#next-gen-image-format)Next-gen image format

  
The `<Image />` component serves the next-gen image format `webp` format. Images using this format are 25-35% smaller than JPEG files with the exact same quality index. This difference is clearly visible when comparing the sizes of the fetched images: whereas the red car model’s image used to be 1.3MB in the old implementation, we were able to reduce the size by **\-98.75%** to only 16.6kB by using the `<Image />` component.  

### [Link to heading](#lazy-loading)Lazy Loading

The old implementation requested the images for all models, resulting in 12 fetch requests. The `<Image />` component only fetches the image once it detects the intersection of the viewport with the image’s bounding box.

Although no changes had to be made to the images themselves, we were able to decrease the image loading time from an average of ~3000ms down to ~270ms.

## [Link to heading](#--dynamic-routes)**  
  
Dynamic Routes**

When browsing through the store, users can click on each item to better view the model.

The old implementation used a combination of query parameters and `getInitialProps` to render the page and fetch the needed data to render each model. Similar to what we saw on the `/store` page, the user can only see the model once the API request initiated within the `getInitialProps` function has resolved.  

Next.js 9 introduced file-system-based [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes). In combination with the new `getStaticPaths` function used together with `getStaticProps`, this feature makes it possible to dynamically pre-render the model pages based on their id.  

Instead of having one model page and using `getInitialProps` and query parameters to determine which data to fetch and what model to render, we can directly use a path parameter to generate pages for each model statically.  

By wrapping each model card in the grid in a `<Link />` component, we can prefetch each `/model/[id]` page once the card appears in the viewport, allowing instant navigation when a user clicks on the card.

## [Link to heading](#--api-routes)  
  
API Routes

Next.js 9 introduced [API Routes](https://nextjs.org/docs/api-routes/introduction), making it easy to create API endpoints from within the `/pages` folder.

Although we could replace the `/api/get-products` and `/api/get-product/:id` endpoints by using `getStaticProps`, we still need the `/api/checkout` endpoint to handle payments on the server-side.

This endpoint cannot be replaced with the `getStaticProps` method, since it needs to be available to the client during runtime with values that are unknown during build time. When a user purchases an item, the client makes a call to this endpoint using the unique token that was generated for their card.

Instead of hosting our own server to provide this endpoint, we can recreate this endpoint as an API Route instead!

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4DVMu1i98iA2JD0WIm5Ez%2F6d887e36a623f30635b36c17f8eb0be8%2FGroup_30.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4YSO22QZpOYh1ju8oS7TEt%2Fb07d8609461e7993860dbfff4b8130e6%2FGroup_30.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4DVMu1i98iA2JD0WIm5Ez%2F6d887e36a623f30635b36c17f8eb0be8%2FGroup_30.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4YSO22QZpOYh1ju8oS7TEt%2Fb07d8609461e7993860dbfff4b8130e6%2FGroup_30.png&w=1920&q=75)

### [Link to heading](#-nextauth.js)  
NextAuth.js

  
The old implementation also had user authentication using Passport.js. To more easily add authentication to our application, we can take advantage of [NextAuth.js](https://next-auth.js.org/), which simplifies this process to a few lines of code with support for 50+ providers.  

pages/api/\[...nextauth\].ts

```
import NextAuth from "next-auth";import GithubProvider from "next-auth/providers/github";export default NextAuth({     providers: [          GithubProvider({              clientId: process.env.GITHUB_CLIENT_ID,              clientSecret: process.env.GITHUB_CLIENT_SECRET          })   ]})
```

Code snippet using NextAuth.js

Since all endpoints have been replaced, we no longer need a separate backend folder! We can use the frontend folder as the project's root folder, simplifying the project architecture significantly.

## [Link to heading](#--import-on-interaction-)  
  
Import on Interaction

Some components aren’t instantly visible to the user. Instead of including them in the main JavaScript bundle, we can dynamically import these components using `next/dynamic`.

One of these components is the `CartSidebar`. This component is imported in the `Nav` component and is only visible to the user when they click on the cart icon or add an item to the cart.  

```
import CartSidebar from "../components/CartSidebar"export default function Nav() {  ...  return (      <div>         ...         <CartSidebar />      </div>  )}
```

Before using a dynamic import

Instead of statically importing this component, we can tell Next.js to create a separate JavaScript chunk for this component through code-splitting. That way, we can delay the import of this non-critical component, and only fetch it on-demand once the user actually requires it.  

```
import dynamic from "next/dynamic"const CartSidebar = dynamic(() => import("../components/CartSidebar"));export default function Nav() {  ...  return (      <div>         ...         {open && <CartSidebar />}      </div>  )}
```

Since the `CartSidebar` component is the only component in the application that imported and used third-party libraries for payments (Stripe), we were also able to defer the imports of these libraries until the moment the user actually needed them (instead of unnecessarily fetching unused code).  

This resulted in sending less initial JavaScript to the user and improving page loading performance.

## [Link to heading](#--automatic-font-optimization-)  
  
Automatic Font Optimization

[Automatic Font Optimization](https://nextjs.org/docs/basic-features/font-optimization) is available since Next.js 10 and automatically inlines font CSS at build time, eliminating an extra round trip to fetch font declarations.

```
<link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
```

Before enabling automatic font optimization

```
<style data-href="https://fonts.googleapis.com/css2 family=Space+Mono&amp;display=swap"> @font-face{font-family:'Space Mono';font-style:normal;...</style>
```

After enabling automatic font optimization

This means that font declarations no longer have to be fetched, improving initial page load performance.

![Before enabling automatic font optimization](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1L0SRYsVx65H8I579Jc6eP%2Fe4e70d33920497bfb3559760a74cf815%2FScreen_Shot_2022-03-07_at_8.19.20_PM.png&w=1920&q=75)![Before enabling automatic font optimization](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1L0SRYsVx65H8I579Jc6eP%2Fe4e70d33920497bfb3559760a74cf815%2FScreen_Shot_2022-03-07_at_8.19.20_PM.png&w=1920&q=75)

Before enabling automatic font optimization

![After enabling automatic font optimization
](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F18MFFJUFQ0lhFS6estD3b5%2F8f6c12f1c5cec3143715481d7f80eae5%2FScreen_Shot_2022-03-07_at_8.19.39_PM.png&w=1920&q=75)![After enabling automatic font optimization
](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F18MFFJUFQ0lhFS6estD3b5%2F8f6c12f1c5cec3143715481d7f80eae5%2FScreen_Shot_2022-03-07_at_8.19.39_PM.png&w=1920&q=75)

After enabling automatic font optimization

We were able to reduce the number of requests needed to load the font from 4 to 2 just by upgrading to the latest version.

## [Link to heading](#--developer-experience-)  
  
Developer experience  

Besides performance optimizations, the developer experience has also massively improved over the years.

### [Link to heading](#built-in-typescript-support)**Built-in TypeScript support**

Whereas adding TypeScript support required quite a bit of custom configuration, Next.js 9 added support for [TypeScript out of the box](https://nextjs.org/docs/basic-features/typescript)! We no longer have to deal with our own config, but instead can start using TypeScript by adding a `tsconfig.json` file to the root of existing projects, or by running `npx create-next-app --ts` for newly created projects.  

### [Link to heading](#faster-builds-through-swc)**Faster builds through SWC**

Next.js 12 includes a new [Rust-based compiler](https://nextjs.org/docs/advanced-features/compiler) built on SWC that takes advantage of native compilation. We reduced our build time from `~90s` down to `~30s` just by upgrading the Next.js version.  

### [Link to heading](#react-fast-refresh)**React Fast Refresh**

[Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh) is a Next.js feature enabled in all Next.js apps on version 9.4 or newer. It provides instantaneous feedback on edits made to your React components within a second without losing component state. The introduction of SWC in Next.js 12 improved the refresh rate significantly, resulting in **3x faster refreshes** compared to prior versions.  

## [Link to heading](#conclusion)Conclusion

The improvements and new features Next.js has introduced over the past couple of years have made it easy to create fast fullstack applications, all while ensuring backward compatibility and making incremental adoption to new versions possible.

By upgrading to the latest version, we were able to vastly optimize our application and developer experience with minimal effort on our end.

[Try out the upgraded demo](https://serverless-vrs.vercel.app/) or [view the full PR](https://github.com/vercel/vrs/pull/50) for the upgrade. If you'd like to upgrade your Next.js app, check out our [upgrade guide](https://nextjs.org/docs/upgrading).