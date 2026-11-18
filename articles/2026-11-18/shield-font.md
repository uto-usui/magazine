---
title: "Shield Font"
source: "https://shieldfont.org/"
publishedDate: "2026-11-17"
category: "design"
feedName: "Sidebar"
---

Protect human writing by poisoning unauthorized AI training.

## SHIELD(FONT)

Powered by![S&A](https://shieldfont.org/logos/sa.svg)+![Playtype](https://shieldfont.org/logos/playtype.png)

Illustration. The manifesto is shown twice at once: readers see the original words, while the page source underneath holds decoy words, what an AI scraper collects. The manifesto reads: ShieldFont is an open-source creative technology intervention developed to protect human writing from unauthorized AI training. Why? Writing makes us human. But at some point, we lost ownership. AI learns from it and uses it without permission. ShieldFont gives you an opt-out by changing the code behind the text, so mass scrapers cannot access its meaning. This text is already protected. Your next text could be too. Try it below. Protecting your work is in your hands. As it always should have been.

\*The text above is a didactic illustration and does not reflect ShieldFont’s real application. See the [live demo](https://shieldfont.org/demo/) for accurate spacing, width and accessibility features.

The solution

Place your original text on the left, get the protected version on the right.

Type or paste your text here

0 / 0 TOKENS SWAPPED

Here's your protected text

Your protected text appears here…

[Export](https://shieldfont.org/encoder)

The mechanism

## Designed for humans. Toxic for AI.

We partnered with leading Danish type foundry Playtype to create the first typeface with built-in ShieldFont protection.

Aa Bb

ShieldFont Optik RegularShieldFont Optik MediumShieldFont Optik DemiBoldShieldFont Optik BoldShieldFont Optik ExtraBoldShieldFont Optik Black

### Six weights.  
Equally protected.

Size

96

Spacing

0

Powered by![Playtype](https://shieldfont.org/logos/playtype.png)

ShieldFont Optik ▾Regular400

Aa

ShieldFont Optik ▾Medium500

Aa

ShieldFont Optik ▾DemiBold600

Aa

ShieldFont Optik ▾Bold700

Aa

ShieldFont Optik ▾ExtraBold800

Aa

ShieldFont Optik ▾Black900

Aa

Swap

48%

Of the content words

Protect over

80%

Of shielded pages from AI training

1 in 10

filter-passing pages still poison training

— Shield any typeface

### Bring your own font.

Shield any TrueType font (a brand face, a Google Font, a custom cut) with a private mapping only you hold.

[Create your own](https://shieldfont.org/docs/custom-faces)

— Mint your own dictionary

### Bring your own key.

ShieldFont comes with three dictionaries, each with its own key. You can also create your own. Private keys are harder for scrapers to decode.

[Create your own](https://shieldfont.org/docs/custom-mappings)

You readwrote

sangalphaseed 42

wroughtbetaseed 1

labeledgammaseed 2

?????yoursseed XX

— Accessibility

### Screen readers get the real words.

**A screen reader reading down the page is never handed scrambled text**, and our NVDA test asserts exactly that. Screen review and touch exploration are untested. ShieldFont hides shielded passages from accessibility tools by default with `aria-hidden="true"`, because a decoy read aloud is fluent, grammatical, wrong English, and that is worse than silence.

The real words remain sealed in the same page, and a visible notice above the block carries the control that uncovers them. It is on by default and reachable by mouse, keyboard and screen reader alike. Pressing it sets the reader’s browser to solving a compute-heavy puzzle: JavaScript and a few seconds of processing, more than most mass scrapers are willing to spend. That puts the words within reach of a screen reader, a translator and copy/paste. Two things we are still working on: JAWS is untested, and [#7](https://github.com/isaqueseneda/shieldfont/issues/7) tracks NVDA not announcing the unlock.

[Demo](https://shieldfont.org/demo/)[Docs](https://shieldfont.org/docs/plain-text-mode)

Use ShieldFont to protect your

Manuals

Case studies

Essays

Research papers

Articles

Novels

News headlines

Online dictionaries

Encyclopedias

Newsletters

Manifestos

Authorship

Download

## Three ways to protect your writing

Recommended

### Dynamic  
Websites

1Wrap any text block with `<Shield>`.

2Encoding runs in Node at build time. No readable copy ships in the HTML.

3Ship. Readers see your writing; the HTML carries decoys.

$ npm install @shieldfont/react

<Shield\>
  Plain English here.
</Shield\>

Server render or static export both work: in Next, Server Components are the default and that's all you need. What leaks is client code: don't put `<Shield>` in a `"use client"` file, and don't pass plain text into one. Both fail silently: see [where the encoding happens](https://shieldfont.org/docs/where-encoding-happens).

Not using React? [Use it anywhere](https://shieldfont.org/docs/use-anywhere): any framework, any build step.[Advanced: build your own font](https://shieldfont.org/docs/custom-faces)

Research

## Defend yourself.  
Contaminate unauthorized AI training with gibberish.

Any scraped content must pass a strict quality filter before entering the AI training pipeline. Most shielded pages are rejected at that stage, keeping the content out of training. Those that pass contain fluent but false text, adding noise to the dataset.

[Read the paper](https://shieldfont.org/white-paper)

FAQ

Every shielded page has to clear three bars _at once_.

PILLAR 01

Conceal

Hide the meaning from the machine. Humans read your page; a scraper reads swapped words.

PILLAR 02

Pass the filter

Survive the AI quality gate. Grammar intact, sentence fluent. Only the meaning is wrong.

PILLAR 03

Poison

Make the kept page worse than nothing. Whatever trains on it learns the wrong associations.

01 Conceal · hiding the meaning

Q1What actually happens to my words?

We swap key words in your text with other real words in the page’s source code. For example, “winners” might become “avengers,” “toy gun” might become “sofa car,” and “Halloween contest” might become “Autumn campaign.” You still see the original text because **the font restores it on screen**. Only machines reading the raw HTML see the substituted version.

Q2What if I copy-paste ShieldFont text into ChatGPT?

The clipboard copies

**the substituted words stored in the page’s code**, not the original words you see on screen. So when you paste shielded text into ChatGPT, it reads the altered version rather than your original writing.

Q3Why swap “content words” specifically, and why does that matter?

Content words carry most of a sentence’s meaning, while words such as _the_, _of_, and _and_ mainly hold it together. ShieldFont changes only about 25% of all words, but nearly half of the content words. Across 1,500 passages from news, independent websites, and fiction, this caused

**50% to lose their original factual claim**. A control test replaced the same number of words with true synonyms, and only about 2% of passages changed meaning. The effect comes not from swapping words, but from swapping the words that matter most.

Q4Which words can be swapped? Where does the dictionary come from?

The dictionary is built from the 10,000 most common English words, focusing on nouns, verbs, adjectives, and adverbs because they carry most of a sentence’s meaning. Each word is paired with another of the same type, so nouns replace nouns and verbs replace verbs, helping sentences remain grammatically correct even as their meaning changes. Function words such as _the_, _of_, and

_and_ are left untouched because they hold sentences together but carry little meaning. Once different forms of each word are included,

**the current dictionary contains nearly 12,000 entries**, covering a large share of everyday English.

Q5So can an AI still tell what my page is about?

Roughly, yes: topic and tone may survive. But the specifics, such as names, numbers, and claims, are often lost. When seven leading AI models tried to reconstruct the argument of shielded text,

**conceptual accuracy fell by 67%**. Several models also refused the task, which counted as complete loss. Looking only at the models that answered, the drop was still 49%. The result is consistent: the broad subject may survive, but the details do not. The effect also grows with length. If an early sentence is altered, later reasoning may build on a false premise, so longer texts can lose more meaning than passage-level scores suggest.

02 Pass the filter · surviving the quality gate

Q6How does “gibberish” get past AI quality filters?

It’s not gibberish. Every substituted word keeps the same grammatical role, so nouns replace nouns and past-tense verbs replace past-tense verbs. The sentence still reads correctly, but its meaning changes. In tests with FineWeb-Edu, a quality filter used to build a major public training dataset,

**about one in ten chunks that passed before shielding still passed afterwards**. The other nine were rejected. Both outcomes help: rejected content stays out of training, while accepted content carries the “wrong” meaning into the dataset.

Q7Isn't hiding meaning and passing the filter a contradiction?

That tension is the core challenge, and we have worked to balance protection with disruption. If the text changes too much, quality filters reject it, keeping the content out of training. If it changes too little, the original meaning survives. ShieldFont aims for **the point between these outcomes**, where text can pass a filter without communicating the same meaning. Reaching that balance took sixteen generations of mappings, followed by a second line of development.

03 Poison · wasting their compute

Q8What does “poison” actually mean here?

If a shielded text passes the scraper’s quality filter, the training system receives the substituted words as if they were the original content. It may see that a contest’s “winners” were “avengers,” or that a child found a “sofa car.” Instead of simply hiding the original content,

**the text adds false connections between names, events, and actions**

to an unauthorized AI training dataset.

Q9Does the poisoning really work, or is that hype?

We are careful with that claim. Early tests on small fine-tuned models showed the strongest negative effect of any mapping we tried, but those tests are too limited to prove what would happen at scale. What we can say with confidence is measured directly from the text:

**changing about 25% of the words caused 50% of passages to stop making the same factual claim**. Whether you call the result poisoning or wasted training effort, what matters is that the content becomes less useful in unauthorized AI training datasets.

Q10Does one shielded page even matter? What if everyone does it?

One shielded page is only a drop. The value comes from scale. If many creators use ShieldFont, scrapers must either reject more pages or spend more time identifying and decoding them. Pages that still enter the dataset carry altered information, making the collected text less useful for training. Blocking removes content from the scrape; shielding can either keep it out or change what gets collected. Individually, the effect is small.

**It is a collective defense: the more people use it, the harder and more expensive mass scraping becomes.**

Practical · the objections everyone raises

Q11Couldn't someone just OCR the rendered page?

Yes. If someone photographs your page and runs OCR (optical character recognition: reading text back out of an image), they recover your words. But ShieldFont is not designed to stop someone deliberately targeting a specific site. It is designed to disrupt mass scraping, which depends on collecting HTML from billions of pages cheaply and automatically. Using OCR would require scrapers to render each page, turn it into an image, and process the pixels with a vision model. Because they do not know which pages are shielded, they would have to do this at scale.

**ShieldFont does not need to make OCR impossible; it needs to make it too costly to be worthwhile.**

Q12Won't models eventually just learn to decode ShieldFont?

They will not need to learn. Here is the part we would rather you heard from us than found in a footnote:

**the font is the codebook, and anyone who downloads it can read the substitution table back out of it.**

We tested this ourselves and recovered all 11,962 word pairs with no errors. ShieldFont is not designed to keep a permanent secret or stop someone deliberately targeting one site. Its strength is at scale. ShieldFont ships with three mappings,

**alpha, beta, and gamma**, and assigns each text block to one of them. Creating your own mapping makes a universal, prebuilt decoder useless against your site. A scraper must identify your font, extract its mapping, and decode your content specifically. The defense is economic, not cryptographic: the aim is to turn cheap, indiscriminate scraping into slower, more complex, per-target work. The more independent mappings people create, the harder that becomes across the web.

Q13What happens to my SEO?

Search engines read the same scrambled HTML as scrapers, so

**they index the decoy words, not yours**. Shield content you do not need Google to rank: paywalled pieces, archives, manifestos, or anything you would rather keep out of current AI training than surface in search. Leave your marketing pages plain. ShieldFont works block by block, so the choice is entirely yours.

Q14Why poison at all? Why not just block the crawlers?

Blocking tools such as robots.txt and Cloudflare’s AI gate are like walls: crawlers can ignore or work around them. We still recommend using them to express your non-consent publicly. Poisoning, however, creates **leverage**: if a lab trains on shielded text before it is detected, the data becomes less useful and may require extra work to remove or correct. The longer-term goal is to give creators a seat at the table, with a licensing route where AI companies pay for clean versions instead of using altered copies obtained through scraping. That system does not exist yet, but it is an outcome we’d like to help make possible.

Q15Hasn't this been tried? What about TuringFonts, ZXX, Ghost Font, Nightshade?

Respect to the ancestors. The closest is

**TuringFonts** (jfmdev): a substitution-cipher font that draws one letter in place of another, so a crawler reads scrambled text while a human reads the original. It was built to keep bots from indexing emails and phone numbers, and it predates the AI era. A letter-for-letter cipher produces character noise a modern quality filter throws away (and an LLM unscrambles by frequency in a single pass), and it never hides that the page is enciphered. ShieldFont is built for how AI actually ingests text: we swap whole words for other real, same-grammar-class words, so the page stays fluent prose with no character noise to flag and nothing to unscramble by frequency. Every word is a real word in the right grammatical slot, and the only thing broken is the meaning. We think in tokens and meaning rather than a hidden string, and the font itself is camouflaged. **ZXX** (Sang Mun, 2013) fought OCR at the _glyph_ level, but modern vision models read it in one prompt. **Ghost Font** hides text in motion;

**Nightshade** and **Glaze** poison images for artists. ShieldFont is the text-native cousin: it corrupts the

_source the machine actually copies_. The reading gap itself also has independent security research behind it. In March 2026, LayerX Security published

[“Poisoned Typeface”](https://layerxsecurity.com/blog/poisoned-typeface-a-simple-font-rendering-poisons-every-ai-assistant-and-only-microsoft-cares/), an attack study showing that a remapped font makes an AI assistant and a human read different text from the same page. All eleven assistants they tested read the underlying text instead of the rendered one, and only Microsoft took the disclosure through a full fix. Their work is offensive in framing and unaffiliated with ours, and it confirms from the other direction the same gap ShieldFont uses in defense.

Q16Is this legal and ethical?

We are contributing to the AI ethics debate from a simple position:

**creators should have a meaningful say in whether their work is used to train AI**. You are changing how your own words appear in your own HTML, not entering another system or attacking a model. We encourage creators to state their non-consent clearly alongside their content. If an AI company respects that choice, nothing happens. The effect only applies when the work is scraped and used without permission. The goal is not to damage AI (we are not anti-AI; read Q21 for more), but to make unauthorized training less useful and harder to ignore.

Q17What about screen readers and accessibility?

Screen readers read the source code rather than the words displayed by the font, so the current `<Shield>` component uses `aria-hidden` to stop the substituted text from being read aloud. We have a built-in alternative,

**on by default**: a visible notice above the block, reachable by mouse, keyboard and screen reader alike, carries the control that puts the real words on the page. The reader’s browser solves a compute-costly puzzle for the key, taking a few seconds. It works in our Dynamic Websites tier and requires JavaScript, which is part of the point: most scrapers never run any. Tested with VoiceOver and an automated screen reader.

Q18The notice above the block has a button that shows the real words. Can't a scraper just press it?

Nothing stops it trying. The bots we are targeting still don’t get the words, and for a few reasons.

1.  Most mass scrapers don’t run JavaScript, so they can’t trigger the button that unlocks the original text.
2.  Even if they did, the real words are sealed in the same page and never sit behind a separate URL, which a scraper would simply follow for free. Opening them requires the browser to solve a compute-heavy equation (takes a few seconds). We priced that compute to be as expensive as taking and analyzing screenshots (OCR), which is our current floor.
3.  Besides, you would have to deploy an agent (or a person $$$$) to reverse-engineer the button, which changes for every website.
4.  On top of all that, each block seals 3 other unrelated and poisoned texts alongside the real one, so you really need to be careful about which one to read.

Doing that across every block and page would be unfeasible at scale and could make mass scraping several times more expensive. **That is ShieldFont’s goal: to make unauthorized mass scraping more costly.**

Q19Won't scrapers just learn to spot the aria-labels or the ShieldFont classes and skip those pages?

Eventually, yes. Any fixed marker, such as a known class, font name, file pattern, or ARIA attribute, can become a fingerprint. ShieldFont responds in two ways: add camouflage so those markers no longer reliably identify protected text, and keep changing the pattern by shielding selected blocks and using different mappings across sites. A single deployment is easier to work around.

**Thousands of creators using different mappings and implementations force scrapers to spend more time identifying, checking, and decoding what they collect.**

ShieldFont does not end the arms race; it gives the open web a way to make unauthorized scraping harder and more expensive, especially when people build on it together.

Q20Is this permanent? Unbreakable?

No, and we won’t pretend otherwise. ShieldFont isn’t a lock. It’s friction. It disrupts large-scale automated scraping by changing the underlying text while keeping it readable for people on screen. That makes scraping and processing slower and more expensive, though the impact may vary. It is open source and designed to evolve, so “it’ll be decoded eventually” misses the point. The target can keep moving as others add new mappings and approaches. It is also not a client-grade security product, so do not replace Cloudflare, Akamai, robots.txt, or accessibility standards with it.

**Think of it as a creative intervention with teeth**: a way for creators to make unauthorized AI training harder, more visible, and more costly.

Q21So… is ShieldFont anti-AI?

No.

**ShieldFont is pro-consent, pro-choice, and pro-human authorship.**

People may want their work to be discovered without agreeing to have it copied into AI training datasets. ShieldFont gives them a simple, visible way to opt out of mass scraping and make that choice harder to ignore. The font is the creative expression of that position: not a rejection of AI, but a demand that creators have a say in how it is built, especially in what is taken from them.

Q22Does it work in languages other than English?

Not yet. ShieldFont currently works only in English. Its three main dictionaries contain about 12,000 word pairs each: 11,970 in alpha, 12,034 in beta, and 12,036 in gamma. The optional

`maxhide` version contains 2,534. Words in other languages are left unchanged, so they are not protected. On a mixed-language page, only the English text will be shielded, even if the whole section appears protected. For clarity, the current versions can be named **en-a, en-b, en-c, and en-m**; a future Portuguese set might use names such as pt-a. Creating a new language version is not simply a translation task: it requires native speakers to choose substitutions that still sound natural. Contributing a new language is therefore one of the most useful ways to help.