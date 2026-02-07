---
title: "Paragraphs"
source: "https://scottohara.me/blog/2024/08/29/paragraphs.html"
publishedDate: "2024-08-29"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

Consider the following:

I am a paragraph.

I am also a paragraph.

You might hate it, but I'm a paragraph too.

-   Even I am a paragraph.
-   Though I'm a list item as well.

I might trick you

Guess who? A paragraph!

The above HTML-monologue is marked up as follows:

```
<p>I am a paragraph.</p>
<span>I am also a paragraph.</span>
<div>You might hate it, but I'm a paragraph too.</div>
<ul>
  <li>Even I am a paragraph.</li>
  <li>Though I'm a list item as well.</li>
</ul>
<p>I might trick you</p>
<address>Guess who? A paragraph!</address>
```

You may look at that markup and say “Hey! You can’t fool me, only the `<p>` elements are “real” paragraphs!

You might even call out such elements as `div`s or `span`s being used as “paragraphs” a WCAG failure.

But, if you’re thinking those sorts of things, then maybe you’re not aware that those are _actually_ all “paragraphs”.

## What you talking about, paragraph?

In HTML there is the the [`p` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element), which is the element you use if you want to explicitly markup text and other phrasing conetnt as a _paragraph_. But **also** in HTML, there is the more [general concept/definition of paragraphs](https://html.spec.whatwg.org/multipage/dom.html#paragraphs).

I’m not going to just copy over all the text of the spec, you can read it at your leisure. Especially if you haven’t already (don’t worry, lots of people - myself included - just start building stuff without reading the instructions first). But an example I want to highlight from the `p` element section is as follows:

> List elements (in particular, ol and ul elements) cannot be children of p elements. When a sentence contains a bulleted list, therefore, one might wonder how it should be marked up.
> 
> For instance, this fantastic sentence has bullets relating to
> 
> -   wizards,
> -   faster-than-light travel, and
> -   telepathy,
> 
> and is further discussed below.
> 
> The solution is to realize that a paragraph, in HTML terms, is not a logical concept, but a structural one. In the fantastic example above, there are actually five paragraphs as defined by this specification: one before the list, one for each bullet, and one after the list.
> 
> The markup for the above example could therefore be:
> 
> ```
> <p>For instance, this fantastic sentence has bullets relating to</p>
>   <ul>
>    <li>wizards,
>    <li>faster-than-light travel, and
>    <li>telepathy,
>   </ul>
>   <p>and is further discussed below.</p>
> ```
> 
> Authors wishing to conveniently style such "logical" paragraphs consisting of multiple "structural" paragraphs can use the `div` element instead of the `p` element.
> 
> Thus for instance the above example could become the following:
> 
> ```
> <div>For instance, this fantastic sentence has bullets relating to
> <ul>
>  <li>wizards,
>  <li>faster-than-light travel, and
>  <li>telepathy,
> </ul>
> and is further discussed below.</div>
> ```
> 
> This example still has five structural paragraphs, but now the author can style just the div instead of having to consider each part of the example separately.

## Isn’t the `p` element important for screen readers?

Testing one’s assumptions is a good thing. Please, do it more and often.

Those examples I provided at the start of this post? macOS VoiceOver, NVDA, Narrator and JAWS treat them all as paragraphs (asterisks for NVDA, read on…)

With VoiceOver, you can use the VO + P (paragraph/plain text) or S (same item) keys to navigate to each of the “paragraphs”. Similarly with JAWS, the P hot key navigates to `li`, `span`, `div` and `p` paragraphs alike.

NVDA behaves similarly, but at least with the latest version with the default settings on, they have some special logic in place where only the paragraph that have punctuation (e.g., a period) in them will be navigable by the P hot key. Without punctuation, they’re not navigated to… which I can only assume is to try and distinguish between legit paragraphs of content, and small incidental text that might just be a nuisance to navigate through. But, that’s just a guess.

The point being that screen readers seem to be in step with HTML, at least from my understanding of what’s all going on here and actually testing how screen readers handle “paragraphs”. “Paragraphs” are more than just the `p` element. That’s not an opinion, it’s how they’ve been defined in HTML for _years_. That’s not to say people should not use the `p` element. It is absolutely the best practice when you need to define multiple blocks of paragraphs, rather than one `div` full of a bunch of text with `br` elements separating them. That’s just some sloppy slop. Writing explicitly semantic markup is often what people should aim for. It helps other developers understand your markup, it can be useful for styling, etc. etc. However, if you ever come across a “`div` paragraph” in the wild, and your WCAG trigger finger starts itching… It might just be worth remembering all this and just leave it be. Apply some Benadryl. If you’re worried about how screen readers will handle it, test before you declare something’s broken and then look silly when it’s not. Not every paragraph _needs_ to be a `p` element with an implicit `paragraph` role.

## Well, then why the ARIA `paragraph` role?

Oh damn it all… Fine, “good” question.

It’s a role largely meant for parity with HTML elements. A role actually ‘needed’ by most web developers, is rather suspect.

Similar to `role=generic`. Don’t use it.

Hell, if you even think you might want to try and get clever with it and do some things that HTML doesn’t allow, you’re probably setting yourself up for some foolishness.

For instance, ever thought it’d be nice to try and include non-phrasing content (think things like figures, tables) in a “paragraph”? (if so, need I remind you at this point of the HTML example I highlight above? but I digress..) You can’t do that with standard `p` elements, because the HTML parser - rightly - is like “what the hell you think you’re doing?” And the following markup…

```
<p>
  paragraph content goes here 
  <table><!-- table elements here --></table>
  more content goes here
  <ul><!-- list elements here --></ul>
  last line of content here
</p>
```

Gets rendered as:

```
<p>
 paragraph content goes here
</p>
<table><!-- table elements here --></table>
more content goes here
<ul><!-- list elements here --></ul>
last line of content here
<p></p> <!-- lol -->
```

Rare footage of the HTML parser at work...

![scene from ghostbusters where ray and egon fire their proton packs at a hotel cleaner pushing a cart, but in this gif the cart has the text 'p element' overlaid. The proton pack streams represent/have text saying 'lists, tables, you name it!'. When showing the cart being blasted by the proton packs, the text 'PARSING!!!!' is shown - representing the HTML parser attempting to make sense of the invalid content being thrown at it.  The last scene shows the ghostbusters with text overlaid saying 'sorry. sorry. i thought we could just do whatever the hell we wanted'.](https://scottohara.me/assets/img/p-parsing.gif)

The HTML parser will exclaim "what the hell you doing?" if you try to nest invalid children into a paragraph element.

For anyone unfamiliar with the scene from Ghostbusters that I made that gif from, [here is the scene on YouTube](https://youtu.be/ZJVgfDnjkko?si=iC-7rMlBxLXq5Uqn&t=43).

### But, what about ARIA? [ARIA does what HTMLdon’t](https://www.youtube.com/watch?v=k7nsBoqJ6s8).

Why not try and get around the awkwardness of proton pack p-parsing, and do something like the following?

```
<div role=paragraph>
  p is for paragraph but that's not good enough for me
  <table><!-- table elements here --></table>
  i want a table inside of my gosh darn p
  <ul><!-- list elements here --></ul>
  maybe a list too, that'd fill me with some semantic glee,
  oh, paragraph is spelled 'd i v r o l e = p a r a g r a p h' 
</div>
```

Really rolls off the muppet’s tongue, doesn’t it?

The problem with the above, and the thinking behind it, is that it doesn’t do anything useful.

Where it works best, someone using a screen reader wouldn’t notice any difference to whether the `role=paragraph` was used, or if it was rendered as the parsed HTML of the prior example. The insertion of the tables, lists, whatever - those container elements are still _not_ paragraphs, and thus they’d still result in a necessary distinction from the screen reader reading a string of text / phrasing content, to then encountering a block of content which is _not just_ a string of text / phrasing content.

Additionally, just quickly testing with the latest versions/browsers of screen readers (available at the time of writing), some oddities with the above get introduced (maybe you saw that coming. Misusing ARIA to try n’ all). For instance, if specifically using paragraph navigation (the P hot key) JAWS would skip over the first line of the ‘paragraph’ and just start reading all the content of the table’s `thead` as a string, no table semantics to speak of. Or, if attempting to navigate by tables on with the iOS rotor, there’d be ‘none’ to find.

Again I will note that generally speaking, doing something like this doesn’t immediately impact someone’s ability to read the content. It’s when using specific screen reader commands that things could get a bit messy. Just repeating myself as I anticipate someone reading the above and being like “Scott says this breaks the internet!” and jeezy-creezy, I did not friggin say that…

## Was there a point to all of this?

Yes.

Focus on markup issues/problems that actually have a detrimental impact on users. Futzing about whether to use a `div` or `span` vs a `p` element as the most semantic tag for content that is already covered under the umbrella of “paragraphs” is generally not one of them, in my opinion. Sigh… I just realized this entire blog post is just an elongated version of what I [already covered in my post about `div`s from 2022](https://www.scottohara.me/blog/2022/01/20/divisive.html#the-severity-of-semantics). So much for being new and interesting?

Also, a reminder to test your assumptions. Don’t just assume the use of a `div` is a bad thing (see again my `div` post), or that you can slap-dash ARIA on whatever you want and somehow make it better without actually verifying that to be true or not. The over use of ARIA has taught LLM AI some pretty ridiculous bad practices that now need to be untaught. It’s annoying.

Also, _also_, I wanted to make silly 80s pop culture references, and the best way I can think to do that is through some snarky educational content. So I did.

After all, I ain’t charging for this shit. :)

The end.