---
title: "Today's Javascript, from an outsider's perspective"
source: "https://lea.verou.me/2020/05/todays-javascript-from-an-outsiders-perspective/"
publishedDate: "2020-05-25"
category: "css"
feedName: "Lea Verou"
---

## Today’s Javascript, from an outsider’s perspective

Today I tried to help a friend who is a great computer scientist, but not a JS person use a JS module he found on Github. Since for the past 6 years my day job is doing usability research & teaching at MIT, I couldn’t help but cringe at the slog that this was. Lo and behold, a pile of unnecessary error conditions, cryptic errors, and lack of proper feedback. And I don’t feel I did a good job communicating the frustration he went through in the one hour or so until he gave up.

It went a bit like this…

Note: N\_ames of packages and people have been changed to protect their identity. I’ve also omitted a few issues he faced that were too specific to the package at hand. Some of the errors are reconstructed from memory, so let me know if I got anything wrong!\_

**John:** Hey, I want to try out this algorithm I found on Github, it says to use `import functionName from packageName` and then call `functionName(arguments)`. Seems simple enough! I don’t really need a UI, so I’m gonna use Node!

**Lea:** Sure, Node seems appropriate for this!

John _runs `npm install packageName --save` as recommended by the package’s README_ John _runs `node index.js`_

**Node:**

Warning: To load an ES module, set “type”: “module” in the package.json or use the .mjs extension. SyntaxError: Cannot use import statement outside a module

**John:** But I don’t have a package.json… **Lea:** Run `npm init`, it will generate it for you!

_John runs `npm init`, goes through the wizard, adds `type: "module"`_ manually to the generated package.json. John _runs `node index.js`_

**Node:**

SyntaxError: Cannot use import statement outside a module

Oddly, the error was thrown from an internal module of the project this time. WAT?!

**Lea:** Ok, screw this, just run it in a browser, it’s an ES6 module and it’s just a pure JS algorithm that doesn’t use any Node APIs, it should work.

John _makes a simple index.html with a `<script type="module" src="index.js">`_ John _loads index.html in a browser_

Nothing in the console. Nada. Crickets. 🦗

**Lea:** Oh, you need to adjust your module path to import packageName. Node does special stuff to resolve based on `node_modules`, now you’re in a browser you need to specify an explicit path yourself.

_John looks, at his filesystem, but there was no node\_modules directory._

**Lea:** Oh, you ran `npm install` before you had a `package.json`, that’s probably it! Try it again!

_John runs `npm install packageName --save` again_

**John:** Oh yeah, there is a node\_modules now!

John _desperately looks in `node_modules` to find the entry point_ John _edits his index.js accordingly, reloads index.html_

**Firefox:**

Incorrect MIME type: text/html

**Lea:** Oh, you’re in `file://`! Dude, what are you doing these days without a localhost? Javascript is severely restricted in `file://` today.

**John:** But why do I… ok fine, I’m going to start a localhost.

John _starts localhost_, visits his index.html under [http://localhost:80](http://localhost/)

**Firefox:**

Incorrect MIME type: text/html

**John:** Sigh. Do I need to configure my localhost to serve JS files with a `text/javascript` MIME type? **Lea:** What? No! It knows this. Um… look at the Networks tab, I suspect it can’t find your module, so it’s returning an HTML page for the 404, then it complains because the MIME type of the error page is not `text/javascript`.

_Looks at node\_modules again, corrects path. Turns out VS Code collapses folders with only 1 subfolder, which is why we hadn’t noticed_.

FWIW I do think this is a good usability improvement on VS Code’s behalf, it improves efficiency, but they need to make it more visible that this is what has happened.

**Firefox:**

SyntaxError: missing ) after formal parameters

**Lea:** What? That’s coming from the package source, it’s not your fault. I don’t understand… can we look at this line?

_John clicks at line throwing the error_

**Lea:** Oh my goodness. This is not Javascript, it’s Typescript!! With a .js extension!! **John:** I just wanted to run one line of code to test this algorithm… 😭😭😭

_John gives up_. _Concludes never to touch Node, npm, or ES6 modules with a barge pole._

The End.

Note that John is a computer scientist that knows a fair bit about the Web: He had Node & npm installed, he knew what MIME types are, he could start a localhost when needed. What hope do actual novices have?