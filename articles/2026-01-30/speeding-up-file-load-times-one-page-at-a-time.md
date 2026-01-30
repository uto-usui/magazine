---
title: "Speeding up file load times, one page at a time"
source: "https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/"
publishedDate: "2024-05-22"
category: "design"
feedName: "Figma Blog"
---

May 22, 2024

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAgYH/8QAIhAAAgECBQUAAAAAAAAAAAAAAQIABBIDBRE0cSEyQVGB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQQFBv/EABsRAAICAwEAAAAAAAAAAAAAAAABAgMEBREh/9oADAMBAAIRAxEAPwDq7ZYUYHTqPcvh0avor2XnxbG1TujxJpt9g/Znadhc+elt5k1JiRsqa46AgQmmfvPMIHtLkxpZcz//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/d206f80b8a4fe5e715db009d9a87227087179588-6528x2796.jpg?w=1632&h=699&q=75&fit=max&auto=format)

Figma files are often large and complex with endless pages, library and local components, and prototype screens. Here’s how dynamic page loading improved the slowest load times by 33%.

Illustrations by María Medem

1.  [Understanding read dependencies in our data model](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/#understanding-read-dependencies-in-our-data-model)
2.  [Building on dynamic loading for viewers](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/#building-on-dynamic-loading-for-viewers)
3.  [Untangling write dependencies](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/#untangling-write-dependencies)
4.  [Variations on a theme](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/#variations-on-a-theme)
5.  [Our decidedly dynamic approach](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/#our-decidedly-dynamic-approach)
6.  [Validating dependencies](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/#validating-dependencies)
7.  [Performance in practice](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/#performance-in-practice)

For the slowest 5% of page loads, we’ve seen a 33% decrease in load times.

Every engineering team wants its product to feel fast. Beyond giving users the best possible experience, how quickly something loads fundamentally shapes their first impressions. This is especially true for us; users often spend their whole workday in Figma, so incremental performance improvements that save seconds add up over the course of a workday. As Figma’s product teams build more features and users add more content to their files, our platform teams strive to uphold and improve performance. Our ideal load time trend is _down-and-to-the-right_: We want file load times to decrease over time even as files increase in size.

Performance should correspond to user-perceived complexity. If a user loads a page with only a few frames, Figma should be able to display their canvas almost instantly, even if the file has dozens of other pages with hundreds of frames each. By examining usage patterns, we learned that many users were treating files as projects—using one file to house all aspects of a workstream—so most didn’t even navigate to all pages in a single session. We realized that we could drastically improve load times and reduce memory by dynamically loading content as needed, rather than populating all content at once.

## [Understanding read dependencies in our data model](#understanding-read-dependencies-in-our-data-model)

Dynamic loading as a performance optimization isn’t a new concept, but there were a few unique challenges specific to the structure of Figma’s browser-based files that we needed to work through. Broadly, a Figma file is a tree of nodes, in which each node is an interactable layer with properties. Importantly, certain nodes may reference nodes on _other pages_. This means that there can be a number of cross-page dependencies between nodes—from the more obvious to the very complex—that we had to consider.

In Figma’s data model, an instance contains a pointer to another node, the instance’s backing component, which might live on another page. We refer to this edge as a _read dependency_, in which the instance has a read dependency on the component. In order to render the instance correctly, the client must first download the component’s node.

[Components](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma) are elements you can reuse across your designs. They help to create and manage consistent designs across projects. An instance is a linked copy of the component, automatically receiving any updates made to the component.

In addition to components and instances, many Figma features involve read dependencies. For example, Figma implements [styles](https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma) as user-invisible nodes. If a frame utilizes the “BrandPrimary” fill style #FFD966, in order to render the frame, the client must first download the corresponding style node. [Variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) are similar. If a node applies a “text-subheader” size variable to its font size, the client requires access to the variable node in order to resolve the correct raw value (e.g. 16) for the font size.

## [Building on dynamic loading for viewers](#building-on-dynamic-loading-for-viewers)

Past iterations of dynamic loading for view-only files and prototypes allowed us to work through these challenges. We created a dependency framework called QueryGraph—represented as an in-memory graph of edges between dependent nodes—the component of [Figma’s multiplayer technology](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/) that keeps track of which part of a file to send to connected clients. QueryGraph and its graph of read dependencies were the foundation of faster file and prototype loads for view-only users. In each case, the unit of dynamic loading corresponded to the type of content that we render on initial file load:

-   **By page in the Figma canvas:** Instead of loading the entire file, Figma starts by only loading the selected page and loads additional pages on demand. Using QueryGraph, Figma’s multiplayer system sends the requested page to the client, along with any required read dependencies on other pages.
-   **By frame in prototypes:** Figma loads [dynamically by frame](https://www.figma.com/blog/incremental-frame-loading/) for prototype viewers, where it only shows one screen at a time. Figma also preloads frames that you can reach within a set number of transitions from your current state to prevent noticeable lag. Again, QueryGraph takes care of ensuring the client has all of the requisite parts of the Figma file and nothing more.

While viewers were reaping the benefits of dynamic loading, 70% of our daily file loads come from editable files. We wanted to build on our success with dynamically loading prototypes by frame and view-only files by page, extending that same loading logic to editable files. The challenge was ensuring that changes propagate correctly across unloaded content when an edit affects components on pages that haven't been loaded yet. To ship this optimization for everyone, we couldn’t simply reuse the existing logic for read-only clients. Enabling dynamic loading for editors required extending our dependency-tracking system to support a new kind of edge.

![Three rectangles showing three different iterations of Figma's loading logic.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMBAgf/xAAeEAACAgICAwAAAAAAAAAAAAABAgADBBExQRIhUf/EABYBAQEBAAAAAAAAAAAAAAAAAAUDBP/EACARAAEDBAIDAAAAAAAAAAAAAAEAAgMEBRESFDEikbH/2gAMAwEAAhEDEQA/ANZwsSu2ixnUkrxFZWLUor0/iG7P2LW61PSWFVPIEVcrWKA7k6Mz6VXIMm/jnrJ+dJmK0xMwC0egpWsgaJBI7EJdAFUAcCEUFQ4BQdY4ySV//9k=)![Three rectangles showing three different iterations of Figma's loading logic.](https://cdn.sanity.io/images/599r6htc/regionalized/514c689ab1d8c89987d2ba14fe0bcffb9871b0ca-2480x1654.jpg?rect=0,1,2480,1653&w=804&h=536&q=75&fit=max&auto=format)

We've evolved loading for prototypes and view-only and editor Figma files to load dynamically by frame and page.

## [Untangling write dependencies](#untangling-write-dependencies)

While viewing or rendering parts of a Figma file requires read dependencies, writing or editing parts of a file requires write dependencies; in many cases, a write dependency is the inverse of an existing read dependency. This is because Figma caches the result of expensive calculations like the text layout algorithm. If the style changes, Figma will run text layout again and cache the derived data result so that it’s always ready for rendering. For example, if a text style controls a text layer’s font, that’s a read dependency from the text layer to the style node. And the inverse is a write dependency: The style node has a write dependency on the text layer, indicating that in order to safely edit the style node, Figma requires the downstream text layer.

This is critical for supporting dynamic loading for editors. When a user edits a part of a Figma file—like changing the text style—the client must have access to all of the downstream objects that require updating, like the cached glyph information of a text layer.

Here are a couple examples of write dependencies in Figma’s data model:

-   A component has write dependencies on all of its instances, which may live on other pages. When a user edits a component, Figma needs to propagate and update caches on the component’s instances. The same relationship is true of text styles and variables.
-   [Auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout) means that editing one node’s size or position can change the size and position of another node as well. This is therefore also a write dependency. With components and instances, this auto layout write dependency might cross pages. (For example, an update to a component on one page can result in an instance resizing on another, which may in turn cause the instance’s siblings to resize or be rearranged in an auto layout frame.)

![Two button icons, one named "component" with a solid border, and another named "instance" with a dotted line border.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADI0lEQVQ4jU3R7U9aVxzA8ft37s3WtGk13Wy3JrPOadqlKA/eexEVvIAFE+d8aKdW4CLa+bC6xUo1FbclTdq1C/Igl0sF7j2ANt8FMctefPI9v19Ocl4c6e1qBGN3lLN9hcqujLnlxtz0YG6NUNlSqGyrVHa8VLbbVMwdGfM3N+beMOaekz+2/SzGZok9myHz8wzSyVoA+9BJ62AIe9mN5fdQ98mc+Uao+DyY4zKVCZWPfvWypubi40o/9cMvKRx9zfNfVRY2IqS3/LxPBJEK6+M0jxxc/O7A9qrYt/xY1wIYX4yR/Vzhn2sq2eujnNzwkb3h4+SmwunDB1SWb/Nut4sXLwbJvHRhpF3kUwGk0+d+WplhLtIORFTGHvRh9Y5Rue+l2CtTuC9T7FMpftdx2qdQfujBDA2SW7tL4dU3iD/7ab52UNzQkAp6iNqejEi7sTZl6s8U6ksKtWWF6rJKdcX7P+1ZpdZufISz7UdY+w9pHjiw9hSKySjS29kZPixp5OIaxUSY07Z46LIlfYpS8jGlZOSqV/QIJb3dKUqX90KcxqNkF58ifZibJrvqp5D0U9I1jNgkpdXAZY2YRjkRoqyH/2PoIYyUhrE+iZHqKK8HLx/KPZlHMlOT2GkPjbQLW5exZlSsiEItIlONyJxFVarT3iujVH+UqaV+wH79LeKvezQy/bSOHIhXCmYqjFTbnODi2MnFy2Eamg9xL4h9W8PsHid3y0u2y0uue5R8t49cl4/8Vwpl5QH2Thet959x/vdNPr3p5zzjpLqpIdV/GeOi/cv7wzTCXkRvAPtuALNnjHyPl5MeL7k7o+Tv+Mj1eMn3qBgDHuo/9dHMXKf1rptPb77nPOOivqUhVdd8NNNDtA6HaG44aTxxIuZc2PNurAUP1qKMtah0LIxgzbmx5z2IxDCN/QFaxwOcHz+idTBCfSOEVJ4NU1mZoJYMYOsaIuZHrPoRsUlEXEPoIUQy3JEIdXaJ4NU+iFgLItbD2MkI9adzSOWxFQz/EtVQDDucQGhxRDCOCCUQ7fmxjogmEZFk59zeTemdc7tt0TXEdAoxtc6/Yu84yOeUoBQAAAAASUVORK5CYII=)![Two button icons, one named "component" with a solid border, and another named "instance" with a dotted line border.](https://cdn.sanity.io/images/599r6htc/regionalized/ad2db27c7d536f490b0a2f7d0dcc76ec960753a2-2160x1440.png?w=804&h=536&q=75&fit=max&auto=format)

## [Variations on a theme](#variations-on-a-theme)

While we considered several different approaches to dynamic loading for editors, there was a clear frontrunner: write dependency computation, which would mean updating Figma’s multiplayer system to take write dependencies into account. This is analogous to what we did for view-only users and read dependencies, but view-only cases are inherently less risky. If the loading logic for view-only users is wrong, while viewers may see an incorrect file, file integrity itself isn’t at risk. But with editing use cases, if the loading logic doesn’t include the correct dependencies, there is a risk of data inconsistencies corrupting the file data. (Imagine making a change and never seeing that change reflected on another page!) Given the complexity of defining write dependencies, we considered two other alternative, simpler solutions as well: delayed editing and backfill, and data model overhaul.

### [Delayed editing and backfill](#delayed-editing-and-backfill)

This approach would entail loading the first page using the same logic as dynamic loading for viewers. Once the first page loads, the user would be able to pan, zoom, and inspect its contents. In the background, Figma would continue to load the full file as it does today. The catch is that the file would be view-only until the rest of the file downloaded, so there might be a delay between when a user wants to make an edit and when they could take that edit action. This could also introduce complex loading logic: We would need to continue loading pages in the background, and still be able to bump a page to the front of the loading queue if a user navigates to it. Being able to backfill such a large amount of data without introducing frame hitching or noticeable lag for the user would pose a challenge.

### [Data model overhaul](#data-model-overhaul)

Write dependencies represent derived data. When a user edits a dependency, our current systems use a push-based model to propagate updates to other nodes, which then recompute their derived data caches. We considered migrating these systems to use a pull-based reactive model instead so we wouldn’t need to worry about preemptively downloading dependent nodes _before_ a user edits a dependency. But this would be a huge undertaking to overhaul our systems in this way—we wanted to deliver load time and memory wins for our users quickly, and didn’t feel like this approach was feasible in our time frame.

## [Our decidedly dynamic approach](#our-decidedly-dynamic-approach)

Neither alternative would allow us to materially improve user experience in the short-term, while being a sustainable long-term solution. Delayed editing and backfill would be simpler technically, but it wouldn’t reduce client-side memory. While the data model overhaul would avoid the need for write dependencies, it would be a longer-term undertaking. As a result, we moved forward with write dependency computation, which strikes a balance between performance, feasibility, and user experience. With this loading approach, Figma downloads the first page and all of its read _and_ write dependencies on initial load. As the user navigates to other pages, Figma downloads those pages (and their read and write dependencies) on demand.

### [Implicitly and explicitly encoding dependencies](#implicitly-and-explicitly-encoding-dependencies)

Previously, QueryGraph only encoded read dependency edges since viewers and prototypes don’t need to consider write dependencies. To extend this framework to editors, we replaced the underlying data structure with a bidirectional graph. When loading a file dynamically, it was important that we could quickly determine both sets of dependencies for a given node.

The auto layout write dependency we introduced is an example of an implicit write dependency between nodes that don’t otherwise refer to one another directly. We encoded these dependencies as a new type of edge in our graph.

In addition, all of the existing read dependencies were foreign key dependencies, meaning that the dependency was explicitly encoded on the node data structure. For example, instance nodes have a `componentID` field, which provides the foreign key to look up the component node that they depend on. Dynamic loading for editors required extending this further to support implicit write dependencies, like the fact that edits to a node in an auto layout frame can result in automatic changes to neighboring nodes.

### [Supporting real-time file updates](#supporting-real-time-file-updates)

Multiplayer holds both the full representation of the file and the QueryGraph of dependencies in-memory in order to serve client file loads and edits. For each dynamic file load, the client specifies the initial desired page and QueryGraph computes the subset of the file that the client needs. As users make edits to the file, the server computes which edits need to be sent down to each session as a function of the session’s subscription set and QueryGraph. For example, if a user has only loaded the first page in a file, and a collaborator updates the fill of a rectangle on another page, we wouldn’t send that change to the first user because the rectangle is “unreachable” from their subscribed set.

![A flow chart showing read dependencies, explicit write dependencies, and implicit write dependencies.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAACE4AAAhOAFFljFgAAADxElEQVQ4jY2UzW8bRRjGLVUcmitHONEiCvwBSFyQuHEgtI3suLEd26ld4rRJGixoBQWRSKiIG9wRB9Q4idKkbeo4rVJoj5SkgTjEduwkdRKHeL1ee3ft/ZjdzINm/ZHKMYLDo92dmfc37/POO2sjhx6THHooOfTghWeL3NDNo6dI+pBVBpGQw0jKYbqrXIZs+KluekxbHVIHudsCGaQBLOpBxPI38fn6NALPYrj0LEZHkxN4wo9SBrUR090IpCzgv4BJOYyRtTm8em8THT9voONWBqdiaTqWmkBOHUBLhu0ttwKvrt3HK/e2GkD62nwGo6lJmlMHKANCN93/qlYgrwcRzX+La3/dhu/3BfQtxfBVYgqP+TFIxI//BWRlaQA10wNBD2BDGsbTfBhLXBiblSGI5KK1xtYMatg7ZvX4JgYDkx4USw7wggMq6bHG2FwzQ0XphiicRbnQiTLfCVnqsoLa1VMlAUiVYeQLn+AgPwJRvgLN6KtlyBYpqhO59PtYXXwLy/dPYfXhG8jG34UkdkE13FBJQy5U1AA47ibSyWnEV2KIr8xjcyMCQfgamuGHTSMuFHIf4Onc65j+7iQioycQ/f4kVhfPgNv/EILoRLFcV6kbeW4EidU5PIpmcGcijbuTGTx5mMJWehxVNQQbs7q18g4e/fgyJr95CZGxE5j/oQNrv7yN/H4n+JITvNANvsTkxMHBdawuP8aDu1nMjG9gNpLGrwvJF4CqE3vJ9xBfPIPl6GksRU8jvvimNSZLdii6qylmW5SvYmf7J6z/uYD4ygOs/RFDJhVBsVi3rBsuVGQ7yvxH4LmzKHDnUOLPoVpxgM21HgorfkUZgiR/Bkm+Bkn+1PrWSP1Qam3ittpFMvwokYtQD3ubY+178/g3abYN8YCIvSCcD9WDAGQuCK3or41prC/b3++mzKObVGsb0QuyFIQ+G0J1KoTKTAhatB/kt0sgvNfaVbNap1bHiuqCVO2xJCsuVDVXPdOaGxvhfFS/HaLlLwaxN9xPd0Y+hnDjCvRbl2Hs+q1FLIi1D1d0Ive3A9s7dmxn7Xi+a8d+vpsK4gW2EdUMN2VAkJkBSDeG6N5wCAxY/nIQZPwIKKtuHJRc2OV6sPncjkTqPNZT55FIdSGZ7sJW1k7ZZorOMhS91FgKUnJnAOpUiKqz/SDz/TCY5SKz7EGV9EJQ/SjIXuwXLmAn56hpz8GypOy9IDiporMMicckkpeSgg9GwUcNwQdS8oJIXhC99rOw7q/ZC9XotbJgJbCkWjWlrK4Mpptu8x8llgELDWK9JwAAAABJRU5ErkJggg==)![A flow chart showing read dependencies, explicit write dependencies, and implicit write dependencies.](https://cdn.sanity.io/images/599r6htc/regionalized/ff89bbb4bdda67e9ae727c90565e25a72ac4c5c1-3240x3240.png?w=528&h=528&q=75&fit=max&auto=format)

If the font size variable is updated, the text in the button component will change. The instance will then need to update, and because it’s in an auto layout frame, the layout of the frame and its contents will also update based on the new size of the instance.

As other users edit the file, the dependency edges of QueryGraph can change. Changes to the dependency graph by one user may result in significant multiplayer traffic for another. For example, if a user swaps an instance to another component, multiplayer may need to recognize that their collaborator now needs to receive the component and all of its descendants (and their dependencies)—even if the first user didn’t touch any of those nodes. That user has simply made those nodes newly “reachable” to their collaborator, and the system must respond accordingly.

## [Validating dependencies](#validating-dependencies)

Actions that users take in a dynamically loaded file should produce the exact same set of changes as they would if the file were fully loaded. To achieve editing parity, the set of write dependencies needed to be perfect. Missing a dependency could result in a client failing to update derived data on a downstream node. To a user, these errors would look like serious bugs: instances diverging from their backing component, layout being incorrect or stale, or text with missing fonts failing to display correctly.

We wanted to know that clients were strictly editing nodes in accordance with the write dependency roles we had enumerated. To validate that, for an extended period of time, we ran multiplayer in a _shadow_ mode. In this mode, multiplayer would track what page the user was on, computing write dependencies as if they had loaded dynamically, without actually changing any runtime behavior. If multiplayer received any edits to nodes outside of the write dependency set, it would report an error.

Using this validation framework, we successfully identified dependencies we had missed in our initial implementation. For example, we discovered a complex, cross-page, recursive write dependency involving frame constraints and instances. Had we not handled this dependency properly, edits could have resulted in incomplete layout computations. With our shadow validation framework, we were able to identify any gaps, introduce additional tests, and update QueryGraph to avoid similar bugs.

## [Performance in practice](#performance-in-practice)

Before dynamic loading for editors, clients could download an encoded Figma file directly, without our multiplayer system needing to decode it in memory. But with dynamic page loading, the server needs to first decode the Figma file and build up QueryGraph in-memory in order to determine which contents to send to the client. This decoding process can be time-consuming and is in the critical path, so it was important to optimize.

First, we ensured that multiplayer could begin the decoding process as early as possible. As soon as Figma receives the initial GET request for the page load, our backend sends a hint to multiplayer indicating that a file load is imminent and that it should start preloading the file. This way, multiplayer begins downloading and decoding the file even before the client establishes a WebSocket connection to it. Preloading in this fashion shaves off 300–500 milliseconds from the 75% percentile (p75) load time.

Next, we introduced parallel decoding, an optimization in which we persist raw offsets in the Figma file, allowing us to split decoding work into chunks that multiple CPU cores can process concurrently. Decoding the binary-encoded Figma file in serial can be quite slow (over five seconds for our largest files!), so in practice, this reduces decoding time by over 40%.

Reducing the amount of data the multiplayer system sends to clients was a big win for dynamic page loading, but we recognized we could go even further with additional client-side optimizations. Specifically, the client caches descendants of instance nodes in memory to allow for easy editing and interaction by the user. But instance “sublayers” are fully derivable from the instance’s backing component and any overrides that the user has set, so there is no need to materialize them all on initial file load. As part of dynamic page loading, we now defer materializing instance sublayers for nodes on other pages. This yielded huge load time wins but required updating dozens of subsystems to remove the assumption that all nodes are fully materialized at load, and instead support lazy, deferred materialization.

### [Down-and-to-the-right load times](#down-and-to-the-right-load-times)

We shipped dynamic page loading to groups of users over the course of six months, carefully measuring the impact of our changes in controlled A/B tests and monitoring our automated telemetry. In the end we saw some great results:

-   33% speed-up for the slowest and most complex file loads—despite files increasing 18% in size year-over-year
-   70% reduction in number of nodes in memory on the client by only loading what users need
-   33% reduction in users experiencing out of memory errors

We’re always looking for opportunities to optimize load times and reduce memory, and as files grow ever larger and more complicated, dynamic page loading has become the foundation of our performance improvements. If this type of work interests you, check out our open roles—[we’re hiring](https://www.figma.com/careers/)!

Thank you to all of those who made this happen, including Andrew Chan, Andrew Swan, Darren Tsung, Eddie Shiang, Georgia Rust, Jackie Chui, John Lai, Melissa Kwan, and Raghav Anand.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)