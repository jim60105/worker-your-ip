# Copilot Instructions for worker-your-ip

## Project Overview

This is a Cloudflare Worker project that displays the client's IP address, geolocation, and connection details through a beautiful web interface and well-designed REST APIs. It leverages Cloudflare's edge network to provide fast, accurate IP detection and geolocation information.

## Tech Stack

- **Runtime**: Cloudflare Workers (Edge Computing)
- **Language**: TypeScript (ES2022, ESNext modules)
- **Build Tool**: Wrangler v4
- **Testing**: Vitest with `@cloudflare/vitest-pool-workers`
- **UI**: Tailwind CSS (via CDN), VanillaJS
- **License**: GPL-3.0-or-later

## Project Structure

```text
worker-your-ip/
├── src/
│   ├── index.ts          # Main worker entry point with routing
│   ├── handlers/
│   │   ├── api.ts        # API endpoint handlers (all /endpoint routes)
│   │   └── html.ts       # HTML page generator with Tailwind CSS
│   └── utils/
│       ├── ip.ts         # IP detection utilities (isIPv4, isIPv6, getClientIP)
│       └── response.ts   # Response helpers (textResponse, jsonResponse, htmlResponse)
├── test/
│   ├── api.test.ts       # API endpoint tests
│   ├── ip.test.ts        # IP utility unit tests
│   └── html.test.ts      # HTML page integration tests
├── doc/
│   ├── requirement.md    # Feature requirements in Gherkin format
│   └── plan.md           # Implementation plan
├── wrangler.jsonc        # Wrangler configuration
├── vitest.config.ts      # Vitest configuration for Workers
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Development Commands

Always run `npm install` before starting development.

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies (always run first) |
| `npm run dev` | Start local development server with Wrangler |
| `npm test` | Run all tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run cf-typegen` | Generate Cloudflare types |

## Coding Conventions

### TypeScript

- Use strict TypeScript with ES2022 target
- Use ESNext module syntax (`import`/`export`)
- Prefer `interface` over `type` for object shapes
- Use `satisfies` for type assertions where appropriate
- All code comments must be written in English

### File Organization

- API handlers go in `src/handlers/api.ts`
- HTML generation goes in `src/handlers/html.ts`
- Utility functions go in `src/utils/`
- Tests mirror source structure in `test/`

### Response Patterns

Use the helper functions from `src/utils/response.ts`:

- `textResponse(body, status)` - Plain text responses (default for most endpoints)
- `jsonResponse(data, status)` - JSON responses with pretty printing
- `htmlResponse(html, status)` - HTML responses
- `errorResponse(message, status)` - Error responses (uses textResponse internally)

All responses include:

- Appropriate `Content-Type` header
- `Cache-Control: no-cache, no-store, must-revalidate`
- `Access-Control-Allow-Origin: *` for API endpoints

### Cloudflare Workers Specifics

- Access client IP via `CF-Connecting-IP` header (primary) or `X-Forwarded-For` (fallback)
- Access geolocation data via `request.cf` object (IncomingRequestCfProperties)
- The `request.cf` object may have null/undefined values; always handle gracefully
- Return 404 for geolocation endpoints when data is unavailable
- Return 400 for `/ipv4` when client uses IPv6, and vice versa

### HTML/CSS Guidelines

- Use Tailwind CSS classes exclusively (loaded via CDN)
- Follow dark theme design with slate/emerald color palette
- Ensure responsive design with mobile-first approach
- Use semantic HTML5 elements
- Escape all dynamic content with the `escapeHtml()` function

## Testing Guidelines

Tests use `@cloudflare/vitest-pool-workers` for Workers environment simulation.

### Test Patterns

```typescript
// For endpoints that always work (e.g., /ip, /json)
const response = await SELF.fetch("https://example.com/ip", {
  headers: { "CF-Connecting-IP": "203.0.113.1" },
});
expect(response.status).toBe(200);

// For endpoints depending on cf properties (may not be available in tests)
const request = new Request("https://example.com/country");
const ctx = createExecutionContext();
const response = await worker.fetch(request, env, ctx);
await waitOnExecutionContext(ctx);
expect([200, 404]).toContain(response.status);
```

### Test Categories

1. **Unit tests** (`test/ip.test.ts`): Test utility functions directly
2. **API tests** (`test/api.test.ts`): Test all API endpoints
3. **HTML tests** (`test/html.test.ts`): Test HTML page generation and content

## API Endpoints

| Endpoint | Response Type | Description |
|----------|--------------|-------------|
| `/` | text/html | Main webpage with all information |
| `/ip` | text/plain | Client IP (IPv4 or IPv6) |
| `/ipv4` | text/plain | IPv4 only (400 if unavailable) |
| `/ipv6` | text/plain | IPv6 only (400 if unavailable) |
| `/json` | application/json | All information as JSON |
| `/country` | text/plain | ISO 3166-1 country code |
| `/city` | text/plain | City name (404 if unavailable) |
| `/region` | text/plain | Region/state name |
| `/timezone` | text/plain | Timezone string |
| `/coordinates` | text/plain | `lat,long` format |
| `/continent` | text/plain | Continent code |
| `/asn` | text/plain | ASN number |
| `/org` | text/plain | Organization/ISP name |
| `/colo` | text/plain | Cloudflare data center code |
| `/tls` | text/plain | TLS version |
| `/protocol` | text/plain | HTTP protocol version |
| `/headers` | application/json | Request headers as JSON |

## Adding New Endpoints

1. Add handler function in `src/handlers/api.ts`
2. Add route case in `src/index.ts` switch statement
3. Add test in `test/api.test.ts`
4. Update API documentation in HTML (`src/handlers/html.ts`)
5. Update README.md API table
