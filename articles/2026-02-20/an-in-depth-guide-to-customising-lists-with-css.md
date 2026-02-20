---
title: "An in-depth guide to customising lists with CSS"
source: "https://piccalil.li/blog/an-in-depth-guide-to-customising-lists-with-css/?ref=main-rss-feed"
publishedDate: "2026-02-19"
category: "css"
feedName: "Piccalilli"
author: "Richard Rutter"
---

This first rule of styling lists is that they should be treated with the same reverence you would show any other text. If a list is inserted within a passage of text, treat it as a continuation and integral part of that text.

For bulleted or unordered lists, use padding to indent each list item the equivalent distance of a line height. This will allow the bullet to sit neatly in a square of white-space.

`ul { 	padding-inline-start: 1lh; }`

Numbered or ordered lists which reach into double figures and beyond will require more space. Allocate this space in multiples and fractions of the line height.

## [The basics: choosing different kinds of lists](#the-basics-choosing-different-kinds-of-lists)

### Unordered lists

Unordered lists are given filled **discs** for bullets by default. As lists are further nested, browsers apply **circles**. These are followed by filled **squares** for lists nested three or more deep.

You can change which bullets are used through the `list-style-type` property with values of `disc`, `circle` and `square` respectively. For example, to make all unordered list items filled squares use:

`ul li { 	list-style-type: square; }`

If you want to use a different symbol for a bullet you can do so by specifying it in quote marks. You’re not limited to individual characters – as well as regular glyphs, you can use words and emoji.

The `-type` suffix of `list-style-type` implies that the bullets are typographical. You can also use images for your list bullets. Link to your image using the `list-style-image` property.

You can position the bullet in-line with your text by using `list-style-position: inside`. Use `outside` to set it back again.

`ul li.point { 	list-style-type: "👉️ "; }  ul li.tool { 	list-style-image: url(wrench.svg); }  ul.notes li { 	list-style-type: "Note: "; 	list-style-position: inside; }`

### Ordered lists

The default style for numbered or ordered lists is a decimal progression, with each number followed by a full stop. You can change the numbering system to alphabetical or Roman numerals by applying the `lower-latin`, `upper-latin`, `lower-roman`, `upper-roman` or `decimal` values of `list-style-type`. You can also select from many non-Latin numbering systems such as Greek, Devanagari, Persian and Katakana – you’ll need to use these even when the document or element has the appropriate language set.

### Changing font and colour

Numbering and bullets will inherit the colour and font of your list text. While this will provide your reader with a consistent experience, you may wish to style them differently to reduce their visual impact, or otherwise distinguish them from the text.

The bullets and numbering automatically displayed by browsers are known as markers in CSS. The good news is that these are created as `::marker` pseudo-elements which means you can style them directly. The bad news is that we are very limited in which styles we can apply. All you can change is the colour (not the background) and the font via any property beginning with `font-` such as family, weight and size. You can also animate these properties and specify directionality of the text.

Despite these limitations, being able to style the colour and font of the markers accounts for a common use case that required workarounds and extra markup in the past. For example, applying these styles directly to the markers…

`ol li::marker { 	color: gray; 	font-family: sans-serif; 	font-size: 0.8em; }`

…will reduce the visual impact of your numbering by making it grey, sans-serif and slightly smaller.

By default, list markers use tabular numerals, meaning the numbers all line up nicely. If you wanted a different effect you would need to add `font-variant-numeric: proportional-nums` to your marker styling.

You might also be tempted to make your numeric markers much larger than your list text. This can be a pleasing effect, however simply changing the `font-size` of your marker to `3em` probably won’t achieve the result you’re hoping for:

The gotcha is that browsers align the baseline of markers with that of the first line of the list item text. Therefore a large list item number will always stick up above the list item text. And because we can’t apply any positioning or layout properties directly to the marker there’s not much you can do about it, although there are alternatives which we’ll come to later.

