---
title: "Speeding up C++ build times"
source: "https://www.figma.com/blog/speeding-up-build-times/"
publishedDate: "2024-04-25"
category: "design"
feedName: "Figma Blog"
---

If you’ve worked with C++ projects, you’re probably all too familiar with the perennial issue of slow build times. They are a major productivity killer, leaving developers stuck in a frustrating cycle of wait, debug, and rebuild. In 2023, build times at Figma were increasing at a disproportionate rate: While the codebase grew by just 10% in a 12-month period, build times had increased by a whopping 50%. It’s no surprise that in our annual internal developer survey, C++ build times were a top pain point. After trying a few stopgap solutions—like purchasing M1 Maxs for our team—build times gradually reverted to their original pace; `Ccache` and remote caching weren’t enough either. We needed to take more drastic measures, quickly.

![A Figma file showing jokes that the team collected about slow build times.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADBUlEQVQokT3H/1OSBwDH8ed/MTgUngeMLpRspEJ8EREIfNC7TJQyUVNRE6QBKmjz0osg59ba6ra6ZXc7t3WxW5vW1pym537Yrt2626VhE2+/+Q+8d3N3++F1789HuD+3xYfpp+ST35BLFLiVecb9uV94eOMlizd+5XryM2S3F0msQFWuQq/XIzeFCLclMZuciJKWcrUGpUqDVqpC6DmXps0focXTi9wUxu+8iN/ZTXNjL6GWK/QF4zQ5Gjmmr0SUNEhSJR57kP7ODAHPOewWG84GJ40uNx5PK4Kv8TyWWi+mkw2YahzUGK1UGyycqLLjtncSaonS6u0g4PHT7PbitJ4hGIiSGMgx2BWhOxhi7PJlUqkksbFxhInYPInoLGMjV4kNTRMbniY+PENqZIG5+BI3x78lm/iC9ycX+SCzSDb5kFyqwPXEPeL9Q4xe6mI8Pkx0JEK4ux+hsPQTP65s8MPKzyw/ec6z5VWer2zy6PMX3H5vmXyyQDbxNdl3vyKb+PJw55KPmRqeJxIKMtQl09Puw2W3UGuyImys/sb26zcUd4sUi0X290v8tVtiafEJ588O4TAHsJtlbHUyp2v9h5WbeuiUB/BYHVhNBkxVR9GKIpJoQNhce8nOdpHi7ltK+39zcHBAaW+fe58+wNngQi1WoNOr0enUaDUVHDtaidXsxu+6gPH4KRQKJWVlCsqOqNCoDQhb67+zs73Ln6932H7zlr3SHq9e/cHdT+7g97moNorUW3TUndJSb9DitZgItbTTLvdhNNSjVJZzRKFCoVQjaqoQvi+ssrG+xfr6Jmtr/3rB8ndPWch/REdbEKf9NLLfQcBtJ2Cx0eVpZjQUIXx2BFONjQq1hKpcRFWuRSsZEa5N3OJaZoGZ9E2uTuaZnsgxlcyRjs0T651lMJRmNDxF9OI0o50ZrlyYYeJSnoGOSax1Xip11YjicbRSNQZ9PUJ3a4qQHCfoj/7HFz38g8FZEj23SfXdOTT+f++S7P2YvrYpvLYOzCd91Bq91J04g/WdAP8AvSr/D3ylykQAAAAASUVORK5CYII=)![A Figma file showing jokes that the team collected about slow build times.](https://cdn.sanity.io/images/599r6htc/regionalized/d52b738e1057214775d55e92e0333f8033fa6e7a-3840x2160.png?w=3840&h=2160&q=75&fit=max&auto=format)

We even spun up a channel for engineers to joke about slow build times while, of course, brainstorming fixes.

## [How C++ builds work](#how-c-builds-work)

**Header files** contain function declarations, definitions of classes, or constant values that can be used across multiple source files. Header files are included at the beginning of a source file using the #include directive, allowing the compiler to reference the contents during the compilation process.

Before we dive into how we improved C++ build times at Figma, it’s important to understand how C++ compilation works. In the pre-processing step of C++ compilation, all the files that are included (known as **header files**) get mashed into a single mega-file that is passed to the compiler. This includes files that are transitively included—for example, if file C includes file B, and file B includes file A, then file C includes all the bytes of file A through its transitive dependency.

![An image showing how all the includes get mashed into a single mega file that we pass to the compiler.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADeUlEQVQ4jXWR7U9bBRSH+8c48cMyFhfDBnFZhrgXl7hFRXBZdK5zwpDSOoHyMkUKHcuGMtoC7W177+07LdDS3t72trB1pS9bpptjktotnTPjk0IWZSVO7vkZZOoX/fDLOTk5efKcHMVLltPyy/YWuZpTyzWcWq62quQ9TKtcbW+TaziNXMWq5B3WJrnS1izv5tr+3bG0/lVrWLW8h2uTd9rOyhUWpayoYlV0JmSgftFHA2Ev6aLTpItHaCARJf28SN2Sl+oDg3R86iKdj3tpUJqifnGKdOIs6SSB9HMi9SeD9P7MMFXamknxmqsTeikEXrgJNpCBUyrCk1mBK7sKf34VXPYezok2dIlOsKnb4JLfgZEW4by+DE9uFb78E0ze+AnnEwG8wrZCccDdRRfiUWIi35Np8i5Zoo+JTZXJllonZ7pM7MJ96ow5qDfmJctcgQzhEl2JlMie+pX47Aa5sjJ58yvUl5ylKk5FitddXdDHoxgXFjE8eRvGyI+wXv0NzLUy+OtPYUsX0RHl0CN6MJH8AaOzj2CIPII9tQY2swFHdgOe3C/4IhFCFafCP0DD7CL0jhsYDRbBpp7Cnn4GV+Z3sJkH6BA49AhuTCQKGJkpYWT6AezzT8D9N1C7ZRi+h2HPLZjCJdiurcGaWocjXYZ94f6WYdSDMamAS/4iLk0uwTq3+v+Gg3EBE8JdfBW4BYNQArN5cmodfLoM2yZQ5NEb84GZK8IYfAhTqAQ+tQZHVoY7uwFffgV9yefAA+4uDCVimIgWcNl/B+PRh3AslOHI/AFf7hkcuRI6Yjy0Ig/L1TuwxAqwxZbgXliGO/czvPnNlNAj+ba+vN/Zji+laTDJbzEm3IR1fgl89jG43DLc+WUwmW/wcdiEhsAFfCrw0Ao+aCMe9MQC6JWm8bk0g+64F41TF7HD2gTFLnsLGgNDaAszaA+aMeA34opnBMPeUfTNmPFZ8Gscd6pQx5zEfnszDrvVaPBr0BjQ4LBHg1cdGuzm1NhpO4sKixKKCstpVFqbsIv9BPvMZ9AyeBQjHXuh667Fe5fr8c74u/ho7CBOGOtQa3oLR50foFNQojuqxDHvKWxnPsQL5lPY9jyKv5vNYaXxBN7WHcK59mo0afeibuhN1I4eQ4PxIOoNh7DPVI83+JNoDSnRFlLiiFuJ7YwS28xKvGjZyp+bAthRx0lMMwAAAABJRU5ErkJggg==)![An image showing how all the includes get mashed into a single mega file that we pass to the compiler.](https://cdn.sanity.io/images/599r6htc/regionalized/183e081a1f9bf2fc82cafd1c4b5fdb259af92821-1056x705.png?w=804&h=537&q=75&fit=max&auto=format)

## [Testing our hypothesis](#testing-our-hypothesis)

C++ build times are roughly proportional to the number of bytes sent to the compiler after pre-processing. But as we dug in, we noticed that the ratio of post pre-processing bytes sent to the compiler to the amount of code added was growing really fast—a likely suspect for why build times were constantly increasing. This disproportionate increase in compiled bytes led us to believe that there were a lot of places where we were either including headers that we didn’t need at all or had headers that were only used for their transitive dependencies. To test the hypothesis, we decided to remove unnecessary includes from our largest files.

**Cold build time** is the amount of time it takes to compile a codebase from scratch, as opposed to using cached data from previous compilations to speed up the process.

The results of this effort were promising: We saw a 31% decrease in compiled bytes and a 25% decrease in **cold build time**. From here, it was clear that unnecessary includes were a big problem in our codebase and that the number of bytes compiled was strongly correlated to our build times. We turned our attention to automating the process of preventing unnecessary includes, aiming to make C++ builds lightning fast.

## [How we came up with the longest acronym ever](#how-we-came-up-with-the-longest-acronym-ever)

[Include What You Use](https://github.com/include-what-you-use/include-what-you-use) (IWYU) is an open-source tool written by Google to minimize the inclusion of unnecessary header files in C++ code. It analyzes the symbols used in a file and makes sure that you directly include the header that exports the symbol used. We attempted to integrate IWYU into our codebase twice, with limited success. The tool strives for each file to have the precise set of includes, which makes it challenging to apply retroactively to a substantial codebase.

Undaunted, we started creating our own tool. Instead of requiring that you include the exact set of headers, it would only ensure that the current file utilizes something directly from each header it includes. While IWYU was more stringent, we took a more relaxed approach so that it would be easier to implement and deploy in our codebase.

Our tool, which we named Don’t Include What You Don’t Use (DIWYDU), uses [libclang’s Python bindings](https://github.com/llvm/llvm-project/tree/main/clang/bindings/python) to parse every source and header file in our codebase. It analyzes the Abstract Syntax Tree (AST), a tree representation that mirrors our code’s hierarchical structure, and captures the relationships between its various elements. This allows DIWYDU to accurately identify the types, functions, and variables that each file directly uses. When DIWYDU discovers an included header that a file doesn’t directly depend on, it flags it. Eliminating these flagged, unnecessary includes improves our build times, so we run this tool on all our feature branches.

However, DIWYDU has its limitations. For instance, it only analyzes Figma’s source and header files, excluding Standard Template Library (STL) header files. This is because STL files contain private includes, which are headers that are only used within a specific module rather than being exposed in the public interface (IWYU also struggles with private includes). For example, the `vector.h` header doesn’t actually define the `std::vector` symbol. Rather, it’s defined in a private include inside the library.

Additionally, libclang’s Python bindings rely on the underlying C bindings, which don’t offer the same access to the Clang AST as the actual Clang compiler that uses the C++ library. As a result, we sometimes encounter the `UNEXPOSED_EXPR` type of node in the Clang AST and have to resort to less elegant solutions. Making a shift to a C++ based tool could potentially resolve this issue.

In C++, **forward declaration** is a declaration of an identifier without the complete definition. It tells the compiler an identifier exists and saves compilation time by avoiding the need to read and process potentially complex and lengthy code. This is often used when there are circular dependencies between two or more classes, or to reduce compile times by reducing the amount of code the compiler needs to process.

Sometimes engineers include large files that are needed but lead to a large increase in bytes sent to the compiler. These regressions can often be fixed by **forward declaration** or breaking up header files, but because the header is actually used in the file, DIWYDU doesn’t detect this kind of regression. We needed another tool to detect these before they reached master.

## [Measuring our codebase: Includes.py](#measuring-our-codebase-includes-py)

One way to detect and prevent a regression in the number of bytes sent to the compiler is to measure it and inform feature branch authors that their change may have a significant impact on C++ build times. We developed a tool we call includes.py which measures the transitive bytes per source file. It is written purely in Python and does not use Clang, which makes it fast to run—usually in just a couple of seconds.

The tool provides the information we need to run this in our Continuous Integration (CI) system and definitively determine the increase in bytes per source file that a given PR causes. If there are significant regressions, we issue warnings in PRs to prevent them from being merged initially.

Includes.py operates by crawling all the first-party header and source files in our codebase, including generated files, and counting the number of bytes in the files. When it encounters standard library includes, it assumes they are 0 bytes. This is a safe assumption to make for our codebase since it’s not common for engineers at Figma to directly include standard library headers. Our use of the standard library is almost entirely confined to a single directory that exports wrappers around the standard library containers. After counting the bytes in our files, the tool identifies header dependencies and constructs a graph with this information. To approximate the total number of bytes sent to the compiler, it sums up the total number of bytes in the current file and the total number of bytes in the header files it depends on, both directly and transitively.

## [Fwd.h](#fwd-h)

When working with engineers to fix regressions detected by includes.py, we often recommended forward declaring symbols. We can forward declare symbols if we only reference the name of a symbol without requiring the knowledge of its size or inheritance structure. This bypasses the need for an include, which can speed up the build process. However, having a lot of forward declarations can affect readability and also makes the codebase less searchable since a given symbol would appear in numerous places.

Our solution was to create Fwd.h files. We’ve structured our codebase into something resembling modules (although not official C++ modules), with each directory being built independently of others. We’ve implemented a policy where each directory has its own Fwd.h file that contains all the forward declarations required by other files within that directory. These Fwd.h files are then included in every header in that directory.

This approach not only centralizes forward declarations to one location per directory but also alleviates the need for engineers working on a file to consider forward declarations or includes. Essentially, everything that can benefit from forward declarations does so organically.

It’s also worth noting that a source file should never include a Fwd.h file. Forward declarations are only valuable in header files where they prevent unnecessary header includes.

Plain text

// AnimalFwd.h

namespace Figma {
    struct Animal;
    struct Dog;
    struct Cat;
    enum struct AnimalType;
    using Feline = Cat;
};

An example Fwd.h file, \`AnimalFwd.h\`

## [A note about caching](#a-note-about-caching)

The approach we described is focused on reducing the total number of compiled bytes. However, there are other common solutions that we also employed to reduce build times, including local caching, remote caching, and precompiled headers.

Charlie Kilpatrick, another engineer on our team, scoped a plan for [Bazel remote caching](https://bazel.build/remote/caching), which caches build outputs for retrieval whenever the same inputs are used for a given build. It isn’t something we’d used before for local developer laptop builds, but we figured we’d try using it to see what the performance gains would be. With a bit of logic in place to make sure we only use the remote cache for local builds when it makes sense, we shaved more than two minutes off local builds when the remote cache kicked in.

## [Preventing regressions](#preventing-regressions)

Overcoming the challenge of slow C++ build times at Figma required a multifaceted approach. We identified unnecessary includes as a major problem and developed automated tools like DIWYDU and includes.py to address this issue. We also implemented Fwd.h files to improve codebase readability and speed up the build process. The results have been significant: We’ve cut our build times by 50% and are preventing 50-100 potential slowdowns every single day. With these tools, we've been able to automatically identify and quickly rectify these regressions, optimizing build times and developer productivity.

If this work sounds interesting to you, [check out our open roles](https://www.figma.com/careers/#job-openings)!

_Thank you to Ojan Vafai, Evan Martin, Russell McClellan, and the many other contributors across engineering who helped along the way._