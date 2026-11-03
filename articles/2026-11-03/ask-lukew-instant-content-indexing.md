---
title: "Ask LukeW: Instant Content Indexing"
source: "https://www.lukew.com/ff/2168/ask-lukew-instant-content-indexing"
publishedDate: "2026-10-20"
category: "design"
feedName: "LukeW"
author: "info@lukew.com (Luke Wroblewski)"
---

The [Ask LukeW](https://www.lukew.com/ask/) feature on my website has been answering people's questions about digital product design for over three years. How well it answers depends on the content available to it. So in addition to improving [content retrieval](https://www.lukew.com/ff/2157/ask-lukew-a-new-retrieval-system) recently, I've also improved content indexing: a key part of making personal AI work.

Before any of my articles, presentations, or files can be used to answer people's questions, they need to be cleaned up and turned into a format that makes semantic search possible. This happens through a content ingestion pipeline, which I had to kick off manually for every piece of new content.

Now the system automatically checks for anything new or changed each hour. Audio, video, PDFs, and images it finds get queued, processed in the background, and added to the corpus. How that happens depends on the types of content.

Audio and video files get transcribed into text spelling out what was said and who said it. The service doing this recognizes my voice so it can consistently label me in each transcript. An AI model then reads the transcript and generates a title, summary, list of topics, and date if it can find one in the text. Each transcript gets split into distinct passages so an answer can reference the exact moment in a talk where I said something, and you can jump straight to it in the embeddable video and audio players.

[![Ask Luke embedded video files](https://static.lukew.com/asklukew_videofile.png)](https://static.lukew.com/asklukew_videofile.png)

PDF files get read by a vision model that not only extracts all the text but also describes charts and diagrams in words. Since many of my presentation slides are visual, this process matters a lot. Each PDF page is individually saved so answers can show slides inline resulting in [less walls of text](https://www.lukew.com/ff/2162/ask-lukew-less-walls-of-text).

[![Example of LukeW slide parsing via vision model](https://static.lukew.com/asklukew_PDFparsing_vision3.png)](https://static.lukew.com/asklukew_PDFparsing_vision3.png)

Of course, images help with that as well, so an AI model analyzes each new image added, describes what's in it, and uses my captions as [additional context](https://www.lukew.com/ff/2162/ask-lukew-less-walls-of-text) if the image appears in a blog post.

That's all well and good, but I'm not writing that many articles and definitely not giving enough talks to keep content recent and relevant. Thankfully, there's Twitter (X now) and I've posted there [nearly 20,000 times](https://x.com/LukeW) since 2008. Damn, I need hobbies.

Despite the volume, none of those tweets were available to Ask LukeW. Now when I post, X notifies our server which pulls in the full post or deletes it if I had a half-baked idea that I removed. Older posts were added through a one-time import though I skipped replies to other people, reposts, and anything linking to lukew.com (that content was already there).

[![Example of and ask Luke W reply, citing a few published tweets (posts on X)](https://static.lukew.com/asklukew_tweets.png)](https://static.lukew.com/asklukew_tweets.png)

For each post, shortened links are expanded so the text reads naturally, and quoted posts are included for context. Any photo, video, or GIF also gets described by an AI model.

So why does all this matter? Making content ingestion automatic, especially Twitter/X posts as they happen, allowed me to start the Ask LukeW experience [with an answer](https://www.lukew.com/ff/2160/always-asking-people-to-ask) vs. requiring a question. Which addresses one of the most [challenging bits](https://www.lukew.com/ff/2107/common-ai-product-issues) of AI products: knowing what they can do. Plus Ask LukeW answers are now better because they have more content to draw from. So that's cool.