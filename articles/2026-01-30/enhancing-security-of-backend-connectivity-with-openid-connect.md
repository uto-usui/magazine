---
title: "Enhancing security of backend connectivity with OpenID Connect"
source: "https://vercel.com/blog/enhancing-security-of-backend-connectivity-with-openid-connect"
publishedDate: "2024-08-28"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

6 min read

Aug 28, 2024

Vercel OpenID Connect support helps you replace long-lived credentials with temporary tokens to reduce risk.

In 2014, the OpenID Foundation introduced a new standard for authenticating people online, known as [OpenID Connect (OIDC)](https://openid.net/developers/how-connect-works/). This standard was initially created to simplify the authentication process for users, providing a streamlined and secure way to log into various services. Today, Vercel leverages OIDC to enhance the security of backend connectivity, enabling developers to replace long-lived credentials with more secure, temporary tokens.

## [Link to heading](#the-evolution-and-utility-of-oidc)**The evolution and utility of OIDC**

OpenID Connect was initially introduced as an extension to OAuth 2.0, building on its authorization capabilities to include authentication. This combination allows OIDC to not only grant access to resources but also to verify the identity of the user, thus providing a more comprehensive and user-friendly authentication framework.

But OIDC is not just useful for authenticating individuals, but also for authenticating services to each other. This opened up new possibilities for securing communication between service providers. The core of OIDC lies in establishing trust between service providers and identifying the caller of a service, rather than relying on static secrets.

Here's how it works:

1.  OIDC sets up a trust relationship between an identity provider (IdP) and the services that need mutual authentication.
    
2.  When one service calls another, it presents an OIDC token that identifies the caller.
    
3.  The receiving service can then verify the token and decide whether to accept the call based on the caller's identity.
    

This process eliminates the need for long-lived secrets that can be lost, stolen, or otherwise compromised. The benefits of this approach are twofold, it's:

1.  More secure because there are no static credentials that can be leaked.
    
2.  Operationally easier because the token issuance and rotation are automated.
    

By understanding how Vercel implements OIDC, you'll see how it can improve your application's security, streamline credential management, and reduce potential risks.

## [Link to heading](#leveraging-oidc-with-vercel-for-enhanced-security)Leveraging OIDC with Vercel for enhanced security

Vercel recently introduced support for [OIDC Federation](https://vercel.com/docs/security/secure-backend-access/oidc). Vercel's support allows developers to replace long-lived credentials stored in environment variables with short-lived, RSA-signed JSON Web Tokens (JWTs) for external requests in both builds and [Vercel Functions](https://vercel.com/docs/functions). In other words, you can swap your risky long-living credentials with temporary ones that are verifiable by Vercel and third parties.

![Long-lived credentials increase risk over time, while short-lived tokens are only created as-needed and expire, effectively minimizing associated risks.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ahcrHTLcPXU2auIhCfzFA%2Ff11d383bdaa2f82a8357ca04fd89e457%2FLight_-_1920x_1176.png&w=1920&q=75)![Long-lived credentials increase risk over time, while short-lived tokens are only created as-needed and expire, effectively minimizing associated risks.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3XzRRAMJgMvTz8pJnFttU%2Fa6284f66d2b6e9b97f6b9d73d90f8727%2FLight_-_1920x_1179.png&w=1920&q=75)

Long-lived credentials increase risk over time, while short-lived tokens are only created as-needed and expire, effectively minimizing associated risks.

### [Link to heading](#why-use-oidc)Why use OIDC?

OIDC provides a framework for securing authentication and authorization. It eliminates the need for storing long-lived credentials by issuing short-lived tokens signed by Vercel using RSA cryptography, ensuring their integrity and authenticity.

By using OIDC, you can minimize the window of opportunity for attackers to exploit stolen credentials, automate token issuance and rotation to reduce the maintenance burden on developers, and ensure consistent role-based access control by managing roles instead of credentials.

Using OIDC with Vercel allows seamless integration with other cloud providers and third-party services, leveraging OIDC's broad industry support and standardized protocol. The short-lived tokens issued by Vercel as the OIDC provider are recognized by major platforms like AWS, Azure, Firebase, and GCP. This interoperability enables you to manage authentication and authorization across your entire infrastructure using a single, consistent framework. Whether accessing databases, APIs, or other services, OIDC ensures that your credentials are always up-to-date and secure.

### [Link to heading](#scenario-1:-using-long-lived-credentials-in-environment-variables)Scenario 1: Using long-lived credentials in environment variables

Imagine a typical setup where a developer needs to connect their application to AWS S3. They store the AWS credentials in environment variables like `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. These credentials might look like this in a `.env` file:

```
AWS_ACCESS_KEY_ID=AWSKEYEXAMPLEAWS_SECRET_ACCESS_KEY=AWSSECRETACCESSKEYEXAMPLE
```

These environment variables are then used throughout the application to authenticate and perform operations on S3. A potential issue with this approach is that these credentials may be static and long-lived. Over time, they might not be rotated or updated regularly. If an attacker manages to obtain your AWS credentials, they could potentially misuse these credentials to access sensitive data indefinitely until the breach is detected and the credentials are manually revoked.

![Without OIDC, credentials are typically hard-coded and stored in environment variables, remaining static and reused until manually rotated.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F142FZxzxFwrNikLjcMngWb%2F695a9642af44be4d82fec7cfb0749e4b%2FWithout_OIDC_Light.png&w=1920&q=75)![Without OIDC, credentials are typically hard-coded and stored in environment variables, remaining static and reused until manually rotated.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5b6zy0uyV2ffYMkfGYfjUI%2Fe2fb11dff54549dbb27ed085d851efec%2FWithout_OIDC_Dark.png&w=1920&q=75)

Without OIDC, credentials are typically hard-coded and stored in environment variables, remaining static and reused until manually rotated.

### [Link to heading](#scenario-2:-using-vercel-as-an-idp-with-oidc)Scenario 2: Using Vercel as an IdP with OIDC

By using short-lived tokens, the credentials automatically expire after a short period, mitigating the risk of long-term exploitation. Now, consider an improved setup where the developer leverages Vercel as an Identity Provider (IdP) to manage authentication using OpenID Connect (OIDC).

In this scenario, instead of storing static credentials, the developer configures Vercel to issue short-lived, RSA-signed JSON Web Tokens (JWTs) dynamically when needed. This approach ensures that even if a token is compromised, it is only valid for a limited time, thereby enhancing security.

[First](https://vercel.com/docs/security/secure-backend-access/oidc#getting-started), the developer enables OIDC in their Vercel project's security settings. They then use the `@vercel/functions` package to fetch AWS credentials dynamically. Here’s how the integration might look:

```
import { awsCredentialsProvider } from '@vercel/functions/oidc';import * as s3 from '@aws-sdk/client-s3';const s3client = new s3.S3Client({  credentials: awsCredentialsProvider({    roleArn: process.env.AWS_ROLE_ARN!,  }),});
```

In this setup, whenever the application needs to perform operations on S3, it requests temporary credentials from Vercel's OIDC provider. These credentials are specific to the required operation and have a short lifespan, significantly reducing the risk of misuse. For example, the `awsCredentialsProvider` function is given the Vercel-provided OIDC token, and it then obtains short-lived credentials using the role ARN specified in the environment variable, allowing the application to assume a specific role with limited permissions.

This method aligns with best practices in modern authentication and authorization, ensuring compliance with regulatory standards and reducing the burden of credential management.

![With OIDC, tokens are generated dynamically and have short expiration times, reducing the risk associated with long-lived credentials.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FEYU3wCbsPJSGwFKt7Lpba%2F73465209f3eec5180b431785a3deb795%2FWith_OIDC_Light.png&w=1920&q=75)![With OIDC, tokens are generated dynamically and have short expiration times, reducing the risk associated with long-lived credentials.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7tiE2XUeuWgSbHnDtgNqJS%2F22984e7c19b947320ed33c969baabed5%2FWith_OIDC_Dark.png&w=1920&q=75)

With OIDC, tokens are generated dynamically and have short expiration times, reducing the risk associated with long-lived credentials.

In both scenarios, identical API calls can be made to AWS, but leveraging OIDC offers a significantly more secure authentication method, effectively mitigating associated risks.

### [Link to heading](#how-it-works-under-the-hood)How it works under the hood

Vercel's support for OIDC can provide an easier and more simple method for securing your application. Vercel acts as identity provider that gives your third party, in this case AWS, the means to verify that you are who you say you are. As a request is made through Vercel and goes to compute (Vercel Functions), the request is enriched with an OIDC token that’s been pre-signed and can be verified by the third party. The token may look something like this:

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1yay00MzAyZWMxYjY3MGY0OGE5OGFkNjFkYWRlNGEyM2JlNyJ9.eyJpc3MiOiI8aHR0cHM6Ly9vaWRjLnZlcmNlbC5jb20-Iiwic3ViIjoib3duZXI6bWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0czpwcm9qZWN0Om9pZGMtZGVtbzplbnZpcm9ubWVudDpkZXZlbG9wbWVudCIsInNjb3BlIjoib3duZXI6bWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0czpwcm9qZWN0Om9pZGMtZGVtbzplbnZpcm9ubWVudDpkZXZlbG9wbWVudCIsImF1ZCI6IjxodHRwczovL3ZlcmNlbC5jb20vbWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0cz4iLCJvd25lcl90eXBlIjoidGVhbSIsIm93bmVyIjoibWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0cyIsIm93bmVyX2lkIjoidGVhbV9BMWIyQzNkNEU1RjZnN0g4aTlKMGtMbU4iLCJwcm9qZWN0Ijoib2lkYy1kZW1vIiwicHJvamVjdF9pZCI6InByal9LMkZuVDl5WnhWNkh3UXBMME84UjNzUGRXYzdYIiwiZW52aXJvbm1lbnQiOiJkZXZlbG9wbWVudCIsIm5iZiI6MTcyMzA5ODY5OCwiaWF0IjoxNzIzMDk4Njk4LCJleHAiOjE3MjMxNDE4OTh9.J3XFGWdHdOhnk-nbHKYWz-Aa7fT02RBzTBoGK4zSzeLh_AyMGqGqVknhudedF13sqLKHHvZoo77cryijNAg11V_jyayYsTos7KHuLX9qIjMqlKEC7Fin76z6l3qG6sj-X_JrKTCe_4wpWrIYycK2Tz01XXt2NnWEqfChyQ46n05G0e8WjT3EbL8euxhokQemrNnQLRD1gcsAQ-3_VZZ8CWZ0L5OGFyFT9qaj2cCrm_Pli1uIPpSyyZRzzvM7-X41_w1ajvvoJwSgi8JDqMfRa41Y-ipGFoR-gGAa5cxf1xeXh3W5woz7RexbYPSvrIAcnJUDvofnrdXdbYLjdWM5DQ
```

If you decode this (it's just Base64 encoded, not encrypted, and can be decoded with [jwt.io's debugger](https://jwt.io/#debugger-io?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1yay00MzAyZWMxYjY3MGY0OGE5OGFkNjFkYWRlNGEyM2JlNyJ9.eyJpc3MiOiI8aHR0cHM6Ly9vaWRjLnZlcmNlbC5jb20-Iiwic3ViIjoib3duZXI6bWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0czpwcm9qZWN0Om9pZGMtZGVtbzplbnZpcm9ubWVudDpkZXZlbG9wbWVudCIsInNjb3BlIjoib3duZXI6bWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0czpwcm9qZWN0Om9pZGMtZGVtbzplbnZpcm9ubWVudDpkZXZlbG9wbWVudCIsImF1ZCI6IjxodHRwczovL3ZlcmNlbC5jb20vbWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0cz4iLCJvd25lcl90eXBlIjoidGVhbSIsIm93bmVyIjoibWFyYy1ncmVlbnN0b2Nrcy1wcm9qZWN0cyIsIm93bmVyX2lkIjoidGVhbV9BMWIyQzNkNEU1RjZnN0g4aTlKMGtMbU4iLCJwcm9qZWN0Ijoib2lkYy1kZW1vIiwicHJvamVjdF9pZCI6InByal9LMkZuVDl5WnhWNkh3UXBMME84UjNzUGRXYzdYIiwiZW52aXJvbm1lbnQiOiJkZXZlbG9wbWVudCIsIm5iZiI6MTcyMzA5ODY5OCwiaWF0IjoxNzIzMDk4Njk4LCJleHAiOjE3MjMxNDE4OTh9.J3XFGWdHdOhnk-nbHKYWz-Aa7fT02RBzTBoGK4zSzeLh_AyMGqGqVknhudedF13sqLKHHvZoo77cryijNAg11V_jyayYsTos7KHuLX9qIjMqlKEC7Fin76z6l3qG6sj-X_JrKTCe_4wpWrIYycK2Tz01XXt2NnWEqfChyQ46n05G0e8WjT3EbL8euxhokQemrNnQLRD1gcsAQ-3_VZZ8CWZ0L5OGFyFT9qaj2cCrm_Pli1uIPpSyyZRzzvM7-X41_w1ajvvoJwSgi8JDqMfRa41Y-ipGFoR-gGAa5cxf1xeXh3W5woz7RexbYPSvrIAcnJUDvofnrdXdbYLjdWM5DQ)), you'll see a payload with a few notable details including information that identifies your Vercel account, such as the `environment`, `project`, and `owner`, as well as an expiration date (`exp`):

```
{  "iss": "https://oidc.vercel.com",  "sub": "owner:marc-greenstocks-projects:project:oidc-demo:environment:development",  "scope": "owner:marc-greenstocks-projects:project:oidc-demo:environment:development",  "aud": "https://vercel.com/marc-greenstocks-projects",  "owner": "marc-greenstocks-projects",  "owner_id": "team_A1b2C3d4E5F6g7H8i9J0kLmN",  "project": "oidc-demo",  "project_id": "prj_K2FnT9yZxV6HwQpL0O8R3sPdWc7X",  "environment": "development",  "nbf": 1723098698,  "iat": 1723098698,  "exp": 1723141898}
```

Within your function, you can simply then leverage `awsCredentialProvider`, a function embedded within `@vercel/functions/oidc` which has knowledge of the token. This will kick off an exchange where your Vercel account now takes on the role you send along with the `awsCredentialProvider` request.

Specifically, it calls `AssumeRoleWithWebIdentity` which is described as “returns a set of temporary security credentials for users who have been authenticated in a mobile or web application with a web identity provider.” From here, your token exchange has been automatically handled, it was just created and will expire shortly, and the only thing stored in your application is the Role that needed to be assumed.

By transitioning from long-lived credentials stored in environment variables to using Vercel as an Identity Provider (IdP) with OIDC, developers can make minimal configuration adjustments designed to enhance security.

### [Link to heading](#securing-backend-connectivity-with-vercel)Securing backend connectivity with Vercel

As security threats continue to evolve, it's crucial to adopt best practices that minimize risks and enhance protection. Vercel’s support for OpenID Connect (OIDC) is part of a comprehensive security suite that includes [Secure Compute](https://vercel.com/docs/security/secure-compute), which enables organizations to establish secure perimeters between the Vercel Edge Network and their backend systems. Combined with OIDC’s temporary, RSA-signed tokens, this creates a robust security framework that can reduce the risks associated with credential management and backend connectivity.

Vercel’s security approach is designed to make the web secure by default. By integrating these measures, developers can build robust applications while adding layers of protection against evolving threats. Vercel’s focus on embedded security contributes to a safer, more resilient web.

[Get started with OIDC in your Vercel projects](https://vercel.com/docs/security/secure-backend-access/oidc#getting-started) today and take a significant step towards a more secure and efficient development environment.