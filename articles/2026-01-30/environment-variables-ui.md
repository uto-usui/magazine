---
title: "Environment Variables UI"
source: "https://vercel.com/blog/environment-variables-ui"
publishedDate: "2020-04-14"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

2 min read

Apr 14, 2020

Customize Environment Variables for projects in your Dashboard

If you are working on a sophisticated project, you might have found yourself wanting to configure different Environment Variables depending on the Environment your project is deployed to.

With today's release, we're making it possible to configure different **Environment Variables** for **Production**, **Preview**, and **Development** – right in the Dashboard.

## [Link to heading](#new-project-setting)New project setting

To configure an Environment Variable for your project, simply navigate to your Project Settings and look for the newly added Environment Variables section:

![The new "Environment Variables" field in the Project Settings.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3z44TD4ooENH2ueGyX8cM0%2F57065f1627ce51e9961799bb381230f9%2Ffield-in-settings.png&w=1920&q=75)

The new "Environment Variables" field in the Project Settings.

Within this section, you can assign an Environment Variable to the Production, Preview, or Development Environment, depending on where you want it to be available.

### [Link to heading](#system-environment-variables)System environment variables

The platform provides several Environment Variables that contain values provided by the system, such as the URL of the deployment or the name of the Git branch that the deployment origined from.

In order to make one of them available to your code, choose it from [this list](https://zeit.co/docs/v2/build-step#system-environment-variables) and enter its name into the project setting like so:

![Configuring a System Environment Variable.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2GTSr4S7W2y9YOdjtye7zX%2F27ba9e4d5a1de0ea1dc07927ca7a1e1f%2Fsystem-environment-variables.png&w=1920&q=75)

Configuring a System Environment Variable.

## [Link to heading](#new-command-for-vercel-cli)New command for Vercel CLI

Environment Variables specified for the **Development** **Environment** are made available to your team and can be downloaded into a local development setup using a newly added `vercel env pull` command, which automatically creates a `.env` file:

```
$ vercel env pullVercel CLI 18.0.0Downloading Development Environment Variables for project my-site✅ Created .env file [510ms]
```

Retrieving Development Environment Variables locally

At least version **18.0.0** of [Vercel CLI](https://vercel.com/download) is required to be able to run this command.

Furthermore, you can use `vercel env add` and `vercel env remove` to add or remove Environment Variables from your project, directly from the command-line.

## [Link to heading](#conclusion)Conclusion

The new Environment Variables section in the Project Settings lets you specify different Environment Variables for Production, Preview, and Development, without creating a `vercel.json` configuration file.

Additionally, sharing Development Environment Variables with your colleagues is now easier than ever before, since they can be pulled from the project using `vercel env pull`.

[Let us know](https://zeit.co/contact) what you think about this change. We're excited to help you succeed.