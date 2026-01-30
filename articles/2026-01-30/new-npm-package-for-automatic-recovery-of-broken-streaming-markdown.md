---
title: "New npm package for automatic recovery of broken streaming markdown"
source: "https://vercel.com/changelog/new-npm-package-for-automatic-recovery-of-broken-streaming-markdown"
publishedDate: "2025-12-03"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Dec 3, 2025

[Remend](https://www.npmjs.com/package/remend) is a new standalone package that brings intelligent incomplete Markdown handling to any application.

Previously part of [Streamdown](https://streamdown.ai/)'s Markdown termination logic, Remend is now a standalone library (`npm i remend`) you can use in any application.

### [Link to heading](#why-it-matters)Why it matters

AI models stream Markdown token-by-token, which often produces incomplete syntax that breaks rendering. For example:

-   Unclosed fences
    
-   Half-finished bold/italic markers
    
-   Unterminated links or lists
    

Without correction, these patterns fail to render, leak raw Markdown, or disrupt layout:

```
**This is bold text[Click here](https://exampl`const foo = "bar
```

Remend automatically detects and completes unterminated Markdown blocks, ensuring clean, stable output during streaming.

```
import remend from "remend";const partialMarkdown = "This is **bold text";const completed = remend(partialMarkdown);// Result: "This is **bold text**"
```

As the stream continues and the actual closing markers arrive, the content seamlessly updates, giving users a polished experience even mid-stream.

It works with any Markdown renderer as a pre-processor. For example:

```
import remend from "remend";import { unified } from "unified";import remarkParse from "remark-parse";import remarkRehype from "remark-rehype";import rehypeStringify from "rehype-stringify";const streamedMarkdown = "This is **incomplete bold";// Run Remend first to complete incomplete syntaxconst completedMarkdown = remend(streamedMarkdown);// Then process with unifiedconst file = await unified()  .use(remarkParse)  .use(remarkRehype)  .use(rehypeStringify)  .process(completedMarkdown);console.log(String(file));
```

Remend powers the markdown rendering in Streamdown and has been battle-tested in production AI applications. It includes intelligent rules to avoid false positives and handles complex edge cases like:

-   Mathematical expressions with underscores in LaTeX blocks
    
-   Product codes and variable names with asterisks/underscores
    
-   List items with formatting markers
    
-   Nested brackets in links
    

To get started, either use it through [Streamdown](https://www.npmjs.com/package/streamdown) or install it standalone with:

```
npm i remend
```