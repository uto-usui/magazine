---
title: "How the GitHub CLI can now enable triangular workflows"
source: "https://github.blog/open-source/git/how-the-github-cli-can-now-enable-triangular-workflows/"
publishedDate: "2025-04-26"
category: "engineering"
feedName: "GitHub Engineering"
author: "Tyler McGoffin"
---

Most developers are familiar with the standard Git workflow. You create a branch, make changes, and push those changes back to the same branch on the main repository. Git calls this a centralized workflow. It’s straightforward and works well for many projects.

However, sometimes you might want to pull changes from a different branch directly into your feature branch to help you keep your branch updated without constantly needing to merge or rebase. However, you’ll still want to push local changes to your own branch. This is where triangular workflows come in.

It’s possible that some of you have already used triangular workflows, even without knowing it. When you fork a repo, contribute to your fork, then open a pull request back to the original repo, you’re working in a triangular workflow. While this can work seamlessly on github.com, the process hasn’t always been seamless with the [GitHub CLI](https://cli.github.com/).

The GitHub CLI team has recently made improvements (released in [v2.71.2](https://github.com/cli/cli/releases/tag/v2.71.2)) to better support these triangular workflows, ensuring that the `gh pr` commands work smoothly with your Git configurations. So, whether you’re working on a centralized workflow or a more complex triangular one, the GitHub CLI will be better equipped to handle your needs.

If you’re already familiar with how Git handles triangular workflows, feel free to skip ahead to learn about how to use `gh pr` commands with triangular workflows. Otherwise, let’s get into the details of how Git and the GitHub CLI have historically differed, and how four-and-a-half years after it was first requested, we have finally unlocked managing pull requests using triangular workflows in the GitHub CLI.

## [First, a lesson in Git fundamentals](#first-a-lesson-in-git-fundamentals)

To provide a framework for what we set out to do, it’s important to first understand some Git basics. Git, at its core, is a way to store and catalog changes on a repository and communicate those changes between copies of that repository. This workflow typically looks like the diagram below:

[![Figure 1: A typical git branch setup](https://github.blog/wp-content/uploads/2025/03/triangular-image-1.png?resize=457%2C512)](https://github.blog/wp-content/uploads/2025/03/triangular-image-1.png)

Figure 1: A typical git branch setup

The building blocks of this diagram illustrate two important Git concepts you likely use every day, a **ref** and **push/pull**.

### [Refs](#refs)

A **ref** is a reference to a repository and branch. It has two parts: the **remote**, usually a name like _origin_ or _upstream_, and the **branch**. If the remote is the local repository, it is blank. So, in the example above, _origin/branch_ in the purple box is a **remote ref**, referring to a branch named _branch_ on the repository name _origin_, while _branch_ in the green box is a **local ref**, referring to a branch named _branch_ on the local machine.

While working with GitHub, the remote ref is usually the repository you are hosting on GitHub. In the diagram above, you can consider the purple box GitHub and the green box your local machine.

### [Pushing and pulling](#pushing-and-pulling)

A **push** and a **pull** refer to the same action, but from two different perspectives. Whether you are pushing or pulling is determined by whether you are sending or receiving the changes. I can push a commit to your repo, or you can pull that commit from my repo, and the references to that action would be the same.

To disambiguate this, we will refer to different refs as the **headRef** or **baseRef**, where the **headRef** is sending the changes (_pushing_ them) and the **baseRef** is receiving the changes (_pulling_ them).

![Figure 2: Disambiguating headRef and baseRef for push/pull operations.](https://github.blog/wp-content/uploads/2025/03/image2_e1d22b.png?resize=864%2C128)

Figure 2: Disambiguating headRef and baseRef for push/pull operations

When dealing with a branch, we’ll often refer to the headRef of its pull operations as its **pullRef** and the baseRef of its push operations as its **pushRef**. That’s because, in these instances, the working branch is the pull’s baseRef and the push’s headRef, so they’re already disambiguated.

#### [The `@{push}` revision syntax](#the-push-revision-syntax)

Turns out, Git has a handy built-in tool for referring to the pushRef for a branch: the `@{push}` revision syntax. You can usually determine a branch’s pushRef by running the following command:

`git rev-parse --abbrev-ref @{push}`

This will result in a human-readable ref, like **origin/branch**, if one can be determined.

#### [Pull Requests](#pull-requests)

On GitHub, a **pull request** is a proposal to integrate changes from one ref to another. In particular, they act as a simple “pause” before performing the actual integration operation, often called a **merge**, when changes are being pushed from ref to another. This pause allows for humans (code reviews) and robots (GitHub Copilot reviews and GitHub Actions workflows) to check the code before the changes are integrated. The name _pull request_ came from this language specifically: You are requesting that a ref pulls your changes into itself.

![Figure 3: Demonstrating how GitHub Pull Requests correspond to pushing and pulling.](https://github.blog/wp-content/uploads/2025/03/image3_6e731a.png?resize=864%2C266)

Figure 3: Demonstrating how GitHub Pull Requests correspond to pushing and pulling

## [Common Git workflows](#common-git-workflows)

Now that you understand the basics, let’s talk about the workflows we typically use with Git every day.

A **centralized workflow** is how most folks interact with Git and GitHub. In this configuration, any given branch is pushing and pulling from a remote ref with the same branch name. For most of us, this type of configuration is set up by default when we clone a repo and push a branch. It is the situation shown in Figure 1.

In contrast, a **triangular workflow** pushes to and pulls from _different_ refs. A common use case for this configuration is to pull directly from a remote repository’s default branch into your local feature branch, eliminating the need to run commands like `git rebase <default>` or `git merge <default>` on your feature branch to ensure the branch you’re working on is always up to date with the default branch. However, when pushing changes, this configuration will typically push to a remote ref with the same branch name as the feature branch.

[![Figure 4: juxtaposing centralized workflows from triangular workflows.](https://github.blog/wp-content/uploads/2025/04/triangular-image-4.png?resize=1600%2C703)](https://github.blog/wp-content/uploads/2025/04/triangular-image-4.png)

Figure 4: juxtaposing centralized workflows from triangular workflows.

We complete the triangle when considering pull requests: the **headRef** is the **pushRef** for the local ref and the **baseRef** is the **pullRef** for the local branch:

![Figure 5: a triangular workflow](https://github.blog/wp-content/uploads/2025/03/image5_9b14d8.png?resize=1549%2C1069)

Figure 5: a triangular workflow

We can go one step further and set up triangular workflows using _different_ remotes as well. This most commonly occurs when you’re developing on a fork. In this situation, you usually give the fork and source remotes different names. I’ll use _origin_ for the fork and _upstream_ for the source, as these are common names used in these setups. This functions exactly the same as the triangular workflows above, but the **remotes** and **branches** on the **pushRef** and **pullRef** are different:

[![Figure 6: juxtaposing triangular workflows and centralized workflows with different remotes such as with forks](https://github.blog/wp-content/uploads/2025/04/triangular-image-6.png?resize=1600%2C704)](https://github.blog/wp-content/uploads/2025/04/triangular-image-6.png)

Figure 6: juxtaposing triangular workflows and centralized workflows with different remotes such as with forks

### [Using a Git configuration file for triangular workflows](#using-a-git-configuration-file-for-triangular-workflows)

There are two primary ways that you can set up a triangular workflow using the [Git configuration – typically defined in a \`.git/config\` or \`.gitconfig\` file](https://git-scm.com/docs/git-config). Before explaining these, let’s take a look at what the relevant bits of a typical configuration look like in a repo’s \`.git/config\` file for a centralized workflow:

```
[remote “origin”] 
    url = https://github.com/OWNER/REPO.git 
    fetch = +refs/heads/*:refs/remotes/origin/*  
[branch “default”]
    remote = origin  
    merge = refs/heads/default  
[branch “branch”]
    remote = origin 
    merge = refs/heads/branch
```

_Figure 7: A typical Git configuration setup found in .git/config_

The `[remote “origin”]` part is naming the Git repository located at `github.com/OWNER/REPO.git` to _origin,_ so we can reference it elsewhere by that name. We can see that reference being used in the specific `[branch]` configurations for both the _default_ and _branch_ branches in their `remote` keys. This key, in conjunction with the branch name, typically makes up the branch’s **pushRef**: in this example, it is _origin/branch_.

The `remote` and `merge` keys are combined to make up the branch’s **pullRef**: in this example, it is _origin/branch_.

### [Setting up a triangular branch workflow](#setting-up-a-triangular-branch-workflow)

The simplest way to assemble a triangular workflow is to set the branch’s `merge` key to a different branch name, like so:

```
[branch “branch”]
    remote = origin
    merge = refs/heads/default
```

_Figure 8: a triangular branch’s Git configuration found in .git/config_

This will result in the branch **pullRef** as _origin/default_, but **pushRef** as _origin/branch_, as shown in Figure 9.

[![Figure 9: A triangular branch workflow](https://github.blog/wp-content/uploads/2025/04/triangular-image-9.png?resize=1225%2C1066)](https://github.blog/wp-content/uploads/2025/04/triangular-image-9.png)

Figure 9: A triangular branch workflow

### [Setting up a triangular fork workflow](#setting-up-a-triangular-fork-workflow)

Working with triangular forks requires a bit more customization than triangular branches because we are dealing with multiple remotes. Thus, our remotes in the Git config will look different than the one shown previously in Figure 7:

```
[remote “upstream”]
    url = https://github.com/ORIGINALOWNER/REPO.git 
    fetch = +refs/heads/*:refs/remotes/upstream/* 
[remote “origin”]
    url = https://github.com/FORKOWNER/REPO.git  
    fetch = +refs/heads/*:refs/remotes/origin/*
```

_Figure 10: a Git configuration for a multi-remote Git setup found in .git/config_

_Upstream_ and _origin_ are the most common names used in this construction, so I’ve used them here, but they can be named anything you want[1](#fn-85920-1 "Read footnote.").

However, toggling a branch’s `remote` key between _upstream_ and _origin_ won’t actually set up a triangular fork workflow—it will just set up a centralized workflow with either of those remotes, like the centralized workflow shown in Figure 6. Luckily, there are two common Git configuration options to change this behavior.

#### [Setting a branch’s `pushremote`](#setting-a-branchs-pushremote)

A branch’s configuration has a key called `pushremote` that does exactly what the name suggests: configures the remote that the branch will push to. A triangular fork workflow config using `pushremote` may look like this:

```
[branch “branch”]
    remote = upstream  
    merge = refs/heads/default  
    pushremote = origin
```

_Figure 11: a triangular fork’s Git config using pushremote found in .git/config_

This assembles the triangular fork repo we see in Figure 12. The **pullRef** is _upstream/default_, as determined by combining the `remote` and `merge` keys, while the **pushRef** is _origin/branch_, as determined by combining the `pushremote` key and the branch name.

[![Figure 12: A triangular fork workflow](https://github.blog/wp-content/uploads/2025/04/triangular-image-12.png?resize=1226%2C1067)](https://github.blog/wp-content/uploads/2025/04/triangular-image-12.png)

Figure 12: A triangular fork workflow

#### [Setting a repo’s `remote.pushDefault`](#setting-a-repos-remote-pushdefault)

To configure all branches in a repository to have the same behavior as what you’re seeing in Figure 12, you can instead set the repository’s `pushDefault`. The config for this is below:

```
[remote] 
    pushDefault = origin 
[branch “branch”]
    remote = upstream 
    merge = refs/heads/default
```

_Figure 13: a triangular fork’s Git config using remote.pushDefault found in .git/config_

This assembles the same triangular fork repo as shown in Figure 12 above, however this time the **pushRef** is determined by combining the `remote.pushDefault` key and the branch name, resulting in _origin/branch_.

When using the branch’s `pushremote` and the repo’s `remote.pushDefault` keys together, Git will preferentially resolve the branch’s configuration over the repo’s, so the remote set on `pushremote` supersedes the remote set on `remote.pushDefault`.

## [Updating the `gh pr` command set to reflect Git](#updating-the-gh-pr-command-set-to-reflect-git)

Previously, the `gh pr` command set did not resolve **pushRefs** and **pullRefs** in the same way that Git does. This was due to technical design decisions that made this change both difficult and complex. Instead of discussing that complexity—a big enough topic for a whole article in itself—I’m going to focus here on what you can now _do_ with the updated `gh pr` command set.

**If you set up triangular Git workflows in the manner described above, we will automatically resolve `gh pr` commands in accordance with your Git configuration.**

To be slightly more specific, when trying to resolve a pull request for a branch, the GitHub CLI will respect whatever `@{push}` resolves to first, if it resolves at all. Then it will fall back to respect a branch’s `pushremote,` and if that isn’t set, finally look for a repo’s `remote.pushDefault` config settings.

What this means is that the CLI is assuming your branch’s **pullRef** is the pull request’s **baseRef** and the branch’s **pushRef** is the pull requests **headRef**. In other words, if you’ve configured `git pull` and `git push` to work, then `gh pr` commands should just work.[2](#fn-85920-2 "Read footnote.") The diagram below, a general version of Figure 5, demonstrates this nicely:

![Figure 14: the triangular workflow supported by the GitHub CLI with respect to a branch’s pullRef and pushRef. This is the generalized version of Figure 5](https://github.blog/wp-content/uploads/2025/03/image9.png?resize=965%2C719)

Figure 14: the triangular workflow supported by the GitHub CLI with respect to a branch’s pullRef and pushRef. This is the generalized version of Figure 5

## [Conclusion](#conclusion)

We’re constantly working to improve the GitHub CLI, and we’d like the behavior of the GitHub CLI to reasonably reflect the behavior of Git. This was a team effort—everyone contributed to understanding, reviewing, and testing the code to enable this enhanced `gh pr` command set functionality.

It also couldn’t have happened without the support of our contributors, so we extend our thanks to them:

-   `@Frederick888` for opening the [original pull request](https://github.com/cli/cli/pull/9208)
-   `@benknoble` for his support with pull request review and feedback
-   `@phil-blain` for [highlighting the configurations](https://github.com/cli/cli/issues/575#issuecomment-668213138) we’ve talked about here on the [original issue](https://github.com/cli/cli/issues/575)
-   `@neutrinoceros` and `@rd-yan-farba` for reporting a [couple of bugs](https://github.com/search?q=repo%3Acli%2Fcli+10352+10346&type=issues) that the team fixed in [v2.66.1](https://github.com/cli/cli/releases/tag/v2.66.1)
-   `@pdunnavant` for [reporting the bug](https://github.com/cli/cli/issues/10857) that we fixed in v2.71.1
-   `@cs278` for [reporting the bug](https://github.com/cli/cli/issues/10862) that we fixed in v2.71.2.

CLI native support for triangular workflows was 4.5 years in the making, and we’re proud to have been able to provide this update for the community.

The GitHub CLI Team  
`@andyfeller`, `@babakks`, `@bagtoad`, `@jtmcg`, `@mxie`, `@RyanHecht`, and `@williammartin`

* * *

1.  Some commands in gh are opinionated about remote names and will resolve remotes in this order: upstream, github, origin, `<other remotes unstably sorted>`. There is a convenience command you can run to supersede this:\* `gh repo set-default [<repository>]` _to override the default behavior above and preferentially resolve_ `<repository>` _as the default remote repo._ [↩](#fnref-85920-1 "Return to main content.")
2.  If you find a git configuration that doesn’t work, please open an issue in the OSS repo so we can fix it. [↩](#fnref-85920-2 "Return to main content.")

## Written by

 ![Tyler McGoffin](https://avatars.githubusercontent.com/u/5891697?v=4&s=200)

Tyler is a Sr. Software Engineer on the GitHub CLI team. He has an eclectic background in scientific research, education, game design/development, and software. His favorite part about his current job is being an open source maintainer and interacting with the community.