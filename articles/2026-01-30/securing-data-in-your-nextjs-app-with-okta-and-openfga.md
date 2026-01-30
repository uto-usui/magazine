---
title: "Securing data in your Next.js app with Okta and OpenFGA"
source: "https://vercel.com/blog/securing-data-in-your-next-js-app-with-okta-and-openfga"
publishedDate: "2024-05-16"
category: "frontend"
feedName: "Vercel"
author: "Sam Bellen"
---

7 min read

May 16, 2024

Modern Next.js applications can have large codebases operating across multiple environments, including client components running in the browser, Server Actions executing on the server, and more.

As applications become more complex, ensuring users can access only authorized data and actions becomes paramount. To that end, Next.js equips developers with tools to maintain data security. Developers can centralize authentication and authorization checks by integrating a Data Access Layer (DAL).

In this blog post, we'll introduce the concept of a DAL and use it to implement a fine-grained authorization model within a Next.js application.

## [Link to heading](#client-side-vs.-server-side-code-in-next.js)Client-side vs. server-side code in Next.js

### [Link to heading](#confidential-vs.-public-environments)Confidential vs. public environments

Web applications typically run in two different environments: a confidential server environment and a public environment.

A confidential environment—your server—can execute code securely, store secrets, and should only expose data after running through all business logic.

The public environment is the browser. Interactive Next.js applications often have code that runs in the browser and reacts to events and updates that happen in or through the user interface. This client-side code is exposed in the browser and should never contain sensitive logic or secrets.

When these two environments interact with each other, the server should always double-check each action, as there has been too much wiggle room to do something unexpected from the browser.

### [Link to heading](#server-and-client-components)Server and client components

Modern Next.js codebases with the [App Router](https://nextjs.org/docs/app) offer the choice between [client](https://nextjs.org/docs/app/building-your-application/rendering/client-components) and [server components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) for parts of the user interface or entire pages. Application logic can, for example, be executed exclusively on the server, and UI logic can live in a client component.

You can import the `server-only` package to mark a piece of code that will be run exclusively on the server. This will prevent the code from being executed in the client and potentially leak sensitive data like API keys or secrets.

Client components can be marked with `'use client'`, indicating to the underlying bundler (webpack or Turbopack) to enter into the [client boundary](https://twitter.com/delba_oliveira/status/1767958810356756798).

## [Link to heading](#introducing-a-data-access-layer-into-your-application)Introducing a Data Access Layer into your application

As your applications grow, so do the number of touch points to fetch, update, or delete data from your database or other persistent storage solution.

The decisions about whether a user can access that data or perform those actions are often scattered throughout the codebase. A DAL can help keep a clear view of what data requests or mutations are happening and what checks are performed before they happen.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5VQhj7wtHsEjZGYptDSrxb%2F58f66fb02cc394befa4d9db64f6f280d%2Fget-data-diagram-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F40fXnN9dFocueFGMm6RKuO%2F65ecb31c5b6265bcb3ccf2545506e9dc%2Fget-data-diagram-dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4VddGXk1rMdhBsGWji6tOi%2F0a915da3f52dd834aa1e0950ca1ca9f3%2Fget-data-diagram-light-mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1t0VtxjmKmJLnXhAd14axv%2F3e9393ad03182e30710a007e5e0d0b9d%2Fget-data-diagram-dark-mobile.png&w=1920&q=75)

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1uMTuGgZk1waKv0zf6uho2%2F698753b977eb006d8efcce791ece0c09%2Fupdate-data-diagram-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6ge3c12InF0m5QKZ3cDbUF%2F42a7d76dd19d64645a19ea8fcbaf6928%2Fupdate-data-diagram-dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6L9OmekmpKiHGEfMr66nsE%2Fa36537f93f7048e03746bad3bbfa51f6%2Fupdate-data-diagram-light-mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4dISF3AZd20YQdUojceSy%2F08640568be5ce10736eaba64b0fb8784%2Fupdate-data-diagram-dark-mobile.png&w=1920&q=75)

