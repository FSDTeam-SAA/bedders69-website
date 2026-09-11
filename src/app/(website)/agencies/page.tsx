import React, { Suspense } from "react";
import { AgenciesView } from "@/features/website/Agencies/components/AgenciesView";

const AgenciesPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FC]" />}>
      <AgenciesView />
    </Suspense>
  );
};

export default AgenciesPage;
