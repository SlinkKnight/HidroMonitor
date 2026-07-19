import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_readings",
  title: "List water meter readings",
  description:
    "List the signed-in user's water meter readings, most recent first. Each reading has a liters value and a read_at timestamp.",
  inputSchema: {
    limit: z
      .number()
      .int()
      .describe("Maximum number of readings to return. Defaults to 20 when omitted; the server caps at 100.")
      .optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const capped = Math.min(Math.max(limit ?? 20, 1), 100);
    const { data, error } = await supabaseForUser(ctx)
      .from("readings")
      .select("id, liters, read_at, created_at")
      .order("read_at", { ascending: false })
      .limit(capped);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { readings: data ?? [] },
    };
  },
});
