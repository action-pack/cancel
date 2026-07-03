const https = require("https");

const options = {
  hostname: "api.github.com",
  path: `/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/cancel`,
  headers: {
    Authorization: `Bearer ${process.env.INPUT_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "actions/cancel-action",
  },
  method: "POST",
};

const req = https.request(options, (res) => {
  let body = "";

  res.setEncoding("utf8");

  res.on("data", (chunk) => {
    body += chunk;
  });

  res.on("end", () => {
    if (res.statusCode === 202) {
      console.log(`Successfully cancelled the workflow run from job ${process.env.GITHUB_JOB}.`);
      process.exit(0);
    }

    let message = body.trim();

    if (message) {
      try {
        const parsed = JSON.parse(message);
        message = parsed.message || message;
      } catch {
        // Response was not JSON, use raw body.
      }
    }

    console.log(`Error: ${message || `GitHub returned status ${res.statusCode}`}`);
    process.exit(1);
  });
});

req.on("error", (error) => {
  console.log(`HTTP Error: ${error.message}`);
  process.exit(1);
});

req.end();
