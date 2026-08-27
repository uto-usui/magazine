---
title: "Python projects now support routing rules"
source: "https://vercel.com/changelog/python-projects-now-support-routing-rules"
publishedDate: "2026-08-26"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez"
---

Python projects can now use [routing rules](https://vercel.com/docs/routing/project-routing-rules) to set response headers or rewrite requests to internal paths, including apps built with FastAPI, Django, and Flask.

The [Vercel CDN](https://vercel.com/docs/cdn) evaluates rules before requests reach your application, so changes apply without a new deployment.

For example, this FastAPI app serves a `/new` route:

main.py

```
from fastapi import FastAPIapp = FastAPI()@app.get("/new")def new_route() -> dict[str, str]:    return {"message": "New route!"}
```

Defines the /new route the rewrite below targets

To send requests for `/old` to that route, create a rewrite from the CDN tab in your project dashboard or with the [Vercel CLI](https://vercel.com/docs/cli/routes):

```
# Add a rewrite (staged automatically)vercel routes add --ai "Rewrite /old to /new" --yes# Review staged changesvercel routes list --diff# Publish to productionvercel routes publish
```

Creating and publishing a rewrite with the Vercel CLI

Published rules take effect immediately across all regions, and you can roll back to a previous version from the History tab.

You can also manage rules from Python with the [`vercel` SDK](https://pypi.org/project/vercel/), which wraps the [Vercel REST API](https://vercel.com/docs/rest-api/project-routes). `add_route` stages the rule, and `update_route_version` publishes it:

add\_route.py

```
from vercel.client import Vercelfrom vercel.project_routes import RewriteRoutevercel = Vercel(access_token="...")added = vercel.project_routes.add_route(    project_id="prj_123",    route=RewriteRoute(name="Rewrite /old to /new", source="/old", destination="/new"),)vercel.project_routes.update_route_version(    project_id="prj_123", version_id=added.version.id, action="promote")
```

Stages and publishes the same rewrite from Python

Rewrites can also be defined in `vercel.json`:

vercel.json

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "rewrites": [    {      "source": "/old",      "destination": "/new"    }  ]}
```

Rewrites /old to /new at the deployment level

Project-level rules live outside your deployment and are evaluated before its routes, so a published rule takes precedence over a `vercel.json` rewrite for the same path. Each surface fits a different workflow:

**How you define it**

**Takes effect**

**Best for**

CDN tab in the dashboard

On publish

Editing and testing rules visually

Vercel CLI

On publish

One-off changes from the terminal

`vercel` Python SDK or REST API

On publish

Automation and CI/CD

`vercel.json`

On each deployment

Rewrites that ship with the application code

Update Vercel CLI to the latest version and read the [routing documentation](https://vercel.com/docs/routing) to get started.