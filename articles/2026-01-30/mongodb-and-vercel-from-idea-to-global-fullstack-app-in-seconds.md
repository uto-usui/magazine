---
title: "MongoDB and Vercel: from idea to global fullstack app in seconds"
source: "https://vercel.com/blog/mongodb-and-vercel-from-idea-to-global-fullstack-app-in-seconds"
publishedDate: "2022-06-13"
category: "frontend"
feedName: "Vercel"
author: "Guillermo Rauch"
---

3 min read

Jun 13, 2022

Last week, I had the pleasure of joining Sahir Azam, MongoDB’s Chief Product Officer, on stage at MongoDB World in New York City. We announced [the Vercel and MongoDB integration](https://vercel.com/integrations/mongodbatlas)—and shared our vision for enabling developers to create at the moment of inspiration.

[Check out the demo](https://mongodb.vercel.app/) or [deploy the MongoDB + Vercel integration](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fmongodb-starter&project-name=mongodb-vercel&repository-name=mongodb-vercel&demo-title=MongoDB+Developer+Directory&demo-description=Log+in+with+GitHub+to+create+a+directory+of+contacts.&demo-url=https%3A%2F%2Fmongodb.vercel.app%2F&demo-image=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1654311846%2Fmongodb-demo-app_i12ysf.png&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)

## [Link to heading](#enabling-developers-to-create-at-the-moment-of-inspiration)**Enabling developers to create at the moment of inspiration**

MongoDB’s bet on the serverless movement is a testament to where software development is headed. Vercel provides the serverless frontend infrastructure for building on the Web. **Together, we deliver on the promise of fullstack serverless development.** With Vercel’s core values—easy, scalable, and fast—it’s the perfect example of what the future of frontend development can be. 

### [Link to heading](#1.-easy-)**1\. Easy**

Making things easy and creating a great developer experience has been the calling of my career. What I began with creating and open-sourcing Mongoose, the leading client library for MongoDB in the JavaScript ecosystem, resulted in creating the best developer experience for the frontend with [Next.js and Vercel.](https://vercel.com/solutions/nextjs) Today, Next.js is the most popular framework in the React ecosystem.

Next.js turbocharges your applications with server rendering, automatic production optimizations, and helps developers run the entire serverless frontend stack on their local machine. With over 2.5 million downloads each week, it’s become the framework of choice for teams and projects of all sizes, from GitHub to Dior to Tiktok and Twitch. It’s also just one example of the open-source ecosystem that Vercel contributes to and invests in. Whether it’s Svelte or Nuxt, there’s no shortage of modern options to build with today. 

However, even after a developer chooses the right framework for their project, they might still struggle to ship high-quality software. Doing this today involves juggling multiple different vendors: CDNs, clusters, functions, caching infrastructure, and more. Vercel solves this by allowing developers to go from `git push` to global app in one unified process. 

In practice, this means Vercel builds and runs your frontend code natively in the cloud.

### [Link to heading](#2.-scalable-)**2\. Scalable**

Serverless promises that you can scale up and down to zero as your traffic dictates, with no effort on your side. Vercel delivers this in several ways. 

-   **Database**: Our stack begins with the data platform—in this case, MongoDB. 
    
-   **Vercel Serverless Compute:** Then when you deploy using frameworks like Next.js on Vercel, we automatically [create Serverless Functions](https://vercel.com/features/edge-functions) that fetch from that data API. We use these functions to server render your pages. 
    
-   **Vercel Edge Cache:** But serverless or not, scaling isn’t solved by throwing more compute at the problem. As visitors come in, Vercel intelligently renders and later reuses your pages, keeping the content in sync with your database. The best part? This final layer is globally distributed at the edge.
    

### [Link to heading](#3.-fast-by-default-)**3\. Fast by default** 

While making it easy to deploy and scale are part of the experience, we also care deeply about performance. Not just for our own users, but the customers and communities they're building for. When you deploy on Vercel, we ensure your application is fast by default. The result: a global application that’s fast everywhere, with the built-in observability to keep it so. 

In addition to optimizing your web assets, you can respond to degradations immediately by tracking real-time user data. Vercel enables this by calculating a [Real Experience Score](https://vercel.com/analytics) based on data points collected from the devices of your actual users. Your Real Experience Score is the combined score of your Core Web Vitals, a standardized set of metrics that Google deems essential for great user experience.

## [Link to heading](#get-started-with-mongodb-and-vercel-)**Get started with MongoDB and Vercel** 

Together, MongoDB and Vercel with Next.js give developers the power of fullstack serverless technology, allowing you to go from idea to global application in seconds. Anyone can deploy a Vercel project and create and connect to an Atlas cluster, without ever needing to open the MongoDB console. It’s all part of one seamless workflow, optimized for your application. Here’s how to get started.