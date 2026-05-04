---
title: "How Meta Is Strengthening End-to-End Encrypted Backups"
source: "https://engineering.fb.com/2026/05/01/security/meta-strengthening-end-to-end-encrypted-backups/"
publishedDate: "2026-05-01"
category: "engineering"
feedName: "Meta Engineering"
---

## The HSM-based Backup Key Vault

Meta’s [HSM-based Backup Key Vault](https://engineering.fb.com/2021/09/10/security/whatsapp-e2ee-backups/) provides the foundation for end-to-end encrypted backups for WhatsApp and Messenger. The system allows people to protect their backed-up message history with a recovery code, ensuring that the recovery code is stored in tamper-resistant hardware security modules (HSMs) and is inaccessible to Meta, cloud storage providers, or any third party. The vault is deployed as a geographically distributed fleet across multiple datacenters, providing resilience through majority-consensus replication.

Late last year, we [made it easier to end-to-end encrypt your backups using passkeys](https://blog.whatsapp.com/encrypting-your-whatsapp-chat-backup-just-got-easier/?page_source=search&q=passkey?ref=engineeringatmeta), and now we continue to strengthen the underlying infrastructure that protects password-based end-to-end encrypted backups with two updates: over-the-air fleet key distribution for Messenger and a commitment to publishing evidence of secure fleet deployments.

### Over-the-Air Fleet Key Distribution

![](https://engineering.fb.com/wp-content/uploads/2026/05/Over-the-Air-Fleet-Key-Distribution.png)

To verify the authenticity of the HSM fleet, clients validate the fleet’s public keys before establishing a session. In WhatsApp, these keys are hardcoded into the application. To support Messenger — where new HSM fleets need to be deployed without requiring an app update — we built a mechanism to distribute fleet public keys over the air as part of the HSM response. Fleet keys are delivered in a validation bundle that is signed by Cloudflare and counter-signed by Meta, providing independent cryptographic proof of their authenticity. Cloudflare also maintains an audit log of every validation bundle. The full validation protocol is described in our whitepaper, “[Security of End-To-End Encrypted Backups](https://www.whatsapp.com/security/WhatsApp_Security_Encrypted_Backups_Whitepaper.pdf).”

### More Transparent Fleet Deployment

Transparency in the deployment of our HSM fleet is essential to demonstrating that the system operates as designed and that Meta cannot access users’ encrypted backups.  We will now publish evidence of the secure deployment of each new HSM fleet on this blog page, further cementing our leadership in the space of secure encrypted backups. New fleet deployments are infrequent — typically no more than every few years — and we are committed to demonstrating to our users that each new fleet is deployed securely, which any user can verify by following the steps in the Audit section of our whitepaper.

## Read the Whitepaper

For the complete technical specification of the HSM-based Backup Key Vault, read the full whitepaper, “[Security of End-To-End Encrypted Backups](https://www.whatsapp.com/security/WhatsApp_Security_Encrypted_Backups_Whitepaper.pdf).”