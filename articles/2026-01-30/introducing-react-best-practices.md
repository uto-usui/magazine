---
title: "Introducing: React Best Practices"
source: "https://vercel.com/blog/introducing-react-best-practices"
publishedDate: "2026-01-14"
category: "frontend"
feedName: "Vercel"
author: "Shu Ding"
---

3 min read

Jan 14, 2026

We've encapsulated 10+ years of React and Next.js optimization knowledge into [`react-best-practices`](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices), a structured repository optimized for AI agents and LLMs.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F13SpJ9tCmesIoWp4BrT2fj%2Fdecbb82d459d4cf65a480eabc1487f8b%2Fwl.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1KJreWc9ksG1QLoQtEl6Ll%2Fa6c9e931d279441230e1c633f3a99364%2Fwd.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F14aMyBW08k2S4GJM0NsG25%2F7605d0aff8d41f9386cc3e36d39d972a%2Fml.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3q2aDCd4FPAJF4F5gNMCq2%2F9a6547d672dd572977d7af5e7190250c%2Fmd.png&w=1920&q=75)

React performance work is usually, well, reactive. A release goes out, the app feels slower, and the team starts chasing symptoms. That’s expensive, and it’s easy to optimize the wrong thing.

We’ve seen the same root causes across production codebases for more than a decade:

-   Async work that accidentally becomes sequential
    
-   Large client bundles that grow over time
    
-   Components that re-render more than they need to
    

The “why” here is simple: these aren’t micro-optimizations. They show up as waiting time, jank, and repeat costs that hit every user session.

So, we put together this React best practices framework to make those problems easier to spot and faster to fix.

### [Link to heading](#the-core-idea:-ordering)The core idea: ordering

Most performance work fails because it starts too low in the stack.

If a request waterfall adds 600ms of waiting time, it doesn’t matter how optimized your `useMemo` calls are. If you ship an extra 300KB of JavaScript on every page, shaving a few microseconds off a loop won’t matter.

Performance work also compounds. A small regression you ship today becomes a long-term tax on every session until someone pays down the debt.

So the framework starts with the two fixes that usually move real-world metrics first:

1.  Eliminate waterfalls
    
2.  Reduce bundle size
    

Then it moves on to server-side performance, client-side fetching, and re-render optimization.

It includes 40+ rules across 8 categories, ordered by impact, from CRITICAL (eliminating waterfalls, reducing bundle size) to incremental (advanced patterns). ‍​‌ ‌ ‌

## [Link to heading](#what-else-is-inside)What else is inside?

The repository covers eight performance categories:

-   Eliminating async waterfalls
    
-   Bundle size optimization
    
-   Server-side performance
    
-   Client-side data fetching
    
-   Re-render optimization
    
-   Rendering performance
    
-   Advanced patterns
    
-   JavaScript performance
    

Each rule includes an impact rating (CRITICAL to LOW) to help prioritize fixes, plus code examples showing what breaks and how to fix it.

For example, here’s a common pattern that blocks unused code:

_Incorrect (blocks both branches):_

```
async function handleRequest(userId: string, skipProcessing: boolean) {  const userData = await fetchUserData(userId)  if (skipProcessing) {    // Returns immediately but still waited for userData    return { skipped: true }  }  // Only this branch uses userData  return processUserData(userData)}
```

_Correct (only blocks when needed):_

```
async function handleRequest(  userId: string,  skipProcessing: boolean) {  if (skipProcessing) {    return { skipped: true }  }  const userData = await fetchUserData(userId)  return processUserData(userData)}
```

Individual rule files compile into `AGENTS.md`, a single document that your agents can query when reviewing code or suggesting optimizations. It’s designed to be followed consistently, including by AI agents doing refactors, so teams can apply the same decisions across a large codebase.

## [Link to heading](#how-these-practices-were-collected)How these practices were collected

These aren’t theoretical. They come from real performance work on production codebases.

A few examples:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5klVTrwVHBbwRXeifeHmAd%2F1b866288fb2c9fb9f22301299348d94a%2FCleanShot_2026-01-14_at_09.28.52_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6QQUcoDjltaztz2UcllNeQ%2F09f94994f6851f6dd5cf4c6785f3f911%2FCleanShot_2026-01-14_at_09.46.22_2x.png&w=1920&q=75)

**Combining loop iterations**

A chat page was scanning the same list of messages eight separate times. We combined it into a single pass, which adds up when you have thousands of messages.

**Parallelizing awaits**

An API was waiting for one database call to finish before starting the next, even though they didn’t depend on each other. Running them at the same time cut the total wait in half.

**Lazy State Initialization**

A component was parsing a JSON config from `localStorage` on every render, even though it only needed it once for state initialization. Wrapping the it in a callback (`useState(() => JSON.parse(...))`) eliminated wasted work.

### [Link to heading](#using-react-best-practices-in-your-coding-agent)Using `react-best-practices` in your coding agent

These best practices are also packaged up as [Agent Skills](https://github.com/vercel-labs/agent-skills) that install into Opencode, Codex, Claude Code, Cursor, and other coding agents. When your agent spots cascading `useEffect` calls or heavy client-side imports, it can reference these patterns and suggest fixes.

```
npx add-skill vercel-labs/agent-skills
```

Check out the [`react-best-practices`](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) repository.