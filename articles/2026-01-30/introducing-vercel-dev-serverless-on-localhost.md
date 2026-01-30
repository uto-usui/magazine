---
title: "Introducing `vercel dev`: Serverless, on localhost"
source: "https://vercel.com/blog/vercel-dev"
publishedDate: "2019-04-30"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

3 min read

Apr 30, 2019

Bring the frontend cloud to your local machine for a seamless development experience.

Vercel was born out of the idea that deploying a website could be much simpler. You only have to run a single command: `vercel` – that is all.

With our [GitHub](https://vercel.com/docs/git/vercel-for-github) and [GitLab](https://vercel.com/docs/git/vercel-for-gitlab) integrations, we enabled deploying on every `git push`, and teams to manage staging and production by simply merging pull requests.

Not only did Vercel make deployments effortless, it made them scalable and global by default. Thanks to monorepo support, you could develop static websites and [serverless functions](https://vercel.com/docs/serverless-functions/introduction) within the same repository.

**Today, we are excited to announce one command to run it all on localhost:** **`vercel dev`****.**

## [Link to heading](#single-command-local-development)Single-command local development

Typically, developing a website or application involves a series of steps:

-   Cloning repositories
    
-   Fetching packages
    
-   Synchronizing and matching ports
    
-   Downloading the right runtime for each programming language
    
-   And so on...
    

Even for modern projects, we often need to look up the `README.md` file for instructions about installing dependencies, and then tell a package manager to run developer scripts.

**Vercel gives you a different contract. It is always** **`vercel dev`****.**

## [Link to heading](#no-more-control+c)No more Control+C

When you work with servers, the developer workflow is quite tedious. You have to run a process, find the port, then make your changes, then kill the process (usually with Control+C)...

When you work with **modern frontend frameworks,** your HTML, CSS, and client-side JavaScript **hot-reloading** is expected instead.

When you introduce [API endpoints](https://nextjs.org/docs/api-routes/introduction) written as serverless functions, we now also have the advantage of bringing live reloading to your backend. `vercel dev` ensures that every single request builds and runs the latest version of your code (yes, like `.php` for every language).  

  
**Note:** Using Next.js with `next dev` will run both your front-end and serverless functions already. You do not need to use `vercel dev`.

### [Link to heading](#gatsby-and-node.js-functions)Gatsby and Node.js Functions

If you are building a static site using a tool like [Gatsby](https://www.gatsbyjs.org/), all you need to do is add the command you would normally use to a `dev` script in `package.json`...

```
{  "scripts": {    "dev": "gatsby develop -p $PORT"  }}
```

Once that is completed, the tool (in this case `gatsby develop`) is invoked automatically.

The [Gatsbygram](https://github.com/gatsbyjs/gatsby/tree/master/examples/gatsbygram) example showcases this really well:

### [Link to heading](#go-functions-with-static-html)Go Functions with static HTML

If you chose to write a backend in [Go](https://golang.org/), there are no changes to be made in order for your project to work with `vercel dev`, you just run the command:

### [Link to heading](#node.js-and-headless-chrome)Node.js and headless Chrome

Even if your application is spawning a instance of [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) (like [puppeteer](https://github.com/GoogleChrome/puppeteer)), local development will be very smooth, as `vercel dev` emulates production closely:

### [Link to heading](#static-sites)Static Sites

As a bonus, you will be glad to know that `vercel dev` also acts as a substitute for [serve](https://github.com/vercel/serve) out of the box. Any time you want to serve a directory quickly, you know what to reach for:

## [Link to heading](#get-started)Get Started

`vercel dev` is available as part of the latest version of [Vercel CLI](https://vercel.com/cli). For more details, check out [its documentation](https://vercel.com/docs/serverless-functions/introduction#local-development) including [the list](https://vercel.com/docs/build-step#framework-preset) of optimized frameworks.

## [Link to heading](#let's-develop-together)Let's develop together

We want to hear from you and have set up a [dedicated feedback](https://vercel.com/support) form to learn more about the different ways in which you would like to see `vercel dev` improve: Which technologies, platforms, and frameworks you would like us to support, or any hiccups or slow paths you run into.

Furthermore, we also set up a [FAQ page](https://vercel.com/docs/platform/frequently-asked-questions) containing several common questions that might come up when using `vercel dev` and their answers.

And as always, you are invited to [join our community](https://github.com/vercel/vercel/discussions) and drop the team a note.