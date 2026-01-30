---
title: "The infrastructure behind AI search in Figma"
source: "https://www.figma.com/blog/the-infrastructure-behind-ai-search-in-figma/"
publishedDate: "2024-10-15"
category: "design"
feedName: "Figma Blog"
---

At Config 2024, we introduced new AI-powered search features that allow you to search across all of the designs and published components in a team or organization. We had heard countless stories of users struggling to locate a specific design or component, especially when working across large organizations with complex design systems. Now with AI-powered search, you can find what you’re looking for using just a screenshot, selection of Figma layers, or even a text description.

To power these features, we’re leveraging AI in two search flows—**Search for designs**, which is a net-new flow, and **Search for components** which greatly improves our component search functionality.

#### [Search for designs](#search-for-designs)

We’ve indexed frames across all of your files so that you can find exactly what you’re looking for, even if it’s an unlabeled frame squirreled away on a file with dozens of pages. You’ll now be able to find similar designs lexically via a text description, or visually via a screenshot or selection of a similar design.

#### [Search for components](#search-for-components)

We’ve augmented the capabilities of the Assets panel. Previously, searching across published components used strict text matching, forcing designers to manually enumerate possible keywords in descriptions. Now, Assets search offers an AI-powered semantic understanding of the component. For example, a 😀 component can be found via “smiley,” “happy,” “face,” “grin,”—no matter what it’s called. No manual SEO work required! And like Search for designs, you can also search visually via a screenshot or selection of a similar component.

Here’s a behind-the-scenes look at how we built the infrastructure to make these new AI-powered search features in Figma possible.

## [Our embedding model](#our-embedding-model)

An **embedding model** is an AI algorithm that converts data like text and images into a meaningful array of numbers.

