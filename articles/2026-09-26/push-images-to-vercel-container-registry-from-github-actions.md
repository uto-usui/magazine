---
title: "Push images to Vercel Container Registry from GitHub Actions"
source: "https://vercel.com/changelog/vcr-login-github-action"
publishedDate: "2026-09-25"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

You can now push container images from GitHub Actions to [Vercel Container Registry](https://vercel.com/docs/container-registry) (VCR) without storing long-lived registry credentials.

The new `vercel/vcr-action/login` action authenticates your workflow using GitHub OIDC. It exchanges the workflow’s OIDC token for a short-lived Vercel access token, then uses that token to log in to `vcr.vercel.com`. When the job ends, the action logs out and revokes the Vercel token.

To start:

-   Create an [OIDC policy](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%3FaddOidcPolicy%3Dvcr&title=Add+a+VCR+OIDC+Policy) on your Vercel team that matches the GitHub repository and workflow, and grants read-write access to VCR.
    
-   Store your Vercel team ID as a GitHub repo variable, for example `VERCEL_TEAM_ID`, along with the team slug, project slug, and repo name used in the image tag.
    
-   Give the workflow or job `id-token: write` permission.
    

Then add the login step before you build and push and the image:

```
name: Push to VCRon:  push:    branches: [main]permissions:  contents: read  id-token: writejobs:  push:    runs-on: ubuntu-latest    steps:      - uses: actions/checkout@v4      - uses: docker/setup-buildx-action@v3      - name: Log in to VCR        uses: vercel/vcr-action/login@v1        with:          team: ${{ vars.VERCEL_TEAM_ID }}      - name: Build and push        uses: docker/build-push-action@v6        with:          context: .          platforms: linux/amd64          provenance: false          tags: vcr.vercel.com/${{ vars.VERCEL_TEAM_SLUG }}/${{ vars.VERCEL_PROJECT_SLUG }}/${{ vars.VCR_REPOSITORY }}:latest          outputs: type=image,push=true,oci-mediatypes=true,compression=zstd,compression-level=3,force-compression=true
```

Authenticate with OIDC, then build and push a container image to VCR from GitHub Actions.

The action authenticates Docker by default. Pass `engines` to use Podman or Buildah instead.

After VCR finishes preparing a `linux/amd64` image, you can use it as a custom [Vercel Sandbox image](https://vercel.com/docs/sandbox/concepts/images). Within the same project, reference it as `<repository>:<tag>`.

Learn more in the [VCR documentation](https://vercel.com/docs/container-registry) and the [GitHub Actions guide](https://vercel.com/docs/container-registry/github-actions).