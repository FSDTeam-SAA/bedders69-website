"use client";

import React, { useState } from "react";
import { MarketplaceHero } from "./MarketplaceHero";
import { MarketplaceList, ProductProps } from "./MarketplaceList";
import { X, ShoppingBag, Trash2, Plus, Minus, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const MarketplaceView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Global Cart State
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItemsCount,
    subtotal,
  } = useCart();

  // Cart Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleAddToCart = (product: ProductProps) => {
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      setIsCartOpen(false);
      setShowCheckoutSuccess(true);

      setTimeout(() => {
        setShowCheckoutSuccess(false);
      }, 4000);
    }, 1500);
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

      {/* Floating Cart Badge Button */}
      {totalItemsCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#2D6A9F] hover:bg-[#20527F] text-white p-4 rounded-full shadow-2xl transition-all cursor-pointer flex items-center justify-center animate-bounce hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="size-6" />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold size-5.5 rounded-full border-2 border-white flex items-center justify-center">
            {totalItemsCount}
          </span>
        </button>
      )}

      {/* Slide-out Cart Sidebar Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end animate-fade-in">
          
          {/* Backdrop closer click hook */}
          <div className="absolute inset-0 cursor-default" onClick={() => setIsCartOpen(false)} />

          {/* Drawer Panel */}
          <div className="bg-white w-full max-w-md h-full relative z-10 shadow-2xl flex flex-col border-l border-slate-100 font-['Wix_Madefor_Text'] animate-slide-left">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-800">
                <ShoppingBag className="size-5 text-[#2D6A9F] stroke-[2.5]" />
                <h3 className="text-lg font-bold">Your Cart ({totalItemsCount})</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 border border-slate-100 rounded-xl bg-slate-50/20 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Visual box placeholder */}
                    <div className={`size-16 rounded-xl ${item.imageBg} shrink-0`} />

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-sm font-bold text-slate-800 leading-snug line-clamp-1">
                          {item.title}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      {/* Quantity switcher controls */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-1.5 py-0.5 bg-white select-none">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-slate-400 hover:text-slate-800 transition-colors p-0.5 cursor-pointer"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-700 min-w-[14px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-400 hover:text-slate-800 transition-colors p-0.5 cursor-pointer"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold text-[#2D6A9F]">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3">
                  <ShoppingBag className="size-12 stroke-[1.5]" />
                  <span className="text-sm font-semibold">Your shopping cart is empty</span>
                </div>
              )}
            </div>

            {/* Drawer Footer / Subtotal & Checkout checkout details */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-xl font-extrabold text-slate-800">
                    £{subtotal.toLocaleString()}
                  </span>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full py-3 bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm hover:shadow text-center active:scale-98"
                  >
                    {isCheckingOut ? "Processing Checkout..." : "Secure Checkout"}
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Checkout Success Message Toast */}
      {showCheckoutSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E8F8F0] border border-emerald-200 text-emerald-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-sm animate-fade-in font-['Wix_Madefor_Text']">
          <CheckCircle className="size-6 text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">Order Received!</span>
            <span className="text-xs text-emerald-600/95 font-medium mt-0.5">Thank you for your purchase. We have received your order request.</span>
          </div>
        </div>
      )}

    </div>
  );
};
