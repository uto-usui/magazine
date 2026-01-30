---
title: "How we use data"
source: "https://www.figma.com/blog/how-we-use-data/"
publishedDate: "2022-10-13"
category: "design"
feedName: "Figma Blog"
---

Building world-class design and collaboration tools means understanding how our products are used. Knowing how people use Figma is a critical process for making design accessible to everyone, and it requires us to carefully collect and analyze different types of user data. It’s a big responsibility to be entrusted with this data, so we want to be sure our customers know what we use it for and why. If you’re curious about how we use data to make Figma better and better, read on!

To set the stage, it’s helpful to categorize the user data Figma collects into two categories: functional data that we primarily use to provide the service; and analytics data, which we use to make product improvements.

## [Functional data](#functional-data)

Functional data includes things like your email address, which we need to know in order to  give you a username and send you important communications like password resets. Figma only needs a relatively small slice of information before you can get started.

When you sign up for Figma, we ask for your email, name, and role.  That core dataset allows us to let you start making files and collaborating with other users. Thanks to how our product is designed, we don’t need to collect more sensitive information often required by other cloud services, like ID verification, documents, or payment information. (Payment details—which are only needed if you purchase one of our paid plans—are gathered and processed by Stripe, our payment infrastructure provider.)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAIAAADJt1n/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACxklEQVQ4jY2Uy07bQBSG/U7JhixYARKBBUIgXqSsQd3yDhAR+gRJ1AUSC7KCRFiOEhODL3PzXOyZMU5oum09EyIQbdVPljW258z8/zlz7IRhyDlXSklD/h9IKQkhnuc5nPOyLKWUlFLOuf0mhGCMcc6zLJNSZlkmhMiyjHPOGLPbhGHoSCnLsoyiaDAYuK7rG1zXvbu7GwwGnuf5vu953sPDg70Ph8MwDKWUEEJHKfX6+kop9X3/8fHx6ekpCILxeOy6ro20j6PRyPf98Xg8mUwIIUVRVMFa68ViMZvNlMHaXum0LjLDyvDMsNy5LEvOeZqmQog/puf9ozBzlFJBEDiMsTzPkySJoogxppTS/0SYXFJKh8OhgzHO8zyO4yAIAADpR8gnEEKEkDRN7+/vHSGY1hohHEVRkiTgIxBChBA2IEOSJIQQIcR0OnXynGutMCaf5yGEGGNFUdgMlWVZFIXVvCxVlgmlFIQwfMfzGxBCIcTq8AkhMMZpmi6DpZS2aM/PzzYyeiM2WPEQQgCAzSvGWEoJAHC0yrVWCGEr2/pRf8IeW4wxIURKiRBaBhNCMK4Mp2mqtZ7/heKdZ4yxo6vCzgDIAKBmUWJbghmEgb8hzNg6NcFa5fnPIPgRx5oQalXZhAMArBGEEITQqp3NZovFYj6fV7KVkpSq29tJt3PT6XQ7nU6v1/tu6Ha7dtzr9ez76+vrfr8/nU7toayyPZn4p6dfd3Z2NzY2tra2dnd3Dw4Ojo6ODgyHh4f7+/vNZnPLsLe3d3Z25vt+HMdVY4xG3vHxl0ajUavV6vV6o9EwS+w0m9vb29vNZnNzc3Ntba1er9dqtfX19ZOTk9FoVJUqz3NK6c3NzeXl5fn5+cXFRavVarfb3yqu7NVut1ut1oXh6uqq3++naVoFU0pXZbCY5lnW1g60rlptNWE+n7+8vPz+Df0CkWEdiAaqc5gAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/16a10fa490f7f0ce6a34b7d7638932b0f3278120-860x910.png?w=804&h=851&q=75&fit=max&auto=format)

## [Analytics data](#analytics-data)

