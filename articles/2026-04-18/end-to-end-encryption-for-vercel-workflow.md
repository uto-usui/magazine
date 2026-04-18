---
title: "End-to-end encryption for Vercel Workflow"
source: "https://vercel.com/changelog/workflow-encryption"
publishedDate: "2026-03-17"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

2 min read

Mar 17, 2026

Vercel Workflow now encrypts all user data end-to-end without requiring any code changes. Workflow inputs, step arguments, return values, hook payloads, and stream data are automatically encrypted before being written to the event log.

This makes it safe to pass sensitive data, such as API keys, tokens, or user credentials, across boundaries. The event log only ever stores ciphertext, while your step functions work exactly as before.

Your workflow and step functions work exactly as before; all data flowing through the event log is encrypted automatically.

Each Vercel deployment receives a unique encryption key. The key derivation and encryption stack works as follows:

-   Each workflow run derives its own key via HKDF-SHA256
    
-   Data is encrypted with AES-256-GCM to ensure confidentiality and integrity
    
-   Encrypted fields display as locked placeholders in the dashboard until decrypted
    

You can access encrypted data through two methods:

**Web dashboard**: Click the Decrypt button in the run detail panel. Decryption happens entirely in the browser via the Web Crypto API, so the observability server never sees your plaintext data.  
**CLI:** Add the `--decrypt` flag to the `inspect` command.

```
npx workflow inspect run <run-id> --decrypt --withData​
```

Decryption follows the same permissions model as project environment variables, meaning you cannot access workflow data if you lack permission to view environment variables. Each decryption request is recorded in your Vercel [audit log](https://vercel.com/docs/audit-log), providing your team with full visibility into access events.

While end-to-end encryption is built into the Vercel platform, custom `World` implementations can opt into this feature. You can provide your own `getEncryptionKeyForRun()` method, which the core runtime uses automatically.  
  
Learn more in the [Workflow DevKit documentation](https://useworkflow.dev/docs).