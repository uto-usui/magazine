---
title: "Delete and Heal for Vector Networks"
source: "https://www.figma.com/blog/delete-and-heal-for-vector-networks/"
publishedDate: "2016-11-17"
category: "design"
feedName: "Figma Blog"
---

Since I joined [Figma](https://www.figma.com/) in September, among many other things, I had the pleasure of working on the intuitive yet surprisingly complex behavior you see above (You might need to give it a second to load the GIF).

When implementing deletion of a vertex in a vector editing tool, the easiest thing to do is look at all the edges that touch that vertex and delete them too. If there are any fills touching those removed edges, throw those out too.

The distinction between “delete” and “delete and heal” is, as you might expect, the “heal” part. At first glance, this operation might seem like it has a straightforward implementation: join up the two vertices in the path that are adjacent to the deleted vertex.

Even in these simple examples, you start to run into edge cases. What happens if the vertex only touches one edge? In that case, you throw away the edge, since there’s no sensible “healing” action. What happens when you have a triangle and delete and heal one of the vertices? You have two vertices now, but should you be left with one edge or two? Figma’s answer is, well, it depends.

All the examples so far, while a little tricky, come mostly down to finding the edge cases and dealing with them sensibly. The problem gets _really_ interesting once you consider how to deal with healing vertices along curved paths.

## [Healing Curves](#healing-curves)

When you delete a vertex along a curved path, we try to do our best to retain the curvature without that vertex.

There’s some subtlety here. Other tools typically preserve the position of the curvature control handles on the adjacent vertices when doing their equivalent delete and heal operation. Figma adjusts the adjacent control handles to approximate the original curvature. The above animation zips through this, so let’s look at the before and after picture.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAAA/UlEQVQoz3WR6ZKDIBCEef/n3MiNgsgNux1TpcZk5xfUHF9PD6m1xj3w+P0WpVbn1sW6lHLv45oiMSWpNeN8sRZ1Y7yl8c2laDM/JiqUjjFdC0itbfWeC/mgFONbazdy7z2lpOf5Z6LGzPUCIK90CIEJwbiAkBv84AupKONXODnGA0uZ2LYwvm3ex3DOTZS5de23ZgzzW0CzdWfuBg8xQppUupTygp/NMByquJTpH+XYVhuDzZ/W7v3kehKzuyKVgvjW+qdz21Mdh/NmXuDCuXPOGbYrY5BW2qRcbnwcAuqsdZCOMlhLDknWWpA3BKwPsX7cDFLhmfcebSBh1h++YEdFliTxUQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/d67e1cfd563692e31a8e07aea99df3de173053e8-1753x892.png?w=804&h=409&q=75&fit=max&auto=format)

The original curvature is approximated by moving the handles on the adjacent vertices

Since the original endpoint vertices have no control handles, if we didn’t do this, the “After” picture would be a straight line.

Each curved segment is a [cubic bezier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B.C3.A9zier_curves). With that in mind, we can reframe our healing operation as the task of approximating two cubic bezier curves which share an endpoint vertex with a single cubic bezier curve.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABFklEQVQoz21SCY6EMAyb/39zoS3Qg95NOXYNXTEDmkhILYmN7fAiKinnlHJdln3ff++1rqv3QWk9W0uVtm2rZ7XJVwhhlLJnXCqVc0b7CQ5hGMeeMVAUovWsfzBoWvun66VUuH6CMbQsS0wJ1D3n1vkLeYDx4GullHGSjPEQ40P8flLkUsQ4YYaIbuCGd953PTOzxfmL+W1Dq+cihPgE4w5t3el8+ZYc3oSYAFbatAHUG4wwIIwLAeXrPba9WSOaJJwL6xzVCvOvawJ8Zp6hnImjfe3jMHXGhl36ELkYGBfamBjj2zMyc85JpbE2PgyIANw3cK34I8ArtVbGhAZu+7DWaq3Bl1JCoxT6dI4zcgY7BqC5yf4DMf9FXy7y2i0AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9fcc0a960d02e5c70e6fdd8768fb1f424605830a-1754x890.png?w=804&h=408&q=75&fit=max&auto=format)

