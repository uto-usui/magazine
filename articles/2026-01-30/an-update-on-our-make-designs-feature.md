---
title: "An update on our Make Designs feature"
source: "https://www.figma.com/blog/inside-figma-a-retrospective-on-make-designs/"
publishedDate: "2024-07-17"
category: "design"
feedName: "Figma Blog"
---

All [other AI features](https://www.figma.com/ai/)—including Visual Search and tools to rename layers and translate text—are still available in limited beta.

At Config 2024, we announced Make Designs, a Figma AI feature that allows you to spin up a first draft of a UI design based on design systems alongside a simple prompt. By using design system components, we ensured the feature generated designs that followed a consistent set of patterns and could be easily customized and styled using the tools professional designers already love. Shortly after launching Make Designs in limited beta, we learned that an issue with the feature’s underlying design system resulted in mocks that resembled existing apps. We have temporarily rolled back Make Designs while we fix the issue.

## [How Make Designs works](#how-make-designs-works)

Like most systems that use modern AI models, our Make Designs feature employs three parts: a model, some context, and a prompt. This feature currently uses a collection of off-the-shelf models like OpenAI’s GPT-4o and Amazon’s Titan model—the same generally available models that anyone can use—and we have not done any additional training or fine-tuning. To give the model enough freedom to compose designs from a wide variety of domains, we commissioned two extensive design systems (one for mobile and one for desktop) with hundreds of components, as well as examples of different ways these components can be assembled to guide the output.

![A graphic on how the Make Designs feature works has three columns. The first column shows building blocks like a headline or image component; the second column shows a prompt that says "a salad shopping app" with an arrow pointing to different components; the third column shows the screen that Make Designs generated.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVQ4jX2TS4sTQRSF83P9FQriTtyMDC7EgDjiCxEVdT8rH4EJjpPgLEZBk3RXv+r9Socjt9KVeaAuTt/u23W/OvdW9yiEAO89rLXQWl+SMSbl6T2tizGm+D+N6EJFXdehqiqUZYmiKFKkZ8rT+21B3IH/pVEGcs7RNE1S27Y7EZCcZge5m4vOQ/yLQwIxxlKkdvMm5JKicy4V5DxtROvC1ZbJJi3ODnOLtLuUEnVdp5xQFq0M4MqBC46Ot1BGwQe3dRgDYohbIJEJevUQrLEQXCaxxuDnKoB1AcppNLIG60oIy+HiAM0OcytCiCQlDbTy0CJANh6i8mhZACsjhIpQXmHZLPBjdQYmSthgLgCHkyN3eTa80+gIVEeIVQ++6MGXPVTVw0iHgv3C8fwzJtNDzE+PwOolnHf5lCOcCdDqvGVrPYwKUO0aYrUB/70BX2ygqg1kpzGbTfDm9RhPH9/F+7cHmM+PoLUagD5C8wDZWhht0yxJ3gVYsYYse4jlJoF1vYHiGidfP+LZwR7u79/Eiyf3cPJtAmP0ZYdGO1i7he2AcgCueoiih262wOmXQzzYu47bN65hvH8Lx9NPqbMEjMMwfRg+0iwf4HSEbtdQzRq6WcOKHloafJ9N8e7lGM8f3sGHV49wdjpPJnYOMyT/PufQCO8ivB1E9z5ASYGmKlCxBZq6TPPL9X8Aib3busts6XQAAAAASUVORK5CYII=)![A graphic on how the Make Designs feature works has three columns. The first column shows building blocks like a headline or image component; the second column shows a prompt that says "a salad shopping app" with an arrow pointing to different components; the third column shows the screen that Make Designs generated.](https://cdn.sanity.io/images/599r6htc/regionalized/aa0b045ceb4c0085b348b56fbcfdfc32bd9e8c4a-2396x1602.png?rect=1,0,2394,1602&w=804&h=538&q=75&fit=max&auto=format)

We feed metadata from these hand-crafted components and examples into the context window of the model along with the prompt the user enters describing their design goals. The model then effectively assembles a subset of these components, inspired by the examples, into fully parameterized designs. From there, Amazon Titan, a diffusion model, creates the images needed for the design. It’s more or less as simple as AI helping you identify, arrange, fill out, and theme small composable templates from a design system to give you a jumping off point.

![A number of components—including buttons, headlines, and images—in a Figma file on a gray background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABmUlEQVQoka2SyW7jMBBE/f9/lOMA+YXEThBn4Cy2JYr7TkquoFtxFmCOcygJBNmvq4vchBBgnUNMCfM8o9aKnDNyKSi18jrGCCkVhmHEMI44jwq7d48/jxE3dx63TxF/xwQfIjYEJFFRIcgnqJS6QkuBtQ6Hl1dsdw+43+7wtH/G20ngKD1OKkHYDBsyQvwFTFxMjq6idc4FxlgcDi8M3G4fsN8/43we4L1DaxXz3PksmdqEENlqyplHXpYFrXWU2lBbRy4VzgcopaG05nicc9DawFjLjamOGq/AGBEiZVYZdrlcGJRKQ2kLcpvhY2ZorY33CeC9hzGGo1mB+QcwrcDeV4eldcTcGHYF0hTk/BsYOIpSCnrvvx3SJo1CWXKnlGCdhzYOxq6ic1S4LBf+k0OtNTzlnys3pfj4UiiLaZogpeQxqPMwCrwfTziezhBigrX26/KoUBvDNYqytR7axW/gGrJmUSE3kApCSP5LZbiZEII1TRJKqVVUZyxn/AX8lygGFr2Cz7yuEJqCTNDYpJ9veUOf/yV62B8Gdk0lg99K3wAAAABJRU5ErkJggg==)![A number of components—including buttons, headlines, and images—in a Figma file on a gray background.](https://cdn.sanity.io/images/599r6htc/regionalized/bc914df5f6c3cf556c2b4a4f6ba92fb175f58e3d-1920x1080.png?rect=0,1,1920,1079&w=804&h=452&q=75&fit=max&auto=format)

Example components in our handmade design system

## [What went wrong](#what-went-wrong)

We carefully reviewed the underlying design systems throughout the course of development and during a private beta. But in the week leading up to Config, new components and example screens were added that we simply didn’t vet carefully enough. A few of those assets were similar to aspects of real world applications, and appeared in the output of the feature with certain prompts. We first realized the issue when Andy Allen, a designer who spoke at Config, pointed out that prompting Make Designs for a weather app resulted in designs that felt very similar to Apple’s first-party app. The team stopped everything to conduct a thorough investigation.

## [How we responded](#how-we-responded)

Once we quickly identified that the problem was with the underlying design systems, we removed the assets that were the source of the similarities from the design system and disabled the feature. We’re holding off on reenabling Make Designs while we work through an improved QA process.

## [What to expect moving forward](#what-to-expect-moving-forward)

Our original name for Make Designs was "First Draft" because we always aimed for it to be a jumping off point. Product Designer Jordan Singer shared more about [our vision for the feature](https://www.youtube.com/watch?v=_JMmdM00048&t=1009s) at Config 2024.

We released Figma AI and Make Designs in limited beta because we still have a lot to learn. At the same time, we’re excited about the potential for [AI to uplevel our work](https://youtu.be/bslH4Mv1ZHA?si=mJOz8GAeGtXWoe3v&t=153). In the future, our hope is that by connecting Make Designs to your company’s own design system, you can spend less time finding, assembling, and configuring components, and more time [solving problems](https://www.figma.com/blog/what-is-good-design-in-the-age-of-ai/). While AI can offer a jumping off point, only designers can craft a meaningful experience from a first draft. That craft is a competitive advantage for building great software.

We’re committed to getting this right, and your feedback is key to making sure we build the right things. Keep it coming.

_Editor's Note: Since publishing this retro, we’ve re-enabled this feature along with some key updates and a new name, First Draft. You can read about these changes and feature availability [here](https://www.figma.com/blog/figma-ai-first-draft/)._