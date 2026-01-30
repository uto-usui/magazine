---
title: "Desperately seeking squircles"
source: "https://www.figma.com/blog/desperately-seeking-squircles/"
publishedDate: "2018-04-03"
category: "design"
feedName: "Figma Blog"
---

My story begins long before I started at Figma, on June 10th, 2013, the day Apple released iOS 7. There was something subtle about the update: the home screen’s app chiclets had a juicier, more organic feel. They’d gone from squares with rounded corners, to _squircles_ (a portmanteau of ‘square’ and ‘circle’).

What is the difference, you ask? To be fair, it’s slight — A squircle begins as the old rounded square, but with some sandpaper applied to the part where the rounding begins on each side of each corner so the transition from straight to curved is less abrupt.

Articulating this using mathematical language is precise: The curvature of a squircle’s perimeter is continuous, whereas a rounded square’s is not. This may seem trivial, a cool story, but subconsciously it really makes a big impact: a squircle doesn’t look like a square with surgery performed on it; it registers as an entity in its own right, like the shape of a smooth pebble in a riverbed, a unified and elemental whole.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsSAAALEgHS3X78AAAByklEQVQoz31Ty27UMBSdj4RKlFJVYgN/AhK0FSAeG/6ABWLBghVigdR2pi0bqCYdYOgwaV6NncfEjn1P79WUJgjaSEfHN4mPj4+vB9YTUuNxUjv8Yswqi7i2KK2D429EYNB1oB7TQMQ+RAYvfyzwbFLjxXGJ15MCb2c1vqgWynp4Ub36oR7TQJyJ2N2DAmtDjfWhwsZI4f6hxsNxhY+JRc6iZAx8WcI1DVzbou1AzvFunFs6nLLgU3YmYjd2FW7uCmtmhTsjjQfjGgeZweJkhsVoBBUESOMYcZIgZo6iiBIeK6V4TUMDyU22KpNFZGVPM5Ys9b3DAm+mJZLJTyx2dnB2dIQoDBF2IOEsy6hpmk5wrSfYZ4ngVaAxywr4PEdbVbDWXkJcMWRM3vurHOpLwdvsdntc4Ku2iAxBc55GhDhLEZLs/jqUfzPsIPUqCz7iw/mUGHzOLIK85vxSzOdzyQ9VVYmzrm3E4fPvNTb2NW6xq9VhB6nX2fnWcY29sxbfiha/S4NcKaRpipwjkNxo2VZLwYT78P2pwRN2+TioscmTNy9Y6m3md6FB2HjIJWgZjh1Jq/ScdYJ/boo4nf4H8l4Wlf+ua+wLVToHMc4jvxLTimsAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9a94289dee2f26a699f56f8f412b7e9370ab21d7-815x450.png?rect=1,0,814,450&w=528&h=292&q=75&fit=max&auto=format)

1.1 — Rounded squares vs squircles: it’s the little things, apparently!

For a long time, industrial designers making physical objects have known how important curvature is to an object’s perception. Try taking a careful look at the corners of a Macbook, or at an old-school, wired earbud case under a desk lamp. Notice how difficult it is to find an orientation where the corners have harshly contrasting highlights.

This is the result of curvature continuity, and it’s very deliberately included in the design. It’s no surprise that Apple, with fingers uniquely in both the hard and software pies, eventually cross-pollinated their interface designs with industrial ideas by making their icons look like the physical things they produce.

## [From form to formula](#from-form-to-formula)

Of course, at Figma we love iOS designers, and we feel our users should have the platform elements they need right at their fingertips. In order to give them access to this new shape while designing, we need to find a precise mathematical description so we can start figuring out how to build it into our tool.

