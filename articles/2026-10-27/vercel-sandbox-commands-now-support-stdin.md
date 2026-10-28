---
title: "Vercel Sandbox commands now support stdin"
source: "https://vercel.com/changelog/vercel-sandbox-commands-now-support-stdin"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "Vercel"
author: "Kishore Devireddy"
---

[Vercel Sandbox](https://vercel.com/sandbox) now lets you send input to running commands through standard input (stdin). Use it to exchange messages with stdio MCP servers such as [agent-browser](https://github.com/vercel-labs/agent-browser#mcp-server), or send data to other command-line programs while they run.

In the TypeScript SDK, set `stdin: true` and `detached: true` in `runCommand()`. Use `writeStdin()` to send input and `closeStdin()` when you’re done:

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create();const cmd = await sandbox.runCommand({  cmd: 'cat',  stdin: true,  detached: true,});await cmd.writeStdin('hello');await cmd.closeStdin();const result = await cmd.wait();console.log(await result.stdout()); // "hello"
```

Send input to a running command and read its output with the Sandbox TypeScript SDK.

You can also set `stdin` to a Node.js readable stream, such as `process.stdin`. The SDK forwards the stream’s data and closes the command’s standard input when the stream ends.

In the Python SDK, set `stdin=subprocess.PIPE` and send input with `server.stdin.send()`. Call `communicate()` to close stdin, collect remaining output, and wait for the process to exit:

```
import subprocessfrom vercel import sandboxfrom vercel.api import sessionasync with session():    async with sandbox.create_sandbox() as instance:        server = await instance.create_process("cat", stdin=subprocess.PIPE)        await server.stdin.send(b"ping\n")        print(await server.stdout.readline())        print(await server.communicate())
```

Write to a running process’s stdin and read its output with the Sandbox Python SDK.

For commands that receive all their input at once, you can pass `input` directly to Python’s `run_process()`.

Read the [Sandbox documentation](https://vercel.com/docs/sandbox/sdk-reference#writestdin) to get started.