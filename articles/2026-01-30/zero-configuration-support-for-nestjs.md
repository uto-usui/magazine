---
title: "Zero-configuration support for NestJS"
source: "https://vercel.com/changelog/zero-configuration-support-for-nestjs"
publishedDate: "2025-10-17"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Oct 17, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7pxoKLGDS1cZUZPTCWv89v%2Ff636105de5638432c99da955ea41172e%2FVercel___NestJS_-_Light__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1VfcnoDQMrxC6VtTGbjP64%2Fbbfd1c661fbe621650881e5c3e6a22b2%2FVercel___NestJS_-_Dark__1_.png&w=1920&q=75)

Vercel now supports [NestJS](https://nestjs.com/) applications, a popular framework for building efficient, scalable [Node.js](https://nodejs.org/) server-side applications, with zero-configuration.

src/main.ts

```
import 'reflect-metadata';import { Controller, Get, Module } from '@nestjs/common';import { NestFactory } from '@nestjs/core';@Controller()class AppController {  @Get()  getHello() {    return 'Hello, world!';  }}@Module({  controllers: [AppController],})class AppModule {}NestFactory.create(AppModule).then(app => app.listen(3000));
```

A "Hello World" NestJS app on Vercel

Backends on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. This means your NestJS app will automatically scale up and down based on traffic, and you only pay for what you use.

[Deploy NestJS on Vercel](https://vercel.com/templates/backend/nestjs-on-vercel) or visit the [NestJS on Vercel documentation](https://vercel.com/docs/frameworks/backend/nestjs)