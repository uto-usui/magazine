---
title: "Mockup viewer bookmarklet"
source: "https://lea.verou.me/2009/03/mockup-viewer-bookmarklet/"
publishedDate: "2009-03-18"
category: "css"
feedName: "Lea Verou"
---

## Mockup viewer bookmarklet

I usually view mockups in a browser, so that the impression I get is as close as possible to reality (I learned this the hard way: A mockup that seemed great in the neutral and minimalistic environment of a picture viewer, ended up looking way too fancy when viewed in a browser, something that I realized after having worked for 6 months on the site). If you do the same, I’m sure you’ll feel my pain: Every time I do that, I have to carefully scroll down just as much as to hide the margin that the browser adds, and left just as much as to center the image. Not to mention the click required to enlarge the image to full-size.

Not any more! I was so fed up today, that I wrote a little bookmarklet that does this. It enlarges the image to full size, removes the margins and scrolls the page left so that the image is centered. It works on any recent browser I’ve tested, and I think it will probably work in most browsers that web designers use (hint: not old IEs) :P

Enjoy.

Mockup viewer

JS code:

```
(function(){
	document.body.style.margin = 0;
	var inner = window.innerWidth || document.body.clientWidth, img = document.getElementsByTagName('img')\[0\];
	img.removeAttribute('width');
	img.removeAttribute('height');
	document.body.scrollLeft = (img.offsetWidth - inner)/2;
})();
```

If only it could also write the XHTML & CSS for the site… :P