---
title: "FastAPI frontends and static files served from the CDN"
source: "https://vercel.com/changelog/fastapi-frontends-and-static-files-served-from-the-cdn"
publishedDate: "2026-09-10"
category: "frontend"
feedName: "Vercel"
author: "Daniel Park"
---

FastAPI frontends and static files, served with [`app.frontend()`](https://fastapi.tiangolo.com/tutorial/frontend/) or [`StaticFiles`](https://fastapi.tiangolo.com/tutorial/static-files/), are now promoted to the [Vercel CDN](https://vercel.com/cdn) at build time. Requests for those paths are served directly from the CDN, without invoking your Vercel Function.

```
app = FastAPI()app.frontend("/", directory="dist")app.mount("/assets", StaticFiles(directory="assets"), name="assets")
```

Frontend and StaticFiles, both promoted to the CDN.

FastAPI evaluates routes in declaration order. A route declared before a `StaticFiles` mount takes priority over any CDN file at that path. This precedence is preserved.

```
@app.get("/static/manifest.json") # served by your Vercel Functiondef manifest(): ...app.mount("/static", StaticFiles(directory="static"), name="static")
```

A route that takes precedence over StaticFiles.

Promoted source directories remain in the function bundle so the app can read from them at runtime. To exclude them and serve only from the CDN, set `tool.vercel.fastapi.static.exclude = true` in `pyproject.toml`.

Frontends guarded by [dependencies](https://fastapi.tiangolo.com/reference/dependencies/) are kept on the function as the CDN cannot run dependency checks. Similarly, static files which sit behind [middleware](https://fastapi.tiangolo.com/reference/middleware/) are also kept on the function. To override this and always promote to CDN, set `tool.vercel.fastapi.static.cdn = true`. To opt out of the CDN entirely, set it to `false` instead.

For more information see the [Vercel FastAPI documentation](https://vercel.com/docs/frameworks/backend/fastapi).