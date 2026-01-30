---
title: "Improving performance with incremental frame loading"
source: "https://www.figma.com/blog/incremental-frame-loading/"
publishedDate: "2024-01-23"
category: "design"
feedName: "Figma Blog"
---

When we first built our [prototyping features](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma), we had one goal: Allow users to create interactive flows in Figma. From a technical perspective, we built a simple loading strategy to match. We’d load the entire document containing the prototype into memory before displaying the starting screen.

Mobile devices (especially iPhones) tend to have less memory than desktop devices, and the operating system would often kill our process instead of expanding our application’s memory budget.

This was reasonable at the time. But as Figma became more advanced, documents became larger and larger, featuring many pages and design systems with exponentially growing numbers of component variants. Prototypes multiplied in size and scale, while load times and stability lagged. Similarly, prototypes often crashed on mobile, exceeding mobile memory limits.

Incremental loading is a concept used to describe loading only a new or updated piece of data, rather than loading the entire file. By syncing just the update, processes move more efficiently. **Incremental “frame” loading** is a term the team coined to describe how we apply those processes to prototypes at Figma.

It was immediately clear that the sheer amount of data was the culprit. Instead of loading the _entire_ prototype in memory, what if we could _just_ load the content needed to display what was currently on the screen? With this **incremental frame loading** strategy, we could kill two birds with one stone, fixing both load times and memory usage by downloading and storing in-memory only what was needed.

## [Careful considerations](#careful-considerations)

Maintaining a smooth user experience at our scale would involve augmenting our multiplayer system to allow for piecewise syncing of document content.

This sounds easy, but what makes Figma, Figma—[multiplayer technology](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

, built in the browser, with a wide feature set—actually complicated things. And if we were moving away from loading the whole prototype, how much of the prototype should we actually load upfront? When should we load more?

[**Time to interactive**](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/#what-tti-measures) measures how long it takes for a page to become fully interactive. This is defined by the earliest time where the page displays useful content and begins responding to clicks and other user interactions within 50ms.

To answer that question, we needed to think about the experience of viewing a prototype. We wanted users to be able to interact with their prototype as quickly as possible. To start interacting with the least amount of screens required, we just needed the first screen and any adjacent screens that could be reached by a prototype interaction. So, the **time to interactive** should just be blocked by loading this subset of screens. When the user navigates to the next screen, we’ll load its adjacent screens, and so on!

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAG5poABueUAGuhYesAAACk0lEQVQokUXNXUhTYQDG8XMtpE5LE6ywzIgitcjIrhTULS1LWWZ2kSQGXlhpNllSUlYWhtmHbqXbzBEzxEQUbVva5tym+3Bn57ikYOXXxDSzsbOdnXPe9425i+B3+fx5sAQp2CkJie8AiRIuTUZn9fizlVSGIrBbyiZKuGOKQJaSyuqh0uX0rjdcfMfWXgoSpACLkQOeLCS6C+zpZi4Nbj7XrUgnlus+raW+DxxW0tdH19snltt0nitDG/t6mOitMU8GYuQA26YC21SAp2JjVcz+Prri83qnZVFhWxDpV48M+A99DNTo1mTWxS7LQtXY2sH+QGwvy+vlIrcqLGIQbB9iTqi9wvGVqzq32OQWTy0V6TfSNVTcMLtjmE3T+M/p/tSblxrM7gqdWzi+kqnxxg0xEYMAi9KAvePBatvqyNepaVf/pEv9Gp87NeHlaUGkFkZpIU8LMvS+VtxtmBubnu0bJQ11tuWUL3SUBmBJBphqYm84f6u/221zA0bXyFvSVWDxHjDCZCNKNqIUI+Rb/K9c8/pvOourTz2rFzk8R81MkgFix63opA0W4bRodv0hOf+A+Cl2/Ko0BUr14MIkCtGB8slgrWPzDuG5i/+odXiKZ3yZNpBhRVg2jrJxlOOEhQRX4mQuk8EqU7BByT7qgK0fUIsKNr7k6mXsNX2wdCYgtPsLHXQODsIVlkeiMD4J+QQ8Q8JyPRQ3w2e34Lt22Pki2FRNiRrpSjVTZveVWP+et1P5OCNwAj4B/8d5JMolkYBEZWZ0Ww6ftkBJN2hTUPeaN2okVLmBKXX6L854i+2+s45AAc4ICIDlEigsL4xEQie6OYWaDOiJGT42s/cNdI2ZLcFBAcnlE2y+kzvt5ARE6Pkf22a72rZaKKIAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/7f23901e3947fccddbf2d7524b9693eb07983a56-1608x905.png?rect=1,0,1606,905&w=804&h=453&q=75&fit=max&auto=format)

User starts viewing the first frame; we pre-load its immediately-reachable frames.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAG5poABuWgAEhrhMLAAACmklEQVQokT2NW0hTARyHz7OgNs00sGBIFBXUkBR808o5Fc3MJZUXejC0WobZU72YRIURIqiHmsvUPJr31KUur5tRbmc7l21eCmdi3sY8m9vOLud/Tiwh+B6/3+9DjqIQh0JcM8Q2QXxzUKJyX2zfvdyxk9TKHEf98c3BxPdsarsntd0jUfmOoVxsU0iOQ+EoCkhUC4hUIGqBQ0oQt/lLRzffzf34qJ1+MrEk6XSf7WAVX+yNcxv1s39Khx0JHwKRypAsUkGUCpBwDCIwiMbgSCec7gkopjZ7DLpBg7pGS0oGXWf62Yczu0r9ulK/Xj5pP9Xri8Y4EcZFYBCOARI2BDGDkIjxsja+EOMUXZ7qge0bE+vJGnvsiC9mJHhu3Jsz7aya36nW7RRN7V3ROJPHPDHDwbAhQCI1fIKal78Vat/wDWjw2XNf2Uv/hT7u8FeI1IQQaSBx2lu7sPWZtKlJWzexpvhuPzHpj9QAItYJ52eEWx18XWMAVe7XvGLKX+9fGg6c1IFYC2Idn6CF1G/sC9P2gPm32mz7RK9X4g7JfFCs45EkvZCywOfOQuU4+3Tc9WiEeaDeq9A5ig1713DmKs7IcaYE37tnYqoI5jHB3CdceUZfip5P0gtIGiGkEYKU4PONgSIDW2zwVhodKG3rs5r7F+d6rZNdi0SDde0OyRTgbIHRm2vypxNwsELSaSGdFqSUIKV4GQUykrttdreubOC/9KvLLTZrPbk01rn0s5xyyg3u6wZnHu7JIgIZJEgpHpHSwn9CR5QgN/trlx2dK8ujVvUY3d1vnq2zrJbQbjnhLTS68nF3jonNJgIZFCDpVGhwwL++kE3DTQtbZnFWWHbv0psV9Fax2ZljDmZSXBYVzCK5TJKTUaHyX284u7Mm8kJ8AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/f091d9a4762c53016e86c4d1a566c8e40a211552-804x452.png?w=804&h=452&q=75&fit=max&auto=format)

