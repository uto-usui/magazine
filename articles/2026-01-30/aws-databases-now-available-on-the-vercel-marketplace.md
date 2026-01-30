---
title: "AWS databases now available on the Vercel Marketplace"
source: "https://vercel.com/changelog/aws-databases-now-available-on-the-vercel-marketplace"
publishedDate: "2025-12-17"
category: "frontend"
feedName: "Vercel"
author: "Michael Toth"
---

1 min read

Dec 17, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4JYtOIcxv7uaav9R9jn3Fo%2F3dda5b39211a0b6084341a0bf983c660%2FAWS-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3Dh4zmIhFOiySYJnjqcuqP%2F672602195602239b3a113cc37f70e050%2Fvercel_aws_marketplace_og_card.png&w=1920&q=75)

Today we’re introducing native support for [AWS](https://vercel.com/marketplace/aws) databases including Amazon Aurora PostgreSQL, Amazon Aurora DSQL, and Amazon DynamoDB on the [Vercel Marketplace](https://vercel.com/marketplace/category/database).

This gives developers a direct path to provision and manage scalable, production-ready AWS databases from within the Vercel dashboard with no manual setup required, and:

-   **One-click support** for creating a new AWS account, provisioning new AWS databases and linking them to your Vercel projects.
    
-   **Improved developer experience** with simplified region selection, secure credential handling, and unified monitoring of AWS database resources from Vercel.
    
-   **Automatic environment variable** for connection strings and credentials, securely stored within your Vercel project.
    
-   **Free starter plan** for new AWS customers, including **$100 in credits**, with deep links to manage or upgrade plans in the AWS console.
    
-   **And coming soon:** Provision databases into your existing AWS account, attach them to your projects, and access AWS databases directly inside [v0](https://v0.app/).
    

lib/postgres.ts

```
import { Signer } from "@aws-sdk/rds-signer";import { awsCredentialsProvider } from "@vercel/functions/oidc";import { attachDatabasePool } from "@vercel/functions";import { Pool } from "pg";const signer = new Signer({  hostname: process.env.PGHOST,  port: Number(process.env.PGPORT),  username: process.env.PGUSER,  region: process.env.AWS_REGION,  credentials: awsCredentialsProvider({    roleArn: process.env.AWS_ROLE_ARN,    clientConfig: { region: process.env.AWS_REGION },  }),});export const pool = new Pool({  host: process.env.PGHOST,  user: process.env.PGUSER,  database: process.env.PGDATABASE || "postgres",  password: () => signer.getAuthToken(),  port: Number(process.env.PGPORT),  ssl: { rejectUnauthorized: false },});attachDatabasePool(pool);
```

Setup a database client

### [Link to heading](#getting-started)**Getting started**

1.  Navigate to the [Vercel Marketplace](https://vercel.com/marketplace) and select [**AWS**](https://vercel.com/marketplace/aws)
    
2.  Choose **Create new** account to provision a database
    
3.  Select your database type, region, and plan (including a free starter plan with $100 in credits for new AWS customers) and hit create
    
4.  Connect it to your project. Vercel automatically handles credentials and configuration
    

You can also try a working example by deploying the [Movie Fetching Database](https://vercel.com/templates/next.js/next-js-vercel-app-with-aurora-postgresql) template to see the integration end-to-end.