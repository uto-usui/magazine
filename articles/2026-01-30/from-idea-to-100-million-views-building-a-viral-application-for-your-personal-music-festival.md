---
title: "From idea to 100 million views: Building a viral application for your personal music festival"
source: "https://vercel.com/blog/from-idea-to-100-million-views-instafest-music-festival-application"
publishedDate: "2022-12-12"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

2 min read

Dec 12, 2022

[Instafest](https://www.instafest.app/) allows users to quickly create a festival poster from their top Spotify, Apple Music, and Last.fm artists. [Anshay Saboo](https://twitter.com/AnshaySaboo), a Computer Science student at USC, used Next.js and Vercel to launch Instafest fast and scale to **500,000 new users per hour**, gaining millions of users and going viral on Twitter, TikTok, and more.

> I never expected Instafest to grow as quickly as it did. I couldn’t believe how well Vercel and Next.js handled the enormous scale with ease.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/CiTpD473EEpkDx5lWJzMR/e60996ad9c7a8550795cff169cf2d145/Dq34xw44_400x400.jpg)
> 
> **Anshay Saboo,** Creator of Instafest

## [Link to heading](#launching-instafest)Launching Instafest

Instafest launched on November 22nd, 2022. It started small, with only 100-150 users per hour on the first day. It grew quickly from there, reaching 500 users per hour on the second day and 2,000 on the third. By the following Sunday, the app was gaining **70,000 users per hour**.

![Using Vercel Monitoring to visualize traffic to Instafest during peak virality.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2f0Z0JogBqBmIGIZjGTR3P%2Ff221a870df765210343e37473f05f7eb%2FFrame_1.png&w=1920&q=75)![Using Vercel Monitoring to visualize traffic to Instafest during peak virality.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5TSRZNNjQMUzXXdvSQSP6r%2Fc312cd3f3b73940454e47861373bed03%2FFrame_1__1_.png&w=1920&q=75)

Using Vercel Monitoring to visualize traffic to Instafest during peak virality.

The site continued to gain popularity, with new features being added daily. After being shared on social media by celebrities like QuestLove, rapper 24KGoldn, director Edgar Wright, and YouTuber Matt King, the site continued to grow. At it’s peak, Instafest was serving 500,000 new users per hour and saw over 100 million page views in that week.

## [Link to heading](#using-next.js-for-high-performance-react-sites)Using Next.js for high-performance React sites

Anshay knew he wanted to use React, so he picked [Next.js](https://vercel.com/docs/concepts/next.js/overview) to “make the application snappy and responsive”. The Instafest website needed to handle loading custom web fonts and displaying fast-loading images of the festival posters. By using Next.js, Anshay was able to use the [built-in font optimization](https://nextjs.org/docs/basic-features/font-optimization) and [image component](https://nextjs.org/docs/basic-features/image-optimization) to keep the site performance fast and prevent layout shift.

By using the image component, Next.js automatically optimizes and serves images in modern formats (like `.avif` and `.webp`) to reduce the size of images. This helps pages load faster and provide a better user experience for Instafest viewers. Additionally, Next.js automatically generates responsive images, which means that it creates multiple versions of each image at different sizes. This allowed Instafest to serve the most appropriate sized image for each user's device, further improving performance.

## [Link to heading](#deploying-next.js-with-vercel)Deploying Next.js with Vercel

Anshay needed to quickly get his Next.js site online fast, so he turned to Vercel to go from idea to global application in seconds.

> Vercel was the key to Instafest’s successful launch. Being able to easy deploy code, as well as instantly rollback when things went wrong, was crucial.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/CiTpD473EEpkDx5lWJzMR/e60996ad9c7a8550795cff169cf2d145/Dq34xw44_400x400.jpg)
> 
> **Anshay Saboo,** Creator of Instafest

Thanks to Vercel Functions, the Next.js application was able to scale automatically, without needing to provision additional servers, add load balancers, or pay for more expensive hardware. Instafest was highly available, everywhere around the world, visualized below with [Vercel Monitoring](https://vercel.com/docs/concepts/dashboard-features/monitoring) broken down by Edge Network regions.

![Using Vercel Monitoring to visualize traffic segmented by Edge Network region.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3F0ooKRFFw6W0cFM5IITNr%2F4bc0aca7faed094ca778752694f700bd%2FFrame_3__3_.png&w=1920&q=75)![Using Vercel Monitoring to visualize traffic segmented by Edge Network region.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FxlCdZGpcbKnoZMCoHuUwH%2F7a1c129fab7973489a5b756891fe6005%2FFrame_3__4_.png&w=1920&q=75)

Using Vercel Monitoring to visualize traffic segmented by Edge Network region.

Instead, Anshay was able to take advantage of Vercel’s global Edge Network to easily cache both static assets and Function responses. Peaking at 6 million users per day, Instafest never had downtime or showed any increase in latency under load. Using [Vercel Analytics](http://vercel.com/analytics), Anshay could visualize the real user performance of Instafest visitors.

![Using Vercel Analytics to visualize application performance from Core Web Vitals field data.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FIZogOp194Fr10rqRqbjIG%2Ff89b3d6f945f0b6215853a8a620d9ec9%2FFrame_4__1_.png&w=1920&q=75)![Using Vercel Analytics to visualize application performance from Core Web Vitals field data.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4fdj6jGSsXubN8Cb8bCDIb%2Fc3a4a7c123f9c699547b8b03ca319acb%2FFrame_4.png&w=1920&q=75)

Using Vercel Analytics to visualize application performance from Core Web Vitals field data.

Learn more about [Next.js on Vercel](https://vercel.com/docs/concepts/next.js/overview) or get started today using one of our [Next.js templates](http://vercel.com/templates/next.js).