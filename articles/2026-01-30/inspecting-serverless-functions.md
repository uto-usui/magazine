---
title: "Inspecting Serverless Functions"
source: "https://vercel.com/blog/functions-tab"
publishedDate: "2019-11-18"
category: "frontend"
feedName: "Vercel"
author: "Max Rovensky"
---

1 min read

Nov 18, 2019

After deploying a static frontend to Vercel, some projects might make use of Serverless Functions to feed data from.

Creating Serverless Functions is as simple as adding an [API directory](https://zeit.co/docs/v2/serverless-functions/introduction/) in your project, and today inspecting them became just as comfortable with the new "Functions" tab from your Deployment Overview.

## [Link to heading](#function-details)Function Details

Creating a blazing fast web app is not only a matter of having a static frontend, but also of ensuring your API is not bloated in size, does not consume too many computational resources, and is responding fast.

All of this information can now be accessed in a "Functions" tab available from every deployment overview.

![The most important details about your Serverless Functions, all at one glance.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7s4UDXOewuyDEjAwWLMecS%2F42f754780f15d7846091f784aa5f1bc3%2Ffunction-details.png&w=1920&q=75)

The most important details about your Serverless Functions, all at one glance.

## [Link to heading](#realtime-requests)Realtime Requests

Often it's necessary to follow along with the invocations – and the logs printed as a result – of your Serverless Functions to detect inconsistencies in their behavior.

With the new "Functions" tab, this information is now only a click away.

![A real-time stream of all requests targeting your Serverless Function.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F10I7vL8vyQevm40ArktFGG%2Fc83541c025f2a7b6e46fc019e780ead1%2Frealtime-requests.png&w=1920&q=75)

A real-time stream of all requests targeting your Serverless Function.

## [Link to heading](#failed-requests)Failed Requests

Once your Serverless Functions are running in production, it is a vital focus of every developer to ensure they will continue smoothly, without interruption.

To make this process easier, we now also show Failed Requests right in the UI.

![A list of all requests that have not succeeded in the past.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2CcixKwh27Hq2ILX3reGMD%2F8c7e7087d4d8b159df44e6389f330057%2Ffailed-requests.png&w=1920&q=75)

A list of all requests that have not succeeded in the past.

In this section, all requests from which your Serverless Function has thrown an unexpected error will be stored and displayed for up to 30 days.

## [Link to heading](#conclusion)Conclusion

Thanks to the new **Functions** tab on the dashboard, retrieving the most crucial details about your Serverless Functions is now easier than ever.

This is just another one of several features we are planning to launch to support advanced use cases of Serverless Functions on Vercel.

[Let us know what you think](mailto:support@vercel.com) about this change!