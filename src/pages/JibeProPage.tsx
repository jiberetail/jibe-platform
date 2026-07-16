import ProductPageTemplate from "../components/product/ProductPageTemplate";
import { productPages } from "../content/productPages";

export default function JibeProPage() {
  return <ProductPageTemplate config={productPages.pro} />;
}