User navigates and views the next frame; we pre-load that new frame's immediately-reachable frames. We also keep the first frame loaded-in still, because users can navigate back to it.

Another consideration was that Figma files can be updated in real time, with any changes immediately synced to all active viewers of the document. This makes it easy for designers to do things like view a flow on its intended device while iterating on the underlying document on another. In our previous system, real-time updates worked by associating each file with a real-time datastore on our servers. To allow clients to load only a subset of a file, we added support for querying specific parts of a file.

Queries were made real-time by specifying a protocol for how the database would communicate with the client, given changes in file content or client queries. At a high level, this document syncing protocol looks like:

1.  A server session starts with an empty subscription. A client requests a `query` message specifying the subtrees in the document tree it wants to subscribe to.
2.  The server responds with a `reply` message containing a snapshot of the subtree, and confirming the `query` is fulfilled.
3.  After the initial response, the server will sync down any subsequent updates to the subscribed subset via additional “`changes`” messages.

#### [Here’s an example:](#here-s-an-example)

-   Client sends a `query` of `a`. This means “subscribe me to node with ID `a`, all of its ancestors, and all of its descendants.”
-   Server sends a `reply` confirming that the query for `a` is fulfilled along with the contents of the query.
-   Whenever these nodes change in the future, the server will send more `changes` messages.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADL0lEQVQ4jWWTy28TRxyA54DCgdT5G9p7e2j/hLYSElIs9SEVGmLv0+t3nDh2CFI5IrV3hAQXKrVw4QiNBJWcNGoS6iYm9np3dnYeO/vwOoH8A8Q71VqoGDHSd5jLp9/MfAMAAIBCGRBLAsRSFjhS6hEr+KfBmjiLb4izUU2M/YIIiCZCookx18XZyBCvo2IQc73BHHnBdxWQ8v+i0JhCbD3joZWKj9dJyG6KEb8lYr4hQtoQPm6IiNXFSVAUp0FNjLwmC8hK3ZsKJeChwjshscuAwjJwh1qGoY0Ktjfd425FdPcKEzhYT5izkTDUThyznhwe5CbDXklQ5yZhqF1jjrQQkjxgTvGd0EP6FGRKmZFXrYakQo8OlsXO82vC7K0IH7eSmNcT19TEzp8/iO6eLrB1gzHUqjMoLURUel+Ynp+7CiC2ND/29aunQeGpj5W+9VIZHL2oke5eOR4c5mNk5qjTlwbIrPZda3ML260fmSPN+zgPKJyd0FEAg3LKnI/VTyOmLb0K9aJ9LK399uC7Oz/fvrz1y+0vt35/cOXusJdbi1i1RODqdWzXPmOOPOehVKjP3KGVB66ZB9iS5oiV/5w5khGSQhuZ6k/Pnnx/79f7V57eu3P5j8ePFu8fd5dujbnWfhVoRszULxiUL3L0wSunx5UBtpR5jrTlgBR3ItZgIVunHikFrq3EyFRiD2nBiV+gJ5HBQr/wF6dankH5o1TG0HvC4hRsaRkPrVY91KIUtgS0m+IQGqLn6AnDjST2VkXkGQISVexDxfvHkqfZxEQFEMqzwtLbbNSM57YrBG7g3gtDbHeWJ8+7crJnGsJ11oQzqCf7u0uT7YPr4tlLje4OtFoqHFMFDO2ZCTnSprimlBnzSnnEyqj/b26y27n25vCoco6cxnnkVc+JpZ3/3bn65mBfnfTNJrbhajXNZkRkgOFM2GkyHMlpNpfGXPvmNNQfhlTZxpbewVaz46FmZ8yLnTFXOwwqHWzVtom9+YjYrW+ZI1/6IJv0L1N7KrzgIeXjAKtfRUzLhlRfpLCUxXYxy910r2Yjpi1y18i6VvlrNCx+Qm3pAoM5gC11KvsPmsVgAqksKZUAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/4a9f2edf534888e8fed22e7ee1e2ae77f80e352c-2160x1440.png?w=1080&h=720&q=75&fit=max&auto=format)

