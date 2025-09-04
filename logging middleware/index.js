const { log } = require("./logger");

async function run() {
  console.log("Starting test logs...");  // DEBUG LINE

  await log("backend", "error", "handler", "Received wrong data type: expected bool, got string");
  await log("frontend", "info", "component", "User clicked login button");

  console.log("Finished test logs.");  // DEBUG LINE
}

run();
