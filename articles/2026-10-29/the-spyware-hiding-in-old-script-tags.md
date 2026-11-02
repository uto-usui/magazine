---
title: "The spyware hiding in old script tags"
source: "https://frontendfoc.us/issues/764"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793190176/dlisimtjkn0bavqwusxs.png)](https://developer.chrome.com/blog/html-in-canvas)

[Creating Dynamic Social Media Cards for User Content](https://blog.master.dev/what-should-you-put-on-a-dynamic-custom-social-media-card-image/ "blog.master.dev") — Chris digs into how links unfurl across Discord, X, Slack, Bluesky, iMessage and more, and argues most dynamic social cards waste the image by just restating the title and description. Then he shows what _should_ go on it instead.

Chris Coyier

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/2883b63b.png)](https://www.meticulous.ai/?utm_source=frontend_focus&utm_medium=newsletter&utm_campaign=26q3_3&utm_term=primary+content)

[Would You Let Your AI Agent Grade Its Own Homework?](https://www.meticulous.ai/?utm_source=frontend_focus&utm_medium=newsletter&utm_campaign=26q3_3&utm_term=primary+content "www.meticulous.ai") — Agents write code faster than ever. They even review their own work. But who’s reviewing them? Dropbox, Notion & ElevenLabs don’t take the risk. With Meticulous, every change is exhaustively verified, with zero developer effort.

Meticulous

⚡️ IN BRIEF

-   🎉 [CSS-Tricks](https://css-tricks.com/), after a spell under the ownership of DigitalOcean, is [independent once again](https://css-tricks.com/css-tricks-has-a-new-owner/) under the stewardship of editor [Geoff Graham](https://bsky.app/profile/geoffgraham.me).
    
-   🦊 [Firefox 159](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/159) enables scroll-driven animations by default, so they now work in all major engines. It also adds scoped custom element registries.
    
-   🪪 Since Chrome 155, sites can [use the Digital Credentials API to offer credentials](https://developer.chrome.com/blog/digital-credentials-api-issuance?hl=en), such as digital IDs, to a compatible wallet app on the user's phone.
    
-   ⚙️ W3C has launched [a polyfill pilot for WebMCP](https://www.w3.org/blog/2026/w3c-launches-second-pilot-of-program-to-support-open-source-projects/), a JavaScript API that exposes web app functionality as agent-callable tools.
    
-   🌅 The [Arc browser is being sunset](https://arc.net/) this December, and [Dia is suggested](https://www.diabrowser.com/) as a viable alternative. [Zen](https://zen-browser.app/) is another, non-Chromium variant.
    
-   📺 Firefox has [▶️ a new ad with various 'meme icons'](https://www.youtube.com/watch?v=E2AoYIKwJqM) from years gone by (Numa Numa Guy kicks things off).
    

📙 Articles, Opinions & Tutorials

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793184512/znxptwkdwyktd3mp9ul6.png)](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/)

💡 [Safari 27.2 followed days later](https://webkit.org/blog/18515/webkit-features-for-safari-27-2/), adding `::field-content` for styling a customizable select's displayed text, and renaming Grid Lanes' `flow-tolerance` to `fit-tolerance`.

[Performance Budgets Need a Representative Worst](https://csswizardry.com/2026/10/web-perf-wednesday-014-performance-budgets-need-a-representative-worst/ "csswizardry.com") — Harry revises his own long-standing advice: a budget set from your single worst result lets one outlier hide real regressions, so start from a _representative worst_ (P90 or P95 of recent data) instead. A spreadsheet template is included.

Harry Roberts

▶  [The Most Vulnerable Week in Internet History](https://www.youtube.com/watch?v=SMGg7iisHmc "www.youtube.com") — A fast recap of a rough security week: PHP2Shell (a pair of PHP engine bugs allowing unauthenticated RCE), a backdoored LiteLLM release, a CA with private keys that were numbers under 256, and more.

Fireship

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793183383/ema2hdklrxos6pdignjh.png)](https://blog.master.dev/building-an-isolated-preview-for-ai-generated-html/)

[Building an Isolated Preview for AI-Generated HTML](https://blog.master.dev/building-an-isolated-preview-for-ai-generated-html/ "blog.master.dev") — Any app that lets a model generate UI has to render the HTML it hands back. Keshav builds five demos showing how a preview can be attacked, then hardens it with iframe sandboxing, CSP and a carefully checked `postMessage` handler.

Keshav Malik

🖨️ [Websites Should Be Printable](https://brennenputh.me/blog/printable-websites/ "brennenputh.me") — Brennen printed his own site, didn't like the result, and walks through the print stylesheet changes that fixed it: a hidden header, 12pt type, and black links.

Brennen Puth

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793184989/nryxba3xm0aht3jljc6s.png)](https://titleart.dvy.io/)

[TitleArt: Make Text Like It's 1997](https://titleart.dvy.io/ "titleart.dvy.io") — Aww yeah, a big dose of nostalgia for users of Microsoft Office back in the 90s. Every classic WordArt style, shape and 3-D effect recreated in the browser.

Davey Barker

🌿 ...and finally

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793190565/zohucuqx7kxulvrhjibg.png)](https://charliegerard.dev/blog/overgrown-extension/)

[Overgrown: When Plants Invade Your Abandoned Tabs](https://charliegerard.dev/blog/overgrown-extension/ "charliegerard.dev") — Leave a tab unread too long and this Chrome extension has vines grow across it, until you work your way back in with a machete, chainsaw or flamethrower(!). It's not on the Web Store, so load it unpacked from the [repo](https://github.com/charliegerard/Overgrown).

Charlie Gerard