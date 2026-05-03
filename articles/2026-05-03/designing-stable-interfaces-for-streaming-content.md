---
title: "Designing Stable Interfaces For Streaming Content"
source: "https://smashingmagazine.com/2026/05/designing-stable-interfaces-streaming-content/"
publishedDate: "2026-05-01"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Joas Pambou)"
---

-   19 min read
-   [UI](https://smashingmagazine.com/category/ui), [Coding](https://smashingmagazine.com/category/coding), [UX](https://smashingmagazine.com/category/ux)

Streaming UIs are an easy concept on the surface, but are quite complicated in practice. There are many considerations that need to be accounted for, from layout shifts and motion preferences to proper markup and various states, that may not be instantly obvious. What happens if the stream is interrupted? Can users tab through the UI on the keyboard as it shifts? What ARIA attributes might be needed? Those are the sorts of things we will tackle in this article.

More interfaces now render while the response is still being generated. The UI begins in one state, then updates as more data comes in. You see this in chat apps, logs, transcription tools, and other real-time systems.

The tricky part is that the **interface is not in a fixed state**; it keeps changing as new content comes in. It grows where lines become longer and new blocks appear. Something that was just below the screen can suddenly move, and the user’s scroll position becomes harder to manage. Parts of the UI might even be incomplete while the user is already interacting with it.

In this article, we’ll take a simple interface and make it handle this properly. We’ll look at how to keep things stable, manage scrolling, and render partial content without breaking the reading experience.

## What Does A Streaming UI Actually Look Like?

I’ve built three demos that stream content in different ways: a chat bubble, a log feed, and a transcription view. They look different on the surface, but they all run into the same three problems.

The first is **scroll**. When content is streaming in, most interfaces keep the viewport pinned to the bottom. That works if you are just watching, but the moment you scroll up to read something, the page snaps back down. You did not ask for that. The interface decided for you, and now you’re fighting it instead of reading.

The second is **layout shift**. Streaming content means containers are constantly growing, and as they do, everything below shifts downward. A button you were about to click is no longer where it was. A line you were reading has moved. The page is not broken; it is just that nothing stays still long enough to interact with comfortably.

The third is **render frequency**. Browsers paint the screen around 60 times per second, but streams can arrive much faster than that. This means the DOM, which is the browser’s internal representation of everything on the page, ends up being updated for frames the user will never actually see. Each update still costs something, and that cost adds up quietly until performance starts to slip.

As you go through each demo, pay attention to where things start feeling off. That small moment of friction when the interface starts getting in your way. This is exactly what we are here to fix.

## Example 1: Streaming AI Chat Responses

This is the most familiar case. You click **Stream**, and the message starts growing token by token, just like a typical AI chat interface.

[![Streaming AI Chat Responses](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/1-streaming-ai-chat-responses.png)](https://codesandbox.io/embed/swmjpl?view=preview)

Open in [CodeSandbox](https://codesandbox.io/embed/swmjpl?view=preview). ([Large preview](https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/1-streaming-ai-chat-responses.png))

Here’s what I want you to try:

-   Click the **Stream** button.
-   Try scrolling upwards while the message is streaming.
-   Increase the speed (to something like 10ms).

You will notice something subtle but important: the UI keeps trying to pull you back down. Basically, it is making a decision for you about where your attention should be.

That’s one example. Let’s look at another.

## Example 2: Live Processing In A Log Viewer

This example looks different on the surface, but the problem is actually very similar to the first example. Rather than a message that gets longer over time, new lines are appended continuously, like a terminal or a log stream.

The interesting part here is the tail toggle. It makes the trade-off between interaction and stable interfaces very clear:

[![Live Processing In A Log Viewer](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/2-live-processing-log-viewer.png)](https://codesandbox.io/embed/cytscf?view=preview)

Open in [CodeSandbox](https://codesandbox.io/embed/cytscf?view=preview). ([Large preview](https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/2-live-processing-log-viewer.png))

Again, here is what I want you to try:

-   Click the **Start** button.
-   Allow the logs to stream past the container’s height.
-   Scroll up to the beginning.
-   Stop the stream and disable the “tail” option.

Notice that, when tail is enabled, the UI follows the new content. But you’re unable to scroll up and stay in place. Instead, you need to stop the stream or enable “tail” to explore the content.

## Example 3: Dashboard Displaying Real-Time Metrics

In this case, the UI updates in place:

-   Numbers change,
-   Charts shift,
-   Values refresh continuously.

[![Dashboard Displaying Real-Time Metrics](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/3-dashboard-display-real-time-metrics.png)](https://codesandbox.io/embed/8rtsrm?view=preview)

Open in [CodeSandbox](https://codesandbox.io/embed/8rtsrm?view=preview). ([Large preview](https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/3-dashboard-display-real-time-metrics.png))

There is no scroll tension this time, but a different issue shows up. That’s what we’ll get into next.

## Why The UI Feels Unstable And How To Fix It

If you tried the chat demo and scrolled upward while the responses were coming in, you may have spotted the first issue right away: the UI keeps pulling you back down to the latest streamed content as it updates. This takes you out of context and never allows you the time to fully digest the content once it has passed.

We see that exact same issue in the second example, the log viewer. Without the tail toggle, the streamed content overrides your scroll position.

These aren’t bugs in the traditional sense that they produce code errors; rather, they are accessibility issues that affect _all_ users. That said, they can be fixed and prevented with careful UX considerations as you plan and test your work.

### Ensure Predictable Scroll Behavior

This is the goal:

-   Enable auto-scrolling when detecting that the user is at the bottom of the stream.
-   Stop auto-scrolling when the user has scrolled upwards.
-   Resume auto-scrolling if the user scrolls back to the bottom of the stream.

To do that, we need to know whether the user has intentionally moved away from the bottom, which we can assume is true when the scroll position is manually changed. We can track that behavior with a flag.

```
let userScrolled = false;

chatEl.addEventListener('scroll', () => {
  const gap = chatEl.scrollHeight
            - chatEl.scrollTop
            - chatEl.clientHeight;

  userScrolled = gap > 60;
});
```

That `60px` threshold matters. Without it, tiny layout changes (like a new line) would briefly create a gap and break auto-scroll, even if the user didn’t actually scroll.

Now let’s make sure that we enable auto-scrolling only when the user’s scroll position is equal to the stream’s scroll height, i.e., the user is at the bottom of the stream:

```
function autoScroll() {
  if (!userScrolled) {
    chatEl.scrollTop = chatEl.scrollHeight;
  }
}
```

One small thing that’s easy to miss: we need to reset `userScrolled` once a new stream begins. Otherwise, one scroll from a previous message can silently disable auto-scroll for the next one.

### Solidify Layout Stability

We saw this in the first example as well. As new content streams in, the layout jumps, or shifts, taking you out of your current context. To be specific about what’s shifting: it’s not the page layout in a broad sense, it’s the content directly below the chat bubble.

There’s also a subtler artifact worth calling out before we look at the code: cursor flicker. Because we’re wiping `innerHTML` and recreating every element on every tick, the cursor is being destroyed and re-added constantly, up to 80 times per second at fast speeds.

At normal speed, it’s easy to miss, but slow the slider down to around 30ms, and you’ll see a faint but persistent flicker at the end of the text. Once we fix the rebuild pattern, the flicker disappears entirely.

That rebuild pattern is right here; this is what runs on every single incoming character:

```
bubble.innerHTML = '';

fullText.split('\n').forEach(line => {
  const p = document.createElement('p');
  p.textContent = line || '\u00A0';
  bubble.appendChild(p);
});

bubble.appendChild(cursorEl);
```

This works, but it’s expensive. Every update wipes the DOM and rebuilds it, forcing layout recalculation each time.

Now we write directly into a live node:

```
let currentP = null;

function initBubble(bubble, cursor) {
  currentP = document.createElement('p');
  currentP.appendChild(document.createTextNode(''));
  bubble.insertBefore(currentP, cursor);
}
```

What we can do next is to create one paragraph with an empty text node and insert it before the cursor. That gives us a live node we can write into directly.

Then, for each character that arrives:

```
function appendChar(char, bubble, cursor) {
  if (char === '\n') {
    currentP = document.createElement('p');
    currentP.appendChild(document.createTextNode(''));
    bubble.insertBefore(currentP, cursor);
  } else {
    currentP.firstChild.textContent += char;
  }
}
```

For a regular character, we extend the text node by one character. The browser doesn’t need to recalculate the layout for that; the text grew, but nothing moved. For a newline, we create a fresh paragraph and move `currentP` forward. Layout recalculates once for that new paragraph, and that’s it.

### Render Frequency

This one is most visible in the first example, the chat UI. Even with scrolling and a layout fixed, we’re still writing to the DOM on every single incoming character.

When the stream is moving fast, you end up hammering the DOM with updates that don’t actually matter. The fix is straightforward: hold the incoming text in a buffer instead of writing it out immediately. Once you’ve collected enough, write it all to the DOM in one go; that’s what a **flush** is.

To pull this off, we keep a simple buffer and make sure we only schedule a single update at a time. When it fires, `requestAnimationFrame` takes everything that has built up and writes it to the DOM in one shot.

```
let pending   = '';
let rafQueued = false;
```

When a new character streams in, we then add it to the buffer. If no flush is scheduled yet, we queue one:

```
function onChar(char) {
  pending += char;

  if (!rafQueued) {
    rafQueued = true;
    requestAnimationFrame(flush);
  }
}
```

The `rafQueued` flag is important. Without it, every character would schedule its own frame, and you’d end up with dozens of unnecessary flushes.

When the flush fires, it drains the entire buffer in one pass:

```
function flush() {
  for (const char of pending) {
    appendChar(char);
  }
  pending   = '';
  rafQueued = false;
  autoScroll();
}
```

All the characters that arrive after the last frame are then rendered together, right before the browser paints them. Then we clear the buffer, reset the flag, and run auto-scroll once.

```
let userScrolled = false;

chatEl.addEventListener('scroll', () => {
  const gap = chatEl.scrollHeight
            - chatEl.scrollTop
            - chatEl.clientHeight;

  userScrolled = gap > 60;
});

function autoScroll() {
  if (!userScrolled) {
    chatEl.scrollTop = chatEl.scrollHeight;
  }
}
```

If the gap is small, we keep auto-scrolling. If it grows, we assume the user scrolled up, and we stop. That small threshold helps avoid jitter when new lines slightly change the height. Also, remember to reset `userScrolled` when a new stream starts.

Once scrolling is under control, another issue becomes obvious. As the message grows, it keeps shifting:

-   It starts as one line,
-   It expands, then
-   It pushes everything below it.

Nothing is technically broken, but it doesn’t feel stable. A common approach is to rebuild the whole message on every update:

```
bubble.innerHTML = '';

fullText.split('\n').forEach(line => {
  const p = document.createElement('p');
  p.textContent = line || '\u00A0';
  bubble.appendChild(p);
});

bubble.appendChild(cursorEl);
```

This works, but it is doing too much work. Every update destroys and rebuilds the DOM, forcing layout recalculation each time. That’s why everything keeps shifting. The idea is to write into the current paragraph and only create a new one when we actually hit a line break.

```
let currentP = null;

function initBubble(bubble, cursor) {
  currentP = document.createElement('p');
  currentP.appendChild(document.createTextNode(''));
  bubble.insertBefore(currentP, cursor);
}
```

And then update it character by character:

```
function appendChar(char, bubble, cursor) {
  if (char === '\n') {
    currentP = document.createElement('p');
    currentP.appendChild(document.createTextNode(''));
    bubble.insertBefore(currentP, cursor);
  } else {
    currentP.firstChild.textContent += char;
  }
}
```

Now we’re no longer rebuilding everything. Most updates just extend a text node, which is cheap and doesn’t trigger large layout shifts. It also fixes the small cursor flicker you might have noticed earlier, since we’re no longer removing and re-adding it.

At this point, the UI already feels better, but there is still something subtle going on. We are still updating the DOM on every character. At higher speeds, that becomes a lot of small updates, many of which you never actually see.

Instead of rendering immediately, we can buffer the incoming characters and apply them once per frame.

```
let pending = '';
let rafQueued = false;

function onChar(char) {
  pending += char;

  if (!rafQueued) {
    rafQueued = true;
    requestAnimationFrame(flush);
  }
}
```

At this point, we’re not touching the DOM yet, but only collecting characters as they arrive. Then, right before the next frame is painted, we flush everything at once:

```
function flush() {
  for (const char of pending) {
    appendChar(char);
  }

  pending = '';
  rafQueued = false;

  autoScroll();
}
```

These separate two things that were previously tied together:

1.  How fast data arrives, and
2.  When the UI updates.

The result looks the same, but the browser does less work, resulting in the UI feeling smoother, especially when the stream is set to a faster speed.

[![Broken vs. fixed](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/4-broken-vs-fixed.png)](https://codesandbox.io/embed/pk7tk5?view=preview)

Open in [CodeSandbox](https://codesandbox.io/embed/pk7tk5?view=preview). ([Large preview](https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/4-broken-vs-fixed.png))

None of these changes is a big effort on its own. But once they are in place, the interface stops reacting blindly to every update. It becomes easier to read, easier to control, and a lot less distracting, even though the content is still coming in continuously.

There are even more considerations to take into account for ensuring a stable, predictable, and good user experience. For example, what happens if the stream is canceled mid-flow? And what can we do to ensure that user preferences are respected for things like reduced motion, keyboard navigation, and screen reader accessibility? Let’s get into those next.

## Handling Interrupted Streams

Most streaming interfaces include a way to stop or cancel the stream. We saw that in the demos. But stopping often leaves the UI in an awkward state. The cursor might keep blinking, buttons don’t update, and the message just freezes mid-stream with no clear indication that it didn’t finish.

The problem is that the stop is usually wired to do one thing: cancel the timer. That’s not enough. You also need to (1) clear the pending buffer, (2) remove the cursor, (3) mark the response as incomplete, and (4) reset the buttons. Here’s how we accomplish those.

### 1\. Stop The Stream Cleanly

Here’s what `stopStream` needs to do, in order:

1.  Cancel the timer and flip the `isStreaming` flag so no more ticks run.
2.  Clear the `requestAnimationFrame` (RAF) buffer so nothing still queued gets written on the next frame.

```
function stopStream() {
  clearTimeout(streamTimer);
  isStreaming = false;
  pending     = '';
  rafQueued   = false;
}
```

Clearing the `pending` property matters because there might be characters buffered from the last stream instance that haven’t been flushed yet. If you don’t clear it, the next `requestAnimationFrame` fires, drains the buffer, and writes those characters to the DOM after the stream has officially stopped.

Now we move on to removing the cursor by calling `markStopped` on the bubble:

```
if (cursorEl && cursorEl.parentNode) cursorEl.remove();
  markStopped(aiBubble);

  stopBtn.style.display  = 'none';
  retryBtn.style.display = '';
  playBtn.style.display  = '';
  setStatus('Stopped', 'stopped');
  chat.removeEventListener('scroll', onScroll);
}
```

The `cursorEl.parentNode` check is there because `stopStream` is also called internally when a new message fires mid-stream, at which point the cursor might already be gone. Calling `remove()` on a detached node throws, so we check first.

`markStopped` appends a small label to the bottom of the bubble so the user knows the response didn’t finish:

```
function markStopped(bubble) {
  if (!bubble) return;
  bubble.classList.add('stopped');

  const label = document.createElement('span');
  label.className = 'stopped-label';
  label.textContent = 'response stopped';
  bubble.appendChild(label);
}
```

The null check on `bubble` handles the edge case where stop fires before the AI message element has been initialized, which can happen if the user clicks stop during the 300ms delay before the bubble appears.

### Provide A Retry Option

If the stream simply stops — perhaps due to a network issue or some other unexpected error — we ought to provide the user with a path to re-attempt the stream. What that basically means is preventing the UI from doing the expensive work needed to scroll back up to the top, re-read the prompt, and retype it. With a retry option, the user only needs to click a button, and the stream restarts from the current position.

To make that work, we need to hold onto the question when the stream starts:

```
let lastQuestion = '';

function startStream(question, answer) {
  lastQuestion = question;
  // rest of setup...
}
```

Then, when the retry attempt runs, we reset everything and start fresh:

```
function retryStream() {
  if (currentMsgEl && currentMsgEl.parentNode) {
    currentMsgEl.remove();
  }

  charIndex    = 0;
  userScrolled = false;
  pending      = '';
  rafQueued    = false;
  isStreaming  = true;

  retryBtn.style.display = 'none';
  stopBtn.style.display  = '';
  setStatus('Streaming...', 'streaming');

  chat.addEventListener('scroll', onScroll, { passive: true });

  setTimeout(() => {
    initAIMsg();
    tick(lastAnswer);
  }, 200);
}
```

The reset is critical. Every piece of state needs to go back to its initial value, just like a brand new stream.

**Note:** We remove the entire message row (`currentMsgEl`), not just the bubble. If only the bubble is removed, the layout wrapper and avatar remain persistent and break the structure.

### Send A New Message Mid-Stream

There’s one more edge case that’s easy to miss. If the user sends a new message while a stream is still running, you end up with two loops writing to the DOM at the same time. The result is messy, and characters from different responses get mixed together.

Here’s what to do: stop the current stream before starting a new one.

```
function startStream(question, answer) {
  if (isStreaming) {
    clearTimeout(streamTimer);
    isStreaming = false;
    pending     = '';
    rafQueued   = false;
    if (cursorEl && cursorEl.parentNode) cursorEl.remove();
    chat.removeEventListener('scroll', onScroll);
  }

  // now reset and start fresh
  charIndex    = 0;
  userScrolled = false;
  isStreaming  = true;
  lastQuestion = question;
  // ...
}
```

Here, we inline the cleanup rather than calling `stopStream` directly because `stopStream` also calls `markStopped` and resets the buttons. The next demo has all three behaviors wired up. You can start a stream, hit “Stop” mid-stream, and the cursor disappears, the “response stopped” label appears, and a “Retry” buttons displayed.

[![Interruptible stream](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/5-interruptible-stream.png)](https://codesandbox.io/embed/9cfy92?view=preview)

Open in [CodeSandbox](https://codesandbox.io/embed/9cfy92?view=preview). ([Large preview](https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/5-interruptible-stream.png))

## Accessibility

Streaming interfaces are often built and tested with a mouse, so they may feel just fine in a browser, but break down in other situations that may not have been considered, like whether a screen reader announces new content at all. Or navigating with a keyboard might get stuck or lose focus as things update. And, of course, moving text can be uncomfortable — or even disabling — for [those with motion sensitivities](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/).

The good part is that you do not need to rebuild everything to accommodate these things; they can be fixed with solutions that sit on top of what is already there.

### Accommodating Assistive Technology With Live Regions

Screen readers don’t automatically announce content that shows up on its own. They usually read things when the user moves to them. So, in a streaming UI, where text builds up over time, nothing gets announced. The content is there, but the user doesn’t hear anything.

The fix is [`aria-live`](https://w3c.github.io/aria/#aria-live). It tells the browser to watch a container and announce updates as they happen, without the user needing to move focus.

```
<div
  id="chat"
  role="log"
  aria-live="polite"
  aria-atomic="false"
  aria-label="Chat messages"
></div>
```

-   `role="log"` tells assistive tech this is a stream of updates, like a running transcript. Some tools handle this automatically, but it’s safer to be explicit so behavior stays consistent.
-   `aria-atomic="false"` makes sure only the new content is announced. Without it, some screen readers try to read the whole message again on every update, which quickly becomes unusable.
-   `aria-live="polite"` queues updates instead of interrupting. Use `assertive` only for things that really need immediate attention, like errors.

### Handling Incomplete States

Earlier, we inserted a “Response Stopped” label to the message when the stream stops mid-stream. Visually, that’s enough. But for a screen reader, that change needs to be announced.

Since the message is inside a live region with `aria-live="polite"`, the label will be automatically announced as new content when it’s added to the DOM. The live region already handles the announcement, so no additional ARIA is needed on the label itself.

The **Retry** button that appears next also needs context. If a screen reader simply says “Retry, button,” it’s not clear what action that refers to. You can fix that by adding an `aria-label` that includes the original question:

```
retryBtn.setAttribute(
  'aria-label',
  `Retry: ${lastQuestion.slice(0, 60)}`
);
```

What you can do here is to set this label when the button appears, not on page load:

```
retryBtn.style.display = 'inline-block';
retryBtn.setAttribute(
  'aria-label',
  `Retry: ${lastQuestion.slice(0, 60)}`
);
```

We also call `retryBtn.focus()` after stopping. That way, keyboard users don’t have to `Tab` around with the keyboard to find the next action.

**Testing with assistive technology:** Don’t rely on assumptions about how screen readers announce this. Test with actual tools like NVDA (Windows), JAWS (Windows), or VoiceOver (Mac/iOS). Browser DevTools can show you what’s exposed in the accessibility tree, but they can’t tell you how the content _sounds_. A real screen reader will reveal whether the announcement is happening at the right time and in the right way.

### Account For Keyboard Navigation

The controls need to work with the keyboard while the UI is live, so the Stop button has to be reachable. For someone not using a mouse, Tab + Enter is the only way to cancel a running stream.

Using `display: none` is fine for hiding buttons; it removes them from the tab order. The problem is using things like `opacity: 0` or `visibility: hidden`. Those hide elements visually, but they can still receive focus, so users end up tabbing onto something they can’t see.

Use `:focus-visible` so the focus ring shows up for keyboard navigation, but not for mouse clicks:

```
btn:focus-visible {
  outline: 2px solid #1d9e75;
  outline-offset: 2px;
}
```

The cursor inside the message should have `aria-hidden="true"`. It’s just visual. Without that, some screen readers try to read it as text, which gets distracting.

### Motion Sensitivity

The typewriter effect we see in practically every AI interface produces constant motion. As we’ve already discussed, certain amounts of motion can be disabling. Thankfully, browsers expose `prefers-reduced-motion`, which detects a user’s motion preferences at the operating system level.

For streaming, the best approach is simple: skip the animation and render the full response at once. The content stays the same, only without the motion.

```
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

```
if (reducedMotion) {
  initAIMsg();
  for (const char of text) appendChar(char);
  if (cursorEl && cursorEl.parentNode) cursorEl.remove();
  done();
  return;
}
tick(text); // normal animation
```

In CSS, the cursor blink also needs to stop. Despite being a minor detail, a blinking cursor element counts as [flashing content](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html).

```
@media (prefers-reduced-motion: reduce) {
  .cursor { animation: none; opacity: 1; }
}
```

There we go! The demo below puts everything from this article together, so you can see how these patterns work in practice. It also includes a reduced motion toggle, so you can test the instant render version easily.

[![Accessible streaming](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/6-accessible-streaming.png)](https://codesandbox.io/embed/vd9mnk?view=preview)

Open in [CodeSandbox](https://codesandbox.io/embed/vd9mnk?view=preview). ([Large preview](https://files.smashing.media/articles/designing-stable-interfaces-streaming-content/6-accessible-streaming.png))

## Conclusion

Streaming itself is mostly solved. Getting data from the server to the client is not the hard part anymore. What breaks is the UI on top of it.

When content updates continuously, small things start to matter, like scroll behavior, layout stability, render timing, and how the interface responds to user actions. If those aren’t handled well, the UI feels unstable and hard to use.

The patterns in this article fix that by:

-   Keeping scroll position under the user’s control,
-   Updating only what has changed,
-   Batching renders per frame,
-   Handling stop and retry actions, and
-   Making the interface accessible.

You don’t need all of these every time. But when streaming is involved, these are the places things usually go wrong.

### Further Reading

-   [Using Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)  
    How to open a connection, handle events, and reconnect when needed. This is the transport layer, everything here builds on.
-   [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)  
    Streaming data directly from `fetch`. Useful when you need more control than SSE.
-   [Chrome DevTools Performance panel](https://developer.chrome.com/docs/devtools/performance)  
    Helps you see layout recalculations and paint costs, so you can verify performance improvements.
-   “[How Large DOM Sizes Affect Interactivity, And What You Can Do About It](https://web.dev/articles/dom-size-and-interactivity)”, Jeremy Wagner  
    Why large DOM trees slow things down, and how to keep them under control in long streaming sessions.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)