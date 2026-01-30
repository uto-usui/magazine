---
title: "Opening up the data behind your design systems "
source: "https://www.figma.com/blog/introducing-design-system-analytics/"
publishedDate: "2019-11-20"
category: "design"
feedName: "Figma Blog"
---

_As of February 2025, [Figma’s Library Analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) now includes styles and variables data in addition to the existing components data for both Organization and Enterprise customers, with expanded capabilities available through the [Library Analytics API](https://www.google.com/url?q=https://www.figma.com/developers/api%23library-analytics&sa=D&source=calendar&ust=1739650689598073&usg=AOvVaw2aB3mbDsCCnpFfbmXS9WC0) for Enterprise customers. Functionality in this article may not represent these changes._

As a browser-based tool built entirely in the cloud, Figma has the unique opportunity to provide visibility into how designers use the system. Today, we’re introducing Design System Analytics to make it easier for companies like Microsoft, Squarespace, or any [Figma Organization](https://www.figma.com/organization/) customer to build and maintain their design systems with data.

Design System Analytics enables you to see library usage trends, compare libraries, and drill into component usage.

While building this feature, we worked closely with several customers to learn what they wanted out of analytics and what they didn’t. As a result, we focused on building analytics that illuminate how your design systems are used across your teams, without policing designers’ every move.

Here are some examples from our beta customers about what they’re learning from analytics and how they’re taking action on these insights.

## [Learn what’s working, and what’s not](#learn-what-s-working-and-what-s-not)

With insights into library and component usage, design system managers can make ongoing improvements with quantitative feedback.

Microsoft’s Damien Aistrope, Principal Designer on the Fluent design system, explains, “There are so many teams at Microsoft using Fluent, and we don’t always get feedback from them about what’s working and what’s not. So it’s helpful for us to see which components aren’t being used and not important to maintain, as well as which components are often detached and may need updating.”

At Google, this type of data feedback is helping teams uncover new opportunities to evolve components on an ongoing basis. When reviewing the new analytics reports, Philippe Cao, a Senior Visual Designer on the Material Design Team, discovered that the button component was used and detached more than any other component. This helped him realize that the master component was overly complex and that he should create a simpler version in addition to it, giving designers on his team the flexibility they needed.

## [Understand how libraries are used](#understand-how-libraries-are-used)

With the ability to compare the usage of two libraries over time, Design System Analytics can also help you keep a pulse on library adoption.

For example, the Design Platform Team at Squarespace is working on replacing an existing shared library with a new version that makes use of our upcoming [Auto-Layout](https://twitter.com/figma/status/1176150305379160065) capabilities.

With Design System Analytics, they’ll be able to track adoption of the new library across teams as well as ensure deprecation of the old version.

![A screenshot of the 'Library Analytics' section within Figma's Libraries panel for 'Web responsive 2.0.' At the top, a toggle labeled 'Enable' is turned on. A line chart visualizes component insertions over the last 60 days, with two lines comparing 'Web responsive 2.0' (blue) against 'Web responsive 1.0' (black). The x-axis represents dates from September 21 to November 23, while the y-axis represents the number of component insertions, ranging from 0 to 2000.  Below the chart, a list displays the 'Top 5 teams actively using Web responsive 2.0,' including 'Dashboards' (1,250 inserts, 33%), 'Marketing' (1,002 inserts, 25%), and 'Admin console and dashboards' (810 inserts, 11%), among others.  Further down, a section titled 'All component statistics' lists components with their total instances, insertions, and detachments. One example shown is 'buttons/primary-button' with '10,000' total instances, '5,000' recent inserts, and '3' detachments. A note at the bottom states, '25 library components shown. Figma doesn’t currently track style usage.'](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAABYlAAAWJQFJUiTwAAACFklEQVQ4y42T2W7cMAxF/f8/UfQLin5AURTNZAHiPBZ9zWRrks6MF1mrJfZQ43FToA8hcEFJJi+vSLnx3n8A38FNCOEatM651hjTWmtb3ccYV6SU2nme25zzCdfsb/h2BsfHhoQvLJ6mo43sDUmGgOoJriBxRSllBfuR2Iniz4j4qoTnKBqdtTIZI5BIKfIug1AoJpEcxBhIrxrUbVj0lBB8hrCo1fD/WAaQrEBdRpTAo0ovVOHG+jBMPsnoYrEhiY9zhQNW1ylLnIsE4FPhPFdwXkKCOGdVOoLLJsa0GVwcXk2Ux96Xx87Jv/DyawjyPCZ5MSfM8jpl+W1zObhcbBIK5hFiCBOENgwvJEFQIIU4VDyph/Dh4OR+b+Ue/3Cw8ng4FiKmUKwc7CzGpzGmqjDWKxsXpJ98gVxOIEimUIPl7bmin5x0xhXN0XZZHyFMl3UoxkyD1aE4V5i4VHgvnmbr1HWS6kPdz3LsWe1bSUsP+X7sIcmbAeMN6ZRLWEhOBNxgXWuhoPvMc1neAe9Q8XcoSjiOYw8E0oziU1A5Kkirh7SEiJ9zYeooq4R5eY9KeAGhP0fZqNX12qpIK2qQYqlez6tavX5twby2QuP0rwJXjbX+m7Vuh7oEAsRBjeQVanq+fgPcJLyxBPbgrBl686nrhh/7/f5ut9vddl235forKLKFaAtB9SRtKVL3y/oW3LH+ydnnPzKoN3aNg3cgAAAAAElFTkSuQmCC)![A screenshot of the 'Library Analytics' section within Figma's Libraries panel for 'Web responsive 2.0.' At the top, a toggle labeled 'Enable' is turned on. A line chart visualizes component insertions over the last 60 days, with two lines comparing 'Web responsive 2.0' (blue) against 'Web responsive 1.0' (black). The x-axis represents dates from September 21 to November 23, while the y-axis represents the number of component insertions, ranging from 0 to 2000.  Below the chart, a list displays the 'Top 5 teams actively using Web responsive 2.0,' including 'Dashboards' (1,250 inserts, 33%), 'Marketing' (1,002 inserts, 25%), and 'Admin console and dashboards' (810 inserts, 11%), among others.  Further down, a section titled 'All component statistics' lists components with their total instances, insertions, and detachments. One example shown is 'buttons/primary-button' with '10,000' total instances, '5,000' recent inserts, and '3' detachments. A note at the bottom states, '25 library components shown. Figma doesn’t currently track style usage.'](https://cdn.sanity.io/images/599r6htc/regionalized/4a7d23fd2b9817a9c076319b38d3f8caf0a8a12e-1784x1270.png?rect=0,1,1784,1269&w=804&h=572&q=75&fit=max&auto=format)

Compare usage of two libraries over time to track migration.

Going beyond just library usage trends, you can also dig into how individual components are being used. Designers at Pluralsight, an online education company, are excited to use Design System Analytics to surface how their teammates are using shared components from their [design system](https://design-system.pluralsight.com/). Because Figma allows for open collaboration and Design System Analytics are viewable by anyone at your organization, any designer or manager can quickly view reports they care about or find examples to learn from.

## [Measure the impact of design earlier](#measure-the-impact-of-design-earlier)

With analytics that enable you to look under the hood of your design system libraries, you can also measure design system adoption earlier in the product development process.

For example, the team at Bukalapak, one of the largest e-commerce companies in Indonesia, had previously measured design system adoption in the development phase, by analyzing component usage in their iOS and Android codebases. Now with Design System Analytics in Figma, the Bukalapak team has insight into library and component adoption much earlier, in the design phase, which gives them more confidence in what they ship to development.

We loved hearing what our customers are already doing with these new insights and can’t wait to learn more so we can continue to build upon this feature.

For more on what you can do with Design System Analytics, [get in touch](https://www.figma.com/contact/) to learn more about the Figma Organization plan.