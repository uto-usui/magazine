---
title: "A Designer’s Guide To Eco-Friendly Interfaces"
source: "https://smashingmagazine.com/2026/02/designer-guide-eco-friendly-interfaces/"
publishedDate: "2026-02-23"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Carrie Webster)"
---

-   9 min read
-   [User Experience](https://smashingmagazine.com/category/user-experience), [Design](https://smashingmagazine.com/category/design), [Optimization](https://smashingmagazine.com/category/optimization)

Every high-resolution hero image, autoplay video, and complex JavaScript animation carries a cost. Sustainable UX challenges the era of “unlimited pixels” and reframes performance as responsibility. In 2026, truly sophisticated design is defined not by how much it adds, but by how thoughtfully it reduces its footprint.

I’ve spent over two decades in the trenches of user experience design. I remember the transition from table-based layouts to CSS, the pivot to responsive design when the iPhone launched, and the rise of the “attention economy.” But as we navigate 2026, the industry is facing its most significant shift yet. We are moving past the era of “design at any cost” into the era of **Sustainable UX**.

It’s not something most designers think about, including myself, until I was prompted by hearing about this as a concept. For years, we have treated the internet as an ethereal, weightless cloud. We have assumed that digital products were “green” simply because they weren’t printed on paper. I used to think that too, and before the concept of climate change emerged, it was more about saving trees.

We were wrong. The cloud is a physical infrastructure, a sprawling network of data centres, undersea cables, and cooling systems that hum 24⁄7. While AI-focused data centers match the power [consumption of massive aluminum smelters](https://www.iea.org/reports/energy-and-ai/executive-summary), their high geographic density creates an even more intense and localised environmental strain.

As UX designers, we are the architects of this energy consumption. Every high-resolution hero image, every auto-playing background video, and every complex JavaScript animation we approve is a direct instruction to a processor to consume power. If we want to build a future that lasts, we must stop designing for “wow” and start designing for **efficiency.**

## Dark Mode

In the early 2000s, white backgrounds were the standard because they mimicked the familiarity of paper. However, the hardware has evolved, and our design philosophy must follow. The shift from LCD to OLED (Organic Light Emitting Diode) technology has fundamentally changed how colour impacts energy.

[![Dark mode vs. Light mode.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/1-dark-mode-light-mode.jpg)](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/1-dark-mode-light-mode.jpg)

Dark mode vs. Light mode. (Image source: [Purdue University](https://www.purdue.edu/newsroom/archive/releases/2021/Q3/dark-mode-may-not-save-your-phones-battery-life-as-much-as-you-think,-but-there-are-a-few-silver-linings.html)) ([Large preview](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/1-dark-mode-light-mode.jpg))

### The Logic

Unlike traditional LCD screens, which require a backlight that is always on (even when displaying black), **[OLED screens illuminate each pixel individually](https://www.digikey.cz/en/maker/blogs/2024/oled-vs-led-screens-unveiling-the-illuminating-differences)**. When a pixel is set to true black (`#000000`), that specific diode is turned completely off. It draws zero power.

> [By designing interfaces that favour darker palettes, we aren’t just following a trend; we are physically reducing the energy requirement of the user’s device.](https://twitter.com/share?text=%0aBy%20designing%20interfaces%20that%20favour%20darker%20palettes,%20we%20aren%e2%80%99t%20just%20following%20a%20trend;%20we%20are%20physically%20reducing%20the%20energy%20requirement%20of%20the%20user%e2%80%99s%20device.%0a&url=https://smashingmagazine.com%2f2026%2f02%2fdesigner-guide-eco-friendly-interfaces%2f)
> 
> “

### The Data

The energy savings are far from negligible. A landmark study by **[Purdue University](https://www.purdue.edu/newsroom/archive/releases/2021/Q3/dark-mode-may-not-save-your-phones-battery-life-as-much-as-you-think,-but-there-are-a-few-silver-linings.html)** in 2021, which has become the gold standard for this discussion, revealed that at 100% brightness, switching from light mode to dark mode can save an average of **39% to 47%** of battery power. On a global scale, if every major app defaulted to dark mode, the reduction in grid demand would be astronomical.

### The Design Goal

In 2026, Dark Mode should no longer be a secondary “theme” tucked away in a settings menu. We should be designing with a **“Dark-First”** mentality. This doesn’t mean every site must look like _The Matrix_, but it does mean prioritising high-contrast dark themes as the default system-preferred state. This extends the hardware lifespan of the device and lowers the carbon footprint of every interaction.

I personally prefer Light-Mode for reading, so it makes sense to have both light and dark mode options available. There are also **[accessibility considerations](https://www.cueforgood.com/blog/dark-mode-accessibility-sustainable-web-design/)** with providing both options.

## Image And Video Optimisation

We have become lazy designers. With high-speed 5G and fibre optics, we’ve stopped worrying about file sizes. The **[average mobile page weight has increased by over 500%](https://almanac.httparchive.org/en/2022/page-weight#:~:text=by%20Barry%20Pollard-,Introduction,often%20expensive%20mobile%20network%20access.)** in the last decade, largely due to unoptimized visual assets.

### The Logic

The “Digital Fat” of a website (those 4MB Unsplash photos and 15MB background videos) is the single largest contributor to page-load energy. Every megabyte transferred from a server to a client requires electricity for the transmission, the server’s processing, and the user’s rendering engine. When we use massive files, we are essentially “burning” energy to show a picture that could have been just as effective at a fraction of the size. Not to mention, you are also providing a better user experience with a page that loads much faster.

[![Median page weight by content type.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/2-median-page-weight.png)](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/2-median-page-weight.png)

Median page weight by content type. (Image source: [HTTP Archive](https://almanac.httparchive.org/en/2022/page-weight#content-type-and-file-formats)) ([Large preview](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/2-median-page-weight.png))

### The Data

According to the **[HTTP Archive](https://almanac.httparchive.org/en/2022/page-weight)**, images and video consistently account for the lion’s share of a page’s total weight. However, the shift to modern formats like **AVIF** and **WebP** can **[reduce image weight by up to 50%](https://crystallize.com/blog/avif-vs-webp) compared to JPEG,** without any perceptible loss in quality.

Although these formats are not as familiar to me as JPG and PNG, I am definitely looking forward to using them to reduce page size.

### The Design Goal

I recently led a redesign for a cybersecurity platform. By implementing a “Before and After” audit, we discovered that their homepage was loading 5.5MB of data. By replacing high-res photography with **SVG (Scalable Vector Graphics)** art and using clever **CSS gradients** instead of image assets, we dropped the load to 1.2MB. That is a **78% reduction in energy load!** As a designer, your first question should always be:

> “Do I need a photo for this, or can I achieve the same emotional resonance with code?”

## Intentional Motion: Cutting “Loud” Animations

We live in an era of “**[scroll-jacking](https://www.nngroup.com/articles/scrolljacking-101)**” and complex 3D Parallax effects. While these might win awards on Awwwards.com, they are often ecological disasters.

### The Logic

Animation is not free. To render a complex animation, the device’s GPU (Graphics Processing Unit) must work at high capacity. **[This increases the CPU temperature](https://www.lenovo.com/au/en/knowledgebase/graphics-processing-unit-gpu-a-comprehensive-guide/?org)**, triggers cooling fans (in laptops), and drains battery rapidly. “Loud” animations that run constantly in the background or trigger massive re-paints of the browser are the energy equivalent of leaving your car idling in the driveway.

[![Size comparison of uncompressed JPEG, PNG, WebP, and AVIF photos and text images.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/3-size-comparison-uncompressed-images.png)](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/3-size-comparison-uncompressed-images.png)

Size comparison of uncompressed JPEG, PNG, WebP, and AVIF photos and text images. (Image source: [Photutorial](https://photutorial.com/image-format-comparison-statistics/)) ([Large preview](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/3-size-comparison-uncompressed-images.png))

### The Data

**[Google’s Material Design guidelines](https://m3.material.io/styles/motion/overview)** emphasize “**Meaningful Motion**.” They argue that animation should be used only to orient the user or provide feedback. And using **[WebP instead of JPEG can save 25-50%](https://www.tumwebsme.com/en/customer/blog/green-web-design-sustainable-websites-carbon-footprint-guide)** of data on a page.

### The Design Goal

We must adopt **Meaningful Motion.** If an animation doesn’t help a user complete a task or understand a hierarchy, it is a waste. We should favour **CSS transitions** over heavy JavaScript libraries like GSAP or Lottie where possible, as **[CSS is hardware-accelerated](https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/)** and far more efficient for the browser to calculate.

As a UX designer, I can’t argue this approach. This not only helps reduce data waste but also improves UX for our users.

## Setting A “Data Budget” For Every Project

In my 20+ years of UX, the most successful projects have generally been the ones with the tightest constraints.

> [Just as a project has a financial budget, it should also have a carbon and data budget.](https://twitter.com/share?text=%0aJust%20as%20a%20project%20has%20a%20financial%20budget,%20it%20should%20also%20have%20a%20carbon%20and%20data%20budget.%0a&url=https://smashingmagazine.com%2f2026%2f02%2fdesigner-guide-eco-friendly-interfaces%2f)
> 
> “

### The Logic

A Data Budget is a hard cap on the total size of a page (e.g., “This landing page cannot exceed 1MB”). This forces the design team to make difficult, intentional choices. If you want to add a new tracking script or a fancy font weight, you have to “pay” for it by optimising or removing something else. This prevents “feature creep” from turning into “carbon creep.”

### The Data

The **[Sustainable Web Design model](https://sustainablewebdesign.org/estimating-digital-emissions/)**, developed by pioneers like **[Wholegrain Digital](https://www.wholegraindigital.com/blog/updating-website-carbon-to-v4-of-the-sustainable-web-design-model/)**, provides a formula to calculate the CO2 per page view. The average website produces about 0.5 grams of CO2 per view. For a site with 1 million monthly views, that’s 6 metric tons of CO2 a year, equivalent to driving a car 15,000 miles.

### The Design Goal

**[The Sustainable UX Checklist](https://mangrove-web.com/blog/resources/the-green-ux-checklist/)**

-   **Reduce Images**  
    Question the necessity of every visual and use the smallest resolution and most efficient file formats (like AVIF) to minimize data transfer.
-   **Optimise Video**  
    Eliminate auto-playing media and prioritise highly compressed, short loops to ensure energy is only spent on content the user intends to view.
-   **Limit Fonts**  
    Use a maximum of two web font weights or stick to classic system fonts to remove unnecessary server requests and rendering bloat.
-   **Recycle Assets**  
    Repurpose a single image or video multiple times using CSS filters and overlays to create visual variety without increasing the total page weight.
-   **Choose Green Hosting**  
    Host your digital products on servers verified by **[The Green Web Foundation](https://www.thegreenwebfoundation.org/)** to ensure they are powered by renewable energy sources.
-   **Minimize Data Distance**  
    Select server locations geographically close to your primary audience to reduce the energy required for data to travel through physical infrastructure.

[![Printable Green UX checklist from Mangrove Web](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/4-green-ux-checklist.png)](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/4-green-ux-checklist.png)

Printable Green UX checklist from Mangrove Web. (Image source: [Mangrove Web](https://mangrove-web.com/blog/resources/the-green-ux-checklist/)) ([Large preview](https://files.smashing.media/articles/designer-guide-eco-friendly-interfaces/4-green-ux-checklist.png))

## The Business Case For Eco-friendly Design

Some might argue that “Green UX” sounds like a compromise on quality. On the contrary, it is a competitive advantage. Sustainable design is **performance design.**

When you reduce page weight, your site loads faster. When your site loads faster, your **[Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)** improve. When your **Core Web Vitals** improve, your **SEO ranking** goes up. Furthermore, users on older devices or slower data plans (especially in emerging markets) can actually access your product. This is the definition of “Inclusive Design.”

By cutting the “digital fat,” we create a leaner, faster, and more accessible web. We are moving away from the “disposable design” of the 2010s toward a more permanent, respectful digital architecture.

## Conclusion: The Future Of “Clean” Design

In my two decades of design, I’ve seen many trends come and go. Skeuomorphism, Flat Design, Neumorphism — they were all aesthetic choices. But sustainable UX isn’t a trend; it’s now a necessity. We are the first generation of designers who have to reckon with the physical consequences of our digital work.

Sustainable UX is a “win-win-win.” It’s better for the planet because it reduces energy consumption. It’s better for the user because it results in faster, more responsive interfaces. And it’s better for the business because it lowers hosting costs AND improves conversion rates.

The era of “unlimited pixels” is over. In 2026, the most sophisticated design is the one that leaves the smallest footprint. We are no longer just designers; we are the guardians of the user’s battery, their data plan, and ultimately, the environment.

## The Call To Action

I challenge you to audit just **one page** of your current project today. Use a tool like the **[Website Carbon Calculator](https://www.websitecarbon.com/)** to see its impact. Then, look for the “invisible waste.” Can that image be an SVG? Can that video be a static hero? Can that “loud” animation be silenced?

Start small. The most elegant solution is often the one with the fewest bytes.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)