Luckily, people have been asking this question for as long as iOS 7 has existed, and we are certainly not the first to walk this part of the journey! [Fundamental initial work](https://www.cocoanetics.com/2013/06/ios-7-icon-squircle/) by Marc Edwards included a screenshot that indicated the icon shape was a particular generalization of an ellipse, called a superellipse. The following mathematical formula can describe circles, ellipses, and superellipses depending on how a, b, and n are chosen:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnUlEQVQYlV2Q1woCQRAE64xnwpwVM/rg/3+f1NkPxw0suzDVvT0DcAIuwB04AgdgD5T8qwDGYb7AIxrZKdCqcW1itAXWwC5vDXpAP2dR+/Qcs3l6JTDI0YNXBLMk01AzwWVSbGKokZ96T4BO+nLqZaoRFGgkuArYTdJhBMK3JHQto4xrStMZwGAV9AQ+wLWxF8u3aey5w3dSOkWzih/hPwcUOyWJlQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/15c7b8152d7340fa314522c04d638ac90e734552-164x41.png?w=528&h=132&q=75&fit=max&auto=format)

2.1 — Superellipse formula

If you choose, say, n = 2, a = 5 and b = 3, you get a normal ellipse with a major axis of 5 oriented along x and a minor axis of 4 oriented along y. Keeping n = 2 and choosing a = b = 1 describes a perfect unit circle. However, if you choose a value for n that is bigger than two, the result is a superellipse — the rounded elliptical shape starts blending into the shape of its bounding rectangle, with the corners becoming perfectly sharp in the limit that n goes to infinity. Early suggestions tried describing Apple’s shape with n = 5. If you [try it out](https://www.wolframalpha.com/input/?i=ParametricPlot%5B%7BSign%5BCos%5Bt%5D%5D+*+Abs%5BCos%5Bt%5D%5D+%5E+%282/5%29%2C+Sign%5BSin%5Bt%5D%5D+*+Abs%5BSin%5Bt%5D%5D+%5E+%282/5%29%7D%2C+%7Bt%2C+0%2C+2+*+Pi%7D%5D), you’ll see it does look really close to what you’d find on a device running iOS 7+.

If this were the true description, we could just fit some reasonable number of Bézier segments to this shape and then do the delicate work of figuring out how to integrate this new concept into Figma. Unfortunately, though, [careful follow-up efforts](https://applypixels.com/the-hunt-for-the-squircle/) showed that the superellipse formula wasn’t quite right (however, these days true superellipses _are_ used as icons in other contexts). In fact, for all choices of n in the equation above, there is a small but systematic discrepancy when compared with the real icon shape.

This is the first blind alley in the story: We have an elegantly simple equation for something that looks a lot like an iOS squircle, but it’s fundamentally incorrect. And we really do owe our users the real thing.

Making headway requires some serious effort, and again I’m glad to harvest what others have sown. One investigator, Mike Swanson of Juicy Bits, made a hypothesis which builds up the squircles’ corners using a sequence of Bézier curves, [which he refined using a genetic algorithm](https://blog.mikeswanson.com/post/62341902567/unleashing-genetic-algorithms-on-the-ios-7-icon) to optimize similarity with the official Apple shape. The results he obtained turned out to be right on, as proven with Manfred Schwind’s [excellent direct approach](https://www.mani.de/backstage/?p=483), which looks right at the iOS code which generates the icons. So we’ve got two different approaches yielding the same Bézier structure: iOS 7 Squircles were cracked and double checked by others, and we didn’t even have to calculate anything!

## [A spanner in the works](#a-spanner-in-the-works)

Two important details remain, preventing us from cloning the shape directly into Figma and moving on:

First, there is the surprising fact that the iOS version of the formula (at least at the time of investigation) was found to have some quirks — the corners aren’t exactly symmetrical, and one side has a minuscule straight segment which clearly doesn’t belong. We don’t want that because it complicates both code and tests, but removing the extra segment is easily handled by just mirroring the bug-free half of the corner.

Second, when flattening the aspect ratio of the real iOS rectangle shape, it abruptly changes from the squircle we’re focusing on to a totally different sort shape. This would be unpleasant for a designer, and takes a strong point of view about what shapes ‘should’ be used under certain circumstances.

The most natural and useful behavior when flattening a squircle is for the smoothing to gradually disappear until there’s no room left to “sand” the transition between the round and the straight parts of the corner. Flattening even further should reduce the rounded section’s corner radius, which is in line with how Figma behaves today. The Apple squircle formula is of little help to us here, because its smoothing is done in a fixed way: it gives no indication for how to get nearer to or further from the old rounded rectangle. What we really need is a _parametrizable_ smoothing scheme, where some particular value of the parameter corresponds very closely to the Apple shape.

As an added bonus, if we can parametrize the smoothing process that transforms a rounded square into a squircle, we can likely apply the same process to other places where corner rounding happens in Figma: stars, polygons, and even corners in arbitrary vector networks drawn with the pen tool. Despite the complication, this is beginning to look like a much more complete and valuable feature than simply adding support for iOS 7 squircles would have been. We are now giving designers an infinite variety of new shapes to use in many situations, and one of them happens to correspond to the squircle icon shape that got us started in the first place.

Requiring that our squircle smoothing scheme be continuously adjustable yet conform to the iOS 7 shape at some comfortable point its adjustible range is the first emergent constraint in our story, and it’s a difficult one to satisfy. An analogous task would be for a dancer to take a single still image of a ballerina in mid-flight, then design a leap in such a way that a movie of her executing it reproduces the image exactly at a precise point in time. Which sounds freaking hard. So maybe some calculation will be necessary after all?

## [Power tools: Differential geometry of plane curves](#power-tools-differential-geometry-of-plane-curves)

Before diving into parameterizing squircles, let’s take a step back and dust off some formal tools that will help us analyze what’s going on. First of all, we need to settle on _how_ we’ll describe a squircle. When discussing superellipses before, we used an equation involving x and y, where all the points (x, y) in the plane which satisfy the equation implicitly trace out the superellipse. This is elegant when the equation is simple, but real squircles are a patchwork of Bézier curves spliced together, which leads to unmanageably messy implicit equations.

We can deal with this complication by using a more explicit approach: take a single variable t, restrict it to a finite interval, and map each value which t can take on that interval to a distinct point on the squircle perimeter (Bézier curves themselves are almost always represented this way, in fact). If we concentrate on just one of the corners, thereby restricting our analysis to a curved line with a clear beginning and end, we can choose the mapping between t and the corner such that t = 0 corresponds to the beginning of the line, t = 1 corresponds to the end of the line, and smoothly sliding t between 0 to 1 smoothly traces out the round part of the corner. In mathematical language, we will describe our corner by the path r(t), which is structured as

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAACXBIWXMAAAsSAAALEgHS3X78AAAANElEQVQI1y3KOQoAIBTFwNcJ2oiouJfe/4hG+MUUgUjSxUFGRLVuSChYGNYeDsH6fxsT/QFHHwG7vW2GDgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/85024a496d4e1ebf10397c94a2a338c56ad343df-317x23.png?w=528&h=38&q=75&fit=max&auto=format)

4.1 — Plane curve bijection with \[0,1\]

where x(t) and y(t) are separate functions of t for the x and y components of r. We can think of r(t) as a kind of path history, say for a trip you’d take in your car. At every time t between when you begin and when you arrive, you can evaluate r(t) to get your car’s position along your route. From the path r(t) we can differentiate to get the velocity v(t) and acceleration a(t):

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAYAAABYBvyLAAAACXBIWXMAAAsSAAALEgHS3X78AAAASklEQVQI103Muw6AMAxDUS9AeVNRWgb+/zu5kTx0OJKjOJGkFQkDRsyeJ1y4uzm5ExaLvKHhhT482HE6l+5Z9kHk6s7hTvU+O7cflx0CR0Ch8ZEAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/b546fbf1cbeff346148d88d88c84a04fd88f40e2-366x49.png?rect=1,0,364,49&w=528&h=71&q=75&fit=max&auto=format)

4.2 — Plane curve velocity and acceleration

Finally, the mathematical curvature, which plays a starring role in our story, can in turn be expressed in terms of the velocity and acceleration:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAAo0lEQVQY033QiQ6CMBBF0SLihuCKVdnF9f9/0DfkmhATJTmhy8x0Wud+f6Ec5CkvuTBPZSkbadi/Si4rS5wTkDKOMBUvD5Ia5jvspaRYJ4WsHYG1VJJxim0ksuXkkgQbn+TIv0LOWl+wYNNzjQWsw5nEdH+mm5u0PEFHoYQ4y+uvN8FYgsE7fsYR72cF7xRr6SwmLvjK/fuFdJlR2NOZrY2GgW9tPwfv+0g1ygAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/c5903456f494d89dd484a321a86a8cf0b142120d-184x52.png?w=528&h=149&q=75&fit=max&auto=format)

4.3 — Unsigned curvature of plane curves

But what does this formula really mean? Though it may look a bit complicated, curvature has a straightforward geometric construction, originally due to Cauchy:

1.  The center of curvature C at any point P along the curve lies at the intersection of the line normal to the curve at P and another normal line taken infinitesimally close to P. (As a side note, the circle centered at C as constructed above is called the _osculating circle_ at P, from the Latin verb _osculare_, meaning ‘to kiss’. 😙 Isn’t that great?)
2.  The radius of curvature R is the distance between C and P.
3.  The curvature κ is the inverse of R.

As constructed above, the curvature κ is nonnegative and doesn’t distinguish between rightward and leftward turns. Since we do care about this, we form the signed curvature k from κ by assigning a positive sign if the path is turning right, and a negative sign if the path is turning left. This concept too has an analogue in the car picture: at any point t, the signed curvature k(t) is just the angle through which the steering wheel has been turned at time t, with plus signs used for turns to the right and minus signs for turns to the left.

## [Geometry is king: Arc length parametrization](#geometry-is-king-arc-length-parametrization)

With curvature introduced, we have a last couple wrinkles to iron out. First, consider for a moment two cars driving along a squircle corner shaped route; one car keeps speeding up and then braking the entire way (🤢), while the other car smoothly speeds up then coasts down to a halt at the end. These two different ways of driving will yield very different path histories even though the exact same route was taken. We only care about the shape of the corner, not how any one driver negotiated it — so how can we separate the two? The key is to use not time to label the points in the history, but rather the cumulative distance traveled, or arc length. So instead of answering questions like ‘where was the car ten minutes into its trip?’, we’d rather answer ‘where was the car ten _miles_ into its trip?’. This way of describing paths, the arc length parameterization, captures their geometry alone.

If we have some path history r(t) in hand, we can always extract the arc length s as a function of t from the path by integrating its speed, as follows:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAAlElEQVQY042Q7QrCMAxFo05XOz/YJtqN4cfAX77/+3kDp9Bf08CBpum9SWO2HFtxE6MI9mdsxE7UGKzFChoxiR7DBvL7vYjcRfSWmMBpC1GN0V2cOM9iEGd0D+ojeeeGL/EsJnHxkY4JgedXDHvyAcOJtSTe2AHyVBVrCJjNNAk0qfha/m4sanFpt158i4+4sNOf8QUYjAWsuMRGTwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/40ae31e45ffbe7f6b24d46323c1761af4f20ce6a-183x53.png?w=528&h=153&q=75&fit=max&auto=format)

