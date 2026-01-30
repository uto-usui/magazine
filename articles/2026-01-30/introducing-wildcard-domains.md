---
title: "Introducing Wildcard Domains"
source: "https://vercel.com/blog/wildcard-domains"
publishedDate: "2019-09-10"
category: "frontend"
feedName: "Vercel"
author: "Naoyuki Kanezawa"
---

1 min read

Sep 10, 2019

With [Vercel](https://zeit.co/home), you can already deploy to HTTPS-enabled subdomains of your choice.

What if you could let customers choose those subdomains (like with [Slack workspaces](https://acme.slack.com/))? Today, we're making this possible with the introduction of **Wildcard Domains**!

## [Link to heading](#adding-wildcard-domains)Adding Wildcard Domains

Capturing all subdomains on the fly is as simple as visiting your project's **Domains** tab:

![In this case, we selected a project called "static-fun".](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7uSaK8LDAACmDd7AaXWtWq%2Ff74215134347d7dd44d0d268e9fdc306%2Fbreadcrumb-list.png&w=1920&q=75)

In this case, we selected a project called "static-fun".

Then, enter a wildcard domain of your choice and click "Add":

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7h5RAhQqhN5ltjYhCSVPwL%2Ff216febac3f757b92d7f3136223cccfb%2FCleanShot_2023-01-31_at_18.52.24.gif&w=1920&q=75)

Next, you will be asked to configure it.

![If you purchased your domain via Vercel, you won't need to verify it.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Ff9fBddRu00IbRYldKzClG%2F7e42bf088388c76ec4525adf8fed1fb2%2Finvalid-preview.png&w=1920&q=75)

If you purchased your domain via Vercel, you won't need to verify it.

After you have correctly configured the nameservers of your domain, it will automatically be assigned to your latest production deployment – which will then be indicated in the UI.

![The two blue messages indicate that the domain was successfully applied.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FFm3KEU0RuF5WykcNh3ZFk%2F9fa263ef7819b9c09585de2dd2f9ea48%2Fworking-ui.png&w=1920&q=75)

The two blue messages indicate that the domain was successfully applied.

Once your domain has valid configuration, you can start using it.

## [Link to heading](#demo-time)Demo Time

In order to demonstrate how powerful **Wildcard Domains** really are, we've created a demo project that lets you acquire a subdomain of your choice, on which you can build a tiny website.

[Give it a try!](https://static.fun/)

As you can see, Wildcard Domains allowed us to offer every visitor with a fresh HTML editor in which they can place their own content. Other people visiting those URLs will see a read-only preview.

The entire [static.fun](https://static.fun/) project is **open source**. Make sure to [check out the code](https://github.com/zeit/static-fun)!

## [Link to heading](#conclusion)Conclusion

With **Wildcard Domains**, you can capture all subdomains on the fly and have a single deployment take care of them. This allows you to offer highly customizable workspaces or profiles to each of your users with no special effort.

We can't wait to find out what you will create with this! [Let us know via Twitter](https://twitter.com/vercel).