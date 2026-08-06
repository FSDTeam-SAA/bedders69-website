import React from "react";
import { FolderGit2, Blocks, Zap, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/button";
import { Counter } from "../../counter/components/counter";

import OurServices from "./ourServices/ourServices";
import Banner from "./Banner/banner";
import FeaturedCompanies from "./Companies/FeaturedCompanies";
import FeaturedAgencies from "./Agencies/FeaturedAgencies";
import LatestCareJobs from "./CareJobs/LatestCareJobs";
import OurCommitment from "./CareCommitment/OurCommitment";
import CareMarketplace from "./CareMarketplace/CareMarketplace";

export function HomePage() {
  return (
    <div>
      <Banner />
      <OurServices />
      <FeaturedCompanies/>
      <FeaturedAgencies/>
      <LatestCareJobs/>
      <OurCommitment/>
      <CareMarketplace/>
    </div>
  );
}
