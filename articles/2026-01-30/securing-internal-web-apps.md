---
title: "Securing internal web apps"
source: "https://www.figma.com/blog/inside-figma-securing-internal-web-apps/"
publishedDate: "2021-08-12"
category: "design"
feedName: "Figma Blog"
---

_Over the last few months, the Figma security team has built out a system to securely provide access to internal applications using reusable cloud components and modern security technologies. We think this is a powerful pattern that can help teams across the industry protect their most sensitive internal apps. Here, Security Engineer Max Burkhardt is sharing a look at how we built the system, what we learned, and how this fits into our broader approach to security at Figma._

Figma, like most tech companies, relies on a suite of internally developed applications to make things work behind the scenes. From deploying our software to providing support functionality, the web tools we’ve developed are crucial to employee workflows. They also have stringent security requirements to ensure that only authorized employees can access them.

Attackers and cybercriminals have a history of going after administrative backends as a way to target user data. To protect our users and their data, we set out to build a system that could provide safe access to internal applications.

Our approach maximizes off-the-shelf components for easy maintenance and security network effects, but ties them together in novel ways to ensure that we have the best security practices in place. From the start, we had a few requirements:

-   **Smooth user experience.** Employee productivity is one of our top priorities, so our authentication system must be fast, reliable, and easy to access.
-   **Zero-trust principles.** Signing in from a “trusted network” isn’t a guarantee of trustworthiness. When authenticating clients, our security model must rely on stronger assertions than network address alone.
-   **Strong, modern authentication capabilities.** We want to leverage the latest and greatest in web security technologies to protect our internal applications. Any engineer working on an internal app should be able to easily utilize defenses like WebAuthn within the system we build.
-   **Centralized authorization.** The Figma IT and security teams need to be able to effectively assign, monitor, and adjust permissions granted to employees. A system that is too distributed will quickly become difficult to understand or control, and lead to either over-permissioning or user frustration.
-   **Minimal toil for the security team.** As a small team with a broad surface to secure, our solution for application access shouldn’t require too much ongoing SRE or operational work.

In this post, we’ll start with the core technologies and central configurations that provided a solution, and then go into some cool extensions that we built to take advantage of the capabilities of the architecture:

