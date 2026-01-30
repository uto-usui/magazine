---
title: "Your guide to headless commerce"
source: "https://vercel.com/blog/your-guide-to-headless-commerce"
publishedDate: "2023-02-27"
category: "frontend"
feedName: "Vercel"
author: "Kiana Lewis"
---

7 min read

Feb 27, 2023

Learn how going headless enables digital experiences that convert.

Adopting a headless, or composable, commerce architecture helps to ensure your digital storefront is high-performing, scalable, and increasing in conversions each year. Leading ecommerce brands are choosing to go headless to stay competitive.

Let’s get back to basics and explore what headless commerce is, how it compares to monolithic commerce, and what you should do once you've made the migration to outpace your competitors and reach your KPIs.

[

**Already experienced with headless?**

Learn how to configure headless WordPress with your Next.js application.

Read more



](https://vercel.com/guides/wordpress-with-vercel)

1.  [What is a headless commerce architecture?](#what-is-a-headless-commerce-architecture)
    
2.  [Monolithic commerce vs. headless commerce](#monolithic-commerce-vs.-headless-commerce)
    
3.  [What are the benefits of headless commerce?](#what-are-the-benefits-of-headless-commerce)
    
4.  [How to adopt headless commerce](#how-to-adopt-headless-commerce-an-iterative-approach)
    
5.  [Headless commerce use cases](#headless-commerce-use-cases-what-to-do-once-you’ve-gone-headless)
    

## [Link to heading](#what-is-a-headless-commerce-architecture)What is a headless commerce architecture?

A headless commerce architecture is the decoupling of your backend and frontend as an ecommerce storefront. Rather than relying on a monolithic ecommerce platform with a built-in frontend, headless commerce gives you the ability to custom-build an application stack that best fits your needs.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3hLgKPky201oZ12G4Rm2kc%2F91d021ee09ea2bba718bfca778193847%2F1920x1004-Blog_Graphic_1_lightmode_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2uciQwV0UTU9FE9Y0xywJJ%2F3c1a21669fece66242ed19b9728db93c%2F1920x1004-Blog_Graphic_1_2x.png&w=1920&q=75)

## [Link to heading](#how-does-headless-commerce-work)**How does headless commerce work?**

A headless commerce storefront relies on an API to work. The API connects the frontend and backend—sending information between the two in real time. The backend tool sends data like products, reviews, and pricing information to the storefront’s frontend that customers see. Meanwhile, the frontend shares customer touchpoints with the backend to enrich customer profiles for deeper personalization and targeting. Due to the block-by-block nature of headless commerce, you can build your own world-class tech stack using the best solutions that fit your needs.

## [Link to heading](#monolithic-commerce-vs.-headless-commerce)**Monolithic commerce vs. headless commerce**

Monolithic commerce has been the standard for years, and the monolithic applications that make it up can vary. Two of the more commonly used approaches in commerce include the _managed monolith_, encompassing popular ecommerce platforms like Shopify, BigCommerce, and Salesforce Commerce Cloud. The alternative is the _self-built monolith_: tightly coupled frontend and backend code bases, often with legacy languages.

While both approaches have unique limitations, neither provides the front and backend flexibility required to deliver the fast, personalized, omnichannel experiences powering the growth of leading commerce brands today.

![Headless architecture allows teams to work more independently of each other, which means faster iteration.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4cVjv6MR2ur9WjhkRvEBhf%2Fca052d1a2a37d96d91d4e6cdf732154c%2F1920x1004-Blog_Graphic_2_lightmode_2x.png&w=1920&q=75)![Headless architecture allows teams to work more independently of each other, which means faster iteration.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1dj2g9Wh77zKvUZwYbz00K%2F8e63b72cf5cd9241a9ccbcc5fbe5939a%2F1920x1004-Blog_Graphic_2_2x.png&w=1920&q=75)

Headless architecture allows teams to work more independently of each other, which means faster iteration.

[Headless commerce](https://vercel.com/resources/why-innovators-are-going-headless) has grown in popularity in the last few years to solve for the tradeoffs that come with monolithic commerce. A composable stack’s modularity allows for more flexibility and better performance. Rather than using one provider for both the frontend and backend, companies can use one company for their backend and another for their frontend. These pieces of the architecture are then combined using an API for a seamless experience that’s been customized for the organization.

## [Link to heading](#the-limitations-of-the-monolith)The limitations of the monolith

From vendor lock-in to a lackluster user experience, monolithic architectures come with numerous limitations that drive brands to go headless instead.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/6XjBBMLe9CEDRZbbZOstzX/3a12b85a95574fa36cc492dccf640f58/Frame_2.png)

Legacy monolith applications

Teams using legacy monolithic applications are typically locked into technology that was brought in a while ago and is hard to replace. Tooling and infrastructure often get built around this, codifying it into place and slowing down the processes behind the application (and the application itself).

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4Jf6WeQtzDcVzeVVYgSiSU/1380bc243297dbe2acfcb1db544292e4/Frame_3.png)

End-to-end tools

Custom design systems are hard to implement, and third-party tooling or scripts drag down performance. They can’t swap out one piece of the puzzle for another (i.e. if Marketing wants to use a different CMS).

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4W2ksbBQR7BqQjDONP6mgf/bd0ec8025a0b9a60f57af1acb87410fe/Frame_1.png)

Performance

Users experience slow site performance/load times due to API performance, data transfer, and caching limitations of the legacy platform or homegrown system.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3VmlgMdcL6V16ThGao1hh4/bf0b620d9f8015c0926146b92b12b6de/Frame_4.png)

Availability

Downtime can be frequent from outages, impaired performance, and reliability issues due to tech debt, over-reliance on inconsistent platforms, or dependencies with increasingly large homegrown code bases.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/IGVr22v9UNCmH97FfXE3w/865883bf6bf9fff5763849044698e60e/Frame_5.png)

SEO

Sites were not designed for today’s modern user experience, often measured by Google Core Web Vitals, and current performance is hindering SEO rankings.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1l97PNmiqDit0vSIu69nop/d4a16ea9d5fbef1217f1d8e5674b9045/Frame_6.png)

