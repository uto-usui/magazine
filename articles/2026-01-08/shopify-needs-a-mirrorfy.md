---
title: "Shopify Needs a Mirrorfy"
source: "https://adrianroselli.com/2025/11/shopify-needs-a-mirrorfy.html"
publishedDate: "2025-11-04"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

Shopify is legitimately angry at drive-by ADA lawsuits, as outlined in its recent post [The small business shakedown: Why thousands of entrepreneurs are getting buried in lawsuits](https://www.shopify.com/news/accessibility-lawsuits).

> Like thousands of small business owners across the United States, Clay\*, an online store owner, was sued without warning for his website allegedly not complying with an accessibility law.

But Shopify is wrong there are “no clear guidelines”:

> When it comes to websites, the uncertainty surrounding what constitutes “reasonable accessibility” can be overwhelming. When small business owners attempt to comply they quickly realize there are [no clear guidelines or specific steps](https://www.ada.gov/resources/web-guidance/), and compliance can be subjective.

That’s a signal the author didn’t consult Shopify’s own accessibility team, scroll down the linked ADA page to the linked resources, or talk to an attorney with experience in this area. It might also be a signal the unnamed author ignored them.

Shopify also fails to note it has a role to protect its own clients and, by extension, its clients’ customers. As a platform, Shopify says the following on what it offers:

> At Shopify, we actively collaborate with persons with disabilities to identify and address accessibility issues. We provide merchants with accessibility-optimized components, tools like Sidekick for automated alt text generation, and themes built with accessibility standards from the ground up.

But with nearly a hundred possible WCAG violations on its home page, Shopify’s offering is clearly not up to task. These violations are identified by automated tool that, [according to my own testing](https://adrianroselli.com/2023/01/comparing-manual-and-free-automated-wcag-reviews.html), reports only around 15% of actual WCAG violations. For example, the autoplaying video on the home page fails Success Criteria [1.2.1: Audio-only and Video-only (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html) and [2.2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), neither of which was caught by the automated test.

[![80 issues: 75 need review, 4 serious, 1 minor; these include 10 misused ARIA attributes, 1 non-unique ID, 1 invalid ARIA attribute, 58 contrast issues, and 10 videos without captions.](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_home.jpg)](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_home.jpg) [![99 issues: 95 need review, 3 serious, 1 minor; these include 10 misused ARIA attributes, 1 non-unique ID, 1 invalid ARIA attribute, 77 contrast issues, and 10 videos without captions.](https://adrianroselli.com/wp-content/uploads/2025/10/shopify-home_30-october.jpg)](https://adrianroselli.com/wp-content/uploads/2025/10/shopify-home_30-october.jpg)

Shopify home page as captured on Tuesday, 28 October and again on Thursday, 30 October 2025 using Firefox 144 on Windows 11 with axe DevTools 4.4.2 showing 80 and then 99 WCAG issues.

Shopify’s _active collaboration_ doesn’t seem to include its own site. Nor does it seem to factor into which sites Shopify promotes on its home page:

[![Glossier home page, with 74 total axe issues: 37 need review, 2 are critical, 2 serious, and 2 minor; these include 1 misused ARIA attribute, 1 focusable aria-hidden element, 2 buttons without text, 2 non-unique IDs, 7 lists holding invalid elements, and far more hidden off-screen.](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_featured-01.jpg)](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_featured-01.jpg) [![The Sill home page, with 148 total axe issues: 78 need review, 7 are critical, 61 serious, and 2 minor; these include 2 buttons without text, 121 items with poor contrast, 6 non-unique IDs, 3 images without alt text, and far more hidden off-screen.](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_featured-02.jpg)](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_featured-02.jpg) [![Vacation Inc home home page, with 126 total axe issues: 125 need review and 1 is serious; these include 1 image without alt text, 6 elements misusing ARIA attributes, 1 focusable aria-hidden item, 1113 items with poor contrast, 3 links with same name, and at least one more hidden off-screen.](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_featured-03.jpg)](https://adrianroselli.com/wp-content/uploads/2025/10/shopify_featured-03.jpg)

The home pages of the first three Shopify stores promoted on the Shopify home page as captured on Tuesday, 28 October 2025. Between them they have a combined 348 WCAG issues.

[Shopify provides VPATs](https://www.shopify.com/accessibility#product-vpa-ts), an industry template for identifying how well a _thing_ conforms to WCAG, for four of its flows — [checkout](https://www.shopify.com/accessibility/vpat-checkout) (dated June 2025), [store admin](https://www.shopify.com/accessibility/vpat-admin) (September 2023), [mobile admin](https://www.shopify.com/accessibility/vpat-shopify-mobile) (October 2023), and the [Dawn theme](https://www.shopify.com/accessibility/vpat-theme-dawn) (November 2021). Kudos to Shopify as this is more than many offer. These accessibility conformance reports demonstrate Shopify knows the rules, even if they show gaps in applying them.

If Shopify is going to complain about frivolous lawsuits, it first needs to reduce its and its clients’ exposure to legitimate claims. Shopify has a duty to prevent some of the basic errors these automated checks found. Some very quick ideas, based on my own experience running a CMS and also an ecommerce platform (though not at the same scale as Shopify):

![The Shopify green bag logo, but the S has been replaced with “Total issues 99”.](https://adrianroselli.com/wp-content/uploads/2025/10/shopify-glyph_99-issues.png)

-   Provide accessibility guarantees in the contracts for specific, unmodified templates and features;
-   When a customer makes a change to these, warn them, offer an automated check, and require their acknowledgment;
-   Prevent publishing content with clear violations;
-   Provide access to a response center for clients that have been threatened;
-   Provide ready-to-go response letter templates for demands / threats;
-   Offer access to attorneys at a reduced rate, ideally free for the couple hours it takes a competent attorney to dispute any demand letters;
-   Provide access to experts in a help desk;
-   Or use an LLM, given Shopify wants to replace its human employees anyway, and accept liability for the LLM’s responses;
-   Only promote companies that provide proven accessible shops, creating incentive for other shops to follow;
-   Offer free trainings on creating accessible content;
-   Disallow [accessibility overlay](https://overlayfactsheet.com/en/) widgets on any site, as they are a beacon for complaints.

And so on.

Maybe Shopify already offers all this? Its post, however, doesn’t suggest that. Instead I see a company failing to acknowledge its responsibility. I see Shopify undercutting the ADA, removing motivation to conform to WCAG prior to a complaint.

Shopify’s call for “notice and cure” legislation is not new. It was proposed [last year](https://www.govtrack.us/congress/bills/118/hr7668/text) and regularly [back to 2018](https://www.jdsupra.com/legalnews/house-votes-to-amend-the-ada-to-provide-86600/) or earlier, with [California exploring it this year](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB84). Disability organizations have always opposed notice and cure, [such as NFB](https://nfbofsc.org/comments-ada-title-ii-website-and-mobile-app-notice-proposed-rulemaking-september-19-2023#:~:text=The%20National%20Federation%20of%20the%20Blind%20unequivocally%20objects%20to%20the%20concept%20of%20notice%20and%20cure.), though the [Center for Disability Rights provides a better explanation](https://cdrnys.org/wp-content/uploads/2019/11/ADA-2019.pdf) than I can do here.

All this aside, the ADA doesn’t provide for monetary damages. Amending the ADA with “notice and cure” won’t help businesses. These drive-by lawsuits would still happen under state laws (primarily California and New York).

I wrote a bit about the [scope of the ADA and the web](https://adrianroselli.com/2022/03/ada-web-site-compliance-still-not-a-thing.html) a few years ago, with occasional updates. I did so because the ADA has been broadly misrepresented by scammers — mostly drive-by litigants and [overlay vendors](https://adrianroselli.com/tag/overlay). Shopify feels dangerously close to that line with its article.

Maybe don’t listen to me. I’m not a lawyer.

_Don’t_ listen to Shopify, since it’s not a law firm, it seems to not be protecting its clients, and its leadership doesn’t demonstrate it understands the ADA.

I can’t imagine how frustrating this must be for Shopify’s internal accessibility team(s).