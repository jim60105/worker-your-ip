import { describe, it, expect } from "vitest";
import { isIPv4, isIPv6 } from "../src/utils/ip";

describe("IP Utilities", () => {
  describe("isIPv4", () => {
    it("should return true for valid IPv4 addresses", () => {
      expect(isIPv4("192.168.1.1")).toBe(true);
      expect(isIPv4("10.0.0.1")).toBe(true);
      expect(isIPv4("172.16.0.1")).toBe(true);
      expect(isIPv4("8.8.8.8")).toBe(true);
      expect(isIPv4("255.255.255.255")).toBe(true);
      expect(isIPv4("0.0.0.0")).toBe(true);
    });

    it("should return false for IPv6 addresses", () => {
      expect(isIPv4("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(false);
      expect(isIPv4("::1")).toBe(false);
      expect(isIPv4("fe80::1")).toBe(false);
    });

    it("should return false for invalid IP addresses", () => {
      expect(isIPv4("not-an-ip")).toBe(false);
      expect(isIPv4("256.256.256.256")).toBe(false);
      expect(isIPv4("")).toBe(false);
    });
  });

  describe("isIPv6", () => {
    it("should return true for valid IPv6 addresses", () => {
      expect(isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
      expect(isIPv6("::1")).toBe(true);
      expect(isIPv6("fe80::1")).toBe(true);
      expect(isIPv6("2001:db8::1")).toBe(true);
      expect(isIPv6("::")).toBe(true);
    });

    it("should return false for IPv4 addresses", () => {
      expect(isIPv6("192.168.1.1")).toBe(false);
      expect(isIPv6("10.0.0.1")).toBe(false);
      expect(isIPv6("8.8.8.8")).toBe(false);
    });

    it("should return false for invalid IP addresses", () => {
      expect(isIPv6("not-an-ip")).toBe(false);
      expect(isIPv6("")).toBe(false);
    });
  });
});
