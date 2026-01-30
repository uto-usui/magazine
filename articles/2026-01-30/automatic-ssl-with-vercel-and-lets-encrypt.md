---
title: "Automatic SSL with Vercel and Let's Encrypt"
source: "https://vercel.com/blog/automatic-ssl-with-vercel-lets-encrypt"
publishedDate: "2019-04-16"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

3 min read

Apr 16, 2019

Our Vercel platform enables you to deploy modern websites and applications without needing any complicated server configuration. Not only do we automatically configure DNS records for your domain, we also instantly issue and renew free wildcard SSL certificates, completely hands-free.

Historically, companies have spent thousands to get their websites HTTPS-enabled. Not to mention the whole process of issuance, download, re-upload, reconfigure, restart server with downtime — it's always enormously stressful and requires significant engineering resources.

So how are _we_ able to make this process automatic and free?  
All thanks to [Let's Encrypt™](https://letsencrypt.org/), a non-profit whose platform we utilize to issue SSL certificates to our users.

**To support Let's Encrypt's mission to encrypt the web, Vercel is coming on board as a sponsor**.

Let's Encrypt's role has been fundamental in enabling our customers to offer a secure experience to their users.  
In this post, we explore how we utilize [Let's Encrypt™](https://letsencrypt.org/) under the hood.

### [Link to heading](#no-more-painful-and-expensive-ssl-certificates)No more painful and expensive SSL Certificates

HTTPS plays a fundamental role in enabling privacy and integrity on the web today.  
When properly configured, not only does it promise a fast and secure web experience, it opens you up to [better SEO](https://searchengineland.com/googles-gary-illyes-https-may-break-ties-between-two-equal-search-results-230691), [AMP support](https://www.ampproject.org/), and [trustworthy status](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F69G1APIWznNw9R4McQhrFL%2F71a4a3970bda94aa38ac51e09f955864%2Flabelbox-https.png&w=1920&q=75)

[Labelbox](https://labelbox.com/) is one of our great startup customers and a cutting-edge AI company. They never configured SSL and chose to focus on changing the world through machine learning.

When you deploy with Vercel, you never need to think about setting up and renewing SSL certificates for your websites.

### [Link to heading](#use-case-1:-automatic-ssl-and-renewal)Use case 1: Automatic SSL and renewal

You need an HTTPS-enabled site before you can roll it out to customers.  
Vercel completely automates this for you. Once you purchase a domain [through Vercel domains](https://vercel.com/domains) or [set up an external one](https://vercel.com/docs/custom-domains), you can add an alias from the domains tab on the project dashboard.

That's it! The next time you deploy with [`vercel --target production`](https://vercel.com/docs/custom-domains#deploying-with-your-domain), we automatically alias your chosen domain name to the latest deployment, and ensure that they have fresh certificates installed.

Deployments are automatically HTTPS-enabled.

### [Link to heading](#use-case-2:-automatic-staging-for-teams)Use case 2: Automatic staging for teams

Your team is constantly introducing new features via pull requests on GitHub or merge requests on GitLab. Wouldn't it be great to have an instant staging deployment tied to every branch?

Our official [GitHub](https://vercel.com/github) and [GitLab](https://vercel.com/gitlab) integrations trigger automatic deployments when you push your code. Each GitHub PR or GitLab MR gets a distinct, HTTPS-enabled staging URL that your team can use to test work before it gets merged.

![As you introduce new changes to the branch, the deployment URL doesn't change and reflects all the updates.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3F5JVbs0zLNolpxCU5AZ4y%2F0e1af766778af67ee51a9a8b7203c18e%2Fpr-deployment-comment.png&w=1920&q=75)

As you introduce new changes to the branch, the deployment URL doesn't change and reflects all the updates.

Once the branch is merged to the default branch and deployed, as outlined previously, we automatically alias to your chosen production domain name, and ensure you have valid certificates.

### [Link to heading](#under-the-hood)Under the hood

To enable HTTPS on a website, we need a certificate from a trusted [Certificate Authority (CA)](https://en.wikipedia.org/wiki/Certificate_authority), and for that, all CAs require us to prove that we have control over our domain.

In the case of Let's Encrypt, the issuance communication takes place over ACME, a protocol introduced via [IETF RFC 8555](https://tools.ietf.org/html/rfc8555). ACME, which stands for _Automatic Certificate Management Environment_, allows for automated certificate issuance through a series of _challenges_ presented to the owner of the domain name. When you deploy with Vercel, **we communicate with Let's Encrypt on your behalf** through ACME.

There are two main types of _challenges_ under ACME:

-   **HTTP challenges**: applicable to **common domains** (e.g `now.sh`)
    
-   **DNS challenges**: required for **wildcard domains** (e.g `*.now.sh`)
    

When we request a certificate, Let's Encrypt first examines the domain and presents us with an appropriate challenge to solve.

In the typical **HTTP challenge**, we are asked to set up an arbitrary route on our domain, which contains a token specified by Let's Encrypt. For example, they may want to make a request at `http://<domain>/.well-known/acme-challenge/1234` and expect to find `2345` at that location.

In a DNS challenge, Let's Encrypt asks us to create a DNS entry with a specific set of prescribed values.  
For example, we could be asked to create a `TXT` record with the value `ABC`, such that on d`ig TXT _acme-challenge.<domain>.com +short` they are able to access the matched value.

Once issued, we immediately set up the certificate against your domain, and your website becomes HTTPS-ready.

### [Link to heading](#conclusion)Conclusion

At Vercel, our mission is to make the cloud accessible to everyone. We are constantly observing and working with the developer workflow so we can locate unpleasant experiences and fix them.

By making deployments HTTPS-ready automatically, we are able to free the modern developer to focus on their core applications and not on server set up.

Our roadmap is informed by our incredible community of users. We look forward to learning from your experience deploying with Vercel.

For any feedback, suggestions, or just to say hi, please reach out to us on [Twitter](https://twitter.com/vercel) or [Chat](https://github.com/vercel/vercel/discussions).