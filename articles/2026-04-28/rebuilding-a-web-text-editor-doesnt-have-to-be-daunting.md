---
title: "Rebuilding a web text editor doesn't have to be daunting"
source: "https://bit.ly/side-mag3"
publishedDate: "2026-04-27"
category: "design"
feedName: "Sidebar"
---

_This text was written by Readymag chief technology officer Ilya Medvedev and originally published on the_ [_Readymag blog_](https://dev.to/readymag/rebuilding-a-web-text-editor-3g2o?ref=blog.readymag.com) _on DEV Community._

Back in 2020, I was working on building a text editor at Readymag, an online design tool that helps people create websites without coding. It was a complex but rewarding journey that resulted in a tool that met all our requirements at the time. While we were pleased with many of the architectural choices, software engineering teaches us that there’s always room for improvement.

As we at Readymag began planning to build our next text editor, revisiting those earlier decisions—both the successful and the limiting ones—became essential. This post is about what we found and how it’s shaping what comes next.

## **Bottlenecks of the previous solution**

Readymag is a design tool for creating websites—we like to say it's like a website builder, but better, because it has no layout restrictions. It's widely used by designers for projects where visual impact matters most: both for the result, and the experience. Think portfolios, landing pages, presentations, and marketing campaigns where pixel-perfect design control is essential.

I've been working at Readymag for seven years, and since publishing my previous article, I've moved from lead engineer to chief technology officer. This shift gave me a wider perspective, the possibility, or even responsibility, to improve product functionality and approaches.

Our old text editor was part of the legacy codebase, present almost since Readymag’s launch in 2013. Over time, changes became increasingly difficult to implement, and introducing new features—such as support for [variable fonts](https://blog.readymag.com/in-depth-typography-with-readymag-619795853140/)—was simply out of reach.

![Readymag blog_The first text widget in Readymag (2013)](https://storage.ghost.io/c/1f/41/1f41087a-8641-463c-b659-5db65bc9e833/content/images/2026/02/image--3-.png)

[The first text widget in Readymag (2013)](https://readymag.com/readymag/newsletter/39/?ref=blog.readymag.com)

That was the reason we decided to build a new text widget. You all know that working with text on the web is a thankless job—browsers handle text differently, users expect native behavior in web environments, and seemingly simple features like "delete a word" become complex when you consider international character sets or emoji sequences.

Therefore, we wanted to choose a low-level framework that would solve most of the issues related to text input. We settled on Draft.js, which was quite popular at the time (2020). All we had to do was integrate it into our current system, attach it to the data storage, and implement the ability to edit styles with our constructor—done.

But what was wrong with that idea?

### 1\. Lack of control

At Readymag, we develop our own design tool. We have our own data structures, many in-house developments, and we need maximum control over the browser and low-level interactions. At the same time, Draft.js has had a bug since 2017: it incorrectly handles emoji sequences. Some emoji can be longer than 1 character; for example, 👨🏼‍🎨 — has a length of 7, not 1 as it appears on screen. Draft.js incorrectly processes such sequences, which can lead to errors when inserting or deleting text.

![Readymag blog_A simple example of a rich text editor built in Draft.js](https://storage.ghost.io/c/1f/41/1f41087a-8641-463c-b659-5db65bc9e833/content/images/2026/02/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_lx18mmrfik6bvkv70xx9.webp)

Here’s where it gets interesting. We can create an issue, make our own fix and send a pull request (after all, this is the open source world, and we need to contribute), we can make a monkey patch, etc. But all these options slow down processes and complicate control over functionality. And text is the most popular widget in Readymag—this isn’t something we can neglect.

### 2\. Lack of confidence

Draft.js received its last commit a couple of weeks before my previous article. Today, it’s a public archive. You can't blame anyone here—again, this is an open source world, it's normal. But this means that in addition to vendor lock, we got an uncertain future for our text widget.

This uncertainty becomes particularly painful when you're building a commercial product. Your roadmap depends on features that may never come, security updates that may never arrive, and browser compatibility fixes that someone else needs to prioritize. Meanwhile, web standards continue evolving—new APIs emerge, browser behaviors change, and user expectations grow. When your foundation stops moving forward, you're essentially betting your product's future on code that's frozen in time. The technical debt accumulates not just from what you build on top, but from the growing gap between what your dependency supports and what the modern web offers.

### 3\. Third-party libraries

There are many pros and cons to both approaches. The common assumption is: “Isn’t it faster and easier to just take a library and plug it in?” In reality, that’s not always the case—it depends entirely on your situation. For us, it made far more sense to develop our own engine rather than reuse someone else’s, because this is a critical part of the product.

If you look at the time spent on integration and the extra code added to the codebase beyond simply installing a third-party package, the numbers can be surprising—months or even years of work, and thousands of additional lines of code.

### 4\. Principle of least astonishment

And last but not least, an important thing—principle of least astonishment. We want working with text in Readymag to be as similar as possible to working with text both in browsers and in native applications. The user shouldn’t be surprised by some non-standard solutions—this is very important and fair to the user.

After several years of development and experience, we began rethinking the product, and the text editor was no exception. What follows is our current approach to building a new text editor from the ground up—work that's actively in progress while I’m writing this article.

## **Principles of text editing on the web**

They say text editing is complex. Yes, but to actually assess the complexity, you need to understand in detail what it is.

What are the ways to input text? From obvious things:

-   Input.
-   Textarea.
-   contenteditable.
-   document.designMode.

You can read more in my previous article about [text editor development](https://www.smashingmagazine.com/2022/02/develop-text-editor-web/?ref=blog.readymag.com). Here we'll focus more on _contenteditable_. This is an attribute that turns almost any HTML element into an editable one.

If you look closely at what happens when you enable this attribute, you’ll see it delivers almost everything you’d expect from a custom-built text editor: caret handling, text selection, keyboard shortcuts, and basic formatting—all out of the box.

But when it comes to product development, you should start thinking about states, proprietary data types, and more. At this point, many developers decide to switch course and look for a third-party solution—and in many cases, that’s the right choice. However, for products where text editing is a core feature—design tools, content management systems, collaborative editors—having full control over the text manipulation pipeline is crucial. When users expect pixel-perfect typography, complex formatting, or real-time collaboration, you need the flexibility to implement exactly what your product vision requires, not just what a library allows.

So, how do you take _contenteditable_ and connect it to your own data type? For that, you need to intercept input.

## **How text input works**

Here's what the text input lifecycle looks like:

1.  _focusin_ — element receives focus.
2.  _selectionchange_ — cursor is set to position.
3.  _keydown_ — physical key press.
4.  _beforeinput_ — content change is prepared.
5.  DOM changes — character is added to content.
6.  _input_ — content has already changed.
7.  _keyup_ — physical key release.

Note that the input event isn’t _cancelable_ since the action has already been performed, but the _beforeinput_ event is _cancelable_.

If you decide which event you should intercept, the easiest way is to start listening to keydown and try to determine what the user will enter.

```
element.addEventListener("keydown", (e) => {
  console.log(e.key);
});
```

From there, you can start collecting the entered data in your own state and sending it to the persistent layer—half the job done.

Or is it? Think about how many keyboard shortcuts you use for text input in daily life. Hopefully a lot—and if not, I highly recommend it; they make working with both text and code much easier. In reality, things are a bit more complicated.

## **Types of text manipulations**

Let's break down text manipulations into several categories:

1.  Insert.
2.  Delete.
3.  Format.

Each category will be divided into impressively large subsets. For example, you can input text from the keyboard, text can be pasted from the clipboard, text can be replaced by the spelling module, you can delete text character by character, by words, by soft lines, and also backwards and forwards. Imagine how complex it is to create a relationship of all possible text manipulations with all shortcuts. And there are also different operating systems, browsers, different types of devices—development complexity grows exponentially.

Here you can pause and turn around—after all, you just looked at the _contenteditable_ block and everything worked there. How does the browser control all this?

## **InputEvent**

Let’s meet _InputEvent_, or to be more precise, its _inputType_ property. This event can be obtained using _beforeinput_/_input_ events. It occurs when the browser has determined what action the user is actually going to perform.

Here's just a small list of input types a user can make:

-   _insertText_ — insert typed plain text.
-   _insertParagraph_ — insert a paragraph break.
-   _insertFromDrop_ — insert content by means of drop.
-   _deleteWordBackward_ — delete a word directly before the caret position.
-   _deleteWordForward_ — delete a word directly after the caret position.
-   _deleteSoftLineBackward_ — delete from the caret to the nearest visual line break before the caret position.
-   _deleteSoftLineForward_ — delete from the caret to the nearest visual line break after the caret position.
-   _formatBold_ — initiate bold text.
-   _formatItalic_ — initiate italic text.
-   _formatUnderline_ — initiate underline text.
-   [See the full list here](https://w3c.github.io/input-events/?ref=blog.readymag.com#interface-InputEvent-Attributes).

The browser does all the work for you. It determines user intentions and categorizes actions—all you have to do is properly handle all these events.

## **Selection**

That brings you to another interesting browser object: _Selection_. This class stores knowledge about selected text on screen and is necessary for full control over _contenteditable_ blocks, since you'll understand what exactly the user has selected and what exactly you need to manipulate.

Using the following snippet, you can always have a fresh selection value at hand:

```
document.addEventListener("selectionchange", (e) => {
    // We recommend caching the selection value to ease the browser's work
    const selection = window.getSelection();
});
```

Selection comes in two types:

-   _collapsed._
-   _non-collapsed._

Many _inputType_ have different behavior depending on whether text is currently selected or the caret is simply in the middle of some element. For example, if you place the caret at the end of a word and press option + backspace (macOS, _deleteWordBackward_), you'll delete the entire word. But if you have several characters selected, only the selection will be deleted. This knowledge is already enough to build an almost-full-fledged editor.

## **Building the text editor**

For the sake of experimental simplicity, let's assume that all your data is stored in the DOM. We also assume that there can only be paragraphs inside, and inside paragraphs there can only be span elements—that is, there can be no other elements, such as text nodes, in the content.

Let's roughly represent this as:

```
type EditorState = {
    /**
    * This is our root `contenteditable` element
    * It can contain HTMLParagraphElement[],
    * that can in turn contain HTMLSpanElement[]
    */
 root: HTMLElement;
};
```

This scheme simplifies our life by allowing you to simplify knowledge about text selections. You just need to know which node is selected at the moment and which text segment is selected within this node. For example:

```
type SelectedNode = {
    node: HTMLSpanElement;
    startOffset: number;
    endOffset: number;
};
```

Then you need to get selected nodes:

```
function getSelectedNodes(): SelectedNode[] {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) {
    return [];
  }

  const range = selection.getRangeAt(0);

  // No selection — return node from caret position
  if (selection.isCollapsed || selection.anchorNode === selection.focusNode) {
    return [
      {
        // NOTE: anchorNode could be text node, in that case you should find closest span
        node: selection.anchorNode,
        startOffset: range.startOffset,
        endOffset: range.endOffset,
      },
    ];
  }

  // Handle selection using common ancestor
  const commonAncestor = range.commonAncestorContainer;
  if (!commonAncestor) {
    return [];
  }

  // Getting all commonAncestor's children
  const nodes = Array.from(commonAncestor.querySelectorAll("span"));
  const selectedNodes: SelectedNode[] = [];
  const spans = nodes.filter(node => range.intersectsNode(node) && node instanceof HTMLSpanElement);
  for (let i = 0; i < spans.length; i++) {
    const node = spans[i];
    const isFirst = i === 0;
    const isLast = i === spans.length - 1;

    // All nodes that are not first or last are considered fully selected spans
    selectedNodes.push({
      node,
      startOffset: isFirst ? range.startOffset : 0,
      endOffset: isLast ? range.endOffset : node.textContent?.length || 0,
    });
  }

  return selectedNodes;
```

After that, you can connect this method to the _selectionchange_ event and you’ll always have data about selected nodes and offsets of selected text within these nodes at hand.

Next, you subscribe to the _beforeinput_ event, get the selection, and depending on the input type, perform one action or another. For example:

```
element.addEventListener("beforeinput", (e) => {
  // This is important to cancel original event, because we should control everything ourselves
  e.preventDefault();

  const selectedNodes = getSelectedNodes();

  switch (e.inputType) {
    case "insertText":
      return this.onInsertText(e, selectedNodes);
    case "insertLineBreak":
      return this.onInsertLineBreak(e, selectedNodes);
    case "insertParagraph":
      return this.onInsertParagraph(e, selectedNodes);
    case "deleteContentBackward":
      return this.onDeleteContentBackward(e, selectedNodes);
    case "deleteContentForward":
      return this.onDeleteContentForward(e, selectedNodes);
    case "deleteWordBackward":
      return this.onDeleteWordBackward(e, selectedNodes);
    case "deleteWordForward":
      return this.onDeleteWordForward(e, selectedNodes);
    // ...
  }
});
```

## **Rabbit holes**

The knowledge from previous sections is enough to implement the foundation of a text editor. But as always when developing complex things, you can't do without rabbit holes. So let's dive in head first.

## Composition input

The DOM CompositionEvent represents events that occur due to the user indirectly entering text, for example through an input method editor (IME).

For example:

-   **Japanese**: When typing "konnichiwa" (こんにちは), the user types k-o-n-n-i-c-h-i-w-a on a QWERTY keyboard. The IME shows conversion candidates like こんにちは, 今日は, etc. Only when the user selects the final option (usually by pressing Enter or Space) should the actual text be committed to the editor.
-   **Chinese (Pinyin)**: Typing "nihao" shows candidates like 你好, 尼好, 泥好. The user navigates through options before committing.
-   **Accented characters**: On macOS, holding e shows options like é, è, ê, ë. The character isn't final until the user makes a selection.

During composition input, _beforeinput_/_input_ events receive all keystrokes, but the final result will only be when the user completes the composition input (for example, by pressing enter). For proper text handling, you need to control such input. For this, there are _compositionstart_ and _compositionend_ events.

All you need to do is stop the beforeinput listener during composition input:

```
let isComposing = false;

element.addEventListener("beforeinput", () => {
  if (isComposing) {
    return;
  }
});

element.addEventListener("compositionstart", () => {
  isComposing = true;
});

element.addEventListener("compositionend", (e) => {
  isComposing = false;
  // e.data — entered text
});
```

### Text deletion

"What could be complicated here?" you might ask. I would suggest diving into the wonderful world of characters, words, and lines.

At the beginning of the article I mentioned the bug in Draft.js and deleting emoji sequences. Well, in the Unicode specification you can learn that many emoji have non-standard length, for example _'🏳️‍🌈'.length === 6_, not 1. If you delete one character at a time from the string, you’re likely to break the emoji. But you don't want to allow this.

There are two ways you can overcome this. The first way is to use grapheme—the smallest functional unit of a writing system.

Today you can use _Intl.Segmenter_ to determine graphemes and delete them directly from text. For example:

```
function onDeleteContentBackward(e: InputEvent, selectedNodes: SelectedNode[]) {
  const [currentNode, ...restNodes] = selectedNodes;
  if (restNodes.length > 0) {
    throw new Error(
      "TODO: we are not handling multi-span selection in this example"
    );
  }

  // Use Intl.Segmenter for proper grapheme cluster detection
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  // Get segments from the string
  const segments = [...segmenter.segment(currentNode.node.textContent || "")];
  // ... return the position of the required segment and delete
}
```

But do you need to reinvent the wheel when everything is already implemented in the browser? If you look at native _contenteditable_, everything will work perfectly there.

To replicate browser behavior by reusing its methods, you can return to _Selection_ again. _Selection.modify_ gives you the ability to move the selection where you need it.

With it, you can select words, characters, and more—the rest is a matter of technique:

```
function getGranularSelection(
  direction: "backward" | "forward",
  granularity: "word" | "character" | "lineboundary"
): SelectedNode[] {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount || !selection.isCollapsed) {
    return [];
  }

  // Cache selection
  const restoreSelection = cacheSelection();

  // Modify selection using selected granularity
  selection.modify("extend", direction, granularity);
  const nodes = this.getSelectedNodes();

  // Restore cached selection
  restoreSelection();

  return nodes;
}

getGranularSelection("backward", "character");
```

This method is also useful when deleting words. For example, a word can consist of several spans. _Selection.modify_ will handle this too:

```
getGranularSelection("backward", "character");
// or direct 
// selection.modify("extend", direction, "word");
```

But besides deleting characters and words, you also have the ability to delete an entire visible line. This happens, for example, when pressing command + backspace (macOS, _deleteSoftLineBackward_). In this case, you don't just delete all content from the beginning of the paragraph to the current caret position, but you delete text to the nearest boundary—that is, you operate on visible areas.

You could, of course, use the old trick—get the element width, calculate text width using measurements of the letter M (the widest English letter) in the selected font—but this construction is very inaccurate, complex, fragile, and will break if you allow different fonts and text sizes within one paragraph.

_Selection.modify_ comes to the rescue again.

```
getGranularSelection("backward", "lineboundary");
// or direct 
// selection.modify("extend", direction, "lineboundary");
```

You can easily delegate this task to the browser, and additionally, you reduce the amount of code that needs to be maintained and whose performance needs to be optimized.

### Highlighting

Now take this case: you’ve entered text, and there's a settings panel with various inputs—font size, letter spacing, line height... What happens if you focus on such an input? You lose text selection.

![Readymag blog_Several selections on the screen](https://storage.ghost.io/c/1f/41/1f41087a-8641-463c-b659-5db65bc9e833/content/images/2026/02/image--4-.png)

Several selections on the screen

There can be several selections on the screen. This is critical because, first, our code doesn't know which text needs to be changed now, and second, users lose visibility.

In the [previous article](https://www.smashingmagazine.com/2022/02/develop-text-editor-web/?ref=blog.readymag.com#text-selection-and-focus), I mentioned two ways to fix this:

-   cache the caret and restore its position after each action in the input.
-   wrap the text editor in an _iframe_ (which is what we ultimately did at Readymag).

This time I'll tell you about the CSS Custom Highlight API. This is an API that allows you to programmatically make as many selections on screen as you want. All you have to do is connect your knowledge about selected text:

```
const range = new Range();
const highlight = new Highlight(range);

const selectedNodes = getSelectedNodes();
const start = selectedNodes[0];
const end = selectedNodes[selectedNodes.length - 1];

range.setStart(start.node, start.startOffset);
range.setEnd(end.node, end.endOffset);

// Register the highlight
CSS.highlights.set("text-selection", highlight);
```

Voilà! Now users always see which part of the text is being edited.

## **The best solutions, not the obvious ones**

Product improvements—especially for web apps—are an ongoing process. As the web platform evolves and user expectations grow, you’ll revisit our decisions again and again. But right now, building a web text editor doesn’t have to be as daunting as it first appears. By combining the browser’s built-in capabilities with modern APIs, you can create powerful, native-feeling editors without the complexity or constraints of third-party libraries.

Sometimes it’s worth taking the scenic route to build something that truly fits your needs.

* * *

Readymag is always looking for developers to join the team. You can find a list of open positions [here](https://readymag.com/readymag/we-are-hiring/?ref=blog.readymag.com).