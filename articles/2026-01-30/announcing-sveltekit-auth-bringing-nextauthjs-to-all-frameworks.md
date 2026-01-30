---
title: "Announcing SvelteKit Auth: Bringing NextAuth.js to all frameworks"
source: "https://vercel.com/blog/announcing-sveltekit-auth"
publishedDate: "2022-12-14"
category: "frontend"
feedName: "Vercel"
author: "Balázs Orbán"
---

2 min read

Dec 14, 2022

[NextAuth.js](https://next-auth.js.org/), the most popular authentication library for Next.js applications with almost 300,000 npm downloads per week, is growing to support the entire ecosystem of frontend frameworks.

Today, **we’re excited to announce SvelteKit Auth** (experimental) as the first framework outside of Next.js officially supported, built on top of the new `@auth/core` decoupled library. This new package marks the larger move to Auth.js, providing authentication for the Web, with any framework you like.

Get started with our new [SvelteKit Authentication Template](https://vercel.com/templates/svelte/sveltekit-authentication).

## [Link to heading](#why-sveltekit)Why SvelteKit?

The Auth.js open-source team targeted providing a simple authentication solution for Next.js first with the creation of NextAuth.js. However, we also are big fans of the SvelteKit framework. With today’s SvelteKit 1.0 release, we figured now was the perfect time to share what we’ve been up to.

SvelteKit (for Svelte) is conceptually similar to Next.js for React. It provides an opinionated framework for building your Svelte applications. We felt this made it the perfect candidate for a simple, low-configuration authentication library that supports many of the most most popular OAuth platforms like Google, Facebook, GitHub, and more.

## [Link to heading](#using-sveltekit-auth-with-sveltekit-1.0)Using SvelteKit Auth with SvelteKit 1.0

After installing `@auth/sveltekit` and `@auth/core`, we first need to define which OAuth providers we want to configure our application to use. Let’s use GitHub, for example.

src/hooks.server.ts

```
import SvelteKitAuth from "@auth/sveltekit"import GitHub from '@auth/core/providers/github';import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"export const handle = SvelteKitAuth({  providers: [    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),  ]});
```

Configuring SvelteKit Auth to use the GitHub OAuth Provider.

We’re able to read our environment variables to securely configure the GitHub OAuth provider. Next, we can allow users to sign in.

SvelteKit Auth provides helpful methods to `signIn` and `signOut` on user actions. In the following example, we check if the user is authenticated for the main index route. If we have session data, we’re able to display the user’s avatar and name. Otherwise, we can show a sign-in button.

```
<script>	import { signIn, signOut } from '@auth/sveltekit/client';	import { page } from '$app/stores';</script><p>	{#if Object.keys($page.data.session || {}).length}		{#if $page.data.session.user.image}			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />		{/if}		<span class="signedInText">			<small>Signed in as</small><br />			<strong>{$page.data.session.user.email || $page.data.session.user.name}</strong>		</span>		<button on:click={() => signOut()} class="button">Sign out</button>	{:else}		<span class="notSignedInText">You are not signed in</span>		<button on:click={() => signIn('github')}>Sign In with GitHub</button>	{/if}</p>
```

Using SvelteKit Auth to allow the user to sign in or out on the page.

We could also put this logic inside of a shared layout for a group of routes, if we prefer. Finally, we can also easily protect routes we don’t want to allow access to for unauthenticated users.

```
import { redirect } from "@sveltejs/kit"import type { PageLoad } from "./$types"export const load: PageLoad = async ({ parent }) => {  const { session } = await parent()  if (!session?.user) {    throw redirect(302, "/")  }  return {}}
```

Protecting a route with SvelteKit auth.

## [Link to heading](#get-started-with-sveltekit-auth)Get started with SvelteKit Auth

While SvelteKit Auth is still experimental, we’re excited about furthering the stability of the package and expanding Auth.js into other frontend frameworks besides Next.js.

We’d love to hear your feedback about which frameworks you’d like to see support for next. You can follow along with our progress on Twitter, or explore the new SvelteKit Auth package on GitHub. We’re actively working on new documentation as well.

Install `@auth/sveltekit` today and get started with our new [SvelteKit Auth Template](https://vercel.com/templates/svelte/sveltekit-authentication).

We’re incredibly thankful for the over 450 community contributors to NextAuth.js, including the core team of myself, Thang Vu, Nico Domino, Lluis Agusti, and Robert Soriano. We’d also like to thank Prisma, Clerk, Lowdefy, WorkOS, Checkly, Superblog, and others sponsoring NextAuth.js on OpenCollective. Finally, we’d like to thank the original creator of NextAuth.js, Ian Collins, for their work creating the base for all this innovation and Filip Skokan ([@panva](https://twitter.com/_panva)) for their outstanding work on open-source libraries.