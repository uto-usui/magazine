---
title: "Test IDs are an a11y smell"
source: "https://tkdodo.eu/blog/test-ids-are-an-a11y-smell"
publishedDate: "2026-03-23"
category: "frontend"
feedName: "TkDodo"
---

![Test IDs are an a11y smell](https://tkdodo.eu/.netlify/images?w=640&h=427&fit=cover&url=%2Fblog%2F_astro%2Fsmell.jVuCppJw.jpg)

Photo by [Steve Harvey](https://unsplash.com/@trommelkopf)

-   [#1: Designing Design Systems](https://tkdodo.eu/blog/designing-design-systems)
-   [#2: Tooltip Components Should Not Exist](https://tkdodo.eu/blog/tooltip-components-should-not-exist)
-   [#3: Building Type-Safe Compound Components](https://tkdodo.eu/blog/building-type-safe-compound-components)
-   #4: Test IDs are an a11y smellCurrentLatest

-   _No translations available._
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

I’ve come across a lot of articles lately claiming that using `data-testid` is the best way to define selectors in your tests. Apparently, they simplify element selection, ensure maintainability and stability and decouple your tests from UI changes.

I couldn’t disagree more.

I haven’t used a `data-testid` attribute in over a decade, so I’m surprised these takes are still around. I used to think that it comes from a time when our only alternatives were either using hardcoded ids, or classNames, or xpath selectors. If that are your only options (e.g. because you test with something like [selenium (opens in a new window)](https://www.selenium.dev/)), then `data-testid` might look promising because everything else is so much worse. In the land of the blind, the one-eyed man is king.

## Testing Library

[](#testing-library)

But the times are changing, and we have better options now. [Testing Library (opens in a new window)](https://testing-library.com/) bets on role-based selectors and can be used with almost any test runner or framework. One notable exception is [playwright (opens in a new window)](https://playwright.dev/), but they have their own role-based selectors built-in.

Its guiding principle is:

The more your tests resemble the way your software is used, the more confidence they can give you.

That aligns with how I like to think about testing. We don’t want to be testing implementation details. Fewer mocks are better, do [mostly integration tests (opens in a new window)](https://x.com/rauchg/status/807626710350839808).

If we focus our tests on what the user can see and interact with, we get the best bang for our buck: We’re free to refactor internals, layout things differently or change how API calls are made without having to change our tests. That’s maintainability.

It’s also the only thing that matters at the end of the day: Can our users use our application? We gain nothing from having 100% unit test coverage on our formatting utils if our page crashes after an API call. 🤷‍♂️

The question is, why are role-based selectors better than the alternatives? Here’s the thing:

Users can’t see test IDs.

So whenever we use a `data-testid` to query an element, we are violating that guiding principle. That alone is not a good reason though. Principles have their right to exist, but we also have the right to ignore them if we know what we’re doing. Sticking to principles like [DRY (opens in a new window)](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase) “just because” is not good enough.

## Accessibility

[](#accessibility)

Again, what matters is that users can interact with our apps. ALL users. Laws like the [European Accessibility Act (opens in a new window)](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en) or the [Americans with Disabilities Act (opens in a new window)](https://www.ada.gov/resources/web-guidance/) require us to take this topic seriously, demanding [WCAG 2.1 AA (opens in a new window)](https://www.w3.org/TR/WCAG21/) compatibility.

Getting a11y right is hard. Using primitives like [react-aria (opens in a new window)](https://react-aria.adobe.com/) that focus on first-class accessibility is very helpful and I wouldn’t recommend building components without such a library. But still, it doesn’t fully stop us from getting things wrong. And fact is, most teams don’t do explicit a11y testing.

## Example

[](#example)

The most common example shown with test IDs something like this:

```
function WidgetDialogTrigger({ onClick }: Props) {  return (    <button data-testid="widget-dialog-trigger" onClick={onClick}>      Open Widget    </button>  )}
```

Now let’s assume we want to click that button in a test, so we do:

```
screen.getByTestId('widget-dialog-trigger').click()
```

This “works” and seems easy enough, but the way we are actually interacting with that element is not how our Users would do it. We can easily replace our button with a clickable `div` (yuck) and our test still works:

```
function WidgetDialogTrigger({ onClick }: Props) {  return (    <div data-testid="widget-dialog-trigger" onClick={onClick}>      Open Widget    </div>  )}
```

That’s bad because now that “button” is not keyboard accessible and doesn’t have the correct semantic role, so screen readers may not announce it properly. It’s just another `div` in our soup of `div`s.

## Role-based selectors

[](#role-based-selectors)

Here’s where role-based selectors come in helpful. If we had written our test like this, it wouldn’t pass the div-with-a-click-handler:

```
screen.getByRole('button', { name: 'Open Widget' }).click()
```

If we’re using role-based selectors in our tests, we get a couple of things almost for free:

-   We’re all of a sudden doing _some_ a11y testing. This doesn’t replace dedicated a11y testing with tools like [axe (opens in a new window)](https://www.deque.com/axe/), but it makes it harder to accidentally create inaccessible markup
-   Our tests become more readable. Yes, Clicking the “Open Widget button” reads great, and the fact that it’s tied to the text of the button is not a problem. They don’t change as often as you think!

To be blunt: If you can’t identify an element in your app with a role-based selector, you’re doing something wrong in your markup. Semantic HTML goes a long way.

### Examples

[](#examples)

The way I like to approach writing tests with role-based selectors is talking myself through what I’m doing when I’m clicking the steps myself, then I try to get that into selectors. For example:

> I’m clicking the Dashboards Link in the Sidebar

```
within(screen.getByRole('navigation'))  .getByRole('link', { name: 'Dashboards' })  .click()
```

> Let me click the Confirm Button in the Save Dialog

```
within(screen.getByRole('dialog', { name: 'Save' }))  .findByRole('button', { name: 'Confirm' })  .click()
```

> I’m filling out the Email Field in the Registration Form

```
userEvent.type(  within(    screen.getByRole('form', { name: 'Registration' }),  ).findByRole('textbox', { name: 'Email' }),  '[email protected]',)
```

### Getting there

[](#getting-there)

If those selectors don’t work, I know I have to change my app because it’s not accessible enough. If you’re struggling with knowing how to make that possible, here are a couple of hopefully helpful tips that I’ve used in the past:

-   Use semantic HTML. It includes [implicit ARIA roles (opens in a new window)](https://www.w3.org/TR/html-aria/#docconformance), so you rarely have to add manual `role` attributes.
-   Make sure interactive elements have an accessible name, like visible text or a proper label, and only use interactive elements for things users can interact with!
-   Use the keyboard to navigate around your app. If there’s something you can’t use (looking at you, [tooltips](https://tkdodo.eu/blog/tooltip-components-should-not-exist)), it needs fixing.
-   Use headings, landmarks and grouped regions to give the UI a clear structure. This makes it much easier to locate specific text in some parts of the page in your tests using role-based selectors.
-   Always associate form controls with labels so they can be found by name. Even if you don’t want a visible label, you can use [`<VisuallyHidden>` (opens in a new window)](https://react-aria.adobe.com/VisuallyHidden) components or [`sr-only` (opens in a new window)](https://v3.tailwindcss.com/docs/screen-readers) classes to keep the label accessible without making it visible in the UI.
-   [Testing Playground (opens in a new window)](https://testing-playground.com/) is a great tool to find the best possible accessible selector for your markup.
-   Similarly, your browsers devtools not only have an Accessibility tab, you can also switch between DOM tree view and Accessibility tree view when inspecting elements, which makes it easy to find the best possible selectors.
-   Ask you favourite AI agent about it. No seriously, they know a ton about a11y. If they leave it out in the one-shot, it’s probably because they have been trained on all the code we humans have written in the past decade, which [often falls short on a11y (opens in a new window)](https://webaim.org/projects/million/).

* * *

The bottom line is: If your tests can’t find it with a role-based selector, some of your users probably can’t either. In those cases, it’s better to fix the UI rather than work around it in the test by adding a `data-testid`.

* * *

That’s it for today. Feel free to reach out to me on [bluesky (opens in a new window)](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

Check out [monolisa.dev](https://www.monolisa.dev/?ref=dominik)

[![Query.gg - The official React Query course](https://tkdodo.eu/.netlify/images?w=4096&h=400&fit=cover&url=%2Fblog%2F_astro%2Fquery-gg.Ch3mBCol.jpg)](https://query.gg/?s=dom)

[![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/.netlify/images?w=4096&h=256&fit=cover&url=%2Fblog%2F_astro%2Fbytes.PgTxoh9S.jpg)](https://bytes.dev/?r=dom)

## Continue Series

© 2026 by TkDodo's blog. All rights reserved.