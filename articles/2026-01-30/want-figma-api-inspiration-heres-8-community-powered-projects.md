---
title: "Want Figma API inspiration? Here's 8 community powered projects"
source: "https://www.figma.com/blog/want-figma-api-inspiration-heres-8-community-powered-projects/"
publishedDate: "2018-04-19"
category: "design"
feedName: "Figma Blog"
---

ICYMI, last month we [released Figma Platform](https://blog.figma.com/introducing-figmas-platform-ee681bf861e7) with the first [Web API](https://www.figma.com/developers/docs?utm_source=figma_blog&utm_medium=link_in_post&utm_campaign=platform_launch) for a professional design tool. We hoped the community would take this project in new directions, but didn’t know what to expect.

Well — your creativity didn’t take long to incubate. Within days, you flooded our Twitter timeline with impressive creations. From style guide generators to Alexa-Echo integrations, people are adapting the API to many workflows.

We wanted to round up some of the coolest projects we’ve seen in the few short weeks since our API launch. Thanks to those of you posting your work on our Show & Tell channel on Spectrum, and special shout out to people open sourcing their projects for others to use.

_Note: The integration creators provided the images and GIFs to Figma._

## [Integrations to excite designers](#integrations-to-excite-designers)

These are the projects people built that can be used right off the bat by others — even those without programming skills. Stick a Figma URL in a website form, and make magic happen (keep in mind these are all 3rd party integrations, so Figma isn’t responsible for permissions’ settings or maintaining the integrations).

### [1\. Figma PDF exporter](#_1-figma-pdf-exporter)

With this new API integration you can export frames in your Figma designs as a PDF. Just select a frame, then copy paste the file URL into [this website form](https://figma-pdf.gweltaz-calori.com/). If you want to build an exporter for yourself, just fork the [open-sourced](https://github.com/gweltaz-calori/Figma-To-Pdf) GitHub project built by [Gweltaz Calori](https://github.com/gweltaz-calori).

### [2\. Style guide generator](#_2-style-guide-generator)

Paste a link to your Figma document on [this website form](https://figstyle.freighter.studio/), and this generator will build a style guide page based on all the fonts, colors and other styles you used. Read more details on how it works here [on Spectrum](https://spectrum.chat/thread/6dc219ab-4e4b-421d-842f-4bccab22652e), from its creator [Liam Martens](https://spectrum.chat/users/liammartens), Founder of Freighter design studio.

### [3\. Alexa integration](#_3-alexa-integration)

While we doubt any designer will actually use Alexa to read comments left on their design (feel free to prove us wrong), this example pushes the limits of what we imagined people building with Figma’s API. And if you hook your Figma account up to a similar voice activated function, show us what you do with it! It was built by Jon Gold, a Design Technologist at Airbnb.

## [Integration inspiration for developers](#integration-inspiration-for-developers)

Are you an engineer wondering where to start with the Figma API? A web-based design API can make it much easier to automate your design-developer handoff. Check out these projects for inspiration.

### [4\. Figma.js](#_4-figma-js)

In addition to an Alexa integration, [Jon Gold built an unofficial](https://www.npmjs.com/package/figma-js) library for using the Figma API in Javascript. The wrapper will help you get started quickly in building JS integrations with Figma. Jon’s wrapper is already being used for other programs, like an [open-sourced GraphQL](https://github.com/braposo/figma-graphql) connector that allows people to write GraphQL queries against the Figma API. The GraphQL connector was made by designer-developer [Bernardo Raposo](https://bernardoraposo.com/) with help from [Sara Vieira](https://iamsaravieira.com/).

### [5\. Syncing Figma designs to React components](#_5-syncing-figma-designs-to-react-components)

One of the API opportunities we are most excited about is the potential for automatically converting Figma to other frameworks. We’re already seeing it: PageDraw introduced a [React integration](https://medium.com/pagedraw/pagedraw-figma-integration-5f99090ec1d4) for others to use, and Sara Vieira, a front end developer from Portugal, built a [way for React components to be rendered directly](https://codesandbox.io/s/3qlk2wk3v5) from a Figma file using the aforementioned GraphQL connector she worked on (💪).

Florian Nagel, software engineer at Candis, also created his own Figma →React converter, and he’s working on open-sourcing it.

### [6\. Volvo Car Mobility](#_6-volvo-car-mobility)

To automate asset delivery, the design and development team at Volvo Car Mobility used the Figma API to simplify their workflow. With custom Slack commands, a designer or developer can initiate the process, and behind the scenes a web service creates a new branch in a GitHub repository.

From there, the web service uses the Figma API to export icons in a specific document with export settings for the frames that contain the icons. The user can view the event log and URL for the branch to create the pull request, all within Slack. Creator: [Volvo Car Mobility team](https://www.media.volvocars.com/global/en-gb/media/pressreleases/202338/volvo-cars-to-establish-new-shared-mobility-business-unit)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAAAxUlEQVQoz42RSRaDIBBEvf8VlXmQwRdQnLJLQV62wdra3/7VDPpVuHFCKu98Trn8chzHfd/vvxliLso6xrkQQmszt4QQtm3rw2U/ZucIoeM4EUJYizEm53xdVwc+zxN7KOPTRCilnFcHa+26rn0YEzFGISRj1VxKpZT23pey97Wx2fuAfTCHcMWlcg5weQRjFMJjK11/wDi00RmfHnX+bqZNHaWhji7d5RXGHFzroVpjBNd+BuNgywIIMFg8tTb1tVNKXe0P3m00O7vM2jMAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/42cb82b6c2ec6314e900005c4135d2cca7018918-1600x790.png?w=804&h=397&q=75&fit=max&auto=format)

### [7\. Figma OAuth2 Strategy for Passport](#_7-figma-oauth2-strategy-for-passport)

If you are using Passport in your Node.js application to authenticate, you can build your service so people can sign in with their Figma identity with [this module](https://www.npmjs.com/package/passport-figma) from [Liam Martens](https://spectrum.chat/users/liammartens) (he also built the style guide generator 🙌).

### [8\. Call the Figma API easily from your language of choice](#_8-call-the-figma-api-easily-from-your-language)

Meanwhile, [David Siegel](https://twitter.com/dvdsgl), co-creator of quicktype, [built an easy way](https://github.com/quicktype/figma-types) for people to call the Figma API from Swift, Objective-C, Flow, TypeScript, JavaScript, C#, C++, Go, Rust, Java, Elm, and Ruby. He generated types and JSON code in all of these languages.

This is only a fraction of the integrations people are producing. It will be interesting to see the scope of these efforts evolve over time, and what role they play in shaping design workflows for both individuals and teams.

We’re going to continue these integration highlights in future round ups, so if you’re working on something cool give us a holler in our [Show & Tell channel](https://spectrum.chat/figma/show-and-tell/) over on Spectrum ! And if you’re looking to get started, [check out our developer documentation here.](https://www.figma.com/developers/docs?utm_source=figma_blog&utm_medium=link_in_post&utm_campaign=platform_launch)