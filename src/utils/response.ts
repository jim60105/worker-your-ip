/**
 * Create a plain text response
 */
export function textResponse(body: string, status: number = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

/**
 * Create a JSON response
 */
export function jsonResponse(
  data: object,
  status: number = 200
): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

/**
 * Create an HTML response
 */
export function htmlResponse(html: string, status: number = 200): Response {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

/**
 * Create an error response
 */
export function errorResponse(message: string, status: number): Response {
  return textResponse(message, status);
}
