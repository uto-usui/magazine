---
title: "Supporting faster file load times with memory optimizations in Rust"
source: "https://www.figma.com/blog/supporting-faster-file-load-times-with-memory-optimizations-in-rust/"
publishedDate: "2025-06-18"
category: "design"
feedName: "Figma Blog"
---

Figma’s [multiplayer system](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

handles loading files, propagating updates from multiple collaborators, and storing regular snapshots of file state. In order to make real-time collaboration as fast as possible across the complex graph in a Figma file, a lot of the file is loaded into memory.

As Figma grows, we look for ways to scale efficiently while preserving a great user experience. When we released [dynamic page loading](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/)

, we saw a 30% increase in the number of files we need to decode server-side. To handle this new load, we investigated several performance optimizations in Rust that resulted in faster load times and improved memory efficiency.

## [Smaller, memory-efficient maps](#smaller-memory-efficient-maps)

A Figma file is conceptually a collection of nodes. Each node represents something different: a triangle, a square, a frame, etc. And each node can be thought of as a bundle of properties that tell us how to display it: its color, its shape, its parent, etc.

![Two JSON-like code blocks on a green and gray abstract background depict a parent-child relationship between a FRAME node and a GLYPH node.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDBP/EAB8QAAICAgIDAQAAAAAAAAAAAAECAAMEERMxEiEyUf/EABYBAQEBAAAAAAAAAAAAAAAAAAYDBP/EAB4RAAEEAgMBAAAAAAAAAAAAAAECAwQRACEFMVFh/9oADAMBAAIRAxEAPwDQtV6XFuRSpPyfyVayzlPihZB2QImWuyvvUrhZtmJU9aBWDnZ8hIuOl+lLA6rQrC3HQ48hIfkkGxVAVX3WUDAjYhE3yln+NnpeoTIUgHD8iM026pCV6B8Of//Z)![Two JSON-like code blocks on a green and gray abstract background depict a parent-child relationship between a FRAME node and a GLYPH node.](https://cdn.sanity.io/images/599r6htc/regionalized/de9f4523cc024b9bd59a3dac83511c0667d6d54f-4320x2880.jpg?w=804&h=536&q=75&fit=max&auto=format)

On the server, we represent nodes as a map of keys (property ID) to values, or `Map<property_name (u16), property_value (u64 pointer)>`, where `u16` and `u64` refer to the bit-size of the entries in the map.

This map is in the critical path for loading a file, so any speedups here would propagate to improved file load times. Additionally, through some memory profiling we discovered that this map was responsible for more than 60% of a file’s memory usage. (Given that the map just stores metadata and not data, we were pretty surprised by this finding!)

So, we examined this data structure for potential optimizations. We were using the default `BTreeMap` in Rust, since our serialization protocol needed ordered iteration. After staring at the problem for a while, it dawned on us that we didn’t need the full power of a generic map because of the small range in which our keys lived.

The keyspace of the map was constrained by new properties being added to the schema definition of a Figma file, which happens at human speeds, i.e. extremely slowly. The schema has less than 200 fields today, and most of them appear in clusters. For example, you would only have the comment fields set for a comment node, and not for any other node. By measuring the actual field counts on some sample files, we discovered that our hypothesis held true, and the average size of the property map was around 60 keys.

With this realization, we decided to try a simpler and more memory-efficient layout: a flat, sorted vector. So our in-memory representation of a node went from:

Rust

```
BTreeMap<u16, pointer>{
    0: 1, // node_id
    1: FRAME, // type
    2: null, // parent_id
    ... (x, y, w, h etc.)
},
```

to:

Rust

```
Vec<u16, pointer>{
    (0, 1),
    (1, FRAME),
    (2, null),
    ... (x, y, w, h)
}
```

A quick comparison between the two representations, Big O style, tells us that the vector-based approach is strictly worse from a performance perspective:

![A comparison table showing operation complexities for BTreeMap vs. Vec in terms of insert, find, and edit.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHAwX/xAAlEAABAwIFBAMAAAAAAAAAAAABAAIEBREDBhIVISMxcZIUIkL/xAAXAQADAQAAAAAAAAAAAAAAAAAAAQIE/8QAHhEAAQMEAwAAAAAAAAAAAAAAAQACAwQFEiERcZH/2gAMAwEAAhEDEQA/AHmt0eZHEqT80lrbv03SluUjnqv9lWcwxW4tKltvbUwjsphsrOeqfVRG1pGwss1kogeQD6V3cuzcV9PJc9xOs/rwhbUGnNwoJaH3+5PbwhPFqG2+BgxA12V//9k=)![A comparison table showing operation complexities for BTreeMap vs. Vec in terms of insert, find, and edit.](https://cdn.sanity.io/images/599r6htc/regionalized/205d42da4b6a5ef13698a49c687354dcbf577569-4320x2880.jpg?w=804&h=536&q=75&fit=max&auto=format)

However, this discounts the fact that computers are especially fast when they have to traverse and perform computation on small amounts of linear memory (the exact setup here). So, despite the O(n) theoretical insertion time (if something is inserted at the beginning of the vector), this solution was _faster_ when deserializing files (which is the most important process for file loads). As for our memory usage, well, that dropped almost 25% for large files—a resounding success at scale.

## [Saving more memory with bit stuffing](#saving-more-memory-with-bit-stuffing)

While we ended up deploying the solution above, we also investigated another optimization that hasn’t been productionized yet. To explain, we need to squint again at the `Map<u16, pointer>` and ask: What really is a pointer?

Pointers are just 64 bits of data that tell your friendly neighborhood CPU where it can find the start of another piece of data. 64 bits of data corresponds to 2^64 bytes or 18 exabytes of addressable memory—not an amount our multiplayer system would ever have access to. In fact, most x86 processors agree that you don’t need this much memory, and so a pointer on x86 really looks like this:

Rust

```
[0u16, pointer_u48]
```

The bottom 48 bits of the pointer are the only part used to address memory (though this is not a guarantee, and could change in the future), and the top 16 bits are free for us to use!

By some happy accident, our `Map<u16, pointer>` needs exactly 16 additional bits of data to store the field ID, and so we can stuff our pointers with the field ID to store _both_ the field ID and the pointer in a single 64-bit number. Our data representation now looks like this:

Rust

```
Vec<u64>{
    [0_u16  type_ptr_u48],
    [1_u16, FRAME_ptr_u48],
    ... (x, y, w, h)
}
```

![A memory structure changes from a free state to a state containing a field ID and pointer.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHAwT/xAAnEAAABQIEBgMAAAAAAAAAAAAAAQIDBAURBhIUFRMWISIxQTJRcf/EABcBAAMBAAAAAAAAAAAAAAAAAAACAwX/xAAiEQACAQMCBwAAAAAAAAAAAAABAgADBCEFEhETIzFBcZH/2gAMAwEAAhEDEQA/AKtMwdqXVL3B9OZV7F6HNyT3kjcpHi9xrj12a1TUKhzXI6zc+SS9BB1tb871Iv8AeUhp2OlG6pcwOBnzxk1pra9NBjv9lLgYY0jHD1ry+pncwBXoEmprgmb1TecVnPuMvwAH0woxXeMe428mf//Z)![A memory structure changes from a free state to a state containing a field ID and pointer.](https://cdn.sanity.io/images/599r6htc/regionalized/ff9a8ccec31ec864fca1b76369531be6fa0f4320-4320x2880.jpg?w=804&h=536&q=75&fit=max&auto=format)

We can use a 64-bit pointer to represent both the pointer and the field ID.

We use some simple bit operations to fetch the field ID and pointer from the 64-bit number. The Rust implementation of this requires us to carefully manage the lifecycle of these pointers. Since we use reference-counted pointers, we have to make sure that the reference counts are updated correctly on `insert` or `get` to avoid memory corruption.

**Resident set size** is the amount of memory a process is consuming in RAM (main memory).

This approach resulted in marginally faster performance on the benchmark, and slightly lower memory use (about 5% less than the simple vector approach). We expected a higher memory savings since, naively, the new representation should be using exactly 20% less data. However, the memory metric we really care about is resident set size (RSS), which doesn’t always correspond directly with allocated memory and depends on the behavior of the underlying allocator and the OS.

We decided not to productionize this optimization for the simple reason that the extra win didn’t seem worth the potential memory pitfalls we were opening ourselves up to, but it’s always a lever we have in the future.

## [Numbers go down](#numbers-go-down)

Using a vector rather than a map to represent Figma files in Rust has sped up file load times for our users. For instance, it improved file deserialization times by 20% at the 99th percentile—the slowest Figma files now load faster! And this small change also saved us 20% in memory costs across our entire multiplayer fleet.

We’re always looking to make our multiplayer technology more efficient, performant, and easier to run with optimizations like this. If this sounds like work that resonates with you, check out our open roles—we’re hiring!

![Abstract digital artwork featuring colorful geometric shapes and the text "877A7A" arranged on a green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nG2U3VMaZxTGvQVMW5sJTW3SmjZX2pnEDCKShBiLTigqGCEq7LLALq4rIF8LAnGBgF9V22nSJpl+zTTepdPkrpf9234dMFo0Xjzzvu+Z9zzznDPnOT1mYYRjmNpn2IZJsJ3EOgifeZ/NEf5Hz/Hlg9AIVnGUftnJgHiPIWmGYTXADXWG6/EpLkbuYhHsJ4kWYZReYQxL2IG5K35CaF1wcVNcxKWl8Ed0dPUH9uq/8aT2PfFchVvLQfoiY5jfqbdK4wwm/HwV9/KhePt9wv5HAVxzTwn6/iTn/4PDxF/8W/ubN81D9h8/ZTGjcS02gaXz386g6iVaUZnJSnwiTWAKdxOKY/SH4kxMvyR+26DhyvLav8U/6havSk0Oqg0KxSyTq0Guxe7zUcSJLe2jupchZizzWcyNKXxUdo9ZdPCx5mGwtIonV0eWBBpLEr8vNHmh1GjpBVqVEs1ymbyeYz4lMSh7cObnaTzXUXeSXJUnOwrb6nvMESdXSvOM/5LA/2ucpe0ghR2dg9LPFLUqoXSMtJ6kXmzyOPuczNounhWFKV2i+bKMtpfm825Ck+jgUsrN8P4sD148ZOEgQPKnLMbmFkJa486yj9BalFJ2l7z6lszKIUFtnZmCxpNnFdTtdwpDxwrbIyCOMqC5mDYCaDsK+mYSwyiyqqd4lImS1JMYpW6FCdw5kY39PHJd5cqpHnYGd4SByDiBxCK6qlBf1Wis65QbBnprg8pmnUqzQaZaJLAWPeph7iG1H/MstzSuxo9KPjU2l6V7OMRvCfoesOb3kVNkMnqB9VqF8u4myndN7lcUvlTc9IlO7Nk56s+KqNup90tuo1e0Y10a5WvvMJPuEQI+L3IggK5E0Y0yc60qA3oYS9SJOWxnSJtGriXxF2UuR8/OYQc2LGEbF4O3+GLexo2wm3HRx6y2hHdD46ahcikzi0VydFrUdspQws/1+PT5TunGBcFOX+wOVuUb+lem+DTloU+b4oJ8F7N41Py2r9te7hUcpzx+LuHxFjGJ9lPb5OxmOQ//AbnaPvLaxzpaAAAAAElFTkSuQmCC)![Abstract digital artwork featuring colorful geometric shapes and the text "877A7A" arranged on a green background.](https://cdn.sanity.io/images/599r6htc/regionalized/e85478d82728490083efe8027723e309ed0cb3fd-2048x1536.png?w=2048&h=1536&q=75&fit=max&auto=format)