---
title: "s1ngularity: supply chain attack in Nx packages"
source: "https://vercel.com/changelog/s1ngularity-supply-chain-attack-in-nx-packages"
publishedDate: "2025-08-27"
category: "frontend"
feedName: "Vercel"
author: "Aaron Brown"
---

3 min read

Aug 27, 2025

Threat actors published modified versions of the Nx package and some of its supporting libraries to the npm registry with the goal of exfiltrating developer and service credentials.

**Builds on Vercel are safe from this vulnerability by default.** [Visit the GitHub advisory](https://github.com/nrwl/nx/security/advisories/GHSA-cxm3-wv7p-598c) to check if your local or other CI environments are impacted.

## [Link to heading](#summary)Summary

A malicious version of the Nx package and some Nx ecosystem libraries were published to the npm registry using a stolen npm token, starting at 6:32 PM EDT on August 26, 2025. The compromised packages were removed from the npm registry by the Nx team, ending at 10:44 PM EDT on the same day.

The affected packages contained a `postinstall` script that scanned the user's file system using an LLM to exfiltrate secrets and credentials when installing an affected package. Exfiltrated secrets were posted as an encoded string into a GitHub repo that the script would create in the victim's GitHub account. For more information, [visit the advisory on GitHub from the Nx team](https://github.com/nrwl/nx/security/advisories/GHSA-cxm3-wv7p-598c).

## [Link to heading](#impact-for-vercel-customers)Impact for Vercel customers

By default, Vercel customers are not impacted, and can only be affected by the compromised Nx packages if they took specific steps leveraging the build container's flexibility.

Four conditions are required for the `postinstall` script to exfiltrate data from a Vercel build:

-   The script uses the GitHub CLI (`gh`) to acquire a GitHub token. The GitHub CLI is not installed in Vercel's build container by default. For the GitHub CLI to be present in your build, it must be installed as part of your user-defined build process.
    
-   The script requires a GitHub authentication token to be present on the machine invoking the GitHub CLI. The Vercel build container does not contain customer GitHub tokens by default. For the GitHub token to be present in your build, it must be added to the build container as part of your user-defined build process.
    
-   The script depends on the machine having at least one of the Claude Code (`claude`), Gemini (`gemini`), or Q (`q`) CLIs installed. The Vercel build container does not have any of these installed by default. For any of these CLIs to be present in your build, they must be installed as part of your user-defined build process.
    
-   A build must have installed a compromised version of Nx or Nx ecosystem packages.
    

We did not identify any builds on Vercel meeting this pattern. We encourage you to evaluate other environments, local and cloud, that may have been vulnerable to this attack.

## [Link to heading](#resolution)Resolution

New builds will not be able to download the affected packages. The Nx team has removed affected packages from npm, and we have purged the [build caches](https://vercel.com/docs/glossary#build-cache) for any projects that contained affected packages in their dependencies during a build.

Additionally, we've notified a small number of users who installed one or more of the malicious packages during a build. Vercel team owners should check for an email titled "s1ngularity: supply chain attack in Nx packages" from security@vercel.com.

## [Link to heading](#references)References