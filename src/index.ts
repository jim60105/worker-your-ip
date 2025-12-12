import {
  handleIP,
  handleIPv4,
  handleIPv6,
  handleCountry,
  handleCity,
  handleRegion,
  handleTimezone,
  handleCoordinates,
  handleContinent,
  handleASN,
  handleOrg,
  handleColo,
  handleTLS,
  handleProtocol,
  handleJSON,
  handleHeaders,
} from "./handlers/api";
import { generateHTML } from "./handlers/html";
import { htmlResponse, textResponse } from "./utils/response";

export interface Env {
  // Add environment bindings here if needed
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Route to appropriate handler
    switch (path) {
      case "/":
        return htmlResponse(generateHTML(request));
      case "/ip":
        return handleIP(request);
      case "/ipv4":
        return handleIPv4(request);
      case "/ipv6":
        return handleIPv6(request);
      case "/country":
        return handleCountry(request);
      case "/city":
        return handleCity(request);
      case "/region":
        return handleRegion(request);
      case "/timezone":
        return handleTimezone(request);
      case "/coordinates":
        return handleCoordinates(request);
      case "/continent":
        return handleContinent(request);
      case "/asn":
        return handleASN(request);
      case "/org":
        return handleOrg(request);
      case "/colo":
        return handleColo(request);
      case "/tls":
        return handleTLS(request);
      case "/protocol":
        return handleProtocol(request);
      case "/json":
        return handleJSON(request);
      case "/headers":
        return handleHeaders(request);
      default:
        return textResponse("Not Found", 404);
    }
  },
} satisfies ExportedHandler<Env>;