[Advert![Complete CSS. Take your CSS skills beyond the next level. Available now!](https://piccalil.b-cdn.net/images/ads/complete-css-ad-landscape-free-lessons.png?format=webp)](https://piccalil.li/complete-css/lessons/3?utm_source=piccalilli&utm_medium=graphical-ad)

## [Generating your own marker content](#generating-your-own-marker-content)

You can customise the generated content of the marker as it also takes the `content` property, like this:

`ul li::marker { 	/* make all the bullets pointing hand emoji */   content: "👉️ "; }  ol li::marker { 	/* follow each number by a parenthesis instead of a full stop */   content: counter(list-item) ") "; }`

Generating content for markers is supported by Chromium and Firefox, but not by WebKit (Safari), with no support in sight at the time of writing. Safari falls back to regular bullets or numbering which may, or may not, be acceptable to you depending on whether you consider your styling a progressive enhancement rather than crucial to the meaning of your content.

So what is `::marker` good for? It’s definitely the way to go if you want to change just the colour or font of your list markers. Anything more and you’ll need a different technique. Before we get on to those we need to talk about symbols and counters.

So far we have been defining what the bullets in an entire list should look like, that is to say we’re using the same symbols for all list items at the same level of nesting. However it is also possible to define a sequence of symbols for your bullets. There are a couple of ways to do this. The first is with the `symbols()` function, which you can use as a value of the `list-style` property. For example, you could specify the classic sequence of symbols for footnotes:

`ol { 	list-style: symbols("*" "†" "‡" "§"); }`

![The symbols, assigned in the above code block, rendered in Firefox](https://piccalil.b-cdn.net/images/blog/css-symbols-list.jpg?auto=format&w=1500)

At the time of writing, this only works in Firefox. You can still [see the demo here though](https://codepen.io/clagnut/pen/dPXZxRv)

In this case the symbols automatically double up when the end of your specified sequence is reached. You can add the `cyclic` keyword to prevent this. The default behaviour is `symbolic`.

`ul { 	list-style: symbols(cyclic "🌑" "🌓" "🌕" "🌗"); }`

![The symbols, assigned in the above code block, rendered in Firefox](https://piccalil.b-cdn.net/images/blog/css-symbols-list-2.jpg?auto=format&w=1500)

At the time of writing, this only works in Firefox. You can still [see the demo here though](https://codepen.io/clagnut/pen/qENVePa)

You can also specify that your symbols sequence is `numeric` like decimals …7 8 9 10 11… or `alphabetic` like …a b c aa ab ac ba…, or use `fixed` to revert to default numbering once your custom symbols run out – useful if you’re specifying a sequence like ① ②…⑧ ⑨.

_However,_ the `symbols()` function is **only supported in Firefox**, with no interest from [Webkit](https://bugs.webkit.org/show_bug.cgi?id=299922) or [Chromium](https://issues.chromium.org/484510686) at the time of writing. In theory you can also specify a sequence of images, but this is not supported in any browser.

The [CSS spec](https://drafts.csswg.org/css-counter-styles/#symbols-function) says The `symbols()` function allows a counter style to be defined inline in a property value, for when a style is used only once in a stylesheet and defining a full `@counter-style` rule would be overkill.. And this brings us to some good news.

## [Defining your own numbering sequence](#defining-your-own-numbering-sequence)

The `@counter-style` rule enables you to further specify exactly what symbols or text appear in your list markers, and in what order or combination. You can use it to replicate all the `symbols()` and `::marker` content functionality we’ve seen so far, and cross-browser is support is good – it became [Baseline Newly Available](https://web-platform-dx.github.io/web-features-explorer/features/counter-style/) in September 2023.

This is how to use `@counter-style` to achieve the `symbols()` examples we looked at earlier. This will work across all modern browsers today:

`@counter-style --footnotes {   system: symbolic;   symbols: '*' † ‡ §;   suffix: " "; }  @counter-style --moons {   system: cyclic;   symbols: 🌑 🌓 🌕 🌗;   suffix: " "; }`

Which you apply to your lists using the `list-style` property:

`ol.footnotes { 	list-style: --footnotes; } ul.moons { list-style: --moons; }`

Similarly one of the marker examples attempted to use a 👉️ for all its bullets. You can achieve that effect cross-browser like this:

`@counter-style --point {   system: cyclic;   symbols: 👉️;   suffix: " "; }`

These counter style examples consist of four parts. The first is a name for the style, such as `--point`. You can call the counter styles pretty much what you want. You don’t need to prefix them with `--` although I find it good practise to do so in order to be consistent with naming custom properties. The other parts of the rule are:

-   `system` which sets the algorithm used for how the counter works. This takes the same keywords as the `symbols()` function described earlier, plus `additive` and `extends` which we’ll come to later.
-   `symbols` is a space separated list of numbers or bullets (in theory this can also take images but there’s no support at the time of writing). Some characters need to be quoted such as `*` – to be safe you could put all the characters inside quotes, but generally you don’t need to.
-   `suffix` is the character or characters inserted after the counter (a simple space in our examples so far).

For completeness, counter style rules also take the following descriptors, some of which are more niche than others:

-   `prefix` is the character or characters inserted before the counter
-   `negative` sets the characters before and after a negative counter value. For example, specifying `negative: "(" ")"` will wrap negative counters in parentheses, which is sometimes used in financial contexts, like “(2) (1) 0 1 2 3…”. It’s fair to say there are very few use cases for negatively numbered ordered lists, however this is still a good opportunity to specify a proper minus symbol instead of a hyphen, just in case: `negative: "−"`.
-   `pad` gives you a fixed-width style of numbering by repeating a character before the counter such that all counters are the same width. In reality this means zero-padded decimal numbering. So if you know that your ordered list goes up to less than a thousand, you can specify `pad: 3 "0"` to ensure that all counters are (at least) 3 digits wide. This will cause 1 to be shown as “001”, 20 as “020”, 300 as “300”, 4000 as “4000”, and -5 as “-05” (still three characters wide).
-   `range` enables you apply counter styling to specific ranges in the ordered list. For example adding `range: 3 5, 20 infinite` will only apply styles to list items with counters 3,4 ,5 and anything 20 and above. All other list items will get the default style of numbering.
-   `speak-as` describes how assistive technologies should synthesise the spoken form of a counter. Our earlier example had `symbols: 🌑 🌓 🌕 🌗`. To prevent the browser introducing each list item with something like ‘first quarter moon’, you could set `speak-as: bullets` so they are introduced like a normal unordered list. See [the spec](https://drafts.csswg.org/css-counter-styles-3/#counter-style-speak-as) for more options. Only Safari supports this at the moment but it’s a good candidate for progressive enhancement.

For more examples and creative uses of `@counter-style` see [Geoff Graham’s CSS Tricks article](https://css-tricks.com/some-things-you-might-not-know-about-custom-counter-styles/).

Thinking back to our other marker example, we followed the number by a closing parenthesis instead of a full stop. This is a perfect use case for the `extends` system. Instead of starting from scratch and working out how to define decimal counting in a counter style, we can ‘extend’ the existing decimal style. You might like to think of `extends` as meaning ‘modifies’. Here’s how:

`@counter-style --decimalparen {   system: extends decimal;   suffix: ") "; }`

You can’t include a `symbols` descriptor when extending a counter style as that would imply you’re defining a brand new style. You can extend any counter system from the standard list-types as well as any named custom counter styles.

The space character in the suffixed `") "` exposes a slight inconsistency between browsers. If you take the space away you’ll see that Chrome and Firefox position the marker flush against the list item text. However Safari always introduces a gap, which you can’t remove. Most of the time this difference is subtle and inconsequential, but once you start heavily customising your markers it can be more obvious. This is particularly true if you’re increasing the font size of your markers, but as we saw earlier that brought its own problem with the marker being aligned to the first line of text.

[Advert![Mindful Design. Learn to design for real humans. Available now](https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp)](https://piccalil.li/mindful-design?utm_source=piccalilli&utm_medium=graphical-ad)

## [Creating your own marker box](#creating-your-own-marker-box)

The only solution to all these inconveniences is to remove the `::marker` pseudo element and create your own in such a way that you can style it to your specific purposes.

Firstly remove the marker pseudo element by applying `list-style:none` to your list:

`ol { 	list-style: none; }`

Having done that, Safari will no longer announce your list to assistive software. To rectify this, tell browsers this really is a list by applying an ARIA role:

`<ol role="list"> 	<li>First item. 	  <ol role="list"> 			<li>Nested item.</li> 		</ol> 	</li> 	<li>Second item.</li> </ol>`

Now create your own placeholder for the counter by creating `::before` pseudo elements and moving them into the margin. Then use generated content to display the counter using the `counter()` function.

`ol[role='list'] li::before { 	display:inline-block; 	width:4ch; 	padding-inline-end:1ch; 	margin-inline-start:-5ch; 	text-align:right; 	font-variant-numeric: tabular-nums; /* make the numbers line up nicely */  	content: counter(list-item) "."; }`

The `counter()` function takes a counter name, which you can specify. In this case we’ve used `list-item` which is a special name reserved as an implicit counter for the list being styled. It outputs the position of the list item.

You can also output the position of all the list numbers in nested sequence, separated by a character or string. To do this use the `counters()` function:

`ol[role='list'] li::before { 	content: counters(list-item,".") ":"; }`

If you want your list to start at 1 and increment by 1 each time, you don’t need to do anything else provided you use `list-item` as your counter name. Otherwise you can reset or create a new counter, set its starting point (the default is 0) and increment by a defined amount for each list item:

`ol[role='list'].mylist { 	list-style: none; 	counter-reset: --myList 3; }  ol[role='list'].mylist li { 	counter-increment: --myList 2; }  ol[role='list'].mylist li::before { 	content: counter(--myList) ". "; }`

You can use `counter-increment` with any selector meaning you can just as easily number headings in sequence:

`h2 { 	counter-increment: --h2; }  h2::before { 	content: counter(--h2) ". "; }`

If all you want to do is set the start number for a list or adjust an item’s value, you don’t need to use CSS, you can do it in HTML using `start` and `value`. If you want to have the list items count down instead of up you’ll need to specify that in HTML with a `reverse` attribute:

`<ol start="42">   <li>First item starts at 42</li>   <li>This one is then 43</li>   <li>And we end on 44</li> </ol>`

`<ol>   <li>This is number 1</li>   <li value="42">This is number 42</li>   <li>It follows that this is 43</li> </ol>`

`<ol reversed start="44">   <li>Counting down from 44</li>   <li>Now we're at 43</li>   <li>The final answer.</li> </ol>`

## [Tying it all together](#tying-it-all-together)

Finally let’s use some of what we’ve learned to create this list:

Here’s the full CSS which we’ll walk through afterwards:

`ul[role='list'] {   list-style: none;   max-inline-size:23em;   padding-inline-start:2.5em;   line-height:1.25em; }  ul[role='list'] li {   margin-block-end:1lh;   min-block-size: 2lh;   position:relative;   text-box: trim-start cap alphabetic; }  @counter-style --fleurons {   system: cyclic;   symbols: ❦ ✾ ✤ ❈ ✺ ❥;   suffix: "";   speak-as: bullets; }  ul[role='list'] li::before {   position:absolute;   inset-block-start: 0;   inset-inline-start: -1.25em;   inline-size:1em;   text-box: trim-start cap alphabetic;   text-align:end;   font-size:2lh;   line-height:1;   font-weight:bold;   color: hsl(3, 70%, 55%);   content: counter(list-item, --fleurons); }`

### Breakdown

Looking at each rule individually:

`ul[role='list'] {   list-style: none;   max-inline-size:23em;   padding-inline-start:2.5em;   line-height:1.25em; }`

We start by removing the default bullets, remembering to tell assistive software the list is still a list. We then set enough padding next to the list to accommodate our fancy new bullets.

`ul[role='list'] li {   margin-block-end:1lh;   min-block-size: 2lh;   position:relative;   text-box: trim-start cap alphabetic; }`

Next we address the list items themselves, spacing them apart using the list’s line-height to stick to a vertical rhythm. We give each item a minimum height to fit a bullet symbol, and set to relative positioning in preparation for our custom list markers. Finally we trim the text to the top of the capital letters to help us align our bullets consistently.

`@counter-style --fleurons {   system: cyclic;   symbols: ❦ ✾ ✤ ❈ ✺ ❥;   suffix: "";   speak-as: bullets; }`

We now define a sequence of fancy Unicode symbols to use as bullets. These will cycle round if we end up with more than six list items. We make sure they are announced as ‘bullet’ rather than ‘rotated heavy black heart’, etc.

`ul[role='list'] li::before {   position:absolute;   inset-block-start: 0;   inset-inline-start: -1.25em;   inline-size:1em;   text-box: trim-start cap alphabetic;   text-align:end;   font-size:2lh;   line-height:1;   font-weight:bold;   color: hsl(3, 70%, 55%);   content: counter(list-item, --fleurons); }`

Finally we create pseudo elements before each list item and absolutely position them off to the side, leaving a 0.25em gap. We want the bullets to nicely span two lines of text, so we make the font size `2lh`, remove any half-leading by setting the line height to `1`, and trim the text box to the top of the capitals so it aligns with our list text. Finally we make the bullet bold and red, and write it to the page using generated content by way of the `list-item` implicit counter and our `--fleurons` counter style.

## [In summary](#in-summary)

Phew. Modern CSS enables you to do so much with lists it’s sometimes hard to know where to start, especially as browser support is not complete. Here’s a summary of which properties you should turn to for different use cases.

CSS

Use case

`list-style`

Changing the basic bullet styles or numbering system. Using a Unicode symbol, emoji or text in place of a bullet. Using images for bullets.

`li::marker`

Colouring the numbering or bullets differently to the list text. Changing the `font-` properties of the numbering (but not its size unless the difference is subtle).

`symbols()`

Only supported by Firefox, use `@counter-style` instead.

`@counter-style`

For defining your own sequence of bullet symbols (not images) or a completely customised numbering system.

`extends`

Used within `@counter-style` to modify existing numbering systems, for example to change or remove the default ”.” suffix.

`li::before`

For complete control over marker positioning, especially if your bullets or numbering are much larger than the list text.

## [Sources and further reading](#sources-and-further-reading)

I am indebted to the following articles, in no particular order:

-   [https://kizu.dev/list-item-counter/](https://kizu.dev/list-item-counter/)
-   [https://moderncss.dev/totally-custom-list-styles/](https://moderncss.dev/totally-custom-list-styles/)
-   [https://hadrysmateusz.com/blog/css-list-styling](https://hadrysmateusz.com/blog/css-list-styling)
-   [https://web.dev/articles/css-marker-pseudo-element](https://web.dev/articles/css-marker-pseudo-element)
-   [https://css-tricks.com/some-things-you-might-not-know-about-custom-counter-styles/](https://css-tricks.com/some-things-you-might-not-know-about-custom-counter-styles/)
-   [https://www.smashingmagazine.com/2019/07/css-lists-markers-counters/](https://www.smashingmagazine.com/2019/07/css-lists-markers-counters/)

Specifications:

-   [https://drafts.csswg.org/css-counter-styles/](https://drafts.csswg.org/css-counter-styles/)
-   [https://drafts.csswg.org/css-lists/](https://drafts.csswg.org/css-lists/)
-   [https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element)

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![Mindful Design. Learn to design for real humans. Available now](https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp)](https://piccalil.li/mindful-design?utm_source=piccalilli&utm_medium=graphical-ad)