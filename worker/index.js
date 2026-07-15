const INDEX_PATH = "/index.html";

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== "GET") return response;

    const url = new URL(request.url);
    const finalSegment = url.pathname.split("/").pop() || "";
    if (finalSegment.includes(".")) return response;

    url.pathname = INDEX_PATH;
    return env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
