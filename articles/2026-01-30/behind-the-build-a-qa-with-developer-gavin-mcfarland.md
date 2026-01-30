---
title: "Behind the build: a Q&A with developer Gavin McFarland"
source: "https://www.figma.com/blog/behind-the-build-a-qanda-with-developer-gavin-mcfarland/"
publishedDate: "2021-11-11"
category: "design"
feedName: "Figma Blog"
---

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Tell us about yourself!**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I'm a freelance design consultant. I help companies with digital transformation using user-centered design. I started out designing and building websites for friends and family. Being a freelancer, I feel I've learned to push my comfort zone just enough, to open my mind to trying new things. Late last year I saw someone on Twitter looking for an easier way to create tables in Figma. Something in that moment clicked in me, and I decided to give creating a plugin a go. I started with the Rectangle Creator example and modified it slightly to create a table. Before I knew it I had published my first plugin (surprise surprise, it's called Table Creator!) and now it's being used by tens of thousands of people. I also have a cat named Floyd who thinks he's a dog and loves to play fetch.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What did you build and who is it for?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

After that first plugin, I then built a [table widget](https://www.figma.com/community/widget/1027585818512741999). You can add columns, rows, import data and even sort by columns. It's for anyone who doesn't want to have to leave FigJam in order to show tabular data in their workflow.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVQ4jZWTW4vbMBCF/f9/076UvuW1oRS89JKQxo4TW6P71WcZxcou21K2hoMuaL45npG665kgbx7eJqSUkHN+iNcxRnjvq6xxmI4Ox73F5aChlYHzDiGEKj7bDacr5GIQQ0YpBSUn5BheFQJS8Hd5DycdxKRBs6pJ0maixpaCbhwvMMai5IK1FETv4CTBS6qjk+IuEtuegBILiASstdUVA9d1BX+dlLJu8gZnCN7BagVnNLQk0DJDigWaqO4bJSGJsCwLSMoNmmo8q2PbDOKPR4az+FeMMRBCQG6BXCc+r7TBTKpKWYewAatDPvQe2OrCECKC1hrOuUeDlLG4kcZNGpDx8B8FMoTdMZDhvGagZudSgaSCsZzoP4DNHf8+i+cM11pBK1XXfP6fwNY5dtMgDFZKPWp5T2LrnOM+BOQghjCUx9acduatu/V9l9u1SenvTWk1ZANvX1He7uCrQx8QbIGTK6LPSDEjuozkC5yLIO2hLTu6P82WrM3/eClch2UIGL97iMlAXR3mPmL+ETFeAp6HgJ+XUMF2a06rZxu5FHxfp2lCN01XnI8zDv2E068Bx68Tnp9m9J8WfNnP+LxfsPs24/D7VgPGccT5fK4ahqGOp9MJfd9jt9vhBRJ6Pl0uIBzVAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/95627eb38989f8feedeada43d3ce786517ed820a-2048x1469.png?rect=1,0,2047,1469&w=804&h=577&q=75&fit=max&auto=format)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**How did you come up with the idea?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I seem to have a thing for tables. Having already built a plugin which lets you create tables in Figma, I wondered what the possibilities might be for creating tables with widgets.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**How did you start actually building it?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I started by using the notepad example and modifying it. I made a simple change here and there to see how the widget API worked. Part of the process was becoming accustomed with JSX code which I haven’t really used before. Once I’d figured out the basics I started playing around showing rows and columns and different designs.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What surprised you in the process?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I never thought what I'd create would have so many interesting opportunities. What began as an exercise in using the widget API, became an opportunity to think about how teams could work better together. How might it work when two people are editing the same table at the same time? What affordances can you show to let someone know your colleague is also working on the table? How do you manage these multiplayer interactions with large amounts of data so it’s not sluggish? Being sort of both a right and left-brain person, these challenges really appealed to me.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What do you hope people get out of it?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I hope it will empower people to be more productive. And I hope by being more productive it will help people to collaborate more closely and focus on the things that matter. For me, that means working together to solve real problems that people face everyday.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Where do you often draw inspiration from?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I often try to listen to what people find difficult in their design process. The Friends of Figma Slack group is great place to get ideas. What would make their job better if they had the right tools? I also like to get involved in the dev community. There are so many awesome plugin creators. I've made a few friends by getting to know people and figuring out ways we can help each other make our plugins better.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What else are you currently working on?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I recently created a plugin called [Node Decoder](https://www.figma.com/community/plugin/933372797518031971/Node-Decoder) that makes it easier for creators to turn their designs into plugin and widget API compatible code. Say, for example, you want to build a widget, you design how you want it to look in Figma and it outputs JSX code which you can copy and paste. It’s actually what I used to design and build my table widget with.

I'm also working on an update to my [Table Creator](https://www.figma.com/community/plugin/885838970710285271/Table-Creator) plugin that makes it easier for teams to share several table designs across multiple files. It allows anyone to create a table to use in their design system.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What do you want to build next?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

What don't I want to build next? Honestly I have so many things on my list. Each time I think of an idea I make a note of it. I’d love to explore more widget ideas, especially when it comes to multiplayer use. I want to build a plugin for sharing plugin code examples and I have an idea for a game that lets you design the game itself in Figma.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What do you hope someone else builds?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I really hope someone builds a FigJam plugin to rearrange process diagrams or org charts. I have a soft spot for creating diagrams and it would be great if there was a tool that took care of laying these out.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What are you currently excited about?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAcCBAUGCAn/xAAnEAABBAIBAwIHAAAAAAAAAAACAAEDBAUREgYTIVFhBxQiMTJxgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCYs3bHDY0rPBnLbCLP4bb+qsumM+VuRmtXK0zG+haPw4rG/EXqfBzYDiFiOXiYkQM/lx9VpvSfyA5mm9MIZBmPYOB7Jm9/ZB0ANb6WRVR2j7Ya4a0iDzrHIWq9qGUJjIo32zE+2/SmboXJlx78VarFJwbbxg7b3/URBNGDz92XHRkbx7+34oiIP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/bac40e5d48ecce19b07c2afd4882898e35bec4c8-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Gavin M.

I’m really excited about teaching others how to create plugins and widgets. Especially anyone who comes from a design background or has little to no coding experience. I have some ideas around this and can’t wait to share them.

_[Browse more widgets and plugins](https://www.figma.com/community/widgets/widgets) in the Figma Community, and check out all of the recent updates to the [FigJam platform here](https://www.figma.com/blog/introducing-new-figjam-prices-and-a-more-open-platform/)_

_._