---
title: "React Query and Forms"
source: "https://tkdodo.eu/blog/react-query-and-forms"
publishedDate: "2022-04-10"
category: "frontend"
feedName: "TkDodo"
---

![forms](https://tkdodo.eu/blog/static/abb0ae6d5ef4cc6197907dcd4bc6beda/bbe0c/forms.jpg "forms")

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
-   [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
-   [#8: Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)
-   [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/leveraging-the-query-function-context)
-   [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)
-   [#10: React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager)
-   [#11: React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling)
-   [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
-   [#13: Offline React Query](https://tkdodo.eu/blog/offline-react-query)
-   **#14: React Query and Forms**
-   [#15: React Query FAQs](https://tkdodo.eu/blog/react-query-fa-qs)
-   [#16: React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router)
-   [#17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache)
-   [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query)
-   [#19: Type-safe React Query](https://tkdodo.eu/blog/type-safe-react-query)
-   [#20: You Might Not Need React Query](https://tkdodo.eu/blog/you-might-not-need-react-query)
-   [#21: Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)
-   [#22: React Query and React Context](https://tkdodo.eu/blog/react-query-and-react-context)
-   [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://highjoon-dev.vercel.app/blogs/14-react-query-and-forms)
-   [Español](https://rubenvara.io/react-query/formularios-react-query)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

* * *

Forms are an important part in many web applications as the primary means to update data. We are using React Query not only to fetch data ([queries](https://tkdodo.eu/blog/react-query-as-a-state-manager)), but also to modify it ([mutations](https://tkdodo.eu/blog/mastering-mutations-in-react-query)), so we need to somehow integrate our beloved async state manager with forms.

The good news is that realistically, there isn't anything special about forms: It is still just a bunch of html elements that we render in order to display some data. However, as we'd also like to _change_ that data, the lines between what is Server State and what is Client State start to blur a bit, which is where the complexity might come in.

## Server State vs. Client State[](#server-state-vs-client-state)

To recap, _Server State_ is state that we do not own, that is mostly async and where we only see a snapshot of how the data looked like the last time we fetched it.

_Client State_ is state that the frontend has full control over, is mostly synchronous and where we know the accurate value of it at all times.

When we display a list of Persons, that is undoubtedly Server State. But what happens when we click on a Person to show their details in a Form with the intention of maybe updating some values? Does that Server State now become Client State? Is it a hybrid?

## The simple approach[](#the-simple-approach)

I have gone on the record already about how I am not a fan of copying state from one state manager to another, be it [putting props to state](https://tkdodo.eu/blog/putting-props-to-use-state) or copying state from [React Query to local state](https://tkdodo.eu/blog/practical-react-query#keep-server-and-client-state-separate).

I do think that forms can be an exception to this rule though, if you are doing it deliberately and know about the tradeoffs (everything is a tradeoff after all). When rendering our Person form, we very likely want to treat the Server State as _initial_ data only. We fetch the firstName and lastName, put it into the form state, and then let the user update it.

Let's take a look at an example:

simple-form

```
1function PersonDetail({ id }) {2  const { data } = useQuery({3    queryKey: ['person', id],4    queryFn: () => fetchPerson(id),5  })6  const { register, handleSubmit } = useForm()7  const { mutate } = useMutation({8    mutationFn: (values) => updatePerson(values),9  })10
11  if (data) {12    return (13      <form onSubmit={handleSubmit(mutate)}>14        <div>15          <label htmlFor="firstName">First Name</label>16          <input17            {...register('firstName')}18            defaultValue={data.firstName}19          />20        </div>21        <div>22          <label htmlFor="lastName">Last Name</label>23          <input24            {...register('lastName')}25            defaultValue={data.lastName}26          />27        </div>28        <input type="submit" />29      </form>30    )31  }32
33  return 'loading...'34}
```

This works incredibly well - so what are those tradeoffs?

### Data might be undefined[](#data-might-be-undefined)

You might know that `useForm` would also take defaultValues directly for the whole form, which would be pretty nice for larger forms. However, because we cannot call hooks conditionally, and because our `data` is `undefined` on the first render cycle (as we need to fetch it first), we cannot just do this in the same component:

no-default-values

```
1const { data } = useQuery({2  queryKey: ['person', id],3  queryFn: () => fetchPerson(id),4})5// 🚨 this will initialize our form with undefined6const { register, handleSubmit } = useForm({ defaultValues: data })
```

We'd have the same problem when copying into `useState`, or when using uncontrolled forms (which react-hook-form does under the hood by the way). The best solution to this would be to split up the form into its own component:

separate-form

```
1function PersonDetail({ id }) {2  const { data } = useQuery({3    queryKey: ['person', id],4    queryFn: () => fetchPerson(id),5  })6  const { mutate } = useMutation({7    mutationFn: (values) => updatePerson(values),8  })9
10  if (data) {11    return <PersonForm person={data} onSubmit={mutate} />12  }13
14  return 'loading...'15}16
17function PersonForm({ person, onSubmit }) {18  const { register, handleSubmit } = useForm({ defaultValues: person })19  return (20    <form onSubmit={handleSubmit(onSubmit)}>21      <div>22        <label htmlFor="firstName">First Name</label>23        <input {...register('firstName')} />24      </div>25      <div>26        <label htmlFor="lastName">Last Name</label>27        <input {...register('lastName')} />28      </div>29      <input type="submit" />30    </form>31  )32}
```

This is not too bad, as it separates our data fetching from the presentation. I'm personally not a big fan of such a split, but it does get the job done here.

### No background updates[](#no-background-updates)

React Query is all about keeping your UI up-to-date with Server State. As soon as we copy that state somewhere else, React Query cannot do its job anymore. if a background refetch happens for whatever reason, and it yields new data, our form state will not update with it. This is likely not problematic if we are the only one working on that form state (like a form for our profile page). If that's the case, we should likely at least disable background updates by setting a higher `staleTime` on our query. After all, why would we keep querying our server if the updates will not be reflected on the screen?

no-background-updates

```
1// ✅ opt out of background updates2const { data } = useQuery({3  queryKey: ['person', id],4  queryFn: () => fetchPerson(id),5  staleTime: Infinity,6})
```

* * *

This approach can get problematic on bigger forms and in collaborative environments. The bigger the form, the longer it takes our users to fill it out. If multiple people work on the same form, but on different fields, whoever updates last might override the values that others have changed, because they still see a partially outdated version on their screen.

Now react hook form allows you to detect which fields have been changed by the user and only send "dirty" fields to the server with some user land code (see [the example here](https://codesandbox.io/s/react-hook-form-submit-only-dirty-fields-ol5d2)), which is pretty cool. However, this still doesn't show the latest values with updates made by other users to you. Maybe you would change your input had you known that a certain field was changed in the meantime by someone else.

So what would we need to do to still reflect background updates while we are editing our form?

## Keeping background updates on[](#keeping-background-updates-on)

One approach is to rigorously separate the states. We'll keep the Server State in React Query, and only track the changes the user has made with our Client State. The source of truth that we display then to our users is _derived state_ from those two: If the user has changed a field, we show the Client State. If not, we fall back to the Server State:

separate-states

```
1function PersonDetail({ id }) {2  const { data } = useQuery({3    queryKey: ['person', id],4    queryFn: () => fetchPerson(id),5  })6  const { control, handleSubmit } = useForm()7  const { mutate } = useMutation({8    mutationFn: (values) => updatePerson(values),9  })10
11  if (data) {12    return (13      <form onSubmit={handleSubmit(mutate)}>14        <div>15          <label htmlFor="firstName">First Name</label>16          <Controller17            name="firstName"18            control={control}19            render={({ field }) => (20              // ✅ derive state from field value (client state)21              // and data (server state)22              <input23                {...field}24                value={field.value ?? data.firstName}25              />26            )}27          />28        </div>29        <div>30          <label htmlFor="lastName">Last Name</label>31          <Controller32            name="lastName"33            control={control}34            render={({ field }) => (35              <input36                {...field}37                value={field.value ?? data.lastName}38              />39            )}40          />41        </div>42        <input type="submit" />43      </form>44    )45  }46
47  return 'loading...'48}
```

With that approach, we can keep background updates on, because it will still be relevant for untouched fields. We are no longer bound to the initialState that we had when we first rendered the form. As always, there are caveats here as well:

### You need controlled fields[](#you-need-controlled-fields)

As far as I'm aware, there is no good way to achieve this with uncontrolled fields, which is why I've resorted to using controlled fields in the above example. Please let me know if I'm missing something.

### Deriving state might be difficult[](#deriving-state-might-be-difficult)

This approach works best for shallow forms, where you can easily fall back to the Server State using nullish coalesce, but it could be more difficult to merge properly with nested objects. It might also sometimes be a questionable user experience to just change form values in the background. A better idea might be to just highlight values that are out of sync with the Server State and let the user decide what to do.

* * *

Whichever way you choose, try to be aware of the advantages / disadvantages that each approach brings.

## Tips and Tricks[](#tips-and-tricks)

Apart from those two principal ways of setting up your form, here are some smaller, but nonetheless important tricks to integrate React Query with forms:

### Double submit prevention[](#double-submit-prevention)

To prevent a form from being submitted twice, you can use the `isLoading` prop returned from `useMutation`, as it will be true for as long as our mutation is running. To disable the form itself, all you need to do is to disable the primary submit button:

disabled-submit

```
1const { mutate, isLoading } = useMutation({2  mutationFn: (values) => updatePerson(values)3})4<input type="submit" disabled={isLoading} />
```

### Invalidate and reset after mutation[](#invalidate-and-reset-after-mutation)

If you do not redirect to a different page right after the form submission, it might be a good idea to reset the form _after_ the invalidation has completed. As described in [Mastering Mutations](https://tkdodo.eu/blog/mastering-mutations-in-react-query#some-callbacks-might-not-fire), you'd likely want to do that in the `onSuccess` callback of `mutate`. This also works best if you keep state seperated, as you only need to reset to `undefined` in order for the server state to be picked up again:

reset-form

```
1function PersonDetail({ id }) {2  const queryClient = useQueryClient()3  const { data } = useQuery({4    queryKey: ['person', id],5    queryFn: () => fetchPerson(id),6  })7  const { control, handleSubmit, reset } = useForm()8  const { mutate } = useMutation({9    mutationFn: updatePerson,10    // ✅ return Promise from invalidation11    // so that it will be awaited12    onSuccess: () =>13      queryClient.invalidateQueries({ queryKey: ['person', id] }),14  })15
16  if (data) {17    return (18      <form19        onSubmit={handleSubmit((values) =>20          // ✅ reset client state back to undefined21          mutate(values, { onSuccess: () => reset() })22        )}23      >24        <div>25          <label htmlFor="firstName">First Name</label>26          <Controller27            name="firstName"28            control={control}29            render={({ field }) => (30              <input31                {...field}32                value={field.value ?? data.firstName}33              />34            )}35          />36        </div>37        <input type="submit" />38      </form>39    )40  }41
42  return 'loading...'43}
```

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)