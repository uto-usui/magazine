---
title: "Using Severity Ratings to Prioritize Web Accessibility Remediation"
source: "https://webaim.org/blog/severity-ratings/"
publishedDate: "2024-11-23"
category: "accessibility"
feedName: "WebAIM Blog"
author: "Alaina Foust"
---

So, you’ve found your website’s accessibility issues using [WAVE](https://wave.webaim.org/) or other testing tools, and by completing [manual testing](https://webaim.org/articles/evaluationguide/) using a keyboard, a screen reader, and zooming the browser window. Now what? When it comes to prioritizing web accessibility fixes, ranking the severity of each issue is an effective way to prioritize and make impactful improvements. In WebAIM’s [accessibility audits](https://webaim.org/services/evaluation/), each issue we identify is assigned one of four levels of severity based on how it impacts end users. In this article, we’ll go over these severity ratings for accessibility and the types of issues that typically fall under these categories.

## Critical Issues

Accessibility issues that fall under the critical rating cause web content or functionality to be completely inaccessible to some users. To determine if an issue is critical, consider if a group of users is completely unable to access a specific type of web content. Critical issues typically impact screen reader users and users who navigate using the keyboard. For example, when interactive elements cannot be reached using the keyboard, these users cannot perform important tasks like using navigation menus or selecting elements like buttons or custom form inputs. [Using native HTML elements whenever possible](https://webaim.org/techniques/aria/#rules) and incorporating keyboard and screen reader testing into the development lifecycle can ensure that these issues are avoided.

Other examples of critical issues might be videos without captions that prevent users who are deaf and hard of hearing from accessing media or content that strobes or flashes in a way that may cause seizures for users with photosensitive epilepsy.

## Significant Issues

Accessibility issues that fall under the significant rating cause web content or functionality to be very difficult for some users to interact with or use effectively. A common example of a significant issue is missing visual focus indicators. For users who navigate using the keyboard, missing visual focus indicators make it extremely difficult to know what interactive element has keyboard focus. 

Another example of a significant issue includes empty buttons and links. Buttons and links without descriptive text make it extremely difficult for screen reader users to navigate a page, especially when tabbing between interactive elements. In these cases, users are forced to search for context elsewhere on the page, adding time and frustration to the user experience.

## Moderate Issues

Accessibility issues that fall under the moderate rating cause users to spend unnecessary time or effort to access or use web content or functionality. An example of a moderate accessibility issue is a lack of semantic HTML elements like page regions and headings that help screen reader users navigate the page. Screen reader users will still be able to navigate a page without page regions and headings, but will not be able to navigate directly to specific page regions or headings using shortcuts built into their screen reader’s software.

## Recommendations

Accessibility issues that fall under the recommendation rating are “nice to fix” (as in, “nice to have”), because they represent content or functionality that could be strengthened in terms of accessibility and usability. Recommendation level issues are typically related to accessibility best practices and code maintainability. For example, applying [tabindex=”0”](https://webaim.org/techniques/keyboard/tabindex) to natively keyboard focusable elements, such as links and buttons, does not change the elements’ behavior, but may cause them to be announced redundantly as “clickable” by screen readers. Additionally, the added work of including and then removing tabindex=”0” from natively focusable HTML elements adds extra time and effort to the development process. Becoming familiar with how screen readers announce different elements and considering what information is helpful for users to hear, and what information is redundant, is a straightforward way to improve user experience and code maintenance.

## Conclusion

The issues explained within each level above are just examples. As you perform web accessibility evaluations, applying these severity ratings can help you efficiently prioritize fixes and significantly improve your website’s accessibility.