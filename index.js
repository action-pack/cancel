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
      console.log(`Successfully cancelled workflow run ${process.env.GITHUB_RUN_ID}.`);
      process.exitCode = 0;
      return;
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

    console.error(`Error: ${message || `GitHub returned status ${res.statusCode}`}`);
    process.exitCode = 1;
  });
});

req.on("error", (error) => {
  console.error(`HTTP Error: ${error.message}`);
  process.exitCode = 1;
});

req.end();
