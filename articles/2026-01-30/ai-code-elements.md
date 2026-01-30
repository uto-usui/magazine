---
title: "AI Code Elements"
source: "https://vercel.com/changelog/ai-code-elements"
publishedDate: "2026-01-21"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

2 min read

Jan 21, 2026

Today we're releasing a brand new set of components designed to help you build the next generation of IDEs, coding apps and background agents.

## [Link to heading](#<agent-/>)[<Agent />](https://ai-sdk.dev/elements/components/agent)

A composable component for displaying an AI SDK [ToolLoopAgent](https://ai-sdk.dev/docs/agents/overview) configuration with model, instructions, tools, and output schema.

```
npx ai-elements add agent
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F9Lcgk6qBtmY3ZZQnG7WEU%2F07d708bf5cc86aac62e0f97a27283b7b%2FCleanShot_2026-01-18_at_09.29.42_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F35iP1JsUZvcVMuIhyO7Vz8%2F831ca9cef8e49820bfbad392538c60ce%2FCleanShot_2026-01-18_at_09.29.46_2x.png&w=1920&q=75)

## [Link to heading](#<codeblock-/>)[<CodeBlock />](https://ai-sdk.dev/elements/components/code-block)

Building on what we've learned from [Streamdown](https://streamdown.ai/), we massively improved the code block component with support for a header, icon, filename, multiple languages and a more performant renderer.

```
npx ai-elements add code-block
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FNCPOBJRmmpkTGYpVv8lNR%2Ffc59f4f85b0d2c996be0aabf9ee7de09%2FCleanShot_2026-01-18_at_09.30.16_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F53D7znO6zbgy1JuBPDu4Qr%2F9a7885c543cdae939679d0cca3f9c856%2FCleanShot_2026-01-18_at_09.30.10_2x.png&w=1920&q=75)

## [Link to heading](#<commit-/>)[<Commit />](https://ai-sdk.dev/elements/components/commit)

The Commit component displays commit details including hash, message, author, timestamp, and changed files.

```
npx ai-elements add commit
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FbQKzL7A18S9Z3GNmLbhRI%2F9c0b24825ef656920b067bb0b89334b0%2FCleanShot_2026-01-18_at_09.31.05_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2oABMtij5BxsFIR7V7reD2%2F2fd5c3a10b39a4af83d938f42451b42b%2FCleanShot_2026-01-18_at_09.31.09_2x.png&w=1920&q=75)

## [Link to heading](#<environmentvariables-/>)[<EnvironmentVariables />](https://ai-sdk.dev/elements/components/environment-variables)

The EnvironmentVariables component displays environment variables with value masking, visibility toggle, and copy functionality.

```
npx ai-elements add environment-variables
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F10pyVjOssryZWClt8O19Kq%2F9e42e2e2177d4d61a9c73c8b58957184%2FCleanShot_2026-01-18_at_09.33.35_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5RIPQiGU4xzFvjQNi0xn8y%2F575a548c7f3d6ebd55eed65cbe10a28a%2FCleanShot_2026-01-18_at_09.33.32_2x.png&w=1920&q=75)

## [Link to heading](#<filetree-/>)[<FileTree />](https://ai-sdk.dev/elements/components/file-tree)

The FileTree component displays a hierarchical file system structure with expandable folders and file selection.

```
npx ai-elements add file-tree
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5CN8oxylptd6ilAoRYeHSG%2Fafc51ddfe5bcf53895026093c940e66b%2FCleanShot_2026-01-18_at_09.33.55_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6cALf8NLHhIfCfWrIzYe3c%2F014d0085f11aacef8e0afcb696b37a61%2FCleanShot_2026-01-18_at_09.33.58_2x.png&w=1920&q=75)

## [Link to heading](#<packageinfo-/>)[<PackageInfo />](https://ai-sdk.dev/elements/components/package-info)

The PackageInfo component displays package dependency information including version changes and change type badges.

```
npx ai-elements add package-info
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4M4enrxOfTKyHuLHmFvnud%2F926a064222e6a2e4453c5b6983226fad%2FCleanShot_2026-01-18_at_09.34.21_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F17dvWSMkD9PygXmJmpGs7K%2F9a2c268f9bf676c568323184460b0c89%2FCleanShot_2026-01-18_at_09.34.17_2x.png&w=1920&q=75)

## [Link to heading](#<sandbox-/>)[<Sandbox />](https://ai-sdk.dev/elements/components/sandbox)

The Sandbox component provides a structured way to display AI-generated code alongside its execution output in chat conversations. It features a collapsible container with status indicators and tabbed navigation between code and output views.

