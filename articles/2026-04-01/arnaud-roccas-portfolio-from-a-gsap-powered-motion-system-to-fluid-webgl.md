---
title: "Arnaud Rocca’s Portfolio: From a GSAP-Powered Motion System to Fluid WebGL"
source: "https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/"
publishedDate: "2026-03-31"
category: "design"
feedName: "Codrops"
author: "Arnaud Rocca"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Arnaud.webp?x79234)](https://arnaudrocca.fr/ "Arnaud Rocca’s Portfolio: From a GSAP-Powered Motion System to Fluid WebGL Demo")

Every designer and developer eventually faces the same challenge while designing their personal portfolio: How do you build a showcase that doesn’t just list what you do, but actually shows it?

For this portfolio, my goal was to find the right balance between showcasing my work and building something reflective of what I do as a creative developer. With that in mind, I started designing my portfolio with the aim to create something minimalist yet innovative, a portfolio that would let my work speak for itself while showcasing my creativity.

## Design & Inspirations

Unlike most web projects, and since I was working on both the design and development myself, I didn’t wait for the design to be finished before kicking off development. Both moved forward in parallel, which allowed me to fully explore my creativity, with ideas coming from both sides.

### Home page

The home page was the most difficult to design. I went through several stages, tested many layouts and developed different navigation options before coming up with the final result because I really wanted the home page to be impactful while serving its purpose as the website’s entry point.

Its navigation is somewhat inspired by Instagram stories, with autoplaying slides. But to make it more user-friendly, I also connected the slider to multiple inputs: up/down scroll, left/right keyboard keys, bullet clicks, and finally the one I’ve played the most with, dragging over the fluid effect.

### Project pages

Along with the home page, the project pages are the most important part of a portfolio. With those, I wanted to showcase my projects in the best possible way, especially since some of them are no longer available online.

That’s why I deliberately went for a minimalist and uncluttered layout with generous white space and neutral colors, although I enhanced this color palette with an accent color that is different for each project, giving each case study its own unique mood.

## Technical stack

-   **Nuxt**: Frontend framework
-   **GSAP**: Animation library
    -   SplitText
    -   ScrollTrigger
-   **Lenis**: Smooth scroll library
-   **OGL**: Minimal WebGL library
-   **Prismic**: Headless CMS
-   **Figma**: Design tool

Regardless of the frameworks and libraries used, one of my guidelines as a developer is always to produce clean reusable code. This applied to every piece of code in this project and has influenced my technical decisions while creating components, composables, utility functions, animations, WebGL effects…

## UI animations

### GSAP Effects: Creating reusable animations

With reusability as a core principle, most of the animations were built using [GSAP effects](https://gsap.com/docs/v3/GSAP/gsap.effects/). All effects were placed in a dedicated folder and followed a consistent naming convention, allowing me to automatically register them thanks to Vite’s Glob Import feature.

```
// ~/effects/index.ts

export default import.meta.glob('~/effects/*.effect.{js,ts}', {
	eager: true,
	import: 'default',
	base: '/effects/'
});
```

```
// ~/plugins/gsap.client.ts

import effects from '~/effects';

export default defineNuxtPlugin(() => {
	// Register plugins
	// [...]

	// Register effects
	Object.values(effects).forEach((effect) => gsap.registerEffect(effect));
});
```

I started by creating some basic effects that wrap a single tween on a given target: `fade`, `colorize`, `scale`…

> If I’m being completely honest, most of the basic effects had already been created for previous projects before this one even started, but I guess that’s the point of writing reusable code.

```
const colorizeEffect: GsapEffect<ColorizeEffectConfig> = {
	name: 'colorize',
	effect: (target, { autoClear, ...config } = { color: '' }) => {
		if (autoClear) {
			config.clearProps = ['color', config.clearProps].filter(Boolean).join(',');
		}

		return gsap.to(target, { ...config });
	},
	defaults: { duration: 0.2, ease: 'sine.out' },
	extendTimeline: true
};
```

After creating the basic effects, I could add them to timelines or combine them into more complex effects to create more advanced animations.

For example, the `fadeColor` effect is a combination of two basic effects into one that fades in a target while animating its color. Once created, I could animate texts with this fade/color effect anywhere across the website.

```
const fadeColorEffect: GsapEffect<FadeColorEffectConfig> = {
	name: 'fadeColor',
	effect: (
		target,
		{ autoAlpha, duration, stagger, ease, onStart, onComplete, onUpdate, autoClear, ...config } = {}
	) => {
		const currentColor = gsap.getProperty(target, 'color');
		const color = config.color;

		const tl = gsap.timeline({ onStart, onComplete, onUpdate });
		tl.set(target, { color }, 0);
		tl.fadeIn(target, { autoAlpha, duration, stagger, ease, autoClear }, 0);
		tl.colorize(target, { color: currentColor, duration, stagger, ease, autoClear }, config.timeout);
		return tl;
	},
	defaults: { autoAlpha: 1, duration: 0.9, timeout: 0.3 },
	extendTimeline: true
};
```

Thanks to these effects, each new component of the website could be animated quickly with consistent, tested behavior, without having to reinvent the wheel for each new section.

### GSAP ScrollTrigger x Vue: A system for scroll-based animations

With the effects library in place, I needed a clean way to trigger those animations on scroll. I started by creating a Vue equivalent of GSAP’s [useGSAP](https://gsap.com/resources/React/) React hook that wraps all GSAP animations and ScrollTriggers that are created within the supplied function, scopes all selector text to a particular Element or Ref and supports reactive dependencies.

```
export function useGSAP(
	callback: gsap.ContextFunc,
	$scope?: MaybeRefOrGetter<Element | null>,
	dependencies: Array<MaybeRefOrGetter<unknown>> = [],
	{ revertOnUpdate = false }: GsapParameters = {}
) {
	let context: gsap.Context;

	function update() {
		if (revertOnUpdate) context?.revert();
		context?.clear();
		context?.add(callback);
	}

	dependencies.forEach((dependency) => {
		if (isRef(dependency)) watch(dependency, update);
		else watch(() => toValue(dependency), update);
	});

	onMounted(() => {
		context = gsap.context(callback, toValue($scope) ?? undefined);
	});

	onUnmounted(() => {
		context?.revert();
	});
}
```

From there, I built `useScrollAnimateIn`: a higher-level composable specifically designed for scroll-triggered animations. Since I knew I’d be animating a lot of split texts, I also added a way to create revert functions in my components and call them from the composable itself.

```
export function useScrollAnimateIn(
	animateIn: () => gsap.core.Timeline,
	$scope: MaybeRefOrGetter<Element | null>,
	{ scrollTrigger = {}, dependencies = [], ...params }: ScrollAnimateInParameters = {}
) {
	useGSAP(
		() => {
			const animateInTl = animateIn().pause(0);

			ScrollTrigger.create({
				...scrollTrigger,
				trigger: scrollTrigger.trigger ?? toValue($scope),
				once: true,
				onEnter: (self: ScrollTrigger) => {
					animateInTl.play(0);
					scrollTrigger.onEnter?.(self);
				}
			});

			return () => {
				animateInTl.data?.revert?.();
			};
		},
		$scope,
		dependencies,
		{ revertOnUpdate: true, ...params }
	);
}
```

Thanks to this composable, writing scroll-triggered animations became entirely focused on the animations themselves, allowing me to quickly and easily create animate-in timelines with reversible split texts.

In practice, it looks like this:

```
useScrollAnimateIn(
	() => {
		const text = new SplitText('.text', { type: 'chars' });

		const tl = gsap.timeline({
			data: {
				revert: () => {
					text.revert();
				}
			}
		});

		tl.fadeColor(
			text.chars,
			{
				color: 'var(--color)',
				duration: 0.9,
				stagger: { amount: 0.2 },
				timeout: 0.3,
				autoClear: true,
				onComplete: () => {
					text.revert();
				}
			},
			0
		);

		return tl;
	},
	$el,
	{ scrollTrigger: { start: 'top center' } }
);
```

Beyond being a best practice, reverting split texts became strictly mandatory since `useScrollAnimateIn` re-runs the callback whenever a reactive dependency changes. Without reverting first, each re-run would call `SplitText` on an already-split element, nesting elements inside elements and breaking both the animation and the DOM. It also helps keep the DOM size down, splitting a paragraph into chars can easily generate hundreds of extra nodes, so cleaning them up after use is a meaningful performance consideration.

### GSAP SplitText x Vue: Implementing reactive text animations

Given that a significant amount of the website’s animations relies on text effects, I decided to create a solid foundation for implementing them. So instead of calling [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) directly in each component, I created a `useSplitText` composable and a corresponding `<SplitText>` component that integrates SplitText’s functionality with Vue’s lifecycle and reactivity.

```
function useSplitText(
	$element: MaybeRefOrGetter<Element | null>,
	{ autoSplit = true, onSplit: onSplitCallback, onRevert: onRevertCallback, ...params }: SplitText.Vars
) {
	const $splitText = shallowRef<SplitTextInstance | null>(null);

	const $elements = ref<Element[]>([]);
	const $chars = ref<Element[]>([]);
	const $words = ref<Element[]>([]);
	const $lines = ref<Element[]>([]);
	const $masks = ref<Element[]>([]);

	const isSplit = ref<boolean>(false);

	function createSplitText(): SplitTextInstance | null {
		const $el = toValue($element);
		if ($el) {
			return new SplitText($el, { autoSplit, onSplit, onRevert, ...params });
		}
		return null;
	}

	function onSplit(splitText: SplitTextInstance) {
		$elements.value = splitText.elements ?? [];
		$chars.value = splitText.chars ?? [];
		$words.value = splitText.words ?? [];
		$lines.value = splitText.lines ?? [];
		$masks.value = splitText.masks ?? [];
		isSplit.value = splitText.isSplit ?? true;
		onSplitCallback?.(splitText);
		return splitText;
	}

	function onRevert(splitText: SplitTextInstance) {
		$elements.value = splitText.elements ?? [];
		$chars.value = splitText.chars ?? [];
		$words.value = splitText.words ?? [];
		$lines.value = splitText.lines ?? [];
		$masks.value = splitText.masks ?? [];
		isSplit.value = splitText.isSplit ?? false;
		onRevertCallback?.(splitText);
		return splitText;
	}

	function split() {
		return $splitText.value?.split() ?? null;
	}

	function revert() {
		return $splitText.value?.revert() ?? null;
	}

	onMounted(() => {
		$splitText.value = createSplitText();
	});

	return {
		$elements: shallowReadonly($elements),
		$chars: shallowReadonly($chars),
		$words: shallowReadonly($words),
		$lines: shallowReadonly($lines),
		$masks: shallowReadonly($masks),
		isSplit: readonly(isSplit),
		split,
		revert
	};
}
```

#### “_The Leftovers_” text transition

The home page text transition is something I’ve wanted to reproduce since I watched “_The_ _Leftovers_”, specifically those few seconds at the end of the show’s opening title where characters transition from one name to the next rather than simply fading out and in.

I broke down the animation as follows:

1.  Identify the characters from the previous string that also appear in the next one (the _leftovers_)
2.  Keep the _leftovers_ visible
3.  Hide the remaining previous characters
4.  Animate the _leftovers_ to their corresponding positions in the next string
5.  Show the next characters and hide the previous ones once every character is in place

So in order to reproduce this text transition in a reusable and reactive way (you’re seeing it coming), I created a `<LeftoversText>` component that manages the matching algorithm, watches its props to determine which text should be currently displayed and triggers the transition. Internally, it creates one `<SplitText>` component per text item received as props and uses them to transition between these text on props changes.

```
type Leftover = {
	nextIndex: number;
	previousIndex: number;
	char: string;
	delta: number;
};

type Leftovers = Map<number, Leftover>;

function getLeftovers(
	$nextText: SplitTextComponentInstance | null,
	$previousText: SplitTextComponentInstance | null
): Leftovers {
	const $nextChars = $nextText?.$chars ?? [];
	const $previousChars = $previousText?.$chars ?? [];
	const nextChars = $nextChars.map(($char) => $char.textContent);
	const previousChars = $previousChars.map(($char) => $char.textContent);

	const leftovers: Leftovers = new Map();

	previousChars.forEach((previousChar, previousIndex) => {
		const match = nextChars
			.map((nextChar, nextIndex) => ({
				index: nextIndex,
				char: nextChar,
				delta: Math.abs(nextIndex - previousIndex)
			}))
			.filter(({ char }) => char === previousChar)
			.sort((a, b) => a.delta - b.delta)
			.at(0);

		if (match) {
			const leftover = leftovers.get(match.index);
			if (!leftover || match.delta < leftover.delta) {
				leftovers.set(match.index, {
					nextIndex: match.index,
					previousIndex,
					char: match.char,
					delta: match.delta
				});
			}
		}
	});

	return leftovers;
}
```

Voilà! After tweaking the durations, delays and eases, I had a reusable and reactive `<LeftoversText>` component ready to be used.

## WebGL effects

### OGL: A small but effective WebGL library

[OGL](https://github.com/oframe/ogl) describes itself as “a small, effective WebGL library aimed at developers who like minimal layers of abstraction, and are interested in creating their own shaders”.

Exactly what I needed!

### WebGL fluid simulation

It wasn’t my first time playing with WebGL fluid simulation and it might not be the last, that’s why I decided to invest some time to create a well-structured, reusable `FluidSimulation` helper class specifically dedicated to this purpose.

The fluid simulation was built starting from OGL’s [Post Fluid Distortion](https://oframe.github.io/ogl/examples/?src=post-fluid-distortion.html) example, which I then refactored into the following architecture:

```
webgl/
├── helpers/
│   ├── FluidSimulation.ts 	# Helper class to render fluid simulation
│   ├── RenderTargets.ts 	# Helper class to create ping-pong RenderTargets
├── utils/
│   ├── supports.ts 		# Utility functions for larger device support
├── programs/
│   ├── glsl/
│   │   ├── base.vert
│   │   ├── fluid.vert
│   │   ├── advection-manual-filtering.frag
│   │   ├── advection.frag
│   │   ├── curl.frag
│   │   ├── dissipation.frag
│   │   ├── divergence.frag
│   │   ├── gradient-subtract.frag
│   │   ├── pressure.frag
│   │   ├── splat.frag
│   │   ├── vorticity.frag
│   ├── AdvectionProgram.ts
│   ├── CurlProgram.ts
│   ├── DissipationProgram.ts
│   ├── DivergenceProgram.ts
│   ├── GradientSubtractProgram.ts
│   ├── PressureProgram.ts
│   ├── SplatProgram.ts
│   ├── VorticityProgram.ts
```

#### Frame-rate independent simulation

One subtle but important detail involved the `dissipation` parameter controlling how much data a render target retains from one frame to the next. A dissipation of `0` completely clears the buffer every frame, while a value of `1` means the data never fades out.

```
uniform sampler2D inputBuffer;
uniform float dissipation;

varying vec2 vUv;

void main() {
	gl_FragColor = dissipation * texture2D(inputBuffer, vUv);
}
```

In OGL’s example, the `dissipation` parameter keeps the same constant value every frame. Unfortunately this breaks on high-refresh-rate displays or when frame rate varies: on a 120fps display, this multiplier is applied twice as often as on a 60fps display, resulting in a completely different feeling on different hardware.

To fix this issue, I integrated `deltaTime` into the calculation, normalizing the dissipation to be frame-rate independent:

```
// Before
program.uniforms.dissipation.value = config.dissipation;

// After - Normalize to 60fps so behavior is consistent regardless of device refresh rate
program.uniforms.dissipation.value = Math.pow(config.dissipation, deltaTime * 60);
```

Here’s a demo of how the `FluidSimulation` helper can be used to render all kinds of effects involving fluid simulations:

### WebGL fluid slider

Once the `FluidSimulation` helper class was created, I tackled the implementation of the `FluidSliderEffect`: a class that runs the fluid simulation and uses the density render target into its own fragment shader, compositing the fluid motion as a distortion + mask effect over the slider textures.

```
uniform sampler2D densityBuffer; // FluidSimulation density buffer
uniform sampler2D maps[COUNT]; // Slider textures
uniform int foregroundIndex;
uniform int backgroundIndex;
uniform float foregroundProgress;
uniform float backgroundProgress;
uniform vec2 foregroundDisplacement;
uniform vec2 backgroundDisplacement;

varying vec2 vUv;

void main() {
	// Retrieve density buffer data
	vec4 density = texture2D(densityBuffer, vUv);
	// Compute distortion vector	
	vec2 distortion = -density.rg;
	// Compute normalized mask value
	float mask = clamp((abs(density.r) + abs(density.g)) / 2.0, 0.0, 1.0);

	// Retrieve textures data + Apply distortion
	vec4 foregroundMap = texture2D(maps[foregroundIndex], vUv + distortion * foregroundDisplacement);
	vec4 backgroundMap = texture2D(maps[backgroundIndex], vUv + distortion * backgroundDisplacement);

	// Composite textures + Apply mask
	vec4 foreground = mix(backgroundMap, foregroundMap, foregroundProgress);
	vec4 background = mix(foregroundMap, backgroundMap, backgroundProgress);
	vec4 map = mix(foreground, background, mask);

	gl_FragColor.rgb = map.rgb;
}
```

### OGL x Vue: Building reusable and reactive WebGL components

For structuring the WebGL layer, I took direct inspiration from [React Three Fiber](https://r3f.docs.pmnd.rs/) / [TresJS](https://tresjs.org/) and their approach of sharing a renderer context through a provide/inject pattern. This led to two core components: `<OglCanvas>` and `<OglContext>`. Basically, R3F logic brought to a Vue + OGL context.

The `<OglCanvas>` component creates the DOM canvas element while the `<OglContext>` component receives the canvas as a prop, instantiates the OGL renderer, and shares it with any child component.

```
<!-- OglCanvas.vue -->

<canvas ref="$canvas" :class="$attrs.class">
	<OglContext v-if="$canvas" v-bind="props" ref="$context" :canvas="$canvas">
		<slot />
	</OglContext>
</canvas>
```

Last step, I created a `<FluidSlider>` component responsible for retrieving the OGL renderer from the `<OglContext>`, managing a `FluidSliderEffect` instance, listening to mouse events and reactively updating the effect instance on props change.

Then, all I had to do was use this `<FluidSlider>` component with the desired parameters inside an `<OglCanvas>`.

```
<OglCanvas>
	<FluidSlider
		:items="items"
		:index="currentIndex"
		:displacement="0.0005"
		:density-dissipation="isPressed ? 0.95 : 0.9"
		:velocity-dissipation="0.985"
		:pressure-dissipation="0.8"
		:curl-strength="8"
		:radius="isPressed ? 0.075 : 0.05"
		:sensitivity="25"
	/>
</OglCanvas>
```

Even though they eventually didn’t make the cut, having a reusable component for the WebGL fluid effect allowed me to easily run some tests, such as reusing it with different parameters in the project pages footer.

## Accessibility

Despite what some might think, accessibility and creativity are not mutually exclusive. Here are a few steps I took to make this portfolio as accessible as possible without sacrificing any of the creative work for most users.

### ARIA attributes: Use of an actual screen reader

Beyond trying to setting the right `aria-label` / `aria-hidden` attributes wherever I thought they were needed, I tested them using an actual screen reader rather than relying on automated accessibility tools alone. Automated tools can be useful but they don’t necessarily catch the full picture, so listening to how a screen reader actually navigates through the pages helped me identify accessibility issues that I could easily fix afterward.

### Keyboard navigation: `blur` / `focus` handlers

To ensure keyboard users get the same experience and animations as mouse users, in addition to set the correct `tabindex` attributes and binding some keyboard keys, most CTAs `mouseenter` / `mouseleave` handlers were paired with their `focus` / `blur` equivalents, ensuring a consistent experience for all users.

```
<template>
	<button 
		@mouseenter="handleEnter"
		@mouseleave="handleLeave"
		@focus="handleEnter"
		@blur="handleLeave"
	/>
</template>

<script lang="ts" setup>
function handleEnter() {
	// Enter animations
	// [...]
}

function handleLeave() {
	// Leave animations
	// [...]
}
</script>
```

### Accessible animation: Reduced motion preferences

Even though animation is the part I enjoy the most, I wanted to respect users’ preferences. So I added a listener to the `prefers-reduced-motion` media query, updating a `reducedMotion` Ref to keep track of this user preference.

```
const reducedMotion = ref<boolean>(false);
const reducedMotionMediaQuery = '(prefers-reduced-motion: reduce)';

function onReducedMotionChange() {
	reducedMotion.value = window.matchMedia(reducedMotionMediaQuery).matches;
}

window.matchMedia(reducedMotionMediaQuery).addEventListener('change', onReducedMotionChange);
onReducedMotionChange();
```

I then used this Ref to replace the home page WebGL effect with a simple cross-fade between thumbnails and wrapped all scroll-based animations in [gsap.matchMedia()](https://gsap.com/docs/v3/GSAP/gsap.matchMedia\(\)/) conditions using the same media query.

### No JavaScript, No problem

As a creative developer, most of my work involves JavaScript/TypeScript code, however I wanted to push accessibility even further by ensuring that the content remained accessible to users with JavaScript disabled.

Since all pages were already served as static files via Nuxt SSG, a few CSS rules wrapped in `<noscript>` tags were enough to ensure the content remained accessible without JavaScript, resulting in a content-focused version of the website: no animations, no transitions, no WebGL, just pure HTML/CSS.

## Thank you for reading

To be honest, writing this case study wasn’t an easy task, I had a hard time deciding which topic to cover and extracting the most interesting code snippets while keeping things concise and clear. I tried to make this behind-the-scenes look as interesting as possible for everyone: from junior developers to senior ones. So I hope you enjoyed reading it!