5.1 — Arc length integral

If we can invert this relationship to find t(s), then we can substitute this for t in our path history r(t) to get the desired arc length parameterization r(s). The arc length parameterization of a path is equivalent to a path history made by a car driving at unit speed, so unsurprisingly the velocity v(s) is always a unit vector, and the acceleration a(s) is always perpendicular to the velocity. Consequently, the arc length parameterized version of curvature simplifies to just the magnitude of acceleration,

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAAAgklEQVQY013QXQuCQBCF4SEjA/Nj00VSKjUQJAT//6/zDLwX4sXDDuzxLKOZWS5BopTMjdzlIlfOVFqZZJGRbCW9dFKIrTIT+HK+uQyEa3lwv8G/GXjgx/z0wv+pcKCk4PWOoBd+DvmJ7AifX16YsWqkoKIgZdWE83ZYseS3BOYWzQ6iyQc1PWY7XgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/ff5c23a24b982bee2bc47b1c6cbc0cddca717645-122x23.png?rect=1,0,121,23&w=528&h=100&q=75&fit=max&auto=format)

5.2 — Curvature in the arc-length parametrization

and we can tack on the appropriate right or left handed sign to form the signed curvature k(s). Most of the complication in the more general curvature definition was evidently there just to cancel out the non-geometric content in the path history. Curvature is, after all, a purely geometric quantity, so it’s really pleasing to see it look simple in the geometric parameterization.

## [Design the curvature, compute the curve](#design-the-curvature-compute-the-curve)

Now for the other wrinkle: we’ve just seen how to go from a path-history description of a curve r(t) to its arc length parameterization r(s), and how to extract the signed curvature k(s) from it. But can we do the reverse? Can we design a curvature profile and from it derive the parent curve? Let’s consider the car analogy again — suppose that as we were driving at constant unit speed along a route, we recorded the position of the steering wheel continuously throughout the journey. If we took that steering data and gave it later to another driver, they’d be able to reconstruct the route perfectly, so long as they played back the steering wheel positions properly and drove exactly the same speed. So we see intuitively that we have enough information to reconstruct the parent curve, but how does the computation look mathematically? It’s a little bit hairy, but it’s still possible, thanks to Euler, using the arc length parameterization — if we choose a coordinate system such that the curve starts at the origin and has its initial heading directed along the x axis, then x(s) and y(s) can be reconstructed from k(s) as follows:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsSAAALEgHS3X78AAAAvUlEQVQoz12S2xKDMAhEsfVSE6OmOq3T///QwszBQR9WYCEENoqIPECDHRWTolc84TrFrKjYAa6lxuJCThaCEawcND4D8z+KL3k/7Na4TbELxESzTGLFNy7R8FD8qE/k3RaGsLOXlTuSKXDOVybIrNkEtPA22KlTg++3dvCu0RIm72ly19Byp9C+Xg1cxu7otxPPXOA6Lqz7Fj4lvO4WHmQMDQ+alvBYOaxavWFcuQ/Txl9poNgue930ixqmP2WDBqnmyF6yAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/5a766e50995a65ac0d3830ba14cb16bc63bbe08e-340x133.png?rect=1,0,339,133&w=528&h=207&q=75&fit=max&auto=format)

6.1 — Recovering a curve from its curvature

Last, note the argument of the sine and cosine functions above: it is the integral of the signed curvature. Normally, the arguments supplied to trigonometric functions are angles measured in radians, and that turns out to be true in this case as well: the integral from a to b of the signed curvature is the heading at b minus the heading at a. Thus, if we start with a square and sand off the corner in whatever crazy way we want, then measure the curvature over the part we sanded and integrate up the result, we’ll always get π/2.

## [Squircles under the scalpel](#squircles-under-the-scalpel)

