# Your-IP Worker Requirements

## Overview

A Cloudflare Worker that provides a beautiful main webpage and several API endpoints displaying client IP, geolocation, and other useful information that Cloudflare Workers can provide about the user.

## Feature Specifications

### Feature: Main Webpage

```gherkin
Feature: Main Webpage
  As a user
  I want to see my IP and geolocation information in a beautiful webpage
  So that I can easily understand my connection details

  Scenario: User visits the main webpage
    Given a user accesses the root URL "/"
    When the page loads
    Then the user should see their IP address prominently displayed
    And the user should see their geolocation information
    And the user should see additional connection details
    And the page should display documentation for API endpoints
    And the page should have a footer with copyright "© 2010 Jim Chen (Jim@ChenJ.im)"
    And the page should have a link to the GitHub repository

  Scenario: User views API documentation on the webpage
    Given a user is viewing the main webpage
    When they scroll to the API documentation section
    Then they should see curl examples for each endpoint
    And the examples should be copyable
```

### Feature: IPv4 Endpoint

```gherkin
Feature: IPv4 Endpoint
  As a developer
  I want to get my IPv4 address in plain text
  So that I can use it in scripts and automation

  Scenario: User with IPv4 address requests /ipv4
    Given a user has an IPv4 address
    When they request GET "/ipv4"
    Then the response status should be 200
    And the content type should be "text/plain"
    And the response body should contain only their IPv4 address

  Scenario: User without IPv4 address requests /ipv4
    Given a user does not have an IPv4 address
    When they request GET "/ipv4"
    Then the response status should be 400
    And the content type should be "text/plain"
    And the response body should indicate IPv4 is not available
```

### Feature: IPv6 Endpoint

```gherkin
Feature: IPv6 Endpoint
  As a developer
  I want to get my IPv6 address in plain text
  So that I can use it in scripts and automation

  Scenario: User with IPv6 address requests /ipv6
    Given a user has an IPv6 address
    When they request GET "/ipv6"
    Then the response status should be 200
    And the content type should be "text/plain"
    And the response body should contain only their IPv6 address

  Scenario: User without IPv6 address requests /ipv6
    Given a user does not have an IPv6 address
    When they request GET "/ipv6"
    Then the response status should be 400
    And the content type should be "text/plain"
    And the response body should indicate IPv6 is not available
```

### Feature: IP Endpoint (Any IP)

```gherkin
Feature: IP Endpoint
  As a developer
  I want to get my IP address (IPv4 or IPv6) in plain text
  So that I can use it regardless of my connection type

  Scenario: User requests /ip
    Given a user has any IP address
    When they request GET "/ip"
    Then the response status should be 200
    And the content type should be "text/plain"
    And the response body should contain their IP address
```

### Feature: Geolocation Endpoints

```gherkin
Feature: Geolocation Endpoints
  As a developer
  I want to get my geolocation information via API
  So that I can determine my location programmatically

  Scenario: User requests /country
    Given a user has geolocation data available
    When they request GET "/country"
    Then the response status should be 200
    And the response body should contain the country code

  Scenario: User requests /city
    Given a user has city information available
    When they request GET "/city"
    Then the response status should be 200
    And the response body should contain the city name

  Scenario: User without city information requests /city
    Given a user does not have city information available
    When they request GET "/city"
    Then the response status should be 404
    And the response should indicate city is not available

  Scenario: User requests /region
    Given a user has region information available
    When they request GET "/region"
    Then the response status should be 200
    And the response body should contain the region name

  Scenario: User requests /timezone
    Given a user has timezone information available
    When they request GET "/timezone"
    Then the response status should be 200
    And the response body should contain the timezone

  Scenario: User requests /coordinates
    Given a user has coordinate information available
    When they request GET "/coordinates"
    Then the response status should be 200
    And the response body should contain latitude and longitude

  Scenario: User requests /continent
    Given a user has continent information available
    When they request GET "/continent"
    Then the response status should be 200
    And the response body should contain the continent code
```

### Feature: Network Information Endpoints

```gherkin
Feature: Network Information Endpoints
  As a developer
  I want to get my network information via API
  So that I can understand my connection details

  Scenario: User requests /asn
    Given a user has ASN information available
    When they request GET "/asn"
    Then the response status should be 200
    And the response body should contain the ASN number

  Scenario: User requests /org
    Given a user has organization information available
    When they request GET "/org"
    Then the response status should be 200
    And the response body should contain the organization name

  Scenario: User requests /colo
    Given a user is connected to Cloudflare
    When they request GET "/colo"
    Then the response status should be 200
    And the response body should contain the data center code
```

### Feature: Connection Information Endpoints

```gherkin
Feature: Connection Information Endpoints
  As a developer
  I want to get my TLS/connection information via API
  So that I can verify my connection security

  Scenario: User requests /tls
    Given a user has TLS information available
    When they request GET "/tls"
    Then the response status should be 200
    And the response body should contain TLS version

  Scenario: User requests /protocol
    Given a user is connected via HTTP
    When they request GET "/protocol"
    Then the response status should be 200
    And the response body should contain the HTTP protocol version
```

### Feature: JSON API Endpoint

```gherkin
Feature: JSON API Endpoint
  As a developer
  I want to get all information in JSON format
  So that I can parse it programmatically

  Scenario: User requests /json
    Given a user accesses the API
    When they request GET "/json"
    Then the response status should be 200
    And the content type should be "application/json"
    And the response body should contain all available information as JSON
```

### Feature: Headers Endpoint

```gherkin
Feature: Headers Endpoint
  As a developer
  I want to see the HTTP headers sent to the server
  So that I can debug my requests

  Scenario: User requests /headers
    Given a user sends a request with headers
    When they request GET "/headers"
    Then the response status should be 200
    And the content type should be "application/json"
    And the response body should contain the request headers
```

## Non-Functional Requirements

### Design Requirements

- The main webpage must be visually appealing and modern
- Use responsive design for mobile compatibility
- Use Tailwind CSS for styling
- Include smooth animations and transitions
- Support both light and dark color schemes based on user preference

### Performance Requirements

- Response time should be under 50ms for API endpoints
- The webpage should load within 1 second

### Documentation Requirements

- README.md must include:
  - Project description
  - Deploy to Cloudflare button
  - API endpoint documentation
  - Local development instructions
  - License information

## Technical Specifications

### Available Data from Cloudflare

From `request.cf` (IncomingRequestCfProperties):

- `asn` - ASN number
- `asOrganization` - Organization name
- `colo` - Data center IATA code
- `country` - Country code (ISO 3166-1)
- `isEUCountry` - Whether in EU
- `city` - City name
- `continent` - Continent code
- `latitude` - Latitude
- `longitude` - Longitude
- `postalCode` - Postal code
- `region` - Region name
- `regionCode` - Region code (ISO 3166-2)
- `timezone` - Timezone
- `httpProtocol` - HTTP protocol version
- `tlsVersion` - TLS version
- `tlsCipher` - TLS cipher

From HTTP Headers:

- `CF-Connecting-IP` - Client IP address
- `CF-Connecting-IPv6` - IPv6 address (if available)
- `X-Forwarded-For` - Original visitor IP
- `Cf-Ray` - Ray ID
