---
title: "Spoiler Alert: it needs to be accessible"
source: "https://scottohara.me/blog/2024/08/22/spoiler.html"
publishedDate: "2024-08-22"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

The topic of how to make an accessible spoiler component, or ‘should there be a spoiler element?’ has recently (re)-caught my attention. (I wrote most of this back in February and then forgot about it… as I seem to do these days. But then people necro’d a GitHub issue on the topic, so here we go again)

Now, I could do what I usually do and write some long winded junk about what a spoiler is, how it’s essentially a glorified disclosure widget… maybe mention something about the `details` and `summary` elements and how they likely wouldn’t be sufficient for all use cases. Blah blah blah. Boring.

Instead, I’m just going to tell you what I’d expect from a spoiler component if someone were to build one, or if one were to ever be standardized. I’ll try to keep it as short as I possibly can (which I’m bad at).

## Spoiler 1: there needs to be a semantic container element

While one obviously needs some sort of container to delineate the content that needs to be marked as spoilery - it can’t just be a plain old `div`. Insert your bewildered ‘gasps’ here.

Someone using a screen reader, for instance, needs to be able to know that they’ve entered a section of content that represents spoiler material, and also importantly, when they’ve reached the end of such content.

We should also be mindful to the fact that spoilers can represent an entire section of content, which could contain multiple paragraphs / structured content (e.g., lists n’ such). Or, it could be a string of text within a paragraph.

