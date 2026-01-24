---
title: "Barriers from Links with ARIA"
source: "https://adrianroselli.com/2026/01/barriers-from-links-with-aria.html"
publishedDate: "2026-01-23"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

Today Temani Afif asked a question:

> Are the below codes equivalent if we consider all the aspects? (a11y, semantic, something else maybe?)
> 
> If not, what is missing (or should be changed) in the second code
> 
> ![<!-- Code 1 --><a href="https://something.com">Link</a> <!-- Code 2 --><a href="https://something.com" aria-label="link"><span aria-hidden="true"><span>L</span><span>i</span><span>n</span><span>k</span></span></a>](https://adrianroselli.com/wp-content/uploads/2026/01/temani-afif_masto-post.png)

I have my canned response that [`aria-label` auto-translation is inconsistent](https://adrianroselli.com/2019/11/aria-label-does-not-translate.html).

But the something else maybe question is what reminded me that this construct has caused issues outside of WCAG concerns. In particular, the only [assistive technologies](https://adrianroselli.com/2024/08/at-is-more-than-screen-readers.html) (AT) that consume ARIA are screen readers and, to a far lesser extent, voice control. That latter part only because browsers assemble the accessible names, not AT. There’s plenty more AT that never touches ARIA.

I knew there were issues, but couldn’t rattle them off from the top of my head. So I built some examples and poked them with other accessibility features of browsers.

## Results

I am not testing screen readers nor voice control.

-   The text with each letter in its own span does not auto-translate..
-   Edge’s Read Aloud feature (Ctrl + Shift + U) does not announce the `aria-label` value of any link.
-   Edge’s Read Aloud feature does not announce the links with `aria-hidden`, regardless of other attributes.
-   Chrome’s reader mode text-to-speech does not announce the `aria-label` value of any link.
-   Chrome’s reader mode text-to-speech does not announce the links with `aria-hidden`, regardless of other attributes.
-   Chrome’s reader mode visually hides every link with `aria-hidden`.
-   Firefox’s reader mode visually hides every link with `aria-hidden`.
-   Firefox’s reader mode visually styled every link that spanned its letters as white instead of blue or purple.
-   Safari’s Speech feature jumps past most of the page when it gets to the first instance of letters split across spans, and announces subsequent links with the wrong link text (using the Korean text for English links).
-   Safari’s Speech feature does not announce the `aria-label` value of any link.
-   Safari’s Speech feature does not announce the span-separated letters nor visible word they make up.
-   Chrome and Edge would not let me link to the highlighted text when I highlighted the `aria-hidden` links, though that changed when I got more content on the page.

[As Amelia Bellamy-Royds points out](https://front-end.social/@AmeliaBR/115940740106574818), the text-to-speech features seem to respect the `aria-hidden` but ignore the `aria-label` — and by extension the accessible name the browser provides in the accessibility tree.

## Takeaways

Three key takeaways here (yes, I know your use case is special):

1.  Don’t use `aria-label` on links;
2.  Don’t use `aria-hidden` within links;
3.  Don’t split the letters of a word across elements.

I look forward to you, dear reader, trying other approaches and letting me know where these fall down (or what I got wrong). I don’t need to know where they are supported. Just the gaps.

## Tests

These are the tests I used to generate the results you just read ([originally as a Codepen](https://codepen.io/aardrian/pen/EayvaBL)). You can ignore this part unless you want to run your own tests. If you want to find other ways these approaches might break for users, then please do so.

I used the Korean words 샌드위치 for “sandwich” and 망치 for “hammer” (the values of `aria-label`).

The links with `aria-label` all fail WCAG SC [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), but it’s intentional so I can quickly tell if the `aria-label` is exposed. Similarly, the links with `aria-hidden` and no `aria-label` fail [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), but again I wanted to see how they performed.

Standard link: [Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```
<a href="https://en.wikipedia.org/wiki/Sandwich">
  Sandwich
</a>
```

Standard link in another language: [샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko">
  샌드위치
</a>
```

Link with `aria-label`: [Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```
<a href="https://en.wikipedia.org/wiki/Sandwich" aria-label="hammer">
  Sandwich
</a>
```

Link in another language with `aria-label`: [샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko" aria-label="망치">
  샌드위치
</a>
```

Link with each letter of visible text in its own `<span>`: [Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```
<a href="https://en.wikipedia.org/wiki/Sandwich">
  <span>
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

Link in another language with each letter of visible text in its own `<span>`: [샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko">
  <span>
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

Link with `aria-label` and each letter of visible text in its own `<span>`: [Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```
<a href="https://en.wikipedia.org/wiki/Sandwich" aria-label="hammer">
  <span>
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

Link in another language with `aria-label` and each letter of visible text in its own `<span>`: [샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko" aria-label="망치">
  <span>
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

Link with `aria-hidden` on visible text with each letter of visible text in its own `<span>`:[](https://en.wikipedia.org/wiki/Sandwich)

```
<a href="https://en.wikipedia.org/wiki/Sandwich">
  <span aria-hidden="true">
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

Link in another language with `aria-hidden` on visible text with each letter of visible text in its own `<span>`:[](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko">
  <span aria-hidden="true">
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

Link with `aria-label` and `aria-hidden` on visible text with each letter of visible text in its own `<span>`:[](https://en.wikipedia.org/wiki/Sandwich)

```
<a href="https://en.wikipedia.org/wiki/Sandwich" aria-label="hammer">
  <span aria-hidden="true">
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

Link in another language with `aria-label` and `aria-hidden` on visible text with each letter of visible text in its own `<span>`:[](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko" aria-label="망치">
  <span aria-hidden="true">
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

Don’t be shy about making your own variations and leaving your results in the comments.