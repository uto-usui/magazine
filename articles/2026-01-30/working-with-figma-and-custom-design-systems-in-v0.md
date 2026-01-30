---
title: "Working with Figma and custom design systems in v0"
source: "https://vercel.com/blog/working-with-figma-and-custom-design-systems-in-v0"
publishedDate: "2025-01-27"
category: "frontend"
feedName: "Vercel"
author: "Siddharth Sharma"
---

3 min read

Jan 27, 2025

Learn best practices on importing your designs from Figma, working with shadcn/ui, and leveraging public npm packages.

v0’s ability to import existing Figma files allows designers and developers to bridge the gap between design tools and AI-driven development. This feature extracts context from Figma files, along with any supplementary visuals, and passes them into v0's generation process.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3pyfVSzyN2ikyCSDDAia8V%2F4ed2713c52d8378a47f7716fb8d18519%2FFrame_1430105497.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4vx7lPZVoFFvg1eOO1nbqx%2F13a28e81603d3d3e9d748956ec99793f%2FFrame_1430105497-1.png&w=1920&q=75)

When working with the Figma integration, it's best to break down designs into smaller, manageable components or sections, just as you would when handing them off to human developers.

When each component is in its own frame, you avoid potential size and dimension errors but also ensure that AI can process each component more effectively. Key elements to separate include navigation bars, sidebars, forms, unique UI components like date pickers, and individual sections of landing pages.

![Diagram showing how to separate large designs into smaller components. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F45KWI7yKyBnWB5lpvIMB3e%2F985e606830c1699762ba982916c668af%2FScreenshot_2025-01-23_at_10.17.09_AM.png&w=1920&q=75)

Diagram showing how to separate large designs into smaller components.

The [components generated in v0](https://v0.dev/chat/figma-components-PgiDC8JXaVR) come out pretty close to the design in Figma and v0 even infers animations when we componentize, as its able to construct relations between elements of the design.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3fIMY34dohMSNBw2wBMsrr%2F62c0c13c2a1b2837f57c062231458848%2FScreenshot_2025-01-23_at_8.11.32_AM.png&w=1920&q=75)

Multiple elements can be combined into a single design and imported into v0, however this often means there is a lot of surface area and visual context that can become overwhelming for AI. If you use this method of working with a larger design, ensure the design and its components are still contained in a single frame.

## [Link to heading](#take-the-iterative-approach)Take the iterative approach

When working with existing Figma components in v0, an iterative approach is highly recommended.

-   Start by focusing on individual components
    
-   Test and refine each one before moving on to the next
    
-   Fine-tune the smaller pieces and ensure they work well within v0’s generation process
    
-   Gradually build up to complete landing pages by piecing together the components, rather than attempting a lengthy single-piece generation all at once
    

Build the pieces of your design first, like buttons and images, and _then_ tell v0 how to arrange them. This way, v0 can reuse those pieces, making your design more efficient.

The more you use v0 with your Figma designs, the better it gets at understanding your style preferences, like your favorite fonts and spacing. v0 is learning and adapting to your design language over time.

## [Link to heading](#working-with-existing-design-systems)Working with existing design systems

v0 uses the [shadcn/ui component library](https://ui.shadcn.com/) as its default design system. This library provides customizable, accessible, and well-designed components that work seamlessly with React and Next.js.

Shadcn/ui is so customizable that it lets you keep the look and feel of your current design system. Some teams using v0 are already refactoring their design systems around shadcn/ui to work seamlessly with v0—cutting down the time it takes to go from design to implementation on new features by up to three times.

v0 generations can also use a custom Tailwind config file. [In this example](https://v0.dev/chat/todo-list-with-gradients-GGQmdxIcCtv), there is a custom Tailwind config for a gradient button that is used in the generated component. This helps v0 adapt to custom design systems by allowing users to define and customize their styles and primitives.

![Example of defining custom style preferences in the tailwind.config.js file in v0. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2E6WFdOUTkK9fGdfazpEqS%2F67f01a0f5e4e8f82e05b48dfcfda526b%2FScreenshot_2025-01-22_at_10.26.27_AM.png&w=1920&q=75)![Example of defining custom style preferences in the tailwind.config.js file in v0. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4uau1KSo3dFhzllyzmvhgd%2Ff9f3102b588507c2380139c3d2a604e0%2FScreenshot_2025-01-22_at_10.26.09_AM.png&w=1920&q=75)

Example of defining custom style preferences in the tailwind.config.js file in v0.

Additionally, v0 supports working with any public npm packages. If your components are published publicly to npm, you can pull them into your v0 projects like any other library. This means you can use your libraries or libraries like [Material UI](https://mui.com/material-ui/) and [React Aria](https://react-spectrum.adobe.com/react-aria/index.html).

[`"Create a SaaS pricing table with Material UI React components."`](https://v0.dev/chat/FXQl5UbGZfY?b=b_qfx2WLwvGKC&f=0)

## [Link to heading](#get-started-with-v0-today)Get started with v0 today

v0's ability to generate high-quality UIs, leverage third-party libraries, and integrate with Figma makes it an invaluable tool for frontend iteration.

[

**Try v0 for free**

Ready to experience the power of v0 in your day-to-day?

Get started



](https://v0.app/)