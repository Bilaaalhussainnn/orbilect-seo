const { spawn } = require("node:child_process");
const path = require("node:path");

const server = spawn(process.execPath, [
  require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", "0",
], { stdio: ["ignore", "pipe", "pipe"] });

function waitForServer() {
  return new Promise((resolve, reject) => {
    let output = "";
    const timer = setTimeout(() => reject(new Error("Production server did not start within 30 seconds.")), 30_000);
    timer.unref();
    server.stdout.on("data", chunk => {
      output += chunk;
      const address = output.match(/Local:\s+(http:\/\/127\.0\.0\.1:\d+)/)?.[1];
      if (address && output.includes("Ready")) { clearTimeout(timer); resolve(address); }
    });
    server.once("error", reject);
    server.once("exit", code => {
      clearTimeout(timer);
      reject(new Error("Production server exited (code " + code + ")."));
    });
  });
}

let checker;
function stop() {
  checker?.kill();
  server.kill();
}
process.once("SIGINT", () => { stop(); process.exitCode = 130; });
process.once("SIGTERM", () => { stop(); process.exitCode = 143; });

async function verify() {
  const ready = waitForServer();
  server.stdout.pipe(process.stdout, { end: false });
  server.stderr.pipe(process.stderr, { end: false });
  try {
    const address = await ready;
    checker = spawn(process.execPath, [path.join(__dirname, "check-orbilect-search.cjs"), address], { stdio: "inherit" });
    const code = await new Promise((resolve, reject) => {
      checker.once("error", reject);
      checker.once("exit", resolve);
    });
    process.exitCode ||= code ?? 1;
  } finally {
    stop();
  }
}

verify().catch(error => { console.error(error.message); process.exitCode ||= 1; });
