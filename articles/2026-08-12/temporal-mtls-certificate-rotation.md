---
title: "Temporal mTLS Certificate Rotation"
source: "https://www.bitovi.com/blog/temporal-mtls-certificate-rotation"
publishedDate: "2026-08-11"
category: "frontend"
feedName: "Bitovi"
author: "mchaffe@bitovi.com (Matt Chaffe)"
---

Mutual TLS (mTLS) is commonly used to secure connections between Temporal Workers and a Temporal Cluster.

Certificates eventually expire and need to be rotated. The obvious expectation is that replacing the certificate on disk is enough for running Workers to automatically begin using the new certificate.

For some Temporal SDKs, this is exactly how it works. For others, it isn't.

This article explains why, then walks through a complete implementation for rotating mTLS certificates in the TypeScript SDK without restarting a Worker.

Throughout this article, we assume something outside your application is already responsible for writing updated certificates to disk. This might be:

-   cert-manager CSI Driver
-   Vault Agent
-   A scheduled job
-   Another certificate management process

How the certificates arrive is not important. Our goal is simply to detect new certificates and replace the active Temporal connection.

### Why some SDKs support certificate rotation natively

Not every Temporal SDK manages TLS in the same way. Some SDKs use the language's native gRPC and TLS implementation. Others use Temporal's shared Rust Core. This difference determines whether certificate rotation is built into the SDK.

 **SDK**

**Native certificate rotation**

**Implementation**

 Go

✅ Yes

tls.Config.GetClientCertificate

 Java

✅ Yes

AdvancedTlsX509KeyManager

 TypeScript

❌ No

Temporal Rust Core

 Python

❌ No

Temporal Rust Core

 .NET

❌ No

Temporal Rust Core

 Ruby

❌ No

Temporal Rust Core

The distinction is not the programming language. It is whether the SDK owns the TLS connection itself, or delegates connection management to the shared Rust Core.

### Example: Go

The Go SDK supports certificate rotation through Go's native TLS stack.

Instead of supplying certificate bytes, you provide a callback that is invoked whenever a new TLS connection is established.

package main  

import (  	

      "crypto/tls" 	  
      "log" 	  
      "go.temporal.io/sdk/client"  

)  

func main() { 	  
       const ( 		  
               hostPort = "my-namespace.a1b2c.tmprl.cloud:7233" 		  
               namespace = "my-namespace" 		  
               certPath = "/certs/tls.crt" 		  
               keyPath  = "/certs/tls.key" 	  
      ) 	  
      c, err := client.Dial(client.Options{ 		  
               HostPort:  hostPort, 		  
               Namespace: namespace, 		  
               ConnectionOptions: client.ConnectionOptions{ 			  
                      TLS: &tls.Config{ 				  
                             GetClientCertificate: func(\*tls.CertificateRequestInfo)   
(\*tls.Certificate, error) { 					  
                                   cert, err := tls.LoadX509KeyPair(certPath,   
keyPath) 					  
                                   if err != nil { 						  
                                           return nil, err 					  
                                   } 					  
                                   return &cert, nil 				  
                              }, 			  
                        }, 		  
                  }, 	  
          }) 	  
          if err != nil { 		  
                 log.Fatal(err) 	  
          } 	  
          defer c.Close() 	  
          // Create and run your Worker as normal...   
}

Every new connection reads the latest certificate from disk.

When certificates are rotated, new connections automatically begin using them without any additional application logic.

### Why TypeScript is different

The TypeScript SDK uses Temporal's shared Rust Core.

When a NativeConnection is created, the certificate files are read once and passed into the Rust Core as bytes.

const connection = await NativeConnection.connect({     
   address,     
   tls: {       
      clientCertPair: {         
        crt: await readFile(certPath),         
        key: await readFile(keyPath),       
     },     
   },   
});

Notice that the SDK reads the certificate contents rather than the file paths. Once the connection has been created, replacing the files on disk does not affect the existing connection.

