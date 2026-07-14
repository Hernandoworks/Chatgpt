import { routeAgentRequest } from "agents";
import { ChatAgent } from "./agents/chat";
import { PortfolioAgent } from "./agents/portfolio";
import { AlertAgent } from "./agents/alerts";

export { ChatAgent, PortfolioAgent, AlertAgent };

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/webhooks/alert")) {
      const entityId = url.searchParams.get("id") || "default";
      const agentId = env.AlertAgent.idFromName(entityId);
      const agent = env.AlertAgent.get(agentId);
      return agent.fetch(req);
    }

    const response = await routeAgentRequest(req, env);
    if (response) return response;
    return new Response("Not found", { status: 404 });
  },
};
