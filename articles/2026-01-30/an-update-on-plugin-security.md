---
title: "An update on plugin security"
source: "https://www.figma.com/blog/an-update-on-plugin-security/"
publishedDate: "2019-10-02"
category: "design"
feedName: "Figma Blog"
---

We recently [launched Figma plugins](https://www.figma.com/blog/introducing-figma-plugins/)

, the next phase of our platform efforts. As those of you who read our

[engineering blog post

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB2ElEQVQoz3WRz2sTQRTH80ck2d3sZpOUNon44yht2vQg2p49KFZQUqziRcFsFOpBEQ9WoZXSplSxHgqac3JWclCoopdGsu3G6k0UKooKevw4b5KVQPHwZd7M981n3nsTMQwDUSKR0DJMk+xAkbPjt1k7uUx9eoHGzCKNc4vUSws8OrHEmbFbDGbGdK5t21iW9Y8R2QM0TIbSBS4fqbBxfZ7PtRqf6g0tiTdm57mkvGxmFNO0sNWdECirBprqJYHZtlRokU0NU5kss7XymD+dTb587CgF/A428atreMeukM8UMK1uEQIShgaGGzEcx8ZQSQL0Jiu0Hz7l+4cAf7tDq+3ztbOlzp5oL9cDShFyVxiiSH+5Mg9JyqZH8CbK+Kvr/Nhps/M+INj2+Ra08B+sq+o9nSPdhMBwdJGQroESK2B+YJTyUY/W3Sq/Xj5n9+1rdt+84ueLZ7y7t6JaVjNM/QfY33IXrmao2ikVr1Ir3aE5e5/mjSrNm1Ud10pzTBevMagr7P5yCNQt9/+y3fvllHuQwqEpjh++yNTIeU4XLmidGp7RZ+K5yQM6dw8wFoshEsNxnB7cIZ3Oqb2SnVPxfvXIPhLWEMlkXnuG0Z2967oaGI1Gicfj/AUxvEnvqpPd1wAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/70e74a9fae7202ca51ab221135971777eec1ca8a-4240x2000.png?w=4240&h=2000&q=75&fit=crop&crop=focalpoint&auto=format)

### How to build a plugin system on the web and also sleep well at night

How do you run plugins with security, stability, and performance? Our pursuit for the perfect plugin solution, and how our approach helps us run Figma plugins in a safe way.



](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)

