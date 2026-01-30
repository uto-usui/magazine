---
title: "Inside the redesigned Figma, where your work takes center stage"
source: "https://www.figma.com/blog/behind-our-redesign-ui3/"
publishedDate: "2024-06-26"
category: "design"
feedName: "Figma Blog"
---

## [Inside Figma’s redesigned interface](#inside-figma-s-redesigned-interface)

With those inputs in mind, here’s a look at some of the questions we wrestled with, the decisions we made, and what you can expect moving forward.

### [Clearing the stage for your work](#clearing-the-stage-for-your-work)

First, we started by reimagining the Figma canvas to maximize precious real estate. This puts the spotlight on your work, clearing away distractions when you want to concentrate, but still keeping your tools well within reach. We started with extreme changes, stripping away features until they were missed. Our goal was to get as much signal as possible, then dial back as needed.

We explored some radical departures, like a super-minimal UI that only revealed itself on hover. No panels, no properties, just you and your work. In other variations, sidebars would appear and disappear. These iterations made the work environment too unstable, but inched us closer to our ultimate solution: resizable panels and a slim new toolbar at the bottom of the canvas. That frees up the top, creating a roomier feel overall. It also forms a standard structure across Figma for easy toggling between products. You can hide the UI completely, with panels only appearing when needed.

### [Prioritizing features that matter most](#prioritizing-features-that-matter-most)

Another key choice was to rethink the properties panel to prioritize critical controls. Take components. As design systems took off and components became central, we realized that component controls like variants and instances deserved top billing above attributes like color and size. It’s a small change that saves time and energy for tasks that take up an increasingly large share of a designer’s day.

Another big shift: All layout-related options, including width, height, and Auto Layout, are now merged into a single panel. This departs from the typical `x, y, w, h` panel in most tools, but aligns more neatly with how products are built in code. While we theorized that width and height should take precedence over `x` and `y` position, early testing showed this inversion disrupted muscle memory too much. So we adapted—unifying Auto Layout, width, and height, but keeping them below `x` and `y` to support longtime users.

