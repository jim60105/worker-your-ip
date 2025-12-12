import { getAllClientInfo } from "./api";

interface ClientInfo {
  ip: string;
  ipVersion: string;
  country: string | null;
  countryIsEU: boolean;
  city: string | null;
  continent: string | null;
  latitude: string | null;
  longitude: string | null;
  postalCode: string | null;
  region: string | null;
  regionCode: string | null;
  timezone: string | null;
  asn: number | null;
  organization: string | null;
  colo: string | null;
  httpProtocol: string | null;
  tlsVersion: string | null;
  tlsCipher: string | null;
}

function escapeHtml(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateHTML(request: Request): string {
  const info = getAllClientInfo(request) as unknown as ClientInfo;
  const hostname = new URL(request.url).hostname;

  const locationPrimary =
    [info.city, info.region, info.country].filter(Boolean).join(", ") || "N/A";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your IP - ${escapeHtml(info.ip)}</title>
  <meta name="description" content="Discover your IP address, geolocation, and connection details instantly.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anta&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: "Anta", system-ui, -apple-system, "Segoe UI", sans-serif; }
    .copy-btn:active { transform: scale(0.98); }
  </style>
</head>
<body class="h-screen bg-slate-950 text-slate-100 overflow-hidden">
  <div class="h-screen flex">
    <!-- Sidebar -->
    <aside class="hidden lg:flex lg:flex-col w-64 h-screen border-r border-emerald-500/10 bg-slate-950/60 backdrop-blur">
      <div class="flex items-center gap-3 px-6 py-6">
        <div class="h-9 w-9 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30 flex items-center justify-center">
          <svg class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <div>
          <div class="text-lg tracking-wide">Your IP</div>
          <div class="text-xs text-slate-400">Connection Dashboard</div>
        </div>
      </div>

      <nav class="flex-1 px-3 pb-6">
        <div class="px-3 text-xs uppercase tracking-widest text-slate-500">Navigation</div>
        <div class="mt-3 space-y-1">
          <a href="#ip" class="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 bg-white/5 transition-colors">
            <svg class="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span class="text-sm">IP Address</span>
          </a>
          <a href="#details" class="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-white/5 transition-colors">
            <svg class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span class="text-sm">Details</span>
          </a>
          <a href="#api" class="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-white/5 transition-colors">
            <svg class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span class="text-sm">API</span>
          </a>
        </div>
      </nav>

      <div class="px-6 py-6 border-t border-emerald-500/10">
        <a
          href="https://github.com/jim60105/worker-your-ip"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
          </svg>
          <span>View on GitHub</span>
        </a>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 h-screen overflow-y-auto">
      <!-- Top bar -->
      <header class="sticky top-0 z-10 border-b border-emerald-500/10 bg-slate-950/60 backdrop-blur">
        <div class="px-5 md:px-8 py-4 flex items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="lg:hidden h-9 w-9 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30 flex items-center justify-center">
              <svg class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <div class="text-base tracking-wide">Your IP</div>
              <div class="text-xs text-slate-400">Connection details for this request</div>
            </div>
          </div>
          <div class="flex-1"></div>
          <a
            href="https://github.com/jim60105/worker-your-ip"
            target="_blank"
            rel="noopener"
            class="hidden md:inline-flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition-colors"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <div class="px-5 md:px-8 py-7">
        <!-- Primary IP Display -->
        <section id="ip" class="rounded-2xl bg-white/5 ring-1 ring-white/10 border border-emerald-500/5 p-6 md:p-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div class="text-xs uppercase tracking-widest text-slate-500">Your IP Address</div>
              <div id="main-ip" class="mt-3 text-3xl md:text-5xl font-mono font-bold break-all text-emerald-100">${escapeHtml(info.ip)}</div>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/20 px-3 py-1.5 text-sm text-emerald-200">
                  <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                  ${escapeHtml(info.ipVersion) || "Unknown"}
                </span>
                ${info.country ? `
                <span class="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-sm text-slate-300">
                  ${escapeHtml(info.country)}${info.countryIsEU ? " (EU)" : ""}
                </span>
                ` : ""}
                ${info.colo ? `
                <span class="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-sm text-slate-300 font-mono">
                  ${escapeHtml(info.colo)}
                </span>
                ` : ""}
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button
                data-copy="${escapeHtml(info.ip)}"
                onclick="copyFromData(this)"
                class="copy-btn inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30 px-5 py-3 text-sm text-emerald-100 hover:bg-emerald-500/20 transition-colors"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy IP</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Info Cards -->
        <section id="details" class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <!-- Location Card -->
          <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 border border-emerald-500/5 p-5">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-10 w-10 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20 flex items-center justify-center">
                <svg class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="text-sm font-medium text-slate-200">Location</div>
            </div>
            <div class="text-lg font-semibold text-slate-100 break-words">${escapeHtml(locationPrimary)}</div>
            <div class="mt-2 text-xs text-slate-500">${escapeHtml(info.continent) || "Continent N/A"}${info.postalCode ? ` • ${escapeHtml(info.postalCode)}` : ""}</div>
          </div>

          <!-- Network Card -->
          <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 border border-emerald-500/5 p-5">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-10 w-10 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20 flex items-center justify-center">
                <svg class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <div class="text-sm font-medium text-slate-200">Network</div>
            </div>
            <div class="text-lg font-semibold font-mono text-slate-100">${info.asn ? `AS${info.asn}` : "N/A"}</div>
            <div class="mt-2 text-xs text-slate-500 truncate">${escapeHtml(info.organization) || "Organization N/A"}</div>
          </div>

          <!-- Connection Card -->
          <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 border border-emerald-500/5 p-5">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-10 w-10 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20 flex items-center justify-center">
                <svg class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div class="text-sm font-medium text-slate-200">Connection</div>
            </div>
            <div class="text-lg font-semibold font-mono text-slate-100">${escapeHtml(info.tlsVersion) || "N/A"}</div>
            <div class="mt-2 text-xs text-slate-500">${escapeHtml(info.httpProtocol) || "Protocol N/A"}</div>
          </div>

          <!-- Coordinates Card -->
          <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 border border-emerald-500/5 p-5">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-10 w-10 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20 flex items-center justify-center">
                <svg class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <div class="text-sm font-medium text-slate-200">Coordinates</div>
            </div>
            ${info.latitude && info.longitude ? `
            <div class="text-base font-mono text-slate-100">${escapeHtml(info.latitude)}, ${escapeHtml(info.longitude)}</div>
            <a
              href="https://www.google.com/maps?q=${info.latitude},${info.longitude}"
              target="_blank"
              rel="noopener"
              class="mt-2 inline-flex items-center gap-1 text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              View on Maps
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            ` : `
            <div class="text-lg font-semibold text-slate-100">N/A</div>
            <div class="mt-2 text-xs text-slate-500">Coordinates unavailable</div>
            `}
          </div>
        </section>

        <!-- Full Details Table -->
        <section class="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 border border-emerald-500/5 p-6">
          <div class="flex items-center justify-between mb-5">
            <div class="text-sm font-medium text-emerald-200">All Connection Details</div>
            <div class="text-xs text-slate-500">Request: ${escapeHtml(hostname)}</div>
          </div>
          <div class="overflow-hidden rounded-xl ring-1 ring-white/5">
            <table class="w-full text-sm">
              <tbody class="divide-y divide-white/5">
                ${[
                  ["IP Address", escapeHtml(info.ip)],
                  ["IP Version", escapeHtml(info.ipVersion)],
                  ["Country", `${escapeHtml(info.country) || "N/A"}${info.countryIsEU ? " (EU)" : ""}`],
                  ["City", escapeHtml(info.city) || "N/A"],
                  ["Region", `${escapeHtml(info.region) || "N/A"}${info.regionCode ? ` (${escapeHtml(info.regionCode)})` : ""}`],
                  ["Postal Code", escapeHtml(info.postalCode) || "N/A"],
                  ["Continent", escapeHtml(info.continent) || "N/A"],
                  ["Latitude", escapeHtml(info.latitude) || "N/A"],
                  ["Longitude", escapeHtml(info.longitude) || "N/A"],
                  ["Timezone", escapeHtml(info.timezone) || "N/A"],
                  ["ASN", info.asn ? `AS${info.asn}` : "N/A"],
                  ["Organization", escapeHtml(info.organization) || "N/A"],
                  ["Data Center", escapeHtml(info.colo) || "N/A"],
                  ["HTTP Protocol", escapeHtml(info.httpProtocol) || "N/A"],
                  ["TLS Version", escapeHtml(info.tlsVersion) || "N/A"],
                  ["TLS Cipher", escapeHtml(info.tlsCipher) || "N/A"],
                ]
                  .map(
                    ([k, v]) => `
                    <tr class="bg-black/10 hover:bg-black/20 transition-colors">
                      <td class="px-4 py-3 text-slate-500 w-40">${k}</td>
                      <td class="px-4 py-3 text-slate-200 font-mono break-all">${v}</td>
                    </tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </section>

        <!-- API Documentation -->
        <section id="api" class="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 border border-emerald-500/5 p-6 md:p-8">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <div class="text-sm font-medium text-emerald-200">API Endpoints</div>
              <div class="mt-1 text-xs text-slate-500">Copyable curl examples for scripting</div>
            </div>
          </div>

          <div class="grid gap-3">
            ${generateEndpointDoc(hostname, "/ip", "Your IP address (IPv4 or IPv6)")}
            ${generateEndpointDoc(hostname, "/ipv4", "Your IPv4 address (returns 400 if unavailable)")}
            ${generateEndpointDoc(hostname, "/ipv6", "Your IPv6 address (returns 400 if unavailable)")}
            ${generateEndpointDoc(hostname, "/json", "All information as JSON")}
            ${generateEndpointDoc(hostname, "/country", "Your country code (ISO 3166-1)")}
            ${generateEndpointDoc(hostname, "/city", "Your city name")}
            ${generateEndpointDoc(hostname, "/region", "Your region/state name")}
            ${generateEndpointDoc(hostname, "/timezone", "Your timezone")}
            ${generateEndpointDoc(hostname, "/coordinates", "Your latitude,longitude")}
            ${generateEndpointDoc(hostname, "/continent", "Your continent code")}
            ${generateEndpointDoc(hostname, "/asn", "Your ASN number")}
            ${generateEndpointDoc(hostname, "/org", "Your organization/ISP name")}
            ${generateEndpointDoc(hostname, "/colo", "Cloudflare data center code")}
            ${generateEndpointDoc(hostname, "/tls", "TLS version")}
            ${generateEndpointDoc(hostname, "/protocol", "HTTP protocol version")}
            ${generateEndpointDoc(hostname, "/headers", "Your request headers as JSON")}
          </div>
        </section>

        <!-- Footer -->
        <footer class="mt-8 text-center text-slate-500 py-8 border-t border-emerald-500/10">
          <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <a
              href="https://github.com/jim60105/worker-your-ip"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              View on GitHub
            </a>
            <span class="hidden md:inline text-slate-700">•</span>
            <span>Powered by Cloudflare Workers</span>
          </div>
          <p class="text-sm">
            Copyright © 2010 <a href="mailto:Jim@ChenJ.im" class="text-emerald-300 hover:text-emerald-200 transition-colors">Jim Chen</a>
          </p>
        </footer>
      </div>
    </main>
  </div>

  <script>
    function copyFromData(btn) {
      const text = btn.getAttribute('data-copy') || '';
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        const label = btn.querySelector('span');
        if (!label) return;
        const originalText = label.textContent;
        label.textContent = 'Copied!';
        btn.classList.add('ring-emerald-300/40');
        setTimeout(() => {
          label.textContent = originalText;
          btn.classList.remove('ring-emerald-300/40');
        }, 2000);
      });
    }
  </script>
</body>
</html>`;
}

function generateEndpointDoc(
  hostname: string,
  path: string,
  description: string
): string {
  const curlCommand = `curl https://${hostname}${path}`;
  return `
    <div class="rounded-xl bg-black/20 ring-1 ring-white/5 border border-emerald-500/5 px-4 py-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3">
            <code class="text-emerald-300 font-mono font-bold">${path}</code>
            <span class="text-xs text-slate-500 truncate">${description}</span>
          </div>
          <div class="mt-2 flex items-center gap-2 rounded-lg bg-black/30 ring-1 ring-white/5 px-3 py-2 font-mono text-xs overflow-x-auto">
            <span class="text-slate-300 whitespace-nowrap">${escapeHtml(curlCommand)}</span>
            <button
              data-copy="${escapeHtml(curlCommand)}"
              onclick="copyFromData(this)"
              class="copy-btn ml-auto inline-flex items-center gap-2 rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-slate-200 hover:bg-white/10 transition-colors shrink-0"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;
}
