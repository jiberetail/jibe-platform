import CustomerProof from "../components/sections/CustomerProof";
import EnterpriseSection from "../components/sections/EnterpriseSection";
import FinalCTA from "../components/sections/FinalCTA";
import HeroSection from "../components/sections/HeroSection";
import JibeLoop from "../components/sections/JibeLoop";
import NumberedIntro from "../components/sections/NumberedIntro";
import ProductTour from "../components/sections/ProductTour";
import Reason01 from "../components/sections/Reason01";
import Reason02 from "../components/sections/Reason02";
import Reason03to05 from "../components/sections/Reason03to05";
import Reason07to09 from "../components/sections/Reason07to09";
import Reason10to12 from "../components/sections/Reason10to12";

export default function JibeProPage() {
  return (
    <main>
      <HeroSection />
      <NumberedIntro />
      <Reason01 />
      <Reason02 />
      <Reason03to05 />
      <Reason07to09 />
      <Reason10to12 />
      <ProductTour />
      <JibeLoop />
      <CustomerProof />
      <EnterpriseSection />
      <FinalCTA />
    </main>
  );
}
