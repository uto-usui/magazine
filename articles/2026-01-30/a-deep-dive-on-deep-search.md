---
title: "A deep dive on deep search"
source: "https://www.figma.com/blog/deep-search/"
publishedDate: "2020-07-21"
category: "design"
feedName: "Figma Blog"
---

_A few months ago [we launched Universal Search](https://www.figma.com/blog/new-ways-to-search-and-provide-context-in-figma/)_

_to bring better discoverability and added context to Figma. Building on top of that, we recently rolled out deep search, which allows you to find the right file even faster. Here, we're giving you a behind-the-scenes look at how we built deep search: the tradeoffs, the technical challenges, and the team who brought it to life._

When you think back on a project, specific file and folder names probably aren’t top of mind. Instead, you might remember an idea, a snippet of copy, or the problem you solved. Now, with deep search you can find what you’re looking for without knowing the name of the file—type in a keyword, and Figma will return all files that contain that word or phrase.

Here, we’re giving you an inside look into how deep search came to life—a glimpse into our infrastructure, the technical challenges we faced along the way, and the team who made it happen.

## [Building in the browser](#building-in-the-browser)

We’ve [previously shared the technical infrastructure](https://www.figma.com/blog/under-the-hood-of-figmas-infrastructure/)

required for building a browser-based tool. While it means that our engineering team faces more technical challenges than a standalone desktop application, it also allows us to build features that are unique to a web-based environment.

These features often translate to better collaboration. Being in the browser allows for streamlined prototyping and handoff, and stakeholders can easily check in on a project without waiting for an exported file. It encourages sharing in-progress work, which ultimately makes the end result better.

From a product perspective, when we think about which features to build, our roadmap is informed by the benefits that come with being built on the web. Figma has the ability to provide really rich information about all the files you have access to. We can show you how often your components are being used, how frequently your files are viewed, and dig deep into the structure of your file. That’s why deep search felt like the natural next step in bringing added context to your files.

### [The technical foundation](#the-technical-foundation)

Late last year, we launched [Design System Analytics](https://www.figma.com/blog/introducing-design-system-analytics/)

, which gives you visibility into how your design systems are used across teams. We were able to leverage much of this infrastructure as the foundation for deep search.

Both Design System Analytics and deep search required a system that opens a recently edited file, pulls it down from storage and walks through the file to retrieve relevant information. For Design System Analytics, the information was about shared library usage; for deep search, it’s the text within your files.

## [Bringing deep search to life](#bringing-deep-search-to-life)

While Design System Analytics laid the technical foundation, we still needed to generalize the service. This required unpacking what sets deep search apart.

### [What makes deep search different](#what-makes-deep-search-different)

In all our previous updates to search, including those released by Unified Search, we only had to deal with metadata stored in our database—items like the title of your file and its creator. For our regular search, our data pipeline is similar to search in other tools. We tail relevant tables in our database and stream the IDs of changed items into a messaging system. From there, our search indexers retrieve messages, get the most up to date information from our database and then index that into our elasticsearch cluster.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABtUlEQVQoz5VS2W7bMBD0/39a0LcUadL4lBRLsi6KlyhekyVltyiah1bCYInl7JLLmV1bRcxjhJwjxP+ApTqPsV/BBksI6OuIHesjVhPhPcH9O5wN4FyhbXoM/QQl13zIjk9bs+2L2x8TAkJC+Btp33sPxhiKskBd15BSQ/F7Q2sjQrqh/7qBtRbGmNzkd85hmhjKskLbtnTDBTI1nGjkqfPoaiL0DnwiMAclPCRBcItpkOjaGTMzVER57jB2BtdS4FpNuDUCbLTbyH0TcHq1eH4yOLwYXN4NTm9ELlYUB43LXqI8C1oLlCeF87tGedTYv0h8/8ZxfFXEV5QzdKGA3dAGVEeLn88Gxd6gOi+5oL0aNNVC0Ohbg1u94KMQOLyNqC6ceBqHHxrViQ6/JN6ald7NQ4SWIY/CJo1bO9KbDDSepHdzWc11dTS6Qncb0DQd+Ex7i4dWnmLaDzkm620qO2RVtdYYx5EwQClFj++z9ikuiyabcFJTZJGS0g9nZA5RlUgNydTOxV9WWFebkdYx3C0UNgek3OaEh7Vwj5s3s8qMRrbrwzbbSQ/4jK/y8Q+k2tQjqfwJGbNStkTnWB8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/a897b38c3d32a0dfb55a4aefc577fed534d39823-3302x1888.png?rect=1,0,3300,1888&w=804&h=460&q=75&fit=max&auto=format)

A look at our regular search indexing pipeline

JSON

```
{
  "id": 123,
  "folder_id": 28,
  "team_id": 456,
  "name": "File",
  "folder_name": "Drafts",
}
```

Deep search is a different beast. While our regular search indexers gather a file’s metadata such as its key or team id from the database, the representation of our Fig files (our internal name for Figma files) is stored as a .fig document type in Amazon S3. The Fig file can be thought of as a tree, where a node represents a Figma object like an ellipsis, frame, vector, or some text. Each node also contains an object’s properties.

### [Making tradeoffs](#making-tradeoffs)

While it’s fairly cheap to retrieve things from our database, retrieving a Fig file and then walking through it is extremely computationally expensive because they may have thousands of nodes. It would be expensive to make changes to our deep search index at the same cadence as our regular search index—as you edit your file, a new save is made for you every 30 seconds. Instead, we deduplicate all file changes every hour and send those files off to be processed by our file-analyzer workers—the platform we built for DSA which helps handle computationally intensive, periodic tasks. We made the product decision to allow deep search results to be stale for a short amount of time to save our servers a significant amount of duplicated work.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB1UlEQVQoz5VTa4+TUBDl//8nNcZNdG2ta6zdtS1dWlooFCgUyn1zdubS9YMxRkkO986TOTNDkO0HNNWArhnQ1oTm38D+TWWR7BuEqyOisMRhKxHUxQAlB1hLMP8DUJxBlhUI18/YbVMUmUBwOY/JAAa/WTbQWkEp5U+WX+24efHD+tPphM0mxGGf4lxQhUxXCobzp9YOQgi0bXtDh/4qYUjvbiy0GkhmX4OiKLGNdjimJ9SVRlDlDvnBIvppEC0tysyQQSFPe0/hXEoc94TYUAWWdAbblcQhUtRDTX4dNsszkrjzPQ3yxGH13eD+jcLntxqbR414o7CY9Vj/kEh3GosvErM7gecnsj8J3L9rMXl/pcSKipD49ol9FaqTQ1CkjhwNZh8Uvt4p7NYGaawRLiTdqdLEYDVXmE8lfUgj2dF90uPho/D2PX388UFgu9TEwI1TrkuHjGgz9ba2EL3FtTXUO0t9HXVNZXDtrEeeaKKsKY5lR2tk0V2cXyc/ZW6wbzjBOZrzwKAhuN8xoKeEcUgMiGJxNDDmdeIDrhdOWI2T8wvjE+F2/gFuXOb5VGBKPWTKSjofyzk6TliXNH45/FoJa/+Oy9mNPZ0IGpiBEmMsrxL/aS8hJkudzy8vzQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/18f6cde27a836156a9aa93bbebdf7d71a25c1fe1-3302x1888.png?rect=1,0,3300,1888&w=804&h=460&q=75&fit=max&auto=format)

A look at deep search indexing

Let’s say we have a file that contains five relevant nodes: a frame, rectangle and three text nodes. Our file-analyzer workers walk through each node and retrieve a text node’s contents, disregarding all other nodes types. The file-analyzer passes that data to the deep search indexer, which then stores the text in a multi-value elasticsearch field labeled `text_instances`.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACEklEQVQoz32Sa08TQRhG+2P1kwYFEhRNlCgGKAEkMQSDLSAIyMVWG7wFqkYSytWWKhdj1KS2sAtadrqz6Xa7e5xtK5egTnLyZObDyfvknUBfS5J73Ql626J03xih8/oQHc1h2q+Gqlyp4r8Frw3T1jRIa2OI2w0PTnGnfphgXZTA4qxOOplja/Obym3WV9KsJpKsLH5QJFlb2iC5+onU2iZLC5u8jH4k8miDyOgJ1P3paJpYeIdAJlXGEg6uV8a2ixjCQNP2yOaylRTqXirZOI6Dvmuz+MokNiCI9h3z7L7g9ZhgIWIQyKXBllSOU3IwTZOD/QO0PY18Pk+xaON5ngL0rEt83OJhs0m43mSwQTKocqjJ5ElPgXeTBV/o1YSemsTBsiyklBVs28Z13ZrQQ/vhMD8mGW8xmGwRTLcKpm4JJm4KIj2CtxPirNCXlMvlI4l6hiNhmfiEZKrNINopiN1VdbsEM+2qeq8SPv6H0J+q8lITeSeEcyOSocYCoYuqcp2q7udlk+ngfyY8FlahlnrWF1qELpn0n5P0n5eVHLhgMhUsnJ3Q+VPZLZ+ZznU99ncdFmIWM2oBkx3mEdNdBZ6HC7yf8ZeyoYRmtZ5dLKktywpSWqcxLbScJL0qSMQPScydYP6Q5bjB8gv1bTLrHvKX+jJFlYbN/l6eXEb/K5nvOl8/63zZ0k6zrbGT0km9+clvr2sERtEJU+oAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/81d7cf4721b8909421f619bdfdc3543786c63728-2336x1336.png?rect=1,0,2335,1336&w=804&h=460&q=75&fit=max&auto=format)

A Fig file that contains 3 text nodes: “Important text 1”, “Important text 2”, and “Important text 3”

JSON

```

    {
      "id": 123,
      "folder_id": 28,
      "team_id": 456,
      "text_instances": [
        "Important Text 1",
        "Important Text 2",
        "Important Text 3",
      ]
    }
```

_The file-analyzer stores the three text nodes in the text\_instances field_

There was a lot of discussion over what should and shouldn’t be stored in our deep search index. Should instances count, or only components? Do we care about page names and layers or just text? Here, search is more art than science. It’s not immediately clear what would improve search accuracy and what would just be plain noise. To tease out the intricacies, we implemented different versions of deep search to try for ourselves.

From our hands-on approach, we learned a lot about how users interact with Figma. For example, it turns out that page names—for the most part—are more generic than the contents of your page; page names are relatively short and tend to be categorical rather than unique to the file. A common pattern we found was page names being used to show the progression of the designs: “Idea”, “Rough draft”, “Final.” Searching through page names gives the average user less signal than the content in their page, as they’d apply the same naming scheme for the pages across all their Fig files.

We also made the call that instances of components matter. There was much debate around this particular discussion—since instances are copies of a main component, leaving them out meant that we could de-duplicate a ton of text, greatly reducing the size of our deep search index. Storage nowadays is relatively cheap, but it’s not free. We ultimately decided that not only do components matter, but also the frequency of components in your Fig file matter too. If you add an instance with the text “Figma is cool” into a file 100 times, this should rank higher in your search results for “Figma is cool” than a file that only has this string once.

At the end of the day, search is a living, breathing, developing product. We’re learning as we go about what users are looking for and how, and applying this information to make a better product going forward.

### [The team behind deep search](#the-team-behind-deep-search)

While deep search required coordination across teams, the working group was relatively small, allowing us to move quickly. I (Shloak, here!) recently joined Figma full-time, but I worked on deep search while I was an intern on our infrastructure team. I started with an infrastructure-side investigation before partnering closely with Stella, an engineer on our collaboration team, to productize the work.

Stella oversaw the roll out of our dark and live launches, and brought in our infrastructure and data science partners to ensure the project would be a success. Lizhi, another engineer on infrastructure, was instrumental in making sure file search remained performant. It was incredible to work with such a great team on unique technical problems as an intern, and one of the reasons I chose to return to Figma.

As we continue thinking about the ways designers collaborate with people across teams, we’ll look to specific workflows, like developer handoff. If this sounds like the type of project you’d be excited to dive into, come build with us—we’re hiring! You can check out more about Figma and our [open roles here](https://www.figma.com/careers/).