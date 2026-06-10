---
title: "How to center an element horizontally and vertically"
source: "https://css-generators.com/center/"
publishedDate: "2026-06-09"
category: "design"
feedName: "Sidebar"
---

Do you still think centering in CSS is hard? Find below **100** different methods to center a **single element** inside a container.

```
<div class="container">
  <div class="item">Content</div>
</div> 
```

Many of the methods are hacky and not recommended, but it's funny to illustrate all the possible ways to center an element.  
Have fun and avoid using the **red codes**!

`.container { display: grid; place-content: center; }`

`.container { display: grid; place-content: space-around; }`

`.container { display: grid; place-content: space-evenly; }`

`.container { display: grid; place-items: center; }`

`.container { display: grid; } .item { place-self: center; }`

`.container { display: grid; } .item { margin: auto; }`

`.container { display: grid; grid: 1fr auto 1fr/1fr auto 1fr; } .item { grid-area: 2/2; }`

`.container { display: grid; grid: 1fr [x] auto [x] 1fr/ 1fr [x] auto [x] 1fr; } .item { grid-area: x; }`

`.container { display: flex; align-items: center; justify-content: center; }`

`.container { display: flex; align-items: center; justify-content: space-around; }`

`.container { display: flex; align-items: center; justify-content: space-evenly; }`

`.container { display: flex; flex-wrap: wrap; place-content: center; }`

`.container { display: flex; flex-wrap: wrap; place-content: space-around; }`

`.container { display: flex; flex-wrap: wrap; place-content: space-evenly; }`

`.container { display: flex; } .item { margin: auto; }`

`.container { display: flex; justify-content: center; } .item { align-self: center; }`

`.container { display: flex; justify-content: space-around; } .item { align-self: center; }`

`.container { display: flex; justify-content: space-evenly; } .item { align-self: center; }`

`.container { display: flex; align-items: center; } .container:before, .container:after { content: ""; flex: 1; }`

`.container { display: flex; } .container:before, .container:after { content: ""; flex: 1; } .item { align-self: center; }`

`.container { display: block; align-content: center; justify-items: center; }`

`.container { display: block; align-content: space-around; justify-items: center; }`

`.container { display: block; align-content: space-evenly; justify-items: center; }`

`.container { display: block; align-content: center; } .item { justify-self: center; }`

`.container { display: block; align-content: space-around; } .item { justify-self: center; }`

`.container { display: block; align-content: space-evenly; } .item { justify-self: center; }`

`.container { display: block; align-content: center; } .item { width: fit-content; margin: auto; }`

`.container { display: block; align-content: center; } .item { max-width: max-content; margin: auto; }`

`.container { display: block; align-content: center; text-align: center; } .item { display: inline-block; }`

`.container { display: block; align-content: center; } .item { display: table; margin: auto; }`

`.container { display: block; text-align: center; } .item { position: relative; top: 50%; translate: 0 -50%; display: inline-block; }`

`.container { display: block; } .item { position: relative; top: 50%; translate: 0 -50%; width: fit-content; margin: auto; }`

`.container { display: block; } .item { position: relative; top: 50%; translate: 0 -50%; max-width: max-content; margin: auto; }`

`.container { display: block; } .item { position: relative; top: 50%; translate: 0 -50%; display: table; margin: auto; }`

`.container { display: block; align-content: center; } .item { position: relative; left: 50%; translate: -50%; display: inline-block; }`

`.container { display: block; align-content: center; } .item { position: relative; left: 50%; translate: -50%; display: table; }`

`.container { display: block; align-content: center; } .item { position: relative; left: 50%; translate: -50%; width: fit-content; }`

`.container { display: block; align-content: center; } .item { position: relative; left: 50%; translate: -50%; max-width: max-content; }`

`.container { display: block; align-content: center; } .item { position: relative; left: 50%; translate: -50%; float: left; }`

`.container { display: block; align-content: center; } .item { position: relative; right: 50%; translate: 50%; float: right; }`