```
npx ai-elements add sandbox
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F14Req5pFWcchf0NHiIkMhH%2F5fd8c9ef828994020bd46d1cfafb4e54%2FCleanShot_2026-01-18_at_09.34.40_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6r5QTregllGg9KwM5FhzCb%2F2f78a8eae048fe2638bf63a665f267c5%2FCleanShot_2026-01-18_at_09.34.42_2x.png&w=1920&q=75)

## [Link to heading](#<schemadisplay-/>)[<SchemaDisplay />](https://ai-sdk.dev/elements/components/schema-display)

The SchemaDisplay component visualizes REST API endpoints with HTTP methods, paths, parameters, and request/response schemas.

```
npx ai-elements add schema-display
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2mXDsEy9TYMm9Ls0IuIl4E%2Fbb799a3dfc4b43b5b0c7dbe0c31e86c6%2FCleanShot_2026-01-18_at_09.35.35_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1ywYDazUfK8GR64IRrp59z%2F5a952344802ea87c7c8c598c938ad8a6%2FCleanShot_2026-01-18_at_09.35.32_2x.png&w=1920&q=75)

## [Link to heading](#<snippet-/>)[<Snippet />](https://ai-sdk.dev/elements/components/snippet)

The Snippet component provides a lightweight way to display terminal commands and short code snippets with copy functionality. Built on top of shadcn/ui InputGroup, it's designed for brief code references in text.

```
npx ai-elements add snippet
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7LHIeT2ckuHPXtCwa79GhJ%2F681516bc1cf6270dc7ceea52839260ce%2FCleanShot_2026-01-18_at_09.35.49_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7rkhm9CSOg0FLekPXO4bzp%2F3bd4b61badfd4a49d752b4092ecfc679%2FCleanShot_2026-01-18_at_09.35.52_2x.png&w=1920&q=75)

## [Link to heading](#<stacktrace-/>)[<StackTrace />](https://ai-sdk.dev/elements/components/stack-trace)

The StackTrace component displays formatted JavaScript/Node.js error stack traces with clickable file paths, internal frame dimming, and collapsible content.

```
npx ai-elements add stack-trace
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7vBeq3SyJHlhW9sI37xr7%2F2f7ea2325901b82cdd1d41b748c3af5e%2FCleanShot_2026-01-18_at_09.36.20_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F361Eqj41M36N5J91UU5ajx%2Fd5f4caa4c0b0815db2f7dbd0031866d9%2FCleanShot_2026-01-18_at_09.36.16_2x.png&w=1920&q=75)

## [Link to heading](#<terminal-/>)[<Terminal />](https://ai-sdk.dev/elements/components/terminal)

The Terminal component displays console output with ANSI color support, streaming indicators, and auto-scroll functionality.

```
npx ai-elements add terminal
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3kHORruainYOMYRya0LlKW%2F47df77462f41372849c43049d6fd55e2%2FCleanShot_2026-01-18_at_09.36.33_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F21hDTIlvMp5LUFrAnFjm7q%2F3c96ed602a821060ae6712104b656f55%2FCleanShot_2026-01-18_at_09.36.36_2x.png&w=1920&q=75)

## [Link to heading](#<testresults-/>)[<TestResults />](https://ai-sdk.dev/elements/components/test-results)

The TestResults component displays test suite results (like Vitest) including summary statistics, progress, individual tests, and error details.

```
npx ai-elements add test-results
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7Gqs2UnizraHiwmexorTsT%2Fb0b324ade11531e204d068ac3e061fdf%2FCleanShot_2026-01-18_at_09.37.02_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6M0f4y3KgCeEpGyF2H5lIs%2F94677c9f05f6ac4ddcdf35e3137be1b5%2FCleanShot_2026-01-18_at_09.36.58_2x.png&w=1920&q=75)

## [Link to heading](#bonus:-<attachments-/>)[Bonus: <Attachments />](https://ai-sdk.dev/elements/components/attachments)

Not code related, but since attachment were being used in Message, PromptInput and more, we broke it out into its own component - a flexible, composable attachment component for displaying files, images, videos, audio, and source documents.

```
npx ai-elements add attachments
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F139wgjouur2PbXPcbt6W1R%2F9eaed2d1f1bd2260fb3de13ac3b65059%2FCleanShot_2026-01-18_at_09.50.09_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1NiMJmmIB5WLAel8SRwvrM%2F9b56f60d6eb5a1fa7df942dff679c17f%2FCleanShot_2026-01-18_at_09.50.12_2x.png&w=1920&q=75)