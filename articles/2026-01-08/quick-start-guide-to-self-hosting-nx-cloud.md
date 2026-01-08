---
title: "Quick Start Guide to Self-Hosting Nx Cloud"
source: "https://www.bitovi.com/blog/quick-start-guide-to-self-hosting-nx-cloud"
publishedDate: "2025-11-27"
category: "frontend"
feedName: "Bitovi"
author: "kevin@bitovi.com (Kevin Phillips)"
---

  
Nx Cloud is a remote caching and task orchestration service that speeds up builds and tests for Nx workspaces. Deploying it into a Kubernetes cluster gives you full control over its configuration and infrastructure.

This guide walks through deploying [Nx Cloud](https://nx.dev/nx-cloud) in a self-hosted Kubernetes environment using Helm.

[![Vector](https://no-cache.hubspot.com/cta/default/2171535/interactive-175013859865.png)](https://www.bitovi.com/hs/cta/wi/redirect?encryptedPayload=AVxigLKizJ31jbCj%2Br23%2Fo5i08H6g9I0zmu42UahoBBFlb5smn835mgxTgi3jz%2Flxbfujdv6thnQuXVJceOrlVAacQCObk2XyisHw8HLYYZzDlPXyMGCWyNXbX0m7JklKJFajB6i78%2FEXkInHoR91x7KYaLNfayHhmY7ug%2FjnbDX7bNISIeY4agH0eQmSfRp2HEev8EVMlUaILVBL9eeKITCdSyY&webInteractiveContentId=175013859865&portalId=2171535)

## Prerequisites

Before starting, you need:

-   A running Kubernetes cluster
    
-   A provisioned MongoDB instance (such as MongoDB Atlas or self-hosted)
    
-   Helm installed and configured to work with your cluster
    

Creating the MongoDB Secret

Nx Cloud needs access to MongoDB for storing execution metadata. This connection string should be stored securely as a Kubernetes secret.

Create a manifest named `nx-cloud-secret.yaml` with the following content:

```
apiVersion: v1
kind: Secret
metadata:
  name: cloud
type: Opaque
stringData:
  nxCloudMongoServerEndpoint: <YOUR_MONGODB_URI>
  adminPassword: <DATABASE_PASSWORD>
```

Apply the secret to the cluster:

```
$ kubectl apply -f nx-cloud-secret.yaml
```

## Installing Nx Cloud with Helm

Add the Nx Cloud Helm repository and update your local index:

```
$ helm repo add nx-cloud https://nrwl.github.io/nx-cloud-helm
$ helm repo update
```

Create a `values.yaml` file with the configuration needed for your environment. Below is a basic example:

```
global:
  imageTag: "2025.03.2"
  namespace: nx-cloud

ingress:
  skip: true

secret:
  name: 'cloud'
  nxCloudMongoServerEndpoint: "nxCloudMongoServerEndpoint"
  adminPassword: "adminPassword"

fileStorage:
  storageClassName: gp3
  size: 5Gi
```

In this configuration:

-   The container image tag is explicitly defined.
    
-   Ingress is disabled (`skip: true`).
    
-   The secret named `cloud` is referenced for MongoDB credentials.
    
-   A persistent volume will be provisioned using the `gp3` storage class with a 5Gi allocation.
    

Once your `values.yaml` is ready, deploy Nx Cloud:

```
$ helm install nx-cloud nx-cloud/nx-cloud --values values.yaml
```

This command installs the Nx Cloud chart in the namespace specified under `global.namespace`, using the provided configuration.

## Verifying the Deployment

After the deployment completes, check that the pods and services are running:

```
$ kubectl -n nx-cloud get pods
NAME                                     READY   STATUS      RESTARTS   AGE
mongo-75cc95dbf8-wwh7t                   1/1     Running     0          27m
nx-cloud-aggregator-29076860-kgfh9       0/1     Completed   0          23m
nx-cloud-aggregator-29076870-csvls       0/1     Completed   0          13m
nx-cloud-aggregator-29076880-kmnxm       0/1     Completed   0          3m16s
nx-cloud-file-server-7477f47bc8-zsmxz    1/1     Running     0          26m
nx-cloud-frontend-68d797fb4d-9dgnk       1/1     Running     0          17m
nx-cloud-messagequeue-67757c7cff-pwn5k   1/1     Running     0          27m
nx-cloud-nx-api-674777c7d4-fmts5         1/1     Running     0          28m
```

Create port-forward to `nx-cloud-frontend`:

```
$ kubectl port-forward svc/nx-cloud-frontend-service 8080:8080

Forwarding from 127.0.0.1:8080 -> 4202
Forwarding from [::1]:8080 -> 4202
```

If you want to access Nx Cloud externally, configure an Ingress resource or use a LoadBalancer service, depending on your cluster setup.

Accessing nx-cloud-frontend:

![NxCloud](https://www.bitovi.com/hs-fs/hubfs/NxCloud.png?width=760&height=351&name=NxCloud.png)

## Conclusion

Running Nx Cloud on Kubernetes gives engineering teams full control over their remote caching and distributed task execution infrastructure. This approach is ideal for organizations that want to integrate high-performance caching into their CI/CD pipelines without relying on external hosting.

If you need help deploying or optimizing a self-hosted Nx Cloud instance, our backend and DevOps experts are here to help. [**Bitovi is an official Nx Partner**](https://www.bitovi.com/partnerships), with multiple Nx-certified engineers who have deep experience guiding organizations through monorepo strategy, scaling, and infrastructure design.

**👉** [**Learn more about our partnerships**](https://www.bitovi.com/partnerships)