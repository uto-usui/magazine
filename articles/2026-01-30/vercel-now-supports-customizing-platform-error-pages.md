---
title: "Vercel now supports customizing platform error pages"
source: "https://vercel.com/changelog/vercel-now-supports-customizing-platform-error-pages"
publishedDate: "2026-01-23"
category: "frontend"
feedName: "Vercel"
author: "Chandan Rao"
---

1 min read

Jan 23, 2026

You can now customize error pages for platform errors on Vercel, replacing generic error pages with your own branded experiences. Custom error pages display when Vercel encounters uncaught errors like function invocation timeouts or other [platform errors](https://vercel.com/docs/errors).

### [Link to heading](#how-it-works)How it works

You can implement custom error pages using your framework’s conventions and Vercel will automatically locate them, for example with Next.js you can simply place a `500/page.tsx` or static `500.html` page in the `public` directory.

To enrich error pages with request-specific context, you can use the following metadata tokens:

-   `::vercel:REQUEST_ID::` - Contains the Vercel request ID
    
-   `::vercel:ERROR_CODE::` - The specific error code e.g. `FUNCTION_INVOCATION_TIMEOUT`
    

500/page.tsx

```
export default function CustomErrorPage() {  return (    <div className="flex min-h-screen flex-col items-center justify-center">      <h1 className="text-4xl font-bold">500</h1>      <p className="mt-4 text-lg text-gray-600">Internal Server Error</p>      <p className="mt-2 text-sm text-gray-500">        Request ID: ::vercel:REQUEST_ID::      </p>      <p className="mt-2 text-sm text-gray-500">        Code: ::vercel:ERROR_CODE::      </p>      <p className="mt-2 text-sm text-gray-500">        Something went wrong on our end. Please try again later.      </p>      <a href="/" className="mt-6 text-blue-600 hover:underline">        Go back home      </a>    </div>  );}
```

We strongly recommend including the request ID and error code to aid debugging and support investigations.

This feature is available for Enterprise teams and enabled automatically across all projects. No additional configuration required.

See the [documentation](http://vercel.com/docs/custom-error-pages) to get started or reference the following implementations: [Custom error pages with App Router](https://github.com/vercel/examples/tree/main/cdn/custom-error-pages-app-dir/) or [Custom error pages with public directory](https://github.com/vercel/examples/tree/main/cdn/custom-error-pages-public-dir/).