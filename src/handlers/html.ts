import { getClientIP, isIPv4, isIPv6 } from "../utils/ip";
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your IP - ${escapeHtml(info.ip)}</title>
  <meta name="description" content="Discover your IP address, geolocation, and connection details instantly.">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes gradient {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 8s ease infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
      50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
    }
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    .copy-btn:active {
      transform: scale(0.95);
    }
    .card {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient text-white">
  <!-- Background decoration -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style="animation-delay: 2s;"></div>
  </div>

  <div class="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        Your IP Address
      </h1>
      <p class="text-gray-400 text-lg">Discover your connection details instantly</p>
    </header>

    <!-- Main IP Display -->
    <div class="mb-12">
      <div class="card bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 animate-pulse-glow">
        <div class="text-center">
          <div class="inline-flex items-center gap-3 mb-4">
            <span class="px-3 py-1 rounded-full text-sm font-medium ${
              info.ipVersion === "IPv4"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : info.ipVersion === "IPv6"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
            }">
              ${escapeHtml(info.ipVersion)}
            </span>
          </div>
          <p id="main-ip" class="text-3xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight break-all">
            ${escapeHtml(info.ip)}
          </p>
          <button onclick="copyToClipboard('${escapeHtml(info.ip)}', this)" 
                  class="copy-btn mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-all duration-200 inline-flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span>Copy IP</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Info Cards Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <!-- Location Card -->
      <div class="card bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-indigo-500/20 rounded-lg">
            <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold">Location</h2>
        </div>
        <div class="space-y-3 text-gray-300">
          ${info.city || info.region || info.country ? `
          <div class="flex justify-between">
            <span class="text-gray-500">City</span>
            <span class="font-medium">${escapeHtml(info.city) || "N/A"}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Region</span>
            <span class="font-medium">${escapeHtml(info.region) || "N/A"}${info.regionCode ? ` (${escapeHtml(info.regionCode)})` : ""}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Country</span>
            <span class="font-medium">${escapeHtml(info.country) || "N/A"}${info.countryIsEU ? " 🇪🇺" : ""}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Continent</span>
            <span class="font-medium">${escapeHtml(info.continent) || "N/A"}</span>
          </div>
          ${info.postalCode ? `
          <div class="flex justify-between">
            <span class="text-gray-500">Postal Code</span>
            <span class="font-medium">${escapeHtml(info.postalCode)}</span>
          </div>
          ` : ""}
          ` : `<p class="text-gray-500">Location data not available</p>`}
        </div>
      </div>

      <!-- Coordinates Card -->
      <div class="card bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-purple-500/20 rounded-lg">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold">Coordinates</h2>
        </div>
        <div class="space-y-3 text-gray-300">
          ${info.latitude && info.longitude ? `
          <div class="flex justify-between">
            <span class="text-gray-500">Latitude</span>
            <span class="font-medium font-mono">${escapeHtml(info.latitude)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Longitude</span>
            <span class="font-medium font-mono">${escapeHtml(info.longitude)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Timezone</span>
            <span class="font-medium">${escapeHtml(info.timezone) || "N/A"}</span>
          </div>
          <a href="https://www.google.com/maps?q=${info.latitude},${info.longitude}" target="_blank" rel="noopener" 
             class="inline-flex items-center gap-2 mt-2 text-indigo-400 hover:text-indigo-300 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            View on Google Maps
          </a>
          ` : `<p class="text-gray-500">Coordinate data not available</p>`}
        </div>
      </div>

      <!-- Network Card -->
      <div class="card bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-pink-500/20 rounded-lg">
            <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold">Network</h2>
        </div>
        <div class="space-y-3 text-gray-300">
          <div class="flex justify-between">
            <span class="text-gray-500">ASN</span>
            <span class="font-medium font-mono">${info.asn ? `AS${info.asn}` : "N/A"}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-gray-500">Organization</span>
            <span class="font-medium text-right max-w-[60%]">${escapeHtml(info.organization) || "N/A"}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Data Center</span>
            <span class="font-medium font-mono">${escapeHtml(info.colo) || "N/A"}</span>
          </div>
        </div>
      </div>

      <!-- Connection Card -->
      <div class="card bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-green-500/20 rounded-lg">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold">Connection</h2>
        </div>
        <div class="space-y-3 text-gray-300">
          <div class="flex justify-between">
            <span class="text-gray-500">Protocol</span>
            <span class="font-medium font-mono">${escapeHtml(info.httpProtocol) || "N/A"}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">TLS Version</span>
            <span class="font-medium font-mono">${escapeHtml(info.tlsVersion) || "N/A"}</span>
          </div>
          <div class="flex justify-between items-start">
            <span class="text-gray-500">TLS Cipher</span>
            <span class="font-medium font-mono text-right text-sm max-w-[60%] break-all">${escapeHtml(info.tlsCipher) || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- API Documentation -->
    <div class="card bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 mb-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-yellow-500/20 rounded-lg">
          <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold">API Endpoints</h2>
      </div>
      <p class="text-gray-400 mb-6">Use these endpoints to programmatically retrieve your connection information.</p>

      <div class="grid gap-4">
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
    </div>

    <!-- Footer -->
    <footer class="text-center text-gray-500 py-8 border-t border-white/10">
      <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
        <a href="https://github.com/jim60105/worker-your-ip" target="_blank" rel="noopener" 
           class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
          </svg>
          View on GitHub
        </a>
        <span class="hidden md:inline text-gray-700">•</span>
        <span>Powered by Cloudflare Workers</span>
      </div>
      <p class="text-sm">
        Copyright © 2010 <a href="mailto:Jim@ChenJ.im" class="text-indigo-400 hover:text-indigo-300 transition-colors">Jim Chen</a>
      </p>
    </footer>
  </div>

  <script>
    function copyToClipboard(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.querySelector('span').textContent;
        btn.querySelector('span').textContent = 'Copied!';
        btn.classList.add('bg-green-600');
        btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        setTimeout(() => {
          btn.querySelector('span').textContent = originalText;
          btn.classList.remove('bg-green-600');
          btn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        }, 2000);
      });
    }

    function copyCommand(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
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
    <div class="bg-black/30 rounded-xl p-4 border border-white/5">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex-1">
          <code class="text-indigo-400 font-mono font-bold">${path}</code>
          <p class="text-gray-500 text-sm mt-1">${description}</p>
        </div>
        <div class="flex items-center gap-2 bg-black/40 rounded-lg px-3 py-2 font-mono text-sm overflow-x-auto">
          <span class="text-gray-400 whitespace-nowrap">${escapeHtml(curlCommand)}</span>
          <button onclick="copyCommand('${curlCommand}', this)" 
                  class="copy-btn p-1 hover:bg-white/10 rounded transition-colors shrink-0">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`;
}