Developer talent and retention

It can be challenging to attract and retain talented developers due to the archaic, restrictive, and cumbersome nature of developing and shipping monolithic applications.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7wD6ajLf4TL5v7MR65Jogp/211371880c77590b9079f60fc27ef15d/Frame_7.png)

Tech debt

Growing tech debt leads to application outages, security vulnerabilities, and increased maintenance costs.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/j7m1IkZrmnNxO47yBAWKa/a60fa6882474a6095bac75c827e041c2/Frame_8.png)

Technology limitations

Teams are unable to use modern, best-of-breed technologies and are beholden to the capabilities and limitations of their monolith.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/39NZ2vMb20X8oM0MlW9oms/cd0c0b7eef907ab129f452be587f09fd/Frame_9.png)

Developer toil

Great developers are spending time configuring infrastructure, fixing bugs, and making small changes that marketers could make—instead of focusing on more impactful and inspiring development work to optimize the user experience.

## [Link to heading](#what-are-the-benefits-of-headless-commerce)**What are the benefits of headless commerce?**

By adopting a headless architecture, teams can break free from the limitations of monolithic platforms and build a more modern tech stack. This allows organizations to go to market faster, cut costs, and surpass customers’ expectations—ultimately boosting sales and revenue. 

**Improve developer velocity**

