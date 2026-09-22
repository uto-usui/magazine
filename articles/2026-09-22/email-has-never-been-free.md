---
title: "Email has never been free"
source: "https://buttondown.com/blog/metered-email"
publishedDate: "2026-09-21"
category: "design"
feedName: "Sidebar"
---

It costs around a dollar, give or take, to print out a letter, put it in an envelope, and stamp it for the mail. It costs nothing to open Gmail, type out an email, and hit send.

Nothing, that is, except for what you spend on your internet bill and computer, and what Google and others invest in data centers and networking to relay bits from your inbox to another’s. The first email that was ever sent also cost zero to deliver, other than the million dollars or so in PDP-10 computers that Ray Tomlinson sent the messages between. And if you were starting from scratch and wanted to send an email across the world without using anyone else’s services, it’d cost untold millions of dollars to build the infrastructure to wisp your message to its destination. One investment after another adds up, though, and since Hotmail landed on the web, email has, for most people, been free.

Not for lack of trying, though. For all the advantages of being able to send email for free, that same infrastructure also routes and filters billions of spam emails per day, too, messages that make it harder for your legit emails to get through.

If only email wasn’t free, the thought goes, if only we could put that genie back in the bottle and go back to the postal system. That’d kill spam, putting the costs on the abusers and convincing them to leave email alone in the process.

If only it was that easy.

## Too expensive to give away

