---
title: "Proxy and Reflect"
source: "https://piccalil.li/blog/proxy-and-reflect/"
publishedDate: "2026-07-09"
category: "css"
feedName: "Piccalilli"
author: "Mat Marquis"
---

An object is a collection of properti— _hey_! Don’t you roll your eyes at me! Listen, I know that phrase is approaching “mitochondria is the powerhouse of the cell”-level here, but I’m going somewhere new with this, I promise.

Ahem. _An object is a collection of properties_, internal slots, and internal methods that allow us to interact with those properties. When you punch `({}).theProperty` into your developer console, you do so expecting the following choose-your-own-adventure operation to kick off:

-   Is that key somewhere along the object’s prototype chain?
    -   Yes.
        -   Is it a data property?
            -   Result in the property descriptor’s `value`.
        -   Is it an accessor property?
            -   Invoke the getter method, and result in the value returned by the that method.
    -   No.
        -   Result in `undefined`.

This use of property accessor syntax doesn’t _itself_ represent all those steps — rather, dot notation is the API that kicks off an [internal `[[Get]]` operation defined by the specification](https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver), and the steps taken by that `[[Get]]` operation determine the result.

We can’t get in there and tinker with the specific steps taken by an object’s internal methods, nor would we likely want to — that’s JavaScript engine turf. What we can do is _intercept_ those operations by way of a **proxy** object, and in doing so we can alter, expand, or wholesale _redefine_ the way that an object works, at its most fundamental levels.

The `Proxy` constructor can be used to create an object that acts as a proxy for a target object, allowing you to intercept and redefine operations performed on the latter by using the former as an intermediary.

When invoked with `new`, `Proxy` results in an object — no surprises there. It accepts two arguments: a **target object** and a **handler object**:

`const targetObject = {   theProperty: "A string." }; const handlerObject = {}; const theProxyObject = new Proxy( targetObject, handlerObject );  console.log( theProxyObject );  /* Result (Firefox, expanded): Proxy { <target>: {…}, <handler>: {} }   <target>: Object { theProperty: "A string." }   <handler>: Object {  } */  /* Result (Chrome, expanded): Proxy(Object) {theProperty: 'A string.'}   [[Handler]]: Object   [[Target]]: Object   [[IsRevoked]]: false */`

Nothing _too_ surprising in the console, here. Our newly-minted proxy object contains a reference to our target object and a set of internal slots, using that `<>` or `[[]]` notation — depending on the browser — which makes it clear that we’re not meant to interact with these slots _directly_, the way we would interact with a string-based property key. `[[Target]]` is an internal slot representing the the object we want to act on, complete with the property we defined. `[[Handler]]` represents the handler object that acts as an intermediary for interacting with the target object.

If we change the value associated with the property we’ve defined on the target object, that change is reflected by the proxy object’s reference to it:

`const targetObject = {   theProperty: "A string." }; const handlerObject = {}; const theProxyObject = new Proxy( targetObject, handlerObject );  targetObject.theProperty = "Something else.";  console.log( theProxyObject ); /* Result (expanded): Proxy { <target>: {…}, <handler>: {} }   <target>: Object { theProperty: "Something else." }   <handler>: Object {  } */`

At a glance, this feels like some classic “by-reference” stuff — “object values are stored by reference,” “objects are a collection of properties,” “objects are the powerhouse of the script,” _et cetera_. Remember, however, that we’re not talking about variables or properties — in this case, the proxy object is _itself_ a reference to the target object. That proxy object can be used in place of the target object, wholesale:

`const targetObject = {   theProperty: "A string." }; const handlerObject = {}; const theProxyObject = new Proxy( targetObject, handlerObject );  console.log( theProxyObject.theProperty );  // Result: A string.`

Accessing a property of the proxy object is effectively accessing that property on the target object, _by way of_ the proxy object. You can’t define an own property on the proxy object as usual, either — instead, that property will be defined on the target:

`const targetObject = {   theProperty: "A string." }; const handlerObject = {}; const theProxyObject = new Proxy( targetObject, handlerObject );  theProxyObject.theOtherProperty = "Another string";  console.log( theProxyObject );  /* Result (expanded): Proxy { <target>: {…}, <handler>: {} }   <target>: Object { theProperty: "A string.", theOtherProperty: "Another string" }   <handler>: Object {  } */`

Used the way you’ve seen it so far here, well, we’ve basically just created an unusual reference value with extra steps, but that’s only because we’re not asking the handler object to _do_ anything by way of our proxy object — here, the handler object is basically acting as a translator from one language to that same language. The use case becomes a little more clear when we start creating **handler functions** on its handler object, sometimes called **traps**:

