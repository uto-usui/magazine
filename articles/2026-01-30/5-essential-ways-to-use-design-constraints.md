---
title: "5 essential ways to use design constraints"
source: "https://www.figma.com/blog/five-essential-ways-to-use-design-constraints/"
publishedDate: "2017-05-25"
category: "design"
feedName: "Figma Blog"
---

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAu0lEQVQoz62S2w6DMAxDW3pFm9D+/2dD3HEkNrSKhz1YDXHiOg0hhGDCsiyWc7YY4wdSSoOLgsffvIDGgXdQSrHW2hBVrFNiypVaLffV2nOz2rpV/+69DyjWhRdBNSOkQsSr51L2/Pqwvr2suKDqJKSaqaAEEOT20SCueOwu01EDJKre6cjcjBM14AieaeAvgpCcamBRPAf5syCLvOWQpTC6YoHnmL7h2T7AIZtnAlxPHf74p+wufxH8F3Y6Tc5XCpXhpQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/e366de4a66cd73fa56802995e7c6eede595ed1c1-2400x1256.png?w=2400&h=1256&q=75&fit=max&auto=format)

Remember the good ‘ol era of tech design, when you had to create interfaces — at most — for a PC and a Mac? Me neither. That universe seems light years away in today’s screen-addicted world.

Designers’ jobs have grown exponentially harder with the introduction of mobile phones and tablets. You’re designing for endless adaptations and contexts, a never-ending [Sisyphean](https://www.merriam-webster.com/dictionary/Sisyphean) task.

We feel your pain at Figma, which is why we built our tool with a powerful constraints feature. It allows you to fix elements of your design to different sides of their parent frame. If you set your constraints correctly, your design will scale to fit any screen size.

You can find them here, in the righthand properties panel when you select a frame:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAACXBIWXMAAAsSAAALEgHS3X78AAACAUlEQVQoz42SzY7SUBTHC74Ck7hxR2PCCyBh4ZM4mcRnwKArcBKGsNEALsjoxMSFCx2KMgv5KBXUjAmTaKGlX8C0sUDLR6CXtsDO0w4zasYYf0lPcpPz6/3fcy+mabokn3OiKAgCzwscx3V+h/sFz/PQJXW7giRBHQ6H2BnXOz79/uoD9eb9CUEUCILI5wm35l8cHT3e348+ehiNRuPx+PPDw5NisVb/VGl8/thoMAyDnXaHr78pL79w7+pfqyRFkmS1CoUsl8upVCocDt9yCQaD8ViMrFToNsMKEscLiiJj8gQxukUPEXuudjj+Kmyr1Uqn04FAwOvix/FEIkHT9Hg8XroYhoEZaLlcrZFlD0YanIUXHERRZFk2m82C7PF4QMZx/CCZhKjT6dS2rNVqBT4G32azhsVoNAKHdwEf+jKZzIUM+P3OzhDH3dm07Ut5vf6XvI3tyActuq3rE7S0LGttGP8n3/B6b+N4citPEbJMc7VYbGNv/irncrlQKOTz+W7u7Ny9E3z29AnLMOPx1DSdUxsLhCGEbNs2TVNVVdCungTIhUIhEons3tu9v7cXiz4oHr/tdFhd1y9GPZvNsPl8DgPUNK3X68GEmUva7Xaz2aRqtVKpBHdep6izZhMaFEWBjKr6w3lhIA8GA1mWQRavAZcn/bns9/vQDL+YTCY/AcPsEml4uO2+AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/29de7b6dd856f764e1057ea1ab59133bd6b7a7ff-1552x921.png?w=1552&h=921&q=75&fit=max&auto=format)

Constraints are amazing, but they take a little getting used to. In Figma, we let you fix objects to the left, right, top, bottom, center, scale, left & right, or top & bottom. You can play around with a simple button in a frame to see how objects react to different types of constraints.

Need help figuring out how to put them into practice? We collected five ways constraints can make your life a lot easier, ranging from beginner level to intermediate.

### [1) Pinning a button in the corner](#_1-pinning-a-button-in-the-corner)

A lot of mobile UIs have action buttons situated in the same place every time. For example, Google’s Material Design Guidelines favor a bottom right hand button (also known as a FAB) that encourages the user to take an action.

