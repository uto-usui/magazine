---
title: "Headless everything for personal AI"
source: "https://interconnected.org/home/2026/04/18/headless"
publishedDate: "2026-04-23"
category: "design"
feedName: "Sidebar"
---

It’s pretty clear that apps and services are all going to have to go _headless:_ that is, they will have to provide access and tools for personal AI agents without any of the visual UI that us humans use today.

By services I mean things like: getting a new passport; finding and booking a hotel or a flight; managing your bank account; shopping for t-shirts with a minimum cotton weight from brands similar to ones that you’ve bought from before.

Why? Because using personal AIs is a better experience for users than using services directly (honestly); and headless services are quicker and more dependable for the personal AIs than having them click round a GUI with a bot-controlled mouse.

Where this leaves design for the services… well, I have some thoughts on that.

* * *

Headless services? They’re happening already.

Already there is [MCP, as previously discussed](https://interconnected.org/home/2025/02/11/mcp) (2025), a kind of web API specifically for AI. For instance, best-in-class call transcriber app Granola [recently released their MCP](https://www.granola.ai/blog/granola-mcp) and now you can ask your Claude to pull out the meeting actions and go trawling in your personal docs to find answers to all the question. A good integration.

But command-line tools are growing in popularity, although they used to be just for developers. So you can now create a spreadsheet by typing in your terminal:

`gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'`

Here are some recently launched CLI tools:

-   [gws](https://github.com/googleworkspace/cli): Google Workspace CLI, Drive, Gmail, Calendar, and every Workspace API. Zero boilerplate. Structured JSON output. 40+ agent skills included.
-   [Obsidian CLI](https://obsidian.md/cli) to do anything you can do with the (very popular) note-taking app - like keep daily notes, track and cross off tasks, search - from the CLI
-   [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) and, look, I don’t really understand what the Salesforce business operating system does, but the fact it has a CLI too is significant.

And here is [CLI-Anything](https://github.com/HKUDS/CLI-Anything) (31k stars on GitHub) which auto-generates CLIs for ANY codebase.

Why CLIs?

It turns out that the best place for personal AIs to run is on a computer. Maybe a virtual computer in the cloud, but ideally your computer. That way they can see the docs that you can see, and use the tools that you can use, and so what they want is not APIs (which connect webservers) but little apps they can use directly. CLI tools are the perfect little apps.

* * *

CLIs are composable so they are a better fit for what users actually do.

By composable I mean you can: query your notes then jump to a spreadsheet then research the web then jump back to the spreadsheet then text the user a clarifying question then double-check your notes, all by bouncing between CLIs in the same session.

A while back app design got obsessed with “user journeys.” Like the journey of a user finding a hotel then booking a hotel then staying in it and leaving a review.

But users don’t live in “journeys.” They multitask; they talk to people and come back to things; they’re idiosyncratic Try grabbing the search results from the Airbnb app and popping them in a message to chat on the family WhatsApp, then coming back to it two days later. It’s a pain and you have to use screenshots because apps and their user journeys are not composable.

CLIs are composable because they came originally from Unix and that is the [Unix tools philosophy](https://tldp.org/LDP/GNU-Linux-Tools-Summary/html/c1089.htm): tools were designed so that they could operate together.

Personal AIs like Openclaw or \[Poke\]([https://poke.com](https://poke.com/) do what users want and don’t follow “designed” user journeys, and as a result the composed experience is more personal and way better. CLIs are a great underlying technology for that.

* * *

CLIs are smaller than regular apps and so they are easier to secure.

The alternative to providing special tools for AIs is that the AIs use the same browser-based apps that we do, and that’s a terrifying prospect.

For one, AIs are really good at finding security holes. The new Mythos model from Anthropic is so good at discovering security flaws that it has been held back from the public and [governments are convening emergency meetings of the biggest banks](https://www.bbc.co.uk/news/articles/c2ev24yx4rmo).

And including a UI increasing complexity and makes security holes more likely.

Here’s a recent shocking example. Companies House is the national register of all companies, directors, and accounts for England and Wales. Users could view _and edit_ any other user’s account:

> a logged-in company director could exploit the flaw by starting from their own dashboard and then trying to log into another company’s account.
> 
> Once they reach the 2FA block, which they would not be able to pass, all that was required was to click the browser’s back button a few times. Typically, the user would be taken back to their own dashboard, but the bug instead returned them to the company they had tried to log into but couldn’t.

This bug had been present since October 2025.

Imagine a future where personal AIs are filing company records, and one of them notices this security hole overnight and posts about it on [moltbook](https://www.moltbook.com/) or whatever agent-only social network is most popular. The other agents would exploit the system up, down and sideways before the engineering team woke up.

The only viable solution is that services need to security hardened, and to do that they need to be simplifying and minimised. Again, CLI tools are a great fit.

* * *

What does this mean for front-end design?

Design won’t go anywhere.

Sure, the front-end should be driving the same CLI tools that agents use.

Arguably it’s more important than ever: human users will encounter services, figure out what they can do, and pick up their vibe from using the app, just as now.

Then they’ll tell their personal AI about the service and never see the front-end again, or re-mix it into bespoke personal software.

So from a usability perspective I see front-end as somewhat sacrificial. AI agents will drive straight through it; users will encounter it only once or twice; it will be customised or personalised; all that work on optimising user journeys doesn’t matter any more.

But from a vibe perspective, services are not fungible. e.g. if you’re finding a restaurant then Yelp, Google Maps, Resy, and The Infatuation are all more-or-less equivalent for answering that question but clearly they are completely different and you’ll use different services at different times.

Understanding that a service is _for you_ is 50% an unconscious process - we call it brand - and I look forward to front-end design for apps and services optimising for brand rather than ease of use.

* * *

If I were a bank, I would be releasing a hardened CLI tool like _yesterday._

There is so much to figure out:

-   How do permissions work? Should the user get a notification from their phone app when the agent strays outside normal behaviour? How do I give it credentials to act on my behalf, and how long do they last?
-   How does adjacency work? My bank gives me a current account in exchange for putting a “hey, get a loan!” button on the app home screen. How do you make offers to an agent?

Headless banks.

* * *

Headless government?

I’d love to show you a worked example here. I vibed up a suite of four CLI tools that wrap four different services from UK government departments.

If I were renting a house, I would set my agent to learning about the neighbourhoods using one of these tools. Another tool will be helpful next time I’m buying a used car. (There’s a Companies House command-line tool too.)

But I won’t show you the tools because I don’t want to be responsible for maintaining and supporting them.

* * *

I wish Monzo came with an official CLI. I wish Booking.com came with a CLI. I reckon, give it a year, they will.