Figma’s embedding models were not trained on any private Figma files or customer data. Fine-tuning was performed with images of user interfaces from public, free Community files. You can read more about model training [here](https://www.figma.com/ai/our-approach/).

At the heart of Figma’s AI-powered search is an **embedding model** capable of representing text or an image as a meaningful array of numbers. For example, an image of a cat might produce the embedding:

`[0.066, 0.469, 0.103, 0.35, 0.382, 0.163, 0.587, 0.796, 0.311, 0.477]`

Figma currently uses the open source [CLIP](https://arxiv.org/abs/2103.00020) model, which is what is known as a _multimodal_ embedding model. The model can take multiple forms of inputs (image _and_ text) and output embeddings that are in the same space. This means that an embedding for the string “cat” will be numerically similar to the embedding above, even though the first was generated with an image as input.

At a high level, our AI-powered search works by creating an index of content—for example, all of the components in your design system—and their associated embeddings, and then issuing a query to find the items whose embeddings are nearest to the query. Visualizing a nearest neighbor vector search might look like this, but with many more dimensions than the three shown below:

![A series of black, yellow, and green dots cluster around a three point axis](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACtUlEQVQ4jW3Ty3PiRhDA4f3/r7klh6SytfbGNsYYG8RLAttCCMQbJITEG2yBQQIJfP2lJNapyiaHrumqUX3q6en5cvJnnN4tglGdQFfw+2X2fRm3+8xKK7DQCsyqOaZqjp2uEAxrBKZ6Xq0axzBmbU47m1Mw50sEbkwCo4LfkHAUATsfZyIlMDJXGLkrFkqapZplrmSYvqTYNiSCnsyh88y+XcIf1jhtLT5C8CME12ZUXRCC5TTDbIxZKclSjrNSLnFqCVZqGlOM03r8zrIs4LefWFeyjMQ7nFaJ42Z4Bj8r9I0K+4aIpxXYagW8lsihl2bTvmKuXbCqX+PUBWZlgcnzI6+VDCs5zSAbY1mXfgLfh2y7L4ylBEs5xaFd4tTP4+sJpo0bOuWvTGsXbNtZVtUceu4WS0rwrhWi8AwlMv4FOu0nOum/sIr37JpF3JbAvpfgrZWiW7yhnbtkIN7SEa6xi/estQKHzhPH7gvBsBoZofUDtPBMlXlZiJo+k9NYUpyF8sBUfkCO/YF0+RuNx+9o998Yl5LsO894rSJuQ8I3/wMOOdoar9UcHeGKXuYGI3/LUEygxr+S+v0XpItf6QrX1JMX0d5aE6OfT19S7IdVPrb2GQzPHYLhTL1V8/RzMQaFOKNSEltKoGduaNx/Q43/iZ6NYYp3jJ4eWKhZBuIdVimJa6rR2PxT4cEx2BkV1g0pGuZJWaCTuY7wTS3PupqLLmGhCGybRd6bRd7qIvNKhnkli9OT8V71MxjsJzizNst+GUdX2Nl11gMVvSxgKhk8s0owbrC3avijOsdJk2Da4jBp4tka60GFpVFhs+xxPEzP4OZVZ73ssd+YHN0Rwc7GdQa4jkEQ9sYd8eGOovUcY07eOMr9rYW3MTmET+/zyKEcRpiHPf05wjcaXd5n/iP+79u/AU/hkNGPOConAAAAAElFTkSuQmCC)![A series of black, yellow, and green dots cluster around a three point axis](https://cdn.sanity.io/images/599r6htc/regionalized/5839d0b8c2e8ef5c6ec4253b1a46295be039f13a-2160x1440.png?w=804&h=536&q=75&fit=max&auto=format)

Early on in the project, we experimented with generating an embedding from a textual representation of your selection (e.g. JSON), but we found that generating embeddings via images returned better results and ensured we were sharing code paths when searching via a screenshot.

Unlike traditional search where you might compare a user’s query to entries in the search index directly, embedding search requires first generating an embedding for the user’s query and comparing that to an index of embeddings. When you perform a search using a screenshot or text, Figma generates an embedding on-the-fly that can be inputted into the embedding model directly. If you’re searching via a selection of Figma layers, we simply generate a new screenshot of your selection and then use that as an input to the model in order to generate a query embedding.

## [Populating the vector search index](#populating-the-vector-search-index)

Once you have your query embedding, you know what you’re searching for, but you still need a populated index to perform your search.

### [Identifying designs within Figma files](#identifying-designs-within-figma-files)

In order to find designs that might live deeply within Figma files, we need to be able to enumerate all of the frames within a Figma file that should be searchable. For each one, a thumbnail—a rendered screenshot of Figma layers—and embedding will need to be generated and written to the search index. This is tricky; unpublished frames within a Figma file are not readily enumerable. To identify them, we run a headless server-side version of the C++ Figma editor in an asynchronous job.

[![An orange worm trying to escape from a castle wall laden with spikes.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADZElEQVQ4jVWT+0+bVRjH+UPMNEFc4qKZl5jFRGOCOgxsLroMZ6LIqCzRcdlwaxjIsKthdINBRy8QQFrKKPeOFmopLVA2HCkXM5DLuJTCUBCX/qKTt+/79mPe1mT6wzfnPPk+55Pn5JxvUiwWQ5IkJFFAkgQkORqvRUmOKxqNIkT3EcX9hB/vEZFiii8hCAkvJosorCTl8O7OOmsrbjY2+ghtBVjeXmXhtz+YXtnCO+JnZKSdleV2tre6CW95WAwFCc7PcHcywMT9ARYXvUQiq8iySJIoRnm4/CNjvmzG/OkMjV/EPtaJeXCYa80tqL89g+5aKoP9Rwn4M+h3ncHQoqboylcUFX9GbX0+vUMGlkJTiKKgTCgQWnMw4k3H5TiErfM435svoSo+R/a5dErLXsdY/xa3e45jvX2MyqoMvil+ly9yDpKVfRBtnQqLr4+p9TCCKJIky1HCmz48/vO0tGeiqzmNuvQEXxccJi/vADW3XqXNqaLJXU1Nl4FyfSkVFceouZqMpiSZ6qZsLKODBDf2EEQ5AQw9msQx3oy+z8Z3DQ1UVH2Jufol9JXP0ND4BtaBIkzeHmo8o1T1dGIw5dJ2/UVsdclY7Cew+VuZCm0/Ba5vT9M94UDvneS6axp9cyVttUfoqn+Wzo7XsA0UYPTcodY7Q2V3P+WaLBqvPM+g9TkczlQ6RgxMh8JPgWvbs3Tdc6H3zaBzzqC5qcGkfQWn5QCDzsPYXSpMDitVvT4uG83k531AXUkK7rYU+u8cocOtYerhEoIo/XdCJ9XuCcpa+lCXfc4t7SGcthRcjpextH6IrqqQwuILqAo+obgkDbMhk46OU/zQmkFd4wXG7o+zL8RfOcpqOIjF1UyB7iZZhWcpLXub5sb3sHedwmo/ie7GR+RmpfLOmy9wNC2Z8hunqXc2YRzopdJqQmvUMxQY5+/9fQUosh6ap6W9gbOFeahyP8Zk/hT3qJb+e13Yh3sxtRpRX84n8+T75OSkYW67SvfkT9iDYax3V2gPzDO7+ijxbWIxmUjkMQ/mfmZoyINv2MkvC342d+YI/b7D6k6Epc1fmZl7wOioj0DAw8LKLOu7u6zt/cna3hM2Hj8h8lcUWYmekj9lE8+vKMZXWf5XMTnuyTESPbKMcqP/eXJCCkfJ8j89oShlckgwngAAAABJRU5ErkJggg==)![An orange worm trying to escape from a castle wall laden with spikes.](https://cdn.sanity.io/images/599r6htc/regionalized/98a89967bc35018e93b8660fac4e12437a9e1b7e-3072x1952.png?w=3072&h=1952&q=75&fit=max&auto=format)](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

Read more about our sandboxing techniques for running server-side C++ [here](https://www.figma.com/blog/server-side-sandboxing-an-introduction/).

While Figma also maintains its own RDS cluster, the AI search features make use of [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) to store metadata and embeddings. The features require only a simple key-value store, writing and reading at high throughput. No transactions or foreign key relationships are required.

Once we’ve identified all of the current indexable designs in a Figma file, the frames’ metadata is persisted to DynamoDB. Thumbnails are rendered and uploaded to S3. This identification and thumbnailing job queues the next job and terminates successfully. Separating the individual steps of the pipeline into discrete jobs gives us more precise control over batching and retry behavior.

### [Generating embeddings](#generating-embeddings)

Next we need to actually generate embeddings and persist those. Our embedding model is deployed in AWS SageMaker. Embedding requests are sent to our SageMaker endpoint in batches, allowing us to perform inference in parallel. Input is a series of thumbnail URLs generated in the previous step, and output is a series of embeddings, one for each input image.

In order to generate embeddings efficiently, at inference time it was important to parallelize both downloading images and image resizing and normalization. Determining the optimal batch size required some experimentation; past some threshold we started to see latency growing linearly with batch size, instead of a sublinear batching effect. Once embeddings have been generated and persisted, we queue the last step of the pipeline.

### [Search indexing](#search-indexing)

Now that we have embeddings generated, it’s time to write them to our OpenSearch index, where the actual vector search queries will be performed. OpenSearch is already deployed widely across Figma for traditional search features, so it made sense to leverage OpenSearch for embedding search at Figma as well.

Embeddings are written to the search index, along with additional metadata like the frame’s name, the containing file ID and name, and the containing project, team, and organization of the frame. This additional metadata lets us support faceted search (filters) in addition to the nearest neighbor vector search.

## [Search for components](#search-for-components)

Whenever a library is published, an asynchronous job is kicked off to compute embeddings for each thumbnail. We use a very similar model to that which is used for searching designs, but one that is fine-tuned specifically on publicly available Community UI kits. As before, this model was not trained on any private Figma files or customer data.

Lexical searching (via fuzzy string matching) over component names and descriptions predates AI-powered search. In order to safely roll out AI-powered search over components and to retain valuable lexical results, searches are performed simultaneously against both the lexical index and the new embeddings index. Since raw scores from the independent OpenSearch indexes are not directly comparable, the result sets are assigned new scores based on a min-max normalization, with exact lexical matches receiving a boost. Results are then interleaved according to their updated scores.

Now a query returns not just the lexical results, but also appropriate results based on a semantic understanding as well. For example, “mouse” returns not just an icon that is specifically titled “Mouse” but also cursor-adjacent icons.

## [Challenges at scale](#challenges-at-scale)

Enabling AI-powered search at Figma’s scale requires generating embeddings for and indexing _billions_ of entries. This is not only a time-consuming operation, but an expensive one. A huge part of the project was focused on optimizations to keep costs down.

One tricky thing about this rollout is that for even a single user to experience the search features as intended, all of their team’s data must be indexed. To make AI-powered search available to even a small number of users for early testing, we would have to index entire teams’ data. Paradoxically, with even a small percentage of users onboarded, we’d quickly converge on having to index almost all teams at Figma—most of our teams are small and there are many of them! This made keeping indexing and backfilling cost-efficient even more important.

### [Indexing optimizations](#indexing-optimizations)

Taking a look at the pipeline we previously discussed, we were able to identify that the major compute costs were being driven not by embedding generation, but by identifying and thumbnailing meaningful designs within Figma files. With that as our focus, we deployed several optimizations:

-   **Ruby → C++**. Our initial approach relied on serializing the entire Figma file as JSON and parsing that in Ruby which was both extremely slow and memory intensive. Rewriting this logic from Ruby to C++ and eliminating any intermediate serialization yielded huge runtime improvements and memory reductions.
-   **Software rendering**. We moved our thumbnailing from GPU-based rendering on an older AWS instance type to CPU-based rendering with `llvmpipe` on a newer instance type. This was a huge cost saver; the CPU instance type machines are much cheaper, and since they’re newer they get through our workload more quickly.
-   **Reducing indexing freshness**. Our identification and indexing pipeline was originally written to be triggered off of every change in a file. However, when Figma users change files they frequently make many changes in a longer editing session. Rapidly refreshing the AI-powered index isn’t necessary on every single change, but we do want to keep our index reasonably fresh. We discovered by looking at the data that if we debounced indexing to be at most every four hours, we would only have to process 12% of the data!
-   **Cluster autoscaling**. Figma usage is heavily diurnal. Scaling down our clusters during lower traffic periods helped us avoid paying for unnecessary compute.

### [Search cluster scaling](#search-cluster-scaling)

#### [Reducing index size](#reducing-index-size)

Our second biggest cost contributor was OpenSearch, which required a large cluster to be able to maintain our massive indexes in memory. To address this, we first took a deeper look at what we considered indexable. What is a meaningful design? We ended up removing draft files, duplicate designs within files, and files that were copies without new changes, and this cut the index in half. A lot of these ended up being product improvements as well—not surfacing duplicate designs within files is a nice user experience improvement.

Next, we leveraged vector quantization. By default, OpenSearch’s kNN plugin represents each element of the embedding as a four byte float, but [vector quantization](https://opensearch.org/docs/latest/search-plugins/knn/knn-vector-quantization/) is a technique to compress the size of embeddings to reduce the memory required to store and search them, at the cost of a small reduction in nearest neighbor search accuracy.

#### [OpenSearch quirks](#opensearch-quirks)

We discovered several interesting quirks and bugs with kNN search in OpenSearch, even while running the latest release supported in AWS.

-   We noticed some periodic non-determinism when testing our search features end-to-end. After an extensive debugging session, we determined that queries routed to replicas in OpenSearch were returning non-deterministic results compared to those routed to primaries. Intriguingly, these replica queries were hitting an error (`Reader cannot be cast to class SegmentReader`) deep within OpenSearch.
    
    We partnered closely with the OpenSearch team at AWS to investigate. After several calls, the OpenSearch team helped determine that this type casting error in the delete path was affecting replicas on clusters that utilize segment replication and shipped a fix [here](https://github.com/opensearch-project/k-NN/pull/1808).
    
-   To improve storage space and query latency, we remove the embedding vector itself from `_source` in the search index. The `_source` field is the original document body passed to the search indexer. It’s not searchable, but is returned to the client on responses, and embedding vectors are large!
    
    However, it turns out that on document updates, OpenSearch relies on `_source` to diff and write the updated document, instead of updating each index in-place. It grabs the existing fields from `_source`, applies the update, and then writes the document. So after removing embeddings from `_source`, everytime we tried to update a document (e.g. like when file names change), we were accidentally wiping the embedding off of the document since it didn’t exist in `_source`. To fix this while retaining our `_source` optimization, we re-fetch the embeddings from DynamoDB on updates.
    

## [Next Steps](#next-steps)

These AI search features are currently in early beta and will be continuing to roll to more users over the coming months. We’re looking forward to your feedback and are excited to see how AI-powered search will transform your workflows.