"use client";

import React from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/button";
import { useCounter } from "../hooks/use-counter";




export function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl backdrop-blur-md max-w-sm w-full mx-auto space-y-6">
      <div className="text-center">
        <h3 className="text-zinc-400 text-sm font-semibold tracking-wider uppercase">
          Interactive Counter
        </h3>
        <p className="text-zinc-500 text-xs mt-1">
          Feature-scoped state & hook demo
        </p>
      </div>

      <div className="flex items-center justify-center bg-zinc-950 border border-zinc-850 h-28 w-full rounded-2xl">
        <span className="text-5xl font-mono font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300">
          {count}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        <Button
          variant="secondary"
          onClick={decrement}
          className="h-12 w-full flex items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-100 transition-colors"
          title="Decrease count"
        >
          <Minus className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          onClick={reset}
          className="h-12 w-full flex items-center justify-center rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors"
          title="Reset count"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          variant="primary"
          onClick={increment}
          className="h-12 w-full flex items-center justify-center rounded-xl transition-all"
          title="Increase count"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
