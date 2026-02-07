---
title: "Open Sourcing the Remix Store"
source: "https://remix.run/blog/oss-remix-store"
publishedDate: "2025-12-08"
category: "frontend"
feedName: "Remix Blog"
---

Today we are open sourcing the [Remix Store](https://shop.remix.run/). By making the store's source code public, we hope to benefit developers building with React Router as well as developers building Shopify stores.

The Remix Team is an open source team. We work on open source software like [React Router](https://github.com/remix-run/react-router) and [Remix](https://github.com/remix-run/remix). Sometimes we open source [our](https://github.com/remix-run/react-router-website) [websites](https://github.com/remix-run/remix-website) too.

We launched the store [back in May](https://x.com/remix_run/status/1924558330225156190), with the intention of eventually open sourcing it. With something like a store though, where there is a real exchange of money for goods (a novel concept in the open source world), there's plenty of room for abuse if done wrong. After 6 months of running the store, I think we've got everything sorted out to keep our store safe while also allowing anyone to run it locally and poke around/contribute.

As we open up the repo, I wanted to take a moment to share:

-   Who this is for
-   What it takes to launch a store
-   Some cool features worth digging into

If you just want to skip the backstory and dig into the recipe, [check out the source code on GitHub](https://github.com/remix-run/remix-store).

Otherwise, let's dig into the details of procurement requests, spinning hoodies, and the many iterations it took to get things right.

## Who this is for

Before we dig into the technical bits, it's always good to put on our Product Manager hat and consider why we're building what we're building.

Launching a swag store was one of the first things my manager (Michael Jackson) asked me to do when I first joined the Remix Team in 2023. In fact, this wasn't even the first attempt. Digging through some of our old, private repos, I stumbled across this beauty:

![GitHub commit history page for remix-run/swag-store showing early development commits from August 2022, including form components, Dialog, CartItem, and various UI tweaks.](https://remix.run/blog-images/posts/oss-remix-store/old-remix-swag-store.webp)

To put things in context, this first store was started [pre-Shopify acquisition](https://remix.run/blog/remixing-shopify), and well before I joined the team.

After Remix joined Shopify, the reasons to build a store increased, especially with [Hydrogen](https://hydrogen.shopify.dev/) being built on Remix v1-2 (and now React Router). As Michael and I discussed it, we realized that we essentially had 3 audiences. The following comes directly from the internal project I had to set up to convince Shopify to let us use company resources to launch the store (more on that later):

> **Remix Users**
> 
> -   Fans can purchase swag to rep their favorite framework (one of our most frequent requests) and organically advertise our software
> -   Sending "thank you"s to contributors
> -   Streamline sending swag to meetups and conferences
> 
> **Hydrogen Users**
> 
> -   Real-world prod example of a Hydrogen store
> -   Open-sourced for education purposes
> 
> **Shopify Devs**
> 
> -   Real world app to dog-food new Remix and Hydrogen features
> -   Cross collaborate between the Hydrogen and Remix teams to learn from one another
> -   Educate and connect the Remix team better with the core of what Shopify does

The store has now been up for over half a year and we've received and fulfilled over 200 orders. I love [seeing](https://x.com/MichelleBakels/status/1941558260898856982) [people](https://x.com/ryanflorence/status/1976111732369281234) [enjoy](https://x.com/jacobmparis/status/1942228491958677822) and [represent](https://x.com/elithrar/status/1952000448098947093) [our](https://x.com/AlemTuzlak/status/1947363181216571673) [merch](https://x.com/MichelleBakels/status/1988420671077265429). We also have future drops designed and currently being produced, and further improvements planned for our customers (_cough cough_ more affordable international shipping _cough cough_).

We have also been able to use the store to dogfood out new features like [upgrading Hydrogen apps to React Router v7](https://github.com/remix-run/remix-store/commit/6df81c7681092dfc318ccb8889e52a5173ba171e), [middleware](https://github.com/remix-run/remix-store/pull/198), and [React Server Components](https://github.com/jacob-ebey/react-router-rsc-ecommerce).

![Remix Store built on React Server Components example](https://remix.run/blog-images/posts/oss-remix-store/remix-store-rsc-demo.gif)

Jacob Ebey's [reimagining of the Remix Store](https://react-router-rsc-ecommerce.up.railway.app/) using React Server Components

The only thing we haven't done is share the store's source code for React Router and Shopify developers to learn from.

Back when we [open sourced remix.run](https://remix.run/blog/oss-remix-dot-run), I shared this sentiment:

> Personally, I wanted to make open source contributions _years_ before I worked up the courage. While this says more about me than anything, one thing I know that would have made it easier is if I contributed to an open source website vs a library. Why? Because I worked on websites all day long at my job, it's what I already knew. I didn't write libraries. In fact, far fewer web developers write libraries than write websites.

I think this still holds true, and I hope by airing out code I (and Cursor, thanks buddy) wrote for the Remix Store will inspire others. Some of the code is good, some of it is mediocre, some of it is hacky, and some of it was just to get things over the finish line. Take a look at it, judge it, learn from it, improve it.

The store is for developers using React Router and/or building on Shopify. It will eventually be rewritten on Remix 3, and at that point will be for those developers as well.

So [dig in](https://github.com/remix-run/remix-store)!

## What it takes to launch a store

In this section I want to give a bit of the store's history and share what I learned running a mini business inside of a company.

### Using Shopify

I was pretty ignorant about what it would take to launch a store when I first started. I was also pretty ignorant about Shopify and its capabilities. Despite being a Shopify employee, I was very much learning Shopify's platform as I went.

The good news for me was that using Shopify's platform was probably the _easiest_ part of this whole process. For our store, Shopify handles:

-   Inventory management
-   Customer Management
-   Hosting (in our case on [Oxygen](https://shopify.dev/docs/storefronts/headless/hydrogen/deployments))
-   Email marketing
-   Analytics

And a ton more I won't dig into. Using Shopify's platform is probably the most uninteresting part of the journey, because it was the most straightforward. My experience with Shopify was always:

1.  Have a problem or need
2.  Look around in the admin to see if there's a tab for what I need
3.  If step 2 fails, ask [sidekick](https://x.com/BrooksLybrand/status/1955288595507343516)

I am still far from a Shopify expert, and I solved 95% of my issues just doing this with no prior Shopify experience (besides the very basic Shopify store setup they make you do during orientation).

### Adding Tim

I joined Shopify in September of 2023. Despite the store being one of the first big initiatives Michael gave me, I didn't get meaningfully started on it until the Summer of 2024.

The reason for this was pretty simple: I had no design support until then.

With the Remix store, we wanted both our website and our products to be unique and well designed. Our launch video showcases the final product well:

Left to myself, the store would have been generic and the t-shirts even more so. That would have been passable, but it would miss the mark of what we were trying to do with the store (see [the prior section](#who-this-is-for)).

Enter our beloved design and brand extraordinaire, [Tim Quirino](https://x.com/timquirino)! Tim joined our team via [another acquisition](https://x.com/rousseaukazi/status/1798724339841319186). Prior to joining us, Tim had never worked with a developer-heavy, open source team. However, we couldn't have asked for a better fit. Even though Tim has considerable experience designing software products, brand, and merch at Meta & [Threads](https://x.com/threads), he started his career designing merch for bands and record labels.

I was stoked to have Tim on the team, and couldn't wait to start talking about the store with him. In fact, our first Slack messages were about the Remix Store.

![Screenshot of a Slack DM conversation between Brooks Lybrand and Tim Quirino discussing the Remix Swag Store hack day project, with Tim expressing interest in collaborating.](https://remix.run/blog-images/posts/oss-remix-store/tim-brooks-first-message.webp)

### Hack Days project

As hinted at in that Slack conversation, my first attempt to actually build the Remix Store centered largely around seeing if I could trick other people into doing all the work. That's what hackathons and Hack Days are for, right?

I had 12 people sign up to be on my team to build the first version of the store, and I couldn't have been more pleased. This gave Tim very little time to gather the context he needed and design a first version of the store, but he's a professional, so it's fine (I have since grown in my appreciation for how much effort and inspiration goes into the design process).

I'm incredibly grateful to all the Shopify folks who helped out with the project. With little more than the [Hydrogen starter template](https://github.com/Shopify/hydrogen/tree/main/templates/skeleton), we divvied up tasks to see how much we could knock out in 2.5 days.

Some challenges we faced:

-   Tim could not make it in person so we were basically just running with his Figma designs
-   The wifi did not work the first day and kind of worked the second and third days
-   We had a wide variety of skill sets on our team, and I did a terrible job providing structure for effective parallel work

Despite all this, we actually got decently far.

You can try to dig through the git commits if you want, or you can just check out the old [Figma project](https://www.figma.com/design/fbPeXZehszfApKG9r2wbWa/-Deprecated--Remix-Store-V1?node-id=1327-24405&p=f). The first version of the store looked something like this:

![Side-by-side dark and light mode views of v0 of The Remix Store website featuring a mini skateboard banner and six product listings including a jacket, hip pack, shirt, skateboard, notebook, and gel pen.](https://remix.run/blog-images/posts/oss-remix-store/v0-store-mockup.webp)

The visual direction I gave Tim was something along the lines of "retro, digital, music, synth pads, drum machines, color". He did a great job for what I gave him, and I need to stress again, I gave him little and even less time.

### Paying for the store

After the Hack Days project I realized I would actually have to keep building the store on my own (for some reason people from other teams didn't want to endlessly donate extra time to me). I made good progress in implementing what Tim had initially designed while he noodled on product ideas and designs.

We got some feedback from Michael on the design, and went for a less chunky, more sleek feel. You can also check out those [Figma designs](https://www.figma.com/design/fbPeXZehszfApKG9r2wbWa/-Deprecated--Remix-Store-V1?node-id=53-30243&p=f&t=aYzv2vTYd9olg6Bn-0).

![Screenshot of v1 of The Remix Store website in dark mode, featuring a black t-shirt with a colorful Remix logo in the hero section and a shopping cart overlay on the right. The cart contains a shirt, a mini skateboard, and a gel pen, totaling $93.00.](https://remix.run/blog-images/posts/oss-remix-store/v1-store-mockup.webp)

We were feeling pretty good about ourselves, and had some great product ideas in place (pretty much [everything currently listed on the store](https://shop.remix.run/collections/all)). The only thing we needed was some money from Shopify to get the store going.

![Mona-Lisa Saperstein from Parks and Rec saying 'Money pleeeease' while gesturing for money to be given to her.](https://remix.run/blog-images/posts/oss-remix-store/money-pweaz.gif)

Quite reasonably, big companies such as ours don't necessarily just write blank checks when requested, and actually want to know what you intend to do with their resources and how it will support the [underlying mission](https://www.shopify.com/about#:~:text=Making%20commerce%20better%20for%20everyone). In retrospect that's pretty reasonable, but it did require a bit more work internally on our end.

Without boring you with all the inner workings of Shopify (or divulging information I'm probably not legally allowed to share), we basically had to set up an internal project in order to go through the proper procurement process. In general our team is super fortunate to get to run our [own roadmap](https://github.com/orgs/remix-run/projects/5) and leverage [our own processes](https://remix.run/blog/rr-governance), since all of the work we're doing is open source.

With the internal project created and the justifying of our store's existence done, we were able to move forward with the vendor we had selected to run the production and fulfillment side of our store.

### Feedback is a gift

With the Remix Store, we were asking for more resources, and we were also representing Shopify in a new way by putting out a storefront built on Shopify. Understandably, leadership wanted the opportunity to give a little input on the project.

We set up the internal project and got procurement worked out in late October, 2024. However, when we showed off our nearly complete storefront, we received some hard, but needed feedback from one of Shopify's VPs:

> Please push yourself to flex a little more and remember that you are the team that built remix.run which is one of my favorite dev marketing websites that does a great job of telling me what the Remix brand is.

[The Remix homepage](https://v2.remix.run/) is such a delight to scroll through, and did a fantastic job explaining what Remix offered (we're planning to do just as good of a job with the homepage for Remix 3). Basically, what we had created looked somewhat generic and simple, and didn't justify the need to build it as a [custom storefront](https://shopify.dev/docs/storefronts/headless/getting-started).

So we went back to the drawing board.

At this point Tim and I had a lot more experience working together, and instead of painstakingly describing and documenting everything in Figma, Tim was able to leverage another one of his favorite tools: [Framer](https://www.framer.com/).

Tim was able to make a much more [high fidelity prototype](https://many-brand-728778.framer.app/) of the store, which I could then inspect, optimize, and build with Remix and Hydrogen.

The end result is what you see now when you visit [shop.remix.run](https://shop.remix.run/).

![Scrolling through the remix store with the spinning hoodie and large product photos](https://remix.run/blog-images/posts/oss-remix-store/remix-store.gif)

We iterated for another 6 months: finalizing contracts, selecting blanks, adding features, getting feedback, evaluating test prints, and planning our marketing strategy, all culminating in launching the Remix Store on [May 19, 2025](https://x.com/remix_run/status/1924558330225156190).

## Some cool features

There are a lot of little features and animations I'm particularly proud of in this store. I wanted to highlight a few of the fun features and good user experiences we built. This is not a comprehensive walk-through, just a high-level overview and glimpse at the relevant code. Feel free to explore more since, ya know, it's now open source.

### Hero

![3D hoodie spinning in the hero section](https://remix.run/blog-images/posts/oss-remix-store/hero-demo.gif)

-   [See it in action](https://shop.remix.run/) (be sure to scroll)
-   [Check out the relevant code 💻](https://github.com/remix-run/remix-store/blob/96c15c44d2a99250133e89ca92ea016959dab5c7/app/routes/pages/\(%24locale\)._index.tsx#L101-L170)

The hero is one giant scroll-synced experience:

-   The 3D hoodie asset gloriously rotates as you scroll
-   The glowing "Remix" light syncs up with the rotating hoodie and fades out
-   The highlight of "SOFTWARE ..." to "SOFT WEAR..." switches as the hoodie's back becomes visible

The hook `useScrollPercentage` tracks the scroll position and returns a value from 0 to 1, which is then used to drive the state of all the other elements.

The hoodie itself is just 61 different images that we preload and swap out as you scroll, a method we stole from Apple's previous AirPod product page.

```
function Hero() {
  // Pick the frame based on how far you've scrolled
  let frameIndex = Math.min(
    Math.floor(scrollPercentage * 1.5 * assetImages.length),
    assetImages.length - 1,
  );

  return (
    <RotatingProduct
      product={product}
      assetImages={assetImages}
      frameIndex={frameIndex}
    />
  );

  // Inside RotatingProduct: swap frames instead of re-rendering a canvas
  return (
    <>
      {assetImages.map((asset, index) => (
        <img
          key={asset.image.url}
          src={asset.image.url}
          className="absolute inset-0 mx-auto object-cover"
          style={{ visibility: index === frameIndex ? "visible" : "hidden" }}
        />
      ))}
    </>
  );
}
```

![Collection header text duplicating and expanding on the top and bottom as user scrolls](https://remix.run/blog-images/posts/oss-remix-store/collections-exploder-header-demo.gif)

-   [See it in action](https://shop.remix.run/collections/all) (be sure to scroll)
-   [Check out the relevant code 💻](https://github.com/remix-run/remix-store/blob/96c15c44d2a99250133e89ca92ea016959dab5c7/app/components/page-title.tsx)

The collection page's header "explodes" by duplicating the title in five stacked colors, sliding each layer at a different rate as you scroll (thanks again, `useScrollPercentage()`). It's a tiny parallax effect that keeps the heading readable while giving the page motion without video or heavy assets.

```
function PageTitle() {
  let translatePercent = Math.round(Math.min(scrollPercentage * 2, 1) * 80);

  return (
    <div className="font-title relative w-full text-center uppercase">
      <h1 className="relative z-50 bg-black text-white">{children}</h1>
      {["pink", "red", "yellow", "green", "blue"].map((color, i) => (
        <span
          key={color}
          aria-hidden
          className={`text-${color}-brand absolute inset-0`}
          style={{ transform: `translateY(${(i - 2) * translatePercent}%)` }}
        >
          {children}
        </span>
      ))}
    </div>
  );
}
```

### Product image blur loader

![Blurred product image on initial load, revealing the full image once it's loaded](https://remix.run/blog-images/posts/oss-remix-store/product-image-blur-demo.gif)

-   [See it in action](https://shop.remix.run/products/remix-engineering-hoodie) (be sure to refresh the page)
-   [Check out the relevant code 💻](https://github.com/remix-run/remix-store/blob/96c15c44d2a99250133e89ca92ea016959dab5c7/app/components/ui/blur-image.tsx)

On the product pages we request a 32px version of each product image for an instant, blurred preview, then crossfade to the full image once it finishes loading. Shopify's image CDN makes it really easy to request any version of an image you need, which Hydrogen's [`<Image />` component](https://shopify.dev/docs/api/hydrogen/latest/components/media/image) takes advantage of to generate a [`srcset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset) to deliver the appropriate file based on the user's screen size.

```
function BlurImage() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loadState, setLoadState] = useState<"pending" | "loaded" | "error">(
    "pending",
  );

  const previewUrl = data.url.includes("?")
    ? `${data.url}&width=32`
    : `${data.url}?width=32`;

  useLayoutEffect(() => {
    const node = imageRef.current;
    if (!node) return;
    if (loadState !== "pending") return;
    if (node.complete) {
      setLoadState("loaded");
      return;
    }
    node.onload = () => setLoadState("loaded");
    node.onerror = () => setLoadState("error");
    return () => {
      node.onload = null;
      node.onerror = null;
    };
  }, [loadState]);

  return (
    <>
      {/* Blurred preview image */}
      <img
        src={previewUrl}
        alt={alt}
        className={clsx(
          "duration-750 absolute inset-0 size-full object-cover blur-2xl transition-opacity",
          loadState === "loaded" ? "opacity-0" : "opacity-100",
        )}
        draggable={false}
        aria-hidden={true}
      />
      {/* Full image */}
      <HydrogenImage
        ref={imageRef}
        data={data}
        className={clsx(
          "duration-750 relative h-full w-full object-cover transition-all",
          loadState === "loaded" ? "blur-none" : "blur-2xl",
        )}
      />
    </>
  );
}
```

### Optimistic cart

![Optimistic cart UI showing items in the cart before they are added to the database](https://remix.run/blog-images/posts/oss-remix-store/optimistic-cart-demo.gif)

-   [See it in action](https://shop.remix.run/products/load-in-parallel-t-shirt-black) (just add stuff to the cart)
-   [Check out the relevant code 💻](https://github.com/remix-run/remix-store/blob/96c15c44d2a99250133e89ca92ea016959dab5c7/app/routes/pages/\(%24locale\).cart.tsx)

To make sure the cart experience feels snappy and pleasant, we take advantage of Hydrogen's [`useOptimisticCart` hook](https://shopify.dev/docs/api/hydrogen/latest/hooks/useoptimisticcart). The user can rapidly add/remove items from the cart and we show them the most likely end state. To indicate pending updates, we shade prices and update the checkout button's text to "Updating cart...", and then resolve once all `loader`s settle and the latest data is available.

```
function Cart() {
  let cart = useOptimisticCart(rootData?.cart);
  let isOptimistic = Boolean(cart?.isOptimistic);
  let totalQuantity = cart.totalQuantity || 0;

  let lines = cart.lines.nodes;
  let isOptimistic = Boolean(cart.isOptimistic);

  let subtotalAmount = cart?.cost?.subtotalAmount;

  if (!cart) return <EmptyCart />;

  return (
    <>
      {/* ... */}
      {lines.map((line) => (
        <CartLineItem
          key={line.id}
          line={line}
          isOptimistic={isOptimistic}
          className="gap-4"
        />
      ))}
      {/* ... */}
      <Money
        data={subtotalAmount}
        className={clsx("text-base font-bold", isOptimistic && "text-white/50")}
      />
    </>
  );
}
```

### 404/500 glitchy text

![Green "404" made up of numbers that are randomly changing](https://remix.run/blog-images/posts/oss-remix-store/glitchy-text-demo.gif)

-   [See it in action](https://shop.remix.run/blah)
-   [Check out the relevant code 💻](https://github.com/remix-run/remix-store/blob/96c15c44d2a99250133e89ca92ea016959dab5c7/app/components/matrix-text.tsx)

Our error pages render "404"/"500" as a matrix of hex digits. We convert a PNG sprite into a grid of numbers that randomly flip on a timer for a low-fi glitch.

```
const textToImageMap = {
  "404": error404Src,
  "500": error500Src,
  empty: emptySrc,
};

function useMatrixValues(text: TextId) {
  // Loads the image, converts it to a canvas, then processes each pixel
  // to generate a grid of hex characters representing the image brightness
  // Also calculates the scale needed to fit the text to the viewport width
  // Returns: { dataUrl, scale, matrixTextData }
}

function useGlitchText(matrixData: MatrixTextData) {
  // Randomly flips ~8% of the active hex characters on a timer
  // Uses requestAnimationFrame with setTimeout throttling for smooth animation
  // Respects prefers-reduced-motion setting
}

export function MatrixText({ text }: { text: TextId }) {
  const { dataUrl, scale, matrixTextData } = useMatrixValues(text);
  const glitchedText = useGlitchText(matrixTextData);

  return (
    <div>
      {/* Blurred background layer */}
      <div
        className={clsx(wrapperCss, "blur-xl")}
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
          imageRendering: "pixelated",
          backgroundImage: `url(${dataUrl})`,
        }}
      >
        {matrixTextData?.text}
      </div>
      {/* Foreground glitched text layer */}
      <div
        className={wrapperCss}
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
          imageRendering: "pixelated",
          backgroundImage: `url(${dataUrl})`,
        }}
      >
        {glitchedText}
      </div>
    </div>
  );
}
```

## Future improvements and contributing

Like I've said a few times, we're pretty happy with what we've launched. There's still a lot we'd like to do to keep improving it, both in terms of user experience as well as customer experience. In no particular order, we are already planning to:

-   Drop some new products before the end of 2025
-   Update the home page
-   Offer more affordable shipping options for international orders
-   Rewrite the store in Remix 3

That's pretty much it for the story of the Remix Store! If you notice any bugs please [open an issue](https://github.com/remix-run/remix-store) and/or [pull request](https://github.com/remix-run/remix-store/pulls).

Oh also, if you made it this far, feel free to [take 15% off your next order](https://shop.remix.run/discount/OPEN_SOURCE) (code: `OPEN_SOURCE`, available until the end of 2025).