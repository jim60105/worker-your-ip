import {
  describe,
  it,
  expect,
} from "vitest";
import {
  env,
  SELF,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import worker from "../src/index";

describe("API Endpoints", () => {
  describe("GET /ip", () => {
    it("should return IP address with 200 status", async () => {
      const response = await SELF.fetch("https://example.com/ip", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/plain");
      const text = await response.text();
      expect(text).toBe("203.0.113.1");
    });
  });

  describe("GET /ipv4", () => {
    it("should return IPv4 address with 200 status when user has IPv4", async () => {
      const response = await SELF.fetch("https://example.com/ipv4", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/plain");
      const text = await response.text();
      expect(text).toBe("203.0.113.1");
    });

    it("should return 400 when user has no IPv4 (IPv6 only)", async () => {
      const response = await SELF.fetch("https://example.com/ipv4", {
        headers: { "CF-Connecting-IP": "2001:db8::1" },
      });
      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain("IPv4");
    });
  });

  describe("GET /ipv6", () => {
    it("should return IPv6 address with 200 status when user has IPv6", async () => {
      const response = await SELF.fetch("https://example.com/ipv6", {
        headers: { "CF-Connecting-IP": "2001:db8::1" },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/plain");
      const text = await response.text();
      expect(text).toBe("2001:db8::1");
    });

    it("should return 400 when user has no IPv6 (IPv4 only)", async () => {
      const response = await SELF.fetch("https://example.com/ipv6", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain("IPv6");
    });
  });

  describe("GET /country", () => {
    it("should return country code or 404 if not available", async () => {
      const request = new Request("https://example.com/country");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      // In test environment, cf properties may not be available
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /json", () => {
    it("should return JSON with 200 status", async () => {
      const response = await SELF.fetch("https://example.com/json", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
      const data = await response.json();
      expect(data).toHaveProperty("ip");
    });
  });

  describe("GET /headers", () => {
    it("should return request headers as JSON", async () => {
      const response = await SELF.fetch("https://example.com/headers", {
        headers: {
          "CF-Connecting-IP": "203.0.113.1",
          "User-Agent": "test-agent",
        },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
      const data = await response.json() as Record<string, string>;
      expect(data["user-agent"]).toBe("test-agent");
    });
  });

  describe("GET /asn", () => {
    it("should return ASN or 404 if not available", async () => {
      const request = new Request("https://example.com/asn");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      // In test environment, cf properties may not be available
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /colo", () => {
    it("should return data center code or 404 if not available", async () => {
      const request = new Request("https://example.com/colo");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      // In test environment, cf properties may not be available
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /tls", () => {
    it("should return TLS version or 404 if not available", async () => {
      const request = new Request("https://example.com/tls");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      // In test environment, cf properties may not be available
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /protocol", () => {
    it("should return HTTP protocol or 404 if not available", async () => {
      const request = new Request("https://example.com/protocol");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      // In test environment, cf properties may not be available
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /timezone", () => {
    it("should return timezone or 404 if not available", async () => {
      const request = new Request("https://example.com/timezone");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      // In test environment, cf properties may not be available
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /city", () => {
    it("should return city or 404 if not available", async () => {
      const request = new Request("https://example.com/city");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      // City may or may not be available
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /region", () => {
    it("should return region or 404 if not available", async () => {
      const request = new Request("https://example.com/region");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /coordinates", () => {
    it("should return coordinates or 404 if not available", async () => {
      const request = new Request("https://example.com/coordinates");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /continent", () => {
    it("should return continent or 404 if not available", async () => {
      const request = new Request("https://example.com/continent");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /org", () => {
    it("should return organization or 404 if not available", async () => {
      const request = new Request("https://example.com/org");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      expect([200, 404]).toContain(response.status);
    });
  });

  describe("GET /unknown-path", () => {
    it("should return 404 for unknown paths", async () => {
      const response = await SELF.fetch("https://example.com/unknown-path");
      expect(response.status).toBe(404);
    });
  });
});
