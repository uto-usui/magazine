---
title: "Making Sense of the Performance Extensibility API"
source: "https://csswizardry.com/2025/07/the-extensibility-api/"
publishedDate: "2025-07-26"
category: "css"
feedName: "CSS Wizardry"
---

25 July, 2025 (last updated on 22 August, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Making Your Code a First Class Citizen](#making-your-code-a-first-class-citizen)
2.  [`performance.mark()` and `performance.measure()`](#performancemark-and-performancemeasure)
3.  [The Extensibility API](#the-extensibility-api)
4.  [Minimum Viable Measurement](#minimum-viable-measurement)
5.  [Maximising the Extensibility API](#maximising-the-extensibility-api)
    1.  [Tracks and Colours](#tracks-and-colours)
    2.  [Track Groups](#track-groups)
6.  [Recap](#recap)
7.  [Third Parties](#third-parties)
8.  [Appendix](#appendix)
    1.  [Resource Timing API Example](#resource-timing-api-example)

Google Chrome recently introduced the Performance [Extensibility API](https://developer.chrome.com/docs/devtools/performance/extension), a means of putting your code front-and-centre in Chrome’s Performance panel. Their own documentation is somewhat dry and doesn’t really state the benefits or outcomes very clearly, so I spent a couple of hours looking into it and here are the key takeaways.

Not sure how to use the Performance Extensibility API? Read up on the [_User Timing API_’s `performance.mark()` and `performance.measure()`](https://csswizardry.com/2022/08/measure-what-you-impact-not-what-you-influence/) first.

If you:

-   are interested in closely profiling specific, atomic parts of your application;
    -   you can intricately time bare-metal events.
-   work in an organisation where different teams contribute different code to the same front-end;
    -   you can create a custom section in DevTools for each team.
-   need to gather rich (meta)data about key parts of your runtime;
    -   you can capture arbitrary data as part of standard APIs.
-   provide or consume APIs;
    -   you could track their response times with ease and surface that information to the front-end and DevTools.
-   maintain a third party package that could be traced;
    -   you can provide clear signposting for key events (e.g. hydration) to your consumers, or;
-   are just interested in performance tooling…
    -   …this article is for you.

## Making Your Code a First Class Citizen

[Chrome’s DevTools](https://csswizardry.gumroad.com/l/perfect-devtools/) are incredibly powerful, and are only ever getting stronger, but this latest update hands a lot of control over to us! We can make our own instrumentation a key part of our performance profiling experience.

## `performance.mark()` and `performance.measure()`

The Extensibility API is particularly useful in extending the `performance.mark()` and `.measure()` User Timings. If you aren’t using these already, you should be. If you aren’t familiar with them, you need to be before this post will make sense to you. My 2022 post [Measure What You Impact, Not What You Influence](https://csswizardry.com/2022/08/measure-what-you-impact-not-what-you-influence/) is a relatively decent introduction to the topic, but for now, this simple demo should help:

```
<script>performance.mark('cssStart');</script>

<link rel=stylesheet href=/app.css>

<script>
  performance.mark('cssEnd');
  performance.measure('cssTime', 'cssStart', 'cssEnd');
</script>
```

Here, we drop a high-resolution timestamp—`cssStart`—using `performance.mark()`. We then fetch a synchronous stylesheet, `app.css`, before dropping a second high-resolution timestamp, `cssEnd`, using `performance.mark()` once more. Lastly, we use `performance.measure()` to create a measure of the duration of the delta between `cssStart` and `cssEnd`.

We could log any of the above `.mark()`s or `.measure()`s to the console. For example, to get the start time of `cssStart`, we could do:

```
console.log(`CSS Start: ${performance.getEntriesByName('cssStart')[0].startTime} ms`);
```

Or the duration of the `cssTime` measure:

```
console.log(`CSS Duration: ${performance.getEntriesByName('cssTime')[0].duration} ms`);
```

Note that `.mark()`’s useful property is `startTime` and `.measures()`’s is `duration`.

![Chrome DevTools Console view filtered using source:console-api to isolate user-generated performance logs.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-01.png)

You can use `source:console-api` to scope your Console messages only to things logged to it. Much cleaner.

We can use `performance.mark()` and `.measure()` in JavaScript, too, naturally:

```
performance.mark('jsStart');

// Simulate expensive JavaScript execution
setTimeout(() => {
  performance.mark('jsEnd');
  performance.measure('jsTime', 'jsStart', 'jsEnd');

  console.log(performance.getEntriesByName('jsStart')[0].startTime);
  console.log(performance.getEntriesByName('jsTime')[0].duration);
}, 1000);
```

Here we’re simulating an expensive bit of scripting that we might want to instrument and optimise.

These are neat, but the particularly nice thing about them is that Chrome DevTools will automatically pick up these marks and measures, and display them in the _Timings_ track of the Performance panel:

![Chrome Performance panel showing User Timing entries cssTime, jsTime, and jsEnd added via performance.mark() and .measure().](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-02.png)

Note that `cssTime` and `jsTime` take up a proportional amount of space to their duration, but `jsEnd`, a `.mark()`, takes up a thin sliver of the UI as it represents a moment in time. `.mark()`s are found above `.measure()`s.

The benefit of the `console.log()` approach is that it’s much faster—you don’t need to run a full performance profile, but the benefit of the Performance panel method is that you can visualise the times in context of your application’s runtime. The former is great if you just need the number as quickly as possible; the latter is great if you’re trying to contextualise your work.

Honestly, if you’ve never seen that before, I dare say this article has provided a bunch of value already! Next, go and see how to put this into use with my [Measure What You Impact, Not What You Influence](https://csswizardry.com/2022/08/measure-what-you-impact-not-what-you-influence/) article which gives good use-cases and examples for using these bare-metal metrics.

## The Extensibility API

The new Extensibility API allows us to extend this functionality. We can create arbitrary custom tracks in the Performance panel, not limiting us to only the default _Timings_ track, and we can add our own metadata to these marks and measures that can be used to surface additional information in the DevTools UI!

In order to do so, we need to write quite a lot more code than the `performance.mark()` and `.measure()`s we’ve just looked at. We begin by extending the `.mark()` or `.measure()` with a `devtools` object that lives in the `details` property, The whole point of this post is to cut through the fluff and show you, pragmatically, exactly what you do and don’t need.

## Minimum Viable Measurement

Before we can do anything, in the Performance panel’s settings, we need to enable _Show custom tracks_:

![Settings panel in Chrome DevTools with the ‘Show custom tracks’ option enabled for using the Performance Extensibility API.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-03.png)

Look in the Performance panel’s settings, not DevTools’ overall settings.

In this section, I will show you the bare minimum you need to make a start with the Extensibility API. Some aspects are mandatory and others, like colours, are entirely optional.

Starting with `.mark()`, the `dataType` _is_ required; nothing else is. Let’s convert our `jsEnd` `.mark()` to use the Extensibility API:

```
performance.mark('jsEnd', {
  detail: {
    devtools: {
      dataType: 'marker'
    }
  }
});
```

We’re forgoing anything else for now, but this is the first step to adopting the Extensibility API for `performance.mark()`:

![DevTools Performance panel showing a custom marker jsEnd added using the Extensibility API and styled with a custom colour.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-04.png)

Look toward the top-right and note the light blue `jsEnd` marker. That’s the extended `performance.mark()` in action.

Key improvements:

1.  **The marker is highly apparent!** It’s like a big flag which makes spotting `.mark()`s infinitely easier.
2.  **The marker has also placed a dotted line** all the way down subsequent tracks, including the Main thread.

However, there are two major downsides thus far:

1.  **The marker is as wide as the text it contains**—this can make things a little misleading as markers now no longer appear to be a point in time, but potentially a duration. Once you get used to this, you get used to it, but at first, it’s easy to mistake a `.mark()` for a `.meaasure()`.
2.  **There is absolutely no way of knowing at what time the `.mark()` was fired!** Even clicking the marker itself doesn’t show us any timestamp information. Neither hovering or clicking the marker gives us the high resolution timing that we’d use a `.mark()` for in the first place:

![](https://csswizardry.com/wp-content/uploads/2025/07/jack.png) [Jack Franklin](https://bsky.app/profile/jackf.io/post/3lusgjh2ts22h), who works on the Performance panel, read this article and, within less than two hours, has [a change lined up](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/6787872) to add timestamps to extended `performance.mark()` in M140. Incredible.

![Chrome DevTools Summary pane missing timestamp details for a custom performance.mark() entry using the Extensibility API.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-05.png)

The UI doesn’t surface any timestamp information anywhere. I find this pretty bizarre.

To this end, I’d be inclined to use `.mark()` less as a timestamp and more as a, well, marker—it can quickly bring your attention to the relevant part of your trace.

That’s your minimum viable `.mark()`.

`performance.measure()` is a little more useful, though. Let’s convert `cssTime` to its minimum viable version:

```
performance.measure('cssTime', {
  start: 'cssStart',
  end: 'cssEnd',
  detail: {
    devtools: {
      track: 'CSS'
    }
  }
});
```

We still need to pass in the reference start `.mark()` via the `start:` property. Our end marker, if omitted, defaults to right now—when the `.measure()` is being called—or can be provided explicitly via `end:`. The `track` property is mandatory, and this forms our minimum viable `.measure()`. Note that we don’t need to supply the `dataType` property as its omission defaults to `dataType: 'track-entry'`, which is exactly what we need. Let’s see what this looks like.

Hey! That’s pretty neat!

![Custom track labelled ‘CSS’ in Chrome DevTools Performance panel created using performance.measure() and the Extensibility API.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-06.png)

We now have our first custom track titled CSS, sourced from our `track: 'CSS'`. This is the least we need to do in order to make use of the Extensibility API for `performance.measure()`. Next, we’ll take it further.

## Maximising the Extensibility API

What I just showed you was the bare minimum to get up and running with the Extensibility API. `.mark()` is a little underwhelming, in my opinion, but the way we can extend `.measure()` is very cool. Let’s start with the built-in extensions we have.

### Tracks and Colours

With both `.mark()` and `.measure()`, we can apply custom colours. Not arbitrary or fully custom, like `#f43059`, but from DevTools’ own palette: `primary`, `primary-light`, `primary-dark`, `secondary`, `secondary-light`, `secondary-dark`, `tertiary`, `tertiary-light`, `tertiary-dark`, and `error`.

Let’s extend our `.mark()` from before a little further:

```
performance.mark('jsEnd', {
  detail: {
    devtools: {
      dataType: 'marker',
      color: 'secondary-dark'
    }
  }
});
```

Notice that our `jsEnd` marker is now a dark pinky-purple:

![Marker text in the Performance panel replaced with tooltipText using the Extensibility API—note the absence of an actual tooltip.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-07.png)

The top-right marker is now dark pink, which I guess maps to `secondary-dark`.

Easy enough! Next, let’s add some more descriptive tooltip text:

```
performance.mark('jsEnd', {
  detail: {
    devtools: {
      dataType: 'marker',
      color: 'secondary-dark',
      tooltipText: 'Simulated JS Execution Complete'
    }
  }
});
```

To be honest, this is no better, and certainly no more convenient, than just using a different string in place of `jsEnd`—this text hasn’t produced a tooltip, but rather just replaced the marker’s text.

The takeaway so far is that the Extensibility API is less useful for `performance.mark()`.

![Chrome DevTools Summary pane displaying custom metadata properties attached via the Extensibility API’s properties array.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-08.png)

The `tooltipText` simply replaces the marker’s text and doesn’t actually create a tooltip.

Lastly, for `.mark()`, we can pass in arbitrary metadata. That could be pretty useful for other developers picking up a project:

```
performance.mark('jsEnd', {
  detail: {
    devtools: {
      dataType: 'marker',
      color: 'secondary-dark',
      tooltipText: 'Simulated JS Execution Complete',
      properties: [
        ['File', 'app.js'],
        ['Function', 'setTimeout()']
      ]
    }
  }
});
```

Above, I’ve passed in almost-pointless data to illustrate the point, but I’m sure you can think of your own useful use-cases.

![Custom .measure() entry with tooltip, colour, and rich metadata shown in a dedicated CSS track using the Extensibility API.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-09.png)

Note the custom data that now appears in the _Summary_ pane.

All of the features I just showed you (`color`, `tooltipText`, and `properties`) apply equally to `performance.measure()`, so let’s leap ahead and bring our `performance.measure()` example up to date in one go:

```
performance.measure('cssTime', {
  start: 'cssStart',
  end: 'cssEnd',
  detail: {
    devtools: {
      track: 'CSS',
      color: 'secondary-dark',
      tooltipText: 'External CSS fetched and parsed',
      properties: [
        ['URL', app.css],
        ['Transferred Size', 29.3 KB],
        ['Decoded Body Size', 311.8 KB],
        ['Queuing & Latency', 104 ms],
        ['Download', 380 ms]
      ]
    }
  }
});
```

I’ve added a `color`, a `tooltipText`, and some made up metadata in `properties`. Note that I actually built a demo that used the Resource Timing API to grab these numbers for real. That code is in [the appendix](#appendix).

![Chrome Performance panel with grouped custom tracks for CSS and JS under ‘First Party’, showing cssTime and jsTime entries with full metadata.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-10.png)

The `.measure()` actually gets a proper tooltip, and we have rich metadata in the _Summary_ pane.

Now this is more like it!

1.  We still have our dedicated _CSS_ track;
2.  The `tooltipText` actually looks and acts like a tooltip;
3.  The _Summary_ pane has lots of nice, rich metadata!

This is where I see the Extensibility API becoming particularly useful. There’s just one more thing I want to show you: _track groups_.

### Track Groups

We created a custom _CSS_ track using `track: 'CSS'`. We might want to make a track for JS, API calls, you name it. We can then take all of these tracks and group them into a _track group_.

Track groups are useful if, say, we want to track first- and third-party attribution separately, or if our codebase has different teams who want to isolate their instrumentation from each other. They’re also incredibly easy to set up. Let’s evolve our `.measure()` a little more:

```
performance.measure('cssTime', {
  start: 'cssStart',
  end: 'cssEnd',
  detail: {
    devtools: {
      track: 'CSS',
      trackGroup: 'First Party',
      color: 'secondary-dark',
      tooltipText: 'External CSS fetched and parsed',
      properties: [
        ['URL', app.css],
        ['Transferred Size', 29.3 KB],
        ['Decoded Body Size', 311.8 KB],
        ['Queuing & Latency', 104 ms],
        ['Download', 380 ms]
      ]
    }
  }
});
```

And let’s quickly go back and add `trackGroup: 'First Party'` to our JS’s `.measure()`:

```
performance.measure('jsTime', {
  start: 'jsStart',
  end: 'jsEnd',
  detail: {
    devtools: {
      track: 'JS',
      trackGroup: 'First Party',
      color: 'secondary-dark',
      tooltipText: 'Simulated JS Execution Complete',
      properties: [
        ['File', 'app.js'],
        ['Function', 'setTimeout()']
      ]
    }
  }
});
```

…and what do we get?

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2025/07/extensibility-11.png)

Both our _CSS_ and _JS_ tracks are now nested underneath a _First Party_ track group.

Now we have a track _group_ called _First Party_ which contains both a _CSS_ and a _JS_ sub-track!

I hope you can already begin to imagine and envision use-cases for tracks and track groups. If you’re profiling and instrumenting your application with `performance.mark()` and `performance.measure()` already, the idea of getting it all organised surely excites you!

## Recap

The syntax for all of this is very repetetive and cumbersome, so all I would say is _start with as little as you can get away with_. Personally, I would not recommend using the Extensibility API for `performance.mark()`, so I’m not going to confuse folk by recapping it.

For `performance.measure()`, all you really need to get off the ground is:

```
performance.measure('<name>', {
  start: '<start>',
  end: '<end>',
  detail: {
    devtools: {
      track: '<track-name>'
    }
  }
});
```

This will automatically move this measure into its own custom track named, in this case, _<track-name>_.

Next up, I’d suggest looking into track groups so that you can better organise yourself:

```
performance.measure('<name>', {
  start: '<start>',
  end: '<end>',
  detail: {
    devtools: {
      track: '<track-name>',
      trackGroup: '<group-name>'
    }
  }
});
```

Perhaps a group for any code that comes from your design system or your own first party application, with sub-tracks for JS, API calls, etc. It really is up to you.

Beyond that, we’re mostly thinking about adding metadata and custom colours, but don’t worry about that until you’ve got the mechanism dialled in.

## Third Parties

If you work on a framework or a third party that instruments its own User Timings, please consider moving them into your own track group. It would be nice to see, for example, Next.js route-change or hydration timings in their own place.

## Appendix

### Resource Timing API Example

Drop this straight into an HTML file, fire it up in Chrome, and it will Just Work™.

```
<!doctype html>
<html lang=en-gb>
  <meta charset=utf-8>
  <meta name=viewport content="width=device-width, minimum-scale=1.0">

  <title>Extensibility API</title>

  <script>
    performance.mark('cssStart', {
      detail: {
        devtools: {
          dataType: "marker",
          tooltipText: 'Get Bootstrap CSS from CDN',
          color: "secondary-light"
        }
      }
    });
  </script>

  <link rel=stylesheet href=https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css id=jsCSS>

  <script>

    performance.mark('cssEnd');

    // Grab stylesheet’s timing metadata.
    const css                  = document.getElementById('jsCSS');
    const cssURL               = css.href;
    const cssTimingInformation = performance.getEntriesByName(cssURL)[0];
    const cssTransferSize      = (cssTimingInformation.transferSize    / 1024).toFixed(2);
    const cssDecodedBodySize   = (cssTimingInformation.decodedBodySize / 1024).toFixed(2);
    const cssLatencyDuration   = (cssTimingInformation.responseStart   - cssTimingInformation.startTime).toFixed(2);
    const cssdownloadDuration  = (cssTimingInformation.responseEnd     - cssTimingInformation.responseStart).toFixed(2);

  </script>

  <script>

    performance.measure('cssTime', {
      start: 'cssStart',
      end:   'cssEnd',
      detail: {
        devtools: {
          dataType:    'track-entry',
          trackGroup:  'Third Party Instrumentation',
          track:       'CSS',
          tooltipText: 'CSS Downloaded and Parsed',
          color:       'secondary-light',
          properties: [
            ['URL',                  cssURL],
            ['Transferred Size',  `${cssTransferSize} KB`],
            ['Decoded Body Size', `${cssDecodedBodySize} KB`],
            ['Queuing & Latency', `${cssLatencyDuration} ms`],
            ['Download',          `${cssdownloadDuration} ms`]
          ]
        }
      }
    });

  </script>
```

* * *

* * *

* * *

![](https://csswizardry.com/img/content/avatar.jpg)

##### By [Harry Roberts](https://csswizardry.com/about/)

Harry Roberts is an [independent consultant](https://csswizardry.com/consultancy/) web performance engineer. He [helps companies](https://csswizardry.com/services/) of all shapes and sizes find and fix site speed issues.

* * *

* * *

![](https://csswizardry.com/img/css/masthead-small.jpg)

Hi there, I’m **Harry Roberts**. I am an **[award-winning](https://web.archive.org/web/20190630140300/https://thenetawards.com/previous-winners/) Consultant Web Performance Engineer**, **designer**, **developer**, **writer**, and **speaker** from the UK. I **[write](https://csswizardry.com/blog/)**, **[Tweet](https://twitter.com/csswizardry)**, **[speak](https://csswizardry.com/speaking/)**, and **[share code](https://github.com/csswizardry)** about measuring and improving site-speed. You [should hire me](https://csswizardry.com/services/).

* * *

#### Connect

-   [𝕏 (Twitter)](https://twitter.com/csswizardry)
-   [Mastodon](https://webperf.social/@csswizardry)
-   [Bluesky](https://bsky.app/profile/csswizardry.com)
-   [LinkedIn](https://www.linkedin.com/in/csswizardry/)
-   [GitHub](https://github.com/csswizardry)
-   [YouTube](https://www.youtube.com/@csswizardry?sub_confirmation=1)

* * *

#### Projects

#### Next Appearance

-   #### Talk
    
    ![](https://csswizardry.com/img/icons/nl.png) [performance.now()](https://perfnow.nl/): Amsterdam (Netherlands), October 2025