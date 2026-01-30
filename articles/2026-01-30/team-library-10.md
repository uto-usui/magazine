---
title: "Team Library 1.0"
source: "https://www.figma.com/blog/team-library-1-0/"
publishedDate: "2017-09-19"
category: "design"
feedName: "Figma Blog"
---

We’re excited to announce Team Library 1.0, which empowers teams to create, use and maintain design systems. We introduced the beta version in February, and since then we’ve talked to hundreds of people about how they’re adopting it. We evolved the functionality based on feedback, and with today’s launch, we hope to make it easier for a wide range of teams to build their own design systems.

Components — buttons, icons, dialogs and whathaveyou — play a crucial role in many companies’ design systems. Organizations need the ability to share these elements widely across files and with team members. That way everyone can design in a structured manner and stay up-to-date with projects. Several companies have even gone to the extreme of developing their own tooling for this part of their design system. For instance, Airbnb and Facebook have hired experts to maintain and create such internal software.

We believe component sharing is key to design at scale, so we prioritized it in our product roadmap and released our Team Library beta way back in February. That was mere months after Figma launched to the public. Since then, many companies have used the feature to design in more consistent and efficient ways, and their insights helped guide our development process for the 1.0 version.

Since Figma is online and centralized, we believe we’re uniquely suited to help teams systematize their design. All projects and documents stay up to date in one place without exporting, syncing or sharing. A Figma Team Library is a single source of truth, forming the key foundation for a stable and living design system.

## [With Figma you can stop:](#with-figma-you-can-stop)

-   Syncing with third-party cloud services just to use your team’s component library
-   Praying nothing goes wrong with all the tools you’ve hacked together to use your company’s design system
-   Hunting down the right component like you’re starring in the world’s worst detective series

When you publish or make changes to a shared component in Figma, you can trust that everyone instantly sees the new component in the Team Library. You’ll also receive a notification when anyone else updates a component in another file, and you can decide whether to apply the changes to your own instances.

## [Before and after: The Team Library evolution](#before-and-after-the-team-library-evolution)

We launched our beta as a bare bones feature, with the goal of studying our users to understand what they most needed. We soon realized that even for a beta version, our original Team Library was too simple. In fact, it was quite limiting for the people pushing the boundaries of design systems.

### [Team Library UI](#team-library-ui)

**Old**: In our beta, you’d have to use a pop-up again and again to browse for the components you needed. If that wasn’t tedious enough, the pop up also hid your canvas, so you couldn’t make fast iterations on your design. The UI clunkiness slowed the design process to an unbearable crawl.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAABxklEQVQozzWRzW7TQBSF/XTwAqx4BaQuWAQRUGEXZREJIVTSLitYdUGdOGkbpTSpAlSltWARJYFSWo/tOGN7ZvyfWI3NGQGLozue+825xzNK94v+RusPTnffvf/WaDT0Wq2m1+t1fau5fbnX6nxvHxwdtzrd5x/6p0/V3smRqmm6qqrn0FepltY513rHF9phb9But5uK47F926HWeDpLh5/Pov5wFA9Hn+JLXY+urq8z07JvTNN6/fuWvLq5NX4ZhpESYoSEkOivzJBYdgLOtiyrq+R5frharUSQpKVB/ZJQVjqeX3pQmqZSFNrhjDUF54sMe3Ec/++VSZKUy+WyzLIsRB0oMDtY5TmL0WRhuOZhVHARFJyLO3kAkAO4CcMtGM4TmMHwLk6SNeoahmv0Jcfh9VEayoRcboogKIQQpeu6SOgVcjJ6MuG263pvfc9zZCIYFbL+UwFGcgH4E2m4A50BmsBszJg/oZROfN8fA57iF0dI+5LYzgvLoSPG+Y8oiiZhGM6k5BoDZ9BFEAS7Cg49wMcGmhUke4KLfiaFdQVwhXP+iJjmvalJ7/9c8I0FE1XGWHU+n2/atr2JwVVwVYR5jAd7+Af4BOa2zzUB3AAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/c231f6e9bd5706d6320c6a93595b3e3e86f02c8d-1000x359.png?rect=1,0,999,359&w=804&h=289&q=75&fit=max&auto=format)

**New**: Now all your team’s components are available directly beside your design, in a new tab in the left-hand sidebar where you work with your layers. When you need an instance of a component, simply drag it from the sidebar into your design.

**Tip**: Quickly switch left-hand sidebar tabs with alt+1

