---
title: "OpenID Connect (OIDC) Federation now available in Beta"
source: "https://vercel.com/changelog/oidc-federation-now-available-in-beta"
publishedDate: "2024-07-09"
category: "frontend"
feedName: "Vercel"
author: "Marc Greenstock"
---

1 min read

Jul 9, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6hwbFmAfCiwcbIdBMAVI23%2Fb653c3308f958b72fd1f8fcf43366a95%2FOpenID_Connect_Tokens_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5nsnHdmuzylYvyvat6Xgu5%2F0f50a0bd5d3744d26b2210aa457061bf%2FOpenID_Connect_Tokens_Dark__1_.jpg&w=1920&q=75)

Vercel now supports OpenID Connect (OIDC) Federation, enabling you to enhance your security by replacing long-lived environment variable credentials with short-lived, RSA-signed JWTs for external requests in both builds and Vercel Functions.

You can now leverage Vercel's OIDC Identity Provider (IdP) to issue persistent tokens for cloud providers such as AWS, Azure, GCP, and more.

Enable OIDC in your project's security settings and leverage the `@vercel/functions` package for integration with third-party providers, like this:

```
import { awsCredentialsProvider } from '@vercel/functions/oidc';import * as s3 from '@aws/client-s3';const s3client = new s3.S3Client({  credentials: awsCredentialsProvider({    roleArn: process.env.AWS_ROLE_ARN!,  }),});
```

Learn more about OpenID Connect Federation in the [documentation](https://vercel.com/docs/security/secure-backend-access/oidc).