---
title: "The Linear method: Opinionated software"
source: "https://www.figma.com/blog/the-linear-method-opinionated-software/"
publishedDate: "2024-05-29"
category: "design"
feedName: "Figma Blog"
---

May 29, 2024

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAHsIAAB7CAF4JB2hAAACqklEQVQokQGfAmD9AKu11q/H2pq52pO0z5+yw7SowNPM3Lzi7oDa23rhyKTs2Mzz7sXz7Irl22TUypXZu9jjtcy7s6l6pblwmQDEvMvGz8ytu8iks6uwvJqzuLLAx8m0y9SZys2r3bfR7b7m8NLc8M6x2ryYuKS4wpzb1ay4oKGbY5DCcpQAobjAmr/Aiay8k6yfq7uKqbqWpLSZlZ+lj6O+qcHBx9HB1dLFztfEwcK5y5ea3qWM28GgqYiVmVqJz3mUAIrCy2uzzVeevnCloYqxi4uug4ikfI6XjJKaqpCmtpeqt6Cps6S1s7O0ssuYosyclrqqnpR2k5lZi9Z/lQC1zuGLvOBaor1inJBxnnxwmnVylnSAmYCGm4h6lop4kIx6jo2AmI+UnpSimJaSmpaFlpt8Z5KYWYzYgZYA6cbtx7rkhaa5bpiIbpJ0aItrZYZjbIdjdoppeYhsfId0io6LkJCOjXpzhm5kd4Z0fpGTfWOUmFiN14GWAPuz4e2q2MSnwJysqYenl3qZgmyLbG6GaX6EcX94Z45/d7aarbaKoZdaX4FaTHqLcYicnX1pnZJYkdJ9lgD9ssP7ob/nn7vCuryyyLajvJ55oXptj3Z9gH92ZmSMc26+k522boGbT1OJeW1vrKJhrbxYeK6BXpnJeZcA/tm//L296Kq5yL60xNSys8uYbaJiVItbbn5vcGJdfGBYnWJkoUxSpmdhoKmZcsbFQbTPMoa8YnGrrIGkAP7oz/nJxNixraezi6PAfp28bmieSGGPUIB+aHhbWXFGRIY8QJ9WVrGXirbHsKDNwGyvvjuIuUWHvYOOtQD+4dfzucC6nI5ulE1mmjh3oDhvnDiBjlWRYlt+PUZ0MTeKOj+kd3OqtqWzyrK6yrKgrqlmf6ZRdrJ3f7EDMpMd9EPoIwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/1ca3593897c11b81c36208d408283d4a32d5b0b9-3264x1836.png?w=1632&h=918&q=75&fit=max&auto=format)

The Linear team runs on strong opinions that might seem counterintuitive to outsiders. Here’s how those principles show up in both the product and their processes.

In Conversation

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAUGAf/EACUQAAEEAgIBAwUAAAAAAAAAAAEAAgMEBRESIRMGMUEHFCJRYf/EABYBAQEBAAAAAAAAAAAAAAAAAAQBA//EAB0RAAMAAgIDAAAAAAAAAAAAAAABAgMRBDEyQXH/2gAMAwEAAhEDEQA/AIYr3rWVjpY6EOmsO1yPs0D5VvPYnIemo6jMlHHJFO/XlidsA/1dtTx4aVmRlZI9kEo2GO47B67P6WikyuEz9JlGOtJL4HGYgP5cT8HaC6YzHjmo37MDeqE2DpFcvQN+4doIpthyrJXitxWoLDBJE/pzT7FVvptiaOPrX4qtdrWuJ3vslEVrtI34vk/hSfg6Nl5kkjIcevxOgiIt0kIqJ30f/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/658349a8a008f24b66577ce7832670beeae07b64-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Jori LalloCo-founder, Linear

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcGAwX/xAAmEAABAwMEAgEFAAAAAAAAAAABAAIDBAURBgcSIRMxIkFScYHB/8QAFgEBAQEAAAAAAAAAAAAAAAAABAMA/8QAGxEAAwACAwAAAAAAAAAAAAAAAAECAzEREjL/2gAMAwEAAhEDEQA/ALJqq6vttmqZoMGYDizP3HoLL2283Oz3ylprrVOqqWsjBbI5vHhJjOPwsFujuC51wmstNH42RSDnPnvI79LnuJqKSOlsNZHURyNa1spDDkkgdoOSqVJIfjiXDb2XNtzY4ZRTbS2qIb3Z462LlGHEtLXewQi3ZonwiBa4qZHahubifk6d2T+15U8jmysjDiWcAcE5+iIkskio7YyubpZgHryv/iIiPfplJ0f/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/314436796852605d3e073b0d49ae2402179a7ad9-426x426.jpg?w=426&h=426&q=75&fit=max&auto=format)