Now that we are wrinkle-free, let’s see what happens when we apply these analytical tools to some real shapes. We’ll start with a corner of a rounded rectangle which has a corner radius of one, plotting first the corner itself and then the curvature as a function of arc length:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABE0lEQVQoz22SiXKEMAhA9/+/VCdem5tc9sXUjtsWkUGSFxDyOs+ztSYiWuvllnVdjTHpEmsMn4tSq1LbsuzbZq0tpQC+ePG894Zdt7BMJISAddaa99scB2pRrQnmnEl5w8GHGPItRLAxRsgYAl5BU8LiJ5FvuNecxHmHbQ+BJzPVSIwtpcbuWrE1pYwOuNYKqa2OKf6CKf44DjIDV7ABk/YJjx8OEvryX/jK/D/MS0upMErMJZdaautHsLWXba084VI+yh4N43imJVn6Skm59yvRwg6HwPKAu6VnPw0DxqPZ3vWH+rXRDvHd9Jk5F9FrcoxOnOO4j8zAXJJ93+d5nqYJZxzBfiyTJ6KU6jfEGILjknwBuFRFwfx2NfMAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/bd286252265b39d0d153cfb38ddc521fce25f312-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

7.1 — Rounded rectangle curvature analysis

We repeat this process now for the real Apple squircle corners to look at their curvatures, which is very different and very enlightening:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABH0lEQVQoz12SiZKDIAxA+/8/2tYZFQQC4XKflF2nm4FMhLxc+DjPs9aqqiJijFmHWGtTSnlIjJHPfdv2dd33/TgOnFtrgA82Hj74MMQ55/1lA4MREX1dWBuMQUsIwKWU3vsFa1bnHU4c1SFlCCcEIkpRrSF8VuEz5wmzuT7cgaaYPgSDEKSlEOU8pR5CjxHdRo4J40RaY01M8YLbRSJc0x7dThgyZ/R/mNqAJQl2+5UvWLXjTehSsO+y8aNgkgPnmmub/F022chZ6+wH8m9gbKbNOCk75aRFC/O6RpYlincuiQAQbPYDPGb2BfNaLCbHcsF5oRtYJ0Go/PNyaB3rfqpPheNP2N+v9/P1XLeVKUCGGdXz/yzLsm0bNlFAAH8A28xFSTB4LZ4AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9c752a0776ff880640e44cc643ccaba8fc0b7e6e-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

7.2 — iOS 7 squircle curvature analysis

The curvature looks quite jagged, but this is not necessarily bad. As we’ll see later, there’s a tradeoff between having a smooth curvature plot and having a small number of Bézier curves, and the iOS corner only uses three. Generally, designers would rather deal with fewer Bézier curves at the expense of having a mathematically perfect curvature profile. These details aside, we can kind of squint at the plot on the right and see a general picture emerge: the curvature ramps up, flattens in the middle, and then ramps back down.

## [Breakthrough: Smoothing parameterized](#breakthrough-smoothing-parameterized)

Bingo! In that last observation lies the key to how we can parameterize the smoothing of our squircle corner. At zero smoothing, we want a curvature profile like the rounded rectangle: tabletop shaped. As smoothing slowly increases, we want the height of the tabletop to stay fixed while its cliff edges start turning into steep slopes, yielding an isosceles trapezoidal curvature profile (still with a total area of π/2, of course). As smoothing approaches its maximum, we want the flat part of the trapezoid to disappear, leaving us with a broad isosceles triangular profile whose peak height is that of the original tabletop.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsSAAALEgHS3X78AAABlElEQVQoz12Si3bjIAxE8/8/me2etGsMGCSBAD872E2b7iQOwXAZGHQ7jmPf93Vdl1PzPOecvfPjaJ2zznuHxtoQQq11fQoIwBsaMKWUnItq0ZyFeQJsHb7GWu8nkCICeD7VWgMCEPCBfkrKUkRSZkksFGgK5AJ9DKOxPqvOy7Jt22ULGAi63RmdlLKIAtbOJyLhpEnrYNzjMZCkddv2U2Cu03UYD/bc/RgbPm2JiVPB8ssag3y8m9F6rW07+V8wbJklRqEoHIlCDMS5lrVvcs+5ejvZ0UUSLPY/XEshIIHDRN5NiEeyLus17yh15ijBh2mi8/36C8a/nDUEMoMb/o0hEtLYn2ptRRYcmSI+kksFf2X+E5hz09+392GwWuozmhOet5RKQoo9FEFypWf9TBt3ja4x9u3PI0S+CuBb87KpNs1aUAXnPYqW0i+8/Th7H+x1n+eq36q1YW6HwSgqKKdcMK21+uUMNxwbA6VLUUm9UUWQ3ntm1q+hS1W7R8/l9lrbr7+YZYy53+/gr3pcXkZhC/AT6Fnu5RUEvqQAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2648862f95a51661e06d454f7d1ff833640e7321-800x500.png?rect=1,0,799,500&w=804&h=503&q=75&fit=max&auto=format)

8.1 — Curvature profiles for various values of the smoothing parameter

Let’s try to express this sketch of a curvature profile in mathematical terms, using ξ as a smoothing parameter which varies between zero and one. Foreseeing use with other shapes whose corners aren’t right angles, we also introduce the angle θ which is the turning angle of the corner — π/2 in the case of squares. Putting both together, we can define a piecewise function in three parts, one for the ramp up, one for the flat top, and one for the ramp down:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAAAnklEQVQoz22R7Q7CIAxFuwmyMcbUxB8mvv9zWsypqYwmJ4Tu9mMXEZFDKcqirNx3Jcg5opKhaatyp/YXBcFCoyeiOGgY0Bkb9X9aa5YQVO7ToOGFzRpXWKmdTbS7X9g4ZxlHRF/R2ZaZYd+wDzYtUzh3TOT7DRNnMN+9hxn/ji7nBxa2SmB+tvxN3CtnEm/l5awozqdMvrhN7dVbn8cHQF8EVKrwBFUAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5148bb7fae2513484ea54b443fbbba575025b19f-478x166.png?w=804&h=279&q=75&fit=max&auto=format)

8.2 — Squircle curvature profile parameterization