`const targetObject = {   theProperty: "A string." }; const handlerObject = {   get() {     return "Something else entirely.";   } }; const theProxyObject = new Proxy( targetObject, handlerObject );  console.log( theProxyObject.theProperty ); // Result: "Something else entirely." )`

There’s a [corresponding trap for every operation that can be performed on an object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions), all named in relatively predictable ways. That `get()` method defined on the handler object is a trap for the `[[Get]]` internal method, which is fired whenever you attempt to access the value of an object property. By making it return an explicit value this way, well, we messed up a perfectly good `[[Get]]` operation is what we did — we’ve intercepted that operation and changed what should result from it. Now no matter what we do with our `targetObject`, attempting to access the value of any property will result in exactly what we said it should:

`const targetObject = {   theProperty: "A string." }; const handlerObject = {   get() {     return "You've just activated my trap function!";   } }; const theProxyObject = new Proxy( targetObject, handlerObject );  console.log( theProxyObject );  /* Result (expanded): Proxy { <target>: {…}, <handler>: {…} }   <target>: Object { theProperty: "A string." }   <handler>: Object { get: get() } */  targetObject.newProperty = true;  console.log( theProxyObject );  /* Result (expanded): Proxy { <target>: {…}, <handler>: {…} }   <target>: Object { theProperty: "A string.", newProperty: true }   <handler>: Object { get: get() } */  console.log( theProxyObject.newProperty ); // Result: You've just activated my trap function!  console.log( theProxyObject[ "newProperty" ] ); // Result: You've just activated my trap function!`

And like any function, we can have that trap function perform whatever tasks we want:

`const targetObject = {   theProperty: true }; const handlerObject = {   get() {     console.log( "Psych!" );     return false;   } }; const theProxyObject = new Proxy( targetObject, handlerObject );  console.log( theProxyObject.theProperty );  /* Result: Psych! false */`

