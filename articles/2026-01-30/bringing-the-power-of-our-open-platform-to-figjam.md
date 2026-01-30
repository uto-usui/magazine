---
title: "Bringing the power of our open platform to FigJam "
source: "https://www.figma.com/blog/bringing-the-power-of-our-open-platform-to-figjam/"
publishedDate: "2021-08-24"
category: "design"
feedName: "Figma Blog"
---

_We are opening up our platform and inviting all builders to create the first plugins and widgets for [FigJam](https://www.figma.com/figjam/). Check out our [documentation](https://www.figma.com/plugin-docs/figma-figjam-plugins/) to start building new plugins or republishing your existing Figma plugins for FigJam._

_And to everyone who's excited to use these community-built plugins and widgets: they're now live. Check out the full details [here](https://www.figma.com/blog/introducing-new-figjam-prices-and-a-more-open-platform/)_

_._

Two years ago, we launched [plugins in Figma](https://www.figma.com/blog/plugins-are-coming-to-figma/)

to help teams fully connect their workflows, bring in real data, and further automate their design process within Figma. Our team was thoughtful about making this API approachable from the start—we knew designers and developers were excited about customizing their workflows, and we didn’t want the learning curve to feel prohibitive. That’s why one of our primary principles when building our plugin API was, “if you can build a website, you should be able to make a plugin.” If you know simple JavaScript and HTML, that’s enough to get started.

Today we’re bringing our open platform to FigJam with those same principles in mind. And because FigJam is all about jamming together, we’re taking it one step further by making sure our platform supports more collaborative use cases.

Plugins can be tremendously powerful for automating individual workflows, like turning a CSV into a grid of sticky notes or adding tags to sticky notes to help with synthesis. But for a collaborative tool like FigJam, we knew builders would also want an API that could enable collaborative and interactive experiences—from voting, to polls, to on-canvas games. That’s why we’re also releasing an API for building custom interactive widgets that teams can drag and drop directly into their boards.

Unlike plugins, the widget API is a declarative and functional API. It lets you define how your widget looks using a set of components (`<Frame/>`, `<Rectangle/>`, `<Text/>`, `<SVG/>` etc.) and add event listeners that can run arbitrary code on user interaction, such as click events. It also allows you to have custom in-line property menus just like native FigJam objects.

JavaScript

```
// This widget consists of an auto layout frame and a number that increments 
// when a user clicks on it.

const { widget } = figma;
const { Frame, Text, useSyncedState } = widget;

function SimpleCounter() {
  const [count, setCount] = useSyncedState('count', 0);
  return (
   <Frame
      direction='horizontal'
      horizontalAlignItems='center'
      verticalAlignItems='center'
      height='hug-contents'
      padding={{ left: 16, right: 8, top: 8, bottom: 8 }}
      fill='#FFFFFF'
    >
      <Text onMouseDown={() => setCount(count + 1)}>{String(count)}</Text>
    </Frame>
  );
}

widget.register(SimpleCounter);
```

But similar to plugins, flexibility isn’t all we had in mind—we wanted to make sure widgets would be equally straightforward to build. We modeled this API after React and used a set of components that map to FigJam layers, but more closely match the properties of CSS. This means if you’re familiar with React you can immediately start building, even if you don’t have much prior knowledge of FigJam or Figma.

You might be wondering what you can actually build for FigJam, and which types of plugins and widgets our users have been asking for. We have worked with a small group of builders to test our plugin API, and talked to several users about the widgets and plugins that would help them most.

## [Create plugins that speed up your workflows](#create-plugins-that-speed-up-your-workflows)

Plugins are all about automating your workflows, allowing you to spend less time on menial tasks, and more time jamming with your team on ideas.

There are a few types of plugins that users are eager to use in FigJam:

-   **Organization and synthesis:** Build plugins to organize, synthesize, and extract insights from objects on their boards. For example, you can sort sticky notes based on color, add tags for categorization, or extract themes from stickies via word clouds. We have several of these in the works—[Alex Einarsson](https://www.figma.com/@ae) is building a stamp counter plugin to help you count votes, and [Daniel Destefanis](https://www.figma.com/@daniel) is building a plugin that lets you create stickies from text.
-   **Task automation:** Make everyday tasks faster and easier. From spell check, to find and replace, to automatically creating 100 pink stickies, plugins can help users complete manual tasks in just a few clicks. We are very excited that [Tekeste Kidanu](https://www.figma.com/@tkmadeit) is bringing his popular [spell checking](https://www.figma.com/community/plugin/754026612866636376/SPELLL---Spell-Checking-for-Figma) plugin to FigJam.
-   **Content libraries:** Import data from other tools and create objects on your boards. The Figma Community already has several plugins in the works that will give users quick access to icons, emojis, company logos, and more. The team at [Icons8](https://www.figma.com/@icons8) will be bringing over their two plugins for [Icons8](https://www.figma.com/@icons8) and [Material Design](https://www.figma.com/community/plugin/740272380439725040) icons, [Vjacheslav Trushkin](https://www.figma.com/@cyberalien) is bringing over the [Iconify](https://www.figma.com/community/plugin/735098390272716381/Iconify) plugin, and [Amin Kasimov](https://www.figma.com/@amin) is bringing over the [Brandfetch](https://www.figma.com/community/plugin/733590967040604714) plugin.
-   **Customization:** Enable users to select custom colors, fonts, or text styles. While we’ve intentionally kept fonts and colors in FigJam simple, we know this is a top user request. The [Brandfetch](https://www.figma.com/community/plugin/733590967040604714/Brandfetch) plugin offers quick re-theming of FigJam objects into a brand’s colors. And [Jordan Singer](https://www.figma.com/@jordan) of [Tricycle](https://tricycle.ai/) is working on a FigJam LayerJam plugin, which will provide a layer panel in FigJam.
-   **Custom templates:** Create custom, browsable template libraries that are specific to your company and brand, and private to your organization or team.

These are just a handful of examples—we have 35 builders who have FigJam plugins already in the works, and we are so excited for you to join them.

Plugins are perfect for single-player use cases, since they run individually for each user in a file. If you’re looking to build a more collaborative experience that users can interact with together, you should consider building a widget. You can think of widgets as native FigJam objects—similar to sticky notes, shapes, and connectors—except they’re custom, and built by you.

From conversations with users, we know that they’re most excited about the following types of widgets:

-   **Facilitation:** Make it easier to engage everyone in group settings. Build widgets for voting or polls to make sure everyone’s voice is heard.
-   **Games and play:** Use cards, dice, spinners, and other games to get everyone energized. Teams are more productive when they’re feeling engaged, creative, and connected.
-   **Interactive diagrams:** Speed up diagramming by directly clicking on the canvas to add branches to mind maps, org charts, and more.
-   **Note-taking:** Build notepads that everyone can contribute to so you can more easily capture notes and action items. And power them up with support of Markdown and LaTex rendering.
-   **Data visualization:** Better visualize the themes from your brainstorms or votes from your workshop with interactive charts and graphs directly on the canvas.

We have been building widgets internally for the past few weeks and are excited to start opening up the API to the first external builders to see what you come up with. [Keeyen Yeo](https://twitter.com/keeyeny), a product designer at Figma, has been playing around with a photo booth widget, and I’m personally excited to play a game of tic-tac-toe with my team in FigJam.

## [Getting started](#getting-started)

With FigJam, we set out to build a better way to brainstorm with your team, and we can’t wait for the community to build on this foundation.

You can check out [these examples](https://github.com/figma/plugin-samples#figjam-plugins) and start building plugins for FigJam today. Our [API documentation](https://www.figma.com/plugin-docs/figma-figjam-plugins/) also includes information on how you can re-publish any existing Figma plugins to FigJam—for many plugins this should only require a one-line addition to your manifest.