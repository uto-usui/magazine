---
title: "Achieving feature rollouts with ultra-low latency and zero impact to conversion"
source: "https://vercel.com/blog/beyond-menu-scaling-with-hypertune-and-vercel"
publishedDate: "2024-08-01"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

5 min read

Aug 1, 2024

How Beyond Menu solved feature flagging and A/B testing challenges in serverless environments with Hypertune and Vercel’s Edge Config.

Beyond Menu is a popular food delivery service in the US that connects restaurants and diners. Their Next.js app is deployed on Vercel and serves millions of hungry visitors every month.

To scale their development, they decided to adopt feature flags for gradual rollouts, instant rollbacks, A/B testing, trunk-based development and easier collaboration both internally and with beta users.

They knew they needed to evaluate feature flags and A/B tests on both the server and the client. And since they used the App Router, the solution needed to work with React Server Components, Client Components and different rendering modes like static, dynamic and partial prerendering.

At Beyond Menu, every millisecond impacts conversion, so they turned to Vercel's Edge Config and Hypertune for seamless feature flag management without layout shifts.

## [Link to heading](#understanding-the-challenges-of-feature-flag-solutions)Understanding the challenges of feature flag solutions

The team at Beyond Menu tried traditional tools for feature flags and A/B testing, but they weren’t optimized for their Next.js and Vercel setup.

### [Link to heading](#unreliable-flag-updates-at-the-edge)Unreliable flag updates at the edge

On the server, the solution needed to work in serverless and edge environments, specifically Vercel’s Node.js and Edge runtimes.

But traditional feature flag and A/B testing SDKs couldn’t reliably get flag updates in a serverless environment. They tried to fetch updates in the background but serverless instances were frozen between requests, preventing this. So flags couldn’t be updated.

The serverless instances were also short-lived so SDK initialization became a bottleneck, adding latency to requests.

### [Link to heading](#layout-shift-and-ui-flickers)Layout shift and UI flickers

In the browser, they needed to use flags in the first client-side render.

But traditional tools had separate SDKs for the server and the browser, and the browser SDK initialized independently of the main page load, causing layout shift and UI flickers, degrading the end-user experience.

### [Link to heading](#inflexible-feature-targeting-and-a/b-testing)Inflexible feature targeting and A/B testing

As a two-sided marketplace, they needed the flexibility to target features and run A/B tests not just for logged-in users, but for anonymous visitors, restaurants, hostnames, etc.

However, traditional tools were primarily designed to target features and run A/B tests for logged-in users only, making this difficult.

They also needed a solution for both feature flags and A/B testing. But traditional tools treated these separately, so feature rollout logic was fragmented across different flags and systems that needed to be wrangled together. This added complexity and made feature rollouts difficult to manage.

## [Link to heading](#implementing-edge-config-for-zero-latency-reads)Implementing Edge Config for zero latency reads

They finally tried [Hypertune](https://www.hypertune.com/) and it was a perfect fit for their Next.js and Vercel setup.

They only needed to install one SDK that works across the server and the client, making it easy to use flags anywhere in their Next.js app.

On page load, they hydrate the SDK in the browser from the state of the SDK on the server, so they can use flags in the first client-side render with no layout shift or UI flickers.

The SDK is optimized for serverless and edge environments like Vercel’s Edge runtime. It evaluates flag logic, including A/B tests, in memory. And it exposes a method to refresh flag logic, that they call on every request, with configurable caching to only fetch updates if needed. This minimizes latency and bandwidth, maximizing performance and efficiency.

By default, the SDK initializes and fetches updates from Hypertune Edge in typically less than 25ms, but Beyond Menu needed this to be even faster.

So they set up Hypertune’s Vercel integration to sync flag logic into Edge Config, Vercel’s global data store with ultra-low latency reads at the edge.

Hypertune encodes flag logic, including A/B tests, in a JSON-serializable configuration language called Hyperlang that the SDK interprets at runtime.

For example, Beyond Menu have a feature flag that controls whether to play a certain recording when someone orders via their phone line. The flag logic is represented in Hyperlang as JSON:

```
{  "recordingEnabled": {    "id": "S4fjQjxlvlZp-iQu2ThdX",    "type": "FunctionExpression",    "parameters": [      {        "id": "z_qLYfxnCCEROtA-yDM-5",        "name": "recordingEnabledArgs"      }    ],    "body": {      "id": "PYIFmz8aDuhqmR5MfpeDS",      "type": "SwitchExpression",      "cases": [        {          "id": "uxf7zU4l8RRkOaUyVWYJY",          "when": {            "id": "uxf7zU4l8RRkOaUyVWYJY",            "type": "ComparisonExpression",            "a": {              "id": "Yl5OOQFt9pt0uyLJCLMXc",              "type": "GetFieldExpression",              "object": {                "id": "hR8nt_oNidp2aUzfWdKQc",                "type": "VariableExpression",                "variableId": "7eztbRoQZiAcpeFhYR9ym"              },              "fieldPath": "context > treeInfo > entityId"            },            "operator": "in",            "b": {              "id": "m5qIwGBxYkotOagAakm1M",              "type": "ListExpression",              "items": [                {                  "id": "IvAzZDICbMXDpKQGb-IVm",                  "type": "IntExpression",                  "value": 10001                },                {                  "id": "bJmuxJxTwjmTVq6RDuFFT",                  "type": "IntExpression",                  "value": 52064                }              ]            }          },          "then": {            "id": "YICspIEzsr8CD89Tgs85w",            "type": "BooleanExpression",            "value": true          }        }      ],      "default": {        "id": "wrL5fcyghlr4hdFqmlTbp",        "type": "BooleanExpression",        "value": false      },      "control": {        "id": "6RvRuA3ZezgLZ9UFHcoow",        "type": "BooleanExpression",        "value": true      }    }  }}
```

Hypertune writes this JSON to Beyond Menu’s Edge Config store whenever the flag logic is updated. And the SDK initializes and fetches updates directly from the Edge Config store, instead of from Hypertune Edge.

![Ultra-low latency flag logic updates with Hypertune and Edge Config.](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5DAoi8mDmf58Jfr1PZeZUv/9bc20ef6b37fe51293c87f71b1cdb2a4/Untitled__5___1_.svg)

Ultra-low latency flag logic updates with Hypertune and Edge Config.

As a result, they consistently initialize the SDK on the server with ultra-low latency:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1HwoHjbNF3gZuu6lpx2zJ2%2F4165dc51606ef75bd300e355cc273552%2F_1ms.png&w=1920&q=75)

