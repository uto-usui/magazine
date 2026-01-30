---
title: "Framework-defined infrastructure"
source: "https://vercel.com/blog/framework-defined-infrastructure"
publishedDate: "2023-03-07"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

8 min read

Mar 7, 2023

Programmatic framework understanding for automatic infrastructure provisioning

[Infrastructure as code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code) is the industry-standard practice for provisioning infrastructure in a repeatable and reliable way. **Framework-defined infrastructure (FdI)** is an evolution of IaC, where the deployment environment automatically provisions infrastructure derived from the framework and the applications written in it.

The best way to understand it is that a build-time program parses the source code written to a framework, understands the intent behind the code, and then automatically generates the IaC configuration needed to run the software. This means more predictable, lower cost, and lower risk DevOps through truly serverless—dare we say, _infrastructureless_—architecture.

In this article, we’ll explain how framework-defined infrastructure fits into modern views of infrastructure definition and automation. We’ll then show examples of how framework-defined infrastructure improves the experience of developing in open-source frameworks.

## [Link to heading](#contextualizing-infrastructure-as-code-\(iac\))Contextualizing infrastructure as code (IaC)

In the early days of servers and the Internet we `ssh`\-ed (or worse) into individual machines, running install scripts or even configuring production software using graphical user interfaces to provision infrastructure. As the Web scaled, it quickly became clear that this approach wouldn't scale with it, and together with the DevOps movement, IaC became the best practice for provisioning infrastructure in a repeatable and reliable way.

The code in IaC represents a version-controlled description of the desired state of the infrastructure—which, when executed, will create the described system state. In this scenario, infrastructure can refer to:

-   Network equipment and setups
    
-   Web and application servers
    
-   Databases and message queues
    

## [Link to heading](#what-is-framework-defined-infrastructure)What is framework-defined infrastructure?

Framework-defined infrastructure abstracts over cloud primitives such as servers, message queues, and serverless functions, making them mere implementation details of the frameworks' concepts:

-   Providing portability between different target infrastructure providers
    
-   Eliminating the need to manually configure infrastructure to run an application in production
    
-   Increasing the time spent writing product code over system management
    
-   Allowing the unchanged use of the framework's native local development tools
    
-   Standardizing on pre-reviewed secure services
    

Frameworks use well-established patterns to provide structure and abstraction to applications, making them easier to write and understand. While the word _framework_ is hard to define, the Hollywood principle, "Don't call us, we call you," probably captures best the inversion of control, where the framework manages the high-level application flow while the developer writes code within the hooks provided by it.

Framework-defined infrastructure takes advantage of both this inversion of control and the predictable structure of framework-based applications to automatically map framework concepts onto the appropriate infrastructure without the need for explicit declaration or configuration of the infrastructure.

Note that this post is giving examples based on Vercel's [Platform as a Service](https://en.wikipedia.org/wiki/Platform_as_a_service) offering. The concept, however, can be applied more widely as the basic idea of understanding a framework, and generating IaC configuration for it, can also be used for more traditional infrastructure deployments.

## [Link to heading](#applying-framework-defined-infrastructure)Applying framework-defined infrastructure

