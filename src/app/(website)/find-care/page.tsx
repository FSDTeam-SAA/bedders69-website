import React, { Suspense } from "react";
import { FindCareView } from "@/features/website/FindCare/components/FindCareView";

const FindCarePage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FC]" />}>
      <FindCareView />
    </Suspense>
  );
};

export default FindCarePage;
