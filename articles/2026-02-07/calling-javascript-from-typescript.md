---
title: "Calling JavaScript from TypeScript"
source: "https://tkdodo.eu/blog/calling-java-script-from-type-script"
publishedDate: "2020-09-04"
category: "frontend"
feedName: "TkDodo"
---

![call](https://tkdodo.eu/blog/static/3d66d0041ae18a49abac91d5f78e3d5e/bbe0c/call.jpg "call")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

There is nothing better than starting a new project, on a green field. You can choose all the latest tech you want, and you can begin with great types right from the start.

Obviously, you then wake up from your dream and realise you have to maintain a project with 150k lines of legacy JavaScript code. If you are lucky, the team started to _gradually_ migrate the codebase to TypeScript.

But it will take some time to "get there". Until then, you will need some interoperability between JavaScript and TypeScript.

Being in a JS file and calling a function defined in a .ts is trivial - it just works™. But what about the other way around? Turns out - that's not so easy.

## Example[](#example)

Suppose you have a util function that you would like to import. It could be something as simple as:

utils.js

```
1export const sum = ({ first, second, third }) =>2  first + second + (third ?? 0)
```

A stupid example, I know, but it'll do.

## Setting up tsconfig.json[](#setting-up-tsconfigjson)

You're gonna have to set `allowJs: true` in your tsconfig if you want to be able to import that file. Otherwise, your import will error with:

```
1TS7016: Could not find a declaration file for module './utils'.2'src/utils.js' implicitly has an 'any' type.
```

Of course, I am assuming here that you have `noImplicitAny` turned on as well 😊.

So with allowJs, TypeScript will start to accept .js files, and perform rudimentary type inference on them. The sum util will now be inferred as:

```
1export const sum: function({ first: any, second: any, third: any }): any
```

Which is good enough, not type-safe at all, but that wasn't part of the requirement. With that, we are all set-up. That wasn't hard, so where's the catch?

## The catch[](#the-catch)

Maybe you've already noticed: The third parameter is actually _optional_. So we would like to call our function like that:

the-catch

```
1sum({ first: 1, second: 2 })
```

Comparing this to the inferred type above, we will naturally get:

```
1TS2345: Argument of type '{ first: number; second: number; }' is not assignable to parameter of type '{ first: any; second: any; third: any; }'.2    Property 'third' is missing in type '{ first: number; second: number; }' but required in type '{ first: any; second: any; third: any; }'.
```

## Solutions[](#solutions)

There are multiple solutions to this problem, so you'll have to decide for yourself which one is best suited for your specific case:

### use .d.ts files[](#use-dts-files)

You can turn off `allowJs` and write [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) for all your JavaScript files. Depending on the amount of files, this might be feasible, or not. It can be as easy as this any stub:

utils.d.ts

```
1export const sum: any
```

This is substantially worse than the inferred version. You can of course be more specific than that, but you have to do it manually. And you have to remember to keep the both files in sync, so I'm not a big fan of this solution.

### Don't destruct[](#dont-destruct)

The described problem is actually due to typescript performing better inference if you use destructuring. We could change the implementation to:

no-destruct-utils

```
1export const sum = (params) =>2  params.first + params.second + (params.third ?? 0)
```

Now, TypeScript will just infer params as _any_, and we are again good to go. Especially if you are working with React components, destructing props is very common, so I'd also give this a pass.

### Assign default parameters[](#assign-default-parameters)

default-params

```
1export const sum = ({ first, second, third = 0 }) => first + second + third
```

I like this solution a lot, because the implementation is actually _easier_ than before. The function's _interface_ now shows what is optional, which is why TypeScript also knows that. This works well for variables where the default is clear, like booleans, where you can easily default to _false_.

If you don't know what a good default value would be, you could even cheat a bit and do this:

cheating-default-params

```
1export const sum = ({ first, second, third = undefined }) =>2  first + second + (third ?? 0)
```

🤯

_undefined_ will also be the default value even if you don't explicitly specify it, but now, TypeScript will let you. This is a non-invasive change, so if you have complex types where you can't easily come up with a default value, this seems like a good alternative.

### Convert the file to TypeScript[](#convert-the-file-to-typescript)

ts-all-the-things

```
1type Params = {2  first: number3  second: number4  third?: number5}6export const sum = ({ first, second, third }: Params): number =>7  first + second + (third ?? 0)
```

The long-term thing you probably want to do anyways - convert it to TypeScript. If it's feasible - go for this option.

### Use JsDoc[](#use-jsdoc)

This is the last option I have to offer, and I kinda like it because it represents the middle ground between things just being _any_ and converting the whole file to TypeScript right away.

I never really understood why you would need this, but now I do. Adding JsDoc annotations to your JavaScript functions will:

-   Help TypeScript with type inference, thus making your call sides more safe.
-   Give you IntelliSense in your IDE.
-   Make it easier to finally migrate to TypeScript when the time is right.

with-js-docs

```
1/**2 * @param {{ first: number, second: number, third?: number }} params3 * @returns {number}4 */5export const sum = ({ first, second, third }) =>6  first + second + (third ?? 0)
```

Of course, you can also just type them to any or omit the return type. You can be as specific as you want.

#### Bonus: TypeChecking js files[](#bonus-typechecking-js-files)

If you add the `// @ts-check` comment at the top of your js file, it will be type-checked _almost_ like all your typescript files, and JsDoc annotations will be honoured 😮. You can read more about the differences [here](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files).

## What I ended up doing[](#what-i-ended-up-doing)

I used [JsDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for the first time today when I had this exact problem. I chose it over the other options because:

-   adding .d.ts files is tedious to maintain and will make my IDE stop navigating to the actual source. 😒
-   I wanted to keep the destructuring. 😕
-   Default parameters were hard to come up with as my case was much more complex. 🧐
-   The file in question had 120+ lines of code. 🤨
-   I wanted to make it easier for us to migrate when we fully convert that file. 🚀

* * *

What would you do? Let me know in the comments below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)