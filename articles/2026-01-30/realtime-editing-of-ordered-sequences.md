---
title: "Realtime editing of ordered sequences"
source: "https://www.figma.com/blog/realtime-editing-of-ordered-sequences/"
publishedDate: "2017-03-06"
category: "design"
feedName: "Figma Blog"
---

One of the problems we had to solve when we added [multiplayer editing](https://blog.figma.com/multiplayer-editing-in-figma-8f8076c6c3a6) to Figma was supporting simultaneous editing of ordered sequences of objects. We have many compound object types in Figma (the document, groups, components, etc.) and each compound object has an ordered list of children. Users can insert new children, remove children, or drag them around to reorder them and everything updates in realtime:

The core problem is maintaining eventual-consistency. Each client instantaneously applies its edits locally and then sends them off to the server, which then sends the edits to other connected clients. This means edits may be applied in a different order on each client. When designing the algorithm, we have to make sure the document ends up looking identical regardless of the order in which edits are applied.

## [Operational transformation](#operational-transformation)

We initially considered using a technique called Operational Transformation to solve this. It’s an old algorithm that was originally developed for text and was popularized by early collaborative text editors such as Google Wave. While we didn’t end up using OT, it’s perhaps the most common approach to this type of problem and it’s useful to contrast OT with our approach. In OT, new operations are carefully transformed past other concurrent operations such that the resulting operation has the same effect:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsSAAALEgHS3X78AAABaklEQVQ4y41U7baDIAzb+7/p5jcg4h+4Cd4oOtzmOTlAoSEtrY91XVMIIc3znJZlSVwT3vvknMvj1aZz8rPW7raHNmggOK+BZHQkRKo9zUUYsYgwZpRzkEQoiCCIIIrTNEVjTAbtPEt/geuqQioYxzH1fZ8BohwaVRKcKx2lutuQGRaJ2rZNXdclKDrlVykgqXKv8KuEHOWgnHF95HQ9RaII6Hf7KKVdIV7VGGNT07SI5Ijip1emnQ7DMGQ11jpcwFf3UGixd0TwlZD7tJOIal6vBmMPIiqm3/nsF0I+Qvh/qBkPNKXncwDpmAm9fxfwk8KN0EOZAdkEYpPzV+b0Y9nUcujcDFUGods8V8sxt2VNVjtFHSC7uoVj2U3sHNRqRK3mOfdvFZYdUdahQttUb3VI6AexK2Tf6nbehBLJN+PwqW8VgXCNjISBH4wZ/EAQQBjQfgE5Crgs1D76XkHCFntvAPmO0n53XvgDfzYk8z6kVn0AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/42f7de559f14a97ea68d9bb5fb4aae238318cda2-1400x1212.png?w=804&h=696&q=75&fit=max&auto=format)

An example of concurrent text editing using OT

In the picture above, transforming the operation _Delete(at: 1, n: 2)_ past the operation _Insert(at: 0, text: “x”)_ on the server and on client A results in a new operation _Delete(at: 2, n: 2)_. This is because the insert must affect the index of the delete to ensure that the text “bc” is still deleted. Transforming the operation _Insert(at: 0, text: “x”)_ past the operation _Delete(at: 1, n: 2)_ on client B is a no-op because the delete doesn’t affect the index of the insert.