We start off with the client subscribing to a subset of the full file represented on the server (a, b, c, x). So when a property change is made to c, the client receives a message about that change.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADOUlEQVQ4jV2SzW8bRRjG54DCocH+H3qGC/wN9EIlIohUqtI0nv2ys7bXjpukVntAcAMJIdRrD/QCqL1UiEKQUeJQQ9I0H4692Z3ZnY/dWe96Sa1yb+xBGwRxeaVXoxnp/emd53kAAAAwBAF1CoA6Sj70FCvmhjiJGnI0bMpRUpVDocuIanJANZmGuhwlRfk8LkZJoNc5hnnhKyD0FfBfMVQ8a+rqucCrlUOyQmN+W4rgjuwTU/Y8TTLfkklQk6koSRJoct9T+QFSrADDfEIUgBE8B1LXBAyZwD/Wcty7VSZu0+/tlWWno4xbe3DypK9PPHRz4tu1yd72wnhrd0GudxXa7ivVDPgnU4HtTAEDTz9rzy7kkqBSiWiZHewsyI3WR3J3rySRV5vEQXXi25pst67ITgfKw36NH7uWxRHMJwwCH+nnwH81oG5hNhX61ZOB8VgQpYd76pF9UEeHTyuR04UDjgvIP4ZHnl3pEef2z9Rdu8ZxYVaQRcBQaWpDDAFHMDNnRhD1zZhr104ioxRzY+mXx9c//frL9x7c/erSw19/mv9sQDVzwMolimofE7fyFseFmdDLgFMbZg779mJ2zhBn8e0AQyMNtbVUFNee/Q4///b+hw++uXf54cb6/BfUhbeGgbmWhvVizKx3OIKvB1gBoWdMu5zFBgLiFGZDX1tIAqN9EhksFSYNaDPw3ZWYOEYS+mowoBqN+DIL2Se/cXJnkSP1jUx/hsuvxoa6BvBsmBNkuSJIg6GeJnd3bsg/upbsohUZsobkqCwPnt6Q288M2emvBrvOTYshJS+IDlx3SkOKTEDcJYD7Si7wm2WKmmR/W5Xr61fGPzxRJu1uRXp4RaIja7LZujr+ceO6fLSzRFuHZpUimI+ICo6Otf/FBuvZt3MxL5upqHoDaow9R3vZ7ddPbWf5dMCrp8PQPGVIfWnb5ni/t0q6/UaFY+UMiN3iOTCLTOgpmdMXhoH2wSg2vvsrLW6NEnMz5o12ROrtVBTbL4ZG+8WwtJkKa0uQ1e85Xp7nWLnwz+wUMDOFuTDL4Wuhp1wURH03IupcRNT3BdHmQl+bE9mdvvJ2iWP1YjbD3MIZI6u/AeuuX2FRoUuMAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/70a0dbc1bae579368c01e7d077d38cad3bb7e1fc-2160x1440.png?w=1080&h=720&q=75&fit=max&auto=format)