Notice that the first and third pieces (the ramps) disappear as ξ tends to zero, and that the middle piece (the flat top) disappears as ξ tends to one. We showed above how we can go from a curvature profile to a parent curve, so let’s try it out on the first equation above, which describes a line whose curvature starts at zero and steadily increases as we walk along it. We’ll do the easy interior integral first:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAAZElEQVQI103OWwqAMAxE0Yj4tr4Fi4I/6v6X6ASu4MehzTQNMTNbpJdKCuTIpJGB07OSu78lklIHMosyMrT7aaUmnzkDC0Tqkt5Ndt7sJPy2q37b+oeJgTUDvf8i875VbnnkeAFXVQN0NaOLwgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/3651da82d8c73937c6cf5f4cab6f7abe65e824d2-369x54.png?w=528&h=77&q=75&fit=max&auto=format)

8.3 — First integral of 6.1 as applied to equations 8.2

Great, so far so good! We can keep chugging along to form the next couple of integrals:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8ElEQVQoz32SjQ6CMAyEkaAIjB+ZqCgaNL7/M9qSr0lDiCSXlXa9XtslyfaXC2rOnfOrXQgad6cTVPjKhJ+Ki3ugwRMJQXCEQO0zMbV7R6i+qIQDlzoqVPgivgix4iKYBKPgLpgFL+wb/oWkREWG0gEyU6aqDxSLJCrZV/ARPAVXU7j+MtrR5HQVsxmeQM/ZguMWoSUFlO3cYlIK1SQHN/+GLhYj0La11rml1MQCKiKxxtkte1i2PNG/LcWG37vNtcx1dJiY4+wWVSfu/eTMryS5XS3FWtQCD4jenA9EFP+WUqwetc23or0eMTZTFZD9ACi8CfizrtbMAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/ca22b250899f89e3d428a5b3260b12818ce5b09e-275x133.png?w=528&h=255&q=75&fit=max&auto=format)

8.4 — Second integral of 6.1 as applied to equations 8.2 (Fresnel integral)

