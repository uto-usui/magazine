---
title: "Vercel Terraform Provider now supports Vercel Firewall resources"
source: "https://vercel.com/changelog/vercel-terraform-provider-now-supports-vercel-firewall"
publishedDate: "2024-10-04"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

1 min read

Oct 4, 2024

The [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs) now allows you to customize and control the [Vercel Firewall](https://vercel.com/docs/security/vercel-firewall) through Infrastructure as Code (IaC).

Key resources and their capabilities include:

-   Resource: `vercel_attack_challenge_mode`
    
-   Resource: `vercel_firewall_config`
    
    -   Attribute block: `rules`—Define and adjust [custom rules](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/firewall_config).
        
    -   Attribute block: `ip_rules`—Manage a list of [blocked IP addresses](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/firewall_config).
        

For example, to create a new rule that challenges requests where the `user_agent` contains `curl`:

```
resource "vercel_firewall_config" "example" {  project_id = vercel_project.example.id  rules {    rule {      name = "Challenge curl"      description = "Challenge user agents containing 'curl'"      condition_group = [{        conditions = [{          type = "user_agent"          op = "sub"          value = "curl"        }]      }]      action = {        action = "challenge"      }    }  }  }
```

Get started with the [Terraform provider for Vercel](https://vercel.com/guides/integrating-terraform-with-vercel) today. If you already have Terraform installed, upgrade by running:

Bash

```
terraform init -upgrade
```