Naturally, that includes manipulating the results of those operations with a little more finesse than a `console.log` and a string. The `get()` method of a handler object accepts three arguments: one representing the target object, one representing the key for the property being accessed, and one representing the “receiver,” which is a little higher-concept: the receiver argument represents the value of `this` within the context of the getter method — a reference to [the object bound to the](https://piccalil.li/blog/javascript-what-is-this/) `get` [method](https://piccalil.li/blog/javascript-what-is-this/) [at the time when that method is invoked](https://piccalil.li/blog/javascript-when-is-this/) — that might sound fraught, as `this` is wont to be, but in most cases that will be the target object.

Given these arguments, we’re able to use our `get` method to access and manipulate the values of our target object’s properties:

`const targetObject = {   theProperty: 10 }; const handlerObject = {   get( target, propertyKey, receiver) {     return target[ propertyKey ] * 2;   } }; const theDoubleObject = new Proxy( targetObject, handlerObject );  console.log( theDoubleObject.theProperty ); // Result: 20`

Every one of an object’s internal methods has a corresponding trap, which means that you’re able to alter the basal behavior of _any object, at every possible level, language-wide_:

`const targetObject = {   theProperty: "Still here." };  const handlerObject = {   deleteProperty( target, key) {     console.log( "No." );     return false;   },   has( target, key ) {     console.log( "None of your business." );     return false;   },   getPrototypeOf( target ) {     console.log( "Who knows?" );     return null;   } };  const theImmovableObject = new Proxy( targetObject, handlerObject );  delete theImmovableObject.theProperty; /* Result: No. false */  console.log( theImmovableObject.theProperty ); // Result: Still here.  console.log( "theProperty" in theImmovableObject ); /* Result:  None of your business. false */  console.log( Object.getPrototypeOf( theImmovableObject ) ); /* Result:  Who knows? null */`

So, y’know, just make sure you do it right.

No pressure or anything.

Oh, hey, speaking-of:

[Advert![Save 20% on all courses using the code NEXTLEVEL.](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Reflect](#reflect)

You might have noticed a few things about the code examples you’ve seen so far here. One, we’re partying like it’s 2009 — accessing properties using _olde timey_ bracket notation.

Two, it’s a little unsettling to `[[Get]]` a property value within the context of changing the way `[[Get]]`\-ing a property value works, using the very syntaxes we’re changing. It works fine, but the vibes, in strict technical terms, are _off_.

Third, and by _far_ most importantly: breaking with assumptions as major as “when I create a property on an object, it will happen the way I expect” will _absolutely_ lead to issues in our code somewhere down the line, if not right away. Being able to alter the essential nature of objects themselves draws a razor-thin line between “exciting” and “terrifying,” especially when it comes to future maintainability, and the idea of working on a codebase littered with objects that _may or may not work like objects_ is the stuff of nightmares.

For that reason, the [ES-262 specification helpfully outlines the following **invariants**](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-set-p-v-receiver) for, say, `[[Set]]` — that is, the rules that a `[[Set]]` operation must follow:

> -   The result of \[\[Set\]\] is a Boolean value.
> -   Cannot change the value of a property to be different from the value of the corresponding target object property if the corresponding target object property is a non-writable, non-configurable own data property.
> -   Cannot set the value of a property if the corresponding target object property is a non-configurable own accessor property that has `undefined` as its \[\[Set\]\] attribute.

Once you start tinkering with how a `[[Set]]` operation works, well, following those rules is now on you. If I were to write something along the lines of the following:

`const handlerObject = {   set( target, propertyKey, value, receiver) {     return target[ propertyKey ] = value * 2;   } };  const setDoubler = new Proxy( {}, handlerObject );  setDoubler.theProperty = 2;  console.log( setDoubler.theProperty ); // Result: 4`

My `[[Set]]` operation didn’t return a boolean value the way JavaScript expects, per the sacred invariant rules of `[[Set]]`. I mean, this snippet will still _work,_ in that we’re outside strict mode, the returned value is coerced to a Boolean, and this one happens to be truthy. It won’t work in every context:

`"use strict"; const handlerObject = {   set( target, propertyKey, value, receiver) {     return target[ propertyKey ] = value * 2;   } };  const setDoubler = new Proxy( {}, handlerObject );  setDoubler.theProperty = 0;  console.log( setDoubler.theProperty );  // Result: Uncaught TypeError: proxy set handler returned false for property '"theProperty"'`

We could rewrite this to explicitly `return` that expected boolean value, naturally, but even dealing with this simple handler method we find ourselves in “I need to be careful to always do _this_ in _this_ way” territory lest we introduce fundamentally bugged objects to our codebase. Nobody needs that.

That brings us to the `Reflect` object: a collection of static methods, each with the same name and parameters as our proxy handler methods. `Reflect` gives us some guardrails to address all of the above concerns (bad vibes and all) by providing us with a set of methods for interacting with objects that all ensure we never deviate too far from how objects are _meant_ to work.

`Reflect` is a **namespace object** — an ordinary object made up of static properties and methods, like the `Math` or [`Temporal`](https://piccalil.li/blog/date-is-out-and-temporal-is-in/) objects:

`console.log( Reflect );  /* Result (expanded):   apply: function apply()   construct: function construct()   defineProperty: function defineProperty()   deleteProperty: function deleteProperty()   get: function get()   getOwnPropertyDescriptor: function getOwnPropertyDescriptor()   getPrototypeOf: function getPrototypeOf()   has: function has()   isExtensible: function isExtensible()   ownKeys: function ownKeys()   preventExtensions: function preventExtensions()   set: function set()   setPrototypeOf: function setPrototypeOf()   Symbol(Symbol.toStringTag): "Reflect" */`

Every one of those methods maps to the names of your proxy object handler methods and expects the same parameters, in the same way — their syntax matches the context we’re working in much more than bracket notation. That alone works _wonders_ for the vibes, if you ask me:

`const handlerObject = {   set( target, propertyKey, value) {     return Reflect.set( target, propertyKey, value * 2 );   } };  const setDoubler = new Proxy( {}, handlerObject );  setDoubler.theProperty = 2;  console.log( setDoubler.theProperty ); // Result: 4`

No fuss, no muss, and — most importantly — no poring over the ES-262 specification to ensure that we’re not accidentally deviating from _The Rules of Objects as They Are Played_, because `Reflect.set()` performs the `[[Set]]` operation we want _and_ returns the expected boolean value, per the specification. With `Proxy` we can change how objects work, and with `Reflect` we can make sure our changed objects still work the way objects are _meant_ to.

[Advert![Save 20% on all courses, using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Putting it together](#putting-it-together)

When we put this all together, we can use proxy objects and `Reflect` to perform tasks like validating data:

`const validationHandler = {   set( target, propertyKey, value, receiver ) {     if( typeof value === "string" ) {       return Reflect.set( target, propertyKey, value );     } else {       console.error( "This object only accepts strings." );       return false;     }   } }; const validatedObject = new Proxy({}, validationHandler );  validatedObject.newProperty = true; // Result: This object only accepts strings.  console.log( validatedObject ); /* Result: Proxy { <target>: {}, <handler>: {…} }   <target>: Object {  }   <handler>: Object { set: set(target, propertyKey, value, receiver) } */`

…Or [setting and maintaining the internal state of an object](https://codepen.io/Wilto/pen/dPNNKdJ) — for example, the number of times an object’s given property has been accessed:

`const handlerObject = {   accessCounter( target, accessed) {     Reflect.set( target, "timesAccessed", accessed ? accessed + 1 : 1 );   },   set( target, key, value) {     this.accessCounter( target, Reflect.get( target, "timesAccessed" ) );      return Reflect.set( target, key, value );   },   get( target, key) {     this.accessCounter( target, Reflect.get( target, "timesAccessed" ) );      return Reflect.get( target, key );   } };  const stateObject = new Proxy({}, handlerObject );  console.log( stateObject );  /* Result (expanded): Proxy { <target>: {…}, <handler>: {…} }   <target>: Object {  }   <handler>: Object { accessCounter: accessCounter(accessed), set: set(target, propertyKey, value, receiver), get: get(target, propertyKey, receiver) } */  stateObject.newProperty = true; // Result: true  console.log( stateObject ); /* Result (expanded): Proxy { <target>: {…}, <handler>: {…} }   <target>: Object { timesAccessed: 1, newProperty: true }   <handler>: Object { accessCounter: accessCounter(accessed), set: set(target, propertyKey, value, receiver), get: get(target, propertyKey, receiver) } */  console.log( stateObject.newProperty ); // Result: true  console.log( stateObject ); /* Result (expanded): Proxy { <target>: {…}, <handler>: {…} }   <target>: Object { timesAccessed: 2, newProperty: true }   <handler>: Object { accessCounter: accessCounter(accessed), set: set(target, propertyKey, value, receiver), get: get(target, propertyKey, receiver) } */`

Those are kind of novelties when we’re acting on a single object, sure — but with the [approaches and syntaxes you’ve already learned](https://piccalil.li/javascript-for-everyone) and a little imagination, it isn’t hard to see where proxy objects could be used to create an entire state _system_ with just a few more lines of code, and without the need for bulky frameworks or third-party tools:

```function reactiveState( target) {   const subscribed = new Map();    return new Proxy({     ...target,     subscribe( key, callbackFunc) {         // If it isn't there already, add it to `subscribed`:         if( !subscribed.has( key ) ) {           subscribed.set( key, [] );         }         // Associate the callback function with the subscribed object:         subscribed.get( key ).push( callbackFunc );       }     }, {       set( target, key, value, receiver) {         const result = Reflect.set( target, key, value );          // If this is the subscribed-to property...         if( subscribed.has( key ) ) {           // ...invoke the callback function with the explicit `this` value of the original object:           subscribed.get( key ).forEach( callbackFunc => callbackFunc.call( receiver, key ) );         }          return result;       }     }); }  // Declare a callback function to be called when the state of an object changes: const callbackLogger = function( key) {   const enCardinal = new Intl.PluralRules( "en-US" );   const counter = this[ key ];   const pluralize = count => enCardinal.select( counter ) === "one" ? `` : `s`;    console.info(`${this.component }.${ key } has been changed ${ counter } time${ pluralize( counter ) }.`); };  const widget = reactiveState({ component: "widget", count: 0 }); const gizmo = reactiveState({ component: "gizmo", otherCounter: 0 });  // When the `count` property of our widget object changes, call the callbackLogger: widget.subscribe( 'count', callbackLogger );  // When the `otherCounter` property of our gizmo object changes, call the callbackLogger: gizmo.subscribe( 'otherCounter', callbackLogger );  widget.count++; // Result: widget.count has been changed 1 time.  widget.count++; // Result: widget.count has been changed 2 times.  // We're not subscribed to a `count` property for the gizmo object, so nothing happens here: gizmo.count++;  // But we _are_ subscribed to an `otherCounter` property for the gizmo object: gizmo.otherCounter++; // Result: gizmo.otherCounter has been changed 1 time.  widget.count++; // Result: widget.count has been changed 3 times.```

Now, listen. I don’t want to trot out any _more_ cliches here, but I won’t deny that there’s an impulse to wrap this lesson up with a call for temperance — to leave you with a warning about how proxy objects are “as powerful as they are dangerous,” and “great power-slash-responsibility” and _et cetera_, then maybe a little bit about how there is, at least, some cold comfort to be found in `Reflect`. That’s not coming from _nowhere_, that impulse — altering how the principle building blocks of a language work, at their most fundamental levels, can break stuff _pretty bad_. No two ways about that.

You know me, though: if I wanted to spend my cortisol on “worrying about getting things wrong,” I would’ve gone to medical school or learned PHP. If you ask me, `Proxy` and `Reflect` are brand new, shining examples of the enduring spirit of JavaScript: use the language to change the language, and find new ways to solve problems never even imagined by the hundreds of people who’ve gotten a hand on [the ball](https://262.ecma-international.org/16.0/index.html) since 1995.

The `Reflect` object gives you some vital future-headache-prevention guardrails, and you should use them, of course — that’s what they’re there for.

I won’t tell you to “be careful,” though. Get in there and break stuff; there’s no better way to learn. Besides, nothin’ reloading the page can’t fix, right?

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_