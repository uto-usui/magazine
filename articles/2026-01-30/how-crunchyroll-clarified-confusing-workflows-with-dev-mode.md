---
title: "How Crunchyroll clarified confusing workflows with Dev Mode"
source: "https://www.figma.com/blog/crunchyroll-dev-mode/"
publishedDate: "2024-08-20"
category: "design"
feedName: "Figma Blog"
---

While streaming service [Crunchyroll](https://www.crunchyroll.com/) boasts the world’s largest anime library, entertainment isn’t the only goal. With offerings like the [Crunchyroll Store](https://store.crunchyroll.com/) and [Game Vault](https://www.crunchyroll.com/games/), the team aims to give the company’s devoted fandom a sense of identity and belonging. Director of Product Design James Hsu puts it this way: “We don’t want to be something for everyone. We want to be everything for someone.”

Being everything for someone would present a challenge to any company, but it’s a particularly thorny one for Crunchyroll. Part of that is due to the sheer number of platforms that it supports, which includes the web client, mobile apps, and a suite of nine living room experiences—think smart TVs, game consoles, set-top boxes, and Roku. Then there’s the global audience of 15 million diehard fans, the complexity of supporting 12 different languages, and intricacies around licensing and rights holding. James and Staff Product Designer Susan Lin see Crunchyroll’s Universal Design System as the ticket to a consistent user experience at scale, but they’ve inherited legacy processes from different mergers and acquisitions that slow adoption and sow confusion. We sat down with them to talk about how they’re shedding old workflows and charting a path forward.

#### [How do you measure design success?](#how-do-you-measure-design-success)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

I have two baseline metrics. One: It looks good, and that means it follows professional design principles. For example, it needs to have proper typographic hierarchy, use a grid system, and have consistent spacing. Two: It works well, which means that the interaction is thought through. It doesn’t have edge cases where you’re stuck in a loop, and the content isn’t written in a confusing way.

#### [Beyond metrics, what value does a design system bring to the table?](#beyond-metrics-what-value-does-a-design-system)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAQFBgL/xAAoEAABAwMCBgEFAAAAAAAAAAADAQIEAAURBjEHEhMVIUFRFCIjYaH/xAAXAQEAAwAAAAAAAAAAAAAAAAACAwQF/8QAHhEBAAIBBAMAAAAAAAAAAAAAAQACAwQREiEiMVH/2gAMAwEAAhEDEQA/AO5WoYkbTMs0wKlnvd0xjcuy53xVIso9tLbyzjEKKf8AiLluOTO2KmaseG4CgFhja0rJCPeVW4a74Ss3xDdLDOjQzDIFGO52ors+V9otG68wJONWqr3N1y9sRIooyq1vnK7rn3StVY7bLfZ4TpDQlI4TVVzl87e6U+J9jKV2lFpsbJGhwCMxrmdF26f2oeobcC5cNjyJaOJJhlRBGz96J8KvtKUp4PTM7VdZK7Sqsl2nduEn1JMNTCef1SlKdzyZYxrwJ//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/805e6fa89e399123c1c1077b2327be416dab914f-597x598.jpg?w=597&h=598&q=75&fit=max&auto=format)

Susan L.

Design systems enable professionalism and consistency, allowing us to create a user experience that looks and feels the same no matter which device a user is watching or shopping from.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

If the font suddenly changes, or the grids are off, or things look weird on mobile, all of those things add cognitive load to the point where people are put off from subscribing. Design systems cultivate that consistency. The second piece is team efficiency. I like to compare design systems to meal prepping. We don’t have to cook a feast every time we want to release a feature. We can use stuff we’ve already prepared—and if we want more, we can think about that. How much is it going to cost? How much time is it going to take?

> I like to compare design systems to meal prepping. We don’t have to cook a feast every time we want to release a feature. We can use stuff we’ve already prepared.

James Hsu, Director of Product Design, Crunchyroll

And finally, a design system brings speed to delivery, which is a competitive advantage. Design systems not only benefit designers, but also our product partners who many want to stand up a quick solution to validate one of their ideas. They also make life easier for our engineering partners. There’s a popular phrase in engineering called DRY: Don’t Repeat Yourself. Without a design system, we keep repeating ourselves with redundant components.

#### [How do you think about Crunchyroll’s Universal Design System?](#how-do-you-think-about-crunchyroll-s-universal)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

We have a foundational layer and then separate component libraries that live on top _per_ client. We have a ton of complexity. We have one-off components with a lot of variants, and our type system is not really dialed in. There’s a sunk cost fallacy. The thing that I always bring up to people on the team, as well as external partners, is the design system is designed to serve _us_. We are not supposed to be prisoners of process to this thing that people before us created.

> The design system is designed to serve us. We are not supposed to be prisoners of process to this thing that people before us created.

James Hsu, Director of Product Design, Crunchyroll

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAQFBgL/xAAoEAABAwMCBgEFAAAAAAAAAAADAQIEAAURBjEHEhMVIUFRFCIjYaH/xAAXAQEAAwAAAAAAAAAAAAAAAAACAwQF/8QAHhEBAAIBBAMAAAAAAAAAAAAAAQACAwQREiEiMVH/2gAMAwEAAhEDEQA/AO5WoYkbTMs0wKlnvd0xjcuy53xVIso9tLbyzjEKKf8AiLluOTO2KmaseG4CgFhja0rJCPeVW4a74Ss3xDdLDOjQzDIFGO52ors+V9otG68wJONWqr3N1y9sRIooyq1vnK7rn3StVY7bLfZ4TpDQlI4TVVzl87e6U+J9jKV2lFpsbJGhwCMxrmdF26f2oeobcC5cNjyJaOJJhlRBGz96J8KvtKUp4PTM7VdZK7Sqsl2nduEn1JMNTCef1SlKdzyZYxrwJ//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/805e6fa89e399123c1c1077b2327be416dab914f-597x598.jpg?w=597&h=598&q=75&fit=max&auto=format)

Susan L.

The team has gone through a lot of change, so I think people are in different parts of the design system journey. Some just need some education on how investing time and energy upfront will pay off dividends in the end.

Dev Mode has been helpful for our engineering counterparts to actually get the values we want and find out which component we’re using. As a team, we’re always iterating on our components. We’re excited to integrate [Code Connect](https://www.figma.com/blog/introducing-code-connect/)

into our workflow as part of upcoming changes.

![A view of Crunchyroll’s Primary Button component in the design system, which is rendered in orange, yellow, and blue states](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYDBAf/xAAgEAABBAICAwEAAAAAAAAAAAABAAIDBAURBhIhMVFS/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABkRAAMBAQEAAAAAAAAAAAAAAAABAgMxQf/aAAwDAQACEQMRAD8AwTj+dxdGpFHbrGR7d9j0B2rNbJUr+VmNKIxNcPmvCRkw8KAOUcD+CijGYt2usS9atJPwZXRAO03yPqFPMNSED0hKGf/Z)![A view of Crunchyroll’s Primary Button component in the design system, which is rendered in orange, yellow, and blue states](https://cdn.sanity.io/images/599r6htc/regionalized/47c7c0e0e5e31a0219e9cb14c164d6775dcaa4ae-1600x900.jpg?w=804&h=452&q=75&fit=max&auto=format)

A peek into Crunchyroll’s Universal Design System

#### [Before Dev Mode, how did you keep parity between design and code?](#before-dev-mode-how-did-you-keep-parity-between)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

My predecessor had set up a system based on Jira workflow triggers. When a feature with a component change dependency was released, it would automate an alert to the right stakeholders who managed that component. It was super convoluted, and no one had the latest thinking because of time zone dependencies. It manifested in a ton of inconsistencies across our applications.

Documentation existed entirely in Zeplin as its own project called _Universal Design System_. It was cumbersome. We had one design system per client—one for iOS, one for Android, one for tvOS, one for Android TV. Even managing the roster of people who needed access was convoluted.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAQFBgL/xAAoEAABAwMCBgEFAAAAAAAAAAADAQIEAAURBjEHEhMVIUFRFCIjYaH/xAAXAQEAAwAAAAAAAAAAAAAAAAACAwQF/8QAHhEBAAIBBAMAAAAAAAAAAAAAAQACAwQREiEiMVH/2gAMAwEAAhEDEQA/AO5WoYkbTMs0wKlnvd0xjcuy53xVIso9tLbyzjEKKf8AiLluOTO2KmaseG4CgFhja0rJCPeVW4a74Ss3xDdLDOjQzDIFGO52ors+V9otG68wJONWqr3N1y9sRIooyq1vnK7rn3StVY7bLfZ4TpDQlI4TVVzl87e6U+J9jKV2lFpsbJGhwCMxrmdF26f2oeobcC5cNjyJaOJJhlRBGz96J8KvtKUp4PTM7VdZK7Sqsl2nduEn1JMNTCef1SlKdzyZYxrwJ//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/805e6fa89e399123c1c1077b2327be416dab914f-597x598.jpg?w=597&h=598&q=75&fit=max&auto=format)

Susan L.

I had to get invited, I had to figure out how to navigate the branch and find a specific use case, and compare it to the design from three years ago. With Dev Mode in our new system, it’s a lot easier for someone to just drop in and get the information they need.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

With our previous tool, if you wanted to find a specific signup flow for a payment type, you would have to wait four to five minutes for each artboard to load. Then you’d find that it wasn’t the flow you were interested in and continue the hunting and pecking process. That was a pain that migrating over to Dev Mode quickly solved for us; we have much faster parsing.

#### [What did handoff look like?](#what-did-handoff-look-like)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

A designer would put work up for review in Zeplin, and they would tag another designer to do a phase called design QA, or a peer review. Then that reviewer would put it back to “in progress.” So whatever was exported was never truly final; you wouldn’t know unless the component label on the artboard was updated to “ready for development.”

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAQFBgL/xAAoEAABAwMCBgEFAAAAAAAAAAADAQIEAAURBjEHEhMVIUFRFCIjYaH/xAAXAQEAAwAAAAAAAAAAAAAAAAACAwQF/8QAHhEBAAIBBAMAAAAAAAAAAAAAAQACAwQREiEiMVH/2gAMAwEAAhEDEQA/AO5WoYkbTMs0wKlnvd0xjcuy53xVIso9tLbyzjEKKf8AiLluOTO2KmaseG4CgFhja0rJCPeVW4a74Ss3xDdLDOjQzDIFGO52ors+V9otG68wJONWqr3N1y9sRIooyq1vnK7rn3StVY7bLfZ4TpDQlI4TVVzl87e6U+J9jKV2lFpsbJGhwCMxrmdF26f2oeobcC5cNjyJaOJJhlRBGz96J8KvtKUp4PTM7VdZK7Sqsl2nduEn1JMNTCef1SlKdzyZYxrwJ//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/805e6fa89e399123c1c1077b2327be416dab914f-597x598.jpg?w=597&h=598&q=75&fit=max&auto=format)

Susan L.

That’s purely legacy. It’s kind of like if you’re an engineer and you push a merge that’s just deleting a bunch of code. That’s a good thing because you’ve cleaned up a bunch of cruft. Similarly, all 20 designers on the team aren’t following the old process anymore.

#### [How did you handle making the switch to Dev Mode?](#how-did-you-handle-making-the-switch-to-dev-mode)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

We had a ton of previous process issues. Keeley Laures, one of the designers on the team, created documentation and onboarding workshops for developers on how to approach handoff and get the specs and code they need.

#### [How has the handoff process changed with Dev Mode?](#how-has-the-handoff-process-changed-with-dev-mode)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

When we’re ready for handoff, we add a new page with the canvas tidied up and labeled “ready for development.” An engineer gets a Figma link to that specific page and doesn’t have to care about any of the ideation. That has been a big change in the workflow. It loads incredibly quickly, which was a huge pain point. Seat and role assignment has been really easy because anyone who’s an engineer gets a Dev Mode seat.

It’s facilitated alignment a lot faster, too, because if there are any discrepancies in tech feasibility, we can leave comments. Figma has a great feedback loop of pinging you whenever you get mentioned, and then you can have a conversation and come to a resolution. Having it all laid out has been instrumental in making sure that everyone is on the same page about functionality.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAQFBgL/xAAoEAABAwMCBgEFAAAAAAAAAAADAQIEAAURBjEHEhMVIUFRFCIjYaH/xAAXAQEAAwAAAAAAAAAAAAAAAAACAwQF/8QAHhEBAAIBBAMAAAAAAAAAAAAAAQACAwQREiEiMVH/2gAMAwEAAhEDEQA/AO5WoYkbTMs0wKlnvd0xjcuy53xVIso9tLbyzjEKKf8AiLluOTO2KmaseG4CgFhja0rJCPeVW4a74Ss3xDdLDOjQzDIFGO52ors+V9otG68wJONWqr3N1y9sRIooyq1vnK7rn3StVY7bLfZ4TpDQlI4TVVzl87e6U+J9jKV2lFpsbJGhwCMxrmdF26f2oeobcC5cNjyJaOJJhlRBGz96J8KvtKUp4PTM7VdZK7Sqsl2nduEn1JMNTCef1SlKdzyZYxrwJ//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/805e6fa89e399123c1c1077b2327be416dab914f-597x598.jpg?w=597&h=598&q=75&fit=max&auto=format)

Susan L.

Another benefit is that depending on the rapport and level of design collaboration they prefer, developers _can_ see the rest of the work in progress. I’ve had experiences where they’ve been able to come in and make really good suggestions, or point out things I missed while working through a problem so it can be incorporated into the final handoff version.

The team’s favorite plugins include:

-   [Table to Sticky notes](https://www.figma.com/community/plugin/1221892477305959368/table-to-sticky-notes) to turn raw user research into movable stickies
-   [Autoflow](https://www.figma.com/community/plugin/733902567457592893/autoflow) to quickly make UX flows alongside delivery files
-   [Grammarly](https://www.figma.com/community/plugin/1334904059266350853/grammarly-beta) to work effectively on content, and integrate it into the next generation of their style guide
-   [Mobbin](https://www.figma.com/community/plugin/1332649462188834894/mobbin) to streamline competitive analysis

In addition to engineering, we have our product folks come in, and QA relies on Figma to cross-check that things look and work the way they should. I’ve really liked going through all the design systems that are published in the community and taking a look at those for reference, or even looking at new plugins and tools.

![A screenshot of how the plugin Stark checks the color contrast on a badge component](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQGAwf/xAAjEAACAgIBAgcAAAAAAAAAAAABAwIRAAQhBQYSExUxQUJx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDhyFJ4Loxox4o/ONdEiGMWsi4eK5AGrH7inSyWNZGZsBZoHNtSRGuAD9sbQrH73aqmGHpO5ceCfOBs4ZLtJLCT74YF/9k=)![A screenshot of how the plugin Stark checks the color contrast on a badge component](https://cdn.sanity.io/images/599r6htc/regionalized/4908b8392a0b84a51f4b120f8056379b1b45f6ad-2400x1350.jpg?rect=0,1,2400,1349&w=804&h=452&q=75&fit=max&auto=format)

The team uses Stark, an accessibility plugin, to check the contrast on a badge component.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGBAX/xAAoEAACAgIBAgUEAwAAAAAAAAABAgMEAAUREiEGEyMxUQcVIjJBYbH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AjXj7whc06QWYQ8tV1CuQP1b+8zWy1slF68YYTNMoPSg7g/GUv6zbe9Qsx6+GX0bUSl1X+Rxkz1tm7rNzTsAMsyMCnmDn/cKdaGrFqN/ofAcv2uFrrNDM46zHx3UH25xlJ1dHZ2KizWG9ST8j2+cYTqh1znCU30GwmjluEyyKOzMeSM5pakMk6eYvV0jkFjzxjGaQJ6Q2FxAFW1MAPYdZxjGRaf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/80234b319e3940ba04442993b8f878d450a8e88f-1163x1163.jpg?w=1163&h=1163&q=75&fit=max&auto=format)

James H.

Dev Mode makes me think a lot less, and makes my life a lot easier. We have the momentum to move forward with the new generation of tools that’ll make us work more effectively, so we can focus on the user.

Learn more about [how Crunchyroll saved 146 hours per project with Dev Mode](https://www.figma.com/customers/how-crunchyroll-streamlined-workflow/), or [get in touch with our Sales team](https://www.figma.com/contact/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=Crunchyroll) for tailored guidance.