---
title: "April 2020"
source: "https://vercel.com/blog/changelog-april-2020"
publishedDate: "2020-04-01"
category: "frontend"
feedName: "Vercel"
---

2 min read

Apr 1, 2020

## [Link to heading](#dashboard)Dashboard

-   Dark mode will now automatically be enabled depending on your system settings. To overwrite it, use the Theme switcher accessible from your avatar menu.
    
-   When importing a third party Git repository or a template, the UI now provides a helpful message if it wasn't able to create a Git repository for you on the connected Git account.
    
-   When importing a Git repository, the UI now renders a proper error for when a required configuration file is not present.
    
-   After adding an Environment Variable to a project, the focus is shifted back onto the "Name" input, to make adding more of them easy.
    

## [Link to heading](#documentation)Documentation

-   The endpoint for canceling building deployments was added to the [API reference](https://zeit.co/docs/api#endpoints/deployments/cancel-a-deployment).
    
-   Retrieving [projects](https://zeit.co/docs/api#endpoints/projects/get-projects) and [secrets](https://zeit.co/docs/api#endpoints/secrets/list-secrets) is possible using pagination, for which the documentation was now properly updated.
    
-   The documentation for the [rewrites](https://zeit.co/docs/configuration#project/rewrites), [redirects](https://zeit.co/docs/configuration#project/redirects) and [headers](https://zeit.co/docs/configuration#project/headers) configuration properties now mentions the maximum amount of allowed entries.
    

## [Link to heading](#git-integration)Git Integration

-   Renaming your personal GitHub account or GitHub organization will not affect the behavior of the Git Integration anymore.
    

## [Link to heading](#pricing)Pricing

-   The legacy Advanced plan has been shut down entirely.
    
-   All teams are now able to customize their invoices on the Billing page, without having to opt into an additional feature.
    
-   Preview Deployment Suffix is now available as an additional feature for all teams on the [new Pro plan](https://zeit.co/pricing).
    

## [Link to heading](#projects)Projects

-   Deployments in projects created after April 30, 2020 00:00 (UTC) will not automatically receive Git Environment Variables. Projects created after this date should explicitly set [System Environment Variables](https://vercel.com/docs/v2/build-step#system-environment-variables) to consume Git-related information.