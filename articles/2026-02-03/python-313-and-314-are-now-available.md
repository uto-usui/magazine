---
title: "Python 3.13 and 3.14 are now available "
source: "https://vercel.com/changelog/python-3-13-and-3-14-are-now-available"
publishedDate: "2026-02-02"
category: "frontend"
feedName: "Vercel"
author: "Elvis Pranskevichus"
---

1 min read

Feb 2, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FsXA116daxqkCqSlhI7UHG%2Fe2b4c093ba675bdb0fbb29bdb73a600a%2FPython_Ruby_Update_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7z2vFpr1RmAihu9EyKPPIZ%2F60b8725fe4b18a7adb7139e553765874%2FPython_Ruby_Update_Dark.png&w=1920&q=75)

Builds and Functions now support Python 3.13 and Python 3.14 alongside the previously supported Python 3.12. Projects without a specified Python version continue using Python 3.12 by default.

The default will switch to Python 3.14 in the coming months. To continue using Python 3.12, specify an upper bound in your project manifest (`pyproject.toml` or `Pipfile`) as shown in the examples below.

pyproject.toml

```
[project]...requires-python = "~=3.12.0"
```

Specifying Python version in pyproject.toml

Pipfile

```
[requires]...python_version = "3.12"
```

Specifying Python version in Pipfile

See the [Python documentation](https://vercel.com/docs/functions/runtimes/python) to learn more about Python support on Vercel.