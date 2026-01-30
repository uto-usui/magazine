---
title: "Enforcing device trust on code changes"
source: "https://www.figma.com/blog/how-we-enforce-device-trust-on-code-changes/"
publishedDate: "2023-12-08"
category: "design"
feedName: "Figma Blog"
---

Release branches on GitHub are the source of truth for code deployed to production, which makes them a prime target for an attacker trying to compromise Figma. As Figma scales and more engineers ship code every day, the attack surface has only grown. To get ahead of this problem and reduce the risk of malicious code reaching production, we made a plan: ensure that code changes merged into GitHub release branches come from trusted, company-managed devices.

This sounds simple enough. At Figma, like many other companies, access to GitHub lives behind Single Sign-On (SSO). Even if an attacker compromises an engineer’s GitHub account credentials, they would still need to get through Okta SSO—which also requires WebAuthn 2FA—to access the Figma GitHub organization. While this significantly reduces risk, we remain vulnerable to malicious changes made with leaked session credentials, [personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), [OAuth tokens](https://docs.github.com/en/apps/oauth-apps), and [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

Figma enforces “dual-control” on GitHub Pull Requests (PRs), requiring both the PR author and another engineer to approve code changes.

The easiest way to reduce these risks is to require GitHub’s commit signature verification, which is supposed to ensure that code changes come from a trusted source. However, this verification doesn’t reduce risk as much as we’d like. Even if we enabled this requirement, we’d need to closely monitor personal access tokens, OAuth tokens, and SSH key usage to detect malicious activity. Building a verification system ourselves not only facilitates that, but also gives us more flexibility on the criteria we consider. As security engineers at Figma, we value engineering-driven solutions that scale with minimal overhead. This means reducing unnecessary process and moving as quickly as we can while keeping our systems secure.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAADZklEQVQ4jYWV61NaRxjG+RsKh+s5HCh2RiN3CCo2XohRQxCQm4gi4L1eGnUSzUzbmSStNcFezIekY8eP/T9/nV1AD7WTfHhm3905++zzvrvvc0xmh58OApidgc4o5iJ2BrtjALMraJgHsbjCWNQIFjXahYjDmO4IPwOn8bD/I4xIMrMrhOkr+zC3cAx/hjjwnwNCksQiyAS5KyRxX6HdL8nF2E/QTddYHknSIRMlEfGtQrOA+FANYdbEB4YU5YZwf01FLNblWtBA2FOgR1CGk9i+fYJ9Jo1tLIUyNIJFj2DRwljdUayaUCM2hlBkuuFuqt2aalFMZqcfy+AYtpkcztYG7lcn6G9P0c8OUBsrOFJzeMKTxMaeMjaRJTIyR2RknngyQygxjz82w2BwCpcvgeKOYzKrQayTGdSTl+gfLvH8dYn3+gLfzQW+T6/RT3YJLJQoVLdobR1Tre+xvLZPY+OIpdU9cqUNHj9d5hv/JIpUqIawzZfR3p6jX39E++Mc7f0PeP8+Z+CfS7y/vGC4sER6cY3y8g7ZYotcaZ1idZvFyhaZQpPJJ5V+QutsCddP52h/XuF4dYJtv4V2ccbXN+/wvHnBUL7CXK5OubZLtrRBOt9gobhBsfYd5ZV90vmmTN/uSWASt2OdyOF6+Qa1fYX9+BhlfQ319SneT+/Qz44ZTJdILzZZbR1RWd2nUN2RRKWVQ8r15xRre4xO5nF4RzrvUAlO42gcoZ5f4Xr/O66LX3F/aKO3f0ZttHgwnWehtEWlfki+skWhui2VzufXyVZ2yVV2iI8vYNPj4tkMY9ajWMezOHdO0X77iPv6Bne7jXNzB3tylqH4LM8W16muHbLS/J7G5hFL9T0q9QOa26dUVg+IJRewumOGTvHEsCYzOJrPcZ38iKO2iRJPYfFEUX0JHkRSxMczjKcKPHpcZHx6kUczZabna4xOFRjwT3UvxeG/62F3BCWcwpp8hhKYwOKO3PaoeMjicds9cQmHN4HTN4ZzICljoU4SyrYz9rKwKS2MWXZB+L4ByHkUixZD0RMo+sPuPCrjjkID6Z0x9AyhHx3SCIqAIOkqE6PVM3pXw3tKZSnuYHSeXhkksRa7zaLTer0NXT/s88eeCxkPu3WaoKEcHdfp90Oj/33RvY2/gg55zyv/BWjNc7ZYaV8EAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/7991132bcb165f476c23ad422e847c99ea94cd87-526x524.png?w=526&h=524&q=75&fit=max&auto=format)

