---
title: "Introducing Vercel Postgres"
source: "https://vercel.com/changelog/vercel-postgres"
publishedDate: "2023-05-01"
category: "frontend"
feedName: "Vercel"
author: "Elijah Cobb"
---

1 min read

May 1, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3RaXoHJnoitsE6iRWmPAlP%2Fca46740422cdebade9527b62cfc2ca70%2FPostgresLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ODuXU8UyX22pOl7zgWHG0%2F1a2b436438e7364a62594718dd0582bb%2FPostgresDark.jpg&w=1920&q=75)

[Vercel Postgres](https://vercel.com/storage/postgres) is a serverless PostgresSQL database, designed to integrate with Vercel Functions and any frontend framework.

app/page.tsx

```
import { sql } from '@vercel/postgres';import { redirect } from 'next/navigation';async function create(formData: FormData) {  'use server';  const { rows } = await sql`    INSERT INTO products (name)    VALUES (${formData.get('name')})  `;  redirect(`/product/${rows[0].slug}`);}export default function Page() {  return (    <form action={create}>      <input type="text" name="name" />      <button type="submit">Submit</button>    </form>  );}
```

Use Vercel Postgres with Next.js Server Actions (to be announced Thursday)

Vercel Postgres is available for Hobby and Pro users during the public beta.

[Check out our documentation](https://vercel.com/docs/postgres) or get started with a template: