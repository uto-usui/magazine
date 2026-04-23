---
title: "A Playful Clip Menu with GSAP’s easeReverse"
source: "https://tympanus.net/codrops/2026/04/22/a-playful-clip-menu-with-gsaps-easereverse/"
publishedDate: "2026-04-22"
category: "design"
feedName: "Codrops"
author: "Manoela Ilic"
---

A playful GSAP menu demo exploring how easeReverse makes reversed UI animations feel smoother, snappier, and more intentional.

[clip-path](https://tympanus.net/codrops/tag/clip-path/) [GSAP](https://tympanus.net/codrops/tag/gsap/) [menu](https://tympanus.net/codrops/tag/menu/)

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/ClipMenu_featured.webp?x30804)](https://tympanus.net/Development/EaseReverseClipMenu "A Playful Clip Menu with GSAP’s easeReverse Demo")

Some days ago, the GSAP team [released an update](https://gsap.com/blog/3-15/) which introduced a small but very handy addition for reversible animations: `easeReverse`.

The idea is straightforward: when you reverse a GSAP animation, the easing curve is reversed too. That often makes technical sense, but visually it can feel off. An `ease-out` animation played backwards becomes an `ease-in`, which means a UI element that entered smoothly might feel a bit sluggish or awkward when dismissed.

With `easeReverse`, we can give the reverse direction its own easing behavior. It can reuse the forward ease adaptively, or it can use a completely different ease. This is especially useful for toggleable UI like menus, drawers, modals, tooltips, and other interruptible interactions.

In this demo, we use it for a small (game-inspired) menu interaction.

When the menu opens, a set of cover images scatter outward from the center of the viewport. At the same time, the menu is revealed with a `clip-path` animation. The interesting part happens when you close the menu: with `easeReverse` enabled, the returning motion gets its own reverse feel instead of simply playing the original ease backwards:

```
tl.to(item, {
  x,
  y,
  opacity: 0,
  rotation: gsap.utils.random(-30, 30),
  duration: 0.7,
  ease: 'expo',
  easeReverse: er('elastic.out(0.3)'),
});
```

So that we can visualize the magic, a small helper lets us switch the feature on and off:

```
const er = (value) => {
  return easeReverseCheckbox.checked ? value || true : false;
};
```

So when the checkbox is checked, the tween gets an `easeReverse` value. When it is unchecked, `easeReverse` is set to `false`, letting us compare the previous reverse behavior with the new one.

We also rebuild the timeline whenever the checkbox changes, so each tween is created with the correct reverse easing from the start:

```
const rebuildMenuTimeline = ({ progress = 0, reverseEase = FULL_CLOSE_EASE_REVERSE } = {}) => {
  const safeProgress = clamp(progress, 0, 1);

  if (menuTimeline) {
    menuTimeline.revert();
  }

  gsap.set(coverItems, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
  });

  gsap.set(menu, {
    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
  });

  menuTimeline = createMenuTimeline(reverseEase);
  menuTimeline.progress(safeProgress).pause();
};
```

You’ll also see a “interrupt speed” control in the demo. If you click the toggle again before the opening animation has finished, the timeline reverses immediately. The slider controls that reverse speed using `timeScale()`:

```
menuTimeline.timeScale(interruptReverseTimeScale).reverse();
```

This makes it easier to compare two things separately: the speed of the reverse motion, and the easing curve used while reversing.

`easeReverse` is really useful because forward and backward motions can now each have their own character, without needing two entirely separate animations.

We’d love to see how you use it in your own interactions. If you experiment with `easeReverse`, share it with us on X or LinkedIn (tag [GSAP](https://www.linkedin.com/company/greensock/) and [Codrops](https://www.linkedin.com/company/codrops/)).

Hope you enjoy this little demonstration of it!

Find out more about it in the [GSAP docs](https://gsap.com/docs/v3/GSAP/Tween#easeReverse).

![](https://secure.gravatar.com/avatar/d8198e594845ff1b6d8961590d2c9ab11e4a6d0e22db58ca44826e3527e18d23?s=160&d=retro&r=g)

### [Manoela Ilic](https://tympanus.net/codrops/author/crnacura/)

Editor-in-Chief at Codrops. Designer, developer, and dreamer — sharing web inspiration with millions since 2009. Bringing together 20+ years of code, creativity, and community.

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/02/IMG_3840-scaled-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/07/IMG_0561-square-160x160.jpg?x30804)

![](https://secure.gravatar.com/avatar/c05ec8c4a1421cac11613d4bd233dc469791b790a1119e83bed9492b226f3784?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/db-social-pf-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/DSC_0112-awwwards-160x160.jpg?x30804)

![](https://secure.gravatar.com/avatar/99b569addccce6ea8f1590f7235496ce07cd80f8718b640946e13da4f75e782e?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/07/9bbe9e421f5c176b042e81eaaffaf443-160x160.jpeg?x30804)

![](https://secure.gravatar.com/avatar/45170889b0ad65b440aa85822368f0a822061fc9ebf373f4f7c1f430e097addf?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/Mask-group-scaled-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/1Y4A1982-%D1%81opy-5-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/huy-160x160.jpeg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/profile-160x160.jpg?x30804)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/14islands_profile-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/b2sBj1rG_400x400-160x160.jpg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/forged-160x160.jpeg?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/logo-160x160.png?x30804)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/Malvah_Logo-160x160.png?x30804)

![](https://secure.gravatar.com/avatar/97012e58c68836d8d1d99fbd97332ed9be903997ace4a72254b3322059c33f17?s=160&d=retro&r=g)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.