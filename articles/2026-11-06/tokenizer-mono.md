---
title: "Tokenizer Mono"
source: "https://george.mand.is/2026/11/the-tokenizer-font/"
publishedDate: "2026-11-06"
category: "design"
feedName: "Sidebar"
---

November 4th, 2026 • ~6,000 words • 30 minute read

![tokenizer-cycle-labeled](https://george.mand.is/media/tokenizer-cycle-labeled.gif)

There are many tools out there that help you visualize tokens and better understand how tokenization works with large language models. OpenAI has [a pretty nice one](https://platform.openai.com/tokenizer), and there are a half-dozen [other](https://tiktokenizer.vercel.app/?model=cl100k_base) [ones](https://github.com/openai/tiktoken) that are also great.

They generally work by passing text through an actual tokenizer, retrieving the resulting token boundaries, and highlighting them in the browser. It's a fast, accurate and perfectly reasonable approach.

So I did the slightly unreasonable thing and made a font that uses modern font witchcraft to visualize tokens as you type them, without actually tokenizing. The code is at:

-   [github.com/georgemandis/tokenizer-mono](https://github.com/georgemandis/tokenizer-mono).

You can play with it below. Every highlight is drawn by the font. No scripting! The only JavaScript here is swapping which face is loaded.

Tokenizer OpenAI GPT-4, GPT-3.5, text-embedding-3; also Phi-4, OLMo 2, IBM Granite 4 Size

![Pasted image 20261101225003](https://george.mand.is/media/Pasted%20image%2020261101225003.png)

## What is a token?

A token is the basic unit of currency for a language model. It’s what the model actually reads and produces.

A token is generally a chunk of text: a character, word, word-part, or occasionally a longer sequence. Many modern LLM tokenizers have a fixed vocabulary of these chunks, typically somewhere between 50,000 and 250,000 entries.

And that vocabulary isn’t necessarily exclusively made up of conventional words. Common combinations of characters, punctuation, whitespace, and even sequences spanning multiple words can all earn their own entries.

Where does a vocabulary come from? Nobody writes it by hand. Almost every tokenizer in this post uses some form of **byte-pair encoding** (BPE), which builds the vocabulary by counting. In a simplified version of BPE, start with every character (or byte, in byte-level tokenizers) as its own token. Look through a big pile of training text for the pair of adjacent tokens that appears most often, say "t" followed by "h", and merge it into a new token "th". Now look again: maybe "th" followed by "e" is the most common pair, so "the" becomes a token.

Rinse and repeat this many thousands of times over. Every merge adds one entry to the vocabulary, and the list of merges, in the order they were learned, is saved along with it. To tokenize new text, the tokenizer breaks it into characters and replays those merges in the same order, so common words collapse into a single token and rare words stay in pieces. The exact split of a word depends on which merges rank higher, which matters later.

Over a long enough timeline, does the entirety of Alice in Wonderland become a single token? Every published version of something like the Bible? Interesting thought exercise.

While they aren't incorporating entire novels or religious texts as tokens yet (and I suspect there's a better technique that enters the room well before we push things to that scale), these vocabularies _have_ been getting bigger! GPT-2 had 50,257 tokens; GPT-4's tokenizer has 100,277; GPT-4o's has 200,019.

Part of that growth reflects increasingly ambitious multilingual support: OpenAI's [GPT-4o announcement](https://openai.com/index/hello-gpt-4o/) shows the same Gujarati sentence dropping from 145 tokens to 33 under the new tokenizer, while English barely moved.

_**Sidenote**: Rest of World has a nice article on [the cost of AI for non-english languages](https://restofworld.org/2026/ai-tokenizer-tax-non-english-languages-cost-inequity/) which touches on this idea of multilingual support, tokens and how this manifests visually. I think not discussing Chinese at all—which can be more token efficient than latin script languages sometimes!—was kind of a miss._

So when something like Meta’s [Muse](https://muse.ai/) product boasts giving you 1 _billion_ tokens for free, that’s what we’re talking about: a billion units of text processed, not a billion words (The rule of thumb seems to have settled around 0.75 words per token, so if it helps you can multiply any token count by that and read it as words.). And depending on which tokenizer is doing the counting, that same text might consume a surprisingly different number of tokens!

Writing this makes me want to start charging in tokens (i.e. words) in my day-to-day life. Hm.

**Further reading on tokens**: the BPE paper, [Sennrich et al. 2016](https://arxiv.org/abs/1508.07909); [SentencePiece](https://github.com/google/sentencepiece), Google's take, used by Llama 2, Gemma and T5; and Hugging Face's [`tokenizers`](https://github.com/huggingface/tokenizers) library, which reads most of the open ones.

## What is Tokenizer Mono and how does it work?

**Tokenizer Mono** is a font family with different faces mapped to different tokenizers. This lets you visualize the tokens as you type without an additional computation and reassembly step.

It's one big typographic family—"Tokenizer Mono" based on [IBM Plex](https://github.com/IBM/plex)— with a style per tokenizer model. Font Book on macOS should register them as one family with twenty-eight styles.

Vendor

Face

Used by

OpenAI

`cl100k`

OpenAI GPT-4, GPT-3.5, text-embedding-3; also Phi-4, OLMo 2, IBM Granite 4

`o200k`

OpenAI GPT-4o, o1, o3, GPT-4.1, gpt-oss

`p50k`

OpenAI Codex, text-davinci-002/003

`r50k`

OpenAI GPT-2, GPT-3

`clip`

OpenAI CLIP, Stable Diffusion prompts (lowercases; no whitespace tokens)

Meta

`llama4`

Meta Llama 4

`llama3`

Meta Llama 3 / 3.1 / 3.2 / 3.3; also SmolLM 3

`llama2`

Meta Llama 2 (SentencePiece)

Google

`gemma3`

Google Gemma 3

`gemma`

Google Gemma 1 / 2

`t5`

Google T5 (SentencePiece Unigram, not BPE)

`bert`

Google BERT (WordPiece; ## continuations approximated)

Mistral

`mistral`

Mistral 7B v0.3 (SentencePiece)

`tekken`

Mistral Nemo, Mistral Small 3 (Tekken); also NVIDIA Nemotron-H, Swiss AI Apertus

Alibaba

`qwen`

Alibaba Qwen 2 / 2.5 / 3

DeepSeek

`deepseek`

DeepSeek V3 / R1

Zhipu

`glm`

Zhipu GLM-4.5

Tencent

`hunyuan`

Tencent Hunyuan

Baidu

`ernie`

Baidu ERNIE 4.5 (SentencePiece)

ByteDance

`seed`

ByteDance Seed-OSS

01.AI

`yi`

01.AI Yi (SentencePiece)

IBM

`granite`

IBM Granite 3 and Granite Code (StarCoder vocabulary); also StarCoder

TII

`falcon3`

TII Falcon 3

`falcon`

TII Falcon

EleutherAI

`neox`

EleutherAI GPT-NeoX, Pythia

BigScience

`bloom`

BigScience BLOOM (multilingual)

UW

`superbpe`

UW SuperBPE for OLMo 2 (tokens cross word boundaries)

Moonshot

`kimi`

Moonshot Kimi K2 (tiktoken-format vocabulary)

Here's the same sentence visualized in all of these different tokenizers.

![tokenizer-mono-gallery](https://george.mand.is/media/tokenizer-mono-gallery.png)

It's subtle, but you can spot some fun differences. Llama 2 splits "fox" and "tokenize" where OpenAI (among others) doesn't. BERT doesn't tokenize whitespace at all (it will never be good at Python, alas). And while we're on whitespace and Python: `cl100k` takes the four-space indent before `return` and makes one token of the first three spaces, then folds the fourth into `" return"`, while Gemma keeps all four spaces as a single token.

**Note on vendors and models**: Anthropic's tokenizer isn't public, as far as I can tell, so there's no Claude face. Neither is Gemini's, though I wouldn't be shocked if it's some evolution of Gemma? OpenAI publishes its encodings through [tiktoken](https://github.com/openai/tiktoken), and its [model table](https://github.com/openai/tiktoken/blob/main/tiktoken/model.py) maps everything up to GPT-5 onto `o200k_base`, so the `o200k` face covers those. I'm not sure about the newest models like Astra (GPT-6).

## The weird thing fonts can do: substitution

This entire project was an exercise in seeing how far I could push OpenType glyph substitutions—something I knew existed and understood conceptually, but had never played with.

Microsoft's [OpenType spec pages](https://learn.microsoft.com/en-us/typography/opentype/spec/gsub) explain this elegantly, in my opinion.

In a nutshell, the Glyph Substitution table (GSUB) is the part of an OpenType font that holds rules for replacing one or more glyphs (the drawn shapes, as opposed to the characters underneath them) with other glyphs. The spec numbers eight lookup types; seven of them substitute something, and the eighth is a wrapper you'll meet in the list. The examples below are in Adobe's `.fea` syntax, which is how most type designers write them.

-   **Single substitution** (type 1): a straight one-for-one swap. The slashed zero in coding fonts is this: `sub zero by zero.slash;`. Small caps are the same trick, just 26 times over.
-   **Multiple substitution** (type 2): one glyph becomes several. The usual job is taking a ligature or precomposed glyph apart so other rules can see its pieces: `sub f_i by f i;`.
-   **Alternate substitution** (type 3): one glyph has several interchangeable forms, and the app or the user picks. The canonical example is a font with a drawer full of ampersands: `sub ampersand from [ampersand.1 ampersand.2 ampersand.3];`.
-   **Ligature substitution** (type 4): several glyphs become one, while the underlying characters stay put, so you can still select and search them: `sub f i by f_i;`. [Fira Code's](https://github.com/tonsky/FiraCode) `!==` arrows are this. This is the thing I half-remembered about fonts and went to look up before any of this started, i.e. "how do ligatures actually work?", and here we are, one weird font and a blog post later.
-   **Contextual substitution** (type 5): match a sequence of glyphs and run a lookup on any of them: `sub [a e o]' r' lookup connect;`. Every glyph in the match is fair game, but there's nothing to look at outside the match.
-   **Chained contextual substitution** (type 6): the one powering Tokenizer Mono. Like type 5, but now the rule can also require glyphs before and after the match without touching them, the regular-expression equivalent of lookbehind and lookahead: `sub @letter f' i' r' e' lookup toRed;` only fires when a letter precedes "fire". That's how the font tells " hello" from " hellos".
-   **Extension** (type 7): not a substitution at all. It's a wrapper that lets a lookup point past the 16-bit offset limit, so a font with huge tables can keep using one of the other types inside it. Tokenizer Mono is that font: the cl100k face wraps 194 of its chained-contextual subtables this way.
-   **Reverse chaining substitution** (type 8): a chained single substitution that runs backwards, from the last glyph in the run to the first, so a glyph can depend on what comes after it has already been decided. It exists for Arabic Nastaliq, where a letter's shape depends on the letters to its left: `rsub e' space by e.final;`.

Rules are written in Adobe's feature-file language, [`.fea`](https://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html). The warm-up font in the repo turns the word "fire" red, and only the whole word, in eight lines:

```
@letter = [a-z A-Z];

lookup toRed {
  sub f by f.red;  sub i by i.red;  sub r by r.red;  sub e by e.red;
} toRed;

feature calt {
  ignore sub @letter f' i' r' e';        # not "misfire"
  ignore sub f' i' r' e' @letter;        # not "fired"
  sub f' lookup toRed  i' lookup toRed  r' lookup toRed  e' lookup toRed;
} calt;
```

The tokenizer font is that idea pushed to a silly extreme. One rule per vocabulary token, longest first, keyed on the first glyph. When the shaper matches one it rewrites the letters to start / middle / end variants and skips past the match. That skip is what makes it greedy longest-match. In `.fea` terms, the rule for " hello" would be:

```
sub space' lookup toStart  h' lookup toMid  e' lookup toMid  l' lookup toMid  l' lookup toMid  o' lookup toEnd;
```

(At this scale the `.fea` compiler can't cope, so the rules are built directly as table data with [fontTools](https://fonttools.readthedocs.io/). Same thing, no text form.)

A 22-rule state machine then paints the colors (yes, fonts can have colors; that's the next section!), looking one glyph to the left:

```
# continuation inherits its neighbor's color (k = 0..4)
sub [@S0 @M0] @M' lookup toM0;
sub [@S0 @M0] @E' lookup toE0;
# a new token takes the next color after a token end
sub [@E0 @X0] @S' lookup toS1;
sub [@E0 @X0] @X' lookup toX1;
# ...same four lines for colors 1 to 4, wrapping 4 -> 0...
# first token in the run
sub @S' lookup toS0;
sub @X' lookup toX0;
```

## Colors in fonts

A few years ago I discovered [Google's Noto Color](https://github.com/googlefonts/noto-emoji) Emoji font and learned you can put colors in fonts. What a neat trick! For this endeavor, while I figured substitution rules might be able to mark where the tokens start and stop, color would make it even snazzier and start to look and feel like the tools I shared toward the top.

Color in OpenType involves two tables working together. [COLR](https://learn.microsoft.com/en-us/typography/opentype/spec/colr) says "this glyph is these layers, drawn in this order," and [CPAL](https://learn.microsoft.com/en-us/typography/opentype/spec/cpal) holds the palettes those layers pick their colors from.

COLR comes in two versions. Version 0 is flat fills, one palette color per layer, and is all I needed for Tokenizer Mono. Version 1 adds gradients, transforms and compositing, which is what Noto Color Emoji's web build uses. Chrome's [COLRv1 announcement](https://developer.chrome.com/blog/colrv1-fonts/) is a good explainer if you want to go further. Twemoji and Microsoft's Segoe UI Emoji ship COLR builds too.

In Tokenizer Mono every colored letter is two layers: a rounded box filled from palette slot _k_, and then the original letter on top in "whatever the text color is" (palette index `0xFFFF`, a special value meaning "use the current foreground"). With [fontTools](https://github.com/fonttools/fonttools) the whole thing looks like this:

```
from fontTools.colorLib.builder import buildCOLR, buildCPAL

font["CPAL"] = buildCPAL([
    [(0.83, 0.77, 0.98, 1), (0.73, 0.93, 0.86, 1), ...],   # palette 0, light backgrounds
    [(0.30, 0.23, 0.54, 1), (0.12, 0.42, 0.31, 1), ...],   # palette 1, dark backgrounds
])
font["COLR"] = buildCOLR({
    "a.s0": [("box.start", 0), ("a", 0xFFFF)],   # box in color 0, then the letter
    "a.m0": [("box.mid",   0), ("a", 0xFFFF)],
    # ... 1,001 characters x 4 shapes x 5 colors
})
```

A CPAL table can hold more than one palette. Each index in the list in the example above maps to a layer you can refer to by slot number (i.e. index). So the same box glyph that fills from slot 0 can be pale lavender in one palette and deep purple in another, with nothing else in the font changing. Tokenizer Mono ships two: pastels for light backgrounds and darker, more saturated versions for dark backgrounds. The page on this demo picks between them with the CSS [`font-palette`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-palette) property depending on if you have dark mode enabled:

```
@font-palette-values --tok-dark {
  font-family: "Tokenizer Mono cl100k";
  base-palette: 1;
}
@media (prefers-color-scheme: dark) {
  textarea { font-palette: --tok-dark; }
}
```

It fails pretty elegantly too. Anywhere COLR isn't supported (which isn't that many places these days; it's widely supported), like most terminals and a lot of native text fields, the boxes simply don't draw and you're left with plain, colorless IBM Plex Mono.

## The fiddly bits

**Greedy longest-match is not BPE.** Remember that a BPE tokenizer splits text by replaying its merges in the order they were learned. The font can't do that. A substitution rule matches a fixed run of glyphs, so the best it can do is take the longest token that fits and move on. _Usually_ that lands in the same place, which is why this font felt fun-enough to share. Sometimes it doesn't.

Take "antidisestablishmentarianism" in `cl100k`. In the middle of a sentence the word arrives with a leading space, and the font grabs " antid" because it's the longest token that fits there. BPE's merges for " ant" and "idis" rank higher, so the real split is ant|idis|establish|ment|arian|ism and the font's is antid|ises|tabl|ishment|arian|ism. At the start of a line there's no leading space, " antid" can't match, and the font gives a third answer: anti|dis|establish|ment|arian|ism, which looks the most sensible of the lot. (You'll see that one in the demo whenever the word is long enough to wrap onto its own line; see Known gaps.) BPE isn't trying to match how a person would break the word. It only reflects which character pairs were common in its training data, and "ant" was more common than "anti".

The fix was to hard-code answers. The build script uses the 60,000 most common English words from [wordfreq](https://github.com/rspeer/wordfreq) and runs them through the real tokenizer and adds a whole-word rule wherever greedy would have gotten it wrong. It's goofy, but a whole-word rule is longer than any token inside it, so it works. Nothing is emitted where greedy was already right, so common words cost nothing. A second pass adds rules for any longer word a shorter rule would otherwise shadow, so " byte" can't fire inside " bytes". In other words, the word rules are a hard-coded answer key

Couldn't you keep going and add every word the greedy matcher gets wrong until it's perfect? In theory, yes! A big enough list would make the font exact on every word in it and it would work.

A few things make this impractical:

The first is cost. The cl100k face went from 4.4 MB to 10.9 MB as a TTF when the 60,000-word list added about 92,000 rules (I started with 10,000 words), so roughly 70 bytes per rule, or about 7 bytes in WOFF2. Each word gets up to four forms (leading space, capitalized, line-initial, all caps), and about half of those turn into rules. A million-word list would mean something like a million and a half rules, so on the order of 100 MB as TTF and 10 MB as WOFF2 per face. I am _slightly_ tempted, and I won't rule out turning this into a 100 MB+ font someday, but a demo is better for now.

A more interesting challenge is performance. I bet nobody thinks about performance variance between fonts! Rules are grouped by their first glyph and tried longest-first, so the work the shaper does at each character grows with the number of rules that start with that letter. Today that's about 50 microseconds per character. Fifteen times the rules wouldn't be 15x times slower, since HarfBuzz indexes the rules rather than scanning them, but typing would start to feel it.

The third is that the words run out before the misses do. wordfreq's English list goes a few hundred thousand entries deep before it turns into noise, and the long tail is names, misspellings and concatenations, which the tokenizer treats like code anyway. Past a certain point you're spending megabytes on rules that fire almost never, and the remainder, identifiers, URLs and other languages, is the same size no matter how long the list is. Greedy plus a frequency-ranked cheat-sheet gets you to 98% coverage on this 60,000-word list, the last 2% is rare words (antidisestablishmentarianism didn't even make the list) and code, and no amount of hard-coding reaches 100% because the input isn't a closed set.

The real fix would be a font that replays merges instead of matching longest-first, which is what the SuperBPE pass does in miniature. A full replay needs one lookup per merge rank, applied in order, and OpenType caps a font at 65,535 lookups. cl100k has about 100,000 merges.

**Every tokenizer treats a run of spaces differently.** tiktoken keeps the last space for the next word. Gemma keeps the whole run and gives the next word no space. T5 collapses the run to one token. BERT doesn't tokenize whitespace at all! Rather than hard-code this, the build script probes each tokenizer with a real sample and picks the rule shape from the answer.

**The vocabulary files lie a little.** Gemma stores its whitespace tokens as "added tokens" in a separate list from the main vocabulary. Byte-level tokenizers report empty offsets for whitespace-only tokens. Both bit me, and both showed up the same way: a face scoring 40% or 70% for no visible reason.

**SuperBPE broke greedy matching outright.** Its tokens cross word boundaries, so the vocabulary has entries like ", h", and "one, half" became ", h" + "alf". " fan of" won over " of the" where real BPE does the opposite. The fix was to do what BPE does: shape the single words first, then re-shape the superwords in rank order as merges of tokens that already exist, matching the exact shape pattern of their parts. One rule per way of building a superword from smaller ones, so "By the way" can form on top of " the way". That took it from 86% to 93% boundary agreement, and the hand-picked sentences from the SuperBPE playground in my testing now match.

**Testing by eye against a playground is slow.** `tools/compare.py superbpe "any sentence"` prints both splits side by side, and the corpus check lists the font tokens that most often disagree with the real tokenizer.

## How is accuracy measured?

When I claim "98% accuracy" for some of these, what does that even mean?

The corpus is about 200 lines of mixed text that live in the repo as `fonts/tokenizer/corpus-large.txt`: a few paragraphs of prose, the text of the SIL Open Font License, 120 lines of Python from the standard library, some JavaScript and SQL, and a few lines with curly quotes, accented words and currency symbols. Nothing in it was used to build the font. Our word rules come from a frequency list, not from this corpus.

The method is to shape each line with HarfBuzz, the same engine Chrome and Firefox use, and read back which glyphs came out as "start of token" variants. That gives the font's set of token boundaries as character positions. Then run the real tokenizer (tiktoken or the Hugging Face `tokenizers` library) on the same line and take its boundaries and compare the two sets.

**Precision** is the share of boundaries the font drew that the real tokenizer agrees with; a face that over-splits has low precision. **Recall** is the share of the real boundaries the font drew; a face that under-splits has low recall. Most faces are within a point of each other on the two, which means the errors are "different split" rather than "too many" or "too few".

Why boundaries and not token IDs? The font doesn't know IDs. It only draws where tokens start and stop, so that's the only thing it can be right or wrong about. I'm also completely new to all of this and am curious if there are other/better techniques with OpenType for this weird problem I've created (though I kind of like what a brute-force solution this ended up being).

A few caveats: Line breaks are hard boundaries for both sides, since each line is tokenized alone. The corpus is English and code, so a multilingual tokenizer like BLOOM is being judged on the part of its vocabulary it uses least. A different corpus would move the numbers by a point or two. The measurement script is `tools/tokcheck.py`, and CI prints the table for every face on every push.

So the reader can see what the missing 2% looks like, here are two misses. cl100k splits " antidisestablishmentarianism" as ant|idis|establish|ment|arian|ism; the font draws antid|ises|tabl|ishment|arian|ism. Same word, same letters, different seams. In code it's identifiers: `xMinYMax` is x|Min|Y|Max to cl100k and x|Min|YM|ax to the font.

## Known gaps

A few things the font can't do, and one thing browsers do to it.

-   **Browsers re-tokenize at soft wraps.** The font's rules can only see the glyphs on the line as the browser laid it out, and in Chrome, Firefox and Safari alike the line is broken before the font gets its say. (I'd assumed Chrome shaped the whole paragraph and then wrapped it. It doesn't, at least not in a way the font can see: a narrow paragraph and a textarea both re-shape at the break.) So a word pushed to the start of a line loses its leading space, which makes it a different token, which is why "antidisestablishmentarianism" splits one way mid-sentence and another way after a wrap. A SuperBPE token that spans several words, like " By the way", is cut into its single-word pieces if the line breaks inside it. Resize the window and the colors shift as words move across the wrap. Nothing in the font can fix this; it's a layout decision made before shaping. If it bothers you, give the text a wide container, use `white-space: nowrap` and scroll sideways, or insert hard line breaks where you want them.
-   **Trailing spaces** at the end of a line come out as single tokens. OpenType has no "end of text" lookahead, so the font can't tell a trailing space from one that's about to start a word.
-   **T5 is Unigram**, which picks splits by likelihood rather than length. No longest-match scheme reproduces that, so T5 is the least accurate face by design.
-   **Only characters the font knows get highlighted**: everything Plex Mono has a glyph for, which is 1,001 characters.
-   **Terminals and most native editors won't show the colors.** It degrades to plain monospace, which is the graceful failure described earlier.

## By the numbers

Boundary agreement with the real tokenizer on the corpus above, from the CI run that built the fonts in the demo (November 3, 2026), sorted by precision.

face

precision

recall

tokens font / real

shaping

TTF

bert

99.5%

99.3%

3341 / 3348

4 µs/char

5.0 MB

r50k

98.9%

98.9%

3758 / 3755

60 µs/char

8.6 MB

gemma

98.7%

98.6%

2963 / 2965

46 µs/char

14.5 MB

yi

98.6%

98.7%

3209 / 3208

44 µs/char

8.6 MB

p50k

98.5%

98.6%

3073 / 3070

42 µs/char

8.6 MB

gemma3

98.5%

98.5%

2975 / 2976

45 µs/char

13.8 MB

neox

98.4%

98.2%

3004 / 3011

43 µs/char

8.8 MB

granite

98.3%

98.2%

3108 / 3109

54 µs/char

9.7 MB

ernie

98.0%

98.1%

3050 / 3047

48 µs/char

9.8 MB

qwen

98.0%

97.9%

2861 / 2864

46 µs/char

11.1 MB

cl100k

98.0%

97.9%

2823 / 2826

45 µs/char

10.9 MB

hunyuan

98.0%

96.6%

2824 / 2865

45 µs/char

10.8 MB

llama3

97.9%

97.8%

2825 / 2826

48 µs/char

11.3 MB

mistral

97.8%

98.4%

3218 / 3199

50 µs/char

8.6 MB

o200k

97.8%

97.9%

2802 / 2800

52 µs/char

13.1 MB

glm

97.8%

96.9%

2802 / 2829

48 µs/char

11.7 MB

llama2

97.7%

97.8%

3266 / 3265

51 µs/char

8.8 MB

kimi

97.7%

97.6%

2810 / 2811

45 µs/char

10.3 MB

falcon3

97.5%

98.6%

3112 / 3075

41 µs/char

11.4 MB

deepseek

97.5%

97.6%

2924 / 2921

46 µs/char

9.9 MB

falcon

97.3%

98.3%

3225 / 3192

43 µs/char

9.1 MB

llama4

97.3%

97.4%

2815 / 2813

55 µs/char

13.6 MB

seed

97.2%

97.5%

2925 / 2916

47 µs/char

10.5 MB

tekken

97.1%

97.2%

2977 / 2975

51 µs/char

11.2 MB

clip

96.7%

96.9%

2984 / 2978

5 µs/char

9.0 MB

bloom

94.5%

95.0%

2893 / 2877

58 µs/char

12.9 MB

superbpe

93.0%

94.5%

2384 / 2346

53 µs/char

15.4 MB

t5

85.7%

94.1%

3605 / 3280

35 µs/char

7.1 MB

Most faces land between 97% and 99%. BERT tops the table because WordPiece really is greedy longest-match under the hood, so it needs no word rules at all! r50k (GPT-2) is next; its small vocabulary leaves fewer ways to be wrong. The three at the bottom are explained by their algorithms: BLOOM is multilingual and its English vocabulary collides with tokens from other languages, SuperBPE's tokens cross word boundaries, and T5 is Unigram.

The fonts run from 5 to 15 MB as TTF and roughly a tenth of that as WOFF2. SuperBPE is the biggest at 15.4 MB, with its superword rules stacked on a 200k vocabulary, then Gemma 2 at 14.5 MB. BERT is the smallest at 5.0 MB; its 29k-token vocabulary is a fraction of the others.

Shaping costs 40 to 60 microseconds per character for the BPE faces on the CI runner, and a few microseconds for BERT and CLIP, which have far fewer rules. A 10,000-character document re-shapes in well under a second, and browsers only re-shape the paragraph being edited.

Hilariously, at 40 to 60 microseconds per character, I started wondering whether this is actually any faster than sending the text to a service that tokenizes it, returns the pieces, and having the client reassemble and highlight them. All that work only to arrive at something that might be less accurate **and** slower.

As that thought landed I ran a quick check, on my laptop, same 12,265-character corpus for both, line by line:

per character

500-char paragraph

10,000-char document

the font, shaped by HarfBuzz

34 µs

17 ms

343 ms

tiktoken, running locally

0.11 µs

0.06 ms

1.1 ms

So: about 300 times slower than doing it properly. I'm so proud.

Painting a span per token on the client adds a few milliseconds to the tokenizer's side, which still leaves the font two orders of magnitude behind. Against a network round trip of 30 to 100 ms it's closer to a tie: the font wins for a paragraph and loses for a document.

The one thing in the font's favor is that browsers only re-shape the paragraph you're typing in, so what you actually pay per keystroke is the 17 ms row, and nobody can probably feel that.

No regrets.

## A half-baked idea to end on

Everything in Tokenizer Mono swaps glyphs for other glyphs of the same text. But a substitution rule doesn't _have_ to. We can match a whole phrase, collapse it into one glyph, and expand that glyph into something else entirely. Good becomes evil. Up becomes down. Yes is no.

My half-baked idea after landing this was "To what degree could we be replacing glyphs with the would-be response tokens to these tokens from an LLM?" A model in a font (kinda).

So, in principle: a font where typing "What is the capital of Oregon?" could render as "Salem is the capital of Oregon." It would be deterministic, but the rule fires when the question mark lands, the answer appears in place of the question, and the document underneath still says what you typed. Select it, copy/paste it and you get the question back.

It would basically be a lookup table though, not a model. The font could only answer questions someone enumerated at build time, exactly as spelled. [ELIZA](https://en.wikipedia.org/wiki/ELIZA) packed into a font maybe. I'm putting a pin in it as the next silly font project.

If you want the real thing though, it exists! And it's wonderful. Pure OpenType substitution is a finite-state machine, which is enough for [Fontemon](https://www.coderelay.io/fontemon.html) (a playable Pokémon-style game that lives entirely inside a font). For an actual language model you need more than a state machine, and HarfBuzz has a Wasm shaper that lets a font carry arbitrary code (which is kind of insane to me): [llama.ttf](https://fuglede.github.io/llama.ttf/) uses it to bundle a small Llama model and its inference engine inside a font file, so typing a prompt generates text. No browser enables that Wasm shaper, thank goodness, but the ceiling for "a font that does things" is a lot higher than you'd think.

**Credits**: [IBM Plex](https://github.com/IBM/plex) (OFL), [fontTools](https://fonttools.readthedocs.io/), [HarfBuzz](https://harfbuzz.github.io/), [tiktoken](https://github.com/openai/tiktoken), Hugging Face [tokenizers](https://github.com/huggingface/tokenizers), [wordfreq](https://github.com/rspeer/wordfreq).

## Sources

Every "used by" claim in the table above was checked against the vendors' own tokenizer files, not model cards or press. For public repos the `tokenizer.json` vocabulary and merge list were downloaded and compared directly. For gated repos (Meta, Google, Mistral, BigCode) the comparison uses the file hashes Hugging Face publishes in the repo metadata, or a public repo that ships the byte-identical file.

Where each face's vocabulary comes from

-   **OpenAI faces.** `cl100k`, `o200k`, `p50k` and `r50k` are built from the encodings of those names in [tiktoken](https://github.com/openai/tiktoken). Which OpenAI model uses which encoding comes from tiktoken's own [model.py](https://github.com/openai/tiktoken/blob/main/tiktoken/model.py). `clip` is [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32).
-   **Meta.** `llama4`: [meta-llama/Llama-4-Scout-17B-16E-Instruct](https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct). `llama3`: [meta-llama/Meta-Llama-3-8B](https://huggingface.co/meta-llama/Meta-Llama-3-8B). `llama2`: [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf). These repos are gated, so the build reads the ungated mirrors [unsloth/Llama-4-Scout-17B-16E-Instruct](https://huggingface.co/unsloth/Llama-4-Scout-17B-16E-Instruct), [NousResearch/Meta-Llama-3-8B](https://huggingface.co/NousResearch/Meta-Llama-3-8B) and [NousResearch/Llama-2-7b-hf](https://huggingface.co/NousResearch/Llama-2-7b-hf). The mirrors' `tokenizer.json` (Llama 4 and 3) and `tokenizer.model` (Llama 4 and 2) carry the same hashes as Meta's. Meta also publishes the Llama 3 and Llama 4 tokenizer files in [meta-llama/llama-models](https://github.com/meta-llama/llama-models) on GitHub; both match the Hugging Face vocabularies token for token.
-   **Google.** `gemma3`: [google/gemma-3-4b-it](https://huggingface.co/google/gemma-3-4b-it). `gemma`: [google/gemma-2-2b](https://huggingface.co/google/gemma-2-2b). Both gated; built from [unsloth/gemma-3-4b-it](https://huggingface.co/unsloth/gemma-3-4b-it) and [unsloth/gemma-2-2b](https://huggingface.co/unsloth/gemma-2-2b), whose `tokenizer.json` and `tokenizer.model` hashes match Google's. `t5`: [google-t5/t5-base](https://huggingface.co/google-t5/t5-base). `bert`: [google-bert/bert-base-cased](https://huggingface.co/google-bert/bert-base-cased).
-   **Mistral.** `mistral`: [mistralai/Mistral-7B-v0.3](https://huggingface.co/mistralai/Mistral-7B-v0.3), built from [unsloth/mistral-7b-v0.3](https://huggingface.co/unsloth/mistral-7b-v0.3) (same `tokenizer.model` hash, same 32,768-token vocabulary). `tekken`: [mistralai/Mistral-Nemo-Base-2407](https://huggingface.co/mistralai/Mistral-Nemo-Base-2407), built from [unsloth/Mistral-Nemo-Base-2407](https://huggingface.co/unsloth/Mistral-Nemo-Base-2407) (same `tekken.json` hash, same 131,072-token vocabulary and merges).
-   **Everyone else, read directly from the vendor's repo.** `qwen`: [Qwen/Qwen2.5-7B](https://huggingface.co/Qwen/Qwen2.5-7B). `deepseek`: [deepseek-ai/DeepSeek-V3](https://huggingface.co/deepseek-ai/DeepSeek-V3). `glm`: [zai-org/GLM-4.5](https://huggingface.co/zai-org/GLM-4.5). `hunyuan`: [tencent/Hunyuan-7B-Instruct](https://huggingface.co/tencent/Hunyuan-7B-Instruct). `ernie`: [baidu/ERNIE-4.5-21B-A3B-PT](https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT). `seed`: [ByteDance-Seed/Seed-OSS-36B-Instruct](https://huggingface.co/ByteDance-Seed/Seed-OSS-36B-Instruct). `yi`: [01-ai/Yi-1.5-9B](https://huggingface.co/01-ai/Yi-1.5-9B). `granite`: [ibm-granite/granite-3.3-8b-instruct](https://huggingface.co/ibm-granite/granite-3.3-8b-instruct). `falcon3`: [tiiuae/Falcon3-7B-Base](https://huggingface.co/tiiuae/Falcon3-7B-Base). `falcon`: [tiiuae/falcon-7b](https://huggingface.co/tiiuae/falcon-7b). `neox`: [EleutherAI/gpt-neox-20b](https://huggingface.co/EleutherAI/gpt-neox-20b). `bloom`: [bigscience/bloom](https://huggingface.co/bigscience/bloom). `superbpe`: [UW/OLMo2-8B-SuperBPE-t180k](https://huggingface.co/UW/OLMo2-8B-SuperBPE-t180k). `kimi`: [moonshotai/Kimi-K2-Instruct](https://huggingface.co/moonshotai/Kimi-K2-Instruct), which publishes its vocabulary as a tiktoken-format file rather than a `tokenizer.json`.

Vocabulary sizes

-   **GPT-2, 50,257 tokens.** Section 2.3 of the GPT-2 paper, [Radford et al. 2019](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf): "The vocabulary is expanded to 50,257." The same figure is `n_vocab` for the `gpt2` and `r50k_base` encodings in tiktoken.
-   **GPT-4, 100,277 tokens, and GPT-4o, 200,019 tokens.** `n_vocab` for `cl100k_base` and `o200k_base` in tiktoken, whose [openai\_public.py](https://github.com/openai/tiktoken/blob/main/tiktoken_ext/openai_public.py) defines each encoding from OpenAI's published rank files. The counts include the handful of special tokens each encoding reserves (one, five and two respectively).
-   **Multilingual growth.** The "Language tokenization" section of OpenAI's [Hello GPT-4o](https://openai.com/index/hello-gpt-4o/) announcement lists per-language token counts for the same sentence under the new tokenizer: Gujarati 4.4 times fewer (145 to 33), Telugu 3.5 times fewer, English 1.1 times fewer.

Models that share a face's vocabulary

-   **GPT-4, GPT-3.5, text-embedding-3 on `cl100k`; GPT-4o, o1, o3, GPT-4.1 on `o200k`; Codex and text-davinci-002/003 on `p50k`; GPT-2 and GPT-3 on `r50k`.** All from tiktoken's [model.py](https://github.com/openai/tiktoken/blob/main/tiktoken/model.py), which maps model names to encodings (`gpt-4` to `cl100k_base`, `gpt-4o` to `o200k_base`, `code-davinci-002` to `p50k_base`, `davinci` to `r50k_base`). GPT-2's own `gpt2` encoding has the same 50,256 tokens and ranks as `r50k_base`.
-   **gpt-oss on `o200k`.** tiktoken maps `gpt-oss-*` to `o200k_harmony`, whose 199,998 ranked tokens are identical to `o200k_base`; it differs only in special tokens. The `tokenizer.json` in [openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) has the same vocabulary as `o200k_base`.
-   **Phi-4 on `cl100k`.** [microsoft/phi-4](https://huggingface.co/microsoft/phi-4) ships the 100,256 `cl100k_base` tokens with the same ids, plus 96 special tokens.
-   **OLMo 2 on `cl100k`.** [allenai/OLMo-2-1124-7B](https://huggingface.co/allenai/OLMo-2-1124-7B): the `cl100k_base` tokens plus 22 special tokens.
-   **Granite 4 on `cl100k`.** [ibm-granite/granite-4.0-h-small](https://huggingface.co/ibm-granite/granite-4.0-h-small): the `cl100k_base` tokens with the same ids, plus 96 special tokens. An earlier draft of this table put Granite 4 under Llama 3; Llama 3's vocabulary is a 128,000-token superset of cl100k, and Granite 4 has none of the extra 27,744.
-   **Llama 3.1, 3.2 and 3.3 on `llama3`.** Meta's [llama-models](https://github.com/meta-llama/llama-models) repo lists every 3.x release as tiktoken-based and ships a single [models/llama3/tokenizer.model](https://github.com/meta-llama/llama-models/blob/main/models/llama3/tokenizer.model) for them; its 128,000 tokens match the Llama 3 vocabulary id for id. The Hugging Face repos for [3.1](https://huggingface.co/meta-llama/Llama-3.1-8B), [3.2](https://huggingface.co/meta-llama/Llama-3.2-1B) and [3.3](https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct) are gated and were not compared directly.
-   **SmolLM 3 on `llama3`.** [HuggingFaceTB/SmolLM3-3B](https://huggingface.co/HuggingFaceTB/SmolLM3-3B): vocabulary and merges identical to Llama 3's.
-   **Gemma 1 and 2 on `gemma`.** [google/gemma-7b](https://huggingface.co/google/gemma-7b) and [google/gemma-2-2b](https://huggingface.co/google/gemma-2-2b) ship the same `tokenizer.model` (identical hash). Gemma 3's is different: 262,144 tokens against 256,000, with only 180,870 in common.
-   **Mistral Small 3, Nemotron-H and Apertus on `tekken`.** [mistralai/Mistral-Small-24B-Base-2501](https://huggingface.co/mistralai/Mistral-Small-24B-Base-2501), [nvidia/Nemotron-H-8B-Base-8K](https://huggingface.co/nvidia/Nemotron-H-8B-Base-8K) and [swiss-ai/Apertus-8B-2509](https://huggingface.co/swiss-ai/Apertus-8B-2509) each have merges identical to Mistral Nemo's and the same 131,072-token size; they differ only in renamed special tokens (6, 4 and 60 respectively).
-   **Qwen 2, 2.5 and 3 on `qwen`.** [Qwen/Qwen2-7B](https://huggingface.co/Qwen/Qwen2-7B), [Qwen/Qwen2.5-7B](https://huggingface.co/Qwen/Qwen2.5-7B) and [Qwen/Qwen3-8B](https://huggingface.co/Qwen/Qwen3-8B): identical vocabulary and merges.
-   **DeepSeek R1 on `deepseek`.** [deepseek-ai/DeepSeek-R1](https://huggingface.co/deepseek-ai/DeepSeek-R1) and [deepseek-ai/DeepSeek-V3](https://huggingface.co/deepseek-ai/DeepSeek-V3): identical.
-   **Granite 3, Granite Code and StarCoder on `granite`.** [ibm-granite/granite-3.0-8b-base](https://huggingface.co/ibm-granite/granite-3.0-8b-base) and [ibm-granite/granite-8b-code-base-4k](https://huggingface.co/ibm-granite/granite-8b-code-base-4k) have vocabulary and merges identical to StarCoder's. [bigcode/starcoder](https://huggingface.co/bigcode/starcoder) is gated, but [bigcode/tiny\_starcoder\_py](https://huggingface.co/bigcode/tiny_starcoder_py) ships the byte-identical `tokenizer.json`. Granite 3.3 renames one special token. StarCoder2 ([bigcode/starcoder2-7b](https://huggingface.co/bigcode/starcoder2-7b)) is a different tokenizer, with 93 tokens and the merge order changed, so it is not listed.
-   **Pythia on `neox`.** [EleutherAI/pythia-6.9b](https://huggingface.co/EleutherAI/pythia-6.9b) and [EleutherAI/gpt-neox-20b](https://huggingface.co/EleutherAI/gpt-neox-20b): identical.
-   **Falcon 7B and 40B on `falcon`.** [tiiuae/falcon-40b](https://huggingface.co/tiiuae/falcon-40b): identical to [tiiuae/falcon-7b](https://huggingface.co/tiiuae/falcon-7b).
-   **Stable Diffusion prompts on `clip`.** The text tokenizers in [CompVis/stable-diffusion-v1-4](https://huggingface.co/CompVis/stable-diffusion-v1-4) and [stabilityai/stable-diffusion-xl-base-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0) have the same 49,408-token vocabulary and ids as [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32).
-   **Algorithm labels.** From each repo's `tokenizer.json`: a `ByteLevel` pre-tokenizer marks byte-level BPE (GPT-2 lineage, Llama 3 and 4, Qwen, DeepSeek, Tekken, GLM, Hunyuan, Seed, Falcon, NeoX, BLOOM, SuperBPE, Granite, CLIP); `byte_fallback` with a Metaspace or no pre-tokenizer marks SentencePiece BPE (Llama 2, Mistral 7B, Gemma, ERNIE, Yi); T5's model is Unigram, with scored pieces instead of merges; BERT's decoder is WordPiece.

\--

_If you enjoyed reading this consider [sponsoring my work](https://github.com/sponsors/georgemandis) on GitHub or [subscribing](https://buttondown.com/georgemandis) to my newsletter._

_Share this post: [Hacker News](https://news.ycombinator.com/submitlink?u=https%3A%2F%2Fgeorge.mand.is%2F2026%2F11%2Fthe-tokenizer-font%2F&t=Tokenizer%20Mono) • [Reddit](https://www.reddit.com/submit?url=https%3A%2F%2Fgeorge.mand.is%2F2026%2F11%2Fthe-tokenizer-font%2F&title=Tokenizer%20Mono) • [LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fgeorge.mand.is%2F2026%2F11%2Fthe-tokenizer-font%2F) • [Mastodon](https://share.joinmastodon.org/?text=Tokenizer%20Mono%0A%0Ahttps%3A%2F%2Fgeorge.mand.is%2F2026%2F11%2Fthe-tokenizer-font%2F)._

_Published on Wednesday, November 4th 2026. Read this post as [plain-text](https://george.mand.is/2026/11/the-tokenizer-font.txt)._