That’s the basic idea at least. The actual implementation details are a lot more complex. They’re actually so complex that the [first paper on OT](https://scholar.google.com/scholar?q=Concurrency+control+in+groupware+systems) had some [subtle problems](https://scholar.google.com/scholar?q=A+Survey+on+Operational+Transformation+Algorithms%3A+Challenges%2C+Issues+and+Achievements) that went undiscovered for several years. The problems have since been fixed and OT is a very viable algorithm, but the high implementation cost is only worth it you need the specific benefits it offers for editing text sequences.

**Benefits:**

-   Good performance and low memory overhead for very large sequences
-   Concurrent insertions are linearized instead of interleaved (i.e. inserting “abc” and “xyz” in the same place won’t make something like “axbycz”)

Drawbacks:

-   OT is hard to understand and hard to implement correctly
-   Reordering is usually done using a delete and insert instead of a move

OT was overkill for us because we didn’t need to work with enormous sequences and we didn’t need to avoid interleaving. Reordering is also a very common operation in a layer-based design tool like ours and we wanted to make that efficient without additional complexity. With an OT system, adding more operations increases implementation complexity quadratically since every operation must transform correctly past every other operation.

## [Fractional indexing](#fractional-indexing)

Instead of OT, Figma uses a trick that’s often used to implement reordering on top of a database. Every object has a real number as an index and the order of the children for an element of the tree is determined by sorting all children by their index. To insert between two objects, just set the index for the new object to the average index of the two objects on either side. We use arbitrary-precision fractions instead of 64-bit doubles so that we can’t run out of precision after lots of edits.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAIAAACZeshMAAAACXBIWXMAAAsSAAALEgHS3X78AAABWklEQVQoz3WT25aDIAxF+///2DWieGEqSuuN8Wk2ibaO7ZxlKSQ5yiZ6+RGt6xpj9N5/ibIsu16vmUgnGqeAMorVdTma+74vy9KK8jwvCsvFxO6i4INZNc/z4/G43+99H7zv2rZj5Gl4CJKapulYfzYPw0AR1W3r5eput44lQVIUfDbrtquqKkX7bmtjGkYipEIIlL2bN2bKC0CtNQZmVBlTMWrwMzMR7giSMvME/1LH8l/mZVnA4SI3ihS7E/HPUuNUnsyRs6hrX5bfdd2AXIvYpPIn7l08/8QcCVnrhA1UI6jFc8IbwihtL9iImA/MNEA4E2oIffqlVr3EUlIBLrwc0Msc4zL9FS3VW6iN5Z6Zx3EW9riZyTnnmqZhBKwRAaycYEsgpaTs5pwfhnEzc29lA0xHBLNO+B50ovDGcIQOzM3Mbp6NeVdq9C4pS11n/+fX86j3yDGl+gUGSYIV80JZFAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/dc3ac373a86b1d25629d651e2b75100dc3d9fbb9-1400x1144.png?w=804&h=657&q=75&fit=max&auto=format)

An example sequence of objects being edited

In our implementation, every index is a fraction between 0 and 1 exclusive. Being exclusive is important; it ensures we can always generate an index before or after an existing index by averaging with 0 or 1, respectively. Each index is stored as a string and averaging is done using string manipulation to retain precision. For compactness, we omit the leading “0.” from the fraction and we use the entire ASCII range instead of just the numbers 0–9 (base 95 instead of base 10).

**Benefits:**

-   Easy to understand and implement
-   Reordering an object only involves editing a single value

**Drawbacks:**

-   Index length can grow over time
-   Merging new elements from multiple clients may interleave them
-   Averaging between two identical indices doesn’t work

The first drawback (index length) isn’t a concern for us since we don’t need to order huge numbers of elements. The number of reordering operations is bounded by user activity in practice, and normal usage patterns never generate prohibitively-large index lengths.

The second drawback (interleaving) would be a concern for a text editor but isn’t really a concern for us given the nature of design documents. Interleaving concurrently inserted elements in a design is usually fine because the new objects likely don’t overlap. And if interleaving looks weird, users can just manually fix the ordering afterwards.

The third drawback (averaging identical indices) has a simple workaround that avoids this problem entirely. This case arises when two clients try to simultaneously insert a new object between the same two objects. The server can avoid ever having two objects with an identical position by just generating and assigning a unique position to the second insert operation.

We’ve been using fractional indexing for multiplayer editing in Figma from the beginning and it’s worked out really well for us. Even though OT provides some additional benefits around performance and interleaving, it’s much more beneficial for the Figma platform to use simple algorithms that are easy to understand and implement than to use the most advanced algorithms out there. It means more people can work on Figma, the implementation is more stable, and we can develop and ship features faster.

_Like thinking about realtime collaboration? Figma is building a browser-based collaborative design tool, and [we’re hiring!](https://www.figma.com/careers/)_