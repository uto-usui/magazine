---
title: "The Figma prototype challenge: 15 tips in 15 days"
source: "https://www.figma.com/blog/the-figma-prototype-challenge/"
publishedDate: "2021-12-14"
category: "design"
feedName: "Figma Blog"
---

Whether it’s for user testing, developer handoff, or critiques, high fidelity prototypes allow designers to test, experiment, and iterate to align on the right solution. We recently released some prototyping updates, including [interactive components](https://www.figma.com/blog/prototyping-updates-and-interactive-components/)

, to empower teams to do just that.

Last month, I kicked off a [15-day prototyping challenge](https://twitter.com/_AnaBoyer/status/1462857515088027650?s=20) to help the Figma Community learn how to take advantage of these new features and level-up their prototyping game. We started with some basic prototyping features to set the foundation, then graduated to more complex prototypes. There were some great responses, like [this map prototype](https://twitter.com/ken_tbdz/status/1456145632154980354) and [this digital camera animation](https://twitter.com/rkdotdesign/status/1462030357797097479).

Whether you want to [do your own challenge](https://twitter.com/ux_elisa/status/1470148911998414851) or just learn some best practices, I’m sharing a recap and all 15 tips, along with Figma Community files to get you started:

[**Day 1**](https://www.figma.com/community/file/1037022884182784668): First up: [smart animate](https://help.figma.com/hc/en-us/articles/360039818874-Create-advanced-animations-with-Smart-Animate). Smart animate is a great transition to use when creating high fidelity prototypes. It can also be used in conjunction with other transitions—which you'll see next—and can be achieved by preserving layer names between screens.

[**Day 2**](https://www.figma.com/community/file/1037386038375929647): [Smart animate matching layers](https://help.figma.com/hc/en-us/articles/360039818874-Create-advanced-animations-with-Smart-Animate) allows you to combine preset transitions (slide, push, etc.) with smart animate. One use case is for building a prototype with tab navigation.

[**Day 3**](https://www.figma.com/community/file/1037758811322279890): [Interactive components](https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components-with-variants) (IC) let you to define interactions and animations between variants in a component set, so instances are immediately “alive” in prototyping mode. By drawing prototyping links between a component’s variants, you can build interactivity into components, reduce prototype size and complexity, and demonstrate microinteractions.

[**Day 4**](https://www.figma.com/community/file/1038122108361101428): Building off of that, you can nest IC to create components with more built-in interactions (such as the list items below) while reducing the number of prototype links needed between component variants.

[**Day 5**](https://www.figma.com/community/file/1038484079931792639): We wrap up the first week of challenges by using all prior concepts to create a mobile prototype with an interactive bottom navigation. This challenge also demonstrates the concept of [inheritance](https://help.figma.com/hc/en-us/articles/4404380377367-Add-prototype-connections-to-components), in which larger components inherit the interactions of nested components, and screens inherit the interactions of components inside them.

[**Day 6**](https://www.figma.com/community/file/1039585993448215107): One of our other [recent prototyping updates](https://www.figma.com/blog/prototyping-updates-and-interactive-components/)

includes the ability to create IC with auto layout to build even more realistic and responsive designs. This example demonstrates an auto layout carousel with IC cards that retain equal spacing, even when the cards resize.

[**Day 7**](https://www.figma.com/community/file/1039945339081565894): In this challenge, we’re using “on drag” to trigger a slide in + smart animate matching layers transition (Day 2’s topic) to create a dynamic scroll effect.

[**Day 8**](https://www.figma.com/community/file/1040310045347087205): You can use the concepts from the two prior challenges to create this drag-to-delete interaction. Each slot is an IC with a delete interaction that triggers on drag. Because the list of items is in an auto layout container, when one is deleted, the other shifts up to take its place.

[**Day 9**](https://www.figma.com/community/file/1040668185941686253): You can also use IC to create a cyclic animation—such as a loader or the recorder shown below—by cyclically connecting your IC variants to each other.

[**Day 10**](https://www.figma.com/community/file/1041040209555236984): After practicing with auto layout and smart animate from the prior challenges, you can focus on using them to create parallax effects. Timing and spacing are key—even if two layers are animated at the same time and duration, if one moves further, it will move faster.

[**Day 11**](https://www.figma.com/community/file/1042121747370813942): In the final week of the challenge, we’re slowly building up the elements needed to create a high fidelity map prototype with multiple points of interaction. In this first part, you learn how to use Figma’s “scroll to” feature.

[**Day 12**](https://www.figma.com/community/file/1042484113009858186): Then, we combine on drag and smart animate to create a map zoom-in/out effect.

[**Day 13**](https://www.figma.com/community/file/1042849811068780332): Overlays in Figma prototypes are great for designs that have modals, menus, and tooltips. In this example, we're using overlays to show tooltips when each location pin is hovered over.

[**Day 14**](https://www.figma.com/community/file/1043208087242745787): Finally, we bring together the three previous prototypes into one high-fidelity map prototype!

[**Day 15**](https://www.figma.com/community/file/1043574309725237348): We wrap up the Figma Prototype Challenge with one final fun, open-ended prompt to create an interactive illustration. Kirby is waving via a mouse enter triggers + smart animate transition.

It was so much fun to see the prototypes inspired by these challenges. Check out the Figma Prototype Challenges in the [Figma Community](https://www.figma.com/@anaboyer) to try your hand at building some of the prototypes above. Happy prototyping!