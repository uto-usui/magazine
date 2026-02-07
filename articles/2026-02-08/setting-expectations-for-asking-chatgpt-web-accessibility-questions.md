---
title: "Setting expectations for asking ChatGPT web accessibility questions"
source: "https://scottohara.me/blog/2023/01/31/ai-a11y-maybe-no.html"
publishedDate: "2023-01-31"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

You may be familiar with [ChatGPT](https://chat.openai.com/chat). But if you’re not, it’s a very cool chat interface using artificial intelligence to provide human-like responses to the questions you ask it. It is, however, still rather new and depending on what you ask it… well… As the FAQ for ChatGPT explains:

> These models were trained on vast amounts of data from the internet written by humans, including conversations, so the responses it provides may sound human-like. It is important to keep in mind that this is a direct result of the system’s design (i.e. maximizing the similarity between outputs and the dataset the models were trained on) and that such outputs may be inaccurate, untruthful, and otherwise misleading at times.

That’s some pretty important context to consider when reading what ChatGPT spits back at you. And, specifically in the context of what I want to prattle on about, you should probably not be relying on ChatGPT to write your accessible markup patterns for you, finding accessibility issues with the markup snippets you feed it, nor should you expect 100% factual and relavent answsers to your accessibility questions which likely require a level of nuance and understanding this AI **reasonably** doesn’t have yet.

I think their FAQ disclaimers make that clear, however…

## But Scott. I’ve used ChatGPT and it provides some accurate information (notice lack of specifics in this statement)!

Cool! I’d expect it to, and I’m sure it can even provide you some really good information. That is, if you know what to ask and know how to interpret what it returns to you. My 10 year old can also provide some very detailed information about what I do for work. About half of what she would say is true, and the rest is generally vauge and plausible enough that, sure, I have trained a shark to help blind people read the web. Why not. My 7 year old just thinks I drink coffee and write emails. Again, partially true. I’m going off topic…

My point is that this technology is still rather young, and what it regurgitates to you is going to be based on what it’s learned from humans, who are also unfortunately often incorrect. Some may acknowledge these gaps, but still assume ChatGPT could provide people with at least baseline information to start learning about aspects of web accessibility. Or at least, provide you accurate code guidance to help build accessible websites.

As with the authenticity of my kids’ answers, there is some truth to that, so long as you know that this can give you a start, but you should be mindful and question each answer it provides you. Otherwise, if you don’t keep this in mind, and are not well informed on general web accessibility concepts, you’re likely going to be asking seemingly straight forward questions that the current state of this AI will not have the necessary context to answer. And, what it does provide you, will be returned in a way where it _seems like it would be accurate_, particularly for someone who is new to this information.

That’s a big difference between how AI like this presently function, vs how a real (reasonable) human might respond.

The AI is going to power through and give you _something_ in the guise of an educated answer, even if that answer is smoke and mirrors. That’s not the intent of the functionality, but it’s a current reality we need to be aware of when reviewing the answers it gives us.

Let’s investigate.

### A ‘simple’ question. Or: “the ‘easy’ button”

For starters, let’s look at the response it provided me when asking ChatGPT “What do I need to do to make an accessible button for my web page?” Purposefully a bit vague, but also that should be simple enough, right? Arguably it’s just as detailed as some accessibility questions I’ve been asked to answer…

When asked, it returned:

> To make an accessible button for your web page, follow these steps:
> 
> 1.  Use the `<button>` element in your HTML.
> 2.  Add a descriptive label to the button using the `aria-label` or `aria-labelledby` attribute.
> 3.  Ensure keyboard accessibility by giving the button a tab index and using JavaScript to listen for keyboard events (such as "Enter" or "Spacebar") to trigger the button's action.
> 4.  Use CSS to provide visual feedback for the button's state (e.g. hover, active, focus).
> 5.  Test the button with assistive technologies such as screen readers to ensure it is usable and understandable.
> 6.  If using an icon-only button, add a descriptive text alternative using `aria-hidden` and `aria-labelledby` attributes.
> 7.  Consider additional accessibility best practices, such as making the button large enough to be easily tap-able on touch screens, and ensuring sufficient contrast between the button text and background color.

That sorta sounds reasonable enough? So, what’s my problem with this (because, I’m me - so of course I have a problem with this). Let’s dig into what it said.

#### Use the `<button>` element in your HTML.

It starts off seemingly on the right track. To make an accessible button, use a `<button>` element. Not a `<div>`? OK, computer. You seem to be off to a good start. That is, so long as I can actually use a `<button>` element. Or, maybe I’m green enough to say I want to make an accessible button, but really I’ve been tasked to take this design where this “button” is really a call to action link. But, these are early days, and ChatGPT has not been coded in a way to respond with “I know you asked this, but maybe you meant something else instead? You did also ask me about tooltips 46 times, and each time you were actually talking about a different UI pattern all together. Please do confirm your intent so I can learn you some stuff.”

I want a ChatGPT t-shirt that says, “Ask me anything so I can learn you some stuff” on it. Please.

#### Add a descriptive label to the button using the `aria-label` or `aria-labelledby` attribute.

The second bullet on the list, and we are being introduced to a lack of understanding and possible misinformation bias that “learning” from humans has brought upon this AI.

I say that because per the question asked, there was not enough information provided that this should have been mentioned without additional context. For a developer new to accessibility, this might seem legit. If you look these attributes up, you can verify they are used to provide elements an accessible name. If you look across the web, you can see ARIA sprinkled all over the place.

So what’s wrong?

In reality, `aria-label` or `aria-labelledby` are only necessary if a button does not have a visible label (for instance, a button with a graphic as its unique identifier), or its visible label is not descriptive enough.

For instance, if I were to implement a button that was used to edit a blog post, it could be written as such:

```
<button>Edit</button>
```

Brutalist in its simplicity. No need for ARIA at all. But, maybe I wanted to give it more context so that someone using a screen reader, and navigating specifically by buttons found on the web page, could more immediately understand _what_ a specific button would edit, without needing to investigate other nearby content on the web page.

To provide that sort of context, I might do something like:

```
<button aria-label="Edit [whatever this is about]">Edit</button>
```

or

```
<p id=foo>[whatever this is about]</p>
<button id=self aria-labelledby="self foo">Edit</button>
```

And that’s just if I wanted to use one of these attributes. There are other ways to do this, but, that’s a whole other topic that AI can scrape from the Internet another day.

Still though, what’s the harm in adding ARIA when you don’t need ARIA? That too depends on context.

For instance, maybe this button needs to be used on a web page where there is a widget to translate the page to another language. A common implementation gap I’ve seen time and time again is that the visible text of controls like this get updated with the translated string, but the `aria-label` doesn’t get updated. Oops.

But beyond buttons, there are certain HTML elements where if you needlessly provide them an `aria-label`, it can prevent a screen reader from accessing the nested content of that particular element. That’s not necessarily even a bug with ARIA, but rather the browser and screen reader assuming you know what you’re doing.

If you give an element, like a hyperlink, an `aria-label`, then you’re telling the screen reader that any content nested inside that link is of no interest. Is that always true? hmm…

```
<a href="..." aria-label="concise title" ...>
  <h#>Actual title</h#>
  <p>Some more context that is visible, but LOL that aria-label</p>
  <p>Some other stuff, cause why not. I'm a card or whatever. I do what I want.</p>
</a>
```

An awful lot of other content in there that is being overwritten by that concise title…

#### Ensure keyboard accessibility by giving the button a tab index and using JavaScript to listen for keyboard events (such as “Enter” or “Spacebar”) to trigger the button’s action.

More information that on its surface seems accurate, but is woefully unnecessary per the original guidance to use a `<button>` element. A `<button>` element is keyboard accessible by default. Giving it a “tab index” (rather, a `tabindex=0`) is useless advice at this point.

Additionally, while JavaScript will be necessary to setup an event listener for the button, a `<button>` element already listens for the Enter and Space keys with the `click` event listener. So you definitely don’t want to take this instruction at face value. Otherwise, one could write the necessary JavaScript for a click, and key press events. And then, as one is likely to do, they’d not actually test to see how it works, because using a keyboard is hard. So then you’d get something like this:

See the Pen [Untitled](https://codepen.io/scottohara/pen/eYjLddr) by Scott ([@scottohara](https://codepen.io/scottohara)) on [CodePen](https://codepen.io/).

#### Use CSS to provide visual feedback for the button’s state (e.g. hover, active, focus).

Ok, no real problem with this one. It could have mentioned that one gets some of these states from the browser’s default styles - but let’s be serious, those are going to be overwriten by the design requirements. As far as a quick checkpoint on the list, it is so far the best advice after the simplistic “use the `<button>` element”.

#### Test the button with assistive technologies such as screen readers to ensure it is usable and understandable.

On its surface, seems like this could be appropriate, until you remember that the question demonstrates a potential lack of knowledge regarding web accessibility. I’d be very hesitant to introduce someone to the concept of flying a kite, and then following it up by letting them jump into the cockpit of an airplane.

#### If using an icon-only button, add a descriptive text alternative using `aria-hidden` and `aria-labelledby` attributes.

This is a nice add, alluding to the nuance of what to do for buttons that are solely represented by graphics. However, it quickly follows up this initial bit of nuance by its hand wavy use of ARIA, before the guidance abruptly ends. Use `aria-hidden` and `aria-labelledby` on what now? I suppose we can ask ChatGPT what these attributes do…

##### what is aria-hidden for?

> `aria-hidden` is an ARIA attribute that indicates to screen readers if an element should be considered hidden or not. The value “true” means the element is hidden and should not be announced by screen readers, while “false” means the element should be announced by screen readers. This attribute is used to improve accessibility for visually impaired users.

Clearly, ChatGPT is not faimilar with the various instances of flagrant misuse of this attribute. Otherwise, it would have known to stop short of saying “This attribute is used to improve accessibility for visually impaired users.”

Other than nits to the explanation aside, nothing too bad here. Moving on…

#### Consider additional accessibility best practices, such as making the button large enough to be easily tap-able on touch screens, and ensuring sufficient contrast between the button text and background color.

And, we end on a positive note. No real detail, but nothing inaccurate here either. I actually don’t have any problem with this bit.

## That was an “easy” question

I had thought about writing about some of the responses ChatGPT was giving me for questions like: “how do I write an accessible hamburger menu, with react?” or “how do I make an accessible dialog?” - which then had to be clarified to “how do I make an accessible _MODAL_ dialog”. Or, providing it the HTML of a small web page with known accessibility issues, and asking it to find the errors an automated checker should be able to find. All these questions/asks returned results with a mixture of truthful information, a bunch of other misinformation, and often a lot of missing important information.

However, I don’t see the point in digging into those more detailed asks. This is a really cool technology and it’s doing a lot in its relative infancy. I do expect this, and other AI-driven projects like it, to only get smarter, more nuanced, and produce better results in the future. But, it is going to need some corrective training to help it unlearn all the junk it has picked up so far. I mean, it’s learning from what _we’ve written on the Internet_. We can’t get upset, and we should KNOW to expect such information gaps and lack of understanding, since its just recycling what we have collectively fed it. It’d be foolish to think it knows better than what it has learned _from us_.

Maybe someday, after a lot of training, we can reasonably rely on AI-driven services like this to provide detailed, meaningful and nuanced answers to our accessibility questions. But, when the day comes that it responds to questions like the one I asked with: “You’re going to need to provide a lot more context than that if you want me to give you any sort of meaningful answer that isn’t a bunch of eneral information and platitudes”, well. That’s the day I can get back to my real job of sending emails and drinking coffee.