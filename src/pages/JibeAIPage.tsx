import ProductPageTemplate from "../components/product/ProductPageTemplate";
import { productPages } from "../content/productPages";

export default function JibeAIPage() {
  return <ProductPageTemplate config={productPages.ai} />;
}
