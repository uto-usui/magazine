---
title: "Design system 104: Making metrics matter"
source: "https://www.figma.com/blog/design-systems-104-making-metrics-matter/"
publishedDate: "2025-02-11"
category: "design"
feedName: "Figma Blog"
---

Beyond the substantial time savings, [the experiment](https://www.figma.com/blog/measuring-the-value-of-design-systems/) uncovered a qualitative benefit: Participants reported greater confidence in their designs when using a design system, knowing they aligned with the overall product.

The data speaks for itself: [Figma’s data science team found](https://www.figma.com/blog/measuring-the-value-of-design-systems/)

that designers with access to a design system completed tasks 34% faster than those without. To put this in perspective, consider a team of seven product designers, each with 20 hours of focused design time per week. With a 34% efficiency boost from a design system, it’s like adding 3.5 designers to the team every week. At companies like Vanguard, [where design updates are 50% faster with proper systems in place](https://www.figma.com/customers/vanguard-designs-fifty-percent-faster/), these gains compound dramatically.

> With a 34% efficiency boost from a design system, it’s like adding 3.5 designers to the team every week.

While teams often focus on creating components and documentation when first building a design system, measuring adoption and usage reveals the true business impact. Companies like Headspace have seen [20%–30% time savings on straightforward tasks and up to 50% on complex projects](https://www.figma.com/blog/building-a-design-system-that-breathes-with-headspace/) through their use of tokens and variables, while Swiggy cut [feature rollout time in half](https://www.figma.com/customers/how-swiggy-rolls-out-features-50-percent-faster/) after implementing robust tracking. These metrics illuminate clear paths to improved consistency, efficiency, and scalability.

[![An abstract digital illustration featuring a geometric composition of layered, book-like structures. A large blue rectangular shape dominates the center, appearing as if it's flipping open or unfolding. Beneath and around it, multiple stacked layers in green, orange, and yellow extend outward in a stepped pattern, resembling fanned-out pages or architectural forms. Some of the layers contain black abstract markings, evoking a sense of encoded information or digital text. The background is a vibrant orange, enhancing the contrast between the structured elements and their surroundings.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACcklEQVQokT2N/UsTYQDH7+8p1JLIDLQfIqNAZU1zmCjmZrvnee6eu3t2e78t3Xvp0NlsMl+2IZFhaBqRJSRKZrBNvSnk3eYotYik/QtxGcH3pw98Pl/qK9vwyq0PhfvGw6atwe78YFcq2DsQMqX9/ds+40d/byzUGwwZF/2mA79RdnXMP2h6Y2oswSunsJbaZu6MW328Ny15MknnVNIx6XbPIHfa78rMuNJxd0qUUpwrPexMLUrxNYksYP1rpkXmm49QI7UPWybZGBE+Y7Iv8jLBOxDv0pzMCQUr2RNIAXAywDKHd31kc9aRWBb7VoW2Xb71GF2lfoC6D5AJcyucUEL8IcIlyJYQPmSEMkPKjFBGuITYEsQljlfD4rs54tzgdUXUeEpXUxW6SqWbZtGQlc0CRoVIhUwRskWtgouILQJGBUiFrIpw0YJ3RpmJNdB+Yq6tmM9TFbr6BNQtwX47XDCDfRooACoAaQINFRocnA0gRavAAwmsLJu5Y3N9xVxFVUCNytRPEQMkI/34E0AKZBTIqlA7VAD6q2nwH+HhzgRIFoDuN32B+gUurJMbkqez22M12uYBt6eZuHjmQ1YLgf9Eg4rErC9B9ze6gToCl+YcOjrQczdg7Ak8NrtXGWvOasnaLVlezEFbnhNzNpK1WbKsNQ9teUHMSWRzmk3kaT11BC8uOW/Z/B33AwY6CvhoxBd4kvHEnnlHI8G4LfJ0yDf2XBqZ8Y56g+OOcCI+OPbSFX1PxAK8TZ2iczK5nLFfD9tvPgq1xkYM85GOwoBe9rW9GDYkop1vg+1fHuq2fG3TQ/eSw10b/vay1PxdvPYT1fwBrKhh+9QD84QAAAAASUVORK5CYII=)![An abstract digital illustration featuring a geometric composition of layered, book-like structures. A large blue rectangular shape dominates the center, appearing as if it's flipping open or unfolding. Beneath and around it, multiple stacked layers in green, orange, and yellow extend outward in a stepped pattern, resembling fanned-out pages or architectural forms. Some of the layers contain black abstract markings, evoking a sense of encoded information or digital text. The background is a vibrant orange, enhancing the contrast between the structured elements and their surroundings.](https://cdn.sanity.io/images/599r6htc/regionalized/829eff3112679648cd51df7c04bc0fa7800921c5-3264x1836.png?w=3264&h=1836&q=75&fit=max&auto=format)](https://www.figma.com/blog/design-systems/)

### [Reading the signals](#reading-the-signals)

In design systems, there are usage metrics, adoption rates, consistency scores, and other performance indicators. But, which are the right ones for your organization? The number of times components are utilized or design tokens are applied can provide insight into which parts of your design system are the true workhorses. And then there’s time—precious time saved due to component reuse, a quantifiable benefit that wins over stakeholders and teams alike.

Key metrics to consider tracking include:

-   **Library and component usage:** Monitor which components, variables, and styles see the most use—and which don’t. This data helps identify opportunities to improve or deprecate underutilized elements.
-   **Documentation effectiveness:** Track how teams interact with your documentation. Popular pages and common search queries can reveal where teams need the most guidance.
-   **Consistency measures:** Look for patterns in component detachment or style overrides that might signal areas where the design system isn’t meeting team needs.

For Veronica Agne, Senior UX Designer at athenahealth, component detachment rates offer particularly valuable insights: “If someone in our organization is detaching a component, I want to know why,” she explains. “It can mean one of three things: There’s a bug, people want an enhancement to the functionality that isn’t there, or people are combining existing elements in ways I didn’t expect. I care about all three of those answers.”

This detective work recently paid off when Veronica noticed an uptick in detachments for a container component. “We had a little auto layout issue where it wasn’t wrapping the way we needed it to,” she recalls. “I saw a bunch of people detaching it and realized that was likely why. I didn’t have to wait for someone to specifically tell me it was a problem before I could fix it.” After working in data science and analytics and now leading design for athenahealth’s Forge design system, Veronica brings a unique perspective to measuring the success of a system that operates at scale—serving hundreds of designers, developers, and product managers, with around 100,000 component insertions per month.

### [Leveraging tools and automation](#leveraging-tools-and-automation)

Consistency scores and accessibility compliance serve as vital signs of a design system’s health. By treating monitoring as part of an ongoing routine—rather than a periodic checkup—you’re more likely to catch potential issues before they escalate. Automation can free teams to do what they do best—design and innovate—rather than getting bogged down with the minutiae of data tracking. With plugins, build scripts, and testing frameworks, manual tasks give way to efficiency and precision.

Starting February 11, 2025, [Figma’s updated Library Analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) give Organization and Enterprise customers deeper insights into how their published libraries are being used without leaving their design environment. Teams can now track adoption of variables and styles, in addition to the existing component analytics, directly within Figma, making it easier than ever to understand design system usage across their organization. Library analytics include:

-   **Components:** Monitor usage patterns and identify which elements teams use most
-   **Styles:** Track how color, type, and effect styles are implemented across files
-   **Variables:** Understand how tokens and dynamic properties are leveraged

For Enterprise customers, [the new Library Analytics API](https://www.figma.com/developers/api?fuid=1432791402720782010#library-analytics) provides even more flexibility to customize analytics views. Teams can see usage patterns over specific timeframes, combine different types of data, and integrate design system metrics with their existing tools and workflows.

### [Making data actionable](#making-data-actionable)

At athenahealth, Veronica and her team have been some of the first to try out Figma’s latest Library Analytics additions, leveraging it as part of their process for turning metrics into improvements. “I use Figma’s updated library analytics to have more fine-grained control over seeing how, when, and why people are detaching components,” she explains. Her team uses custom scripts to transform the API data into detailed reports, adding context like component types and expected detachment rates, then visualizing and reviewing it monthly via a [Tableau dashboard](https://help.tableau.com/current/pro/desktop/en-us/dashboards_create.htm).

This data then drives a three-step process:

1.  **Diagnostics:** Examining components for obvious issues
2.  **User outreach:** Connecting with teams to understand their needs
3.  **Implementation:** Creating tickets for necessary improvements, whether in Figma or code

“We’re constantly trying to make sure there are no problems in our design system,” says Veronica. “People aren’t going to report every issue they have. If I have another metric that can point to an issue, I don’t need to rely on people’s willingness to tell me something is wrong.”

[At Squarespace](https://www.figma.com/blog/introducing-design-system-analytics/), the design systems team leverages the [compare libraries filter](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) to track migration between different versions. This allows them to monitor usage between old and new iterations, and ensure older versions are properly deprecated.

Microsoft also uses design systems analytics as a form of feedback. “There are so many teams at Microsoft using the Fluent Design System, and we don’t always get feedback from them about what’s working and what’s not,” [says Microsoft’s Damien Aistrope](https://www.figma.com/blog/introducing-design-system-analytics/), previously Principal Designer on Fluent. “So it’s helpful for us to see which components aren’t being used and not important to maintain, as well as which components are often detached and may need updating.”

> There are so many teams at Microsoft using the Fluent Design System, and we don’t always get feedback from them about what’s working and what’s not.

Damien Aistrope, previously Principal Designer, Fluent Design System Studio at Microsoft

![A screenshot of a design system analytics dashboard titled 'Libraries' is displayed on an orange background. The dashboard is open to the 'Analytics' tab and focuses on 'Variable insertions,' showing a line graph that tracks insertion trends over a 30-day period. Below the graph, a 'Top teams' section ranks teams by the number of variable insertions, with the 'Core Team' leading at 372,516 inserts (94%). A 'Usage statistics' table lists color variables such as 'Cyan,' 'Maroon,' and 'Neon Green,' along with data on total instances, inserts in the last 30 days, and detachments. The highest-used variable is 'Cyan,' with 917,580 total instances and 109,630 inserts in the last 30 days.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAXABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwQI/8QAJxAAAQIFAwIHAAAAAAAAAAAAAQACAwQFBhEHEjETIhQ2QVRyc5L/xAAWAQEBAQAAAAAAAAAAAAAAAAAEBQb/xAAfEQACAwACAgMAAAAAAAAAAAABAgADBAURITFBUWH/2gAMAwEAAhEDEQA/ANNse06bWaQJmdMQRC4jtOArGdO6JwHRifkmlIzbfAI6hVxA57QpuTHQ9CsyDvqWd/Iaa9LqrkAGeerik4dPrU1KwM9OG/aM8oui9PM8/wDYUWYuAFjAfZm1zEtUrH2QJPWhe0Og0vwj5V0U7i7cDhTY1Pgexf8ApESa+R0VqEU+BBW8Rltc2Ovk/pmdVydFSqsxNtaWCK7dtPoiIhsxYlj8yiihFCr6E//Z)![A screenshot of a design system analytics dashboard titled 'Libraries' is displayed on an orange background. The dashboard is open to the 'Analytics' tab and focuses on 'Variable insertions,' showing a line graph that tracks insertion trends over a 30-day period. Below the graph, a 'Top teams' section ranks teams by the number of variable insertions, with the 'Core Team' leading at 372,516 inserts (94%). A 'Usage statistics' table lists color variables such as 'Cyan,' 'Maroon,' and 'Neon Green,' along with data on total instances, inserts in the last 30 days, and detachments. The highest-used variable is 'Cyan,' with 917,580 total instances and 109,630 inserts in the last 30 days.](https://cdn.sanity.io/images/599r6htc/regionalized/90f892b23f6d69d3454b0c60c089e5d40c39e89f-3380x3840.jpg?rect=0,1,3380,3838&w=804&h=913&q=75&fit=max&auto=format)

Figma’s updated Library Analytics dashboard reveals how teams use their design system, tracking everything from variable insertions to color tokens—all within their existing design environment.

### [Best practices for measuring impact](#best-practices-for-measuring-impact)

**Model learning** is a process of constructing and training computer programs to recognize patterns, make predictions, or understand behaviors from data.

For teams looking to start or improve their metrics tracking, Veronica suggests taking a historical approach: “Take a backwards look before trying to take a forwards look. Using Library Analytics, you can go back a year and examine what happened during a period where you already know the outcomes. It’s almost like **model learning**—you can look at what might have pointed to those outcomes and use that to identify what to look for in the future.”

> Using Library Analytics, you can go back a year and examine what happened during a period where you already know the outcomes.

Veronica Agne, Senior UX Designer, athenahealth

While the benefits of tracking metrics are clear, the process does come with challenges, such as maintaining data quality, gaining stakeholder buy-in, and translating insights into action. Other best practices include:

-   **Measure early and often:** Don’t wait until after launch to start tracking metrics. Early measurement helps identify adoption barriers and opportunities for improvement before they become systemic issues.
-   **Set clear goals aligned with business objectives:** Tie metrics to specific outcomes. Are you trying to increase adoption? Improve consistency? Reduce design debt? Your goals should inform which metrics matter most.
-   **Look beyond surface numbers for context:** A high detachment rate isn’t always negative—it might indicate a component designed for customization is working as intended. Context matters.
-   **Share insights broadly with stakeholders:** Build support for your design system and demonstrate its impact on efficiency and consistency by sharing out metrics.

[![A screenshot of a design analytics dashboard titled 'Earthling SDS' is displayed on a green background with a subtle drop shadow effect. The dashboard is open to the 'Analytics' tab, showing a line graph labeled 'Component insertions' with a visible spike in early January. A dropdown menu is open, revealing three options: 'Components,' 'Styles,' and 'Variables,' with 'Variables' being hovered over. Below the graph, a 'Top teams' section lists teams and their component insert counts, with the 'App Team' leading at 55 inserts (93%). Further down, a 'Component statistics' table details component names, total variants, total instances, and the number of inserts and detaches in the past 30 days. The 'Footer' component has the highest activity with 25 total instances, 9 inserts, and 8 detaches.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAcIAwQG/8QAJxAAAQIFAgUFAAAAAAAAAAAAAQACAwQFBhESIgcTITZzMUFCUWH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBgEDBf/EAB0RAAICAQUAAAAAAAAAAAAAAAABAgMxERQyUVL/2gAMAwEAAhEDEQA/AJwicOKMyG52qYOATgOXP2vblGr5mwyTqMqZeJoPO6av0KUyWkkF21YwyCw5ZtOfZQoR6KNvX5RXu4ZSHT6zNSsHJhwnlrc+qLYvLuaoeQohXkxZrSTSLB/IoQPpERYwlfLy7mqHkKIiEeRes5s//9k=)![A screenshot of a design analytics dashboard titled 'Earthling SDS' is displayed on a green background with a subtle drop shadow effect. The dashboard is open to the 'Analytics' tab, showing a line graph labeled 'Component insertions' with a visible spike in early January. A dropdown menu is open, revealing three options: 'Components,' 'Styles,' and 'Variables,' with 'Variables' being hovered over. Below the graph, a 'Top teams' section lists teams and their component insert counts, with the 'App Team' leading at 55 inserts (93%). Further down, a 'Component statistics' table details component names, total variants, total instances, and the number of inserts and detaches in the past 30 days. The 'Footer' component has the highest activity with 25 total instances, 9 inserts, and 8 detaches.](https://cdn.sanity.io/images/599r6htc/regionalized/da5c5940f04346d9415254c4ddd9b2b5f812a7f0-1252x1252.jpg?w=1252&h=1252&q=75&fit=max&auto=format)](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)

### [Planning for scale](#planning-for-scale)

As your design system matures, your approach to metrics should evolve, too. Regular review of your metrics strategy ensures you’re tracking what matters for your current stage of development. Consider segmenting data by team or product to gain more granular insights. This can help identify where additional support or customization might be needed.

Remember that metrics are a means to an end: They should help you build a more effective, widely adopted design system that makes your team more efficient and your products more consistent. Use these measurements to guide improvements, demonstrate value, and ensure your design system continues to meet the evolving needs of your organization.