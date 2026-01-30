---
title: "Inside Figma: getting out of the (secure) shell"
source: "https://www.figma.com/blog/inside-figma-getting-out-of-the-secure-shell/"
publishedDate: "2021-09-02"
category: "design"
feedName: "Figma Blog"
---

_Last year, the Figma security team built a simple solution for zero-trust shell access on AWS. To do this, they leveraged AWS SSO and [Systems Manager](https://aws.amazon.com/systems-manager/), an umbrella of services that provide monitoring and remote administration capabilities over various AWS resources. In this post, Security Engineer [Hongyi Hu](https://twitter.com/hongyihu) explains how the team designed the system and shares some tips to help other teams secure Systems Manager and protect their most sensitive data._

In order to protect production environments, many companies require engineers to use Secure Shell (SSH) to log in through a [bastion host](https://en.wikipedia.org/wiki/Bastion_host). Hackers love to target critical security controls like this to break into production and steal user data.

At Figma, we used this approach, too, for a few years. But as we scaled, managing and securing access became difficult and increasingly time consuming. So in mid-2020, we decided to build our own modern, zero-trust shell access system that’s more secure, easy to support, and simple to use. Here, I’ll share the story of how we built and rolled out this project, along with detailed advice so you can try this approach yourself.

When designing our system, we had a few important goals in mind. My teammate, Max, [previously shared some values](https://www.figma.com/blog/inside-figma-securing-internal-web-apps/) that reflect our approach as a security team. Here is how they came to life in this project:

-   **Smooth user experience.** Our system should be easy to use and reliable, empowering our teammates to be productive and secure.
-   **Zero-trust principles.** We believe that using zero-trust networking principles, if applied correctly, results in fewer systems to maintain and a clear security model that is easier to reason about.
-   **Strong, modern authentication capabilities.** We wanted to enforce SSO with phishing-resistant multi-factor authentication and limit the “blast radius” of stolen keys with short-lived, automatically rotating credentials.
-   **Centralized logging and auditing.** We need to be able to easily investigate and trace actions taken by an individual user.
-   **Minimal toil.** Our system should be simple to build, deploy, and easy to maintain.
-   **Incremental and backwards-compatible.** Our rollout plan should allow for incremental improvements and support existing use cases. It should avoid drastic changes and disruption to our teammates.

## [When out-of-the-box solutions won’t work](#when-out-of-the-box-solutions-won-t-work)

During our initial investigation, we evaluated commercial solutions like Okta Advanced Server Access. However, they weren’t flexible enough to support existing use cases easily and weren’t always available to us at our size. We were also concerned that external dependencies would add unnecessary complexity and introduce a potential source of availability risk into critical engineering workflows. Since we already used many AWS services in our infrastructure, we instead decided to explore building a simple, proof-of-concept design, using AWS components as building blocks.

Enter: [AWS Systems Manager](https://aws.amazon.com/systems-manager/), a set of operational tools for AWS infrastructure. For our purposes, Systems Manager can provide shell access to EC2 and ECS instances through a feature called [Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html), where the instances don’t need to expose a SSH port or be accessible by any external networks at all. I won’t rehash other [blog posts](https://aws.amazon.com/blogs/aws/new-session-manager/) that deep-dive into Session Manager, but in a nutshell, it creates and manages authenticated and encrypted TLS connections between an agent on a managed instance and the user’s client, like the AWS console or a CLI tool. Session Manager connections support running commands, starting an interactive shell, and even tunneling SSH sessions. Permissions can be centrally managed through IAM roles assumable by human users authenticating through AWS SSO.

## [SSO and access control: leveraging existing investments](#sso-and-access-control-leveraging-existing)

At a high level, we use Okta, our SSO provider, with AWS SSO to provide strong, centrally managed authentication with required device trust and required WebAuthN for multi-factor authentication. (For more details on how we rolled out WebAuthN at Figma, check out [this thread](https://twitter.com/frgx/status/1379504541666701313) from [Dev](https://twitter.com/frgx), who leads our team.) After authenticating, users assume a dedicated, minimally-privileged IAM role with short-lived AWS access tokens to begin a shell session via Session Manager. For auditing, Session Manager collects and sends session transcripts to an encrypted S3 bucket.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACrklEQVQokU2Sv4scZRjHF1KkCISkCUa0MViFC9go2MgJFgdGSJHTIgcSBRvTpPBiIUoIEhu7IGKTIsGE/AESrIQcuzP7i7vdbNbd2x+zt/NjZ2Zn5p1533fW27185PZCkuLL96k+PM/3+xRcz8N2HGzbwQ8C0jRFSkWWpcSTFv7uA/z2HYL2HcJnvyCa19DNDfTTK+jmFVRjg3R7A/H0Oqn1J4WxbTMYDukPBrjOmCSekqYCkUQEXg9nUMQd/EOwt4XfvUdS/Yx94ywL8w3y8gppeZWo+CHCXCXr3joC9gdDev0+tj0imvokcUQchfhul71eiXHvCa5l4HXuk5gfs9g6xrx4gqR6EafxK07tO5LKGrqzScFxHEajEZY1xPNc0jRBKYXMBImzhd/4Ab/yJWHtKtPyJVTxHAfF4+wbbzJtXGfULzN69oi4vkHe/Z7CNIoIA48wcEmSGK01s9l/5DpDuo/Jtj9HGheQxgqqdI794imel44zN86Q1L/Abd/F2bmNqF0i796gIKVEyQgtQ7RKUUqilUJJQTypE3b+IGz9vFS0c428fIHnpRMsSifJjPeZVL/BN9eRlY+OgIfnzXTETE2QaUgcR6QiIhMBvmcxsjpYgzbDfhO7/RBZX+PAOMW8dIa4eplx83fs+o+I6qevgLlOyKWPiH3CMFgWkiYeE2cXq99gsFvD+vdvJo2b6MoHHJin2TffYdrcZK9fYe/1DJfAXJIrQSri5YYiSchESGw/wW/exq99S1RdRxkrLEqnX2Yo6pdxW7/hbv+EqF0k724eAQ+LyLVGa7VsWCmNVgLl/oXaWUeb55mZ7zI332JhHv7gWebm2+jye4jKGqK8iq5/gu7dopBlGctilqBDvZhligoM9O5N8tZX5K2rL/yV9FJfH3nnBnL8iP8BTWHryuC3zLAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/68fdb732c45a889ac6e5e1fdc4f08e108abbe45a-1792x964.png?rect=1,0,1790,964&w=804&h=433&q=75&fit=max&auto=format)

Integrating [Okta with AWS SSO](https://docs.aws.amazon.com/singlesignon/latest/userguide/okta-idp.html) with group push was straightforward, and it allows our IT team to easily manage access control with Okta groups. Once SSO is set up, users who prefer a web experience can immediately start using Session Manager in the [AWS Systems Manager console](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html#start-sys-console), while those who prefer using a terminal can use [a simple CLI tool that we built](https://www.figma.com/blog/inside-figma-getting-out-of-the-secure-shell/#for-cli-fans).

One consideration when using AWS SSO is that it’s possible for attackers to conduct device code phishing ([see this excellent blog post](https://blog.christophetd.fr/phishing-for-aws-credentials-via-aws-sso-device-code-authentication/)). At a high level, an attacker could generate their own device authorization URL and attempt to trick a victim into visiting that URL and authorizing that request in order to retrieve an access token for the victim. Although engineers should find it suspicious to encounter an unprompted SSO page, we also added monitoring and alerts as additional mitigations for this scenario.

## [Setting up Session Manager](#setting-up-session-manager)

AWS has detailed guides for setting up Session Manager for [EC2](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-getting-started.html) and [ECS](https://aws.amazon.com/blogs/containers/new-using-amazon-ecs-exec-access-your-containers-fargate-ec2/). If you’d prefer not to pore over the docs, here is a detailed collection of tips that might save you some time:

### [Configuring IAM policies for Session Manager](#configuring-iam-policies-for-session-manager)

Session Manager uses separate sets of IAM permissions for both user roles and target resources; this allows you to craft minimally privileged policies scoped to specific target resources. For example, for EC2, the target instance must have permissions to create and open SSM message channels, and the user IAM role must have SSM session permissions on the target instance.

Similarly, for ECS, the task definition needs SSM message channel permissions, and the user IAM role must have `ExecuteCommand` permissions on the target container. ECS also requires a new KMS CMK, and key permissions must be configured to encrypt session logs.

### [Adding guardrails for users](#adding-guardrails-for-users)

For defense-in-depth, you can restrict IAM permissions to access or modify SSM documents, such as `SSM-SessionManagerRunShell` or `AWS-StartSSHSession`, to prevent users from getting a shell or tunneling SSH, or to require that your users use your own customized SSM configuration if you wish to restrict specific SSM workflows.

If you prefer to only expose certain commands to users, SSM `RunCommand` can be used to construct safe one-off invocations instead of providing a full interactive shell. For example, we use this feature in our deploy process to replace operations previously done via SSH connections and keys accessible by scripts.

### [Customizing EC2 instances](#customizing-ec2-instances)

You should configure [the username](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-run-as.html) and [sudo permissions](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-getting-started-ssm-user-permissions.html) of the system account being logged into. You may also want to use [configurable shell profiles](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-preferences-shell-config.html) because, by default, users are dropped into a bare Bourne shell without any customized environment configurations that they might expect.

### [Logging](#logging)

You may want to send logs to an encrypted S3 bucket or CloudTrail. Since logs contain a session ID, and assumed SSO IAM roles contain usernames, you can easily attribute individual sessions to human users. We send our logs to a separate account, use Service Control Policies to enforce encryption, block public access, and prevent deletion, and we monitor any read attempts. Note that if you use this, SSM will log _all_ shell output, which might contain very sensitive data like secrets!

### [Locking down Session Manager, even if you don’t use it](#locking-down-session-manager-even-if-you-don-t)

Because Session Manager is so powerful, it represents a potential attack surface into an AWS environment that should be carefully secured even if you’re not using the feature. For example, because `aws-ssm-agent` is pre-installed on many AMIs, an IAM user or role with sufficient Session Manager permissions can get a shell on an instance using that AMI, even if it has no configured network access.

Here are some of the main mitigations we implemented that you may want to consider, depending on your needs:

-   Audit whether any IAM users have System Manager permissions. Better yet, completely migrate away from long-lived IAM users, if possible.
-   For human users, grant the minimum necessary System Manager permissions to only those IAM roles that need them, limit the session duration of those roles, and restrict which instances can be connected to. AWS Systems Manager encompasses a large number of different IAM permissions, most of which are not required to start a shell session. Be careful if you use a default AWS SSM IAM policy; some of them grant very broad permissions, including full S3 access!
-   For similar reasons, grant only the necessary System Manager permissions for instance or task definition IAM policies.

## [For CLI fans](#for-cli-fans)

For users who prefer a CLI, we configured a seamless experience tying web-based SSO with CLI tools. This workflow received overwhelming positive feedback from our users. As one Figma engineer said, “\[This\] is really fun to use. I wish all security measures were so low-friction.” Making security feel fun is high praise indeed!

To set this up, we leveraged [a feature of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html) that automatically opens a web page to start the SSO flow when credentials are needed, and returns the credentials back to the CLI. For example, a user can set up their `~/.aws/config` like this:

Shell Script

```
[profile sso_session_manager]
sso_start_url=https://my-sso.awsapps.com/start
sso_region=us-east-1
sso_account_id=123456789011
sso_role_name=MY_SSO_SM_ROLE
sso_interactive_auth=true
```

With a tool like [aws-vault](https://github.com/99designs/aws-vault/blob/master/USAGE.md) to securely manage temporary AWS credentials, we can easily script the process of starting a shell session. For example, to start a shell in an ECS container:

Shell Script

```
aws-vault exec sso_session_manager --
    aws ecs execute-command \
    --region us-east-1 \
    --cluster <my_cluster> \
    --task <my-task-id> \
    --container <my-container-name> \
    --command "/bin/bash" \
    --interactive
```

If SSH is needed for EC2, we can also configure SSH to use Session Manager as a proxy by adding entries to the user’s `~/.ssh/config` like this:

Shell Script

```
host my-host.example.com
    User ubuntu
    ProxyCommand sh -c "aws-vault exec sso_session_manager -- aws ssm start-session --target <my-ec2-instance-id> --document-name AWS-StartSSHSession --parameters 'portNumber=%p'"
```

## [Rollout: deprecating SSH](#rollout-deprecating-ssh)

To rapidly deploy a useful solution with minimal disruption, it was important that we didn’t force large architectural or workflow changes right off the bat. Because some critical workflows like deploys depended heavily on SSH, we continued to support SSH connections but required tunneling through Session Manager, as I explained earlier. That resulted in both a usability win and a security win—existing users saw no real change to their normal SSH workflow aside from the new SSO requirement, and possessing an SSH key no longer granted SSH access by itself.

We gave users several weeks of notice to migrate to the new workflow while we allowed both tunneled SSH (SSH over SSM) and non-tunneled SSH (classic SSH) in the interim. That gave all users a grace period to switch over. After the deadline, we blocked all inbound connections from the internet (i.e., inbound SSH connections) to our bastions. This meant that SessionManager was now the only way to get shell access in our environment. To remain robust against potential SSM issues, a select few Figma engineers have the ability to remove these blocks in a break-glass situation, which will also fire off alerts for us.

One downside of tunneled SSH is that Session Manager acts only as a wrapper and thus cannot provide full session transcripts of the encrypted SSH traffic, so other tooling is needed to audit SSH connections. Instead, we eventually deprecated the need for tunneled SSH with a simple script as a convenient drop-in replacement for SSH. As described earlier, our script leverages the AWS CLI to call either `aws ssm start-session` for EC2 instances or `aws ecs execute-command` for ECS instances. Thus, our script [works with containers](https://aws.amazon.com/blogs/containers/new-using-amazon-ecs-exec-access-your-containers-fargate-ec2/)—whereas SSH does not—and allows developers to easily switch between different profiles used in our multi-account AWS environment. This script is now the standard way of safely getting shell access at Figma for the engineers who need it.

## [Empowering teammates](#empowering-teammates)

We shipped a modern, reliable, secure shell access system built out of native AWS services to replace our old bastion design. Our new setup drastically reduces the operational overhead on our infrastructure and IT teams, empowering our fellow Figmates to be productive and secure. And after we rolled this out, other infrastructure projects at Figma, like our deployment tools, have started to leverage parts of our system such as using SSM `RunCommand` instead of SSH scripts for added security.

We are a small team, passionate about modernizing security practices and contributing to the broader community. If that sounds exciting to you, [join us](https://www.figma.com/careers/)!

_Thank you to Alex Garbutt and Peter Collins for their helpful feedback on this blog post._