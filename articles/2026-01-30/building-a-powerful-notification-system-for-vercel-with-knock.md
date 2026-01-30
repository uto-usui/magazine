---
title: "Building a powerful notification system for Vercel with Knock"
source: "https://vercel.com/blog/building-a-powerful-notification-system-for-vercel-with-knock-app"
publishedDate: "2022-12-16"
category: "frontend"
feedName: "Vercel"
author: "Becca Zandstein"
---

4 min read

Dec 16, 2022

How to create realtime alerting and communication system using a best-of-breed solution

One of the main benefits of building with Next.js is the ease of leveraging APIs and components to _quickly_ integrate with best-of-breed, backend technology.

Today released our [new notification system](https://vercel.com/docs/concepts/dashboard-features/notifications) as a public beta, made possible with the help of our integration partner [Knock](https://knock.app/), their powerful API, and robust component library.

This post will cover how we chose and implemented Knock for our notification center, and how you can use Knock to build notifications into your own application.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7ljlLgHICUoxG8rbbOd0vy%2F2bda035691ae1e38106e0c22d0984904%2FNotifications_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Gw3RLx8zdCHSnvbckZFuK%2Fa6a2805d69345a5295895e8839defbea%2FNotifications_-_Dark.png&w=1920&q=75)

## [Link to heading](#the-case-for-knock)The case for Knock

The first step in building our new notification system was to evaluate our technology options and choose a path forward. As we considered the infrastructure we wanted to build our system on top of, we knew we needed a platform that could match our needs for **iteration speed, reliability, and observability**. We needed a tool that let us:

-   Leverage our design and component system
    
-   Create custom, flexible notifications
    
-   Scale with our user base without added complexity or configuration
    

We needed to implement a solution quickly, but given this was a highly requested feature, we also knew we needed a system that was flexible enough to adapt to our needs today and in the future.

We decided on [Knock](https://vercel.com/integrations/knock)—a flexible, reliable notifications API.

Knock gave us a set of primitives to use in building our notification system, from notification preferences to real-time, per-user, in-app feeds and batching. Knock’s dashboard also gave us a single place to observe the system and see the full range of notifications we were sending to customers.

```
const { Knock } = require("@knocklabs/node");const knock = new Knock(process.env.KNOCK_API_KEY);await knock.workflows.trigger("new-comment", {  recipients: ["1", "2"],  // optional  data: { "project_name": "My Project" },  actor: "3",  cancellationKey: "cancel_123",  tenant: "jurassic_world_employees"});
```

Workflows are triggered via a call to the trigger endpoint, which tells Knock to run a specified payload of recipients and data through the workflow specified by the call.

### [Link to heading](#using-knock-at-vercel)Using Knock at Vercel

Of the many notification systems we evaluated, Knock was the easiest to get started with. With Knock we had an in-app feed demo working in [**less than an hour**](https://twitter.com/rauchg/status/1532024136402206721)**.** (Knock now has its own [demo](https://knock-in-app-notifications-react.vercel.app/) online, powered by Vercel.)

The out-of-the-box features that Knock provides, like their [React library](https://docs.knock.app/in-app-ui/react/overview), allowed us to create our own React components and easily interact with the notification feed and user preferences. Because of this, we were able to create multi-channel notifications effortlessly, where we can trigger a “workflow” with variables and allow users to customize on which channels they receive notifications.

```
import { KnockFeedProvider } from "@knocklabs/react-notification-feed";// We'll write this nextimport NotificationToaster from "./NotificationToaster";const NotificationToastProducer = () => {  // An example of fetching the current authenticated user  const { user } = useCurrentUser();  return (    <KnockFeedProvider      apiKey={process.env.KNOCK_PUBLIC_API_KEY}      feedId={process.env.KNOCK_FEED_CHANNEL_ID}      userId={user.id}    >      <NotificationToaster />    </KnockFeedProvider>  );};
```

Knock's React Component library makes setting up new components simple. We're able to maintain control over the code, while still leveraging a powerful notification tool in the backend.

Using the Knock dashboard and its workflow editor with live previews, we built layouts and workflows for each alert, giving users a real-time notification feed powered by Websockets and packaged with React hooks. Once a new notification is live in Knock, we can use the dashboard’s analytics to debug any potential issues and evaluate how our new notifications are performing.  

![Knock allows you to build cross-channel notifications with easy-to-use workflows.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Mn146sKvzy2dVylOAH8Tz%2Fa57d61d36030801d96d2ca90698259e8%2Fimage_326.png&w=1920&q=75)

Knock allows you to build cross-channel notifications with easy-to-use workflows.

And with [Knock’s API](https://docs.knock.app/reference) for managing user notification preferences, we have the ability to update email and web notification behavior without redeploying API infrastructure, making our iteration speed even faster.

![Knock provides a single API for all of your notifications code and observability tools so you can understand how your notifications are sent.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4FiCUI6BdloxkG029YZsSE%2Fee41d5d98080384269609deff8895371%2Fimage_321.png&w=1920&q=75)

Knock provides a single API for all of your notifications code and observability tools so you can understand how your notifications are sent.

Additionally, Knock added value to Vercel internally. Customer success engineers can troubleshoot potential issues while product managers can update notification templates without needing to take time from engineering.

## [Link to heading](#updated-notifications-for-your-vercel-workflow)**Updated notifications for your Vercel workflow**

With customizable workflows, we're able to easily build notifications that work for our users and their workflows. With this release we’re introducing a number of new notification types to help you stay in the loop on your Vercel project. Here are a few highlights.

-   **Notifications on deployment failure.** You will now receive notifications when a deployment in your Vercel project fails. By default you’ll receive these notifications across email and your in-app feed, but you can configure where you want to receive deployment failures within your account settings.
    
-   **Batched domain misconfiguration notifications.** We’ve heard your feedback on domain misconfiguration notifications—they can get noisy. So we’re now using Knock’s [batch function](https://docs.knock.app/designing-workflows/batch-function) to reduce the volume of total notifications you’ll receive regarding domain misconfigurations. This ensures teams receive notifications in a more consumable manner without missing important signals from Vercel.
    

Going forward with our system built on Knock’s flexible infrastructure, we plan to continue iterating in this space. You'll soon see new batched notifications and more notification types, like comments on Preview Deployments, supported across all channels.

Configure your team's notification settings in your Vercel dashboard. [Check out the docs](https://vercel.com/docs/concepts/dashboard-features/notifications) to learn more.

## [Link to heading](#get-started)**Get Started**

Building with Knock's API made it easy for us to get a powerful in-app notification system that met our design, scale, and performance needs, without having to build from the ground up.

Get started with your own Knock notification system by adding the Vercel + Knock integration. When you connect a Vercel project to an account in Knock, Knock will automatically set the `KNOCK_API_KEY` and `KNOCK_PUBLIC_API_KEY` environment variables on your Vercel project.

Vercel's [integration marketplace](https://vercel.com/integrations) is a great way to get started quickly with headless databases, commerce tools, CMSs and more. Or, build APIs into your application without any plugins or added configuration, simply by using [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction). When deployed on Vercel, these are automatically deployed as Serverless Functions. Just push your code to get a powerful, scalable, and secure composable application.