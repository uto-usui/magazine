---
title: "Rust runtime now in public beta for Vercel Functions"
source: "https://vercel.com/changelog/rust-runtime-now-in-public-beta-for-vercel-functions"
publishedDate: "2025-12-08"
category: "frontend"
feedName: "Vercel"
author: "Florentin Eckl"
---

1 min read

Dec 8, 2025

Today, we are launching first-class support for the Rust runtime beta.

This new release of native support, as an evolution of the [community Rust runtime](https://github.com/vercel-community/rust), brings the full benefits of Vercel Functions, including Fluid compute (with HTTP response streaming and Active CPU pricing) and an increased environment variable limit from 6KB to 64KB.

Rust deployments automatically integrate with Vercel's existing logging, observability, and monitoring systems.

To get started, create a Cargo.toml file and a handler function like in the example below:

Cargo.toml

```
[package]name = "rust-hello-world"version = "0.1.0"edition = "2024"[dependencies]tokio = { version = "1", features = ["full"] }vercel_runtime = { version = "2" }serde = { version = "1.0", features = ["derive"] }serde_json = "1.0"[[bin]]name = "hello"path = "api/hello.rs"
```

api/hello.rs

```
use serde_json::{Value, json};use vercel_runtime::{Error, Request, run, service_fn};#[tokio::main]async fn main() -> Result<(), Error> {    let service = service_fn(handler);    run(service).await}async fn handler(_req: Request) -> Result<Value, Error> {    Ok(json!({        "message": "Hello, world!",    }))}
```

Deploy to Vercel today with one of our starter templates [Rust Hello World](https://vercel.com/templates/template/rust-hello-world) and [Rust Axum](https://vercel.com/templates/template/rust-axum), or read more in [the Function docs](https://vercel.com/docs/functions/runtimes/rust).