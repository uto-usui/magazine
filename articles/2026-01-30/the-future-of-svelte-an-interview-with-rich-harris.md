---
title: "The future of Svelte, an interview with Rich Harris"
source: "https://vercel.com/blog/the-future-of-svelte-an-interview-with-rich-harris"
publishedDate: "2021-12-15"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

6 min read

Dec 15, 2021

## [Link to heading](#highlights-from-the-conversation--)Highlights from the conversation  

### [Link to heading](#tell-us-about-your-first-popular-project.-what-was-it-like-going-from-building-a-project-for-fun-to-seeing-a-lot-of-people-use-it—and-how-does-that-change-the-dynamic-of-building-open-source-)**Tell us about your first popular project. What was it like going from building a project for fun to seeing a lot of people use it—and how does that change the dynamic of building open source?**

**Rich:** 'Popular' is definitely a relative term, but the first big project that I worked on was actually Svelte's predecessor. It was a thing called Ractive, which I released the first version of in 2013. It actually came out about the same time as React. I remember I was working on it and getting ready for a public release, and the React announcement appeared on Hacker News a month before we were ready. I remember thinking, _Ugh, there's no point now. What a waste of time._

But I launched it and it had a pretty good reception. React was not yet the thing that everyone had to do, and so the market hadn't decided yet. For a long time, I harbored this fantasy that Ractive could be a competitive project to React. I really love that project. It is my first big open source endeavor, and I poured my heart and soul into it. And it got users.

What is kind of hard to see if you're not an open-source maintainer is that a project doesn't have to be huge in order for the amount of activity on the project to become overwhelming for a maintainer. I was spending all my evenings and weekends on it. It was starting to get users. It was even starting to get used by companies. It was becoming kind of unsustainable for me to work on to the point that I got totally burned out on it. I think that was my first introduction to the realities of being an open-source maintainer.

It's what taught me how to deal with having users and also how to approach problems like, how do you get contributors on board? How do you get them to think the same direction and work on the project with a unified front? And also how do you say no to feature requests? In every way, it was a baptism of fire in the inner workings of open source, and it laid the foundation for Svelte several years later.

### [Link to heading](#with-svelte,-you're-leading-an-amazing-project-and-community.-why-join-vercel,-and-what-does-that-mean-for-the-future-of-svelte-)With Svelte, you're leading an amazing project and community. Why join Vercel, and what does that mean for the future of Svelte?

**Rich:** I think it's a really good outcome. It's not something that I would necessarily have anticipated. If you'd asked me a year ago if this was going to happen, I would've been very surprised at this outcome. But I thought long and hard about what it's going to mean for the project and I think it's an incredibly positive development.

It means, for example, there's a lot of people who would like to use Svelte for their own products, and they haven't been able to because there's the whole bus factor thing. They're worried a project without any real financial backing is just going to disappear. Some of those people are now starting to turn around and say, _Well okay, it has a full-time engineer. Vercel is clearly excited about Svelte and is investing real resources into Svelte._

Companies feel they're able to use Svelte. In many cases, their engineers already wanted to use Svelte, and now they're able to do that. It means people can start working on Svelte knowing they're likely to be able to get hired as a Svelte developer. Because of all of those things, the community is likely to grow. We're going to get a better idea of what the community needs. We're going to get more people contributing to other parts of the ecosystem, component libraries, all of that stuff. It feels like the beginning of this very virtuous cycle. Svelte was already growing very quickly, but I think this is going to accelerate things quite considerably.

### [Link to heading](#how-would-you-sell-the-vision-of-svelte-or-sveltekit-to-a-cto-or-senior-leadership-)How would you sell the vision of Svelte or SvelteKit to a CTO or senior leadership?

**Rich:** It kind of doesn't matter what you're building. Your competitive advantage is essentially limited by how fast you can ship stuff, and SvelteKit will let you ship stuff faster. That is what it boils down to.

I believe moving from React to Svelte will allow you to write stuff faster. We have a whole thesis about how Svelte is a UI language that is designed explicitly for solving this problem and it allows you to write things in a more idiomatic way. But even leaving that aside, if you move from rolling your own application structure around a component framework, you're going to be doing a hell of a lot of work and you're going to have all of these undocumented bits and pieces. It's one of these things that's going to succumb to a bit of rot over time.

If you, instead of starting at the component-framework level, start at the application- framework level—be that [Next.js](https://vercel.com/solutions/nextjs) or [Nuxt](https://nuxtjs.org/) or [SvelteKit](https://vercel.com/changelog/sveltekit-projects-can-now-be-deployed-with-zero-configuration)—then immediately you've taken a huge chunk of maintenance off your plate. You can start building stuff much, much quicker with one of those frameworks.

### [Link to heading](#sveltekit-is-a-framework-that's-edge-first.-it's-trying-to-optimize-for-running-code-as-close-to-your-customers-as-possible.-how-does-that-play-into-the-design-of-the-framework-and-some-of-the-decisions-that-you-make-for-what-you-include-or-what-you-don't-include)SvelteKit is a framework that's edge-first. It's trying to optimize for running code as close to your customers as possible. How does that play into the design of the framework and some of the decisions that you make for what you include or what you don't include?

**  
Rich:** From day one, we thought, _How can we build this framework in such a way that it's going to work on any of the platforms that exist today but also future platforms that don't exist yet?_

We support version one of the [Vercel File System API](https://vercel.com/docs/file-system-api). Version two is going to allow us to take those individual functions we're generating for the different parts of the app and map them to [functions that run at the edge](https://vercel.com/features/edge-functions). That's going to mean if you're building an app with SvelteKit, even if it gets absolutely huge, then a user in some remote part of the world is going to hit an edge server very close to them. It's going to run just the code necessary to handle that specific request and then it's going to come back to them.

In many cases, the page will be pre-rendered anyway, because that's a very easy thing to configure in SvelteKit, and this is where we think that all of this stuff is going. You build your app in one very easy to develop way. You have this cohesive codebase that isn't tied to any one platform. Then, depending on how capable the platform is, it will optimize the experience for users based on the platform's capabilities. And in the case of Vercel where we have this global CDN and we have this global [Edge Network,](https://vercel.com/features/infrastructure) we can really push that user experience pretty far.  

**Watch the full interview to see why developers love Svelte and try** [**Svelte on Vercel**](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fsveltekit&template=sveltekit&id=67753070&b=main&from=templates) **today.**

## [Link to heading](#)