---
title: "How Figma put the bounce in spring animations"
source: "https://www.figma.com/blog/how-we-built-spring-animations/"
publishedDate: "2022-06-16"
category: "design"
feedName: "Figma Blog"
---

We know how important animation is to bringing digital products to life. Animations can make scrolling from one item to the next in a list easy and intuitive, while liking something with a heart can feel playful and fun. In FigJam, animated [emotes and high-fives](https://help.figma.com/hc/en-us/articles/1500004290981-Stamps-emotes-and-high-fives) are a core part of the magic of being in the file together, and we wanted to help our users build similar experiences. That’s why we recently launched [spring animations](https://www.figma.com/community/file/1100581821937139565), which allow you to design more fluid transition animations when prototyping.

Building spring animations took our engineering team back to the classroom—to make animations that are both natural and accurate, we borrowed principles from physics. We’re excited to share the mechanics behind the movement, and the story of how spring animations bounced their way into Figma.

### [What are spring animations?](#what-are-spring-animations)

Until we launched spring animations, bezier animations were the primary way to create animations in Figma. Bezier animations allow you to specify how an object should start moving, and how it should stop. As flexible as they are, bezier animations can still be a little tricky to work with, and if you’re not careful when adjusting bezier curves, you can quickly end up with chaotic animations where objects gain speed out of thin air, change directions unnaturally, or come to a stop.

Spring animations work a bit differently. Instead of defining how an object moves, you specify what the physical properties of the movement are and let the laws of physics come up with the actual path. (The pixels look like they’re compelled to move by invisible springs, hence “spring” animations.) By starting from the basic properties of mass, stiffness, and damping, you get pleasant curves that make your drawings feel like they have weight, pop-ups that open with the perfect overshoot, and cross-screen transitions that slide oh-so-gently to a stop.

Below is an example of spring animations we use in Figma, created by one of our teammates, [Rhyan Hassan](https://twitter.com/ryhanhassan?lang=en).

Going from bezier to spring animations meant our engineering team needed to create a new set of parameters that define how objects move in Figma. And because spring animations are defined by physics, we needed to brush up on some basic principles.

## [Mass, stiffness, and damping](#mass-stiffness-and-damping)

Just like planetary orbits or the flight of a frisbee, spring animations can be broken down into specific formulas that outline how objects are impacted by external forces. There are three main variables for spring animations: mass, stiffness, and damping. Let’s define all three before we go any further:

-   **Mass:** No matter how big or small, all physical objects have mass. The more mass (m) an object has, the heavier it becomes, and the more force it requires to accelerate. (Those two phenomena are where the “F” and “a” in the equation below come from.) The relationship between force, mass, and acceleration is defined by Newton’s formula: F = m \* a
-   **Stiffness:** Stiffness is a property unique to springs. If you’ve ever pulled on a spring before, you know that the further you pull on it, the harder it resists. Hooke’s law sums this up well, where “k” is a constant that represents how “stiff” the spring is: F = -k \* x
-   **Damping:** Physical objects eventually come to a stop due to friction. Like wind on the highway or skidding on a carpeted floor with socks, the faster something is moving (“v” in the equation below, shorthand for “velocity”), the more resistance it encounters. (Think force, but applied in the opposite direction). To determine how quickly an object comes to a stop, we use the constant b: F = -b \* v

![Four line graphs that show different types of animations: gentle, quick, bouncy, and slow](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAo0lEQVQokX2Q4Q6EIAyDef+XFSUiKIj5lpTsLuf9aGBdVzrCuq4j5zyO43gF/X3f/+pyzgOvgLCUMmqthvM87RRHDaiB+pzXdX3o8ZqGEgCZc2+tzUFA7bnqzEkaYox2gei9zwaPeEMlpn7TlVJGWJbF9vfDvwzhfGpSifOPzpW1tpr6F5/cc99rT0OJtm2zpAzf922ilJL1qOFJhE6cdMzJ+AHzYSPkUpt25AAAAABJRU5ErkJggg==)![Four line graphs that show different types of animations: gentle, quick, bouncy, and slow](https://cdn.sanity.io/images/599r6htc/regionalized/8bf4cea5feab0c26690db2f2796b2be95f89191e-3840x1360.png?rect=2,0,3837,1360&w=804&h=285&q=75&fit=max&auto=format)

Stiffness, damping, and mass impact how a spring animation behaves

## [Going from classroom to code](#going-from-classroom-to-code)

So we have our variables and formulas—but what good does that do developers? Thankfully, the calculations defining spring animations are settled science, and that stability helps us go from an abstract piece of physics calculations to clean code.

For our use-case, we used the [WebKit SpringSolver](https://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/SpringSolver.h) to ease our development journey. The formula lets us plug in mass, stiffness, and damping into a spring timing function, and we get a value for x.

Still, this equation itself didn’t get us where we wanted to be. It turns out that tweaking mass, stiffness, and damping by hand can be pretty tricky. While these parameters represent physical constants, we as UI designers working with animations don’t necessarily think in terms of pure physics. We want animations to be _faster_ or _slower_, to be _more bouncy_, or to have _less overshoot_—all terms that would make a physics professor break down in tears.

![Three lines graphs: Decrease Stiffness; Increase Damping; Increase Mass](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAwUlEQVQokZWRSxbEIAgEc//b5mtU0HmF4ujsZkHUBoqObud51hBCfd/376Av9F5WWBubnPMSIlJVxVY/z6GqpscYLdinlAy6QXfBI2dvkn7+QtFVywJMvQaWAX8TzZnWGNvUFaojt5rIDej3AHB2IFJMc+DqTqzZf1e6+wF8nmdAKWiNaiBys/s2rDXPPQPIhyZe6DiOel2XFfnF3/dtOYI6d0qN59AZiGZAf/J93w2KVkpzQjEaOYYxhJwPI8fqwA/sLXKPeWiDrAAAAABJRU5ErkJggg==)![Three lines graphs: Decrease Stiffness; Increase Damping; Increase Mass](https://cdn.sanity.io/images/599r6htc/regionalized/2ec180f07701c209a80dac798e0c07a06abf9623-3840x1580.png?rect=1,0,3838,1580&w=804&h=331&q=75&fit=max&auto=format)

That gap can be described with a simple question: How do we slow down an animation? A physicist would tell us that we can increase mass to do that, but how about stiffness and damping? Do they affect the animation too? The answer is yes, which means that we need to make decisions about which of the parameters to edit and how much to adjust them by. It’s a difficult triangulation, but in order to give designers the most natural way of tweaking their animations, we needed to create a specialized tool that puts all three variables in one place. How we did that was another question completely. It turns out the answer was staring us right in the face.

### [Getting a handle on spring animations](#getting-a-handle-on-spring-animations)

If you’ve ever used Figma to create bezier animations, you’ll know that there are two handles to adjust the curve. It gives designers a degree of control over what they’re animating without having to manually adjust any inputs. [Nikolas Klein](https://twitter.com/nikolasklein?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor), our Product Designer, realized that, while adjusting each of the variables in spring animations by hand could give you something approaching the realization we wanted, it didn’t make much sense for designers to have to fumble around in physics equations. We wanted to give users the same degree of control over spring animations as they had over bezier animations, so we created a UI to do just that—handles and all.

We knew we wanted handles to play a central role in the spring animation UI, and the idea permeated into our designs and jam sessions. Figma has always focused on “direct manipulation” when it comes to making adjustments; we’d rather make it easy to change visual features intuitively than have to tweak a bunch of numbers. As Nikolas iterated on different variations on the Information Architecture (IA), a small dot that sat on the spring curve was one of the few things that remained constant. That was our handle, yearning to be included in the final design.

Still, we had questions that circled around our three variables of mass, stiffness, and damping. How does moving the handle affect the mathematical formula in the spring curve, and vice versa? How many constraints are in play? Do we need one handle, two, or even three? Do they move horizontally, vertically, or both? Does it have to stick to the curve, or is that even possible?

We started off by building a single horizontal handle because of the predictability of a given spring’s oscillation period. (The period is based on the ratio between mass and stiffness.) The vertical position was trickier. We tried a version where we ran a numerical optimization to have the spring curve match the handle position, but it quickly gave way to instability. After more experimenting, we realized that this position could be related to the ratio between damping and mass, something called the “damping ratio.” Put simply, the more damping a spring has relative to its mass, the lower the handle should be.

Through prototyping, we got the validation we needed for the vertical handle. In addition to being technically feasible, it also felt really good as a team to find that solution. By boiling down the number of variables from three (mass, stiffness, and damping) to two (horizontal and vertical dragging) we created a simple and intuitive spatial model for animators and designers to interact with the curve in a hands-on way. It just so happens that now the vertical position of the handle controls overshoot, and the horizontal position controls the relative speed of the animation.

So we had created good control for speed and overshoot, but what about how _long_ an animation should stay, well, animated? At this point in the tool’s design, users could visually see what a spring animation would be like, but they didn’t know how long these animations would last. For a spring animation like the example below, a designer doesn’t know whether it lasted for two seconds or seven seconds, which is a huge range when making prototypes. We decided to add a way to see and update duration for a spring animation.

In order to give users more control, we included a duration handle to signal where an animation will officially stop. That may seem trivial, but since we’re using physics principles to power spring animations, an animation’s “bounce” can sometimes last way too long.

And one more thing: We know that animators don’t work alone, so we also wanted to make sure that spring animations were intuitive for entire design teams, including developers. Thankfully, spring animations are supported by multiple APIs, including Framer motion and react-spring. In fact, we drew quite a bit of inspiration from the react-spring visualizer when we were initially building this in Figma.

In Figma, we made it possible for you to export spring values from the inspect panel and use those values however your developers see fit. For those of you handing off spring animations to your team, we want to note that the terms _mass_, _damping_, and _stiffness_ are used in Framer motion and _mass_, _friction_, and _tension_ are used in react-spring.

All of these details are focused on one thing: Giving designers and their teams the most intuitive experience, so they can create intuitive experiences for their users.

Try out spring animations in [this playground file](https://www.figma.com/community/file/1100581821937139565). If this type of work interests you, [check out our open roles](https://www.figma.com/careers/#job-openings)—we're hiring across product, design, engineering, and beyond.