To begin using the new certificates, a completely new NativeConnection must be created.

### What we need to build

Our solution consists of five parts.

![](https://www.bitovi.com/hs-fs/hubfs/undefined-Aug-05-2026-08-56-04-4102-PM.png?width=434&height=882&name=undefined-Aug-05-2026-08-56-04-4102-PM.png)

We'll build each component individually before combining everything into a complete implementation.

### Part 1: Detect certificate changes

The first step is detecting when certificate files have changed.

Rather than reading the full certificate contents every few seconds, we can compare simple file metadata such as modification time and size.

import { stat } from "node:fs/promises";  

export async function computeCertFingerprint(     
  certPath: string,     
  keyPath: string   
): Promise<string> {     
  const \[certStat, keyStat\] = await Promise.all(\[       
    stat(certPath, { bigint: true }),       
    stat(keyPath, { bigint: true }),     
 \]);    

return \[       
  certStat.mtimeNs,       
  certStat.size,       
  keyStat.mtimeNs,       
  keyStat.size,     
 \].join(":");   
}

The function:

-   Reads certificate metadata
-   Generates a fingerprint
-   Returns a value that can be compared during the next poll

If the fingerprint changes, we know something updated the certificate files.

### Part 2: Create a new connection

Whenever a certificate change is detected, we create a completely new NativeConnection.

import { readFile } from "node:fs/promises";   
import { NativeConnection } from "@temporalio/worker";    
interface ConnectionOptions {     
  address: string;     
  certPath: string;     
  keyPath: string;     
  serverNameOverride?: string;   
}  

export async function createConnection({     
  address,     
  certPath,     
  keyPath,     
  serverNameOverride,   
}: ConnectionOptions): Promise<NativeConnection> {     
  const \[crt, key\] = await Promise.all(\[       
    readFile(certPath),       
    readFile(keyPath),     
\]); 

   return NativeConnection.connect({       
  address,       
  tls: {         
    clientCertPair: {           
      crt,           
      key,         
},         
    serverNameOverride,       
   },     
 });   
}

Unlike the original connection, this new connection reads whatever certificate files currently exist on disk.

If new certificates have been written, the new connection begins using them immediately.

### Part 3: Swap the Worker connection

After establishing the new connection, we replace the Worker's active connection with it.

import {     
  NativeConnection,     
  Worker,   
} from "@temporalio/worker";  

interface ReplaceConnectionOptions {     
  worker: Worker;     
  createConnection: () => Promise<NativeConnection>;     
  closeDelayMs: number;   
}  

export async function replaceWorkerConnection({    
  worker,     
  createConnection,     
  closeDelayMs,   
}: ReplaceConnectionOptions): Promise<boolean> {     
  const previousConnection = worker.connection;    

try {       
   const newConnection = await createConnection();      

   worker.connection = newConnection;      

   if (previousConnection) {         
     closeSupersededConnection(           
        previousConnection,           
        closeDelayMs         
      );       
    }      

    return true;     
 } catch (error) {       
   console.error(         
      "Unable to replace Temporal Worker connection",         
      error       
    );      

return false;     
  }   
}

The Worker immediately begins using the new connection for future requests.

The previous connection is left alive briefly so that any in-flight requests can complete before it is closed.

Why does replaceWorkerConnection() return a boolean?

The function returns true only if the Worker successfully adopted a newly created connection.

const replaced = await replaceWorkerConnection(ctx);  

if (replaced) {     
  certFingerprint = nextFingerprint;   
}

The polling loop keeps track of the certificate fingerprint that the Worker is currently using.

When it detects that the certificate on disk has changed, it attempts to create a new NativeConnection and swap the Worker to it.

The fingerprint should only be updated after that swap succeeds.

If the new connection cannot be established, for example because the certificate files are only partially written or there is a temporary network issue, the Worker continues running on the existing connection.

In that case, replaceWorkerConnection() returns false, so the polling loop leaves the stored fingerprint unchanged.

On the next poll, the fingerprint on disk still differs from the stored fingerprint, so another replacement attempt is made automatically.

If the function returned a success indicator but the fingerprint was updated anyway, the polling loop would assume the new certificate had already been applied and would never attempt another rotation.

### Close the previous connection

The previous connection should not be closed immediately. It may still have requests in flight when the Worker is switched to the new connection. closeDelayMs specifies how long the old connection remains open after the Worker switches to the replacement connection.

The value is not tied to certificate lifetime or the polling interval. It is simply a short grace period for requests already using the previous connection.

function closeSupersededConnection(     
  connection: NativeConnection,     
  closeDelayMs: number   
): void {     
  const timer = setTimeout(() => {       
    connection.close().catch((error: unknown) => {         
      console.error(           
        "Unable to close superseded Temporal connection",           
        error         
      );       
   });     
 }, closeDelayMs);  

    timer.unref();   
}

The delay gives existing requests time to complete before the previous connection is closed.

### Part 4: Watch for changes

The final piece is a polling loop.

Every few seconds, the watcher:

1.  Computes the latest fingerprint
2.  Compares it to the previous fingerprint
3.  Creates a new connection if required
4.  Swaps the Worker connection

Once running, the Worker automatically begins using newly written certificates without requiring a restart.

interface WatchCertificateOptions {     
  worker: Worker;     
  certPath: string;     
  keyPath: string;     
  pollIntervalMs: number;     
  closeDelayMs: number;     
  createConnection: () => Promise<NativeConnection>;     
  signal?: AbortSignal;   
}    
export async function watchCertificateChanges({     
  worker,     
  certPath,     
  keyPath,     
  pollIntervalMs,     
  closeDelayMs,     
  createConnection,     
  signal,   
}: WatchCertificateOptions): Promise<void> {     
  let currentFingerprint: string | undefined;    

  while (!signal?.aborted) {       
    try {         
      const nextFingerprint =           
        await computeCertFingerprint(certPath, keyPath);        

if (currentFingerprint === undefined) {           
  currentFingerprint = nextFingerprint;         
} else if (nextFingerprint !== currentFingerprint) {           
  const replaced = await replaceWorkerConnection({             
    worker,             
    createConnection,             
    closeDelayMs,           
});          

  if (replaced) {             
    currentFingerprint = nextFingerprint;           
  }         
 }       
} catch (error) {         
  console.error(           
    "Unable to check Temporal mTLS certificate files",           
    error         
  );       
} 

       await sleep(pollIntervalMs, signal);     
 }   
}

### Complete implementation

The following implementation combines all four pieces into a complete certificate rotation solution.

import { readFile, stat } from "node:fs/promises";   
import {     
  NativeConnection,     
  Worker,   
} from "@temporalio/worker";  

interface CreateConnectionOptions {     
  address: string;     
  certPath: string;     
  keyPath: string;     
  serverNameOverride?: string;   
}  

interface ReplaceConnectionOptions {     
  worker: Worker;     
  createConnection: () => Promise<NativeConnection>;     
  closeDelayMs: number;   
}  

interface WatchCertificateOptions {     
  worker: Worker;     
  certPath: string;     
  keyPath: string;     
  pollIntervalMs: number;     
  closeDelayMs: number;     
  createConnection: () => Promise<NativeConnection>;     
  signal?: AbortSignal;   
}  

export async function computeCertFingerprint(     
  certPath: string,     
  keyPath: string   
): Promise<string> {     
  const \[certStat, keyStat\] = await Promise.all(\[       
    stat(certPath, { bigint: true }),       
    stat(keyPath, { bigint: true }),     
\]);    

return \[       
  certStat.mtimeNs,       
  certStat.size,       
  keyStat.mtimeNs,       
  keyStat.size,     
 \].join(":");   
}  

export async function createConnection({     
  address,     
  certPath,     
  keyPath,     
  serverNameOverride,   
}: CreateConnectionOptions): Promise<NativeConnection> {     
  const \[crt, key\] = await Promise.all(\[       
    readFile(certPath),       
    readFile(keyPath),     
  \]);    

return NativeConnection.connect({       
  address,       
  tls: {         
    clientCertPair: {           
      crt,           
      key,         
    },         
    serverNameOverride,       
   },     
 });   
}  

export async function replaceWorkerConnection({     
  worker,     
  createConnection,     
  closeDelayMs,   
}: ReplaceConnectionOptions): Promise<boolean> {     
  const previousConnection = worker.connection;    

  try {       
    const newConnection = await createConnection();      

     worker.connection = newConnection;      

     if (previousConnection) {         
       closeSupersededConnection(           
         previousConnection,           
         closeDelayMs         
      );       
   }      

  return true;     
} catch (error) {       
  console.error(         
     "Unable to replace Temporal Worker connection",         
     error       
   );      

   return false;     
  }   
}  

function closeSupersededConnection(     
  connection: NativeConnection,     
  closeDelayMs: number   
): void {     
  const timer = setTimeout(() => {       
    connection.close().catch((error: unknown) => {         
      console.error(           
          "Unable to close superseded Temporal connection",           
          error         
        );       
     });     
   }, closeDelayMs);    

   timer.unref();   
}  

export async function watchCertificateChanges({     
  worker,     
  certPath,     
  keyPath,     
  pollIntervalMs,     
  closeDelayMs,     
  createConnection,     
  signal,   
}: WatchCertificateOptions): Promise<void> {     
  let currentFingerprint: string | undefined;    

  while (!signal?.aborted) {       
    try {         
      const nextFingerprint =           
      await computeCertFingerprint(certPath, keyPath);        

if (currentFingerprint === undefined) {           
  currentFingerprint = nextFingerprint;         
} else if (nextFingerprint !== currentFingerprint) {           
   const replaced = await replaceWorkerConnection({             
      worker,             
      createConnection,             
      closeDelayMs,           
  });          

     if (replaced) {             
        currentFingerprint = nextFingerprint;           
     }         
   }       
} catch (error) {         
  console.error(           
     "Unable to check Temporal mTLS certificate files",           
      error         
   );       
  }      

  await sleep(pollIntervalMs, signal);     
 }   
}  

function sleep(     
  durationMs: number,     
  signal?: AbortSignal   
): Promise<void> {     
  if (signal?.aborted) {       
     return Promise.resolve();     
   }    

return new Promise((resolve) => {       
  const timer = setTimeout(() => {         
    signal?.removeEventListener("abort", handleAbort);         
    resolve();       
  }, durationMs);      

  const handleAbort = () => {         
     clearTimeout(timer);         
     resolve();       
    };      

signal?.addEventListener("abort", handleAbort, {         
  once: true,       
  });     
 });   
}

### Summary

Native SDKs such as Go and Java rely on their language's TLS implementation, which provides callbacks to supply certificates when new connections are established.

The TypeScript SDK instead passes certificate bytes into Temporal's shared Rust Core during NativeConnection creation. Once created, the connection continues using those bytes until it is replaced.

Supporting certificate rotation, therefore, requires:

1.  Detecting certificate changes.
2.  Creating a new NativeConnection.
3.  Swapping the Worker to the new connection.
4.  Gracefully retiring the previous connection.

With those four pieces in place, a Temporal Worker can continuously adopt newly rotated certificates without downtime or process restarts.

![](https://www.bitovi.com/hs-fs/hubfs/undefined-Aug-07-2026-02-13-45-9795-PM.png?width=890&height=2048&name=undefined-Aug-07-2026-02-13-45-9795-PM.png)

* * *

Bitovi is a certified Temporal partner. We help teams get Temporal into production and keep it there, including the parts nobody puts in a conference talk, like certificate rotation, codec servers, and FedRAMP and FIPS boundaries. If you're working through Temporal security or operations, [get in touch](https://www.bitovi.com/services/backend/temporal-consulting).