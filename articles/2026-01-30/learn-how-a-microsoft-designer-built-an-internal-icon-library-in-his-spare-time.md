---
title: "Learn how a Microsoft designer built an internal Icon Library in his spare time"
source: "https://www.figma.com/blog/learn-how-a-microsoft-designer-built-an-internal-icon-library-in-his-spare/"
publishedDate: "2018-08-16"
category: "design"
feedName: "Figma Blog"
---

Imagine a world where icons coexist no matter which design tool a UI/UX professional prefers. The icons live peacefully together, properly tagged and classified, easily searchable by everyone.

One designer at Microsoft, [Jackie Chui](https://www.linkedin.com/in/jackiechui/), built this utopia. In three weeks flat, he spun up a browser-based library with the company’s full set of 4,000 icons. He made searching intuitive by including class names for engineers and tags for designers. Engineers can even do a reverse search to grab metadata by pasting an icon into the library.

Perhaps the best feature of them all is cross-tool functionality. Because Jackie’s library runs in the browser, anyone at Microsoft can bring the icons straight into their preferred design tool. No more arguing over which application should rule them all.

If you feel like your icons live in a siloed design nightmare, take a look at Jackie’s pragmatic approach to building a shared icon library.

## [How to set up your own Icon Library](#how-to-set-up-your-own-icon-library)

### [1\. Research the competitive landscape and your users’ needs](#_1-research-the-competitive-landscape-and-your)

First, like any designer worth their salt, Jackie did his preliminary research. He talked to several designers at Microsoft and watched their design processes in action to best understand their icon issues. Next, he looked for existing products on the market.

The best Icon Library with organizing and copy/paste capabilities that he could find was [IconJar](https://geticonjar.com/), but it still lacked several features Microsoft needed:

1.  It didn’t have the ability to share and crowdsource tags. Jackie knew he wanted everyone the autonomy to contribute tags for icons.
2.  It wasn’t browser-based, meaning the icons couldn’t live in the cloud.
3.  It was Mac only — a big turn-off to the company who created Windows.

He decided he’d need to build a tool from scratch to meet the company’s unique needs. He wanted to keep the project a secret and launch it as a fun surprise for his coworkers, so he worked on it after-hours.

### [2\. Design and develop your tool with the wisdom of a designer and engineer](#_2-design-and-develop-your-tool-with-the-wisdom)

As an early step, he built a basic version of his planned icon library’s UI in Sketch. (These days Jackie uses Figma — we’ve become the primary design tool for Microsoft’s Cloud and AI design studio teams 💪.) He took inspiration from IconJar’s design and mocked up a similar version, styling it in Microsoft’s Fabric design language.

Once he was finished with the design, he needed to build it. He had some experience with HTML, CSS and Javascript from creating his portfolio website, so he decided to leverage that existing knowledge by tapping a beginner-friendly Javascript library called [Meteor.js](https://www.meteor.com/). It allowed him to build both the front-end and back-end databases without spending too much time mastering a new programming language.

He took a [React tutorial](https://www.meteor.com/tutorials) on Meteor’s website, and applied what he learned to build the icon library. For example, Meteor’s tutorial taught Jackie how to build a database for a to-do list, and he extended that concept to creating a database for his icon library. With a real problem in mind that needed fixing, he felt more than motivated to learn along the way.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAAA6UlEQVQ4y6WUiQ6EIAxE/f9/NTHxAK+yDMtgF1hcsyaTcpRHW8BumiY3z3MS+g8lykqXQzT8TsuywErsw17AcRyD4GSMcdbapuAToYI2bIqQUFg4r+vqtm0rtO970HEcAdj3vRuGQeIGFxBRfQNhjFERep5n6BMInw8gdiOMUUCEMQMN5bzvC9oAphpqoE4PNtYnKPdB6uK/WIISqMV0eUi1MqDt0y+BuoZaPM3aXDPC2qFoaJ7yT0BGkqfF+wZpIIQ63wL1IgJrl51197DylAnlQopjLQEUs3jfw6fvt6L0lhPwT6W/DaAvuyOPPQTSj7AAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/57b824cd9cb3d5d9a75df7cf04088aa7841c34ba-1600x1200.png?w=804&h=603&q=75&fit=max&auto=format)

### [3\. Collect and extract the icons from the company’s repository](#_3-collect-and-extract-the-icons-from-the-company)

For those not in the know, icons are normally stored in a font file. The challenge with icons is that you cannot ‘type’ the icons using your keyboard since there are many more characters than keys on a keyboard. Instead, you have to copy the ‘icon character’ and paste it into your design to use. Previously, designers had to keep a file with a bunch of icon characters that they used often so they could copy and paste in their designs. What Jackie’s tool does is allow designers to search and copy the ‘icon character’ easily in one central location.

He downloaded and extracted the files and got the actual unicode characters of each icon. Next he found a Microsoft documentation page with all the icons and their corresponding class names used by engineers. He copied the list of icon names into an Excel spreadsheet then converted that into a JSON file to use in his code. Presto.

### [4\. Distribution](#_4-distribution)

After three weeks of not sleeping a whole lot, the first version of his Icon Library was ready. He hosted the tool on Microsoft Azure, a cloud-computing service for building and managing services and applications that is open to the public . At this point he didn’t think too much about the distribution, he just sent a simple email with a link to the tool to his team, then it spread to the rest of the design studio through word-of-mouth. Instantly it was a hit (see pile of emails below for evidence.)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsSAAALEgHS3X78AAABVElEQVQoz1VTCxaDIAzb/e+68Ss/Qd+SFufIqkNfk6YFX3mhFISiPv8M4H58kozzUp6+zoxSW2sdceMwYFVrg1BTGP9HrjGVmLJkriFRW9doYM6TmHOOSeDNH5m/lnKVTOmbxihaapB0TvIpARcbGXbBLwV2Rz8G7q0fDAXMa6x2IL/ZRgVZlVEQnJXN/GZTIGB4jLFV1iG2KDWJTpjCXOgIJYsgRUfVhzaw9azGUbbDNaQRapjTwjZBRp2bZ04ej6p7k2EYlUs7MJLzus4H8wfO4jByf8jwgB3yIcUo1pi1223HOe3xJ3fC2r7POTvn3u837iEE77y7gRUa527PeSmgtZGFZA/yR+E+znsfFfCDHHN0sqedDCTJzietGkAIIYmInutqR9JmtZrvf9NGHgp4n5QYU+ICSw3K4c06Dvd38nwYrEx3einCL8LyYqKJhghjfQEGP2K2QmBWjwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/fbd98e7c2827d35401d5ce9c21d529b2dc340705-1600x1200.png?w=804&h=603&q=75&fit=max&auto=format)

Currently, Jackie’s working on a V2 of his Icon Library. His coworkers are helping him find bugs and suggesting new features, however it’s already wormed itself into many designers’ workflow. Once he’s done building the last few features and fixing the remaining bugs, he’ll share it more publicly to other Microsoft teams to extend the tool’s impact.

Plans for the future  
So, what’s next for our tireless overachiever? 😉 In the coming months Jackie wants to develop a converter that, with one click, could take all 4000+ icons from his Icon Library and turn them into Figma components. This would allow everyone at Microsoft to organize and search for icons much more easily inside Figma without having to go through an intermediary tool. Yep, his new tool will make his last one obsolete.

The potential for this goes far beyond Microsoft icons. Eventually Jackie plans to make his converter available to the design community, allowing anyone to be able to drop in an icon font file and get all their icons back as Figma components.