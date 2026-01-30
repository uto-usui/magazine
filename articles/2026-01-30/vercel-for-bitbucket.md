---
title: "Vercel for Bitbucket"
source: "https://vercel.com/blog/bitbucket"
publishedDate: "2019-11-27"
category: "frontend"
feedName: "Vercel"
author: "Arunoda Susiripala"
---

3 min read

Nov 27, 2019

[Bitbucket](http://bitbucket.com/) is popular among teams as the central place to plan projects, collaborate on code, test, and deploy — especially in combination with Jira and Trello.

**Today, we are proud to announce our first-class Bitbucket integration,** [**Vercel for Bitbucket**](https://zeit.co/bitbucket).

Vercel makes it easy for you to build and deploy code — whether you need a static website, Serverless Functions, or both combined. If you use Bitbucket in your development workflow, you can now take advantage of **automatic deployments with built-in CI/CD, DNS, and TLS**.

![Commits pushed to Bitbucket are automatically built and deployed with Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FfW4B5I33NQBVHP1rwzhn6%2Fa18fa0ea0112066b663983e124795992%2Fproject-commit.png&w=1920&q=75)

Commits pushed to Bitbucket are automatically built and deployed with Vercel.

## [Link to heading](#built-in-preview-deployments)Built-in Preview Deployments

Through preview deployments of feature branches, your team can test changes thoroughly, providing more confidence when iterating and merging.

Our Bitbucket integration brings [preview deployments](https://vercel.com/docs/v2/platform/deployments/#preview) to your workflow with no setup required.

## [Link to heading](#enable-automatic-deployments)Enable Automatic Deployments

Setting up automatic deployments to Vercel via Bitbucket is simple:

1.  Connect to Bitbucket with **one click** and link your project
    
2.  Every `git push` to your project triggers a deployment to a preview URL
    
3.  When merging to the [default branch](https://confluence.atlassian.com/bitbucket/branching-a-repository-223217999.html#BranchingaRepository-Branchtypes) (usually `master`), your [production domains](https://vercel.com/docs/v2/platform/deployments/#production) are updated
    

When changes are reverted on the default branch, an **instant rollback** is performed on the production domain — aliasing to the previous production deployment.

## [Link to heading](#connect-with-bitbucket)Connect with Bitbucket

The first step in setting up the Bitbucket integration is to **Connect with Bitbucket**. This makes the integration available to all your Bitbucket projects. Additionally, you can then also to **Log In to Vercel via Bitbucket**.

To get started, visit the [accounts page](https://zeit.co/account) on your individual or team **Vercel** account, navigate to the **Git Integrations** tab, and click the **Connect with Bitbucket** button.

![Connect your individual or team account with Bitbucket.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6IchQun2RFC0Rfsv5nSLSV%2Fce837f0e21bd1e49f3309a8ca517a0d7%2Fconnect-with-bitbucket.png&w=1920&q=75)

Connect your individual or team account with Bitbucket.

When Bitbucket requests authorization, click **Grant Access**.

![Click "Grant Access" to complete the Bitbucket connection process](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fa5IeCwjiebZUcMpXDMxyX%2Fac391c69daa513f849e79542e401382c%2Fauth-bitbucket.png&w=1920&q=75)

Click "Grant Access" to complete the Bitbucket connection process

Once you authorize Bitbucket, it redirects you back to Vercel. This completes the account connection process, and you automatically activate the ability to **Continue with Bitbucket** the next time.

![Once you connect Bitbucket, you also activate the ability to Log In to Vercel with Bitbucket.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ZPB1tf5yq2g3QGp0o1iPa%2F403a4dced934493aa47765e65d568eb4%2Fcontinue-with-bitbucket.png&w=1920&q=75)

Once you connect Bitbucket, you also activate the ability to Log In to Vercel with Bitbucket.

## [Link to heading](#link-projects)Link Projects

After your Bitbucket account is connected through the **Vercel** [accounts page](https://zeit.co/account), you can set up automatic deployments for a Bitbucket project by linking it to Vercel, with the help of a dropdown.

![Once linked, pushes made to the Bitbucket project will be automatically deployed with ZEIT Now.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6FYay4J24o8SKGlQuvpvph%2Ff61fab1fa6eff1b4797ae628dead0fd2%2Fnew-project-link.png&w=1920&q=75)

Once linked, pushes made to the Bitbucket project will be automatically deployed with ZEIT Now.

Select the Bitbucket project you would like to link to from the provided dropdown. Once linked, the Bitbucket project is set up for automatic Vercel deployments.

## [Link to heading](#what-happens-after-linking)What Happens After Linking

For every `git push` made, we build and deploy the latest commit with Vercel. The deployment is guided by the project framework using [zero-config](https://zeit.co/blog/zero-config) or a [`vercel.json` file](https://zeit.co/docs/v2/deployments/configuration).

**By default, we deploy every push**. This means that every `git push` made to a Pull  
Request branch is deployed — allowing collaborators to preview changes before they're merged and deployed to production.

Within a Pull Request, if Vercel is still building a commit from a previous push, **that build is canceled in favor of the most recently pushed commit**. This allows collaborators the quickest access to fresh changes.

## [Link to heading](#conclusion)Conclusion

Our mission at **Vercel** is to make the cloud accessible to everyone. The [Vercel for Bitbucket](https://zeit.co/bitbucket) integration was one of our most requested features. We are excited about this announcement and hope that it makes your development workflow smoother.

All of our work is heavily driven by feedback from our users. For feature requests, or to suggest ideas to make our platform and your experience better, please reach out to us [over chat](https://zeit.co/chat) or on [Twitter](https://twitter.com/vercel).