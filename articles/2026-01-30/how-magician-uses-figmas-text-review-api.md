---
title: "How Magician uses Figma’s text review API"
source: "https://www.figma.com/blog/how-magician-uses-figmas-text-review-api/"
publishedDate: "2022-12-06"
category: "design"
feedName: "Figma Blog"
---

Today, along with launching spell check in Figma and FigJam, we’re rolling out updates to our text review API—a new feature of our Plugin API that allows developers to provide more customization over text suggestions. With the API, you can enable a default text review plugin that automatically runs whenever you’re typing on the canvas, highlighting ranges of text, and providing a list of suggestions. Developers can create plugins that read that text and make a recommendation for what to replace it with—whether that’s a suggestion for correct grammar, improved copy, or ways to adhere to your company’s style guide.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Tell us about Magician. What’s the big picture?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgf/xAAkEAABBAIBAwUBAAAAAAAAAAABAAIDBAUREgYhQQciMVGBFf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChqYKfI1o60MT+L5Gsc4Lp2P6A6S/kS6LorlcbMriRpyqOjpLEFCW17ZK7Xg8299kfJWzyOYiOPdZkdXkpvbot0PcfH6gx8dCXgNEEfe/lFPUdA+EObYAB8HwiDkvpbn8hWzox7Ji6pPvnG/uPxavKTOZ1NPUb2gEYeGj7KIgm5uaAGkgIiIP/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cc7e42b8bd7903c28920f250703ef16c0551b2d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Jordan S.

###### \*Figma Ventures, Figma’s dedicated investment fund, is an investor

