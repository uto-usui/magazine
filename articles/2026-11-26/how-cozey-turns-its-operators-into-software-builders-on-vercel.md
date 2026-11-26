---
title: "How Cozey turns its operators into software builders on Vercel"
source: "https://vercel.com/blog/how-cozey-turns-its-operators-into-software-builders-on-vercel"
publishedDate: "2026-11-25"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

-   Employees outside engineering, including warehouse, finance, and support staff, are now building applications and deploying them to Vercel
    
-   Finance uses an app it built to review profit and loss weekly instead of monthly
    
-   Adopting [Vercel Flags](https://vercel.com/docs/flags/vercel-flags) allowed Cozey to retire a separate tool that cost approximately $80,000 annually
    
-   Six projects, including the storefront, use [AI Gateway](https://vercel.com/ai-gateway)
    

[Cozey](https://www.cozey.com/en-us) is a Canadian furniture company that makes modular sofas customers can configure for their homes. It runs its storefront and most of its back-office applications on Vercel. Warehouse, finance, and customer support employees now securely deploy their own apps on that same platform.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3HWiW2x2Fk1FH9tnGtBJWF%2F606d48907537addf532f512bb1746dce%2FATMOSPHERE_AQUA_LIFESTYLE_1327.jpg&w=1920&q=75)

Cozey Furniture

## [Copy link to heading](#turning-everyday-problems-into-working-applications)Turning everyday problems into working applications

CEO Fred Aubé encourages employees to solve problems they encounter without waiting for another team to take them on. Sam Morrison, VP of Digital, saw teams reach the limits of what they could prototype in an AI chat. Employees used coding agents to build web apps. With Vercel, they could deploy an app themselves and give coworkers a link to a working tool.

In the warehouse, a coordinator built a live floor plan that shows where boxes sit and what staff are doing. Sam says engineering would not have prioritized that project. Finance built its own app to track profit and loss and now uses it to review performance every week instead of once a month.

A customer support representative built an app that uses AI to generate images of Cozey furniture in a customer’s own room. In October, Cozey planned to make the tool available to shoppers.

Sam says a new app appears almost every week.

> Every problem they solve for themselves is a problem I don’t need to deal with. And if they come up with something really cool, I get to steal it and integrate it into what we’re doing.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/7zA6Z9l2tQsTVlvIjKEgFb/af7a31b48947a1bb51585ba7afbfd35c/7B3A565A-D2CD-4493-91B4-C9E3045E68C0.png)Sam MorrisonVP of Digital @ Cozey

## [Copy link to heading](#extending-vercel-from-the-storefront-to-the-business-behind-it)Extending Vercel from the storefront to the business behind it

Sam estimates that the Atmosphere sofa collection alone has about 1.2 million possible configurations. Cozey worked with an agency specializing in Next.js to rebuild its storefront on Vercel. With a custom front end, the team could decide how shoppers explore those options.

> We want the most control possible. We could do a Shopify template, or we could build our own front end on Next.js that we have total control over. We’re gonna go that way 100% of the time.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/7zA6Z9l2tQsTVlvIjKEgFb/af7a31b48947a1bb51585ba7afbfd35c/7B3A565A-D2CD-4493-91B4-C9E3045E68C0.png)Sam MorrisonVP of Digital @ Cozey

Cozey uses [Fluid compute](https://vercel.com/docs/fluid-compute) for functions on the storefront. It runs internal [Python backends](https://vercel.com/blog/python-on-vercel-is-now-generally-available) and the Cozey Operating System, or C.O.S., on Vercel. Teams use C.O.S. to forecast orders, manage warehouse and retail operations, review finances, and track business performance. Operating margin depends in part on how quickly furniture moves from incoming containers to customer shipments.

Each C.O.S. pull request gets a [Vercel Preview Deployment](https://vercel.com/docs/deployments/environments), giving the team a working application to test before release. Cozey’s engineers reported that with caching, builds on Vercel took a couple of minutes. They also share preview links with Fred so he can try changes and give feedback.

The team uses Vercel Flags to control how new features reach users, replacing a separate tool that cost approximately $80,000 annually. After release, performance metrics on Vercel give the team a common reference for checking how applications are running.

When Cozey launched in Australia, the team had regional backend work to do. For the storefront on Vercel, Sam says, “it wasn’t even a conversation.”

## [Copy link to heading](#managing-access-as-more-people-build)Managing access as more people build

As more employees began building, Cozey needed to manage who could open their applications and who could deploy and maintain them. An employee once deployed an app that anyone on the internet could open. For internal apps that had shipped without appropriate authentication, Sam turned on [access protection on Vercel](https://vercel.com/docs/deployment-protection).

“It saved us from some pretty serious privacy risks,” says Sam.

Cozey uses [single sign-on](https://vercel.com/docs/saml) so members of its Vercel team can sign in with company credentials. The company manages team membership through groups in its employee directory with [Directory Sync](https://vercel.com/docs/directory-sync).

## [Copy link to heading](#giving-ai-applications-a-common-way-to-access-models)Giving AI applications a common way to access models

As more teams built with AI, Sam saw them repeating the work of connecting to models. Six Cozey projects, including the storefront, send model requests through [Vercel AI Gateway](https://vercel.com/ai-gateway). Cozey’s engineers use it to call models from their code editors, too. Sam wants all of Cozey’s model requests to go through Gateway.

AI Gateway gives teams one interface for different model providers. If a provider is unavailable, the gateway can [route the request to another provider](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options) that serves the same model. It adds no markup to provider token prices. Sam describes the added cost of routing requests through it as “basically $0 in additional overhead.”

The company is also developing what it calls the Agentic Mesh, a system to coordinate AI use across internal applications and customer experiences. The coordinating service is being built on AWS, with AI Gateway planned for model requests and Vercel for application deployment. It is intended to help teams decide which models to use and where to run applications, while giving engineering visibility into AI usage and costs.

> The mesh is our single control plane. I want control, observability, governance, all of those fundamental pieces in place, so that when we enter this future, we’re doing it in the safest, most secure, most private way possible.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/7zA6Z9l2tQsTVlvIjKEgFb/af7a31b48947a1bb51585ba7afbfd35c/7B3A565A-D2CD-4493-91B4-C9E3045E68C0.png)Sam MorrisonVP of Digital @ Cozey

## [Copy link to heading](#what's-next)What's next

Sam says engineering wouldn’t have prioritized a live map of the warehouse floor. The coordinator who needed to see where the boxes were could make a different call, build the map, and share it with the people moving them. When the digital team sees an idea worth taking further, it has a working app to build on.

Cozey chose a custom storefront on Vercel so it could decide how shoppers explore its furniture. Sam’s next goal is for employees outside engineering to share that control. If shoppers keep asking the same question about a sofa, the support rep who hears it could put the answer on the product page.