We'll now show examples of how frameworks automatically map their concepts onto Vercel's infrastructure. Though we'll be using [the popular Next.js framework](https://nextjs.org/?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_framework_defined_infrastructure) here for demonstration, Vercel's implementation of framework-defined infrastructure supports a [multitude of other frameworks](https://vercel.com/docs/frameworks) based on the same underlying mechanism.

![Flowchart showing the process from user code to automatically inferred infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5TaYti4MjfS8nl8N0yzZYY%2F8ee8f4cabc825ec96d5fa57564dd7d33%2FInline-graphic-light-framework.png&w=1920&q=75)![Flowchart showing the process from user code to automatically inferred infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F48QBZdO3A87sdKxOBobtYd%2Fd386fda64bd9f233216fc9f663ed1ac0%2FInline-graphic-dark-framework.png&w=1920&q=75)

Flowchart showing the process from user code to automatically inferred infrastructure.

Next.js uses a file-based router that maps files in a directory structure to URLs in a web application. For example, the file `pages/blog/index.ts` creates a URL route that maps the URL `/blog` to the code defined in that file.

Framework-defined infrastructure starts by uplifting this understanding of the route table of a web application from an implementation detail of the framework to something that the infrastructure understands. In Vercel’s case, the route table generated from a framework would eventually be deployed to our gateway service, which then knows how to invoke the correct infrastructure primitive for any given route.

The contents of `pages/blog/index.tsx` might look something like this:

pages/blog/index.tsx

```
export default function BlogPosts({ posts }) {  return posts.map(post => <BlogPost key={post.id} post={post} />)}export async function getServerSideProps() {  const posts = await getBlogPosts();  return {    props: { posts }  }}
```

Example of a dynamically-rendered page in Next.js.

In this example, the user code defines a `getServerSideProps` function that fetches the blog posts on our site. Next.js invokes this function and passes the output to the default export `BlogPosts` function which renders a list of posts.

Next.js pages with a `getServerSideProps` function get rendered dynamically on every page view. That means a production setup needs a compute service (like an application server or a serverless function) to perform this data fetching and rendering operation.

With framework-defined infrastructure, the knowledge that pages with `getServerSideProps` require a compute resource to perform the rendering operation is utilized to automatically infer that the compute infrastructure to perform the rendering operation must be provisioned. In Vercel’s case, this means that a serverless function based on AWS Lambda is created and deployed with the code necessary to render the page. The knowledge to invoke this function is then deployed to the gateway service as part of the application's routing table.

Now, let's slightly modify the code example from above, to change `getServerSideProps` to `getStaticProps`:

pages/blog/index.tsx

```
export default function BlogPosts({ posts }) {  return posts.map(post => <BlogPost key={post.id} post={post} />)}export async function getStaticProps() {  const posts = await getBlogPosts();  return {    props: {posts}  }}
```

The change of getServerSideProps to getStaticProps now generates the HTML at build time.

In Next.js, `getStaticProps` implies that rather than rendering the page on every view, the function may be invoked at build time to generate a static HTML page which then can be served to the user. Again, with framework-defined infrastructure it can be inferred that no more production compute infrastructure is needed to serve this particular web page. Instead, the artifacts generated at build time can be deployed to lower-cost, static, web-serving infrastructure. In Vercel's case, this means that **no** serverless function is deployed for this page, and instead, the application's routing table is updated to point to the respective static file service.

While this is just one example of how changes to the code within a given file can trigger the deployment of various pieces of infrastructure, the concept can be expanded to a multitude of infrastructure resources. For example:

-   Gatsby has a concept called [Deferred Static Generation](https://vercel.com/docs/frameworks/gatsby#deferred-static-generation). When used, a serverless function is deployed to perform the deferred generation on user request similar to server-side rendering. However, the function output is then stored in AWS S3 and pushed globally to be servable from Vercel’s edge without another function invocation.
    
-   SvelteKit has the concept of [form actions](https://kit.svelte.dev/docs/form-actions?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_framework_defined_infrastructure). When used, a serverless function is automatically created to perform the action. The same thing happens when using [Remix](https://vercel.com/guides/deploying-remix-with-vercel).
    
-   Next.js supports the concept of [middleware](https://nextjs.org/docs/advanced-features/middleware?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_framework_defined_infrastructure), which triggers the automatic provisioning of edge computing resources which execute the middleware code during the request processing phase.
    
-   Using the [component for image optimization](https://nextjs.org/docs/api-reference/next/image?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_framework_defined_infrastructure) automatically triggers setup of a high-performance image optimization system tailoring the image for the visiting user’s device.
    

Internally, the framework primitives get compiled to Vercel’s Build Output API which is a more traditional declarative IaC configuration API that gets consumed by Vercel’s platform to provision the production infrastructure.

## [Link to heading](#serverless-in-an-iac-world)Serverless in an IaC world

IaC uses machine-readable files, which developers can version much like software, to provision infrastructure such as physical servers, virtual machines, and higher-level services like databases or applications. Serverless architecture—which, despite its name, still uses servers—eliminates the need for developers to manage specific physical or virtual servers.

Serverless products still require developers to define and deploy their respective serverless primitives, much like more traditional infrastructure. For example, in the archetype of serverless products, [AWS Lambda](https://aws.amazon.com/lambda/), developers need to create a lambda function and deploy code to it.

In other words, the process for creating a lambda function, while somewhat less involved, is similar to the process for creating a new serverful service. Here is a sample for how to create a lambda function using [HashiCorp's Terraform](https://www.terraform.io/), one of the most popular IaC configuration tools. As you can see, the lambda function is just another resource:

```
resource "aws_lambda_function" "my_lambda" {  filename      = "lambda_function_payload.zip"  function_name = "lambda_function_name"  role          = aws_iam_role.iam_for_lambda.arn  handler       = "index.test"  source_code_hash = filebase64sha256("lambda_function_payload.zip")  runtime = "nodejs16.x"  environment {    variables = {      foo = "bar"    }  }}
```

Creating a Lambda function leveraging HashiCorp Terraform

## [Link to heading](#solving-the-local-development-problem-for-serverless)Solving the local development problem for serverless

While serverless architecture greatly simplifies managing production infrastructure, the systems that run serverless code are often complex and proprietary, which can cause problems with local development. In a worst case scenario, local development isn't possible, and developers must test local changes by making comparatively slow deploys to the production infrastructure. In a best case scenario, developers must create a local simulation of the complex serverless stack, which then has to stay up-to-date with the production environment.

![Comparison of local dev environment with and without framework-defined infrastructure. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6mTAscJdDdAFarkUs7pGiH%2F6607eefbe8a2b760e858c6b68456ad0d%2FInline-graphic-light-local-dev.png&w=1920&q=75)![Comparison of local dev environment with and without framework-defined infrastructure. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3bgQaXTaP6WaEfQptEjmWt%2F60a70cbc4b2ad94642e795ec8c6d8d7c%2FInline-graphic-dark-local-dev.png&w=1920&q=75)

Comparison of local dev environment with and without framework-defined infrastructure.

Framework-defined infrastructure completely eliminates this problem. Because framework-defined infrastructure lets the framework itself dictate the production behavior, local development can just use the framework's own tooling, while production infrastructure is automatically configured to be a scaled and optimized representation of the same underlying behavior.

## [Link to heading](#framework-defined-infrastructure-and-immutable-deployments)Framework-defined infrastructure and immutable deployments

These days application code is developed almost exclusively within version control systems such as Git. IaC maintains infrastructure definition in either the same or a sibling version control system. Often, however, production infrastructure itself can only represent limited points in time of the infrastructure's version history. This is fundamentally incompatible with framework-defined infrastructure, which expects that production infrastructure directly maps to the framework code at the same commit hash.

Immutable deployments solve this impedance mismatch between an application's and the infrastructure’s version history. Instead of deploying onto a limited number of infrastructures such as “production” and “staging,” immutable deploys create a completely new infrastructure for every single deployment that is ever made. This infrastructure is then never changed—it is immutable.

![Each commit gets an immutable deployment and generates virtual infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2fJkCQRAiOvJMFVUxmGSdn%2F2ee8debb3c2ea875f12478f6c0dd84f5%2FInline-graphic-light-deployments.png&w=1920&q=75)![Each commit gets an immutable deployment and generates virtual infrastructure.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2IAlhCyuQ13fIVYDNMTpDS%2F27f56b6334c7f420af1f033f2f67ed8c%2FInline-graphic-dark-deployments.png&w=1920&q=75)

Each commit gets an immutable deployment and generates virtual infrastructure.

Naturally, immutable deployments are impossible to perform in a world where infrastructure is mapped to finite physical resources, which would get used up as new deployments get made. However, in a serverless world, where unused infrastructure can scale to zero, immutable deployments become possible to perform, as unused deployments do not take up physical compute resources beyond the baseline storage needed for their contents. For example, Vercel's platform creates an immutable deployment for each `git hash` pushed to a repository which is then mapped onto an entirely new virtual serverless infrastructure.

### [Link to heading](#acknowledgements)Acknowledgements

Framework-defined infrastructures as an idea stands on the shoulder of giants. It relies on IaC as the ultimate infrastructure interface and hence could not work without the amazing work by its community. Furthermore, it relies on infrastructure abstractions such as [Kubernetes](https://kubernetes.io/) to actually be feasible given the relatively low amount of detail that can be extracted from the original source code, and the approach is particularly suited for targeting [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service) offerings such as the [original Google AppEngine](https://cloudplatform.googleblog.com/2008/04/introducing-google-app-engine-our-new.html).

## [Link to heading](#frameworks,-not-primitives)Frameworks, not primitives

Here we have discussed how framework-defined infrastructure builds on IaC by understanding how a framework's patterns map to infrastructure primitives needed to run code in a scalable production system, greatly simplifying local development.

Immutable deployments based on serverless architecture allow production infrastructure to perfectly map to the version of the code running on the infrastructure while being both exceptionally scalable and cost effective during low usage.

It's worth repeating: at Vercel, we're implementing framework-defined infrastructure for more predictable, lower cost, and lower risk DevOps through truly serverless—and, for developers, _infrastructureless—_architecture.