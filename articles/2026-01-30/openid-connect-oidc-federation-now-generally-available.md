---
title: "OpenID Connect (OIDC) Federation now generally available"
source: "https://vercel.com/changelog/openid-connect-federation-now-generally-available"
publishedDate: "2024-10-23"
category: "frontend"
feedName: "Vercel"
author: "Marc Greenstock"
---

1 min read

Oct 23, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4hgXnSnJvcHqrHEe41sAu1%2F429e494876e503be422e1a940ce67744%2FOpenID_Connect_Tokens_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1YMPG1yzyE5m4fUBjRVk2x%2F142eda6fe089f52d6d278b691724ab8c%2FOpenID_Connect_Tokens_Dark.jpg&w=1920&q=75)

Vercel's OpenID Connect (OIDC) Federation is now generally available. Strengthen your security by replacing long-lived environment variable credentials with short-lived, RSA-signed JWTs for builds and Vercel Functions.

Use Vercel’s OIDC Identity Provider (IdP) to issue tokens for cloud providers and services like AWS, Azure, Firebase, and Salesforce.

With general availability, we are also introducing a new Team Issuer mode, which mints OIDC tokens with a URL unique to your team. This allows you to configure your cloud environment with stricter zero trust configurations.

To enable Vercel OIDC, update your [project's security settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsecurity&title=Enable+OIDC+Federation) and integrate it using the `@vercel/functions` package. If you're already using Vercel OIDC, we recommend opting into Team Issuer mode in those [settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsecurity&title=Enable+OIDC+Federation).

```
import { awsCredentialsProvider } from '@vercel/functions/oidc';import * as s3 from '@aws/client-s3';const s3client = new s3.S3Client({  credentials: awsCredentialsProvider({    roleArn: process.env.AWS_ROLE_ARN!,  }),});
```

Check out the [documentation](https://vercel.com/docs/security/secure-backend-access/oidc) and [blog post](https://vercel.com/blog/enhancing-security-of-backend-connectivity-with-openid-connect) to learn more.