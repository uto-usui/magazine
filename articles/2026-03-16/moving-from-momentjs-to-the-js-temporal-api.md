---
title: "Moving From Moment.js To The JS Temporal API"
source: "https://smashingmagazine.com/2026/03/moving-from-moment-to-temporal-api/"
publishedDate: "2026-03-13"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Joe Attardi)"
---

-   18 min read
-   [JavaScript](https://smashingmagazine.com/category/javascript), [API](https://smashingmagazine.com/category/api), [Coding](https://smashingmagazine.com/category/coding)

The way JavaScript handles time has evolved significantly, from the built-in `Date` API to Moment.js and now Temporal. The new standard fills gaps in the original `Date` API while addressing limitations found in Moment and other libraries. Joe Attardi shares practical “recipes” for migrating Moment-based code to the new Temporal API.

Almost any kind of application written in JavaScript works with times or dates in some capacity. In the beginning, this was limited to the built-in `Date` API. This API includes basic functionality, but is quite limited in what it can do.

Third-party libraries like Moment.js, and later built-in APIs such as the `Intl` APIs and the new [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal), add much greater flexibility to working with times and dates.

## The Rise And Fall Of Moment.js

[Moment.js](https://momentjs.com/) is a JavaScript library with powerful utilities for working with times and dates. It includes missing features from the basic [Date API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), such as time zone manipulation, and makes many common operations simpler. Moment also includes functions for formatting dates and times. It became a widely used library in many different applications.

However, Moment also had its share of issues. It’s a large library, and can add significantly to an application’s bundle size. Because the library doesn’t support tree shaking (a feature of modern bundlers that can remove unused parts of libraries), the entire Moment library is included even if you only use one or two of its functions.

Another issue with Moment is the fact that the objects it creates are _mutable_. Calling certain functions on a Moment object has side effects and mutates the value of that object. This can lead to unexpected behavior or bugs.

In 2020, the maintainers of Moment decided to put the library into maintenance mode. No new feature development is being done, and the maintainers recommend against using it for new projects.

There are other JavaScript date libraries, such as `date-fns`, but there’s a new player in town, an API built directly into JavaScript: **Temporal**. It’s a new standard that fills in the holes of the original `Date` API as well as solves some of the limitations found in Moment and other libraries.

## What Is Temporal?

Temporal is a new time and date API being added to the ECMAScript standard, which defines modern JavaScript. As of March 2026, it has reached Stage 4 of the TC39 process (the committee that oversees proposals and additions to the JavaScript language), and will be included in the next version of the ECMAScript specification. It has already been implemented in several browsers: [Chrome](https://developer.chrome.com/release-notes/144) [144+](https://developer.chrome.com/release-notes/144) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/139#javascript) [139+](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/139#javascript), with [Safari expected to follow soon](https://bugs.webkit.org/show_bug.cgi?id=223166). A [polyfill is also available](https://github.com/js-temporal/temporal-polyfill) for unsupported browsers and Node.js.

The Temporal API creates objects that, generally, represent moments in time. These can be full-time and date stamps in a given time zone, or they can be a generic instance of “wall clock” time without any time zone or date information. Some of the main features of Temporal include:

-   **Times with or without dates.**  
    A Temporal object can represent a specific time on a specific date, or a time without any date information. A specific date, without a time, can also be represented.
-   **Time zone support.**  
    Temporal objects are fully time zone aware and can be converted across different time zones. Moment supports time zones, too, but it requires the additional `moment-timezone` library.
-   **Immutability.**  
    Once a Temporal object is created, it cannot be changed. Time arithmetic or time zone conversions do not modify the underlying object. Instead, they generate a new Temporal object.
-   **1-based indexing.**  
    A common source of bugs with the Date API (as well as with Moment) is that months are zero-indexed. This means that January is month `0`, rather than month `1` as we all understand in real life. Temporal fixes this by using 1-based indexing — January is month `1`.
-   **It’s built into the browser.**  
    Since Temporal is an API in the browser itself, it adds nothing to your application’s bundle size.

It’s also important to note that the Date API isn’t going away. While Temporal supersedes this API, it is not being removed or deprecated. Many applications would break if browsers suddenly removed the Date API. However, also keep in mind that Moment is now considered a legacy project in maintenance mode.

In the rest of the article, we’ll look at some “recipes” for migrating Moment-based code to the new Temporal API. Let’s start refactoring!

## Creating Date And Time Objects

Before we can manipulate dates and times, we have to create objects representing them. To create a Moment object representing the current date and time, use the `moment` function.

```
const now = moment();
console.log(now); 
// Moment<2026-02-18T21:26:29-05:00>
```

This object can now be formatted or manipulated as needed.

```
// convert to UTC
// warning: This mutates the Moment object and puts it in UTC mode!
console.log(now.utc()); 
// Moment<2026-02-19T02:26:29Z>

// print a formatted string - note that it's using the UTC time now
console.log(now.format('MM/DD/YYYY hh:mm:ss a')); 
// 02/19/2026 02:27:07 am
```

The key thing to remember about Moment is that a Moment object always includes information about the time _and_ the date. If you only need to work with time information, this is usually fine, but it can cause unexpected behavior in situations like Daylight Saving Time or leap years, where the date can have an effect on time calculations.

Temporal is more flexible. You can create an object representing the current date and time by creating a `Temporal.Instant` object. This represents a point in time defined by the time since “the epoch” (midnight UTC on January 1, 1970). Temporal can reference this instant in time with nanosecond-level precision.

```
const now = Temporal.Now.instant();

// see raw nanoseconds since the epoch
console.log(now.epochNanoseconds);
// 1771466342612000000n

// format for UTC
console.log(now.toString());
// 2026-02-19T01:55:27.844Z

// format for a particular time zone
console.log(now.toString({ timeZone: 'America/New_York' }));
// 2026-02-18T20:56:57.905-05:00
```

`Temporal.Instant` objects can also be created for a specific time and date by using the `from` static method.

```
const myInstant = Temporal.Instant.from('2026-02-18T21:10:00-05:00');

// Format the instant in the local time zone. Note that this only controls
// the formatting - it does not mutate the object like `moment.utc` does.
console.log(myInstant.toString({ timeZone: 'America/New_York' }));
// 2026-02-18T21:10:00-05:00
```

You can also create other types of Temporal objects, including:

-   **`Temporal.PlainDate`**: A date with no time information.
-   **`Temporal.PlainTime`**: A time with no date information.
-   **`Temporal.ZonedDateTime`**: A date and time in a specific time zone.

Each of these has a `from` method that can be called with an object specifying the date and/or time, or a date string to parse.

```
// Just a date
const today = Temporal.PlainDate.from({
  year: 2026,
  month: 2, // note we're using 2 for February
  day: 18
});
console.log(today.toString());
// 2026-02-18

// Just a time
const lunchTime = Temporal.PlainTime.from({
  hour: 12
});
console.log(lunchTime.toString());
// 12:00:00 

// A date and time in the US Eastern time zone
const dueAt = Temporal.ZonedDateTime.from({
  timeZone: 'America/New_York',
  year: 2026,
  month: 3,
  day: 1,
  hour: 12,
  minute: 0,
  second: 0
});
console.log(dueAt.toString());
// 2026-03-01T12:00:00-05:00[America/New_York]
```

## Parsing

We’ve covered programmatic creation of date and time information. Now let’s look at parsing. Parsing is one area where Moment is more flexible than the built-in Temporal API.

You can parse a date string by passing it to the `moment` function. With a single argument, Moment expects an ISO date string, but you can use alternative formats if you provide a second argument specifying the date format being used.

```
const isoDate = moment('2026-02-21T09:00:00');
const formattedDate = moment('2/21/26 9:00:00', 'M/D/YY h:mm:ss');

console.log(isoDate);
// Moment<2026-02-21T09:00:00-05:00>

console.log(formattedDate);
// Moment<2026-02-21T09:00:00-05:00>
```

In older versions, Moment would make a best guess to parse any arbitrarily formatted date string. This could lead to unpredictable results. For example, is `02-03-2026` February 2 or March 3? For this reason, newer versions of Moment display a prominent deprecation warning if it’s called without an ISO formatted date string (unless the second argument with the desired format is also given).

Temporal will only parse a specifically formatted date string. The string must be compliant with the ISO 8601 format or its extension, RFC 9557. If a non-compliant date string is passed to a `from` method, Temporal will throw a `RangeError`.

```
// Using an RFC 9557 date string
const myDate = Temporal.Instant.from('2026-02-21T09:00:00-05:00[America/New_York]');
console.log(myDate.toString({ timeZone: 'America/New_York' }));
// 2026-02-21T09:00:00-05:00

// Using an unknown date string
const otherDate = Temporal.Instant.from('2/21/26 9:00:00');
// RangeError: Temporal error: Invalid character while parsing year value.
```

The exact requirements of the date string depend on which kind of Temporal object you’re creating. In the above example, `Temporal.Instant` requires a full ISO 8601 or RFC 9557 date string specifying the date and time with a time zone offset, but you can also create `PlainDate` or `PlainTime` objects using just a subset of the date format.

```
const myDate = Temporal.PlainDate.from('2026-02-21');
console.log(myDate.toString());
// 2026-02-21

const myTime = Temporal.PlainTime.from('09:00:00');
console.log(myTime.toString());
// 09:00:00
```

Note that these strings must still comply with the expected format, or an error will be thrown.

```
// Using a non-compliant time strings. These will all throw a RangeError.
Temporal.PlainTime.from('9:00');
Temporal.PlainTime.from('9:00:00 AM');
```

> **Pro tip: Handling non-ISO strings**
> 
> Because Temporal prioritizes reliability, it won’t try to guess the format of a string like `02-01-2026`. If your data source uses such strings, you will need to do some string manipulation to rearrange the values into an ISO string like `2026-02-01` before attempting to use it with Temporal.

## Formatting

Once you have a Moment or Temporal object, you’ll probably want to convert it to a formatted string at some point.

This is an instance where Moment is a bit more terse. You call the object’s `format` method with a string of tokens that describe the desired date format.

```
const date = moment();

console.log(date.format('MM/DD/YYYY'));
// 02/22/2026

console.log(date.format('MMMM Do YYYY, h:mm:ss a'));
// February 22nd 2026, 8:18:30 pm
```

On the other hand, Temporal requires you to be a bit more verbose. Temporal objects, such as `Instant`, have a `toLocaleString` method that accepts various formatting options specified as properties of an object.

```
const date = Temporal.Now.instant();

// with no arguments, we'll get the default format for the current locale
console.log(date.toLocaleString());
// 2/22/2026, 8:23:36 PM (assuming a locale of en-US)

// pass formatting options to generate a custom format string
console.log(date.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}));
// February 22, 2026 at 8:23 PM

// only pass the fields you want in the format string
console.log(date.toLocaleString('en-US', {
  month: 'short',
  day: 'numeric'
}));
// Feb 22
```

**Temporal date formatting actually uses the `Intl.DateTimeFormat` API** (which is already readily available in modern browsers) under the hood. That means you can create a reusable `DateTimeFormat` object with your custom formatting options, then pass Temporal objects to its `format` method. Because of this, it doesn’t support custom date formats like Moment does. If you need something like `'Q1 2026'` or other specialized formatting, you may need some custom date formatting code or reach for a third-party library.

```
const formatter = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

const date = Temporal.Now.instant();
console.log(formatter.format(date));
// 02/22/2026
```

Moment’s formatting tokens are simpler to write, but they aren’t locale-friendly. The format strings “hard code” things like month/day order. The advantage of using a configuration object, as Temporal does, is that it will automatically adapt to any given locale and use the correct format.

```
const date = Temporal.Now.instant();

const formatOptions = {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric'
};


console.log(date.toLocaleString('en-US', formatOptions));
// 2/22/2026

console.log(date.toLocaleString('en-GB', formatOptions));
// 22/02/2026
```

## Date calculations

In many applications, you’ll need to end up performing some calculations on a date. You may want to add or subtract units of time (days, hours, seconds, etc.). For example, if you have the current date, you may want to show the user the date 1 week from now.

Moment objects have methods such as `add` and `subtract` that perform these operations. These functions take a value and a unit, for example: `add(7, 'days')`. One very important difference between Moment and Temporal, however, is that when performing these date calculations, the underlying object is modified and its original value is lost.

```
const now = moment();

console.log(now);
// Moment<2026-02-24T20:08:36-05:00>

const nextWeek = now.add(7, 'days');
console.log(nextWeek);
// Moment<2026-03-03T20:08:36-05:00>

// Gotcha - the original object was mutated
console.log(now);
// Moment<2026-03-03T20:08:36-05:00>
```

To avoid losing the original date, you can call `clone` on the Moment object to create a copy.

```
const now = moment();
const nextWeek = now.clone().add(7, 'days');

console.log(now);
// Moment<2026-02-24T20:12:55-05:00>

console.log(nextWeek);
// Moment<2026-03-03T20:12:55-05:00>
```

On the other hand, Temporal objects are _immutable_. Once you’ve created an object like an `Instant`, `PlainDate`, and so on, the value of that object will never change. Temporal objects also have `add` and `subtract` methods.

Temporal is a little picky about which time units can be added to which object types. For example, you can’t add days to an `Instant`:

```
const now = Temporal.Now.instant();
const nextWeek = now.add({ days: 7 });
// RangeError: Temporal error: Largest unit cannot be a date unit
```

This is because `Instant` objects represent a specific point in time in UTC and are calendar-agnostic. Because the length of a day can change based on time zone rules such as Daylight Saving Time, this calculation isn’t available on an `Instant`. You _can_, however, perform this operation on other types of objects, such as a `PlainDateTime`:

```
const now = Temporal.Now.plainDateTimeISO();
console.log(now.toLocaleString());
// 2/24/2026, 8:23:59 PM

const nextWeek = now.add({ days: 7 });

// Note that the original PlainDateTime remains unchanged
console.log(now.toLocaleString());
// 2/24/2026, 8:23:59 PM

console.log(nextWeek.toLocaleString());
// 3/3/2026, 8:23:59 PM
```

You can also calculate how much time is between two Moment or Temporal objects.

With Moment’s `diff` function, you need to provide a unit for granularity, otherwise it will return the difference in milliseconds.

```
const date1 = moment('2026-02-21T09:00:00');
const date2 = moment('2026-02-22T10:30:00');

console.log(date2.diff(date1));
// 91800000

console.log(date2.diff(date1, 'days'));
// 1
```

To do this with a Temporal object, you can pass another Temporal object to its `until` or `since` methods. This returns a `Temporal.Duration` object containing information about the time difference. The `Duration` object has properties for each component of the difference, and also can generate an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration string representing the time difference.

```
const date1 = Temporal.PlainDateTime.from('2026-02-21T09:00:00');
const date2 = Temporal.PlainDateTime.from('2026-02-22T10:30:00');

// largestUnit specifies the largest unit of time to represent
// in the duration calculation
const diff = date2.since(date1, { largestUnit: 'day' });

console.log(diff.days);
// 1

console.log(diff.hours);
// 1

console.log(diff.minutes);
// 30

console.log(diff.toString());
// P1DT1H30M
// (ISO 8601 duration string: 1 day, 1 hour, 30 minutes)
```

## Comparing Dates And Times

Moment and Temporal both let you compare dates and times to determine which comes before the other, but take different approaches with the API.

Moment provides methods such as `isBefore`, `isAfter`, and `isSame` to compare two Moment objects.

```
const date1 = moment('2026-02-21T09:00:00');
const date2 = moment('2026-02-22T10:30:00');

console.log(date1.isBefore(date2));
// true
```

Temporal uses a static `compare` method to perform a comparison between two objects of the same type. It returns `-1` if the first date comes before the second, `0` if they are equal, or `1` if the first date comes after the second. The following example shows how to compare two `PlainDate` objects. Both arguments to `Temporal.PlainDate.compare` must be `PlainDate` objects.

```
const date1 = Temporal.PlainDate.from({ year: 2026, month: 2, day: 24 });
const date2 = Temporal.PlainDate.from({ year: 2026, month: 3, day: 24 });

// date1 comes before date2, so -1
console.log(Temporal.PlainDate.compare(date1, date2));

// Error if we try to compare two objects of different types
console.log(Temporal.PlainDate.compare(date1, Temporal.Now.instant()));
// TypeError: Temporal error: Invalid PlainDate fields provided.
```

In particular, this makes it easy to sort an array of Temporal objects chronologically.

```
// An array of Temporal.PlainDate objects
const dates = [ ... ];

// use Temporal.PlainDate.compare as the comparator function
dates.sort(Temporal.PlainDate.compare);
```

## Time Zone Conversions

The core Moment library doesn’t support time zone conversions. If you need this functionality, you also need to install the `moment-timezone` package. This package is not tree-shakable, and therefore can add significantly to your bundle size. Once you’ve installed `moment-timezone`, you can convert Moment objects to different time zones with the `tz` method. As with other Moment operations, this mutates the underlying object.

```
// Assuming US Eastern time
const now = moment();
console.log(now);
// Moment<2026-02-28T20:08:20-05:00>

// Convert to Pacific time.
// The original Eastern time is lost.
now.tz('America/Los_Angeles');
console.log(now);
// Moment<2026-02-28T17:08:20-08:00>
```

Time zone functionality is built into the Temporal API when using a `Temporal.ZonedDateTime` object. These objects include a `withTimeZone` method that returns a new `ZonedDateTime` representing the same moment in time, but in the specified time zone.

```
// Again, assuming US Eastern time
const now = Temporal.Now.zonedDateTimeISO();
console.log(now.toLocaleString());
// 2/28/2026, 8:12:02 PM EST

// Convert to Pacific time
const nowPacific = now.withTimeZone('America/Los_Angeles');
console.log(nowPacific.toLocaleString());
// 2/28/2026, 5:12:02 PM PST

// Original object remains unchanged
console.log(now.toLocaleString());
// 2/28/2026, 8:12:02 PM EST
```

**Note:** _The formatted values returned by `toLocaleString` are, as the name implies, locale-dependent. The sample code was developed in the `en-US` locale, so the format is like this: `2/28/2026, 5:12:02 PM PST`. In another locale, this may be different. For example, in the `en-GB` locale, you would get something like `28/2/2026, 17:12:02 GMT-8`._

## A Real-world Refactoring

Suppose we’re building an app for scheduling events across time zones. Part of this app is a function, `getEventTimes`, which takes an ISO 8601 string representing the time and date of the event, a local time zone, and a target time zone. The function creates formatted time and date strings for the event in both time zones.

If the function is given an input string that’s not a valid time/date string, it will throw an error.

Here’s the original implementation, using Moment (also requiring use of the `moment-timezone` package).

```
import moment from 'moment-timezone';

function getEventTimes(inputString, userTimeZone, targetTimeZone) {
  const timeFormat = 'MMM D, YYYY, h:mm:ss a z';

  // 1. Create the initial moment in the user's time zone
  const eventTime = moment.tz(
    inputString,
    moment.ISO_8601, // Expect an ISO 8601 string
    true, // Strict parsing
    userTimeZone
  );
  
  // Throw an error if the inputString did not represent a valid date
  if (!eventTime.isValid()) {
    throw new Error('Invalid date/time input');
  }

  // 2. Calculate the target time
  // CRITICAL: We must clone, or 'eventTime' changes forever!
  const targetTime = eventTime.clone().tz(targetTimeZone);

  return {
    local: eventTime.format(timeFormat),
    target: targetTime.format(timeFormat),
  };
}

const schedule = getEventTimes(
  '2026-03-05T15:00-05:00',
  'America/New_York',
  'Europe/London',
);

console.log(schedule.local);
// Mar 5, 2026, 3:00:00 pm EST

console.log(schedule.target); 
// Mar 5, 2026, 8:00:00 pm GMT
```

In this example, we’re using an expected date format of ISO 8601, which is helpfully built into Moment. We’re also using strict parsing, which means Moment won’t try to guess with a date string that doesn’t match the format. If a non-ISO date string is passed, it will result in an invalid date object, and we throw an error.

The Temporal implementation looks similar, but has a few key differences.

```
function getEventTimes(inputString, userTimeZone, targetTimeZone) {
  // 1. Parse the input directly into an Instant, then create
  // a ZonedDateTime in the user's zone.
  const instant = Temporal.Instant.from(inputString);
  const eventTime = instant.toZonedDateTimeISO(userTimeZone);

  // 2. Convert to the target zone
  // This automatically returns a NEW object; 'eventTime' is safe.
  const targetTime = eventTime.withTimeZone(targetTimeZone);

  // 3. Format using Intl (built-in)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };

  return {
    local: eventTime.toLocaleString(navigator.language, options),
    target: targetTime.toLocaleString(navigator.language, options)
  };
}

const schedule = getEventTimes(
  '2026-03-05T15:00-05:00',
  'America/New_York',
  'Europe/London',
);

console.log(schedule.local);
// Mar 5, 2026, 3:00:00 PM EST

console.log(schedule.target);
// Mar 5, 2026, 8:00:00 PM GMT
```

With Moment, we have to explicitly specify a format string for the resulting date strings. Regardless of the user’s location or locale, the event times will always be formatted as `Mar 5, 2026, 3:00:00 pm EST`.

Also, we don’t have to explicitly throw an exception. If an invalid string is passed to `Temporal.Instant.from`, Temporal will throw the exception for us. One thing to note is that even with strict parsing, the Moment version is still more lenient. Temporal requires the time zone offset at the end of the string.

You should also note that since we’re using `navigator.language`, this code will only run in a browser environment, as `navigator` is not defined in a Node.js environment.

The Temporal implementation uses the browser’s current locale (`navigator.language`), so the user will automatically get event times formatted in their local time format. In the `en-US` locale, this is `Mar 5, 2026, 3:00:00 pm EST`. However, if the user is in London, for example, the event times will be formatted as `5 Mar 2026, 15:00:00 GMT-5`.

## Summary

Action

Moment.js

Temporal

Current time

`moment()`

`Temporal.Now.zonedDateTimeISO()`

Parsing ISO

`moment(str)`

`Temporal.Instant.from(str)`

Add time

`.add(7, 'days')` (mutates)

`.add({ days: 7 })` (new object)

Difference

`.diff(other, 'hours')`

`.since(other).hours`

Time zone

`.tz('Zone/Name')`

`.withTimeZone('Zone/Name')`

At first glance, the difference may be slightly different (and in the case of Temporal, sometimes more verbose and more strict) syntax, but there are several key advantages to using Temporal over Moment.js:

-   Being more explicit means **fewer surprises and unintended bugs**. Moment may appear to be more lenient, but it involves “guesswork,” which can sometimes result in incorrect dates. If you give Temporal something invalid, it throws an error. If the code runs, you know you’ve got a valid date.
-   Moment can add significant size to the application’s bundle, particularly if you’re using the `moment-timezone` package. Temporal adds nothing (once it’s shipped in your target browsers).
-   **Immutability** gives you the confidence that you’ll never lose or overwrite data when performing date conversions and operations.
-   **Different representations of time** (`Instant`, `PlainDateTime`, `ZonedDateTime`) depending on your requirements, where Moment is always a wrapper around a UTC timestamp.
-   Temporal uses the **`Intl` APIs for date formatting**, which means you can have locale-aware formatting without having to explicitly specify tokens.

## Notes On The Polyfill

As mentioned earlier, there is a Temporal polyfill available, distributed as an npm package named `@js-temporal/polyfill`. If you want to use Temporal today, you’ll need this polyfill to support browsers like Safari that haven’t shipped the API yet. The bad news with this is that it will add to your bundle size. The good news is that it still adds significantly less than `moment` or `moment-timezone`. Here is a comparison of the bundle sizes as reported by Bundlephobia.com, a website that presents information on npm package sizes (click on each package name to see the Bundlephobia analysis):

Package

Minified

Minified & gzipped

[`@js-temporal/polyfill`](https://bundlephobia.com/package/@js-temporal/polyfill)

154.1 kB

44.1 kB

[`moment`](https://bundlephobia.com/package/moment)

294.4 kB

75.4 kB

[`moment-timezone`](https://bundlephobia.com/package/moment-timezone)

1 MB

114.2 kB

The polyfill also has historically had some performance issues around memory usage, and at the time of writing, it’s considered to be in an alpha state. Because of this, you may not want to use it in production until it reaches a more mature state.

The other good news is that hopefully the polyfill won’t be needed much longer (unless you need to support older browsers, of course). At the time of writing, Temporal has shipped in Chrome, Edge, and Firefox. It’s not quite ready in Safari yet, though it appears to be available with a runtime flag on the latest Technology Preview.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)