This Data Access Layer sits between your application logic and your persistent storage to ensure the requested data can be presented or changes to the data can be made. The DAL makes for the ideal location for these three types of actions:

-   Make sure the user has authenticated, so we know who they are
    
-   Check whether the authenticated user is authorized to request or change the data
    
-   Fetch the data from our database or perform updates on the data
    

We can add the checks with our authorization server(s) by expanding our flow chart above:

## [Link to heading](#adding-fine-grained-authorization-to-our-application)Adding fine-grained authorization to our application

One of the most common approaches to authorization is role-based access control (RBAC), where a role contains a set of permissions and is assigned to each user.

RBAC is a simple way of determining what permissions a user has and what actions they should be able to perform within an application. More complex applications often require a more flexible approach to authorization, where access can be granted on a user and resource level instead of a general resource type.

Enter relationship-based access control, or ReBAC. Don’t let the one extra letter in the acronym fool you; it’s an entirely different approach to authorization.

Instead of checking a fixed set of permissions assigned to a user via roles, we look at the relationship between a user (or group of users) and a resource (or group of resources) to determine whether they should be able to see the data or perform an action on it.

Because we’re looking at the bigger picture and determining relationships between two entities, these relationships often don’t need to be explicitly defined. For example, if a user belongs to a group, it is enough to grant that group access, and all its members will automatically get access, too.

The same is true for a group of resources. If a user has access to, for example, a folder, they should automatically get access to all files within that folder without explicitly defining these relationships.

