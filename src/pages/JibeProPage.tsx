import ProductPageTemplate from "../components/product/ProductPageTemplate";
import { productPages } from "../content/productPages";
import { Navigate, useLocation } from "react-router";

export default function JibeProPage() {
  const { hash } = useLocation();

  if (hash === "#clients") {
    return <Navigate to="/clients" replace />;
  }

  return <ProductPageTemplate config={productPages.pro} />;
}
