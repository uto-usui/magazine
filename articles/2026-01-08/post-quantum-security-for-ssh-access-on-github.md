---
title: "Post-quantum security for SSH access on GitHub"
source: "https://github.blog/engineering/platform-security/post-quantum-security-for-ssh-access-on-github/"
publishedDate: "2025-09-16"
category: "engineering"
feedName: "GitHub Engineering"
author: "brian m. carlson"
---

Today, we’re announcing some changes that will improve the security of accessing Git data over SSH.

## What’s changing?

We’re adding a new post-quantum secure SSH key exchange algorithm, known alternately as `sntrup761x25519-sha512` and `sntrup761x25519-sha512@openssh.com`, to our SSH endpoints for accessing Git data.

This only affects SSH access and doesn’t impact HTTPS access at all.

It also does not affect GitHub Enterprise Cloud with data residency in the United States region.

## Why are we making these changes?

These changes will keep your data secure both now and far into the future by ensuring they are protected against future decryption attacks carried out on quantum computers.

When you make an SSH connection, a [key exchange algorithm](https://en.wikipedia.org/wiki/Key_exchange) is used for both sides to agree on a secret. The secret is then used to generate encryption and integrity keys. While today’s key exchange algorithms are secure, new ones are being introduced that are secure against [cryptanalytic attacks](https://en.wikipedia.org/wiki/Cryptanalytic_attack) carried out by quantum computers.

We don’t know if it will ever be possible to produce a quantum computer powerful enough to break traditional key exchange algorithms. Nevertheless, an attacker could save encrypted sessions now and, if a suitable quantum computer is built in the future, decrypt them later. This is known as a “[store now, decrypt later](https://www.nist.gov/cybersecurity/what-post-quantum-cryptography)” attack.

To protect your traffic to GitHub when using SSH, we’re rolling out a hybrid post-quantum key exchange algorithm: `sntrup761x25519-sha512` (also known by the older name `sntrup761x25519-sha512@openssh.com`). This provides security against quantum computers by combining a new post-quantum-secure algorithm, [Streamlined NTRU Prime](https://ntruprime.cr.yp.to/), with the classical [Elliptic Curve Diffie-Hellman](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman) algorithm using the [X25519 curve](https://en.wikipedia.org/wiki/Curve25519). Even though these post-quantum algorithms are newer and thus have received less testing, combining them with the classical algorithm ensures that security won’t be weaker than what the classical algorithm provides.

These changes are rolling out to [github.com](http://github.com/) and non-US resident GitHub Enterprise Cloud regions. Only FIPS-approved cryptography may be used within the US region, and this post-quantum algorithm isn’t approved by FIPS.

## When are these changes effective?

We’ll enable the new algorithm on September 17, 2025 for GitHub.com and GitHub Enterprise Cloud with data residency (with the exception of the US region).

This will also be included in GitHub Enterprise Server 3.19.

## How do I prepare?

This change only affects connections with a Git client over SSH. If your Git remotes start with `https://`, you won’t be impacted by this change.

For most uses, the new key exchange algorithm won’t result in any noticeable change. If your SSH client supports `sntrup761x25519-sha512@openssh.com` or `sntrup761x25519-sha512` (for example, OpenSSH 9.0 or newer), it will automatically choose the new algorithm by default if your client prefers it. No configuration change should be necessary unless you modified your client’s defaults.

If you use an older SSH client, your client should fall back to an older key exchange algorithm. That means you won’t experience the security benefits of using a post-quantum algorithm until you upgrade, but your SSH experience should continue to work as normal, since the SSH protocol automatically picks an algorithm that both sides support.

If you want to test whether your version of OpenSSH supports this algorithm, you can run the following command: `ssh -Q kex`. That lists all of the key exchange algorithms supported, so if you see `sntrup761x25519-sha512` or `sntrup761x25519-sha512@openssh.com`, then it’s supported.

To check which key exchange algorithm OpenSSH uses when you connect to GitHub.com, run the following command on Linux, macOS, Git Bash, or other Unix-like environments:

```
$ ssh -v git@github.com exit 2>&1 | grep 'kex: algorithm:'
```

For other implementations of SSH, please see the documentation for that implementation.

## What’s next?

We’ll keep an eye on the latest developments in security. As the SSH libraries we use begin to support additional post-quantum algorithms, including ones that comply with FIPS, we’ll update you on our offerings.

## Written by

 ![brian m. carlson](https://avatars.githubusercontent.com/u/497054?v=4&s=200)

brian m. carlson is an engineer on the Git Systems team and, in their spare time, a contributor to Git.

 ![Taylor Blau](https://avatars.githubusercontent.com/u/443245?v=4&s=200)

Taylor Blau is a Principal Software Engineer at GitHub where he works on Git.

## Related posts

## Explore more from GitHub

![Docs](https://github.blog/wp-content/uploads/2024/07/Icon-Circle.svg)

### Docs

Everything you need to master GitHub, all in one place.

[Go to Docs](https://docs.github.com/)

![GitHub](https://github.blog/wp-content/uploads/2024/07/Icon_95220f.svg)

### GitHub

Build what’s next on GitHub, the place for anyone from anywhere to build anything.

[Start building](https://github.com/)

![Customer stories](https://github.blog/wp-content/uploads/2024/07/Icon_da43dc.svg)

### Customer stories

Meet the companies and engineering teams that build with GitHub.

[Learn more](https://github.com/customer-stories)

![The GitHub Podcast](https://github.blog/wp-content/uploads/2023/02/galaxy23-icon.svg)

### The GitHub Podcast

Catch up on the GitHub podcast, a show dedicated to the topics, trends, stories and culture in and around the open source developer community on GitHub.

[Listen now](https://the-github-podcast.simplecast.com/)