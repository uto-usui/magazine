---
title: "Announcing “use-sound”, a React Hook for Sound Effects"
source: "https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/"
publishedDate: "2020-03-30"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Maybe it's because I was an audio engineer, but I wish the web was louder.

I know a bunch of folks will disagree, and for good reason! Sound on the web has historically been used in annoying/awful ways:

-   The early web used MIDI files as background music.
    
-   Malware popups use sound effects for sinister purposes, to grab attention and make a scam more believable.
    
-   Autoplaying videos 😬
    

However, I believe that this is the bathwater around a baby very much worth saving. Sounds can accentuate user actions, emphasize feedback, and add a bit of delight to an otherwise humdrum action. When done tastefully, sound can make a product feel more tangible and real.

This isn't a new idea: video games and mobile apps use sound all the time. In fact, the web is the odd one out; most forms of digital media I can think of uses sound.Not to mention touch! Mobile apps use haptic feedback to extend their reach even further into reality.

When I built this blog, I wanted to experiment with this. Many UI controls make little sounds when they're interacted with. Here's a quick selection from this site:

Because sound is used so rarely on the web, it can be quite impactful. It's a bit of a secret weapon, and it can make a surprisingly big difference for the right kinds of projects!

To make it a bit easier to get started, I pulled out the hook I built for this blog, `use-sound`, and published it on NPM. This tutorial gives a quick look at what it can do, and shares additional tips and tricks for using sound on the web.

## [Link to this heading](#overview-1)Overview

`use-sound` is a React hook that lets you play sound effects. Here's a typical example:

```
import useSound from 'use-sound';

import boopSfx from '../../sounds/boop.mp3';

const BoopButton = () => {
  const [play] = useSound(boopSfx);

  return <button onClick={play}>Boop!</button>;
};
```

