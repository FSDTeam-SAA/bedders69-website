import React, { Suspense } from "react";
import { MarketplaceView } from "@/features/website/Marketplace/components/MarketplaceView";

const MarketplacePage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FC]" />}>
      <MarketplaceView />
    </Suspense>
  );
};

export default MarketplacePage;