We’ll use [OpenFGA](https://openfga.dev/), an open-source fine-grained authorization solution, to implement relationship-based access control in our application. If you prefer a managed SaaS version, you can use Okta FGA instead. It’s built on top of OpenFGA and uses the same authorization modeling language, engine, and SDKs.

### [Link to heading](#getting-started-with-openfga)Getting started with OpenFGA

To start with OpenFGA, you need to create an authorization model that describes all resource types and their possible relationships. We’ll write the model using OpenFGA’s domain-specific language (DSL). A model for Google Drive might look something like this, where we describe a user, a file, and a folder resource type:

```
model  schema 1.1type usertype file  relations    define can_delete: owner or owner from parent    define can_share: owner or owner from parent    define can_view: viewer or owner or viewer from parent    define can_write: owner or owner from parent    define is_owned: owner    define is_shared: can_view but not owner    define owner: [user]    define parent: [folder]    define viewer: [user, user:*]type folder  relations    define can_create_file: owner or owner from parent    define can_create_folder: owner or owner from parent    define can_share: owner or owner from parent    define can_view: viewer or owner or viewer from parent    define owner: [user]    define parent: [folder]    define viewer: [user, user:*] or owner or viewer from parent
```

Next to the authorization model, the [OpenFGA](https://www.npmjs.com/package/@openfga/sdk) decision engine also needs some data to run against this model. This data is structured as tuples, which are sets of these three values:

-   A `user` is a resource consumer, like an application user or a folder
    
-   An `object` is our resource—a file, for example
    
-   A `relation` is the relationship between the `user` and the `object`, like `owner` or `parent`
    

We’ll explain how to add new tuples in the next section.

All that’s left to do is add the OpenFGA SDK to your codebase by running `npm install @openfga/sdk`. Once installed, you can use the SDK to create a new client that exposes all methods you’ll need to work with the OpenFGA decision engine in your codebase:

```
import { OpenFgaClient } from '@openfga/sdk';const fgaClient = new OpenFgaClient({  // A link to your OpenFGA instance  apiUrl: process.env.FGA_API_URL,   // The ID of your store, the collection of tuples, on OpenFGA  storeId: process.env.FGA_STORE_ID,  // The ID of your Authorization model. This changes with each change to the   // model, and can be overwritten with each check  authorizationModelId: process.env.FGA_MODEL_ID, });
```

[Check out this blog post](https://auth0.com/blog/fine-grained-access-control-with-okta-fga-nextjs/) for more detailed information on how to start with OpenFGA in your Next.js application.

Now that you’ve got your model and data in place and the OpenFGA SDK installed, you can ask the OpenFGA decision engine to check any read or write operation your application performs. It will return a simple yes or no, indicating whether an action is permitted for the current user, resource, or situation.

### [Link to heading](#checking-fga-in-our-dal)Checking FGA in our DAL

With our Data Access Layer, we can add an authorization check for each action. OpenFGA exposes a nice check method for performing an authorization check. Once the OpenFGA decision engine has considered all possible scenarios, it will let us know if we can proceed with the action or if we should abort and throw an error.

Here’s an example of what a `getFile` action in our Data Access Layer would look like. Notice that it does an authentication check first, then proceeds to check whether the authenticated user is authorized to view the requested file, and lastly fetches and returns the file from storage:

```
export async function getFile(fileId) {  try {    // Check if the user is authenticated    if (await !isAuthenticated()) {      return { error: "Unauthorized" };    }    // The user is authenticated so we can grab their ID    const userId = await getUserId();    // Check with OpenFGA if the user can view the file we're trying to fetch    const { allowed } = await openfgaClient.check({      user: `user:${userId}`,      relation: "can_view",      object: `file:${fileId}`,    });    // If the user is not authorized, we'll show an error    if (!allowed) {      return { error: "Forbidden" };    }    // The user was authorized, so we'll fetch our file and return it    return await getFileFromStore(fileId);  } catch (error) {    return { error };  }}
```

When writing data, we’re also passing through our DAL so that a `writeFile` action would look very similar to the above.

Still, when updating data in a cloud storage application—like uploading a new file, for example—we must ensure our OpenFGA service knows about this new data. To do this, we’ll have to create new tuples: sets of data the decision engine considers when making a decision.

We’ll add two new tuples. The first marks the current user as the owner of the new file, and the second sets the current folder as the parent folder of a new file:

```
export async function uploadFile(parent, file) {  try {    // Check if the user is authenticated    if (await !isAuthenticated()) {      return { error: "Unauthorized" };    }    // The user is authenticated, so we can grab their ID    const userId = await getUserId();    // Check with OpenFGA if the user can create new files in the current location    const { allowed } = await openfgaClient.check({      user: `user:${userId}`,      relation: "can_create_file",      object: `folder:${parent}`,    });    // If the user is not authorized, we'll show an error    if (!allowed) {      return { error: "Forbidden" };    }    // Write the file to a persistent location    const {fileId} = await writeFile(file);    // Write OpenFGA tuples for the new file    await openfgaClient.writeTuples([      {        user: `user:${userId}`,        relation: "owner",        object: `file:${fileId}`,      },      {        user: `folder:${parent}`,        relation: "parent",        object: `file:${fileId}`,      },    ]);    return file;  } catch (error) {    return { error };  }}
```

Using a dedicated authorization service like OpenFGA, we have one centralized location where all authorization logic is created, maintained, and executed. This makes it easier to audit these decisions since you don’t need to go through your codebase and sift through endless `if…else` statements making these decisions.

On top of that, all your applications will have access to the same consistent authorization logic. When some of this logic changes, the applications don’t need changing because they’ll only ask yes/no questions to OpenFGA.

## [Link to heading](#error-handling)Error handling

You want your users to see as few errors as possible. Because of this, you may make optimistic decisions and follow a success-by-default approach, assuming all goes well unless an error occurs.

When dealing with user data, there is no room for such optimism. The best approach is to assume a user is not authenticated and authorized unless we determine they are.

In the two code samples, you’ll notice we start with our authentication check and immediately return an error if it fails, stopping the rest of the method's execution. The same is true for the authorization check. Only if both checks return the expected result do we touch the data.

## [Link to heading](#conclusion)Conclusion

Centralizing all data operations within a Data Access Layer (DAL) simplifies authentication and authorization checks, allowing you to build secure and scalable Next.js applications.

A fine-grained authorization approach, as with OpenFGA in the DAL, offers flexibility. It enables you to validate each action to ensure compliance with your authorization model. This ensures that unauthorized actions are quickly blocked, maintaining security and minimizing potential risks.