`.container { display: block; } .item { position: relative; inset: 50% 0 0 50%; translate: -50% -50%; display: inline-block; }`

`.container { display: block; } .item { position: relative; inset: 50% 0 0 50%; translate: -50% -50%; display: table; }`

`.container { display: block; } .item { position: relative; inset: 50% 0 0 50%; translate: -50% -50%; width: fit-content; }`

`.container { display: block; } .item { position: relative; inset: 50% 0 0 50%; translate: -50% -50%; max-width: max-content; }`

`.container { display: block; } .item { position: relative; inset: 50% 0 0 50%; translate: -50% -50%; float: left; }`

`.container { display: block; } .item { position: relative; inset: 50% 50% 0 auto; translate: 50% -50%; float: right; }`

`.container { position: relative; } .item { position: absolute; inset: 0; place-self: center; }`

`.container { position: relative; } .item { position: absolute; inset: 0; width: fit-content; height: fit-content; margin: auto; }`

`.container { position: relative; } .item { position: absolute; inset: 0; max-width: max-content; max-height: max-content; margin: auto; }`

`.container { position: relative; } .item { position: absolute; inset: 50% auto auto 50%; translate: -50% -50%; }`

`.container { position: relative; } .item { position: absolute; inset: auto auto 50% 50%; translate: -50% 50%; }`

`.container { position: relative; } .item { position: absolute; inset: 50% 50% auto auto; translate: 50% -50%; }`

`.container { position: relative; } .item { position: absolute; inset: auto 50% 50% auto; translate: 50% 50%; }`

`.container { contain: layout; } .item { position: fixed; inset: 0; place-self: center; }`

`.container { contain: layout; } .item { position: fixed; inset: 0; width: fit-content; height: fit-content; margin: auto; }`

`.container { contain: layout; } .item { position: fixed; inset: 0; max-width: max-content; max-height: max-content; margin: auto; }`

`.container { contain: layout; } .item { position: fixed; inset: 50% auto auto 50%; translate: -50% -50%; }`

`.container { contain: layout; } .item { position: fixed; inset: auto auto 50% 50%; translate: -50% 50%; }`

`.container { contain: layout; } .item { position: fixed; inset: 50% 50% auto auto; translate: 50% -50%; }`

`.container { contain: layout; } .item { position: fixed; inset: auto 50% 50% auto; translate: 50% 50%; }`

`.container { display: block; container-type: size; text-align: center; } .container:before { content: ""; line-height: 100cqb; } .item { display: inline-block; }`

`.container { display: block; container-type: size; text-align: center; } .container:before { content: ""; display: inline-block; height: 100cqb; vertical-align: middle; } .item { display: inline-block; }`

`.container { display: block; container-type: size; } .item { margin: 50cqb 0 0 50%; translate: -50% -50%; display: inline-block; }`

`.container { display: block; container-type: size; } .item { margin: 50cqb 0 0 50%; translate: -50% -50%; width: fit-content; }`

`.container { display: block; container-type: size; } .item { margin: 50cqb 0 0 50%; translate: -50% -50%; float: left; }`

`.container { display: block; container-type: size; } .item { margin: 50cqb 50% 0 0; translate: 50% -50%; float: right; }`

`.container { display: block; container-type: size; } .item { display: inline-block; translate: calc(50cqi - 50%) calc(50cqb - 50%); }`

`.container { display: block; container-type: size; } .item { width: fit-content; translate: calc(50cqi - 50%) calc(50cqb - 50%); }`

`.container { display: block; container-type: size; } .item { float: left; translate: calc(50cqi - 50%) calc(50cqb - 50%); }`

`.container { display: block; container-type: size; } .item { float: right; translate: calc(50% - 50cqi) calc(50cqb - 50%); }`

`.container { position: relative; container-type: size; } .item { position: absolute; translate: calc(50cqi - 50%) calc(50cqb - 50%); }`

`.container { contain: layout; container-type: size; } .item { position: fixed; translate: calc(50cqi - 50%) calc(50cqb - 50%); }`