Watch Director of Security Engineering Dev Akhawe’s conversation with the [Modern Security Podcast](https://www.youtube.com/watch?v=MizrgSgtS9E), where he shares how Figma scales security with secure defaults.

## [The problem with GitHub commit signature verification](#the-problem-with-github-commit-signature)

Companies often require that all commits merged into sensitive branches be [Verified by GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification).

A **GPG key** is a pair of cryptographic keys–one public and one private–used for the encryption and signing of messages or data.

Git commit signatures are typically used to attest that a trusted author made a code change and get the big green **“Verified” stamp of approval** on GitHub. While this provides more confidence in commit integrity, we don’t have visibility or control over the personal GPG keys engineers register with their account to use for signatures—and no way to tie their GPG keys to a particular device.

GitHub’s verification criteria are also looser than we’d like. For example, commits made through the GitHub UI and the GitHub API are “Verified” as they’re signed with GitHub’s web flow **GPG key**. If we followed this playbook and an OAuth app or a Figma engineer’s GitHub session, personal access token, or SSH key were compromised, an attacker would have several ways to have their malicious commits “Verified” by GitHub.

Even with Okta SSO and GitHub commit signature verification, these long-lived access tokens exist outside the trust context where attackers can use them to introduce malicious code. Instead of accepting these risks or introducing processes to monitor for suspicious access token usage, we built our own solution.

## [Okta Device Trust](#okta-device-trust)

**Endpoint Security Baseline** at Figma requires various criteria, such as up-to-date browser versions, the latest macOS, and active malware protection software.

In late 2022, we built a custom solution to issue [X.509 Okta Device Trust certificates](https://help.okta.com/en-us/content/topics/device-trust/device-trust-landing.htm) to company MacBooks from an [Amazon Private Certificate Authority (CA)](https://aws.amazon.com/private-ca/). These certificates are distributed through [JAMF](https://www.jamf.com/), renew every 15 days, and attest that a laptop meets our **Endpoint Security Baseline criteria** at the time they’re issued.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAABYlAAAWJQFJUiTwAAADMklEQVQ4jXWT61MTZxSH+eecSQnZzQW1SK1Iy1jqpWBFEwIIyWaJuZidGLBlQKCpNngZTFvTCkiITNSUhN1kk+Cllw+d8d94OrtJSJTph9+c3X3P++zvnPO+XWItwMeyN6OjPMvpbIJv7qUYSa4x8HQepxr8IEf8SF1HYTL2umxuOJVXcK/+wq2gTlwqM/Fdhs+357DrMmK9kSv+H9CEmKBmsi7zxdMFwtE/SHrek7z2nrhc5uvHSZzl4CHQXv9QbWCnjEU9wMDGbQI3cyy6/2LV8y9KSOWr9AoObbbDodxUh0OzH3W5LeO94ud4PsRoco34tMbtqQPGF59wKhtD1PyI1dbPA6YMqBG7WjAj9lYkjmt+HKofQfMhqhKDGwvMKnmi4T2G06s4SrK5JmgSYiWIWA0ewox4CDypSoxtTjKTHufL3BT2csNFfz7Ot6lHXP0xzZnsPPaKjKBLCKUItsIKtr1lxEq0WXIHcKDg4/vkNdK3LuPNTOCsSGaCS71B34sYfXmF3lIIe7XREltxHmtuE+vu7whq4iiwv+gndN/NncUrjGxN4ai2W2E4NdV61iVsewrd2UdYdx8iaMrRkp26xODzKYY3vPTt+ZpHqaUWWEIoN/prKwWw5mP0FBREPdgGtqbs0AO4ijO4CtM4NX/zJsiIRom6MYgAgjEs1WeeALFi9NFvDs503Qk0yjvzcpqxJ14m0h7OP5vkhGoMZRZhX8FWWKLnxZLpRijLOGoyp/UIF9UEF8oJ+qsR85sB7TLKdZUl3L+Ok1FGeRUcYWF5jLP56wiVID0vk1hzBay5Ej35BwhamP5aBLl2j3R9h/XXWWbqST6thdvAXtXPTOoqr7zD/Dl6jlT0EkPZSQTtBtadn7BkKlgyB3Q/S2MrRRmqxbn7eoM3f7/j4J+3LL/JcLamNG9KXeZEycf1u1f42TPE9sggi+HznNvyIuyH+GTzB4492OLY/SyWTApbMcpALcZcfZ382xK774rEDh7yWa1xFrsMmydLPjzrbhbil1iJXCC6dJmhnUnE/RDdz+9g+W0dS+Yx3dtJbPs3cVWDXKzMEdPWiJZTDOsJnLXG/f4PHQVhKqwT9SsAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/fae5cdd5063d44e7848aa8074d0f616d8ae1a977-2010x1609.png?rect=1,0,2009,1609&w=804&h=644&q=75&fit=max&auto=format)

The team leverages [Okta Identity Engine](https://help.okta.com/oie/en-us/content/topics/identity-engine/oie-index.htm) (OIE) to enforce device trust for apps like AWS, Stripe, Snowflake, and other sensitive platforms, but these certificates aren’t limited to use in Okta. These certificates can create signatures that attest device trust for any action that involves signing data with X.509 certificates.

## [Signing commits with device trust certificates](#signing-commits-with-device-trust-certificates)

We investigated signing commits with the same device trust certificates discussed before and learned that we can set up Git to use Secure/Multipurpose Internet Mail Extensions (S/MIME) to sign commits with our certificates. In our investigation, we found GitHub’s [**smimesign**](https://github.com/github/smimesign) utility that they built for organizations like ours that want to sign commits with X.509 certificates.

**Smimesign** is an S/MIME signing utility for macOS and Windows that is compatible with Git. This allows developers to sign their Git commits using X.509 certificates issued by public certificate authorities or their organization's internal certificate authority. Smimesign uses keys and certificates already stored in the macOS Keychain or the Windows Certificate Store.

To set up S/MIME Git commit signing, you run a handful of commands:

Shell Script

```
git config commit.gpgsign true
git config gpg.format x509
git config gpg.x509.program smimesign
git config user.signingkey <your_x509_key_id>
```

After setting this configuration, Git will use the **smimesign** utility to sign commits with the provided key (which, in our case, is stored in the MacOS keychain).

However, this would not work for our needs as our signing keys change every 15 days when device trust certificates renew. To provide a seamless experience for our engineers, we need Git to dynamically fetch the latest key ID upon a commit, which takes a bit of hacking.

Under the hood, Git calls the configured signing program as follows:

Shell Script

```
smimesign --status-fd=2 -bsau <your_x509_key_id>
```

Breaking down these arguments:

-   **\--status-fd=2**: write special status strings to the shell error stream
-   **\-b:** create a detached signature
-   **\-s:** make a signature, as opposed to other options like verifying a signature
-   **\-a:** create American Standard Code for Information Interchange (ASCII) armored output
-   **\-u:** use the following key id to sign
-   **<your\_x509\_key\_id>:** key id to use

The specifics here aren’t too important to understand, but we noticed that **<your\_x509\_key\_id>** is static, which makes our needs more difficult to configure.

To achieve dynamic key fetching, we built **smimesign-figma**, a slightly modified version of GitHub’s **smimesign**, and wrote a simple wrapper that forces git to fetch a signing key at commit time. One extra feature we built into **smimesign-figma** is the **\--get-figmate-key-id** flag that looks through the MacOS keychain and returns a user’s device trust certificate key id. Using this flag, we write our one-line bash script **smimesign-figma-wrapper:**

Shell Script

```
smimesign-figma --status-fd=2 -bsau smimesign-figma --get-figmate-key-id
```

We then configured Git to use this wrapper as the signing program:

Shell Script

```
git config gpg.x509.program smimesign-figma-wrapper
```

It is important to notice that **smimesign-figma-wrapper** ignores any arguments passed to it when invoked. This allows us to ignore the arguments Git tries to feed the program, in favor of our arguments that let us dynamically fetch a key id using **smimesign-figma --get-figmate-key-id**. To illustrate further, Git will try to execute:

Shell Script

```
smimesign-figma-wrapper --status-fd=2 -bsau <your_x509_key_id>
```

But **smimesign-figma-wrapped** will ignore the arguments and execute the following instead:

Shell Script

```
smimesign-figma --status-fd=2 -bsau smimesign-figma --get-figmate-key-id
```

As you may have noticed, Git never ends up using **<your\_x509\_key\_id>,** the value of **user.signingkey**, in the signing process, and that’s okay! Our custom configuration doesn’t require it, and we leave the value blank in our Git configurations to prevent confusion. Now, Git will sign every commit we make with the device trust certificate on our laptop, attesting that the code changes we’re making originate from one of our trusted, company-managed MacBooks.

## [Verifying signatures with AWS Lambda and GitHub Apps](#verifying-signatures-with-aws-lambda-and-github)

The principle of **least privilege** says that employees should be granted the minimum amount of access to do their jobs.

To verify commit signatures, we built a system that cryptographically confirms whether commits are signed with device trust certificates and reports the result back to GitHub. To accomplish this, we turned to [GitHub Apps](https://docs.github.com/en/apps) and [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html). At Figma, we use GitHub Apps to build secure, **least privileged tools** that interact with the GitHub API. AWS Lambda is a lightweight service we can use to perform ‌stateless verification operations on commit signatures.

The setup we needed is to have GitHub trigger our commit signature verification Lambda function upon new pushes to our internal monorepo. The following are the pieces we used to build this:

-   GitHub App in the Figma GitHub organization
-   Lambda function that uses [smimesign/ietf-cms](https://github.com/github/smimesign/tree/main/ietf-cms#signing-and-verifying-data) to verify the S/MIME commit signatures
-   Lambda Function URL to allow GitHub to trigger the function
-   GitHub webhook to notify our Lambda when code is pushed to our monorepo
-   Webhook secret to verify requests sent to our Lambda are from GitHub

We configured the “Commit Signature Verification” GitHub App with permissions to read code and to write commit status checks. We then installed the App in our monorepo and stored its credentials in AWS Secrets Manager for our Lambda function to use for authentication.

When an engineer pushes a commit, GitHub sends a webhook payload to our Lambda function. Upon receiving the payload, our Lambda authenticates it as the “Commit Signature Verification” GitHub App and obtains various information about the commit, such as its author, the changes it introduces, and its associated signature.

With this information, our Lambda function then cryptographically verifies whether the commit signature was created with a certificate issued by the private CA we use for device trust certificates, and reports a commit status back to GitHub with the result.

Putting the end-to-end flow together:

1.  An engineer pushes a signed commit to a feature branch on our GitHub monorepo
2.  GitHub notices the push event and sends a webhook payload to our Lambda Function URL endpoint

Our Lambda then:

1.  Authenticates as the “Commit Signature Verification” GitHub App
2.  Verifies the webhook secret to ensure the payload is from GitHub
3.  Takes the push event’s HEAD commit and cryptographically verifies it was signed with a device trust certificate

Posts a commit status called **commit-integrity-verification** back to GitHub, indicating whether the HEAD commit passed commit signature verification

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACuklEQVQokWWSa0vTYRiH90UqdzKlpW2omzuoW5m6qdusIKMiSi1LnVFCmutM2smZbtM5nblInTJZB3MahdrBCIqo8LQOdKRvccX/XwbWi5vnxfPj4rmv5yfRZ2m51NLK/fFxJicm6AkEcNhslKVvJFhqI7CrnGKtjjyjibY2D9NzM0w+idPR3U5RYQHJMjlKqQxFkhT5uiQkQvByaysjw8NEhobp9nex3eHEZthKY0UTR6pPYszZwmazhfOeTnofzhK6H6PNd5USm5VU5XpSFEoRKFu7DskWs4WO9utMTcaZmopzIxSizOFAl2fGWlmNacceVOos8i2buejtYfjlEvdeviEU7me704leq0NgmPQG0jeo/gA725mYixN/McWNmyHsxcWkaFSozFmkqDeSLFeKwK6eIG8/fub9tx9Eo1Eq9++n6kAFzScaOeaqZ5vDicRsyqGl5Sx9US+9sU68/quUFllRyGTI5VIU0iTRUb7ZQsDnY3H+HYnEMiORCEfrXDQ1NHDR7eZCs5uaQ9VIjNl6rpw7ze0BH3fDXoKeK5QUFomCBSfCKYwlJ5eA38/iwjwLS0sMDg7hqqml8XgDrWfOcMHtprqyColRl43X4+HZ7FPmnjxncCCM3Wb7C1oB55lM9AaCvF/6wofl74xGouzbs5fdO8upr6nl4IEKrFsLkJiy9fgDQR4tfOZB4geDY3dwlpT+Af0GStesRVAT8Pbxavorr6d/ErkZo8xuJ22Digy1BnVaOqnJ65EYtDp8/m6eLn7iceIbt0bHsNuKV71QAOYajXRc62Imtsxs7BPhnhFKiqzi3cqItdGkpVNf56K3f4C+8C3czafINRj/WzlTraHusAvftX66PWGaGprJMRhW5cRiC03P2KQWVxLE6zIySVUmI/sHKObUmr85bUYmKUrlqo8TgL8AM0/cWQk06m4AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/166e331b4f01232c77252a9e1ae62ce9af7e7d1a-2160x1217.png?w=804&h=453&q=75&fit=max&auto=format)

With this system in place, we can now require a passing **commit-integrity-verification** status check for the most recent commit on a PR before it can merge into a release branch. This ensures that code changes merging into these branches originate from trusted Figma MacBooks.

## [Verifying bot-authored commits](#verifying-bot-authored-commits)

Although Figma engineers author most of the commits merged into our monorepo, we have some internally and externally developed bots make commits as well, such as GitHub’s [Dependabot](https://github.com/dependabot). These bots make commits through the GitHub API and are signed with GitHub’s web flow GPG key as we discussed earlier.

Now that we have control over which commits pass **commit-integrity-verification**, we can check these commits against an allowlist of bot authors we trust. This helps us reduce the risk of an untrusted bot, such as an externally developed GitHub App, making a malicious commit, giving us an extra layer of security on top of the external bot approval flows we have already.

Even further, we’re able to inspect the code changes these bots make and use heuristics to determine if they’re safe. For example, we can determine if Dependabot makes a change unrelated to dependencies and report a failed **commit-integrity-verification** status check.

## [Making security painless](#making-security-painless)

Shipping this project was a big win for our security team. It gives us GitHub security guarantees by default and sets us up well for future security work with our build and deploy systems. What makes this win even better is that the system we built requires close to no maintenance from our engineers. In an area where we could have accepted unnecessary risk or introduced tiresome processes, we engineered our way into a safer posture instead. This minimization of toil is central to the philosophy of our team, and it frees us up to move quickly on new projects that make Figma more secure.

We are a small team, passionate about modernizing security practices, and excited to contribute to the broader community. If that sounds exciting to you, [join us](https://www.figma.com/careers/)!