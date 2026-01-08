---
title: "Building Durable MCP Tools with Temporal: A Complete Guide"
source: "https://www.bitovi.com/blog/building-durable-mcp-tools-with-temporal"
publishedDate: "2025-10-18"
category: "frontend"
feedName: "Bitovi"
author: "Mark Repka"
---

To make the most of Large Language Models (LLMs) like ChatGPT and Gemini, we need to ensure that they have access to the most up-to-date information and can interact with external systems, transforming them from simple text-generation engines into powerful and flexible AI Agents.

Many of today’s AI-powered applications make use of Tool Calling, which allows LLMs to send structured input to external functions and use the results of those functions as additional context for the LLM. The Model Context Protocol expands on Tool Calling by providing an open standard for how LLMs can understand and interact with these tools.

[![Vector](https://no-cache.hubspot.com/cta/default/2171535/interactive-175013859865.png)](https://www.bitovi.com/hs/cta/wi/redirect?encryptedPayload=AVxigLK3IPdO1UsWE6LEdsmhuFN50Dz%2BOln50tjsBIbtQnt0z8d95YrfQNv7ITooFutJP01k35va4ExFQSay6%2BISR2KMMqCgdhdetuYaRy2YbEFNL8u1u%2FQLqjMENp21dopltgBRiLHJDsGggNHR8qIv4wqtxtMlZTrywFc8v7EFMU%2BshO3SAqkKj0g5YOCYeEiMCZZG%2FrHrXamZNR%2FME846kyTJ&webInteractiveContentId=175013859865&portalId=2171535)

## Model Context Protocol Overview

The Model Context Protocol (MCP) is an industry standard for exposing Tools, Resources, and other capabilities to LLM-powered applications in a consistent and predictable manner.

We can think of MCP as the USB-C for AI Applications, providing a unified way to access and manage context across different tools and resources.

In order for our MCP Server to be effective, it needs to be able to serve requests from many clients in a scalable and efficient manner. By leveraging Temporal, we can achieve much of this scaling and reliability with minimal effort!

## Temporal Overview

Temporal is a durable execution framework that allows developers to write reliable and scalable distributed applications. By design Temporal ensures that once our application is started it will execute to completion, even in the face of failures. Temporal refers to this as "Durable Execution".

By moving the burden of failure handling from the application into the platform, there is less code for the application developer to write, test, and maintain. These Temporal Workflows provide a better way to express business logic, making development much easier than traditional distributed codebases.

Temporal also provides out-of-the-box tooling for monitoring, providing visibility into the state of running and completed workflows. The Temporal Web UI lets you quickly isolate, debug, and resolve problems even with in-flight workflows.

The core building blocks of Temporal that we'll focus on for building our MCP Tools are Workflows and Activities:

-   Workflows contain the deterministic business logic of our Tool. Because of the determinism requirement, Workflow code cannot interact with external resources directly.
    
-   Activities, called from our Workflow code, allow us to interact with external resources, perform I/O work, and handle anything else we need. Activities in Temporal are controlled by a Retry Policy and can be automatically retried up to an infinite number of times until they succeed.
    

MCP Tools often require multiple steps, long-running processes, or integration with potentially unreliable external APIs. This fits perfectly with Temporal's architecture and lets us take advantage of the features and durable execution guarantees it provides.

## Example: Temporal Financial Tools

The example application below provides an MCP Server that gives AI Agents secure access to SEC 10-K financial filings for public companies.

The code for this example can be found on [GitHub](https://github.com/bitovi/temporal-ai-financial-tools)

This MCP server takes in the name of a company, a set of years, the type of SEC Filing, and a specific query:

```
{
  "company": "apple",
  "years": [2022, 2023],
  "formType": "10-K",
  "query": "services revenue"
}
```

The server returns sections from the Company’s Filings in those years that are related to the query:

```
[
  {
    "year": 2023,
    "content": "Services revenue increased during 2023 compared to 2022 due primarily to growth in advertising, the App Store, and AppleCare. Services revenue was $85.2 billion for 2023..."
  },
  {
    "year": 2023,
    "content": "The Company recognizes services revenue over the time period that services are provided. For services that are sold with other products or services..."
  },
  {
    "year": 2023, 
    "content": "Services gross margin increased during 2023 compared to 2022 due primarily to the revenue growth described above, partially offset by higher costs..."
  },
  {
    "year": 2022,
    "content": "Services revenue was $78.1 billion during 2022, an increase of 14% compared to 2021. The growth was driven by increases across multiple service categories..."
  },
  {
    "year": 2022,
    "content": "Services include digital content and services sold through the App Store, AppleCare, advertising, payment services, and cloud services..."
  },
  {
    "year": 2022,
    "content": "Services gross margin was 71.7% during 2022 compared to 69.7% during 2021. The increase was primarily due to the revenue growth described above..."
  }
]
```

The Temporal Web UI adds observability to our tools for free, making it easy to see the inputs to our workflow on the left, the result on the right, and below that, the complete timeline of functions that occurred durably under the hood to compile that result.

![Example Temporal UI for use building durable MCP tools for AI](https://www.bitovi.com/hs-fs/hubfs/BuildingDurableMCPToolsTemporalUI.png?width=760&height=479&name=BuildingDurableMCPToolsTemporalUI.png)

This is a great example of how we can use Temporal to manage the complexity of our MCP Tools. We're integrating with various data sources and APIs to fetch information that needs to be durable and reliable for our MCP Client application.

Need expert eyes on your Temporal instance? We’re proud Temporal [partners](https://www.bitovi.com/partnerships), and our team of expert [Temporal Consultants](https://www.bitovi.com/services/backend/temporal-consulting) would be happy to help guide you. Schedule a free consultation to get started.

## Building the MCP Server: Code Walkthrough

Now let's dive into the actual implementation. We'll start with the MCP server definition and then walk through the complete Temporal workflow.

### Defining the MCP Server

We can define an MCP Server that contains a tool for querying SEC filings documents:

```
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'Financial Tools MCP Server',
    version: '1.0.0',
  });

server.registerTool(
    'query_sec_filings_documents',
    {
      title: 'Query SEC Filings Documents',
      description:
        'Fetch SEC filings documents for a company for specified years. Returns sections of the filings related to the query.',
      inputSchema: {
        companyName: z
          .string()
          .describe(
            'Name of the company to fetch filings for (e.g., "Apple", "Microsoft", "Tesla")'
          ),
        years: z
          .array(z.number().int().min(1993).max(new Date().getFullYear()))
          .describe(
            'Array of years to fetch filings for (e.g, [2023, 2022]). Years must be between 1993 and current year.'
          ),
        formType: z
          .string()
          .describe('Type of SEC filing to fetch (e.g., "10-K", "10-Q"). Defaults to "10-K".')
          .default('10-K'),
        query: z
          .string()
          .describe('Query to filter or search within the filings. Can be a keyword or phrase.'),
      },
    },
    async ({ companyName, years, formType, query }) => {
      // start and wait for the temporal workflow to complete
      // we'll look at this code shortly!
    }
  );
```

This is exactly how we would build a normal non-Temporal backed MCP Server. The MCP integration remains unchanged. We’ll use Temporal for our tool implementation. Since Temporal workflows are implemented in code in our chosen language, we can use Temporal for tools that need to be durable, while simple tasks can be executed as normal functions.

### Implementing the Workflow Caller

Now let's look at the implementation for calling our Workflow code:

```
const temporalClient = await initializeTemporalClient();

const input: QuerySECFilingsInput = {
  company: companyName.trim(),
  years: years,
  formType: formType,
  query: query,
};

const workflowId = `fetch-10k-${companyName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${years.join('-')}-${Date.now()}`;

const workflowOptions = {
  taskQueue: 'ai-financial-tools-queue',
  workflowId: workflowId,
};

console.log(`⚡ Starting workflow with ID: ${workflowId}`);

const handle = await temporalClient.workflow.start(querySECFilingsWorkflow, {
  args: [workflowId, input],
  ...workflowOptions,
});

const results: QuerySECFilingsResult[] = await handle.result();

console.log(`🎉 Workflow completed successfully for ${companyName}`);

return results;
```

Here we initialize our Temporal client, build a unique workflow ID, kick off the workflow, and await the result. But under the hood, a TON of work is happening for us with full durability guarantees!

### The Complete Workflow Implementation

Now let's examine what the `querySECFilingsWorkflow` is actually doing:

```
export interface QuerySECFilingsInput {
  company: string;
  years: number[];
  formType: string;
  query: string;
}

export interface QuerySECFilingsResult {
  year: number;
  content: string;
}

export async function querySECFilingsWorkflow(
  workflowId: string,
  input: QuerySECFilingsInput
): Promise<QuerySECFilingsResult[]> {
    // Step 1: Get the company's CIK (Central Index Key) from SEC
  const cik = await getCIKFromCompanyName(input.company);
  if (!cik) {
    return [];
  }

  const results: QuerySECFilingsResult[] = [];
  // Step 2: Process each year in parallel
  await Promise.all(
    input.years.map(async (year) => {
      // Step 3: Fetch filings for this specific year
      const filings: NormalizedSECCompanyFiling[] = await fetchSECSubmissions(
        cik,
        year,
        input.formType
      );

      // Step 4: Process each filing document in parallel
      await Promise.all(
        filings.map(async (filing) => {
          const primaryDocument = filing.primaryDocument;
          const accessionNumber = filing.accessionNumber;

          // Step 5: Download and split the document
          const content = await fetchSECFilingDocument(cik, accessionNumber, primaryDocument);
          const chunks = await splitText(content, 3000, 200);
      
          // Step 6: Generate embeddings and store each chunk in parallel
          await Promise.all(
            chunks.map(async (chunk) => {
              const embedding = await fetchEmbedding(chunk);
              await insertEmbedding(workflowId, {
                cik,
                company_name: input.company,
                year,
                document_type: filing.form,
                accession_number: accessionNumber,
                primary_document: primaryDocument,
                content: chunk,
                embedding,
              });
            })
          );
        })
      );

      // Step 7: Query for relevant sections using vector similarity search
      const queryEmbedding = await fetchEmbedding(input.query);
      const relatedEmbeddings = await getRelatedEmbeddings(workflowId, queryEmbedding, [year], 3);
  
     results.push(
        ...relatedEmbeddings.map((e) => ({
          year: e.year,
          content: e.content,
        }))
      );
    })
  );

  return results.sort((a, b) => b.year - a.year);
}
```

This workflow showcases several sophisticated patterns that make it particularly well-suited for Temporal:

1.  Parallel Processing at Multiple Levels
    
    1.  The workflow processes years in parallel, filings within each year in parallel, and document chunks in parallel.
        
    2.  This dramatically improves performance while maintaining reliability.
        
    
2.  Using WorkflowId as Collection Name
    
    1.  Notice how the workflow uses the `workflowId` as the collection name for our vector database, Qdrant. This creates isolated vector stores for each workflow execution, preventing data conflicts between concurrent runs.
        
    2.  The `workflowId` must always be unique for each currently executing Workflow.
        

## The Power of Durable Execution

What makes this implementation powerful is that every step is durable. If our process fails at any point due to network issues while downloading a filing, API rate limits, or database connectivity problems, Temporal will automatically handle the recovery.

The workflow will pick up exactly where it left off, with all previous work preserved. This is crucial for a process that involves:

-   Multiple API calls to external services
    

-   Large document downloads and processing
    

-   Machine learning inference for embeddings
    

-   Vector database operations
    

Without Temporal, we'd need to implement complex retry logic, state management, and failure recovery throughout our codebase. With Temporal, we get all of this for free while writing business logic that reads like straightforward procedural code.

## Summary

By combining MCP with Temporal, we can build AI tools that are not only powerful and flexible but also reliable and scalable. The Model Context Protocol provides a clean interface for AI agents to interact with our tools, while Temporal ensures those tools can handle real-world complexity and failure scenarios gracefully.

This pattern is particularly valuable for tools that need to integrate multiple external services, process large amounts of data, or provide guarantees about completion even in the face of temporary failures. As AI applications become more sophisticated and mission-critical, having this foundation of reliability becomes essential.

The complete example code is available in our [repository](https://github.com/bitovi/temporal-ai-financial-tools). You can adapt this pattern for your own durable MCP tools, whether you're building financial analysis tools, data processing pipelines, or any other complex AI-powered functionality.