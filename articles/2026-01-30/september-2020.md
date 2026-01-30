---
title: "September 2020"
source: "https://vercel.com/blog/changelog-september-2020"
publishedDate: "2020-09-01"
category: "frontend"
feedName: "Vercel"
---

6 min read

Sep 1, 2020

## [Link to heading](#dashboard)Dashboard

-   A new "Login Connections" page was added to the Personal Account Settings as a replacement for the "OAuth" page. It now renders all three Git providers instead of just GitHub.
    
-   The Project View now allows for jumping directly to the connected Git repository by clicking on its name. Previously, this forwarded users to the Project Settings.
    
-   Users that are entering the Project Creation Flow through a [Deploy Button](https://vercel.com/docs/more/deploy-button) are now presented with a dedicated screen that explains what Vercel is and optionally renders a preview of the Git repository that they're about to deploy.
    
-   The "Visit" button on the Deployment View now correctly suggests deploying to the right Production Branch if no Production Deployment was created yet.
    
-   For failed Deployments, the "Redeploy" button on the Deployment View is now always visible, regardless of whether the Deployment was created via Git or not.
    
-   The pages of the [Project Creation Flow](https://vercel.com/new) will now always be visually attached to the top of the viewport instead of moving around whenever they're growing in height.
    
-   In the Project Settings, the banner that indicates that Environment Variables can now be configured on a dedicated page was removed for everyone.
    
-   The confirmation modals that are rendered after clicking the "Redeploy" or "Promote to Production" button now reliably render correct information.
    
-   Clicking "Promote to Production" will now cause helpful notifications to be rendered on the bottom right of the screen.
    
-   Losing your connection to the internet will no longer cause the Vercel Dashboard to crash. Instead, a notification will be rendered.
    
-   Clicking the "Back" button in the [Project Creation Flow](https://vercel.com/new) now works reliably.
    
-   Switching to a different Personal Account or Team now results in a good transition, regardless of which page you're looking at.
    
-   Queued Deployments will no longer render on the Deployment View that they're waiting for the Build to finish. Instead, they will now render that they're waiting for the Build to start.
    
-   It's not longer possible to redeploy a Production Deployment if a more recent one has been created. This ensures the most recent Production Deployment is never accidentally overwritten with old source code (only possible via explicit "Promote to Production").
    
-   Whenever a Deployment is automatically canceled by the [Ignored Build Step](https://vercel.com/docs/platform/projects#ignored-build-step) feature, a helpful message is now rendered on the Deployment View.
    
-   The Deployment View will now render a helpful message whenever a Serverless Function exceeds the maximum unzipped Lambda size.
    
-   The button for removing Environment Variables in the [Project Creation Flow](https://vercel.com/new) can be clicked again.
    
-   Build Logs rendered on the Deployment View are now automatically cut off at 2,000 lines and a helpful message is displayed. This is to prevent the user's browser from running out of memory.
    
-   Creating a Deployment in the [Project Creation Flow](https://vercel.com/new) on a phone or tablet (small viewport) now reliably renders the Build Logs.
    

## [Link to heading](#deployments)Deployments

-   Sending a request with a unsupported range within the `Range` header will now cause a helpful error to be returned (instead of a "Internal Server Error").
    
-   Using the [functions property](https://vercel.com/docs/configuration#project/functions) in `vercel.json` now works reliably with Next.js' Serverless Functions placed inside `pages/api`.
    
-   The 404 message that renders whenever a path on a Deployment couldn't be found doesn't render a banner anymore that shows that the Domain is available for use.
    
-   Clicking the Vercel logo on a public Deployment will no longer try to transition to the Dashboard of the owner of the Deployment. Instead, the Dashboard of the currently logged in user will be presented.
    
-   When using the [functions property](https://vercel.com/docs/configuration#project/functions) in `vercel.json` with Next.js, a warning will now be rendered if sub properties are used that are not supported by the framework.
    

## [Link to heading](#documentation)Documentation

-   The URL fields on the [Deploy Button](https://vercel.com/docs/more/deploy-button) page now allow for query string parameters to be placed within them.
    
-   A new [Login Connections page](https://vercel.com/docs/platform/login-connections) was added under the "Platform" category.
    
-   The publicly available Git repository for the documentation was archived and moved to an internal location to allow for a better Engineering workflow.
    
-   New documentation sections about the [Build Cache](https://vercel.com/docs/build-step#caching) and [Build Image](https://vercel.com/docs/build-step#build-image) were added.
    
-   For the [routes property](https://vercel.com/docs/configuration#project/routes), the documentation now outlines that the new routing properties (`rewrites`, `redirects`, `headers`, `cleanUrls`, `trailingSlash`) should be used instead.
    
-   The [Deploy Button](https://vercel.com/docs/more/deploy-button) page now contains new "Demo" sections, which talk about how to display a preview of a Git repository in the Project Creation Flow.
    
-   For the [functions property](https://vercel.com/docs/configuration#project/functions), the documentation now clearly outlines which sub properties can be used in conjunction with the Next.js framework.
    
-   A new documentation section about [Concurrent Builds](https://vercel.com/docs/platform/users-and-teams#concurrent-builds) was added.
    

## [Link to heading](#integrations)Integrations

-   All Git Integrations (for [GitHub](https://vercel.com/github), [GitLab](https://vercel.com/gitlab) and [Bitbucket](https://vercel.com/bitbucket)) were completely revamped from the ground up to provide maximum reliability across all areas of the Git workflow.
    
-   Redeploying a Deployment or promoting it to Production will now update the status of the commit that it is associated with on the Git provider.
    
-   Deployments that need to be authorized by a Team Member because they were created in a pull request that originated on a fork (and the Deployment will receive Secrets) will now cause a comment to be rendered on the pull request.
    
-   The comment that is left on pull requests of Git repositories that are deployed to Vercel no longer shows "In Progress" for completed Deployments.
    
-   Deploy Hooks won't issue a Deployment for all Vercel Projects connected to a Git repository anymore. Only for the one they're configured on.
    
-   Deployments created through Deploy Hooks will now automatically be canceled if they're not the most recent one created by a specific Deploy Hook anymore.
    
-   Requesting access to a Team on Vercel when pushing a commit is now much 1.5s faster, as an artificial delay was removed.
    
-   Whenever the "Ignored Build Step" command causes a Deployment to be canceled, the Git Integrations will now render a clear message as the commit status.
    
-   Installing a Git Integration will now forward users to [vercel.com](http://vercel.com/) instead of [zeit.co](http://zeit.co/) for completing the installation.
    

## [Link to heading](#command-line)Command-Line

-   The `vercel dev` command will no longer fail if the `tsconfig.json` file that is used contains comments (which is the case when running `tsc --init`, for example).
    

## [Link to heading](#other)Other

-   A new Entity component was added to the [design system](https://vercel.com/design/entity), which allows for rendering a list of items in good-looking way.
    
-   Deleting a Team will no longer cause emails about failed payments to be sent to its owners if the Team was deleted during the trial phase.
    
-   Whenever a signup is deemed to potentially be malicious, the user is now required to verify their phone number via SMS before entering Vercel.
    
-   A bug with the Billing system was resolved that caused some Teams to not receive a notification on their Git repository about adding commit authors to their Vercel Team.
    
-   Personal Accounts that are deleted are now always reliably pruned from our system after the 4 day recovery period. Previously, a special set of them got stuck.
    
-   The email that is sent after a Personal Account requested to be deleted now correctly considers the new 4 day recovery period (instead of 48 hours).