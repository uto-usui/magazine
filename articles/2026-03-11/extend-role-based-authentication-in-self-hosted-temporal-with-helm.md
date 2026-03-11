---
title: "Extend Role-Based Authentication in Self-Hosted Temporal with Helm"
source: "https://www.bitovi.com/blog/extend-role-based-authentication-in-self-hosted-temporal-with-helm"
publishedDate: "2026-03-10"
category: "frontend"
feedName: "Bitovi"
author: "mchaffe@bitovi.com (Matt Chaffe)"
---

**Repo:** [temporal-auth (helm-support branch)](https://github.com/bitovi/temporal-auth/tree/helm-support)

In [Part 1 of this series](https://www.bitovi.com/blog/implementing-role-based-authentication-for-self-hosted-temporal), we laid the foundation for securing Temporal namespaces with fine-grained access control. In Part 2, we go deeper: integrating custom ClaimMappers and Authorizers into Temporal's default Helm structure, splitting internal from external traffic, and authenticating both human users and service workers via OIDC.

This post covers:

-   What ClaimMappers and Authorizers do
    
-   How to extend Temporal's server to integrate your custom logic
    
-   How to use the custom image with Helm
    
-   Why the `internalFrontend` service is needed, and how to configure it
    
-   How to integrate OIDC logins and Server-to-Server tokens for workers and clients
    

## What are ClaimMappers and authorizers in Temporal?

Before diving into code, here's a quick recap of the two core concepts:

**ClaimMapper** A ClaimMapper takes an incoming authentication token (typically an OIDC/JWT), validates it, and extracts structured claims such as user ID, roles, and organization.

Example flow:

-   Validate JWT signature against your OIDC provider
    
-   Extract `email`, `groups`, `namespace_permissions`
    

**Authorizer** An Authorizer is called on every Temporal request. It checks the target API (e.g., `StartWorkflowExecution`) and target namespace against the user's claims, then allows or denies the request.

Together, they let you enforce organization-specific rules:

-   Only the finance team can start workflows in the `payroll` namespace
    
-   Developers may query workflow status but cannot terminate them
    
-   Service accounts may only interact with a subset of task queues
    

### Implementing custom ClaimMapper and authorizer logic

Here's the core server extension. The key detail: the `internalFrontend` service uses Noop implementations to bypass auth for internal cluster traffic.

```
temporalService := os.Getenv("SERVICES")
if temporalService != "" {
  log.Printf("Starting service: %s", temporalService)
  startService = []string{temporalService}
} else {
  log.Printf("Starting all services")
  startService = temporal.DefaultServices
}

oidc := NewOIDCClaimMapper()
claim := NewOIDCAuthorizer()

if slices.Contains(startService, "internal-frontend") {
    log.Printf("Using noop authentication for internal-frontend")
    oidc = authorization.NewNoopClaimMapper()
    claim = authorization.NewNoopAuthorizer()
}
```

We use Noop for the `internalFrontend` service, to bypass security.

Temporal is composed of multiple services (`frontend`, `history`, `matching`, `worker`). They constantly talk to each other internally. These internal calls don’t need to be authorized through OIDC, otherwise your cluster would effectively block itself.

That’s where the `internalFrontend` comes in:

-   It’s a clone of the frontend service that runs inside the cluster.
    
-   Internal Temporal services ( `history` , `matching` , `workers` ) talk to `internalFrontend` .
    
-   External requests (from SDK clients and workers) hit the frontend, which enforces authentication and authorization.
    

This split allows you to add custom logic for external calls while avoiding unnecessary checks for internal traffic.

![Mermaid Chart - Create complex, visual diagrams with text. A smarter way of creating diagrams.-2025-09-23-123846](https://www.bitovi.com/hs-fs/hubfs/Mermaid%20Chart%20-%20Create%20complex%2c%20visual%20diagrams%20with%20text.%20A%20smarter%20way%20of%20creating%20diagrams.-2025-09-23-123846.png?width=760&height=502&name=Mermaid%20Chart%20-%20Create%20complex%2c%20visual%20diagrams%20with%20text.%20A%20smarter%20way%20of%20creating%20diagrams.-2025-09-23-123846.png)

## Configuring Temporal with Helm

With the server changes above, build and deploy your custom image, then reference it in the Temporal Helm chart:

```
server:
  image: 
    repository: temporal-auth # Update to your custom repo+image
    tag: latest # Update to your custom tag
    imagePullPolicy: Always
  internalFrontend:
    enabled: true
  additionalEnv:
    - name: TEMPORAL_CONFIG_FILENAME
      value: config
    - name: TEMPORAL_CONFIG_PATH
      value: /app/config
   - name: TEMPORAL_CONFIG_TEMPLATE_PATH
      value: /etc/temporal/config/config_template.yaml
    - name: TEMPORAL_AUTH_PROVIDER_URL
      valueFrom:
        secretKeyRef:
          name: temporal-auth-secrets
          key: issuer_url
    - name: TEMPORAL_AUTH_CLIENT_ID
      valueFrom:
        secretKeyRef:
          name: temporal-auth-secrets
          key: client_id

web:
  additionalEnv:
    - name: TEMPORAL_AUTH_ENABLED
      value: "true"
    - name: TEMPORAL_AUTH_CALLBACK_URL
      value: "http://localhost:8080/auth/sso/callback"
    - name: TEMPORAL_AUTH_SCOPES
      value: "openid,email,profile"
    - name: TEMPORAL_AUTH_PROVIDER_URL
      valueFrom:
        secretKeyRef:
          name: temporal-auth-secrets
          key: issuer_url
    - name: TEMPORAL_AUTH_CLIENT_ID
      valueFrom:
        secretKeyRef:
          name: temporal-auth-secrets
          key: client_id
    - name: TEMPORAL_AUTH_CLIENT_SECRET
      valueFrom:
        secretKeyRef:
          name: temporal-auth-secrets
          key: client_secret
```

The above helm values will enable auth for the external-facing frontend, is configured by the additionalEnv field, and creates a separate internal vs external frontend deployment.

Here is what the `secrets.yaml` would look like for your deployment.

```
apiVersion: v1
kind: Secret
metadata:
  name: temporal-auth-secrets
stringData:
  issuer_url: https://YOUR_OIDC_DOMAIN
  client_id:  (from your Okta app)
  client_secret:  (from your Okta app)
```

## Authenticating workers and SDK clients with OIDC

### What Is OIDC?

OpenID Connect (OIDC) is an identity layer built on OAuth 2.0. It lets applications like Temporal verify a user's identity through an external Identity Provider (IdP) such as Okta, Auth0, or Keycloak. OIDC issues signed JWTs containing user claims, which drive both authentication and authorization decisions.

### Human Users

For users, the entry point is the Temporal Web UI. With OIDC configured:

1.  Users log in through your identity provider
    
2.  The Web UI receives a token and passes it with each request
    
3.  The ClaimMapper and Authorizer enforce access based on the claims in that token
    

### Workers and SDK Clients (Server-to-Server)

Workers and SDK clients need a Server-to-Server (S2S) flow:

-   Mint service tokens from your OIDC provider using the client credentials flow, static service accounts, or a token exchange endpoint
    
-   Configure workers/clients to attach these tokens when connecting to Temporal
    
-   Your Authorizer logic should distinguish between human users and service accounts
    

Here's a minimal Go example showing how a worker attaches a JWT Bearer token to Temporal requests:

```
// SimpleTokenProvider provides a basic Bearer token for authentication
type SimpleTokenProvider struct {
	Token string
}

// GetHeaders returns the Authorization header with the Bearer token
func (s *SimpleTokenProvider) GetHeaders(ctx context.Context) (map[string]string, error) {
	return map[string]string{
		"Authorization": "Bearer " + s.Token,
	}, nil
}

// NewSimpleTokenProvider creates a new simple token provider
func NewSimpleTokenProvider(token string) *SimpleTokenProvider {
	return &SimpleTokenProvider{
		Token: token,
	}
}

func main() {
	token := os.Getenv("TEMPORAL_AUTH_TOKEN")
	if token == "" {
		log.Fatalln("Set TEMPORAL_AUTH_TOKEN environment variable for custom token.")
	}

	c, err := client.Dial(client.Options{
		HostPort:        "localhost:7233",
		Namespace:       "bitovi-project",
		HeadersProvider: auth.NewSimpleTokenProvider(token),
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()

	w := worker.New(c, "hello-world", worker.Options{})

	w.RegisterWorkflow(helloworld.Workflow)
	w.RegisterActivity(helloworld.Activity)

	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start worker", err)
	}
}
```

## Conclusion

Extending Temporal's authentication layer isn't just a security checkbox. It's how you make a self-hosted Temporal cluster actually production-ready. With a custom ClaimMapper and Authorizer in place, you control exactly who can do what, in which namespace, and from which service. The `internalFrontend` pattern keeps that enforcement from collapsing under the weight of internal cluster traffic, and the Helm configuration makes the whole thing repeatable across environments.

If you're building on top of Part 1, you now have the full picture: from claim extraction to authorization logic to worker authentication. The next step is hardening your token issuance strategy and making sure your Authorizer handles edge cases like expired tokens, missing claims, and service account rotation.

## Work with Bitovi on Temporal

Setting up Temporal authentication is one piece of a larger architecture decision. If your team is evaluating self-hosted Temporal, migrating from a managed service, or trying to get role-based access right across multiple namespaces, Bitovi can help.

Our engineers have hands-on experience building and scaling Temporal workflows in production. We work embedded with your team, not around it.

[Talk to a Temporal consultant at Bitovi →](https://www.bitovi.com/services/temporal-consulting)

* * *

## FAQ

**What is a ClaimMapper in Temporal?** A ClaimMapper is a component that validates an incoming JWT from an OIDC provider and extracts structured claims (user ID, roles, namespace permissions) that the Authorizer uses to make access decisions.

**What is the internalFrontend service in Temporal?** The `internalFrontend` is a separate instance of Temporal's frontend service used exclusively for internal cluster communication. It bypasses OIDC auth so that internal services like `history` and `matching` can communicate without being blocked by the external auth layer.

**How do Temporal workers authenticate with OIDC?** Workers use a Server-to-Server (S2S) token flow. They mint a service token from the OIDC provider and attach it as a Bearer token on each request via a `HeadersProvider`. The Authorizer then validates the token and grants or restricts access based on the service account's claims.

**Can I use this setup with any OIDC provider?** Yes. The ClaimMapper and Authorizer logic is provider-agnostic. Okta, Auth0, Keycloak, and PocketID all work as long as they issue standard OIDC JWTs.