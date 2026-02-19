import net from "node:net";
import { spawn } from "node:child_process";

const port = Number(process.env.PORT ?? 3000);

const probe = net.createServer();

probe.once("error", (error) => {
  if (error && typeof error === "object" && "code" in error && error.code === "EADDRINUSE") {
    process.stderr.write(
      `Port ${port} is already in use. Stop the existing dev server before starting a new one.\n`,
    );
    process.exit(1);
  }

  process.stderr.write(`Failed to probe port ${port}: ${String(error)}\n`);
  process.exit(1);
});

probe.once("listening", () => {
  probe.close(() => {
    const args = [
      "--max-old-space-size=4096",
      "./node_modules/next/dist/bin/next",
      "dev",
      "-p",
      String(port),
    ];

    const child = spawn(process.execPath, args, {
      stdio: "inherit",
      env: process.env,
    });

    child.on("exit", (code, signal) => {
      if (signal) {
        process.kill(process.pid, signal);
        return;
      }
      process.exit(code ?? 0);
    });
  });
});

probe.listen(port, "127.0.0.1");
