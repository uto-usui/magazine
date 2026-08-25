---
title: "Environment variables now use Config and Secret types"
source: "https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types"
publishedDate: "2026-08-24"
category: "frontend"
feedName: "Vercel"
author: "Brooke Mosby"
---

When you add or edit an environment variable in Vercel, you now choose Config or Secret instead of using the Sensitive toggle.

-   **Config:** The value remains readable after saving for members with access. Use Config for non-sensitive values you may need to inspect later, such as variables with a public framework prefix.
    
-   **Secret:** The value remains available to your deployments and can be replaced, but members cannot view or retrieve it after saving. Use Secret for passwords, API keys, and tokens.
    

Existing variables marked Sensitive are automatically treated as Secrets and continue to work without migration.

You can select an environment or Preview branch for each value. The [environment variable list](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables&title=Go+to+Environment+Variables) in the dashboard shows each variable’s type and where it applies.

### [Copy link to heading](#team-policy-changes)Team policy changes

The **Enforce Sensitive Environment Variables** team policy is deprecated with this update. When enabled, it required every environment variable created by a team member to be Sensitive, including non-sensitive configuration. With Config and Secret types, members can choose the appropriate type for each variable.

A new **Separate Production Secret Values** policy is available in your [Security settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity&title=Go+to+Security+settings). When enabled, the Production value for a Secret must differ from the values used for the same key in Preview, Development, and custom environments.

![The new Separate Production Secret Values policy in your team's Security settings.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FtcWxTkuiOQJTICMKLZqNh%2F00abb5d74f04a362c6e4786383dc24c1%2Fpolicy-web-light-nopadding.png&w=1920&q=75)![The new Separate Production Secret Values policy in your team's Security settings.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Kh5fFjPpiGPSg4wrEVpt7%2F1e5afacf52abb6e0a88014a67b378d75%2Fpolicy-web-dark-nopadding.png&w=1920&q=75)

The new Separate Production Secret Values policy in your team's Security settings.

If your team had the legacy policy enabled, confirm whether the Separate Production Secret Values policy should be enabled for your team. The deprecated policy is no longer enforced by the Vercel CLI.

### [Copy link to heading](#set-variable-types-from-the-cli)Set variable types from the CLI

To choose whether an environment variable is a Config or Secret from the CLI, pass `--visibility config` or `--visibility secret` to `vercel env add` or `vercel env update`:

```
# Configvercel env add API_URL production --value "https://api.example.com" --visibility config --yes# Secretvercel env add API_KEY production --value "sk_live_..." --visibility secret --yes
```

Create Config and Secret environment variables with the Vercel CLI.

The existing flags continue to work. When `--visibility` is omitted, `--no-sensitive` maps to Config and `--sensitive` maps to Secret. After adding or updating a variable, the CLI output shows its type under `Visibility`.

Learn more in the [Environment Variables documentation](https://vercel.com/docs/environment-variables).