Now we have a more precise problem. How do we best approximate the joint bezier curves ((P0, P1, P2, P3), (P3, P4, P5, P6)) with a single curve (P’0, P’1, P’2, P’3)? We don’t want to change the rest of the vector network, so we’ll keep P’0 = P0, and P’3 = P6. The problem is reduced further to determining P’1 and P’2 as a function of P0–6.

We solve this by first generating a series of points that lie along the joint bezier curves, and then fitting a cubic bezier curve to those points.

Generating a list of points along the cubic bezier curve ends up being quite simple. Bezier curves have a [beautiful recursive definition](https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Constructing_B.C3.A9zier_curves) using linear interpolation, but for our purposes, the closed form equation is handy.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAIAAABR8BlyAAAACXBIWXMAAAsSAAALEgHS3X78AAAANElEQVQI1z3KMQoAMAgDwP7/qxrRODgJDR2aISRwh6S7V1V3RwSAzNTFy99mphaQl5yZ3b2vcjhQPFIC/wAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/db54280de960792291b09c08580c69c17c64d867-1369x114.png?rect=1,0,1368,114&w=804&h=67&q=75&fit=max&auto=format)

From “Cubic Bezier Curves” on Wikipedia

To generate points along each half of the joint bezier curve, we just plug in values of t. For instance, if we wanted to generate 7 points on our joint curve, we could evaluate B(t) for t=(0, 0.3, 0.6, 1) first for (P0, P1, P2, P3), then again for (P3, P4, P5, P6). This generates 7 unique points, because B(1) for the first curve will be equal to B(0) for the second curve — this is the shared endpoint between the two original curves.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAAA4UlEQVQoz3WRjY6EIAyEef/XXGVVcPGUHxX07tszMSxkjSG00+lMi1jX1YfAv8d4nufv53ccBwXbtsUYuReosNYqPbbPTo8v6ooKQpjkQwhcClTs+75Y1w/q0bR6HAlzGC8QUkpXi4Iv/tufAINS6FvnavO3f+99zKYTNzYvSyPlyxh0ajIETF3kD+ULc943rVRa53BBds5xlsrETNT1vezezlO1WApoCpnNXZsnI244pmSmCXH4P/OcK9yjkYRMC+anhch7s0xjplY+u2HgCY8v+tfmKBY1BoDz+lWLx+P8A2V+S01MdUSfAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/60698caad8763e4af3d63ed1a0a44a84b0f53aba-1440x734.png?rect=1,0,1439,734&w=804&h=410&q=75&fit=max&auto=format)

7 generated points along the joint bezier curve

