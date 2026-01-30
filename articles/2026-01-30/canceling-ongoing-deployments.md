---
title: "Canceling Ongoing Deployments"
source: "https://vercel.com/blog/canceling-ongoing-deployments"
publishedDate: "2020-03-24"
category: "frontend"
feedName: "Vercel"
author: "Ana Jovanova"
---

1 min read

Mar 24, 2020

Sometimes you might find yourself having created a deployment that you don't need anymore, or that is causing other deployments to get queued behind it.

Previously, it was necessary to wait for such deployments to complete, and then delete them. As of today, however, you can immediately **cancel deployments** if they are no longer required.

## [Link to heading](#a-new-cancel-button)A New Cancel Button

In order to prevent a deployment from continuing to build, you can now click on the newly added "Cancel" button that shows up on the dashboard while your deployment is building:

![Canceling an ongoing deployment from the dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F68vAG2nGygD4miw9VEinZ8%2F970c4e3cbc5a14901a91b7cac4f11364%2Fcancel-button.png&w=1920&q=75)

Canceling an ongoing deployment from the dashboard.

Once you've canceled the deployment, any deployments queued behind it will start building.

## [Link to heading](#preventing-deployments-from-getting-queued)Preventing Deployments from Getting Queued

If you're creating new deployments very quickly, the most recently created ones may get queued until the oldest ones have completed building.

Canceling some of them will allow the others to start building. A better way to get them to start building, however, is to increase the amount of **Concurrent Builds** on your team's "Billing" settings page:

![Increasing the amount of Concurrent Builds.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6axjo3GLjN4bg4uJnFsgsD%2F0af4e91f7175634850af44698fc1c6e9%2Fconcurrent-builds-option.png&w=1920&q=75)

Increasing the amount of Concurrent Builds.

Please note that the **Concurrent Builds** feature is only available to teams.

## [Link to heading](#conclusion)Conclusion

Preventing ongoing deployments from building is now simply a matter of clicking a button.

For teams that would like to increase the amount of deployments they can build at the same time, however, we recommend increasing the amount of Concurrent Builds.

[Let us know what you think](https://zeit.co/contact) about this change.