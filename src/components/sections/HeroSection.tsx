import ProductHeroSection from "../ProductHeroSection";

export default function HeroSection() {
  return (
    <ProductHeroSection
      productName="Jibe Pro"
      productLabel="Pro"
      descriptor="Customer Experience Intelligence"
      line1="Understand every"
      line2="customer interaction."
      description="Jibe Pro connects frontline predictions, customer feedback, and operational performance to reveal what surveys alone cannot."
      primaryHref="/demo?product=pro"
      primaryLabel="Book a demo"
      secondaryHref="/jibe-pro/how-it-works"
      secondaryLabel="See how it works"
      proofPoints={["More customer signals", "Focused QA", "Better coaching", "Measurable impact"]}
    />
  );
}
