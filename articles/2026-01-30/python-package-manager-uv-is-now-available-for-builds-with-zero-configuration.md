---
title: "Python package manager uv is now available for builds with zero configuration"
source: "https://vercel.com/changelog/python-package-manager-uv-is-now-available-for-builds-with-zero"
publishedDate: "2025-10-03"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez  "
---

1 min read

Oct 3, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F337D8Bn6ZlgKnxd6uiEaRW%2F6b96c8d87ad9c675a34339885b5698bc%2FVercel___UV-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4YVMo52WQyZX2a958Vs6uo%2Fde0813b2ebbdb97254c84623cbe31ed6%2FVercel___UV-_Dark.png&w=1920&q=75)

Vercel now uses [`uv`](https://docs.astral.sh/uv/), a fast Python package manager written in Rust, as the default package manager during the installation step for all Python builds.

This change makes builds **30-65%** faster and adds support for more dependency formats. In addition to `requirements.txt` or `Pipfile`, projects can now declare dependencies with a `uv.lock` or `pyproject.toml` file.

Learn more about the [Python runtime on Vercel](https://vercel.com/docs/functions/runtimes/python).