Analytics data shows us how the product is used, and includes metadata about how the platform is accessed. Our users’ needs are constantly changing, and we pride ourselves on continually evolving Figma to better meet those needs. Analytics data is critical to understanding how best to do that. We can’t _only_ base our development plans on the tweets that our users send [@figma](https://twitter.com/figma) (but please keep sending them!), so we make sure to keep track of which features our users are using, which ones they aren’t, and which ones they seem to have trouble with. This data is then processed and analyzed by our data science team.

But what does it mean to make Figma better using data? To get a bit more specific, we picked out three case studies that show how our data science and engineering teams use the information we collect to improve features, optimize performance, and protect the Figma community.

## [Improving features](#improving-features)

At Figma, A/B testing is a [key component of the product development process](https://www.figma.com/blog/from-experiment-to-launch-how-data-shaped-a-new-comments-experience/)

.Through experimentation, we can explore hypotheses formulated through UX research, data, and product intuition. Experiments also allow us to quantitatively assess the impact that proposed features or changes have on user behavior. This ultimately helps us make data-informed decisions about what we ship to users.

For example, we’ve recently explored how to improve the share modal, one of the entry points for users to invite other users into their file, to manage file permissions, and to publish their work to the [Figma Community](https://www.figma.com/community). At Figma, we believe that design is a [collaborative process](https://www.figma.com/blog/inside-figma-building-a-more-collaborative-design-process/)

, so making sharing files easy is important to us.

During our background research, the data team found that only 20% of users opened the share modal within the first month and only half of those users went on to successfully share a file. We believed that the experience for potential sharers could be improved by simplifying the UI and moving secondary functions into separate tabs in the modal, making it easier to parse.

This experiment confirmed our hypothesis: a simplified sharing experience would lead to more sharing activity. We saw a 2% increase in the percentage of users sending invites and a 2% increase in the number of users invited to each file. We also didn’t see any regressions around the propensity for users to upload their work to the Figma Community, which was one of the metrics we thought could be impacted by this change.

Our teams are still working to improve the sharing experience, and these early findings are helpful in setting the direction of our future work in this area.

## [Identifying performance issues](#identifying-performance-issues)

Across Figma, teams use data extensively to understand application performance across different platforms. These findings are used to drive initiatives and improve the overall user experience.

At [Config 2021](https://www.figma.com/blog/coming-together-at-config-2021/)

, our annual design conference, we announced the beta of our new iOS app, which allows users to view and share files and prototypes on their mobile device. Following the announcement, the data team did a deep dive into crashes to understand how often they were occurring, under which scenarios, and on which platforms. In that analysis, they found that prototypes were one of the primary drivers for crashes on iOS, with 25% of prototypes crashes happening within the first 10 seconds of loading. They also confirmed our intuition—that crashes were more likely on more complex prototypes. These insights prompted a series of improvements involving different strategies around incremental frame loading and image sampling for prototypes. The resulting changes led to over a 50% reduction in prototype crash rates on iOS.

## [Fighting spam bots](#fighting-spam-bots)

The metadata we collect about how the product is used is also crucial to our anti-abuse defenses. There are bad actors on the internet who try to use Figma to send spam or create harmful content in the Figma Community. To fight these efforts, we need to collect a number of signals that can help distinguish between a real, human user, and a fleet of bots that are trying to use Figma in an automated, negative way. Although attackers are constantly evolving their techniques to make their bots seem more human-like, there are almost always giveaways that we can detect to distinguish well-meaning users from malicious machines. We ingest this data via a secure pipeline that delivers these signals not only to our backend, but also to anti-fraud partners who help us identify these attacks.

By processing subtle pieces of data about how users interact with Figma’s systems, we aim to block bad actors at multiple checkpoints throughout the Figma product. Our defenses use the data they’ve collected to build up context about incoming requests, and can block automated bots at any point. This helps ensure that the community is filled with the exciting, creative content made by Figma users—not spam published by robots.

Data helps us make Figma more usable, performant, and secure, ultimately providing a better experience for our users. If this is the type of work you’re interested in, [check out our open roles](https://www.figma.com/careers/#job-openings)—we’re hiring!