---
title: "Zero-configuration Go backend support"
source: "https://vercel.com/changelog/zero-configuration-go-backend-support"
publishedDate: "2026-04-02"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez  "
---

1 min read

Apr 2, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F74SO1P4BRuK9xRzUl4bLxh%2F05a5b30af8cb017088a5fc6658b8ea30%2FVercel_Go_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4VjajbnaWHzZYXBqwuBl7x%2Fb148f92b7b54d0916e368c003350d74a%2FVercel_Go_Dark.png&w=1920&q=75)

Go API backends can now be deployed on Vercel with zero-configuration deployment.

main.go

```
package mainimport (	"fmt"	"net/http"	"os")func main() {	port := os.Getenv("PORT")	if port == "" {		port = "3000"	}	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {		fmt.Fprintf(w, "Hello World")	})	addr := ":" + port	fmt.Printf("Listening on %s\n", addr)	http.ListenAndServe(addr, nil)}
```

Vercel now recognizes Go servers as first-class backends and automatically provisions the right resources and configures your application without redirects in `vercel.json` or the `/api` folder convention.

Backends on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. Your Go API scales automatically with traffic, and you pay only for active CPU time rather than idle capacity.