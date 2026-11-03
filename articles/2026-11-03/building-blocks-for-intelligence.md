---
title: "Building Blocks for Intelligence"
source: "https://www.lukew.com/ff/2167/building-blocks-for-intelligence"
publishedDate: "2026-10-17"
category: "design"
feedName: "LukeW"
author: "info@lukew.com (Luke Wroblewski)"
---

Several years ago I read Jeff Hawkins’s [A Thousand Brains](https://thousandbrains.org/), which dug into his theories on how our brain works. In it he argued intelligence comes from thousands of cortical columns that each learn their own model of the world and then vote to reach agreement. Then AI engulfed the tech world, and along the way I kept finding myself thinking about Jeff's theory.

How Jeff described our brains and how today’s AI models are built seem to have a lot of parallels. Specifically, a common set of building blocks for intelligence. How so?

Hawkins estimates the part of the brain that handles seeing, hearing, language, and thinking contains about 150,000 cortical columns. Each of these columns effectively runs the same program on nearly identical biology. But they differ in what they're connected to (eyes, ears, fingertips). Each column learns things by combining what it senses with where it senses it.

For example, you learn the shape of a coffee cup in the dark when you touch the rim here and the handle there. Hawkins claims the same process works for everything we learn, even math. In addition, cortical columns work together by sharing their guesses until they agree on what’s there. That’s why you recognize the cup faster by grabbing it with your whole hand.

[![building blocks of brains and AI architectures](https://static.lukew.com/1000brains_ai.png)](https://static.lukew.com/1000brains_ai.png)

The Transformers architecture behind many of today’s AI models is also built from a repeated block. It handles text, images, audio, and video once they’re broken into tokens. Each token carries a “what” (the word “cup”) and a “where” (third token in the sentence). An attention mechanism lets each token look at the others and work out how the pieces fit. It's kind of like the brain's voting between columns. Many tokens share information to settle on one interpretation.

[![how the building blocks of brains see where things re vs  AI architectures](https://static.lukew.com/1000brains_location.png)](https://static.lukew.com/1000brains_location.png)

During training, language models improve by predicting what comes next and adjusting after wrong guesses. This seems to mirror how Hawkins says the brain learns from surprise. But while Transformers learn most of what they know during training, cortical columns keep rewiring themselves as they experience the world. AI researchers are working on models that keep learning after deployment too.

So in both our brains and AI, intelligence may come from one building block, repeated many times and shaped by experience. Of course, that's at a high level and lots of details differ. But the similarities do make me think about intelligence of both types differently.