Alas, here we hit a bump, as these integrals aren’t quite as easy. If you have heard about the connection between trigonometric functions and exponentials, you might guess that these integrals are related to the error function, which can’t be expressed in terms of elementary functions. The same is true of these integrals. So what do we do? It is beyond the scope of this post to justify (see [this math exchange post](https://math.stackexchange.com/questions/83721/when-can-a-sum-and-integral-be-interchanged) for a clue as to how you would), but in this case we can substitute in the Taylor expansions for sine and cosine, then swap the sum and the integral to obtain:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAIAAADKYVtkAAAACXBIWXMAAAsSAAALEgHS3X78AAAArElEQVQY0zWPWQ6EIBBEuf8pJRkBGRVwQVHUeWkz9UEqXUs3KoSwLMs8z977j6BtW3jf9845eNd14zhiG4bBWts0jdYa9TgOVUo5zxO2rmtKCcfrnqYpxgjhpZoFTMhQZ4zBWWtVOeciQCP5FRBAZhsvMXrfMF3kUfd9v65LIWcBIwTWcpv/A3cSQJjzKYZ0kbzvW3FwFUC2baMC01tPBh+9rGViBLSwluTzPD+9nRlHDKil7QAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/5bcb11fe2446aa9f954b5fe5cf5a7b5032f4e9c7-519x142.png?w=528&h=144&q=75&fit=max&auto=format)

8.5 — Fresnel integral series expansions

This looks nigh-impenetrable in its series form, so let’s take a step further and explicitly write out the first few terms in each series with all simplifying multiplication performed. This delivers the following few terms for the x and y parts of the shape:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAIAAABM9SnKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAv0lEQVQY002QRxKEIBREuf8dZWEaMSsGjPiGX2NNL6y2oYOqdV2dc/u+H8dxnidPlGEYxnF89X8Rwut1Xfd9q67rrLXLsrgAeF3XnwCIDWiapizLoigQIUQQSpMiads2icfcti03sizL8xzzNE0Uig0lTVMIZilXdL5mOCX4OcY2zzMKZtbJZtnITTZ771VVVahIMph4YwxOFvV9z6kJIJQL1LBWnF+z/ANAYZIkWus4jqWZkVEU6QA+5F3rf3gAhWpUw+KBqLMAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/b3ba2f343cb6d830af34c1c830ae6aa2a25f759f-396x119.png?rect=1,0,395,119&w=528&h=159&q=75&fit=max&auto=format)

8.6 — Explicit low-order (n < 3) parts of 8.3

## [Apotheosis clothoid](#apotheosis-clothoid)

This is a concrete result! We can actually plot this pair of equations (given some reasonable choices for ξ, θ and R) to get a path as a function of s. If we had access to arbitrarily many terms and could compute the sums, we’d see that as s increases, the curve begins to spiral in on itself, though this happens far from the domain we’re interested in, which is the flatter ramp-up section.

Echoing a sentiment from an earlier point in the post, we’re not the first to tread here, either. Owing to its linear curvature, which is very useful, many have stumbled on this curve in the past — it is known as an Euler spiral, cornu, or a clothoid, and it finds a lot of use in designing tracks for vehicles, including roads and roller-coasters.

Using the just the n < 10 part of the expansion as given in 8.5, we finally have all the pieces necessary to make our first artifact. The expansion represents the sloping (first) part of equation 8.2 — it’s easy to adapt it to the falling (third) part, and we’ll bridge these sloping portions with a circular arc for the flat (second) part. This method delivers a mathematically perfect squircle corner that exactly follows the curvature design we first introduced in equations 8.2. Here is the curvature analysis performed for a clothoid squircle corner with ξ = 0.4:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABEElEQVQoz02SCQ6EIAxF5/43deIallI254EMsamkoq/9fP3c911KUVVr7b7v67qyHsfhnEs9KLjftm3veZ6niOScAT9cVBLEeWedfQIg9PDeU1tj7HU9ySvs07TWOmAvPmhIOeVXMIE2QSSFkElVMqnGGAfMxQ1jQwyllvoPzsJYY4yKlBhrzmyxlk4OuI31HsGikkueMPuQnBDpA6YjMMPn5DeMbAZOmMNfE+77AybfsvFAo8YcU0nML011kRCwSoF59YEJxk74MQw4Nh8iPJ1bkSJw89b7nJqiETzBbbRMWP6BfmMN/o3kOM5p/2w8bQJJ/J+Tm0KRx57v97ssCwUt+MYgzRFr2eH/YaWeP8kP9w5Gr0hjKMoAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/780841cb11400392daf7cb5d1b51926d8716bd41-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

9.2 — Squircle corner at ξ = 0.4 using ninth-order clothoids and circular arcs

Though it feels good to have obtained this elegant shape, we must realize this is only an ideal version. This exact shape won’t work for several reasons, first among which is the fact that the center of curvature of the circular portion moves as a function of the smoothing parameter ξ — ideally, it would remain fixed.

More importantly, the power of the arc length s in the terms we’ve kept to produce the plots can be as high as nine. In Figma, continuous paths must be representable by cubic Bézier curves (of which quadratic Bézier curves and lines are special cases) and this limits us to keeping only cubic and lower order terms. This means that the series above for x(s) and y(s) must each be truncated to a single term. It’s hard to have much confidence that such a drastic truncation will retain the properties we like.

Sadly, discarding higher-order terms is not sufficient — the resulting construction performs very poorly when ξ is large. We can see this below in the figure drawn for ξ = 0.9:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABE0lEQVQoz12SCZKEIAxF+/5HtXpcEEiAgPOA0u6ZFGKE/8gir+u6zMx7//PXtm3zw3D69/s919d13fddRFprL+BSCqLDHeeXhWE4zrlzvM7j8M7NE1X1A4cYRKVYsdtY5Hh0zPiWkoXQ51Jyzqx0mCel5KPXrLXVdlutFYyQ7FYzRC2EPt9HdxgR6bnTaVL8B56N2PadDCtSigQWqSPsB44xnv6ULFbtH7wfhw6g3aOmVL7TpoYokbRzzfAz+Zk2fJqw2TyyR4af8GwY3Uo5ZcsM2jaHqAbgGFmujwGrEvwLFpRK2aRA8yJvIqrQjhgCmWNU12Vj5AemvLlHktwBbgJNlqGg1fNvc1WWZWEXHyXxAH8BW69FoDHJbZ8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/e749b541a2869eaaeedc2252e68c75173d48e704-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

9.3 — Squircle corner at ξ = 0.9 using third-order clothoids and circular arcs

This shape is clearly unusable. It seems three orders isn’t enough to keep the curvature increasing throughout the ramp up and ramp down sections of the parameterization, meaning that we have a ton of accumulated error by the time we get to the circular section. Sadly, this means that all of our clothoid results are unusable, and we have to go back to the drawing board.

## [Nothing gold can stay](#nothing-gold-can-stay)

Let’s take a step back, consider our constraints again, and try to extract what we can from the previous efforts before heading off in a new direction.

First, we know that the perfect clothoid construction has exactly the curvature profile we need, but the center of curvature of the central circular section changes location as a function of the smoothing parameter ξ. This is undesirable because our current on-canvas rectangle rounding UI uses a dot right at the center of curvature which a user can drag to set the corner radius. It might feel a bit weird if that dot moved as the smoothing varied. Also, the iOS shape’s central section is right where it would be if it were just a rounded rectangle, further implying total independence of the center’s location from ξ. So we can keep the same basic curvature design goal and add the constraint that the circular section keep a fixed center of curvature as ξ varies.

Second, we know that designers don’t want the construction of the squircle corner to be too complicated. Apple’s squircle (after removing the weird tiny straight part) has only one Bézier curve connecting its circular section to the incoming edge, so maybe we can construct the same type of thing?

Thirdly, we have a somewhat arcane technical constraint which isn’t apparent at the outset, but that becomes a major implementation issue. To approach this, let’s consider a square, 100px by 100px, which has vanilla corner rounding applied for a corner radius of 20px. This means that each side of the square’s perimeter has 60px of straight track. If we flatten the square into a squashed rectangle so that it’s 80px by 100px, then the straight section of the short side will be only 40px long. What happens when we flatten the square so much that we run out of straight section? Or if we flatten it more, so that the rectangle is, say, 20px by 100px? Figma’s present behavior is to figure out the largest value of corner rounding we have room to apply and then draw the shape using that instead. Our 20px by 100px rectangle would thus have 10px of rounding applied.

> If smoothing corners with radius R and parameter ξ consumes p pixels, then the function p(R,ξ) must be invertible to ξ(R,p).

Any smoothing process we might use to create a squircle will eat up even more of the straight edge than simple rounding does. Imagine the case above again, a 100px by 100px rectangle, apply 20px of rounding, and then apply some smoothing procedure which removes 12 more pixels from the straight sides. This leaves us with a 36px budget in the straight section for flattening. What happens when flattening the rectangle to 60px by 100px? It seems almost obvious, by analogy, that we should back off the smoothing until the budget is balanced and the straight portion is exactly consumed. But how do we compute the value of ξ which satisfies a specific pixel consumption budget? We must be able to do this quickly or we can’t implement the feature.

Again, this problem has a very precise mathematical articulation: If smoothing corners with radius R and parameter ξ consumes p pixels, then the function p(R,ξ) must be invertible to ξ(R,p). This is a somewhat hidden constraint which would also have ruled out a high order clothoid series solution.

Finally, we have a usability constraint, which is that changing the smoothing should actually do something perceptible to the shape. If we yank the smoothing parameter ξ back and forth between zero and one, it better make a visible difference! Imagine we did all this work for something that people can barely see — it’s unacceptable. This is fundamentally a requirement of usefulness, and as such it’s obviously the strongest constraint.

## [Keep it simple, squircle](#keep-it-simple-squircle)

Let’s try the most direct thing we can think of that meets the constraints listed above and just try to pick a single parameterized Bézier curve that takes the circular portion and links it up to the straight side. The figure below shows a type of Bézier curve suitable for this purpose:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAAsSAAALEgHS3X78AAAAy0lEQVQoz5WQyQ7DIAxE+f9PTQn7bqCdYFTlUKntOwA2DB5bPP9hztkaNaIxBkLxu6yPkVK2zvsY8QUy4quGaa1578/zNMbiC4RbPD/BYtgjopyzMUZKibWUAmWtFVdiwE/vdAN3pdayiDFa55TWSilUxhV/tytXIheuF8AutNbHQx5S4oDQIGNtTAk1IIC4Ly4xTBjr8A6W9AKNQam0CSHAcMo5pAQv/caeNvaKHlYbbJUPFakN7W3BSh6KuA/2neUZskNOcvg+s+QFum4QAYWfc2cAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/caf09729f626ba46f59d52f577f36b561f8dead3-750x350.png?w=804&h=375&q=75&fit=max&auto=format)

11.1 — Cubic Bézier control points for the ramp-up part of the squircle