It adds ~1kb (gzip) to your bundle, though it does asynchronously load a 10kb third-party dependency, [Howler(opens in new tab)](https://howlerjs.com/).

It offers a bunch of niceties out of the box, including:

-   Prematurely stop the sound, or pause/resume the sound.
    
-   Load an audio sprite and split it up into many individual sounds.
    
-   Tweak playback speed to speed up / slow down sounds.
    
-   Tons of event listeners.
    
-   Lots of other advanced stuff, made possible by Howler.
    

Check out [the documentation(opens in new tab)](https://github.com/joshwcomeau/use-sound) for a comprehensive usage guide and API reference.

## [Link to this heading](#getting-started-2)Getting started

### [Link to this heading](#installation-3)Installation

The first thing we need to do is install the package, via Yarn or NPM:

```
yarn add use-sound
```

### [Link to this heading](#imports-4)Imports

This package exports a single default value: the `useSound` hook:

```
import useSound from 'use-sound';
```

You'll also need to import audio files to use with this hook.

If you're using something like `create-react-app`/Gatsby, you should be able to import MP3 files the same way you import other forms of media like images:

```
import boopSfx from '../../sounds/boop.mp3';
```

If you're rolling your own Webpack config, you'll want to use [file-loader(opens in new tab)](https://webpack.js.org/loaders/file-loader/) to treat `.mp3` files as arbitrary files.

You can also refer to paths of files put in a `public` or `static` directory. The demos on this page, for example, point to static files kept in a publicly-accessible folder.

## [Link to this heading](#finding-and-prepping-sounds-5)Finding and prepping sounds

Installing dependencies and writing code is only half the story; we also need to find audio samples!

My favourite resource is [freesound.org(opens in new tab)](https://freesound.org/). Almost all of the sound effects used in this blog come from that resource. It's a large index of [Creative Commons Zero(opens in new tab)](https://creativecommons.org/publicdomain/zero/1.0/deed) licensed sounds. You do need to sign up for an account to download files, but everything is free.

#### [Link to this heading](#preparing-sounds-6)Preparing sounds

Many of the sounds on freesound.org will need a bit of tidying up:

-   Like strings, sounds can be padded with empty space. You'll want to trim it off, so that the effect is heard the moment you trigger the sound.
    
-   You might want to tweak the volume of samples so that they're all kept around the same level.
    
-   Sounds on freesound come in many audio formats. You may wish to convert the sample to MP3.
    

To do these edits, you can use [Audacity(opens in new tab)](https://www.audacityteam.org/), a free, open-source, cross-platform audio editor. Learning to use Audacity is beyond the scope of this tutorial, but there are many amazing free resources online!

## [Link to this heading](#sound-and-accessibility-7)Sound and accessibility

Even as an advocate for sound on the web, I recognize that not all users will appreciate it. And this goes beyond a subjective preference for silence.

People who are visually impaired use a screen reader to access the webAnd they're not alone - many different types of folks use screen readers, including people who are dyslexic or who have other visual processing disabilities. Screen readers are pieces of software that parse the document and narrate its contents as sound. If we're loading our website full of sound effects, these sounds might clash with the narration they depend on to make sense of our site.

For this reason, it's important to include a "mute" button somewhere on your page, accessible by using keyboard navigation (the "Tab" key). Ideally, no sounds should take place until the user has reached that control in the tab order, and the value should be ["sticky"](https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/) so that the user doesn't have to keep toggling it.

Conversely, deaf users will have no idea that sounds are being triggered, as will folks who have muted their devices. For that reason, it's important that critical information is never communicated exclusively by sound. If you're using a sound effect to serve as confirmation for a user action, be sure to also have a visual indication. Sites should remain 100% usable without sound.

## [Link to this heading](#recipes-8)Recipes

Let's take a look at a few live-editable demos!

### [Link to this heading](#checkbox-9)Checkbox

I find this checkbox _so_ satisfying. If you're using a mouse, try doing a really quick click, and then adding a bit of a delay between mouse-down and mouse-up.

Checkbox Demo

import React from 'react';
import useSound from 'use-sound';

import Checkbox from './Checkbox';

function CheckboxDemo() {
  const \[isChecked, setIsChecked\] = React.useState(false);

  const \[playActive\] = useSound('/sounds/pop-down.mp3', {
    volume: 0.25,
  });
  const \[playOn\] = useSound('/sounds/pop-up-on.mp3', {
    volume: 0.25,
  });
  const \[playOff\] = useSound('/sounds/pop-up-off.mp3', {
    volume: 0.25,
  });

  return (
    <Checkbox
      name\="demo-checkbox"
      checked\={isChecked}
      size\={20}
      label\="I agree to the terms"
      onChange\={() \=> setIsChecked(!isChecked)}
      onMouseDown\={playActive}
      onMouseUp\={() \=> {
        isChecked ? playOff() : playOn();
      }}
    />
  );
}

export default CheckboxDemo;

### [Link to this heading](#interrupting-sounds-10)Interrupting sounds

Sometimes, you only want a sound to play while the user is interacting with it. Notice how the following sample only plays while being hovered:

Popping Arrows Demo

import React from 'react';
import useSound from 'use-sound';

import styles from './PopsDemo.module.css';

const ARROW\_DELAY = 125;
const SOUND\_URL = '/sounds/rising-pops.mp3';

function PopsDemo() {
  const \[isHovering, setIsHovering\] = React.useState(false);
  const \[play, { stop }\] = useSound(SOUND\_URL, { volume: 0.5 });

  return (
    <button
      className\={styles.btn}
      onMouseEnter\={() \=> {
        setIsHovering(true);
        play();
      }}
      onMouseLeave\={() \=> {
        setIsHovering(false);
        stop();
      }}
    \>
      Hover over me!
      <svg
        width\="36"
        height\="12"
        viewBox\="0 0 36 12"
        fill\="none"
        className\={styles.arrowSvg}
      \>
        <path
          d\="M0.75 6H11.25 M6 0.75L11.25 6L6 11.25"
          stroke\="var(--color-primary)"
          strokeLinecap\="round"
          strokeLinejoin\="round"
          style\={{
            opacity: true ? 1 : 0,
            transition: \`opacity ${isHovering ? 0 : ARROW\_DELAY}ms\`,
          }}
        />

        <path
          d\="M15 10L19.5 5.5L15 1"
          stroke\="var(--color-primary)"
          strokeLinecap\="round"
          strokeLinejoin\="round"
          style\={{
            opacity: isHovering ? 1 : 0,
            transition: \`opacity ${isHovering ? 0 : ARROW\_DELAY}ms\`,
          }}
        />
        <path
          d\="M23 10L27.5 5.5L23 1"
          stroke\="var(--color-primary)"
          strokeOpacity\="0.66"
          strokeLinecap\="round"
          strokeLinejoin\="round"
          style\={{
            opacity: isHovering ? 1 : 0,
            transition: \`opacity ${
              isHovering ? 0 : ARROW\_DELAY
            }ms ${ARROW\_DELAY}ms\`,
          }}
        />
        <path
          d\="M31 10L35.5 5.5L31 1"
          stroke\="var(--color-primary)"
          strokeOpacity\="0.35"
          strokeLinecap\="round"
          strokeLinejoin\="round"
          style\={{
            opacity: isHovering ? 1 : 0,
            transition: \`opacity ${
              isHovering ? 0 : ARROW\_DELAY
            }ms ${ARROW\_DELAY \* 2}ms\`,
          }}
        />
      </svg\>
    </button\>
  );
}

export default PopsDemo;

### [Link to this heading](#rising-pitch-11)Rising pitch

A fun trick I use on the "Like" button is to pitch up a sound every time it plays. Here's how that works:

Rising Pitch Demo

import React from 'react';
import useSound from 'use-sound';

import styles from './RisingDemo.module.css';

function RisingDemo() {
  const soundUrl = '/sounds/glug-a.mp3';

  const \[playbackRate, setPlaybackRate\] = React.useState(0.75);

  const \[play\] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });

  const handleClick = () \=> {
    setPlaybackRate(playbackRate + 0.1);
    play();
  };

  return (
    <button className\={styles.btn} onClick\={handleClick}\>
      <span role\="img" aria-label\="Like this post"\>
        💖
      </span\>
    </button\>
  );
}

export default RisingDemo;

### [Link to this heading](#playpause-button-12)Play/pause button

Build the next Spotify with this razzle-dazzle play/pause button.

Play/Pause Demo

import React from 'react';
import useSound from 'use-sound';

import PlayButton from './PlayButton';
import styles from './PlayPauseDemo.module.css';

const soundUrl = '/sounds/guitar-loop.mp3';

function PlayPauseDemo() {
  const \[isPlaying, setIsPlaying\] = React.useState(false);
  const \[play, { stop }\] = useSound(soundUrl, {
    onend: () \=> setIsPlaying(false),
  });

  return (
    <PlayButton
      className\={styles.btn}
      active\={isPlaying}
      size\={60}
      iconColor\="hsl(0deg 0% 100%)"
      idleBackgroundColor\="hsl(210deg 15% 6%)"
      activeBackgroundColor\="hsl(240deg 95% 62%)"
      play\={() \=> {
        play();
        setIsPlaying(true);
      }}
      stop\={() \=> {
        stop();
        setIsPlaying(false);
      }}
    />
  );
}

export default PlayPauseDemo;

### [Link to this heading](#sprites-13)Sprites

If your component is going to use _lots_ of sounds, it can be worthwhile to use an audio sprite. A sprite is an audio file with many different sounds. By combining them into a single file, it can be a bit nicer to work with, plus you avoid many parallel HTTP requests.

Here we use a sprite to build a drum machine! Test it out by clicking/tapping on the buttons, or using the numbers 1 through 4 on your keyboard.If the keyboard shortcuts aren’t working for you, try clicking one of the buttons first. This is necessary because the playgrounds on this blog use iframes.

Checkbox Demo

import React from 'react';
import useSound from 'use-sound';

import styles from './DrumMachineDemo.module.css';

function DrumMachineDemo() {
  const soundUrl = '/sounds/909-drums.mp3';

  const \[play\] = useSound(soundUrl, {
    sprite: {
      kick: \[0, 350\],
      hihat: \[374, 160\],
      snare: \[666, 290\],
      cowbell: \[968, 200\],
    }
  });

  
  
  
  useKeyboardBindings({
    1: () \=> play({ id: 'kick' }),
    2: () \=> play({ id: 'hihat' }),
    3: () \=> play({ id: 'snare' }),
    4: () \=> play({ id: 'cowbell' }),
  })

  return (
    <div className\={styles.wrapper}\>
      <button
        aria-label\="kick"
        className\={styles.btn}
        onMouseDown\={() \=> play({ id: 'kick' })}
      \>
        1
      </button\>
      <button
        aria-label\="hihat"
        className\={styles.btn}
        onMouseDown\={() \=> play({ id: 'hihat' })}
      \>
        2
      </button\>
      <button
        aria-label\="snare"
        className\={styles.btn}
        onMouseDown\={() \=> play({ id: 'snare' })}
      \>
        3
      </button\>
      <button
        aria-label\="cowbell"
        className\={styles.btn}
        onMouseDown\={() \=> play({ id: 'cowbell' })}
      \>
        4
      </button\>
    </div\>
  );
}

const useKeyboardBindings = (map) \=> {
  React.useEffect(() \=> {
    const handlePress = (ev) \=> {
      const handler = map\[ev.key\];

      if (typeof handler === 'function') {
        handler();
      }
    };

    window.addEventListener('keydown', handlePress);

    return () \=> {
      window.removeEventListener('keydown', handlePress);
    };
  }, \[map\]);
};

export default DrumMachineDemo;

Sprites are covered in more detail in [the API documentation(opens in new tab)](https://github.com/joshwcomeau/use-sound#sprites)

## [Link to this heading](#a-million-possibilities-14)A million possibilities

The thing that strikes me about using audio on the web is that there is so much under-explored territory. I've been experimenting with sound for a while now, and I still feel like I'm just scratching the surface.

You've been given the tools to start experimenting, and I'd encourage you to have some fun with this, and see where it takes you =)

You can learn more about the `use-sound` hook [on Github(opens in new tab)](https://github.com/joshwcomeau/use-sound).

## [Link to this heading](#my-latest-thing-15)My latest thing

Over the past two years, I've been hard at work creating the ultimate learning experience for React. I call it [“The Joy of React”(opens in new tab)](https://www.joyofreact.com/).

[![Visit the “Joy of React” homepage](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fjoy-of-react.png&w=3840&q=75)](https://www.joyofreact.com/)

I've been building with React for over 10 years now, and I've learned a lot about how to use it effectively. I absolutely love working with React; I've tried just about every front-end framework under the sun, and nothing makes me feel as productive as React.

In “The Joy of React”, we'll build a mental model for how React really works, digging into concepts like we have in this tutorial. Unlike the posts on this blog, however, my courses use a “multi-modality” approach, mixing written content like this with video content, exercises, interactive explorables, and even some minigames!

You can learn more about the course, and discover the joy of building with React:

-   [The Joy of React(opens in new tab)](https://www.joyofreact.com/)
    

### Last updated on

May 9th, 2025