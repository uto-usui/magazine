---
title: "Redesigned search and filtering for runtime logs"
source: "https://vercel.com/changelog/redesigned-search-and-filtering-for-runtime-logs"
publishedDate: "2026-02-18"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

1 min read

Feb 18, 2026

The Runtime Logs search bar in your project dashboard has been redesigned to make filtering and exploring your logs faster and more intuitive.

-   **Structured filters.** When you type a filter like `level:error` or `status:500`, the search bar parses it into a visual pill you can read at a glance and remove with a click. Complex queries with multiple filters become easy to scan and edit without retyping anything
    
-   **Smarter suggestions.** As you type, the search bar suggests filter values based on your actual log data. Recent queries are saved per-project and appear at the top, so you can rerun common searches without retyping them
    
-   **Better input handling.** The search bar validates your filters as you type and flags errors with a tooltip so you can fix typos before running a search. Pasting a Vercel Request ID automatically converts it into a filter
    

These improvements are available now in your project dashboard. Learn more about [runtime logs](https://vercel.com/docs/observability/runtime-logs).