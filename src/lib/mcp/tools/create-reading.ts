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
  name: "create_reading",
  title: "Record a water meter reading",
  description:
    "Insert a new water meter reading for the signed-in user. `liters` must be zero or positive. `read_at` is optional; defaults to now.",
  inputSchema: {
    liters: z.number().describe("Meter reading in liters. Must be >= 0."),
    read_at: z
      .string()
      .describe("ISO 8601 timestamp for when the reading was taken. Defaults to the current server time when omitted.")
      .optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ liters, read_at }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (liters < 0) {
      return { content: [{ type: "text", text: "liters must be >= 0" }], isError: true };
    }
    const row: Record<string, unknown> = { user_id: ctx.getUserId(), liters };
    if (read_at) row.read_at = read_at;
    const { data, error } = await supabaseForUser(ctx)
      .from("readings")
      .insert(row)
      .select("id, liters, read_at, created_at")
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { reading: data },
    };
  },
});
