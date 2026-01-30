---
title: "Bridging the gap between design and code with v0"
source: "https://vercel.com/blog/bridging-the-gap-between-design-and-code-with-v0"
publishedDate: "2025-02-12"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Feb 12, 2025

How Speakeasy uses v0 to ship faster with features like Figma import and custom Tailwind config.

[Speakeasy](http://speakeasy.com/?utm_source=vercel) specializes in building developer-focused SDKs—to help developers build their products. They adopted v0 to bridge the workflow from design to code, using it to accelerate rapid prototyping and reduce implementation time.

Speakeasy's product is highly technical, and their team embraces a "design as code" philosophy. Without [v0](https://v0.dev/), this approach wasn’t straightforward. While Figma is used for initial design explorations, static pixel designs weren't enough to convey new ideas or get buy-in. Design at Speakeasy focuses on movement, behavior, and interaction—how a product feels, not just how it looks. Given the need for quick iteration, meticulously designing every feature in Figma wasn’t practical.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4p2km18eEgKFX4Qb08dhYz%2Fa5d93a10039a562d99c30da81679f0cb%2FScreenshot_2025-02-03_at_11.10.13_AM.png&w=1920&q=75)

## [Link to heading](#using-v0-to-iterate-on-experiences-faster)Using v0 to iterate on experiences faster

v0 helps the whole Speakeasy team quickly explore ideas, even if they’re not designers or engineers. v0 leverages AWS Bedrock's foundation model infrastructure to power its AI-driven code generation capabilities, enabling developers to rapidly prototype and build full-stack applications through natural language prompts.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2wWOiJ2Ftndf6ohGW0luPK%2F3fb17897a5f28114d247528b12573e70%2FCleanShot_2025-02-12_at_10.57.57_2x.png&w=1920&q=75)

They use v0 as a dynamic design descriptor, a way to share interactive prototypes and demonstrate feature behavior. Some designs start in [Figma and are imported into v0](https://vercel.com/blog/working-with-figma-and-custom-design-systems-in-v0-6cZjvh5CBjx0d3ZF967jGj), but many concepts are designed directly in v0. This allows, designers and engineers collaborate in real time, refining ideas without the friction of design-to-code translation.

For instance, the **initial concept for the Terminal Preview in the Speakeasy dashboard was created in a single day using v0.** This rapid prototyping allowed the team to focus on refining interactivity and user experience rather than translating static designs into code.

> The reason I jumped to v0, was a bias towards code. It meant less time having to redo ideas in Figma. When it comes to getting ready to ship, I was already in the right medium. I saved whatever time it would have taken me to translate Figma to code.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2hTHjI1KkeNFrpDCanLqUR/1ba8ce66666207d2d5dc9d320f36cd43/image.png)
> 
> **Faraz Khan,** Design Engineer

A key element of their workflow is a custom Tailwind configuration, which v0 users use to build and style components according to their design system. For example, the font weights and colors used in their Terminal Preview feature were all defined and used within v0.

![Example of defining custom style preferences in the tailwind.config.js file in v0. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2E6WFdOUTkK9fGdfazpEqS%2F67f01a0f5e4e8f82e05b48dfcfda526b%2FScreenshot_2025-01-22_at_10.26.27_AM.png&w=1920&q=75)![Example of defining custom style preferences in the tailwind.config.js file in v0. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4uau1KSo3dFhzllyzmvhgd%2Ff9f3102b588507c2380139c3d2a604e0%2FScreenshot_2025-01-22_at_10.26.09_AM.png&w=1920&q=75)

Example of defining custom style preferences in the tailwind.config.js file in v0.

Everyone from designers to backend developers at Speakeasy use v0. The team often shares Loom recordings of their v0 prototypes to communicate design ideas effectively. In fact, the phrase “Share a v0” has replaced lengthy Slack discussions and meetings.

By prototyping directly in a code-native environment, Speakeasy accelerates iteration, improves product quality, and keeps design and engineering in sync. For them, v0 isn't just a tool—it’s how they build better developer experiences.

[

**Try v0 for free**

Ready to experience the power of v0 in your day-to-day?

Get started



](https://v0.app/)