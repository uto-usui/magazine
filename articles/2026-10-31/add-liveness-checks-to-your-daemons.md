---
title: "Add liveness checks to your Daemons"
source: "https://vercel.com/changelog/add-liveness-checks-to-your-daemons"
publishedDate: "2026-10-30"
category: "frontend"
feedName: "Vercel"
author: "Gal Schlezinger"
---

[Vercel Daemons](https://vercel.com/daemons) now support configuring HTTP liveness checks.

Start with an HTTP endpoint in your daemon that reports its health. Keep it lightweight so it responds quickly, and have it return an error status when the daemon is no longer healthy:

index.js

```
let alive = true;startWorker({  onConnectionError: () => { alive = false }})require('http').createServer((req, res) => {  res.statusCode = alive ? 200 : 500;  res.end();}).listen(1234)
```

A minimal health endpoint that fails the check when the worker is no longer healthy

The daemon configuration now accepts a `livenessProbe` value pointing at that endpoint:

vercel.json

```
{  "daemons": {    "worker": {      "root": "worker/",      "entrypoint": "Dockerfile",      "livenessProbe": {        "httpGet": { "port": 1234, "path": "/health" }      }    }  }}
```

A daemon with an HTTP liveness probe on port 1234

Vercel periodically requests the endpoint and restarts the daemon's container when the check fails, catching a daemon that is still running but no longer healthy.

[Read the Daemon documentation](https://vercel.com/docs/daemons) for more information about liveness checks, including default values and the optional tuning fields.