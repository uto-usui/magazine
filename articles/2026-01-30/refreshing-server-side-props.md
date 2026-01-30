---
title: "Refreshing Server-Side Props"
source: "https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/"
publishedDate: "2020-12-14"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

In a Next.js application I'm working on, I have an "admin" page, which lets me manage registered users:

![A screenshot of a dashboard table, filled with users and their information (emails, purchases). Includes an “edit” button for each user as well.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Frefreshing-server-side-props%2Fuser-table.png&w=1920&q=75)

One of my favourite features about Next.js is that individual routes can opt-in to server-side rendering. While I tend to be a [pretty big advocate](https://www.joshwcomeau.com/gatsby/a-static-future/) for static generation, this is a _perfect_ use-case for server-side rendering; I can fetch and inject the database data on first render, simplifying my front-end code.

At least, _that's what I thought_… And then I hit a snag. 😬

Here's my problem: in my dashboard, I'm able to edit users, to bestow purchases or update their name:

Notice how the updated name isn't shown in the table? This is because the page _doesn't know_ that the underlying data has changed. After the page is server-rendered, those props are immutable.

How do we tell Next.js to re-fetch the data, on demand, without doing a hard refresh of the whole page?

In this short tutorial, I'll share the Nifty Trick I learned to solve this problem. We'll also learn how Next.js works under-the-hood, and cover a couple related problems + solutions.

Allons-y!French for “Let's go!”

## [Link to this heading](#the-solution-1)The solution

Here's the solution, for busy beavers looking for a copy-paste win:

```
import { useRouter } from 'next/router';

function SomePage(props) {
  const router = useRouter();

  // Call this function whenever you want to refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  }
}

export async function getServerSideProps(context) {
  // Database logic here
}
```

The `refreshData` function would be called whenever you want to pull new data from the backend. It'll vary based on your usecase. As an example, here's how you'd refresh the data right after modifying a user:

```
async function handleSubmit() {
  const userData = /* create an object from the form */

  const res = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });

  // Check that our status code is in the 200s,
  // meaning the request was successful.
  if (res.status < 300) {
    refreshData();
  }
}
```

But why does this work? Why are we involving the router in this process, and what the heck is it doing?

In fact, this solution requires a bit of context-setting. Let's talk a bit about how server-rendered routes have a secret alter-ego 🦸🏾‍♀️

## [Link to this heading](#why-it-works-2)Why it works

When we think about `getServerSideProps`, we typically imagine a flow that looks like this:

-   User follows a link from Google (or wherever) to our site.
    
-   Next.js calls our `getServerSideProps` method, and uses it to generate an HTML file.
    
-   The user receives that HTML file, and React hydrates on the client.
    

(If you're not sure what I mean by “React hydrates”, I wrote a [blog post about hydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)!)

This is the meat-and-potatoes of Next.js server routes. This is the clerical work that Clark Kent does in his day-job.

But there's another way that Next.js uses your `getServerSideProps`—from the client.

Consider a different scenario:

-   User is already on your site, and they click a Next.js `Link` to navigate to the server-rendered page.
    
-   Next.js calls your `getServerSideProps` method on the server, but instead of generating an HTML file, it sends the data _as JSON_ to the client.
    
-   React uses that data as the initial props when rendering the new page, in-browser.
    

One of the things that makes Next.js so cool is that the server-rendering code can _also_ be used as a sort-of API. We can have lightning-quick client-side routing with Next because your server-rendered routes can hop into a phone booth, spin into a costume, and become an API endpoint. Server-render by day, JSON-sender by night.

Our solution works because we're **performing a client-side transition to the same route.** `router.asPath` is a reference to the current path. If we're on `/admin-panel`, we're telling Next to do a client-side redirect to `/admin-panel`, which causes it to re-fetch the data as JSON, and pass it to the current page as props. 🧨

If you're wondering about `router.replace`: it's like `router.push`, but it doesn't add an item to the history stack. We don't want this to "count" as a redirect, so that the browser's "Back" button still works as we intend.

In short: Next.js doesn't have a "refetchProps" method, but we can leverage the client-side navigation behaviour to achieve the same goal. 💯

## [Link to this heading](#loading-state-3)Loading state

When you call this method, there will be no indication in your UI that a re-fetch is happening. This is fine in some cases, but we can't assume a fast network; even if your `getServerSideProps` call is Blazing Fast™, a user in the woods with 1 bar of 3G will still be stuck waiting for a hot minute.

We need a loading state! Here's how we can create one:

```
function SomePage({ theData }) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [theData]);
}
```

We have a new React state variable, `isRefreshing`. We set it to `true` when we make the request, and it gets set back to `false` when the component re-renders with the new data.

Instead of firing on every single render, we put it in an effect hook, and track our `theData` prop (`theData` is a placeholder for whatever your server data looks like). When the server returns fresh data, the hook will fire, and our loading state will terminate. And it protects us against "incidental" renders, if some other bit of state happens to change while we're waiting for data.

Here's what this looks like. Keep an eye on the top-right corner to see the loading indicator:

## [Link to this heading](#mutating-data-4)Mutating data

In my admin-dashboard case, I don't need to make any "special" modifications to the server-rendered data. A straightforward refresh is all I'm looking for.

But what if I wanted to _change the data_ in some way? Maybe I want to do an "optimistic update", to show the data in its new state _before_ the server has confirmed it?

In this case, we'd have to transfer the props into state, so that it could be mutated like any other React state:

```
function SomePage({ initialData }) {
  const [theData, setTheData] = React.useState(initialData);

  // Mutate whenever you want with `setTheData`!
}
```

Now, you may be thinking: isn't copying props into state an anti-pattern? Don't the React docs tell us not to do this exact thing?

Not exactly. The thing we want to avoid is duplicating the source of truth. If _multiple components_ define the same bit of state, that's usually a sign of a problem.

In this case, we only have a single source of truth, and it's at the very top of our React tree. This smells like Spring Breeze fabric softener to me. A code scent, not a code smell.

It's recommended to prefix the prop with `initial` (eg. `initialUsers` instead of `users`), so that it's clear that the props serve as an initial value, and not a continued source of truth.

## [Link to this heading](#alternatives-5)Alternatives

Before I discovered the router-refresh trick, my game-plan looked something like this:

1.  Pull the database calls out of `getServerSideProps` and into a function, `getUsers`. Call that function in `getServerSideProps`.
    

3.  In the page component, use a library like [SWR(opens in new tab)](https://swr.vercel.app/) to track the data. It'll be initialized from the server-side props, but connect to the new API route for subsequent data-fetches.
    
4.  Use SWR to mutate the data as needed.
    

This path felt terribly overengineered for me, in my specific situation; I didn't want to have two separate mechanisms for fetching users! And while `SWR` is a great library—I'm using it in my app to manage authentication—it feels a bit heavy in this situation.

But, in other situations, I think that this would be the right approach. For example, if you have complex data-fetching or data-mutating requirements, or if you already have an API you could interact with directly on the client.

## [Link to this heading](#wrapping-up-6)Wrapping up

This is my very-first tutorial on Next.js! 🍾

I've been using Next.js to build a custom platform for my upcoming course, [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/). It's a course specifically for JS developers who struggle with CSS. I know from experience that CSS becomes _a lot_ more fun once you get comfortable with it, and being able to switch effortlessly between JS and CSS is absolutely wonderful. Follow the link to learn more!

Special thanks to [Brandon(opens in new tab)](https://www.flightcontrol.dev/) for the router-based solution! Brandon's working on Blitz.js, an exciting framework built on top of Next.js that aims to recreate the Rails experience, and I'm super excited to see where it goes 💯

### Last updated on

November 17th, 2024