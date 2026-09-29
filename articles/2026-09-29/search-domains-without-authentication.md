---
title: "Search domains without authentication"
source: "https://vercel.com/changelog/search-domains-without-authentication"
publishedDate: "2026-09-28"
category: "frontend"
feedName: "Vercel"
author: "TMO"
---

You can now discover domain names and check availability and pricing without signing in to Vercel or providing an access token. This works through the Vercel CLI and Domains Registrar API.

With the [Vercel CLI](https://vercel.com/docs/cli/domains), search by keyword or domain fragment:

```
vercel domains search acmesite --limit 5
```

Find domain suggestions based on the keyword “acmesite” with the Vercel CLI.

With the [Domains Registrar API](https://vercel.com/docs/rest-api/domains-registrar/get-domain-availability-and-pricing), check up to 200 exact domain names in one request. The response shows whether each can be registered and, when available, its registration and renewal prices:

```
curl --request POST \  --url https://api.vercel.com/v1/registrar/domains/search \  --header 'Content-Type: application/json' \  --data '{"domains":["example.com","example.dev","example.app"]}'
```

Check registration and renewal pricing for specific domains with the API.

Authentication is still required to buy or manage domains.

Try the public [domain search](https://vercel.com/domains), or learn how to [claim a free domain with Pro](https://vercel.com/docs/domains/free-domain-with-pro).