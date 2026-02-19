import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const nextDir = join(process.cwd(), ".next");

if (!existsSync(nextDir)) {
  process.exit(0);
}

try {
  rmSync(nextDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  process.stdout.write("Cleaned .next cache.\n");
} catch (error) {
  process.stderr.write(`Failed to clean .next cache: ${String(error)}\n`);
  process.exit(1);
}
