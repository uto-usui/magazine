---
title: "Building an Interactive Digital Stamp Collection with Shaders, Postcards, and Playful Inspection"
source: "https://tympanus.net/codrops/2026/06/09/building-an-interactive-digital-stamp-collection-with-shaders-postcards-and-playful-inspection/"
publishedDate: "2026-06-09"
category: "design"
feedName: "Codrops"
author: "Robert Pavlinić"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/OG_2.jpg.webp?x42294)](https://marijanapav.com/stamps "Building an Interactive Digital Stamp Collection with Shaders, Postcards, and Playful Inspection Demo")

Stamps are miniature art pieces that tell stories; they showcase places, people, and moments through the meticulous assembly of typography, illustration, and photography, all within a tightly constrained format. We wanted to pay homage to the craft of designing and collecting stamps (philately) by bringing stamps online for a new audience to enjoy.

When we started building the site, we knew we did not want a regular image gallery. The project was inspired by a real stamp album, so the website needed to retain some of that feeling too: calm, tactile, and made for inspection.

The main flow is simple. Browse through a loose field of stamps, select one to bring it into focus, and inspect it with a loupe. You can also learn more about each stamp, and when you’re done, you can even send us a message in the form of a postcard.

This article is a case study of how we made it: the story behind the project, the design process, the technical choices, and a few of the interactions that give the site its character.

## How the collection started

_by Marijana Pavlinić_ 

The collection started before there was any website at all. During the lockdowns, I was searching for a convenient personal side project to help me practice digital drawing. I wanted a project with a clear idea, but enough room to explore different styles.

At the time, I found a stamp album that had been passed down through my family from my grandpa, and the stamps inside it felt like the perfect source of inspiration. His collection was full of unexpected compositions, patterns, and typography, so I started inspecting and recreating them as vector drawings, not as exact copies, but as reinterpretations. The early ones were monoline, and over time I introduced texture and more complex typographic layouts as I learned new software.

![Set of monoline stamps.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/1-1.png.webp?x42294)

Set of monoline stamps

As the collection grew, I learned a lot about digital drawing and philately. I had an idea of turning it into something more, but it stayed that way for a while.

Almost five years later, I came back to it with my partner, and we started building the full experience. The challenge was not how to show the recreated stamps, but how to preserve the feeling of the original album.

-   How do we show the relationship between the original stamps and the recreations?
-   How do we make sure we are highlighting the original stamp as well?
-   How do we make it feel archival, fun, and exploratory?

That became our filter: does this feel like part of a stamp album, or just a website showing images?

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/2-1.png.webp?x42294)

A moodboard screenshot from Figma. The original red album from my grandpa is in the top right corner.

## The main interactions

Most of our time was spent on two particular interactions: the glass loupe and the feedback postcard. The whole portfolio is open source on [GitHub](https://github.com/buka-studio/www-marijanapav), so we’ll keep this focused just on the main ideas.

### Building the loupe

Once a stamp is selected, the loupe becomes available. This is where the experience shifts from browsing to inspection.

A normal zoom effect would have worked, but it felt too flat for this project. We wanted it to feel more like a real object sitting on top of the stamp: a small glass tool with a frame, edge distortion, and a zoom control.

The loupe is composed roughly as follows:

```
<Loupe>
  <Lens>
    <Canvas>
      <LensScene>
        <ScreenQuad>
          <lensMaterial />
        </ScreenQuad>
      </LensScene>
    </Canvas>
  </Lens>
  <Dial>
    <input type="range" />
    <svg />
  </Dial>
</Loupe>
```

### Reconstructing the scene

The loupe does not zoom the original image directly, and it does not capture the live DOM.

Instead, it reconstructs the focused scene in an offscreen canvas. It draws the same background grid, loads the larger stamp image when available, adds the shadow, and renders the focused stamp in the center. Using smaller images for the draggable stamps improved performance, while using the larger image only for the loupe allowed us to add more detail to the zoomed view, such as the paper grain texture.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/Frame-3-5.png.webp?x42294)

That canvas is then passed to the lens shader as a texture. This way, the loupe magnifies the composed stamp scene rather than just the original image file.

### Creating the glass effect

The shader samples the texture differently across the lens.

The center remains clearer, while the edges warp more. The red, green, and blue channels are sampled with slightly different offsets, which creates a subtle chromatic aberration effect around the rim.

That color separation, together with rim shading and highlights, makes the loupe feel more like glass and less like a circular crop.

The shader is not trying to be physically accurate. It just needs to feel believable in motion, especially around the edge of the lens.

### Interaction and accessibility

Dragging is handled with a motion drag controller. As the loupe moves, its center position is converted into local coordinates and passed to the shader as uniforms. The shader uses that position to determine which part of the canvas texture should appear under the lens. It can also be moved with the keyboard. The arrow keys move it around the selected stamp, and holding Shift moves it faster.

