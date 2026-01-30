---
title: "Automate work. Bring in real data. Extend what’s possible with Figma Plugins. "
source: "https://www.figma.com/blog/introducing-figma-plugins/"
publishedDate: "2019-08-01"
category: "design"
feedName: "Figma Blog"
---

I’m excited to introduce plugins to the entire Figma community, alongside hundreds of creators who’ve built and published plugins during [our beta](https://www.figma.com/blog/plugins-are-coming-to-figma/)

. Today, the gates are open for anyone to use these [plugins built by our community](https://www.figma.com/c/) and [build your own plugins](https://www.figma.com/plugin-docs/) tailored to your workflow.

I’ve spent the majority of my professional career working on tools that allow other people to create things. Empowering other people to be creative is fun for me, and working on extensibility architectures is an even more fun version of that.

Plugins were always in our future at Figma, but we wanted to do things differently with our platform architecture. Plugins are critical components to a designer’s workflow that can serve as little power-ups and help extend Figma’s product functionality. However, as important as they are, design plugins to date have not yet met the call of duty. We saw two primary problems:

1.  Although designers rely on plugins, design plugins are not always reliable or secure. This is because they’re often built on not fully-supported APIs.
2.  Designers are at the mercy of others to build plugins for them, unless they themselves know how to code. And getting engineering resources is never easy.

Fortunately, I got to work with super talented engineers and powerhouse plugin developers from our community to help figure out these challenges. We wanted our plugins to be secure, stable, and performant, of course. But we also wanted Figma plugin programming to feel like web programming. Our internal motto is: “If you can code a webpage with basic HTML and JavaScript, you can build a Figma plugin.”

It turns out that there were a lot of technical challenges to make this happen (which we will cover in a later engineering blog post). We also had to figure out—for the first time in the design tooling space—what a plugin architecture looked like for a web-based platform. But in architecting our plugins platform in this manner, our hope was that these upfront investments would allow more plugin creators to build more creative, interesting plugins.

> Figma plugins make it easy to advocate for myself and others by giving me the ability to create the design tools we need, rather than crossing our fingers and hoping someone else will make them for us.

Tiffany Chen, UX Designer at Microsoft

After just 6 weeks in beta, we now have over 40 public plugins available to the Figma community—with more added every day. You can browse all plugins right in the Figma product. Installing a plugin takes one click. In your design file, just right click to pull up all the available plugins.

For customers on the [Figma Organization](https://www.figma.com/organization/) plan, you can also build and distribute private plugins to all the users at your company. Admins can even curate a list of plugins their users have access to and install plugins on their behalf.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACA0lEQVQ4y52TS2taQRiG58cJ/gu3IrhPNopirEYX1UZxIxbBy8L7raHQxCg24sJVjy6UFPGuMdpgvRw9+nZmwpGTTakdeJgZvpl3vm9mXmI2m+HxeOD1euF0OmGz2U44HA74/X6kUinkcjlks1lOPp9HoVCgfOF9JpNBIBCAyWQGMRgMSKfTaDQaaLVa72i32+h0OhgMBhgOh7xnjEYjTCYTjMZjDMcj9Pp9lMtlfLDZQTQaDRKJBKbTKTabDbbb7TtEUcRut8N+v+dIkoTj8QjW9gcJG3GL36sVarUaLi4uQVQqFYLBID9xvV5jRYOsl5EPkYWZ4OFw4KJ7Ot7Q2HK5RKVSgU6nA1Gr1QiHw5gvFnyxMhtlVkqYIEc68Dk7sFqtQq/Xg2i1WmRzeSx+vdLNEhc4bfgLSnGWRL1eh9FoBLmyWlF8KPEMWVn/KijDSmeCgvADn9wuEPY9HkpFKvgCcSeeLv0cWBKNhoCbGzeI5cqCu+I3zObP2NIXY2X/j6AgCHC5PoJYacn393eYzZ75i7L05VLOFXS7aYaO62tUSiW8zudvX4MGj2cIssauqdlscrcRu92Or7e3+Pn0hF6vh263y2Fj2SFKlyiRY33qlMfH72+Pwqzn8/kQi8U4kUgEoVAI0WgU8Xic+ziZTHKYo2TYnMWYbZPJBD4H/LBaTPgDRu+dZkbYGZEAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/e6fecbdfd7414b860abaf1123a82bbc02da6fcd2-1966x1286.png?w=804&h=526&q=75&fit=max&auto=format)

So, let’s meet some of these plugins, shall we? (It was nearly impossible to select the plugins to feature in this post. We will continue to feature more over the coming weeks!)

## [Utility plugins that help automate repetitive tasks](#utility-plugins-that-help-automate-repetitive)

Working in a design tool every day can cause some pixel-pushing pain. To help reduce the pain, utility plugins remove a lot of the manual work.

[**Similayer**](https://www.figma.com/c/plugin/735733267883397781/Similayer/)

Creator: David Williames, Senior Product Designer for the Australia Post app

With five Figma plugins published and more in the works, David Williames is building useful tools to give back to the design community, as he himself received a lot of support and encouragement early on in his career. His plugin, Similayer, selects all layers with similar properties, allowing you to easily batch edit them.

[**Super Tidy**](https://www.figma.com/c/plugin/731260060173130163/Super-Tidy/)

Creator: Ismael González-Nicolás, Product Designer at Cabify

Ismael González-Nicolás has built two incredibly useful plugins for the community—Super Tidy and Content Buddy. Super Tidy renames your frames and reorders them in the layers list, so everything stays organized.

## [Generative plugins that bring in beautiful, contextual visuals](#generative-plugins-that-bring-in-beautiful)

[**Unsplash**](https://www.figma.com/c/plugin/738454987945972471/Unsplash/)

Creator: Liam Martens, in collaboration with Kirill Zakharov at Unsplash

If you love Unsplash and Figma, this is the plugin for you. Now, you can insert Unsplash images right into your Figma files. Make sure to [check out Unsplash’s blog post](https://medium.com/unsplash/unsplash-figma-cf03195e9f9a) about how they’re simplifying their design workflow with plugins.

[**Content Reel**](https://www.figma.com/c/plugin/731627216655469013/Content-Reel/)

Creator: Microsoft

Every design needs relevant content and visuals. Built by Microsoft (shout out to Eugene Gavriloff), Content Reel lets you search for relevant assets and populates your designs with texts, avatars, and icons.

## [Accessibility plugins that flag errors designers can’t see](#accessibility-plugins-that-flag-errors-designers)

[**Contrast Checker**](https://www.figma.com/c/plugin/732603254453395948/COntrast-Checker/)

Creator: Stark

The very popular contrast checker is now available in Figma, thanks to Michael Fouquet. Stark ensures your colors, visuals, and typography are readable, legible, and have enough contrast.

[**Color Blind**](https://www.figma.com/c/plugin/733343906244951586/Color-Blind/)

Creator: Sam Mason de Caires, UX Engineer at Cloudflare

Color Blind is a plugin that lets a designer see their design through the lens of the 8 different types of color vision deficiencies. Sam’s a big proponent of fostering more empathy between designers and the users they design for. Color Blind certainly does just that.

## [Design systems plugins that help designers access and adhere to their libraries](#design-systems-plugins-that-help-designers-access)

### [Microsoft Theme Switcher](#microsoft-theme-switcher)

Creator: Jackie Chui, UX Designer at Microsoft

You won’t be able to find Theme Switcher available as a public Figma plugin because this is built just for Microsoft. Theme Switcher is a private Microsoft plugin that allows their designers to switch between their multiple product themes. Any Figma customer on the [Organization plan](https://www.figma.com/organization/) can also build private plugins, too.

[**Themer**](https://www.figma.com/c/plugin/731176732337510831/Themer/)

Creator: Tom Lowry, Designer Advocate at Figma

Built by Figma’s very own Tom Lowry, Themer is a plugin that enables designers to swap between multiple published styles easily. For example, you can swap between dark mode and light mode in a click.

## [Data population plugins that add real content and data](#data-population-plugins-that-add-real-content-and)

[**Mapsicle**](https://www.figma.com/c/plugin/736458162635847353/Mapsicle/)

Creator: Chris Arvin, Product Designer at Remix

If you’re like Chris, you work with maps every day. Maps are often a critical part of your product or website, but constantly grabbing screenshots of maps is no fun. Now with Mapsicle you can insert relevant maps into Figma designs and edit in-line.

[**Brandfetch**](https://www.figma.com/c/plugin/733590967040604714/Brandfetch/)

Creator: Brandfetch

How many times have you googled a company logo? Brandfetch now eliminates that step. With this plugin, you can search and insert the logo you’re looking for all without leaving Figma.

## [Plugins that bring designs to life right in Figma](#plugins-that-bring-designs-to-life-right-in-figma)

[**Roto**](https://www.figma.com/c/plugin/733184376355671573/Roto/)

Creator: Carlo Jörges, Lead Product Designer at Facebook

Turning 2D shapes into 3D objects can get tricky. Roto can help. Built using [three.js](https://threejs.org/), an open source 3D JavaScript library, Roto lets you manipulate the angle, depth, or perspective distortion of a shape.

## [The biggest thank you](#the-biggest-thank-you)

None of this would be possible without our beta customers. So a special heartfelt thanks to all the creators who’ve built and published plugins for the Figma community:

Ahamad Al Haddad, Coinbase, Gleb, Brandfetch, Jenil Gogari, Pavel Kuligin, Sam Mason de Caires, David Williames, Kate Miller, Ismael Gonzalez, Microsoft, Zeh Fernandes, Liam Martens, Kazushi Kawamura, Nitin, Tiffany Chen, Vjacheslav Trushkin, Matt DesLauriers, Pavel Laptev, Chris Arvin, Maxime De Greve, Canva Design, Rodrigo Soares, Carlo Jörges, Michael Fouquet, Ismael Gonzalez, Tom Lowry, Jordan Singer, Denis Rojčyk

Now, go [check out all the other plugins](https://www.figma.com/c/), or [build your own](https://www.figma.com/plugin-docs/). We can’t wait to see what you create.