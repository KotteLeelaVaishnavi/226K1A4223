const fetch = require("node-fetch");

const LOG_API = "http://129.241.56.144/evaluation-service/log";

const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const BACKEND_PACKAGES = ["cache", "controller", "cron_job", "db", "handler"];
const FRONTEND_PACKAGES = ["component", "repository", "service", "api"];

async function log(stack, level, pkg, message) {
  try {
    console.log("Preparing to send log...");  // DEBUG LINE

    if (!VALID_STACKS.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!VALID_LEVELS.includes(level)) throw new Error(`Invalid level: ${level}`);
    if (stack === "backend" && !BACKEND_PACKAGES.includes(pkg))
      throw new Error(`Invalid backend package: ${pkg}`);
    if (stack === "frontend" && !FRONTEND_PACKAGES.includes(pkg))
      throw new Error(`Invalid frontend package: ${pkg}`);

    console.log("Sending request to API...");  // DEBUG LINE
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    console.log("Got response, parsing...");  // DEBUG LINE
    const data = await response.json();
    console.log("Log created:", data);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}

module.exports = { log };
