---
title: "A flame needs three sine waves"
source: "https://www.carmenansio.com/articles/matchstick-flame-canvas/"
publishedDate: "2026-10-14"
category: "design"
feedName: "Sidebar"
---

Click the match.

Click the canvas or press Strike

```
// three sines at odd speeds, that's the whole flicker
function noise(t) {
  return Math.sin(t * 1.7)
       + Math.sin(t * 3.3 + 1.5) * 0.5
       + Math.sin(t * 7.1 + 0.3) * 0.25;
}

function frame(now) {
  const t = now / 1000;
  const sway   = noise(t * 6) * 8 * lit;              // the tip leans
  const height = (70 + noise(t * 9 + 3) * 16) * lit;  // and breathes

  teardrop(sway,       height * 1.15, 26, 'rgba(255,110,40,.55)');  // outer
  teardrop(sway * 0.8, height,        18, 'rgba(255,175,60,.85)');  // mid
  teardrop(sway * 0.6, height * 0.62, 10, 'rgba(255,240,190,.95)'); // core
  requestAnimationFrame(frame);
}
```

It scrapes, throws a spray of sparks, catches, and then sits there burning, leaning and breathing, until the stick is nearly gone and it gutters out. Then a fresh one is ready. It’s one of my favourite things in my playground, and the flame part is about twenty lines of canvas.

I take it apart in my motion workshop, and someone always asks the same thing: how do you come up with this? They don’t mean the code. They mean the idea. Where does “a flame is three teardrops and three sine waves” even come from?

The honest answer is a page of pencil. Five numbered boxes, one for each thing I had to work out, and every box turned into a piece of the code. I’ll show each one right where it becomes code.

## Watch a real one first

Box one is the step I’m most tempted to skip, and it does the most work. Light an actual match and watch it for the few seconds it lasts.

1\. look at a real one leans, a bit never the same twice the room goes warm → big soft glow

Three things stood out, and each one turned into a specific line of code:

What I saw

What it became

It leans, a bit

The tip of the shape is the only point that moves

It’s never the same twice

Three sine waves at speeds that don’t line up

The room goes warm

A big radial gradient whose opacity follows the flame

Notice what’s not on the list: orange, glowy, fire-shaped. That’s what a flame looks like in a screenshot. Every note I kept is about what it does, and that’s the part I actually had to animate.

## A flame is a teardrop with a loose tip

Squint at a match flame and it’s a teardrop. Round at the bottom, pointed at the top. That’s box two:

2\. the shape tip = sway 4 quadratic curves, that's it height = 70 + noise

On canvas that’s four quadratic curves: bottom to the left belly, up to the tip, down to the right belly, back to the bottom.

Sway

8

Height

80

Filled dots are anchors, hollow ones are control points

```
function teardrop(sway, h, w, fill) {
  ctx.beginPath();
  ctx.moveTo(0, 0);                                            // bottom
  ctx.quadraticCurveTo(-w, 0, -w, -h * 0.3);                   // left belly
  ctx.quadraticCurveTo(-w * 0.55, -h * 0.75, sway, -h);        // tip, the loose one
  ctx.quadraticCurveTo(w * 0.55, -h * 0.75, w, -h * 0.3);      // right belly
  ctx.quadraticCurveTo(w, 0, 0, 0);                            // back home
  ctx.fillStyle = fill;
  ctx.fill();
}
```

Drag the sway slider. One dot moves, the tip, and both sides bend to follow it because they’re anchored there. That’s the moment on paper where I wrote “tip = sway” and stopped drawing. Animate one number and the flame leans. Animate the height as well and it breathes.

## Three teardrops, and the core barely moves

One teardrop on its own looks like a sticker of a flame. A real one has a hot white core and a wider, dimmer, more see-through outside. So box three stacks three teardrops, each one smaller and whiter than the last.

3\. three layers outer · .55 mid · .85 core · white each one sways a bit less

The numbers next to each one are opacities. Here they are on canvas:

outer 1 · mid 0.8 · core 0.6: it pivots from the head

sway exaggerated 2.5× and slowed down, so you can follow the tips

The detail that sold it for me is the taper. The outer layer sways the full amount, the middle one 80% of it, the core 60%. A flame is pinned to the match head and loose at the top, and a core that moves less than its edge is exactly what that looks like.

The dots in the demo are the three tips, and the dashed line joins them back to the head. With the taper on, that line tilts around the head like a clock hand: the flame pivots. Switch the taper off and the line stays upright and shuffles left and right, because the whole flame slides sideways as one block. At real size it’s a couple of pixels. I still notice when it’s missing.

## One sine wave is a metronome

Box four is the one with a red cross through it.

4\. flicker? one sine = metronome 3 sines, odd speeds ✓ 1.7 · 3.3 · 7.1, never lines up

The obvious way to make something wobble forever is `Math.sin(time)`, and it’s the first thing I tried.

