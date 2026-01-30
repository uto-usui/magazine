---
title: "Shai-Halud Supply Chain Campaign — Expanded Impact & Vercel Response"
source: "https://vercel.com/changelog/shai-halud-supply-chain-campaign-expanded-impact-and-vercel-response"
publishedDate: "2025-09-16"
category: "frontend"
feedName: "Vercel"
author: "Aaron Brown"
---

2 min read

Sep 16, 2025

## [Link to heading](#summary)Summary

The **Shai-Halud** supply chain campaign has escalated. What began with the Qix compromise affecting ~18 core npm packages (`chalk`, `debug`, `ansi-styles`, etc.) has since spread:

-   Over 40 additional packages attacked via the Tinycolor “worm” vector.
    
-   The CrowdStrike / `crowdstrike-publisher` namespace was also compromised, with multiple trojanized releases.
    
-   The DuckDB maintainer account (`duckdb_admin`) published malicious versions matching the same wallet-drainer malware used in the Qix incidents. No Vercel customers were impacted in that DuckDB subset.
    

## [Link to heading](#impact-to-vercel-customers)Impact to Vercel Customers

-   We identified **a small set of 10** Vercel customer projects whose builds depended (directly or transitively) on the compromised package versions.
    
-   Impacted customers have been notified and provided with project-level guidance.
    
-   In the DuckDB incident, no Vercel customer build was affected.
    

## [Link to heading](#what-we-did)What We Did

**Action**

**Status**

Blocklisted known compromised versions from the Tinycolor, CrowdStrike, Qix, and DuckDB-affected packages

✅ Completed

Purged build caches for Vercel projects using those versions

✅ Completed for impacted projects

Coordinated safe rebuilds with clean dependencies / pinned safe versions

✅ In progress / completed for impacted ones

Raised platform alerting & detection thresholds for new package publishes matching the Shai-Halud indicators

✅ Elevated monitoring active

## [Link to heading](#what-we’re-watching-&-doing)What We’re Watching & Doing

-   Working closely with npm, open-source maintainers, and ecosystem security partners to track any further spread of Shai-Halud.
    
-   Enhancing our supply chain defenses so that
    
    **deployments on Vercel remain secure by default**
    
    : stricter policies on lifecycle/postinstall scripts, lockfile hygiene, and registry validation.
    
-   Tightening internal CI/CD controls and developer tooling to catch suspicious package behavior early.
    

## [Link to heading](#recommendations-for-vercel-users)Recommendations for Vercel Users

-   For teams using pnpm, consider enabling the new [`minimumReleaseAge`](https://pnpm.io/blog/releases/10.16#new-setting-for-delayed-dependency-updates) setting introduced in pnpm 10.16 to delay dependency updates (e.g., 24 hours). This helps reduce risk from compromised versions that are discovered and removed shortly after publishing.
    
-   Audit your dependencies (direct & transitive) to check for packages from these affected namespaces.
    
-   Rebuild with pinned safe versions and clean lockfiles (`pnpm ci`).
    
-   Rotate any npm / GitHub / CI/CD tokens that may have been used in environments where compromised dependencies were present.
    
-   Inspect GitHub repos for unauthorized workflows or unexpected `.github/workflows` additions.
    
-   Enforce least privilege (especially in automated workflows), and limit lifecycle script permissions.
    

## [Link to heading](#timeline)Timeline

-   **September 8, 2025**
    
    — Qix / Tinycolor / core package compromise discovered.
    
-   **September 9, 2025**
    
    — DuckDB issue identified.
    
-   **September 15-16, 2025**
    
    — CrowdStrike / Tinycolor “worm” style propagation detected; Vercel detection expanded.
    
-   **September 16, 2025**
    
    — Customer notifications, cache purges, safe rebuilds underway.
    

## [Link to heading](#references)References