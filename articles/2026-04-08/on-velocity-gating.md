---
title: "On velocity gating"
source: "https://karlkoch.me/writing/on-velocity-gating"
publishedDate: "2026-04-07"
category: "design"
feedName: "Sidebar"
---

In the [vinyl shelf post](https://karlkoch.me/writing/on-adding-homepage-delight) I mentioned velocity gating in a paragraph: fast cursors shouldn’t trigger hovers. But I skirted the how. The implementation has three distinct layers (smoothed velocity tracking, directional hysteresis, and separate engage/disengage thresholds), and each one solves a different problem. Here’s the full breakdown.

## The raw problem

Without any velocity awareness, a `mousemove` handler has one job: find the closest item and hover it. Move your cursor across five records at any speed and each one flickers into its lifted state for a single frame before the cursor leaves. The shelf becomes a strobe.

The naïve fix, debouncing, fails immediately. A debounce waits for cursor stillness before activating anything, which means the shelf feels dead for the first N milliseconds after your cursor slows down. There’s a perceptible delay between "I’ve stopped here" and "the record lifts." Debouncing optimises for calm at the cost of responsiveness. We need both.

No velocity gating — every mouseenter triggers a hover. Sweep your cursor fast across the row to see the flicker.

## Smoothed velocity

The first layer is an exponential moving average on cursor speed. Every `mousemove`, we compute the instantaneous velocity (pixels moved divided by milliseconds elapsed) and blend it with the previous smoothed value:

```
const VELOCITY_SMOOTHING = 0.3;

const instant = Math.abs(e.clientX - lastMouse.x) / dt;
smoothVelocity = VELOCITY_SMOOTHING * instant + (1 - VELOCITY_SMOOTHING) * smoothVelocity;
```

`VELOCITY_SMOOTHING = 0.3` means 30% of the new sample, 70% of the accumulated history. This acts as a low-pass filter. A single slow frame during a fast sweep won’t trick the system into thinking you’ve stopped, and a single fast twitch during a slow browse won’t eject you. The smoothed velocity tracks _intent_, not noise.

Why not a rolling window average? Because EMA is stateless: one number, one multiply, no array allocation per frame. On a 120Hz display that fires 120 mousemoves per second, every allocation counts.

Move your cursor across the track area. Raw velocity jitters on every sample — smoothed velocity (EMA, α=0.3) gives a clean signal.

## Engage vs disengage

The smoothed velocity feeds into two separate thresholds, not one:

```
const VELOCITY_ENGAGE = 0.4;   // px/ms, must be slower than this to pick up a new card
const VELOCITY_DISENGAGE = 0.9; // px/ms, must be faster than this to drop the current card
```

Engage is strict. You need to slow right down, under 0.4 px/ms, before a new record will lift. This prevents drive-by hovers on records you’re passing through.

Disengage is lenient. You have to accelerate past 0.9 px/ms to force-drop the record you’re currently focused on. This creates a velocity dead zone between 0.4 and 0.9 where you can gently move your cursor around the focused record without losing it.

This asymmetry is the key insight. A single threshold forces a trade-off: too low and drive-by hovers return; too high and records feel sticky. Two thresholds give you crisp acquisition _and_ comfortable retention.

Single threshold forces a trade-off. Split thresholds (0.4 engage / 0.9 disengage) give crisp acquisition and comfortable retention.

## Directional hysteresis

The third layer accounts for _which way_ you’re heading. When your cursor is actively moving toward a record, we relax the engage threshold because your intent is clearer:

```
const moveDir = Math.sign(e.clientX - lastMouse.x);
const movingToward = moveDir !== 0 && moveDir * (cx - localX) > 0;

const engageRadius = movingToward ? itemWidth * 0.85 : itemWidth * 0.6;
const engageVelocity = movingToward ? VELOCITY_ENGAGE * 1.4 : VELOCITY_ENGAGE;
```

Two things change when you’re moving toward a record:

1.  **The spatial radius expands** from 60% to 85% of the item width. You can start engaging earlier because the direction confirms you meant to go there.
2.  **The velocity ceiling rises** by 40% (from 0.4 to 0.56 px/ms). You’re allowed to be moving a bit faster and still engage, because the trajectory makes your intent unambiguous.

When you’re moving _away_ from a record, both values tighten. You need to be closer and slower. This prevents the cursor from "catching" a record behind it as it leaves.

The result is that approaching a record from the side feels immediate, but overshooting it and coming back feels considered. The shelf reads your cursor’s trajectory, not just its position.

Moving toward a record widens the engage zone (green) and raises the speed ceiling. Moving away contracts both. Watch the indicators as you change direction.

## The retention loop

Once a record is hovered, the disengage check runs a different path. Instead of finding the closest record, we check whether the cursor is still within the bounds of the _currently hovered_ record:

```
if (prev !== null) {
  const prevCx = getItemCenterX(prev, total, containerWidth, size);
  if (Math.abs(localX - prevCx) <= size / 2) {
    // Still inside the current record's footprint
    if (v > VELOCITY_DISENGAGE) return null; // moving too fast, drop it
    return prev; // hold
  }
}
```

This means a hovered record is only dropped for two reasons: the cursor physically left its bounds, or the cursor accelerated past the disengage threshold while still inside it. No other record can "steal" focus from the current one; the system must first release before it can acquire.

This is why the shelf feels stable. You can slowly drift your cursor within a record’s column without the neighbours competing for attention.

## The full pipeline

Every mousemove runs this sequence:

1.  Compute instantaneous velocity from the delta
2.  Blend into smoothed velocity via EMA
3.  If a record is currently hovered, check retention (bounds + disengage threshold)
4.  If not retained, find closest record
5.  Check directional hysteresis to pick thresholds
6.  Check spatial radius and velocity ceiling
7.  Engage or return null

Steps 3–7 are all inside a single `setHoveredIndex` updater, so React batches the state transition. No intermediate renders. The cursor position, velocity, and direction flow through a single synchronous pipeline and produce exactly one hover decision per frame.

The full velocity-gating pipeline: EMA smoothing → retention check → directional acquisition. The HUD shows every decision in real time.

## Why not pointer events?

You might wonder: why track velocity manually instead of using `PointerEvent.movementX` and computing velocity from that? Two reasons. First, `movementX` is the delta since the _last_ pointer event, which on high-refresh displays can be a sub-pixel value that jitters. The EMA smoothing gives us a cleaner signal. Second, and more importantly, we need the _smoothed_ velocity to persist across events. The EMA is a running state that no single event can provide.

## When to steal this

Velocity gating is worth adding whenever you have a dense row of hover targets and fast cursor traversal causes visual noise. Music shelves, tab bars, thumbnail strips, carousel dots. The exact thresholds depend on your item size and spacing, but the architecture (EMA smoothing, split engage/disengage, directional hysteresis) transfers directly.