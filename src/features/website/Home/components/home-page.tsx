import React from "react";
import { FolderGit2, Blocks, Zap, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/button";
import { Counter } from "../../counter/components/counter";
import { Banner } from "./Banner/banner";
import { OurService } from "./ourServices/ourServices";

export function HomePage() {
  return (
    <>
      <Banner />
      <OurService />
    </>
  );
}
