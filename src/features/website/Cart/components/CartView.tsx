"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Tag,
  X,
  AlertCircle,
  Truck,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface AppliedCouponData {
  couponId: string;
  couponName: string;
  couponCode: string;
  appliesTo: "ALL" | "DELIVERY" | "SUBSCRIPTION" | "PRODUCT";
  discountValue: number;
  productDiscount: number;
  deliveryDiscount: number;
  totalDiscount: number;
  finalProductAmount: number;
  finalDeliveryFee: number;
  finalTotal: number;
}

const SHIPPING_OPTIONS = [
  { id: "standard", name: "Standard Delivery (2-3 business days)", price: 5.0 },
  { id: "express", name: "Express Delivery (Next business day)", price: 10.0 },
  { id: "pickup", name: "Click & Collect (Free)", price: 0.0 },
];

export const CartView = () => {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItemsCount,
  } = useCart();

  const [shippingOption, setShippingOption] = useState<string>("standard");
  const [promoCode, setPromoCode] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] =
    useState<AppliedCouponData | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "submitting" | "success"
  >("cart");

  // Form states for simulated checkout
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const fullNameInputId = useId();
  const addressInputId = useId();
  const paymentMethodSelectId = useId();

  const currentShippingCost =
    SHIPPING_OPTIONS.find((s) => s.id === shippingOption)?.price ?? 5.0;


  // Re-validate coupon if cart subtotal or shipping option changes
  useEffect(() => {
    if (!appliedCoupon) return;

    let isMounted = true;
    async function revalidate() {
      try {
        const res = await fetch("/api/coupons/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponCode: appliedCoupon?.couponCode,
            productAmount: subtotal,
            deliveryFee: currentShippingCost,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (isMounted) {
          if (res.ok && data?.data) {
            setAppliedCoupon(data.data);
            setCouponError("");
          } else {
            setAppliedCoupon(null);
            setCouponError(data?.message || "Coupon no longer valid");
          }
        }
      } catch {
        if (isMounted) {
          setAppliedCoupon(null);
        }
      }
    }

    revalidate();

    return () => {
      isMounted = false;
    };
  }, [subtotal, currentShippingCost]);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: code,
          productAmount: subtotal,
          deliveryFee: currentShippingCost,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setAppliedCoupon(null);
        setCouponError(data?.message || "Invalid coupon code");
      } else if (data?.data) {
        setAppliedCoupon(data.data);
        setPromoCode("");
        setCouponError("");
      }
    } catch {
      setCouponError("Failed to validate coupon. Please try again.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    setPromoCode("");
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auth = await fetch("/api/auth/me").then((r) => r.json()).catch(() => ({ authenticated: false }));
      if (!auth?.authenticated) {
        router.push("/login?redirect=/cart&reason=checkout");
        return;
      }
    } catch {
      // continue
    }
    setCheckoutStep("submitting");

    setTimeout(() => {
      setCheckoutStep("success");
      clearCart();
      setAppliedCoupon(null);
    }, 1500);
  };

  const productDiscount = appliedCoupon ? appliedCoupon.productDiscount : 0;
  const deliveryDiscount = appliedCoupon ? appliedCoupon.deliveryDiscount : 0;
  const totalDiscount = productDiscount + deliveryDiscount;
  const finalTotal = Math.max(
    0,
    subtotal + currentShippingCost - totalDiscount,
  );

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-20 font-['Wix_Madefor_Text']">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 py-6 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="container mx-auto">
          <h1 className="text-3xl font-extrabold text-[#1B2C54]">
            Shopping Cart
          </h1>
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
              <h2 className="text-2xl font-bold text-slate-800">
                Order Placed Successfully!
              </h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you for your purchase. We have received your order request
                and our team will get in touch with you shortly.
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
                        <div
                          className={`size-20 rounded-2xl ${item.imageBg} overflow-hidden shrink-0 flex items-center justify-center`}
                        >
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ShoppingBag className="size-8 text-white/95" />
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/marketplace/${item.id}`}
                            className="text-base font-bold text-slate-800 hover:text-[#2D6A9F] transition-colors leading-tight"
                          >
                            {item.title}
                          </Link>
                          <span className="text-xs text-slate-400 font-semibold">
                            by {item.seller}
                          </span>
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
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-4.5" />
                          </button>
                          <span className="text-base font-extrabold text-slate-700 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-400 hover:text-slate-800 transition-colors p-1 cursor-pointer"
                            aria-label="Increase quantity"
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
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery / Shipping Method Options */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <Truck className="size-4.5 text-[#2D6A9F]" />
                  <span>Delivery Method</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
                        shippingOption === opt.id
                          ? "border-[#2D6A9F] bg-[#F0F7FF]"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <input
                          type="radio"
                          name="shippingOption"
                          value={opt.id}
                          checked={shippingOption === opt.id}
                          onChange={(e) => setShippingOption(e.target.value)}
                          className="text-[#2D6A9F] focus:ring-[#2D6A9F]"
                        />
                        <span className="text-xs font-extrabold text-slate-800">
                          {opt.price === 0
                            ? "Free"
                            : `£${opt.price.toFixed(2)}`}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 leading-snug">
                        {opt.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Secure Checkout Trust Badge banner */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3 text-slate-500">
                <ShieldCheck className="size-5 text-[#2D6A9F]" />
                <span className="text-xs font-semibold">
                  Secure checkout hosted by Bedders. Your data is protected by
                  industry standard encryption.
                </span>
              </div>
            </div>

            {/* Right Column: Summary Panel */}
            <div className="flex flex-col gap-6">
              {/* Order Summary Panel */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                <h3 className="text-lg font-bold text-slate-800">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-3 border-b border-slate-50 pb-4 text-sm font-medium">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Subtotal</span>
                    <span className="text-slate-800 font-bold">
                      £{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Product Discount */}
                  {productDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 text-xs font-semibold">
                      <span>Product Discount ({appliedCoupon?.couponCode})</span>
                      <span>-£{productDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-slate-500">
                    <span>Delivery Fee</span>
                    <span className="text-slate-800 font-bold">
                      {currentShippingCost === 0
                        ? "Free"
                        : `£${currentShippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Delivery Discount */}
                  {deliveryDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 text-xs font-semibold">
                      <span>Delivery Discount ({appliedCoupon?.couponCode})</span>
                      <span>-£{deliveryDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Final Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-800">
                    Total
                  </span>
                  <div className="flex flex-col items-end">
                    {totalDiscount > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        £{(subtotal + currentShippingCost).toFixed(2)}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold text-[#2D6A9F]">
                      £{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo / Coupon Box */}
                <div className="pt-2 border-t border-slate-100">
                  {appliedCoupon ? (
                    <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="size-4 text-emerald-600" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-xs text-emerald-800">
                              {appliedCoupon.couponCode}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                              {appliedCoupon.appliesTo}
                            </span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-medium">
                            {appliedCoupon.discountValue}% Off applied (Save £
                            {totalDiscount.toFixed(2)})
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="p-1 rounded-full text-emerald-700 hover:bg-emerald-100 transition cursor-pointer"
                        title="Remove Coupon"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="Coupon Code"
                          className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#2D6A9F] font-semibold"
                        />
                        <button
                          type="submit"
                          disabled={isValidatingCoupon || !promoCode.trim()}
                          className="px-4 py-2 bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {isValidatingCoupon ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>

                      {couponError && (
                        <div className="flex items-center gap-1.5 p-2 bg-red-50 text-red-600 rounded-xl text-[11px] font-semibold">
                          <AlertCircle className="size-3.5 shrink-0" />
                          <span>{couponError}</span>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>

              {/* Simulated Checkout Form */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <CreditCard className="size-5 text-[#2D6A9F]" />
                  Checkout Details
                </h3>

                <form
                  onSubmit={handleCheckoutSubmit}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={fullNameInputId}
                      className="text-[10px] font-bold text-slate-400 uppercase"
                    >
                      Full Name
                    </label>
                    <input
                      id={fullNameInputId}
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-semibold"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={addressInputId}
                      className="text-[10px] font-bold text-slate-400 uppercase"
                    >
                      Delivery Address
                    </label>
                    <input
                      id={addressInputId}
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 123 Care Street, Manchester"
                      className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-semibold"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={paymentMethodSelectId}
                      className="text-[10px] font-bold text-slate-400 uppercase"
                    >
                      Payment Method
                    </label>
                    <select
                      id={paymentMethodSelectId}
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
                    {checkoutStep === "submitting"
                      ? "Processing Checkout..."
                      : `Place Order Now (£${finalTotal.toFixed(2)})`}
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
              <h2 className="text-xl font-bold text-slate-800">
                Your Cart is Empty
              </h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                You have not added any care products or medical equipment to your
                cart yet.
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
