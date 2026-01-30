---
title: "Unlocking the power of Code Connect: Best practices for design systems teams"
source: "https://www.figma.com/blog/unlocking-the-power-of-code-connect/"
publishedDate: "2024-05-22"
category: "design"
feedName: "Figma Blog"
---

Design systems play a pivotal role in creating consistent, efficient, and high-quality user experiences across products and platforms. However, managing design systems and ensuring code consistency can be challenging, especially when it comes to collaboration between designers and developers. While these two disciplines have often operated in silos—with designers focused on creating compelling user experiences and developers concentrated on building robust, maintainable code—fostering a shared language and unified workflow can unlock new opportunities.

[![Contact sales](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAk0lEQVQImSWO2w6CQAxE+VGjInKXZZeLrAJiSPzsHlP2oZnOpNOZKLkgzojYBsoMqTIwNdgHVDkobyrI75DGUKSBOwNNGbTr6dDVK1GWIL1F/AizR2Z/INsCnznsfgANHB2sL/iu8Nth32AaoM5DgDNIpN/bGsYOefbQtcGsh+8poHJtqybVdDRIcbBQaPsbxGfkDyodrDp1sujJAAAAAElFTkSuQmCC)![Contact sales](https://cdn.sanity.io/images/599r6htc/regionalized/681ff46c0596d92030e5a8c09b1f28f6851c79bb-5586x1014.png?w=5586&h=1014&q=75&fit=max&auto=format)](https://www.figma.com/contact/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=Framework)

Last month we hosted [Framework 2024](https://www.figma.com/blog/what-we-launched-at-framework-2024/)

, where we invited panelists from Bumble, GitHub, and HP to join Designer Advocate Ana Boyer, for a discussion on the challenges in connecting design to code. They also shared their first-hand experiences and impressions of

[Code Connect

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD10lEQVQ4jTWTbUyVZRjHHzRE5AAHkAMccFJRh2ITOC8oR2IHDpznec5zznkO54W3o034YLX8QC161aTZcmm5UrJszdEci3QucQop9IG30FlJSUtlc5ACLdemVpuU9mvPg3z43x+u/67//buvXbfwX9wsSyJujn/jfuWXxGFOpHdxMWmAhWXTIMwt+sKc7u0zv8WXqw8xk3CB4ZSv6E/rZm7FhO4L2rEkLWxq5Rhdpg/pzN7NRNKgXlvy78VdZzz5FHvMOzhj7OH3+EkGU4/yvrmD3vQu5lf8iHA/bhZNC8tmuJo4xmHTB+zOfYO+tG5uxv/M/bgbujT6O8un9Ma9uW/yveGMTn9t5XmOZHbyTu7rOogwknWWEdMA/Tkn2F3wNi1FLews2E6v+SiL3lnGMs5wLn2A/qzjdBRs58XCNnrWHGE0a4DxzG8YS+ujy7SfV9ZuQ5BqWtFUVRujpFak2OXC5QojuVuQalvxVrcS2rCFyPoW5MoY5ZUyZVUy7poYYm0Lmyte4NjaHiYNw5xM+xwhKeYgqdmBMWojWynFLJeSHrZjaHawKuYgtd6OWbaS7bOSFrGT5beRK1nJDGp9dix1Xg4UfsIfCZf5c/kUgiFWgbF+I2bFyRqpnMygk5SmjSTFyjHEnGSEneTJ5ZiC5Ria1pMatZOtWPVQY6gUiyqx/4mPubViCoR5hMcadlCkvkqxZxtPKs/zePQ1Hq1vJz+ylYfDW7EEnmOd/BKWUDumpgb9ktSojRyvjRy5hGJRotOyFDiHIIau4FFGqPb04Fb68dRN4lZHqfR+gUs5jkvqoUbuoyo4hKVhFykxF6tiNoxRByallLJKD5/mH+RW/IPAoO8GijiOIo5R5/+NiHqXgPcyXnEEVbmG33sJr2cIjzJKUXQvqTE3iZtsJMXKMIatbKjwcDj3I24/dFVffkGsOak3a8GR4D3C6l/4pO9QpPOEArcJqXfwyz9RLR7DUtdGSnOlHpjc6GC1WsqGpzx8tuYgswkTXEkcRXC7DuGTLxJW7xKtgzr/TbziKH7vJJHgAhGt5punWuyhILCF5CYnhkY7poCNHKkEq9vDu4V7OZXRzXvmnRph7yKhf45I8B9U3wxecQjVN00keP8B4eQiYbCNtIZKnSxPtJIZsPJIoJrN9mfYufZlOvLatRle1+eniN/qYX75kk6okYbVv/XnLs5wmHWhPZgDVZilEn0fkxvtZEad1DrD7MvbxTnDaQSNQguSPYM6mUbrky7o89Muk2q/xif9gBKcxqYeIN/jIttbQkq9g8RNdkxRJ0/bn2XMeFr/2/8DoxqUTCRy8pAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/4b569560fb80744397542d4700c1363bacbbda88-1608x1206.png?w=1608&h=1206&q=75&fit=crop&crop=focalpoint&auto=format)

### The right code for your design system

Today, we’re announcing beta for Code Connect, a feature built to improve design system adoption by making code more accessible and useful for developers.



](https://www.figma.com/blog/introducing-code-connect/)

, our latest Dev Mode capability—now available in beta. Here, we unpack some of the key takeaways from that conversation.

![A title card with "Design to Code: Roundtable discussion with Code Connect users" text, showing portraits and names of Ana Boyer from Figma, and Gilson Hoffmeister, Lukas Oppermann, and Raul Menezes from other companies.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC0ElEQVQokT1SS2/TWBj1L0CskQqIJWhwHo6d+P2I4zSxndiN47zTwDBFlWiLCBQEEohNEb8B/gErNkYaiafYjdAsBsSsZkEXIFeAUEUYBPeMfAexOPoe936Pe85lOmGA2XSK07MZJqMRhv0eBr0ehoM+JuMRwnYbmqpAqpRRKQvgCnnk2ZMQywJ8z0W/F2MlCGDqGrhiAUzLczEa9DGdjDEdj6iljQd9mu/HXXTCENng7K5l6BD4EniuCEWqwNRVqLIIgSuiwLJg6jUb3c4KLYyjiG6YIY466EYd9OLuj7MOopUQbd+DZRjgSyUU8hyK+RKKeQ65XA5s7hcwsliBaeh0cra2bZmwLev/2NBRNQ0KQ9NoLvNVWYbE2dD436CJ25CkOTh5FScUB0whx9K3Z9xkyLjRVYXaisBDV1WoiowyX4IiibBMA5qsoMWOcIG9hw35NbrOa9juYwj+XTB8iYNpGLSoxBVRs6uIuxGWHYeSfnZtDadmM7R9H6uTCebzC1j79Qy2hA3cX3qE3499xG1hgWnzM/xwD0zNtjEcDtFsNFAWeHhuE9PJhDYb9Hu4dvUqLs7nVKzzm5u4tbODK9vbuBZewh/aQ3w6+g5Pj3zAtv4VURtgfNcls9Up8dwmkcQK8VyXxN2I1KoWadQdMhmPSD+OSaNeJ0GrRXpxTMJ2m2ydOUde3HxOvlspeXVoj9yQvpAoIIRxajaClo9M7Yw733URtls/xWh5HpbrDnRNpXQ4tk3/5fp4DS+uP8c3I8XLQ3u4IX1BFBAwqiyluqqkslihaNTrqe82U8sw0qppUL9Rd1JT19Jlp5Z6bjN1qtV0y1p//6f8ZH9/6e3i2eEPi0v6v4soIAuGK+STYj6XFHJsUioWElWWEk1RkrLAJ2JZSHRNTVRFTioCnyiimBi6lliq/uDy8Y1nfx14+vc/B9+9ucPu755ufNvtBNj9D6JfsBuCmj2sAAAAAElFTkSuQmCC)![A title card with "Design to Code: Roundtable discussion with Code Connect users" text, showing portraits and names of Ana Boyer from Figma, and Gilson Hoffmeister, Lukas Oppermann, and Raul Menezes from other companies.](https://cdn.sanity.io/images/599r6htc/regionalized/344d991cb1c0270e2ded3d0a0ad413afe7b5b1e0-3840x2161.png?w=3840&h=2161&q=75&fit=max&auto=format)

## [Speak the same language](#speak-the-same-language)

One of the primary hurdles highlighted during the discussion was the inherent disconnect between the design and development worlds. As Lukas Oppermann, Staff System Designer at GitHub, points out, “Designers and developers speak a little bit of a different language.” This linguistic barrier often manifests in the form of inconsistent naming conventions, misaligned component properties, and mismatched expectations. Gilson Hoffmeister, Design System Strategist at HP, adds, “You have to create this third language where they can communicate, and then everyone will understand each other.”

Design systems are emerging as one such common language. By defining shared terms, patterns, and components, everyone on a team can ensure that they’re on the same page. Part of establishing that shared language means not only codifying those decisions, but also ensuring that they’re easy to find and implement.

## [Meet designers and developers where they are](#meet-designers-and-developers-where-they-are)

“One of the most challenging things when it comes to keeping consistency is determining where your source of truth is,” says Raul Menezes, Design System and Platform Engineer at Bumble. This frequent disconnect can lead to inconsistencies, custom implementations, and a growing codebase that becomes difficult to maintain. Raul explains, “If you keep repeating this pattern over and over again, your codebase starts to increase, and you can’t keep track.”

He continues, “Designers are always going to build the documentation, and when it comes to engineering, they might rely on a different source.” That’s why we designed Code Connect to integrate seamlessly into existing developer workflows, allowing teams to surface and distribute their design system’s best practices and documentation directly within their code editors.

## [Simplify adoption and start small](#simplify-adoption-and-start-small)

[As many design systems managers will tell you](https://www.figma.com/blog/the-future-of-design-systems-is-marketing/), “build it and they will come” doesn’t always apply. That’s why it’s important to lower the barriers to adoption and reduce friction wherever possible, especially among developers. Gilson points out how Code Connect helps with this, saying, “The developer doesn’t have to change context. Before, they had to go to our website to take a look \[at how a design was implemented\].” With Code Connect, developers can see if or how a design was implemented, directly from Dev Mode.

The panelists also shared best practices, such as starting small and focusing on high-impact components. This approach can serve as an effective strategy for introducing Code Connect to your team. “The goal is to start small,” says Gilson. “Code Connect, to me, is a first step for something bigger.”

As Raul advises, “Start with much smaller components, like a toggle, so you can understand how you map those.”

> Code Connect, to me, is a first step for something bigger.

Gilson Hoffmeister, Design System Strategist at HP

## [Embrace each other’s expertise](#embrace-each-other-s-expertise)

[![An abstract graphic with fuscia, green, and blue rectangles and a code symbol](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD10lEQVQ4jTWTbUyVZRjHHzRE5AAHkAMccFJRh2ITOC8oR2IHDpznec5zznkO54W3o034YLX8QC161aTZcmm5UrJszdEci3QucQop9IG30FlJSUtlc5ACLdemVpuU9mvPg3z43x+u/67//buvXbfwX9wsSyJujn/jfuWXxGFOpHdxMWmAhWXTIMwt+sKc7u0zv8WXqw8xk3CB4ZSv6E/rZm7FhO4L2rEkLWxq5Rhdpg/pzN7NRNKgXlvy78VdZzz5FHvMOzhj7OH3+EkGU4/yvrmD3vQu5lf8iHA/bhZNC8tmuJo4xmHTB+zOfYO+tG5uxv/M/bgbujT6O8un9Ma9uW/yveGMTn9t5XmOZHbyTu7rOogwknWWEdMA/Tkn2F3wNi1FLews2E6v+SiL3lnGMs5wLn2A/qzjdBRs58XCNnrWHGE0a4DxzG8YS+ujy7SfV9ZuQ5BqWtFUVRujpFak2OXC5QojuVuQalvxVrcS2rCFyPoW5MoY5ZUyZVUy7poYYm0Lmyte4NjaHiYNw5xM+xwhKeYgqdmBMWojWynFLJeSHrZjaHawKuYgtd6OWbaS7bOSFrGT5beRK1nJDGp9dix1Xg4UfsIfCZf5c/kUgiFWgbF+I2bFyRqpnMygk5SmjSTFyjHEnGSEneTJ5ZiC5Ria1pMatZOtWPVQY6gUiyqx/4mPubViCoR5hMcadlCkvkqxZxtPKs/zePQ1Hq1vJz+ylYfDW7EEnmOd/BKWUDumpgb9ktSojRyvjRy5hGJRotOyFDiHIIau4FFGqPb04Fb68dRN4lZHqfR+gUs5jkvqoUbuoyo4hKVhFykxF6tiNoxRByallLJKD5/mH+RW/IPAoO8GijiOIo5R5/+NiHqXgPcyXnEEVbmG33sJr2cIjzJKUXQvqTE3iZtsJMXKMIatbKjwcDj3I24/dFVffkGsOak3a8GR4D3C6l/4pO9QpPOEArcJqXfwyz9RLR7DUtdGSnOlHpjc6GC1WsqGpzx8tuYgswkTXEkcRXC7DuGTLxJW7xKtgzr/TbziKH7vJJHgAhGt5punWuyhILCF5CYnhkY7poCNHKkEq9vDu4V7OZXRzXvmnRph7yKhf45I8B9U3wxecQjVN00keP8B4eQiYbCNtIZKnSxPtJIZsPJIoJrN9mfYufZlOvLatRle1+eniN/qYX75kk6okYbVv/XnLs5wmHWhPZgDVZilEn0fkxvtZEad1DrD7MvbxTnDaQSNQguSPYM6mUbrky7o89Muk2q/xif9gBKcxqYeIN/jIttbQkq9g8RNdkxRJ0/bn2XMeFr/2/8DoxqUTCRy8pAAAAAASUVORK5CYII=)![An abstract graphic with fuscia, green, and blue rectangles and a code symbol](https://cdn.sanity.io/images/599r6htc/regionalized/4b569560fb80744397542d4700c1363bacbbda88-1608x1206.png?w=1608&h=1206&q=75&fit=max&auto=format)](https://www.figma.com/blog/introducing-code-connect/)

[Read more about](https://www.figma.com/blog/introducing-code-connect/) [Code Connect](https://www.figma.com/blog/introducing-code-connect/), which delivers code from your design system to Dev Mode, helping developers build with consistency and speed for a streamlined handoff.

While we often talk about bridging the gap between design and development, it’s also important to recognize and embrace the unique expertise that each discipline brings to the table. As Lukas points out, “With Code Connect, we can actually move the design and the code a little bit further apart again. We can concentrate on creating the best UX for the designers working in Figma with design libraries and, on the code side, we can have the best developer experience.” By acknowledging and leveraging each discipline’s distinct strengths, design systems can foster a more collaborative and efficient workflow. He adds, “This is something that we can start working on today: making it so that working with both sides of a design system is really awesome for the people who actually do it. That can also help with adoption.”

> With Code Connect, we can actually move the design and the code a little bit further apart again.

Lukas Oppermann, Staff System Designer at GitHub

## [Foster continuous collaboration](#foster-continuous-collaboration)

![A title card with "Creating a more connected design system with Code Connect" text, showing portrait and name of Jake Albaugh from Figma.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC3klEQVQokT1ROW8TQRjdH8BV0IAARVQREO9pr9dre9f2Hl7bWds46yOOIeEsQGlAMqKIkMIloKOgQJRQcEiIZoRASkRDgwQFAgoKoCFhTICAwiGYh3aDKJ6+743me997M5znumgGY9gz0Y3Q645jvN1CKxhDp91Cc6wBu5CHriWRTmnQNQ1qIh71/mglutOo15E3DSiyBM4rumg1g0goxN5eD3t6ExjvtFfPJroIGg3UfB81fxSVUika1tQEMrqGvJlFNp2CqsiQeB5c0bERNHZHjkI3obtupx3xdqsZ9WGtVX04VgFmNoNUUoUsSZBEBbIYhywoEAQBvDACLpvWUXQdVMolhPEdy4oiFnJmBCufi5BJ64jLEkQhBpHnoYo5GIlDMFInoOvHoaQnsTPjgssZWVT9UUxNTmKi20XOMCCLAiSRhyT8Q8gFHiIfgxAbgRTjUdnVwTH+DqbTr9B0X8GuzEOtXgMXRun1epiZmcHs7Gz0XoooRoNiLBRYFfnP+RHIMR5Tw5O4t20OD7Z/xgX1O/aWV+Dv/gjOdWxUqz76/T7Onz8XuUwoEoTYLoj8CAR+tYbuwqjhAlkQcTgzhSfGHL4MLeDRtiX0zV8IagCnyBJLaRrrdNrswP59zPPKTFHzTFQ9JiYrTFTLTFJ9lkg0WTLRZcl4l6WSPXZ06gx7dvoZ+1Og7MWmATul/2BBnTEu/DHTyKLkeXBsC7rmwNT78ArXUbbuoGTdQsm6i7J9H2VnDmV7HqPFeZw88hTPTy/gd26A55sHOKX/QFBn4PI5kxYdm7q2TbNpnZpyiR6UrtKz8bf0UvwjvRin9ExyifaNr3TaWqFHrRU6ba/Qy5Vv9HV+iX7fukgfb1miJ8yfNKgxyqVTGtE1jSQTcSJLAvF2uuTKlqvk5YY35N26AXmz/gN5sXFAHg59IreHl8nN4WVya3iZzA99Ih/WLpL3axbJjR1fyeHibzJWB/kLwle8Bt23XhwAAAAASUVORK5CYII=)![A title card with "Creating a more connected design system with Code Connect" text, showing portrait and name of Jake Albaugh from Figma.](https://cdn.sanity.io/images/599r6htc/regionalized/bbf2dc5d4debf941b7d573daf3b5ffef68c53a0c-3840x2168.png?w=3840&h=2168&q=75&fit=max&auto=format)

[In this Framework session](https://www.youtube.com/watch?v=5GVNfbltrQg&t=1s), Figma Developer Advocate Jake Albaugh shares an overview of Code Connect and some tips on how to get started.

Effective design-to-code handoff is not a one-time event but an ongoing process that requires continuous collaboration between designers and developers. As Raul emphasizes, “Code Connect is just about being more efficient—not just as an engineer, but also as a designer. It bridges the gap between communication between both teams.” Design systems can facilitate this ongoing collaboration by providing a shared language, clear documentation, and open lines of communication. Regular design critiques, code reviews, and feedback loops can help ensure that both designers and developers are aligned and working towards a common goal.

## [Unlock the full potential of design systems](#unlock-the-full-potential-of-design-systems)

By meeting designers and developers where they are, simplifying adoption processes, embracing each other’s expertise, and fostering continuous collaboration, organizations can unlock the full potential of their design systems to streamline product development and elevate their end user experience.

At Figma, we’re committed to empowering teams to build better together, and [Code Connect](https://www.figma.com/blog/introducing-code-connect/)

is just the beginning of that journey. As Gilson puts it, “When \[Code Connect\] came out, it just ignited more things that you can do with Figma.” We couldn’t agree more.