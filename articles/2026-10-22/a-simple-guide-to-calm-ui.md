---
title: "A simple guide to calm UI"
source: "https://maxschmitt.me/posts/calm"
publishedDate: "2026-10-21"
category: "design"
feedName: "Sidebar"
---

Try adding an item to each list below.

Pay attention to what happens after you submit each dialog:

-   Item one
-   Item two
-   Item three

-   Item one
-   Item two
-   Item three

Why does the second example feel so much calmer?

## The 2 Rules for Calm UI

1.  Don't show cascading loading states. Keep showing the loading state on the save-button until the list in the background has been refetched.
2.  Avoid using toasts. They're [bad UX](https://maxschmitt.me/posts/toasts-bad-ux). Instead show your action take effect (by adding an item to the list in this case). No need for an extra confirmation.

Similar rules apply when deleting an item.

## Example: Item Deletion

Try deleting an item from each list:

-   Item one
-   Item two
-   Item three

-   Item one
-   Item two
-   Item three

Same principle as above. Fewer discrete loading states and no toasts make for a calmer UI.

## Bonus Rules

### 1\. Don't use toasts for errors either

Try saving each item:

The toast might look cleaner but it will appear far away from where the user originally clicked, especially on large screens.

Toasts also disappear after a while, leaving the user confused if they weren't paying attention when the toast was shown.

### 2\. Pin modals that change height to the top

Try submitting each dialog below a few times:

When the modal is centered, it causes the submit-button to shift position when showing/hiding the error message. Annoying!

The simple solution is to pin the modal to the top.

### 3\. Let 'Enter' submit the form

Type in a name for the item and try hitting `Enter` on your keyboard:

When you're typing in the name of your item, you should be able to just hit `Enter` to submit the form.

You get this for free in React by using `<form onSubmit={addItem}>` instead of `<button onClick={addItem}>`.

### 4\. Focus first input when opening a dialog

Try adding an item to each list and count how many clicks it takes:

-   Item one
-   Item two
-   Item three

-   Item one
-   Item two
-   Item three

It's super annoying when I click to open a dialog and I have to click again so I can start typing.

## Conclusion

There are many great design engineers writing about the more subtle art of design, like Jakub Krehel ([The invisible side of design engineering](https://jakub.kr/writing/the-invisible-side-of-design-engineering)) and Emil Kowalski ([7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)).

I love that stuff but often times we have to build simple, solid UI and don't have the luxury of sweating the tiniest details.

And yes, even the `After` examples above could be polished a whole lot more with nice animations, optimistic updates, inline editing, etc.

This article was trying to show a few basic rules to keep in mind to make simple UIs feel a lot better. Without costing you extra time (or tokens).

Enjoyed this article? [Follow me on X](https://x.com/mackseraner) for more!

Need help with UX design or development? [Hire me!](https://maxschmitt.me/#contact)