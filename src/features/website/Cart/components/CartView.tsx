"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const CartView = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, totalItemsCount } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "submitting" | "success">("cart");

  // Form states for simulated checkout
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "CARE10") {
      setDiscount(subtotal * 0.1);
      setAppliedPromo("CARE10 (10% Off)");
      setPromoCode("");
    } else {
      alert("Invalid promo code. Try 'CARE10'");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("submitting");

    setTimeout(() => {
      setCheckoutStep("success");
      clearCart();
    }, 1500);
  };

  const finalTotal = subtotal - discount;

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-20 font-['Wix_Madefor_Text']">
      
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 py-6 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="container mx-auto">
          <h1 className="text-3xl font-extrabold text-[#1B2C54]">Shopping Cart</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            Manage your medical equipment and care product orders
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-10">
        
        {checkoutStep === "success" ? (
          /* Checkout Success Screen */
          <div className="max-w-xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm text-center flex flex-col items-center gap-6 animate-fade-in">
            <div className="size-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="size-12" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-slate-800">Order Placed Successfully!</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you for your purchase. We have received your order request and our team will get in touch with you shortly.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="mt-4 px-8 py-3 bg-[#2D6A9F] hover:bg-[#20527F] text-white rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        ) : cartItems.length > 0 ? (
          
          /* Cart Details Content Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Items List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <span className="text-sm font-bold text-slate-700">
                    Items ({totalItemsCount})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="flex flex-col gap-5 divide-y divide-slate-50">
                  {cartItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between ${
                        idx > 0 ? "pt-5" : ""
                      }`}
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex gap-4 items-center">
                        <div className={`size-20 rounded-2xl ${item.imageBg} overflow-hidden shrink-0 flex items-center justify-center`}>
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <ShoppingBag className="size-8 text-white/95" />
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <Link href={`/marketplace/${item.id}`} className="text-base font-bold text-slate-800 hover:text-[#2D6A9F] transition-colors leading-tight">
                            {item.title}
                          </Link>
                          <span className="text-xs text-slate-400 font-semibold">by {item.seller}</span>
                          <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md self-start mt-1">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls and Trash Button */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        
                        <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-2.5 py-1 bg-white select-none">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-slate-400 hover:text-slate-800 transition-colors p-1 cursor-pointer"
                          >
                            <Minus className="size-4.5" />
                          </button>
                          <span className="text-base font-extrabold text-slate-700 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-400 hover:text-slate-800 transition-colors p-1 cursor-pointer"
                          >
                            <Plus className="size-4.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-lg font-extrabold text-slate-800 min-w-[80px] text-right">
                            {item.price}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="size-5" />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Checkout Trust Badge banner */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3 text-slate-500">
                <ShieldCheck className="size-5 text-[#2D6A9F]" />
                <span className="text-xs font-semibold">
                  Secure checkout hosted by Bedders69. Your data is protected by industry standard encryption.
                </span>
              </div>

            </div>

            {/* Right Column: Summary Panel */}
            <div className="flex flex-col gap-6">
              
              {/* Order Summary Panel */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                <h3 className="text-lg font-bold text-slate-800">Order Summary</h3>

                <div className="flex flex-col gap-3.5 border-b border-slate-50 pb-4 text-sm font-medium">
                  
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Subtotal</span>
                    <span className="text-slate-800 font-bold">£{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold">Free</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600">
                      <span>Discount ({appliedPromo})</span>
                      <span>-£{discount.toLocaleString()}</span>
                    </div>
                  )}

                </div>

                {/* Final Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-800">Total</span>
                  <span className="text-2xl font-extrabold text-[#2D6A9F]">
                    £{finalTotal.toLocaleString()}
                  </span>
                </div>

                {/* Promo Code Entry Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (CARE10)"
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2D6A9F] font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

              </div>

              {/* Simulated Checkout Form */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <CreditCard className="size-5 text-[#2D6A9F]" />
                  Checkout Details
                </h3>

                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-3">
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-semibold"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Delivery Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 123 Care Street, Manchester"
                      className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-semibold"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-semibold bg-white cursor-pointer"
                    >
                      <option value="card">Credit / Debit Card</option>
                      <option value="invoice">Invoice / Care Budget</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={checkoutStep === "submitting"}
                    className="w-full mt-4 py-3.5 bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow text-center cursor-pointer active:scale-98"
                  >
                    {checkoutStep === "submitting" ? "Processing Checkout..." : "Place Order Now"}
                  </button>

                </form>

              </div>

            </div>

          </div>
        ) : (
          
          /* Empty Cart Screen */
          <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-3xl p-10 shadow-sm text-center flex flex-col items-center gap-5">
            <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <ShoppingBag className="size-8" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xl font-bold text-slate-800">Your Cart is Empty</h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                You have not added any care products or medical equipment to your cart yet.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="mt-2 flex items-center gap-2 text-sm font-bold text-[#2D6A9F] hover:text-[#20527F] transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              Browse Marketplace
            </Link>
          </div>
        )}

      </div>

    </div>
  );
};