The visual frame is an SVG. It gives the loupe its shape, edge marks, highlights, inscription, and small dial details.

The zoom knob is backed by an element, giving it native keyboard behavior.

Accessibility was important to us because the loupe is not just a visual effect; it is part of the way you inspect the stamp.

## Turning feedback into a postcard

The feedback dialog started with a simple idea: if the project is about stamps, feedback should feel like something you send back.

The postcard has two sides. The front features a custom illustration, and the back contains the form. You flip it over to write feedback, just like turning over a real postcard. One early idea was to use the currently selected stamp on the form, but later Marijana created a separate stamp for the postcard, featuring the two of us and inspired by the first stamp ever, the [Penny Black](https://en.wikipedia.org/wiki/Penny_Black).

We imagined the person writing the feedback and tried to capture them in the moment of writing it. This is why the illustration changes based on screen size: on mobile, the person is holding a phone; on desktop, they are typing on a keyboard.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/4-3.png.webp?x42294)

Our cat Dora also found her way into the postcards.

The postcard is built as an accessible Radix dialog. The custom illustration, flip animation, and shader transition sit on top of that foundation. The component is composed roughly as follows:

```
<GenieDialog>
  <GenieDialogOverlay>
    <GenieBackdrop />
  </GenieDialogOverlay>
  <GenieDialogContent>
    <FlipCard>
      <FlipCardFront>
        <Image />
      </FlipCardFront>
      <FlipCardBack>
        <FeedbackForm/>
      </FlipCardBack>
    </FlipCard>
      {...}
  </GenieDialogContent>
  <GenieDialogTrigger />
</GenieDialog>
```

This way, the dialog still retains the expected accessibility features: focus management, keyboard support, and escape to close. The visual layer can be playful, but the underlying interaction remains familiar.

### Building the genie effect

We did not choose the genie effect because it was directly related to stamps. We mostly wanted to try it because it felt fun. But it ended up fitting the project nicely: the postcard feels like a small paper object being pulled out of the page, filled in, and sent back.

The important technical detail is that the real dialog is not being bent in the DOM. Instead, the animation uses a temporary shader layer.

When the dialog opens, the real postcard is mounted but kept hidden. We capture the visible side of the postcard with snapDOM, draw that capture into an overlay canvas, turn it into a WebGL texture, and animate that texture with the shader. When the animation finishes, we hide the shader layer and reveal the real dialog.

When closing, we do the reverse. We capture the current side of the postcard, hide the real dialog, animate the shader texture back out, and then unmount the dialog.

That also means the close animation always uses the current state. If the visitor is viewing the illustration side, that side gets captured. If they have flipped to the form side, the form side gets captured.

## Details that made it feel like an album

Once the main interactions worked, it was time to sweat the details.

The collection tabs look like binder dividers. The metadata is treated like a catalog card, listing the country, issue date, catalog codes, original stamp designer, and reference stamp. It uses a monospaced font and a typewriter-style text animation, which gives it an archival feel.

There are small collector references throughout. The elements on the right side resemble a Leuchtturm album used by stamp and coin collectors. Most of the grid controls and empty states use Marijana’s handwriting, which makes them feel more like annotations in an album than standard UI controls.

The feedback postcard features a stamp inspired by the Penny Black. The loupe has small edge marks, highlights, and an inscription, so it feels more like an object from the same world than a generic zoom control. The color palette and grain texture work together to mimic the look of real paper.

All these details help make the album concept feel more complete.

## Messages sent back

One of the nicest parts of launching the site was reading the messages people sent through the postcard dialog.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/3-2.png.webp?x42294)

A few of the 100+ messages people have sent through the postcard.

That was a sweet reminder of why we enjoy sharing our work online. You put something personal out there, and sometimes it reaches people in ways you did not expect. It can lead to kind messages, conversations, new connections, and even opportunities.

For a project about stamps and postcards, that felt especially fitting. We made a small digital experience about collecting and sending, and people sent something back.

## Reflecting back

The project became a good example of why we enjoy making side projects together.

Because we sit next to each other, the loop (pun intended) between design and development is very short. A visual idea can become a prototype quickly. A technical limitation can become a new design direction. A small interaction can be tested, changed, and polished without turning it into a major handoff.

The most enjoyable part was finding places where the theme could shape the interaction without becoming too literal. Some ideas start as experiments, but they still need to earn their place. The loupe belonged right away because it matched the act of inspection. The genie animation started as something fun to try, but once it was tied to the postcard, it felt much more at home.

In the end, the illustration, interaction, accessibility, and shaders all had to work together. None of them could carry the experience alone.