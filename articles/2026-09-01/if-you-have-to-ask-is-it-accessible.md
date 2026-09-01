---
title: "If you have to ask, is it accessible?"
source: "https://webaim.org/blog/if-you-have-to-ask-is-it-accessible/"
publishedDate: "2026-08-31"
category: "accessibility"
feedName: "WebAIM Blog"
author: "George Joeckel"
---

As one of the researchers identifying products and tools for inclusion in the [NCADEMI EdTech Accessibility Directory](https://ncademi.org/provide/directory/), VPATs have been on my mind. Most of the product vendors in the directory that do have VPATs do not provide them publicly, but instead require a potential customer to request the VPAT. This really surprised me, and my gut reaction was “Why would you allocate resources to creating a VPAT only to create a friction point for someone that is interested in giving you money?”

## What is a VPAT?

The Voluntary Product Accessibility Template (VPAT®) is a free template developed by the [Information Technology Industry Council](https://www.itic.org/policy/accessibility/vpat) that translates accessibility requirements and standards (e.g., in Section 508 and other legal frameworks) into actionable testing criteria for products and services. A completed product VPAT is called an Accessibility Conformance Report (ACR), but the terms “VPAT” and “ACR” are generally used interchangeably.

## Who is it for?

A [2021 ITI post](https://www.itic.org/news-events/techwonk-blog/accessible-technology-a-call-for-more-than-the-minimum-in-federal-contracts) explains the problem the VPAT was created to solve:

> Many employees living with disabilities rely on internet-, hardware-, and software-based accessibility solutions to help empower them in their workplaces. Although minimum [U.S.-based](https://www.section508.gov/manage/laws-and-policies) and [international](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.01.01_60/en_301549v030101p.pdf) legal standards exist for accessible technologies, determining whether a product will fully meet employees’ needs can be challenging.

A VPAT can be used by potential users or customers of a product to provide insight into the accessibility of that product.

## Reasons for requiring customers to request a VPAT?

To gain some insight into the vendor perspective, I asked a number of AI Agents to answer this question:

> “Why might a vendor legitimately need to require a potential client to request a product’s VPAT?”

I synthesized the results into the top three categories: **customized information**, **competitive information**, and **correct information**. Below are hypothetical statements that might represent a vendor’s concerns from each of these categories followed by a response to those statements.

## Customized Information

> We have an extensive list of products and need to make sure that potential customers have the right information based on which version or configuration of a product they are considering.

The VPAT template encourages vendors to indicate the relevant product version or configuration. In cases where accessibility is not substantively different across multiple versions or configurations, the VPAT can be scoped to document accessibility across these. This concern can best be addressed by vendors providing current and properly scoped VPATs rather than shifting the burden on potential customers to request these.

## Competitive Information

> We can’t make proprietary information available publicly. We even require prospects to sign a non-disclosure agreement (NDA).

The California State University San Marcos addresses this directly on their [VPAT Vendor Requirements](https://www.csusm.edu/iits/services/accessibility/services/procurement/vpat.html) page:

> A VPAT does not contain or disclose proprietary information; instead, quality VPATs will faithfully represent a product’s current accessibility conformance, whether accessible or inaccessible.
> 
> The current accessibility conformance of any product is readily available to anyone accessing a product’s interface, and as such, **CSUSM will not sign vendor NDAs to receive accessibility conformance documentation**.

## Correct Information

> We sell our products to customers from a range of countries across public and private industries. We need to make sure that our prospects get the right information.

Providing information to diverse customers can generally be addressed by the four editions of the VPAT—508, EU/EN 301 549, WCAG, and International—each aligned to different standards and contract requirements, and separate WCAG-version variants within those. In addition to providing VPATs, vendors can readily provide their prospects with additional guidance and information.

## Is this really a pervasive issue?

Given that the [EdTech Accessibility Directory](https://ncademi.org/provide/directory/) project I’m working on only has 60 published products to date, I decided to gather some additional data. I generated a list of over 231 K-12 products that had at least “moderate usage” based on some AI-driven research. I then used Google Gemini to analyze these product’s web pages and documentation for VPAT references.

Of the 186 unique vendors across the 231 products, a reference to VPAT information was only detected for 35—about 1 in 5 (19%). And among these 35 vendors, more than 1 in 5 of them (22%) required a prospect to request a VPAT rather than posting the VPAT publicly. While not a substantive assessment, this AI-driven research does suggest that access to product VPATs may be a challenge.

## What about the vendors that did provide a VPAT?

I wish I had better news to share here. While the early stages of the directory still has a limited set of products, of the 27 vendors thus far that have provided public access to their VPATs (thus implicitly demonstrating an awareness of accessibility guidelines), 6 of them provided VPAT documents that failed an accessibility evaluation

While publishing a VPAT does not mean that the relevant product is accessible, I want to acknowledge the 21 K12 EdTech vendors that did provide publicly-available, accessible VPATs!

-   [Adobe](https://www.adobe.com/) (Acrobat)
-   [Book Creator](https://bookcreator.com/)
-   [Braining Camp](https://www.brainingcamp.com/)
-   [Code.org](https://code.org/)
-   [CoGrader](https://cograder.com/)
-   [Desmos](https://www.desmos.com/)
-   [EBSCO Information Services](https://www.ebsco.com/)
-   [Edpuzzle](https://edpuzzle.com/)
-   [Google Classroom](https://edu.google.com/workspace-for-education/classroom/)
-   [Instructure](https://www.instructure.com/) (Canvas LMS)
-   [Kahoot!](https://kahoot.com/)
-   [LEGO Education](https://education.lego.com/)
-   [Math Playground](https://www.mathplayground.com/)
-   [Microsoft](https://www.microsoft.com/)
-   [Newsela](https://newsela.com/)
-   [Next Gen Personal Finance (NGPF)](https://www.ngpf.org/)
-   [Progress Learning](https://progresslearning.com/)[Project Lead The Way (PLTW)](https://www.pltw.org/)
-   [Swank Motion Pictures](https://www.swank.com/) (Swank Digital Campus)
-   [Typing.com](https://www.typing.com/) (Teaching.com)
-   [WeVideo](https://www.wevideo.com/)

## Where do we go from here?

The infrastructure for doing this right already exists. [OpenACR](https://acreditor.section508.gov/), built by [GSA](https://www.gsa.gov/) and [CivicActions](https://civicactions.com/), turns VPAT data into searchable YAML and JSON so buyers can compare vendors instead of digging through VPATs individually. Education institutions that take this seriously already expect more than a bare VPAT—best practice pairs it with a plain-language accessibility statement and, where a product only partially supports critical criteria, a remediation roadmap with an actual timeline.

Please share your experiences and thoughts in the comments below.