import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Crear el servidor
// Es la interfaze principal con el protocolo MCP. Maneja la comunicación entre el cliente y el servidor.

const server = new McpServer({
  name: "demo",
  version: "1.0.0",
});

// 2. Definir la herramienta
// Las herramientas la permite al LLM realizar acciones a través de tu servidor MCP.

server.tool(
  "fetch-weather",
  "Tool to fetch the weather of a city",
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `The weather of ${city} is sunny`,
        },
      ],
    };
  }
);

//3. Escuchar las conexiones del cliente
const transport = new StdioServerTransport();
await server.connect(transport);