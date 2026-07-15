import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
  "company/leadership",
  "company/history",
  "company/ip-protection",
  "company/media-inquiries",
  "leadership",
  "history",
  "ip-protection",
  "media-inquiries",
  "about",
  "contact",
];

const companyMetadata = {
  company: {
    title: "Leadership | Jibe",
    description: "Meet the Jibe leadership team spanning customer operations, technology, analytics, product, finance, and client success.",
  },
  "company/leadership": {
    title: "Leadership | Jibe",
    description: "Meet the Jibe leadership team spanning customer operations, technology, analytics, product, finance, and client success.",
  },
  leadership: {
    title: "Leadership | Jibe",
    description: "Meet the Jibe leadership team spanning customer operations, technology, analytics, product, finance, and client success.",
  },
  "company/history": {
    title: "Our History | Jibe",
    description: "Explore Jibe's history and the idea that made customer perception an actionable operating metric.",
  },
  history: {
    title: "Our History | Jibe",
    description: "Explore Jibe's history and the idea that made customer perception an actionable operating metric.",
  },
  "company/ip-protection": {
    title: "Intellectual Property Protection | Jibe",
    description: "Learn how Jibe protects the patents, algorithms, features, and original technology behind its customer experience products.",
  },
  "ip-protection": {
    title: "Intellectual Property Protection | Jibe",
    description: "Learn how Jibe protects the patents, algorithms, features, and original technology behind its customer experience products.",
  },
  "company/media-inquiries": {
    title: "Media Inquiries | Jibe",
    description: "Contact Jibe for interviews, research collaborations, expert commentary, events, and media opportunities.",
  },
  "media-inquiries": {
    title: "Media Inquiries | Jibe",
    description: "Contact Jibe for interviews, research collaborations, expert commentary, events, and media opportunities.",
  },
};

const sourceHtml = await readFile(join("dist", "index.html"), "utf8");

function applyMetadata(html, { title, description }) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${description}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${description}$2`);
}

for (const route of routes) {
  const routeDirectory = join("dist", route);
  await mkdir(routeDirectory, { recursive: true });
  const metadata = companyMetadata[route];
  if (metadata) {
    await writeFile(join(routeDirectory, "index.html"), applyMetadata(sourceHtml, metadata));
  } else {
    await cp(join("dist", "index.html"), join(routeDirectory, "index.html"));
  }
}

await cp(join("dist", "index.html"), join("dist", "404.html"));
await rm(join("dist", "server"), { recursive: true, force: true });
await rm(join("dist", ".openai"), { recursive: true, force: true });
