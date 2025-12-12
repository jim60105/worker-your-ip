import { describe, it, expect } from "vitest";
import { SELF } from "cloudflare:test";

describe("HTML Page", () => {
  describe("GET /", () => {
    it("should return HTML with 200 status", async () => {
      const response = await SELF.fetch("https://example.com/", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/html");
    });

    it("should include IP address in the HTML", async () => {
      const response = await SELF.fetch("https://example.com/", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      const html = await response.text();
      expect(html).toContain("203.0.113.1");
    });

    it("should include footer with copyright", async () => {
      const response = await SELF.fetch("https://example.com/", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      const html = await response.text();
      expect(html).toContain("© 2010");
      expect(html).toContain("Jim Chen");
    });

    it("should include GitHub link", async () => {
      const response = await SELF.fetch("https://example.com/", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      const html = await response.text();
      expect(html).toContain("https://github.com/jim60105/worker-your-ip");
    });

    it("should include API documentation", async () => {
      const response = await SELF.fetch("https://example.com/", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      const html = await response.text();
      expect(html).toContain("/ip");
      expect(html).toContain("/ipv4");
      expect(html).toContain("/ipv6");
      expect(html).toContain("/json");
      expect(html).toContain("curl");
    });

    it("should include Tailwind CSS", async () => {
      const response = await SELF.fetch("https://example.com/", {
        headers: { "CF-Connecting-IP": "203.0.113.1" },
      });
      const html = await response.text();
      expect(html).toContain("tailwindcss");
    });
  });
});
