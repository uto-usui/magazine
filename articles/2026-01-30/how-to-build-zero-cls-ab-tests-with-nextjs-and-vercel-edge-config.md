---
title: "How to build zero-CLS A/B tests with Next.js and Vercel Edge Config"
source: "https://vercel.com/blog/zero-cls-experiments-nextjs-edge-config"
publishedDate: "2023-03-23"
category: "frontend"
feedName: "Vercel"
author: "Elijah Cobb"
---

6 min read

Mar 23, 2023

A recipe for powerful, statically-rendered experiments at scale.

A/B testing and experiments help you build a culture of growth. Instead of guessing what experiences will work best for your users, you can **build, iterate, and adapt** **with data-driven insights** to produce the most effective UI possible.

In this article, you'll learn how we built a high-performance experimentation engine for vercel.com using [Next.js](https://nextjs.org/?utm_source=vercel_site&utm_medium=blog&utm_campaign=edge_config_nextjs_experimentation_engine) and [Vercel Edge Config](https://vercel.com/docs/concepts/edge-network/edge-config), allowing our developers to create experiments that load instantly with zero [Cumulative Layout Shift (CLS)](https://vercel.com/docs/concepts/analytics/web-vitals#cumulative-layout-shift-cls) and a great developer experience.

[

**Want to build better experiments?**

We're happy to help.

Get in Touch



](https://vercel.com/contact/sales)

## [Link to heading](#great-experiments-matter)Great experiments matter

Experiments are a way to test how distinct versions of your application perform with your users. With one deployment, you can present different experiences for different users.

While experiments can be incredibly insightful, it's historically been difficult to run great tests on the Web:

-   **Client-side rendering (CSR)** your experiments will evaluate which version of your app a user will see _after_ the page has loaded. This results in poor UX since your users will have to wait for loaders while the experiment is evaluated and eventually rendered, creating layout shift.
    
-   **Server-side rendering (SSR)** can slow page response times as experiments are evaluated on demand. Users have to wait for the experiments along a similar timeline as CSR—but stare at a blank page until all of the work is done to build and serve the page.
    

These strategies end up with a poor user experience and **give you bad data** about your experiments. Because you’re making your load times worse, you are negatively impacting what _should have been_ your control group.

[Milliseconds make millions](https://web.dev/milliseconds-make-millions), so using the right rendering strategies makes a big difference. Slow load times give you inaccurate results and false impressions about your experiments.

![Slow load times have direct impact on user behavior.¹](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F243cg03nECoO2mOq8ie986%2Ff22eba5d2fbf83d899501b3bb9833bcc%2F1920x1004-Blog_Graphic_1-Light.png&w=1920&q=75)![Slow load times have direct impact on user behavior.¹](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1BLH6uUh7cQaHbovneOXsg%2F3c805b296025f96bfda35dd2a33e8d2b%2F1920x1004-Blog_Graphic_1.png&w=1920&q=75)

Slow load times have direct impact on user behavior.¹

## [Link to heading](#defining-the-experiment-engine)Defining the experiment engine

For our engineers who aren’t working with experimentation every day, we wanted a simple, standardized path to effective, high-performance experiments. Our requirements were:

-   Zero impact on end-users
    
-   Automatically keep users in their "experiment bucket" using our feature flag vendor
    
-   Send events to our data warehouse when users have given consent
    
-   Excellent "out-of-the-box" developer experience
    

Using the right tools, we knew we could improve both our internal developer experience _and_ end-user experience.

## [Link to heading](#leveraging-edge-config-for-read-speed)Leveraging Edge Config for read speed

[Vercel Edge Config](https://vercel.com/docs/concepts/edge-network/edge-config) is a JSON data store that allows you to read dynamic data as geographically close to your users as possible. Edge Config reads complete within 15ms [at P99](https://vercel.com/docs/concepts/analytics/web-vitals#how-the-percentages-are-calculated) or as low as 0ms in some scenarios.

middleware.ts

```
import { NextResponse, NextRequest } from 'next/server'import { get } from '@vercel/edge-config'export async function middleware(request: NextRequest) {  if (await get("showNewDashboard")) {    return NextResponse.rewrite(new URL("/new-dashboard", request.url))  }}
```

Using an Edge Config to rewrite to a new dashboard design.

We're leveraging [Statsig's Edge Config Integration](https://vercel.com/integrations/statsig) to automatically populate the Edge Config connected to our project with the experiment’s evaluation rules. We can then fetch our experiments in our code easily.

getExperiments.ts

```
import { createClient } from '@vercel/edge-config'import { EdgeConfigDataAdapter } from 'statsig-node-vercel'import Statsig from 'statsig-node'async function initializeStatsig() {  const edgeConfigClient = createClient(process.env.EDGE_CONFIG)  const dataAdapter = new EdgeConfigDataAdapter({    edgeConfigClient: edgeConfigClient,    edgeConfigItemKey: process.env.STATSIG_EDGE_CONFIG_ITEM_KEY,  })  await Statsig.initialize(process.env.STATSIG_SERVER_KEY, { dataAdapter })}async function getExperiment(userId, experimentName) {  await initializeStatsig()  return Statsig.getExperiment({ userId }, experimentName)}
```

Populating our runtime with our experimentation configuration.

## [Link to heading](#using-next.js-for-high-performance,-flexible-experiences)Using Next.js for high-performance, flexible experiences

As a high-level overview, we are going to:

-   [Create type safety for our code](#creating-experiments-in-code)
    
-   [Pre-render our experiments on the server](#prerendering-experiment-variations)
    
-   [Serve the correct page variations to our users using their cookies](#serving-experiments-to-users)
    
-   [Automatically capture events with a React Context](#measuring-success)
    

### [Link to heading](#creating-experiments-in-code)Creating experiments in code

To create the most predictable developer experience for ourselves and our teammates, we created a typesafe, single source of truth for our monorepo. Each experiment defines possible values for each parameter along with the paths where the experiment is active. The first value in each array is the default value for a parameter.

experiments.ts

```
export const EXPERIMENTS = {  pricing_redesign: {    params: {      enabled: [false, true],      bgGradientFactor: [1, 42]    },    paths: ['/pricing']  },  skip_button: {    params: {      skip: [false, true]    },    // A client-side experiment won't need path values    paths: []  }} as const
```

Creating static types for our source code.

### [Link to heading](#pre-rendering-experiment-variations)Pre-rendering experiment variations

[Dynamic routes](https://nextjs.org/docs/routing/dynamic-routes?utm_source=vercel_site&utm_medium=blog&utm_campaign=edge_config_nextjs_experimentation_engine) allow Next.js users to create page templates that change what they render using parameters in the route. For our purposes, we encode the experiment variations into the page's pathname. We’ll supply that data through Next.js’ powerful data fetching APIs: `getStaticProps` and `getStaticPaths`.

The engine we built offers a wrapped version of `getStaticPaths` which builds the paths for all of the variations of the page. Each path is an encoded version of the hash of the experiment values for that particular path, meaning we store experiment values in the URL itself.

Each experiment parameter has multiple options because a page can have many experiments. [All possible combinations](https://en.wikipedia.org/wiki/Cartesian_product) of experiment values for each path could create long build times if a page has many experiments with many variations. To solve this, we calculate the first `n` combinations with a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) and only pre-render those variations, defaulting to 100 page variations per path.

![Dynamic routes using encoded experiment values for their parameter slugs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3yuf80vtzS92NlBt8ddejo%2F2143354901b1fb4f8808c83ae41ac466%2F1920x1004-Blog_Graphic_2-Light__2_.png&w=1920&q=75)![Dynamic routes using encoded experiment values for their parameter slugs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FX1iTAVfNg5q8DAeekVcr9%2F4d0c8dc651e5c2479491edbffaa32cc5%2F1920x1004-Blog_Graphic_2-Dark__2_.png&w=1920&q=75)

Dynamic routes using encoded experiment values for their parameter slugs.

Paths not generated at build time fall back to Next.js' Incremental Static Generation or [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#fallback-blocking?utm_source=vercel_site&utm_medium=blog&utm_campaign=edge_config_nextjs_experimentation_engine) patterns depending on if you've supplied a `revalidation` interval. Deciding how many pages you want to pre-render is a tradeoff between build time and impact of the delayed initial render for the first visitor to an incrementally static rendered page.

The engine also has a wrapper for `getStaticProps` where we decode the parameter from the URL to get the experiment values to use in our pages. We also made sure to give our wrapper the same type as `getStaticProps` so our teammates could use a familiar API.

Because these are statically generated pages, the values are available at build time. Putting together our engine's `getStaticPaths` and `getStaticProps` wrappers, our code comes out to look something like:

experiments/engine/data-fetchers.ts

```
// Your encoding implementationimport { encodeVariations, decodeVariations } from './encoders'export function experimentGetStaticPaths(  path,  maxGeneratedPaths = 100) {  return (context) => {    const paths = encodeVariations(path, maxGeneratedPaths)    return {      paths,      fallback: 'blocking',    }  }}export function experimentGetStaticProps(pageGetStaticProps) {  return async (context) => {    const { props: pageProps, revalidate } = await pageGetStaticProps(context)	  const encodedRoute = context.params?.experiments    // Read from URL or use default values    const experiments = decodeVariations(encodedRoute) ?? EXPERIMENT_DEFAULTS    return {      props: {        ...pageProps,        experiments      },      revalidate    }}
```

Creating data fetching utilities.

Now, when we go to implement an experiment, we can write:

pages/pricing/\[experiments\].ts

```
export const getStaticPaths = experimentGetStaticPaths("/pricing")export const getStaticProps = experimentGetStaticProps(async () => {  const { prices } = await fetchPricingMetadata()  return {    props: {      prices    }  }})
```

Using our engine's data fetching utilities.

### [Link to heading](#serving-experiments-to-users)Serving experiments to users

To ensure that our users end up on the correct page variations, we leverage [rewrites in Next.js Middleware](https://nextjs.org/docs/api-reference/next/server#static-methods?utm_source=vercel_site&utm_medium=blog&utm_campaign=edge_config_nextjs_experimentation_engine).

-   If a user has visited vercel.com before, the rewrite is powered by the user's existing cookie.
    
-   If a user doesn't have a cookie, the Middleware reads from Edge Config and encodes the values, determining the route for the variation. Thanks to the speed of Edge Config, we know our user won’t have a delayed page load.
    

When you use a rewrite in Middleware, your user still sees `/pricing` in their browser bar even though you served `/pricing/0p0v0`, the statically pre-rendered version of the page with their experiment values.

middleware.ts

```
import { NextResponse } from 'next/server'async function getExperimentsForRequest(req) {  const cookie = getExperimentsCookie(req)  const experiments = cookie     ? parseExperiments(cookie)    : readExperimentsFromEdgeConfigAndUpdateCookie(req)  return experiments}export async function middleware(req) {  const experiments = await getExperimentsForRequest(req)  const path = getPathForExperiment(experiments, req)  return NextResponse.rewrite(new URL(path, req.url))}export const config = {  matcher: '/pricing'}
```

The cookie's value is the experiment parameters assigned through the [Statsig Edge Config integration](https://vercel.com/integrations/statsig) that we set up earlier. Our users will end up in "buckets" based on the values that our Statsig integration assigns them, intelligently handling which users receive which experiments.

It's possible for a client's cookie to go stale and end up out of sync with our experiment configuration. We'll get into how we keep the cookie fresh [in a moment](#ensuring-experiments-stay-fresh).

A user receives a page that was rendered on the server so our React components that use our engine's `useExperiment` hook will already know their values, resulting in no layout shift.

Pricing.tsx

```
function Pricing({ prices }) {  const { enabled, bgGradientFactor } = useExperiment("pricing_redesign")  return (    <div>      <h1>Pricing</h1>      {        enabled ?           <GradientPricingTable factor={bgGradientFactor} prices={prices} />           : <PricingTable prices={prices} />      }      </div>    )}
```

Using a hook for a statically rendered experiment.

Now that we have the right UX, we need to collect, explore, and analyze data about our experiments to how they are performing.

### [Link to heading](#measuring-success)Measuring success

Using our typesafe helpers from before, we built a React context that holds the experiment values for the current page, automatically reporting an `EXPERIMENT_VIEWED` event to our data warehouse.

analyticsContext.ts

```
export function trackExperiment(experimentName) {  analytics(EXPERIMENT_VIEWED, getTrackingMetadataForExperiment(experimentName))}const Context = createContext()export function ExperimentContext({  experiments,  path,	  children}) {  useEffect(() => {    for (const experimentName of getExperimentsForPath(path)) {      trackExperiment(experimentName);    }  }, [])  return (    <Context.Provider experiments={experiments}>      {children}    </Context.Provider>  )}
```

Building a React Context to easily track analytics.

After we’ve collected enough data, we can visit our internal data visualization tools to evaluate the performance of our experiments and confidently decide what to ship next.

## [Link to heading](#handling-client-side-experiments)Handling client-side experiments

Not every experiment will happen on the first page load so we still need to be able to handle client side experiments. For example, an experiment can be rendered in a modal or pop-in prompt.

In these cases, we use our client-side React hook since we don't have to worry about the initial loading experience.

components/PricingModal.ts

```
function PricingModal() {  // Fully-typed `skip` from EXPERIMENTS constant under the hood   const { skip } = useClientSideExperiment("skip_button")  return (    <Modal>      <Modal.Title>Invite Teammates</Modal.Title>      <Modal.Description>Add members to your team.</Modal.Description>      <Modal.Button>Ok</Modal.Button>      {skip ? <Modal.Button>Skip</Modal.Button> : null}    </Modal>  )}
```

With this hook, we read directly from the cookie to find out what experimentation bucket our user belongs to and render the desired UI for that experiment. We won’t need server-side rendering, static generation, or routing for these experiments since the user is already interacting with our UI.

## [Link to heading](#ensuring-experiments-stay-fresh)Ensuring experiments stay fresh

It’s possible for a user to end up with a stale or outdated cookie in their browser while we update our experiments behind the scenes. To fix this, we keep cookies warm with a background fetcher that has an interval of 10 minutes.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7BnSMZt2PEO6rU9rbH84xx%2F925922d181a5c73b5d9947f80df9bafb%2F1920x1004-Blog_Graphic_3-Light__2_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3NsoupC7B8VwCOShvPs4eO%2Fbc7d504a8aaba757a7a65632a3d3c7c1%2F1920x1004-Blog_Graphic_3-Dark.png&w=1920&q=75)

Because we are using an [Edge Function](https://vercel.com/docs/concepts/functions/edge-functions) combined with an [Edge Config](https://vercel.com/docs/concepts/edge-network/edge-config), we can trust that this background refresh executes lightning fast, avoiding cold starts and leveraging Edge Config's instant reads.

## [Link to heading](#effective-experiments,-every-time)Effective experiments, every time

With Next.js and Edge Config, we've built an experimentation engine where:

-   Our users won’t experience Cumulate Layout Shift as a result of an experiment.
    
-   We can run multiple page and component-level experiments per page and across pages.
    
-   We can ship and iterate on experiments at Vercel more quickly and safely.
    
-   We can collect high-value knowledge on what works best for our users without sacrificing page performance.
    

For the past few months, we’ve shipped many different zero-CLS experiments on [vercel.com](http://vercel.com/) and we’re excited to continue improving your experience with new insights.

[

**Build better experiments**

Get started today.

Let's Talk



](https://vercel.com/contact/sales)

¹ ["Milliseconds Make Millions" report, Deloitte Digital](https://www2.deloitte.com/content/dam/Deloitte/ie/Documents/Consulting/Milliseconds_Make_Millions_report.pdf)