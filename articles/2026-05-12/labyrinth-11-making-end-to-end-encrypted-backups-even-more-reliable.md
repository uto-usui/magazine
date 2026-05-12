---
title: "Labyrinth 1.1: Making End-to-End Encrypted Backups Even More Reliable "
source: "https://engineering.fb.com/2026/05/11/security/labyrinth-1-1-end-to-end-encrypted-e2ee-backups-more-reliable/"
publishedDate: "2026-05-11"
category: "engineering"
feedName: "Meta Engineering"
---

![](https://engineering.fb.com/wp-content/uploads/2023/12/Messenger-E2EE-end-to-end-security.png)

-   We’re rolling out version 1.1 of Labyrinth, the encrypted storage system and protocol that secures messages and history on Messenger.
-   Labyrinth 1.1 enhances the reliability of end-to-end encrypted backups with a new sub-protocol that helps messages survive the loss of a device, a switched device, and long gaps between sign-ins.
-   Read our updated white paper, “[The Labyrinth Encrypted Message Storage Protocol](https://engineering.fb.com/wp-content/uploads/2026/05/Minos-Updates-2026-Encrypted-Backups-White-Paper.pdf)” for more details.

Good security should always be invisible. When Meta [launched encrypted backups for Messenger in 2023](https://engineering.fb.com/2023/12/06/security/building-end-to-end-security-for-messenger/), we set a new bar for end-to-end encrypted (E2EE) messaging at scale. With E2EE messaging backups your message history can travel with you across devices without ever being readable by any other party, including Meta.

Today, we’re evolving the work we began with Labyrinth, our protocol for end-to-end encrypting stored messages history between devices on your Messenger account. [Labyrinth 1.1](https://engineering.fb.com/wp-content/uploads/2026/05/Minos-Updates-2026-Encrypted-Backups-White-Paper.pdf) improves backup reliability with a new sub-protocol that lets messages reach your encrypted backup as they’re sent, rather than waiting for your device to come back online, which is how Messenger encrypted backups currently work.

This means your messages are safe even if you lose your phone, switch devices, or have a long gap between sign-ins. Each message is wrapped with a message encryption key that the sender places directly into the recipient’s encrypted backup — like dropping a sealed envelope into a locked box only the recipient can open. No one but you and the people you’re talking to can read your messages – not even us.

We’re rolling Labyrinth 1.1 out broadly to Messenger and are already seeing meaningful gains with more messages successfully backed up and more people restoring their full message history when they change devices.

## Read the White Paper

Read our updated white paper, “[The Labyrinth Encrypted Message Storage Protocol](https://engineering.fb.com/wp-content/uploads/2026/05/Minos-Updates-2026-Encrypted-Backups-White-Paper.pdf)”  for more information.