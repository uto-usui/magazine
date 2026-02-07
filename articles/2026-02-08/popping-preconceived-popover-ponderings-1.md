---
title: "Popping preconceived popover ponderings"
source: "https://scottohara.me/blog/2025/03/14/popovers.html"
publishedDate: "2025-03-14"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

I wrote much of this back in 2023 and 2024 while `popover` was still being implemented / was newly released. Since I began digitally scribbling my thoughts down, others ended up writing about the attribute - which was one of the reasons I didn’t feel any urgency in publishing my own post. Though, I did co-author one of [Hidde de Vries’s articles about `popover`](https://hidde.blog/popover-accessibility/).

But I decided to finally get this post in a publishable state because I still see people asking questions about `popover`. Like, what is it? How does it differ from a `dialog` (modal or non)? Why doesn’t it do this one thing that I need it to? I’m not going to answer every question about `popover`. But I should get back into the habit of writing this stuff down once and pointing people to it, rather than providing repetitive one-off answers whenever I happen across someone asking about it.

Here we (finally) go.

## Like a baked good, a popover rise

The `popover` attribute [was initially proposed by Open UI](https://open-ui.org/components/popover.research.explainer/). It does a lot for you in terms of not having to wrangle with CSS overflows or z-index clashes for your popover component. Additionally, it can provide some very handy basic focus management and dismissing behaviors. It even takes care of common accessibility mappings expected of popovers (again, read the article [Hidde and I wrote](https://hidde.blog/popover-accessibility/)).

But `popover` by itself doesn’t do everything you may need for fully accessible custom popovers. It wasn’t meant to, nor should it. There are variations in behavior for common popovers like menus or listboxes, sub-navigation lists of links, tooltips, teaching tips, info balloons, dropdowns ([whatever the hell that means](https://adrianroselli.com/2020/03/stop-using-drop-down.html)), light-dismissible dialogs, and \[insert other made up terms for content that shows/hides while appearing atop other content\].

The tldr; is that `popover` doesn’t do everything you might want it to, and that’s on purpose. Just like it’s on purpose that I’m going to be using specific quotes from Fight Club for the headings of this blog post - not every quote/heading. Just the ones that fit how I wanted to introduce new topics.

## It’s only after we’ve lost everything we’re free to do anything

The `popover` attribute is a global attribute, meaning it can be used on any HTML element. That doesn’t mean you should. I mean, unless you want to create some broken crap.

Similarly to how the `title` and `tabindex` attributes are global attributes. If you put those on whatever you want without thinking of the UX / accessibility implications, then you’re likely making some janky web interfaces. Same with `popover`. Declaring the attribute on arbitrary containers, without understanding the actual experience you’re making for users, is unlikely to end well for users. Particularly because unless purposefully implemented to behave as expected (based on the visual representation / content of the popover) the popover will not come with all of the necessary accessibility semantics, or keyboard functionality users might expect.

To provide some context for the various reasons why more “automatic” accessibility semantics and keyboard functionality weren’t included, some background on the creation of the attribute is in order.

The `popover` attribute wasn’t an attribute to start. There was a proposal for a `<popup>` element. However, when it came time to explain the semantics of the proposed element… well… it was like a non-modal dialog, but also it needed to behave like a tooltip, or popup pickers for comboboxes and menus. It could also be a popup list of sub-navigation links. But also, maybe it was even an element to be used as a generic container of content, so that content could simply be displayed above other content, without having to fight with overflow or z-index issues.

The `<popup>` element wasn’t just one thing, it was many ideas and potential use cases trying to be solved with a single element. Mind you, a single element that would not even necessarily be usable in all the contexts it could be needed, unless the HTML parser rules were changed to account for this new element. But, the level of effort to do that was not small. Nor did it help that identifying the exact semantics and a11y mappings for the element was like trying to nail mayonnaise to a rock with a deflated balloon hammer. Enjoy that mental image.

However, outside of defining the specific semantics of the element, a native “popup” HTML feature still made sense. None of the potential use cases nor initial rational for making it an element was “bad” by any means. There were a lot of very smart people working on this proposal that all had excellent intentions. But it did not have a clear path to get accepted as a new HTML element. It did not help its case that as an element, it would have required authors to specify the necessary ARIA roles to it for most use cases. HTML did not want or need another generic `div` or `span` element. Especially since that wouldn’t be accurate if it were to then also have these special popup behaviors.

So with the element pathway running too short for successful takeoff, `<popup>` was given a hard critique. In doing so, it was determined that what this “element” really represented was a collection of overlapping behaviors that many different types of web “popups” needed.

Accepting this shifted the proposal to defining a `popup` global attribute (which then had to be renamed to `popover`, because enough web developers out there figured “why should _I_ have to validate my HTML by putting `data-` in front of my custom `popup` attribute? What could possibly go wrong aside from preventing the standardization of a potential `popup` attribute. LOL not my problem!”

That’s right - if one decides they don’t need to add `data-` in front of their custom attribute because why do that tiny bit of extra work, it increases the potential that a new attribute will need to be named after a breakfast food. Enjoy sounding like a weirdo when talking to your non-web dev friends when you tell them how you implemented the new pastry attribute into your project.

### I am a global attribute’s complete lack of surprise

Back to `popover` as a global attribute… as mentioned there are a number of instances where one would want to display certain types of content atop other content of the page. For instance:

-   a sidebar navigation that “slides out” (shows/hides) and overlays some content of the page
-   or more simply, a sub-navigation list of links (a “drop down”) from a persistent navigation
-   a custom tooltip so you can explain information that your design and content isn’t adequately relaying on its own
-   teaching tips (non-modal dialogs) that _should_ be positioned in the DOM near the content they are describing
-   custom combobox and menu popups (listbox, dialog or grid roles for the former, and a menu role for the latter)
-   and other examples, but this list is long enough!

There exist some HTML elements (e.g., `nav`, `dialog`, `ul`) that already provide the accessibility semantics we need to indicate to users the type of content they’d be interacting with. But, then there are all the other types of popups/popovers that (still) don’t have native HTML equivalents. Those would need to allow `popover` to be specified on things like `div` or custom elements (both `role=generic` by default) so that people could then use ARIA and additional scripting to build what they needed.

To allow for all the known instances of where `popover` could be useful, and so as to not prevent future legitimate use cases, it just made more sense to make `popover` global. Though as previously mentioned, while `popover` is a global attribute it doesn’t actually make sense to use it on all elements.

For instance, declaring `popover` on the `body` of your web page won’t do anything you’d probably want. That is, unless your goal was to make your entire web page hidden by default. In which case, good on you I guess?

But then there are the other elements like `cite`, `s`, `blockquote`, `ruby`, `meta`… take your pick really. The use cases for `popover` on those elements without any extra accessibility and UX considerations (or considering elements like `meta` are hidden by default - LOL) are rather dubious, IMO.

The point is that `popover` can be used on any HTML element, but the intent as with any HTML feature is that developers are using the attribute and element pairing because they have a good reason. And that they are doing what is _necessary_ to make their popovers accessible. That is, beyond what the browser provides, since simply declaring `popover` on an element allows the browser to handle some of the (hard) work that needs doing. It’s on you to do the rest for your specific use case.

## I am a popover’s medulla oblongata

The default behaviors for the `popover` attribute were chosen (I dare say carefully, and often with debate and compromise) based on the common overlapping behaviors amongst various different types of researched popups. As mentioned at the start of this post, there are existing articles written about those behaviors. So, outside of briefly mentioning them, I’m going to largely focus on the stuff that was purposefully left out, and [might make people wonder why](https://github.com/openui/open-ui/issues/1047).

### I am a popover’s overwhelming sense of inadequacy

Presently there are two types of `popover`s, with a 3rd - ‘hint’ - only available in Chromium browsers, at the time of this writing. I’m not going to talk about hint right now, other than to say it’s primary purpose will be to create hint-like popups - e.g., tooltips and maybe even browser error messages for form fields… _maybe_.

There is `popover=manual` which, outside of rendering the `popover` in the top layer and providing the necessary accessibility mappings / tab order updating between it and its invoking button element, all other behaviors are left up to the developer to implement.

Those other behaviors - if they are so desired, well they come with the `auto` state of `popover` (`popover`, `popover=""` and `popover=auto`). This is the type of `popover` that many people have veered towards, since it has additional light dismiss for mouse clicks outside of the popover and can be dismissed by use of the Escape key, and even TalkBack’s back gesture (in Chrome). For Escape key specifically, if keyboard focus is within the popover, focus will return to the invoking button - and if keyboard focus is outside of the popover, then it’ll simply close the popover.

For the third time now, you can read more about the [accessibility of popover](https://hidde.blog/popover-accessibility) in that other post :)

#### I am a developer’s inflamed sense of rejection

There are a few things `popover` in any state doesn’t do, on purpose…

##### keyboard focus doesn’t automatically move to the popover when it is invoked

Well that is unless the element used to make the popover is a dialog. Not all popovers need focus to move to them when invoked - some of them (again think tooltips or toggle tips) typically shouldn’t receive focus at all, especially if they contain no focusable elements.

If you want focus to automatically move to your invoked popover, declare the `autofocus` attribute on the element that should receive immediate and initial focus. No jS solution, buddy!

##### Popovers do not auto-dismiss (light dismiss) when focus leaves them

People keep wondering about this. At one point this behavior was almost a default. But upon further review and as more people outside of Open UI got involved thoughts on this matter changed (IMO, for the better).

The light dismiss on focus out was identified as a concern due to that fact there are _some_ popups on the web that do have an expectation for auto-dismiss behavior on focus out (e.g., listbox popups or menus). But since popups could be _any_ type of element, e.g., non-modal dialogs or persistent popup-discloure widgets, that not all popovers should have this behavior, and that making it apply to all popovers could result in unneeded frustration for people using screen readers who might leave a popover without realizing. That could then fire a focus event on a new element outside of the popover, and then the content they were trying to review was hidden and they’d have to figure out why and re-locate the triggering element to reopen the popover and hopefully not repeat the unwanted behavior.

On the flip side, the light dismiss via mouse/pointer event was deemed less problematic, as though people could still accidentally dismiss by errant clicking, if those people can see the screen they’d be more likely to notice the dismissal of the popover.

Of course the “problem” with this default behavior is that some types of popovers (e.g, a select’s listbox popup and other form control ‘pickers’) do dismisses on focus leaving (hence why people should want to do this, when appropriate).

The short of it though is that adding focus-out dismissal is far more trivial than trying to prevent the auto-dismissing if it were the default behavior. Again, `popover` is not meant to solve for every behavior/problem one might have. I’ll be saying this a lot. It’s kind of the point of this whole thing.

##### Popovers are not f#&@ing modal dialogs

Well, at least not without some very specific effort to make sure you aren’t just making something that “looks” like it should be modal, but isn’t really. You know, one of the primary accessibility problems with many custom modal dialogs.

Maybe it was a mistake to have a `::backdrop` for `popover` - it seemed like there could be some potential use cases at the time. But a `popover` even when used on a `dialog` element, is not modal. There are a bunch of truly unfortunate, I’d even say shitty, demos out there that might make you think otherwise.

A `popover` was never meant to be modal. There is already the `dialog` element which can be shown as modal - and with the [command and commandfor attributes](https://developer.chrome.com/blog/command-and-commandfor) one will be able to invoke a modal dialog without needing a line of JavaScript.

Hopefully new features like `command`, and [`closedby`](https://chromestatus.com/feature/5097714453577728) for dialogs (which can be used to add outside click light dismiss for modal dialogs) will help people pick the right markup for the features they’re trying to create.

##### A `popover` can only be invoked by a button element

Declaratively, yes. Button elements (both `button` and `input` buttons) made the most sense as the initial element to support invoking a `popover` - because it’s the primary use case. Button make thing go show, or hide, or both.

A `button` also supports exposing an expanded and collapsed state, and as generic buttons don’t have any implicit behavior - declaratively marking up one to invoke a `popover` wouldn’t conflict with any existing behavior (which is why buttons in the `submit` state don’t work with popovers when used within a `form` element - because opening a popover and submitting a form have conflicting behavior).

This decision has resulted in some jibber jabber from those who want to make custom elements or `div role=button` triggers for popover elements. The current solution though is to use the Popover API if one is going to be creating custom components that are already using JS anyway to recreate button elements.

Remember, declaring an ARIA role only changes the exposed **role** semantics for an element - but does nothing to change the actual functionality of an element. So just like how `<div role=image alt=foo>` doesn’t work to provide alternative text to the faux image (because `alt` is not a supported attribute for `div`) neither is simply adding `role=button` to any old element actually a solution to make `popovertarget` work with that element. Doing so would fundamentally break the baseline that ARIA does not change the underlying behavior/semantics of an element.

However, there is talk about making popovers work with custom elements which have properly set `elementInternals` to expose them as buttons. More on that some other time… For now, if you have a use case for controlling a `popover` with an element that isn’t a `button`, you’re going to need a smidge of JS.

##### Tabbing order may be revised for popovers, but not the a11y tree

Something that is not always communicated in `popover` example posts, is that for most cases a `popover` and its invoking button should be siblings.

One of the goals of `popover` and it rendering in the browser’s top layer was because of the hacks people needed to perform with `z-index` and DOM placement, so that popups could be properly displayed above other content and not be clipped by overflowing containers.

Top layer rendering mitigates these issues, which means that one **should** be able to declare their invoking element and popovers like so:

```
<button popovertarget=foo>...</button>
<ul id=foo>...</ul>
```

The reality though is that even with top layer rendering, this ideal sibling markup isn’t always going to be possible. For instance, one cannot markup an HTML list within a paragraph. Not without the browser’s parser splitting that content apart.

So, per the following example, the tab focus reordering for popover is beneficial for keyboard users, as the hyperlink that would otherwise come between the invoking element and its popover is temporarily “skipped” when the popover is open - instead being the next tabbable element _after_ the popover’s tabbable decendants.

```
<p>
  I am <button popovertarget=f>jack's</button>
  <a href=...>tabbing</a> popover example.
</p>
<div role="[whatever is appropriate]" popover id=f>
  <!-- static content -->
  <button>whatever i may be</button>
</div>
```

While browsers revise the tabbing order here so tabbing would go from the button in the paragraph, to the button in the dialog and _then_ to the hyperlink, the accessibility tree is not altered. Someone using a screen reader’s virtual cursor navigation, instead of the tab key, would encounter the invoking button, the hyperlink (and any other content preceding the popover) and then the popover/its content.

Revising the a11y tree to mitigate this is not without performance costs, and is not something that one might want a browser to even do by default for all popovers. Rather, this was determined to be something that web authors should use `aria-owns` for when it would be appropriate to do so.

## It’s called a changeover. The blog post goes on, and nobody in the audience has any idea

I’m not going to lie - one of the reasons I sat on this blog post for so long was because while I wanted to talk about the ins-outs of `popover`, I didn’t have a neat little way to package this all up to be like “and everything’s ok! All you have to do is X to make accessible popovers! HTML gives you everything for free!”

I don’t really care that I can’t do that, now. That’s not how this post is ending. Time to reiterate and restate.

The `popover` attribute isn’t meant to be the end-goal. It represents a collection of behaviors that can be used to make the basis of most types of popups - including the listbox popup for the customizable select element. But, it doesn’t do everything because it shouldn’t. There are still things that people will want to do with popover which will need JS (good thing there’s also a `popover` API!). There are still features that are missing from/would be nice to add to HTML, there are still components that need to be built - and be accessible - and `popover` isn’t going to magically make them all possible without extra effort.

But that’s not to say the book is closed on what `popover` and its related attributes (and now command attributes) should be able to do. New use cases can be proposed to extend current `popover` functionality. It’s a lot easier to add new good ideas than it is to remove bad ones (I’m looking at you details/summary and your allowance of nested input elements…). If those sorts of decisions get implemented, it puts the web into an awkward place. Behavior/allowances can’t be undone because then it would “break” the web - even if the current reality can still be broken for those with disabilities. We should want to avoid stuff like that.

But still, raise your issues. Make your requests. What else should popover reasonably be able to do? How should it be able to be controlled? And how will your proposal allow for a consistent accessible baseline? What is the line between a reasonable addition to popover’s functionality vs trying to make it into a different feature or element one might want?

I don’t have all the answers to such questions - though I got opinions (sorry not sorry). But, I’m hopeful things will keep improving. I know everyone in Open UI, and in the web standards groups that end up defining these features want to do the right thing by all users. All I know is that I just want people to be mindful about what they ask for, and to not think that a feature that was meant to be an ingredient should instead be the main course.