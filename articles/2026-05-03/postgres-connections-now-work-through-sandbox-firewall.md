---
title: "Postgres connections now work through Sandbox firewall"
source: "https://vercel.com/changelog/vercel-sandbox-firewall-now-supports-postgres-connections"
publishedDate: "2026-05-01"
category: "frontend"
feedName: "Vercel"
author: "Brandon Tuttle"
---

2 min read

May 1, 2026

[Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) can now connect to hosted Postgres databases, including [Neon](https://www.vercel.com/marketplace/neon), [Supabase](https://www.vercel.com/marketplace/supabase), [AWS RDS](https://www.vercel.com/marketplace/aws), [Nile](https://www.vercel.com/marketplace/nile), and [Prisma Postgres](https://www.vercel.com/marketplace/nile). To enable a connection, add the database host to your Sandbox's allowed domains.

## [Link to heading](#background)Background

When [SNI based filtering](https://vercel.com/docs/vercel-sandbox/concepts/firewall) is used with Vercel Sandbox, the sandbox firewall restricts outbound network access by checking the domain name during a connection's TLS handshake. This works seamlessly for HTTPS traffic, where the domain is visible at the start of the connection.

Postgres, however, negotiates TLS differently. A Postgres client first opens a plain TCP connection and _then_ upgrades to TLS. Because the domain isn't available when the firewall first needs it, Postgres connections through a standard domain-restricted Sandbox would fail.

## [Link to heading](#what-changed)What changed

The Sandbox firewall now adjusts for the Postgres TLS negotiation flow. It detects the protocol's startup sequence, waits for the TLS upgrade, and then applies your domain policy before forwarding the connection to the database. No changes are needed to your code or database configuration.

## [Link to heading](#connecting-to-hosted-database)Connecting to hosted database

Here's a full example: create a Sandbox, install a Postgres client, lock down the network to only the database host, and run a query.

```
import { Sandbox } from '@vercel/sandbox';const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}?sslmode=require`;// Start with unrestricted network access to install dependencies.const sandbox = await Sandbox.create();await sandbox.runCommand({  cmd: 'sudo',  args: ['dnf', 'install', '-y', 'postgresql15'],});// Lock the sandbox down to only the database host before running untrusted code.await sandbox.updateNetworkPolicy({  allowDomains: [PGHOST!],});const result = await sandbox.runCommand({  cmd: 'psql',  args: [connectionString, '-c', 'SELECT now();'],});console.log(await result.stdout());
```

## [Link to heading](#important-to-know)Important to know

-   **TLS is required:** Domain-based rules rely on the hostname being visible during the TLS handshake, so clients must connect with `sslmode=require` or higher. If your database doesn't support TLS, you can allow it by [IP range](https://www.vercel.com/docs/vercel-sandbox/concepts/firewall#user-defined) instead. Most managed Postgres providers require TLS by default.
    
-   **GSSAPI encryption is not supported:** Clients using `gssencmode=prefer` will fall back to TLS automatically; `gssencmode=require` will not connect.
    
-   **No silent downgrades:** If a client uses `sslmode=prefer` and the database doesn't support TLS, the connection will fail rather than silently falling back to plain-text.
    

Learn more about the [Sandbox firewall](https://vercel.com/docs/vercel-sandbox/concepts/firewall).