A few of its properties merit further explanation. First, control points 1, 2 and 3 all fall in a line. This ensures that the curvature at point 1, which connects to the straight part of the squircle, is exactly zero. Generally speaking, if we define a coordinate system and associate point 1 with P1, point 2 with P2, and so on, the curvature at point 1 is given by:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAAAf0lEQVQY003OiQ6CQAxF0Yqg4jagssywGP7/J33FSwLJCWk7XczMDvb/MrnKUxqZ5SUX4klqKSXIKJHYe77k1kfedJYHcSuDvOXOwJF/2C2I9FS895z1JG8UapoqNruOC1rqkTjxbhvqB6zXFQg0nOQoOXUfsMiHBYk4cUi++QFhZwVYdDeOyAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/448087fc769aa24885ab491dac8d037a27056823-273x60.png?w=528&h=116&q=75&fit=max&auto=format)

11.2 — Unsimplified curvature at point 1 from figure 11.1

We can see, reassuringly, that the cross product vanishes when points 1–3 are collinear. This same formula can be applied to point 4 by labeling in reverse; doing so and plugging in the geometry and the labels in the figure gives the following for the curvature there:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAAAtklEQVQoz22QAQuCMBCFNUtqlmvaTM0oKoio///7epNPGOLgg2139+7dJcny2YlBdGId/afiJJ7iBod58Z6ikJyBEb3wM8GVcOIhXjQ11KZT0lvUYitKcaRJxTsnVkCIn3HvcWiIjW5/WLcIWAIeUcN/RWNHjuXuoWMVY0fH3jLGmkZucWspahCf3IZ93sUVvvFu0mhXOck1DXsKGsRrCJN9EB14L57QYAMlYi2uTDT+BaGGd/EHLWQIJO9i9DsAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/d89f5dc9e229fce5bfed844d63579726b537ff55-161x58.png?w=528&h=190&q=75&fit=max&auto=format)

11.3 — Simplified curvature at point 4 from figure 11.1

Ideally, this would be the same as the curvature of the circular section, or 1/R, which provides us one more constraint. Finally, the values of c and d are fixed by the fact that the end of this curve has to meet the circular portion and be tangent to it where it joins, which means the curvature constraint above just gives us the value of b:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAAAuElEQVQoz32RCQrCMBBFU5da69Kmta21LqgoCIL3v51/5AWCiIFHyCx/ljj3/yRiBKmYfvnNnkEhLr9ELGghlmIu1rARXszEBEpxEgcxiHvoIj4W2BFQiZ3Yc1eIeO6zeNCZifYm0Ig8qppi25I4IFjRuafbKirU04TpuFeUXGIswcZuCfbsqaZgsDfcLX53o2IBiygh5207XFGkZ7wruR15Ieaz5DGE3ww7zKLfdhQ4IvZkujryJ2/3FwhfY1veeQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/a7e3bc34c754c5cf3474f9c5353a367ad93fe933-155x58.png?w=528&h=198&q=75&fit=max&auto=format)

11.4 — Solution for b from figure 11.1 which delivers curvature continuity

If we find it important to preserve the initial linear increase in curvature (which the ideal clothoid solution featured at point 1) we can set a equal to b, which fixes all of the points on the Bézier curve and gives us a potential solution. Using these observations, we construct a simple Bézier squircle below using a smoothing of ξ = 0.6:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABJUlEQVQoz02Si5LDIAhF+/+fuk3b+MAXaPeo2XaZCWOUwwX09n6/xxiqmlJ6vV6Px+P5fJ7nmXNuy1iczh3HwT4B3rlaSu8d8MZnZkRIkigxhBBjFJGyLC0Tds8zei/epxiBEUNywqwgU0lNm/0zYNKUnLUUfqxWWwut9YL5CAoScs3WbfzZLgfJmvNojf/R+/StWWsXTFCIwXmHss2IC+YYkiYpfcJ9HeCBP8oANOmDzyWTE3GGMabG3D+BRcj0hVVn5aQDJnQPptY6C7LVdrddNgNsKNu3nbGGccG7wn0xaroaalUrfsLMNqWu2pcynrV+4M9VYbOEnLgnPF1QDnAWqcs4ndXhl9IF78pn597zGO4/d+ccKa50aabb74THI+vyNvwLCjNG0hEuOsMAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9203f6086bfda6b1cd671da20c03a38a85ed5b3a-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

This looks pretty good, and it takes a lot of cues from the original clothoid calculation. Unfortunately, the variation over the full range, from ξ = 0 to 1 only makes a very subtle difference in the corner shape. Here we’ll show the corner at two zoom levels, with curves for ξ = 0.1, 0.3, 0.5, 0.7, and 0.9 shown in different colors:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABI0lEQVQoz02SiQ7DIAxD9/9/Wm2l5QjhbPeAbZoVJBriOJg+7vu+rqvWGmM8jmPfd2PMeZ6qSrKU4r3fJzg1E2RaaxAfLHYaVYIEHzgIIYhImqAj+zDx25CkL5KDzE68xKAl1/YHxCnNKdVWiZVc43zILBS88zFECq4vqEPKOZc0ke+tX/2a0UeDRaaIYc/TovxP5himMYe3QUVTzCMYTgvtEP+QmY06janmoTAlfmRjrfNeCOfEWfEWaySnPMi992VMzhkyMW7HFUsViaOpas4lEQnlEYpyLp87I0LFtKHh2RiMVjHjAv7TtP+j9enX1+1lLFgjMBXvAlMgz4chr1+sJ0SJPoO8Jl83f71ez+fTWrtoGM7L88lPsm0bFlDDEfWw3g3uRJ2QvXo+AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/aaaf30e57d0047ff8542bc05edfb102dcf74a256-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

This is a barely noticeable effect despite its nice mathematical properties. It’s certainly closer to being a product than the curve we got by truncating the clothoid series that we considered previously. If we could only tweak the formula a little bit to get some more variation!

## [Small strokes of sqluck](#small-strokes-of-sqluck)

We can take one more small step back to figure out how to proceed. Recalling that we need an invertible relationship between pixels consumed in smoothing and the smoothing parameter ξ, we can focus initially on this mapping, make it as simple as possible, and see what comes out when we try to make a parametrization of squircles from it.

