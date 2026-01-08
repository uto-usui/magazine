---
title: "JavaScript For Everyone: Iterators"
source: "https://smashingmagazine.com/2025/10/javascript-for-everyone-iterators/"
publishedDate: "2025-10-27"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Mat Marquis)"
---

-   9 min read
-   [JavaScript](https://smashingmagazine.com/category/javascript), [Coding](https://smashingmagazine.com/category/coding), [Techniques](https://smashingmagazine.com/category/techniques)

Here is a lesson on Iterators: iterables implement the iterable iteration interface, and iterators implement the iterator iteration interface. Sounds confusing? Mat breaks it all down in the article.

Hey, I’m Mat, but “Wilto” works too — I’m here to teach you JavaScript. Well, not _here_\-here; technically, I’m over at [Piccalil.li’s _JavaScript for Everyone_](https://piccalil.li/javascript-for-everyone) course to teach you JavaScript. The following is an excerpt from the **Iterables and Iterators** module: the lesson on Iterators.

Iterators are one of JavaScript’s more linguistically confusing topics, sailing _easily_ over what is already a pretty high bar. There are _iterables_ — array, Set, Map, and string — all of which follow the **iterable protocol**. To follow said protocol, an object must implement the **iterable interface**. In practice, that means that the object needs to include a `[Symbol.iterator]()` method somewhere in its prototype chain. Iterable protocol is one of two **iteration protocols**. The other iteration protocol is the **iterator protocol**.

See what I mean about this being linguistically fraught? Iterables implement the iterable iteration interface, and iterators implement the iterator iteration interface! If you can say that five times fast, then you’ve pretty much got the gist of it; easy-peasy, right?

No, listen, by the time you reach the end of this lesson, I promise it won’t be half as confusing as it might sound, especially with the context you’ll have from the lessons that precede it.

An **iterable** object follows the iterable protocol, which just means that the object has a conventional method for making iterators. The elements that it contains can be looped over with `for`…`of`.

An **iterator** object follows the iterator protocol, and the elements it contains can be accessed _sequentially_, one at a time.

To _reiterate_ — a play on words for which I do not forgive myself, nor expect you to forgive me — an **iterator** object follows iterator protocol, and the elements it contains can be accessed _sequentially_, one at a time. Iterator protocol defines a standard way to produce a sequence of values, and optionally `return` a value once all possible values have been generated.

In order to follow the iterator protocol, an object has to — you guessed it — implement the **iterator interface**. In practice, that once again means that a certain method has to be available somewhere on the object’s prototype chain. In this case, it’s the `next()` method that advances through the elements it contains, one at a time, and returns an object each time that method is called.

In order to meet the iterator interface criteria, the returned object must contain two properties with specific keys: one with the key `value`, representing the value of the current element, and one with the key `done`, a Boolean value that tells us if the iterator has advanced beyond the final element in the data structure. That’s not an awkward phrasing the editorial team let slip through: the value of that `done` property is `true` only when a call to `next()` results in an attempt to access an element _beyond_ the final element in the iterator, not upon accessing the final element in the iterator. Again, a lot in print, but it’ll make more sense when you see it in action.

You’ve seen an example of a built-in iterator before, albeit briefly:

```
const theMap = new Map([ [ "aKey", "A value." ] ]);

console.log( theMap.keys() );
// Result: Map Iterator { constructor: Iterator() }
```

That’s right: while a Map object itself is an iterable, Map’s built-in methods `keys()`, `values()`, and `entries()` all return Iterator objects. You’ll also remember that I looped through those using `forEach` (a relatively recent addition to the language). Used that way, an iterator is indistinguishable from an iterable:

```
const theMap = new Map([ [ "key", "value " ] ]);

theMap.keys().forEach( thing => {
  console.log( thing );
});
// Result: key
```

All iterators are iterable; they all implement the iterable interface:

```
const theMap = new Map([ [ "key", "value " ] ]);

theMap.keys()[ Symbol.iterator ];
// Result: function Symbol.iterator()
```

And if you’re angry about the increasing blurriness of the line between iterators and iterables, wait until you get a load of this “top ten anime betrayals” video candidate: I’m going to demonstrate how to interact with an iterator by using an array.

“BOO,” you surely cry, having been so betrayed by one of your oldest and most indexed friends. “Array is an itera_ble_, not an itera_tor_!” You are both right to yell at me in general, and right about array in specific — an array _is_ an iterable, not an iterator. In fact, while all iterators are iterable, none of the built-in iterables are iterators.

However, when you call that `[ Symbol.iterator ]()` method — the one that defines an object as an iterable — it returns an iterator object created from an iterable data structure:

```
const theIterable = [ true, false ];
const theIterator = theIterable[ Symbol.iterator ]();

theIterable;
// Result: Array [ true, false ]

theIterator;
// Result: Array Iterator { constructor: Iterator() }
```

The same goes for Set, Map, and — yes — even strings:

```
const theIterable = "A string."
const theIterator = theIterable[ Symbol.iterator ]();

theIterator;
// Result: String Iterator { constructor: Iterator() }
```

What we’re doing here manually — creating an iterator from an iterable using `%Symbol.iterator%` — is precisely how iterable objects work internally, and why they have to implement `%Symbol.iterator%` in order to _be_ iterables. Any time you loop through an array, you’re actually looping through an iterator created from that Array. All built-in iterators _are_ iterable. All built-in iterables can be used to _create_ iterators.

Alternately — _preferably_, even, since it doesn’t require you to graze up against `%Symbol.iterator%` directly — you can use the built-in `Iterator.from()` method to create an iterator object from any iterable:

```
const theIterator = Iterator.from([ true, false ]);

theIterator;
// Result: Array Iterator { constructor: Iterator() }
```

You remember how I mentioned that an iterator has to provide a `next()` method (that returns a very specific Object)? Calling that `next()` method steps through the elements that the iterator contains one at a time, with each call returning an instance of that Object:

```
const theIterator = Iterator.from([ 1, 2, 3 ]);

theIterator.next();
// Result: Object { value: 1, done: false }

theIterator.next();
// Result: Object { value: 2, done: false }

theIterator.next();
// Result: Object { value: 3, done: false }

theIterator.next();
// Result: Object { value: undefined, done: true }
```

You can think of this as a more controlled form of traversal than the traditional “wind it up and watch it go” `for` loops you’re probably used to — a method of accessing elements one step at a time, as-needed. Granted, you don’t _have_ to step through an iterator in this way, since they have their very own `Iterator.forEach` method, which works exactly like you would expect — to a point:

```
const theIterator = Iterator.from([ true, false ]);

theIterator.forEach( element => console.log( element ) );
/* Result:
true
false
*/
```

But there’s another big difference between iterables and iterators that we haven’t touched on yet, and for my money, it actually goes a long way toward making _linguistic_ sense of the two. You might need to humor me for a little bit here, though.

See, an iterable object is an object that is iterable. No, listen, stay with me: you can iterate over an Array, and when you’re done doing so, you can still iterate over that Array. It is, by definition, an object that can be iterated over; it is the essential nature of an iterable to be iterable:

```
const theIterable = [ 1, 2 ];

theIterable.forEach( el => {
  console.log( el );
});
/* Result:
1
2
*/

theIterable.forEach( el => {
  console.log( el );
});
/* Result:
1
2
*/
```

In a way, an iterator object represents the singular _act_ of iteration. Internal to an iterable, it is the mechanism by which the iterable is iterated over, each time that iteration is performed. As a stand-alone iterator object — whether you step through it using the `next` method or loop over its elements using `forEach` — once iterated over, that iterator is _past tense_; it is _iterated_. Because they maintain an internal state, the essential nature of an iterator is to be iterated over, singular:

```
const theIterator = Iterator.from([ 1, 2 ]);

theIterator.next();
// Result: Object { value: 1, done: false }

theIterator.next();
// Result: Object { value: 2, done: false }

theIterator.next();
// Result: Object { value: undefined, done: true }

theIterator.forEach( el => console.log( el ) );
// Result: undefined
```

That makes for neat work when you’re using the Iterator constructor’s built-in methods to, say, filter or extract part of an Iterator object:

```
const theIterator = Iterator.from([ "First", "Second", "Third" ]);

// Take the first two values from `theIterator`:
theIterator.take( 2 ).forEach( el => {
  console.log( el );
});
/* Result:
"First"
"Second"
*/

// theIterator now only contains anything left over after the above operation is complete:
theIterator.next();
// Result: Object { value: "Third", done: false }
```

Once you reach the end of an iterator, the act of iterating over it is complete. Iterated. Past-tense.

And so too is your time in this lesson, you might be relieved to hear. I know this was kind of a rough one, but the good news is: this course is iterable, not an iterator. This step in your iteration through it — this lesson — may be over, but the essential nature of this course is that you can iterate through it again. Don’t worry about committing all of this to memory right now — you can come back and revisit this lesson anytime.

## Conclusion

I stand by what I wrote there, unsurprising as that probably is: this lesson is a tricky one, but listen, _you got this_. [JavaScript for Everyone](https://piccalil.li/javascript-for-everyone) is designed to take you inside JavaScript’s head. Once you’ve started seeing how the gears mesh — seen the fingerprints left behind by the people who built the language, and the good, bad, and sometimes baffling decisions that went into that — no _itera-_, whether _\-ble_ or _\-tor_ will be able to stand in your way.

[![Javascript for everyone course announcement](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/javascript-for-everyone-iterators/1-javascript-for-everyone.png)](https://piccalil.li/javascript-for-everyone)

[JavaScript for Everyone](https://piccalil.li/javascript-for-everyone) is now available and the launch price runs until midnight, October 28. Save £60 off the full price of £249 and get it for £189! ([Large preview](https://files.smashing.media/articles/javascript-for-everyone-iterators/1-javascript-for-everyone.png))

My goal is to teach you the _deep magic_ — the _how_ and the _why_ of JavaScript, using the syntaxes you’re most likely to encounter in your day-to-day work, at your pace and on your terms. If you’re new to the language, you’ll walk away from this course with a foundational understanding of JavaScript worth hundreds of hours of trial-and-error. If you’re a junior developer, you’ll finish this course with a depth of knowledge to rival any senior.

I hope to see you there.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)