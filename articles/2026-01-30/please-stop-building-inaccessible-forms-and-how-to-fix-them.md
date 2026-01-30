---
title: "Please stop building inaccessible forms (and how to fix them)"
source: "https://kentcdodds.com/blog/please-stop-building-inaccessible-forms-and-how-to-fix-them"
publishedDate: "2019-02-01"
category: "frontend"
feedName: "Kent C. Dodds"
---

Note, today's blog post is very heavily inspired by the [Labeling Controls tutorial](https://www.w3.org/WAI/tutorials/forms/labels) from [w3.org](https://www.w3.org/).

**HTML is accessible by default.** This is true, with the important caveat that when you use semantic HTML properly, what you've built will be accessible. For the most part... There are definitely some UI elements that can be a real challenge and you need a combination of CSS and JavaScript with that HTML to make it truly accessible. But that's not the subject of this article. We're just talking about semantic HTML which makes most built-in UI elements (like forms) accessible. Now, there are lots of ways that you can mess this up. Today I'm going to focus on `<label>` and how to ensure that your form controls (inputs) are properly labeled.

Before I get into that, allow me to just take a quick tangent and say this: PLEASE USE YOUR FORM WITH NOTHING BUT THE KEYBOARD AND SEE IF IT IS POSSIBLE. So many forms are impossible to use without a mouse and it drives me crazy. Lucky for me I _can_ use a mouse, but so many people in the world cannot. For them, it is impossible to fill out your form.

Ok, so let's talk about labels.

I'm regularly confronted with a form control that's written like this:

```
Username:
<input />
```

To a seeing user, this looks fine, but to a blind user, they'll need to use a screen reader and without a label the user is left to their best guess as to what the input is expecting when they focus on the input.

But it takes more than just putting the label text in a `<label>` input. So this wont work:

```
<label>Username</label>
<input />
```

⚡️ You can know that the input has a label associated with it by checking the input's `labels` property or the label's `control` property.

Ok, here are four ways to associate the label with the input (in order of personal preference):

## [label\[for\] ➡ input\[id\]](#labelfor--inputid)

```
<label for="username">Username</label>
<input id="username" />
```

## [input\[aria-labelledby\] ➡ label\[id\]](#inputaria-labelledby--labelid)

```
<label id="username">Username</label>
<input aria-labelledby="username" />
```

## [label 🤗 input](#label--input)

I like to think of this one as the label hugging the input

```
<label>
	Username
	<input />
</label>
```

This one works fine and it's nice because it means you don't have to make globally unique IDs (typically in a client-rendered app I'll generate those randomly anyway), but it's not my favorite mostly because it can be harder to style things the way I want them to, and [`getByLabelText`](https://testing-library.com/docs/api-queries#getbylabeltext) requires you provide a `selector` when you do this.

## [input\[aria-label\]](#inputaria-label)

```
<input aria-label="Username" />
```

I don't really like this approach because it removes a visible label which has _other_ accessibility implications.

## [Conclusion](#conclusion)

You can actually also use the `title` attribute, but apparently screen readers are inconsistent in considering this a label, so just stick with one of the above methods.

As a bonus, when you properly associate a label to a form control, the clickable area of the form control includes the label which is especially useful for checkboxes and people on mobile devices.

Another bonus: you'll be able to use [`getByLabelText`](https://testing-library.com/docs/api-queries#getbylabeltext) and that'll [make your tests resemble the way your software is used](https://testing-library.com/docs/guiding-principles) more closely which is great!

You can read more about this here: [Using label elements to associate text labels with form controls](https://www.w3.org/TR/WCAG20-TECHS/H44.html).

I hope that's helpful to you. Again, in addition to making sure that your form controls are properly labeled, please please try using your form with a keyboard only. They're both very low hanging fruit and can make a big difference in the accessibility of your forms.

**Install and use [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)**

Good luck! 💪