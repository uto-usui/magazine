---
title: "Keeping it 100(x) with real-time data at scale"
source: "https://www.figma.com/blog/livegraph-real-time-data-at-scale/"
publishedDate: "2024-05-17"
category: "design"
feedName: "Figma Blog"
---

At Figma, multiplayer collaboration is [central to everything we do](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)—from file canvas editing to features like comments and [FigJam voting sessions](https://help.figma.com/hc/en-us/articles/9359912208663-Run-voting-sessions-in-FigJam). Keeping data up-to-date across product surfaces is critical for effective team collaboration and core to what makes Figma feel magical. [LiveGraph](https://www.figma.com/blog/livegraph-real-time-data-fetching-at-figma/), Figma’s real-time data-fetching service, is the foundation that makes this possible.

LiveGraph provides a web API for subscribing to [GraphQL](https://graphql.org/)\-like queries and returns the result as a JSON tree. Like other GraphQL backends, we have a schema describing the entities and relations that make up our object graph, along with views that allow querying a subset of that graph. Through our custom React Hook, the front-end automatically re-renders on update with no additional work from engineers.

[![A flowchart on a yellow background featuring geometric shapes and arrows indicating connections and flow. A prominent blue circle with a recycling arrow symbolizes a cyclical process, and directional arrows guide the flow between elements.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB4klEQVQokW2S224SURSGNwcLjJRqlYQoWlNaL42J8RWkF30fEx9Br018Akv02rTMcc9QfAoTY3phgUJhmBkOpX66N+Ah8WIlM3uv/f3/OohECkInzXlzh7OT5wzdMpG3wYV9n4FdIZFZpoFg6i9jsor1f+gW6ZpVRu4W85ZALE6FfhB5eUZuidjLErp5OmaNnvWI0C0wcAz6dpGxl0EZ+DuGzhbnzRpjb5vrtkD8+Cy4OhXMAsFklTTxM8R+kUiW+Hq8i9U4pHl0yJdPSmCD0DUYu3limSLysoycEpG8xbS1+S9wraocK+ehLGA3Dnj5+p0O8/0BXatM19yjZ1WJVTt8QSxz9Ox9vpvPlsDFf4BKZOgWsI/qvHrzVofTeEHfucPAecilU9GVzFuCxM/RtWqcHT9FXLVvkPibWkWXK4VOWrRVYppvJw+QH+vID3X9rVwlflbDlPBMtcpPEbo5hraBiIO7dKwn9O17xF5Kl6DczVtZInmTSBqMPEO7VQKJn2HsqfO8Bq2nrczEnkBMgttc2I+5dMoaqBQVUA2lZ+0SemVmwZ+HCtYx9+nb1eVKrdboN/C6nWYaqBLS+kLB1PgngcHAqTKW2yzaaX2uYhKoNdph5FWYtzK6/6pFeji/gD8BIRnrVy99OxcAAAAASUVORK5CYII=)![A flowchart on a yellow background featuring geometric shapes and arrows indicating connections and flow. A prominent blue circle with a recycling arrow symbolizes a cyclical process, and directional arrows guide the flow between elements.](https://cdn.sanity.io/images/599r6htc/regionalized/cee52a026b27273eb188ca34f8314fd0c7ec154f-4240x2000.png?w=4240&h=2000&q=75&fit=max&auto=format)](https://www.figma.com/blog/livegraph-real-time-data-fetching-at-figma/)

Software Engineers Rudi Chen and Slava Kim share an inside look at how we empower engineers to build real-time data views, while abstracting the complexity of pushing data back and forth.

At the end of our [earlier exploration of LiveGraph](https://www.figma.com/blog/livegraph-real-time-data-fetching-at-figma/#present-and-future-work)

, we predicted that our next bottleneck would be ingesting all database updates on each LiveGraph server. While this was certainly a factor, it was just one of the many scaling challenges we’ve faced with LiveGraph. Figma’s expanding user base and increasing LiveGraph usage mean more client sessions, each of which is increasingly expensive. The number of sessions has tripled since 2021, with view requests growing 5x in just the last year. Conversely, this growth is leading to large changes in the underlying infrastructure: [From a single Postgres instance to many vertical and horizontal shards](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/), the database below LiveGraph is shifting and we have to keep up.

## [Building for the future](#building-for-the-future)

We needed a solution that enables exponential scale. Any iteration of LiveGraph’s design had to adhere to some requirements:

-   **Keep Figma fast:** Uphold service-level objectives ([SLOs](https://en.wikipedia.org/wiki/Service-level_objective)) about initial load times and updates—any new design must maintain or improve upon our current numbers
-   **Enable database scale:** Natively support more vertical and horizontal database shards without compromising reliability or performance
-   **Use multiple scaling levers:** Scale different parts of the system depending on whether client reads or query updates are growing
-   **Migrate safely and transparently**: Make incremental improvements without impacting LiveGraph users

We launched an initiative called “LiveGraph 100x,” a long-term plan to efficiently scale LiveGraph’s current read and database update load by 100x. This initiative forced us to go back to the drawing board and reimagine how we would design LiveGraph’s architecture from the ground up.

## [LiveGraph’s growing pains](#livegraph-s-growing-pains)

The [PostgreSQL replication stream](https://www.postgresql.org/docs/current/protocol-logical-replication.html) writes all primary database row mutations to a write-ahead log (WAL) to keep replica databases up-to-date. The stream includes row-level changes such as the pre- and post-image of a row, along with a monotonically increasing sequence number. LiveGraph re-uses this stream to deliver live updates. As a result, all LiveGraph queries hit the primary database.

Just two years ago, LiveGraph was made up of one server with an in-memory query cache that received updates by tailing the replication stream from a single Postgres instance. Our cache implementation was mutation-based: For every row mutation sent down by Postgres, the corresponding query result was directly modified in the cache.

![Diagram showing a system architecture with four main components: "client," "LiveGraph server," "Query Cache," and "database." The client is connected to the LiveGraph server, which is associated with the Query Cache. Arrows indicate data flow for views and view mutations between the client and the LiveGraph server, and for SQL queries and row mutations between the LiveGraph server, Query Cache, and database.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC0ElEQVQ4jW2TTW8bVRSG/V+wnShAHEc0aUkiJGgaVWIBQiyQilShFoRgwQ6xAjYsEKpUFNy0xb5jz8Qej+NmYnvmXscfSaEfUJqglpavqrHaQqECCiKbbnwfNBO7SSMWj869uue850jnvRFlxLt9pOjHWFeKwa4Uia6fGe166WRIcJbiya4UA72c+MPaPhEp4loZjyJFTPtiTHviqK5mPtTu6Q9Cqpn3tSde1VIkw5zddcqI64gy4igjhhRbBPcg+mI/yjxFPX8VaV0PUdYaMvcJUkwgRRQptnJ3EtnuNLBrwhm9PG/rlvObbjv3dcu5r5v2La3ME1oaU1oZUa2MIV3PDet6LqFVdqg3YXaAtj3Cl+5eVheeYtkcws/E8DIz1OfztJxfaTt/hjTsDspM4WUmkWKQlv0cFyqHuVg9wmrpeerZBJFWIcF6a4af117h2oUXWSmN456MsXhyGmnmqZfuIst/hahiB8/4jDNzEyydHuace5SfvjrFjW+yXF5+l4Y1SWR1YQ8/fP0yd2++SefaYc66z1CcjeLM7qdmFqi4v+OoTUpyk2r5NhWRwv50H6XUCOcr79D5doE739W4svIRzfyzRJr5BOvtg2xcOcT3F1+iYY9TnH2MhdQ0nlVgsfYH5uoDrJUHuO4vVI0UzuzTlOeGObf0OjcupdlYm2e98R6N+SkiyhigXUxyvjLB2fIYKjdE9fMotfQBZL5AuXoP0fwXo7nJonsb30xRS0/iZQZpFw9wyX+Dy+ptvii/QD03Em45tEogvBX7tplBFWwW3Xtk/b8x/X9YOnMHac0hjSmkEUVlH2fZTNKwRqlnnwhrQx/u9NG24DTKSuM5P+KWN3DLHTz7KjJ3DCmCLfd9GMSAvg97U+1kS3AvMvsWyjyGtI4jzePI3Mf4xmtIMfqw+W56P6UvtC0Y+EyKJFKMIcV4jz1IkQjfVJDzP4L/AW8ZwPfme0MmAAAAAElFTkSuQmCC)![Diagram showing a system architecture with four main components: "client," "LiveGraph server," "Query Cache," and "database." The client is connected to the LiveGraph server, which is associated with the Query Cache. Arrows indicate data flow for views and view mutations between the client and the LiveGraph server, and for SQL queries and row mutations between the LiveGraph server, Query Cache, and database.](https://cdn.sanity.io/images/599r6htc/regionalized/9a2555ec735ec5019904a844356eb90356769206-1057x705.png?w=804&h=536&q=75&fit=max&auto=format)

LiveGraph’s original architecture

At this scale, a lot of things just work. For example, LiveGraph’s implementation relied on a globally ordered stream of updates, a reasonable assumption to make when there’s one primary database without replicas. But Figma’s user base continued to grow and began to strain the single Postgres instance. As our lone database splintered into a collection of vertical shards, global ordering was no longer guaranteed—many database shards produced updates at the same time, in no particular order.

When the Postgres instance reached its capacity, time was our main concern. We had to quickly make a strategic change that enabled the database to scale vertically. We put together a stopgap solution to maintain the global ordering assumption that was deeply baked into LiveGraph: artificially combining all replication streams into one.

## [Vertical sharding woes](#vertical-sharding-woes)

![A detailed diagram of a distributed system architecture showing three instances of a "LiveGraph server" and "Query Cache" connected to a "dbproxy" and two "database" instances. The diagram includes arrows representing the flow of SQL queries, row mutations, and the direction in which the LiveGraph system digests database mutations.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADSElEQVQ4jWWTzU9iZxTG73/UZVfddzmLbruYTDJJF203s5h00jGx9wNQHD6Ei/IlyCC11wIGgiIK915A+RC004q2sXQ6KIhaaQe8o/C+z+QyYzLNLE5Oct5znnOS9/cwhFPJiFXoiFOh5zODioxtG35XCe75MiJiCfvmPK45BYRVoPeRD2LE6bN6XSEjTtGYO8HxI6vQjjGPdUcZ8+4KnJ4KQu4q6rYd9I0qRryCIadgyMoYjUMBYVVKWFXPhLCqxrxXfreFVeipqYC4Zw+W8AHMkUPMRxrIh+roekvo2xRcGaLoCgu4MIRxzaUw5GR6K8i4EXJkyMkaoyuP3m+5E0y465gNN2CNHMEbaUB+vouXoR2c+tI4sAjYtn6Jmv0btA0B9PkNem5P4cyVJK+nMxoz5HPk1piht6YMhnyOnhvykG0lhMUygq4KVsQKqs8UtKxZ/Dm/ioL1ayScnyLrvoemaRYXQpI2/VEcL62QS9uaxlzb46QX9tJe2IO+JUY7fA7FZyVIs1WEnVWsOqrYn8mjbZPx0pdC1TmBLdc97Lge4JXBjSsuRTuOBDruJHltzmjMVchLOoWntF18gjOvm/7FpaHaaoj4D+Fb/B3S4hF2g3toRSo4jW7jj0UJv/gcaDjn0GYl9CbWaZ/bxBtDlgx5WWN63iDpbvD0LMPhwhWkLT6DbVsNK74DPA8eIh5oYM+3i5PQDppSEXIgjogngJ/FIOrsT+hOJOl/wgYGpk1yI+Q05s3UOhmIEh24JGhTa7QrKChYS1h2VhAWq4g7K9gzq2hbc6gupPC9aMbnlm/xxcwjeFk7mmyMnsytohVYJf9a0hozYnVsZDrix1zRtjGPhFiB3VeDZaEOj68G1VnEiUtFIZDAV45JfDJ9H5+ZHsLCmnEsxOjf/hiaS1Hyj/4pOth3cOqCJ6YCop46ZpYamFo+gvhjA9lIHa2lMn7zbcBrFvFYmAQnGLHFhnDJp2nPksalfY0MTFsfg61fmHJVMRfYhyP4AsHAPkreCi7EIrrmTfw6IaH8XQgHTyVc/pAegz3kZNxy8v+td+flrqAiaylg0Z6H365CshfwYlrFgFdwPbmJV49jOH60jPMnSdxMZsczH1rvLflQK/tNgchFAAAAAElFTkSuQmCC)![A detailed diagram of a distributed system architecture showing three instances of a "LiveGraph server" and "Query Cache" connected to a "dbproxy" and two "database" instances. The diagram includes arrows representing the flow of SQL queries, row mutations, and the direction in which the LiveGraph system digests database mutations.](https://cdn.sanity.io/images/599r6htc/regionalized/3b1b4ab735382fc44d4be68f2e6f751f421f691d-1057x705.png?w=804&h=536&q=75&fit=max&auto=format)

LiveGraph’s vertical sharding architecture

Since there was still one ordered updates stream and one query pathway, LiveGraph’s mechanics continued to function as if vertical sharding never happened. However, we soon realized a few major limitations with this design:

1.  **Excessive fan-out:** As the number of sessions grew, we needed to provision more servers to match the load. But since mutations were sent to every server, the required bandwidth would soon consume too many resources, threatening to prevent LiveGraph from scaling.
2.  **Excessive fan-in:** As more database shards were added and the number of updates grew, so did the number of events processed at each server. At some point, this stream would be too big to efficiently process in one place, putting LiveGraph in the blocking path of database scale.
3.  **Tight coupling of reads and updates:** We only had one scaling lever—sizing up the fleet—which further worsened both fan-in and fan-out. There was no way to independently handle shifts in read traffic versus shifts in database updates traffic.
4.  **Fragmented caches that reduce performance:** Our caching strategy was wasteful. Different clients requesting the same views could connect to different servers, so the cache hit rate decreased as we scaled up the fleet. Since the cache was built into the server, it was blown away on every deploy, creating a **thundering herd** that was getting bigger by the day.
5.  **Large product blast radius from transient failures:** LiveGraph provides optimistic updates to power UX surfaces requiring immediate feedback from user actions. This interface provides a seamless experience by showing “shadow state” from user changes on the front-end and carefully removing it once the change has been persisted on the back-end.
    
    In our vertical sharding architecture, every database shard participated in every user optimistic update. The global stream could move forward only if each shard was producing updates. This meant that transient blips had outsized effects on users—if one shard was unavailable, all optimistic updates stalled (no comments could be made!), though only a fraction could have been affected by the particular failure.
    

In distributed systems, a **thundering herd** occurs when a resource is overwhelmed by too many simultaneous requests. The name is derived from the vision of a huge herd of bulls coming at you; there’s nowhere to run. On every LiveGraph deploy, all clients reconnected at the same time and hit an empty cache, thundering the database.

![A sequence of three frames illustrating how a comment propagates through a service architecture. The first frame shows a user making a comment, creating a shadow state in the system. The second frame shows the propagation of the comment through various services, and the third frame shows the removal of the shadow state, allowing actions on new data.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC70lEQVQ4jVWTe1PaCBRH+f7fYbczbXd127XFqmBEAZNAeASUV8iDkASQpAREQhB87dkx2tnZf8+9c+79zdybUoVHWuKGXnWJVluiNyL69ZiWFNOS1/SqdwnvqxHaLy6t6VWW/+eXW1ThmVTjfId5tWCombh9nXC6YB7ssHtrrHaIo5mYXQ3TCvC8DUMtZtCZY3cNjE4v4aNRjNXa0sg9k2pebLG7P3F1Fc+oEC0D7uMHxvYaR5/iGQ20dolr08H1YyZOjGsEOFqd7rWUcC+IcfUtzfOnN+FQWzB1NXyvSrR0iaMNYzvCNWf4Xh/bqtCyDMzRHe5gjWeG3DgatqnQtgys8ZJB7/5N2LjY4ugrwpnLdFxi4jWYTee45gpvcMt85jF0ZAr1ChfqhFZ7iWvdEgbuG1cVLhpjmur6P+FkcE+w8FE0iWJVxjJ8XGPF1FvzcxEgdmQ+CCLfRZfm1S0TNyKY+4gdiQ/CJd9Eh1o1opl7jzx1dkwWM07aZU6aFYbejJEVJULHv+FrrchvBZFyZ8xAX+GPYibhjKO2wudyhbruY3Q2b8KasMFsrXCckGbfpmV4jN0Vg06E1Vmi9cbklSvySotuZ4LZusPpx4xGd1zpLg3NwR6EyfnUhUdSpaM18omPlLUpHPe5zA5QC3Ouivc0CzGKMCGX7pFLa5SFG5r515u7p1EMEbMW+SMNMWNTyoRUMw+kKscPSOlbzr72Ofgs8uWTxNmBmxRr2R3FtEt6r8yXTyWEvx2qmV3CLw89Dv4o8fH3Iod/9pEPI2qZZ1L17Av10x2NS5+q0qdQ6CKdTqllHnj9oms5RK0NEEUd+Sygln147w+QSjo/hC6540ky6NWVqmf/SZqq5yFK0UPMucjv67++Ulve0lPXXCsr1PyGWvYJ5TimLATIeQ8h63B+eEPpKP4lfKFyvKNwECLsjxD2xxS/3VI9eUQ9fUmk6tkTqvCEevqcxJLSa3J/TTnd88jueQj7N4jfV0nkfwEDiox2KtvnYQAAAABJRU5ErkJggg==)![A sequence of three frames illustrating how a comment propagates through a service architecture. The first frame shows a user making a comment, creating a shadow state in the system. The second frame shows the propagation of the comment through various services, and the third frame shows the removal of the shadow state, allowing actions on new data.](https://cdn.sanity.io/images/599r6htc/regionalized/be6fdbdc25e7ffbb9c4ad7e2473f644ffde89e0c-1057x705.png?w=804&h=536&q=75&fit=max&auto=format)

LiveGraph optimistic updates power comments in Figma

These limitations were so fundamental that incremental fixes and optimizations would be insufficient. Fortunately, our stopgap solution bought us enough time to re-architect LiveGraph at a more foundational level. As Figma continued to grow and the database team began to [gear up for horizontal sharding](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/), this project became existential. We needed a new scaling plan—and soon.

## [Data-driven engineering: a new design](#data-driven-engineering-a-new-design)

One initial scaling strategy we discussed was to move LiveGraph’s query cache into its own service and shard it the same way as the database. On the surface, this seems like a natural progression. However, this meant that LiveGraph would have to know about database topology to correctly route queries—exactly what another service at Figma, dbproxy, does. More importantly, LiveGraph would be implicated in every database re-sharding operation, too much complexity for us to take on. This left us in an open-ended position with many architecture variations floating around. Our final design was motivated by a couple of key insights into the system.

First, we realized that LiveGraph traffic is driven by initial reads. As we dug into traffic patterns, we observed that the larger part of client data is delivered due to initial reads rather than live updates. This might seem counterintuitive considering that LiveGraph was created to transmit real-time updates, but in fact most query results never change after initial load. This meant that we could optimize for high-read traffic and afford to be slightly suboptimal on the update path without impacting user experience. Specifically, our cache could be invalidation-based without overloading the database, because invalidations on active queries are infrequent. To verify this, we instrumented our mutation-based cache to obtain a conservative estimate on how an invalidation-based cache would perform. What we found further confirmed our theory: Most updates only cause a few queries to be invalidated, so the fan-out from invalidations is limited.

The historical motive for a mutation-based cache was load: When Figma ran on a single primary instance of Postgres, the database was extremely sensitive to any spikes. Issuing too many queries at once could topple the database, so we used a mutation-based cache to deliver new results without re-queries. This was helpful at the time, but with database scaling, capacity is not nearly as precious.

An invalidation-based cache simplified several parts of the system. Caches need to be notified only about the possibility of changes to query results, rather than receive each exact change itself. Re-querying the database on invalidation always yields the newest result, so ordering of updates is insignificant and our singular stream could be broken up. Optimistic updates are also streamlined; rather than waiting for a change to flow through the system, clients simply invalidate and re-query the cache to receive new data.

![Two scenarios of a database caching system before and after a mutation. The diagram shows three database instances connected to a cache divided into two segments before and after mutation, with arrows indicating the flow of data between them.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADB0lEQVQ4jUWSWU8bZxSG/aMbJSHJTVT1BzRtSqjUotKGJhDapmAwAtOGpTgxXgLYMx7P5tm+2b7xON5CBE9l06gXR+/FefTqPUthKu8wTL4ij56SR9+TeIsE9lNS/xl5tMQgfsIwfsww/pJB9O2ckcEzIue7/5noG0bJY6byCwoTuYAMfsQztulpu1jqDnqrOFdH20X0NsnEEjL4Ad/cwu6U5mUpO3PG7uzgW1vk4SITeZfCOH1I7K1htt+gNg5o1/ZoVXdR6vtozb9xun+RBqsk/jqWMuvvozbKdJrluSq1fWz1gCz8mYm8P0v4iH70B4HdxOrU6LYqaBen6O139LpNYv+MLFpDhr8T9GpYnfqc+1y2Vkc4Z+Txr7eGs4RpVMR1bbq6ja4bWKaFrhlYhkMkOkjxijwtMhy4ZGlCKDyE7xKFPplM+JD3GGbrt4aD8AGtyw3Khwqlgy5vazaKGnDyj8Hevk7ltImuriKjLfLcJ4olYRSTJCnxXCV53+WDXGeS3qeQ+QscHq6y8qLB8qrCbtmgWvN4vaWx/IvCq99OqVaW0bobNFWVynubth7gBxJdDbio9dAuFYT9nHFyj0JfLHB2tsZmqcWfJYvTqkdbjTk8dtgsmuzt12jWV2hcrFGutihVelTbAsuWKE1B9Y1D/eQSu73CKL5LYZQ8JHA36Ro9dDMhjAcMBlOEyNH1GNtU8HsvcZ3XmG4P088R6ZB8MEXGIwInx7ctEu/FbcL5lZNtwsgnTnOm0ynX19eMhmOSuE+WGvTjDbKkiMx8+oMRH6+uuLm54eP0irw/JM/+2+H8bdJHiKDI+67PuZEjB1Ourq6JgxF6u49nGUixgfA3OddM6p2UuD/h06cb0nCMdpFid02y8OVnwwe4zgYn5ypH5y5eFDMaZriG4OKti37ZJPGe4zlrnDSblM8M7CBkPO7jW4LGiYnamDE/MUlnI6f3iIMlusYeHeOYMKyQyyqhe4rdOcYzt8iCJyTBIrpRQtWPEKJCnlWJvBlzhKtvk4mvmcg7/As3rpLHxpVoDAAAAABJRU5ErkJggg==)![Two scenarios of a database caching system before and after a mutation. The diagram shows three database instances connected to a cache divided into two segments before and after mutation, with arrows indicating the flow of data between them.](https://cdn.sanity.io/images/599r6htc/regionalized/8a0f9fe728cdf1b2ae2d68d9df4e85c5f4f7d06f-1056x705.png?w=804&h=537&q=75&fit=max&auto=format)

Fan-in before and after LiveGraph 100x

At this point, we had decided on a global invalidation-based cache sharded by query hash, but our invalidation strategy was unclear. Since LiveGraph sessions are long-lived, cache nodes need to be aware of all active queries and watch for invalidations on them. One could imagine that caches subscribe to these queries in an invalidator service. But eventually, this approach would fall into an unscalable pattern because the number of active queries would be too large for a single invalidator to hold. Luckily, with one fundamental insight we were able to make the invalidator service completely stateless.

After thoroughly analyzing the LiveGraph schema, our second key discovery was that most LiveGraph queries are easy to invalidate. To do this, we built a schema inspection tool that analyzed different query structures and their frequencies. We found that in almost all cases, given a database row mutation, it is straightforward to figure out which queries should be re-fetched. This makes it possible to correctly generate invalidations for all queries without actually needing to keep track of which ones are actively subscribed to, as long as invalidators are aware of the _shapes_ that queries can take (more on this later).

Systems where it is non-trivial to calculate the affected queries must be [designed quite differently](https://blog.asana.com/2020/09/worldstore-distributed-caching-reactivity-part-2), so this finding was significant. For us, it meant that stateless invalidators could be aware of both database topology and the cache sharding strategy to deliver invalidations only to relevant caches, removing the excessive fan-in and fan-out of all database updates.

This process taught us the value of taking a deep look at an existing system and letting its usage drive the design. Realizing invalidations are infrequent and most queries are easy to invalidate was pivotal, and we had to invest directly in observability tools to come to this conclusion. At the end of this journey and many, many design docs later (seriously, I saw docs named Livegraph 100x, livegraph-100, and Live-Graph 100x—is the G capitalized? Is there a dash?), materialized a new multi-tier architecture.

## [LiveGraph 100x: A new architecture](#livegraph-100x-a-new-architecture)

LiveGraph 100x is written in [Go](https://go.dev/) and made up of three services:

-   The **edge** handles client view requests, expands these into multiple queries, and reconstructs the results into loaded views to return to the client. It subscribes to queries in the cache and re-fetches queries on invalidation to deliver newer results to the client.
-   The read-through **cache** stores database query results and is sharded by query hash. It is agnostic to database topology and only consumes invalidations within its hash range. On invalidation, it evicts entries from its in-memory cache before forwarding the invalidation to the edge using a [probabilistic filter.](https://en.wikipedia.org/wiki/Cuckoo_filter) By keeping hot replicas on standby and deploying the cache separately from the edge, thundering herd is no longer a recurring issue.
-   The **invalidator** is sharded the same way as the physical databases and tails a single replication stream. It is the only service with knowledge about database topology. Upon a database mutation, it generates invalidations to send to relevant cache shards.

Put all together, it looks something like this:

![A diagram of a client-server architecture with edge and cache components. The diagram shows invalidation processes between the client, edge caches, invalidators, and database shards, highlighting the complex interactions in maintaining cache consistency.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPUlEQVQ4jV2TzW/bBBjG8x9t0g4gOFChSnBB4sABBEIggcQFGM3GDWkcuHHjUEZHy9gQ9AvQklQtHStUS1fno22+7diO4zh27Nhp4nw6adIfaos4cHj06H1f6adXet43dG0Rri+eM78y5sPNHuFol3C0z63ogNtbQ25vjf6nIbe2hoRjAxYiPcKRHp9FeryzNmRu+YzQtcVzXl4544vtJtF0mv1civ3jCgcHBoJgEs+7/JF12cl47BVdHmUqrBye8FDIEU3JPE6J7KZlvvnL4/WfxoReWJoS3gr4W9Sp6VFMPUZDLeIIZZxDEV2qki7WEHI1CkqVvXyCpae/s5bc5UTKUimlkApJ1gSLN38JCL16f8xycoTdbtPvSvidMv2Wi1+2aGY1DNVAUm2KUgNZM0gpBaK5OPvyMbptYOkiipRlLelcAV/6/oyv9kaITsDkbMJsdsbYH+DnajSTMqZSRy41ELMmqmoQl054mNi+hKqmhqnlkUtp1hONK+Bz3015dz1gMzvE602YTqeM/AGdUp1WvopXb1JVmqglG8NwSCp5VlO7bOefodY1qpUSR7ksy09t3vg5IPTagzF3dk6JZerotkPP9+l6HdqWS6vh4nltms0OLc/H93t4nTaG26DetHAcC1EzWBUa3HzUZf6HCaGPfhuwdSJSVncwjCRNvYab0WhkFXT1IgiLvGJjmDauo+HZEl5Txzar6EqWYrnMj0Kbt1YDnl+aEfokMiAu5nHqEVw7walh0kpXcNIyWrnKUbFGqmAiyRK55AOEJ1+SS69RkTOopQRGVeRY73Lnz+DqDj+NjEhqLQZ9gyA4JWh36UoWLfEiQQtZsahUPGpVmdT+1+xuvE06vkhNy11u6Foqda/P4rMRr9wfXwGP6wGz6ZTz2YzA63KaUnGPVBzdRilZSLkGpm5QEbcppO6hlfcwayKVUgJVKfC45PNxZMyL96aE3t8YsZEZkjEDMuaYI7mLIDQQUjaC2GHv5JTdpEtcbJNQXQSlQUL1OBBtnhxJbB5W+TzWY255yo2754TmVyZ88Gtw+S3/KTYiHLvwgIXYiIXov/XlfHzpF/2bkT7vrQ+YW55w/dtzbtyFfwCqaXMEwaJewgAAAABJRU5ErkJggg==)![A diagram of a client-server architecture with edge and cache components. The diagram shows invalidation processes between the client, edge caches, invalidators, and database shards, highlighting the complex interactions in maintaining cache consistency.](https://cdn.sanity.io/images/599r6htc/regionalized/641e96c46c6485cb37a7856532d7d1388de440c9-1057x705.png?w=804&h=536&q=75&fit=max&auto=format)

New architecture for LiveGraph 100x

This new architecture addresses all of our previous concerns:

-   **No more excessive fan-in and fan-out:** With clever sharding and probabilistic filters, fan-in and fan-out at each node is limited. Moving forward, we can increase capacity by adding more caches and edges without overwhelming node-to-node bandwidth.
-   **Natively supports database sharding:** LiveGraph can support many vertical and horizontal shards, without introducing additional complexity to re-shard operations.
-   **Caches are not fragmented:** A global invalidation-based cache reduces memory usage and code complexity. By deploying the cache and edge separately, we remove the possibility of a thundering herd event associated with deploys.
-   **Product is resilient to transient failures:** Optimistic updates use straightforward logic and are robust against temporary disruptions.

Over the last year and half, we have been putting this new architecture into production. Since we wanted to ship LiveGraph 100x incrementally, we first targeted the least scalable component of our old stack: the cache and its downstream dependencies. There were two central challenges we faced in this migration.

## [Invalidations: easy or not?](#invalidations-easy-or-not)

We previously mentioned that most invalidations are easy. But how does this actually work? Queries in LiveGraph are derived from our schema’s object graph. This schema evolves on a human scale, changing on a day-to-day basis with code updates, unlike the sub-second frequency required for generating invalidations. This means we can distribute query information to LiveGraph 100x services prior to users’ requests for them, guaranteeing that invalidations will be generated by the time they are needed.

For example, let’s say we wanted to query comments on a given file. The schema for this would look like:

TypeScript

```
type File {
  id: String!
  name: String!
  updatedAt: Date!
  comments: [Comment] @filter("Comment.fileId=id AND Comment.deletedAt=null")
}
```

Our cache essentially serves SQL queries—we convert edges between objects into SQL filters to query against Postgres. So the above edge from File → comments would give the database query:

SQL

```
SELECT * FROM comments WHERE file_id = $1  AND  deleted_at = NULL
```

Every un-parameterized query can be uniquely identified; we call these “query shapes.” If we assign unique IDs to query shapes, then a cache key for a query is uniquely identified by its shape ID and its arguments. For example, if we call the above shape `file_comments`, then the query described by `file_comments("live-graph-love")` refers to the parameterized query:

SQL

```
SELECT * FROM comments WHERE file_id = "live-graph-love"  AND  deleted_at = NULL
```

Crucially, we can apply this substitution in the reverse direction as well, when receiving a mutation from the database. Given the update:

We inspect all query shapes and invalidate any queries that result from substituting values in the pre- and post- image into the shape. In this example, we would invalidate the query `file_comments("live-graph-love")` by substituting the column value for `file_id`. Note that this substitution requires knowing only the query shapes in the schema; not the entire set of active queries.

JSON

```
{
  "table": "comments",
  "preImage": {
      "id": "123",
      "created_at":  "January 1, 2000",
      "deleted_at": null,
      "file_id": "live-graph-love",
  },
  "postImage": {
      "id": "123",
      "created_at": "January 1, 2000",
      "deleted_at": "October 3, 2004",
      "file_id": "live-graph-love",
  }
}
```

## [Hard queries](#hard-queries)

Not all cases are so simple, however! Imagine instead that we wanted to view comments in a time range:

TypeScript

```
type File {
  Id: String!
  name: String!
  updatedAt: Date!
  comments: [Comment] @filter("Comment.fileId=id AND Comment.createdAt > File.updatedAt")
}
```

This would yield the SQL query:

SQL

```
SELECT * FROM comments WHERE file_id = $1  AND  created_at > $2
```

We’ll call this shape `new_comments`. Given the same database update as before, what queries should we invalidate? Conceptually, any query with a `created_at` argument before or equal to January 1, 2000 could have changed. But this would naively invalidate infinitely many queries—as many as the granularity of our time system. It would be infeasible both to generate these and propagate them throughout our system. The space of queries with possibly infinite fan-out on an update is what we define as “hard.”

Let’s take a closer look. We can further break this query down into expressions and define these as “easy” or “hard”—in our example, it’s the `created_at > ?` expression that makes it “hard” to generate invalidations. So, our query has the easy expression `new_comments_easy:file_key = ?` and the hard expression `new_comments_range:created_at > ?`. Hard expressions are not limited to range-based queries; we have the following easy-hard breakdown for common schema filters:

![A visual guide differentiating between "easy expressions" and "hard expressions" in database queries, with examples of each. Easy expressions involve simpler operators and constants, while hard expressions include more complex logical conditions.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAABrElEQVQokW2RXVPTQBSG+fO9c7ziggt0bLH4B1BhQMEJFu1HaKljTdK0paVJNrvZDdl8YpLXyeKMOnjxzDnvvmeem90pWxrE8wGMlyb07grDAxuDtol+28SwM4feXUI/XClGrxcYdCz02wYGbUvl6+6ynu/PED37+rNsaeFOI6R7E4xOCD5+vsfJBcW70y3ent7h+Pzx7eJLjPMriTON4/0HV3XNPNMEPvVkPT1yIHb1P8K4M8XmJsD32wjjOYNuEOiGh8mcYbaRsNwcppOpfmIHGFsUN3aA2SbGwi1qMmJI98ePwqqloTycIrMZOBfwPALHceE4ntoDLhDHCaSMVe/7FIT4oJQhvI+Qp3ld/mCoXv0lrN5MUSwoQiFAqQ+fEEXAGKSUyLMMSZJAqJ7C9xshVblIs7o2/iPMbAoWBPAIgUc8EN8H51yJsjxHnCQIw1DdMMZAGQMXAlmS1tUT4cEExTcX0YaCr1yFuPVUTlyO1BOKZpfbAHLLIO8YYofjgUR1de2ievH7U5Rwb4jy2MLD5QrF5RKF9pSmK3vrf7lao+qt6+rIRLXbV8JflXo6rkWCTaQAAAAASUVORK5CYII=)![A visual guide differentiating between "easy expressions" and "hard expressions" in database queries, with examples of each. Easy expressions involve simpler operators and constants, while hard expressions include more complex logical conditions.](https://cdn.sanity.io/images/599r6htc/regionalized/065950e475b67820f31c666f419f575c9bb879e1-2198x926.png?rect=1,0,2196,926&w=804&h=339&q=75&fit=max&auto=format)

Easy expressions vs. hard expressions

Although hard queries only make up a tiny proportion of our schema—currently, only 11 out of ~700 queries—they are fundamental query patterns and we had to find a way to invalidate them. Luckily, we found that all queries in our schema are normalizable into `(easy-expr) AND (hard-expr)`, and we require this to stay true going forwards. Queries without a hard expression simply ignore the latter part of this normalization. This is significant because it allows us to _only invalidate easy expressions_, ignoring hard expressions altogether.

We do this by using a clever caching trick! First, we shard caches by `hash(easy-expr)` rather than `hash(query)`. By co-locating all hard queries with the same easy expression on the same cache instance, invalidations for the easy expressions can be delivered to one cache rather than fanned out to all of them. Second, we cache queries with a hard expression in two layers:

-   A top-level `{easy-expr}` key, which stores a `nonce`
-   The actual key, `{easy-expr}-{nonce}-{hard-expr}`, storing database results

Now, given an easy expression invalidation, we can delete the top-level key, which effectively evicts all hard queries sharing that easy expression. In the example mutation, this would evict all hard queries that share `new_comments_easy("live-graph-love")`. Note that this means hard query lookups have a layer of indirection—first we need to lookup the `nonce`, then use that to look up the query results.

![A diagram illustrating key-value pairs in a database cache system, showing keys with time-to-live (TTL) settings and their associated values, indicating the process of storing new comments and how old keys are cleaned up over time.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAABuklEQVQokXXMS28SURyG8X4ZKiYStiZu6saNGz9CuVmoJo1po7V16cKNN1qBllsXxsvCS6odKMYirSxKmhgTioJS6qhB6JzDDGATV48ZZpriwsUv53/exTPiWPbhSl7mwpMw00qOG7niv94MyRWZy25yPVNgfn1rsE0pCuce3eJkfALHko8RM3g6fYV55SlrH+sUqm3eVVsUam02vxzwvi4o1uWAeZt7odpi66tGcU/yrFzFv7rEqdgEjojHCo6tzBDLv6ShNjkQXVqaQVt00WQfqR8O+Y3W6Q9I4xCj94dy8wfX3qZwx4M4onbw7MoMifwL1O8qUgiE0BBCIKVJIuTx3elIdF3H6Br0+30+/dpnNp/EnZrEbNnBaeIbz1FVdRDSNCt4xPxrmnlLO6qjGwa9Xo9Ks8HsRhJ3eih4JjnFzUyafGWHUmOX7SN7ZUvDtEtpv0Lpm2VH/cyHnzWU2jbBbBhXKmQHY15c0QDnH87hf32HUHbBotwnuHqX0Kt7hDLh4902ub7IpdwDxtduM/b4Ks7ERTsY8eBYHGc06sUZD+BMBKw35uPEggdnxItz2d7/YzTuHzCDfwGO5t1ciGtXCgAAAABJRU5ErkJggg==)![A diagram illustrating key-value pairs in a database cache system, showing keys with time-to-live (TTL) settings and their associated values, indicating the process of storing new comments and how old keys are cleaned up over time.](https://cdn.sanity.io/images/599r6htc/regionalized/264e6f1da5a8a3b0e3b58b30ba8135d260b630a2-3316x1392.png?rect=3,0,3311,1392&w=804&h=338&q=75&fit=max&auto=format)

Cache key structure for hard queries

With this trick, invalidations flowing through the system only specify easy expressions, until reaching the edge. At that point, matching hard queries are re-queried in the cache. Since the edge contains user sessions, only the active queries are re-queried, removing the infinite fan-out from our naive invalidation approach. A [TTL](https://en.wikipedia.org/wiki/Time_to_live) is used to clean up old cache entries.

Like all architecture decisions, there’s a tradeoff: We get a stateless invalidator and fast invalidations at the expense of over-invalidating hard queries and a more restrictive schema. The former isn’t too concerning given our insight that active queries rarely get invalidated, but if the latter becomes an issue, we can loosen this restriction and build upon our invalidation strategy, thanks to our modular design.

## [Keeping it consistent](#keeping-it-consistent)

As you know by now, one of LiveGraph’s fundamental API contracts is to keep queries up to date. Because LiveGraph learns about updates by tailing the replication stream as opposed to methods like polling for new data, LiveGraph cannot skip invalidations at any point in the system. This leads to an interesting problem in the cache of juggling simultaneous reads and invalidations, or what we like to call the “read-invalidation rendezvous.” If an invalidation arrives during an in-progress read, there is no way to tell whether the result is from before or after the invalidation. To ensure eventual consistency, LiveGraph must re-fetch in either case.

Accomplishing this takes several steps. First, edges start listening for invalidations on a given query _before_ asking the cache for it. This ensures that when invalidations are propagated upstream, edges are notified even if they have not yet received a result for the query. The actual read-invalidation rendezvous is conducted by a layer just above the in-memory cache. This layer ensures all operations are synchronized (aware of each other) and prevents stale entries by upholding this important behavior:

1.  Operations of the same type can coalesce. For example, two concurrent reads on the same query key will join a single-cache read. This constraint is mainly for capacity, to prevent a frequently updated query from causing many database re-queries and redundant cache delete operations. However, reads should never coalesce to already-invalidated readers (see next two points).
2.  During an inflight read, incoming invalidations mark the read as invalidated and wait for ongoing cache set operations to finish. This ensures that new readers kicked off due to the invalidation will not coalesce to readers with stale results, which would result in a skipped invalidation for the upstream.
3.  During an inflight invalidation, incoming reads should be marked as invalidated and not set the cache, since they could race with the invalidation to get from the cache and setting the cache in this case would yield stale results for future reads.

## [Stress-testing the rendezvous](#stress-testing-the-rendezvous)

It was tricky to write code that satisfied these requirements. To test edge cases and ensure that the constraints are upheld under all possible operation sequences, we use multiple validation methods. First, we have a chaos test. Many threads simultaneously run reads and invalidations against a small set of keys to increase concurrency. This gives us high confidence before shipping changes to production.

Second, we use online cache verification to randomly sample queries and ensure they are kept up to date. This checker simultaneously queries a key in both the cache and the primary database, and if the results differ, reports whether an invalidation was seen or skipped.

As a final catch-all, we check for convergence of query results between our old query engine and the new LiveGraph 100x engine. This convergence checker helped us to migrate safely and incrementally, by first verifying the new engine’s correctness for each case before actually switching over to it. Because our old engine is much less efficient, this checker actually required a lot of fine-grained tuning—oftentimes the old system is seconds slower than the new one!

## [Lessons and future work](#lessons-and-future-work)

We’ve come a long way from the single Node.js server that we started with. Now, LiveGraph is made up of several services that can be scaled independently to match our growth. Notably, the invalidator service can scale as the database team adds new vertical and horizontal shards, while the edge and cache services can scale to handle increasing user traffic and the number of active queries. And scaling any single service doesn’t disproportionately increase the fan-in or fan-out of messages over the network! This is a huge improvement over our old one-piece toolkit of scaling up the entire fleet whenever load became an issue.

There were so many other details—like coming up with a safe migration plan to the new service, how we delivered incremental value, and details about our new sharding strategy—that Braden Walker, a fellow software engineer on our team, covered in his recent [Systems@Scale talk](https://www.youtube.com/watch?v=bnvF-IsQaUE), so check it out to learn more. LiveGraph 100x is an ongoing effort and just one of the many steps in our LiveGraph journey. We’re thinking about several future projects: automatic re-sharding of invalidators, resolving queries from non-Postgres sources in the cache, first-class support for server-side computation like permissions. If any of these problems interest you, [we’re hiring](https://www.figma.com/careers/#job-openings)!

_The design and implementation of LiveGraph 100x has been a huge team effort, involving everyone on Figma’s Web Platform team: Bereket Abraham, Braden Walker, Cynthia Vu, Deepan Saravanan, Elliot Lynde, Jon Emerson, Julian Li, Leslie Tu, Lin Xu, Matthew Chiang, Paul Langton, and Tahmid Haque._