---
title: "I’ve Been Doing Blockquotes Wrong"
source: "https://css-irl.info/ive-been-doing-blockquotes-wrong/"
publishedDate: "2024-10-16"
category: "css"
feedName: "CSS IRL"
---

True to form, Heydon Pickering has written another blistering account of one of the most ubiquitous HTML elements, [the `<blockquote>`](https://heydonworks.com/article/the-blockquote-element/). You’ve probably used a `<blockquote>` when writing HTML. I know I’ve used literally hundreds of them. What I didn’t know is that I’ve been using them wrong all these years.

To pilfer a few choice quotes from said article:

> In HTML5, `<blockquote>` content “must be quoted from another source”. So that’s pull quotes completely out of the window, then.

Heydon rightly makes the distinction between block quotes, which (supposedly) quote another source, and pull-quotes, which highlight excerpts from the article you’re reading. I was surprised to learn that `<blockquote>` elements should **not** be used for pull-quotes. I’ve been using them all over the place. Whoops.

> ...the term “block quotation” precedes the `<blockquote>` element and the concept of block-level HTML elements. The Chicago Manual Of Style recommends block quotations are over 100 words in length, for example.

Once again, I’m doing block quotes wrong. I don’t think I’ve knowingly _ever_ included a quote over 100 words long on a web page. Does anyone ever read that many words on the web? You’ll notice neither of the block quotes so far in this article are over 100 words in length. (To be fair, this isn’t part of the HTML spec. But might well influence how you define a “blockquote”.)

> Different versions of different specifications agree the citation cannot be inside the `<blockquote>` element.

Oh dear. I’ve been putting a `<cite>` inside a `<blockquote>` for years. I distinctly remember reading that this was a good idea at some point in the last 10 years, and haven’t checked back since. I’m sure in part it relates to this idea (also from the article):

> Related elements should generally be programmatically grouped so its clear what belongs to what.

Heydon suggests using a `<figure>` and `<figcaption>` to invoke this grouping, which seems the most sensible option.

I also learnt about the `<q>` element for the first time in this article:

> For inline (or “text-level”) quotations, there is `<q>` instead.

OK. So...is it not enough to put **actual quote marks** in the text (“like this”, which I’ll wager is what happens in 99.999% of cases)? I mean, it has a `cite` attribute, but given that according to Heydon, “The `<blockquote>` cite attribute is generally useless since it’s invisible and most screen readers also ignore it”, I can’t see any real use cases. It it just a styling thing? In which case, wouldn’t a `<span>` suffice? I’ll eagerly await Heydon’s `<q>` article to find out.

## HTML is Hard

All of which is to say, HTML is hard. Probably the hardest part of my job. In all the years I’ve been writing articles, I’ve received far more complaints/corrections about HTML than anything else, and I consider myself pretty OK at HTML. And despite writing it for years, I don’t feel like I really know it well (see above).

Conversely, it’s pretty easy to write bad HTML, because for most developers there are **no consequences**. If you write some bad Javascript, your application will probably crash and you or your users will get a horrible error message. It’s like a flashing light above your head telling the world you’ve done something bad. At the very least you’ll feel like a prize chump. HTML fails silently. Write bad HTML and maybe it means someone who doesn’t browse the web in exactly the same way as you do doesn’t get access to the information they need. But maybe you still get your pay rise and bonus.

So it’s frustrating to see the importance of learning HTML dismissed time and time again. Sorry to end on a bad note, but that’s where we’re at right now.

I recommend reading Heydon’s article, and the others from the series on HTML elements, which is far more comprehensive (and, I dare say, better written) than this one, despite the fact that I’ve lifted a load of quotes from it verbatim. And by the end of the series, hopefully we’ll all be experts in HTML.

## Edit

Adrian Roselli has a great rundown of how [different screenreaders announce various combinations of `<blockquote>` and `<cite>`](https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html). Reading though these, I don’t think nesting `<cite>` inside `<blockquote>` is a totally terrible choice, even if it’s _technically_ wrong.

Likes: 58

Reposts: 35

Mentions: 1

-   > [@michelle](https://front-end.social/@michelle) I learned a lot from his post too. I feel weird about using figcaption to group in the cite?
    > 
    > /Me goes looking though all my uses of blockquote in my last blog post ????
    > 
    > \- [Scarer Joy :happy\_pepper:](https://front-end.social/@sarajw)
    
-   > [@sarajw](https://front-end.social/@sarajw) IMO, when a thing is almost never used "as intended" then it does not actually mean whatever "was intended" and the spec/advice should change to match real world use.
    > 
    > We do this all the time with words. Because \*semantics change\*. That is a feature of language, not a bug.
    > 
    > \`blockquote\` as specced is almost entirely pointless these days, and not used as described.
    > 
    > Which reminds me, one day I'll finally write an article where every word is in an \`ol > li\`.
    > 
    > [@michelle](https://front-end.social/@michelle)
    > 
    > \- [Matt Wilcox](https://mstdn.social/@mattwilcox)
    
-   > [@michelle](https://front-end.social/@michelle) Never used this tag in my life, just classed divs with stylizing on the class. HTML really needs to go through a simplification phase.
    > 
    > What actually is the practical good of blockquote?
    > 
    > \- [Khleedril](https://cyberplace.social/@khleedril)
    
-   > [@michelle](https://front-end.social/@michelle) "I distinctly remember reading that \[putting a <cite> inside a <blockquote>\] was a good idea at some point in the last 10 years, and haven’t checked back since."
    > 
    > Same. Probably this post:
    > 
    > [https://html5doctor.com/cite-and-blockquote-reloaded/](https://html5doctor.com/cite-and-blockquote-reloaded/)
    > 
    > [cite and blockquote – reloaded | HTML5 Doctor](https://html5doctor.com/cite-and-blockquote-reloaded/) \- [Timothy Leverett](https://front-end.social/@zzzzBov)
    
-   > [@michelle](https://front-end.social/@michelle) TIL about \`q\` ????
    > 
    > \- [Khalid ⚡️](https://mastodon.social/@khalidabuhakmeh)
    
-   > [@mattwilcox](https://mstdn.social/@mattwilcox) [@sarajw](https://front-end.social/@sarajw) [@michelle](https://front-end.social/@michelle) I agree. Putting the cite into the blockquote is “not intended” but I couldn’t care less about correctness. Give me <quotecontent> and <quotecite> elements inside a <quote> element, if you want to distinguish quote text from the citation, especially as figure/figcaption is also not really intended for blockquotes.
    > 
    > TL;DR it’s a mess, and HTML should be ashamed of itself. ????
    > 
    > \- [Eric Eggert](https://yatil.social/@yatil)
    
-   > [@sarajw](https://front-end.social/@sarajw) [@michelle](https://front-end.social/@michelle)  
    > The Chicago Manual Of Style is a suggestion for print, if you think it makes sense for a quote to not be presented inline within a paragraph on the web, use <blockquote>.
    > 
    > The fact that the HTML spec specifically says the element is for quotes from other sources suggests they thought about ones from the same source, i.e. pull quotes. I'd like to see a justification for that because I don't see why it makes a difference.
    > 
    > I don't think quotes and their citations need to be programmatically grouped, presenting the information in sequence is fine.
    > 
    > \- [Curtis Wilcox](https://c.im/@cwilcox808)
    
-   > [@michelle](https://front-end.social/@michelle)  
    > <q> does a few things:
    > 
    > It localizes the marks, it will use the marks that fit the \`lang\` set on a parent element. Add \`lang="fr"\` to see how the appearance of <q> changes.
    > 
    > It automatically makes quotation marks "curly" instead of straight. Your article appears to have curly quotes in the text but my guess is something did that formatting for you, you didn't use an arcane key combination to type open quote, close quote characters. <q> uses pseudo-elements to add the right characters.
    > 
    > Because the curly quote characters aren't a part of the text, they don't get mangled by encoding mismatches (e.g. Unicode vs. Latin-1).
    > 
    > In languages that use them, it automatically alternates between double quote (") and single quote (') marks for nested quotations; outermost is double, next quote in is single, then inside that is double, and so on.
    > 
    > \- [Curtis Wilcox](https://c.im/@cwilcox808)
    
-   > [@michelle](https://front-end.social/@michelle)  
    > A downside to <q> is because it makes the marks a form of styling, instead of a part of the text, the marks don't survive copying and pasting into plaintext.
    > 
    > It's also more cumbersome to type out open and close HTML tags vs. pressing Shift+' on a (English) keyboard.
    > 
    > \- [Curtis Wilcox](https://c.im/@cwilcox808)
    
-   > [@cwilcox808](https://c.im/@cwilcox808)  
    > \>my guess is something did that formatting for you, you didn't use an arcane key combination to type open quote, close quote characters
    > 
    > Oh, I absolutely did! The designer in me would never use " for double quotation marks ????
    > 
    > But thank you, this is super interesting to know!
    > 
    > \- [Michelle Barker](https://front-end.social/@michelle)
    
-   > [@michelle](https://front-end.social/@michelle) [@cwilcox808](https://c.im/@cwilcox808) > Oh, I absolutely did! The designer in me would never use " for double quotation marks ????
    > 
    > Glad to know I’m not the only one :)
    > 
    > \- [Aral Balkan](https://mastodon.ar.al/@aral)
    
-   > [@michelle](https://front-end.social/@michelle)  
    > I had that moment of oops about three years ago and wrote a (German) post about it:
    > 
    > [https://pmueller.de/zitat-und-quelle/](https://pmueller.de/zitat-und-quelle/)
    > 
    > I just love Heydons articles ????
    > 
    > [Über Zitate, Quellenangaben und HTML | Peter Müller](https://pmueller.de/zitat-und-quelle/) \- [Peter Müller](https://mastodon.social/@pmmueller)
    
-   > [@michelle](https://front-end.social/@michelle) Regarding your point about the \`<q>\` element, I’m 98% sure that the original SGML parsed straight quotes \_as\_ \`<q>\` for you to later do whatever you wanted with.
    > 
    > It’s perfectly fine to use existing language-specific quote markup, but \`<q>\` is handy for if you want to style it or whatever!
    > 
    > \- [Taylor “Tigt” Hunt](https://mastodon.social/@tigt)
    
-   > [@michelle](https://front-end.social/@michelle) I wish Markdown had an easy way to create asides, because a lot of blockquotes should be asides from the sound of it. ????????‍♂️
    > 
    > \- [Jared "Spooky Web" ????️ White](https://indieweb.social/@jaredwhite)
    
-   > [@jaredwhite](https://indieweb.social/@jaredwhite) I’m going to make an Eleventy shortcode for it for my blog ????
    > 
    > \- [Michelle Barker](https://front-end.social/@michelle)
    
-   > [@michelle](https://front-end.social/@michelle) That was such a nice read!
    > 
    > \- [Thomas Michael Semmler](https://indieweb.social/@nachtfunke)
    
-   > [@michelle](https://front-end.social/@michelle) A shortcode makes sense.
    > 
    > But more generally, this kind of thing is why I wish the facility to add a class à la Markdown Extra was a \*standardised\* part of Markdown, and that it could be applied to any block level element. How practical that is I don’t know.
    > 
    > [@jaredwhite](https://indieweb.social/@jaredwhite)
    > 
    > \- [Jonathan Schofield](https://mastodon.social/@urlyman)
    
-   > [@khleedril](https://cyberplace.social/@khleedril) [@michelle](https://front-end.social/@michelle) it’s linked in the post, but [@heydon](https://front-end.social/@heydon) wrote up a good article on how it’s supposed to be used: [https://heydonworks.com/article/the-blockquote-element/](https://heydonworks.com/article/the-blockquote-element/)
    > 
    > [The blockquote element](https://heydonworks.com/article/the-blockquote-element/) \- [Boo-is Dale](https://social.lol/@lewis)
    
-   > [@michelle](https://front-end.social/@michelle) I think also that we don't really have to stick to \*exactly\* what the spec says is the intended usage of a tag? Obviously there is a balance but it doesn't seem unreasonable to use blockquote for 'a block-level chunk of quotation', regardless of source, especially given the lack of a good alternative for pull quotes.
    > 
    > (Somewhat similar to the prescriptivist/descriptivist debates about grammar.)
    > 
    > \- [Tom Walker](https://mastodon.social/@tomw)
    
-   > [@michelle](https://front-end.social/@michelle) Welp, I guess I have some templates to update.
    > 
    > Thank you for the write-up!
    > 
    > \- [Marijke Luttekes](https://fosstodon.org/@mahryekuh)
    
-   > [@michelle](https://front-end.social/@michelle) If I’m honest I’m always surprised at how much html (and css) ended up being designed to suit an esoteric programming consideration rather than thinking about what users would actually need!
    > 
    > \- [Alex White](https://chirp.enworld.org/@PlaneSailingGames)
    
-   > [@michelle](https://front-end.social/@michelle) coming from most of what I see being typeset PDFs, I do actually do pullquotes with <q> (in an aside) and reserve blockquote for ‘what someone says’ on my blog. I don’t think I’d have really thought of doing pullquotes if I’d not been used to them from print, and thinking nice to break up text for viewing on mobile. Mind, cite goes where looks best - as for me that’s definitely in the blockquote, far too complicated to start using more elements around that.
    > 
    > \- [Clare Hooley](https://mastodon.me.uk/@clare_hooley)
    
-   > [@michelle](https://front-end.social/@michelle) FWIW I'm learning a lot of stuff I thought I already had down while doing this. Blockquote is one of those where I'm like, "really?" Honestly, some of this stuff is just not specified particularly well IMHO.
    > 
    > \- [Large Heydon Collider](https://front-end.social/@heydon)
    
-   > [@michelle](https://front-end.social/@michelle) Since it mostly only impacts screen reader users, how you use \`<blockquote>\` could be a function of how useful / verbose it is. Which I cover using examples from W3C and WHATWG:  
    > [https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html](https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html)
    > 
    > IOW, it depends.
    > 
    > [Blockquotes in Screen Readers](https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html) \- [Adrian Roselli](https://toot.cafe/@aardrian)
    
-   > [@nachtfunke](https://indieweb.social/@nachtfunke) ????
    > 
    > \- [Michelle Barker](https://front-end.social/@michelle)
    
-   > _Edit: I confused the cite attribute with the cite tag. Sorry._
    > 
    > [@michelle](https://front-end.social/@michelle) to be fair, in the introduction to `<blockquote>`, MDN suggests you add a `<cite>`. [@heydon](https://front-end.social/@heydon) found that clients don't disclose the tag, but that doesn't mean it's totally useless. I'm not saying it's useful, but I can imagine it's helpful for search engines or that (academic) note-taking software could parse it.
    > 
    > I very well agree with your conclusion: you can mess up HTML without visible consequences. As adding a `<cite>` to a `<blockquote>` doesn't break anything, I'm hesitant to remove it from existing codebases as it may break something for someone else.
    > 
    > \- [Koos Looijesteijn](https://octodon.social/@koos)
    
-   > [@michelle](https://front-end.social/@michelle) [@heydon](https://front-end.social/@heydon) oh damn I just realized I forget to distinguish the cite element and the cite attribute—gonna read both your articles again :D
    > 
    > \- [Koos Looijesteijn](https://octodon.social/@koos)
    
-   > [@michelle](https://front-end.social/@michelle) I really want to use `<q>` tags, because it would allow me to define what type of quotation marks to apply based on a text's language, using CSS (f.e. “English quote” and «cotation en français»). Unfortunately, when a user copy/pastes a text with such quotes, Chrome and Safari don't include the quotation marks, making it hard for them to quote that.
    > 
    > \- [Koos Looijesteijn](https://octodon.social/@koos)
    
-   > [@koos](https://octodon.social/@koos) [@michelle](https://front-end.social/@michelle) Yeah, it's totally parsable. But its useless in the sense that it isn’t parsed by all things it should be.
    > 
    > \- [Large Heydon Collider](https://front-end.social/@heydon)
    
-   > [@aardrian](https://toot.cafe/@aardrian) [@michelle](https://front-end.social/@michelle) Is Douglas Adams the most quoted human ever?
    > 
    > \- [Dave Letorey](https://front-end.social/@dletorey)
    
-   > [@dletorey](https://front-end.social/@dletorey)  
    > I’m working on it!
    > 
    > [@michelle](https://front-end.social/@michelle)
    > 
    > \- [Adrian Roselli](https://toot.cafe/@aardrian)
    
-   > [@aardrian](https://toot.cafe/@aardrian) [@michelle](https://front-end.social/@michelle) me too
    > 
    > \- [Dave Letorey](https://front-end.social/@dletorey)
    
-   > [@michelle](https://front-end.social/@michelle) That was interesting. Thanks for including the link to [@aardrian](https://toot.cafe/@aardrian)'s screen reader tests.
    > 
    > I personally think that adding fig & figcaption as a wrapper is a bit ick for a blockquote in text. \*However\* that might be a perfectly reasonable alternative to blockquote for a pull quote! Because figures, like pull quotes, are supposed to make sense independently from their position in the main text flow.
    > 
    > (Or just don't use pull quotes at all, & instead highlight the main text in flow. ????????‍♀️)
    > 
    > \- [Amelia Bellamy-Royds](https://front-end.social/@AmeliaBR)
    
-   > [@AmeliaBR](https://front-end.social/@AmeliaBR) [@aardrian](https://toot.cafe/@aardrian) Yeah, I mean I do find pull quotes kinda weird, you end up reading the same text twice! ????
    > 
    > \- [Michelle Barker](https://front-end.social/@michelle)
    
-   > [@zzzzBov](https://front-end.social/@zzzzBov) [@michelle](https://front-end.social/@michelle) Ah, thanks for that link. That explains why my understanding was also "the spec used to pooh-pooh <cite> inside of <blockquote> but it's allowed now as a common & reasonable pattern."
    > 
    > The W3C HTML spec was modified to allow it. Never got integrated back into the WHATWG HTML spec, which is now the only official spec.
    > 
    > But based on styling simplicity & the screen reader results, I'm going to keep using it. Semantics that aren't exposed to anyone don't matter to anyone.
    > 
    > \- [Amelia Bellamy-Royds](https://front-end.social/@AmeliaBR)