[**Sixty-eight percent of organizations**](https://assets.kpmg/content/dam/kpmg/be/pdf/2019/11/agile-transformation.pdf) **credit delivering products faster as one way they’re able to keep up with changing customer needs.** Headless commerce lets your frontend developers use modern languages and cloud-based tooling to expedite builds, automate tasks, and improve collaboration. Developer workflows optimized for iteration let commerce brands deliver the shopping experience customers want.

**Experience cost savings (operator leaner)**

Companies can spend up to 75% of their [total IT budget](https://www.wired.com/insights/2012/10/move-to-cloud-consider-saas/#:~:text=Resource%20costs%3A%20Gartner%20estimates%20that,run%20existing%20systems%20and%20infrastructure.) running and maintaining existing systems and infrastructure. Choosing a serverless frontend platform to deploy applications reduces DevOps overhead, increases infrastructure efficiency, and costs a fraction of most managed monolithic platform licenses.

**Use cutting-edge technologies**

[**Around 75% of consumers**](https://www.salesforce.com/form/pdf/state-of-the-connected-customer-3rd-edition/?d=7010M000000ujR9QAI&nc=7010M000000ujR4QAI) **expect brands to stay up-to-date with the technology used to create their shopping experience.** With the freedom of choice that comes through a composable stack, companies can easily adopt emerging tech like AI and machine learning to offer individualized, higher-converting shopping experiences. 

**Empower collaborators**

From updating blog posts to landing pages, developers are often responsible for making the frontend changes requested by content creators and marketers when using an all-in-one solution. These collaborators can make edits on their own with a headless solution.

> As our company grows, teams across Rippling are empowered to make the changes they need. Over 90% of site changes are deployed by stakeholders immediately, giving me the freedom to keep improving Rippling’s site performance and user experience." 
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5YhKHQuH2jZejbDdvVD04Q/7e090b010ca7ab6ea0ee9475b0d504a0/Frame_10.png)
> 
> **Web Engineer at Rippling**

**Increase site performance**

Monolithic solutions struggle to deliver on modern, SEO-impacting performance metrics like Core Web Vitals. By choosing a headless infrastructure, ecommerce stores increase the value of every user experience—directly impacting traffic and sales.

**Enable omnichannel experiences**

**A strong omnichannel strategy yields** [**56% higher customer retention**](https://www.forbes.com/sites/forbestechcouncil/2018/06/15/omnichannel-cx-how-to-overcome-technologys-artificial-divide-and-succeed-at-being-seamless/?sh=60d9c44b3205), so retailers are focusing on connecting customer engagement across all digital channels. Headless architecture lets commerce development teams deliver high-performing omnichannel experiences without re-architecting the design for every channel.

## [Link to heading](#how-to-adopt-headless-commerce:-an-iterative-approach)**How to adopt headless commerce: an iterative approach**

Despite the many benefits of headless commerce, migrating an entire application architecture can be daunting and expensive. That’s why companies typically take an incremental approach to migration, rather than moving everything all at once. This allows them to make sure they’re porting over what makes sense, and carefully deduce what is best left on their legacy platform. 

## [Link to heading](#headless-commerce-use-cases:-what-to-do-once-you’ve-gone-headless)Headless commerce use cases: what to do once you’ve gone headless

The ecommerce market share is growing fast. While only [17.8% of sales](https://www.insiderintelligence.com/content/worldwide-ecommerce-forecast-update-2022) were made online in 2020, 23% of consumers are expected to buy online by 2025. What’s driving this growth? Beyond the growing convenience of online shopping, brands are intent on delivering modern user experiences that grow sales and build loyalty. From adopting AI to creating content at scale, check out these headless commerce use cases to see how you can make the most out of your composable architecture.

### [Link to heading](#prioritize-the-developer-experience-to-create-faster-)Prioritize the developer experience to create faster

A headless architecture empowers developers to create at the moment of inspiration. With a managed frontend, teams can instantly introduce flexibility, simplicity, and speed into the development workflow. This is where Vercel can help. 

Vercel is the platform leader, backed by a large developer community as the creators of [Next.js](https://nextjs.org/). With a fully-managed frontend like Vercel, your dev team can take advantage of git integrations, performance optimizations, and Vercel’s [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration) (ISR) to create faster.

![Shorter build times with ISR vs. longer builds without ISR.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FoJjM15mG4Wnl5eJApQGmV%2Ff5f904685e979523d7c5dd7db4184c91%2F1920x1004-Blog_Graphic_3a_Lightmode_2x.png&w=1920&q=75)![Shorter build times with ISR vs. longer builds without ISR.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5R0NjGkU14aCCRme1SgXOc%2F6fc6ee9b66725c04da8c23d6c50bfb4c%2F1920x1004-Blog_Graphic_3a_2x.png&w=1920&q=75)

Shorter build times with ISR vs. longer builds without ISR.

ISR improves site speed and SEO so that you can increase organic traffic with better Core Web Vitals. Now your team can balance site performance and data freshness—two key components for ecommerce sites. 

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5MVnKveGCGl0TY1sp1LvTn/2c44f864e52589ee8edf69d1b7554ff8/desenio-square.png)

The world’s largest affordable art supplier [Desenio](https://vercel.com/customers/desenio) leverages ISR to shorten build times for their massive site, going from hours to minutes with Vercel.

To further improve the developer experience, teams can rely on Vercel’s serverless infrastructure for hosting, scaling, and security. By using a tool for hosting and infrastructure, you can remove the obstacles that stand in your developers’ way. Built-in features like headless commerce integrations, secure previews, and built-in performance optimizations help, too—allowing you to get to market that much faster.

### [Link to heading](#personalize-through-experimentation)Personalize through experimentation

With a modern infrastructure, companies can provide the most relevant user experience without sacrificing performance. Methods like [A/B testing](https://vercel.com/templates/next.js/ab-testing-simple) and feature flags allow you to garner which products resonate most with your user through unique customer data. However, these tried-and-true methods can create latency or layout shifts—getting in the way of dynamic UX. With Vercel as part of your composable stack, you can experiment without relying on third-party scripts or client-side Javascript that hinder personalized user experiences.  

> We can show the control or experiment version of a page immediately instead of using third-party scripts. This results in better performance and removes the likelihood of flickering/layout shifts.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7zh3cZHdFbtL4iPnKHXyMa/048d1df759b4cd5b159ba05fc4d11fc1/sumup-square.png)
> 
> **Software Engineer at SumUp**

[

**Explore the Edge**

Learn more about A/B testing and feature flags with Vercel Edge Middleware.

Learn more



](https://vercel.com/features/edge-functions)

### [Link to heading](#invest-in-ai)Invest in AI

Leading commerce brands are [taking advantage of AI](https://vercel.com/blog/deploying-ai-applications) to boost customer retention using chatbots or virtual assistants, invest in real-time analytics to better predict demand, and adopt AI-powered auto-suggest tools to present results based on search intent. And that’s just the start of what AI-adoption can unlock for digital storefronts. By adopting a headless architecture, companies can easily expand their backend to include the latest AI tools, so they can keep up with the changing landscape and beat the competition.

### [Link to heading](#surpass-the-new-performance-standards)Surpass the new performance standards

An online store that loads in just one second achieves a conversion rate that’s [2.5x higher](https://www.portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm) than an ecommerce site that loads in 5 seconds. As such, companies aiming to create the most performant site possible often measure their site’s performance using [Google Core Web Vitals](https://vercel.com/blog/core-web-vitals).

Introduced in 2021, Core Web Vitals are an array of metrics that tell Google how fast, stable, and performant your site is. Key metrics measured include LCP, CLS, and TTFB. A headless architecture allows organizations to build performant tech stacks featuring managed frontends that often have built-in analytics capabilities. Using [Vercel Analytics](https://vercel.com/analytics), developers can track key performance metrics, pinpoint bottlenecks, and identify trends to prioritize what to improve and optimize for an ideal user experience.

### [Link to heading](#create-content-at-scale)**Create content at scale**

As your organization begins to grow, content creation becomes more important. Blog authors, stylists, merchandisers, marketers, etc. will all have their own content they’ll want to create and publish. Rather than having them rely on developers to publish content or make frontend changes, empower them with self-service headless CMS solutions. Contentful, Storyblok, and Sanity are a few solutions that, when paired with Vercel, ecommerce stores can count on.

When it comes to the content that requires a developer’s help to create, like new landing pages, [Vercel’s Deployment Previews](https://vercel.com/features/previews) can make a major impact on collaboration. Instead of sharing screenshots or dealing with a complex staging process, stakeholders can see a live preview of pages. You can even test changes within the browser and run automated tests for performance and reliability with one click. 

## [Link to heading](#taking-the-next-step)**Taking the next step**

By decoupling the frontend and backend, teams across your organization can be more independent, collaborate better, and create content quicker. To learn more about how you can create fast ecommerce sites at scale:

-   [Download our ecommerce ebook](https://vercel.com/try/ebook-ecomm) for ways to improve your storefront and bottom line 
    
-   [Read the guide](https://vercel.com/blog/using-the-latest-next-js-12-3-features-on-vercel) on how to use Deploy Hooks with Vercel and a headless CMS
    
-   Learn how to [use Headless WordPress](https://vercel.com/guides/wordpress-with-vercel) with Next.js and Vercel