We know something already about how simply rounding the corners consumes pixels. I won’t walk through the trigonometry necessary, but taking a corner of opening angle θ and rounding it to have a radius of R pixels will consume q pixels of the edge from the apex of the corner, with q given as follows:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAApUlEQVQY04XQ2QrCMBCF4bohbkVjTFvqhhUrKore+P5v5pnyF3JRsPAxbcicJpMk/5+hFHKTSvayxVFOrD/k2xXQkxFB7XuQA8EZ34Hwi1zlLi8LSGUiU+pcSpptbSZrAhxW1JxQ+9mOniZ9E230UnONAj7iIp7eQHgTaDNYyhjtiRxzOkdXtIAFHNcv2Vcx5yZk0DHLPg01NeM0KQfICXnKWz5Wf2GxCZvHyRQwAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/cffc0ef4df084841fa6a69d9314d1321e751405d-166x53.png?w=528&h=169&q=75&fit=max&auto=format)

12.1 — Segment length consumed by rounding

What if we choose p(R,ξ) based on q in just the simplest possible way, something like:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAAAhElEQVQY002PTQvCQBBDB7QVtAWlFu2HVhH14EkPHv3/P8sEXmEOj+ySbGY2IqIUK7GAZdKdGESXMrNu8Mw29cQkrqKhoOdciYO44Nc8HMjZu6WB1qcL3+Il2rRRQ0HHwIm7/RO+c3cWMA/xc+FHjOkrBeov7MWRghJvTbZlozM5D/j+AaD3Bn47BeUqAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/59788dcc69ae402e2c5d8f1e9f185c73e6cfe0ab-119x23.png?w=528&h=102&q=75&fit=max&auto=format)

12.2 — Segment length consumed by rounding and smoothing

All this means is that our maximum smoothing setting will consume again the length of segment that we consumed in rounding normally. Making this choice would fix the quantity a + b from the figure above. Recall that in any circumstance c and d are firmly fixed, so fixing a + b means there is one final decision to make: how large is a relative to b? Again, if we make the simplest choice, namely a = b, we have determined another modified Bézier parameterization, whose corners and curvatures we show below:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABQUlEQVQoz2WSiXKFIAxF3///ZncXIAsJCPp6RaedTqMohhyzPp7P53EctVYmXpZlnud1XUMIqtraBlHN0Aw91CGl5O69d4APrN66iqaQwMsQkLAopeRsIpmZUyLclBhH0LfW4PKEsYOWAlWv2PcheMMIblkcgIqElVKg4gXh3DAWjOCWIm112/fjkt53d2NWYhcWjunzbZ3fQ7XT7Q3DCf4bQxSSrbYfGMeINkaKyRBXWuPHyzK/ruU/DDtT3wpi3vfxgxtGqpQpwTMvXxQm+gPDFGGbWS1bqx18Q+JbQwo5o1RCnIXV1bMWoezZcfSbM3ao7ShDr74hBEVROaMFTMKkWQwZ4dytWDY8YXxXG5H7kNGb09vZM/CA0TtWM0eRbYjjMsdc3PAV+ZU55mSaJjQUn3mInl1XzAbmJMZ46S/4G+yDQOKFki5NAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/75eec2efcc35516832c4d47574acce3196e7795e-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

12.3 — Corner shape and curvature profile for simple smoothing scheme

That visual variation looks promising! The curves look attractive, sanded in a way. However the curvature profile looks pretty rough. If we could just make it a bit less spiky, it might be a serious contender for a product. Despite the poor curvature profile, even this simple family of shapes has a member that looks extremely similar to the Apple version of the squircle, almost close enough to put in front of our users without a bad conscience.

Now we turn to the curvature profile, our last outstanding problem. Rather than splitting the difference evenly between a and b as we did above, why don’t we give two thirds of the interval to a and the remaining third to b? This will throttle the curvature from increasing too quickly, reducing the long tails on the curvature profile and cutting at the spikes. This modification results in the following shapes:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABQElEQVQoz1WSCXLDIAxFe/9zdjqpExatrEn6wUk7lY2tETzxkfh4Pp+Px6O1JsThtiyEEGNU1d77GMNMY4q/8ZSSu885AX5gzDFVlBIxsYjotlJKrdW9MGumDCbcElhhwRSSYssFwwNGiVtp8Oc2/CHHrBCDZ8r5uKTwnYqVU9GCMbBDTpkzI3h/vGzOO+Iinqlk4hzy5TNev2L1tlNvGB5EZughHe0Pxs4rnpnIiJSzhIPTlRc8/sMQ5tBTofkO2ztveFXBTd2tqlYhA4y8eBaMpbsw3mofbXZM4e0DTvGiYqoLrqXV0lW8WN1Hfp8ZHgq4yzBb6SiJsZm4L8yYIMyQGunsnQhrX9WGwrINEgwUC4qP5oHENycSgnQ389VHgRhDI17wqfw8OS7DcRxorK6DLkPnEU8pIo5rAh8rT/gHbYlBSOcY5u4AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/49ff32ad3449a7ba6ba8a60503c13862909e06f3-1000x500.png?w=804&h=402&q=75&fit=max&auto=format)

12.4 — Corner shape and curvature profile for improved simple smoothing scheme

The curvature profiles are much improved, the visual degree of variation is still enough for this to be a useful product, ξ = 0.6 just about nails the iOS shape, and the nice visual character of the curves which this stunningly simple approach generates is retained. So we must ask the question — what’s blocking this from becoming the product? Nothing.

## [Watching the ship sail](#watching-the-ship-sail)

It’s useful here, at the end, to reflect on the process itself. Something I see borne out repeatedly in this story is the power and effectiveness of trying the simplest possible thing. Doing so will, in the worst case, give a baseline for comparison if the simplest thing ends up not working out. Evaluating it in a serious way also shines a light on the most important things we need to consider when refining the approach and moving forward. And in the best cases, like ours, the simplest thing happens to be pretty good already!

Lastly, there is a meditation on the difference between a good product and a perfect one. I feel some pangs of embarrassment writing this that I was unable to come up with a better curvature profile. I’m sure I could have given more time — there are many avenues left to explore. Intellectually, it’s somewhat unsatisfying to have gotten such a beautiful result as the clothoid series but not to have been able to at least see a reflection of that in the spline we shipped in the end. But there’s also the wider context — the constraints of time when working at a small company are very real — and a design which violates these cannot be considered good.

If this type of problem resonates with you, [we’re hiring](https://www.figma.com/careers/)!