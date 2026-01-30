---
title: "Zero-configuration Flask backends"
source: "https://vercel.com/changelog/zero-configuration-flask-backends"
publishedDate: "2025-10-10"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez  "
---

1 min read

Oct 10, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7lkIxyuPpdnQtVp1Ya5Jgn%2F57c475d83cbe8f709a8636e960bfb4b4%2FVercel__flask.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4B9hHW08SxDG2zU8TlsLZA%2F43190a551778441531c356a11082bb42%2FVercel__flask-darlmode.png&w=1920&q=75)

[Flask](https://flask.palletsprojects.com/), one of the most popular [Python](https://vercel.com/docs/functions/runtimes/python) web application frameworks, can now be deployed instantly on Vercel with no configuration changes needed.

app.py

```
from flask import Flaskapp = Flask(__name__)@app.route("/")def hello_world():     return "<p>Hello, World!</p>"
```

A "Hello World" Flask app on Vercel

Vercel's [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) now recognizes and deeply understands Flask applications. This update removes the need for redirects in `vercel.json` or using the `/api` folder.

Backends on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. This means your Flask app will automatically scale up and down based on traffic, and you only pay for time where your code is actively using CPU.

[Deploy Flask on Vercel](https://vercel.com/templates/python/flask-python-boilerplate) or visit the [Flask on Vercel documentation](https://vercel.com/docs/frameworks/backend/flask).