---
title: "Your Prototype Is Not Being Honest With Your Users (And Here’s How To Fix It)"
source: "https://smashingmagazine.com/2026/05/prototype-users-fix-protopie/"
publishedDate: "2026-05-25"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Eric Joseph L.)"
---

-   6 min read
-   [Prototypes](https://smashingmagazine.com/category/prototypes), [User Experience](https://smashingmagazine.com/category/user-experience), [User Interfaces](https://smashingmagazine.com/category/user-interfaces)

There’s a moment in almost every usability session where a participant pauses at the login screen, types something, and glances up: checking whether they’re “doing it right.” That pause is a clear sign. They’ve already clocked that this isn’t a real app, and every data point collected after that moment is filtered through that awareness.

There’s a moment in almost every usability session where a participant pauses at the login screen, types something, and glances up: checking whether they’re “doing it right.” That pause is a clear sign. They’ve already clocked that this isn’t a real app, and every data point collected after that moment is filtered through that awareness.

In financial product testing, the problem is sharper. Finance users are trained to notice when something feels off: a balance that doesn’t add up, a field that accepts anything. When a banking prototype skips real authentication, participants don’t just disengage; they stop mid-session to flag it. The team walks away with findings that reflect how users behave in a demonstration, not in a real product.

The fix is narrower than you’d think. Identify the moment where participant trust is established and make that interaction real. In a banking app, that moment is the login.

This tutorial builds it: credentials that validate, a live error state, and a biometric animation that feels native — no code required.

## What We’re Building: A Login That Behaves Like A Shipped Product

The login flow, built around Pie Bank, a mobile banking prototype, includes functional text inputs, a masked password field, credential validation, a live error state, and a Face ID animation timed to feel indistinguishable from iOS.

What you’ll need:

-   A login UI from Figma (or any supported design tool)
-   [ProtoPie Studio](https://www.protopie.io/download) — **free to start**, everything in this tutorial works on the free plan
-   A Lottie file for the Face ID animation ([this one](https://lottiefiles.com/free-animation/face-id-ios-checkmark-ui-animation-SAEU0Y3XHU) is what we used)
-   The [finished Pie Bank prototype file](https://demo.protopie.cloud/p/606d44ace6d7ea8f41cf38ff) — download it to follow alongside, or use it as a reference after you build

![](https://files.smashing.media/articles/prototype-users-fix-protopie/Intro_fintech-tutorial-login-usecases-preview.gif)

## Step 1: Import From Figma Choose Scene, Not Flattened

In Figma, open the ProtoPie plugin with your login frame selected and choose **Scene** when exporting. Flattened collapses everything into a single image; Scene preserves your layer hierarchy so every element arrives in ProtoPie as a separate, targetable layer.

Before moving on: rename every layer meaningfully. “Input Username” not “Rectangle 14”. You’ll reference these names in formulas: vague names compound into real time lost.

![](https://files.smashing.media/articles/prototype-users-fix-protopie/Step%201_fintech-tutorial-design-import.gif)

## Step 2: Swap Static Fields For Inputs That Actually Accept Text

ProtoPie’s native **Input** layer accepts real keyboard entry: participants type actual text, not tap a placeholder. Go to `Text`  → `Input`, drag an Input layer onto your canvas, and nest it inside your username field group. Match it visually: placeholder text **Username**, background fill and font to match your design.

Hit preview. Click the field. Type. That’s the prototype starting to behave like an app rather than depicting one.

Rename this layer **Input Username**, duplicate it, and nest the copy inside your password field group.

## Step 3: One Property Change Masks The Password

On the duplicated layer, change placeholder text to **Password** and set **Type** to **Text Password**. ProtoPie handles the masking: no custom logic needed.

Preview both fields: username shows text, password shows dots. It already feels real, and you haven’t written a single condition.

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/prototype-users-fix-protopie/Step%203_fintech-tutorial-password.png)

(Image credit: ) (Large preview)

## Step 4: Build The Destination Scene Before Wiring Navigation

Add a new scene, even a blank one. The most common sequencing mistake in ProtoPie is trying to wire a navigation response before a destination exists. Create it first.

## Step 5: Wire The Button: It Works, But It Still Lets Everyone Through

Select **Log In**, add a **Tap** trigger, set response to **Jump**, target your dashboard scene, transition **Slide in from right to left**.

Preview and tap. It navigates: but for any input, including nothing. The prototype is still lying. The next two steps are the fix.

![](https://files.smashing.media/articles/prototype-users-fix-protopie/Step%205_fintech-tutorial-login-button.gif)

## Step 6: Add Variables So The Prototype Remembers What Was Typed

At the bottom-left of ProtoPie, add two **Text** type variables: `username` and `password`. Bind each to its input layer with a formula:

```
input("Input Username").text
input("Input Password").text
```

Enable the debug icons: green overlays will show live variable values as you type. When you see your keystrokes appear in real time, the binding is confirmed.

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/prototype-users-fix-protopie/Step%206_fintech-tutorial_varibales.png)

(Image credit: ) (Large preview)

## Step 7: Add A Condition So Only Valid Credentials Get Through

Go back to the **Tap** trigger on the login button. Add a **Condition** with two rules, both must be true:

-   `username` equals `alex.c@gmail.com`
-   `password` equals `ABC123`

Move the **Jump** response inside this condition. Wrong credentials, empty fields, wrong format: none get through. Participants now have to actually log in. That single constraint changes the texture of every test session that follows.

![](https://files.smashing.media/articles/prototype-users-fix-protopie/Step%207_fintech-tutorial-condition.gif)

## Step 8: Build The Error State, The Interaction Most Prototypes Skip

Find your error message layer, rename it **Error Text**, set initial opacity to **0**. Add a second condition (the inverse of the first), and inside it, a **Change Property** response setting **Error Text** opacity to **100**.

Wrong credentials: error appears. Correct credentials: dashboard. Two outcomes: which is what makes this testable, not just demonstrable.

## Step 9: Add the Face ID Animation, The Detail That Makes Testers Ask “Is This Real”

Go to **Media**, drag a **Lottie** layer onto canvas, load your Face ID file, and position it off-screen above the iPhone frame. On your **Login with Face ID** button, add a **Tap** trigger (rename it **Tap Face ID**) with four responses in sequence:

-   **Move**: Lottie container to `Y: 60`
-   **Playback**: Seek: time `0s` (resets so it always plays from the start)
-   **Playback: Play**: Lottie file
-   **Jump**: to dashboard

## Step 10: Stagger The Timing, This Is What Makes It Feel Native

Without delays, all four responses fire at once and the scene jumps before the animation plays. Add offsets:

Response

Delay

Move

0s

Seek

0s

Play

0.5s

Jump

1s

Enable **Reset selected scenes** on Jump: without it, navigating back leaves the animation stuck at `Y: 60`.

Preview: tap Face ID, animation drops in, plays, screen transitions. A biometric login indistinguishable from the real thing.

![](https://files.smashing.media/articles/prototype-users-fix-protopie/Step%2010_fintech-tutorial-faceID.gif)

You can download [Pie Bank, Chapter 1: Login Flow](https://demo.protopie.cloud/p/606d44ace6d7ea8f41cf38ff) and explore it freely.

## A Login This Real Changes What You Can Learn From Your Prototype

When authentication actually works, the error state becomes a genuine research touchpoint: do users understand the message, do they retry, do they reach for Face ID instead? These are questions a faked login can’t answer.

In stakeholder reviews, the flow speaks for itself. In engineering handoff, the interaction panel documents the behavior (conditional logic, variable bindings, timing) so engineers see intent, not interpretation.

This is why FinTech teams invest in login fidelity even when the login isn’t the feature being tested. It’s where participant trust is established. Get it right, and everything downstream produces better signal.

* * *

_This tutorial is part of the [FinTech Prototyping with ProtoPie](https://www.protopie.io/blog/fintech-prototyping-with-protopie) series on the ProtoPie blog. The series builds Pie Bank from the ground up across four chapters, covering the dashboard, money transfer logic, and camera integration. If this tutorial was useful, the rest of the series goes further._

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (mnj, il)