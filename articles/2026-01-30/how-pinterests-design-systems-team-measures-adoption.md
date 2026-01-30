---
title: "How Pinterest’s design systems team measures adoption"
source: "https://www.figma.com/blog/how-pinterests-design-systems-team-measures-adoption/"
publishedDate: "2023-02-03"
category: "design"
feedName: "Figma Blog"
---

_As of February 2025, [Figma’s Library Analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) now includes styles and variables data in addition to the existing components data for both Organization and Enterprise customers, with expanded capabilities available through the [Library Analytics API](https://www.google.com/url?q=https://www.figma.com/developers/api%23library-analytics&sa=D&source=calendar&ust=1739650689598073&usg=AOvVaw2aB3mbDsCCnpFfbmXS9WC0) for Enterprise customers. Functionality in this article may not represent these changes._

I’m a design technologist, and most of my background is in engineering and product management. If you’re familiar with these two spaces, you may know the emphasis they place on measuring impact. From code velocity, to active users and engagement counts, there’s a number for everything. That number—whatever it is—is important because it provides us with a shared language and consistent indicator of what it means to move in the right direction.

Identifying good metrics for Pinterest’s design system, [Gestalt](https://gestalt.pinterest.systems/), is no different. It’s hugely important for our team to know how much value we’re providing, and for our leadership to understand whether the investment is paying off.

![grid of 12 design system components](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADb0lEQVQ4jW2USVMrRxCE9f//j0/2wVxfhAmzCQkbDEho1t63WcCfo1qEeV4OGTNTXV1TmVndG6UVNlhstJhgMNHioq0x5Q29U3RO1efgNdqbmvuP/HTO10azkRc/eQ6m45fn33nojtjisMXz6kbudMOVOnGjTux0w5tXuOIYk+HNj3RJY2dPmAI+OjY+OcIS2PcHfri+5NvzA2ay2Mnz5AZ+1Q3f1BsXzTMXh0ceVFPXxmI5hJFT0ujFE5dISIGNC5Y4BYZoeBxOvNnxvDhF+mh4S4ZDNOxMx21/4mhHfPH4KWAFcyCuibxkohS0zhJzZFom5vf5jHWmzJmQI3nOTOtEXgpxzqRJ4qHuKUupa5Iv+1NObKx3mORRyWOKdJZIc66FkrwvgkxZC/P7xLQU0hTxJeJKqpAfSfGUIxsbHQc3sh1bHvVAGwxjFKNCpS5aHcPIUCxhjaQ11rgpnlOwHJxhSI44f2poguXFDNz0DU96pAuOQcao+GpWnzQvrqfLGr8Gkug7B8bseLaaRz3SRltjIXk2xls6pzk5g0oBX1KlE4rQ8jhB7TaR10xeEj57dHT00TFEWY+fpghlZ3HBEafEtH5vSiHmQJ4y7x8L73+uLO9LFV8MEWPKv4yspkgxI38sHjvFvzspixiTqpbDp66yJuJLXMzyYs4UzvmrNPBpyikqHmzHo+tpPidfhE9r4tV0/Li95uf9LSc/VFPymvBL4Ek17PsjutgaqxrKmZSCv7n/KbjEWvCn+2suHu5o/FgLCtzs+UM1PPynoLfY7DF16iOhUhZamVgCLnuGaFHJVZoiRaymhUrXiyFr+Y6ys/gUyLMEp7Mx61y/ffR4OS3LOS6GnM2K1bB5nVg/FpaP5csU7S2tNxy8qYM6poCtIxPrCWq9pQmOMQasuDsJAjq7amSYRYL8NTajM7wYxV6P7NRQ8aQGem8q1ReneTKag7O0wdaJMMVxDIpnN9BGjS6uzqswqh2O0TPkyDE4bvuWu/ZE4zRjchy95dlZXoVJdHXI3eTpk6GNpp4YuXWkU5nNTdO1DHpETszgDK9jz0vf0qqBTvU0aqDRqqKzGmU1gx7oVY+yqt7ackkbb5Dbf3N5ecnNzQ33u3v2+33Fbr9ju93W+N12y263qzHB/f0919fXXF1dsd3efe3Z7Wr+XxMu8Jh+Ya2CAAAAAElFTkSuQmCC)![grid of 12 design system components](https://cdn.sanity.io/images/599r6htc/regionalized/ca2b89683bbdbf8a8257a50de98fc6b44de52cee-1600x1587.png?rect=0,1,1600,1586&w=804&h=797&q=75&fit=max&auto=format)

A few components from the Gestalt design system.

Over the past year at Pinterest, I’ve been working on a new metric for Gestalt called _design adoption_. As a design systems team, we wanted to maximize the usage of Gestalt and increase component adoption—starting with our designers. To do that, we needed to measure how the system was being used across the board in Figma.

[![colorful graphic with text, gradients, code](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEC0lEQVQ4jVWUW2yTBRiGGxi4M4eObW6wwRxjjCBjWw9rtx5o7djf09/D+rdr1/5toR1jg5HoAAeRCwVi1EQTlcOFiqKJ0aCiHESiQTwEJUAYI0QgZMrQBAEjiBsXj2nRC6++uyfvl/egyI+oUCbamdtroTzRwSJpGxbnlzhWnkZ03sDj/A2XMIrbcQ2XcBGh83s03v2UdUvkRVrID6vIMAp7NBT2qFEU9KipWmNj6ZMeavs81EvDmO0HcQrn8bpuITp+wSmM4nHdRHT8TOfKr1GJeygNdWVBeeGW/wNnxfUsHnSj2hxk2YYwjZHtWB1f4eocRXSM4RZ+wm2/jMd5E7f9KoLwIxrPO5SGHirMC6vIiCqOaSmKalBUpC00PylheDqKZkhGlXwJm/csDscl7PYzuFxn8HmvIorXcNov4nBdRus/QFl3kBmxVmbJembKOkoS7dmrqMwA+wN09qcx96Zp7XkWk/cQK9wnMLqPYpOO4YyexCIdR+89jM5/mAbpRUoibspWm6jstTI70Ubm0+JYK4oMtSHmQnYP85TxNXrb9tFt+Bi7+QjttiNo3YfQBD5kSdduarp2MC84hDLSTaFsYubqdpQpI8VJHYVxLbkxFYoZcivNcoDt7Xv5vHKE9yuu8fzCMfqXXkdU30BvvEKj7RvqHO8y17uTklAfBTEX0xN6cpIqpifUFKf0zO41kJtQoyhLmTCsjvGq/j1OK8c5rrzH7qq/2FQ/SbDpASb9bZpWjFAvHKTa8wpzgoMUxjxMS7YxJdnC1EQLRWk9c9aayUtqUJSnzKjlIC+o3+SUcoxjJX/yevVdNi6eQGqaxKS/RZPlPPXCJ1R7XmZOcD0FMZFpSX0WOCXezCNJNUUpHdMTKhQz4zoWhgQGtDvYX32CvQvOsrXhHMmmEVbqRlCZf6Ch4zNqnHuo9D2DMpSiKCqSGzcyLa4hJ95CblJDflJDTqwZRcah6rgNrRjGvmIQm2UIXcdGGoVh6pxbqRI3Ue4boKwrTWVgHfODm6kJbWF+9xAV4TTlcT9Va+1UrLGQF1WhyFg/N22lVDYyK6RHGbRSEexmgTRIrTRMjbSRecE+FkhDNHW9jdH/HVbfBay+UYz+b1FFd7F8fYq69Q6Ko9qHTZkdb8umvCCi5dGQzPLAPkz+Uzzhu4DFdw6D/yRm/ync4g1k+wRrbZP02x4gC3exBr5g2ZoBageEbFsUmbQXR1vJj7RQFDZQJ23D5b5EumOSDZZJ1lkniQsTRB0TbDL9zRuP3+XQY7c5UnOHt5b8TspylEa5l+o+278KZX22Qv8BGwLPscp2hd2N9/i09jYfLPqDndr7bDFM8FHdHcYLf+V+znUmpo4zXjDGroYDtHbJlK4yZgfiH+bfa7OEGkzsAAAAAElFTkSuQmCC)![colorful graphic with text, gradients, code](https://cdn.sanity.io/images/599r6htc/regionalized/29eb9a3444c39b6d2529947d88e6b07bbe01580e-1608x1206.png?w=1608&h=1206&q=75&fit=max&auto=format)](https://www.figma.com/blog/what-we-launched-at-framework-2024/)

At Framework 2024, we announced [Code Connect for developers](https://www.figma.com/blog/introducing-code-connect/), typography and gradient variables, and our Library Analytics API to help you drive design system adoption across your entire organization. [Read more](https://www.figma.com/blog/what-we-launched-at-framework-2024/).

**But why measure adoption in Figma?**

Even before I set out to establish the design adoption metric, we had a [code](https://github.com/pinterest/gestalt) adoption metric. In fact, measuring system component adoption in code is a [common way](https://segment.com/blog/driving-adoption-of-a-design-system/) for design systems teams to see how their system is being used. Through code, we can see which components are being used, where, and how. For example, we can tell whether teams are using the full component, or if they’re making changes—which is an indicator that we need to revisit a design. Our team ships web components that designers and developers across Pinterest use to build our product. Usually, we keep an eye on whether the components we end up building are, in fact, making it to the product. With code, we know that no matter the team, everything they ship is going to live in the codebase, so it’s a concrete place to measure component adoption.

However, our code adoption metric had two caveats:

**1\. Code adoption only works on web**

The Gestalt engineering team only ships web components, while Gestalt as a whole ships design components across iOS, Android, _and_ web. So, our adoption metric was limited by the platform we ship code to.

**2\. Code adoption takes time**

Sometimes, for brand-new components or surfaces, it takes time to reach widespread adoption. Designers may also not have a chance to use the components in their designs yet, so there’s a lag before we see any movement in the metric.

### [Defining design adoption](#defining-design-adoption)

It’s not that code adoption as a metric isn’t good, it’s that code adoption _doesn’t tell the whole story_. If we want to convince our organization to invest in building code components for iOS and Android, how do we know that people will use them? Hypothetically, if we could show that designers were using our components in Figma, it would be very easy to prove that we should build components for all our platforms.

![abstracted red and black interfaces across various devices on a purple background](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAADWElEQVQokU3LbUzUBQDH8f/betHW8oHjBCQFxJMHI2OZwDCOP/fA3Wknek9ygE9YB0bAVrn5Qh2p0+nMQgfcqSAdFyKKeOhhJhyQHNCheMBxIBeuNdKtZS9a0bflrPXi++az30/o74J/6nMv0Nv5B94bC/S9MK97gbvXf3/u/+7+X5/7rxefP/8zocUexOUI0XbxEa32IK3147TZJ2k/H+LKhRmcdQEunXtAq2OKq02ztF2YxmWfpNURor0xzNeOEM11AZz1E7Q0TCLsNFTygXU/B8pOcdx2jDMllZwrKqNuZxW1+44+t4PbKzhWUsXZDw9xqnQ/B81l1BRVc7ziDFWlJ9mitaHX7GXH9k8RdqclUJ25jsObC7DrdXjykvhOHkufUsa1rfk4txVwWZ5C+7vxePLX0inKcGUsp12eTO02M7psPYtekxIZIUWRp0K4vH4p3+bG0blVRY9BwWNtPL+oI/lJu5JhYy4DFh3B/FWEciMIK5YxmydlSh7BjGYV7aYC1OuVvPTyK0gkEej1eoS+jVLuqxO5Y1Bzz6hgXhfPM7WEn7UrGDGK3DXr8KsSGcuR8EgRxYwyhu/FGAa1KTSbjFiyNSQvXUJmXDR79RqE8xkxXJKv4eIWDV7re8xb3uKZQca8KY3h4k14zJvxigl4syPpF2PpEV/HnRNLpyqVRpOJk5v0nE5fTv3bUhqVKQin10lwZCXQaDEwcLSGp/VH+K3hEE/qP2P0xBEG3i9mIj8RvxhFjyKO27krGMiJ4r5GhsdqpKPQhE8tY2ijhO6sSATPhiWM5K2kt3wX/hvf8HRmml+nAzwJjjN2q4eRjyt4rFtNWCElpIwhqIhmWoxkTpdIT4mZ5uISnHmpNLy5iBNJryL4c6SEtQn4KvYweNNLeHaOHwN+fngwylB3P95PqhnTyJgQlzGniiasimFUjManSaLDaqHJWkyrmExz+mK+fGMxgsfwDoPGDNy23VxvusKIb4TgvV4C/V6627pwflRFizKNTvUaHhZmMG7N5LY2mQ5VKl9ZzFwtLsSnW4tPu5o7xg0IX1TbqN1l5vNSGy67i+EhP1OT4wQejtPVdgt7eSVnFek4zXKGD5czVrMP3w45Pl0q7iIzrj2luPRZNJlzaTlQwd92umCXowfxDQAAAABJRU5ErkJggg==)![abstracted red and black interfaces across various devices on a purple background](https://cdn.sanity.io/images/599r6htc/regionalized/5d69389ea6494dfcef4f6cfb4f7c1a4446fc3171-3200x1908.png?rect=0,1,3200,1906&w=804&h=479&q=75&fit=max&auto=format)

Pinterest designers ship across web, iOS, and Android.

Design system adoption really begins in the _design_ phase. If designers don’t know that components exist, we shouldn’t expect our engineers to know either. For our designers, the design phase happens in Figma. Prior to establishing our design adoption metric, we didn’t have many insights into what was happening inside of our Figma files. As a team, we were super curious about what insights we could uncover, and what our baseline design adoption was.

Out of the box, Figma provides [analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) that break down the number of component instances and insertions by team.

![Screenshot of Figma library analytics page](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHklEQVQ4jY2Se08aQRTF+f5fwrS1aaM0VtOkSZPWRtv6xEcwLCAKWhVkYdmdx857TjO7QFFi0z9+mTv33Dl7c/dWzvYYonOCToOi0+C4bubotsR/02vL4qzXJvj++R6Vdp3i4S7DKCYYxxRpkoOkEiQroUSDU/NPSKbQbvXxaaOGSrfNkIwpKCWglEIIAa0VtNYF1lp47+C9X8I5V+hSSVx2brGxvoPKdYtiPCKghIBRBqUUrHVzwqMnJt7DOg9jHbQxRT3jHJftXml4FRHEwwyEMrBcQGoLaTz4FGk9dDBwHtp65MaDKg8iLajQYFKD5TmuOjf4WA0dNimGI4aEK4xzi7FwGOYefV4S4rHwSKTHSHg8TvMD7vDIXaExZdDr3mOzuhtmyBEnAjE36DM352HKYm5Rm8Vx/syw1+ZIJgKZ0Ehzg0xaZNIhE7YkxNIiFaVGZlpRZ0GVg1Aave7drEOGScIglYKxthh4iSsGH87wc7SxBSE3z09rjTG46d0/M5RiuiLLqzFbj/AwfNQt6PAotLlhWJtkRMF5MJVFN8/N/hqWHYau3BQf1mjRsFlP8Pt2gMFggDiOMZlMkKZpQYgX72maIcueQghBlqVoRh1U32+jcrDTx95uhL0f59j/WcfBr4s5s/vRfgPHBxFqh80lTo5aqB1G+PblGG9XtlH5ujXE5rsI669PXqT65hQfVs9epLp6irVXJ1hbucAfqlMVcXT8eUMAAAAASUVORK5CYII=)![Screenshot of Figma library analytics page](https://cdn.sanity.io/images/599r6htc/regionalized/3885b85a4cf64232245689c52a75cbfedcbd1c4a-1600x1100.png?rect=1,0,1599,1100&w=804&h=553&q=75&fit=max&auto=format)

Figma provides library analytics.

These numbers are a great start, but not quite the adoption metric we were looking for. The problem with instances and insertions is that they are really just counts. It’s great to know that we had 27,056 insertions and 245,123 instances of our button being used—but is that a good thing? It’s hard to say what constitutes a “healthy” count.

Let’s say there’s a large design file with over 1,000 nodes, and of those, 10 of them come from our Gestalt libraries. That means that only 1% of the design was made with Gestalt. Yay, we have component usage—but sadly not a significant chunk of the entire design. So, the adoption measure we’re looking for is _relative_ to everything else that’s on the page.

![Screenshot of Figma highlighting Gestalt layers within a file](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAACRklEQVQ4jY2SS0/bQBSF/ZcJCFh32TWr/gA2bVm0C9SqEkkQaRMwAeI8/BzP2DN+jB0TB3B3p5oxAYpQ1cWnK91rnzn3YXQOPqFz8Bl7795jf38Pu7u72NnZwfb2Nra2tjSdTue/MUaWh4s5wXgyhWmaGAwG6PV66Ha7Ovb7/ZZeD71uV+f/hVHXNer1Gk3zG03ToCxLcM41SZIgyzKkSQIREHDXA2esrcdxC+dPxHEMI1+ukJW3qNYPqO8byKJ8KkYRQ8QoiGvDHg3hj85BbRuh64I4Dqjvg1EKSikYY61gJG/B8gpJdYd8dY8kL8C50B8uZhPcjEe4Oj/D5VkXc/McnjXF/HKM2YUJx5rCcxzYtg3P87SoERcrKFElmN3eQyhBIUBDgsvhKU6Oj3B2cowr8xccewbi+/BsF+7CAfEDEELg+76OURTBEGUNXtbI6wfI+qF1+Cg4Ov2BL4cf8O3rRwyHA0ysawSuC6Za9XwwQnQnypkS0y0nyzXS5Rqybv4WpCEufvZwfHSI/sl3XN9cYzqz4M5nCKwp/ImFYLFA4HnaoRJVszfyYo08q1AUK8jq7nmGjGFu3WBsjuA6js6phxhlCH2ioSREqAjD56XIbAXJchS8gCxXSKXastAnEUeRjlmWQxYFpCyQJCliLh7hWmSDdiiTCnmQoKAppFpOLttiHOs7TNNU3+IGlXt5e68xZLJE7nMUREBmJYRIdStq2EIILfASlWvvdMNrh2kFSVIULNWCnCegQQD6eAZvudj8/JbDP9AAky0cNC6hAAAAAElFTkSuQmCC)![Screenshot of Figma highlighting Gestalt layers within a file](https://cdn.sanity.io/images/599r6htc/regionalized/c1a2e13b83628510c870eab4785f19a9871ae1fe-1600x1051.png?w=804&h=528&q=75&fit=max&auto=format)

Calculating design adoption score.

In the picture above, the layers highlighted in red are nodes that originate from the Gestalt Figma library. On the entire page, there are 15 layers total, and seven of those are from Gestalt. We calculate this score individually across all the frames on a page to get us to a total design adoption score.

So, in this case: 7 Gestalt layers ÷ 15 total layers, or 46.6%.

### [Measuring adoption at scale](#measuring-adoption-at-scale)

At Pinterest, we have eight different design teams working on shipping surfaces across Android, iOS, and web platforms. Every week, designers interact with hundreds of files. To calculate adoption across the board, our initial plan was to ship a Figma plugin that measured the amount of Gestalt components being used. However, that would require solving two problems: design system adoption, and also _plugin_ adoption.

Fortunately, Figma exposes a [REST API](https://www.figma.com/developers/api) for us to leverage. It enables us to build a tool that calculates design adoption in the background, without slowing down our designers. I set up a service which I called FigStats, and it runs every night and looks at all of our Figma files. It tallies up the totals to calculate an adoption percent across the entire organization.

![Screenshot of FigStats interface showing adoption by team](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB20lEQVQokZVR227TQBT0//8APIDUNkBDnyoEUQtKIW2TlJSmtpuAUzuJ3VwIsRN7fb8P2t26CjyBpdGcs3NmfLQr9M5i9C8iyN0I8lWIftvFzSXBbceD2PX/Gb0WQauxgdBpLtE7n0K61qEM5hgN51CGc2ijFaaaCWNi4WG62cEWM93G3KBwGGb6FtKNjuOjbxA+fZBx2mjh89kXSKIEwzDwc7nEr9UK6/Ua5tqEaVqwLAumxdm2bRDighACl7hwHAfDwT3eHJxAuG5PcScrUFUVi8UCjm3D9zwEQQDf95mJwvM8uC4PoVoURYyDIGQ8UsY8UP3uYLvxkKQJ0jRFknDO8xxpmjEjBT2v6mquOk+SBJqq47B2CmGiuCBOyAJ4CA8riuKPnoIasyxjGmWqFWwuw1gzeKCuBvDcmBnoUGXa7f/WaEi1ZfEYqGl0wxMIs0mMKMxBvzznf6ZcluXThtRUhXANTxuWJVCWBSbjB9RfPW7oEnoXMcKQXrDPOIpCBCF/GFrTM9/3GMcxfxCqxXHMdOWHhtf7DQjiVxN3oo6BrEIW7yH2FUi3ox0okEVeVxqdq3peK2h+vMLL5+8hNN8tcVyXcFTr4u1BB/X99n/jcO8StRfn2HvWwW8DnSPFiTwkRAAAAABJRU5ErkJggg==)![Screenshot of FigStats interface showing adoption by team](https://cdn.sanity.io/images/599r6htc/regionalized/cace19cce1756969586d06e26a71d00257a8a1f1-1600x846.png?w=804&h=425&q=75&fit=max&auto=format)

FigStats shows us adoption across all our teams.

FigStats allows us to drill down into our adoption metrics from an organization level to an individual Figma file. We not only see adoption scores, but also the composition of files, and how they influence the bigger picture.

![Screenshot of Figstats interface showing pie chart with Gestalt layers](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCElEQVQokX2Sa08TQRSG9///ABM+KDFBMEKMXzSKXC1UENot0GBhe6MtvbG03e7uzOz1MTMFkWg8yZMzmXPm3XNZ62RHYRckF0eK6oni4ofk/FgY/4i+/z+S8kFA4fMMyz6cUqvc06nPGHR9+r05/e6cUT9kPBCMByHjoeBuKLkbSdyResb9ODKxWnXAx/cVrML2NcVCGbtUod1qM51O8YMAKSVRFBkvhDBeKUUcxyRJYmJRFBPH+qxo1G9YX9vG2tussrd7SLF4iOM4+L5PFEcGoSRB6CNEaAS0UJqmz8iyjCRNaDU7vFvdwqraIzo3A1zXJQgCE9RJnpK0pmM6wzqe2yaWvqluUVlkzlowzyHLUtqtHutrW1jNKx9vJsjzjEdLspTWfErxtsFl4ztufQc57SCFMB2EYWja14LadAG/BdvXAb4nSTNdfk6e58RpgjNz2e05lBpH9J1NxKRlZjmfz43gU4X5Q4XdhWC3qZBi8aVHy4GJklQnQ86GdUZugyTyF/N6mKMWesrPuWnfsqGX0nZC5p7eqDKz0a3ojYYi5N73GHkTZoGHlAKlFpv+E/MnKIlz3eLtyhcs+2jMebnJeeXKcGbXsEuX2KeXVMo/DXZp4SvlGme2znlCv9H3O1+PWV76hLX5ocfGyimry99480qzz8rLvX+wb2J/s3jzemmX5RcH/AJsOyQJzNpnNwAAAABJRU5ErkJggg==)![Screenshot of Figstats interface showing pie chart with Gestalt layers](https://cdn.sanity.io/images/599r6htc/regionalized/0cd4daa77c8d4abcafd5577325aaf629b86d222c-1600x846.png?w=804&h=425&q=75&fit=max&auto=format)

We can also see a breakdown of each handoff page.

As an added bonus, we also run a measure to see how designs are utilizing our text and color styles. If designers aren’t using one-off hex codes, or off-brand fonts, that’s a win for our design system.

### [Metric pitfalls](#metric-pitfalls)

We don’t think our measure for design adoption is perfect. Unlike code, designs live everywhere and are always changing.

This means that Figma files are super noisy. There are a lot of hidden layers, unused nodes, and text scattered everywhere. In the last year, there were 1,853 Figma files that designers worked on across all of Pinterest. So when coming up with this metric we couldn’t just run it on every single file that exists. It’s also incredibly easy to toss files and create new ones. Even if everyone started using the design system tomorrow, moving the adoption measure would be hard because there are a lot of old files.

So for our design adoption metric, we set a couple of boundaries to limit our scope:

-   We only look at files edited in the _last two weeks_. This way, we have a rolling measure of how _new_ designs are handling adoption.
-   We only look at pages marked as “_handoff_.” Figma files often have various scratchpads and explorations. Typically, only handoff pages make it into the product.

![Screenshot of a chaotic Figma file](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABoUlEQVQokX3Rv28aMRQH8PsTm/1mxBSkQockEuqxpUql3hiGsjAjHekQggRsbCCExClAE7jzs8/2HR26nvyNfFdo+kMZPtKzZX/1nu1EUYT1Zo0wDLFarU4eH9fY7XYgInDOT+iI6L8cG9Tv99HpdNDpfC10u10EQR+z2QxEHFKqMowIQiSQSkNKCcE5BKdfOJIkgTOfz+H7Pmq1Gur197i8uECz2cQX38doNCq6kTrF0/MOm80GxAXSww9k2QGp1si0glYSWimkaQpnsVig3W7jvHaOarWKRqOOy6srXF9/wv1ggJgRpErx/em5DCQOrdPicpZlOGRZEWY7tpztdovxeAzP83B29g6u66LR+ICPXgt3d98QRTGU0mCMEMfx6U2FEMWI0o4uxO83ZIyZMAzNbfvWuK5rKpWK8Votc3Pz2QweHsw+ik0ileGcGyIq2DvHml7tWY5Ntb85nU7R6/UQBAGGwyEmkwmWyyUiRiAhy59lDIyxUze2PnrdYW7FcZzv9/s/2D1GPCeR5MR5TlSefYsN/GkR0T8Y+3tdnn3LC0uZbkCMqQtQAAAAAElFTkSuQmCC)![Screenshot of a chaotic Figma file](https://cdn.sanity.io/images/599r6htc/regionalized/a7cdafea25b2784162d461da68178fa4d0a883f1-1600x701.png?rect=0,1,1600,700&w=804&h=352&q=75&fit=max&auto=format)

A typical handoff page.

We specifically look at handoff pages because we know that designers take time to tidy up these pages before handing them off. Conveniently, most designs in the company are also labeled with a “handoff” in their name. These pages are typically seen by developers and multiple stakeholders before they get built. For an adoption metric, they seemed like good candidates.

### [Where are we going?](#where-are-we-going)

About a year ago, we didn’t really have much insight into activity in Figma files. Aside from our survey feedback, we didn’t know a whole lot about the relative usage of our components and the areas they were being used in product.

Today we have a stronger sense, quantitatively, of what’s actually going into these designs and where designs are happening.

![Screenshot of Figstats organized by last edit](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB80lEQVQokX1Ra3PSQBTN//8BzjgtrQo69cHoJ3UUCVOKbYUQoCAgyMMopSi0bJJ9JNkcZ3eB2tFxZ87ck7t3T86916oWOdwyw8UZR7vKcfGJoXVOddxC5f8PhvpJgPLbG1huZYWuu8R0cIOZ52PmEY2rWYjFJcXi0sSfc6bx64pvYPhyIXS+157j9csmrONCH5XjGpxaHePRGKvra/i+D0opOOc6hiEFpQyMcURRhCiKIYTQiKIYXHB8HU6RP7Jhld53ULIrOD39iOFwCOITUE7BGNOFKmrOjViSJHcgpUQcxxiPPLw4KsLqNBbwvs2xWi0RhiFEJECZchWCcSOmYNxEO5EkkTpKmercZPzdOBz1fZA1RZpKqKP+FoQBgiAwgvxWUN39y2GSxLeCk0EInzAk0lxGcaTdabdC6FaVoHKnBP8WlbuW86plb8TBaILtUQVKREEVboevuGlRIk1TpDLdcSkTTCc/kH+6cUjWTM9OCLNVQtYghGiXvk80V2NQd4yZhf25LDXzwZcxnj0pwHLPFmi5I7SafbQafTTqXTjVNpxqB67ThVPr6G/X+YxGvYem20Oz0TdwN2/cLoqFczzcewPr3SsPz3NV5A5KyGVKyO7beLT3QSO7X7zDsxkbuYyNxwclDfVGx4yNB/eLOLxXxm94OCg/yeCTIwAAAABJRU5ErkJggg==)![Screenshot of Figstats organized by last edit](https://cdn.sanity.io/images/599r6htc/regionalized/a180930766675144e8c566767f716888b5b5aff2-1600x846.png?w=804&h=425&q=75&fit=max&auto=format)

Handoff files that changed recently.

We’re still experimenting with how we can integrate our findings into our larger design operations story. But as a start, there are a few things we’re looking at to utilize our newly-found design metrics:

-   **Adoption:** Knowing where and how components are used in our designs helps us see trends about where our system is easy or difficult to use. We can also pinpoint teams that struggle with incorporating the system.
-   **Quality:** As part of our analytics, we run a cloud linting process to understand if design files meet certain file hygiene standards. For example, of all the text nodes on a page, are they using our text styles? We also wanted to figure out the number of hex codes versus fill styles. Figma doesn’t allow us to edit these files from the cloud (🤞), so we began working on a plugin that our designers could run locally to improve overall file cleanliness.
-   **New components:** Sometimes designers will create local components and paste them across different designs. Now that we have a way to identify that, we can see if these customized, local file components are being distributed widely across a team. If we notice enough usage, it’s an opportunity for us as a system's team to consider adding it to our larger design library.

We think that design adoption is a complement to the components we ship in code. For example, we noticed that our [PageHeader](https://gestalt.pinterest.systems/web/pageheader#Props) adoption was low. We eventually learned that it was due to a limitation in our code component. However, the design adoption told us a different story—that teams were actually trying to use our components. So that’s an example of where design and code adoption can give insight into the health of our system.

We’re just scratching the surface of design system analytics, and design adoption is our first foot forward in the space.

### [Try it yourself](#try-it-yourself)

We’ve done some work to open source the way we calculate design adoption, so you can take it for a spin and measure your adoption scores too. When looking at the numbers, it’s hard to say that there’s an _ideal_ number for adoption. It comes down to how robust your system is, and how people are making use of it. If you’re not sure where to start, use [our library](https://www.npmjs.com/package/figma-calculations?activeTab=readme) to get a baseline.

Give the _REPL_ a try [here](https://replit.com/@RaviLingineni/figma-adoption) with your Figma API Token and the IDs for your design teams. It may take a while to process all of the files and calculate an adoption score, so you might want to grab a coffee.

![Screenshot of code console showing linting results](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABx0lEQVQokYWS63KbQAyF/Rpt4sQx5o6BhYVdWAy2AefSpG3S93+W05GMPWTamfzQHFY7HH3SavHglgjFAUKdEIo9NkEFO6xYV47E0spw85Di+yr5Mr7dx1isvRKJ7CGrJ6TliKTokakRaTkgyvZwIwMqunKKa9xtci50uxYc9H05LyyvQK5H6PYHqu4N7fCOtv+NqntFaZ7ZOEhbhGmHUHTwkx02gb6aLqegMxtuAgVZnVB3b2iOv9iwal+ZkmjJxIsb+PGOlcZBxHPK5WRKo1m4W8N0FzJSc/gJ1bwg0yemW3uKW723zzOdt3s7GZLSHBdUldrbjx/ohneO/ekPuuGD82nRY+NrNvtf3M1I2dDyFUQ5MCVRqd0LE9IICvPErcf5gR+IaIOkRSQ6bKecGxk2vhrSatBFXj1CqAFCDyjbZ0jziLTskRZH5HpApkck8ohYHiFUD1mPnAvTjmd6NSRkJzJcnV7Qzw1C3cCXDZxtDTfSCBLFagcVnLCGv9UIEw03uuxr8dmQ1oDQ7aiGLTQcpWFnGlagYHkSbpjB8nL+kfbWDs65tSunHZ21TP1/IpQNAm1Y3djMCBWvDBX243POifQ/hH8BFu9Xdf2M43EAAAAASUVORK5CYII=)![Screenshot of code console showing linting results](https://cdn.sanity.io/images/599r6htc/regionalized/72875cc1107552f5c9eb389f20d9a88b8b74d5e8-1600x897.png?rect=1,0,1599,897&w=804&h=451&q=75&fit=max&auto=format)

Results of an adoption run.

You might notice that adoption on certain teams is 50%, but only 2% on others. Those might be files worth drilling into and discovering what teams are doing differently from each other.

We’re super excited about what it means to have a metric that takes designs into consideration. If you have any questions, or are interested in jamming on ideas, send us a [hello](mailto:gestalt@pinterest.com).