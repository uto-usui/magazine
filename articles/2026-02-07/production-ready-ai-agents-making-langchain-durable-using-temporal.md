---
title: "Production Ready AI Agents: Making LangChain Durable Using Temporal"
source: "https://www.bitovi.com/blog/production-ready-ai-agents-making-langchain-durable-using-temporal"
publishedDate: "2026-02-06"
category: "frontend"
feedName: "Bitovi"
author: "Mark Repka"
---

## Building AI Agents: Why Temporal + LangChain?

To build reliable AI agents that can handle complex, multi-step tasks in production environments, we need more than just an LLM and a prompt. We need infrastructure that can handle failures gracefully, provide visibility into what our agents are doing, and scale to meet real-world demands.

This is where combining Temporal with LangChain creates a powerful foundation for AI agent development.

[**Sample Code Repository**](https://github.com/bitovi/temporal-langchain-react-agent)

### What is Temporal?

[Temporal](https://www.bitovi.com/blog/building-durable-mcp-tools-with-temporal) is a durable execution framework that allows developers to write reliable and scalable distributed applications. By design, Temporal ensures that once your application starts, it will execute to completion even in the face of failures. Temporal calls this "Durable Execution."

By moving the burden of failure handling from your application code into the platform itself, there's less code for you to write, test, and maintain. Temporal Workflows provide a better way to express business logic, making development much easier than traditional distributed codebases.

Temporal also provides out-of-the-box tooling for monitoring, giving you visibility into the state of running and completed workflows. The Temporal Web UI lets you quickly isolate, debug, and resolve problems, even with in-flight workflows.

#### Core Temporal Concepts

The building blocks of Temporal that we'll use for our AI agents are:

-   **Workflows** contain the deterministic orchestration logic of our agent. In our case, this is where we'll implement the ReAct loop that drives agent decision-making. Because of Temporal's determinism requirements, Workflow code cannot interact with external resources directly. This is actually a feature, not a limitation, as it ensures your agent's behavior is reproducible and debuggable.
    
-   **Activities** are called from Workflow code and allow us to interact with external resources. This is where our LLM calls, tool invocations, and API interactions happen. Activities in Temporal are controlled by a Retry Policy and can be automatically retried up to an infinite number of times until they succeed. For AI agents, this means that transient LLM API failures, rate limits, or tool execution errors don't break your entire agent.
    

**Building on Temporal? You Don’t Have to Figure It Out Alone**

Temporal is powerful, but designing durable workflows the _right_ way takes experience. Bitovi helps teams adopt Temporal with confidence—from first workflows to production-grade systems that handle retries, versioning, and long-running execution without surprises.

[**👉 Talk to Bitovi about Temporal consulting**](https://www.bitovi.com/services/backend/temporal-consulting)

### What is LangChain?

LangChain is a framework for developing applications powered by large language models. It provides abstractions and utilities that make it easier to build LLM-powered applications without reinventing the wheel for common patterns.

While you could certainly make raw API calls to OpenAI or Anthropic and handle all the orchestration yourself, LangChain saves significant development time by providing battle-tested patterns that the community has already refined. Think of it as the standard library for LLM applications. You could implement everything from scratch, but why would you?

Key LangChain Features for AI Agents

-   **LLM Provider Abstractions**
    
    -   Unified interfaces for working with OpenAI, Anthropic, and other LLM providers.
        
    -   Switch between Claude and GPT-4 with a single line of code change, making it easy to experiment with different models or add fallback providers.
        
-   **Tool/Function Calling**
    
    -   Structured ways to define tools that agents can use and parse LLM responses for tool invocations.
        
    -   LangChain handles the translation between your tool definitions and the specific function-calling format each LLM provider expects.
        
-   **Prompt Templates**
    
    -   Reusable templates for structuring prompts, especially useful for the ReAct pattern where our prompts follow the same structure every iteration.
        
    -   Templates use variables for the changing parts (like user queries and context) while keeping the instruction format consistent.
        
    
-   **Output Parsers & Validation**
    
    -   Utilities for parsing and validating structured outputs from LLMs.
        
    -   When you need the model to return JSON or follow a specific schema, LangChain's parsers and integration with libraries like Zod make this reliable and type-safe.
        

### What about LangGraph?

You might be wondering: "Doesn't LangChain already have LangGraph for building stateful agent workflows? Why bring Temporal into the mix?"

LangGraph is purpose-built for AI agents and solves many orchestration challenges. However, Temporal is a general-purpose, durable execution platform with years of production-hardening across diverse use cases. For teams already using Temporal or those who need enterprise-grade orchestration features, combining Temporal with LangChain's LLM utilities provides the reliability of proven infrastructure with the convenience of specialized AI tooling.

The answer lies in what happens when your AI agent needs to run in production:

### Durability

When your agent is processing a complex task that involves multiple LLM calls and tool invocations, what happens if the OpenAI or Anthropic API returns a 503 error halfway through?

With pure LangChain, you'd need to implement retry logic and state management yourself. With Temporal, these are handled automatically and your workflow will resume exactly where it left off, preserving all context and progress.

### Observability

Temporal's Web UI provides complete visibility into your agent's execution history. You can see every decision point, every tool call, and every LLM interaction with full context and timing information. This is invaluable for debugging why an agent made a particular decision or took an unexpected path, something that's difficult to achieve with log files alone.

### Long-Running Agents

Some agent tasks might take hours or even days to complete. Temporal Workflows can run indefinitely, with their state durably persisted. Your agent can wait for external events, be paused for human approval, or handle interruptions all while maintaining its full execution context. The workflow's state survives server restarts, deployments, and infrastructure changes.

### Production-Ready Infrastructure

Temporal provides enterprise-grade features like horizontal scaling, workflow versioning, and built-in metrics. You get a production-ready orchestration platform without building it yourself. When you need to update your agent's logic, Temporal's versioning ensures in-flight workflows complete successfully while new ones use the updated code.

## The Division of Responsibilities

In our architecture, we'll use each framework for what it does best:

**Temporal handles the "what"**: The orchestration logic, decision flow, and state management of the agent

**LangChain handles the "how"**: The actual LLM interactions, tool definitions, and prompt formatting

This separation gives us the reliability of Temporal with the convenience of LangChain's LLM utilities. We write our agent loop as a Temporal Workflow, but we use LangChain Activities to make the actual LLM calls and tool invocations. Neither framework is duplicating effort. They complement each other to create a robust foundation for production AI agents.

**Turn AI Agent Patterns into Production Systems**

Patterns like ReAct are easy to prototype—but hard to harden. Bitovi helps teams translate AI agent concepts into durable Temporal workflows that survive failures, scale cleanly, and stay observable as complexity grows.

We work with teams to design agent orchestration, apply Temporal best practices, and integrate LLM tooling safely into long-running workflows.

[**👉 See how Bitovi supports production Temporal systems**](https://www.bitovi.com/services/backend/temporal-consulting)

### The ReAct Agent Loop: Reasoning and Acting

Unlike simple question-answering systems that generate a response in one shot, AI agents follow an iterative loop that more closely mirrors how humans approach complex problems. The process of Reasoning and Acting starts by thinking about what to do, taking action based on that plan, checking the result of the action, and then repeating by thinking about what to do next.

These three phases make up the ReAct loop and repeat until the agent reaches its goal. Imagine we have an agent that answers questions about movies and a user asks: "What movies were directed by Maggie Kang?"

**Thought**: The agent uses an LLM to reason about the current state of the world as it knows it. The agent considers what it knows so far, what information is missing, what information would be useful to collect, and what tools or actions might be most helpful to make progress.

In this movie example, the thought step might result in something like:

> I need to find movies directed by Maggie Kang. To do this, I should first search for information about this person using the person\_by\_name\_search tool. This will help me find their ID and then I can look up their movie credits to filter for directing roles.

**Action**: Based on its reasoning, the agent selects a tool to invoke with specific parameters. This could be searching a database, calling an API, performing calculations, or any other operation. The agent isn't just thinking abstractly, it takes real actions that gather additional information. Because the agent recognized that it needs information about Maggie Kang, this action would be the `person_by_name` tool with the argument “Maggie Kang”.

**Observation**: Once the agent receives the result from the action and incorporates that additional information into its context, the observation might be:

> Found one match: Maggie Kang (person ID 3003169), known for directing. Her known-for titles include KPop Demon Hunters (2025) and an untitled KPop Demon Hunters follow-up.

The agent runs through this loop again, now with this additional key information, until it either reaches a satisfactory answer or hits a maximum iteration limit. We can determine if the agent has reached a final answer or requires additional actions by using Structured Output.

LangChain even lets us pass an option `includeRaw` to give us the un-parsed result as well, making it easy to collect metadata and usage information from the result.

### Reasoning and Acting in Temporal

Here is a complete ReAct Agent Workflow. While this example is written in TypeScript, Temporal provides SDKs for many different languages, so you can implement this same pattern in whatever language best fits your stack.

Notice how simple this is, just a few lines to configure our activities, one loop that runs through each phase until the agent finds an answer. All the complexity of error handling, retries, and state persistence is handled by Temporal under the hood.

```
import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "./activities";

const { thought, action, observation } = proxyActivities<typeof activities>({
  startToCloseTimeout: "5 minutes"
});

export async function agentWorkflowSimple(query: string): Promise<string> {
  const context: string[] = [];

  while (true) {
    const agentThought = await thought(query, context);
    context.push(`<thought>\n${agentThought.thought}\n</thought>`);

    if (agentThought.answer) {
      return agentThought.answer;
    }
    if (agentThought.action) {
      context.push(
        `<action><reason>\n${agentThought.action.reason}\n</reason><name>${agentThought.action.name}</name><input>${JSON.stringify(agentThought.action.input)}</input></action>`,
       );

       const agentAction = await action(
         agentThought.action.name,
         agentThought.action.input,
       );

       const agentObservation = await observation(query, context, agentAction);
       context.push(
         `<observation>\n${agentObservation.observations}\n</observation>`,
       );
     }
  }
}
```

With this ReAct structure, the agent can adapt its strategy based on what it learns, handle unexpected results, and break down complex multi-step problems into manageable parts.

To go a little deeper, let's take a look at each of those different Activities to see how they work.

### The Thought Activity

This activity takes the user's question as well as all the work the Agent has done so far, our context. The bulk of the code here is simply setting up the LangChain ChatModel model abstraction, feeding in some configuration values, our structured output format, and then invoking the model.

The response that we get back, based on our Prompt and Structured Output format, will contain either the final answer or some action that should be performed next.

```
export async function thought(
  query: string,
  context: string[],
): Promise<AgentResult> {
  const promptTemplate = thoughtPromptTemplate();
  const formattedPrompt = await promptTemplate.format({
    userQuery: query,
    currentDate: new Date().toISOString().split("T")[0],
    previousSteps: context.join("\n"),
    availableActions: fetchStructuredToolsAsString(),
  });

  const model = new ChatOpenAI({
    model: Config.OPENAI_MODEL_HIGH,
    apiKey: Config.OPENAI_API_KEY,
    streaming: false,
  });
  
  const structure = model.withStructuredOutput(AgentResultFormat, {
    includeRaw: true,
  });

  const { parsed, raw } = await structure.invoke([
    { role: "user", content: formattedPrompt },
  ]);
  
  return parsed;
}
```

In this code most of the ‘functionality’ is actually contained within the prompt template and AgentResultFormat. The goals of this prompt are to not only provide the user's question, but also to specify in detail what we expect the output to be.

The Prompt Template is another useful LangChain abstraction we can take advantage of, allowing us to define a template string and what variables should be replaced within it.

```
import { PromptTemplate } from "langchain/prompts";

const prompt = new PromptTemplate({
  inputVariables: ["foo"],
  template: "Say {foo}",
});
```

Structured Output in an LLM refers to the ability to generate responses in a specific, predefined format (like JSON, XML) rather than free-form text. This ensures the output follows a consistent schema that can be reliably parsed and processed by our application.

By defining a JSON Schema when we initialize our LangChain ChatModel instance we can be sure that the response we get from the LLM matches the desired output format.

```
const AgentResultFormat = {
  type: "object",
  additionalProperties: false,
  properties: {
    thought: {
      type: "string",
    },
    action: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
        },
        reason: {
          type: "string",
        },
        input: {
          type: "object",
          additionalProperties: true,
        },
      },
      required: ["name", "reason", "input"],
    },
    answer: {
      type: "string",
    },
  },
  required: ["thought"],
};
```

We can use the `withStructuredOutput` helper to customize the behavior of the chat model. Now, when we invoke the model, we will get back a `parsed` object that matches our specified schema.

```
const model = new ChatOpenAI({
    model: Config.OPENAI_MODEL_HIGH,
    apiKey: Config.OPENAI_API_KEY,
    streaming: false,  });

  const structure = model.withStructuredOutput(AgentResultFormat, {
    includeRaw: true,
  });

  const { parsed } = await structure.invoke([
    { role: "user", content: formattedPrompt },
  ]);
```

In our prompt we explain to the model the expected behavior, the question the user is asking, any previous work the Agent has already performed, along with specifying some details about out expected output format.

```
You are a ReAct (Reasoning and Acting) agent tasked with answering the following query:

<user-query>
{userQuery}
</user-query>

Your goal is to reason about the query and decide on the best course of action to answer it accurately.

Instructions:
1. Analyze the query, previous reasoning steps, and observations.
2. Decide on the next action: use a tool or provide a final answer.
3. Respond in the following JSON format:

If you need to use a tool:
{{
    "thought": "Your detailed reasoning about what to do next",
    "action": {{
        "name": "Tool name",
        "reason": "Explanation of why you chose this tool",
        "input": "JSON object matching to tool input schema"
    }}
}}

If you have enough information to answer the query:
{{
    "thought": "Your final reasoning process",
    "answer": "Your comprehensive answer to the query"
}}

Remember:
- Be thorough in your reasoning.
- Use tools when you need more information.
- Use tools to validate your assumptions and internal knowledge.
- Be sure to match the tool input schema exactly.
- Always base your reasoning on the actual observations from tool use.
- If a tool returns no results or fails, acknowledge this and consider using a different tool or approach.
- Provide a final answer only when you're confident you have sufficient information.
- If you cannot find the necessary information after using available tools, admit that you don't have enough information to answer the query confidently.
- Your internal knowledge may be outdated. The current date is {currentDate}.

In this thinking step, consider the following information from previous steps:

<previous-steps>
{previousSteps}
</previous-steps>

Based on that information, provide your thought process and decide on the next action.
<available-actions>
{availableActions}
</available-actions>
```

In a Temporal Workflow activities can be configured to retry up to an infinite number of times through the inclusion of a Retry Policy. In this case, I have set the maximum number of attempts for each activity to 5.

```
const { thought, action, observation } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
  retry: {
    maximumAttempts: 5,
  },
});
```

The top Large Language Models today are getting very good at following instructions, but simply due to their nature are not completely deterministic. Nor do we necessarily want them to be!

If the model does not follow our instructions or does not output completely parsable JSON we can simply let the `invoke` call `throw` and rely on the fact that Temporal will re-schedule the Activity to try again. Often on a retry the model will generate a valid response letting this activity complete successfully on the second try.

We might also run into more normal API problems, such as rate limits, which would also `throw` and result in an automatic retry.

Once the `invoke` function as completed we can trust that we have a valid JSON object that we can return to the main Workflow code. Based on the resulting object we can now determine if the model has reached a final answer or has selected some additional action to perform.

### The Action Activity

The `action` activity is very straightforward, simply taking the toolName and toolInput from the parsed object, as we saw in the thought prompt template, and it is up to this action activity to execute the specified tool call.

```
export async function action(
  toolName: string,
  input: object | string
): Promise<string> {
  const tools: StructuredTool[] = fetchStructuredTools();
  const tool = tools.find((t) => t.name === toolName);
  if (tool) {
    try {
      const result = await tool.invoke(input);
      return result;
    } catch (err: unknown) {
      const error = err as Error;
      return JSON.stringify({
        name: toolName,
        input: input,
        error: `Error invoking tool ${tool.name}: ${error.message}`,
      });
    }
  }

  return JSON.stringify({
    name: toolName,
    input: input,
    error: `Tool with name ${toolName} not found.`,
  });
}
```

Unlike the thought activity, this action activity does have some error checking. If the model gives us an invalid tool name or invalid tool arguments we almost certainly do not want to retry. If the input is bad, retrying is never going to give us a valid result.

Instead, in this activity, we can catch the error and return that to the model. Letting the Agent know that its tool name or arguments were invalid is actually a very good thing to do. If we return this error information to the model that gives it a chance to observe the failure in the next steps and then plan further actions based on that feedback.

Because this agent is built around answering questions about movies, the provided tool calls that are returned from `fetchStructuredTools` are as follows:

```
export function fetchStructuredTools(): StructuredTool[] {
  return [
    personSearch(),
    personDetailsByPersonId(),
    personMovieCreditsByPersonId(),
    movieSearch(),
    movieDetailsByMovieId(),
    movieCreditsByMovieId(),
    tvSearch(),
    tvDetailsBySeriesId(),
    tvCreditsBySeriesId(),
  ];
}
```

Going a little deeper we can take a look at another helpful LangChain abstraction and the definition of our StructuredTools. LangChain provides us this StructuredTool type and `tool` definition function that handles all the complexity of defining tools, validating their input, and invoking them.

If we take a look at a couple of these StructuredTools we can see that they are defining wrappers around parts of The MovieDB API.

```
import { StructuredTool, tool } from "langchain";
import * as z from "zod";

function movieSearch(): StructuredTool {
  return tool(
    async (input) => {
      const url =
        "https://api.themoviedb.org/3/search/movie?query=test&include_adult=false&language=en-US&page=1&query=" +
        encodeURIComponent(input.title);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + Config.TMDB_API_KEY,
        },
      };

      const result = await fetch(url, options);
      const data = await result.json();
      return JSON.stringify(data);
    },
    {
      name: "movie_by_title_search",
      description:
        "Use this tool to search for information about movies by title. Uses The Movie Database (TMDb) API.",
      schema: z.object({
        title: z.string().describe("The title of the movie to search for"),
      }),
    }
  );
}

function movieDetailsByMovieId(): StructuredTool {
  return tool(
    async (input) => {
      const url =
        "https://api.themoviedb.org/3/movie/" +
        encodeURIComponent(input.id) +
        "?language=en-US";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + Config.TMDB_API_KEY,
        },
      };

      const result = await fetch(url, options);
      const data = await result.json();
      return JSON.stringify(data);
    },
    {
      name: "movie_details_by_id",
      description:
        "Use this tool to fetch for information about movies by ID. Uses The Movie Database (TMDb) API.",
      schema: z.object({
        id: z.string().describe("The ID of the movie to fetch information for"),
      }),
    }
  );
}
```

The `name`, `description`, and `schema` are all provided to the LLM as part of our Prompt back in the `thought` activity. These provide information about what the tool is intended to do and what information is needed to execute it.

The `schema` is where we define what data is needed to execute the tool. In our example of `movieDetailsByMovieId` it would not make any sense to try and use this tool if we didn’t have a `movieId` to look up.

This is the information that the model is providing back to us as the result of the `thought` activity.

LangChain recommends using Zod, a powerful [schema validation library](https://www.bitovi.com/blog/comparing-schema-validation-libraries-ajv-joi-yup-and-zod), for easily defining these input schemas. When we call `invoke` on one of our matching tools, LangChain will automatically perform all the heavy lifting to validate that the input that model provided actually matches what is required by the tool call.

```
    try {
      const result = await tool.invoke(input);
      return result;
    } catch (err: unknown) {
      const error = err as Error;
      return JSON.stringify({
        name: toolName,
        input: input,
        error: `Error invoking tool ${tool.name}: ${error.message}`,
      });
    }
```

The result of this activity is simply the data that we fetched from The Movie DB API or some other error information that we can return to the Workflow. It is now up to the Observation step to figure out what to do with it.

### The Observation Activity

The final step in our ReAct Agent Workflow is the `observation` activity. The job of this activity is to take the results of our latest `action` and integrate it into the current context of the Agent.

In this activity our prompt is a little bit simpler and there is no need for the structured output from the model this time, we simply want the model to summarize and explain the results we got so that the next `thought` can take them into account.

The Observation Prompt looks something like this:

```
You are a ReAct (Reasoning and Acting) agent tasked with answering the following query:

<user-query>
{userQuery}
</user-query>

Your goal is to extract insights from the results of your last action and provide a concise observation.

Instructions:
1. Analyze the query, previous reasoning steps, and observations.
2. Extract insights from the latest action result.
3. Respond with a concise observation that summarizes the results of the last action taken.

In this observation step, consider the following information from previous steps:

<previous-steps>
{previousSteps}
</previous-steps>

Provide your observation based on the latest action result:
<action-result>
{actionResult}
</action-result>
```

## Handling Long-Running Agents

One challenge with AI agents in production is that they can run for extended periods. A complex query might require dozens of iterations through the ReAct loop, each generating thoughts, actions, and observations. In Temporal, every activity execution adds events to the Workflow's history, and this history has practical limits.

Temporal provides a pattern called `continueAsNew` specifically for this scenario. When a Workflow's event history grows large, we can checkpoint our current state and start a fresh Workflow execution that picks up where we left off. The key insight is that we don't need the full history to continue - we just need the current context.

Here's how we enhance our agent workflow to handle long-running executions:

```
import {
  proxyActivities,
  workflowInfo,
  continueAsNew,
} from "@temporalio/workflow";
import type * as activities from "./activities";

const { thought, action, observation, compact } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export type AgentWorkflowInput = {
  query: string;
  continueAsNew?: {
    context: string[];
  };
};

export async function agentWorkflow(
  input: AgentWorkflowInput,
): Promise<{ answer: string; usage: AgentUsage }> {
  const context: string[] = input.continueAsNew
? input.continueAsNew.context
: [];

  while (true) {
    if (workflowInfo().continueAsNewSuggested) {
      const compactContext = await compact(input.query, context);
      return continueAsNew<typeof agentWorkflow>({
        query: input.query,
        continueAsNew: {
          context: compactContext.context,
        },
      });
    }

    // everything after this is identical to before: thought, action, observation
  }
}
```

The `workflowInfo().continueAsNewSuggested` flag is set by Temporal when the event history is approaching it maximum size limit. When this happens, we compact our context (more on this next) and call `continueAsNew` with our current state. From the outside our agent looks like one continuous Workflow execution, but internally Temporal can start a new Workflow Execution with a fresh history while preserving all our progress.

This pattern is essential for production agents that might:

-   Process complex queries requiring many tool calls
    
-   Run for hours or days waiting for external events
    
-   Handle conversations that grow over time
    

Without `continueAsNew`, these long-running agents would eventually hit history limits and fail. With it, they can run indefinitely.

## Context Compaction

As our agent iterates through the ReAct loop, the context array grows with each thought, action, and observation. This creates a couple additional problems:

-   The LLM's context window has limits.
    
-   Larger contexts mean higher API costs and slower responses.
    

Context compaction solves this by periodically summarizing older context entries while preserving the most recent ones. We keep the most recent entries intact (they're likely the most relevant still) and ask the LLM to distill older entries into a condensed summary.

```
export async function compact(
  query: string,
  context: string[]
): Promise<string[]> {
  const compactTemplate = compactPromptTemplate();
  const formattedPrompt = await compactTemplate.format({
    userQuery: query,
    contextHistory: context.join("\n"),
  });

  const model = getChatModel();
  const response = await model.invoke([
    { role: "user", content: formattedPrompt },
  ]);

  // Return the compacted summary plus the most recent entries
  return [response.content as string, ...context.slice(-3)];
}
```

The compaction prompt asks the model to preserve key information while reducing verbosity:

```
You are helping to manage context for a ReAct agent working on the following query:

<user-query>
{userQuery}
</user-query>

The agent has accumulated the following context history that needs to be compacted
to fit within context limits while preserving essential information:

<context-history>
{contextHistory}
</context-history>

Instructions:
1. Analyze the context history and identify the key information needed to continue
   working on the user's query.
2. Preserve important facts, observations, and conclusions.
3. Remove redundant information and verbose explanations.
4. Maintain the chronological flow of reasoning where important.

Provide a compacted summary that captures the essential context the agent needs
to continue its work effectively.
```

The result is a new context array that contains a summary of all prior work plus the three most recent entries. This keeps the context manageable while ensuring the agent doesn't lose track of what it has learned.

This pattern is particularly valuable when:

-   Queries require many iterations to resolve
    
-   Tool calls return large payloads that bloat the context
    
-   You want to control LLM costs by limiting context size
    

By adding a function `calculateTokenUsage` to our `continueAsNew` check, we can proactively trigger this compaction and continueAsNew if our LLM context length starts to grow too large. This ensures that our agent can handle complex tasks without running into memory, history length, or context window limits.

```
    if (
      workflowInfo().continueAsNewSuggested ||
      calculateTokenUsage(context) > 50000
    ) {
      const compactContext = await compact(input.query, context);
      if (compactContext.usage) {
        usage.push(compactContext.usage);
      }
      return continueAsNew<typeof agentWorkflow>({
        query: input.query,
        continueAsNew: {
          context: compactContext.context,
          usage,
        },
      });
    }
```

### K-Pop Demon Hunters?

Lets take a look at a complete execution of our Movie Agent Workflow! We start with a question:

```
"What movies were directed by Maggie Kang?"
```

Below we can see the full Workflow Event History from the Temporal Web UI. This UI makes it easy to see what our Agent is doing, each of our activities in our loop are printed here as the model works on answering the question.

We can see our input question on the left side and, because this workflow has completed, the final result on the right side.

![Prod_Ready_AI_Agents_workflow](https://www.bitovi.com/hs-fs/hubfs/Prod_Ready_AI_Agents_workflow.png?width=800&height=376&name=Prod_Ready_AI_Agents_workflow.png)

Temporal gives us great visibility into each of those activities as well. If we click on one of those activities in the history, we can take a look at the exact inputs and outputs that were generated.

![prod_ready_ai_agents_outputs](https://www.bitovi.com/hs-fs/hubfs/prod_ready_ai_agents_outputs.png?width=800&height=405&name=prod_ready_ai_agents_outputs.png)

In this screenshot we can see the input, in this case just our original question and an empty array for previous context. The result matches our expected object format, with the model providing its thoughts and reasoning along with which tool calls will collect additional needed information.

If we take a look at the next activity, our `action` we can see how then fetched the needed information about Maggie Kang from the TMDB API.

![prod_ready_ai_agents_action](https://www.bitovi.com/hs-fs/hubfs/prod_ready_ai_agents_action.png?width=800&height=427&name=prod_ready_ai_agents_action.png)

The third step, the `observation` is going to take the results from the API, all this JSON, and extract the important parts necessary for the Agent to continue working on the problem.

This time we can see the input to the observation activity contains a few things, the original user questions, the original thoughts that were generated initially by the model, information about the action that was performed, and then the data payload from the tool call.

![prod_ready_ai_agents_observation](https://www.bitovi.com/hs-fs/hubfs/prod_ready_ai_agents_observation.png?width=800&height=372&name=prod_ready_ai_agents_observation.png)

At the bottom, this time, we see that the observation has trimmed down all that JSON into a single sentence, extracting the important information like Maggie's UUID, being listed as a Director, and the relevant titles KPop Demon Hunters and its untitled follow up.

We have now stepped through one whole iteration of our ReAct agent loop. Starting from the beginning of the loop again, the Agent is going to execute the `thought` activity to reevaluate the state of its knowledge and either collect more information or provide a final answer.

On this next iteration through the Agent decides that it needs to fetch all of Maggie's movie credits, filtering for directing roles, to make sure that it has actually found all of the relevant information.

```
{
  "thought": "I found that Maggie Kang has person ID 3003169 and is known for directing. The observation mentions two titles: 'KPop Demon Hunters (2025)' and 'an untitled KPop Demon Hunters follow-up'. However, to get a complete and accurate list of all movies directed by Maggie Kang, I should use the person_movie_credits_by_id tool to retrieve her full movie credits. This will allow me to specifically identify which movies she directed, as opposed to other roles she may have had.",
  "action": {
    "name": "person_movie_credits_by_id",
    "reason": "To get a comprehensive list of all movie credits for Maggie Kang and filter for directing roles",
    "input": {
      "id": "3003169"
    }
  }
}
```

Skipping ahead to the third iteration, this time the `thought` activity determines that it has found the correct answer to our original question and the activity returns our second type of structured output, this time providing a final answer.

### Thought Activity Result

```
{
  "thought": "Based on the previous steps, I have successfully retrieved Maggie Kang's directing credits using the person_movie_credits_by_id tool. The observation clearly shows her complete directing filmography:\n\n1. KPop Demon Hunters (2025) - a completed/released film\n2. Untitled KPop Demon Hunters Follow-Up (in development) - a project currently in development\n\nI now have comprehensive information from the movie database about all movies directed by Maggie Kang. This information comes directly from the TMDb API through the person_movie_credits_by_id tool, which specifically filtered for her directing credits. I have sufficient information to provide a complete answer to the user's query.",
  "answer": "Based on the movie database, Maggie Kang has directed the following movies:\n\n1. **KPop Demon Hunters** (2025)\n2. **Untitled KPop Demon Hunters Follow-Up** (currently in development)\n\nMaggie Kang appears to be working on a franchise centered around the KPop Demon Hunters concept, with one released film and a follow-up project currently in development.",
}
```

From this final response, the workflow code determines that we got a final answer from the Agent, and returns that as the result of the Workflow itself.

**Ready to Build Production-Grade AI Agents with Temporal?**

If you’re experimenting with AI agents—or already running Temporal in production—Bitovi can help you move faster with fewer risks. From architecture and implementation to optimization and team enablement, we partner with you to build durable systems that last.

Whether you’re launching your first agent or scaling enterprise workflows, our Temporal experts can help.

[**👉 Start a conversation with Bitovi**](https://www.bitovi.com/services/backend/temporal-consulting)

Building production-ready AI agents requires more than just prompt engineering and LLM calls, it demands robust infrastructure that can handle the messy realities of distributed systems. By combining Temporal's durable execution and inherent scalability with LangChain's powerful LLM abstractions and tool-calling utilities, we get the best of both worlds: agents that can reason and act effectively while remaining resilient to failures, observable in their decision-making, and scalable to meet real-world demands.

The ReAct pattern implemented as a Temporal Workflow gives us a clear, maintainable way to express agent logic, while LangChain Activities handle the complexity of interacting with LLMs and external tools. This separation of concerns means we can focus on building intelligent agent behaviors without getting bogged down in the infrastructure concerns that would otherwise consume our development time.

Check out the complete working example in this [GitHub repository](https://github.com/bitovi/temporal-langchain-react-agent), where you'll find all the code from this post along with setup instructions to experiment on your own.

Whether you're building customer support agents, data analysis workflows, or complex automation tasks, this pattern provides a solid foundation for taking your AI agents from prototype to production.

### Here’s where Bitovi comes in:

Bitovi helps teams design, build, and operate **production-grade Temporal systems**, including AI agents and LLM-driven workflows. Whether you’re introducing Temporal for the first time or extending an existing deployment, we help you:

-   Design durable, scalable agent architectures
    
-   Apply Temporal best practices for retries, versioning, and observability
    
-   Integrate LLMs and tool-calling safely into long-running workflows
    
-   Move from prototype to production with confidence
    

If you’re exploring AI agents powered by Temporal—or already running Temporal in production and want to level up—**we’d love to help**.

_[![Schedule Your Free Temporal Consultation](https://no-cache.hubspot.com/cta/default/2171535/interactive-142178638135.png)](https://www.bitovi.com/hs/cta/wi/redirect?encryptedPayload=AVxigLJBArF8W53R4p2TYerRqoVxY7Mat1DyM5qPpmSGAlcbspVePcxu%2FDZHPXfOolLDrKIgvE%2Bbe8flGmIprxmgyPHHHVN8rO0vUuSdCjAahWO6kL0DhBJlgk%2BaVZ2cgpLXdB78se3mnN8DgEtLA2AF7uoZJFCbmMb3thS%2BKGG%2BjUl9xGzuAwlkQyXvNd9Mr2U4Y%2BVACicjOSCU8YAzJVtd&webInteractiveContentId=142178638135&portalId=2171535)_