-   [What’s in play: technologies we used](https://www.figma.com/blog/inside-figma-securing-internal-web-apps/#whats-in-play-technologies-we-used)
-   [The basics: AWS Application Load Balancers & Okta](https://www.figma.com/blog/inside-figma-securing-internal-web-apps/#the-basics-aws-application-load-balancers-okta)
-   [Getting specific: using Okta Groups for Fine-Grained Authorization](https://www.figma.com/blog/inside-figma-securing-internal-web-apps/#getting-specific-using-okta-groups-for-fine)
-   [Give the engineers what they want: CLI Authentication](https://www.figma.com/blog/inside-figma-securing-internal-web-apps/#give-the-engineers-what-they-want-cli)
-   [Share the love: enabling secure guest access](https://www.figma.com/blog/inside-figma-securing-internal-web-apps/)

## [What's in play: technologies we used](#what-s-in-play-technologies-we-used)

There are a few key pieces of technology that we used in order to create a solution that met all of our requirements. Here is a quick refresher on some things we used to make this work.

-   [SAML](https://auth0.com/blog/how-saml-authentication-works/): a commonly used protocol for making assertions about a user’s identity across different environments & services, often used in single-sign-on infrastructures. SAML assertions can include statements about a user’s group membership & role as well as their identity.
-   [AWS Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html): a managed reverse-proxy service provided by AWS that can handle HTTP/HTTPS traffic based on a set of rules, and pass it into your infrastructure.
-   [AWS Cognito](https://aws.amazon.com/cognito/): an AWS service that provides user authentication and management APIs, as well as integrations with federated login technologies like SAML.
-   [AWS Lambda](https://aws.amazon.com/lambda/): a core part of “serverless computing,” Lambda allows you to deploy code and configure it to run under specific circumstances without worrying about its underlying platform or compute resources.
-   [Terraform](https://www.terraform.io/): a system for expressing infrastructure configuration as code, so that it can be reviewed, managed, and automated like the rest of your environment. Terraform has a pluggable provider architecture that allows it to configure not only AWS (one of its most common use cases), but also other cloud systems like Okta.

## [The basics: AWS Application Load Balancers & Okta](#the-basics-aws-application-load-balancers-okta)

At Figma, we use AWS for most of our cloud infrastructure, and we use Okta for our employee authentication and authorization. As a result, our solution focuses on using components provided by those platforms to achieve our goals. AWS Application Load Balancers (ALBs) support authentication of user traffic through a variety of means; often companies configure them with OpenID Connect (OIDC) authentication in situations like this. However, Okta charges extra for OIDC support, so we explored other options. You can also configure an ALB to authenticate users with plain SAML, as long as you pair it with an AWS Cognito user pool—this has some other advantages that we’ll get to later.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAABNElEQVQokY2R607DMAyFef+X4y8MIRBobTo62ibN3clB9tqqbEMi0mkcX77YzUPOGaWUu6Kc8Ve8suqiNZ8ID/yptf5WqSDnEPoeoT+DvF8AlzgX+0QYfRaxTQt0A/LadiLkvod7eoZ7eUUaBumWc0shxJRxHB0eGy1iO2a6Ba6Lu8nDgPD2jvDxiTzpHbAgZcLJBBy+LA69FTtdA9dRVptiRNAawRhQSlt8VaaCuCizb4kLkI2YEsw8Y7ZWHiKlhGmaRGxzXggR1jk458SH3WT1Gsiwpm2hVLcVKaXQtgrWWsQYMYwjVNehO52gtZZL6gK7Ac7zjFYpKWCA814K2cfnEALO528cm0YuHsdJgGt3N0DuwBgDY2YZh8dmEF90OZN0zp2xvPdSdxe4d+wf5r/a/8MfI/kOKP9WJr8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/1bdf8c04df534f69022dbce32294c66f3f14789c-2453x1300.png?w=804&h=426&q=75&fit=max&auto=format)

To automate the creation of ALB and Cognito resources with the right configuration, our team built Terraform modules in accordance with our infrastructure-as-code philosophy. These modules allow any infrastructure engineer to quickly get an ALB up and running that authenticates users through our Okta deployment. The specific details of the configuration here are too long for this post ([drop me a line if you’re looking for some code samples](mailto:maxb@figma.com)!), but here’s the basic configuration:

1.  We create a Cognito User Pool that disallows user registration. It is connected to a Cognito Identity Provider associated with a SAML Okta application provisioned for this internal app. Notably, we configure the Identity Provider to have mappings for the `email` and `profile` attributes, so that these are passed through the SAML assertion into the Cognito identity statement.
2.  We create a Cognito User Pool Client for the ALB to use, which specifies the ALB’s Oauth2 callback URL, enables the authorization code Oauth2 flow, and specifies which user attributes will be set during login (`email` and `profile` are specifically included here, again).
3.  Finally, we create an ALB object that is configured to authenticate all HTTPS traffic using the User Pool Client created above, before forwarding traffic to the application that we’re trying to expose. All HTTP traffic will be redirected to the HTTPS port.

Once these pieces are in place, users will automatically be redirected to Okta upon trying to visit the ALB. Assuming that they can successfully authenticate and have been assigned the app in Okta, their request will then be passed on to the internal application. Until their session expires, the user will not see any further authentication prompts.

This setup has a few key advantages:

-   Okta provides advanced authentication features, like [WebAuthn](https://webauthn.guide/) and [Device Trust](https://help.okta.com/en/prod/Content/Topics/device-trust/device-trust-landing.htm) verification. These are set up in our organization-wide Okta policies and can also be applied to the application as sign-in rules. As a result, we can require that for sensitive applications like our deploy manager, users be on a Figma-managed device and use their phish-proof, hardware MFA tokens.
-   ALBs can enable a number of useful security features with just a few clicks (or one `terraform apply`)—for instance, they [natively support HTTP desync mitigation](https://aws.amazon.com/about-aws/whats-new/2020/08/application-and-classic-load-balancers-adding-defense-in-depth-with-introduction-of-desync-mitigation-mode/), can be monitored with an [AWS Web Application Firewall](https://aws.amazon.com/waf/), and they’re patched automatically by AWS.
-   Because all of the traffic that gets forwarded to our backend has already been parsed and processed by the ALB, the servers that we maintain are shielded against some broad classes of attacks. For example, memory corruption attacks against HTTP or TLS parsing are significantly harder to pull off against our internal servers.
-   The ALB supports a customizable session timeout. This allows us to ensure that users have to re-authenticate with a trusted device every x hours, where x can vary based on the sensitivity of the application in question.

## [Getting specific: using Okta groups for fine-grained authorization](#getting-specific-using-okta-groups-for-fine)

Connecting internal applications to Okta apps via ALBs is a great start along the road to internal user authorization. Using Okta application assignments, we can control which employees can see each application. However, this is a coarse-grained mechanism. We have a number of applications that have broad use cases across the organization, but specific functionality that is best to keep more limited. Take the deployment app, for example: it’s desirable to let any engineer deploy their branch to their personal development environment; only the release manager should be able to deploy to production. Splitting this functionality across two different apps would be challenging from a management and UX perspective, so we built a mechanism to express more Okta authorization context to the underlying application.

This approach relies on the `profile` attribute that was mentioned above. With the right combination of configurations, we can send information about which Okta Groups a user belongs to through their SAML assertion, into Cognito, along through the ALB, and finally into the underlying app in the form of a signed JSON Web Token (JWT) in an HTTP header. Here’s how that combination works:

1.  In the Okta application configuration, we set up a “Group attribute statement” named `authorization` that specifies a set of Okta groups that should be sent to the underlying app. This specification can be a prefix match or a regex, and allows us to only send groups which might be relevant to the underlying application.
2.  In the Cognito User Pool, the attribute mappings copy the `authorization` statement into the `profile` attribute. Because this attribute is present in the configuration for the Cognito User Pool Client, it will get set when a user logs in through the ALB.
3.  The `profile` attribute will then contain the specified groups in the signed `x-amzn-oidc-data` header when sent to the application backend. [Amazon describes how to parse this header here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html#user-claims-encoding), but note that the approach may need to be tweaked depending on the language you are using and how strict its JWT libraries are.

If you’re not using Python and are therefore unable to use the sample code provided by Amazon, the following pseudocode describes the operations necessary to safely verify and extract the identity data provided in this JWT. Note that many JWT libraries will fail to validate these tokens because of [this bug in Amazon JWT encoding](https://github.com/auth0/node-jsonwebtoken/issues/514), so you may need to decode and verify the token separately. This is a security-sensitive operation that is tricky to get right, so test your code thoroughly!

1.  Split the `x-amzn-oidc-data` header on the `.` character, and Base64-decode the first element.
2.  Parse the decoded element as JSON. Note that you have not verified the JWT yet—we need to decode the JWT header in order to extract the Key ID necessary to fetch the signing public key.
3.  Extract the `kid` value from this JSON object, as well as the `region` value from the `signer` key.
4.  Validate that the `kid` and `region` values conform to their expected formats (`kid` should be a UUID, and `region` should be a valid AWS region).
5.  Fetch Amazon’s public key at `https://public-keys.auth.elb.${region}.amazonaws.com/${kid}`. You will likely want to cache this value.
6.  Now that you have the public key, verify the whole JWT (the value of the `x-amzn-oidc-data` header), using whatever method your JWT library provides. If verification fails for any reason, throw an authentication error. Make sure that the `alg` attribute of the JWT is an expected one, and not [`none`](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/)!  
    \*\* _JavaScript note: if you are using the_ `verify` _method from the_ `jws` _library in JavaScript to check the token, it will not perform expiry verification on your behalf; you will need to check the expiry of the token manually (via the_ `exp` _field) and ensure it is still valid._
7.  Validate that the `iss` value in the JWT header is equal to the expected URL of the Cognito User Pool associated with this application. This check ensures that an attacker is not presenting a validly signed JWT that is attached to an unrelated Cognito pool that might be from a different account.
8.  Return the `email` and `profile` fields from the payload of the JWT.

With this, applications can check a user’s Okta Groups using a helper function written by the Security team and determine what capabilities to grant a user—all while keeping the management of those permissions within Okta, our centralized employee identity provider. The signed header also includes the user’s email, allowing applications to have trustworthy logging about who is performing what actions.

We went a step further in facilitating this hand-off with some opinionated guidance on how groups should be structured for this use case. It’s tempting to put users in groups based on their team or department in Okta, and then check those in your application code to validate whether an action should be allowed based on a user’s job function. However, this binds application logic to organizational structure, which is likely to change. It also makes it hard to quickly understand what permissions a particular team has been granted. Fortunately, Okta has a feature that allows you to bridge this gap: Group Rules.

Group Rules allow you to assign a user to a group based on a predicate written in the [Okta Expression Language](https://developer.okta.com/docs/reference/okta-expression-language/). In our case, this means that we can create many groups—one for each permission—and then use rules to automatically assign those groups to users based on the team listed in their Okta profile. This way, applications can check for a specific group related to the permission, eg. `#Deploys dev_environments`, instead of checking for a list of team names. This has the added advantage of making it easy to see what permissions a team has: just check the Group Rules in Okta where the team is mentioned, and you’ll see all of the group relationships that that implies.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAf0lEQVQImW2NSQ6DQAwE+f9Pk1kTBpjFnooMCsohh1K3D65ecn4RQsT7gHOex9PhfKCUnTEU0XmjOplzIiL03s+0e8hkb0rtyhJjwrlAiImYVnxaCXnjXRpbFY6mN/ZoAkNVf/olHaIsKWVMWsrGUQd7lZOjXTJb/fIr/IeNfACx8+pXfdZ1/gAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/920e781ddf15b8cf9e4d265cdca24ab42f66f7eb-1600x220.png?rect=3,0,1594,220&w=804&h=111&q=75&fit=max&auto=format)

Example Group Rule

To ensure that these associations are well-tracked and all changes are safely logged, we create them using the [Okta Terraform Provider](https://registry.terraform.io/providers/oktadeveloper/okta/latest) and check them into our repository along with the rest of our Terraform code.

_Note: if an application needs extremely fine-grained permissions, it’s possible that the number of Okta groups sent in the JWT will make the token unreasonably large. If a particular application needs dozens or hundreds of individual permissions, it may be valuable to invest in an independent mapping system between user groups and capabilities._

## [Give the engineers what they want: CLI authentication](#give-the-engineers-what-they-want-cli)

Secure internal web applications are great, and as a company that builds design software, it’s fun to use Figma to design our own tools. However, some functionality really works best as a command line tool, and in certain cases, it’s the right approach. The [Figma infrastructure team](https://www.figma.com/blog/under-the-hood-of-figmas-infrastructure/)

has built a wide variety of custom CLI (command line interface) tools that often need to make HTTP API calls to get things done. Soon after we set up the ALB-based authentication system described in this post, we wondered: how hard would it be to make API calls against our own internal services from a command line tool?

At first glance, it’s a challenge: the ALB-to-Okta authentication dance requires multiple redirects and complex browser functionality like WebAuthn. A CLI acting as a browser also wouldn’t be able to reuse the employee’s existing session. To get around these problems, we were inspired by the “browser pop” approach used by the [AWS SSO CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html). By calling a library written by the Figma Security team, an internal CLI tool can trigger the user’s browser to open a page that will confirm the user’s intent to authenticate their terminal and forward the user’s ALB authentication cookie back to the CLI app. Because this is enabled by standard Terraform modules and client libraries, an engineer can enable CLI auth for their internal service with just three lines of code!

Plain text

// In the Terraform configuration for our 'gateway\_alb' module:
allow\_cli\_auth = true
// In a Typescript CLI tool:
import { cliAuthenticate } from '../../share/cli-auth';
const authCookies = await cliAuthenticate('https://deploys.figma.com');

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVQ4jbWS2W6DMBBFvduEJRACJkVEKfkDGsP/f9mtbKIoLc5Ll4cjjS8zhwGZzG6Ccx+Y53nFzXDOPbjdbpimKeDrkIfeBcuy4ms/uywzSJ5nSNN0Q5ZlUWK96R3vIpQSEPIVSimMMRuxzxhjm37yDOcsCJ5DP9h1HS6Xy4NhGNC2bRALITYzlBIwRlfh97d4Yd/3uF6vGMcR5/M5yMqyDEKl1EZICAHzmYgIpZSoqgrWWjRNg6IogsRv5nn12XQV8ugDL9VaBxGP9LwU8siGP4X+i1BwDvpnQhL/h78i2yUwWkEpCX1HKQEl+YrgkJzB3wYpPPczo5CcrhlnUIJBSwbyPnTouyNObY2TrfFmfX2ArYtAW6Woc41DrlHvd2irDHVuUCYi5Me9wbEwaMoEtkzwCUskHnOhjbD1AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/f5a91ae43d355923c96683f155fdf0cedd554535-1600x1068.png?rect=1,0,1599,1068&w=804&h=537&q=75&fit=max&auto=format)

The CLI authentication confirmation screen

Here is how the magic happens:

1.  Upon requesting authentication, the CLI uses Mac OS’s `open` command to open a special route for the requested service in the user’s default browser.
2.  A high-priority rule configured on the ALB routes that request to a Lambda function (maintained by the Security team). That function presents the confirmation dialog.
3.  Upon clicking “Authenticate in my terminal," the Lambda will send the user’s ALB authentication cookies to a webserver that the CLI started on `127.0.0.1`, allowing the CLI to receive them and attach them to future API calls. This approach avoids the [phishing risks present in some device code authorization flows](https://blog.christophetd.fr/phishing-for-aws-credentials-via-aws-sso-device-code-authentication/).
4.  The CLI also stores the returned cookies in encrypted storage using the Mac OS keychain, so they never touch the disk in plain text.

There are a few key security features to ensure a safe flow:

-   There’s a random state token that is generated by the CLI, passed through the web interaction, and included in the response to the local webserver. If any requests received by the local webserver lack the correct state token, they are immediately rejected.
-   The CLI ensures that the webserver can correctly bind to the designated port before opening the webpage. This ensures that it gets the cookie, not some other local service that was able to bind the port first.
-   The confirmation page is displayed with a very strict Content Security Policy that helps provide an additional layer of defense against web application attacks.

Thanks to this feature, our local CLI tools can do things like check deployment state or look up internal information with minimal code changes and a few clicks from the user.

The fact that we are using Cognito User Pools to gate access to our internal ALBs has another advantage: User Pools don’t have to be limited to just SAML users. We’ve run into a few cases where we’d like to expose an internal application to a trusted guest; for instance, when giving access to a private beta. Because our ALB authentication is backed by the full capabilities of Cognito, we can make a new user account that’s unassociated with our Okta environment in the User Pool. Then, we can pass the credentials over to the partner and let them log in without having to provision them a Figma employee account.

Enabling this is as simple as specifying the `COGNITO` identity provider alongside your Okta one in the User Pool Client configuration for your ALB. As soon as you do this, the login page will switch to one that allows either Okta/SAML login or Cognito-based username & password login. Notably, this only works if a User Pool is very explicitly configured in this way—we leave this out of the defaults, so most internal apps will only support Okta logins.

## [Bringing it all together](#bringing-it-all-together)

Using the infrastructure components described above, we built a modern, highly secure application gateway product for internal use that doesn’t demand extensive, ongoing maintenance from the team—in fact, the security team doesn’t even have to operate any servers in this setup. Instead, they just act as code owners for the Terraform configurations and the CLI authentication Lambda & associated libraries.

This project has leveled up our infrastructure defenses and inspired a number of new projects for the coming months. The team is working to apply similar methodologies to all of our application and infrastructure defenses—from detecting attacks in our corporate network, to identifying authorization vulnerabilities automatically in our primary web application. As we continue to innovate and experiment in this arena, we’ll share what we can with the community.

We are a small team, passionate about modernizing security practices and contributing to the broader community. If that sounds exciting to you, [join us](https://www.figma.com/careers/)!