![MCI Mail ad](https://buttondown.com/next-assets/img/blog/metered-email/mci_mail_ebay.jpg)

The earliest emails could be delivered on pixels or paper.

The early days of email were bifurcated. Free in universities and research labs, expensive in offices and homes.

Email—the academic version of it pioneered by Tomlinson—was free for end users, anyhow, and worked close to how we experience it today (albeit with [bang path and source-routed email addresses](https://buttondown.com/blog/email-source-routing-history)) on early mainframes in universities, research labs, and a handful of lucky cutting edge companies. Free, that is, only because it was delivered on ARPANET backed by a couple million dollars a year in US government investment.

Consumer email was slower to arrive, from services like The Source and CompuServe in 1979 and MCI Mail in 1983. And those networks were expensive. The Source cost $100 to join and around $10 per hour you were online; CompuServe sold a $40-or-so startup package and then charged a similar per-hour fee, cheaper at nights and pricier during the day. MCI Mail [billed itself](https://www.youtube.com/watch?v=rLhMY5_LD7c) “the nation’s new postal system,” and just like the USPS and unlike other networks, it charged per message. 50¢ per email you sent for the first 500 characters, another 10¢ for the next 500 characters, and so on, plus a $35 annual mailbox fee and a minimum $10 per month fee. Or, like the USPS had briefly offered with [E-COM](https://buttondown.com/blog/the-e-com-story), your email could be mailed on paper for $2 or sent within four hours by courier for $25. “You pay only for the messages you send,” [advertised MCI Mail](https://www.youtube.com/watch?v=b1XsBny6IQk&t=111s), “low cost and more.” Low cost, that is, if your comparison was the postal mail, or the phone costs of sending a long-distance fax.

And so, perhaps unsurprisingly, [the first spam email](https://en.wikipedia.org/wiki/History_of_email_spam) was sent over the free-for-the-users ARPANET in 1978, before unsolicited messages had been branded as such. It cost DEC marketer Gary Thuerk $0 to send his 400-or-so spam messages, emails that brought in an estimated $13 million in sales, and the tragedy of the common free email was brought into stark light.

It’s not that MCI Mail charged enough to have made such a stunt prohibitive. The $200 or so it would have cost to send 400 messages would have been a drop in the bucket if the return on investment was in the millions. But the very fact that it cost to send a message, and that the messages had to be sent from a billable account, was at least enough to make one pause.

## Too cheap to meter

MCI Mail and its peers were networks unto themselves before the internet. You could email anyone as long as they, too, used MCI Mail (that, or if you opted to send them a paper copy of the email instead). Metered email was easy in that closed environment, as were add-on services like options to get a credit report, directory search results, newsletters, and Dow Jones News. Your email company knew who you were, and how to bill you.

Then came the internet, with its laissez-faire, anything goes, information wants to be free ethos. And on the internet, like ARPANET before it, email was free, just another packet of information traveling over the same network. MCI Mail and others started building bridges between the other email services, then adding support for the fledgling [X.400 email servers](https://buttondown.com/blog/x400-vs-smtp-email) and internet email via SMTP over time. CompuServe, originally priced per minute of connection, added a surcharge for the privilege of sending emails over the internet; MCI Mail, with its fees to send messages, carried on as before, routing messages over whichever network your recipient was on. Only, when your recipient could reply for free, it was only a matter of time before you, too, would like a free inbox. “It felt really strange to think you could directly send a ‘letter’ to someone for free if they had their own Internet email address,” [Benj Edwards told us](https://buttondown.com/blog/email-80s-ads), after having paid email addresses on BBS, Prodigy, and CompuServe before. Strange in a good way that spread.

Hotmail showed up in 1995, offering a free email address in an early web app. Gmail upped the ante in 2004, with free email and a gig of storage. (MCI Mail, improbably, soldiered on until the year before, charging the same 50¢-per-message right up until the end). And, for a time at least, you could host your own email server for the price of a server and internet connection, and flood the world with as much email as you wanted. It wasn’t free to set up a newsletter or to nefariously spam, but the costs quickly rounded close to zero.

Which felt like a natural evolution as a technology progressed. “On the one hand ... information sort of wants to be expensive because it is so valuable — the right information in the right place just changes your life,” [said Stewart Brand](https://digitopoly.org/2015/10/25/information-wants-to-be-free-the-history-of-that-quote/) at the first Hackers conference in 1984. “On the other hand, information almost wants to be free because the costs of getting it out is getting lower and lower all of the time.” Thus was first stated the adage that has been held up, time and again, as almost a moral law of the internet.

But then, there was a little side note that’s often lost to history. “Information should be free,” retorted Apple co-founder Steve Wozniak at that conference, “but your time should not.” And therein lies the challenge of email.

Sending? Nearly free. Transmitting? Costs borne by the services offering free inboxes. Receiving? Costs borne by we the people, in internet time, storage space, and the mental overload of sifting for real emails among the spam.

There were ways to fight back, but each “make the economics even worse,” observed Eric Allman in his 2004 essay [_The Economics of Spam_](https://queue.acm.org/detail.cfm?id=966799). “Filtering, quarantining, redirecting, stripping, modifying, deleting—all of these costs are borne by the recipient. Also, the recipient pays the costs of false positives (nonspam that is mistakenly classified as spam) in a variety of ways.”

Which brought back an old idea. What if we charged the spammers? What if we charged everyone for sending emails, like MCI Mail in its heyday, and made people check their wallets before pressing send?

## Too valuable to not charge for

![MCI Mail signup card](https://buttondown.com/next-assets/img/blog/metered-email/mci_signup.jpg)

The value of time, indeed, is what MCI Mail said made their electronic mail worth paying for

Time, that most valuable currency, and the attention that could be given with it, that seemed the key lever to making the economics of email make sense.

Perhaps, suggested Bill Gates in his 1995 book [_The Road Ahead_](https://archive.org/details/roadahead00gate/page/173/mode/1up), email advertisers could pay you “a nickel or a dollar, perhaps—if you will look at an ad,” seemingly valuing the two sums not very different. The fee would prevent spammers from mass-mailing, he thought, and even make grocery stores and airlines think twice before emailing you too frequently. Or if they did, well, a nickel to glance at a headline before deleting the email might not be a terrible bargain.

The idea was a perennial one at Microsoft. Surely there was a way to police email and make spammers pay for it, with that most valuable currency of time if not with hard cash. Such logic led a Microsoft Research team in 1992 to invent “[pricing via processing](https://www.microsoft.com/en-us/research/publication/pricing-via-processing-or-combatting-junk-mail/)” in something strikingly close to Bitcoin. It consisted of “a computational technique for combatting junk mail in particular and controlling access to a shared resource in general. The main idea is to require a user to compute a moderately hard, but not intractable, function in order to gain access to the resource, thus preventing frivolous use.”

A similar idea in 2003, named [Penny Black](https://archive.ph/20130111063914/http://research.microsoft.com/en-us/projects/PennyBlack/#selection-403.34-403.200) after the first universal postage in the UK, defined the concept as “If I don't know you, and you want to send me mail, then you must prove to me that you have expended a certain amount of effort, just for me and just for this message.” Computers and their CPUs can only perform a finite amount of work per day, so if you required a computer to crunch code for 10 seconds every time you sent an email, you’d “limit a spamming computer to at most 8,000 messages daily,” [proposed the researchers](https://archive.ph/20130111063914/http://research.microsoft.com/en-us/projects/PennyBlack/#selection-403.399-403.549). It wouldn’t fully block spammers, but would ensure that “spammers would have to invest heavily in hardware in order to send high volumes of spam.”

Or perhaps not every email needed to pay, but only the most important ones—and payment would add a certain veracity to emails, letting you more easily ignore the freeloaders. The US Postal Service made stabs in that direction [in 1996](https://journalrecord.com/1996/10/10/postal-service-works-on-postmark-system-for-secure-delivery-via-email/?utm_source=chatgpt.com), with a digital postmark to timestamp, encrypt, and send it on to the recipient, for 22¢ per message and an average of an 8 minute delay (rather than the [rumored-but-never-real](https://www.snopes.com/fact-check/bill-602p/) tax on email). “Businesses and even many consumers actually trust the post office,” said a consultant on the project. “There is something about that stamp of approval.” It never gained wide adoption, but limped on, inconceivably, [until 2009](https://about.usps.com/strategic-planning/cs02/2m2.htm).

Microsoft’s next idea for paid email in 2003, though, took on a similar sheen: [Bankable Postage](https://www.microsoft.com/en-us/research/publication/bankable-postage-for-network-services/). This scheme required you to put actual money behind your email instead of computing time. You’d buy digital postage to authenticate email, and then recipients could refund the ticket if the email wasn’t spam, making legitimate email work out to free while offloading the cost of the system entirely to spammers (or those whose recipients decided not to refund the ticket).

Then came the Goodmail system that would charge 0.25¢ to send an email with links and text, presuming that personal messages would be text only and thus forcing only business and would-be spammers to pay. It was adopted on January 30, 2006 by AOL and Yahoo, then abandoned only five days later thanks to pushback [the EFF](https://web.archive.org/web/20060222061945/https://www.eff.org/deeplinks/archives/004398.php) among others. Goodmail, they said, would turn free speech into “pay to speak,” while quoting spam filtering company Spamhaus CIO Richard Cox as saying “an e-mail charge will destroy the spirit of the Internet.”

So then, not surprisingly, the IEEE’s 2005 [Zmail](https://ieeexplore.ieee.org/document/1437152) proposal to charge for sending emails never gained adoption, even though it proposed to pay you for the time spent reading the message. Same for a 2009 proposed [Internet Draft for an SMTP Postage extension](https://datatracker.ietf.org/doc/html/draft-irtf-asrg-postage-00) that [then](https://mailarchive.ietf.org/arch/msg/asrg/eaHYY88Ow7U9fzdYY19aU0gFhF4/) “never went went anywhere beyond that.” The idea that everything would be better if we charged for email pops up again and again in Twitter threads and Hackers News discussions, before being yet again talked back into reality.

It all boils down to one simple problem: “It is the spammers who are the ones with the big pockets,” as AOL postmaster department manager [Charles Stiles told CNET](https://www.cnet.com/tech/services-and-software/gates-backs-e-mail-stamp-in-war-on-spam/). Charge, and the spammers’ deep pockets would prevent that from being an impediment, while legitimate senders and we the public would pay the costs of more centralized email architecture. Require compute, and they’d buy more computers (while Moore’s law, all the while, makes their job progressively easier with faster chips that could solve the problems in less time). It’s a cat and mouse game where everyone loses.

Perhaps the best evidence that paid email would not prevent spam, though, is that spam print mail _still is sent_ even though it costs paper, ink, labour, and postage. They’re paying anywhere from 50¢ to a dollar per letter to get something in your mailbox, something you’re most likely to instantly throw away, and they keep doing that.

Or take LinkedIn InMail—requires the time of setting up a LinkedIn profile, the expense of LinkedIn Premium, and even then messages aren’t unlimited. Yet people still send unsolicited messages all the time.

A cent an email isn’t going to stop spammers, either.

## People who are really serious about sending email, pay

The story ends with today’s equilibrium. Email is free. Spam filtering is pretty good, good enough to relegate the burden to the back of our minds most of the time. [SPF, DKIM, and DMARC](https://buttondown.com/blog/deliverability-personal-domain) brought something resembling KYC to email: If you’re not willing to identify yourself and your domain, email servers assume you might be a spammer.

And ironically enough, we started charging for email.

Not for spam, mind you, nor for those of us receiving email on a free account. It costs, instead, for newsletters, and for the normal everyday automated emails businesses and apps send. It costs around .01¢ (with Amazon SES) to .04¢ (with Sendgrid’s base pricing) per message to send emails with an ESP or email service provider. That, or something like a cent per recipient (with as many emails as you want to send) with a newsletter service like Buttondown (or free minus 10% of your total revenue with another newsletter service). And it costs something else, too: Passing a KYC check, paying with a real credit card, and using your real address, all things that spammers are unlikely to do (or if they do, that makes them easy to shut down).

If you need to send a random email today, it’s more or less free. And it’ll likely be delivered nearly instantaneously, directly into your recipient’s inbox, as long as your contents don’t appear particularly spammy. If you check your junk folder, it’s likely rather full of obvious spam—and that’s fine, too, as today’s spam filters mostly do their job and keep the junk out of sight.

But if you really care about email, if you want to build an audience and keep it, if you want to ensure that your messages land in inboxes and don’t get accidentally swept away by filters, you—not the spammers—will need to pay, today. You pay, in cash, so your readers will be willing to spend their time to read.

Image credits

Image

Credit

Header photo

Satwika Ananta via [Unsplash](https://unsplash.com/photos/a-pile-of-paper-money-cVISyzEfG9E)

MCI Mail ad

[eBay](https://www.ebay.com/itm/236594357233)

MCI Mail signup form

[The Internet Archive](https://archive.org/details/Use_MCI_Mail/mode/1up)