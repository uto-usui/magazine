---
title: "On the semantic web"
source: "https://karlkoch.me/writing/on-the-semantic-web"
publishedDate: "2026-07-02"
category: "design"
feedName: "Sidebar"
---

The easiest way to make an interface harder to maintain is to rebuild the browser badly.

A `div` can look like a button. It can be given a click handler, a pressed style, a hover state, a focus ring, an ARIA role, a keydown listener for Enter, another one for Space, a disabled class that hopefully also blocks interaction, and enough attributes to convince assistive tech that it is interactive.

Or it can be a `button`.

That sounds obvious until you look inside a lot of modern component libraries. The visual layer is treated as the source of truth, then the behaviour is patched back on afterwards. It works in the demo. It usually works with a mouse. Then someone tries to tab through it, submit it from a form, use it with VoiceOver, disable it properly, or nest it inside a more complex flow, and the component starts leaking implementation detail everywhere.

Semantic HTML is not an accessibility chore. It is interface infrastructure.

## The fake button

The custom version usually starts like this:

```
<div className="button" onClick={onSave}>
  Save changes
</div>
```

It looks fine once the CSS lands. But it has no role. It is not focusable. Space does nothing. Enter does nothing. It cannot be disabled. It does not submit a form. It does not announce itself as a button. The element has the visual affordance of an action without the platform behaviour of one.

So the patching begins:

```
<div
  role="button"
  tabIndex={0}
  aria-disabled={isDisabled}
  className="button"
  onClick={isDisabled ? undefined : onSave}
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSave();
    }
  }}
>
  Save changes
</div>
```

This is the bit that should make you suspicious. We have not designed a better button. We have started paying rent on a worse one.

## The native version

The boring version is the better version:

```
<button type="button" className="button" disabled={isDisabled} onClick={onSave}>
  Save changes
</button>
```

Now the browser does the work:

-   It enters the tab order.
-   It responds to Enter and Space.
-   It exposes its role and disabled state.
-   It blocks interaction when disabled.
-   It participates in forms predictably.
-   It inherits platform conventions users already understand.

The styling can still be completely custom. Semantic HTML does not mean accepting the browser’s default visual design. It means accepting the browser’s interaction contract before you paint over it.

That is where the design-engineering part sits. The question is not “can I make this look custom?” It is “which native behaviour should survive the styling?”

## Button truth table

Here is the invisible contract made visible. The three controls look alike, but they do not behave alike. Try clicking them, toggling disabled, tabbing into them, and pressing Enter or Space.

Disabled state: off

Bare divclickable-looking

Patched divrole + tab + keys

Behaviour

Div

Patched

Button

Tab focus

No

Yes

Yes

Enter activates

No

Manual

Yes

Space activates

No

Manual

Yes

Disabled blocks click

Manual

Manual

Yes

Exposes role

No

Manual

Yes

Event log

Try clicking, tabbing, Enter, and Space.

Try the three controls with mouse and keyboard. They look alike, but only the native button carries the full contract without extra code.

The point is not to shame custom UI. The point is to make the invisible contract visible. Once you can see the missing behaviours, the native element stops feeling like a constraint.

## Disclosure before accordion

The same thing happens with accordions. The instinct is to reach for state:

```
const [isOpen, setIsOpen] = useState(false);

return (
  <section>
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => setIsOpen((open) => !open)}
    >
      Delivery details
    </button>
    {isOpen ? <div>Ships in 2-3 working days.</div> : null}
  </section>
);
```

This can be right. If the component needs custom keyboard behaviour, animated height orchestration, controlled state, or multi-panel coordination, owning the state is reasonable.

But a lot of disclosure UI does not need that. It needs a summary and some content:

```
<details>
  <summary>Delivery details</summary>
  <p>Ships in 2-3 working days.</p>
</details>
```

That gives you a toggleable disclosure with built-in semantics. The browser exposes the expanded state. The summary is keyboard reachable. The content relationship is understood. You can still style the marker, spacing, typography, border, and open state.

The important bit is that “native” does not have to look like a browser default:

Both disclosures are styled the same. The native version starts from details/summary, so expanded state and keyboard behaviour are built into the element.

The native version is not less designed. It just starts with the behaviour solved.

## Forms are full of this

Forms are where semantic shortcuts compound.

This:

```
<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email" required />
```

is doing more than placing text near a rectangle.

The label increases the click target. The input exposes its purpose. The `type` changes the mobile keyboard and validation. The `name` makes submission work. `autocomplete` lets the browser help. `required` gives the field a validity state.

The field can keep the same visual treatment either way. The difference is what the browser gets to understand:

The fields look the same. The native label focuses the input, and required/type=email participate in browser validation without custom code.

You can recreate pieces of that by hand. You can also choose not to throw them away.

## Semantics outlast styling

Visual systems change quickly. Gradients come and go. Border radii get bigger, then smaller, then bigger again. This year’s fashionable component shape will look tired later.

The semantic layer lasts longer because it describes what the interface _is_, not how it currently looks.

A navigation landmark is still navigation after the redesign. A form control is still a form control after the brand refresh. A heading hierarchy is still the page’s outline when the typography changes. A button is still an action when the CSS moves from glassy to flat to something else.

That durability matters at scale. If every component encodes its own private version of “clickable thing”, every redesign has to preserve a pile of hidden behaviour. If the component starts from the platform primitive, the redesign mostly changes the surface.

## Where custom components are worth it

This is not an argument for only using raw HTML.

Some interfaces genuinely need custom behaviour. A command menu, a combobox with async search, a reorderable list, a rich text editor, a dense media scrubber. Native HTML will not carry all of that for you.

But the rule should be: exhaust the native contract first.

Ask:

-   Is there an element that already does this?
-   Does the custom version preserve keyboard behaviour?
-   Does it expose name, role, and state?
-   Does it work without a mouse?
-   Does it still make sense inside a form?
-   Does it need ARIA, or did I add ARIA because the markup was wrong?

ARIA is useful when you are building something the platform does not fully provide. It is a poor apology for ignoring the element that did.

## When to steal this

Start with semantics whenever the interaction maps to an existing element: actions, links, form fields, navigation, headings, lists, disclosures, tables, and article structure.

Reach for custom primitives when the behaviour is genuinely new, not when the default styling feels inconvenient.

The work is not choosing between taste and HTML. The work is making taste sit on top of the strongest possible contract. That is what lets an interface feel crafted without becoming fragile.