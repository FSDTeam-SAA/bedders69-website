import React from "react";
import { ProductDetailsView } from "@/features/website/Marketplace/components/ProductDetailsView";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  return <ProductDetailsView productId={id} />;
};

export default ProductDetailPage;
