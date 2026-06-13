---
title: "Boneyard: skeleton screens for your UI"
source: "https://boneyard.vercel.app/overview"
publishedDate: "2026-06-12"
category: "design"
feedName: "Sidebar"
---

## Skeleton screens.  
Automatically generated.

**boneyard**snapshots your real UI and captures a flat list of skeleton “bones” — positioned, sized rectangles that mirror the page exactly.

No manual measurement. No hand-tuned placeholders. Wrap your component in `<Skeleton>` and get pixel-perfect skeleton screens that stay in sync with your actual layout.

localhost:3000

Real UI

![boneyard](https://boneyard.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75)

Downloads

18.2k

Stars

4,521

Bones

1.2M

v1.8.1 — 7 bones captured

v1.8.0 — 12 routes scanned

Skeleton

![boneyard](https://boneyard.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75)

How you use it

1

Wrap your component

import { Skeleton } from 'boneyard-js/react'
<Skeleton name\="blog-card" loading\={isLoading}\>
  {data && <BlogCard data={data} />}
</Skeleton\>

2

Run the CLI once to generate bones

npx boneyard-js build

Auto-detects your running dev server and Tailwind breakpoints. Writes responsive JSON to `src/bones/` automatically. Customize with `boneyard.config.json`.

3

Import the registry once

import './bones/registry'

Add this to your app entry (e.g. `layout.tsx`). Every `<Skeleton>` auto-resolves its bones by name.

The skeleton is extracted from your **real rendered content**. Run `npx boneyard-js build` once to generate bones JSON from your live DOM. Import the registry once and every `<Skeleton>` auto-resolves — pixel-perfect, zero layout shift.

Built for production

~7.5KB runtime

The React component is tiny. Bones data is static JSON — no layout engine at runtime.

Compact format

Bones are stored as arrays instead of objects — smaller JSON files, faster parsing.

Incremental builds

The CLI hashes each skeleton and skips unchanged ones — only modified components are recaptured.