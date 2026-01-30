---
title: "What does Vercel do? "
source: "https://vercel.com/blog/what-is-vercel"
publishedDate: "2023-05-10"
category: "frontend"
feedName: "Vercel"
author: "Justin Gage"
---

8 min read

May 10, 2023

"Technically" newsletter founder Justin Gage explains how Vercel makes building web applications as easy as possible, powered by the frontend cloud.

Vercel builds a **frontend-as-a-service** product—they make it easy for engineers to deploy and run the user facing parts of their applications.

-   Applications have two parts: the frontend and the backend (have I [mentioned this before](https://technically.substack.com/p/the-details-frontends-and-backends)???)
    
-   The frontend is usually **deployed with the backend** on a single server (or set of servers), which means infrastructure to set up and manage
    
-   Vercel lets teams **deploy their frontend stupidly easily**, separately from their backend
    
-   Deploying with Vercel gives you **nice features** like deploy previews, functions as a service, analytics, and more
    
-   Beyond just the frontend, Vercel has been adding cloud-like features like **storage and databases**
    

While how you deployed your frontend was nobody’s business a few years ago, tools like Vercel are now (maybe?) the standard for how teams get their frontends up on the web. The [Technically website](https://technically.dev/) is even built with Vercel!

You may notice unusual enthusiasm for this product from me in this post, but it is not sponsored—I’ve just been using the product for years and really like it.

[

**See for yourself**

Get a step-by-step walkthrough of Vercel.

Take the Tour



](https://vercel.com/product-tour)

## [Link to heading](#what-does-deploying-mean-why-do-i-need-to-do-it-with-my-frontend)**What does deploying mean? Why do I need to do it with my frontend?**

The frontend of your application is the part that your users see. But it’s actually a bit more than that. Your typical frontend codebase does a bunch of things:

-   Builds the visual element of what you’re seeing on a web page, with HTML and CSS
    
-   Handles interactivity and animations via JavaScript
    
-   Makes calls to internal and external APIs to fill pages with data (like a user profile page)
    

Frontends are usually organized as a series of files representing which pages exist, what their structure is, and accompanying JavaScript for handling interactivity, logic, and API calls. We’ve used the analogy of the front of the house (yes, chef) vs. the back of the house, and this sort of works. The FOH is the customer’s interface to the back, making sure orders get to the kitchen, the right food gets back to the customer, etc. 

### [Link to heading](#deeper-look-)**Deeper look**

Some engineering teams stick to what’s called a [**monorepo**](https://vercel.com/resources/monorepos-ebook), where all of the application code—the entire frontend and backend—are all in one giant repository, i.e. one master folder. Others have separate repositories for the frontend and backend, and others yet several repositories for different parts of the backend. Which setup teams choose depend on their priorities and how complex their application is.  

### [Link to heading](#deeper-look)**Deeper look**

However you want to understand the frontend, the important takeaway here is that the frontend code needs to _sit_ somewhere. Developers build the frontend on their laptop and need to put it up on a server somewhere so users on the web can access it. So how do they do that? There are a few options:

1.  Put it up on a dedicated server, separate from your backend
    
2.  Put it up on the same server as your backend
    
3.  Put it up (with or without your backend) on a PaaS like Heroku, Railway, Render, etc.
    

All of these options require a good deal of setup and configuration. The basic requirements include setting up authentication / networking to your local setup and (possibly) the backend server(s), caching your frontend across the world so it’s close to your users, handling DNS so you can have a nice URL to access, and plenty of fun other stuff. I’m not trying to scare you here with terms or concepts you don’t know, there’s just a lot to do.

Vercel, and products like it, are **specifically built for deploying frontends** and making all of the above work as easy as possible.

## [Link to heading](#the-basic-vercel-product)**The basic Vercel product**

Vercel makes it as easy as possible to deploy and use your frontend. Like any software project, I have my frontend code for technically.dev in a GitHub repository. All I need to do to get it up and running on the web is create a Vercel account, give it permissions to my technically.dev repository, and configure the domain name. Boom, your site is live:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F28GFllV6wbKPnC3BEO9ybv%2F6df2066547b072936cb2c24fd6767ba6%2FBlog_Graphic-2.5.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6hNftU1sr7221ni1sv7Wcy%2F721bd345cd510ca8cbc901119f55bd7e%2FBlog_Graphic-2.5-1.png&w=1920&q=75)

Behind the scenes, Vercel has taken that code of mine, put it on servers around the world, put a URL in front of it, and optimized it to run and load fast. But this is just the start!

If I want to make changes to my website, all I need to do is push those changes to my GitHub repo, and Vercel _automatically_ redeploys the site and puts the new code on the server. You get this nice dashboard for each site you have deployed that gives you information on status, recent deploys, and what domains it’s sitting at.  

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3sN9XwX28eRVHfmm2hjTnW%2Fdbcfd31f7c5147582898e80c4349a4ab%2FBlog_Graphic-3.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2NACYToPluYXb0Q14JtOYz%2F66bb9f303463d68820ed87209f68d332%2FBlog_Graphic-3-1.png&w=1920&q=75)

If anything went wrong during your build and the code isn’t working on the server, you can look at the server logs to debug (something you’d normally need to do in your terminal):

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2c10a9FB4C687TNkCidQSp%2Fadfbd5cb67f8f9538fa0a0ce9dad2811%2FBlog_Graphic-4.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5puuiuLRbonIub5HZKhj1h%2F09fa795cce9272bff19a4394254deba9%2FBlog_Graphic-4__1_.png&w=1920&q=75)

Another really nice feature is deploy previews. When you open a new [pull request](https://technically.substack.com/p/whats-version-control-and-github) with changes to your frontend codebase that you’re considering merging / applying, Vercel automatically tries to deploy that code on a _new_ server so you can see how it looks before agreeing to apply those changes. I’m considering a name change for Technically (not really) so I’ve opened up a PR to change the name on the site:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FbjYIluZu4lbTCZKYirbqk%2Fa7211c6d21914af8a023a17b05fbb16c%2FBlog_Graphic-1-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4ZhUsuRwb9TM6vFogJ76QD%2F4ccf631b6c77c0e4fee1b7e90b280b86%2FBlog_Graphic-1.png&w=1920&q=75)

Vercel automatically pre-deployed the new code and created a deploy preview that I can access on the web. Let’s take a look:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F24FDJkk3fZVJVGF2pcr0J1%2F1411b0642f8d4b01d6e8be9310902351%2FBlog_Graphic-4-3.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6pC4nB29WqrcnfBkmWrzfi%2F15138a2c2e93271be3fb7cfe92b76796%2FBlog_Graphic-4-2.png&w=1920&q=75)

Alright this looks silly we should not do this. I knew that already since I developed this locally on my laptop, but this deploy preview made it simple to see on web and confirm. The same holds true for my teammates, who can easily see what this looks like live instead of me sending them screenshots. If I _did_ merge this PR though, Vercel would then take the new code and put it on the production server. This deploy preview feature makes testing new changes incredibly easy and requires basically no configuration whatsoever.

### [Link to heading](#confusion-alert)**Confusion alert**

> If your code is hosted on the GitHub website, why isn’t it “deployed” there? Why can’t my users just access the code on GitHub directly? The answer is complicated, but the basic gist is just that this isn’t what GitHub is set up to do. You’re missing domain handling, exposing the server externally, preview functionality, and all the other nice things Vercel and others provide. There _is_ a seldom talked about feature called [GitHub Pages](https://pages.github.com/) where you can sort of do this, but it’s not feature-rich enough for a real application.

### [Link to heading](#confusion-alert)**Confusion alert**

> Finally, by default, Vercel assigns a random URL to your project so you can access it on the web right away. But you can easily add your own custom domains, like I’ve done here with technically.dev. Fun fact though, you can access an old version of the site at [https://technically-app.vercel.app/](https://technically-app.vercel.app/). 

## [Link to heading](#the-next.js-situation)**The Next.js situation**

Perhaps the most interesting part of Vercel is that they’re the creators and maintainers of [Next.js](https://nextjs.org/), one of the most popular web frameworks on the planet right now for [React](https://technically.substack.com/p/whats-react). Next.js is open source and free, and probably a lot more popular than the strictly commercial Vercel product.

A web framework is a set of little facilities that make it easier to build a web server – especially frontends – without having to write a ton of custom code. The details are beyond the scope of this post, but suffice it to say that basically every modern web application is using some sort of web framework. A few popular ones you may have heard of: 

-   [Django](https://www.djangoproject.com/) or [Flask](https://flask.palletsprojects.com/en/2.3.x/) for Python
    
-   [Ruby on Rails](https://rubyonrails.org/) for Ruby
    
-   [Laravel](https://laravel.com/) for PHP
    
-   [Spring](https://spring.io/) for Java
    

As React has gotten a lot more popular, Next.js popped up as a React-specific web framework (others are [Create React App](https://create-react-app.dev/), [Gatsby](https://www.gatsbyjs.com/), etc.).

Because Vercel is the owner / maintainer of Next.js, they’re able to natively integrate it into their commercial frontend-as-a-service product in a few interesting ways. Along with some nifty performance optimizations, every function in the “api” folder automatically gets deployed as a [serverless function](https://technically.substack.com/p/whats-serverless) in Vercel, which is at least _one_ way to build an easy backend.

## [Link to heading](#vercel-as-a-frontend-cloud)**Vercel as a frontend cloud**

Beyond the frontend-as-a-service offering, Vercel has consistently released supporting features to make it a legitimate place to build your entire application:

-   [**Edge Functions**](https://vercel.com/features/edge-functions): run server side / backend code serverlessly to handle things like authentication, [experimentation](https://technically.substack.com/p/technically-dispatch-what-is-ab-testing), etc. 
    
-   [**Analytics**](https://vercel.com/analytics): statistics and dashboards on your site’s performance and accessibility
    
-   [**CLI / API**](https://vercel.com/docs/rest-api): interact programmatically with Vercel to do things like run deployments, run performance checks, etc.
    

The Edge Function stuff is probably the most important to keep an eye on. Though Serverless and functions as a service aren’t a new concept, Vercel’s implementation is interesting. While your functions on a service like AWS Lambda are typically deployed in one place (a single geographical region), Vercel has those functions running across the globe in multiple locales. According to their team, it’s both faster and cheaper than other providers.

Today, significant applications are still usually deployed manually on servers somewhere (even if via PaaS)—serverless is picking up steam but still not for core backend stuff. Will that change? Maybe!

Taking all of these features into account, it’s probably more accurate today to call Vercel a **frontend cloud**, meaning a collection of services centered on the frontend that make building apps easier. At their conference last week, they announced a bunch of new features that support this story:

1.  **Storage**: simple object storage—think files, videos, etc.—but embedded at “the edge” i.e. on servers across the world close to your users (called “Vercel Blob” which is fun to pronounce)
    
2.  **Databases**: managed databases, starting with a [key-value store and Postgres](https://technically.substack.com/p/the-beginners-guide-to-databases)
    
3.  **Visual editing**: the ability to edit your frontend by just clicking and typing¹
    

If you’re thinking “wow, this sounds like a cloud” you’d be right. A cloud provides managed infrastructure for developers so they can build faster; Vercel is definitely a cloud at this point, but a cloud focused on the [**frontend**](https://technically.substack.com/p/the-details-frontends-and-backends) and abstracting the backend.

There are a few other small announcements around security and code management, but the ones above are the big ones. Over the time I’ve been using it (back when it was called Zeit), it’s been cool to see Vercel evolve from a simple frontend deployer to a proper way to build and run a whole app.  

-   [¹](https://technically.substack.com/p/b86eb8bf-4217-4740-b010-41b8502a9bdf#footnote-anchor-1-75112278) _Sort of. Behind the scenes it’s an integration with your content management system, so some work needs to happen. Nevertheless, it’s cool._