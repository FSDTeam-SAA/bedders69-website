import React, { Suspense } from "react";
import { JobsView } from "@/features/website/Jobs/components/JobsView";

const JobsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FC]" />}>
      <JobsView />
    </Suspense>
  );
};

export default JobsPage;