Additionally in that left-hand sidebar, there’s a third tab where you can see an overview of your local components. That makes publishing them to your Team Library easier because you’re able to see exactly what will show up in your library before publishing some changes.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAAC7UlEQVQozy2S22sTQRjFt/W1f4f4f6gvChYEQR998MXEpqmtQhUqiFWxir3EVphURBC8IDTValtRrBc09W7BGFtIzCazt9nZW7KtsDOe2fpwyJdvZn/fOTOjZa9M7R+YuXthaPRqcejUaTIwMED6+nIkl8uldT6fJyeyWdLfnyenzl8mJy+Nk/7Tw0WsX8pkT+zZd/BQj6Zp3dAOqEt79r6ce/ll7c3bj5+NVysr9H7pCb1+5z4dmynS8ckpOjExkaowVaAzZJZOz96mN2ZuGoVCYW1scvr60Oi1I5n8YG82m9l7PJPZpemUnjVsu+pyLqlhyHdrv+XtNz/k7OJb+aD0RJZKJbmwsCAXFxfl8vIy9FwuLS2p/3+fvVypP37x+tP8wtPV+fnSo7m5uWOaa9vDnuv+DDxPcMaSmm4kX/9YyTeoWmsktVo90XU9aTabSavVSiht/f+lgpqmaJmWMExTmqZZRX9EcwzjDKAVQKVn24Jjo2s7wvV8wTHEh8IgEIHvpwrDcLtGL4oi0W63xebmptza2qrGcTyimQAyx6l4iOw7jvAA5JjoOY70XCYD9OFe+hgIiTQJ1iCAt6EASUCrgI9olmUNM8Yqvu9Ln3PBLVswyxIcAPVxpFwFgQwBDbFH1QruMQzDmgIqhwqIekTDx2cQtxJFoYwQhwNqMyZc7qWxQhUbbpRCBVCRlUt1PKlLX3Q6HQlVsQaHJhxyr9LuxKopPGxmiOb/jxMC7tfrwms0RIA6UkPUuq4LjosCPFFAxP6VRt4w3KPrTvjQieJVND5xl9fhciuO0xiyo6I2mzKgVEaoO1EkO4jetizZxllu4vySJFF713Fh57Sy7u58rQd7NljUC9Bh3WLXdBZ899qx0YljCgfUtSyKiBQXRHGG20IfbilASgaSvcPzGtRulde7bpTrO+59rHbXG3rP+4a7+0MrvPiHt4tBEBKXMWIbBsHzIgATvFWCwakAIUhFcKHFWq02Wi6XD/wDdJ4gX0Sbl1wAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/127984901b964842bf5de790b9d1da6edc98a788-800x486.png?w=804&h=488&q=75&fit=max&auto=format)

### [Documentation](#documentation)

**Old**: Designers need ways to communicate component behavior, so their teammates know when, why and how to use specific elements. In our beta version, we had no place for documentation, so that kind of information wound up stranded in Slack or buried in Google Docs instead of where it should be — tied to the component itself.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAACpUlEQVQoz1WRXU8TQRSGF6VgIAgG/CP+BTUaEw2XXHjRC40XQAQFjUChGE3QxOgFbYNKlEJMRCNREk2IrbEW6RdsCxQoy27YLrX7vbOz3bYSu+NsiQQvnkxmzsk773sOMf7+8z3v248ffJOvvvl8vq9erzfwD4/HE5h4ORl48eZdYOL1TGDc4/k0NjY27nKPuIeGh1zu0fvDD595XO6nnpGB0Qe37wy62ol1inm+QTH0enoDkiSpJZNJkE6nwebmZpWtzDbI0AzIUDv2XSZXVthoJLIdWVzcjuEzQaYy8eTqzlJ8ORJeij4mFEmawcgMTaNgMIhCoRDiOA4ZhoEKhcIBpomKxWIVAABSZBkpoohUSUKqqloQ92oAiKqm+QlFEPyyIAhrq6todna2Mjc3Z9E0bWGhQ0xMqVSqYujQ0rGIAYBlGoZdq+B3VC6XBcwUIYniNP5R5PN5lMlkKhRFWZIkWdjhf5imWQWKogXYrAXyggVVYEFdr9gpcI+AwQ5leRrHkOw4VTc43mHUA6pCRewO91gFUbL0XdYCv3gsqNmOjwpOEaqs+HVoCGaxZM/qD36sHMGOjOxI+/v71RPHRQrPIyArqAAhKuD5/S6X7flKEEI/kRckF6fAeUk3FrHTENC0kK7r33UIQwqAccyWUTBp7JLGC6D3OI7eZWhGyOUYLM4YENq1XSwWz+fzT4hAOHJm/ufKhWB0+Uo0FrucSqUuZVn2HC/JZyleaacF9Zqsal1YrAtvv3stmbwZC4d7Nkiyd49hevhcrkfg+Vssy95IJBIXidq6usaa2rrmY7WOUw6Ho6W+vr6p+WST47yzq+bRD+r4lzR7gmK5Bi6bbVhYWGgcHBhocV692nbd6Tzd293ddre/v7Wvr6+ts7OztaOjo+kvWWiBGRiEEZAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/a70415e3a5ac0425005df026506a0fd773bb58e6-1000x488.png?w=804&h=392&q=75&fit=max&auto=format)

**New**: Now with a component selected, you can add information about it in the right-hand properties panel. Teammates can then view the component documentation you created when they browse components in the Team Library.

### [Categorization](#categorization)

**Old**: A key part of a functioning design system is organization. Our beta version of Team Library only allowed categorization of components by file, so things got messy.

Categorize by frame and group in Team Library 1.0

**New**: Now you can see your components organized by group and frame in the Team Library in addition to file. For instance if you collect all your button components in a group and name it “Buttons,” you’ll see the thumbnails appear together under “Buttons” in both the Components and Team Library tabs of the left-hand sidebar.

**Tip**: Set the background of a shared component by changing the containing frame’s background color

## [Learn more](#learn-more)

If you’re curious to learn more about Team Library and the new sidebar tabs, we’ve prepared this video that walks through everything in detail as well as this help center article outlining everything you need to know. If you’re new to components or want to learn more about them, have a look at this article from when we first launched our component feature.

As design becomes more integrated into companies large and small, the need for communication and formalization of design process has grown rapidly. We hope Team Library 1.0 will help teams with the collaborative nature of building cohesive products at scale.

A big thanks to everyone who supported us through this feature development cycle— your feedback inspired and defined our 1.0 vision.