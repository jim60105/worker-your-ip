/**
 * Check if a string is a valid IPv4 address
 */
export function isIPv4(ip: string): boolean {
  if (!ip || typeof ip !== "string") return false;

  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

/**
 * Check if a string is a valid IPv6 address
 */
export function isIPv6(ip: string): boolean {
  if (!ip || typeof ip !== "string") return false;

  // Don't match IPv4 addresses
  if (isIPv4(ip)) return false;

  // IPv6 regex - handles full, compressed, and mixed formats
  const ipv6Regex =
    /^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(?:ffff(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])\.){3}(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])\.){3}(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9]))$/;
  return ipv6Regex.test(ip);
}

/**
 * Get the client IP from request headers
 */
export function getClientIP(request: Request): string {
  // CF-Connecting-IP is the primary header set by Cloudflare
  const cfIP = request.headers.get("CF-Connecting-IP");
  if (cfIP) return cfIP;

  // Fallback to X-Forwarded-For
  const xForwardedFor = request.headers.get("X-Forwarded-For");
  if (xForwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return xForwardedFor.split(",")[0].trim();
  }

  // Fallback to X-Real-IP
  const xRealIP = request.headers.get("X-Real-IP");
  if (xRealIP) return xRealIP;

  return "unknown";
}
