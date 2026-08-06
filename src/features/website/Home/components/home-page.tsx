import React from "react";
import { FolderGit2, Blocks, Zap, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/button";
import { Counter } from "../../counter/components/counter";

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-900/50 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Zap className="h-3.5 w-3.5" /> Next.js 16 + TypeScript + PNPM
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
          Modern Care Solutions{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Simplified.
          </span>
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
          Welcome to Bedders69. We provide next-generation services connecting clients and carers seamlessly with maximum transparency and class-leading tools.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900 flex items-start gap-4 text-left">
            <div className="p-2.5 rounded-xl bg-blue-950/30 text-blue-400 border border-blue-900/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-200">Verified Carers</h4>
              <p className="text-xs text-zinc-500 mt-1">Strict background checks and vetting procedures for your peace of mind.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900 flex items-start gap-4 text-left">
            <div className="p-2.5 rounded-xl bg-indigo-950/30 text-indigo-400 border border-indigo-900/30">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-200">Flexible Scheduling</h4>
              <p className="text-xs text-zinc-500 mt-1">Book services hourly, daily, or for long-term care plans.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button variant="primary" size="lg" className="group">
            Find Care Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" size="lg" className="border border-zinc-850">
            Explore Services
          </Button>
        </div>
      </div>

      {/* Interactive Demonstration Column */}
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl pointer-events-none" />
          <Counter />
        </div>
      </div>
    </div>
  );
}