Once we have these points, we use a technique described by Philip J. Schneider in his article “An Algorithm for Automatically Fitting Digitized Curves” in “[Graphic Gems](https://www.amazon.com/exec/obidos/ASIN/0122861663?tag=realtimerenderin)”. Conveniently, the [original associated code is available on GitHub](https://github.com/erich666/GraphicsGems/blob/master/gems/FitCurves.c).

## [Vector Networks](#vector-networks)

The vector networks we use at Figma to represent vector objects present challenges you avoid when using paths. If you’ve never seen vector networks before, or if you’re curious why we chose this more complex representation, you might find [Introducing Vector Networks](https://www.figma.com/blog/introducing-vector-networks/)

of interest (spoiler: they’re more intuitive to use). For the computer scientists and engineers reading, all you need to understand is that, unlike other vector editing tools, Figma considers vector objects as undirected graphs (or more precisely, as [undirected multigraphs with edge identity](https://en.wikipedia.org/wiki/Multigraph#Undirected_multigraph_.28edges_with_own_identity.29)), not as paths of vertices.

This means that “delete and heal” in Figma has to work correctly in situations that other programs don’t need to consider at all. The most obvious is that a deleted vertex might be an endpoint of more than 2 edges. What do you do then?

If there are an odd number of edges, there’s no sensible resolution, so we delete all of the incident edges. For an even number however, something like this happens:

Edges are healed by replacing pairs of “opposite” edges with a new edge. But how to define “opposite”?

For now, let’s ignore that the incident edges might be curved. The trick here is to sort the incident edges by angle. Let’s look at a concrete example.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsSAAALEgHS3X78AAABT0lEQVQoz3WS2ZKCUAxE+f+PQ8AX2QrZKUVlVQGp8hRhrlgz0w8QctPpdLjaPM+vH0g8TZOK5ROM4zhtIAWaOha0bVuWZdd1qmgYhrquSXLU9/31em2ahl4cadvecI7Ho2maYRgSS8Xz+czzPAgC+LfbLYqi0+lExw+ZOroWRXE4HAzDcBwHgugr8uVygRzHMV1WZUanQpjxAuqyLEuSBA55yEghCLOqKvJ0gbJ6RoEz1DiAbNs25DRNCXBRLYBAI8wLeVWmBx+WZWGVUlrouu55HrZJ7nY7Gt3vd0xCYFWMw84+C0OZUvFJKcx8geu6vu+fz2fIsvnH44E4I8jn6hm++OSJBfwzNjED1wtESv1wuQKavEjxG6lGf7/fo0lMhm01CxT5tcHXf6aaVeOTJ7EkmZlpp1/4IgsQYWbmlGOesqq/ydu7rVxt7/Z/oOANUFngzMYYUVwAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/82c21dd5164f9c8499b4ceda18a74fceca3b5a63-879x581.png?w=804&h=531&q=75&fit=max&auto=format)

The task at hand is deleting and healing vertex c. First, we find all the edges incident to c: `[{a, c}, {b, c}, {c, d}, {c, e}]`. The ordering of the two values here is undefined, since vector networks are undirected graphs. To sort them, we use the angle from the deleted vertex to the non-deleted vertex as the key.

For example, the key for `{a, c}`:

Plain text

angle from c to a
= atan2(a.y - c.y, a.x - c.x)
= atan2(2 - 3, 2 - 2)
= atan2(-1, 0)
= -PI/2

This is one of those situations where [atan2](https://www.cplusplus.com/reference/cmath/atan2/) comes in handy, since we need the full \[-𝜋, 𝜋\] range to use as our sorting keys. Applying this to all of our edges, we get the following sorted list of edges with their angles:

Plain text

sorted\_edges = \[(-PI/2, {a, c}),
                (    0, {c, d}),
                ( PI/2, {c, e}),
                (   PI, {b, c})\]

To find pairs of edges to be collapsed into a single edge, we pair `sorted_edges[i]` with `sorted_edges[(i + sorted_edges.size() / 2) % sorted_edges.size)]`, since that’s its angular “opposite”. Once we have these pairs, collapsing them down becomes the same problem as it was with deleting a vertex with two incident edges.

## [Sorting Curved Edges](#sorting-curved-edges)

The situation for sorting gets a little weirder when the edges are curved. Using the angle to the non-deleted vertex doesn’t work in cases like this:

The example on the right shows a surprising fact: vector networks can have multiple edges joining 2 vertices! This is what makes vector networks not just a graph, but a _multigraph_. If we try to sort by the angle to the non-deleted endpoint vertex, then we’d get the same key for the top two curved edges. The intuitive behavior here is pretty clear: in the figure eight, we want to joint the top left edge to the bottom right edge.

Instead of using the angle from the deleted vertex to the non-deleted vertex, we use the angle of the _tangent vector_ to sort. So for each cubic bezier curve (P0, P1, P2, P3) attached to the deleted vertex P0, we use the angle of the curve as it leaves P0 (usually the angle from P0 to P1), not the angle from P0 to P3 like we did in the previous section.

## [Region Healing](#region-healing)

The last piece of this puzzle has to do with regions. Since vector networks might have many closed regions, we start with the entire closed part of the network filled in, then let people punch holes in the fill.

My intuition was that each region is defined by the list of edges that bound it, until I was presented with pictures that look like this:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAAB0ElEQVQozzWS6W6bQBSFef8Xqaq2auI6beQ6seQoi+MFMGCzhNU2w2b2HX7kYLcjpJFm7pl7znehuq5ruy6rahKlmhvqXujGeVnjrO+uq+/LpvWT3PBCzT2jDMXt5YLCFmalTALGILRu04bNGkTzwrSs2kHfp1X1QYIXUX9g5SkrzwVVsJxzVuCWSopatAPaIIozvGqHiXjyN7oNF0XdwILqBNDcLLjpVp7x6uidv1vttgaJi4oy/ehamtcN+sAITvcnH0a8JA/S/FXUvz3TtwsOvoSjd0+LX582U0aGhOIPLnwiUv9/QX8KE5Rafmz50ZQZqkdL/kWy3pTDeLX7Ml+PFhxr2BRvOVuTnNMCsisgiOH/Io7w/WXEn2/bR16dCdofWhqv9t+f2dFg5EShO2ybQVQ1QNC3fQ+YChkoOHHmxdnTTkO3+V6f8dpvWpqwyu27MKElhfhUmJdIwpgEJoOs8JPiww3Xug3+WVnnVSMevQkjjZYCmP145W4W/N16t1aPAE6hH8AIR3ejDUMCJxgBfzzaXiJEeSEcnEdOGS+FX0t+Qosb9ehGKYQUQmI7ZyX885YrHFzTj5Py+hv8Q5AWNcKDDmcSTC7EkFvk6z4BfZkWVLzX3gQAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/40614888c04bae5c2a25a738a6cfb7848c8469eb-874x443.png?rect=1,0,873,443&w=804&h=408&q=75&fit=max&auto=format)

How would you describe the filled in regions in these two examples? The filled region is defined as the area between two closed paths in the left case, and between _four_ closed paths in the right case!

In Figma, each region is defined by a list of “loops”, where each loop is an ordered list of edges that define the curve as clockwise or counter-clockwise. This list of loops is used in combination with a winding rule (either [nonzero](https://en.wikipedia.org/wiki/Nonzero-rule) or [even-odd](https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule)) to unambiguously define the region.

In our implementation of delete and heal, we try to heal any loops containing edges that were deleted by using the newly created edges.

For each loop containing deleted edges, we see if there’s a newly created edge that spans the “gap” created by the deleted edges.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAABaklEQVQoz12SaauCYBCF/f//JSKkLLstFEKbmYq2KAYFFa2WlbdF6EmDa3c+xDhnznnPzCREUXS/33+/g8rz+YzieDwet9stjfJJEUggW61Wrus6juPGQTKbzYIgSHS3263neZPJxImDZDqdHg4H+AJNg8FAkqRSqVStViuVSrFYbDaby+WSxy+Xy3g8pk7xJw7a6vU6clgQjsdju93OZDKiKAKgks1mSebzOeTz+WyaJsxyudztdjudjizLoKPRKAzDDzmfz/Or67qqqsjTmibzsqZpm81mvV4jgTvs/JELhYJt2wzPPI1GA/4/MqPtdjvmR/2L3Gq1crmcoiiWZfX7fUziLU3GZ61WMwwDazBBP7ZPpxMEbCcrASBnJYvFIlnYcDhkigQlYSnwOcp7YQhwGFR7vR4WGAmH3MP3fU6VHJKJmBmIHlDkmP99KuTRwB6no7Tf7/FyvV6TvwEofN6nCEQPCZ/cH/QFRwoDbvujxPEAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/d2bce1439e8392542ed211bb3ffe120a6528ed24-1440x731.png?w=804&h=408&q=75&fit=max&auto=format)

Edges {a, b} and {b, c} on the left are replaced by edge {a, c} on the right in the inner loop.

Before the delete and heal operation, the filled region is defined by two loops, one of which contains the list of edges `[{a, b}, {b, c}, {c, d}, {d, e}, {e, a}]`. During the delete and heal operation, the edges `[{a, b}, {b, c}]` are deleted. This creates a “gap” between a and c in the loop. The healing operation adds the edge `{a, c}`, which we can then use to repair our loop!

Even after all of those cases, there are a bunch of things I left out. For instance, it turns out that the approximate method of joining bezier curves never finds the exact solution, even if one exists, so we first check if an exact solution exists.

We also have some unexplored ground to try to do the curve joining without using a list of points as an intermediate via techniques described in “[Approximate merging of a pair of Bézier curves](https://www.cse.wustl.edu/~taoju/research/merging.pdf)”.

Part of what excites me about Figma is the level of care and computer science thought that gets put into small features like this. If this seems exciting to you too, you should think about [joining our team](https://www.figma.com/careers/) 😄.