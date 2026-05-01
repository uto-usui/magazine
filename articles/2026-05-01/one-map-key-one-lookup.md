---
title: "One Map Key, One Lookup"
source: "http://testing.googleblog.com/2026/04/one-map-key-one-lookup.html"
publishedDate: "2026-04-29"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

_This article was adapted from a Google [Tech on the Toilet](https://testing.googleblog.com/2024/12/tech-on-toilet-driving-software.html) (TotT) episode. You can download a [printer-friendly version](https://docs.google.com/document/d/1lXVg8VvY0edYgNZMR7l4ukzfujw2ASlBcTTVqtomgGY/preview?tab=t.0) of this TotT episode and post it in your office._

Can you spot the wasted CPU cycles in the map usage?

if employee\_id in employees:

  mail\_to(employees\[employee\_id\].email\_address)

The redundant lookup caused the waste by performing a check (in) and a fetch (\[\]) as two separate operations when one is sufficient.

Every lookup involves a cost—whether it's computing a hash and scanning buckets or performing an O(log n) traversal. These costs add up quickly. But avoiding them isn’t just “premature optimization”—it’s about writing cleaner, more robust code that stays efficient at scale and prevents potential race conditions.

Instead of paying this cost twice, perform the lookup once and reuse the result:

if (employee := employees.get(employee\_id)) is not None:

  mail\_to(employee.email\_address)

Assigning the search result to a variable avoids a second lookup. This efficiency is native to Go via the “comma ok” idiom (val, ok := map\[key\]) and C++ using map.find(key), both handling retrieval and existence in a single pass.

The same inefficiency applies when counting or initializing default. Stop checking for presence; instead, use idioms that handle missing keys automatically at the container level:

The redundant way

The efficient way

If key not in counts:

  counts\[key\] = 1

else:

  counts\[key\] += 1

counts = defaultdict(int)  \# Initializes 0 automatically

\# ... other logic ...

counts\[key\] += 1

Here are some details depending on which language you use:

-   C++: operator\[\] returns a reference to the value—automatically inserting a default (like 0) if the key is missing—allowing the increment to happen in place.
-   Java: Use map.computeIfAbsent() to perform retrieval and updates in a single call. This is more concise and, on concurrent collections, has the potential to be thread-safe—preventing the “check-then-act” race conditions common with separate contains and put calls.
-   Python: Use collections.defaultdict to handle defaults at the container level, which pushes the logic into optimized C code for better performance and robustness. Note that the += operation (shown later in the above code sample) still involves both a read and a write operation.
-   Go: Use val, ok := map\[key\] to handle retrieval and existence in one memory access.