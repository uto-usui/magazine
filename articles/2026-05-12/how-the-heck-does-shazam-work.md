---
title: "How the heck does Shazam work?"
source: "https://perthirtysix.com/how-the-heck-does-shazam-work"
publishedDate: "2026-05-11"
category: "design"
feedName: "Sidebar"
---

How audio fingerprinting and a connect-the-dots trick lets Shazam identify a song in seconds.

[![Shri Khalpada](https://perthirtysix.com/people/shri-bw.jpg)](https://perthirtysix.com/about)

Shri Khalpada

April 20, 2026

Part of _How The Heck?_, a series of interactive explanations of everyday technology designed primarily for curious, non-technical readers.

If you like these, you can follow the [author](https://bsky.app/profile/shrikhalpada.dev), buy him a [coffee](https://www.buymeacoffee.com/shrikhalpada), or [suggest what comes next](mailto:shri@perthirtysix.com).

You're at a coffee shop. A song comes on. It's right on the tip of your tongue. You pull out your phone, tap a button, and it tells you what it is in a few seconds.

How does a phone listen to a few seconds of music through a noisy room and instantly match it against millions of songs?

Your first instinct might be that the phone is listening to the melody or recognizing the lyrics. It's neither of those. What it's actually doing is far more clever.

### Reverse Engineering Sound

TL;DR

Your phone captures sound as a waveform using a very thin membrane. This waveform is not useful for song identification, so a process called the Fast Fourier Transform is used to convert it into a three-dimensional representation of sound called a spectrogram.

Your phone's microphone uses an extremely thin membrane called a diaphragm to measure the vibrations in the air caused by sound. Those vibrations are converted into an electrical signal, which is digitized into a waveform: a sequence of numbers representing air pressure at each instant in time.

This is similar to how your eardrum catches those same pressure waves, but while your brain turns them into sound, your phone turns them into a sequence of numbers.

The raw waveform itself isn't very useful for identification. A song played louder produces a completely different waveform even though it's the same song. Two different songs can produce very similar waveforms, and the same song played in different environments can produce different waveforms.

The trick is to transform the waveform into something more useful for a computer. Your phone runs a mathematical operation called a Fast Fourier Transform (FFT) on small slices of the waveform. Each slice gets decomposed from a single complex wave into a list of the individual frequencies present at that moment. You can think of it as asking: _which pure tones would you need to add together to recreate this slice of sound?_

Stacking all those slices side by side gives us a spectrogram, which represents sound in three dimensions: time runs along the X-axis, frequency along the Y-axis, and the brightness of each point represents amplitude (how loud that frequency is at that moment).

What does the FFT actually do?

Any waveform, no matter how jagged, can be described as a sum of smooth sine waves at different frequencies, amplitudes, and phases. The Fast Fourier Transform is an efficient algorithm for decomposing a chunk of audio samples into exactly that list. Feed it 1,024 samples of raw audio (about 23 milliseconds at CD quality), and it returns a spectrum telling us how much energy is present at each frequency. The core formula is the Discrete Fourier Transform:

For each frequency bin , you multiply every sample by a sine wave at that frequency and add them up. If the signal contains that frequency, the sum is large. If not, it cancels out.

The "fast" part matters. A naive decomposition would take millions of operations per chunk. The FFT exploits symmetry in the math to do it in roughly operations instead (where is the number of samples in the chunk). This is fast enough to run hundreds of times per second on a phone. Your device slides this window across the audio, runs the FFT on each slice, and stacks the resulting spectra side by side. That stack is the spectrogram.

Try playing some notes and chords below to see how both the waveform and spectrogram change.

The picture above is hopefully illustrative, but it's a bit simplistic. Those are simple synthetic tones. Each note is a pure frequency whose waveform is a perfect sine wave. Most music, thankfully, is more complex. Think of the last song you listened to and how many layers of sound it had, each one individually and collectively composed of many frequencies.

You can try playing music or humming into your microphone below to see how the spectrogram looks with real audio. It's a lot messier, but the FFT still paints a clear picture of what it hears in real time.

The phone samples incoming sound tens of thousands of times per second (typically [44,100 Hz](https://en.wikipedia.org/wiki/44,100_Hz), the same rate used in CDs). Each tiny slice of those samples gets fed through the FFT, and what comes out the other side is a format that the system can start to reason about.

### Less Is More

TL;DR

The algorithm deliberately discards most of the spectrogram, keeping only the loudest peaks: a sparse "constellation map".

Even for a computer, storing and searching all of that spectrogram data would be impossibly slow, so the algorithm does something counterintuitive: it throws almost all of it away.

Drag the threshold slider below and watch what happens. As you raise the threshold, the faint signals disappear while loudest peaks survive, leaving only a sparse collection of dots. These dots represent the most acoustically significant landmarks in the recording.

This is what makes the system robust to noise. Background noise adds low-level energy across the spectrogram, but it rarely creates the single loudest peak in any given region. The landmarks are the frequencies that were so dominant they punched through the noise.

On the flipside, this "fingerprint" approach is also what makes Shazam work poorly if you just sing into it. You're likely to generate different hashes than the original song, even if you are a very good singer! This is why newer, machine-learning-based systems are built to handle humming and singing, by matching on melody rather than exact frequencies.

### Connecting the Dots

TL;DR

A single peak doesn't tell us much, but pairs of peaks are much less random. The algorithm pairs nearby peaks to create unique fingerprint hashes.

A single dot in the constellation isn't very useful on its own. A frequency of 1,200 Hz at some moment in time could appear in thousands of songs. But a pair of dots, say 1,200 Hz followed by 2,400 Hz exactly 0.3 seconds later, is a lot more specific.

The algorithm gives every peak a turn as an **anchor**. For each one, it defines a **target zone** to its right (a window of time and frequency) and pairs the anchor with every peak inside that zone. Each pair generates a compact _hash_ from three numbers: the two frequencies and the time difference between them.

You can think of a hash as a short string of characters that acts like a shorthand code: the same three inputs will always produce the same hash, but even a tiny change in any input produces a completely different one. Under the hood, Shazam and similar systems have systematic ways to account for small variations, but because the hashes are built from exact frequencies and timing, they effectively act as fingerprints of a specific recording rather than the underlying song. This means that covers and remixes are harder to match.

You can try it below by clicking any dot to select an anchor, then clicking one in the target zone.

A single 3-minute song might generate thousands of these fingerprint hashes, and the database stores them all. Now the phone has a handful of hashes from its 5-second clip, and the database has millions of hashes from almost every popular song ever recorded. How does it find the match?

### Finding The Perfect Match

TL;DR

Each hash is an address. The system looks up every hash from your clip in a massive table and instantly finds which songs share them.

#### A Naive Approach: The Song-First View

We intuitively think of music in terms of songs. Armed with that mental model, you'd have to search every song, one by one, checking whether its hashes overlap with the ones from your clip. This operates in time, which is a computer scientist's way of saying it gets slower the more songs the world creates.

Try the example below, which represents a simplified version of the problem with a few songs and hashes.

#### An Inverted Index: The Hash-First View

Computers can flip the script. Instead of asking _"which song matches this sequence of sounds?"_, the phone asks _"for each of these sounds, which songs contain them?"_ for each hash in the clip. It's the same idea as the index at the back of a book: rather than re-reading every page to find a word, you jump to the word's entry and see every page it lives on.

This essentially makes the lookup operation , meaning it takes _roughly_ the same amount of time whether you have 100 songs or 100 million. More precisely, the phone goes straight to each hash's address rather than scanning through songs, and the number of possible hashes is large enough that each address only contains a handful of entries, even across millions of songs.

Finding shared hashes isn't enough, though. A popular drum pattern might produce the same hash in hundreds of songs. The final test is timing. If your clip has 17403C and 19A998 1.2 seconds apart, the matching song must also have them 1.2 seconds apart. If the time gaps between all the matching hashes agree, and there are enough matches, the system can be confident in the match.

The system is designed around operations that computers are _very_ good at: comparing numbers and looking up addresses. The whole lookup happens in fractions of a second across millions of songs.

### More Modern Approaches

Most song-identification services, like Shazam, send your audio clip to a server where a massive database of fingerprints lives. The server does the matching and sends back the result. This approach works because the database is enormous and dynamic, and searching it requires serious compute.

There are newer, leaner approaches as well. Apple's on-device recognition and Google's [Pixel "Now Playing" feature](https://research.google/pubs/now-playing-continuous-low-power-music-recognition/) run fully locally on your phone. They use smaller, curated databases and optimized models that trade exhaustive coverage for speed, and have more sophisticated machine learning approaches that are more robust to noise and variations in the audio.

As with anything, there are tradeoffs. Although the on-device approach is faster and works without an internet connection, it has a much smaller database of songs to match against. These on-device databases are typically slower to update with new songs, and have to pull new data if it detects your location changes. The hit songs in Japan are likely to be different from the hit songs in the US, and vice versa.

Regardless of where the matching happens, the core trick is the same. By throwing away almost everything and keeping only a handful of landmark peaks, a noisy 5-second clip from a coffee shop becomes a set of coordinates precise enough to pinpoint one song out of millions. Recognition, it turns out, is mostly an exercise in ignoring the right things.

I think one of the reasons I enjoy this algorithm so much is that it's clever, but also deterministic and transparent once you understand the steps. These types of approaches hold a special place in my heart, because so much technology today is built on opaque machine learning models which, while very powerful, don't have the same elegance and interpretability.

Much of this piece is based on Avery Wang's original 2003 paper, [An Industrial-Strength Audio Search Algorithm](https://www.ee.columbia.edu/~dpwe/papers/Wang03-shazam.pdf). If you want to go deeper into the signal processing and system design behind Shazam, it's worth your time.

### Thank you!

If you like this type of content, you can follow me on [BlueSky](https://bsky.app/profile/shrikhalpada.dev). If you wanted to support me further, buying me a [coffee](https://www.buymeacoffee.com/shrikhalpada) would be much appreciated. It helps us keep the lights on and the servers running! ☕