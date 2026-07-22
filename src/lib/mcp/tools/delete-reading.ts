import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { supabaseForToken } from "../supabase-for-user";
import type { McpAuthContext } from "../verify-bearer-token";

export function registerDeleteReadingTool(server: McpServer, auth: McpAuthContext) {
  server.registerTool(
    "delete_reading",
    {
      title: "Delete a water meter reading",
      description: "Permanently delete one of the signed-in user's readings by id.",
      inputSchema: {
        id: z
          .string()
          .describe("UUID of the reading to delete. Must belong to the signed-in user."),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ id }) => {
      const { error } = await supabaseForToken(auth.token).from("readings").delete().eq("id", id);
      if (error) return { content: [{ type: "text", text: error.message }], isError: true };
      return {
        content: [{ type: "text", text: `Deleted reading ${id}` }],
        structuredContent: { id, deleted: true },
      };
    },
  );
}
