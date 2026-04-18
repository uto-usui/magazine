---
title: "Custom Class Serialization in Workflow SDK"
source: "https://vercel.com/changelog/workflow-custom-class-serialization"
publishedDate: "2026-04-02"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Apr 2, 2026

Workflow SDK now supports custom class serialization, letting you pass your own class instances between workflow and step functions.

Workflow SDK serializes standard JavaScript types like primitives, objects, arrays, `Date`, `Map`, `Set`, and more. Custom class instances were previously not supported because the serialization system didn't know how to reconstruct them. With the new [`@workflow/serde`](https://www.npmjs.com/package/@workflow/serde) package, you can define how your classes are serialized and deserialized by implementing two static methods using `WORKFLOW_SERIALIZE` and `WORKFLOW_DESERIALIZE`.

Here's [an example](https://github.com/vercel/sandbox/blob/0786e185f0e358a05978f4f36930bbe217a23a5e/packages/vercel-sandbox/src/sandbox.ts#L297-L324) of how we used custom serialization in `@vercel/sandbox` to greatly improve DX:

```
import { WORKFLOW_SERIALIZE, WORKFLOW_DESERIALIZE } from "@workflow/serde";interface SerializedSandbox {  metadata: SandboxSnapshot;  routes: SandboxRouteData[];}export class Sandbox {  sandbox: SandboxSnapshot;  routes: SandboxRouteData[];  // Serialize a Sandbox instance to plain data  static [WORKFLOW_SERIALIZE](instance: Sandbox): SerializedSandbox {    return {      metadata: instance.sandbox,      routes: instance.routes,    };  }  // Deserialize a Sandbox from serialized data  static [WORKFLOW_DESERIALIZE](data: SerializedSandbox): Sandbox {    return new Sandbox({      sandbox: data.metadata,      routes: data.routes,    });  }  // If instance methods require Node.js APIs, they are marked with  // "use step" too allow them to be called from the workflow  async runCommand(    commandOrParams: string | RunCommandParams,    args?: string[],    opts?: { signal?: AbortSignal },  ): Promise<Command | CommandFinished> {    "use step";    // ...  }}
```

Example of how \`@vercel/sandbox\` implements workflow custom class serialization

Once implemented, instances of your class can be passed as arguments and return values between workflow and step functions, with the serialization system handling conversion automatically.

workflow/code-runner.ts

```
export async function runCode(prompt: string) {  "use workflow";  // Sandbox.create() has "use step" built in, so it runs as a  // durable step. The returned Sandbox instance is automatically  // serialized via WORKFLOW_SERIALIZE when it crosses the step boundary.  const sandbox = await Sandbox.create({    resources: { vcpus: 1 },    timeout: 5 * 60 * 1000,    runtime: "node22",  });  // Each Sandbox instance method (writeFiles, runCommand, stop, etc.)  // also has "use step" built in, so every call below is its own  // durable step — and the sandbox object is automatically rehydrated  // via WORKFLOW_DESERIALIZE at each step boundary.  const code = 'console.log("Hello World")';  await sandbox.writeFiles([{ path: "script.js", content: code }]);  const finished = await sandbox.runCommand("node", ["script.js"]);  // ...}
```

Example usage of the serialized \`Sandbox\` class within Workflow DevKit

-   [See the full example application](https://github.com/vercel/sandbox/blob/main/examples/workflow-code-runner/workflows/code-runner.ts) utilizing `@vercel/sandbox` and Workflow SDK.
    
-   Read the [serialization documentation](https://useworkflow.dev/docs/foundations/serialization#custom-class-serialization) to learn more.