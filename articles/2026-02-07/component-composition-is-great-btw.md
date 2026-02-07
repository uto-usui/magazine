---
title: "Component Composition is great btw"
source: "https://tkdodo.eu/blog/component-composition-is-great-btw"
publishedDate: "2024-09-21"
category: "frontend"
feedName: "TkDodo"
---

![blue and yellow lego blocks](https://tkdodo.eu/blog/static/6430e5600316a0a9c9d3750b74aff236/bbe0c/lego.jpg "blue and yellow lego blocks")

-   [한국어](https://wonderwalls.tistory.com/entry/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%95%A9%EC%84%B1%EC%9D%80-%ED%9B%8C%EB%A3%A1%ED%95%A9%EB%8B%88%EB%8B%A4-%EA%B7%B8%EB%9F%B0%EB%8D%B0)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

When I first learned about React, I heard about all of its advantages: Virtual DOM is super fast, one-way data flow is very predictable, and JSX is ... an interesting way to put markup into JavaScript.

But the biggest advantage of React is one I only got to appreciate over time: The ability to compose components together into more components.

It's easy to miss this advantage if you've always been used to it. Believe it or not, grouping component logic, styles and markup together into a single component was considered blasphemy about a decade ago.

??? wHaT AbOuT sEpArAtIoN oF cOnCeRnS ???

Well yes, we still separate concerns, just differently (and arguably better) than before. This graphic, which I first saw in Max's tweet, summarizes it very well:

[

![Avatar for mxstbr](https://tkdodo.eu/blog/static/5f9df292a373f168890d65bb92ddf52f/47930/mxstbr.jpg)

Max Stoiber

@

mxstbr

Separation of concerns still exists, the question is just: where do you separate? Should the boundary really be the programming language we write in?

(attached graphic courtesy of @areaweb)

![Cynics vs Builders](https://tkdodo.eu/blog/static/ee5944407129bfa5dcbe55c8e36b6496/669f3/separation_of_concerns.jpg)

\-

May 7, 2018



](https://x.com/mxstbr/status/993455977008594944)

It's all about code cohesion. The styles of a button, the logic that happens when a button is clicked and the markup of a button naturally belong together to form that button. It's a much better grouping than "here are all your styles of all your application in a single layer".

It took us some time to really appreciate this "thinking in components", and I think it's still hard to sometimes find out where those boundaries are. The "new" react docs have a great section about [Thinking in React](https://react.dev/learn/thinking-in-react), where they highlight that the first step should always be to break the UI into a component hierarchy.

I don't think we do this enough, which is why many applications stop with component composition at a certain point and continue with it's natural enemy: conditional rendering.

## Conditional rendering[](#conditional-rendering)

Inside JSX, we can conditionally render other components. This is nothing new, and it's also not terrible or evil by itself. Consider the following component that renders a shopping list and optionally adds some user information about the person that's assigned to the list:

conditional-rendering

```
1export function ShoppingList(props: {2  content: ShoppingList3  assignee?: User4}) {5  return (6    <Card>7      <CardHeading>Welcome 👋</CardHeading>8      <CardContent>9        {props.assignee ? <UserInfo {...props.assignee} /> : null}10        {props.content.map((item) => (11          <ShoppingItem key={item.id} {...item} />12        ))}13      </CardContent>14    </Card>15  )16}
```

I would say this is perfectly fine. If the shopping list isn't assigned to anyone, we'll just leave out that part of our rendering. So where's the problem?

## Rendering multiple states conditionally[](#rendering-multiple-states-conditionally)

I think conditional rendering inside JSX starts to become a problem when we use it for rendering different states of a component. Suppose we refactor this component to become self contained by reading the shopping list data directly from a query:

self-contained-component

```
1export function ShoppingList() {2  const { data, isPending } = useQuery(/* ... */)3
4  return (5    <Card>6      <CardHeading>Welcome 👋</CardHeading>7      <CardContent>8        {data?.assignee ? <UserInfo {...data.assignee} /> : null}9        {isPending ? <Skeleton /> : null}10        {data11          ? data.content.map((item) => (12              <ShoppingItem key={item.id} {...item} />13            ))14          : null}15      </CardContent>16    </Card>17  )18}
```

Self contained components are great because you can freely move them around in your application, and they will just read their own requirements, like in this case, a query. This inlined condition seems okay (it's not), as we basically want to render a `Skeleton` instead of `data`.

## Evolving the component[](#evolving-the-component)

One problem here is that this component just doesn't evolve very well. Yes, we can't see in the future, but making the most common thing (adding more functionality) simple to do is a very good idea.

So let's add another state - if no `data` comes back from the API call, we'd want to render a special `<EmptyScreen />`. Shouldn't be hard to change the existing condition:

empty-screen

```
1export function ShoppingList() {2  const { data, isPending } = useQuery(/* ... */)3
4  return (5    <Card>6      <CardHeading>Welcome 👋</CardHeading>7      <CardContent>8        {data?.assignee ? <UserInfo {...data.assignee} /> : null}9        {isPending ? <Skeleton /> : null}10        {data ? (11          data.content.map((item) => (12            <ShoppingItem key={item.id} {...item} />13          ))14        ) : (15          <EmptyScreen />16        )}17      </CardContent>18    </Card>19  )20}
```

Of course you'll quickly spot the bug 🐞 we've just introduced: This will show the `<EmptyScreen />` when we are in `pending` state, too, because in that state, we also have no data. Easily fixable by adding another condition instead:

"fixed"-condition

```
1export function ShoppingList() {2  const { data, isPending } = useQuery(/* ... */)3
4  return (5    <Card>6      <CardHeading>Welcome 👋</CardHeading>7      <CardContent>8        {data?.assignee ? <UserInfo {...data.assignee} /> : null}9        {isPending ? <Skeleton /> : null}10        {!data && !isPending ? <EmptyScreen /> : null}11        {data12          ? data.content.map((item) => (13              <ShoppingItem key={item.id} {...item} />14            ))15          : null}16      </CardContent>17    </Card>18  )19}
```

But is this still "one component"? Is this easy to read? There are so many question marks and exclamation marks in this markup it makes my brain hurt a bit. [Cognitive Load is what matters](https://github.com/zakirullin/cognitive-load). I can't easily see what the user will see on their screen if they are in `pending` state, or if they are in `empty` state, because I'd have to parse all these conditions first.

I'm not even talking about adding another state here, because it should be clear that we would have to (mentally) go through each step and check if we would want to render this part in that new state as well.

## Back to the drawing board[](#back-to-the-drawing-board)

At this point, I would suggest to listen to the React docs and break down what the user actually sees on the screen into boxes. It might give us a clue about what is related enough to become it's own component:

![a pending, a data and an empty state, each sharing a common layout (red) with different content (blue)](https://tkdodo.eu/blog/static/6248363a9b84323844515d6b37176526/7d769/three-states.png "a pending, a data and an empty state, each sharing a common layout (red) with different content (blue)")

In all three states, we want to render a shared "layout" - the red part. That's why we made our component in the first place - because we have some common parts to render. The blue stuff is what's different between the three states. So how would a refactoring look like if we'd extract the red parts to their own layout component that accepts dynamic `children`:

layout-component

```
1function Layout(props: { children: ReactNode }) {2  return (3    <Card>4      <CardHeading>Welcome 👋</CardHeading>5      <CardContent>{props.children}</CardContent>6    </Card>7  )8}9
10export function ShoppingList() {11  const { data, isPending } = useQuery(/* ... */)12
13  return (14    <Layout>15      {data?.assignee ? <UserInfo {...data.assignee} /> : null}16      {isPending ? <Skeleton /> : null}17      {!data && !isPending ? <EmptyScreen /> : null}18      {data19        ? data.content.map((item) => (20            <ShoppingItem key={item.id} {...item} />21          ))22        : null}23    </Layout>24  )25}
```

That's ... confusing. 🫤 We seemingly haven't achieved anything - this isn't really better. We still have the same conditional mess as before. So where am I going with this?

## Early returns to the rescue[](#early-returns-to-the-rescue)

Let's also think about why we added all these conditions in the first place 🤔. It's because we are inside JSX, and inside JSX, we can only write expressions, not statements.

But now, we don't have to be inside JSX anymore. The only JSX we have is a single call to `<Layout>`. We could just duplicate that and use early returns instead:

early-returns

```
1function Layout(props: { children: ReactNode }) {2  return (3    <Card>4      <CardHeading>Welcome 👋</CardHeading>5      <CardContent>{props.children}</CardContent>6    </Card>7  )8}9
10export function ShoppingList() {11  const { data, isPending } = useQuery(/* ... */)12
13  if (isPending) {14    return (15      <Layout>16        <Skeleton />17      </Layout>18    )19  }20
21  if (!data) {22    return (23      <Layout>24        <EmptyScreen />25      </Layout>26    )27  }28
29  return (30    <Layout>31      {data.assignee ? <UserInfo {...data.assignee} /> : null}32      {data.content.map((item) => (33        <ShoppingItem key={item.id} {...item} />34      ))}35    </Layout>36  )37}
```

Early returns are great for representing different states of a component because they can achieve a couple of things for us:

### Reduced cognitive load[](#reduced-cognitive-load)

They show a clear path for developers to follow. Nothing is nested. Like `async/await`, it becomes easier to reason about when reading top-down. Every if statement with a return represents one state the user can see. Notice how we've also moved the `data.assignee` check into the last branch. That's because it's the only one where we actually want to render the `UserInfo`. That wasn't clear in the previous version.

### Easy to extend[](#easy-to-extend)

We can now also add more conditions, like error handling, without having to fear that we're breaking other states. It becomes as simple as dropping another if statement into our code.

### Better type inference[](#better-type-inference)

Notice how the last check for `data` is just gone? That's because TypeScript knows that `data` must be defined after we've handled the `if (!data)` case. TypeScript can't help us if we only conditionally render something.

## Layout duplication[](#layout-duplication)

I know some people are concerned about the duplication of rendering the `<Layout>` component in each branch. I think they are focusing on the wrong thing. The duplication is not only fine, it will also help the component evolve better in case there might be a slight differentiation. For example, let's add a `title` property from our `data` to the heading:

layout-with-props

```
1function Layout(props: { children: ReactNode; title?: string }) {2  return (3    <Card>4      <CardHeading>Welcome 👋 {props.title}</CardHeading>5      <CardContent>{props.children}</CardContent>6    </Card>7  )8}9
10export function ShoppingList() {11  const { data, isPending } = useQuery(/* ... */)12
13  if (isPending) {14    return (15      <Layout>16        <Skeleton />17      </Layout>18    )19  }20
21  if (!data) {22    return (23      <Layout>24        <EmptyScreen />25      </Layout>26    )27  }28
29  return (30    <Layout title={data.title}>31      {data.assignee ? <UserInfo {...data.assignee} /> : null}32      {data.content.map((item) => (33        <ShoppingItem key={item.id} {...item} />34      ))}35    </Layout>36  )37}
```

This would've been another top-level condition to mentally parse in the old version. Just note that adding more conditions to the `Layout` component might indicate that it's [the wrong abstraction](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase). At this point, it's probably best to go to the drawing board again.

## Learnings[](#learnings)

Maybe this post is more about early returns than it is about component composition. I think it's about both. In any case, it's about avoiding conditional renderings for mutually exclusive states. We can't do that without component composition, so make sure to not skip the drawing board. It's your best friend.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)