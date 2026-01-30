---
title: "Bridging design and code with Variants"
source: "https://www.figma.com/blog/bridging-design-and-code-with-variants/"
publishedDate: "2020-10-28"
category: "design"
feedName: "Figma Blog"
---

We believe that a design tool should [embrace concepts from both design and code](https://www.figma.com/blog/config-europe-2020-new-feature-announcements/)

. But every product team will balance these competing considerations differently. While development is about finalizing and scaling a solution through rigor and reusability, design needs uninhibited freedom to iterate on the most promising ideas. The more freedom ideas can have, the more innovative the design solution can be. At Figma, our job is to give you the tools—however way you and your teams work—to design and develop effectively.

As we thought about how to bridge design and code in Figma, we realized the biggest opportunity was to redesign how components are treated. Not only was it difficult to find the right components and switch between related variations (bye, endless instance swap menus!), keeping your design systems organized was tedious and didn’t map to how developers think about components.

As we started to design towards this solution, we worked closely with our users to refine the experience, so it’s helpful and intuitive for a variety of use cases.

## [Aligning how designers and developers think](#aligning-how-designers-and-developers-think)

As a company grows, its design system inherently gets more complex. To manage this complexity, many design system managers adopted a “forward-slash” naming convention to organize components (e.g. default/primary/large/icon). They worked around the limits of our component feature in order to communicate various states and properties that commonly exist in code.

When designing Variants, we wanted to evolve our components feature to support multiple dimensions of variation and a key:value pair naming convention, like state=”hover” and style=”secondary.” Whether your design system consists of simple, single-dimensional components or more complex, multi-dimensional ones, your components in Figma will better mirror your components in code.

After shadowing several design system managers, we noticed that they typically laid out components in a grid in order to work on different variations of a component and compare variations to one another. As a result, we architected the new Variants feature so that all variations of a single component can be laid out [side-by-side](https://help.figma.com/hc/en-us/articles/360055471353-Prepare-for-Variants#canvas)—based on how design system managers actually work in Figma.

This not only proved to be useful for design iterations and library maintenance, it also opened the door for us to build a simple path for users to start using the new Variants feature—simply select all component variations and click “Combine Variants” into one component set.

## [Refining the UI through usability tests](#refining-the-ui-through-usability-tests)

After nailing down component organization, we wanted to design a UI that was both intuitive to use and easy to consume. We built a functional prototype and ran 4 rounds of usability tests over the course of 6 weeks.

One of the harder design challenges to solve was communicating the new key:value naming construct. Our first designs showed all available property values as pills. However, we soon discovered that users struggled to understand this UI as it behaved differently than they intuitively expected.

Because pills are commonly used for tagging an object with multiple attributes, our original premise of always showing all values as pills did not work. After a few iterations, we simplified and switched to a dropdown menu design, only showing a simple input field for every property when a specific variant is selected.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJUlEQVQoz2WSa08aURCGWfbOsuyyAgusAqWoCEIW0KptmlYNxsamsT/PfhLoP/Or8ZqYGC9Pzx5iadIPk3Myk/PMO++cVCqV4i0sy6JcLsuwbZt/a0koivJfrtfrMZlMuLq64uHhIcktioZh4ucDcjkPXTdIp1UBSaOk07KWNNE0XeTTqKKWnP1+n+l0yu3tLU9PT4IjuirKvLuV8ViqrOGXmthukVyhgR+2cLyQanWZ9fW2PMOwzGprjXqtwc7OLtPZjPv7e15fX0klXWRHVSObj1jpjIk2DvArG0TtferxD8JGTDzY4uTkO9vbHxgMhpye/mQ8PuLwcCwV3t3dzYGKVKhIoONVKK9+Jmx9wi22KL3fI+oeUVju0un2xOND4jhmc3OT4+NvfPnylf39A87PJ9zc3PDy8jL3UAI1TYxZIF/tkgtXsXOhVBks93GDiFq9IRdQq9Wo1+uMRiPa7Q32dj8K4DnX19c8Pz8vRtYSYHYJryRgXhkjk8cTYLfQxHI84V2VZrNJEAREUUSn06VSqTIcjuSWk6VIhYm6v0AnL3xcwbB9dDNLNqjN4aZNsVgUgAqO48h7o/EO3w+EBUNms9+Lpbx9GVVVMaysULOEZjiouo0lFJtCqWm54nFBAkzTwnVzFAslslmfQbwlFE7lyI+Pjwvg3EcDTc8IuElaTe42uoDbdh5XwC3LQVN18SctkXMwjYzwNebs7BcXFxdcXl7yB2RuO3D2QHu5AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/a1270f0c812885e1555a128349194cf6ea9d8570-3428x1690.png?rect=0,1,3428,1688&w=804&h=396&q=75&fit=max&auto=format)

However, we kept the pill design whenever users wanted to see all properties and values of an entire component set.

Another learning we discovered along the way is default naming. For example, presenting system defaults like _State_ and _Style_ was actually less intuitive, compared to presenting generic property values (e.g. “Property 1,” “Property 2”) which made it more clear that they should be customized to values like _Type_ or _Size_.

## [Figuring out the right feature name](#figuring-out-the-right-feature-name)

As we got closer to launching Variants, we had to embark on what is usually the most difficult part of any product development process—deciding on the feature name. At the start of this project, we called the feature “States,” as the initial use case we focused on was supporting the complexity of interactive states.

During user testing, one of our users at Fidelity Investments pointed out that the name “States” did not fully represent the full scope and possibilities of this feature. The feature didn’t just enable users to create different states of a component (e.g. hover, active, disabled), it can flex to any property type, like type, color, size, and more: “States seems to water down the power of the feature,” the Fidelity team said. “It makes you think of just button or object states.”

While we couldn’t exactly call it “super customizable component that you can do whatever you want with—feature,” we did agree that the name needed a revisit. Variants emerged as a much better way to capture the complexity the feature can support.

As we started to use “Variants” in subsequent usability tests, our users further validated that name was more intuitive and representative of the scope of the feature.

Paired with the upcoming Auto Layout updates and the new changes to Inspect panel, Variants is working to help you design and develop products more efficiently. And with the help and invaluable feedback from our amazing beta users, the new Variants feature is available today to everyone.

Check out a walkthrough of Variants in [this playground file](https://www.figma.com/community/file/903303571898472063), get more tips in [this help center article](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants), or [read up on best practices](https://www.figma.com/best-practices/creating-and-organizing-variants/).