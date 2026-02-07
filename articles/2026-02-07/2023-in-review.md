---
title: "2023 in Review"
source: "https://tkdodo.eu/blog/2023-in-review"
publishedDate: "2023-12-30"
category: "frontend"
feedName: "TkDodo"
---

30.12.2023 — [Personal](https://tkdodo.eu/blog/tags/personal), [2023](https://tkdodo.eu/blog/tags/2023), [Year in Review](https://tkdodo.eu/blog/tags/year-in-review) — 4 min read

![2023](https://tkdodo.eu/blog/static/bbb36ab6b8a1ad8ef29aef3319afc33c/bbe0c/2023.jpg "2023")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

> I'm sure 2023 will have some exciting things in store for me.

This is how I finished my [2022 in Review](https://tkdodo.eu/blog/2022-in-review#2023) post, and without knowing it at the time, I was spot on. A lot of things have fallen into place for me this year, I'm not even sure where to start, so I'll go with what had the biggest impact on me:

## Query.gg 🔮[](#querygg-)

I started the year by teaming up with the folks behind [ui.dev](https://ui.dev/) to work on a new, official course for [TanStack Query](https://tanstack.com/query). ui.dev already had the React Query course that was endorsed by Tanner, and since we were also working on a new version of the library itself, it made sense to evaluate making a new course, too.

I have been maintaining TanStack Query for about two years now, and I've also gotten great feedback for the content I've created on my blog about it. So I was excited to work on a course that I could shape from the ground up, and that would be the best resource for learning TanStack Query.

Of course, I already have a job as a Tech Lead, and a family, and doing open source as a hobby also takes up quite a bit of time. It was clear that I couldn't just add another thing to my plate, which is why I decided to basically reduce my work hours in half. I thought I could focus on the course (and actually shipping v5) in the remaining time, and that it shouldn't take too long to finish the course.

As everyone who has ever attempted to create a course will tell you - it is way more work than initially anticipated - especially when you're not working on it full time. That's why I'm sitting here, end of December, and the course is still not released. However, we already have over 30 lessons of content, and I'm confident that we'll be able to get there in early 2024.

And I think it's totally worth the wait. I'm really proud of the content we've created so far, because the course aims at teaching you the right mindset to work with TanStack Query. It's not just about how specific features work, or about learning the syntax to achieve X or Y. It's about understanding the core concepts behind the library. About Async State Management that isn't tied to data fetching. About truly understanding how staleTime and Query Observers work. So while you're waiting - why don't you sign up for the mailing list to keep up-to-date? 😉

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)

## TanStack Query v5[](#tanstack-query-v5)

Speaking of TanStack Query - we've released a new major version this year. 🎉

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

📢 Announcing TanStack Query v5 🎉🥳

🤝 unified object API  
📈 simplified, optimistic updates  
♻️ sharable mutation state  
🔀 suspense and streaming w/ RSC  
♾ improved infinite queries  
⚡️ ~20 % smaller  
🛠️ new agnostic devtools  
💾 fine-grained persistence  

![TanStackQuery v5](https://tkdodo.eu/blog/static/7d22b738c2cb4575b29a4278eafe95b9/8803f/TanStackQueryV5.png)

\-

Oct 17, 2023



](https://x.com/TkDodo/status/1714262102305632643)

And I have to say - for the first time - I'm really happy with how the release turned out. We've been working on it for over ten months, and we've been quite public about what we're going to change and why. We had a [public roadmap](https://github.com/TanStack/query/discussions/4252). [Additional](https://github.com/TanStack/query/discussions/4854) [RFCs](https://github.com/TanStack/query/discussions/5279) about topics where we wanted more feedback. I've personally been dogfooding v5 for over 6 months because I've used it throughout the Query.gg 🔮 course, and we had 91 alpha releases, 35 betas and 16 release candidates.

Yes, there was some backlash about removing the callbacks (my first twitter 💩-storm, yay!), which lead to me writing a [detailed blogpost](https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose) about why we're doing it. But overall, I think we've done a good job at communicating the changes, and from what I've heard, most updates where smooth and people are generally happy with the changes.

### Angular Query[](#angular-query)

As TanStack Query grows in popularity, we've also seen more and more people from other frameworks showing interest in it. Of course, TanStack Query is already available for Vue, Solid and Svelte in addition to React, and this year, [Arnoud](https://twitter.com/Arnoud_dv) has contributed an adapter for Angular based on Angular Signals. There is also an adapter in progress for [Qwik Query](https://github.com/TanStack/query/pull/6436) by [Giorgio Boa](https://twitter.com/giorgio_boa). I think this just shows that the concept of Query is adaptable everywhere, and that there is really a need in other frameworks for it, too.

## React Summit 2023[](#react-summit-2023)

I went to React Summit again, this time as a speaker, and I had a blast. My talk [Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query) wasn't in person, but I got to meet a lot of people I've only known from twitter. Getting access to the speaker's room is something I've never experienced before, and being part of this legendary selfie inception was definitely a highlight for me: 🤳

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

The selfie inception 🤳 #ReactSummit

![selfie inception](https://tkdodo.eu/blog/static/48b1f92de8170de7f771f7108845d97c/b51df/FxnXEGVX0AEeYAf.jpg)

\-

Jun 2, 2023



](https://x.com/TkDodo/status/1664598009282285568)

## Online appearances[](#online-appearances)

I've been invited to a couple of podcasts this year, and I've also been on some livestreams:

-   [State of React Ecosystem Jan 2023](https://www.youtube.com/watch?v=_nGuk2Gs2oc)
-   [React Query tips from the maintainer @TkDodo](https://www.youtube.com/watch?v=PtHRZqh3LHI) with [Andrew Burgess](https://twitter.com/andrew8088).
-   [TanStack Query v5 with Dominik Dorfmeister](https://podrocket.logrocket.com/tanstack-query-v5-dominik-dorfmeister) on PodRocket
-   [S10E11 Modern Web Podcast- Maintaining a Successful Open-source Project with Dominik Dorfmeister](https://modernweb.podbean.com/e/s10e11-modern-web-podcast-maintaining-a-successful-open-source-project/)
-   [Angular Query & State - TanStack to rul ethem all?](https://x.com/DanielGlejzner/status/1738531157002596701) - a twitter space with [Daniel Glejzer](https://twitter.com/DanielGlejzner) about the new Angular Query adapter
-   [Dominik Dorfmeister: React Query With The App Router](https://www.youtube.com/watch?v=R4NHXrvwZWA) - an interview [Jack Herrington](https://twitter.com/jherr) did with me at React Summit
-   Did a live stream with [Christopher Ehrlich](https://twitter.com/ccccjjjjeeee) about React Query and Server Components: [App Dir data fetching solved???](https://www.youtube.com/watch?v=ESnhVaWI59c)
-   Not really me being on personally, but [Theo](https://twitter.com/theo) read one of my blogpost on his stream: [You Probably Shouldn't Use React.memo()](https://www.youtube.com/watch?v=Yh2eH4fXgbU)

I've also tried to stream more myself - a whopping 5 times this year. You can watch the uncut recordings on [my youtube channel](https://www.youtube.com/@tkdodo).

## Rewriting my blog[](#rewriting-my-blog)

I said last year that it won't happen any time soon, but I need to put some pressure on myself. Working with my current implementation has become almost unusable, and I'm really looking forward to finally having a state-of-the-art blog again.

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

It takes 62 seconds to start the dev server for my gatsby blog 😭. When have I suffered enough to tackle a re-write?

\-

Oct 20, 2023



](https://x.com/TkDodo/status/1715347367778553896)

So I'll say it now: 2024 is the year where I'll finally tackle a re-write in ... [Astro](https://astro.build/) of course. We'll see at the end of next year if that really happened. 😅

## 2024[](#2024)

Apart from that, I won't even try to predict the future. One thing I can say is that I plan to take a couple of steps back after I'm done with the Query.gg 🔮 to reflect on how the last years have been for me. There is no doubt that having two (now three) jobs takes its toll, and I have no desire to burn out. I'll be listening ot my heart and my body, and see where it takes me. Happy new year!

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)