import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listReadings from "./tools/list-readings";
import createReading from "./tools/create-reading";
import deleteReading from "./tools/delete-reading";

// The OAuth issuer MUST be the direct Supabase host, not the `.lovable.cloud`
// proxy — mcp-js rejects a mismatched issuer (RFC 8414). Vite inlines this
// literal at build time; the fallback keeps the URL well-formed during
// throwaway manifest-extract evals.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "hidromonitor-mcp",
  title: "HidroMonitor",
  version: "0.1.0",
  instructions:
    "Tools to read and manage the signed-in user's water meter readings on HidroMonitor. Use `list_readings` to see recent readings, `create_reading` to log a new liters value, and `delete_reading` to remove one by id.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listReadings, createReading, deleteReading],
});
