---
title: "Refactoring internal documentation in Notion"
source: "https://lethain.com/refactoring-internal-docs-notion/"
publishedDate: "2026-02-12"
category: "design"
feedName: "Sidebar"
---

In our latest developer productivity survey, our documentation was the area with the second most comments. This is a writeup of the concrete steps I took to see how much progress one person could make on improving the organization’s documentation while holding myself to a high standard for making changes that actually worked instead of optically sounding impressive.

## Diagnosis

There were a handful of issues we were running into:

-   We migrated from Confluence to Notion in January, 2025, which had left around a bunch of old pages that were “obviously wrong.”
    
    These files created a bad smell around our other docs, as folks felt like things weren’t well maintained.
    
-   We had inconsistent approach to what we documented in Git-managed files versus managing in Notion. This led to duplication.
    
-   Duplication meant that it felt safer to create an `N+1`th version, rather than debugging why `N` versions already existed.
    
-   We’ve had a bunch of new folks join over the past year, who weren’t sure if _they_ were empowered to update documentation or if someone else was managing any given file
    
-   We started using Notion AI as the primary mechanism for exposing content, which meant that hierarchical organization was less important, and that having inaccurate snippets was harmful even if they were tucked away into a quiet corner
    

This was combined with a handful of interesting limitations in Notion itself:

-   You cannot tell if a non-wiki page is verified or not via API. You _can_ tell if a wiki page is verified via API, but no one uses wiki pages
-   You cannot retrieve all pages in a Notion Teamspace via API, you instead have to manually take list of the top-level pages in that Teamspace, and find the children from those pages
-   There is no “archive” functionality in Notion that allows you to exclude a document from search results
-   There is no programmatic visibility into views or usage of a page via API _except_ for how recently it was edited

## Policy

The policy we adopted for addressing the above diagnosis was:

1.  **Optimize for NotionAI results, not manual discovery**: a significant majority of our Notion use is now via either direct links to a specific page, or via Notion AI, not via manual discovery. That means that things like “FAQ” pages that duplicate content and go stale are actively harmful, whereas previously they were very valuable.
2.  **Duplication and stale content is worse than nothing**: do not write your own guide to a process. Link to it instead, or update the source document
3.  **Prefer natural documentation in version control**: we’d rather link to a README in Github than duplicate those instructions in Notion, because the README is more likely to be kept current
4.  **Everyone tidies our documentation**: we’d rather be people who try to clean up a document, even if we make a small mistake, rather than someone who leaves documentation in a poor state
5.  **Automatic beats manual every time**: we’re a busy team doing a lot of things, it’s always going to be difficult to consistently find time to manually curate content deeply, focused curation is great, but global is unreasonable

## Implementation

Then the specifics of implementing that policy were:

1.  **Create `Scheduled to Archive` and `Archive` teamspaces.** The `Archive` teamspace is a private teamspace, such that documents added there don’t pollute the search index. Conversely, `Scheduled to Archive` is public, where anyone can add documents to its root document.
    
    We have a weekly script that migrates everything from `Scheduled to Archive` to `Archive`.
    
    This was the most effective mechanism we could find to implement archiving within Notion’s constraints.
    
2.  **Prune expired pages.** Created a script which recursively builds hierarchy from a root page, enriches each page with the `last_edited_date` for each child, and then prunes all pages where it _and all children_ were last edited more than `N` days ago.
    
    Using this script on 3-4 most relevant top-level pages, we archived about 1,500 pages of expired documentation.
    
3.  **Compact stale hierarchies.** Created a second script which identifies current pages deep in stale hierarchies, e.g. the one updated page among 15 inaccurate docs. After finding a “buried current page”, promotes it to the grandparent page, and move the parent page (and its stale children) to `Scheduled to Archive`.
    
    This ended up as a script that found all the candidates, and then I worked through approving/rejecting each suggestion. The biggest issue being the lack of “verification” status within the API, such that there’s no way to bless given pages and their descendants.
    
4.  **Stale link finder.** Created a third script which recursively works through a hierarchy and finds 404s. It’s essential that this script _does not_ have access to the `Archive` so those scripts show up as 404s, otherwise you would have to scan through `Archived` to find things there. Both approaches would work, just a bit of a matter of preference.
    
    Ran this after the mass migrations to ensure we didn’t leave a “haunted forest” of links into archived documents that folks can’t see, which would make the documentation still feel bad even though much of the bad content was removed.
    
5.  **Manual review of key pages.** After running all of the above steps, I then worked through all new-hire documentation to ensure it was linked to top-level onboarding guide, stated clear prerequisites, indicated the Slack channel to get help if folks ran into trouble, and ensured that instructions did not duplicate our Git-managed READMEs, instead linking to them where appropriate.
    
    I did a lighter pass of this approach for our top-level engineering and technology pages, although those were generally in a good place.
    

Altogether, I think this was about eight hours of my time, but required zero hours of anyone else’s, and will have hopefully significantly improved the quality of our documentation. There’s still a lot more to be done in specific areas, but I’m optimistic that having far fewer duplicates, and more evidence that we’re actively maintaining the documentation, will make that easier as well.