![Two panels side by side showing layout options against a dark green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACN0lEQVQ4jXWSy2sTURTGu7e47Ebci925iW6stUZbFy2mWgTTYio0aDBBMIFWE8zCIIIggrhSXAg+NmpbFcVk8mr6yMS0jWvxD9BmXvfOTBL45NxxQsTJ4huYe7i/+53vnIHBgA+DgaM4EDyJE/EgZu7ewMV7CZzPJDCWimM4FsZQcBwHZ8cwmpjFTMapT2cSGE3FcTi2gKFLZwRj3zkfBuhDP0ciAdx/+RBZWUK5IeNLvYYnBRnzz95g+HoIvtgFPHj9CLlaAaWGjM/1Gh5LMi4/fYVDkTnsnz72L/D4zTm8La5CUX7Bti0wy8bPPRMv1qo4dTsK/+IVLJc/QVX3RN2wbPz4beJ5aQMji1c9gPEQ3q9loRs6Op2OkGXbKOzWMJmOwr+0gJWKBN0wunVuWcjWtzCRvPY/cEQAc9AMHe12W6jVaqH8/Rum0jH4l8JYXc8LIJ1T3RYPVnE25QVMOEBFVcE5FzJNE6VGTQBP3wrjw0YBmqZ166T8DgEjXsB5LFckqHSBMei6DoMxFHdlTKWjAvhxswhN18HcumFA2tnqD1xZzwsItcJNxwEBJ3uABjNgWZZwzzhHdruKiaQnMCQcuhmR6GKBgHccIGVIHdA5PcpME1/rVYwn+2VYyUHV1O4FEmXoOqQMVVUFYxyMOw5zfacsMnSGQkAx5bY75d4MNQGkaChLaXuzHzCEd+UsmooC+y/Q06HmOOTcFDnSUPo6dNfGbZkWuxdIGTaVpnDmRiLWpgf4B9in5SsjRYtjAAAAAElFTkSuQmCC)![Two panels side by side showing layout options against a dark green background.](https://cdn.sanity.io/images/599r6htc/regionalized/78f63a332bd5337dc3ef5fa6648a9e1044fb4497-1608x1072.png?w=528&h=352&q=75&fit=max&auto=format)

We've streamlined the properties panel, while striving to support existing workflows.

We’ve made the panel resizable so you can see more of the component description and property labels.

We also introduced [Figma AI](https://www.figma.com/blog/introducing-figma-ai/)

as part of Actions, which provides quick access to powerful features we anticipate will quickly become part of your daily workflow. These features help you breeze through time-intensive tasks—whether searching for a specific component or generating text and images for your designs—without getting in the way of in-progress work.

### [An interface for usability, not decoration](#an-interface-for-usability-not-decoration)

Historically, our minimalist UI set Figma apart—sharp edges, abstract icons, subtle affordances. This worked for a time, but as we started adding more complex controls, the visual language became harder to parse.

“Maintaining the vast icon system is a balancing act between ensuring visual consistency and conveying extremely complex ideas in an often abstract manner,” says Figma Designer Tim Van Damme.

UI3 introduces backgrounds on inputs, borders around dropdowns, rounded corners, and 200 expressive icons hand-drawn by designer Tim Van Damme. These serve as visual explanations of how to interact with the platform. And they adapt to your needs. Turn on labels to quickly understand what each control does, or turn them off to focus on your work.

Property labels can be removed for a more icon-forward view.

![An array of 15 icons](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAABIElEQVQ4jYWTa1KEMBCE9/7H0qpdFkjIC1AvE+sbnJBEXH80pJl3M7lt+1eusW6fBT3vcWW/8Qhxy4uLOaY9p/VDzsb6hgPOwPmUQ1wlQUy72HxYz4QE3x9jSfoYpvz2fm84oDAYJ5tn40ry4TllY92ZkI/TvEgVnDCOo5Hgg3sBZwrYJUgMPMQt28W3HQKM9fk/XuuWKt5oyBtONe1AxwIajK/yEDfpXrkkxGF4zkV4HNAJZ0ZEDqAj4qvc+Sj6w0tCglzVIW/Vs++w1zD+8KKh7tIrXa40fqmh90nWQKswOlw7phuVo+6waGhcqyGasWeMTRB6sFvnGnn5RrLfGiaJpYHmL6smvYbKtVv9y0yl/Lg5h73sYX+n/8LVfa7xDa5Eh9y4gTFzAAAAAElFTkSuQmCC)![An array of 15 icons](https://cdn.sanity.io/images/599r6htc/regionalized/04b041cb6d1b3685af7216cbb2173ddc568a0ccf-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

Icons designed by Figma Designer Tim Van Damme.

Of course, perspectives on what makes an interface user-friendly differ from one person to the next, even—or perhaps especially—on our own design team. Designers have very strong opinions, and Figma designers are no exception.

In one iteration, we condensed the alignment grid in Auto Layout to simplify the overall appearance of the panel and make it more accessible. But it didn’t quite land. The grid moved around too much, so we reverted to the original design to preserve muscle memory for power users, but updated the visual styling to feel more approachable.

![Figma Auto layout nav bar](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAABkUlEQVQ4ja2TzU5TURSFeSnUKD8JEgOv4ICJLwBECmmFgUhMMLXqWAfGEBo0Foe8gokjE0NCYguGUkgDgTbc3nvuXp+5vb0tpUg7cLCy9vnZKyv7nDXE/F3amLvTqQfFXHfPUFKodRBxjOEucG2d3CMRbdUdwdZBxEqNovQEykzejPTD+M78vXZPr8PEXWoEy87gNp7jf14n/PIKFV7Ddq7JinjrJXr7BC2O3S7I7HDTmcuvUf/1nYuDPbxyEf/kEFctY9VDdFrB/uyi7Tdo+VE8ilsFM5MEhRy1con6pYfX8Kn5Rj0QoQkBdnGK7XxAK9NxTz9BV8jhHe3T8H2CIMDzQxpBSOgckrDzKtp5j1amBhO0b+8IqmWcCVPszJlhZrHD2hka1CHpCSy/htv7QVgpoeMSVinhjn5jlSI6OcCKP7GvWfSs3wyjF1sYQeuPsY8ZLP8C5VfR5iq2GbOivU/LKDuDUv1eOfncT+83v4SWxtHiOERYuspjsPCgKxA9gm2xfySlF52kNPl6Uv5Xlv8CUcjx4wUqI8YAAAAASUVORK5CYII=)![Figma Auto layout nav bar](https://cdn.sanity.io/images/599r6htc/regionalized/5400f0c1d82e01f326fdb2d402e3b31173475e87-1608x1072.png?w=528&h=352&q=75&fit=max&auto=format)

The previous Auto Layout panel

![Two auto layout setting panels showing various alignment and spacing options in Figma's previous UI. The top panel has a cursor pointing at the alignment grid, while the bottom panel shows the alignment grid options with a cursor selecting the bottom right alignment.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACbklEQVQ4jY2OW0iTYQCG/12o/xZkloIQSggJYReeEhKhEA+ZB0i9mtOC0jzO0KwIsVA6mRcVGnkgNQoKr6KSuvF8I4ndhCYKpqnbIsvD/pn/9u+JbeXWNOji4bv43uf5PkEQ7LhQfmPH11chPNxGWpqV7GwrOTkKubl2J5mZChERCqKobPMEJzsE/f0VCgpkenos9PVZ6B+QGRi0MjJio7dXobRUISjIM6TsHFSpXBeOcW2tlc+zFiRJYmXVzPcfa1gsG5hMVhobFUJC/hlUtn7nCrper6uTWViQkGUJs7TO6voqsmzh27JMU5PNHVS5fRcCeBMQAGWlNoaHNvk0ucnEhJXJSRvT0wpj7+1cuQzBwds9wYFKbcITQTQhBhiJijegPbtIoX6RcxVLFOoNFFUaKDhvIO6YkV2BRudW5e37RDbjjV9UC3vj2whN6iQstdvNiSccSO5iX0I7ftEt2zyfyGYEdW4ynoi5SQRoM0ioqaTo3gOqHnVQ3faYi+2dXOroouJhK4lXawjUZTm3ai9f0Ohi2CI/FjEvmv3FiVR332F06gMzS7NMG+aYMS0wv2zg4/wU13uaCStPdW41+bFuXxeDoM47wh80ujj8tDGElqTQ0NPK4lcjmz9lpA0Zi2xHUWB5bYX7b54Srs9E1DpicWg8GoJG5wi5cQWTufaihdmlL5jNZtYcSJLznDMucvdlJwf16Yhax6/+9rcFHaPgwuOcaa7l+XAv78ZHeDs+TO/YEK9G+3k2+Jritnrno2LefwTVebHsPn2UQxeySGkoIvN2ORm3yki/WcrJGyUk1RdyuOoUe87EO7fewV/0jFVGK5Eu4gAAAABJRU5ErkJggg==)![Two auto layout setting panels showing various alignment and spacing options in Figma's previous UI. The top panel has a cursor pointing at the alignment grid, while the bottom panel shows the alignment grid options with a cursor selecting the bottom right alignment.](https://cdn.sanity.io/images/599r6htc/regionalized/4bfd595f520455fbe144bdd2b113f58823226637-1608x1072.png?w=528&h=352&q=75&fit=max&auto=format)

Clicking into the Auto Layout grid

![Auto layout settings panel in Figma's redesigned UI, showing options for width, height, direction, spacing, and alignment. The panel is set to Hug width, Fill height, and includes options for clipping content and alignment adjustments.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAABiklEQVQ4jZWT22rbQBRF85WxH5KSuGk/odDQzyg0pJe0lBLnc0ofgyU3diJHikaXOXORKKwy8gXX4MZ+WMyRZrS0D9I5UP2IQN4brdauXrC83ry/2u9Hi3ruOVgK16XqOEadxahXY4rX/6ICZ2PUi3h+trcI0h9tER5FlOcTysuE4ntC/SPFDHPsjerW+jpDfU7J393PX9z7n/BwhDqNqS5mlL9yit85cq9pM9/RpA7zaClvLcWXDPVyjDp8RlgMxuhvKfWkoqxLxAjOe8RajLW41uNyjx7mXev5rkIz1YgIRgxiLJU2iDY47/CZRULr+wglCI1gTUjm0EEsS6FDhk97CL+m6LsKLboTOuu6pAHfeJon3wmLfRLqaU0tdde2dXaezHvaPy2tapCbHYXqNKb+MEP/LCgjRTlSmDtN8+BoE0/76GluLRK+8uA54fI/fDOhep9QfkwoLh+oPs2QqxS5yjr0RUr1doo6XpuwrcJQH0Wokxg12ELYC2fWR3ZTuDnLu7J6djHLfwHFjmMYmBTCAAAAAABJRU5ErkJggg==)![Auto layout settings panel in Figma's redesigned UI, showing options for width, height, direction, spacing, and alignment. The panel is set to Hug width, Fill height, and includes options for clipping content and alignment adjustments.](https://cdn.sanity.io/images/599r6htc/regionalized/ec686ab4733a96f7953930c29c96eebc1b333041-1608x1072.png?w=528&h=352&q=75&fit=max&auto=format)

Our final UI3 Auto Layout panel

This push and pull between approachability and power became a recurring theme. How do we make Figma friendlier for newbies, without being too elementary for experienced designers? Very carefully, it turns out. We introduced optional labels to guide new users and aid discoverability, while preserving speed and control for experts.

### [Supporting a suite of Figma tools](#supporting-a-suite-of-figma-tools)

We also saw an opportunity to create more cohesion across the expanding Figma ecosystem. Whether you’re brainstorming in FigJam, refining in Figma Design, or presenting with Figma Slides, we wanted the experience to feel fluid and familiar. Consistent patterns like the slim toolbar and floating collapsible panels create a through line, while still giving each tool the flexibility to shine in its own way. The result is an ecosystem that adapts to your needs, without sacrificing its distinct personality.

## [Evolving to meet the changing nature of design](#evolving-to-meet-the-changing-nature-of-design)

Shipping this redesign was a monumental milestone, but in many ways it feels more like a beginning than an end. We’ve laid a new foundation, and the real magic will happen as you put it to work in your creative process. We know it may take some time to fully settle into the new interface, but we’re excited to take this journey with you.

Design and the tools we use are always evolving. Where once we pushed pixels, we’ll work increasingly at higher levels of abstraction. This redesign reflects that shift, streamlining workflows and reducing friction between imagination and reality. As AI and other technologies emerge, they have tremendous potential to transform our workflows. And as design continues to evolve—from solo to collaborative, from static to interactive, from pixels to patterns—we will be right there with you, adapting and evolving in service of your best work. This redesign is a promise: to stay true to our roots, while embracing the future.

The redesigned Figma is slowly rolling out to users today. We can’t wait to see what you create with it.