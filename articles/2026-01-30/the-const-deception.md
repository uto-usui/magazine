---
title: "The “const” Deception"
source: "https://www.joshwcomeau.com/javascript/the-const-deception/"
publishedDate: "2023-04-24"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

The `const` keyword in JavaScript is used to declare a constant. Constants are often thought of as “variables that can't change”:

```
const hi = 5;

hi = 10;
// 🛑 Uncaught TypeError: Assignment to constant variable.

console.log(hi);
// -> 5
```

Curiously, though, when I create an _object_ using const, I'm free to change it:

```
const person = {
  name: 'Hassan',
};

person.name = 'Sujata';
// Seems to work?? 🤔

console.log(person);
// -> { name: 'Sujata' }
```

How come I was able to change the `person` variable? I used `const`!

To make sense of this apparent contradiction, we need to learn about the difference between _assignment_ and _mutation_. This is a core concept in JavaScript, and _so many things_ make more sense when you have a clear understanding of this distinction.

Let's go!

## [Link to this heading](#variable-names-as-labels-1)Variable names as labels

So, here's a perfectly-valid JavaScript program:

```
5;
```

Here's another one:

```
['apple', 'banana', 'cherry'];
```

In both of these examples, I'm creating some _stuff_. A number, and an array. When the code runs, this data will be created and stored in the computer's memory.

These programs aren't terribly useful, however. I'm creating some data, but I have no way of accessing it!

Variables allow us to stick a label on the stuff we create, so that we can reference it later:

```
// Create it now...
const fruits = ['apple', 'banana', 'cherry'];

// ...and access it later:
console.log(fruits);
// -> ['apple', 'banana', 'cherry']
```

When I was first learning to program, I thought that the code was executed from left to right: first we create a `fruits` variable, like an empty box, and then we assemble our array within that box.

It turns out that this isn't really the right mental model. It's more accurate to say that the array gets created first, and then we point our `fruits` label at it.

## [Link to this heading](#reassigning-our-labels-2)Reassigning our labels

When we use the `let` keyword to create a variable, we're able to change which “thing” that label refers to.

For example, we can point our `fruits` label at a new value:

letfruits

\['apple', 'banana', 'cherry'\]

\['durian', 'eggplant', 'fig'\]

\['honeydew'\]

27

null

![](https://www.joshwcomeau.com/images/the-const-deception/reassignable-thumbnail.png)

This is known as _re-assignment._ We're saying that actually, the `fruits` label should refer to an _entirely different value:_

```
// We start with a labeled array:
let fruits = ['apple', 'banana', 'cherry'];

// ⚠️⚠️⚠️⚠️
// Pick a different option from the list above
// to see how it translates in code!
```

We're not modifying the _data_, we're modifying the _label_. We're detaching it from that original array, and connecting it to a new one.

By contrast, variables created with `const` **cannot be reassigned:**

constfruits

\['apple', 'banana', 'cherry'\]

\['durian', 'eggplant', 'fig'\]

null

![Diagram showing that the “fruits” constant is locked to a specific value.](https://www.joshwcomeau.com/images/the-const-deception/locked-variable-thumbnail.png)

This is the fundamental difference between `let` and `const`. When we use `const`, we create an indestructible link between a variable name and a piece of data.

**Here's the thing, though:** we're still allowed to modify the data itself! As long as the label remains intact.

For example, with an array, we can add/remove items from that array without issue. The `fruits` variable is still connected to the same array:

constfruits

\[ apple,\]

In code, this would look something like this:

```
// Point the `fruits` label at this array:
const fruits = ['apple'];

// ⚠️ Click the “Add Item” button to mutate the array!
```

This is known as _mutation._ We're editing the value of the array by adding / removing items.

Here's another example, using an object instead of an array. We can edit the keys/values _within_ the object, as long as the label keeps pointing to the same object:

constevent

{

title: ,

startsAt: "2023-05-29T16:00:00Z",

duration: 4,

confirmed: true,

}

**You can edit the `title` property.** This is equivalent to the following JS code:

```
const event = {
  title: 'Change me!',
  startsAt: '2023-05-29T16:00:00Z',
  duration: 4,
  confirmed: true,
};
```

**There's a fundamental distinction between _re-assignment_** (pointing a variable name at a new thing) **and _mutation_** (editing the data within the thing)**.**

When we create a constant with `const`, we can be 100% sure that the variable will never be _re-assigned_, but no promises are made when it comes to mutation. **`const` doesn't block mutation at all.**

**There's one more wrinkle here, too:** “primitive” data types like strings and numbers are _immutable_. This makes things even more confusing. We'll discuss in the next section.

## [Link to this heading](#primitive-data-types-3)Primitive data types

So far, all of the examples we've seen have involved objects and arrays. But what about if we have a “primitive” data type, like a string, a number, or a boolean value?

Let's use a number as an example:

```
let age = 36;

age = 37;
```

How should we interpret this? Are we _reassigning_ the `age` label to a new value, or are we _mutating_ this number, editing `36` to be `37`?

**Here's the deal:** all primitive data types in JavaScript are _immutable_. It's impossible to "edit" the value of a number. We can only reassign the variable to a different value.

Here's how I like to think about it: Pretend that there's a big list of all possible numbers. We've assigned our `age` variable to the number 36, but we can point it at any other number in our list:

letage

30

31

32

33

34

35

36

37

38

39

40

41

42

![](https://www.joshwcomeau.com/images/the-const-deception/infinite-number-picker-thumbnail.png)

To be clear, the browser doesn't _literally_ have a big index of all possible numbers. The point I'm hoping to illustrate here is that the _numbers themselves_ can't be changed. We can only change which number the label is pointing to.

This is true for all primitive value types, including strings, boolean values, null, and so on.

## [Link to this heading](#additional-resources-4)Additional resources

JavaScript is a deceptively tricky language, and it takes a long time to get really comfortable with it!

Here are some additional resources you might find useful:

-   If you enjoy my teaching style, I have [a couple of courses](https://www.joshwcomeau.com/courses/) you might find useful!
    

### Last updated on

June 27th, 2023