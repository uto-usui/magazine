---
title: "March 2020"
source: "https://vercel.com/blog/changelog-march-2020"
publishedDate: "2020-03-01"
category: "frontend"
feedName: "Vercel"
---

2 min read

Mar 1, 2020

## [Link to heading](#dashboard)Dashboard

-   Deleted teams and personal accounts will now undergo a buffer period during which they may be recovered (7 days for teams and 48 hours for personal accounts). Only after this period, their usernames and slugs will be available.
    
-   The "need help?" link in the "Domains" settings of each project now opens the support form instead of a ZenDesk modal.
    
-   Using a team slug that used to be the a username of personal account is now possible, but requires the personal account that used to own the name to deploy to the team, in order to "unlock" the name.
    
-   The "Billing" page of Personal Accounts (Hobby) now properly mentions that Personal Accounts cannot be upgraded and remain free forever. However, creating a team is advised for professional use cases or collaborating with other people.
    
-   Personal accounts and teams now render a "Invite Team" button on the dashboard, which allows for creating a team and inviting members much more easily.
    
-   The "Tokens" page now shows a "Load More" button if more than 20 tokens are present.
    
-   Public Deployments now show Domains on their overview instead of `–`.
    
-   A "Preview Deployment Suffix" fieldset was added to the team settings, which let's you replace the `now.sh` suffix with a Custom Domain.
    

## [Link to heading](#git-integration)Git Integration

-   For the [GitHub integration](https://zeit.co/github), personal accounts on Vercel can only be connected to personal accounts on GitHub, not organizations.
    

## [Link to heading](#documentation)Documentation

-   Configuration and API References will now show up in the documentation search.
    
-   The information about how to retrieve data for a team has moved from the "Users and Teams" section in "Platform" to the [API reference](https://zeit.co/docs/api#api-basics/authentication/accessing-resources-owned-by-a-team).
    
-   The maximum payload for Serverless Functions is now [documented](https://zeit.co/docs/v2/platform/limits#serverless-function-payload-size-limit).
    
-   Now that Preview Deployments are responding with a `X-Robots-Tag` header set to `noindex`, a detailed section was added [here](https://zeit.co/docs/v2/platform/deployments#preview).
    
-   Detailed instructions about how to disconnect the GitHub, Bitbucket or GitLab integration were added to their respective documentation pages ([example at the bottom](https://zeit.co/docs/v2/git-integrations/zeit-now-for-github)).
    
-   The Developer Tools Console on the Documentation now prints a link to the respective Git commit.
    
-   [Removed](https://github.com/zeit/now/pull/3864) all examples for which no option is provided in the Project Settings.
    

## [Link to heading](#deployments)Deployments

-   Personal accounts that downgrade to the "Hobby" plan will not see their deployments get blocked anymore.
    
-   Updated Ruby to version [2.7.x](https://zeit.co/docs/runtimes#official-runtimes/ruby/ruby-version) for new deployments.
    

## [Link to heading](#domains)Domains

-   Moving a domain to a different personal account or team now works flawlessly again.
    
-   The `.yt` TLD is no longer available due to requiring a local address.