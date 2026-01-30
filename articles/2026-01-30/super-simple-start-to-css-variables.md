---
title: "Super Simple Start to css variables"
source: "https://kentcdodds.com/blog/super-simple-start-to-css-variables"
publishedDate: "2020-10-03"
category: "frontend"
feedName: "Kent C. Dodds"
---

If you're like me, you're a little late to the game on CSS variables. Maybe you (like me) have been enjoying using _real JavaScript_ variables with [CSS-in-JS](https://emotion.sh/). But darn it, smart people I know and respect say it's amazing and I should just embrace this relatively newish piece of the platform.

When I'm getting started with something, I really appreciate getting a super simple start to it, so here you go.

I heard "CSS Variables" and "CSS Custom Properties" thrown around a bit in conversation and didn't really understand the difference. Turns out [they're the same thing](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 🤦‍♂️ The technical term is "CSS Custom Properties", but it's often called "CSS Variables".

Ok, so here you go. Your quick-start to custom properties:

```
<html>
	<style>
		:root {
			--color: blue;
		}
		.my-text {
			color: var(--color);
		}
	</style>
	<body>
		<div class="my-text">This will be blue</div>
	</body>
</html>
```

`:root` is a pseudo-class that matches `<html>`. Actually, it's exactly the same as if we had used `html` in place of `:root` (except it has higher specificity).

Just like everything else in CSS, you can scope your custom properties to sections of the document. So, rather than `:root`, we could use regular selectors:

```
<html>
	<style>
		.blue-text {
			--color: blue;
		}
		.red-text {
			--color: red;
		}
		.my-text {
			color: var(--color);
		}
	</style>
	<body>
		<div class="blue-text">
			<div class="my-text">This will be blue</div>
		</div>
		<div class="red-text">
			<div class="my-text">This will be red</div>
		</div>
	</body>
</html>
```

The cascade also applies here:

```
<html>
	<style>
		.blue-text {
			--color: blue;
		}
		.red-text {
			--color: red;
		}
		.my-text {
			color: var(--color);
		}
	</style>
	<body>
		<div class="blue-text">
			<div class="my-text">This will be blue</div>
			<div class="red-text">
				<div class="my-text">
					This will be red (even though it's within the blue-text div, the
					red-text is more specific).
				</div>
			</div>
		</div>
	</body>
</html>
```

And you can even change the custom property value using JavaScript:

```
<html>
	<style>
		.blue-text {
			--color: blue;
		}
		.red-text {
			--color: red;
		}
		.my-text {
			color: var(--color);
		}
	</style>
	<body>
		<div class="blue-text">
			<div class="my-text">
				This will be green (because the JS will change the color property)
			</div>
			<div class="red-text">
				<div class="my-text">
					This will be red (even though it's within the blue-text div, the
					red-text is more specific).
				</div>
			</div>
		</div>
		<script>
			const blueTextDiv = document.querySelector('.blue-text')
			blueTextDiv.style.setProperty('--color', 'green')
		</script>
	</body>
</html>
```

So there you go, that's your super simple start. I didn't really talk about why you'd want to do this. I'll let you keep Googling to figure that out (or just let your imagination run wild). Hopefully this helps give you a quick intro to the idea though! Good luck!

P.S. Are you interested in finding out what this is like in React? Check this out: [Use CSS Variables instead of React Context](https://epicreact.dev/css-variables).