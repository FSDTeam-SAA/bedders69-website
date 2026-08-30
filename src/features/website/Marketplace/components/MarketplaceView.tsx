"use client";

import React, { useState } from "react";
import { MarketplaceHero } from "./MarketplaceHero";
import { MarketplaceList, ProductProps } from "./MarketplaceList";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export const MarketplaceView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedItemTitle, setAddedItemTitle] = useState<string | null>(null);

  // Global Cart State
  const { addToCart } = useCart();

  const handleAddToCart = (product: ProductProps) => {
    addToCart(product, 1);
    setAddedItemTitle(product.title);
    setTimeout(() => {
      setAddedItemTitle((curr) => (curr === product.title ? null : curr));
    }, 2500);
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-16 relative overflow-x-hidden">
      {/* Hero Header & Filter Tabs */}
      <MarketplaceHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Grid Products List */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-8">
        <MarketplaceList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Subtle Toast Feedback when an item is added to cart */}
      {addedItemTitle && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white/95 px-5 py-3.5 shadow-2xl backdrop-blur-sm transition-all animate-fade-in">
          <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">Added to cart</span>
            <span className="text-sm font-bold text-slate-800 line-clamp-1 max-w-[200px]">
              {addedItemTitle}
            </span>
          </div>
          <Link
            href="/cart"
            className="ml-2 flex items-center gap-1.5 rounded-lg bg-cyan-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-cyan-800"
          >
            <ShoppingCart className="size-3.5" />
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
};
