---
title: "Python 3.12 and Ruby 3.3 are now available"
source: "https://vercel.com/changelog/python-3-12-and-ruby-3-3-are-now-available"
publishedDate: "2024-05-06"
category: "frontend"
feedName: "Vercel"
author: "Janos Szathmary"
---

1 min read

May 6, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6lpHGrJBin0XCELGqlff35%2F7608d53ad7577f43536929957069b08d%2FGeist_OG_Changelog__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2jw6gHyTkyDXvakmDjB0zT%2Ff692bfffe9055de237c816a1d0b7bb16%2FGeist_OG_Changelog__2_.png&w=1920&q=75)

Starting today, new Python [Builds](https://vercel.com/docs/deployments/builds) and [Functions](https://vercel.com/docs/functions/serverless-functions) will use version [3.12](https://peps.python.org/pep-0693/) and new Ruby Builds and Functions will use version [3.3](https://www.ruby-lang.org/en/news/2023/12/25/ruby-3-3-0-released/).

If you need to continue using Python [3.9](https://www.python.org/dev/peps/pep-0596/) or Ruby [3.2](https://www.ruby-lang.org/en/news/2022/12/25/ruby-3-2-0-released/), ensure you have `18.x` selected for the Node.js Version in your project settings to use the [older build image](https://vercel.com/docs/deployments/build-image#runtime-support).

For Python 3.9, ensure your `Pipfile` and corresponding `Pipfile.lock` have `python_version` set to `3.9` exactly. Similarly, for Ruby 3.2, make sure `ruby "~> 3.2.x"` is defined in the `‌Gemfile`.

Check out [the documentation](https://vercel.com/docs/runtimes#official-runtimes) to learn more about our supported runtimes.