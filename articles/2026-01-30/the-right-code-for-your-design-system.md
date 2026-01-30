---
title: "The right code for your design system"
source: "https://www.figma.com/blog/introducing-code-connect/"
publishedDate: "2024-04-16"
category: "design"
feedName: "Figma Blog"
---

Design systems are one of our most powerful tools for bridging the gap between design and code. By creating a shared language, they enable designers and developers to efficiently collaborate across their respective workflows. We’ve been working hard to bring design systems closer to code through features like [auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout), [variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma), [component props](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties), and [Dev Mode](https://www.figma.com/blog/introducing-dev-mode/) which we launched last year.

[![Contact sales](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAk0lEQVQImSWO2w6CQAxE+VGjInKXZZeLrAJiSPzsHlP2oZnOpNOZKLkgzojYBsoMqTIwNdgHVDkobyrI75DGUKSBOwNNGbTr6dDVK1GWIL1F/AizR2Z/INsCnznsfgANHB2sL/iu8Nth32AaoM5DgDNIpN/bGsYOefbQtcGsh+8poHJtqybVdDRIcbBQaPsbxGfkDyodrDp1sujJAAAAAElFTkSuQmCC)![Contact sales](https://cdn.sanity.io/images/599r6htc/regionalized/681ff46c0596d92030e5a8c09b1f28f6851c79bb-5586x1014.png?w=5586&h=1014&q=75&fit=max&auto=format)](https://www.figma.com/contact/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=Framework)

Despite these advancements, one major challenge still remains: adoption. As an Engineering Manager, I’ve seen this firsthand. When we talk to our customers, we hear the same thing over and over again: “We built a design system, but it’s not being used to its full potential.” Developers may use parts of the design system, but they often aren't aware of everything it contains. And when they do use it, they may unintentionally misuse components or patterns in ways that don't align with the system’s intended guidelines. This is a critical problem, as the success of a design system depends on people not only using it, but using it correctly and consistently.

This is why I’m so excited to introduce **Code Connect**, a new tool to help organizations boost design system adoption by making code more accessible and useful for developers. With Code Connect, you can customize the code snippets that appear in Dev Mode, so developers see your actual design system code instead of auto-generated CSS. The result is faster, more efficient development, higher adoption of your design system across the organization, and a reduction in the creation and maintenance of duplicated, one-off components.

## [Connecting design and code](#connecting-design-and-code)

Design system adoption at scale is something we’ve been thinking about for a long time. The barrier to adoption isn’t just a matter of individual workflows or preference; it’s a testament to the broader disconnect between design and code. As our CEO Dylan Field [explains](https://www.figma.com/blog/config-europe-2020-new-feature-announcements/), design and code have traditionally occupied different worlds: **“There’s a natural tension between design and code. In the world of design, the focus is deciding what to build—in the world of code, the focus is building it…In practice, they’re partners working to bring a product to life.”**

> There’s a natural tension between design and code. In the world of design, the focus is deciding what to build—in the world of code, the focus is building it…In practice, they’re partners working to bring a product to life.

Dylan Field, Chief Executive Officer, Figma

Designers and developers work in different tools, with different constraints and considerations. Designers optimize for creativity and exploration, while developers optimize for structure and maintainability. At Figma, we imagine a world where designers and developers can move seamlessly between freeform exploration and structured, systematic implementation. Code Connect is another step in that direction.

## [Meeting developers where they are](#meeting-developers-where-they-are)

Code Connect aims to bridge this gap by bringing the power of code into the design tool. Under the hood, Code Connect is a utility provided through **npm** for JavaScript and TypeScript projects, as well as Swift Package Manager for SwiftUI projects. This allows developers to easily install and use Code Connect in their own projects, regardless of the platform they’re working on. With more platform support coming soon, Code Connect aims to meet developers where they are, integrating seamlessly into their existing tools and workflows.

The package and setup instructions [live in GitHub](https://github.com/figma/code-connect), and developers can install it via a simple command line interface. This maps to the tools and workflows developers already know and use.

[![A title card with "Creating a more connected design system with Code Connect" text, displaying a photo and name of Jake Albaugh, Developer Advocate at Figma.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC3klEQVQokT1ROW8TQRjdH8BV0IAARVQREO9pr9dre9f2Hl7bWds46yOOIeEsQGlAMqKIkMIloKOgQJRQcEiIZoRASkRDgwQFAgoKoCFhTICAwiGYh3aDKJ6+743me997M5znumgGY9gz0Y3Q645jvN1CKxhDp91Cc6wBu5CHriWRTmnQNQ1qIh71/mglutOo15E3DSiyBM4rumg1g0goxN5eD3t6ExjvtFfPJroIGg3UfB81fxSVUika1tQEMrqGvJlFNp2CqsiQeB5c0bERNHZHjkI3obtupx3xdqsZ9WGtVX04VgFmNoNUUoUsSZBEBbIYhywoEAQBvDACLpvWUXQdVMolhPEdy4oiFnJmBCufi5BJ64jLEkQhBpHnoYo5GIlDMFInoOvHoaQnsTPjgssZWVT9UUxNTmKi20XOMCCLAiSRhyT8Q8gFHiIfgxAbgRTjUdnVwTH+DqbTr9B0X8GuzEOtXgMXRun1epiZmcHs7Gz0XoooRoNiLBRYFfnP+RHIMR5Tw5O4t20OD7Z/xgX1O/aWV+Dv/gjOdWxUqz76/T7Onz8XuUwoEoTYLoj8CAR+tYbuwqjhAlkQcTgzhSfGHL4MLeDRtiX0zV8IagCnyBJLaRrrdNrswP59zPPKTFHzTFQ9JiYrTFTLTFJ9lkg0WTLRZcl4l6WSPXZ06gx7dvoZ+1Og7MWmATul/2BBnTEu/DHTyKLkeXBsC7rmwNT78ArXUbbuoGTdQsm6i7J9H2VnDmV7HqPFeZw88hTPTy/gd26A55sHOKX/QFBn4PI5kxYdm7q2TbNpnZpyiR6UrtKz8bf0UvwjvRin9ExyifaNr3TaWqFHrRU6ba/Qy5Vv9HV+iX7fukgfb1miJ8yfNKgxyqVTGtE1jSQTcSJLAvF2uuTKlqvk5YY35N26AXmz/gN5sXFAHg59IreHl8nN4WVya3iZzA99Ih/WLpL3axbJjR1fyeHibzJWB/kLwle8Bt23XhwAAAAASUVORK5CYII=)![A title card with "Creating a more connected design system with Code Connect" text, displaying a photo and name of Jake Albaugh, Developer Advocate at Figma.](https://cdn.sanity.io/images/599r6htc/regionalized/bbf2dc5d4debf941b7d573daf3b5ffef68c53a0c-3840x2168.png?w=3840&h=2168&q=75&fit=max&auto=format)](https://www.youtube.com/watch?v=PQdY1bx0uw8&list=PLXDU_eVOJTx79mRuq_qHx4uDmIOzZLRnR)

Once installed, Code Connect allows design system teams to surface and distribute best practices and documentation for how to use the design system, contextually tied to the mockups. So when a developer clicks on a mockup, they don’t need to search through a bunch of documentation and code to figure out how to build it in the design system. Instead, they just click on it and get the approved, maintained code samples they need, published by the design systems team.

This has huge benefits: Since developers aren’t rewriting components, there’s less code to maintain. By using what’s already there—rather than creating components from scratch—developers can work more efficiently and effectively. And with better adherence to your design system, you can more easily improve accessibility and consistency across applications.

Here are some examples of what that looks like to implement Code Connect into your system:

JSX

```
1import * as figma from '@figma/code-connect'
2
3figma.connect(Button, 'https://...', {
4  props: {
5    label: figma.string('Text Content'),
6    disabled: figma.boolean('Disabled'),
7    type: figma.enum('Type', {
8      Primary: 'primary',
9      Secondary: 'secondary',
10    }),
11  },
12  example: ({ disabled, text, type }) => {
13    return (
14      <Button disabled={disabled} type={type}>
15        {text}
16      </Button>
17    )
18  },
19})
20
```

Swift

```
1import Figma
2
3struct Button_connection : FigmaConnect {
4  let component = Button.self
5  let figmaNodeUrl: String = "https://..."
6
7  @FigmaProp("Text Content")
8  var label: String = "Submit"
9
10  @FigmaProp("disabled")
11  var disabled: Bool = false
12
13   @FigmaProp(
14      "Variant",
15      mapping: [
16          "Primary": ButtonVariant.primary,
17          "Secondary": ButtonVariant.secondary,
18          "Destructive": ButtonVariant.danger
19      ]
20  )
21  var type: ButtonType = .primary
22
23   var body: some View {
24      Button(type: self.type, disabled: self.disabled, label: {
25          Text(self.label)
26      })
27   }
28}
```

## [A more unified workflow](#a-more-unified-workflow)

When developers use Code Connect, they aren’t generating new code; they’re accessing the approved, maintained code samples and documentation that have been published by the design systems team. This helps to ensure consistency and adherence to the design system guidelines, without relying on automated code generation that could introduce errors or inconsistencies. Code Connect is about surfacing and distributing existing code and documentation from your design system. By making the design system the path of least resistance, we can encourage adoption and ensure that everyone is working from the same source of truth.

This is especially important as teams scale. When you’re a small team, it’s easy to keep everyone on the same page. But as you grow, silos start to form. Designers and developers start working in isolation, and the design system becomes more of a loose assemblage of guidelines than a shared standard. With Code Connect, we want to make it easy for teams to stay in sync, no matter how large they get.

![GPT A screenshot showing three interface designs related to a shopping app called "World Peas." The left side displays a list view with "Rainier cherries" selected, priced at $3.99/lb. The center shows a product detail page for "Bartlett pears," priced at $1.99/each. The right side features a UI component for an "Add to basket" button, with a corresponding code snippet in React. Below the code, a note mentions that buttons are for actions like "Add," "Close," "Cancel," or "Save," with a "Synced" status indicator.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUUlEQVQ4jV2T7U9bZRjG+VMglJdCe85pzzk9p+fQlpcBsjbTBBeTRUYCGbih30kcRD/wwezFoMICnHZQiowWQ5cxIUyIjMBseR3LoOogLGxjMqMxRr/+TNtEEz/88tz38+S5cl95nqtA0zTa29vp6emht7eX7u5u2traaG1tzdXZvatXP6arq4v6+noURcHtdiOJEqIo4nK5cn2WbF/Q0NDA8PAwOzvbZDL7pFMpLMuiv/8LFpeW2FhfJbW2SCIxScvFiwiCQFlZGTabjaKiIgoLCykuLqaioiJ3VhAKhZiO3+GX40P+OD3mIPOY6alJxqJRdnZ3ODrY5Nn+MkuL9+no7ESSpNxlu91OaUkpNlsJZaVlOCodecFgMEjUusXuw1n2Vu6SXogzbg0SjoRJp5Z5unWP3fUZ5udm6OjoxKN4UVx6DrfoQRY9+VpSEQUpK3iW8MBNfpgdZ/1ehId3I4wO9ROJhEmtzbGzMsLmSpj5b6fp7LiCoQQw5VoMuQ7dVYM3i7sWVfIhCe68YGTwc9bnJ9laiLE6N8GYNcDt2xG20kvsbyTIbCf5fuk+lz/4EFOpwac04lObMNwNeKU6dLEOVfAjOuW85TFrkN21eX7aeMDj1CJ3JsaIRsfYe7rLr6+P+O3NC9LpR3Rd/ghTqcXvaaJaD2EqjWhiLaqzGtlpIjpzEwb5OjbO0bMMv795xavjI5LJJCORUR6ltnh+8JKXh69Z/G6FS5e6MJRaqtR6qrQzGEoNHpcf2VmFy+FFdLjzrzwVj3NycsLff/3J6ekJM8kkn/Rd4+aXFrHhKRIjM9y4NkTz+Ra8SjW6O4AmV+FxGyiSgSL4UZw+pJzlUIjJqThHzw85eZHh4OdtYrEo77e2ce6d87zXfIELzS28fe5dTLMaTTHRVR+6YqIpRk7YK9eguQL/WY5NTLC/t8mPTxZ4svUAyxqiobGR8vJyKuz5P2cvt+N0Cni9BgF/NX5fgCrTl8fw41F1BEGk4GwwiBUeIbU2S2p5lNXlBF8N9FNXdwabrTiXiCwlJSU4nA4Mw8Af8GOaJrquk42upnmQZRlBFCh4q6mJ69c/I5m4xTfjvcRjN+jr+zQnmE1EZWXlv6soiKiqiseTF8jm+P/8A/1GThYGoWeIAAAAAElFTkSuQmCC)![GPT A screenshot showing three interface designs related to a shopping app called "World Peas." The left side displays a list view with "Rainier cherries" selected, priced at $3.99/lb. The center shows a product detail page for "Bartlett pears," priced at $1.99/each. The right side features a UI component for an "Add to basket" button, with a corresponding code snippet in React. Below the code, a note mentions that buttons are for actions like "Add," "Close," "Cancel," or "Save," with a "Synced" status indicator.](https://cdn.sanity.io/images/599r6htc/regionalized/f294d65fadf3648a53beeb3a25207b44ca7fa46c-2160x1440.png?w=804&h=536&q=75&fit=max&auto=format)

But Code Connect is just the start. Looking ahead, Code Connect unlocks many exciting possibilities for further integrating design and development workflows. For example, it could potentially enable automatic audits of design system usage in both code and design, identifying areas where designs and code are out of sync. It might also open up opportunities to provide analytics and insights into design system usage, helping teams to better understand how their system is being used in practice. Another possibility is the potential to enable approval flows between design and engineering for component updates, ensuring that changes to the design system are properly reviewed and coordinated across teams.

While these specific features aren’t currently on our roadmap, having the connection between design and code opens up a whole new world of opportunities for future exploration and innovation. Our vision is to create an even deeper connection between design and code, beyond just design systems or components. Imagine a future where we have that connection for variables, iconography, typography—all the things involved in a design. Code Connect is laying that foundation, and we’re excited to see how this technology evolves to support even more powerful workflows in the future.

Code Connect will be available in beta for Figma [Organization](https://www.figma.com/organization/) and [Enterprise](https://www.figma.com/enterprise/plan/) plans, with general availability planned for later this year. Beta is about presenting the idea, testing the waters, and getting feedback from the community. We plan to fully integrate Code Connect into the Figma workflow, including the component playground, with support for additional platforms, such as Android, and web frameworks.

_To get started with Code Connect, [visit our GitHub repo](https://github.com/figma/code-connect) for instructions on installing and configuring the NPM package, and check out our documentation to learn more._