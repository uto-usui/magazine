---
title: "React Router v6.3.0"
source: "https://remix.run/blog/react-router-v6%2E3%2E0"
publishedDate: "2022-03-31"
category: "frontend"
feedName: "Remix Blog"
---

I love this phrase from the Ember.js community

> Stability Without Stagnation

Oftentimes you have to trade stability for stagnation: make the package better but break everybody's apps vs. keep APIs stable but never ship a fundamentally better package.

React Router v6 is our best version yet thanks to React Hooks: better composition, more features, simpler APIs and smaller bundles! However, upgrading a mature app from v5 to v6 **all at once** is way too disruptive to your project 😞.

That's why we've released a backwards compatibility package for React Router DOM. It lets you run the new v6 APIs in parallel with your existing v5 code, enabling you to **upgrade incrementally**. The result is a bunch of tiny commits like this:

```
+ import { useParams } from "react-router-dom-v5-compat";

  function Project(props) {
-    const { params } = props.match;
+    const { params } = useParams();
     // ...
  }
```

Change one line of code, commit, and ship. Repeat until you're done. No long-running upgrade branches; no huge time commitments. Spend an hour here and there on the upgrade without disrupting the feature development on your roadmap (or becoming the merge-conflict mentor for your team 😆).

Nothing changes about your v5 code (you don't even change the react-router-dom dependency in package.json), so you can be confident that you aren't accidentally breaking random screens in your app as you incrementally upgrade to v6 APIs.

👉 [View the full v5 to v6 upgrading guide](https://github.com/remix-run/react-router/discussions/8753)

Stability without stagnation. Let us know how it goes!