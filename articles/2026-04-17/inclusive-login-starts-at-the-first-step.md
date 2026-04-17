---
title: "Inclusive Login Starts at the First Step"
source: "https://uxmag.com/articles/inclusive-login-starts-at-the-first-step"
publishedDate: "2026-04-16"
category: "ux-research"
feedName: "UX Magazine"
author: " Shannon Joycelyn "
---

> _How often does a login fail even when someone is trying their best?_

We have been spending more time thinking about inclusivity in the parts of a product that people touch most often. Login is one of them. It appears constantly, is usually justified under security requirements, and often causes momentum to break before anything else happens.

In our team, we started noticing how often the loss of momentum came from small details rather than a complete lapse in memory. Someone would feel confident they had the right password, then get blocked anyway. It might be a capital letter in the wrong place, a symbol required on one site but not another, or a password that was updated months ago and never properly stored.

![](https://uxmag.com/wp-content/uploads/2026/04/image-1-1024x576.png)

_Password failure is often a tiny mismatch: one letter case, one missing symbol, one forgotten update. Illustration by [Shannon Joycelyn](https://www.linkedin.com/in/mysteriousdogowner/)_

What makes this frustrating is how quickly it escalates. A step that should take seconds turns into a longer sequence of retries, second-guessing, checking notes, and eventually deciding whether to reset. Add the pressure of a warning like “too many attempts,” and it becomes easy to slip into guessing and lockouts.

This friction shows up clearly in metrics. Many [companies report login success rates between 60% and 85% under normal conditions](https://jsoverson.medium.com/what-your-login-success-rate-says-about-your-credential-stuffing-threat-1f10bc20eaee), which means a significant portion of legitimate attempts do not succeed. Even when recovery works, it still costs attention and energy, and it often pulls people away from the task they actually came to do.

These failures happen even under relatively favorable circumstances. Logins rarely take place in a quiet, focused setting. They happen between meetings, on a commute, while juggling messages, or at the end of a long day. Glare on a screen, unstable connectivity, or using one hand can be enough to turn a recall-based login into a frustrating experience.

There is also a structural layer that does not always show up in usability testing. Many login systems assume one person controls one email and one password. That is not always how access works.

In Indonesia, email sharing is common in everyday use. [Republika](https://rejogja.republika.co.id/berita/rszza5399/jangan-suka-berbagi-akun-email-ini-bahayanya) has reported examples of people sharing email accounts with friends and family to access apps and services. Accounts can also be set up with help from phone shops or someone at home. When login assumes private, individual credentials, it fails to reflect these realities.

## What this means for older adults

For many older adults, this context is common rather than occasional. Memory can be less reliable, eyesight can change, and typing accurately on a small keyboard can take real effort. [Research](https://link.springer.com/chapter/10.1007/978-3-642-39209-2_74) shows that password requirements are often designed with little consideration for age-related cognitive decline, even though remembering passwords becomes harder over time.

> _When login depends on precise recall, access starts to feel conditional, something that has to be re-earned each time._

Looking closer, the underlying problem is not only age. It is the accumulation of demands. Password login asks people to remember exact details and enter them accurately across many services. [Studies](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0051067) have shown that as the number of passwords increases, forgotten and mixed-up passwords increase as well. This phenomenon is why the same login flow can feel manageable one day and unexpectedly difficult the next.

This led us to explore a different starting point.

## What if login leaned more on recognition than recall?

Several alternatives to traditional passwords already exist:

1.  Pattern locks on Android devices reduce typing burden but share similar problems: simple patterns are straightforward to guess, while complex ones can be as difficult to remember as passwords.
2.  Biometric authentication using fingerprints or facial recognition can reduce friction [significantly](https://www.loginradius.com/blog/identity/biometric-authentication-methods), but it requires specific hardware that not everyone has access to, particularly in markets where older or lower-cost phones are common. Biometrics also fail for people with certain disabilities, skin conditions, or injuries, and unlike passwords, you cannot change your fingerprints once compromised.
3.  PINs are easier to remember than complex passwords, but remain vulnerable when people choose obvious combinations.

![](https://uxmag.com/wp-content/uploads/2026/04/image-2-1024x576.png)

_When your hand shakes, your finger is wet, or you are rushing, even “simple” unlock steps can fail. Illustration by [Shannon Joycelyn](https://www.linkedin.com/in/mysteriousdogowner/)_

Each of these methods emerged to solve real problems. Yet none fully addresses the underlying issue: when conditions are not ideal, whether from missing hardware, physical limitations, or memory constraints, people get locked out.

[Password login relies almost entirely on memory.](https://www.nngroup.com/articles/recognition-and-recall/) The interface offers very little support when recall fails. Recognition works differently. Rather than generating the correct answer from scratch, individuals select a familiar option from a list. That distinction matters when attention is limited or conditions are less than ideal.

Recognition-based steps reduce dependence on exact typing, case sensitivity, and special-character rules. Errors are less punishing because the interaction is about choosing rather than composing.

From there, we began exploring a recognition-based login where three images are selected during setup and later chosen again from a grid to log in. [Research](https://www.researchgate.net/publication/360859351_Image_Based_Password_Authentication_System) consistently shows that people are better at recognizing images than recalling text strings, and [studies](https://link.springer.com/chapter/10.1007/978-3-642-39209-2_74) involving older adults have found lower rates of forgotten credentials with image-based techniques compared to text-based passwords.

![](https://uxmag.com/wp-content/uploads/2026/04/image-3-1024x562.png)

_A login concept that lets people sign in by selecting three familiar images, reducing reliance on memory and precise typing while still keeping security options in place. Illustration by [Shannon Joycelyn](https://www.linkedin.com/in/mysteriousdogowner/)_

What changes is the mental load during the login moment. With passwords, people have to retrieve an exact string and enter it perfectly, even when attention is divided. With recognition-based login, the interface provides cues. People can select what they recognize rather than reconstructing the password from scratch.

## Not a universal solution

Recognition-based login is not appropriate for every context. High-security environments like banking, healthcare systems, or enterprise applications often require multi-factor authentication and stronger verification methods. As one pathway among others, recognition-based login is particularly suited for consumer-facing products where accessibility and reduced friction are priorities, offering a way to reduce avoidable failure for people who are already working harder to complete the same task.

Designing with older adults in mind often reveals where systems rely too heavily on ideal conditions. Login tends to require focus, time, and a steady hand. Real use is messier.

This phenomenon is also the reason why we repeatedly revisited the [curb-cut effect](https://www.archdaily.com/1005564/the-curb-cut-effect-how-accessible-architecture-is-benefiting-everybody). Curb cuts were designed for wheelchair users, but they ended up helping parents with strollers, travelers with luggage, delivery workers, and anyone moving through a city with their hands full. Digital experiences often work the same way. A login path designed for older adults who struggle with recall can also help in everyday situations that teams rarely design around, like glare on a screen, one-handed use, fatigue, or returning after months away. When the front door of a product works for the most constrained moments, it usually works better for everyone.

_The article originally appeared on [Medium](https://medium.com/sixtytwo-tales/inclusive-login-starts-at-the-first-step-e3434676cd6e).  
Featured image courtesy: [Wosunan](https://www.shutterstock.com/g/WOSUNAN?dd_referrer=https%3A%2F%2Fwww.google.com%2F)._