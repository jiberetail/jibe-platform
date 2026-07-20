export type ProductLabel = "Pro" | "Retail" | "AI";

export type ProductSlug = "pro" | "retail" | "ai";

export type ProductHeroContent = {
  productName: string;
  productLabel: ProductLabel;
  descriptor: string;
  line1: string;
  line2: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  proofPoints: readonly string[];
};

export type ProductSectionIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ProductPathway = {
  id: string;
  label: string;
  title: string;
  description: string;
  outcomes: readonly string[];
};

export type ProductMediaItem = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  src?: string;
  alt?: string;
  images?: readonly {
    src: string;
    alt: string;
    label?: string;
    screenSrc?: string;
    videoSrc?: string;
    screenVariant?: "mlb" | "nhl" | "fan-town";
  }[];
  orientation?: "landscape" | "portrait" | "tall";
  disclosure?: string;
};

export type ProductReportingView = {
  id: string;
  eyebrow: string;
  title: string;
  src: string;
  alt: string;
};

export type ProductWorkflowStep = {
  number: string;
  label?: string;
  title: string;
  description: string;
};

export type ProductCapability = {
  title: string;
  description: string;
};

export type ProductProofMetric = {
  value: string;
  label: string;
};

export type ProductProofItem = {
  eyebrow: string;
  title: string;
  description: string;
  metrics?: readonly ProductProofMetric[];
};

export type ProductPageConfig = {
  slug: ProductSlug;
  hero: ProductHeroContent;
  pathways: ProductSectionIntro & {
    items: readonly ProductPathway[];
  };
  media: ProductSectionIntro & {
    layout?: "tour" | "gallery";
    items: readonly ProductMediaItem[];
  };
  reporting?: ProductSectionIntro & {
    featured: readonly ProductReportingView[];
    reports: readonly ProductReportingView[];
    note?: string;
  };
  workflow: ProductSectionIntro & {
    layout?: "steps" | "paired";
    steps: readonly ProductWorkflowStep[];
  };
  capabilities: ProductSectionIntro & {
    items: readonly ProductCapability[];
  };
  proof: ProductSectionIntro & {
    items: readonly ProductProofItem[];
    note?: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    label: string;
  };
};
