---
title: "It’s hard to justify Tahoe icons"
source: "https://tonsky.me/blog/tahoe-icons/"
publishedDate: "2026-01-08"
category: "design"
feedName: "Sidebar"
---

I was reading Macintosh Human Interface Guidelines [from 1992](https://dn721903.ca.archive.org/0/items/apple-hig/Macintosh_HIG_1992.pdf) and found this nice illustration:

![](https://tonsky.me/blog/tahoe-icons/hig_icons@2x.webp?t=1767838160)

accompanied by explanation:

![](https://tonsky.me/blog/tahoe-icons/hig_quote@2x.webp?t=1767838160)

Fast forward to 2025. Apple releases macOS Tahoe. Main attraction? Adding unpleasant, distracting, illegible, messy, cluttered, confusing, frustrating icons (their words, not mine!) to every menu item:

![](https://tonsky.me/blog/tahoe-icons/sequoia_tahoe_textedit@2x.webp?t=1767838160)

Sequoia → Tahoe

It’s bad. But why exactly is it bad? Let’s delve into it!

Disclaimer: screenshots are a mix from macOS 26.1 and 26.2, taken from stock Apple apps only that come pre-installed with the system. No system settings were modified.

## Icons should differentiate

The main function of an icon is to help you find what you are looking for faster.

Perhaps counter-intuitively, adding an icon to everything is exactly the wrong thing to do. To stand out, things need to be different. But if everything has an icon, nothing stands out.

The same applies to color: black-and-white icons look clean, but they don’t help you find things faster!

Microsoft used to know this:

[![](https://tonsky.me/blog/tahoe-icons/word@2x.webp?t=1767838160)](https://tonsky.me/)

Look how much faster you can find Save or Share in the right variant:

![](https://tonsky.me/blog/tahoe-icons/menu_cleanup@2x.webp?t=1767838160)

It also looks cleaner. Less cluttered.

A colored version would be even better (clearer separation of text from icon, faster to find):

![](https://tonsky.me/blog/tahoe-icons/menu_cleanup_color@2x.webp?t=1767838160)

I know you won’t like how it looks. I don’t like it either. These icons are hard to work with. You’ll have to actually design for color to look nice. But the principle stands: it is way easier to use.

## Consistency between apps

If you want icons to work, they need to be _consistent_. I need to be able to learn what to look for.

For example, I see a “Cut” command and ![](https://tonsky.me/blog/tahoe-icons/scissors.svg?t=1767838160) next to it. Okay, I think. Next time I’m looking for “Cut,” I might save some time and start looking for ![](https://tonsky.me/blog/tahoe-icons/scissors.svg?t=1767838160) instead.

How is Tahoe doing on that front? I present to you: Fifty Shades of “New”:

![](https://tonsky.me/blog/tahoe-icons/menu_new@2x.webp?t=1767838160)

I even collected them all together, so the absurdity of the situation is more obvious.

![](https://tonsky.me/blog/tahoe-icons/icons_new@2x.webp?t=1767838160)

Granted, some of them are different operations, so they have different icons. I guess creating a smart folder is different from creating a journal entry. But this?

![](https://tonsky.me/blog/tahoe-icons/menu_new_object@2x.webp?t=1767838160)

Or this:

![](https://tonsky.me/blog/tahoe-icons/icons_new_smart_folder@2x.webp?t=1767838160)

Or this:

![](https://tonsky.me/blog/tahoe-icons/icons_new_window@2x.webp?t=1767838160)

There is no excuse.

Same deal with open:

![](https://tonsky.me/blog/tahoe-icons/menu_open@2x.webp?t=1767838160)

Save:

![](https://tonsky.me/blog/tahoe-icons/menu_save@2x.webp?t=1767838160)

Yes. One of them is a checkmark. And they can’t even agree on the direction of an arrow!

Close:

![](https://tonsky.me/blog/tahoe-icons/menu_close@2x.webp?t=1767838160)

Find (which is sometimes called Search, and sometimes Filter):

![](https://tonsky.me/blog/tahoe-icons/menu_find@2x.webp?t=1767838160)

Delete (from Cut-Copy-Paste-Delete fame):

![](https://tonsky.me/blog/tahoe-icons/menu_delete@2x.webp?t=1767838160)

Minimize window.

![](https://tonsky.me/blog/tahoe-icons/menu_minimize@2x.webp?t=1767838160)

These are not some obscure, unique operations. These are OS basics, these are foundational. Every app has them, and they are always in the same place. They shouldn’t look different!

## Consistency inside the same app

Icons are also used in toolbars. Conceptually, operations in a toolbar are identical to operations called through the menu, and thus should use the same icons. That’s the simplest case to implement: inside the same app, often on the same screen. How hard can it be to stay consistent?

Preview:

![](https://tonsky.me/blog/tahoe-icons/preview@2x.webp?t=1767838160)

Photos: same ![](https://tonsky.me/blog/tahoe-icons/info_circle.svg?t=1767838160) and ![](https://tonsky.me/blog/tahoe-icons/info.svg?t=1767838160) mismatch, but reversed ¯\\\_(ツ)\_/¯

![](https://tonsky.me/blog/tahoe-icons/photos@2x.webp?t=1767838160)

Maps and others often use different symbols for zoom:

![](https://tonsky.me/blog/tahoe-icons/consistency_maps@2x.webp?t=1767838160)

## Icon reuse

Another cardinal sin is to use the same icon for different actions. Imagine: I have learned that ![](https://tonsky.me/blog/tahoe-icons/square_and_pencil.svg?t=1767838160) means “New”:

![](https://tonsky.me/blog/tahoe-icons/new_note@2x.webp?t=1767838160)

Then I open an app and see![](https://tonsky.me/blog/tahoe-icons/square_and_pencil.svg?t=1767838160). “Cool”, I think, “I already know what it means”:

![](https://tonsky.me/blog/tahoe-icons/edit_address@2x.webp?t=1767838160)

Gotcha!

You’d think: okay, ![](https://tonsky.me/blog/tahoe-icons/eye.svg?t=1767838160) means quick look:

![](https://tonsky.me/blog/tahoe-icons/quick_look@2x.webp?t=1767838160)

Sometimes, sure. Some other times, ![](https://tonsky.me/blog/tahoe-icons/eye.svg?t=1767838160) means “Show completed”:

![](https://tonsky.me/blog/tahoe-icons/show_completed@2x.webp?t=1767838160)

Sometimes ![](https://tonsky.me/blog/tahoe-icons/square_and_arrow_down.svg?t=1767838160) is “Import”:

![](https://tonsky.me/blog/tahoe-icons/import@2x.webp?t=1767838160)

Sometimes ![](https://tonsky.me/blog/tahoe-icons/square_and_arrow_down.svg?t=1767838160) is “Updates”:

![](https://tonsky.me/blog/tahoe-icons/update@2x.webp?t=1767838160)

Same as with consistency, icon reuse doesn’t only happen between apps. Sometimes you see ![](https://tonsky.me/blog/tahoe-icons/rectangle_pencil_ellipsis.svg?t=1767838160) in a toolbar:

![](https://tonsky.me/blog/tahoe-icons/form_filling_toolbar@2x.webp?t=1767838160)

Then go to the menu _in the same app_ and see ![](https://tonsky.me/blog/tahoe-icons/rectangle_pencil_ellipsis.svg?t=1767838160) means something else:

![](https://tonsky.me/blog/tahoe-icons/autofill@2x.webp?t=1767838160)

Sometimes identical icons meet in the same menu.

![](https://tonsky.me/blog/tahoe-icons/save_export@2x.webp?t=1767838160)

Sometimes next to each other.

![](https://tonsky.me/blog/tahoe-icons/passwords@2x.webp?t=1767838160)

Sometimes they put an entire barrage of identical icons in a row:

![](https://tonsky.me/blog/tahoe-icons/photos_export@2x.webp?t=1767838160)

This doesn’t help anyone. No user will find a menu item faster or will understand the function better if all icons are the same.

The worst case of icon reuse so far has been the Photos app:

![](https://tonsky.me/blog/tahoe-icons/photos_copy@2x.webp?t=1767838160)

It feels like the person tasked with choosing a unique icon for every menu item just ran out of ideas.

Understandable.

## Too much nuance

When looking at icons, we usually allow for slight differences in execution. That lets us, for example, understand that these _technically different_ road signs mean the same thing:

![](https://tonsky.me/blog/tahoe-icons/pedestrians.webp?t=1767838160)

Same applies for icons: if you draw an arrow going out of the box in one place and also an arrow and the box but at a slightly different angle, or with different stroke width, or make one filled, we will understand them as meaning the same thing.

Like, ![](https://tonsky.me/blog/tahoe-icons/info_circle.svg?t=1767838160) is supposed to mean something else from ![](https://tonsky.me/blog/tahoe-icons/info_circle_fill.svg?t=1767838160)? Come on!

![](https://tonsky.me/blog/tahoe-icons/similar_i@2x.webp?t=1767838160)

Or two letters A that only slightly differ in the font size:

![](https://tonsky.me/blog/tahoe-icons/similar_font_size@2x.webp?t=1767838160)

A pencil is “Rename” but a slightly thicker pencil is “Highlight”?

![](https://tonsky.me/blog/tahoe-icons/similar_pencil@2x.webp?t=1767838160)

Arrows that use different diagonals?

![](https://tonsky.me/blog/tahoe-icons/similar_actual_size@2x.webp?t=1767838160)

Three dots occupying ⅔ of space vs three dots occupying everything. Seriously?

![](https://tonsky.me/blog/tahoe-icons/similar_sidebar@2x.webp?t=1767838160)

Slightly darker dots?

![](https://tonsky.me/blog/tahoe-icons/similar_quality@2x.webp?t=1767838160)

The sheet of paper that changes meaning depending on if its corner is folded or if there are lines inside?

![](https://tonsky.me/blog/tahoe-icons/similar_sheet@2x.webp?t=1767838160)

But the final boss are arrows. They are all different:

![](https://tonsky.me/blog/tahoe-icons/similar_arrows@2x.webp?t=1767838160)

Supposedly, a user must become an expert at noticing how squished the circle is, if it starts top to right or bottom to right, and how far the arrow’s end goes.

Do I care? Honestly, no. I could’ve given it a shot, maybe, if Apple applied these consistently. But Apple considers ![](https://tonsky.me/blog/tahoe-icons/square_and_pencil.svg?t=1767838160) and ![](https://tonsky.me/blog/tahoe-icons/plus.svg?t=1767838160) to mean the same thing in one place, and expects me to notice minute details like this in another?

Sorry, I can’t trust you. Not after everything I’ve seen.

## Detalization

Icons are supposed to be easily recognizable from a distance. Every icon designer knows: small details are no-go. You can have them sometimes, maybe, for aesthetic purposes, but you can’t _rely_ on them.

And icons in Tahoe menus are _tiny_. Most of them fit in a 12×12 pixel square (actual resolution is 24×24 because of Retina), and because many of them are not square, one dimension is usually even less than 12.

It’s not a lot of space to work with! Even Windows 95 had 16×16 icons. If we take the typical DPI of that era at 72 dots per inch, we get a physical icon size of 0.22 inches (5.6 mm). On a modern MacBook Pro with 254 DPI, Tahoe’s 24×24 icons are 0.09 inches (2.4 mm). Sure, 24 is bigger than 16, but in reality, these icons’ area is 4 times as small!

![](https://tonsky.me/blog/tahoe-icons/dpi_comparison@2x.webp?t=1767838160)

Simulated physical size comparison between 16×16 at 72 DPI (left) and 24×24 at 254 DPI (right)

So when I see this:

![](https://tonsky.me/blog/tahoe-icons/details_zoom@2x.webp?t=1767838160)

I struggle. I can tell they are different. But I definitely struggle to tell what’s being drawn.

Even zoomed in 20×, it’s still a mess:

![](https://tonsky.me/blog/tahoe-icons/details_zoomed@2x.webp?t=1767838160)

Or here. These are three different icons:

![](https://tonsky.me/blog/tahoe-icons/details_lists@2x.webp?t=1767838160)

Am I supposed to tell plus sign from sparkle here?

![](https://tonsky.me/blog/tahoe-icons/details_sparkle@2x.webp?t=1767838160)

Some of these lines are half the pixel thicker than the other lines, and that’s supposed to be the main point:

![](https://tonsky.me/blog/tahoe-icons/details_redact@2x.webp?t=1767838160)

Is this supposed to be an arrow?

![](https://tonsky.me/blog/tahoe-icons/details_original@2x.webp?t=1767838160)

A paintbrush?

![](https://tonsky.me/blog/tahoe-icons/details_paste@2x.webp?t=1767838160)

Look, a tiny camera.

![](https://tonsky.me/blog/tahoe-icons/details_screenshot@2x.webp?t=1767838160)

It even got an even tinier viewfinder, which you can almost see if you zoom in 20×:

![](https://tonsky.me/blog/tahoe-icons/details_screenshot_zoomed@2x.webp?t=1767838160)

Or here. There is a box, inside that box is a circle, and inside it is a tiny letter `i` with a total height of 2 pixels:

![](https://tonsky.me/blog/tahoe-icons/details_properties@2x.webp?t=1767838160)

Don’t see it?

![](https://tonsky.me/blog/tahoe-icons/details_properties_zoomed@2x.webp?t=1767838160)

I don’t. But it’s there...

And this is a window! It even has traffic lights! How adorable:

![](https://tonsky.me/blog/tahoe-icons/details_window@2x.webp?t=1767838160)

Remember: these are retina pixels, ¼ of a real pixel. Steve Jobs himself claimed they were invisible.

> It turns out there’s a magic number right around 300 pixels per inch, that when you hold something around to 10 to 12 inches away from your eyes, is the limit of the human retina to differentiate the pixels.

And yet, Tahoe icons rely on you being able to see them.

## Pixel grid

When you have so little space to work with, every pixel matters. You can make a good icon, but you have to choose your pixels very carefully.

For Tahoe icons, Apple decided to use vector fonts instead of good old-fashioned bitmaps. It saves Apple resources—draw once, use everywhere. Any size, any display resolution, any font width.

But there’re downsides: fonts are hard to position vertically, their size [doesn’t map directly to pixels](https://tonsky.me/blog/font-size/), stroke width doesn’t map 1-to-1 to pixel grid, etc. So, they work everywhere, but they also look blurry and mediocre everywhere:

![](https://tonsky.me/blog/tahoe-icons/details_clean_up@2x.webp?t=1767838160)

Tahoe icon (left) and its pixel-aligned version (right).

They certainly start to work better once you give them more pixels.

![](https://tonsky.me/blog/tahoe-icons/ipad_comparison@2x.webp?t=1767838160)

iPad OS 26 vs macOS 26

or make graphics simpler. But the combination of small details and tiny icon size is deadly. So, until Apple releases MacBooks with 380+ DPI, unfortunately, we still have to care about the pixel grid.

Icons might serve another function: to help users understand the meaning of the command.

For example, once you know the context (move window), these icons explain what’s going on faster than words:

![](https://tonsky.me/blog/tahoe-icons/window@2x.webp?t=1767838160)

But for this to work, the user must understand what’s drawn on the icon. It must be a familiar object with a clear translation to computer action (like Trash can → Delete), a widely used symbol, or an easy-to-understand diagram. HIG:

![](https://tonsky.me/blog/tahoe-icons/hig_metaphor@2x.webp?t=1767838160)

A rookie mistake would be to misrepresent the object. For example, this is how selection looks like:

![](https://tonsky.me/blog/tahoe-icons/metaphor_selection@2x.webp?t=1767838160)

But its icon looks like this:

![](https://tonsky.me/blog/tahoe-icons/metaphor_select@2x.webp?t=1767838160)

Honestly, I’ve been writing this essay for a week, and I still have zero ideas why it looks like that. There’s an object that looks like this, but it’s a text block in Freeform/Preview:

![](https://tonsky.me/blog/tahoe-icons/metaphor_text_block@2x.webp?t=1767838160)

It’s called `character.textbox` in SF Symbols:

![](https://tonsky.me/blog/tahoe-icons/character_textbox@2x.webp?t=1767838160)

Why did it become a metaphor for “Select all”? My best guess is it’s a mistake.

Another place uses text selection from iOS as a metaphor. On a Mac!

![](https://tonsky.me/blog/tahoe-icons/metaphor_text_selection@2x.webp?t=1767838160)

Some concepts have obvious or well-established metaphors. In that case, it’s a mistake not to use them. For example, bookmarks: ![](https://tonsky.me/blog/tahoe-icons/bookmark.svg?t=1767838160). Apple, for some reason, went with a book:

![](https://tonsky.me/blog/tahoe-icons/metaphor_bookmarks@2x.webp?t=1767838160)

Sometimes you already have an interface element and can use it for an icon. However, try not to confuse your users. Dots in a rectangle look like password input, not permissions:

![](https://tonsky.me/blog/tahoe-icons/metaphor_permissions@2x.webp?t=1767838160)

Icon here says “Check” but the action is “Uncheck”.

![](https://tonsky.me/blog/tahoe-icons/metaphor_mark_incomplete@2x.webp?t=1767838160)

Terrible mistake: icon doesn’t help, it actively confuses the user.

It’s also tempting to construct a two-level icon: an object and some sort of indicator. Like, a checkbox and a cross, meaning “Delete checkbox”:

![](https://tonsky.me/blog/tahoe-icons/metaphor_mark_unchecked@2x.webp?t=1767838160)

Or a user and a checkmark, like “Check the user”:

![](https://tonsky.me/blog/tahoe-icons/metaphor_manage@2x.webp?t=1767838160)

Unfortunately, constructs like this rarely work. Users don’t build sentences from building blocks you provide; they have no desire to solve these puzzles.

Finding metaphors is hard. Nouns are easier than verbs, and menu items are mostly verbs. How does open look? Like an arrow pointing to the top right? Why?

![](https://tonsky.me/blog/tahoe-icons/metaphor_open@2x.webp?t=1767838160)

I’m not saying there’s an obvious metaphor for “Open” Apple missed. There isn’t. But that’s the point: if you can’t find a good metaphor, using no icon is better than using a bad, confusing, or nonsensical icon.

There’s a game I like to play to test the quality of the metaphor. Remove the labels and try to guess the meaning. Give it a try:

![](https://tonsky.me/blog/tahoe-icons/metaphor_guess@2x.webp?t=1767838160)

It’s delusional to think that there’s a good icon for every action if you think hard enough. There isn’t. It’s a lost battle from the start. No amount of money or “management decisions” is going to change that. The problems are 100% self-inflicted.

All this being said, I gotta give Apple credit where credit is due. When they are good at choosing metaphors, they are good:

![](https://tonsky.me/blog/tahoe-icons/metaphor_up_down@2x.webp?t=1767838160)

## Symmetrical actions

A special case of a confusing metaphor is using different metaphors for actions that are direct opposites of one another. Like Undo/Redo, Open/Close, Left/Right.

It’s good when their icons use the same metaphor:

![](https://tonsky.me/blog/tahoe-icons/symmetry_import_export_right@2x.webp?t=1767838160)

Because it saves you time and cognitive resources. Learn one, get another one for free.

Because of that, it’s a mistake not to use common metaphors for related actions:

![](https://tonsky.me/blog/tahoe-icons/symmetry_select@2x.webp?t=1767838160)

Or here:

![](https://tonsky.me/blog/tahoe-icons/symmetry_clipboard@2x.webp?t=1767838160)

Another mistake is to create symmetry where there is none. “Back” and “See all”?

![](https://tonsky.me/blog/tahoe-icons/symmetry_app_store@2x.webp?t=1767838160)

Some menus in Tahoe make both mistakes. E.g. lack of symmetry between Show/Hide and false symmetry between completed/subtasks:

![](https://tonsky.me/blog/tahoe-icons/symmetry_eye@2x.webp?t=1767838160)

Import not mirrored by Export but by Share:

![](https://tonsky.me/blog/tahoe-icons/symmetry_import_export@2x.webp?t=1767838160)

## Text in icons

HIG again:

![](https://tonsky.me/blog/tahoe-icons/hig_text_icons@2x.webp?t=1767838160)

Authors of HIG are arguing against including text as a part of an icon. So something like this:

![](https://tonsky.me/blog/tahoe-icons/metaphor_select@2x.webp?t=1767838160)

or this:

![](https://tonsky.me/blog/tahoe-icons/similar_i@2x.webp?t=1767838160)

would not fly in 1992.

I agree, but Tahoe has more serious problems: icons consisting _only_ of text. Like this:

![](https://tonsky.me/blog/tahoe-icons/text_font@2x.webp?t=1767838160)

It’s unclear where “metaphorical, abstract icon text that is not supposed to be read literally” ends and actual text starts. They use the same font, the same color, so how am I supposed to differentiate? Icons just get in a way: A...Complete? AaFont? What does it mean?

I can maybe understand ![](https://tonsky.me/blog/tahoe-icons/textformat_characters_dottedunderline.svg?t=1767838160) and ![](https://tonsky.me/blog/tahoe-icons/a_ellipsis.svg?t=1767838160). Dots are supposed to represent something. I can imagine thinking that led to ![](https://tonsky.me/blog/tahoe-icons/aa.svg?t=1767838160). But ![](https://tonsky.me/blog/tahoe-icons/textformat_characters.svg?t=1767838160)? No decorations. No effects. Just plain Abc. Really?

## Text transformations

One might think that using icons to illustrate text transformations is a better idea.

Like, you look at this:

![](https://tonsky.me/blog/tahoe-icons/text_transformations@2x.webp?t=1767838160)

or this:

![](https://tonsky.me/blog/tahoe-icons/text_size@2x.webp?t=1767838160)

or this:

![](https://tonsky.me/blog/tahoe-icons/text_styles@2x.webp?t=1767838160)

and just from the icon alone understand what will happen with the text. Icon _illustrates_ the action.

Also, BIU are well-established in word processing, so all upside?

Not exactly. The problem is the same—text icon looks like text, not icon. Plus, these icons are _excessive_. What’s the point of taking the first letter and repeating it? The word “Bold” already starts with a letter “B”, it reads just as easily, so why double it? Look at it again:

![](https://tonsky.me/blog/tahoe-icons/text_styles@2x.webp?t=1767838160)

It’s also repeated once more as a shortcut...

There is a better way to design this menu:

![](https://tonsky.me/blog/tahoe-icons/text_styles_inline@2x.webp?t=1767838160)

And it was known to Apple for at least 33 years.

![](https://tonsky.me/blog/tahoe-icons/hig_style@2x.webp?t=1767838160)

## System elements in icons

Operating system, of course, uses some visual elements for its own purposes. Like window controls, resize handles, cursors, shortcuts, etc. It would be a mistake to use those in icons.

![](https://tonsky.me/blog/tahoe-icons/hig_standard_elements@2x.webp?t=1767838160)

Unfortunately, Apple fell into this trap, too. They reused arrows.

![](https://tonsky.me/blog/tahoe-icons/text_arrow@2x.webp?t=1767838160)

Key shortcuts:

![](https://tonsky.me/blog/tahoe-icons/text_encoding@2x.webp?t=1767838160)

HIG has an entire section on ellipsis specifically and how dangerous it is to use it anywhere else in the menu.

![](https://tonsky.me/blog/tahoe-icons/hig_ellipsis@2x.webp?t=1767838160)

And this exact problem is in Tahoe, too.

![](https://tonsky.me/blog/tahoe-icons/text_ellipsis@2x.webp?t=1767838160)

## Icons break scanning

Without icons, you can just scan the menu from top to bottom, reading only the first letters. Because they all align:

![](https://tonsky.me/blog/tahoe-icons/align_sequoia@2x.webp?t=1767838160)

macOS Sequoia

In Tahoe, though, some menu items have icons, some don’t, and they are aligned differently:

![](https://tonsky.me/blog/tahoe-icons/align_tahoe@2x.webp?t=1767838160)

Some items can have both checkmarks _and_ icons, or have only one of them, or have neither, so we get situations like this:

![](https://tonsky.me/blog/tahoe-icons/align_holes@2x.webp?t=1767838160)

Ugh.

## Special mention

This menu deserves its own category:

![](https://tonsky.me/blog/tahoe-icons/writing_direction@2x.webp?t=1767838160)

Same icon for different actions. Missing the obvious metaphor. Somehow making the first one slightly smaller than the second and third. Congratulations! It got it all.

## Is HIG still relevant?

I’ve been mentioning HIG a lot, and you might be wondering: is an interface manual from 1992 still relevant today? Haven’t computers changed so much that entirely new principles, designs, and idioms apply?

Yes and no. Of course, advice on how to adapt your icons to black-and-white displays is obsolete. But the principles—as long as they are good principles—still apply, because they are based on how humans work, not how computers work.

Humans don’t get a new release every year. Our memory doesn’t double. Our eyesight doesn’t become sharper. Attention works the same way it always has. Visual recognition, motor skills—all of this is exactly as it was in 1992.

So yeah, until we get a direct chip-to-brain interface, HIG will stay relevant.

## Conclusion

In my opinion, Apple took on an impossible task: to add an icon to every menu item. There are just not enough good metaphors to do something like that.

But even if there were, the premise itself is questionable: if everything has an icon, it doesn’t mean users will find what they are looking for faster.

And even if the premise was solid, I still wish I could say: they did the best they could, given the goal. But that’s not true either: they did a poor job consistently applying the metaphors and designing the icons themselves.

I hope this article would be helpful in avoiding common mistakes in icon design, which Apple managed to collect all in one OS release. I love computers, I love interfaces, I love visual communication. It makes me sad seeing perfectly good knowledge already accessible 30 years ago being completely ignored or thrown away today.

On the upside: it’s not that hard anymore to design better than Apple! Let’s drink to that. Happy New year!

![](https://tonsky.me/blog/tahoe-icons/smiley@2x.webp?t=1767838160)

From SF Symbols: a smiley face calling somebody on the phone

## Notes

During review of this post I was made familiar with [Jim Nielsen’s article](https://blog.jim-nielsen.com/2025/icons-in-menus/), which hits a lot of the same points as I do. I take that as a sign there’s some common truth behind our reasoning.

Also note: Safari → File menu got worse since 26.0. Used to have only 4 icons, now it’s 18!

Thanks Kevin, Ryan, and Nicki for reading drafts of this post.

## UPD: Notable mentions

-   [Simon Willison](https://simonwillison.net/2026/Jan/5/its-hard-to-justify-tahoe-icons/)
-   [John Gruber](https://daringfireball.net/linked/2026/01/05/hard-to-justify-tahoe-icons)
-   [Jason Fried](https://x.com/jasonfried/status/2008632347034566694)
-   [Michael Tsai](https://mjtsai.com/blog/2025/12/10/icons-in-menus-everywhere/#icons-in-menus-everywhere-update-2026-01-05)
-   [TLDR Design](https://tldr.tech/design/2026-01-07)
-   [9TO5Mac](https://9to5mac.com/2026/01/06/macos-tahoe-icons-do-exactly-what-apple-said-designers-should-never-do/)
-   [Pixel Envy](https://pxlnv.com/linklog/tahoe-icons-inconsistent-confusing-illegible/)
-   [bytes.dev](https://bytes.dev/archives/452)