In the Hypertune UI, they can define feature flags with flexible targeting rules and then embed A/B tests directly into their rules. So they can add rules to enable a feature for specific employees and beta users, and a final rule to A/B test the feature on everyone else. This lets them manage the full rollout of a feature from a single flag.

![Define flexible feature flags and embed A/B tests directly in Hypertune UI.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7ADQT1wE7mgBsAZg92e8nd%2F123900152a24c008c34e560987b17743%2FScreenshot_2024-07-15_at_16.11.32__1_.png&w=1920&q=75)

Define flexible feature flags and embed A/B tests directly in Hypertune UI.

They can also define custom input types like the current `User`, `Restaurant`, `Platform`, etc, with fields that they can use in their flag targeting.

![Add custom input types like User, Restaurant, and Platform for targeted flagging in Hypertune.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FsgdOQ7JpGbzW3Qxcza7YX%2F9a6254ae6d49debd75aa6bef3e6de371%2FScreenshot_2024-07-03_at_16.10.56.png&w=1920&q=75)

Add custom input types like User, Restaurant, and Platform for targeted flagging in Hypertune.

When they run `npx hypertune`, they get an auto-generated client that provides full end-to-end type-safety when they pass these inputs and when they access their flags. This ensures errors are caught at compile-time rather than runtime, and enables IDE features like code completion, “find all references” and JSDoc comments on hover, with flag descriptions and links to open flags in the UI. It also enables a compiler-driven workflow to deprecate flags and safely remove all their references.

![Run npx hypertune to get a type-safe, auto-generated client with IDE support and compile-time error checking.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F134WqxWor41Hz8tGvdSRdO%2F87db146418ba600a2856db003e099fe4%2FScreenshot_2024-07-03_at_16.24.50.png&w=1920&q=75)

Run npx hypertune to get a type-safe, auto-generated client with IDE support and compile-time error checking.

In the UI, type-safety prevents them incorrectly using inputs in their flag targeting rules and enables them to exhaustively match on `enum` inputs like the `Platform` or `Environment`.

All their flag changes are versioned in a Git-style history so they can quickly see what flags changed (and when) with visual diffs of each historical commit.

And just like with Git, they can create isolated branches to cleanly test and preview flag changes before merging them with a pull request. This has been particularly useful for refactors like cleaning up many flags in one go or changing the input types.

Pull requests also enable them to safely onboard nontechnical team members, like PMs and designers, by requiring approvals for their changes.

## [Link to heading](#result)Result

With their new setup, Beyond Menu has been able to roll out and A/B test new features safely and reliably, with a robust developer and user experience, and with no impact to app performance, the end-user experience or conversion.

> We tried many tools for feature flags and A/B testing but they weren’t optimized for our Next.js and Vercel setup, so they all added latency to our app. For us, every millisecond impacts conversion. Edge Config with Hypertune was the only solution that worked for us. It fit our stack perfectly and had the best performance, efficiency and integration.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2s92WDWabdN2YeKBYdYW7U/55c744bdc3fc6831c52ed488659e28be/Rodney_Cox.jpeg)
> 
> **Rodney Cox,** President & CTO at Beyond Menu

## [Link to heading](#beyond-feature-flags)Beyond feature flags

Looking forward, they plan to use Edge Config with Hypertune to manage more complex app configuration like URL redirect maps, in-app copy and marketing content.

They also plan to use Hypertune for product analytics, and for machine learning loops to automatically optimize key parts of their funnel.

## [Link to heading](#get-started)Get started

You can get started with Edge Config and Hypertune by deploying the template in [one click](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhypertunehq%2Fvercel-examples-fork%2Ftree%2Fmain%2Fedge-middleware%2Ffeature-flag-hypertune&env=NEXT_PUBLIC_HYPERTUNE_TOKEN,HYPERTUNE_ADMIN_TOKEN,EDGE_CONFIG,EDGE_CONFIG_HYPERTUNE_ITEM_KEY,FLAGS_SECRET&envDescription=Environment%20variables%20needed%20to%20use%20Hypertune%20with%20Vercel%20Edge%20Config%20and%20the%20Vercel%20Toolbar&envLink=https%3A%2F%2Fdocs.hypertune.com%2Fgetting-started%2Fvercel-quickstart&project-name=feature-flag-hypertune&repository-name=feature-flag-hypertune&demo-title=Hypertune%20with%20Vercel&demo-description=Use%20Hypertune%20with%20Vercel%20Edge%20Config%20and%20the%20Vercel%20Toolbar&demo-url=https%3A%2F%2Ffeature-flag-hypertune.vercel.app%2F&demo-image=https%3A%2F%2Ffeature-flag-hypertune.vercel.app%2Fdemo.png&integration-ids=oac_naLXREDG2o9KihTGYBVz9fVl) or reading the [docs](https://docs.hypertune.com/getting-started/next.js-app-router-quickstart).