Magician is a design tool for Figma made by [Diagram](https://diagram.com/)\* that introduces AI into designer workflows to expand your creativity and imagination as you design. It’s a magical utility that works alongside you to help ideate and inspire you with new ideas, whether it’s generating never-before-seen icons, imagery to use in your designs, or help with writer's block. We call each of these features “magic spells”: Magic Icon, Magic Image, and Magic Copy. We’re starting with these three, and we’ve got a lot more planned for the future.

![A screen that shows headline copy inside of a text editor box, with a drop down menu on the right-hand side. The drop down menu says "Magician," and "Magic Copy."](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAABYlAAAWJQFJUiTwAAADv0lEQVQ4jVWQ60+bBRSH37/BmPjJ6DYcdGMEU24bOGMWFxFi4uaWbGZsOO5lQEQw27g4KJcNOhhjrLWIi4zh5i44NRgVBTGM1nIZF2nhbYtCaZGWtnS0feuHx6wsMX54cpJf8ntyzhFelCUQEbOXXXGvE5t8kNS3DlB+IhHV6RhUJ6NpPr6HpiMxNLwTQ82be6jcH83ZvbspT9hFWZyMj+RRlMZFcTY+kqb47Qilijyqqy9Qf1HFpctttLVdofNaE5+319PVpqSrVclnLUo6VUq0l5RoGmvRNChRP0PzdDbWob5QgVaRiTDcp2Z6XMeCKGI2i4hmM6JoZuEpC+J/PMtM8wvMzZkwGk1bHYsF0WJhyqDnlxsaBNNvX7BmtxIIBNnc3MTj3cDn87Hp9+P3BwgEt/J1lxO7fYVl2zIOuwOP20PA7+efUAhJkrAvWvj9bg+CcagLp91KUArh9m5gWbJhsi5hWlzGsmxnze3FZl/i1+F+vvyqk/sPe5icMrC+7iIQCBCSJIKSxMqiBd3dbgTjgBbnypZwdc3J+IyRnw3T/DA2h+4PkcUVB7PGcdRd1SjKDnG+Lo+fhh7idrvCm0nBYFho/9OK/t5NBGO/FqdtS+hYXWX88RSjU0YMog2z3YnL42VqbpTaljwOHovjWOEh7vffxrXuRJK2zv2fcLZPi3PJihQK4XI5EUWRv5ZtrHs38AclpJDEvGWCi9fKSTuVyrGSLG5/+4AVhz38a59vA9+TJ9isZvT3ehAm72iYHtMxMTONbszAiF7PqMGAYXKCsceTYQaGf+RKp4riqnLONzXSPziIw/E3brcHl2sdj8eLzfJUeAtB19uGWn2VnLJS3i/I5URhARlnFHxQUkTWhyVhMkvOcDw/h3czM8gsLqa79xuMM2ssLviwmLwsWTexzFp5dKcXYaS7mdLyYnYkxfNcZATPy3byQrSM7QlyopKTiExOQpayF1nKPl6OexVZcgqZudWoGr9H2/6Ivt55dIMuHo8sMHirF2H4hopzlR8Te+ANXpLHsi1ezo7EOGSv7WP3/hQikxJ5JV5ORLycbfJYdiYlkZx6mLcP53EyuwKN5mvG9IvMjBkZ6OlF+K6lluutzRSXlZKVn0uOoiBMbmEBp3OyOXr0KOnpaaSlp3HoyHtkZJ0mW6EIU3buHDdv9qAf1aEbGuJBx3WEjoJTdNZW8Wl9LeraGtTKetTKBjRKJR3VlTSXFlOTn01FTjafFJXQVFFFS42S1hol7XWNaFWX6bp6Fe2lJi4XFvEvrZ8uvmsnqtIAAAAASUVORK5CYII=)![A screen that shows headline copy inside of a text editor box, with a drop down menu on the right-hand side. The drop down menu says "Magician," and "Magic Copy."](https://cdn.sanity.io/images/599r6htc/regionalized/46a06a28eb9c1864d99f53225f2b622f4e1e526c-1880x1280.png?rect=0,1,1880,1279&w=804&h=547&q=75&fit=max&auto=format)

Magic Copy in Magician

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**How does Magician use the text review API?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgf/xAAkEAABBAIBAwUBAAAAAAAAAAABAAIDBAUREgYhQQciMVGBFf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChqYKfI1o60MT+L5Gsc4Lp2P6A6S/kS6LorlcbMriRpyqOjpLEFCW17ZK7Xg8299kfJWzyOYiOPdZkdXkpvbot0PcfH6gx8dCXgNEEfe/lFPUdA+EObYAB8HwiDkvpbn8hWzox7Ji6pPvnG/uPxavKTOZ1NPUb2gEYeGj7KIgm5uaAGkgIiIP/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cc7e42b8bd7903c28920f250703ef16c0551b2d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Jordan S.

Magician uses the text review API for Magic Copy to intelligently suggest alternatives as you edit your text layers in your design. Magic Copy will suggest options for headlines, body, calls-to-action, and more while you type in Figma.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Based on your experience using the text review API, how does it work, and what does it make possible?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgf/xAAkEAABBAIBAwUBAAAAAAAAAAABAAIDBAUREgYhQQciMVGBFf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChqYKfI1o60MT+L5Gsc4Lp2P6A6S/kS6LorlcbMriRpyqOjpLEFCW17ZK7Xg8299kfJWzyOYiOPdZkdXkpvbot0PcfH6gx8dCXgNEEfe/lFPUdA+EObYAB8HwiDkvpbn8hWzox7Ji6pPvnG/uPxavKTOZ1NPUb2gEYeGj7KIgm5uaAGkgIiIP/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cc7e42b8bd7903c28920f250703ef16c0551b2d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Jordan S.

The text review API introduces a new paradigm for interacting with plugins in Figma. Instead of users interfacing with a plugin window, this API runs in the background and seamlessly integrates with the Figma editor UI. The primary use case certainly seems intended for spell checking, but at Diagram we love finding unique ways to take advantage of the latest Figma API advancements, hence using the text review API for AI-powered copywriting.

Magic Copy paired with the text review API is great for when you’ve got writer's block and don’t quite know what to say—whether it’s a headline, body, or call-to-action. You can let Magic do the writing and suggest alternatives to your existing text to come up with something better than you could have imagined. It helps you design faster and makes you more creative.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Talk to us about your process. Where did you start?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgf/xAAkEAABBAIBAwUBAAAAAAAAAAABAAIDBAUREgYhQQciMVGBFf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChqYKfI1o60MT+L5Gsc4Lp2P6A6S/kS6LorlcbMriRpyqOjpLEFCW17ZK7Xg8299kfJWzyOYiOPdZkdXkpvbot0PcfH6gx8dCXgNEEfe/lFPUdA+EObYAB8HwiDkvpbn8hWzox7Ji6pPvnG/uPxavKTOZ1NPUb2gEYeGj7KIgm5uaAGkgIiIP/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cc7e42b8bd7903c28920f250703ef16c0551b2d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Jordan S.

Magician actually started out as two separate Figma plugins. Magic Copy was going to be its own standalone plugin that you might install separately from Magic Icon, for example. But, we figured that capturing all of our magic spell ideas into a single plugin made more sense. This allowed us to move quickly by creating a foundation and platform that’s extensible enough to introduce new magic spells easily and consistently give new ideas a try.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**You’ve talked about [starting small and experimenting](https://www.youtube.com/watch?v=fpYmcsszClo). What’s your approach to iterating when you’re working with AI tooling?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgf/xAAkEAABBAIBAwUBAAAAAAAAAAABAAIDBAUREgYhQQciMVGBFf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChqYKfI1o60MT+L5Gsc4Lp2P6A6S/kS6LorlcbMriRpyqOjpLEFCW17ZK7Xg8299kfJWzyOYiOPdZkdXkpvbot0PcfH6gx8dCXgNEEfe/lFPUdA+EObYAB8HwiDkvpbn8hWzox7Ji6pPvnG/uPxavKTOZ1NPUb2gEYeGj7KIgm5uaAGkgIiIP/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cc7e42b8bd7903c28920f250703ef16c0551b2d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Jordan S.

Magician is full of iteration and experimentation, and it’s at the core of how we work at Diagram. We paid a lot of attention to fine-tuning the output for each respective spell so that it’s consistent and useful, regardless of context. That requires a lot of iteration and experimentation to try lots of things and see what sticks.

We’ve been lucky to take advantage of much of the recent developments in generative deep learning models and continue to be inspired by things like Stable Diffusion and OpenAI. The modern AI tooling and models that are now accessible at our fingertips help us move quickly and create really powerful experiences. Starting small and experimenting with AI is getting easier and faster than ever before.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**With any new, exciting AI-powered tooling, there's equal focus on accuracy and safety. How did you handle that?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgf/xAAkEAABBAIBAwUBAAAAAAAAAAABAAIDBAUREgYhQQciMVGBFf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChqYKfI1o60MT+L5Gsc4Lp2P6A6S/kS6LorlcbMriRpyqOjpLEFCW17ZK7Xg8299kfJWzyOYiOPdZkdXkpvbot0PcfH6gx8dCXgNEEfe/lFPUdA+EObYAB8HwiDkvpbn8hWzox7Ji6pPvnG/uPxavKTOZ1NPUb2gEYeGj7KIgm5uaAGkgIiIP/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cc7e42b8bd7903c28920f250703ef16c0551b2d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Jordan S.

Our roadblocks mostly came in the form of ensuring that the output from an AI, which can sometimes be unpredictable, met a certain quality bar and were safe for our users. That means ensuring we had proper content filtering for explicit results and lots of testing for a wide variety of use cases.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Zooming out: How does this all relate to the future of AI and product design?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgf/xAAkEAABBAIBAwUBAAAAAAAAAAABAAIDBAUREgYhQQciMVGBFf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChqYKfI1o60MT+L5Gsc4Lp2P6A6S/kS6LorlcbMriRpyqOjpLEFCW17ZK7Xg8299kfJWzyOYiOPdZkdXkpvbot0PcfH6gx8dCXgNEEfe/lFPUdA+EObYAB8HwiDkvpbn8hWzox7Ji6pPvnG/uPxavKTOZ1NPUb2gEYeGj7KIgm5uaAGkgIiIP/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cc7e42b8bd7903c28920f250703ef16c0551b2d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Jordan S.

At Diagram, we explore the untapped intersection of product design and AI. We’re just getting started with Magician as our very first AI design tool. Magician is a bundle of some of our AI experiments that takes advantage of the rapid developments in generative deep learning models.

Over time, we believe that AI is going to have a much deeper impact across product design. Our approach is to build tools that make everyone more creative and not act as replacements. We’re always looking for ways to improve and speed up designer workflows with the help of AI, from the design process to design systems.