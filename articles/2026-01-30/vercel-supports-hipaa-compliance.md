---
title: "Vercel supports HIPAA compliance"
source: "https://vercel.com/blog/vercel-supports-hipaa-compliance"
publishedDate: "2024-05-01"
category: "frontend"
feedName: "Vercel"
author: "Kacee Taylor"
---

3 min read

May 1, 2024

Vercel is committed to providing a [secure](https://vercel.com/security) and reliable platform for hosting websites and applications—across all industries. But this can be challenging with industry-specific regulations, especially for healthcare organizations and entities that process protected health information (PHI).

Today, we're excited to announce that Vercel supports compliance with the Health Insurance Portability and Accountability Act of 1996 (HIPAA) for our enterprise customers, enabling relevant companies to leverage our Frontend Cloud while maintaining compliance with industry-specific regulations.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7gefOHTGZ68TUZijXXDEM1%2Fd35d150cd9f8699f2300077ff5690dba%2FHIPAA_blog_graphic__2_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5mzCNmEZqyFMsIsaLwne3o%2Fd87cae9ec548a43187706cdb5f8efbf9%2FHIPAA_blog_graphic__1_.png&w=1920&q=75)

## [Link to heading](#what-does-this-mean-for-our-customers)**What does this mean for our customers?**

HIPAA promotes the use of electronic health records while safeguarding the security and privacy of PHI.

Vercel is considered a business associate for our healthcare customers, including hospitals, medical services providers, research facilities, and insurance companies, who must comply with HIPAA as "[covered entities](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html)." Being a business associate—an entity that provides services to covered entities—requires Vercel to comply with certain HIPAA obligations.

Based on a customer's configuration, Vercel’s records may contain healthcare information, which could include data relevant to PHI. Any additional data captured within the platform is at the discretion of Vercel’s customers. We do not manage or review this information. We help ensure that our customers' data is stored in their systems securely and is highly available for their use per our [Shared Responsibility Model](https://vercel.com/docs/security/shared-responsibility).

Another way Enterprise customers can ensure interactions with their digital presence are secure, resilient, and performant is through [Vercel Secure Compute](https://vercel.com/docs/security/secure-compute). Secure Compute adds an additional layer of security to applications by placing deployments and build containers in an isolated network with dedicated IP addresses in a region of their choice and logically separated from other containers.

[

**Get started**

For more information about IP blocking or Secure Compute on Vercel Enterprise, or if you require support for VPC peering or VPN connections, please contact our sales team.

Contact Us



](https://vercel.com/contact/sales)

Having an isolated network with dedicated IP addresses provides customers more control over which resources access their network. Additionally, enabling VPC peering (AWS only) and VPN support allows customers to establish secure tunnels within their AWS infrastructure, creating fewer entry points into their networks.

### [Link to heading](#how-did-we-do-this)How did we do this?

We wanted to bring the same level of rigor to evaluating our compliance with HIPAA that we apply to our SOC 2 Type 2, PCI DSS, and ISO 27001 frameworks. To achieve this, we underwent an independent third-party audit to ensure that we support compliance with the HIPAA Security Rule and HITECH Breach Notification Requirements.

Our evaluation involved several key steps to ensure the protection of health information:

1.  **Understand HIPAA requirements**: We familiarized ourselves with business associate requirements to understand our obligations to covered entities for protecting PHI.
    
2.  **Conduct a risk assessment**: We conducted a risk assessment to identify potential risks and vulnerabilities and understand if improvements were needed.
    
3.  **Implement administrative, physical, and technical safeguards**: We updated policies and procedures, including our incident response plan, with HIPAA-specific breach notification requirements. We also implemented HIPAA-specific training for staff and reviewed our encryption, access, and backup controls to ensure the availability and integrity of PHI if stored or transmitted by Vercel.
    
4.  **Signing business associate agreements (BAAs)**: We sign BAAs with enterprise customers who are covered entities under HIPAA to outline each party's responsibilities for protecting PHI.
    
5.  **Conduct regular audits and monitoring**: We regularly audit and monitor our systems and processes to maintain ongoing compliance with HIPAA requirements, including reviewing access logs, conducting vulnerability scans, and performing risk assessments.
    
6.  **Stay informed and up to date**: We regularly monitor updates to the Security Rule, HITECH Breach Notification Requirements, and standard industry practices to keep Vercel up to date and continue to support compliance with evolving requirements.
    

## [Link to heading](#dedication-to-security-and-compliance-)Dedication to security and compliance

Healthcare organizations can confidently host their websites and applications on Vercel, knowing that we support compliance with HIPAA. Our successful completion of an independent HIPAA audit underscores our commitment to protecting our customers' information.

This achievement reaffirms our dedication to providing a secure and reliable platform for businesses across all industries, including healthcare. We look forward to helping healthcare organizations thrive in an increasingly digital world while ensuring the highest standards of data security and privacy.

[

**Take the next step**

Reach out to an expert to learn more about security on Vercel for your Enterprise.

Get in Touch



](https://vercel.com/contact/sales)