Next, a change occurs that re-parents node y underneath node a. Since the client is subscribed to a, the server sends a message that informs the client about the existence of node y under a.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADR0lEQVQ4jVWTTW9bRRSGZ1GFRYP9G2DfDfwFQAihWoJKyCIk9v2y70fsxHETpwSJInawAAmWbGBBJcoCIT4iKmKD2kZpguPP8cydmTsz915fO2ngBzT2ICcSMUd6F2fz6D3nPQcAAECANMBgHrBBPi19vZxwKzwbFtTZ0FOj8I6KeU1FtKgipquEW2okK2ooPozCYGddYCMdkgIQvgf+K44KgA0sQPpaKqRlL2LrjEJLtZua+qtXUV28qQRdVxw7qtvMqWbLUYfwDj9GtTLHejokFsDIuQKygQsodAHu6ilBtj2GtsnRY0Pt7r4z+fGhMW20S1Mf354O2uXp3m/ZyU9776kfnrjsQcsrsYGWlsQA7b55BRS4ADi2AIVaKg7Kq4lYCwS2VK+lq8NWWXVgZRrxtekwcBXuaqrZstV+q8qPOpVLh9QACBavgJLoQPr6bJeLI2llz4bFn/8ZFTsnkdMmsIyOn9gRbOXjhJvoLLHbiSh3uL/5K0Mb7wqsL4bEAAGaAwqsAT4T0hZCatxIuLn0NCo4I265e7vZj778/PXvvvjstfsPfrn1cUQNdySKTsycpZAUb3CsLcwMCd+Y2yHMAdLLAdLPLTCYe4njfJFTo8aoUTt4lP3k3jdv3v/6qze+/3331qcU5mojYdROQqM45PrLHGnPzaaTvnYFDJAO2EADuJ9fDIm1LGjhj7Zv8kPfZJzbQvqFhEIjCaklT6MC+ztx+NPY+zMRdo4j7XlJNDALZg5oXwj39ZT0N1apXw32O0XV6JiK8aoah1sqDqpqyNfUSNjqJFpTp/H7IhGbZYG1dEjyQBJ7HuiAALnA7+kpSWoeRTW6v6+rvcbyBPU3p3HwgZJ0S6FuaXrwcHnSP/ZUzO8GQ7FT4iifjugKkMSdS9k3L0R6+dRYem4iPL9ztDJ53Fh6BtuV85BunY9k6ZxC8/xRI/useVCcBHiHSlJbvQCyHOB4zuHl2Wiz17s+luZbp7H1bcz0BoVmncCNOsfV+lja9bE06xzpdQJXGwRu36OD229zrF0Pae7/ZzP75WBwAbwmfP2FiBqvDLmZiQPrZoDcDBs4GUlmvZFJuHlTEjtDofcq6TsvBoP8NY5WAIWXofwLMS9hA7MchesAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/464fa6aebde33d43e7953ca4f902d8d2eab4d21d-2160x1440.png?w=1080&h=720&q=75&fit=max&auto=format)

Lastly, c is re-parented under x, and the client isn’t subscribed to x's descendants. The client receives a message that c is removed.

### [Other noteworthy dives](#other-noteworthy-dives)

The above protocol is the heart and soul of our incremental frame loading scheme, but there were a few additional details needed to support all files and cases. Here are a couple that we think are the most interesting.

#### [Dependency edges](#dependency-edges)

