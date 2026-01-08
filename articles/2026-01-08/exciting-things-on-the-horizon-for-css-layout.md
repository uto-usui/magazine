---
title: "Exciting Things on the Horizon For CSS Layout"
source: "https://css-irl.info/exciting-things-on-the-horizon-for-css-layout/"
publishedDate: "2020-05-01"
category: "css"
feedName: "CSS IRL"
---

![a stylized grid illustration](https://css-irl.info/exciting-things-on-the-horizon-for-css-layout.svg)

This past week has brought a few announcements from browser vendors of some exciting things that might have a big impact on CSS layout in the very near future.

## Chrome previews a new Grid inspector

I’ve long been a fan of Firefox’s Grid inspector. Other browsers just don’t come close when it comes to debugging CSS layout - until now.

This week Chrome teased us with a sneak-preview of a brand new Grid inspector, which might even rival Firefox’s. No more squinting and counting line numbers – Chrome’s inspector shows them to you! Although I’m a Firefox girl at heart, I’ll still be giving it a whirl – and it’ll certainly make debugging in Chrome easier.

From Twitter:

> It's almost here: CSS grid tooling! 🤘
> 
> Over the last couple of months, we teamed up with [@EdgeDevTools](https://twitter.com/EdgeDevTools?ref_src=twsrc%5Etfw) to work on this highly-requested feature. Here is a sneak preview.
> 
> We have many more ideas on how to make grids easier and more accessible in the future – stay tuned! [pic.twitter.com/b3u4XaEkzv](https://t.co/b3u4XaEkzv)
> 
> — Chrome DevTools (@ChromeDevTools) [April 29, 2020](https://twitter.com/ChromeDevTools/status/1255481965995851782?ref_src=twsrc%5Etfw)

## ‘gap’ for flexbox supported in Chrome Canary

Again, Chrome is playing catch-up to Firefox on this one. The `gap` property has been supported in Grid layout for a while (previously `grid-gap`), but now it can be used in flexbox too. This makes building [algorithmic layouts](https://every-layout.dev/blog/algorithmic-design/) a lot easier - no more hacking around with margins.

This is currently behind a flag in Chrome Canary – you’ll need to enable it.

From [Adam Argyle](https://twitter.com/argyleink) on Twitter:

> 🎉 flex that gap in the latest release of Chrome Canary 🎉
> 
> \`\`\`css  
> display: flex; 🦾  
> gap: 1ch; 🔥  
> \`\`\`
> 
> early adopters:  
> help us test it out won't ya!?
> 
> note:  
> requires web experiments enabled, visit chrome://flags/[#enable](https://twitter.com/hashtag/enable?src=hash&ref_src=twsrc%5Etfw)\-experimental-web-platform-features in Canary to enable [pic.twitter.com/lG3WusFA4X](https://t.co/lG3WusFA4X)
> 
> — Adam Argyle (@argyleink) [April 27, 2020](https://twitter.com/argyleink/status/1254794309263491072?ref_src=twsrc%5Etfw)

## Masonry in Firefox Nightly

This is a big one, and kind of blindsided me. [Masonry layouts](https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/) are something which, as a developer, I’m asked to implement _all_ the time, but which are (currently) only possible using Javascript. There are some ways you can _kind of_ do a similar thing with pure CSS [(here’s one)](https://codepen.io/michellebarker/pen/mdyYxGG), but all of them have their limitations, such as requiring a fixed height on the parent container, or knowing the height of your grid items in advance.

To be able to do this in CSS has always felt like a distant dream. But [Miriam Suzanne](https://twitter.com/MiriSuzanne) just announced that masonry grids are being tested in Firefox Nightly!

> — \[Mia | Miriam\] Suzanne? (@MiriSuzanne) [April 29, 2020](https://twitter.com/MiriSuzanne/status/1255567501359853570?ref_src=twsrc%5Etfw)

It’s still likely to be a long road to widespread browser support – we’re still waiting on other browsers to follow Firefox’s lead and work on [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid) support, six months down the line. But I really think this has the potential to be a game -changer – almost as much as subgrid. In fact, I would say that I need to build masonry layouts more often than I build layouts that would require subgrid, given that I can usually work around the lack of subgrid support with nested grids and a bit of maths (although it’s far from ideal).

It’s great to see the kind of progress being made on CSS layout. Let’s hope these features become mainstream soon!