Cristina CordovaChief Operating Officer, Linear

Illustrations by Jon Han

Well-designed interfaces don’t just happen. Great product experiences are the result of great people, tools, and of course, processes. These processes are hard to get right. While some rallying cries reach the notoriety of Meta’s “Move fast and break things,” others run the risk of simply being the work about the work. But there’s a reason why product development frameworks are so prevalent: How we build is just as important as what we build.

At Figma, we’re always hearing from teams about new ways to build for more streamlined workflows, faster iterations, and ultimately better products. It’s in this spirit that we’re inviting product leaders from a range of teams to unpack the specific terms, principles, and strongly held beliefs that govern their work. While every team is different, hopefully there’s something here for you to adapt, remix, or even push against for your own workflows. For the first installment in our series, we sat down with the Linear team who put forth a series of [principles](https://linear.app/method/introduction) to guide their own work. Here, co-founder Jori Lallo and Chief Operating Officer Cristina Cordova share why opinionated software is core to Linear’s methodology, and how other teams can adopt it.

## [What is opinionated software?](#what-is-opinionated-software)

Linear’s founding team—including Jori, Karri Saarinen, and Tuomas Artman—had previous work experience spanning high-growth companies like Airbnb and Coinbase. Frustrated with legacy tools that siloed workflows, they set out to create a collaborative issue tracking and project management experience that more closely mirrored how startups work. “We’ve always been interested in how tools can enable us to do our jobs better,” says Jori.

At its core, opinionated software is software that’s purpose-built for specific use cases. At Linear, that use case is helping teams build better products. Unlike a general purpose tool to be adopted across many disciplines or workflows, it guides you toward a default process. “We design it so that there’s one really good way of doing things,” says Jori. “Flexible software lets everyone invent their own workflows, which eventually creates chaos as teams scale.”

## [What does it look like in practice?](#what-does-it-look-like-in-practice)

#### [Forming atom-level opinions](#forming-atom-level-opinions)

At past companies, the team saw how steep learning curves and jargon kept people from adopting certain productivity apps. Rather than coming up with new terms, the Linear team landed on straightforward units of work—like projects and teams—that are universal and easy to understand. One of the team’s firm opinions is that you shouldn’t need a handbook to start using Linear; the aim is for users to spend less time ramping up and more time building. This is why there may not be one _right_ way to do something in Linear, but there is a _default_ way to do something. “No one wants to waste time nitpicking the nuances of a process,” says Jori. “We try to reduce the amount of fiddling around with processes and get you into building things.”

> No one wants to waste time nitpicking the nuances of a process. We try to reduce the amount of fiddling around with processes and get you into building things.

Jori Lallo, co-founder, Linear

But what happens when the default approach conflicts with customer feedback? The Linear team believes there’s an art and a science to it. The team is generally more opinionated at the atomic level—deciding to add labels and due dates as issue properties, for example. As they move up the stack to broader concepts like projects, they take more cues from customer feedback, knowing that every company is structured differently.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAHsIAAB7CAF4JB2hAAADJElEQVQokQEZA+b8AAoKBgwMGCIgR2NUd5N4j599m554rJ54uK+DvMOPwMaTwLyJwKh8vYyFmHmnWmWdSDlXVyhAaERvhmGQnQAICAwLDCIsKFhsWo6SdKyjfLuxhbu0j7DHoLDfsLbbsKzOpKXJmbOwnJuOrmN7rVBgiVVCYFgzT143U2oAGx45JCVcPzePblazlnDDuIjJ0p/A3bOv6car9dKr6s6d3sKV5buq2bCstKGYlJqEgKRjY5BNN1VOJDlRAEZPgFFUqFlNwnVXyaFyycuTxem2uvfRr/rgqvznqO7ipNnUouXOqezDr9Kkt66MtY2Vj2uPc1B5fE1+hABBR5tWVr5pWsaIZsSwfMfTncLuw7X63qv766r977Ds6bLP263d16ft0abftbHDmMObh8BscLFae6xpqawAJS+TRUSzc2ewnH+wvInB3KbA88yy+eKo9+mr+OK58t2+5OC06t+p89aq6Lu0y5rEnH3MZF/DSmCxWISjABlBdj1KoXdusKGGtL+Lwd2lvezFrvLdpurcqOHHs+HEt+PUr+7erPXWs+u5usmRxI14w0x0sjRnnkRgiQAMVVEvV39pbq6Ue8K2gsbQl73XrK3ozabj06PHuqTJu6Xdz6Xy2Kn3warnoLC/hMF9e7w1kKEefYopR3EABFNCF1lWPmd6aW2emXi3vo6406Ww7cat7dOn1sWh2cii7Nan9c6o86Cf3Hulr3HAcHS+LZCgEHuBEC5hAAU6RwpITBZWUjhcc3NroKOErcqds+q3uPPJs/HNrfDOrOHKqcq3ps2XqsR+uJd0xVZ9tx+Vmwl5fgc1XQAeKEEiOlUgSmg3VIViXKuIbbesgLzMlsHfqb7otLzksri2paqBlJ2Oh7ChhMl4hsMymKQMoI4GeXgETF4ATjomRz9FQlFzU2SUXVuwaFa+f2DBmXDCrX/AuIjAtoa9ln2ya3GlaGaua2S6SnetGZ+VBqaHBXlzA0hXAGBGF0o9L09cXGeBgFxrnEtMsVZMuGpXuHlfuINkuINkuHdftGNXrk9MpzpEoCNblA2WjAW0igWZfANeX2+DtXXf1cCWAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/2182a50590378a88c933d1e0655b2b3da613b8c6-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

#### [Being strategic about product debt](#being-strategic-about-product-debt)

“When people talk about ‘product debt,’ they often mistake it as ‘tech debt,’ which is actually just bad code,” says Jori. The Linear team thinks about it as something they can borrow against, strategically choosing to narrow a feature’s scope, “save” on quality, or optimize for the short-term, knowing they’ll have to pay down “interest”—in the way of customer feedback or resourcing—down the line.

Settings are one product experience where the team has intentionally taken on debt because “display options” or “favorites” don’t generally make or break the user experience. Over the last five years, the Linear team has only ever _added_ functionality to settings—whether that’s features, preferences, or sections—without taking a step back to rethink the experience holistically. “The interest rate on it has been pretty low, and we can pay it back over a longer period of time,” says Jori. Until they have the time to tackle a settings redesign, the team recognizes that it’s not the perfect experience. “Shortcuts might be perceived as lower quality, but our version of that is more about decreasing scope,” says Cristina.

> Shortcuts might be perceived as lower quality, but our version of that is more about decreasing scope.

Cristina Cordova, Chief Operating Officer, Linear

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAHsIAAB7CAF4JB2hAAADJElEQVQokQEZA+b8AA40Kx1yOkGbTWqUYYSJgHp/jE5yhSlvbStwT1d7Pp2RL8CHLqpUYZ4so6kcxawoxKliqaaajpqagYyLeQBVWUpfhWJqnIxkfaFpXZeHWoCIY3pncnlgfmOYekTPejDUay2yPkaaJXSlLp6wSKmvfJ2rpJGdn4iRkoAAv6JOnZOFdnu/Wl7FalmZl2Jqnl5me2dyaGtlnElLzTRC0C9Csh5ClyFIsU5b0ntwz5p+vKqKqaWLoJ2FAM+qTodzlVRRw2hksKWYfb+sXpGJaFducUlbXnQ4UpghTZ4YSJ4WTaIgSsFOQuOBROmdUNuoZMuob7ymbACpX3VsQ6JXUKuXkobczmPe1VqYp29KeYE8ZXxiZYNtV3ddNF1/I2ayG2rBL13FaErcojvquTnbsDi4nzQAqBy2jR67hEeip5J4wMBttLpqi5x9XoKlUnWydIe8eYW1XFycfECLsCJ3riFzj1x4nKRxuL1Yop40bXEhAK4Nyq8PzaggvpRMpW15n1WEk2WKlHqRs3mCwouJxJGMw354uoRnnY46cH4nd09TokeBtV6HnFVaYzMqPgCmD76rEsSuDsibGcdgPLwzYKBSg42Lmp2hl7WsnbiwoLWml7WTiZhtW2VUQ3A4W6UtarhEWZxZL2xKEU8AnhC4nA+znAqzlAqzZhugMTx7RWJghYd5rp2kzL+508i4v7CsqKKUi49qeYNgaoV9aIeYgHaOkVZxfUBdAJkSnJ8Qk5cLkXcIgUELYhsZSDM7PmpkYIt7kLOqsL24tKCfpJ+lma6zgaisXZqjTqWsd7m0mbyplrCciwCzHmfCIGO5HGSKFVhGEEMcEkAqLURLSV1QSH9jXZRsbZlfbZh3ipinrJCur3Gfo0anqV+7vJXBw6S/waQAvCdI0i1L2S5OvylKfB1DMhRIISJUMTFpLCp7LiyGNDaHM0CBTVx/hIiEl5hxf4JHc3VPhop9l6WfmbCvAIMcPrUpRtc0TcYuR38dPTARRxcVYhsadRsYfRwbgh8ffRsdaCUoYE5PaWNkW0VGPyosPzpGYll9m2WZviQqaQ3oUs2GAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/34e0f3989f0e91465f2d932de6a1ba63f358e99e-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

#### [Evolving strong opinions, strongly held](#evolving-strong-opinions-strongly-held)

“We’re a startup, so we don’t build software by a recipe,” says Jori. Many teams are hesitant to think beyond a framework and change the user experience out of fear that they’ll get pushback from users. Of course, certain changes that meaningfully impact users’ workflows can be disruptive, but the Linear team advocates for experimentation and iteration. “I would hate Linear to be in a position where we can never take something away or change certain things,” says Jori. “It’s natural that there’s going to be a little bit of pushback.” Rather than shying away from making changes, the Linear team aims to give users information and tools to understand the change. And whether it’s an experience in the product or how they communicate on their marketing site, their north star is shipping things that they can be proud of—even if they have to make trade-offs along the way.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAHsIAAB7CAF4JB2hAAADJElEQVQokQEZA+b8AOdUh+hTh+lci+hojeJsjseAlKKlonulsE6OxDqEzUKHyliRv2WUtn2SuLuXud6Fq+CAqeGmwuHD1OPU3ADqiZXrfJPthJftmZvpn5vNoZulsKKBr69ZncRGlM1SmMd2p7OKq6aVnqvCmrfgnbvhmrngrMbiyNfi0twA6tGx68Ov7MSx7dKz6NKxvr6vf7C3ZK6/WqrHVabJXaTDbaq4d62zjZ+xwpKw4Ju64qvF37vN2cnR0MXNAOzvzO3sy+3rzO7uzejnyLjMwXC1w1eyxlyyxWikvHiSrnabr2eouIGpt8OstOOotuOiusyjsZ6blX+NgAD3+eP3+eD3+eH4+eTx8N7C1s57wMdgvMZjucR5nrGUeJKBeYZXhoRslom/waDqyKzcn6Cac3VGVz8iSyUA+/f1+/j0/Pf0/Pb09e7rw9HQdLO0U6ioXq+veqqtf4OIUlxSJksxS2dEtryL6OOtvbWOW2hMFD8ZAzcJAPLe9vPg9fPf9PXd8u/V5rOts1B5ayhlTUB9ZmKahFJ8ZSJEJg0rCEJRL7W3ldTgt4CneiZcNAU9EgI4CADowu3pw+3pwuzswuznuuGxkaRZWlEsRTQvUkZAaF01WU8jPi8vOiRqYkm8tZ6mwKdAfF0JSyQBPA8ANwcA6Lrs6Lrs57rr6Lrr5bbm0aDGqIGZb2qIPFiQL1KXLVCUPlqIfHN/tJGHsayWYZB1F1s8AkIbATsNADcGAN2159+26eG36uG36uC36eKz49an05eJx0ljzzRS1zRT1U5oypeNt62aoW6IeCRjRQVJJAE+EgA4CAA1BACbn8OrptC+sODKt+nOu+vUvOnOs92XkMpYZ8dTXMpVW8NWYLBoco5ScWsiXUYKTiwFRR8FPxUDOQwCNQYAVYiKZ5Cah6G2nq7HorDFoKy7l6CsdICUVlyCW1aBXFR3SU9iMlJHFk8xCUsoC04tDlExDk4uDEglCUMcAE9/bFKAbFyDcWKEcVh6Y0luUT5lRjpZPzpIOUJDPUNEPTNGMxtHJQlCGgpJJQ9VNxFbPhJcQRJdQRFcPr4orOzHX2pjAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/214defa92b73b8bccacf8b8ab833d005424d7cab-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

## [How to develop your own POV](#how-to-develop-your-own-pov)

While it’s helpful to use past experience or a popular framework as a jumping off point, every team and company is different. “Many people try to adapt things from the industry that might not actually be applicable to them, or they might not know the potential downside,” says Jori, citing common tools like OKRs. “They were developed at places that are bigger and growing faster than most companies, so you need to try to understand what's behind them and adapt pieces of them.” More than anything, the reality of high-growth companies is that doing and experimenting is often more instructive than thinking.

Read more about opinionated software and [Linear's methodology here](https://linear.app/method). Stay tuned for the next installment in our series about how teams build products and the principles and processes that guide their work.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia Fite is a writer and editor on Figma's Content & Editorial team. She has previous experience at Stripe and Dropbox.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)