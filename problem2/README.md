📌 Short URL Service - 2200271540067-Mitanshu Agrawal
Developed by Mitanshu Agrawal (Roll No: 2200271540067)
gmail:mitanshuagrawal5@gmail.com
Base URL: http://localhost:3000

🔗 1. Create Short URL
Endpoint: POST /shorturls
Purpose: Create a shortened version of a long URL with optional expiry and custom shortcode.

✅ Request
Method: POST
URL: http://localhost:3000/shorturls
Headers:

http
Copy
Edit
Content-Type: application/json
Body: (JSON)

json
Copy
Edit
{
  "url": "https://example.com/long-url",
  "validity": 60,              // Optional: Validity in minutes
  "shortcode": "customcode"    // Optional: Custom alphanumeric short code
}
✅ Sample Response
json
Copy
Edit
{
  "shortLink": "http://localhost:3000/customcode",
  "expiry": "2025-07-15T07:00:00.000Z"
}
📊 2. Get Short URL Statistics
Endpoint: GET /shorturls/:shortcode
Purpose: Retrieve usage and tracking data for a given short URL.

✅ Request
Method: GET
URL: http://localhost:3000/shorturls/customcode

No body required.

✅ Sample Response
json
Copy
Edit
{
  "total_clicks": 3,
  "original_url": "https://example.com/long-url",
  "creation_date": "2025-07-15T06:00:00.000Z",
  "expiry_date": "2025-07-15T07:00:00.000Z",
  "detailed_clicks": [
    {
      "timestamp": "2025-07-15T06:30:12.123Z",
      "referrer": "https://google.com",
      "geo_location": "India"
    },
    {
      "timestamp": "2025-07-15T06:40:25.789Z",
      "referrer": "https://linkedin.com",
      "geo_location": "India"
    }
  ]
}
🚀 3. Redirect Short URL
Endpoint: GET /:shortcode
Purpose: Redirect users from the short URL to the original long URL.

✅ Request
Method: GET
URL: http://localhost:3000/customcode

No body required.

✅ Expected Behavior
HTTP 302 Found response
→ Redirects to: https://example.com/long-url
