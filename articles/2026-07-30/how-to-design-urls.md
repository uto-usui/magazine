---
title: "How to design URLs"
source: "https://www.jstools.space/blog/url-design-routing-query-parameters-fragments/"
publishedDate: "2026-07-29"
category: "design"
feedName: "Sidebar"
---

A URL is part navigation, part application state, and part public interface. Once users bookmark it, search engines index it, monitoring systems record it, and other applications link to it, changing that URL becomes an architectural decision rather than a cosmetic edit.

Good URL design is therefore less about making every address look pretty and more about making it **predictable, stable, and unambiguous**.

This guide explains the anatomy of a URL, how to choose between paths, query parameters, and fragments, how browser routing changes the picture, and how to work with URLs safely in JavaScript and TypeScript.

If you want to inspect a real address while reading, open the [URL Parser](https://www.jstools.space/url-parser/). It separates the protocol, hostname, port, path segments, query entries, credentials, and fragment without uploading the URL.

## The Anatomy of a URL

Consider this address:

```
https://shop.example.com:8443/catalog/watches?brand=acme&sort=price#results
```

It contains several components with different responsibilities:

Component

Example

Purpose

Scheme

`https:`

Defines how the resource is accessed.

Hostname

`shop.example.com`

Identifies the server, including any subdomain.

Port

`8443`

Selects a network service when the default port is not used.

Path

`/catalog/watches`

Identifies a resource or application route.

Query string

`?brand=acme&sort=price`

Supplies optional parameters to the request or page state.

Fragment

`#results`

Identifies a location or client-side state inside the document.

The hostname and port together form the `host`. The scheme, hostname, and effective port form the `origin`. For the example above:

```
host   = shop.example.com:8443
origin = https://shop.example.com:8443
```

The distinction matters for cookies, storage, CORS, service workers, and other browser security boundaries.

## Paths Should Identify Stable Resources

The path is the part most people think of as “the route.” A useful path describes what resource the application is showing:

```
/products
/products/4815
/products/4815/reviews
/accounts/alex/security
```

These paths move from a collection to an item and then to a subordinate resource. The hierarchy is visible without requiring knowledge of the application code.

### Prefer predictable vocabulary

Choose a naming convention and keep it consistent:

-   use lowercase path segments;
-   separate words with hyphens;
-   use one convention for collections, commonly plural nouns;
-   avoid exposing implementation details such as `.php`, component names, or database table names;
-   avoid filler segments that add no useful hierarchy.

For example:

```
Avoid:  /Catalog/Product_Page/modern%20watch
Prefer: /catalog/products/modern-watch
```

Lowercase URLs are not merely stylistic. Paths can be case-sensitive, so `/Docs/API` and `/docs/api` may be different resources. A single lowercase convention prevents accidental duplicates and hard-to-find 404 responses.

### Slugs and IDs solve different problems

A readable slug helps people understand a link:

```
/products/modern-wristwatch
```

An immutable ID is less expressive but remains stable when the title changes:

```
/products/4815
```

For resources that can be renamed, a hybrid pattern is often the strongest option:

```
/products/4815-modern-wristwatch
```

The router extracts `4815` as the canonical identifier and treats the slug as descriptive. If the name changes, the server can redirect the old slug to the new canonical URL without losing the resource identity.

```
function productPath(product: { id: number; slug: string }): string {
  return `/products/${product.id}-${product.slug}`;
}

function readProductId(segment: string): number | null {
  const match = /^(\d+)(?:-|$)/.exec(segment);
  return match ? Number(match[1]) : null;
}
```

### Do not encode temporary UI state in the path

A path should normally remain meaningful when copied into another browser. Temporary values such as the open panel, current sort direction, or selected display density rarely identify a new resource.

```
Avoid:  /products/sort/price/direction/ascending/view/grid
Prefer: /products?sort=price&direction=asc&view=grid
```

The second form keeps the stable resource in the path and moves optional state into the query string.

## Routing Models: Server, Client, and Hybrid

Routing maps a URL to the code and data that produce a response. Modern applications commonly combine several routing models.

### Server routing

The browser requests a URL, and the server returns the corresponding HTML response. This includes traditional server-rendered applications as well as modern SSR frameworks.

Server routing works naturally with direct navigation, status codes, redirects, caching, and crawlers because every public URL has a server response.

### Client-side routing

A client router intercepts navigation and updates the visible interface without a full document reload. It also uses the History API so the address bar remains synchronized with the current view.

Client routing is not inherently bad for SEO. Problems arise when public routes return an empty shell, fail without JavaScript, or all respond with `200 OK` regardless of whether the resource exists. SSR, static prerendering, and careful server fallbacks solve most of these issues.

### Hybrid routing

Many production applications use server-rendered or prerendered HTML for the initial request, then activate client navigation after hydration. The same route table must make sense in both environments.

## Path, Query, or Fragment?

The easiest rule is to ask what the value means.

RESOURCE\_IDENTITY

### Use the path

-   +The value is required to identify the resource.
-   +The hierarchy should remain stable and linkable.
-   +Different values represent meaningfully different pages.

OPTIONAL\_STATE

### Use the query string

-   +The value filters, sorts, searches, or paginates a resource.
-   +Several values can be combined independently.
-   +Removing the parameter still leaves a valid page.

Use a fragment when the server does not need the value and it identifies a location or purely client-side state inside the current document.

URL part

Example

Typical role

Sent in HTTP request?

Path

`/guides/url-design`

Resource identity and hierarchy

Yes

Query

`?lang=en&page=2`

Filters, options, search, pagination

Yes

Fragment

`#query-parameters`

In-page location or local state

No

## Designing Query Parameters

Query parameters begin after `?` and are normally separated by `&`:

```
/products?category=watches&sort=price&page=2
```

They work well for:

-   search terms;
-   filters and facets;
-   sort order;
-   pagination or cursors;
-   display modes;
-   non-sensitive campaign attribution;
-   optional feature switches intended to be shareable.

Query parameters can absolutely affect the HTML returned by a server. `/products?page=1` and `/products?page=2` may contain different product lists. The important distinction is semantic: both URLs describe variations of the same product collection rather than unrelated resources.

### Use explicit names and stable values

Prefer names that can be understood without opening the implementation:

```
Avoid:  ?s=1&d=0&c=7
Prefer: ?sort=price&direction=asc&category=watches
```

Short names can be reasonable for established concepts such as `q`, but opaque abbreviations become expensive when links appear in analytics, logs, support tickets, and documentation.

### Decide how arrays are represented

There is no universal wire format for arrays in query strings. Common options include repeated keys, comma-separated values, and bracket notation:

```
?tag=javascript&tag=web
?tag=javascript,web
?tag[]=javascript&tag[]=web
```

The standard `URLSearchParams` API naturally supports repeated keys. They also avoid ambiguity when a value itself contains a comma:

```
const params = new URLSearchParams();
params.append("tag", "javascript");
params.append("tag", "web APIs");

console.log(params.toString());
// tag=javascript&tag=web+APIs

console.log(params.getAll("tag"));
// ["javascript", "web APIs"]
```

Whatever format you choose, document it and parse it consistently on the client and server.

### Empty, missing, and repeated values

Real query strings are rarely perfect:

```
?q=watch&sort=&filter=size&filter=color&preview
```

`URLSearchParams` handles this input predictably:

```
const params = new URLSearchParams(
  "?q=watch&sort=&filter=size&filter=color&preview",
);

params.get("q");          // "watch"
params.get("sort");       // ""
params.get("missing");    // null
params.get("filter");     // "size"
params.getAll("filter");  // ["size", "color"]
params.has("preview");    // true
params.get("preview");    // ""
```

Both `?preview` and `?preview=` produce an empty string through `get()`. If your backend distinguishes those raw forms, inspect the original query string before normalizing it.

Do not use truthiness when presence matters:

```
const sort = params.get("sort");

// Handles an explicitly empty value as well as a populated value.
if (sort !== null) {
  applySort(sort);
}
```

### Validate types at the boundary

Every query value is a string until your application validates and converts it. Avoid passing raw values deep into business logic.

```
function readPositiveInteger(
  params: URLSearchParams,
  key: string,
  fallback: number,
): number {
  const raw = params.get(key);
  if (raw === null) return fallback;

  const value = Number(raw);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

const params = new URLSearchParams("?page=2&limit=25");
const page = readPositiveInteger(params, "page", 1);
const limit = Math.min(readPositiveInteger(params, "limit", 20), 100);
```

Validation should also constrain accepted sort fields, enum values, date formats, and filter lengths. A URL is user input even when your own interface generated it.

## Fragments and In-Page Navigation

The fragment begins with `#`:

```
/docs/url-design#query-parameters
```

For ordinary HTML documents, the browser looks for an element whose `id` matches the fragment and scrolls it into view:

```
<h2 id="query-parameters">Query Parameters</h2>
```

Fragments are not included in HTTP requests. The server receives `/docs/url-design`, not `/docs/url-design#query-parameters`. This makes fragments useful for:

-   headings and footnotes;
-   tab or panel state that the server does not need;
-   text-fragment links generated by browsers;
-   static hosting environments that require hash routing.

Fragments are a poor place for state required during server rendering. They are also not a safe place for secrets: although the fragment is not sent in the request, client scripts, browser extensions, copied links, history, and screenshots can still expose it.

## Parse URLs with the URL API

Use the platform `URL` class instead of splitting strings on `/`, `?`, or `&`. Delimiters can appear inside encoded values, credentials, IPv6 hosts, and nested URLs.

```
const url = new URL(
  "https://user@example.com:8443/catalog/search" +
  "?q=smart%20watch&tag=sale&tag=new#results",
);

console.log({
  href: url.href,
  protocol: url.protocol, // "https:"
  username: url.username, // "user"
  hostname: url.hostname, // "example.com"
  port: url.port,         // "8443"
  host: url.host,         // "example.com:8443"
  origin: url.origin,     // "https://example.com:8443"
  pathname: url.pathname, // "/catalog/search"
  search: url.search,
  hash: url.hash,         // "#results"
});

console.log(url.searchParams.get("q"));
// "smart watch"

console.log(url.searchParams.getAll("tag"));
// ["sale", "new"]
```

For a relative URL, provide a base:

```
const url = new URL("../settings?tab=security", "https://example.com/account/");

console.log(url.href);
// https://example.com/settings?tab=security
```

Without a base, `new URL()` expects an absolute URL and throws a `TypeError` for relative input. Catch that error at user-input boundaries.

```
function safeParseUrl(input: string, base?: string): URL | null {
  try {
    return base ? new URL(input, base) : new URL(input);
  } catch {
    return null;
  }
}
```

## Build URLs Without String Concatenation

String concatenation creates subtle bugs around existing queries, missing separators, encoding, and fragments:

```
// Fragile: what if base already contains ? or #?
const link = base + "?q=" + searchTerm + "&page=" + page;
```

Build the URL structurally instead:

```
const url = new URL("/products", "https://shop.example.com");

url.searchParams.set("q", "mechanical watches");
url.searchParams.set("page", "2");
url.searchParams.append("tag", "sale");
url.searchParams.append("tag", "under $500");
url.hash = "results";

console.log(url.href);
// https://shop.example.com/products?q=mechanical+watches&page=2&tag=sale&tag=under+%24500#results
```

`URLSearchParams` performs form-style query encoding, where spaces become `+`. The `URL` class handles path, query, and fragment boundaries without double-encoding the complete address.

Use the [URL Encoder](https://www.jstools.space/url-encoder/) when you need to compare full-URL encoding with component encoding. `encodeURI()` and `encodeURIComponent()` are not interchangeable: the latter also escapes separators such as `?`, `&`, and `=`.

## Keep Browser State in Sync with the URL

Search results, filters, and tabs become easier to share when meaningful state is reflected in the URL. Update it through the History API without reloading the document:

```
function updateProductFilters(filters: {
  query: string;
  tags: string[];
  page: number;
}): void {
  const url = new URL(window.location.href);

  filters.query
    ? url.searchParams.set("q", filters.query)
    : url.searchParams.delete("q");

  url.searchParams.delete("tag");
  for (const tag of filters.tags) {
    url.searchParams.append("tag", tag);
  }

  filters.page > 1
    ? url.searchParams.set("page", String(filters.page))
    : url.searchParams.delete("page");

  history.replaceState(null, "", url);
}
```

Use `pushState()` when the change represents a navigation step that the Back button should revisit. Use `replaceState()` for corrections, defaults, or rapid intermediate updates that should not flood browser history.

Listen for `popstate` and rebuild the interface from the URL when the user navigates backward or forward. The URL should be a source of state, not a write-only display.

## URL Security and Privacy

URLs travel farther than most developers expect. They can appear in:

-   browser history and bookmarks;
-   server, proxy, CDN, and firewall logs;
-   analytics and error reports;
-   copied chat messages and support tickets;
-   screenshots and screen recordings;
-   referrer information sent during navigation;
-   monitoring dashboards and alert notifications.

Also treat redirect destinations as untrusted input. An endpoint such as `?next=https://evil.example` can become an open redirect unless the destination is restricted to approved origins or safe relative paths.

```
function safeLocalRedirect(value: string | null): string {
  if (!value) return "/";

  try {
    const target = new URL(value, window.location.origin);
    return target.origin === window.location.origin
      ? `${target.pathname}${target.search}${target.hash}`
      : "/";
  } catch {
    return "/";
  }
}
```

This example is a starting point, not a complete authorization system. Applications may need a stricter allowlist of permitted paths.

## SEO, Canonicals, and URL Migrations

Search engines can crawl URLs containing query parameters, but unrestricted combinations can create thousands of near-duplicate pages. Decide which URL states deserve indexing.

For public pages:

-   use one canonical hostname and scheme;
-   choose a trailing-slash policy and apply it consistently;
-   redirect alternate forms instead of serving both with `200 OK`;
-   keep canonical tags aligned with internal links and sitemap URLs;
-   avoid generating crawlable links for every meaningless filter permutation;
-   return real `404` or `410` responses for removed resources;
-   preserve valuable old URLs with targeted permanent redirects.

Do not automatically canonicalize every filtered page to its unfiltered parent. Some filtered views may have distinct search value and content. Canonical decisions should reflect whether the pages are genuinely duplicates.

When changing a URL:

1.  map the old URL to the closest new equivalent;
2.  add a permanent redirect;
3.  update internal links, canonical tags, structured data, and sitemap entries;
4.  keep query strings only when they still have meaning;
5.  monitor 404 reports and redirect chains after deployment.

A redirect is not permission to redesign URLs every few months. Stable addresses reduce maintenance work and preserve external links.

## Practical URL Design Checklist

Before publishing a route, verify that:

-   the path identifies a stable resource or hierarchy;
-   optional filters and view settings use documented query parameters;
-   fragments are reserved for in-document or client-only state;
-   path segments are lowercase and separated consistently;
-   IDs and slugs have a deliberate stability strategy;
-   array parameters have one documented representation;
-   query values are decoded, validated, and bounded;
-   URL construction uses `URL` and `URLSearchParams`;
-   secrets and sensitive personal data are absent;
-   redirect parameters cannot point to arbitrary origins;
-   direct navigation works without relying on prior client state;
-   missing resources return an accurate status code;
-   canonical tags, internal links, and sitemap URLs use the same format;
-   old public URLs have specific redirects after a migration.

## Final Takeaway

Paths, query parameters, and fragments are not interchangeable decorations. Each communicates a different kind of meaning:

-   **paths identify resources;**
-   **queries describe optional request or page state;**
-   **fragments identify a location or client-side state inside the document.**

Once that separation is clear, route design becomes less subjective. Build URLs with platform APIs, validate every external value, keep public addresses stable, and make the browser’s Back, Forward, Reload, Copy, and Bookmark actions work as users expect.

## Frequently Asked Questions

What is the difference between a path, query string, and URL fragment?

The path identifies a resource or route, the query string modifies the request or representation, and the fragment identifies a location or state inside the returned document. Paths and queries are sent to the server; fragments are handled by the browser and are not included in HTTP requests.

Should filters be path segments or query parameters?

Use query parameters when filters are optional, combinable, or order-independent. Use path segments when a value is required to identify the resource or represents a stable hierarchy in the application.

Are query parameters bad for SEO?

No. Query parameters are a normal part of the web. Problems appear when many combinations create duplicate or low-value crawlable pages. Use consistent parameter rules, canonical URLs, deliberate internal linking, and indexing controls where appropriate.

Should URLs contain database IDs or readable slugs?

Readable slugs help people, while stable IDs prevent collisions and survive title changes. Many applications combine both, such as `/products/4815-modern-wristwatch`, and route by the immutable ID.

Is hash-based routing obsolete?

Hash routing still helps in static environments that cannot rewrite requests, but normal paths with server fallback, SSR, or prerendering usually provide cleaner URLs and better integration with the web platform.

Can passwords or access tokens be stored in query parameters?

Avoid it. URLs may be stored in history, logs, analytics, screenshots, copied messages, and referrer data. Put secrets in secure headers or request bodies and keep sensitive state out of shareable URLs.