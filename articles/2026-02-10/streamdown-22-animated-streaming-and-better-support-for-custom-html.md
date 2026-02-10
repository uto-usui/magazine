---
title: "Streamdown 2.2 - animated streaming and better support for custom HTML"
source: "https://vercel.com/changelog/streamdown-2-2"
publishedDate: "2025-09-08"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Sep 8, 2025

Streamdown 2.2 delivers animated per-word text streaming, improved custom HTML handling, and drop-in compatibility with ReactMarkdown - making it easier to adopt Streamdown in existing projects.

## [Link to heading](#animated-streaming)Animated streaming

By importing the Streamdown stylesheet and enabling the new animated prop, streaming content renders with smooth per-word text animation. This provides a polished experience for AI chat interfaces and other real-time text applications.

```
import { Streamdown } from "streamdown";import "streamdown/styles.css";export default function Page() {  return (    <Streamdown animated isAnimating={status === "streaming"}>      {markdown}    </Streamdown>  );}
```

## [Link to heading](#better-custom-html-support)Better custom HTML support

The components prop now accepts custom HTML attributes by adding elements to allowedTags. The Remend engine has also been improved to strip incomplete HTML tags during streaming, preventing visual glitches from partial markup.

```
<Streamdown  allowedTags={{    source: ["id"],  // Allow <source> tag with id attribute  }}  components={{    source: ({ id, children }) => (      <button        onClick={() => console.log(`Navigate to source: ${id}`)}        className="text-blue-600 underline cursor-pointer"      >        {children}      </button>    ),  }}>  {markdown}</Streamdown>
```

## [Link to heading](#reactmarkdown-compatibility)ReactMarkdown compatibility

Streamdown now supports the remaining ReactMarkdown props, making migration a one-line replacement. Projects using ReactMarkdown can swap to Streamdown without refactoring component configurations.

```
<Streamdown  allowedElements={["p", "h1", "h2"]}  disallowedElements={["img"]}  unwrapDisallowed={false}  skipHtml={true}>  {markdown}</Streamdown>
```

This release also removes CommonJS builds, adds bundled-language aliases for common JavaScript, TypeScript, and shell labels, and includes numerous rendering and security fixes across tables, code blocks, LaTeX, and Mermaid diagrams.

Learn more in the [Streamdown docs](https://streamdown.ai/docs).