With [Constraints](https://help.figma.com/hc/en-us/article/54-constraints), you can set that button to the bottom and right hand corner of its parent frame. That ensures the button doesn’t float around the screen when the screen size expands — it stays exactly where you want it.

### [2) The magic of components + constraints](#_2-the-magic-of-components-constraints)

You can work some fun design magic by using Figma’s components feature in connection with grids. Components (which other applications call symbols) allow you to turn parts of your design into repeating, mirrored instances. When you make changes to the original, the changes are reflected anywhere else you used that component. (You can [read more about components here](https://blog.figma.com/components-in-figma-e7e80fcf6fd2).)

Now, to add constraints to this: Once you’ve constrained the key parts of your design to the sides of the frame, turn the frame into a component. Duplicate the frame for multiple screen sizes. Now, when you change attributes of the original, like color or text size, you can immediately see them reflected in different screen sizes.

### [3) The magic of constraints + grids](#_3-the-magic-of-constraints-grids)

Alright, buckle in because we’re getting a little more advanced. With Figma, you can use constraints to snap objects to a grid. This is particularly handy for something like a navigation bar at the bottom of an app.

To make a flexible nav-bar in Figma, create the frame that serves as the phone screen then nest the nav-bar frame at the bottom of the screen.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsSAAALEgHS3X78AAACQUlEQVQoz12S7WtScRTH7x8S9aJX24rapFVuSxjUVkwbhLoaqWORlo40HGGspmMDsaBsG2tSi0rzoYi2yTaEgkRaFAvU3dz13sQX0fVeH696n8wX/fRuEX04HM6b7++c7+8cSKmQHm470Na6r1vc0tmxv//08cXHs7FYFEGQnT0wDCNJkqZplmU5nv/dpF6vQwqF9OiRg+ITrfILvbIB8ZC8z+Wa2/q2BcNwfHsXoMczBM0wLMcxbAOe52u1GqRWKXu6Rad62pXKc1rdpbExjcMx7fF4/D6f1/tKYHl5BU4kylUatKUZMAHNcaDkoamZSb1Rd3nkomp0WG+8ajBpTZZb5im7yWY3T05PWG1Wq9XpfPRpc7NYLIG2DMNwe0AvA94nPvf8i6UZ533jbfM1k8E2v3gvGLGvf5lbi7zdeB8KhcLhcDKJANv5fL5QKJRKpWITyPHwgWNhYdbtdrhcN613TRMW9+ra55/5ryQbJyq/ckUgyOVyBElmMhkcx4UsAKk1qkG5XGPQ68bHh0ZHrlzXvVtdIfIFimHLVeCvYbFSqZSaUBRV/gdIKZeJ2ltExw5Jers6T3bIBvoCXneOJDmWafhjGuJqE2FVfJNdz3csN1SK/sH+rvNnJdIzEq16OOjzkul0laIEwV8xeOh/8YeN9WDA8+b5U/8SiGdB/+vYx0gmsZPF8Ww2K/wQyARBAOdAD84DbFjIEJpIoTCKxhF0GwSKwhj2HU0hyRT2A5BKpdLpNCii0Si4FmC71kS4sD/DauiVWYxFPgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/1b4296b306e6b31ccd67c5eae3b76307e00953d4-1600x900.png?w=1600&h=900&q=75&fit=max&auto=format)

Set the nav-bar constraints to left & right, and bottom. With that nav-bar frame still selected, choose a layout grid from the right-hand properties panel and set the type to “stretch”.

Then, place an object — like a circular button — inside each grid column. Set the constraints on each button to be centered. When the screen size changes, your buttons will adapt accordingly. For an even deeper dive into grids, [check out this post](https://www.figma.com/blog/grid-systems-for-screen-design/).

### [4) Table cells](#_4-table-cells)

You can use constraints to make reusable table cells designs that are flexible. Designers often need table cells to present lists of people or information, and adding constraints to the basic cell makes it easier to adapt. For example, I grouped text and an avatar together (by pressing control g), and constrained that to the center left of the frame. I then grouped text and a rectangle with rounded corners together into a button and constrained that to the center right of the frame.

As you can see, the component now reacts as you’d hope it would, with each piece of information hugging the side of the frame where it belongs, regardless of frame size.

### [5) Illustrations](#_5-illustrations)

Lastly, we figured we’d throw in a fun constraints example just for kicks. You can put horizontal or vertical constraints on illustrations or drawings to add an extra bit of humor. You can turn a hot dog into a slinky version of itself, or turn a dog that looks like a hot dog into even more of one. We played around with it for one of our designer’s recent birthdays at Figma.

Learn more about the [ins and out of Constraints](https://help.figma.com/hc/en-us/article/54-constraints) in our Help Center.