# Implementation Plan

## Overview

This document outlines the implementation plan for the Your-IP Cloudflare Worker project. The project follows Test-Driven Development (TDD) principles.

## Project Structure

```text
worker-your-ip/
├── doc/
│   ├── requirement.md
│   └── plan.md
├── src/
│   ├── index.ts          # Main worker entry point
│   ├── handlers/
│   │   ├── api.ts        # API endpoint handlers
│   │   └── html.ts       # HTML page handler
│   ├── utils/
│   │   ├── ip.ts         # IP detection utilities
│   │   └── response.ts   # Response helpers
│   └── templates/
│       └── page.ts       # HTML template
├── test/
│   ├── api.test.ts       # API endpoint tests
│   ├── ip.test.ts        # IP utility tests
│   └── html.test.ts      # HTML page tests
├── wrangler.jsonc        # Wrangler configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest configuration
└── README.md             # Project documentation
```

## Implementation Phases

### Phase 1: Project Initialization

**Tasks:**

1. Initialize npm project with `npm init`
2. Install dependencies:
   - `wrangler` - Cloudflare Workers CLI
   - `typescript` - TypeScript compiler
   - `vitest` - Testing framework
   - `@cloudflare/workers-types` - Type definitions
   - `@cloudflare/vitest-pool-workers` - Vitest pool for Workers
3. Create `wrangler.jsonc` configuration
4. Create `tsconfig.json` configuration
5. Create `vitest.config.ts` configuration

**Deliverables:**

- [ ] package.json with all dependencies
- [ ] wrangler.jsonc with correct settings
- [ ] tsconfig.json for TypeScript
- [ ] vitest.config.ts for testing

### Phase 2: Write Tests (TDD)

Following TDD, we write tests before implementation.

**Test Cases for API Endpoints:**

1. `/ip` - Returns user's IP address (text/plain, 200)
2. `/ipv4` - Returns IPv4 or 400 error
3. `/ipv6` - Returns IPv6 or 400 error
4. `/country` - Returns country code
5. `/city` - Returns city or 404
6. `/region` - Returns region or 404
7. `/timezone` - Returns timezone
8. `/coordinates` - Returns lat/long
9. `/continent` - Returns continent
10. `/asn` - Returns ASN
11. `/org` - Returns organization
12. `/colo` - Returns data center code
13. `/tls` - Returns TLS version
14. `/protocol` - Returns HTTP protocol
15. `/json` - Returns all data as JSON
16. `/headers` - Returns request headers

**Test Cases for Main Page:**

1. `/` returns HTML content
2. HTML includes IP information
3. HTML includes geolocation data
4. HTML includes API documentation
5. HTML includes footer with copyright
6. HTML includes GitHub link

**Deliverables:**

- [ ] test/api.test.ts with all endpoint tests
- [ ] test/ip.test.ts with IP utility tests
- [ ] test/html.test.ts with HTML page tests

### Phase 3: Implement API Handlers

**Implementation Order:**

1. Create IP detection utilities (`src/utils/ip.ts`)
   - `isIPv4(ip: string): boolean`
   - `isIPv6(ip: string): boolean`
   - `getClientIP(request: Request): string`

2. Create response helpers (`src/utils/response.ts`)
   - `textResponse(body: string, status?: number): Response`
   - `jsonResponse(data: object, status?: number): Response`
   - `htmlResponse(html: string): Response`
   - `errorResponse(message: string, status: number): Response`

3. Create API handlers (`src/handlers/api.ts`)
   - Individual handlers for each endpoint
   - Proper error handling for missing data

4. Create router in `src/index.ts`
   - Route requests to appropriate handlers

**Deliverables:**

- [ ] src/utils/ip.ts
- [ ] src/utils/response.ts
- [ ] src/handlers/api.ts
- [ ] src/index.ts with routing

### Phase 4: Implement HTML Page

**Design Requirements:**

- Use Tailwind CSS via CDN
- Dark/light mode support (prefers-color-scheme)
- Responsive design
- Modern, sleek aesthetic with gradients
- Animated elements
- Clear typography
- Copy-to-clipboard functionality

**Sections:**

1. Hero section with IP display
2. Geolocation details card
3. Network information card
4. Connection details card
5. API documentation section with curl examples
6. Footer with copyright and GitHub link

**Deliverables:**

- [ ] src/templates/page.ts with HTML template
- [ ] src/handlers/html.ts to render the page

### Phase 5: Run Tests and Debug

**Tasks:**

1. Run `npm test` to execute all tests
2. Fix any failing tests
3. Ensure 100% test pass rate

**Deliverables:**

- [ ] All tests passing
- [ ] No TypeScript errors

### Phase 6: Documentation

**README.md Contents:**

1. Project title and description
2. Deploy to Cloudflare button
3. Features list
4. API endpoint documentation
5. curl examples
6. Local development instructions
7. License information

**Deliverables:**

- [ ] README.md

### Phase 7: Final Verification

**Tasks:**

1. Run `npm run build` to verify build
2. Run `npm test` one final time
3. Test locally with `npm run dev`
4. Verify all endpoints work
5. Verify HTML page renders correctly

## API Endpoints Summary

| Endpoint      | Method | Response Type | Description                     |
| ------------- | ------ | ------------- | ------------------------------- |
| `/`           | GET    | text/html     | Main webpage                    |
| `/ip`         | GET    | text/plain    | Client IP (any)                 |
| `/ipv4`       | GET    | text/plain    | Client IPv4 or 400              |
| `/ipv6`       | GET    | text/plain    | Client IPv6 or 400              |
| `/country`    | GET    | text/plain    | Country code                    |
| `/city`       | GET    | text/plain    | City name or 404                |
| `/region`     | GET    | text/plain    | Region name or 404              |
| `/timezone`   | GET    | text/plain    | Timezone                        |
| `/coordinates`| GET    | text/plain    | Lat,Long                        |
| `/continent`  | GET    | text/plain    | Continent code                  |
| `/asn`        | GET    | text/plain    | ASN number                      |
| `/org`        | GET    | text/plain    | Organization name               |
| `/colo`       | GET    | text/plain    | Cloudflare data center          |
| `/tls`        | GET    | text/plain    | TLS version                     |
| `/protocol`   | GET    | text/plain    | HTTP protocol version           |
| `/json`       | GET    | application/json | All data as JSON             |
| `/headers`    | GET    | application/json | Request headers as JSON      |

## Dependencies

```json
{
  "devDependencies": {
    "@cloudflare/vitest-pool-workers": "^0.8.0",
    "@cloudflare/workers-types": "^4.20250206.0",
    "typescript": "^5.7.3",
    "vitest": "~3.0.0",
    "wrangler": "^4.0.0"
  }
}
```

## Timeline Estimate

| Phase | Task                    | Estimated Time |
| ----- | ----------------------- | -------------- |
| 1     | Project Initialization  | 5 minutes      |
| 2     | Write Tests (TDD)       | 15 minutes     |
| 3     | Implement API Handlers  | 20 minutes     |
| 4     | Implement HTML Page     | 25 minutes     |
| 5     | Run Tests and Debug     | 10 minutes     |
| 6     | Documentation           | 10 minutes     |
| 7     | Final Verification      | 5 minutes      |
|       | **Total**               | ~90 minutes    |
