---
title: "Send feedback from the Vercel CLI"
source: "https://vercel.com/changelog/send-feedback-from-vercel-cli"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "Vercel"
author: "Krish"
---

The [Vercel CLI](https://vercel.com/docs/cli) now includes [`vercel feedback`](https://vercel.com/docs/cli/feedback), which sends bugs, friction reports, and feature requests to the Vercel team from your terminal.

terminal

```
vercel feedback "The error didn't explain how to fix the issue"
```

Coding agents can also send feedback when they run into issues. Use `vercel feedback` with `-f` or `--field` to include structured context as `key=value` pairs. Repeat the flag to describe the task, expected behavior, and what went wrong.

terminal

```
vercel feedback "The error did not explain the correct command" \  -f product=cli \  -f model=gpt-6-astra \  -f harness=fx \  -f task="deploy a preview" \  -f expected="Create a Preview deployment" \  -f actual="Unknown option: --preview" \  -f type=bugcat notes.md | vercel feedback -
```

Update to the latest Vercel CLI and read the [`vercel feedback` documentation](https://vercel.com/docs/cli/feedback) to get started.