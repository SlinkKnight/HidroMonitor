import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/features/dashboard/DashboardPage";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — HidroMonitor" }, { name: "robots", content: "noindex" }],
  }),
  component: DashboardPage,
});
