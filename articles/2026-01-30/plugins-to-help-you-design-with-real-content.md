---
title: "Plugins to help you design with real content"
source: "https://www.figma.com/blog/plugins-to-help-you-design-with-real-content/"
publishedDate: "2019-08-23"
category: "design"
feedName: "Figma Blog"
---

At one point or another, we've all reached for 'Lorem Ipsum' text as placeholder content in a design (there is a plugin for that!), but sometimes having real (or more realistic) data can help stress test a design or provide a more accurate depiction of what your UI will actually look like—especially when the data is your own! Content can be anything from names, phone numbers and addresses to user-avatars and other imagery. Adding or updating content across a complex design can also be time-consuming if you have to manually populate dozens of text boxes across your document. Paste-no-more! In this article, we'll cover some of the most useful data population plugins that will help you design with real content and save time to boot!

## [Google Sheets Sync](#google-sheets-sync)

Creator: [David Williames](https://twitter.com/DavidWilliames)

[Google Sheets Sync](https://www.figma.com/c/plugin/735770583268406934/Google-Sheets-Sync/) does exactly what you think—it lets you sync data in a spreadsheet to elements in your design. The setup is easy: create a Google Sheet with a shareable link, and make a column for every type of data that you want. Each column should have a unique header (ex: Name, Address, Country). In Figma, name your layers with a # followed by the column header from the sheet (ex: #Name, #Address, #Country). Then launch the plugin, enter your shareable URL, and hit the "Fetch & sync" button. And voila—your entire design is populated in seconds. Google Sheets Sync is also really handy because you can still manage your data with all of the benefits and features of a spreadsheet; making it a breeze to leverage formulas or make updates down the road. As an added bonus, you can also include a URL with images in your columns; so if you want to populate a shape with an image fill, just name the layer the same as you would for a text layer and the plugin will take care of the rest.

## [Unsplash](#unsplash)

Creator: [Liam Martens](https://twitter.com/LiamMartens9512), in collaboration with [Kirill Zakharov](https://twitter.com/kirillz) at [Unsplash](https://unsplash.com/)

It's hard to think of a better place to find beautiful photography on the web—[Unsplash](https://www.figma.com/c/plugin/738454987945972471/) has over a million high resolution images (free for personal and commercial use) from some of the world’s most generous photographers. Need some amazing imagery for your project? Simply launch the plugin then choose from a predefined category, a randomly selected image, or search the collection for that perfect image. By default, the plugin will insert a high resolution photo onto the canvas. You can also insert photos as image fills by pre-selecting all of the elements you wish to apply the fill to.

## [Data Lab](#data-lab)

Creator: [Pavel Kuligin](https://twitter.com/pavelkuligin93)

[Data Lab](https://www.figma.com/c/plugin/740286071386014712/Data-Lab/) is a plugin that lets you populate textual content using simple variables that you can combine into a single string and customize formatting. It comes with formatting for numbers, names, dates, telephone numbers, emails and lists (that use comma-separated values). For example, if you wanted a name, followed by an email address, separated by a middle-dot, you could input the following: `{NAME} · {EMAIL}`. Data Lab is dead simple to use and looks to have an exciting roadmap with more features down the road.

## [Content Reel](#content-reel)

Creator: [Microsoft](https://www.figma.com/c/org/588096576863690753/)

[Content Reel](https://www.figma.com/c/plugin/731627216655469013/Content-Reel/) is another option that enables you to quickly insert text-based content into your designs. Out of the box, it’s loaded with names, phone numbers, US addresses, numbers, emails, URLs, companies, usernames, and countries. One of the coolest features of the plugin is that many of the data types are customizable via a drag-and-drop UI. Want to change how an address is formatted? Simply enable the attributes you want to include, and drag them into the desired order. You can even control the placement of the commas. Content Reel also gives you easy access to the Segoe MDL2 icon library (but make sure you install the [Segoe icon-font](https://docs.microsoft.com/en-us/windows/uwp/design/style/segoe-ui-symbol-font#how-do-i-get-this-font) to use them). The developers also plan to support image-based content for things like user-profile images in a future release. As an added bonus, one of the features I like most about this plugin is the compact mode which allows you collapse the UI into a small panel that you can leave open as you’re designing.

## [Mapsicle](#mapsicle)

Creator: [Chris Arvin](https://twitter.com/chrisarvinsf)

[Mapsicle](https://www.figma.com/c/plugin/736458162635847353/Mapsicle/) is a feature-packed plugin that allows you to add [Mapbox](https://www.mapbox.com/) maps right into your design. To use it, simply select an element, launch Mapsicle, configure the map to your liking, and hit the "Create map" button to add it as an image fill to the element. To make the most of this plugin, you will want to have an [access token from Mapbox](https://docs.mapbox.com/help/glossary/access-token/), especially if you have defined your own map themes within Mapbox. In addition to being able to use your own themes, the plugin comes with support for default themes like Light, Dark, Satellite, Streets, and more. For each map, you can also control the zoom level as well as the camera pitch and rotation. Chris has also added some really handy features that allow you to update the size of an existing map without having to reset it each time. For example, you insert your map on a mobile design, and then move onto designing a tablet version—there is an option to "Refresh selected map" which will maintain the same zoom level and update it for the larger dimensions. One added tip—try nesting a map inside a smaller frame. In your prototyping settings you can configure the frame's overflow behavior to "Horizontal & Vertical Scrolling" to give users the ability to pan across the map in both directions inside your prototypes.

We hope that these handy data population plugins help speed up your workflow and enhance the level of accuracy and realism in your mockups. Being able to use your actual data is a great way to stress test your design. It is also a great use-case for private plugins! Have sensitive data? Using your own internal API to deliver actual data in your app? Users on the Figma Organization plan have the ability to author and publish their own private plugins that are specific to their company. With a single click, you can also distribute it to everyone by installing it for all users in your organization. To get started, check out our [Plugin API documentation](https://www.figma.com/plugin-docs/intro/). There is also an online [Slack community of plugin developers](https://figmaplugins.slack.com/join/shared_invite/enQtNjg5NzQ4NTQ4OTAyLWJjOWQyZGRjNmYyZTRmYjk3ZTgzNjJhZTYzZmU5NmJkYzA4MzdjMDFlNzVlM2QwZjhlMGMwMTA5ZWI0N2UxZTA) to connect with too!