Some objects in Figma have properties that need to be inferred from other objects. For example, instances are copies of their backing component: Whenever the backing component changes, instances need to be updated as well. Similarly, consumers of styles or variables need to be updated when the style or variable itself changes. To support this, when a client subscribes to an object, our protocol also subscribes them to its dependencies (and any of their dependencies, transitively).

To make things more complicated, dependencies can change as the document is edited: Nodes can be reparented, can switch the style they use, and so on.

-   When new dependencies are added, which weren’t already present in a client’s subscription, the server sends `node created` changes, so that the client learns about those nodes.
-   When old dependencies are removed from a subscription, the server sends `node removed` changes, effectively allowing the client to “evict” those nodes from memory.

#### [Changing subscriptions](#changing-subscriptions)

As clients navigate through a Figma prototype, they change the set of nodes they are subscribed to. This means subtrees become “unsubscribed,” too, as the client navigates. What happens if a viewer unsubscribes from a node, but then re-subscribes to it later on? If the affected node is updated, or even deleted, during the in-between period, the client may end up with stale nodes if we’re not careful. By always evicting unsubscribed nodes from memory and making sure that the server sends a fresh version of those nodes down on re-subscription, we can ensure that this never happens.

This is also important for keeping memory usage low, as we’ll see below.

### [Optimizing the prototyping experience](#optimizing-the-prototyping-experience)

This new protocol for syncing Figma documents made it possible to incrementally load prototypes while still supporting real-time updates. Now, all we have to do is to hook our clients into this protocol to deliver an incrementally loaded prototype experience. We designed our shiny new client strategy with the goal of reducing memory usage and load times, while also preserving existing, snappy navigation.

#### [Reducing memory usage and load times](#reducing-memory-usage-and-load-times)

Incremental loading allows us to subscribe to the minimum amount of screens needed for the prototype to function properly. Remember: This means that we only need the _first screen of the prototype_, along with any _adjacent screens_.

Next, we want to make sure that even as a client navigates around the prototype, they don’t accumulate unnecessary data in memory. We make sure that clients evict any screens that aren’t directly subscribed, so clients are constantly cleaning up unused screens as they request new ones while navigating prototypes. However, as we’ll see in the next objective, constantly allocating and evicting screens was at odds with maintaining a snappy navigation experience.

#### [Preserving the existing navigation experience](#preserving-the-existing-navigation-experience)

Reducing memory usage doesn’t come for free! Since Figma clients now initially load fewer screens, this means we need to repay that price later—when users navigate forward and need to download new screens. Recall that our client strategy only loads the screens adjacent to what someone is currently viewing. This means that if users do two quick navigations in succession, they’ll need to download more screens and will hit a loading spinner.

So, why don’t we just keep loading more of the prototype in the background? Well, this is a direct tradeoff with one of our primary goals, which is to reduce memory usage on mobile devices. We’d eventually end up loading the entire prototype and crashing the application again. To solve this, we decided to fork the behavior between desktop and mobile devices: On desktop, we would continue loading all screens in the background to retain fast and snappy navigations; on mobile devices, we would load screens as a user navigates, evicting old-enough screens to ease memory consumption.

Another hurdle involved lock-ups caused by processing loads in the background. With incremental loading, a lot of things happen as a user navigates from one screen to the next: Our renderer plays animations, we compute metadata about the new screen, we pre-load and process yet more screens. In tests, we learned that users’ devices would often lock up amidst all of this work. Animations and interactions weren’t running smoothly, and this wasn’t up to our standards of quality. This was challenging to solve because Figma has to run in the more-or-less single-threaded environment of a web browser. We couldn’t delegate processing of loads to a worker or otherwise leverage parallelism because we needed to read and write state only found in the main thread.

To mitigate the effect, we made broad optimizations to the prototype experience. First, we split each incremental load of the file into smaller chunks, which could be progressively loaded in the background more easily. We then skipped the computation of rendering metadata (such as layout and boolean operations) if they weren’t being shown to the user. Along with other targeted optimizations of expensive flows, these drastically reduced the amount of CPU lockup that our users experienced.

After careful planning and deciding which tradeoffs to make, we shipped these improvements to all of our users. Since then, we’ve been happy seeing not only the improvements to load times, but also the reduction to crash rates on mobile devices. Much like other engineering work at Figma, we prioritized the user experience, embraced the complexity that comes with that, and invested in creating the best architecture to fit those needs. If this sounds interesting to you, we’d love to have you [come join us](https://www.figma.com/careers/)!