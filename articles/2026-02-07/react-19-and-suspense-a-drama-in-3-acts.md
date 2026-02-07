---
title: "React 19 and Suspense - A Drama in 3 Acts"
source: "https://tkdodo.eu/blog/react-19-and-suspense-a-drama-in-3-acts"
publishedDate: "2024-06-16"
category: "frontend"
feedName: "TkDodo"
---

![Silhouette of person under gray sky](https://tkdodo.eu/blog/static/48dd4606ca72cb77fe07b195f669f71c/bbe0c/suspense.jpg "Silhouette of person under gray sky")

-   [한국어](https://velog.io/@cnsrn1874/react-19-and-suspense-a-drama-in-3-acts)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

That was quite a roller-coaster last week 🎢. Some things unravelled, some things went down, and in the middle of it: [React Summit](https://reactsummit.com/), the biggest React conference in the world.

Let me try to break down what happened, in hopefully the right order, and what we can all learn from it. To do that, we have to go back to April this year:

## First Act: React 19 Release Candidate[](#first-act-react-19-release-candidate)

The 25th of April was a great day: React announced the [React 19 RC](https://react.dev/blog/2024/04/25/react-19) - a release specifically for collecting feedback and preparing libraries for the next major version of React.

I was really excited - there are so many good things in that release. From the new hooks to the `use` operator, from server actions to the `ref` prop. From better hydration errors to cleanup functions for refs. From better `useRef` types to `useLayoutEffect` finally not warning anymore on the server. And of course: The experimental React Compiler. 🚀

This release is packed with goodies, and I was excited to upgrade React Query to see if there were any problems. I was quite busy at the time with work and finishing the [🔮 query.gg](https://query.gg/?s=dom) course, but about a month later, we released v5.39.0, which is compatible with React 19:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

React Query 🤝 React 19

github.com/TanStack/query...

Someone please try out the react compiler on an example and report back. I've enabled the eslint-plugin-react-compiler and it didn't report anything suspicious. I hope that means we play by the rules 😂

![New Release v5.39.0](https://tkdodo.eu/blog/static/676e086acaea2e0d7e5e9a3bdaa141e3/e7a77/v5390.jpg)

\-

May 25, 2024



](https://x.com/TkDodo/status/1794442417195594233)

There weren't really any issues to dig into, so I thought this release was on track to become the best React release since hooks were introduced. That is, until we noticed something weird with suspense.

## Second Act: Uncovering Suspense[](#second-act-uncovering-suspense)

Full disclosure upfront: I wasn't the first to discover this. Shout out to [Gabriel Valfridsson](https://x.com/GabbeV_) who (to the best of my knowledge) first spotted the new behaviour one day after the RC announcement:

[

![Avatar for GabbeV_](https://tkdodo.eu/blog/static/06434dea5653107afb854180a6aacc05/47930/GabbeV_.jpg)

Gabriel Valfridsson

@

GabbeV\_

A ton of great changes! 🥳

However this change probably deserve a bigger disclaimer.  
https://github.com/facebook/react...

Code using suspense with libraries like react-query will get waterfalls where loading previously happened in parallel.  
https://codesandbox.io/p/devbox/react...  
https://codesandbox.io/p/devbox/react...

\-

Apr 26, 2024



](https://x.com/GabbeV_/status/1783623489351553366)

It's funny because I saw the tweet, and even commented on it, but didn't think too much of it at the time. As I said, I was quite busy and planned to look into React 19 later.

So after the React 19 upgrade in React Query itself, I continued working on the suspense lesson of the course. We have one example in there where we're showing how to reveal content at the same time, but still have all requests fetch in parallel. As shown in the [react docs](https://react.dev/reference/react/Suspense#revealing-content-together-at-once), we can achieve this by putting both components as siblings into the same suspense boundary. The example looks roughly like this:

suspense-with-two-children

```
1export default function App() {2  return (3    <Suspense fallback={<p>...</p>}>4      <RepoData name="tanstack/query" />5      <RepoData name="tanstack/table" />6    </Suspense>7  )8}
```

The way this works is that React sees that the first child will suspend, so it knows that it has to show the `fallback`. However, it still continues to render other siblings in case they will also suspend, so that it can "collect" all promises.

This is a pretty great feature because it means if each sibling triggers anything async, we can compose our components in a way that they will still fetch in parallel while not triggering a 🍿 "popcorn UI" 🍿 where multiple parts of the screen pop in one after the other.

A more complete example might look something like this:

app-with-suspense

```
1export default function App() {2  return (3    <Suspense fallback={<p>...</p>}>4      <Header />5      <Navbar />6      <main>7        <Content />8      </main>9      <Footer />10    </Suspense>11  )12}
```

Some or all of those components can initiate critical data fetching, and we'll get our UI displayed at once when those fetches have resolved.

Another advantage is that we can add fetches later without having to think about how pending states will be handled. The `<Footer />` component might not fetch data now, but if we add it later, it will just work. And if we deem data as non-critical, we can always wrap our component in it's own suspense boundary:

nested-suspense

```
1export default function App() {2  return (3    <Suspense fallback={<p>...</p>}>4      <Header />5      <Navbar />6      <main>7        <Content />8      </main>9      <Suspense fallback={<p>...</p>}>10        <Footer />11      </Suspense>12    </Suspense>13  )14}
```

Now fetching data in our footer will not block rendering the main content. This is pretty powerful and aligned with how React favors component composition above anything else.

* * *

I vaguely remembered seeing something on twitter about suspense having a different behaviour in React 19, so just to be sure, I wanted to try out what we have in the course with the new RC release. And, to my surprise, it behaved completely differently: Instead of fetching data for both siblings in parallel, it now created a waterfall. 💦

I was so surprised by this behaviour that I did the only thing I could think of at that moment - I jumped on twitter and tagged some react core team members:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

Am I imagining things or is there a difference between React 18 and 19 in terms of how Suspense handles parallel fetching? In 18, there is a "per component" split, so putting two components into the same Suspense Boundary, where each was doing a fetch, was still firing them in parallel:

This fires two queries, in parallel, waits until both are resolved and then shows the whole sub-tree.

In React 19, as far as I can see, the queries run in a waterfall now. I think I remember @rickhanlonii mentioning something like this but I can't find any evidence now.

/cc @acdlite @dan\_abramov2

\-

Jun 11, 2024



](https://x.com/TkDodo/status/1800501040766144676)

Needless to say, this tweet took off and started a somewhat heated twitter discussion. We soon found out that this was not a bug, but an intentional change, which led to quite some outrage.

### Why would they do that?[](#why-would-they-do-that)

There are of course reasons why this change was made, and, oddly enough, they are meant as a performance improvement for some situations. Continuing to render siblings of a component that has already suspended is not for free, and it will block showing the fallback. Consider the following example:

expensive-sibling

```
1export default function App() {2  return (3    <Suspense fallback={<p>...</p>}>4      <SuspendingComponent />5      <ExpensiveComponent />6    </Suspense>7  )8}
```

Let's assume that `<ExpensiveComponent />` takes some time to render, e.g. because it is a huge sub-tree, but does not suspend itself. Now when react renders this tree, it will see that `<SuspendingComponent />` suspends, so the only thing it will need to display eventually is the suspense fallback. However, it can only do that when rendering has finished, so it has to wait until `<ExpensiveComponent />` is done rendering. Even more - the render result of `<ExpensiveComponent />` will be thrown away, because the fallback has to be displayed.

When we think about it this way - pre-rending the siblings of a suspended component is pure overhead, as it will never amount to a meaningful output. So React 19 removed that to get instant loading states.

Of course, if you suspend instantly, you can't see that the siblings will also suspend, so if those siblings were to initiate data fetches (e.g. with `useSuspenseQuery`), they will now waterfall. And that's where the controversy comes in.

### Fetch-on-render vs. Render-as-you-fetch[](#fetch-on-render-vs-render-as-you-fetch)

Having a component initiate a fetch is usually called fetch-on-render. It's the approach most of us likely use on a daily basis, but it's not the best thing you can do. Even when siblings inside the same suspense boundary are pre-rendered in parallel, you would not be able to avoid the waterfall if you have two `useSuspenseQuery` calls within the same react component, or if you had a parent-child relationship between components.

That is why the recommended approach by the react team is to initiate fetches earlier, e.g. in route loaders or in server components, and to have suspense only consume the resource rather than initiate the promise itself. This is usually called render-as-you-fetch.

For example, with TanStack Router and TanStack Query, the example could look like this:

prefetch-in-route-loader

```
1export const Route = createFileRoute('/')({2  loader: ({ context: { queryClient } }) => {3    queryClient.ensureQueryData(repoOptions('tanstack/query'))4    queryClient.ensureQueryData(repoOptions('tanstack/table'))5  },6  component: () => (7    <Suspense fallback={<p>...</p>}>8      <RepoData name="tanstack/query" />9      <RepoData name="tanstack/table" />10    </Suspense>11  ),12})
```

Here, the route loader makes sure that the fetches for both queries are initiated _before_ the component is rendered. So when react starts to render the suspense children, it doesn't matter if it renders the second `RepoData` component or not, because it wouldn't trigger a fetch - it would just consume the already running promise. In this situation, React 19 would make our app slightly faster because it would have to do less work without any drawbacks.

### Not everything is a fetch[](#not-everything-is-a-fetch)

Hoisting your data requirements is a good idea regardless of how suspense works, and I also recommend doing that. However, with the proposed React 19 changes, it becomes almost mandatory to do so.

Further, if learned anything from React Query, it's that not every async operation is a fetch. For example, using `React.lazy` for code-splitting would also mean that bundles are loaded in serial if your App looks like this:

react.lazy

```
1const Header = lazy(() => import('./Header.tsx'))2const Navbar = lazy(() => import('./Navbar.tsx'))3const Content = lazy(() => import('./Content.tsx'))4const Footer = lazy(() => import('./Footer.tsx'))5
6export default function App() {7  return (8    <Suspense fallback={<p>...</p>}>9      <Header />10      <Navbar />11      <main>12        <Content />13      </main>14      <Footer />15    </Suspense>16  )17}
```

Yes, you can technically preload dynamic imports as well, but making this required for good performance kind of defeats the purpose of react suspense and component composition, as the `App` component would need to know everything async that goes on in any of its children.

## Third Act: Escalation and Delaying the Release[](#third-act-escalation-and-delaying-the-release)

By now, a lot of people on the internet were surprised about and afraid of those changes. [Screenshots](https://github.com/facebook/react/pull/26380#issuecomment-2166178673) were shared about how apps that fetched almost everything in parallel in 18 resulted in a total waterfall in 19. The developers behind the [Poimandres open source developer collective](https://github.com/pmndrs), which maintains [react-three-fiber](https://github.com/pmndrs/react-three-fiber), were a bit freaked out because a lot of what react-three-fiber is doing is based on async work and leverages how suspense works today. This went so far that even forking react was up for discussion if the change actually made it into v19.

By that time, I was already in Amsterdam for [ReactSummit](https://reactsummit.com/). We were talking about this change at the React Ecosystem Contributors Summit, where everyone was either surprised, concerned or frustrated. The React core team was doubling down, explaining how this change [is the better tradeoff](https://x.com/rickhanlonii/status/1800894630952894521) and raises the ceiling, how we should hoist data requirements anyways, and that official suspense support on the client [was never released](https://x.com/sebmarkbage/status/1801258093327593717) (which, even if true, everyone I know misunderstood).

* * *

Later that evening, I had the chance to talk to [Sathya Gunasekaran](https://bsky.app/profile/gsathya.bsky.social), who worked on the react compiler and v19:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

Had a great discussion with @\_gsathya about React19, the suspense changes and the react compiler. I felt like my concerns were truly heard and the feedback appreciated, so thank you for that 🙏

![Sathya and me](https://tkdodo.eu/blog/static/8e2f4f76eee90781669b58effdc163a3/863ef/GP-724-X0AAN_NK.jpg)

\-

Jun 13, 2024



](https://x.com/TkDodo/status/1801364944111153388)

He ensured me that the react team cares a lot about the community and that they likely underestimated how the change influences client side suspense interactions.

On the next day, the react team met and decided to hold the release:

[

![Avatar for sophiebits](https://tkdodo.eu/blog/static/3e07290a2f8fabdfcd15e904b931a61f/47930/sophiebits.jpg)

sophie alpert

@

AvatarSophiebits

good news re Suspense, just met w/ @rickhanlonii @en\_JS @acdlite  
\* we care a lot about SPAs, team misjudged how many people rely on this today  
\* still recommend preloading but recognize not always practical  
\* we plan to hold the 19.0 release until we find a good fix

\-

Jun 14, 2024



](https://x.com/AvatarSophiebits/status/1801663976973209620)

It's very reassuring that the react team is open to feedback at this stage. Postponing a release that was already announced and presented at a conference is a big move - one that everyone involved really appreciated. I'll gladly work with the react team as best I can to find good compromise in that matter.

## Learnings[](#learnings)

There are a couple of things I learned from all of this. For one, trying out early releases before they come out as a final version is a very good idea, especially if the team is ready to take feedback and act on it. Kudos to the react team - I just really wish I would've given that feedback earlier.

The other thing that became obvious to me and other maintainers is that we need a better channel to communicate with the react team. The [React 18 Working Group](https://github.com/reactwg/react-18) was probably the best thing we had in this regard, and this whole saga shows that having something similar for React 19 (and future react releases) would be great. Something like a permanent working group maybe?

Also, obvious but worth mentioning: shouting at each other on twitter is not helpful. I regret the part I took in any communication that wasn't calm and objective, and I really appreciate Sophie's way of communicating and handling things. 🙏

Like so many others before me have figured out: interactions in person are always so much better, and I'm looking forward to having more great conversations at conferences. 🎉

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)