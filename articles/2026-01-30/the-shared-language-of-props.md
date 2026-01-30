---
title: "The shared language of props"
source: "https://www.figma.com/blog/the-shared-language-of-props/"
publishedDate: "2023-07-19"
category: "design"
feedName: "Figma Blog"
---

July 19, 2023

Component properties differ across design files and coding frameworks. How can we translate and align them to help designers and developers work better together?

1.  [A case study on buttons](https://www.figma.com/blog/the-shared-language-of-props/#a-case-study-on-buttons)
2.  [Our shared vocabulary](https://www.figma.com/blog/the-shared-language-of-props/#our-shared-vocabulary)
3.  [Behind the scenes of the Component Inspector plugin](https://www.figma.com/blog/the-shared-language-of-props/#behind-the-scenes-of-the-component-inspector)

[False cognates](https://blog.duolingo.com/false-cognates/) are words that look similar but have different meanings; [heteronyms](https://en.wikipedia.org/wiki/Heteronym_\(linguistics\)) are words that are spelled the same but are pronounced differently.

Language can be both a barrier to and a catalyst for communication. The right word can precisely describe a feeling and drive alignment around an idea. At the same time, words that sound similar might have vastly different meanings across languages, or different pronunciations and meanings _within the same language_—despite being spelled identically. And, of course, communicating effectively isn’t just about the words we use, but also the perspectives we bring and the contexts we share (or don’t).

The same is true for the languages of design and engineering. As an engineer, I use many of the same terms as my design counterpart, but our different environments and contexts often lead to differences in how we interpret these terms. This is a good thing—we _should_ be leveraging each other’s unique expertise. The problem is when we think we’re talking about the same thing, but we’re not.

When a [component](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma) is used or implemented, it is considered to be an instance of the component. These instances are where that expression takes place, by modifying the values of component properties.

Before we go too deep, let's start with some loose definitions for **components** and their **properties**. First up: components. Whether you’re designing in Figma or bringing designs to life in a codebase, you’re familiar with the concept. Components make the process of building and maintaining more efficient, and allow you to be consistent at scale. More specifically, they are reusable elements with rules describing how they can be expressed. These rules are defined in the component as properties (or “props,” as they’re affectionately called). Props describe the various ways a component might behave and look, such as a variation or interactive state.

“[Boolean](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties#:~:text=Use%20boolean%20properties%20to%20set,to%20the%20icon's%20layer%20visibility.)” (true/false values) is a great example of how designers and developers approach shared concepts from different perspectives. It’s an engineering concept that developers learn when they just start out; often designers are introduced to the idea by using Figma with their developer counterpart.

It is with this unique framing that I ask sincerely: What is a property? Designers and developers are familiar with props, but view them through their unique lenses. For designers in Figma, props are used almost exclusively to mark visual differences. Figma props come in different types, like variant, boolean, instance swap, and text. Developers share a lot of these concepts, but might use other terminology to describe them; they might use the same language to describe something subtly different. Developers also have properties that are non-visual, like event handlers, or data-related properties. In this sense, they see the purpose of props very differently, even when there’s a shared understanding of them as a concept. Maybe that’s obvious, maybe that’s frustrating, but it’s the truth! Let’s talk about why.

## [A case study on buttons](#a-case-study-on-buttons)

It’s all too easy to conflate language across environments—especially when describing a shared concept, like a button. We see buttons all the time. They seem pretty straightforward. But in practice, a button in Figma isn’t the same thing as the button component in a codebase. While we share a lot of language about the visual appearance of buttons, designers are thinking about visual consistency and how they will be implemented across their files, and developers are thinking about interactivity and how they will be rendered with code. Same concept, different considerations.

Before joining Figma, I worked as a software engineer on a React and TypeScript web application, where I onboarded right as they were migrating to a front-end that would be compatible with a design system. They were building on top of [Material UI](https://mui.com/core/) (MUI); while MUI leveled up the front-end, its conventions often conflicted with those of the purpose-built design system. Migrations like these surface these differences in language and understanding and present an opportunity for closing those gaps with effective communication. They also demonstrate just how complex the idea of something as simple as a button can be.

The driving force behind this effort was to build components that were easy to implement by full-stack engineers whose primary focus was connecting the front to the back-end. We wanted our engineers to find the component library intuitive and lightweight. Our goal was to create an accessible and well-designed front-end that reduced the amount of considerations they needed to think through about style and front-end concerns.

We had two button components in Figma: _Button_, and _IconButton_. Those Figma components didn’t share a primitive component like they did in the codebase. Component inheritance doesn’t exist in Figma in that way. You might even argue that a single Figma button component would suffice, and I wouldn’t disagree. In our case, they were separate because it was the best way to model our idea from a design perspective. There was redundancy in some of the props (like size and color variants), but we were fine with that. It was easy enough to stay in sync, and it didn’t threaten consistency.

In addition to those two button components in Figma, we had five in the codebase. _Five_. The _Button_ and _IconButton_ components in Figma shared a name and concept with the same-named components in the codebase, but they didn’t share the same purpose or contain a third of the props as their counterpart in the codebase. Implementing components as a designer in Figma differs from implementing as a developer in a codebase. When you optimize for the developer or designer experience with a component, it is tailor-fit for that specific purpose—even if it shares a name with a component in another environment. If its purpose is different, so too are its patterns. We can’t reduce a component to just a name. Context is crucial.

![An abstracted button being interpreted in different ways (shown with purple, gray, and black circles) from different perspectives.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACiklEQVQokUWSy08TURjF+zdRE6ALra1AGfqacZh26PQxLa3V0lLKIzTBuAMDYsQExQcbxAULpCVG0lc6BFsWJNUFSX0UK2okIf4Lvcd8A8bFyT33nN/3JTe5hi6z1jGaNXbl+j66rRqzOKqQ1TJm7xaw+vQdtrbeIp+/EHnKqCOG2G6rBpo1mjV0mTUYaKHJWmOc/QN41zET+AZkbxnR0U2kUg8xNXUPs7NZXeQpo44YYnnXMTj7R5hu1C4WGs3VTh9XYxG5hQn1nN32NaEIb3DTfh8OWxpcfwSD/QFd5CmjThG2QeyEeo7IyAn6uBqM5ioMV4cqHUnOsZhSQEZtssnwCeLeQwT5HGTHBqShFxjm1nSRpyzI7yDurYPYTLiJmL8ASc7h2lAFBo9a7CTTz9iIlIXifsUyoe+YDP3GHbmBmHSAqLSPqKRdnvt6Rh0xmdApFPcmaDaZXoM3XIQhMlbszGQfM1FQwdsesHSgjenwHySVJlLKJ0wET5EJ/tRFPqV81jtiiBVsy6DZmewKRseKMPBKqRNPrDO/dwGquMMyoTYywV8Y939FOvDtcuEPXeQpG/e3dIZeo4o5+D0LiCfWISglGEwDlQ4v7rFb/jqmI22WUb8gKpXhc72Gx/4cw9wTiNyqLvKUUTcqlUHsdKSNuP8QvLgH00Dl4ttYbHUW8LSQCJyx2EgTPmEXonMJvDMNtyMCl8Ovy+0I65noXIRPyIPYROAMQU8LFlv9/z/ssRwwq+0Ig/YGc/FH8ClVJJPbmJt7ifn5R1hcXNJFnjLqiCGWszdAsz3W9/8Xdpk1RpfevipzeitITZexvFLGxmYJ+XwRhUJJV363qGfUEeOUK+jtr+qL/ukvyBAZKJjXROwAAAAASUVORK5CYII=)![An abstracted button being interpreted in different ways (shown with purple, gray, and black circles) from different perspectives.](https://cdn.sanity.io/images/599r6htc/regionalized/8c6bdf17eb755dd8c36aae148f5adbdf145705ab-2162x1216.png?rect=0,1,2162,1215&w=804&h=452&q=75&fit=max&auto=format)

> Implementing components as a designer in Figma differs from implementing as a developer in a codebase. When you optimize for the developer or designer experience with a component, it is tailor-fit for that specific purpose—even if it shares a name with a component in another environment.

You may be familiar with the idea of JavaScript frameworks, or you may be framework-agnostic (I see and envy you!). You may build for a platform other than the web. You may also have no idea what I’m talking about (👋 you belong here, too). In any case, hang with me for a sec. Roughly speaking, this component library had the following component inheritance for our concept of buttons in the codebase:

![Two sets of buttons, one categorized as "Our products," and the other categorized as "Products that use Material UI."](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDUlEQVQokWXP3UtTcRzHcf8hR7q5phexOefZ43G5ZYnmdDvHXCDDmUW6nenoaUKE3mR4FwRdZNBlN0UE4TlbTtMekE26M4qCCvRszs8nzhn0QBe/q+/v9/q9vy05mVAkICs1kEnUkJV0LEzoWEjqUGQdmbiObOLIvJOOHSDUV0WHpwS7T0NnoISuQAkOfxFWjwaLS0WLARoPUoN7iAWfYsj/CCPiGmJ9jzEcWMOw/wmSZ7YwFz/A9KgBVmDzaOgQVDh8Ghx+DSd9RbT/BTITrzEZ3WS/e5Wh7gL7hQIjvkWGewoUXUscE59xduwHp0cPGRIrtLo1Wj0q7V6Ndm+RHUKRJ9waLS6VZqEiHePKyDdMDVUwm9zGjdkybmXLUFJvkB75gEvnPyGbqDdXFquwCxs4Fd6CcG4H3sG3cEd3YPduNAsVCTQqFYnMT5BL2WM+uKvz4eohV242eH2S5tw46dgBQ2KVDm+ZnrPvGE1UOSDvMTi8y85A+XchFRkmqIw3eO3yT95b/sr7K9+5PF9nPmnMmp8aYFCs0tZbojO6yYi0y4HxKr2D72kTXrPVqbLFxGQwJ5Fzcp0zU/vMFyq8c3ufi1d1zl/4H2zvVdkVecVAYoNiYpuu6Bbbeopsda7/C2bkI6aTXziZ+siZ1GcqF2vMmfV/QGPlth6VFv8LWk8/py38ku3COi3dqgn+Al8/n9m0MDD0AAAAAElFTkSuQmCC)![Two sets of buttons, one categorized as "Our products," and the other categorized as "Products that use Material UI."](https://cdn.sanity.io/images/599r6htc/regionalized/bcfd8e757b2123de91be261ec599a6bcc6a51d5d-1885x807.png?w=804&h=344&q=75&fit=max&auto=format)

How we set up our Button components and utilized Material UI in our codebase

One of these five components, [_MuiButtonBase_](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ButtonBase/ButtonBase.js), was an existing component that we utilized to get a lot of initial core property definitions that were super helpful under the hood. These are things that are not easy to justify building an entire methodology around when you can just grab one out of a box. _ButtonPrimitive_ was our custom base component that sat as an ideological layer, protecting the components that engineers implemented (Button) from all the hurdle-hopping we were doing to customize the core MUI base component.

![A screenshot of code showing button components.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD70lEQVRIiZ2VyXIbNxCG+SyRSM4Ag30bYFZSVFLlyJFdOmV7jLyKrdxTueQJcrL9VD6JfwrgIjrlLOXDVxhgWP80u/9uLPT84aOaLsj7+cNH/YUs1PT+SU1/PqnhjyfZ//Ykuy9DHMmCUP3vkOEXcPszuPmpwPSP/w9z+C1VP4DI77FQ07u97B73wrzeSyX3Sh8QUuyF5HupRCHvT8+n/eUZ42xPKNlnQcj0FlzfQUoCrWlBqhpSEShNjzy/O58d35czRSBEVSKE7B7BzXcQsoHSDbRmkKqBEARc1BAZeeDwoRriiDx+WCgKoZqjYP8rRHiAbh1C8uj6gBgtrG2gTA1tM+Tw7Coot4Y0a0i7Ks/CEDDNwLR4jjAL+j5h3A7YbhI2o0WfGEIkcJHAhBrKVOBqBSaXaPgSjbhGI5agfAXCaxBOsNDTO4j0FsLeo00B45ww9gZzzzB2DWKkMK4CE0sQeo2qvsK6+mcWp6Io9wo+OoTo4ByH97TgXE54DdqsUZPlf7LIgqp7hAoPsLGFjwEuGGjDD4mWFFwSMEHAeH0B+SyLU4TCvoINDqmPpSghSugcna0/QZoMOdJAaVaqKzWDNsei5BzyLBgD+qnDNCfM2xb9pJAmirQhSDNBnClCL+BaCe0ZlM0ivFgsCxt7KegfYPqEOCVsdh1uv+kxbSyGbYPxlmLYUfS7Bmk0CDHAeF2iEjklgpQ1i54Fiw+7CDd4pEmjnzXSwBEHgtDVcLGCz2tqYL2C8wbOq3OEObq8f47QvYZNLdqhRUgaIQnEXsLHnKN18V3xX/YdW5XC5MgYr9Gwqqy5sxZ6eg8R34Drl2iTx+ZmLDkcZotpZ9HNspg6dwXXq+LFf/WhvhCMyeFmN2Daegw3HNPXDMNtgzgT+K6CsmuQZon1+gqr9VefZXHqFKZfwnmNfrLoNgL9DcVwmwtBEUYC6SpQns17hfWpW+qrQ+cc18w5h0zfQ1mFdtAYtgbz7sCwzWcCJlAIXYGpFRqxAmXL0o5cHXJ74mIe3kM7jTSGYpvtNmIzt5jniGHOnrTwSUDaGqwUaQUuVyW3QmeWhecqqzso26DtJbpJo+slUhJIySKlgDYaKMNA2Rp1HhLkGnWG5vXqzEWn3EG5GratYOMBEyoYT2E8g7ZN8Vu2Cm1ytQ/DoKqusboo0vkvS38Hl2q0Y4V2qguuIzB5fLUM2uU2Y1CqAePr4sUsXNef2uiiKC+gfV16N1smEycO30u4VkNbDi6rs0h15CSUo7sQfAMqXpQR5aNANxp0o0bbSYSk4IOCcfnOeDb23/13OrsQ/BaE1eDlojpeUvI0D2swsSrtlwvxuQ45RfgX9Ot//meouRcAAAAASUVORK5CYII=)![A screenshot of code showing button components.](https://cdn.sanity.io/images/599r6htc/regionalized/f44fa291b4e74dd211606b0f519fe8ae4d0233eb-963x1285.png?rect=1,0,962,1285&w=528&h=705&q=75&fit=max&auto=format)

The Material UI “ButtonBase” component

A eureka moment here for me was that I could bake accessibility requirements into these prop definitions. For example, best practice for `aria-label` and buttons is to only provide these labels when the button content is not descriptive of the action. Buttons that have no text and only an icon are not descriptive, so we enforced `aria-label` as a required prop when `button.iconOnly` was true. Instances where it was false had `aria-label` as optional. We added comments and documentation about nuances of when to add an `aria-label` for this optional scenario, so that developers would have that information pop up in their editor as they implemented buttons. This primitive layer allowed us to enforce and educate about accessibility at the component library level—a huge win.

![A section of code is highlighted against a code block background that's blurred out.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAAAsTAAALEwEAmpwYAAACf0lEQVQ4jZXTy04TURwGcPfSzqVzaTu3dDrTmd4hAlKKrW1CxGKqgkQ2JrZAEx+g5dInoPgAsHFhggkLiQ/iygeBYAxJgTOfmcNoICRYF18mk8z85pz/+ebBzsbFsN+5HPrX7fXzYa99Nuy1T++k27ob/9mt9fPhTePBzsYF6Xcuyfb6Ofnw9gdZmv9EGtU90qh+JI3KHmlUBqRRHZDnlQFZeLIbZECeze2SZv2AbLz5TrbWflHDt3wQ/c4VNts/sbp4jELmBQzdgaE50NXUdZQU1LgNJWYFsRGPJuGYNSzNf0a3dUoN3/JBr9+58nrtM29l4dBLWSVPlBhPEMNeRAh5PB/yOC7ksezYrTDMQ09Tcl6zvu91WyfU8K2/K+y1z7Cy8AWONQdJjkCUOAgCC55nwLEM2DsJw1CLaNYP0G2d3FrhLTCVLEOSeIgSC0FkwPNh+jLDhIL8uR+DrhTQrO/fDzpWGZLM0fhoJMKA48Jgbyb4wL3g5pp/KEfIZ2vQEzHoCRmqLiGuiIjGBBo5KtBR8BF/yyOA714fo1x+ieJkGvkJG24mAStlIGnpNAlTQzwugY+wYEYB3y9/Q626jOnZIh7NZJAft+Gmk3BcE46bhJ1KQFGi4Hn23zPcvAE+ni1gupzFxJSDTM6G6ybhpi2kHBOqGgvAEHR1BPBpZQnTMwVMlbKYmHSRy9vIZK1rOJ2EpgUgG4JBwYN7ZvjqK0ozi8iN28gWLWTyJtLZBJ2lH9sxoKjy6FteXTxCIVeDYcZgmFF60pohQ9UkKKqEWFyEIHK02KP30C5DjvGQo0EPBYZ2kf4xQQf/o9iHcKwSpCgLUb7G+EiY9s6/jgL+BviqceAWrahsAAAAAElFTkSuQmCC)![A section of code is highlighted against a code block background that's blurred out.](https://cdn.sanity.io/images/599r6htc/regionalized/268774c2c46aa998bfacfbea1ba9e00bd3c69ff0-1608x1288.png?w=804&h=644&q=75&fit=max&auto=format)

How we handled different types of icon properties in our Button property definition

Three other components—_Button_, _IconButton_, and _SpecialtyButton—_were limited expressions of the _ButtonPrimitive,_ whose express purpose was easy implementation. They might share some _ButtonPrimitive_ property definitions (the size variant, color variant, onClick, etc), but have certain props hardcoded. For example, when _ButtonPrimitive_ was wrapped by the _Button_ component, that `iconOnly` logic was hardcoded as `iconOnly={false}` behind the scenes, and the _IconButton_ component was hardcoded as `iconOnly={true}`. Implementation engineers didn’t need to know any of this! The types _just worked_ and these components could be implemented with the least amount of overhead for the developer implementing a button in the course of their feature development work. All they knew was that `aria-label` and `icon` were required props when they went to implement an _IconButton_.

![A screenshot of code showing "ButtonPrimitive."](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVQokYXRS2sTYRQG4PknaqttLpPLl8lMkplkcmvSS5o0TW2tSZp20kxAaKvSm0lEBddSpIKlQteuvIDdVdH+AFfiBdSFiKVYtAhi2zHnlSSKIFoXDy+c7+XwweGq+kG9qu/XK/reoRqdqm7Ua+XDcQvFXToz+pTGM+tUSN+n/MA9yiXvtKTuNrOQftDszGlbtFDcofnixxatlY3Z4uQuVfQ94s4V3iHVtQSvOASv2A9JSMBpj8FujTQxvgt+NoBkaA7Z1Apy6TWcTt1CNrmKbGIVueQq8uk16CMbmNO2wZ0de0PdwSrZ7AIxwUFukRFvM9OJjjZqP36UTB1tJPI8hSQ/RdRe8stx8oghklwqSUwljxAg2ROnVOwKzeRfNX74FsnYZUgePxTVh0g0hGBIgVcWIbgdYE4essgQabyFZciKC05mhsXaDpPpGDo6j8BiMaErMI2p7DM0F/Z3XYJblOFTPAhHg4hEg1CDCiSvAMZ4SIIT4UAQPbEE4rE+BNUovFIALibDbpPAHCp6wzVM51+Cm8m/QVytwMq74BSckBUfFL8PPlmC4Gaw2cxw8A5ElTGMJq8hn7mJbPoGTiWXcbL3Oga7l5DpWcb44DpmJ7aaCykWqJDF6iIHc5LkkUiURHKLAjEXI7OlkyxmF/WFrtJ07gXNa9s0q31oXnx24reF4ieqlL4Rd77wHpnuFai+IsKBCURVDao8hoAvB783B68wDEXUMJq4jfniZ1ws11HTDdTK3//QmBngFie/GFPZ50ZpeNPQR54YpeHHRnHokaFlHv60YUwObRoz+dfGhdJXo1Y+MKr6v3FV/WCnZf8/Wr1a2dip/cq/+AG7RO6sQ9J1OgAAAABJRU5ErkJggg==)![A screenshot of code showing "ButtonPrimitive."](https://cdn.sanity.io/images/599r6htc/regionalized/f72344cb8d7a0c840e34eb13ac5c4427534c52c4-1608x906.png?w=804&h=453&q=75&fit=max&auto=format)

We had many different Button components in our codebase! We also utilized components from the MUI framework.

Components in a codebase serve a very specific purpose, beyond the visual layer. There can be many components for something as simple as a button. Yes, there are components in Figma and components in the codebase. Yes, in the case of design systems they can describe the same pieces of user interface. No, that does not mean they are the same component and no, they do not need to use the exact same language. It’s not that we need a unified language in all contexts; rather, we just need enough context to get everyone on the same page.

> It’s not that we need a unified language in all contexts; rather, we just need enough context to get everyone on the same page.

In practice, when should we use different words—one in design, and one in development—and when can we use the same language? Variant component properties like `size: "small" | "medium" | "large"` or `variant: "primary" | "secondary" | "basic" | "danger" | "success"` are the _easiest_ things to align on and often comprise a _majority_ of what a developer needs to know when implementing a component in a design. It is funny, though, how often differences in word casing creep in as an unnecessary hurdle here. One quick win is to agree to name your props and variant options the same thing. Many of the designers I’ve worked with are good with naming, and developers often have requirements for format (and the answer is almost always camelCase). Play to each other’s strengths.

![A screenshot of buttons in a Figma file with related code on the righthand side.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVQokV3TbW+adRgFcL4HtOmDbZ3IHSglbUmqbrMwKK7Gxiw+VeN8Y4VuyabGuVYd1GwmptQ+WBV1XSllLTdQHlcZ4852syJY7RgUp8v8Iv+cY8rUqS9+Oderk1wvjsb+5TvizSufCM/6JeFZv/hf4YtiMnypaXzlvOiffV20+lxC63UKndfZTO3/aE6tf4avk1exuiUjmJQRTESwlolhLZfAhpJF5raCbFHBXOR7OL0n0XX6KNonD6Pd80jHQZ46gtZ3n4VmOrrIzUyScXmL8WicsUiUiVSaiUKO+Z0i6/sN3r1T4/K3AbreeIGm0T4aj5soOUw02B/Ru8zsfM1KzVR0ERuZBGJyDNFIFPJGBPFUEltKDvkfi2jcu4fqnSpm/XOwu2zof0qC9bAeFushGHt7YJC6YTB0Q285hMdG+6CZkhcY2pIZCoa4diXI4Moqw5ubvLqdYlZVWG80WN2r0j/rp90xTMugxIEhPc39j1Nv7GaPqYfdvT3ssurZMWZh8+VYLsNr6Syz6QwzyTS3c9f5w+2bVHcr/P3+fdbv1vnF3DwdDjtNZomm3icpGfV8YlBi56iFbS8NsG3cytaJZ6j5KLbElJJjIV+gckNhIX+Dt1SVt3bLrFT3+ODBH6zX9rmwsMQRl4umXlOTuc9Mg22AHRNH2HL+GHXTx6j72NEsxLaqoFyqoFwqY0ctoaiWoZYqKP20i1qtjl9297AcCOD4+IuQhgcg2QZhcg5Bf+JptJ21QecbgfYvmunYIguVHf7a+I212j5LxZ+Zjt5kOJhiMBhmKBSmLMf41foKx2Ym2OWxscN9lJ2Tw2w/Y2PLlIM6r/MfmrdDMwjkI4jvXIesXsN3yQh8i8s48+kMPN4P4Pa+j3NzM5hanYVzyY0233PQXnBAd8H5kNcJ7b9ohubfEmOBs+LVyx+KVy6fEye+eU88v3BauPxuMeKfaBqdnxTOJbcwfv6yaPl7Kb4RoT3gPXCwkof3n1qHF+m5YqrAAAAAAElFTkSuQmCC)![A screenshot of buttons in a Figma file with related code on the righthand side.](https://cdn.sanity.io/images/599r6htc/regionalized/a7abfd52630014b5494fd683e9232c84c0796517-1608x905.png?rect=1,0,1606,905&w=804&h=453&q=75&fit=max&auto=format)

This button example uses the same variant options for props “variant” and “size” in both Figma and the codebase.

Even this “simple” case for aligning language is not without caveats. One road bump is that the only way to model interactive default, hover, focus, and pressed “states” of a component in Figma is with [variants](https://www.figma.com/best-practices/creating-and-organizing-variants/). State is not a variant property in the world of web; it’s a style within the theme variant (“primary,” “danger,” etc). What do we do here? We can add a prefix like “:state” or “\*state” to the Figma property definition signifying that this property isn’t a property in the codebase.

![A screenshot of editing a variant property.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABx0lEQVQokYWTW2/TQBBG8z+8bkScWkq86/uFTZzGqUGJHQkJiapqS8ul4g0heKS0SZHzs61vkO2mrRMED0fzsnP07exshxXLkhV5qWyaqq6z8uDXouzeNBz8nLdQt/VmXp9lz3orV4cVS7Aih7JZgv3O0fv+GvwyhXOWwjlPYZ3OMHg7hv7mZc1hXSX0kxgvvqZg91nTW+SoXB1lkxMrclI2S2LrjPQvxxTMJyQnY4piSYGMyA58ssKIzCAi7nnEXZd4HFL/Q0LqKmt6a0dO7YTrDPr1DF4i4bkeLNOCKQQs24cnZ3CjKUwnhLB8GDJC/zKButpJyB7tTcLDzzOypxHZtk1ccDK4QcK0yfKiGmG7xE2HjMgn7f20lbBy/VXoHY8oDMJGyvkzRFMNTsPAIu1iQupq8W9h/1NC3kySlJJ83ychRJ3yiUpoPAjjfaGyM0Pt4xHsoxBhEMJxHHDOwQ2jzdDA0LegXcRQV4vHGVauvYS964TMNCJ3FJIIHRq6ZhuvqYOxQ72rCbHdGSr16zztYffHK+hXCQZnU+inMfono33ejaCdx+h+a+9h5aquXCrVtj/8GHaflerdolRv/091dvtTto4/b+iD9U9UOBIAAAAASUVORK5CYII=)![A screenshot of editing a variant property.](https://cdn.sanity.io/images/599r6htc/regionalized/b615c21b5ddf9cff3d32a05649ceb2d151567431-1608x906.png?w=804&h=453&q=75&fit=max&auto=format)

This variant property uses a colon prefix to denote that it is a style property. You can use conventions like these to make the purpose of different props clearer.

Another thing we can do is align the terminology of these states to reflect the corresponding terminology from the platform. In the case of the web, we might prefer “initial, focus-visible, active” over “default, focus, pressed.” The difference between `:focus` and `:focus-visible` in CSS is far more meaningful than at this design variant level. How far you go into aligning these is, of course, for you to decide. Bringing that nuance of CSS implementation into the component language might do more muddying than good. There are opportunities to align in both directions, and more clearly understanding your counterpart’s needs will help you make those concessions together.

![A code block showing style changes for a button](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABxElEQVQokZWTW4sTQRCF8z+mk8nekkxfZnpuWdlNYhI3tx4QBH+AClmVsKhvsviSTH52c0p6Jisa4qIPh4KG8/Wp6uqGVxaWlcayfV2bj3N7thnby/Ww0sV6aM8/DOzZ+4FtP+ndrfU/jmzz+8yynbHewetYDa8swEoDti/Adgb+1ym6b/pQixThIoOaJRCTGHIcQ04S8JFG50biYqnR2ozBtgae85YGjtVge0OsNOTtC2I7Q+3NmII7TVEuK4WpoDDmpGNRSYUBBfyKrm4E+eshse2q9paGHOtXwuqWnUF7M0ZwpxHlAjoXiDIOnXLohCPSHCoMIGQXnVsJ/34Etl0dJyyeTRilgnTKKXY1kaRjSWHEqTcMqX0/OkpY0DNAUSvlB6Brm1cwqQLqDtT/AiXpvqIoE6QzQUkmKa4SigoajKLTQO/EDHvTCCrhtXSAUPeg49/mqHroDhTa/zzDmaaoL0jnLh2nOBeUXkvKXihK3MtrTt2hIv90QvNHQv/bK3TeXoMvU/B5Cu72cJ5CLjOEqxxqmVVnl69ztB4mR3to4Fq2ntvyfV2bPxbW/zK1/ueX1v/0d7UeJrb5uKh/yMHrfspPrxt/Cbzz7t0AAAAASUVORK5CYII=)![A code block showing style changes for a button](https://cdn.sanity.io/images/599r6htc/regionalized/ab0dec2f2e2b2976eba404e7df6ba87017e4bc5a-1608x906.png?w=804&h=453&q=75&fit=max&auto=format)

An example of some style changes across different states in CSS

Oh, and what about when a button is disabled? A designer might add “disabled” to the aforementioned “:state” variant since it is mutually exclusive with the other states. That makes a lot of sense. In code, however, `disabled` is often its own prop in addition to a separate style. In this case it might be best to leave it a state variant option in Figma, but also express it in the codebase as a disabled boolean property. There are times where there will just be differences in how you describe components with properties. That is ok too. You can still align on the casing of the word “disabled.”

![A screenshot of a code block above a toggle showing that it is in a "disabled" state.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClElEQVQokXWR3U/TYBSH+T9aBxtuY2xru3Zb122FbhNk3fyIiYB8RHBERCV+DMYG6MAW4p2JcuEF6h1eGEFBEGFBo/9We35mXSJi4sWT8755c578znvaWEO3GbNgs6u67Srn7M7JlO0bU2z/uOJU70jC7hySbc/gWdzXZbtjTLFdj7I2u5pvOQzdbmMNnRizQOxKnjqme6hbj5LQF6PIxThF+qIkZCQSM1GSsnGKNsnJJGoxCqV48mUF6phSia3nWw5Dp6YQjFkAW8/DfUtFUJMgpmRI6QSiyTjkZBxpVYGmpZHJqA7p5pvEI5jk4L6ZAlsfaDkMHWcSuksqBVSewiJHYYkjXuJIjPIUiwsUlyMkJ0SKyyKJEkccF6CAEiL3RIrY+sB/EpZUdPcI4CIhcGIAvNgFQexCROyGEAkgzPsQCp9HKOwFF/YhmAzCM9FMmD+TsHVZycN/JwflcgaZ/iy0PhVaVkEmpyCXS0HLKEimJciKgKjMgY91I6hx8JTUf4UFMKaOdqOI3pUx3K/PYbn+BLXlKqq1eYdarYKF6jwqlTIezz/E0MwYhOFeeG4k0P4gC3b1b6FZIMbQqXP9Ko1uVun94TadfD+h48YxHR+fcnR0RI1Ggw4b38jYekXy2gixi/3Ohv/swflDswDG0OFZv4Kh13N492kL+/v7+Ly7i70v+9g7/IqdkwN8/HGAnZ+H+PDrAEvbLxF9Me5M1ux3MFrn5sjEmDq5jCLJ9WEaWZqhqeosTVbuUWmxTKW1BRrdqNDQZoWG31Zp8E2FshvT5H1+zZms2e84HHRqYwzdYsyCxT7TrfbagOWb7bf80xcs7+2c5b+rW/7yJcv9tGi5zKLlWmvVc2bRYs2C5fQazXrKb76DryAc687NAAAAAElFTkSuQmCC)![A screenshot of a code block above a toggle showing that it is in a "disabled" state.](https://cdn.sanity.io/images/599r6htc/regionalized/d03a9c8526296bf320cc2942def505e4f256b071-1608x905.png?rect=1,0,1606,905&w=804&h=453&q=75&fit=max&auto=format)

“disabled” is both a boolean property / HTML attribute as well as a pseudo-class in CSS. In Figma, you could represent this as either a :state variant option or a boolean property, but it must be a boolean property in code.

At Figma, we’re constantly evolving our product to meet folks where they are, which will always require a certain amount of adopting implementation patterns. But we also need to think about designer ergonomics in the same way engineers think about developer ergonomics. One of our goals is to speed up the product development process as much as possible, and doing so requires fully embracing the design experience in a design tool in the same way that we embrace the developer experience in development tools.

With that will come differences in language, due to the difference in environment. Today, what’s most important is that we learn to recognize these differences and focus on how we can work together to describe what we are building with the language defined by the tools in front of us. Otherwise we end up trying to force a conformity that will inevitably leave certain needs unmet and always be trailing behind.

> Today, what’s most important is that we learn to recognize these differences and focus on how we can work together to describe what we are building with the language defined by the tools in front of us.

Specifics will change based on the products you’re building, but let’s agree to align where possible and have conversations when that alignment causes friction. The best path forward is always going to be some combination of priorities relative to your unique scenario. So if we can’t use the exact same language all the time, how do we better translate across contexts and frameworks?

## [Behind the scenes of the Component Inspector plugin](#behind-the-scenes-of-the-component-inspector)

I built a plugin to answer that exact question. When developers explore design files that have UI components in them, in addition to the component name, they’re primarily concerned about the values of a few specific properties. I wanted to generate code for components that focused on the _language_ of the properties instead of the visual style. This [Component Inspector plugin](https://www.figma.com/community/plugin/1162860898904210114) does just that, surfacing code for component definitions and instances in different component frameworks—Angular, React, Vue, and Web Components. It actively ignores some property language on the Figma side, and some property language on the code side that don’t overlap, with the goal of generating _just enough code_ to help translate visual styles in precise language for developers. Creating this plugin was the most approachable way for me to embrace this idea of a shared language—to reflect what I see as the most useful version of this in practice.

![A screenshot of the Component Inspector plugin showing props on the lefthand side and code on the righthand side.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB80lEQVQokS2RW4vUMBiG+zcWmlPTaTttkzanNk2TdLYz3ZlFxAUPiArei5deCoIg/m2ZGR8+3ruH75QACNMMpjm6JgEpgYAgSDGgONtlWrTbwV3Op+fny+l0mn0c52Bc0HZWZkgAQqggeJ+hkuAyyyqaVTnd70hJ6Y7Knh2X+fx0PJ+f1nUdJ6fMqMwgzSCVSRDCRV00sqpYWbOmV30vBetYVRW7nPYdX2LYttO2beu6WmullOKKFEImGOM9r5ivW1MrJa21wzB0Hd+XRZHTnvMQwrquxxuzn7XWd1sIkWBM9nzPIxOOWWvc5JRSdV3nV2jH+eymGONyw3s/jqNS6u5fOzecqaAGJ2Y3Bh8Go0XftE1RFLTrePBuidHP3k3OWmuMkUrdxr7JNWulk2roxlE759Yov76tv7yURuTddee4LAdrJ6ONUmowag16i9oakSCEdmVedWXVFk1bM8YuS/nnO/r9DR4s4ZzHGENczGil0kLI1YkfH9Svz+L10iUIQIogJZBilBO8I0Q36OP28P74IFrMOZ/n2c1eD+NVlvLkup/vqr+fipelTVAKSAqyWxIACYAZhAVJcwxoRhhj0zSFEKy16raq1f0r37yJ9Wx4AlMAUnBPkEIIILgWAABmhLRt672/XC6Pj49a6///vZ9LiH8X7H78zy1mqAAAAABJRU5ErkJggg==)![A screenshot of the Component Inspector plugin showing props on the lefthand side and code on the righthand side.](https://cdn.sanity.io/images/599r6htc/regionalized/ce40a4de4ea8eddbde745d30c723d468011abd51-3840x2160.png?rect=0,1,3840,2159&w=804&h=452&q=75&fit=max&auto=format)

When developers look at properties in Figma, they see properties they might want to keep, ignore, or modify. The Component Inspector plugin attempts to make some of those decisions for them when it generates code.

I shipped this plugin last year, before we launched [Dev Mode](https://www.figma.com/blog/introducing-dev-mode/)

, a dedicated workspace for developers in Figma. Now that Dev Mode is live, I’ve built a section to display code with plugins in Figma.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAABxElEQVQokV2SSXLjMAxFc46AMyVSlkTNQ+w42fWm73+d4HeRzlS9+AWoBD5+EHgiIT6I6OOZiIsEMYnPnHIuviWkZKnUQzn/9Z3/5ZqnZ6KPckAqJmVKfC65fkiIb7A2hp33bJ1ja22RNoa11gX+BXzcbjxk3YJCAwoRor5A+ghSGiQEhJRwziHGBnUI8KFG3TVwbYCqHYRRpe4bSNZDdD3TdWS6DyzGxKJqWGrDxlr23nOMkYeUuE+J49Dy5Rj58jKxny8sa/twSOXdBJNxoLFl+jOB/s6gowdVNZSxCCGg6zqMw4B927DvO8Z1wbAvGI4F7Zxga/+fwwzsOqbXBHpPoKkDVQHK5DYjhmHAuix4vV1xv9+xHweWdcWyrBjHCSFEKKV+gMJVkF1iGvvsFKLvIesG2jrEpkEaJ6zrhvv9Fe9vbziOE9u24TxfcOwnUhrgffXboYG4BKY+groIaiOEd1Bao6pqXNoO0zTjer3idr0V2Lb+AHMHue6pwCivjQAZxeQ0ivLUpCzvIpWCsba843mexd2yLJjnpbQ8TROapoE25gH8XGJ8RXrkRRmYY16bfCgPJLub57mAslJKqKqqDOUf46YdTedabQ4AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9d7e59e92f181a53a3338ceef82892ece83b4116-1921x961.png?w=1921&h=961&q=75&fit=max&auto=format)

The first thing I had to do was specify that the plugin runs differently in Dev Mode. I wanted to keep the same functionality in Figma for the time being. I updated my manifest.json to tell Figma this also works in Dev Mode, and is codegen enabled. I could also specify which languages it generates here.

![Drop down menus showing "React" and "Component Inspector" selected, to the left of a code block.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACKklEQVQokT2S627cIBCF/R4G3wDfMLbB9yS7m2S37Z9KUdJKef8HgVNBsv3xaQaEZs4MJyKE2DtxHFtKqS3L0mqtrTHGtm1rhRBWlMK2nbSj1lZKaTnn4Z1SyvbDaJUarOoHGxFC3J04jh2l1AkhnFLKSSlD7mGMubwovmKeuzRNHefcDaNx635x8/7szHp2UUwIyDcxiUEpRVVV0MZAKQUhBOq6RlmWSJLk620ch8gYQz9MWPYXLMcV8/aKiMSxu3NXWFWVm+fZDcPgRFm6VrYBr5BQ6mI/ESVBoVKDG8bJ9ePs+mF2EU0o0jwL+NzDOEPbSVSDRGEaiF2hftIQR498lciWFtlYoVIttDYYRw3V91CqR5QfHeqLQXkakWwNyFyBLnXIk1OH9Dai+DWhejtQ/31C9ecR5fsD2M8JzTpi3XZs+4FpXqDNhIh/HJCfFzSfZxQfO7L3FenbAvLbIL4qJEcL5hWeDaqLAXvske0SqanDBOu6YfcFpxlaa0TF0aF9maFuG7rbhvZ1Afdq1wakY0h4Di4EqqYGLwWyPAP5Xo3/vHmaA8MwoO/9yEUO2UmMWgdk16Hg7P8+sywDKxg44+FXi7wId562qbGtM45jx7IsMMYgyvMcUspQvZMydM3SLNjC28QX8da54+3jI+cMnWxwetxxfX3B+XzGum2IfKemaYLXiqJAmqbBi6FgmoBzHor4Rnf82d93ssXp6QE/bldcLhcs64p/nA9G1MFzpSQAAAAASUVORK5CYII=)![Drop down menus showing "React" and "Component Inspector" selected, to the left of a code block.](https://cdn.sanity.io/images/599r6htc/regionalized/c114b2be7861a61fb1ef5b29230d82d3f2f34c9c-2088x1175.png?rect=0,1,2088,1174&w=804&h=452&q=75&fit=max&auto=format)

JSON

```
{
  "name": "Component Inspector",
  "editorType": ["dev", "figma"],
  "capabilities": ["codegen"],
  "codegenLanguages": [
    { "label": "Angular", "value": "angular" },
    { "label": "React", "value": "react" },
    { "label": "Vue: Composition API", "value": "vue-composition" },
    { "label": "Vue: Options API", "value": "vue-options" },
    { "label": "Web Components", "value": "web" },
    { "label": "JSON", "value": "json" }
  ],
  "codegenPreferences": [
    {
      "itemType": "select",
      "propertyName": "boolean",
      "label": "Boolean properties on instances",
      "options": [
        { "label": "Implicit", "value": "implicit", "isDefault": true },
        { "label": "Explicit", "value": "explicit" }
      ]
    },
    {
      "itemType": "select",
      "propertyName": "comments",
      "label": "Comment generation in definitions",
      "options": [
        { "label": "Disabled", "value": "disabled", "isDefault": true },
        { "label": "Enabled", "value": "enabled" }
      ]
    },
    {
      "itemType": "select",
      "propertyName": "defaults",
      "label": "Default values on instances",
      "options": [
        { "label": "Shown", "value": "shown", "isDefault": true },
        { "label": "Hidden", "value": "hidden" }
      ]
    },
    {
      "itemType": "action",
      "propertyName": "settings",
      "label": "More Settings"
    }
  ]
}
```

Then in codegen mode, I returned the code whenever the codegen event fires.

Example codegen plugin “generate” event handler. Check out our plugin samples repository on GitHub for [a sample codegen plugin](https://github.com/figma/plugin-samples/blob/master/codegen/plugin-src/code.js).

JavaScript

```
if (figma.mode === "codegen") {
  figma.codegen.on("generate", async (event) => {
    const { node, language } = event;
    if (language === "html") {
      return [
        {
          title: `My HTML`,
          code: `<p>${node.name}</p>`,
          language: "HTML",
        },
      ];
    } else if (language === "css") {
      return [
        {
          title: `My CSS`,
          code: `.${node.name} { color: red; }`,
          language: "CSS",
        },
      ];
    }
  });
}
```

The plugin has always embraced a few of the concepts we have covered here. You can select a property prefix to ignore (“:” in “:state” for example). This allows developers to only see code for relevant component properties by hiding the rest. It also lets you to configure text properties as “slots,” so you can even specify which element type you want to be rendered in that slot.

![A screenshot of a dropdown menu in the Component Inspector plugin.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAIAAACZeshMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB70lEQVQokYWR2Y7aMBRAIUtJHMdZvMV2CCFNQgoVghGQjqqiAVXTVepLpZb+/4dUSRgmzHTUI/s+3eO7eDAcDnVdN15E745pGKPRCNjAgY7lOQa0hoY20DTNtm3P8xBCbh/kuj6CPuoiCn2mRJpn6byg2xK8kRocDXRdRwgppcbjsRCCMcYoo5zhTOJVxnezqK54PYveVcndqrivp193/McG7jId2Y3s+36e54vFIssypZSSSo4VX75WX26KX/vqdKxOh/L3ofpzLE+H+Oct/b52l4nhWI3seV6aprPZbDKZCCFEJCIpZJYU9XL7aX/77bj7fHdz/2H98f18v53u3sbLIoi5OXrVyBBCxpiUMoqatmmLFKIsy+1mU9f1erWaz+dVVWVZliRJHMdhGJqm2ciO42CMOedNWSGiFiFEkiR5nhdFMU1TJZUQgrcwxhBChmFcyVJKpZqkC7KlWySlFLeEYQgh1HX9LBNCIs6jKOoe7mLHpRqllLRgjB9lCCGltOu4rzV/1qMz/y03g/JnMnl0XpQJIf2RwjDEIb7EJwRB4DjOWXZdl1HKGH0Qr1Pb7Cf0ZOgwgiNO+cN6zjO2F7d99rnaNgB2GHgEB4TgbjHn7trrB4H/DABAI2uaZpqmbVsAWADYoMX6H6Zpapr2F+SATchzGm+PAAAAAElFTkSuQmCC)![A screenshot of a dropdown menu in the Component Inspector plugin.](https://cdn.sanity.io/images/599r6htc/regionalized/cca484c7b64f518f2fe5d21c82da0ff6c19cf42a-1130x904.png?w=804&h=643&q=75&fit=max&auto=format)

Codegen plugins can provide user preferences like these here that I added for the Component Inspector.

![A screenshot of the Component Inspector plugin, with three sections: "Ignored Property Prefix," "Text Property Slot Suffix," "Optional Variant and Instance Default Name."](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAACE0lEQVQ4jYXUW3OiMBQHcNIY1p06Ux/WglrBK1iQFLkkspjxAmgV/P5fZ6fJygLb7v6eeDlzTv45RJIkCQAAIZRluV0hyzL6AoQQACAJD/DhsfOo9BVN18fj8WQy0TRNVdXeFzqdDoTwoxIAgBD60eu92lYQhITzfX+1Wi2XS8Mw5hWLxWI2m/V6PYTQR3MAgCzLL6NRFP08ckmSHA6H3W7HGPN937bt1zvLsgzDqBd/kyeTSZIkeZ6fuROXZVkcx57nre/e3t5M02x21jSNMZYkSRzHlFIxPCEkCAKvwnXd5XJZK0YIqarqOI7rutUhxZwNi8Xik2LbtjHGzh3mRGxmxXw+/yuwlxdK6Y7bV0RR5DhOdRajGZgs67q+3+/zPC+K4na7FXdZlm232yiKNhylFGOsKEqz+HA45FxZn+f59Xp958QVpGkaBIGqqrUzD4dDQghjTDQpW5XflCOEOI7z/PxcK1YUBWPs+z7G2OZWq5VdZ1mWbdvNexadwzCM47g8GyGEVpSzuK5bG7sM7HK5nE4ncUixZOW2lcfebDaDweCTwIqiuF6v1cCKorhcLil3PB63263rurW0EUKj0Ygxdj6f0zRNkiTjxDdjjFIahqHneRhj0zSbgamqul6voygSmVWJhS33rPlLQgi73a6madPpVNf14T/1+/2np6c/jwkAoNVqtdvt7/8jXqjfbSXpFwfZqCAV6vmPAAAAAElFTkSuQmCC)![A screenshot of the Component Inspector plugin, with three sections: "Ignored Property Prefix," "Text Property Slot Suffix," "Optional Variant and Instance Default Name."](https://cdn.sanity.io/images/599r6htc/regionalized/a9f49ae284a1ee72519b299e5e82f798cb333271-920x904.png?w=804&h=790&q=75&fit=max&auto=format)

The Component Inspector also allows you to specify your own conventions for some of its more complex features.

An “optional” element property is a frequent pattern in code frameworks. This occurs when you have something like “icon” and it can be absent. In Figma, you model this as two properties—“hasIcon” (boolean) controlling the visibility of an “icon” (instance swap). In code this would just be one optional icon property. The “has icon” is implied when the icon property is “undefined.” In order to transform the two Figma properties into one, the plugin has to detect that the instance swap (“icon”) property’s visibility has a reference to a boolean property (“hasIcon”). When that is the case, it knows to make `icon` optional and not generate code for the “hasIcon” property.

Another “optional” pattern is when a variant can be undefined. There is no good way to show this in Figma. So the plugin allows the user to specify a keyword to name the default variant value (something like “undefined”). The plugin will then detect that case, and treat that variant property as optional in that case. Plugins for codegen can surface user-specific settings like these in a pop-up window, or directly in the UI in a preferences menu. I used this menu for the Component Inspector settings: “implicit or explicit boolean props on instances” and “show or hide default values on instances.”

This plugin is not perfect for everyone, and that’s kind of the point. Developers have very specific needs. We know that. Plugins—especially private plugins for all you [organizations](https://www.figma.com/organization/) out there—are the best way to tailor-fit the translation of design language to specific codebase-informed needs.

Check out these resources if you’re interested in building plugins, and feel free to send feedback on our APIs:

-   [Component inspector source code](https://github.com/jake-figma/component-inspector)
-   Plugin samples:
    -   [Repository](https://github.com/figma/plugin-samples)
    -   [Codegen sample](https://github.com/figma/plugin-samples/tree/master/codegen) and [Dev Mode sample](https://github.com/figma/plugin-samples/tree/master/dev-mode)
    -   [Import/export](https://github.com/figma/plugin-samples/tree/master/variables-import-export) and [styles to variables](https://github.com/figma/plugin-samples/tree/master/styles-to-variables)
-   [Plugin docs](https://www.figma.com/plugin-docs/api/api-reference/)
-   Figma Engineer Sawyer Hood's Config [talk about building plugins for Dev Mode](https://www.youtube.com/watch?v=8gWxD_xly44)  
    

There’s no perfect translation between designers and developers, but when we embrace the differences in our environments and understand the nuances in how we talk about them, we can build better, together, and more efficiently. But to do that, we must amend our strict definitions of terms like variable, component, and property in ways that bring precision, not distortion.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIEBgf/xAAhEAABAwQCAwEAAAAAAAAAAAABAgMEAAUREgYhBzFBcf/EABYBAQEBAAAAAAAAAAAAAAAAAAMBAv/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRMv/aAAwDAQACEQMRAD8Asi8I8TyYDKlvwQ/oMlErBzXDOUwo9q5jc4dhdaVaUrCdirYan7msCMgZCiPw1RCfW097KgogEE+6ZbMIyFagdSDGuqGW5zqI/bYPRP2imuaQZiyBgHHVFZfo5LVwJ//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6becee750f71392fa5c3fed021f2392f95302d4b-6000x3992.jpg?w=6000&h=3992&q=75&fit=max&auto=format)

Learn more about how Dev Mode enables designer-developer collaboration in [this talk](https://www.youtube.com/watch?v=IHP3_S5kI04) I gave with other members of Figma team.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)