---
title: "Building a viral application to visualize train routes"
source: "https://vercel.com/blog/building-a-viral-application-to-visualize-train-routes"
publishedDate: "2022-09-10"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

2 min read

Sep 10, 2022

When inspiration struck [Benjamin Td](https://twitter.com/_benjamintd) to visualize train routes across Europe, he created a Next.js application on Vercel in the moment of inspiration. To his surprise, his project ended up generating over a million views, reaching the top of Hacker News and going viral on Twitter.

## [Link to heading](#scale-to-vacation)Scale to vacation

Right after launching Chronotrains, Benjamin went on vacation. [It went viral](https://twitter.com/_benjamintd/status/1552983329116504064). And with [Next.js on Vercel](https://vercel.com/solutions/nextjs), he peacefully enjoyed his vacation.

> I posted Chronotrains and went on vacation. By the time I came back, there were more than a million visits. The site was quoted by politicians and newspapers. It started debates about infrastructure, public policy, green transportation, and rail service quality in many different languages. I never had to think about load or response times.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4sCmCmUDDUJQTzsXhuG0Km/03204880f9003de62540673c2afa1e13/yb0tdSZm_400x400.jpg)
> 
> **Benjamin Td**

Benjamin’s project was called [Chronotrains](https://www.chronotrains.com/) – an interactive map showing how far you can travel from each station in Europe in less than 5 hours. Benjamin knew he needed an easy way to get a fullstack application online, including support for deploying API Routes that could cache data about the train routes, so he chose Next.js on Vercel.

## [Link to heading](#how-chronotrains-works)How Chronotrains works

Every mouse movement on Chronotrains triggers a network request to get to corresponding geometries for the hovered stations. Using Next.js API Routes deployed as Vercel Functions, Benjamin was able to [easily cache](https://github.com/benjamintd/chronotrains/blob/fe9cca3915b9236a2b3d00989acbb799163bcb58/src/pages/api/stations.ts#L47-L48) the “isochrone” results on Vercel’s Edge Network for optimal response times and to ensure the experience was seamless.

![Visualizing different train route permutations with Chronotrains.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7G4uZVgDspLTw4F8j2MLjL%2Fd7dc8aa9da057b7e51e3c51cb6b77bc8%2FCleanShot_2022-09-09_at_21.04.01.gif&w=1920&q=75)

Visualizing different train route permutations with Chronotrains.

Each of the geometries is pre-computed using scripts that map travel times between different pairings of stations. This builds a graph of all possible journeys between train stations for different durations between one to five hours. The results of these computations are stored in a PostgreSQL database hosted with [Supabase](https://vercel.com/integrations/supabase).

Chronotrains also takes advantage of [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration) to help reduce the load on the Postgres database. This helped Chrontrains scale even when there were thousands of visitors viewing the site at the same time. With this architecture, there was at most one request per station per day. Benjamin could make updates to the database peacefully without worrying about scaling the frontend.

> I’ve been a Vercel user for years and really love the platform. Vercel makes it easy for me to start new projects and scale them with ease. This helps me validate ideas quickly.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4sCmCmUDDUJQTzsXhuG0Km/03204880f9003de62540673c2afa1e13/yb0tdSZm_400x400.jpg)
> 
> **Benjamin Td**

The code for Chronotains is now [open source](https://github.com/benjamintd/chronotrains). [Check out the site](https://www.chronotrains.com/) and [follow Benjamin](https://twitter.com/_benjamintd) for more updates.