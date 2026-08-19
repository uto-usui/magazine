---
title: "Eigendrum"
source: "https://eigendrum.com/"
publishedDate: "2026-08-17"
category: "design"
feedName: "Sidebar"
---

## how it works

A drumhead clamped at its rim can only vibrate in certain shapes, at certain frequencies. Those shapes and frequencies are the solutions of

−∇²u = λu  inside the shape,  u = 0 on the edge

Each solution _u_ is a mode, a standing wave, and each λ gives a frequency proportional to √λ. This is an eigenvalue problem, and for almost every shape it has no formula. So Eigendrum solves it numerically: it covers your shape with a mesh of triangles, builds the finite element stiffness and mass matrices, and finds the smallest eigenvalues of Kφ = λMφ.

### why you can trust the numbers

A few shapes have spectra that can be written down exactly, and the solver is tested against them on every change. A circle's frequencies are the zeros of Bessel functions; a rectangle's are π²(m²/a² + n²/b²). The solver reproduces both to better than a tenth of a percent, and because a conforming finite element method minimises energy over a restricted space, its answers are guaranteed slight _over_estimates, never under. The measured error is in “the numbers”.

### where you strike it matters

Striking a spot drives each mode in proportion to how much that mode moves there. Hit a line where a mode stands still and you cannot excite it at all. That was not programmed in; it falls out of projecting the mallet onto the modes.

So a strike is never one mode: it is every mode at once, in a mixture set by where your mallet landed. The rules along the mode list are that mixture, and the modes marked with a square were the ones your mallet could not reach. Pressing a row instead plays that single mode _alone_ - something no mallet can do, and the only way to hear what one frequency of a shape actually sounds like.

### drums from equations

Besides tracing an outline you can write one. r(t) gives the radius as t sweeps one full turn, so 1 + 0.3cos(5t) is a five-lobed flower; a parametric x(t), y(t) pair reaches the closed curves polar cannot, like a nephroid or an egg. This is not a shortcut for drawing. It reaches shapes no hand traces accurately - eleven even lobes, a superellipse partway between a circle and a square - and it makes a shape something you _vary_: change one number and hear what moved.

A written shape travels as its own text. The link for a formula holds the formula, so it is something you can read and retype rather than a few hundred characters of encoded outline, and editing it in the address bar works. Anything too thin to mesh honestly is refused rather than answered, because a sliver would still return numbers and they would be wrong.

### can one hear the shape of a drum?

Mark Kac asked exactly that in 1966. In 1992 Carolyn Gordon, David Webb and Scott Wolpert answered **no**, by building two different shapes with identical spectra. Both are in the form list as Kac drum I and II. Each is made from the same seven triangles, rearranged. They enclose the same area and the same perimeter, and every frequency matches. Switch between them and listen: the outlines are plainly different and the sound is not.

### what's physics, and what's just a slider

The frequency ratios, the mode shapes, and the pitch of the fundamental are all baked into the outline - you can't touch them. What you can move is the wave speed (tension and density): the pitch slider names the note a circle of this area would sound, and your actual shape lands above or below that on its own. Since every shape gets scaled to the same area first, that offset is genuinely about the shape - roughly six semitones of spread across the built-in presets, with the circle always lowest thanks to Faber-Krahn's inequality. Fade time is a real slider too, since that's material and air, not something the maths pins down.

The mallet works the same way. Its width is a slider; its contact time is fixed at a few milliseconds, because no real beater is instant, and one that was would slam every mode equally hard. Both change how much of a mode a strike can reach - neither one can shift where a mode actually sits. Damping is Rayleigh damping, so loss rises with the square of frequency: the high overtones die away first, which is why a drum darkens as it rings.

### where it lives, and how to reach me

Eigendrum is hosted at [eigendrum.com](https://eigendrum.com/). That is the address to link to and to cite; the older baselashraf81.github.io/eigendrum is a mirror that now redirects there.

For hiring or partnership enquiries, write to [\[email protected\]](https://eigendrum.com/cdn-cgi/l/email-protection#bfddd0ccddd0cc91dddeccdad3ffd8d2ded6d391dcd0d280cccaddd5dadccb82f7d6cdda9a8d8ffddeccdad39a8d8ffeccd7cdded9). For anything wrong with the maths or the interface, an issue on the repository is better, because then the fix is public.

### colophon

No build step and no application backend: the mesh, the solve and the audio all run on your own machine. The deployed site uses Google Analytics for aggregate site analytics and a Cloudflare D1 counter for the public visit total; it carries no advertising network and no consent banner. Support toward the domain and hosting is voluntary, via the link above. The shape you draw lives in the address bar after the #, which browsers never send to a server, and analytics is configured not to record it. Details in the [privacy notice](https://eigendrum.com/privacy). Set in Jost\* by indestructible type\*. After Kac, _Can One Hear the Shape of a Drum?_ (1966); Gordon, Webb and Wolpert (1992); and Driscoll, _Eigenmodes of Isospectral Drums_ (1997), whose coordinates the two Kac drums use.

Source, including the solver and the tests that check it against the closed-form spectra: [github.com/BaselAshraf81/eigendrum](https://github.com/BaselAshraf81/eigendrum)

Free to use, with no account and nothing to install. If you would like to put something towards the domain and hosting: [ko-fi.com/baselashraf](https://ko-fi.com/baselashraf)