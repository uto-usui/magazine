---
title: "Having an AI dialog"
source: "https://scottohara.me/blog/2023/02/17/an-ai-dialog.html"
publishedDate: "2023-02-17"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

I’ve already talked about [Setting expectations for asking ChatGPT web accessibility questions](https://www.scottohara.me/blog/2023/01/31/ai-a11y-maybe-no.html). So you should probably go read that first.

But as a quick a reminder, ChatGPT’s responses are derived from interpreting the question it was asked, and crafting its response based on what it has ‘learned’ _from us_, via what we’ve published to the Internet. In regards to how accurate it’s responses are to accessibility related questions, they may be rather high level and “accurate”, but can also quickly veer into laughably (depressingly) incorrect territory. The accuracy of what you get back will also be contingent on how you ask your question. For example, if it’s too broad then you’ll likely get a broad response back. If it’s a very focused, but potentially leading, question then you could very well get a response back that is biased to your ask.

In my previous post, I had asked a very high level question on how to make an accessible button for my web page. For something that should be so simple, there was a lot of inaccurate (i.e., wrong or u) information returned.

So what do we get back if you ask about something more complex? Something that has a long history of developer pain points and accessibility quirks and gaps with custom implementations? Something that, for all its past troubles, has finally reached a point of being rather straight forward to implement **and** the browser takes care of the majority of its accessibility requirements for you?

If this is your first time coming to my blog, hi. I’m Scott. I’ve spent too much time working with and talking about the accessibility of web dialogs. However, today I don’t have anything specifically new about dialogs that I want to go over. Go read this if you want [my latest take on the `dialog` element](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html). Instead, I’m very curious to see what ChatGPT has to say about something that has such a long history of being inadequately implemented, in regards to accessibility, by web developers.

The purpose of this will be to demonstrate what ChatGPT gets right (because to be fair, it does get some stuff right), vs what it gets wrong. And boy howdy to that…

## What is a web dialog?

So I asked ChatGPT what a _web_ dialog is. Seems we should setup some level of a baseline.

I included the word ‘web’ because otherwise it would have given a high level response about what a conversation between two people is, as well as a brief mention of a dialog also being a GUI element for web and desktop applications.

> A web dialog, also known as a modal or a lightbox, is a user interface component that appears on top of the current webpage, typically as a pop-up window or box. These dialogs are designed to provide additional information, options or controls for the user, and can include text, images, forms, and other interactive elements. Web dialogs are often used to display login forms, subscription forms, confirmations, alerts, and other types of interactions, that are not part of the main content of the webpage. Examples of web dialogs include a pop-up window that appears when you try to leave a webpage, a subscription form that appears as a pop-up after clicking on a sign-up button.

So this is both an example of what ChatGPT can do well, as well as an example of “neat, I got a search result without any author attribution by typing into a chat interface”. Nothing inaccurate here. Also nothing anyone specifically needed ChatGPT for.

So let’s move onto something more specific to web accessibility.

### QUESTION: how can I create an accessible web dialog?

The following are **two different responses** that ChatGPT gave me to the same question during two different sessions.

#### First Answer

> There are a few best practices you should follow when creating an accessible web dialog:
> 
> 1.  Use clear and descriptive labels: Make sure that all buttons and controls within the dialog are labeled clearly and accurately. This will help users understand what they are interacting with and what actions they can take.
> 2.  Provide clear instructions: Provide clear instructions on how to interact with the dialog, such as how to close it or move between different options.
> 3.  Use ARIA roles: ARIA (Accessible Rich Internet Applications) roles can be used to provide additional information about the dialog to assistive technology, such as screen readers. You can use roles such as “dialog” and “alertdialog” to indicate that the content is a dialog and to let users know that they need to take action.
> 4.  Create a contrast of colors: Make sure that the contrast between the text and background colors is high enough for users with low vision to read the content.
> 5.  Use a “modal” dialog: A modal dialog is a dialog that requires the user’s attention before they can continue to interact with the rest of the website. It prevents users from interacting with the rest of the website while the dialog is open.
> 6.  Make the dialog keyboard-navigable: When creating a dialog, make sure that users can also interact with it using just their keyboard. This way, users who use assistive technology, such as screen readers, can still access the dialog and interact with its controls.
> 7.  Test for accessibility: After creating the dialog, test it using assistive technology to make sure that it is accessible for all users. By following these guidelines, you can create an accessible web dialog that can be used by all users, regardless of their abilities.

##### Breakdown of First Answer

1.  The initial item in the returned list of best practices is spot on. It’s high level, but my original ask was rather high level as well.
2.  The second point seems OK at first glance, but then when it tries to clarify about what sort of clear instructions are needed, it immediately gets into some odd advice. Can you think of a web dialog you’ve interacted with where there was text provided informing you that to close the dialog you can press the “close” button, or use the Esc key? Or how to move to the different interactive elements within the dialog? Hopefully most people would know to interpret this as it should have been stated “provide clear and consicse instructions on how to interact with the content of the dialog, as necessary”. One does not need instructions on how to perform basic tasks, unless this is some nightmare dialog from hell where up is down, left is red and close buttons within it shoot laser beams and hurl crackers at napping cats. If your dialog does those things, go ahead and provide instructions. Please.
3.  Regarding “use ARIA roles… ‘dialog’ and ‘alertdialog’…” nothing wrong with that on its surface, except for the fact that it doesn’t indicate when to use which role (probably a more clarifying question one could ask) - but it also fails to mention that you don’t need to use ARIA at all. Just [use the `dialog` element (reasonably)](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html).
4.  I chuckled a little bit at “create a contrast of colors”, but outside of the initial odd wording, it’s not wrong. It’s also advice that goes beyond specifically a dialog. But hey, doesn’t hurt to remind people to always be contrasting (their colors).
5.  Huh… using a modal dialog is only a best practice if you actually want a modal dialog though. Would someone know to ask for clarity on what this means and how it differs from ‘use ARIA roles… ‘dialog’ and ‘alertdialog’? I hope so.
6.  A mixing of information here. Being keyboard-navigable is important to people who have full vision, low vision, or who are blind. That aside, again this is a more global concept that is not unique to dialogs.
7.  As mentioned in my previous post, testing using assistive technology may be a big ask for someone who is unfamiliar with assistive technology, or who might be aware of it but has no idea how to actually use it.

> By following these guidelines, you can create an accessible web dialog that can be used by all users, regardless of their abilities.

But hey, if you follow these guidelines then you can rest assured that whether someone can whistle or not, they can use a dialog. Oh, wait. No, it probably means that a dialog can be used by people with disabilities. Yeah, that’ll all come down to the implementation. But before we get to how ChatGPT says to do that, let’s look at what it _also said_ when asked the same question during another session.

#### Second Answer

> There are several ways to make a web dialog accessible, which will provide a better user experience for everyone, including users with disabilities. Here are a few important things to keep in mind when designing an accessible web dialog:
> 
> 1.  Provide a descriptive title: The title of the dialog should be meaningful and accurately describe the purpose of the dialog.
> 2.  Make sure the dialog is keyboard accessible: Make sure that users can operate the dialog using just a keyboard and that there are no keyboard traps.
> 3.  Close the dialog with the Escape key: This is a commonly understood key for closing dialogs.
> 4.  Make sure the dialog is screen-reader friendly: Use proper ARIA roles, labels and attributes to make the dialog accessible to screen readers.
> 5.  Focus management: Ensure that the focus is moved to the dialog when it opens and is restored to the triggering element when the dialog closes.
> 6.  Provide a clear and visible dismissal button: A close button should be visible and easily located.
> 7.  Take care of accessibility in form controls: If the dialog contains any form controls, ensure they are labeled and can be filled in by assistive technologies.
> 8.  Creating an accessible web dialog takes a bit of extra effort, but it is worth it in the end. By doing so, you can make your website more user-friendly and accessible to people with disabilities.

I’m not going to break this response down, but I will acknowledge that outside of a few nits it is a far better response than the first. Kinda like it’s a different person on call for the help desk. I can buy that, not everyone who is an accessibility practitioner knows everything about accessibility. Some people know more about accessible UX concepts, some others about legal compliance, and while others may know about technical implementations. Any one of those people might give you a variation on a response, and include their own opinionated or even inaccurate information to boot as they try to smooth over gaps in what they know they should cover.

I mean, people _shouldn’t_ necessary do that - smooth over the gaps. But, when one has to take on the role of being the expert in a room full of people that don’t know a div from a button, there is a lot of pressure to know the answer. I wonder how much better off web accessibility would be if people instead said “huh, I don’t know. Let’s do some testing and find out!” - rather than “screen reader users will be confused and WCAG is going to steal your lunch and step on it if you don’t make that link into a button”.

OK, maybe that’s not an entirely accurate representation of what people say. WCAG is far more partial to breakfast items…

Anyway, high level guidance aside, people have expressed that they _want_ ChatGPT to give them recommendations for how to write accessible components. And some people have indicated that _they think_ ChatGPT can do just that. So…

### How do I build a c between two people GUI ARIA role lightbox thing, modal?

Asking ChatGPT how to code an ‘accessible dialog’, or ‘accessible web dialog’, will return variations on the same sort of answer each time you ask. The following show two wildly different responses, each with their own issues.

**Note:** I have left out the example JavaScript and CSS that was returned for each. Reviewing them wouldn’t yield any more important insights, and this is already getting too long.

##### First Answer to “show me the code for an accessible dialog”

> Here is an example of the code for an accessible dialog:

```
<div class="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">  
  <div class="modal-dialog" role="document">  
    <div class="modal-content">  
      <div class="modal-header">  
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>  
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
          <span aria-hidden="true">&times;</span>  
        </button>  
      </div>  
      <div class="modal-body">  
        ...  
      </div>  
      <div class="modal-footer">  
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>  
        <button type="button" class="btn btn-primary">Save changes</button>  
      </div>  
    </div>  
  </div>  
</div>  
```

> Here’s what’s happening in the code:

> -   The `<div>` with a class of “modal” acts as the overall container for the dialog. It is given a “tabindex” attribute of “-1” to ensure that it can be programmatically focused.
> -   The “role” attribute is set to “dialog” to indicate that it is a dialog, and “aria-labelledby” is used to associate the heading with the appropriate label.
> -   The “aria-hidden” attribute is set to “true” to indicate that the dialog is not visible by default.
> -   The “modal-dialog” and “modal-content” classed `<div>`s serve as a container for the content of the dialog, with “role” attribute set to “document”.
> -   The “modal-header” classed `<div>` contains the heading for the dialog, “Modal Title”, and a button that can be used to close the dialog. The “aria-label” attribute is used to indicate to assistive technology that the button is used to close the dialog.
> -   The “modal-body” classed `<div>` is where the content of the dialog goes.
> -   The “modal-footer” classed `<div>` contains buttons that allow the user to interact with the dialog, e.g. close it or save changes.
> -   It’s important to note that this is a basic example and different frameworks or libraries have different ways of creating dialogs. In any case, these are the fundamental guidelines to creating an accessible dialog. You can also check the framework’s documentation to get more information about accessibility and how to create accessible dialogs.

* * *

This is probably one of the better answers I’ve gotten from ChatGPT for the coding of an accessible component, but there are some missing bits here. Granted, the response does call out that it’s a basic example, and to check frameworks and libraries for more info… which is all well and good if someone is using a framework or component library. But since I was asking ChatGPT to show me the code for an accessible dialog, it could have served as a signal to the AI that maybe if I was already using a framework or library, I would have checked these resources already? Common sense as a hot fix maybe?

Regardless, while not horrible (we’ll get to that) it’s also missing important information. For instance,

-   Using `aria-hidden=true` is a red herring. A dialog when not shown will most often be hidden using CSS `display: none`, and if that’s the case then it’s already hidden to all users. `aria-hidden=true` is just extra ARIA for no real benefit, and really only introduces the possibility of this creating a bug (e.g., the dialog is visually rendered, but `aria-hidden=true` remains on the dialog).
-   While not a compliance issue, some people might get a bit ruffled about the fact that the `<h5>` element is used as the initial heading for this dialog. Using this particular heading makes me think that ChatGPT was [goinking this code example from Bootstrap](https://github.com/twbs/bootstrap/issues/37179). Note that there’s no ‘WCAG failure’ here, but generally people would expect a `<h1>` or `<h2>` as the initial dialog heading.
-   There’s no mention here about keeping keyboard focus restricted to the modal dialog when its open. Nor use of `aria-modal` in an attempt to restrict a screen reader’s navigation to just the modal dialog. Those are kinda important bits that were left off.
-   There’s no mention as to why the `role=document` is included in the markup (this is generally for legacy screen reader behavior, or even for more modern screen reader bugs… but it _shouldn’t_ be necessary outside of these mitigating reasons).

But that’s enough on this for now. Let’s look at the other response I got…

##### Second answer to “show me the code for an accessible web dialog”

> Sure, here’s an example of HTML, CSS, and JavaScript code that you can use to create an accessible web dialog:

```
<button id="open-dialog">Open Dialog</button>  
<div id="dialog" aria-hidden="true" aria-labelledby="dialog-title">  
  <div id="dialog-title">Sign in</div>  
  <form id="sign-in-form">  
    <label for="email">Email:</label>  
    <input type="email" id="email" name="email" required>  
    <label for="password">Password:</label>  
    <input type="password" id="password" name="password" required>  
    <button type="submit">Sign in</button>  
  </form>  
  <button id="close-dialog">Close</button>  
</div>  
```

> In this example, the dialog will open when a user clicks the “Open Dialog” button and close when either the “Close” button or the “Escape” key is pressed. The close button closes the dialog, and ARIA attributes set to “aria-hidden” are used for screen readers, which will not read elements with aria-hidden=”true”, Also focus management done on the dialog, and the submit event handled. This is just one possible way to create an accessible web dialog, and it can be modified.

* * *

So this response is rather awful. The worst I’ve come across, actually. The JS I excluded did set focus to the email field of the dialog as part of the click event for the open dialog button, and it did toggle `aria-hidden` from true to false, while adding/removing `display:none` and `block` - essentially making the use of `aria-hidden` absolutely pointless. But, yeh. There’s nothing about this that would otherwise make it an accessible modal dialog. It has no dialog role, it lacks an `aria-modal=true`. `aria-labelledby` on a generic `div` element is prohibited to web authors, so that’s wrong. And, it says nothing about the fact that the content outside of the dialog needs to be treated as inert.

> This is just one possible way to create an accessible web dialog, and it can be modified.

No, it is **not**. The only part about this that’s true is that “it can be modified”, and it should. Modified right into the trash.

### So, Scott, if you’re so picky what “should” the answer be?

It’d be swell if instead of providing half answers, or incorrect answers, AI could instead be trained to know which resources provide higher quality content. For instance, giving a brief answer and pointing people the the [ARIA Authoring Practices Guide for a modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), or even just pointing to the [HTML specification’s `<dialog>` element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element), or the [MDN document about `dialog`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).

But, those authoratative resources aside, the easiest and most robust code snippet to provide would be:

```
<button id=b>
  Open the dialog <!-- change this text as appropriate -->
</button>

<dialog aria-labelledby=h>
  <h2 id=h>my dialog's title</h2>
  <form method=dialog><button>Close</button></form>
  <!-- content and any other controls go here -->
</dialog>

<script>
  const b = document.getElementById('b');
  const d = document.querySelector('dialog');

  b.addEventListener('click', () => {
    d.showModal();
  });
</script>
```

Followed up by “And if you can’t use the native `dialog` element, then use something like [a11y-dialog](https://a11y-dialog.netlify.app/).”

Now why would these be the best answers? Well, as mentioned I’ve written quite abit about that myself. You can go read up on those posts if you want. Otherwise, we can try asking ChatGPT about the accessibility of HTML’s dialog element?

Hmm… just tried that… but I’m tired of picking these responses apart, so, yeh. Maybe just take my word for it, please?

## The end

I’m not going to poke at ChatGPT’s responses anymore. Because to be honest, these posts are meant as a warning **for _right now_**, as in early 2023. I do expect this to get a lot better, with time. A lot of people are interested in AI and are making some significant efforts to use it, _and_ to improve it. The people that have worked on this so far have done some pretty amazing things. I’m not that smart.

I just know a lot about web accessibility. Not everything. But a lot. ChatGPT only knows what it has learned from us. And collectively, right now, _we_ don’t know a lot. So let’s go learn us some stuff, and then we can learn AI some stuff, too.