In lieu of a standardized element with a [transparent content model](https://html.spec.whatwg.org/multipage/dom.html#transparent-content-models) (see how `del` and `ins` work / allow for otherwise ‘invalid’ nesting, if you aren’t sure what that term means), the spoiler container will need to be a custom element so we don’t need to switch between a `div` and a `span` (the latter being able to be used within a `p` element, where the former would cause the browser’s parser to kick it out).

```
<spoiler-component>
  ...
</spoiler-component>
```

As far as default accessibility semantics are concerned, a custom element is a long-winded way to write `span` or `div`, and that won’t cut it. So we need to give this thing a role and an accessible name to help define those boundaries I mentioned.

```
<spoiler-component aria-label="Spoiler" role="group">
  ...
</spoiler-component>
```

With this in place, we now have a wrapper to define the boundaries of the spoiler content. It will be exposed as a ‘group’ with the name of ‘spoiler’, identifying that any content within this group is spoiler-related. (please note that `group` might not be the ‘best’ role for this… but also, in my opinion there is presently no better role, so here we are)

## Spoiler 2: there needs to be a way for it to be accessed by non-pointer (mouse) inputs

If you think that someone should be able to reveal the spoiler content by clicking anywhere on this element, then sure. That can happen. But, you can’t stop thinking there - sorry, I know thinking is hard.

We need a way for someone who isn’t using a pointer device (mouse, touch, etc.) to be able to reveal the spoiler content. So what are we to do? We add a keyboard accessible control to provide this function. You might have heard of “buttons”?

```
<spoiler-component aria-label="Spoiler" role="group">
  <button>Reveal Spoiler</button>
  ...
</spoiler-component>
```

Now we have a keyboard accessible way to reach this spoiler content. **But also** the visible button text helps identify why this blurred or blocked out content is presented this way. Cause you know… spoilery, content or ‘gated/potentially nsfw’ content can look similar in their visual treatment (visually obscured but still takes up space in the document flow). But they actually represent very different things… almost like just because some things look similar, you can’t just assume they’re the same… if this was Twitter, I’d be subtweeting really hard right now.

While we’re at it though, it _should_ be a default that someone can show/hide (a.k.a., ‘toggle’ - it’s an industry term) the spoiler content. And that’s for a few reasons:

1.  It might not be desired for the content to remain visible. We don’t know what the spoiler content could be, and maybe there’s something that gets displayed that one doesn’t always want to be displayed? Use your imagination… People should have a way to hide this content again if they want/need to.
2.  If the button goes away when the spoiler content is shown, then we have to worry about focus management. Otherwise, as often happens when people don’t think about this, a screen reader’s virtual cursor could find itself sent back to the start of the web page, and that user would then need to re-navigate the page to find the content again - but this time without the ability to navigate to the button with the name of ‘spoiler’.
3.  Keeping the button in place also allows us to provide a confirmation of action to the user by using an `aria-expanded` attribute. When first encountering the button, someone using a screen reader will hear the button is in the “collapsed” state. And activating it will announce it in an “expanded” state, thus signaling the button actually did what it was supposed to do, and now they can go spoil themselves.

```
<spoiler-component aria-label="Spoiler" role="group">
  <button aria-expanded="true|false">Reveal Spoiler</button>
  ...
</spoiler-component>
```

## Spoiler 3: gotta actually hide the spoiler content _to everyone_

We can’t just blur, block or blot out the spoiler content (I don’t actually know what a blotting treatment would visually entail here, but it was a 3rd ‘b’ word for obscuring content, so I’m keeping it there. Why am I explaining this to you?).

There are two bits we need to consider here:

1.  Visual styles alone won’t make the content actually hidden. Someone using their mouse could still copy the visually obscured content, or someone using a screen reader could still access the content. Additionally, if there are nested keyboard focusable elements within the spoiler, then those too could still be reached by someone navigating by keyboard. None of that’s what we want.
2.  Since the “Spoiler” toggle button needs to be inside of the “Spoiler” `group`, we can’t blanket obscure everything within it.

So we can adjust the markup by adding a nested container as a sibling for the button. We can also use the `inert` attribute to serve as our styling hook, which also makes sure the content can’t be accessed when its obscured.

```
<spoiler-component aria-label="Spoiler" role="group">
  <button aria-expanded="false">Reveal Spoiler</button>
  <spoiler-content inert> <!-- look, it's inert! -->
    ...
  </spoiler-component>
</spoiler-content>
```

One problem with this idea right now is that `inert` content can still be found when using a browser's "find" feature (e.g., ctrl + F). My feelings on whether inert content should be 'found' are complicated... But I'm trying to keep this short. So moving on.

## Spoiler 4: But howzitwork?

Well, I made a fancy-dancy (it is neither of those) CodePen to show you. The JavaScript is slapdash, the CSS is incredibly basic. I’m sure you can do better. Don’t @ me. I don’t care.

See the Pen [Spoiler Component](https://codepen.io/scottohara/pen/xxBagPy) by Scott ([@scottohara](https://codepen.io/scottohara)) on [CodePen](https://codepen.io/).

### But you keep the button visible at all times!? I don’t want that!

Yup. I’m sorry you don’t want that. I don’t want to remove or hide it.

I’m sure a compromise can be made. But the button really should be persistently available so that people can toggle the content, and so that one doesn’t need to worry about moving focus when the button ‘disappears’ on them after activating.

Might someone decide to visually hide their button? Sure… I’m not going to fight ya on that, so long as it still works for all your users. But, if one were to standardize this, the default should be as accessible by default as possible. And that probably means the button should be persistent by default.

## Wrap it up

A standardized accessible component like this _could_ be useful for more than just temporarily hiding the key plot points of a \[ insert thing you want to spoil here \]. Arguably it could be a useful component to have for interfaces that need to edit or present documents where content needs to be obscured.

Additinoally, a standardized component could provide a simplified aural UI in ways that are arguably a bit cumbersome for a web developer to deliver on.

For instance, rather than a `group` with the name of “spoiler” - a new variant of a `group` role could be created, with a localized role description (a.k.a., the ‘name’ of the role) of “spoiler” or “obscured” or something else… So instead of needing to name a generic group, you could just have an element that was announced with the name of that role.

There are other things that a browser implementation could consider - from exactly how to handle the inert content (making sure it can’t be found by the browser find feature), or even how it might handle the button part / focusability of the element in general. Maybe a browser-implementation could even go to the point of removing the spoiler/redacted content form the source code? I dunno about that… but you can’t _really_ have truly redacted content on the web if you can just few source to check it out, can you?

My example is merely demonstrating a basic styled example of what I’d expect this to look like based on what can be done as a web author.

Ok, fun. This wasn’t too long, I guess.