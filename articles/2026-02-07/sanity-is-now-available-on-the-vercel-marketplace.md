---
title: "Sanity is now available on the Vercel Marketplace"
source: "https://vercel.com/changelog/sanity-vercel-marketplace"
publishedDate: "2026-02-06"
category: "frontend"
feedName: "Vercel"
author: "Marketplace Team"
---

1 min read

Feb 6, 2026

[Sanity](https://vercel.com/marketplace/sanity) is now available on the [Vercel Marketplace](https://vercel.com/marketplace) as a native CMS integration. Teams can now install, configure, and manage Sanity directly from the Vercel dashboard, eliminating manual API token setup and environment variable configuration.

This integration keeps CMS setup inside your existing Vercel workflow instead of requiring a separate dashboard for provisioning and account management.

### [Link to heading](#get-started-with-the-integration)Get started with the integration

Define your content schema, set up the client, and start fetching content. Schemas define your content structure in code, specifying document types and their fields.

src/sanity/schemaTypes/postType.ts

```
import { defineField, defineType } from "sanity";export const postType = defineType({  name: "post",  title: "Post",  type: "document",  fields: [    defineField({ name: "title", type: "string" }),    defineField({ name: "slug", type: "slug", options: { source: "title" } }),    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),  ],});
```

Define a post document type with title, slug, and rich text body fields

Register your schema types in an index file so Sanity can load them.

src/sanity/schemaTypes/index.ts

```
import { postType } from "./postType";export const schemaTypes = [postType];
```

Export all schema types for Sanity Studio to use

The Sanity client connects your application to your content. The Marketplace integration provisions the project ID as an environment variable automatically.

src/sanity/lib/client.ts

```
import { createClient } from "next-sanity";export const client = createClient({  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,  dataset: "production",  apiVersion: "2024-01-01",  useCdn: false,});
```

Create a reusable client configured with your project's environment variables

With the client configured, you can fetch content using GROQ (Graph-Relational Object Queries), Sanity's query language for requesting exactly the fields you need.

src/app/page.tsx

```
import { client } from "@/sanity/lib/client";const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...12]{  _id, title, slug, publishedAt}`;export default async function HomePage() {  const posts = await client.fetch(POSTS_QUERY);  return (    <ul>      {posts.map((post) => (        <li key={post._id}>{post.title}</li>      ))}    </ul>  );}
```

Fetch the 12 most recent posts and render them as a list

That's all you need to go from install to fetching content. [Install Sanity from the Vercel Marketplace](https://vercel.com/marketplace/sanity) to get started, or deploy the [Next.js + Sanity Personal Website](https://vercel.com/templates/template/sanity-next-js-personal-website) template to start from a working example.