tap a wave to switch it on or off

```
function noise(t) {
  return Math.sin(t * 1.7)              // slow sway
       + Math.sin(t * 3.3 + 1.5) * 0.5  // flutter, half as big
       + Math.sin(t * 7.1 + 0.3) * 0.25; // jitter, half again
}
```

Switch off the flutter and the jitter. What’s left is one sine wave, and the flame turns into a pendulum: left, right, left, right, every 0.62 seconds. It’s perfectly smooth and nobody on earth would believe it’s fire.

The version that survived is three sines at odd speeds, 1.7, 3.3 and 7.1, each one half the size of the one before. The white line is the three added up, and that single number is what drives the tip. You could reach for Perlin noise here. I didn’t, because it’s one line I can read, and at this size nobody can tell.

The sketch says the speeds “never line up”. That’s not quite true, and I only did the sums afterwards. 1.7, 3.3 and 7.1 are 17, 33 and 71 tenths, which share no common factor, so the sum does repeat, every 10.5 seconds (that’s 2π / 0.6). The readout under the graph works that out for whichever waves you’ve left on. The height runs on its own copy of the noise at a different speed (`t * 9 + 3`), which repeats every 7 seconds, and the two only line up again after about 21. The match is out in 13. So inside one match, the flame really doesn’t do the same thing twice.

## Ready, strike, catch, burn, gutter

Box five is the story, and it’s what turns a looping flame into a match.

5\. the story ready strike catch burn gutter 26 sparks lerp .08 stick shrinks fade, reset and again

Five states, each with its own motion. This one strikes itself and burns a bit faster, so you can watch the whole run:

1.  ready
2.  strike
3.  catch
4.  burn
5.  gutter

```
function strike() {
  if (phase !== 'ready') return;
  phase = 'lit';
  for (let i = 0; i < 26; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2; // mostly up
    const s = 3 + Math.random() * 6;
    sparks.push({ x: hx, y: hy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 });
  }
}

// every frame
for (const p of sparks) {
  p.vy += 0.28;          // gravity
  p.x += p.vx;
  p.y += p.vy;
  p.life -= 0.028;       // gone in ~36 frames
}
if (phase === 'lit') {
  lit += (1 - lit) * 0.08;   // catch: fast, then settles
  burn -= 0.0009;            // the stick gets shorter
  if (burn < 0.28) phase = 'gutter';
} else if (phase === 'gutter') {
  lit += (0 - lit) * 0.06;   // same trick, backwards
  if (lit < 0.03) phase = 'reset';
}
```

A spark is five numbers: `x`, `y`, `vx`, `vy` and `life`. Strike pushes 26 of them out of the head in a fan pointing up, and every frame gravity bends them down while their life ticks away and becomes their opacity. The catch is a lerp: `lit` moves 8% of the way to 1 every frame, so the flame flares fast and then settles, about 95% lit after 0.6 seconds. That ~0.6s was on my spec before any of this existed. Gutter is the same lerp pointed at 0, a little slower.

There’s a bug in that snippet, and I shipped it. Every number is per frame. On a 120Hz screen `requestAnimationFrame` fires twice as often, so my match burns out in six and a half seconds. The sparks are worse: they shoot out twice as fast and fall with four times the gravity, because gravity gets added to the speed every frame and the speed gets added to the position every frame. The fix is to scale everything by how much time actually passed:

```
const k = dt * 60;                                // frames a 60Hz screen would have drawn
lit  += (1 - lit) * (1 - Math.pow(1 - 0.08, k));  // the lerp, frame-rate proof
burn -= 0.0009 * k;
```

Every match on this page does that. The one in my playground still doesn’t. It’s on the list.

## The todo on the sticky note

Stuck to the side of that notebook page is the spec, written before a single line of JavaScript. Every line on it turned into something you’ve already seen.

The last line is `todo: reduced motion`. I left it there when I showed the sketch at the workshop, because it’s true: even my own demos aren’t finished. So here it is, finished.

Reduced motion doesn’t mean the match can’t light. Whether it’s lit or not is information, and so is the room going warm. What someone who’s asked for less motion doesn’t want is a spray of sparks and a shape that never stops wobbling. So the calm version keeps the state and the colour and drops the movement:

sparks, flicker, flame grows as it catches

```
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!calm) spawnSparks();              // no spray
const n  = calm ? 0 : noise(t * 6);    // no flicker, a still teardrop
const n2 = calm ? 0 : noise(t * 9 + 3);
const size = calm ? 1 : lit;           // full size from the start
ctx.globalAlpha = calm ? lit : 1;      // so the catch becomes a fade
```

No sparks, no flicker, and the catch becomes a fade instead of a flame growing out of the head. The glow stays, since it’s colour and doesn’t move. The stick still burns down, but over thirteen seconds. That’s slow enough that I kept it.

If your system is set to reduce motion, every match on this page has been the calm one all along, and that toggle started pressed.