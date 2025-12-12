import { getClientIP, isIPv4, isIPv6 } from "../utils/ip";
import {
  textResponse,
  jsonResponse,
  errorResponse,
} from "../utils/response";

interface CfProperties {
  asn?: number;
  asOrganization?: string;
  colo?: string;
  country?: string | null;
  isEUCountry?: string | null;
  city?: string | null;
  continent?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  postalCode?: string | null;
  region?: string | null;
  regionCode?: string | null;
  timezone?: string;
  httpProtocol?: string;
  tlsVersion?: string;
  tlsCipher?: string;
  clientAcceptEncoding?: string | null;
  requestPriority?: string | null;
}

/**
 * Get all client information
 */
export function getAllClientInfo(request: Request): Record<string, unknown> {
  const ip = getClientIP(request);
  const cf = (request.cf || {}) as CfProperties;

  return {
    ip,
    ipVersion: isIPv4(ip) ? "IPv4" : isIPv6(ip) ? "IPv6" : "unknown",
    country: cf.country || null,
    countryIsEU: cf.isEUCountry === "1",
    city: cf.city || null,
    continent: cf.continent || null,
    latitude: cf.latitude || null,
    longitude: cf.longitude || null,
    postalCode: cf.postalCode || null,
    region: cf.region || null,
    regionCode: cf.regionCode || null,
    timezone: cf.timezone || null,
    asn: cf.asn || null,
    organization: cf.asOrganization || null,
    colo: cf.colo || null,
    httpProtocol: cf.httpProtocol || null,
    tlsVersion: cf.tlsVersion || null,
    tlsCipher: cf.tlsCipher || null,
  };
}

/**
 * Handle /ip endpoint - returns any IP
 */
export function handleIP(request: Request): Response {
  const ip = getClientIP(request);
  return textResponse(ip);
}

/**
 * Handle /ipv4 endpoint
 */
export function handleIPv4(request: Request): Response {
  const ip = getClientIP(request);

  if (!isIPv4(ip)) {
    return errorResponse("IPv4 address not available. You are using IPv6.", 400);
  }

  return textResponse(ip);
}

/**
 * Handle /ipv6 endpoint
 */
export function handleIPv6(request: Request): Response {
  const ip = getClientIP(request);

  if (!isIPv6(ip)) {
    return errorResponse("IPv6 address not available. You are using IPv4.", 400);
  }

  return textResponse(ip);
}

/**
 * Handle /country endpoint
 */
export function handleCountry(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const country = cf.country;

  if (!country) {
    return errorResponse("Country information not available", 404);
  }

  return textResponse(country);
}

/**
 * Handle /city endpoint
 */
export function handleCity(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const city = cf.city;

  if (!city) {
    return errorResponse("City information not available", 404);
  }

  return textResponse(city);
}

/**
 * Handle /region endpoint
 */
export function handleRegion(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const region = cf.region;

  if (!region) {
    return errorResponse("Region information not available", 404);
  }

  return textResponse(region);
}

/**
 * Handle /timezone endpoint
 */
export function handleTimezone(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const timezone = cf.timezone;

  if (!timezone) {
    return errorResponse("Timezone information not available", 404);
  }

  return textResponse(timezone);
}

/**
 * Handle /coordinates endpoint
 */
export function handleCoordinates(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const latitude = cf.latitude;
  const longitude = cf.longitude;

  if (!latitude || !longitude) {
    return errorResponse("Coordinate information not available", 404);
  }

  return textResponse(`${latitude},${longitude}`);
}

/**
 * Handle /continent endpoint
 */
export function handleContinent(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const continent = cf.continent;

  if (!continent) {
    return errorResponse("Continent information not available", 404);
  }

  return textResponse(continent);
}

/**
 * Handle /asn endpoint
 */
export function handleASN(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const asn = cf.asn;

  if (!asn) {
    return errorResponse("ASN information not available", 404);
  }

  return textResponse(String(asn));
}

/**
 * Handle /org endpoint
 */
export function handleOrg(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const org = cf.asOrganization;

  if (!org) {
    return errorResponse("Organization information not available", 404);
  }

  return textResponse(org);
}

/**
 * Handle /colo endpoint
 */
export function handleColo(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const colo = cf.colo;

  if (!colo) {
    return errorResponse("Data center information not available", 404);
  }

  return textResponse(colo);
}

/**
 * Handle /tls endpoint
 */
export function handleTLS(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const tlsVersion = cf.tlsVersion;

  if (!tlsVersion) {
    return errorResponse("TLS information not available", 404);
  }

  return textResponse(tlsVersion);
}

/**
 * Handle /protocol endpoint
 */
export function handleProtocol(request: Request): Response {
  const cf = (request.cf || {}) as CfProperties;
  const httpProtocol = cf.httpProtocol;

  if (!httpProtocol) {
    return errorResponse("Protocol information not available", 404);
  }

  return textResponse(httpProtocol);
}

/**
 * Handle /json endpoint
 */
export function handleJSON(request: Request): Response {
  const info = getAllClientInfo(request);
  return jsonResponse(info);
}

/**
 * Handle /headers endpoint
 */
export function handleHeaders(request: Request): Response {
  const headers: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return jsonResponse(headers);
}
