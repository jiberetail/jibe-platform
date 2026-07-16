import ProductPageTemplate from "../components/product/ProductPageTemplate";
import { productPages } from "../content/productPages";

export default function JibeRetailPage() {
  return <ProductPageTemplate config={productPages.retail} />;
}
