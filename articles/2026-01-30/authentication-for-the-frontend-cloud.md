---
title: "Authentication for the frontend cloud"
source: "https://vercel.com/blog/authentication-for-the-frontend-cloud"
publishedDate: "2023-05-05"
category: "frontend"
feedName: "Vercel"
author: "Colin Sidoti"
---

3 min read

May 5, 2023

​Clerk builds drop-in authentication for complete user management. Here, they explain how they've optimized their architecture for the frontend cloud.

We’re in the midst of the next big platform shift. Last generation we moved from server rooms to the cloud, and today we’re moving from the traditional, backend-oriented cloud to a new frontend cloud.

The frontend cloud is characterized by performance: It enables both faster application development and faster end-user interactions. Each element is critical to success in today’s ultra-competitive software market.

At Clerk, we build authentication for the frontend cloud. We saw the need arise as frameworks and hosts tailored to the frontend cloud grew in popularity, especially Next.js and Vercel. Legacy authentication tools were not built frontend-first, and their technical architecture usually undermines the goal of speeding up end-user interactions, since they’re slow at the edge.

We needed to reimagine authentication to embrace the architecture of [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure). Let's explore how edge-native auth in the frontend cloud enables:

1.  Faster app development
    
2.  Better user experiences
    
3.  Powerful composability
    

## [Link to heading](#enabling-faster-application-development)Enabling faster application development

Clerk uses the frontend cloud to speed up application development with three key strategies:

-   **Framework-specific SDKs**. React is too versatile a library for a one-size-fits-all authentication solution. Our separate SDKs for Next.js, Expo, Remix, and more are essential to providing fast implementation and a natural developer experience. Clerk’s [support for the Next.js App Router](https://clerk.com/blog/nextjs-13-4), including RSC, is now stable.
    

app/page.tsx

```
import { auth, currentUser } from '@clerk/nextjs';⁡𝅶‍‍𝅺⁡‍𝅴⁡𝅴𝅹‍‍⁢𝅵‍‍⁢𝅺𝅹⁡⁣⁠𝅹⁡⁣⁡⁠𝅷‍𝅹⁢𝅺𝅸‍‍‍𝅷‍‍𝅳⁡‍⁠‍‍⁢𝅵‍‍‍𝅺export default async function Page() {  // Retrieve the active userId  const { userId } = auth();  // Retrieve the complete user object  const { firstName, lastName } = await currentUser(); return '...';}
```

Clerk now supports the Next.js App Router.

-   **A** `**<Component/>**` **is worth a thousand APIs.** Just drop-in our `<SignIn/>` and `<UserProfile/>` components to get fully-functional, beautiful authentication UIs. Developers don’t need to implement our restful APIs in-house—our customizable components do that for them!
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2vNMDNFq8gFoso2r9rrGQz%2F3cf134c24fe7c4b75babebdf1d362247%2Fimage.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6LJW5x5eiXVCbz4Jvrzw0I%2Fdeb7cc339f1273be6c318851dbe7f291%2Fimage.png&w=1920&q=75)

-   **Clerk stores the “users” table.** Instead of asking developers to setup and maintain a users table, Clerk hosts it for them. It’s much easier to get started, and developers simply use `clerk_user_id` as a foreign key throughout their database. As a bonus, teams face less regulatory burden since our architecture shields application servers from customer data. (This works the same way Stripe shields credit card numbers from application servers.)
    

## [Link to heading](#delivering-better-user-experiences-)Delivering better user experiences

A hallmark feature of the frontend cloud is “edge compute,” which globally distributes your application so server-side functions can run physically close to your users. This helps developers overcome the latency burden of physics’ most stubborn constant: the speed of light.

Perhaps surprisingly, many applications cannot benefit from edge compute without first replacing their authentication solution. This is because legacy authentication solutions usually depend on stateful session management that is centralized to a single region, which directly undermines the benefit of edge compute.

Clerk uses stateless session management based on JSON web tokens (JWTs) for secure authentication in under one millisecond at the edge. Fast authentication unlocks many more workloads to operate there, like personalization or feature flags, which require information about the signed-in user.

## [Link to heading](#powering-composability-with-jwt-sso)Powering composability with JWT SSO

Another hallmark feature of the frontend cloud is composability. It’s no secret that developers like to glue many services together within their application, but how does composability work for frontend-first services?

Services in the frontend cloud often need to handle requests directly from the end-user’s browser, so the traditional concept of a “secret key” is no longer secure. Instead, services are adopting a pattern called “JWT SSO” (JWT single sign-on).

JWT SSO is when services ask developers to identify the end-user by generating a cryptographically-signed JWT. The pattern is common among database tools with user-based authorization features like row-level security, as well as embeddables like chat widgets that need to know which user is signed in.

Clerk plays a vital role in facilitating this process by allowing developers to define “JWT templates.” This makes it easy to retrieve JWTs from the frontend and pass them along to the service. By utilizing the frontend cloud, Clerk can seamlessly integrate with various frontend-first services, streamlining the process of connecting and securing these services. We even have many pre-defined JWT templates to help further simplify the process.

Needless to say, the entire team at Clerk is excited to be part of the frontend cloud, and we can’t wait to partner with more in the ecosystem. Our approach enables us to better serve our users and empower them to create secure, efficient, and user-friendly applications.

[

**Ready to get started?**

We're excited to welcome you in to Vercel's frontend cloud. Feel free to bring any questions you may have about your team's unique applications.

Talk with Us



](https://vercel.com/contact/sales)