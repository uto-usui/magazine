---
title: "The computer that helped win World War II"
source: "https://spectrum.ieee.org/colossus-computer-ieee-milestone"
publishedDate: "2026-08-04"
category: "design"
feedName: "Sidebar"
---

One summer day in 1941, a British radio operator was monitoring German military frequencies and heard something unexpected in her [headphones](https://spectrum.ieee.org/tag/headphones). A later report called it “strange new music.” Sounding unlike the familiar Morse dit-dit-dah of enciphered messages sent over the German [Enigma](https://spectrum.ieee.org/build-your-own-enigma-cipher-machine) network, the “new music” was a rhythmic warble of binary teletype code being transmitted at high speed.

Germany’s wartime engineers had developed a radically new [encryption](https://spectrum.ieee.org/tag/encryption) and transmission system. It was way more advanced than [Enigma](https://spectrum.ieee.org/tag/enigma), which was patented in 1920.

To break the complex new cipher, engineer [Tommy Flowers](https://www.english-heritage.org.uk/visit/blue-plaques/tommy-flowers/) built [Colossus](https://spectrum.ieee.org/the-hidden-figures-behind-bletchley-parks-codebreaking-colossus), the world’s first large-scale programmable electronic digital computer. Flowers previously built Enigma-related codebreaking equipment for [Alan Turing](https://spectrum.ieee.org/turing-and-the-test-of-time), the British mathematician.

Colossus was installed in the British codebreaking headquarters at [Bletchley Park](https://www.bletchleypark.org.uk/our-story/), about 80 kilometers from London. The room-size machine weighed around a tonne.

The computer is being commemorated as an [IEEE Milestone](https://ieeemilestones.ethw.org/Milestone-Proposal:Colossus). The dedication [ceremony](https://www.eventbrite.co.uk/e/1983872382701?aff=oddtdtcreator) is scheduled to be held 29 September at [Bletchley Park](https://spectrum.ieee.org/tag/bletchley-park).

## Decrypting Germany’s strange new music

Britain’s top codebreakers were quickly all over the new “music” being picked up by the intercept stations. Identifying it as encrypted teletype code was the easy part. The real problem was figuring out how the encryption machine worked. Its manufacturer was discovered at the end of the war: Berlin engineering firm [C. Lorenz](https://en.wikipedia.org/wiki/C._Lorenz_AG).

But in 1941, the Lorenz machine was just a black box to the British. They codenamed it “Tunny,” a British term for tuna fish. The Enigma breakers had set a precedent for using piscine codenames such as Dolphin, Lumpsucker, and Porpoise.

Enigma had three or four encrypting wheels. The codebreakers guessed that the [Tunny machine](https://museum.cs.auckland.ac.nz/rutherfordjournal/article030109.html) also used a system of rotating wheels to encrypt messages. An important clue was that all the intercepted messages shared a curious feature: Each began with an uncoded list of 12 common German names, including Anton, Bertha, Conrad, and Dora. The codebreakers guessed that Tunny had 12 wheels and that the 12 names and their order somehow told the receiving operator which combination they should twist the wheels to before decrypting the message.

Then the British had an extraordinary piece of good fortune. [John Tiltman](https://media.defense.gov/2021/Jul/13/2002761958/-1/-1/0/TILTMAN.PDF), head of the research section at Bletchley Park, started analyzing a pair of intercepted messages, each around 1,200 characters long. Unusually, both began with the same sequence of names. The second message turned out to be a retype of the first, with minor differences in punctuation, a few abbreviations, and other small divergences. Tiltman managed to decrypt the two ciphertexts using a mixture of educated guesswork and intuition. The resulting 1,200 or so pairings of ciphertext and plaintext characters proved to be enough information to deduce the workings of the Tunny machine.

That was thanks to [Bill Tutte](https://link.springer.com/article/10.1007/s00283-024-10386-7), a quiet young codebreaker who spent weeks poring over the pairings. One day, he shyly announced to his superiors how Tunny worked. His description was uncannily accurate.

The next step in the Tunny machine’s downfall was achieved by [Turing](https://www.britannica.com/biography/Alan-Turing), fresh from his successes against Enigma.

Knowledge of how the Tunny machine worked was not enough to decrypt the messages. Codebreakers also required detailed information about how the wheels of the sender’s machine had been set up. There were adjustable pins around the circumference of each wheel: In one of its two possible positions, a pin would contribute a 1 to the encryption process, and in the other, a 0. The pins were reset from time to time.

The codebreakers also needed to know the wheels’ positions at the start of the message—which the German operators gave away in the list of 12 names.

Turing invented a tricky method, called “[Turingery](https://museum.cs.auckland.ac.nz/rutherfordjournal/article030109.html#section06),” that enabled codebreakers to deduce the positions of the pins from nothing but intercepted ciphertext.

After that, the message could be decrypted, using the list of names and a British replica of the Tunny machine.

The basis of Turingery was a procedure that Turing introduced, called “delta-ing” (from the Greek letter delta). Also known as “differencing,” the process used “sideways” addition: To delta the four letters ABCD, you add (at the bit level) A to B, B to C, and C to D. Turing used delta-ing to reveal information about the wheels.

Tunny messages, often signed by Adolph Hitler himself, turned out to be pure gold for the Allies. The machine was used in Berlin by the [Armed Forces High Command](https://en.wikipedia.org/wiki/Oberkommando_der_Wehrmacht) to communicate with front-line generals directing the war in the Eastern and Western theaters.

Once the system was broken, the Allies could eavesdrop on lengthy back-and-forth communications between the architects of Germany’s battle plans.

Turingery was the codebreakers’ only weapon against Tunny for a year, during which they managed to decrypt 1.5 million letters of ciphertext.

But everything changed when those helpful lists of names at the start of each message disappeared.

At the same time, Turingery was becoming less effective. Turing’s method depended on the German sender mistakenly using the same wheel settings to encrypt two differing messages. As security tightened across the Tunny network, the blunder became rarer.

Fortunately, Tutte had been at work devising a different decryption method, based on Turing’s delta-ing but taking a novel approach.

## Building the Colossus computer

Tutte had found a way of deducing wheel information from ciphertext, with no list of names or blunders by the German operators required. His method made use of statistical properties of the Tunny machine itself.

At first, it wasn’t clear how to apply his statistical method, however. The Tunny breakers worked by hand. Applying Turingery to a message was like solving a monster [Sudoku](https://sudoku.com/) or crossword puzzle.

Tutte’s statistical method required scads of routine binary math, as well as a colossal amount of counting long binary sequences. If the process were done by hand, one message could take months to decrypt. What was needed was a machine to automate the process.

![Black and white portrait of a man with short gelled hair in a suit jacket, tie and eyeglasses. ](https://spectrum.ieee.org/media-library/black-and-white-portrait-of-a-man-with-short-gelled-hair-in-a-suit-jacket-tie-and-eyeglasses.jpg?id=67521153&width=980)Engineer Thomas H. Flowers developed Colossus to break a complex new German cipher.Pictorial Press/Alamy

The first plan was to build a machine from electromagnetic relays, adding a couple of dozen [vacuum tubes](https://spectrum.ieee.org/tag/vacuum-tubes) to speed up the counting. Electronic tubes were much faster than electromagnetic relays, which had slow-moving metal components. Problems with the [circuit design](https://spectrum.ieee.org/tag/circuit-design) bedeviled the machine’s relay-based logic unit, however.

Flowers was recommended by Turing and brought in to troubleshoot. He was on loan to Bletchley Park from the [Post Office Research Station](https://en.wikipedia.org/wiki/Post_Office_Research_Station) in London, where he had spent the prewar years designing experimental switching equipment involving thousands of vacuum tubes.

At the time, it was commonly believed that tubes could not be used in large numbers because each one contained a hot filament. This meant tubes were prone to sudden death. In a large installation, it would not be long before one tube blew and things stopped working properly.

Flowers discovered that switching tubes on and off stressed them, but leaving them on continuously made them more reliable than relays. He offered to build Bletchley Park a high-speed, all-electronic machine containing around 2,000 tubes.

Bletchley Park’s advisors rejected the idea, convinced that such a machine would never work reliably. But Flowers, confident of his proposed design, retreated to his London laboratory and quietly built the electronic machine that he believed the codebreakers needed. He and his small team of engineers worked day and night for 10 months to create Colossus.

In January 1944 some of his engineers showed up at Bletchley Park with the world’s first large-scale programmable electronic digital computer packed onto the back of a truck. Colossus was reassembled and functional in about two weeks, and it notched up its first German message on 5 February 1944.

The machine read the input—Tunny ciphertext—photoelectrically from a large loop of punched paper tape. The output—information about the wheels—went to a primitive printer that Flowers’ engineers had created from a manual typewriter, fitting relays to automate the keys. Once Colossus had cracked enough of the Tunny machine’s wheels, the information was passed on to the hand-breakers, who took over.

The codebreakers were astonished by Colossus.

“I don’t think they understood very clearly what I was proposing until they actually had the machine,” Flowers said in a [1977 interview](https://www.computerhistory.org/collections/catalog/102706707/). “They just couldn’t believe it!”

Colossus was described in almost loving terms in a since-[declassified report](https://www.alanturing.net/tunny_report) written at Bletchley Park in 1945:

__It is regretted that it is not possible to give an adequate idea of the fascination of a Colossus at work: its sheer bulk and apparent complexity; the fantastic speed of thin paper tape round the glittering pulleys; the childish pleasure of not-not, span, print main heading and other [gadgets](https://spectrum.ieee.org/tag/gadgets); the wizardry of purely mechanical decoding letter by letter (one novice thought she was being hoaxed); the uncanny action of the typewriter in printing the correct scores without and beyond human aid; the stepping of display; periods of eager expectation culminating in the sudden appearance of the longed-for score; and the strange rhythms characterizing every type of run: the stately break-in, the erratic short run, the regularity of wheel-breaking, the stolid rectangle interrupted by the wild leaps of the carriage-return, the frantic chatter of a motor run, even the ludicrous frenzy of hosts of bogus scores.__

## The demand for more Colossi

Bletchley Park’s managers, no longer leery of Flowers’s ideas, soon wanted additional Colossi. He finished building the second one in June 1944, days before D-Day and the Allied invasion of Europe. With 2,400 vacuum tubes—around 800 more than in Colossus I—Colossus II processed Tunny messages at an eye-watering speed of 25,000 characters per second.

Its maximized timing-pulse rate was not far short of the performance of the first [Intel](https://www.intel.com/content/www/us/en/company-overview/company-overview.html) [microprocessor chip](https://spectrum.ieee.org/25-microchips-that-shook-the-world) from the 1970s, more than 30 years later.

Flowers conceded that “Colossus bore about as much resemblance to a modern computer as [Stephenson’s \[1829\] Rocket locomotive](https://en.wikipedia.org/wiki/Stephenson%27s_Rocket) did to the [Royal Scot](https://en.wikipedia.org/wiki/Royal_Scot_\(train\)),” a state-of-the-art 20th-century train operating between London and Glasgow. But he emphasized that, nevertheless, Colossus “embodied all the basic features of a modern computer.” In Colossus, Flowers had pioneered clock pulses, bit-stream generators, control circuits, loops, counters, shift registers, interrupts, [parallel processing](https://spectrum.ieee.org/tag/parallel-processing), and more.

As the Allies slowly fought their way toward [Germany](https://spectrum.ieee.org/tag/germany), the Colossi poured out wheel information, and the codebreakers provided the military with an unparalleled view of German strategies, strengths, weaknesses, and tactical intentions.

Even with that mass of detailed intelligence, it took the Allies almost a year to move from Northern [France](https://spectrum.ieee.org/tag/france) to the German [heartland](https://spectrum.ieee.org/tag/heartland). No one can say for sure how much longer the fighting would have lasted if the intelligence breakthrough had not occurred. But if Colossus and the codebreakers shortened the war even by only six months, the number of lives saved was in the millions.

There were 10 Colossi at Bletchley Park by the end of the war, housed in two vast, steel-frame, bombproof buildings, running day and night. Although concealed behind a thick veil of secrecy, Bletchley Park accommodated the world’s first electronic computing facility. It was directed by [Max Newman](https://en.wikipedia.org/wiki/Max_Newman), the mathematician who mentored Turing in prewar Cambridge.

I don’t think they understood very clearly what I was proposing until they actually had the machine. They just couldn’t believe it!”**—Tommy Flowers**

When the fighting ended, authorities decided that ultrasecrecy must be maintained, and orders were issued to break up the Colossi. Only two were spared.

“All that was left were the deep holes in the floor where the machines had stood,” Colossus operator [Dorothy Du Boisson](https://en.wikipedia.org/wiki/Dorothy_Du_Boisson) recalled in an interview for the book [__Colossus: The Secrets of Bletchley Park’s Codebreaking Computers__](https://www.amazon.com/Colossus-secrets-Bletchley-code-breaking-computers/dp/0199578141). Norman Thurlow, one of Flowers’s engineers who was also interviewed, remembered being told in a staff memo that if the secrecy was ever lifted, he and his colleagues might be able to tell their grandchildren about Colossus and “the tapes that span on silver wheels.”

## [IEEE Milestone](https://spectrum.ieee.org/tag/ieee-milestone) dedication at Bletchley Park

The Milestone plaque recognizing Colossus is to be displayed outside Block H at Bletchley Park, near Milton Keynes, England.

The plaque is to read:

__Six Colossus codebreaking computers operated in this building in 1944–1945. Designed by Thomas H. Flowers of the British Post Office, they enabled deciphering of encrypted radio messages transmitted between German commands across occupied Europe, [North Africa](https://spectrum.ieee.org/tag/north-africa), and the [Soviet Union](https://spectrum.ieee.org/tag/soviet-union). The resulting military intelligence saved countless lives and helped shorten World War II. As the first successful large-scale application of digital electronics to computing, Colossus anticipated subsequent computer developments.__

The [IEEE United Kingdom and Ireland Section](https://www.ieee-ukandireland.org/) sponsored the nomination.

Reviewed by the [IEEE History Committee](https://history.ieee.org/about/ieee-history-committee/) and awarded by the [IEEE Board of Directors](https://www.ieee.org/about/corporate/board), IEEE Milestones recognize outstanding technical developments around the world that are at least 25 years old. The Milestone program is administered by the [IEEE history and heritage group](https://www.ieee.org/about/history-center).

To learn more about historical figures in engineering, IEEE Milestones, and [IEEE History](https://spectrum.ieee.org/tag/ieee-history) Center programs and events, check out our [IEEE Tech History collection](https://spectrum.ieee.org/tag/ieee-history). [__IEEE Spectrum__](https://spectrum.ieee.org/) also covers aspects of [tech history](https://spectrum.ieee.org/topic/tech-history/).