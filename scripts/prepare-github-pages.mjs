import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const routes = [
  "jibe-pro",
  "jibe-retail",
  "jibe-ai",
  "jibe-pro/how-it-works",
  "how-it-works",
  "demo",
  "clients",
  "customers",
  "company",
  "about",
  "contact",
];

for (const route of routes) {
  const routeDirectory = join("dist", route);
  await mkdir(routeDirectory, { recursive: true });
  await cp(join("dist", "index.html"), join(routeDirectory, "index.html"));
}

await cp(join("dist", "index.html"), join("dist", "404.html"));
await rm(join("dist", "server"), { recursive: true, force: true });
await rm(join("dist", ".openai"), { recursive: true, force: true });