know, we did a lot of research to figure out how to safely run 3rd-party code on figma.com. We eventually settled on a technology called the [Realms shim](https://github.com/agoric/realms-shim/) to do this.

A little over two weeks ago, several independent vulnerabilities were recently discovered with the Realms shim that could have allowed code inside the sandbox to escape. We promptly fixed the vulnerabilities, and after auditing all published Figma plugins we have no evidence that the vulnerabilities were ever exploited by a Figma plugin. We then went further and made a fundamental change to our technology stack to help prevent this type of vulnerability from happening again in the future. Please read the remainder of this post for more details.

## [Background](#background)

Before we talk about the vulnerabilities, it’s useful to have background on the security principles of Figma plugins.

Figma seeks to ensure that plugins **can**:

-   Only be run by an explicit user action
-   Show UI in a single plugin-specific dialog
-   Read any data in your Figma document (e.g. a “find layer by name” plugin)
-   Modify any data in your Figma document (e.g. a “rename selected layers” plugin)
-   Communicate with any server over the internet (e.g. an “import from service X” plugin)

Figma seeks to ensure that plugins **can’t**:

-   Run by themselves
-   Get information about the project or team that owns the file
-   Access anything when they aren’t running
-   Access data from any files other than the file they were run in
-   Change Figma’s UI outside of the plugin UI dialog

Figma's [Organization tier](https://www.figma.com/organization/) has an additional security feature: administrators can configure a whitelist of plugins that are allowed inside the organization. This can be used to prevent untrusted plugins from being run in any file in that organization.

## [Figma’s response](#figma-s-response)

There were two rounds of vulnerability disclosures, one published as a public GitHub issue and the rest published as a private GitHub security advisory. Please refer to [this blog post](https://agoric.com/realms-shim-security-updates/). Had these vulnerabilities been exploited, the restrictions that Figma puts on plugins (described above) could have been bypassed.

Agoric, the team that makes the Realms shim, promptly notified us once the first vulnerability was disclosed and worked closely with us and with other companies that use the Realms shim to make sure the fixes were rolled out responsibly to minimize risk. All fixes have now finished rolling out and all details about the vulnerabilities have now been made public.

To ensure the security of our users, the main actions we took were to:

-   Disable publishing of new plugin code until the incident was fully resolved
-   Apply the patch to the known public vulnerability as soon as possible
-   Coordinate with Agoric and other affected parties about a public disclosure timeline
-   Make a technology change (described in the next section) that avoided the privately-disclosed vulnerabilities

First, we prevented new plugins from being published to the community hub. We can do that by simply halting plugin reviews, since all new Figma plugins have to be manually reviewed and approved by us before they appear in the community hub for people to install. It's worth noting that our manual review process is about plugin user experience. We do not rely on human reviews to audit newly-published plugins for security as audits can produce false negatives. We instead use a sandbox to enforce a security boundary.

We also completely disabled publishing updates to existing plugins. This ensures that if a plugin developer with existing plugins was aware of a vulnerability, they could not exploit it. This was especially important as plugin code in Figma is live, which means updates to existing plugins instantly propagate to all open clients.

The first vulnerability was published as a public GitHub issue, and therefore needed to be patched immediately. Fortunately, Agoric moved fast and had a fix on the same day. We applied the fix to Figma’s copy of the Realms shim and it went out with the next deploy.

The remaining vulnerabilities were disclosed in a private GitHub security advisory that only a few affected parties had access to. We were able to deploy a solution to those the following week. However, we waited before talking about the vulnerability publicly. With security advisories, the standard practice is to set a public disclosure date that gives enough time for affected parties to apply the patch while also acting as a deadline to make sure the vulnerability is patched promptly.

As such, we worked with Agoric to ensure that these issues remained private until after we had fully rolled out our fixes. We also did an audit of published plugin code and discovered no evidence that these vulnerabilities had ever been exploited by a Figma plugin.

## [A technology change](#a-technology-change)

The biggest change we made while responding to this incident was to change the way we run JavaScript code in plugins. We no longer use the Realms shim at all. We now use [QuickJS](https://bellard.org/quickjs/), a JavaScript VM written in C and cross-compiled to WebAssembly. This was our backup plan in case the Realms shim approach didn't work out. We were able to activate our backup plan very quickly thanks to a swappable architecture.

All vulnerabilities that were discovered with the Realms shim during this incident are no longer possible with our new implementation. This specific class of issues involve the Realms shim confusing an object from outside the sandbox with an object from inside the sandbox or vice versa. This is possible because the Realms shim uses the same JavaScript VM for all code both inside and outside the sandbox. Now that we're using a JavaScript VM compiled to WebAssembly, it's not possible to confuse objects from outside with objects from inside because the object representations are too different.

Why did we originally pick the Realms shim for Figma plugins? The Realms shim provides great performance and makes debugging Figma plugins really easy with minimal work on Figma's part. Code running inside the Realms shim still uses the browser's JavaScript VM so it runs just as fast as normal JavaScript. And the browser's built-in debugger can debug plugins in the Realms shim with the same rich development experience that all web developers are used to.

Why have we decided to keep using our backup plan, even though all vulnerabilities in the Realms shim have been fixed? We're actually very happy with the fact that we can switch back and forth between a Realms-based security model and a VM-based security model, but it comes at a cost. It is disruptive to us, and more importantly, disruptive to our developers. For now, it feels like the right call is to stick with the VM-based approach, which is somewhat slower for certain plugins, but intrinsically more secure. As Realms matures and evolves, we will always be able to switch back when the time is right.

## [The timeline](#the-timeline)

Saturday, Sept 14th: - The first vulnerability was disclosed on a GitHub issue - Figma stopped approving new plugins

Monday, Sept 16th: - Figma began working on the new WebAssembly JavaScript runtime - A GitHub security advisory thread containing the remaining vulnerabilities was started

Tuesday, Sept 17th: - Figma deployed the patch for the first vulnerability

Wednesday, Sept 18th: - Figma disabled publishing updates to existing plugins

Wednesday, Sept 25th: - Figma shipped the new WebAssembly JavaScript runtime - Figma re-enabled plugin publishing - Figma did an audit of published plugin code and discovered no evidence that these vulnerabilities had been exploited by a Figma plugin

Wednesday, October 2nd: - Agoric made all vulnerabilities public - This post was published