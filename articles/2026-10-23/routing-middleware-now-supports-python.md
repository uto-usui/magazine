---
title: "Routing Middleware now supports Python"
source: "https://vercel.com/changelog/routing-middleware-now-supports-python"
publishedDate: "2026-10-21"
category: "frontend"
feedName: "Vercel"
author: "Daniel Park"
---

You can now write [routing middleware](https://vercel.com/docs/routing-middleware) in Python for FastAPI, Flask, Django, and other Python frameworks. It runs before requests reach your app, and can rewrite, redirect, or answer them.

To set it up, point the `proxy` entrypoint in `vercel.toml` at your proxy:

vercel.toml

```
[proxy]entrypoint = "proxy:proxy"
```

proxy:proxy means the proxy attribute of proxy.py.

Your middleware is an ASGI or WSGI app that runs separately from your main app, with only the packages in the `vercel.proxy` dependency group of your `pyproject.toml`. Add the packages your middleware imports to that group:

```
uv add --group vercel.proxy vercel-proxy
```

The [`vercel-proxy`](https://pypi.org/project/vercel-proxy/) package provides utilities for writing routing middleware on Vercel, including a `Proxy` app that routes requests by path:

proxy.py

```
from urllib.parse import quotefrom vercel.proxy import ContinueResponse, Proxy, RedirectResponse, Request, Responseproxy = Proxy()@proxy.route("/old-blog/{slug}")def old_blog(request: Request) -> Response:    slug = quote(request.path_params["slug"])    return RedirectResponse(f"/blog/{slug}", status_code=308)@proxy.route("/api/{path:path}")def api(request: Request) -> Response:    return ContinueResponse(request_headers={"x-api-version": "2"})
```

Requests that match no route continue to your app unchanged.

For more information, see the [Routing Middleware Python reference](https://vercel.com/docs/routing-middleware/python-reference).