Starting from here, I may consider fixed values for the **width**/**height** of the item (**200px** x **100px**).

`.container { display: block; align-content: center; } .item { margin: 0 max(0px,50% - **200px**/2); }`

`.container { display: block; align-content: space-around; } .item { margin: 0 max(0px,50% - **200px**/2); }`

`.container { display: block; align-content: space-evenly; } .item { margin: 0 max(0px,50% - **200px**/2); }`

`.container { display: block; } .item { position: relative; height: **100px**; top: calc(50% - **100px**/2); margin: 0 max(0px,50% - **200px**/2); }`

`.container { display: block; } .item { position: relative; height: **100px**; width: **200px**; inset: calc(50% - **100px**/2) 0 0 calc(50% - **200px**/2); }`

`.container { display: block; container-type: size; } .item { height: **100px**; margin: max(0px,50cqb - **100px**/2) max(0px,50% - **200px**/2); }`

`.container { display: block; container-type: size; } .item { height: stretch; margin: max(0px,50cqb - **100px**/2) max(0px,50% - **200px**/2); }`

`.container { position: relative; } .item { position: absolute; inset: calc(50% - **100px**/2) calc(50% - **200px**/2); }`

`.container { contain: layout; } .item { position: fixed; inset: calc(50% - **100px**/2) calc(50% - **200px**/2); }`

Starting from here, I will consider the **height** of the container to be a known and fixed value (**300px**).

`.container { display: block; line-height: **300px**; text-align: center; } .item { display: inline-block; line-height: initial; }`

`.container { display: block; text-align: center; } .container:before { content: ""; line-height: **300px**; } .item { display: inline-block; }`

`.container { display: block; text-align: center; } .container:before { content: ""; height: **300px**; display: inline-block; vertical-align: middle; } .item { display: inline-block; }`

`.container { display: block; height: **300px**; } .container:before { content: ""; display: block; height: calc(50% - **100px**/2); } .item { height: **100px**; margin: 0 max(0px,50% - **200px**/2); }`

`.container { display: block; } .container:before, .container:after { content: ""; display: block; height: calc((**300px** - **100px**)/2); } .item { height: **100px**; margin: 0 max(0px,50% - **200px**/2); }`

`.container { display: block; box-sizing: border-box; padding-block: calc((**300px** - **100px**)/2); } .item { height: **100px**; margin: 0 max(0px,50% - **200px**/2); }`

`.container { display: block; } .item { height: **100px**; margin: calc((**300px** - **100px**)/2) max(0px,50% - **200px**/2); }`

`.container { display: block; height: **300px**; } .item { position: relative; height: **100px**; width: **200px**; inset: calc((**300px** - **100px**)/2) 0 0 calc(50% - **200px**/2); }`

Starting from here, I will consider the **width** of the container to be a known and fixed value (**400px**).

`.container { display: table-cell; width: **400px**; vertical-align: middle; } .item { width: fit-content; margin: auto; }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; } .item { display: table; margin: auto; }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; text-align: center; } .item { display: inline-block; }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; } .item { width: fit-content; translate: calc(**400px**/2 - 50%); }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; } .item { display: inline-block; translate: calc(**400px**/2 - 50%); }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; } .item { display: table; translate: calc(**400px**/2 - 50%); }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; } .item { float: left; translate: calc(**400px**/2 - 50%); }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; } .item { float: right; translate: calc(50% - **400px**/2); }`

`.container { display: table-cell; width: **400px**; vertical-align: middle; box-sizing: border-box; padding: 0 calc((**400px** - **200px**)/2); }`

`.container { display: inline-block; align-content: center; padding: 0 calc((**400px** - **200px**)/2); } .item { width: **200px**; }`

`.container { display: inline-block; padding: calc((**300px** - **100px**)/2) calc((**400px** - **200px**)/2); } .item { height: **100px**; width: **200px**; }`

I didn't consider all the possible combinations, yet I was still able to reach **100 different codes**.  
Let's stop here, and **don't use the red codes**!