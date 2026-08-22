---
title: "The Vercel Sandbox CLI is now more agent-friendly"
source: "https://vercel.com/changelog/the-vercel-sandbox-cli-is-now-more-agent-friendly"
publishedDate: "2026-08-18"
category: "frontend"
feedName: "Vercel"
author: "Elisabeth Rülke"
---

The Sandbox CLI version `4.0.1` ships four output and error improvements:

-   New sandboxes point users towards how to connect into them.
    
-   A sandbox not found error shows where to look for existing sandboxes.
    
-   Common mistakes, like typing a command after `sh`, redirect to the command that was intended.
    
-   Outdated installs show an update notice when they create a new sandbox.
    

Each of these messages now carries the action to take next instead of leaving you to work it out.

### [Copy link to heading](#new-sandboxes-tell-you-how-to-connect)New sandboxes tell you how to connect

`create` and `fork` output now ends with a connect hint, so a fresh sandbox never leaves you wondering what to type next.

```
$ sandbox create --name my-sandbox✅ Sandbox my-sandbox created.   │ team: my-team   │ project: my-project   ╰ connect with: sandbox ssh my-sandbox
```

### [Copy link to heading](#not-found-errors-point-you-to-your-sandboxes)Not found errors point you to your sandboxes

When a command references a sandbox that does not exist, the error is quiet and actionable instead of a raw API dump. Setting `DEBUG=sandbox:errors` restores the request detail for debugging.

```
$ sandbox connect my-sandboxNamed sandbox 'my-sandbox' not found for this project.├▶ status code: 404 Not Found╰▶ hint: run sandbox ls --all to see the sandboxes in this project.
```

### [Copy link to heading](#a-misused-command-explains-the-right-one)A misused command explains the right one

`sh` opens a plain interactive shell, so it takes no command of its own. The CLI can now return precise answers that rewrite the attempt into the command that does what you meant, whatever the command is.

```
$ sandbox sh claude`sh` starts a plain shell and doesn't take a command.hint: to run claude interactively in a new sandbox:╰▶ sandbox run -i claude
```

### [Copy link to heading](#outdated-installs-warn-you-at-creation-time)Outdated installs warn you at creation time

`create`, `sh`, and `run` check for a newer published CLI and print an update notice when the install is behind. The check is cached to a file and refreshed at most once per hour; when a lookup does run it happens concurrently with the creation request, so it adds no latency. Creation defaults, such as the base image, are chosen client side, so an outdated global install silently keeps old defaults. Prerelease versions skip the check, and `SANDBOX_SKIP_VERSION_CHECK=1` disables it.

```
$ sandbox create✅ Sandbox my-sandbox created.   ...⚠ A newer Sandbox CLI is available: 4.0.0 (you're on 3.0.0)   ╰ newer versions can change creation defaults like the base image. Update with npm i -g sandbox@latest
```

Learn more in the [Sandbox CLI documentation](https://vercel.com/docs/sandbox/cli-reference).