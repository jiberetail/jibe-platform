import { mkdir, rename, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");
const clientDir = join(distDir, "client");
const serverDir = join(distDir, "server");

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

await mkdir(clientDir, { recursive: true });

const clientFiles = [
  "index.html",
  "assets",
  "og.png",
  "og-v2.png",
  "CNAME",
];

for (const file of clientFiles) {
  const source = join(distDir, file);
  if (await exists(source)) {
    await rename(source, join(clientDir, file));
  }
}

await mkdir(serverDir, { recursive: true });
await writeFile(
  join(serverDir, "index.js"),
  `async function assetFetch(request, env, pathname) {
  if (!env?.ASSETS?.fetch) {
    return new Response("Static asset binding is unavailable.", { status: 500 });
  }

  if (!pathname) return env.ASSETS.fetch(request);

  const url = new URL(request.url);
  url.pathname = pathname;
  return env.ASSETS.fetch(new Request(url, request));
}

async function findAsset(request, env, pathname) {
  const direct = await assetFetch(request, env, pathname);
  if (direct.status !== 404) return direct;

  const clientPath = pathname === "/" ? "/client/index.html" : "/client" + pathname;
  return assetFetch(request, env, clientPath);
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const response = await findAsset(request, env, url.pathname);
    if (response.status !== 404) return response;

    if (url.pathname.includes(".")) return response;

    return findAsset(request, env, "/index.html");
  },
};
`,
  "utf8",
);
